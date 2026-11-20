import assert from "node:assert/strict";
import { parse, parseFragment } from "parse5";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { resolve } from "node:path";
import { root, documentLinkResolver, sourceMarkdown } from "./documents.mjs";

export const attributes = (node) =>
  Object.fromEntries((node.attrs || []).map((attr) => [attr.name, attr.value]));
export const textContent = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(textContent).join("");
const normalizeText = (text) => text.replace(/\s+/g, " ").trim();
// Paths and steps remain authoring records but have no public pages or search results.
export const publicEntries = (registry) =>
  registry.entries.filter(
    (entry) => entry.kind !== "path" && entry.kind !== "step",
  );
export function elements(node, result = []) {
  if (node.tagName) result.push(node);
  for (const child of node.childNodes || []) elements(child, result);
  return result;
}
export function parsePage(html) {
  const tree = parse(html);
  return { tree, nodes: elements(tree) };
}
function visible(node, context) {
  for (let parent = node; parent; parent = parent.parentNode) {
    const attrs = attributes(parent);
    assert.ok(
      !["script", "style", "template"].includes(parent.tagName),
      `${context} cannot be serialized data or a template`,
    );
    assert.ok(
      !Object.hasOwn(attrs, "hidden") &&
        !Object.hasOwn(attrs, "inert") &&
        attrs["aria-hidden"] !== "true" &&
        !/(?:display\s*:\s*none|visibility\s*:\s*hidden)/.test(
          attrs.style || "",
        ) &&
        !(attrs.class || "")
          .split(/\s+/)
          .some((token) => ["hidden", "sr-only"].includes(token)),
      `${context} must be readable without JavaScript`,
    );
  }
}
function address(value, base, page) {
  const url = new URL(
    value,
    "https://content.test" + base + page.replace(/^\//, ""),
  );
  if (
    url.origin === "https://content.test" &&
    base !== "/" &&
    url.pathname.startsWith(base)
  )
    url.pathname = "/" + url.pathname.slice(base.length);
  return url.href;
}
function containsText(nodes, value, context) {
  assert.ok(
    normalizeText(nodes.map(textContent).join(" ")).includes(
      normalizeText(value),
    ),
    `${context}: missing visible text ${JSON.stringify(value).slice(0, 160)}`,
  );
}
function containsURL(
  nodes,
  value,
  context,
  base,
  page,
  attr = "href",
  normalize = (url) => url,
) {
  assert.ok(
    nodes.some(
      (node) =>
        attributes(node)[attr] &&
        normalize(address(attributes(node)[attr], base, page)) ===
          normalize(address(value, base, page)),
    ),
    `${context}: missing ${attr} ${value}`,
  );
}
// A game page carries the game, its entry points and its technical facts. The
// catalog's provenance label and the repeated study guidance stay in the
// manifest: every record shares those labels and the same "play it, read the
// source" steps, so they are bookkeeping rather than reader content.
const gamePageOmission = new Set(["category", "aiUse", "steps"]);
const gamePageKinds = new Set(["example", "foundation", "threejs-game"]);
const gamePageOmits = (entry, block) =>
  gamePageKinds.has(entry.kind) && gamePageOmission.has(block.field);
function factProof(fact, nodes, context, base, page) {
  containsText(nodes, fact.label, context);
  if (fact.type === "group")
    fact.items.forEach((item) => factProof(item, nodes, context, base, page));
  else if (fact.type === "link")
    containsURL(nodes, fact.url, context, base, page);
  else containsText(nodes, fact.value, context);
}
export function assertRecordFields(entry, record, base = "/") {
  visible(record, entry.key);
  const nodes = elements(record);
  for (const block of entry.blocks) {
    if (block.section === "metadata") continue; // Source-only fields remain in the manifest, not the reader interface.
    if (gamePageOmits(entry, block)) continue;
    const fields = nodes.filter(
      (node) => attributes(node)["data-content-field"] === block.field,
    );
    assert.ok(
      fields.length,
      `${entry.key}: missing rendered field ${block.field}`,
    );
    fields.forEach((field) => visible(field, `${entry.key}.${block.field}`));
    const descendants = fields.flatMap((field) => elements(field));
    const context = `${entry.key}.${block.field}`;
    switch (block.type) {
      case "title":
      case "lead":
      case "text":
        containsText(fields, block.value, context);
        break;
      case "list":
        block.items.forEach((value) => containsText(fields, value, context));
        break;
      case "links":
        for (const item of block.items) {
          containsText(fields, item.label, context);
          if (item.note) containsText(fields, item.note, context);
          containsURL(descendants, item.url, context, base, entry.url);
        }
        break;
      case "facts":
        block.items.forEach((item) =>
          factProof(item, descendants, context, base, entry.url),
        );
        break;
      case "image": {
        containsURL(descendants, block.src, context, base, entry.url, "src");
        assert.ok(
          descendants.some(
            (node) =>
              node.tagName === "img" && attributes(node).alt === block.alt,
          ),
          `${context}: preserve image alt text`,
        );
        containsText(fields, block.label, context);
        if (block.credit) containsText(fields, block.credit, context);
        if (block.source)
          containsURL(descendants, block.source, context, base, entry.url);
        for (const dimension of ["width", "height"])
          if (block[dimension])
            assert.ok(
              descendants.some(
                (node) =>
                  node.tagName === "img" &&
                  attributes(node)[dimension] === String(block[dimension]),
              ),
              `${context}: preserve ${dimension}`,
            );
        break;
      }
      case "video": {
        const videos = descendants.filter((node) => node.tagName === "video");
        containsURL(videos, block.src, context, base, entry.url, "src");
        if (block.poster)
          containsURL(videos, block.poster, context, base, entry.url, "poster");
        if (block.mobile) {
          containsURL(
            videos,
            block.mobile.src,
            context,
            base,
            entry.url,
            "src",
          );
          containsURL(
            videos,
            block.mobile.poster,
            context,
            base,
            entry.url,
            "poster",
          );
        }
        for (const video of videos) {
          assert.equal(
            attributes(video).preload,
            "none",
            `${context}: no automatic video download`,
          );
          assert.ok(
            !Object.hasOwn(attributes(video), "autoplay"),
            `${context}: no autoplay`,
          );
          assert.ok(
            Object.hasOwn(attributes(video), "controls"),
            `${context}: playback must be accessible`,
          );
        }
        break;
      }
      default:
        assert.fail(`Missing coverage proof for block type: ${block.type}`);
    }
  }
}
export async function assertRenderedCoverage(
  registry,
  readPage,
  base = "/",
  indexUrl = "/",
) {
  const cache = new Map();
  const page = async (url) => {
    const path = url.split("#")[0];
    if (!cache.has(path)) cache.set(path, parsePage(await readPage(path)));
    return cache.get(path);
  };
  const index = await page(indexUrl);
  // The retired directory is replaced by real homepage navigation links. Canonical
  // field proofs and each record's owning/discovery collection remain mandatory.
  const directories = index.nodes.filter(
    (node) => attributes(node)["data-collection-id"],
  );
  assert.equal(
    new Set(directories.map((node) => attributes(node)["data-collection-id"]))
      .size,
    directories.length,
    "Each collection must have only one primary navigation entrance",
  );
  directories.forEach((node) => {
    assert.ok(
      node.tagName === "a" && attributes(node).href,
      "A collection navigation entrance must be a native link",
    );
    visible(node, "Collection navigation entrance");
  });
  const directoryLinks = directories.flatMap((node) =>
    elements(node).flatMap((element) => {
      const href = attributes(element).href;
      return href ? [new URL(address(href, base, indexUrl))] : [];
    }),
  );
  const entries = publicEntries(registry);
  for (const entry of entries) {
    const canonical = await page(entry.url);
    const records = canonical.nodes.filter(
      (node) => attributes(node)["data-content-key"] === entry.key,
    );
    assert.equal(
      records.length,
      1,
      `${entry.key}: exactly one record must be present at ${entry.url}`,
    );
    const anchor = entry.url.split("#")[1];
    if (anchor)
      assert.ok(
        canonical.nodes.some(
          (node) => attributes(node).id === decodeURIComponent(anchor),
        ),
        `${entry.key}: missing canonical anchor ${anchor}`,
      );
    assertRecordFields(entry, records[0], base);
    const discovery = registry.collectionDiscoveryFor?.(entry) ?? {
      key: entry.key,
      url: entry.url,
      collectionUrl: entry.collectionUrl,
    };
    const ownerAddress = new URL(
      address(discovery.collectionUrl, base, indexUrl),
    );
    assert.ok(
      directoryLinks.some(
        (link) =>
          link.origin === ownerAddress.origin &&
          link.pathname !== "/" &&
          ownerAddress.pathname.startsWith(link.pathname),
      ),
      `${entry.key}: missing owning collection entrance in site navigation`,
    );
    // Guides are read from the sidebar. /docs/ and /docs/zh/ open the practical
    // guide instead of repeating that list on a directory page.
    if (entry.kind === "document") continue;
    const collection = await page(discovery.collectionUrl);
    const owners = collection.nodes.filter(
      (node) =>
        attributes(node)["data-content-ref"] === discovery.key ||
        attributes(node)["data-content-key"] === discovery.key,
    );
    assert.ok(
      owners.length,
      `${entry.key}: missing from ${discovery.collectionUrl === entry.collectionUrl ? "owning" : "discovery"} collection ${discovery.collectionUrl}`,
    );
    owners.forEach((node) =>
      visible(node, `Collection discovery ${entry.key}`),
    );
    for (const owner of owners)
      if (attributes(owner)["data-content-ref"])
        containsURL(
          elements(owner),
          discovery.url,
          `Collection discovery ${entry.key}`,
          base,
          discovery.collectionUrl,
        );
  }
  return { records: entries.length, pages: cache.size };
}
/** Compare original Markdown, not merely MDX metadata or a nonempty prose wrapper. */
export function assertMarkdownCoverage(
  metadata,
  markdown,
  html,
  documents,
  base = "/",
  options = {},
) {
  const page = parsePage(html);
  const documentElement = page.nodes.find((node) => node.tagName === "html");
  if (documentElement)
    assert.equal(
      attributes(documentElement).lang,
      options.language || (metadata.slug.startsWith("zh/") ? "zh-CN" : "en"),
      `${metadata.slug}: matching document language`,
    );
  const body = page.nodes.find((node) =>
    (attributes(node).class || "").split(/\s+/).includes("prose"),
  );
  assert.ok(body, `${metadata.slug}: missing rendered article body`);
  visible(body, metadata.slug);
  const bodyNodes = elements(body);
  const processor = unified().use(remarkParse).use(remarkGfm);
  const { body: sourceBody, frontmatter } = sourceMarkdown(markdown);
  if (frontmatter)
    containsText([body], frontmatter, `${metadata.source} frontmatter`);
  const tree = processor.parse(sourceBody);
  const rewrite = documentLinkResolver(documents, base);
  const normalizeDocumentAddress = (value) => {
    const url = new URL(value);
    // Root-relative Markdown links lose a trailing slash during path resolution.
    // Reader links may use either spelling. Only known local docs are equivalent;
    // queries, fragments, external URLs and unknown paths still compare exactly.
    const match = /^\/docs\/(.+?)\/?$/.exec(url.pathname);
    if (
      url.origin === "https://content.test" &&
      match &&
      documents.some((doc) => doc.slug === match[1])
    )
      url.pathname = `/docs/${match[1]}/`;
    return url.href;
  };
  visit(tree, (node) => {
    if (
      node.type === "text" ||
      node.type === "inlineCode" ||
      node.type === "code"
    ) {
      if (normalizeText(node.value).length > 2)
        containsText([body], node.value, `${metadata.source} ${node.type}`);
    } else if (node.type === "html") {
      const value = textContent(parseFragment(node.value));
      if (normalizeText(value).length > 2)
        containsText([body], value, metadata.source);
    } else if (node.type === "link" || node.type === "definition")
      containsURL(
        bodyNodes,
        options.link
          ? options.link(
              rewrite(node.url, resolve(root, metadata.source)),
              node,
            )
          : rewrite(node.url, resolve(root, metadata.source)),
        metadata.source,
        base,
        "/docs/" + metadata.slug + "/",
        "href",
        normalizeDocumentAddress,
      );
    else if (node.type === "image")
      containsURL(
        bodyNodes,
        rewrite(node.url, resolve(root, metadata.source), true),
        metadata.source,
        base,
        "/docs/" + metadata.slug + "/",
        "src",
      );
  });
}
export function assertSearchCoverage(
  registry,
  index,
  blockText,
  alternateRegistry,
) {
  assert.equal(index.version, 2, "Explicit compact search format");
  const pages = new Map(
    index.documents.map((document) => [document.key, document]),
  );
  assert.equal(
    pages.size,
    index.documents.length,
    "Search identities must be unique",
  );
  const entries = publicEntries(registry);
  for (const entry of entries) {
    const document = pages.get(entry.key);
    assert.ok(document, `Search omits ${entry.key}`);
    assert.equal(
      document.kind,
      entry.kind,
      `Search kind mismatch: ${entry.key}`,
    );
    assert.equal(
      document.title,
      entry.title,
      `Search title mismatch: ${entry.key}`,
    );
    assert.equal(
      document.url,
      entry.url,
      `Search canonical URL mismatch: ${entry.key}`,
    );
    assert.ok(
      document.text.includes(entry.title),
      `Search text omits title: ${entry.key}`,
    );
    // Check the serialized export independently of the route's block selection.
    // Metadata may legitimately recur in article prose, so do not strip body text.
    const fields = [
      ...new Set(
        [
          entry.title,
          entry.description,
          ...entry.blocks
            .filter((block) => block.section !== "metadata")
            .map(blockText),
        ].filter(Boolean),
      ),
    ].join("\n");
    if (entry.kind === "document") {
      assert.ok(
        document.text === fields || document.text.startsWith(fields + "\n"),
        `Search article fields differ: ${entry.key}`,
      );
      assert.ok(
        document.text.slice(fields.length).trim(),
        `Search omits article body: ${entry.key}`,
      );
    } else {
      assert.equal(
        document.text,
        fields,
        `Search must include reader fields and exclude source-only metadata: ${entry.key}`,
      );
    }
    if (alternateRegistry) {
      const other = alternateRegistry.byKey(entry.key);
      assert.ok(other, `Search alternate language omits ${entry.key}`);
      const otherFields = [
        ...new Set(
          [
            other.title,
            other.description,
            ...other.blocks
              .filter((block) => block.section !== "metadata")
              .map(blockText),
          ].filter(Boolean),
        ),
      ].join("\n");
      assert.equal(
        document.alternateText || "",
        otherFields === fields ? "" : otherFields,
        `Search alternate reader fields must exclude source-only metadata: ${entry.key}`,
      );
    } else {
      assert.equal(
        document.alternateText,
        undefined,
        `Search alternate fields need an explicit source registry: ${entry.key}`,
      );
    }
  }
  assert.equal(
    pages.size,
    entries.length,
    "Search contains unregistered or non-public page identities",
  );
}
