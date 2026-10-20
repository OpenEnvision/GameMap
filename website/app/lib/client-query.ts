import { useSyncExternalStore } from "react";
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
  return [hydrated ? params : empty, setParams, hydrated] as const;
}
