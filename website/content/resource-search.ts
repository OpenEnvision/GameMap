import type { ContentEntry } from "./models";
import { translate } from "./locale";
import { searchableText } from "./search";
import taxonomy from "./taxonomy.json";
import { resourceRequirements } from "./resource-requirements";

// Keep previously published category names searchable after labels change.
const categoryAliases: Record<string, readonly string[]> = {
  agents: ["Coding agents", "编程代理"],
  engines: ["Game engines", "游戏引擎"],
  "2d": ["2D development", "2D 开发"],
  "3d": ["3D development", "3D 开发"],
  production: ["Game production", "游戏制作"],
  world: ["World models", "世界模型"],
};

type Vocabulary = Record<
  string,
  string | { label: string; documentLabel?: string }
>;
function facetText(
  vocabulary: Vocabulary | undefined,
  key: string | undefined,
) {
  if (!key) return [];
  const value = vocabulary?.[key];
  const labels =
    typeof value === "string"
      ? [value]
      : value
        ? [value.label, value.documentLabel || ""]
        : [];
  return [key, ...labels.flatMap((label) => [label, translate("zh", label)])];
}

/** One bilingual search text per stable resource ID, independent of page locale. */
export function buildResourceSearchText(
  english: readonly ContentEntry<"resource">[],
  chinese: readonly ContentEntry<"resource">[],
): Record<string, string> {
  const alternate = new Map(chinese.map((entry) => [entry.id, entry]));
  const vocabularies = taxonomy as Record<string, Vocabulary>;
  return Object.fromEntries(
    english.map((entry) => {
      const translated = alternate.get(entry.id);
      const data = entry.data as {
        category: string;
        type: string;
        collection?: string;
      };
      const text = [
        searchableText(entry),
        translated ? searchableText(translated) : "",
        ...facetText(vocabularies.categories, data.category),
        ...facetText(vocabularies.types, data.type),
        ...facetText(vocabularies.collections, data.collection),
        ...Object.values(resourceRequirements[entry.id] || {}).flatMap(
          (value) => [value, translate("zh", value)],
        ),
        ...(categoryAliases[data.category] || []),
      ];
      return [entry.id, [...new Set(text.filter(Boolean))].join("\n")];
    }),
  );
}
