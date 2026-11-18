#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  localDirectory,
  readLocalStatus,
  assertLoopback,
  setupLocalPublisher,
  readLocalRealm,
} from "./lib/catalog/local-runtime.mjs";
import { connectPublicationDatabase } from "./lib/catalog/publication-database.mjs";
import { createLocalPublisher } from "./lib/catalog/publication.mjs";
import { createPublicationServer } from "./lib/catalog/publication-server.mjs";
import { createCommunityRuntime } from "./lib/community/runtime.mjs";
const directory = join(localDirectory, "publication");
export async function localPublisher() {
  const status = await readLocalStatus();
  const credentials = JSON.parse(
    await readFile(join(localDirectory, "deployer.json"), "utf8"),
  );
  assert.equal(credentials.format, "gamemap.local-deployer");
  const url = assertLoopback(credentials.databaseURL, [
    "postgres:",
    "postgresql:",
  ]);
  assert.equal(url.username, "gamemap_publisher_local");
  assert.equal(url.host, new URL(status.DB_URL).host);
  assert.equal(url.pathname, new URL(status.DB_URL).pathname);
  const realm = await readLocalRealm();
  const database = connectPublicationDatabase(credentials.databaseURL);
  return {
    publisher: createLocalPublisher({ database, directory, realm }),
    database,
    directory,
    realm,
  };
}
const help = `Local-only, independent publication operator (never GitHub/production)
  npm run local:publisher-setup
  npm run local:publication-status
  npm run local:publish -- --input ARTIFACT --expected DIGEST_OR_none --expected-release UUID_OR_none --run LABEL
  npm run local:rollback -- --artifact PREVIOUS_DIGEST --expected CURRENT_DIGEST --expected-release CURRENT_RELEASE --run LABEL
  npm run local:publication-recover
  npm run local:publication-serve -- --port 4191
Only previously activated retained artifacts can be rollback targets. Read status first.
`;
async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || args.includes("--help")) return console.log(help);
  if (command === "setup") {
    assert.equal(args.length, 0);
    await setupLocalPublisher();
    console.log(
      "Independent local deployer configured privately. No credential was added to Studio or the browser.",
    );
    return;
  }
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    assert.ok(
      [
        "--input",
        "--artifact",
        "--expected",
        "--expected-release",
        "--run",
        "--port",
      ].includes(key) && !Object.hasOwn(options, key),
      help,
    );
    const value = args[++i];
    assert.ok(value && !value.startsWith("--"), help);
    options[key] = value;
  }
  if (command === "serve") {
    assert.ok(
      Object.keys(options).every((key) => key === "--port"),
      help,
    );
    // 4190 is a browser-blocked Sieve port; keep the default browser-accessible.
    const port = Number(options["--port"] || 4191);
    assert.ok(Number.isInteger(port) && port > 0 && port < 65536);
    const community = await createCommunityRuntime({
      directory,
      configFile: join(localDirectory, "community.json"),
      origin: `http://127.0.0.1:${port}`,
    });
    const server = createPublicationServer(directory, { community });
    server.listen(port, "127.0.0.1", () =>
      console.log(
        `Anonymous local snapshot preview: http://127.0.0.1:${port}/ (use its configured base, e.g. /GameMap/)`,
      ),
    );
    for (const signal of ["SIGINT", "SIGTERM"])
      process.once(signal, () => {
        server.closeAllConnections();
        server.close();
        void community.close();
      });
    return;
  }
  const { publisher, database } = await localPublisher();
  try {
    if (command === "status" || command === "recover") {
      assert.equal(args.length, 0);
      console.log(JSON.stringify(await publisher[command](), null, 2));
      return;
    }
    assert.ok(["publish", "rollback"].includes(command), help);
    assert.ok(
      options["--expected"] &&
        options["--expected-release"] &&
        options["--run"],
      help,
    );
    const selection = command === "publish" ? "--input" : "--artifact";
    assert.ok(options[selection], help);
    assert.deepEqual(
      Object.keys(options).sort(),
      [selection, "--expected", "--expected-release", "--run"].sort(),
      help,
    );
    const previous = (value) => (value === "none" ? null : value);
    const result = await publisher[command]({
      input: options["--input"] ? resolve(options["--input"]) : undefined,
      artifact: options["--artifact"],
      expectedArtifact: previous(options["--expected"]),
      expectedRelease: previous(options["--expected-release"]),
      run: options["--run"],
    });
    console.log(JSON.stringify(result, null, 2));
    console.log(
      "Only the isolated local snapshot changed. Default dist/, GitHub Pages and production were not touched.",
    );
  } finally {
    await database.close();
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
