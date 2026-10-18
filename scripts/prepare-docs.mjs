import { readFile, writeFile, mkdir, readdir, cp, rm } from "node:fs/promises";
import { resolve, relative, dirname, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";

const root = fileURLToPath(new URL("../", import.meta.url));
const docsDir = resolve(root, "docs");
const contentDir = resolve(root, "website/.content/docs");
const assetsDir = resolve(root, "website/public/docs-assets");
const groups = JSON.parse(
  await readFile(resolve(root, "website/docs.config.json"), "utf8"),
);
const base =
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/") +
  "/";
const assetBase = base.replace(/\/+/g, "/");
const manifest = [];
const slash = (value) => value.split(sep).join("/");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? walk(resolve(directory, entry.name))
        : [resolve(directory, entry.name)],
    ),
  );
  return files.flat();
}

function rewriteLink(url, sourceFile, image = false) {
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return url;
  const match = url.match(/^([^?#]*)(.*)$/);
  const path = decodeURI(match[1]);
  const suffix = match[2];
  const absolute = path.startsWith("/")
    ? resolve(root, "website/public", path.slice(1))
    : resolve(dirname(sourceFile), path);
  const docPath = slash(relative(docsDir, absolute));
  if (extname(absolute).toLowerCase() === ".md") {
    if (!docPath.startsWith(".."))
      return "/docs/" + docPath.replace(/\.md$/, "") + "/" + suffix;
    if (absolute === resolve(root, "AWESOME.md"))
      return "/docs/catalog/" + suffix;
    if (absolute === resolve(root, "CONTRIBUTING.md"))
      return "/docs/contributing/" + suffix;
    if (absolute === resolve(root, "README.md")) return "/" + suffix;
  }
  const publicPath = slash(relative(resolve(root, "website/public"), absolute));
  if (!publicPath.startsWith("..")) return assetBase + publicPath + suffix;
  if (!docPath.startsWith("..") && image)
    return assetBase + "docs-assets/" + docPath + suffix;
  if (absolute === resolve(root, "data/resources.json"))
    return assetBase + "resources.json" + suffix;
  return url;
}

await rm(contentDir, { recursive: true, force: true });
await rm(assetsDir, { recursive: true, force: true });
await mkdir(contentDir, { recursive: true });
const files = await walk(docsDir);
const sources = files
  .filter((file) => file.endsWith(".md"))
  .map((file) => ({
    file,
    slug: slash(relative(docsDir, file)).replace(/\.md$/, ""),
  }));
sources.push(
  { file: resolve(root, "AWESOME.md"), slug: "catalog" },
  { file: resolve(root, "CONTRIBUTING.md"), slug: "contributing" },
);
for (const file of files.filter((file) =>
  /\.(?:png|jpe?g|gif|webp|svg)$/i.test(file),
)) {
  const target = resolve(assetsDir, relative(docsDir, file));
  await mkdir(dirname(target), { recursive: true });
  await cp(file, target);
}
for (const { file, slug } of sources) {
  let markdown = await readFile(file, "utf8");
  const title = markdown.match(/^#\s+(.+)$/m)?.[1].replace(/`/g, "") || slug;
  const group = groups.find((group) => group.pages.some(([id]) => id === slug));
  const label = group?.pages.find(([id]) => id === slug)?.[1] || title;
  markdown = markdown.replace(/^#\s+.+\r?\n/, "");
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree) => {
      visit(tree, (node) => {
        if (["link", "image", "definition"].includes(node.type))
          node.url = rewriteLink(node.url, file, node.type === "image");
      });
    })
    .use(remarkStringify, { bullet: "-", fences: true });
  const body = String(await processor.process(markdown));
  const description =
    group?.description ||
    "Curated source notes and practical guidance from GameMap.";
  const target = resolve(contentDir, slug + ".md");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(
    target,
    `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n${body}`,
  );
  manifest.push({
    slug,
    title,
    label,
    description,
    group: group?.title || "More notes",
    source: slash(relative(root, file)),
  });
}
await writeFile(
  resolve(root, "website/.content/manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Prepared ${manifest.length} documents for static rendering; original Markdown is unchanged.`,
);
