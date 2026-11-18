#!/usr/bin/env node
import {
  startLocal,
  stopLocal,
  readLocalStatus,
  setupLocal,
  migrateLocal,
  setupLocalRealm,
  localDirectory,
} from "../lib/catalog/local-runtime.mjs";
import {
  backupLocalCatalog,
  restoreLocalProbe,
} from "../lib/catalog/local-backup.mjs";
import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { resolve } from "node:path";
import { root } from "../lib/documents.mjs";
const command = process.argv[2];
try {
  if (command === "start") {
    await startLocal();
    console.log(
      "Isolated local Supabase is healthy; all published ports are loopback-only. No cloud database contacted.",
    );
  } else if (command === "stop") {
    await stopLocal();
    console.log("Local Supabase stopped. Its data was retained.");
  } else if (command === "migrate") {
    await migrateLocal();
    console.log(
      "Applied pending sequential migrations to the owned local project only.",
    );
  } else if (command === "realm-setup") {
    const file = await setupLocalRealm();
    console.log(
      `Registered the immutable owned-local release realm. Set CATALOG_RELEASE_REALM_FILE=${file} in the private Studio environment.`,
    );
    console.log(
      "No existing releases or artifact bytes were rewritten; no cloud project was contacted.",
    );
  } else if (command === "setup") {
    console.log(JSON.stringify(await setupLocal(), null, 2));
    console.log(
      "Passwords and local service credentials remain in the private file above, not in chat or Git. New imports start as drafts; existing workflow states are preserved.",
    );
  } else if (command === "status") {
    const status = await readLocalStatus();
    console.log(
      `Local API: ${status.API_URL}; private status directory: ${localDirectory}`,
    );
  } else if (command === "backup") {
    const env = parseEnv(await readFile(resolve(root, ".env"), "utf8"));
    console.log(await backupLocalCatalog(env.CATALOG_MEDIA_ROOT));
    console.log(
      "Private backup includes local credentials: keep it outside Git and public artifacts.",
    );
  } else if (command === "restore-probe") {
    const input = process.argv[process.argv.indexOf("--input") + 1];
    if (!process.argv.includes("--input") || !input)
      throw new Error("Use --input PRIVATE_BACKUP_DIRECTORY");
    console.log(
      JSON.stringify(await restoreLocalProbe(resolve(input)), null, 2),
    );
    console.log(
      "Restore succeeded in a separate temporary local database, which was removed. Active database unchanged.",
    );
  } else
    console.log(
      "Local-only catalog operations: local:start/setup/migrate/realm-setup/status/stop/backup/restore-probe. No remote link, push, reset or deployment commands.",
    );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
