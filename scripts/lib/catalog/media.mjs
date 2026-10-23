import assert from "node:assert/strict";
import { mkdir, readFile, writeFile, realpath } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { root } from "../documents.mjs";
import {
  readArtifact,
  safePath,
  sha256,
  assertPrivateDirectory,
} from "./codec.mjs";

const profiles = new Map(
  [
    { profile: "default", maxPixels: 40000000, maxConcurrentUploads: null },
    { profile: "low-memory", maxPixels: 2500000, maxConcurrentUploads: 1 },
  ].map((profile) => [
    profile.profile,
    Object.freeze({
      maxBytes: 10 * 1024 * 1024,
      maxDimension: 10000,
      ...profile,
    }),
  ]),
);
export function mediaUploadPolicy(profile = "default") {
  assert.ok(
    profiles.has(profile),
    "Invalid CATALOG_MEDIA_PROFILE; use default or low-memory",
  );
  return profiles.get(profile);
}
// Process-wide native settings belong at startup, never in a per-request toggle.
// The default profile deliberately leaves Sharp's existing settings untouched.
export function configureMediaRuntime(profile = "default") {
  const policy = mediaUploadPolicy(profile);
  if (policy.profile === "low-memory") {
    sharp.cache(false);
    sharp.concurrency(1);
  }
  return policy;
}
export class MediaUploadBusyError extends Error {
  constructor() {
    super("Another image upload is running. Wait for it to finish and retry.");
    this.name = "MediaUploadBusyError";
  }
}
export async function normalizeImage(bytes, profile = "default") {
  const policy = mediaUploadPolicy(profile);
  assert.ok(
    bytes.length > 0 && bytes.length <= policy.maxBytes,
    "Image must be between 1 byte and 10 MB",
  );
  // Reject SVG/active formats before invoking an image decoder. Fully decode, auto-orient and
  // strip EXIF (including location data), rather than trusting a filename or a valid header.
  const png = bytes
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const webp =
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP";
  assert.ok(
    png || jpeg || webp,
    "Upload PNG, JPEG or WebP; SVG and active formats are not accepted",
  );
  let result;
  try {
    result = await sharp(bytes, {
      failOn: "error",
      limitInputPixels: policy.maxPixels,
      animated: false,
    })
      .rotate()
      .webp({ lossless: true })
      .toBuffer({ resolveWithObject: true });
  } catch {
    throw Object.assign(
      new Error(
        `Image could not be fully decoded within the ${policy.maxPixels / 1000000}-megapixel limit`,
      ),
      { status: 422 },
    );
  }
  assert.ok(
    result.info.width <= policy.maxDimension &&
      result.info.height <= policy.maxDimension &&
      result.data.length <= policy.maxBytes,
    "Normalized image exceeds the dimensions or 10 MB storage limit",
  );
  return {
    bytes: result.data,
    width: result.info.width,
    height: result.info.height,
  };
}
export function createMediaStore(
  directory = resolve(root, ".build/catalog-media"),
  { profile = "default" } = {},
) {
  const policy = mediaUploadPolicy(profile);
  const filenamePattern = /^[a-f0-9]{64}\.webp$/;
  const privateRoot = async () => {
    await assertPrivateDirectory(root, directory);
    await mkdir(directory, { recursive: true, mode: 0o700 });
    await assertPrivateDirectory(root, await realpath(directory));
  };
  const store = async (input) => {
    const image = await normalizeImage(input, policy.profile),
      hash = sha256(image.bytes),
      filename = `${hash}.webp`;
    await privateRoot();
    try {
      await writeFile(safePath(directory, filename), image.bytes, {
        flag: "wx",
        mode: 0o600,
      });
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      assert.equal(
        sha256(await readFile(safePath(directory, filename))),
        hash,
        "Stored media checksum conflict",
      );
    }
    return {
      filename,
      path: `media/catalog/${filename}`,
      sha256: hash,
      source_sha256: sha256(input),
      bytes: image.bytes.length,
      width: image.width,
      height: image.height,
      preview_url: `/api/media/${filename}`,
    };
  };
  let activeUploads = 0;
  const upload = async (readInput) => {
    // Reserve before reading the body; never queue encoded images in memory. One Studio
    // process/store is required. This is not distributed coordination or a memory SLA.
    if (activeUploads >= (policy.maxConcurrentUploads ?? Infinity))
      throw new MediaUploadBusyError();
    activeUploads++;
    try {
      return await store(await readInput());
    } finally {
      activeUploads--;
    }
  };
  return {
    policy,
    ready: privateRoot,
    upload,
    put(input) {
      return upload(() => input);
    },
    async get(filename) {
      assert.match(filename, filenamePattern, "Unknown media object");
      await privateRoot();
      const bytes = await readArtifact(directory, filename);
      assert.equal(
        sha256(bytes),
        filename.split(".")[0],
        "Stored media checksum mismatch",
      );
      return { bytes, mime: "image/webp" };
    },
    async readAsset(path) {
      const prefix = "website/public/media/catalog/";
      if (path.startsWith(prefix))
        return (await this.get(path.slice(prefix.length))).bytes;
      assert.ok(
        path.startsWith("website/public/"),
        "Only public source assets may be read",
      );
      return readArtifact(
        resolve(root, "website/public"),
        path.slice("website/public/".length),
      );
    },
  };
}
