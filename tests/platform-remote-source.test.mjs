import test from "node:test";
import sharp from "sharp";
import assert from "node:assert/strict";
import {
  mkdir,
  mkdtemp,
  readFile,
  writeFile,
  rm,
  symlink,
  access,
} from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { loadContent } from "../scripts/lib/content.mjs";
import { canonicalJSON, sha256 } from "../scripts/lib/catalog/codec.mjs";
import { kindAdapters } from "../scripts/lib/catalog/adapters.mjs";
import {
  remoteSource,
  safeSourcePath,
  readSourceFile,
  decodeRouterData,
  validateCandidate,
  validateRemotePackage,
  buildRemoteSource,
  recoverRemoteSource,
  compareLocalBodies,
} from "../scripts/lib/catalog/remote-source.mjs";

const context = await loadContent("/");
const scratch = resolve(".build/remote-source-tests");
await mkdir(scratch, { recursive: true });
async function directory(t) {
  const path = await mkdtemp(join(scratch, "case-"));
  t.after(() => rm(path, { recursive: true, force: true }));
  return path;
}
const local = context.registry.byKey("resource:codex");
const resource = () => ({
  key: local.key,
  kind: local.kind,
  identifier: local.id,
  body: {
    title: local.title,
    summary: local.description,
    payload: structuredClone(local.data),
    attachments: structuredClone(
      kindAdapters.resource.attachments(local, context.sources),
    ),
  },
  source_ref: "data/resources.json",
  source_review: { remote_revision: remoteSource.revision },
});
// Deterministic reference-table fixtures exercise the same recovery path as real packets.
function encodeRoute(name, data) {
  const table = [];
  function ref(value) {
    const index = table.length;
    table.push(null);
    table[index] = Array.isArray(value)
      ? value.map(ref)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.entries(value).map(([key, child]) => [
              `_${ref(key)}`,
              ref(child),
            ]),
          )
        : value;
    return index;
  }
  ref({ [name]: { data } });
  return Buffer.from(JSON.stringify(table) + "\n");
}
async function recoveredFixture(entries, extra = {}) {
  const resources = entries.filter((entry) => entry.kind === "resource");
  const examples = entries.filter((entry) => entry.kind === "example");
  const demos = entries.filter((entry) => entry.kind === "demo");
  const papers = entries.filter((entry) => entry.kind === "paper");
  const row = (entry) => ({
    key: entry.key,
    kind: entry.kind,
    id: entry.identifier,
    title: entry.body.title,
    description: entry.body.summary,
    url: `/resources/${entry.identifier}/`,
    collectionUrl: "/resources/",
    data: entry.body.payload,
    source: "fixture.json",
    blocks: entry.body.attachments.projectMedia
      ? [
          {
            type: "image",
            field: "projectMedia",
            ...entry.body.attachments.projectMedia,
          },
        ]
      : [],
  });
  const media = Object.fromEntries(
    examples
      .filter((e) => e.body.attachments.learningMedia)
      .map((e) => [e.identifier, e.body.attachments.learningMedia]),
  );
  const sources = new Map(
    Object.entries({
      "data/resources.data": encodeRoute("resources", {
        entries: resources.map(row),
        demos: [],
      }),
      "data/examples.data": encodeRoute("examples", {
        examples: examples.map(row),
        platforms: [],
        foundations: [],
        collections: [],
        media,
      }),
      "data/agents.data": encodeRoute("agents", {
        tools: [],
        examples: [],
        media,
        attribution: Object.fromEntries(
          examples.map((e) => [
            e.identifier,
            e.body.attachments.agentAttribution,
          ]),
        ),
      }),
      "data/paths.data": encodeRoute("paths", { paths: [], steps: [] }),
      "data/showcase.data": encodeRoute("demos", { demos: demos.map(row) }),
      "data/testing.data": encodeRoute("testing", { entries: [], packs: [] }),
      "data/research.data": encodeRoute("research", { records: [] }),
      "data/docs.data": encodeRoute("docs", { manifest: [] }),
      ...Object.fromEntries(
        Object.entries({
          "data/resources.json": resources.map((e) => e.body.payload),
          "data/logo-sources.json": Object.fromEntries(
            resources.map((e) => [e.identifier, e.body.attachments.identity]),
          ),
          "data/testing-resources.json": { resources: [], starterPacks: [] },
          "data/repository-research.json": { records: [] },
          "data/papers.json": papers.map((e) => e.body.payload),
          "data/papers-provenance.json": {
            records: papers.map((e) => ({
              recordId: e.identifier,
              license: "License not established",
            })),
          },
          "collections/threejs-games/games.json": {
            $schema: "games.schema.json",
            schema_version: 2,
            games: [],
          },
          "collections/threejs-games/candidates.json": {
            $schema: "candidates.schema.json",
            schema_version: 1,
            candidates: [],
          },
          "data/search-index.json": { documents: [] },
        }).map(([path, value]) => [path, Buffer.from(JSON.stringify(value))]),
      ),
      ...extra,
    }),
  );
  const read = async (path) => {
    if (!sources.has(path) && /^(logos|media)\//.test(path))
      sources.set(path, await readFile(join("website/public", path)));
    assert.ok(sources.has(path), `Missing fixture source: ${path}`);
    return sources.get(path);
  };
  return recoverRemoteSource(read, [...sources.keys()], context);
}
async function fixture(t, entries = [resource()], extra = {}) {
  const root = await directory(t);
  const { pack, files } = await recoveredFixture(entries, extra);
  for (const [path, bytes] of files) {
    await mkdir(dirname(join(root, "source", path)), { recursive: true });
    await writeFile(join(root, "source", path), bytes);
  }
  const save = () =>
    writeFile(join(root, "candidates.json"), canonicalJSON(pack));
  await save();
  return { root, pack, save };
}

test("remote-source safeSourcePath rejects traversal, encoded paths, URLs and ambiguous segments", () => {
  for (const value of [
    "../x",
    "/tmp/x",
    "a/../x",
    "a/./x",
    "a//x",
    "a\\x",
    "C:/x",
    "a%2fx",
    "x?x",
    "x#x",
    "x\0",
    "",
    null,
  ])
    assert.throws(() => safeSourcePath(value));
  assert.equal(safeSourcePath("data/papers.json"), "data/papers.json");
});

test("remote-source readSourceFile rejects symlinks and directories", async (t) => {
  const root = await directory(t);
  await writeFile(join(root, "real"), "evidence");
  await symlink("real", join(root, "link"));
  await mkdir(join(root, "folder"));
  await symlink("folder", join(root, "indirect"));
  await writeFile(join(root, "folder/item"), "evidence");
  await assert.rejects(readSourceFile(root, "link"), /Symlink/);
  await assert.rejects(readSourceFile(root, "indirect/item"), /Symlink/);
  await assert.rejects(readSourceFile(root, "folder"), /Not a file/);
  assert.equal(String(await readSourceFile(root, "real")), "evidence");
});

test("remote-source decodeRouterData uses data decoding, not execution", async () => {
  const encoded =
    '[{"_1":2},"route",{"_3":4},"data",{"_5":6},"message","hello"]\n';
  assert.deepEqual(await decodeRouterData(Buffer.from(encoded)), {
    route: { data: { message: "hello" } },
  });
  await assert.rejects(
    decodeRouterData(Buffer.from("globalThis.__remoteExecuted = true;")),
  );
  assert.equal(globalThis.__remoteExecuted, undefined);
  await assert.rejects(decodeRouterData(Buffer.from('[{"_1":99},"broken"]\n')));
  await assert.rejects(
    decodeRouterData(Buffer.from('[["Date","2026-01-01T00:00:00Z"]]\n')),
  );
});

test("remote-source validates current strict payload and attachment contracts without stripping unknown fields", () => {
  validateCandidate(resource(), context);
  for (const mutate of [
    (r) => {
      r.kind = "unknown";
    },
    (r) => {
      r.extra = true;
    },
    (r) => {
      r.body.extra = true;
    },
    (r) => {
      r.body.payload.surprise = true;
    },
    (r) => {
      r.body.attachments.identity.surprise = true;
    },
    (r) => {
      r.identifier = "other";
      r.key = "resource:other";
    },
    (r) => {
      r.source_ref = "../source";
    },
    (r) => {
      r.source_review.remote_revision = "0".repeat(40);
    },
  ]) {
    const row = resource();
    mutate(row);
    assert.throws(() => validateCandidate(row, context));
  }
});

test("remote-source comparison separates missing, unchanged and conflicts using real registry keys", () => {
  const same = resource(),
    conflict = resource(),
    missing = resource();
  conflict.body.summary = "A different summary";
  missing.key = "resource:absent";
  missing.identifier = "absent";
  missing.body.payload.id = "absent";
  assert.deepEqual(compareLocalBodies([same], context).resource.identical, [
    same.key,
  ]);
  assert.deepEqual(compareLocalBodies([conflict, missing], context).resource, {
    missing: [missing.key],
    identical: [],
    conflicts: [conflict.key],
  });
});

test("remote-source package validates hashes, duplicates, envelope fields and destination paths", async (t) => {
  const { root, pack, save } = await fixture(t);
  assert.equal((await validateRemotePackage(root, context)).entries, 1);
  const original = structuredClone(pack);
  const mutations = [
    (p) => p.entries.push(p.entries[0]),
    (p) => p.files.push(p.files[0]),
    (p) => {
      p.files[0].path = "../outside";
    },
    (p) => {
      p.files[0].sha256 = "0".repeat(64);
    },
    (p) => {
      p.files[0].bytes += 1;
    },
    (p) => {
      p.version = 2;
    },
    (p) => {
      p.unknown = true;
    },
    (p) => {
      p.source.revision = "0".repeat(40);
    },
    (p) => {
      p.entries[0].source_ref = "missing.json";
    },
    (p) => {
      p.documents = [
        {
          source_path: "data/resources.json",
          path: "docs/generated.html",
          sha256: p.files[0].sha256,
          bytes: p.files[0].bytes,
        },
      ];
    },
    (p) => {
      p.artifacts = [
        {
          source_path: "data/resources.json",
          path: "../x",
          sha256: p.files[0].sha256,
          bytes: p.files[0].bytes,
        },
      ];
    },
    (p) => {
      p.excluded = [
        {
          key: p.entries[0].key,
          source_ref: p.entries[0].source_ref,
          reason: "excluded",
        },
      ];
    },
  ];
  for (const mutate of mutations) {
    for (const key of Object.keys(pack)) delete pack[key];
    Object.assign(pack, structuredClone(original));
    mutate(pack);
    await save();
    await assert.rejects(validateRemotePackage(root, context));
  }
});

test("remote-source fidelity rejects empty source, valid-schema forgeries and exclusion changes without source hash edits", async (t) => {
  const good = await fixture(t);
  const empty = await fixture(t, []);
  empty.pack.entries.push(structuredClone(good.pack.entries[0]));
  validateCandidate(empty.pack.entries[0], context);
  assert.deepEqual(
    JSON.parse(await readFile(join(empty.root, "source/data/resources.json"))),
    [],
  );
  await empty.save();
  await assert.rejects(
    validateRemotePackage(empty.root, context),
    /Source fidelity mismatch: entries/,
  );
  const original = structuredClone(good.pack);
  for (const mutate of [
    (p) => {
      p.entries[0].body.payload.detail = "Forged but schema-valid Codex detail";
    },
    (p) => {
      p.entries[0].body.title = "Forged title";
    },
    (p) => {
      p.entries[0].body.summary = "Forged summary";
    },
    (p) => {
      p.entries[0].body.attachments.identity.notes = "Forged credit";
    },
    (p) => {
      p.entries[0].source_review.authoring_source = "forged.json";
    },
    (p) => {
      const forged = structuredClone(p.entries[0]);
      forged.identifier = forged.body.payload.id = "forged-loader";
      forged.key = "resource:forged-loader";
      p.entries.push(forged);
    },
    (p) => {
      p.entries = [];
    },
    (p) => {
      p.excluded.push({
        key: "resource:forged-exclusion",
        reason: "Untrue",
        source_ref: "data/resources.data",
      });
    },
    (p) => {
      const e = p.entries.pop();
      p.excluded.push({
        key: e.key,
        reason: "Forged quarantine",
        source_ref: e.source_ref,
      });
    },
  ]) {
    Object.assign(good.pack, structuredClone(original));
    mutate(good.pack);
    good.pack.entries.forEach((entry) => validateCandidate(entry, context));
    assert.deepEqual(good.pack.files, original.files);
    await good.save();
    await assert.rejects(
      validateRemotePackage(good.root, context),
      /Source fidelity mismatch/,
    );
  }
});

// Complete native record preserved from the pinned public source, including license caveats.
const paperPayload = {
  id: "paper-arxiv-2404-02039",
  title: "A survey on large language model-based game agents",
  description:
    "Journal paper cited as reference [139] in AI for Games in the Foundation Model Era. ACM Computing Surveys, 2026b. First posted in 2024; revised 2026.",
  authors: "Sihao Hu, Tiansheng Huang, Gaowen Liu, et al.",
  year: 2026,
  publication:
    "ACM Computing Surveys, 2026b. First posted in 2024; revised 2026.",
  referenceType: "journal-paper",
  primaryRole: "play",
  roles: ["play"],
  topics: [
    "Role: play",
    "Surveys and research syntheses",
    "Language and multimodal agents",
  ],
  url: "https://arxiv.org/abs/2404.02039",
  arxivId: "2404.02039",
  resourceIds: [],
  origins: [
    {
      label: "Survey reference [139]",
      url: "https://arxiv.org/html/2609.16679v1#bib.bib139",
    },
  ],
  citedSections: [
    {
      label: "1 Introduction",
      url: "https://arxiv.org/html/2609.16679v1#S1",
    },
  ],
  classification:
    "Editorial roles and topics follow the survey’s cited sections and system index. These are navigation categories, not independently verified capability claims.",
  pdfUrl: "https://arxiv.org/pdf/2404.02039",
  access: {
    codeStatus: "not-found",
    repositories: [
      {
        label: "git-disl/awesome-LLM-game-agent-papers",
        url: "https://github.com/git-disl/awesome-LLM-game-agent-papers",
        kind: "research-index",
        license: {
          status: "unspecified",
          name: "License not established",
        },
      },
    ],
    projects: [],
    demos: [],
    reviewStatus: "source-reviewed",
    checkedAt: "2026-10-20",
    evidence: [
      {
        label: "Original paper and author comments",
        url: "https://arxiv.org/abs/2404.02039",
      },
      {
        label: "Survey authors’ official resource mapping",
        url: "https://github.com/Eurekaleo/awesome-ai-for-games/blob/main/data/official-resources.json",
      },
      {
        label: "Source repository",
        url: "https://github.com/git-disl/awesome-LLM-game-agent-papers",
      },
    ],
    notes: [
      "Research index or project website, not research implementation.",
      "Repository is public; an explicit open-source license was not established. Public visibility does not grant an open-source license.",
    ],
  },
};
test("remote-source fidelity binds native title, summary and paper provenance as well as payload", async (t) => {
  const payload = structuredClone(paperPayload);
  const f = await fixture(t, [
    {
      kind: "paper",
      identifier: payload.id,
      key: `paper:${payload.id}`,
      body: {
        title: payload.title,
        summary: payload.description,
        payload,
        attachments: {},
      },
    },
  ]);
  assert.equal(f.pack.entries.length, 1);
  await validateRemotePackage(f.root, context);
  const original = structuredClone(f.pack);
  for (const mutate of [
    (e) => {
      e.source_review.provenance.recordId = "forged-paper";
    },
    (e) => {
      e.source_review.provenance.license = "Invented permission";
    },
    (e) => {
      e.body.title = "Forged native title";
    },
    (e) => {
      e.body.summary = "Forged native summary";
    },
    (e) => {
      e.body.payload.description = "Forged native payload";
    },
  ]) {
    Object.assign(f.pack, structuredClone(original));
    mutate(f.pack.entries[0]);
    validateCandidate(f.pack.entries[0], context);
    assert.deepEqual(f.pack.files, original.files);
    await f.save();
    await assert.rejects(
      validateRemotePackage(f.root, context),
      /Source fidelity mismatch: entries/,
    );
  }
  Object.assign(f.pack, structuredClone(original));
  f.pack.entries[0].body.attachments = { permission: "Forged attachment" };
  await f.save();
  await assert.rejects(
    validateRemotePackage(f.root, context),
    /native attachments/,
  );
});

test("remote-source normalizes only the two pinned image names, preserving bytes and rejecting format/collision tampering", async (t) => {
  for (const [source, destination, format] of [
    [
      "logos/crazygames-c284e89a355c.png",
      "logos/crazygames-c284e89a355c.jpg",
      "jpeg",
    ],
    [
      "logos/stable-audio-open-e030c46f6897.png",
      "logos/stable-audio-open-e030c46f6897.webp",
      "webp",
    ],
  ]) {
    const bytes = await sharp({
      create: { width: 1, height: 1, channels: 3, background: "red" },
    })
      .toFormat(format)
      .toBuffer();
    const entry = resource();
    entry.body.attachments.identity.asset = `/GameMap/${source}`;
    entry.body.attachments.identity.sha256 = sha256(bytes);
    const f = await fixture(t, [entry], { [source]: bytes });
    assert.equal(f.pack.entries.length, 1);
    assert.equal(
      f.pack.entries[0].body.attachments.identity.asset,
      `/${destination}`,
    );
    assert.equal(
      f.pack.entries[0].source_review.image_path_normalizations[0].source_path,
      source,
    );
    assert.deepEqual(f.pack.artifacts, [
      {
        source_path: source,
        path: `website/public/${destination}`,
        sha256: sha256(bytes),
        bytes: bytes.length,
      },
    ]);
    assert.deepEqual(await readFile(join(f.root, "source", source)), bytes);
    await validateRemotePackage(f.root, context);
    f.pack.artifacts[0].path = `website/public/${source}`;
    await f.save();
    await assert.rejects(
      validateRemotePackage(f.root, context),
      /deterministic source path normalization/,
    );
    await assert.rejects(
      recoveredFixture([entry], { [source]: bytes, [destination]: bytes }),
      /destination collides/,
    );
    const wrongBytes = await sharp({
      create: { width: 1, height: 1, channels: 3, background: "blue" },
    })
      .png()
      .toBuffer();
    await assert.rejects(
      recoveredFixture([entry], { [source]: wrongBytes }),
      /Normalized asset format mismatch/,
    );
  }
});

test("remote-source native payload must equal preserved JSON; unknown additions are rejected", async (t) => {
  const { root, pack, save } = await fixture(t, []);
  const payload = {
    id: "test-paper",
    title: "Native title",
    description: "Native summary",
  };
  const bytes = Buffer.from(JSON.stringify([payload]));
  await writeFile(join(root, "source/data/papers.json"), bytes);
  Object.assign(
    pack.files.find((f) => f.path === "data/papers.json"),
    { sha256: sha256(bytes), bytes: bytes.length },
  );
  pack.entries.push({
    key: "paper:test-paper",
    kind: "paper",
    identifier: "test-paper",
    body: {
      title: payload.title,
      summary: payload.description,
      payload: { ...payload, injected: true },
      attachments: {},
    },
    source_ref: "data/papers.json",
    source_review: { remote_revision: remoteSource.revision },
  });
  await save();
  await assert.rejects(validateRemotePackage(root, context));
});

test("remote-source preserved pending records cannot become entries or use unknown statuses", async (t) => {
  const { root, pack, save } = await fixture(t, []);
  const path = "collections/threejs-games/candidates.json";
  const value = {
    $schema: "./candidates.schema.json",
    schema_version: 1,
    candidates: [{ id: "pending-game", status: "approved" }],
  };
  await mkdir(dirname(join(root, "source", path)), { recursive: true });
  const bytes = Buffer.from(JSON.stringify(value));
  await writeFile(join(root, "source", path), bytes);
  Object.assign(
    pack.files.find((f) => f.path === path),
    { sha256: sha256(bytes), bytes: bytes.length },
  );
  await save();
  await assert.rejects(
    validateRemotePackage(root, context),
    /Unknown candidate status/,
  );
  value.candidates[0].status = "pending";
  const pendingBytes = Buffer.from(JSON.stringify(value));
  await writeFile(join(root, "source", path), pendingBytes);
  Object.assign(
    pack.files.find((f) => f.path === path),
    {
      sha256: sha256(pendingBytes),
      bytes: pendingBytes.length,
    },
  );
  pack.entries.push({ ...resource(), key: "threejs-game:pending-game" });
  await save();
  await assert.rejects(
    validateRemotePackage(root, context),
    /Pending candidate promoted/,
  );
});

const sourceRoot =
  process.env.GAMEMAP_REMOTE_SOURCE ||
  "/private/tmp/pi-github-repos/runtime-5sZhNX/f82eb70106bba3b65b30e0b1a715546b12023be1691638138003a663710a8bec";
let sourceExists = true;
try {
  await access(join(sourceRoot, ".git"));
} catch {
  sourceExists = false;
}
test(
  "remote-source pinned real checkout builds deterministically with complete per-kind accounting",
  { skip: !sourceExists },
  async (t) => {
    const first = await directory(t),
      second = await directory(t);
    const before = execFileSync(
      "git",
      ["-C", sourceRoot, "status", "--porcelain"],
      { encoding: "utf8", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } },
    );
    const report = await buildRemoteSource({
      sourceRoot,
      outputRoot: first,
      context,
    });
    const again = await buildRemoteSource({
      sourceRoot,
      outputRoot: second,
      context,
    });
    assert.deepEqual(report, again);
    assert.equal(
      String(await readFile(join(first, "candidates.json"))),
      String(await readFile(join(second, "candidates.json"))),
    );
    assert.equal(
      String(await readFile(join(first, "report.json"))),
      String(await readFile(join(second, "report.json"))),
    );
    const pack = JSON.parse(await readFile(join(first, "candidates.json")));
    for (const file of pack.files)
      assert.deepEqual(
        await readSourceFile(first, `source/${file.path}`),
        await readSourceFile(second, `source/${file.path}`),
      );
    assert.deepEqual(report.observed, {
      resource: 115,
      example: 88,
      foundation: 3,
      agent: 31,
      testing: 36,
      "testing-pack": 3,
      "repository-research": 213,
      path: 3,
      step: 18,
      demo: 29,
      collection: 6,
      document: 66,
      paper: 483,
      "threejs-game": 92,
    });
    assert.equal(report.included.paper, 483);
    assert.equal(report.included["threejs-game"], 92);
    assert.deepEqual(report.pendingCandidates, { pending: 30, excluded: 16 });
    for (const kind of Object.keys(report.observed))
      assert.equal(
        report.included[kind] +
          report.excluded[kind] -
          (kind === "threejs-game" ? 46 : 0),
        report.observed[kind],
        `Every ${kind} accounted for`,
      );
    assert.equal(pack.documents.length, 30);
    for (const [source, destination, format] of [
      [
        "logos/crazygames-c284e89a355c.png",
        "logos/crazygames-c284e89a355c.jpg",
        "jpeg",
      ],
      [
        "logos/stable-audio-open-e030c46f6897.png",
        "logos/stable-audio-open-e030c46f6897.webp",
        "webp",
      ],
    ]) {
      const artifact = pack.artifacts.find((a) => a.source_path === source);
      assert.equal(artifact.path, `website/public/${destination}`);
      const original = await readSourceFile(sourceRoot, source);
      assert.equal((await sharp(original).metadata()).format, format);
      assert.deepEqual(
        await readSourceFile(first, `source/${source}`),
        original,
      );
      assert.equal(artifact.sha256, sha256(original));
    }
    assert.equal(
      report.manifestDocuments.filter((d) => d.recoveredOriginal).length,
      0,
    );
    const actualPapers = JSON.parse(
      await readSourceFile(sourceRoot, "data/papers.json"),
    );
    for (const entry of pack.entries.filter((r) => r.kind === "paper"))
      assert.deepEqual(
        entry.body.payload,
        actualPapers.find((p) => p.id === entry.identifier),
      );
    // Real pinned records, not just fixture bodies: keep every copied byte/hash
    // fixed while substituting independently schema-valid content/provenance.
    for (const [key, mutate] of [
      [
        "resource:codex",
        (e) => {
          e.body.payload.detail = "Forged Codex detail";
        },
      ],
      [
        "resource:codex",
        (e) => {
          e.body.attachments.identity.notes = "Forged source credit";
        },
      ],
      [
        "paper:paper-arxiv-2404-02039",
        (e) => {
          e.source_review.provenance.recordId = "forged-provenance";
        },
      ],
      [
        "paper:paper-arxiv-2404-02039",
        (e) => {
          e.body.title = "Forged paper title";
          e.body.summary = "Forged paper summary";
        },
      ],
    ]) {
      const forged = structuredClone(pack);
      const entry = forged.entries.find((e) => e.key === key);
      assert.ok(entry, key);
      mutate(entry);
      validateCandidate(entry, context);
      assert.deepEqual(forged.files, pack.files);
      await writeFile(join(first, "candidates.json"), canonicalJSON(forged));
      await assert.rejects(
        validateRemotePackage(first, context),
        /Source fidelity mismatch: entries/,
      );
    }
    await writeFile(join(first, "candidates.json"), canonicalJSON(pack));
    assert.equal(
      execFileSync("git", ["-C", sourceRoot, "status", "--porcelain"], {
        encoding: "utf8",
        env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
      }),
      before,
    );
    await assert.rejects(
      buildRemoteSource({ sourceRoot, outputRoot: first, context }),
      /must be empty/,
    );
    const paths = execFileSync("git", ["-C", sourceRoot, "ls-files"], {
      encoding: "utf8",
    })
      .trim()
      .split("\n");
    await assert.rejects(
      recoverRemoteSource(
        async (path) => {
          const bytes = await readSourceFile(sourceRoot, path);
          if (path !== "data/papers.json") return bytes;
          const rows = JSON.parse(bytes);
          rows.push(rows[0]);
          return Buffer.from(JSON.stringify(rows));
        },
        paths,
        context,
      ),
      /Duplicate paper ID/,
    );
    await assert.rejects(
      buildRemoteSource({
        sourceRoot: resolve("."),
        outputRoot: join(first, "no-write"),
        context,
      }),
      /Cannot write inside immutable source/,
    );
    const wrong = await directory(t);
    await assert.rejects(
      buildRemoteSource({
        sourceRoot: wrong,
        outputRoot: join(first, "no-write"),
        context,
      }),
      /Wrong source (origin|revision)|No such remote/,
    );
  },
);

test("remote-source isolates screenshots from Git-managed game media without changing original bytes", async (t) => {
  const native = context.registry.entries.find(
    (entry) => entry.kind === "example",
  );
  const attachments = structuredClone(
    kindAdapters.example.attachments(native, context.sources),
  );
  const source = attachments.learningMedia.src.replace(/^\/(?:GameMap\/)?/, "");
  assert.ok(source.startsWith("media/learning/"));
  const destination = `media/imports/${remoteSource.revision}/${source.slice("media/".length)}`;
  const packet = await fixture(t, [
    {
      key: native.key,
      kind: native.kind,
      identifier: native.id,
      body: {
        title: native.title,
        summary: native.description,
        payload: structuredClone(native.data),
        attachments,
      },
    },
  ]);
  const entry = packet.pack.entries[0];
  assert.deepEqual(entry.body.attachments, {
    ...attachments,
    learningMedia: { ...attachments.learningMedia, src: destination },
  });
  const artifact = packet.pack.artifacts.find(
    (item) => item.source_path === source,
  );
  assert.equal(artifact.path, `website/public/${destination}`);
  assert.equal(
    artifact.sha256,
    sha256(await readFile(join("website/public", source))),
  );
  assert.deepEqual(
    await readFile(join(packet.root, "source", source)),
    await readFile(join("website/public", source)),
  );
  assert.ok(
    entry.source_review.media_path_normalizations.some(
      (mapping) =>
        mapping.source_path === source &&
        mapping.destination_path === artifact.path,
    ),
  );
  await validateRemotePackage(packet.root, context);
});

test("remote-source namespaces showcase bodies with exact source bytes and mapping provenance", async (t) => {
  const localDemo = context.registry.byKey("demo:opengame-portal");
  const demo = {
    key: localDemo.key,
    kind: localDemo.kind,
    identifier: localDemo.id,
    body: {
      title: localDemo.title,
      summary: localDemo.description,
      payload: structuredClone(localDemo.data),
      attachments: structuredClone(
        kindAdapters.demo.attachments(localDemo, context.sources),
      ),
    },
  };
  // Published base-prefixed and ordinary root-relative references share one mapping.
  demo.body.payload.previewSrc = `/GameMap${demo.body.payload.previewSrc}`;
  const packet = await fixture(t, [demo]);
  const entry = packet.pack.entries[0];
  const prefix = `media/imports/${remoteSource.revision}/showcase/`;
  assert.deepEqual(entry.body, {
    ...demo.body,
    payload: {
      ...demo.body.payload,
      previewSrc: `/${prefix}opengame-portal.mp4`,
      poster: `/${prefix}opengame-portal.webp`,
    },
  });
  assert.equal(entry.source_review.media_path_normalizations.length, 2);
  for (const extension of ["mp4", "webp"]) {
    const source = `media/showcase/opengame-portal.${extension}`;
    const destination = `website/public/${prefix}opengame-portal.${extension}`;
    const bytes = await readFile(join("website/public", source));
    const artifact = packet.pack.artifacts.find(
      (item) => item.source_path === source,
    );
    assert.deepEqual(artifact, {
      source_path: source,
      path: destination,
      sha256: sha256(bytes),
      bytes: bytes.length,
    });
    assert.deepEqual(
      await readFile(join(packet.root, "source", source)),
      bytes,
    );
    assert.ok(
      entry.source_review.media_path_normalizations.some(
        (mapping) =>
          mapping.source_path === source &&
          mapping.destination_path === destination,
      ),
    );
  }
  await validateRemotePackage(packet.root, context);
  for (const mutate of [
    (candidate) => {
      candidate.body.payload.previewSrc = demo.body.payload.previewSrc;
    },
    (candidate) => {
      candidate.body.payload.credit = "invented";
    },
    (candidate) => {
      candidate.source_review.media_path_normalizations[0].source_path =
        "media/showcase/other.mp4";
    },
  ]) {
    const original = structuredClone(entry);
    mutate(entry);
    await packet.save();
    await assert.rejects(
      validateRemotePackage(packet.root, context),
      /Source fidelity mismatch: entries/,
    );
    Object.assign(entry, original);
  }
  await assert.rejects(
    recoveredFixture([demo], {
      [`${prefix}opengame-portal.mp4`]: Buffer.from(
        "conflicting remote destination",
      ),
    }),
    /Normalized asset destination collides/,
  );
});
