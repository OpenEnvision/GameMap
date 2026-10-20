import { readFile, mkdir, rm } from "node:fs/promises";
import { resolve, relative, dirname } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";
import {
  root,
  walk,
  readDocuments,
  documentLinkResolver,
  assertDocumentHTML,
  preparedMarkdown,
  publicSourcePaths,
  publishablePath,
} from "./lib/documents.mjs";
import { loadContent } from "./lib/content.mjs";
import { writeIfChanged } from './lib/files.mjs';

const docsDir = resolve(root, "docs");
const contentDir = resolve(root, "website/.content/docs");
const assetsDir = resolve(root, "website/public/docs-assets");
const assetBase = (
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/") +
  "/"
).replace(/\/+/g, "/");
const manifest = await readDocuments();
const rewriteLink = documentLinkResolver(manifest, assetBase);
await mkdir(contentDir, { recursive: true });
const expectedDocs = new Set(manifest.map(page => resolve(contentDir, page.slug + '.md')));
for (const stale of await walk(contentDir)) if (!expectedDocs.has(stale)) await rm(stale, {force:true});
const visibleAssets = publicSourcePaths();
for (const file of (await walk(docsDir)).filter(file => /\.(?:png|jpe?g|gif|webp|svg)$/i.test(file) && publishablePath(relative(root,file),visibleAssets))) {
  const target = resolve(assetsDir, relative(docsDir, file));
  await mkdir(dirname(target), { recursive: true });
  await writeIfChanged(target, await readFile(file));
}
for (const page of manifest) {
  const file = resolve(root, page.source);
  const markdown = preparedMarkdown(await readFile(file, 'utf8'));
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree) => {
      visit(tree, (node) => {
        if (node.type === "html") assertDocumentHTML(node.value, page.source);
        if (["link", "image", "definition"].includes(node.type))
          node.url = rewriteLink(node.url, file, node.type === "image");
      });
    })
    .use(remarkStringify, { bullet: "-", fences: true });
  const target = resolve(contentDir, page.slug + ".md");
  await mkdir(dirname(target), { recursive: true });
  await writeIfChanged(
    target,
    `---\ntitle: ${JSON.stringify(page.title)}\ndescription: ${JSON.stringify(page.description)}\n---\n${String(await processor.process(markdown))}`,
  );
}
await writeIfChanged(
  resolve(root, "website/.content/manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
const { registry, staticPagePaths } = await loadContent(
  process.env.PAGES_BASE_PATH,
);
await writeIfChanged(
  resolve(root, "website/.content/routes.json"),
  JSON.stringify(staticPagePaths(registry), null, 2) + "\n",
);
console.log(
  `Prepared ${manifest.length} discovered documents and ${registry.entries.length} content records; original Markdown is unchanged.`,
);
