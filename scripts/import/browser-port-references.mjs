import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { publicMediaURL } from "../lib/example-media.mjs";
const args = process.argv.slice(2),
  option = (k) => args[args.indexOf(k) + 1];
for (const k of ["--provided", "--engine-review", "--reverse-review"])
  assert.ok(args.includes(k));
const inputText = await readFile(option("--provided"), "utf8"),
  provided = JSON.parse(inputText),
  engine = JSON.parse(await readFile(option("--engine-review"), "utf8")),
  reverse = JSON.parse(await readFile(option("--reverse-review"), "utf8")),
  records = [...engine.records, ...reverse.records].sort((a, b) =>
    a.id.localeCompare(b.id),
  ),
  sha = (v) => createHash("sha256").update(v).digest("hex"),
  inputHash = sha(inputText),
  now = new Date().toISOString().slice(0, 10),
  verification =
    "Provided directory; source, release, code and asset licenses not independently rechecked";
assert.equal(records.length, 25);
assert.equal(new Set(records.map((r) => r.id)).size, 25);
assert.equal(provided.records.length, 25);
const sourceIds = new Set([
    "browser-port-02",
    "browser-port-03",
    "browser-port-06",
    "browser-port-08",
    "browser-port-17",
    "browser-port-21",
  ]),
  referenceIds = new Set([
    "browser-port-12",
    "browser-port-15",
    "browser-port-19",
    "browser-port-22",
  ]),
  games = [],
  collections = [],
  zh = {},
  mappings = [];
for (const r of records) {
  assert.equal(r.notPlaytested, true);
  const id = r.id,
    reference = referenceIds.has(id),
    source = sourceIds.has(id);
  if (!reference && !source) {
    mappings.push({
      inputId: id,
      status:
        id === "browser-port-25" ? "resource-reference" : "research-candidate",
    });
    continue;
  }
  const url = reference ? r.entryUrl : r.sourceUrl;
  publicMediaURL(url);
  assert.ok(
    !/xash3d\.pieter\.com|quake[12]\.pieter\.com|doom3\.pieter\.com/.test(url),
    "Discard speculative hostname probes",
  );
  const title =
    id === "browser-port-12"
      ? "Urban Terror browser reference"
      : id === "browser-port-06"
        ? "Skate 3 Rust/Bevy reimplementation"
        : r.name;
  const condition =
    r.conditionsEn +
    (id === "browser-port-06"
      ? " Admitted as an experimental native game-source reference, NOT a confirmed browser edition."
      : "");
  const game = {
    id,
    title,
    description: r.descriptionEn,
    engine: r.engine,
    track: r.track,
    category: "community",
    aiUse:
      "Source/project reference intake, not AI-authorship attribution. Public text, README and user-supplied assertions are distinguished from runtime tests. No source-completeness, license/asset coverage, buildability, gameplay, safety or L1/L2/L3 certification. No game, native project, original-game asset, ROM, multiplayer session, conversion or emulator was executed.",
    steps: [
      "Inspect the exact project, source/engine lineage and edition before interpreting this reference.",
      "Check original-data ownership, proprietary assets, access restrictions, source correspondence and runtime requirements separately; code licensing is not a commercial-asset grant.",
    ],
    tutorial: {
      label: "Read the identified project reference",
      url,
      kind: "disclosure",
    },
    demo: {
      label: reference
        ? "View the observed project page"
        : "Inspect the identified source reference",
      url,
      kind: reference ? "reference" : "source",
      note: reference
        ? "Project/landing reference only. Corresponding browser-port source is not located; no verified play/download link is published."
        : condition + " No verified play/download link is published.",
    },
    source: {
      label: reference
        ? "Project reference, corresponding source unverified"
        : "Source reference, scope unverified",
      url,
      scope: reference ? "project-reference" : "unverified-project",
      note:
        "Technique: " +
        r.technique +
        " Source boundary: " +
        r.sourceScope +
        " Code: " +
        r.codeLicenseNote +
        " Assets: " +
        r.assetLicenseNote +
        " Access/runtime: " +
        r.availability +
        " Conditions: " +
        condition,
    },
    evidence: {
      label: "Read the observed reference and retained research evidence",
      url,
      note:
        "Structured user-provided 25-item directory, original supplied review date 2026-10-25. Input text SHA-256: " +
        inputHash +
        ". The supplied date is not our playtest date. Exact public-text quotes, real access times, hashes, denied hosts and unresolved claims are retained in browser-port-research.json. Evidence URLs: " +
        r.evidence.map((e) => e.url).join(" "),
    },
    resourceIds: [],
    intake: {
      dataset: "browser-port-research.json / structured user intake",
      rowId: id,
      sourceDate: "2026-10-25",
      importedAt: now,
      sha256: inputHash,
      verification,
      homepage: reference ? url : null,
    },
  };
  for (const key of ["title", "description", "engine", "aiUse"])
    assert.ok(game[key]?.trim());
  assert.doesNotMatch(
    JSON.stringify(game),
    /\p{Script=Han}|\/Users\/|\/var\/folders\//u,
  );
  games.push(game);
  zh["example:" + id] = {
    description:
      r.descriptionZh +
      " 注意：" +
      r.conditionsZh +
      (id === "browser-port-06"
        ? " 按实验性原生源码项目收录，不代表已确认浏览器版本。"
        : ""),
  };
  if (id === "browser-port-12")
    zh["example:" + id].title = "Urban Terror 浏览器项目参考";
  mappings.push({
    inputId: id,
    key: "example:" + id,
    status: reference
      ? "project-reference-source-unverified"
      : "source-reference-conditions-required",
  });
}
const catalogue = records.find((r) => r.id === "browser-port-25");
assert.equal(catalogue.decision, "resource");
publicMediaURL(catalogue.sourceUrl);
const collection = {
  id: "wasm-arcade-repository-catalogue",
  title: "WASM Arcade repository catalogue",
  url: catalogue.sourceUrl,
  description:
    "Public repository aggregation reference, not a game or a verified launcher. The correspondence to the supplied WASM Arcade website is unconfirmed; its advertised deployment was not fetched. Entries may mix source ports, emulation and other runtimes. Inclusion grants no game-code, ROM or asset redistribution rights.",
};
collections.push(collection);
zh["collection:" + collection.id] = {
  description:
    "WASM Arcade 的公开仓库聚合参考，不是单个游戏或经验证的启动器；尚未确认它是否对应用户名单中的同名网站，所宣称的部署站点未访问。条目可能混合源码移植、模拟及其他运行方式，收录不代表取得代码、ROM 或资产再分发许可。",
};
mappings.find((m) => m.inputId === "browser-port-25").key =
  "collection:" + collection.id;
const raw = {
  version: 1,
  source: {
    description:
      "Structured transcription of user-provided 25-reference message; not a verbatim full conversation archive",
    inputSha256: inputHash,
    originalInputText: inputText,
    importedAt: now,
    suppliedReviewDate: "2026-10-25",
    policy:
      "Operator explicitly approved evidence-based split and four project-reference cards with corresponding source unverified. Offline/451/removed/unclear projects remain candidates; aggregators are collections, not games. No runtime, source completeness or asset-rights claim.",
  },
  records,
  mappings,
  newExampleIds: games.map((g) => g.id),
  sourceReferenceIds: [...sourceIds],
  projectReferenceIds: [...referenceIds],
  collections: collections.map((c) => c.id),
  research: {
    engine: engine.research,
    reverse: reverse.research,
    issues: [...(engine.issues || []), ...(reverse.issues || [])],
    parentDisposition:
      "Discard speculative hostname probes as evidence. No follow-up requests to GitHub/API after reported 403. Native Skate source is admitted with browser uncertainty, not promoted as a browser build. All 25 entries and conditional/removed-project evidence retained.",
  },
};
assert.equal(games.length, 10);
assert.equal(collections.length, 1);
assert.equal(
  mappings.filter((m) => m.status === "research-candidate").length,
  14,
);
assert.doesNotMatch(
  JSON.stringify(raw),
  /\/Users\/|\/private\/var\/|\/var\/folders\//,
);
const output = async (p, v) =>
  writeFile(p, typeof v === "string" ? v : JSON.stringify(v, null, 2) + "\n");
await output("data/segments/browser-port-research.json", raw);
await output("website/public/browser-port-research.json", raw);
await output(
  "website/src/data/browserPortGames.ts",
  "// Explicit source and project references; no games or proprietary assets executed.\nimport type { LearningPath } from './learningTypes';\nexport const browserPortGames: LearningPath[] = " +
    JSON.stringify(games, null, 2) +
    ";\n",
);
await output(
  "website/src/data/browserPortCollections.ts",
  "// Aggregation resources are not game cases or verified launchers.\nimport type { PayloadModels } from '../../content/contracts';\nexport const browserPortCollections: PayloadModels['collection'][] = " +
    JSON.stringify(collections, null, 2) +
    ";\n",
);
await output("website/content/i18n/content/browser-ports.zh.json", zh);
const fpPath = "website/content/i18n/content.zh.sources.json",
  fp = JSON.parse(await readFile(fpPath, "utf8"));
delete fp["collection:browser-port-wasm-arcade"];
for (const e of [...games, ...collections]) {
  const key = (games.includes(e) ? "example:" : "collection:") + e.id;
  for (const field of Object.keys(zh[key])) {
    fp[key] ??= {};
    fp[key][field] = sha(JSON.stringify(e[field]));
  }
}
await output(fpPath, fp);
console.log(
  JSON.stringify({
    providedReferences: 25,
    sourceReferenceGames: 6,
    projectReferenceCards: 4,
    conditionalNativeSource: 1,
    researchCandidates: 14,
    aggregationCollections: 1,
    notExecuted: true,
  }),
);
