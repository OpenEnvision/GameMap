import test from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import {
  validateGameplayAttachment,
  gameplayCopyHash,
  gameplayAssetPath,
} from "../scripts/lib/catalog/gameplay-media.mjs";
import { normalizeScreenshot } from "../scripts/lib/example-media.mjs";
import { sha256 } from "../scripts/lib/catalog/codec.mjs";

// Explicit memory-only integrity fixtures: never imported as game imagery.
async function fixture(kind = "example") {
  const frame = await sharp({
    create: { width: 320, height: 180, channels: 4, background: "#4d7340" },
  })
    .png()
    .toBuffer();
  const preview = await normalizeScreenshot(frame);
  const files = new Map();
  const put = (src, bytes) => {
    files.set(gameplayAssetPath(src), bytes);
    return { src, bytes: bytes.length, sha256: sha256(bytes) };
  };
  const media = {
    ...put("media/gameplay/previews/fixture.webp", preview),
    width: 1280,
    height: 720,
    alt: "Integrity fixture",
    caption: "Creator-published screenshot: integrity fixture.",
    origin: "creator-screenshot",
    sourceUrl: "https://example.org/fixture",
    originalImageUrl: "https://example.org/fixture.png",
    reviewedAt: "2026-10-25",
    original: {
      ...put("media/gameplay/originals/fixture.png", frame),
      width: 320,
      height: 180,
      format: "png",
    },
    frame: {
      ...put("media/gameplay/frames/fixture.png", frame),
      width: 320,
      height: 180,
      format: "png",
    },
    rights: "Fixture only; no game or rights claims.",
    localizations: {
      zh: {
        alt: "完整性测试夹具",
        caption: "创作者截图完整性测试夹具。",
        sourceHash: "",
      },
    },
  };
  media.localizations.zh.sourceHash = gameplayCopyHash(media);
  const record = {
    key: kind + ":fixture",
    kind,
    body: { attachments: { learningMedia: media } },
  };
  const receipt = {
    format: "gamemap.gameplay-screenshot-provenance",
    version: 1,
    owner: {
      key: record.key,
      baselineRevision: "00000000-0000-4000-8000-000000000001",
      baselineRelease: "00000000-0000-4000-8000-000000000002",
      baselineArtifact: "a".repeat(64),
    },
    source: {
      origin: media.origin,
      pageUrl: media.sourceUrl,
      imageUrl: media.originalImageUrl,
      imageHttpStatus: 200,
    },
    review: {
      date: media.reviewedAt,
      observed: "An explicitly labeled memory-only raster integrity fixture.",
      copy: {
        en: { alt: media.alt, caption: media.caption },
        zh: {
          alt: media.localizations.zh.alt,
          caption: media.localizations.zh.caption,
        },
      },
    },
    files: {
      preview: Object.fromEntries(
        ["src", "sha256", "bytes", "width", "height"].map((k) => [k, media[k]]),
      ),
      original: media.original,
      frame: media.frame,
    },
    processing: {
      fit: "contain",
      crop: false,
      generatedSceneContent: false,
      width: 1280,
      height: 720,
      frameIndex: 0,
    },
    rights: media.rights,
  };
  const updateReceipt = () => {
    media.provenance = put(
      "media/gameplay/provenance/fixture.json",
      Buffer.from(JSON.stringify(receipt)),
    );
  };
  updateReceipt();
  return {
    record,
    media,
    files,
    receipt,
    updateReceipt,
    readAsset: async (path) => {
      assert.ok(files.has(path), path);
      return files.get(path);
    },
  };
}

test("complete screenshot files, provenance and bilingual copy validate for all eligible owners", async () => {
  for (const kind of ["example", "foundation", "threejs-game"]) {
    const f = await fixture(kind);
    await validateGameplayAttachment(f.record, f.readAsset);
  }
  assert.equal(
    await validateGameplayAttachment({ body: { attachments: {} } }, () => {
      throw Error("Historical missing media must not read files");
    }),
    undefined,
  );
});

test("new screenshot validation rejects stale copy, changed bytes and wrong owner receipts", async () => {
  let f = await fixture();
  f.media.alt += " changed";
  await assert.rejects(
    validateGameplayAttachment(f.record, f.readAsset),
    /Stale/,
  );
  f = await fixture();
  f.files.set(gameplayAssetPath(f.media.original.src), Buffer.from("changed"));
  await assert.rejects(
    validateGameplayAttachment(f.record, f.readAsset),
    /byte count|checksum/,
  );
  f = await fixture();
  f.receipt.owner.key = "example:another";
  f.updateReceipt();
  await assert.rejects(
    validateGameplayAttachment(f.record, f.readAsset),
    /another owner/,
  );
  f = await fixture();
  f.receipt.source.imageHttpStatus = 403;
  f.updateReceipt();
  await assert.rejects(
    validateGameplayAttachment(f.record, f.readAsset),
    /successful observed transfer/,
  );
});

test("same-sized substituted pixels cannot masquerade as the preserved original frame", async () => {
  const f = await fixture();
  const replacement = await sharp({
    create: { width: 320, height: 180, channels: 4, background: "#e03399" },
  })
    .png()
    .toBuffer();
  const preview = await normalizeScreenshot(replacement);
  Object.assign(f.media.frame, {
    sha256: sha256(replacement),
    bytes: replacement.length,
  });
  Object.assign(f.media, { sha256: sha256(preview), bytes: preview.length });
  f.files.set(gameplayAssetPath(f.media.frame.src), replacement);
  f.files.set(gameplayAssetPath(f.media.src), preview);
  f.receipt.files.preview = Object.fromEntries(
    ["src", "sha256", "bytes", "width", "height"].map((k) => [k, f.media[k]]),
  );
  f.updateReceipt();
  await assert.rejects(
    validateGameplayAttachment(f.record, f.readAsset),
    /pixels differ/,
  );
});

test("source-file paths, complete-frame dimensions, processing and active-cover exclusivity fail closed", async () => {
  for (const path of [
    "../secret.png",
    "media/gameplay/../x.png",
    "https://example.org/a.png",
    "media/gameplay/a.json?token=x",
    "/media/gameplay/a.png",
  ])
    assert.throws(() => gameplayAssetPath(path));
  let f = await fixture();
  f.media.frame.width = 100;
  await assert.rejects(
    validateGameplayAttachment(f.record, f.readAsset),
    /width/,
  );
  f = await fixture();
  f.receipt.processing.crop = true;
  f.updateReceipt();
  await assert.rejects(validateGameplayAttachment(f.record, f.readAsset));
  f = await fixture();
  f.record.body.attachments.pageCover = {};
  await assert.rejects(
    validateGameplayAttachment(f.record, f.readAsset),
    /cannot coexist/,
  );
});
