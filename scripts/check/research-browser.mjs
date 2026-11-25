import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";
import { parse } from "parse5";
import { loadContentRuntime } from "../lib/content.mjs";
import { root } from "../lib/documents.mjs";

const bundle = await build({
  stdin: {
    contents:
      "export * from './website/content/research-browser'; export { researchLedger } from './website/app/lib/collection-stats'; export { researchRecordVisible } from './website/content/research-visibility'; export { collectionPage } from './website/app/lib/collection-query';",
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
const localized = runtime.localizedRegistry(registry, "zh");
const all = registry.all("repository-research");
const visible = (entry) =>
  browser.researchRecordVisible(entry.kind, entry.data);
const english = browser.researchLedger(registry).filter(visible);
const chinese = browser.researchLedger(localized).filter(visible);
const options = browser.researchBrowserOptions(english);
// Exercise the real loader serialization boundary.
const search = JSON.parse(
  JSON.stringify(
    browser.buildResearchSearchText(all, localized.all("repository-research")),
  ),
);
const filters = (query = "") =>
  browser.normalizeResearchFilters(new URLSearchParams(query), options);
const select = (entries, query = "") =>
  browser.selectResearchEntries(entries, filters(query), search);
const ids = (entries) => entries.map(({ id }) => id).sort();
const entry = (id) => {
  const found = all.find((item) => item.id.toLowerCase() === id.toLowerCase());
  assert.ok(found, `Missing research repository ${id}`);
  return found;
};

assert.equal(all.length, 254);
assert.equal(browser.researchLedger(registry).length, 240);
assert.equal(
  english.length,
  224,
  "Keep the established public visibility boundary",
);
assert.equal(all.length - browser.researchLedger(registry).length, 14);
assert.equal(browser.researchLedger(registry).length - english.length, 16);
assert.deepEqual(ids(select(english)), ids(english));
assert.deepEqual(ids(chinese), ids(english));
assert.deepEqual(
  Object.keys(browser.researchRepositoryTopics).sort(),
  all.map((item) => item.data.requested_repo.toLowerCase()).sort(),
  "Every added repository needs an explicit review of its real use",
);
assert.ok(
  english.every((item) => browser.researchTopicFor(item) !== "unclassified"),
);
for (const facet of ["topics", "statuses", "stages", "snapshots", "licenses"]) {
  assert.equal(
    options[facet].reduce((sum, item) => sum + item.count, 0),
    224,
  );
  assert.ok(options[facet].every(({ count }) => count > 0));
}
assert.deepEqual(
  filters(
    "topic=invalid&status=invalid&stage=invalid&snapshot=invalid&license=invalid&sort=invalid&q=%20Godot%20",
  ),
  {
    query: "Godot",
    topic: "all",
    status: "all",
    stage: "all",
    snapshot: "all",
    license: "all",
    sort: "ledger",
  },
);
assert.equal(select(english, "topic=invalid&status=invalid").length, 224);

for (const [repo, topic] of [
  ["Humpalumps/Aether", "tools"],
  ["fgarrec0397/granity", "engines"],
  ["laszlo-gilanyi/OldenEraExplorer", "tools"],
  ["MarshalX/world-of-claudecraft-addons", "tools"],
  ["u2/world-of-claudecraft-mcp", "agents"],
  ["slonce70/world-of-claudecraft-claude-bot", "agents"],
  ["lawrab/the-pile", "tools"],
  ["gcoche-bit/synthcrew-mcp-game", "agents"],
  ["michelpereira/awesome-open-source-games", "references"],
  ["Symbitic/awesome-babylonjs", "references"],
  ["verekia/r3f-gamedev", "references"],
  ["threejs-games/threejs-games.github.io", "references"],
  ["ZyFou/ProceduralTerrains", "tools"],
  ["HowieDuhzit/Hyperfy-Tools", "tools"],
  ["snowfrogdev/nanojet", "engines"],
  ["tcm390/eliza-3d-hyperfy-starter", "agents"],
  ["whitwhoa/open-browser-fps", "tools"],
])
  assert.equal(browser.researchTopicFor(entry(repo)), topic, repo);

// Shooter discovery must follow the repository's use across every source batch.
for (const repo of [
  "Humpalumps/Cadle",
  "reicapivararbx/capyquake",
  "RealAbdurRehman/decay",
  "bbs220/project_block_shooter",
  "mohsenheydari/three-fps",
  "gianlucatruda/music-melee",
  "danyparc/antigravity-evil-eyes",
  "imr4n4lif/bloodwave-fps-game",
  "profullstack/nightcell7",
  "kripken/BananaBread",
  "cfoust/sour",
  "phoboslab/q1k3",
  "Triang3l/WebQuake",
  "turol/webquake2",
  "lrusso/Quake3",
  "MattSurabian/DuckHunt-JS",
]) {
  assert.equal(browser.researchTopicFor(entry(repo)), "shooters", repo);
  assert.ok(
    select(english, "topic=shooters").some(({ id }) => id === entry(repo).id),
    repo,
  );
}
assert.equal(options.topics.find(({ id }) => id === "games").count, 66);
assert.equal(options.topics.find(({ id }) => id === "shooters").count, 53);
assert.equal(select(english, "topic=games").length, 66);
assert.equal(select(english, "topic=shooters").length, 53);

assert.equal(
  browser.researchReadiness(entry("stobieee-bit/FPScape")).id,
  "static",
);
assert.equal(
  browser.researchReadiness(entry("BabylonJS/Babylon.js")).id,
  "documentation",
);
assert.equal(
  browser.researchReadiness(entry("whatgoodarewords/gungame")).id,
  "scaffold",
);
assert.equal(
  browser.researchReadiness(entry("serejaris/dust-arena")).id,
  "unavailable",
);
assert.equal(
  browser.researchReadiness(entry("yoefun/world-of-claudecraft-rs")).id,
  "metadata",
);
assert.equal(browser.researchSnapshot(entry("Humpalumps/Cadle")).id, "pinned");
assert.equal(
  browser.researchSnapshot(entry("genex-games/genex-desktop")).id,
  "unpinned",
);
assert.equal(browser.researchSnapshot(entry("eskafu/zombie-fps")).id, "pinned");

const mit = select(english, "q=MIT");
assert.ok(mit.length > 0 && mit.length < english.length / 1.5);
assert.ok(mit.some(({ id }) => id === "Humpalumps/Cadle"));
assert.ok(!mit.some(({ id }) => id === "BabylonJS/Babylon.js"));
assert.ok(!mit.some(({ id }) => id === "Redblock-Online/redblock-client"));
assert.deepEqual(ids(select(english, "q=MIT+license")), ids(mit));
assert.equal(
  browser.researchLicense(entry("Redblock-Online/redblock-client")).id,
  "nonstandard",
);
assert.equal(browser.researchLicense(entry("kpreid/all-is-cubes")).id, "mixed");
assert.equal(
  browser.researchLicense(entry("ZyFou/ProceduralTerrains")).id,
  "mixed",
);
assert.equal(
  browser.researchLicense(entry("stobieee-bit/FPScape")).id,
  "unknown",
);
assert.equal(browser.researchLicense(entry("hnprivv/Forge_FPS")).id, "unknown");
assert.ok(
  select(english, "q=GPL-2.0").every(({ id }) => id === "mrdoob/three-doom"),
);
assert.ok(
  !select(english, "q=0BSD").some(({ id }) => id === "geckosio/geckos.io"),
);

for (const query of [
  "q=MIT",
  "q=Apache",
  "q=GPL",
  "q=AGPL",
  "q=0BSD",
  "license=unknown",
  "q=qualified",
  "q=附使用条件",
  "q=引擎与框架",
  "q=Game+AI+%26+agents",
  "q=早期脚手架",
  "q=地形",
  "q=WebGPU",
  "topic=references",
  "stage=static",
  "snapshot=unpinned",
  "topic=engines&license=mit",
  "status=qualified&snapshot=pinned&sort=title",
])
  assert.deepEqual(
    ids(select(chinese, query)),
    ids(select(english, query)),
    query,
  );
assert.deepEqual(
  ids(select(english, "q=引擎与框架")),
  ids(select(english, "topic=engines")),
);
assert.deepEqual(
  ids(select(english, "q=附使用条件")),
  ids(select(english, "status=qualified")),
);
assert.deepEqual(
  ids(select(english, "q=早期脚手架")),
  ids(select(english, "stage=scaffold")),
);
for (const query of [
  "q=ea0da62549980816a6a27e08b75808b1f56d70e7",
  "q=https%3A%2F%2Fapi.github.com",
  "q=checked_at",
  "q=readme_blob_sha",
  "q=Source+URLs",
  "q=2026-10-18",
])
  assert.equal(select(english, query).length, 0, query);

// License statements translated into natural language must never change facets.
for (const item of chinese) {
  const canonical = entry(item.id);
  assert.deepEqual(
    browser.researchLicense(item, search),
    browser.researchLicense(canonical),
  );
}
const base = entry("BabylonJS/Babylon.js");
const synthetic = (id, note) => ({
  ...base,
  id,
  data: {
    ...base.data,
    requested_repo: id,
    canonical_repo: id,
    license_note: note,
    limitations: ["MIT appears in limitations, not as a code grant"],
  },
});
const fixtures = [
  synthetic(
    "fixture/negative-gpl",
    "Not GPL-3.0; Apache-2.0 applies to the project code.",
  ),
  synthetic(
    "fixture/negative",
    "Not MIT; Apache-2.0 applies to the project code.",
  ),
  synthetic(
    "fixture/unknown",
    "No reuse license established. README claims MIT but LICENSE contradicts that claim.",
  ),
  synthetic(
    "fixture/positive",
    "License evidence: MIT. Dependencies use separate terms.",
  ),
];
const fixtureSearch = browser.buildResearchSearchText(fixtures, []);
assert.deepEqual(
  browser
    .selectResearchEntries(fixtures, filters("q=MIT"), fixtureSearch)
    .map(({ id }) => id),
  ["fixture/positive"],
);
assert.equal(
  browser.selectResearchEntries(fixtures, filters("q=GPL-3.0"), fixtureSearch)
    .length,
  0,
);

const ledger = select(english);
assert.deepEqual(
  ledger.map(({ id }) => id),
  english.map(({ id }) => id),
);
const titled = select(english, "sort=title");
assert.deepEqual(
  titled.map(({ id }) => id),
  select(chinese, "sort=title").map(({ id }) => id),
);
assert.deepEqual(
  select(english, "sort=checked").map(({ id }) => id),
  select(chinese, "sort=checked").map(({ id }) => id),
);
const fixtureDates = [
  {
    ...base,
    id: "later",
    data: { ...base.data, requested_repo: "z/later", checked_at: "2026-11-24" },
  },
  {
    ...base,
    id: "earlier",
    data: {
      ...base.data,
      requested_repo: "a/earlier",
      checked_at: "2026-10-18",
    },
  },
];
assert.deepEqual(
  browser
    .selectResearchEntries(fixtureDates, filters("sort=checked"))
    .map(({ id }) => id),
  ["later", "earlier"],
);
assert.deepEqual(
  browser
    .selectResearchEntries(fixtureDates, filters("sort=title"))
    .map(({ id }) => id),
  ["earlier", "later"],
);
const paged = [];
for (let number = 1; number <= Math.ceil(ledger.length / 24); number++) {
  const page = browser.collectionPage(String(number), ledger.length);
  paged.push(...ledger.slice(page.start - 1, page.end));
}
assert.deepEqual(ids(paged), ids(english));
assert.equal(new Set(paged.map(({ id }) => id)).size, 224);
assert.equal(browser.collectionPage("999999", 224).page, 10);
assert.equal(browser.collectionPage("-4", 224).page, 1);
assert.equal(
  select(english, "q=no-such-research-record&topic=engines").length,
  0,
);

if (process.argv.includes("--built")) {
  const manifest = JSON.parse(
    await readFile(resolve(root, "dist/site-manifest.json"), "utf8"),
  );
  assert.match(
    manifest.base,
    /^\/(?:.*\/)?$/,
    "Manifest base must be normalized",
  );
  const attrs = (node) =>
    Object.fromEntries(
      (node.attrs || []).map(({ name, value }) => [name, value]),
    );
  const hasClass = (node, name) =>
    (attrs(node).class || "").split(/\s+/).includes(name);
  const elements = (node) => [
    ...(node.tagName ? [node] : []),
    ...(node.childNodes || []).flatMap(elements),
  ];
  const text = (node) =>
    node.nodeName === "#text"
      ? node.value
      : (node.childNodes || []).map(text).join("");
  const normalizedText = (node) => text(node).replace(/\s+/g, " ").trim();
  const expected = new Map(english.map((item) => [item.key, item]));

  for (const locale of ["en", "zh"]) {
    const page = locale === "en" ? "research/" : "zh/research/";
    const nodes = elements(
      parse(await readFile(resolve(root, "dist", page, "index.html"), "utf8")),
    );
    const t = (label) => runtime.translate(locale, label);
    const references = nodes.filter((node) =>
      attrs(node)["data-content-ref"]?.startsWith("repository-research:"),
    );
    const keys = references.map((node) => attrs(node)["data-content-ref"]);
    assert.equal(
      keys.length,
      224,
      `${page}: all public cards must be in static HTML`,
    );
    assert.equal(new Set(keys).size, 224, `${page}: duplicate research cards`);
    assert.deepEqual(
      [...keys].sort(),
      [...expected.keys()].sort(),
      `${page}: public record inventory changed`,
    );

    for (const card of references) {
      const key = attrs(card)["data-content-ref"];
      assert.ok(
        card.tagName === "article" && hasClass(card, "research-card"),
        `${page}: ${key} must own a research card`,
      );
      const top = elements(card).find((node) =>
        hasClass(node, "research-card-top"),
      );
      assert.ok(top, `${page}: ${key} is missing its topic row`);
      const spans = top.childNodes.filter((node) => node.tagName === "span");
      assert.ok(spans[1], `${page}: ${key} is missing its topic label`);
      const topic = browser.researchTopics.find(
        ({ id }) => id === browser.researchTopicFor(expected.get(key)),
      );
      assert.ok(topic, `${page}: ${key} has no canonical topic`);
      assert.equal(
        normalizedText(spans[1]),
        t(topic.label),
        `${page}: ${key} has a stale or untranslated topic`,
      );
    }

    const navs = nodes.filter(
      (node) => node.tagName === "nav" && hasClass(node, "ix-topics"),
    );
    assert.equal(
      navs.length,
      1,
      `${page}: expected one research topic navigation`,
    );
    assert.equal(attrs(navs[0])["aria-label"], t("Research topics"));
    const buttons = navs[0].childNodes.filter(
      (node) => node.tagName === "button",
    );
    for (const id of ["games", "shooters"]) {
      const option = options.topics.find((item) => item.id === id);
      const matches = buttons.filter((button) => {
        const label = button.childNodes.find((node) => node.tagName === "span");
        return label && normalizedText(label) === t(option.label);
      });
      assert.equal(
        matches.length,
        1,
        `${page}: missing or duplicated ${id} topic`,
      );
      const spans = matches[0].childNodes.filter(
        (node) => node.tagName === "span",
      );
      assert.equal(
        normalizedText(spans.at(-1)),
        String(option.count),
        `${page}: stale ${id} topic count`,
      );
    }

    const downloads = nodes.filter(
      (node) =>
        node.tagName === "a" &&
        Object.hasOwn(attrs(node), "download") &&
        normalizedText(node) === t("Download full audit (JSON)"),
    );
    assert.equal(
      downloads.length,
      1,
      `${page}: missing full-audit JSON download`,
    );
    assert.equal(
      attrs(downloads[0]).href,
      `${manifest.base}repository-research.json`,
      `${page}: JSON download must use the built base`,
    );
  }
  console.log(
    "Built research checks passed: 224 unique public cards in each language, canonical topic labels, Games 66 / Shooters 53, and base-aware JSON downloads.",
  );
}

console.log(
  `Research browser checks passed: ${all.length} reviewed records, ${english.length} public, ${mit.length} MIT search matches; bilingual facets, licenses, provenance exclusions, sorting and pagination.`,
);
