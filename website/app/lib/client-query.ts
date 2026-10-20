import { useCallback, useSyncExternalStore } from "react";
import { useSearchParams } from "react-router";

const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;
const empty = new URLSearchParams();

export const useHydrated = () =>
  useSyncExternalStore(subscribe, onClient, onServer);

// Static HTML cannot know query strings or fragments. Match its initial render,
// then apply browser state; client-side navigations can use it immediately.
export function useClientQuery() {
  const hydrated = useHydrated();
  const [params, setParams] = useSearchParams();
  const setClientParams: typeof setParams = useCallback((next, options) => {
    // Navigation updates the address bar before React necessarily commits it.
    // Functional updates must compose against that URL, not an older render.
    setParams(typeof next === "function"
      ? next(new URLSearchParams(window.location.search)) : next, options);
  }, [setParams]);
  return [hydrated ? params : empty, setClientParams, hydrated] as const;
}
