import assert from "node:assert/strict";
import { parse } from "parse5";

// These two creator-hosted evidence URLs occur in the pinned rendered prose, not
// GameMap navigation or hosting configuration. Keep the exception source-specific.
export const historicalDocumentEvidence = {
  revision: "a2fe9a8e1d7b05008e11db1586d308c0086f7d91",
  urls: [
    "https://fruit-ninja-dojo-20260905.yongqixue666.chatgpt.site/",
    "https://mosswing-quiet-flight.jack-514.chatgpt.site/",
  ],
  structuredSource: {
    path: "data/examples.data",
    sha256: "0ff715e073625693101bed7e8e5e51019d964afe0fd65ef5fba339af4ba3fd64",
    records: {
      "example:fruit-ninja-dojo-astra":
        "https://fruit-ninja-dojo-20260905.yongqixue666.chatgpt.site/",
      "example:mosswing-astra":
        "https://mosswing-quiet-flight.jack-514.chatgpt.site/",
    },
    generatedDocuments: ["tutorials-and-demos"],
  },
  documents: {
    "remote/community-case-research": {
      source: "docs/community-case-research/index.html",
      sha256:
        "89c609d61ffcd3e546bea937f0593f302444a32f042e16349a10e48eaa0d1f7c",
      context:
        "Fruit Ninja Dojo creator/project/play table; Mosswing creator/source/browser evidence table.",
    },
    "remote/media-sources": {
      source: "docs/media-sources/index.html",
      sha256:
        "2058dd5ae6e87c3bbba483bea095b617e5226d5c765439ec3fbebda6c10e8d6f",
      context:
        "Author-hosted browser-capture source attribution for Mosswing and Fruit Ninja Dojo previews.",
    },
    "remote/tutorials-and-demos": {
      source: "docs/tutorials-and-demos/index.html",
      sha256:
        "a2826ad89b6c31975da7186487214bea2bc309c5571e36ab6ce6c698a0cf4dca",
      context:
        "Creator/project/play table and original play instructions for Fruit Ninja Dojo and Mosswing.",
    },
  },
};

function isPinnedRouterEvidence(node) {
  if (node.parentNode?.tagName !== "script" || node.parentNode.attrs?.length)
    return false;
  const prefix = "window.__reactRouterContext.streamController.enqueue(";
  const source = (node.value || "").trim();
  if (!source.startsWith(prefix) || !source.endsWith(");")) return false;
  try {
    // Accept only the framework's single JSON-string argument, never eval JS.
    const encoded = JSON.parse(source.slice(prefix.length, -2));
    if (typeof encoded !== "string" || encoded.length > 32 * 1024 * 1024)
      return false;
    const table = JSON.parse(encoded);
    if (!Array.isArray(table) || !table.includes("loaderData")) return false;
    const reference = (value) =>
      Number.isInteger(value) &&
      ((value >= 0 && value < table.length) || value === -5 || value === -7);
    return table.every((value) => {
      if (typeof value === "string")
        return (
          !/chatgpt\.site/i.test(value) ||
          historicalDocumentEvidence.urls.includes(value)
        );
      if (
        value === null ||
        typeof value === "number" ||
        typeof value === "boolean"
      )
        return true;
      if (Array.isArray(value)) return value.every(reference);
      return (
        typeof value === "object" &&
        Object.entries(value).every(
          ([key, index]) =>
            /^_\d+$/.test(key) &&
            typeof table[Number(key.slice(1))] === "string" &&
            !["__proto__", "constructor", "prototype"].includes(
              table[Number(key.slice(1))],
            ) &&
            reference(index),
        )
      );
    });
  } catch {
    return false;
  }
}

export function assertHistoricalDocumentEvidence(html, page) {
  const slug = /^(?:zh\/)?docs\/(.+)\/$/.exec(page)?.[1];
  const approved = historicalDocumentEvidence.documents[slug];
  const generated =
    historicalDocumentEvidence.structuredSource.generatedDocuments.includes(
      // Translations retain the same pinned evidence URLs, not new hosting.
      slug?.replace(/^zh\//, ""),
    );
  const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
  const hasHost = (value) => /chatgpt\.site/i.test(value || "");
  function check(node) {
    assert.ok(
      !hasHost(node.value || node.data) || isPinnedRouterEvidence(node),
      `Legacy hosting text outside an approved evidence link: ${page}`,
    );
    for (const attribute of node.attrs || []) {
      if (!hasHost(attribute.value)) continue;
      let prose = false;
      let article = false;
      let structuredEvidence = false;
      let chrome = false;
      for (let parent = node.parentNode; parent; parent = parent.parentNode) {
        if ((attr(parent, "class") || "").split(/\s+/).includes("prose"))
          prose = true;
        if (
          parent.tagName === "article" &&
          attr(parent, "data-content-key") === `document:${slug}`
        )
          article = true;
        const key =
          attr(parent, "data-content-key") || attr(parent, "data-content-ref");
        if (
          parent.tagName === "article" &&
          historicalDocumentEvidence.structuredSource.records[key] ===
            attribute.value
        )
          structuredEvidence = true;
        if (
          ["nav", "header", "footer", "script", "style"].includes(
            parent.tagName,
          )
        )
          chrome = true;
      }
      assert.ok(
        node.tagName === "a" &&
          attribute.name === "href" &&
          !chrome &&
          historicalDocumentEvidence.urls.includes(attribute.value) &&
          (((approved || generated) && prose && article) || structuredEvidence),
        `Legacy hosting URL outside approved historical document evidence: ${page}`,
      );
    }
    for (const child of node.childNodes || []) check(child);
    if (node.content) check(node.content);
  }
  check(parse(html));
}
