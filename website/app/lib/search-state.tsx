import { useCallback, useContext, useState, type ReactNode } from "react";
import { experimental_useSearch as useSearch } from "fumadocs-core/search/client";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useLocation } from "react-router";
import { dialogSearch } from "./content-search";
import { useSiteI18n } from "./i18n";
import { searchScopeForPath, type SearchScope } from "./search-scopes";
import { SearchState } from "./search-state-context";

// One query/result state serves the homepage form, header shortcut and dialog.
// Keep it above Fumadocs' provider so its preloaded dialog and page children share it.
export function SearchStateProvider({ children }: { children: ReactNode }) {
  const { locale } = useSiteI18n();
  const { pathname } = useLocation();
  const [choice, setChoice] = useState<{
    pathname: string;
    scope: SearchScope;
  }>();
  const [attempt, setAttempt] = useState(0);
  const scope =
    choice?.pathname === pathname ? choice.scope : searchScopeForPath(pathname);
  const query = useCallback(
    (value: string) => dialogSearch(value, locale, scope),
    [locale, scope, attempt],
  );
  const search = useSearch(query);
  // The search hook keeps the last result while a new query, scope or locale loads.
  const current = !search.isLoading && Boolean(search.search.trim());
  return (
    <SearchState.Provider
      value={{
        ...search,
        data:
          current && !search.error && search.data?.query === search.search
            ? search.data
            : undefined,
        error: current ? search.error : undefined,
        scope,
        onScopeChange: (next) => setChoice({ pathname, scope: next }),
        retry: () => setAttempt((previous) => previous + 1),
      }}
    >
      {children}
    </SearchState.Provider>
  );
}

export function useAtlasSearchState() {
  const state = useContext(SearchState);
  if (!state) throw new Error("Atlas search requires SearchStateProvider");
  return state;
}

export function useOpenAtlasSearch() {
  const { onSearchChange } = useAtlasSearchState();
  const { setOpenSearch } = useSearchContext();
  return useCallback(
    (query: string) => {
      onSearchChange(query);
      setOpenSearch(true);
    },
    [onSearchChange, setOpenSearch],
  );
}
