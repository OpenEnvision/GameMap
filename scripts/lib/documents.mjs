import { readFile, readdir } from "node:fs/promises";
import { resolve, relative, sep, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { parseFragment } from "parse5";

export const root = fileURLToPath(new URL("../../", import.meta.url));
// Raw HTML is source content too. Review new tags/attributes rather than dropping or executing them.
const sourceHTML = {
  a: ["id"],
  br: [],
  code: [],
  details: ["open"],
  summary: [],
};
export function assertDocumentHTML(value, source) {
  const inspect = (node) => {
    if (node.tagName) {
      if (!Object.hasOwn(sourceHTML, node.tagName))
        throw new Error(
          `${source}: undeclared source HTML tag <${node.tagName}>`,
        );
      for (const attr of node.attrs || [])
        if (!sourceHTML[node.tagName].includes(attr.name))
          throw new Error(
            `${source}: undeclared source HTML attribute ${node.tagName}.${attr.name}`,
          );
    }
    for (const child of node.childNodes || []) inspect(child);
  };
  inspect(parseFragment(value));
}
export const slash = (value) => value.split(sep).join("/");
export async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) =>
        entry.isDirectory()
          ? walk(resolve(directory, entry.name))
          : [resolve(directory, entry.name)],
      ),
  );
  return files.flat();
}
/** Discover Markdown recursively. Configuration labels it; configuration cannot hide it. */
export async function readDocuments() {
  const groups = JSON.parse(
    await readFile(resolve(root, "website/docs.config.json"), "utf8"),
  );
  const files = (await walk(resolve(root, "docs")))
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      slug: slash(relative(resolve(root, "docs"), file)).slice(0, -3),
    }));
  const rootSlugs = {
    "README.md": "overview",
    "AWESOME.md": "catalog",
    "CONTRIBUTING.md": "contributing",
  };
  for (const filename of (await readdir(root))
    .filter((filename) => filename.endsWith(".md"))
    .sort())
    files.push({
      file: resolve(root, filename),
      slug: rootSlugs[filename] || filename.slice(0, -3).toLowerCase(),
    });
  const known = new Set(files.map((item) => item.slug));
  if (known.size !== files.length) throw new Error("Document slug collision");
  const configured = new Set();
  for (const group of groups)
    for (const [slug] of group.pages) {
      if (!known.has(slug))
        throw new Error(
          `Document configuration references a missing source: ${slug}`,
        );
      if (configured.has(slug))
        throw new Error(`Document appears in two navigation groups: ${slug}`);
      configured.add(slug);
    }
  const documents = await Promise.all(
    files.map(async ({ file, slug }) => {
      const markdown = await readFile(file, "utf8");
      const title =
        markdown.match(/^#\s+(.+)$/m)?.[1].replace(/`/g, "") || slug;
      const group = groups.find((group) =>
        group.pages.some(([id]) => id === slug),
      );
      return {
        slug,
        title,
        label: group?.pages.find(([id]) => id === slug)?.[1] || title,
        description:
          group?.description ||
          "Curated source notes and practical guidance from GameMap.",
        group: group?.title || "More notes",
        source: slash(relative(root, file)),
        sourceHash: createHash("sha256").update(markdown).digest("hex"),
      };
    }),
  );
  const order = new Map(
    groups
      .flatMap((group) => group.pages)
      .map(([slug], index) => [slug, index]),
  );
  return documents.sort(
    (a, b) =>
      (order.get(a.slug) ?? Infinity) - (order.get(b.slug) ?? Infinity) ||
      a.slug.localeCompare(b.slug),
  );
}

/** One link policy for rendered documents and their independent HTML checks. */
export function documentLinkResolver(documents, assetBase = "/") {
  return (url, sourceFile, image = false) => {
    if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return url;
    const [, path, suffix] = url.match(/^([^?#]*)(.*)$/);
    const absolute = path.startsWith("/")
      ? resolve(root, "website/public", decodeURI(path).slice(1))
      : resolve(dirname(sourceFile), decodeURI(path));
    if (extname(absolute).toLowerCase() === ".md") {
      const document = documents.find(
        (page) => resolve(root, page.source) === absolute,
      );
      if (!document)
        throw new Error(`Unregistered Markdown link in ${sourceFile}: ${url}`);
      return "/docs/" + document.slug + "/" + suffix;
    }
    const publicPath = slash(
      relative(resolve(root, "website/public"), absolute),
    );
    if (!publicPath.startsWith("..")) return assetBase + publicPath + suffix;
    const docPath = slash(relative(resolve(root, "docs"), absolute));
    if (!docPath.startsWith("..") && image)
      return assetBase + "docs-assets/" + docPath + suffix;
    if (absolute === resolve(root, "data/resources.json"))
      return assetBase + "resources.json" + suffix;
    return url;
  };
}
