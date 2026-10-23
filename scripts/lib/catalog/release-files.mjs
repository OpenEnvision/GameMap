import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { root } from "../documents.mjs";
import {
  assertPrivateDirectory,
  canonicalJSON,
  readArtifact,
  safePath,
  sha256,
} from "./codec.mjs";
import { readReleaseData, validateSelection } from "./validation.mjs";

/** Verification is source-pinned integrity, not a signature or deployment authorization. */
export async function verifyReleasePackage(
  context,
  pack,
  { sourceFiles, readAsset } = {},
) {
  const data = readReleaseData(context, pack);
  assert.ok(sourceFiles, "The matching source-file inventory is required");
  assert.deepEqual(
    data.build.source_hashes,
    sourceFiles.map((file) => ({ path: file.path, sha256: file.sha256 })),
    "Release compiler sources differ from this checkout; use the matching source revision",
  );
  for (const file of data.build.source_hashes)
    assert.equal(
      sha256(await readArtifact(root, file.path)),
      file.sha256,
      `Source changed: ${file.path}`,
    );
  const result = await validateSelection(
    context,
    data.manifest.entries,
    data.manifest.translations,
    {
      configuration: data.build.configuration,
      readAsset,
      checkDocuments: true,
    },
  );
  const normalize = (rows) =>
    canonicalJSON(
      [...rows].sort((a, b) =>
        canonicalJSON(a).localeCompare(canonicalJSON(b)),
      ),
    );
  for (const key of [
    "entry_terms",
    "links",
    "relations",
    "assets",
    "asset_usages",
    "translations",
  ])
    assert.equal(
      normalize(result.projection[key]),
      normalize(data.manifest[key]),
      `Release projection differs: ${key}`,
    );
  const used = new Set(
    result.projection.entry_terms.map((row) => row.term_key),
  );
  assert.equal(
    normalize(result.projection.terms.filter((row) => used.has(row.key))),
    normalize(data.manifest.terms),
    "Release vocabulary differs",
  );
  return {
    records: data.manifest.entries.length,
    files: data.manifest.assets.length,
    release: pack.id,
    digest: pack.manifest_digest,
  };
}
export async function writeReleasePackage(
  context,
  pack,
  directory,
  { sourceFiles, readAsset },
) {
  await assertPrivateDirectory(root, directory);
  const report = await verifyReleasePackage(context, pack, {
    sourceFiles,
    readAsset,
  });
  await mkdir(resolve(directory, ".."), { recursive: true });
  await mkdir(directory); // Never overwrite a previously frozen package.
  for (const asset of JSON.parse(pack.manifest_text).assets) {
    const bytes = await readAsset(asset.path);
    assert.equal(
      sha256(bytes),
      asset.sha256,
      `Release asset changed during export: ${asset.path}`,
    );
    const file = safePath(join(directory, "files"), asset.path);
    await mkdir(resolve(file, ".."), { recursive: true });
    await writeFile(file, bytes, { flag: "wx" });
  }
  await writeFile(
    join(directory, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
    { flag: "wx" },
  );
  // The package becomes readable only once every referenced file has been copied.
  await writeFile(
    join(directory, "release.json"),
    JSON.stringify(pack, null, 2) + "\n",
    { flag: "wx" },
  );
  return report;
}
export async function verifyReleaseDirectory(context, directory, sourceFiles) {
  const pack = JSON.parse(
    await readFile(join(directory, "release.json"), "utf8"),
  );
  return verifyReleasePackage(context, pack, {
    sourceFiles,
    readAsset: (path) => readArtifact(join(directory, "files"), path),
  });
}
