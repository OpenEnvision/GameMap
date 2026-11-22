import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { loadMigrations } from "../../scripts/lib/migrations.mjs";
import { root } from "../../scripts/lib/documents.mjs";
import { renderDirectModeSQL } from "../../scripts/platform/community-direct.mjs";
import {
  createDirectCommunityClient,
  sha256Hex,
} from "../../website/app/lib/community-direct.ts";

const alice = "30000000-0000-4000-8000-000000000001";
const bob = "30000000-0000-4000-8000-000000000002";
const admin = "30000000-0000-4000-8000-000000000003";
const unverified = "30000000-0000-4000-8000-000000000004";
const gameKey = "example:direct-mode-fixture";

let pg;

async function execAs(role, userId, appRole, fn) {
  return pg.transaction(async (tx) => {
    await tx.query(`set local role ${role}`);
    await tx.query("select set_config('request.jwt.claim.sub', $1, true)", [
      userId || "",
    ]);
    await tx.query("select set_config('request.jwt.claims', $1, true)", [
      JSON.stringify({
        sub: userId || "",
        role,
        app_metadata: appRole ? { role: appRole } : {},
      }),
    ]);
    return fn(tx);
  });
}

before(async () => {
  pg = new PGlite();
  await pg.exec(`
    create role anon;
    create role authenticated;
    create role service_role;
    create schema auth;
    create table auth.users (
      id uuid primary key,
      email text,
      email_confirmed_at timestamptz,
      raw_app_meta_data jsonb default '{}'::jsonb
    );
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
    $$;
    create schema storage;
    create table storage.buckets (
      id text primary key,
      name text not null,
      public boolean not null default false,
      file_size_limit bigint,
      allowed_mime_types text[]
    );
    create table storage.objects (
      id uuid primary key default gen_random_uuid(),
      bucket_id text not null references storage.buckets(id),
      name text not null,
      unique (bucket_id, name)
    );
    alter table storage.objects enable row level security;
    grant usage on schema storage to anon, authenticated;
    grant select, insert, update, delete on storage.objects to anon, authenticated;
  `);
  for (const migration of await loadMigrations()) {
    await pg.exec(migration.sql);
  }
  const directSQL = await readFile(
    resolve(root, "supabase/direct-mode/enable-supabase-direct.sql"),
    "utf8",
  );
  await pg.exec(directSQL);

  await pg.query(
    `insert into auth.users (id, email, email_confirmed_at, raw_app_meta_data) values
      ($1, 'alice@example.invalid', now(), '{}'::jsonb),
      ($2, 'bob@example.invalid', now(), '{}'::jsonb),
      ($3, 'admin@example.invalid', now(), '{"role":"admin"}'::jsonb),
      ($4, 'unverified@example.invalid', null, '{}'::jsonb)`,
    [alice, bob, admin, unverified],
  );
});

after(async () => {
  await pg?.close();
});

test("direct-mode SQL generator includes storage policies, optional admin grant, and catalog game index", async () => {
  const sql = await renderDirectModeSQL({
    adminEmail: "admin@example.invalid",
    withGames: false,
  });
  assert.match(sql, /community-media-private/);
  assert.match(sql, /community-media-public/);
  assert.match(sql, /community_direct_register_upload/);
  assert.match(sql, /admin@example\.invalid/);
});

test("BlogrXiv-style zero-server direct mode enforces storage verification, RLS, ratings, comments, submissions and browser moderation", async () => {
  const privateBuckets = new Map();
  const publicBuckets = new Map();
  const tokens = new Map([
    [
      "token-alice",
      { id: alice, email: "alice@example.invalid", confirmed: true, role: "" },
    ],
    [
      "token-bob",
      { id: bob, email: "bob@example.invalid", confirmed: true, role: "" },
    ],
    [
      "token-admin",
      {
        id: admin,
        email: "admin@example.invalid",
        confirmed: true,
        role: "admin",
      },
    ],
  ]);

  const makeMockFetcher =
    () =>
    async (input, init = {}) => {
      const url = new URL(
        typeof input === "string" ? input : input.toString(),
        "http://localhost",
      );
      const authHeader =
        (init.headers &&
          (init.headers.Authorization || init.headers.authorization)) ||
        "";
      const bearer = authHeader.replace(/^Bearer\s+/i, "");
      const actor = tokens.get(bearer) || null;

      if (url.pathname === "/auth/v1/settings") {
        return Response.json({
          disable_signup: false,
          external: { email: true, github: true },
        });
      }
      if (
        url.pathname === "/auth/v1/token" &&
        url.searchParams.get("grant_type") === "password"
      ) {
        const body = JSON.parse(String(init.body || "{}"));
        const tokenKey =
          body.email === "admin@example.invalid"
            ? "token-admin"
            : body.email === "bob@example.invalid"
              ? "token-bob"
              : "token-alice";
        const user = tokens.get(tokenKey);
        return Response.json({
          access_token: tokenKey,
          refresh_token: "refresh-" + tokenKey,
          expires_in: 3600,
          user: { id: user.id, email: user.email },
        });
      }
      if (url.pathname === "/auth/v1/user") {
        if (!actor)
          return Response.json({ message: "Unauthorized" }, { status: 401 });
        return Response.json({
          id: actor.id,
          email: actor.email,
          email_confirmed_at: actor.confirmed ? new Date().toISOString() : null,
        });
      }
      if (url.pathname === "/auth/v1/logout") {
        return new Response(null, { status: 204 });
      }
      if (url.pathname.endsWith("/content-manifest.json")) {
        return Response.json({
          records: [
            {
              key: gameKey,
              kind: "example",
              title: "Direct Mode Game",
              url: "/examples/direct-mode-fixture/",
            },
          ],
        });
      }

      const privMatch =
        /^\/storage\/v1\/object\/(?:authenticated\/)?community-media-private\/(.+)$/.exec(
          url.pathname,
        );
      if (privMatch) {
        const objectName = privMatch[1];
        if (!actor)
          return Response.json({ message: "Unauthorized" }, { status: 401 });
        if ((init.method || "GET").toUpperCase() === "POST") {
          await execAs("authenticated", actor.id, actor.role, (tx) =>
            tx.query(
              "insert into storage.objects (bucket_id, name) values ('community-media-private', $1) on conflict (bucket_id, name) do nothing",
              [objectName],
            ),
          );
          const buf =
            init.body instanceof Blob
              ? new Uint8Array(await init.body.arrayBuffer())
              : new Uint8Array(init.body);
          privateBuckets.set(objectName, buf);
          return Response.json({
            Key: "community-media-private/" + objectName,
          });
        }
        const rows = await execAs("authenticated", actor.id, actor.role, (tx) =>
          tx.query(
            "select name from storage.objects where bucket_id = 'community-media-private' and name = $1",
            [objectName],
          ),
        );
        if (!rows.rows.length || !privateBuckets.has(objectName)) {
          return Response.json({ message: "Not found" }, { status: 404 });
        }
        return new Response(privateBuckets.get(objectName), {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        });
      }

      const pubMatch =
        /^\/storage\/v1\/object\/(?:public\/)?community-media-public\/(.+)$/.exec(
          url.pathname,
        );
      if (pubMatch) {
        const objectName = pubMatch[1];
        if ((init.method || "GET").toUpperCase() === "POST") {
          if (!actor)
            return Response.json({ message: "Unauthorized" }, { status: 401 });
          await execAs("authenticated", actor.id, actor.role, (tx) =>
            tx.query(
              "insert into storage.objects (bucket_id, name) values ('community-media-public', $1) on conflict (bucket_id, name) do nothing",
              [objectName],
            ),
          );
          publicBuckets.set(objectName, new Uint8Array(init.body));
          return Response.json({ Key: "community-media-public/" + objectName });
        }
        if (!publicBuckets.has(objectName)) {
          return Response.json({ message: "Not found" }, { status: 404 });
        }
        return new Response(publicBuckets.get(objectName), {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        });
      }

      const rpcMatch = /^\/rest\/v1\/rpc\/([a-z0-9_]+)$/.exec(url.pathname);
      if (rpcMatch) {
        const fn = rpcMatch[1];
        const args = JSON.parse(String(init.body || "{}"));
        const role = actor ? "authenticated" : "anon";
        try {
          const res = await execAs(role, actor?.id, actor?.role, async (tx) => {
            switch (fn) {
              case "community_profile":
                return tx.query(
                  "select public.community_profile($1) as result",
                  [args.p_name ?? null],
                );
              case "community_direct_is_moderator":
                return tx.query(
                  "select public.community_direct_is_moderator() as result",
                );
              case "community_direct_sync_games":
                return tx.query(
                  "select public.community_direct_sync_games($1::jsonb) as result",
                  [JSON.stringify(args.p_games)],
                );
              case "community_game_stats":
                return tx.query(
                  "select public.community_game_stats($1::text[]) as result",
                  [args.p_keys],
                );
              case "community_game":
                return tx.query(
                  "select public.community_game($1, $2::timestamptz) as result",
                  [args.p_key, args.p_before ?? null],
                );
              case "community_rate":
                return tx.query(
                  "select public.community_rate($1, $2) as result",
                  [args.p_key, args.p_score],
                );
              case "community_comment":
                return tx.query(
                  "select public.community_comment($1, $2) as result",
                  [args.p_key, args.p_body],
                );
              case "community_delete_comment":
                await tx.query("select public.community_delete_comment($1)", [
                  args.p_id,
                ]);
                return { rows: [{ result: null }] };
              case "community_report":
                await tx.query("select public.community_report($1, $2)", [
                  args.p_id,
                  args.p_reason,
                ]);
                return { rows: [{ result: null }] };
              case "community_direct_register_upload":
                return tx.query(
                  "select public.community_direct_register_upload($1, $2, $3, $4) as result",
                  [args.p_id, args.p_bytes, args.p_width, args.p_height],
                );
              case "community_direct_upload_owner":
                return tx.query(
                  "select public.community_direct_upload_owner($1) as result",
                  [args.p_id],
                );
              case "community_submit":
                return tx.query(
                  "select public.community_submit($1::jsonb, $2::uuid) as result",
                  [JSON.stringify(args.p_payload), args.p_id ?? null],
                );
              case "community_my_submissions":
                return tx.query(
                  "select public.community_my_submissions() as result",
                );
              case "community_withdraw":
                await tx.query("select public.community_withdraw($1::uuid)", [
                  args.p_id,
                ]);
                return { rows: [{ result: null }] };
              case "community_works":
                return tx.query("select public.community_works($1) as result", [
                  args.p_offset ?? 0,
                ]);
              case "community_moderation":
                return tx.query(
                  "select public.community_moderation() as result",
                );
              case "community_published_works":
                return tx.query(
                  "select public.community_published_works() as result",
                );
              case "community_review":
                await tx.query(
                  "select public.community_review($1::uuid, $2, $3, $4)",
                  [args.p_id, args.p_revision, args.p_approve, args.p_note],
                );
                return { rows: [{ result: null }] };
              case "community_resolve_report":
                await tx.query(
                  "select public.community_resolve_report($1::uuid, $2, $3)",
                  [args.p_id, args.p_hide, args.p_note],
                );
                return { rows: [{ result: null }] };
              case "community_unpublish":
                await tx.query(
                  "select public.community_unpublish($1::uuid, $2)",
                  [args.p_id, args.p_note],
                );
                return { rows: [{ result: null }] };
              default:
                throw new Error("Unknown test RPC: " + fn);
            }
          });
          return Response.json(res.rows[0]?.result ?? null);
        } catch (err) {
          return Response.json({ message: err.message }, { status: 400 });
        }
      }

      throw new Error("Unhandled mock fetch: " + url.href);
    };

  const fakeWebpBytes = new TextEncoder().encode("RIFF-fake-webp-frame");
  const fakeImageId = await sha256Hex(fakeWebpBytes);
  const fakeNormalize = async () => ({
    id: fakeImageId,
    bytes: fakeWebpBytes,
    width: 1280,
    height: 720,
  });

  const makeClient = () => {
    const map = new Map();
    return createDirectCommunityClient({
      supabaseUrl: "https://direct.supabase.co",
      publishableKey: "sb_publishable_test",
      basePath: "/GameMap/",
      fetcher: makeMockFetcher(),
      storage: {
        getItem: (k) => map.get(k) ?? null,
        setItem: (k, v) => map.set(k, v),
        removeItem: (k) => map.delete(k),
      },
      normalizeImage: fakeNormalize,
    });
  };

  const adminClient = makeClient();
  const aliceClient = makeClient();
  const bobClient = makeClient();

  // 1. Admin logs in via BlogrXiv-style app_metadata.role = "admin" and syncs catalog games from content-manifest.json
  await adminClient.request("/auth/login", {
    method: "POST",
    body: { email: "admin@example.invalid", password: "secret" },
  });
  const adminSession = await adminClient.request("/session");
  assert.equal(adminSession.user.moderator, true);
  const synced = await adminClient.request("/moderation/sync-games", {
    method: "POST",
    body: {},
  });
  assert.equal(synced.synced, 1);

  // 2. Non-moderator Alice logs in, updates profile, rates, comments, and uploads a screenshot
  await aliceClient.request("/auth/login", {
    method: "POST",
    body: { email: "alice@example.invalid", password: "secret" },
  });
  const aliceSession = await aliceClient.request("/session");
  assert.equal(aliceSession.user.moderator, false);
  await aliceClient.request("/profile", {
    method: "POST",
    body: { displayName: "Alice Direct" },
  });

  // Attempting to register an unuploaded image hash in SQL fails closed
  await assert.rejects(
    execAs("authenticated", alice, "", (tx) =>
      tx.query(
        "select public.community_direct_register_upload($1, 100, 1280, 720)",
        ["f".repeat(64)],
      ),
    ),
    /not found in private storage bucket/,
  );

  // Non-moderator cannot call sync-games or upload to public bucket
  await assert.rejects(
    aliceClient.request("/moderation/sync-games", { method: "POST", body: {} }),
    /Moderator permission required/,
  );

  const rateStats = await aliceClient.request(
    `/games/${encodeURIComponent(gameKey)}/rating`,
    { method: "POST", body: { score: 5 } },
  );
  assert.equal(rateStats.count, 1);
  assert.equal(rateStats.average, 5);
  assert.equal(rateStats.mine, 5);

  const commentRes = await aliceClient.request(
    `/games/${encodeURIComponent(gameKey)}/comments`,
    { method: "POST", body: { body: "Works without any VPS!" } },
  );
  assert.ok(commentRes.id);

  // 3. Bob logs in and reports Alice's comment
  await bobClient.request("/auth/login", {
    method: "POST",
    body: { email: "bob@example.invalid", password: "secret" },
  });
  await bobClient.request(`/comments/${commentRes.id}/report`, {
    method: "POST",
    body: { reason: "Testing report moderation queue" },
  });

  // 4. Alice uploads a screenshot to private bucket and submits a game
  const uploaded = await aliceClient.request("/uploads", {
    method: "POST",
    file: new File([fakeWebpBytes], "shot.png", { type: "image/png" }),
  });
  assert.equal(uploaded.id, fakeImageId);
  assert.equal(publicBuckets.has(`${fakeImageId}.webp`), false);

  // Bob cannot read Alice's private screenshot from storage.objects RLS
  const bobReadAlicePrivate = await execAs("authenticated", bob, "", (tx) =>
    tx.query(
      "select name from storage.objects where bucket_id = 'community-media-private'",
    ),
  );
  assert.equal(bobReadAlicePrivate.rows.length, 0);

  const subRes = await aliceClient.request("/submissions", {
    method: "POST",
    body: {
      payload: {
        title: "Zero VPS Odyssey",
        description: "A browser game submitted directly from GitHub Pages.",
        engine: "Three.js",
        track: "3d",
        accessKind: "playable",
        url: "https://example.org/zero-vps-odyssey",
        sourceUrl: "https://github.com/example/zero-vps-odyssey",
        license: "MIT",
        aiUse: "assisted",
        screenshots: [uploaded.id],
        rightsConfirmed: true,
      },
    },
  });
  assert.ok(subRes.id);

  // 5. Admin reviews from browser: approves Alice's submission (promoting screenshot to public bucket) and dismisses report
  const queue = await adminClient.request("/moderation");
  assert.equal(queue.submissions.length, 1);
  assert.equal(queue.reports.length, 1);

  await adminClient.request("/moderation/review", {
    method: "POST",
    body: {
      id: subRes.id,
      revision: 1,
      approve: true,
      note: "Verified playable build and screenshot.",
      screenshots: [uploaded.id],
    },
  });
  assert.equal(publicBuckets.has(`${fakeImageId}.webp`), true);

  await adminClient.request("/moderation/report", {
    method: "POST",
    body: {
      id: queue.reports[0].id,
      hide: false,
      note: "Constructive comment, keeping visible.",
    },
  });

  // 6. Approved game is now listed publicly with CDN public media URL
  const works = await bobClient.request("/works?offset=0");
  assert.equal(works.count, 1);
  assert.equal(works.items[0].title, "Zero VPS Odyssey");
  assert.equal(
    bobClient.publicMediaUrl(uploaded.id),
    `https://direct.supabase.co/storage/v1/object/public/community-media-public/${uploaded.id}.webp`,
  );
});
