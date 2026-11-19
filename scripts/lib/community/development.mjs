import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { connectDatabase } from "../catalog/database.mjs";
import { createMediaStore } from "../catalog/media.mjs";
import { createCommunityAuth } from "./auth.mjs";
import { createCommunityHandler } from "./server.mjs";

const format = "gamemap.community-development";

/** Accounts, ratings and comments for the development server. It reads the
 *  working catalog instead of a published snapshot, and indexes those games
 *  under its own prefix so published ratings are untouched. */
export async function createDevelopmentCommunityRuntime({
  configFile,
  origin,
  loadGames,
  log = () => {},
}) {
  let config;
  try {
    config = JSON.parse(await readFile(configFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT")
      log("Development community configuration could not be read");
    return null;
  }
  if (
    config.format !== format ||
    config.origin !== origin ||
    typeof config.keyPrefix !== "string" ||
    !config.keyPrefix ||
    typeof config.sessionSecret !== "string" ||
    config.sessionSecret.length < 32
  ) {
    log(`Development community configuration does not match ${origin}`);
    return null;
  }
  const database = connectDatabase(config.databaseURL, {
      backendRole: "community_backend",
      userRole: "community_user",
      anonymousRole: "community_anon",
    }),
    media = createMediaStore(config.mediaRoot, { profile: "low-memory" });
  const unavailable = async () => {
    await database.close();
    log(
      "Development community backend is unavailable or belongs to a different instance",
    );
    return {
      handle: createCommunityHandler({ origin }),
      close: async () => {},
    };
  };
  try {
    const realm = await database.system(
      async (client) =>
        (await client.query("select public.community_identity() as realm"))
          .rows[0].realm,
    );
    assert.deepEqual(
      realm,
      config.realm,
      "Community database belongs to a different release realm",
    );
    await media.ready();
  } catch {
    return unavailable();
  }
  const auth = createCommunityAuth({
    database,
    url: config.supabaseURL,
    publishableKey: config.publishableKey,
    origin,
    secret: config.sessionSecret,
  });
  let indexed = null,
    indexing;
  const ensureIndex = async () => {
    const games = await loadGames();
    const signature = createHash("sha256")
      .update(JSON.stringify(games))
      .digest("hex");
    if (indexed === signature) return;
    if (indexing) await indexing;
    if (indexed === signature) return;
    indexing = (async () => {
      await database.system((client) =>
        client.query(
          "select public.community_sync_development_games($1::jsonb)",
          [JSON.stringify(games)],
        ),
      );
      indexed = signature;
    })();
    try {
      await indexing;
    } finally {
      indexing = null;
    }
  };
  return {
    handle: createCommunityHandler({
      database,
      auth,
      media,
      origin,
      ensureIndex,
      log,
      keyPrefix: config.keyPrefix,
    }),
    close: () => database.close(),
  };
}
