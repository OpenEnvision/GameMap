#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseEnv } from "node:util";
import postgres from "postgres";
import { root } from "../lib/documents.mjs";
import { loadContent } from "../lib/content.mjs";
import { createImportBundle } from "../lib/platform.mjs";
import { canonicalJSON, digest } from "../lib/catalog/codec.mjs";
import { connectDatabase } from "../lib/catalog/database.mjs";
import { readWorkingCatalog } from "../lib/catalog/development.mjs";
import {
  planSourceImport,
  prepareMergeDrafts,
  readMergeHistory,
  saveMergeDrafts,
} from "../lib/catalog/source-import.mjs";
import {
  assertLoopback,
  localAccess,
  localDirectory,
  readLocalRealm,
  readLocalStatus,
} from "../lib/catalog/local-runtime.mjs";

const help = `npm run local:import            Report Git records to add, merge or review
npm run local:import -- --apply  Import missing records and save merged Git changes as drafts

Database edits are kept. A field changed differently in Git and the database is reported,
not merged. Nothing is submitted, approved or published.`;
// The Git version each record last incorporated, for the next three-way merge.
const basePath = join(localDirectory, "imports", "git-base.json");

async function readBases() {
  try {
    const stored = JSON.parse(await readFile(basePath, "utf8"));
    assert.equal(stored.format, "gamemap.git-merge-base");
    return stored.records;
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) return console.log(help);
  assert.ok(
    args.length === 0 || (args.length === 1 && args[0] === "--apply"),
    help,
  );
  const apply = args[0] === "--apply";
  const status = await readLocalStatus();
  const realm = await readLocalRealm();
  const config = parseEnv(await readFile(resolve(root, ".env"), "utf8"));
  const url = assertLoopback(config.CATALOG_DATABASE_URL, [
    "postgres:",
    "postgresql:",
  ]);
  assert.equal(
    url.host,
    new URL(status.DB_URL).host,
    "Use this checkout's local database",
  );
  assert.equal(
    url.pathname,
    new URL(status.DB_URL).pathname,
    "Use this checkout's local database",
  );
  const database = connectDatabase(config.CATALOG_DATABASE_URL);
  const directory = join(
    localDirectory,
    "imports",
    `source-${new Date().toISOString().replaceAll(":", "-")}`,
  );
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const reportPath = join(directory, "report.json");
  const writeReport = (report) =>
    writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", {
      mode: 0o600,
    });
  try {
    const context = await loadContent("/", { input: null });
    const bundle = await createImportBundle(context);
    const current = await readWorkingCatalog(database, realm);
    const gitKeys = new Set(
      bundle.snapshot.entries.map((record) => record.key),
    );
    const shared = current.records
      .map((record) => record.key)
      .filter((key) => gitKeys.has(key));
    const bases = await readBases();
    const plan = planSourceImport(bundle.snapshot, current, {
      ...(await readMergeHistory(database, shared)),
      bases,
    });
    const { drafts, rejected } = prepareMergeDrafts(
      context,
      plan.merges,
      new Map(current.records.map((record) => [record.key, record])),
    );
    const report = {
      gitCommit: bundle.snapshot.git_commit,
      applied: false,
      additions: plan.additions.map((record) => record.key),
      merges: drafts.map((draft) => ({
        key: draft.key,
        fromGit: draft.fromGit,
        ...(draft.cover ? { cover: draft.cover } : {}),
      })),
      conflicts: [...plan.conflicts, ...rejected],
      unchanged: plan.unchanged.length,
      databaseOnly: plan.databaseOnly,
    };
    await writeReport(report);
    if (apply) {
      const incorporated = [...plan.unchanged];
      if (plan.snapshot.entries.length) {
        const owner = postgres(status.DB_URL, {
          max: 1,
          prepare: false,
          onnotice() {},
        });
        try {
          await owner`select catalog.import_snapshot(${canonicalJSON(plan.snapshot)}, ${digest(plan.snapshot)})`;
        } finally {
          await owner.end({ timeout: 5 });
        }
        incorporated.push(...plan.additions);
      }
      const actor = (await localAccess()).accounts.admin.id;
      const { saved, failed } = await saveMergeDrafts(database, actor, drafts);
      incorporated.push(...saved);
      const next = { ...bases };
      for (const { key, revision, fields } of incorporated)
        next[key] = { revision, fields };
      await writeFile(
        basePath,
        JSON.stringify({
          format: "gamemap.git-merge-base",
          version: 1,
          gitCommit: bundle.snapshot.git_commit,
          records: next,
        }) + "\n",
        { mode: 0o600 },
      );
      Object.assign(report, {
        applied: true,
        merges: report.merges.filter((row) =>
          saved.some((item) => item.key === row.key),
        ),
        conflicts: [...report.conflicts, ...failed],
      });
      await writeReport(report);
    }
    const covers = report.merges.filter((row) => row.cover).length;
    console.log(
      `${report.additions.length} missing, ${report.merges.length} merged, ${report.conflicts.length} for review, ${report.unchanged} already current.`,
    );
    if (covers)
      console.log(
        `${covers} merged records gain Git gameplay media; their fallback page covers are archived or kept in revision history.`,
      );
    console.log(
      apply
        ? "Missing records were imported and merges saved as drafts. Database edits were kept; nothing was approved or published."
        : "Report only. Run with --apply to import and merge.",
    );
    console.log(`Report: ${reportPath}`);
  } finally {
    await database.close();
  }
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
