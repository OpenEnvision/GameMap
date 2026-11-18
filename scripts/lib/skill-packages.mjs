import { readFile, mkdir, readdir } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { createHash } from "node:crypto";
import { writeIfChanged } from "./files.mjs";
import { zipSync, unzipSync } from "fflate";
import assert from "node:assert/strict";
import {
  root,
  walk,
  slash,
  publicSourcePaths,
  publishablePath,
} from "./documents.mjs";

async function packagesIn(directory, suffix = "") {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  return Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const path = resolve(directory, entry.name);
        const visible = publicSourcePaths();
        const files = (await walk(path)).filter(
          (file) =>
            file.endsWith(".md") &&
            publishablePath(slash(relative(root, file)), visible),
        );
        assert.ok(
          files.includes(resolve(path, "SKILL.md")) &&
            files.includes(resolve(path, "LICENSE.md")),
          `${entry.name}: preserve SKILL.md and LICENSE.md`,
        );
        const contents = Object.fromEntries(
          await Promise.all(
            files.map(async (file) => [
              entry.name + "/" + slash(relative(path, file)),
              new Uint8Array(await readFile(file)),
            ]),
          ),
        );
        return { id: entry.name + suffix, contents };
      }),
  );
}
export async function skillPackages() {
  return [
    ...(await packagesIn(resolve(root, "docs/skills"))),
    ...(await packagesIn(resolve(root, "docs/zh/skills"), ".zh")),
  ];
}
export async function generateSkillPackages() {
  const target = resolve(root, "website/public/skills");
  await mkdir(target, { recursive: true });
  const manifest = [];
  for (const pkg of await skillPackages()) {
    const entries = Object.fromEntries(
      Object.entries(pkg.contents).map(([name, bytes]) => [
        name,
        [bytes, { mtime: new Date("2026-01-01T00:00:00Z") }],
      ]),
    );
    await writeIfChanged(
      resolve(target, pkg.id + ".zip"),
      zipSync(entries, { level: 9 }),
    );
    manifest.push({
      id: pkg.id,
      files: Object.entries(pkg.contents).map(([path, bytes]) => ({
        path,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      })),
    });
  }
  await writeIfChanged(
    resolve(target, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
}
export async function checkSkillPackages(built = false) {
  const packages = await skillPackages();
  for (const pkg of packages) {
    for (const name of Object.keys(pkg.contents))
      assert.ok(
        !name.startsWith("/") && !name.includes(".."),
        "Portable skill archive paths",
      );
    if (built) {
      const files = unzipSync(
        await readFile(resolve(root, "dist/skills", pkg.id + ".zip")),
      );
      assert.deepEqual(
        Object.keys(files).sort(),
        Object.keys(pkg.contents).sort(),
        `${pkg.id}: archive must include every source file`,
      );
      for (const [name, bytes] of Object.entries(pkg.contents))
        assert.deepEqual(
          files[name],
          bytes,
          `${name}: preserve original skill bytes and licensing`,
        );
    }
  }
  return packages.length;
}
