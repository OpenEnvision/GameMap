import { readFile, cp, stat, readdir } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
export const assetConfig = JSON.parse(
  await readFile(
    new URL("../../website/assets.config.json", import.meta.url),
    "utf8",
  ),
);
export const publicRoot = fileURLToPath(
  new URL("../../website/public/", import.meta.url),
);
export const assetRoot = resolve(publicRoot, assetConfig.prefix);
export const publicAssetPath = (relative) => assetConfig.prefix + relative;
export function assetFile(relative) {
  const path = resolve(publicRoot, relative);
  if (!path.startsWith(assetRoot + sep))
    throw new Error(`Asset is outside the canonical root: ${relative}`);
  return path;
}
export async function assetFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  return (
    await Promise.all(
      entries
        .filter((entry) => !entry.name.startsWith("."))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((entry) =>
          entry.isDirectory()
            ? assetFiles(resolve(directory, entry.name))
            : [resolve(directory, entry.name)],
        ),
    )
  ).flat();
}
export async function writeLegacyAssetAliases(directory) {
  for (const [legacy, canonical] of Object.entries(assetConfig.legacyAliases)) {
    if (
      legacy.startsWith(assetConfig.prefix) ||
      !canonical.startsWith(assetConfig.prefix) ||
      [legacy, canonical].some(
        (path) =>
          path.startsWith("/") ||
          path.includes("\\") ||
          path.split("/").some((part) => part === ".." || part === "."),
      )
    )
      throw new Error(`Unsafe asset alias: ${legacy}`);
    const source = resolve(directory, canonical);
    try {
      await stat(source);
    } catch (error) {
      if (error.code === "ENOENT" && canonical.endsWith("/docs/")) continue;
      throw error;
    }
    await cp(source, resolve(directory, legacy), { recursive: true });
  }
}
