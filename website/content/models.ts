import type { Resource, Dimension } from "../src/types";
import type { LearningPath } from "../src/data/learningTypes";
import type { AgentGameResource } from "../src/data/agentGameTypes";
import type {
  TestingResource,
  TestingStarterPack,
} from "../src/data/testingTypes";
import type { PlanNode } from "../src/data/plans";
import type { CommunityCollection } from "../src/data/communityResearch";
import type repositoryResearch from "../../data/research/cadle-repositories.json";
export type RepositoryResearchRecord =
  (typeof repositoryResearch.records)[number];

export interface DocumentMetadata {
  slug: string;
  title: string;
  label: string;
  description: string;
  group: string;
  source: string;
  sourceHash: string;
}
export interface PathContent {
  id: Dimension;
  title: string;
  description: string;
}
export interface StepContent extends PlanNode {
  track: Dimension;
}
export interface DemoContent {
  id: string;
  resourceId: string;
  title: string;
  description: string;
  track: Dimension;
  role: "excerpt" | "source-recording";
  alt?: string;
  previewSrc: string;
  poster?: string;
  originalUrl: string;
  sourceUrl: string;
  credit: string;
  alternatePreviewUrl?: string;
  prompt?: string;
  aspectRatio?: number;
  mobilePreview?: { src: string; poster: string; aspectRatio: number };
}
export interface ContentModels {
  resource: Resource;
  example: LearningPath;
  foundation: LearningPath;
  agent: AgentGameResource;
  testing: TestingResource;
  "testing-pack": TestingStarterPack;
  "repository-research": RepositoryResearchRecord;
  path: PathContent;
  step: StepContent;
  demo: DemoContent;
  collection: CommunityCollection;
  document: DocumentMetadata;
}
export type ContentKind = keyof ContentModels;
export const contentKinds = {
  resource: { label: "Resource", plural: "Resources", page: "resources" },
  example: { label: "Game example", plural: "Game examples", page: "examples" },
  foundation: {
    label: "Engine foundation",
    plural: "Engine foundations",
    page: "examples",
  },
  agent: { label: "Agent resource", plural: "Agent toolkit", page: "agents" },
  testing: {
    label: "Testing resource",
    plural: "Testing library",
    page: "testing",
  },
  "testing-pack": {
    label: "Testing starter",
    plural: "Testing starter tasks",
    page: "testing",
  },
  "repository-research": {
    label: "Repository research record",
    plural: "Repository research",
    page: "research",
  },
  path: {
    label: "Development path",
    plural: "Development paths",
    page: "paths",
  },
  step: { label: "Path step", plural: "Steps & checkpoints", page: "paths" },
  demo: { label: "Project demo", plural: "Project demos", page: "demos" },
  collection: {
    label: "Discovery collection",
    plural: "Community discovery",
    page: "examples",
  },
  document: { label: "Document", plural: "Guides & notes", page: "docs" },
} as const satisfies Record<
  ContentKind,
  { label: string; plural: string; page: import("./site").PageId }
>;

type TextBlock = {
  type: "title" | "lead" | "text";
  label?: string;
  value: string;
};
type ListBlock = {
  type: "list";
  label: string;
  items: string[];
  ordered?: boolean;
};
type LinkBlock = {
  type: "links";
  label: string;
  items: { label: string; url: string; note?: string }[];
};
type ImageBlock = {
  type: "image";
  label: string;
  src: string;
  alt: string;
  source?: string;
  credit?: string;
  width?: number;
  height?: number;
};
type VideoBlock = {
  type: "video";
  label: string;
  src: string;
  poster?: string;
  aspectRatio?: number;
  mobile?: DemoContent["mobilePreview"];
};
export type Fact =
  | { type: "text"; label: string; value: string }
  | { type: "link"; label: string; url: string }
  | { type: "group"; label: string; items: Fact[] };
type FactsBlock = { type: "facts"; label: string; items: Fact[] };
export type BlockValue =
  TextBlock | ListBlock | LinkBlock | ImageBlock | VideoBlock | FactsBlock;
export type ContentBlock = BlockValue & { field: string };
export type FieldRule<T, K extends keyof T> =
  | { skip: string }
  | {
      includeNull?: boolean;
      present: (value: T[K], record: T) => BlockValue[];
    };
export type FieldRules<T> = { [K in keyof T]-?: FieldRule<T, K> };
export interface BaseContent<K extends ContentKind> {
  key: `${K}:${string}`;
  id: string;
  kind: K;
  title: string;
  description: string;
  url: string;
  collectionUrl: string;
  blocks: ContentBlock[];
  source: string;
  data: ContentModels[K];
}
export type ContentEntry<K extends ContentKind = ContentKind> = {
  [P in K]: BaseContent<P>;
}[K];
export interface ContentRegistry {
  entries: readonly ContentEntry[];
  get<K extends ContentKind>(kind: K, id: string): ContentEntry<K> | undefined;
  require<K extends ContentKind>(kind: K, id: string): ContentEntry<K>;
  all<K extends ContentKind>(kind: K): ContentEntry<K>[];
  byKey(key: string): ContentEntry | undefined;
  demosFor(resourceId: string): ContentEntry<"demo">[];
  attributionFor(
    exampleId: string,
  ): readonly ContentModels["agent"]["agents"][number][];
}
