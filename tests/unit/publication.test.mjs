import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  symlink,
  unlink,
} from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { studioFixture, accounts } from "../helpers/studio-fixture.mjs";
import {
  createLocalPublisher,
  currentArtifact,
} from "../../scripts/lib/catalog/publication.mjs";
import { publicationQueries } from "../../scripts/lib/catalog/publication-database.mjs";
import { createPublicationServer } from "../../scripts/lib/catalog/publication-server.mjs";
import { sha256, canonicalJSON } from "../../scripts/lib/catalog/codec.mjs";
let fixture, directory, publication, database, a, b, c, server;
async function fixtureArtifact(label) {
  const frozen = await fixture.worker.freeze(accounts.reviewer.id);
  const pack = await fixture.worker.exportRelease(
    accounts.reviewer.id,
    frozen.id,
  );
  const source = {
    mode: "release",
    release: pack.id,
    manifestDigest: pack.manifest_digest,
    contextDigest: pack.context_digest,
    gitCommit: JSON.parse(pack.context_text).git_commit,
    realm: fixture.realm,
    development: true,
  };
  const path = join(directory, label);
  await mkdir(join(path, "site"), { recursive: true });
  const bytes = {
    "index.html": `<h1>Local fixture ${label}</h1>`,
    "404.html": "Not found",
    "site-manifest.json": JSON.stringify({ base: "/GameMap/", source }),
  };
  const files = [];
  for (const [name, data] of Object.entries(bytes)) {
    await writeFile(join(path, "site", name), data);
    files.push({
      path: name,
      bytes: Buffer.byteLength(data),
      sha256: sha256(data),
    });
  }
  const evidence = {
    format: "gamemap.site-artifact",
    version: 2,
    ...source,
    browserChecked: true,
    files,
    artifactDigest: sha256(canonicalJSON(files)),
    records: 541,
    activated: false,
  };
  await writeFile(join(path, "evidence.json"), JSON.stringify(evidence));
  return { path, evidence };
}
const options = async (input) => {
  const state = await publication.status();
  return {
    input: input.path,
    expectedArtifact: state.artifact_digest,
    expectedRelease: state.release_id,
    run: "unit-local-fixture",
  };
};
before(async () => {
  fixture = await studioFixture();
  directory = await mkdtemp(join(tmpdir(), "gamemap-publication-"));
  let locked = false;
  database = {
    withLock: async (run) => {
      assert.ok(!locked, "Another publication operation");
      locked = true;
      await fixture.pg.exec("set role catalog_deployer");
      const ops = publicationQueries((text, values) =>
        fixture.pg.query(text, values),
      );
      try {
        return await run({
          ...ops,
          transaction: async (action) => {
            await fixture.pg.exec("begin");
            try {
              const value = await action(ops);
              await fixture.pg.exec("commit");
              return value;
            } catch (error) {
              await fixture.pg.exec("rollback");
              throw error;
            }
          },
        });
      } finally {
        await fixture.pg.exec("reset role");
        locked = false;
      }
    },
  };
  publication = createLocalPublisher({
    database,
    realm: fixture.realm,
    directory: join(directory, "published"),
  });
  a = await fixtureArtifact("A");
  b = await fixtureArtifact("B");
  c = await fixtureArtifact("C");
});
after(async () => {
  if (server) {
    server.closeAllConnections();
    await new Promise((done) => server.close(done));
  }
  await fixture?.close();
  await rm(directory, { recursive: true, force: true });
});
test("publication authority is not an editor, validator, membership provisioner or raw activator", async () => {
  for (const role of ["catalog_backend", "authenticated", "anon"]) {
    await fixture.pg.exec("begin; set local role " + role);
    try {
      await assert.rejects(
        fixture.pg.query("select catalog.claim_publication_target($1,$2)", [
          "bad",
          "a".repeat(64),
        ]),
        /permission denied/,
      );
    } finally {
      await fixture.pg.exec("rollback");
    }
  }
  await fixture.pg.exec("begin; set local role catalog_deployer");
  try {
    await assert.rejects(
      fixture.pg.query("select * from catalog.studio_sessions"),
      /permission denied/,
    );
  } finally {
    await fixture.pg.exec("rollback");
  }
  await fixture.pg.exec("begin; set local role catalog_deployer");
  try {
    await assert.rejects(
      fixture.pg.query(
        "select catalog.activate_release_unchecked($1,null,$2)",
        [a.evidence.release, "bypass"],
      ),
      /permission denied/,
    );
  } finally {
    await fixture.pg.exec("rollback");
  }
});
test("verified artifact copy and database activation form one journaled local publication", async () => {
  const result = await publication.publish(await options(a));
  assert.equal(result.artifact_digest, a.evidence.artifactDigest);
  assert.equal(result.release_id, a.evidence.release);
  assert.equal(
    await currentArtifact(join(directory, "published")),
    a.evidence.artifactDigest,
  );
  assert.equal((await publication.status()).pending, false);
  await fixture.pg.exec("begin; set local role service_role");
  try {
    await assert.rejects(
      fixture.pg.query("select catalog.activate_release($1,$2,$3)", [
        b.evidence.release,
        a.evidence.release,
        "old-path",
      ]),
      /artifact-bound publisher/,
    );
  } finally {
    await fixture.pg.exec("rollback");
  }
});
test("stale artifact/release expectations and mismatched or unreviewed build receipts cannot replace a site", async () => {
  await assert.rejects(
    publication.publish({ ...(await options(b)), expectedArtifact: null }),
    /conflict/,
  );
  await assert.rejects(
    publication.publish({ ...(await options(b)), expectedRelease: null }),
    /conflict/,
  );
  const evidenceFile = join(b.path, "evidence.json"),
    original = await readFile(evidenceFile);
  for (const patch of [
    { browserChecked: false },
    { development: false },
    { contextDigest: "0".repeat(64) },
  ]) {
    await writeFile(evidenceFile, JSON.stringify({ ...b.evidence, ...patch }));
    await assert.rejects(
      publication.publish(await options(b)),
      /Browser|local\/development|release identity|environment\/development/,
    );
  }
  await writeFile(evidenceFile, original);
  assert.equal(
    (await publication.status()).artifact_digest,
    a.evidence.artifactDigest,
  );
});
test("failures after file switch and before SQL commit restore the old exact artifact", async () => {
  for (const phase of ["before-switch", "after-switch", "before-commit"]) {
    const failing = createLocalPublisher({
      database,
      realm: fixture.realm,
      directory: join(directory, "published"),
      checkpoint: async (point) => {
        if (point === phase) throw Error("Simulated " + phase);
      },
    });
    await assert.rejects(failing.publish(await options(b)), /Simulated/);
    assert.equal(
      await currentArtifact(join(directory, "published")),
      a.evidence.artifactDigest,
    );
    assert.equal(
      (await publication.status()).artifact_digest,
      a.evidence.artifactDigest,
    );
    assert.equal((await publication.status()).pending, false);
  }
});
test("a lost acknowledgement after COMMIT keeps the committed deployment instead of undoing it", async () => {
  const failing = createLocalPublisher({
    database,
    realm: fixture.realm,
    directory: join(directory, "published"),
    checkpoint: async (point) => {
      if (point === "after-commit") throw Error("Lost acknowledgement");
    },
  });
  await assert.rejects(
    failing.publish(await options(b)),
    /Lost acknowledgement/,
  );
  assert.equal(
    (await publication.status()).artifact_digest,
    b.evidence.artifactDigest,
  );
  assert.equal(
    await currentArtifact(join(directory, "published")),
    b.evidence.artifactDigest,
  );
});
test("rollback requires a formerly activated retained artifact and restores both files and release", async () => {
  await assert.rejects(
    publication.rollback({
      ...(await options(c)),
      artifact: c.evidence.artifactDigest,
    }),
    /Unknown artifact|ENOENT/,
  );
  const state = await publication.status();
  const result = await publication.rollback({
    artifact: a.evidence.artifactDigest,
    expectedArtifact: state.artifact_digest,
    expectedRelease: state.release_id,
    run: "unit-rollback",
  });
  assert.equal(result.release_id, a.evidence.release);
  assert.equal(result.artifact_digest, a.evidence.artifactDigest);
  assert.equal(
    (
      await readFile(join(directory, "published", "current", "index.html"))
    ).toString(),
    "<h1>Local fixture A</h1>",
  );
});
test("a crash journal recovers from the committed database state, not a guessed filesystem state", async () => {
  const state = await publication.status(),
    root = join(directory, "published");
  await writeFile(
    join(root, "pending.json"),
    JSON.stringify({
      format: "gamemap.publication-intent",
      version: 1,
      instance: state.instance_id,
      previous: a.evidence.artifactDigest,
      previousRelease: a.evidence.release,
      next: b.evidence.artifactDigest,
    }),
  );
  await unlink(join(root, "current"));
  await symlink(
    `artifacts/${b.evidence.artifactDigest}/site`,
    join(root, "current"),
  );
  const result = await publication.recover();
  assert.equal(result.artifact_digest, a.evidence.artifactDigest);
  assert.equal(await currentArtifact(root), a.evidence.artifactDigest);
});
test("explicit recovery can reconstruct a missing delivery pointer only from matching committed state and verified bytes", async () => {
  await unlink(join(directory, "published", "published.json"));
  await assert.rejects(
    publication.publish(await options(b)),
    /Committed delivery pointer differs/,
  );
  await publication.recover();
  assert.equal((await publication.status()).visible, a.evidence.artifactDigest);
});

test("foreign roots, altered rollback files and unsafe pointers fail closed", async () => {
  const other = createLocalPublisher({
    database,
    realm: fixture.realm,
    directory: join(directory, "other"),
  });
  await assert.rejects(other.publish(await options(c)), /already bound/);
  const file = join(
      directory,
      "published",
      "artifacts",
      b.evidence.artifactDigest,
      "site",
      "index.html",
    ),
    bytes = await readFile(file);
  await writeFile(file, "tampered");
  try {
    const state = await publication.status();
    await assert.rejects(
      publication.rollback({
        artifact: b.evidence.artifactDigest,
        expectedArtifact: state.artifact_digest,
        expectedRelease: state.release_id,
        run: "bad-rollback",
      }),
      /Artifact size|Artifact file/,
    );
  } finally {
    await writeFile(file, bytes);
  }
  assert.equal(
    (await publication.status()).artifact_digest,
    a.evidence.artifactDigest,
  );
});
test("anonymous preview exposes only the current static site; operator state and mutation endpoints stay private", async () => {
  server = createPublicationServer(join(directory, "published"));
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(origin + "/GameMap/");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /fixture A/);
  assert.equal(
    response.headers.get("x-gamemap-artifact"),
    a.evidence.artifactDigest,
  );
  for (const path of [
    "/target.json",
    "/pending.json",
    "/GameMap/../evidence.json",
    "/GameMap/.env",
    "/artifacts/" + b.evidence.artifactDigest + "/site/",
  ])
    assert.equal((await fetch(origin + path)).status, 404);
  assert.equal(
    (await fetch(origin + "/GameMap/", { method: "POST" })).status,
    405,
  );
});
