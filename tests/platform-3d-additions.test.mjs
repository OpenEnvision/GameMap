import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { loadContent } from "../scripts/lib/content.mjs";
import { normalizePr63Game } from "../scripts/lib/pr63-intake.mjs";
const archiveAvailable = await stat("collections/threejs-games")
  .then(() => true)
  .catch((error) => { if (error.code === "ENOENT") return false; throw error; });
const read = async (p) => JSON.parse(await readFile(p, "utf8")),
  context = await loadContent(),
  pr = await read("config/pr63-source-intake.json"),
  raw = archiveAvailable ? await read("collections/threejs-games/games.json") : null,
  queue = archiveAvailable ? await read("collections/threejs-games/candidates.json") : null,
  r2 = await read("data/segments/open-3d-import-round2.json"),
  r3 = await read("data/segments/open-3d-import-round3.json"),
  itch = await read("data/segments/itch-3d-import.json");

test("pinned import policy stays versioned independently of the optional local archive", () => {
  assert.equal(pr.head, "409260b610f46f11a857b78b96a89879728d350a");
  assert.equal(pr.oldIds.length, 92);
  assert.equal(pr.newThreejsIds.length, 26);
  assert.equal(context.registry.all("threejs-game").length, 0, "Git defaults never auto-import database-owned PR records");
});

test("pinned PR preserves all upstream resources and canonical ownership rather than duplicating games", {
  skip: archiveAvailable ? false : "Optional ignored collections/ archive is not present",
}, async () => {
  assert.equal(pr.head, "409260b610f46f11a857b78b96a89879728d350a");
  assert.equal(raw.games.length, 120);
  assert.equal(pr.oldIds.length, 92);
  assert.equal(pr.newThreejsIds.length, 26);
  assert.equal(queue.candidates.length, 71);
  assert.equal(
    queue.candidates.filter((x) => x.status === "pending").length,
    44,
  );
  assert.equal(
    queue.candidates.filter((x) => x.status === "excluded").length,
    27,
  );
  for (const f of pr.mirroredFiles)
    assert.equal(
      createHash("sha256")
        .update(await readFile(f.path))
        .digest("hex"),
      f.sha256,
      "Pinned source changed " + f.path,
    );
  for (const g of raw.games) context.payloadSchemas["threejs-game"].parse(g);
  assert.equal(context.registry.all("threejs-game").length, 0, "Git defaults never auto-import database-owned PR records");
  for (const id of pr.oldIds) { const game = raw.games.find(g => g.id === id); assert.deepEqual(normalizePr63Game(game, pr), game); }
  for (const id of pr.newThreejsIds) {
    const game = normalizePr63Game(raw.games.find(g => g.id === id), pr);
    context.versionedContracts["threejs-game"][1].payload.parse(game);
    assert.doesNotMatch(JSON.stringify(game), /chatgpt\.site/i, 'Do not publish a general/2D hosting URL as the FPS edition');
    assert.ok(game.limitations.includes(pr.qualification + " Pinned source: " + pr.pullRequest + " at " + pr.head));
  }
  assert.equal(normalizePr63Game(raw.games.find(g => g.id === "ashen-ring"), pr).name, "Ashen Ring");
  assert.equal(raw.games.find(g => g.id === "ashen-ring").name, "灰烬王冠 — Ashen Ring");
});

test("second and third supplied directories remain separate, complete and deduplicated across PR and prior games", () => {
  for (const [data, rows, games, added] of [
    [r2, 117, 95, 87],
    [r3, 115, 96, 92],
  ]) {
    assert.equal(data.inputRecords.length, rows);
    assert.equal(data.mappings.length, games);
    assert.equal(data.newExampleIds.length, added);
    assert.equal(data.excludedIds.length, rows - games);
    for (const row of data.inputRecords)
      assert.equal(
        data.mappings.some((m) => m.inputId === row.id),
        row.category === "游戏与游戏原型",
      );
  }
  assert.equal(
    r2.mappings.find((m) => m.inputId === "island-escape-3d-the-lost-treasure")
      .key,
    "threejs-game:island-escape-lost-treasure",
  );
  const ids = [...r2.newExampleIds, ...r3.newExampleIds, ...itch.newExampleIds];
  assert.equal(new Set(ids).size, 232);
  for (const id of ids) {
    const e = context.registry.require("example", id);
    context.versionedContracts.example[4].payload.parse(e.data);
    assert.equal(e.data.demo.kind, "source");
    assert.equal(e.data.demo.url, e.data.source.url);
    assert.equal(e.data.source.scope, "unverified-project");
    assert.match(e.data.intake.verification, /not independently/);
    assert.doesNotMatch(
      JSON.stringify(e.data),
      /\p{Script=Han}|\/Users\/|\/var\/folders\//u,
    );
    assert.ok(context.translationCatalogs.zh.content[e.key]?.description);
  }
});

test("itch intake keeps all 145 originals, excludes original-data engines and folds related ports without hiding rights restrictions", () => {
  assert.equal(itch.suppliedDirectory.games.length, 145);
  assert.equal(itch.mappings.length, 145);
  assert.equal(itch.newExampleIds.length, 53);
  assert.equal(
    itch.source.sha256,
    "456fd40b4d667270c10d797186da74b8d141f273f3b8d18aea3a492cdd26f6e9",
  );
  assert.equal(itch.mappings.filter((m) => m.key).length, 83);
  const mapping = (id) => itch.mappings.find((m) => m.inputId === id);
  assert.equal(mapping("G007").key, mapping("G008").key);
  assert.match(mapping("G024").rationale, /port/);
  assert.match(mapping("G051").rationale, /recreation/);
  assert.equal(mapping("G140").status, "candidate-original-data-required");
  assert.equal(mapping("G140").key, undefined);
  assert.equal(mapping("G145").key, undefined);
  assert.match(
    context.registry.require("example", "itch3d-g128").data.source.note,
    /All rights reserved/,
  );
  assert.match(
    context.registry.require("example", "itch3d-g128").data.source.note,
    /written permission/,
  );
  assert.match(
    context.registry.require("example", "itch3d-g138").data.source.note,
    /personal noncommercial/,
  );
  assert.match(
    context.registry.require("example", "itch3d-g118").data.source.note,
    /unfinished sandbox/,
  );
  assert.equal(itch.research.pagesFetched, 12);
  assert.ok(itch.research.evidence.some((e) => e.inputId === "G118"));
});
