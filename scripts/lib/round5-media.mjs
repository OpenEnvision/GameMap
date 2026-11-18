import assert from "node:assert/strict";
import { publicMediaURL, imageOriginAllowed } from "./example-media.mjs";

const text = (value, label) =>
  assert.ok(typeof value === "string" && value.trim(), label);
const hash = (value) => assert.match(value, /^[a-f0-9]{64}$/);
const date = (value) => {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(value).toISOString().slice(0, 10), value);
};
const english = (value, label) => {
  text(value, label);
  assert.doesNotMatch(value, /\p{Script=Han}/u, `${label} must be English`);
};
function checkedSources(row) {
  assert.ok(
    Array.isArray(row.checkedSources) && row.checkedSources.length,
    `Checked sources required: ${row.id}`,
  );
  for (const source of row.checkedSources) {
    publicMediaURL(source.url);
    date(source.checkedAt);
    text(
      source.result,
      "Describe the actual check, including any access failure",
    );
  }
}
function partition(scopeIds, records, missing, label) {
  assert.ok(
    Array.isArray(records) && Array.isArray(missing),
    `${label} decisions required`,
  );
  const ids = [...records, ...missing].map((row) => row.id);
  assert.equal(new Set(ids).size, ids.length, `Duplicate ${label} decisions`);
  assert.deepEqual(
    [...ids].sort(),
    [...scopeIds].sort(),
    `Incomplete ${label} review scope`,
  );
  for (const row of missing) {
    assert.ok(
      ["missing", "research-incomplete"].includes(row.status),
      `Explicit missing/research-incomplete status required: ${row.id}`,
    );
    text(row.reason, `Missing ${label} reason: ${row.id}`);
    checkedSources(row);
  }
}
export function validateDemoDecision(row, example) {
  assert.ok(example, `Unknown demo example: ${row.id}`);
  assert.equal(
    row.sourceUrl,
    example.source.url,
    "Source references must not change",
  );
  const { demo, evidence } = row;
  assert.ok(["playable", "download"].includes(demo.kind));
  assert.deepEqual(Object.keys(demo).sort(), ["kind", "label", "note", "url"]);
  english(demo.label, "Demo label");
  english(demo.note, "Demo note");
  const target = publicMediaURL(demo.url);
  if (!/^[a-z0-9-]+\.itch\.io$/i.test(target.hostname)) {
    assert.notEqual(
      demo.url,
      example.source.url,
      "A source URL is not a runnable release",
    );
  }
  assert.ok(evidence);
  publicMediaURL(evidence.authorPublicationUrl);
  english(
    evidence.authorVerification,
    "Explain why this publication belongs to the author",
  );
  date(evidence.reviewedAt);
  checkedSources(row);
  if (demo.kind === "playable") {
    assert.equal(
      evidence.browserSandbox,
      true,
      "Playable requires sandbox browser evidence",
    );
    assert.equal(
      evidence.renderedGame,
      true,
      "A loaded landing page is not rendered gameplay",
    );
    assert.equal(evidence.loadedUrl, demo.url);
    english(
      evidence.visualFinding,
      "Describe the rendered game, not a full playtest",
    );
    assert.ok(Array.isArray(evidence.inputActions));
    for (const action of evidence.inputActions)
      english(action, "Browser input action");
  } else {
    assert.equal(
      evidence.binaryRelease,
      true,
      "Download requires an author binary release",
    );
    assert.ok(
      Array.isArray(evidence.assets) && evidence.assets.length,
      "List verified binary assets",
    );
    if (target.hostname === "github.com")
      assert.match(target.pathname, /^\/[^/]+\/[^/]+\/releases(?:\/|$)/);
    english(
      evidence.binaryVerification,
      "Explain how the publication identifies an installable game distribution rather than source, video or assets",
    );
    for (const asset of evidence.assets) {
      const url = publicMediaURL(asset.url);
      text(asset.name, "Binary asset name");
      assert.equal(
        asset.kind,
        "game-binary",
        "A release attachment is not necessarily a game distribution",
      );
      english(asset.platform, "Binary target platform");
      if (asset.publicationLabel === true) {
        assert.match(target.hostname, /^[a-z0-9-]+\.itch\.io$/i);
        assert.equal(
          url.href,
          target.href,
          "Named itch upload must belong to the reviewed author game page",
        );
        assert.match(
          String(asset.uploadId),
          /^\d+$/,
          "Named itch upload requires its actual numeric upload ID",
        );
        english(
          asset.platformEvidence,
          "Record the actual platform-labelled upload evidence",
        );
        assert.match(
          asset.platformEvidence,
          /Download for (?:Windows|Linux|macOS|Mac OS|Android)/i,
        );
        assert.doesNotMatch(
          asset.name,
          /source|project|trailer|video|asset|soundtrack/i,
        );
      } else {
        assert.match(
          asset.name,
          /\.(?:exe|msi|dmg|pkg|appimage|apk|aab|ipa|deb|rpm|zip|7z|tgz|tar\.(?:gz|xz|bz2)|x86_64)$/i,
          "Require an installer or game distribution archive, not video, documentation or scene assets",
        );
      }

      assert.doesNotMatch(asset.name, /^source code\b/i);
      assert.doesNotMatch(url.pathname, /\/(?:archive|zipball|tarball)\//);
      if (url.hostname === "github.com")
        assert.match(url.pathname, /^\/[^/]+\/[^/]+\/releases\//);
    }
  }
  return row;
}
export function validateMediaLedger(
  ledger,
  examples,
  expectedScope,
  { finalized = true } = {},
) {
  assert.equal(ledger.version, 1);
  text(ledger.policy, "Review policy required");
  assert.ok(Array.isArray(ledger.scopeIds));
  assert.equal(new Set(ledger.scopeIds).size, ledger.scopeIds.length);
  assert.deepEqual(
    [...ledger.scopeIds].sort(),
    [...expectedScope].sort(),
    "Review scope differs from frozen requested scope",
  );
  const byId = new Map(examples.map((entry) => [entry.id, entry]));
  for (const id of ledger.scopeIds)
    assert.ok(byId.has(id), `Unknown scope ID: ${id}`);
  partition(ledger.scopeIds, ledger.records, ledger.missing, "screenshot");
  partition(
    ledger.scopeIds,
    ledger.demos.records,
    ledger.demos.missing,
    "demo",
  );
  const demos = new Map(
    ledger.demos.records.map((row) => [
      row.id,
      validateDemoDecision(row, byId.get(row.id)).demo,
    ]),
  );
  for (const row of ledger.records) {
    const media = row.media,
      evidence = row.evidence;
    assert.equal(media.src, `media/learning/${row.id}.webp`);
    english(media.alt, "Screenshot alt");
    english(media.caption, "Screenshot caption");
    english(evidence.visualFinding, "Personal visual review required");
    publicMediaURL(media.sourceUrl);
    assert.equal(media.width, 1280);
    assert.equal(media.height, 720);
    hash(evidence.sourceFrameSHA256);
    assert.deepEqual(row.processing, {
      fit: "contain",
      width: 1280,
      height: 720,
      crop: false,
      generatedSceneContent: false,
    });
    if (media.origin === "creator-screenshot") {
      hash(evidence.originalSHA256);
      assert.ok(imageOriginAllowed(media.originalImageUrl, media.sourceUrl));
      date(media.reviewedAt);
      assert.equal(media.capturedAt, undefined);
      assert.match(media.caption, /creator-published/i);
    } else {
      assert.equal(media.origin, "browser-capture");
      assert.equal(media.reviewedAt, undefined);
      assert.equal(media.originalImageUrl, undefined);
      const demo = demos.get(row.id) || byId.get(row.id).demo;
      assert.equal(demo.kind, "playable");
      assert.equal(media.sourceUrl, demo.url);
      assert.equal(evidence.browserSandbox, true);
      assert.match(media.capturedAt, /^\d{4}-\d{2}-\d{2}T/);
      assert.ok(Number.isFinite(Date.parse(media.capturedAt)));
      assert.ok(Array.isArray(evidence.inputActions));
      for (const action of evidence.inputActions)
        english(action, "Capture input action");
    }
    text(row.rights, "Creator rights notice required");
    if (finalized) {
      hash(row.sha256);
      assert.ok(row.bytes > 512 && row.bytes < 2_000_000);
    }
  }
  return ledger;
}
export function applyVerifiedDemos(examples, decisions) {
  const byId = new Map(examples.map((entry) => [entry.id, entry]));
  const updates = new Map();
  for (const row of decisions) {
    assert.ok(!updates.has(row.id), `Duplicate demo decision: ${row.id}`);
    validateDemoDecision(row, byId.get(row.id));
    updates.set(row.id, row.demo);
  }
  return examples.map((entry) =>
    updates.has(entry.id) ? { ...entry, demo: updates.get(entry.id) } : entry,
  );
}

export function applyScopedDemoLedger(examples, ledger, baselineDemos) {
  if (!ledger) return examples;
  const scope = new Set(ledger.scopeIds);
  assert.equal(
    scope.size,
    ledger.scopeIds.length,
    "Duplicate demo ownership scope",
  );
  for (const id of scope)
    assert.ok(
      Object.hasOwn(baselineDemos, id),
      `Missing frozen demo baseline: ${id}`,
    );
  for (const row of ledger.demos.records)
    assert.ok(
      scope.has(row.id),
      `Demo decision outside owned scope: ${row.id}`,
    );
  const restored = examples.map((entry) =>
    scope.has(entry.id)
      ? { ...entry, demo: structuredClone(baselineDemos[entry.id]) }
      : entry,
  );
  const ids = new Set(restored.map((entry) => entry.id));
  return applyVerifiedDemos(
    restored,
    ledger.demos.records.filter((row) => ids.has(row.id)),
  );
}

export function excludeMigratedLegacyGaps(previous, ownedIds) {
  const owned = new Set(ownedIds);
  const existing = new Set((previous.records || []).map((row) => row.id));
  return {
    ...previous,
    scopeIds: (previous.scopeIds || []).filter(
      (id) => !owned.has(id) || existing.has(id),
    ),
    missing: (previous.missing || []).filter((row) => !owned.has(row.id)),
  };
}

export async function applyPublishedDemos(examples) {
  const { readFile } = await import("node:fs/promises");
  const ledger = await readFile(
    new URL("../../data/segments/open-3d-round5-media.json", import.meta.url),
    "utf8",
  )
    .then(JSON.parse)
    .catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
  if (!ledger) return examples;
  const frozen = JSON.parse(
    await readFile(
      new URL(
        "../../website/content/round5-media.config.json",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  return applyScopedDemoLedger(examples, ledger, frozen.baselineDemos);
}

export function renderVerifiedDemoModule(
  source,
  moduleName,
  decisions,
  replay = null,
) {
  const marker = `export const ${moduleName}: LearningPath[] = `;
  const start = source.indexOf(marker);
  assert.ok(start >= 0, "Expected a generated JSON-array example module");
  const encoded = source.slice(start + marker.length).trim();
  assert.ok(encoded.endsWith(";"));
  const entries = JSON.parse(encoded.slice(0, -1));
  const ids = new Set(entries.map((entry) => entry.id));
  const updates = decisions.filter((row) => ids.has(row.id));
  const owned = replay
    ? entries.filter((entry) => replay.scopeIds.includes(entry.id))
    : [];
  if (!updates.length && !owned.length)
    return { source, handled: [], changed: false };
  const refreshed = replay
    ? applyScopedDemoLedger(
        entries,
        { scopeIds: replay.scopeIds, demos: { records: decisions } },
        replay.baselineDemos,
      )
    : applyVerifiedDemos(entries, updates);
  return {
    source:
      source.slice(0, start + marker.length) +
      JSON.stringify(refreshed, null, 2) +
      ";\n",
    handled: updates.map((row) => row.id),
    changed: JSON.stringify(refreshed) !== JSON.stringify(entries),
  };
}

// A verified runnable distribution does not certify the completeness of its source.
// Preserve the pre-review classification for ledger-owned demo upgrades only.
export function validateSourceDemoScope(example, decision, baselineDemo) {
  let kind = example.demo.kind;
  if (decision) {
    assert.ok(baselineDemo, `Missing frozen demo baseline: ${example.id}`);
    assert.equal(decision.id, example.id);
    validateDemoDecision(decision, example);
    assert.deepEqual(
      example.demo,
      decision.demo,
      `Demo differs from reviewed decision: ${example.id}`,
    );
    kind = baselineDemo.kind;
  }
  assert.equal(
    example.source.scope,
    kind === "source"
      ? "unverified-project"
      : kind === "reference"
        ? "project-reference"
        : "complete-project",
    `Do not certify an unreviewed source reference as a complete project: ${example.id}`,
  );
}
