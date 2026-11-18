import assert from "node:assert/strict";
import { parse } from "parse5";
import sharp from "sharp";
import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";
import { realpath } from "node:fs/promises";
import { resolve, dirname, basename, sep } from "node:path";

export async function workspaceOutputPath(value, cwd = process.cwd()) {
  const root = await realpath(cwd),
    tail = [];
  let parent = resolve(value),
    out;
  while (true) {
    try {
      out = resolve(await realpath(parent), ...tail);
      break;
    } catch (error) {
      if (error.code !== "ENOENT" || parent === dirname(parent)) throw error;
      tail.unshift(basename(parent));
      parent = dirname(parent);
    }
  }
  assert.ok(
    out === root || out.startsWith(root + sep),
    "Output must stay in the assigned working directory",
  );
  return out;
}

const privateAddresses = new BlockList();
for (const [address, bits] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
]) {
  privateAddresses.addSubnet(address, bits, "ipv4");
  privateAddresses.addSubnet(`::ffff:${address}`, 96 + bits, "ipv6");
}
for (const [address, bits] of [
  ["::", 128],
  ["::1", 128],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
])
  privateAddresses.addSubnet(address, bits, "ipv6");
export function publicMediaURL(value) {
  const url = new URL(value);
  assert.equal(url.protocol, "https:", "Only public HTTPS media is allowed");
  assert.ok(
    !url.username && !url.password,
    "Embedded credentials are forbidden",
  );
  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  assert.ok(
    !["localhost", "metadata.google.internal"].includes(host) &&
      !host.endsWith(".localhost") &&
      !host.endsWith(".local"),
    "Private hosts are forbidden",
  );
  const family = isIP(host);
  if (family)
    assert.ok(
      !privateAddresses.check(host, family === 4 ? "ipv4" : "ipv6"),
      "Private addresses are forbidden",
    );
  return url;
}
const dnsCache = new Map();
export async function assertPublicMediaHost(value) {
  const url = publicMediaURL(value),
    host = url.hostname.replace(/^\[|\]$/g, "");
  if (!dnsCache.has(host))
    dnsCache.set(
      host,
      lookup(host, { all: true }).then((addresses) => {
        assert.ok(addresses.length, "Host did not resolve");
        for (const { address, family } of addresses)
          assert.ok(
            !privateAddresses.check(address, family === 4 ? "ipv4" : "ipv6"),
            "Host resolves to a private address",
          );
        return true;
      }),
    );
  await dnsCache.get(host);
  return url;
}
const attrs = (node) =>
  Object.fromEntries(
    (node.attrs || []).map(({ name, value }) => [name, value]),
  );
function walk(node, callback, parents = []) {
  callback(node, parents);
  for (const child of node.childNodes || [])
    walk(child, callback, [...parents, node]);
}
export function rawReadmeURL(value) {
  const u = publicMediaURL(value);
  if (u.hostname === "github.com")
    ((u.hostname = "raw.githubusercontent.com"),
      (u.pathname = u.pathname.replace("/blob/", "/")));
  return u.href;
}
export function extractCreatorImages(body, pageURL) {
  const page = publicMediaURL(pageURL),
    results = [],
    seen = new Set();
  const add = (value, kind) => {
    try {
      const url = publicMediaURL(new URL(value, page).href);
      if (/\.svg(?:$|\?)/i.test(url.href) || seen.has(url.href)) return;
      seen.add(url.href);
      results.push({ url: url.href, sourceUrl: page.href, kind });
    } catch {}
  };
  const markdownPage = /\.md(?:$|[?#])/i.test(page.pathname);
  if (markdownPage) {
    for (const match of body.matchAll(
      /!\[[^\]]*\]\(<?([^\s)>]+)>?(?:\s+['"][^)]*)?\)/g,
    ))
      add(match[1], "readme-image-needs-visual-review");
  }
  const tree = parse(body);
  walk(tree, (node, parents) => {
    const a = attrs(node),
      parentClasses = parents.map((p) => attrs(p).class || "").join(" ");
    if (
      node.tagName === "a" &&
      (a["data-image_lightbox"] === "true" ||
        /screenshot_link/.test(a.class || "")) &&
      a.href
    )
      add(a.href, "author-screenshot-gallery");
    if (node.tagName === "img") {
      const src = a["data-canonical-src"] || a["data-src"] || a.src;
      if (!src) return;
      const screenshot = /screenshot/.test(`${a.class || ""} ${parentClasses}`);
      const steamShot = /steam/.test(page.hostname) && /ss_[a-f0-9]/i.test(src);
      const readme =
        markdownPage || /markdown-body|entry-content/.test(parentClasses);
      const description = /formatted_description/.test(parentClasses);
      // Author descriptions can embed gameplay outside the gallery. Comment images
      // and og:image remain excluded; every retained candidate still needs visual review.
      if (screenshot || steamShot || readme || description)
        add(
          src,
          screenshot || steamShot
            ? "author-screenshot-gallery"
            : description
              ? "creator-description-image-needs-visual-review"
              : "readme-image-needs-visual-review",
        );
    }
  });
  // Prefer the explicitly linked original over its gallery thumbnail.
  const originals = results.filter(
    (r) => r.kind === "author-screenshot-gallery" && /\/original\//.test(r.url),
  );
  if (originals.length) {
    const assetKey = (value) => {
      const u = new URL(value);
      return u.hostname + "/" + u.pathname.split("/").filter(Boolean)[0];
    };
    const keys = new Set(originals.map((r) => assetKey(r.url)));
    return [
      ...originals,
      ...results.filter(
        (r) =>
          !originals.includes(r) &&
          !(
            r.kind === "author-screenshot-gallery" &&
            new URL(r.url).hostname === "img.itch.zone" &&
            keys.has(assetKey(r.url))
          ),
      ),
    ];
  }
  return results;
}
export function imageOriginAllowed(value, sourceURL) {
  const u = publicMediaURL(value),
    source = publicMediaURL(sourceURL);
  return (
    u.origin === source.origin ||
    (u.hostname === "static.ldjam.com" &&
      (source.hostname === "ldjam.com" ||
        source.hostname.endsWith(".ldjam.com"))) ||
    [
      "img.itch.zone",
      "raw.githubusercontent.com",
      "media.githubusercontent.com",
      "user-images.githubusercontent.com",
      "private-user-images.githubusercontent.com",
      "objects.githubusercontent.com",
      "release-assets.githubusercontent.com",
      "github-production-user-asset-6210df.s3.amazonaws.com",
      "github.com",
      "i.imgur.com",
      "steamcdn-a.akamaihd.net",
    ].includes(u.hostname) ||
    u.hostname.endsWith(".steamstatic.com") ||
    u.hostname.endsWith(".steamusercontent.com")
  );
}
export async function reviewFrame(bytes) {
  const raster =
    bytes
      .subarray(0, 8)
      .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
    bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255])) ||
    /^GIF8[79]a/.test(bytes.toString("ascii", 0, 6)) ||
    (bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP");
  assert.ok(
    raster,
    "Not a supported raster screenshot; HTML/SVG are not decoded",
  );
  const meta = await sharp(bytes, { limitInputPixels: 40_000_000 }).metadata();
  assert.ok(
    ["png", "jpeg", "webp", "gif"].includes(meta.format),
    "Not a raster screenshot",
  );
  const sourceHeight = meta.pageHeight || meta.height;
  assert.ok(
    meta.width >= 160 && sourceHeight >= 90,
    "Image too small to review as gameplay",
  );
  const frameIndex = meta.pages > 1 ? Math.floor(meta.pages / 2) : 0;
  const png = await sharp(bytes, {
    page: frameIndex,
    pages: 1,
    limitInputPixels: 40_000_000,
  })
    .rotate()
    .png()
    .toBuffer();
  return {
    png,
    width: meta.width,
    height: sourceHeight,
    originalFormat: meta.format,
    frameIndex,
    frames: meta.pages || 1,
  };
}
export async function normalizeScreenshot(bytes) {
  return sharp(bytes, { limitInputPixels: 40_000_000 })
    .rotate()
    .resize(1280, 720, {
      fit: "contain",
      background: { r: 20, g: 22, b: 27, alpha: 1 },
    })
    .flatten({ background: "#14161b" })
    .webp({ quality: 84 })
    .toBuffer();
}
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
export async function makeContactSheet(tiles) {
  const columns = 4,
    width = 400,
    height = 260,
    rows = Math.ceil(tiles.length / columns),
    images = [];
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i],
      left = (i % columns) * width,
      top = Math.floor(i / columns) * height;
    images.push({
      input: await sharp(tile.file, { limitInputPixels: 40_000_000 })
        .resize(width, 225, { fit: "contain", background: "#14161b" })
        .png()
        .toBuffer(),
      left,
      top,
    });
    const label = `${tile.id} #${tile.index}`;
    const svg = Buffer.from(
      `<svg width="400" height="35"><rect width="400" height="35" fill="#fff"/><text x="5" y="22" font-size="12" font-family="sans-serif" fill="#111">${escape(label)}</text></svg>`,
    );
    images.push({ input: svg, left, top: top + 225 });
  }
  return sharp({
    create: {
      width: columns * width,
      height: Math.max(1, rows) * height,
      channels: 3,
      background: "#eee",
    },
  })
    .composite(images)
    .jpeg({ quality: 87 })
    .toBuffer();
}
