import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseEnv } from "node:util";
import { chromium } from "@playwright/test";
import { root } from "../../scripts/lib/documents.mjs";
import { loadContentRuntime } from "../../scripts/lib/content.mjs";
import { connectDatabase } from "../../scripts/lib/catalog/database.mjs";
import {
  assertLoopback,
  readLocalRealm,
  localDirectory,
} from "../../scripts/lib/catalog/local-runtime.mjs";
import { readWorkingCatalog } from "../../scripts/lib/catalog/development.mjs";

// Read-only acceptance against the operator's local catalog; no fixture rows are inserted.
const config = parseEnv(await readFile(join(root, ".env"), "utf8"));
assertLoopback(config.CATALOG_DATABASE_URL, ["postgres:", "postgresql:"]);
const database = connectDatabase(config.CATALOG_DATABASE_URL);
const realm = await readLocalRealm();
const directory = join(localDirectory, "development");
await mkdir(directory, { recursive: true });
const reservation = createServer();
await new Promise((done) => reservation.listen(0, "127.0.0.1", done));
const port = reservation.address().port;
await new Promise((done) => reservation.close(done));
const origin = `http://127.0.0.1:${port}`;
const base = "/GameMap/";
let log = "",
  browser;
const child = spawn(
  process.execPath,
  ["scripts/build/dev.mjs", "--port", String(port), "--strictPort"],
  {
    cwd: root,
    env: { ...process.env, PAGES_BASE_PATH: base },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
child.stdout.on("data", (bytes) => {
  log += bytes;
});
child.stderr.on("data", (bytes) => {
  log += bytes;
});
const exited = new Promise((done) => child.once("exit", (code) => done(code)));
const address = (path) => origin + base + path.replace(/^\//, "");
async function json(path) {
  const response = await fetch(address(path), {
    signal: AbortSignal.timeout(120000),
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response.json();
}
try {
  const current = await readWorkingCatalog(database, realm);
  const deadline = Date.now() + 120000;
  let ready = false;
  while (Date.now() < deadline) {
    if (child.exitCode !== null)
      throw new Error(`Development server exited: ${log.slice(-8000)}`);
    try {
      const response = await fetch(address("resources.json"), {
        signal: AbortSignal.timeout(2000),
      });
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((done) => setTimeout(done, 500));
  }
  assert.ok(ready, `Development server did not start: ${log.slice(-8000)}`);
  const input = JSON.parse(
    await readFile(
      join(root, "website/.content/development-input.json"),
      "utf8",
    ),
  );
  assert.equal(input.source.mode, "database");
  assert.deepEqual(input.records, current.records);
  const keys = new Map(
    current.records.map((row) => [row.revision_id, row.key]),
  );
  for (const row of current.translations) {
    const key = keys.get(row.revision_id);
    assert.deepEqual(
      input.catalogs[row.locale].content[key][row.field],
      row.value,
    );
    assert.equal(
      input.catalogs[row.locale].fingerprints[key][row.field],
      row.source_hash,
    );
  }
  assert.equal(
    Object.values(input.catalogs).reduce(
      (total, catalog) =>
        total +
        Object.values(catalog.content).reduce(
          (sum, fields) => sum + Object.keys(fields).length,
          0,
        ),
      0,
    ),
    current.translations.length,
  );
  const resources = await json("resources.json");
  assert.deepEqual(resources, input.sources.resources);
  const runtime = await loadContentRuntime();
  const registry = runtime.createRegistry(input.sources, input.documents);
  const searchCounts = {};
  for (const locale of ["", "zh/"]) {
    const selected = locale
      ? runtime.localizedRegistry(registry, "zh", input.catalogs)
      : registry;
    const expected = selected.entries
      .filter((row) => !["path", "step"].includes(row.kind))
      .map((row) => row.key)
      .sort();
    const search = await json(`${locale}search-index.json`);
    searchCounts[locale ? "zh" : "en"] = search.documents.length;
    assert.equal(
      search.documents.length,
      expected.length,
      `${locale}search must contain every selected public record`,
    );
    assert.deepEqual(search.documents.map((row) => row.key).sort(), expected);
  }
  browser = await chromium.launch({
    headless: true,
    channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || undefined,
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const visited = [];
  for (const kind of [
    "resource",
    "paper",
    "threejs-game",
    "example",
    "testing",
    "repository-research",
  ]) {
    const candidates = current.records.filter((row) => row.kind === kind);
    const row =
      candidates.find((row) => row.state === "draft") ?? candidates[0];
    if (!row) continue;
    const entry = registry.byKey(row.key);
    const response = await page.goto(address(entry.url), {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    assert.equal(response.status(), 200, entry.url);
    await page
      .getByRole("heading", { level: 1, name: entry.title, exact: true })
      .waitFor({ timeout: 30000 });
    visited.push({ key: entry.key, url: entry.url });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(address("examples/"), { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { level: 1 }).waitFor();
  const localized = runtime.localizedRegistry(registry, "zh", input.catalogs);
  for (const slug of input.fallbackDocuments ?? []) {
    const original = registry.byKey(`document:${slug.slice(3)}`);
    const response = await page.goto(address(`zh/docs/${slug.slice(3)}/`), {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    assert.equal(response.status(), 200, `/zh/docs/${slug.slice(3)}/`);
    await page
      .locator("h1")
      .filter({ hasText: localized.byKey(original.key).title })
      .waitFor({ timeout: 30000 });
    await page.getByText("英文原文", { exact: true }).first().waitFor();
    visited.push({ key: original.key, url: `/zh/docs/${slug.slice(3)}/` });
  }
  assert.deepEqual(errors, []);
  const upload = input.publicPaths.find((path) =>
    path.startsWith("media/catalog/"),
  );
  if (upload) {
    const response = await fetch(address(upload));
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /image\/webp/);
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
  const report = {
    structuredRecords: current.records.length,
    documents: input.documents.length,
    searchRecordsPerLocale: searchCounts,
    visited,
    upload: upload ?? null,
    databaseWrites: false,
  };
  await writeFile(
    join(directory, "acceptance.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser?.close();
  child.kill("SIGTERM");
  await exited;
  await database.close();
  await writeFile(join(directory, "acceptance.log"), log);
}
