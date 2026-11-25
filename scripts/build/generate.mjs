import { mkdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { readDocuments } from "../lib/documents.mjs";
import { documentDownloads } from "../lib/document-downloads.mjs";
import { generateSkillPackages } from "../lib/skill-packages.mjs";
import { writeIfChanged } from "../lib/files.mjs";
import { categories, loadCatalog, validate } from "../lib/guides/catalog.mjs";
import { renderGeneratedDocuments } from "../lib/catalog/generated-documents.mjs";
import { documentGenerators } from "../lib/catalog/generated-registry.mjs";
import { loadLearningContent } from "../lib/guides/learning.mjs";
import { loadAgentCodeContent } from "../lib/guides/agent-code.mjs";
import {
  loadTestingContent,
  validateTestingContent,
  testingManifest,
} from "../lib/guides/testing.mjs";
import { loadRepositoryResearch } from "../lib/guides/repository-research.mjs";
const records = validate(await loadCatalog());
const json = JSON.stringify(records, null, 2) + "\n";
const outputs = {
  "website/public/favicon.svg": await readFile(
    new URL("../../website/public/brand/gamemap-mark.svg", import.meta.url),
    "utf8",
  ),
  "data/resources.json": json,
  "website/src/data/resources.json": json,
  "website/public/resources.json": json,
};
const repositoryResearch = await loadRepositoryResearch();
outputs["website/public/repository-research.json"] =
  JSON.stringify(repositoryResearch, null, 2) + "\n";
const { learningPaths, foundationPaths, communityCollections } =
  await loadLearningContent();
const { agentGameResources, gameCaseAgents, agentLabels, agentResourceKinds } =
  await loadAgentCodeContent();
const testingContent = await loadTestingContent();
validateTestingContent(testingContent);
outputs["website/public/testing-resources.json"] =
  testingManifest(testingContent);
const learningMediaBundle = await build({
  absWorkingDir: fileURLToPath(new URL("../../", import.meta.url)),
  entryPoints: ["website/src/data/learningMedia.ts"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
});
const { learningMedia } = await import(
  "data:text/javascript;base64," +
    Buffer.from(learningMediaBundle.outputFiles[0].text).toString("base64")
);
const learningPreviews = await Promise.all(
  learningPaths
    .filter((path) => path.category !== "community" || learningMedia[path.id])
    .map(async (path) => {
      const preview = learningMedia[path.id];
      if (!preview) throw new Error(`Missing gameplay preview: ${path.id}`);
      const bytes = await readFile(
        new URL("../../website/public/" + preview.src, import.meta.url),
      );
      return {
        id: path.id,
        ...preview,
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      };
    }),
);
outputs["website/public/media/learning/manifest.json"] =
  JSON.stringify(
    { kind: "gameplay-screenshots", previews: learningPreviews },
    null,
    2,
  ) + "\n";
const identities = JSON.parse(
  await readFile(
    new URL("../../website/src/data/resourceIdentities.json", import.meta.url),
    "utf8",
  ),
);
outputs["website/public/logo-sources.json"] =
  JSON.stringify(identities, null, 2) + "\n";
const generated = renderGeneratedDocuments({
  resources: records,
  repositoryResearch,
  learningPaths,
  foundationPaths,
  communityCollections,
  agentGameResources,
  gameCaseAgents,
  agentLabels,
  agentResourceKinds,
  ...testingContent,
  identities,
});
// Historical source aliases remain readable, but must never be regenerated at old paths.
for (const { source } of Object.values(documentGenerators))
  outputs[source] = generated[source];
// Catalog and testing guides derive both languages from reviewed field translations.
// Other document fingerprints remain individually reviewed and unchanged.
const documentTranslationsPath = "website/content/i18n/docs.zh.sources.json";
const documentTranslations = JSON.parse(
  await readFile(
    new URL("../../" + documentTranslationsPath, import.meta.url),
    "utf8",
  ),
);
for (const slug of ["reference/catalog", "reference/testing-library"])
  documentTranslations.documents[slug] = {
    sourceHash: createHash("sha256")
      .update(generated[`docs/${slug}.md`])
      .digest("hex"),
    translationHash: createHash("sha256")
      .update(generated[`docs/zh/${slug}.md`])
      .digest("hex"),
  };
outputs[documentTranslationsPath] =
  JSON.stringify(documentTranslations, null, 2) + "\n";
// Raw Markdown downloads, including notices at moved or retired download names.
const documents = await readDocuments();
const bodies = {
  "CONTRIBUTING.md": await readFile(
    new URL("../../CONTRIBUTING.md", import.meta.url),
    "utf8",
  ),
};
for (const page of documents)
  bodies[page.source] =
    outputs[page.source] ??
    (await readFile(new URL("../../" + page.source, import.meta.url), "utf8"));
for (const [path, value] of Object.entries(
  documentDownloads(documents, bodies),
))
  outputs["website/public/" + path] = value;
for (const [path, value] of Object.entries(outputs)) {
  const url = new URL("../../" + path, import.meta.url);
  await mkdir(new URL(".", url), { recursive: true });
  await writeIfChanged(url, value);
}
await generateSkillPackages();
console.log(
  `Generated awesome list and website data: ${records.length} resources, ${categories.length} categories.`,
);
