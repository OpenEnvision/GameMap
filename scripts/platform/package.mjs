#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { root } from "../lib/documents.mjs";
import {
  createImportBundle,
  verifyImportBundle,
  importSQL,
} from "../lib/platform.mjs";
import {
  readArtifact,
  safePath,
  sha256,
  canonicalJSON,
  assertPrivateDirectory,
} from "../lib/catalog/codec.mjs";

const help = `GameMap content-platform migration (offline; never connects to a database)

  npm run platform:export -- --out .build/catalog-import
  npm run platform:verify -- --input .build/catalog-import

Export creates bundle.json, report.json, import.sql, and files/ with checksummed
source assets. The destination must not exist. Verification requires the matching
source checkout and source edits; archived JavaScript is never executed.
Packages contain unpublished content and must not be served from website/public/.
`;

export async function main(args = process.argv.slice(2)) {
  if (!args.length || args.includes("--help")) {
    console.log(help);
    return;
  }
  const [command, flag, destination, ...extra] = args;
  if (
    extra.length ||
    !destination ||
    !["export", "verify"].includes(command) ||
    flag !== (command === "export" ? "--out" : "--input")
  )
    throw new Error(help);
  const directory = resolve(destination);
  if (command === "verify") {
    const bundle = JSON.parse(
      await readFile(join(directory, "bundle.json"), "utf8"),
    );
    const report = await verifyImportBundle(bundle, {
      filesRoot: join(directory, "files"),
    });
    const sql = await readFile(join(directory, "import.sql"), "utf8");
    if (sql !== importSQL(bundle))
      throw new Error("Migration SQL differs from verified package");
    const savedReport = JSON.parse(
      await readFile(join(directory, "report.json"), "utf8"),
    );
    if (canonicalJSON(savedReport) !== canonicalJSON(report))
      throw new Error("Migration report differs from verified package");
    console.log(
      `Verified ${report.entries} records, ${report.translations} translations, ${report.artifacts} files. ${report.digest}`,
    );
    return report;
  }
  await assertPrivateDirectory(root, directory);
  const bundle = await createImportBundle();
  const report = await verifyImportBundle(bundle);
  await mkdir(resolve(directory, ".."), { recursive: true });
  await mkdir(directory); // Intentionally refuse to overwrite an earlier package.
  const filesRoot = join(directory, "files");
  for (const artifact of bundle.snapshot.artifacts) {
    const bytes = await readArtifact(root, artifact.path);
    if (bytes.length !== artifact.bytes || sha256(bytes) !== artifact.sha256)
      throw new Error(
        `Source artifact changed during export: ${artifact.path}`,
      );
    const path = safePath(filesRoot, artifact.path);
    await mkdir(resolve(path, ".."), { recursive: true });
    await writeFile(path, bytes, { flag: "wx" });
  }
  // The package becomes importable only after every artifact has been successfully copied.
  await writeFile(
    join(directory, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
    { flag: "wx" },
  );
  await writeFile(join(directory, "import.sql"), importSQL(bundle), {
    flag: "wx",
  });
  await writeFile(
    join(directory, "bundle.json"),
    JSON.stringify(bundle, null, 2) + "\n",
    { flag: "wx" },
  );
  console.log(`Exported ${report.entries} draft records to ${directory}`);
  console.log(
    `Preserved ${report.translations} translations and ${report.artifacts} files; no project identities merged.`,
  );
  console.log(
    "Review report.json before applying import.sql to a backed-up database. Nothing has been uploaded or published.",
  );
  return report;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  main().catch((error) => {
    console.error(error.message);
    if (Array.isArray(error.issues))
      console.error(JSON.stringify(error.issues.slice(0, 20), null, 2));
    process.exitCode = 1;
  });
