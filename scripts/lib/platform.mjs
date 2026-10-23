import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { loadContent } from "./content.mjs";
import { loadCatalog, validate } from "../catalog.mjs";
import { root, walk, publishablePath } from "./documents.mjs";
import { loadMigrations } from "./migrations.mjs";
import { adapterFor } from "./catalog/adapters.mjs";
import { projectSnapshot } from "./catalog/projection.mjs";
import { validateSelection } from "./catalog/validation.mjs";
import { documentGenerators } from "./catalog/generated-registry.mjs";
import {
  canonicalJSON,
  digest,
  json,
  readArtifact,
  safePath,
  sha256,
  sorted,
} from "./catalog/codec.mjs";

export const importFormat = "gamemap.content-import";
// Package serialization is independent of each content kind's schema_version.
export const packageVersion = 2;
const toolFiles = [
  "scripts/platform.mjs",
  "scripts/studio.mjs",
  "scripts/studio-dev.mjs",
  "scripts/build-studio.mjs",
  "scripts/release.mjs",
  "scripts/site-release.mjs",
  "vite.config.ts", "react-router.config.ts", "playwright.release.config.ts", "tsconfig.json", "website/docs.config.json",
  "scripts/lib/platform.mjs",
  "scripts/lib/migrations.mjs",
  "scripts/lib/content.mjs",
  "scripts/lib/documents.mjs",
  "scripts/lib/source-inventory.mjs",
  "scripts/catalog.mjs",
  "package.json",
  "package-lock.json",
  "supabase/config.toml",
];

async function sourcePaths(context) {
  const modules = (await walk(resolve(root, "scripts/lib/catalog"))).filter(
    (file) => file.endsWith(".mjs"),
  );
  const migrations = await loadMigrations();
  const rendererFiles = (await Promise.all(['scripts', 'website/app', 'website/content', 'website/src', 'website/public/brand'].map((path) => walk(resolve(root, path)))))
    .flat().filter((file) => /\.(mjs|ts|tsx|json|css|svg)$/.test(file)).map((file) => relative(root, file));
  return [
    ...new Set([
      ...toolFiles,
      ...rendererFiles,
      ...Object.values(documentGenerators).map((definition) => definition.renderer),
      ...modules.map((file) => relative(root, file)),
      ...migrations.map((migration) => migration.path),
      ...Object.keys(context.contracts),
      ...context.inputs.filter((path) =>
        /^(website\/(content|src\/data)\/|data\/)/.test(path),
      ),
    ]),
  ].sort();
}

async function visibleArtifacts() {
  let files;
  try {
    files = execFileSync(
      "git",
      [
        "ls-files",
        "-z",
        "--cached",
        "--others",
        "--exclude-standard",
        "--",
        "website/public",
        "docs",
      ],
      { cwd: root, encoding: "utf8" },
    )
      .split("\0")
      .filter(Boolean);
  } catch {
    files = (
      await Promise.all(
        ["website/public", "docs"].map((folder) => walk(resolve(root, folder))),
      )
    )
      .flat()
      .map((file) => relative(root, file));
  }
  return [...new Set(files)]
    .filter(
      (file) =>
        publishablePath(file) &&
        !(file.startsWith("docs/") && file.endsWith(".md")) &&
        !file.startsWith("website/public/docs-assets/"),
    )
    .sort();
}

export async function createImportBundle(context = undefined) {
  context ??= await loadContent();
  assert.deepEqual(
    json(context.sources.resources),
    validate(await loadCatalog()),
    "Generated catalog is stale; run node scripts/generate.mjs first",
  );
  const document_bodies = {};
  for (const page of context.documents) {
    const body = await readFile(resolve(root, page.source), "utf8");
    assert.equal(
      sha256(body),
      page.sourceHash,
      `Stale document: ${page.source}`,
    );
    document_bodies[page.source] = body;
  }
  const source_files = [];
  for (const path of await sourcePaths(context)) {
    const content = await readFile(safePath(root, path), "utf8");
    source_files.push({ path, sha256: sha256(content), content });
  }
  const artifacts = [];
  for (const path of await visibleArtifacts()) {
    const bytes = await readArtifact(root, path);
    artifacts.push({ path, sha256: sha256(bytes), bytes: bytes.length });
  }
  const archive = json({
    sources: context.sources,
    documents: context.documents,
    document_bodies,
    localization: context.localizationSnapshot,
    translation_catalogs: context.translationCatalogs,
    contracts: context.contracts,
  });
  const taxonomy = JSON.parse(
    await readFile(resolve(root, "website/content/taxonomy.json"), "utf8"),
  );
  let git_commit = null;
  try {
    git_commit = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();
  } catch {
    /* source archive */
  }
  const snapshot = {
    format_version: packageVersion,
    git_commit,
    taxonomy,
    archive,
    source_files,
    artifacts,
    ...projectSnapshot(context, archive, taxonomy, artifacts),
  };
  await validateSelection(context, snapshot.entries, snapshot.translations, {
    checkDocuments: true,
  });
  return {
    format: importFormat,
    version: packageVersion,
    digest: digest(snapshot),
    snapshot,
  };
}

/** Source-pinned verification never evaluates archived JavaScript. A Git hash alone does not
 * describe local edits; the source files, migration modules and contracts are also pinned. */
async function verifyArchivedSources(snapshot, context) {
  assert.deepEqual(
    snapshot.source_files.map((file) => file.path),
    await sourcePaths(context),
    "Migration source-file inventory differs from checkout",
  );
  assert.deepEqual(
    snapshot.artifacts.map((file) => file.path),
    await visibleArtifacts(),
    "Migration artifact inventory differs from checkout",
  );
  assert.deepEqual(
    Object.keys(snapshot.archive.document_bodies).sort(),
    snapshot.archive.documents.map((page) => page.source).sort(),
    "Migration Markdown inventory differs from metadata",
  );
  for (const file of snapshot.source_files)
    assert.equal(
      sha256(await readArtifact(root, file.path)),
      file.sha256,
      `Source checkout differs from migration: ${file.path}`,
    );
  assert.deepEqual(
    snapshot.archive.contracts,
    json(context.contracts),
    "Migration source inventory differs from checkout",
  );
  assert.deepEqual(
    snapshot.archive.sources,
    json(context.sources),
    "Archived modules differ from migration source collections",
  );
  assert.deepEqual(
    snapshot.archive.documents,
    json(context.documents),
    "Migration document inventory differs from checkout",
  );
  assert.deepEqual(
    snapshot.archive.localization,
    json(context.localizationSnapshot),
    "Migration translations differ from checkout",
  );
  assert.deepEqual(
    snapshot.archive.translation_catalogs,
    json(context.translationCatalogs),
    "Migration translation catalogs differ from checkout",
  );
  const taxonomy = JSON.parse(
    await readFile(resolve(root, "website/content/taxonomy.json"), "utf8"),
  );
  assert.deepEqual(
    snapshot.taxonomy,
    taxonomy,
    "Migration taxonomy differs from checkout",
  );
}

/** Verify projections against independently loaded typed sources, not self-reported counts. */
export async function verifyImportBundle(bundle, { filesRoot, context } = {}) {
  assert.equal(bundle.format, importFormat, "Unknown migration format");
  assert.equal(
    bundle.version,
    packageVersion,
    "Unsupported migration version; regenerate the package",
  );
  assert.equal(
    bundle.snapshot.format_version,
    packageVersion,
    "Unsupported snapshot format",
  );
  assert.equal(
    bundle.digest,
    digest(bundle.snapshot),
    "Migration digest mismatch",
  );
  context ??= await loadContent();
  const { snapshot } = bundle;
  const paths = new Set();
  for (const file of snapshot.source_files) {
    safePath(root, file.path);
    assert.ok(!paths.has(file.path), `Duplicate archived source: ${file.path}`);
    paths.add(file.path);
    assert.equal(
      sha256(file.content),
      file.sha256,
      `Archived source digest mismatch: ${file.path}`,
    );
  }
  for (const path of Object.keys(snapshot.archive.contracts))
    assert.ok(paths.has(path), `Unarchived source module: ${path}`);
  for (const document of snapshot.archive.documents)
    assert.equal(
      sha256(snapshot.archive.document_bodies[document.source]),
      document.sourceHash,
      `Archived document mismatch: ${document.source}`,
    );
  const artifactPaths = new Set();
  for (const artifact of snapshot.artifacts) {
    safePath(root, artifact.path);
    assert.ok(
      !artifactPaths.has(artifact.path),
      `Duplicate artifact: ${artifact.path}`,
    );
    artifactPaths.add(artifact.path);
    assert.match(artifact.sha256, /^[a-f0-9]{64}$/);
    assert.ok(
      Number.isSafeInteger(artifact.bytes) && artifact.bytes >= 0,
      `Invalid artifact size: ${artifact.path}`,
    );
    if (filesRoot) {
      const bytes = await readArtifact(filesRoot, artifact.path);
      assert.equal(
        bytes.length,
        artifact.bytes,
        `Artifact size mismatch: ${artifact.path}`,
      );
      assert.equal(
        sha256(bytes),
        artifact.sha256,
        `Artifact digest mismatch: ${artifact.path}`,
      );
    }
  }
  await verifyArchivedSources(snapshot, context);
  const projection = projectSnapshot(
    context,
    snapshot.archive,
    snapshot.taxonomy,
    snapshot.artifacts,
  );
  for (const [name, rows] of Object.entries(projection))
    assert.deepEqual(
      snapshot[name],
      rows,
      `Migration projection mismatch: ${name}`,
    );
  await validateSelection(context, snapshot.entries, snapshot.translations, {
    checkDocuments: true,
    readAsset: filesRoot ? (path) => readArtifact(filesRoot, path) : undefined,
  });
  return importReport(bundle);
}

export function importReport(bundle) {
  const { snapshot } = bundle;
  const counts = {};
  const candidateUrls = new Map();
  for (const entry of snapshot.entries) {
    counts[entry.kind] = (counts[entry.kind] || 0) + 1;
    const url = adapterFor(entry.kind).projectUrl?.(entry.body.payload);
    if (url) {
      const normalized = new URL(url);
      normalized.hash = "";
      const key = normalized.toString().replace(/\/$/, "");
      candidateUrls.set(key, [...(candidateUrls.get(key) || []), entry.key]);
    }
  }
  return {
    format: bundle.format,
    version: bundle.version,
    digest: bundle.digest,
    git_commit: snapshot.git_commit,
    entries: snapshot.entries.length,
    counts,
    source_modules: Object.keys(snapshot.archive.contracts).length,
    source_files: snapshot.source_files.length,
    links: snapshot.links.length,
    relations: snapshot.relations.length,
    schemas: snapshot.schemas,
    locales: snapshot.locales.map((locale) => locale.code),
    translations: snapshot.translations.length,
    assets: snapshot.assets.length,
    artifacts: snapshot.artifacts.length,
    artifact_bytes: snapshot.artifacts.reduce(
      (sum, file) => sum + file.bytes,
      0,
    ),
    initial_state: "draft",
    automatic_project_merges: 0,
    possible_project_matches: sorted(
      [...candidateUrls]
        .filter(([, keys]) => keys.length > 1)
        .map(([url, keys]) => ({ url, keys })),
      (row) => row.url,
    ),
    warnings: [
      "Source review is not reproduction or publishing approval.",
      "Project matches are review suggestions, never automatic identity merges.",
      "This is a migration package, not a public release. Do not publish its SQL or source archive.",
    ],
  };
}

export function importSQL(bundle) {
  assert.equal(
    bundle.version,
    packageVersion,
    "Unsupported migration version; regenerate the package",
  );
  assert.equal(
    bundle.digest,
    digest(bundle.snapshot),
    "Cannot render SQL for a corrupt migration",
  );
  const literal = (text) => `'${text.replaceAll("'", "''")}'`;
  return (
    `-- Generated migration package. Apply only after reviewing report.json and taking a database backup.\n` +
    `-- Re-importing the identical package is a no-op. Existing identities are never overwritten.\n` +
    `begin;\nset local standard_conforming_strings = on;\nselect catalog.import_snapshot(${literal(canonicalJSON(bundle.snapshot))}, ${literal(bundle.digest)});\ncommit;\n`
  );
}
