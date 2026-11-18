import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

// A read-only typed workflow gate. Parse the authoritative report file, never chat/footer text.
const args = process.argv.slice(2),
  option = (name, fallback) =>
    args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const reportPath = resolve(option("--report", "")),
  kind = option("--kind", "browser");
assert.ok(args.includes("--report"), "--report is required");
const report = JSON.parse(await readFile(reportPath, "utf8"));
if (kind === "review") {
  for (const field of ["checkedIds", "rejected", "qualifications", "limits"])
    assert.ok(Array.isArray(report[field]), `Missing ${field}`);
  assert.ok(["pass", "needs-fixes"].includes(report.verdict));
  assert.equal(
    new Set(report.checkedIds).size,
    report.checkedIds.length,
    "Duplicate visual-review sample",
  );
  console.log(
    JSON.stringify({
      status: "reviewed",
      reportPath,
      checkedCount: report.checkedIds.length,
      rejectedCount: report.rejected.length,
      verdict: report.verdict,
    }),
  );
} else {
  assert.ok(
    Array.isArray(report.accepted) && Array.isArray(report.missing),
    "Full accepted/missing decisions are required",
  );
  const expected =
    kind === "visual"
      ? JSON.parse(await readFile(report.manifestPath, "utf8")).jobs.map(
          (row) => row.id,
        )
      : report.assignedIds;
  assert.ok(Array.isArray(expected), "Assigned scope is required");
  const ids = [...report.accepted, ...report.missing].map((row) => row.id);
  assert.equal(
    new Set(ids).size,
    ids.length,
    "A game cannot have duplicate or conflicting decisions",
  );
  assert.deepEqual(
    [...ids].sort(),
    [...expected].sort(),
    "Report does not cover its assigned scope",
  );
  for (const row of report.accepted) {
    assert.ok(["creator-screenshot", "browser-capture"].includes(row.origin));
    assert.ok(
      row.alt?.trim() && row.caption?.trim() && row.observed?.trim(),
      "Visual evidence text is required",
    );
    if (row.origin === "creator-screenshot")
      assert.ok(
        Number.isInteger(row.candidateIndex) && row.candidateIndex >= 0,
      );
    else assert.ok(row.captureReportPath && Number.isInteger(row.frameIndex));
  }
  for (const row of report.missing)
    assert.ok(row.reason?.trim(), "Explain every missing screenshot");
  console.log(
    JSON.stringify({
      status: "reviewed",
      reportPath,
      processed: ids.length,
      acceptedCount: report.accepted.length,
      missingCount: report.missing.length,
    }),
  );
}
