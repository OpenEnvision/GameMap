import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { PGlite } from "@electric-sql/pglite";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  symlink,
  readdir,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { loadContent } from "../../scripts/lib/content.mjs";
import { loadMigrations } from "../../scripts/lib/migrations.mjs";
import { adapterFor } from "../../scripts/lib/catalog/adapters.mjs";
import { canonicalJSON, sha256 } from "../../scripts/lib/catalog/codec.mjs";
import {
  prepareRemoteImport,
  assertRemoteImportAssets,
  applyRemoteImport,
  remoteDatabaseInventory,
  verifyRemoteImportBackup,
} from "../../scripts/lib/catalog/remote-import.mjs";

import {
  recoverRemoteSource,
  remoteSource,
  validateCandidate,
} from "../../scripts/lib/catalog/remote-source.mjs";

const admin = "00000000-0000-4000-8000-000000000003";
const reviewer = "00000000-0000-4000-8000-000000000002";
const editor = "00000000-0000-4000-8000-000000000001";
const revision = "a2fe9a8e1d7b05008e11db1586d308c0086f7d91";
let context, directory;
before(async () => {
  context = await loadContent();
  directory = await mkdtemp(join(tmpdir(), "gamemap-remote-import-"));
});
after(async () => {
  await rm(directory, { recursive: true, force: true });
});
function candidate(id) {
  const original = context.registry.entries.find(
    (entry) => entry.key === "resource:codex",
  );
  return {
    key: `resource:${id}`,
    kind: "resource",
    identifier: id,
    body: {
      title: original.title,
      summary: original.description,
      payload: { ...original.data, id },
      attachments: { identity: context.sources.identities.codex },
    },
    source_ref: "data/resources.json",
    source_review: { remote_revision: revision },
  };
}
// Deterministic reference-table fixtures exercise the same recovery path as real packets.
function encodeRoute(name, data) {
  const table = [];
  function ref(value) {
    const index = table.length;
    table.push(null);
    table[index] = Array.isArray(value)
      ? value.map(ref)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.entries(value).map(([key, child]) => [
              `_${ref(key)}`,
              ref(child),
            ]),
          )
        : value;
    return index;
  }
  ref({ [name]: { data } });
  return Buffer.from(JSON.stringify(table) + "\n");
}
async function recoveredFixture(entries, extra = {}) {
  const resources = entries.filter((entry) => entry.kind === "resource");
  const examples = entries.filter((entry) => entry.kind === "example");
  const demos = entries.filter((entry) => entry.kind === "demo");
  const papers = entries.filter((entry) => entry.kind === "paper");
  const row = (entry) => ({
    key: entry.key,
    kind: entry.kind,
    id: entry.identifier,
    title: entry.body.title,
    description: entry.body.summary,
    url: `/resources/${entry.identifier}/`,
    collectionUrl: "/resources/",
    data: entry.body.payload,
    source: "fixture.json",
    blocks: entry.body.attachments.projectMedia
      ? [
          {
            type: "image",
            field: "projectMedia",
            ...entry.body.attachments.projectMedia,
          },
        ]
      : [],
  });
  const media = Object.fromEntries(
    examples
      .filter((e) => e.body.attachments.learningMedia)
      .map((e) => [e.identifier, e.body.attachments.learningMedia]),
  );
  const sources = new Map(
    Object.entries({
      "data/resources.data": encodeRoute("resources", {
        entries: resources.map(row),
        demos: [],
      }),
      "data/examples.data": encodeRoute("examples", {
        examples: examples.map(row),
        platforms: [],
        foundations: [],
        collections: [],
        media,
      }),
      "data/agents.data": encodeRoute("agents", {
        tools: [],
        examples: [],
        media,
        attribution: Object.fromEntries(
          examples.map((e) => [
            e.identifier,
            e.body.attachments.agentAttribution,
          ]),
        ),
      }),
      "data/paths.data": encodeRoute("paths", { paths: [], steps: [] }),
      "data/showcase.data": encodeRoute("demos", { demos: demos.map(row) }),
      "data/testing.data": encodeRoute("testing", { entries: [], packs: [] }),
      "data/research.data": encodeRoute("research", { records: [] }),
      "data/docs.data": encodeRoute("docs", { manifest: [] }),
      ...Object.fromEntries(
        Object.entries({
          "data/resources.json": resources.map((e) => e.body.payload),
          "data/logo-sources.json": Object.fromEntries(
            resources.map((e) => [e.identifier, e.body.attachments.identity]),
          ),
          "data/testing-resources.json": { resources: [], starterPacks: [] },
          "data/repository-research.json": { records: [] },
          "data/papers.json": papers.map((e) => e.body.payload),
          "data/papers-provenance.json": {
            records: papers.map((e) => ({
              recordId: e.identifier,
              license: "License not established",
            })),
          },
          "collections/threejs-games/games.json": {
            $schema: "games.schema.json",
            schema_version: 2,
            games: [],
          },
          "collections/threejs-games/candidates.json": {
            $schema: "candidates.schema.json",
            schema_version: 1,
            candidates: [],
          },
          "data/search-index.json": { documents: [] },
        }).map(([path, value]) => [path, Buffer.from(JSON.stringify(value))]),
      ),
      ...extra,
    }),
  );
  const read = async (path) => {
    if (!sources.has(path) && /^(logos|media)\//.test(path))
      sources.set(path, await readFile(join("website/public", path)));
    assert.ok(sources.has(path), `Missing fixture source: ${path}`);
    return sources.get(path);
  };
  return recoverRemoteSource(read, [...sources.keys()], context);
}
async function packet(
  entries = [candidate("remote-one")],
  mutate = () => {},
  extra = {},
) {
  const path = await mkdtemp(join(directory, "packet-"));
  const { pack: value, files } = await recoveredFixture(entries, extra);
  for (const [source, bytes] of files) {
    await mkdir(dirname(join(path, "source", source)), { recursive: true });
    await writeFile(join(path, "source", source), bytes);
  }
  mutate(value);
  await writeFile(join(path, "candidates.json"), JSON.stringify(value));
  return { path, value };
}
async function prepared(entries) {
  return prepareRemoteImport((await packet(entries)).path, { context });
}
async function database(t) {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`create role anon; create role authenticated; create role service_role; create schema auth;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;`);
  for (const migration of await loadMigrations()) await db.exec(migration.sql);
  for (const [id, role] of [
    [admin, "admin"],
    [reviewer, "reviewer"],
    [editor, "editor"],
  ]) {
    await db.query("insert into auth.users values($1)", [id]);
    await db.query(
      "insert into catalog.memberships(user_id,role) values($1,$2)",
      [id, role],
    );
  }
  return db;
}
async function apply(db, input, options = {}) {
  const backupInventory =
    options.backupInventory || (await remoteDatabaseInventory(db));
  return db.transaction((tx) =>
    applyRemoteImport(tx, input, { actor: admin, backupInventory, ...options }),
  );
}
async function tableRows(db, table) {
  return (
    await db.query(
      `select to_jsonb(t) as row from catalog.${table} t order by to_jsonb(t)::text`,
    )
  ).rows;
}
async function contentState(db) {
  const result = {};
  for (const name of [
    "entries",
    "revisions",
    "revision_terms",
    "revision_links",
    "revision_relations",
    "revision_assets",
    "translations",
    "validation_receipts",
    "releases",
    "release_items",
    "release_contexts",
    "release_realms",
    "legacy_local_publications",
    "deployment_state",
    "publication_state",
    "publication_artifacts",
    "publication_events",
  ])
    result[name] = await tableRows(db, name);
  return result;
}

test("remote-import locks catalog only without requesting Supabase system-table write privileges", async (t) => {
  const db = await database(t);
  await db.exec(
    "create table public.system_fixture(id integer primary key, value text); insert into public.system_fixture values(1,'unchanged')",
  );
  const input = await prepared([candidate("remote-lock-boundary")]);
  const backupInventory = await remoteDatabaseInventory(db);
  const locks = [];
  const result = await db.transaction((tx) =>
    applyRemoteImport(
      {
        query: async (text, values = []) => {
          if (text.startsWith("lock table ")) {
            locks.push(text);
            if (!text.startsWith('lock table "catalog".'))
              throw Object.assign(
                new Error(
                  "System tables are readable, not lockable by the catalog owner",
                ),
                { code: "42501" },
              );
          }
          return tx.query(text, values);
        },
      },
      input,
      { actor: admin, backupInventory },
    ),
  );
  assert.deepEqual(result.inserted, ["resource:remote-lock-boundary"]);
  assert.equal(
    locks.length,
    backupInventory.filter((table) => table.schema === "catalog").length,
  );
  assert.deepEqual(
    (await remoteDatabaseInventory(db)).filter(
      (table) => table.schema !== "catalog",
    ),
    backupInventory.filter((table) => table.schema !== "catalog"),
  );
  const fresh = await remoteDatabaseInventory(db);
  await db.exec(
    "update public.system_fixture set value='external change' where id=1",
  );
  await assert.rejects(
    apply(db, await prepared([candidate("remote-stale-system-inventory")]), {
      backupInventory: fresh,
    }),
    /Database changed since backup/,
  );
});

test("remote-import: additive drafts preserve populated bodies/workflow, normalized links/terms, and release state; immutable exact retries", async (t) => {
  const db = await database(t);
  const realm = (
    await db.query(
      "select catalog.initialize_release_realm('local','ingestion-fixture','local-site') as realm",
    )
  ).rows[0].realm;
  await db.query("select catalog.claim_publication_target('local-site',$1)", [
    sha256("isolated fixture root"),
  ]);
  const seed = await prepared([candidate("remote-existing")]);
  await apply(db, seed);
  const id = seed.snapshot.entries[0].revision_id;
  await db.transaction(async (tx) => {
    await tx.query("select set_config('request.jwt.claim.sub',$1,true)", [
      admin,
    ]);
    await tx.query("select public.catalog_submit_revision($1)", [id]);
    await tx.query("select set_config('request.jwt.claim.sub',$1,true)", [
      reviewer,
    ]);
    await tx.query(
      "select public.catalog_review_revision($1,true,'Independent fixture review')",
      [id],
    );
    // Explicit isolated fixture publication, never part of the importer.
    const release = (
      await tx.query(
        "select public.catalog_freeze_release($1::uuid[],$2) as id",
        [[id], revision],
      )
    ).rows[0].id;
    const build = canonicalJSON({
      format: "gamemap.build-context",
      version: 2,
      realm,
      environment: "local",
      git_commit: revision,
      selected_revisions: [
        { id, digest: seed.snapshot.entries[0].fingerprint, schema_version: 1 },
      ],
    });
    await tx.query("select catalog.attach_release_context($1,$2,$3)", [
      release,
      build,
      sha256(build),
    ]);
    // Isolated SQL fixture receipt only: exercise real realm-bound publication,
    // never the retired activation bypass or an actual site/DB.
    const artifactDigest = sha256("isolated fixture artifact");
    const manifestDigest = (
      await tx.query("select digest from catalog.releases where id=$1", [
        release,
      ])
    ).rows[0].digest;
    await tx.query("select catalog.register_publication_artifact($1)", [
      canonicalJSON({
        format: "gamemap.site-artifact",
        version: 2,
        realm,
        artifactDigest,
        browserChecked: true,
        development: true,
        mode: "release",
        files: [],
        release,
        manifestDigest,
        contextDigest: sha256(build),
        gitCommit: revision,
      }),
    ]);
    await tx.query(
      "select catalog.activate_publication($1,null,null,'isolated-fixture-only')",
      [artifactDigest],
    );
  });
  const before = await contentState(db);
  const changed = candidate("remote-existing");
  changed.body.payload.detail += " Remote differs.";
  const input = await prepared([changed, candidate("remote-new")]);
  const result = await apply(db, input);
  assert.deepEqual(result.inserted, ["resource:remote-new"]);
  assert.deepEqual(result.conflicts, [{ key: changed.key, sameBody: false }]);
  const after = await contentState(db);
  for (const name of Object.keys(before))
    for (const row of before[name])
      assert.ok(
        after[name].some((x) => canonicalJSON(x) === canonicalJSON(row)),
        `Existing ${name} row changed`,
      );
  for (const name of [
    "releases",
    "release_items",
    "release_contexts",
    "release_realms",
    "legacy_local_publications",
    "deployment_state",
    "publication_state",
    "publication_artifacts",
    "publication_events",
  ])
    assert.deepEqual(after[name], before[name]);
  const added = (
    await db.query(
      "select * from catalog.revisions where entry_key='resource:remote-new'",
    )
  ).rows[0];
  assert.equal(added.state, "draft");
  assert.equal(added.created_by, admin);
  assert.equal(added.reviewed_by, null);
  assert.equal(added.source_review.remote_import_batch, input.batchDigest);
  assert.ok(after.revision_links.length > before.revision_links.length);
  assert.ok(after.revision_terms.length > before.revision_terms.length);
  assert.ok(after.revision_assets.length > before.revision_assets.length);
  assert.equal(
    (
      await db.query(
        "select count(*)::integer as n from catalog.validation_receipts where revision_id=$1",
        [added.id],
      )
    ).rows[0].n,
    1,
  );
  const inventory = await remoteDatabaseInventory(db);
  assert.deepEqual(await apply(db, input, { backupInventory: [] }), result);
  assert.deepEqual(await remoteDatabaseInventory(db), inventory);
  await assert.rejects(
    db.query("update catalog.remote_import_batches set result='{}'"),
    /immutable/i,
  );
  await assert.rejects(
    db.query("delete from catalog.remote_import_batches"),
    /immutable/i,
  );
  // A new batch containing only an existing key must not add normalized rows or revise it.
  const conflictsOnly = await prepared([candidate("remote-new")]);
  const unchanged = await contentState(db);
  const conflict = await apply(db, conflictsOnly);
  assert.deepEqual(conflict.inserted, []);
  assert.equal(conflict.conflicts[0].sameBody, true);
  assert.deepEqual(await contentState(db), unchanged);
});

test("remote-import: admin authors cannot review their own drafts; editors and browser/backend/service roles cannot import", async (t) => {
  const db = await database(t);
  const input = await prepared();
  await assert.rejects(
    apply(db, input, { actor: editor }),
    /owner connection|admin actor/,
  );
  for (const role of [
    "anon",
    "authenticated",
    "service_role",
    "catalog_backend",
    "catalog_deployer",
  ]) {
    await assert.rejects(
      db.transaction(async (tx) => {
        await tx.query(`set local role ${role}`);
        await tx.query("select catalog.import_remote_snapshot($1,$2,$3,$4)", [
          input.provenance,
          input.batchDigest,
          canonicalJSON(input.snapshot),
          sha256(canonicalJSON(input.snapshot)),
        ]);
      }),
      /permission denied|owner/,
    );
  }
  await apply(db, input);
  const id = input.snapshot.entries[0].revision_id;
  await db.transaction(async (tx) => {
    await tx.query("select set_config('request.jwt.claim.sub',$1,true)", [
      admin,
    ]);
    await tx.query("select public.catalog_submit_revision($1)", [id]);
  });
  await assert.rejects(
    db.transaction(async (tx) => {
      await tx.query("select set_config('request.jwt.claim.sub',$1,true)", [
        admin,
      ]);
      await tx.query(
        "select public.catalog_review_revision($1,true,'Self review forbidden')",
        [id],
      );
    }),
    /Authors cannot/,
  );
  assert.equal(
    (await db.query("select count(*)::integer n from catalog.release_items"))
      .rows[0].n,
    0,
  );
});

test("remote-import: mid-batch relational failure rolls back all content, provenance and audit", async (t) => {
  const db = await database(t);
  const input = await prepared([
    candidate("remote-first"),
    candidate("remote-second"),
  ]);
  const before = await remoteDatabaseInventory(db);
  // Fault injection after offline validation: SQL must still enforce the normalized FK, atomically.
  input.snapshot.relations.push({
    revision_id: input.snapshot.entries[1].revision_id,
    target_key: "resource:missing",
    relation: "related",
    field: "payload.test",
  });
  await assert.rejects(apply(db, input), /foreign key/);
  assert.deepEqual(await remoteDatabaseInventory(db), before);
});

test("remote-import: stale backup/concurrent winner is rejected before writes; refreshed backup reports conflict", async (t) => {
  const db = await database(t);
  const stale = await remoteDatabaseInventory(db);
  const winner = await prepared([candidate("remote-race")]);
  const candidate2 = candidate("remote-race");
  candidate2.body.payload.detail += " Other candidate.";
  const loser = await prepared([candidate2]);
  const results = await Promise.allSettled([
    apply(db, winner, { backupInventory: stale }),
    apply(db, loser, { backupInventory: stale }),
  ]);
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  assert.match(
    results.find((r) => r.status === "rejected").reason.message,
    /changed since backup/,
  );
  const remaining = results[0].status === "rejected" ? winner : loser;
  const result = await apply(db, remaining);
  assert.deepEqual(result.inserted, []);
  assert.equal(result.conflicts.length, 1);
  assert.equal(
    (await db.query("select count(*)::integer n from catalog.revisions"))
      .rows[0].n,
    1,
  );
});

test("remote-import: packet shapes, duplicates, exclusions, paths, hashes, typed payloads and attachments fail closed offline", async () => {
  const mutations = [
    (p) => {
      p.extra = true;
    },
    (p) => {
      p.version = 2;
    },
    (p) => {
      p.source.repository = "https://untrusted.invalid";
    },
    (p) => {
      p.files.push(p.files[0]);
    },
    (p) => {
      p.entries.push(p.entries[0]);
    },
    (p) => {
      p.files[0].path = "../escape";
    },
    (p) => {
      p.files[0].sha256 = "0".repeat(64);
    },
    (p) => {
      p.files[0].bytes++;
    },
    (p) => {
      p.entries[0].source_ref = "not-listed.json";
    },
    (p) => {
      p.entries[0].source_review.remote_revision = "b".repeat(40);
    },
    (p) => {
      p.entries[0].body.payload.category = "invented-category";
    },
    (p) => {
      p.entries[0].body.attachments = {};
    },
    (p) => {
      p.entries[0].body.payload.unsupported = true;
    },
    (p) => {
      p.entries[0].body.translations = {
        zh: "No parallel translation envelope",
      };
    },
    (p) => {
      p.entries[0].kind = "unknown";
      p.entries[0].key = "unknown:remote-one";
    },
    (p) => {
      p.excluded.push({
        key: p.entries[0].key,
        source_ref: p.entries[0].source_ref,
        reason: "Pending",
      });
    },
    (p) => {
      p.artifacts.push({
        source_path: p.files[0].path,
        path: "website/public/media/../bad",
        sha256: p.files[0].sha256,
        bytes: p.files[0].bytes,
      });
    },
  ];
  for (const mutate of mutations) {
    const fixture = await packet(undefined, mutate);
    await assert.rejects(prepareRemoteImport(fixture.path, { context }));
  }
  const linked = await packet();
  await symlink("/tmp", join(linked.path, "escape"));
  await assert.rejects(
    prepareRemoteImport(linked.path, { context }),
    /symlink/i,
  );
  const good = await packet();
  const a = await prepareRemoteImport(good.path, { context });
  const b = await prepareRemoteImport(good.path, { context });
  assert.equal(a.batchDigest, b.batchDigest);
  assert.deepEqual(a.snapshot, b.snapshot);
});

test("remote-import: shared fidelity gate rejects schema-valid forged bodies and review metadata with original source hashes", async () => {
  for (const mutate of [
    (p) => {
      p.entries[0].body.payload.detail = "Forged Codex detail";
    },
    (p) => {
      p.entries[0].body.title = "Forged title";
    },
    (p) => {
      p.entries[0].body.summary = "Forged summary";
    },
    (p) => {
      p.entries[0].body.attachments.identity.notes = "Forged license claim";
    },
    (p) => {
      p.entries[0].source_review.source_title = "Forged provenance";
    },
    (p) => {
      const forged = structuredClone(p.entries[0]);
      forged.key = "resource:forged";
      forged.identifier = forged.body.payload.id = "forged";
      p.entries.push(forged);
    },
    (p) => {
      p.entries = [];
    },
    (p) => {
      p.excluded.push({
        key: "resource:fake",
        reason: "Forged exclusion",
        source_ref: "data/resources.data",
      });
    },
  ]) {
    const f = await packet();
    const files = structuredClone(f.value.files);
    mutate(f.value);
    f.value.entries.forEach((e) => validateCandidate(e, context));
    assert.deepEqual(f.value.files, files);
    await writeFile(join(f.path, "candidates.json"), JSON.stringify(f.value));
    await assert.rejects(
      prepareRemoteImport(f.path, { context }),
      /Source fidelity mismatch/,
    );
  }
  const empty = await packet([]);
  const full = await packet();
  empty.value.entries = full.value.entries;
  await writeFile(
    join(empty.path, "candidates.json"),
    JSON.stringify(empty.value),
  );
  await assert.rejects(
    prepareRemoteImport(empty.path, { context }),
    /Source fidelity mismatch: entries/,
  );
});

test("remote-import: exact JPEG/WebP destination normalization retains strict byte/extension checks", async () => {
  for (const [source, destination, format] of [
    [
      "logos/crazygames-c284e89a355c.png",
      "logos/crazygames-c284e89a355c.jpg",
      "jpeg",
    ],
    [
      "logos/stable-audio-open-e030c46f6897.png",
      "logos/stable-audio-open-e030c46f6897.webp",
      "webp",
    ],
  ]) {
    const bytes = await sharp({
      create: { width: 1, height: 1, channels: 3, background: "red" },
    })
      .toFormat(format)
      .toBuffer();
    const e = candidate("remote-normalized");
    e.body.attachments = structuredClone(e.body.attachments);
    e.body.attachments.identity.asset = source;
    e.body.attachments.identity.sha256 = sha256(bytes);
    const f = await packet([e], () => {}, { [source]: bytes });
    const prepared = await prepareRemoteImport(f.path, { context });
    assert.equal(
      prepared.snapshot.entries[0].body.attachments.identity.asset,
      destination,
    );
    assert.equal(f.value.artifacts[0].source_path, source);
    assert.deepEqual(await readFile(join(f.path, "source", source)), bytes);
    f.value.artifacts[0].path = `website/public/${source}`;
    await writeFile(join(f.path, "candidates.json"), JSON.stringify(f.value));
    await assert.rejects(
      prepareRemoteImport(f.path, { context }),
      /Asset type differs from destination extension/,
    );
  }
});

test("remote-import: SQL independently rejects digest and candidate provenance tampering", async (t) => {
  const db = await database(t);
  const input = await prepared();
  for (const tamper of ["digest", "body"]) {
    const snapshot = structuredClone(input.snapshot);
    if (tamper === "body") snapshot.entries[0].body.title = "Tampered";
    await assert.rejects(
      db.transaction(async (tx) => {
        await tx.query("select set_config('request.jwt.claim.sub',$1,true)", [
          admin,
        ]);
        await tx.query("select catalog.import_remote_snapshot($1,$2,$3,$4)", [
          input.provenance,
          tamper === "digest" ? "0".repeat(64) : input.batchDigest,
          canonicalJSON(snapshot),
          sha256(canonicalJSON(snapshot)),
        ]);
      }),
      /digest mismatch|provenance mismatch/,
    );
  }
  assert.equal(
    (await db.query("select count(*)::integer n from catalog.entries")).rows[0]
      .n,
    0,
  );
});

test("remote-import: backup hash precondition and default offline CLI (no runtime/credentials) are enforced", async () => {
  const backup = await mkdtemp(join(directory, "backup-"));
  const bytes = Buffer.from("fixture dump");
  await writeFile(join(backup, "database.dump"), bytes);
  await writeFile(join(backup, "runtime.env"), bytes);
  const metadata = { bytes: bytes.length, sha256: sha256(bytes) };
  await writeFile(
    join(backup, "manifest.json"),
    JSON.stringify({
      format: "gamemap.local-backup",
      version: 1,
      environment: "local",
      schemas: ["auth", "catalog", "public"],
      source: [],
      media: [],
      runtime: metadata,
      database: {
        ...metadata,
        tables: [
          { schema: "catalog", table: "entries", rows: 0, digest: sha256("") },
        ],
      },
    }),
  );
  assert.equal((await verifyRemoteImportBackup(backup)).length, 1);
  await writeFile(join(backup, "database.dump"), "tampered");
  await assert.rejects(verifyRemoteImportBackup(backup));
  const input = await packet();
  const run = (args) =>
    spawnSync(process.execPath, ["scripts/import/remote.mjs", ...args], {
      encoding: "utf8",
      env: {
        ...process.env,
        DATABASE_URL: "postgres://secret:DO-NOT-PRINT@remote.invalid/postgres",
      },
    });
  const dry = run(["--package", input.path]);
  assert.equal(dry.status, 0, dry.stderr);
  assert.equal(JSON.parse(dry.stdout).mode, "offline-dry-run");
  const refused = run(["--package", input.path, "--apply"]);
  assert.equal(refused.status, 1);
  assert.ok(!refused.stderr.includes("DO-NOT-PRINT"));
});

test("remote-import: media/logos source copies are inert, Git collisions are reported and other destinations/types are rejected", async () => {
  const source = Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><path d="M0 0"/></svg>',
  );
  const entry = candidate("remote-mark");
  entry.body.attachments = structuredClone(entry.body.attachments);
  entry.body.attachments.identity.asset = "logos/remote-import-test.svg";
  entry.body.attachments.identity.sha256 = sha256(source);
  const fixture = await packet([entry], () => {}, {
    "logos/remote-import-test.svg": source,
    "docs/content-platform.md": Buffer.from("# Proposed original document\n"),
  });
  const save = () =>
    writeFile(
      join(fixture.path, "candidates.json"),
      JSON.stringify(fixture.value),
    );
  await save();
  const result = await prepareRemoteImport(fixture.path, { context });
  assert.deepEqual(
    result.report.gitIntegration.map((r) => r.status),
    ["missing", "conflict"],
  );
  for (const destination of [
    "website/public/brand/unapproved.svg",
    "website/public/logos/../escape.svg",
    "website/public/logos/active.html",
    "website/public/logos/not-a-png.png",
  ]) {
    fixture.value.artifacts[0].path = destination;
    await save();
    await assert.rejects(prepareRemoteImport(fixture.path, { context }));
  }
});

test("remote-import: typed cross-candidate relations and media remain normalized", async (t) => {
  const db = await database(t);
  const original = context.registry.entries.find((e) => e.kind === "example");
  const game = {
    key: "example:remote-example",
    kind: "example",
    identifier: "remote-example",
    body: {
      title: original.title,
      summary: original.description,
      payload: {
        ...original.data,
        id: "remote-example",
        resourceIds: ["remote-anchor"],
      },
      attachments: adapterFor("example").attachments(original, context.sources),
    },
    source_ref: "data/resources.json",
    source_review: { remote_revision: revision },
  };
  const input = await prepared([candidate("remote-anchor"), game]);
  await apply(db, input);
  const relations = (await db.query("select * from catalog.revision_relations"))
    .rows;
  assert.ok(relations.some((r) => r.target_key === "resource:remote-anchor"));
  assert.equal(
    (await db.query("select count(*)::integer n from catalog.revision_assets"))
      .rows[0].n,
    input.snapshot.asset_usages.length,
  );
  assert.equal(
    (await db.query("select count(*)::integer n from catalog.revision_links"))
      .rows[0].n,
    input.snapshot.links.length,
  );
});

test("remote-import accepts native MP4 in pinned namespace without replacing managed showcase", async (t) => {
  const native = context.registry.byKey("demo:opengame-portal");
  const entry = {
    key: native.key,
    kind: native.kind,
    identifier: native.id,
    body: {
      title: native.title,
      summary: native.description,
      payload: structuredClone(native.data),
      attachments: structuredClone(
        adapterFor("demo").attachments(native, context.sources),
      ),
    },
  };
  const source = "media/showcase/opengame-portal.mp4";
  const managed = join("website/public", source);
  const bytes = await readFile(managed);
  // The real imported asset may already be installed. Never alter or remove it.
  const name = `remote-import-fixture-${randomUUID()}`;
  const fixtureSource = `media/showcase/${name}.mp4`;
  const fixturePoster = `media/showcase/${name}.webp`;
  entry.body.payload.previewSrc = `/${fixtureSource}`;
  entry.body.payload.poster = `/${fixturePoster}`;
  const { path: directory } = await packet([entry], () => {}, {
    [fixtureSource]: bytes,
    [fixturePoster]: await readFile(managed.replace(/mp4$/, "webp")),
  });
  t.after(() => rm(directory, { recursive: true, force: true }));
  const installedRoot = await mkdtemp(join(tmpdir(), "gamemap-media-install-"));
  t.after(() => rm(installedRoot, { recursive: true, force: true }));
  const prepared = await prepareRemoteImport(directory, { installedRoot });
  const destination = `website/public/media/imports/${remoteSource.revision}/showcase/${name}.mp4`;
  assert.ok(
    prepared.report.gitIntegration.some(
      (item) => item.path === destination && item.status === "missing",
    ),
  );
  assert.equal(
    prepared.snapshot.entries[0].body.payload.previewSrc,
    destination.replace("website/public", ""),
  );
  const asset = prepared.snapshot.assets.find(
    (item) => item.path === destination,
  );
  assert.equal(asset.sha256, sha256(bytes));
  assert.equal(asset.bytes, bytes.length);
  // The managed file already exists, but import writes are isolated; conflicts in
  // the actual destination still fail rather than replacing local content.
  const installed = join(installedRoot, destination);
  await mkdir(dirname(installed), { recursive: true });
  const conflicting = Buffer.from(bytes);
  conflicting[0] ^= 1;
  await writeFile(installed, conflicting, { flag: "wx" });
  await writeFile(
    installed.replace(/mp4$/, "webp"),
    await readFile(managed.replace(/mp4$/, "webp")),
    { flag: "wx" },
  );
  const conflicted = await prepareRemoteImport(directory, { installedRoot });
  assert.ok(
    conflicted.report.gitIntegration.some(
      (item) => item.path === destination && item.status === "conflict",
    ),
  );
  await assert.rejects(
    assertRemoteImportAssets(conflicted, { installedRoot }),
    /Referenced asset (needs Git integration|conflict)/,
  );
  assert.deepEqual(await readFile(installed), conflicting);
  await writeFile(installed, bytes);
  await assertRemoteImportAssets(
    await prepareRemoteImport(directory, { installedRoot }),
    { installedRoot },
  );
  assert.deepEqual(await readFile(managed), bytes);
});

test("remote-import rejects malformed, truncated and wrong-codec MP4 source bytes", async (t) => {
  const native = context.registry.byKey("demo:opengame-portal");
  const entry = {
    key: native.key,
    kind: native.kind,
    identifier: native.id,
    body: {
      title: native.title,
      summary: native.description,
      payload: structuredClone(native.data),
      attachments: structuredClone(
        adapterFor("demo").attachments(native, context.sources),
      ),
    },
  };
  const source = "media/showcase/opengame-portal.mp4";
  const bytes = await readFile(join("website/public", source));
  const replace = (type, mutate) => {
    const result = Buffer.from(bytes);
    const index = result.indexOf(type);
    assert.ok(index >= 4, `Native fixture must have ${type}`);
    mutate(result, index);
    return result;
  };
  const malformed = [
    Buffer.from("not an MP4"),
    await readFile("website/public/media/showcase/opengame-portal.webp"),
    bytes.subarray(0, bytes.length - 1),
    replace("ftyp", (b, i) => b.write("junk", i)),
    replace("avc1", (b, i) => b.write("hvc1", i)),
    replace("avcC", (b, i) => {
      b[i + 4] = 0;
    }),
    replace("hdlr", (b, i) => b.writeUInt32BE(8, i - 4)),
    replace("mdhd", (b, i) => b.writeUInt32BE(0, i + 16)),
    replace("stts", (b, i) => b.writeUInt32BE(0xffffffff, i + 8)),
  ];
  for (const invalid of malformed) {
    const { path: directory } = await packet([entry], () => {}, {
      [source]: invalid,
    });
    t.after(() => rm(directory, { recursive: true, force: true }));
    await assert.rejects(
      prepareRemoteImport(directory),
      /MP4|H\.264|AVC|duration|timing|box/,
    );
  }
});
