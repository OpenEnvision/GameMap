import { createHash } from "node:crypto";
import resources from "./i18n/content/resources.zh.json";
import paths from "./i18n/content/paths.zh.json";
import examples from "./i18n/content/examples.zh.json";
import toolkit from "./i18n/content/toolkit.zh.json";
import testing from "./i18n/content/testing.zh.json";
import fingerprints from "./i18n/content.zh.sources.json";
import docsMessages from "./doc-messages.json";
import type {
  ContentEntry,
  ContentKind,
  ContentRegistry,
  ContentBlock,
  Fact,
} from "./models";
import {
  localizedPath,
  documentLanguages,
  translate,
  chineseMessages,
  type Locale,
} from "./locale";
export type TranslationValue = string | string[];
export type ContentTranslations = Record<
  string,
  Record<string, TranslationValue>
>;
export const chineseContent: ContentTranslations = {};
for (const group of [resources, paths, examples, toolkit, testing])
  for (const [key, fields] of Object.entries(group)) {
    if (chineseContent[key])
      throw new Error(`Duplicate translation identity: ${key}`);
    chineseContent[key] = fields;
  }
export const translationSources = fingerprints as Record<
  string,
  Record<string, string>
>;
export const localizationSnapshot = {
  messages: chineseMessages,
  docsMessages,
  content: chineseContent,
  fingerprints: translationSources,
};
export const translationHash = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const structural = new Set([
  "id",
  "slug",
  "source",
  "sourceHash",
  "category",
  "type",
  "kind",
  "track",
  "stage",
  "terms",
  "role",
  "agents",
  "resourceIds",
  "testingIds",
  "dimensions",
  "stages",
  "official",
  "catalogResourceId",
  "recordingId",
  "referenceType",
  "primaryRole",
  "roles",
  "arxivId",
  "doi",
  "year",
]);
export function canTranslate(
  entry: Pick<ContentEntry, "blocks" | "data">,
  field: string,
) {
  if (structural.has(field)) return false;
  const value = (entry.data as unknown as Record<string, unknown>)[field];
  return entry.blocks.some(
    (block) =>
      block.field === field &&
      block.section !== "metadata" &&
      ((["title", "lead", "text"].includes(block.type) &&
        typeof value === "string" &&
        "value" in block &&
        block.value === value) ||
        (block.type === "list" &&
          Array.isArray(value) &&
          value.every((item) => typeof item === "string") &&
          JSON.stringify(value) === JSON.stringify(block.items))),
  );
}
function localFact(
  item: Fact,
  documents: ReturnType<typeof documentLanguages>,
): Fact {
  const label = translate("zh", item.label);
  return item.type === "group"
    ? {
        ...item,
        label,
        items: item.items.map((child) => localFact(child, documents)),
      }
    : item.type === "link"
      ? { ...item, label, url: localizedPath(item.url, "zh", documents) }
      : { ...item, label, value: translate("zh", item.value) };
}
function localBlock(
  block: ContentBlock,
  value: TranslationValue | undefined,
  nativeChinese: boolean,
  documents: ReturnType<typeof documentLanguages>,
): ContentBlock {
  const label =
    "label" in block && block.label
      ? { label: translate("zh", block.label) }
      : {};
  if (
    block.type === "title" ||
    block.type === "lead" ||
    block.type === "text"
  ) {
    const text =
      typeof value === "string" ? value : translate("zh", block.value);
    return {
      ...block,
      ...label,
      value: text,
      language:
        nativeChinese || value !== undefined || text !== block.value
          ? "zh"
          : "en",
    };
  }
  if (block.type === "list")
    return {
      ...block,
      ...label,
      items: Array.isArray(value)
        ? value
        : block.items.map((item) => translate("zh", item)),
      language: nativeChinese || value !== undefined ? "zh" : "en",
    };
  if (block.type === "facts")
    return {
      ...block,
      ...label,
      items: block.items.map((item) => localFact(item, documents)),
    };
  if (block.type === "links")
    return {
      ...block,
      ...label,
      items: block.items.map((item) => ({
        ...item,
        label: translate("zh", item.label),
        url: localizedPath(item.url, "zh", documents),
      })),
    };
  return { ...block, ...label };
}
export function localizeEntry<K extends ContentKind>(
  entry: ContentEntry<K>,
  locale: Locale,
  documents: ReturnType<typeof documentLanguages>,
): ContentEntry<K> {
  if (locale === "en") return entry;
  const nativeChinese = entry.kind === "document" && entry.id.startsWith("zh/");
  const raw = entry.data as unknown as Record<string, unknown>;
  const inherited: Record<string, TranslationValue> = {};
  if (entry.kind === "agent" && typeof raw.catalogResourceId === "string") {
    const source = `resource:${raw.catalogResourceId}`;
    for (const [target, field] of [
      ["title", "name"],
      ["summary", "summary"],
    ]) {
      const translated = chineseContent[source]?.[field];
      if (
        translated !== undefined &&
        canTranslate(entry, target) &&
        translationSources[source]?.[field] === translationHash(raw[target])
      )
        inherited[target] = translated;
    }
  }
  const values = {
    ...inherited,
    ...Object.fromEntries(
      Object.entries(chineseContent[entry.key] || {}).filter(
        ([field]) =>
          canTranslate(entry, field) &&
          translationSources[entry.key]?.[field] ===
            translationHash(raw[field]),
      ),
    ),
  };
  const blocks = entry.blocks.map((block) =>
    localBlock(block, values[block.field], nativeChinese, documents),
  );
  const title = blocks.find((block) => block.type === "title"),
    lead = blocks.find((block) => block.type === "lead");
  return {
    ...entry,
    data: { ...entry.data, ...values },
    blocks,
    title: title && "value" in title ? title.value : entry.title,
    description: lead && "value" in lead ? lead.value : entry.description,
    url: localizedPath(entry.url, locale, documents),
    collectionUrl: localizedPath(entry.collectionUrl, locale, documents),
    locale,
    originalTitle: entry.title,
    descriptionLanguage: nativeChinese || lead?.language === "zh" ? "zh" : "en",
  } as ContentEntry<K>;
}
export function localizedRegistry(
  registry: ContentRegistry,
  locale: Locale,
): ContentRegistry {
  if (locale === "en") return registry;
  const documents = documentLanguages(
    registry.all("document").map((entry) => entry.data),
  );
  const allEntries = registry.entries.map((entry) =>
    localizeEntry(entry, locale, documents),
  );
  const map = new Map(allEntries.map((entry) => [entry.key, entry]));
  // A translated article replaces its English counterpart in the Chinese reading view only.
  const entries = allEntries.filter(
    (entry) =>
      entry.kind !== "document" ||
      entry.id.startsWith("zh/") ||
      !documents.zh.includes(entry.id),
  );
  const get = <K extends ContentKind>(kind: K, id: string) =>
    ((kind === "document" &&
      !id.startsWith("zh/") &&
      map.get(`document:zh/${id}`)) ||
      map.get(`${kind}:${id}` as ContentEntry["key"])) as
      ContentEntry<K> | undefined;
  return {
    ...registry,
    entries,
    get,
    require: <K extends ContentKind>(kind: K, id: string) => {
      const entry = get(kind, id);
      if (!entry) throw new Error(`Missing content ${kind}:${id}`);
      return entry;
    },
    all: <K extends ContentKind>(kind: K) =>
      entries.filter((entry) => entry.kind === kind) as ContentEntry<K>[],
    byKey: (key) => map.get(key as ContentEntry["key"]),
    examplesFor: (ref) =>
      registry.examplesFor(ref).map((entry) => get("example", entry.id)!),
    demosFor: (id) =>
      registry.demosFor(id).map((entry) => get("demo", entry.id)!),
  };
}
