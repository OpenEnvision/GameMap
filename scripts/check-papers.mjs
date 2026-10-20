import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import {
  paperCodeStatuses, paperRepositoryKinds, paperLicenseStatuses,
  paperDemoKinds, paperDemoAccess, publishedRepositories, hasOpenSourceCode,
} from "../website/content/paper-access.ts";

const root = new URL("../", import.meta.url);
const paths = [
  "data/papers.json",
  "website/public/papers.json",
  "website/public/papers-provenance.json",
  "website/content/paper-catalog.json",
  "website/public/papers.bib",
];
const [canonical, download, proofFile, catalogFile, bibFile] = await Promise.all(
  paths.map((path) => readFile(new URL(path, root))),
);
const papers = JSON.parse(canonical);
const proof = JSON.parse(proofFile);
const catalog = JSON.parse(catalogFile);
const academicTypes = new Set([
  "conference-paper", "journal-paper", "preprint", "survey", "technical-report",
]);
const academic = papers.filter((paper) => academicTypes.has(paper.referenceType));
const normalizeTitle = (title) => title.normalize("NFKD")
  .replace(/[^\x00-\x7f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const normalizeDoi = (doi) => doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")
  .replace(/\.$/, "").toLowerCase();
const unique = (values, label) => {
  assert.equal(new Set(values).size, values.length, `Duplicate ${label}`);
};
const sameSet = (actual, expected, label) => {
  unique(actual, label);
  assert.deepEqual([...actual].sort(), [...expected].sort(), label);
};
const tally = (values) => Object.fromEntries(
  [...new Set(values)].sort().map((value) => [value, values.filter((x) => x === value).length]),
);
const httpUrl = (url) => {
  assert.equal(typeof url, "string");
  assert.ok(["https:", "http:"].includes(new URL(url).protocol), `Invalid URL: ${url}`);
};
const nonemptyText = (value, label) => {
  assert.equal(typeof value, "string", `${label} must be text`);
  assert.ok(value.trim(), `${label} must not be empty`);
  assert.equal(value, value.trim(), `${label} must not have surrounding whitespace`);
};
const exactKeys = (value, required, optional, label) => {
  assert.ok(value && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  for (const key of required) assert.ok(Object.hasOwn(value, key), `${label} missing ${key}`);
  const allowed = new Set([...required, ...optional]);
  for (const key of Object.keys(value)) assert.ok(allowed.has(key), `${label} has unknown field ${key}`);
};
const httpsUrl = (value, label) => {
  nonemptyText(value, label);
  const url = new URL(value);
  assert.equal(url.protocol, "https:", `${label} must use HTTPS: ${value}`);
  assert.ok(url.hostname && !url.username && !url.password, `${label} must be a public URL without credentials`);
  return url;
};
const checkedDate = (value, label) => {
  assert.equal(typeof value, "string", `${label} must be a date`);
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${label} must use YYYY-MM-DD`);
  const date = new Date(`${value}T00:00:00.000Z`);
  assert.ok(Number.isFinite(date.valueOf()), `${label} must be a valid calendar date`);
  assert.equal(date.toISOString().slice(0, 10), value, `${label} must be a valid calendar date`);
};
const validEnum = (value, choices, label) => assert.ok(
  typeof value === "string" && Object.hasOwn(choices, value), `${label} is invalid: ${value}`,
);
const substantiveKinds = new Set(["implementation", "partial", "benchmark", "data-tools"]);
const releasedCodeStatuses = new Set(["open-source", "source-available", "restricted"]);
const normalizedUrl = (value) => {
  const url = new URL(value);
  // Trailing slashes do not make the same linked artifact a second resource.
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  return url.href;
};
const documentUrl = (value) => {
  const url = new URL(normalizedUrl(value));
  url.hash = "";
  return url.href;
};
const linkRecord = (item, label) => {
  exactKeys(item, ["label", "url"], [], label);
  nonemptyText(item.label, `${label} label`);
  httpsUrl(item.url, `${label} URL`);
};

// This dated audit is deliberately narrow: a future, newly checked release may
// restore an app, but a catalog entry using this audit must not advertise it as live.
const unavailableDemoAudit = {
  checkedAt: "2026-10-20",
  urls: new Set([
    "huggingface.co/spaces/phython96/rocket-1-demo",
    "huggingface.co/spaces/microsoft/trellis",
    "huggingface.co/spaces/yslan/worldmem",
    "huggingface.co/spaces/liguang0115/vmem",
    "huggingface.co/spaces/roblox/cubepart-demo",
    "huggingface.co/spaces/brian9999/game-editing",
    "alaya-renderer-flash.alayalab.ai/play",
  ]),
};
const assertInteractiveUrl = (value, checkedAt, label) => {
  const url = httpsUrl(value, label);
  const hostname = url.hostname.toLowerCase();
  const path = decodeURIComponent(url.pathname).toLowerCase();
  assert.ok(!/\.(?:pdf|mp4|webm|mov|avi|gif|mkv)$/.test(path), `${label} is a document or recording, not an interactive demo`);
  assert.ok(!["youtube.com", "youtu.be", "vimeo.com"].some((host) =>
    hostname === host || hostname.endsWith(`.${host}`)), `${label} is a video host, not an interactive demo`);
  assert.ok(!(hostname === "arxiv.org" && path.startsWith("/pdf/")), `${label} is a paper PDF`);
  assert.ok(!["github.com", "raw.githubusercontent.com"].includes(hostname), `${label} is source/download content, not a hosted interactive app`);
  if (hostname === "huggingface.co" || hostname === "hf.co") {
    assert.ok(!path.startsWith("/datasets/"), `${label} is a dataset page, not an interactive demo`);
    assert.ok(!/^\/spaces\/[^/]+\/[^/]*leaderboard(?:\/|$)/.test(path), `${label} is a leaderboard, not an interactive demo`);
    assert.ok(!/^\/spaces\/glitchbench\/(?:glitchbrowser|labelglitchbench)(?:\/|$)/.test(path), `${label} is a dataset/annotation browser`);
    assert.ok(!/^\/spaces\/embodiedcity\/iworld-bench(?:\/|$)/.test(path), `${label} is a dataset browser`);
  }
  const auditKey = `${hostname}${path.replace(/\/+$/, "")}`;
  assert.ok(!(checkedAt <= unavailableDemoAudit.checkedAt && unavailableDemoAudit.urls.has(auditKey)),
    `${label} was unavailable in the ${unavailableDemoAudit.checkedAt} audit; a renewed availability review is required`);
};

export function assertPaperAccess(paper) {
  const label = `Paper access on ${paper.id}`;
  const access = paper.access;
  exactKeys(access, ["codeStatus", "repositories", "projects", "demos", "reviewStatus", "checkedAt", "evidence", "notes"], [], label);
  validEnum(access.codeStatus, paperCodeStatuses, `${label} code status`);
  assert.ok(["source-reviewed", "unverified"].includes(access.reviewStatus), `${label} review status is invalid`);
  checkedDate(access.checkedAt, `${label} checked date`);
  for (const field of ["repositories", "projects", "demos", "evidence", "notes"])
    assert.ok(Array.isArray(access[field]), `${label} ${field} must be an array`);
  assert.ok(access.evidence.length, `${label} requires nonempty source evidence`);
  for (const [index, item] of access.evidence.entries()) linkRecord(item, `${label} evidence ${index}`);
  unique(access.evidence.map((item) => normalizedUrl(item.url)), `${label} evidence URL`);
  for (const note of access.notes) nonemptyText(note, `${label} note`);
  unique(access.notes, `${label} note`);

  for (const [index, repository] of access.repositories.entries()) {
    const repoLabel = `${label} repository ${index}`;
    exactKeys(repository, ["label", "url", "kind", "license"], [], repoLabel);
    nonemptyText(repository.label, `${repoLabel} label`);
    httpsUrl(repository.url, `${repoLabel} URL`);
    validEnum(repository.kind, paperRepositoryKinds, `${repoLabel} kind`);
    exactKeys(repository.license, ["status", "name"], ["url"], `${repoLabel} license`);
    validEnum(repository.license.status, paperLicenseStatuses, `${repoLabel} license status`);
    nonemptyText(repository.license.name, `${repoLabel} license name`);
    if (Object.hasOwn(repository.license, "url")) httpsUrl(repository.license.url, `${repoLabel} license URL`);
    if (repository.license.status === "open-source" || repository.license.status === "restricted") {
      assert.ok(repository.license.url, `${repoLabel} declared license requires its source URL`);
      assert.ok(access.evidence.some((item) => documentUrl(item.url) === documentUrl(repository.license.url)),
        `${repoLabel} license declaration must occur in the review evidence`);
      assert.ok(!/^(?:unknown|unspecified|unlicensed|license not established)$/i.test(repository.license.name),
        `${repoLabel} declared license requires an identified license`);
    }
  }
  unique(access.repositories.map((item) => normalizedUrl(item.url)), `${label} repository URL`);
  for (const [index, project] of access.projects.entries()) linkRecord(project, `${label} project ${index}`);
  unique(access.projects.map((item) => normalizedUrl(item.url)), `${label} project URL`);

  const substantive = access.repositories.filter((repository) => substantiveKinds.has(repository.kind));
  const published = releasedCodeStatuses.has(access.codeStatus) ? substantive : [];
  assert.deepEqual(publishedRepositories(access), published, `${label} publication helper must exclude unreleased/index/material-only entries`);
  if (releasedCodeStatuses.has(access.codeStatus)) {
    assert.ok(published.length, `${label} published code status requires an implementation, benchmark, partial implementation or data tool`);
    assert.equal(access.reviewStatus, "source-reviewed", `${label} published code requires source review`);
  }
  if (access.codeStatus === "open-source") assert.ok(published.some((repository) =>
    repository.license.status === "open-source" && repository.license.url),
  `${label} open-source code requires substantive released source and an evidenced open-source license`);
  assert.equal(hasOpenSourceCode(access), access.codeStatus === "open-source" && published.some((repository) =>
    repository.license.status === "open-source" && repository.license.url), `${label} open-source helper disagrees with release/license evidence`);
  if (access.codeStatus === "not-released") assert.equal(published.length, 0, `${label} release placeholders must not count as published code`);

  for (const [index, demo] of access.demos.entries()) {
    const demoLabel = `${label} demo ${index}`;
    exactKeys(demo, ["label", "url", "kind", "access", "note"], [], demoLabel);
    nonemptyText(demo.label, `${demoLabel} label`);
    httpsUrl(demo.url, `${demoLabel} URL`);
    validEnum(demo.kind, paperDemoKinds, `${demoLabel} kind`);
    validEnum(demo.access, paperDemoAccess, `${demoLabel} access`);
    nonemptyText(demo.note, `${demoLabel} note`);
    assert.equal(access.reviewStatus, "source-reviewed", `${demoLabel} requires source review`);
    if (demo.kind === "interactive") {
      assert.notEqual(demo.access, "setup", `${demoLabel} online demo must not require local setup`);
      assertInteractiveUrl(demo.url, access.checkedAt, `${demoLabel} interactive URL`);
    }
    if (demo.kind === "local") {
      assert.ok(["setup", "request"].includes(demo.access), `${demoLabel} local run must require setup or an access request`);
      assert.ok(published.length, `${demoLabel} local run requires published implementation source`);
    }
  }
  // A project can host both a web demo and local instructions. Repeated links
  // within a kind are duplicates; links serving distinct demo kinds are valid.
  unique(access.demos.map((item) => `${item.kind}\n${normalizedUrl(item.url)}`), `${label} demo kind/URL`);
}

assert.ok(canonical.equals(download), "Public papers.json must match data/papers.json byte for byte");
assert.deepEqual(JSON.parse(download), papers, "Canonical download JSON differs");
const ids = papers.map((paper) => paper.id);
unique(ids, "paper ID");
const byId = new Map(papers.map((paper) => [paper.id, paper]));
const knownId = (id) => assert.ok(byId.has(id), `Unknown paper ID: ${id}`);
unique(papers.map((paper) => normalizeTitle(paper.title)), "normalized paper title");
const arxivOwners = new Map(), doiOwners = new Map();
for (const paper of papers) {
  assertPaperAccess(paper);
  const dois = [paper.doi, /^https?:\/\/(?:dx\.)?doi\.org\//i.test(paper.url) ? paper.url : null]
    .filter(Boolean).map(normalizeDoi);
  const arxivs = [paper.arxivId, paper.url.match(/arxiv\.org\/(?:abs|pdf|html)\/(\d{4}\.\d{4,5})/)?.[1],
    ...dois.map((doi) => doi.match(/^10\.48550\/arxiv\.(\d{4}\.\d{4,5})$/)?.[1])].filter(Boolean);
  for (const id of new Set(arxivs)) {
    assert.match(id, /^\d{4}\.\d{4,5}$/, `Invalid arXiv ID on ${paper.id}`);
    assert.ok(!arxivOwners.has(id), `Duplicate arXiv ${id}: ${arxivOwners.get(id)} / ${paper.id}`);
    arxivOwners.set(id, paper.id);
  }
  assert.ok(new Set(arxivs).size <= 1, `Conflicting arXiv identities on ${paper.id}`);
  if (paper.arxivId) assert.ok(paper.pdfUrl, `Missing PDF link on ${paper.id}`);
  for (const doi of new Set(dois)) {
    assert.ok(!doiOwners.has(doi), `Duplicate DOI ${doi}: ${doiOwners.get(doi)} / ${paper.id}`);
    doiOwners.set(doi, paper.id);
  }
  assert.ok(new Set(dois).size <= 1, `Conflicting DOI identities on ${paper.id}`);
}

// The pinned survey has 419 bibliography entries; additions to the catalog are unbounded.
const referenceCount = 419;
assert.equal(catalog.survey.referenceCount, referenceCount);
assert.equal(proof.surveyReferenceMap.length, referenceCount);
sameSet(proof.surveyReferenceMap.map((item) => item.referenceNumber),
  Array.from({ length: referenceCount }, (_, i) => i + 1), "Survey reference numbers");
unique(proof.surveyReferenceMap.map((item) => item.bibliographyId), "survey bibliography ID");
const surveyBase = new URL(catalog.survey.htmlUrl);
surveyBase.hash = "";
const expectedSurveyOrigins = new Map();
for (const item of proof.surveyReferenceMap) {
  knownId(item.recordId);
  assert.equal(item.bibliographyId, `bib.bib${item.referenceNumber}`);
  assert.equal(item.url, `${surveyBase.href}#${item.bibliographyId}`);
  const list = expectedSurveyOrigins.get(item.recordId) || [];
  list.push({ label: `Survey reference [${item.referenceNumber}]`, url: item.url });
  expectedSurveyOrigins.set(item.recordId, list);
}
sameSet(proof.records.map((item) => item.recordId), ids, "Per-record provenance coverage");
unique(proof.existingPrimaryMap.map((item) => item.sourceId), "existing primary source ID");
for (const item of proof.existingPrimaryMap) knownId(item.recordId);
const primaryIds = new Set(proof.existingPrimaryMap.map((item) => item.recordId));
const derivedPdfRecords = proof.records.filter((item) => item.derivedPdfUrl);
for (const item of proof.records) {
  const paper = byId.get(item.recordId);
  assert.deepEqual(item.artifactReview, {
    codeStatus: paper.access.codeStatus,
    reviewStatus: paper.access.reviewStatus,
    checkedAt: paper.access.checkedAt,
    evidenceUrls: [...new Set(paper.access.evidence.map((entry) => entry.url))],
  }, `Artifact provenance must match the canonical access review on ${paper.id}`);
  const expected = expectedSurveyOrigins.get(paper.id) || [];
  sameSet(item.surveyReferences, expected.map((origin) => Number(origin.label.match(/\[(\d+)\]/)[1])),
    `Provenance reference numbers on ${paper.id}`);
  assert.deepEqual(paper.origins.filter((origin) => origin.label.startsWith("Survey reference")),
    expected, `Survey origins on ${paper.id}`);
  assert.ok(paper.origins.length && item.metadataSources.length, `Missing origin on ${paper.id}`);
  unique(paper.origins.map((origin) => `${origin.label}\n${origin.url}`), `origin on ${paper.id}`);
  for (const origin of paper.origins) {
    assert.ok(origin.label && item.metadataSources.includes(origin.url), `Unproven origin on ${paper.id}`);
    httpUrl(origin.url);
  }
  item.metadataSources.forEach(httpUrl);
  if (item.derivedPdfUrl) {
    const derived = item.derivedPdfUrl;
    assert.equal(derived.method, "standard-arxiv-pdf-endpoint");
    assert.equal(derived.arxivId, paper.arxivId);
    assert.equal(derived.reachabilityIndividuallyChecked, false);
    assert.equal(paper.pdfUrl, `https://arxiv.org/pdf/${paper.arxivId}${derived.version ? `v${derived.version}` : ""}`);
    const pinned = paper.url.match(/arxiv\.org\/(?:abs|html|pdf)\/\d{4}\.\d{4,5}v(\d+)/)?.[1];
    if (pinned) assert.equal(derived.version, pinned, `PDF version mismatch on ${paper.id}`);
  }
  if (item.primaryVerification) assert.ok(paper.origins.some((origin) => origin.label === "Primary publication"),
    `Missing primary-publication origin on ${paper.id}`);
  if (expected.length) assert.ok(paper.citedSections.length, `Missing survey citation anchor on ${paper.id}`);
  unique(paper.citedSections.map((section) => section.url), `citation anchor on ${paper.id}`);
  for (const section of paper.citedSections) {
    const url = new URL(section.url);
    assert.ok(section.label && /^#(?:S\d+|A\d+)(?:\.|$)/.test(url.hash), `Invalid citation anchor on ${paper.id}`);
    url.hash = "";
    assert.equal(url.href, surveyBase.href, `Citation must point to the pinned survey on ${paper.id}`);
  }
}

const total = papers.length, academicCount = academic.length, related = total - academicCount;
for (const [field, value] of Object.entries({ total, count: total, academic: academicCount,
  academicCount, related, relatedCount: related })) assert.equal(catalog[field], value, `Catalog ${field}`);
const counts = proof.counts;
for (const source of [counts, catalog.counts]) {
  assert.equal(source.total, total);
  assert.equal(source.academic, academicCount);
  assert.equal(source.related, related);
  assert.equal(source.surveyBibliographyReferences, referenceCount);
  assert.equal(source.uniqueSurveyRecords, expectedSurveyOrigins.size);
  assert.equal(source.existingPrimaryRecords, proof.existingPrimaryMap.length);
  assert.equal(source.overlapSurveyAndExisting, [...primaryIds].filter((id) => expectedSurveyOrigins.has(id)).length);
  assert.equal(source.additionalExistingRecords, [...primaryIds].filter((id) => !expectedSurveyOrigins.has(id)).length);
  assert.deepEqual(source.byReferenceType, tally(papers.map((paper) => paper.referenceType)));
  assert.deepEqual(source.byPrimaryRole, tally(papers.map((paper) => paper.primaryRole)));
  assert.deepEqual(source.byRole, tally(papers.flatMap((paper) => paper.roles)));
}
const accessCounts = {
  records: total,
  reviewed: papers.filter((paper) => paper.access.reviewStatus === "source-reviewed").length,
  byCodeStatus: tally(papers.map((paper) => paper.access.codeStatus)),
  publishedCode: papers.filter((paper) => publishedRepositories(paper.access).length).length,
  openSourceCode: papers.filter((paper) => hasOpenSourceCode(paper.access)).length,
  projectPages: papers.filter((paper) => paper.access.projects.length).length,
  onlineDemos: papers.filter((paper) => paper.access.demos.some((demo) => demo.kind === "interactive")).length,
  publicOnlineDemos: papers.filter((paper) => paper.access.demos.some((demo) => demo.kind === "interactive" && demo.access === "public")).length,
  localOrDownload: papers.filter((paper) => paper.access.demos.some((demo) => demo.kind === "local" || demo.kind === "download")).length,
};
exactKeys(proof.artifactReview, ["schemaVersion", "checkedAt", "counts", "policy"], [], "Artifact review provenance");
assert.equal(proof.artifactReview.schemaVersion, 1, "Unsupported artifact review schema");
checkedDate(proof.artifactReview.checkedAt, "Artifact review latest checked date");
assert.equal(proof.artifactReview.checkedAt, papers.map((paper) => paper.access.checkedAt).sort().at(-1),
  "Artifact review date must match the newest canonical review");
nonemptyText(proof.artifactReview.policy, "Artifact review policy");
assert.deepEqual(catalog.accessCounts, accessCounts, "Catalog access counts must match actual release, license and demo metadata");
assert.deepEqual(proof.artifactReview.counts, accessCounts, "Provenance access counts must match actual release, license and demo metadata");
const seed = papers.filter((paper) => paper.arxivId === catalog.survey.arxivId);
assert.equal(seed.length, 1, "Seed survey must occur once");
assert.equal(counts.seedSurveyRecords, seed.length);
assert.equal(catalog.counts.seedSurveyRecords, seed.length);
assert.equal(proof.canonicalDataset.path, "papers.json");
assert.equal(proof.canonicalDataset.bytes, canonical.length);
assert.equal(proof.canonicalDataset.sha256, createHash("sha256").update(canonical).digest("hex"));
assert.deepEqual(catalog.canonicalDataset, proof.canonicalDataset);
assert.ok(proof.urlDerivationPolicy, "Derived PDF endpoints need an explicit provenance policy");
assert.deepEqual(catalog.linkCoverage, {
  arxivRecords: papers.filter((paper) => paper.arxivId).length,
  arxivRecordsWithPdf: papers.filter((paper) => paper.arxivId && paper.pdfUrl).length,
  derivedArxivPdfUrls: derivedPdfRecords.length,
  derivedVersionPinnedPdfUrls: derivedPdfRecords.filter((item) => item.derivedPdfUrl.version).length,
});

const bib = bibFile.toString("utf8");
const keys = [...bib.matchAll(/^@\w+\{([^,\s]+),/gm)].map((match) => match[1]);
assert.equal(keys.length, [...bib.matchAll(/^@/gm)].length, "Malformed BibTeX entry header");
sameSet(keys, academic.map((paper) => paper.id), "BibTeX must cover every academic record and no related sources");
const bibBodies = new Map([...bib.matchAll(/^@\w+\{([^,\s]+),\n([\s\S]*?)^\}/gm)]
  .map((match) => [match[1], match[2]]));
for (const paper of academic) if (paper.pdfUrl) assert.equal(
  bibBodies.get(paper.id)?.match(/^\s*pdf\s*=\s*\{([^}]+)\}/m)?.[1], paper.pdfUrl,
  `BibTeX PDF link on ${paper.id}`,
);
console.log(`Paper coverage passed: ${total} references, ${academicCount} academic, ${related} related, ${referenceCount} mapped survey citations, matching JSON and BibTeX downloads; ${accessCounts.reviewed} artifact reviews, ${accessCounts.publishedCode} published-code records, ${accessCounts.onlineDemos} online demos with matching provenance and counts.`);
