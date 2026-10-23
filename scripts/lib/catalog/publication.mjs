import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
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
} from "node:fs/promises";
import { resolve, join, dirname } from "node:path";
import { root as repository } from "../documents.mjs";
import {
  assertPrivateDirectory,
  readArtifact,
  safePath,
  sha256,
} from "./codec.mjs";
import { verifySiteArtifact } from "./site-build.mjs";
import { parseReleaseRealm, assertReleaseRealm } from "./release-realm.mjs";
const digestPattern = /^[a-f0-9]{64}$/;
const uuidPattern =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
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
export async function currentArtifact(directory) {
  const file = join(directory, "current"),
    info = await exists(file);
  if (!info) return null;
  assert.ok(
    info.isSymbolicLink(),
    "Publication current must be a managed symlink, not a directory",
  );
  const match = /^artifacts\/([a-f0-9]{64})\/site$/.exec(await readlink(file));
  assert.ok(match, "Publication pointer escapes its managed artifact store");
  return match[1];
}
export async function visibleArtifact(directory) {
  if (!(await exists(join(directory, "published.json")))) return null;
  const pointer = JSON.parse(await readArtifact(directory, "published.json"));
  const marker = JSON.parse(await readArtifact(directory, "target.json"));
  assert.equal(pointer.format, "gamemap.published-pointer");
  assert.equal(pointer.version, 1);
  assert.equal(pointer.instance, marker.instance);
  assert.ok(
    pointer.artifact === null || digestPattern.test(pointer.artifact),
    "Invalid committed publication pointer",
  );
  return pointer.artifact;
}
async function switchArtifact(directory, digest) {
  await currentArtifact(directory);
  if (digest === null) {
    await unlink(join(directory, "current")).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
  } else {
    assert.match(digest, digestPattern);
    const temporary = join(directory, ".current-" + randomUUID());
    await symlink(`artifacts/${digest}/site`, temporary);
    await rename(temporary, join(directory, "current"));
  }
  await syncDirectory(directory);
}

/** Local-only promotion. The editor server has neither this credential nor this API. */
export function createLocalPublisher({
  database,
  directory,
  realm: expectedRealm,
  target,
  checkpoint = async () => {},
}) {
  const realm = parseReleaseRealm(expectedRealm);
  assert.equal(
    realm.environment,
    "local",
    "The local publisher cannot accept staging or production realms",
  );
  target ??= realm.target;
  assert.equal(
    target,
    realm.target,
    "Publication target differs from the expected release realm",
  );
  directory = resolve(directory);
  const marker = join(directory, "target.json"),
    pending = join(directory, "pending.json");
  const artifactDirectory = (digest) => {
    assert.match(digest, digestPattern);
    return join(directory, "artifacts", digest);
  };
  async function bind(db) {
    const state = await db.status();
    assertReleaseRealm(state.realm, realm);
    await assertPrivateDirectory(repository, directory);
    await mkdir(dirname(directory), { recursive: true, mode: 0o700 });
    await mkdir(directory, { mode: 0o700 }).catch((error) => {
      if (error.code !== "EEXIST") throw error;
    });
    const info = await lstat(directory);
    assert.ok(
      info.isDirectory() && !info.isSymbolicLink(),
      "Publication root must be a real private directory",
    );
    const location = sha256(await realpath(directory));
    if (await exists(marker)) {
      const saved = JSON.parse(await readArtifact(directory, "target.json"));
      assert.equal(saved.format, "gamemap.local-publication");
      assert.equal(saved.instance, state.instance_id);
      assert.equal(saved.rootDigest, location);
      assert.equal(saved.target, target);
    } else
      assert.deepEqual(
        await readdir(directory),
        [],
        "Refuse to adopt a nonempty unmarked publication directory",
      );
    await db.claim(target, location);
    if (!(await exists(marker)))
      await durableJSON(marker, {
        format: "gamemap.local-publication",
        version: 1,
        instance: state.instance_id,
        rootDigest: location,
        target,
      });
    await mkdir(join(directory, "artifacts"), { mode: 0o700 }).catch(
      (error) => {
        if (error.code !== "EEXIST") throw error;
      },
    );
    assert.ok(
      !(await lstat(join(directory, "artifacts"))).isSymbolicLink(),
      "Artifact store cannot be a symlink",
    );
  }
  async function retained(db, digest) {
    const receipt = await db.artifact(digest);
    assert.ok(receipt, "Unknown artifact receipt");
    const path = artifactDirectory(digest);
    assert.ok(
      !(await lstat(path)).isSymbolicLink() &&
        !(await lstat(join(path, "site"))).isSymbolicLink(),
      "Retained artifact and site must not be symlinks",
    );
    const evidence = await verifySiteArtifact(path);
    assert.equal(evidence.artifactDigest, digest);
    if (evidence.version === 2) assertReleaseRealm(evidence.realm, realm);
    else
      assert.ok(
        receipt.legacy_local_rollback === true &&
          receipt.published === true &&
          evidence.development === true,
        "Legacy artifacts require their original pre-migration local activation history",
      );
    assert.equal(
      (await readArtifact(path, "evidence.json")).toString(),
      receipt.evidence_text,
      "Retained artifact evidence changed",
    );
    return { path, receipt, evidence };
  }
  async function reconcile(db, restoreDelivery = false) {
    const state = await db.status(),
      onDisk = await currentArtifact(directory),
      visible = await visibleArtifact(directory);
    if (!(await exists(pending))) {
      assert.equal(
        onDisk,
        state.artifact_digest,
        "Files and database disagree without a recovery journal; stop for operator investigation",
      );
      if (
        restoreDelivery &&
        visible === null &&
        state.artifact_digest &&
        !(await exists(join(directory, "published.json")))
      ) {
        await retained(db, state.artifact_digest);
        await durableJSON(join(directory, "published.json"), {
          format: "gamemap.published-pointer",
          version: 1,
          instance: state.instance_id,
          artifact: state.artifact_digest,
        });
        return state;
      }
      assert.equal(
        visible,
        state.artifact_digest,
        "Committed delivery pointer differs without a journal; stop for investigation",
      );
      if (onDisk) await retained(db, onDisk);
      return state;
    }
    const job = JSON.parse(await readArtifact(directory, "pending.json"));
    assert.equal(job.format, "gamemap.publication-intent");
    assert.equal(job.version, 1);
    assert.equal(job.instance, state.instance_id);
    assert.match(job.next, digestPattern);
    assert.ok(job.previous === null || digestPattern.test(job.previous));
    assert.ok(
      [job.previous, job.next].includes(visible),
      "Unexpected committed delivery pointer",
    );
    assert.ok(
      [job.previous, job.next].includes(onDisk),
      "Unexpected file pointer; refusing to overwrite an unrelated deployment",
    );
    if (state.artifact_digest === job.next) {
      const next = await retained(db, job.next);
      assert.equal(
        state.release_id,
        next.evidence.release,
        "Committed database release changed outside the publisher",
      );
    } else {
      assert.equal(
        state.artifact_digest,
        job.previous,
        "Publication changed outside the interrupted operation",
      );
      assert.equal(
        state.release_id,
        job.previousRelease,
        "Release changed outside the interrupted operation",
      );
      if (job.previous) await retained(db, job.previous);
    }
    await switchArtifact(directory, state.artifact_digest);
    await durableJSON(join(directory, "published.json"), {
      format: "gamemap.published-pointer",
      version: 1,
      instance: state.instance_id,
      artifact: state.artifact_digest,
    });
    await unlink(pending);
    await syncDirectory(directory);
    return state;
  }
  async function stage(db, input) {
    const text = (await readArtifact(input, "evidence.json")).toString();
    const evidence = await verifySiteArtifact(input);
    assert.equal(
      evidence.version,
      2,
      "Unbound legacy artifacts cannot be newly published",
    );
    assertReleaseRealm(evidence.realm, realm);
    assert.deepEqual(
      JSON.parse(text),
      evidence,
      "Artifact evidence changed while reading",
    );
    assert.equal(
      evidence.development,
      true,
      "Only explicitly local/development artifacts may enter the local publisher",
    );
    assert.equal(
      evidence.browserChecked,
      true,
      "Browser gates are required before local publication",
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
          const path = safePath(join(temporary, "site"), file.path);
          await mkdir(dirname(path), { recursive: true, mode: 0o700 });
          const output = await open(path, "wx", 0o600);
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
    await db.register(text);
    await retained(db, evidence.artifactDigest);
    return evidence.artifactDigest;
  }
  async function promote(
    { input, artifact, expectedArtifact, expectedRelease, run },
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
      "Provide a bounded local pipeline/run label",
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
      let next;
      if (rollback) {
        const previous = await retained(db, artifact);
        assert.equal(
          previous.receipt.published,
          true,
          "Rollback accepts only previously activated retained artifacts",
        );
        next = artifact;
      } else next = await stage(db, resolve(input));
      assert.notEqual(
        next,
        before.artifact_digest,
        "Artifact is already active",
      );
      await durableJSON(pending, {
        format: "gamemap.publication-intent",
        version: 1,
        instance: before.instance_id,
        id: randomUUID(),
        previous: before.artifact_digest,
        previousRelease: before.release_id,
        next,
      });
      try {
        await checkpoint("before-switch");
        await switchArtifact(directory, next);
        await checkpoint("after-switch");
        assert.equal(
          await currentArtifact(directory),
          next,
          "Publication file switch was not applied",
        );
        await retained(db, next);
        const event = await db.transaction(async (tx) => {
          const event = await tx.activate(
            next,
            expectedArtifact,
            expectedRelease,
            run,
          );
          await checkpoint("before-commit");
          return event;
        });
        await checkpoint("after-commit");
        await durableJSON(join(directory, "published.json"), {
          format: "gamemap.published-pointer",
          version: 1,
          instance: before.instance_id,
          artifact: next,
        });
        await unlink(pending);
        await syncDirectory(directory);
        return { ...(await db.status()), event, rollback };
      } catch (error) {
        try {
          await reconcile(db);
        } catch (recovery) {
          throw new AggregateError(
            [error, recovery],
            "Publication interrupted; keep the journal and run local publication recovery before retrying",
          );
        }
        throw error;
      }
    });
  }
  return {
    publish: (options) => promote(options, false),
    rollback: (options) => promote(options, true),
    recover: () =>
      database.withLock(async (db) => {
        await bind(db);
        return reconcile(db, true);
      }),
    status: () =>
      database.withLock(async (db) => {
        const state = await db.status();
        assertReleaseRealm(state.realm, realm);
        return {
          ...state,
          onDisk: await currentArtifact(directory),
          visible: await visibleArtifact(directory),
          pending: Boolean(await exists(pending)),
        };
      }),
  };
}
