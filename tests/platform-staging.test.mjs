import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync, execFileSync } from "node:child_process";
import { parseEnv } from "node:util";
import { root } from "../scripts/lib/documents.mjs";
import {
  stagingPlan,
  reviewStagingPlan,
  renderStagingEnvironment,
} from "../scripts/lib/catalog/staging-plan.mjs";
const example = JSON.parse(
  await readFile(resolve(root, "config/staging.example.json"), "utf8"),
);
const copy = () => JSON.parse(JSON.stringify(example));
const review = (input) =>
  reviewStagingPlan(input, {
    repositoryRoot: root,
    git: { commit: "a".repeat(40), dirty: false },
  });
const find = (report, id) => report.checks.find((row) => row.id === id);
function filled() {
  const p = copy();
  p.site.repository = "sample-owner/GameMap-staging";
  p.site.origin = "https://sample-owner.github.io";
  p.studio.origin = "https://studio-staging.example.com";
  p.database.projectRef = "abcdefghijklmnopqrst";
  p.database.url = "https://abcdefghijklmnopqrst.supabase.co";
  p.database.productionProjectRef = "zyxwvutsrqponmlkjihg";
  return p;
}

test("the staged topology is an explicitly disabled planning document, not deployment authorization", () => {
  assert.ok(stagingPlan.safeParse(example).success);
  const report = review(example);
  assert.equal(report.configurationValid, true);
  assert.equal(report.verdict, "blocked");
  assert.equal(report.productionAuthorized, false);
  assert.equal(report.networkAccess, false);
  assert.equal(report.credentialsLoaded, false);
  assert.equal(find(report, "configuration.placeholders").status, "blocked");
  assert.equal(
    find(report, "database.production-isolation").status,
    "unverified",
  );
  assert.equal(find(report, "publisher.hosting-adapter").status, "blocked");
});
test("even complete clean planning values cannot certify a staging realm, hosting adapter or cloud controls", () => {
  const report = review(filled());
  assert.equal(find(report, "configuration.placeholders").status, "pass");
  assert.equal(find(report, "source.clean").status, "pass");
  assert.equal(find(report, "isolation.repository").status, "pass");
  assert.equal(report.verdict, "blocked");
  const unknownCleanliness = reviewStagingPlan(filled(), {
    repositoryRoot: root,
    git: { commit: "a".repeat(40) },
  });
  assert.equal(find(unknownCleanliness, "source.clean").status, "blocked");
  assert.equal(find(report, "release.trust-realm").status, "blocked");
  assert.equal(find(report, "security.cloud-acceptance").status, "unverified");
});
test("plans reject activation, extra secret fields, credential-bearing URLs, multiline values and unsupported replicas", () => {
  const secret = "do-not-print-private-value";
  for (const change of [
    (p) => {
      p.enabled = true;
    },
    (p) => {
      p.environment = "production";
    },
    (p) => {
      p.password = secret;
    },
    (p) => {
      p.database.url = "https://user:" + secret + "@db.example.com";
    },
    (p) => {
      p.studio.replicas = 2;
    },
    (p) => {
      p.studio.mediaRoot = "/srv/media\nCATALOG_SESSION_SECRET=" + secret;
    },
  ]) {
    const p = filled();
    change(p);
    const report = review(p);
    assert.equal(report.configurationValid, false);
    assert.equal(JSON.stringify(report).includes(secret), false);
    assert.equal(report.verdict, "blocked");
  }
});
test("production reuse, privileged/shared logins, wrong project URLs and checkout media paths are blocked", () => {
  const p = filled();
  p.site.repository = p.production.repository.toLowerCase();
  p.site.origin = p.production.siteOrigin;
  p.site.base = p.production.base;
  p.studio.databaseLogin = "postgres";
  p.publisher.databaseLogin = "postgres";
  p.database.productionProjectRef = p.database.projectRef;
  p.database.url = "https://wrong-project.supabase.co";
  p.studio.mediaRoot = resolve(root, "..media");
  const report = review(p);
  for (const id of [
    "isolation.repository",
    "isolation.public-url",
    "isolation.logins",
    "database.production-isolation",
    "database.project-url",
    "storage.location",
  ])
    assert.equal(find(report, id).status, "blocked", id);
});
test("rendered Studio templates use existing runtime variable names, blank secrets and no publisher credential", () => {
  const text = renderStagingEnvironment(filled()),
    env = parseEnv(text);
  assert.equal(env.NODE_ENV, "production");
  assert.equal(env.CATALOG_DATABASE_URL, "");
  assert.equal(env.SUPABASE_PUBLISHABLE_KEY, "");
  assert.equal(env.CATALOG_SESSION_SECRET, "");
  assert.equal(env.CATALOG_STUDIO_ORIGIN, "https://studio-staging.example.com");
  assert.equal(env.CATALOG_MEDIA_ROOT, "/srv/gamemap-staging/media");
  assert.equal(
    Object.keys(env).some(
      (key) => key.startsWith("VITE_") || key.includes("PUBLISHER"),
    ),
    false,
  );
  assert.match(text, /NOT a staging identity boundary/);
  assert.match(text, /before connecting a cloud project/);
});
test("offline CLI emits a private redacted blocked report without reading runtime credentials or mutating Git", async () => {
  const directory = await mkdtemp(join(tmpdir(), "gamemap-staging-audit-"));
  const secret = "private-runtime-sentinel-not-for-a-report";
  const git = () =>
    execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], {
      cwd: root,
      encoding: "utf8",
    });
  const before = git();
  try {
    const output = join(directory, "result");
    const result = spawnSync(
      process.execPath,
      [
        "scripts/staging-readiness.mjs",
        "--config",
        "config/staging.example.json",
        "--out",
        output,
      ],
      {
        cwd: root,
        env: {
          ...process.env,
          CATALOG_DATABASE_URL: secret,
          CATALOG_SESSION_SECRET: secret,
          SUPABASE_URL: "https://never-connect.invalid",
        },
        encoding: "utf8",
        timeout: 15000,
      },
    );
    assert.equal(result.status, 2, result.stderr);
    assert.match(result.stdout, /Staging readiness: BLOCKED/);
    assert.equal((result.stdout + result.stderr).includes(secret), false);
    const report = JSON.parse(
      await readFile(join(output, "report.json"), "utf8"),
    );
    assert.equal(report.credentialsLoaded, false);
    assert.equal(report.networkAccess, false);
    assert.equal(JSON.stringify(report).includes(secret), false);
    assert.equal((await stat(join(output, "report.json"))).mode & 0o777, 0o600);
    assert.ok(report.checks.some((row) => row.reference?.line > 0));
    assert.equal(git(), before);
    const repeat = spawnSync(
      process.execPath,
      ["scripts/staging-readiness.mjs", "--out", output],
      { cwd: root, encoding: "utf8" },
    );
    assert.equal(repeat.status, 1);
    const bad = join(directory, "bad.json");
    await writeFile(bad, `not-json ${secret}`);
    const invalid = spawnSync(
      process.execPath,
      [
        "scripts/staging-readiness.mjs",
        "--config",
        bad,
        "--out",
        join(directory, "invalid"),
      ],
      { cwd: root, encoding: "utf8" },
    );
    assert.equal(invalid.status, 1);
    assert.equal((invalid.stdout + invalid.stderr).includes(secret), false);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
