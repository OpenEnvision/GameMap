import { readFile, readdir } from "node:fs/promises";
import { resolve, relative, sep, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { parseFragment } from "parse5";
import { execFileSync } from 'node:child_process';
import { publicAssetPath } from './assets.mjs';
import { generatedRootPaths } from './root-static.mjs';

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
export function sourceMarkdown(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  const body = (match ? markdown.slice(match[0].length) : markdown).replace(/^\s*#\s+[^\n]+\r?\n/, '');
  return { body, frontmatter: match?.[1] };
}
export function preparedMarkdown(markdown) {
  const { body, frontmatter } = sourceMarkdown(markdown);
  return frontmatter ? `${body.trimEnd()}\n\n<details>\n<summary>Package metadata</summary>\n\n\`\`\`yaml\n${frontmatter}\n\`\`\`\n\n</details>\n` : body;
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
export function publicSourcePaths() {
  try { return new Set(execFileSync('git',['ls-files','-z','--cached','--others','--exclude-standard','--','docs',':(top,glob)*.md'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).split('\0').filter(Boolean)); }
  catch { return undefined; } // Source archives without .git still build; hidden paths remain excluded.
}
export function publishablePath(path, visible) { return !path.split('/').some(part=>part.startsWith('.')) && (!visible || visible.has(path)); }
/** Discover public Markdown recursively; ignored local notes must not become published content. */
export async function readDocuments() {
  const groups = JSON.parse(
    await readFile(resolve(root, "website/docs.config.json"), "utf8"),
  );
  const descriptions = JSON.parse(
    await readFile(resolve(root, "website/docs.descriptions.json"), "utf8"),
  );
  const visible = publicSourcePaths();
  const files = (await walk(resolve(root, "docs")))
    .filter(file => file.endsWith('.md') && publishablePath(slash(relative(root,file)),visible))
    .map((file) => ({
      file,
      slug: slash(relative(resolve(root, "docs"), file)).slice(0, -3),
    }));
  const rootSlugs = {
    "README.md": "overview",
    "AWESOME.md": "catalog",
    "CONTRIBUTING.md": "contributing",
  };
  // Root publication downloads are built artifacts, not additional source
  // articles. Keep the canonical repository documents even when the export
  // manifest records them as source-preserved files.
  const generated = await generatedRootPaths();
  for (const filename of (await readdir(root))
    .filter(filename => filename.endsWith('.md') && publishablePath(filename,visible) && (Object.hasOwn(rootSlugs,filename) || !generated.has(filename)))
    .sort())
    files.push({
      file: resolve(root, filename),
      slug: rootSlugs[filename] || filename.slice(0, -3).toLowerCase(),
    });
  const known = new Set(files.map((item) => item.slug));
  if (known.size !== files.length) throw new Error("Document slug collision");
  for (const slug of Object.keys(descriptions))
    if (!known.has(slug))
      throw new Error(`Document summary references a missing source: ${slug}`);
  for (const slug of known)
    if (typeof descriptions[slug] !== "string" || !descriptions[slug].trim())
      throw new Error(`Document needs an article-specific summary: ${slug}`);
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
        description: descriptions[slug].trim(),
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
      return assetBase + publicAssetPath("docs/" + docPath) + suffix;
    if (absolute === resolve(root, "data/resources.json"))
      return assetBase + "resources.json" + suffix;
    if (absolute === resolve(root, "data/papers.json"))
      return assetBase + "papers.json" + suffix;
    return url;
  };
}
