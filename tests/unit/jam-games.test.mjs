import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { loadContent } from "../../scripts/lib/content.mjs";
import { createImportBundle } from "../../scripts/lib/platform.mjs";
import { validateSelection } from "../../scripts/lib/catalog/validation.mjs";
import { digest } from "../../scripts/lib/catalog/codec.mjs";
import {
  repositoryIdentity,
  buildIdentity,
  validateJamRecord,
  mergeJamReports,
  jamExample,
} from "../../scripts/lib/jam-discovery.mjs";

const context = await loadContent();
const ledger = JSON.parse(
  await readFile("data/segments/jam-games.json", "utf8"),
);
const first = ledger.accepted[0];
const report = (rows) => ({
  source: "Test evidence fixture",
  accepted: rows,
  candidates: [],
  notes: [],
});

test("every admitted Jam game is registered as a first-class non-AI-required example with primary evidence", () => {
  assert.ok(ledger.accepted.length > 0);
  for (const row of ledger.accepted) {
    validateJamRecord(row);
    const entry = context.registry.require("example", row.id);
    assert.deepEqual(entry.data, jamExample(row));
    assert.equal(entry.data.category, "community");
    assert.equal(
      context.payloadSchemas.example.safeParse(entry.data).success,
      true,
    );
    assert.ok(entry.data.aiUse.includes(`Source checked ${row.checkedAt}.`));
    assert.ok(
      !context.sources.gameCaseAgents[row.id],
      "Do not invent AI attribution",
    );
  }
  assert.equal(
    new Set(ledger.accepted.map((row) => repositoryIdentity(row.repository)))
      .size,
    ledger.accepted.length,
  );
  assert.equal(
    new Set(ledger.accepted.map((row) => buildIdentity(row.gameUrl))).size,
    ledger.accepted.length,
  );
});

test("published discovery ledger exactly retains all accepted and deferred evidence", async () => {
  assert.equal(
    await readFile("website/public/jam-discovery.json", "utf8"),
    await readFile("data/segments/jam-games.json", "utf8"),
  );
  assert.ok(ledger.candidates.length > 0);
});

test("repository case, .git suffix, trailing slash and build tracking parameters deduplicate", () => {
  const same = {
    ...first,
    id: "jam-duplicate-fixture",
    repository:
      first.repository
        .toUpperCase()
        .replace("HTTPS://GITHUB.COM", "https://github.com") + ".git/",
  };
  assert.equal(
    mergeJamReports([report([first, same])], { checkedAt: first.checkedAt })
      .accepted.length,
    1,
  );
  const sameBuild = {
    ...first,
    id: "jam-different-repo",
    repository: "https://github.com/fixture/different",
    gameUrl:
      first.gameUrl +
      (first.gameUrl.includes("?") ? "&" : "?") +
      "utm_source=fixture#game",
  };
  // Evidence identity must match its repository even in a synthetic duplicate fixture.
  sameBuild.evidence = [
    {
      url: "https://github.com/fixture/different",
      claim: "fixture",
      quote: "fixture",
    },
    ...first.evidence,
  ];
  const merged = mergeJamReports([report([first, sameBuild])], {
    checkedAt: first.checkedAt,
  });
  assert.equal(merged.accepted.length, 1);
  assert.equal(merged.duplicates.length, 1);
});

test("existing examples and already linked research games are not reimported", () => {
  const merged = mergeJamReports([report([first])], {
    existingRepositories: [first.repository],
    checkedAt: first.checkedAt,
  });
  assert.equal(merged.accepted.length, 0);
  assert.equal(merged.duplicates.length, 1);
});

test("missing evidence and repository-only demos remain candidates instead of invented releases", () => {
  for (const change of [
    { evidence: [] },
    { gameUrl: first.repository },
    { commit: "made-up-sha" },
    { suggestedSteps: [] },
  ]) {
    const merged = mergeJamReports([report([{ ...first, ...change }])], {
      checkedAt: first.checkedAt,
    });
    assert.equal(merged.accepted.length, 0);
    assert.equal(merged.candidates.length, 1);
  }
});

test("deferred candidates deduplicate and leave the queue only after explicit accepted evidence", () => {
  const deferred = {
    source: "Deferred fixture",
    accepted: [],
    candidates: [
      { repository: first.repository, reason: "Missing release evidence" },
      { repository: first.repository, reason: "Repeated discovery" },
    ],
    notes: [],
  };
  const pending = mergeJamReports([deferred], { checkedAt: first.checkedAt });
  assert.equal(pending.candidates.length, 1);
  assert.equal(pending.accepted.length, 0);
  const promoted = mergeJamReports([deferred, report([first])], {
    checkedAt: first.checkedAt,
  });
  assert.equal(promoted.accepted.length, 1);
  assert.equal(promoted.candidates.length, 0);
  assert.deepEqual(
    promoted.accepted[0].reviewHistory,
    deferred.candidates.map(({ reason }) => ({
      reason,
      source: deferred.source,
    })),
  );
  const repeated = mergeJamReports(
    [
      { source: "Saved ledger", accepted: promoted.accepted, candidates: [] },
      deferred,
    ],
    { checkedAt: first.checkedAt },
  );
  assert.deepEqual(repeated.accepted, promoted.accepted);
});

test("candidate rechecks publish the latest reason while retaining deduplicated review history", () => {
  const earlier = {
    source: "Earlier scan",
    accepted: [],
    candidates: [
      { repository: first.repository, reason: "Archive exceeded download cap" },
    ],
    notes: [],
  };
  const latest = {
    source: "Source recheck",
    accepted: [],
    candidates: [
      {
        repository: first.repository,
        reason: "Source now read; no author-linked release found",
      },
    ],
    notes: [],
  };
  const merged = mergeJamReports([earlier, latest], {
    checkedAt: first.checkedAt,
  });
  assert.equal(merged.candidates.length, 1);
  assert.equal(merged.accepted.length, 0);
  assert.equal(merged.candidates[0].reason, latest.candidates[0].reason);
  assert.equal(merged.candidates[0].source, latest.source);
  assert.deepEqual(merged.candidates[0].reviewHistory, [
    { reason: earlier.candidates[0].reason, source: earlier.source },
  ]);
  const again = mergeJamReports(
    [
      { source: "Saved ledger", accepted: [], candidates: merged.candidates },
      latest,
    ],
    { checkedAt: first.checkedAt },
  );
  assert.deepEqual(again.candidates, merged.candidates);
  const revisited = mergeJamReports(
    [
      { source: "Saved ledger", accepted: [], candidates: merged.candidates },
      earlier,
    ],
    { checkedAt: first.checkedAt },
  );
  assert.deepEqual(revisited.candidates[0].reviewHistory, [
    { reason: latest.candidates[0].reason, source: latest.source },
  ]);
});

test("desktop download pages on itch, Steam and official sites are not restricted to GitHub releases", () => {
  for (const gameUrl of [
    "https://fixture.itch.io/desktop-game",
    "https://store.steampowered.com/app/999999/Fixture/",
    "https://games.example.org/download/",
  ]) {
    const row = { ...first, gameUrl, demoKind: "download" };
    assert.equal(validateJamRecord(row), row);
    assert.equal(jamExample(row).demo.kind, "download");
  }
  for (const gameUrl of [
    "https://github.com/fixture/game/blob/main/game.zip",
    "https://raw.githubusercontent.com/fixture/game/main/game.zip",
  ])
    assert.throws(
      () => validateJamRecord({ ...first, gameUrl, demoKind: "download" }),
      /not a released game/,
    );
});

test("non-Jam games and unknown licenses are retained without fabricated attribution", () => {
  const merged = mergeJamReports(
    [
      report([
        {
          ...first,
          jam: null,
          license: "unspecified",
          licenseUrl: null,
          assetLicense: "unknown",
          checkedAt: null,
        },
      ]),
    ],
    { checkedAt: first.checkedAt },
  );
  assert.equal(merged.accepted.length, 1);
  assert.match(merged.accepted[0].jam, /unverified/);
  assert.equal(merged.accepted[0].license, "unspecified");
});

test("community v3 is append-only: v1/v2 do not silently accept the new category or lose attachment requirements", () => {
  const example = jamExample(first);
  for (const version of [1, 2]) {
    assert.equal(
      context.versionedContracts.example[version].payload.safeParse(example)
        .success,
      false,
    );
    assert.equal(
      context.versionedContracts.example[version].attachments.safeParse({})
        .success,
      false,
    );
  }
  assert.equal(
    context.versionedContracts.example[3].payload.safeParse(example).success,
    true,
  );
  assert.equal(
    context.versionedContracts.example[3].attachments.safeParse({}).success,
    true,
  );
  assert.equal(context.contentKinds.example.schemaVersion, 8);
  assert.equal(
    context.versionedContracts.example[4].payload.safeParse(example).success,
    true,
  );
});

test("community examples survive release assembly without phantom media or model mappings", async () => {
  const bundle = await createImportBundle(context);
  // Deliberately remove attachments from an isolated fixture, even when production has a screenshot.
  const records = structuredClone(bundle.snapshot.entries);
  const row = records.find((row) => row.key === `example:${first.id}`);
  row.body.attachments = {};
  row.fingerprint = digest(row.body);
  const assembled = context.assembleSources(
    records,
    context.configurationFromSources(context.sources, context.registry.entries),
  );
  assert.equal(Object.hasOwn(assembled.sources.learningMedia, first.id), false);
  assert.equal(
    Object.hasOwn(assembled.sources.gameCaseAgents, first.id),
    false,
  );
  assert.deepEqual(
    context
      .createRegistry(assembled.sources, assembled.documents)
      .require("example", first.id).data,
    jamExample(first),
  );
});

test("installed v1/v2 validators retain their optional creator-evidence behavior", async () => {
  const bundle = await createImportBundle(context);
  const old = bundle.snapshot.entries.find(
    (row) =>
      row.kind === "example" &&
      context.versionedContracts.example[1].payload.safeParse(row.body.payload)
        .success &&
      context.versionedContracts.example[1].attachments.safeParse(
        row.body.attachments,
      ).success,
  );
  assert.ok(old);
  for (const version of [1, 2]) {
    const records = structuredClone(bundle.snapshot.entries);
    const row = records.find((row) => row.key === old.key);
    row.schema_version = version;
    delete row.body.payload.evidence;
    row.fingerprint = digest(row.body);
    assert.equal(
      context.versionedContracts.example[version].payload.safeParse(
        row.body.payload,
      ).success,
      true,
    );
    await validateSelection(context, records, []);
  }
});

test("the importer rejects unsafe bootstrap rather than bypassing the existing catalog", async () => {
  const before = await readFile("data/segments/jam-games.json", "utf8");
  const result = spawnSync(
    process.execPath,
    ["scripts/import/jam-games.mjs", "--bootstrap"],
    { encoding: "utf8" },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /must never bypass existing-game deduplication/);
  assert.equal(await readFile("data/segments/jam-games.json", "utf8"), before);
});

test("v3 does not let AI-attributed games bypass creator evidence and screenshot checks", async () => {
  const bundle = await createImportBundle(context);
  const row = structuredClone(
    bundle.snapshot.entries.find(
      (row) =>
        row.kind === "example" && row.body.payload.category !== "community",
    ),
  );
  row.body.attachments = {};
  row.fingerprint = digest(row.body);
  await assert.rejects(
    validateSelection(context, [row], []),
    /AI-attributed examples require/,
  );
});
