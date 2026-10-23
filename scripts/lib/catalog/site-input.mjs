import assert from "node:assert/strict";
import { resolve } from "node:path";
import { realpath } from "node:fs/promises";
import { root } from "../documents.mjs";
import { readArtifact, canonicalJSON, digest, sha256 } from "./codec.mjs";
import { readReleaseData } from "./validation.mjs";

export const isDevelopmentRelease = (build) =>
  build.environment !== "production" || build.source_dirty !== false;

export function materializeSiteInput(context, pack) {
  const data = readReleaseData(context, pack);
  const catalogs = {};
  const byRevision = new Map(
    data.manifest.entries.map((row) => [row.revision_id, row]),
  );
  for (const row of data.manifest.translations) {
    const record = byRevision.get(row.revision_id);
    assert.ok(record, "Translation refers to another release");
    const catalog = (catalogs[row.locale] ??= {
      content: {},
      fingerprints: {},
    });
    (catalog.content[record.key] ??= {})[row.field] = row.value;
    (catalog.fingerprints[record.key] ??= {})[row.field] = row.source_hash;
  }
  return {
    format: "gamemap.site-input",
    version: 1,
    source: {
      mode: "release",
      release: pack.id,
      manifestDigest: pack.manifest_digest,
      contextDigest: pack.context_digest,
      gitCommit: data.build.git_commit,
      development: isDevelopmentRelease(data.build),
    },
    records: data.manifest.entries,
    sources: data.sources,
    documents: data.documents,
    catalogs,
  };
}

/** Only an explicit isolated build may use this input. A leftover file never changes Git authoring. */
export async function readSiteInput() {
  if (!process.env.CATALOG_SITE_INPUT) return null;
  assert.equal(
    await realpath(resolve(process.env.CATALOG_SITE_INPUT)),
    await realpath(resolve(root, "website/.content/release-input.json")),
    "Release input must be materialized inside the isolated build workspace",
  );
  const bytes = await readArtifact(root, "website/.content/release-input.json");
  assert.equal(
    sha256(bytes),
    process.env.CATALOG_SITE_DIGEST,
    "Release build input changed",
  );
  const input = JSON.parse(bytes);
  assert.equal(input.format, "gamemap.site-input");
  assert.equal(input.version, 1);
  assert.ok(
    input.records?.length && input.sources && input.catalogs && input.documents,
    "Incomplete release input",
  );
  for (const record of input.records)
    assert.equal(
      digest(record.body),
      record.fingerprint,
      `Release revision changed: ${record.key}`,
    );
  return input;
}

export function assertSiteInput(context, input) {
  assert.equal(
    context.registry.entries.length,
    input.records.length,
    "Release input gained or lost records",
  );
  for (const record of input.records) {
    const entry = context.registry.byKey(record.key);
    assert.ok(entry, `Missing release record: ${record.key}`);
    assert.equal(
      canonicalJSON(entry.data),
      canonicalJSON(record.body.payload),
      `Release fields changed: ${record.key}`,
    );
    assert.equal(
      entry.url,
      record.canonical_path,
      `Release address changed: ${record.key}`,
    );
  }
}
