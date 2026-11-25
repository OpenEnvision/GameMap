import {
  normalizeSearch,
  parseSearchQuery,
  searchTitleScore,
} from "./matching";

/** Resolve published tool names without changing the visible search or its URL. */
export function parseDirectorySearchQuery(query: string) {
  return parseSearchQuery(
    normalizeSearch(query)
      .replace(/\bgame[\s_.\p{Pd}]+ci\b/gu, "gameci")
      .replace(/\bgdunit[\s_\p{Pd}]+4\b/gu, "gdunit4")
      .replace(/\bgodotmcp\b/g, "godot mcp")
      .replace(/\bunrealengine\b/g, "unreal engine")
      .replace(/虚幻\s*引擎/gu, " unreal engine "),
  );
}

export function compareDirectoryTitles(
  query: ReturnType<typeof parseSearchQuery>,
  first: string,
  second: string,
) {
  return searchTitleScore(second, query) - searchTitleScore(first, query);
}
