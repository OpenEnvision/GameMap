import { mkdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { readDocuments } from "./lib/documents.mjs";
import { generateSkillPackages } from "./lib/skill-packages.mjs";
import { writeIfChanged } from "./lib/files.mjs";
import { categories, loadCatalog, validate } from "./catalog.mjs";
import { renderGeneratedDocuments } from "./lib/catalog/generated-documents.mjs";
import { documentGenerators } from "./lib/catalog/generated-registry.mjs";
import { loadLearningContent } from "./learning.mjs";
import { loadAgentCodeContent } from "./agent-code.mjs";
import {
  loadTestingContent,
  validateTestingContent,
  testingManifest,
} from "./testing.mjs";
import { loadRepositoryResearch } from "./repository-research.mjs";
import documentRedirects from "../website/content/document-redirects.json" with { type: "json" };
const records = validate(await loadCatalog());
const json = JSON.stringify(records, null, 2) + "\n";
const outputs = {
  "website/public/favicon.svg": await readFile(
    new URL("../website/public/brand/gamemap-mark.svg", import.meta.url),
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
  absWorkingDir: fileURLToPath(new URL("../", import.meta.url)),
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
  learningPaths.filter((path) => path.category !== 'community' || learningMedia[path.id]).map(async (path) => {
    const preview = learningMedia[path.id];
    if (!preview) throw new Error(`Missing gameplay preview: ${path.id}`);
    const bytes = await readFile(
      new URL("../website/public/" + preview.src, import.meta.url),
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
    new URL("../website/src/data/resourceIdentities.json", import.meta.url),
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
const awesome = generated["docs/AWESOME.md"];
const attribution = generated["docs/icon-sources.md"];
outputs["website/public/logo-sources.md"] = attribution.replaceAll(
  "<code>website/public/logos/</code>",
  "<code>logos/</code>",
);
outputs["website/public/media-sources.md"] = (
  await readFile(new URL("../docs/media-sources.md", import.meta.url), "utf8")
).replaceAll("../website/public/", "./");
// Public downloads use same-directory paths so links also work on repository subpaths.
let downloadable = awesome;
// Flat source notes also have raw downloads. Nested archives are rendered as documentation.
const downloadableNotes = (await readDocuments()).filter(
  (page) =>
    /^docs\/[^/]+\.md$/.test(page.source) &&
    !["catalog", "media-sources", "icon-sources"].includes(page.slug),
);
for (const { slug: name, source: path } of downloadableNotes) {
  downloadable = downloadable.replaceAll(`](${path.slice("docs/".length)})`, `](./${name}.md)`);
  let note =
    outputs[path] ??
    (await readFile(new URL("../" + path, import.meta.url), "utf8"));
  note = note.replaceAll("](../website/public/", "](./");
  note = note.replaceAll("](../AWESOME.md)", "](./awesome-list.md)");
  note = note.replaceAll("](AWESOME.md)", "](./awesome-list.md)");
  note = note.replaceAll("](../CONTRIBUTING.md", "](./CONTRIBUTING.md");
  note = note.replaceAll(
    "](world-model-notes.md)",
    "](./world-model-notes.md)",
  );
  outputs[`website/public/${name}.md`] = note.trimEnd() + "\n";
}
let contributing = await readFile(
  new URL("../CONTRIBUTING.md", import.meta.url),
  "utf8",
);
for (const { slug } of downloadableNotes)
  contributing = contributing.replaceAll(`](docs/${slug}.md`, `](./${slug}.md`);
outputs["website/public/CONTRIBUTING.md"] = contributing;
outputs["website/public/awesome-list.md"] = downloadable
  .replaceAll("](../CONTRIBUTING.md)", "](./CONTRIBUTING.md)")
  .replaceAll("](../data/resources.json)", "](./resources.json)");
// Retired catalogs keep flat migration-notice downloads, not stale document paths.
for (const [path, target] of Object.entries(documentRedirects)) {
  if (!/^\/docs\/[^/]+\/$/.test(path)) continue;
  const slug = path.split("/")[2];
  outputs[`website/public/${slug}.md`] =
    `# Game examples\n\nThis catalog has moved to [Game examples](${target}).\n`;
  outputs["website/public/awesome-list.md"] = outputs["website/public/awesome-list.md"]
    .replaceAll(`](${slug}.md)`, `](./${slug}.md)`);
}
for (const [path, value] of Object.entries(outputs)) {
  const url = new URL("../" + path, import.meta.url);
  await mkdir(new URL(".", url), { recursive: true });
  await writeIfChanged(url, value);
}
await generateSkillPackages();
console.log(
  `Generated awesome list and website data: ${records.length} resources, ${categories.length} categories.`,
);
