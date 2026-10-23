// Explicit opt-in real PostgreSQL + filesystem + process-crash publication acceptance.
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { localPublisher } from "../scripts/local-publication.mjs";
import { localDirectory } from "../scripts/lib/catalog/local-runtime.mjs";
import { createLocalPublisher } from "../scripts/lib/catalog/publication.mjs";
import { createPublicationServer } from "../scripts/lib/catalog/publication-server.mjs";
import { loadContent } from "../scripts/lib/content.mjs";
import { createImportBundle } from "../scripts/lib/platform.mjs";
import {
  buildReleaseSite,
  verifySiteArtifact,
} from "../scripts/lib/catalog/site-build.mjs";
import { sha256 } from "../scripts/lib/catalog/codec.mjs";
process.env.NODE_ENV = "test";
const { publisher, database, directory, realm } = await localPublisher();
const initialPublication = await publisher.status();
const historicalReceipt = initialPublication.artifact_digest
  ? await database.withLock((db) =>
      db.artifact(initialPublication.artifact_digest),
    )
  : null;
const report = [];
const check = async (name, run) => {
  await run();
  report.push({ name, passed: true });
  console.log("PASS", name);
};
const beforeDist = await readFile("dist/site-manifest.json")
  .then(sha256)
  .catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
const sourceReport = JSON.parse(
  await readFile(join(localDirectory, "integration-report.json"), "utf8"),
);
const selected = sourceReport.tests.find(
  (row) => row.name === "private release package",
);
assert.ok(selected, "Run test:local first");
const context = await loadContent(),
  baseline = await createImportBundle(context);
const pack = JSON.parse(
  await readFile(join(selected.path, "release.json"), "utf8"),
);
const fixtureRoot = join(localDirectory, "publication-fixtures", randomUUID());
await mkdir(fixtureRoot, { recursive: true, mode: 0o700 });
const artifacts = [];
for (const [name, base] of [
  ["A", "/RollbackProbe/"],
  ["B", "/GameMap/"],
]) {
  const path = join(fixtureRoot, name);
  await buildReleaseSite(context, pack, selected.path, path, {
    sourceFiles: baseline.snapshot.source_files,
    realm,
    base,
    development: true,
    browser: true,
  });
  const evidence = await verifySiteArtifact(path);
  artifacts.push({ path, evidence, base });
}
const [a, b] = artifacts;
assert.equal(a.evidence.release, b.evidence.release);
assert.notEqual(
  a.evidence.artifactDigest,
  b.evidence.artifactDigest,
  "Different deployment bases must be different artifacts even for the same release",
);
const options = async (artifact) => {
  const state = await publisher.status();
  return {
    input: artifact.path,
    expectedArtifact: state.artifact_digest,
    expectedRelease: state.release_id,
    run: "local-publication-acceptance",
  };
};
let server;
try {
  await check(
    "real publisher rejects foreign realm expectations and SQL receipts before activation",
    async () => {
      for (const patch of [
        { project: "wrong-project" },
        { instance: randomUUID() },
        { target: "wrong-target" },
      ]) {
        const wrong = createLocalPublisher({
          database,
          directory,
          realm: { ...realm, ...patch },
        });
        await assert.rejects(wrong.status(), /realm mismatch/);
      }
      for (const environment of ["staging", "production"])
        await assert.rejects(
          database.withLock((db) =>
            db.register(
              JSON.stringify({
                ...a.evidence,
                realm: { ...realm, environment },
              }),
            ),
          ),
          /realm mismatch/,
        );
      assert.equal(
        (await publisher.status()).artifact_digest,
        initialPublication.artifact_digest,
      );
    },
  );
  await check(
    "verified local publication uses a separate role and preserves the default website",
    async () => {
      const result = await publisher.publish(await options(a));
      assert.equal(result.artifact_digest, a.evidence.artifactDigest);
      assert.equal(result.release_id, a.evidence.release);
      assert.equal(result.pending, undefined);
      const state = await publisher.status();
      assert.equal(state.onDisk, state.artifact_digest);
      assert.equal(state.pending, false);
    },
  );
  await check(
    "anonymous preview serves only the current static snapshot and no operator files",
    async () => {
      server = createPublicationServer(directory);
      await new Promise((done) => server.listen(0, "127.0.0.1", done));
      const origin = `http://127.0.0.1:${server.address().port}`;
      const page = await fetch(origin + a.base);
      assert.equal(page.status, 200);
      assert.equal(
        page.headers.get("x-gamemap-artifact"),
        a.evidence.artifactDigest,
      );
      assert.match(await page.text(), /<html/);
      for (const path of [
        "/target.json",
        "/pending.json",
        a.base + ".env",
        a.base + "evidence.json",
        "/artifacts/" + a.evidence.artifactDigest + "/evidence.json",
      ])
        assert.equal((await fetch(origin + path)).status, 404);
      assert.equal(
        (await fetch(origin + a.base, { method: "POST" })).status,
        405,
      );
    },
  );
  for (const phase of ["after-switch", "before-commit"])
    await check(
      "process death at " +
        phase +
        " restores the previous artifact and release",
      async () => {
        const selection = await options(b);
        const child = spawnSync(
          process.execPath,
          [
            "tests/helpers/publication-crash.mjs",
            b.path,
            selection.expectedArtifact || "none",
            selection.expectedRelease || "none",
            phase,
          ],
          { cwd: resolve("."), encoding: "utf8" },
        );
        assert.equal(
          child.status,
          73,
          "Fault child did not reach the intended checkpoint",
        );
        assert.equal((await publisher.status()).pending, true);
        const origin = `http://127.0.0.1:${server.address().port}`;
        assert.equal(
          (await fetch(origin + a.base)).headers.get("x-gamemap-artifact"),
          a.evidence.artifactDigest,
          "Readers must stay on the committed old snapshot after a pre-commit crash",
        );
        const recovered = await publisher.recover();
        assert.equal(recovered.artifact_digest, a.evidence.artifactDigest);
        assert.equal(recovered.release_id, a.evidence.release);
        assert.equal(
          (await publisher.status()).onDisk,
          a.evidence.artifactDigest,
        );
      },
    );
  await check(
    "simultaneous operators cannot interleave filesystem switches",
    async () => {
      let reached, release;
      const ready = new Promise((done) => {
          reached = done;
        }),
        resume = new Promise((done) => {
          release = done;
        });
      const blocked = createLocalPublisher({
        database,
        directory,
        realm,
        checkpoint: async (point) => {
          if (point === "after-switch") {
            reached();
            await resume;
          }
        },
      });
      const selection = await options(b),
        first = blocked.publish(selection);
      await Promise.race([
        ready,
        first.then(() => {
          throw new Error(
            "Publication did not reach its concurrency checkpoint",
          );
        }),
      ]);
      let second;
      try {
        const origin = `http://127.0.0.1:${server.address().port}`;
        assert.equal(
          (await fetch(origin + a.base)).headers.get("x-gamemap-artifact"),
          a.evidence.artifactDigest,
        );
        second = await localPublisher();
        await assert.rejects(
          second.publisher.publish(selection),
          /Another publication operation/,
        );
      } finally {
        release();
        await second?.database.close();
      }
      const result = await first;
      assert.equal(result.artifact_digest, b.evidence.artifactDigest);
    },
  );
  if (historicalReceipt?.legacy_local_rollback)
    await check(
      "pre-upgrade activated local history rolls back with unchanged evidence bytes",
      async () => {
        const state = await publisher.status();
        const result = await publisher.rollback({
          artifact: initialPublication.artifact_digest,
          expectedArtifact: state.artifact_digest,
          expectedRelease: state.release_id,
          run: "legacy-local-upgrade-rollback",
        });
        assert.equal(
          result.artifact_digest,
          initialPublication.artifact_digest,
        );
        assert.equal(
          await readFile(
            join(
              directory,
              "artifacts",
              initialPublication.artifact_digest,
              "evidence.json",
            ),
            "utf8",
          ),
          historicalReceipt.evidence_text,
        );
        await assert.rejects(
          publisher.publish({
            input: join(
              directory,
              "artifacts",
              initialPublication.artifact_digest,
            ),
            expectedArtifact: result.artifact_digest,
            expectedRelease: result.release_id,
            run: "legacy-new-publication-denied",
          }),
          /legacy artifacts cannot be newly published/,
        );
        await publisher.rollback({
          artifact: b.evidence.artifactDigest,
          expectedArtifact: result.artifact_digest,
          expectedRelease: result.release_id,
          run: "restore-bound-acceptance-artifact",
        });
      },
    );
  await check(
    "artifact CAS rejects stale commands even when both builds use the same release UUID",
    async () => {
      await assert.rejects(
        publisher.publish({
          input: a.path,
          expectedArtifact: a.evidence.artifactDigest,
          expectedRelease: a.evidence.release,
          run: "stale-artifact-command",
        }),
        /conflict/,
      );
      const state = await publisher.status();
      assert.equal(state.artifact_digest, b.evidence.artifactDigest);
    },
  );
  await check(
    "rollback restores exact retained bytes without rebuilding against current source",
    async () => {
      const state = await publisher.status();
      const result = await publisher.rollback({
        artifact: a.evidence.artifactDigest,
        expectedArtifact: state.artifact_digest,
        expectedRelease: state.release_id,
        run: "local-exact-artifact-rollback",
      });
      assert.equal(result.artifact_digest, a.evidence.artifactDigest);
      const origin = `http://127.0.0.1:${server.address().port}`;
      assert.equal(
        (await fetch(origin + a.base)).headers.get("x-gamemap-artifact"),
        a.evidence.artifactDigest,
      );
    },
  );
  await check(
    "death after COMMIT is reconciled forward, not falsely rolled back",
    async () => {
      const selection = await options(b);
      const child = spawnSync(
        process.execPath,
        [
          "tests/helpers/publication-crash.mjs",
          b.path,
          selection.expectedArtifact,
          selection.expectedRelease,
          "after-commit",
        ],
        { cwd: resolve("."), encoding: "utf8" },
      );
      assert.equal(child.status, 73);
      assert.equal((await publisher.status()).pending, true);
      const result = await publisher.recover();
      assert.equal(result.artifact_digest, b.evidence.artifactDigest);
      assert.equal(
        (await publisher.status()).onDisk,
        b.evidence.artifactDigest,
      );
      assert.equal((await publisher.status()).pending, false);
      const origin = `http://127.0.0.1:${server.address().port}`;
      assert.equal((await fetch(origin + b.base)).status, 200);
    },
  );
  const afterDist = await readFile("dist/site-manifest.json")
    .then(sha256)
    .catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return null;
    });
  assert.equal(
    afterDist,
    beforeDist,
    "Local promotion must not change default dist/",
  );
  await writeFile(
    join(localDirectory, "publication-report.json"),
    JSON.stringify(
      {
        format: "gamemap.local-publication-acceptance",
        version: 1,
        realDatabase: true,
        development: true,
        artifacts,
        tests: report,
        current: await publisher.status(),
        productionTouched: false,
        defaultWebsiteChanged: false,
      },
      null,
      2,
    ) + "\n",
    { mode: 0o600 },
  );
  console.log(
    `Local publication acceptance passed: ${report.length} checks. No remote deployment or default-site cutover.`,
  );
} finally {
  if (server) {
    server.closeAllConnections();
    await new Promise((done) => server.close(done));
  }
  await database.close();
}
