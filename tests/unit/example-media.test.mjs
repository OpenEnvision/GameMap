import { test } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import {
  readFile,
  mkdtemp,
  mkdir,
  symlink,
  rm,
  realpath,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { completeGIFPrefix } from "../../scripts/lib/gif-frames.mjs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { loadContent } from "../../scripts/lib/content.mjs";
import {
  publicMediaURL,
  extractCreatorImages,
  imageOriginAllowed,
  rawReadmeURL,
  reviewFrame,
  normalizeScreenshot,
  workspaceOutputPath,
} from "../../scripts/lib/example-media.mjs";

test("scratch output accepts real workspace aliases but rejects symlinks escaping the workspace", async () => {
  const base = await mkdtemp(join(tmpdir(), "gamemap-media-output-"));
  try {
    const workspace = join(base, "workspace"),
      outside = join(base, "outside"),
      alias = join(base, "alias");
    await mkdir(workspace);
    await mkdir(outside);
    await symlink(
      workspace,
      alias,
      process.platform === "win32" ? "junction" : "dir",
    );
    await symlink(
      outside,
      join(workspace, "escape"),
      process.platform === "win32" ? "junction" : "dir",
    );
    assert.equal(
      await workspaceOutputPath(join(alias, "new", "frames"), workspace),
      join(await realpath(workspace), "new", "frames"),
    );
    await assert.rejects(
      workspaceOutputPath(join(workspace, "escape", "frames"), workspace),
      /assigned working directory/,
    );
    await assert.rejects(
      workspaceOutputPath(
        join(workspace, "..", "outside", "frames"),
        workspace,
      ),
      /assigned working directory/,
    );
  } finally {
    await rm(base, { recursive: true, force: true });
  }
});

test("bounded GIF extraction retains only whole original frames without inventing incomplete image data", () => {
  const single = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64",
  );
  const header = single.subarray(0, 19),
    frame = single.subarray(19, -1);
  const two = Buffer.concat([header, frame, frame, Buffer.from([0x3b])]);
  const full = completeGIFPrefix(two);
  assert.equal(full.frames, 2);
  assert.equal(full.complete, true);
  assert.deepEqual(full.bytes, two);
  const prefix = completeGIFPrefix(two.subarray(0, two.length - 5));
  assert.equal(prefix.frames, 1);
  assert.equal(prefix.complete, false);
  assert.deepEqual(prefix.bytes, single);
  assert.throws(() => completeGIFPrefix(single.subarray(0, 20)), /No complete/);
  assert.throws(
    () => completeGIFPrefix(Buffer.from("<html>not image</html>")),
    /GIF header/,
  );
});

test("screenshot URLs reject credentials, non-HTTPS and local/private networks", () => {
  for (const value of [
    "http://author.itch.io/game",
    "file:///etc/passwd",
    "https://u:p@example.org/x",
    "https://localhost/a",
    "https://a.local/a",
    "https://127.0.0.1/a",
    "https://10.0.0.2/a",
    "https://192.168.0.2/a",
    "https://169.254.169.254/a",
    "https://[::1]/a",
    "https://[::ffff:127.0.0.1]/a",
  ])
    assert.throws(() => publicMediaURL(value));
  assert.equal(
    publicMediaURL("https://img.itch.zone/image.png").hostname,
    "img.itch.zone",
  );
});

test("creator gallery originals are selected without promoting covers or logos", () => {
  const html =
    '<meta property="og:image" content="https://img.itch.zone/cover.png"><img src="logo.png"><a data-image_lightbox="true" href="https://img.itch.zone/image/original/game.png"><img class="screenshot" src="https://img.itch.zone/image/347x500/game.png"></a>';
  assert.deepEqual(extractCreatorImages(html, "https://author.itch.io/game"), [
    {
      url: "https://img.itch.zone/image/original/game.png",
      sourceUrl: "https://author.itch.io/game",
      kind: "author-screenshot-gallery",
    },
  ]);
  assert.deepEqual(
    extractCreatorImages(
      '<meta property="og:image" content="cover.png"><img src="logo.png">',
      "https://author.itch.io/game",
    ),
    [],
  );
});

test("creator-description images survive gallery deduplication while comment attachments remain excluded", () => {
  const html =
    '<a class="screenshot_link" href="https://img.itch.zone/gallery/original/frame.png"><img class="screenshot" src="https://img.itch.zone/gallery/347x500/frame.png"></a><div class="formatted_description user_formatted"><img src="https://img.itch.zone/description/original/play.gif"></div><div class="comment_body user_formatted"><img src="https://img.itch.zone/comment/original/fan.png"></div>';
  const result = extractCreatorImages(html, "https://author.itch.io/game");
  assert.equal(result.length, 2);
  assert.equal(
    result[0].url,
    "https://img.itch.zone/gallery/original/frame.png",
  );
  assert.equal(
    result[1].url,
    "https://img.itch.zone/description/original/play.gif",
  );
  assert.equal(result[1].kind, "creator-description-image-needs-visual-review");
});

test("README images retain actual relative paths and need visual review", () => {
  const url = rawReadmeURL(
    "https://github.com/author/game/blob/main/README.md",
  );
  assert.equal(
    url,
    "https://raw.githubusercontent.com/author/game/main/README.md",
  );
  const result = extractCreatorImages(
    "![Gameplay](screens/game.png)\n![Logo](logo.svg)",
    url,
  );
  assert.equal(result.length, 1);
  assert.equal(
    result[0].url,
    "https://raw.githubusercontent.com/author/game/main/screens/game.png",
  );
  assert.equal(result[0].kind, "readme-image-needs-visual-review");
});

test("raw README HTML gameplay images are retained alongside Markdown images", () => {
  const url = "https://raw.githubusercontent.com/author/game/main/README.md";
  const image =
    "https://github.com/user-attachments/assets/e29d49a8-bd7b-42cd-966d-fc32a2a999cd";
  const rows = extractCreatorImages(
    `### Gameplay\n<img width="963" alt="gameplay" src="${image}" />`,
    url,
  );
  assert.deepEqual(rows, [
    { url: image, sourceUrl: url, kind: "readme-image-needs-visual-review" },
  ]);
  assert.equal(
    imageOriginAllowed(
      "https://github-production-user-asset-6210df.s3.amazonaws.com/shot.png",
      url,
    ),
    true,
  );
  assert.equal(
    imageOriginAllowed(
      "https://unrelated-bucket.s3.amazonaws.com/shot.png",
      url,
    ),
    false,
  );
});

test("only trusted image CDNs or the actual primary-source origin can be downloaded", () => {
  assert.equal(
    imageOriginAllowed(
      "https://img.itch.zone/game.png",
      "https://author.itch.io/game",
    ),
    true,
  );
  assert.equal(
    imageOriginAllowed(
      "https://author.example.org/shot.png",
      "https://author.example.org/game",
    ),
    true,
  );
  assert.equal(
    imageOriginAllowed(
      "https://unrelated.example.org/shot.png",
      "https://author.example.org/game",
    ),
    false,
  );
  assert.equal(
    imageOriginAllowed(
      "https://shared.fastly.steamstatic.com/game.jpg",
      "https://store.steampowered.com/app/123",
    ),
    true,
  );
  assert.equal(
    imageOriginAllowed(
      "https://static.ldjam.com/content/frame.jpg",
      "https://ldjam.com/events/ludum-dare/54/game",
    ),
    true,
  );
  assert.equal(
    imageOriginAllowed(
      "https://static.ldjam.com/content/frame.jpg",
      "https://api.ldjam.com/vx/node2/get/411776",
    ),
    true,
  );
  assert.equal(
    imageOriginAllowed(
      "https://static.ldjam.com/content/frame.jpg",
      "https://unrelated.example.org/game",
    ),
    false,
  );
});

test("HTML, SVG and tiny badges cannot pass the raster screenshot decoder", async () => {
  await assert.rejects(
    reviewFrame(Buffer.from("<html>rate limited</html>")),
    /not decoded/,
  );
  await assert.rejects(
    reviewFrame(Buffer.from('<svg width="1280" height="720"></svg>')),
    /not decoded/,
  );
  const badge = await sharp({
    create: { width: 80, height: 20, channels: 3, background: "red" },
  })
    .png()
    .toBuffer();
  await assert.rejects(reviewFrame(badge), /too small/);
});

test("published community screenshots keep source attribution, file checksums and explicit gaps", async () => {
  const path = "data/segments/jam-game-media.json";
  const text = await readFile(path, "utf8"),
    ledger = JSON.parse(text),
    context = await loadContent();
  assert.equal(
    await readFile("website/public/game-screenshot-sources.json", "utf8"),
    text,
  );
  const ids = new Set();
  for (const row of ledger.records) {
    assert.ok(!ids.has(row.id));
    ids.add(row.id);
    const entry = context.registry.require("example", row.id);
    assert.deepEqual(context.sources.learningMedia[row.id], row.media);
    assert.equal(row.processing.fit, "contain");
    assert.equal(row.processing.crop, false);
    assert.equal(row.processing.generatedSceneContent, false);
    const bytes = await readFile("website/public/" + row.media.src),
      metadata = await sharp(bytes).metadata();
    assert.equal(row.sha256, createHash("sha256").update(bytes).digest("hex"));
    assert.equal(row.bytes, bytes.length);
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, 1280);
    assert.equal(metadata.height, 720);
    if (row.media.origin === "creator-screenshot") {
      publicMediaURL(row.media.originalImageUrl);
      assert.ok(row.media.reviewedAt);
      assert.equal(row.media.capturedAt, undefined);
    } else {
      assert.equal(row.media.origin, "browser-capture");
      assert.equal(row.media.sourceUrl, entry.data.demo.url);
      assert.equal(row.evidence.browserSandbox, true);
      assert.ok(row.media.capturedAt);
    }
  }
  for (const row of ledger.missing) {
    context.registry.require("example", row.id);
    assert.ok(!ids.has(row.id));
    assert.ok(row.reason?.trim());
    ids.add(row.id);
  }
  if (ledger.scopeIds) assert.deepEqual([...ids].sort(), ledger.scopeIds);
  const module =
    context.sourceModules["website/src/data/jamGameMedia.ts"].jamGameMedia;
  assert.deepEqual(
    Object.keys(module).sort(),
    ledger.records.map((row) => row.id).sort(),
  );
});

test("normalization preserves the entire source frame in a 16:9 WebP rather than cropping", async () => {
  const source = await sharp({
    create: { width: 400, height: 400, channels: 3, background: "red" },
  })
    .png()
    .toBuffer();
  const frame = await reviewFrame(source);
  assert.equal(frame.width, 400);
  assert.equal(frame.height, 400);
  assert.equal(frame.frameIndex, 0);
  const result = await normalizeScreenshot(frame.png);
  const metadata = await sharp(result).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 1280);
  assert.equal(metadata.height, 720);
  const { data, info } = await sharp(result)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixel = (x, y) => [
    ...data.subarray(
      (y * info.width + x) * info.channels,
      (y * info.width + x) * info.channels + 3,
    ),
  ];
  assert.ok(
    pixel(0, 0).every((v) => v < 35),
    "Letterbox retains the complete square source",
  );
  assert.ok(pixel(640, 360)[0] > 240 && pixel(640, 360)[1] < 15);
});
