import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { loadContent } from "../../scripts/lib/content.mjs";
import { renderAwesome } from "../../scripts/lib/guides/catalog.mjs";
import {
  readDocuments,
  documentLinkResolver,
  root,
} from "../../scripts/lib/documents.mjs";
import {
  renderGeneratedDocuments,
  resolveDocumentBody,
} from "../../scripts/lib/catalog/generated-documents.mjs";
import {
  canonicalDocumentSource,
  documentGenerator,
  documentGenerators,
} from "../../scripts/lib/catalog/generated-registry.mjs";
import { siteDownloads } from "../../scripts/lib/catalog/site-files.mjs";
import { sha256 } from "../../scripts/lib/catalog/codec.mjs";

const context = await loadContent();
const documents = await readDocuments();
const generated = renderGeneratedDocuments(context.sources);
const parser = unified().use(remarkParse).use(remarkGfm);
const semanticTree = (markdown, source) => {
  const tree = parser.parse(markdown);
  visit(tree, (node) => {
    delete node.position;
    if (node.url && !/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(node.url)) {
      const [, path, suffix] = node.url.match(/^([^?#]*)(.*)$/);
      node.url = resolve(root, dirname(source), decodeURI(path)) + suffix;
    }
  });
  return tree;
};

test("the resource catalog lives in docs/reference without changing its link targets", async () => {
  for (const legacy of ["AWESOME.md", "docs/AWESOME.md"])
    await assert.rejects(access(resolve(root, legacy)), { code: "ENOENT" });
  const markdown = await readFile(
    resolve(root, "docs/reference/catalog.md"),
    "utf8",
  );
  assert.equal(
    markdown,
    renderAwesome(context.sources.resources, {
      source: "docs/reference/catalog.md",
    }),
  );
  for (const legacy of ["AWESOME.md", "docs/AWESOME.md"])
    assert.deepEqual(
      semanticTree(markdown, "docs/reference/catalog.md"),
      semanticTree(
        renderAwesome(context.sources.resources, { source: legacy }),
        legacy,
      ),
      "Moving the source must preserve every prose block and resolved link target",
    );
  const catalogs = documents.filter(
    (page) => page.slug === "reference/catalog",
  );
  assert.equal(catalogs.length, 1);
  assert.equal(catalogs[0].source, "docs/reference/catalog.md");
  assert.equal(catalogs[0].generatorKey, "resource-catalog");
  assert.equal(
    documentLinkResolver(documents)(
      "docs/reference/catalog.md",
      resolve(root, "README.md"),
    ),
    "/docs/reference/catalog/",
  );
  assert.equal(
    documentLinkResolver(documents)(
      "../reference/catalog.md",
      resolve(root, "docs/guides/practical-guide.md"),
    ),
    "/docs/reference/catalog/",
  );
  assert.equal(
    Object.values(documentGenerators).some((definition) =>
      ["AWESOME.md", "docs/AWESOME.md"].includes(definition.source),
    ),
    false,
    "Current generation must not recreate an old catalog file",
  );
});

test("historical catalog sources retain their original renderer and source hash", async () => {
  const legacyBody = renderAwesome(context.sources.resources);
  const historical = {
    ...documents.find((page) => page.slug === "reference/catalog"),
    source: "AWESOME.md",
    sourceHash: sha256(legacyBody),
  };
  assert.ok(documentGenerator(historical));
  assert.equal(
    canonicalDocumentSource(historical.source),
    "docs/reference/catalog.md",
  );
  assert.equal(
    canonicalDocumentSource("docs/AWESOME.md"),
    "docs/reference/catalog.md",
  );
  assert.equal(
    await resolveDocumentBody(historical, generated, {
      knownSources: new Set(documents.map((page) => page.source)),
      readSource: () => {
        throw new Error(
          "Historical generated bodies must not read a moved Git file",
        );
      },
    }),
    legacyBody,
  );
  assert.throws(
    () => documentGenerator({ ...historical, source: "docs/unregistered.md" }),
    /does not own/,
  );
});

test("current and historical catalog source locations produce the same public downloads", async () => {
  const bodies = Object.fromEntries(
    await Promise.all(
      documents.map(async (page) => [
        page.source,
        await readFile(resolve(root, page.source), "utf8"),
      ]),
    ),
  );
  const sources = {
    ...context.sources,
    learningPaths: [],
    learningMedia: {},
    pageCovers: {},
  };
  const current = await siteDownloads({ sources, documents }, bodies, root);
  for (const legacy of ["AWESOME.md", "docs/AWESOME.md"]) {
    const oldDocuments = documents.map((page) =>
      page.slug === "reference/catalog" ? { ...page, source: legacy } : page,
    );
    const oldBodies = {
      ...bodies,
      [legacy]: renderAwesome(context.sources.resources, { source: legacy }),
    };
    delete oldBodies["docs/reference/catalog.md"];
    const historical = await siteDownloads(
      { sources, documents: oldDocuments },
      oldBodies,
      root,
    );
    assert.deepEqual(current, historical);
  }
  assert.ok(current["awesome-list.md"].includes("](./resources.json)"));
  assert.ok(
    current["awesome-list.md"].includes("](./docs/guides/practical-guide.md)"),
  );
  for (const duplicate of ["catalog.md", "docs/reference/catalog.md"])
    assert.equal(
      current[duplicate],
      undefined,
      "The catalog keeps one raw download, awesome-list.md",
    );
});
