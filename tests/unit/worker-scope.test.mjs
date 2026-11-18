import test from "node:test";
import assert from "node:assert/strict";
import { studioFixture, accounts } from "../helpers/studio-fixture.mjs";
import { createCatalogWorker } from "../../scripts/lib/catalog/worker.mjs";

const decode = async (response, expected = 200) => {
  const body = await response.json();
  assert.equal(response.status, expected, JSON.stringify(body));
  return body;
};

test("source-scoped workers preserve generated document fidelity without approving unrelated fixtures", async (t) => {
  const fixture = await studioFixture();
  t.after(() => fixture.close());
  const admin = await fixture.login("admin");
  const reviewer = await fixture.login("reviewer");
  const original = fixture.bundle.snapshot.entries.find(
    (entry) => entry.kind === "resource",
  );
  const extra = await decode(
    await fixture.request("/api/drafts", {
      session: admin,
      method: "POST",
      body: {
        kind: "resource",
        identifier: "outside-source-cohort",
        schemaVersion: original.schema_version,
        expectedHead: null,
        payload: {
          ...original.body.payload,
          id: "outside-source-cohort",
          name: "Outside source cohort fixture",
        },
        attachments: original.body.attachments,
        translations: [],
      },
    }),
    201,
  );
  await fixture.worker.validate(accounts.admin.id, extra.id);
  async function review(ids) {
    if (!ids.length) return;
    await decode(
      await fixture.request("/api/review", {
        session: admin,
        method: "POST",
        body: { action: "submit", ids },
      }),
    );
    const self = await fixture.request("/api/review", {
      session: admin,
      method: "POST",
      body: { action: "approve", ids, note: "Must still reject self-review" },
    });
    assert.equal(self.status, 403);
    await decode(
      await fixture.request("/api/review", {
        session: reviewer,
        method: "POST",
        body: {
          action: "approve",
          ids,
          note: "Independent test-only fixture review, not a gameplay or external-source review",
        },
      }),
    );
  }
  await review([extra.id]);
  const beforeExtra = (
    await fixture.pg.query("select * from catalog.revisions where id=$1", [
      extra.id,
    ])
  ).rows[0];
  const selectionKeys = fixture.bundle.snapshot.entries.map(
    (entry) => entry.key,
  );
  const options = {
    realm: fixture.realm,
    sourceFiles: fixture.bundle.snapshot.source_files,
    readAsset: (path) => fixture.media.readAsset(path),
    selectionKeys,
  };
  for (const keys of [
    [],
    [...selectionKeys, selectionKeys[0]],
    selectionKeys.slice(1),
  ])
    assert.throws(
      () =>
        createCatalogWorker(fixture.database, fixture.context, {
          ...options,
          selectionKeys: keys,
        }),
      /cohort|source record/,
    );
  const worker = createCatalogWorker(
    fixture.database,
    fixture.context,
    options,
  );
  await assert.rejects(
    worker.validate(accounts.admin.id, extra.id),
    /Revision was not found/,
  );
  await assert.rejects(
    worker.freeze(accounts.reviewer.id, [extra.id]),
    /Missing or duplicate release revisions/,
  );
  await assert.rejects(
    worker.syncDocuments(accounts.editor.id),
    /permission denied/i,
  );
  assert.equal((await worker.syncDocuments(accounts.admin.id)).changed, 0);

  // The ordinary worker still includes the approved fixture. Its generated
  // resource/attribution documents must not silently enter the scoped release.
  const broader = await fixture.worker.syncDocuments(accounts.admin.id);
  assert.ok(broader.changed > 0);
  const scoped = await worker.syncDocuments(accounts.admin.id);
  assert.equal(scoped.changed, broader.changed);
  assert.equal(scoped.published, false);
  const drafts = (
    await fixture.pg.query(
      "select * from catalog.revisions where id=any($1::uuid[])",
      [scoped.ids],
    )
  ).rows;
  assert.ok(
    drafts.every(
      (row) => row.state === "draft" && row.created_by === accounts.admin.id,
    ),
  );
  assert.equal(
    Number(
      (
        await fixture.pg.query(
          "select count(*) n from catalog.validation_receipts where revision_id=any($1::uuid[])",
          [scoped.ids],
        )
      ).rows[0].n,
    ),
    scoped.changed,
  );
  await review(scoped.ids);
  const ids = (
    await fixture.pg.query(
      "select head_revision_id from catalog.entries where key=any($1::text[]) order by key",
      [selectionKeys],
    )
  ).rows.map((row) => row.head_revision_id);
  const frozen = await worker.freeze(accounts.reviewer.id, ids);
  assert.equal(frozen.records, selectionKeys.length);
  assert.equal(frozen.deployed, false);
  const pack = await worker.exportRelease(accounts.reviewer.id, frozen.id);
  assert.ok(!pack.manifest_text.includes("outside-source-cohort"));
  assert.ok(!pack.context_text.includes("Outside source cohort fixture"));
  assert.deepEqual(
    (
      await fixture.pg.query("select * from catalog.revisions where id=$1", [
        extra.id,
      ])
    ).rows[0],
    beforeExtra,
  );
  assert.equal(
    (await fixture.pg.query("select release_id from catalog.deployment_state"))
      .rows[0].release_id,
    null,
  );
});
