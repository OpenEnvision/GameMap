import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { loadContent } from "../../scripts/lib/content.mjs";
const context = await loadContent(),
  raw = JSON.parse(
    await readFile("data/segments/open-3d-import-round5.json", "utf8"),
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
  (mediaReview?.demos.records || []).map((row) => [row.id, row.demo]),
);
const entries = context.registry
  .all("example")
  .filter((entry) => entry.data.intake?.sha256 === raw.source.sha256);
const rowFor = (entry) =>
  raw.inputRecords.find((row) => row.id === entry.data.intake.rowId);

test("the AI game list keeps all 411 supplied rows and imports only new, reachable repositories", () => {
  assert.equal(raw.source.collectionRound, 5);
  assert.equal(raw.source.companion.filename, "AI游戏扩充清单_411条.html");
  assert.equal(raw.inputRecords.length, 411);
  assert.deepEqual(
    raw.inputRecords.map((row) => row.supplied_number),
    Array.from({ length: 411 }, (_, index) => index + 1),
  );
  assert.equal(raw.newExampleIds.length, 391);
  assert.equal(entries.length, 391);
  assert.deepEqual(
    new Set(entries.map((entry) => entry.id)),
    new Set(raw.newExampleIds),
  );
  // Unreachable repositories stay in the evidence ledger but are not admitted.
  assert.equal(raw.excludedIds.length, 1);
  for (const id of raw.excludedIds)
    assert.match(
      raw.inputRecords.find((row) => row.id === id).exclusion_reason,
      /GitHub returned 404/,
    );
  // Rows already in the catalog map to their existing record instead of a duplicate.
  const preserved = raw.mappings.filter(
    (mapping) => mapping.status === "existing-game-preserved",
  );
  assert.equal(preserved.length, 19);
  for (const mapping of preserved) {
    assert.ok(context.registry.byKey(mapping.key), mapping.key);
    assert.ok(!raw.newExampleIds.includes(mapping.key.slice(8)));
  }
  assert.equal(raw.mappings.length, 410);
});

test("imported AI list games remain source-only unless a reviewed demo ledger verifies an upgrade", () => {
  const latest = context.contentKinds.example.schemaVersion;
  for (const entry of entries) {
    const data = entry.data;
    context.versionedContracts.example[latest].payload.parse(data);
    if (verifiedDemos.has(entry.id))
      assert.deepEqual(data.demo, verifiedDemos.get(entry.id));
    else {
      assert.equal(data.demo.kind, "source");
      assert.equal(data.demo.url, data.source.url);
    }
    assert.equal(data.source.scope, "unverified-project");
    assert.equal(data.category, "community");
    assert.equal(data.intake.dataset, "ai_3d_game_list_round5.jsonl");
    assert.match(data.source.note, /^GitHub license check: /);
    assert.doesNotMatch(
      [data.title, data.description, data.engine, data.aiUse].join(" "),
      /\p{Script=Han}/u,
    );
    const zh = context.translationCatalogs.zh.content[entry.key];
    assert.ok(zh?.description?.trim(), entry.key);
    assert.ok(zh?.aiUse?.trim(), entry.key);
  }
});

test("model attribution repeats only what the checked README states", () => {
  for (const entry of entries) {
    const row = rowFor(entry),
      aiUse = entry.data.aiUse;
    const mentioned = Object.values(row.model_mentions).flat();
    if (row.group_confirmed === true)
      assert.match(aiUse, /mentions .+ \(GitHub check, 2026-11-19\)/);
    else if (row.group_confirmed === false)
      assert.match(aiUse, /does not name that model/);
    if (!mentioned.length) {
      assert.doesNotMatch(aiUse, /mentions /);
      assert.match(aiUse, /does not name that model|names no AI model/);
    } else
      for (const term of aiUse
        .match(/mentions ([^()]+?)(?: \(GitHub check|\))/)?.[1]
        .split(/, | and /) || [])
        assert.ok(mentioned.includes(term), `${entry.key}: ${term}`);
    assert.equal(context.sources.gameCaseAgents[entry.id], undefined);
  }
});

test("repository identity includes the subdirectory, so one repository can hold several games", () => {
  const sources = entries.map((entry) => entry.data.source.url);
  assert.equal(new Set(sources).size, sources.length);
  const benchPortal = entries.filter((entry) =>
    entry.data.source.url.startsWith(
      "https://github.com/alesha-pro/bench-portal/",
    ),
  );
  assert.equal(benchPortal.length, 5);
});
