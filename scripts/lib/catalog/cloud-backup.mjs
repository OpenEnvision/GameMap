import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdir,
  open,
  readFile,
  writeFile,
  readdir,
  lstat,
} from "node:fs/promises";
import { join, resolve, relative } from "node:path";
import postgres from "postgres";
import { root, walk } from "../documents.mjs";
import {
  assertPrivateDirectory,
  canonicalJSON,
  readArtifact,
  safePath,
  sha256,
} from "./codec.mjs";
import { parseReleaseRealm, assertReleaseRealm } from "./release-realm.mjs";

const defaultSchemas = ["catalog", "community"];

async function schemaInventory(sql, schemas) {
  const tables =
    await sql`select schemaname, tablename from pg_tables where schemaname = any(${schemas}) order by schemaname, tablename`;
  const result = [];
  for (const row of tables) {
    const stats = (
      await sql`select count(*)::integer as rows,
        encode(sha256(convert_to(coalesce(string_agg(hash, ',' order by hash), ''), 'UTF8')), 'hex') as digest
        from (
          select encode(sha256(convert_to(to_jsonb(t)::text, 'UTF8')), 'hex') as hash
          from ${sql(row.schemaname)}.${sql(row.tablename)} t
        ) records`
    )[0];
    result.push({ schema: row.schemaname, table: row.tablename, ...stats });
  }
  return result;
}

function assertRemoteOrLoopbackPg(url) {
  const parsed = new URL(url);
  assert.ok(
    ["postgres:", "postgresql:"].includes(parsed.protocol),
    "Backup database URL must use postgres:// or postgresql://",
  );
  return parsed;
}

async function copyMediaArea(sourceDir, destDir) {
  const items = [];
  await mkdir(destDir, { recursive: true, mode: 0o700 });
  if (!sourceDir) return items;
  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    assert.ok(
      entry.isFile() && /^[a-f0-9]{64}\.webp$/.test(entry.name),
      `Unexpected private media file: ${entry.name}`,
    );
    const bytes = await readArtifact(sourceDir, entry.name);
    assert.equal(
      sha256(bytes),
      entry.name.slice(0, 64),
      `Private media checksum mismatch: ${entry.name}`,
    );
    await writeFile(join(destDir, entry.name), bytes, {
      flag: "wx",
      mode: 0o600,
    });
    items.push({
      path: entry.name,
      bytes: bytes.length,
      sha256: sha256(bytes),
    });
  }
  return items.sort((a, b) => a.path.localeCompare(b.path));
}

async function copyPublicationArea(sourceDir, destDir) {
  const items = [];
  await mkdir(destDir, { recursive: true, mode: 0o700 });
  if (!sourceDir) return items;
  const resolvedSource = resolve(sourceDir);
  for (const file of await walk(resolvedSource)) {
    const info = await lstat(file);
    if (info.isSymbolicLink()) continue;
    const rel = relative(resolvedSource, file).split("\\").join("/");
    if (rel.startsWith("artifacts/.incoming-")) continue;
    const bytes = await readArtifact(resolvedSource, rel);
    const target = safePath(destDir, rel);
    await mkdir(resolve(target, ".."), { recursive: true, mode: 0o700 });
    await writeFile(target, bytes, { flag: "wx", mode: 0o600 });
    items.push({ path: rel, bytes: bytes.length, sha256: sha256(bytes) });
  }
  return items.sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Managed-cloud paired backup using standard TLS pg_dump (no Docker container or supabase_admin).
 * Captures SQL schemas, Studio media, Community media, and Cloud publisher retention state together.
 */
export async function backupCloudPlatform({
  databaseURL,
  realm: expectedRealm,
  outputDirectory,
  catalogMediaRoot,
  communityMediaRoot,
  publicationDirectory,
  includeAuth = false,
  pgDumpBin = "pg_dump",
}) {
  const realm = parseReleaseRealm(expectedRealm);
  const parsedUrl = assertRemoteOrLoopbackPg(databaseURL);
  const directory = resolve(outputDirectory);
  await assertPrivateDirectory(root, directory);
  await mkdir(directory, { mode: 0o700 });
  const schemas = includeAuth
    ? ["auth", ...defaultSchemas]
    : [...defaultSchemas];
  const isLoopback = ["127.0.0.1", "localhost", "[::1]"].includes(
    parsedUrl.hostname,
  );
  const sql = postgres(databaseURL, {
    max: 1,
    prepare: false,
    ssl: isLoopback ? false : { rejectUnauthorized: true },
    onnotice() {},
    connection: { application_name: "gamemap-cloud-backup" },
  });
  const dump = await open(join(directory, "database.dump"), "wx", 0o600);
  const log = await open(join(directory, "database.log"), "wx", 0o600);
  let tables;
  try {
    const currentRealm = (
      await sql`select catalog.current_release_realm() as realm`
    )[0]?.realm;
    assertReleaseRealm(currentRealm, realm);
    tables = await sql.begin(
      "isolation level repeatable read read only",
      async (tx) => {
        const snapshot = (await tx`select pg_export_snapshot() as id`)[0].id;
        const rows = await schemaInventory(tx, schemas);
        const result = spawnSync(
          pgDumpBin,
          [
            "--format=custom",
            "--no-owner",
            "--no-privileges",
            ...schemas.map((name) => "--schema=" + name),
            "--snapshot=" + snapshot,
            "--dbname=" + databaseURL,
          ],
          {
            stdio: ["ignore", dump.fd, log.fd],
            env: {
              ...process.env,
              PGSSLMODE: isLoopback ? "disable" : "verify-full",
            },
          },
        );
        assert.equal(
          result.status,
          0,
          "Cloud pg_dump failed; inspect database.log in the private backup directory",
        );
        return rows;
      },
    );
  } finally {
    await dump.close();
    await log.close();
    await sql.end({ timeout: 5 });
  }
  const catalogMedia = await copyMediaArea(
    catalogMediaRoot ? resolve(catalogMediaRoot) : null,
    join(directory, "catalog-media"),
  );
  const communityMedia =
    communityMediaRoot &&
    resolve(communityMediaRoot) !==
      (catalogMediaRoot ? resolve(catalogMediaRoot) : "")
      ? await copyMediaArea(
          resolve(communityMediaRoot),
          join(directory, "community-media"),
        )
      : [];
  const publication = await copyPublicationArea(
    publicationDirectory,
    join(directory, "publication"),
  );
  const dumpBytes = await readFile(join(directory, "database.dump"));
  const manifest = {
    format: "gamemap.cloud-backup",
    version: 1,
    createdAt: new Date().toISOString(),
    realm,
    schemas,
    gitCommit: execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim(),
    database: {
      bytes: dumpBytes.length,
      sha256: sha256(dumpBytes),
      tables,
    },
    catalogMedia,
    communityMedia,
    publication,
    notes: [
      "Runtime secrets and Supabase Auth JWT signing keys are intentionally excluded from this archive.",
      "Store encrypted offsite backups and record provider-side Auth/signing-key rotation procedures separately.",
    ],
  };
  await writeFile(
    join(directory, "manifest.json"),
    canonicalJSON(manifest) + "\n",
    { flag: "wx", mode: 0o600 },
  );
  return { directory, manifest };
}

/** Verify every checksum inside a cloud backup archive without requiring a database connection. */
export async function verifyCloudBackupArchive(directory, expectedRealm) {
  const rootDir = resolve(directory);
  const manifest = JSON.parse(await readArtifact(rootDir, "manifest.json"));
  assert.equal(manifest.format, "gamemap.cloud-backup");
  assert.equal(manifest.version, 1);
  if (expectedRealm) assertReleaseRealm(manifest.realm, expectedRealm);
  const dumpBytes = await readArtifact(rootDir, "database.dump");
  assert.equal(dumpBytes.length, manifest.database.bytes);
  assert.equal(sha256(dumpBytes), manifest.database.sha256);
  for (const [area, items] of [
    ["catalog-media", manifest.catalogMedia],
    ["community-media", manifest.communityMedia],
    ["publication", manifest.publication],
  ]) {
    for (const file of items) {
      const data = await readArtifact(join(rootDir, area), file.path);
      assert.equal(
        data.length,
        file.bytes,
        `${area}/${file.path} size mismatch`,
      );
      assert.equal(
        sha256(data),
        file.sha256,
        `${area}/${file.path} digest mismatch`,
      );
    }
  }
  return manifest;
}

/** Restore probe into an isolated scratch database URL (never overwrites the live authoring DB). */
export async function restoreCloudProbe({
  backupDirectory,
  scratchDatabaseURL,
  realm: expectedRealm,
  pgRestoreBin = "pg_restore",
}) {
  const manifest = await verifyCloudBackupArchive(
    backupDirectory,
    expectedRealm,
  );
  const parsed = assertRemoteOrLoopbackPg(scratchDatabaseURL);
  const isLoopback = ["127.0.0.1", "localhost", "[::1]"].includes(
    parsed.hostname,
  );
  const input = await open(
    join(resolve(backupDirectory), "database.dump"),
    "r",
  );
  const log = await open(
    join(resolve(backupDirectory), `restore-${randomUUID().slice(0, 8)}.log`),
    "wx",
    0o600,
  );
  let sql;
  try {
    const result = spawnSync(
      pgRestoreBin,
      [
        "--exit-on-error",
        "--single-transaction",
        "--no-owner",
        "--no-privileges",
        "--dbname=" + scratchDatabaseURL,
      ],
      {
        stdio: [input.fd, log.fd, log.fd],
        env: {
          ...process.env,
          PGSSLMODE: isLoopback ? "disable" : "verify-full",
        },
      },
    );
    assert.equal(
      result.status,
      0,
      "Cloud pg_restore probe failed; inspect private restore log",
    );
    sql = postgres(scratchDatabaseURL, {
      max: 1,
      prepare: false,
      ssl: isLoopback ? false : { rejectUnauthorized: true },
      onnotice() {},
    });
    const restoredTables = await schemaInventory(sql, manifest.schemas);
    assert.deepEqual(
      restoredTables,
      manifest.database.tables,
      "Restored cloud tables differ from backed-up snapshot inventory",
    );
    return {
      tables: restoredTables.length,
      catalogMediaFiles: manifest.catalogMedia.length,
      communityMediaFiles: manifest.communityMedia.length,
      publicationFiles: manifest.publication.length,
      databaseHash: manifest.database.sha256,
    };
  } finally {
    await input.close();
    await log.close();
    if (sql) await sql.end({ timeout: 5 });
  }
}
