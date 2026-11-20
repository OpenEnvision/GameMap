import { build } from "esbuild";
import { root, readDocuments } from "./documents.mjs";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import {
  readSiteInput,
  readDevelopmentInput,
  assertSiteInput,
} from "./catalog/site-input.mjs";
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
/** Contracts and renderers can load without importing any Git-authored business rows. */
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
      contents: `${imports.join("\n")}\nexport const sourceModules = {${moduleMap}}; export * from './website/content/registry-core'; export * from './website/content/site'; export * from './website/content/models'; export * from './website/content/contracts'; export { default as runtimeTaxonomy } from './website/content/taxonomy.json'; export * from './website/content/assembly'; export * from './website/content/matching'; export * from './website/content/doc-language'; export * from './website/content/locale'; export * from './website/content/localization.server'; export { blockText, searchableBlocks, searchFields, searchableText } from './website/content/search'; ${contracts ? "export { sources } from './website/content/git-sources.server';" : ""}`,
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

/** Node preparation and checks consume the same selected provider as the website. */
export async function loadContent(base = "/", { input } = {}) {
  if (input === undefined)
    input = (await readSiteInput()) ?? (await readDevelopmentInput());
  const contracts = input
    ? {}
    : JSON.parse(
        await readFile(
          new URL("../../website/content/sources.config.json", import.meta.url),
          "utf8",
        ),
      );
  if (!input) {
    const files = await sourceFiles();
    assertKnownSourceFiles(files, contracts);
    for (const file of files.filter(
      (file) =>
        file.startsWith("data/segments/") && !Object.hasOwn(contracts, file),
    ))
      contracts[file] = {
        exports: { default: { shape: "array", kind: "resource" } },
      };
  }
  const module = await loadContentRuntime(base, input ? undefined : contracts);
  const sources = input?.sources ?? module.sources;
  const documents = input ? input.documents : await readDocuments();
  const registry = module.createRegistry(sources, documents);
  module.assertRegistryCoverage(sources, documents, registry);
  const sourceRows = input
    ? registry.entries.length
    : assertSourceModuleCoverage(
        contracts,
        module.sourceModules,
        registry,
        sources,
        module.contentKinds,
      );
  const context = {
    ...module,
    sources,
    registry,
    documents,
    documentBodies: input?.documentBodies,
    contracts,
    sourceRows,
    inputMode: input ? input.source.mode : "git",
    siteSource: input?.source,
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
  if (input?.format === "gamemap.site-input") assertSiteInput(context, input);
  return context;
}
export const contentDigest = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
