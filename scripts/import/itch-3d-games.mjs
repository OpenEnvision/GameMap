import { applyPublishedDemos } from "../lib/round5-media.mjs";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { createHash } from "node:crypto";
import { publicMediaURL } from "../lib/example-media.mjs";
const args = process.argv.slice(2),
  option = (k) => args[args.indexOf(k) + 1];
for (const k of [
  "--input",
  "--screening",
  "--translations",
  "--extra-translations",
  "--baseline",
])
  assert.ok(args.includes(k), "Required " + k);
const read = async (p) => JSON.parse(await readFile(p, "utf8")),
  bytes = await readFile(resolve(option("--input")));
assert.ok(bytes.length <= 5000000);
const supplied = JSON.parse(bytes),
  screen = await read(option("--screening")),
  translated = await read(option("--translations")),
  extra = await read(option("--extra-translations")),
  pack = await read(option("--baseline")),
  manifest = JSON.parse(pack.manifest_text),
  hash = (b) => createHash("sha256").update(b).digest("hex"),
  sha256 = hash(bytes),
  now = new Date().toISOString().slice(0, 10);
assert.equal(supplied.games.length, 145);
assert.equal(screen.decisions.length, 145);
assert.equal(new Set(screen.decisions.map((d) => d.id)).size, 145);
const identity = (v) => {
  try {
    const u = publicMediaURL(v),
      p = u.pathname.split("/").filter(Boolean);
    if (u.hostname === "github.com" && p.length >= 2)
      return (
        "github.com/" + (p[0] + "/" + p[1].replace(/\.git$/i, "")).toLowerCase()
      );
    u.hash = "";
    u.protocol = "https:";
    u.hostname = u.hostname.replace(/^www\./, "");
    u.pathname =
      u.pathname.replace(/index\.html$/i, "").replace(/\/+$/, "") || "/";
    u.searchParams.sort();
    return u.href;
  } catch {
    return null;
  }
};
const known = new Map(),
  legacy = new Map(),
  byKey = new Map(manifest.entries.map((e) => [e.key, e]));
const add = (map, url, e) => {
  const key = identity(url);
  if (key && !map.has(key)) map.set(key, e);
};
for (const e of manifest.entries) {
  const p = e.body.payload;
  if (e.kind === "example" || e.kind === "foundation")
    add(known, p.source.url, e);
  if (e.kind === "threejs-game") add(legacy, p.repository_url, e);
  if (
    e.kind === "repository-research" &&
    p.game_access &&
    p.review_status === "source-reviewed" &&
    p.disposition !== "unavailable" &&
    p.availability !== "unavailable"
  )
    add(
      known,
      "https://github.com/" + (p.canonical_repo || p.requested_repo),
      e,
    );
}
const en = new Map(translated.accepted.map((e) => [e.id, e]));
for (const [id, a] of Object.entries(extra)) {
  const [
    title,
    description,
    engine,
    codeLicenseNote,
    assetLicenseNote,
    caveat,
  ] = a;
  assert.ok(!en.has(id));
  en.set(id, {
    id,
    title,
    description,
    engine,
    codeLicenseNote,
    assetLicenseNote,
    caveat,
    priceAccess:
      "Price not independently checked; consult the current author page.",
  });
}
const first = await read("data/segments/open-3d-import.json"),
  round2 = await read("data/segments/open-3d-import-round2.json");
const aliases = {
  G024: {
    target: first.mappings.find((m) => m.inputId === "q1k3").key,
    reason:
      "Explicit native C port of the already represented Q1K3 game; retain port evidence without counting another independent game.",
  },
  G051: {
    target: round2.mappings.find((m) => m.inputId === "extreme-tux-racer").key,
    reason:
      "Explicit browser recreation of the already represented Extreme Tux Racer; preserve the unfinished version and source evidence as a related implementation, not another independent game.",
  },
  G083: {
    target: "example:open3d-hoptons-trip",
    reason:
      "Same supplied title and author release page as the existing published Hoptons Trip.",
  },
};
const examples = [],
  localizations = {},
  mappings = [],
  inputTargets = new Map(),
  legacyIds = new Set(),
  seen = new Set();
for (const row of supplied.games) {
  assert.match(row.id, /^G\d{3}$/);
  assert.ok(!seen.has(row.id));
  seen.add(row.id);
  const decision = screen.decisions.find((d) => d.id === row.id);
  assert.ok(decision);
  let source = decision.sourceUrl || row.source_url,
    admit = ["existing_game", "source_reference_game"].includes(
      decision.decision,
    ),
    override = null;
  if (row.id === "G140") {
    admit = false;
    override =
      "Needs original commercial game data and has no established game-code license; retain as research, not a clean standalone game.";
  }
  if (row.id === "G118") {
    admit = true;
    source = "https://github.com/OxillenGlow/MtSharpGrain";
    override =
      "Official author page source link recovered; repository metadata/README confirm an unfinished sandbox reference only. License coverage and runtime unverified.";
  }
  const key = identity(source),
    existing = key && (known.get(key) || legacy.get(key));
  if (!admit) {
    mappings.push({
      inputId: row.id,
      status:
        row.id === "G140"
          ? "candidate-original-data-required"
          : decision.decision,
      ...(existing ? { existingTarget: existing.key } : {}),
      ...(override ? { rationale: override } : {}),
    });
    continue;
  }
  assert.ok(key, "Public source reference required " + row.id);
  assert.notEqual(
    key,
    "github.com/rayhimmel/blank",
    "Safety hold must not be promoted",
  );
  let target = existing,
    reason = null;
  if (row.id === "G008") {
    const canonical = inputTargets.get("G007");
    assert.ok(
      canonical,
      "Marble Marcher original must precede its community edition",
    );
    target = byKey.get(canonical) || {
      key: canonical,
      kind: "example",
      canonical_path: "/examples/" + canonical.split(":")[1] + "/",
    };
    reason =
      "Explicit Marble Marcher community edition; preserve its added levels/editor/replay and separate source as related-edition evidence, not an unexplained extra independent game.";
  }
  if (aliases[row.id]) {
    target = byKey.get(aliases[row.id].target);
    assert.ok(target, "Missing explicit alias target");
    reason = aliases[row.id].reason;
  }
  if (target) {
    if (target.kind === "threejs-game") legacyIds.add(target.identifier);
    inputTargets.set(row.id, target.key);
    mappings.push({
      inputId: row.id,
      key: target.key,
      status: reason
        ? "related-edition-or-alias-reused"
        : target.kind === "threejs-game"
          ? "existing-threejs-record-reused-source-only"
          : "existing-game-preserved",
      canonicalPath: target.canonical_path,
      ...(reason ? { rationale: reason } : {}),
    });
    continue;
  }
  const text = en.get(row.id);
  assert.ok(text, "Missing English translation " + row.id);
  for (const k of [
    "title",
    "description",
    "engine",
    "codeLicenseNote",
    "assetLicenseNote",
    "caveat",
    "priceAccess",
  ]) {
    assert.equal(typeof text[k], "string");
    assert.ok(text[k].trim());
    assert.doesNotMatch(text[k], /\p{Script=Han}/u);
  }
  const id = "itch3d-" + row.id.toLowerCase(),
    owner = "example:" + id;
  assert.ok(!byKey.has(owner), "Stable ID already exists");
  const references = [
      ...new Set(
        [row.itch_url, source, ...(row.all_evidence_urls || [])].filter((v) =>
          identity(v),
        ),
      ),
    ],
    home = identity(row.itch_url) ? row.itch_url : null;
  const example = {
    id,
    title: text.title,
    description: text.description,
    engine: text.engine,
    track: "3d",
    category: "community",
    aiUse:
      "Imported from a supplied itch 3D directory. No AI-authorship attribution is inferred. Source completeness, game/source correspondence, code and asset license coverage, builds, playability, safety and L1/L2/L3 were not independently certified. No native game, source project or mod was executed.",
    steps: [
      "Read the supplied author and source references, including exact edition, access and license restrictions.",
      "Check code, media, commercial original-data, third-party services and runtime requirements separately. Visible source is not reuse permission or a verified playable build.",
    ],
    tutorial: {
      label: "Read the supplied author/project reference",
      url: home || source,
      kind: "disclosure",
    },
    demo: {
      label: "View the supplied source reference",
      url: source,
      kind: "source",
      note: "Source reference only; no playable or downloadable build was independently verified. The author page is retained as evidence, not a fabricated play link.",
    },
    source: {
      label: "Inspect the supplied project/source reference",
      url: source,
      scope: "unverified-project",
      note:
        "Supplied directory code-license statement: " +
        text.codeLicenseNote +
        " Asset statement: " +
        text.assetLicenseNote +
        " Access/price snapshot: " +
        text.priceAccess +
        " Qualifications: " +
        text.caveat +
        " These are attributed intake statements, not a new complete-project, rights, runtime or AI-authorship certification.",
    },
    evidence: {
      label: "Read supplied author and directory references",
      url: home || source,
      note:
        "Imported " +
        basename(option("--input")) +
        ", row " +
        row.id +
        ", supplied metadata date " +
        row.checked_at +
        ". Input SHA-256: " +
        sha256 +
        ". Original ratings, dates, access statements, classification and evidence URLs remain in the raw intake download; they are not fresh playtests or quality grades. References: " +
        references.join(" "),
    },
    resourceIds: [],
    intake: {
      dataset: basename(option("--input")),
      rowId: row.id.toLowerCase(),
      sourceDate: row.checked_at,
      importedAt: now,
      sha256,
      verification:
        "Provided directory; source, release, code and asset licenses not independently rechecked",
      homepage: home,
    },
  };
  examples.push(example);
  const description = [row.genre, row.completion, row.quality_basis]
    .filter((v) => v && v !== "未核实")
    .join("。");
  localizations[owner] = {
    description:
      (description || row.name + "：来源资料不足，完成度待核验。") +
      (row.caveats ? " 注意：" + row.caveats : ""),
  };
  if (text.title !== row.name) localizations[owner].title = row.name;
  inputTargets.set(row.id, owner);
  known.set(key, {
    key: owner,
    kind: "example",
    canonical_path: "/examples/" + id + "/",
  });
  mappings.push({
    inputId: row.id,
    key: owner,
    status: "imported-source-only-unverified",
    canonicalPath: "/examples/" + id + "/",
    ...(override ? { rationale: override } : {}),
  });
}
const research = screen.decisions.flatMap((d) =>
    (d.evidence || [])
      .filter((e) => e.kind === "official_itch_https_text")
      .map((e) => ({
        inputId: d.id,
        kind: e.kind,
        url: e.url,
        checkedAt: e.checkedAt || e.checked_at,
        sha256: e.sha256,
        quotes: e.quotes,
      })),
  ),
  raw = {
    version: 1,
    source: {
      filename: basename(option("--input")),
      sha256,
      importedAt: now,
      suppliedMetadataDate: supplied.checked_at,
      policy:
        "Only identifiable games/prototypes with a public source reference; source-only/unverified. Explicit exclusions, unavailable/paid-only source, tools and original-data engines remain evidence, not freely reusable/playable games. Related ports/editions are mapped explicitly, not counted as unexplained duplicates.",
    },
    suppliedDirectory: supplied,
    screening: screen.decisions.map((d) => ({
      id: d.id,
      decision: d.decision,
      sourceUrl: d.sourceUrl,
      rationale: d.rationale,
      caveats: d.caveats,
    })),
    research: {
      scope:
        "Six official itch pages and six robots requests by worker; source-link recovery only, not license/runtime certification",
      pagesFetched: screen.research.pagesFetched,
      evidence: research,
      parentRecoveredSource: "https://github.com/OxillenGlow/MtSharpGrain",
      parentSourceScope:
        "Repository metadata/README confirm unfinished sandbox reference; no build, native execution or complete license audit.",
    },
    mappings,
    newExampleIds: examples.map((e) => e.id),
    includedLegacyThreejsIds: [...legacyIds].sort(),
  };
assert.equal(mappings.length, 145);
assert.doesNotMatch(
  JSON.stringify(raw),
  /\/Users\/|\/private\/var\/|\/var\/folders\//,
);
const output = async (p, v) =>
  writeFile(p, typeof v === "string" ? v : JSON.stringify(v, null, 2) + "\n");
if (args.includes("--dry-run")) {
  console.log(
    JSON.stringify(
      {
        rows: 145,
        newExamples: examples.length,
        legacy: [...legacyIds],
        mappings,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}
await output("data/segments/itch-3d-import.json", raw);
await output("website/public/itch-3d-games-import.json", raw);
await output(
  "website/src/data/itch3dGames.ts",
  "// Generated supplied-directory intake; not independent source/runtime verification.\nimport type { LearningPath } from './learningTypes';\nexport const itch3dGames: LearningPath[] = " +
    JSON.stringify(await applyPublishedDemos(examples), null, 2) +
    ";\n",
);
await output(
  "website/content/i18n/content/itch-3d-games.zh.json",
  localizations,
);
const fpPath = "website/content/i18n/content.zh.sources.json",
  fp = await read(fpPath);
for (const e of examples)
  for (const field of Object.keys(localizations["example:" + e.id])) {
    fp["example:" + e.id] ??= {};
    fp["example:" + e.id][field] = hash(JSON.stringify(e[field]));
  }
await output(fpPath, fp);
const policyPath = "website/content/open3d-import.config.json",
  policy = await read(policyPath);
policy.includedLegacyThreejsIds = [
  ...new Set([...policy.includedLegacyThreejsIds, ...legacyIds]),
].sort();
policy.additionalDatasets = [
  ...(policy.additionalDatasets || []).filter((d) => d.sha256 !== sha256),
  {
    dataset: basename(option("--input")),
    sha256,
    includedLegacyThreejsIds: [...legacyIds].sort(),
  },
];
await output(policyPath, policy);
console.log(
  JSON.stringify(
    {
      rows: 145,
      newExamples: examples.length,
      newOrReusedSourceReferenceMappings: mappings.filter((m) => m.key).length,
      reused: mappings.filter(
        (m) => m.key && m.status !== "imported-source-only-unverified",
      ).length,
      legacyReferenced: [...legacyIds],
      candidateOrExcluded: mappings.filter((m) => !m.key).length,
      sourceOnly: true,
    },
    null,
    2,
  ),
);
