import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createSearchParams, useLocation, useNavigationType } from "react-router";
import { useClientQuery } from "./client-query";

type SearchSetter = ReturnType<typeof useClientQuery>[1];
type QueryIntent = { search: string; sequence: number; baseKey: string };
type NavigationMarker = { owner: string; sequence: number };
const stateKey = "__gamemapReadingQuery";

/** Keep controlled reading filters responsive while Router loaders commit.
 * Pending updates compose against the latest intent, rather than a stale render.
 * Completed navigation, external links and browser history restore URL ownership.
 */
export function useReadingQuery() {
  const [committed, commit, hydrated] = useClientQuery();
  const location = useLocation();
  const navigationType = useNavigationType();
  const owner = useId();
  const committedSearch = committed.toString();
  const [optimisticSearch, setOptimisticSearch] = useState<string | null>(null);
  const pending = useRef<QueryIntent | null>(null);
  const sequence = useRef(0);
  const observedLocation = useRef({ key: location.key, pathname: location.pathname });

  const setParams = useCallback<SearchSetter>((nextInit, options) => {
    const previous = new URLSearchParams(pending.current?.search ?? window.location.search);
    const next = createSearchParams(typeof nextInit === "function" ? nextInit(previous) : nextInit);
    const search = next.toString();
    const intent = ++sequence.current;
    pending.current = { search, sequence: intent, baseKey: location.key };
    setOptimisticSearch(search);
    // Reading-filter navigations reserve one private state key. Other supplied
    // object-state fields remain intact; normal links carry no ownership marker.
    commit(next, { ...options, state: {
      ...options?.state,
      [stateKey]: { owner, sequence: intent } satisfies NavigationMarker,
    } });
  }, [commit, location.key, owner]);

  useEffect(() => {
    if (!hydrated) return;
    const previousLocation = observedLocation.current;
    const historyNavigation = navigationType === "POP" && previousLocation.key !== location.key;
    const changedPage = previousLocation.pathname !== location.pathname;
    observedLocation.current = { key: location.key, pathname: location.pathname };
    const browserSearch = new URLSearchParams(window.location.search).toString();
    if (committedSearch !== browserSearch) return;
    const marker = (location.state as Record<string, NavigationMarker> | null)?.[stateKey];
    if (pending.current && !historyNavigation && !changedPage) {
      // The pre-navigation render and older commits from this hook cannot erase
      // the user's newer input. An unmarked external PUSH/REPLACE can.
      if (location.key === pending.current.baseKey && committedSearch !== pending.current.search) return;
      if (marker?.owner === owner && marker.sequence < pending.current.sequence) return;
    }
    pending.current = null;
    setOptimisticSearch(null);
  }, [committedSearch, hydrated, location.key, location.pathname, location.state, navigationType, owner]);

  const params = useMemo(() => optimisticSearch === null
    ? committed : new URLSearchParams(optimisticSearch), [committed, optimisticSearch]);
  return [params, setParams, hydrated] as const;
}
