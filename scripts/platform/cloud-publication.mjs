#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { assertLeastPrivilegeLogin } from "../lib/catalog/database.mjs";
import { connectPublicationDatabase } from "../lib/catalog/publication-database.mjs";
import { readReleaseRealmFile } from "../lib/catalog/release-realm.mjs";
import {
  createCloudPublisher,
  createGitHubPagesAdapter,
  createPersistentNodeAdapter,
  parseCloudTarget,
} from "../lib/catalog/cloud-publication.mjs";

const help = `Protected cloud publication operator (staging / production realms only; never touches local dist/)
  npm run cloud:status -- --realm REALM_FILE --target TARGET_JSON --retention DIR
  npm run cloud:claim-target -- --realm REALM_FILE --target TARGET_JSON --retention DIR
  npm run cloud:publish -- --realm REALM_FILE --target TARGET_JSON --retention DIR --input SITE_ARTIFACT --expected DIGEST_OR_none --expected-release UUID_OR_none --run LABEL
  npm run cloud:activate -- --realm REALM_FILE --target TARGET_JSON --retention DIR --input SITE_ARTIFACT --expected DIGEST_OR_none --expected-release UUID_OR_none --run LABEL --deployment-url URL --deployment-id ID [--deployed-commit SHA]
  npm run cloud:rollback -- --realm REALM_FILE --target TARGET_JSON --retention DIR --artifact PREVIOUS_DIGEST --expected CURRENT_DIGEST --expected-release CURRENT_RELEASE --run LABEL
  npm run cloud:recover -- --realm REALM_FILE --target TARGET_JSON --retention DIR

Required environment:
  CATALOG_PUBLISHER_DATABASE_URL (dedicated NOINHERIT login granted catalog_deployer only)
Optional for direct gh-pages branch push (outside GitHub Actions deploy-pages):
  GITHUB_PAGES_DEPLOY_TOKEN
`;

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || args.includes("--help")) return console.log(help);
  const allowed = [
    "--realm",
    "--target",
    "--retention",
    "--input",
    "--artifact",
    "--expected",
    "--expected-release",
    "--run",
    "--deployment-url",
    "--deployment-id",
    "--deployed-commit",
  ];
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    assert.ok(allowed.includes(key) && !Object.hasOwn(options, key), help);
    const value = args[++i];
    assert.ok(value && !value.startsWith("--"), help);
    options[key] = value;
  }
  const databaseURL = process.env.CATALOG_PUBLISHER_DATABASE_URL;
  assert.ok(
    databaseURL,
    "Set CATALOG_PUBLISHER_DATABASE_URL to the dedicated catalog_deployer login",
  );
  const realm = await readReleaseRealmFile(
    options["--realm"] || process.env.CATALOG_RELEASE_REALM_FILE,
  );
  assert.ok(
    ["staging", "production"].includes(realm.environment),
    "Cloud publication requires a staging or production realm",
  );
  const targetPath =
    options["--target"] || process.env.CATALOG_CLOUD_TARGET_FILE;
  assert.ok(targetPath, "Provide --target TARGET_JSON");
  const target = parseCloudTarget(
    JSON.parse(await readFile(resolve(targetPath), "utf8")),
  );
  const retentionDirectory =
    options["--retention"] || process.env.CLOUD_PUBLICATION_RETENTION_DIR;
  assert.ok(retentionDirectory, "Provide --retention DIR");

  const database = connectPublicationDatabase(databaseURL, {
    applicationName: "gamemap-cloud-publisher",
  });
  try {
    await assertLeastPrivilegeLogin(database, "catalog_deployer", {
      forbiddenRoles: [
        "catalog_backend",
        "community_backend",
        "service_role",
        "supabase_admin",
        "postgres",
      ],
    });
    const adapter =
      target.provider === "github-pages"
        ? createGitHubPagesAdapter({ target })
        : createPersistentNodeAdapter({
            target,
            directory: retentionDirectory,
          });
    const publisher = createCloudPublisher({
      database,
      realm,
      target,
      adapter,
      retentionDirectory,
    });
    if (command === "status") {
      console.log(JSON.stringify(await publisher.status(), null, 2));
      return;
    }
    if (command === "claim-target") {
      console.log(JSON.stringify(await publisher.claimTarget(), null, 2));
      return;
    }
    if (command === "recover") {
      console.log(JSON.stringify(await publisher.recover(), null, 2));
      return;
    }
    const previous = (value) => (value === "none" ? null : value);
    if (command === "publish" || command === "activate") {
      assert.ok(
        options["--input"] &&
          options["--expected"] &&
          options["--expected-release"] &&
          options["--run"],
        help,
      );
      let deploymentEvidence;
      if (command === "activate") {
        assert.ok(
          options["--deployment-url"] && options["--deployment-id"],
          "activate requires --deployment-url and --deployment-id from the protected CI deploy step",
        );
        const evidence = JSON.parse(
          await readFile(resolve(options["--input"], "evidence.json"), "utf8"),
        );
        deploymentEvidence = {
          provider: target.provider,
          deploymentUrl: options["--deployment-url"],
          deploymentId: options["--deployment-id"],
          deployedCommit: options["--deployed-commit"] || null,
          verifiedFilesDigest: evidence.artifactDigest,
        };
      }
      const result = await publisher.publish({
        input: resolve(options["--input"]),
        expectedArtifact: previous(options["--expected"]),
        expectedRelease: previous(options["--expected-release"]),
        run: options["--run"],
        deploymentEvidence,
      });
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    if (command === "rollback") {
      assert.ok(
        options["--artifact"] &&
          options["--expected"] &&
          options["--expected-release"] &&
          options["--run"],
        help,
      );
      const result = await publisher.rollback({
        artifact: options["--artifact"],
        expectedArtifact: previous(options["--expected"]),
        expectedRelease: previous(options["--expected-release"]),
        run: options["--run"],
      });
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    throw new Error(help);
  } finally {
    await database.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
