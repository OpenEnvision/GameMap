import { build } from "esbuild";
import { root, readDocuments } from "./documents.mjs";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import {
  assertKnownSourceFiles,
  sourceFiles,
  assertSourceModuleCoverage,
} from "./source-inventory.mjs";

export const normalizeBase = (value) =>
  ("/" + (value || "").split("/").filter(Boolean).join("/") + "/").replace(
    /\/+/g,
    "/",
  );
/** Node checks use the same typed adapters, but discover source documents independently. */
export async function loadContent(base = "/") {
  const contracts = JSON.parse(
    await readFile(
      new URL("../../website/content/sources.config.json", import.meta.url),
      "utf8",
    ),
  );
  const files = await sourceFiles();
  assertKnownSourceFiles(files, contracts);
  for (const file of files.filter((file) => file.startsWith("data/segments/")))
    contracts[file] = {
      exports: { default: { shape: "array", kind: "resource" } },
    };
  const imports = Object.keys(contracts).map(
    (path, index) =>
      `import * as source${index} from ${JSON.stringify("./" + path)};`,
  );
  const moduleMap = Object.keys(contracts)
    .map((path, index) => `${JSON.stringify(path)}: source${index}`)
    .join(",");
  const result = await build({
    stdin: {
      contents: `${imports.join("\n")}\nexport const sourceModules = {${moduleMap}}; export * from './website/content/registry-core'; export * from './website/content/site'; export * from './website/content/models'; export { sources } from './website/content/source-data';`,
      resolveDir: root,
      loader: "ts",
    },
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    metafile: true,
    logLevel: "silent",
    define: { "import.meta.env.BASE_URL": JSON.stringify(normalizeBase(base)) },
  });
  const module = await import(
    "data:text/javascript;base64," +
      Buffer.from(result.outputFiles[0].text).toString("base64")
  );
  const documents = await readDocuments();
  const registry = module.createRegistry(module.sources, documents);
  module.assertRegistryCoverage(module.sources, documents, registry);
  const sourceRows = assertSourceModuleCoverage(
    contracts,
    module.sourceModules,
    registry,
    module.sources,
    module.contentKinds,
  );
  return {
    ...module,
    registry,
    documents,
    contracts,
    sourceRows,
    inputs: Object.keys(result.metafile.inputs),
  };
}
export const contentDigest = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
