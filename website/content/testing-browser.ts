import type { ContentEntry } from "./models";
import {
  testingKinds,
  testingUses,
  testingTerms,
} from "../src/data/testingTypes";
import taxonomy from "./taxonomy.json";
import { translate } from "./locale";
import { matchesSearch } from "./matching";
import {
  compareDirectoryTitles,
  parseDirectorySearchQuery,
} from "./directory-search";
import { searchableText } from "./search";

type TestingEntry = ContentEntry<"testing">;
type TestingStarterEntry = ContentEntry<"testing-pack">;
export interface TestingBrowserOption {
  id: string;
  label: string;
  count: number;
}
export interface TestingBrowserOptions {
  kinds: TestingBrowserOption[];
  uses: TestingBrowserOption[];
  terms: TestingBrowserOption[];
  dimensions: TestingBrowserOption[];
}
export interface TestingBrowserFilters {
  query: string;
  kind: string;
  use: string;
  terms: string;
  dimension: string;
}
export interface TestingStarterSelection {
  entry: TestingStarterEntry;
  resources: TestingEntry[];
  total: number;
}

export function testingBrowserOptions(
  entries: readonly TestingEntry[],
): TestingBrowserOptions {
  const options = (
    labels: Record<string, string>,
    matches: (entry: TestingEntry, id: string) => boolean,
  ) =>
    Object.entries(labels)
      .map(([id, label]) => ({
        id,
        label,
        count: entries.filter((entry) => matches(entry, id)).length,
      }))
      .filter(({ count }) => count > 0);
  return {
    kinds: options(testingKinds, (entry, id) => entry.data.kind === id),
    uses: options(testingUses, (entry, id) =>
      (entry.data.uses as readonly string[]).includes(id),
    ),
    terms: options(testingTerms, (entry, id) => entry.data.terms === id),
    dimensions: options(taxonomy.dimensions, (entry, id) =>
      (entry.data.dimensions as readonly string[]).includes(id),
    ),
  };
}

const supported = (
  value: string | null,
  options: readonly TestingBrowserOption[],
) => (options.some(({ id }) => id === value) ? value! : "all");

export function normalizeTestingFilters(
  params: URLSearchParams,
  options: TestingBrowserOptions,
): TestingBrowserFilters {
  return {
    query: params.get("q")?.trim() || "",
    kind: supported(params.get("kind"), options.kinds),
    use: supported(params.get("use"), options.uses),
    terms: supported(params.get("terms"), options.terms),
    dimension: supported(params.get("dimension"), options.dimensions),
  };
}

export function selectTestingEntries(
  entries: readonly TestingEntry[],
  filters: TestingBrowserFilters,
  searchText?: Readonly<Record<string, string>>,
): TestingEntry[] {
  const query = parseDirectorySearchQuery(filters.query);
  const matched = entries.filter(
    (entry) =>
      (filters.kind === "all" || entry.data.kind === filters.kind) &&
      (filters.use === "all" ||
        (entry.data.uses as readonly string[]).includes(filters.use)) &&
      (filters.terms === "all" || entry.data.terms === filters.terms) &&
      (filters.dimension === "all" ||
        (entry.data.dimensions as readonly string[]).includes(
          filters.dimension,
        )) &&
      matchesSearch(searchText?.[entry.id] ?? searchableText(entry), query),
  );
  return query.empty
    ? matched
    : matched.sort((a, b) => compareDirectoryTitles(query, a.title, b.title));
}

/** Keep task recommendations within both the chosen goal and visible resources. */
export function selectTestingStarters(
  packs: readonly TestingStarterEntry[],
  filteredEntries: readonly TestingEntry[],
  filters?: Pick<TestingBrowserFilters, "use">,
): TestingStarterSelection[] {
  const visible = new Map(filteredEntries.map((entry) => [entry.id, entry]));
  return packs.flatMap((entry) => {
    if (filters && filters.use !== "all" && entry.data.use !== filters.use)
      return [];
    const ids = [...new Set(entry.data.testingIds || [])];
    const resources = ids.flatMap((id) => {
      const resource = visible.get(id);
      return resource && resource.data.uses.includes(entry.data.use)
        ? [resource]
        : [];
    });
    return resources.length ? [{ entry, resources, total: ids.length }] : [];
  });
}

/** Current facet labels, stable IDs, and reader text are searchable in either locale. */
export function buildTestingSearchText(
  english: readonly TestingEntry[],
  chinese: readonly TestingEntry[],
): Record<string, string> {
  const alternate = new Map(chinese.map((entry) => [entry.id, entry]));
  return Object.fromEntries(
    english.map((entry) => {
      const translated = alternate.get(entry.id);
      const data = entry.data;
      const labels = [
        testingKinds[data.kind],
        testingTerms[data.terms],
        ...data.uses.map((id) => testingUses[id]),
        ...data.dimensions.map((id) => taxonomy.dimensions[id]),
      ];
      return [
        entry.id,
        [
          searchableText(entry),
          translated ? searchableText(translated) : "",
          data.kind,
          data.terms,
          ...data.uses,
          ...data.dimensions,
          ...labels.flatMap((label) => [label, translate("zh", label)]),
        ]
          .filter(Boolean)
          .join("\n"),
      ];
    }),
  );
}
