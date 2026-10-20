export const normalizeSearch = (value: string) =>
  value.normalize("NFKC").toLocaleLowerCase("en");
const englishIntent = /^(?:i\s+(?:want|would like|need|am going)\s+to|help\s+me|how\s+(?:(?:can|do)\s+i|to))\b/i;
const chineseIntent = /^(?:(?:我|我们)?(?:想要?|希望|打算|准备|要)|请帮我|如何|怎么)(?:制作|构建|开发|做)?(?:一个|一款)?\s*|^(?:制作|构建|开发|做)(?:一个|一款)\s*/u;
export function isBuildIntent(query: string) {
  return englishIntent.test(query.trim()) || chineseIntent.test(query.trim());
}
export function searchTokens(query: string) {
  let text = normalizeSearch(query).trim();
  if (isBuildIntent(text)) {
    text = text.replace(englishIntent, "").replace(chineseIntent, "")
      .replace(/\b(?:i|want|would|like|need|to|build|make|create|develop|a|an|the|my|please)\b/g, " ")
      .replace(/[.!?，。！？]+$/gu, "")
      .replace(/([a-z0-9])([\p{Script=Han}])/gu, "$1 $2")
      .replace(/([\p{Script=Han}])([a-z0-9])/gu, "$1 $2");
  }
  return text.split(/\s+/).filter(Boolean);
}
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
    intent = isBuildIntent(query),
    full = intent ? tokens.join(" ") : normalizeSearch(query).trim();
  if (!tokens.length) return [];
  return documents
    .filter((document) => {
      const text = normalizeSearch(document.text + "\n" + (document.alternateText || ""));
      return tokens.every((token) => text.includes(token));
    })
    .map((document) => {
      const title = normalizeSearch(document.title);
      const score =
        (title === full ? 100 : title.includes(full) ? 50 : 0) +
        tokens.filter((token) => title.includes(token)).length * 10 +
        (intent ? (document.kind === "path" ? 90 : document.kind === "example" ? 20 : 0) : 0);
      return { document, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score || a.document.title.localeCompare(b.document.title),
    )
    .map((item) => item.document);
}
