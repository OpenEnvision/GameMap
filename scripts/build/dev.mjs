import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { isDeepStrictEqual, parseEnv } from "node:util";
import { resolve } from "node:path";
import { root } from "../lib/documents.mjs";
import { loadContentRuntime } from "../lib/content.mjs";
import { generateSkillPackages } from "../lib/skill-packages.mjs";
import { websiteEnvironment } from "../lib/website-environment.mjs";
import { connectDatabase } from "../lib/catalog/database.mjs";
import { createMediaStore } from "../lib/catalog/media.mjs";
import {
  assertLoopback,
  readLocalStatus,
} from "../lib/catalog/local-runtime.mjs";
import { readReleaseRealmFile } from "../lib/catalog/release-realm.mjs";
import {
  readWorkingCatalog,
  createWorkingInput,
  stageWorkingInput,
} from "../lib/catalog/development.mjs";
import { developmentInputPath } from "../lib/catalog/site-input.mjs";

const args = process.argv.slice(2);
const git = args[0] === "--git";
if (git) args.shift();
const environment = {
  ...websiteEnvironment(),
  NODE_ENV: "development",
  PAGES_BASE_PATH: process.env.PAGES_BASE_PATH || "",
  ...(!git ? { CATALOG_DEVELOPMENT_INPUT: developmentInputPath } : {}),
  ...(existsSync(resolve(root, ".build/catalog-local/community-dev.json"))
    ? { VITE_GAMEMAP_COMMUNITY: "1" }
    : {}),
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
  let database, media, realm, runtime, previous;
  const watches = [];
  let timer,
    poll,
    vite,
    stopped = false;
  try {
    if (!git) {
      let config;
      try {
        config = parseEnv(await readFile(resolve(root, ".env"), "utf8"));
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        throw new Error(
          "Set up the local database with npm run local:start and npm run local:setup. Use npm run dev:git for the Git-only website.",
        );
      }
      const url = assertLoopback(config.CATALOG_DATABASE_URL, [
        "postgres:",
        "postgresql:",
      ]);
      const status = await readLocalStatus();
      assert.equal(
        url.host,
        new URL(status.DB_URL).host,
        "Use this checkout's local database",
      );
      assert.equal(
        url.pathname,
        new URL(status.DB_URL).pathname,
        "Use this checkout's local database",
      );
      realm = await readReleaseRealmFile(config.CATALOG_RELEASE_REALM_FILE);
      assert.equal(
        realm.environment,
        "local",
        "Working previews require a local catalog",
      );
      database = connectDatabase(config.CATALOG_DATABASE_URL);
      media = createMediaStore(config.CATALOG_MEDIA_ROOT);
    }
    async function prepare(force = false) {
      if (git) {
        await run("scripts/build/generate.mjs");
      } else {
        const data = await readWorkingCatalog(database, realm);
        if (!force && isDeepStrictEqual(previous, data)) return;
        if (!runtime || force)
          runtime = await loadContentRuntime(environment.PAGES_BASE_PATH);
        const input = await createWorkingInput(runtime, data);
        await stageWorkingInput(input, (path) => media.readAsset(path));
        await run("scripts/build/prepare-docs.mjs");
        if (input.fallbackDocuments.length)
          console.log(
            `[content] ${input.fallbackDocuments.length} generated-guide translations use the current English source.`,
          );
        previous = data;
        console.log(
          `[content] Database working copy: ${data.records.length} structured records; drafts are local previews, not publications.`,
        );
        return;
      }
      await run("scripts/build/prepare-docs.mjs");
      console.log(
        "[content] Git website data refreshed; database content is not included.",
      );
    }
    await generateSkillPackages();
    await prepare(true);
    let running = false,
      queued = false,
      forceQueued = false;
    async function refresh(force = false) {
      if (stopped) return;
      if (running) {
        queued = true;
        forceQueued ||= force;
        return;
      }
      running = true;
      try {
        await prepare(force);
      } catch (error) {
        console.error(
          "[content] Refresh failed; the last prepared input remains active:",
          error.message,
        );
      } finally {
        running = false;
        if (queued) {
          const force = forceQueued;
          queued = forceQueued = false;
          void refresh(force);
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
      (/^(?:docs\/|website\/content\/)/.test(path) ||
        (git && /^(?:data\/segments\/|website\/src\/data\/)/.test(path)) ||
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
      timer = setTimeout(() => void refresh(true), 250);
    };
    for (const directory of [
      "docs",
      "website/content",
      ...(git ? ["data/segments", "website/src/data"] : []),
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
    if (!git) poll = setInterval(() => void refresh(), 2000);
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
      clearInterval(poll);
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
    clearInterval(poll);
    watches.forEach((watcher) => watcher.close());
    await database?.close();
  }
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
