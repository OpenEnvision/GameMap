#!/usr/bin/env node
import { resolve } from "node:path";
import { loadContent } from "../lib/content.mjs";
import { createImportBundle } from "../lib/platform.mjs";
import { connectDatabase, first } from "../lib/catalog/database.mjs";
import { createMediaStore } from "../lib/catalog/media.mjs";
import {
  readReleaseRealmFile,
  assertReleaseRealm,
} from "../lib/catalog/release-realm.mjs";
import {
  writeReleasePackage,
  verifyReleaseDirectory,
} from "../lib/catalog/release-files.mjs";

const help = `Private release files (not deployment)
  npm run studio:export -- --id RELEASE_UUID --out .build/releases/reviewed
  npm run studio:verify -- --input .build/releases/reviewed

Export needs protected CATALOG_DATABASE_URL credentials and the matching source checkout.
It copies only referenced, checksummed files. Verification is offline. Neither command
approves content, builds a website, uploads files, or activates a deployment.
`;
const [command, ...args] = process.argv.slice(2);
async function main() {
  if (!command || args.includes("--help")) {
    console.log(help);
    return;
  }
  const context = await loadContent(),
    baseline = await createImportBundle(context);
  if (command === "verify" && args.length === 2 && args[0] === "--input") {
    console.log(
      await verifyReleaseDirectory(
        context,
        resolve(args[1]),
        baseline.snapshot.source_files,
      ),
    );
    return;
  }
  if (
    command !== "export" ||
    args.length !== 4 ||
    args[0] !== "--id" ||
    args[2] !== "--out" ||
    !/^[a-f0-9-]{36}$/i.test(args[1])
  )
    throw new Error(help);
  if (!process.env.CATALOG_DATABASE_URL)
    throw new Error(
      "Configure a protected CATALOG_DATABASE_URL; no browser token can replace it",
    );
  const realm = await readReleaseRealmFile(
    process.env.CATALOG_RELEASE_REALM_FILE,
  );
  const database = connectDatabase(process.env.CATALOG_DATABASE_URL);
  try {
    assertReleaseRealm(
      await database.system(
        async (client) =>
          (
            await first(
              client,
              "select catalog.current_release_realm() as realm",
            )
          ).realm,
      ),
      realm,
    );
    const row = await database.system((client) =>
      first(
        client,
        `select r.id, r.manifest_text, r.digest as manifest_digest,
      c.context_text, c.digest as context_digest from catalog.releases r join catalog.release_contexts c on c.release_id = r.id where r.id = $1`,
        [args[1]],
      ),
    );
    if (!row) throw new Error("A prepared release with that ID was not found");
    const media = createMediaStore(
      process.env.CATALOG_MEDIA_ROOT
        ? resolve(process.env.CATALOG_MEDIA_ROOT)
        : undefined,
    );
    const report = await writeReleasePackage(
      context,
      { format: "gamemap.release-package", version: 1, ...row },
      resolve(args[3]),
      {
        sourceFiles: baseline.snapshot.source_files,
        readAsset: (path) => media.readAsset(path),
      },
    );
    await database.system((client) =>
      client.query(
        "insert into catalog.audit_events(action,entity,detail) values('operator-export-release',$1,$2::jsonb)",
        [row.id, JSON.stringify({ manifest_digest: row.manifest_digest })],
      ),
    );
    console.log(report);
    console.log(
      "Only private release files were exported. Nothing was uploaded, built or activated.",
    );
  } finally {
    await database.close();
  }
}
main().catch((error) => {
  console.error(error.message);
  if (Array.isArray(error.issues))
    console.error(JSON.stringify(error.issues.slice(0, 20), null, 2));
  process.exitCode = 1;
});
