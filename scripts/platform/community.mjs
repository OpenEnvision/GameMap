#!/usr/bin/env node
// Owned-local provisioning only. No cloud account, remote migration, reset or deployment.
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, chmod } from "node:fs/promises";
import { resolve, join } from "node:path";
import { parseEnv } from "node:util";
import { randomBytes } from "node:crypto";
import postgres from "postgres";
import {
  localDirectory,
  readLocalStatus,
  readLocalRealm,
  assertLoopback,
  migrateLocal,
} from "../lib/catalog/local-runtime.mjs";

const root = resolve(import.meta.dirname, "../.."),
  file = join(localDirectory, "community.json");
const command = process.argv[2];
if (!command || command === "--help") {
  console.log(
    "Owned-local community setup: node scripts/platform/community.mjs setup | status. No cloud services, resets or public deployment.",
  );
} else if (command === "setup") {
  const status = await readLocalStatus(),
    realm = await readLocalRealm();
  assert.equal(realm.environment, "local");
  const ownerURL = assertLoopback(status.DB_URL, ["postgres:", "postgresql:"]),
    apiURL = assertLoopback(status.API_URL, ["http:"]);
  await migrateLocal();
  let previous;
  try {
    previous = JSON.parse(await readFile(file, "utf8"));
    assert.equal(previous.format, "gamemap.community-runtime");
    assert.deepEqual(previous.realm, realm);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const owner = postgres(ownerURL.href, {
    max: 1,
    prepare: false,
    onnotice() {},
  });
  let databaseURL;
  try {
    const [role] =
      await owner`select rolname,rolsuper,rolcreaterole,rolcreatedb,rolinherit from pg_roles where rolname='gamemap_community_local'`;
    if (role) {
      assert.ok(
        previous,
        "An existing community login has no matching private instance marker; refuse adoption",
      );
      assert.equal(role.rolsuper, false);
      assert.equal(role.rolcreaterole, false);
      assert.equal(role.rolcreatedb, false);
      assert.equal(role.rolinherit, false);
      databaseURL = previous.databaseURL;
      const current = assertLoopback(databaseURL, ["postgres:", "postgresql:"]);
      assert.equal(current.host, ownerURL.host);
      assert.equal(current.pathname, ownerURL.pathname);
    } else {
      const password = randomBytes(32).toString("hex");
      await owner.unsafe(
        `create role gamemap_community_local login noinherit nosuperuser nocreatedb nocreaterole password '${password}'`,
      );
      const url = new URL(ownerURL);
      url.username = "gamemap_community_local";
      url.password = password;
      databaseURL = url.href;
    }
    await owner.unsafe(
      "revoke authenticated,anon,catalog_backend from gamemap_community_local",
    );
    await owner.unsafe(
      "grant community_backend,community_user,community_anon to gamemap_community_local",
    );
  } finally {
    await owner.end({ timeout: 5 });
  }
  const env = parseEnv(await readFile(join(root, ".env"), "utf8"));
  assert.equal(new URL(env.SUPABASE_URL).origin, apiURL.origin);
  assert.ok(
    env.CATALOG_MEDIA_ROOT,
    "Configure the existing private media root first",
  );
  const config = {
    format: "gamemap.community-runtime",
    realm,
    origin: "http://127.0.0.1:4191",
    databaseURL,
    supabaseURL: apiURL.origin,
    publishableKey: env.SUPABASE_PUBLISHABLE_KEY,
    mediaRoot: resolve(env.CATALOG_MEDIA_ROOT),
    sessionSecret:
      previous?.sessionSecret || randomBytes(48).toString("base64url"),
  };
  assert.ok(config.publishableKey);
  assert.ok(env.CATALOG_MEDIA_ROOT);
  await mkdir(localDirectory, { recursive: true, mode: 0o700 });
  await writeFile(file, JSON.stringify(config, null, 2), { mode: 0o600 });
  await chmod(file, 0o600);
  console.log(
    "Scoped community backend provisioned privately for the owned loopback instance. No catalog/editor membership was granted to public users.",
  );
  console.log(
    "Runtime configuration: .build/catalog-local/community.json (contains secrets; do not share).",
  );
  const response = await fetch(new URL("/auth/v1/settings", apiURL), {
    headers: { apikey: config.publishableKey },
  });
  const settings = await response.json();
  console.log(
    JSON.stringify({
      emailSignupEnabled: !settings.disable_signup,
      githubConfigured: Boolean(settings.external?.github),
      communityOrigin: config.origin,
    }),
  );
  console.log(
    "After changing supabase/config.toml, apply Auth settings with the documented owned-local stop/start (data is retained; never reset). Restart the 4191 publication server to mount the community API.",
  );
} else if (command === "status") {
  let configured = false;
  try {
    const c = JSON.parse(await readFile(file, "utf8"));
    configured = c.format === "gamemap.community-runtime";
  } catch {}
  console.log(
    JSON.stringify({
      configured,
      localOnly: true,
      runtimeConfig: ".build/catalog-local/community.json",
    }),
  );
} else
  throw new Error(
    "Use setup or status. Cloud setup is intentionally not implemented by this local helper.",
  );
