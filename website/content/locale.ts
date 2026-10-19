import { pages } from "./site";
import chinese from "./i18n/zh.json";
import documentMessages from "./i18n/docs.zh.json";
export type Locale = "en" | "zh";
export const locales = ["en", "zh"] as const;
export interface DocumentLanguages {
  en: string[];
  zh: string[];
}
export const emptyDocumentLanguages: DocumentLanguages = { en: [], zh: [] };
export function documentLanguages(
  documents: readonly { slug: string }[],
): DocumentLanguages {
  return {
    en: documents
      .filter((page) => !page.slug.startsWith("zh/"))
      .map((page) => page.slug),
    zh: documents
      .filter((page) => page.slug.startsWith("zh/"))
      .map((page) => page.slug.slice(3)),
  };
}
export function localeFromPath(path: string, base = "/"): Locale {
  const prefix = base === "/" ? "" : base.replace(/\/$/, "");
  const logical =
    prefix && path.startsWith(prefix + "/") ? path.slice(prefix.length) : path;
  return /^\/zh(?:\/|$)/.test(logical) || /^\/docs\/zh(?:\/|$)/.test(logical)
    ? "zh"
    : "en";
}
export function unlocalizedPath(path: string) {
  return path.replace(/^\/zh(?=\/|$)/, "") || "/";
}
/** Router-relative URLs only. Source URLs, media, downloads and fragments stay untouched. */
export function localizedPath(
  value: string,
  locale: Locale,
  documents = emptyDocumentLanguages,
): string {
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  const split = value.search(/[?#]/),
    pathname = split < 0 ? value : value.slice(0, split),
    suffix = split < 0 ? "" : value.slice(split);
  const path = unlocalizedPath(pathname),
    root = path.split("/")[1];
  const isApp =
    path === "/" ||
    /^\/404\/?$/.test(path) ||
    Object.values(pages).some((page) => page.path.split("/")[1] === root) ||
    path === "/search-index.json";
  if (!isApp) return value;
  if (/^\/docs(?:\/|$)/.test(path)) {
    const slug = path.replace(/^\/docs\/?/, "").replace(/\/$/, "");
    const original = slug.replace(/^zh(?:\/|$)/, "");
    if (!slug || slug === "zh")
      return (locale === "zh" ? "/docs/zh/" : "/docs/") + suffix;
    if (locale === "en")
      return (
        (slug.startsWith("zh/") && !documents.en.includes(original)
          ? "/docs/"
          : `/docs/${original}/`) + suffix
      );
    if (slug.startsWith("zh/") || documents.zh.includes(original))
      return `/docs/zh/${original}/` + suffix;
    return `/zh/docs/${original}/` + suffix;
  }
  return (
    (locale === "zh" ? (path === "/" ? "/zh/" : "/zh" + path) : path) + suffix
  );
}
export function languageAlternates(
  path: string,
  documents = emptyDocumentLanguages,
): Partial<Record<Locale, string>> {
  const logical = unlocalizedPath(path).replace(/\/$/, "") || "/";
  if (logical.startsWith("/docs/") && logical !== "/docs/zh") {
    const slug = logical.slice("/docs/".length).replace(/^zh\//, "");
    const result: Partial<Record<Locale, string>> = {};
    if (documents.en.includes(slug)) result.en = `/docs/${slug}/`;
    if (documents.zh.includes(slug)) result.zh = `/docs/zh/${slug}/`;
    return result;
  }
  const canonicalPath = path.endsWith("/") ? path : path + "/";
  return {
    en: localizedPath(canonicalPath, "en", documents),
    zh: localizedPath(canonicalPath, "zh", documents),
  };
}
export function isEnglishSourceLabel(label: string) {
  return (
    label.includes(chineseMessages["English link marker"] || "\u0000") ||
    /\(English\)/.test(label)
  );
}
export function translate(
  locale: Locale,
  key: string,
  values: Record<string, string | number> = {},
): string {
  const template = locale === "zh" ? (chineseMessages[key] ?? key) : key;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    String(values[name] ?? match),
  );
}
export const chineseMessages: Record<string, string> = {
  ...documentMessages,
  ...chinese,
};
