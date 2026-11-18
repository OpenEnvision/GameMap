import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, realpath } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";
import { createHash } from "node:crypto";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { workspaceOutputPath } from "../lib/example-media.mjs";
import { verifySiteArtifact } from "../lib/catalog/site-build.mjs";

// This is a trusted, offline GameMap-artifact renderer, NOT an exception to the
// public-network capture helper. No HTTP request, DNS lookup or login occurs.
const args = process.argv.slice(2),
  option = (key, fallback) =>
    args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const input = JSON.parse(
  await readFile(resolve(option("--input", "input.json")), "utf8"),
);
assert.equal(input.format, "gamemap.catalog-page-cover-jobs");
assert.equal(input.userApprovedCatalogFallback, true);
const out = await workspaceOutputPath(option("--out", process.cwd()));
assert.ok(
  !/\/(?:website|data|docs)\//.test(out + "/"),
  "Do not capture into publication/source directories",
);
await mkdir(out, { recursive: true });
const evidence = await verifySiteArtifact(resolve(input.artifactDirectory));
assert.equal(evidence.format, "gamemap.site-artifact");
assert.equal(evidence.release, input.baselineRelease);
assert.equal(evidence.artifactDigest, input.baselineArtifact);
assert.equal(evidence.realm.environment, "local");
const pack = JSON.parse(
  await readFile(resolve(input.baselinePackage, "release.json"), "utf8"),
);
assert.equal(pack.id, evidence.release);
assert.equal(pack.manifest_digest, evidence.manifestDigest);
assert.equal(pack.context_digest, evidence.contextDigest);
const records = new Map(
  JSON.parse(pack.manifest_text).entries.map((entry) => [entry.key, entry]),
);
const files = new Map(evidence.files.map((file) => [file.path, file]));
const site = await realpath(resolve(input.artifactDirectory, "site"));
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};
const cache = new Map();
const results = [];
const origin = "http://127.0.0.1:4191"; // Display address only: browser is offline and every byte is fulfilled from the pinned artifact.
const browser = await chromium.launch({
  headless: true,
  chromiumSandbox: true,
  args: [
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--no-first-run",
  ],
});
try {
  assert.equal(
    new Set(input.jobs.map((job) => job.key)).size,
    input.jobs.length,
  );
  for (const job of input.jobs) {
    const filename = out + "/" + digest(job.key).slice(0, 24) + ".receipt.json";
    let receipt;
    try {
      receipt = JSON.parse(await readFile(filename, "utf8"));
      assert.equal(receipt.key, job.key);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (!receipt) {
      const record = records.get(job.key);
      assert.ok(
        record &&
          ["example", "foundation", "threejs-game"].includes(record.kind),
      );
      assert.ok(
        !record.body.attachments.learningMedia &&
          !record.body.attachments.pageCover,
      );
      assert.equal(record.revision_id, job.revisionId);
      assert.equal(record.canonical_path, job.canonicalPath);
      assert.match(
        job.canonicalPath,
        /^\/(?:examples|threejs-games)\/[a-z0-9-]+\/$/,
      );
      const context = await browser.newContext({
        viewport: { width: 1600, height: 900 },
        deviceScaleFactor: 1,
        javaScriptEnabled: false,
        offline: true,
        serviceWorkers: "block",
        acceptDownloads: false,
        permissions: [],
        reducedMotion: "reduce",
      });
      const blocked = [],
        delivered = [];
      try {
        const page = await context.newPage();
        await context.routeWebSocket("**/*", (socket) => socket.close());
        await context.route("**/*", async (route) => {
          try {
            const request = route.request(),
              url = new URL(request.url()),
              type = request.resourceType();
            assert.equal(url.origin, origin);
            assert.equal(request.method(), "GET");
            assert.equal(request.frame(), page.mainFrame());
            assert.ok(
              ["document", "stylesheet", "font", "image"].includes(type),
            );
            if (type === "document")
              assert.equal(url.pathname, job.canonicalPath);
            const pathname = decodeURIComponent(url.pathname),
              path =
                pathname.replace(/^\//, "") +
                (pathname.endsWith("/") ? "index.html" : "");
            assert.ok(files.has(path), "Not a frozen public artifact file");
            const actual = await realpath(resolve(site, path)),
              rel = relative(site, actual);
            assert.ok(rel && rel !== ".." && !rel.startsWith(".." + sep));
            const extension = actual
              .slice(actual.lastIndexOf("."))
              .toLowerCase();
            assert.ok(
              mime[extension],
              "No active/JSON/binary artifact resources",
            );
            let bytes = cache.get(path);
            if (!bytes) {
              bytes = await readFile(actual);
              assert.equal(digest(bytes), files.get(path).sha256);
              assert.equal(bytes.length, files.get(path).bytes);
              assert.ok(bytes.length <= 4000000);
              cache.set(path, bytes);
            }
            delivered.push({
              path,
              bytes: bytes.length,
              sha256: files.get(path).sha256,
            });
            assert.ok(
              delivered.length <= 48 &&
                delivered.reduce((sum, file) => sum + file.bytes, 0) <=
                  20000000,
            );
            await route.fulfill({
              status: 200,
              contentType: mime[extension],
              headers: {
                "content-security-policy":
                  "default-src 'none'; script-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'none'; frame-src 'none'; object-src 'none'; media-src 'none'; form-action 'none'",
              },
              body: bytes,
            });
          } catch (error) {
            blocked.push({ url: route.request().url(), reason: error.message });
            await route.abort().catch(() => {});
          }
        });
        await page.goto(origin + job.canonicalPath, {
          waitUntil: "load",
          timeout: 15000,
        });
        assert.equal(
          await page.locator(`[data-content-key="${job.key}"]`).count(),
          1,
        );
        assert.ok((await page.locator("h1").innerText()).trim());
        const png = await page.screenshot({ fullPage: false, timeout: 15000 });
        const metadata = await sharp(png).metadata();
        assert.equal(metadata.width, 1600);
        assert.equal(metadata.height, 900);
        const stats = await sharp(png).stats();
        assert.ok(
          stats.channels.slice(0, 3).some((channel) => channel.stdev >= 2),
        );
        const webp = await sharp(png)
          .resize(1280, 720)
          .webp({ quality: 84 })
          .toBuffer();
        const id = digest(job.key).slice(0, 24),
          originalPath = out + "/" + id + ".png",
          outputPath = out + "/" + id + ".webp";
        await writeFile(originalPath, png);
        await writeFile(outputPath, webp);
        receipt = {
          key: job.key,
          id: job.id,
          title: job.title,
          status: "captured-needs-review",
          notGameplay: true,
          recordType: "project-page-cover",
          sourceType: "catalog-record",
          requestedURL: job.canonicalPath,
          finalURL: job.canonicalPath,
          pageTitle: await page.title(),
          captureDate: new Date().toISOString(),
          viewport: { width: 1600, height: 900 },
          sourceSnapshot: {
            releaseId: evidence.release,
            artifactSha256: evidence.artifactDigest,
            recordRevision: record.revision_id,
            canonicalPath: record.canonical_path,
          },
          original: {
            path: originalPath,
            bytes: png.length,
            sha256: digest(png),
          },
          output: {
            path: outputPath,
            bytes: webp.length,
            sha256: digest(webp),
          },
          attemptedTargets: [
            {
              url: job.canonicalPath,
              type: "catalog-record",
              status: "captured-needs-review",
            },
          ],
          network: { requests: 0, bytes: 0 },
          offlineArtifactFiles: delivered,
          blockedRequests: blocked,
          inferences:
            "GameMap record screenshot, not an upstream homepage, gameplay or rights/source/runtime verification.",
        };
        await writeFile(filename, JSON.stringify(receipt, null, 2) + "\n");
      } finally {
        await context.close();
      }
    }
    results.push(receipt);
    const temp = out + "/decisions.json.tmp";
    await writeFile(temp, JSON.stringify(results, null, 2) + "\n");
    const { rename } = await import("node:fs/promises");
    await rename(temp, out + "/decisions.json");
  }
} finally {
  await browser.close();
}
console.log(
  JSON.stringify({
    processed: results.length,
    source: "frozen-GameMap-records",
    externalNetworkRequests: 0,
    needsVisualReview: true,
  }),
);
