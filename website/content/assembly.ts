import type { ContentSources } from "./source-data";
import type {
  ContentKind,
  ContentEntry,
  DocumentMetadata,
  PathContent,
} from "./models";
import type { Dimension } from "../src/types";

export interface SnapshotRecord {
  key: string;
  kind: ContentKind;
  identifier: string;
  canonical_path: string;
  collection_path: string;
  schema_version: number;
  owner: "database" | "git";
  revision_id: string;
  fingerprint: string;
  body: {
    title: string;
    summary: string;
    payload: unknown;
    attachments: Record<string, unknown>;
  };
}
export interface SourceConfiguration {
  version: 1;
  research: Omit<ContentSources["repositoryResearch"], "records">;
  agentLabels: ContentSources["agentLabels"];
  agentResourceKinds: ContentSources["agentResourceKinds"];
  testingKinds: ContentSources["testingKinds"];
  testingUses: ContentSources["testingUses"];
  testingTerms: ContentSources["testingTerms"];
  order: string[];
}
export function configurationFromSources(
  sources: ContentSources,
  entries: readonly ContentEntry[],
): SourceConfiguration {
  const { records: _records, ...research } = sources.repositoryResearch;
  return {
    version: 1,
    research,
    agentLabels: sources.agentLabels,
    agentResourceKinds: sources.agentResourceKinds,
    testingKinds: sources.testingKinds,
    testingUses: sources.testingUses,
    testingTerms: sources.testingTerms,
    order: entries.map((entry) => entry.key),
  };
}

/** Rehydrate selected revisions only. No missing business row is filled from a Git catalog. */
export function assembleSources(
  records: readonly SnapshotRecord[],
  configuration: SourceConfiguration,
) {
  if (configuration.version !== 1)
    throw new Error("Unsupported source configuration");
  const rank = new Map(configuration.order.map((key, index) => [key, index]));
  const ordered = [...records].sort(
    (a, b) =>
      (rank.get(a.key) ?? Infinity) - (rank.get(b.key) ?? Infinity) ||
      a.key.localeCompare(b.key),
  );
  const empty = {
    resources: [],
    repositoryResearch: { ...configuration.research, records: [] },
    learningPaths: [],
    foundationPaths: [],
    communityCollections: [],
    agentGameResources: [],
    gameCaseAgents: {},
    agentLabels: configuration.agentLabels,
    agentResourceKinds: configuration.agentResourceKinds,
    testingResources: [],
    testingStarterPacks: [],
    testingKinds: configuration.testingKinds,
    testingUses: configuration.testingUses,
    testingTerms: configuration.testingTerms,
    plans: { "2d": [], "3d": [], world: [] },
    recordings: [],
    showcaseByTrack: {},
    projectMedia: {},
    learningMedia: {},
    editorial: {},
    identities: {},
    pathDefinitions: {},
  };
  const sources = empty as unknown as ContentSources;
  const documents: DocumentMetadata[] = [];
  const paths: Partial<Record<Dimension, PathContent>> = {};
  const keys = new Set<string>();
  for (const record of ordered) {
    if (keys.has(record.key))
      throw new Error(`Duplicate snapshot record: ${record.key}`);
    keys.add(record.key);
    const data = record.body.payload;
    const attachments = record.body.attachments;
    const id = record.identifier;
    // These adapters deliberately target typed collections consumed by the existing renderer.
    // New kinds must implement a renderer/assembly adapter, not fall back to arbitrary JSON.
    switch (record.kind) {
      case "resource":
        sources.resources.push(data as ContentSources["resources"][number]);
        if (attachments.identity)
          sources.identities[id as keyof typeof sources.identities] =
            attachments.identity as never;
        if (attachments.projectMedia)
          sources.projectMedia[id] = attachments.projectMedia as never;
        break;
      case "example":
        sources.learningPaths.push(
          data as ContentSources["learningPaths"][number],
        );
        sources.learningMedia[id] = attachments.learningMedia as never;
        sources.gameCaseAgents[id] = attachments.agentAttribution as never;
        break;
      case "foundation":
        sources.foundationPaths.push(
          data as ContentSources["foundationPaths"][number],
        );
        break;
      case "agent":
        sources.agentGameResources.push(
          data as ContentSources["agentGameResources"][number],
        );
        break;
      case "testing":
        sources.testingResources.push(
          data as ContentSources["testingResources"][number],
        );
        break;
      case "testing-pack":
        sources.testingStarterPacks.push(
          data as ContentSources["testingStarterPacks"][number],
        );
        break;
      case "repository-research":
        sources.repositoryResearch.records.push(
          data as ContentSources["repositoryResearch"]["records"][number],
        );
        break;
      case "collection":
        sources.communityCollections.push(
          data as ContentSources["communityCollections"][number],
        );
        break;
      case "document":
        documents.push(data as DocumentMetadata);
        break;
      case "step": {
        const { track, ...node } = data as ContentEntry<"step">["data"];
        if (!sources.plans[track])
          throw new Error(`Unsupported development track: ${track}`);
        sources.plans[track].push(node);
        break;
      }
      case "path": {
        const path = data as PathContent;
        paths[path.id] = path;
        sources.editorial[path.id] = attachments.editorial as never;
        sources.showcaseByTrack[path.id] = attachments.showcase as never;
        break;
      }
      case "demo": {
        const { recordingId, resourceId, originalUrl, ...view } =
          data as ContentEntry<"demo">["data"];
        let original = sources.recordings.find((row) => row.id === recordingId);
        if (!original) {
          original = { id: recordingId, resourceId, originalUrl, views: [] };
          sources.recordings.push(original);
        }
        if (
          original.resourceId !== resourceId ||
          original.originalUrl !== originalUrl
        )
          throw new Error(`Conflicting recording identity: ${recordingId}`);
        original.views.push(view);
        break;
      }
      default:
        throw new Error(`Unsupported snapshot content kind: ${record.kind}`);
    }
  }
  for (const track of ["2d", "3d", "world"] as const)
    if (!paths[track]) throw new Error(`Missing development path: ${track}`);
  sources.pathDefinitions = paths as Record<Dimension, PathContent>;
  return { sources, documents };
}
