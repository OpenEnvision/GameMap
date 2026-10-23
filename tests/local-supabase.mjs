// Explicit opt-in integration. Actual local Supabase Auth/PostgREST/PostgreSQL; no auth.uid shim.
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { parseEnv } from "node:util";
import { createServer as createNetServer } from "node:net";
import { randomUUID } from "node:crypto";
import postgres from "postgres";
import sharp from "sharp";
import { chromium } from "@playwright/test";
import {
  readLocalStatus,
  localAccess,
  localDirectory,
  assertLoopback,
} from "../scripts/lib/catalog/local-runtime.mjs";
import { loadContent } from "../scripts/lib/content.mjs";
import {
  backupLocalCatalog,
  restoreLocalProbe,
} from "../scripts/lib/catalog/local-backup.mjs";
import { createImportBundle } from "../scripts/lib/platform.mjs";
import { root } from "../scripts/lib/documents.mjs";
import { connectDatabase } from "../scripts/lib/catalog/database.mjs";
import {
  createSupabaseAuth,
  createSessions,
  sessionCodec,
} from "../scripts/lib/catalog/auth.mjs";
import { createCatalogWorker } from "../scripts/lib/catalog/worker.mjs";
import { createMediaStore } from "../scripts/lib/catalog/media.mjs";
import { createStudioServer } from "../scripts/lib/catalog/server.mjs";
import {
  writeReleasePackage,
  verifyReleaseDirectory,
} from "../scripts/lib/catalog/release-files.mjs";
import { canonicalJSON, sha256 } from "../scripts/lib/catalog/codec.mjs";

process.env.NODE_ENV = "test";
const status = await readLocalStatus(),
  access = await localAccess();
assert.equal(access.format, "gamemap.local-access");
const env = parseEnv(await readFile(resolve(root, ".env"), "utf8"));
assertLoopback(env.CATALOG_DATABASE_URL, ["postgres:", "postgresql:"]);
assert.equal(
  new URL(env.CATALOG_DATABASE_URL).username,
  access.login,
  "Integration must use the dedicated local login",
);
const owner = postgres(status.DB_URL, {
  max: 1,
  prepare: false,
  onnotice() {},
});
const initialReleaseId = (
  await owner`select release_id from catalog.deployment_state`
)[0].release_id;
const database = connectDatabase(env.CATALOG_DATABASE_URL);
const context = await loadContent(),
  bundle = await createImportBundle(context);
const media = createMediaStore(env.CATALOG_MEDIA_ROOT);
await media.ready();
const auth = createSupabaseAuth(
  status.API_URL,
  status.PUBLISHABLE_KEY || status.ANON_KEY,
);
let refreshes = 0;
const measuredAuth = {
  ...auth,
  refresh: async (token) => {
    refreshes++;
    return auth.refresh(token);
  },
};
const reservation = createNetServer();
await new Promise((done) => reservation.listen(0, "127.0.0.1", done));
const port = reservation.address().port;
await new Promise((done) => reservation.close(done));
const origin = `http://127.0.0.1:${port}`;
const sessions = createSessions(database, measuredAuth, {
  secret: env.CATALOG_SESSION_SECRET,
  origin,
});
const worker = createCatalogWorker(database, context, {
  sourceFiles: bundle.snapshot.source_files,
  readAsset: (path) => media.readAsset(path),
});
const server = createStudioServer({
  origin,
  database,
  context,
  sessions,
  media,
  worker,
  staticDirectory: resolve(root, ".build/studio"),
});
await new Promise((done) => server.listen(port, "127.0.0.1", done));
const results = [];
const check = async (name, run) => {
  await run();
  results.push({ name, passed: true });
  console.log("PASS", name);
};
async function request(
  path,
  { session, body, method = body === undefined ? "GET" : "POST", file } = {},
) {
  return fetch(origin + path, {
    method,
    headers: {
      Origin: origin,
      ...(session
        ? { Cookie: session.cookie, "X-CSRF-Token": session.csrf }
        : {}),
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(file ? { "Content-Type": "image/png" } : {}),
    },
    body: file || (body !== undefined ? JSON.stringify(body) : undefined),
  });
}
const decode = async (response, expected = 200) => {
  const data = await response.json();
  assert.equal(response.status, expected, JSON.stringify(data));
  return data;
};
async function login(role) {
  const { email, password } = access.accounts[role];
  const response = await request("/api/login", { body: { email, password } });
  const data = await decode(response);
  const cookie = response.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);
  return { cookie, csrf: data.csrf, data };
}
const rpc = async (path, token, body) =>
  fetch(status.API_URL + "/rest/v1/" + path, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      apikey: status.PUBLISHABLE_KEY || status.ANON_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
let editor, reviewer, admin, pack, releaseId;
const identifier = "local-runtime-fixture-" + randomUUID().slice(0, 8);
try {
  await check(
    "real Auth, opaque sessions and membership provisioning",
    async () => {
      await decode(
        await request("/api/login", {
          body: {
            email: access.accounts.editor.email,
            password: "wrong-local-password",
          },
        }),
        401,
      );
      await decode(
        await request("/api/login", {
          body: {
            email: access.accounts.outsider.email,
            password: access.accounts.outsider.password,
          },
        }),
        403,
      );
      editor = await login("editor");
      reviewer = await login("reviewer");
      admin = await login("admin");
      assert.equal(editor.data.role, "editor");
      assert.equal(reviewer.data.role, "reviewer");
      assert.equal(JSON.stringify(editor.data).includes("access_token"), false);
      await decode(await request("/api/catalog"), 401);
      assert.ok(
        (await decode(await request("/api/catalog", { session: editor })))
          .entries.length >= 541,
      );
    },
  );
  await check(
    "real PostgREST uses auth.uid and refuses private schema/direct worker calls",
    async () => {
      const tokens = await auth.signIn(
        access.accounts.editor.email,
        access.accounts.editor.password,
      );
      assert.equal(
        await (await rpc("rpc/catalog_role", tokens.accessToken, {})).json(),
        "editor",
      );
      const hidden = await fetch(status.API_URL + "/rest/v1/entries", {
        headers: {
          apikey: status.PUBLISHABLE_KEY || status.ANON_KEY,
          Authorization: `Bearer ${tokens.accessToken}`,
          "Accept-Profile": "catalog",
        },
      });
      assert.ok([404, 406].includes(hidden.status));
      assert.equal(
        (await rpc("rpc/record_validation", tokens.accessToken, {})).status,
        404,
      );
      assert.equal(
        (
          await (
            await rpc("rpc/catalog_published_release", undefined, {})
          ).json()
        )?.id || null,
        initialReleaseId,
      );
    },
  );
  await check(
    "database login is NOINHERIT, non-owner and cannot provision or activate",
    async () => {
      const role = (
        await owner`select rolsuper,rolbypassrls,rolinherit from pg_roles where rolname=${access.login}`
      )[0];
      assert.deepEqual(role, {
        rolsuper: false,
        rolbypassrls: false,
        rolinherit: false,
      });
      await assert.rejects(
        database.system((c) => c.query("select * from auth.users")),
        /permission denied/,
      );
      await assert.rejects(
        database.system((c) =>
          c.query("select catalog.activate_release($1,null,$2)", [
            randomUUID(),
            "not-authorized",
          ]),
        ),
        /permission denied/,
      );
      await assert.rejects(
        database.system((c) =>
          c.query(
            "insert into catalog.memberships(user_id,role) values($1,$2)",
            [access.accounts.outsider.id, "admin"],
          ),
        ),
        /permission denied/,
      );
    },
  );
  await check(
    "real refresh rotation is serialized and keeps CSRF/cookies stable",
    async () => {
      const hash = sha256(editor.cookie.split("=")[1]);
      const codec = sessionCodec(env.CATALOG_SESSION_SECRET);
      const stored = (
        await owner`select encrypted_payload from catalog.studio_sessions where id_hash=${hash}`
      )[0];
      const value = codec.open(stored.encrypted_payload);
      value.expiresAt = Date.now() - 1;
      await owner`update catalog.studio_sessions set encrypted_payload=${codec.seal(value)} where id_hash=${hash}`;
      const before = refreshes;
      const responses = await Promise.all([
        request("/api/session", { session: editor }),
        request("/api/session", { session: editor }),
      ]);
      for (const response of responses) {
        const body = await decode(response);
        assert.equal(body.csrf, editor.csrf);
      }
      assert.equal(refreshes - before, 1);
      const after = codec.open(
        (
          await owner`select encrypted_payload from catalog.studio_sessions where id_hash=${hash}`
        )[0].encrypted_payload,
      );
      assert.notEqual(after.refreshToken, value.refreshToken);
      assert.equal(after.user.id, access.accounts.editor.id);
    },
  );
  await check(
    "browser login uses real Auth without exposing tokens or localStorage",
    async () => {
      const browser = await chromium.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(origin);
        await page
          .getByLabel("邮箱", { exact: true })
          .fill(access.accounts.editor.email);
        await page
          .getByLabel("密码", { exact: true })
          .fill(access.accounts.editor.password);
        await page
          .getByRole("button", { name: "登录工作台", exact: true })
          .click();
        await page.getByLabel("搜索内容", { exact: true }).waitFor();
        assert.ok(
          (await page.context().cookies()).find(
            (cookie) => cookie.name === "gamemap-studio",
          )?.httpOnly,
        );
        assert.deepEqual(
          await page.evaluate(() => Object.keys(localStorage)),
          [],
        );
        await page
          .getByRole("button", { name: "退出登录", exact: true })
          .click();
        await page.getByLabel("邮箱", { exact: true }).waitFor();
      } finally {
        await browser.close();
      }
      editor = await login("editor");
    },
  );
  await check(
    "local-only acceptance seed remains an explicit test editorial decision",
    async () => {
      const entries = (
        await decode(await request("/api/catalog", { session: admin }))
      ).entries;
      const imported = (
        await owner`select snapshot -> 'entries' as entries from catalog.import_batches where digest=${access.importDigest}`
      )[0];
      assert.ok(imported, "Local fixture import batch is missing");
      const importedIds = new Set(
        imported.entries.map((row) => row.revision_id),
      );
      // Never auto-review a human's new/successor draft in the shared local workspace.
      const fixtureHead = (row) =>
        importedIds.has(row.head_revision_id) ||
        (row.kind === "resource" &&
          row.identifier.startsWith("local-runtime-fixture-"));
      const drafts = entries.filter(
        (entry) =>
          entry.state === "draft" &&
          entry.identifier !== identifier &&
          fixtureHead(entry),
      );
      if (drafts.length)
        await decode(
          await request("/api/review", {
            session: admin,
            body: {
              action: "submit",
              ids: drafts.map((row) => row.head_revision_id),
            },
          }),
        );
      const pending = [
        ...drafts,
        ...entries.filter(
          (row) => row.state === "in_review" && fixtureHead(row),
        ),
      ];
      if (pending.length)
        await decode(
          await request("/api/review", {
            session: reviewer,
            body: {
              action: "approve",
              ids: pending.map((row) => row.head_revision_id),
              note: "LOCAL ACCEPTANCE FIXTURE ONLY. Not a production editorial decision, external verification or reproduction.",
            },
          }),
        );
    },
  );
  let revision, payload, asset;
  await check(
    "real SQL draft conflicts, trusted media validation and independent review",
    async () => {
      const png = await sharp({
        create: { width: 80, height: 40, channels: 3, background: "#487250" },
      })
        .png()
        .toBuffer();
      asset = await decode(
        await request("/api/media", {
          session: editor,
          method: "POST",
          file: png,
        }),
        201,
      );
      const original = bundle.snapshot.entries.find(
        (row) => row.kind === "resource",
      );
      payload = {
        ...original.body.payload,
        id: identifier,
        name: "Local Supabase acceptance fixture",
        summary:
          "Local-only development fixture; not an actual verified resource.",
        detail: "Real Auth/PostgreSQL acceptance fixture.",
        url: "https://example.invalid/" + identifier,
        links: [],
        access: undefined,
      };
      const identity = {
        organization: "Local acceptance fixture",
        kind: "creator",
        asset: asset.path,
        sha256: asset.sha256,
        sourceUrl: payload.url,
        logoSourceUrl: payload.url,
        notes: "Synthetic test pixels; not a real project mark or reuse grant.",
      };
      const body = {
        kind: "resource",
        identifier,
        schemaVersion: 1,
        expectedHead: null,
        payload,
        attachments: { identity },
        translations: [],
      };
      revision = await decode(
        await request("/api/drafts", { session: editor, body }),
        201,
      );
      await decode(
        await request("/api/drafts", { session: editor, body }),
        409,
      );
      await decode(
        await request(`/api/revisions/${revision.id}/validate`, {
          session: editor,
          body: {},
        }),
      );
      await decode(
        await request("/api/review", {
          session: editor,
          body: { action: "submit", ids: [revision.id] },
        }),
      );
      await decode(
        await request("/api/review", {
          session: editor,
          body: {
            action: "approve",
            ids: [revision.id],
            note: "Must fail self review",
          },
        }),
        403,
      );
      await decode(
        await request("/api/review", {
          session: reviewer,
          body: {
            action: "approve",
            ids: [revision.id],
            note: "Local synthetic test fixture; not factual project verification.",
          },
        }),
      );
    },
  );
  await check(
    "real JSONB translations require explicit source-fingerprint review",
    async () => {
      const entry = (
        await decode(await request("/api/catalog", { session: editor }))
      ).entries.find((row) => row.key === "resource:" + identifier);
      payload = {
        ...entry.body.payload,
        summary: entry.body.payload.summary + " Updated source.",
      };
      const draft = {
        kind: "resource",
        identifier,
        schemaVersion: 1,
        expectedHead: revision.id,
        payload,
        attachments: entry.body.attachments,
        translations: [
          {
            locale: "zh",
            field: "summary",
            value: "仅用于本地 Supabase 验收的合成内容。",
            source_hash: "0".repeat(64),
          },
        ],
      };
      const stale = await decode(
        await request("/api/drafts", { session: editor, body: draft }),
        201,
      );
      await decode(
        await request(`/api/revisions/${stale.id}/validate`, {
          session: editor,
          body: {},
        }),
        422,
      );
      revision = await decode(
        await request("/api/drafts", {
          session: editor,
          body: {
            ...draft,
            expectedHead: stale.id,
            translations: draft.translations.map((row) => ({
              ...row,
              source_hash: sha256(JSON.stringify(payload.summary)),
            })),
          },
        }),
        201,
      );
      await decode(
        await request(`/api/revisions/${revision.id}/validate`, {
          session: editor,
          body: {},
        }),
      );
      await decode(
        await request("/api/review", {
          session: editor,
          body: { action: "submit", ids: [revision.id] },
        }),
      );
      await decode(
        await request("/api/review", {
          session: reviewer,
          body: {
            action: "approve",
            ids: [revision.id],
            note: "Local acceptance: explicitly checked synthetic Chinese translation against its source hash.",
          },
        }),
      );
    },
  );
  await check(
    "generated guide review, local frozen context and portable media backup",
    async () => {
      await decode(
        await request("/api/releases", { session: reviewer, body: {} }),
        422,
      );
      const synced = await decode(
        await request("/api/documents/sync", { session: admin, body: {} }),
      );
      assert.ok(synced.ids.length);
      assert.equal(
        Number(
          (
            await owner`select count(*) as n from catalog.revisions where id=any(${synced.ids}::uuid[]) and created_by=${access.accounts.admin.id}`
          )[0].n,
        ),
        synced.ids.length,
      );
      await decode(
        await request("/api/review", {
          session: admin,
          body: { action: "submit", ids: synced.ids },
        }),
      );
      await decode(
        await request("/api/review", {
          session: admin,
          body: {
            action: "approve",
            ids: synced.ids,
            note: "Must not self-approve a synchronized guide",
          },
        }),
        403,
      );
      await decode(
        await request("/api/review", {
          session: reviewer,
          body: {
            action: "approve",
            ids: synced.ids,
            note: "Local acceptance: inspected generated source view indexes.",
          },
        }),
      );
      const frozen = await decode(
        await request("/api/releases", { session: reviewer, body: {} }),
        201,
      );
      releaseId = frozen.id;
      pack = await decode(
        await request(`/api/releases/${releaseId}/export`, {
          session: reviewer,
        }),
      );
      assert.equal(JSON.parse(pack.context_text).environment, "local");
      const output = join(localDirectory, "acceptance-release-" + releaseId);
      await writeReleasePackage(context, pack, output, {
        sourceFiles: bundle.snapshot.source_files,
        readAsset: (path) => media.readAsset(path),
      });
      await verifyReleaseDirectory(
        context,
        output,
        bundle.snapshot.source_files,
      );
      assert.equal(
        (await owner`select release_id from catalog.deployment_state`)[0]
          .release_id,
        initialReleaseId,
      );
      results.push({
        name: "private release package",
        path: output,
        release: releaseId,
      });
    },
  );
  await check(
    "real anonymous API respects activation authority, including the artifact-bound publisher",
    async () => {
      const bound = (
        await owner`select target_key from catalog.publication_state`
      )[0].target_key;
      if (bound) {
        await assert.rejects(
          owner.begin(async (sql) => {
            await sql.unsafe("set local role service_role");
            await sql`select catalog.activate_release(${releaseId}::uuid,${initialReleaseId}::uuid,'blocked-legacy-local-test')`;
          }),
          /artifact-bound publisher/,
        );
        assert.equal(
          (
            await (
              await rpc("rpc/catalog_published_release", undefined, {})
            ).json()
          )?.id || null,
          initialReleaseId,
        );
        return;
      }
      await owner.begin(async (sql) => {
        await sql.unsafe("set local role service_role");
        await sql`select catalog.activate_release(${releaseId}::uuid,${initialReleaseId}::uuid,'local-acceptance-pointer-test')`;
      });
      const visible = await (
        await rpc("rpc/catalog_published_release", undefined, {})
      ).json();
      assert.equal(visible.id, releaseId);
      await assert.rejects(
        owner.begin(async (sql) => {
          await sql.unsafe("set local role service_role");
          await sql`select catalog.activate_release(${releaseId}::uuid,null,'stale-local-acceptance')`;
        }),
        /Deployment conflict/,
      );
    },
  );
  await check(
    "membership revocation denies the next protected request",
    async () => {
      await owner`delete from catalog.memberships where user_id=${access.accounts.editor.id}`;
      try {
        await decode(await request("/api/catalog", { session: editor }), 403);
      } finally {
        await owner`insert into catalog.memberships(user_id,role) values(${access.accounts.editor.id},'editor') on conflict do nothing`;
      }
    },
  );
  await check(
    "private media bytes restore exactly from the portable package",
    async () => {
      const file = resolve(
        env.CATALOG_MEDIA_ROOT,
        asset.path.split("/").at(-1),
      );
      const before = await readFile(file);
      await writeFile(file, Buffer.from("local restore probe"));
      try {
        await assert.rejects(
          media.readAsset("website/public/" + asset.path),
          /corrupt|digest|checksum|identity/i,
        );
      } finally {
        const restored = await readFile(
          join(
            localDirectory,
            "acceptance-release-" + releaseId,
            "files/website/public",
            asset.path,
          ),
        );
        await writeFile(file, restored, { mode: 0o600 });
        assert.equal(sha256(restored), sha256(before));
      }
      assert.equal(
        sha256(await media.readAsset("website/public/" + asset.path)),
        asset.sha256,
      );
    },
  );
  await check(
    "consistent database backup restores catalog/Auth rows, RPC grants and matching source",
    async () => {
      const directory = await backupLocalCatalog(env.CATALOG_MEDIA_ROOT);
      const proof = await restoreLocalProbe(directory);
      assert.ok(
        proof.tables > 20 && proof.sourceFiles > 100 && proof.mediaFiles > 0,
      );
      results.push({
        name: "private consistent backup and separate restore probe",
        path: directory,
        ...proof,
      });
    },
  );
  await writeFile(
    join(localDirectory, "integration-report.json"),
    JSON.stringify(
      {
        format: "gamemap.local-integration",
        version: 1,
        environment: "local",
        realAuth: true,
        realPostgres: true,
        realPostgREST: true,
        tests: results,
        productionDeployed: false,
      },
      null,
      2,
    ) + "\n",
    { mode: 0o600 },
  );
  console.log(
    `Local Supabase acceptance passed: ${results.filter((row) => row.passed).length} checks. No production service was used.`,
  );
} finally {
  server.closeAllConnections();
  await new Promise((done) => server.close(done));
  await database.close();
  await owner.end({ timeout: 5 });
}
