import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { build } from "esbuild";
import {
  assetConfig,
  assetFile,
  writeLegacyAssetAliases,
} from "../scripts/lib/assets.mjs";
import { documentLinkResolver, root } from "../scripts/lib/documents.mjs";
const bundle = await build({
  entryPoints: ["website/content/assets.ts"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
});
const { assetPath, canonicalAssetPath } = await import(
  "data:text/javascript;base64," +
    Buffer.from(bundle.outputFiles[0].text).toString("base64")
);
test("asset references use one canonical, language-independent namespace", () => {
  assert.equal(
    assetPath("media/learning/example.webp"),
    "assets/media/learning/example.webp",
  );
  assert.equal(
    canonicalAssetPath("./assets/logos/example.svg"),
    "assets/logos/example.svg",
  );
  for (const invalid of [
    "media/learning/example.webp",
    "/assets/brand/icon.svg",
    "assets/unknown/icon.svg",
    "assets/media/../secret",
    "assets/media//poster.webp",
    "assets/media/poster.webp?download",
    "assets/media/%2e%2e/secret",
    "assets/media\\poster.webp",
  ])
    assert.throws(() => canonicalAssetPath(invalid), undefined, invalid);
  assert.throws(
    () => assetFile("../private.svg"),
    /outside the canonical root/,
  );
});
test("document source images share the asset namespace and keep deployment subpaths", () => {
  const link = documentLinkResolver([], "/GameMap/");
  assert.equal(
    link("diagram.png", resolve(root, "docs/example.md"), true),
    "/GameMap/assets/docs/diagram.png",
  );
  assert.equal(
    link(
      "../website/public/assets/media/example.webp",
      resolve(root, "docs/example.md"),
      true,
    ),
    "/GameMap/assets/media/example.webp",
  );
});
test("legacy asset aliases are generated from canonical bytes, including license sidecars", async () => {
  const directory = await mkdtemp(resolve(tmpdir(), "gamemap-asset-aliases-"));
  try {
    const files = {
      "brand/favicon.svg": "<svg/>",
      "brand/mark.svg": "<svg>original mark</svg>",
      "logos/project.svg": "<svg>original logo</svg>",
      "icons/NOTICE.txt": "Original license and attribution",
      "media/example.mp4": Buffer.from([0, 1, 2, 3, 255]),
      "docs/nested/diagram.png": Buffer.from([4, 5, 6]),
    };
    for (const [path, bytes] of Object.entries(files)) {
      const file = resolve(directory, assetConfig.prefix, path);
      await mkdir(resolve(file, ".."), { recursive: true });
      await writeFile(file, bytes);
    }
    await writeLegacyAssetAliases(directory);
    for (const [legacy, canonical] of Object.entries(
      assetConfig.legacyAliases,
    )) {
      for (const [path, bytes] of Object.entries(files)) {
        const target = assetConfig.prefix + path;
        if (
          canonical.endsWith("/")
            ? !target.startsWith(canonical)
            : target !== canonical
        )
          continue;
        const alias = resolve(
          directory,
          legacy,
          canonical.endsWith("/") ? target.slice(canonical.length) : "",
        );
        assert.deepEqual(await readFile(alias), Buffer.from(bytes));
      }
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
