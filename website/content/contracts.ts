import { z } from "zod";
import { paperV1, threejsGameV1 } from "./extended-contracts";
import taxonomy from "./taxonomy.json";
import {
  agentLabels,
  agentLabelsV1,
  agentResourceKinds,
} from "../src/data/agentGameTypes";
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
  category: z.enum(["agents", "engines", "2d", "3d", "production", "world"]),
  type: z.enum([
    "agent",
    "framework",
    "skill",
    "benchmark",
    "paper",
    "docs",
    "tool",
    "community",
    "dataset",
  ]),
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
const resourceV2 = resourceV1.extend({
  category: z.enum(keys(taxonomy.categories)),
  type: z.enum(keys(taxonomy.types)),
  collection: z.enum(keys(taxonomy.collections)),
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
  agents: unique(z.enum(keys(agentLabelsV1))).min(1),
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

// A linked game build stays on its research record; it is not an AI-authorship claim.
const researchV2 = researchV1.extend({
  game_access: z
    .strictObject({
      title: text,
      track: z.enum(["2d", "3d"]),
      engine: text,
      kind: z.enum(["playable", "download"]),
      url: url.refine((value) => {
        const target = new URL(value);
        return !(
          ["github.com", "raw.githubusercontent.com"].includes(
            target.hostname,
          ) && !/^\/[^/]+\/[^/]+\/releases(?:\/|$)/.test(target.pathname)
        );
      }, "Link to a playable build or published game download, not repository source"),
      source_url: url,
      checked_at: date,
      note: text,
    })
    .optional(),
});

// v2 accepts only source-evidenced optional metadata; installed v1 readers stay unchanged.
const exampleV2 = exampleV1.extend({
  distribution: z
    .array(
      z.strictObject({
        platform: text,
        url,
        kind: z.enum(["playable", "download"]),
        note: text,
      }),
    )
    .optional(),
  assetTools: strings.optional(),
});
// Ordinary complete games are first-class examples. Installed v1/v2 readers remain unchanged.
const exampleV3 = exampleV2.extend({
  category: z.enum(["ai-generated", "ai-assisted", "community", "foundation"]),
});
// Imported games may have source references without a verified public build.
// Never relabel a repository or project homepage as a playable/download release.
const exampleV4 = exampleV3
  .extend({
    demo: exampleV1.shape.demo.extend({
      kind: z.enum(["playable", "download", "source"]),
    }),
    source: exampleV1.shape.source.extend({
      scope: z
        .enum(["complete-project", "game-code-greybox", "unverified-project"])
        .optional(),
    }),
    intake: z
      .strictObject({
        dataset: text,
        rowId: identifier,
        sourceDate: date,
        importedAt: date,
        sha256: text.regex(/^[a-f0-9]{64}$/),
        verification: z.literal(
          "Provided directory; source, release, code and asset licenses not independently rechecked",
        ),
        homepage: url.nullable(),
      })
      .optional(),
  })
  .superRefine((value, context) => {
    if (
      value.demo.kind === "source" &&
      (!value.intake ||
        value.demo.url !== value.source.url ||
        value.source.scope !== "unverified-project")
    )
      context.addIssue({
        code: "custom",
        path: ["demo"],
        message:
          "Source-only imports require explicit intake provenance and the same unverified source reference, not a disguised play/download link",
      });
  });
// Project landing references are not source URLs or verified releases. Keep v4 unchanged.
const exampleV5 = z
  .strictObject({
    ...exampleV4.shape,
    demo: exampleV4.shape.demo.extend({
      kind: z.enum(["playable", "download", "source", "reference"]),
    }),
    source: exampleV4.shape.source.extend({
      scope: z
        .enum([
          "complete-project",
          "game-code-greybox",
          "unverified-project",
          "project-reference",
        ])
        .optional(),
    }),
  })
  .superRefine((value, context) => {
    if (value.demo.kind !== "reference") {
      const result = exampleV4.safeParse(value);
      if (!result.success)
        for (const issue of result.error.issues)
          context.addIssue({
            code: "custom",
            path: issue.path,
            message: issue.message,
          });
    } else if (
      !value.intake ||
      value.source.scope !== "project-reference" ||
      value.demo.url !== value.source.url ||
      value.intake.homepage !== value.demo.url
    ) {
      context.addIssue({
        code: "custom",
        path: ["demo"],
        message:
          "Project references require explicit provenance, project-reference scope and the same observed homepage; never label them source or a playable/download release",
      });
    }
  });
const demoV2 = demoV1.extend({
  demoType: z
    .enum(["gameplay", "world-model", "scenes", "workflow", "assets"])
    .optional(),
  limitations: text.optional(),
  engine: text.optional(),
  exampleId: identifier.optional(),
});
const stepV2 = stepV1.extend({ resourceIds: unique(identifier).optional() });
const testingPackV2 = testingPackV1.extend({
  testingIds: unique(identifier).optional(),
  check: text.optional(),
});

// Active authoring pointers. Append a new handler below before advancing one pointer.
export const payloadSchemas = {
  paper: paperV1,
  "threejs-game": threejsGameV1,
  resource: resourceV2,
  example: exampleV5,
  foundation: exampleV1,
  agent: agentV1,
  testing: testingV1,
  "testing-pack": testingPackV2,
  "repository-research": researchV2,
  path: pathV1,
  step: stepV2,
  demo: demoV2,
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
/** Complete reviewed gameplay assets; historical learning media readers stay unchanged. */
export const gameplayMediaSchema = learningMediaSchema.extend({
  sha256: text.regex(/^[a-f0-9]{64}$/),
  bytes: z.number().int().positive(),
  original: z.strictObject({
    src: media.regex(/\.(png|jpe?g|webp|gif)$/i, "Use an original image asset"),
    sha256: text.regex(/^[a-f0-9]{64}$/),
    bytes: z.number().int().positive(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    format: z.enum(["png", "jpeg", "webp", "gif"]),
  }),
  frame: z.strictObject({
    src: media.regex(/\.png$/i, "Use a PNG frame asset"),
    sha256: text.regex(/^[a-f0-9]{64}$/),
    bytes: z.number().int().positive(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    format: z.literal("png"),
  }),
  provenance: z.strictObject({
    src: text.regex(
      /^\/?(?:[a-zA-Z0-9_-][a-zA-Z0-9._-]*\/)*[a-zA-Z0-9_-][a-zA-Z0-9._-]*\.json$/,
      "Use a safe local JSON asset",
    ),
    sha256: text.regex(/^[a-f0-9]{64}$/),
    bytes: z.number().int().positive(),
  }),
  reviewedAt: date,
  rights: text,
  localizations: z.strictObject({
    zh: z.strictObject({
      alt: text,
      caption: text,
      // SHA256(JSON.stringify({alt: EnglishAlt, caption: EnglishCaption})); validated server-side.
      sourceHash: text.regex(/^[a-f0-9]{64}$/),
    }),
  }),
});
/** Distinct from reviewed gameplay media; historical screenshot contracts stay unchanged. */
export const pageCoverSchema = z.strictObject({
  kind: z.literal("page-cover"),
  origin: z.literal("project-page-capture"),
  sourceKind: z.enum([
    "author-homepage",
    "repository-page",
    "documentation-page",
  ]),
  src: imageMedia,
  alt: text,
  caption: z.literal("Captured project page; not a gameplay screenshot."),
  sourceUrl: url.refine(
    (value) => value.startsWith("https://"),
    "Public HTTPS page captures only",
  ),
  requestedUrl: url.refine(
    (value) => value.startsWith("https://"),
    "Public HTTPS page captures only",
  ),
  capturedAt: z.iso.datetime({ offset: true }),
  width: z.literal(1280),
  height: z.literal(720),
  sha256: text.regex(/^[a-f0-9]{64}$/),
  bytes: z.number().int().positive(),
  original: z.strictObject({
    src: imageMedia,
    sha256: text.regex(/^[a-f0-9]{64}$/),
    bytes: z.number().int().positive(),
    width: z.literal(1600),
    height: z.literal(900),
  }),
  rights: z.literal(
    "Underlying text, logos and images retain their respective rights; no reuse permission or game verification is inferred.",
  ),
});
const catalogPagePath = text.regex(
  /^\/(?:examples|threejs-games)\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/,
);
/** A trusted, frozen GameMap record is not an upstream project page. */
export const catalogPageCoverSchema = pageCoverSchema
  .extend({
    origin: z.literal("catalog-page-capture"),
    sourceKind: z.literal("catalog-record"),
    caption: z.literal(
      "Captured GameMap catalog record; not an upstream page or gameplay screenshot.",
    ),
    sourceUrl: catalogPagePath,
    requestedUrl: catalogPagePath,
    sourceSnapshot: z.strictObject({
      releaseId: z.uuid(),
      artifactSha256: text.regex(/^[a-f0-9]{64}$/),
      recordRevision: z.uuid(),
      canonicalPath: catalogPagePath,
    }),
  })
  .refine(
    (cover) =>
      cover.sourceUrl === cover.sourceSnapshot.canonicalPath &&
      cover.requestedUrl === cover.sourceUrl,
    {
      message:
        "Catalog page cover must identify its exact frozen record address",
    },
  );
export const anyPageCoverSchema = z.union([
  pageCoverSchema,
  catalogPageCoverSchema,
]);
const noAttachments = z.strictObject({});
const attachmentSchemasV1 = {
  paper: noAttachments,
  "threejs-game": noAttachments,
  resource: z.strictObject({
    identity: identitySchema,
    projectMedia: projectImageSchema.optional(),
  }),
  example: z.strictObject({
    learningMedia: learningMediaSchema,
    agentAttribution: unique(z.enum(keys(agentLabelsV1))).min(1),
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
const exampleAttachmentsV2 = attachmentSchemasV1.example.extend({
  agentAttribution: unique(z.enum(keys(agentLabels))).min(1),
});
const exampleAttachmentsV3 = z.strictObject({
  learningMedia: learningMediaSchema.optional(),
  agentAttribution: unique(z.enum(keys(agentLabels))).optional(),
});
const pageCoverAttachments = z.strictObject({
  pageCover: pageCoverSchema.optional(),
});
const exampleAttachmentsV6 = exampleAttachmentsV3
  .extend({
    pageCover: pageCoverSchema.optional(),
  })
  .refine((value) => !(value.learningMedia && value.pageCover), {
    message: "Preserve reviewed gameplay media; page covers are fallback-only",
  });
const anyPageCoverAttachments = z.strictObject({
  pageCover: anyPageCoverSchema.optional(),
});
const exampleAttachmentsV7 = exampleAttachmentsV3
  .extend({ pageCover: anyPageCoverSchema.optional() })
  .refine((value) => !(value.learningMedia && value.pageCover), {
    message: "Preserve reviewed gameplay media; page covers are fallback-only",
  });
const gameplayAttachments = z.strictObject({
  learningMedia: z.union([gameplayMediaSchema, learningMediaSchema]).optional(),
  pageCover: anyPageCoverSchema.optional(),
  archivedPageCover: anyPageCoverSchema.optional(),
});
const gameplayAttachmentRules = (value: z.infer<typeof gameplayAttachments>) =>
  !(value.learningMedia && value.pageCover) &&
  (!value.archivedPageCover ||
    (!value.pageCover &&
      gameplayMediaSchema.safeParse(value.learningMedia).success));
const gameplayOwnerAttachments = gameplayAttachments
  .extend({
    learningMedia: gameplayMediaSchema.optional(),
  })
  .refine(gameplayAttachmentRules, {
    message:
      "Active covers are fallback-only; archived covers require complete gameplay media and no active cover",
  });
const exampleAttachmentsV8 = gameplayAttachments
  .extend({
    agentAttribution: unique(z.enum(keys(agentLabels))).optional(),
  })
  .refine(gameplayAttachmentRules, {
    message:
      "Active covers are fallback-only; archived covers require complete gameplay media and no active cover",
  });
export const attachmentSchemas = {
  ...attachmentSchemasV1,
  example: exampleAttachmentsV8,
  foundation: gameplayOwnerAttachments,
  "threejs-game": gameplayOwnerAttachments,
  "repository-research": z.strictObject({
    learningMedia: learningMediaSchema.optional(),
  }),
};
export const identityFields: Record<keyof PayloadModels, readonly string[]> = {
  paper: ["id"],
  "threejs-game": ["id"],
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
  paper: ["title", "description"],
  "threejs-game": ["name", "gameplay_evidence.claim"],
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

/** Only the installed native game contract uses a nested lead; never traverse user paths. */
export function envelopeText(
  kind: keyof PayloadModels,
  payload: Record<string, unknown>,
) {
  if (kind === "threejs-game") {
    const game = payload as PayloadModels["threejs-game"];
    return { title: game.name, summary: game.gameplay_evidence?.claim };
  }
  const [title, summary] = textFields[kind];
  return { title: payload[title], summary: payload[summary] };
}

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
  paper: { 1: handler("gamemap.paper", paperV1, attachmentSchemasV1.paper) },
  "threejs-game": {
    1: handler(
      "gamemap.threejs-game",
      threejsGameV1,
      attachmentSchemasV1["threejs-game"],
    ),
    2: handler("gamemap.threejs-game", threejsGameV1, pageCoverAttachments),
    3: handler("gamemap.threejs-game", threejsGameV1, anyPageCoverAttachments),
    4: handler("gamemap.threejs-game", threejsGameV1, gameplayOwnerAttachments),
  },
  resource: {
    1: handler("gamemap.resource", resourceV1, attachmentSchemasV1.resource),
    2: handler("gamemap.resource", resourceV2, attachmentSchemasV1.resource),
  },
  example: {
    1: handler("gamemap.example", exampleV1, attachmentSchemasV1.example),
    2: handler("gamemap.example", exampleV2, exampleAttachmentsV2),
    3: handler("gamemap.example", exampleV3, exampleAttachmentsV3),
    4: handler("gamemap.example", exampleV4, exampleAttachmentsV3),
    5: handler("gamemap.example", exampleV5, exampleAttachmentsV3),
    6: handler("gamemap.example", exampleV5, exampleAttachmentsV6),
    7: handler("gamemap.example", exampleV5, exampleAttachmentsV7),
    8: handler("gamemap.example", exampleV5, exampleAttachmentsV8),
  },
  foundation: {
    1: handler("gamemap.foundation", exampleV1, attachmentSchemasV1.foundation),
    2: handler("gamemap.foundation", exampleV1, pageCoverAttachments),
    3: handler("gamemap.foundation", exampleV1, anyPageCoverAttachments),
    4: handler("gamemap.foundation", exampleV1, gameplayOwnerAttachments),
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
    2: handler(
      "gamemap.testing-pack",
      testingPackV2,
      attachmentSchemasV1["testing-pack"],
    ),
  },
  "repository-research": {
    1: handler(
      "gamemap.repository-research",
      researchV1,
      attachmentSchemasV1["repository-research"],
    ),
    2: handler(
      "gamemap.repository-research",
      researchV2,
      attachmentSchemasV1["repository-research"],
    ),
    3: handler(
      "gamemap.repository-research",
      researchV2,
      attachmentSchemas["repository-research"],
    ),
  },
  path: { 1: handler("gamemap.path", pathV1, attachmentSchemasV1.path) },
  step: {
    1: handler("gamemap.step", stepV1, attachmentSchemasV1.step),
    2: handler("gamemap.step", stepV2, attachmentSchemasV1.step),
  },
  demo: {
    1: handler("gamemap.demo", demoV1, attachmentSchemasV1.demo),
    2: handler("gamemap.demo", demoV2, attachmentSchemasV1.demo),
  },
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
