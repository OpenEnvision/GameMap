import test from "node:test";
import assert from "node:assert/strict";
import {
  readFile,
  access,
  mkdtemp,
  mkdir,
  writeFile,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import {
  assertSafeURL,
  reconstructHTML,
  linkRewriter,
  writeRemoteDocuments,
  revision,
  provenanceIndexPath,
  assertResearchRetirementReceipt,
  assertRetirableRemoteTree,
} from "../../scripts/import/recover-remote-documents.mjs";
import { readDocuments } from "../../scripts/lib/documents.mjs";
import { assertMarkdownSafety } from "../../scripts/lib/catalog/markdown-safety.mjs";
import { assertMarkdownCoverage } from "../../scripts/lib/rendered-coverage.mjs";
import {
  assertHistoricalDocumentEvidence,
  historicalDocumentEvidence,
} from "../../scripts/lib/remote-document-evidence.mjs";

const root = resolve(import.meta.dirname, "../..");
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkStringify);
const receipts = await Promise.all(
  [
    "research-archive-receipt.json",
    "research-archive-remainder-receipt.json",
  ].map(async (name) =>
    JSON.parse(await readFile(resolve(root, "config", name), "utf8")),
  ),
);
const sources = receipts.flatMap((receipt) => receipt.sources);
const provenance = {
  documents: sources.map((source) => ({
    slug: source.slug,
    source_path: source.path,
    source_sha256: source.sha256,
  })),
};
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const walk = (node) => [
  node,
  ...(node.children || node.childNodes || []).flatMap(walk),
];
const text = (node) => node.value || (node.children || []).map(text).join("");
const fixture = (body) =>
  `<html><body><script>throw new Error('never execute')</script><article data-content-key="document:fixture"><h1>Fixture</h1><div class="prose" lang="zh-CN">${body}</div></article></body></html>`;

test("recover-remote-documents: strict semantic recovery preserves prose, code, tables, details and Chinese", () => {
  const result = reconstructHTML(
    fixture(
      '<h2 id="证据"><a href="#证据">证据</a><button>复制章节链接</button></h2><p>Not playtested; <strong>license pending</strong>.</p><ul><li>One</li><li>Two</li></ul><table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td>Source only</td></tr></tbody></table><pre><code>&lt;script&gt;alert(1)&lt;/script&gt;\nline 2\n</code></pre><details><summary>Evidence</summary><p>Unverified</p></details>',
    ),
    "fixture",
  );
  assert.equal(result.sourceText, result.recoveredText);
  assert.equal(result.lang, "zh-CN");
  assert.deepEqual(result.anchors, ["证据"]);
  const markdown = parser.stringify({ type: "root", children: result.nodes });
  assertMarkdownSafety(markdown, "recovered fixture");
  assert.ok(markdown.includes("<script>alert(1)</script>\nline 2"));
  assert.ok(!markdown.includes("never execute"));
  assert.ok(markdown.includes("license pending"));
  assert.ok(markdown.includes("Source only"));
});

test("recover-remote-documents: unsafe links and unknown body semantics fail closed", () => {
  for (const url of [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html,test",
    "vbscript:x",
    "//evil.test/x",
    "https://user:secret@example.test/",
    "java\nscript:x",
    "java%0ascript:x",
    "%6aavascript%3ax",
    "\\\\evil.test/x",
    "%2f%2fevil.test",
    "https://example.test/\u0000",
  ]) {
    assert.throws(() => assertSafeURL(url), undefined, url);
    assert.throws(
      () =>
        reconstructHTML(
          fixture(
            `<p><a href="${url.replaceAll('"', "&quot;")}">unsafe</a></p>`,
          ),
          "fixture",
        ),
      undefined,
      url,
    );
  }
  for (const body of [
    "<script>alert(1)</script>",
    '<iframe src="https://example.test"></iframe>',
    '<p onclick="alert(1)">text</p>',
    "<button>Meaningful interaction</button>",
    "<svg><text>Important chart</text></svg>",
  ])
    assert.throws(() => reconstructHTML(fixture(body), "fixture"));
  assert.throws(() =>
    reconstructHTML("<article><p>Wrong boundary</p></article>", "fixture"),
  );
});

test("recover-remote-documents: link rewriting pins sources and never invents local targets", () => {
  const transformations = [];
  const rewrite = linkRewriter({
    source: "docs/example.md",
    slug: "remote/example",
    documents: new Map([
      ["docs/other.md", "remote/other"],
      ["docs/other", "remote/other"],
    ]),
    files: new Set(["LICENSE", "index.html", "media/example.png"]),
    transformations,
  });
  assert.equal(
    rewrite("other.md?q=1#evidence"),
    "/docs/remote/other/?q=1#evidence",
  );
  assert.equal(
    rewrite("/GameMap/docs/other/#evidence"),
    "/docs/remote/other/#evidence",
  );
  assert.equal(
    rewrite("../LICENSE"),
    `https://github.com/OpenEnvision/GameMap/blob/${revision}/LICENSE`,
  );
  assert.equal(
    rewrite("/GameMap/"),
    `https://github.com/OpenEnvision/GameMap/blob/${revision}/index.html`,
  );
  assert.equal(rewrite("../missing.md"), null);
  assert.throws(() => rewrite("../../escape.md"));
  assert.throws(() => rewrite("javascript:alert(1)"));
  assert.ok(
    transformations.some((t) => t.to === null && t.reason.includes("absent")),
  );
});

test("remote archive receipts: all historical documents and metadata are stored without retaining a duplicate tree", async () => {
  assert.equal(receipts[0].sources.length, 49);
  assert.equal(receipts[1].sources.length, 50);
  assert.equal(sources.length, 99);
  assert.equal(new Set(sources.map((source) => source.key)).size, 99);
  assert.equal(
    sources.filter((source) => source.path.endsWith(".md")).length,
    30,
  );
  assert.equal(
    sources.filter((source) => source.path.endsWith("/index.html")).length,
    66,
  );
  assert.equal(
    sources.find((source) => source.slug === "remote/threejs-game-candidates")
      .findings,
    46,
  );
  assert.ok(
    sources.find((source) => source.slug === "remote/document-provenance"),
  );
  assert.ok(
    sources.find((source) => source.slug === "remote/publishing-platforms"),
  );
  assert.ok(
    sources.find((source) => source.slug === "remote/zh/publishing-platforms"),
  );
  for (const receipt of receipts) {
    assert.equal(receipt.exclusions, 115);
    assert.match(receipt.batch_digest, /^[a-f0-9]{64}$/);
  }
  for (const source of sources) {
    assert.match(source.sha256, /^[a-f0-9]{64}$/);
    assert.match(source.findings_sha256, /^[a-f0-9]{64}$/);
    assert.ok(source.bytes > 0 && source.findings > 0);
  }
  await assert.rejects(access(resolve(root, "docs/remote")), {
    code: "ENOENT",
  });
  await assert.rejects(access(resolve(root, provenanceIndexPath)), {
    code: "ENOENT",
  });
});

test("remote retirement requires matching byte and Markdown receipts, not just a parseable source", () => {
  const source = {
    slug: "remote/fixture",
    source_sha256: hash("original"),
    markdown: "# Fixture\n",
  };
  const receipt = {
    format: "gamemap.research-archive-receipt",
    batch_digest: "a".repeat(64),
    sources: [
      {
        slug: source.slug,
        sha256: source.source_sha256,
        markdown_sha256: hash(source.markdown),
      },
    ],
  };
  assert.doesNotThrow(() => assertResearchRetirementReceipt(receipt, [source]));
  assert.throws(
    () =>
      assertResearchRetirementReceipt({ ...receipt, sources: [] }, [source]),
    /Missing source receipt/,
  );
  assert.throws(
    () =>
      assertResearchRetirementReceipt(receipt, [
        { ...source, markdown: "changed" },
      ]),
    /changed after import/,
  );
});

test("remote retirement refuses changed or unarchived files before removing the directory", async (t) => {
  const directory = await mkdtemp(resolve(tmpdir(), "gamemap-retirement-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(resolve(directory, "docs/remote"), { recursive: true });
  const path = "docs/remote/guide.md",
    file = resolve(directory, path);
  const expected = new Map([[path, "# Original\n"]]);
  await writeFile(file, expected.get(path));
  await assertRetirableRemoteTree(directory, expected);
  await writeFile(file, "# Changed\n");
  await assert.rejects(
    assertRetirableRemoteTree(directory, expected),
    /changed after archival/,
  );
  assert.equal(await readFile(file, "utf8"), "# Changed\n");
  await writeFile(file, expected.get(path));
  await writeFile(
    resolve(directory, "docs/remote/unknown.md"),
    "Unarchived user content",
  );
  await assert.rejects(
    assertRetirableRemoteTree(directory, expected),
    /Unarchived remote file/,
  );
  assert.equal(await readFile(file, "utf8"), expected.get(path));
});

test("remote retirement removes navigation and links without removing current formal guides", async () => {
  const documents = await readDocuments();
  const known = new Map(documents.map((d) => [d.slug, d]));
  const remote = documents.filter((d) => d.slug.startsWith("remote/"));
  assert.equal(remote.length, 0);
  assert.equal(known.has("remote-source-index"), false);
  await assert.rejects(readFile(resolve(root, "docs/remote-source-index.md")), {
    code: "ENOENT",
  });
  await assert.rejects(
    readFile(resolve(root, "website/public/remote-source-index.md")),
    { code: "ENOENT" },
  );
  const originalConfig = JSON.parse(
    execFileSync("git", ["show", "HEAD:website/docs.config.json"], {
      cwd: root,
      encoding: "utf8",
    }),
  );
  for (const group of originalConfig)
    for (const [slug] of group.pages)
      if (slug !== "remote-source-index") assert.ok(known.has(slug));
  for (const doc of documents) {
    const tree = parser.parse(
      await readFile(resolve(root, doc.source), "utf8"),
    );
    for (const node of walk(tree)) {
      if (["link", "image", "definition"].includes(node.type))
        assert.doesNotMatch(
          node.url,
          /^\/(?:zh\/)?docs\/remote\//,
          `${doc.slug}: retired archive link`,
        );
    }
  }
});

test("rendered-coverage: normalize only known document routes without discarding query or fragment", () => {
  const doc = { slug: "remote/fixture", source: "docs/remote/fixture.md" };
  const docs = [
    doc,
    { slug: "remote/target", source: "docs/remote/target.md" },
  ];
  const source = "# Fixture\n\n[Evidence](/docs/remote/target/?q=1#proof)\n";
  const page = (url) =>
    `<html lang="en"><div class="prose"><a href="${url}">Evidence</a></div></html>`;
  for (const url of [
    "/docs/remote/target/?q=1#proof",
    "/docs/remote/target?q=1#proof",
  ])
    assert.doesNotThrow(() =>
      assertMarkdownCoverage(doc, source, page(url), docs),
    );
  for (const url of [
    "/docs/remote/missing/?q=1#proof",
    "/docs/remote/target/?q=1#missing",
    "/docs/remote/target/#proof",
  ])
    assert.throws(
      () => assertMarkdownCoverage(doc, source, page(url), docs),
      /missing href/,
    );
  const missingSource = "# Fixture\n\n[Evidence](/docs/remote/missing/)\n";
  assert.throws(
    () =>
      assertMarkdownCoverage(
        doc,
        missingSource,
        page("/docs/remote/missing/"),
        docs,
      ),
    /missing href/,
  );
});

test("check-web: historical hosting exception is exact, source-pinned and prose-link-only", () => {
  const [first, second] = historicalDocumentEvidence.urls;
  const body = (value, slug = "remote/community-case-research") =>
    `<article data-content-key="document:${slug}"><div class="prose">${value}</div></article>`;
  for (const [slug, source] of Object.entries(
    historicalDocumentEvidence.documents,
  )) {
    const doc = provenance.documents.find((d) => d.slug === slug);
    assert.equal(doc.source_path, source.source);
    assert.equal(doc.source_sha256, source.sha256);
    for (const url of [first, second])
      for (const prefix of ["docs/", "zh/docs/"])
        assert.doesNotThrow(() =>
          assertHistoricalDocumentEvidence(
            body(`<p><a href="${url}">Original play evidence</a></p>`, slug),
            `${prefix}${slug}/`,
          ),
        );
  }
  const page = "docs/remote/community-case-research/";
  for (const html of [
    body(`<a href="${first}extra">Altered URL</a>`),
    body('<a href="https://other.chatgpt.site/">Unapproved host</a>'),
    body(`<a href="${first}" title="${second}">Other attribute</a>`),
    body(`<img src="${first}">`),
    body(`<script src="${first}"></script>`),
    body(`<script>const url = '${first}'</script>`),
    body(`<nav><a href="${first}">Navigation</a></nav>`),
    `<link rel="canonical" href="${first}">`,
    body(`<a href="${first}">Wrong source</a>`, "remote/other"),
    `<a href="${first}">Outside body</a>`,
    `<!-- ${first} -->`,
  ])
    assert.throws(
      () => assertHistoricalDocumentEvidence(html, page),
      /Legacy hosting/,
    );
  for (const page of [
    "",
    "docs/practical-guide/",
    "docs/remote/other/",
    "resources/",
  ])
    assert.throws(
      () =>
        assertHistoricalDocumentEvidence(
          body(`<a href="${first}">Original</a>`),
          page,
        ),
      /Legacy hosting/,
    );
});

test("check-web: exact pinned creator links also render in their structured records and generated guide", () => {
  for (const [key, url] of Object.entries(
    historicalDocumentEvidence.structuredSource.records,
  )) {
    for (const attr of ["data-content-key", "data-content-ref"])
      assert.doesNotThrow(() =>
        assertHistoricalDocumentEvidence(
          `<article ${attr}="${key}"><a href="${url}">Play</a></article>`,
          "examples/",
        ),
      );
    for (const html of [
      `<article data-content-ref="example:another"><a href="${url}">Play</a></article>`,
      `<article data-content-ref="${key}"><a href="${url}unreviewed">Play</a></article>`,
      `<nav><article data-content-ref="${key}"><a href="${url}">Play</a></article></nav>`,
      `<article data-content-ref="${key}"><img src="${url}"></article>`,
      `<article data-content-ref="${key}"><script src="${url}"></script></article>`,
    ])
      assert.throws(
        () => assertHistoricalDocumentEvidence(html, "examples/"),
        /Legacy hosting/,
      );
    const prose = `<article data-content-key="document:tutorials-and-demos"><div class="prose"><a href="${url}">Play</a></div></article>`;
    assert.doesNotThrow(() =>
      assertHistoricalDocumentEvidence(prose, "docs/tutorials-and-demos/"),
    );
    assert.throws(
      () => assertHistoricalDocumentEvidence(prose, "docs/other/"),
      /Legacy hosting/,
    );
  }
});

test("check-web: router hydration preserves exact evidence as inert JSON, not executable URL exceptions", () => {
  const [url] = historicalDocumentEvidence.urls;
  const table = [{ _1: 2 }, "loaderData", { _3: 4 }, "demo", url];
  const enqueue = (value) =>
    `window.__reactRouterContext.streamController.enqueue(${JSON.stringify(JSON.stringify(value) + "\n")});`;
  assert.doesNotThrow(() =>
    assertHistoricalDocumentEvidence(
      `<script>${enqueue(table)}</script>`,
      "examples/",
    ),
  );
  for (const source of [
    `fetch(${JSON.stringify(url)});`,
    `${enqueue(table)}fetch(${JSON.stringify(url)});`,
    enqueue([...table.slice(0, 4), url + "foreign"]),
    enqueue([{ _1: 2 }, "loaderData", { _3: 4 }, "__proto__", url]),
    enqueue(["loaderData", { _3: 99 }, url]),
  ])
    assert.throws(
      () =>
        assertHistoricalDocumentEvidence(
          `<script>${source}</script>`,
          "examples/",
        ),
      /Legacy hosting/,
    );
  assert.throws(
    () =>
      assertHistoricalDocumentEvidence(
        `<script type="module">${enqueue(table)}</script>`,
        "examples/",
      ),
    /Legacy hosting/,
  );
});

test(
  "recover-remote-documents: pinned-input reproduction, external bytes, full rendered text and candidate payload equality",
  {
    skip:
      !process.env.REMOTE_DOC_PACKET || !process.env.REMOTE_DOC_CHECKOUT
        ? "Set REMOTE_DOC_PACKET and REMOTE_DOC_CHECKOUT to the authorized read-only inputs"
        : false,
  },
  async () => {
    const packet = process.env.REMOTE_DOC_PACKET;
    const checkout = process.env.REMOTE_DOC_CHECKOUT;
    const result = await writeRemoteDocuments({
      packet,
      checkout,
      output: root,
      check: true,
    });
    const provenance = result.initial.provenance;
    assert.deepEqual(result.counts, provenance.counts);
    const candidates = JSON.parse(
      await readFile(resolve(packet, "candidates.json"), "utf8"),
    );
    const evidence = historicalDocumentEvidence.structuredSource;
    assert.equal(
      hash(await readFile(resolve(packet, "source", evidence.path))),
      evidence.sha256,
    );
    for (const [key, url] of Object.entries(evidence.records)) {
      const candidate = candidates.entries.find((entry) => entry.key === key);
      assert.equal(candidate.source_ref, evidence.path);
      assert.equal(candidate.body.payload.demo.url, url);
      assert.equal(candidate.body.attachments.learningMedia.sourceUrl, url);
    }
    const indexTree = parser.parse(
      result.initial.archiveSources.find(
        (source) => source.kind === "import-index",
      ).markdown,
    );
    const payloads = walk(indexTree)
      .filter((n) => n.type === "code" && n.lang === "json")
      .map((n) => JSON.parse(n.value));
    const originalGames = JSON.parse(
      await readFile(
        resolve(packet, "source/collections/threejs-games/candidates.json"),
        "utf8",
      ),
    ).candidates;
    for (const exclusion of candidates.excluded) {
      const stored = exclusion.key.startsWith("document:")
        ? provenance.documents.find(
            (d) => d.historical_exclusion?.key === exclusion.key,
          ).historical_exclusion
        : payloads.find((p) => p.key === exclusion.key);
      assert.deepEqual(stored, exclusion);
      if (exclusion.key.startsWith("threejs-game:")) {
        const id = exclusion.key.slice("threejs-game:".length);
        assert.deepEqual(
          payloads.find((p) => p.id === id),
          originalGames.find((p) => p.id === id),
        );
      }
    }
    for (const doc of provenance.documents.filter(
      (d) => d.kind === "rendered-page-reconstruction",
    )) {
      const bytes = execFileSync(
        "git",
        ["show", `${revision}:${doc.source_path}`],
        { cwd: checkout, maxBuffer: 32 * 1024 * 1024 },
      );
      assert.equal(hash(bytes), doc.source_sha256);
      const reconstructed = reconstructHTML(
        bytes.toString("utf8"),
        doc.slug.slice(7),
      );
      assert.equal(
        reconstructed.sourceText,
        reconstructed.recoveredText,
        doc.slug,
      );
      assert.equal(hash(reconstructed.sourceText), doc.visible_text_sha256);
      // The real Markdown serializer must retain all semantic text, not just the intermediate AST.
      const roundTrip = parser.parse(
        parser.stringify({ type: "root", children: reconstructed.nodes }),
      );
      const prose = (node) => {
        if (["text", "code", "inlineCode"].includes(node.type))
          return node.value;
        if (node.type === "break") return " ";
        return (node.children || [])
          .map(prose)
          .join(
            [
              "paragraph",
              "heading",
              "link",
              "strong",
              "emphasis",
              "delete",
              "tableCell",
            ].includes(node.type)
              ? ""
              : " ",
          );
      };
      assert.equal(
        prose(roundTrip).replace(/\s+/g, " ").trim(),
        reconstructed.sourceText,
        doc.slug,
      );
    }
  },
);
