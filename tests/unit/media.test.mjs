import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { request } from "node:http";
import { spawnSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import sharp from "sharp";
import { root } from "../../scripts/lib/documents.mjs";
import {
  createMediaStore,
  mediaUploadPolicy,
  MediaUploadBusyError,
  normalizeImage,
} from "../../scripts/lib/catalog/media.mjs";
import { studioFixture } from "../helpers/studio-fixture.mjs";

const png = (width, height) =>
  sharp({ create: { width, height, channels: 3, background: "#617657" } })
    .png()
    .toBuffer();
let fixture, editor, directory, small, maximum, oversized;
before(async () => {
  directory = await mkdtemp(join(tmpdir(), "gamemap-media-profile-"));
  [small, maximum, oversized] = await Promise.all([
    png(48, 32),
    png(2000, 1250),
    png(2001, 1250),
  ]);
  fixture = await studioFixture({
    mediaProfile: "low-memory",
    approved: false,
  });
  editor = await fixture.login("editor");
});
after(async () => {
  await fixture?.close();
  if (directory) await rm(directory, { recursive: true, force: true });
});

test("media profiles are explicit, immutable, redacted and do not change the default", () => {
  const normal = mediaUploadPolicy();
  assert.equal(normal, mediaUploadPolicy("default"));
  assert.equal(normal.maxPixels, 40000000);
  assert.equal(normal.maxConcurrentUploads, null);
  const limited = mediaUploadPolicy("low-memory");
  assert.equal(limited.maxPixels, 2500000);
  assert.equal(limited.maxConcurrentUploads, 1);
  assert.equal(normal.maxBytes, limited.maxBytes);
  assert.throws(() => (limited.maxPixels = Infinity), TypeError);
  for (const invalid of ["", "__proto__", "production", {}])
    assert.throws(
      () => mediaUploadPolicy(invalid),
      /Invalid CATALOG_MEDIA_PROFILE/,
    );
  const sentinel = "private-profile-input-sentinel";
  const result = spawnSync(process.execPath, ["scripts/platform/studio.mjs"], {
    cwd: root,
    env: { ...process.env, CATALOG_MEDIA_PROFILE: sentinel },
    encoding: "utf8",
    timeout: 15000,
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Invalid CATALOG_MEDIA_PROFILE/);
  assert.equal((result.stdout + result.stderr).includes(sentinel), false);
});

test("runtime native tuning is opt-in, process-wide, and leaves defaults untouched", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
    import assert from 'node:assert/strict';
    import sharp from 'sharp';
    import {configureMediaRuntime} from './scripts/lib/catalog/media.mjs';
    const cache = sharp.cache(), threads = sharp.concurrency();
    assert.equal(configureMediaRuntime().profile, 'default');
    assert.deepEqual(sharp.cache(), cache);
    assert.equal(sharp.concurrency(), threads);
    assert.equal(configureMediaRuntime('low-memory').profile, 'low-memory');
    assert.equal(sharp.cache().memory.max, 0);
    assert.equal(sharp.cache().items.max, 0);
    assert.equal(sharp.cache().files.max, 0);
    assert.equal(sharp.concurrency(), 1);
  `,
    ],
    { cwd: root, encoding: "utf8", timeout: 15000 },
  );
  assert.equal(result.status, 0, result.stderr);
});

test("low-memory accepts the pixel boundary and rejects excess pixels without resizing", async () => {
  const image = await normalizeImage(maximum, "low-memory");
  assert.deepEqual([image.width, image.height], [2000, 1250]);
  await assert.rejects(normalizeImage(oversized, "low-memory"), (error) => {
    assert.equal(error.status, 422);
    assert.match(error.message, /2\.5-megapixel limit/);
    return true;
  });
  const original = await normalizeImage(oversized);
  assert.deepEqual([original.width, original.height], [2001, 1250]);
});

test("both profiles preserve identical normalized bytes, orientation and EXIF stripping", async () => {
  const oriented = await sharp(small)
    .jpeg()
    .withMetadata({ orientation: 6 })
    .toBuffer();
  const normal = await normalizeImage(oriented);
  const limited = await normalizeImage(oriented, "low-memory");
  assert.deepEqual(limited, normal);
  assert.deepEqual([limited.width, limited.height], [32, 48]);
  const metadata = await sharp(limited.bytes).metadata();
  assert.equal(metadata.exif, undefined);
  assert.equal(metadata.orientation, undefined);
});

test("existing larger media remains readable after opting into low-memory", async () => {
  const normal = createMediaStore(directory);
  const limited = createMediaStore(directory, { profile: "low-memory" });
  const receipt = await normal.put(oversized);
  assert.deepEqual(
    await limited.get(receipt.filename),
    await normal.get(receipt.filename),
  );
  await assert.rejects(limited.put(oversized), /2\.5-megapixel limit/);
  assert.deepEqual(
    await limited.get(receipt.filename),
    await normal.get(receipt.filename),
  );
});

test("admission rejects concurrent readers without queuing and releases slots on every failure", async () => {
  const media = createMediaStore(directory, { profile: "low-memory" });
  const admitted = Promise.withResolvers(),
    resume = Promise.withResolvers();
  const pending = media.upload(async () => {
    admitted.resolve();
    await resume.promise;
    return small;
  });
  await admitted.promise;
  try {
    let read = false;
    await assert.rejects(
      media.upload(() => {
        read = true;
        return small;
      }),
      MediaUploadBusyError,
    );
    assert.equal(read, false);
    await assert.rejects(media.put(small), MediaUploadBusyError);
  } finally {
    resume.resolve();
    await pending;
  }
  await assert.rejects(
    media.upload(() => {
      throw new Error("reader aborted");
    }),
    /reader aborted/,
  );
  await assert.rejects(media.put(oversized), /2\.5-megapixel limit/);
  await assert.rejects(media.put(Buffer.from("<svg/>")), /SVG/);
  const receipt = await media.put(small);
  const original = await media.get(receipt.filename);
  await writeFile(join(directory, receipt.filename), "checksum fault fixture");
  try {
    await assert.rejects(media.put(small), /Stored media checksum conflict/);
  } finally {
    await writeFile(join(directory, receipt.filename), original.bytes);
  }
  assert.equal((await media.put(small)).width, 48);
});

test("the default store still admits concurrent readers", async () => {
  const media = createMediaStore(directory);
  const resume = Promise.withResolvers();
  let reads = 0;
  const read = async () => {
    reads++;
    await resume.promise;
    return small;
  };
  const pending = [media.upload(read), media.upload(read)];
  try {
    assert.equal(reads, 2);
  } finally {
    resume.resolve();
    await Promise.all(pending);
  }
});

test("authenticated contracts report the actual upload policy and oversized HTTP uploads fail clearly", async () => {
  const contracts = await fixture.request("/api/contracts", {
    session: editor,
  });
  assert.equal(contracts.status, 200);
  assert.deepEqual(
    (await contracts.json()).mediaUpload,
    mediaUploadPolicy("low-memory"),
  );
  assert.equal((await fixture.request("/api/contracts")).status, 401);
  const response = await fixture.request("/api/media", {
    session: editor,
    method: "POST",
    file: oversized,
  });
  assert.equal(response.status, 422);
  assert.match((await response.json()).error.message, /2\.5-megapixel limit/);
  const next = await fixture.request("/api/media", {
    session: editor,
    method: "POST",
    file: small,
  });
  assert.equal(next.status, 201);
  assert.equal((await next.json()).width, 48);
});

const uploadHeaders = () => ({
  Origin: fixture.origin,
  Cookie: editor.cookie,
  "X-CSRF-Token": editor.csrf,
  "Content-Length": mediaUploadPolicy().maxBytes,
});
function unfinishedUploadResponse() {
  return new Promise((resolve, reject) => {
    const req = request(
      fixture.address + "/api/media",
      { method: "POST", headers: uploadHeaders() },
      (res) => {
        let text = "";
        res.setEncoding("utf8");
        res.on("data", (part) => (text += part));
        res.on("end", () => {
          try {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: JSON.parse(text),
            });
          } catch (error) {
            reject(error);
          } finally {
            req.destroy();
          }
        });
      },
    );
    req.on("error", reject);
    req.setTimeout(10000, () =>
      req.destroy(new Error("Server waited for an unadmitted upload body")),
    );
    req.flushHeaders(); // Intentionally send no body and never end the request.
  });
}

test("HTTP admission rejects before body consumption, closes the connection and preserves Auth/CSRF gates", async () => {
  const admitted = Promise.withResolvers(),
    resume = Promise.withResolvers();
  const pending = fixture.media.upload(async () => {
    admitted.resolve();
    await resume.promise;
    return small;
  });
  await admitted.promise;
  try {
    const response = await unfinishedUploadResponse();
    assert.equal(response.status, 429);
    assert.equal(response.headers.connection, "close");
    assert.equal(response.headers["retry-after"], "1");
    assert.equal(response.headers["cache-control"], "no-store");
    assert.equal(response.body.error.code, "media_busy");
    assert.equal(
      (await fixture.request("/api/media", { method: "POST", file: small }))
        .status,
      401,
    );
    assert.equal(
      (
        await fixture.request("/api/media", {
          session: editor,
          method: "POST",
          file: small,
          headers: { "X-CSRF-Token": "wrong" },
        })
      ).status,
      403,
    );
    assert.equal(
      (
        await fixture.request("/api/media", {
          session: editor,
          method: "POST",
          file: small,
          headers: { Origin: "https://other.example.invalid" },
        })
      ).status,
      403,
    );
  } finally {
    resume.resolve();
    await pending;
  }
});

test(
  "an aborted HTTP upload releases its slot and does not kill Studio",
  { timeout: 15000 },
  async () => {
    const admitted = Promise.withResolvers();
    const upload = fixture.media.upload;
    fixture.media.upload = (read) =>
      upload(() => {
        admitted.resolve();
        return read();
      });
    const req = request(fixture.address + "/api/media", {
      method: "POST",
      headers: uploadHeaders(),
    });
    req.on("error", () => {}); // The abort is intentional.
    try {
      req.write(Buffer.from([137]));
      await admitted.promise;
      req.destroy();
      let recovered = false;
      for (let attempt = 0; attempt < 100; attempt++) {
        try {
          await fixture.media.put(small);
          recovered = true;
          break;
        } catch (error) {
          assert.ok(error instanceof MediaUploadBusyError);
          await delay(20);
        }
      }
      assert.equal(recovered, true);
      assert.equal(
        (await fixture.request("/api/session", { session: editor })).status,
        200,
      );
    } finally {
      req.destroy();
      fixture.media.upload = upload;
    }
  },
);
