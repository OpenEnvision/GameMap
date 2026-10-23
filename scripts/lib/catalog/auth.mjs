import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from "node:crypto";
import { first } from "./database.mjs";
import { sha256 } from "./codec.mjs";

export class AuthenticationError extends Error {
  constructor(message = "Sign in again to continue", status = 401) {
    super(message);
    this.status = status;
  }
}
export function createSupabaseAuth(url, publishableKey, fetcher = fetch) {
  const base = new URL("/auth/v1/", url);
  async function request(path, { token, body, method = "GET" } = {}) {
    let response;
    try {
      response = await fetcher(new URL(path, base), {
        method,
        headers: {
          apikey: publishableKey,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      throw Object.assign(
        new Error("Authentication service is temporarily unavailable"),
        { status: 503 },
      );
    }
    if (response.status >= 500)
      throw Object.assign(
        new Error("Authentication service is temporarily unavailable"),
        { status: 503 },
      );
    if (!response.ok)
      throw new AuthenticationError(
        "Email, password or session was not accepted",
      );
    if (response.status === 204) return null;
    return response.json();
  }
  const tokens = (result) => {
    if (!result?.access_token || !result?.refresh_token || !result.user?.id)
      throw new AuthenticationError();
    return {
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
      expiresAt: Date.now() + Number(result.expires_in || 3600) * 1000,
      user: { id: result.user.id, email: result.user.email || "" },
    };
  };
  return {
    signIn: async (email, password) =>
      tokens(
        await request("token?grant_type=password", {
          method: "POST",
          body: { email, password },
        }),
      ),
    refresh: async (refreshToken) =>
      tokens(
        await request("token?grant_type=refresh_token", {
          method: "POST",
          body: { refresh_token: refreshToken },
        }),
      ),
    user: async (token) => {
      const user = await request("user", { token });
      if (!user?.id) throw new AuthenticationError();
      return { id: user.id, email: user.email || "" };
    },
    signOut: async (token) => {
      await request("logout", { token, method: "POST" });
    },
  };
}
export function sessionCodec(secret) {
  if (typeof secret !== "string" || secret.length < 32)
    throw new Error(
      "CATALOG_SESSION_SECRET must contain at least 32 random characters",
    );
  const key = createHash("sha256").update(secret).digest();
  return {
    seal(value) {
      const iv = randomBytes(12),
        cipher = createCipheriv("aes-256-gcm", key, iv);
      const bytes = Buffer.concat([
        cipher.update(JSON.stringify(value), "utf8"),
        cipher.final(),
      ]);
      return [iv, cipher.getAuthTag(), bytes]
        .map((part) => part.toString("base64url"))
        .join(".");
    },
    open(value) {
      try {
        const [iv, tag, bytes] = value
          .split(".")
          .map((part) => Buffer.from(part, "base64url"));
        const cipher = createDecipheriv("aes-256-gcm", key, iv);
        cipher.setAuthTag(tag);
        return JSON.parse(
          Buffer.concat([cipher.update(bytes), cipher.final()]).toString(
            "utf8",
          ),
        );
      } catch {
        throw new AuthenticationError();
      }
    },
  };
}
export function createSessions(
  database,
  auth,
  { secret, origin, lifetime = 8 * 60 * 60 * 1000, clock = Date.now },
) {
  const codec = sessionCodec(secret),
    secure = new URL(origin).protocol === "https:";
  const cookieName = secure ? "__Host-gamemap-studio" : "gamemap-studio";
  const refreshing = new Map();
  const cookie = (value, age = Math.floor(lifetime / 1000)) =>
    `${cookieName}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${secure ? "; Secure" : ""}`;
  async function save(id, value) {
    await database.system((client) =>
      client.query(
        "update catalog.studio_sessions set encrypted_payload = $2 where id_hash = $1",
        [id, codec.seal(value)],
      ),
    );
  }
  return {
    clearCookie: () => cookie("", 0),
    async login(email, password) {
      const value = {
        ...(await auth.signIn(email, password)),
        csrf: randomBytes(32).toString("base64url"),
      };
      const verified = await auth.user(value.accessToken);
      if (verified.id !== value.user.id) throw new AuthenticationError();
      const role = await database.user(
        verified.id,
        async (client) =>
          (await first(client, "select public.catalog_role() as role")).role,
      );
      if (!role) {
        await auth.signOut(value.accessToken).catch(() => {});
        throw new AuthenticationError(
          "This account has not been provisioned for Studio",
          403,
        );
      }
      const sid = randomBytes(32).toString("base64url"),
        hash = sha256(sid);
      await database.system(async (client) => {
        await client.query(
          "delete from catalog.studio_sessions where expires_at < now()",
        );
        await client.query(
          "insert into catalog.studio_sessions(id_hash, user_id, encrypted_payload, expires_at) values($1, $2, $3, $4)",
          [
            hash,
            verified.id,
            codec.seal(value),
            new Date(clock() + lifetime).toISOString(),
          ],
        );
        await client.query(
          "delete from catalog.studio_sessions where user_id = $1 and id_hash in (select id_hash from catalog.studio_sessions where user_id = $1 order by created_at desc offset 5)",
          [verified.id],
        );
      });
      return {
        cookie: cookie(sid),
        session: { user: verified, role, csrf: value.csrf },
      };
    },
    async read(request) {
      const sid = (request.headers.cookie || "")
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(cookieName + "="))
        ?.slice(cookieName.length + 1);
      if (!sid || !/^[\w-]{43}$/.test(sid)) return null;
      const hash = sha256(sid);
      const row = await database.system((client) =>
        first(
          client,
          "select * from catalog.studio_sessions where id_hash = $1 and expires_at > $2",
          [hash, new Date(clock()).toISOString()],
        ),
      );
      if (!row) return null;
      let value = codec.open(row.encrypted_payload);
      if (value.expiresAt < clock() + 60000) {
        if (!refreshing.has(hash)) {
          const task = (async () => {
            const next = {
              ...value,
              ...(await auth.refresh(value.refreshToken)),
            };
            if (next.user.id !== row.user_id) throw new AuthenticationError();
            await save(hash, next);
            return next;
          })();
          refreshing.set(hash, task);
          task
            .finally(() => {
              if (refreshing.get(hash) === task) refreshing.delete(hash);
            })
            .catch(() => {});
        }
        value = await refreshing.get(hash);
      }
      const user = await auth.user(value.accessToken);
      if (user.id !== row.user_id) throw new AuthenticationError();
      const role = await database.user(
        user.id,
        async (client) =>
          (await first(client, "select public.catalog_role() as role")).role,
      );
      if (!role)
        throw new AuthenticationError("Studio access was revoked", 403);
      return {
        user,
        role,
        csrf: value.csrf,
        idHash: hash,
        accessToken: value.accessToken,
      };
    },
    async logout(session) {
      if (session) {
        await database.system((client) =>
          client.query(
            "delete from catalog.studio_sessions where id_hash = $1",
            [session.idHash],
          ),
        );
        await auth.signOut(session.accessToken).catch(() => {});
      }
      return cookie("", 0);
    },
  };
}
