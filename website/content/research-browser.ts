import type { ContentEntry } from "./models";
import { translate } from "./locale";

type ResearchEntry = ContentEntry<"repository-research">;
export const researchTopics = [
  { id: "games", label: "Games & game projects" },
  { id: "shooters", label: "FPS & shooter projects" },
  { id: "engines", label: "Engines & frameworks" },
  { id: "agents", label: "Agents & development workflows" },
  { id: "tools", label: "Authoring tools & starters" },
  { id: "research", label: "Research & benchmarks" },
  { id: "references", label: "Discovery lists & references" },
  { id: "unclassified", label: "Unclassified records" },
] as const;
export type ResearchTopic = (typeof researchTopics)[number]["id"];

/** Authored repository-level decisions, not the historical discovery-batch group.
 * Each of the original 254 summaries and qualifications has been reviewed.
 * New repositories stay unclassified until this inventory is reviewed as well.
 */
export const researchRepositoryTopics: Readonly<Record<string, ResearchTopic>> =
  {
    // Original source batch: reference
    "humpalumps/cadle": "shooters",
    // Original source batch: core
    "levy-street/world-of-claudecraft": "games",
    "corosolto/client": "games",
    "kevin-liu-01/claude-of-tanks": "games",
    "alexdevmotion/grand-theft-austerity-open-world": "games",
    "burry/mark-of-the-veil": "games",
    "vkopitsa/browser-shooter": "games",
    "reicapivararbx/capyquake": "shooters",
    "braffolk/fable5-world-demo": "engines",
    "braedonsaunders/voidstrike": "games",
    "barthpaleologue/cosmosjourneyer": "games",
    "serejaris/dust-arena": "unclassified",
    "realabdurrehman/decay": "shooters",
    "iamrichmack111/richmack-the-forest": "games",
    "bbs220/project_block_shooter": "shooters",
    "mohsenheydari/three-fps": "shooters",
    "tensorspace-ai/evolution-arena": "games",
    "gianlucatruda/music-melee": "shooters",
    "danyparc/antigravity-evil-eyes": "shooters",
    "arnie016/flight-simulator-fable5": "games",
    "imr4n4lif/bloodwave-fps-game": "shooters",
    "profullstack/nightcell7": "shooters",
    "bunprinceton/kings-field-game": "games",
    "humpalumps/aether": "tools",
    "moonfall-lab/moonfall-ark": "unclassified",
    "redblock-online/redblock-client": "games",
    // Original source batch: games_more
    "lbalab/lba2remake": "games",
    "niklever/threejs_rpg_game": "games",
    "stickyfingies/grove": "engines",
    "cedric-h/lab": "games",
    "kaetram/kaetram-open": "games",
    "hyperfy-xyz/hyperfy": "engines",
    "prismarinejs/prismarine-web-client": "games",
    "labystudio/js-minecraft": "games",
    "hexianweb/third-person-mc": "games",
    "justjavac/minecraft-web": "games",
    "maxscharwath/toonks-game": "games",
    "ryancampbell/kart-royale": "games",
    "toddetv/zlig": "games",
    "akarlsten/cuberun": "games",
    "coldi/r3f-game-demo": "games",
    "filahf/r3f-spotify-game": "games",
    "jonit-dev/vibe-coder-3d": "engines",
    "iaruso/circuit-rush": "games",
    "fgarrec0397/granity": "engines",
    "jl978/3d-tic-tac-toe": "games",
    "prnthh/react-three-game": "engines",
    "manan30/billiards": "games",
    "verekia/r3f-gamedev": "references",
    "winsznx/bull-rush": "games",
    "michaelkolesidis/beachy-beachy-ball": "games",
    "evedensity/mineworld": "games",
    "akay25/theaviator": "games",
    "norio/vrm-game-starter": "tools",
    "anshaneja5/skyline-run": "games",
    "esc5221/drive-game": "games",
    "eray114514/deep-space": "games",
    "pranshuparmar/downhill-mayhem": "games",
    "vheissu/emerald-bayou": "games",
    "winchxyz/celadon": "games",
    "jonradoff/chessmata": "games",
    "starknightt/pixel-quest": "games",
    "pshenok/datacenter-survival": "games",
    "laszlo-gilanyi/oldeneraexplorer": "tools",
    "quincunx33/fastroads": "games",
    "bridge-mind/tideline": "games",
    "avihaymenahem/voltmarch": "games",
    "emollick/monument-brutalist-city-builder": "games",
    "noisemaker111/jgengine": "engines",
    "baptistefalvet/needfortokens": "games",
    "wormholeportal/makone": "agents",
    "georgekobaidze/sunday-dev-drive": "games",
    "michaelkolesidis/fintech-world": "references",
    "hack23/blacktrigram": "games",
    "gyuomi/exidem": "games",
    "leslieyip02/racing": "games",
    "michaelkolesidis/zigzag": "games",
    "load1n9/caviar": "engines",
    "kpreid/all-is-cubes": "engines",
    "refsa/pollus": "engines",
    "snowfrogdev/nanojet": "engines",
    "eliassjogreen/pioneer": "engines",
    // Original source batch: fps_more
    "iercann/enari-engine": "tools",
    "haosong/3d-online-fps": "shooters",
    "parking-master/fps": "shooters",
    "mrdoob/three-descent": "shooters",
    "kamalesh404/multiplayer-fps-game": "shooters",
    "mrdoob/three-doom": "shooters",
    "ustymukhman/yetanotherzombiehorror": "shooters",
    "kamalesh404/velocity.io": "shooters",
    "starknightt/operation-ironhold": "shooters",
    "vincenzo-afk/nightfall": "shooters",
    "whitwhoa/open-browser-fps": "tools",
    "starknightt/cinder-ops": "shooters",
    "8tp/instagib-arena": "shooters",
    "iaanzhao/vertex-fps": "shooters",
    "comster/fps-threejs": "shooters",
    "kurt-hanel/mp-fps-game": "shooters",
    "eskafu/zombie-fps": "shooters",
    "mmclqx/frontline-zero": "shooters",
    "heihuzicity-tech/pastel-nuketown-fps": "shooters",
    "stobieee-bit/fpscape": "shooters",
    "rizdigico/voidstrike-fps": "shooters",
    "szefo94/vibeonduty": "shooters",
    "thefadghost/operation-blackline": "shooters",
    "dustinvii/the-outlands-game": "shooters",
    "hnprivv/forge_fps": "shooters",
    "tangkwok0104/cat-of-duty": "shooters",
    "whatgoodarewords/gungame": "shooters",
    "dong-quan-tran/phaserift": "shooters",
    "krishsoni15/deadsignal": "shooters",
    "alwin936/three.js-fps-game---vibe-coded-w-codex": "shooters",
    "luongnv89/codex-of-duty": "shooters",
    "tiagosilvapereira/simple-3d-fps": "shooters",
    "kylercondran/fate": "shooters",
    "zlatnaspirala/magic-three": "engines",
    "zundaai-lab/prism-rift-vanguard": "shooters",
    "footprintarts/threejs_fps_2.0": "tools",
    "leoopenbotdevelopment/three.js-3d-fps-game": "shooters",
    "codepankajpy/solfrag": "shooters",
    "n1md7/three-boilerplate": "tools",
    "thanosrestas/theasis": "shooters",
    "csarkosh/html5-fps": "unclassified",
    "timetocode/nengi-babylon-3d-shooter": "tools",
    "rolandcsibrei/babylon-lite-dude-particle-shooter": "shooters",
    "akhawatrahtw/cs1.6": "shooters",
    // Original source batch: ai_games
    "alexdevmotion/grand-theft-austerity": "games",
    "cbascom1/claudecodemetroidvaniagame": "games",
    "lawrab/the-pile": "tools",
    "noweh/mobius-chess": "games",
    "darupong/vite-endless-runner-game": "games",
    "az9713/pirate-adventure": "games",
    "uzzoper/vibecraft": "games",
    "susanzzzzzzz/aicraft": "games",
    "pahorema/murmur": "unclassified",
    "sentifold/generals-rts-threejs-port": "games",
    "romanticamaj/promptasy": "games",
    "yunit00/game-corovans": "games",
    "evanhgs/billard-anglais": "games",
    "alvarosabu/tres-breakout": "games",
    "gcoche-bit/synthcrew-mcp-game": "agents",
    // Original source batch: harness
    "majidmanzarpour/threejs-game-skills": "agents",
    "gamedev-skills/awesome-gamedev-agent-skills": "agents",
    "buyun00/seed-gamedev-harness": "agents",
    "donchitos/claude-code-game-studios": "agents",
    "bullish0x/gamestudio": "agents",
    "playableintelligence/game-creator": "agents",
    "heagandev/threejs-agent-starter": "agents",
    "0x0funky/agent-game-forge": "agents",
    "frabcd/codex-ai-game-studio": "agents",
    "sstobo/claude-code-game-master": "agents",
    "htdt/godogen": "agents",
    "gamekit-agent/gamekit-cli": "agents",
    "randallliuxin/godotmaker": "agents",
    "idocohen560/claude-unity-game-studio": "agents",
    "hermeticormus/claude-code-game-development": "agents",
    "joemonster/claude-game-studio": "agents",
    "shellishack/3d-web-game-dev-skills": "agents",
    "leanentropy/threejs-phaser-game-skills": "agents",
    "markjeromecruz/threejs-claude-starter": "tools",
    "mrcalderon3d/everything-game-dev-code": "agents",
    "akolaarthurali/everything-claude-code-claude-code-game-enhancer-2":
      "agents",
    // Original source batch: components
    "mrdoob/three.js": "engines",
    "babylonjs/babylon.js": "engines",
    "playcanvas/engine": "engines",
    "pmndrs/react-three-fiber": "engines",
    "pmndrs/drei": "engines",
    "enable3d/enable3d": "engines",
    "pmndrs/react-three-rapier": "engines",
    "dimforge/rapier.js": "engines",
    "pmndrs/cannon-es": "engines",
    "kripken/ammo.js": "engines",
    "vanruesc/postprocessing": "engines",
    "gkjohnson/three-mesh-bvh": "engines",
    "mugen87/yuka": "engines",
    "ecsyjs/ecsy": "engines",
    "natethegreatt/bitecs": "engines",
    "pmndrs/miniplex": "engines",
    "yomotsu/camera-controls": "engines",
    "pmndrs/three-stdlib": "engines",
    "jrouwe/joltphysics.js": "engines",
    "colyseus/colyseus": "engines",
    "geckosio/geckos.io": "engines",
    "nengi/nengi": "engines",
    "lance-gg/lance": "engines",
    "networked-aframe/networked-aframe": "engines",
    "zyfou/proceduralterrains": "tools",
    "icecreamyou/three.terrain": "engines",
    "mavonengine/core": "engines",
    "hyperfy-xyz/hyperfy-ref": "engines",
    "hyperfy-io/hyperfy-recipes": "references",
    "tcm390/eliza-3d-hyperfy-starter": "agents",
    "howieduhzit/hyperfy-tools": "tools",
    // Original source batch: classics
    "bkcore/hexgl": "games",
    "codeartemis/triggerrally": "games",
    "kripken/bananabread": "shooters",
    "cfoust/sour": "shooters",
    "phoboslab/q1k3": "shooters",
    "triang3l/webquake": "shooters",
    "turol/webquake2": "shooters",
    "lrusso/quake3": "shooters",
    "swift502/sketchbook": "games",
    "threejs-games/threejs-games.github.io": "references",
    // Original source batch: woc_ecosystem
    "humpalumps/world-of-claudecraft": "games",
    "marshalx/world-of-claudecraft-addons": "tools",
    "yoefun/world-of-claudecraft-rs": "unclassified",
    "u2/world-of-claudecraft-mcp": "agents",
    "remontsuri/world-of-claudecraft-agent": "unclassified",
    "wrkrdev/world-of-claudecraft-wrkr-demo": "unclassified",
    "slonce70/world-of-claudecraft-claude-bot": "agents",
    // Original source batch: awesome
    "michelpereira/awesome-open-source-games": "references",
    "leereilly/games": "references",
    "symbitic/awesome-babylonjs": "references",
    // Original source batch: discoveries_2026
    "genex-games/genex-desktop": "agents",
    "mrzh7/scam-with-your-friends-web": "games",
    "minedojo/voyager": "research",
    "baai-agents/cradle": "research",
    "eloialonso/diamond": "research",
    "solaris-wm/solaris": "research",
    "wenyiwu0111/rsigame": "research",
    "jefferysha0627/agent-office-3d": "agents",
    "jimntu/gamedirector_code": "research",
    "melonjs/melonjs": "engines",
    "esengine/estella": "engines",
    "soonfx-engine/core": "engines",
    "luckyyyyy/miu2d": "engines",
    "majidmanzarpour/vibe-coding-starter-pack-3d-multiplayer": "tools",
    "jamesun921/cam-run": "games",
    "freeciv/freeciv-web": "games",
    "wellingfeng/ultragamestudio": "agents",
    "yc-software/minecraft-agent-harness": "agents",
    "jamesiv4/nethack-3d": "games",
    "dammafra/drysland": "games",
    "openwebgal/webgal": "engines",
    "ill-inc/biomes-game": "games",
    "excaliburjs/excalibur": "engines",
    "tentone/nunustudio": "engines",
    "eva-engine/eva.js": "engines",
    "evanbacon/expo-crossy-road": "games",
    "evanbacon/pillar-valley": "games",
    "mattsurabian/duckhunt-js": "shooters",
    "priler/dino3d": "games",
    "megabyteceer/thing-editor": "tools",
    "axaq/traviso.js": "engines",
    "acatovic/ai-game-studio": "tools",
    "piqnt/stage.js": "engines",
    "ad044/laintsx": "games",
    "yomotsu/meshwalk": "engines",
    "jahrome907/minecraft-agent-skills": "agents",
    "rmalde/minecraft-agent": "agents",
    "patch-gg/trompe": "tools",
    "iercann/notblox": "games",
    "icecreamyou/nemesis": "shooters",
    "magestudio/mage": "engines",
  };

export const researchDispositionLabels: Record<string, string> = {
  "new-research": "New research",
  qualified: "Qualified",
  existing: "Already cataloged",
  unavailable: "Unavailable",
};
export const researchStageLabels: Record<string, string> = {
  documentation: "Documentation reviewed",
  static: "Implementation inspected",
  scaffold: "Early scaffold",
  metadata: "Metadata only",
  unavailable: "Evidence unavailable",
};
export const researchSnapshotLabels = {
  pinned: "Pinned evidence",
  unpinned: "Unpinned evidence",
} as const;
export const researchLicenseLabels: Record<string, string> = {
  mit: "MIT",
  apache: "Apache-2.0",
  gpl: "GPL",
  agpl: "AGPL",
  lgpl: "LGPL",
  mpl: "MPL-2.0",
  bsd: "BSD",
  isc: "ISC",
  zlib: "Zlib",
  cc0: "CC0",
  mixed: "Multiple code licenses",
  nonstandard: "Restricted or custom terms",
  unknown: "Unknown license",
};

const repositoryKey = (entry: ResearchEntry) =>
  entry.data.requested_repo.toLowerCase();
export function researchTopicFor(entry: ResearchEntry): ResearchTopic {
  return researchRepositoryTopics[repositoryKey(entry)] || "unclassified";
}

// These records explicitly leave their central engine/game implementation planned.
// A reusable starter or a feature roadmap alone does not make a project a scaffold.
const earlyScaffolds = new Set([
  "bunprinceton/kings-field-game",
  "jonit-dev/vibe-coder-3d",
  "eliassjogreen/pioneer",
  "vincenzo-afk/nightfall",
  "whatgoodarewords/gungame",
  "dustinvii/the-outlands-game",
]);
export function researchReadiness(entry: ResearchEntry) {
  const data = entry.data;
  const id =
    data.review_status === "unavailable"
      ? "unavailable"
      : data.review_status === "metadata-only"
        ? "metadata"
        : earlyScaffolds.has(repositoryKey(entry))
          ? "scaffold"
          : /bounded_static_source_reviewed/.test(data.inspection_scope) &&
              (data.source_evidence?.length || 0) > 0
            ? "static"
            : "documentation";
  return { id, label: researchStageLabels[id] };
}

/** A checked date is not a pinned source. Git/document blobs count as snapshots. */
export function researchSnapshot(entry: ResearchEntry) {
  const revision = entry.data.revision;
  const sha = typeof revision === "string" ? revision : revision?.sha;
  const pinned =
    /^[a-f0-9]{40}$/i.test(sha || "") ||
    /^[a-f0-9]{40}$/i.test(entry.data.readme_blob_sha || "") ||
    entry.data.source_urls.some((url) =>
      /\/blob\/[a-f0-9]{40}(?:\/|$)/i.test(url),
    );
  const id = pinned ? "pinned" : "unpinned";
  return { id, label: researchSnapshotLabels[id] };
}

/** Only the initial project-code declaration; later media/dependency claims differ. */
function licenseDeclaration(note: string) {
  return note.split(/\.(?:\s|$)/, 1)[0];
}
function licenseFamilies(note: string): string[] {
  const declaration = licenseDeclaration(note).replace(
    /\b(?:not|no|without|rather than)\s+(?:licensed?\s+(?:under\s+)?|an?\s+)?(?:MIT|Apache(?:-2\.0)?|A?GPL(?:-[23]\.0)?|LGPL(?:-[23]\.0)?|MPL(?:-2\.0)?|BSD(?:-[23]-Clause)?|ISC|Zlib|CC0)\b/gi,
    " ",
  );
  return [
    ["mit", /\bMIT\b/i],
    ["apache", /\bApache(?:[ -](?:License )?2(?:\.0)?)?\b/i],
    ["agpl", /\bAGPL\b|\bGNU Affero General Public License\b/i],
    ["lgpl", /\bLGPL\b|\bGNU Lesser General Public License\b/i],
    ["gpl", /\bGPL\b|\bGNU General Public License\b/i],
    ["mpl", /\bMPL\b|\bMozilla Public License\b/i],
    ["bsd", /\b(?:0BSD|BSD)\b/i],
    ["isc", /\bISC\b/i],
    ["zlib", /\bZlib\b/i],
    ["cc0", /\bCC0\b|Creative Commons Zero/i],
  ].flatMap(([id, pattern]) =>
    (pattern as RegExp).test(declaration) ? [id as string] : [],
  );
}
function licenseEvidence(entry: ResearchEntry) {
  const note = entry.data.license_note;
  const declaration = licenseDeclaration(note);
  // In these records a declaration is explicitly package-only or contradicted by
  // the inspected project license. A later MIT/ISC mention is not a reuse grant.
  if (
    /no (?:project-wide reuse )?license|no project-wide license|license (?:and reuse scope )?(?:remains )?(?:unknown|unestablished)|license evidence: unknown|requested-location license unknown|no reuse license established|current license and reuse scope could not/i.test(
      declaration,
    ) ||
    /^(?:Project-wide license remains unestablished|Root package\.json declares)/i.test(
      note,
    )
  )
    return { id: "unknown", terms: [] as string[] };
  const terms = licenseFamilies(note);
  const restricted =
    /Redblock Community|All rights reserved|proprietary|Custom|PolyForm|Business Source|CC-BY-NC|Attribution-NonCommercial|Modified CC|Omnia Public|additional terms/i.test(
      declaration,
    );
  const id = restricted
    ? "nonstandard"
    : terms.length > 1 || /plus retained upstream licenses/i.test(declaration)
      ? "mixed"
      : terms[0] || "unknown";
  const versionTerms = [
    ...["agpl", "lgpl", "gpl"].flatMap((family) => {
      if (!terms.includes(family)) return [];
      const match = new RegExp(
        `\\b${family}[- ]?v?([23])(?:\\.0)?\\b`,
        "i",
      ).exec(declaration);
      const fullName =
        family === "agpl" ? "Affero " : family === "lgpl" ? "Lesser " : "";
      const spelled = new RegExp(
        `GNU ${fullName}General Public License v?([23])(?:\\.0)?`,
        "i",
      ).exec(declaration);
      const version = match?.[1] || spelled?.[1];
      return version ? [`${family}-${version}.0`] : [];
    }),
    ...(terms.includes("bsd") && /\b0BSD\b/i.test(declaration) ? ["0bsd"] : []),
    ...(terms.includes("bsd")
      ? [...declaration.matchAll(/\bBSD-([23])-Clause\b/gi)]
      : []
    ).map((match) => `bsd-${match[1]}-clause`),
  ];
  return { id, terms: [...terms, ...versionTerms] };
}
export function researchLicense(
  entry: ResearchEntry,
  index?: ResearchSearchIndex,
) {
  if (index?.[entry.id]) return index[entry.id].license;
  const { id } = licenseEvidence(entry);
  return { id, label: researchLicenseLabels[id] };
}

export interface ResearchBrowserOption {
  id: string;
  label: string;
  count: number;
}
export interface ResearchBrowserOptions {
  topics: ResearchBrowserOption[];
  statuses: ResearchBrowserOption[];
  stages: ResearchBrowserOption[];
  snapshots: ResearchBrowserOption[];
  licenses: ResearchBrowserOption[];
  sorts: { id: string; label: string }[];
}
export interface ResearchBrowserFilters {
  query: string;
  topic: string;
  status: string;
  stage: string;
  snapshot: string;
  license: string;
  sort: "ledger" | "title" | "checked";
}
export function researchBrowserOptions(
  entries: readonly ResearchEntry[],
): ResearchBrowserOptions {
  const options = (
    labels: Record<string, string>,
    value: (entry: ResearchEntry) => string,
  ) =>
    Object.entries(labels)
      .map(([id, label]) => ({
        id,
        label,
        count: entries.filter((entry) => value(entry) === id).length,
      }))
      .filter(({ count }) => count > 0);
  return {
    topics: options(
      Object.fromEntries(researchTopics.map(({ id, label }) => [id, label])),
      researchTopicFor,
    ),
    statuses: options(
      researchDispositionLabels,
      (entry) => entry.data.disposition,
    ),
    stages: options(
      researchStageLabels,
      (entry) => researchReadiness(entry).id,
    ),
    snapshots: options(
      researchSnapshotLabels,
      (entry) => researchSnapshot(entry).id,
    ),
    licenses: options(
      researchLicenseLabels,
      (entry) => researchLicense(entry).id,
    ),
    sorts: [
      { id: "ledger", label: "Ledger order" },
      { id: "title", label: "Repository title" },
      { id: "checked", label: "Recently checked" },
    ],
  };
}
export function normalizeResearchFilters(
  params: URLSearchParams,
  options: ResearchBrowserOptions,
): ResearchBrowserFilters {
  const supported = (value: string | null, list: ResearchBrowserOption[]) =>
    list.some(({ id }) => value === id) ? value! : "all";
  const sort = params.get("sort");
  return {
    query: params.get("q")?.trim() || "",
    topic: supported(params.get("topic"), options.topics),
    status: supported(params.get("status"), options.statuses),
    stage: supported(params.get("stage"), options.stages),
    snapshot: supported(params.get("snapshot"), options.snapshots),
    license: supported(params.get("license"), options.licenses),
    sort: sort === "title" || sort === "checked" ? sort : "ledger",
  };
}

/** JSON-safe because the loader sends it to the client. No labels/URLs/SHAs. */
export type ResearchSearchIndex = Record<
  string,
  {
    text: string;
    licenseTerms: string[];
    license: { id: string; label: string };
  }
>;

const topicAliases: Record<ResearchTopic, string> = {
  games: "Games & game projects 游戏与游戏项目 游戏项目",
  shooters: "Shooters & FPS 射击与第一人称项目 射击项目",
  engines: "Engines & frameworks 引擎与框架",
  agents: "Game AI & agents AI 智能体与开发工作流 游戏智能体",
  tools: "Authoring & inspection tools 创作与检查工具 创作工具与起步模板",
  research: "Research & benchmarks 研究与基准",
  references: "Discovery lists & references 发现清单与参考资料 目录 索引",
  unclassified: "Unclassified records 待分类记录",
};
const facetAliases: Record<string, string> = {
  "new-research": "新增研究 新研究记录",
  qualified: "附使用条件 附条件",
  existing: "已收录 已有条目",
  unavailable: "不可访问 证据不可用",
  documentation: "文档已审阅 文档审阅",
  static: "实现已静态检查 静态实现检查",
  scaffold: "早期脚手架",
  metadata: "仅元数据",
  pinned: "证据已固定 固定证据",
  unpinned: "证据未固定 未固定证据",
  mixed: "多种代码许可",
  nonstandard: "受限或自定义条款",
  unknown: "许可未知 未知许可",
};
function discoveryText(entry: ResearchEntry) {
  const data = entry.data;
  // Actual discovery prose only. Provenance, source URLs, evidence findings,
  // commit messages, dates, hashes, and presentation field labels stay out.
  return [
    entry.title,
    entry.description,
    data.requested_repo,
    data.canonical_repo,
    data.summary,
    data.ai_note,
    data.license_note,
    ...data.limitations,
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/\b[a-f0-9]{40}\b/gi, " ");
}
function facetText(entry: ResearchEntry) {
  const topic = researchTopicFor(entry);
  const idsAndLabels = [
    [topic, researchTopics.find(({ id }) => id === topic)!.label],
    [entry.data.disposition, researchDispositionLabels[entry.data.disposition]],
    Object.values(researchReadiness(entry)),
    Object.values(researchSnapshot(entry)),
    Object.values(researchLicense(entry)),
  ];
  return [
    topicAliases[topic],
    ...idsAndLabels.flatMap(([id, label]) => [
      id,
      label,
      label ? translate("zh", label) : "",
      facetAliases[id],
    ]),
  ]
    .filter(Boolean)
    .join(" ");
}
export function buildResearchSearchText(
  english: readonly ResearchEntry[],
  chinese: readonly ResearchEntry[],
): ResearchSearchIndex {
  const translations = new Map(chinese.map((entry) => [entry.id, entry]));
  return Object.fromEntries(
    english.map((entry) => [
      entry.id,
      {
        text: [
          discoveryText(entry),
          translations.has(entry.id)
            ? discoveryText(translations.get(entry.id)!)
            : "",
          facetText(entry),
        ]
          .join(" ")
          .toLocaleLowerCase(),
        licenseTerms: licenseEvidence(entry).terms,
        license: researchLicense(entry),
      },
    ]),
  );
}

function licenseQueryTerm(token: string) {
  const version = /^(agpl|lgpl|gpl)-?v?([23])(?:\.0)?(?:-or-later|\+)?$/.exec(
    token,
  );
  if (version) return `${version[1]}-${version[2]}.0`;
  if (/^(?:0bsd|bsd-[23]-clause)$/.test(token)) return token;
  const match =
    /^(mit|apache|agpl|lgpl|gpl|mpl|bsd|isc|zlib|cc0)(?:-?(?:v?\d[\w.+-]*|license))?$/.exec(
      token,
    );
  return match?.[1];
}
function matchesResearchSearch(
  item: ResearchSearchIndex[string],
  query: string,
) {
  const tokens = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const hasLicense = tokens.some((token) => licenseQueryTerm(token));
  return tokens.every((token) => {
    const license = licenseQueryTerm(token);
    if (license) return item.licenseTerms.includes(license);
    if (hasLicense && /^(?:licen[cs]e|许可证|许可)$/.test(token)) return true;
    return item.text.includes(token);
  });
}
export function selectResearchEntries(
  entries: readonly ResearchEntry[],
  filters: ResearchBrowserFilters,
  index?: ResearchSearchIndex,
): ResearchEntry[] {
  return entries
    .filter((entry) => {
      const search = index?.[entry.id] || {
        text: `${discoveryText(entry)} ${facetText(entry)}`.toLocaleLowerCase(),
        licenseTerms: licenseEvidence(entry).terms,
        license: researchLicense(entry),
      };
      return (
        (filters.topic === "all" ||
          researchTopicFor(entry) === filters.topic) &&
        (filters.status === "all" ||
          entry.data.disposition === filters.status) &&
        (filters.stage === "all" ||
          researchReadiness(entry).id === filters.stage) &&
        (filters.snapshot === "all" ||
          researchSnapshot(entry).id === filters.snapshot) &&
        (filters.license === "all" ||
          researchLicense(entry, index).id === filters.license) &&
        matchesResearchSearch(search, filters.query)
      );
    })
    .sort((a, b) => {
      if (filters.sort === "ledger") return 0;
      const titleOrder = a.data.requested_repo
        .toLowerCase()
        .localeCompare(b.data.requested_repo.toLowerCase(), "en");
      return filters.sort === "checked"
        ? b.data.checked_at.localeCompare(a.data.checked_at) || titleOrder
        : titleOrder;
    });
}
