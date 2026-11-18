import test from "node:test";
import assert from "node:assert/strict";
import { assertHistoricalDocumentEvidence, historicalDocumentEvidence } from "../../scripts/lib/remote-document-evidence.mjs";
const url = historicalDocumentEvidence.urls[0];
const document = (key, href = url, content = "游玩作者发布的浏览器版本") => `<article data-content-key="document:${key}"><div class="prose"><a href="${href}">${content}</a></div></article>`;
test("complete Chinese counterparts retain the same pinned historical evidence URLs", () => {
  for (const prefix of ["", "zh/"])
    assert.doesNotThrow(() => assertHistoricalDocumentEvidence(document("zh/tutorials-and-demos"), `${prefix}docs/zh/tutorials-and-demos/`));
  assert.doesNotThrow(() => assertHistoricalDocumentEvidence(document("tutorials-and-demos"), "docs/tutorials-and-demos/"));
});
test("translated routes do not widen exceptions to unrelated paths, URLs, chrome or raw text", () => {
  assert.throws(() => assertHistoricalDocumentEvidence(document("zh/other"), "docs/zh/other/"));
  assert.throws(() => assertHistoricalDocumentEvidence(document("tutorials-and-demos"), "docs/zh/tutorials-and-demos/"));
  assert.throws(() => assertHistoricalDocumentEvidence(document("zh/tutorials-and-demos", url + "?unapproved=1"), "docs/zh/tutorials-and-demos/"));
  assert.throws(() => assertHistoricalDocumentEvidence(document("zh/tutorials-and-demos", "https://unapproved.chatgpt.site/"), "docs/zh/tutorials-and-demos/"));
  assert.throws(() => assertHistoricalDocumentEvidence(`<nav>${document("zh/tutorials-and-demos")}</nav>`, "docs/zh/tutorials-and-demos/"));
  assert.throws(() => assertHistoricalDocumentEvidence(document("zh/tutorials-and-demos", url, url), "docs/zh/tutorials-and-demos/"));
});
