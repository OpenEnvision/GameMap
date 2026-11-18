import { z } from "zod";

// Native source fields are retained verbatim: review assertions are not publication approval.
const text = z.string().min(1);
const identifier = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const url = z.url({ protocol: /^https?$/ }).refine((value) => {
  try {
    const parsed = new URL(value);
    return !parsed.username && !parsed.password;
  } catch {
    return false;
  }
}, "Use a public HTTP(S) URL without embedded credentials");
const strings = z.array(text);
const link = z.strictObject({ label: text, url });
const role = z.enum([
  "build",
  "design",
  "foundation",
  "model",
  "play",
  "runtime",
  "test",
]);
export const paperV1 = z.strictObject({
  id: identifier,
  title: text,
  description: text,
  authors: text,
  year: z.number().int().min(1).max(9999),
  publication: text,
  referenceType: z.enum([
    "benchmark-page",
    "blog",
    "book",
    "book-chapter",
    "conference-paper",
    "documentation",
    "journal-paper",
    "preprint",
    "product-page",
    "repository",
    "survey",
    "technical-report",
  ]),
  primaryRole: role,
  roles: z.array(role),
  topics: strings,
  url,
  arxivId: text.optional(),
  doi: text.optional(),
  pdfUrl: url.optional(),
  resourceIds: z.array(identifier),
  origins: z.array(link),
  citedSections: z.array(link),
  classification: text,
  access: z.strictObject({
    codeStatus: z.enum([
      "restricted",
      "not-found",
      "open-source",
      "not-released",
      "unverified",
      "source-available",
    ]),
    repositories: z.array(
      z.strictObject({
        label: text,
        url,
        kind: z.enum([
          "implementation",
          "data-tools",
          "research-index",
          "materials",
          "benchmark",
          "partial",
        ]),
        license: z.strictObject({
          status: z.enum(["restricted", "open-source", "unspecified"]),
          name: text,
          url: url.optional(),
        }),
      }),
    ),
    projects: z.array(link),
    demos: z.array(
      z.strictObject({
        label: text,
        url,
        kind: z.enum(["download", "local", "interactive"]),
        access: z.enum(["request", "setup", "public", "signup"]),
        note: text,
      }),
    ),
    reviewStatus: z.enum(["unverified", "source-reviewed"]),
    checkedAt: z.iso.date(),
    evidence: z.array(link),
    notes: strings,
  }),
});

// Matches collections/threejs-games/schema.json's curated game item, not candidates.json.
export const threejsGameV1 = z.strictObject({
  id: identifier,
  name: text,
  repository_url: url.regex(/^https:\/\/github\.com\/[^/\s]+\/[^/\s]+$/),
  genres: strings.min(1),
  dimension: z.enum(["3d-world", "3d-board", "3d-cylinder", "3d-perspective"]),
  stack: z.strictObject({
    renderer: z.literal("three.js"),
    integration: z.literal("direct"),
    three_version: text,
    render_evidence: z.strictObject({ url, claim: text }),
    manifests: z.array(
      z.strictObject({
        path: text,
        url,
        dependencies: z.record(text, text),
        dev_dependencies: z.record(text, text),
      }),
    ),
    auxiliary_dependencies: strings.min(1),
    framework_audit: text,
  }),
  gameplay_evidence: z.strictObject({ url, claim: text }),
  license: z.strictObject({
    spdx: z
      .enum([
        "MIT",
        "ISC",
        "Unlicense",
        "Apache-2.0",
        "GPL-3.0-only",
        "GPL-3.0-or-later",
        "AGPL-3.0-only",
        "AGPL-3.0-or-later",
        "CC0-1.0",
      ])
      .nullable(),
    source_url: url,
    additional_notices: z.array(url),
    notes: text,
    label: text,
  }),
  demo: z.strictObject({
    url: url.nullable(),
    status: z.enum(["page-read", "reader-error", "not-located", "not-checked"]),
    checked_at: z.iso.date(),
    source_url: url,
    notes: text,
  }),
  maturity: z.strictObject({
    status: z.enum([
      "game",
      "prototype",
      "work-in-progress",
      "legacy-release",
      "legacy-prototype",
      "archived-prototype",
    ]),
    basis_url: url,
    notes: text,
  }),
  verification: z.strictObject({
    date: z.iso.date(),
    source_commit: text.regex(/^[0-9a-f]{40}$/),
    source_reviewed: z.literal(true),
    playtested: z.boolean(),
    upstream_tests_run: z.boolean(),
    evidence_path: text,
    reviewed_files: z.array(z.strictObject({ path: text, url })).min(3),
    already_mentioned_in_legacy_readme: z.boolean(),
  }),
  limitations: strings.min(1),
});
