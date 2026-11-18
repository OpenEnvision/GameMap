import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import {
  generateRemoteDocuments,
  revision,
} from "../../import/recover-remote-documents.mjs";
import { canonicalJSON, sha256 } from "./codec.mjs";
import { assertMarkdownSafety } from "./markdown-safety.mjs";
import { databaseResearchArchive } from "../research-archive-policy.mjs";
import { root } from "../documents.mjs";
import {
  remotePath,
  remoteDatabaseInventory,
  assertRemoteImportOwner,
} from "./remote-import.mjs";

const parser = unified().use(remarkParse).use(remarkGfm);
const walk = (node) => [node, ...(node.children || []).flatMap(walk)];
const text = (node) =>
  node.value ||
  (node.children || []).map(text).join(node.type === "tableRow" ? " | " : "");
export const researchSourceKey = (source, path) =>
  sha256(`${source.repository}\n${source.revision}\n${path}`);
function repository(value) {
  try {
    const url = new URL(value);
    if (url.hostname.toLowerCase() !== "github.com") return undefined;
    const [owner, name] = url.pathname.split("/").filter(Boolean);
    return owner && name
      ? `${owner}/${name.replace(/\.git$/i, "")}`.toLowerCase()
      : undefined;
  } catch {
    return undefined;
  }
}
function catalogIndex(entries) {
  const byRepository = new Map();
  for (const entry of entries) {
    for (const url of new Set(
      walkJSON(entry.body.payload).filter((value) => typeof value === "string"),
    )) {
      const repo = repository(url);
      if (repo)
        byRepository.set(repo, [
          ...new Set([...(byRepository.get(repo) || []), entry.key]),
        ]);
    }
  }
  return byRepository;
}
function walkJSON(value) {
  if (Array.isArray(value)) return value.flatMap(walkJSON);
  return value && typeof value === "object"
    ? Object.values(value).flatMap(walkJSON)
    : [value];
}
function urls(nodes, definitions) {
  return [
    ...new Set(
      nodes
        .flatMap(walk)
        .flatMap((node) => {
          if (["link", "image", "definition"].includes(node.type))
            return [node.url];
          if (["linkReference", "imageReference"].includes(node.type))
            return [definitions.get(node.identifier)];
          return [];
        })
        .filter((url) => /^https?:\/\//.test(url || "")),
    ),
  ].sort();
}
function entryKeys(links, index) {
  return [
    ...new Set(links.flatMap((url) => index.get(repository(url)) || [])),
  ].sort();
}

/** Sections and table rows are queryable records, not a Markdown-only blob. */
export function researchFindings(markdown, entries = []) {
  assertMarkdownSafety(markdown, "research evidence");
  const tree = parser.parse(markdown);
  const definitions = new Map(
    walk(tree)
      .filter((n) => n.type === "definition")
      .map((n) => [n.identifier, n.url]),
  );
  const index = catalogIndex(entries);
  const findings = [];
  let heading = text(
    tree.children.find((n) => n.type === "heading") || {
      value: "Source notes",
    },
  );
  let section = [];
  function add(kind, title, nodes, fields = {}) {
    const links = urls(nodes, definitions);
    const first = nodes[0],
      last = nodes.at(-1);
    if (!first) return;
    findings.push({
      ordinal: findings.length + 1,
      kind,
      title: title || heading,
      text: nodes.map(text).join("\n"),
      markdown: markdown.slice(
        first.position.start.offset,
        last.position.end.offset,
      ),
      fields,
      links,
      catalog_keys: entryKeys(links, index),
    });
  }
  function flush() {
    if (section.length) {
      const fields = {};
      for (const node of section
        .flatMap(walk)
        .filter((n) => n.type === "listItem")) {
        const value = text(node);
        const colon = value.indexOf(":");
        if (colon > 0 && colon < 80) {
          const key = value.slice(0, colon).trim();
          if (!Object.hasOwn(fields, key))
            Object.defineProperty(fields, key, { value: [], enumerable: true });
          fields[key].push(value.slice(colon + 1).trim());
        }
      }
      add("section", heading, section, fields);
    }
    section = [];
  }
  for (const node of tree.children) {
    if (node.type === "heading") {
      flush();
      heading = text(node);
      // Generated provenance is retained verbatim on the source, not mistaken for a new finding.
      if (heading === "来源与转换 / Provenance") break;
      section.push(node);
    } else if (node.type === "table") {
      flush();
      const headers = node.children[0].children.map(text);
      for (const row of node.children.slice(1)) {
        const fields = Object.fromEntries(
          row.children.map((cell, i) => [
            headers[i] || `Column ${i + 1}`,
            text(cell),
          ]),
        );
        add(
          "table-row",
          `${heading} — ${text(row.children[0])}`,
          [row],
          fields,
        );
      }
    } else section.push(node);
  }
  flush();
  return findings;
}

function archiveSourceRecord(
  { original, markdown, ...provenance },
  source,
  entries,
) {
  assert.equal(sha256(original), provenance.source_sha256);
  assert.equal(original.length, provenance.source_bytes);
  const originalText = original.toString("utf8");
  assert.deepEqual(
    Buffer.from(originalText),
    original,
    "Sources must be lossless UTF-8",
  );
  return {
    key: researchSourceKey(source, provenance.source_path),
    slug: provenance.slug,
    title: markdown.match(/^#\s+(.+)$/m)?.[1] || provenance.slug,
    format: provenance.kind,
    source: {
      ...source,
      path: provenance.source_path,
      sha256: provenance.source_sha256,
      bytes: provenance.source_bytes,
    },
    original_text: originalText,
    markdown,
    provenance,
    findings: researchFindings(markdown, entries),
  };
}

export async function prepareResearchArchives({ packet, checkout }) {
  const generated = await generateRemoteDocuments({ packet, checkout });
  const packageBytes = await readFile(resolve(packet, "candidates.json"));
  const candidates = JSON.parse(packageBytes);
  const source = candidates.source;
  assert.equal(source.revision, revision);
  const sources = generated.archiveSources.map((record) =>
    archiveSourceRecord(record, source, candidates.entries),
  );
  const path = "collections/threejs-games/candidates.json";
  const descriptor = candidates.files.find((file) => file.path === path);
  assert.ok(descriptor);
  const bytes = await readFile(resolve(packet, "source", remotePath(path)));
  assert.equal(sha256(bytes), descriptor.sha256);
  assert.equal(bytes.length, descriptor.bytes);
  assert.deepEqual(
    bytes,
    execFileSync("git", ["show", `${revision}:${path}`], {
      cwd: checkout,
      env: { ...process.env, GIT_NO_LAZY_FETCH: "1" },
      maxBuffer: 32 * 1024 * 1024,
    }),
  );
  const gameCandidates = JSON.parse(bytes).candidates;
  const index = catalogIndex(candidates.entries);
  sources.push({
    key: researchSourceKey(source, path),
    slug: "remote/threejs-game-candidates",
    title: "Three.js candidates — unresolved and excluded",
    format: "native-json",
    source: {
      ...source,
      path,
      sha256: descriptor.sha256,
      bytes: descriptor.bytes,
    },
    original_text: bytes.toString("utf8"),
    markdown: "",
    provenance: {
      historical_status:
        "Candidate discovery is not verification or publication.",
    },
    findings: gameCandidates.map((candidate, i) => ({
      ordinal: i + 1,
      kind: "candidate",
      title: candidate.id,
      text: JSON.stringify(candidate),
      markdown: "",
      fields: candidate,
      links: [
        ...new Set([candidate.repository_url, ...candidate.evidence_urls]),
      ].sort(),
      catalog_keys: entryKeys([candidate.repository_url], index),
    })),
  });
  const payload = {
    format: "gamemap.research-archives",
    version: 1,
    source,
    package_sha256: sha256(packageBytes),
    exclusions: candidates.excluded,
    sources: sources.sort((a, b) => a.key.localeCompare(b.key)),
  };
  const canonical = canonicalJSON(payload);
  return { payload, canonical, digest: sha256(canonical), generated };
}

// A separate additive batch preserves the first batch's immutable bodies/digest.
// Its records are old guide snapshots, not replacements for current Git guides.
export async function prepareResearchRemainderArchives({ packet, checkout }) {
  const initial = await generateRemoteDocuments({ packet, checkout });
  const generated = await generateRemoteDocuments({
    packet,
    checkout,
    archiveAll: true,
  });
  const packageBytes = await readFile(resolve(packet, "candidates.json"));
  const candidates = JSON.parse(packageBytes),
    source = candidates.source;
  const sources = generated.archiveSources
    .filter(
      (record) =>
        record.kind !== "import-index" && !databaseResearchArchive(record),
    )
    .map((record) => archiveSourceRecord(record, source, candidates.entries));
  assert.equal(sources.length, 49, "Unexpected remainder scope");
  const metadataPath = "docs/remote/provenance.json";
  const metadataText = initial.outputs.get(metadataPath),
    metadata = JSON.parse(metadataText);
  try {
    assert.deepEqual(
      await readFile(resolve(root, metadataPath)),
      Buffer.from(metadataText),
      "Conversion metadata changed before archival",
    );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  sources.push({
    key: researchSourceKey(source, metadataPath),
    slug: "remote/document-provenance",
    title: "Historical document conversion provenance",
    format: "native-json",
    source: {
      ...source,
      path: metadataPath,
      sha256: sha256(metadataText),
      bytes: Buffer.byteLength(metadataText),
    },
    original_text: metadataText,
    markdown: "",
    provenance: {
      origin: "generated-conversion-manifest",
      note: "Exact local conversion metadata, not an upstream Markdown source or a new review.",
    },
    findings: metadata.documents.map((document, i) => ({
      ordinal: i + 1,
      kind: "section",
      title: document.slug,
      text: canonicalJSON(document),
      markdown: "",
      fields: document,
      links: [
        `${source.repository}/blob/${source.revision}/${document.source_path}`,
      ],
      catalog_keys: [],
    })),
  });
  const initialKeys = new Set(
    initial.archiveSources.map((record) =>
      researchSourceKey(source, record.source_path),
    ),
  );
  assert.ok(
    sources.every((record) => !initialKeys.has(record.key)),
    "Remainder would overwrite an archived source",
  );
  const payload = {
    format: "gamemap.research-archives",
    version: 1,
    source,
    package_sha256: sha256(packageBytes),
    exclusions: candidates.excluded,
    sources: sources.sort((a, b) => a.key.localeCompare(b.key)),
  };
  const canonical = canonicalJSON(payload);
  return { payload, canonical, digest: sha256(canonical), generated };
}

export function researchArchiveReceipt(prepared) {
  return {
    format: "gamemap.research-archive-receipt",
    version: 1,
    batch_digest: prepared.digest,
    source: prepared.payload.source,
    exclusions: prepared.payload.exclusions.length,
    sources: prepared.payload.sources.map((source) => ({
      key: source.key,
      slug: source.slug,
      path: source.source.path,
      sha256: source.source.sha256,
      bytes: source.source.bytes,
      markdown_sha256: sha256(source.markdown),
      findings: source.findings.length,
      findings_sha256: sha256(canonicalJSON(source.findings)),
    })),
  };
}

export async function verifyResearchArchives(client, prepared) {
  const rows = (
    await client.query(
      "select body from catalog.research_sources where batch_digest=$1 order by key",
      [prepared.digest],
    )
  ).rows;
  assert.deepEqual(
    rows.map((row) => row.body),
    prepared.payload.sources,
    "Database source read-back differs",
  );
  const findings = (
    await client.query(
      "select source_key, body from catalog.research_findings where source_key=any($1::text[]) order by source_key, ordinal",
      [prepared.payload.sources.map((source) => source.key)],
    )
  ).rows;
  const expected = prepared.payload.sources.flatMap((source) =>
    source.findings.map((body) => ({ source_key: source.key, body })),
  );
  assert.deepEqual(findings, expected, "Database finding read-back differs");
  const batch = (
    await client.query(
      "select exclusions from catalog.research_import_batches where digest=$1",
      [prepared.digest],
    )
  ).rows[0];
  assert.deepEqual(batch.exclusions, prepared.payload.exclusions);
  return researchArchiveReceipt(prepared);
}

export async function applyResearchArchives(
  client,
  prepared,
  { actor, backupInventory },
) {
  await assertRemoteImportOwner(client, actor);
  assert.deepEqual(
    await remoteDatabaseInventory(client),
    backupInventory,
    "Database changed since backup; stop writers and back up again",
  );
  await client.query("select set_config('request.jwt.claim.sub',$1,true)", [
    actor,
  ]);
  const result = (
    await client.query(
      "select catalog.import_research_archives($1,$2) as result",
      [prepared.canonical, prepared.digest],
    )
  ).rows[0].result;
  return { result, receipt: await verifyResearchArchives(client, prepared) };
}
