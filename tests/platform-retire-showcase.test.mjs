import { test } from "node:test";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { randomUUID } from "node:crypto";
import { loadMigrations } from "../scripts/lib/migrations.mjs";
import { collectionAddress } from "../scripts/lib/catalog/adapters.mjs";

const migrations = await loadMigrations();
const retirement = migrations.find((row) =>
  row.path.endsWith("0019_catalog_retire_showcase.sql"),
);
assert.ok(retirement);
const actor = "00000000-0000-4000-8000-000000000001";
async function fixture() {
  const pg = new PGlite();
  await pg.exec(`create role anon; create role authenticated; create role service_role;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;`);
  for (const migration of migrations) {
    if (migration === retirement) break;
    await pg.exec(migration.sql);
  }
  await pg.query("insert into auth.users values($1)", [actor]);
  await pg.query(
    "select catalog.initialize_release_realm('local','local:retirement-fixture','local-preview')",
  );
  for (const id of ["first", "second"])
    await pg.query(
      "insert into catalog.entries(key,kind,identifier,canonical_path,collection_path,owner) values($1,'resource',$2,$3,'/resources/','database')",
      [`resource:${id}`, id, `/resources/${id}/`],
    );
  const add = async (id, resourceId = "first", collection = "/showcase/") => {
    const key = `demo:${id}`,
      revision = randomUUID();
    await pg.query(
      "insert into catalog.entries(key,kind,identifier,canonical_path,collection_path,owner) values($1,'demo',$2,$3,$4,'database')",
      [key, id, `/showcase/${id}/`, collection],
    );
    await pg.query(
      "insert into catalog.revisions(id,entry_key,kind,schema_version,body_text,created_by) values($1,$2,'demo',1,$3,$4)",
      [
        revision,
        key,
        JSON.stringify({
          title: id,
          summary: "Retirement fixture",
          payload: { id, resourceId },
          attachments: {},
        }),
        actor,
      ],
    );
    await pg.query(
      "update catalog.entries set head_revision_id=$2 where key=$1",
      [key, revision],
    );
    return { key, revision };
  };
  const snapshot = async () => {
    const entries = (
      await pg.query(
        "select key,kind,identifier,canonical_path,collection_path,owner,head_revision_id from catalog.entries order by key",
      )
    ).rows;
    const revisions = (
      await pg.query(
        "select id,entry_key,state,body_text,content_digest,created_by,reviewed_by,reviewed_at from catalog.revisions order by id",
      )
    ).rows;
    const releases = (
      await pg.query(
        "select id,manifest_text,digest from catalog.releases order by id",
      )
    ).rows;
    return { entries, revisions, releases };
  };
  const enabled = async () =>
    (
      await pg.query(
        "select tgenabled from pg_trigger where tgrelid='catalog.entries'::regclass and tgname='stable_entry'",
      )
    ).rows[0].tgenabled;
  return { pg, add, snapshot, enabled };
}

test("draft and import ownership uses the same resource-scoped recording adapter", () => {
  const context = {
    contentKinds: {
      demo: { page: "resources" },
      resource: { page: "resources" },
    },
    url: {
      resource: (id) => `/resources/${encodeURIComponent(id)}/`,
      page: (page) => `/${page}/`,
    },
  };
  assert.equal(
    collectionAddress(context, "demo", { resourceId: "first" }),
    "/resources/first/",
  );
  assert.equal(collectionAddress(context, "resource", {}), "/resources/");
  for (const payload of [{}, { resourceId: "" }, { resourceId: null }])
    assert.throws(
      () => collectionAddress(context, "demo", payload),
      /recording needs a resourceId/,
    );
  assert.throws(
    () => collectionAddress(context, "unknown", {}),
    /Unregistered content collection/,
  );
});

test("retirement changes only demo collection ownership, preserving immutable content and old releases", async () => {
  const f = await fixture();
  try {
    await f.add("first-clip");
    await f.add("second-clip", "second");
    const realm = (
      await f.pg.query("select catalog.current_release_realm() as realm")
    ).rows[0].realm;
    const text = JSON.stringify({
      format: "gamemap.content-release",
      format_version: 2,
      realm,
      entries: [{ key: "demo:first-clip", collection_path: "/showcase/" }],
    });
    await f.pg.query(
      "insert into catalog.releases(manifest_text,created_by) values($1,$2)",
      [text, actor],
    );
    const before = await f.snapshot();
    await f.pg.exec(retirement.sql);
    const after = await f.snapshot();
    assert.deepEqual(after.revisions, before.revisions);
    assert.deepEqual(after.releases, before.releases);
    assert.deepEqual(
      after.entries.map((entry) => ({
        ...entry,
        collection_path: before.entries.find((old) => old.key === entry.key)
          .collection_path,
      })),
      before.entries,
    );
    assert.equal(
      after.entries.find((entry) => entry.key === "demo:first-clip")
        .collection_path,
      "/resources/first/",
    );
    assert.equal(
      after.entries.find((entry) => entry.key === "demo:second-clip")
        .collection_path,
      "/resources/second/",
    );
    assert.equal(await f.enabled(), "O");
    const events = (
      await f.pg.query(
        "select action,entity,detail from catalog.audit_events where action='retire-showcase-listing'",
      )
    ).rows;
    assert.equal(events.length, 1);
    assert.equal(events[0].detail.changes.length, 2);
    assert.deepEqual(events[0].detail.retired_routes, [
      "/showcase/",
      "/zh/showcase/",
    ]);
    await assert.rejects(
      f.pg.query(
        "update catalog.entries set collection_path='/showcase/' where key='demo:first-clip'",
      ),
      /Stable identity cannot be changed/,
    );
    await assert.rejects(
      f.pg.query(
        "update catalog.entries set canonical_path='/other/' where key='demo:first-clip'",
      ),
      /Stable identity cannot be changed/,
    );
    await f.pg.exec(retirement.sql);
    assert.deepEqual(await f.snapshot(), after);
    assert.equal(
      (
        await f.pg.query(
          "select count(*)::integer as n from catalog.audit_events where action='retire-showcase-listing'",
        )
      ).rows[0].n,
      1,
    );
  } finally {
    await f.pg.close();
  }
});

test("a fresh database needs no data rewrite or persistent permission bypass", async () => {
  const f = await fixture();
  try {
    const before = await f.snapshot();
    await f.pg.exec(retirement.sql);
    assert.deepEqual(await f.snapshot(), before);
    assert.equal(await f.enabled(), "O");
    assert.equal(
      (
        await f.pg.query(
          "select count(*)::integer as n from catalog.audit_events where action='retire-showcase-listing'",
        )
      ).rows[0].n,
      0,
    );
  } finally {
    await f.pg.close();
  }
});

test("ambiguous historical resource ownership rejects the entire migration without weakening stable identities", async () => {
  const f = await fixture();
  try {
    const clip = await f.add("ambiguous");
    await f.pg.query(
      "insert into catalog.revisions(entry_key,kind,schema_version,body_text,created_by) values($1,'demo',1,$2,$3)",
      [
        clip.key,
        JSON.stringify({
          title: "Different owner",
          summary: "Fixture",
          payload: { id: "ambiguous", resourceId: "second" },
          attachments: {},
        }),
        actor,
      ],
    );
    const before = await f.snapshot();
    await assert.rejects(
      f.pg.exec(retirement.sql),
      /Resolve missing resources, conflicting recording ownership or unexpected addresses/,
    );
    await f.pg.exec("rollback");
    assert.deepEqual(await f.snapshot(), before);
    assert.equal(await f.enabled(), "O");
  } finally {
    await f.pg.close();
  }
});

test("missing resources and unexpected collections fail closed without partially moving valid recordings", async () => {
  for (const invalid of ["missing-resource", "unexpected-collection"]) {
    const f = await fixture();
    try {
      await f.add("valid");
      await f.add(
        "invalid",
        invalid === "missing-resource" ? "unknown" : "first",
        invalid === "unexpected-collection" ? "/custom/" : "/showcase/",
      );
      const before = await f.snapshot();
      await assert.rejects(
        f.pg.exec(retirement.sql),
        /Resolve missing resources, conflicting recording ownership or unexpected addresses/,
      );
      await f.pg.exec("rollback");
      assert.deepEqual(await f.snapshot(), before);
      assert.equal(await f.enabled(), "O");
    } finally {
      await f.pg.close();
    }
  }
});

test("browser, backend, service and publisher roles cannot run the owner-only retirement", async () => {
  const f = await fixture();
  try {
    await f.add("protected");
    const before = await f.snapshot();
    for (const role of [
      "anon",
      "authenticated",
      "service_role",
      "catalog_backend",
      "catalog_deployer",
    ]) {
      await f.pg.exec(`set role ${role}`);
      await assert.rejects(
        f.pg.exec(retirement.sql),
        /permission denied|catalog owner/i,
      );
      await f.pg.exec("rollback; reset role");
      assert.deepEqual(await f.snapshot(), before);
      assert.equal(await f.enabled(), "O");
    }
  } finally {
    await f.pg.close();
  }
});
