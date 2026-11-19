import type {
  BlockValue,
  ContentBlock,
  FieldRules,
  ContentModels,
  Fact,
  ContentSection,
} from "./models";
import type { ResourceAccess } from "../src/types";
import { categories, stageLabels, typeLabels } from "../src/types";
import { url } from "./site";
import { docLocale, docMessages } from "./doc-language";
import taxonomy from "./taxonomy.json";
import documentGenerators from "./generators.config.json";
import repositoryResearch from "../../data/segments/repository-research.json";
import { agentLabels, agentResourceKinds } from "../src/data/agentGameTypes";
import {
  testingKinds,
  testingUses,
  testingTerms,
} from "../src/data/testingTypes";

export function assertKeys(value: object, fields: object, name: string) {
  for (const key of Object.keys(value))
    if (!Object.hasOwn(fields, key))
      throw new Error(
        `${name}: unregistered field "${key}". Define how it is displayed before publishing.`,
      );
}
const hasValue = (value: unknown) =>
  value !== undefined &&
  value !== null &&
  value !== "" &&
  (!Array.isArray(value) || value.length > 0);
export function presentFields<T extends object>(
  record: T,
  rules: FieldRules<T>,
  context: string,
): ContentBlock[] {
  assertKeys(record, rules, context);
  const blocks: ContentBlock[] = [];
  for (const key of Object.keys(rules) as (keyof T)[]) {
    const rule = rules[key];
    if ("skip" in rule) {
      if (!rule.skip.trim())
        throw new Error(
          `${context}.${String(key)} needs a reason for not being a visible field`,
        );
      continue;
    }
    const value = record[key];
    if (!hasValue(value) && !(rule.includeNull && value === null)) continue;
    const shown = rule.present(value, record);
    if (!shown.length)
      throw new Error(
        `${context}.${String(key)} has content but no presentation`,
      );
    blocks.push(
      ...shown.map((block) => ({
        ...block,
        field: String(key),
        section: block.section ?? rule.section,
      })),
    );
  }
  return blocks;
}
function scalar(value: unknown) {
  if (!["string", "number", "boolean"].includes(typeof value))
    throw new Error(
      "A text field needs a scalar value, not an unregistered object",
    );
  return String(value);
}
const skip = (reason: string) => ({ skip: reason });
const title = {
  present: (value: unknown): BlockValue[] => [
    { type: "title", value: scalar(value) },
  ],
};
const lead = {
  present: (value: unknown): BlockValue[] => [
    { type: "lead", value: scalar(value) },
  ],
};
const text = (label: string, section: ContentSection = "guidance") => ({
  section,
  present: (value: unknown): BlockValue[] => [
    { type: "text", label, value: scalar(value) },
  ],
});
const mapped = (
  label: string,
  labels: Record<string, string>,
  section: ContentSection = "metadata",
) => ({
  section,
  present: (value: unknown): BlockValue[] => {
    const name = labels[scalar(value)];
    if (!name) throw new Error(`Unknown ${label}: ${String(value)}`);
    return [{ type: "text", label, value: name }];
  },
});
const list = (
  label: string,
  ordered = false,
  labels?: Record<string, string>,
) => ({
  present: (value: unknown): BlockValue[] => {
    if (!Array.isArray(value)) throw new Error(`${label} must be a list`);
    return [
      {
        type: "list",
        label,
        ordered,
        items: value.map((item) =>
          labels
            ? labels[scalar(item)] ||
              (() => {
                throw new Error(`Unknown ${label}: ${String(item)}`);
              })()
            : scalar(item),
        ),
      },
    ];
  },
});
const labeledList = (label: string, labels: Record<string, string>) =>
  list(label, false, labels);
const link = (label: string) => ({
  present: (value: unknown): BlockValue[] => [
    { type: "links", label, items: [{ label, url: scalar(value) }] },
  ],
});
const dimensions = taxonomy.dimensions;
const categoryLabels = Object.fromEntries(
  categories.map((category) => [category.id, category.label]),
);
const linkKeys = { label: true, url: true };
function linkedObjects(
  label: string,
  value: readonly { label: string; url: string }[],
): BlockValue[] {
  value.forEach((item) => assertKeys(item, linkKeys, label));
  return [
    {
      type: "links",
      label,
      items: value.map((item) => ({ label: item.label, url: item.url })),
    },
  ];
}
const accessKeys = {
  label: true,
  url: true,
  kind: true,
  note: true,
} satisfies Record<keyof ResourceAccess, true>;
const tutorialKeys = { label: true, url: true, kind: true } satisfies Record<
  keyof ContentModels["example"]["tutorial"],
  true
>;
const demoKeys = {
  label: true,
  url: true,
  kind: true,
  note: true,
} satisfies Record<keyof ContentModels["example"]["demo"], true>;
const sourceKeys = {
  label: true,
  url: true,
  note: true,
  scope: true,
} satisfies Record<keyof ContentModels["example"]["source"], true>;
const evidenceKeys = { label: true, url: true, note: true } satisfies Record<
  keyof NonNullable<ContentModels["example"]["evidence"]>,
  true
>;
function describedLink(
  label: string,
  item: {
    label: string;
    url?: string;
    note?: string;
    kind?: string;
    scope?: string;
  },
  keys: object,
): BlockValue[] {
  assertKeys(item, keys, label);
  const blocks: BlockValue[] = [];
  if (item.url)
    blocks.push({
      type: "links",
      label,
      items: [{ label: item.label, url: item.url, note: item.note }],
    });
  else
    blocks.push({
      type: "text",
      label,
      value: item.label + (item.note ? ` — ${item.note}` : ""),
    });
  if (item.kind)
    blocks.push({
      type: "text",
      label: `${label} kind`,
      value: item.kind.replaceAll("-", " "),
    });
  if (item.scope)
    blocks.push({
      type: "text",
      label: `${label} source scope`,
      value: item.scope.replaceAll("-", " "),
    });
  return blocks;
}

export const resourceFields: FieldRules<ContentModels["resource"]> = {
  id: skip("Stable identity is included in the content key and canonical URL."),
  name: title,
  summary: lead,
  category: mapped("Category", categoryLabels),
  type: mapped("Resource type", typeLabels),
  detail: text("Why it belongs here"),
  url: link("Project source"),
  links: { present: (value) => linkedObjects("Further reading", value || []) },
  tags: list("Topics"),
  stages: labeledList("Development stages", stageLabels),
  dimensions: labeledList("Tracks", dimensions),
  year: text("Year", "metadata"),
  verified: text("Source reviewed", "metadata"),
  access: {
    present: (value) => {
      if (!value) return [];
      assertKeys(
        value,
        { tutorial: true, demo: true, source: true },
        "Resource access",
      );
      return Object.entries(value).flatMap(([name, item]) =>
        describedLink(name, item, accessKeys),
      );
    },
  },
};
export const exampleFields: FieldRules<ContentModels["example"]> = {
  id: skip("Stable identity is included in the content key and canonical URL."),
  title,
  description: lead,
  engine: text("Engine"),
  track: mapped("Track", dimensions),
  category: mapped(
    "Creation category",
    {
      "ai-generated": "AI-generated (creator attribution)",
      "ai-assisted": "AI-assisted (creator attribution)",
      community: "Community game",
      foundation: "Official engine example",
    },
    "provenance",
  ),
  aiUse: text("Development context"),
  intake: {
    section: "metadata",
    present: (value) =>
      value
        ? [
            {
              type: "facts",
              label: "Imported directory provenance",
              items: [
                { type: "text", label: "Input dataset", value: value.dataset },
                { type: "text", label: "Original entry", value: value.rowId },
                {
                  type: "text",
                  label: "Original metadata date",
                  value: value.sourceDate,
                },
                { type: "text", label: "Imported", value: value.importedAt },
                { type: "text", label: "SHA-256", value: value.sha256 },
                {
                  type: "text",
                  label: "Review basis",
                  value:
                    value.verification ===
                    "Provided directory; source, release, code and asset licenses not independently rechecked"
                      ? "Supplied directory metadata"
                      : value.verification,
                },
                ...(value.homepage
                  ? [
                      {
                        type: "link" as const,
                        label: "Project website",
                        url: value.homepage,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : [],
  },
  assetTools: list("Creator-attributed asset tools"),
  distribution: {
    section: "provenance",
    present: (values) =>
      (values ?? []).flatMap(({ platform, ...item }) =>
        describedLink("Distribution", { label: platform, ...item }, demoKeys),
      ),
  },
  steps: list("Study this workflow", true),
  tutorial: {
    present: (value) =>
      describedLink("Build story / tutorial", value, tutorialKeys),
  },
  demo: {
    present: (value) =>
      describedLink(
        value.kind === "source"
          ? "Source reference"
          : value.kind === "reference"
            ? "Project reference"
            : "Play or run",
        value,
        demoKeys,
      ),
  },
  source: {
    present: (value) =>
      describedLink(
        value.scope === "project-reference"
          ? "Project reference"
          : "Project source",
        value,
        sourceKeys,
      ),
  },
  evidence: {
    present: (value) => {
      if (!value) return [];
      const blocks = describedLink("Creator evidence", value, evidenceKeys);
      const imported =
        value.label === "Read supplied directory references" ||
        value.note?.startsWith("Imported input ");
      return imported
        ? blocks.map((block) => ({
            ...block,
            section: "metadata" as const,
          }))
        : blocks;
    },
  },
  resourceIds: {
    present: (value) => [
      {
        type: "links",
        label: "Related resources",
        items: value.map((id) => ({ label: id, url: url.resource(id) })),
      },
    ],
  },
};
export const agentFields: FieldRules<ContentModels["agent"]> = {
  catalogResourceId: {
    present: (value) =>
      value
        ? [
            {
              type: "links",
              label: "Catalog entity",
              items: [
                { label: "Related resource record", url: url.resource(value) },
              ],
            },
          ]
        : [],
  },
  id: skip("Stable identity is included in the content key and canonical URL."),
  title,
  summary: lead,
  kind: mapped("Toolkit category", agentResourceKinds, "guidance"),
  agents: labeledList("Attributed clients / models", agentLabels),
  engine: text("Engine / runtime"),
  sourceUrl: link("Primary source"),
  codeUrl: link("Code / instructions"),
  evidenceUrl: link("Evidence"),
  codeType: mapped("Code type", {
    implementation: "Implementation",
    instructions: "Instructions",
    mixed: "Mixed implementation and instructions",
  }),
  codeScope: text("Source contents"),
  limitations: text("Limitations"),
  publisher: text("Publisher"),
  official: {
    present: (value) => [
      {
        type: "text",
        label: "Source classification",
        value: value
          ? "Publisher / maintainer source"
          : "Third-party / community source",
      },
    ],
  },
  reviewed: text("Source reviewed", "metadata"),
};
export const testingFields: FieldRules<ContentModels["testing"]> = {
  id: skip("Stable identity is included in the content key and canonical URL."),
  title,
  summary: lead,
  kind: mapped("Resource kind", testingKinds),
  uses: labeledList("Testing goals", testingUses),
  dimensions: labeledList("Tracks", dimensions),
  stack: text("Stack"),
  sourceUrl: link("Primary source"),
  access: {
    present: (value) =>
      describedLink("Get started", value, {
        label: true,
        url: true,
        note: true,
      }),
  },
  codeLicense: text("Code license"),
  assetLicense: text("Asset license"),
  terms: mapped("Terms category", testingTerms, "provenance"),
  licenseUrl: link("Read the terms"),
  evidence: { present: (value) => linkedObjects("Supporting evidence", value) },
  aiUseNote: text("AI use in testing"),
  testTasks: list("Try these tasks"),
  setup: list("Setup", true),
  limitations: text("Limitations"),
  reviewed: text("Source reviewed", "metadata"),
};
export const testingPackFields: FieldRules<ContentModels["testing-pack"]> = {
  id: skip("Stable identity is the canonical testing-page anchor."),
  title,
  use: mapped("Testing goal", testingUses),
  resources: lead,
  task: text("Task"),
  measure: text("Measure"),
  check: text("Checkpoint"),
  testingIds: {
    section: "resources",
    present: (ids) => [
      {
        type: "links",
        label: "Testing resources",
        items: (ids ?? []).map((id) => ({ label: id, url: url.testing(id) })),
      },
    ],
  },
};
export const pathFields: FieldRules<ContentModels["path"]> = {
  id: skip("Track identity is the canonical route."),
  title,
  description: lead,
};
export const stepFields: FieldRules<ContentModels["step"]> = {
  id: skip("Step identity is the canonical anchor."),
  track: mapped("Track", dimensions),
  title,
  subtitle: text("Focus"),
  tags: list("Topics"),
  stage: mapped("Development stage", stageLabels),
  description: lead,
  deliverable: text("Deliverable"),
  check: text("Checkpoint"),
  resourceIds: {
    section: "resources",
    present: (ids) => [
      {
        type: "links",
        label: "Related resources",
        items: (ids ?? []).map((id) => ({ label: id, url: url.resource(id) })),
      },
    ],
  },
};
export const collectionFields: FieldRules<ContentModels["collection"]> = {
  id: skip("Stable identity is the canonical anchor."),
  title,
  description: lead,
  url: link("Browse collection"),
};
export const demoFields: FieldRules<ContentModels["demo"]> = {
  demoType: text("Demo content type", "provenance"),
  limitations: text("Limitations", "provenance"),
  engine: text("Engine"),
  exampleId: {
    section: "resources",
    present: (id) =>
      id
        ? [
            {
              type: "links",
              label: "Related example",
              items: [{ label: id, url: url.example(id) }],
            },
          ]
        : [],
  },
  recordingId: skip(
    "Validated original-media identity used to group renditions; canonical presentation URLs remain distinct.",
  ),
  id: skip("Stable identity is included in the content key and canonical URL."),
  title,
  description: lead,
  resourceId: {
    present: (value) => [
      {
        type: "links",
        label: "Related project",
        items: [{ label: value, url: url.resource(value) }],
      },
    ],
  },
  track: mapped("Track", dimensions),
  role: mapped(
    "Recording type",
    {
      excerpt: "Curated preview excerpt",
      "source-recording": "Original project recording",
    },
    "provenance",
  ),
  alt: text("Preview description"),
  previewSrc: {
    present: (value, record) => [
      {
        type: "video",
        label: record.title,
        src: value,
        poster: record.poster,
        aspectRatio: record.aspectRatio,
        mobile: record.mobilePreview,
      },
    ],
  },
  poster: skip("Rendered as the poster of previewSrc, not discarded."),
  aspectRatio: skip(
    "Applied to the video frame; original pixels are not cropped.",
  ),
  mobilePreview: skip(
    "Rendered by the responsive video component; URLs are included in the coverage proof.",
  ),
  originalUrl: link("Original video"),
  sourceUrl: link("Creator / project source"),
  credit: text("Video credit"),
  alternatePreviewUrl: link("Alternate creator preview"),
  prompt: text("Creator prompt"),
};
const nullableText = (
  label: string,
  section: ContentSection = "metadata",
  includeNull = false,
) => ({
  section,
  includeNull,
  present: (value: unknown): BlockValue[] => [
    {
      type: "text",
      label,
      value: value === null ? "Not recorded / not established" : scalar(value),
    },
  ],
});
function factValue(label: string, value: unknown): Fact {
  if (Array.isArray(value))
    return {
      type: "group",
      label,
      items: value.map((item, index) => factValue(String(index + 1), item)),
    };
  if (value !== null && typeof value === "object")
    throw new Error(`${label}: nested metadata needs an explicit field policy`);
  if (typeof value === "string" && value.startsWith("https://"))
    return { type: "link", label, url: value };
  return {
    type: "text",
    label,
    value:
      value === null || value === undefined
        ? "Not recorded / not established"
        : scalar(value),
  };
}
function objectFacts(
  value: object,
  labels: Record<string, string>,
  context: string,
): Fact[] {
  assertKeys(value, labels, context);
  return Object.entries(value)
    .filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        (!Array.isArray(value) || value.length),
    )
    .map(([key, value]) => factValue(labels[key], value));
}
const factObject = (label: string, labels: Record<string, string>) => ({
  includeNull: false,
  present: (value: unknown): BlockValue[] =>
    value === null || typeof value !== "object"
      ? nullableText(label).present(value)
      : [{ type: "facts", label, items: objectFacts(value, labels, label) }],
});
const maintainerLabels = {
  login: "Account",
  display_name: "Recorded display name",
  relationship: "Attribution boundary",
  owner_type: "Account type",
  source_url: "Account source",
  display_name_note: "Display-name evidence boundary",
  url: "Account URL",
};
const revisionLabels = {
  kind: "Pin scope",
  sha: "SHA",
  branch: "Branch",
  path: "Inspected file",
  note: "Revision boundary",
};
const historicalSourceLabels = {
  repository: "Historical repository",
  commit: "Historical commit",
  path: "Historical path",
  url: "Historical source URL",
  directory_entries: "Recorded directory entries",
  package_name: "Package name",
  package_version: "Package version",
};
const historicalPointerLabels = {
  commit: "Pointer commit",
  readme_blob_sha: "README blob SHA",
  url: "Pointer source",
  commit_url: "Commit URL",
  date: "Historical pointer date",
  official_demo_link: "Historical demo link (not independently checked)",
  demo_checked: "Linked demo checked",
};
const alternativeLabels = {
  repository: "Evidence repository",
  pull_request: "Pull request",
  title: "Recorded title",
  merged_at: "Historical merge date",
  merge_commit_sha: "Merge commit",
  old_link: "Historical link",
  replacement_link: "Replacement mentioned by the source",
  attribution: "Evidence and interpretation boundary",
};
const evidenceLabels = {
  path: "Inspected file",
  line_start: "First line",
  line_end: "Last line",
  url: "Pinned source",
  finding: "Source inspection findings",
};
function factArray(
  label: string,
  value: readonly object[] | undefined,
  labels: Record<string, string>,
): BlockValue[] {
  return [
    {
      type: "facts",
      label,
      items: (value || []).map((item, index) => ({
        type: "group",
        label: `${label} ${index + 1}`,
        items: objectFacts(item, labels, label),
      })),
    },
  ];
}
export const repositoryResearchFields: FieldRules<
  ContentModels["repository-research"]
> = {
  requested_repo: title,
  summary: lead,
  metadata_scope: nullableText("Identity and metadata scope", "provenance"),
  review_status: mapped(
    "Review scope",
    {
      "source-reviewed": "Source inspected — not executed",
      "metadata-only": "Metadata only",
      unavailable: "Requested source unavailable to this review",
    },
    "provenance",
  ),
  inspection_scope: text("Inspection performed"),
  execution_validation: mapped(
    "Execution validation",
    {
      not_run: "Not run — read-only source inspection",
    },
    "provenance",
  ),
  disposition: text("Research disposition"),
  availability: text("Recorded availability"),
  canonical_repo: nullableText(
    "Current identity recorded in the ledger",
    "provenance",
    true,
  ),
  group: mapped("Original discovery group", repositoryResearch.group_titles),
  game_access: factObject("Linked game build", {
    title: "Game title",
    track: "Game dimension",
    engine: "Engine / stack",
    kind: "Build access",
    url: "Play or download",
    source_url: "Build link evidence",
    checked_at: "Build link checked",
    note: "Access conditions",
  }),
  license_note: text("License and rights boundary"),
  ai_note: text("AI attribution boundary"),
  limitations: list("Qualifications and limitations"),
  checked_at: text("Source checked", "metadata"),
  source_urls: {
    present: (
      value: ContentModels["repository-research"]["source_urls"],
    ): BlockValue[] => [
      {
        type: "links",
        label: "Primary evidence",
        items: value.map((url, index) => ({
          label: `Source ${index + 1}`,
          url,
        })),
      },
    ],
  },
  revision: {
    ...factObject("Inspected revision", revisionLabels),
    section: "metadata",
  },
  readme_blob_sha: nullableText("Inspected README blob SHA"),
  maintainer: {
    ...factObject("Recorded maintainer / account", maintainerLabels),
    section: "metadata",
  },
  owner_type: nullableText("Recorded owner type"),
  archived: nullableText("Recorded archived flag"),
  is_fork: nullableText("Recorded fork flag"),
  parent_repo: nullableText("Recorded parent repository"),
  repository_id: nullableText("Recorded repository ID"),
  existing_locations: {
    present: (
      value: ContentModels["repository-research"]["existing_locations"],
    ): BlockValue[] => [
      {
        type: "links",
        label: "Existing GameMap coverage at the import baseline",
        items: value.map((path) => ({
          label: path,
          url: `https://github.com/OpenEnvision/GameMap/blob/${repositoryResearch.target_base}/${path}`,
        })),
      },
    ],
  },
  related_existing_entries: {
    present: (
      value: ContentModels["repository-research"]["related_existing_entries"],
    ) =>
      factArray("Related existing entry", value, {
        id: "Entry ID",
        path: "Coverage path",
        relationship: "Relationship",
        note: "Qualification",
      }),
  },
  related_repositories: {
    present: (
      value: ContentModels["repository-research"]["related_repositories"],
    ) =>
      factArray("Related repository", value, {
        repo: "Repository",
        relationship: "Relationship",
        note: "Qualification",
        path: "Related path",
      }),
  },
  alternative_repo: nullableText("Separately identified alternative"),
  alternative_url: link("Separately identified alternative source"),
  historical_source: factObject("Historical source", historicalSourceLabels),
  historical_pointer: factObject(
    "Historical migration pointer",
    historicalPointerLabels,
  ),
  source_evidence: {
    present: (value: ContentModels["repository-research"]["source_evidence"]) =>
      factArray("Bounded static-source evidence", value, evidenceLabels),
  },
  remaining_unknowns: list("Remaining unknowns"),
  alternative_maintenance_evidence: factObject(
    "Dated ecosystem maintenance guidance",
    alternativeLabels,
  ),
};
export const documentFields: FieldRules<ContentModels["document"]> = {
  slug: skip("Stable identity is the canonical document route."),
  title,
  description: lead,
  label: skip("Rendered in the registry-generated document navigation."),
  group: skip("Rendered in the registry-generated document navigation."),
  sourceMode: skip(
    "Trusted source ownership is checked when synchronizing, freezing and reading releases.",
  ),
  generatorKey: skip(
    "A registered code-owned generator, never executable database code.",
  ),
  source: {
    present: (value, record) => [
      {
        type: "links",
        label: "Markdown source",
        items: [
          {
            label:
              record.sourceMode === "generated"
                ? docMessages(docLocale(record.slug)).generatedSource
                : docMessages(docLocale(record.slug)).source,
            url: `https://github.com/OpenEnvision/GameMap/blob/main/${record.sourceMode === "generated" ? documentGenerators[record.generatorKey as keyof typeof documentGenerators]?.renderer : value}`,
          },
        ],
      },
    ],
  },
  sourceHash: skip(
    "Checked against the source Markdown by source/build validation.",
  ),
};
/** Keep native nested labels and every caveat visible, including false, null and empty lists.
 * These values come from the strict paper/game contracts, never arbitrary body attachments. */
function nativeFact(label: string, value: unknown): Fact {
  if (Array.isArray(value))
    return {
      type: "group",
      label,
      items: value.length
        ? value.map((item, index) => nativeFact(String(index + 1), item))
        : [{ type: "text", label: "Items", value: "0" }],
    };
  if (value !== null && typeof value === "object")
    return {
      type: "group",
      label,
      items: Object.entries(value).map(([key, item]) => nativeFact(key, item)),
    };
  if (typeof value === "string" && /^https?:\/\//.test(value))
    return { type: "link", label, url: value };
  return {
    type: "text",
    label,
    value: value === null ? "null" : String(value),
  };
}
const nativeFacts = (
  label: string,
  section: ContentSection = "provenance",
) => ({
  section,
  present: (value: unknown): BlockValue[] => [
    { type: "facts", label, items: [nativeFact(label, value)] },
  ],
});
const paperCodeLabels = {
  restricted: "Restricted code access",
  "not-found": "Implementation not located",
  "open-source": "Open-source code",
  "not-released": "Code not released",
  unverified: "Code availability unverified",
  "source-available": "Source-available code",
};
const repositoryKindLabels = {
  implementation: "Implementation",
  "data-tools": "Data and tools",
  "research-index": "Research index",
  materials: "Materials",
  benchmark: "Benchmark",
  partial: "Partial implementation",
};
const paperLicenseLabels = {
  restricted: "Restricted license",
  "open-source": "Open-source license",
  unspecified: "License unspecified",
};
function paperAccessBlocks(
  value: ContentModels["paper"]["access"],
): BlockValue[] {
  const blocks: BlockValue[] = [
    {
      type: "facts",
      label: "Access and review",
      items: [
        {
          type: "text",
          label: "Code availability",
          value: paperCodeLabels[value.codeStatus],
        },
        {
          type: "text",
          label: "Review status",
          value:
            value.reviewStatus === "source-reviewed"
              ? "Source reviewed"
              : "Review unverified",
        },
        { type: "text", label: "Source checked", value: value.checkedAt },
      ],
    },
  ];
  if (value.repositories.length) {
    blocks.push({
      type: "links",
      label: "Code repositories",
      items: value.repositories.map((repo) => ({
        label: repo.label,
        url: repo.url,
        note: `${repositoryKindLabels[repo.kind]} · ${paperLicenseLabels[repo.license.status]} · ${repo.license.name}`,
      })),
    });
    const licenses = value.repositories
      .filter((repo) => repo.license.url)
      .map((repo) => ({
        label: `${repo.label} — ${repo.license.name}`,
        url: repo.license.url!,
      }));
    if (licenses.length)
      blocks.push({
        type: "links",
        label: "Repository licenses",
        items: licenses,
      });
  }
  if (value.projects.length)
    blocks.push(...linkedObjects("Project pages", value.projects));
  if (value.demos.length)
    blocks.push({
      type: "links",
      label: "Demos and downloads",
      items: value.demos.map((demo) => ({
        label: demo.label,
        url: demo.url,
        note: `${{ download: "Download", local: "Local setup", interactive: "Interactive demo" }[demo.kind]} · ${{ request: "Access on request", setup: "Requires setup", public: "Public access", signup: "Requires sign-up" }[demo.access]}. ${demo.note}`,
      })),
    });
  if (value.notes.length)
    blocks.push({
      type: "list",
      label: "Availability notes",
      items: value.notes.map((note) =>
        note
          .replace(
            " This is a scoped search result, not a claim that code cannot exist elsewhere.",
            "",
          )
          .replace(" This is not a claim that the work is closed source.", ""),
      ),
    });
  if (value.evidence.length)
    blocks.push(...linkedObjects("Review evidence", value.evidence));
  const absent = [
    !value.repositories.length && "No code repositories listed.",
    !value.projects.length && "No project pages listed.",
    !value.demos.length && "No demos listed.",
    !value.notes.length && "No additional availability notes listed.",
    !value.evidence.length && "No review evidence links listed.",
  ].filter((item): item is string => Boolean(item));
  if (absent.length)
    blocks.push({
      type: "list",
      label: "Not listed in this record",
      items: absent,
    });
  // Original enum values are review evidence too. Keep their exact spelling in
  // the source disclosure rather than leaking database codes into the reading surface.
  const classifications: Fact[] = [
    {
      type: "text",
      label: "Code status (source value)",
      value: value.codeStatus,
    },
    {
      type: "text",
      label: "Review status (source value)",
      value: value.reviewStatus,
    },
  ];
  for (const repo of value.repositories)
    classifications.push({
      type: "group",
      label: repo.label,
      items: [
        { type: "text", label: "Repository kind", value: repo.kind },
        { type: "text", label: "License status", value: repo.license.status },
      ],
    });
  for (const demo of value.demos)
    classifications.push({
      type: "group",
      label: demo.label,
      items: [
        { type: "text", label: "Demo kind", value: demo.kind },
        { type: "text", label: "Access requirement", value: demo.access },
      ],
    });
  blocks.push({
    type: "facts",
    label: "Recorded source classifications",
    items: classifications,
  });
  return blocks;
}
const paperFields: FieldRules<ContentModels["paper"]> = {
  id: text("Stable ID", "provenance"),
  title,
  description: lead,
  authors: text("Authors", "provenance"),
  year: text("Year", "provenance"),
  publication: text("Publication", "provenance"),
  referenceType: text("Reference type", "provenance"),
  primaryRole: text("Primary role", "provenance"),
  roles: list("Roles"),
  topics: list("Topics"),
  url: {
    present: (value) => [
      {
        type: "links",
        label: "Original source",
        items: [{ label: "Read original", url: value }],
      },
    ],
  },
  pdfUrl: {
    present: (value) =>
      value
        ? [
            {
              type: "links",
              label: "PDF",
              items: [{ label: "Read PDF", url: value }],
            },
          ]
        : [],
  },
  arxivId: text("arXiv ID", "provenance"),
  doi: text("DOI", "provenance"),
  resourceIds: {
    section: "resources",
    present: (ids) => [
      {
        type: "links",
        label: "Related resources",
        items: ids.map((id) => ({ label: id, url: url.resource(id) })),
      },
    ],
  },
  origins: {
    section: "provenance",
    present: (value) =>
      value.length
        ? linkedObjects("Origins", value)
        : [
            {
              type: "text",
              label: "Origins",
              value: "No origin links listed.",
            },
          ],
  },
  citedSections: {
    section: "provenance",
    present: (value) =>
      value.length
        ? linkedObjects("Cited sections", value)
        : [
            {
              type: "text",
              label: "Cited sections",
              value: "No cited sections listed.",
            },
          ],
  },
  classification: {
    section: "provenance",
    present: (value) =>
      text("Classification notes").present(
        value.replace(
          " These are navigation categories, not independently verified capability claims.",
          "",
        ),
      ),
  },
  access: { section: "provenance", present: paperAccessBlocks },
};
const threejsGameFields: FieldRules<ContentModels["threejs-game"]> = {
  id: text("Stable ID", "provenance"),
  name: title,
  repository_url: nativeFacts("Source repository", "resources"),
  genres: list("Genres"),
  dimension: text("Game dimension", "provenance"),
  stack: nativeFacts("Renderer and dependency evidence"),
  gameplay_evidence: {
    section: "provenance",
    present: (value) => [
      { type: "lead", value: value.claim },
      ...nativeFacts("Gameplay evidence").present(value),
    ],
  },
  license: nativeFacts("License and asset terms"),
  demo: nativeFacts("Demo availability"),
  maturity: nativeFacts("Maturity evidence"),
  verification: nativeFacts("Source review"),
  limitations: { ...list("Limitations"), section: "provenance" },
};
export const fieldRules: {
  [K in keyof ContentModels]: FieldRules<ContentModels[K]>;
} = {
  paper: paperFields,
  "threejs-game": threejsGameFields,
  resource: resourceFields,
  example: exampleFields,
  foundation: exampleFields,
  agent: agentFields,
  testing: testingFields,
  "testing-pack": testingPackFields,
  "repository-research": repositoryResearchFields,
  path: pathFields,
  step: stepFields,
  demo: demoFields,
  collection: collectionFields,
  document: documentFields,
};
