import { test } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { loadContent } from "../scripts/lib/content.mjs";
import { createImportBundle } from "../scripts/lib/platform.mjs";
import { kindAdapters } from "../scripts/lib/catalog/adapters.mjs";
import { digest } from "../scripts/lib/catalog/codec.mjs";
import { projectSnapshot } from "../scripts/lib/catalog/projection.mjs";
import {
  ContentValidationError,
  validateSelection,
} from "../scripts/lib/catalog/validation.mjs";

const context = await loadContent();
const bundle = await createImportBundle(context);
const base = bundle.snapshot.entries.find(
  (entry) => entry.kind === "repository-research",
);
const example = bundle.snapshot.entries.find(
  (entry) => entry.kind === "example",
);
const media = {
  ...example.body.attachments.learningMedia,
  origin: "creator-screenshot",
  originalImageUrl: "https://images.example.org/game.webp",
  reviewedAt: "2026-10-24",
};
const access = {
  title: "Research game media fixture",
  track: "3d",
  engine: "Three.js",
  kind: "playable",
  url: "https://play.example.org/game/",
  source_url: "https://github.com/fixture/game/blob/main/README.md",
  checked_at: "2026-10-24",
  note: "Author-linked build; not playtested. Asset rights remain separate.",
};
const fingerprint = (record) => ({
  ...record,
  fingerprint: digest(record.body),
});
// Only path records are mandatory for assembly; these fixture paths select no demos.
const paths = bundle.snapshot.entries
  .filter((entry) => entry.kind === "path")
  .map((entry) => {
    const record = structuredClone(entry);
    record.body.attachments.showcase.cases = [];
    return fingerprint(record);
  });
function researchRecord(version = 3, { game = true, screenshot } = {}) {
  const record = structuredClone(base);
  record.schema_version = version;
  if (game) record.body.payload.game_access = { ...access };
  else delete record.body.payload.game_access;
  record.body.attachments = screenshot ? { learningMedia: screenshot } : {};
  return fingerprint(record);
}
const validate = (record, options) =>
  validateSelection(context, [...paths, record], [], options);
const rejectsField = async (record, field, options) => {
  await assert.rejects(validate(record, options), (error) => {
    assert.ok(error instanceof ContentValidationError);
    assert.ok(
      error.issues.some((issue) => issue.field === field),
      error.message,
    );
    return true;
  });
};

test("research v3 reuses the v2 payload and leaves installed v1/v2 attachments unchanged", async () => {
  const contracts = context.versionedContracts["repository-research"];
  assert.equal(context.contentKinds["repository-research"].schemaVersion, 3);
  assert.equal(contracts[3].payload, contracts[2].payload);
  assert.equal(
    contracts[3].attachments,
    context.attachmentSchemas["repository-research"],
  );
  assert.deepEqual(context.sources.researchGameMedia, {});
  assert.deepEqual(
    context.contracts["website/src/data/researchGameMedia.ts"].exports
      .researchGameMedia,
    {
      shape: "lookup",
      kind: "repository-research",
      sourceKey: "researchGameMedia",
    },
  );
  for (const version of [1, 2]) {
    assert.ok(contracts[version].attachments.safeParse({}).success);
    assert.equal(
      contracts[version].attachments.safeParse({ learningMedia: media })
        .success,
      false,
    );
    const validated = await validate(
      researchRecord(version, { game: version === 2 }),
    );
    assert.deepEqual(validated.assembled.sources.researchGameMedia, {});
    assert.equal(
      validated.registry
        .require("repository-research", base.identifier)
        .blocks.some((block) => block.type === "image"),
      false,
    );
  }
  assert.equal(
    contracts[1].payload.safeParse(researchRecord().body.payload).success,
    false,
  );
});

test("trusted research v3 validation requires media only when game_access is present", async () => {
  assert.ok(
    context.attachmentSchemas["repository-research"].safeParse({}).success,
  );
  await validate(researchRecord(3, { game: false }));
  await rejectsField(researchRecord(), "attachments.learningMedia");
  const record = researchRecord(3, { screenshot: media });
  const result = await validate(record);
  assert.deepEqual(
    result.assembled.sources.researchGameMedia[base.identifier],
    media,
  );
  assert.equal(result.assembled.sources.learningPaths.length, 0);
  assert.equal(
    result.registry.require("repository-research", base.identifier).data
      .ai_note,
    base.body.payload.ai_note,
  );
  assert.equal(
    result.registry.require("repository-research", base.identifier).data
      .license_note,
    base.body.payload.license_note,
  );
});

test("creator screenshot original URLs are required for both research and examples", async () => {
  const withoutOriginal = { ...media };
  delete withoutOriginal.originalImageUrl;
  await rejectsField(
    researchRecord(3, { screenshot: withoutOriginal }),
    "attachments.learningMedia.originalImageUrl",
  );
  const record = structuredClone(example);
  record.body.attachments.learningMedia = withoutOriginal;
  await rejectsField(
    fingerprint(record),
    "attachments.learningMedia.originalImageUrl",
  );
});

test("research screenshots use the same WebP, declared dimensions and 16:9 asset checks", async () => {
  const screenshot = {
    ...media,
    src: "media/research/test-fixture.webp",
    width: 320,
    height: 180,
  };
  const readAsset = (bytes) => async () => bytes;
  const image = async (width, height, format = "webp") =>
    sharp({ create: { width, height, channels: 3, background: "#123456" } })
      .toFormat(format)
      .toBuffer();
  const record = researchRecord(3, { screenshot });
  const result = await validate(record, {
    readAsset: readAsset(await image(320, 180)),
  });
  assert.ok(
    result.projection.assets.some(
      (artifact) =>
        artifact.path === "website/public/media/research/test-fixture.webp",
    ),
  );
  for (const bytes of [
    await image(320, 180, "png"),
    await image(640, 360),
    Buffer.from("not an image"),
  ])
    await rejectsField(record, "attachments.learningMedia.src", {
      readAsset: readAsset(bytes),
    });
  for (const [width, height] of [
    [160, 90],
    [320, 200],
  ])
    await rejectsField(
      researchRecord(3, { screenshot: { ...screenshot, width, height } }),
      "attachments.learningMedia.src",
      { readAsset: readAsset(await image(width, height)) },
    );
  await rejectsField(record, "attachments.learningMedia.src", {
    readAsset: async () => {
      throw new Error("Fixture missing asset");
    },
  });
});

test("assembly reads research media only from selected attachments, never Git or configuration", () => {
  const configuration = context.configurationFromSources(
    context.sources,
    context.registry.entries,
  );
  configuration.researchGameMedia = { [base.identifier]: media };
  const assembled = context.assembleSources(
    [...paths, researchRecord(2)],
    configuration,
  );
  assert.deepEqual(assembled.sources.researchGameMedia, {});
  const attached = context.assembleSources(
    [...paths, researchRecord(3, { screenshot: media })],
    configuration,
  );
  assert.deepEqual(attached.sources.researchGameMedia, {
    [base.identifier]: media,
  });
  assert.deepEqual(attached.sources.learningMedia, {});
});

test("registry shares screenshot presentation/provenance without adding AI attribution or changing research identity", () => {
  const sources = structuredClone(context.sources);
  const exampleId = example.identifier;
  sources.learningMedia[exampleId] = media;
  sources.researchGameMedia[base.identifier] = media;
  const registry = context.createRegistry(sources, context.documents);
  const research = registry.require("repository-research", base.identifier);
  const reference = registry.require("example", exampleId);
  const fields = new Set([
    "gameplay",
    "captureDate",
    "mediaReviewed",
    "originalImage",
  ]);
  const screenshotBlocks = (entry) =>
    entry.blocks.filter((block) => fields.has(block.field));
  assert.deepEqual(screenshotBlocks(research), screenshotBlocks(reference));
  assert.equal(research.kind, "repository-research");
  assert.equal(research.url, base.canonical_path);
  assert.equal(research.source, "data/segments/repository-research.json");
  assert.equal(research.data.ai_note, base.body.payload.ai_note);
  assert.equal(research.data.license_note, base.body.payload.license_note);
  assert.equal(
    research.blocks.some((block) => block.field === "attribution"),
    false,
  );
  assert.equal(
    registry.all("example").length,
    context.registry.all("example").length,
  );
  assert.equal(
    screenshotBlocks(research)[0].credit,
    "Creator-published screenshot",
  );
  assert.ok(context.searchableText(research).includes(media.alt));
  assert.ok(
    research.blocks.some(
      (block) =>
        block.field === "originalImage" &&
        block.items[0].url === media.originalImageUrl,
    ),
  );
  sources.researchGameMedia["missing/requested-repo"] = media;
  assert.throws(
    () => context.createRegistry(sources, context.documents),
    /Orphan researchGameMedia attachment: missing\/requested-repo/,
  );
});

test("research adapter and snapshot export preserve media attachments, asset usage and source links", () => {
  const sources = structuredClone(context.sources);
  sources.repositoryResearch.records.find(
    (record) => record.requested_repo === base.identifier,
  ).game_access = access;
  sources.researchGameMedia[base.identifier] = media;
  const archive = structuredClone(bundle.snapshot.archive);
  archive.sources = sources;
  const projected = projectSnapshot(
    context,
    archive,
    bundle.snapshot.taxonomy,
    bundle.snapshot.artifacts,
  );
  const record = projected.entries.find((entry) => entry.key === base.key);
  assert.equal(record.schema_version, 3);
  assert.deepEqual(record.body.attachments, { learningMedia: media });
  assert.deepEqual(record.body.payload.game_access, access);
  assert.equal(record.body.payload.ai_note, base.body.payload.ai_note);
  assert.equal(
    record.body.payload.license_note,
    base.body.payload.license_note,
  );
  const usage = projected.asset_usages.find(
    (usage) =>
      usage.revision_id === record.revision_id &&
      usage.field === "attachments.learningMedia.src",
  );
  assert.ok(usage);
  assert.equal(
    projected.assets.find((asset) => asset.id === usage.asset_id).path,
    `website/public/${media.src}`,
  );
  for (const url of [media.sourceUrl, media.originalImageUrl])
    assert.ok(
      projected.links.some(
        (link) =>
          link.revision_id === record.revision_id &&
          link.url === url &&
          link.role === "reference",
      ),
    );
  const adapter = kindAdapters["repository-research"];
  assert.deepEqual(adapter.attachments({ id: base.identifier }, sources), {
    learningMedia: media,
  });
  assert.deepEqual(adapter.attachments({ id: "absent/repo" }, sources), {});
  const implicitOrigin = { ...media };
  delete implicitOrigin.origin;
  sources.researchGameMedia[base.identifier] = implicitOrigin;
  assert.equal(
    adapter.attachments({ id: base.identifier }, sources).learningMedia.origin,
    "browser-capture",
  );
  assert.deepEqual(
    adapter.attachments({ id: base.identifier }, sources).learningMedia,
    kindAdapters.example.attachments(
      { id: example.identifier },
      {
        ...sources,
        learningMedia: { [example.identifier]: implicitOrigin },
      },
    ).learningMedia,
  );
});
