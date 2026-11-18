import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { loadMigrations } from "../../scripts/lib/migrations.mjs";
import { databaseAdapter } from "../../scripts/lib/catalog/database.mjs";
import { submissionSchema } from "../../scripts/lib/community/server.mjs";

let pg, db, publicDB;
const alice = "10000000-0000-4000-8000-000000000001",
  bob = "10000000-0000-4000-8000-000000000002",
  moderator = "10000000-0000-4000-8000-000000000003",
  unverified = "10000000-0000-4000-8000-000000000004";
const game = "example:community-security-fixture";
const run = (id, sql, args = []) =>
  (id === moderator ? db : publicDB).user(
    id,
    async (c) => (await c.query(sql, args)).rows,
  );
const rpc = async (id, sql, args = []) => (await run(id, sql, args))[0]?.result;
before(async () => {
  pg = new PGlite();
  await pg.exec(
    "create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key,email_confirmed_at timestamptz);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;",
  );
  for (const migration of await loadMigrations()) await pg.exec(migration.sql);
  for (const id of [alice, bob, moderator, unverified])
    await pg.query("insert into auth.users values($1,$2)", [
      id,
      id === unverified ? null : new Date().toISOString(),
    ]);
  await pg.query(
    "insert into catalog.memberships(user_id,role) values($1,'reviewer')",
    [moderator],
  );
  db = databaseAdapter(
    (run) =>
      pg.transaction((tx) =>
        run({ query: (sql, args) => tx.query(sql, args) }),
      ),
    async () => {},
    { backendRole: "community_backend" },
  );
  publicDB = databaseAdapter(
    (run) =>
      pg.transaction((tx) =>
        run({ query: (sql, args) => tx.query(sql, args) }),
      ),
    async () => {},
    {
      backendRole: "community_backend",
      userRole: "community_user",
      anonymousRole: "community_anon",
    },
  );
  for (const id of [alice, bob, moderator])
    await publicDB.user(id, (c) =>
      c.query("select public.community_profile($1) as result", [
        id === alice ? "Alice" : id === bob ? "Bob" : "Reviewer",
      ]),
    );
  await db.system((c) =>
    c.query("select public.community_sync_games($1::jsonb)", [
      JSON.stringify([
        {
          key: game,
          payload: {
            title: "Security fixture",
            url: "/examples/security-fixture/",
          },
        },
      ]),
    ]),
  );
});
after(async () => pg?.close());

test("public accounts cannot acquire Studio membership or read private community/catalog tables", async () => {
  assert.equal(
    (
      await db.user(alice, (c) =>
        c.query("select public.catalog_role() as role"),
      )
    ).rows[0].role,
    null,
  );
  await assert.rejects(
    db.user(alice, (c) =>
      c.query("select public.community_register_upload($1,$2,100,1280,720)", [
        "c".repeat(64),
        `website/public/media/catalog/${"c".repeat(64)}.webp`,
      ]),
    ),
    /permission denied/,
  );
  await assert.rejects(
    run(alice, "select * from catalog.entries"),
    /permission denied/,
  );
  await assert.rejects(
    run(
      alice,
      "insert into catalog.memberships(user_id,role) values($1,'admin')",
      [alice],
    ),
    /permission denied/,
  );
  await assert.rejects(
    run(alice, "select * from community.sessions"),
    /permission denied/,
  );
  await assert.rejects(
    run(alice, "select public.community_moderation()"),
    /permission denied|Moderator permission/,
  );
  await assert.rejects(
    db.anonymous((c) => c.query("select public.community_profile(null)")),
    /permission denied/,
  );
  await assert.rejects(
    rpc(unverified, "select public.community_profile(null) as result"),
    /verified email/,
  );
  await assert.rejects(
    db.system((c) => c.query("select * from catalog.revisions")),
    /permission denied/,
  );
});
test("scoped public backend cannot invoke catalog or moderation RPCs even with a forged moderator ID", async () => {
  const scoped = databaseAdapter(
    (run) =>
      pg.transaction((tx) =>
        run({ query: (sql, args) => tx.query(sql, args) }),
      ),
    async () => {},
    {
      backendRole: "community_backend",
      userRole: "community_user",
      anonymousRole: "community_anon",
    },
  );
  await assert.rejects(
    scoped.user(moderator, (c) =>
      c.query("select public.catalog_editor_entries()"),
    ),
    /permission denied/,
  );
  await assert.rejects(
    scoped.user(moderator, (c) =>
      c.query("select public.community_moderation()"),
    ),
    /permission denied/,
  );
  await assert.rejects(
    scoped.anonymous((c) =>
      c.query("select public.catalog_published_release()"),
    ),
    /permission denied/,
  );
  assert.equal(
    (
      await scoped.user(
        alice,
        async (c) =>
          (await c.query("select public.community_profile(null) as result"))
            .rows[0].result,
      )
    ).id,
    alice,
  );
});
test("five-star votes are per-user upserts, with an anonymous aggregate but no raw voter access", async () => {
  await rpc(alice, "select public.community_rate($1,5) as result", [game]);
  await rpc(alice, "select public.community_rate($1,3) as result", [game]);
  await rpc(bob, "select public.community_rate($1,5) as result", [game]);
  const stats = await db.anonymous(
    async (c) =>
      (
        await c.query("select public.community_game_stats($1) as result", [
          [game],
        ])
      ).rows[0].result,
  );
  assert.equal(stats[game].count, 2);
  assert.equal(stats[game].average, 4);
  assert.equal(stats[game].mine, null);
  assert.equal(
    (
      await rpc(alice, "select public.community_game_stats($1) as result", [
        [game],
      ])
    )[game].mine,
    3,
  );
  await assert.rejects(
    rpc(alice, "select public.community_rate($1,0) as result", [game]),
    /1 through 5/,
  );
  await assert.rejects(
    rpc(alice, "select public.community_rate($1,6) as result", [game]),
    /1 through 5/,
  );
  await assert.rejects(
    rpc(alice, "select public.community_rate($1,5) as result", [
      "example:not-public",
    ]),
    /not publicly available/,
  );
  await assert.rejects(
    db.anonymous((c) => c.query("select * from community.ratings")),
    /permission denied/,
  );
});
test("comments are literal text, deletions are owner-only, and reports are resolved only by moderators", async () => {
  const id = await rpc(
    alice,
    "select public.community_comment($1,$2) as result",
    [game, "<script>alert(1)</script> A literal review."],
  );
  await assert.rejects(
    rpc(bob, "select public.community_delete_comment($1) as result", [id]),
    /does not belong/,
  );
  const visible = await rpc(
    bob,
    "select public.community_game($1,null) as result",
    [game],
  );
  assert.equal(
    visible.comments[0].body,
    "<script>alert(1)</script> A literal review.",
  );
  assert.equal(visible.comments[0].mine, false);
  await rpc(bob, "select public.community_report($1,$2) as result", [
    id,
    "Potential unsafe content",
  ]);
  const queue = await rpc(
    moderator,
    "select public.community_moderation() as result",
  );
  assert.equal(queue.reports.length, 1);
  await assert.rejects(
    rpc(alice, "select public.community_resolve_report($1,true,$2) as result", [
      queue.reports[0].id,
      "Not a moderator",
    ]),
    /permission denied|Moderator permission/,
  );
  await rpc(
    moderator,
    "select public.community_resolve_report($1,true,$2) as result",
    [queue.reports[0].id, "Hide the reported test comment"],
  );
  assert.equal(
    (await rpc(bob, "select public.community_game($1,null) as result", [game]))
      .comments.length,
    0,
  );
  await rpc(alice, "select public.community_delete_comment($1) as result", [
    id,
  ]);
});
test("pending submissions and media stay private, ownership is enforced, and approval adds one live game", async () => {
  const image = "a".repeat(64);
  await rpc(
    alice,
    "select public.community_register_upload($1,$2,100,1280,720) as result",
    [image, `website/public/media/catalog/${image}.webp`],
  );
  const payload = {
    title: "Submitted fixture",
    description: "A genuinely described fixture game for security testing.",
    track: "2d",
    engine: "Godot",
    accessKind: "playable",
    url: "https://games.example.org/fixture",
    sourceUrl: "",
    license: "All rights reserved",
    aiUse: "none",
    screenshots: [image],
    rightsConfirmed: true,
  };
  await assert.rejects(
    rpc(bob, "select public.community_submit($1::jsonb,null) as result", [
      JSON.stringify(payload),
    ]),
    /must belong/,
  );
  const id = await rpc(
    alice,
    "select public.community_submit($1::jsonb,null) as result",
    [JSON.stringify(payload)],
  );
  assert.equal(
    (await rpc(alice, "select public.community_my_submissions() as result"))
      .length,
    1,
  );
  assert.equal(
    (await rpc(bob, "select public.community_my_submissions() as result"))
      .length,
    0,
  );
  assert.equal(
    await db.anonymous(
      async (c) =>
        (await c.query("select public.community_media($1) as result", [image]))
          .rows[0].result,
    ),
    null,
  );
  assert.equal(
    (
      await db.anonymous(
        async (c) =>
          (await c.query("select public.community_works(0) as result")).rows[0]
            .result,
      )
    ).count,
    0,
  );
  await assert.rejects(
    rpc(alice, "select public.community_review($1,1,true,$2) as result", [
      id,
      "Cannot review my own work",
    ]),
    /permission denied|Moderator permission/,
  );
  await rpc(
    moderator,
    "select public.community_review($1,1,true,$2) as result",
    [id, "Reviewed for community display, not a copyright certification"],
  );
  const works = await db.anonymous(
    async (c) =>
      (await c.query("select public.community_works(0) as result")).rows[0]
        .result,
  );
  assert.equal(works.count, 1);
  assert.equal(works.items[0].author, "Alice");
  assert.equal(works.items[0].key, "submission:" + id);
  assert.equal(works.items[0].preview.width, 1280);
  assert.ok(
    await db.anonymous(
      async (c) =>
        (await c.query("select public.community_media($1) as result", [image]))
          .rows[0].result,
    ),
  );
  await assert.rejects(
    rpc(bob, "select public.community_submit($1::jsonb,$2) as result", [
      JSON.stringify(payload),
      id,
    ]),
    /must belong|does not belong/,
  );
  await rpc(alice, "select public.community_submit($1::jsonb,$2) as result", [
    JSON.stringify({ ...payload, title: "Revised draft" }),
    id,
  ]);
  const stillPublished = await db.anonymous(
    async (c) =>
      (await c.query("select public.community_works(0) as result")).rows[0]
        .result,
  );
  assert.equal(
    stillPublished.items[0].title,
    payload.title,
    "An edit must not silently replace the approved version",
  );
  await assert.rejects(
    rpc(moderator, "select public.community_review($1,1,true,$2) as result", [
      id,
      "Stale queue",
    ]),
    /changed/,
  );
});
test("submission form rejects private network links, executable URLs and missing consent", () => {
  const valid = {
    title: "Fixture",
    description: "A valid game description.",
    engine: "Godot",
    track: "2d",
    accessKind: "playable",
    url: "https://games.example.org/play",
    aiUse: "not-stated",
    screenshots: ["b".repeat(64)],
    rightsConfirmed: true,
  };
  assert.equal(submissionSchema.safeParse(valid).success, true);
  for (const url of [
    "javascript:alert(1)",
    "http://games.example.org",
    "https://localhost/game",
    "https://127.0.0.1/game",
    "https://10.0.0.1/game",
    "https://[::1]/game",
    "https://user:password@example.org/game",
  ])
    assert.equal(
      submissionSchema.safeParse({ ...valid, url }).success,
      false,
      url,
    );
  assert.equal(
    submissionSchema.safeParse({ ...valid, rightsConfirmed: false }).success,
    false,
  );
  assert.equal(
    submissionSchema.safeParse({ ...valid, unexpected: "field" }).success,
    false,
  );
});
