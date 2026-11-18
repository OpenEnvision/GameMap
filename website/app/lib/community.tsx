import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
/** Community accounts, ratings, comments and submissions need the community API
 * (scripts/lib/community/server.mjs). Builds that are served together with that
 * API set VITE_GAMEMAP_COMMUNITY=1; plain static builds such as GitHub Pages do not.
 * Vite inlines the value in both the client and the prerender bundle; outside Vite
 * (node:test imports of app modules) import.meta.env is undefined, so it reads false. */
export const communityEnabled =
  import.meta.env?.VITE_GAMEMAP_COMMUNITY === "1";
export type CommunityUser = { id: string; email: string; displayName: string };
export type GameStats = {
  average: number;
  count: number;
  comments: number;
  mine: number | null;
};
export type CommunityWork = {
  key: string;
  id: string;
  title: string;
  description: string;
  engine: string;
  track: "2d" | "3d";
  accessKind: "playable" | "download";
  url: string;
  sourceUrl: string;
  screenshots: string[];
  author: string;
  license: string;
  aiUse: string;
  preview?: { width: number; height: number };
};
type Settings = { configured: boolean; github?: boolean; signup?: boolean };
type State = {
  user: CommunityUser | null;
  ready: boolean;
  version: number;
  settings: Settings;
  stats: Record<string, GameStats>;
  unavailable: boolean;
  request: <T>(
    path: string,
    options?: { method?: string; body?: unknown; file?: File },
  ) => Promise<T>;
  refreshSession: () => Promise<void>;
  loadStats: (keys: string[]) => void;
  updateStats: (key: string, stats: GameStats) => void;
};
const Context = createContext<State | null>(null);
export function useCommunity() {
  return useContext(Context);
}
export function CommunityProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CommunityUser | null>(null),
    [ready, setReady] = useState(false),
    [settings, setSettings] = useState<Settings>({ configured: false });
  const [stats, setStats] = useState<Record<string, GameStats>>({}),
    [unavailable, setUnavailable] = useState(false),
    [version, setVersion] = useState(0);
  const epoch = useRef(0);
  const csrf = useRef(""),
    queued = useRef(new Set<string>()),
    loaded = useRef(new Set<string>()),
    scheduled = useRef(false),
    active = useRef(true);
  const request = useCallback(
    async <T,>(
      path: string,
      options: { method?: string; body?: unknown; file?: File } = {},
    ): Promise<T> => {
      const response = await fetch("/api/community" + path, {
        method: options.method || "GET",
        credentials: "same-origin",
        headers: {
          ...(options.body !== undefined
            ? { "Content-Type": "application/json" }
            : {}),
          ...(options.file ? { "Content-Type": options.file.type } : {}),
          ...(csrf.current ? { "X-Community-CSRF": csrf.current } : {}),
        },
        body:
          options.file ||
          (options.body !== undefined
            ? JSON.stringify(options.body)
            : undefined),
      });
      let value;
      try {
        value = await response.json();
      } catch {
        throw new Error("Community service is unavailable");
      }
      if (!response.ok) {
        if (response.status === 401) {
          csrf.current = "";
          epoch.current++;
          loaded.current.clear();
          setUser(null);
          setStats({});
          setVersion((old) => old + 1);
        }
        throw new Error(value.error?.message || "Request failed");
      }
      return value as T;
    },
    [],
  );
  const refreshSession = useCallback(async () => {
    try {
      const value = await request<{
        user: CommunityUser | null;
        csrf?: string;
        configured: boolean;
      }>("/session");
      if (!active.current) return;
      csrf.current = value.csrf || "";
      setUser(value.user);
      setUnavailable(!value.configured);
      setSettings((old) => ({ ...old, configured: value.configured }));
      epoch.current++;
      loaded.current.clear();
      setStats({});
      setVersion((old) => old + 1);
    } catch {
      if (active.current) {
        csrf.current = "";
        epoch.current++;
        loaded.current.clear();
        setStats({});
        setVersion((old) => old + 1);
        setUser(null);
        setUnavailable(true);
      }
    } finally {
      if (active.current) setReady(true);
    }
  }, [request]);
  useEffect(() => {
    active.current = true;
    void refreshSession();
    void request<Settings>("/config")
      .then((value) => {
        if (active.current) setSettings(value);
      })
      .catch(() => {
        if (active.current) setUnavailable(true);
      });
    return () => {
      active.current = false;
    };
  }, [refreshSession, request]);
  const loadStats = useCallback(
    (keys: string[]) => {
      keys.forEach((key) => {
        if (!loaded.current.has(key)) queued.current.add(key);
      });
      if (scheduled.current || !queued.current.size) return;
      scheduled.current = true;
      queueMicrotask(() => {
        const requestEpoch = epoch.current;
        const pending = [...queued.current];
        queued.current.clear();
        scheduled.current = false;
        pending.forEach((key) => loaded.current.add(key));
        for (let index = 0; index < pending.length; index += 80) {
          const search = new URLSearchParams();
          pending
            .slice(index, index + 80)
            .forEach((key) => search.append("key", key));
          void request<Record<string, GameStats>>("/stats?" + search)
            .then((value) => {
              if (active.current && epoch.current === requestEpoch) {
                setStats((old) => ({ ...old, ...value }));
                setUnavailable(false);
              }
            })
            .catch(() => {
              if (active.current) setUnavailable(true);
            });
        }
      });
    },
    [request],
  );
  const updateStats = useCallback(
    (key: string, value: GameStats) =>
      setStats((old) => ({ ...old, [key]: value })),
    [],
  );
  const value = useMemo(
    () => ({
      user,
      ready,
      version,
      settings,
      stats,
      unavailable,
      request,
      refreshSession,
      loadStats,
      updateStats,
    }),
    [
      user,
      ready,
      version,
      settings,
      stats,
      unavailable,
      request,
      refreshSession,
      loadStats,
      updateStats,
    ],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
