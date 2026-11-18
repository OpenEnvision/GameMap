import test from "node:test";
import assert from "node:assert/strict";
import { createRequire, isBuiltin } from "node:module";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import {
  assertRecordFields,
  parsePage,
  attributes,
  textContent,
} from "../scripts/lib/rendered-coverage.mjs";

const require = createRequire(import.meta.url);
const compiled = await build({
  stdin: {
    contents: `
      import {createElement} from 'react';
      import {renderToStaticMarkup} from 'react-dom/server';
      import {MemoryRouter} from 'react-router';
      import {LocaleProvider} from './website/app/lib/i18n';
      import {PaperDocument} from './website/app/components/paper-document';
      import {fieldRules, presentFields} from './website/content/fields';
      import {localizeEntry} from './website/content/localization.server';
      import {documentLanguages} from './website/content/locale';
      export function render(payload, locale='en') {
        const entry = localizeEntry({key:'paper:'+payload.id, kind:'paper', id:payload.id,
          title:payload.title, description:payload.description, data:payload,
          url:'/papers/'+payload.id+'/', collectionUrl:'/papers/', source:'fixture',
          blocks:presentFields(payload, fieldRules.paper, 'fixture')}, locale, documentLanguages([]));
        return {entry, html: renderToStaticMarkup(createElement(MemoryRouter, null,
          createElement(LocaleProvider, {locale}, createElement(PaperDocument, {entry}))))};
      }`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  jsx: "automatic",
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
  plugins: [
    {
      name: "shared-node-dependencies",
      setup(builder) {
        builder.onResolve({ filter: /^[a-z@]/ }, ({ path }) =>
          isBuiltin(path)
            ? undefined
            : {
                path: pathToFileURL(require.resolve(path)).href,
                external: true,
              },
        );
      },
    },
  ],
});
const { render } = await import(
  "data:text/javascript;base64," +
    Buffer.from(compiled.outputFiles[0].text).toString("base64")
);
const fixture = () => ({
  id: "paper-reading-fixture",
  title: "A foundation model for making games",
  description:
    "A source-linked research reference, not an independently reproduced implementation.",
  authors: "Example Author and Second Author.",
  year: 2026,
  publication:
    "Findings of the Example Conference, volume 12, pages 1–15 (2026).",
  referenceType: "blog",
  primaryRole: "runtime",
  roles: ["build", "runtime"],
  topics: ["World generation", "Runtime mechanics"],
  url: "https://example.org/publication",
  pdfUrl: "https://example.org/paper.pdf",
  arxivId: "2601.00001",
  doi: "10.0000/fixture",
  resourceIds: ["codex"],
  origins: [
    { label: "Survey reference [293]", url: "https://example.org/survey#293" },
  ],
  citedSections: [
    {
      label: "Runtime rules and worlds",
      url: "https://example.org/survey#runtime",
    },
  ],
  classification:
    "Navigation categories are not independently verified capability claims.",
  access: {
    codeStatus: "not-found",
    repositories: [],
    projects: [],
    demos: [],
    reviewStatus: "source-reviewed",
    checkedAt: "2026-10-20",
    evidence: [
      { label: "Official publication", url: "https://example.org/publication" },
    ],
    notes: [
      "No official implementation was identified. This does not establish that the work is closed source.",
    ],
  },
});
function record(html) {
  return parsePage(html).nodes.find(
    (node) => attributes(node)["data-content-kind"] === "paper",
  );
}

test("paper reading layout: all reviewed fields survive, with primary links above a native citation disclosure", () => {
  const payload = fixture(),
    before = structuredClone(payload),
    result = render(payload);
  assert.deepEqual(payload, before);
  assertRecordFields(result.entry, record(result.html));
  const parsed = parsePage(result.html);
  const hero = parsed.nodes.find(
    (node) => attributes(node).class === "paper-hero",
  );
  assert.ok(textContent(hero).includes(payload.publication));
  assert.ok(textContent(hero).includes(payload.authors));
  assert.ok(!textContent(hero).includes(payload.id));
  const details = parsed.nodes.find((node) => node.tagName === "details");
  assert.ok(details);
  assert.equal(attributes(details).open, undefined);
  assert.ok(textContent(details).includes(payload.classification));
  assert.ok(textContent(details).includes(payload.id));
  assert.ok(
    result.html.indexOf('href="https://example.org/publication"') <
      result.html.indexOf("<details"),
  );
  assert.ok(result.html.includes("Implementation not located"));
  assert.ok(result.html.includes(payload.access.notes[0]));
  assert.ok(result.html.includes("No demos listed."));
  assert.ok(!result.html.includes("codeStatus"));
  assert.ok(!result.html.includes("reviewStatus"));
});

test("paper access presentation preserves repository kinds, licenses, demo gates and source evidence without nested raw keys", () => {
  const payload = fixture();
  payload.access.codeStatus = "source-available";
  payload.access.repositories = [
    {
      label: "Official implementation",
      url: "https://github.com/example/project",
      kind: "partial",
      license: {
        status: "restricted",
        name: "Research-only terms",
        url: "https://example.org/license",
      },
    },
  ];
  payload.access.projects = [
    { label: "Project site", url: "https://example.org/project" },
  ];
  payload.access.demos = [
    {
      label: "Request the demo",
      url: "https://example.org/demo",
      kind: "interactive",
      access: "request",
      note: "Access requires author approval; no playtesting was performed.",
    },
  ];
  const result = render(payload);
  assertRecordFields(result.entry, record(result.html));
  for (const value of [
    "Partial implementation",
    "Restricted license",
    "Research-only terms",
    "Access on request",
    payload.access.demos[0].note,
  ])
    assert.ok(result.html.includes(value), value);
  assert.ok(result.html.includes('href="https://example.org/license"'));
  assert.ok(result.html.includes("Source-available code"));
  assert.ok(!result.html.includes("No demos listed."));
});

test("paper reading UI localizes its labels while retaining English source caveats", () => {
  const payload = fixture(),
    result = render(payload, "zh");
  assertRecordFields(result.entry, record(result.html));
  for (const value of [
    "博客文章",
    "阅读原文",
    "阅读 PDF",
    "代码与项目访问",
    "来源与引用详情",
    "未找到实现代码",
    "未列出演示。",
  ])
    assert.ok(result.html.includes(value), value);
  assert.ok(result.html.includes(payload.access.notes[0]));
});
