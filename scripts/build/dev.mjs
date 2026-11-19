import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { root } from "../lib/documents.mjs";
const args = process.argv.slice(2),
  hashes = new Map();
const generatedDocs = new Set([
  "docs/reference/logo-sources.md",
  "docs/tutorials-and-demos.md",
  "docs/coding-agent-game-code.md",
  "docs/reference/testing-library.md",
  "docs/cadle-repositories.md",
]);
const relevant = (path) =>
  path &&
  !path.split("/").some((part) => part.startsWith(".")) &&
  !generatedDocs.has(path) &&
  path !== "website/src/data/resources.json" &&
  (/^(?:docs\/|data\/segments\/|website\/src\/data\/|website\/content\/)/.test(
    path,
  ) ||
    /^[^/]+\.md$/.test(path) ||
    path === "website/docs.config.json");
export const run = (script) =>
  new Promise((done, fail) => {
    const child = spawn(process.execPath, [script], {
      cwd: root,
      stdio: "inherit",
    });
    child.on("error", fail);
    child.on("exit", (code) =>
      code === 0 ? done() : fail(new Error(`${script} exited ${code}`)),
    );
  });
async function prepare() {
  await run("scripts/build/generate.mjs");
  await run("scripts/build/prepare-docs.mjs");
}
await prepare();
let timer,
  running = false,
  queued = false;
async function refresh() {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  try {
    await prepare();
    console.log("[content] source documents and data refreshed");
  } catch (error) {
    console.error(
      "[content] Preparation failed; fix the source and save again:",
      error.message,
    );
  } finally {
    running = false;
    if (queued) {
      queued = false;
      clearTimeout(timer);
      timer = setTimeout(refresh, 250);
    }
  }
}
const onChange = async (path) => {
  if (!relevant(path?.replaceAll("\\", "/"))) return;
  const full = resolve(root, path);
  let hash = "deleted";
  try {
    if (!(await stat(full)).isFile()) return;
    hash = createHash("sha256")
      .update(await readFile(full))
      .digest("hex");
  } catch (error) {
    if (error.code !== "ENOENT") return;
  }
  if (hashes.get(path) === hash) return;
  hashes.set(path, hash);
  clearTimeout(timer);
  timer = setTimeout(refresh, 250);
};
const watches = [
  "docs",
  "data/segments",
  "website/src/data",
  "website/content",
].map((directory) =>
  watch(resolve(root, directory), { recursive: true }, (event, path) =>
    onChange(directory + "/" + path),
  ),
);
watches.push(
  watch(root, (event, path) => onChange(path)),
  watch(resolve(root, "website"), (event, path) => onChange("website/" + path)),
);
const vite = spawn(
  process.execPath,
  [
    resolve(root, "node_modules/@react-router/dev/bin.js"),
    "dev",
    "--host",
    "127.0.0.1",
    ...args,
  ],
  {
    cwd: root,
    stdio: "inherit",
    // Accounts, ratings and comments for the working catalog, when the operator
    // provisioned the development community (scripts/platform/community.mjs --dev).
    env: existsSync(resolve(root, ".build/catalog-local/community-dev.json"))
      ? { ...process.env, VITE_GAMEMAP_COMMUNITY: "1" }
      : process.env,
  },
);
function stop(signal) {
  watches.forEach((watcher) => watcher.close());
  clearTimeout(timer);
  vite.kill(signal);
}
process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));
vite.on("exit", (code) => {
  watches.forEach((watcher) => watcher.close());
  clearTimeout(timer);
  process.exitCode = code || 0;
});
