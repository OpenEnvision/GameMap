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
import { pages, tracks, url, detailRoutes } from "./site";
import type { Dimension } from "../src/types";
import type { ProjectVideoData } from "../src/data/projectVideos";
import type { ShowcaseCase } from "../src/data/showcase";
import type { LearningMedia } from "../src/data/learningMedia";
import type { ResourceIdentity } from "../src/data/resourceIdentities";
import { publicAsset } from "../src/publicAsset";

const videoKeys = {
  previewSrc: true,
  heroSrc: true,
  src: true,
  title: true,
  description: true,
  source: true,
  credit: true,
  track: true,
} satisfies Record<keyof ProjectVideoData, true>;
const showcaseKeys = {
  id: true,
  resourceId: true,
  name: true,
  description: true,
  poster: true,
  alt: true,
  video: true,
  prompt: true,
  aspectRatio: true,
  mobilePreview: true,
} satisfies Record<keyof ShowcaseCase, true>;
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
  resource: "website/src/data/resources.json",
  example: "website/src/data/learningPaths.ts",
  foundation: "website/src/data/learningPaths.ts",
  "repository-research": "data/research/cadle-repositories.json",
  agent: "website/src/data/agentGameResources.ts",
  testing: "website/src/data/testingResources.ts",
  "testing-pack": "website/src/data/testingResources.ts",
  path: "website/src/data/plans.ts",
  step: "website/src/data/plans.ts",
  demo: "website/src/data/showcase.ts + projectVideos.ts",
  collection: "website/src/data/communityResearch.ts",
  document: "docs/",
};
function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

/** No deduplication by resourceId: one project can have several distinct recordings. */
export function collectDemos(sources: ContentSources): DemoContent[] {
  const demos: DemoContent[] = [];
  for (const item of Object.values(sources.showcaseCases)) {
    assertKeys(item, showcaseKeys, `showcase:${item.id}`);
    assertKeys(item.video, videoKeys, `showcase:${item.id}.video`);
    check(
      item.video.title === item.name &&
        item.video.description === item.description,
      `showcase:${item.id}: recording and case descriptions differ; extend the explicit presentation instead of dropping either.`,
    );
    if (item.mobilePreview)
      assertKeys(
        item.mobilePreview,
        mobileKeys,
        `showcase:${item.id}.mobilePreview`,
      );
    demos.push({
      id: item.id,
      resourceId: item.resourceId,
      title: item.name,
      description: item.description,
      role: "excerpt",
      alt: item.alt,
      track: item.video.track,
      previewSrc: item.video.previewSrc,
      poster: item.poster,
      originalUrl: item.video.src,
      sourceUrl: item.video.source,
      credit: item.video.credit,
      alternatePreviewUrl: item.video.heroSrc,
      aspectRatio: item.aspectRatio,
      mobilePreview: item.mobilePreview,
      prompt: item.prompt,
    });
  }
  for (const [resourceId, item] of Object.entries(sources.projectVideos)) {
    assertKeys(item, videoKeys, `projectVideo:${resourceId}`);
    demos.push({
      id: "recording-" + resourceId,
      resourceId,
      title: item.title,
      description: item.description,
      role: "source-recording",
      track: item.track,
      previewSrc: item.previewSrc,
      poster: sources.projectMedia[resourceId]?.src,
      alt: sources.projectMedia[resourceId]?.alt,
      originalUrl: item.src,
      sourceUrl: item.source,
      credit: item.credit,
      alternatePreviewUrl: item.heroSrc,
    });
  }
  return demos;
}

export function createRegistry(
  sources: ContentSources,
  documents: readonly DocumentMetadata[],
): ContentRegistry {
  const entries: ContentEntry[] = [];
  const keys = new Map<string, ContentEntry>();
  const resourceIds = new Set(sources.resources.map((resource) => resource.id));
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
    const blocks = presentFields(data, fieldRules[kind], key);
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
  ] as const)
    for (const id of Object.keys(values))
      check(owners.has(id), `Orphan ${name} attachment: ${id}`);
  for (const id of Object.keys(sources.gameCaseAgents))
    check(caseIds.has(id), `Attribution refers to missing game case: ${id}`);
  for (const item of sources.learningPaths) {
    const attribution = sources.gameCaseAgents[item.id];
    check(
      attribution?.length,
      `Missing creator-attributed client/model mapping: ${item.id}`,
    );
    const entry = add("example", item.id, item, url.example(item.id));
    entry.blocks.push({
      type: "list",
      field: "attribution",
      label:
        "Creator-attributed clients / models (not inferred from related tools)",
      items: attribution.map((id) => {
        const name = sources.agentLabels[id];
        check(name, `Unknown attribution: ${id}`);
        return name;
      }),
    });
    const media = sources.learningMedia[item.id];
    check(media, `Missing gameplay screenshot: ${item.id}`);
    assertKeys(media, learningMediaKeys, `learningMedia:${item.id}`);
    entry.blocks.push({
      type: "image",
      field: "gameplay",
      label: media.caption,
      src: /^(?:https?:|\/)/.test(media.src)
        ? media.src
        : publicAsset(media.src),
      alt: media.alt,
      source: media.sourceUrl,
      width: media.width,
      height: media.height,
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
        items: [
          { label: "Original creator image", url: media.originalImageUrl },
        ],
      });
    for (const id of item.resourceIds)
      check(
        resourceIds.has(id),
        `Missing related resource ${id} in ${item.id}`,
      );
  }
  for (const item of sources.foundationPaths)
    add("foundation", item.id, item, url.example(item.id));
  for (const item of sources.repositoryResearch.records)
    add(
      "repository-research",
      item.requested_repo,
      item,
      url.research(item.requested_repo),
    );
  for (const item of sources.agentGameResources)
    add("agent", item.id, item, url.agent(item.id));
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
      { id: track, ...tracks[track] },
      url.path(track),
    );
    const art = sources.editorial[track];
    assertKeys(
      art,
      { src: true, title: true, description: true, alt: true, index: true },
      `editorial:${track}`,
    );
    path.blocks.push({
      type: "image",
      field: "editorial",
      label: `Figure ${art.index} · ${art.title} — ${art.description}`,
      src: art.src,
      alt: art.alt,
      credit: "Original GameMap artwork",
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
        const demo = sources.showcaseCases[id];
        check(demo, `Missing showcase selection ${id}`);
        return { label: demo.name, url: url.demo(id) };
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
  for (const item of collectDemos(sources)) {
    check(
      resourceIds.has(item.resourceId),
      `Demo ${item.id} refers to missing resource ${item.resourceId}`,
    );
    add("demo", item.id, item, url.demo(item.id));
  }
  for (const item of sources.communityCollections)
    add("collection", item.id, item, url.collection(item.id));
  for (const item of documents)
    add("document", item.slug, item, url.document(item.slug));
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
    ...Object.keys(sources.showcaseCases).map((id) => `demo:${id}`),
    ...Object.keys(sources.projectVideos).map((id) => `demo:recording-${id}`),
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
    if (["document", "step", "collection", "testing-pack"].includes(entry.kind))
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
  return [
    ...new Set([
      ...Object.values(pages).map((page) => page.path),
      ...registry.entries.map((entry) => entry.url.split("#")[0]),
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
