import assert from "node:assert/strict";
import { createServer } from "node:http";
import { isAbsolute, relative, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { root } from "../documents.mjs";
import {
  connectDatabase,
  assertLeastPrivilegeLogin,
} from "../catalog/database.mjs";
import { createMediaStore, configureMediaRuntime } from "../catalog/media.mjs";
import {
  readReleaseRealmFile,
  assertReleaseRealm,
} from "../catalog/release-realm.mjs";
import { createPublicationServer } from "../catalog/publication-server.mjs";
import { createDenylistChecker } from "../catalog/withdrawal.mjs";
import { createCommunityAuth } from "./auth.mjs";
import { createCommunityHandler, sendJSON } from "./server.mjs";
import { catalogGameIndex } from "./runtime.mjs";

const requiredVariables = [
  "COMMUNITY_DATABASE_URL",
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
  "COMMUNITY_SESSION_SECRET",
  "COMMUNITY_RELEASE_REALM_FILE",
  "COMMUNITY_ORIGIN",
  "COMMUNITY_MEDIA_ROOT",
];

export function validateCommunityProductionEnvironment(env) {
  const missing = requiredVariables.filter((key) => !env[key]);
  assert.equal(
    missing.length,
    0,
    `Missing required community environment variables: ${missing.join(", ")}`,
  );
  const origin = env.COMMUNITY_ORIGIN;
  const parsedOrigin = new URL(origin);
  assert.ok(
    parsedOrigin.origin === origin && parsedOrigin.pathname === "/",
    "COMMUNITY_ORIGIN must be an exact origin without a path",
  );
  const production = env.NODE_ENV === "production";
  if (production) {
    assert.equal(
      parsedOrigin.protocol,
      "https:",
      "Production community server requires an HTTPS COMMUNITY_ORIGIN behind TLS",
    );
    const authUrl = new URL(env.SUPABASE_URL);
    assert.ok(
      authUrl.protocol === "https:" ||
        ["127.0.0.1", "localhost", "[::1]"].includes(authUrl.hostname),
      "Production community Auth requires HTTPS",
    );
    const mediaRoot = env.COMMUNITY_MEDIA_ROOT;
    assert.ok(
      isAbsolute(mediaRoot) &&
        relative(root, resolve(mediaRoot)).startsWith(".."),
      "Production requires an absolute persistent COMMUNITY_MEDIA_ROOT outside the repository",
    );
  }
  assert.ok(
    env.COMMUNITY_SESSION_SECRET.length >= 32,
    "COMMUNITY_SESSION_SECRET must contain at least 32 random characters",
  );
  const port = Number(env.COMMUNITY_PORT || 4192);
  assert.ok(
    Number.isInteger(port) && port >= 1 && port <= 65535,
    "Invalid COMMUNITY_PORT",
  );
  return {
    origin,
    port,
    host: env.COMMUNITY_HOST || "127.0.0.1",
    production,
    trustProxy: env.COMMUNITY_TRUST_PROXY === "1",
    mediaProfile: env.COMMUNITY_MEDIA_PROFILE || "low-memory",
    publicationDirectory: env.COMMUNITY_PUBLICATION_DIR
      ? resolve(env.COMMUNITY_PUBLICATION_DIR)
      : null,
    denylistFile: env.WITHDRAWAL_DENYLIST_FILE
      ? resolve(env.WITHDRAWAL_DENYLIST_FILE)
      : null,
  };
}

/** Sync verified catalog games from a built site directory (for GitHub Pages + separate API node). */
export async function syncCommunityGamesFromSite(
  database,
  expectedRealm,
  siteDirectory,
) {
  const site = resolve(siteDirectory);
  const manifest = JSON.parse(
    await readFile(resolve(site, "content-manifest.json"), "utf8"),
  );
  assert.equal(
    manifest.source?.mode,
    "release",
    "Community game sync requires a verified release site snapshot",
  );
  assertReleaseRealm(manifest.source.realm, expectedRealm);
  const examplesHtml = await readFile(
    resolve(site, "examples/index.html"),
    "utf8",
  );
  const games = catalogGameIndex(manifest, examplesHtml);
  await database.system((client) =>
    client.query("select public.community_sync_games($1::jsonb)", [
      JSON.stringify(games),
    ]),
  );
  return { count: games.length, release: manifest.source.release };
}

/**
 * Production standalone community server.
 * Runs behind a same-origin TLS reverse proxy (or optionally serves a local publication snapshot).
 */
export async function createProductionCommunityService(
  env = process.env,
  {
    database: injectedDatabase,
    auth: injectedAuth,
    media: injectedMedia,
    skipPrivilegeAudit = false,
    log = (message) => console.error(message),
  } = {},
) {
  const config = validateCommunityProductionEnvironment(env);
  const mediaPolicy = configureMediaRuntime(config.mediaProfile);
  const realm = await readReleaseRealmFile(env.COMMUNITY_RELEASE_REALM_FILE);
  if (realm.environment !== "local") {
    assert.equal(
      config.production,
      true,
      "Non-local community realms require NODE_ENV=production",
    );
  }
  const database =
    injectedDatabase ||
    connectDatabase(env.COMMUNITY_DATABASE_URL, {
      backendRole: "community_backend",
      userRole: "community_user",
      anonymousRole: "community_anon",
      applicationName: "gamemap-community",
    });
  try {
    if (config.production && !skipPrivilegeAudit) {
      await assertLeastPrivilegeLogin(database, "community_backend", {
        forbiddenRoles: [
          "catalog_backend",
          "catalog_deployer",
          "service_role",
          "supabase_admin",
          "postgres",
        ],
      });
    }
    const dbRealm = await database.system(
      async (client) =>
        (await client.query("select public.community_identity() as realm"))
          .rows[0]?.realm,
    );
    assertReleaseRealm(dbRealm, realm);
  } catch (error) {
    if (!injectedDatabase) await database.close();
    throw error;
  }
  const media =
    injectedMedia ||
    createMediaStore(resolve(env.COMMUNITY_MEDIA_ROOT), {
      profile: mediaPolicy.profile,
    });
  await media.ready();
  const auth =
    injectedAuth ||
    createCommunityAuth({
      database,
      url: env.SUPABASE_URL,
      publishableKey: env.SUPABASE_PUBLISHABLE_KEY,
      origin: config.origin,
      secret: env.COMMUNITY_SESSION_SECRET,
    });
  const denylist = config.denylistFile
    ? createDenylistChecker(config.denylistFile, { expectedRealm: realm })
    : null;
  const communityHandler = createCommunityHandler({
    database,
    auth,
    media,
    origin: config.origin,
    trustProxy: config.trustProxy,
    log,
  });
  const handle = async (request, response) => {
    const pathname = new URL(request.url || "/", config.origin).pathname;
    if (
      (pathname === "/healthz" || pathname === "/api/community/healthz") &&
      request.method === "GET"
    ) {
      sendJSON(response, 200, {
        ok: true,
        service: "gamemap-community",
        environment: realm.environment,
      });
      return true;
    }
    return communityHandler(request, response);
  };
  const server = config.publicationDirectory
    ? createPublicationServer(config.publicationDirectory, {
        community: { handle },
        denylist,
      })
    : createServer(async (request, response) => {
        if (await handle(request, response)) return;
        sendJSON(response, 404, {
          error: { code: "not_found", message: "Not found" },
        });
      });
  return {
    server,
    config,
    realm,
    database,
    close: async () => {
      server.closeAllConnections();
      await new Promise((done) => server.close(done));
      if (!injectedDatabase) await database.close();
    },
  };
}
