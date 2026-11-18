import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import { loadMigrations } from "../scripts/lib/migrations.mjs";
import { databaseAdapter } from "../scripts/lib/catalog/database.mjs";
import {
  createCommunityAuth,
  safeReturnTo,
} from "../scripts/lib/community/auth.mjs";

// Test-only provider: production always calls real Supabase Auth.
const id = "20000000-0000-4000-8000-000000000001",
  origin = "http://community.test";
let pg,
  database,
  auth,
  now = Date.now(),
  requests = [],
  refreshCount = 0;
before(async () => {
  pg = new PGlite();
  await pg.exec(
    "create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key,email_confirmed_at timestamptz);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;",
  );
  for (const m of await loadMigrations()) await pg.exec(m.sql);
  await pg.query("insert into auth.users values($1,now())", [id]);
  database = databaseAdapter(
    (run) => pg.transaction((tx) => run({ query: (s, a) => tx.query(s, a) })),
    async () => {},
    {
      backendRole: "community_backend",
      userRole: "community_user",
      anonymousRole: "community_anon",
    },
  );
  const fetcher = async (url, options) => {
    const u = new URL(url),
      body = options.body ? JSON.parse(options.body) : null;
    requests.push({ url: u, body, headers: options.headers });
    if (u.pathname.endsWith("/settings"))
      return Response.json({
        disable_signup: false,
        external: { email: true, github: false },
      });
    if (u.pathname.endsWith("/user"))
      return Response.json({
        id,
        email: "player@example.invalid",
        email_confirmed_at: new Date().toISOString(),
      });
    if (u.pathname.endsWith("/signup") || u.pathname.endsWith("/otp"))
      return Response.json({ user: { id } });
    if (u.pathname.endsWith("/token")) {
      if (u.searchParams.get("grant_type") === "refresh_token") refreshCount++;
      return Response.json({
        access_token: "fixture-access-private",
        refresh_token: "fixture-refresh-private",
        expires_in: 3600,
        user: { id },
      });
    }
    if (u.pathname.endsWith("/logout"))
      return new Response(null, { status: 204 });
    throw new Error("Unexpected test Auth request");
  };
  auth = createCommunityAuth({
    database,
    url: "http://auth.test",
    publishableKey: "fixture-public-key",
    origin,
    secret: "test-only-secret-with-more-than-thirty-two-characters",
    fetcher,
    clock: () => now,
  });
});
after(async () => pg?.close());
test("public sessions are separate opaque HttpOnly cookies and never expose Auth tokens", async () => {
  const result = await auth.login("player@example.invalid", "fixture-password");
  assert.match(result.cookie, /^gamemap-community=[\w-]{43};/);
  assert.match(result.cookie, /HttpOnly; SameSite=Strict/);
  assert.ok(!result.cookie.includes("fixture-access"));
  assert.ok(!result.cookie.includes("fixture-refresh"));
  assert.ok(!result.cookie.includes("example.invalid"));
  const request = { headers: { cookie: result.cookie.split(";")[0] } };
  const read = await auth.read(request);
  assert.equal(read.user.id, id);
  assert.equal(read.profile.displayName, "Player");
  assert.ok(read.csrf.length > 32);
  const stored = (
    await pg.query("select encrypted_payload from community.sessions")
  ).rows[0].encrypted_payload;
  assert.ok(!stored.includes("fixture-access"));
  assert.ok(!stored.includes("fixture-refresh"));
  assert.equal(
    (
      await pg.query(
        "select count(*)::int n from catalog.memberships where user_id=$1",
        [id],
      )
    ).rows[0].n,
    0,
  );
  await auth.logout(request, read);
  assert.equal(await auth.read(request), null);
});
test("email signup uses one-time, browser-bound PKCE and a safe local return path", async () => {
  const result = await auth.signup({
    email: "player@example.invalid",
    password: "fixture-password-12",
    displayName: "Player",
    returnTo: "https://evil.invalid/",
  });
  assert.equal(result.verificationRequired, true);
  assert.match(result.flowCookie, /SameSite=Lax/);
  const signup = requests.findLast((r) => r.url.pathname.endsWith("/signup")),
    callback = new URL(signup.url.searchParams.get("redirect_to"));
  assert.equal(callback.origin, origin);
  const state = callback.searchParams.get("state");
  assert.ok(state);
  await assert.rejects(
    auth.callback(
      { headers: { cookie: result.flowCookie.split(";")[0] } },
      new URLSearchParams({ state: "wrong", code: "fixture-code" }),
    ),
    /expired|another browser/,
  );
  const response = await auth.callback(
    { headers: { cookie: result.flowCookie.split(";")[0] } },
    new URLSearchParams({ state, code: "fixture-code" }),
  );
  assert.equal(response.returnTo, "/zh/examples/");
  const exchange = requests.findLast(
    (r) => r.url.searchParams.get("grant_type") === "pkce",
  );
  assert.equal(
    createHash("sha256")
      .update(exchange.body.code_verifier)
      .digest("base64url"),
    signup.body.code_challenge,
  );
  assert.equal(exchange.body.auth_code, "fixture-code");
  await assert.rejects(
    auth.callback(
      { headers: { cookie: result.flowCookie.split(";")[0] } },
      new URLSearchParams({ state, code: "fixture-code" }),
    ),
    /expired|already/,
  );
});
test("GitHub is explicitly unavailable without a configured provider", async () => {
  assert.equal((await auth.settings()).github, false);
  await assert.rejects(auth.github("/examples/"), /not been configured/);
});
test("refresh-token rotation is serialized for concurrent reads", async () => {
  const result = await auth.login("player@example.invalid", "fixture-password");
  now += 3590000;
  const req = { headers: { cookie: result.cookie.split(";")[0] } };
  const values = await Promise.all([
    auth.read(req),
    auth.read(req),
    auth.read(req),
  ]);
  assert.ok(values.every((v) => v.user.id === id));
  assert.equal(refreshCount, 1);
});
test("return paths cannot redirect to external sites or private Studio routes", () => {
  for (const value of [
    "https://evil.invalid/",
    "//evil.invalid/",
    "/api/logout",
    "/studio/",
    "javascript:alert(1)",
  ])
    assert.equal(safeReturnTo(value, origin), "/zh/examples/");
  assert.equal(
    safeReturnTo("/zh/examples/?q=game#community", origin),
    "/zh/examples/?q=game#community",
  );
});
