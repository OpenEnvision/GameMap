import assert from "node:assert/strict";
import { build } from "esbuild";
import { loadContentRuntime } from "../lib/content.mjs";
import { root } from "../lib/documents.mjs";

const bundle = await build({
  stdin: {
    contents:
      "export * from './website/content/paper-browser'; export { collectionPage } from './website/app/lib/collection-query'; export { paperConferencePublication } from './website/app/lib/paper-publication';",
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
const english = registry.all("paper");
const chinese = runtime.localizedRegistry(registry, "zh").all("paper");
const options = browser.paperBrowserOptions(english);
const search = browser.buildPaperSearchText(english, chinese);
const filters = (params) =>
  browser.normalizePaperFilters(new URLSearchParams(params), options);
const select = (entries, params) =>
  browser.selectPaperEntries(entries, filters(params), search);
const ids = (entries) => entries.map((entry) => entry.id).sort();
const academicTypes = new Set([
  "conference-paper",
  "journal-paper",
  "preprint",
  "survey",
  "technical-report",
]);

const vid2World = english.find(
  (entry) => entry.id === "paper-arxiv-2505-14357",
);
assert.ok(vid2World, "The verified Vid2World paper must be indexed");
assert.equal(vid2World.data.year, 2025);
assert.deepEqual(browser.paperConferencePublication(vid2World.data), {
  label: "ICLR 2026",
  year: 2026,
  abbreviated: true,
});

assert.ok(
  english.some((entry) => entry.id === "paper-arxiv-2609-16679"),
  "Removing the featured survey must preserve its record",
);
assert.deepEqual(
  ids(select(english, "")),
  ids(english.filter((entry) => academicTypes.has(entry.data.referenceType))),
);
assert.deepEqual(
  ids(select(english, "scope=references")),
  ids(english.filter((entry) => !academicTypes.has(entry.data.referenceType))),
);
assert.equal(select(english, "scope=all").length, english.length);
assert.equal(
  options.scopes.find(({ id }) => id === "all").count,
  english.length,
);
assert.equal(
  options.scopes
    .filter(({ id }) => id !== "all")
    .reduce((sum, item) => sum + item.count, 0),
  english.length,
);
for (const group of Object.values(options))
  assert.ok(group.every(({ count }) => count > 0));

assert.deepEqual(
  filters(
    "area=invalid&type=invalid&scope=invalid&year=invalid&status=invalid&review=invalid&demo=invalid&project=true&sort=invalid&q=%20Godot%20",
  ),
  {
    query: "Godot",
    area: "all",
    type: "all",
    scope: "research",
    year: "all",
    status: "all",
    review: "all",
    demo: "all",
    project: false,
    sort: "recent",
  },
);
assert.equal(filters("type=book").scope, "all");
assert.equal(filters("referenceType=blog").scope, "all");
assert.deepEqual(
  ids(select(english, "referenceType=book")),
  ids(select(english, "type=book")),
);
assert.equal(filters("type=book&referenceType=preprint").type, "book");
assert.equal(filters("type=book&scope=research").scope, "research");
assert.equal(filters("type=book&scope=research").type, "all");
assert.equal(filters("type=survey&scope=references").type, "all");
assert.deepEqual(
  ids(select(english, "type=book&scope=research")),
  ids(select(english, "scope=research")),
);
const surveys = select(english, "type=survey");
assert.equal(
  surveys.length,
  4,
  "The Survey reference type is distinct from citing a survey",
);
assert.ok(surveys.every((entry) => entry.data.referenceType === "survey"));
assert.ok(surveys.some((entry) => entry.id === "paper-arxiv-2609-16679"));
for (const { id, count } of options.reviews) {
  const reviewed = select(
    english,
    new URLSearchParams({ scope: "all", review: id }).toString(),
  );
  assert.equal(reviewed.length, count);
  assert.ok(reviewed.every((entry) => entry.data.access.reviewStatus === id));
}

const newest = select(english, "scope=all&sort=recent");
const oldest = select(english, "scope=all&sort=oldest");
assert.ok(
  newest.every(
    (entry, index) =>
      index === 0 || newest[index - 1].data.year >= entry.data.year,
  ),
  "Newest first must prioritize the recorded first-publication year",
);
assert.ok(
  oldest.every(
    (entry, index) =>
      index === 0 || oldest[index - 1].data.year <= entry.data.year,
  ),
);
assert.equal(browser.collectionPage("-1", newest.length).page, 1);
assert.equal(
  browser.collectionPage("9999999", newest.length).page,
  Math.ceil(newest.length / 24),
);
assert.deepEqual(browser.collectionPage("2", 0), {
  page: 1,
  pages: 1,
  start: 0,
  end: 0,
});

const example = english[0];
const synthetic = {
  ...example,
  title: "Isolated engine compilation sentinel",
  description:
    "Conference paper cited as reference [99] in AI for Games in the Foundation Model Era. ICML, 2026.",
  data: {
    ...example.data,
    title: "Isolated engine compilation sentinel",
    authors: "Example Author",
    description:
      "Conference paper cited as reference [99] in AI for Games in the Foundation Model Era. ICML, 2026.",
    publication: "ICML, 2026",
    topics: ["Engine compilation"],
    primaryRole: "build",
    roles: ["build"],
    referenceType: "conference-paper",
    classification: "UnicornProvenanceTerm survey source index",
    origins: [
      {
        label: "Survey reference [99]",
        url: "https://example.org/UnicornProvenanceTerm",
      },
    ],
  },
};
assert.ok(
  !runtime.matchesSearch(browser.paperSearchFields(synthetic), "survey"),
);
assert.ok(
  !runtime.matchesSearch(
    browser.paperSearchFields(synthetic),
    "UnicornProvenanceTerm",
  ),
);
assert.equal(
  browser.paperDiscoveryDescription(synthetic.description),
  "ICML, 2026.",
);
const realAbstract =
  "A real abstract about a survey and world models, rather than bibliographic import boilerplate.";
assert.equal(browser.paperDiscoveryDescription(realAbstract), realAbstract);
assert.ok(
  runtime.matchesSearch(
    browser.paperSearchFields({ ...synthetic, description: realAbstract }),
    "survey",
  ),
);

for (const { label } of [
  ...options.areas,
  ...options.types,
  ...options.statuses,
  ...options.reviews,
  ...options.scopes,
]) {
  for (const query of [label, runtime.translate("zh", label)]) {
    const params = new URLSearchParams({ scope: "all", q: query }).toString();
    assert.deepEqual(
      ids(select(english, params)),
      ids(select(chinese, params)),
      `Paper search must be independent of page language: ${query}`,
    );
  }
}
for (const entry of english) {
  const labels = [
    browser.paperTypeLabels[entry.data.referenceType],
    browser.paperStatusLabels[entry.data.access.codeStatus],
    browser.paperReviewLabels[entry.data.access.reviewStatus],
    ...entry.data.roles.map((role) => browser.paperAreaLabels[role]),
  ];
  for (const label of labels)
    for (const query of [label, runtime.translate("zh", label)])
      assert.ok(
        runtime.matchesSearch(search[entry.id], query),
        `${entry.id}: missing searchable facet ${query}`,
      );
}
for (const sort of ["recent", "oldest", "practical", "title"]) {
  const params = `scope=all&sort=${sort}`;
  assert.deepEqual(
    select(english, params).map((entry) => entry.id),
    select(chinese, params).map((entry) => entry.id),
    `Paper sort must be language-independent: ${sort}`,
  );
}
const titleFixtures = [
  {
    ...example,
    id: "alpha",
    key: "paper:alpha",
    title: "Alpha",
    data: { ...example.data, title: "Alpha" },
  },
  {
    ...example,
    id: "zulu",
    key: "paper:zulu",
    title: "Zulu",
    data: { ...example.data, title: "Zulu" },
  },
];
const translatedFixtures = [
  { ...titleFixtures[0], originalTitle: "Alpha", title: "乙" },
  { ...titleFixtures[1], originalTitle: "Zulu", title: "甲" },
];
assert.deepEqual(
  browser
    .selectPaperEntries(titleFixtures, filters("scope=all&sort=title"))
    .map((entry) => entry.id),
  browser
    .selectPaperEntries(translatedFixtures, filters("scope=all&sort=title"))
    .map((entry) => entry.id),
);

console.log(
  `Paper-browser regressions passed: ${english.length} preserved records, research/reference scopes, exact reference types, bilingual discovery search, publication-year ordering, and pagination bounds.`,
);
