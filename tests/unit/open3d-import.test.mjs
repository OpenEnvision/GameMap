import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { loadContent } from "../../scripts/lib/content.mjs";
const raw = JSON.parse(
  await readFile("data/segments/open-3d-import.json", "utf8"),
);
const context = await loadContent();
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
  (mediaReview?.demos.records || []).map((row) => [row.id, row.demo]),
);

const entries = context.registry
  .all("example")
  .filter((e) => e.data.intake?.sha256 === raw.source.sha256);

test("provided XLSX/JSONL intake admits only 133 game/prototype rows without duplicating existing games", () => {
  assert.equal(raw.inputRecords.length, 192);
  assert.equal(raw.mappings.length, 133);
  assert.equal(new Set(raw.mappings.map((x) => x.inputId)).size, 133);
  assert.equal(raw.newExampleIds.length, 121);
  assert.equal(raw.excludedIds.length, 59);
  assert.equal(entries.length, 121);
  assert.deepEqual(
    new Set(entries.map((e) => e.id)),
    new Set(raw.newExampleIds),
  );
  for (const row of raw.inputRecords) {
    assert.equal(
      raw.mappings.some((x) => x.inputId === row.id),
      row.category === "游戏与游戏原型",
    );
  }
  assert.equal(
    raw.mappings.filter((x) => x.status === "existing-game-preserved").length,
    9,
  );
  assert.equal(
    raw.mappings.filter(
      (x) => x.status === "existing-threejs-record-reused-source-only",
    ).length,
    3,
  );
});

test("v4 source-only records cannot masquerade as verified playable builds and preserve v1/v2/v3 readers", () => {
  for (const entry of entries) {
    const data = entry.data;
    context.versionedContracts.example[4].payload.parse(data);
    if (verifiedDemos.has(entry.id))
      assert.deepEqual(data.demo, verifiedDemos.get(entry.id));
    else {
      assert.equal(data.demo.kind, "source");
      assert.equal(data.demo.url, data.source.url);
    }
    assert.equal(data.source.scope, "unverified-project");
    assert.equal(data.intake.dataset, "open_3d_games_2026-10-24.jsonl");
    assert.equal(
      data.intake.sha256,
      "d22d41a3b430c29b882952f090a058736323f182d543f589d49f4ef664b90a69",
    );
    assert.match(data.intake.verification, /not independently/);
    for (const version of [1, 2, 3])
      assert.throws(() =>
        context.versionedContracts.example[version].payload.parse(data),
      );
  }
  const data = structuredClone(entries[0].data);
  delete data.intake;
  assert.throws(() =>
    context.versionedContracts.example[4].payload.parse(data),
  );
  const wrong = structuredClone(entries[0].data);
  wrong.demo.kind = "source";
  wrong.demo.url = "https://example.org/not-the-source";
  assert.throws(() =>
    context.versionedContracts.example[4].payload.parse(wrong),
  );
  assert.ok(context.versionedContracts.example[1]);
  assert.ok(context.versionedContracts.example[2]);
  assert.ok(context.versionedContracts.example[3]);
});

test("import provenance and original caveats survive without private filepaths or Chinese copy in English payloads", () => {
  for (const entry of entries) {
    const row = raw.inputRecords.find((x) => x.id === entry.data.intake.rowId);
    assert.ok(row);
    const zh = context.translationCatalogs.zh.content[entry.key];
    assert.ok(zh.description.includes(row.description_zh));
    if (row.caveat_zh) assert.ok(zh.description.includes(row.caveat_zh));
    assert.doesNotMatch(
      JSON.stringify(entry.data),
      /\p{Script=Han}|\/Users\/|\/private\/var\//u,
    );
    assert.match(
      entry.data.source.note,
      /imported statements, not independent/,
    );
    const block = entry.blocks.find((x) => x.field === "intake");
    assert.ok(block);
  }
});
