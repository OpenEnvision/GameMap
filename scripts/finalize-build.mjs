import { readFile, writeFile, cp, rm } from "node:fs/promises";
import { execFileSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { loadContent, contentDigest } from "./lib/content.mjs";

const base = (
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/") +
  "/"
).replace(/\/+/g, "/");
const context = await loadContent(base);
const { registry, documents: docs, sources } = context;
const pages = context
  .staticPagePaths(registry)
  .map((path) => path.replace(/^\//, ""));
const records = context.contentManifest(registry);
let commit='source-archive'; try {commit=execFileSync('git',['rev-parse','--short','HEAD'],{encoding:'utf8'}).trim();}catch{}
const builtAt=new Date().toISOString();
await rm("dist", { recursive: true, force: true });
await cp(".build/client", "dist", { recursive: true });
// Prerendered routes include basename on disk, while Vite's assets do not.
// Pages mounts dist/ at that base already, so flatten only the route directory.
if (base !== "/") {
  const directory = "dist/" + base.split("/").filter(Boolean).join("/");
  await cp(directory, "dist", { recursive: true });
  await rm(directory, { recursive: true, force: true });
}
await cp("dist/404/index.html", "dist/404.html");
await rm("dist/__spa-fallback.html", { force: true });
await writeFile(
  "dist/site-manifest.json",
  JSON.stringify(
    { base, pages, commit, builtAt, docs: docs.map(({ slug, title }) => ({ slug, title })) },
    null,
    2,
  ) + "\n",
);
await writeFile(
  "dist/content-manifest.json",
  JSON.stringify(
    {
      version: 1,
      sourceDigest: contentDigest({ sources, documents: docs }),
      localizationDigest: contentDigest(context.localizationSnapshot),
      locales: context.locales,
      contentDigest: contentDigest(records),
      counts: Object.fromEntries(
        Object.keys(context.contentKinds).map((kind) => [
          kind,
          registry.all(kind).length,
        ]),
      ),
      totalRecords: records.length,
      recordings: sources.recordings.map(recording=>({id:recording.id,originalUrl:recording.originalUrl,views:recording.views.map(view=>view.id)})),
      records,
    },
    null,
    2,
  ) + "\n",
);
// Carry upstream license notices alongside distributed JavaScript and fonts.
const lock = JSON.parse(await readFile("package-lock.json", "utf8"));
const notices = [
  "GameMap — third-party dependency notices\n\nOriginal projects retain their respective licenses.",
];
for (const [directory, dependency] of Object.entries(lock.packages)) {
  if (!directory.startsWith("node_modules/") || dependency.dev) continue;
  for (const filename of [
    "LICENSE",
    "LICENSE.md",
    "LICENSE.txt",
    "license",
    "license.md",
    "LICENCE",
    "COPYING",
  ]) {
    try {
      const text = await readFile(directory + "/" + filename, "utf8");
      notices.push(
        `\n${"=".repeat(72)}\n${directory.slice("node_modules/".length)} ${dependency.version || ""}\n${text}`,
      );
      break;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}
await writeFile("dist/THIRD-PARTY-NOTICES.txt", notices.join("\n"));
const searchBytes=await readFile('dist/search-index.json');
console.log(`Compact search: ${searchBytes.length} bytes, ${gzipSync(searchBytes).length} bytes gzip.`);
const site = context.siteOrigin;
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((path) => `<url><loc>${site}${base}${path}</loc></url>`).join("")}</urlset>\n`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: ${base}\nSitemap: ${site}${base}sitemap.xml\n`,
);
console.log(
  `Static site ready: ${pages.length} pages, ${docs.length} rendered documents, search index, and a real 404 page. Only dist/ is published.`,
);
