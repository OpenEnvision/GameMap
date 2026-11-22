import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { studioFixture, accounts } from "../helpers/studio-fixture.mjs";
import { loadMigrations } from "../../scripts/lib/migrations.mjs";
import { canonicalJSON, sha256 } from "../../scripts/lib/catalog/codec.mjs";
import {
  assertLeastPrivilegeLogin,
  clientAddress,
} from "../../scripts/lib/catalog/database.mjs";
import { publicationQueries } from "../../scripts/lib/catalog/publication-database.mjs";
import {
  createCloudPublisher,
  createGitHubPagesAdapter,
  createPersistentNodeAdapter,
  cloudTargetDigest,
} from "../../scripts/lib/catalog/cloud-publication.mjs";
import {
  parseWithdrawalPolicy,
  renderTombstoneHtml,
  createDenylistChecker,
} from "../../scripts/lib/catalog/withdrawal.mjs";
import { assertReleaseParity } from "../../scripts/lib/catalog/site-build.mjs";
import { createPublicationServer } from "../../scripts/lib/catalog/publication-server.mjs";
import { verifyCloudBackupArchive } from "../../scripts/lib/catalog/cloud-backup.mjs";
import {
  validateCommunityProductionEnvironment,
  createProductionCommunityService,
  syncCommunityGamesFromSite,
} from "../../scripts/lib/community/production.mjs";
import { renderProvisioningSQL } from "../../scripts/platform/cloud-provision.mjs";

let directory;
before(async () => {
  directory = await mkdtemp(join(tmpdir(), "gamemap-cloud-platform-"));
});
after(async () => {
  await rm(directory, { recursive: true, force: true });
});

async function cloudSqlFixture(environment = "staging") {
  const pg = new PGlite();
  await pg.exec(`create role anon; create role authenticated; create role service_role; create schema auth;
    create table auth.users(id uuid primary key, email_confirmed_at timestamptz default now());
    create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;`);
  for (const migration of await loadMigrations()) await pg.exec(migration.sql);
  const realm = (
    await pg.query(
      "select catalog.initialize_release_realm($1,$2,$3) as realm",
      [environment, `cloud:${environment}`, `${environment}-pages`],
    )
  ).rows[0].realm;
  for (const role of ["editor", "reviewer", "admin"]) {
    await pg.query("insert into auth.users(id) values($1)", [
      accounts[role].id,
    ]);
    await pg.query(
      "insert into catalog.memberships(user_id,role) values($1,$2)",
      [accounts[role].id, role],
    );
  }
  return { pg, realm };
}

async function createCleanCloudRelease(pg, realm, identifier) {
  const as = (role, actor, run) =>
    pg.transaction(async (client) => {
      await client.exec("set local role " + role);
      await client.query("select set_config('request.jwt.claim.sub',$1,true)", [
        actor,
      ]);
      return run(client);
    });
  const revId = (
    await as("authenticated", accounts.editor.id, (client) =>
      client.query(
        "select public.catalog_save_draft('resource',$1,1,$2,'/resources/',$3,null) as id",
        [
          identifier,
          `/resources/${identifier}/`,
          canonicalJSON({
            title: identifier,
            summary: "Cloud fixture record",
            payload: { id: identifier },
            attachments: {},
          }),
        ],
      ),
    )
  ).rows[0].id;
  const rev = (
    await pg.query("select * from catalog.revisions where id=$1", [revId])
  ).rows[0];
  const validator = (
    await pg.query(
      "select validator_key from catalog.content_schemas where kind='resource' and version=1",
    )
  ).rows[0].validator_key;
  await pg.query(
    "select catalog.record_validation($1,$2,$3,'cloud-test','test://cloud')",
    [revId, rev.content_digest, validator],
  );
  await as("authenticated", accounts.editor.id, (client) =>
    client.query("select public.catalog_submit_revision($1)", [revId]),
  );
  await as("authenticated", accounts.reviewer.id, (client) =>
    client.query(
      "select public.catalog_review_revision($1,true,'Cloud test')",
      [revId],
    ),
  );
  const gitCommit = "b".repeat(40);
  const releaseId = (
    await as("authenticated", accounts.reviewer.id, (client) =>
      client.query(
        "select public.catalog_freeze_release($1::uuid[],$2) as id",
        [[revId], gitCommit],
      ),
    )
  ).rows[0].id;
  const contextText = canonicalJSON({
    format: "gamemap.build-context",
    version: 2,
    environment: realm.environment,
    realm,
    source_dirty: false,
    git_commit: gitCommit,
    selected_revisions: [
      {
        id: rev.id,
        digest: rev.content_digest,
        schema_version: rev.schema_version,
      },
    ],
  });
  await pg.query("select catalog.attach_release_context($1,$2,$3)", [
    releaseId,
    contextText,
    sha256(contextText),
  ]);
  const rel = (
    await pg.query("select digest from catalog.releases where id=$1", [
      releaseId,
    ])
  ).rows[0];
  const source = {
    mode: "release",
    release: releaseId,
    manifestDigest: rel.digest,
    contextDigest: sha256(contextText),
    gitCommit,
    realm,
    development: false,
  };
  const artifactDir = join(directory, "artifact-" + identifier);
  await mkdir(join(artifactDir, "site"), { recursive: true });
  const siteFiles = {
    "index.html": `<h1>Cloud ${identifier}</h1>`,
    "404.html": "Not found",
    "site-manifest.json": JSON.stringify({
      base: "/GameMap-staging/",
      source,
    }),
  };
  const files = [];
  for (const [name, data] of Object.entries(siteFiles)) {
    await writeFile(join(artifactDir, "site", name), data);
    files.push({
      path: name,
      bytes: Buffer.byteLength(data),
      sha256: sha256(data),
    });
  }
  const evidence = {
    format: "gamemap.site-artifact",
    version: 2,
    ...source,
    browserChecked: true,
    files,
    artifactDigest: sha256(canonicalJSON(files)),
    records: 1,
    activated: false,
  };
  await writeFile(join(artifactDir, "evidence.json"), JSON.stringify(evidence));
  return { artifactDir, evidence, siteFiles };
}

function deployerDb(pg) {
  return {
    withLock: async (run) => {
      await pg.exec("set role catalog_deployer");
      const ops = publicationQueries((text, values) => pg.query(text, values));
      try {
        return await run({
          ...ops,
          transaction: async (action) => {
            await pg.exec("begin");
            try {
              const result = await action(ops);
              await pg.exec("commit");
              return result;
            } catch (error) {
              await pg.exec("rollback");
              throw error;
            }
          },
        });
      } finally {
        await pg.exec("reset role");
      }
    },
  };
}

test("cloud publication adapter enforces non-local realms, deployed-byte checks, CAS activation, recovery and rollback", async () => {
  const { pg, realm } = await cloudSqlFixture("staging");
  try {
    const db = deployerDb(pg);
    const target = {
      format: "gamemap.cloud-target",
      version: 1,
      provider: "github-pages",
      repository: "sample-owner/GameMap-staging",
      origin: "https://sample-owner.github.io",
      base: "/GameMap-staging/",
      approvalEnvironment: "staging",
      branch: "gh-pages",
    };
    assert.throws(
      () =>
        createCloudPublisher({
          database: db,
          realm: { ...realm, environment: "local" },
          target,
          retentionDirectory: join(directory, "bad-local"),
        }),
      /staging or production/,
    );
    const a = await createCleanCloudRelease(pg, realm, "cloud-a");
    const b = await createCleanCloudRelease(pg, realm, "cloud-b");

    // In-memory live deployment transport verifying exact bytes without network access.
    let liveManifestBytes = null;
    const pushed = [];
    const adapter = createGitHubPagesAdapter({
      target,
      verifyAttempts: 1,
      verifyDelayMs: 0,
      pushArtifact: async ({ siteDirectory, evidence, run }) => {
        liveManifestBytes = await readFile(
          join(siteDirectory, "site-manifest.json"),
        );
        pushed.push({ digest: evidence.artifactDigest, run });
        return {
          deploymentId: `gh-pages:test:${evidence.artifactDigest.slice(0, 8)}`,
          deployedCommit: "c".repeat(40),
        };
      },
      fetcher: async (url) => {
        assert.equal(
          url,
          "https://sample-owner.github.io/GameMap-staging/site-manifest.json",
        );
        return new Response(liveManifestBytes, { status: 200 });
      },
    });
    const retention = join(directory, "cloud-retention");
    const publisher = createCloudPublisher({
      database: db,
      realm,
      target,
      adapter,
      retentionDirectory: retention,
    });

    // Publish A
    const first = await publisher.publish({
      input: a.artifactDir,
      expectedArtifact: null,
      expectedRelease: null,
      run: "staging-run-1",
    });
    assert.equal(first.artifact_digest, a.evidence.artifactDigest);
    assert.equal(first.release_id, a.evidence.release);
    assert.equal(
      first.latest_deployment.deployment_url,
      "https://sample-owner.github.io/GameMap-staging/",
    );
    assert.equal(
      first.latest_deployment.verified_files_digest,
      a.evidence.artifactDigest,
    );
    assert.equal(first.target.target_digest, cloudTargetDigest(target));

    // Reject stale CAS
    await assert.rejects(
      publisher.publish({
        input: b.artifactDir,
        expectedArtifact: null,
        expectedRelease: null,
        run: "stale-cas",
      }),
      /conflict/,
    );

    // Reject live verification mismatch (tampered CDN bytes)
    const badLive = createCloudPublisher({
      database: db,
      realm,
      target,
      retentionDirectory: retention,
      adapter: createGitHubPagesAdapter({
        target,
        verifyAttempts: 1,
        verifyDelayMs: 0,
        pushArtifact: async () => ({
          deploymentId: "bad-live",
          deployedCommit: "d".repeat(40),
        }),
        fetcher: async () =>
          new Response(Buffer.from('{"source":{}}'), { status: 200 }),
      }),
    });
    await assert.rejects(
      badLive.publish({
        input: b.artifactDir,
        expectedArtifact: a.evidence.artifactDigest,
        expectedRelease: a.evidence.release,
        run: "bad-live-run",
      }),
      (error) =>
        error instanceof AggregateError &&
        /digest differs/.test(error.errors[0]?.message || ""),
    );
    assert.equal((await publisher.status()).pending, true);
    await publisher.recover();
    assert.equal((await publisher.status()).pending, false);
    assert.equal(
      (await publisher.status()).artifact_digest,
      a.evidence.artifactDigest,
    );

    // Publish B then rollback to A from retained bytes
    const second = await publisher.publish({
      input: b.artifactDir,
      expectedArtifact: a.evidence.artifactDigest,
      expectedRelease: a.evidence.release,
      run: "staging-run-2",
    });
    assert.equal(second.artifact_digest, b.evidence.artifactDigest);

    const rolled = await publisher.rollback({
      artifact: a.evidence.artifactDigest,
      expectedArtifact: b.evidence.artifactDigest,
      expectedRelease: b.evidence.release,
      run: "staging-rollback-1",
    });
    assert.equal(rolled.artifact_digest, a.evidence.artifactDigest);
    assert.equal(rolled.release_id, a.evidence.release);
    assert.equal(rolled.rollback, true);

    // Persistent-node adapter switch works cleanly on another staging target
    const nodeTarget = {
      ...target,
      provider: "persistent-node",
      origin: "https://node-staging.example.com",
    };
    const nodeAdapter = createPersistentNodeAdapter({
      target: nodeTarget,
      directory: retention,
      verifyLive: false,
    });
    const nodeRes = await nodeAdapter.deploy({
      evidence: a.evidence,
      instance: first.instance_id,
      run: "node-run-1",
    });
    assert.equal(nodeRes.provider, "persistent-node");
    assert.equal(nodeRes.verifiedFilesDigest, a.evidence.artifactDigest);

    // Non-deployer roles cannot invoke cloud publication SQL
    for (const role of [
      "anon",
      "authenticated",
      "catalog_backend",
      "service_role",
    ]) {
      await pg.exec("begin; set local role " + role);
      try {
        await assert.rejects(
          pg.query("select catalog.cloud_publication_status()"),
          /permission denied/,
        );
      } finally {
        await pg.exec("rollback");
      }
    }
  } finally {
    await pg.close();
  }
});

test("emergency withdrawals enforce reviewer permissions, Studio API, release parity tombstones and HTTP 410 denylist", async () => {
  const fixture = await studioFixture();
  let server;
  try {
    // Health endpoint works unauthenticated
    const health = await fetch(fixture.address + "/api/healthz");
    assert.equal(health.status, 200);
    assert.equal((await health.json()).ok, true);

    const editor = await fixture.login("editor");
    const reviewer = await fixture.login("reviewer");
    const targetEntry = fixture.context.registry.all("resource")[0];

    // Editor cannot withdraw
    const denied = await fixture.request("/api/withdrawals", {
      session: editor,
      method: "POST",
      body: {
        key: targetEntry.key,
        reason: "Unauthorized withdrawal attempt",
        publicNotice: "Should not be accepted",
      },
    });
    assert.equal(denied.status, 403);

    // Reviewer records emergency withdrawal
    const created = await fixture.request("/api/withdrawals", {
      session: reviewer,
      method: "POST",
      body: {
        key: targetEntry.key,
        reason: "Verified copyright takedown notice #42",
        publicNotice:
          "This entry was removed following a rights-holder request.",
      },
    });
    assert.equal(created.status, 201);
    const listRes = await fixture.request("/api/withdrawals", {
      session: reviewer,
    });
    assert.equal(listRes.status, 200);
    const { withdrawals } = await listRes.json();
    assert.equal(withdrawals.length, 1);
    assert.equal(withdrawals[0].key, targetEntry.key);
    assert.equal(withdrawals[0].canonicalPath, targetEntry.url);

    // Release parity rejects silent drop, accepts explicit reviewed withdrawal policy
    const frozen = await fixture.worker.freeze(accounts.reviewer.id);
    const pack = await fixture.worker.exportRelease(
      accounts.reviewer.id,
      frozen.id,
    );
    const manifest = JSON.parse(pack.manifest_text);
    const droppedPack = {
      ...pack,
      manifest_text: JSON.stringify({
        ...manifest,
        entries: manifest.entries.filter((row) => row.key !== targetEntry.key),
      }),
    };
    assert.throws(
      () => assertReleaseParity(fixture.context, droppedPack),
      /Release drops an existing address/,
    );
    const policy = parseWithdrawalPolicy(
      {
        format: "gamemap.withdrawal-policy",
        version: 1,
        realm: fixture.realm,
        entries: [
          {
            key: targetEntry.key,
            canonicalPath: targetEntry.url,
            reason: withdrawals[0].reason,
            publicNotice: withdrawals[0].publicNotice,
            withdrawnAt: withdrawals[0].withdrawnAt,
          },
        ],
      },
      fixture.realm,
    );
    assert.doesNotThrow(() =>
      assertReleaseParity(fixture.context, droppedPack, {
        withdrawals: policy,
      }),
    );
    // Rejects withdrawn entry still left in active selection
    assert.throws(
      () => assertReleaseParity(fixture.context, pack, { withdrawals: policy }),
      /must not remain in active release selection/,
    );

    // Static tombstone renders noindex and omits internal reason
    const html = renderTombstoneHtml({
      canonicalPath: targetEntry.url,
      publicNotice: policy.entries[0].publicNotice,
      withdrawnAt: policy.entries[0].withdrawnAt,
      locale: "en",
      base: "/GameMap/",
    });
    assert.match(html, /noindex, nofollow/);
    assert.match(html, /rights-holder request/);
    assert.doesNotMatch(html, /#42/);

    // Online emergency denylist returns HTTP 410 Gone immediately on Publication Server
    const pubDir = join(directory, "denylist-pub");
    const digest = "a".repeat(64);
    await mkdir(
      join(pubDir, "artifacts", digest, "site", "resources", targetEntry.id),
      {
        recursive: true,
      },
    );
    await writeFile(
      join(pubDir, "target.json"),
      JSON.stringify({ instance: fixture.realm.instance }),
    );
    await writeFile(
      join(pubDir, "published.json"),
      JSON.stringify({
        format: "gamemap.published-pointer",
        version: 1,
        instance: fixture.realm.instance,
        artifact: digest,
      }),
    );
    await writeFile(
      join(pubDir, "artifacts", digest, "site", "site-manifest.json"),
      JSON.stringify({ base: "/GameMap/" }),
    );
    await writeFile(
      join(pubDir, "artifacts", digest, "site", "index.html"),
      "<h1>Home</h1>",
    );
    await writeFile(
      join(pubDir, "artifacts", digest, "site", "404.html"),
      "<h1>404</h1>",
    );
    await writeFile(
      join(
        pubDir,
        "artifacts",
        digest,
        "site",
        "resources",
        targetEntry.id,
        "index.html",
      ),
      "<h1>Active Entry</h1>",
    );
    const denylistFile = join(directory, "denylist.json");
    await writeFile(
      denylistFile,
      JSON.stringify({
        format: "gamemap.withdrawal-denylist",
        version: 1,
        realm: fixture.realm,
        paths: [
          {
            canonicalPath: targetEntry.url,
            publicNotice: policy.entries[0].publicNotice,
            withdrawnAt: policy.entries[0].withdrawnAt,
          },
        ],
      }),
    );
    server = createPublicationServer(pubDir, {
      denylist: createDenylistChecker(denylistFile, {
        expectedRealm: fixture.realm,
      }),
    });
    await new Promise((done) => server.listen(0, "127.0.0.1", done));
    const baseOrigin = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await fetch(baseOrigin + "/GameMap/")).status, 200);
    const gone = await fetch(baseOrigin + "/GameMap" + targetEntry.url);
    assert.equal(gone.status, 410);
    assert.equal(gone.headers.get("x-gamemap-withdrawn"), "1");
    assert.match(await gone.text(), /rights-holder request/);
    const goneZh = await fetch(baseOrigin + "/GameMap/zh" + targetEntry.url);
    assert.equal(goneZh.status, 410);
    assert.match(await goneZh.text(), /该条目已下架/);

    // Lift withdrawal
    const lifted = await fixture.request("/api/withdrawals/lift", {
      session: reviewer,
      method: "POST",
      body: { key: targetEntry.key, note: "Rights issue resolved" },
    });
    assert.equal(lifted.status, 200);
    const afterLift = await (
      await fixture.request("/api/withdrawals", { session: reviewer })
    ).json();
    assert.equal(afterLift.withdrawals.length, 0);
  } finally {
    if (server) {
      server.closeAllConnections();
      await new Promise((done) => server.close(done));
    }
    await fixture.close();
  }
});

test("startup least-privilege login audit rejects privileged or cross-role logins and accepts scoped NOINHERIT logins", async () => {
  const mockDb = (info) => ({
    system: async (fn) => fn({ query: async () => ({ rows: [{ info }] }) }),
  });
  const good = {
    login: "catalog_studio_prod",
    currentUser: "catalog_backend",
    rolsuper: false,
    rolcreaterole: false,
    rolcreatedb: false,
    rolbypassrls: false,
    rolinherit: false,
    directRoles: ["catalog_backend"],
    ownsCatalogObjects: false,
    ownsCommunityObjects: false,
  };
  await assertLeastPrivilegeLogin(mockDb(good), "catalog_backend", {
    forbiddenRoles: ["catalog_deployer", "community_backend", "service_role"],
  });
  for (const patch of [
    { rolsuper: true },
    { rolinherit: true },
    { rolbypassrls: true },
    { ownsCatalogObjects: true },
    { directRoles: ["catalog_backend", "catalog_deployer"] },
    { directRoles: ["authenticated"] },
  ]) {
    await assert.rejects(
      assertLeastPrivilegeLogin(
        mockDb({ ...good, ...patch }),
        "catalog_backend",
        { forbiddenRoles: ["catalog_deployer", "service_role"] },
      ),
    );
  }
  const sql = renderProvisioningSQL({
    studioLogin: "studio_u",
    publisherLogin: "pub_u",
    communityLogin: "comm_u",
  });
  assert.match(sql, /create role studio_u login noinherit nosuperuser/);
  assert.match(sql, /grant catalog_deployer to pub_u/);
  assert.match(
    sql,
    /grant community_backend, community_user, community_anon to comm_u/,
  );
  assert.throws(
    () =>
      renderProvisioningSQL({
        studioLogin: "same_u",
        publisherLogin: "same_u",
        communityLogin: "comm_u",
      }),
    /three distinct roles/,
  );
});

test("production community server validates HTTPS/media boundaries, trusts single proxy hop safely, and syncs release games", async () => {
  assert.equal(
    clientAddress(
      {
        headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
        socket: { remoteAddress: "127.0.0.1" },
      },
      { trustProxy: false },
    ),
    "127.0.0.1",
  );
  assert.equal(
    clientAddress(
      {
        headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
        socket: { remoteAddress: "127.0.0.1" },
      },
      { trustProxy: true },
    ),
    "5.6.7.8",
  );
  const realmFile = join(directory, "prod-realm.json");
  const { pg, realm } = await cloudSqlFixture("production");
  try {
    await writeFile(realmFile, JSON.stringify(realm));
    const mediaRoot = join(directory, "prod-comm-media");
    await mkdir(mediaRoot, { recursive: true });
    const baseEnv = {
      NODE_ENV: "production",
      COMMUNITY_DATABASE_URL:
        "postgresql://comm:secret@db.example.supabase.co:5432/postgres",
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
      COMMUNITY_SESSION_SECRET: "s".repeat(48),
      COMMUNITY_RELEASE_REALM_FILE: realmFile,
      COMMUNITY_ORIGIN: "https://gamemap.example.com",
      COMMUNITY_MEDIA_ROOT: mediaRoot,
      COMMUNITY_PORT: "4192",
      COMMUNITY_TRUST_PROXY: "1",
    };
    assert.equal(
      validateCommunityProductionEnvironment(baseEnv).trustProxy,
      true,
    );
    assert.throws(
      () =>
        validateCommunityProductionEnvironment({
          ...baseEnv,
          COMMUNITY_ORIGIN: "http://gamemap.example.com",
        }),
      /HTTPS/,
    );
    const db = {
      system: (run) =>
        pg.transaction(async (tx) => {
          await tx.exec("set local role community_backend");
          return run({ query: (text, values) => tx.query(text, values) });
        }),
      anonymous: (run) =>
        pg.transaction(async (tx) => {
          await tx.exec("set local role community_anon");
          return run({ query: (text, values) => tx.query(text, values) });
        }),
      user: (userId, run) =>
        pg.transaction(async (tx) => {
          await tx.exec("set local role community_user");
          await tx.query("select set_config('request.jwt.claim.sub',$1,true)", [
            userId,
          ]);
          return run({ query: (text, values) => tx.query(text, values) });
        }),
      close: async () => {},
    };
    const service = await createProductionCommunityService(baseEnv, {
      database: db,
      skipPrivilegeAudit: true,
    });
    try {
      await new Promise((done) => service.server.listen(0, "127.0.0.1", done));
      const addr = `http://127.0.0.1:${service.server.address().port}`;
      const hz = await fetch(addr + "/healthz");
      assert.equal(hz.status, 200);
      assert.deepEqual(await hz.json(), {
        ok: true,
        service: "gamemap-community",
        environment: "production",
      });

      // Sync verified release site games into community.games
      const siteDir = join(directory, "synced-site");
      await mkdir(join(siteDir, "examples"), { recursive: true });
      await writeFile(
        join(siteDir, "content-manifest.json"),
        JSON.stringify({
          source: {
            mode: "release",
            release: "00000000-0000-4000-8000-000000000010",
            realm,
          },
          records: [
            {
              key: "example:cloud-game",
              kind: "example",
              title: "Cloud Game",
              description: "Synced release game",
              url: "/examples/cloud-game/",
            },
          ],
        }),
      );
      await writeFile(
        join(siteDir, "examples/index.html"),
        `<div id="game-examples"><article class="example-card" data-content-ref="example:cloud-game"></article></div>`,
      );
      const synced = await syncCommunityGamesFromSite(db, realm, siteDir);
      assert.equal(synced.count, 1);
      const statsRes = await fetch(
        addr + "/api/community/stats?key=example:cloud-game",
      );
      assert.equal(statsRes.status, 200);
      const stats = await statsRes.json();
      assert.equal(stats["example:cloud-game"].count, 0);
    } finally {
      await service.close();
    }
  } finally {
    await pg.close();
  }
});

test("cloud backup verification checks paired SQL, media and publication digests and fails on tampering", async () => {
  const backupDir = join(directory, "cloud-backup-fixture");
  await mkdir(join(backupDir, "catalog-media"), { recursive: true });
  await mkdir(join(backupDir, "community-media"), { recursive: true });
  await mkdir(join(backupDir, "publication"), { recursive: true });
  const dump = Buffer.from("PGDMP-fixture-bytes");
  const media = Buffer.from("RIFF-webp-fixture");
  const target = Buffer.from('{"format":"gamemap.cloud-publication"}');
  await writeFile(join(backupDir, "database.dump"), dump);
  await writeFile(
    join(backupDir, "catalog-media", "a".repeat(64) + ".webp"),
    media,
  );
  await writeFile(join(backupDir, "publication", "target.json"), target);
  const realm = {
    format: "gamemap.release-realm",
    version: 1,
    environment: "staging",
    project: "cloud:staging",
    instance: "00000000-0000-4000-8000-000000000055",
    target: "staging-pages",
  };
  await writeFile(
    join(backupDir, "manifest.json"),
    JSON.stringify({
      format: "gamemap.cloud-backup",
      version: 1,
      realm,
      schemas: ["catalog", "community"],
      database: { bytes: dump.length, sha256: sha256(dump), tables: [] },
      catalogMedia: [
        {
          path: "a".repeat(64) + ".webp",
          bytes: media.length,
          sha256: sha256(media),
        },
      ],
      communityMedia: [],
      publication: [
        { path: "target.json", bytes: target.length, sha256: sha256(target) },
      ],
    }),
  );
  const verified = await verifyCloudBackupArchive(backupDir, realm);
  assert.equal(verified.catalogMedia.length, 1);

  await writeFile(join(backupDir, "publication", "target.json"), "tampered");
  await assert.rejects(
    verifyCloudBackupArchive(backupDir, realm),
    /size mismatch|digest mismatch/,
  );
});
