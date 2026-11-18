import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { studioFixture, accounts } from "../helpers/studio-fixture.mjs";
let fixture, document;
before(async () => {
  fixture = await studioFixture();
  document = fixture.bundle.snapshot.entries.find(
    (row) => row.kind === "document",
  );
});
after(async () => {
  await fixture?.close();
});
const asUser = (actor, text, values = []) =>
  fixture.database.user(actor, (client) => client.query(text, values));
async function historicalRevision(approved = false) {
  // Owner-only fixture of the pre-fix immutable record shape, never a production authoring path.
  const row = (
    await fixture.pg.query(
      `insert into catalog.revisions(entry_key,kind,schema_version,parent_id,body_text,state,reviewed_by,reviewed_at)
    values($1,'document',$2,$3,$4,$5,$6,case when $5='approved' then now() else null end) returning *`,
      [
        document.key,
        document.schema_version,
        document.revision_id,
        document.canonical_body,
        approved ? "approved" : "draft",
        approved ? accounts.admin.id : null,
      ],
    )
  ).rows[0];
  await fixture.pg.query(
    "insert into catalog.audit_events(actor_id,action,entity) values($1,'sync-git-document',$2)",
    [accounts.admin.id, row.id],
  );
  const validator = (
    await fixture.pg.query(
      "select validator_key from catalog.content_schemas where kind='document' and version=$1",
      [row.schema_version],
    )
  ).rows[0].validator_key;
  await fixture.pg.query(
    "select catalog.record_validation($1,$2,$3,'sql-authorship-fixture','test://authorship')",
    [row.id, row.content_digest, validator],
  );
  return row;
}
test("restricted Git revision insertion requires a current administrator actor and attributes that actor", async () => {
  const text =
    "insert into catalog.revisions(entry_key,kind,schema_version,parent_id,body_text) values($1,'document',$2,$3,$4) returning created_by";
  const values = [
    document.key,
    document.schema_version,
    document.revision_id,
    document.canonical_body,
  ];
  await assert.rejects(
    fixture.database.system((client) => client.query(text, values)),
    /permission denied/i,
  );
  await assert.rejects(
    fixture.database.system(async (client) => {
      await client.query("select set_config('request.jwt.claim.sub',$1,true)", [
        accounts.editor.id,
      ]);
      return client.query(text, values);
    }),
    /permission denied/i,
  );
  const result = await fixture.database.system(async (client) => {
    await client.query("select set_config('request.jwt.claim.sub',$1,true)", [
      accounts.admin.id,
    ]);
    return client.query(text, values);
  });
  assert.equal(result.rows[0].created_by, accounts.admin.id);
});
test("historical NULL-author sync revisions cannot be self-reviewed, but another reviewer can approve", async () => {
  const row = await historicalRevision();
  assert.equal(row.created_by, null);
  await asUser(accounts.admin.id, "select public.catalog_submit_revision($1)", [
    row.id,
  ]);
  for (const approve of [true, false])
    await assert.rejects(
      asUser(
        accounts.admin.id,
        "select public.catalog_review_revision($1,$2,$3)",
        [row.id, approve, "Must not self-review historical sync"],
      ),
      /Sync initiators cannot review/,
    );
  await asUser(
    accounts.reviewer.id,
    "select public.catalog_review_revision($1,true,$2)",
    [row.id, "Independent SQL fixture review"],
  );
  const after = (
    await fixture.pg.query(
      "select created_by,state,reviewed_by from catalog.revisions where id=$1",
      [row.id],
    )
  ).rows[0];
  assert.deepEqual(after, {
    created_by: null,
    state: "approved",
    reviewed_by: accounts.reviewer.id,
  });
});
test("a new release cannot reuse a historically self-reviewed sync record", async () => {
  const row = await historicalRevision(true),
    before = Number(
      (await fixture.pg.query("select count(*) as n from catalog.releases"))
        .rows[0].n,
    );
  await assert.rejects(
    asUser(
      accounts.reviewer.id,
      "select public.catalog_freeze_release($1::uuid[],$2)",
      [[row.id], fixture.bundle.snapshot.git_commit],
    ),
    /Sync initiators cannot review/,
  );
  assert.equal(
    Number(
      (await fixture.pg.query("select count(*) as n from catalog.releases"))
        .rows[0].n,
    ),
    before,
  );
  assert.equal(
    (
      await fixture.pg.query(
        "select reviewed_by from catalog.revisions where id=$1",
        [row.id],
      )
    ).rows[0].reviewed_by,
    accounts.admin.id,
    "Historical review metadata must not be rewritten",
  );
});
