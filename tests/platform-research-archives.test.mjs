import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { loadMigrations } from "../scripts/lib/migrations.mjs";
import { canonicalJSON, sha256 } from "../scripts/lib/catalog/codec.mjs";
import { remoteDatabaseInventory } from "../scripts/lib/catalog/remote-import.mjs";
import { databaseResearchArchive } from "../scripts/lib/research-archive-policy.mjs";
import { studioFixture } from "./helpers/studio-fixture.mjs";
import {
  researchFindings,
  researchSourceKey,
  applyResearchArchives,
  verifyResearchArchives,
  prepareResearchArchives,
  prepareResearchRemainderArchives,
} from "../scripts/lib/catalog/research-archives.mjs";

const actor = "00000000-0000-4000-8000-000000000003";
const editor = "00000000-0000-4000-8000-000000000001";
const source = {
  repository: "https://github.com/OpenEnvision/GameMap",
  revision: "a".repeat(40),
};
const markdown = `# Historical source review\n\nNo build, browser or gameplay was executed.\n\n## Fixture game\n\n- Source: [owner/game](https://github.com/owner/game/tree/${"b".repeat(40)}).\n- License: pending, CC BY-NC notices.\n- Runtime status: not built, not playtested; upstream tests not run.\n\n## Inventory\n\n| Repository | Status | Limit |\n| --- | --- | --- |\n| [owner/game](https://github.com/owner/game) | excluded | 中文来源，未试玩 |\n`;
const entries = [
  {
    key: "resource:fixture",
    body: { payload: { repository_url: "https://github.com/owner/game" } },
  },
];
function fixture() {
  const path = "docs/fixture.md";
  const archive = {
    key: researchSourceKey(source, path),
    slug: "remote/archive/fixture",
    title: "Historical source review",
    format: "archived-markdown",
    source: {
      ...source,
      path,
      sha256: sha256(markdown),
      bytes: Buffer.byteLength(markdown),
    },
    original_text: markdown,
    markdown,
    provenance: { runtime: "not_run" },
    findings: researchFindings(markdown, entries),
  };
  const payload = {
    format: "gamemap.research-archives",
    version: 1,
    source,
    package_sha256: "f".repeat(64),
    sources: [archive],
    exclusions: [
      { key: "threejs-game:hexgl", reason: "Pending license; do not promote" },
    ],
  };
  const canonical = canonicalJSON(payload);
  return { payload, canonical, digest: sha256(canonical) };
}
async function database(t) {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`create role anon; create role authenticated; create role service_role; create schema auth;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;`);
  for (const migration of await loadMigrations()) await db.exec(migration.sql);
  for (const [id, role] of [
    [actor, "admin"],
    [editor, "editor"],
  ]) {
    await db.query("insert into auth.users values($1)", [id]);
    await db.query(
      "insert into catalog.memberships(user_id,role) values($1,$2)",
      [id, role],
    );
  }
  await db.exec(
    "insert into catalog.entries(key,kind,identifier,canonical_path,collection_path,owner) values('resource:fixture','resource','fixture','/resources/fixture/','/resources/','database')",
  );
  return db;
}
async function authenticated(db, user, run) {
  return db.transaction(async (tx) => {
    await tx.exec("set local role authenticated");
    await tx.query("select set_config('request.jwt.claim.sub',$1,true)", [
      user,
    ]);
    return run(tx);
  });
}

test("research archives: all original result archives migrate; guides, design and skills do not", () => {
  assert.equal(
    databaseResearchArchive({
      kind: "archived-markdown",
      slug: "remote/archive/anything",
    }),
    true,
  );
  assert.equal(
    databaseResearchArchive({
      kind: "rendered-page-reconstruction",
      slug: "remote/agents-notes",
    }),
    true,
  );
  for (const slug of [
    "practical-guide",
    "design/design-system",
    "deployment",
    "skills/level-design/SKILL",
    "tutorials-and-demos",
  ])
    assert.equal(
      databaseResearchArchive({
        kind: "rendered-page-reconstruction",
        slug: `remote/${slug}`,
      }),
      false,
    );
});

test("research findings: structured rows and fields retain caveats, URLs and catalog associations", () => {
  const findings = researchFindings(markdown, entries);
  const game = findings.find((item) => item.title === "Fixture game");
  assert.deepEqual(game.fields.License, ["pending, CC BY-NC notices."]);
  assert.ok(
    game.text.includes("not built, not playtested; upstream tests not run"),
  );
  assert.deepEqual(game.catalog_keys, ["resource:fixture"]);
  const row = findings.find((item) => item.kind === "table-row");
  assert.equal(row.fields.Status, "excluded");
  assert.equal(row.fields.Limit, "中文来源，未试玩");
  assert.ok(row.markdown.includes("| excluded |"));
  assert.ok(
    findings[0].text.includes("No build, browser or gameplay was executed"),
  );
  assert.throws(() =>
    researchFindings("# Unsafe\n\n<script>alert(1)</script>"),
  );
});

test("research archives: atomic import, byte-identical read-back, idempotency and no catalog/publication changes", async (t) => {
  const db = await database(t),
    prepared = fixture();
  const before = await remoteDatabaseInventory(db);
  const result = await db.transaction((tx) =>
    applyResearchArchives(tx, prepared, { actor, backupInventory: before }),
  );
  assert.equal(result.result.publicationChanged, false);
  assert.equal(result.result.sources, 1);
  assert.equal(result.receipt.sources[0].sha256, sha256(markdown));
  assert.equal(
    (
      await db.query(
        "select count(*)::int as n from catalog.research_finding_entries",
      )
    ).rows[0].n,
    2,
  );
  const after = await remoteDatabaseInventory(db);
  for (const table of before.filter(
    (row) =>
      ![
        "research_import_batches",
        "research_sources",
        "research_findings",
        "research_finding_entries",
        "audit_events",
      ].includes(row.table),
  ))
    assert.deepEqual(
      after.find(
        (row) => row.schema === table.schema && row.table === table.table,
      ),
      table,
    );
  await db.transaction((tx) =>
    applyResearchArchives(tx, prepared, { actor, backupInventory: after }),
  );
  assert.deepEqual(await remoteDatabaseInventory(db), after);
  await assert.rejects(
    db.query("update catalog.research_sources set title='changed'"),
    /immutable|mutation/i,
  );
  await assert.rejects(
    db.query("delete from catalog.research_findings"),
    /immutable|mutation/i,
  );
  await verifyResearchArchives(db, prepared);
});

test("research archives: owner/admin gate, digest/byte checks, conflicts and stale backup fail closed", async (t) => {
  const db = await database(t),
    prepared = fixture();
  const before = await remoteDatabaseInventory(db);
  await assert.rejects(
    db.transaction((tx) =>
      applyResearchArchives(tx, prepared, {
        actor: editor,
        backupInventory: before,
      }),
    ),
    /admin/i,
  );
  await assert.rejects(
    db.transaction((tx) =>
      applyResearchArchives(tx, prepared, { actor, backupInventory: [] }),
    ),
    /backup/i,
  );
  const corrupt = structuredClone(prepared);
  corrupt.payload.sources[0].original_text += "changed";
  corrupt.canonical = canonicalJSON(corrupt.payload);
  corrupt.digest = sha256(corrupt.canonical);
  await assert.rejects(
    db.transaction((tx) =>
      applyResearchArchives(tx, corrupt, { actor, backupInventory: before }),
    ),
    /check constraint/i,
  );
  assert.deepEqual(await remoteDatabaseInventory(db), before);
  await assert.rejects(
    db.query("select catalog.import_research_archives($1,$2)", [
      prepared.canonical,
      "0".repeat(64),
    ]),
  );
  await db.transaction((tx) =>
    applyResearchArchives(tx, prepared, { actor, backupInventory: before }),
  );
  const conflict = fixture();
  conflict.payload.exclusions.push({ key: "fixture:conflict" });
  conflict.canonical = canonicalJSON(conflict.payload);
  conflict.digest = sha256(conflict.canonical);
  const after = await remoteDatabaseInventory(db);
  await assert.rejects(
    db.transaction((tx) =>
      applyResearchArchives(tx, conflict, { actor, backupInventory: after }),
    ),
    /duplicate key/i,
  );
  assert.deepEqual(await remoteDatabaseInventory(db), after);
});

test("research evidence: authenticated search/read only; anonymous and direct table access denied", async (t) => {
  const db = await database(t),
    prepared = fixture();
  const backupInventory = await remoteDatabaseInventory(db);
  await db.transaction((tx) =>
    applyResearchArchives(tx, prepared, { actor, backupInventory }),
  );
  const result = await authenticated(db, editor, (tx) =>
    tx.query(
      "select public.catalog_research_search('CC BY-NC',0,40) as result",
    ),
  );
  assert.equal(result.rows[0].result.total, 1);
  const chinese = await authenticated(db, editor, (tx) =>
    tx.query("select public.catalog_research_search('未试玩',0,40) as result"),
  );
  assert.equal(chinese.rows[0].result.total, 1);
  const detail = await authenticated(db, editor, (tx) =>
    tx.query("select public.catalog_research_source($1) as result", [
      prepared.payload.sources[0].key,
    ]),
  );
  assert.deepEqual(detail.rows[0].result, prepared.payload.sources[0]);
  await assert.rejects(
    authenticated(db, editor, (tx) =>
      tx.query("select * from catalog.research_sources"),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    authenticated(db, editor, (tx) =>
      tx.query("select catalog.import_research_archives($1,$2)", [
        prepared.canonical,
        prepared.digest,
      ]),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    authenticated(db, editor, (tx) =>
      tx.query("select public.catalog_research_search('',-1,40)"),
    ),
    /Invalid research search/,
  );
  await assert.rejects(
    db.transaction(async (tx) => {
      await tx.exec("set local role anon");
      return tx.query("select public.catalog_research_search('')");
    }),
    /permission denied/i,
  );
});

test("research evidence API: authenticated search, source detail, input bounds and no public exposure", async (t) => {
  const studio = await studioFixture();
  t.after(() => studio.close());
  const prepared = fixture();
  const backupInventory = await remoteDatabaseInventory(studio.pg);
  await studio.pg.transaction((tx) =>
    applyResearchArchives(tx, prepared, { actor, backupInventory }),
  );
  assert.equal(
    (await studio.request("/api/research-sources?q=license")).status,
    401,
  );
  const session = await studio.login("editor");
  const search = await studio.request("/api/research-sources?q=CC%20BY-NC", {
    session,
  });
  assert.equal(search.status, 200);
  assert.equal((await search.json()).total, 1);
  const detail = await studio.request(
    `/api/research-sources/${prepared.payload.sources[0].key}`,
    { session },
  );
  assert.deepEqual((await detail.json()).source, prepared.payload.sources[0]);
  assert.equal(
    (
      await studio.request("/api/research-sources/" + "0".repeat(64), {
        session,
      })
    ).status,
    404,
  );
  for (const path of [
    "/api/research-sources?offset=-1",
    "/api/research-sources?q=" + "a".repeat(257),
    "/api/research-sources/invalid",
  ])
    assert.equal((await studio.request(path, { session })).status, 422);
});

test("research archives: a separate remainder batch preserves the first batch and catalog state", async (t) => {
  const db = await database(t),
    first = fixture();
  await db.transaction(async (tx) =>
    applyResearchArchives(tx, first, {
      actor,
      backupInventory: await remoteDatabaseInventory(tx),
    }),
  );
  const second = fixture(),
    record = second.payload.sources[0];
  record.source.path = "docs/older-guide/index.html";
  record.key = researchSourceKey(source, record.source.path);
  record.slug = "remote/older-guide";
  record.format = "rendered-page-reconstruction";
  record.original_text = "<p>Historical guide; not playtested.</p>";
  record.source.sha256 = sha256(record.original_text);
  record.source.bytes = Buffer.byteLength(record.original_text);
  second.canonical = canonicalJSON(second.payload);
  second.digest = sha256(second.canonical);
  const backupInventory = await remoteDatabaseInventory(db);
  await db.transaction((tx) =>
    applyResearchArchives(tx, second, { actor, backupInventory }),
  );
  await verifyResearchArchives(db, first);
  await verifyResearchArchives(db, second);
  assert.equal(
    (await db.query("select count(*)::int as n from catalog.research_sources"))
      .rows[0].n,
    2,
  );
  assert.equal(
    (await db.query("select count(*)::int as n from catalog.entries")).rows[0]
      .n,
    1,
  );
});

test(
  "research archives: pinned complete source packet compiles without losing Batch 001, candidates or exclusions",
  {
    skip: !process.env.REMOTE_DOC_PACKET || !process.env.REMOTE_DOC_CHECKOUT,
  },
  async () => {
    const prepared = await prepareResearchArchives({
      packet: process.env.REMOTE_DOC_PACKET,
      checkout: process.env.REMOTE_DOC_CHECKOUT,
    });
    const batch = prepared.payload.sources.find((s) =>
      s.slug.endsWith("evidence/batch-001"),
    );
    assert.equal(
      batch.source.sha256,
      "2793930bf4b43485c11bf0fe4bb2bbe42d05c4d584429f866259e706c8f6d4ed",
    );
    assert.equal(batch.source.bytes, 24242);
    assert.equal(
      batch.findings.filter((f) => f.fields["Runtime status"]).length,
      11,
    );
    assert.ok(batch.findings.some((f) => f.text.includes("CC BY-NC 3.0")));
    const candidates = prepared.payload.sources.find(
      (s) => s.format === "native-json",
    );
    assert.equal(candidates.findings.length, 46);
    assert.equal(
      candidates.findings.find((f) => f.title === "hexgl").fields.status,
      "pending",
    );
    assert.equal(prepared.payload.exclusions.length, 115);
    assert.equal(prepared.payload.sources.length, 49);
    const receipt = JSON.parse(
      await readFile("config/research-archive-receipt.json", "utf8"),
    );
    assert.equal(receipt.batch_digest, prepared.digest);
  },
);

test(
  "research archives: remaining guide snapshots and full conversion metadata form a disjoint reproducible batch",
  {
    skip: !process.env.REMOTE_DOC_PACKET || !process.env.REMOTE_DOC_CHECKOUT,
  },
  async () => {
    const prepared = await prepareResearchRemainderArchives({
      packet: process.env.REMOTE_DOC_PACKET,
      checkout: process.env.REMOTE_DOC_CHECKOUT,
    });
    assert.equal(prepared.payload.sources.length, 50);
    assert.equal(
      prepared.payload.sources.filter(
        (source) => source.format === "rendered-page-reconstruction",
      ).length,
      49,
    );
    const metadata = prepared.payload.sources.find(
      (source) => source.slug === "remote/document-provenance",
    );
    assert.equal(JSON.parse(metadata.original_text).documents.length, 96);
    for (const slug of [
      "remote/publishing-platforms",
      "remote/zh/publishing-platforms",
    ])
      assert.ok(
        prepared.payload.sources.find((source) => source.slug === slug)
          ?.findings.length,
      );
    const initialReceipt = JSON.parse(
      await readFile("config/research-archive-receipt.json", "utf8"),
    );
    const keys = new Set(initialReceipt.sources.map((source) => source.key));
    assert.ok(
      prepared.payload.sources.every((source) => !keys.has(source.key)),
    );
    const receipt = JSON.parse(
      await readFile("config/research-archive-remainder-receipt.json", "utf8"),
    );
    assert.equal(receipt.batch_digest, prepared.digest);
  },
);
