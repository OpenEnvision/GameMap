import type { DocumentMetadata } from "../../content/models";

export type PortalDocument = {
  document: DocumentMetadata;
  canonicalLabel: string;
  canonicalTitle: string;
  group: string;
  description: string;
  archive: "original" | "reconstructed" | null;
};
export type PortalGroup = {
  id: string;
  title: string;
  description: string;
  pages: PortalDocument[];
};
export type PortalTaskId = "tools" | "prototype" | "assets" | "testing";
const taskDocuments: Record<PortalTaskId, readonly string[]> = {
  tools: ["engines-notes", "game-ai-notes", "agents-notes"],
  prototype: ["practical-guide"],
  assets: ["generative-tools-research", "asset-validation-contracts"],
  testing: ["game-testing-library", "game-development-evaluation"],
};
export const canonicalDocumentSlug = (slug: string) =>
  slug.replace(/^zh\//, "");

/** Homepage-only grouping: a translated guide keeps its original topic.
 * The reader sidebar, authored metadata, routes and document bodies are untouched. */
export function documentationPortal(
  manifest: readonly DocumentMetadata[],
  visible: readonly DocumentMetadata[],
) {
  const originals = new Map(
    manifest
      .filter((page) => !page.slug.startsWith("zh/"))
      .map((page) => [page.slug, page]),
  );
  const pages: PortalDocument[] = visible.map((document) => {
    const slug = canonicalDocumentSlug(document.slug);
    const original = originals.get(slug) || document;
    return {
      document,
      canonicalLabel: original.label,
      canonicalTitle: original.title,
      group: slug === "reading-guide" ? "Start building" : original.group,
      description: original.description,
      archive: slug.startsWith("remote/archive/")
        ? "original"
        : slug.startsWith("remote/")
          ? "reconstructed"
          : null,
    };
  });
  const topicOrder = [
    ...new Set(
      manifest
        .filter((page) => !page.slug.startsWith("zh/"))
        .map((page) => page.group),
    ),
  ];
  const titles = [
    ...new Set(pages.filter((page) => !page.archive).map((page) => page.group)),
  ].sort((a, b) => {
    const rank = (title: string) => {
      const position = topicOrder.indexOf(title);
      return position < 0 ? topicOrder.length : position;
    };
    return rank(a) - rank(b);
  });
  const groups: PortalGroup[] = titles.map((title, index) => {
    const children = pages.filter(
      (page) => !page.archive && page.group === title,
    );
    return {
      id: `docs-topic-${index + 1}`,
      title,
      description: children[0].description,
      pages: children,
    };
  });
  const bySlug = new Map(
    pages.map((page) => [canonicalDocumentSlug(page.document.slug), page]),
  );
  const firstAvailable = (slugs: readonly string[]) =>
    slugs.map((slug) => bySlug.get(slug)).find(Boolean);
  return {
    pages,
    groups,
    coreCount: pages.filter((page) => !page.archive).length,
    originals: pages.filter((page) => page.archive === "original"),
    reconstructions: pages.filter((page) => page.archive === "reconstructed"),
    starter: firstAvailable(["practical-guide", "reading-guide"]),
    tasks: (
      Object.entries(taskDocuments) as [PortalTaskId, readonly string[]][]
    ).flatMap(([id, slugs]) => {
      const page = firstAvailable(slugs);
      return page ? [{ id, page }] : [];
    }),
  };
}

function searchable(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase();
}
/** Local metadata search, not an invented full-text or semantic-search service. */
export function searchDocumentation(
  pages: readonly PortalDocument[],
  query: string,
  translate: (value: string) => string = (value) => value,
) {
  const words = searchable(query).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [...pages];
  return pages.filter((page) => {
    const values = [
      page.document.title,
      page.document.label,
      page.canonicalLabel,
      page.canonicalTitle,
      page.group,
      page.description,
    ];
    const haystack = searchable(
      [...values, ...values.map(translate)].join(" "),
    );
    return words.every((word) => haystack.includes(word));
  });
}

export function revealDocumentationGroup(id: string) {
  const target = document.getElementById(id);
  if (!(target instanceof HTMLDetailsElement)) return;
  target.open = true;
  target.querySelector("summary")?.focus({ preventScroll: true });
}
