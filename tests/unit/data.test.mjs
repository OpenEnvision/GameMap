import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { loadContent } from "../../scripts/lib/content.mjs";
import { root } from "../../scripts/lib/documents.mjs";
import {
  createImportBundle,
  verifyImportBundle,
  importSQL,
} from "../../scripts/lib/platform.mjs";
import {
  canonicalJSON,
  sha256,
  safePath,
} from "../../scripts/lib/catalog/codec.mjs";
import { main } from "../../scripts/platform/package.mjs";

const context = await loadContent();
const bundle = await createImportBundle(context);
const clone = () => structuredClone(bundle);
const resign = (value) => {
  value.digest = sha256(canonicalJSON(value.snapshot));
  return value;
};

test("migration is deterministic and independently covers every current kind and canonical address", async () => {
  assert.deepEqual(bundle, await createImportBundle(context));
  const report = await verifyImportBundle(bundle, { filesRoot: root, context });
  assert.equal(report.entries, context.registry.entries.length);
  for (const kind of Object.keys(context.contentKinds))
    assert.equal(report.counts[kind] ?? 0, context.registry.all(kind).length);
  assert.deepEqual(
    new Set(bundle.snapshot.entries.map((row) => row.canonical_path)),
    new Set(context.registry.entries.map((row) => row.url)),
  );
  assert.equal(report.automatic_project_merges, 0);
  assert.equal(report.initial_state, "draft");
  assert.ok(report.possible_project_matches.length > 0);
});

test("typed data, attribution, review scope and all original recordings remain intact", () => {
  for (const row of bundle.snapshot.entries) {
    assert.deepEqual(
      row.body.payload,
      JSON.parse(JSON.stringify(context.registry.byKey(row.key).data)),
    );
    assert.equal(row.fingerprint, sha256(row.canonical_body));
    assert.deepEqual(JSON.parse(row.canonical_body), row.body);
    assert.equal(row.owner, context.contentKinds[row.kind].owner);
    assert.equal(
      row.schema_version,
      context.contentKinds[row.kind].schemaVersion,
    );
    assert.equal(Object.hasOwn(row.body, "schema_version"), false);
  }
  const original = context.sources.repositoryResearch.records[0];
  const migrated = bundle.snapshot.entries.find(
    (row) => row.key === `repository-research:${original.requested_repo}`,
  );
  assert.equal(migrated.source_review.review_status, original.review_status);
  assert.equal(
    migrated.source_review.execution_validation,
    original.execution_validation,
  );
  const demos = bundle.snapshot.entries.filter((row) => row.kind === "demo");
  assert.equal(
    demos.length,
    context.sources.recordings.flatMap((row) => row.views).length,
  );
  for (const row of bundle.snapshot.entries.filter(
    (row) => row.kind === "example",
  ))
    assert.deepEqual(
      row.body.attachments.agentAttribution,
      context.sources.gameCaseAgents[row.identifier],
    );
});

test("deleting a projection row cannot pass by recomputing the package digest", async () => {
  const next = clone();
  next.snapshot.entries.pop();
  await assert.rejects(
    verifyImportBundle(resign(next), { context }),
    /projection mismatch: entries/,
  );
});

test("deleting records from both aggregate sources and projections still fails independent inventory", async () => {
  const next = clone();
  const row = next.snapshot.archive.sources.resources.pop();
  next.snapshot.entries = next.snapshot.entries.filter(
    (entry) => entry.key !== `resource:${row.id}`,
  );
  await assert.rejects(
    verifyImportBundle(resign(next), { context }),
    /source collections/,
  );
});

test("translation values and reviewed source fingerprints cannot silently disappear", async () => {
  const next = clone();
  next.snapshot.translations.pop();
  await assert.rejects(
    verifyImportBundle(resign(next), { context }),
    /projection mismatch: translations/,
  );
  const altered = clone();
  const first = Object.keys(altered.snapshot.archive.localization.content)[0];
  delete altered.snapshot.archive.localization.content[first];
  await assert.rejects(
    verifyImportBundle(resign(altered), { context }),
    /translations differ/,
  );
});

test("source archives are compared with the checkout, never evaluated as uploaded JavaScript", async () => {
  const next = clone();
  const source = next.snapshot.source_files.find((file) =>
    file.path.endsWith("ai3dCases.ts"),
  );
  source.content = "throw new Error('ARCHIVE_WAS_EXECUTED')";
  source.sha256 = sha256(source.content);
  await assert.rejects(
    verifyImportBundle(resign(next), { context }),
    /Source checkout differs/,
  );
  const omitted = clone();
  omitted.snapshot.source_files.pop();
  await assert.rejects(
    verifyImportBundle(resign(omitted), { context }),
    /source-file inventory|Unarchived source/,
  );
});

test("missing artifacts, path traversal and damaged Markdown are rejected", async () => {
  const missing = clone();
  missing.snapshot.artifacts.pop();
  await assert.rejects(
    verifyImportBundle(resign(missing), { context }),
    /artifact inventory|Missing local asset/,
  );
  const unsafe = clone();
  unsafe.snapshot.artifacts[0].path = "../private.env";
  await assert.rejects(
    verifyImportBundle(resign(unsafe), { context }),
    /Unsafe artifact path/,
  );
  for (const path of ["/etc/passwd", "a/../../secret", "a\\secret", "./secret"])
    assert.throws(() => safePath(root, path), /Unsafe artifact path/);
  const document = clone();
  document.snapshot.archive.document_bodies[
    document.snapshot.archive.documents[0].source
  ] += "\nDamaged";
  await assert.rejects(
    verifyImportBundle(resign(document), { context }),
    /Archived document mismatch/,
  );
});

test("file hashes are checked, not just filenames and byte counts", async () => {
  const directory = await mkdtemp(join(tmpdir(), "gamemap-damaged-"));
  try {
    const artifact = bundle.snapshot.artifacts[0];
    const bytes = await readFile(safePath(root, artifact.path));
    bytes[0] ^= 1;
    const file = safePath(directory, artifact.path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, bytes);
    await assert.rejects(
      verifyImportBundle(bundle, { filesRoot: directory, context }),
      /Artifact digest mismatch/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("CLI round trip copies files, verifies SQL and refuses overwrites or public output", async () => {
  const directory = await mkdtemp(join(tmpdir(), "gamemap-platform-"));
  try {
    const output = join(directory, "package");
    const report = await main(["export", "--out", output]);
    assert.equal(report.entries, bundle.snapshot.entries.length);
    await main(["verify", "--input", output]);
    await assert.rejects(main(["export", "--out", output]), /EEXIST/);
    await assert.rejects(
      main(["export", "--out", "website/public/private-import"]),
      /private output/,
    );
    await assert.rejects(
      main(["export", "--out", ".git/private-import"]),
      /private output/,
    );
    await writeFile(join(output, "import.sql"), "select 'tampered';\n");
    await assert.rejects(main(["verify", "--input", output]), /SQL differs/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("old draft package formats are rejected instead of silently importing under a new contract", async () => {
  const old = clone();
  old.version = 1;
  await assert.rejects(
    verifyImportBundle(old, { context }),
    /Unsupported migration version/,
  );
  assert.throws(() => importSQL(old), /Unsupported migration version/);
});

test("SQL export refuses unsigned changes and safely quotes text as data", () => {
  const corrupt = clone();
  corrupt.digest = "0".repeat(64);
  assert.throws(() => importSQL(corrupt), /corrupt migration/);
  const next = clone();
  next.snapshot.sql_escaping_test = "quote ' slash \\ and $$; rollback; --";
  const sql = importSQL(resign(next));
  assert.ok(
    sql.includes(
      JSON.stringify(next.snapshot.sql_escaping_test)
        .slice(1, -1)
        .replaceAll("'", "''"),
    ),
  );
  assert.ok(sql.startsWith("-- Generated migration package."));
});
