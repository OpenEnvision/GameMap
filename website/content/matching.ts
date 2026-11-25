const separators =
  /[\s\p{Dash_Punctuation}\p{Connector_Punctuation},;:!?/\\|&()[\]{}<>"“”‘’'、。；：！？（）【】《》〈〉「」『』·‧]+/gu;
const scriptBoundary =
  /([\p{Script=Han}])(?=[\p{Script=Latin}\p{N}])|([\p{Script=Latin}\p{N}])(?=\p{Script=Han})/gu;
const letterOrNumber = /[\p{L}\p{N}]/u;
const han = /\p{Script=Han}/u;
const latinWordCharacter = /[\p{Script=Latin}\p{N}]/u;
const abbreviation = /^[a-z]{1,2}$/;

export const normalizeSearch = (value: string) =>
  value.normalize("NFKC").toLowerCase().replaceAll("♯", "#");

function tokenize(normalized: string) {
  return normalized
    .replace(scriptBoundary, "$1$2 ")
    .replace(/([\p{L}\p{N}])\+(?=[\p{L}\p{N}])/gu, "$1 ")
    .replace(/([\p{L}\p{N}])\.(?![\p{L}\p{N}])/gu, "$1 ")
    .split(separators)
    .filter((token) => letterOrNumber.test(token));
}

export function parseSearchQuery(value: string) {
  const normalized = normalizeSearch(value).trim();
  const words = tokenize(normalized);
  return {
    empty: !normalized,
    tokens: [...new Set(words)],
    phrase: words.join(" "),
    compact: words.join(""),
  };
}

type SearchQuery = ReturnType<typeof parseSearchQuery>;
export const searchTokens = (query: string) => parseSearchQuery(query).tokens;

export function matchesSearch(text: string, value: string | SearchQuery) {
  const query = typeof value === "string" ? parseSearchQuery(value) : value;
  if (!query.tokens.length) return query.empty;
  const normalized = normalizeSearch(text);
  return query.tokens.every((token) => normalized.includes(token));
}

export interface SearchDocument {
  key: string;
  kind: string;
  title: string;
  url: string;
  text: string;
  alternateText?: string;
  alternateTitle?: string;
}
export interface SearchIndex {
  version: 2;
  documents: SearchDocument[];
}

function prepareTitle(value: string) {
  const normalized = normalizeSearch(value);
  const words = tokenize(normalized);
  return {
    phrase: words.join(" "),
    compact: words.join(""),
    // A product can appear after a qualifier, as in "Unreal Engine · Gauntlet".
    qualifiedNames: normalized
      .split(/[·:|–—]/u)
      .slice(1)
      .map((part) => tokenize(part).join(" ")),
  };
}

type SearchTitle = ReturnType<typeof prepareTitle>;

function includesWholeWord(text: string, word: string) {
  if (han.test(word)) return text.includes(word);
  for (
    let start = text.indexOf(word);
    start >= 0;
    start = text.indexOf(word, start + 1)
  ) {
    const before = text[start - 1] || "";
    const after = text[start + word.length] || "";
    if (!latinWordCharacter.test(before) && !latinWordCharacter.test(after))
      return true;
  }
  return false;
}

function titleScore(title: SearchTitle, query: SearchQuery) {
  if (!query.tokens.length) return 0;
  if (title.phrase === query.phrase) return 100;
  if (title.compact === query.compact) return 95;
  if (title.qualifiedNames.includes(query.phrase)) return 90;
  if (
    title.phrase.startsWith(query.phrase + " ") ||
    (han.test(query.phrase) && title.phrase.startsWith(query.phrase))
  )
    return 85;
  if (includesWholeWord(title.phrase, query.phrase)) return 80;
  if (query.tokens.every((token) => includesWholeWord(title.phrase, token)))
    return 70;
  if (
    query.tokens.some(
      (token) =>
        abbreviation.test(token) && !includesWholeWord(title.phrase, token),
    )
  )
    return 0;
  if (title.phrase.startsWith(query.phrase)) return 60;
  if (title.phrase.includes(query.phrase)) return 55;
  if (query.tokens.every((token) => title.phrase.includes(token))) return 50;
  return 0;
}

export function searchTitleScore(title: string, query: SearchQuery) {
  return titleScore(prepareTitle(title), query);
}

// The same immutable records are reused across queries and result scopes.
const prepared = new WeakMap<
  SearchDocument,
  {
    title: SearchTitle;
    alternate?: SearchTitle;
    text: string;
    otherText?: string;
  }
>();

function getPreparedDocument(document: SearchDocument) {
  const cached = prepared.get(document);
  if (cached) return cached;
  const entry = {
    title: prepareTitle(document.title),
    alternate: document.alternateTitle
      ? prepareTitle(document.alternateTitle)
      : undefined,
    text: normalizeSearch(document.text),
    otherText: document.alternateText
      ? normalizeSearch(document.alternateText)
      : undefined,
  };
  prepared.set(document, entry);
  return entry;
}

export function rankDocuments(
  documents: readonly SearchDocument[],
  value: string,
) {
  const query = parseSearchQuery(value);
  if (!query.tokens.length) return [];
  const terms = query.tokens.map((token) => ({
    token,
    // In body text, abbreviations such as CI should not match arbitrary words.
    whole: abbreviation.test(token),
  }));
  const ranked: {
    document: SearchDocument;
    score: number;
    titleLength: number;
  }[] = [];
  for (const document of documents) {
    const { title, alternate, text, otherText } = getPreparedDocument(document);
    const primaryScore = titleScore(title, query) * 2;
    const alternateScore = alternate ? titleScore(alternate, query) * 2 - 1 : 0;
    let score = Math.max(primaryScore, alternateScore);
    if (!score) {
      const matches = terms.every(({ token, whole }) =>
        whole
          ? includesWholeWord(text, token) ||
            (otherText && includesWholeWord(otherText, token))
          : text.includes(token) || otherText?.includes(token),
      );
      if (!matches) continue;
      score =
        text.includes(query.phrase) || otherText?.includes(query.phrase)
          ? 1
          : 0;
    }
    ranked.push({
      document,
      score,
      titleLength:
        (alternateScore > primaryScore ? alternate : title)?.phrase.length ?? 0,
    });
  }
  return ranked
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.titleLength - b.titleLength ||
        a.document.title.localeCompare(b.document.title),
    )
    .map((item) => item.document);
}
