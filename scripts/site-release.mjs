#!/usr/bin/env node
import assert from "node:assert/strict";
import { resolve, join } from "node:path";
import { readFile } from "node:fs/promises";
import { loadContent, normalizeBase } from "./lib/content.mjs";
import { createImportBundle } from "./lib/platform.mjs";
import { readReleaseRealmFile } from "./lib/catalog/release-realm.mjs";
import {
  buildReleaseSite,
  verifySiteArtifact,
} from "./lib/catalog/site-build.mjs";

const help = `Private snapshot site builds (never upload or activate)
  npm run site:build -- --input .build/releases/reviewed --out .build/site-artifacts/reviewed --realm OPERATOR_REALM_FILE --base /GameMap/ --browser
  npm run site:build -- --input PACKAGE --out OUTPUT --realm .build/catalog-local/realm.json --development
  npm run site:verify -- --input OUTPUT

Staging/production builds require a matching independently provisioned realm, clean exact
frozen source and browser gates. Never use a realm file supplied by an untrusted release sender.
Development artifacts are local-only. Legacy releases are read-only. Outputs never replace dist/.
`;
async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || args.includes("--help")) return console.log(help);
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const key = args[index];
    assert.ok(
      [
        "--input",
        "--out",
        "--base",
        "--realm",
        "--development",
        "--browser",
      ].includes(key) && !Object.hasOwn(options, key),
      help,
    );
    options[key] = ["--development", "--browser"].includes(key)
      ? true
      : args[++index];
    assert.ok(options[key] && !String(options[key]).startsWith("--"), help);
  }
  assert.ok(options["--input"], help);
  if (command === "verify") {
    assert.equal(Object.keys(options).length, 1, help);
    const evidence = await verifySiteArtifact(resolve(options["--input"]));
    return console.log(
      `Verified ${evidence.files.length} artifact files for ${evidence.release}; development=${evidence.development}. No deployment performed.`,
    );
  }
  assert.ok(
    command === "build" && options["--out"] && options["--realm"],
    help,
  );
  const realm = await readReleaseRealmFile(resolve(options["--realm"]));
  const base = normalizeBase(options["--base"]);
  assert.ok(
    base
      .split("/")
      .filter(Boolean)
      .every(
        (part) => /^[A-Za-z0-9_.-]+$/.test(part) && ![".", ".."].includes(part),
      ),
    "Use a safe deployment base path",
  );
  const context = await loadContent();
  const baseline = await createImportBundle(context);
  const directory = resolve(options["--input"]);
  const pack = JSON.parse(
    await readFile(join(directory, "release.json"), "utf8"),
  );
  const evidence = await buildReleaseSite(
    context,
    pack,
    directory,
    resolve(options["--out"]),
    {
      sourceFiles: baseline.snapshot.source_files,
      realm,
      base,
      development: Boolean(options["--development"]),
      browser: Boolean(options["--browser"]),
    },
  );
  console.log(
    `Built ${evidence.records} records into ${evidence.files.length} checked static files. development=${evidence.development}. Nothing was uploaded or activated.`,
  );
}
main().catch((error) => {
  console.error(error.message);
  if (error.issues)
    console.error(JSON.stringify(error.issues.slice(0, 20), null, 2));
  process.exitCode = 1;
});
