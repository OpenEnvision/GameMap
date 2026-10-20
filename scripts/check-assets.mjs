import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { createHash } from "node:crypto";
import {
  assetConfig,
  assetFiles,
  assetRoot,
  publicRoot,
} from "./lib/assets.mjs";
const built = process.argv.includes("--built");
const digest = async (file) =>
  createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
const sources = await assetFiles(assetRoot);
assert.ok(sources.length, "Canonical asset root must not be empty");
for (const file of await assetFiles(publicRoot)) {
  const path = relative(publicRoot, file).split("\\").join("/");
  if (
    /\.(?:png|jpe?g|svg|gif|webp|avif|ico|mp4|webm|mov|mp3|wav|ogg|woff2?|ttf|otf)$/i.test(
      path,
    )
  )
    assert.ok(
      path.startsWith(assetConfig.prefix),
      `Static source belongs under ${assetConfig.prefix}: ${path}`,
    );
  if (path.startsWith(assetConfig.prefix))
    assert.ok(
      assetConfig.groups.includes(
        path.slice(assetConfig.prefix.length).split("/")[0],
      ),
      `Unregistered asset group: ${path}`,
    );
}
for (const legacy of Object.keys(assetConfig.legacyAliases).filter((path) =>
  path.endsWith("/"),
)) {
  try {
    await stat(resolve(publicRoot, legacy));
    assert.fail(
      `Old asset directory must not remain in public source: ${legacy}`,
    );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
assert.equal(
  await digest(resolve(assetRoot, "brand/favicon.svg")),
  await digest(resolve(assetRoot, "brand/gamemap-mark.svg")),
  "Generate favicon from the canonical brand mark",
);
let aliases = 0;
if (built) {
  for (const file of sources) {
    const path = relative(publicRoot, file);
    assert.equal(
      await digest(resolve("dist", path)),
      await digest(file),
      `Stale or missing built asset: ${path}`,
    );
  }
  for (const [legacy, canonical] of Object.entries(assetConfig.legacyAliases)) {
    const target = resolve("dist", canonical),
      files = canonical.endsWith("/") ? await assetFiles(target) : [target];
    for (const file of files) {
      const alias = canonical.endsWith("/")
        ? resolve("dist", legacy, relative(target, file))
        : resolve("dist", legacy);
      assert.equal(
        await digest(alias),
        await digest(file),
        `Legacy asset URL no longer preserves original bytes: ${relative(resolve("dist"), alias)}`,
      );
      aliases++;
    }
  }
}
console.log(
  `Asset layout checks passed: ${sources.length} files under ${assetConfig.prefix}${built ? `, ${aliases} byte-identical legacy URLs` : ""}.`,
);
