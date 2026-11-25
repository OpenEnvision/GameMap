import { createContext } from "react";
import type { UseSearchReturn } from "fumadocs-core/search/client";
import type { SearchScope } from "./search-scopes";

type AtlasSearchState = UseSearchReturn & {
  scope: SearchScope;
  onScopeChange: (scope: SearchScope) => void;
  retry: () => void;
};

// Lives apart from search-state.tsx so hot updates keep one context object.
// That module exports hooks, so Fast Refresh re-runs it whenever a dependency
// such as zh.json is written. A context created there would be replaced, and
// the search dialog loaded after the update could no longer find the provider
// mounted before it.
export const SearchState = createContext<AtlasSearchState | null>(null);
