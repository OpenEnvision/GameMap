import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { mkdir, writeFile, rm, mkdtemp, symlink } from "node:fs/promises";
import { resolve, dirname, join, relative } from "node:path";
import { tmpdir } from "node:os";
import { createServer } from "node:net";
import { root, walk } from "../documents.mjs";
import {
  assertPrivateDirectory,
  canonicalJSON,
  readArtifact,
  safePath,
  sha256,
} from "./codec.mjs";
import { verifyReleasePackage } from "./release-files.mjs";
import { materializeSiteInput, isDevelopmentRelease } from "./site-input.mjs";
import { siteDownloads } from "./site-files.mjs";
import {
  frozenReleaseRealm,
  parseReleaseRealm,
  assertReleaseRealm,
} from "./release-realm.mjs";

const facade = `import input from '../.content/release-input.json';
import type { ContentSources } from './git-sources.server';
import type { TranslationCatalogs } from './localization.server';
export const sources = input.sources as unknown as ContentSources;
export const catalogs = input.catalogs as TranslationCatalogs;
export type { ContentSources } from './git-sources.server';\n`;

export function releaseBuildEnvironment(directory, digest, base) {
  const allowed = [
    "PATH",
    "HOME",
    "TMPDIR",
    "TMP",
    "TEMP",
    "SystemRoot",
    "LANG",
    "LC_ALL",
    "TZ",
    "CI",
    "PLAYWRIGHT_BROWSERS_PATH",
  ];
  const env = Object.fromEntries(
    allowed
      .filter((key) => process.env[key] !== undefined)
      .map((key) => [key, process.env[key]]),
  );
  return {
    ...env,
    NODE_ENV: "production",
    PAGES_BASE_PATH: base,
    CATALOG_SITE_INPUT: join(directory, "website/.content/release-input.json"),
    CATALOG_SITE_DIGEST: digest,
  };
}

export function assertReleaseParity(context, pack) {
  const records = JSON.parse(pack.manifest_text).entries;
  const selected = new Map(records.map((row) => [row.key, row]));
  for (const entry of context.registry.entries) {
    const record = selected.get(entry.key);
    assert.ok(
      record,
      `Release drops an existing address: ${entry.key}; withdrawals need an explicit migration policy`,
    );
    assert.equal(
      record.canonical_path,
      entry.url,
      `Release changes an existing address: ${entry.key}`,
    );
    assert.equal(
      record.collection_path,
      entry.collectionUrl,
      `Release changes an owning collection: ${entry.key}`,
    );
  }
}

async function copyCheckout(directory) {
  const files = execFileSync(
    "git",
    ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
    { cwd: root, encoding: "utf8" },
  )
    .split("\0")
    .filter(Boolean);
  const deleted = new Set(
    execFileSync("git", ["ls-files", "-z", "--deleted"], {
      cwd: root,
      encoding: "utf8",
    })
      .split("\0")
      .filter(Boolean),
  );
  const allowed = (file) =>
    /^(?:scripts|website|data|docs|tests)\//.test(file) ||
    /^(?:package(?:-lock)?\.json|(?:react-router|playwright(?:\.release)?|vite)\.config\.ts|tsconfig\.json|README\.md|CONTRIBUTING\.md|AWESOME\.md)$/.test(
      file,
    );
  for (const file of files.filter(
    (file) => allowed(file) && !deleted.has(file),
  )) {
    if (
      file
        .split("/")
        .some((part) => part.startsWith(".") && part !== ".nojekyll")
    )
      continue;
    if (/^website\/public\/(?:docs-assets|skills)\//.test(file)) continue;
    const target = safePath(directory, file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, await readArtifact(root, file), { flag: "wx" });
  }
  await symlink(
    resolve(root, "node_modules"),
    join(directory, "node_modules"),
    "dir",
  );
}

/** Only call after verifying the private package against the original checkout. */
export async function prepareReleaseWorkspace(
  context,
  pack,
  packageDirectory,
  directory,
  { development = false } = {},
) {
  assertReleaseParity(context, pack);
  await copyCheckout(directory);
  const input = materializeSiteInput(context, pack);
  input.source.development ||= development;
  const build = JSON.parse(pack.context_text),
    manifest = JSON.parse(pack.manifest_text);
  for (const asset of manifest.assets) {
    const bytes = await readArtifact(
      join(packageDirectory, "files"),
      asset.path,
    );
    assert.equal(
      sha256(bytes),
      asset.sha256,
      `Release media changed: ${asset.path}`,
    );
    const target = safePath(directory, asset.path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, bytes);
  }
  // Frozen prose and regenerated views must be exactly the reviewed bytes, not current Git defaults.
  for (const document of input.documents) {
    const target = safePath(directory, document.source);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, build.document_bodies[document.source]);
  }
  const data = canonicalJSON(input);
  await mkdir(join(directory, "website/.content"), { recursive: true });
  await writeFile(join(directory, "website/.content/release-input.json"), data);
  await writeFile(join(directory, "website/content/source-data.ts"), facade);
  const outputs = await siteDownloads(input, build.document_bodies, directory);
  for (const [path, bytes] of Object.entries(outputs)) {
    const target = safePath(join(directory, "website/public"), path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, bytes);
  }
  return { input, digest: sha256(data) };
}

async function runNode(directory, environment, log, args) {
  await new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: directory,
      env: environment,
      stdio: ["ignore", log, log],
    });
    child.once("error", reject);
    child.once("exit", (code, signal) =>
      code === 0
        ? resolvePromise()
        : reject(
            new Error(
              `Release build gate failed (${code ?? signal}): ${args.join(" ")}`,
            ),
          ),
    );
  });
}

export async function buildReleaseSite(
  context,
  pack,
  packageDirectory,
  output,
  {
    sourceFiles,
    base = "/",
    development = false,
    browser = false,
    realm: expectedRealm,
  } = {},
) {
  const realm = assertReleaseRealm(
    frozenReleaseRealm(
      JSON.parse(pack.manifest_text),
      JSON.parse(pack.context_text),
    ),
    expectedRealm,
  );
  assert.equal(
    development,
    realm.environment === "local",
    "Local builds require --development; non-local realms cannot be relabeled as development",
  );
  await assertPrivateDirectory(root, output);
  await verifyReleasePackage(context, pack, {
    sourceFiles,
    readAsset: (path) => readArtifact(join(packageDirectory, "files"), path),
  });
  const build = JSON.parse(pack.context_text);
  const head = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  const dirty = execFileSync(
    "git",
    ["status", "--porcelain=v1", "--untracked-files=all"],
    { cwd: root, encoding: "utf8" },
  ).trim();
  if (!development) {
    assert.ok(
      !isDevelopmentRelease(build) && !dirty,
      "Non-local artifacts require a realm-bound release and clean committed source; local acceptance releases always require --development",
    );
    assert.equal(
      head,
      build.git_commit,
      "Non-local build must use the exact frozen Git commit",
    );
    assert.ok(browser, "Non-local artifacts require browser gates (--browser)");
  }
  await mkdir(dirname(output), { recursive: true });
  await mkdir(output, { mode: 0o700 });
  const workspace = await mkdtemp(join(tmpdir(), "gamemap-release-build-"));
  const { open } = await import("node:fs/promises");
  const log = await open(join(output, "build.log"), "wx", 0o600);
  try {
    const materialized = await prepareReleaseWorkspace(
      context,
      pack,
      packageDirectory,
      workspace,
      { development },
    );
    const env = releaseBuildEnvironment(workspace, materialized.digest, base);
    if (browser) {
      const reservation = createServer();
      await new Promise((resolve, reject) => {
        reservation.once("error", reject);
        reservation.listen(0, "127.0.0.1", resolve);
      });
      env.CATALOG_PREVIEW_PORT = String(reservation.address().port);
      await new Promise((resolve, reject) =>
        reservation.close((error) => (error ? reject(error) : resolve())),
      );
    }
    const gates = [
      [
        "--input-type=module",
        "-e",
        "import {generateSkillPackages} from './scripts/lib/skill-packages.mjs';await generateSkillPackages();",
      ],
      ["scripts/build/prepare-docs.mjs"],
      ["node_modules/@react-router/dev/bin.js", "typegen"],
      ["node_modules/typescript/bin/tsc", "-b"],
      ["node_modules/@react-router/dev/bin.js", "build"],
      ["scripts/build/finalize.mjs"],
      ["scripts/check/web.mjs"],
      ["scripts/check/content.mjs", "--built"],
      ["scripts/check/locales.mjs", "--built"],
    ];
    if (browser)
      gates.push([
        "node_modules/@playwright/test/cli.js",
        "test",
        "--config",
        "playwright.release.config.ts",
      ]);
    for (const args of gates) await runNode(workspace, env, log.fd, args);
    const files = [];
    for (const file of await walk(join(workspace, "dist"))) {
      const path = relative(join(workspace, "dist"), file)
        .split("\\")
        .join("/");
      const bytes = await readArtifact(join(workspace, "dist"), path);
      const target = safePath(join(output, "site"), path);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, bytes, { flag: "wx" });
      files.push({ path, bytes: bytes.length, sha256: sha256(bytes) });
    }
    const evidence = {
      format: "gamemap.site-artifact",
      version: 2,
      ...materialized.input.source,
      browserChecked: browser,
      checkoutCommit: head,
      inputDigest: materialized.digest,
      files,
      artifactDigest: sha256(canonicalJSON(files)),
      records: materialized.input.records.length,
      commands: gates,
      activated: false,
    };
    // Completion marker is written last. Logs or partial files are not a deployable artifact.
    await writeFile(
      join(output, "evidence.json"),
      JSON.stringify(evidence, null, 2) + "\n",
      { flag: "wx", mode: 0o600 },
    );
    return evidence;
  } finally {
    await log.close();
    await rm(workspace, { recursive: true, force: true });
  }
}

export async function verifySiteArtifact(directory) {
  const evidence = JSON.parse(await readArtifact(directory, "evidence.json"));
  assert.equal(evidence.format, "gamemap.site-artifact");
  assert.ok([1, 2].includes(evidence.version), "Unsupported artifact version");
  if (evidence.version === 2) {
    const realm = parseReleaseRealm(evidence.realm);
    assert.equal(
      evidence.development,
      realm.environment === "local",
      "Artifact environment/development mismatch",
    );
  } else
    assert.equal(
      evidence.realm,
      undefined,
      "Legacy artifacts cannot be relabeled with a realm",
    );
  assert.equal(
    sha256(canonicalJSON(evidence.files)),
    evidence.artifactDigest,
    "Artifact manifest changed",
  );
  const site = JSON.parse(
    await readArtifact(join(directory, "site"), "site-manifest.json"),
  );
  for (const key of [
    "mode",
    "release",
    "manifestDigest",
    "contextDigest",
    "gitCommit",
    "development",
    "realm",
  ])
    assert.deepEqual(
      site.source?.[key],
      evidence[key],
      `Artifact release identity changed: ${key}`,
    );
  const actual = (await walk(join(directory, "site")))
    .map((path) =>
      relative(join(directory, "site"), path).split("\\").join("/"),
    )
    .sort();
  assert.deepEqual(
    actual,
    evidence.files.map((row) => row.path).sort(),
    "Artifact inventory changed",
  );
  for (const file of evidence.files) {
    const bytes = await readArtifact(join(directory, "site"), file.path);
    assert.equal(
      bytes.length,
      file.bytes,
      `Artifact size changed: ${file.path}`,
    );
    assert.equal(
      sha256(bytes),
      file.sha256,
      `Artifact file changed: ${file.path}`,
    );
  }
  return evidence;
}
