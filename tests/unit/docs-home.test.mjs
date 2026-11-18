import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
const importTypeScript = async (entry) => {
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    platform: "node",
    format: "esm",
    target: "node22",
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
  );
};
const { documentationPortal, searchDocumentation, canonicalDocumentSlug } =
  await importTypeScript("website/app/lib/docs-home.ts");
const { documentationHomeCopy } = await importTypeScript(
  "website/app/lib/docs-home-copy.ts",
);
const page = (
  slug,
  label,
  group = "Start building",
  description = "Guides for building a game",
) => ({
  slug,
  label,
  title: label,
  group,
  description,
  source: `docs/${slug}.md`,
  sourceMode: "git",
});
const originals = [
  page("practical-guide", "Practical guide"),
  page(
    "engines-notes",
    "Game engines",
    "Explore the ecosystem",
    "Tools and engines",
  ),
  page(
    "generative-tools-research",
    "Generative tools",
    "Assets & generative tools",
  ),
  page("game-testing-library", "Testing library", "Evidence & evaluation"),
  page("remote/archive/docs/example", "Original source", "Source originals"),
  page("remote/notes", "Reconstructed source", "Rendered pages"),
  page("remote/zh/reading-guide", "Chinese source snapshot", "Rendered pages"),
];

test("the homepage separates source material without losing or mutating a document", () => {
  const before = structuredClone(originals);
  const model = documentationPortal(originals, originals);
  assert.equal(model.pages.length, originals.length);
  assert.equal(model.coreCount, 4);
  assert.equal(model.originals.length, 1);
  assert.equal(model.reconstructions.length, 2);
  const listed = [
    ...model.groups.flatMap((group) => group.pages),
    ...model.originals,
    ...model.reconstructions,
  ];
  assert.deepEqual(
    listed.map((item) => item.document.slug).sort(),
    originals.map((item) => item.slug).sort(),
  );
  assert.deepEqual(originals, before);
  assert.ok(
    model.groups.every((group) =>
      group.pages.every((item) => item.archive === null),
    ),
  );
});

test("translated documents inherit canonical topics without creating English pages", () => {
  const translated = page(
    "zh/practical-guide",
    "从想法到可玩的游戏",
    "中文指南",
  );
  const reading = page("zh/reading-guide", "阅读指南", "中文指南");
  const manifest = [...originals, translated, reading];
  const visible = [
    ...originals.filter((p) => p.slug !== "practical-guide"),
    translated,
    reading,
  ];
  const model = documentationPortal(manifest, visible);
  assert.equal(model.starter.document.slug, "zh/practical-guide");
  assert.equal(model.groups[0].title, "Start building");
  assert.ok(
    model.groups[0].pages.some((p) => p.document.slug === "zh/reading-guide"),
  );
  assert.ok(!model.groups.some((group) => group.title === "中文指南"));
  assert.equal(
    model.pages.filter(
      (p) => canonicalDocumentSlug(p.document.slug) === "practical-guide",
    ).length,
    1,
  );
  assert.ok(!model.pages.some((p) => p.document.slug === "reading-guide"));
});

test("task links and the recommended start always resolve to existing visible documents", () => {
  const model = documentationPortal(originals, originals);
  assert.deepEqual(
    model.tasks.map((task) => task.id),
    ["tools", "prototype", "assets", "testing"],
  );
  const valid = new Set(originals.map((p) => p.slug));
  assert.ok(model.tasks.every((task) => valid.has(task.page.document.slug)));
  const fallback = [
    page("agents-notes", "Coding agents", "Explore the ecosystem"),
  ];
  const partial = documentationPortal(fallback, fallback);
  assert.equal(partial.tasks.length, 1);
  assert.equal(partial.tasks[0].page.document.slug, "agents-notes");
  assert.equal(partial.starter, undefined);
  assert.equal(documentationPortal([], []).tasks.length, 0);
});

test("local search handles translated labels, canonical English titles, accents and multiple words", () => {
  const translated = page(
    "zh/engines-notes",
    "引擎选择",
    "中文指南",
    "工具选择",
  );
  const selected = [translated, page("cafe", "Café guide")];
  const model = documentationPortal([...originals, ...selected], selected);
  assert.equal(
    searchDocumentation(model.pages, "GAME ENGINES")[0].document.slug,
    translated.slug,
  );
  assert.equal(
    searchDocumentation(model.pages, "引擎")[0].document.slug,
    translated.slug,
  );
  assert.equal(
    searchDocumentation(model.pages, "cafe")[0].document.slug,
    "cafe",
  );
  assert.equal(
    searchDocumentation(model.pages, "tools engines")[0].document.slug,
    translated.slug,
  );
  assert.equal(
    searchDocumentation(model.pages, "zzzz-not-a-real-document").length,
    0,
  );
  assert.equal(searchDocumentation(model.pages, "   ").length, selected.length);
});

test("search uses existing interface translations without pretending to search document bodies", () => {
  const model = documentationPortal(originals, originals);
  const translate = (value) => (value === "Game engines" ? "游戏引擎" : value);
  assert.equal(
    searchDocumentation(model.pages, "游戏引擎", translate)[0].document.slug,
    "engines-notes",
  );
  assert.equal(
    searchDocumentation(model.pages, "text-only-present-in-a-body").length,
    0,
  );
  assert.equal(
    searchDocumentation(model.pages, "<script>alert(1)</script>").length,
    0,
  );
});

test("homepage copy is complete in both languages and counts are not invented", () => {
  const en = documentationHomeCopy("en"),
    zh = documentationHomeCopy("zh");
  assert.deepEqual(Object.keys(en).sort(), Object.keys(zh).sort());
  assert.deepEqual(Object.keys(en.tasks).sort(), Object.keys(zh.tasks).sort());
  assert.deepEqual(
    Object.keys(en.topics).sort(),
    Object.keys(zh.topics).sort(),
  );
  for (const copy of [en, zh])
    for (const value of Object.values(copy))
      if (typeof value === "string") assert.ok(value.trim());
  assert.equal(en.documentCount(1), "1 document");
  assert.equal(en.documentCount(163), "163 documents");
  assert.equal(zh.resultCount(0), "0 个结果");
});
