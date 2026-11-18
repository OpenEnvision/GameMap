import messages from "./doc-messages.json";
export type { Locale as DocLocale } from "./locale";
import type { Locale as DocLocale } from "./locale";
export { localeFromPath } from "./locale";
export function docLocale(slug: string): DocLocale {
  return slug === "zh" || slug.startsWith("zh/") ? "zh" : "en";
}
/** Source language does not change a namespaced archive's canonical route. */
export function documentBodyLocale(slug: string): DocLocale {
  return slug === "remote-source-index" || slug.startsWith("remote/zh/")
    ? "zh"
    : docLocale(slug);
}
export const docHome = (locale: DocLocale) =>
  locale === "zh" ? "/docs/zh/" : "/docs/";
export const docMessages = (locale: DocLocale) => messages[locale];
export const translationSlug = (slug: string, locale: DocLocale) =>
  locale === "zh"
    ? `zh/${slug.replace(/^zh\//, "")}`
    : slug.replace(/^zh\//, "");
