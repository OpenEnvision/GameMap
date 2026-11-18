import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire, isBuiltin } from "node:module";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import { loadContent } from "../../scripts/lib/content.mjs";
import {
  parsePage,
  attributes,
  textContent,
} from "../../scripts/lib/rendered-coverage.mjs";

const context = await loadContent();
const require = createRequire(import.meta.url);
const output = await build({
  stdin: {
    contents: `import { createElement } from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { MemoryRouter } from 'react-router';
      import { ExampleCard } from './website/app/components/example-card';
      import { ResearchGameCard } from './website/app/components/research-game-card';
      export const render = (research, props) => renderToStaticMarkup(createElement(MemoryRouter, null, createElement(research ? ResearchGameCard : ExampleCard, props)));`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
  plugins: [
    {
      name: "share-react",
      setup(builder) {
        builder.onResolve({ filter: /^[a-z@]/ }, (args) =>
          isBuiltin(args.path)
            ? undefined
            : {
                path: pathToFileURL(require.resolve(args.path)).href,
                external: true,
              },
        );
      },
    },
  ],
});
const { render } = await import(
  `data:text/javascript;base64,${Buffer.from(output.outputFiles[0].text).toString("base64")}`
);
const example = context.registry.all("example")[0];
const media = context.sources.learningMedia[example.id];
const record = structuredClone(context.registry.all("repository-research")[0]);
record.data.game_access = {
  title: "Unified research game",
  track: "3d",
  engine: "Browser engine",
  kind: "playable",
  url: "https://play.example.org/",
  source_url: "https://github.com/example/game/blob/main/README.md",
  checked_at: "2026-10-24",
  note: "Published build; not independently playtested.",
};
record.data.ai_note = "No creator coding-client attribution was established.";
const pageCover = {
  kind: "page-cover", origin: "project-page-capture", sourceKind: "repository-page",
  src: "media/page-covers/render-test.webp", alt: "Repository page, not gameplay.",
  width: 1280, height: 720,
};
const hasClass = (node, name) =>
  attributes(node).class?.split(/\s+/).includes(name);

for (const [name, research, props] of [
  ["creator", false, { game: example.data, media }],
  ["research", true, { entry: record, media }],
])
  test(`${name} games use the same image, metadata, notes and source-link card structure`, () => {
    const html = render(research, props),
      page = parsePage(html);
    const article = page.nodes.find((node) => node.tagName === "article");
    assert.ok(hasClass(article, "example-card"));
    assert.equal(
      attributes(article)["data-content-ref"],
      research ? record.key : example.key,
    );
    assert.deepEqual(
      article.childNodes
        .filter((node) => node.tagName)
        .map((node) => [node.tagName, attributes(node).class]),
      [
        ["a", "example-image"],
        ["div", "example-body"],
      ],
    );
    const image = page.nodes.find((node) => node.tagName === "img");
    assert.equal(attributes(image).alt, media.alt);
    assert.equal(attributes(image).width, String(media.width));
    assert.equal(attributes(image).height, String(media.height));
    assert.equal(attributes(image).loading, "lazy");
    assert.match(attributes(image).src, /^\/media\//);
    for (const name of ["card-meta", "build-notes", "example-links"])
      assert.ok(
        page.nodes.some((node) => hasClass(node, name)),
        `Missing shared ${name}`,
      );
    const links = page.nodes.find((node) => hasClass(node, "example-links"));
    assert.equal(
      links.childNodes.filter((node) => node.tagName === "a").length,
      3,
    );
    if (research) {
      assert.ok(textContent(article).includes(record.data.ai_note));
      assert.equal(
        page.nodes.filter((node) => node.tagName === "ol").length,
        0,
        "Do not invent a creator workflow for research games",
      );
    }
  });

test("compact creator cards still preserve images and omit expanded workflows", () => {
  const page = parsePage(
    render(false, { game: example.data, media, compact: true }),
  );
  assert.ok(page.nodes.some((node) => node.tagName === "img"));
  assert.equal(
    page.nodes.filter((node) => node.tagName === "details").length,
    0,
  );
});

test("foundation provenance stays inside notes without overlapping the shared description row", () => {
  for (const entry of context.registry.all("foundation")) {
    const page = parsePage(render(false, { game: entry.data }));
    const body = page.nodes.find((node) => hasClass(node, "example-body"));
    assert.equal(
      body.childNodes.filter((node) => node.tagName === "p").length,
      1,
    );
    assert.equal(
      body.childNodes.filter((node) => node.tagName === "details").length,
      1,
    );
    assert.ok(
      textContent(body).includes(
        "Official engine examples, not AI-authorship claims.",
      ),
    );
  }
});

test("source-only imported cards expose source actions, not invented play or download buttons", () => {
  const entry = context.registry
    .all("example")
    .find((e) => e.data.demo.kind === "source");
  assert.ok(entry);
  const page = parsePage(render(false, { game: entry.data }));
  const article = page.nodes.find((node) => node.tagName === "article");
  assert.equal(attributes(article)["data-access-kind"], "source");
  const primary = page.nodes.find((node) => hasClass(node, "example-image"));
  assert.equal(attributes(primary).href, entry.data.source.url);
  assert.equal(
    attributes(primary)["aria-label"],
    "View source for " + entry.data.title,
  );
  const action = page.nodes.find((node) => hasClass(node, "image-action"));
  assert.match(textContent(action), /View source/);
  assert.doesNotMatch(textContent(action), /Play the game|Get the game/);
  assert.ok(textContent(article).includes("Source only / release unverified"));
});

test("project references expose an observed project page, never a source or play/download claim", () => {
  const entry = context.registry
    .all("example")
    .find((e) => e.data.demo.kind === "reference");
  assert.ok(entry);
  const page = parsePage(render(false, { game: entry.data })),
    article = page.nodes.find((n) => n.tagName === "article"),
    primary = page.nodes.find((n) => hasClass(n, "example-image")),
    action = page.nodes.find((n) => hasClass(n, "image-action"));
  assert.equal(attributes(article)["data-access-kind"], "reference");
  assert.equal(attributes(primary).href, entry.data.intake.homepage);
  assert.match(textContent(action), /View project/);
  assert.doesNotMatch(
    textContent(action),
    /View source|Play the game|Get the game/,
  );
  assert.ok(
    textContent(article).includes("Project reference / source unverified"),
  );
});

test("page covers are visibly non-gameplay fallback media without changing access actions", () => {
  const entry = context.registry.all("example").find((e) => e.data.demo.kind === "source");
  const page = parsePage(render(false, { game: entry.data, pageCover }));
  const article = page.nodes.find((n) => n.tagName === "article");
  assert.equal(attributes(article)["data-cover-kind"], "project-page");
  assert.equal(attributes(page.nodes.find((n) => n.tagName === "img")).src, "/" + pageCover.src);
  assert.equal(textContent(page.nodes.find((n) => hasClass(n, "page-cover-label"))), "Project page · not gameplay");
  assert.equal(page.nodes.some((n) => hasClass(n, "game-preview-unavailable")), false);
  assert.equal(attributes(page.nodes.find((n) => hasClass(n, "example-image"))).href, entry.data.demo.url);
  assert.match(textContent(page.nodes.find((n) => hasClass(n, "image-action"))), /View source/);
});

test("catalog-record covers are visibly distinct from upstream pages and gameplay", () => {
  const entry = context.registry.all("example").find((e) => e.data.demo.kind === "source");
  const page = parsePage(render(false, { game: entry.data, pageCover: { ...pageCover, origin: "catalog-page-capture" } }));
  assert.equal(attributes(page.nodes.find((n) => n.tagName === "article"))["data-cover-kind"], "catalog-page");
  assert.equal(textContent(page.nodes.find((n) => hasClass(n, "page-cover-label"))), "GameMap record · not upstream or gameplay");
  assert.equal(attributes(page.nodes.find((n) => hasClass(n, "example-image"))).href, entry.data.demo.url);
});

test("a reviewed gameplay image always wins over a supplied fallback page cover", () => {
  const page = parsePage(render(false, { game: example.data, media, pageCover }));
  assert.equal(attributes(page.nodes.find((n) => n.tagName === "article"))["data-cover-kind"], "gameplay");
  assert.equal(attributes(page.nodes.find((n) => n.tagName === "img")).src, "/" + media.src);
  assert.equal(page.nodes.some((n) => hasClass(n, "page-cover-label")), false);
});
