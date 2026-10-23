// Test-only Auth provider, isolated PostgreSQL and local HTTP server. Production never imports this.
import { PGlite } from "@electric-sql/pglite";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { loadContent } from "../../scripts/lib/content.mjs";
import { loadMigrations } from "../../scripts/lib/migrations.mjs";
import { createImportBundle, importSQL } from "../../scripts/lib/platform.mjs";
import { databaseAdapter } from "../../scripts/lib/catalog/database.mjs";
import {
  AuthenticationError,
  createSessions,
} from "../../scripts/lib/catalog/auth.mjs";
import { createCatalogWorker } from "../../scripts/lib/catalog/worker.mjs";
import { createMediaStore } from "../../scripts/lib/catalog/media.mjs";
import { createStudioServer } from "../../scripts/lib/catalog/server.mjs";
import { readReleaseData } from "../../scripts/lib/catalog/validation.mjs";

export const accounts = {
  editor: {
    id: "00000000-0000-4000-8000-000000000001",
    email: "editor@example.invalid",
  },
  reviewer: {
    id: "00000000-0000-4000-8000-000000000002",
    email: "reviewer@example.invalid",
  },
  admin: {
    id: "00000000-0000-4000-8000-000000000003",
    email: "admin@example.invalid",
  },
  outsider: {
    id: "00000000-0000-4000-8000-000000000004",
    email: "outsider@example.invalid",
  },
};
export const password = "test-fixture-only-password";
export async function studioFixture({
  origin = "http://studio.test",
  staticDirectory,
  port = 0,
  approved = true,
  realm: requestedRealm = {
    environment: "local",
    project: "local:studio-fixture",
    target: "local-preview",
  },
} = {}) {
  const context = await loadContent(),
    bundle = await createImportBundle(context),
    pg = new PGlite();
  await pg.exec(`create role anon; create role authenticated; create role service_role; create schema auth;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;`);
  for (const migration of await loadMigrations()) await pg.exec(migration.sql);
  const realm = (
    await pg.query(
      "select catalog.initialize_release_realm($1,$2,$3) as realm",
      [
        requestedRealm.environment,
        requestedRealm.project,
        requestedRealm.target,
      ],
    )
  ).rows[0].realm;
  for (const [role, account] of Object.entries(accounts)) {
    await pg.query("insert into auth.users values($1)", [account.id]);
    if (role !== "outsider")
      await pg.query(
        "insert into catalog.memberships(user_id, role) values($1, $2)",
        [account.id, role],
      );
  }
  await pg.exec(importSQL(bundle));
  if (approved) {
    // Explicit test setup, NOT an automatic production import approval path.
    await pg.exec("begin; set local role authenticated");
    await pg.query("select set_config('request.jwt.claim.sub', $1, true)", [
      accounts.admin.id,
    ]);
    // IDs come from verified fixture data, not a private-table query under the browser role.
    await pg.query(
      "select public.catalog_submit_revision(id) from unnest($1::uuid[]) id",
      [bundle.snapshot.entries.map((row) => row.revision_id)],
    );
    await pg.query("select set_config('request.jwt.claim.sub', $1, true)", [
      accounts.reviewer.id,
    ]);
    await pg.query(
      "select public.catalog_review_revision(id, true, 'Test fixture setup, not an actual external-source review') from unnest($1::uuid[]) id",
      [bundle.snapshot.entries.map((row) => row.revision_id)],
    );
    await pg.exec("commit");
  }
  const database = databaseAdapter(
    (run) =>
      pg.transaction((tx) =>
        run({ query: (text, values) => tx.query(text, values) }),
      ),
    () => pg.close(),
  );
  const tokens = new Map(),
    refreshes = new Map();
  const makeTokens = (user) => {
    const accessToken = `fixture-access-${randomUUID()}`,
      refreshToken = `fixture-refresh-${randomUUID()}`;
    tokens.set(accessToken, user);
    refreshes.set(refreshToken, user);
    return { accessToken, refreshToken, expiresAt: Date.now() + 3600000, user };
  };
  const auth = {
    async signIn(email, candidate) {
      const user = Object.values(accounts).find((user) => user.email === email);
      if (!user || candidate !== password) throw new AuthenticationError();
      return makeTokens(user);
    },
    async user(token) {
      if (!tokens.has(token)) throw new AuthenticationError();
      return tokens.get(token);
    },
    async refresh(token) {
      const user = refreshes.get(token);
      if (!user) throw new AuthenticationError();
      refreshes.delete(token);
      return makeTokens(user);
    },
    async signOut(token) {
      tokens.delete(token);
    },
  };
  const directory = await mkdtemp(join(tmpdir(), "gamemap-studio-media-"));
  const media = createMediaStore(directory),
    sessions = createSessions(database, auth, {
      origin,
      secret: "test-fixture-secret-never-used-in-production",
    });
  const worker = createCatalogWorker(database, context, {
    realm,
    sourceFiles: bundle.snapshot.source_files,
    readAsset: (path) => media.readAsset(path),
  });
  const server = createStudioServer({
    database,
    sessions,
    worker,
    context,
    media,
    origin,
    staticDirectory,
  });
  await new Promise((done) => server.listen(port, "127.0.0.1", done));
  const address = `http://127.0.0.1:${server.address().port}`;
  async function login(role) {
    const response = await fetch(address + "/api/login", {
      method: "POST",
      headers: { Origin: origin, "Content-Type": "application/json" },
      body: JSON.stringify({ email: accounts[role].email, password }),
    });
    const body = await response.json();
    return {
      response,
      body,
      cookie: response.headers.get("set-cookie")?.split(";")[0],
      csrf: body.csrf,
    };
  }
  async function request(
    path,
    { session, method = "GET", body, headers = {}, file } = {},
  ) {
    return fetch(address + path, {
      method,
      headers: {
        Origin: origin,
        ...(session
          ? { Cookie: session.cookie, "X-CSRF-Token": session.csrf }
          : {}),
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: file || (body !== undefined ? JSON.stringify(body) : undefined),
    });
  }
  return {
    pg,
    database,
    context,
    bundle,
    realm,
    server,
    address,
    origin,
    media,
    worker,
    auth,
    tokens,
    login,
    request,
    readRelease: (pack) => readReleaseData(context, pack),
    async close() {
      server.closeAllConnections();
      await new Promise((done) => server.close(done));
      await database.close();
      await rm(directory, { recursive: true, force: true });
    },
  };
}
