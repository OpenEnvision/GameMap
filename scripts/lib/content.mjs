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

export async function loadContentRuntime(base = "/", contracts) {
  const paths = Object.keys(contracts ?? {});
  const imports = paths.map(
    (path, index) =>
      `import * as source${index} from ${JSON.stringify("./" + path)};`,
  );
  const moduleMap = paths
    .map((path, index) => `${JSON.stringify(path)}: source${index}`)
    .join(",");
  const result = await build({
    stdin: {
      contents: `${imports.join("\n")}\nexport const sourceModules = {${moduleMap}}; export * from './website/content/registry-core'; export * from './website/content/site'; export * from './website/content/models'; export * from './website/content/contracts'; export { default as runtimeTaxonomy } from './website/content/taxonomy.json'; export * from './website/content/assembly'; export * from './website/content/matching'; export * from './website/content/doc-language'; export * from './website/content/locale'; export * from './website/content/localization.server'; export * from './website/content/resource-search'; export { blockText, searchableBlocks, searchFields, searchableText } from './website/content/search'; ${contracts ? "export { sources } from './website/content/git-sources.server';" : ""}`,
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
  return { ...module, inputs: Object.keys(result.metafile.inputs) };
}

export async function loadContent(base = "/") {
  const contracts = JSON.parse(
    await readFile(
      new URL("../../website/content/sources.config.json", import.meta.url),
      "utf8",
    ),
  );
  const files = await sourceFiles();
  assertKnownSourceFiles(files, contracts);
  const module = await loadContentRuntime(base, contracts);
  const sources = module.sources;
  const documents = await readDocuments();
  const registry = module.createRegistry(sources, documents);
  module.assertRegistryCoverage(sources, documents, registry);
  const sourceRows = assertSourceModuleCoverage(
    contracts,
    module.sourceModules,
    registry,
    sources,
    module.contentKinds,
  );
  return {
    ...module,
    sources,
    registry,
    documents,
    contracts,
    sourceRows,
    inputMode: "git",
  };
}

export const contentDigest = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
