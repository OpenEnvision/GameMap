import type { Resource, Dimension } from "../src/types";
import type { LearningPath } from "../src/data/learningTypes";
import type { AgentGameResource } from "../src/data/agentGameTypes";
import type {
  TestingResource,
  TestingStarterPack,
} from "../src/data/testingTypes";
import type { PlanNode } from "../src/data/plans";
import type { CommunityCollection } from "../src/data/communityResearch";
import type { PaperReference } from "./papers";
import type repositoryResearch from "../../data/segments/repository-research.json";
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
  recordingId: string;
  id: string;
  resourceId: string;
  title: string;
  description: string;
  track: Dimension;
  role: "excerpt" | "source-recording";
  demoType?: "gameplay" | "assets" | "scenes" | "world-model" | "workflow";
  engine?: string;
  exampleId?: string;
  limitations?: string;
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
  paper: PaperReference;
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
  paper: { label: "Research reference", plural: "Paper List", page: "papers" },
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
  document: { label: "Document", plural: "Guides & Notes", page: "docs" },
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
export type ContentSection =
  "intro" | "media" | "guidance" | "resources" | "provenance" | "metadata";
export type ContentBlock = BlockValue & {
  field: string;
  section?: ContentSection;
  language?: import("./locale").Locale;
};
export type FieldRule<T, K extends keyof T> =
  | { skip: string }
  | {
      section?: ContentSection;
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
  locale?: import("./locale").Locale;
  originalTitle?: string;
  descriptionLanguage?: import("./locale").Locale;
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
  examplesFor(ref: { kind: "resource"; id: string }): ContentEntry<"example">[];
  demosFor(resourceId: string): ContentEntry<"demo">[];
  attributionFor(
    exampleId: string,
  ): readonly ContentModels["agent"]["agents"][number][];
}
