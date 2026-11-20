import { createContext } from "react";
import type { UseSearchReturn } from "fumadocs-core/search/client";

// Lives apart from search-state.tsx so hot updates keep one context object.
// That module exports hooks, so Fast Refresh re-runs it whenever a dependency
// such as zh.json is written. A context created there would be replaced, and
// the search dialog loaded after the update could no longer find the provider
// mounted before it.
export const SearchState = createContext<UseSearchReturn | null>(null);
