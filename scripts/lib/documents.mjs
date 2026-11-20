import { readFile, readdir } from "node:fs/promises";
import { resolve, relative, sep, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { parseFragment } from "parse5";
import { execFileSync } from "node:child_process";
import { documentOrigin } from "./catalog/generated-registry.mjs";
import documentRedirects from "../../website/content/document-redirects.json" with { type: "json" };

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
  const body = (match ? markdown.slice(match[0].length) : markdown).replace(
    /^\s*#\s+[^\n]+\r?\n/,
    "",
  );
  return { body, frontmatter: match?.[1] };
}
export function preparedMarkdown(markdown, metadataLabel = "Package metadata") {
  const { body, frontmatter } = sourceMarkdown(markdown);
  return frontmatter
    ? `${body.trimEnd()}\n\n<details>\n<summary>${metadataLabel}</summary>\n\n\`\`\`yaml\n${frontmatter}\n\`\`\`\n\n</details>\n`
    : body;
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
  try {
    return new Set(
      execFileSync(
        "git",
        [
          "ls-files",
          "-z",
          "--cached",
          "--others",
          "--exclude-standard",
          "--",
          "docs",
          ":(top,glob)*.md",
        ],
        { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
      )
        .split("\0")
        .filter(Boolean),
    );
  } catch {
    return undefined;
  } // Source archives without .git still build; hidden paths remain excluded.
}
export function publishablePath(path, visible) {
  return (
    !path.split("/").some((part) => part.startsWith(".")) &&
    (!visible || visible.has(path))
  );
}
// Folder indexes for repository readers. The website has its own documentation home.
const repositoryIndexes = new Set(["docs/README.md", "docs/zh/README.md"]);
/** Discover public Markdown recursively; ignored local notes must not become published content. */
export async function readDocuments() {
  const groups = JSON.parse(
    await readFile(resolve(root, "website/docs.config.json"), "utf8"),
  );
  const chinese = Object.assign(
    {},
    ...(await Promise.all(
      ["docs.zh.json", "zh.json"].map(async (name) =>
        JSON.parse(
          await readFile(resolve(root, "website/content/i18n", name), "utf8"),
        ),
      ),
    )),
  );
  const visible = publicSourcePaths();
  const files = (await walk(resolve(root, "docs")))
    .filter(
      (file) =>
        file.endsWith(".md") &&
        publishablePath(slash(relative(root, file)), visible) &&
        !repositoryIndexes.has(slash(relative(root, file))) &&
        !Object.hasOwn(
          documentRedirects,
          `/docs/${slash(relative(resolve(root, "docs"), file)).slice(0, -3)}/`,
        ),
    )
    .map((file) => ({
      file,
      slug: slash(relative(resolve(root, "docs"), file)).slice(0, -3),
    }));
  const rootSlugs = {
    "README.md": "overview",
    "CONTRIBUTING.md": "contributing",
  };
  for (const filename of (await readdir(root))
    .filter(
      (filename) =>
        filename.endsWith(".md") && publishablePath(filename, visible),
    )
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
      const originalSlug = slug.replace(/^zh\//, "");
      // A complete translation shares its source's topic and navigation label.
      // Keep one navigation definition instead of a separate, abridged Chinese library.
      const group =
        groups.find((group) => group.pages.some(([id]) => id === slug)) ||
        groups.find((group) => group.pages.some(([id]) => id === originalSlug));
      const label =
        group?.pages.find(([id]) => id === slug)?.[1] ||
        group?.pages.find(([id]) => id === originalSlug)?.[1] ||
        title;
      const description =
        group?.description ||
        "Curated source notes and practical guidance from GameMap.";
      // zh/ records are native Chinese sources, including their canonical metadata.
      // Otherwise the English registry expects English descriptions on Chinese pages.
      const localize = (value) =>
        slug.startsWith("zh/") ? chinese[value] || value : value;
      return {
        slug,
        title,
        label: localize(label),
        description: localize(description),
        group: group?.title || "More notes",
        source: slash(relative(root, file)),
        ...documentOrigin(slash(relative(root, file))),
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
      (order.get(a.slug.replace(/^zh\//, "")) ?? Infinity) -
        (order.get(b.slug.replace(/^zh\//, "")) ?? Infinity) ||
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
      const slug = slash(relative(resolve(root, "docs"), absolute)).slice(
        0,
        -3,
      );
      const redirect = documentRedirects[`/docs/${slug}/`];
      if (redirect) {
        const chineseSource = slash(
          relative(root, resolve(root, sourceFile)),
        ).startsWith("docs/zh/");
        // Moved documents redirect to their own localized path; retired catalogs
        // redirect to a site page whose Chinese version lives under /zh/.
        return (
          (chineseSource &&
          !redirect.startsWith("/zh/") &&
          !redirect.startsWith("/docs/")
            ? "/zh" + redirect
            : redirect) + suffix
        );
      }
      const document = documents.find(
        (page) => resolve(root, page.source) === absolute,
      );
      if (!document) {
        const original = slug.startsWith("zh/")
          ? documents.find(
              (page) =>
                page.slug === slug.slice(3) && page.sourceMode === "generated",
            )
          : undefined;
        if (original) return "/zh/docs/" + original.slug + "/" + suffix;
        throw new Error(`Unregistered Markdown link in ${sourceFile}: ${url}`);
      }
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
