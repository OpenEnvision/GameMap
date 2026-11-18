import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { createImportBundle, importSQL } from "../scripts/lib/platform.mjs";
import { canonicalJSON, sha256 } from "../scripts/lib/catalog/codec.mjs";
import { loadContent } from "../scripts/lib/content.mjs";
import { loadMigrations } from "../scripts/lib/migrations.mjs";

const users = {
  editor: "00000000-0000-4000-8000-000000000001",
  reviewer: "00000000-0000-4000-8000-000000000002",
  admin: "00000000-0000-4000-8000-000000000003",
  outsider: "00000000-0000-4000-8000-000000000004",
};
let db, bundle, context, realm;
const one = async (sql, args = []) => (await db.query(sql, args)).rows[0];
async function as(role, user, run) {
  assert.ok(
    ["anon", "authenticated", "service_role", "catalog_deployer"].includes(
      role,
    ),
  );
  await db.exec("begin");
  try {
    await db.exec(`set local role ${role}`);
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [
      user || "",
    ]);
    const result = await run();
    await db.exec("commit");
    return result;
  } catch (error) {
    await db.exec("rollback");
    throw error;
  }
}
function body(id, payload) {
  const original = bundle.snapshot.entries.find(
    (entry) => entry.kind === "resource",
  );
  return canonicalJSON({
    title: `Fixture ${id}: quote ' and \\`,
    summary: "SQL workflow fixture, not a reviewed external project.",
    payload: payload ?? { ...original.body.payload, id, name: `Fixture ${id}` },
    attachments: {},
  });
}
async function save(id, options = {}) {
  const {
    actor = users.editor,
    expected = null,
    text = body(id),
    kind = "resource",
    version = 1,
    path = `/resources/${id}/`,
    collection = "/resources/",
  } = options;
  return as(
    "authenticated",
    actor,
    async () =>
      (
        await one(
          "select public.catalog_save_draft($1, $2, $3, $4, $5, $6, $7) as id",
          [kind, id, version, path, collection, text, expected],
        )
      ).id,
  );
}
async function attest(id) {
  const revision = await one(
    "select r.content_digest, s.validator_key from catalog.revisions r join catalog.content_schemas s on s.kind = r.kind and s.version = r.schema_version where r.id = $1",
    [id],
  );
  return as("service_role", null, () =>
    db.query(
      "select catalog.record_validation($1, $2, $3, 'test-validator/v1', 'test://pipeline')",
      [id, revision.content_digest, revision.validator_key],
    ),
  );
}
async function approve(id) {
  await as("authenticated", users.editor, () =>
    db.query("select public.catalog_submit_revision($1)", [id]),
  );
  await attest(id);
  await as("authenticated", users.reviewer, () =>
    db.query(
      "select public.catalog_review_revision($1, true, 'Evidence and contract reviewed')",
      [id],
    ),
  );
}
async function freeze(ids) {
  return as(
    "authenticated",
    users.reviewer,
    async () =>
      (
        await one(
          "select public.catalog_freeze_release($1::uuid[], $2) as id",
          [ids, bundle.snapshot.git_commit],
        )
      ).id,
  );
}
const published = () =>
  as(
    "anon",
    null,
    async () =>
      (await one("select public.catalog_published_release() as value")).value,
  );
const activate = async (id, previous) => {
  // SQL-only context fixture. The actual content compiler/context is exercised in Studio tests.
  const exists = await one(
    "select count(*) as n from catalog.release_contexts where release_id = $1",
    [id],
  );
  if (!Number(exists.n)) {
    const rows = (
      await db.query(
        "select r.id, r.content_digest as digest, r.schema_version from catalog.release_items i join catalog.revisions r on r.id = i.revision_id where i.release_id = $1",
        [id],
      )
    ).rows;
    const text = canonicalJSON({
      format: "gamemap.build-context",
      version: 2,
      environment: realm.environment,
      realm,
      git_commit: bundle.snapshot.git_commit,
      selected_revisions: rows,
    });
    await as("service_role", null, () =>
      db.query("select catalog.attach_release_context($1, $2, $3)", [
        id,
        text,
        sha256(text),
      ]),
    );
  }
  const release = await one(
    "select r.digest as manifest_digest,c.digest as context_digest from catalog.releases r join catalog.release_contexts c on c.release_id=r.id where r.id=$1",
    [id],
  );
  const evidence = {
    format: "gamemap.site-artifact",
    version: 2,
    mode: "release",
    release: id,
    realm,
    development: true,
    browserChecked: true,
    artifactDigest: sha256(id),
    files: [],
    manifestDigest: release.manifest_digest,
    contextDigest: release.context_digest,
    gitCommit: bundle.snapshot.git_commit,
  };
  return as("catalog_deployer", null, async () => {
    await db.query("select catalog.claim_publication_target($1,$2)", [
      realm.target,
      "f".repeat(64),
    ]);
    await db.query("select catalog.register_publication_artifact($1)", [
      canonicalJSON(evidence),
    ]);
    return db.query(
      "select catalog.activate_publication($1,$2,$3,'test://successful-deployment')",
      [sha256(id), previous ? sha256(previous) : null, previous],
    );
  });
};

before(async () => {
  context = await loadContent();
  bundle = await createImportBundle(context);
  db = new PGlite();
  // Supabase supplies these roles and auth objects. This isolated shim exercises actual SQL/RLS,
  // not the GoTrue or PostgREST HTTP services. Trusted-worker attestations are fixtures too.
  await db.exec(`
    create role anon; create role authenticated; create role service_role;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  `);
  for (const migration of await loadMigrations()) await db.exec(migration.sql);
  realm = (
    await one(
      "select catalog.initialize_release_realm('local','local:sql-fixture','local-preview') as realm",
    )
  ).realm;
  for (const [role, user] of Object.entries(users)) {
    await db.query("insert into auth.users values($1)", [user]);
    if (role !== "outsider")
      await db.query(
        "insert into catalog.memberships(user_id, role) values($1, $2)",
        [user, role],
      );
  }
  await db.exec(importSQL(bundle));
});
after(async () => {
  await db?.close();
});

test("database registries agree with the typed declarations and every private table has RLS", async () => {
  assert.deepEqual(
    (await db.query("select * from catalog.content_kinds order by kind")).rows,
    bundle.snapshot.content_kinds,
  );
  assert.deepEqual(
    (
      await db.query(
        "select kind, version, validator_key from catalog.content_schemas order by kind, version",
      )
    ).rows,
    Object.entries(context.versionedContracts)
      .flatMap(([kind, versions]) =>
        Object.entries(versions).map(([version, contract]) => ({
          kind,
          version: Number(version),
          validator_key: contract.validatorKey,
        })),
      )
      .sort((a, b) => a.kind.localeCompare(b.kind) || a.version - b.version),
  );
  for (const table of ["locales", "link_roles", "relation_types"])
    assert.deepEqual(
      (await db.query(`select * from catalog.${table} order by 1`)).rows,
      bundle.snapshot[table],
    );
  const tables = (
    await db.query(
      "select relname, relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'catalog' and c.relkind = 'r'",
    )
  ).rows;
  assert.ok(tables.length >= 20);
  assert.ok(tables.every((table) => table.relrowsecurity));
  assert.deepEqual(
    (
      await db.query(
        "select column_name from information_schema.columns where table_schema = 'catalog' and column_name like 'legacy_%'",
      )
    ).rows,
    [],
  );
});

test("complete import preserves every typed revision and projection but publishes nothing", async () => {
  for (const [table, rows] of [
    ["entries", bundle.snapshot.entries],
    ["revisions", bundle.snapshot.entries],
    ["terms", bundle.snapshot.terms],
    ["revision_terms", bundle.snapshot.entry_terms],
    ["revision_links", bundle.snapshot.links],
    ["revision_relations", bundle.snapshot.relations],
    ["assets", bundle.snapshot.assets],
    ["revision_assets", bundle.snapshot.asset_usages],
    ["translations", bundle.snapshot.translations],
    ["validation_receipts", bundle.snapshot.entries],
  ])
    assert.equal(
      Number((await one(`select count(*) as n from catalog.${table}`)).n),
      rows.length,
      table,
    );
  assert.deepEqual(
    (await db.query("select distinct state from catalog.revisions")).rows,
    [{ state: "draft" }],
  );
  assert.equal(
    Number((await one("select count(*) as n from catalog.project_entries")).n),
    0,
  );
  for (const row of bundle.snapshot.entries) {
    const revision = await one(
      "select body, content_digest, source_review, schema_version, kind from catalog.revisions where id = $1",
      [row.revision_id],
    );
    assert.deepEqual(revision.body, row.body);
    assert.equal(revision.content_digest, row.fingerprint);
    assert.deepEqual(revision.source_review, row.source_review);
    assert.equal(revision.schema_version, row.schema_version);
    assert.equal(revision.kind, row.kind);
  }
  assert.equal(await published(), null);
});

test("identical imports are idempotent; corrupt, old-format, or overlapping imports are refused", async () => {
  const result = await as("service_role", null, () =>
    one("select catalog.import_snapshot($1, $2) as imported", [
      canonicalJSON(bundle.snapshot),
      bundle.digest,
    ]),
  );
  assert.equal(result.imported, false);
  await assert.rejects(
    as("service_role", null, () =>
      db.query("select catalog.import_snapshot($1, $2)", [
        canonicalJSON(bundle.snapshot),
        "0".repeat(64),
      ]),
    ),
    /digest mismatch/,
  );
  const old = canonicalJSON({ ...bundle.snapshot, format_version: 1 });
  await assert.rejects(
    as("service_role", null, () =>
      db.query("select catalog.import_snapshot($1, $2)", [old, sha256(old)]),
    ),
    /Unsupported migration format/,
  );
  const changed = canonicalJSON({
    ...bundle.snapshot,
    git_commit: "a".repeat(40),
  });
  await assert.rejects(
    as("service_role", null, () =>
      db.query("select catalog.import_snapshot($1, $2)", [
        changed,
        sha256(changed),
      ]),
    ),
    /overwrite existing identities/,
  );
});

test("anonymous and unprovisioned accounts cannot list drafts or provision their own roles", async () => {
  await assert.rejects(
    as("anon", null, () => db.query("select public.catalog_editor_entries()")),
    /permission denied/i,
  );
  await assert.rejects(
    as("authenticated", users.outsider, () =>
      db.query("select public.catalog_editor_entries()"),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    as("authenticated", users.editor, () =>
      db.query("select * from catalog.memberships"),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    as("authenticated", users.editor, () =>
      db.query("select catalog.import_snapshot('{}', 'bad')"),
    ),
    /permission denied/i,
  );
  assert.equal(
    (
      await as("authenticated", users.editor, () =>
        one("select public.catalog_role() as role"),
      )
    ).role,
    "editor",
  );
  assert.equal(
    (
      await as("authenticated", users.outsider, () =>
        one("select public.catalog_role() as role"),
      )
    ).role,
    null,
  );
  assert.equal(
    Number(
      (
        await one(
          "select count(*) as n from catalog.audit_events where action = 'membership-insert'",
        )
      ).n,
    ),
    3,
  );
});

test("RLS denies direct draft reads even after accidental schema/table grants", async () => {
  await db.exec(
    "begin; grant usage on schema catalog to authenticated; grant select on catalog.entries, catalog.revisions to authenticated; set local role authenticated",
  );
  try {
    assert.equal(
      Number((await one("select count(*) as n from catalog.entries")).n),
      0,
    );
    assert.equal(
      Number((await one("select count(*) as n from catalog.revisions")).n),
      0,
    );
  } finally {
    await db.exec("rollback");
  }
});

test("saving appends immutable revisions and stale editors receive an explicit conflict", async () => {
  const id = await save("platform-concurrent");
  await assert.rejects(save("platform-concurrent"), /Revision conflict/);
  const successor = await save("platform-concurrent", {
    expected: id,
    actor: users.reviewer,
  });
  assert.notEqual(successor, id);
  assert.equal(
    (
      await one("select parent_id from catalog.revisions where id = $1", [
        successor,
      ])
    ).parent_id,
    id,
  );
  await assert.rejects(
    save("platform-concurrent", {
      expected: successor,
      path: "/resources/renamed/",
    }),
    /Stable identity/,
  );
  await assert.rejects(
    db.query("update catalog.revisions set body_text = $2 where id = $1", [
      id,
      body("changed"),
    ]),
    /Immutable revision content/,
  );
  await assert.rejects(
    db.query("delete from catalog.revisions where id = $1", [id]),
    /Immutable revision/,
  );
  assert.equal(await published(), null);
});

test("invalid drafts, unregistered schemas, and Git-owned edits fail atomically", async () => {
  await assert.rejects(
    save("platform-invalid", { text: "{}" }),
    /check constraint/,
  );
  assert.equal(
    Number(
      (
        await one(
          "select count(*) as n from catalog.entries where key = 'resource:platform-invalid'",
        )
      ).n,
    ),
    0,
  );
  await assert.rejects(
    save("platform-no-schema", { version: 99 }),
    /Unregistered or retired schema/,
  );
  await assert.rejects(save("platform-doc", { kind: "document" }), /Git-owned/);
});

test("review requires a trusted exact-content/schema receipt and prevents self-approval", async () => {
  const id = await save("platform-review");
  await as("authenticated", users.editor, () =>
    db.query("select public.catalog_submit_revision($1)", [id]),
  );
  await assert.rejects(
    as("authenticated", users.editor, () =>
      db.query("select public.catalog_review_revision($1, true, 'Self')", [id]),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    as("authenticated", users.reviewer, () =>
      db.query(
        "select public.catalog_review_revision($1, true, 'No receipt')",
        [id],
      ),
    ),
    /trusted validation receipt/,
  );
  await assert.rejects(
    as("authenticated", users.editor, () =>
      db.query(
        "select catalog.record_validation($1, $2, 'gamemap.resource', 'forged', 'browser')",
        [id, "0".repeat(64)],
      ),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    as("service_role", null, () =>
      db.query(
        "select catalog.record_validation($1, $2, 'gamemap.resource', 'wrong-content', 'worker')",
        [id, "0".repeat(64)],
      ),
    ),
    /foreign key/,
  );
  const { content_digest } = await one(
    "select content_digest from catalog.revisions where id = $1",
    [id],
  );
  await assert.rejects(
    as("service_role", null, () =>
      db.query(
        "select catalog.record_validation($1, $2, 'gamemap.testing', 'wrong-kind', 'worker')",
        [id, content_digest],
      ),
    ),
    /Validator does not match/,
  );
  await attest(id);
  await as("authenticated", users.reviewer, () =>
    db.query(
      "select public.catalog_review_revision($1, true, 'Validated contract and sources')",
      [id],
    ),
  );
  assert.equal(
    (await one("select state from catalog.revisions where id = $1", [id]))
      .state,
    "approved",
  );
  await assert.rejects(
    db.query(
      "insert into catalog.revision_terms values($1, 'dimensions:2d', 0)",
      [id],
    ),
    /projections are immutable/,
  );
  const self = await save("platform-self-review", { actor: users.reviewer });
  await as("authenticated", users.reviewer, () =>
    db.query("select public.catalog_submit_revision($1)", [self]),
  );
  await attest(self);
  await assert.rejects(
    as("authenticated", users.reviewer, () =>
      db.query("select public.catalog_review_revision($1, true, 'Self')", [
        self,
      ]),
    ),
    /own revision/,
  );
});

test("releases require approved revisions and cannot omit related targets", async () => {
  const target = await save("platform-target");
  const referring = await save("platform-referring");
  await db.query(
    "insert into catalog.revision_relations values($1, 'resource:platform-target', 'related', 'payload.links[0]')",
    [referring],
  );
  await assert.rejects(freeze([target]), /approved and validated/);
  await approve(target);
  await approve(referring);
  await assert.rejects(freeze([referring]), /dangling content relations/);
  await assert.rejects(freeze([target, target]), /duplicate/);
  const release = await freeze([target, referring]);
  const record = await one(
    "select digest, manifest_text, manifest from catalog.releases where id = $1",
    [release],
  );
  assert.equal(record.digest, sha256(record.manifest_text));
  assert.deepEqual(JSON.parse(record.manifest_text), record.manifest);
  assert.equal(record.manifest.entries.length, 2);
  assert.equal(record.manifest.entries[0].schema_version, 1);
  await assert.rejects(
    db.query("update catalog.releases set manifest_text = '{}' where id = $1", [
      release,
    ]),
    /Immutable catalog history/,
  );
  assert.equal(await published(), null, "freezing must not publish");
});

test("activation is deployer-only, isolates later drafts, and supports conflict-safe rollback", async () => {
  const firstRevision = await save("platform-release-first");
  await approve(firstRevision);
  const first = await freeze([firstRevision]);
  await assert.rejects(
    as("authenticated", users.admin, () =>
      db.query("select catalog.activate_release($1, null, 'browser')", [first]),
    ),
    /permission denied/i,
  );
  await activate(first, null);
  const initial = await published();
  assert.equal(initial.id, first);
  assert.equal(sha256(initial.manifest_text), initial.digest);
  await save("platform-release-first", { expected: firstRevision });
  assert.deepEqual(
    await published(),
    initial,
    "a later draft cannot change an immutable public release",
  );
  const secondRevision = await save("platform-release-second");
  await approve(secondRevision);
  const second = await freeze([secondRevision]);
  await assert.rejects(activate(second, null), /[Dd]eployment conflict/);
  await activate(second, first);
  await assert.rejects(activate(first, first), /[Dd]eployment conflict/);
  await activate(first, second);
  assert.deepEqual(await published(), initial);
  assert.equal(
    Number(
      (
        await one(
          "select count(*) as n from catalog.audit_events where action = 'activate-release'",
        )
      ).n,
    ),
    3,
  );
});

test("a new kind and two schema versions use the same editor/review/release functions without table changes", async () => {
  const tablesBefore = (
    await db.query(
      "select tablename from pg_tables where schemaname = 'catalog' order by tablename",
    )
  ).rows;
  await db.exec(
    "insert into catalog.content_kinds values('dataset', 'Dataset', 'database'); insert into catalog.content_schemas(kind, version, validator_key) values('dataset', 1, 'gamemap.dataset'), ('dataset', 2, 'gamemap.dataset');",
  );
  const options = {
    kind: "dataset",
    path: "/datasets/fixture/",
    collection: "/datasets/",
  };
  const first = await save("fixture", {
    ...options,
    text: body("fixture", { title: "Dataset fixture", files: [] }),
  });
  const second = await save("fixture", {
    ...options,
    version: 2,
    expected: first,
    text: body("fixture", {
      title: "Dataset fixture",
      files: [],
      format: "jsonl",
    }),
  });
  assert.equal(
    (
      await one("select parent_id from catalog.revisions where id = $1", [
        second,
      ])
    ).parent_id,
    first,
  );
  await db.query(
    "update catalog.content_schemas set enabled_for_writes = false where kind = 'dataset' and version = 1",
  );
  await assert.rejects(
    save("retired", { ...options, path: "/datasets/retired/" }),
    /retired schema version/,
  );
  await assert.rejects(
    db.query(
      "update catalog.content_schemas set validator_key = 'changed' where kind = 'dataset' and version = 2",
    ),
    /Immutable schema contract/,
  );
  const firstDigest = (
    await one("select content_digest from catalog.revisions where id = $1", [
      first,
    ])
  ).content_digest;
  await assert.rejects(
    db.query(
      "insert into catalog.validation_receipts(revision_id, content_digest, kind, schema_version, validator_key, validator_version, pipeline_run) values($1, $2, 'dataset', 2, 'gamemap.dataset', 'invalid', 'fixture')",
      [first, firstDigest],
    ),
    /foreign key/,
  );
  await approve(first);
  await approve(second);
  const oldRelease = await freeze([first]);
  const newRelease = await freeze([second]);
  assert.equal(
    (
      await one("select manifest from catalog.releases where id = $1", [
        oldRelease,
      ])
    ).manifest.schemas[0].version,
    1,
  );
  const next = (
    await one("select manifest from catalog.releases where id = $1", [
      newRelease,
    ])
  ).manifest;
  assert.deepEqual(next.schemas, [
    { kind: "dataset", version: 2, validator_key: "gamemap.dataset" },
  ]);
  assert.equal(next.entries[0].body.payload.format, "jsonl");
  assert.equal(
    (await one("select body from catalog.revisions where id = $1", [first]))
      .body.payload.format,
    undefined,
  );
  assert.deepEqual(
    (
      await db.query(
        "select tablename from pg_tables where schemaname = 'catalog' order by tablename",
      )
    ).rows,
    tablesBefore,
  );
});

test("authoring ownership follows registration, not a special-case document name", async () => {
  await db.exec(
    "insert into catalog.content_kinds values('policy', 'Policy', 'git'); insert into catalog.content_schemas(kind, version, validator_key) values('policy', 1, 'gamemap.policy');",
  );
  await assert.rejects(save("policy-fixture", { kind: "policy" }), /Git-owned/);
});

test("new languages, relationship types, and link roles need registry rows, not new tables or CHECK rewrites", async () => {
  const publicBefore = await published();
  await db.exec(
    "insert into catalog.locales values('ja'); insert into catalog.relation_types values('documents', 'Documents'); insert into catalog.link_roles values('dataset', 'Dataset download');",
  );
  const target = await save("platform-locale-target");
  const id = await save("platform-locale");
  const sourceHash = sha256(
    JSON.stringify(JSON.parse(body("platform-locale")).payload.name),
  );
  await assert.rejects(
    db.query(
      "insert into catalog.translations values($1, 'xx', 'name', '\"Unregistered\"', $2)",
      [id, sourceHash],
    ),
    /foreign key/,
  );
  await db.query(
    "insert into catalog.translations values($1, 'ja', 'name', '\"日本語の名前\"', $2)",
    [id, sourceHash],
  );
  await db.query(
    "insert into catalog.revision_relations values($1, 'resource:platform-locale-target', 'documents', 'payload.links[0]')",
    [id],
  );
  await db.query(
    "insert into catalog.revision_links values($1, 'payload.links[0].url', 'https://example.com/dataset', 'dataset')",
    [id],
  );
  await approve(target);
  await approve(id);
  const release = await freeze([target, id]);
  const manifest = (
    await one("select manifest from catalog.releases where id = $1", [release])
  ).manifest;
  assert.equal(manifest.translations[0].locale, "ja");
  assert.equal(manifest.relations[0].relation, "documents");
  assert.equal(manifest.links[0].role, "dataset");
  assert.deepEqual(
    await published(),
    publicBefore,
    "new registry declarations do not mutate historical public snapshots",
  );
});

test("a relational error midway through an import rolls the complete package back", async () => {
  const template = bundle.snapshot.entries.find(
    (row) => row.kind === "resource",
  );
  const entries = ["atomic-one", "atomic-two"].map((id, index) => ({
    ...template,
    key: `resource:${id}`,
    identifier: id,
    canonical_path: "/resources/atomic-collision/",
    revision_id: `10000000-0000-4000-8000-00000000000${index + 1}`,
  }));
  const snapshot = {
    format_version: 2,
    archive: {},
    content_kinds: bundle.snapshot.content_kinds,
    schemas: bundle.snapshot.schemas,
    locales: bundle.snapshot.locales,
    link_roles: bundle.snapshot.link_roles,
    relation_types: bundle.snapshot.relation_types,
    entries,
    terms: [],
    entry_terms: [],
    links: [],
    relations: [],
    assets: [],
    asset_usages: [],
    translations: [],
  };
  const text = canonicalJSON(snapshot);
  await assert.rejects(
    as("service_role", null, () =>
      db.query("select catalog.import_snapshot($1, $2)", [text, sha256(text)]),
    ),
    /unique constraint/,
  );
  assert.equal(
    Number(
      (
        await one(
          "select count(*) as n from catalog.entries where identifier like 'atomic-%'",
        )
      ).n,
    ),
    0,
  );
  assert.equal(
    Number(
      (
        await one(
          "select count(*) as n from catalog.import_batches where digest = $1",
          [sha256(text)],
        )
      ).n,
    ),
    0,
  );
});
