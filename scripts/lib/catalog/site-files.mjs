import { testingManifest } from "../../testing.mjs";
import { sha256, readArtifact } from "./codec.mjs";

/** Public downloads are derived from the selected revisions, never copied from Git business exports. */
export async function siteDownloads(input, bodies, directory) {
  const { sources, documents } = input;
  const json = (value) => JSON.stringify(value, null, 2) + "\n";
  const dates = [
    ...new Set(sources.testingResources.map((row) => row.reviewed)),
  ].sort();
  const output = {
    "resources.json": json(sources.resources),
    "repository-research.json": json(sources.repositoryResearch),
    "logo-sources.json": json(sources.identities),
    "testing-resources.json": testingManifest({
      ...sources,
      testingReviewDate: dates.length === 1 ? dates[0] : null,
    }),
    "favicon.svg": await readArtifact(
      directory,
      "website/public/brand/gamemap-mark.svg",
    ),
  };
  const notes = documents.filter(
    (page) =>
      /^docs\/[^/]+\.md$/.test(page.source) &&
      !["media-sources", "icon-sources"].includes(page.slug),
  );
  let downloadable = bodies["AWESOME.md"];
  for (const page of notes) {
    downloadable = downloadable.replaceAll(
      `](${page.source})`,
      `](./${page.slug}.md)`,
    );
    output[`${page.slug}.md`] =
      bodies[page.source]
        .replaceAll("](../website/public/", "](./")
        .replaceAll("](../AWESOME.md)", "](./awesome-list.md)")
        .replaceAll("](../CONTRIBUTING.md", "](./CONTRIBUTING.md")
        .replaceAll("](world-model-notes.md)", "](./world-model-notes.md)")
        .trimEnd() + "\n";
  }
  let contributing = bodies["CONTRIBUTING.md"];
  for (const page of notes)
    contributing = contributing.replaceAll(
      `](docs/${page.slug}.md`,
      `](./${page.slug}.md`,
    );
  output["CONTRIBUTING.md"] = contributing;
  output["awesome-list.md"] = downloadable
    .replaceAll("](CONTRIBUTING.md)", "](./CONTRIBUTING.md)")
    .replaceAll("](data/resources.json)", "](./resources.json)");
  output["logo-sources.md"] = bodies["docs/icon-sources.md"].replaceAll(
    "<code>website/public/logos/</code>",
    "<code>logos/</code>",
  );
  output["media-sources.md"] = bodies["docs/media-sources.md"].replaceAll(
    "../website/public/",
    "./",
  );
  const previews = [];
  for (const row of sources.learningPaths) {
    const media = sources.learningMedia[row.id];
    const bytes = await readArtifact(
      directory,
      `website/public/${media.src.replace(/^\//, "")}`,
    );
    previews.push({
      id: row.id,
      ...media,
      bytes: bytes.length,
      sha256: sha256(bytes),
    });
  }
  output["media/learning/manifest.json"] = json({
    kind: "gameplay-screenshots",
    previews,
  });
  return output;
}
