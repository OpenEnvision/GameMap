import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { accounts, studioFixture } from "../helpers/studio-fixture.mjs";
import { loadContent, loadContentRuntime } from "../../scripts/lib/content.mjs";
import {
  canonicalJSON,
  digest,
  sha256,
} from "../../scripts/lib/catalog/codec.mjs";
import { projectSnapshot } from "../../scripts/lib/catalog/projection.mjs";
import {
  readWorkingCatalog,
  createWorkingInput,
  stageWorkingInput,
} from "../../scripts/lib/catalog/development.mjs";
import {
  planSourceImport,
  preferGameplay,
  prepareMergeDrafts,
  recordFields,
  readMergeHistory,
  saveMergeDrafts,
} from "../../scripts/lib/catalog/source-import.mjs";
import { websiteEnvironment } from "../../scripts/lib/website-environment.mjs";

let fixture, editor, runtime, original, upload, resourceDraft, paperDraft;
const paper = {
  id: "database-working-paper",
  title: "Database-only working paper",
  description: "Unpublished test content.",
  authors: "Fixture author",
  year: 2026,
  publication: "Fixture publication",
  referenceType: "preprint",
  primaryRole: "build",
  roles: ["build"],
  topics: ["Fixture"],
  url: "https://example.org/working-paper",
  resourceIds: [],
  origins: [],
  citedSections: [],
  classification: "Test fixture.",
  access: {
    codeStatus: "unverified",
    repositories: [],
    projects: [],
    demos: [],
    reviewStatus: "unverified",
    checkedAt: "2026-10-20",
    evidence: [],
    notes: [],
  },
};
const save = async (body) => {
  const response = await fixture.request("/api/drafts", {
    session: editor,
    method: "POST",
    body,
  });
  const result = await response.json();
  assert.equal(response.status, 201, JSON.stringify(result));
  assert.equal(result.published, false);
  return result.id;
};
before(async () => {
  fixture = await studioFixture({ approved: false });
  editor = await fixture.login("editor");
  runtime = await loadContentRuntime();
  original = fixture.bundle.snapshot.entries.find(
    (record) => record.kind === "resource",
  );
  upload = await fixture.media.put(
    await sharp({
      create: {
        width: 24,
        height: 16,
        channels: 3,
        background: "#337766",
      },
    })
      .png()
      .toBuffer(),
  );
});
after(async () => fixture?.close());

test("working configuration is database-owned and available before the first publication", async () => {
  const current = await readWorkingCatalog(fixture.database, fixture.realm);
  assert.equal(
    current.records.length,
    fixture.bundle.snapshot.entries.filter((row) => row.owner === "database")
      .length,
  );
  assert.deepEqual(
    current.configuration.research,
    fixture.context.configurationFromSources(
      fixture.context.sources,
      fixture.context.registry.entries,
    ).research,
  );
  assert.ok(current.records.every((row) => row.state === "draft"));
  assert.ok(!Object.hasOwn(current.configuration, "archive"));
  await assert.rejects(
    fixture.database.anonymous((client) =>
      client.query("select catalog.source_configuration()"),
    ),
    /permission denied/i,
  );
  await assert.rejects(
    readWorkingCatalog(fixture.database, {
      ...fixture.realm,
      environment: "production",
    }),
    /local catalog/,
  );
});

test("Studio edits and database-only records feed the complete working registry without publication", async () => {
  const payload = {
    ...original.body.payload,
    name: "Database working resource",
    summary: "Database working summary.",
  };
  resourceDraft = await save({
    kind: original.kind,
    identifier: original.identifier,
    schemaVersion: original.schema_version,
    expectedHead: original.revision_id,
    payload,
    attachments: {
      ...original.body.attachments,
      projectMedia: {
        src: upload.path,
        alt: "Fixture pixels",
        source: "https://example.org/fixture",
        credit: "Fixture author",
        kind: "official-demo",
      },
    },
    translations: [
      {
        locale: "zh",
        field: "summary",
        value: "数据库工作副本。",
        source_hash: sha256(JSON.stringify(payload.summary)),
      },
    ],
  });
  paperDraft = await save({
    kind: "paper",
    identifier: paper.id,
    schemaVersion: fixture.context.contentKinds.paper.schemaVersion,
    expectedHead: null,
    payload: paper,
    attachments: {},
    translations: [],
  });
  const current = await readWorkingCatalog(fixture.database, fixture.realm);
  assert.equal(
    current.records.find((row) => row.key === original.key).revision_id,
    resourceDraft,
  );
  assert.equal(
    current.records.find((row) => row.key === `paper:${paper.id}`).revision_id,
    paperDraft,
  );
  const input = await createWorkingInput(runtime, current);
  const context = await loadContent("/", { input });
  assert.equal(context.inputMode, "database");
  assert.equal(context.registry.byKey(original.key).title, payload.name);
  assert.equal(
    context.localizedRegistry(context.registry, "zh").byKey(original.key)
      .description,
    "数据库工作副本。",
  );
  assert.ok(context.registry.byKey(`paper:${paper.id}`));
  assert.ok(
    context.staticPagePaths(context.registry).includes(`/papers/${paper.id}/`),
  );
  assert.match(
    context.searchFields(context.registry.byKey(`paper:${paper.id}`)),
    /Database-only working paper/,
  );
  assert.match(
    input.documentBodies["docs/reference/catalog.md"],
    /Database working resource/,
  );
  assert.ok(input.fallbackDocuments.includes("zh/reference/catalog"));
  assert.ok(
    !input.documents.some(
      (document) => document.slug === "zh/reference/catalog",
    ),
  );
  assert.ok(
    input.documents.some(
      (document) => document.slug === "zh/guides/reading-guide",
    ),
  );
  assert.ok(
    !context.inputs.some((path) =>
      /git-sources\.server|src\/data\/learningPaths|data\/segments/.test(path),
    ),
  );
  assert.ok(
    !context.registry
      .byKey(original.key)
      .description.includes(original.body.payload.summary),
  );
  assert.equal(
    (await fixture.pg.query("select release_id from catalog.deployment_state"))
      .rows[0].release_id,
    null,
  );
});

test("translation-only saves refresh the selected revision and absent translations stay absent", async () => {
  const before = await readWorkingCatalog(fixture.database, fixture.realm);
  await fixture.pg.query(
    "update catalog.translations set value = $2::jsonb where revision_id = $1 and locale='zh' and field='summary'",
    [resourceDraft, JSON.stringify("修改后的数据库译文。")],
  );
  const current = await readWorkingCatalog(fixture.database, fixture.realm);
  assert.deepEqual(current.records, before.records);
  assert.notDeepEqual(current.translations, before.translations);
  const input = await createWorkingInput(runtime, current);
  assert.equal(
    input.catalogs.zh.content[original.key].summary,
    "修改后的数据库译文。",
  );
  assert.deepEqual(Object.keys(input.catalogs.zh.content[original.key]), [
    "summary",
  ]);
  assert.equal(input.catalogs.zh.content[`paper:${paper.id}`], undefined);
});

test("working downloads and referenced uploads use the same database selection", async () => {
  const input = await createWorkingInput(
    runtime,
    await readWorkingCatalog(fixture.database, fixture.realm),
  );
  const directory = await mkdtemp(join(tmpdir(), "gamemap-working-input-"));
  try {
    await stageWorkingInput(input, (path) => fixture.media.readAsset(path), {
      inputPath: join(directory, "input.json"),
      publicDirectory: join(directory, "public"),
    });
    const resources = JSON.parse(
      await readFile(join(directory, "public/resources.json"), "utf8"),
    );
    assert.equal(
      resources.find((row) => row.id === original.identifier).name,
      "Database working resource",
    );
    assert.deepEqual(
      await readFile(join(directory, "public", upload.path)),
      (await fixture.media.get(upload.filename)).bytes,
    );
    assert.ok(input.publicPaths.includes(upload.path));
    assert.ok(input.publicPaths.includes("awesome-list.md"));
    assert.match(
      await readFile(join(directory, "public/awesome-list.md"), "utf8"),
      /Database working resource/,
    );
    const stored = JSON.parse(
      await readFile(join(directory, "input.json"), "utf8"),
    );
    assert.equal(stored.source.state, "working");
    assert.equal(stored.source.development, true);
    assert.ok(
      stored.records.every(
        (row) =>
          !Object.hasOwn(row, "review_note") &&
          !Object.hasOwn(row, "created_by"),
      ),
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("the working selection skips rejected revisions and local acceptance fixtures", async () => {
  const fixtureId = "local-runtime-fixture-0f0f0f0f";
  const base = fixture.bundle.snapshot.entries.find(
    (record) => record.kind === "resource" && record.key !== original.key,
  );
  await save({
    kind: "resource",
    identifier: fixtureId,
    schemaVersion: base.schema_version,
    expectedHead: null,
    payload: {
      ...base.body.payload,
      id: fixtureId,
      url: "https://example.org/acceptance-fixture",
    },
    attachments: base.body.attachments,
    translations: [],
  });
  const rejected = await save({
    kind: base.kind,
    identifier: base.identifier,
    schemaVersion: base.schema_version,
    expectedHead: base.revision_id,
    payload: { ...base.body.payload, name: "Rejected working name" },
    attachments: base.body.attachments,
    translations: [],
  });
  const reviewer = await fixture.login("reviewer");
  for (const [session, body] of [
    [editor, { action: "submit", ids: [rejected] }],
    [
      reviewer,
      { action: "reject", ids: [rejected], note: "Fixture rejection" },
    ],
  ]) {
    const response = await fixture.request("/api/review", {
      session,
      method: "POST",
      body,
    });
    assert.equal(response.status, 200, await response.text());
  }
  const current = await readWorkingCatalog(fixture.database, fixture.realm);
  assert.ok(!current.records.some((row) => row.identifier === fixtureId));
  const shown = current.records.find((row) => row.key === base.key);
  assert.equal(shown.revision_id, base.revision_id);
  assert.notEqual(shown.body.payload.name, "Rejected working name");
});

test("Git changes merge three ways: database edits are kept and same-field changes are reported", async () => {
  const resources = fixture.bundle.snapshot.entries.filter(
    (record) => record.kind === "resource" && record.key !== original.key,
  );
  const [fastForward, conflicting, withdrawn] = resources.slice(1, 4);
  const translations = (record) =>
    fixture.bundle.snapshot.translations
      .filter((row) => row.revision_id === record.revision_id)
      .map(({ revision_id: _revision, ...row }) => row);
  const databaseEdit = await save({
    kind: conflicting.kind,
    identifier: conflicting.identifier,
    schemaVersion: conflicting.schema_version,
    expectedHead: conflicting.revision_id,
    payload: { ...conflicting.body.payload, verified: "2026-10-01" },
    attachments: conflicting.body.attachments,
    translations: translations(conflicting),
  });
  const admin = await fixture.login("admin");
  const reviewer = await fixture.login("reviewer");
  for (const [session, body] of [
    [admin, { action: "submit", ids: [withdrawn.revision_id] }],
    [
      reviewer,
      {
        action: "reject",
        ids: [withdrawn.revision_id],
        note: "Fixture withdrawal",
      },
    ],
  ]) {
    const response = await fixture.request("/api/review", {
      session,
      method: "POST",
      body,
    });
    assert.equal(response.status, 200, await response.text());
  }
  const gitSnapshot = (verified) => {
    const archive = structuredClone(fixture.bundle.snapshot.archive);
    for (const row of archive.sources.resources)
      if (
        [original, fastForward, conflicting].some(
          (record) => record.identifier === row.id,
        )
      )
        row.verified = row.id === original.identifier ? verified : "2026-11-02";
    const source = archive.sources.learningPaths.find(
      (row) => row.category === "community",
    );
    archive.sources.learningPaths.push({
      ...source,
      id: "missing-source-example",
      title: "Missing source example",
    });
    return {
      ...fixture.bundle.snapshot,
      ...projectSnapshot(
        fixture.context,
        archive,
        fixture.context.runtimeTaxonomy,
        fixture.bundle.snapshot.artifacts,
      ),
    };
  };
  const plan = async (snapshot, bases) => {
    const current = await readWorkingCatalog(fixture.database, fixture.realm);
    const keys = current.records.map((row) => row.key);
    const result = planSourceImport(snapshot, current, {
      ...(await readMergeHistory(fixture.database, keys)),
      bases,
    });
    return { current, result };
  };
  const snapshot = gitSnapshot("2026-11-01");
  const { current, result } = await plan(snapshot, {});
  assert.deepEqual(
    result.additions.map((row) => row.key),
    ["example:missing-source-example"],
  );
  assert.ok(result.databaseOnly.includes(`paper:${paper.id}`));
  const merged = new Map(result.merges.map((row) => [row.key, row]));
  const changed = (merge) =>
    Object.keys(merge.merged)
      .filter(
        (name) =>
          JSON.stringify(merge.merged[name]) !==
          JSON.stringify(merge.database[name]),
      )
      .sort();
  assert.deepEqual(changed(merged.get(original.key)), ["payload.verified"]);
  assert.equal(
    merged.get(original.key).merged["payload.name"],
    "Database working resource",
  );
  assert.equal(
    merged.get(original.key).merged["payload.verified"],
    "2026-11-01",
  );
  assert.equal(
    merged.get(original.key).merged["translations.zh:summary"].value,
    "修改后的数据库译文。",
  );
  assert.deepEqual(changed(merged.get(fastForward.key)), ["payload.verified"]);
  assert.equal(
    result.conflicts.find((row) => row.key === withdrawn.key).reason,
    "Every database revision of this record was rejected",
  );
  const conflict = result.conflicts.find((row) => row.key === conflicting.key);
  assert.deepEqual(conflict.fields, [
    {
      field: "payload.verified",
      base: conflicting.body.payload.verified,
      database: "2026-10-01",
      git: "2026-11-02",
    },
  ]);
  assert.ok(!result.snapshot.entries.some((row) => row.owner === "git"));

  const { drafts, rejected } = prepareMergeDrafts(
    fixture.context,
    result.merges,
    new Map(current.records.map((row) => [row.key, row])),
  );
  assert.deepEqual(rejected, []);
  assert.deepEqual(
    drafts.map((draft) => [draft.key, draft.fromGit]).sort(),
    [
      [fastForward.key, ["payload.verified"]],
      [original.key, ["payload.verified"]],
    ].sort(),
  );
  await fixture.pg.query("select catalog.import_snapshot($1,$2)", [
    canonicalJSON(result.snapshot),
    digest(result.snapshot),
  ]);
  const saved = await saveMergeDrafts(
    fixture.database,
    accounts.admin.id,
    drafts,
  );
  assert.deepEqual(saved.failed, []);
  const stale = await saveMergeDrafts(
    fixture.database,
    accounts.admin.id,
    drafts,
  );
  assert.equal(stale.saved.length, 0);
  assert.ok(stale.failed.every((row) => /conflict/i.test(row.reason)));

  const after = await readWorkingCatalog(fixture.database, fixture.realm);
  const row = (key) => after.records.find((record) => record.key === key);
  assert.equal(row(original.key).state, "draft");
  assert.equal(
    row(original.key).body.payload.name,
    "Database working resource",
  );
  assert.equal(row(original.key).body.payload.verified, "2026-11-01");
  assert.ok(
    after.translations.some(
      (t) =>
        t.revision_id === row(original.key).revision_id &&
        t.value === "修改后的数据库译文。",
    ),
  );
  assert.equal(row(fastForward.key).body.payload.verified, "2026-11-02");
  assert.equal(row(conflicting.key).revision_id, databaseEdit);
  assert.equal(row("example:missing-source-example").state, "draft");
  assert.equal(row(`paper:${paper.id}`).revision_id, paperDraft);
  assert.equal(
    (await fixture.pg.query("select release_id from catalog.deployment_state"))
      .rows[0].release_id,
    null,
  );

  const bases = {};
  for (const item of [...result.unchanged, ...result.additions, ...saved.saved])
    bases[item.key] = { revision: item.revision, fields: item.fields };
  const repeated = (await plan(snapshot, bases)).result;
  assert.deepEqual(repeated.additions, []);
  assert.deepEqual(repeated.merges, []);
  assert.deepEqual(
    repeated.conflicts.map((item) => item.key).sort(),
    [conflicting.key, withdrawn.key].sort(),
  );

  const later = gitSnapshot("2026-11-15");
  const withBase = (await plan(later, bases)).result;
  assert.deepEqual(
    withBase.merges.map((item) => [item.key, changed(item)]),
    [[original.key, ["payload.verified"]]],
  );
  const withoutBase = (await plan(later, {})).result;
  assert.ok(withoutBase.conflicts.some((item) => item.key === original.key));

  const keepDatabase = new Map([[conflicting.key, "database"]]);
  const kept = (await plan(snapshot, bases)).result;
  const resolving = planSourceImport(
    snapshot,
    await readWorkingCatalog(fixture.database, fixture.realm),
    {
      ...(await readMergeHistory(
        fixture.database,
        after.records.map((row) => row.key),
      )),
      bases,
      resolutions: keepDatabase,
    },
  );
  assert.ok(kept.conflicts.some((item) => item.key === conflicting.key));
  assert.deepEqual(resolving.resolved, [
    { key: conflicting.key, side: "database", fields: ["payload.verified"] },
  ]);
  const settled = resolving.unchanged.find(
    (item) => item.key === conflicting.key,
  );
  assert.ok(settled, "Keeping database values needs no new revision");
  bases[conflicting.key] = {
    revision: settled.revision,
    fields: settled.fields,
  };
  assert.ok(
    !(await plan(snapshot, bases)).result.conflicts.some(
      (item) => item.key === conflicting.key,
    ),
    "A resolved conflict is not reported again",
  );
  const takeGit = (await plan(snapshot, {})).result;
  assert.ok(takeGit.conflicts.some((item) => item.key === conflicting.key));
  const choosingGit = planSourceImport(
    snapshot,
    await readWorkingCatalog(fixture.database, fixture.realm),
    {
      ...(await readMergeHistory(
        fixture.database,
        after.records.map((row) => row.key),
      )),
      resolutions: new Map([[conflicting.key, "git"]]),
    },
  );
  assert.equal(
    choosingGit.merges.find((item) => item.key === conflicting.key).merged[
      "payload.verified"
    ],
    "2026-11-02",
  );
});

test("translations lost by a successor save are reported and restored on request", async () => {
  // Earlier tests edit resources from the start of the list.
  const record = [...fixture.bundle.snapshot.entries]
    .reverse()
    .find(
      (row) =>
        row.kind === "resource" &&
        fixture.bundle.snapshot.translations.filter(
          (t) => t.revision_id === row.revision_id,
        ).length >= 2,
    );
  const current = await readWorkingCatalog(fixture.database, fixture.realm);
  const head = current.records.find((row) => row.key === record.key);
  // The Studio draft function, called directly: a successor saved without its translations.
  await fixture.database.user(accounts.editor.id, (client) =>
    client.query("select public.catalog_save_draft($1,$2,$3,$4,$5,$6,$7)", [
      record.kind,
      record.identifier,
      head.schema_version,
      head.canonical_path,
      head.collection_path,
      canonicalJSON(head.body),
      head.revision_id,
    ]),
  );
  const plan = async (restoreTranslations) => {
    const working = await readWorkingCatalog(fixture.database, fixture.realm);
    return planSourceImport(fixture.bundle.snapshot, working, {
      ...(await readMergeHistory(
        fixture.database,
        working.records.map((row) => row.key),
      )),
      restoreTranslations,
    });
  };
  const expected = fixture.bundle.snapshot.translations
    .filter((t) => t.revision_id === record.revision_id)
    .map((t) => `translations.${t.locale}:${t.field}`)
    .sort();
  const reported = await plan(false);
  assert.deepEqual(
    reported.missingTranslations
      .find((item) => item.key === record.key)
      .fields.sort(),
    expected,
  );
  assert.ok(!reported.merges.some((item) => item.key === record.key));
  const restoring = await plan(true);
  const merge = restoring.merges.find((item) => item.key === record.key);
  const { drafts, rejected } = prepareMergeDrafts(
    fixture.context,
    [merge],
    new Map(
      (await readWorkingCatalog(fixture.database, fixture.realm)).records.map(
        (row) => [row.key, row],
      ),
    ),
  );
  assert.deepEqual(rejected, []);
  assert.deepEqual(drafts[0].fromGit.sort(), expected);
  assert.deepEqual(drafts[0].body.payload, head.body.payload);
  assert.deepEqual(
    (await saveMergeDrafts(fixture.database, accounts.admin.id, drafts)).failed,
    [],
  );
  assert.ok(
    !(await plan(false)).missingTranslations.some(
      (item) => item.key === record.key,
    ),
  );
});

test("website subprocess settings exclude Studio credentials and explicit Git loading stays independent", async () => {
  const environment = websiteEnvironment({
    PATH: "/usr/bin",
    CATALOG_DATABASE_URL: "private",
    SUPABASE_SECRET_KEY: "private",
    VITE_SECRET: "private",
  });
  assert.deepEqual(environment, { PATH: "/usr/bin" });
  const git = await loadContent("/", { input: null });
  assert.equal(git.inputMode, "git");
  assert.equal(git.registry.byKey(`paper:${paper.id}`), undefined);
  assert.equal(git.registry.byKey(original.key).title, original.body.title);
});

test("gameplay media from Git supersedes a database fallback cover", () => {
  const schema = fixture.context.gameplayMediaSchema;
  const legacy = {
    src: "media/gameplay/test.webp",
    alt: "Reviewed gameplay.",
    caption: "Reviewed frame.",
    sourceUrl: "https://example.org/game",
    origin: "creator-screenshot",
    width: 1280,
    height: 720,
  };
  const asset = {
    src: "media/gameplay/test.png",
    sha256: "a".repeat(64),
    bytes: 100,
    width: 1600,
    height: 900,
    format: "png",
  };
  const complete = {
    ...legacy,
    sha256: "b".repeat(64),
    bytes: 80,
    original: asset,
    frame: { ...asset },
    provenance: {
      src: "media/gameplay/test.json",
      sha256: "c".repeat(64),
      bytes: 300,
    },
    reviewedAt: "2026-10-25",
    rights: "Underlying rights retained; no reuse permission inferred.",
    localizations: {
      zh: {
        alt: "游戏画面。",
        caption: "已审阅的画面。",
        sourceHash: sha256(
          JSON.stringify({ alt: legacy.alt, caption: legacy.caption }),
        ),
      },
    },
  };
  const cover = { src: "media/page-covers/fixture.webp" };
  assert.ok(schema.safeParse(complete).success);
  assert.ok(!schema.safeParse(legacy).success);
  assert.deepEqual(
    preferGameplay({ learningMedia: legacy, pageCover: cover }, schema),
    {
      attachments: { learningMedia: legacy },
      cover: "removed",
    },
  );
  assert.deepEqual(
    preferGameplay({ learningMedia: complete, pageCover: cover }, schema),
    {
      attachments: { learningMedia: complete, archivedPageCover: cover },
      cover: "archived",
    },
  );
  assert.deepEqual(preferGameplay({ pageCover: cover }, schema), {
    attachments: { pageCover: cover },
  });
});

test("merges keep the stored identity and reject content that would move it", async () => {
  const current = await readWorkingCatalog(fixture.database, fixture.realm);
  const step = current.records.find((row) => row.kind === "step");
  const database = recordFields(step.body);
  const merge = (payload) => ({
    key: step.key,
    kind: step.kind,
    identifier: step.identifier,
    schemaVersion: step.schema_version,
    expectedHead: step.revision_id,
    database,
    merged: recordFields({ ...step.body, payload }),
    git: database,
  });
  // An entry stored under an earlier collection address keeps that address.
  const stored = new Map([[step.key, { ...step, collection_path: "/paths/" }]]);
  const kept = prepareMergeDrafts(
    fixture.context,
    [merge({ ...step.body.payload, description: "Merged description." })],
    stored,
  );
  assert.deepEqual(kept.rejected, []);
  assert.equal(kept.drafts[0].path, step.canonical_path);
  assert.equal(kept.drafts[0].collectionPath, "/paths/");
  const other = ["2d", "3d", "world"].find(
    (track) => track !== step.body.payload.track,
  );
  const moved = prepareMergeDrafts(
    fixture.context,
    [merge({ ...step.body.payload, track: other })],
    stored,
  );
  assert.deepEqual(moved.drafts, []);
  assert.match(moved.rejected[0].reason, /moves the stable address/);
});
