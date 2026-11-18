import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir, lstat, readdir } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { UNSAFE_decodeViaTurboStream } from "react-router";
import { canonicalJSON, sha256, compare } from "./codec.mjs";
import { kindAdapters } from "./adapters.mjs";
import sharp from "sharp";

export const remoteSource = Object.freeze({
  repository: "https://github.com/OpenEnvision/GameMap",
  revision: "a2fe9a8e1d7b05008e11db1586d308c0086f7d91",
});
export const supportedKinds = [
  "resource",
  "example",
  "foundation",
  "agent",
  "testing",
  "testing-pack",
  "repository-research",
  "path",
  "step",
  "demo",
  "collection",
  "document",
  "paper",
  "threejs-game",
];
const plain = (v) =>
  v !== null &&
  typeof v === "object" &&
  Object.getPrototypeOf(v) === Object.prototype;
function shape(value, keys, label) {
  assert.ok(plain(value), `${label}: expected plain object`);
  assert.deepEqual(
    Object.keys(value).sort(),
    [...keys].sort(),
    `${label}: unexpected or missing fields`,
  );
}
export function safeSourcePath(path) {
  assert.equal(typeof path, "string", "Path must be a string");
  assert.ok(
    path &&
      !path.startsWith("/") &&
      !/[\\:%?#\x00-\x1f\x7f]/.test(path) &&
      path.split("/").every((p) => p && p !== "." && p !== ".."),
    `Unsafe path: ${path}`,
  );
  return path;
}
export async function readSourceFile(root, path) {
  safeSourcePath(path);
  let current = resolve(root);
  assert.ok((await lstat(current)).isDirectory(), `Not a directory: ${root}`);
  for (const part of path.split("/")) {
    current = join(current, part);
    assert.ok(
      !(await lstat(current)).isSymbolicLink(),
      `Symlink rejected: ${path}`,
    );
  }
  assert.ok((await lstat(current)).isFile(), `Not a file: ${path}`);
  return readFile(current);
}
function assertJSON(value, seen = new Set()) {
  if (value === null || typeof value === "string" || typeof value === "boolean")
    return;
  if (typeof value === "number") {
    assert.ok(Number.isFinite(value), "Non-finite JSON number");
    return;
  }
  assert.ok(
    Array.isArray(value) || plain(value),
    "Only plain JSON data is accepted",
  );
  assert.ok(!seen.has(value), "Cyclic data rejected");
  seen.add(value);
  for (const [key, child] of Object.entries(value)) {
    assert.ok(
      !["__proto__", "constructor", "prototype"].includes(key),
      `Unsafe object key: ${key}`,
    );
    assertJSON(child, seen);
  }
  seen.delete(value);
}
/** This invokes the installed data decoder, never production bundles or inline scripts. */
export async function decodeRouterData(bytes) {
  assert.ok(bytes.length <= 32 * 1024 * 1024, "Router data too large");
  // The pinned routes contain a single plain-JSON reference table. Fail closed
  // on promises/plugins/exotic types instead of silently losing source fields.
  const table = JSON.parse(Buffer.from(bytes).toString("utf8"));
  assert.ok(
    Array.isArray(table) && table.length > 0,
    "Expected router reference table",
  );
  const reference = (index) =>
    assert.ok(
      Number.isInteger(index) &&
        ((index >= 0 && index < table.length) || index === -5 || index === -7),
      `Invalid router reference: ${index}`,
    );
  for (const item of table) {
    if (Array.isArray(item)) item.forEach(reference);
    else if (plain(item))
      for (const [key, index] of Object.entries(item)) {
        assert.match(key, /^_\d+$/, "Invalid router key reference");
        const keyIndex = Number(key.slice(1));
        reference(keyIndex);
        assert.equal(
          typeof table[keyIndex],
          "string",
          "Router key must reference a string",
        );
        assert.ok(
          !["__proto__", "constructor", "prototype"].includes(table[keyIndex]),
          "Unsafe router key",
        );
        reference(index);
      }
    else
      assert.ok(
        item === null || ["string", "number", "boolean"].includes(typeof item),
        "Unsupported router value",
      );
  }
  const { value } = await UNSAFE_decodeViaTurboStream(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(bytes));
        controller.close();
      },
    }),
    globalThis,
  );
  assert.ok(plain(value), "Invalid router result");
  // Router data may have absent optional values. JSON serialization omits those,
  // exactly as the source's JSON collections do; reject executable/exotic values.
  function clean(v) {
    if (v === undefined) return undefined;
    if (Array.isArray(v))
      return v.map((x) => {
        assert.notEqual(x, undefined, "Undefined array item");
        return clean(x);
      });
    if (plain(v))
      return Object.fromEntries(
        Object.entries(v)
          .filter(([, x]) => x !== undefined)
          .map(([k, x]) => [k, clean(x)]),
      );
    assert.ok(
      v === null || ["string", "boolean", "number"].includes(typeof v),
      "Non-JSON router value",
    );
    return v;
  }
  const result = clean(value);
  assertJSON(result);
  return result;
}
// These pinned source names disagree with their bytes. Only destinations and
// references change; source paths, bytes and manifest hashes remain untouched.
const imagePathNormalizations = Object.freeze({
  "logos/crazygames-c284e89a355c.png": "logos/crazygames-c284e89a355c.jpg",
  "logos/stable-audio-open-e030c46f6897.png":
    "logos/stable-audio-open-e030c46f6897.webp",
});
const mediaSourcePrefix = "media/";
const mediaDestinationPrefix = `media/imports/${remoteSource.revision}/`;
const destinationMediaPath = (path) =>
  path.startsWith(mediaSourcePrefix)
    ? `${mediaDestinationPrefix}${path.slice(mediaSourcePrefix.length)}`
    : Object.hasOwn(imagePathNormalizations, path)
      ? imagePathNormalizations[path]
      : path;
const sourceMediaPath = (path) =>
  path.startsWith(mediaDestinationPrefix)
    ? `${mediaSourcePrefix}${path.slice(mediaDestinationPrefix.length)}`
    : (Object.entries(imagePathNormalizations).find(
        ([, destination]) => destination === path,
      )?.[0] ?? path);
const normalizeMedia = (v) => {
  if (typeof v === "string") {
    const path = v.replace(/^\/GameMap\/(?=(?:media|logos)\/)/, "/");
    return path.startsWith("/")
      ? `/${destinationMediaPath(path.slice(1))}`
      : destinationMediaPath(path);
  }
  if (Array.isArray(v)) return v.map(normalizeMedia);
  if (plain(v))
    return Object.fromEntries(
      Object.entries(v).map(([k, x]) => [k, normalizeMedia(x)]),
    );
  return v;
};
const sorted = (rows, key) => rows.sort((a, b) => compare(a[key], b[key]));
const hashRow = (path, bytes) => ({
  path,
  sha256: sha256(bytes),
  bytes: bytes.length,
});
const countKinds = (rows) =>
  Object.fromEntries(
    supportedKinds.map((kind) => [
      kind,
      rows.filter((r) => r.kind === kind || r.key?.startsWith(`${kind}:`))
        .length,
    ]),
  );
function assertUnique(rows, key, label) {
  assert.equal(
    new Set(rows.map((row) => row[key])).size,
    rows.length,
    `Duplicate ${label}`,
  );
}
export function validateCandidate(entry, context) {
  shape(
    entry,
    ["key", "kind", "identifier", "body", "source_ref", "source_review"],
    "entry",
  );
  assert.ok(
    supportedKinds.includes(entry.kind) && entry.kind !== "document",
    `Unsupported entry kind: ${entry.kind}`,
  );
  assert.equal(entry.key, `${entry.kind}:${entry.identifier}`);
  assert.ok(
    typeof entry.identifier === "string" &&
      entry.identifier.length > 0 &&
      !/[\x00-\x1f]/.test(entry.identifier),
    "Invalid identifier",
  );
  shape(entry.body, ["title", "summary", "payload", "attachments"], "body");
  for (const field of ["title", "summary"])
    assert.ok(
      typeof entry.body[field] === "string" && entry.body[field].trim(),
      `Missing ${field}`,
    );
  safeSourcePath(entry.source_ref);
  assert.ok(plain(entry.source_review), "Missing source review");
  assert.equal(entry.source_review.remote_revision, remoteSource.revision);
  assertJSON(entry);
  if (["paper", "threejs-game"].includes(entry.kind)) {
    assert.equal(entry.body.payload.id, entry.identifier);
    assert.match(entry.identifier, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    shape(entry.body.attachments, [], "native attachments");
    // Native objects are independently checked against preserved source bytes in
    // validateRemotePackage; target extended contracts are used when integrated.
    if (context.payloadSchemas[entry.kind])
      context.payloadSchemas[entry.kind].parse(entry.body.payload);
    return;
  }
  context.payloadSchemas[entry.kind].parse(entry.body.payload);
  context.attachmentSchemas[entry.kind].parse(entry.body.attachments);
  const expected =
    entry.kind === "step"
      ? `${entry.body.payload.track}/${entry.body.payload.id}`
      : entry.kind === "repository-research"
        ? entry.body.payload.requested_repo
        : entry.body.payload.id;
  assert.equal(entry.identifier, expected, "Payload identifier mismatch");
}

/** Recovery reads only pinned JSON, Markdown, media, and safe Router data. */
export async function recoverRemoteSource(read, sourcePaths, context) {
  const files = new Map();
  async function preserve(path) {
    if (!files.has(path)) files.set(path, await read(safeSourcePath(path)));
    return files.get(path);
  }
  async function json(path) {
    const value = JSON.parse(await preserve(path));
    assertJSON(value);
    return value;
  }
  async function route(path, name) {
    const data = await decodeRouterData(await preserve(path));
    assert.ok(plain(data[name]?.data), `Missing route data: ${path}/${name}`);
    return data[name].data;
  }
  const pack = {
    format: "gamemap.remote-candidates",
    version: 1,
    source: { ...remoteSource },
    files: [],
    entries: [],
    artifacts: [],
    documents: [],
    excluded: [],
  };
  const observed = [];
  const excluded = (key, reason, source_ref) =>
    pack.excluded.push({ key, reason, source_ref });
  const resources = await route("data/resources.data", "resources");
  const examples = await route("data/examples.data", "examples");
  const agents = await route("data/agents.data", "agents");
  const paths = await route("data/paths.data", "paths");
  const demos = await route("data/showcase.data", "demos");
  const testing = await route("data/testing.data", "testing");
  const research = await route("data/research.data", "research");
  const docs = await route("data/docs.data", "docs");
  for (const [subset, complete] of [
    [examples.platforms, resources.entries],
    [agents.examples, examples.examples],
    [resources.demos, demos.demos],
  ]) {
    assert.ok(Array.isArray(subset));
    for (const row of subset)
      assert.deepEqual(
        row,
        complete.find((entry) => entry.key === row.key),
        `Conflicting loader duplicate: ${row.key}`,
      );
  }
  const identities = await json("data/logo-sources.json");
  const rawResources = await json("data/resources.json");
  const rawTesting = await json("data/testing-resources.json");
  const rawResearch = await json("data/repository-research.json");
  for (const [raw, decoded, id] of [
    [rawResources, resources.entries, "id"],
    [rawTesting.resources, testing.entries, "id"],
    [rawTesting.starterPacks, testing.packs, "id"],
    [rawResearch.records, research.records, "requested_repo"],
  ]) {
    assert.ok(Array.isArray(raw));
    assertUnique(raw, id, `JSON ${id}`);
    assert.equal(
      raw.length,
      decoded.length,
      "JSON/router collection count mismatch",
    );
    for (const row of decoded)
      assert.deepEqual(
        row.data,
        raw.find((r) => r[id] === row.data[id]),
        `JSON/router body mismatch: ${row.key}`,
      );
  }
  const papers = await json("data/papers.json");
  const provenance = await json("data/papers-provenance.json");
  const games = await json("collections/threejs-games/games.json");
  const pending = await json("collections/threejs-games/candidates.json");
  shape(games, ["$schema", "schema_version", "games"], "games collection");
  shape(
    pending,
    ["$schema", "schema_version", "candidates"],
    "candidate collection",
  );
  assert.equal(games.schema_version, 2);
  assert.equal(pending.schema_version, 1);
  assert.ok(Array.isArray(papers));
  assertUnique(papers, "id", "paper ID");
  assertUnique(games.games, "id", "game ID");
  assertUnique(pending.candidates, "id", "pending ID");
  assertUnique(provenance.records, "recordId", "paper provenance ID");
  const paperProvenance = new Map(
    provenance.records.map((r) => [r.recordId, r]),
  );
  assert.equal(
    paperProvenance.size,
    papers.length,
    "Paper provenance coverage mismatch",
  );
  for (const row of pending.candidates) {
    assert.ok(
      ["pending", "excluded"].includes(row.status),
      `Unknown candidate status: ${row.status}`,
    );
    assert.ok(
      !games.games.some((game) => game.id === row.id),
      `Approved/pending ID overlap: ${row.id}`,
    );
    excluded(
      `threejs-game:${row.id}`,
      `${row.status}: ${row.reason}`,
      "collections/threejs-games/candidates.json",
    );
  }
  async function accept(entry) {
    observed.push({ kind: entry.kind, key: entry.key });
    try {
      validateCandidate(entry, context);
      pack.entries.push(entry);
    } catch (error) {
      excluded(
        entry.key,
        `Target contract rejected complete source record: ${error.message}`,
        entry.source_ref,
      );
    }
  }
  const routeCollections = [
    ["resource", resources.entries, "data/resources.data"],
    ["example", examples.examples, "data/examples.data"],
    ["foundation", examples.foundations, "data/examples.data"],
    ["collection", examples.collections, "data/examples.data"],
    ["agent", agents.tools, "data/agents.data"],
    ["path", paths.paths, "data/paths.data"],
    ["step", paths.steps, "data/paths.data"],
    ["demo", demos.demos, "data/showcase.data"],
    ["testing", testing.entries, "data/testing.data"],
    ["testing-pack", testing.packs, "data/testing.data"],
    ["repository-research", research.records, "data/research.data"],
  ];
  for (const [kind, rows, source_ref] of routeCollections) {
    assert.ok(Array.isArray(rows), `Missing ${kind} collection`);
    assertUnique(rows, "key", `${kind} key`);
    for (const row of rows) {
      shape(
        row,
        [
          "key",
          "kind",
          "id",
          "title",
          "description",
          "url",
          "collectionUrl",
          "data",
          "blocks",
          "source",
        ],
        "router entry",
      );
      assert.equal(row.kind, kind, `Unexpected source kind: ${row.kind}`);
      assert.equal(row.key, `${kind}:${row.id}`, "Source key mismatch");
      const attachments = {};
      const source_review = {
        remote_revision: remoteSource.revision,
        extraction: "react-router-turbo-stream",
        authoring_source: row.source,
        source_title: row.title,
        source_summary: row.description,
      };
      if (kind === "path") {
        observed.push({ kind, key: row.key });
        excluded(
          row.key,
          "Complete payload recovered, but required editorial and showcase attachments are not serialized in the published loaders. No local or invented attachment substituted.",
          source_ref,
        );
        continue;
      }
      if (kind === "resource") {
        attachments.identity = identities[row.id];
        source_review.attachment_sources = ["data/logo-sources.json"];
        const images = row.blocks.filter((b) => b.field === "projectMedia");
        assert.ok(images.length <= 1, `Ambiguous project media: ${row.key}`);
        if (images.length) {
          const { src, alt, source, credit } = images[0];
          assert.equal(images[0].type, "image");
          attachments.projectMedia = {
            src,
            alt,
            source,
            credit,
            kind: "official-demo",
          };
          source_review.normalization = [
            "projectMedia image block maps to current official-demo attachment",
          ];
        }
      }
      if (kind === "example") {
        assert.deepEqual(
          examples.media[row.id],
          agents.media[row.id],
          `Conflicting media loaders: ${row.key}`,
        );
        if (examples.media[row.id])
          attachments.learningMedia = {
            ...examples.media[row.id],
            origin: examples.media[row.id].origin ?? "browser-capture",
          };
        attachments.agentAttribution = agents.attribution[row.id];
        source_review.attachment_sources = [
          "data/examples.data",
          "data/agents.data",
        ];
      }
      if (kind === "demo")
        attachments.originalRecording = {
          id: row.data.recordingId,
          originalUrl: row.data.originalUrl,
          resourceId: row.data.resourceId,
        };
      const normalizedPaths = new Set();
      const mediaPaths = new Set();
      function recordMediaNormalizations(value) {
        if (typeof value === "string") {
          const path = value.replace(/^\/(?:GameMap\/)?/, "");
          if (Object.hasOwn(imagePathNormalizations, path))
            normalizedPaths.add(path);
          if (path.startsWith(mediaSourcePrefix)) mediaPaths.add(path);
        } else if (value && typeof value === "object") {
          Object.values(value).forEach(recordMediaNormalizations);
        }
      }
      recordMediaNormalizations(row.data);
      recordMediaNormalizations(attachments);
      if (normalizedPaths.size)
        source_review.image_path_normalizations = [...normalizedPaths]
          .sort(compare)
          .map((path) => ({
            source_path: path,
            destination_path: `website/public/${destinationMediaPath(path)}`,
            reason:
              "Destination extension matches original image bytes; source unchanged",
          }));
      if (mediaPaths.size)
        source_review.media_path_normalizations = [...mediaPaths]
          .sort(compare)
          .map((path) => ({
            source_path: path,
            destination_path: `website/public/${destinationMediaPath(path)}`,
            reason:
              "Pinned import namespace preserves Git-managed media inventories; source unchanged",
          }));
      await accept({
        key: row.key,
        kind,
        identifier: row.id,
        body: {
          title: row.title,
          summary: row.description,
          payload: normalizeMedia(row.data),
          attachments: normalizeMedia(attachments),
        },
        source_ref,
        source_review,
      });
    }
  }
  for (const payload of papers) {
    assert.ok(
      paperProvenance.has(payload.id),
      `Missing provenance: ${payload.id}`,
    );
    await accept({
      key: `paper:${payload.id}`,
      kind: "paper",
      identifier: payload.id,
      body: {
        title: payload.title,
        summary: payload.description,
        payload,
        attachments: {},
      },
      source_ref: "data/papers.json",
      source_review: {
        remote_revision: remoteSource.revision,
        extraction: "native-json",
        provenance_source: "data/papers-provenance.json",
        provenance: paperProvenance.get(payload.id),
      },
    });
  }
  for (const payload of games.games)
    await accept({
      key: `threejs-game:${payload.id}`,
      kind: "threejs-game",
      identifier: payload.id,
      body: {
        title: payload.name,
        summary: payload.gameplay_evidence.claim,
        payload,
        attachments: {},
      },
      source_ref: "collections/threejs-games/games.json",
      source_review: {
        remote_revision: remoteSource.revision,
        extraction: "native-json",
        schema_source: "collections/threejs-games/schema.json",
        evidence_directory: "collections/threejs-games/evidence",
      },
    });

  // Preserve collection-level metadata and pending evidence, not catalog entries.
  for (const path of sourcePaths.filter(
    (p) =>
      p.endsWith(".md") ||
      p.startsWith("collections/threejs-games/") ||
      [
        "data/papers.bib",
        "data/resources.json",
        "data/testing-resources.json",
        "data/repository-research.json",
        "data/search-index.json",
        "media/learning/manifest.json",
        "media/showcase/manifest.json",
      ].includes(p),
  ))
    await preserve(path);
  const manifestReport = [];
  for (const doc of docs.manifest) {
    const key = `document:${doc.slug}`;
    observed.push({ kind: "document", key });
    const available = sourcePaths.includes(doc.source);
    const originalHash = available ? sha256(await preserve(doc.source)) : null;
    const recoveredOriginal = available && originalHash === doc.sourceHash;
    const reason = recoveredOriginal
      ? "Git-owned original preserved as source evidence, not a database entry."
      : available
        ? "Shipped Markdown differs from the loader manifest hash; preserved as evidence, not the claimed document body."
        : "Original Markdown absent from static checkout; loader metadata/search summaries/rendered HTML are not recovered document bodies.";
    excluded(key, reason, "data/docs.data");
    const local = context.documents.find((row) => row.source === doc.source);
    manifestReport.push({
      key,
      source: doc.source,
      sourceHash: doc.sourceHash,
      originalHash,
      recoveredOriginal,
      targetComparison: !local
        ? "missing"
        : local.sourceHash === doc.sourceHash
          ? "identical"
          : "conflict",
    });
  }
  for (const path of sourcePaths.filter(
    (p) =>
      p.endsWith(".md") &&
      (p.startsWith("docs/") || p.startsWith("collections/threejs-games/")),
  )) {
    const bytes = await preserve(path);
    pack.documents.push({
      source_path: path,
      ...hashRow(
        path.startsWith("docs/")
          ? path
          : `docs/remote-threejs-games/${path.slice("collections/threejs-games/".length)}`,
        bytes,
      ),
    });
  }
  const media = new Set();
  function findMedia(v) {
    if (typeof v === "string") {
      const path = v.replace(/^\/(?:GameMap\/)?/, "");
      if (/^(media|logos)\//.test(path)) media.add(safeSourcePath(path));
    } else if (v && typeof v === "object") Object.values(v).forEach(findMedia);
  }
  pack.entries.forEach((entry) => findMedia(entry.body));
  for (const path of [...media].sort(compare)) {
    const sourcePath = sourceMediaPath(path);
    if (sourcePath !== path) {
      assert.ok(
        !sourcePaths.includes(path),
        `Normalized asset destination collides with source: ${path}`,
      );
    }
    const bytes = await preserve(sourcePath);
    if (Object.hasOwn(imagePathNormalizations, sourcePath)) {
      const metadata = await sharp(bytes, {
        failOn: "error",
        limitInputPixels: 40000000,
      }).metadata();
      assert.equal(
        metadata.format,
        path.endsWith(".jpg") ? "jpeg" : "webp",
        `Normalized asset format mismatch: ${sourcePath}`,
      );
    }
    for (const entry of pack.entries) {
      const identity = entry.body.attachments.identity;
      if (identity?.asset?.replace(/^\//, "") === path && identity.sha256)
        assert.equal(
          sha256(bytes),
          identity.sha256,
          `Identity asset hash mismatch: ${entry.key}`,
        );
    }
    pack.artifacts.push({
      source_path: sourcePath,
      ...hashRow(`website/public/${path}`, bytes),
    });
  }
  assertUnique(pack.entries, "key", "entry key");
  assertUnique(pack.excluded, "key", "excluded key");
  for (const entry of pack.entries)
    assert.ok(
      !pack.excluded.some((row) => row.key === entry.key),
      `Included/excluded overlap: ${entry.key}`,
    );
  pack.files = sorted(
    [...files].map(([path, bytes]) => hashRow(path, bytes)),
    "path",
  );
  for (const field of ["entries", "excluded"]) sorted(pack[field], "key");
  for (const field of ["artifacts", "documents"]) sorted(pack[field], "path");
  const search = await json("data/search-index.json");
  const discovery = search.documents;
  assertUnique(discovery, "key", "search key");
  const observedKeys = new Set(observed.map((row) => row.key));
  const unknownDiscovery = discovery.filter(
    (row) => !observedKeys.has(row.key),
  );
  assert.equal(
    unknownDiscovery.length,
    0,
    `Unaccounted search discovery keys: ${unknownDiscovery.map((r) => r.key).join(", ")}`,
  );
  const comparison = compareLocalBodies(pack.entries, context);
  const keyInventory = Object.fromEntries(
    supportedKinds.map((kind) => [kind, { missing: [], existing: [] }]),
  );
  for (const row of observed)
    keyInventory[row.kind][
      context.registry.byKey(row.key) ? "existing" : "missing"
    ].push(row.key);
  return {
    pack,
    files,
    report: {
      source: pack.source,
      keyInventory,
      observed: countKinds(observed),
      included: countKinds(pack.entries),
      excluded: countKinds(pack.excluded),
      discoveryOnlyCounts: countKinds(discovery),
      discoveryIsNotBodyRecovery: true,
      pendingCandidates: {
        pending: pending.candidates.filter((r) => r.status === "pending")
          .length,
        excluded: pending.candidates.filter((r) => r.status === "excluded")
          .length,
      },
      manifestDocuments: manifestReport,
      comparisons: comparison,
      auxiliaryCollections: [
        {
          source_ref: "data/examples.data",
          field: "platforms",
          records: examples.platforms.length,
          reason:
            "Verified exact duplicate resource entries; included once by resource key.",
        },
      ],
      limitations: [
        "Comparison is against this lane's Git-authored target registry, not the local database.",
        "Source review/provenance is retained, not independent verification or permission to redistribute.",
        "Existing path attachments and unavailable Markdown are explicitly excluded; no production JavaScript or generated HTML was evaluated or copied as documents.",
      ],
    },
  };
}

export function compareLocalBodies(entries, context) {
  const result = Object.fromEntries(
    supportedKinds.map((kind) => [
      kind,
      { missing: [], identical: [], conflicts: [] },
    ]),
  );
  for (const entry of entries) {
    const local = context.registry.byKey(entry.key);
    if (!local) {
      result[entry.kind].missing.push(entry.key);
      continue;
    }
    const body = {
      title: local.title,
      summary: local.description,
      payload: local.data,
      attachments:
        kindAdapters[entry.kind]?.attachments?.(local, context.sources) ?? {},
    };
    result[entry.kind][
      canonicalJSON(body) === canonicalJSON(entry.body)
        ? "identical"
        : "conflicts"
    ].push(entry.key);
  }
  return result;
}

/** Bind the entire packet to deterministic recovery from verified manifested bytes.
 * This proves internal fidelity, not authenticity of jointly replaced sources.
 */
export async function verifyRemoteSourceFidelity(pack, sources, context) {
  const recovered = await recoverRemoteSource(
    async (path) => {
      assert.ok(sources.has(path), `Missing fidelity source: ${path}`);
      return sources.get(path);
    },
    [...sources.keys()],
    context,
  );
  for (const field of [
    "format",
    "version",
    "source",
    "files",
    "entries",
    "excluded",
    "artifacts",
    "documents",
  ])
    assert.ok(
      canonicalJSON(pack[field]) === canonicalJSON(recovered.pack[field]),
      `Source fidelity mismatch: ${field}`,
    );
}

export async function validateRemotePackage(root, context) {
  const bytes = await readSourceFile(root, "candidates.json");
  const pack = JSON.parse(bytes);
  assertJSON(pack);
  shape(
    pack,
    [
      "format",
      "version",
      "source",
      "files",
      "entries",
      "artifacts",
      "documents",
      "excluded",
    ],
    "package",
  );
  assert.equal(pack.format, "gamemap.remote-candidates");
  assert.equal(pack.version, 1);
  assert.deepEqual(pack.source, remoteSource, "Unpinned source");
  for (const field of [
    "files",
    "entries",
    "artifacts",
    "documents",
    "excluded",
  ])
    assert.ok(Array.isArray(pack[field]), `Expected array: ${field}`);
  const sources = new Map();
  assertUnique(pack.files, "path", "file path");
  for (const row of pack.files) {
    shape(row, ["path", "sha256", "bytes"], "file");
    safeSourcePath(row.path);
    assert.match(row.sha256, /^[a-f0-9]{64}$/);
    assert.ok(Number.isSafeInteger(row.bytes) && row.bytes >= 0);
    const original = await readSourceFile(root, `source/${row.path}`);
    assert.equal(original.length, row.bytes, `Size mismatch: ${row.path}`);
    assert.equal(sha256(original), row.sha256, `Hash mismatch: ${row.path}`);
    sources.set(row.path, original);
  }
  for (const field of ["artifacts", "documents"]) {
    assertUnique(pack[field], "path", `${field} destination`);
    for (const row of pack[field]) {
      shape(row, ["source_path", "path", "sha256", "bytes"], field);
      safeSourcePath(row.source_path);
      safeSourcePath(row.path);
      assert.ok(
        row.path.startsWith(
          field === "documents" ? "docs/" : "website/public/",
        ),
        `Invalid ${field} destination`,
      );
      if (field === "documents")
        assert.ok(
          row.path.endsWith(".md") && row.source_path.endsWith(".md"),
          "Only original Markdown documents",
        );
      else
        assert.equal(
          row.path,
          `website/public/${destinationMediaPath(row.source_path)}`,
          "Artifact destination must match deterministic source path normalization",
        );
      const source = sources.get(row.source_path);
      assert.ok(source, `Unlisted source: ${row.source_path}`);
      assert.equal(sha256(source), row.sha256);
      assert.equal(source.length, row.bytes);
    }
  }
  assertUnique(pack.entries, "key", "entry key");
  assertUnique(pack.excluded, "key", "excluded key");
  for (const row of pack.excluded) {
    shape(row, ["key", "reason", "source_ref"], "excluded");
    assert.ok(
      typeof row.key === "string" &&
        typeof row.reason === "string" &&
        row.reason.trim(),
    );
    assert.ok(
      sources.has(row.source_ref),
      `Missing excluded source: ${row.source_ref}`,
    );
    assert.ok(
      !pack.entries.some((entry) => entry.key === row.key),
      `Included/excluded overlap: ${row.key}`,
    );
  }
  const pendingSource = sources.get(
    "collections/threejs-games/candidates.json",
  );
  if (pendingSource) {
    const pending = JSON.parse(pendingSource);
    shape(
      pending,
      ["$schema", "schema_version", "candidates"],
      "candidate collection",
    );
    assert.equal(pending.schema_version, 1);
    assertUnique(pending.candidates, "id", "pending ID");
    for (const row of pending.candidates) {
      assert.ok(
        ["pending", "excluded"].includes(row.status),
        `Unknown candidate status: ${row.status}`,
      );
      assert.ok(
        !pack.entries.some((entry) => entry.key === `threejs-game:${row.id}`),
        `Pending candidate promoted: ${row.id}`,
      );
    }
  }
  for (const entry of pack.entries) {
    validateCandidate(entry, context);
    assert.ok(
      sources.has(entry.source_ref),
      `Missing entry source: ${entry.source_ref}`,
    );
  }
  await verifyRemoteSourceFidelity(pack, sources, context);
  return {
    digest: sha256(bytes),
    entries: pack.entries.length,
    files: pack.files.length,
    artifacts: pack.artifacts.length,
    documents: pack.documents.length,
    excluded: pack.excluded.length,
  };
}

export async function buildRemoteSource({ sourceRoot, outputRoot, context }) {
  assert.ok(
    sourceRoot && outputRoot && context,
    "sourceRoot, outputRoot and context required",
  );
  assert.ok(
    !resolve(outputRoot).startsWith(`${resolve(sourceRoot)}/`) &&
      resolve(outputRoot) !== resolve(sourceRoot),
    "Cannot write inside immutable source",
  );
  const git = (...args) =>
    execFileSync("git", ["-C", sourceRoot, ...args], {
      encoding: "utf8",
      maxBuffer: 8 * 1024 * 1024,
      env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  assert.equal(
    git("remote", "get-url", "origin").replace(/\.git$/, ""),
    remoteSource.repository,
    "Wrong source origin",
  );
  assert.equal(
    git("rev-parse", "HEAD"),
    remoteSource.revision,
    "Wrong source revision",
  );
  assert.equal(
    git("status", "--porcelain", "--untracked-files=all"),
    "",
    "Source checkout is not immutable/clean",
  );
  const sourcePaths = git("ls-files").split("\n");
  sourcePaths.forEach(safeSourcePath);
  const recovered = await recoverRemoteSource(
    (path) => readSourceFile(sourceRoot, path),
    sourcePaths,
    context,
  );
  await mkdir(outputRoot, { recursive: true });
  assert.ok(
    (await lstat(outputRoot)).isDirectory(),
    "Output is not a real directory",
  );
  assert.equal(
    (await readdir(outputRoot)).length,
    0,
    "Output directory must be empty; refusing overwrite",
  );
  for (const [path, bytes] of recovered.files) {
    const destination = join(outputRoot, "source", path);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, bytes, { flag: "wx" });
  }
  await writeFile(
    join(outputRoot, "candidates.json"),
    `${canonicalJSON(recovered.pack)}\n`,
    { flag: "wx" },
  );
  const validation = await validateRemotePackage(outputRoot, context);
  const report = {
    ...recovered.report,
    package: validation,
    packageDigestDefinition:
      "SHA-256 of exact candidates.json bytes; manifest includes hashes of every source copy",
  };
  await writeFile(
    join(outputRoot, "report.json"),
    `${canonicalJSON(report)}\n`,
    { flag: "wx" },
  );
  return report;
}
