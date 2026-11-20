import type { ContentSources } from "./source-data";
import type {
  ContentModels,
  ContentKind,
  ContentEntry,
  ContentRegistry,
  DemoContent,
  DocumentMetadata,
} from "./models";
import { contentKinds } from "./models";
import { fieldRules, presentFields, assertKeys } from "./fields";
import { pages, tracks, url, detailRoutes, documentRedirects } from "./site";
import type { Dimension } from "../src/types";
import type { LearningMedia } from "../src/data/learningMedia";
import type { ResourceIdentity } from "../src/data/resourceIdentities";
import { publicAsset } from "../src/publicAsset";
import { localizedPath, documentLanguages } from "./locale";
import { researchExampleListings } from "./research-games";
import open3dImport from "./open3d-import.config.json";
import { anyPageCoverSchema, gameplayMediaSchema } from "./contracts";
import type { GameplayMedia } from "../src/data/gameplayScreenshots";
import { pageCoverAlt } from "./media";

const imageKeys = {
  src: true,
  alt: true,
  source: true,
  credit: true,
  kind: true,
};
const identityKeys = {
  organization: true,
  kind: true,
  asset: true,
  sourceUrl: true,
  logoSourceUrl: true,
  notes: true,
  background: true,
  wide: true,
  sha256: true,
} satisfies Record<keyof ResourceIdentity, true>;
const mobileKeys = { src: true, poster: true, aspectRatio: true };
const learningMediaKeys = {
  src: true,
  alt: true,
  caption: true,
  sourceUrl: true,
  origin: true,
  capturedAt: true,
  reviewedAt: true,
  originalImageUrl: true,
  width: true,
  height: true,
} satisfies Record<keyof LearningMedia, true>;
const sourcePaths: Record<ContentKind, string> = {
  paper: "website/content/extended-data.ts",
  "threejs-game": "website/content/extended-data.ts",
  resource: "website/src/data/resources.json",
  example: "website/src/data/learningPaths.ts",
  foundation: "website/src/data/learningPaths.ts",
  "repository-research": "data/segments/repository-research.json",
  agent: "website/src/data/agentGameResources.ts",
  testing: "website/src/data/testingResources.ts",
  "testing-pack": "website/src/data/testingResources.ts",
  path: "website/src/data/plans.ts",
  step: "website/src/data/plans.ts",
  demo: "website/src/data/recordings.ts",
  collection: "website/src/data/communityResearch.ts",
  document: "docs/",
};
function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

/** Each original asset has one identity; all authored presentations remain addressable. */
export function collectDemos(sources: ContentSources): DemoContent[] {
  const ids = new Set<string>(),
    originals = new Set<string>();
  return sources.recordings.flatMap((recording) => {
    assertKeys(
      recording,
      { id: true, resourceId: true, originalUrl: true, views: true },
      `recording:${recording.id}`,
    );
    check(
      !ids.has(recording.id) && !originals.has(recording.originalUrl),
      `Duplicate original recording: ${recording.id}`,
    );
    ids.add(recording.id);
    originals.add(recording.originalUrl);
    check(
      recording.views.length,
      `Recording ${recording.id} needs a presentation`,
    );
    return recording.views.map((view) => {
      if (view.mobilePreview)
        assertKeys(
          view.mobilePreview,
          mobileKeys,
          `demo:${view.id}.mobilePreview`,
        );
      return {
        ...view,
        recordingId: recording.id,
        resourceId: recording.resourceId,
        originalUrl: recording.originalUrl,
      };
    });
  });
}

function appendGameplayScreenshot(
  entry: ContentEntry,
  media: LearningMedia | GameplayMedia,
  sourceKey: "learningMedia" | "researchGameMedia" | "gameplayScreenshots",
) {
  const complete =
    "provenance" in media ? gameplayMediaSchema.parse(media) : undefined;
  if (!complete)
    assertKeys(media, learningMediaKeys, `${sourceKey}:${entry.id}`);
  entry.blocks.push({
    type: "image",
    field: "gameplay",
    label: media.caption,
    src: /^(?:https?:|\/)/.test(media.src) ? media.src : publicAsset(media.src),
    alt: media.alt,
    source: media.sourceUrl,
    width: media.width,
    height: media.height,
    ...(complete ? { localizations: complete.localizations } : {}),
    credit:
      media.origin === "creator-screenshot"
        ? "Creator-published screenshot"
        : media.origin === "local-capture"
          ? "GameMap local capture"
          : "GameMap browser capture",
  });
  if (media.capturedAt)
    entry.blocks.push({
      type: "text",
      field: "captureDate",
      label: "Screenshot captured",
      value: media.capturedAt,
    });
  if (media.reviewedAt)
    entry.blocks.push({
      type: "text",
      field: "mediaReviewed",
      label: "Screenshot source reviewed",
      value: media.reviewedAt,
    });
  if (media.originalImageUrl)
    entry.blocks.push({
      type: "links",
      field: "originalImage",
      label: "Original creator image",
      items: [{ label: "Original creator image", url: media.originalImageUrl }],
    });
  if (complete)
    entry.blocks.push(
      {
        type: "links",
        field: "gameplayOriginalFiles",
        section: "provenance",
        label: "Screenshot source files",
        items: [
          {
            label: "Preserved original screenshot",
            url: publicAsset(complete.original.src),
          },
          {
            label: "Complete screenshot frame",
            url: publicAsset(complete.frame.src),
          },
          {
            label: "Screenshot provenance",
            url: publicAsset(complete.provenance.src),
          },
        ],
      },
      {
        type: "text",
        field: "gameplayRights",
        section: "provenance",
        label: "Screenshot rights",
        value: complete.rights.replace(
          "; no reuse permission or runtime certification is inferred.",
          ".",
        ),
      },
    );
}

export function createRegistry(
  sources: ContentSources,
  documents: readonly DocumentMetadata[],
): ContentRegistry {
  const entries: ContentEntry[] = [];
  const keys = new Map<string, ContentEntry>();
  const resourceIds = new Set(sources.resources.map((resource) => resource.id));
  const demos = collectDemos(sources);
  const demoById = new Map(demos.map((demo) => [demo.id, demo]));
  function add<K extends ContentKind>(
    kind: K,
    id: string,
    data: ContentModels[K],
    address: string,
  ) {
    check(id.trim() && !id.includes("#"), `Invalid ${kind} ID: ${id}`);
    const key = `${kind}:${id}` as const;
    check(
      !keys.has(key),
      `Duplicate content key: ${key}; records must never overwrite each other.`,
    );
    const blocks = presentFields(data, fieldRules[kind], key, sources);
    const title = blocks.find((block) => block.type === "title");
    const lead = blocks.find((block) => block.type === "lead");
    check(
      title?.type === "title" && lead?.type === "lead",
      `${key} requires a title and summary`,
    );
    const entry = {
      key,
      kind,
      id,
      title: title.value,
      description: lead.value,
      url: address,
      collectionUrl: pages[contentKinds[kind].page].path,
      data,
      blocks,
      source: sourcePaths[kind],
    } as ContentEntry<K>;
    entries.push(entry as ContentEntry);
    keys.set(key, entry as ContentEntry);
    return entry;
  }
  for (const item of sources.papers)
    add("paper", item.id, item, url.paper(item.id));
  for (const item of sources.threejsGames)
    add("threejs-game", item.id, item, url.threejsGame(item.id));
  for (const item of sources.resources) {
    const entry = add("resource", item.id, item, url.resource(item.id));
    const image = sources.projectMedia[item.id];
    if (image) {
      assertKeys(image, imageKeys, `projectMedia:${item.id}`);
      check(
        image.kind === "official-demo",
        `Unknown image classification for ${item.id}`,
      );
      entry.blocks.push({
        type: "image",
        field: "projectMedia",
        label: "Creator project media",
        src: image.src,
        alt: image.alt,
        source: image.source,
        credit: image.credit,
      });
    }
    const identity =
      sources.identities[item.id as keyof typeof sources.identities];
    if (identity) {
      assertKeys(identity, identityKeys, `identity:${item.id}`);
      entry.blocks.push({
        type: "text",
        field: "identity",
        label: "Identity & attribution",
        value: identity.notes,
      });
      entry.blocks.push({
        type: "links",
        field: "identitySource",
        label: "Identity evidence",
        items: [{ label: identity.organization, url: identity.sourceUrl }],
      });
    }
  }
  const caseIds = new Set(sources.learningPaths.map((item) => item.id));
  for (const [name, values, owners] of [
    ["projectMedia", sources.projectMedia, resourceIds],
    ["identities", sources.identities, resourceIds],
    ["learningMedia", sources.learningMedia, caseIds],
    [
      "researchGameMedia",
      sources.researchGameMedia,
      new Set(
        sources.repositoryResearch.records.map((item) => item.requested_repo),
      ),
    ],
  ] as const)
    for (const id of Object.keys(values))
      check(owners.has(id), `Orphan ${name} attachment: ${id}`);
  for (const id of Object.keys(sources.gameCaseAgents))
    check(caseIds.has(id), `Attribution refers to missing game case: ${id}`);
  for (const item of sources.learningPaths) {
    const attribution = sources.gameCaseAgents[item.id];
    if (item.category !== "community")
      check(
        attribution?.length,
        `Missing creator-attributed client/model mapping: ${item.id}`,
      );
    const entry = add("example", item.id, item, url.example(item.id));
    if (attribution?.length)
      entry.blocks.push({
        type: "list",
        field: "attribution",
        label: "Creator-reported clients and models",
        items: attribution.map((id) => {
          const name = sources.agentLabels[id];
          check(name, `Unknown attribution: ${id}`);
          return name;
        }),
      });
    const media = sources.learningMedia[item.id];
    if (item.category !== "community")
      check(media, `Missing gameplay screenshot: ${item.id}`);
    if (media) appendGameplayScreenshot(entry, media, "learningMedia");
    for (const id of item.resourceIds)
      check(
        resourceIds.has(id),
        `Missing related resource ${id} in ${item.id}`,
      );
  }
  for (const item of sources.foundationPaths)
    add("foundation", item.id, item, url.example(item.id));
  for (const item of sources.repositoryResearch.records) {
    const entry = add(
      "repository-research",
      item.requested_repo,
      item,
      url.research(item.requested_repo),
    );
    const media = sources.researchGameMedia[item.requested_repo];
    if (media) appendGameplayScreenshot(entry, media, "researchGameMedia");
  }
  for (const item of sources.agentGameResources) {
    if (item.catalogResourceId)
      check(
        resourceIds.has(item.catalogResourceId),
        `Missing catalog reference ${item.catalogResourceId}`,
      );
    add("agent", item.id, item, url.agent(item.id));
  }
  for (const item of sources.testingResources)
    add("testing", item.id, item, url.testing(item.id));
  for (const item of sources.testingStarterPacks)
    add("testing-pack", item.id, item, url.testingPack(item.id));
  for (const [track, nodes] of Object.entries(sources.plans) as [
    Dimension,
    ContentSources["plans"][Dimension],
  ][]) {
    check(track in tracks, `Unknown development track: ${track}`);
    const path = add(
      "path",
      track,
      sources.pathDefinitions?.[track] ?? { id: track, ...tracks[track] },
      url.path(track),
    );
    const art = sources.editorial[track];
    assertKeys(
      art,
      {
        src: true,
        title: true,
        description: true,
        alt: true,
        index: true,
        credit: true,
        sourceUrl: true,
      },
      `editorial:${track}`,
    );
    path.blocks.push({
      type: "image",
      field: "editorial",
      label: `Figure ${art.index} · ${art.title} — ${art.description}`,
      src: art.src,
      alt: art.alt,
      credit: art.credit || "Original GameMap artwork",
      ...(art.sourceUrl ? { source: art.sourceUrl } : {}),
    });
    const previews = sources.showcaseByTrack[track];
    assertKeys(
      previews,
      { label: true, promise: true, cases: true },
      `showcaseByTrack:${track}`,
    );
    path.blocks.push({
      type: "text",
      field: "previewPromise",
      label: previews.label,
      value: previews.promise,
    });
    path.blocks.push({
      type: "links",
      field: "previewSelection",
      label: "Selected project previews",
      items: previews.cases.map((id) => {
        const demo = demoById.get(id);
        check(demo, `Missing showcase selection ${id}`);
        return { label: demo.title, url: url.demo(id) };
      }),
    });
    for (const node of nodes)
      add(
        "step",
        `${track}/${node.id}`,
        { ...node, track },
        url.step(track, node.id),
      );
  }
  for (const item of demos) {
    check(
      resourceIds.has(item.resourceId),
      `Demo ${item.id} refers to missing resource ${item.resourceId}`,
    );
    const entry = add("demo", item.id, item, url.demo(item.id));
    entry.collectionUrl = url.resource(item.resourceId);
  }
  for (const item of sources.communityCollections)
    add("collection", item.id, item, url.collection(item.id));
  for (const item of documents) {
    const entry = add("document", item.slug, item, url.document(item.slug));
    if (item.slug.startsWith("zh/")) entry.collectionUrl = "/docs/zh/";
  }
  for (const [key, value] of Object.entries(
    sources.gameplayScreenshots || {},
  )) {
    const entry = keys.get(key);
    check(
      entry && ["example", "foundation", "threejs-game"].includes(entry.kind),
      `Orphan gameplay screenshot: ${key}`,
    );
    check(
      !entry.blocks.some((block) => block.field === "gameplay"),
      `Duplicate gameplay screenshot: ${key}`,
    );
    appendGameplayScreenshot(entry, value.media, "gameplayScreenshots");
    if (value.archivedPageCover) {
      const cover = anyPageCoverSchema.parse(value.archivedPageCover);
      entry.blocks.push({
        type: "links",
        field: "archivedPageCover",
        section: "provenance",
        label:
          cover.origin === "catalog-page-capture"
            ? "Earlier GameMap page screenshot"
            : "Earlier project page screenshot",
        items: [
          {
            label: "Original page capture",
            url: publicAsset(cover.original.src),
          },
        ],
      });
    }
  }
  for (const [key, value] of Object.entries(sources.pageCovers || {})) {
    const entry = keys.get(key);
    check(
      entry && ["example", "foundation", "threejs-game"].includes(entry.kind),
      `Orphan page cover: ${key}`,
    );
    check(
      !entry.blocks.some((block) => block.field === "gameplay"),
      `Page cover cannot replace reviewed gameplay: ${key}`,
    );
    const cover = anyPageCoverSchema.parse(value);
    entry.blocks.push(
      {
        type: "image",
        field: "pageCover",
        section: "media",
        label:
          cover.origin === "catalog-page-capture"
            ? "GameMap page screenshot"
            : "Project page screenshot",
        src: publicAsset(cover.src),
        alt: pageCoverAlt(cover.alt),
        source: /^(?:https?:)/.test(cover.sourceUrl)
          ? cover.sourceUrl
          : publicAsset(cover.sourceUrl),
        width: cover.width,
        height: cover.height,
      },
      {
        type: "text",
        field: "pageCoverCaptured",
        section: "provenance",
        label: "Page captured",
        value: cover.capturedAt,
      },
      {
        type: "links",
        field: "pageCoverOriginal",
        section: "provenance",
        label: "Original page capture",
        items: [
          {
            label: "Original page capture",
            url: publicAsset(cover.original.src),
          },
        ],
      },
      {
        type: "text",
        field: "pageCoverRights",
        section: "provenance",
        label: "Page cover rights",
        value:
          "Page text, logos, and images belong to their respective rights holders.",
      },
    );
    if (cover.origin === "catalog-page-capture")
      entry.blocks.push({
        type: "text",
        field: "pageCoverSnapshot",
        section: "provenance",
        label: "Source snapshot",
        value: `${cover.sourceSnapshot.releaseId} · ${cover.sourceSnapshot.artifactSha256} · ${cover.sourceSnapshot.recordRevision}`,
      });
  }
  const addresses = new Map<string, ContentEntry>();
  for (const entry of entries) {
    check(!addresses.has(entry.url), `Canonical URL collision: ${entry.url}`);
    addresses.set(entry.url, entry);
  }
  for (const entry of entries) {
    for (const block of entry.blocks)
      if (block.type === "links")
        for (const item of block.items) {
          const target = addresses.get(item.url);
          if (target && item.label === target.id) item.label = target.title;
        }
  }
  const researchListings = researchExampleListings(
    entries.filter(
      (entry): entry is ContentEntry<"repository-research"> =>
        entry.kind === "repository-research",
    ),
    entries.filter(
      (
        entry,
      ): entry is
        | ContentEntry<"example">
        | ContentEntry<"foundation">
        | ContentEntry<"threejs-game"> =>
        entry.kind === "example" ||
        entry.kind === "foundation" ||
        (entry.kind === "threejs-game" &&
          open3dImport.includedLegacyThreejsIds.includes(entry.id)),
    ),
  );
  const registry: ContentRegistry = {
    entries,
    get: <K extends ContentKind>(kind: K, id: string) =>
      keys.get(`${kind}:${id}`) as ContentEntry<K> | undefined,
    require: <K extends ContentKind>(kind: K, id: string) => {
      const entry = keys.get(`${kind}:${id}`);
      check(entry, `Content not registered: ${kind}:${id}`);
      return entry as ContentEntry<K>;
    },
    all: <K extends ContentKind>(kind: K) =>
      entries.filter((entry) => entry.kind === kind) as ContentEntry<K>[],
    byKey: (key) => keys.get(key),
    collectionDiscoveryFor: (entry) => {
      const listed = researchListings.get(entry.key);
      return listed
        ? {
            key: listed.key,
            url: localizedPath(listed.url, entry.locale || "en"),
            collectionUrl: localizedPath(
              pages.examples.path,
              entry.locale || "en",
            ),
          }
        : {
            key: entry.key,
            url: entry.url,
            collectionUrl: entry.collectionUrl,
          };
    },
    examplesFor: (ref) => {
      check(
        ref.kind === "resource" && resourceIds.has(ref.id),
        `Invalid resource reference: ${ref.kind}:${ref.id}`,
      );
      return entries.filter(
        (entry) =>
          entry.kind === "example" && entry.data.resourceIds.includes(ref.id),
      ) as ContentEntry<"example">[];
    },
    demosFor: (resourceId) =>
      entries.filter(
        (entry) =>
          entry.kind === "demo" && entry.data.resourceId === resourceId,
      ) as ContentEntry<"demo">[],
    attributionFor: (exampleId) => sources.gameCaseAgents[exampleId] || [],
  };
  assertRegistryCoverage(sources, documents, registry);
  return registry;
}

/** Inventory is read from raw collections, independently of registry presentation. */
export function expectedContentKeys(
  sources: ContentSources,
  documents: readonly DocumentMetadata[],
) {
  return [
    ...sources.papers.map((item) => `paper:${item.id}`),
    ...sources.threejsGames.map((item) => `threejs-game:${item.id}`),
    ...sources.repositoryResearch.records.map(
      (item) => `repository-research:${item.requested_repo}`,
    ),
    ...sources.resources.map((item) => `resource:${item.id}`),
    ...sources.learningPaths.map((item) => `example:${item.id}`),
    ...sources.foundationPaths.map((item) => `foundation:${item.id}`),
    ...sources.agentGameResources.map((item) => `agent:${item.id}`),
    ...sources.testingResources.map((item) => `testing:${item.id}`),
    ...sources.testingStarterPacks.map((item) => `testing-pack:${item.id}`),
    ...Object.entries(sources.plans).flatMap(([track, steps]) => [
      `path:${track}`,
      ...steps.map((step) => `step:${track}/${step.id}`),
    ]),
    ...sources.recordings.flatMap((recording) =>
      recording.views.map((view) => `demo:${view.id}`),
    ),
    ...sources.communityCollections.map((item) => `collection:${item.id}`),
    ...documents.map((item) => `document:${item.slug}`),
  ];
}
export function assertRegistryCoverage(
  sources: ContentSources,
  documents: readonly DocumentMetadata[],
  registry: Pick<ContentRegistry, "entries">,
) {
  const expected = expectedContentKeys(sources, documents);
  check(
    new Set(expected).size === expected.length,
    "Duplicate IDs in source inventory",
  );
  const actual = new Set<string>(registry.entries.map((entry) => entry.key));
  check(
    actual.size === registry.entries.length,
    "Duplicate IDs in registered content",
  );
  const missing = expected.filter((key) => !actual.has(key));
  const unexpected = [...actual].filter((key) => !expected.includes(key));
  check(
    !missing.length && !unexpected.length,
    `Content coverage mismatch. Missing: ${missing.join(", ")}. Unexpected: ${unexpected.join(", ")}`,
  );
  for (const entry of registry.entries) {
    const path = entry.url.split("#")[0];
    if (
      ["document", "step", "path", "collection", "testing-pack"].includes(
        entry.kind,
      )
    )
      continue;
    check(
      detailRoutes.some(
        (route) =>
          (route.kinds as readonly string[]).includes(entry.kind) &&
          path.startsWith(route.path.split(/[:*]/)[0]),
      ),
      `No detail route for ${entry.key}`,
    );
  }
}
export function staticPagePaths(registry: ContentRegistry) {
  const original = [
    ...Object.values(pages).map((page) => page.path),
    ...registry.entries
      .filter((entry) => entry.kind !== "path" && entry.kind !== "step")
      .map((entry) => entry.url.split("#")[0]),
    // Prerender the old addresses as redirects on static hosts as well.
    ...registry
      .all("threejs-game")
      .map(
        (entry) => `${pages.threejsGames.path}${encodeURIComponent(entry.id)}/`,
      ),
  ];
  const documents = documentLanguages(
    registry.all("document").map((entry) => entry.data),
  );
  return [
    ...new Set([
      ...original,
      ...original.map((path) => localizedPath(path, "zh", documents)),
      "/zh/docs/",
      "/zh/404/",
      ...Object.keys(documentRedirects),
    ]),
  ];
}
export function contentManifest(registry: ContentRegistry) {
  return registry.entries.map(
    ({
      key,
      kind,
      id,
      title,
      description,
      url,
      collectionUrl,
      blocks,
      source,
    }) => ({
      key,
      kind,
      id,
      title,
      description,
      url,
      collectionUrl,
      blocks,
      source,
    }),
  );
}
