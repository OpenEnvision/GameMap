import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, open, readFile, writeFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import postgres from "postgres";
import { root } from "../documents.mjs";
import { readArtifact, sha256, canonicalJSON } from "./codec.mjs";
import { readLocalStatus, localDirectory } from "./local-runtime.mjs";

const schemas = ["auth", "catalog", "public"];
async function inventory(sql) {
  const tables =
    await sql`select schemaname,tablename from pg_tables where schemaname=any(${schemas}) order by schemaname,tablename`;
  const result = [];
  for (const row of tables) {
    const stats = (
      await sql`select count(*)::integer as rows,encode(sha256(convert_to(coalesce(string_agg(hash,',' order by hash),''),'UTF8')),'hex') as digest from (select encode(sha256(convert_to(to_jsonb(t)::text,'UTF8')),'hex') as hash from ${sql(row.schemaname)}.${sql(row.tablename)} t) records`
    )[0];
    result.push({ schema: row.schemaname, table: row.tablename, ...stats });
  }
  return result;
}
const allowedSource = (path) =>
  [
    "config/research-archive-receipt.json",
    "config/research-archive-remainder-receipt.json",
  ].includes(path) ||
  /^(?:scripts|website|studio|supabase|data|docs|tests)\//.test(path) ||
  /^(?:package(?:-lock)?\.json|.*\.config\.ts|tsconfig\.json|README\.md|CONTRIBUTING\.md|AWESOME\.md|LICENSE(?:\.md)?|\.env\.example)$/.test(
    path,
  );
const secretFreePath = (path) =>
  !path
    .split("/")
    .some(
      (part) =>
        part.startsWith(".") && ![".env.example", ".nojekyll"].includes(part),
    );
export async function backupLocalCatalog(mediaRoot) {
  const status = await readLocalStatus();
  const directory = join(localDirectory, "backups", randomUUID());
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const owner = postgres(status.DB_URL, {
    max: 1,
    prepare: false,
    onnotice() {},
  });
  const dump = await open(join(directory, "database.dump"), "wx", 0o600),
    log = await open(join(directory, "database.log"), "wx", 0o600);
  let tables;
  try {
    tables = await owner.begin(
      "isolation level repeatable read read only",
      async (sql) => {
        const snapshot = (await sql`select pg_export_snapshot() as id`)[0].id;
        const rows = await inventory(sql);
        const result = spawnSync(
          "docker",
          [
            "exec",
            "supabase_db_gamemap",
            "pg_dump",
            "--username",
            "postgres",
            "--dbname",
            "postgres",
            "--format",
            "custom",
            ...schemas.map((name) => "--schema=" + name),
            "--snapshot=" + snapshot,
          ],
          { stdio: ["ignore", dump.fd, log.fd] },
        );
        assert.equal(
          result.status,
          0,
          "Local database backup failed; inspect its private log",
        );
        return rows;
      },
    );
  } finally {
    await dump.close();
    await log.close();
    await owner.end({ timeout: 5 });
  }
  const source = [];
  const deleted = new Set(
    execFileSync("git", ["ls-files", "-z", "--deleted"], {
      cwd: root,
      encoding: "utf8",
    })
      .split("\0")
      .filter(Boolean),
  );
  const files = execFileSync(
    "git",
    ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
    { cwd: root, encoding: "utf8" },
  )
    .split("\0")
    .filter(Boolean)
    .filter(allowedSource)
    .filter(secretFreePath)
    .filter((path) => !deleted.has(path));
  for (const path of files) {
    const bytes = await readArtifact(root, path),
      target = join(directory, "source", path);
    await mkdir(resolve(target, ".."), { recursive: true, mode: 0o700 });
    await writeFile(target, bytes, { flag: "wx", mode: 0o600 });
    source.push({ path, bytes: bytes.length, sha256: sha256(bytes) });
  }
  const media = [];
  await mkdir(join(directory, "media"), { mode: 0o700 });
  for (const entry of await readdir(mediaRoot, { withFileTypes: true })) {
    assert.ok(
      entry.isFile() && /^[a-f0-9]{64}\.webp$/.test(entry.name),
      "Unexpected private media directory entry",
    );
    const bytes = await readArtifact(mediaRoot, entry.name);
    assert.equal(
      sha256(bytes),
      entry.name.slice(0, 64),
      "Private media checksum mismatch",
    );
    await writeFile(join(directory, "media", entry.name), bytes, {
      flag: "wx",
      mode: 0o600,
    });
    media.push({
      path: entry.name,
      bytes: bytes.length,
      sha256: sha256(bytes),
    });
  }
  const runtime = await readFile(join(root, ".env"));
  await writeFile(join(directory, "runtime.env"), runtime, {
    flag: "wx",
    mode: 0o600,
  });
  const bytes = await readFile(join(directory, "database.dump"));
  const manifest = {
    format: "gamemap.local-backup",
    version: 1,
    environment: "local",
    schemas,
    runtime: { bytes: runtime.length, sha256: sha256(runtime) },
    database: { bytes: bytes.length, sha256: sha256(bytes), tables },
    source,
    media,
    gitCommit: execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim(),
    scope:
      "Local catalog/Auth data, RPC permissions, media and matching source. Not a cloud infrastructure or signing-key recovery certification.",
  };
  await writeFile(
    join(directory, "manifest.json"),
    canonicalJSON(manifest) + "\n",
    { flag: "wx", mode: 0o600 },
  );
  return directory;
}
export async function restoreLocalProbe(directory) {
  const status = await readLocalStatus();
  assert.ok(
    resolve(directory).startsWith(join(localDirectory, "backups") + "/"),
    "Restore probes accept only private local backup directories",
  );
  const manifest = JSON.parse(await readArtifact(directory, "manifest.json"));
  assert.equal(manifest.format, "gamemap.local-backup");
  assert.equal(manifest.environment, "local");
  const bytes = await readArtifact(directory, "database.dump");
  assert.equal(bytes.length, manifest.database.bytes);
  assert.equal(sha256(bytes), manifest.database.sha256);
  const runtime = await readArtifact(directory, "runtime.env");
  assert.equal(runtime.length, manifest.runtime.bytes);
  assert.equal(sha256(runtime), manifest.runtime.sha256);
  for (const [area, files] of [
    ["source", manifest.source],
    ["media", manifest.media],
  ])
    for (const file of files) {
      const data = await readArtifact(join(directory, area), file.path);
      assert.equal(data.length, file.bytes);
      assert.equal(sha256(data), file.sha256);
    }
  const name =
    "gamemap_catalog_restore_probe_" + randomUUID().replaceAll("-", "");
  assert.match(name, /^gamemap_catalog_restore_probe_[a-f0-9]{32}$/);
  const owner = postgres(status.DB_URL, {
    max: 1,
    prepare: false,
    onnotice() {},
  });
  let probe;
  const input = await open(join(directory, "database.dump"), "r"),
    log = await open(join(directory, "restore.log"), "w", 0o600);
  try {
    await owner.unsafe(`create database ${name} template template0`);
    const url = new URL(status.DB_URL);
    url.pathname = "/" + name;
    probe = postgres(url.href, { max: 1, prepare: false, onnotice() {} });
    await probe.unsafe("drop schema public");
    const result = spawnSync(
      "docker",
      [
        "exec",
        "-i",
        "supabase_db_gamemap",
        "pg_restore",
        "--username",
        "supabase_admin",
        "--dbname",
        name,
        "--exit-on-error",
        "--single-transaction",
      ],
      { stdio: [input.fd, log.fd, log.fd] },
    );
    assert.equal(
      result.status,
      0,
      "Private restore probe failed; inspect restore.log",
    );
    assert.deepEqual(
      await inventory(probe),
      manifest.database.tables,
      "Restored tables differ from the exported consistent snapshot",
    );
    const receipt = (
      await probe`select count(*)::integer as n from catalog.validation_receipts`
    )[0].n;
    assert.ok(receipt > 0);
    assert.equal(
      (
        await probe`select has_function_privilege('anon','catalog.import_snapshot(text,text)','execute') as allowed`
      )[0].allowed,
      false,
    );
    assert.equal(
      (
        await probe`select has_function_privilege('authenticated','public.catalog_save_draft(text,text,integer,text,text,text,uuid)','execute') as allowed`
      )[0].allowed,
      true,
    );
    await assert.rejects(
      probe.begin(async (sql) => {
        await sql.unsafe("set local role catalog_backend");
        await sql`select * from auth.users`;
      }),
      /permission denied/,
    );
    return {
      tables: manifest.database.tables.length,
      sourceFiles: manifest.source.length,
      mediaFiles: manifest.media.length,
      databaseHash: manifest.database.sha256,
    };
  } finally {
    await input.close();
    await log.close();
    if (probe) await probe.end({ timeout: 5 });
    try {
      await owner.unsafe(`drop database if exists ${name} with (force)`);
    } finally {
      await owner.end({ timeout: 5 });
    }
  }
}
