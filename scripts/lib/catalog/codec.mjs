import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, lstat, realpath } from "node:fs/promises";
import { resolve, relative, isAbsolute, dirname } from "node:path";

export const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
export const json = (value) => JSON.parse(JSON.stringify(value));
export const canonicalJSON = (value) =>
  JSON.stringify(value, (_key, child) =>
    child && typeof child === "object" && !Array.isArray(child)
      ? Object.fromEntries(
          Object.entries(child).sort(([a], [b]) => compare(a, b)),
        )
      : child,
  );
export const canonicalValue = (value) => JSON.parse(canonicalJSON(value));
export const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");
export const digest = (value) => sha256(canonicalJSON(value));
export const sorted = (rows, key) =>
  rows.sort((a, b) => compare(key(a), key(b)));

/** RFC 9562 version 8, deterministic SHA-256-derived import identity. */
export function contentUUID(value) {
  const chars = sha256(value).slice(0, 32).split("");
  chars[12] = "8";
  chars[16] = ((parseInt(chars[16], 16) & 3) | 8).toString(16);
  const hex = chars.join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function walkValues(value, visit, path = "") {
  if (Array.isArray(value))
    value.forEach((child, index) =>
      walkValues(child, visit, `${path}[${index}]`),
    );
  else if (value && typeof value === "object")
    for (const [key, child] of Object.entries(value))
      walkValues(child, visit, path ? `${path}.${key}` : key);
  else visit(value, path);
}

export async function assertPrivateDirectory(root, directory) {
  const repo = await realpath(root);
  const guard = (base, destination) => {
    const local = relative(base, destination).replaceAll("\\", "/");
    const outside = local.startsWith("../") || isAbsolute(local);
    if (!outside && local !== ".build" && !local.startsWith(".build/"))
      throw new Error(
        "Choose a private output directory under .build/ or outside the repository, not a source or public directory",
      );
  };
  guard(root, directory);
  let ancestor = dirname(directory),
    actual;
  while (!actual) {
    try {
      actual = await realpath(ancestor);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      ancestor = dirname(ancestor);
    }
  }
  guard(repo, resolve(actual, relative(ancestor, directory)));
}

/** Relative POSIX paths only. Packages must never read/write outside their root. */
export function safePath(base, path) {
  assert.equal(typeof path, "string", "Artifact path must be a string");
  assert.ok(
    path && !path.includes("\\") && !path.includes("\0") && !isAbsolute(path),
    `Unsafe artifact path: ${path}`,
  );
  assert.ok(
    !path.split("/").some((part) => ["", ".", ".."].includes(part)),
    `Unsafe artifact path: ${path}`,
  );
  const file = resolve(base, path);
  const local = relative(resolve(base), file);
  assert.ok(
    local !== ".." && !local.startsWith("../") && !isAbsolute(local),
    `Unsafe artifact path: ${path}`,
  );
  return file;
}

export async function readArtifact(base, path) {
  const file = safePath(base, path);
  assert.ok(
    !(await lstat(file)).isSymbolicLink(),
    `Symlink artifact is not portable: ${path}`,
  );
  const inside = relative(await realpath(base), await realpath(file));
  assert.ok(
    inside &&
      inside !== ".." &&
      !inside.startsWith("../") &&
      !isAbsolute(inside),
    `Artifact escapes its root: ${path}`,
  );
  return readFile(file);
}
