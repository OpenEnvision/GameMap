import type { CommunityUser, CommunityWork } from "./community";

export type DirectSessionRecord = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    id: string;
    email: string;
  };
};

export type NormalizedBrowserImage = {
  id: string;
  bytes: Uint8Array;
  width: number;
  height: number;
};

export type StorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

const SESSION_KEY = "gamemap.community.direct.session.v1";
const PKCE_KEY = "gamemap.community.direct.pkce.v1";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i]);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", copy.buffer);
  return toHex(new Uint8Array(digest));
}

export async function createPkcePair(): Promise<{
  verifier: string;
  challenge: string;
}> {
  const random = new Uint8Array(32);
  globalThis.crypto.getRandomValues(random);
  const verifier = toBase64Url(random);
  const encoded = new TextEncoder().encode(verifier);
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    encoded.buffer,
  );
  return {
    verifier,
    challenge: toBase64Url(new Uint8Array(digest)),
  };
}

/** Browser-side image decoder & EXIF-stripping WebP normalizer (replaces server Sharp in zero-VPS mode). */
export async function normalizeBrowserImageToWebp(
  file: File,
): Promise<NormalizedBrowserImage> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    throw new Error("Only PNG, JPEG and WebP images are accepted");
  }
  if (file.size < 1 || file.size > 10 * 1024 * 1024) {
    throw new Error("Each image must be at most 10 MB");
  }
  if (typeof globalThis.createImageBitmap !== "function") {
    throw new Error("Browser image decoding is unavailable");
  }
  const bitmap = await globalThis.createImageBitmap(file);
  try {
    const width = bitmap.width;
    const height = bitmap.height;
    if (
      width < 1 ||
      height < 1 ||
      width > 10000 ||
      height > 10000 ||
      width * height > 40_000_000
    ) {
      throw new Error("Image dimensions exceed limits");
    }
    let blob: Blob | null = null;
    if (typeof globalThis.OffscreenCanvas === "function") {
      const canvas = new globalThis.OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context is unavailable");
      ctx.drawImage(bitmap, 0, 0);
      blob = await canvas.convertToBlob({ type: "image/webp", quality: 0.92 });
    } else if (typeof document !== "undefined") {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context is unavailable");
      ctx.drawImage(bitmap, 0, 0);
      blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.92),
      );
    }
    if (!blob) throw new Error("Failed to normalize screenshot to WebP");
    const bytes = new Uint8Array(await blob.arrayBuffer());
    if (bytes.byteLength < 1 || bytes.byteLength > 10 * 1024 * 1024) {
      throw new Error("Normalized WebP exceeds 10 MB");
    }
    const id = await sha256Hex(bytes);
    return { id, bytes, width, height };
  } finally {
    bitmap.close?.();
  }
}

function defaultStorage(): StorageLike {
  const memory = new Map<string, string>();
  return {
    getItem: (key) => {
      try {
        return globalThis.localStorage?.getItem(key) ?? memory.get(key) ?? null;
      } catch {
        return memory.get(key) ?? null;
      }
    },
    setItem: (key, value) => {
      memory.set(key, value);
      try {
        globalThis.localStorage?.setItem(key, value);
      } catch {
        // Ignore private-browsing quota errors
      }
    },
    removeItem: (key) => {
      memory.delete(key);
      try {
        globalThis.localStorage?.removeItem(key);
      } catch {
        // Ignore
      }
    },
  };
}

export function createDirectCommunityClient({
  supabaseUrl,
  publishableKey,
  basePath = "/",
  fetcher = globalThis.fetch,
  storage = defaultStorage(),
  normalizeImage = normalizeBrowserImageToWebp,
}: {
  supabaseUrl: string;
  publishableKey: string;
  basePath?: string;
  fetcher?: typeof globalThis.fetch;
  storage?: StorageLike;
  normalizeImage?: (file: File) => Promise<NormalizedBrowserImage>;
}) {
  const cleanUrl = supabaseUrl.replace(/\/+$/, "");
  const cleanBase = basePath.endsWith("/") ? basePath : basePath + "/";
  const blobUrlCache = new Map<string, string>();

  const readStoredSession = (): DirectSessionRecord | null => {
    const raw = storage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as DirectSessionRecord;
      if (
        parsed &&
        typeof parsed.accessToken === "string" &&
        typeof parsed.refreshToken === "string" &&
        parsed.user?.id
      ) {
        return parsed;
      }
    } catch {
      // Ignore corrupt session
    }
    storage.removeItem(SESSION_KEY);
    return null;
  };

  const writeStoredSession = (payload: {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    expires_at?: number;
    user?: { id?: string; email?: string };
  }): DirectSessionRecord | null => {
    if (
      !payload?.access_token ||
      !payload?.refresh_token ||
      !payload?.user?.id
    ) {
      return null;
    }
    const expiresAt = payload.expires_at
      ? payload.expires_at * 1000
      : Date.now() + Number(payload.expires_in || 3600) * 1000;
    const record: DirectSessionRecord = {
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      expiresAt,
      user: {
        id: payload.user.id,
        email: payload.user.email || "",
      },
    };
    storage.setItem(SESSION_KEY, JSON.stringify(record));
    return record;
  };

  const clearStoredSession = () => {
    storage.removeItem(SESSION_KEY);
  };

  const authHeaders = (token?: string, extra: Record<string, string> = {}) => ({
    apikey: publishableKey,
    Authorization: `Bearer ${token || publishableKey}`,
    ...extra,
  });

  const parseError = async (
    response: Response,
    fallback: string,
  ): Promise<Error> => {
    try {
      const body = await response.json();
      const message =
        body?.message ||
        body?.msg ||
        body?.error_description ||
        body?.error?.message ||
        (typeof body?.error === "string" ? body.error : "") ||
        fallback;
      return new Error(message);
    } catch {
      return new Error(fallback);
    }
  };

  const getValidSession = async (): Promise<DirectSessionRecord | null> => {
    const current = readStoredSession();
    if (!current) return null;
    if (current.expiresAt - Date.now() > 30_000) return current;
    const response = await fetcher(
      `${cleanUrl}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: authHeaders(undefined, { "Content-Type": "application/json" }),
        body: JSON.stringify({ refresh_token: current.refreshToken }),
      },
    );
    if (!response.ok) {
      clearStoredSession();
      return null;
    }
    return writeStoredSession(await response.json());
  };

  const exchangeUrlAuthCallbackIfPresent = async (): Promise<void> => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      const rawPkce = storage.getItem(PKCE_KEY);
      storage.removeItem(PKCE_KEY);
      const pkce = rawPkce
        ? (JSON.parse(rawPkce) as { verifier?: string })
        : null;
      if (pkce?.verifier) {
        const res = await fetcher(`${cleanUrl}/auth/v1/token?grant_type=pkce`, {
          method: "POST",
          headers: authHeaders(undefined, {
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            auth_code: code,
            code_verifier: pkce.verifier,
          }),
        });
        if (res.ok) {
          writeStoredSession(await res.json());
        }
      }
      url.searchParams.delete("code");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
      return;
    }
    if (url.hash.includes("access_token=")) {
      const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const expiresIn = Number(hashParams.get("expires_in") || "3600");
      if (accessToken && refreshToken) {
        const userRes = await fetcher(`${cleanUrl}/auth/v1/user`, {
          headers: authHeaders(accessToken),
        });
        if (userRes.ok) {
          const user = await userRes.json();
          writeStoredSession({
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
            user,
          });
        }
      }
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  };

  const rpc = async <T>(
    fn: string,
    args: Record<string, unknown> = {},
    requireAuth = false,
  ): Promise<T> => {
    const session = await getValidSession();
    if (requireAuth && !session) {
      throw new Error("Sign in before continuing");
    }
    const response = await fetcher(`${cleanUrl}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: authHeaders(session?.accessToken, {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(args),
    });
    if (!response.ok) {
      if (response.status === 401) clearStoredSession();
      throw await parseError(response, "Community request failed");
    }
    if (response.status === 204) return undefined as T;
    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  };

  const accountCallbackUrl = (returnTo?: string) => {
    if (typeof window === "undefined") return "http://localhost/account/";
    const target = new URL(`${cleanBase}account/`, window.location.origin);
    if (returnTo) target.searchParams.set("returnTo", returnTo);
    return target.href;
  };

  const startGitHubLogin = async (returnTo?: string) => {
    const pkce = await createPkcePair();
    storage.setItem(
      PKCE_KEY,
      JSON.stringify({ verifier: pkce.verifier, returnTo }),
    );
    const authorize = new URL(`${cleanUrl}/auth/v1/authorize`);
    authorize.searchParams.set("provider", "github");
    authorize.searchParams.set("redirect_to", accountCallbackUrl(returnTo));
    authorize.searchParams.set("code_challenge", pkce.challenge);
    authorize.searchParams.set("code_challenge_method", "s256");
    if (typeof window !== "undefined") {
      window.location.assign(authorize.href);
    }
    return authorize.href;
  };

  const publicMediaUrl = (id: string) =>
    `${cleanUrl}/storage/v1/object/public/community-media-public/${id}.webp`;

  const resolvePrivateMediaUrl = async (
    id: string,
    ownerId?: string,
  ): Promise<string> => {
    const cached = blobUrlCache.get(id);
    if (cached) return cached;
    const session = await getValidSession();
    if (!session) return publicMediaUrl(id);
    const resolvedOwner =
      ownerId ||
      (await rpc<string | null>(
        "community_direct_upload_owner",
        { p_id: id },
        true,
      ).catch(() => null)) ||
      session.user.id;
    const response = await fetcher(
      `${cleanUrl}/storage/v1/object/authenticated/community-media-private/${resolvedOwner}/${id}.webp`,
      {
        headers: authHeaders(session.accessToken),
      },
    );
    if (!response.ok) return publicMediaUrl(id);
    const blob = await response.blob();
    if (typeof URL.createObjectURL === "function") {
      const objectUrl = URL.createObjectURL(blob);
      blobUrlCache.set(id, objectUrl);
      return objectUrl;
    }
    return publicMediaUrl(id);
  };

  const promoteScreenshotsToPublicBucket = async (screenshots: string[]) => {
    const session = await getValidSession();
    if (!session) throw new Error("Moderator session required");
    for (const id of screenshots) {
      const ownerId = await rpc<string | null>(
        "community_direct_upload_owner",
        { p_id: id },
        true,
      );
      if (!ownerId) continue;
      const getRes = await fetcher(
        `${cleanUrl}/storage/v1/object/authenticated/community-media-private/${ownerId}/${id}.webp`,
        {
          headers: authHeaders(session.accessToken),
        },
      );
      if (!getRes.ok) continue;
      const bytes = new Uint8Array(await getRes.arrayBuffer());
      const putRes = await fetcher(
        `${cleanUrl}/storage/v1/object/community-media-public/${id}.webp`,
        {
          method: "POST",
          headers: authHeaders(session.accessToken, {
            "Content-Type": "image/webp",
            "x-upsert": "true",
          }),
          body: bytes,
        },
      );
      if (!putRes.ok) {
        throw await parseError(
          putRes,
          "Failed to publish approved screenshot to public storage",
        );
      }
    }
  };

  const request = async <T>(
    path: string,
    options: { method?: string; body?: unknown; file?: File } = {},
  ): Promise<T> => {
    const method = (options.method || "GET").toUpperCase();
    const body = (options.body || {}) as Record<string, unknown>;

    if (path === "/config" && method === "GET") {
      const res = await fetcher(`${cleanUrl}/auth/v1/settings`, {
        headers: authHeaders(),
      });
      if (!res.ok) {
        return { configured: true, github: false, signup: true } as T;
      }
      const settings = await res.json();
      return {
        configured: true,
        github: Boolean(settings?.external?.github),
        signup: !settings?.disable_signup,
      } as T;
    }

    if (path === "/session" && method === "GET") {
      await exchangeUrlAuthCallbackIfPresent();
      const session = await getValidSession();
      if (!session) {
        return { user: null, configured: true } as T;
      }
      const userRes = await fetcher(`${cleanUrl}/auth/v1/user`, {
        headers: authHeaders(session.accessToken),
      });
      if (!userRes.ok) {
        clearStoredSession();
        return { user: null, configured: true } as T;
      }
      const authUser = await userRes.json();
      const confirmed = Boolean(
        authUser?.email_confirmed_at || authUser?.confirmed_at,
      );
      if (!confirmed) {
        return { user: null, configured: true } as T;
      }
      const profile = await rpc<{ id: string; displayName: string }>(
        "community_profile",
        { p_name: null },
        true,
      );
      const moderator = await rpc<boolean>(
        "community_direct_is_moderator",
        {},
        true,
      ).catch(() => false);
      const user: CommunityUser = {
        id: profile.id,
        email: authUser.email || session.user.email,
        displayName: profile.displayName,
        moderator: Boolean(moderator),
      };
      return { user, configured: true } as T;
    }

    if (path === "/auth/login" && method === "POST") {
      const res = await fetcher(
        `${cleanUrl}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: authHeaders(undefined, {
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            email: String(body.email || ""),
            password: String(body.password || ""),
          }),
        },
      );
      if (!res.ok) throw await parseError(res, "Sign-in failed");
      const data = await res.json();
      writeStoredSession(data);
      await rpc("community_profile", { p_name: null }, true).catch(() => {});
      return { ok: true } as T;
    }

    if (path === "/auth/signup" && method === "POST") {
      const pkce = await createPkcePair();
      storage.setItem(
        PKCE_KEY,
        JSON.stringify({ verifier: pkce.verifier, returnTo: body.returnTo }),
      );
      const signupUrl = new URL(`${cleanUrl}/auth/v1/signup`);
      signupUrl.searchParams.set(
        "redirect_to",
        accountCallbackUrl(String(body.returnTo || "")),
      );
      const res = await fetcher(signupUrl.href, {
        method: "POST",
        headers: authHeaders(undefined, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: String(body.email || ""),
          password: String(body.password || ""),
          data: {
            display_name: String(body.displayName || "").trim(),
          },
          code_challenge: pkce.challenge,
          code_challenge_method: "s256",
        }),
      });
      if (!res.ok) throw await parseError(res, "Sign-up failed");
      const data = await res.json();
      if (data?.access_token && data?.refresh_token) {
        writeStoredSession(data);
        if (body.displayName) {
          await rpc(
            "community_profile",
            { p_name: String(body.displayName).trim() },
            true,
          ).catch(() => {});
        }
        return { verificationRequired: false } as T;
      }
      return { verificationRequired: true } as T;
    }

    if (path === "/auth/magic-link" && method === "POST") {
      const pkce = await createPkcePair();
      storage.setItem(
        PKCE_KEY,
        JSON.stringify({ verifier: pkce.verifier, returnTo: body.returnTo }),
      );
      const otpUrl = new URL(`${cleanUrl}/auth/v1/otp`);
      otpUrl.searchParams.set(
        "redirect_to",
        accountCallbackUrl(String(body.returnTo || "")),
      );
      const res = await fetcher(otpUrl.href, {
        method: "POST",
        headers: authHeaders(undefined, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: String(body.email || ""),
          create_user: true,
          code_challenge: pkce.challenge,
          code_challenge_method: "s256",
        }),
      });
      if (!res.ok) throw await parseError(res, "Failed to send sign-in link");
      return { ok: true } as T;
    }

    if (path === "/auth/logout" && method === "POST") {
      const session = readStoredSession();
      clearStoredSession();
      if (session) {
        await fetcher(`${cleanUrl}/auth/v1/logout`, {
          method: "POST",
          headers: authHeaders(session.accessToken),
        }).catch(() => {});
      }
      return { ok: true } as T;
    }

    if (path === "/profile" && method === "POST") {
      return await rpc<T>(
        "community_profile",
        { p_name: String(body.displayName || "").trim() },
        true,
      );
    }

    if (path.startsWith("/stats?") && method === "GET") {
      const search = new URLSearchParams(path.slice("/stats?".length));
      const keys = search.getAll("key");
      return await rpc<T>("community_game_stats", { p_keys: keys });
    }

    if (path.startsWith("/works") && method === "GET") {
      const qIdx = path.indexOf("?");
      const search = new URLSearchParams(qIdx >= 0 ? path.slice(qIdx + 1) : "");
      const offset = Number(search.get("offset") || "0");
      return await rpc<T>("community_works", { p_offset: offset });
    }

    const ratingMatch = /^\/games\/([^/]+)\/rating$/.exec(path);
    if (ratingMatch && method === "POST") {
      const gameKey = decodeURIComponent(ratingMatch[1]);
      return await rpc<T>(
        "community_rate",
        { p_key: gameKey, p_score: Number(body.score) },
        true,
      );
    }

    const commentsMatch = /^\/games\/([^/]+)\/comments$/.exec(path);
    if (commentsMatch && method === "POST") {
      const gameKey = decodeURIComponent(commentsMatch[1]);
      const id = await rpc<string>(
        "community_comment",
        { p_key: gameKey, p_body: String(body.body || "") },
        true,
      );
      return { id } as T;
    }

    const gameMatch = /^\/games\/([^/?]+)(?:\?(.*))?$/.exec(path);
    if (gameMatch && method === "GET") {
      const gameKey = decodeURIComponent(gameMatch[1]);
      const search = new URLSearchParams(gameMatch[2] || "");
      const before = search.get("before");
      return await rpc<T>("community_game", {
        p_key: gameKey,
        p_before: before || null,
      });
    }

    const deleteCommentMatch = /^\/comments\/([^/]+)$/.exec(path);
    if (deleteCommentMatch && method === "DELETE") {
      await rpc(
        "community_delete_comment",
        { p_id: deleteCommentMatch[1] },
        true,
      );
      return { ok: true } as T;
    }

    const reportMatch = /^\/comments\/([^/]+)\/report$/.exec(path);
    if (reportMatch && method === "POST") {
      await rpc(
        "community_report",
        { p_id: reportMatch[1], p_reason: String(body.reason || "") },
        true,
      );
      return { ok: true } as T;
    }

    if (path === "/uploads" && method === "POST") {
      if (!options.file) throw new Error("Select an image file to upload");
      const session = await getValidSession();
      if (!session) throw new Error("Sign in before uploading screenshots");
      const normalized = await normalizeImage(options.file);
      const objectName = `${session.user.id}/${normalized.id}.webp`;
      const uploadBody = new Uint8Array(normalized.bytes.byteLength);
      uploadBody.set(normalized.bytes);
      const uploadRes = await fetcher(
        `${cleanUrl}/storage/v1/object/community-media-private/${objectName}`,
        {
          method: "POST",
          headers: authHeaders(session.accessToken, {
            "Content-Type": "image/webp",
            "x-upsert": "true",
          }),
          body: new Blob([uploadBody.buffer], { type: "image/webp" }),
        },
      );
      if (!uploadRes.ok) {
        throw await parseError(uploadRes, "Screenshot upload failed");
      }
      await rpc(
        "community_direct_register_upload",
        {
          p_id: normalized.id,
          p_bytes: normalized.bytes.byteLength,
          p_width: normalized.width,
          p_height: normalized.height,
        },
        true,
      );
      return {
        id: normalized.id,
        width: normalized.width,
        height: normalized.height,
      } as T;
    }

    if (path === "/submissions" && method === "GET") {
      return await rpc<T>("community_my_submissions", {}, true);
    }

    if (path === "/submissions" && method === "POST") {
      const id = await rpc<string>(
        "community_submit",
        {
          p_payload: body.payload,
          p_id: body.id || null,
        },
        true,
      );
      return { id } as T;
    }

    const withdrawMatch = /^\/submissions\/([^/]+)\/withdraw$/.exec(path);
    if (withdrawMatch && method === "POST") {
      await rpc("community_withdraw", { p_id: withdrawMatch[1] }, true);
      return { ok: true } as T;
    }

    if (path === "/moderation" && method === "GET") {
      const queue = await rpc<{
        submissions: Array<{
          id: string;
          revision: number;
          payload: CommunityWork & { screenshots: string[] };
          author: string;
          createdAt: string;
        }>;
        reports: Array<{
          id: string;
          commentId: string;
          body: string;
          reason: string;
          gameKey: string;
          createdAt: string;
        }>;
      }>("community_moderation", {}, true);
      const published = await rpc<
        Array<{ id: string; title: string; author: string }>
      >("community_published_works", {}, true).catch(() => []);
      return { ...queue, published } as T;
    }

    if (path === "/moderation/review" && method === "POST") {
      const approve = Boolean(body.approve);
      if (approve && Array.isArray(body.screenshots)) {
        await promoteScreenshotsToPublicBucket(
          body.screenshots.map((x) => String(x)),
        );
      }
      await rpc(
        "community_review",
        {
          p_id: String(body.id || ""),
          p_revision: Number(body.revision),
          p_approve: approve,
          p_note: String(body.note || ""),
        },
        true,
      );
      return { ok: true } as T;
    }

    if (path === "/moderation/report" && method === "POST") {
      await rpc(
        "community_resolve_report",
        {
          p_id: String(body.id || ""),
          p_hide: Boolean(body.hide),
          p_note: String(body.note || ""),
        },
        true,
      );
      return { ok: true } as T;
    }

    if (path === "/moderation/unpublish" && method === "POST") {
      await rpc(
        "community_unpublish",
        {
          p_id: String(body.id || ""),
          p_note: String(body.note || ""),
        },
        true,
      );
      return { ok: true } as T;
    }

    if (path === "/moderation/sync-games" && method === "POST") {
      let games = body.games as
        | Array<{ key: string; payload: { title: string; url: string } }>
        | undefined;
      if (!games) {
        const manifestRes = await fetcher(`${cleanBase}content-manifest.json`);
        if (!manifestRes.ok) {
          throw new Error("Could not load static content-manifest.json");
        }
        const manifest = (await manifestRes.json()) as {
          records: Array<{
            key: string;
            kind: string;
            title: string;
            url: string;
          }>;
        };
        const ratable = new Set([
          "example",
          "foundation",
          "threejs-game",
          "repository-research",
        ]);
        games = (manifest.records || [])
          .filter((r) => ratable.has(r.kind))
          .map((r) => ({
            key: r.key,
            payload: { title: r.title, url: r.url },
          }));
      }
      return await rpc<T>(
        "community_direct_sync_games",
        { p_games: games },
        true,
      );
    }

    throw new Error(`Unsupported community route: ${method} ${path}`);
  };

  return {
    request,
    startGitHubLogin,
    publicMediaUrl,
    resolvePrivateMediaUrl,
  };
}
