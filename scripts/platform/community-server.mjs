#!/usr/bin/env node
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  connectDatabase,
  assertLeastPrivilegeLogin,
} from "../lib/catalog/database.mjs";
import { readReleaseRealmFile } from "../lib/catalog/release-realm.mjs";
import {
  createProductionCommunityService,
  syncCommunityGamesFromSite,
} from "../lib/community/production.mjs";

const help = `GameMap production standalone community service
  npm run community:start
  npm run community:sync-games -- --site-dir VERIFIED_SITE_DIR

Required environment (see .env.community.example):
  NODE_ENV=production
  COMMUNITY_DATABASE_URL (dedicated NOINHERIT login granted community_backend, community_user, community_anon)
  SUPABASE_URL
  SUPABASE_PUBLISHABLE_KEY
  COMMUNITY_SESSION_SECRET (>=32 random chars)
  COMMUNITY_RELEASE_REALM_FILE
  COMMUNITY_ORIGIN (exact HTTPS origin behind TLS reverse proxy)
  COMMUNITY_MEDIA_ROOT (absolute persistent private directory outside the repository)
Optional:
  COMMUNITY_HOST (default 127.0.0.1)
  COMMUNITY_PORT (default 4192)
  COMMUNITY_TRUST_PROXY=1 (when behind a trusted same-host TLS reverse proxy)
  COMMUNITY_MEDIA_PROFILE=low-memory
  COMMUNITY_PUBLICATION_DIR (optional: serve committed static snapshot + community API on one origin)
  WITHDRAWAL_DENYLIST_FILE (optional: immediate HTTP 410 emergency denylist JSON)
`;

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command === "--help" || args.includes("--help")) return console.log(help);
  if (command === "sync-games") {
    const idx = args.indexOf("--site-dir");
    assert.ok(idx !== -1 && args[idx + 1], help);
    const realm = await readReleaseRealmFile(
      process.env.COMMUNITY_RELEASE_REALM_FILE,
    );
    const database = connectDatabase(process.env.COMMUNITY_DATABASE_URL, {
      backendRole: "community_backend",
      userRole: "community_user",
      anonymousRole: "community_anon",
      applicationName: "gamemap-community-sync",
    });
    try {
      if (process.env.NODE_ENV === "production") {
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
      const result = await syncCommunityGamesFromSite(
        database,
        realm,
        resolve(args[idx + 1]),
      );
      console.log(JSON.stringify({ synced: true, ...result }, null, 2));
    } finally {
      await database.close();
    }
    return;
  }
  if (args.includes("--production") || command === "--production")
    process.env.NODE_ENV = "production";
  const service = await createProductionCommunityService(process.env);
  await new Promise((done, fail) => {
    service.server.once("error", fail);
    service.server.listen(service.config.port, service.config.host, done);
  });
  console.log(
    `GameMap Community API (${service.realm.environment}): http://${service.config.host}:${service.config.port} for origin ${service.config.origin}`,
  );
  let stopping = false;
  const shutdown = () => {
    if (stopping) return;
    stopping = true;
    void service.close().then(() => process.exit(0));
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
