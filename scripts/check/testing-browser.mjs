import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";
import { loadContentRuntime } from "../lib/content.mjs";
import { root } from "../lib/documents.mjs";

const bundle = await build({
  stdin: {
    contents: `
      export * from './website/content/testing-browser';
      export * from './website/content/directory-search';
      export { testingBrandIdentities } from './website/content/testing-brand-identities';
    `,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
});
const browser = await import(
  "data:text/javascript;base64," +
    Buffer.from(bundle.outputFiles[0].text).toString("base64")
);
const runtime = await loadContentRuntime("/", {});
const registry = runtime.createRegistry(runtime.sources, []);
const translated = runtime.localizedRegistry(registry, "zh");
const english = registry.all("testing");
const chinese = translated.all("testing");
const packs = registry.all("testing-pack");
const options = browser.testingBrowserOptions(english);
const search = browser.buildTestingSearchText(english, chinese);
const filters = (query) =>
  browser.normalizeTestingFilters(new URLSearchParams(query), options);
const select = (entries, query) =>
  browser.selectTestingEntries(entries, filters(query), search);
const ids = (entries) => entries.map((entry) => entry.id).sort();

for (const entries of [english, chinese]) {
  const find = (query) => select(entries, new URLSearchParams({ q: query }));
  assert.deepEqual(ids(find("3D动画")), ids(find("3D 动画")));
  assert.equal(find("MiniGrid，BabyAI")[0]?.id, "minigrid");
}
const resourceEntries = registry.all("resource");
const resourceText = runtime.buildResourceSearchText(
  resourceEntries,
  translated.all("resource"),
);
function findResources(query) {
  const search = browser.parseDirectorySearchQuery(query);
  return resourceEntries
    .filter((entry) => runtime.matchesSearch(resourceText[entry.id], search))
    .sort((a, b) => browser.compareDirectoryTitles(search, a.title, b.title));
}
assert.deepEqual(ids(findResources("Game CI")), ids(findResources("GameCI")));
assert.equal(findResources("Game CI")[0]?.id, "game-ci");
assert.equal(findResources("GdUnit 4")[0]?.id, "gdunit4");
assert.ok(
  findResources("虚幻引擎").some((entry) => entry.id === "unreal-engine"),
);
assert.deepEqual(
  ids(findResources("Godot测试")),
  ids(findResources("Godot 测试")),
);
assert.deepEqual(
  ids(findResources("Unity，测试")),
  ids(findResources("Unity 测试")),
);

const logoEntries = Object.entries(browser.testingBrandIdentities);
const indexedIds = new Set(ids(english));
for (const [id, logo] of logoEntries) {
  assert.ok(
    indexedIds.has(id),
    `Testing mark references an unknown entry: ${id}`,
  );
  assert.ok(
    logo.logoSourceUrl?.startsWith("https://"),
    `${id}: use a public logo source`,
  );
  assert.match(logo.asset, /^logos\/[a-z0-9.-]+\.(?:png|svg|webp|jpe?g)$/);
  const bytes = await readFile(resolve(root, "website/public", logo.asset));
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    logo.sha256,
    `${id}: local logo differs from the reviewed asset`,
  );
}
for (const id of ["kenney", "kenney-animated-characters", "poly-haven"]) {
  assert.ok(
    !Object.hasOwn(browser.testingBrandIdentities, id),
    `${id}: this source must remain text-only`,
  );
}
assert.notEqual(
  browser.testingBrandIdentities["godot-rl-agents"]?.organization,
  "Godot Engine",
  "An integration must not inherit its engine publisher's mark",
);

assert.deepEqual(
  filters(
    "kind=not-real&use=not-real&terms=not-real&dimension=not-real&q=%20Godot%20",
  ),
  { query: "Godot", kind: "all", use: "all", terms: "all", dimension: "all" },
);
assert.equal(select(english, "kind=not-real").length, english.length);
assert.equal(select(english, "use=not-real").length, english.length);
assert.equal(select(english, "terms=not-real").length, english.length);
assert.equal(select(english, "dimension=not-real").length, english.length);
for (const group of Object.values(options))
  assert.ok(
    group.every(({ count }) => count > 0),
    "Hide empty testing filter options",
  );
assert.equal(
  options.kinds.reduce((sum, item) => sum + item.count, 0),
  english.length,
);
assert.equal(
  options.terms.reduce((sum, item) => sum + item.count, 0),
  english.length,
);

for (const { id, count } of options.kinds)
  assert.equal(
    select(english, new URLSearchParams({ kind: id }).toString()).length,
    count,
  );
for (const { id, count } of options.uses)
  assert.equal(
    select(english, new URLSearchParams({ use: id }).toString()).length,
    count,
  );
for (const { id, count } of options.terms)
  assert.equal(
    select(english, new URLSearchParams({ terms: id }).toString()).length,
    count,
  );
for (const { id, count } of options.dimensions)
  assert.equal(
    select(english, new URLSearchParams({ dimension: id }).toString()).length,
    count,
  );

const combined = select(
  english,
  "kind=asset&use=pipeline&terms=open&dimension=3d",
);
assert.ok(combined.length > 0, "Exercise an actual multi-facet testing filter");
assert.ok(
  combined.every(
    (entry) =>
      entry.data.kind === "asset" &&
      entry.data.uses.includes("pipeline") &&
      entry.data.terms === "open" &&
      entry.data.dimensions.includes("3d"),
  ),
);
assert.equal(select(english, "kind=fixture&terms=research").length, 0);

for (const entries of [english, chinese])
  for (const id of ["poly-haven", "ambientcg"]) {
    const entry = entries.find((item) => item.id === id);
    assert.ok(entry, `${id}: keep the asset fixture`);
    assert.deepEqual(entry.data.uses, ["pipeline"]);
    assert.ok(select(entries, "use=pipeline").some((item) => item.id === id));
    assert.ok(!select(entries, "use=playing").some((item) => item.id === id));
  }

for (const { label } of Object.values(options).flat())
  for (const query of [label, runtime.translate("zh", label)]) {
    const params = new URLSearchParams({ q: query }).toString();
    assert.deepEqual(
      ids(select(english, params)),
      ids(select(chinese, params)),
      `Testing search must be independent of page language: ${query}`,
    );
  }
for (const entry of english) {
  const facets = [
    options.kinds.find(({ id }) => id === entry.data.kind),
    options.terms.find(({ id }) => id === entry.data.terms),
    ...options.uses.filter(({ id }) => entry.data.uses.includes(id)),
    ...options.dimensions.filter(({ id }) =>
      entry.data.dimensions.includes(id),
    ),
  ];
  for (const facet of facets) {
    assert.ok(facet);
    for (const query of [
      facet.id,
      facet.label,
      runtime.translate("zh", facet.label),
    ])
      assert.ok(
        runtime.matchesSearch(search[entry.id], query),
        `${entry.id}: missing facet ${query}`,
      );
  }
}
for (const entry of english.filter((entry) => entry.data.kind === "asset"))
  for (const query of ["Asset libraries", "资产库"])
    assert.ok(
      runtime.matchesSearch(search[entry.id], query),
      "Asset category names must not be lost as metadata",
    );

const starters = browser.selectTestingStarters(packs, english, filters(""));
assert.deepEqual(
  starters.map(({ entry }) => entry.id).sort(),
  ["asset-through-pipeline", "change-a-game", "give-an-agent-a-goal"],
  "Each of the three starter tasks must lead to usable testing resources",
);
for (const { entry, resources, total } of starters) {
  assert.ok(
    entry.data.check?.trim(),
    `${entry.id}: provide a measurable checkpoint`,
  );
  assert.ok(total > 0);
  assert.equal(
    resources.length,
    total,
    `${entry.id}: every recommendation must exist and support its goal`,
  );
}
assert.deepEqual(browser.selectTestingStarters(packs, [], filters("")), []);

const codingOpenFilters = filters("use=coding&terms=open");
const codingOpen = browser.selectTestingStarters(
  packs,
  browser.selectTestingEntries(english, codingOpenFilters, search),
  codingOpenFilters,
);
assert.equal(codingOpen.length, 1);
assert.equal(codingOpen[0].entry.id, "change-a-game");
assert.ok(codingOpen[0].resources.length > 0);
assert.ok(
  codingOpen[0].resources.every((entry) => entry.data.terms === "open"),
);
assert.ok(
  !codingOpen[0].resources.some((entry) =>
    ["supertux", "wesnoth"].includes(entry.id),
  ),
  "Open-license filtering must remove mixed-license game recommendations",
);
assert.ok(codingOpen[0].resources.length < codingOpen[0].total);

for (const use of options.uses.map(({ id }) => id)) {
  const selected = filters(new URLSearchParams({ use }).toString());
  const entries = browser.selectTestingEntries(english, selected, search);
  const selections = browser.selectTestingStarters(packs, entries, selected);
  assert.equal(
    selections.length,
    1,
    `${use}: expose only the matching task goal`,
  );
  assert.ok(
    selections.every(
      ({ entry, resources }) =>
        entry.data.use === use &&
        resources.every((resource) => resource.data.uses.includes(use)),
    ),
  );
}
assert.deepEqual(
  browser
    .selectTestingStarters(
      translated.all("testing-pack"),
      select(chinese, "use=coding&terms=open"),
      codingOpenFilters,
    )
    .map(({ entry, resources, total }) => ({
      id: entry.id,
      ids: ids(resources),
      total,
    })),
  codingOpen.map(({ entry, resources, total }) => ({
    id: entry.id,
    ids: ids(resources),
    total,
  })),
  "Starter links and license filtering must be language-independent",
);

console.log(
  `Testing-browser regressions passed: ${english.length} entries, ${logoEntries.length} reviewed project marks, normalized filters, bilingual facets, ${starters.length} linked starter tasks, and license-aware recommendations.`,
);
