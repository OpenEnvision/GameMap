import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const canonical = await readFile(new URL("data/papers.json", root));
const papers = JSON.parse(canonical);
const proofPath = new URL("website/public/papers-provenance.json", root);
const catalogPath = new URL("website/content/paper-catalog.json", root);
const [proof, catalog] = await Promise.all([proofPath, catalogPath].map(async (path) => JSON.parse(await readFile(path, "utf8"))));
const knownCode = new Set(["open-source", "source-available", "restricted"]);
const published = (paper) => knownCode.has(paper.access?.codeStatus)
  && paper.access.repositories.some((repository) => !["research-index", "materials"].includes(repository.kind));
const tally = (values) => Object.fromEntries([...new Set(values)].sort().map((value) => [value, values.filter((item) => item === value).length]));
const accessCounts = {
  records: papers.length,
  reviewed: papers.filter((paper) => paper.access?.reviewStatus === "source-reviewed").length,
  byCodeStatus: tally(papers.map((paper) => paper.access?.codeStatus || "unverified")),
  publishedCode: papers.filter(published).length,
  openSourceCode: papers.filter((paper) => published(paper) && paper.access.codeStatus === "open-source").length,
  projectPages: papers.filter((paper) => paper.access?.projects.length).length,
  onlineDemos: papers.filter((paper) => paper.access?.demos.some((demo) => demo.kind === "interactive")).length,
  publicOnlineDemos: papers.filter((paper) => paper.access?.demos.some((demo) => demo.kind === "interactive" && demo.access === "public")).length,
  localOrDownload: papers.filter((paper) => paper.access?.demos.some((demo) => demo.kind === "local" || demo.kind === "download")).length,
};
const canonicalDataset = { path: "papers.json", bytes: canonical.length,
  sha256: createHash("sha256").update(canonical).digest("hex") };
proof.canonicalDataset = canonicalDataset;
catalog.canonicalDataset = canonicalDataset;
catalog.accessCounts = accessCounts;
proof.artifactReview = {
  schemaVersion: 1,
  checkedAt: [...new Set(papers.map((paper) => paper.access?.checkedAt).filter(Boolean))].sort().at(-1) || null,
  counts: accessCounts,
  policy: "Author publications, author-linked projects, repository contents and license texts establish the association and release scope. Survey-author resource mappings are candidate sources, not license proof. Public source without an established open-source software license is separate from open source. Placeholder and bibliography/material-only repositories do not count as published implementation code. Online entries exclude known paused/error Spaces, videos, leaderboards and dataset browsers. Local-run entries require actual application/inference/play instructions; code was not executed. No-result and inaccessible-source states do not establish that a work is closed source.",
};
const byId = new Map(papers.map((paper) => [paper.id, paper]));
for (const record of proof.records) {
  const access = byId.get(record.recordId)?.access;
  if (access) record.artifactReview = { codeStatus: access.codeStatus, reviewStatus: access.reviewStatus,
    checkedAt: access.checkedAt, evidenceUrls: [...new Set(access.evidence.map((item) => item.url))] };
}
const update = async (path, value) => {
  const next = Buffer.isBuffer(value) ? value : Buffer.from(JSON.stringify(value, null, 2) + "\n");
  let previous;
  try { previous = await readFile(path); } catch (error) { if (error.code !== "ENOENT") throw error; }
  if (!previous?.equals(next)) await writeFile(path, next);
};
await update(new URL("website/public/papers.json", root), canonical);
await update(proofPath, proof);
await update(catalogPath, catalog);
console.log(`Paper exports synchronized: ${papers.length} references with code, project and demo metadata.`);
