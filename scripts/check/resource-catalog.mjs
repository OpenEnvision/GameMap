import assert from "node:assert/strict";
import { loadContentRuntime } from "../lib/content.mjs";
import {
  catalogSegmentRule,
  loadCatalog,
  renderAwesome,
  validate,
} from "../lib/guides/catalog.mjs";
import { assertKnownSourceFiles } from "../lib/source-inventory.mjs";
import { readDocuments, preparedMarkdown } from "../lib/documents.mjs";
import {
  assertDocumentTranslation,
  applyTranslatedHeadingIds,
} from "../lib/document-translations.mjs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

// New array-shaped input must not silently become a public resource collection.
const unknown = "data/segments/unreviewed.json";
assert.throws(() => catalogSegmentRule(unknown, {}), /Unclassified segment/);
assert.throws(() => assertKnownSourceFiles([unknown], {}), /Unclassified data/);
assert.throws(
  () => catalogSegmentRule(unknown, { [unknown]: { exports: {} } }),
  /exports.default.kind/,
);
assert.throws(
  () =>
    catalogSegmentRule(unknown, {
      [unknown]: {
        exports: { default: { kind: "resource", shape: "metadata" } },
      },
    }),
  /array shape/,
);

const records = validate(await loadCatalog());
const englishCatalog = renderAwesome(records, {
  source: "docs/reference/catalog.md",
});
const chineseCatalog = renderAwesome(records, {
  source: "docs/zh/reference/catalog.md",
  locale: "zh",
});
const documents = await readDocuments();
assertDocumentTranslation(
  documents.find((page) => page.slug === "reference/catalog"),
  documents.find((page) => page.slug === "zh/reference/catalog"),
  englishCatalog,
  chineseCatalog,
  documents,
);
applyTranslatedHeadingIds(
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(preparedMarkdown(chineseCatalog)),
  englishCatalog,
);
const byId = new Map(records.map((record) => [record.id, record]));
const sample = records[0];
assert.throws(
  () => validate([{ ...sample, collection: undefined }]),
  /Missing collection/,
);
assert.throws(
  () => validate([{ ...sample, collection: "unreviewed" }]),
  /Invalid collection/,
);
assert.throws(
  () => validate([{ ...sample, type: "paper", collection: "tools" }]),
  /research collection/,
);

// Preserve the editorial boundaries that prompted this resource-library cleanup.
for (const id of [
  "windows-ui-automation",
  "unity-addressables-scripting",
  "fastnoise-lite",
])
  assert.ok(byId.has(id), `Keep the reviewed resource boundary fixture: ${id}`);
assert.equal(byId.get("windows-ui-automation")?.collection, "reference");
assert.ok(
  !byId.get("unity-addressables-scripting")?.stages.includes("runtime"),
);
assert.ok(!byId.get("fastnoise-lite")?.stages.includes("world"));
assert.ok(!byId.get("fastnoise-lite")?.dimensions.includes("world"));

// Build from source segments so this regression check never needs generated files.
const runtime = await loadContentRuntime("/", {});
// Read genuine v1-shaped payloads through both supported source entry points.
const legacyFixtures = [
  ["codex", "agents", "agent", "tools"],
  ["gamegpt", "2d", "paper", "research"],
  ["gameenginebench", "3d", "benchmark", "research"],
  ["godot-demo-projects", "engines", "docs", "learning"],
  ["epic-developer-community", "engines", "community", "learning"],
  ["windows-ui-automation", "production", "docs", "reference"],
].map(([id, category, type, expectedCollection]) => {
  const payload = { ...byId.get(id), category, type };
  delete payload.collection;
  assert.ok(
    runtime.versionedContracts.resource[1].payload.safeParse(payload).success,
  );
  assert.ok(!runtime.payloadSchemas.resource.safeParse(payload).success);
  return { payload, expectedCollection };
});
const snapshot = (kind, identifier, payload, attachments = {}) => ({
  key: `${kind}:${identifier}`,
  kind,
  identifier,
  canonical_path: `/${kind}/${identifier}/`,
  collection_path: `/${kind}/`,
  schema_version: 1,
  owner: "database",
  revision_id: "legacy-read-regression",
  fingerprint: "legacy-read-regression",
  body: { title: identifier, summary: identifier, payload, attachments },
});
const pathSnapshots = ["2d", "3d", "world"].map((track) =>
  snapshot(
    "path",
    track,
    { id: track, ...runtime.tracks[track] },
    {
      editorial: runtime.sources.editorial[track],
      showcase: { ...runtime.sources.showcaseByTrack[track], cases: [] },
    },
  ),
);
const restored = runtime.assembleSources(
  [
    ...pathSnapshots,
    ...legacyFixtures.map(({ payload }) =>
      snapshot("resource", payload.id, payload),
    ),
  ],
  runtime.configurationFromSources(runtime.sources, []),
);
const historical = runtime.createRegistry(restored.sources, []);
const directLegacy = runtime.createRegistry(
  {
    ...restored.sources,
    resources: legacyFixtures.map(({ payload }) => payload),
  },
  [],
);
for (const { payload, expectedCollection } of legacyFixtures)
  for (const registry of [historical, directLegacy]) {
    const entry = registry.require("resource", payload.id);
    const { collection, ...authored } = entry.data;
    assert.equal(collection, expectedCollection);
    assert.deepEqual(
      authored,
      payload,
      "Legacy reading must preserve authored content and links",
    );
    assert.ok(entry.blocks.some((block) => block.field === "collection"));
    // This is the label lookup used by the resource card after registry loading.
    assert.equal(
      typeof runtime.runtimeTaxonomy.collections[collection].label,
      "string",
    );
  }
const english = runtime.createRegistry(
  { ...runtime.sources, resources: records },
  [],
);
const chinese = runtime.localizedRegistry(english, "zh");
const enEntries = english.all("resource");
const zhEntries = chinese.all("resource");
const search = runtime.buildResourceSearchText(enEntries, zhEntries);
const reverse = runtime.buildResourceSearchText(zhEntries, enEntries);
const hits = (index, query) =>
  records
    .filter((record) => runtime.matchesSearch(index[record.id], query))
    .map((record) => record.id)
    .sort();

for (const query of ["coding agent", "编程代理", "Game engines", "游戏引擎"])
  assert.deepEqual(
    hits(search, query),
    hits(reverse, query),
    `Resource search must be independent of page language: ${query}`,
  );
for (const record of records) {
  const category = runtime.runtimeTaxonomy.categories[record.category];
  const type = runtime.runtimeTaxonomy.types[record.type];
  const collection = runtime.runtimeTaxonomy.collections[record.collection];
  for (const label of [category.label, type, collection.label])
    for (const query of [label, runtime.translate("zh", label)])
      assert.ok(
        runtime.matchesSearch(search[record.id], query),
        `${record.id}: missing searchable facet label ${query}`,
      );
  if (record.category === "engines")
    for (const alias of ["Game engines", "游戏引擎"])
      assert.ok(runtime.matchesSearch(search[record.id], alias));
}
for (const entry of enEntries) {
  const blocks = runtime.searchableBlocks(entry);
  for (const field of ["category", "type", "collection"])
    assert.ok(blocks.some((block) => block.field === field));
  assert.ok(
    !blocks.some((block) => ["verified", "year"].includes(block.field)),
  );
}
for (const entry of english.all("paper"))
  assert.ok(
    runtime
      .searchableBlocks(entry)
      .every((block) => block.section !== "metadata"),
    "Resource facet indexing must not change metadata search for other collections",
  );
console.log(
  `Resource-library regressions passed: ${records.length} explicitly admitted resources, collection boundaries, and bilingual category/type/collection search.`,
);
