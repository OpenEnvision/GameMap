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

const limit = 10 * 1024 * 1024;
export async function normalizeImage(bytes) {
  assert.ok(
    bytes.length > 0 && bytes.length <= limit,
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
      limitInputPixels: 40000000,
      animated: false,
    })
      .rotate()
      .webp({ lossless: true })
      .toBuffer({ resolveWithObject: true });
  } catch {
    throw Object.assign(
      new Error(
        "Image could not be fully decoded within the 40-megapixel limit",
      ),
      { status: 422 },
    );
  }
  assert.ok(
    result.info.width <= 10000 &&
      result.info.height <= 10000 &&
      result.data.length <= limit,
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
) {
  const filenamePattern = /^[a-f0-9]{64}\.webp$/;
  const privateRoot = async () => {
    await assertPrivateDirectory(root, directory);
    await mkdir(directory, { recursive: true, mode: 0o700 });
    await assertPrivateDirectory(root, await realpath(directory));
  };
  return {
    ready: privateRoot,
    async put(input) {
      const image = await normalizeImage(input),
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
