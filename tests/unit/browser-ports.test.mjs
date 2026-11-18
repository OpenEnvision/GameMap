import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateDemoDecision } from "../../scripts/lib/round5-media.mjs";
import { loadContent } from "../../scripts/lib/content.mjs";
const context = await loadContent(),
  round4 = JSON.parse(
    await readFile("data/segments/open-3d-import-round4.json", "utf8"),
  ),
  ports = JSON.parse(
    await readFile("data/segments/browser-port-research.json", "utf8"),
  );
const mediaReview = await readFile(
  "data/segments/open-3d-round5-media.json",
  "utf8",
)
  .then(JSON.parse)
  .catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
const verifiedDemos = new Map(
  (mediaReview?.demos.records || []).map((row) => [row.id, row]),
);
const frozenBaselines = JSON.parse(
  await readFile("website/content/round5-media.config.json", "utf8"),
).baselineDemos;
test("fourth directory retains all 88 original rows and admits only 75 game/prototype identities", () => {
  assert.equal(round4.inputRecords.length, 88);
  assert.equal(round4.mappings.length, 75);
  assert.equal(round4.newExampleIds.length, 72);
  assert.equal(round4.excludedIds.length, 13);
  assert.equal(
    round4.source.sha256,
    "c71434ca7a69fa55bb28fcb3c9343621125453dd6e86fc0379265164ad6fd224",
  );
  for (const id of round4.newExampleIds) {
    const e = context.registry.require("example", id);
    context.versionedContracts.example[4].payload.parse(e.data);
    const decision = verifiedDemos.get(id);
    if (decision) {
      validateDemoDecision(decision, e.data);
      assert.deepEqual(e.data.demo, decision.demo);
      assert.equal(e.data.source.url, decision.sourceUrl);
      assert.equal(frozenBaselines[id]?.kind, "source");
      assert.equal(
        e.data.source.url,
        frozenBaselines[id].url,
        "Preserve the original source URL when upgrading a demo",
      );
    } else {
      assert.equal(e.data.demo.kind, "source");
      assert.equal(e.data.demo.url, e.data.source.url);
    }
    const original = round4.inputRecords.find(
      (row) => row.id === e.data.intake.rowId,
    );
    assert.ok(original, `Missing original intake row: ${id}`);
    assert.equal(e.data.source.url, original.repo_url);
    assert.equal(e.data.source.scope, "unverified-project");
    assert.ok(context.translationCatalogs.zh.content[e.key]?.description);
  }
});
test("append-only example v5 separates observed project pages from source and playable/download links", () => {
  assert.equal(context.contentKinds.example.schemaVersion, 8);
  for (const v of [1, 2, 3, 4, 5, 6, 7, 8])
    assert.ok(context.versionedContracts.example[v]);
  for (const id of ports.projectReferenceIds) {
    const e = context.registry.require("example", id),
      p = e.data;
    context.versionedContracts.example[5].payload.parse(p);
    assert.equal(p.demo.kind, "reference");
    assert.equal(p.source.scope, "project-reference");
    assert.equal(p.demo.url, p.source.url);
    assert.equal(p.demo.url, p.intake.homepage);
    for (const v of [1, 2, 3, 4])
      assert.equal(
        context.versionedContracts.example[v].payload.safeParse(p).success,
        false,
      );
    for (const mutate of [
      (q) => {
        q.source.scope = "complete-project";
      },
      (q) => {
        q.demo.url = "https://example.org/invented-game";
      },
      (q) => {
        delete q.intake;
      },
    ]) {
      const q = structuredClone(p);
      mutate(q);
      assert.equal(
        context.versionedContracts.example[5].payload.safeParse(q).success,
        false,
      );
    }
  }
});
test("25 browser references preserve technical, copyright, native and unavailable boundaries without treating a catalogue as a game", () => {
  assert.equal(ports.records.length, 25);
  assert.equal(ports.mappings.length, 25);
  assert.equal(ports.newExampleIds.length, 10);
  assert.equal(ports.sourceReferenceIds.length, 6);
  assert.equal(ports.projectReferenceIds.length, 4);
  assert.equal(
    ports.mappings.filter((m) => m.status === "research-candidate").length,
    14,
  );
  assert.equal(ports.collections.length, 1);
  for (const r of ports.records) assert.equal(r.notPlaytested, true);
  assert.equal(
    context.registry.require("example", "browser-port-12").data.title,
    "Urban Terror browser reference",
  );
  assert.match(
    context.registry.require("example", "browser-port-06").data.source.note,
    /experimental native|Windows/,
  );
  assert.match(
    context.registry.require("example", "browser-port-02").data.source.note,
    /original|owned/,
  );
  assert.match(
    context.registry.require("example", "browser-port-17").data.source.note,
    /complet|build/i,
  );
  for (const id of [
    "browser-port-01",
    "browser-port-04",
    "browser-port-09",
    "browser-port-24",
    "browser-port-25",
  ])
    assert.equal(context.registry.byKey("example:" + id), undefined);
  const collection = context.registry.require(
    "collection",
    "wasm-arcade-repository-catalogue",
  );
  assert.match(
    collection.data.description,
    /not a game|not.*verified launcher/,
  );
  assert.match(collection.data.description, /unconfirmed/);
});
