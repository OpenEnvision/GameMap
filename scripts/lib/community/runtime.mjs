import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "parse5";
import { connectDatabase } from "../catalog/database.mjs";
import { createMediaStore } from "../catalog/media.mjs";
import { visibleArtifact } from "../catalog/publication.mjs";
import { createCommunityAuth } from "./auth.mjs";
import { createCommunityHandler } from "./server.mjs";

export function catalogGameIndex(manifest, html) {
  const keys = new Set(),
    records = new Map(manifest.records.map((row) => [row.key, row]));
  const visit = (node, inside = false) => {
    const attrs = Object.fromEntries(
      (node.attrs || []).map((attribute) => [attribute.name, attribute.value]),
    );
    inside ||= attrs.id === "game-examples";
    if (
      inside &&
      node.tagName === "article" &&
      (attrs.class || "").split(/\s+/).includes("example-card") &&
      /^(example|foundation|repository-research|threejs-game):/.test(
        attrs["data-content-ref"] || "",
      )
    )
      keys.add(attrs["data-content-ref"]);
    for (const child of node.childNodes || []) visit(child, inside);
  };
  visit(parse(html));
  for (const entry of manifest.records)
    if (["example", "foundation", "threejs-game"].includes(entry.kind))
      keys.add(entry.key);
  return [...keys].map((key) => {
    const entry = records.get(key);
    if (!entry)
      throw new Error(
        "Published game index does not match the selected manifest",
      );
    return {
      key,
      payload: {
        title: entry.title,
        description: entry.description,
        url: entry.url,
        kind: entry.kind,
      },
    };
  });
}
export async function createCommunityRuntime({
  directory,
  configFile,
  origin,
  log = console.error,
}) {
  let config;
  try {
    config = JSON.parse(await readFile(configFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT")
      log("Community configuration could not be read");
    return {
      handle: createCommunityHandler({ origin }),
      close: async () => {},
    };
  }
  if (
    config.format !== "gamemap.community-runtime" ||
    config.origin !== origin ||
    typeof config.sessionSecret !== "string" ||
    config.sessionSecret.length < 32
  ) {
    log("Community configuration does not match the serving origin");
    return {
      handle: createCommunityHandler({ origin }),
      close: async () => {},
    };
  }
  const database = connectDatabase(config.databaseURL, {
      backendRole: "community_backend",
      userRole: "community_user",
      anonymousRole: "community_anon",
    }),
    media = createMediaStore(config.mediaRoot, { profile: "low-memory" });
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
    await database.close();
    log("Community backend is unavailable or belongs to a different instance");
    return {
      handle: createCommunityHandler({ origin }),
      close: async () => {},
    };
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
    const digest = await visibleArtifact(directory);
    if (!digest) throw new Error("No published game snapshot");
    if (indexed === digest) return;
    if (indexing) await indexing;
    if (indexed === digest) return;
    indexing = (async () => {
      const site = join(directory, "artifacts", digest, "site"),
        manifest = JSON.parse(
          await readFile(join(site, "content-manifest.json"), "utf8"),
        );
      if (manifest.source?.mode !== "release")
        throw new Error(
          "Community interactions require a published complete snapshot",
        );
      assert.deepEqual(
        manifest.source.realm,
        config.realm,
        "Community index belongs to a different release realm",
      );
      const games = catalogGameIndex(
        manifest,
        await readFile(join(site, "examples/index.html"), "utf8"),
      );
      await database.system((client) =>
        client.query("select public.community_sync_games($1::jsonb)", [
          JSON.stringify(games),
        ]),
      );
      indexed = digest;
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
    }),
    close: () => database.close(),
  };
}
