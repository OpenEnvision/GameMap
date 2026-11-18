import assert from "node:assert/strict";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { createHash } from "node:crypto";
import { publicMediaURL } from "../lib/example-media.mjs";
import { applyPublishedDemos } from "../lib/round5-media.mjs";
import { writeIfChanged } from "../lib/files.mjs";
const args = process.argv.slice(2),
  option = (name) => args[args.indexOf(name) + 1];
// Refresh only generated demo fields without rewriting intake receipts or translations.
// The normal import below consumes the same ledger, so a later import cannot erase verification.
if (args.includes("--refresh-demos")) {
  const refreshRound = args.includes("--round") ? Number(option("--round")) : 5;
  assert.ok([1, 2, 3, 4, 5].includes(refreshRound));
  const module =
    refreshRound === 1 ? "open3dGames" : `open3dRound${refreshRound}Games`;
  const path = resolve(
    import.meta.dirname,
    `../../website/src/data/${module}.ts`,
  );
  const source = await readFile(path, "utf8");
  const marker = `export const ${module}: LearningPath[] = `;
  const start = source.indexOf(marker);
  assert.ok(start >= 0, "Expected generated JSON array module");
  const encoded = source.slice(start + marker.length).trim();
  assert.ok(encoded.endsWith(";"));
  const entries = JSON.parse(encoded.slice(0, -1));
  const refreshed = await applyPublishedDemos(entries);
  if (!args.includes("--dry-run"))
    await writeIfChanged(
      path,
      source.slice(0, start + marker.length) +
        JSON.stringify(refreshed, null, 2) +
        ";\n",
    );
  console.log(
    JSON.stringify({
      round: refreshRound,
      examples: entries.length,
      upgraded: refreshed.filter((entry) => entry.demo.kind !== "source")
        .length,
      dryRun: args.includes("--dry-run"),
    }),
  );
  process.exit(0);
}
for (const name of ["--input", "--translations", "--baseline"])
  assert.ok(args.includes(name), "Required: " + name);
const round = args.includes("--round") ? Number(option("--round")) : 1;
assert.ok(
  [1, 2, 3, 4, 5].includes(round),
  "Supported explicit import rounds: 1, 2, 3, 4 or 5",
);
// Round 5 (supplied AI game list) is checked against GitHub before import: its rows
// carry GitHub license metadata, README model mentions and per-row aiUse text.
const githubChecked = round >= 5;
const suffix = round === 1 ? "" : "-round" + round,
  moduleName = round === 1 ? "open3dGames" : "open3dRound" + round + "Games",
  localeName = round === 1 ? "open3d-games" : "open3d-games-round" + round;
const root = resolve(import.meta.dirname, "../.."),
  input = resolve(option("--input")),
  bytes = await readFile(input);
assert.ok(bytes.length <= 5000000, "Bounded local directory input");
const records = bytes
  .toString("utf8")
  .split(/\r?\n/)
  .filter((x) => x.trim())
  .map(JSON.parse);
assert.ok(
  records.length > 0 && records.length <= 1000,
  "Bounded nonempty directory",
);
if (round > 1)
  assert.ok(
    records.every((row) => row.collection_round === round),
    "Collection-round provenance must match every supplied row",
  );
const games = records.filter((row) => row.category === "游戏与游戏原型");
const pack = JSON.parse(await readFile(resolve(option("--baseline")), "utf8")),
  manifest = JSON.parse(pack.manifest_text);
const sha256 = (value) => createHash("sha256").update(value).digest("hex"),
  digest = sha256(bytes);
const companion = args.includes("--companion")
  ? await readFile(resolve(option("--companion")))
  : null;
if (companion)
  assert.ok(
    companion.length <= 5000000,
    "Bounded companion workbook; never execute formulas or macros",
  );
const identity = (value) => {
  const u = publicMediaURL(value),
    parts = u.pathname.split("/").filter(Boolean);
  if (u.hostname === "github.com" && parts.length >= 2) {
    // From round 5, a tree/blob path is part of the identity: one repository can
    // hold several distinct games (benchmarks, arcades, model comparisons).
    const path =
      githubChecked && ["tree", "blob"].includes(parts[2])
        ? parts
            .slice(4)
            .join("/")
            .replace(/\/(?:README\.md|index\.html)$/i, "")
        : "";
    return (
      "github.com/" +
      (parts[0] + "/" + parts[1].replace(/\.git$/i, "")).toLowerCase() +
      (path ? "/" + decodeURIComponent(path).toLowerCase() : "")
    );
  }
  u.hash = "";
  u.pathname = u.pathname.replace(/\/+$/, "") || "/";
  u.searchParams.sort();
  return u.href;
};
const homepage = (value) => {
  try {
    const u = new URL(value);
    if (!["http:", "https:"].includes(u.protocol)) return null;
    publicMediaURL(u.href.replace(/^http:/, "https:"));
    return u.href;
  } catch {
    return null;
  }
};
const existing = new Map(),
  legacy = new Map();
const add = (map, value, entry) => {
  try {
    const key = identity(value);
    if (!map.has(key)) map.set(key, entry);
  } catch {}
};
for (const e of manifest.entries) {
  const p = e.body.payload;
  if (e.kind === "example" || e.kind === "foundation")
    add(existing, p.source.url, e);
  if (
    e.kind === "repository-research" &&
    p.game_access &&
    p.review_status === "source-reviewed" &&
    p.disposition !== "unavailable" &&
    p.availability !== "unavailable"
  ) {
    add(
      existing,
      "https://github.com/" + (p.canonical_repo || p.requested_repo),
      e,
    );
  }
  if (e.kind === "threejs-game") add(legacy, p.repository_url, e);
}
if (args.includes("--aliases")) {
  const aliases = JSON.parse(
    await readFile(resolve(option("--aliases")), "utf8"),
  );
  for (const alias of aliases.sourceReferenceAliases || []) {
    const entry = manifest.entries.find((e) => e.key === alias.target);
    assert.ok(entry, "Missing declared canonical alias target " + alias.target);
    assert.ok(alias.reason?.trim(), "Alias requires evidence/reason");
    add(entry.kind === "threejs-game" ? legacy : existing, alias.url, entry);
  }
}
const translations = new Map();
for (const name of (await readdir(resolve(option("--translations"))))
  .filter((x) => x.endsWith(".json"))
  .sort()) {
  const report = JSON.parse(
    await readFile(resolve(option("--translations"), name), "utf8"),
  );
  for (const row of report.accepted) {
    assert.ok(!translations.has(row.id));
    translations.set(row.id, row);
  }
}
const previousPath = resolve(
  root,
  "data/segments/open-3d-import" + suffix + ".json",
);
let previous = null;
try {
  previous = JSON.parse(await readFile(previousPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
if (previous)
  assert.equal(
    previous.source.sha256,
    digest,
    "Do not replace an existing imported dataset with a different input",
  );
const now =
    previous?.source.importedAt || new Date().toISOString().slice(0, 10),
  examples = [],
  localizations = {},
  mappings = [],
  legacyIds = [],
  seen = new Set();
for (const row of games) {
  assert.match(row.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(!seen.has(row.id), "Duplicate input id");
  seen.add(row.id);
  const repo = identity(row.repo_url);
  assert.notEqual(
    repo,
    "github.com/rayhimmel/blank",
    "Existing safety hold must not be promoted",
  );
  assert.match(row.checked_on, /^\d{4}-\d{2}-\d{2}$/);
  const known = existing.get(repo),
    old = legacy.get(repo);
  if (known) {
    mappings.push({
      inputId: row.id,
      key: known.key,
      status: "existing-game-preserved",
      canonicalPath: known.canonical_path,
    });
    continue;
  }
  if (old) {
    legacyIds.push(old.identifier);
    mappings.push({
      inputId: row.id,
      key: old.key,
      status: "existing-threejs-record-reused-source-only",
      canonicalPath: old.canonical_path,
    });
    continue;
  }
  const en = translations.get(row.id);
  assert.ok(en, "Missing translation " + row.id);
  for (const k of [
    "description",
    "engine",
    "codeLicenseNote",
    "assetLicenseNote",
    "caveat",
  ]) {
    assert.ok(en[k]?.trim());
    assert.doesNotMatch(en[k], /\p{Script=Han}/u);
  }
  if (githubChecked) {
    assert.ok(en.aiUse?.trim(), "Round 5 rows need checked aiUse text");
    assert.doesNotMatch(en.aiUse, /\p{Script=Han}/u);
    assert.ok(row.ai_use_zh?.trim(), "Round 5 rows need a Chinese aiUse");
  }
  const id = "open3d-" + row.id;
  assert.ok(
    !manifest.entries.some((x) => x.key === "example:" + id),
    "Existing stable ID collision",
  );
  const title = /\p{Script=Han}/u.test(row.name)
    ? row.name.split(" / ")[0]
    : row.name;
  const references = (row.evidence_urls || []).filter((x) => {
      try {
        publicMediaURL(x);
        return true;
      } catch {
        return false;
      }
    }),
    first = references[0] || row.repo_url;
  const example = {
    id,
    title,
    description: en.description,
    engine: en.engine,
    track: "3d",
    category: "community",
    aiUse: githubChecked
      ? en.aiUse
      : "Imported from a user-provided 3D game directory. No AI-authorship attribution is inferred. Repository availability, complete source scope, code and asset licenses, builds, playability, safety and L1/L2/L3 were not independently verified. No native game or source project was executed.",
    steps: [
      "Inspect the linked project reference, README, current release information and actual source before choosing a setup.",
      "Check code, asset, service and original-data requirements separately; the imported directory is not a playtest or reuse permission.",
    ],
    tutorial: {
      label: "Read the supplied project reference",
      url: first,
      kind: "disclosure",
    },
    demo: {
      label: "View source for " + title,
      url: row.repo_url,
      kind: "source",
      note: "Source reference only. No playable build or published download was independently verified; the supplied homepage is not treated as a play link.",
    },
    source: {
      label: "Inspect the supplied source reference",
      url: row.repo_url,
      scope: "unverified-project",
      note: githubChecked
        ? "GitHub license check: " +
          en.codeLicenseNote +
          ". Asset licenses: " +
          en.assetLicenseNote +
          ". Qualification: " +
          en.caveat +
          " These are repository metadata and supplied statements, not independent license, asset or complete-project verification."
        : "Supplied directory lists code license: " +
          en.codeLicenseNote +
          ". Asset notes from that directory: " +
          en.assetLicenseNote +
          ". Qualification: " +
          en.caveat +
          " These are imported statements, not independent license, asset or complete-project verification.",
    },
    evidence: {
      label: "Read supplied directory references",
      url: first,
      note:
        "Imported input " +
        basename(input) +
        ", row " +
        row.id +
        (githubChecked
          ? ", GitHub repository check on "
          : ", supplied metadata date ") +
        row.checked_on +
        ". Input SHA-256: " +
        digest +
        ". The supplied review statement is retained in the original-language evidence download and is not a GameMap source-review claim. References: " +
        references.join(" "),
    },
    resourceIds: [],
    intake: {
      dataset: basename(input),
      rowId: row.id,
      sourceDate: row.checked_on,
      importedAt: now,
      sha256: digest,
      verification:
        "Provided directory; source, release, code and asset licenses not independently rechecked",
      homepage: homepage(row.homepage_url),
    },
  };
  examples.push(example);
  localizations["example:" + id] = {
    description:
      row.description_zh + (row.caveat_zh ? " 注意：" + row.caveat_zh : ""),
    ...(githubChecked ? { aiUse: row.ai_use_zh } : {}),
  };
  // Round 5 keeps the supplied original title as the Chinese title.
  if (githubChecked && /\p{Script=Han}/u.test(row.supplied_name || ""))
    localizations["example:" + id].title = row.supplied_name;
  else if (title !== row.name) localizations["example:" + id].title = row.name;
  mappings.push({
    inputId: row.id,
    key: "example:" + id,
    status: "imported-source-only-unverified",
    canonicalPath: "/examples/" + id + "/",
  });
  existing.set(repo, {
    key: "example:" + id,
    canonical_path: "/examples/" + id + "/",
  });
}
const raw = {
  version: 1,
  source: {
    filename: basename(input),
    sha256: digest,
    ...(round > 1 ? { collectionRound: round } : {}),
    ...(companion
      ? {
          companion: {
            filename: basename(option("--companion")),
            sha256: sha256(companion),
          },
        }
      : {}),
    importedAt: now,
    suppliedMetadataDate: [...new Set(records.map((r) => r.checked_on))].join(
      ", ",
    ),
    policy: githubChecked
      ? "Every supplied row was checked against GitHub before import; unavailable repositories are excluded and rows already in the catalog keep their existing record. Admitted rows are source-only/unverified with no invented play/download URL. Model attribution repeats only what the project README states."
      : "Only the supplied games-and-prototypes category is admitted; source-only/unverified, no invented play/download URL. Other categories remain raw intake evidence, not game admission.",
  },
  inputRecords: records,
  mappings,
  newExampleIds: examples.map((x) => x.id),
  excludedIds: records
    .filter((x) => x.category !== "游戏与游戏原型")
    .map((x) => x.id),
};
const output = async (path, value) =>
  writeFile(
    resolve(root, path),
    typeof value === "string" ? value : JSON.stringify(value, null, 2) + "\n",
  );
if (args.includes("--dry-run")) {
  console.log(
    JSON.stringify(
      {
        rows: records.length,
        games: games.length,
        newExamples: examples.length,
        reused: games.length - examples.length,
        legacyThreejs: legacyIds,
        excluded: raw.excludedIds.length,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}
if (previous)
  assert.deepEqual(
    raw.newExampleIds,
    previous.newExampleIds,
    "Do not overwrite previously generated rows using a post-import baseline",
  );
const verified = await applyPublishedDemos(examples);
for (let i = 0; i < examples.length; i++) examples[i].demo = verified[i].demo;
await output("data/segments/open-3d-import" + suffix + ".json", raw);
await output("website/public/open-3d-games-import" + suffix + ".json", raw);
await output(
  "website/src/data/" + moduleName + ".ts",
  "// Generated by scripts/import/open-3d-games.mjs. Supplied data, not independent source verification.\nimport type { LearningPath } from './learningTypes';\nexport const " +
    moduleName +
    ": LearningPath[] = " +
    JSON.stringify(examples, null, 2) +
    ";\n",
);
const zhPath = resolve(
  root,
  "website/content/i18n/content/" + localeName + ".zh.json",
);
await writeFile(zhPath, JSON.stringify(localizations, null, 2) + "\n");
const sourcePath = resolve(
    root,
    "website/content/i18n/content.zh.sources.json",
  ),
  fingerprints = JSON.parse(await readFile(sourcePath, "utf8"));
for (const example of examples)
  for (const field of Object.keys(localizations["example:" + example.id])) {
    fingerprints["example:" + example.id] ??= {};
    fingerprints["example:" + example.id][field] = sha256(
      JSON.stringify(example[field]),
    );
  }
await writeFile(sourcePath, JSON.stringify(fingerprints, null, 2) + "\n");
const policyPath = "website/content/open3d-import.config.json",
  priorPolicy = JSON.parse(await readFile(resolve(root, policyPath), "utf8"));
const policy =
  round === 1
    ? {
        dataset: basename(input),
        sha256: digest,
        includedLegacyThreejsIds: [...new Set(legacyIds)].sort(),
      }
    : {
        ...priorPolicy,
        includedLegacyThreejsIds: [
          ...new Set([...priorPolicy.includedLegacyThreejsIds, ...legacyIds]),
        ].sort(),
        additionalDatasets: [
          ...(priorPolicy.additionalDatasets || []).filter(
            (x) => x.sha256 !== digest,
          ),
          {
            dataset: basename(input),
            sha256: digest,
            includedLegacyThreejsIds: [...new Set(legacyIds)].sort(),
          },
        ],
      };
await output(policyPath, policy);
console.log(
  JSON.stringify(
    {
      rows: records.length,
      games: games.length,
      newExamples: examples.length,
      reused: games.length - examples.length,
      excluded: raw.excludedIds.length,
      sourceOnly: examples.every((entry) => entry.demo.kind === "source"),
    },
    null,
    2,
  ),
);
