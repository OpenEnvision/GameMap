import type { ContentEntry } from "./models";
import { matchesSearch } from "./matching";
import { translate } from "./locale";

type PaperEntry = ContentEntry<"paper">;
type PaperRole = PaperEntry["data"]["primaryRole"];
type PaperType = PaperEntry["data"]["referenceType"];
type PaperStatus = PaperEntry["data"]["access"]["codeStatus"];

export const paperAreaLabels: Record<PaperRole, string> = {
  play: "Play & agents",
  model: "Player & world models",
  design: "Game design",
  build: "Development & tools",
  runtime: "Runtime generation",
  test: "Testing & evaluation",
  foundation: "Foundations & surveys",
};
export const paperTypeLabels: Record<PaperType, string> = {
  "conference-paper": "Conference paper",
  "journal-paper": "Journal paper",
  preprint: "Preprint",
  survey: "Survey",
  "technical-report": "Technical report",
  blog: "Blog",
  book: "Book",
  "book-chapter": "Book chapter",
  "benchmark-page": "Benchmark page",
  documentation: "Documentation",
  "product-page": "Product page",
  repository: "Repository",
};
export const paperStatusLabels: Record<PaperStatus, string> = {
  "open-source": "Open source",
  "source-available": "Source available",
  "not-found": "No source located",
  "not-released": "Not released",
  restricted: "Restricted",
  unverified: "Unverified",
};
export const paperScopeLabels = {
  research: "Research papers",
  references: "Supporting references",
  all: "All records",
} as const;
export const paperReviewLabels = {
  "source-reviewed": "Source links checked",
  unverified: "Artifact links unverified",
} as const;
export const paperResearchTypes: readonly PaperType[] = [
  "conference-paper",
  "journal-paper",
  "preprint",
  "survey",
  "technical-report",
];

export interface PaperBrowserOption {
  id: string;
  label: string;
  count: number;
}
export interface PaperBrowserOptions {
  areas: PaperBrowserOption[];
  types: PaperBrowserOption[];
  years: PaperBrowserOption[];
  statuses: PaperBrowserOption[];
  reviews: PaperBrowserOption[];
  scopes: PaperBrowserOption[];
}
export interface PaperBrowserFilters {
  query: string;
  area: string;
  type: string;
  scope: "research" | "references" | "all";
  year: string;
  status: string;
  review: string;
  demo: string;
  project: boolean;
  sort: "recent" | "oldest" | "practical" | "title";
}

const scopeFor = (entry: PaperEntry) =>
  paperResearchTypes.includes(entry.data.referenceType)
    ? "research"
    : "references";

export function paperBrowserOptions(
  entries: readonly PaperEntry[],
): PaperBrowserOptions {
  const options = (
    labels: Record<string, string>,
    matches: (entry: PaperEntry, id: string) => boolean,
  ) =>
    Object.entries(labels)
      .map(([id, label]) => ({
        id,
        label,
        count: entries.filter((entry) => matches(entry, id)).length,
      }))
      .filter(({ count }) => count > 0);
  return {
    areas: options(paperAreaLabels, (entry, id) =>
      (entry.data.roles as readonly string[]).includes(id),
    ),
    types: options(
      paperTypeLabels,
      (entry, id) => entry.data.referenceType === id,
    ),
    years: [...new Set(entries.map((entry) => String(entry.data.year)))]
      .sort((a, b) => Number(b) - Number(a))
      .map((id) => ({
        id,
        label: id,
        count: entries.filter((entry) => String(entry.data.year) === id).length,
      })),
    statuses: options(
      paperStatusLabels,
      (entry, id) => entry.data.access.codeStatus === id,
    ),
    reviews: options(
      paperReviewLabels,
      (entry, id) => entry.data.access.reviewStatus === id,
    ),
    scopes: options(
      paperScopeLabels,
      (entry, id) => id === "all" || scopeFor(entry) === id,
    ),
  };
}

const supported = (
  value: string | null,
  options: readonly PaperBrowserOption[],
) => (options.some(({ id }) => id === value) ? value! : "all");

export function normalizePaperFilters(
  params: URLSearchParams,
  options: PaperBrowserOptions,
): PaperBrowserFilters {
  const rawType = params.get("type") || params.get("referenceType");
  let type = supported(rawType, options.types);
  const explicitType = rawType === "all" || type !== "all";
  const rawScope = params.get("scope");
  const scope =
    rawScope === "research" || rawScope === "references" || rawScope === "all"
      ? rawScope
      : explicitType
        ? "all"
        : "research";
  const rawDemo = params.get("demo");
  const rawSort = params.get("sort");
  if (scope !== "all" && type !== "all") {
    const typeScope = paperResearchTypes.includes(type as PaperType)
      ? "research"
      : "references";
    if (typeScope !== scope) type = "all";
  }
  return {
    query: params.get("q")?.trim() || "",
    area: supported(params.get("area"), options.areas),
    type,
    scope,
    year: supported(params.get("year"), options.years),
    status: supported(params.get("status"), options.statuses),
    review: supported(params.get("review"), options.reviews),
    demo:
      rawDemo && ["interactive", "local", "download"].includes(rawDemo)
        ? rawDemo
        : "all",
    project: params.get("project") === "1",
    sort:
      rawSort === "oldest" || rawSort === "practical" || rawSort === "title"
        ? rawSort
        : "recent",
  };
}

/** Recorded first-publication year is primary; arXiv only orders the same year. */
function preprintOrder(entry: PaperEntry) {
  const match = /^(\d{2})(0[1-9]|1[0-2])\.(\d{4,5})(?:v\d+)?$/.exec(
    entry.data.arxivId || "",
  );
  return match
    ? Number(`${match[1]}${match[2]}${match[3].padStart(5, "0")}`)
    : 0;
}
const artifactScore = (entry: PaperEntry) =>
  (entry.data.access.demos.some(
    (demo) => demo.kind === "interactive" && demo.access === "public",
  )
    ? 4
    : 0) +
  (entry.data.access.repositories.length ? 2 : 0) +
  (entry.data.access.projects.length ? 1 : 0);

export function selectPaperEntries(
  entries: readonly PaperEntry[],
  filters: PaperBrowserFilters,
  text?: Readonly<Record<string, string>>,
): PaperEntry[] {
  return entries
    .filter((entry) => {
      const data = entry.data;
      return (
        (filters.scope === "all" || scopeFor(entry) === filters.scope) &&
        (filters.area === "all" ||
          (data.roles as readonly string[]).includes(filters.area)) &&
        (filters.type === "all" || data.referenceType === filters.type) &&
        (filters.year === "all" || String(data.year) === filters.year) &&
        (filters.status === "all" ||
          data.access.codeStatus === filters.status) &&
        (filters.review === "all" ||
          data.access.reviewStatus === filters.review) &&
        (filters.demo === "all" ||
          data.access.demos.some((demo) => demo.kind === filters.demo)) &&
        (!filters.project || data.access.projects.length > 0) &&
        matchesSearch(
          text?.[entry.id] ?? paperSearchFields(entry),
          filters.query,
        )
      );
    })
    .sort((a, b) => {
      const canonicalTitle = (entry: PaperEntry) =>
        entry.originalTitle || entry.title;
      const direction = filters.sort === "oldest" ? 1 : -1;
      return (
        (filters.sort === "practical"
          ? artifactScore(b) - artifactScore(a)
          : 0) ||
        (filters.sort === "title"
          ? 0
          : direction * (a.data.year - b.data.year)) ||
        (filters.sort === "title"
          ? 0
          : direction * (preprintOrder(a) - preprintOrder(b))) ||
        canonicalTitle(a).localeCompare(canonicalTitle(b), "en") ||
        a.key.localeCompare(b.key, "en")
      );
    });
}

// This is a bibliographic import sentence, not an abstract about the source survey.
// Retain real descriptions and any publication information after the exact sentence.
export function paperDiscoveryDescription(description: string): string {
  return description.replace(
    /^(?:Journal paper|Blog post|Conference paper|Product announcement|Preprint|Technical report|Documentation|Benchmark results page|Book chapter|Book|Repository|Survey) cited as reference \[[^\]]+\] in AI for Games in the Foundation Model Era\.\s*/i,
    "",
  );
}

/** Search discovery fields, excluding attribution ledgers and review boilerplate. */
export function paperSearchFields(entry: PaperEntry): string {
  const data = entry.data;
  const labels = [
    ...data.roles.map((role) => paperAreaLabels[role]),
    paperTypeLabels[data.referenceType],
    paperStatusLabels[data.access.codeStatus],
    paperReviewLabels[data.access.reviewStatus],
    paperScopeLabels[scopeFor(entry)],
  ];
  return [
    entry.title,
    paperDiscoveryDescription(entry.description),
    data.authors,
    data.publication,
    String(data.year),
    data.arxivId,
    data.doi,
    ...data.topics.filter((topic) => !/^Role:\s*/i.test(topic)),
    ...data.roles,
    data.referenceType,
    data.access.codeStatus,
    data.access.reviewStatus,
    scopeFor(entry),
    ...labels.flatMap((label) => [label, translate("zh", label)]),
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildPaperSearchText(
  english: readonly PaperEntry[],
  chinese: readonly PaperEntry[],
): Record<string, string> {
  const alternate = new Map(chinese.map((entry) => [entry.id, entry]));
  return Object.fromEntries(
    english.map((entry) => {
      const translated = alternate.get(entry.id);
      return [
        entry.id,
        [
          paperSearchFields(entry),
          translated ? paperSearchFields(translated) : "",
        ]
          .filter(Boolean)
          .join("\n"),
      ];
    }),
  );
}
