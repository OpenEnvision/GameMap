import test from "node:test";
import assert from "node:assert/strict";
import { loadContent } from "../scripts/lib/content.mjs";
import { adapterFor } from "../scripts/lib/catalog/adapters.mjs";
import { digest, sha256 } from "../scripts/lib/catalog/codec.mjs";

const context = await loadContent();
const owners = [
  ["example", 7, 8],
  ["foundation", 3, 4],
  ["threejs-game", 3, 4],
];
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
const media = {
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
const cover = {
  kind: "page-cover",
  origin: "project-page-capture",
  sourceKind: "repository-page",
  src: "media/page-covers/test.webp",
  alt: "Repository, not gameplay.",
  caption: "Captured project page; not a gameplay screenshot.",
  sourceUrl: "https://example.org/project",
  requestedUrl: "https://example.org/project",
  capturedAt: "2026-10-25T00:00:00.000Z",
  width: 1280,
  height: 720,
  sha256: "d".repeat(64),
  bytes: 80,
  original: {
    ...asset,
    src: "media/page-covers/test.png",
    width: 1600,
    height: 900,
  },
  rights:
    "Underlying text, logos and images retain their respective rights; no reuse permission or game verification is inferred.",
};
delete cover.original.format;

function reader(kind, version) {
  return context.versionedContracts[kind][version].attachments;
}

test("historical gameplay and cover readers remain unchanged; only active pointers advance", () => {
  assert.equal(context.learningMediaSchema.safeParse(legacy).success, true);
  assert.equal(context.learningMediaSchema.safeParse(media).success, false);
  for (const [kind, previous, active] of owners) {
    assert.equal(context.contentKinds[kind].schemaVersion, active);
    assert.equal(
      reader(kind, previous).safeParse({ learningMedia: legacy }).success,
      kind === "example",
    );
    assert.equal(
      reader(kind, previous).safeParse({ learningMedia: media }).success,
      false,
    );
    assert.equal(
      reader(kind, previous).safeParse({ pageCover: cover }).success,
      true,
    );
    assert.equal(
      context.versionedContracts[kind][previous].payload,
      context.versionedContracts[kind][active].payload,
    );
    assert.equal(
      reader(kind, active).safeParse({ learningMedia: legacy }).success,
      kind === "example",
    );
  }
});

test("all three owners accept complete media and cover fallback but require complete archives", () => {
  for (const [kind, , active] of owners) {
    const schema = reader(kind, active);
    for (const attachments of [
      {},
      { learningMedia: media },
      { pageCover: cover },
      { learningMedia: media, archivedPageCover: cover },
    ])
      assert.deepEqual(schema.parse(attachments), attachments);
    for (const attachments of [
      { learningMedia: media, pageCover: cover },
      { archivedPageCover: cover },
      { learningMedia: legacy, archivedPageCover: cover },
      { learningMedia: media, archivedPageCover: cover, pageCover: cover },
      { pageCover: cover, archivedPageCover: cover },
    ])
      assert.equal(schema.safeParse(attachments).success, false, kind);
  }
  assert.deepEqual(
    reader("example", 8).parse({
      learningMedia: media,
      agentAttribution: ["claude-code"],
    }).agentAttribution,
    ["claude-code"],
  );
  assert.equal(
    reader("foundation", 4).safeParse({
      learningMedia: media,
      agentAttribution: ["claude-code"],
    }).success,
    false,
  );
});

test("partial V2 never falls back to the strict legacy union; integrity fields and paths fail closed", () => {
  for (const field of [
    "sha256",
    "bytes",
    "original",
    "frame",
    "provenance",
    "reviewedAt",
    "rights",
    "localizations",
    "origin",
  ]) {
    const partial = structuredClone(media);
    delete partial[field];
    for (const [kind, , active] of owners)
      assert.equal(
        reader(kind, active).safeParse({ learningMedia: partial }).success,
        false,
        `${kind}:${field}`,
      );
  }
  for (const patch of [
    { sha256: "A".repeat(64) },
    { bytes: 0 },
    { width: -1 },
    { reviewedAt: "invalid" },
    { original: { ...asset, format: "svg" } },
    { frame: { ...asset, format: "webp" } },
    {
      localizations: {
        zh: { alt: "中文", caption: "中文", sourceHash: "bad" },
      },
    },
  ])
    assert.equal(
      context.gameplayMediaSchema.safeParse({ ...media, ...patch }).success,
      false,
    );
  for (const src of [
    "https://example.org/test.json",
    "../test.json",
    "media/../test.json",
    "media/%2e%2e/test.json",
    "//host/test.json",
    "media/test.json?x",
    "media\\test.json",
    "media/test.png",
  ])
    assert.equal(
      context.gameplayMediaSchema.safeParse({
        ...media,
        provenance: { ...media.provenance, src },
      }).success,
      false,
      src,
    );
  assert.equal(
    context.gameplayMediaSchema.safeParse({
      ...media,
      original: { ...asset, src: "media/original.gif", format: "gif" },
    }).success,
    true,
  );
});

function snapshot(key, attachments, payload = { id: key.split(":")[1] }) {
  const [kind, identifier] = key.split(":");
  return {
    key,
    kind,
    identifier,
    schema_version: context.contentKinds[kind].schemaVersion,
    body: { title: "Fixture", summary: "Fixture", payload, attachments },
  };
}
function assemble(records) {
  const paths = context.registry
    .all("path")
    .map((entry) =>
      snapshot(
        entry.key,
        adapterFor("path").attachments(entry, context.sources),
        entry.data,
      ),
    );
  return context.assembleSources(
    [...paths, ...records],
    context.configurationFromSources(context.sources, context.registry.entries),
  ).sources;
}

test("full-key assembly separates owners, avoids legacy duplication and round-trips exact body bytes", () => {
  const records = owners.map(([kind], index) =>
    snapshot(`${kind}:shared-id`, {
      learningMedia: { ...media, alt: `Owner ${index}` },
      archivedPageCover: cover,
      ...(kind === "example" ? { agentAttribution: ["claude-code"] } : {}),
    }),
  );
  const sources = assemble(records);
  assert.deepEqual(
    Object.keys(sources.gameplayScreenshots).sort(),
    records.map((r) => r.key).sort(),
  );
  assert.deepEqual(sources.learningMedia, {});
  assert.deepEqual(sources.pageCovers, {});
  for (const record of records) {
    const entry = { key: record.key, id: record.identifier, kind: record.kind };
    const body = {
      ...record.body,
      attachments: adapterFor(record.kind).attachments(entry, sources),
    };
    assert.equal(JSON.stringify(body), JSON.stringify(record.body));
    assert.equal(digest(body), digest(record.body));
    assert.deepEqual(
      assemble([record]).gameplayScreenshots[record.key],
      sources.gameplayScreenshots[record.key],
    );
  }
});

test("empty Git default and legacy/page-cover adapter fallbacks remain intact", () => {
  assert.deepEqual(context.sources.gameplayScreenshots, {});
  const sources = assemble([
    snapshot("example:legacy", {
      learningMedia: legacy,
      agentAttribution: ["claude-code"],
    }),
    snapshot("foundation:covered", { pageCover: cover }),
  ]);
  assert.deepEqual(sources.gameplayScreenshots, {});
  assert.deepEqual(sources.learningMedia.legacy, legacy);
  assert.deepEqual(
    adapterFor("example").attachments(
      { key: "example:legacy", id: "legacy" },
      sources,
    ),
    { learningMedia: legacy, agentAttribution: ["claude-code"] },
  );
  assert.deepEqual(
    adapterFor("foundation").attachments(
      { key: "foundation:covered", id: "covered" },
      sources,
    ),
    { pageCover: cover },
  );
  for (const [kind] of owners) {
    const key = `${kind}:v2`,
      entry = { key, id: "v2" };
    const next = {
      ...sources,
      gameplayScreenshots: { [key]: { media, archivedPageCover: cover } },
      pageCovers: { [key]: cover },
    };
    assert.equal(
      adapterFor(kind).attachments(entry, next).pageCover,
      undefined,
    );
    const { origin: _origin, ...withoutOrigin } = media;
    next.gameplayScreenshots[key].media = withoutOrigin;
    assert.throws(
      () => adapterFor(kind).attachments(entry, next),
      /Explicit gameplay origin/,
    );
  }
});
