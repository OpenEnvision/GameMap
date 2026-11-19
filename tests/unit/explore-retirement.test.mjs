import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  assertRenderedCoverage,
  assertSearchCoverage,
} from "../../scripts/lib/rendered-coverage.mjs";

const entry = (kind, id, collectionUrl, data = {}) => ({
  key: `${kind}:${id}`,
  kind,
  id,
  title: `Fixture ${kind}`,
  description: `Source evidence for ${kind}`,
  url: `${collectionUrl}${id}/`,
  collectionUrl,
  blocks: [
    { field: "title", type: "title", value: `Fixture ${kind}` },
    {
      field: "description",
      type: "lead",
      value: `Source evidence for ${kind}`,
    },
  ],
  data: { id, ...data },
});
const paper = entry("paper", "research-fixture", "/papers/");
const resource = entry("resource", "tool-fixture", "/resources/");
const example = entry("example", "game-fixture", "/examples/", {
  track: "2d",
  engine: "Godot 4",
  resourceIds: [],
  source: { url: "https://github.com/fixture/game" },
  demo: { kind: "playable", url: "https://example.test/game" },
});
const threejs = entry("threejs-game", "threejs-fixture", "/examples/", {
  name: "Three.js fixture",
  repository_url: "https://github.com/fixture/threejs-game",
  demo: { url: null },
});
const agent = entry("agent", "agent-fixture", "/agents/");
const research = entry("repository-research", "repo-fixture", "/research/");
const documents = ["guides/practical-guide", "zh/guides/practical-guide"].map(
  (id) => entry("document", id, "/docs/"),
);
const fixtures = [
  paper,
  resource,
  example,
  threejs,
  agent,
  research,
  ...documents,
];
async function loadRoutes(base = "/") {
  const bundle = await build({
    stdin: {
      contents: `export {pages,navigation,detailRoutes} from './website/content/site';
      export {loader as papersLoader} from './website/app/routes/papers';
      export {loader as agentsLoader} from './website/app/routes/agents';
      export {loader as examplesLoader} from './website/app/routes/examples';
      export {loader as researchLoader} from './website/app/routes/research';
      export {loader as contentLoader} from './website/app/routes/content';
      export {loader as docsRedirect} from './website/app/routes/docs-index';
      export {loader as threejsRedirect} from './website/app/routes/threejs-games';
      export {pillars} from './website/app/lib/pillars';`,
      resolveDir: process.cwd(),
      loader: "ts",
    },
    bundle: true,
    write: false,
    platform: "node",
    format: "esm",
    packages: "external",
    define: { "import.meta.env.BASE_URL": JSON.stringify(base) },
    plugins: [
      {
        name: "fixture-content-registry",
        setup(builder) {
          builder.onResolve({ filter: /registry\.server$/ }, () => ({
            path: "fixture-content-registry",
            namespace: "fixture",
          }));
          builder.onLoad({ filter: /.*/, namespace: "fixture" }, () => ({
            contents: `const entries=${JSON.stringify(fixtures)};
          export const sources={gameCaseAgents:{'game-fixture':['deepseek-model']},learningMedia:{},researchGameMedia:{}};
          export function contentFor(){return{entries,all:kind=>entries.filter(entry=>entry.kind===kind),get:(kind,id)=>entries.find(entry=>entry.kind===kind&&entry.id===id)}};`,
            loader: "js",
          }));
        },
      },
    ],
  });
  await mkdir(resolve(".build"), { recursive: true });
  const directory = await mkdtemp(resolve(".build/explore-retirement-test-"));
  try {
    const file = join(directory, "loaders.mjs");
    await writeFile(file, bundle.outputFiles[0].text);
    return await import(pathToFileURL(file).href);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
const loaders = await loadRoutes();
const requestFor = (path, params = {}) => ({
  request: new Request(`https://example.test/${path}`),
  params,
});

test("retired Explore and development paths have no registered pages or navigation", () => {
  assert.equal(Object.hasOwn(loaders.pages, "explore"), false);
  assert.equal(Object.hasOwn(loaders.pages, "paths"), false);
  for (const page of [...Object.values(loaders.pages), ...loaders.navigation])
    assert.ok(
      !["/explore/", "/zh/explore/", "/paths/", "/zh/paths/"].includes(
        page.path,
      ),
    );
  for (const route of loaders.detailRoutes)
    assert.ok(!route.kinds.some((kind) => kind === "path" || kind === "step"));
  assert.deepEqual(loaders.papersLoader(requestFor("papers/")).entries, [
    paper,
  ]);
});
test("guide entrances keep the selected language and deployment base", async () => {
  for (const base of ["/", "/GameMap/"]) {
    const routes = base === "/" ? loaders : await loadRoutes(base);
    for (const [path, target] of [
      ["docs/", "docs/guides/practical-guide/"],
      ["docs/zh/", "docs/zh/guides/practical-guide/"],
      ["zh/docs/", "docs/zh/guides/practical-guide/"],
    ]) {
      assert.deepEqual(routes.docsRedirect(requestFor(base.slice(1) + path)), {
        target: base + target,
      });
    }
  }
});
test("agent pages ship only toolkit entries; games and creator attribution stay in Examples", () => {
  const tools = loaders.agentsLoader(requestFor("agents/"));
  assert.deepEqual(Object.keys(tools), ["tools"]);
  assert.deepEqual(tools.tools, [agent]);
  const games = loaders.examplesLoader(requestFor("examples/"));
  // The listing deliberately ships a compact projection; full evidence blocks
  // remain on detail pages rather than being duplicated into every grid load.
  assert.equal(games.examples.length, 1);
  const game = games.examples[0];
  assert.deepEqual(
    Object.keys(game).sort(),
    ["key", "id", "data", "descriptionLanguage", "searchText"].sort(),
  );
  assert.equal(game.key, example.key);
  assert.equal(game.id, example.id);
  assert.deepEqual(game.data, example.data);
  assert.ok(game.searchText.join("").includes(example.title));
  assert.ok(game.searchText.join("").includes(example.description));
  assert.equal(Object.hasOwn(game, "blocks"), false);
  assert.deepEqual(games.attribution, { "game-fixture": ["deepseek-model"] });
});
test("every Three.js game joins Examples without a separate navigation entry", () => {
  const games = loaders.examplesLoader(requestFor("examples/"));
  assert.deepEqual(
    games.importedThreejs.map((entry) => entry.key),
    [threejs.key],
  );
  assert.equal(games.importedThreejs[0].url, threejs.url);
  assert.ok(!loaders.navigation.some((page) => page.id === "threejsGames"));
  assert.ok(
    !loaders.pillars.some((pillar) =>
      pillar.links.some((link) => link.path === "/threejs-games/"),
    ),
  );
  const detail = loaders.contentLoader(
    requestFor(`examples/${threejs.id}/`, { exampleId: threejs.id }),
  );
  assert.deepEqual(detail.entry, threejs);
  assert.equal(detail.communityKey, threejs.key);
  assert.equal(Object.hasOwn(detail, "steps"), false);
});

test("old Three.js list and detail addresses redirect to Examples in both languages", () => {
  for (const prefix of ["", "zh/"]) {
    assert.deepEqual(
      loaders.threejsRedirect(requestFor(`${prefix}threejs-games/`)),
      {
        target: `/${prefix}examples/`,
      },
    );
    assert.deepEqual(
      loaders.threejsRedirect(
        requestFor(`${prefix}threejs-games/${threejs.id}/?q=puzzle`, {
          gameId: threejs.id,
        }),
      ),
      { target: `/${prefix}examples/${threejs.id}/?q=puzzle` },
    );
  }
  assert.throws(
    () =>
      loaders.threejsRedirect(
        requestFor("threejs-games/missing/", { gameId: "missing" }),
      ),
    (error) => error instanceof Response && error.status === 404,
  );
});

test("repository research remains a record ledger, not a second game gallery", () => {
  const ledger = loaders.researchLoader(requestFor("research/"));
  assert.deepEqual(Object.keys(ledger), ["records"]);
  assert.deepEqual(ledger.records, [research]);
});

const card = (entry) =>
  `<article data-content-ref="${entry.key}"><a href="${entry.url}">${entry.title}</a></article>`;
const record = (entry) =>
  `<article data-content-key="${entry.key}"><h1 data-content-field="title">${entry.title}</h1><p data-content-field="description">${entry.description}</p></article>`;
const entrance = (id, path) =>
  `<a data-collection-id="${id}" href="${path}">${id}</a>`;
const registry = { entries: [paper, resource] };
const pages = {
  "/": `<nav>${entrance("papers", "/papers/")}${entrance("resources", "/resources/")}</nav>`,
  [paper.url]: record(paper),
  [paper.collectionUrl]: card(paper),
  [resource.url]: record(resource),
  [resource.collectionUrl]: card(resource),
};
const readPages =
  (overrides = {}) =>
  async (path) => {
    const html = { ...pages, ...overrides }[path];
    assert.notEqual(html, undefined, `Missing fixture page ${path}`);
    return html;
  };

test("homepage navigation and dedicated collections prove full record discovery without Explore", async () => {
  const result = await assertRenderedCoverage(registry, readPages());
  assert.equal(result.records, 2);
  // A few featured records on the homepage are legitimate, not a second full index.
  assert.equal(
    (
      await assertRenderedCoverage(
        registry,
        readPages({ "/": pages["/"] + card(resource) }),
      )
    ).records,
    2,
  );
});
test("authoring-only paths and steps have no public pages or search results", async () => {
  const retired = [
    entry("path", "2d", "/paths/"),
    entry("step", "2d/brief", "/paths/"),
  ];
  const retained = { entries: [...registry.entries, ...retired] };
  assert.equal(
    (await assertRenderedCoverage(retained, readPages())).records,
    registry.entries.length,
  );
  const index = {
    version: 2,
    documents: registry.entries.map(
      ({ key, kind, title, description, url }) => ({
        key,
        kind,
        title,
        url,
        text: `${title}\n${description}`,
      }),
    ),
  };
  assertSearchCoverage(retained, index, (block) => block.value);
  assert.throws(
    () =>
      assertSearchCoverage(
        retained,
        { ...index, documents: [...index.documents, retired[0]] },
        (block) => block.value,
      ),
    /non-public page identities/,
  );
});
test("coverage rejects missing, duplicate or hidden collection navigation", async () => {
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({ "/": entrance("papers", "/papers/") }),
    ),
    /missing owning collection entrance/,
  );
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({ "/": pages["/"] + entrance("papers", "/papers/") }),
    ),
    /only one primary navigation entrance/,
  );
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({ "/": `<div hidden>${pages["/"]}</div>` }),
    ),
    /must be readable/,
  );
});
test("navigation entrances must be native links to real local collection addresses", async () => {
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({ "/": '<button data-collection-id="papers">Papers</button>' }),
    ),
    /native link/,
  );
  for (const invalid of ["https://other.example/papers/", "/", "/unrelated/"])
    await assert.rejects(
      assertRenderedCoverage(
        registry,
        readPages({
          "/":
            entrance("papers", invalid) + entrance("resources", "/resources/"),
        }),
      ),
      /missing owning collection entrance/,
    );
});
test("resource-scoped recordings remain discoverable without a gallery index", async () => {
  const demo = {
    ...entry("demo", "clip", resource.url),
    url: "/showcase/clip/",
  };
  const result = await assertRenderedCoverage(
    { entries: [resource, demo] },
    readPages({
      [resource.url]: record(resource) + card(demo),
      [demo.url]: record(demo),
    }),
  );
  assert.equal(result.records, 2);
});
test("removing Explore does not relax canonical fields, unique records, owning cards or their links", async () => {
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({ [paper.collectionUrl]: "<main>No paper cards</main>" }),
    ),
    /missing from owning collection/,
  );
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({
        [paper.url]: `<article data-content-key="${paper.key}"><h1 data-content-field="title">${paper.title}</h1></article>`,
      }),
    ),
    /missing rendered field description/,
  );
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({ [paper.url]: record(paper) + record(paper) }),
    ),
    /exactly one record/,
  );
  await assert.rejects(
    assertRenderedCoverage(
      registry,
      readPages({
        [paper.collectionUrl]: card(paper).replace(paper.url, "/wrong/"),
      }),
    ),
    /missing href/,
  );
});
