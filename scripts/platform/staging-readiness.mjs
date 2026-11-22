#!/usr/bin/env node
// Offline preparation only: no Auth/DB client, provider SDK, HTTP request, deploy or git mutation.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { root } from "../lib/documents.mjs";
import { assertPrivateDirectory, sha256 } from "../lib/catalog/codec.mjs";
import {
  reviewStagingPlan,
  renderStagingEnvironment,
} from "../lib/catalog/staging-plan.mjs";
const help = `Offline staging preparation (never connects, uploads, commits or deploys)
  npm run staging:check -- --config config/staging.example.json --out NEW_PRIVATE_DIRECTORY
Exit 2 means not ready for cloud deployment. Outputs contain a redacted report and,
when structurally valid, an unfilled Studio environment template. Do not run that
template until blockers are resolved. Existing output directories are refused.
`;
async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) return console.log(help);
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const key = args[index];
    assert.ok(
      ["--config", "--out"].includes(key) && !Object.hasOwn(options, key),
      help,
    );
    const value = args[++index];
    assert.ok(value && !value.startsWith("--"), help);
    options[key] = value;
  }
  const input = resolve(options["--config"] || "config/staging.example.json");
  assert.ok(
    options["--out"],
    "Choose a new private output directory with --out",
  );
  const output = resolve(options["--out"]);
  await assertPrivateDirectory(root, output);
  let plan;
  try {
    plan = JSON.parse(await readFile(input, "utf8"));
  } catch {
    throw new Error(
      "Unable to read a valid JSON staging plan; raw input and values were not printed",
    );
  }
  const commit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  const dirty = Boolean(
    execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], {
      cwd: root,
      encoding: "utf8",
    }).trim(),
  );
  const references = {};
  for (const [name, path, literal] of [
    [
      "releaseRealm",
      "supabase/migrations/0013_catalog_release_realm.sql",
      "create table catalog.release_realms",
    ],
    [
      "publisher",
      "scripts/lib/catalog/cloud-publication.mjs",
      "createCloudPublisher",
    ],
    [
      "pages",
      ".github/workflows/deploy-release-pages.yml",
      "Promote verified GameMap release artifact",
    ],
    [
      "sessionRefresh",
      "scripts/lib/catalog/auth.mjs",
      "const refreshing = new Map()",
    ],
    ["restore", "scripts/lib/catalog/cloud-backup.mjs", "backupCloudPlatform"],
    ["parity", "scripts/lib/catalog/withdrawal.mjs", "parseWithdrawalPolicy"],
    [
      "communityServer",
      "scripts/platform/community-server.mjs",
      "createProductionCommunityService",
    ],
    [
      "loginAudit",
      "scripts/lib/catalog/database.mjs",
      "assertLeastPrivilegeLogin",
    ],
  ]) {
    const bytes = await readFile(resolve(root, path));
    const line =
      bytes
        .toString()
        .split("\n")
        .findIndex((value) => value.includes(literal)) + 1;
    references[name] = { path, line: line || null, sha256: sha256(bytes) };
  }
  const report = reviewStagingPlan(plan, {
    repositoryRoot: root,
    git: { commit, dirty },
    references,
  });
  await mkdir(resolve(output, ".."), { recursive: true, mode: 0o700 });
  await mkdir(output, { mode: 0o700 });
  await writeFile(
    join(output, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
    { flag: "wx", mode: 0o600 },
  );
  if (report.configurationValid)
    await writeFile(
      join(output, "studio.env.example"),
      renderStagingEnvironment(plan),
      { flag: "wx", mode: 0o600 },
    );
  console.log(
    `Staging readiness: BLOCKED. ${report.checks.filter((row) => row.status === "blocked").length} blocked; ${report.checks.filter((row) => row.status === "unverified").length} unverified.`,
  );
  console.log(`Private report: ${join(output, "report.json")}`);
  console.log(
    "No credential stores loaded. No network requests, resource creation, migration, commit, push or site changes.",
  );
  process.exitCode = 2;
}
main().catch(() => {
  console.error(
    "Staging preparation failed. Check the command, JSON plan and new private output path; raw configuration was not printed.",
  );
  process.exitCode = 1;
});
