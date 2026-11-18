import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";

test("namespaced reconstructed Chinese documents retain their source language without changing route identity", async () => {
  const result = await build({
    entryPoints: ["website/content/doc-language.ts"],
    bundle: true,
    write: false,
    platform: "node",
    format: "esm",
  });
  const language = await import(
    "data:text/javascript;base64," +
      Buffer.from(result.outputFiles[0].text).toString("base64")
  );
  assert.equal(language.docLocale("remote/zh/reading-guide"), "en");
  assert.equal(language.documentBodyLocale("remote/zh/reading-guide"), "zh");
  assert.equal(language.documentBodyLocale("remote-source-index"), "zh");
  assert.equal(language.documentBodyLocale("remote/practical-guide"), "en");
  assert.equal(language.documentBodyLocale("zh/practical-guide"), "zh");
  assert.equal(
    language.translationSlug("remote/zh/reading-guide", "en"),
    "remote/zh/reading-guide",
  );
});
