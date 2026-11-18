import test from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { canonicalJSON, sha256 } from "../../scripts/lib/catalog/codec.mjs";
import { verifySiteArtifact } from "../../scripts/lib/catalog/site-build.mjs";
const command = promisify(execFile);

test("a catalog capture refuses a changed HTML/inventory with an unchanged pinned artifact digest", async () => {
  const directory = await mkdtemp(tmpdir() + "/gamemap-cover-artifact-test-");
  try {
    const artifact = directory + "/artifact";
    await mkdir(artifact + "/site/examples/test-project", { recursive: true });
    const identity = {
      mode: "release",
      release: "938e7e4a-5959-4f48-819d-f5b446d0ea00",
      manifestDigest: "a".repeat(64),
      contextDigest: "b".repeat(64),
      gitCommit: "c".repeat(40),
      development: true,
      realm: {
        format: "gamemap.release-realm",
        version: 1,
        environment: "local",
        project: "local:gamemap",
        instance: "0bca55c9-d199-4d78-b4e1-cfd89b26620f",
        target: "local-preview",
      },
    };
    const bodies = {
      "examples/test-project/index.html":
        '<html><body><article data-content-key="example:test-project"><h1>Test Project</h1>Original record</article></body></html>',
      "site-manifest.json": JSON.stringify({ source: identity }),
    };
    for (const [path, body] of Object.entries(bodies))
      await writeFile(artifact + "/site/" + path, body);
    const evidence = {
      format: "gamemap.site-artifact",
      version: 2,
      ...identity,
      files: Object.entries(bodies)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([path, body]) => ({
          path,
          bytes: Buffer.byteLength(body),
          sha256: sha256(body),
        })),
    };
    evidence.artifactDigest = sha256(canonicalJSON(evidence.files));
    await writeFile(artifact + "/evidence.json", JSON.stringify(evidence));
    await verifySiteArtifact(artifact);
    const changed = bodies["examples/test-project/index.html"].replace(
      "Original record",
      "Altered record",
    );
    await writeFile(
      artifact + "/site/examples/test-project/index.html",
      changed,
    );
    Object.assign(
      evidence.files.find(
        (file) => file.path === "examples/test-project/index.html",
      ),
      { bytes: Buffer.byteLength(changed), sha256: sha256(changed) },
    );
    await writeFile(artifact + "/evidence.json", JSON.stringify(evidence));
    await assert.rejects(
      verifySiteArtifact(artifact),
      /Artifact manifest changed/,
    );
    const input = directory + "/input.json";
    await writeFile(
      input,
      JSON.stringify({
        format: "gamemap.catalog-page-cover-jobs",
        userApprovedCatalogFallback: true,
        artifactDirectory: artifact,
        baselineRelease: identity.release,
        baselineArtifact: evidence.artifactDigest,
        jobs: [],
      }),
    );
    await assert.rejects(
      command(
        process.execPath,
        [
          resolve("scripts/media/capture-page-covers.mjs"),
          "--input",
          input,
          "--out",
          directory,
        ],
        { cwd: directory },
      ),
      (error) =>
        error.code === 1 && /Artifact manifest changed/.test(error.stderr),
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
