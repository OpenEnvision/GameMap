import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";

const module = await build({
  entryPoints: ["website/app/lib/collection-query.ts"],
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
});
const query = await import(
  "data:text/javascript;base64," +
    Buffer.from(module.outputFiles[0].text).toString("base64")
);
const paper = (id, year, overrides = {}) => ({
  key: `paper:${id}`,
  kind: "paper",
  id,
  title: id,
  description: `Evidence about ${id}`,
  blocks: [],
  data: {
    year,
    roles: ["build"],
    access: {
      codeStatus: "not-found",
      repositories: [],
      projects: [],
      demos: [],
    },
    ...overrides,
  },
});
const game = (id, overrides = {}) => ({
  key: `threejs-game:${id}`,
  kind: "threejs-game",
  id,
  title: id,
  description: id,
  blocks: [],
  data: {
    genres: ["puzzle"],
    maturity: { status: "prototype" },
    license: { spdx: null },
    demo: { url: null },
    verification: { date: "2026-10-20" },
    ...overrides,
  },
});
const papers = [
  paper("Alpha", 2024),
  paper("Beta", 2026, {
    roles: ["play", "test"],
    access: {
      codeStatus: "open-source",
      repositories: [{ url: "https://example.test/repo" }],
      projects: [{ url: "https://example.test/project" }],
      demos: [
        {
          kind: "interactive",
          access: "public",
          url: "https://example.test/demo",
        },
      ],
    },
  }),
  paper("Gamma", 2026),
];

test("query-only collection changes reuse immutable data but locale and explicit refresh can revalidate", () => {
  const currentUrl = new URL("https://example.test/papers/?page=2");
  assert.equal(
    query.shouldRevalidateCollection({
      currentUrl,
      nextUrl: new URL("https://example.test/papers/?q=world"),
      defaultShouldRevalidate: true,
    }),
    false,
  );
  assert.equal(
    query.shouldRevalidateCollection({
      currentUrl,
      nextUrl: new URL("https://example.test/zh/papers/?page=2"),
      defaultShouldRevalidate: true,
    }),
    true,
  );
  assert.equal(
    query.shouldRevalidateCollection({
      currentUrl,
      nextUrl: currentUrl,
      defaultShouldRevalidate: true,
    }),
    true,
  );
});

test("collection filters reject stale enum values without hiding all records", () => {
  const filters = query.collectionFilters(
    new URLSearchParams(
      "status=stale&area=stale&year=Infinity&sort=stale&demo=stale&license=stale",
    ),
    papers,
    "paper",
  );
  assert.equal(filters.status, "all");
  assert.equal(filters.area, "all");
  assert.equal(filters.year, "all");
  assert.equal(filters.sort, "recent");
  assert.deepEqual(
    query.selectCollection(papers, filters).map((entry) => entry.id),
    ["Beta", "Gamma", "Alpha"],
  );
  assert.deepEqual(
    papers.map((entry) => entry.id),
    ["Alpha", "Beta", "Gamma"],
    "Sorting must not mutate source order",
  );
});
test("paper filters compose real multi-role, year, code, demo and project fields", () => {
  const filters = query.collectionFilters(
    new URLSearchParams(
      "area=test&year=2026&status=open-source&demo=interactive&project=1",
    ),
    papers,
    "paper",
  );
  assert.deepEqual(
    query.selectCollection(papers, filters).map((entry) => entry.id),
    ["Beta"],
  );
  assert.equal(
    query.selectCollection(papers, { ...filters, year: "2024" }).length,
    0,
  );
  assert.deepEqual(
    query
      .selectCollection(
        papers,
        query.collectionFilters(
          new URLSearchParams("sort=practical"),
          papers,
          "paper",
        ),
      )
      .map((entry) => entry.id),
    ["Beta", "Gamma", "Alpha"],
  );
  assert.deepEqual(
    query
      .selectCollection(
        papers,
        query.collectionFilters(
          new URLSearchParams("q=gamma&sort=title"),
          papers,
          "paper",
        ),
      )
      .map((entry) => entry.id),
    ["Gamma"],
  );
});
test("game filters do not equate an existing demo URL with playtesting or a working demo", () => {
  const games = [
    game("A"),
    game("B", {
      genres: ["action", "puzzle"],
      license: { spdx: "MIT" },
      maturity: { status: "game" },
      demo: { url: "https://example.test", status: "reader-error" },
    }),
  ];
  const filters = query.collectionFilters(
    new URLSearchParams("genre=puzzle&status=game&license=MIT&demo=listed"),
    games,
    "threejs-game",
  );
  assert.deepEqual(
    query.selectCollection(games, filters).map((entry) => entry.id),
    ["B"],
  );
  const missing = query.collectionFilters(
    new URLSearchParams("license=unspecified&demo=not-listed"),
    games,
    "threejs-game",
  );
  assert.deepEqual(
    query.selectCollection(games, missing).map((entry) => entry.id),
    ["A"],
  );
  assert.equal(games[1].data.demo.status, "reader-error");
});
test("48-record pages preserve combined game batches without gaps or repeats", () => {
  const games = [
    ...Array.from({ length: 20 }, (_, i) => `research:${i}`),
    ...Array.from({ length: 31 }, (_, i) => `imported:${i}`),
    ...Array.from({ length: 7 }, (_, i) => `submission:${i}`),
    ...Array.from({ length: 65 }, (_, i) => `example:${i}`),
  ];
  const pages = ["1", "2", "3"].map((value) => {
    const range = query.collectionPage(value, games.length, 48);
    return games.slice(range.start - 1, range.end);
  });
  assert.deepEqual(
    pages.map((page) => page.length),
    [48, 48, 27],
  );
  assert.deepEqual(pages.flat(), games);
  assert.deepEqual(query.collectionPage("999", 97, 48), {
    page: 3,
    pages: 3,
    start: 97,
    end: 97,
  });
  assert.equal(query.collectionPage("2", 48, 48).page, 1);
  assert.equal(query.collectionPage("2", 0, 48).start, 0);
  assert.equal(query.collectionPage("2", 49).start, 25);
});
test("game filters reset page state while page turns retain filters and unrelated query values", () => {
  const original = new URLSearchParams("track=3d&page=4&campaign=keep");
  const next = query.updateCollectionQuery(original, { page: "5" });
  assert.equal(next.toString(), "track=3d&page=5&campaign=keep");
  const first = query.updateCollectionQuery(next, { page: "1" });
  assert.equal(first.toString(), "track=3d&campaign=keep");
  const search = query.updateCollectionQuery(next, { q: "all" });
  assert.equal(search.get("q"), "all");
  assert.equal(search.has("page"), false);
  assert.equal(search.get("track"), "3d");
  assert.equal(search.get("campaign"), "keep");
  assert.equal(original.get("page"), "4");
});
test("pagination clamps malformed or out-of-range state and resets only owned query parameters", () => {
  for (const value of [
    null,
    "-1",
    "NaN",
    "Infinity",
    "1.5",
    "100000000000000000000",
    "0",
  ])
    assert.equal(query.collectionPage(value, 483).page, 1);
  assert.deepEqual(query.collectionPage("99", 483), {
    page: 21,
    pages: 21,
    start: 481,
    end: 483,
  });
  assert.deepEqual(query.collectionPage("2", 0), {
    page: 1,
    pages: 1,
    start: 0,
    end: 0,
  });
  const original = new URLSearchParams("page=7&year=2026&q=old&campaign=keep");
  const filtered = query.updateCollectionQuery(original, { q: "new" });
  assert.equal(filtered.has("page"), false);
  assert.equal(filtered.get("campaign"), "keep");
  assert.equal(original.get("page"), "7");
  const page = query.updateCollectionQuery(filtered, { page: "2" });
  assert.equal(page.get("page"), "2");
  assert.equal(page.get("q"), "new");
  assert.equal(query.clearCollectionQuery(page).toString(), "campaign=keep");
});
