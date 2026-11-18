import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { build } from "esbuild";
import {
  readDocuments,
  documentLinkResolver,
} from "../../scripts/lib/documents.mjs";
import { loadContent } from "../../scripts/lib/content.mjs";

const redirects = JSON.parse(
  await readFile("website/content/document-redirects.json", "utf8"),
);
const result = await build({
  entryPoints: ["website/content/site.ts"],
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
});
const { retiredDocumentTarget } = await import(
  "data:text/javascript;base64," +
    Buffer.from(result.outputFiles[0].text).toString("base64")
);

test("retired game catalogs leave the document inventory but retain explicit bilingual redirect routes", async () => {
  const docs = await readDocuments();
  for (const slug of [
    "tutorials-and-demos",
    "coding-agent-game-code",
    "cadle-repositories",
  ]) {
    assert.ok(!docs.some((x) => x.slug === slug || x.slug === "zh/" + slug));
    assert.equal(retiredDocumentTarget("/docs/" + slug + "/"), "/examples/");
    assert.equal(retiredDocumentTarget("/docs/zh/" + slug), "/zh/examples/");
    assert.equal(
      retiredDocumentTarget("/zh/docs/" + slug + "/"),
      "/zh/examples/",
    );
    assert.equal(
      retiredDocumentTarget("/preview/docs/zh/" + slug + "/", "/preview/"),
      "/preview/zh/examples/",
    );
  }
  assert.equal(retiredDocumentTarget("/docs/practical-guide/"), null);
  assert.equal(Object.keys(redirects).length, 12);
});

test("existing Markdown references resolve directly to Examples without reviving retired documents", async () => {
  const resolve = documentLinkResolver(await readDocuments());
  assert.equal(
    resolve("tutorials-and-demos.md", "docs/practical-guide.md"),
    "/examples/",
  );
  assert.equal(
    resolve("../coding-agent-game-code.md", "docs/zh/practical-guide.md"),
    "/zh/examples/",
  );
  assert.equal(
    resolve("coding-agent-game-code.md", "docs/zh/practical-guide.md"),
    "/zh/examples/",
  );
});

test("all engine foundations keep their existing identity and canonical Examples detail route", async () => {
  const context = await loadContent();
  const foundations = context.registry.all("foundation");
  assert.equal(foundations.length, 3);
  for (const entry of foundations) {
    assert.equal(entry.data.category, "foundation");
    assert.equal(entry.url, "/examples/" + entry.id + "/");
    assert.equal(
      context.registry.all("example").filter((x) => x.id === entry.id).length,
      0,
    );
  }
  const paths = context.staticPagePaths(context.registry);
  for (const path of Object.keys(redirects)) assert.ok(paths.includes(path));
});
