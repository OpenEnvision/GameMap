import assert from "node:assert/strict";
import sharp from "sharp";
import { sha256 } from "./codec.mjs";
import { normalizeScreenshot } from "../example-media.mjs";

export const gameplayCopyHash = (media) =>
  sha256(JSON.stringify({ alt: media.alt, caption: media.caption }));
export function gameplayAssetPath(src) {
  assert.equal(typeof src, "string");
  assert.match(
    src,
    /^media\/gameplay\/[a-z0-9][a-z0-9./-]*\.(?:png|jpe?g|gif|webp|json)$/,
  );
  assert.ok(
    !src.split("/").some((part) => part === ".." || part === "." || !part),
    "Unsafe gameplay asset path",
  );
  return "website/public/" + src;
}
const imageMetadata = async (bytes) =>
  sharp(bytes, { limitInputPixels: 40_000_000 }).metadata();
const previewFile = (media) =>
  Object.fromEntries(
    ["src", "sha256", "bytes", "width", "height"].map((key) => [
      key,
      media[key],
    ]),
  );

/** New media receipts are evidence, not runtime or rights clearance. Historical screenshots stay untouched. */
export async function validateGameplayAttachment(record, readAsset) {
  const media = record.body.attachments.learningMedia;
  if (!media?.provenance) return;
  assert.ok(
    ["example", "foundation", "threejs-game"].includes(record.kind),
    "Unsupported gameplay screenshot owner",
  );
  assert.equal(
    media.localizations.zh.sourceHash,
    gameplayCopyHash(media),
    "Stale gameplay screenshot translation",
  );
  assert.match(
    media.localizations.zh.alt + media.localizations.zh.caption,
    /\p{Script=Han}/u,
    "Missing reviewed Chinese screenshot copy",
  );
  assert.equal(media.width, 1280);
  assert.equal(media.height, 720);
  assert.ok(
    !record.body.attachments.pageCover,
    "Gameplay and active page cover cannot coexist",
  );
  const files = {
    preview: previewFile(media),
    original: media.original,
    frame: media.frame,
    provenance: media.provenance,
  };
  const bytes = {};
  for (const [name, declared] of Object.entries(files)) {
    const body = await readAsset(gameplayAssetPath(declared.src));
    assert.equal(body.length, declared.bytes, name + " byte count changed");
    assert.equal(sha256(body), declared.sha256, name + " checksum changed");
    assert.ok(
      body.length > 0 &&
        body.length <= (name === "provenance" ? 2_000_000 : 12_000_000),
      name + " exceeds retained-file bound",
    );
    bytes[name] = body;
    if (name !== "provenance") {
      const image = await imageMetadata(body);
      assert.equal(
        image.format,
        name === "preview" ? "webp" : declared.format,
        name + " format changed",
      );
      assert.equal(image.width, declared.width, name + " width changed");
      assert.equal(
        image.pageHeight || image.height,
        declared.height,
        name + " height changed",
      );
      if (name !== "original")
        assert.ok(
          !image.pages || image.pages === 1,
          "Preview/frame must be one complete raster frame",
        );
    }
  }
  const original = await imageMetadata(bytes.original);
  const rotated = [5, 6, 7, 8].includes(original.orientation);
  assert.equal(
    media.frame.width,
    rotated ? original.pageHeight || original.height : original.width,
    "Frame cropped or wrong orientation",
  );
  assert.equal(
    media.frame.height,
    rotated ? original.width : original.pageHeight || original.height,
    "Frame cropped or wrong orientation",
  );
  assert.equal(
    sha256(await normalizeScreenshot(bytes.frame)),
    media.sha256,
    "Preview is not the deterministic uncropped source frame",
  );
  const receipt = JSON.parse(bytes.provenance.toString("utf8"));
  assert.equal(receipt.format, "gamemap.gameplay-screenshot-provenance");
  assert.equal(receipt.version, 1);
  assert.equal(
    receipt.owner.key,
    record.key,
    "Screenshot receipt belongs to another owner",
  );
  assert.match(receipt.owner.baselineRevision, /^[a-f0-9-]{36}$/);
  assert.match(receipt.owner.baselineRelease, /^[a-f0-9-]{36}$/);
  assert.match(receipt.owner.baselineArtifact, /^[a-f0-9]{64}$/);
  assert.equal(receipt.source.origin, media.origin);
  assert.equal(receipt.source.pageUrl, media.sourceUrl);
  if (media.origin === "creator-screenshot") {
    assert.equal(
      receipt.source.imageHttpStatus,
      200,
      "Original image was not a successful observed transfer",
    );
    assert.equal(receipt.source.imageUrl, media.originalImageUrl);
    assert.match(media.caption, /^Creator-published screenshot:/);
  } else {
    assert.equal(
      media.origin,
      "browser-capture",
      "New native/local game execution is not authorized",
    );
    assert.equal(
      receipt.source.browserSandbox,
      true,
      "Browser capture must retain sandbox evidence",
    );
    assert.equal(receipt.source.originalCaptureSha256, media.original.sha256);
    assert.equal(receipt.source.capturedAt, media.capturedAt);
    assert.ok(
      Number.isFinite(Date.parse(media.capturedAt)),
      "Browser capture needs its actual capture time",
    );
  }
  assert.equal(receipt.review.date, media.reviewedAt);
  assert.ok(receipt.review.observed?.trim(), "Missing concrete visual finding");
  assert.deepEqual(receipt.review.copy.en, {
    alt: media.alt,
    caption: media.caption,
  });
  assert.deepEqual(receipt.review.copy.zh, {
    alt: media.localizations.zh.alt,
    caption: media.localizations.zh.caption,
  });
  for (const name of ["preview", "original", "frame"])
    assert.deepEqual(
      receipt.files[name],
      files[name],
      name + " provenance binding differs",
    );
  assert.deepEqual(receipt.processing, {
    fit: "contain",
    crop: false,
    generatedSceneContent: false,
    width: 1280,
    height: 720,
    frameIndex: receipt.processing.frameIndex,
  });
  assert.ok(
    Number.isInteger(receipt.processing.frameIndex) &&
      receipt.processing.frameIndex >= 0 &&
      receipt.processing.frameIndex < (original.pages || 1),
  );
  const decodedOriginal = await sharp(bytes.original, {
    page: receipt.processing.frameIndex,
    pages: 1,
    limitInputPixels: 40_000_000,
  })
    .rotate()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const decodedFrame = await sharp(bytes.frame, {
    limitInputPixels: 40_000_000,
  })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  assert.deepEqual(
    decodedFrame.info,
    decodedOriginal.info,
    "Retained frame geometry differs from the original frame",
  );
  assert.ok(
    decodedFrame.data.equals(decodedOriginal.data),
    "Retained frame pixels differ from the original frame",
  );
  assert.equal(receipt.rights, media.rights);
  return receipt;
}
