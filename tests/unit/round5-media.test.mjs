import test from "node:test";
import assert from "node:assert/strict";
import {
  validateMediaLedger,
  validateDemoDecision,
  applyVerifiedDemos,
} from "../../scripts/lib/round5-media.mjs";
const entry = {
  id: "fixture-game",
  title: "Fixture",
  source: { url: "https://github.com/author/game" },
  demo: { kind: "source", url: "https://github.com/author/game" },
};
const sources = [
  {
    url: entry.source.url,
    checkedAt: "2026-11-18",
    result: "Fixture test evidence, not a real project review.",
  },
];
const demo = () => ({
  id: entry.id,
  sourceUrl: entry.source.url,
  demo: {
    kind: "playable",
    url: "https://author.github.io/game/",
    label: "Open game",
    note: "Fixture rendered in a sandbox browser; no full playtest claimed.",
  },
  checkedSources: sources,
  evidence: {
    authorPublicationUrl: entry.source.url,
    authorVerification: "Fixture README links the same author's Pages build.",
    reviewedAt: "2026-11-18",
    browserSandbox: true,
    renderedGame: true,
    loadedUrl: "https://author.github.io/game/",
    visualFinding: "Fixture player and game board visible.",
    inputActions: [],
  },
});
const ledger = () => ({
  version: 1,
  policy: "Synthetic validation fixture only; never published.",
  scopeIds: [entry.id],
  records: [],
  missing: [
    {
      id: entry.id,
      status: "research-incomplete",
      reason: "Fixture lacks accepted game pixels.",
      checkedSources: sources,
    },
  ],
  demos: {
    records: [],
    missing: [
      {
        id: entry.id,
        status: "research-incomplete",
        reason: "Fixture release unverified.",
        checkedSources: sources,
      },
    ],
  },
});
const validate = (value) => validateMediaLedger(value, [entry], [entry.id]);

test("complete media and demo partitions require actual checked-source descriptions", () => {
  assert.equal(validate(ledger()).scopeIds.length, 1);
  const bad = ledger();
  bad.missing = [];
  assert.throws(() => validate(bad), /Incomplete screenshot/);
  const duplicate = ledger();
  duplicate.missing.push(duplicate.missing[0]);
  assert.throws(() => validate(duplicate), /Duplicate/);
  const unexplained = ledger();
  unexplained.missing[0].reason = " ";
  assert.throws(() => validate(unexplained), /reason/);
  const unchecked = ledger();
  unchecked.missing[0].checkedSources = [];
  assert.throws(() => validate(unchecked), /Checked sources/);
  assert.throws(() => validateMediaLedger(ledger(), [entry], []), /scope/);
});

test("playable requires author evidence and sandboxed rendered gameplay", () => {
  validateDemoDecision(demo(), entry);
  for (const field of ["browserSandbox", "renderedGame"]) {
    const bad = demo();
    bad.evidence[field] = false;
    assert.throws(() => validateDemoDecision(bad, entry));
  }
  const landing = demo();
  landing.evidence.loadedUrl = entry.source.url;
  assert.throws(() => validateDemoDecision(landing, entry));
  const source = demo();
  source.demo.url = entry.source.url;
  assert.throws(() => validateDemoDecision(source, entry), /source URL/);
  const output = applyVerifiedDemos([entry], [demo()]);
  assert.deepEqual(output[0].source, entry.source);
  assert.equal(entry.demo.kind, "source");
  assert.equal(output[0].demo.kind, "playable");
});

test("downloads require named binaries, never repository archives", () => {
  const row = demo();
  row.demo.kind = "download";
  row.demo.url = "https://github.com/author/game/releases/tag/v1";
  row.evidence.binaryRelease = true;
  row.evidence.binaryVerification =
    "Fixture release labels this archive as the Windows game distribution.";
  row.evidence.assets = [
    {
      name: "game.zip",
      kind: "game-binary",
      platform: "Windows",
      url: "https://github.com/author/game/releases/download/v1/game.zip",
    },
  ];
  validateDemoDecision(row, entry);
  for (const name of [
    "trailer.mp4",
    "preview.gif",
    "manual.pdf",
    "scene.glb",
    "texture.png",
  ]) {
    row.evidence.assets[0].name = name;
    assert.throws(() => validateDemoDecision(row, entry));
  }
  row.evidence.assets[0].name = "game.zip";
  row.demo.url = "https://github.com/author/game/archive/main.zip";
  assert.throws(() => validateDemoDecision(row, entry));
  row.demo.url = "https://github.com/author/game/releases/tag/v1";
  row.evidence.assets[0].name = "Source code (zip)";
  assert.throws(() => validateDemoDecision(row, entry));
});

test("creator and browser images have distinct attribution and dates", () => {
  const value = ledger();
  value.missing = [];
  value.records = [
    {
      id: entry.id,
      title: entry.title,
      media: {
        src: `media/learning/${entry.id}.webp`,
        alt: "Fixture player on a board.",
        caption: "Creator-published fixture game frame.",
        origin: "creator-screenshot",
        sourceUrl: entry.source.url,
        originalImageUrl:
          "https://raw.githubusercontent.com/author/game/main/frame.png",
        reviewedAt: "2026-11-18",
        width: 1280,
        height: 720,
      },
      evidence: {
        sourceFrameSHA256: "a".repeat(64),
        originalSHA256: "c".repeat(64),
        visualFinding: "Fixture gameplay is visible.",
      },
      processing: {
        fit: "contain",
        width: 1280,
        height: 720,
        crop: false,
        generatedSceneContent: false,
      },
      bytes: 1000,
      sha256: "b".repeat(64),
      rights: "Rights remain with the creator; no reuse permission.",
    },
  ];
  validate(value);
  const originalHash = value.records[0].evidence.originalSHA256;
  delete value.records[0].evidence.originalSHA256;
  assert.throws(() => validate(value));
  value.records[0].evidence.originalSHA256 = originalHash;
  const frameHash = value.records[0].evidence.sourceFrameSHA256;
  value.records[0].evidence.sourceFrameSHA256 = "not-a-hash";
  assert.throws(() => validate(value));
  value.records[0].evidence.sourceFrameSHA256 = frameHash;
  value.records[0].media.capturedAt = "2026-11-18T12:00:00Z";
  assert.throws(() => validate(value));
  delete value.records[0].media.capturedAt;
  value.records[0].media.origin = "browser-capture";
  assert.throws(() => validate(value));
  const row = value.records[0];
  row.media.sourceUrl = demo().demo.url;
  row.media.capturedAt = "2026-11-18T12:00:00Z";
  delete row.media.reviewedAt;
  delete row.media.originalImageUrl;
  row.evidence.browserSandbox = true;
  row.evidence.inputActions = ["Clicked Start once."];
  value.demos.records = [demo()];
  value.demos.missing = [];
  validate(value);
  row.processing.crop = true;
  assert.throws(() => validate(value));
});

// This integration check becomes active only after the first genuine complete import.
// Fixture-only development must never manufacture a published missing-item ledger.
const { readFile } = await import("node:fs/promises");
const published = await readFile(
  "data/segments/open-3d-round5-media.json",
  "utf8",
).catch((error) => {
  if (error.code === "ENOENT") return null;
  throw error;
});
test(
  "published expanded review covers all 867 requested games and genuine image bytes",
  {
    skip:
      published === null
        ? "No completed real review ledger has been published yet"
        : false,
  },
  async () => {
    const { loadContent } = await import("../../scripts/lib/content.mjs");
    const { createHash } = await import("node:crypto");
    const { default: sharp } = await import("sharp");
    const context = await loadContent();
    const review = JSON.parse(published);
    const examples = context.registry
      .all("example")
      .map((row) => ({ id: row.id, ...row.data }));
    assert.equal(review.scopeIds.length, 867);
    const intake = JSON.parse(
      await readFile("data/segments/open-3d-import-round5.json", "utf8"),
    );
    assert.ok(intake.newExampleIds.every((id) => review.scopeIds.includes(id)));
    const frozen = JSON.parse(
      await readFile("website/content/round5-media.config.json", "utf8"),
    );
    validateMediaLedger(review, examples, [
      ...frozen.round5Ids,
      ...frozen.priorMissingIds,
    ]);
    assert.equal(
      await readFile(
        "website/public/open-3d-round5-media-sources.json",
        "utf8",
      ),
      published,
    );
    for (const decision of review.demos.records)
      assert.deepEqual(
        context.registry.require("example", decision.id).data.demo,
        decision.demo,
      );
    for (const row of review.records) {
      assert.deepEqual(context.sources.learningMedia[row.id], row.media);
      const bytes = await readFile("website/public/" + row.media.src);
      const meta = await sharp(bytes).metadata();
      assert.equal(meta.format, "webp");
      assert.equal(meta.width, 1280);
      assert.equal(meta.height, 720);
      assert.equal(bytes.length, row.bytes);
      assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        row.sha256,
      );
    }
  },
);

test("demo regeneration changes only verified demo fields and never evaluates module text", async () => {
  const { renderVerifiedDemoModule } =
    await import("../../scripts/lib/round5-media.mjs");
  const prefix =
    'import type { LearningPath } from "./learningTypes";\nexport const fixtureGames: LearningPath[] = ';
  const source = prefix + JSON.stringify([entry], null, 2) + ";\n";
  const rendered = renderVerifiedDemoModule(source, "fixtureGames", [demo()]);
  const data = JSON.parse(
    rendered.source.slice(prefix.length).trim().slice(0, -1),
  );
  assert.deepEqual(data[0], { ...entry, demo: demo().demo });
  assert.deepEqual(rendered.handled, [entry.id]);
  assert.equal(
    renderVerifiedDemoModule(source, "fixtureGames", []).source,
    source,
  );
  assert.throws(() =>
    renderVerifiedDemoModule(
      source + 'throw new Error("never execute");',
      "fixtureGames",
      [],
    ),
  );
  for (const name of [
    "open3dGames",
    "open3dRound2Games",
    "open3dRound3Games",
    "open3dRound4Games",
    "open3dRound5Games",
    "itch3dGames",
    "browserPortGames",
    "jamGames",
  ]) {
    const original = await readFile(`website/src/data/${name}.ts`, "utf8");
    assert.equal(renderVerifiedDemoModule(original, name, []).source, original);
  }
});

test("frozen scope preserves the 391 source intake IDs and 476 earlier missing IDs", async () => {
  const frozen = JSON.parse(
    await readFile("website/content/round5-media.config.json", "utf8"),
  );
  const intake = JSON.parse(
    await readFile("data/segments/open-3d-import-round5.json", "utf8"),
  );
  assert.deepEqual(frozen.round5Ids, intake.newExampleIds);
  assert.equal(frozen.round5Ids.length, 391);
  assert.equal(Object.keys(frozen.baselineDemos).length, 867);
  for (const id of frozen.round5Ids)
    assert.equal(frozen.baselineDemos[id].kind, "source");
  assert.equal(frozen.priorMissingIds.length, 476);
  assert.equal(
    new Set([...frozen.round5Ids, ...frozen.priorMissingIds]).size,
    867,
  );
});

test("itch publication labels require upload identity and explicit platform evidence", () => {
  const row = demo();
  row.demo.kind = "download";
  row.demo.url = "https://author.itch.io/game";
  Object.assign(row.evidence, {
    binaryRelease: true,
    binaryVerification:
      "Fixture author publishes a Windows game upload, not the separate project source.",
    assets: [
      {
        name: "Game: Windows",
        url: row.demo.url,
        kind: "game-binary",
        platform: "Windows",
        publicationLabel: true,
        uploadId: "123456",
        platformEvidence: "Download for Windows",
      },
    ],
  });
  validateDemoDecision(row, entry);
  const itchEntry = { ...entry, source: { url: row.demo.url } };
  validateDemoDecision({ ...row, sourceUrl: row.demo.url }, itchEntry);
  row.evidence.assets[0].uploadId = "";
  assert.throws(() => validateDemoDecision(row, entry));
  row.evidence.assets[0].uploadId = "123456";
  row.evidence.assets[0].platformEvidence = "Windows";
  assert.throws(() => validateDemoDecision(row, entry));
  row.evidence.assets[0].platformEvidence = "Download for Windows";
  row.evidence.assets[0].name = "Godot Project";
  assert.throws(() => validateDemoDecision(row, entry));
});

test("scoped replay restores withdrawn decisions while preserving baseline and outsiders", async () => {
  const {
    applyScopedDemoLedger,
    renderVerifiedDemoModule,
    excludeMigratedLegacyGaps,
  } = await import("../../scripts/lib/round5-media.mjs");
  const prior = {
    ...entry,
    id: "prior-game",
    demo: {
      kind: "playable",
      label: "Existing game",
      url: "https://author.itch.io/prior",
      note: "Pre-existing author game link.",
    },
  };
  const outsider = {
    ...entry,
    id: "outside-game",
    demo: {
      kind: "download",
      label: "Keep external change",
      url: "https://example.com/game.zip",
      note: "Not owned by this task.",
    },
  };
  const baselineDemos = {
    [entry.id]: structuredClone(entry.demo),
    [prior.id]: structuredClone(prior.demo),
  };
  const scopeIds = [entry.id, prior.id],
    original = [entry, prior, outsider];
  const upgraded = applyScopedDemoLedger(
    original,
    { scopeIds, demos: { records: [demo()] } },
    baselineDemos,
  );
  assert.equal(upgraded[0].demo.kind, "playable");
  const restored = applyScopedDemoLedger(
    upgraded,
    { scopeIds, demos: { records: [] } },
    baselineDemos,
  );
  assert.deepEqual(restored, original);
  assert.strictEqual(restored[2], outsider);
  const prefix = "export const fixtureGames: LearningPath[] = ";
  const source = prefix + JSON.stringify(upgraded, null, 2) + ";\n";
  const result = renderVerifiedDemoModule(source, "fixtureGames", [], {
    scopeIds,
    baselineDemos,
  });
  assert.equal(result.changed, true);
  assert.deepEqual(result.handled, []);
  assert.deepEqual(
    JSON.parse(result.source.slice(prefix.length).trim().slice(0, -1)),
    original,
  );
  assert.throws(
    () =>
      applyScopedDemoLedger(
        original,
        { scopeIds: [], demos: { records: [demo()] } },
        baselineDemos,
      ),
    /outside owned scope/,
  );
  assert.throws(
    () =>
      applyScopedDemoLedger(original, { scopeIds, demos: { records: [] } }, {}),
    /Missing frozen/,
  );
  const previous = {
    scopeIds: ["kept-image", "migrated-gap", "unrelated-gap"],
    records: [{ id: "kept-image" }],
    missing: [{ id: "migrated-gap" }, { id: "unrelated-gap" }],
  };
  const clean = excludeMigratedLegacyGaps(previous, ["migrated-gap"]);
  assert.deepEqual(clean.scopeIds, ["kept-image", "unrelated-gap"]);
  assert.deepEqual(clean.records, previous.records);
  assert.deepEqual(clean.missing, [{ id: "unrelated-gap" }]);
  assert.deepEqual(excludeMigratedLegacyGaps(clean, ["migrated-gap"]), clean);
});

test("missing outcomes require explicit truthful classification", () => {
  for (const status of [undefined, "blocked", "unknown", "accepted"]) {
    const value = ledger();
    value.missing[0].status = status;
    assert.throws(() => validate(value), /status required/);
  }
  const confirmed = ledger();
  confirmed.missing[0].status = "missing";
  validate(confirmed);
});

test("legacy importer dry replay ignores migrated reports and preserves old accepted images", async () => {
  const fs = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join, resolve } = await import("node:path");
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const temporary = await fs.mkdtemp(join(tmpdir(), "gamemap-legacy-replay-"));
  try {
    for (const directory of [
      "scripts/import",
      "scripts/lib",
      "data/segments",
      "reports",
      "work",
    ])
      await fs.mkdir(join(temporary, directory), { recursive: true });
    for (const file of [
      "scripts/import/example-media.mjs",
      "scripts/lib/example-media.mjs",
      "scripts/lib/round5-media.mjs",
    ])
      await fs.copyFile(file, join(temporary, file));
    await fs.symlink(
      resolve("node_modules"),
      join(temporary, "node_modules"),
      "dir",
    );
    const write = (file, value) =>
      fs.writeFile(join(temporary, file), JSON.stringify(value));
    await write("data/segments/open-3d-round5-media.json", {
      scopeIds: ["migrated-gap"],
    });
    await write("data/segments/jam-game-media.json", {
      version: 1,
      policy: "Synthetic fixture",
      scopeIds: ["kept-image", "migrated-gap"],
      records: [{ id: "kept-image" }],
      missing: [{ id: "migrated-gap", reason: "Old gap" }],
    });
    await write("intake.json", { jobs: [{ id: "migrated-gap" }] });
    await write("reports/stale.json", {
      accepted: [{ id: "migrated-gap" }],
      missing: [{ id: "migrated-gap", reason: "Stale gap" }],
    });
    const { stdout } = await promisify(execFile)(
      process.execPath,
      [
        join(temporary, "scripts/import/example-media.mjs"),
        "--intake",
        join(temporary, "intake.json"),
        "--reports",
        join(temporary, "reports"),
        "--work-root",
        join(temporary, "work"),
        "--dry-run",
      ],
      { cwd: temporary },
    );
    assert.deepEqual(JSON.parse(stdout), {
      dryRun: true,
      reviewed: 0,
      totalCommunityImages: 1,
      remaining: 0,
    });
  } finally {
    await fs.rm(temporary, { recursive: true, force: true });
  }
});

test("verified download/playable evidence never certifies source completeness", async () => {
  const { validateSourceDemoScope } =
    await import("../../scripts/lib/round5-media.mjs");
  const decision = demo();
  const upgraded = {
    ...entry,
    source: { ...entry.source, scope: "unverified-project" },
    demo: decision.demo,
  };
  assert.doesNotThrow(() =>
    validateSourceDemoScope(upgraded, decision, entry.demo),
  );
  assert.throws(() =>
    validateSourceDemoScope(
      {
        ...upgraded,
        source: { ...upgraded.source, scope: "complete-project" },
      },
      decision,
      entry.demo,
    ),
  );
  assert.throws(() => validateSourceDemoScope(upgraded));
  assert.throws(() =>
    validateSourceDemoScope(
      {
        ...upgraded,
        demo: { ...decision.demo, url: "https://other.example/" },
      },
      decision,
      entry.demo,
    ),
  );
  assert.doesNotThrow(() =>
    validateSourceDemoScope(
      {
        ...upgraded,
        source: { ...upgraded.source, scope: "complete-project" },
      },
      decision,
      { kind: "download" },
    ),
  );
});
