import { test } from "node:test";
import assert from "node:assert/strict";
import { loadContent } from "../../scripts/lib/content.mjs";
import { loadMigrations, migrationNames } from "../../scripts/lib/migrations.mjs";
import { createImportBundle } from "../../scripts/lib/platform.mjs";
import {
  kindAdapters,
  registryDefinitions,
} from "../../scripts/lib/catalog/adapters.mjs";
import { projectSnapshot } from "../../scripts/lib/catalog/projection.mjs";
import { sha256, digest } from "../../scripts/lib/catalog/codec.mjs";
import { validateSelection } from "../../scripts/lib/catalog/validation.mjs";

const context = await loadContent();
const bundle = await createImportBundle(context);

function withDataset() {
  const entry = {
    key: "dataset:fixture",
    kind: "dataset",
    id: "fixture",
    title: "Dataset fixture",
    description: "Typed extension fixture, not a published source.",
    url: "/datasets/fixture/",
    collectionUrl: "/datasets/",
    source: "fixture://dataset",
    data: {
      id: "fixture",
      title: "Dataset fixture",
      summary: "Typed extension fixture, not a published source.",
      dimensions: ["3d"],
    },
    blocks: [{ field: "title", type: "title", value: "Dataset fixture" }],
  };
  const entries = [...context.registry.entries, entry];
  const registry = {
    ...context.registry,
    entries,
    byKey: (key) => entries.find((item) => item.key === key),
  };
  return {
    ...context,
    contentKinds: {
      ...context.contentKinds,
      dataset: {
        label: "Dataset",
        plural: "Datasets",
        page: "resources",
        owner: "database",
        schemaVersion: 2,
        validatorKey: "gamemap.dataset",
      },
    },
    createRegistry: () => registry,
  };
}

test("migration discovery uses semantic sequential versions and pins every module", async () => {
  const migrations = await loadMigrations();
  const names = migrations.map((file) => file.path.split("/").at(-1));
  assert.ok(names.length >= 5);
  assert.equal(names[0], "0001_catalog_core.sql");
  assert.deepEqual(names, migrationNames(names));
  for (const migration of migrations)
    assert.ok(
      bundle.snapshot.source_files.some(
        (file) =>
          file.path === migration.path && file.content === migration.sql,
      ),
    );
  assert.deepEqual(
    migrationNames([
      "0002_catalog_workflow.sql",
      "README.md",
      "0001_catalog_core.sql",
    ]),
    ["0001_catalog_core.sql", "0002_catalog_workflow.sql"],
  );
  for (const files of [
    [],
    ["20990101000000_catalog.sql"],
    ["0002_catalog.sql"],
    ["0001_a.sql", "0001_b.sql"],
    ["0001_catalog.sql", "0003_gap.sql"],
  ])
    assert.throws(() => migrationNames(files), /migration|Migration/);
});

test("kind metadata has explicit ownership and per-kind schema contracts", () => {
  const definitions = registryDefinitions(context);
  assert.equal(
    definitions.content_kinds.length,
    Object.keys(context.contentKinds).length,
  );
  for (const row of definitions.schemas) {
    assert.equal(row.version, context.contentKinds[row.kind].schemaVersion);
    assert.equal(
      context.versionedContracts[row.kind][row.version].validatorKey,
      row.validator_key,
    );
  }
  const broken = withDataset();
  broken.contentKinds.dataset.schemaVersion = 0;
  assert.throws(() => registryDefinitions(broken), /schema version/);
});

test("an unhandled content kind cannot silently acquire a lossy default adapter", () => {
  assert.throws(
    () =>
      projectSnapshot(
        withDataset(),
        bundle.snapshot.archive,
        bundle.snapshot.taxonomy,
        bundle.snapshot.artifacts,
      ),
    /Unregistered content adapter: dataset/,
  );
});

test("registering one strategy projects a new kind without changing the generic import engine", () => {
  const extended = withDataset();
  const adapters = {
    ...kindAdapters,
    dataset: {
      facets: () => [
        { scheme: "dataset-domain", value: "games", controlled: true },
      ],
    },
  };
  const result = projectSnapshot(
    extended,
    bundle.snapshot.archive,
    bundle.snapshot.taxonomy,
    bundle.snapshot.artifacts,
    adapters,
  );
  const entry = result.entries.find((row) => row.key === "dataset:fixture");
  assert.equal(entry.schema_version, 2);
  assert.equal(entry.owner, "database");
  assert.equal(entry.identifier, "fixture");
  assert.ok(result.terms.some((term) => term.key === "dataset-domain:games"));
  assert.ok(
    result.schemas.some(
      (schema) => schema.kind === "dataset" && schema.version === 2,
    ),
  );
  assert.equal(result.entries.length, bundle.snapshot.entries.length + 1);
});

test("translation projection iterates registered locales and binds every field to its source", () => {
  const extended = withDataset();
  extended.locales = [...context.locales, "ja"];
  const archive = structuredClone(bundle.snapshot.archive);
  archive.translation_catalogs.ja = {
    content: { "dataset:fixture": { title: "データセット" } },
    fingerprints: {
      "dataset:fixture": { title: sha256(JSON.stringify("Dataset fixture")) },
    },
  };
  const adapters = { ...kindAdapters, dataset: {} };
  const result = projectSnapshot(
    extended,
    archive,
    bundle.snapshot.taxonomy,
    bundle.snapshot.artifacts,
    adapters,
  );
  assert.equal(
    result.translations.find((row) => row.locale === "ja").value,
    "データセット",
  );
  assert.equal(
    result.translations.length,
    bundle.snapshot.translations.length + 1,
  );
  archive.translation_catalogs.ja.fingerprints["dataset:fixture"].title =
    "0".repeat(64);
  assert.throws(
    () =>
      projectSnapshot(
        extended,
        archive,
        bundle.snapshot.taxonomy,
        bundle.snapshot.artifacts,
        adapters,
      ),
    /Stale translation: ja/,
  );
  extended.locales = context.locales;
  assert.throws(
    () =>
      projectSnapshot(
        extended,
        archive,
        bundle.snapshot.taxonomy,
        bundle.snapshot.artifacts,
        adapters,
      ),
    /Unregistered translation locale/,
  );
});

test("images are versioned, public URLs exclude credentials, and explicit artwork credits survive rendering", async () => {
  const resource = bundle.snapshot.entries.find(
    (row) => row.kind === "resource",
  );
  assert.equal(
    context.payloadSchemas.resource.safeParse({
      ...resource.body.payload,
      url: "https://user:secret@example.invalid/",
    }).success,
    false,
  );
  assert.equal(
    context.attachmentSchemas.resource.safeParse({
      ...resource.body.attachments,
      projectMedia: {
        src: "https://example.invalid/unversioned.webp",
        alt: "Fixture",
        source: "https://example.invalid/",
        credit: "Fixture",
        kind: "official-demo",
      },
    }).success,
    false,
  );
  const example = structuredClone(
    bundle.snapshot.entries.find((row) => row.kind === "example").body
      .attachments,
  );
  delete example.learningMedia.origin;
  assert.equal(
    context.attachmentSchemas.example.safeParse(example).success,
    false,
  );
  const records = structuredClone(bundle.snapshot.entries);
  const path = records.find((row) => row.kind === "path");
  path.body.attachments.editorial.credit = "Explicit test credit";
  path.body.attachments.editorial.sourceUrl = "https://example.invalid/artwork";
  path.fingerprint = digest(path.body);
  const checked = await validateSelection(
    context,
    records,
    bundle.snapshot.translations,
  );
  const image = checked.registry
    .byKey(path.key)
    .blocks.find((block) => block.type === "image");
  assert.equal(image.credit, "Explicit test credit");
  assert.equal(image.source, "https://example.invalid/artwork");
});
