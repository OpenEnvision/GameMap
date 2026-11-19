import type { SearchIndex } from "../../content/matching";
import { rankDocuments } from "../../content/matching";
import { contentKinds } from "../../content/models";
import { translate, type Locale } from "../../content/locale";
const pending = new Map<Locale, Promise<SearchIndex>>();
export function loadSearchIndex(locale: Locale = "en") {
  if (!pending.has(locale))
    pending.set(
      locale,
      fetch(
        `${import.meta.env.BASE_URL}${locale === "zh" ? "zh/" : ""}search-index.json`,
      )
        .then(async (response) => {
          if (!response.ok)
            throw new Error(`Search index unavailable (${response.status})`);
          const index = (await response.json()) as SearchIndex;
          if (index.version !== 2 || !Array.isArray(index.documents))
            throw new Error("Unsupported search index");
          return index;
        })
        .catch((error) => {
          pending.delete(locale);
          throw error;
        }),
    );
  return pending.get(locale)!;
}
export async function searchContent(query: string, locale: Locale = "en") {
  return rankDocuments((await loadSearchIndex(locale)).documents, query);
}
export async function dialogSearch(query: string, locale: Locale = "en") {
  return (await searchContent(query, locale)).slice(0, 30).map((document) => ({
    id: document.key,
    type: "page" as const,
    url: document.url,
    content: document.title,
    breadcrumbs: [
      translate(
        locale,
        (contentKinds as Record<string, { label: string }>)[document.kind]
          ?.label || document.kind,
      ),
    ],
  }));
}
