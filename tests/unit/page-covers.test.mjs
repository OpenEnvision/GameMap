import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { loadContent } from "../../scripts/lib/content.mjs";
import {
  digest,
  sha256,
  contentUUID,
} from "../../scripts/lib/catalog/codec.mjs";
import { adapterFor } from "../../scripts/lib/catalog/adapters.mjs";
import { validateSelection } from "../../scripts/lib/catalog/validation.mjs";

const context = await loadContent();
// Test-only generated pixels are never imported or published as game/page media.
const original = await sharp({
  create: { width: 1600, height: 900, channels: 3, background: "#eaeaea" },
})
  .png()
  .toBuffer();
const normalized = await sharp(original)
  .resize(1280, 720, { fit: "contain" })
  .webp()
  .toBuffer();
const cover = {
  kind: "page-cover",
  origin: "project-page-capture",
  sourceKind: "repository-page",
  src: "media/page-covers/test-only.webp",
  alt: "Project repository page; not gameplay.",
  caption: "Captured project page; not a gameplay screenshot.",
  sourceUrl: "https://example.org/project",
  requestedUrl: "https://example.org/project",
  capturedAt: "2026-10-25T00:00:00.000Z",
  width: 1280,
  height: 720,
  sha256: sha256(normalized),
  bytes: normalized.length,
  original: {
    src: "media/page-covers/originals/test-only.png",
    sha256: sha256(original),
    bytes: original.length,
    width: 1600,
    height: 900,
  },
  rights:
    "Underlying text, logos and images retain their respective rights; no reuse permission or game verification is inferred.",
};

test("page covers append three readers without widening installed gameplay/history contracts", () => {
  assert.equal(context.contentKinds.example.schemaVersion, 8);
  assert.equal(context.contentKinds.foundation.schemaVersion, 4);
  assert.equal(context.contentKinds["threejs-game"].schemaVersion, 4);
  for (const [kind, oldVersion, newVersion] of [
    ["example", 5, 6],
    ["foundation", 1, 2],
    ["threejs-game", 1, 2],
  ]) {
    const readers = context.versionedContracts[kind];
    assert.equal(
      readers[oldVersion].attachments.safeParse({ pageCover: cover }).success,
      false,
    );
    assert.equal(
      readers[newVersion].attachments.safeParse({ pageCover: cover }).success,
      true,
    );
    assert.equal(readers[newVersion].payload, readers[oldVersion].payload);
  }
  const gameplay = Object.values(context.sources.learningMedia)[0];
  assert.equal(
    context.versionedContracts.example[6].attachments.safeParse({
      pageCover: cover,
      learningMedia: {
        ...gameplay,
        origin: gameplay.origin || "browser-capture",
      },
    }).success,
    false,
  );
  for (const patch of [
    { origin: "browser-capture" },
    { kind: "gameplay" },
    { sourceUrl: "http://example.org/project" },
    { width: 800 },
  ])
    assert.equal(
      context.versionedContracts.foundation[2].attachments.safeParse({
        pageCover: { ...cover, ...patch },
      }).success,
      false,
    );
});

function fixture(selectedCover = cover) {
  const paths = context.registry.all("path");
  const foundation = context.registry.all("foundation")[0];
  const records = [...paths, foundation].map((entry) => {
    const payload = structuredClone(entry.data);
    if (entry.kind === "foundation") payload.resourceIds = [];
    const attachments =
      entry.kind === "foundation"
        ? { pageCover: selectedCover }
        : structuredClone(
            adapterFor("path").attachments(entry, context.sources),
          );
    if (entry.kind === "path") attachments.showcase.cases = [];
    const body = {
      title: entry.title,
      summary: entry.description,
      payload,
      attachments,
    };
    return {
      key: entry.key,
      kind: entry.kind,
      identifier: entry.id,
      owner: "database",
      canonical_path: entry.url,
      collection_path: entry.collectionUrl,
      schema_version: context.contentKinds[entry.kind].schemaVersion,
      revision_id: contentUUID("page-cover-unit:" + entry.key),
      fingerprint: digest(body),
      body,
    };
  });
  const readAsset = (path) =>
    path === "website/public/" + cover.src
      ? normalized
      : path === "website/public/" + cover.original.src
        ? original
        : readFile(path);
  return { records, readAsset };
}

test("versioned page-cover assets round-trip through assembly and projection without gameplay fields", async () => {
  const { records, readAsset } = fixture();
  const result = await validateSelection(context, records, [], { readAsset });
  const entry = result.registry.all("foundation")[0];
  assert.equal(
    entry.blocks.some((b) => b.field === "gameplay"),
    false,
  );
  assert.equal(
    entry.blocks.find((b) => b.field === "pageCover").source,
    cover.sourceUrl,
  );
  assert.equal(
    entry.blocks.find((b) => b.field === "pageCover").label,
    "Project page screenshot",
  );
  assert.equal(
    entry.blocks.find((b) => b.field === "pageCoverOriginal").items[0].url,
    "/" + cover.original.src,
  );
  assert.deepEqual(result.assembled.sources.pageCovers[entry.key], cover);
  const media = result.projection.asset_usages.filter(
    (a) => a.revision_id === records.at(-1).revision_id,
  );
  assert.deepEqual(media.map((m) => m.field).sort(), [
    "attachments.pageCover.original.src",
    "attachments.pageCover.src",
  ]);
  assert.ok(
    result.projection.links
      .filter((l) => l.field.startsWith("attachments.pageCover."))
      .every((l) => l.role === "reference"),
  );
});

test("a changed normalized or original file cannot retain a page-cover provenance receipt", async () => {
  const { records, readAsset } = fixture();
  for (const suffix of [cover.src, cover.original.src])
    await assert.rejects(
      validateSelection(context, records, [], {
        readAsset: (path) =>
          path === "website/public/" + suffix
            ? Buffer.from("tampered")
            : readAsset(path),
      }),
      /Content validation failed/,
    );
});

test("catalog fallback uses appended readers, relative record addresses and pinned source snapshots", async () => {
  const local = {
    ...cover,
    origin: "catalog-page-capture",
    sourceKind: "catalog-record",
    caption:
      "Captured GameMap catalog record; not an upstream page or gameplay screenshot.",
    sourceUrl: "/examples/godot-2d-dodge/",
    requestedUrl: "/examples/godot-2d-dodge/",
    sourceSnapshot: {
      releaseId: contentUUID("cover-source-release"),
      artifactSha256: "a".repeat(64),
      recordRevision: contentUUID("cover-source-revision"),
      canonicalPath: "/examples/godot-2d-dodge/",
    },
  };
  for (const [kind, oldVersion, version] of [
    ["example", 6, 7],
    ["foundation", 2, 3],
    ["threejs-game", 2, 3],
  ]) {
    assert.equal(
      context.versionedContracts[kind][oldVersion].attachments.safeParse({
        pageCover: local,
      }).success,
      false,
    );
    assert.equal(
      context.versionedContracts[kind][version].attachments.safeParse({
        pageCover: local,
      }).success,
      true,
    );
    assert.equal(
      context.versionedContracts[kind][version].attachments.safeParse({
        pageCover: { ...local, sourceUrl: "http://127.0.0.1:4191/" },
      }).success,
      false,
    );
    assert.equal(
      context.versionedContracts[kind][version].attachments.safeParse({
        pageCover: {
          ...local,
          sourceSnapshot: {
            ...local.sourceSnapshot,
            canonicalPath: "/examples/another-game/",
          },
        },
      }).success,
      false,
    );
  }
  const { records, readAsset } = fixture(local),
    result = await validateSelection(context, records, [], { readAsset });
  const entry = result.registry.all("foundation")[0];
  assert.equal(
    entry.blocks.find((b) => b.field === "pageCover").label,
    "GameMap page screenshot",
  );
  assert.ok(
    entry.blocks
      .find((b) => b.field === "pageCoverSnapshot")
      .value.includes(local.sourceSnapshot.artifactSha256),
  );
});

test("exported Git page-cover records belong to valid game entries and pass schema checks", () => {
  for (const [key, value] of Object.entries(context.sources.pageCovers)) {
    const entry = context.registry.byKey(key);
    assert.ok(entry, `Orphan Git page cover: ${key}`);
    assert.ok(["example", "foundation", "threejs-game"].includes(entry.kind));
    assert.equal(
      context.versionedContracts[entry.kind][
        context.contentKinds[entry.kind].schemaVersion
      ].attachments.safeParse({ pageCover: value }).success,
      true,
      `Invalid exported page cover: ${key}`,
    );
  }
});
