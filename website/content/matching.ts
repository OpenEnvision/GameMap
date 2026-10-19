export const normalizeSearch = (value: string) =>
  value.normalize("NFKC").toLocaleLowerCase("en");
export const searchTokens = (query: string) =>
  normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
export function matchesSearch(text: string, query: string) {
  const normalized = normalizeSearch(text);
  return searchTokens(query).every((token) => normalized.includes(token));
}
export interface SearchDocument {
  key: string;
  kind: string;
  title: string;
  url: string;
  text: string;
  alternateText?: string;
}
export interface SearchIndex {
  version: 2;
  documents: SearchDocument[];
}
export function rankDocuments(
  documents: readonly SearchDocument[],
  query: string,
) {
  const tokens = searchTokens(query),
    full = normalizeSearch(query).trim();
  if (!tokens.length) return [];
  return documents
    .filter((document) =>
      matchesSearch(
        document.text + "\n" + (document.alternateText || ""),
        query,
      ),
    )
    .map((document) => {
      const title = normalizeSearch(document.title);
      const score =
        (title === full ? 100 : title.includes(full) ? 50 : 0) +
        tokens.filter((token) => title.includes(token)).length * 10;
      return { document, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score || a.document.title.localeCompare(b.document.title),
    )
    .map((item) => item.document);
}
