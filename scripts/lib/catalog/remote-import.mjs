import assert from "node:assert/strict";
import { lstat, readdir } from "node:fs/promises";
import sharp from "sharp";
import { inspectMp4 } from "../mp4.mjs";
import { join, resolve } from "node:path";
import { loadContent } from "../content.mjs";
import { root } from "../documents.mjs";
import {
  adapterFor,
  canonicalAddress,
  collectionAddress,
} from "./adapters.mjs";
import {
  canonicalJSON,
  contentUUID,
  digest,
  readArtifact,
  sha256,
} from "./codec.mjs";
import { validateSelection } from "./validation.mjs";
import { verifyRemoteSourceFidelity } from "./remote-source.mjs";

export const remoteRepository = "https://github.com/OpenEnvision/GameMap";
const hashPattern = /^[a-f0-9]{64}$/;
const uuidPattern =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
function object(value, keys, label) {
  assert.ok(
    value && typeof value === "object" && !Array.isArray(value),
    `Invalid ${label}`,
  );
  assert.deepEqual(
    Object.keys(value).sort(),
    [...keys].sort(),
    `Unexpected fields: ${label}`,
  );
}
function text(value, label) {
  assert.ok(
    typeof value === "string" &&
      value.trim().length > 0 &&
      !value.includes("\0"),
    `Invalid ${label}`,
  );
}
export function remotePath(path) {
  text(path, "path");
  assert.ok(
    !/[\x00-\x1f]/.test(path) &&
      !path.includes("\\") &&
      !path.includes(":") &&
      !path.includes("%") &&
      path.split("/").every((p) => p && p !== "." && p !== ".."),
    "Unsafe package path",
  );
  return path;
}
async function noSymlinks(directory, prefix = "") {
  assert.ok(
    (await lstat(directory)).isDirectory() &&
      !(await lstat(directory)).isSymbolicLink(),
    "Package root must be a real directory",
  );
  const paths = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    assert.ok(!item.isSymbolicLink(), "Package symlinks are forbidden");
    const path = `${prefix}${item.name}`;
    if (item.isDirectory())
      paths.push(...(await noSymlinks(join(directory, item.name), `${path}/`)));
    else {
      assert.ok(item.isFile(), "Package contains a non-file");
      paths.push(path);
    }
  }
  return paths;
}
function record(context, entry) {
  const definition = context.contentKinds[entry.kind];
  assert.ok(definition, `Unregistered kind: ${entry.kind}`);
  const canonical_body = canonicalJSON(entry.body);
  const fingerprint = sha256(canonical_body);
  return {
    key: entry.key,
    kind: entry.kind,
    identifier: entry.identifier,
    owner: definition.owner,
    schema_version: definition.schemaVersion,
    canonical_path: canonicalAddress(
      context,
      entry.kind,
      entry.identifier,
      entry.body.payload,
    ),
    collection_path: collectionAddress(context, entry.kind, entry.body.payload),
    body: entry.body,
    canonical_body,
    fingerprint,
    revision_id: contentUUID(
      `${entry.key}\0${definition.schemaVersion}\0${fingerprint}`,
    ),
    source_ref: entry.source_ref,
    source_review: entry.source_review,
  };
}

/** Offline only: compile every candidate, including keys that might already exist locally. */
export async function prepareRemoteImport(
  directory,
  { context, installedRoot = root } = {},
) {
  directory = resolve(directory);
  const packagePaths = await noSymlinks(directory);
  const packet = JSON.parse(await readArtifact(directory, "candidates.json"));
  object(
    packet,
    [
      "format",
      "version",
      "source",
      "files",
      "entries",
      "artifacts",
      "documents",
      "excluded",
    ],
    "packet",
  );
  assert.equal(packet.format, "gamemap.remote-candidates");
  assert.equal(packet.version, 1);
  object(packet.source, ["repository", "revision"], "source");
  assert.equal(packet.source.repository, remoteRepository);
  assert.match(packet.source.revision, /^[a-f0-9]{40}$/);
  for (const key of ["files", "entries", "artifacts", "documents", "excluded"])
    assert.ok(Array.isArray(packet[key]), `Invalid ${key}`);
  const files = new Map();
  const sources = new Map();
  for (const file of packet.files) {
    object(file, ["path", "sha256", "bytes"], "source file");
    remotePath(file.path);
    assert.ok(!files.has(file.path), "Duplicate source path");
    assert.match(file.sha256, hashPattern);
    assert.ok(
      Number.isSafeInteger(file.bytes) && file.bytes >= 0,
      "Invalid source size",
    );
    const bytes = await readArtifact(directory, `source/${file.path}`);
    assert.equal(
      bytes.length,
      file.bytes,
      `Source size mismatch: ${file.path}`,
    );
    assert.equal(
      sha256(bytes),
      file.sha256,
      `Source hash mismatch: ${file.path}`,
    );
    files.set(file.path, file);
    sources.set(file.path, bytes);
  }
  assert.deepEqual(
    packagePaths
      .filter((path) => path.startsWith("source/"))
      .map((path) => path.slice(7))
      .sort(),
    [...files.keys()].sort(),
    "Unmanifested or missing source copy",
  );
  const destinations = new Set();
  const gitIntegration = [];
  const artifactSources = new Map();
  for (const section of ["artifacts", "documents"])
    for (const item of packet[section]) {
      object(item, ["source_path", "path", "sha256", "bytes"], section);
      remotePath(item.source_path);
      remotePath(item.path);
      assert.ok(
        section === "artifacts"
          ? /^website\/public\/(media|logos)\//.test(item.path)
          : item.path.startsWith("docs/"),
        "Invalid proposed destination",
      );
      assert.ok(!destinations.has(item.path), "Duplicate proposed destination");
      destinations.add(item.path);
      const source = files.get(item.source_path);
      assert.ok(source, "Artifact/document source is not manifested");
      assert.equal(item.sha256, source.sha256);
      assert.equal(item.bytes, source.bytes);
      let status = "missing";
      try {
        status =
          sha256(await readArtifact(installedRoot, item.path)) === item.sha256
            ? "identical"
            : "conflict";
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      gitIntegration.push({ path: item.path, status });
      if (section === "documents") {
        assert.ok(
          /\.md$/i.test(item.path) && /\.md$/i.test(item.source_path),
          "Original documents must be Markdown files",
        );
      }
      if (section === "artifacts") {
        artifactSources.set(item.path, item.source_path);
        const bytes = await readArtifact(
          directory,
          `source/${item.source_path}`,
        );
        const extension = item.path.split(".").at(-1).toLowerCase();
        assert.ok(
          ["png", "jpg", "jpeg", "webp", "svg", "mp4"].includes(extension),
          "Unsupported proposed asset type",
        );
        if (extension === "mp4") {
          inspectMp4(bytes, item.path);
        } else if (extension === "svg") {
          // Treat as inert source text, never execute, inline or render remote SVG here.
          assert.match(
            bytes.toString("utf8"),
            /<svg[\s>]/i,
            "Invalid SVG source",
          );
        } else {
          const image = sharp(bytes, {
            failOn: "error",
            limitInputPixels: 40000000,
          });
          const metadata = await image.metadata();
          assert.equal(
            metadata.format,
            extension === "jpg" ? "jpeg" : extension,
            `Asset type differs from destination extension: ${item.path}`,
          );
          await image.raw().toBuffer();
        }
      }
    }
  const excluded = new Set();
  for (const item of packet.excluded) {
    object(item, ["key", "reason", "source_ref"], "excluded");
    text(item.key, "excluded key");
    text(item.reason, "exclusion reason");
    remotePath(item.source_ref);
    assert.ok(files.has(item.source_ref), "Excluded source is not manifested");
    assert.ok(!excluded.has(item.key), "Duplicate excluded key");
    excluded.add(item.key);
  }
  const keys = new Set();
  for (const entry of packet.entries) {
    object(
      entry,
      ["key", "kind", "identifier", "body", "source_ref", "source_review"],
      "entry",
    );
    text(entry.kind, "kind");
    text(entry.identifier, "identifier");
    assert.equal(entry.key, `${entry.kind}:${entry.identifier}`);
    assert.ok(
      !keys.has(entry.key) && !excluded.has(entry.key),
      "Duplicate or excluded candidate key",
    );
    keys.add(entry.key);
    remotePath(entry.source_ref);
    assert.ok(files.has(entry.source_ref), "Entry source is not manifested");
    assert.ok(
      entry.source_review &&
        typeof entry.source_review === "object" &&
        !Array.isArray(entry.source_review),
      "Invalid source review",
    );
    assert.equal(entry.source_review.remote_revision, packet.source.revision);
    assert.ok(
      !Object.keys(entry.source_review).some((key) =>
        key.startsWith("remote_import_"),
      ),
      "Reserved import provenance",
    );
    object(entry.body, ["title", "summary", "payload", "attachments"], "body");
    text(entry.body.title, "title");
    text(entry.body.summary, "summary");
  }
  context ??= await loadContent();
  await verifyRemoteSourceFidelity(packet, sources, context);
  for (const entry of packet.entries) {
    assert.equal(
      context.contentKinds[entry.kind]?.owner,
      "database",
      "Only registered database-owned kinds may be remote candidates; documents require Git integration",
    );
  }
  // Use existing sources only as validation context, never as candidates to insert.
  const records = new Map(
    context.registry.entries.map((entry) => [
      entry.key,
      {
        ...record(context, {
          key: entry.key,
          kind: entry.kind,
          identifier: entry.id,
          body: {
            title: entry.title,
            summary: entry.description,
            payload: entry.data,
            attachments:
              adapterFor(entry.kind).attachments?.(
                entry,
                context.sources,
                context.documents,
              ) || {},
          },
        }),
        canonical_path: entry.url,
        collection_path: entry.collectionUrl,
      },
    ]),
  );
  for (const entry of packet.entries)
    records.set(entry.key, record(context, entry));
  const result = await validateSelection(context, [...records.values()], [], {
    readAsset: (path) =>
      artifactSources.has(path)
        ? readArtifact(directory, `source/${artifactSources.get(path)}`)
        : readArtifact(root, path),
  });
  const projection = result.projection;
  const entries = projection.entries
    .filter((entry) => keys.has(entry.key))
    .map((entry) => {
      const original = records.get(entry.key);
      assert.equal(
        entry.canonical_body,
        original.canonical_body,
        `Lossy candidate normalization: ${entry.key}`,
      );
      return {
        ...entry,
        source_ref: original.source_ref,
        source_review: original.source_review,
      };
    });
  assert.equal(
    entries.length,
    keys.size,
    "Candidate missing from normalized projection",
  );
  const revisionIds = new Set(entries.map((e) => e.revision_id));
  const snapshot = {
    ...projection,
    format_version: 2,
    archive: { remote_source: packet.source },
    entries,
  };
  for (const section of [
    "entry_terms",
    "links",
    "relations",
    "asset_usages",
    "translations",
  ])
    snapshot[section] = projection[section].filter((row) =>
      revisionIds.has(row.revision_id),
    );
  const termKeys = new Set(snapshot.entry_terms.map((row) => row.term_key));
  const assetIds = new Set(snapshot.asset_usages.map((row) => row.asset_id));
  snapshot.terms = projection.terms.filter((row) => termKeys.has(row.key));
  snapshot.assets = projection.assets.filter((row) => assetIds.has(row.id));
  const provenance = canonicalJSON(packet);
  return {
    packet,
    provenance,
    batchDigest: sha256(provenance),
    snapshot,
    report: {
      candidates: entries.length,
      excluded: packet.excluded.length,
      artifactsRequiringGitIntegration: packet.artifacts.length,
      documentsRequiringGitIntegration: packet.documents.length,
      gitIntegration,
    },
  };
}

/** Source copies are not a new blob store: referenced assets must be integrated before DB apply. */
export async function assertRemoteImportAssets(
  prepared,
  { installedRoot = root } = {},
) {
  for (const asset of prepared.snapshot.assets) {
    const bytes = await readArtifact(installedRoot, asset.path);
    assert.equal(
      bytes.length,
      asset.bytes,
      `Referenced asset needs Git integration: ${asset.path}`,
    );
    assert.equal(
      sha256(bytes),
      asset.sha256,
      `Referenced asset conflict: ${asset.path}`,
    );
  }
}

/** Uses the exact inventory format produced by local-backup.mjs; never logs backup secrets. */
export async function verifyRemoteImportBackup(directory) {
  const manifest = JSON.parse(await readArtifact(directory, "manifest.json"));
  assert.equal(manifest.format, "gamemap.local-backup");
  assert.equal(manifest.version, 1);
  assert.equal(manifest.environment, "local");
  assert.deepEqual(manifest.schemas, ["auth", "catalog", "public"]);
  for (const [path, metadata] of [
    ["database.dump", manifest.database],
    ["runtime.env", manifest.runtime],
  ]) {
    const bytes = await readArtifact(directory, path);
    assert.ok(bytes.length > 0, "Empty backup");
    assert.equal(bytes.length, metadata.bytes);
    assert.equal(sha256(bytes), metadata.sha256);
  }
  for (const area of ["source", "media"]) {
    assert.ok(
      Array.isArray(manifest[area]),
      "Backup source/media manifest is missing",
    );
    for (const file of manifest[area]) {
      remotePath(file.path);
      const bytes = await readArtifact(directory, `${area}/${file.path}`);
      assert.equal(bytes.length, file.bytes);
      assert.equal(sha256(bytes), file.sha256);
    }
  }
  assert.ok(
    Array.isArray(manifest.database.tables) &&
      manifest.database.tables.length > 0,
    "Backup inventory is missing",
  );
  return manifest.database.tables;
}
export async function remoteDatabaseInventory(client) {
  const tables = (
    await client.query(
      "select schemaname,tablename from pg_tables where schemaname in ('auth','catalog','public') order by schemaname,tablename",
    )
  ).rows;
  const result = [];
  for (const { schemaname, tablename } of tables) {
    const quote = (name) => '"' + name.replaceAll('"', '""') + '"';
    const stats = (
      await client.query(
        `select count(*)::integer as rows,encode(sha256(convert_to(coalesce(string_agg(hash,',' order by hash),''),'UTF8')),'hex') as digest from (select encode(sha256(convert_to(to_jsonb(t)::text,'UTF8')),'hex') as hash from ${quote(schemaname)}.${quote(tablename)} t) records`,
      )
    ).rows[0];
    result.push({ schema: schemaname, table: tablename, ...stats });
  }
  return result;
}
export async function assertRemoteImportOwner(client, actor) {
  assert.match(
    actor,
    uuidPattern,
    "An explicit existing admin actor UUID is required",
  );
  const row = (
    await client.query(
      `select current_user = pg_get_userbyid(n.nspowner) as owns_catalog,
    exists(select 1 from catalog.memberships m join auth.users u on u.id=m.user_id where m.user_id=$1 and m.role='admin') as admin
    from pg_namespace n where n.nspname='catalog'`,
      [actor],
    )
  ).rows[0];
  assert.ok(
    row?.owns_catalog && row.admin,
    "Import requires the catalog owner connection and an existing Auth admin actor",
  );
}
export async function inspectRemoteImport(client, prepared) {
  const existing = (
    await client.query(
      "select e.key,r.body_text from catalog.entries e left join catalog.revisions r on r.id=e.head_revision_id where e.key=any($1::text[])",
      [prepared.snapshot.entries.map((e) => e.key)],
    )
  ).rows;
  const byKey = new Map(existing.map((e) => [e.key, e]));
  return {
    ...prepared.report,
    batchDigest: prepared.batchDigest,
    missing: prepared.snapshot.entries
      .filter((e) => !byKey.has(e.key))
      .map((e) => e.key),
    conflicts: prepared.snapshot.entries
      .filter((e) => byKey.has(e.key))
      .map((e) => ({
        key: e.key,
        sameBody: byKey.get(e.key).body_text === e.canonical_body,
      })),
  };
}
export async function applyRemoteImport(
  client,
  prepared,
  { actor, backupInventory },
) {
  // Caller must own the transaction. Lock before checking backup or discovering missing keys.
  await assertRemoteImportOwner(client, actor);
  await client.query("select pg_advisory_xact_lock(731552310)");
  // The catalog owner does not own Supabase Auth/public infrastructure tables.
  // Freeze all catalog writers, but never require broader system-table privileges.
  // The full backup inventory below still detects pre-existing changes anywhere.
  const tables = (
    await client.query(
      "select schemaname,tablename from pg_tables where schemaname='catalog' order by schemaname,tablename",
    )
  ).rows;
  for (const row of tables) {
    const quote = (s) => '"' + s.replaceAll('"', '""') + '"';
    await client.query(
      `lock table ${quote(row.schemaname)}.${quote(row.tablename)} in share row exclusive mode`,
    );
  }
  const prior = (
    await client.query(
      "select provenance from catalog.remote_import_batches where digest=$1",
      [prepared.batchDigest],
    )
  ).rows[0];
  // Exact retries do not mutate anything, even if unrelated rows have changed since the backup.
  if (prior) {
    assert.deepEqual(
      prior.provenance,
      JSON.parse(prepared.provenance),
      "Batch digest collision",
    );
    return (
      await client.query(
        "select result from catalog.remote_import_batches where digest=$1",
        [prepared.batchDigest],
      )
    ).rows[0].result;
  }
  assert.deepEqual(
    await remoteDatabaseInventory(client),
    backupInventory,
    "Database changed since backup; stop writers and create a fresh local backup",
  );
  await client.query("select set_config('request.jwt.claim.sub',$1,true)", [
    actor,
  ]);
  const snapshot = canonicalJSON(prepared.snapshot);
  return (
    await client.query(
      "select catalog.import_remote_snapshot($1,$2,$3,$4) as result",
      [
        prepared.provenance,
        prepared.batchDigest,
        snapshot,
        digest(prepared.snapshot),
      ],
    )
  ).rows[0].result;
}
