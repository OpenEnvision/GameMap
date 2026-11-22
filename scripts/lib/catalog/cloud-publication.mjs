import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  mkdir,
  lstat,
  readdir,
  readlink,
  realpath,
  open,
  rename,
  unlink,
  symlink,
  rm,
  writeFile,
  mkdtemp,
} from "node:fs/promises";
import { resolve, join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { z } from "zod";
import { root as repository } from "../documents.mjs";
import {
  assertPrivateDirectory,
  canonicalJSON,
  readArtifact,
  safePath,
  sha256,
} from "./codec.mjs";
import { verifySiteArtifact } from "./site-build.mjs";
import { parseReleaseRealm, assertReleaseRealm } from "./release-realm.mjs";

const digestPattern = /^[a-f0-9]{64}$/;
const uuidPattern =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

const httpsOrigin = z
  .string()
  .min(1)
  .max(256)
  .refine((value) => {
    try {
      const url = new URL(value);
      return (
        url.protocol === "https:" &&
        url.origin === value &&
        !url.username &&
        !url.password
      );
    } catch {
      return false;
    }
  }, "Cloud target origin must be an exact HTTPS origin without credentials");

const safeBase = z.string().refine(
  (value) =>
    value.startsWith("/") &&
    value.endsWith("/") &&
    value
      .split("/")
      .filter(Boolean)
      .every(
        (part) => /^[A-Za-z0-9._-]+$/.test(part) && ![".", ".."].includes(part),
      ),
  "Use a safe slash-delimited deployment base path",
);

export const cloudTargetSchema = z.strictObject({
  format: z.literal("gamemap.cloud-target"),
  version: z.literal(1),
  provider: z.enum(["github-pages", "persistent-node"]),
  repository: z.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/),
  origin: httpsOrigin,
  base: safeBase,
  approvalEnvironment: z.string().regex(/^[a-z][a-z0-9-]{0,63}$/),
  branch: z
    .string()
    .regex(/^[A-Za-z0-9._/-]{1,120}$/)
    .optional(),
});

export function parseCloudTarget(value) {
  const parsed = cloudTargetSchema.safeParse(value);
  assert.ok(parsed.success, "Invalid cloud publication target configuration");
  return parsed.data;
}

export function cloudTargetDigest(target) {
  const clean = parseCloudTarget(target);
  return sha256(
    canonicalJSON({
      provider: clean.provider,
      repository: clean.repository,
      origin: clean.origin,
      base: clean.base,
      approvalEnvironment: clean.approvalEnvironment,
    }),
  );
}

async function exists(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return null;
  }
}

async function syncDirectory(directory) {
  const file = await open(directory, "r");
  try {
    await file.sync();
  } finally {
    await file.close();
  }
}

async function syncTreeDirectories(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true }))
    if (entry.isDirectory())
      await syncTreeDirectories(join(directory, entry.name));
  await syncDirectory(directory);
}

async function durableJSON(path, value) {
  const temporary = path + "." + randomUUID();
  const file = await open(temporary, "wx", 0o600);
  try {
    await file.writeFile(JSON.stringify(value, null, 2) + "\n");
    await file.sync();
  } finally {
    await file.close();
  }
  await rename(temporary, path);
  await syncDirectory(dirname(path));
}

async function verifyLiveDeployment({
  origin,
  base,
  evidence,
  fetcher = fetch,
  attempts = 1,
  delayMs = 0,
}) {
  const url = new URL(base + "site-manifest.json", origin).href;
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetcher(url, {
        headers: { "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok)
        throw new Error(`Live verification returned HTTP ${response.status}`);
      const manifestBytes = Buffer.from(await response.arrayBuffer());
      const expectedEntry = evidence.files.find(
        (file) => file.path === "site-manifest.json",
      );
      assert.ok(expectedEntry, "Artifact is missing site-manifest.json");
      assert.equal(
        sha256(manifestBytes),
        expectedEntry.sha256,
        "Deployed site-manifest.json digest differs from verified artifact",
      );
      const manifest = JSON.parse(manifestBytes.toString("utf8"));
      assert.deepEqual(
        manifest.source?.realm,
        evidence.realm,
        "Deployed site-manifest.json realm differs",
      );
      assert.equal(
        manifest.source?.release,
        evidence.release,
        "Deployed site-manifest.json release differs",
      );
      assert.equal(
        manifest.source?.development,
        false,
        "Deployed site-manifest.json must not be marked development",
      );
      return {
        deploymentUrl: origin + base,
        verifiedManifestDigest: expectedEntry.sha256,
        verifiedFilesDigest: evidence.artifactDigest,
      };
    } catch (error) {
      lastError = error;
      if (i + 1 < attempts && delayMs > 0)
        await new Promise((done) => setTimeout(done, delayMs));
    }
  }
  throw lastError;
}

/** GitHub Pages exact-artifact hosting adapter: publishes verified site bytes without rebuilding. */
export function createGitHubPagesAdapter({
  target,
  fetcher = fetch,
  pushArtifact,
  verifyAttempts = 5,
  verifyDelayMs = 3000,
}) {
  const config = parseCloudTarget(target);
  assert.equal(config.provider, "github-pages");
  return {
    provider: "github-pages",
    async deploy({ artifactDirectory, evidence, run }) {
      const receipt = {
        format: "gamemap.cloud-deployment-receipt",
        version: 1,
        artifactDigest: evidence.artifactDigest,
        release: evidence.release,
        manifestDigest: evidence.manifestDigest,
        contextDigest: evidence.contextDigest,
        realm: evidence.realm,
        run,
      };
      let uploaded;
      if (pushArtifact) {
        uploaded = await pushArtifact({
          target: config,
          siteDirectory: join(artifactDirectory, "site"),
          evidence,
          receipt,
          run,
        });
      } else {
        const token = process.env.GITHUB_PAGES_DEPLOY_TOKEN || "";
        assert.ok(
          token,
          "Set GITHUB_PAGES_DEPLOY_TOKEN or use the protected GitHub Actions workflow",
        );
        const branch = config.branch || "gh-pages";
        const work = await mkdtemp(join(tmpdir(), "gamemap-gh-pages-"));
        try {
          const siteDir = join(artifactDirectory, "site");
          for (const file of evidence.files) {
            const bytes = await readArtifact(siteDir, file.path);
            assert.equal(sha256(bytes), file.sha256);
            const dest = safePath(work, file.path);
            await mkdir(dirname(dest), { recursive: true });
            await writeFile(dest, bytes, { flag: "wx" });
          }
          await writeFile(join(work, ".nojekyll"), "", { flag: "a" });
          await writeFile(
            join(work, "artifact-receipt.json"),
            canonicalJSON(receipt) + "\n",
          );
          const git = (args, extraEnv = {}) =>
            execFileSync("git", args, {
              cwd: work,
              encoding: "utf8",
              env: {
                ...process.env,
                GIT_AUTHOR_NAME: "GameMap Publisher",
                GIT_AUTHOR_EMAIL: "publisher@gamemap.invalid",
                GIT_COMMITTER_NAME: "GameMap Publisher",
                GIT_COMMITTER_EMAIL: "publisher@gamemap.invalid",
                ...extraEnv,
              },
            }).trim();
          git(["init", "-b", branch]);
          git(["add", "-A"]);
          git([
            "commit",
            "-m",
            `Publish artifact ${evidence.artifactDigest.slice(0, 12)} (${run})`,
          ]);
          const commit = git(["rev-parse", "HEAD"]);
          const authHeader =
            "AUTHORIZATION: basic " +
            Buffer.from(`x-access-token:${token}`).toString("base64");
          git([
            "-c",
            `http.extraheader=${authHeader}`,
            "push",
            "--force",
            `https://github.com/${config.repository}.git`,
            `HEAD:refs/heads/${branch}`,
          ]);
          uploaded = {
            deploymentId: `gh-pages:${config.repository}@${commit}`,
            deployedCommit: commit,
          };
        } finally {
          await rm(work, { recursive: true, force: true });
        }
      }
      const verified = await verifyLiveDeployment({
        origin: config.origin,
        base: config.base,
        evidence,
        fetcher,
        attempts: verifyAttempts,
        delayMs: verifyDelayMs,
      });
      return {
        provider: "github-pages",
        deploymentUrl: verified.deploymentUrl,
        deploymentId: uploaded.deploymentId,
        deployedCommit: uploaded.deployedCommit || null,
        verifiedFilesDigest: verified.verifiedFilesDigest,
      };
    },
  };
}

/** Single-instance persistent-node hosting adapter: atomic symlink + published.json + HTTPS probe. */
export function createPersistentNodeAdapter({
  target,
  directory,
  fetcher = fetch,
  verifyLive = true,
  verifyAttempts = 3,
  verifyDelayMs = 1000,
}) {
  const config = parseCloudTarget(target);
  assert.equal(config.provider, "persistent-node");
  const rootDir = resolve(directory);
  return {
    provider: "persistent-node",
    async switchTo({ digest, instance }) {
      assert.match(digest, digestPattern);
      const temporary = join(rootDir, ".current-" + randomUUID());
      await symlink(`artifacts/${digest}/site`, temporary);
      await rename(temporary, join(rootDir, "current"));
      await syncDirectory(rootDir);
      await durableJSON(join(rootDir, "published.json"), {
        format: "gamemap.published-pointer",
        version: 1,
        instance,
        artifact: digest,
      });
    },
    async deploy({ evidence, instance, run }) {
      await this.switchTo({ digest: evidence.artifactDigest, instance });
      let verifiedUrl = config.origin + config.base;
      if (verifyLive) {
        const verified = await verifyLiveDeployment({
          origin: config.origin,
          base: config.base,
          evidence,
          fetcher,
          attempts: verifyAttempts,
          delayMs: verifyDelayMs,
        });
        verifiedUrl = verified.deploymentUrl;
      }
      return {
        provider: "persistent-node",
        deploymentUrl: verifiedUrl,
        deploymentId: `node:${run}:${evidence.artifactDigest.slice(0, 12)}`,
        deployedCommit: evidence.gitCommit || null,
        verifiedFilesDigest: evidence.artifactDigest,
      };
    },
  };
}

/**
 * Cloud exact-artifact publisher for staging and production realms.
 * Refuses local/development realms, retains exact verified bytes for rollback,
 * verifies deployed bytes via its hosting adapter, and commits CAS activation in SQL.
 */
export function createCloudPublisher({
  database,
  realm: expectedRealm,
  target: targetConfig,
  adapter,
  retentionDirectory,
  checkpoint = async () => {},
}) {
  const realm = parseReleaseRealm(expectedRealm);
  assert.ok(
    ["staging", "production"].includes(realm.environment),
    "Cloud publisher accepts only staging or production realms",
  );
  const target = parseCloudTarget(targetConfig);
  const targetDigest = cloudTargetDigest(target);
  if (adapter) {
    assert.equal(
      adapter.provider,
      target.provider,
      "Hosting adapter provider differs from cloud target configuration",
    );
  }
  const directory = resolve(retentionDirectory);
  const marker = join(directory, "target.json");
  const pending = join(directory, "pending.json");
  const artifactDirectory = (digest) => {
    assert.match(digest, digestPattern);
    return join(directory, "artifacts", digest);
  };

  async function bind(db) {
    const state = await db.cloudStatus();
    assertReleaseRealm(state.realm, realm);
    await assertPrivateDirectory(repository, directory);
    await mkdir(dirname(directory), { recursive: true, mode: 0o700 });
    await mkdir(directory, { mode: 0o700 }).catch((error) => {
      if (error.code !== "EEXIST") throw error;
    });
    const info = await lstat(directory);
    assert.ok(
      info.isDirectory() && !info.isSymbolicLink(),
      "Cloud retention directory must be a real private directory",
    );
    if (await exists(marker)) {
      const saved = JSON.parse(await readArtifact(directory, "target.json"));
      assert.equal(saved.format, "gamemap.cloud-publication");
      assert.equal(saved.instance, state.instance_id);
      assert.equal(saved.targetDigest, targetDigest);
      assert.deepEqual(saved.realm, realm);
    } else {
      assert.deepEqual(
        await readdir(directory),
        [],
        "Refuse to adopt a nonempty unmarked cloud retention directory",
      );
    }
    await db.claimCloudTarget({
      provider: target.provider,
      repository: target.repository,
      origin: target.origin,
      base: target.base,
      approvalEnvironment: target.approvalEnvironment,
      targetDigest,
    });
    if (!(await exists(marker))) {
      await durableJSON(marker, {
        format: "gamemap.cloud-publication",
        version: 1,
        instance: state.instance_id,
        realm,
        target,
        targetDigest,
      });
    }
    await mkdir(join(directory, "artifacts"), { mode: 0o700 }).catch(
      (error) => {
        if (error.code !== "EEXIST") throw error;
      },
    );
    assert.ok(
      !(await lstat(join(directory, "artifacts"))).isSymbolicLink(),
      "Artifact retention store cannot be a symlink",
    );
    return db.cloudStatus();
  }

  async function retained(db, digest) {
    const receipt = await db.artifact(digest);
    assert.ok(receipt, "Unknown cloud artifact receipt");
    const path = artifactDirectory(digest);
    assert.ok(
      !(await lstat(path)).isSymbolicLink() &&
        !(await lstat(join(path, "site"))).isSymbolicLink(),
      "Retained artifact and site must not be symlinks",
    );
    const evidence = await verifySiteArtifact(path);
    assert.equal(evidence.version, 2);
    assert.equal(evidence.development, false);
    assert.equal(evidence.browserChecked, true);
    assert.equal(evidence.artifactDigest, digest);
    assertReleaseRealm(evidence.realm, realm);
    assert.equal(
      (await readArtifact(path, "evidence.json")).toString(),
      receipt.evidence_text,
      "Retained cloud artifact evidence changed",
    );
    return { path, receipt, evidence };
  }

  async function stage(db, input) {
    const text = (await readArtifact(input, "evidence.json")).toString();
    const evidence = await verifySiteArtifact(input);
    assert.equal(
      evidence.version,
      2,
      "Cloud publication requires version-2 realm-bound artifacts",
    );
    assertReleaseRealm(evidence.realm, realm);
    assert.deepEqual(
      JSON.parse(text),
      evidence,
      "Artifact evidence changed while reading",
    );
    assert.equal(
      evidence.development,
      false,
      "Development artifacts are forbidden in cloud publication",
    );
    assert.equal(
      evidence.browserChecked,
      true,
      "Browser gates are required before cloud publication",
    );
    assert.match(evidence.artifactDigest, digestPattern);
    const destination = artifactDirectory(evidence.artifactDigest);
    if (!(await exists(destination))) {
      const temporary = join(
        directory,
        "artifacts",
        ".incoming-" + randomUUID(),
      );
      await mkdir(temporary, { mode: 0o700 });
      try {
        for (const file of evidence.files) {
          const bytes = await readArtifact(join(input, "site"), file.path);
          assert.equal(bytes.length, file.bytes);
          assert.equal(
            sha256(bytes),
            file.sha256,
            "Artifact changed while copying",
          );
          const filePath = safePath(join(temporary, "site"), file.path);
          await mkdir(dirname(filePath), { recursive: true, mode: 0o700 });
          const output = await open(filePath, "wx", 0o600);
          try {
            await output.writeFile(bytes);
            await output.sync();
          } finally {
            await output.close();
          }
        }
        await writeFile(join(temporary, "evidence.json"), text, {
          flag: "wx",
          mode: 0o600,
        });
        const file = await open(join(temporary, "evidence.json"), "r");
        try {
          await file.sync();
        } finally {
          await file.close();
        }
        await verifySiteArtifact(temporary);
        await syncTreeDirectories(temporary);
        await rename(temporary, destination);
        await syncDirectory(join(directory, "artifacts"));
      } finally {
        await rm(temporary, { recursive: true, force: true });
      }
    }
    await db.registerCloudArtifact(text);
    return retained(db, evidence.artifactDigest);
  }

  async function reconcile(db) {
    const state = await db.cloudStatus();
    if (!(await exists(pending))) {
      if (state.artifact_digest) await retained(db, state.artifact_digest);
      return state;
    }
    const job = JSON.parse(await readArtifact(directory, "pending.json"));
    assert.equal(job.format, "gamemap.cloud-publication-intent");
    assert.equal(job.version, 1);
    assert.equal(job.instance, state.instance_id);
    assert.match(job.next, digestPattern);
    assert.ok(job.previous === null || digestPattern.test(job.previous));
    if (state.artifact_digest === job.next) {
      await retained(db, job.next);
      if (adapter?.switchTo)
        await adapter.switchTo({
          digest: job.next,
          instance: state.instance_id,
        });
    } else {
      assert.equal(
        state.artifact_digest,
        job.previous,
        "Cloud publication state changed outside the interrupted operation",
      );
      if (job.previous) {
        const previous = await retained(db, job.previous);
        if (adapter?.deploy) {
          await adapter.deploy({
            artifactDirectory: previous.path,
            evidence: previous.evidence,
            instance: state.instance_id,
            run: "cloud-recovery",
          });
        }
      }
    }
    await unlink(pending);
    await syncDirectory(directory);
    return db.cloudStatus();
  }

  async function promote(
    {
      input,
      artifact,
      expectedArtifact,
      expectedRelease,
      run,
      deploymentEvidence,
    },
    rollback,
  ) {
    assert.ok(
      expectedArtifact === null ||
        (typeof expectedArtifact === "string" &&
          digestPattern.test(expectedArtifact)),
      "Explicit expected artifact (or none) is required",
    );
    assert.ok(
      expectedRelease === null ||
        (typeof expectedRelease === "string" &&
          uuidPattern.test(expectedRelease)),
      "Explicit expected release (or none) is required",
    );
    assert.ok(
      typeof run === "string" && run.trim().length > 0 && run.length <= 200,
      "Provide a bounded pipeline/run label",
    );
    return database.withLock(async (db) => {
      await bind(db);
      const before = await reconcile(db);
      assert.equal(
        before.artifact_digest,
        expectedArtifact,
        "Artifact deployment conflict",
      );
      assert.equal(
        before.release_id,
        expectedRelease,
        "Release deployment conflict",
      );
      let staged;
      if (rollback) {
        staged = await retained(db, artifact);
        assert.equal(
          staged.receipt.published,
          true,
          "Rollback accepts only previously activated retained cloud artifacts",
        );
      } else {
        staged = await stage(db, resolve(input));
      }
      const next = staged.evidence.artifactDigest;
      assert.notEqual(
        next,
        before.artifact_digest,
        "Artifact is already active",
      );
      await durableJSON(pending, {
        format: "gamemap.cloud-publication-intent",
        version: 1,
        instance: before.instance_id,
        id: randomUUID(),
        previous: before.artifact_digest,
        previousRelease: before.release_id,
        next,
      });
      try {
        await checkpoint("before-deploy");
        let evidence = deploymentEvidence;
        if (!evidence) {
          assert.ok(
            adapter,
            "Provide a cloud hosting adapter or verified deployment evidence",
          );
          evidence = await adapter.deploy({
            artifactDirectory: staged.path,
            evidence: staged.evidence,
            instance: before.instance_id,
            run,
          });
        }
        await checkpoint("after-deploy");
        const event = await db.transaction(async (tx) => {
          const id = await tx.activateCloudPublication(
            next,
            expectedArtifact,
            expectedRelease,
            run,
            evidence,
          );
          await checkpoint("before-commit");
          return id;
        });
        await checkpoint("after-commit");
        await unlink(pending);
        await syncDirectory(directory);
        return {
          ...(await db.cloudStatus()),
          event,
          deployment: evidence,
          rollback,
        };
      } catch (error) {
        try {
          await reconcile(db);
        } catch (recovery) {
          throw new AggregateError(
            [error, recovery],
            "Cloud publication interrupted; keep pending.json and run cloud recovery before retrying",
          );
        }
        throw error;
      }
    });
  }

  return {
    claimTarget: () => database.withLock((db) => bind(db)),
    publish: (options) => promote(options, false),
    rollback: (options) => promote(options, true),
    recover: () =>
      database.withLock(async (db) => {
        await bind(db);
        return reconcile(db);
      }),
    status: () =>
      database.withLock(async (db) => {
        const state = await db.cloudStatus();
        assertReleaseRealm(state.realm, realm);
        return {
          ...state,
          pending: Boolean(await exists(pending)),
          retentionDirectory: directory,
          targetDigest,
        };
      }),
  };
}

export async function currentCloudArtifact(directory) {
  const file = join(directory, "current");
  const info = await exists(file);
  if (!info) return null;
  assert.ok(info.isSymbolicLink(), "Current pointer must be a managed symlink");
  const match = /^artifacts\/([a-f0-9]{64})\/site$/.exec(await readlink(file));
  assert.ok(match, "Current pointer escapes its managed artifact store");
  return match[1];
}
