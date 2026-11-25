import type { SearchDocument, SearchIndex } from "../../content/matching";
import { parseSearchQuery, rankDocuments } from "../../content/matching";
import { contentKinds } from "../../content/models";
import { localizedPath, translate, type Locale } from "../../content/locale";
import { pages } from "../../content/site";
import { searchKindInScope, type SearchScope } from "./search-scopes";

const browsePages = [
  ["docs", "docs", ["Docs", "Documentation", "Learning guides"]],
  ["resources", "tools", ["Tool library"]],
  ["agents", "tools", ["Agents", "Coding agents"]],
  ["testing", "tools", ["Test library"]],
  ["examples", "games", ["Games", "Game samples"]],
  ["papers", "research", ["Paper library"]],
  ["research", "research", ["Repository survey"]],
] as const;

function navigationDocuments(locale: Locale) {
  return browsePages.map(([id, scope, aliases]) => {
    const page = pages[id];
    const title = translate(locale, page.title);
    const alternateTitle = translate(locale === "en" ? "zh" : "en", page.title);
    const searchTerms = aliases.flatMap((alias) => [
      alias,
      translate("zh", alias),
    ]);
    const document = {
      key: `navigation:${id}`,
      kind: "navigation",
      title,
      alternateTitle,
      text: [title, alternateTitle, ...searchTerms].join("\n"),
      url: localizedPath(page.path, locale),
    } satisfies SearchDocument;
    return { scope, document };
  });
}

const navigation = {
  en: navigationDocuments("en"),
  zh: navigationDocuments("zh"),
};
const pending = new Map<string, Promise<SearchIndex>>();
const preferredDocuments = new WeakMap<SearchIndex, SearchDocument[]>();

function preferCurrentLanguage(index: SearchIndex, locale: Locale) {
  const cached = preferredDocuments.get(index);
  if (cached) return cached;
  const keys = new Set(index.documents.map(({ key }) => key));
  const documents = index.documents.filter(({ key, kind }) => {
    if (kind !== "document") return true;
    if (locale === "en" && key.startsWith("document:zh/"))
      return !keys.has(`document:${key.slice("document:zh/".length)}`);
    if (locale === "zh" && !key.startsWith("document:zh/"))
      return !keys.has(`document:zh/${key.slice("document:".length)}`);
    return true;
  });
  preferredDocuments.set(index, documents);
  return documents;
}

function loadSearchIndex(locale: Locale, docsOnly: boolean) {
  const filename = docsOnly ? "docs-search-index.json" : "search-index.json";
  const path = `${import.meta.env.BASE_URL}${locale === "zh" ? "zh/" : ""}${filename}`;
  const existing = pending.get(path);
  if (existing) return existing;
  const request = fetch(path)
    .then(async (response) => {
      if (!response.ok)
        throw new Error(`Search index unavailable (${response.status})`);
      const index = (await response.json()) as SearchIndex;
      if (index.version !== 2 || !Array.isArray(index.documents))
        throw new Error("Unsupported search index");
      return index;
    })
    .catch((error) => {
      pending.delete(path);
      throw error;
    });
  pending.set(path, request);
  return request;
}

export async function dialogSearch(
  query: string,
  locale: Locale,
  scope: SearchScope,
) {
  if (!parseSearchQuery(query).tokens.length) return [];
  const index = await loadSearchIndex(locale, scope === "docs");
  const documents = preferCurrentLanguage(index, locale);
  const matches = rankDocuments(
    [
      ...navigation[locale]
        .filter((page) => scope === "all" || page.scope === scope)
        .map(({ document }) => document),
      ...documents.filter((document) =>
        searchKindInScope(document.kind, scope),
      ),
    ],
    query,
  );
  return matches.slice(0, 30).map((document) => ({
    id: document.key,
    type: "page" as const,
    url: document.url,
    content: document.title,
    breadcrumbs: [
      translate(
        locale,
        document.kind === "navigation"
          ? "Site page"
          : (contentKinds as Record<string, { label: string }>)[document.kind]
              ?.label || document.kind,
      ),
    ],
  }));
}
