import assert from "node:assert/strict";
import { readFile, mkdir, writeFile, rm, access } from "node:fs/promises";
import { resolve, dirname, posix, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { parse } from "parse5";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { decodeRouterData } from "./lib/catalog/remote-source.mjs";
import { preparedMarkdown, walk, slash } from "./lib/documents.mjs";
import { databaseResearchArchive } from "./lib/research-archive-policy.mjs";
import { assertMarkdownSafety } from "./lib/catalog/markdown-safety.mjs";

export const revision = "a2fe9a8e1d7b05008e11db1586d308c0086f7d91";
// Keep provenance and excluded candidates as an archive, not a reader page.
export const provenanceIndexPath = "docs/remote/provenance-index.md.txt";
const repository = "https://github.com/OpenEnvision/GameMap";
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkStringify, { bullet: "-", fences: true });
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const json = (value) => JSON.stringify(value, null, 2) + "\n";
const text = (value) => ({ type: "text", value });
const paragraph = (children) => ({ type: "paragraph", children });
const link = (label, url) => ({ type: "link", url, children: [text(label)] });
const code = (value, lang = "json") => ({
  type: "code",
  lang,
  value: typeof value === "string" ? value : json(value).trimEnd(),
});
const heading = (value, depth = 2) => ({
  type: "heading",
  depth,
  children: [text(value)],
});
const markdown = (children) => processor.stringify({ type: "root", children });
const attr = (node, key) => node.attrs?.find((a) => a.name === key)?.value;
const elements = (node) => [node, ...(node.childNodes || []).flatMap(elements)];
const rawText = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(rawText).join("");
export const normalizedText = (value) => value.replace(/\s+/g, " ").trim();
function markdownText(node) {
  if (["text", "inlineCode", "code"].includes(node.type)) return node.value;
  if (node.type === "break") return " ";
  return (node.children || [])
    .map(markdownText)
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
}
function safePath(path) {
  assert.ok(
    path &&
      !path.startsWith("/") &&
      !path.includes("\\") &&
      !path.split("/").some((s) => s === ".." || s === "." || !s),
    `Unsafe source path: ${path}`,
  );
  return path;
}
const pinned = (path) =>
  `${repository}/blob/${revision}/${safePath(path).split("/").map(encodeURIComponent).join("/")}`;

/** Reject active schemes, obfuscated controls, network-path URLs and credentials before resolving anything. */
export function assertSafeURL(url) {
  assert.ok(
    !/[\u0000-\u0020\u007f\\]/.test(url),
    `Unsafe URL characters: ${JSON.stringify(url)}`,
  );
  const decoded = decodeURIComponent(url);
  assert.ok(
    !/[\u0000-\u001f\u007f\\]/.test(decoded),
    "Encoded unsafe URL characters",
  );
  for (const value of [url, decoded]) {
    assert.ok(!value.startsWith("//"), "Network-path URL rejected");
    const scheme = /^([a-z][a-z\d+.-]*):/i.exec(value)?.[1]?.toLowerCase();
    assert.ok(
      !scheme || ["https", "http", "mailto"].includes(scheme),
      "Unsafe URL scheme",
    );
    if (scheme === "http" || scheme === "https") {
      const parsed = new URL(value);
      assert.ok(
        !parsed.username && !parsed.password,
        "URL credentials rejected",
      );
    }
  }
}

export function linkRewriter({
  source,
  slug,
  documents,
  files,
  transformations,
  databaseDocuments = new Map(),
}) {
  const destinationURL = (destination, suffix) =>
    databaseDocuments.has(destination)
      ? pinned(databaseDocuments.get(destination)) + suffix
      : `/docs/${destination}/${suffix}`;
  return (url) => {
    if (!url) return url;
    assertSafeURL(url);
    let result = url;
    if (!/^(?:https?:|mailto:|#)/i.test(url)) {
      const [, path, suffix] = url.match(/^([^?#]*)(.*)$/);
      let target;
      if (path.startsWith("/GameMap/")) target = path.slice(9);
      else if (path.startsWith("/")) target = path.slice(1);
      else
        target = posix.normalize(
          posix.join(posix.dirname(source), decodeURIComponent(path)),
        );
      if (target.startsWith("../"))
        throw new Error(`Source link escapes repository: ${url}`);
      const route = target.replace(/\/index\.html$/, "").replace(/\/$/, "");
      const destination = documents.get(target) || documents.get(route);
      if (destination) result = destinationURL(destination, suffix);
      else if (files.has(target)) result = pinned(target) + suffix;
      else if (files.has(route ? `${route}/index.html` : "index.html"))
        result = pinned(route ? `${route}/index.html` : "index.html") + suffix;
      else {
        // A missing original source is not made to look like a working local page.
        transformations.push({
          from: url,
          to: null,
          reason:
            "Target absent at pinned revision; retained as source-only text",
        });
        return null;
      }
    } else if (
      url.startsWith(`${repository}/blob/main/`) ||
      url.startsWith(`${repository}/blob/master/`)
    ) {
      const target = url
        .replace(/^.*\/blob\/(?:main|master)\//, "")
        .split(/[?#]/)[0];
      const suffix = url.slice(url.indexOf(target) + target.length);
      if (documents.has(target))
        result = destinationURL(documents.get(target), suffix);
      else if (files.has(target)) result = pinned(target) + suffix;
      else {
        transformations.push({
          from: url,
          to: null,
          reason: "Original source absent at pinned revision",
        });
        return null;
      }
    }
    if (result !== url) transformations.push({ from: url, to: result });
    return result;
  };
}

/** Only the semantic prose body is recovered; generated chrome is never treated as source. */
export function reconstructHTML(
  html,
  slug,
  rewrite = (url) => {
    assertSafeURL(url);
    return url;
  },
) {
  assert.ok(!html.includes("\u0000"), "NUL in source HTML");
  const tree = parse(html);
  const articles = elements(tree).filter(
    (n) =>
      n.tagName === "article" &&
      attr(n, "data-content-key") === `document:${slug}`,
  );
  assert.equal(articles.length, 1, "Expected one source document article");
  const article = articles[0];
  const bodies = (article.childNodes || []).filter(
    (n) =>
      n.tagName === "div" &&
      (attr(n, "class") || "").split(/\s+/).includes("prose"),
  );
  assert.equal(bodies.length, 1, "Expected one semantic prose body");
  const body = bodies[0];
  const dropped = new Set(["button", "svg"]);
  const allowed = new Set([
    "div",
    "span",
    "a",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "strong",
    "em",
    "del",
    "code",
    "pre",
    "figure",
    "ul",
    "ol",
    "li",
    "blockquote",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "details",
    "summary",
    "br",
    "hr",
  ]);
  function inspect(node) {
    if (dropped.has(node.tagName)) {
      assert.ok(
        node.tagName !== "svg" || attr(node, "aria-hidden") === "true",
        "Meaningful SVG cannot be silently dropped",
      );
      if (node.tagName === "button")
        assert.ok(
          [
            "Copy Anchor Link",
            "Copy Text",
            "复制章节链接",
            "复制代码",
          ].includes(rawText(node)),
          "Unknown body button",
        );
      return;
    }
    if (node.tagName)
      assert.ok(
        allowed.has(node.tagName),
        `Unsupported body element: ${node.tagName}`,
      );
    for (const a of node.attrs || [])
      assert.ok(!/^on/i.test(a.name), "Event attribute rejected");
    for (const child of node.childNodes || []) inspect(child);
  }
  inspect(body);
  const anchors = new Set();
  const anchor = (id) => {
    assert.match(id, /^[\p{L}\p{N}_:.-]+$/u, "Unsafe anchor ID");
    assert.ok(!anchors.has(id), `Duplicate source anchor ${id}`);
    anchors.add(id);
    return { type: "html", value: `<a id="${id}"></a>` };
  };
  function convert(node, parent) {
    if (node.nodeName === "#comment" || dropped.has(node.tagName)) return [];
    if (node.nodeName === "#text") return [text(node.value)];
    const tag = node.tagName;
    const children = () =>
      (node.childNodes || []).flatMap((c) => convert(c, tag));
    const wrap = (type, fields = {}) => [
      { type, ...fields, children: children() },
    ];
    if (/^h[1-6]$/.test(tag))
      return [
        ...(attr(node, "id") ? [anchor(attr(node, "id"))] : []),
        ...wrap("heading", { depth: Number(tag[1]) }),
      ];
    if (tag === "a") {
      const id = attr(node, "id");
      const url = attr(node, "href");
      const content = children();
      if (id) return [anchor(id), ...content];
      if (!url || /^h[1-6]$/.test(parent)) return content;
      const target = rewrite(url);
      return target === null
        ? [...content, text(` (source-only target: ${url})`)]
        : [{ type: "link", url: target, children: content }];
    }
    if (tag === "pre") return [code(rawText(node).replace(/\n$/, ""), "text")];
    if (tag === "code") return [{ type: "inlineCode", value: rawText(node) }];
    if (tag === "p") return wrap("paragraph");
    if (tag === "strong") return wrap("strong");
    if (tag === "em") return wrap("emphasis");
    if (tag === "del") return wrap("delete");
    if (tag === "blockquote") return wrap("blockquote");
    if (tag === "br") return [{ type: "break" }];
    if (tag === "hr") return [{ type: "thematicBreak" }];
    if (tag === "ul" || tag === "ol")
      return wrap("list", {
        ordered: tag === "ol",
        start: Number(attr(node, "start") || 1),
        spread: false,
      });
    if (tag === "li") {
      const content = children();
      const blocks = [];
      let inline = [];
      const flush = () => {
        if (inline.length) blocks.push(paragraph(inline));
        inline = [];
      };
      for (const c of content) {
        if (["paragraph", "list", "code", "blockquote"].includes(c.type)) {
          flush();
          blocks.push(c);
        } else inline.push(c);
      }
      flush();
      return [{ type: "listItem", spread: false, children: blocks }];
    }
    if (tag === "table") return wrap("table");
    if (tag === "tr") return wrap("tableRow");
    if (tag === "th" || tag === "td") return wrap("tableCell");
    if (tag === "details")
      return [
        {
          type: "html",
          value:
            attr(node, "open") !== undefined ? "<details open>" : "<details>",
        },
        ...children(),
        { type: "html", value: "</details>" },
      ];
    if (tag === "summary")
      return [
        { type: "html", value: "<summary>" },
        paragraph(children()),
        { type: "html", value: "</summary>" },
      ];
    return children();
  }
  const nodes = convert(body).filter(
    (n) => n.type !== "text" || n.value.trim(),
  );
  // Independent visible-text equality: no truncated table, list, code, or evidence caveat is accepted.
  function visible(node) {
    if (dropped.has(node.tagName)) return "";
    if (node.nodeName === "#text") return node.value;
    const value = (node.childNodes || []).map(visible).join("");
    return /^(p|h[1-6]|li|th|td|pre|summary|br)$/.test(node.tagName)
      ? ` ${value} `
      : value;
  }
  // Run an identity-link pass for coverage, since explicit missing-target notes add visible text.
  return {
    nodes,
    sourceText: normalizedText(visible(body)),
    recoveredText: normalizedText(markdownText({ children: nodes })),
    anchors: [...anchors],
    lang: attr(body, "lang"),
    title: rawText((article.childNodes || []).find((n) => n.tagName === "h1")),
  };
}

function rewriteMarkdown(source, rewrite) {
  const tree = processor.parse(preparedMarkdown(source));
  function visit(node) {
    if (["link", "image", "definition"].includes(node.type)) {
      const original = node.url;
      const url = rewrite(original);
      if (url === null) {
        // Reference definitions must remain resolvable, but never point at a made-up file.
        if (node.type === "definition")
          throw new Error(`Missing reference definition target: ${original}`);
        node.type = "text";
        node.value = `${node.alt || markdownText(node)} (source-only target: ${original})`;
        delete node.children;
        delete node.url;
      } else node.url = url;
    }
    for (const child of node.children || []) visit(child);
  }
  visit(tree);
  return tree.children;
}

export async function generateRemoteDocuments({
  packet,
  checkout,
  archiveAll = false,
}) {
  packet = resolve(packet);
  checkout = resolve(checkout);
  // Partial clones must fail on missing objects, never silently fetch over the network.
  const gitEnvironment = { ...process.env, GIT_NO_LAZY_FETCH: "1" };
  // HEAD/worktree contents are irrelevant: every byte below is read from this
  // immutable commit. This also supports a read-only repository at another HEAD.
  execFileSync("git", ["cat-file", "-e", `${revision}^{commit}`], {
    cwd: checkout,
    env: gitEnvironment,
  });
  const files = new Set(
    execFileSync("git", ["ls-tree", "-r", "--name-only", revision], {
      cwd: checkout,
      env: gitEnvironment,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
    })
      .trim()
      .split("\n"),
  );
  // Read immutable Git objects, not potentially modified worktree HTML or executable bundles.
  const gitBytes = (path) =>
    execFileSync("git", ["show", `${revision}:${safePath(path)}`], {
      cwd: checkout,
      env: gitEnvironment,
      maxBuffer: 32 * 1024 * 1024,
    });
  const packetBytes = await readFile(resolve(packet, "candidates.json"));
  const candidates = JSON.parse(packetBytes);
  assert.equal(candidates.source.revision, revision);
  assert.equal(candidates.source.repository, repository);
  assert.equal(candidates.documents.length, 30);
  assert.equal(candidates.excluded.length, 115);
  async function archived(path) {
    const bytes = await readFile(resolve(packet, "source", safePath(path)));
    const descriptor = candidates.files.find((f) => f.path === path);
    assert.ok(descriptor, `Missing archive descriptor: ${path}`);
    assert.equal(bytes.length, descriptor.bytes);
    assert.equal(sha256(bytes), descriptor.sha256);
    assert.deepEqual(
      bytes,
      gitBytes(path),
      `Archive differs from pinned Git object: ${path}`,
    );
    return bytes;
  }
  const manifest = (await decodeRouterData(gitBytes("data/docs.data"))).docs
    .data.manifest;
  const pathData = (await decodeRouterData(gitBytes("data/paths.data"))).paths
    .data;
  const gameBytes = await archived("collections/threejs-games/candidates.json");
  const gameCandidates = JSON.parse(gameBytes).candidates;
  const excludedDocs = candidates.excluded.filter((e) =>
    e.key.startsWith("document:"),
  );
  const originals = candidates.documents.map((d) => ({
    ...d,
    slug: `remote/archive/${d.source_path.slice(0, -3)}`,
  }));
  const documents = new Map();
  for (const d of originals) documents.set(d.source_path, d.slug);
  for (const e of excludedDocs) {
    const slug = e.key.slice(9);
    const d = manifest.find((d) => d.slug === slug);
    assert.ok(d, `Missing document metadata: ${slug}`);
    documents.set(d.source, `remote/${slug}`);
    documents.set(`docs/${slug}`, `remote/${slug}`);
  }
  const databaseDocuments = new Map();
  for (const d of originals) databaseDocuments.set(d.slug, d.source_path);
  for (const e of excludedDocs) {
    const slug = `remote/${e.key.slice(9)}`;
    if (
      archiveAll ||
      databaseResearchArchive({ kind: "rendered-page-reconstruction", slug })
    )
      databaseDocuments.set(slug, `docs/${e.key.slice(9)}/index.html`);
  }
  const outputs = new Map();
  const provenance = {
    format: "gamemap.remote-document-recovery",
    version: 1,
    source: candidates.source,
    packet_sha256: sha256(packetBytes),
    rules: [
      "Original Markdown snapshots are byte-identical UTF-8 .md.txt files; published Markdown is safely reserialized.",
      "Rendered reconstructions are not original Markdown. Only article[data-content-key] > div.prose is used.",
      "Generated copy buttons, decorative SVG, syntax-highlighting spans and outer navigation are removed; headings, tables, lists, code, details, anchors and visible prose are retained.",
      "Relative document links use remote IDs. Other existing source files link to pinned Git blobs. Missing targets are explicitly source-only, never invented local routes.",
      "Source candidate JSON remains inert fenced text, retaining status, license, evidence and next-action fields. No game or path is promoted.",
    ],
    documents: [],
  };
  const indexNodes = [
    heading("远端来源完整索引 / Remote source index", 1),
    paragraph([
      text(
        `固定版本 ${revision}；本页只是文档与来源索引，不是新游戏审核或完整 typed path 发布。保留本地现有文档名称；远端文档全部位于 remote/ 命名空间。`,
      ),
    ]),
    paragraph([
      link(
        "固定版本源码树 / Pinned source tree",
        `${repository}/tree/${revision}`,
      ),
    ]),
    paragraph([
      text(
        "原始导入包包含 30 份归档 Markdown、115 个 excluded keys：66 份原始 Markdown 缺失的文档、46 个 pending/excluded 游戏候选、3 个缺少 editorial/showcase 附件的路径。历史排除原因保持原样；HTML 正文重建不改变原始 missing/excluded 状态。候选不是已验证游戏，来源中的许可、资产限制、未试玩和证据边界仍然适用。",
      ),
    ]),
    heading("30 份原始 Markdown / Archived originals"),
  ];
  const navigation = [
    {
      title: "远端归档 Markdown / Archived originals",
      description:
        "Complete archived Markdown with original-byte provenance and adapted links.",
      pages: [],
    },
    {
      title: "远端页面重建 / Rendered-page reconstructions",
      description:
        "Reconstructed rendered prose, not recovered original Markdown; historical missing/excluded states retained.",
      pages: [],
    },
  ];
  const provenanceNodes = (record) => [
    heading("来源与转换 / Provenance"),
    paragraph([
      link(
        record.kind === "archived-markdown"
          ? "固定版本原始 Markdown"
          : "固定版本静态 HTML（不是原始 Markdown）",
        pinned(record.source_path),
      ),
    ]),
    code(record),
    paragraph([
      text(
        "转换规则：相对文档链接重定向至 remote/；其他存在的资源链接至固定版本源码；不存在的目标保留为 source-only 文本。未执行 HTML、远端脚本或候选代码；原始许可与试玩/证据限制不因收录改变。详细逐链接转换见 Git-owned docs/remote/provenance.json。",
      ),
    ]),
  ];
  for (const d of originals) {
    const bytes = await archived(d.source_path);
    assert.equal(sha256(bytes), d.sha256);
    const transformations = [];
    const rewrite = linkRewriter({
      source: d.source_path,
      slug: d.slug,
      documents,
      files,
      transformations,
      databaseDocuments,
    });
    const source = bytes.toString("utf8");
    assertMarkdownSafety(source, d.source_path);
    const title = source.match(/^#\s+(.+)$/m)?.[1] || d.source_path;
    const record = {
      kind: "archived-markdown",
      slug: d.slug,
      source_path: d.source_path,
      source_sha256: sha256(bytes),
      source_bytes: bytes.length,
      original_snapshot: `docs/remote/_originals/${d.source_path}.txt`,
      candidate: candidates.documents.find(
        (doc) => doc.source_path === d.source_path,
      ),
    };
    outputs.set(record.original_snapshot, bytes);
    outputs.set(
      `docs/${d.slug}.md`,
      markdown([
        heading(title, 1),
        paragraph([
          text(
            "归档原始 Markdown 的完整正文 / Archived Markdown, with adapted links. 原始字节快照与 SHA-256 记录在文末；不是新的审核结论。",
          ),
        ]),
        ...rewriteMarkdown(source, rewrite),
        ...provenanceNodes(record),
      ]),
    );
    indexNodes.push(
      paragraph([
        link(d.source_path, `/docs/${d.slug}/`),
        text(` — 原始 Markdown；SHA-256 ${record.source_sha256}；`),
        link("固定版本来源", pinned(d.source_path)),
      ]),
    );
    provenance.documents.push({ ...record, transformations });
    navigation[0].pages.push([d.slug, title]);
  }
  indexNodes.push(heading("115 个历史排除项 / All excluded keys"));
  let recovered = 0;
  const details = [];
  for (const [i, e] of candidates.excluded.entries()) {
    const anchor = `excluded-${i + 1}`;
    const row = [text(`${e.key} — `)];
    if (e.key.startsWith("document:")) {
      const slug = e.key.slice(9);
      const doc = manifest.find((d) => d.slug === slug);
      const sourcePath = `docs/${slug}/index.html`;
      const bytes = gitBytes(sourcePath);
      const transformations = [];
      const record = {
        kind: "rendered-page-reconstruction",
        slug: `remote/${slug}`,
        source_path: sourcePath,
        source_sha256: sha256(bytes),
        source_bytes: bytes.length,
        original_markdown: "missing",
        historical_exclusion: e,
        original_manifest: doc,
      };
      try {
        const check = reconstructHTML(bytes.toString("utf8"), slug);
        assert.equal(
          check.recoveredText,
          check.sourceText,
          "Visible body text coverage mismatch",
        );
        const body = reconstructHTML(
          bytes.toString("utf8"),
          slug,
          linkRewriter({
            source: doc.source,
            slug: record.slug,
            documents,
            files,
            transformations,
            databaseDocuments,
          }),
        );
        record.visible_text_sha256 = sha256(check.sourceText);
        record.visible_text_characters = check.sourceText.length;
        record.anchors = check.anchors;
        record.source_language = check.lang;
        outputs.set(
          `docs/${record.slug}.md`,
          markdown([
            heading(body.title, 1),
            paragraph([
              text(
                "渲染页面重建 / Rendered-page reconstruction — 不是原始 Markdown。原始 Markdown 在固定版本静态仓库中缺失；历史 excluded 状态与原因保留。仅重建静态 HTML 的完整可见正文，不代表新的内容审核或试玩。",
              ),
            ]),
            ...body.nodes,
            ...provenanceNodes(record),
          ]),
        );
        recovered++;
        navigation[1].pages.push([record.slug, body.title]);
        row.push(
          link("完整重建正文（原始 Markdown 缺失）", `/docs/${record.slug}/`),
        );
      } catch (error) {
        record.recovery_error = error.message;
        outputs.set(
          `docs/${record.slug}.md`,
          markdown([
            heading(`${doc.title} — source-only`, 1),
            paragraph([
              text(
                "原始 Markdown 缺失；静态页面未通过完整正文重建检查。此页仅为来源详情，不是恢复的正文。",
              ),
            ]),
            ...provenanceNodes(record),
          ]),
        );
        row.push(link("source-only / 正文无法安全重建", `#${anchor}`));
        details.push(
          { type: "html", value: `<a id="${anchor}"></a>` },
          heading(e.key),
          paragraph([text(`未发布重建正文：${error.message}`)]),
          code(record),
        );
      }
      row.push(
        text("；"),
        link("固定版本 HTML", pinned(sourcePath)),
        text(`；历史原因：${e.reason}`),
      );
      provenance.documents.push({ ...record, transformations });
    } else {
      row.push(
        link("source-only / 原始状态与完整 payload", `#${anchor}`),
        text(`；${e.reason}；`),
        link("固定版本来源", pinned(e.source_ref)),
      );
      details.push(
        { type: "html", value: `<a id="${anchor}"></a>` },
        heading(e.key),
        code(e),
      );
      if (e.key.startsWith("threejs-game:")) {
        const candidate = gameCandidates.find(
          (g) => `threejs-game:${g.id}` === e.key,
        );
        assert.ok(candidate, `Missing game candidate: ${e.key}`);
        details.push(
          paragraph([
            text(
              `原始状态：${candidate.status}。仅展示候选来源，不是已审核/已试玩游戏；所有字段如下。`,
            ),
          ]),
          code(candidate),
        );
      } else {
        assert.ok(e.key.startsWith("path:"));
        const path = pathData.paths.find((p) => p.key === e.key);
        assert.ok(path, `Missing path payload: ${e.key}`);
        details.push(
          paragraph([
            text(
              "原始状态：excluded。payload 可恢复，但必需的 editorial/showcase 附件未完整序列化；下面是原始 loader payload，不是伪造的完整 typed path。共享 steps/notes 同时原样保留。",
            ),
          ]),
          code({ path, steps: pathData.steps, notes: pathData.notes }),
        );
      }
    }
    indexNodes.push(paragraph(row));
  }
  const counts = {
    archived_markdown: originals.length,
    excluded_keys: candidates.excluded.length,
    rendered_reconstructions: recovered,
    document_source_only: excludedDocs.length - recovered,
    game_source_only: 46,
    path_source_only: 3,
    total_source_only: candidates.excluded.length - recovered,
  };
  indexNodes.splice(
    4,
    0,
    paragraph([
      text(
        `恢复结果：30 / 30 原始 Markdown；${recovered} / 66 HTML 完整正文重建；${counts.total_source_only} 个 source-only 条目（${counts.document_source_only} 文档、46 游戏候选、3 路径）。原始缺失状态与重建可用性分别记录，绝不把重建称作原始 Markdown。`,
      ),
    ]),
  );
  indexNodes.push(
    heading("Source-only 详情 / Original payloads"),
    ...details,
    heading("转换与复现 / Transformations and reproducibility"),
    ...provenance.rules.map((rule) => paragraph([text(rule)])),
    code({
      source: candidates.source,
      packet_sha256: provenance.packet_sha256,
      counts,
    }),
    paragraph([
      text(
        "使用 node scripts/recover-remote-documents.mjs --packet <只读导入包目录> --checkout <固定版本 Git checkout>；加 --check 验证生成内容未漂移。该工具不读 .env、不访问网络、不更改导入包、不发布或改变数据库。",
      ),
    ]),
  );
  // Preserve the complete inputs for the owner-only database importer, but never
  // regenerate duplicate research pages after the database migration.
  const archiveSources = [];
  const retiredPaths = [provenanceIndexPath];
  for (const record of provenance.documents.filter(
    (record) => archiveAll || databaseResearchArchive(record),
  )) {
    const path = `docs/${record.slug}.md`;
    archiveSources.push({
      ...record,
      markdown: outputs.get(path),
      original: record.original_snapshot
        ? outputs.get(record.original_snapshot)
        : gitBytes(record.source_path),
    });
    record.storage = "database";
    outputs.delete(path);
    retiredPaths.push(path);
    if (record.original_snapshot) {
      outputs.delete(record.original_snapshot);
      retiredPaths.push(record.original_snapshot);
    }
  }
  // The old unlisted source index also contains candidate/exclusion/path payloads.
  // Archive it in the database before retiring the redundant text file.
  archiveSources.push({
    kind: "import-index",
    slug: "remote/import-index",
    source_path: provenanceIndexPath,
    source_sha256: sha256(Buffer.from(markdown(indexNodes))),
    source_bytes: Buffer.byteLength(markdown(indexNodes)),
    markdown: markdown(indexNodes),
    original: Buffer.from(markdown(indexNodes)),
  });
  for (const group of navigation)
    group.pages = group.pages.filter(([slug]) => !databaseDocuments.has(slug));
  provenance.counts = counts;
  provenance.database_archives = {
    documents: archiveSources.length - 1,
    import_index: true,
    candidates: gameCandidates.length,
    exclusions: candidates.excluded.length,
    note: "Full source bytes, parsed findings and historical states are database-owned; guides remain Git-owned.",
  };
  if (archiveAll) retiredPaths.push("docs/remote/provenance.json");
  else outputs.set("docs/remote/provenance.json", json(provenance));
  for (const [path, value] of outputs)
    if (path.endsWith(".md") || path === provenanceIndexPath)
      assertMarkdownSafety(value, path);
  return {
    outputs,
    navigation: navigation.filter((g) => g.pages.length),
    counts,
    archiveSources,
    retiredPaths,
    provenance,
  };
}

export function assertResearchRetirementReceipt(receipt, sources) {
  assert.equal(receipt.format, "gamemap.research-archive-receipt");
  assert.match(receipt.batch_digest, /^[a-f0-9]{64}$/);
  for (const source of sources) {
    const stored = receipt.sources.find((item) => item.slug === source.slug);
    assert.equal(
      stored?.sha256,
      source.source_sha256,
      `Missing source receipt: ${source.slug}`,
    );
    assert.equal(
      stored?.markdown_sha256,
      sha256(Buffer.from(source.markdown)),
      `Evidence changed after import: ${source.slug}`,
    );
  }
}

export async function assertRetirableRemoteTree(output, expectedFiles) {
  let files = [];
  try {
    files = await walk(resolve(output, "docs/remote"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  for (const file of files) {
    const path = slash(relative(output, file));
    const expected = expectedFiles.get(path);
    assert.notEqual(expected, undefined, `Unarchived remote file: ${path}`);
    assert.deepEqual(
      await readFile(file),
      Buffer.from(expected),
      `Remote file changed after archival: ${path}`,
    );
  }
}

export async function writeRemoteDocuments({
  packet,
  checkout,
  output = process.cwd(),
  check = false,
}) {
  // Reproduce both immutable batches independently. The first batch's adapted
  // links and digest must not change when the remaining guide snapshots retire.
  const initial = await generateRemoteDocuments({ packet, checkout });
  const result = await generateRemoteDocuments({
    packet,
    checkout,
    archiveAll: true,
  });
  const receipt = JSON.parse(
    await readFile(
      resolve(output, "config/research-archive-receipt.json"),
      "utf8",
    ),
  );
  const remainderReceipt = JSON.parse(
    await readFile(
      resolve(output, "config/research-archive-remainder-receipt.json"),
      "utf8",
    ),
  );
  assertResearchRetirementReceipt(receipt, initial.archiveSources);
  assertResearchRetirementReceipt(
    remainderReceipt,
    result.archiveSources.filter(
      (source) =>
        source.kind !== "import-index" && !databaseResearchArchive(source),
    ),
  );
  const metadata = remainderReceipt.sources.find(
    (source) => source.slug === "remote/document-provenance",
  );
  assert.equal(
    metadata?.sha256,
    sha256(Buffer.from(initial.outputs.get("docs/remote/provenance.json"))),
    "Missing conversion metadata receipt",
  );
  // Fail before any writes if a user added or changed a file after the archived
  // snapshot was compiled. An unknown file must never disappear in recursive rm.
  const remoteDirectory = resolve(output, "docs/remote");
  await assertRetirableRemoteTree(output, initial.outputs);
  const configPath = resolve(output, "website/docs.config.json");
  const config = await readFile(configPath, "utf8");
  const groups = JSON.parse(config);
  const firstRemote = groups.findIndex((g) =>
    g.pages.some(
      ([slug]) => slug === "remote-source-index" || slug.startsWith("remote/"),
    ),
  );
  // Append only our trailing navigation groups; leave all existing formatting and names intact.
  const marker =
    firstRemote < 0
      ? config.lastIndexOf("]")
      : config.lastIndexOf(
          ",",
          config.indexOf(JSON.stringify(groups[firstRemote].title)),
        );
  const retained = config.slice(0, marker).trimEnd();
  const additions = result.navigation
    .map((g) =>
      json(g)
        .trimEnd()
        .split("\n")
        .map((line) => "  " + line)
        .join("\n"),
    )
    .join(",\n");
  result.outputs.set(
    "website/docs.config.json",
    additions ? `${retained},\n${additions}\n]\n` : `${retained}\n]\n`,
  );
  for (const [path, value] of result.outputs) {
    const target = resolve(output, path);
    if (check)
      assert.deepEqual(
        await readFile(target),
        Buffer.from(value),
        `Generated file drift: ${path}`,
      );
    else {
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, value);
    }
  }
  // Explicitly retire the former reader page and its generated raw download.
  // Database revisions and immutable source/provenance archives are untouched.
  for (const path of [
    "docs/remote-source-index.md",
    "website/public/remote-source-index.md",
    ...result.retiredPaths,
    ...result.retiredPaths
      .filter((path) => path.endsWith(".md"))
      .map((path) => `website/public/${path.slice(5)}`),
  ]) {
    const target = resolve(output, path);
    if (check) await assert.rejects(readFile(target), { code: "ENOENT" });
    else await rm(target, { force: true });
  }
  if (check) await assert.rejects(access(remoteDirectory), { code: "ENOENT" });
  else await rm(remoteDirectory, { recursive: true, force: true });
  return { ...result, initial };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const args = process.argv.slice(2);
  const options = {};
  while (args.length) {
    const key = args.shift();
    assert.ok(
      ["--packet", "--checkout", "--output", "--check"].includes(key),
      `Unknown option: ${key}`,
    );
    options[key.slice(2)] = key === "--check" ? true : args.shift();
  }
  assert.ok(
    options.packet && options.checkout,
    "Required: --packet <archived packet> --checkout <pinned Git checkout> [--check] [--output <isolated repo>]",
  );
  const result = await writeRemoteDocuments(options);
  console.log(json(result.counts));
}
