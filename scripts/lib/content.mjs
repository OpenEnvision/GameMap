import { build } from "esbuild";
import { root, readDocuments } from "./documents.mjs";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { readSiteInput, assertSiteInput } from "./catalog/site-input.mjs";
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
  const input = await readSiteInput();
  const contracts = JSON.parse(
    await readFile(
      new URL("../../website/content/sources.config.json", import.meta.url),
      "utf8",
    ),
  );
  const files = await sourceFiles();
  assertKnownSourceFiles(files, contracts);
  for (const file of files.filter(
    (file) =>
      file.startsWith("data/segments/") && !Object.hasOwn(contracts, file),
  ))
    contracts[file] = {
      exports: { default: { shape: "array", kind: "resource" } },
    };
  const imports = (input ? [] : Object.keys(contracts)).map(
    (path, index) =>
      `import * as source${index} from ${JSON.stringify("./" + path)};`,
  );
  const moduleMap = (input ? [] : Object.keys(contracts))
    .map((path, index) => `${JSON.stringify(path)}: source${index}`)
    .join(",");
  const result = await build({
    stdin: {
      contents: `${imports.join("\n")}\nexport const sourceModules = {${moduleMap}}; export * from './website/content/registry-core'; export * from './website/content/site'; export * from './website/content/models'; export * from './website/content/contracts'; export { default as runtimeTaxonomy } from './website/content/taxonomy.json'; export * from './website/content/assembly'; export * from './website/content/matching'; export * from './website/content/doc-language'; export * from './website/content/locale'; export * from './website/content/localization.server'; export { blockText, searchableBlocks, searchFields, searchableText } from './website/content/search'; export { sources } from './website/content/source-data';`,
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
  const documents = input ? input.documents : await readDocuments();
  const registry = module.createRegistry(module.sources, documents);
  module.assertRegistryCoverage(module.sources, documents, registry);
  const sourceRows = input
    ? input.records.length
    : assertSourceModuleCoverage(
        contracts,
        module.sourceModules,
        registry,
        module.sources,
        module.contentKinds,
      );
  const context = {
    ...module,
    registry,
    documents,
    contracts: input ? {} : contracts,
    sourceRows,
    inputMode: input ? "release" : "git",
    siteSource: input?.source,
    inputs: Object.keys(result.metafile.inputs),
    ...(input
      ? {
          translationCatalogs: input.catalogs,
          chineseContent: input.catalogs.zh?.content || {},
          translationSources: input.catalogs.zh?.fingerprints || {},
          localizationSnapshot: {
            ...module.localizationSnapshot,
            content: input.catalogs.zh?.content || {},
            fingerprints: input.catalogs.zh?.fingerprints || {},
          },
          localizedRegistry: (registry, locale) =>
            module.localizedRegistry(registry, locale, input.catalogs),
          localizeEntry: (entry, locale, documents) =>
            module.localizeEntry(entry, locale, documents, input.catalogs),
        }
      : {}),
  };
  if (input) assertSiteInput(context, input);
  return context;
}
export const contentDigest = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
