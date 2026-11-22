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
import { createDirectCommunityClient } from "./community-direct";
/** Community accounts, ratings, comments and submissions work either with the
 * Node BFF (/api/community, VITE_GAMEMAP_COMMUNITY=1) or in BlogrXiv-style
 * zero-server Supabase Direct Mode on GitHub Pages
 * (VITE_GAMEMAP_COMMUNITY=1 + VITE_GAMEMAP_COMMUNITY_MODE=supabase-direct +
 * VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY). Plain static builds leave
 * VITE_GAMEMAP_COMMUNITY unset so no community request is made. */
export const defaultDirectSupabaseUrl =
  "https://ckewjnufjwgwbcuapxiw.supabase.co";
export const defaultDirectPublishableKey =
  "sb_publishable_MhGapjdqxzzxgbWXyaUrRA_-x2CO2aC";
export const communityDirectMode =
  import.meta.env?.VITE_GAMEMAP_COMMUNITY === "1" &&
  import.meta.env?.VITE_GAMEMAP_COMMUNITY_MODE === "supabase-direct";
export const communityEnabled = import.meta.env?.VITE_GAMEMAP_COMMUNITY === "1";
export type CommunityUser = {
  id: string;
  email: string;
  displayName: string;
  moderator?: boolean;
};
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
  directMode: boolean;
  request: <T>(
    path: string,
    options?: { method?: string; body?: unknown; file?: File },
  ) => Promise<T>;
  refreshSession: () => Promise<void>;
  loadStats: (keys: string[]) => void;
  updateStats: (key: string, stats: GameStats) => void;
  mediaUrl: (id: string) => string;
  resolveMediaUrl: (id: string) => Promise<string>;
  startGitHubLogin?: (returnTo: string) => Promise<string>;
};
const Context = createContext<State | null>(null);
export function useCommunity() {
  return useContext(Context);
}
export function CommunityScreenshot({ id, alt }: { id: string; alt: string }) {
  const community = useCommunity();
  const [src, setSrc] = useState<string>(() =>
    community?.directMode ? "" : `/community-media/${id}.webp`,
  );
  useEffect(() => {
    let cancelled = false;
    if (!community?.directMode) {
      setSrc(`/community-media/${id}.webp`);
      return;
    }
    void community.resolveMediaUrl(id).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [community, id]);
  if (!src) return null;
  return <img src={src} alt={alt} />;
}
/** Supplies community state only in builds served with the community API or direct mode.
 * Elsewhere useCommunity() returns null, so community UI renders nothing and no
 * /api/community request is made. */
export function CommunityProvider({ children }: { children: ReactNode }) {
  return communityEnabled ? (
    <ActiveCommunityProvider>{children}</ActiveCommunityProvider>
  ) : (
    children
  );
}
function ActiveCommunityProvider({ children }: { children: ReactNode }) {
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
  const directClient = useMemo(
    () =>
      communityDirectMode
        ? createDirectCommunityClient({
            supabaseUrl: String(
              import.meta.env?.VITE_SUPABASE_URL || defaultDirectSupabaseUrl,
            ),
            publishableKey: String(
              import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
                defaultDirectPublishableKey,
            ),
            basePath: String(import.meta.env?.BASE_URL || "/"),
          })
        : null,
    [],
  );
  const request = useCallback(
    async <T,>(
      path: string,
      options: { method?: string; body?: unknown; file?: File } = {},
    ): Promise<T> => {
      if (directClient) {
        return await directClient.request<T>(path, options);
      }
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
    [directClient],
  );
  const mediaUrl = useCallback(
    (id: string) =>
      directClient
        ? directClient.publicMediaUrl(id)
        : `/community-media/${id}.webp`,
    [directClient],
  );
  const resolveMediaUrl = useCallback(
    async (id: string) =>
      directClient
        ? await directClient.resolvePrivateMediaUrl(id)
        : `/community-media/${id}.webp`,
    [directClient],
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
      directMode: Boolean(directClient),
      request,
      refreshSession,
      loadStats,
      updateStats,
      mediaUrl,
      resolveMediaUrl,
      startGitHubLogin: directClient?.startGitHubLogin,
    }),
    [
      user,
      ready,
      version,
      settings,
      stats,
      unavailable,
      directClient,
      request,
      refreshSession,
      loadStats,
      updateStats,
      mediaUrl,
      resolveMediaUrl,
    ],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
