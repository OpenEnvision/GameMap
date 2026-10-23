import type { PayloadModels } from "./contracts";
export type ContentModels = PayloadModels;
export type RepositoryResearchRecord = PayloadModels["repository-research"];
export type DocumentMetadata = PayloadModels["document"];
export type PathContent = PayloadModels["path"];
export type StepContent = PayloadModels["step"];
export type DemoContent = PayloadModels["demo"];
export type ContentKind = keyof ContentModels;
export interface ContentKindDefinition {
  label: string;
  plural: string;
  page: import("./site").PageId;
  owner: "database" | "git";
  schemaVersion: number;
  validatorKey: string;
}
/** UI, import, and database registry checks share these versioned kind declarations. */
export const contentKinds = {
  resource: {
    label: "Resource", plural: "Resources", page: "resources",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.resource",
  },
  example: {
    label: "Game example", plural: "Game examples", page: "examples",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.example",
  },
  foundation: {
    label: "Engine foundation", plural: "Engine foundations", page: "examples",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.foundation",
  },
  agent: {
    label: "Agent resource", plural: "Agent toolkit", page: "agents",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.agent",
  },
  testing: {
    label: "Testing resource", plural: "Testing library", page: "testing",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.testing",
  },
  "testing-pack": {
    label: "Testing starter", plural: "Testing starter tasks", page: "testing",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.testing-pack",
  },
  "repository-research": {
    label: "Repository research record", plural: "Repository research", page: "research",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.repository-research",
  },
  path: {
    label: "Development path", plural: "Development paths", page: "paths",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.path",
  },
  step: {
    label: "Path step", plural: "Steps & checkpoints", page: "paths",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.step",
  },
  demo: {
    label: "Project demo", plural: "Project demos", page: "demos",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.demo",
  },
  collection: {
    label: "Discovery collection", plural: "Community discovery", page: "examples",
    owner: "database", schemaVersion: 1, validatorKey: "gamemap.collection",
  },
  document: {
    label: "Document", plural: "Guides & notes", page: "docs",
    owner: "git", schemaVersion: 1, validatorKey: "gamemap.document",
  },
} as const satisfies Record<ContentKind, ContentKindDefinition>;

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
