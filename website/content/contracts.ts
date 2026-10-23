import { z } from "zod";
import taxonomy from "./taxonomy.json";
import { agentLabels, agentResourceKinds } from "../src/data/agentGameTypes";
import {
  testingKinds,
  testingUses,
  testingTerms,
} from "../src/data/testingTypes";

const keys = <T extends Record<string, unknown>>(value: T) =>
  Object.keys(value) as [keyof T & string, ...(keyof T & string)[]];
const text = z.string().trim().min(1);
const optionalText = z.string().nullable().optional();
const identifier = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const url = z.url({ protocol: /^https?$/ }).refine((value) => {
  try {
    const parsed = new URL(value);
    return !parsed.username && !parsed.password;
  } catch {
    return false;
  }
}, "Use a public HTTP(S) URL without embedded credentials");
const date = z.iso.date();
const strings = z.array(text);
const unique = <T extends z.ZodType>(schema: T) =>
  z
    .array(schema)
    .refine(
      (values) => new Set(values).size === values.length,
      "Duplicate values are not allowed",
    );
// Images are versioned release assets; original remote recordings remain attributed external references.
const media = text.regex(
  /^\/?(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[^:?#\\]+$/,
  "Use versioned local media; retain external originals in the source URL field",
);
const imageMedia = media
  .regex(/\.(png|jpe?g|webp|svg)$/i, "Use an image asset")
  .meta({ "x-media-type": "image" });
const videoMedia = text
  .refine((value) => {
    if (media.safeParse(value).success) return /\.(mp4|webm)$/i.test(value);
    try {
      return (
        url.safeParse(value).success &&
        /\.(mp4|webm)$/i.test(new URL(value).pathname)
      );
    } catch {
      return false;
    }
  }, "Use a versioned local video or the original attributed HTTP(S) recording")
  .meta({ "x-media-type": "video" });
const link = z.strictObject({ label: text, url });
const dimension = z.enum(keys(taxonomy.dimensions));
const stage = z.enum(keys(taxonomy.stages));
const access = z.strictObject({
  label: text,
  url: url.optional(),
  kind: z.enum(keys(taxonomy.accessKinds)),
  note: text,
});

const resourceV1 = z.strictObject({
  id: identifier,
  name: text,
  category: z.enum(keys(taxonomy.categories)),
  type: z.enum(keys(taxonomy.types)),
  summary: text,
  detail: text,
  url: url.refine(
    (value) => /^https:\/\//i.test(value),
    "Resource homepages require HTTPS",
  ),
  links: z.array(link).optional(),
  tags: unique(text).min(1),
  stages: unique(stage).min(1),
  dimensions: unique(dimension).min(1),
  year: z.number().int().min(1990).max(2200).optional(),
  verified: date,
  access: z
    .strictObject({ tutorial: access, demo: access, source: access })
    .optional(),
});
const exampleV1 = z.strictObject({
  id: identifier,
  title: text,
  description: text,
  engine: text,
  track: z.enum(["2d", "3d"]),
  category: z.enum(["ai-generated", "ai-assisted", "foundation"]),
  aiUse: text,
  steps: strings.min(1),
  tutorial: z.strictObject({
    label: text,
    url,
    kind: z
      .enum(["prompt", "build-log", "tutorial", "quickstart", "disclosure"])
      .optional(),
  }),
  demo: z.strictObject({
    label: text,
    url,
    kind: z.enum(["playable", "download"]),
    note: text,
  }),
  source: z.strictObject({
    label: text,
    url,
    note: text,
    scope: z.enum(["complete-project", "game-code-greybox"]).optional(),
  }),
  evidence: z.strictObject({ label: text, url, note: text }).optional(),
  resourceIds: unique(identifier),
});
const agentV1 = z.strictObject({
  id: identifier,
  catalogResourceId: identifier.optional(),
  title: text,
  kind: z.enum(keys(agentResourceKinds)),
  agents: unique(z.enum(keys(agentLabels))).min(1),
  engine: text,
  summary: text,
  sourceUrl: url,
  codeUrl: url,
  evidenceUrl: url,
  codeType: z.enum(["implementation", "instructions", "mixed"]),
  codeScope: text,
  limitations: text,
  publisher: text,
  official: z.boolean(),
  reviewed: date,
});
const testingV1 = z.strictObject({
  id: identifier,
  title: text,
  kind: z.enum(keys(testingKinds)),
  uses: unique(z.enum(keys(testingUses))).min(1),
  dimensions: unique(z.enum(["2d", "3d"])).min(1),
  stack: text,
  summary: text,
  sourceUrl: url,
  access: z.strictObject({ label: text, url, note: text }),
  codeLicense: text,
  assetLicense: text,
  terms: z.enum(keys(testingTerms)),
  licenseUrl: url,
  evidence: z.array(link).min(1),
  aiUseNote: text,
  testTasks: strings.min(1),
  setup: strings.min(1),
  limitations: text,
  reviewed: date,
});
const testingPackV1 = z.strictObject({
  id: identifier,
  use: z.enum(keys(testingUses)),
  title: text,
  resources: text,
  task: text,
  measure: text,
});
const pathV1 = z.strictObject({
  id: dimension,
  title: text,
  description: text,
});
const stepV1 = z.strictObject({
  id: identifier,
  title: text,
  subtitle: text,
  tags: unique(text),
  stage,
  description: text,
  deliverable: text,
  check: text,
  track: dimension,
});
const responsive = z.strictObject({
  src: videoMedia,
  poster: imageMedia,
  aspectRatio: z.number().positive(),
});
const demoV1 = z.strictObject({
  recordingId: identifier,
  id: identifier,
  resourceId: identifier,
  title: text,
  description: text,
  track: dimension,
  role: z.enum(["excerpt", "source-recording"]),
  alt: text.optional(),
  previewSrc: videoMedia,
  poster: imageMedia.optional(),
  originalUrl: url,
  sourceUrl: url,
  credit: text,
  alternatePreviewUrl: url.optional(),
  prompt: text.optional(),
  aspectRatio: z.number().positive().optional(),
  mobilePreview: responsive.optional(),
});
const collectionV1 = z.strictObject({
  id: identifier,
  title: text,
  url,
  description: text,
});
const documentV1 = z.strictObject({
  slug: text.regex(/^[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/),
  title: text,
  label: text,
  description: text,
  group: text,
  source: text,
  sourceMode: z.enum(["git", "generated"]),
  generatorKey: text.optional(),
  sourceHash: text.regex(/^[a-f0-9]{64}$/),
});
const revision = z
  .union([
    z.string(),
    z.strictObject({
      kind: z.string().optional(),
      sha: z.string().nullable().optional(),
      branch: optionalText,
      path: optionalText,
      note: optionalText,
    }),
  ])
  .nullable();
const researchV1 = z.strictObject({
  requested_repo: text,
  canonical_repo: z.string().nullable(),
  group: text,
  checked_at: date,
  review_status: z.enum(["source-reviewed", "metadata-only", "unavailable"]),
  inspection_scope: text,
  availability: text,
  disposition: text,
  summary: text,
  license_note: text,
  ai_note: text,
  limitations: strings,
  source_urls: z.array(url),
  revision,
  readme_blob_sha: z.string().nullable(),
  maintainer: z.strictObject({
    login: text.nullable(),
    display_name: z.string().nullable(),
    relationship: text.optional(),
    owner_type: optionalText,
    source_url: url.optional(),
    display_name_note: optionalText,
    url: url.optional(),
  }),
  owner_type: z.string().nullable(),
  archived: z.boolean().nullable(),
  is_fork: z.boolean().nullable(),
  parent_repo: z.string().nullable(),
  repository_id: z.union([z.number(), z.string()]).nullable(),
  existing_locations: strings,
  related_existing_entries: z.array(
    z.strictObject({ id: text, path: text, relationship: text, note: text }),
  ),
  related_repositories: z.array(
    z.strictObject({
      repo: text,
      relationship: text,
      note: text.optional(),
      path: z.string().optional(),
    }),
  ),
  alternative_repo: z.string().nullable(),
  alternative_url: url.nullable(),
  metadata_scope: z.string().nullable(),
  execution_validation: z.literal("not_run"),
  historical_source: z
    .strictObject({
      repository: text,
      commit: text,
      path: text,
      url,
      directory_entries: strings,
      package_name: z.string().optional(),
      package_version: z.string().optional(),
    })
    .optional(),
  historical_pointer: z
    .strictObject({
      commit: text,
      readme_blob_sha: text,
      url,
      commit_url: url,
      date: z.string().optional(),
      official_demo_link: url.optional(),
      demo_checked: z.boolean().optional(),
    })
    .optional(),
  source_evidence: z
    .array(
      z.strictObject({
        path: text.nullable(),
        line_start: z.number().int().positive().nullable(),
        line_end: z.number().int().positive().nullable(),
        url,
        finding: text,
      }),
    )
    .optional(),
  remaining_unknowns: strings.optional(),
  alternative_maintenance_evidence: z
    .strictObject({
      repository: text,
      pull_request: z.union([text, z.number()]),
      title: text,
      merged_at: text,
      merge_commit_sha: text,
      old_link: text,
      replacement_link: text,
      attribution: text,
    })
    .optional(),
});

// Active authoring pointers. Append a new handler below before advancing one pointer.
export const payloadSchemas = {
  resource: resourceV1,
  example: exampleV1,
  foundation: exampleV1,
  agent: agentV1,
  testing: testingV1,
  "testing-pack": testingPackV1,
  "repository-research": researchV1,
  path: pathV1,
  step: stepV1,
  demo: demoV1,
  collection: collectionV1,
  document: documentV1,
};
export type PayloadModels = {
  [K in keyof typeof payloadSchemas]: z.infer<(typeof payloadSchemas)[K]>;
};
export const identitySchema = z.strictObject({
  organization: text,
  kind: z.enum(["brand", "institution", "creator"]),
  asset: imageMedia.nullable(),
  sourceUrl: url,
  logoSourceUrl: url.nullable(),
  notes: text,
  background: z.enum(["light", "dark"]).optional(),
  wide: z.boolean().optional(),
  sha256: text.regex(/^[a-f0-9]{64}$/).nullable(),
});
export const projectImageSchema = z.strictObject({
  src: imageMedia,
  alt: text,
  source: url,
  credit: text,
  kind: z.literal("official-demo"),
});
export const learningMediaSchema = z.strictObject({
  src: imageMedia,
  alt: text,
  caption: text,
  sourceUrl: url,
  origin: z.enum(["browser-capture", "local-capture", "creator-screenshot"]),
  capturedAt: z.union([date, z.iso.datetime({ offset: true })]).optional(),
  reviewedAt: date.optional(),
  originalImageUrl: url.optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const noAttachments = z.strictObject({});
const attachmentSchemasV1 = {
  resource: z.strictObject({
    identity: identitySchema,
    projectMedia: projectImageSchema.optional(),
  }),
  example: z.strictObject({
    learningMedia: learningMediaSchema,
    agentAttribution: unique(z.enum(keys(agentLabels))).min(1),
  }),
  foundation: noAttachments,
  agent: noAttachments,
  testing: noAttachments,
  "testing-pack": noAttachments,
  "repository-research": noAttachments,
  path: z.strictObject({
    editorial: z.strictObject({
      src: imageMedia,
      title: text,
      description: text,
      alt: text,
      index: text,
      credit: text,
      sourceUrl: url.optional(),
    }),
    showcase: z.strictObject({
      label: text,
      promise: text,
      cases: unique(identifier),
    }),
  }),
  step: noAttachments,
  demo: z.strictObject({
    originalRecording: z.strictObject({
      id: identifier,
      originalUrl: url,
      resourceId: identifier,
    }),
  }),
  collection: noAttachments,
  document: noAttachments,
};
export const attachmentSchemas = attachmentSchemasV1;
export const identityFields: Record<keyof PayloadModels, readonly string[]> = {
  resource: ["id"],
  example: ["id"],
  foundation: ["id"],
  agent: ["id"],
  testing: ["id"],
  "testing-pack": ["id"],
  "repository-research": ["requested_repo"],
  path: ["id"],
  step: ["track", "id"],
  demo: ["id"],
  collection: ["id"],
  document: ["slug"],
};
export const textFields = {
  resource: ["name", "summary"],
  example: ["title", "description"],
  foundation: ["title", "description"],
  agent: ["title", "summary"],
  testing: ["title", "summary"],
  "testing-pack": ["title", "resources"],
  "repository-research": ["requested_repo", "summary"],
  path: ["title", "description"],
  step: ["title", "description"],
  demo: ["title", "description"],
  collection: ["title", "description"],
  document: ["title", "description"],
} as const;

const handler = (
  validatorKey: string,
  payload: z.ZodType,
  attachments: z.ZodType,
) => ({ validatorKey, payload, attachments });
// Installed readers are append-only after deployment. They deliberately do not use active pointers.
export const versionedContracts: Record<
  string,
  Record<number, ReturnType<typeof handler>>
> = {
  resource: {
    1: handler("gamemap.resource", resourceV1, attachmentSchemasV1.resource),
  },
  example: {
    1: handler("gamemap.example", exampleV1, attachmentSchemasV1.example),
  },
  foundation: {
    1: handler("gamemap.foundation", exampleV1, attachmentSchemasV1.foundation),
  },
  agent: { 1: handler("gamemap.agent", agentV1, attachmentSchemasV1.agent) },
  testing: {
    1: handler("gamemap.testing", testingV1, attachmentSchemasV1.testing),
  },
  "testing-pack": {
    1: handler(
      "gamemap.testing-pack",
      testingPackV1,
      attachmentSchemasV1["testing-pack"],
    ),
  },
  "repository-research": {
    1: handler(
      "gamemap.repository-research",
      researchV1,
      attachmentSchemasV1["repository-research"],
    ),
  },
  path: { 1: handler("gamemap.path", pathV1, attachmentSchemasV1.path) },
  step: { 1: handler("gamemap.step", stepV1, attachmentSchemasV1.step) },
  demo: { 1: handler("gamemap.demo", demoV1, attachmentSchemasV1.demo) },
  collection: {
    1: handler(
      "gamemap.collection",
      collectionV1,
      attachmentSchemasV1.collection,
    ),
  },
  document: {
    1: handler("gamemap.document", documentV1, attachmentSchemasV1.document),
  },
};

export function contractForms() {
  return Object.fromEntries(
    Object.entries(payloadSchemas).map(([kind, schema]) => [
      kind,
      {
        payload: z.toJSONSchema(schema, {
          io: "input",
          unrepresentable: "any",
        }),
        attachments: z.toJSONSchema(
          attachmentSchemas[kind as keyof PayloadModels],
          { io: "input", unrepresentable: "any" },
        ),
        titleField: textFields[kind as keyof PayloadModels][0],
        summaryField: textFields[kind as keyof PayloadModels][1],
        identityFields: identityFields[kind as keyof PayloadModels],
      },
    ]),
  );
}
