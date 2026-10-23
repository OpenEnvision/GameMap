import { createServer } from "node:http";
import { timingSafeEqual, randomUUID } from "node:crypto";
import { stat } from "node:fs/promises";
import { extname } from "node:path";
import { z } from "zod";
import { AuthenticationError } from "./auth.mjs";
import { MediaUploadBusyError } from "./media.mjs";
import { ContentValidationError } from "./validation.mjs";
import { canonicalJSON, safePath, readArtifact } from "./codec.mjs";
import { first } from "./database.mjs";
import { canonicalAddress } from "./adapters.mjs";

const uuid = z.uuid();
const draftInput = z.strictObject({
  kind: z.string(),
  identifier: z.string().min(1).max(200),
  schemaVersion: z.number().int().positive(),
  expectedHead: uuid.nullable(),
  payload: z.record(z.string(), z.unknown()),
  attachments: z.record(z.string(), z.unknown()),
  translations: z
    .array(
      z.strictObject({
        locale: z.string(),
        field: z.string(),
        value: z.union([z.string(), z.array(z.string())]),
        source_hash: z.string().regex(/^[a-f0-9]{64}$/),
      }),
    )
    .max(1000),
});
const bulkInput = z.strictObject({
  ids: z.array(uuid).min(1).max(1000),
  action: z.enum(["submit", "approve", "reject"]),
  note: z.string().max(4000).optional(),
});
const loginInput = z.strictObject({
  email: z.email().max(254),
  password: z.string().min(1).max(200),
});
const response = (res, status, body, headers = {}) => {
  const bytes = Buffer.from(JSON.stringify(body));
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": bytes.length,
    ...headers,
  });
  res.end(bytes);
};
async function bytes(request, maximum) {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > maximum) {
      const error = new Error("Request is too large");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
async function jsonBody(request, schema) {
  if (!request.headers["content-type"]?.startsWith("application/json")) {
    const error = new Error("Use application/json");
    error.status = 415;
    throw error;
  }
  let body;
  try {
    body = JSON.parse((await bytes(request, 1024 * 1024)).toString("utf8"));
  } catch (error) {
    if (error.status) throw error;
    const invalid = new Error("Request contains invalid JSON");
    invalid.status = 400;
    throw invalid;
  }
  return schema.parse(body);
}
function equalToken(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const left = Buffer.from(a),
    right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Same-origin BFF. No database credentials, access/refresh tokens, or arbitrary SQL reach a browser. */
export function createStudioServer({
  database,
  sessions,
  worker,
  context,
  media,
  origin,
  staticDirectory,
  missingConfiguration = [],
  log = (message) => console.error(message),
}) {
  const loginAttempts = new Map();
  const server = createServer(async (request, res) => {
    const requestId = randomUUID();
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-Request-Id", requestId);
    let url;
    try {
      url = new URL(request.url, "http://studio.invalid");
    } catch {
      response(res, 400, {
        error: { code: "input", message: "Request contains an invalid URL" },
      });
      return;
    }
    const path = url.pathname;
    try {
      if (!path.startsWith("/api/")) {
        if (request.method !== "GET" || !staticDirectory) {
          response(res, 404, {
            error: { code: "not_found", message: "Not found" },
          });
          return;
        }
        const relative =
          path === "/" ? "index.html" : decodeURIComponent(path).slice(1);
        const file = safePath(staticDirectory, relative);
        if (!(await stat(file)).isFile())
          throw Object.assign(new Error("Not found"), { status: 404 });
        const data = await readArtifact(staticDirectory, relative),
          mime =
            {
              ".html": "text/html; charset=utf-8",
              ".js": "text/javascript",
              ".css": "text/css",
              ".woff2": "font/woff2",
              ".svg": "image/svg+xml",
            }[extname(file)] || "application/octet-stream";
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' blob: data:; font-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; form-action 'self'",
        );
        res.writeHead(200, {
          "Content-Type": mime,
          "Content-Length": data.length,
        });
        res.end(data);
        return;
      }
      if (request.method === "GET" && path === "/api/session") {
        if (missingConfiguration.length) {
          response(res, 200, {
            configured: false,
            missing: missingConfiguration,
            signedIn: false,
          });
          return;
        }
        const session = await sessions.read(request);
        response(
          res,
          200,
          session
            ? {
                configured: true,
                signedIn: true,
                user: session.user,
                role: session.role,
                csrf: session.csrf,
              }
            : { configured: true, signedIn: false },
        );
        return;
      }
      if (missingConfiguration.length) {
        response(res, 503, {
          error: {
            code: "configuration_required",
            message: "Studio is not configured",
          },
        });
        return;
      }
      const mutation = !["GET", "HEAD", "OPTIONS"].includes(request.method);
      if (mutation && request.headers.origin !== origin) {
        response(res, 403, {
          error: {
            code: "origin",
            message: "Cross-origin mutations are not accepted",
          },
        });
        return;
      }
      if (request.method === "POST" && path === "/api/login") {
        const key = request.socket.remoteAddress || "unknown",
          now = Date.now();
        for (const [key, value] of loginAttempts)
          if (value.until < now) loginAttempts.delete(key);
        const attempt = loginAttempts.get(key) || {
          count: 0,
          until: now + 60000,
        };
        attempt.count++;
        loginAttempts.set(key, attempt);
        if (attempt.count > 30 || loginAttempts.size > 1000) {
          response(
            res,
            429,
            {
              error: {
                code: "rate_limit",
                message: "Too many sign-in attempts; wait a minute",
              },
            },
            { "Retry-After": "60" },
          );
          return;
        }
        const body = await jsonBody(request, loginInput),
          result = await sessions.login(body.email, body.password);
        response(
          res,
          200,
          { signedIn: true, ...result.session },
          { "Set-Cookie": result.cookie },
        );
        return;
      }
      const session = await sessions.read(request);
      if (!session) throw new AuthenticationError();
      if (
        mutation &&
        !equalToken(request.headers["x-csrf-token"], session.csrf)
      ) {
        response(res, 403, {
          error: {
            code: "csrf",
            message: "Session changed; reload before trying again",
          },
        });
        return;
      }
      if (request.method === "POST" && path === "/api/logout") {
        response(
          res,
          200,
          { signedIn: false },
          { "Set-Cookie": await sessions.logout(session) },
        );
        return;
      }
      if (request.method === "GET" && path === "/api/catalog") {
        const entries = await database.user(
          session.user.id,
          async (client) =>
            (
              await first(
                client,
                "select public.catalog_editor_entries() as entries",
              )
            ).entries,
        );
        response(res, 200, { entries });
        return;
      }
      if (request.method === "GET" && path === "/api/contracts") {
        const registered = await database.system(async (client) => ({
          schemas: (
            await client.query(
              "select kind, version, validator_key, enabled_for_writes from catalog.content_schemas order by kind, version",
            )
          ).rows,
          locales: (
            await client.query("select code from catalog.locales order by code")
          ).rows.map((row) => row.code),
        }));
        const translatable = Object.fromEntries(
          Object.keys(context.contentKinds).map((kind) => [
            kind,
            [
              ...new Set(
                context.registry
                  .all(kind)
                  .flatMap((entry) =>
                    Object.keys(entry.data).filter((field) =>
                      context.canTranslate(entry, field),
                    ),
                  ),
              ),
            ],
          ]),
        );
        response(res, 200, {
          kinds: context.contentKinds,
          forms: context.contractForms(),
          translatable,
          ...registered,
          mediaUpload: media.policy,
          limitations:
            "Validation checks structure, references, media and translation freshness; source review and reproduction remain human responsibilities.",
        });
        return;
      }
      if (request.method === "GET" && path === "/api/history") {
        const key = z
          .string()
          .min(1)
          .max(300)
          .parse(url.searchParams.get("key"));
        const history = await database.user(
          session.user.id,
          async (client) =>
            (
              await first(
                client,
                "select public.catalog_revision_history($1) as history",
                [key],
              )
            ).history,
        );
        response(res, 200, { history });
        return;
      }
      if (request.method === "POST" && path === "/api/drafts") {
        const input = await jsonBody(request, draftInput),
          definition = context.contentKinds[input.kind];
        if (
          !definition ||
          !context.versionedContracts[input.kind]?.[input.schemaVersion]
        )
          throw Object.assign(
            new Error(
              "Install a trusted contract adapter for this kind/version first",
            ),
            { status: 409 },
          );
        const [title, summary] = context.textFields[input.kind];
        const body = {
          title: input.payload[title],
          summary: input.payload[summary],
          payload: input.payload,
          attachments: input.attachments,
        };
        if (
          typeof body.title !== "string" ||
          !body.title.trim() ||
          typeof body.summary !== "string" ||
          !body.summary.trim()
        )
          throw Object.assign(
            new Error("A title and summary are required before saving a draft"),
            { status: 422 },
          );
        const id = await database.user(session.user.id, async (client) => {
          const row = await first(
            client,
            "select public.catalog_save_draft($1,$2,$3,$4,$5,$6,$7) as id",
            [
              input.kind,
              input.identifier,
              input.schemaVersion,
              canonicalAddress(
                context,
                input.kind,
                input.identifier,
                input.payload,
              ),
              context.pages[definition.page].path,
              canonicalJSON(body),
              input.expectedHead,
            ],
          );
          await client.query(
            "select public.catalog_set_draft_translations($1,$2::jsonb)",
            [row.id, JSON.stringify(input.translations)],
          );
          return row.id;
        });
        response(res, 201, { id, state: "draft", published: false });
        return;
      }
      const validate = /^\/api\/revisions\/([^/]+)\/validate$/.exec(path);
      if (request.method === "POST" && validate) {
        response(
          res,
          200,
          await worker.validate(session.user.id, uuid.parse(validate[1])),
        );
        return;
      }
      if (request.method === "POST" && path === "/api/review") {
        const input = await jsonBody(request, bulkInput);
        if (input.action !== "submit" && !input.note?.trim())
          throw Object.assign(
            new Error("Record a review note before approving or rejecting"),
            { status: 422 },
          );
        await database.user(session.user.id, async (client) => {
          if (input.action === "submit")
            await client.query(
              "select public.catalog_submit_revision(id) from unnest($1::uuid[]) id",
              [input.ids],
            );
          else
            await client.query(
              "select public.catalog_review_revision(id, $2, $3) from unnest($1::uuid[]) id",
              [input.ids, input.action === "approve", input.note],
            );
        });
        response(res, 200, {
          action: input.action,
          count: input.ids.length,
          published: false,
        });
        return;
      }
      if (request.method === "POST" && path === "/api/documents/sync") {
        await jsonBody(request, z.strictObject({}));
        response(res, 200, await worker.syncDocuments(session.user.id));
        return;
      }
      if (request.method === "GET" && path === "/api/releases") {
        response(res, 200, {
          releases: await worker.releases(session.user.id),
        });
        return;
      }
      if (request.method === "POST" && path === "/api/releases") {
        const input = await jsonBody(
          request,
          z.strictObject({ ids: z.array(uuid).min(1).max(5000).optional() }),
        );
        response(res, 201, await worker.freeze(session.user.id, input.ids));
        return;
      }
      const release = /^\/api\/releases\/([^/]+)\/export$/.exec(path);
      if (request.method === "GET" && release) {
        const id = uuid.parse(release[1]);
        response(res, 200, await worker.exportRelease(session.user.id, id), {
          "Content-Disposition": `attachment; filename="gamemap-release-${id}.json"`,
        });
        return;
      }
      if (request.method === "POST" && path === "/api/media") {
        await worker.authorize(session.user.id, [
          "editor",
          "reviewer",
          "admin",
        ]);
        const result = await media.upload(() =>
          bytes(request, media.policy.maxBytes),
        );
        await database.system((client) =>
          client.query(
            "insert into catalog.audit_events(actor_id, action, entity, detail) values($1, 'upload-media', $2, $3::jsonb)",
            [
              session.user.id,
              result.sha256,
              JSON.stringify({
                bytes: result.bytes,
                source_sha256: result.source_sha256,
              }),
            ],
          ),
        );
        response(res, 201, result);
        return;
      }
      if (request.method === "GET" && path === "/api/source-media") {
        const asset = z
          .string()
          .min(1)
          .max(500)
          .parse(url.searchParams.get("path"))
          .replace(/^\//, "");
        if (!/\.(png|jpe?g|webp|svg|mp4|webm)$/i.test(asset))
          throw Object.assign(new Error("Unsupported preview media"), {
            status: 415,
          });
        const data = await media.readAsset(`website/public/${asset}`);
        const mime = {
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".webp": "image/webp",
          ".svg": "image/svg+xml",
          ".mp4": "video/mp4",
          ".webm": "video/webm",
        }[extname(asset).toLowerCase()];
        res.setHeader("Content-Security-Policy", "sandbox; default-src 'none'");
        res.writeHead(200, {
          "Content-Type": mime,
          "Content-Length": data.length,
        });
        res.end(data);
        return;
      }
      const image = /^\/api\/media\/([^/]+)$/.exec(path);
      if (request.method === "GET" && image) {
        const { bytes: data, mime } = await media.get(image[1]);
        res.writeHead(200, {
          "Content-Type": mime,
          "Content-Length": data.length,
        });
        res.end(data);
        return;
      }
      response(res, 404, {
        error: { code: "not_found", message: "Endpoint not found" },
      });
    } catch (error) {
      if (res.headersSent) {
        res.destroy();
        return;
      }
      if (error instanceof AuthenticationError) {
        response(
          res,
          error.status,
          { error: { code: "authentication", message: error.message } },
          { "Set-Cookie": sessions.clearCookie() },
        );
        return;
      }
      if (error instanceof MediaUploadBusyError) {
        // Do not buffer or drain a rejected upload into application memory. Close the
        // connection after the response, including when the sender has not finished.
        response(
          res,
          429,
          {
            error: { code: "media_busy", message: error.message },
          },
          { "Retry-After": "1", Connection: "close" },
        );
        return;
      }
      if (error instanceof ContentValidationError) {
        response(res, 422, {
          error: {
            code: "validation",
            message: error.message,
            issues: error.issues,
          },
        });
        return;
      }
      if (error instanceof z.ZodError) {
        response(res, 422, {
          error: {
            code: "input",
            message: "Check the highlighted input",
            issues: error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
        });
        return;
      }
      if (error.code === "40001") {
        response(res, 409, {
          error: {
            code: "conflict",
            message:
              "Another edit changed this record. Reload and compare before saving again.",
          },
        });
        return;
      }
      if (error.code === "42501") {
        response(res, 403, {
          error: {
            code: "permission",
            message:
              "Your role cannot perform this operation, or it is your own revision.",
          },
        });
        return;
      }
      if (
        error.status ||
        error.code === "23505" ||
        error.code === "23514" ||
        error.code === "P0001" ||
        error.code === "ERR_ASSERTION"
      ) {
        response(res, error.status || 422, {
          error: {
            code: "operation",
            message:
              error.code === "23505"
                ? "That identity or canonical address already exists"
                : error.message,
          },
        });
        return;
      }
      if (error.code === "ENOENT") {
        response(res, 404, {
          error: { code: "not_found", message: "File was not found" },
        });
        return;
      }
      log(
        `Studio request ${requestId} failed (${error.code || error.name || "unknown"})`,
      );
      response(res, 500, {
        error: {
          code: "internal",
          message: `Operation failed. Reference: ${requestId}`,
        },
      });
    }
  });
  return server;
}
