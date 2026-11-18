import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadContent, contentDigest } from "./lib/content.mjs";
import {
  assertRenderedCoverage,
  assertMarkdownCoverage,
  assertSearchCoverage,
} from "./lib/rendered-coverage.mjs";
import { root } from "./lib/documents.mjs";
import { checkSkillPackages } from "./lib/skill-packages.mjs";

const built = process.argv.includes("--built");
await checkSkillPackages(built);
const site = built
  ? JSON.parse(await readFile("dist/site-manifest.json", "utf8"))
  : undefined;
const context = await loadContent(site?.base || "/");
const { registry, documents, sources, contentManifest, staticPagePaths } =
  context;
const counts = Object.fromEntries(
  Object.keys(context.contentKinds).map((kind) => [
    kind,
    registry.all(kind).length,
  ]),
);
console.log(
  context.inputMode === "release"
    ? `Verified release coverage passed: ${registry.entries.length} selected records; no Git business-row fallback. ${JSON.stringify(counts)}`
    : `Source coverage passed: ${registry.entries.length} records, ${Object.keys(context.contracts).length} data modules, ${context.sourceRows} independently checked source references. ${JSON.stringify(counts)}`,
);
if (built) {
  const manifest = JSON.parse(
    await readFile("dist/content-manifest.json", "utf8"),
  );
  const expected = contentManifest(registry);
  assert.equal(
    manifest.sourceDigest,
    contentDigest({ sources, documents }),
    "Stale source snapshot: rebuild the website",
  );
  assert.equal(
    manifest.contentDigest,
    contentDigest(expected),
    "Stale content snapshot: rebuild the website",
  );
  assert.equal(
    contentDigest(manifest.records),
    contentDigest(expected),
    "Published content manifest must include every record and presentation field",
  );
  assert.deepEqual(
    site.pages,
    staticPagePaths(registry).map((path) => path.replace(/^\//, "")),
    "Static route inventory differs from the registry",
  );
  const readPage = (path) =>
    readFile(resolve("dist", path.replace(/^\//, ""), "index.html"), "utf8");
  const result = await assertRenderedCoverage(registry, readPage, site.base);
  for (const metadata of documents)
    await assertMarkdownCoverage(
      metadata,
      await readFile(resolve(root, metadata.source), "utf8"),
      await readPage("/docs/" + metadata.slug + "/"),
      documents,
      site.base,
      metadata.slug.startsWith("zh/")
        ? {
            link: (url, node) => {
              const text = (value) =>
                value.value || (value.children || []).map(text).join("");
              return context.isEnglishSourceLabel(text(node))
                ? url
                : context.localizedPath(
                    url,
                    "zh",
                    context.documentLanguages(documents),
                  );
            },
          }
        : {},
    );
  assertSearchCoverage(
    registry,
    JSON.parse(await readFile("dist/search-index.json", "utf8")),
    context.blockText,
    context.localizedRegistry(registry, "zh"),
  );
  console.log(
    `Rendered coverage passed: ${result.records} canonical records with field-level proofs, owning collections, collection-directory entrances, ${documents.length} full Markdown bodies, static search, and matching source digests.`,
  );
}
