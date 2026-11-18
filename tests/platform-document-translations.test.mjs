import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { skillPackages } from "../scripts/lib/skill-packages.mjs";
import { remarkHeading } from "fumadocs-core/mdx-plugins";
import { visit } from "unist-util-visit";
import { readDocuments, preparedMarkdown } from "../scripts/lib/documents.mjs";
import {
  isFormalDocument,
  translatedDocumentLink,
  applyTranslatedHeadingIds,
  assertDocumentTranslation,
  assertFormalDocumentTranslations,
  documentTranslationHash,
} from "../scripts/lib/document-translations.mjs";

const source = {
  slug: "guide",
  source: "docs/guide.md",
  group: "Start building",
};
const target = {
  slug: "zh/guide",
  source: "docs/zh/guide.md",
  group: "Start building",
};
const documents = [
  source,
  target,
  { slug: "overview", source: "README.md" },
  { slug: "zh/overview", source: "docs/zh/overview.md" },
  { slug: "remote/note", source: "docs/remote/note.md" },
];
const prose =
  "Completion must be checked in the running project after every modification; a saved file, a successful command or an attractive screenshot alone does not prove that the intended behavior is correct or that recovery is possible.";
const english = [
  "# A practical guide",
  "",
  "## Verify and retry",
  "",
  prose,
  "",
  "- Check the `operation_id` and [project](../README.md#sources--reuse).",
  "- Read the [archive](remote/note.md?view=source#evidence).",
  "",
  "| Artifact | Acceptance |",
  "| --- | --- |",
  "| Scene | Run the project |",
  "| Build | Try again |",
  "",
  "```sh",
  "npm run build",
  "```",
  "",
  "[API](https://example.test/API?v=2#task)",
  "",
].join("\n");
const chinese = [
  "# 实践指南",
  "",
  "## 验证与重试",
  "",
  "每次修改后都必须在运行中的项目里检查是否完成；仅仅保存文件、命令成功或截图好看，并不能证明预期行为正确，也不能证明可以恢复。",
  "",
  "- 检查 `operation_id` 和[项目](overview.md#sources--reuse)。",
  "- 阅读[归档](../remote/note.md?view=source#evidence)。",
  "",
  "| 产物 | 验收 |",
  "| --- | --- |",
  "| 场景 | 运行项目 |",
  "| 构建 | 再次尝试 |",
  "",
  "```sh",
  "npm run build",
  "```",
  "",
  "[接口](https://example.test/API?v=2#task)",
  "",
].join("\n");

test("translation fixtures rebase local counterparts, archives, assets and suffixes without touching source URLs", () => {
  assert.equal(
    translatedDocumentLink(
      "../README.md?mode=read#sources--reuse",
      source.source,
      target.source,
      documents,
    ),
    "overview.md?mode=read#sources--reuse",
  );
  assert.equal(
    translatedDocumentLink(
      "remote/note.md#evidence",
      source.source,
      target.source,
      documents,
    ),
    "../remote/note.md#evidence",
  );
  assert.equal(
    translatedDocumentLink(
      "art-originals/world.png",
      source.source,
      target.source,
      documents,
    ),
    "../art-originals/world.png",
  );
  for (const url of [
    "https://example.test/API?v=2#task",
    "//cdn.test/file",
    "/media/file.mp4",
    "#verify-and-retry",
  ])
    assert.equal(
      translatedDocumentLink(url, source.source, target.source, documents),
      url,
    );
  assert.equal(isFormalDocument(source), true);
  for (const slug of [
    "zh/guide",
    "remote/note",
    "remote/archive/docs/note",
    "remote-source-index",
  ])
    assert.equal(isFormalDocument({ slug }), false);
  assert.equal(isFormalDocument({ slug: "remote-import" }), true);
  assert.equal(
    translatedDocumentLink(
      "../website/public/skills/level-design.zip",
      "docs/level-design-skill.md",
      "docs/zh/level-design-skill.md",
      [
        {
          slug: "zh/skills/level-design/SKILL",
          source: "docs/zh/skills/level-design/SKILL.md",
        },
      ],
    ),
    "../../website/public/skills/level-design.zh.zip",
  );
});

test("translation fixtures require full sections, table rows, lists, exact code and URLs, not a summary", () => {
  const check = (markdown) =>
    assertDocumentTranslation(source, target, english, markdown, documents);
  check(chinese);
  for (const incomplete of [
    "# 实践指南\n\n这里是一份简短指南。\n",
    chinese.replace("| 构建 | 再次尝试 |\n", ""),
    chinese.replace(
      "- 阅读[归档](../remote/note.md?view=source#evidence)。\n",
      "",
    ),
    chinese.replace("npm run build", "npm run dev"),
    chinese.replace("operation_id", "operationId"),
    chinese.replace(
      "https://example.test/API?v=2#task",
      "https://example.test/API?v=3#task",
    ),
    chinese.replace(
      "overview.md#sources--reuse",
      "../../README.md#sources--reuse",
    ),
  ])
    assert.throws(() => check(incomplete));
  const copied = chinese.replace(
    "每次修改后都必须在运行中的项目里检查是否完成；仅仅保存文件、命令成功或截图好看，并不能证明预期行为正确，也不能证明可以恢复。",
    prose,
  );
  assert.throws(() => check(copied), /untranslated English prose/);
});

test("translation fixtures share source heading IDs in both languages, including duplicates and custom IDs", () => {
  const parse = (markdown) =>
    unified().use(remarkParse).use(remarkGfm).parse(preparedMarkdown(markdown));
  const original =
    "# Guide\n\n## Verify and retry\n\n## Verify and retry\n\n## Fixed ID [#accepted-id]\n";
  const translated =
    "# 指南\n\n## 验证与重试\n\n## 验证与重试\n\n## 固定标识 [#accepted-id]\n";
  const prepared = applyTranslatedHeadingIds(parse(translated), original);
  // Exercise the real prepare → serialize → MDX parse boundary.
  const tree = parse(unified().use(remarkStringify).stringify(prepared));
  unified().use(remarkHeading).runSync(tree);
  const ids = [],
    titles = [];
  visit(tree, "heading", (node) => {
    ids.push(node.data.hProperties.id);
    titles.push(node.children.map((child) => child.value).join(""));
  });
  assert.deepEqual(ids, [
    "verify-and-retry",
    "verify-and-retry-1",
    "accepted-id",
  ]);
  assert.deepEqual(titles, ["验证与重试", "验证与重试", "固定标识"]);
  assert.throws(
    () => applyTranslatedHeadingIds(parse("# 摘要\n"), original),
    /preserve every source heading/,
  );
});

test("translation fixtures reject stale sources and preserve archive exclusions", async () => {
  const pages = [source, target, documents.at(-1)];
  const fingerprints = {
    version: 1,
    locale: "zh",
    documents: {
      guide: {
        sourceHash: documentTranslationHash(english),
        translationHash: documentTranslationHash(chinese),
      },
    },
  };
  const read = async (path) => (path === source.source ? english : chinese);
  // Include link destinations for the structural proof, while limiting formal scope to the fixture guide.
  const minimalEnglish = english.replace(
    "../README.md#sources--reuse",
    "#overview",
  );
  const minimalChinese = chinese.replace(
    "overview.md#sources--reuse",
    "#overview",
  );
  fingerprints.documents.guide.sourceHash =
    documentTranslationHash(minimalEnglish);
  fingerprints.documents.guide.translationHash =
    documentTranslationHash(minimalChinese);
  const fixtureRead = async (path) =>
    path === source.source ? minimalEnglish : minimalChinese;
  assert.equal(
    await assertFormalDocumentTranslations(pages, fingerprints, fixtureRead),
    1,
  );
  await assert.rejects(
    () => assertFormalDocumentTranslations(pages, fingerprints, read),
    /English changed/,
  );
  await assert.rejects(
    () =>
      assertFormalDocumentTranslations(
        [source, documents.at(-1)],
        fingerprints,
        fixtureRead,
      ),
    /missing complete Chinese counterpart/,
  );
});

test("the Chinese level-design download includes every translated reference, template and license", async () => {
  const packages = await skillPackages();
  const english = packages.find((entry) => entry.id === "level-design");
  const chinese = packages.find((entry) => entry.id === "level-design.zh");
  assert.ok(english && chinese, "Keep both language downloads");
  assert.deepEqual(
    Object.keys(chinese.contents).sort(),
    Object.keys(english.contents).sort(),
  );
  assert.match(
    new TextDecoder().decode(chinese.contents["level-design/SKILL.md"]),
    /[\p{Script=Han}]/u,
  );
  assert.match(
    new TextDecoder().decode(chinese.contents["level-design/LICENSE.md"]),
    /CC BY-NC-SA 4\.0/,
  );
});

test("all formal documents have complete, source-bound Chinese counterparts in matching topic groups", async () => {
  const fingerprints = JSON.parse(
    await readFile(
      new URL("../website/content/i18n/docs.zh.sources.json", import.meta.url),
      "utf8",
    ),
  );
  const pages = await readDocuments();
  const count = await assertFormalDocumentTranslations(pages, fingerprints);
  for (const page of pages.filter((entry) => entry.slug.startsWith("zh/")))
    assert.match(
      page.description,
      /[\p{Script=Han}]/u,
      `${page.slug}: canonical source descriptions must also be Chinese`,
    );
  const redirects = JSON.parse(
    await readFile(
      new URL("../website/content/document-redirects.json", import.meta.url),
      "utf8",
    ),
  );
  const explicitlyRetired = Object.keys(redirects).filter((path) =>
    /^\/docs\/[^/]+\/$/.test(path),
  ).length;
  assert.ok(
    count + explicitlyRetired >= 63,
    "The complete remaining formal library is translated; only explicitly migrated catalogs leave the document inventory",
  );
});
