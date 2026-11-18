import { randomBytes, createHash } from "node:crypto";
import { sessionCodec, AuthenticationError } from "../catalog/auth.mjs";
import { first } from "../catalog/database.mjs";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const random = () => randomBytes(32).toString("base64url");
const cookieValue = (request, name) =>
  (request.headers.cookie || "")
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(name + "="))
    ?.slice(name.length + 1);
export function safeReturnTo(value, origin) {
  try {
    const url = new URL(value || "/zh/examples/", origin);
    if (
      url.origin !== origin ||
      !/^\/(?:zh\/)?(?:examples|cases|research|submit|account|works)(?:\/|$)/.test(
        url.pathname,
      )
    )
      return "/zh/examples/";
    return url.pathname + url.search + url.hash;
  } catch {
    return "/zh/examples/";
  }
}
export function createCommunityAuth({
  url,
  publishableKey,
  database,
  origin,
  secret,
  fetcher = fetch,
  clock = Date.now,
}) {
  const codec = sessionCodec(secret),
    secure = new URL(origin).protocol === "https:";
  const name = secure ? "__Host-gamemap-community" : "gamemap-community";
  const flowName = secure
    ? "__Host-gamemap-community-flow"
    : "gamemap-community-flow";
  const refreshing = new Map(),
    lifetime = 7 * 86400000;
  const cookie = (key, value, age, sameSite = "Strict") =>
    `${key}=${value}; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=${age}${secure ? "; Secure" : ""}`;
  async function api(path, { method = "GET", body, token } = {}) {
    let response;
    try {
      response = await fetcher(new URL(path, new URL("/auth/v1/", url)), {
        method,
        signal: AbortSignal.timeout(15000),
        headers: {
          apikey: publishableKey,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch {
      throw Object.assign(
        new Error("Authentication service is temporarily unavailable"),
        { status: 503 },
      );
    }
    if (!response.ok) {
      if (response.status === 429)
        throw Object.assign(new Error("Please wait before trying again"), {
          status: 429,
        });
      if (response.status >= 500)
        throw Object.assign(
          new Error("Authentication service is temporarily unavailable"),
          { status: 503 },
        );
      throw new AuthenticationError(
        "Authentication was not accepted. Check your details or verify your email.",
      );
    }
    return response.status === 204 ? null : response.json();
  }
  async function verified(token) {
    const user = await api("user", { token });
    if (!user?.id || !(user.email_confirmed_at || user.confirmed_at))
      throw new AuthenticationError(
        "Verify your email before participating.",
        403,
      );
    return { id: user.id, email: user.email || "" };
  }
  async function publicProfile(userId, displayName = null) {
    return database.user(
      userId,
      async (client) =>
        (
          await first(
            client,
            "select public.community_profile($1) as profile",
            [displayName],
          )
        ).profile,
    );
  }
  function tokenData(value) {
    if (!value?.access_token || !value?.refresh_token)
      throw new AuthenticationError();
    return {
      accessToken: value.access_token,
      refreshToken: value.refresh_token,
      expiresAt: clock() + (value.expires_in || 3600) * 1000,
    };
  }
  async function createSession(value, displayName) {
    const tokens = tokenData(value),
      user = await verified(tokens.accessToken),
      profile = await publicProfile(user.id, displayName || null);
    const id = random(),
      payload = { ...tokens, csrf: random(), user, profile };
    await database.system(async (client) => {
      await client.query(
        "delete from community.sessions where expires_at < now()",
      );
      await client.query(
        "insert into community.sessions(id_hash,user_id,encrypted_payload,expires_at) values($1,$2,$3,$4)",
        [
          hash(id),
          user.id,
          codec.seal(payload),
          new Date(clock() + lifetime).toISOString(),
        ],
      );
      await client.query(
        "delete from community.sessions where user_id=$1 and id_hash in (select id_hash from community.sessions where user_id=$1 order by created_at desc offset 5)",
        [user.id],
      );
    });
    return { cookie: cookie(name, id, lifetime / 1000), session: payload };
  }
  async function newFlow(returnTo, displayName) {
    const id = random(),
      verifier = random(),
      challenge = createHash("sha256").update(verifier).digest("base64url");
    const callback = new URL("/auth/callback", origin);
    callback.searchParams.set("state", id);
    await database.system(async (client) => {
      await client.query(
        "delete from community.auth_flows where expires_at < now()",
      );
      await client.query(
        "insert into community.auth_flows(id_hash,encrypted_payload,expires_at) values($1,$2,$3)",
        [
          hash(id),
          codec.seal({
            verifier,
            returnTo: safeReturnTo(returnTo, origin),
            displayName,
          }),
          new Date(clock() + 20 * 60000).toISOString(),
        ],
      );
    });
    return {
      id,
      challenge,
      callback: callback.href,
      cookie: cookie(flowName, id, 20 * 60, "Lax"),
    };
  }
  return {
    clearCookie: () => cookie(name, "", 0),
    clearFlowCookie: () => cookie(flowName, "", 0, "Lax"),
    async settings() {
      const settings = await api("settings");
      return {
        github: Boolean(settings.external?.github),
        signup: !settings.disable_signup,
        email: Boolean(settings.external?.email ?? true),
      };
    },
    async signup({ email, password, displayName, returnTo }) {
      const flow = await newFlow(returnTo, displayName);
      const value = await api(
        `signup?redirect_to=${encodeURIComponent(flow.callback)}`,
        {
          method: "POST",
          body: {
            email,
            password,
            data: { display_name: displayName },
            code_challenge: flow.challenge,
            code_challenge_method: "s256",
          },
        },
      );
      // An explicitly auto-confirming development Auth service can return a session.
      // Normally signup is completed only by following the real confirmation email.
      if (value?.access_token)
        return {
          ...(await createSession(value, displayName)),
          flowCookie: flow.cookie,
          verificationRequired: false,
        };
      return { flowCookie: flow.cookie, verificationRequired: true };
    },
    async login(email, password) {
      return createSession(
        await api("token?grant_type=password", {
          method: "POST",
          body: { email, password },
        }),
      );
    },
    async magicLink(email, returnTo) {
      const flow = await newFlow(returnTo);
      await api(`otp?redirect_to=${encodeURIComponent(flow.callback)}`, {
        method: "POST",
        body: {
          email,
          create_user: true,
          code_challenge: flow.challenge,
          code_challenge_method: "s256",
        },
      });
      return { flowCookie: flow.cookie };
    },
    async github(returnTo) {
      if (!(await this.settings()).github)
        throw Object.assign(
          new Error("GitHub login has not been configured yet"),
          { status: 503 },
        );
      const flow = await newFlow(returnTo),
        target = new URL("/auth/v1/authorize", url);
      target.searchParams.set("provider", "github");
      target.searchParams.set("redirect_to", flow.callback);
      target.searchParams.set("code_challenge", flow.challenge);
      target.searchParams.set("code_challenge_method", "s256");
      return { url: target.href, flowCookie: flow.cookie };
    },
    async callback(request, query) {
      const id = cookieValue(request, flowName);
      if (
        !id ||
        !/^[\w-]{43}$/.test(id) ||
        query.get("state") !== id ||
        !query.get("code") ||
        query.has("error")
      )
        throw new AuthenticationError(
          "The sign-in link expired or belongs to another browser.",
        );
      const row = await database.system((client) =>
        first(
          client,
          "delete from community.auth_flows where id_hash=$1 and expires_at>now() returning encrypted_payload",
          [hash(id)],
        ),
      );
      if (!row)
        throw new AuthenticationError(
          "The sign-in link expired or has already been used.",
        );
      const flow = codec.open(row.encrypted_payload),
        value = await api("token?grant_type=pkce", {
          method: "POST",
          body: { auth_code: query.get("code"), code_verifier: flow.verifier },
        });
      return {
        ...(await createSession(value, flow.displayName)),
        returnTo: safeReturnTo(flow.returnTo, origin),
      };
    },
    async read(request) {
      const id = cookieValue(request, name);
      if (!id || !/^[\w-]{43}$/.test(id)) return null;
      const row = await database.system((client) =>
        first(
          client,
          "select * from community.sessions where id_hash=$1 and expires_at>$2",
          [hash(id), new Date(clock()).toISOString()],
        ),
      );
      if (!row) return null;
      let value;
      try {
        value = codec.open(row.encrypted_payload);
      } catch {
        return null;
      }
      if (value.expiresAt < clock() + 60000) {
        if (!refreshing.has(row.id_hash)) {
          const task = (async () => {
            const tokens = tokenData(
              await api("token?grant_type=refresh_token", {
                method: "POST",
                body: { refresh_token: value.refreshToken },
              }),
            );
            const user = await verified(tokens.accessToken);
            if (user.id !== row.user_id) throw new AuthenticationError();
            const next = { ...value, ...tokens, user };
            await database.system((client) =>
              client.query(
                "update community.sessions set encrypted_payload=$2 where id_hash=$1",
                [row.id_hash, codec.seal(next)],
              ),
            );
            return next;
          })();
          refreshing.set(row.id_hash, task);
          task.finally(() => refreshing.delete(row.id_hash)).catch(() => {});
        }
        try {
          value = await refreshing.get(row.id_hash);
        } catch {
          await database.system((client) =>
            client.query("delete from community.sessions where id_hash=$1", [
              row.id_hash,
            ]),
          );
          return null;
        }
      }
      try {
        const user = await verified(value.accessToken);
        if (user.id !== row.user_id) return null;
        return { ...value, user, profile: await publicProfile(user.id) };
      } catch (error) {
        if (!(error instanceof AuthenticationError)) throw error;
        await database.system((client) =>
          client.query("delete from community.sessions where id_hash=$1", [
            row.id_hash,
          ]),
        );
        return null;
      }
    },
    async logout(request, session) {
      const id = cookieValue(request, name);
      if (id)
        await database.system((client) =>
          client.query("delete from community.sessions where id_hash=$1", [
            hash(id),
          ]),
        );
      if (session)
        await api("logout?scope=local", {
          method: "POST",
          token: session.accessToken,
        }).catch(() => {});
    },
  };
}
