import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { root } from "../lib/documents.mjs";
import { generateSkillPackages } from "../lib/skill-packages.mjs";
import { websiteEnvironment } from "../lib/website-environment.mjs";

const args = process.argv.slice(2);
const environment = {
  ...websiteEnvironment(),
  NODE_ENV: "development",
  PAGES_BASE_PATH: process.env.PAGES_BASE_PATH || "",
};

const run = (script) =>
  new Promise((done, fail) => {
    const child = spawn(process.execPath, [script], {
      cwd: root,
      env: environment,
      stdio: "inherit",
    });
    child.once("error", fail);
    child.once("exit", (code) =>
      code === 0 ? done() : fail(new Error(`${script} exited ${code}`)),
    );
  });

async function main() {
  const watches = [];
  let timer,
    vite,
    stopped = false;
  try {
    async function prepare() {
      await run("scripts/build/generate.mjs");
      await run("scripts/build/prepare-docs.mjs");
      console.log("[content] Website data and documents refreshed.");
    }
    await generateSkillPackages();
    await prepare();
    let running = false,
      queued = false;
    async function refresh() {
      if (stopped) return;
      if (running) {
        queued = true;
        return;
      }
      running = true;
      try {
        await prepare();
      } catch (error) {
        console.error(
          "[content] Refresh failed; the last prepared input remains active:",
          error.message,
        );
      } finally {
        running = false;
        if (queued) {
          queued = false;
          void refresh();
        }
      }
    }
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
      (/^(?:docs\/|website\/content\/|data\/segments\/|website\/src\/data\/)/.test(
        path,
      ) ||
        /^[^/]+\.md$/.test(path) ||
        path === "website/docs.config.json");
    const contents = new Map();
    const onChange = async (path) => {
      if (!relevant(path?.replaceAll("\\", "/"))) return;
      let bytes = null;
      try {
        const full = resolve(root, path);
        if (!(await stat(full)).isFile()) return;
        bytes = await readFile(full);
      } catch (error) {
        if (error.code !== "ENOENT") return;
      }
      if (
        contents.has(path) &&
        (bytes === null
          ? contents.get(path) === null
          : contents.get(path)?.equals(bytes))
      )
        return;
      contents.set(path, bytes);
      clearTimeout(timer);
      timer = setTimeout(() => void refresh(), 250);
    };
    for (const directory of [
      "docs",
      "website/content",
      "data/segments",
      "website/src/data",
    ])
      watches.push(
        watch(resolve(root, directory), { recursive: true }, (_event, path) => {
          void onChange(directory + "/" + path);
        }),
      );
    watches.push(
      watch(root, (_event, path) => void onChange(path)),
      watch(
        resolve(root, "website"),
        (_event, path) => void onChange("website/" + path),
      ),
    );
    vite = spawn(
      process.execPath,
      [
        resolve(root, "node_modules/@react-router/dev/bin.js"),
        "dev",
        "--host",
        "127.0.0.1",
        ...args,
      ],
      { cwd: root, stdio: "inherit", env: environment },
    );
    const stop = (signal) => {
      stopped = true;
      clearTimeout(timer);
      vite.kill(signal);
    };
    process.once("SIGINT", () => stop("SIGINT"));
    process.once("SIGTERM", () => stop("SIGTERM"));
    process.exitCode = await new Promise((done, fail) => {
      vite.once("error", fail);
      vite.once("exit", (code) => done(code || 0));
    });
  } finally {
    stopped = true;
    clearTimeout(timer);
    watches.forEach((watcher) => watcher.close());
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
