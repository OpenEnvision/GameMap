import { posix } from "node:path";
import { canonicalDocumentSource } from "./catalog/generated-registry.mjs";
import { repositoryResearchNotice } from "./guides/repository-research.mjs";
import documentRedirects from "../../website/content/document-redirects.json" with { type: "json" };

// Pages whose raw Markdown keeps a long-standing public name at the site root.
const namedDownloads = {
  "docs/reference/catalog.md": "awesome-list.md",
  "docs/reference/media-sources.md": "media-sources.md",
  "docs/reference/logo-sources.md": "logo-sources.md",
};
const rootFiles = {
  "CONTRIBUTING.md": "CONTRIBUTING.md",
  "data/resources.json": "resources.json",
};

/** English guides mirror docs/ under /docs/; flat legacy sources keep a root download. */
export function noteDownloadPath(page) {
  const source = canonicalDocumentSource(page.source);
  if (
    !source.startsWith("docs/") ||
    Object.hasOwn(namedDownloads, source) ||
    /^(?:zh|skills|remote)\//.test(page.slug)
  )
    return null;
  return page.slug.includes("/") ? `docs/${page.slug}.md` : `${page.slug}.md`;
}

/**
 * Raw Markdown downloads for the site root, keyed by public path.
 * `bodies` maps each document source (and CONTRIBUTING.md) to its Markdown.
 */
export function documentDownloads(documents, bodies) {
  const publicPaths = new Map(
    documents.flatMap((page) => {
      const source = canonicalDocumentSource(page.source);
      const path = namedDownloads[source] ?? noteDownloadPath(page);
      return path ? [[source, path]] : [];
    }),
  );
  for (const [path, target] of Object.entries(documentRedirects)) {
    const slug = path.match(/^\/docs\/([^/]+)\/$/)?.[1];
    if (slug && !target.startsWith("/docs/"))
      publicPaths.set(`docs/${slug}.md`, `${slug}.md`);
  }
  for (const [source, path] of Object.entries(rootFiles))
    publicPaths.set(source, path);
  // Rebase relative links from the source file onto the downloaded copy.
  const rebase = (markdown, source, download) =>
    markdown.replace(/\]\(([^)\s]+)\)/g, (link, url) => {
      if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(url)) return link;
      const [, path, suffix] = url.match(/^([^?#]*)(.*)$/);
      if (!path) return link;
      const target = posix.normalize(
        posix.join(posix.dirname(source), decodeURI(path)),
      );
      const published = target.startsWith("website/public/")
        ? target.slice("website/public/".length)
        : publicPaths.get(canonicalDocumentSource(target));
      if (!published) return link;
      const relative = posix.relative(posix.dirname(download), published);
      return `](${relative.startsWith("../") ? relative : "./" + relative}${suffix})`;
    });
  const output = {};
  for (const page of documents) {
    const source = canonicalDocumentSource(page.source);
    const download = publicPaths.get(source);
    if (!download || !Object.hasOwn(bodies, page.source)) continue;
    output[download] =
      rebase(bodies[page.source], page.source, download).trimEnd() + "\n";
  }
  output["CONTRIBUTING.md"] = rebase(
    bodies["CONTRIBUTING.md"],
    "CONTRIBUTING.md",
    "CONTRIBUTING.md",
  );
  if (output["logo-sources.md"])
    output["logo-sources.md"] = output["logo-sources.md"].replaceAll(
      "<code>website/public/logos/</code>",
      "<code>logos/</code>",
    );
  // Former raw URLs keep a short notice: moved guides point to their new copy,
  // retired catalogs to the page that replaced them.
  for (const [path, target] of Object.entries(documentRedirects)) {
    const slug = path.match(/^\/docs\/([^/]+)\/$/)?.[1];
    if (!slug) continue;
    if (!target.startsWith("/docs/")) {
      output[`${slug}.md`] =
        target === "/research/"
          ? repositoryResearchNotice(target, "./repository-research.json")
          : `# Game examples\n\nThis catalog has moved to [Game examples](${target}).\n`;
      continue;
    }
    const page = documents.find(
      (document) => `/docs/${document.slug}/` === target,
    );
    const moved = page && noteDownloadPath(page);
    if (moved)
      output[`${slug}.md`] =
        `# ${page.title}\n\nThis document has moved to [${page.title}](./${moved}).\n`;
  }
  return output;
}
