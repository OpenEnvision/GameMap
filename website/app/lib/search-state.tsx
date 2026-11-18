import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  experimental_useSearch as useSearch,
  type UseSearchReturn,
} from "fumadocs-core/search/client";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { dialogSearch } from "./content-search";
import { useSiteI18n } from "./i18n";

const State = createContext<UseSearchReturn | null>(null);

// One query/result state serves the homepage form, header shortcut and dialog.
// Keep it above Fumadocs' provider so its preloaded dialog and page children share it.
export function SearchStateProvider({ children }: { children: ReactNode }) {
  const { locale } = useSiteI18n();
  const query = useCallback(
    (value: string) => dialogSearch(value, locale),
    [locale],
  );
  const search = useSearch(query);
  const [settled, setSettled] = useState<{
    locale: typeof locale;
    data: NonNullable<UseSearchReturn["data"]>;
  }>();
  // The underlying hook retains previous results while another query/run loads or
  // fails. Associate only a new successful result with the current locale, so a
  // language switch cannot expose stale links from the previous language.
  if (
    search.search &&
    !search.isLoading &&
    !search.error &&
    search.data &&
    search.data !== settled?.data
  )
    setSettled({ locale, data: search.data });
  const data =
    search.data && settled?.locale === locale ? settled.data : undefined;
  return (
    <State.Provider value={{ ...search, data }}>{children}</State.Provider>
  );
}

export function useAtlasSearchState() {
  const state = useContext(State);
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
