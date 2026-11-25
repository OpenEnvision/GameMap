import { unlocalizedPath } from "../../content/locale";

export const searchScopes = [
  ["all", "Entire site"],
  ["docs", "Documentation"],
  ["tools", "Tools"],
  ["games", "Games"],
  ["research", "Research"],
] as const;

export type SearchScope = (typeof searchScopes)[number][0];

const kindsByScope: Record<Exclude<SearchScope, "all">, readonly string[]> = {
  docs: ["document"],
  tools: ["resource", "agent", "testing", "testing-pack", "demo"],
  games: ["example", "foundation", "threejs-game", "collection"],
  research: ["paper", "repository-research"],
};

export function searchScopeForPath(pathname: string): SearchScope {
  return /^\/docs(?:\/|$)/.test(unlocalizedPath(pathname)) ? "docs" : "all";
}

export function searchKindInScope(kind: string, scope: SearchScope) {
  return scope === "all" || kindsByScope[scope].includes(kind);
}
