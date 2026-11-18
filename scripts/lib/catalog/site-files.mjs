import { testingManifest } from "../../testing.mjs";
import { sha256, readArtifact } from "./codec.mjs";
import documentRedirects from "../../../website/content/document-redirects.json" with { type: "json" };

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
      !["catalog", "media-sources", "icon-sources"].includes(page.slug),
  );
  const catalogSource =
    documents.find((page) => page.slug === "catalog")?.source ?? "AWESOME.md";
  let downloadable = bodies[catalogSource];
  for (const page of notes) {
    downloadable = downloadable.replaceAll(
      `](${catalogSource.startsWith("docs/") ? page.source.slice("docs/".length) : page.source})`,
      `](./${page.slug}.md)`,
    );
    output[`${page.slug}.md`] =
      bodies[page.source]
        .replaceAll("](../website/public/", "](./")
        .replaceAll("](../AWESOME.md)", "](./awesome-list.md)")
        .replaceAll("](AWESOME.md)", "](./awesome-list.md)")
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
    .replaceAll("](../CONTRIBUTING.md)", "](./CONTRIBUTING.md)")
    .replaceAll("](data/resources.json)", "](./resources.json)")
    .replaceAll("](../data/resources.json)", "](./resources.json)");
  output["logo-sources.md"] = bodies["docs/icon-sources.md"].replaceAll(
    "<code>website/public/logos/</code>",
    "<code>logos/</code>",
  );
  output["media-sources.md"] = bodies["docs/media-sources.md"].replaceAll(
    "../website/public/",
    "./",
  );
  for (const [path, target] of Object.entries(documentRedirects)) {
    if (!/^\/docs\/[^/]+\/$/.test(path)) continue;
    const slug = path.split("/")[2];
    output[`${slug}.md`] =
      `# Game examples\n\nThis catalog has moved to [Game examples](${target}).\n`;
    output["awesome-list.md"] = output["awesome-list.md"]
      .replaceAll(`](docs/${slug}.md)`, `](./${slug}.md)`)
      .replaceAll(`](${slug}.md)`, `](./${slug}.md)`);
  }
  const previews = [];
  for (const row of sources.learningPaths) {
    const media =
      sources.gameplayScreenshots?.[`example:${row.id}`]?.media ||
      sources.learningMedia[row.id];
    // Community games can have no reviewed screenshot; never invent a media entry.
    if (!media) continue;
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
  output["gameplay-screenshot-sources.json"] = json({
    format: "gamemap.gameplay-screenshots",
    version: 1,
    verification:
      "Reviewed creator-published or bounded browser gameplay images; not source completeness, rights, buildability or runtime certification.",
    records: Object.entries(sources.gameplayScreenshots || {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => ({ key, media: value.media })),
  });
  const retainedCovers = { ...sources.pageCovers };
  for (const [key, value] of Object.entries(sources.gameplayScreenshots || {}))
    if (value.archivedPageCover) retainedCovers[key] = value.archivedPageCover;
  const covers = [];
  for (const [key, cover] of Object.entries(retainedCovers).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    for (const image of [cover, cover.original]) {
      const bytes = await readArtifact(
        directory,
        `website/public/${image.src.replace(/^\//, "")}`,
      );
      if (sha256(bytes) !== image.sha256 || bytes.length !== image.bytes)
        throw new Error(`Page cover provenance changed: ${key} ${image.src}`);
    }
    covers.push({ key, ...cover });
  }
  output["page-cover-sources.json"] = json({
    format: "gamemap.project-page-covers",
    version: 1,
    verification:
      "Public project or GameMap catalog page captures, not gameplay screenshots or source, rights, build, playability or runtime verification.",
    records: covers,
  });
  return output;
}
