import type { ShouldRevalidateFunctionArgs } from "react-router";
import type { ContentEntry } from "../../content/models";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";

export type CollectionEntry = ContentEntry<"paper" | "threejs-game">;
export const collectionPageSize = 24;
// These immutable collection loaders do not depend on URL filters. Avoid
// downloading the entire catalog again on every keystroke or page change.
export function shouldRevalidateCollection({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  return currentUrl.pathname === nextUrl.pathname &&
    currentUrl.search !== nextUrl.search
    ? false
    : defaultShouldRevalidate;
}
export const paperAreas = [
  ["play", "Play & agents"],
  ["model", "Player & world models"],
  ["design", "Game design"],
  ["build", "Development & tools"],
  ["runtime", "Runtime generation"],
  ["test", "Testing & evaluation"],
  ["foundation", "Foundations & surveys"],
] as const;
const supported = (
  value: string | null,
  values: readonly string[],
  fallback = "all",
) => (value && values.includes(value) ? value : fallback);

export function collectionFacets(entries: readonly CollectionEntry[]) {
  return {
    years: [
      ...new Set(
        entries.flatMap((entry) =>
          entry.kind === "paper" ? [String(entry.data.year)] : [],
        ),
      ),
    ].sort((a, b) => Number(b) - Number(a)),
    statuses: [
      ...new Set(
        entries.map((entry) =>
          entry.kind === "paper"
            ? entry.data.access.codeStatus
            : entry.data.maturity.status,
        ),
      ),
    ].sort(),
    genres: [
      ...new Set(
        entries.flatMap((entry) =>
          entry.kind === "threejs-game" ? entry.data.genres : [],
        ),
      ),
    ].sort(),
    licenses: [
      ...new Set(
        entries.flatMap((entry) =>
          entry.kind === "threejs-game"
            ? [entry.data.license.spdx || "unspecified"]
            : [],
        ),
      ),
    ].sort(),
  };
}
export function collectionFilters(
  params: URLSearchParams,
  entries: readonly CollectionEntry[],
  kind: "paper" | "threejs-game",
) {
  const facets = collectionFacets(entries);
  return {
    query: params.get("q")?.trim() || "",
    area: supported(
      params.get("area"),
      paperAreas.map(([value]) => value),
    ),
    genre: supported(params.get("genre"), facets.genres),
    year: supported(params.get("year"), facets.years),
    status: supported(params.get("status"), facets.statuses),
    license: supported(params.get("license"), facets.licenses),
    demo: supported(
      params.get("demo"),
      kind === "paper"
        ? ["interactive", "local", "download"]
        : ["listed", "not-listed"],
    ),
    project: kind === "paper" && params.get("project") === "1",
    sort: supported(
      params.get("sort"),
      kind === "paper"
        ? ["recent", "oldest", "practical", "title"]
        : ["title", "recent"],
      kind === "paper" ? "recent" : "title",
    ),
  };
}
export function selectCollection(
  entries: readonly CollectionEntry[],
  filters: ReturnType<typeof collectionFilters>,
  text?: ReadonlyMap<string, string>,
) {
  const result = entries.filter((entry) => {
    if (
      !matchesSearch(
        text?.get(entry.key) ?? searchableText(entry),
        filters.query,
      )
    )
      return false;
    if (entry.kind === "paper") {
      const data = entry.data;
      return (
        (filters.area === "all" ||
          data.roles.some((role) => role === filters.area)) &&
        (filters.year === "all" || String(data.year) === filters.year) &&
        (filters.status === "all" ||
          data.access.codeStatus === filters.status) &&
        (filters.demo === "all" ||
          data.access.demos.some((demo) => demo.kind === filters.demo)) &&
        (!filters.project || data.access.projects.length > 0)
      );
    }
    const data = entry.data;
    return (
      (filters.genre === "all" || data.genres.includes(filters.genre)) &&
      (filters.status === "all" || data.maturity.status === filters.status) &&
      (filters.license === "all" ||
        (data.license.spdx || "unspecified") === filters.license) &&
      (filters.demo === "all" ||
        Boolean(data.demo.url) === (filters.demo === "listed"))
    );
  });
  const date = (entry: CollectionEntry) => {
    if (entry.kind !== "paper")
      return Number(entry.data.verification.date.replaceAll("-", ""));
    const match = /^(\d{2})(\d{2})\.(\d+)$/.exec(entry.data.arxivId ?? "");
    return match
      ? +`20${match[1]}${match[2]}.${match[3]}`
      : +`${entry.data.year}06`;
  };
  const practical = (entry: CollectionEntry) =>
    entry.kind !== "paper"
      ? 0
      : (entry.data.access.demos.some(
          (demo) => demo.kind === "interactive" && demo.access === "public",
        )
          ? 4
          : 0) +
        (entry.data.access.repositories.length ? 2 : 0) +
        (entry.data.access.projects.length ? 1 : 0);
  return result.sort(
    (a, b) =>
      (filters.sort === "practical" ? practical(b) - practical(a) : 0) ||
      (filters.sort === "oldest"
        ? date(a) - date(b)
        : filters.sort !== "title"
          ? date(b) - date(a)
          : 0) ||
      a.title.localeCompare(b.title, "en") ||
      a.key.localeCompare(b.key, "en"),
  );
}
export function collectionPage(
  value: string | null,
  total: number,
  size = collectionPageSize,
) {
  const pages = Math.max(1, Math.ceil(total / size));
  const requested = value && /^\d{1,7}$/.test(value) ? Number(value) : 1;
  const page = Math.min(pages, Math.max(1, requested));
  return {
    page,
    pages,
    start: total ? (page - 1) * size + 1 : 0,
    end: Math.min(page * size, total),
  };
}
export function updateCollectionQuery(
  previous: URLSearchParams,
  values: Record<string, string>,
) {
  const next = new URLSearchParams(previous);
  if (!Object.hasOwn(values, "page")) next.delete("page");
  for (const [key, value] of Object.entries(values)) {
    if (
      !value ||
      (key !== "q" && value === "all") ||
      (key === "page" && value === "1")
    )
      next.delete(key);
    else next.set(key, value);
  }
  return next;
}
export const collectionFilterKeys = [
  "q",
  "area",
  "genre",
  "year",
  "status",
  "license",
  "demo",
  "project",
  "sort",
  "page",
];
export function clearCollectionQuery(previous: URLSearchParams) {
  const next = new URLSearchParams(previous);
  for (const key of collectionFilterKeys) next.delete(key);
  return next;
}
