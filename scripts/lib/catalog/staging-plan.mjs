import { z } from "zod";
import { isAbsolute, relative } from "node:path";
import { canonicalJSON, sha256 } from "./codec.mjs";
const plain = z
  .string()
  .min(1)
  .max(256)
  .refine((value) => !/[\r\n\0]/.test(value), "Use a single-line value");
const origin = plain.refine((value) => {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.origin === value &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}, "Use an exact HTTPS origin without credentials, path, query or fragment");
const base = plain.refine(
  (value) =>
    value.startsWith("/") &&
    value.endsWith("/") &&
    value
      .split("/")
      .filter(Boolean)
      .every(
        (part) => /^[A-Za-z0-9._-]+$/.test(part) && ![".", ".."].includes(part),
      ),
  "Use a safe slash-delimited deployment basename",
);
const repository = plain.regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/);
const login = plain.regex(/^[a-z][a-z0-9_]{0,62}$/);
export const stagingPlan = z.strictObject({
  format: z.literal("gamemap.staging-plan"),
  version: z.literal(1),
  enabled: z.literal(false),
  environment: z.literal("staging"),
  name: plain.regex(/^[a-z][a-z0-9-]{0,63}$/),
  site: z.strictObject({
    provider: z.literal("github-pages"),
    repository,
    origin,
    base,
    approvalEnvironment: plain.regex(/^[a-z][a-z0-9-]{0,63}$/),
  }),
  studio: z.strictObject({
    hosting: z.literal("persistent-node"),
    origin,
    replicas: z.literal(1),
    mediaRoot: plain.refine(
      isAbsolute,
      "Use an absolute persistent media path",
    ),
    databaseLogin: login,
  }),
  publisher: z.strictObject({ databaseLogin: login }),
  database: z.strictObject({
    projectRef: plain.regex(/^[a-z0-9-]+$/),
    url: origin,
    productionProjectRef: plain.regex(/^[a-z0-9-]+$/).nullable(),
  }),
  production: z.strictObject({ repository, siteOrigin: origin, base }),
});
const placeholder = (value) => /replace-|\.invalid(?:$|\/)/i.test(value);
/** This is a preparation audit, not cloud certification. It never reads secrets or connects to a service. */
export function reviewStagingPlan(
  input,
  { repositoryRoot, git = { commit: null, dirty: true }, references = {} } = {},
) {
  const parsed = stagingPlan.safeParse(input);
  const checks = [];
  const add = (id, status, message, reference) =>
    checks.push({ id, status, message, ...(reference ? { reference } : {}) });
  if (!parsed.success) {
    for (const issue of parsed.error.issues)
      add(
        "configuration." + issue.path.join("."),
        "blocked",
        issue.code === "unrecognized_keys"
          ? "Unexpected configuration keys are not permitted"
          : "Invalid or unsupported plan field",
      );
    return {
      format: "gamemap.staging-readiness",
      version: 1,
      scope: "offline-preparation-only",
      verdict: "blocked",
      configurationValid: false,
      checks,
      networkAccess: false,
      credentialsLoaded: false,
      productionAuthorized: false,
    };
  }
  const plan = parsed.data;
  add(
    "configuration.disabled",
    "pass",
    "This planning file cannot enable a publisher or change the default site.",
  );
  const pinned =
    typeof git.commit === "string" && /^[a-f0-9]{40}$/.test(git.commit);
  const clean = pinned && git.dirty === false;
  add(
    "source.clean",
    clean ? "pass" : "blocked",
    clean
      ? "Source commit is pinned and clean; this alone is not deployment authorization."
      : "Review and explicitly commit the complete changes before a non-development freeze.",
  );
  const differentRepo =
    plan.site.repository.toLowerCase() !==
    plan.production.repository.toLowerCase();
  add(
    "isolation.repository",
    differentRepo ? "pass" : "blocked",
    differentRepo
      ? "An independent preview repository is proposed; its existence and settings are unverified."
      : "Do not target the production repository for this isolated Pages preview.",
  );
  const siteURL = plan.site.origin + plan.site.base,
    productionURL = plan.production.siteOrigin + plan.production.base;
  add(
    "isolation.public-url",
    siteURL !== productionURL ? "pass" : "blocked",
    siteURL !== productionURL
      ? "Preview and production URLs are different."
      : "Preview must not replace the production URL.",
  );
  add(
    "isolation.studio-origin",
    plan.studio.origin !== plan.site.origin &&
      plan.studio.origin !== plan.production.siteOrigin
      ? "pass"
      : "blocked",
    "Studio needs an independent HTTPS Node service; GitHub Pages cannot host its private API.",
  );
  const roleNames = [plan.studio.databaseLogin, plan.publisher.databaseLogin];
  const reserved = [
    "postgres",
    "root",
    "supabase_admin",
    "supabase_auth_admin",
    "service_role",
    "authenticated",
    "anon",
    "catalog_backend",
    "catalog_deployer",
  ];
  add(
    "isolation.logins",
    roleNames[0] !== roleNames[1] &&
      roleNames.every((name) => !reserved.includes(name))
      ? "pass"
      : "blocked",
    "Plan distinct dedicated NOINHERIT logins, not owner/role names; actual grants still require a cloud probe.",
  );
  const mediaRelative = repositoryRoot
    ? relative(repositoryRoot, plan.studio.mediaRoot)
    : null;
  const external =
    mediaRelative !== null &&
    (mediaRelative.startsWith("../") || isAbsolute(mediaRelative));
  add(
    "storage.location",
    external ? "pass" : "blocked",
    "Media must be on a private persistent volume outside the checkout; persistence and realpath boundaries remain unverified.",
  );
  add(
    "studio.single-instance",
    "pass",
    "One instance is required while refresh serialization and login limiting are process-local.",
    references.sessionRefresh,
  );
  const projectURL = new URL(plan.database.url);
  add(
    "database.project-url",
    projectURL.hostname === plan.database.projectRef + ".supabase.co"
      ? "pass"
      : "blocked",
    "The Supabase hostname must match the proposed staging project reference.",
  );
  add(
    "database.production-isolation",
    plan.database.productionProjectRef === null
      ? "unverified"
      : plan.database.projectRef === plan.database.productionProjectRef
        ? "blocked"
        : "pass",
    "Record the non-secret production project reference and independently confirm the staging project is different.",
  );
  const placeholders = [
    plan.site.repository,
    plan.site.origin,
    plan.studio.origin,
    plan.database.projectRef,
    plan.database.url,
  ].some(placeholder);
  add(
    "configuration.placeholders",
    placeholders ? "blocked" : "pass",
    "Replace planning placeholders locally; never paste credentials into this plan or chat.",
  );
  add(
    "release.trust-realm",
    "pass",
    "Local implementation binds new snapshots/artifacts to an immutable environment/project/instance/target and independent operator expectations. Legacy recovery is limited to pre-upgrade local activation history. Actual cloud identity/provisioning is still unverified.",
    references.releaseRealm,
  );
  add(
    "publisher.hosting-adapter",
    "pass",
    "Cloud publication adapter (0031_catalog_cloud_platform.sql and cloud-publication.mjs) enforces non-local realm binding, deployed-byte verification, CAS activation and retained-artifact rollback. Live remote deployment remains unverified offline.",
    references.publisher,
  );
  add(
    "workflow.snapshot-delivery",
    "pass",
    "Protected exact-artifact promotion workflow (.github/workflows/deploy-release-pages.yml) is separated from the Git-authored default Pages workflow. Remote GitHub environment reviewers and ref restrictions remain unverified offline.",
    references.pages,
  );
  add(
    "community.production-server",
    "pass",
    "Standalone production community server (community-server.mjs) supports HTTPS reverse-proxy deployment, startup role audit and game-index sync. Live mail delivery and GitHub OAuth require cloud verification.",
    references.communityServer,
  );
  add(
    "security.login-audit",
    "pass",
    "Production startup audits NOINHERIT, non-superuser, non-owner and cross-role isolation via public.inspect_login_privileges(). Actual cloud credentials still require live verification.",
    references.loginAudit,
  );
  add(
    "recovery.cloud-drill",
    "unverified",
    "TLS pg_dump/pg_restore paired backup tooling (cloud-backup.mjs) is implemented without Docker or supabase_admin. Cloud Auth signing keys, offsite retention and a live scratch-DB restore drill still require cloud acceptance evidence.",
    references.restore,
  );
  add(
    "security.cloud-acceptance",
    "unverified",
    "Verify TLS, signup policy, real memberships, NOINHERIT/grants, CSRF/Origin, proxy behavior, secret handling and revocation in the isolated cloud service.",
  );
  add(
    "operations.approval-monitoring",
    "unverified",
    "Cloud environment reviewers, protected refs, least-privilege OIDC, logs, alerts and response ownership cannot be certified offline.",
  );
  add(
    "content.cutover",
    "blocked",
    "Do not copy the local test database, fixture approvals or deployment state. Import the preserved corpus as drafts into a fresh staging database and independently review it.",
  );
  add(
    "content.withdrawal",
    "pass",
    "Explicit reviewed withdrawal policies, static tombstones and online HTTP 410 denylist delivery are implemented (withdrawal.mjs and 0031_catalog_cloud_platform.sql); operational takedown rehearsal and CDN cache policy still require live verification.",
    references.parity,
  );
  return {
    format: "gamemap.staging-readiness",
    version: 1,
    scope: "offline-preparation-only",
    verdict: "blocked",
    configurationValid: true,
    planDigest: sha256(canonicalJSON(plan)),
    sourceCommit: pinned ? git.commit : null,
    checks,
    networkAccess: false,
    credentialsLoaded: false,
    productionAuthorized: false,
  };
}
export function renderStagingEnvironment(input) {
  const plan = stagingPlan.parse(input);
  return [
    "# PREPARATION TEMPLATE ONLY. This does not provision or authorize a staging deployment.",
    "# Resolve every blocker in the staging-readiness report before connecting a cloud project.",
    "# NODE_ENV enables production security behavior; it is NOT a staging identity boundary.",
    "# Fill secrets only in your private host/CI secret store. Never use owner/service-role credentials.",
    "# Grant the dedicated Studio login catalog_backend; keep publisher credentials separate.",
    "NODE_ENV=production",
    "CATALOG_DATABASE_URL=",
    "SUPABASE_URL=" + JSON.stringify(plan.database.url),
    "SUPABASE_PUBLISHABLE_KEY=",
    "CATALOG_SESSION_SECRET=",
    "# Independently verify and provision the immutable project/instance/target; do not trust a release sender's file.",
    "CATALOG_RELEASE_REALM_FILE=",
    "CATALOG_STUDIO_ORIGIN=" + JSON.stringify(plan.studio.origin),
    "CATALOG_STUDIO_HOST=127.0.0.1",
    "CATALOG_STUDIO_PORT=4180",
    "CATALOG_MEDIA_ROOT=" + JSON.stringify(plan.studio.mediaRoot),
    "# Optional small-host policy: 2.5 MP uploads, one at a time; no automatic resizing or provider guarantee.",
    "# See docs/project/deployment.md for runtime-only pre-launch memory settings; this template does not apply them.",
    "# CATALOG_MEDIA_PROFILE=low-memory",
    "",
  ].join("\n");
}
