import assert from "node:assert/strict";

export function repositoryIdentity(value) {
  const url = new URL(value);
  assert.equal(url.protocol, "https:", "Source repositories must use HTTPS");
  assert.equal(
    url.hostname.toLowerCase(),
    "github.com",
    "Use a GitHub repository identity",
  );
  const parts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  assert.equal(
    parts.length,
    2,
    "Use the repository root, not a guessed source path",
  );
  return `${parts[0]}/${parts[1].replace(/\.git$/i, "")}`.toLowerCase();
}
export function buildIdentity(value) {
  const url = new URL(value);
  assert.equal(url.protocol, "https:", "Published games must use HTTPS");
  assert.ok(!url.username && !url.password, "URLs cannot contain credentials");
  url.hash = "";
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  for (const key of [...url.searchParams.keys()])
    if (/^(utm_|ref$)/.test(key)) url.searchParams.delete(key);
  url.searchParams.sort();
  return url.href;
}
const text = (value) => typeof value === "string" && value.trim().length > 0;
const https = (value) => {
  const u = new URL(value);
  assert.equal(u.protocol, "https:");
  assert.ok(!u.username && !u.password);
};

/** Structural admission is not execution, factual review or license clearance. */
export function validateJamRecord(row) {
  assert.match(row.id, /^jam-[a-z0-9]+(?:-[a-z0-9]+)*$/);
  for (const field of [
    "title",
    "engine",
    "engineVersion",
    "jam",
    "description",
    "sourceNote",
    "license",
    "assetLicense",
  ])
    assert.ok(text(row[field]), `${row.id}: missing ${field}`);
  const repo = repositoryIdentity(row.repository);
  https(row.gameUrl);
  const target = new URL(row.gameUrl);
  assert.ok(
    !["github.com", "raw.githubusercontent.com"].includes(target.hostname) ||
      /^\/[^/]+\/[^/]+\/releases(?:\/|$)/.test(target.pathname),
    "A repository is not a released game",
  );
  assert.ok(["2d", "3d"].includes(row.track));
  assert.ok(["playable", "download"].includes(row.demoKind));
  assert.ok(row.commit === null || /^[a-f0-9]{40}$/i.test(row.commit));
  assert.match(row.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(
    new Date(row.checkedAt).toISOString().slice(0, 10),
    row.checkedAt,
  );
  for (const field of ["jamUrl", "licenseUrl"])
    if (row[field] !== null) https(row[field]);
  assert.ok(
    Array.isArray(row.evidence) && row.evidence.length >= 2,
    `${row.id}: need primary evidence`,
  );
  for (const proof of row.evidence) {
    https(proof.url);
    assert.ok(
      text(proof.claim) && text(proof.quote),
      `${row.id}: evidence needs a real passage`,
    );
  }
  assert.ok(Array.isArray(row.reviewedFiles) && row.reviewedFiles.length >= 2);
  for (const url of row.reviewedFiles) https(url);
  assert.ok(
    row.evidence.some(({ url }) => url.toLowerCase().includes(repo)),
    `${row.id}: missing repository evidence`,
  );
  assert.ok(Array.isArray(row.limitations) && row.limitations.every(text));
  assert.ok(
    Array.isArray(row.suggestedSteps) &&
      row.suggestedSteps.length >= 2 &&
      row.suggestedSteps.every(text),
  );
  return row;
}

/** Append-only, first reviewed occurrence wins; candidates are never promoted implicitly. */
export function mergeJamReports(
  reports,
  { existingRepositories = [], existingBuilds = [], checkedAt } = {},
) {
  const repositories = new Set(existingRepositories.map(repositoryIdentity));
  const builds = new Set(existingBuilds.map(buildIdentity));
  const ids = new Set(),
    accepted = [],
    candidates = [],
    duplicates = [],
    sources = [];
  for (const report of reports) {
    sources.push({ source: report.source, notes: report.notes || [] });
    for (const candidate of report.candidates || [])
      candidates.push({
        ...candidate,
        source: candidate.source || report.source,
      });
    for (const original of report.accepted || []) {
      const row = {
        ...original,
        jam: original.jam || "Community release (jam attribution unverified)",
        checkedAt: original.checkedAt || checkedAt,
      };
      row.limitations = row.limitations?.filter(
        (note) =>
          !/checkedAt|no (current )?UTC date|no shell\/date/i.test(note),
      );
      try {
        validateJamRecord(row);
      } catch (error) {
        candidates.push({
          repository: row.repository,
          reason: `Admission rejected: ${error.message}`,
          source: report.source,
        });
        continue;
      }
      const repo = repositoryIdentity(row.repository),
        build = buildIdentity(row.gameUrl);
      if (repositories.has(repo) || builds.has(build) || ids.has(row.id)) {
        duplicates.push({
          repository: row.repository,
          gameUrl: row.gameUrl,
          reason: "Existing repository, published build or stable ID",
          source: report.source,
        });
        continue;
      }
      repositories.add(repo);
      builds.add(build);
      ids.add(row.id);
      accepted.push(row);
    }
  }
  const pending = new Map();
  const acceptedByRepository = new Map(
    accepted.map((row) => [repositoryIdentity(row.repository), row]),
  );
  const finding = ({ reason, source }) => ({ reason, source });
  const distinct = (values) => [
    ...new Map(values.map((value) => [JSON.stringify(value), value])).values(),
  ];
  for (const candidate of candidates) {
    let identity;
    try {
      identity = repositoryIdentity(candidate.repository);
    } catch {
      identity = String(candidate.repository);
    }
    if (repositories.has(identity)) {
      const reviewed = acceptedByRepository.get(identity);
      if (reviewed)
        reviewed.reviewHistory = distinct([
          ...(reviewed.reviewHistory || []),
          ...(candidate.reviewHistory || []),
          finding(candidate),
        ]);
      continue;
    }
    const previous = pending.get(identity);
    if (!previous) {
      pending.set(identity, candidate);
      continue;
    }
    // A recheck must expose the latest finding without erasing earlier evidence.
    const current = JSON.stringify(finding(candidate));
    const history = [
      ...(previous.reviewHistory || []),
      finding(previous),
      ...(candidate.reviewHistory || []),
    ];
    const unique = distinct(
      history.filter((item) => JSON.stringify(item) !== current),
    );
    const updated = { ...previous, ...candidate };
    if (unique.length) updated.reviewHistory = unique;
    else delete updated.reviewHistory;
    pending.set(identity, updated);
  }
  return {
    version: 1,
    checkedAt,
    verification:
      "source-reviewed; L1 integrity, L2 compilation, L3 30-second execution and code-line thresholds not independently verified",
    accepted,
    candidates: [...pending.values()],
    duplicates,
    sources,
  };
}

export function jamExample(row) {
  validateJamRecord(row);
  const license = `Code license: ${row.license}${row.licenseUrl ? ` (${row.licenseUrl})` : ""}. Asset rights: ${row.assetLicense}.`;
  const dateLimitations = row.limitations.filter(
    (note) => !/checkedAt|no (current )?UTC date|no shell\/date/i.test(note),
  );
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    engine: `${row.engine}${row.engineVersion === "unknown" ? " · version unverified" : ` ${row.engineVersion}`}`,
    track: row.track,
    category: "community",
    aiUse: `Source-reviewed community game; AI creation is not a requirement and no AI-authorship attribution is asserted. ${row.jam}. Reviewed ${row.checkedAt}. L1 file integrity, L2 compilation, L3 30-second runtime and code-line thresholds were not independently verified.`,
    steps: row.suggestedSteps,
    tutorial: {
      label: "Read the creator’s project notes",
      url: row.evidence[0].url,
      kind: "quickstart",
    },
    demo: {
      label:
        row.demoKind === "playable"
          ? `Open ${row.title}`
          : `Download ${row.title}`,
      url: row.gameUrl,
      kind: row.demoKind,
      note: "Author-linked published game page; build execution and current playability have not been independently tested. Check the page for platform and input requirements.",
    },
    source: {
      label: "Open the game project",
      url: row.repository,
      scope: "complete-project",
      note: `${row.sourceNote} ${license} ${row.commit ? `Reviewed revision: ${row.commit}.` : "No pinned commit was established; source links can change."} ${dateLimitations.join(" ")}`,
    },
    evidence: {
      label: "Inspect the primary source evidence",
      url: row.evidence[0].url,
      note: row.evidence
        .map((proof) => `${proof.claim} “${proof.quote}” (${proof.url})`)
        .join("\n"),
    },
    resourceIds: /godot/i.test(row.engine) ? ["godot-engine"] : [],
  };
}
