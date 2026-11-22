#!/usr/bin/env node
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { readReleaseRealmFile } from "../lib/catalog/release-realm.mjs";
import {
  backupCloudPlatform,
  verifyCloudBackupArchive,
  restoreCloudProbe,
} from "../lib/catalog/cloud-backup.mjs";

const help = `Managed-cloud paired backup and isolated restore probe (standard TLS pg_dump/pg_restore; no Docker)
  npm run cloud:backup -- --realm REALM_FILE --out NEW_PRIVATE_BACKUP_DIR [--catalog-media DIR] [--community-media DIR] [--publication DIR] [--include-auth]
  npm run cloud:backup-verify -- --input BACKUP_DIR [--realm REALM_FILE]
  npm run cloud:restore-probe -- --input BACKUP_DIR --realm REALM_FILE

Environment:
  BACKUP_DATABASE_URL (for backup: read-capable TLS PostgreSQL URL)
  SCRATCH_RESTORE_DATABASE_URL (for restore-probe: isolated empty scratch PostgreSQL database URL)
`;

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || args.includes("--help")) return console.log(help);
  const options = {};
  const flags = ["--include-auth"];
  const valueKeys = [
    "--realm",
    "--out",
    "--input",
    "--catalog-media",
    "--community-media",
    "--publication",
  ];
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (flags.includes(key)) {
      options[key] = true;
      continue;
    }
    assert.ok(valueKeys.includes(key) && !Object.hasOwn(options, key), help);
    const value = args[++i];
    assert.ok(value && !value.startsWith("--"), help);
    options[key] = value;
  }
  if (command === "backup") {
    assert.ok(options["--realm"] && options["--out"], help);
    assert.ok(process.env.BACKUP_DATABASE_URL, "Set BACKUP_DATABASE_URL");
    const realm = await readReleaseRealmFile(resolve(options["--realm"]));
    const result = await backupCloudPlatform({
      databaseURL: process.env.BACKUP_DATABASE_URL,
      realm,
      outputDirectory: resolve(options["--out"]),
      catalogMediaRoot:
        options["--catalog-media"] || process.env.CATALOG_MEDIA_ROOT,
      communityMediaRoot:
        options["--community-media"] || process.env.COMMUNITY_MEDIA_ROOT,
      publicationDirectory:
        options["--publication"] || process.env.CLOUD_PUBLICATION_RETENTION_DIR,
      includeAuth: Boolean(options["--include-auth"]),
    });
    console.log(
      JSON.stringify(
        {
          directory: result.directory,
          tables: result.manifest.database.tables.length,
          catalogMedia: result.manifest.catalogMedia.length,
          communityMedia: result.manifest.communityMedia.length,
          publicationFiles: result.manifest.publication.length,
          databaseSha256: result.manifest.database.sha256,
        },
        null,
        2,
      ),
    );
    return;
  }
  if (command === "verify") {
    assert.ok(options["--input"], help);
    const realm = options["--realm"]
      ? await readReleaseRealmFile(resolve(options["--realm"]))
      : undefined;
    const manifest = await verifyCloudBackupArchive(
      resolve(options["--input"]),
      realm,
    );
    console.log(
      JSON.stringify(
        {
          verified: true,
          realm: manifest.realm,
          tables: manifest.database.tables.length,
          catalogMedia: manifest.catalogMedia.length,
          communityMedia: manifest.communityMedia.length,
          publicationFiles: manifest.publication.length,
        },
        null,
        2,
      ),
    );
    return;
  }
  if (command === "restore-probe") {
    assert.ok(options["--input"] && options["--realm"], help);
    assert.ok(
      process.env.SCRATCH_RESTORE_DATABASE_URL,
      "Set SCRATCH_RESTORE_DATABASE_URL to an isolated scratch PostgreSQL database",
    );
    const realm = await readReleaseRealmFile(resolve(options["--realm"]));
    const result = await restoreCloudProbe({
      backupDirectory: resolve(options["--input"]),
      scratchDatabaseURL: process.env.SCRATCH_RESTORE_DATABASE_URL,
      realm,
    });
    console.log(JSON.stringify({ verified: true, ...result }, null, 2));
    return;
  }
  throw new Error(help);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
