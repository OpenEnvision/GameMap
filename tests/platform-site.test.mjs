import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { loadContent } from "../scripts/lib/content.mjs";
import { canonicalJSON, sha256 } from "../scripts/lib/catalog/codec.mjs";
import {
  releaseBuildEnvironment,
  assertReleaseParity,
  verifySiteArtifact,
} from "../scripts/lib/catalog/site-build.mjs";
import { renderGeneratedDocuments } from "../scripts/lib/catalog/generated-documents.mjs";
import { documentGenerator } from "../scripts/lib/catalog/generated-registry.mjs";
import { assertMarkdownSafety } from "../scripts/lib/catalog/markdown-safety.mjs";
const context = await loadContent();

test("generated views are source-registered and independent of JSONB object key order", () => {
  assert.deepEqual(
    renderGeneratedDocuments(context.sources),
    renderGeneratedDocuments(JSON.parse(canonicalJSON(context.sources))),
  );
  for (const document of context.documents)
    if (document.sourceMode === "generated")
      assert.ok(documentGenerator(document));
  assert.throws(
    () =>
      documentGenerator({
        ...context.documents[0],
        sourceMode: "generated",
        generatorKey: "database-javascript",
      }),
    /Unregistered/,
  );
  const generated = context.documents.find(
    (row) => row.sourceMode === "generated",
  );
  assert.throws(
    () =>
      documentGenerator({
        ...generated,
        sourceMode: "git",
        generatorKey: undefined,
      }),
    /masquerade/,
  );
});

test("Markdown permits literal expression-shaped text but rejects active HTML and link schemes", () => {
  assertMarkdownSafety(
    "# Fixture\n\n{globalThis.__gamemap_release_injection__ = true}",
    "fixture.md",
    { generated: true },
  );
  for (const text of [
    "<script>alert(1)</script>",
    "[click](javascript:alert%281%29)",
    "![pixel](https://example.invalid/pixel)",
  ])
    assert.throws(
      () => assertMarkdownSafety(text, "fixture.md", { generated: true }),
      /HTML|Unsafe|embed images/,
    );
});

test("release builders do not receive Auth, database, session, or Vite-prefixed credentials", () => {
  const names = [
    "SUPABASE_SECRET_KEY",
    "CATALOG_DATABASE_URL",
    "CATALOG_SESSION_SECRET",
    "VITE_SECRET",
  ];
  const before = Object.fromEntries(
    names.map((name) => [name, process.env[name]]),
  );
  try {
    for (const name of names) process.env[name] = "private-test-value";
    const env = releaseBuildEnvironment(
      "/private/workspace",
      "f".repeat(64),
      "/GameMap/",
    );
    for (const name of names) assert.equal(env[name], undefined);
    assert.equal(env.CATALOG_SITE_DIGEST, "f".repeat(64));
    assert.equal(env.PAGES_BASE_PATH, "/GameMap/");
  } finally {
    for (const name of names)
      before[name] === undefined
        ? delete process.env[name]
        : (process.env[name] = before[name]);
  }
});

test("release parity rejects silently removed records or moved stable addresses", () => {
  const entries = context.registry.entries.map((entry) => ({
    key: entry.key,
    canonical_path: entry.url,
    collection_path: entry.collectionUrl,
  }));
  const pack = (rows) => ({ manifest_text: JSON.stringify({ entries: rows }) });
  assertReleaseParity(context, pack(entries));
  assert.throws(
    () => assertReleaseParity(context, pack(entries.slice(1))),
    /drops an existing address/,
  );
  assert.throws(
    () =>
      assertReleaseParity(
        context,
        pack(
          entries.map((entry, index) =>
            index ? entry : { ...entry, canonical_path: "/moved/" },
          ),
        ),
      ),
    /changes an existing address/,
  );
});

test("artifact verification binds release identity, exact inventory and all byte checksums", async () => {
  const directory = await mkdtemp(join(tmpdir(), "gamemap-artifact-test-"));
  try {
    await mkdir(join(directory, "site"));
    const source = {
      mode: "release",
      release: "fixture",
      manifestDigest: "a".repeat(64),
      contextDigest: "b".repeat(64),
      gitCommit: "c".repeat(40),
      development: true,
    };
    const body = JSON.stringify({ source });
    await writeFile(join(directory, "site/site-manifest.json"), body);
    const files = [
      {
        path: "site-manifest.json",
        bytes: Buffer.byteLength(body),
        sha256: sha256(body),
      },
    ];
    const evidence = {
      format: "gamemap.site-artifact",
      version: 1,
      ...source,
      files,
      artifactDigest: sha256(canonicalJSON(files)),
    };
    await writeFile(join(directory, "evidence.json"), JSON.stringify(evidence));
    await verifySiteArtifact(directory);
    await writeFile(join(directory, "site/unreviewed.txt"), "extra");
    await assert.rejects(verifySiteArtifact(directory), /inventory changed/);
    await rm(join(directory, "site/unreviewed.txt"));
    await writeFile(
      join(directory, "evidence.json"),
      JSON.stringify({ ...evidence, release: "different" }),
    );
    await assert.rejects(verifySiteArtifact(directory), /identity changed/);
    await writeFile(join(directory, "evidence.json"), JSON.stringify(evidence));
    await writeFile(join(directory, "site/site-manifest.json"), body + " ");
    await assert.rejects(verifySiteArtifact(directory), /size changed/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
