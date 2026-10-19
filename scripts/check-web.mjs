import assert from "node:assert/strict";
import { readFile, stat, access } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { parse } from "parse5";

const root = resolve("dist");
const site = JSON.parse(
  await readFile(resolve(root, "site-manifest.json"), "utf8"),
);
const origin = "https://static.test";
const missing = new Set();
let checked = 0;
const files = new Map();

async function targetExists(path) {
  if (files.has(path)) return files.get(path);
  let file = resolve(root, decodeURIComponent(path));
  if (file !== root && !file.startsWith(root + sep)) return false;
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = resolve(file, "index.html");
    await access(file);
    files.set(path, true);
    return true;
  } catch {
    files.set(path, false);
    return false;
  }
}
function textContent(node) {
  return node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(textContent).join(" ");
}
function elements(node, out = []) {
  if (node.tagName) out.push(node);
  for (const child of node.childNodes || []) elements(child, out);
  return out;
}

for (const path of site.pages) {
  const file = resolve(root, path, "index.html");
  const html = await readFile(file, "utf8");
  const tree = elements(parse(html));
  assert.equal(
    tree.filter((node) => node.tagName === "h1").length,
    1,
    `One clear page title: ${path || "/"}`,
  );
  assert.ok(!html.includes("chatgpt.site"), `Legacy hosting URL in ${path}`);
  if (site.docs.some(document=>path===`docs/${document.slug}/`)) {
    const body = tree.find((node) =>
      node.attrs.some(
        (attr) =>
          attr.name === "class" && attr.value.split(/\s+/).includes("prose"),
      ),
    );
    assert.ok(
      body && textContent(body).trim().length > 80,
      `Document body must be rendered into HTML, not a client-only placeholder: ${path}`,
    );
    for (let parent = body; parent; parent = parent.parentNode)
      assert.ok(
        !parent.attrs?.some((attr) => attr.name === "hidden"),
        `Article must not require a script to reveal a streamed hidden chunk: ${path}`,
      );
    const dataPath = path.replace(/\/$/, "") + ".data";
    await access(resolve(root, dataPath));
  }
  for (const node of tree) {
    const attrs = Object.fromEntries(
      node.attrs.map((attr) => [attr.name, attr.value]),
    );
    const href = ["a", "link"].includes(node.tagName)
      ? attrs.href
      : ["img", "script", "source", "video"].includes(node.tagName)
        ? attrs.src
        : undefined;
    if (
      !href ||
      href.startsWith("#") ||
      /^(?:data:|mailto:|tel:|javascript:)/i.test(href)
    )
      continue;
    const url = new URL(href, origin + site.base + path);
    if (url.origin !== origin) continue;
    checked++;
    if (!url.pathname.startsWith(site.base)) {
      missing.add(`${path || "/"} → outside base: ${href}`);
      continue;
    }
    if (!(await targetExists(url.pathname.slice(site.base.length))))
      missing.add(`${path || "/"} → missing: ${href}`);
  }
}
const search = JSON.parse(
  await readFile(resolve(root, "search-index.json"), "utf8"),
);
assert.ok(Object.keys(search).length > 0, "A static search index is required");
assert.ok(
  JSON.stringify(search).includes("/docs/practical-guide"),
  "Search must index the document content",
);
await access(resolve(root, "404.html"));
await access(resolve(root, ".nojekyll"));
const notices = await readFile(
  resolve(root, "THIRD-PARTY-NOTICES.txt"),
  "utf8",
);
assert.ok(
  notices.includes("SIL OPEN FONT LICENSE") && notices.includes("fumadocs-ui"),
  "Keep upstream font and framework license notices with the built site",
);
assert.equal(
  missing.size,
  0,
  `Broken static routes or assets:\n${[...missing].join("\n")}`,
);
console.log(
  `Static-site checks passed: ${site.pages.length} pre-rendered pages, ${site.docs.length} documents, ${checked} internal links/assets, offline search, and a real 404 page. Base: ${site.base}`,
);
