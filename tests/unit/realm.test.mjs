import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  realpath,
  symlink,
  rm,
  access,
} from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { studioFixture, accounts } from "../helpers/studio-fixture.mjs";
import { loadMigrations } from "../../scripts/lib/migrations.mjs";
import { canonicalJSON, sha256 } from "../../scripts/lib/catalog/codec.mjs";
import {
  parseReleaseRealm,
  readReleaseRealmFile,
  assertReleaseRealm,
  frozenReleaseRealm,
  assertFreezeEnvironment,
} from "../../scripts/lib/catalog/release-realm.mjs";
import { createCatalogWorker } from "../../scripts/lib/catalog/worker.mjs";
import { readReleaseData } from "../../scripts/lib/catalog/validation.mjs";
import {
  buildReleaseSite,
  verifySiteArtifact,
} from "../../scripts/lib/catalog/site-build.mjs";
import { materializeSiteInput } from "../../scripts/lib/catalog/site-input.mjs";
import { createLocalPublisher } from "../../scripts/lib/catalog/publication.mjs";
import { publicationQueries } from "../../scripts/lib/catalog/publication-database.mjs";

let fixture, pack, directory;
before(async () => {
  fixture = await studioFixture();
  directory = await mkdtemp(join(tmpdir(), "gamemap-realm-"));
  const frozen = await fixture.worker.freeze(accounts.reviewer.id);
  pack = await fixture.worker.exportRelease(accounts.reviewer.id, frozen.id);
});
after(async () => {
  await fixture?.close();
  await rm(directory, { recursive: true, force: true });
});
const alternatives = (realm) => [
  { ...realm, environment: "staging" },
  { ...realm, environment: "production" },
  { ...realm, project: "another-project" },
  { ...realm, instance: "00000000-0000-4000-8000-000000000099" },
  { ...realm, target: "another-target" },
];
const copy = (value) => JSON.parse(JSON.stringify(value));
const sqlOne = async (pg, text, values = []) =>
  (await pg.query(text, values)).rows[0];
async function as(pg, role, action, actor = accounts.reviewer.id) {
  return pg.transaction(async (client) => {
    await client.exec("set local role " + role);
    await client.query("select set_config('request.jwt.claim.sub',$1,true)", [
      actor,
    ]);
    return action(client);
  });
}
const init = (
  pg,
  environment = "local",
  project = "local:realm-fixture",
  target = "local-preview",
) =>
  sqlOne(pg, "select catalog.initialize_release_realm($1,$2,$3) as realm", [
    environment,
    project,
    target,
  ]).then((row) => row.realm);
async function sqlFixture(limit = Infinity) {
  const pg = new PGlite();
  await pg.exec(`create role anon; create role authenticated; create role service_role; create schema auth;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;`);
  for (const migration of (await loadMigrations()).slice(0, limit))
    await pg.exec(migration.sql);
  for (const role of ["editor", "reviewer", "admin"]) {
    await pg.query("insert into auth.users values($1)", [accounts[role].id]);
    await pg.query(
      "insert into catalog.memberships(user_id,role) values($1,$2)",
      [accounts[role].id, role],
    );
  }
  return pg;
}
async function approvedRevision(pg, identifier) {
  const row = await as(
    pg,
    "authenticated",
    (client) =>
      sqlOne(
        client,
        "select public.catalog_save_draft('resource',$1,1,$2,'/resources/',$3,null) as id",
        [
          identifier,
          `/resources/${identifier}/`,
          canonicalJSON({
            title: identifier,
            summary: "SQL realm fixture only",
            payload: { id: identifier },
            attachments: {},
          }),
        ],
      ),
    accounts.editor.id,
  );
  const revision = await sqlOne(
    pg,
    "select * from catalog.revisions where id=$1",
    [row.id],
  );
  const schema = await sqlOne(
    pg,
    "select validator_key from catalog.content_schemas where kind='resource' and version=1",
  );
  await pg.query(
    "select catalog.record_validation($1,$2,$3,'realm-test','test://realm')",
    [row.id, revision.content_digest, schema.validator_key],
  );
  await as(
    pg,
    "authenticated",
    (client) =>
      client.query("select public.catalog_submit_revision($1)", [row.id]),
    accounts.editor.id,
  );
  await as(pg, "authenticated", (client) =>
    client.query(
      "select public.catalog_review_revision($1,true,'SQL fixture only, not external review')",
      [row.id],
    ),
  );
  return revision;
}
const freeze = (pg, revisions) =>
  as(pg, "authenticated", (client) =>
    sqlOne(
      client,
      "select public.catalog_freeze_release($1::uuid[],$2) as id",
      [revisions.map((r) => r.id), "a".repeat(40)],
    ),
  );
function publicationDatabase(pg) {
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

test("realm contracts reject missing fields, extra secrets and malformed identifiers; NODE_ENV cannot choose a realm", () => {
  const realm = fixture.realm;
  assert.deepEqual(parseReleaseRealm(realm), realm);
  for (const value of [
    null,
    {},
    { ...realm, password: "not-a-config-field" },
    { ...realm, project: "https://project.invalid" },
    { ...realm, target: "../production" },
  ])
    assert.throws(() => parseReleaseRealm(value), /registered release realm/);
  for (const other of alternatives(realm))
    assert.throws(() => assertReleaseRealm(other, realm), /realm mismatch/);
  assertFreezeEnvironment(realm, { nodeEnv: "production", dirty: false });
  assert.equal(realm.environment, "local");
  for (const environment of ["staging", "production"]) {
    const remote = { ...realm, environment };
    assert.throws(
      () => assertFreezeEnvironment(remote, { nodeEnv: "test", dirty: false }),
      /security mode/,
    );
    assert.throws(
      () =>
        assertFreezeEnvironment(remote, { nodeEnv: "production", dirty: true }),
      /non-development freeze/,
    );
    assertFreezeEnvironment(remote, { nodeEnv: "production", dirty: false });
  }
});

test("invalid operator files fail without echoing accidentally supplied secret values", async () => {
  const file = join(directory, "invalid-realm.json");
  const sentinel = "never-log-this-private-sentinel";
  await writeFile(file, "not-json " + sentinel);
  await assert.rejects(
    readReleaseRealmFile(file),
    (error) =>
      !error.message.includes(sentinel) &&
      /raw values were not printed/.test(error.message),
  );
  await writeFile(
    file,
    JSON.stringify({ ...fixture.realm, password: sentinel }),
  );
  await assert.rejects(
    readReleaseRealmFile(file),
    (error) =>
      !error.message.includes(sentinel) &&
      /registered release realm/.test(error.message),
  );
});

test("freezing binds both immutable manifest and context; materialization preserves the exact expected identity", () => {
  const data = readReleaseData(fixture.context, pack);
  assert.equal(data.manifest.format_version, 2);
  assert.equal(data.build.version, 2);
  assert.equal(data.build.environment, "local");
  assert.deepEqual(data.realm, fixture.realm);
  assert.deepEqual(
    materializeSiteInput(fixture.context, pack).source.realm,
    fixture.realm,
  );
  const changed = copy(pack),
    build = JSON.parse(changed.context_text);
  build.realm.project = "forged-project";
  changed.context_text = canonicalJSON(build);
  changed.context_digest = sha256(changed.context_text);
  assert.throws(
    () => readReleaseData(fixture.context, changed),
    /realm mismatch/,
  );
  assert.throws(
    () =>
      frozenReleaseRealm(data.manifest, {
        ...data.build,
        environment: "production",
      }),
    /environment differs/,
  );
});

test("independent worker and build expectations reject every foreign realm before producing a release or output", async () => {
  const before = await sqlOne(
    fixture.pg,
    "select count(*) as n from catalog.releases",
  );
  for (const realm of alternatives(fixture.realm)) {
    const worker = createCatalogWorker(fixture.database, fixture.context, {
      realm,
    });
    await assert.rejects(worker.freeze(accounts.reviewer.id), /realm mismatch/);
    await assert.rejects(
      buildReleaseSite(
        fixture.context,
        pack,
        directory,
        join(directory, "rejected"),
        { realm, development: true },
      ),
      /realm mismatch/,
    );
  }
  assert.deepEqual(
    await sqlOne(fixture.pg, "select count(*) as n from catalog.releases"),
    before,
  );
  await assert.rejects(access(join(directory, "rejected")), /ENOENT/);
  const old = copy(pack),
    manifest = JSON.parse(old.manifest_text),
    build = JSON.parse(old.context_text);
  manifest.format_version = 1;
  build.version = 1;
  delete manifest.realm;
  delete build.realm;
  old.manifest_text = canonicalJSON(manifest);
  old.manifest_digest = sha256(old.manifest_text);
  old.context_text = canonicalJSON(build);
  old.context_digest = sha256(old.context_text);
  await assert.rejects(
    buildReleaseSite(
      fixture.context,
      old,
      directory,
      join(directory, "legacy"),
      { realm: fixture.realm, development: true },
    ),
    /legacy releases are read-only/,
  );
});

test("SQL registration is operator-only and immutable; a trusted backend cannot attach a foreign context", async () => {
  for (const role of [
    "anon",
    "authenticated",
    "service_role",
    "catalog_backend",
    "catalog_deployer",
  ])
    await assert.rejects(
      as(fixture.pg, role, (client) =>
        client.query(
          "select catalog.initialize_release_realm('production','other-project','other-target')",
        ),
      ),
      /permission denied/,
    );
  assert.deepEqual(
    await init(
      fixture.pg,
      "local",
      fixture.realm.project,
      fixture.realm.target,
    ),
    fixture.realm,
  );
  await assert.rejects(init(fixture.pg, "production"), /immutable/);
  await assert.rejects(
    fixture.pg.exec(
      "update catalog.release_realms set environment='production'",
    ),
    /Immutable/,
  );
  await assert.rejects(
    fixture.pg.exec("delete from catalog.release_realms"),
    /Immutable/,
  );
  const build = JSON.parse(pack.context_text),
    revisions = JSON.parse(pack.manifest_text).entries.map((r) => ({
      id: r.revision_id,
    }));
  const frozen = await freeze(fixture.pg, revisions);
  for (const realm of alternatives(fixture.realm)) {
    const text = canonicalJSON({
      ...build,
      realm,
      environment: realm.environment,
    });
    await assert.rejects(
      fixture.database.system((client) =>
        client.query("select catalog.attach_release_context($1,$2,$3)", [
          frozen.id,
          text,
          sha256(text),
        ]),
      ),
      /realm mismatch/,
    );
  }
  assert.equal(
    Number(
      (
        await sqlOne(
          fixture.pg,
          "select count(*) as n from catalog.release_contexts where release_id=$1",
          [frozen.id],
        )
      ).n,
    ),
    0,
  );
  await assert.rejects(
    as(fixture.pg, "service_role", (client) =>
      client.query("select catalog.activate_release($1,null,'bypass')", [
        pack.id,
      ]),
    ),
    /artifact-bound publisher/,
  );
});

test("unbound projects fail closed; non-local projects must be initialized before review history exists", async () => {
  const pg = await sqlFixture();
  try {
    const revision = await approvedRevision(pg, "unbound-fixture");
    await assert.rejects(
      freeze(pg, [revision]),
      /Register an explicit release realm/,
    );
    await assert.rejects(
      init(pg, "staging", "fixture-staging", "fixture-preview"),
      /before importing review or release history/,
    );
    assert.equal(
      (await sqlOne(pg, "select catalog.current_release_realm() as realm"))
        .realm,
      null,
    );
    await init(pg);
    assert.ok((await freeze(pg, [revision])).id);
  } finally {
    await pg.close();
  }
});

test("staging and production identities remain distinct and cannot enter local claim, registration or publisher paths", async () => {
  for (const environment of ["staging", "production"]) {
    const pg = await sqlFixture();
    try {
      const realm = await init(
        pg,
        environment,
        "fixture-" + environment,
        "fixture-preview",
      );
      const revision = await approvedRevision(pg, environment + "-fixture"),
        frozen = await freeze(pg, [revision]);
      assert.deepEqual(
        (
          await sqlOne(
            pg,
            "select manifest -> 'realm' as realm from catalog.releases where id=$1",
            [frozen.id],
          )
        ).realm,
        realm,
      );
      await assert.rejects(
        as(pg, "catalog_deployer", (client) =>
          client.query("select catalog.claim_publication_target($1,$2)", [
            realm.target,
            "a".repeat(64),
          ]),
        ),
        /Local publication target/,
      );
      await assert.rejects(
        as(pg, "catalog_deployer", (client) =>
          client.query("select catalog.register_publication_artifact($1)", [
            JSON.stringify({ realm }),
          ]),
        ),
        /only its registered local realm/,
      );
      assert.throws(
        () => createLocalPublisher({ database: {}, directory, realm }),
        /cannot accept staging or production/,
      );
      assert.throws(
        () =>
          assertReleaseRealm(
            {
              ...realm,
              environment: environment === "staging" ? "production" : "staging",
            },
            realm,
          ),
        /realm mismatch/,
      );
    } finally {
      await pg.close();
    }
  }
});

test("local operator expectations and SQL receipt registration reject foreign projects, instances and targets", async () => {
  const database = publicationDatabase(fixture.pg);
  for (const realm of alternatives(fixture.realm).filter(
    (r) => r.environment === "local",
  )) {
    const publisher = createLocalPublisher({
      database,
      directory: join(directory, "foreign"),
      realm,
    });
    await assert.rejects(publisher.status(), /realm mismatch/);
  }
  for (const realm of alternatives(fixture.realm))
    await assert.rejects(
      as(fixture.pg, "catalog_deployer", (client) =>
        client.query("select catalog.register_publication_artifact($1)", [
          canonicalJSON({ realm }),
        ]),
      ),
      /realm mismatch/,
    );
  await assert.rejects(
    as(fixture.pg, "catalog_deployer", (client) =>
      client.query(
        "select catalog.claim_publication_target('wrong-target',$1)",
        ["a".repeat(64)],
      ),
    ),
    /registered release realm/,
  );
  assert.equal(
    (
      await sqlOne(
        fixture.pg,
        "select target_key from catalog.publication_state",
      )
    ).target_key,
    null,
  );
});

test("versioned artifact verification binds its realm to the public manifest and rejects relabeling", async () => {
  const path = join(directory, "bound-artifact");
  await mkdir(join(path, "site"), { recursive: true });
  const source = materializeSiteInput(fixture.context, pack).source;
  const body = JSON.stringify({ source });
  await writeFile(join(path, "site/site-manifest.json"), body);
  const files = [
    {
      path: "site-manifest.json",
      bytes: Buffer.byteLength(body),
      sha256: sha256(body),
    },
  ];
  const evidence = {
    format: "gamemap.site-artifact",
    version: 2,
    ...source,
    files,
    artifactDigest: sha256(canonicalJSON(files)),
    browserChecked: true,
  };
  const file = join(path, "evidence.json");
  await writeFile(file, JSON.stringify(evidence));
  await verifySiteArtifact(path);
  for (const patch of [
    { realm: { ...fixture.realm, project: "foreign-project" } },
    { development: false },
    { version: 1 },
    { realm: undefined },
    { version: 3 },
  ]) {
    await writeFile(file, JSON.stringify({ ...evidence, ...patch }));
    await assert.rejects(
      verifySiteArtifact(path),
      /realm|identity|environment|version/,
    );
  }
  await writeFile(file, JSON.stringify(evidence));
});

async function legacyArtifact(pg, root, label) {
  const revision = await approvedRevision(pg, "legacy-" + label),
    frozen = await freeze(pg, [revision]);
  const text = canonicalJSON({
    format: "gamemap.build-context",
    version: 1,
    environment: "local",
    git_commit: "a".repeat(40),
    selected_revisions: [
      {
        id: revision.id,
        digest: revision.content_digest,
        schema_version: revision.schema_version,
      },
    ],
  });
  await pg.query("select catalog.attach_release_context($1,$2,$3)", [
    frozen.id,
    text,
    sha256(text),
  ]);
  const release = await sqlOne(
    pg,
    "select manifest_text,digest from catalog.releases where id=$1",
    [frozen.id],
  );
  const source = {
    mode: "release",
    release: frozen.id,
    manifestDigest: release.digest,
    contextDigest: sha256(text),
    gitCommit: "a".repeat(40),
    development: true,
  };
  const contents = {
    "index.html": "Legacy original bytes " + label,
    "404.html": "Missing",
    "site-manifest.json": JSON.stringify({ base: "/", source }),
  };
  const files = Object.entries(contents).map(([path, value]) => ({
    path,
    bytes: Buffer.byteLength(value),
    sha256: sha256(value),
  }));
  const evidence = {
    format: "gamemap.site-artifact",
    version: 1,
    ...source,
    files,
    artifactDigest: sha256(canonicalJSON(files)),
    browserChecked: true,
  };
  const path = join(root, "artifacts", evidence.artifactDigest);
  await mkdir(join(path, "site"), { recursive: true });
  for (const [file, value] of Object.entries(contents))
    await writeFile(join(path, "site", file), value);
  const evidenceText = JSON.stringify(evidence);
  await writeFile(join(path, "evidence.json"), evidenceText);
  await as(pg, "catalog_deployer", (client) =>
    client.query("select catalog.register_publication_artifact($1)", [
      evidenceText,
    ]),
  );
  return {
    path,
    evidence,
    evidenceText,
    manifestText: release.manifest_text,
    contextText: text,
    contents,
  };
}

test("additive upgrade preserves exact legacy local bytes and only pre-upgrade activated history can roll back", async () => {
  const pg = await sqlFixture(12),
    root = join(directory, "legacy-publication");
  await mkdir(root);
  try {
    const state = (
      await sqlOne(pg, "select catalog.publication_status() as state")
    ).state;
    await as(pg, "catalog_deployer", async (client) =>
      client.query(
        "select catalog.claim_publication_target('local-preview',$1)",
        [sha256(await realpath(root))],
      ),
    );
    const a = await legacyArtifact(pg, root, "a"),
      b = await legacyArtifact(pg, root, "b"),
      unactivated = await legacyArtifact(pg, root, "unactivated");
    for (const [next, previous] of [
      [a, null],
      [b, a],
    ])
      await as(pg, "catalog_deployer", (client) =>
        client.query(
          "select catalog.activate_publication($1,$2,$3,'old-local-test')",
          [
            next.evidence.artifactDigest,
            previous?.evidence.artifactDigest || null,
            previous?.evidence.release || null,
          ],
        ),
      );
    await writeFile(
      join(root, "target.json"),
      JSON.stringify({
        format: "gamemap.local-publication",
        version: 1,
        instance: state.instance_id,
        rootDigest: sha256(await realpath(root)),
        target: "local-preview",
      }),
    );
    await symlink(
      `artifacts/${b.evidence.artifactDigest}/site`,
      join(root, "current"),
    );
    await writeFile(
      join(root, "published.json"),
      JSON.stringify({
        format: "gamemap.published-pointer",
        version: 1,
        instance: state.instance_id,
        artifact: b.evidence.artifactDigest,
      }),
    );
    await pg.exec(
      (await loadMigrations()).find((m) =>
        m.path.endsWith("0013_catalog_release_realm.sql"),
      ).sql,
    );
    await assert.rejects(init(pg, "production"), /history|relabeled/);
    const realm = await init(pg),
      publisher = createLocalPublisher({
        database: publicationDatabase(pg),
        directory: root,
        realm,
      });
    assert.equal(
      (await publisher.recover()).artifact_digest,
      b.evidence.artifactDigest,
    );
    const result = await publisher.rollback({
      artifact: a.evidence.artifactDigest,
      expectedArtifact: b.evidence.artifactDigest,
      expectedRelease: b.evidence.release,
      run: "legacy-exact-rollback",
    });
    assert.equal(result.artifact_digest, a.evidence.artifactDigest);
    assert.equal(
      await readFile(join(a.path, "site/index.html"), "utf8"),
      a.contents["index.html"],
    );
    for (const old of [a, b, unactivated]) {
      assert.equal(
        await readFile(join(old.path, "evidence.json"), "utf8"),
        old.evidenceText,
      );
      const row = await sqlOne(
        pg,
        "select r.manifest_text,c.context_text from catalog.releases r join catalog.release_contexts c on c.release_id=r.id where r.id=$1",
        [old.evidence.release],
      );
      assert.equal(row.manifest_text, old.manifestText);
      assert.equal(row.context_text, old.contextText);
      await verifySiteArtifact(old.path);
    }
    const expected = {
      expectedArtifact: a.evidence.artifactDigest,
      expectedRelease: a.evidence.release,
      run: "not-eligible",
    };
    await assert.rejects(
      publisher.publish({ ...expected, input: b.path }),
      /legacy artifacts cannot be newly published/,
    );
    await assert.rejects(
      publisher.rollback({
        ...expected,
        artifact: unactivated.evidence.artifactDigest,
      }),
      /pre-migration local activation history/,
    );
    await assert.rejects(
      as(pg, "catalog_deployer", (client) =>
        client.query(
          "select catalog.activate_publication($1,$2,$3,'bypass-legacy')",
          [
            unactivated.evidence.artifactDigest,
            a.evidence.artifactDigest,
            a.evidence.release,
          ],
        ),
      ),
      /not eligible/,
    );
    await assert.rejects(
      as(pg, "catalog_deployer", (client) =>
        client.query("select catalog.register_publication_artifact($1)", [
          b.evidenceText,
        ]),
      ),
      /realm mismatch/,
    );
    await assert.rejects(
      as(pg, "catalog_deployer", (client) =>
        client.query(
          "insert into catalog.legacy_local_publications select $1,instance_id,target_key,root_digest from catalog.publication_state",
          [unactivated.evidence.artifactDigest],
        ),
      ),
      /permission denied/,
    );
    assert.equal(
      (await publisher.status()).artifact_digest,
      a.evidence.artifactDigest,
    );
  } finally {
    await pg.close();
  }
});
