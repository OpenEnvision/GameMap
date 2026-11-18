import assert from "node:assert/strict";
import { readFile, realpath } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { createHash } from "node:crypto";
import { format } from "prettier";
import { loadLearningContent } from "../lib/guides/learning.mjs";
import { normalizeScreenshot, reviewFrame } from "../lib/example-media.mjs";
import {
  validateMediaLedger,
  renderVerifiedDemoModule,
} from "../lib/round5-media.mjs";
import { writeIfChanged } from "../lib/files.mjs";

const root = resolve(import.meta.dirname, "../.."),
  args = process.argv.slice(2);
const option = (name, fallback) =>
  args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const json = async (path) =>
  JSON.parse(await readFile(resolve(root, path), "utf8"));
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const ledgerPath = "data/segments/open-3d-round5-media.json";
// Reports are private working inputs. Only reviewed, complete decisions are published.
const ledger = await json(option("--review", ledgerPath));
const frozenScope = await json("website/content/round5-media.config.json");
const expectedScope = [
  ...frozenScope.round5Ids,
  ...frozenScope.priorMissingIds,
];
assert.equal(
  expectedScope.length,
  867,
  "Frozen scope is 391 round-five and 476 previously missing entries",
);
if (args.includes("--scope")) {
  const suppliedScope = await json(option("--scope"));
  const suppliedIds = suppliedScope.scopeIds || [
    ...suppliedScope.round5Ids,
    ...suppliedScope.priorMissingIds,
  ];
  assert.deepEqual(
    [...suppliedIds].sort(),
    [...expectedScope].sort(),
    "Requested scope cannot be overridden by a review report",
  );
}
const round5 = await json("data/segments/open-3d-import-round5.json");
assert.deepEqual(
  frozenScope.round5Ids,
  round5.newExampleIds,
  "Frozen round-five order must match the original intake",
);
const { learningPaths } = await loadLearningContent();
validateMediaLedger(ledger, learningPaths, expectedScope, { finalized: false });
const planned = [];
const handledDemos = [];
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
  const path = resolve(root, `website/src/data/${name}.ts`);
  const result = renderVerifiedDemoModule(
    await readFile(path, "utf8"),
    name,
    ledger.demos.records,
    { scopeIds: ledger.scopeIds, baselineDemos: frozenScope.baselineDemos },
  );
  if (result.changed) planned.push([path, result.source]);
  handledDemos.push(...result.handled);
}
assert.deepEqual(
  handledDemos.sort(),
  ledger.demos.records.map((row) => row.id).sort(),
  "Every verified demo must have an owned generated example module",
);

if (args.includes("--frames")) {
  const frames = await json(option("--frames"));
  const work = await realpath(resolve(root, ".build/round5-media/work"));
  for (const row of ledger.records) {
    assert.ok(frames[row.id], `Missing reviewed frame: ${row.id}`);
    const file = await realpath(resolve(root, frames[row.id]));
    assert.ok(
      file.startsWith(work + sep),
      "Frames must stay in the isolated review workspace",
    );
    const bytes = await readFile(file);
    assert.equal(
      digest(bytes),
      row.evidence.sourceFrameSHA256,
      `Reviewed frame changed: ${row.id}`,
    );
    const frame = await reviewFrame(bytes);
    assert.equal(
      frame.frames,
      1,
      "Review a specific extracted frame, not an unreviewed animation",
    );
    const normalized = await normalizeScreenshot(frame.png);
    row.sha256 = digest(normalized);
    row.bytes = normalized.length;
    planned.push([resolve(root, "website/public", row.media.src), normalized]);
  }
} else {
  // Rebuilding from a committed ledger needs no network or private original bytes.
  for (const row of ledger.records) {
    const bytes = await readFile(
      resolve(root, "website/public", row.media.src),
    );
    assert.equal(
      digest(bytes),
      row.sha256,
      `Published screenshot changed: ${row.id}`,
    );
    assert.equal(bytes.length, row.bytes);
    const frame = await reviewFrame(bytes);
    assert.equal(frame.originalFormat, "webp");
    assert.equal(frame.width, 1280);
    assert.equal(frame.height, 720);
  }
}
validateMediaLedger(ledger, learningPaths, expectedScope);
// Move re-reviewed previous gaps into the new ledger, avoiding contradictory
// public missing claims after a screenshot is accepted. Existing images stay untouched.
const jamPath = "data/segments/jam-game-media.json";
const jam = await json(jamPath);
const movedGaps = new Set(
  jam.missing
    .filter((row) => expectedScope.includes(row.id))
    .map((row) => row.id),
);
if (movedGaps.size) {
  jam.missing = jam.missing.filter((row) => !movedGaps.has(row.id));
  jam.scopeIds = jam.scopeIds.filter((id) => !movedGaps.has(id));
  const jamText = JSON.stringify(jam, null, 2) + "\n";
  planned.push([resolve(root, jamPath), jamText]);
  planned.push([
    resolve(root, "website/public/game-screenshot-sources.json"),
    jamText,
  ]);
}
const serialized = JSON.stringify(ledger, null, 2) + "\n";
planned.push([resolve(root, ledgerPath), serialized]);
planned.push([
  resolve(root, "website/public/open-3d-round5-media-sources.json"),
  serialized,
]);
const source = `// Generated by scripts/import/open-3d-round5-media.mjs.\nimport type { LearningMedia } from "./learningMedia";\nexport const open3dRound5Media: Record<string, LearningMedia> = ${JSON.stringify(Object.fromEntries(ledger.records.map((row) => [row.id, row.media])), null, 2)};\n`;
planned.push([
  resolve(root, "website/src/data/open3dRound5Media.ts"),
  await format(source, { parser: "typescript" }),
]);
// Register generated inputs only when a complete ledger is ready to publish.
const configPath = "website/content/sources.config.json";
const config = await json(configPath);
config[ledgerPath] = {
  exports: {
    default: {
      shape: "metadata",
      kind: "example",
      reason:
        "Complete reviewed scope, screenshot attribution and verified demo evidence; public copy: open-3d-round5-media-sources.json. Missing decisions record checked sources, not presumed absence.",
    },
  },
};
config["website/src/data/open3dRound5Media.ts"] = {
  exports: {
    open3dRound5Media: {
      shape: "lookup",
      kind: "example",
      sourceKey: "learningMedia",
    },
  },
};
planned.push([
  resolve(root, configPath),
  await format(JSON.stringify(config), { parser: "json" }),
]);
const mediaPath = resolve(root, "website/src/data/learningMedia.ts");
let mediaSource = await readFile(mediaPath, "utf8");
if (!mediaSource.includes("import { open3dRound5Media }")) {
  assert.ok(
    mediaSource.includes("  ...jamGameMedia,"),
    "Expected media merge boundary",
  );
  mediaSource =
    'import { open3dRound5Media } from "./open3dRound5Media";\n' +
    mediaSource.replace(
      "  ...jamGameMedia,",
      "  ...jamGameMedia,\n  ...open3dRound5Media,",
    );
}
planned.push([mediaPath, await format(mediaSource, { parser: "typescript" })]);
if (!args.includes("--dry-run"))
  for (const [path, bytes] of planned) await writeIfChanged(path, bytes);
console.log(
  JSON.stringify({
    dryRun: args.includes("--dry-run"),
    reviewed: ledger.scopeIds.length,
    screenshots: ledger.records.length,
    missing: ledger.missing.length,
    demos: ledger.demos.records.length,
  }),
);
