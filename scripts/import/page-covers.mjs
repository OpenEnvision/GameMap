import assert from "node:assert/strict";
import {
  readFile,
  writeFile,
  readdir,
  realpath,
  mkdir,
} from "node:fs/promises";
import { resolve, dirname, relative, sep } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { loadContent } from "../lib/content.mjs";
const args = process.argv.slice(2),
  option = (key, fallback) =>
    args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const root = resolve(import.meta.dirname, "../.."),
  hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const read = async (path) => JSON.parse(await readFile(path, "utf8"));
const intake = await read(
  resolve(option("--intake", ".build/page-covers/intake.json")),
);
assert.equal(intake.format, "gamemap.project-page-cover-jobs");
const workRoot = await realpath(
  resolve(
    option(
      "--work-root",
      (await read(resolve(root, ".build/page-covers/work.json"))).workRoot,
    ),
  ),
);
const reviewDirectory = resolve(
  option("--reviews", ".build/page-covers/reviewed"),
);
const context = await loadContent(),
  jobs = new Map(intake.jobs.map((job) => [job.key, job]));
const work = await read(resolve(root, ".build/page-covers/work.json"));
const baseline = await read(resolve(intake.baselinePackage, "release.json"));
const baselineRecords = new Map(
  JSON.parse(baseline.manifest_text).entries.map((entry) => [entry.key, entry]),
);
const reviewReports = await Promise.all(
  (await readdir(reviewDirectory))
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => read(resolve(reviewDirectory, file))),
);
const accepted = new Map(),
  rejected = new Map();
for (const report of reviewReports) {
  assert.equal(report.kind, "project-page-cover-review");
  assert.ok(Array.isArray(report.accepted) && Array.isArray(report.rejected));
  for (const item of report.accepted) {
    assert.ok(jobs.has(item.key), "Unknown reviewed cover key " + item.key);
    assert.ok(
      !accepted.has(item.key) && !rejected.has(item.key),
      "Duplicate cover review " + item.key,
    );
    assert.ok(item.reason && item.receipt);
    accepted.set(item.key, {
      ...item,
      reviewer: item.reviewer || report.reviewer,
      reviewedAt: item.reviewedAt || report.reviewedAt,
    });
  }
  for (const item of report.rejected) {
    assert.ok(jobs.has(item.key) && item.reason);
    assert.ok(
      !accepted.has(item.key) && !rejected.has(item.key),
      "Duplicate cover disposition " + item.key,
    );
    rejected.set(item.key, item);
  }
}
assert.ok(accepted.size, "No visually reviewed page covers to import");
const within = async (path) => {
  const actual = await realpath(path),
    rel = relative(workRoot, actual);
  assert.ok(
    rel &&
      rel !== ".." &&
      !rel.startsWith(".." + sep) &&
      !resolve(rel).startsWith("../"),
    "Capture artifact escaped assigned workspace",
  );
  return actual;
};
const writes = [],
  records = [];
for (const [key, decision] of [...accepted].sort(([a], [b]) =>
  a.localeCompare(b),
)) {
  const job = jobs.get(key),
    receiptPath = await within(decision.receipt),
    receiptBytes = await readFile(receiptPath),
    receipt = JSON.parse(receiptBytes);
  assert.equal(receipt.key, key);
  assert.equal(receipt.status, "captured-needs-review");
  assert.equal(receipt.notGameplay, true);
  const local = receipt.sourceType === "catalog-record";
  if (local) {
    assert.equal(work.approvedBlockedFallback, "catalog-record");
    const prior = baselineRecords.get(key);
    assert.deepEqual(receipt.sourceSnapshot, {
      releaseId: intake.baselineRelease,
      artifactSha256: intake.baselineArtifact,
      recordRevision: job.revisionId,
      canonicalPath: prior.canonical_path,
    });
    assert.equal(receipt.requestedURL, prior.canonical_path);
    assert.equal(receipt.finalURL, prior.canonical_path);
    assert.equal(receipt.network.requests, 0);
  } else {
    assert.ok(
      job.targets.some(
        (target) =>
          target.url === receipt.requestedURL &&
          target.type === receipt.sourceType,
      ),
    );
    const final = new URL(receipt.finalURL);
    assert.equal(final.protocol, "https:");
    assert.ok(!final.username && !final.password);
    assert.ok(
      job.targets.some(
        (target) =>
          new URL(target.url).hostname.replace(/^www\./, "") ===
          final.hostname.replace(/^www\./, ""),
      ),
      "Unrelated final cover host",
    );
  }
  assert.deepEqual(receipt.viewport, { width: 1600, height: 900 });
  const original = await readFile(await within(receipt.original.path)),
    output = await readFile(await within(receipt.output.path));
  for (const [bytes, meta] of [
    [original, receipt.original],
    [output, receipt.output],
  ]) {
    assert.equal(hash(bytes), meta.sha256);
    assert.equal(bytes.length, meta.bytes);
  }
  const originalMeta = await sharp(original, {
      limitInputPixels: 40000000,
    }).metadata(),
    outputMeta = await sharp(output, { limitInputPixels: 40000000 }).metadata();
  assert.equal(originalMeta.format, "png");
  assert.equal(originalMeta.width, 1600);
  assert.equal(originalMeta.height, 900);
  assert.equal(outputMeta.format, "webp");
  assert.equal(outputMeta.width, 1280);
  assert.equal(outputMeta.height, 720);
  // Matching aspect ratios preserve the full viewport; never crop or synthesize content.
  assert.equal(
    hash(
      await sharp(original).resize(1280, 720).webp({ quality: 84 }).toBuffer(),
    ),
    receipt.output.sha256,
  );
  const src =
    "media/page-covers/" +
    job.id +
    "-" +
    receipt.output.sha256.slice(0, 12) +
    ".webp";
  const originalSrc =
    "media/page-covers/originals/" +
    job.id +
    "-" +
    receipt.original.sha256.slice(0, 12) +
    ".png";
  const media = {
    kind: "page-cover",
    origin: local ? "catalog-page-capture" : "project-page-capture",
    sourceKind: local
      ? "catalog-record"
      : decision.sourceKind || receipt.sourceType,
    src,
    alt: local
      ? `GameMap catalog record for ${job.title}.`
      : `Project page for ${job.title}.`,
    caption: local
      ? "Captured GameMap catalog record; not an upstream page or gameplay screenshot."
      : "Captured project page; not a gameplay screenshot.",
    sourceUrl: receipt.finalURL,
    requestedUrl: receipt.requestedURL,
    capturedAt: receipt.captureDate,
    ...(local ? { sourceSnapshot: receipt.sourceSnapshot } : {}),
    width: 1280,
    height: 720,
    sha256: receipt.output.sha256,
    bytes: output.length,
    original: {
      src: originalSrc,
      sha256: receipt.original.sha256,
      bytes: original.length,
      width: 1600,
      height: 900,
    },
    rights:
      "Underlying text, logos and images retain their respective rights; no reuse permission or game verification is inferred.",
  };
  const version = job.kind === "example" ? 7 : 3;
  context.versionedContracts[job.kind][version].attachments.parse({
    pageCover: media,
  });
  records.push({
    key,
    baselineRevision: job.revisionId,
    media,
    review: {
      method: "automated-visual-page-review",
      reviewer: decision.reviewer,
      reviewedAt: decision.reviewedAt,
      reason: decision.reason,
    },
    evidence: {
      receiptSha256: hash(receiptBytes),
      pageTitle: receipt.pageTitle,
      attemptedTargets: receipt.attemptedTargets,
      reusedPilot: receipt.reusedPilot === true,
      ...(decision.fallbackReason
        ? { fallbackReason: decision.fallbackReason }
        : {}),
    },
    processing: {
      completeViewport: true,
      crop: false,
      generatedSceneContent: false,
      originalWidth: 1600,
      originalHeight: 900,
      outputWidth: 1280,
      outputHeight: 720,
    },
  });
  writes.push(
    [resolve(root, "website/public", src), output],
    [resolve(root, "website/public", originalSrc), original],
  );
}
const ledger = {
  format: "gamemap.project-page-cover-intake",
  version: 1,
  baselineRelease: intake.baselineRelease,
  baselineArtifact: intake.baselineArtifact,
  policy:
    "Author homepages first; observed repository/documentation fallback; operator-approved offline GameMap record pages for unavailable/unusable upstream captures, explicitly labeled not upstream or gameplay. Original screenshots and historical revisions preserved. No game execution or rights/source/runtime certification.",
  records,
  rejected: [...rejected.values()],
  unresolvedKeys: [...jobs.keys()].filter(
    (key) => !accepted.has(key) && !rejected.has(key),
  ),
};
const ledgerPath = resolve(root, "data/segments/project-page-covers.json");
try {
  const prior = await read(ledgerPath);
  for (const row of prior.records)
    assert.deepEqual(
      records.find((r) => r.key === row.key)?.media,
      row.media,
      "Existing cover would be overwritten; use an explicit successor revision",
    );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
if (!args.includes("--dry-run")) {
  for (const [path, bytes] of writes) {
    await mkdir(dirname(path), { recursive: true });
    try {
      assert.ok(
        (await readFile(path)).equals(bytes),
        "Immutable cover path collision",
      );
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await writeFile(path, bytes, { flag: "wx" });
    }
  }
  await writeFile(ledgerPath, JSON.stringify(ledger, null, 2) + "\n");
  await writeFile(
    resolve(root, "website/public/page-cover-sources.json"),
    JSON.stringify(
      {
        format: "gamemap.project-page-covers",
        version: 1,
        verification:
          "Public project or GameMap catalog page captures, not gameplay screenshots or source, rights, build, playability or runtime verification.",
        records: records.map(({ key, media }) => ({ key, ...media })),
      },
      null,
      2,
    ) + "\n",
  );
}
console.log(
  JSON.stringify(
    {
      dryRun: args.includes("--dry-run"),
      reviewedCovers: records.length,
      rejected: rejected.size,
      unresolved: ledger.unresolvedKeys.length,
      oldGameplayMediaUntouched: true,
      notPublished: true,
    },
    null,
    2,
  ),
);
