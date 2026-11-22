import { randomUUID, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { first, clientAddress } from "../catalog/database.mjs";
import { MediaUploadBusyError } from "../catalog/media.mjs";

const uuid = z.uuid(),
  gameKey = z.string().min(1).max(240),
  imageId = z.string().regex(/^[a-f0-9]{64}$/);
function publicURL(value) {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.href.length > 2048
    )
      return false;
    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (host.includes(":")) return !/^(?:::|f[cd]|fe80:)/.test(host);
    return !/^(?:localhost$|.*\.localhost$|.*\.local$|0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(
      host,
    );
  } catch {
    return false;
  }
}
export const submissionSchema = z.strictObject({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(10).max(4000),
  engine: z.string().trim().min(1).max(80),
  track: z.enum(["2d", "3d"]),
  accessKind: z.enum(["playable", "download"]),
  url: z.string().trim().refine(publicURL, "Use a public HTTPS game link"),
  sourceUrl: z
    .union([
      z.literal(""),
      z.string().trim().refine(publicURL, "Use a public HTTPS source link"),
    ])
    .default(""),
  license: z.string().trim().max(300).default(""),
  aiUse: z.enum(["not-stated", "none", "assisted", "generated"]),
  screenshots: z
    .array(imageId)
    .min(1)
    .max(5)
    .refine((ids) => new Set(ids).size === ids.length),
  rightsConfirmed: z.literal(true),
});
export const sendJSON = (res, status, body, headers = {}) => {
  const data = Buffer.from(JSON.stringify(body));
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": data.length,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  res.end(data);
};
async function readBytes(request, maximum) {
  if (Number(request.headers["content-length"] || 0) > maximum)
    throw Object.assign(new Error("Request is too large"), { status: 413 });
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maximum)
      throw Object.assign(new Error("Request is too large"), { status: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
async function jsonBody(request, schema) {
  if (!request.headers["content-type"]?.startsWith("application/json"))
    throw Object.assign(new Error("Use application/json"), { status: 415 });
  let input;
  try {
    input = JSON.parse((await readBytes(request, 64000)).toString("utf8"));
  } catch (error) {
    if (error.status) throw error;
    throw Object.assign(new Error("Invalid JSON"), { status: 400 });
  }
  return schema.parse(input);
}
function equal(left, right) {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const a = Buffer.from(left),
    b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}
export function createCommunityHandler({
  database,
  auth,
  media,
  origin,
  ensureIndex = async () => {},
  log = () => {},
  trustProxy = false,
  // Development previews keep their own rows under prefixed keys. Published
  // works are real submissions and stay shared.
  keyPrefix = "",
}) {
  const attempts = new Map();
  const storageKey = (key) =>
    keyPrefix && !key.startsWith("submission:") ? keyPrefix + key : key;
  const statsFor = (value) => {
    if (!keyPrefix || !value) return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, stats]) => [
        key.startsWith(keyPrefix) ? key.slice(keyPrefix.length) : key,
        stats,
      ]),
    );
  };
  function throttle(request, category, maximum, period) {
    const now = Date.now(),
      key = category + ":" + clientAddress(request, { trustProxy });
    if (attempts.size > 2000)
      for (const [id, value] of attempts)
        if (value.until < now) attempts.delete(id);
    const value = attempts.get(key);
    if (!value || value.until < now) {
      attempts.set(key, { count: 1, until: now + period });
      return;
    }
    if (++value.count > maximum)
      throw Object.assign(new Error("Please wait before trying again"), {
        status: 429,
      });
  }
  const rpc = (session, sql, parameters = []) =>
    session
      ? database.user(
          session.user.id,
          async (client) => (await first(client, sql, parameters)).result,
        )
      : database.anonymous(
          async (client) => (await first(client, sql, parameters)).result,
        );
  return async function handle(request, res) {
    let url;
    try {
      url = new URL(request.url, origin);
    } catch {
      return false;
    }
    const path = url.pathname;
    if (!(
      path.startsWith("/api/community/") ||
      path === "/auth/callback" ||
      path.startsWith("/community-media/")
    ))
      return false;
    const requestId = randomUUID();
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    try {
      if (!database || !auth) {
        sendJSON(
          res,
          path === "/api/community/config" || path === "/api/community/session"
            ? 200
            : 503,
          {
            configured: false,
            user: null,
            github: false,
            message: "Community service is not configured",
          },
        );
        return true;
      }
      const mutation = !["GET", "HEAD"].includes(request.method);
      if (
        mutation &&
        (request.headers.origin !== origin ||
          request.headers["sec-fetch-site"] === "cross-site")
      )
        throw Object.assign(
          new Error("Cross-origin changes are not accepted"),
          { status: 403 },
        );
      if (path === "/auth/callback" && request.method === "GET") {
        try {
          const result = await auth.callback(request, url.searchParams);
          res.writeHead(303, {
            Location: result.returnTo,
            "Set-Cookie": [result.cookie, auth.clearFlowCookie()],
          });
          res.end();
        } catch {
          res.writeHead(303, {
            Location: "/zh/account/?error=invalid_link",
            "Set-Cookie": auth.clearFlowCookie(),
          });
          res.end();
        }
        return true;
      }
      if (path === "/api/community/config" && request.method === "GET") {
        sendJSON(res, 200, { configured: true, ...(await auth.settings()) });
        return true;
      }
      if (path === "/api/community/auth/github" && request.method === "GET") {
        throttle(request, "auth", 12, 60000);
        const result = await auth.github(url.searchParams.get("returnTo"));
        res.writeHead(303, {
          Location: result.url,
          "Set-Cookie": result.flowCookie,
        });
        res.end();
        return true;
      }
      if (path === "/api/community/auth/signup" && request.method === "POST") {
        throttle(request, "signup", 5, 3600000);
        const input = await jsonBody(
          request,
          z.strictObject({
            email: z.email().max(254),
            password: z.string().min(12).max(128),
            displayName: z.string().trim().min(1).max(40),
            returnTo: z.string().max(2048).optional(),
          }),
        );
        const result = await auth.signup(input);
        res.setHeader("Set-Cookie", [
          result.flowCookie,
          ...(result.cookie ? [result.cookie] : []),
        ]);
        sendJSON(res, 200, {
          verificationRequired: result.verificationRequired,
          message: "Check your email to complete registration",
        });
        return true;
      }
      if (path === "/api/community/auth/login" && request.method === "POST") {
        throttle(request, "auth", 12, 60000);
        const input = await jsonBody(
          request,
          z.strictObject({
            email: z.email().max(254),
            password: z.string().min(1).max(128),
          }),
        );
        const result = await auth.login(input.email, input.password);
        sendJSON(
          res,
          200,
          {
            user: {
              ...result.session.user,
              displayName: result.session.profile.displayName,
            },
            csrf: result.session.csrf,
          },
          { "Set-Cookie": result.cookie },
        );
        return true;
      }
      if (
        path === "/api/community/auth/magic-link" &&
        request.method === "POST"
      ) {
        throttle(request, "email", 5, 3600000);
        const input = await jsonBody(
          request,
          z.strictObject({
            email: z.email().max(254),
            returnTo: z.string().max(2048).optional(),
          }),
        );
        const result = await auth.magicLink(input.email, input.returnTo);
        sendJSON(
          res,
          200,
          {
            message:
              "If this address can receive email, a sign-in link has been sent",
          },
          { "Set-Cookie": result.flowCookie },
        );
        return true;
      }
      const session = await auth.read(request);
      if (path === "/api/community/session" && request.method === "GET") {
        sendJSON(res, 200, {
          configured: true,
          user: session
            ? { ...session.user, displayName: session.profile.displayName }
            : null,
          csrf: session?.csrf,
        });
        return true;
      }
      if (mutation) {
        if (!session)
          throw Object.assign(
            new Error("Sign in with a verified email account"),
            { status: 401 },
          );
        if (!equal(request.headers["x-community-csrf"], session.csrf))
          throw Object.assign(
            new Error("Refresh the page before trying again"),
            { status: 403 },
          );
        throttle(request, "write", 100, 60000);
      }
      if (path === "/api/community/auth/logout" && request.method === "POST") {
        await auth.logout(request, session);
        sendJSON(res, 200, { ok: true }, { "Set-Cookie": auth.clearCookie() });
        return true;
      }
      if (path === "/api/community/profile" && request.method === "POST") {
        const input = await jsonBody(
          request,
          z.strictObject({ displayName: z.string().trim().min(1).max(40) }),
        );
        sendJSON(
          res,
          200,
          await rpc(session, "select public.community_profile($1) as result", [
            input.displayName,
          ]),
        );
        return true;
      }
      if (path.startsWith("/community-media/") && request.method === "GET") {
        const id = imageId.parse(
            path.slice("/community-media/".length).replace(/\.webp$/, ""),
          ),
          access = await rpc(
            session,
            "select public.community_media($1) as result",
            [id],
          );
        if (!access)
          throw Object.assign(new Error("Image is not available"), {
            status: 404,
          });
        const image = await media.get(id + ".webp");
        res.writeHead(200, {
          "Content-Type": image.mime,
          "Content-Length": image.bytes.length,
          "Cache-Control": session
            ? "private, no-store"
            : "public, max-age=300",
        });
        res.end(image.bytes);
        return true;
      }
      if (path === "/api/community/uploads" && request.method === "POST") {
        if (
          !/^image\/(?:png|jpeg|webp)(?:;|$)/.test(
            request.headers["content-type"] || "",
          )
        )
          throw Object.assign(
            new Error("Upload a PNG, JPEG or WebP screenshot"),
            { status: 415 },
          );
        const image = await media.upload(() =>
          readBytes(request, media.policy.maxBytes),
        );
        await rpc(
          session,
          "select public.community_register_upload($1,$2,$3,$4,$5) as result",
          [
            image.sha256,
            "website/public/" + image.path,
            image.bytes,
            image.width,
            image.height,
          ],
        );
        sendJSON(res, 201, {
          id: image.sha256,
          url: "/community-media/" + image.sha256 + ".webp",
          width: image.width,
          height: image.height,
        });
        return true;
      }
      if (path === "/api/community/submissions" && request.method === "GET") {
        if (!session)
          throw Object.assign(new Error("Sign in first"), { status: 401 });
        sendJSON(
          res,
          200,
          await rpc(
            session,
            "select public.community_my_submissions() as result",
          ),
        );
        return true;
      }
      if (path === "/api/community/submissions" && request.method === "POST") {
        const input = await jsonBody(
          request,
          z.strictObject({ payload: submissionSchema, id: uuid.optional() }),
        );
        sendJSON(res, 201, {
          id: await rpc(
            session,
            "select public.community_submit($1::jsonb,$2) as result",
            [JSON.stringify(input.payload), input.id || null],
          ),
        });
        return true;
      }
      const withdrawal =
        /^\/api\/community\/submissions\/([^/]+)\/withdraw$/.exec(path);
      if (withdrawal && request.method === "POST") {
        await rpc(session, "select public.community_withdraw($1) as result", [
          uuid.parse(withdrawal[1]),
        ]);
        sendJSON(res, 200, { ok: true });
        return true;
      }
      if (path === "/api/community/works" && request.method === "GET") {
        const offset = z.coerce
          .number()
          .int()
          .min(0)
          .max(100000)
          .parse(url.searchParams.get("offset") || 0);
        sendJSON(
          res,
          200,
          await rpc(session, "select public.community_works($1) as result", [
            offset,
          ]),
        );
        return true;
      }
      await ensureIndex();
      if (path === "/api/community/stats" && request.method === "GET") {
        const keys = z
          .array(gameKey)
          .max(1000)
          .parse(url.searchParams.getAll("key"));
        sendJSON(
          res,
          200,
          statsFor(
            await rpc(
              session,
              "select public.community_game_stats($1) as result",
              [keys.map(storageKey)],
            ),
          ),
        );
        return true;
      }
      const game =
        /^\/api\/community\/games\/([^/]+)(?:\/(rating|comments))?$/.exec(path);
      if (game) {
        const key = gameKey.parse(decodeURIComponent(game[1]));
        if (request.method === "GET" && !game[2]) {
          const before = url.searchParams.get("before");
          if (before && !Number.isFinite(Date.parse(before)))
            throw Object.assign(new Error("Invalid comment page"), {
              status: 400,
            });
          const result = await rpc(
            session,
            "select public.community_game($1,$2) as result",
            [storageKey(key), before],
          );
          sendJSON(res, 200, {
            ...result,
            stats: statsFor(result.stats)[key] || result.stats,
          });
          return true;
        }
        if (request.method === "POST" && game[2] === "rating") {
          const input = await jsonBody(
            request,
            z.strictObject({ score: z.number().int().min(1).max(5) }),
          );
          const result = await rpc(
            session,
            "select public.community_rate($1,$2) as result",
            [storageKey(key), input.score],
          );
          sendJSON(res, 200, statsFor(result)[key] || result);
          return true;
        }
        if (request.method === "POST" && game[2] === "comments") {
          const input = await jsonBody(
            request,
            z.strictObject({ body: z.string().trim().min(1).max(2000) }),
          );
          sendJSON(res, 201, {
            id: await rpc(
              session,
              "select public.community_comment($1,$2) as result",
              [storageKey(key), input.body],
            ),
          });
          return true;
        }
      }
      const comment =
        /^\/api\/community\/comments\/([^/]+)(?:\/(report))?$/.exec(path);
      if (comment) {
        const id = uuid.parse(comment[1]);
        if (request.method === "DELETE" && !comment[2]) {
          await rpc(
            session,
            "select public.community_delete_comment($1) as result",
            [id],
          );
          sendJSON(res, 200, { ok: true });
          return true;
        }
        if (request.method === "POST" && comment[2] === "report") {
          const input = await jsonBody(
            request,
            z.strictObject({ reason: z.string().trim().min(5).max(1000) }),
          );
          await rpc(
            session,
            "select public.community_report($1,$2) as result",
            [id, input.reason],
          );
          sendJSON(res, 200, { ok: true });
          return true;
        }
      }
      sendJSON(res, 404, {
        error: { code: "not_found", message: "Community endpoint not found" },
      });
      return true;
    } catch (error) {
      const status =
        error instanceof z.ZodError || error.code === "ERR_ASSERTION"
          ? 400
          : error instanceof MediaUploadBusyError || error.code === "54000"
            ? 429
            : error.status ||
              { 42501: 403, P0002: 404, P0001: 400, 40001: 409, 23505: 409 }[
                error.code
              ] ||
              500;
      if (status >= 500) log(`Community request ${requestId} failed`);
      sendJSON(res, status, {
        error: {
          code:
            status === 429
              ? "rate_limit"
              : status === 401
                ? "authentication"
                : status === 403
                  ? "permission"
                  : status === 409
                    ? "conflict"
                    : status >= 500
                      ? "unavailable"
                      : "input",
          message:
            status >= 500
              ? "Community service is temporarily unavailable"
              : error instanceof z.ZodError
                ? "Check the form fields and try again"
                : error.message,
        },
        requestId,
      });
      return true;
    }
  };
}

// The private Studio uses its existing verified session, role and CSRF checks.
export async function handleCommunityModeration({
  path,
  request,
  res,
  session,
  database,
  media,
}) {
  if (!path.startsWith("/api/community/")) return false;
  const execute = (sql, args = []) =>
    database.user(
      session.user.id,
      async (client) => (await first(client, sql, args)).result,
    );
  const image = /^\/api\/community\/media\/([a-f0-9]{64})\.webp$/.exec(path);
  if (image && request.method === "GET") {
    if (
      !(await execute("select public.community_moderator_media($1) as result", [
        image[1],
      ]))
    )
      throw Object.assign(new Error("Image not found"), { status: 404 });
    const file = await media.get(image[1] + ".webp");
    res.writeHead(200, {
      "Content-Type": file.mime,
      "Content-Length": file.bytes.length,
      "Cache-Control": "no-store",
    });
    res.end(file.bytes);
    return true;
  }
  if (path === "/api/community/moderation" && request.method === "GET") {
    const queue = await execute(
      "select public.community_moderation() as result",
    );
    const published = await execute(
      "select public.community_published_works() as result",
    );
    sendJSON(res, 200, { ...queue, published });
    return true;
  }
  if (path === "/api/community/unpublish" && request.method === "POST") {
    const input = await jsonBody(
      request,
      z.strictObject({ id: uuid, note: z.string().trim().min(1).max(2000) }),
    );
    await execute("select public.community_unpublish($1,$2) as result", [
      input.id,
      input.note,
    ]);
    sendJSON(res, 200, { ok: true });
    return true;
  }
  if (path === "/api/community/review" && request.method === "POST") {
    const input = await jsonBody(
      request,
      z.strictObject({
        id: uuid,
        revision: z.number().int().positive(),
        approve: z.boolean(),
        note: z.string().trim().min(1).max(2000),
      }),
    );
    await execute("select public.community_review($1,$2,$3,$4) as result", [
      input.id,
      input.revision,
      input.approve,
      input.note,
    ]);
    sendJSON(res, 200, { ok: true });
    return true;
  }
  if (path === "/api/community/report" && request.method === "POST") {
    const input = await jsonBody(
      request,
      z.strictObject({
        id: uuid,
        hide: z.boolean(),
        note: z.string().trim().min(1).max(2000),
      }),
    );
    await execute(
      "select public.community_resolve_report($1,$2,$3) as result",
      [input.id, input.hide, input.note],
    );
    sendJSON(res, 200, { ok: true });
    return true;
  }
  return false;
}
