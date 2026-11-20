import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { remarkHeading } from "fumadocs-core/mdx-plugins";
import { visit } from "unist-util-visit";
import { root, slash, preparedMarkdown } from "./documents.mjs";
import documentRedirects from "../../website/content/document-redirects.json" with { type: "json" };

// Historical remote records retain their original language and provenance.
export const isFormalDocument = ({ slug }) =>
  !slug.startsWith("zh/") &&
  !slug.startsWith("remote/") &&
  slug !== "remote-source-index";

export const documentTranslationHash = (markdown) =>
  createHash("sha256").update(markdown).digest("hex");

const parser = unified().use(remarkParse).use(remarkGfm);
const frontmatter = (markdown) =>
  markdown.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0] || "";
const treeFor = (markdown) =>
  parser.parse(markdown.slice(frontmatter(markdown).length));
const phrasing = new Set([
  "text",
  "html",
  "inlineCode",
  "emphasis",
  "strong",
  "delete",
  "break",
  "link",
  "linkReference",
  "image",
  "imageReference",
  "footnoteReference",
]);

/** Rebase source links rather than resolving copied links from the new zh/ directory. */
export function translatedDocumentLink(url, source, target, documents) {
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(url)) return url;
  const [, path, suffix] = url.match(/^([^?#]*)(.*)$/);
  if (!path) return url;
  const absolute = resolve(root, dirname(source), decodeURI(path));
  const original = documents.find(
    (page) => resolve(root, page.source) === absolute,
  );
  const translated =
    original && documents.find((page) => page.slug === `zh/${original.slug}`);
  const retiredSlug = slash(relative(resolve(root, "docs"), absolute)).replace(
    /\.md$/,
    "",
  );
  const retired = Object.hasOwn(documentRedirects, `/docs/${retiredSlug}/`);
  // Existing translated Markdown can keep its local alias even after the catalog
  // leaves the document registry; both aliases now resolve to localized Examples.
  let destination = translated
    ? resolve(root, translated.source)
    : retired
      ? resolve(root, "docs/zh", retiredSlug.replace(/^zh\//, "") + ".md")
      : absolute;
  const archive = slash(
    relative(resolve(root, "website/public/skills"), absolute),
  );
  if (/^[^/]+\.zip$/.test(archive)) {
    const id = archive.slice(0, -4);
    if (documents.some((page) => page.slug === `zh/skills/${id}/SKILL`))
      destination = resolve(root, "website/public/skills", `${id}.zh.zip`);
  }
  return (
    encodeURI(slash(relative(resolve(root, dirname(target)), destination))) +
    suffix
  );
}

/** Use the English article's canonical heading IDs in both languages, including duplicates.
 * This keeps cross-document fragments and language switches on the same section.
 * Markers are added only to prepared copies, not to the reader-authored source.
 */
export function applyTranslatedHeadingIds(tree, englishMarkdown) {
  const original = parser.parse(preparedMarkdown(englishMarkdown));
  unified().use(remarkHeading, { generateToc: false }).runSync(original);
  const ids = [];
  visit(original, "heading", (node) => {
    ids.push(node.data.hProperties.id);
  });
  const headings = [];
  visit(tree, "heading", (node) => {
    headings.push(node);
  });
  assert.equal(
    headings.length,
    ids.length,
    "Translated article must preserve every source heading",
  );
  headings.forEach((node, index) => {
    const last = node.children.at(-1);
    if (last?.type === "text")
      last.value = last.value.replace(/\s*\[#([^]+?)]\s*$/, "");
    node.children.push({ type: "text", value: ` [#${ids[index]}]` });
  });
  return tree;
}

function structure(tree) {
  const result = [];
  visit(tree, (node) => {
    if (phrasing.has(node.type)) return;
    const item = { type: node.type };
    for (const field of [
      "depth",
      "ordered",
      "start",
      "checked",
      "identifier",
      "align",
    ])
      if (node[field] !== undefined) item[field] = node[field];
    if (["code", "inlineCode"].includes(node.type)) {
      item.value = node.value;
      if (node.type === "code") {
        item.lang = node.lang;
        item.meta = node.meta;
      }
    }
    result.push(item);
  });
  return result;
}
function links(tree) {
  const result = [];
  visit(tree, (node) => {
    if (["link", "image", "definition"].includes(node.type))
      result.push(node.url);
  });
  return result;
}
function htmlTags(tree) {
  const tags = [];
  visit(tree, "html", (node) => {
    tags.push(...(node.value.match(/<\/?[a-z][^>]*>/gi) || []));
  });
  return tags;
}
const visibleProse = (node) =>
  ["code", "inlineCode", "html"].includes(node.type)
    ? ""
    : node.type === "text"
      ? node.value
      : (node.children || []).map(visibleProse).join("");
function inlineMarks(node) {
  const marks = [];
  visit(node, (child) => {
    if (!phrasing.has(child.type) || ["text", "html"].includes(child.type))
      return;
    const mark = { type: child.type };
    if (child.type === "inlineCode") mark.value = child.value;
    if (child.identifier !== undefined) mark.identifier = child.identifier;
    marks.push(JSON.stringify(mark));
  });
  // Chinese grammar can reorder inline phrases within the same paragraph/cell.
  return marks.sort();
}
function proseUnits(tree) {
  const units = [];
  visit(tree, (node) => {
    if (["paragraph", "heading", "tableCell"].includes(node.type))
      units.push({
        node,
        text: visibleProse(node).replace(/\s+/g, " ").trim(),
      });
  });
  return units;
}

/** Independent source/translation proof: a short summary or copied English cannot pass. */
export function assertDocumentTranslation(
  source,
  target,
  english,
  chinese,
  documents,
) {
  const context = `${source.slug} → ${target.slug}`;
  assert.equal(
    frontmatter(chinese),
    frontmatter(english),
    `${context}: retain package metadata`,
  );
  const original = treeFor(english),
    translated = treeFor(chinese);
  assert.deepEqual(
    structure(translated),
    structure(original),
    `${context}: preserve every section, paragraph, list item, table cell, code sample and inline identifier`,
  );
  assert.deepEqual(
    links(translated).sort(),
    links(original)
      .map((url) =>
        translatedDocumentLink(url, source.source, target.source, documents),
      )
      .sort(),
    `${context}: preserve every source URL, fragment and local target in the translated reading path`,
  );
  assert.deepEqual(
    htmlTags(translated),
    htmlTags(original),
    `${context}: retain source HTML and attributes`,
  );
  const htmlCode = (markdown) =>
    [...markdown.matchAll(/<code>([\s\S]*?)<\/code>/g)].map(
      (match) => match[1],
    );
  assert.deepEqual(
    htmlCode(chinese),
    htmlCode(english),
    `${context}: retain HTML code identifiers`,
  );
  assert.match(
    chinese,
    /[\p{Script=Han}]/u,
    `${context}: missing Chinese prose`,
  );
  const sourceUnits = proseUnits(original),
    targetUnits = proseUnits(translated);
  for (let index = 0; index < sourceUnits.length; index++) {
    const unit = sourceUnits[index],
      translatedUnit = targetUnits[index];
    assert.deepEqual(
      inlineMarks(translatedUnit.node),
      inlineMarks(unit.node),
      `${context}: preserve inline identifiers, references and emphasis in prose unit ${index + 1}`,
    );
    assert.deepEqual(
      links(translatedUnit.node).sort(),
      links(unit.node)
        .map((url) =>
          translatedDocumentLink(url, source.source, target.source, documents),
        )
        .sort(),
      `${context}: preserve link targets in prose unit ${index + 1}`,
    );
    // A publication/product name may stay in English; explanatory sentences may not.
    const linkOnly = unit.node.children?.every(
      (child) =>
        child.type === "link" ||
        (child.type === "text" && !/[a-z]/i.test(child.value)),
    );
    if (
      !linkOnly &&
      unit.text.length >= 160 &&
      (unit.text.match(/[a-z]+/gi) || []).length >= 20 &&
      !/[\p{Script=Han}]/u.test(unit.text)
    )
      assert.notEqual(
        targetUnits[index]?.text,
        unit.text,
        `${context}: untranslated English prose: ${unit.text.slice(0, 160)}`,
      );
  }
}

export async function assertFormalDocumentTranslations(
  documents,
  fingerprints,
  read = (path) => readFile(resolve(root, path), "utf8"),
) {
  const originals = documents.filter(isFormalDocument);
  assert.equal(
    fingerprints.version,
    1,
    "Document translation fingerprint format",
  );
  assert.equal(
    fingerprints.locale,
    "zh",
    "Document translation fingerprint locale",
  );
  assert.deepEqual(
    Object.keys(fingerprints.documents).sort(),
    originals.map((page) => page.slug).sort(),
    "Every formal document needs a reviewed translation; remote archives are excluded",
  );
  for (const source of originals) {
    const target = documents.find((page) => page.slug === `zh/${source.slug}`);
    assert.ok(target, `${source.slug}: missing complete Chinese counterpart`);
    assert.equal(
      target.group,
      source.group,
      `${source.slug}: both languages must appear in the same topic group`,
    );
    const english = await read(source.source),
      chinese = await read(target.source);
    const expected = fingerprints.documents[source.slug];
    assert.equal(
      expected.sourceHash,
      documentTranslationHash(english),
      `${source.slug}: English changed; review the full Chinese translation before approving a new fingerprint`,
    );
    assert.equal(
      expected.translationHash,
      documentTranslationHash(chinese),
      `${target.slug}: translation changed; review completeness before approving a new fingerprint`,
    );
    assertDocumentTranslation(source, target, english, chinese, documents);
  }
  for (const target of documents.filter((page) => page.slug.startsWith("zh/")))
    assert.ok(
      originals.some((page) => page.slug === target.slug.slice(3)),
      `${target.slug}: Chinese-only formal document needs an English counterpart`,
    );
  return originals.length;
}
