import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";
import { loadContent } from "./lib/content.mjs";
import { writeIfChanged } from "./lib/files.mjs";
import { root } from "./lib/documents.mjs";
import { contentDigest } from "./lib/content.mjs";
import {
  assertRenderedCoverage,
  assertSearchCoverage,
  assertMarkdownCoverage,
  parsePage,
  attributes,
} from "./lib/rendered-coverage.mjs";
const context = await loadContent(),
  { registry, canTranslate, translationHash } = context;
const translated = context.chineseContent;
const sourcePath = resolve(
  root,
  "website/content/i18n/content.zh.sources.json",
);
assert.ok(!(context.inputMode === 'release' && process.argv.includes('--approve-new')), 'Release translations are immutable; review them in Studio');
const fingerprints = context.inputMode === 'release' ? context.translationSources : JSON.parse(await readFile(sourcePath, "utf8"));
const messages = context.chineseMessages;
let fields = 0;
for (const [key, values] of Object.entries(translated)) {
  const entry = registry.byKey(key);
  assert.ok(entry, `Translation has no source record: ${key}`);
  for (const [field, value] of Object.entries(values)) {
    assert.ok(
      canTranslate(entry, field),
      `${key}.${field}: only reader text can be translated; identifiers, enum keys and source URLs must stay intact`,
    );
    assert.ok(
      (typeof value === "string" && value.trim()) ||
        (Array.isArray(value) &&
          value.length &&
          value.every((item) => typeof item === "string" && item.trim())),
      `${key}.${field}: missing translation`,
    );
    if (Array.isArray(value))
      assert.equal(
        value.length,
        entry.data[field].length,
        `${key}.${field}: preserve every source list item`,
      );
    const fingerprint = translationHash(entry.data[field]);
    if (process.argv.includes("--approve-new") && !fingerprints[key]?.[field]) {
      fingerprints[key] ??= {};
      fingerprints[key][field] = fingerprint;
    }
    assert.equal(
      fingerprints[key]?.[field],
      fingerprint,
      `${key}.${field}: review the changed English source before updating its translation fingerprint`,
    );
    fields++;
  }
}
if (process.argv.includes("--approve-new"))
  await writeIfChanged(
    sourcePath,
    JSON.stringify(fingerprints, null, 2) + "\n",
  );
const slots = (text) =>
  [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
for (const [key, value] of Object.entries(messages)) {
  assert.ok(
    typeof value === "string" && value.trim(),
    `Empty UI translation: ${key}`,
  );
  assert.deepEqual(
    slots(value),
    slots(key),
    `Translation placeholders changed: ${key}`,
  );
}
const taxonomy = JSON.parse(
  await readFile(resolve(root, "website/content/taxonomy.json"), "utf8"),
);
const requiredLabels = [
  ...Object.values(taxonomy.categories).flatMap((value) => [
    value.label,
    value.description,
  ]),
  ...Object.values(taxonomy.types),
  ...Object.values(taxonomy.stages).map((value) => value.label),
  ...Object.values(context.contentKinds).flatMap((value) => [
    value.label,
    value.plural,
  ]),
];
for (const label of requiredLabels)
  assert.ok(
    messages[label],
    `Missing categorical interface translation: ${label}`,
  );
const missing = new Set();
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await inspect(path);
    else if (/\.tsx?$/.test(path)) {
      const source = ts.createSourceFile(
        path,
        await readFile(path, "utf8"),
        ts.ScriptTarget.Latest,
        true,
      );
      const collect = (node) => {
        if (
          ts.isStringLiteralLike(node) &&
          node.text &&
          !Object.hasOwn(messages, node.text)
        )
          missing.add(node.text);
        else if (ts.isConditionalExpression(node)) {
          collect(node.whenTrue);
          collect(node.whenFalse);
        }
      };
      const visit = (node) => {
        if (
          ts.isCallExpression(node) &&
          node.expression.getText(source) === "t" &&
          node.arguments[0]
        )
          collect(node.arguments[0]);
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
  }
}
await inspect(resolve(root, "website/app"));
assert.equal(
  missing.size,
  0,
  `Missing Chinese interface messages: ${[...missing].join("; ")}`,
);
if (process.argv.includes("--built")) {
  const site = JSON.parse(
    await readFile(resolve(root, "dist/site-manifest.json"), "utf8"),
  );
  const manifest = JSON.parse(
    await readFile(resolve(root, "dist/content-manifest.json"), "utf8"),
  );
  assert.equal(
    manifest.localizationDigest,
    contentDigest(context.localizationSnapshot),
    "Translations changed: rebuild the site",
  );
  const zh = context.localizedRegistry(registry, "zh");
  const readPage = (path) =>
    readFile(
      resolve(
        root,
        "dist",
        path.replace(/^\//, "").split("#")[0],
        "index.html",
      ),
      "utf8",
    );
  const result = await assertRenderedCoverage(
    zh,
    readPage,
    site.base,
    "/zh/explore/",
  );
  for (const entry of zh.entries) {
    const html = await readPage(entry.url),
      page = parsePage(html),
      element = page.nodes.find((node) => node.tagName === "html");
    assert.equal(
      attributes(element).lang,
      "zh-CN",
      `${entry.url}: Chinese document language`,
    );
    if (entry.kind === "document") {
      const text = (node) =>
        node.value || (node.children || []).map(text).join("");
      await assertMarkdownCoverage(
        entry.data,
        await readFile(resolve(root, entry.data.source), "utf8"),
        html,
        context.documents,
        site.base,
        {
          language: "zh-CN",
          link: (url, node) =>
            context.isEnglishSourceLabel(text(node))
              ? url
              : context.localizedPath(
                  url,
                  "zh",
                  context.documentLanguages(context.documents),
                ),
        },
      );
    }
    if (entry.kind === "document" && !entry.id.startsWith("zh/")) {
      const body = page.nodes.find((node) =>
        attributes(node).class?.split(/\s+/).includes("prose"),
      );
      assert.equal(
        attributes(body).lang,
        "en",
        `${entry.key}: untranslated body must be marked English`,
      );
    }
  }
  assertSearchCoverage(
    zh,
    JSON.parse(
      await readFile(resolve(root, "dist/zh/search-index.json"), "utf8"),
    ),
    context.blockText,
    registry,
  );
  console.log(
    `Chinese rendered coverage passed: ${result.records} reader identities, complete discovery, localized fields, source-language markers and search.`,
  );
}
console.log(
  `Locale checks passed: ${Object.keys(messages).length} interface messages, ${Object.keys(translated).length} translated records, ${fields} source-bound text fields.`,
);
