import documentData from "../.content/manifest.json";
import { sources, catalogs } from "./source-data";
import { createRegistry } from "./registry-core";
import { localizedRegistry } from "./localization.server";
import { localeFromPath, type Locale } from "./locale";
import type { ContentRegistry, DocumentMetadata } from "./models";
const documents = documentData as DocumentMetadata[];

export const content = createRegistry(sources, documents);
const localized = new Map<string, ContentRegistry>();
export function contentIn(locale: Locale) {
  if (!localized.has(locale))
    localized.set(locale, localizedRegistry(content, locale, catalogs));
  return localized.get(locale)!;
}
export function contentFor(request: Request) {
  return contentIn(
    localeFromPath(new URL(request.url).pathname, import.meta.env.BASE_URL),
  );
}
export { documents };
export { contentKinds } from "./models";
export { pages, navigation, url } from "./site";
export { sources };
