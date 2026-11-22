#!/usr/bin/env node
/**
 * Deterministic exporter for approved local database records into Git static sources.
 * Reads only `state === "approved"` records from `.build/catalog-local/development/content/input.json`
 * that are not yet present in Git baseline sources, and writes cleanly formatted static source modules.
 */
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { root } from "../lib/documents.mjs";
import { developmentInputPath } from "../lib/catalog/site-input.mjs";
import { loadContent } from "../lib/content.mjs";

const toPublicAssetExpr = (value) => {
  if (typeof value !== "string") return JSON.stringify(value);
  if (/^https?:\/\//.test(value)) return JSON.stringify(value);
  return `publicAsset(${JSON.stringify(value.replace(/^\//, ""))})`;
};

async function main() {
  const inputPath = process.argv.includes("--input")
    ? resolve(process.argv[process.argv.indexOf("--input") + 1])
    : developmentInputPath;
  const devInput = JSON.parse(await readFile(inputPath, "utf8"));
  assert.equal(devInput.format, "gamemap.development-input");

  // Load current Git baseline keys (excluding files this script regenerates)
  const existingKeys = new Set();
  const context = await loadContent("/");
  for (const entry of context.registry.entries) existingKeys.add(entry.key);

  const approved = devInput.records.filter((row) => row.state === "approved");
  const byKind = (kind) =>
    approved
      .filter((row) => row.kind === kind)
      .sort((a, b) => a.identifier.localeCompare(b.identifier));

  // 1. Papers (all approved papers)
  const papers = byKind("paper").map((row) => row.body.payload);
  await writeFile(
    resolve(root, "data/segments/approved-papers.json"),
    JSON.stringify(papers, null, 2) + "\n",
  );

  // 2. Three.js games + their pageCover attachments
  const threejsRows = byKind("threejs-game");
  const threejsGames = threejsRows.map((row) => row.body.payload);
  await writeFile(
    resolve(root, "data/segments/approved-threejs-games.json"),
    JSON.stringify(threejsGames, null, 2) + "\n",
  );
  const pageCovers = {};
  for (const row of threejsRows) {
    if (row.body.attachments?.pageCover) {
      pageCovers[row.key] = row.body.attachments.pageCover;
    }
  }
  await writeFile(
    resolve(root, "data/segments/approved-threejs-page-covers.json"),
    JSON.stringify(pageCovers, null, 2) + "\n",
  );

  // 3. Approved DB-only resources (distribution platforms) + verified identities
  const existingResources = new Set(
    JSON.parse(
      await readFile(resolve(root, "data/resources.json"), "utf8"),
    ).map((r) => r.id),
  );
  const existingDistPlatforms = await readFile(
    resolve(root, "data/segments/distribution-platforms.json"),
    "utf8",
  )
    .then((text) => new Set(JSON.parse(text).map((r) => r.id)))
    .catch(() => new Set());
  const newResources = byKind("resource").filter(
    (row) =>
      !existingResources.has(row.identifier) ||
      existingDistPlatforms.has(row.identifier),
  );
  await writeFile(
    resolve(root, "data/segments/distribution-platforms.json"),
    JSON.stringify(
      newResources.map((row) => row.body.payload),
      null,
      2,
    ) + "\n",
  );
  const identitiesPath = resolve(
    root,
    "website/src/data/resourceIdentities.json",
  );
  const identities = JSON.parse(await readFile(identitiesPath, "utf8"));
  for (const row of newResources) {
    if (row.body.attachments?.identity) {
      identities[row.identifier] = row.body.attachments.identity;
    }
  }
  await writeFile(identitiesPath, JSON.stringify(identities, null, 2) + "\n");

  // 4. Approved DB-only community collections
  const existingCollectionIds = new Set(
    context.sources.communityCollections.map((c) => c.id),
  );
  const previousApprovedCollections = await readFile(
    resolve(root, "website/src/data/approvedImportedCollections.ts"),
    "utf8",
  )
    .then(
      (text) =>
        new Set([...text.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1])),
    )
    .catch(() => new Set());
  const newCollections = byKind("collection")
    .filter(
      (row) =>
        !existingCollectionIds.has(row.identifier) ||
        previousApprovedCollections.has(row.identifier),
    )
    .map((row) => row.body.payload);
  await writeFile(
    resolve(root, "website/src/data/approvedImportedCollections.ts"),
    `import type { PayloadModels } from "../../content/contracts";\n\nexport const approvedImportedCollections: PayloadModels["collection"][] = ${JSON.stringify(newCollections, null, 2)};\n`,
  );

  // 5. Approved DB-only examples + learningMedia + agentAttribution + media provenance ledger
  const existingExampleIds = new Set(
    context.sources.learningPaths.map((e) => e.id),
  );
  const previousApprovedExamples = await readFile(
    resolve(root, "website/src/data/approvedImportedCases.ts"),
    "utf8",
  )
    .then(
      (text) =>
        new Set([...text.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1])),
    )
    .catch(() => new Set());
  const newExamples = byKind("example").filter(
    (row) =>
      !existingExampleIds.has(row.identifier) ||
      previousApprovedExamples.has(row.identifier),
  );
  await writeFile(
    resolve(root, "website/src/data/approvedImportedCases.ts"),
    `import type { LearningPath } from "./learningTypes";\n\nexport const approvedImportedCases: LearningPath[] = ${JSON.stringify(
      newExamples.map((row) => row.body.payload),
      null,
      2,
    )};\n`,
  );
  const mediaEntries = {};
  const mediaLedgerRecords = [];
  const agentAttributionAdditions = {};
  for (const row of newExamples) {
    if (row.body.attachments?.learningMedia) {
      mediaEntries[row.identifier] = row.body.attachments.learningMedia;
      mediaLedgerRecords.push({
        id: row.identifier,
        media: row.body.attachments.learningMedia,
        processing: {
          crop: false,
          generatedSceneContent: false,
        },
      });
    }
    if (row.body.attachments?.agentAttribution) {
      agentAttributionAdditions[row.identifier] =
        row.body.attachments.agentAttribution;
    }
  }
  await writeFile(
    resolve(root, "website/src/data/approvedImportedMedia.ts"),
    `import type { LearningMedia } from "./learningMedia";\n\nexport const approvedImportedMedia: Record<string, LearningMedia> = ${JSON.stringify(mediaEntries, null, 2)};\n`,
  );
  await writeFile(
    resolve(root, "data/segments/approved-imported-media.json"),
    JSON.stringify(
      {
        kind: "approved-imported-gameplay-screenshots",
        records: mediaLedgerRecords,
      },
      null,
      2,
    ) + "\n",
  );
  await writeFile(
    resolve(root, "website/src/data/approvedImportedAgents.ts"),
    `import type { AttributionAgentId } from "./agentGameTypes";\n\nexport const approvedImportedAgents: Record<string, AttributionAgentId[]> = ${JSON.stringify(agentAttributionAdditions, null, 2)};\n`,
  );

  // 6. Approved DB-only demos (grouped by originalRecording)
  const existingDemoIds = new Set(
    context.sources.recordings.flatMap((r) => r.views.map((v) => v.id)),
  );
  const previousApprovedDemos = await readFile(
    resolve(root, "website/src/data/approvedImportedRecordings.ts"),
    "utf8",
  )
    .then(
      (text) =>
        new Set([...text.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1])),
    )
    .catch(() => new Set());
  const newDemos = byKind("demo").filter(
    (row) =>
      !existingDemoIds.has(row.identifier) ||
      previousApprovedDemos.has(row.identifier),
  );
  const recordingsById = new Map();
  for (const row of newDemos) {
    const orig = row.body.attachments.originalRecording;
    assert.ok(orig, `Demo missing originalRecording: ${row.identifier}`);
    let rec = recordingsById.get(orig.id);
    if (!rec) {
      rec = {
        id: orig.id,
        resourceId: orig.resourceId,
        originalUrl: orig.originalUrl,
        views: [],
      };
      recordingsById.set(orig.id, rec);
    }
    const view = { ...row.body.payload };
    delete view.recordingId;
    delete view.resourceId;
    delete view.originalUrl;
    rec.views.push(view);
  }
  const recLines = [
    `import { publicAsset } from "../publicAsset";`,
    `import type { Recording } from "../../content/media";`,
    ``,
    `export const approvedImportedRecordings: Recording[] = [`,
  ];
  for (const rec of recordingsById.values()) {
    recLines.push(`  {`);
    recLines.push(`    id: ${JSON.stringify(rec.id)},`);
    recLines.push(`    resourceId: ${JSON.stringify(rec.resourceId)},`);
    recLines.push(`    originalUrl: ${JSON.stringify(rec.originalUrl)},`);
    recLines.push(`    views: [`);
    for (const view of rec.views) {
      recLines.push(`      {`);
      for (const [k, v] of Object.entries(view)) {
        if (k === "poster" || k === "previewSrc") {
          recLines.push(`        ${k}: ${toPublicAssetExpr(v)},`);
        } else {
          recLines.push(`        ${k}: ${JSON.stringify(v)},`);
        }
      }
      recLines.push(`      },`);
    }
    recLines.push(`    ],`);
    recLines.push(`  },`);
  }
  recLines.push(`];`);
  recLines.push(``);
  await writeFile(
    resolve(root, "website/src/data/approvedImportedRecordings.ts"),
    recLines.join("\n"),
  );

  console.log(
    JSON.stringify(
      {
        exported: true,
        papers: papers.length,
        threejsGames: threejsGames.length,
        threejsPageCovers: Object.keys(pageCovers).length,
        resources: newResources.length,
        collections: newCollections.length,
        examples: newExamples.length,
        demos: newDemos.length,
      },
      null,
      2,
    ),
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
