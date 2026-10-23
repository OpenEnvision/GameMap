# Staging preparation and release-readiness review

**Verdict: not ready for cloud staging publication or production cutover.** The local editorial, static-build, exact-artifact publication and process-crash drills are useful evidence, not cloud certification. The current public website remains Git-authored and anonymous; Studio is a separate authenticated editorial service.

This review is limited to environment/deployment readiness. It is not a penetration test, an independent factual/licensing review, or permission to commit, push, create cloud resources or replace the current site.

## Prepared, but intentionally disabled

`config/staging.example.json` is a non-secret **planning document**, not runtime configuration. `enabled` must remain `false`. Nothing reads it to publish a website or connect to a database. Its proposed topology follows the existing Pages/Supabase stack without selecting or provisioning a Studio host:

- An independent GitHub Pages repository and protected staging approval environment. A second Pages deployment in the production repository must not replace the production site.
- A distinct Supabase project, Auth users and dedicated Studio/publisher database logins. Project references are identifiers, not credentials; verify that staging and production references are different.
- An HTTPS, persistent Node service for Studio, with **one instance** and a private persistent media volume outside the checkout. Pages cannot run Studio. Ephemeral/serverless filesystems are not an acceptable replacement for the current media store.
- The public preview remains anonymous. Auth, database access and deployment credentials stay server/operator-side.

An optional [low-memory Studio policy](deployment.md#optional-low-memory-studio) limits new uploads and native image processing for small-host evaluation. It does not provision or certify a free host, change existing media, relax the single-instance/persistent-volume requirement, or resolve the publication blockers below. Actual resource usage, quotas, mainland-China connectivity and full-workflow recovery still need cloud acceptance.

Copy the example to an ignored private location before entering real topology values. Never put passwords, database URLs with credentials, Auth keys or session keys in the JSON plan.

```sh
mkdir -p .build/staging-preparation
cp config/staging.example.json .build/staging-preparation/plan.json
npm run staging:check -- --config .build/staging-preparation/plan.json --out .build/staging-preparation/review-1
```

Use a new output directory for every review. Exit code **2** means **blocked/not ready**, not a failed cloud deployment: no network request is made. Exit 1 means the command/input/output path could not be processed. The private directory contains:

- `report.json`: sanitized planning checks, source commit and source-file references/hashes. It contains no environment values or credential-store contents.
- `studio.env.example`, only for a structurally valid plan: existing Studio variable names with all credential fields blank. Publisher credentials are deliberately absent.

The generated environment file is **not an instruction to start a cloud server**. `NODE_ENV=production` enables HTTPS/security checks but is not a staging identity boundary. The required `CATALOG_RELEASE_REALM_FILE` must come from independently confirmed operator provisioning, not from the plan or a release sender. Resolve the adapter and cloud-acceptance blockers below before connecting a real project. The command never reads `.env`, Auth/session key files or cloud credentials, never runs migrations, and never modifies Git or the current website. It does not certify cloud settings even if every proposed URL is filled in.

## Blocking findings

| Priority | Finding and evidence | Required before proceeding |
| --- | --- | --- |
| P0 | Each candidate must pin the exact reviewed commit. `scripts/lib/catalog/worker.mjs` and `site-build.mjs` reject dirty non-local freezes/builds; unrelated working-tree edits do not belong in an approved candidate. | Review the complete candidate, explicitly authorize local commits, and reproduce tests/build from its clean checkout. No push is implied. |
| P1 | Migration `0013` and `release-realm.mjs` enforce an immutable environment/project/instance/target contract, independent operator expectations, cross-realm denials and restricted legacy local rollback. This is local implementation evidence, not proof of a cloud project's identity. | Independently verify actual cloud project separation and operator registration. Initialize a fresh non-local realm before any review/release history; never relabel local fixtures or trust a realm file supplied by a release sender. |
| P0 | `0011_catalog_publication.sql` accepts local development artifacts only. The filesystem publisher is not a Pages upload/verification adapter. | Implement a separately protected staging hosting adapter with exact uploaded-byte identity, deployment evidence, predecessor CAS, failure reconciliation and retained-artifact rollback. Do not remove the local-only guard as a shortcut. |
| P0 | `.github/workflows/deploy-pages.yml` still builds Git `dist/` on `main`. That is intentional and remains unchanged. | Prepare a separate manual/protected staging workflow after the adapter exists. It must consume one verified artifact without rebuilding in the privileged deploy step. Configure protected environment reviewers/ref restrictions in GitHub and verify them remotely. |
| P0 | Local fixtures contain synthetic accounts, explicit test approvals and local deployment state. | Use a fresh isolated staging database, apply sequential migrations, provision real independent members and import the preserved source corpus as **drafts**. Never clone local fixture approval/publication state into a real authoring environment. |
| P1 | Production Studio accepts a supplied database connection and switches to `catalog_backend`; startup does not certify that the login lacks owner/superuser/other role privileges. See `scripts/studio.mjs` and `database.mjs`. | Probe actual staging login attributes, memberships and denied operations. Use dedicated `NOINHERIT` logins; never give Studio an owner connection, service key or deployment credential. |
| P1 | Refresh serialization uses a process-local `Map` in `scripts/lib/catalog/auth.mjs`; local acceptance does not test multiple replicas or an arbitrary reverse proxy. | Start with one instance. Verify proxy/Origin behavior and shared-IP rate-limit behavior. Add distributed refresh coordination before horizontal scaling. |
| P1 | Local restore uses the container's `supabase_admin` operator in `local-backup.mjs`; managed cloud projects do not necessarily expose that authority. Database/media/source backups alone omit publisher filesystem state and infrastructure/signing-key recovery. | Test provider-supported database/Auth restore plus media, retained artifacts, target metadata/journal and matching source/configuration. Record signing-key/session recovery or deliberate logout policy, offsite encryption/retention, RPO/RTO and operator permissions. |
| P1 | Emergency withdrawal is not implemented. `assertReleaseParity()` deliberately rejects silent identity/address removal. Cached/offline static copies cannot be instantly recalled. | Agree a stable-URL withdrawal and urgent publishing/cache policy, implement it and rehearse it before authoring cutover. Do not bypass parity checks by deleting old identities. |

Migration `0013` disables the compatibility `catalog.activate_release` entry point even before a filesystem target is claimed. New freezes and builds require realm-bound version-2 identity. Only the migration's already-activated legacy local allowlist remains eligible for original-byte local recovery/rollback; historical bytes are unchanged. There is still no cloud publishing authority or remote hosting adapter. Applied migrations must not be rewritten.

## Cloud acceptance still unverified

These items cannot become green from an offline JSON declaration:

1. **Identity and secrets:** separate project/repository/Studio origin; real member provisioning and revocation; signup disabled/configured appropriately; least-privilege grants; secure cookie/CSRF/Origin behavior; private logs and credential rotation.
2. **Connectivity:** trusted HTTPS reverse proxy, valid certificates, verified database TLS, network restrictions, Auth callback/origin configuration and provider availability/failure behavior.
3. **Storage and recovery:** persistent private media, checksum/attribution preservation, backup consistency with SQL and publication artifacts, provider-supported restore and documented recovery time.
4. **Deployment authority:** protected environment reviewers, ref restrictions, narrowly scoped OIDC/Pages permissions, unprivileged build versus privileged promotion, exact artifact retention and verified rollback.
5. **Operations:** monitoring/alerts, resource/abuse limits, owner/on-call response, failed-build/deploy handling, log retention and emergency withdrawal.
6. **Content:** inventory/address/media/language reconciliation, independent source/licensing review, explicit reproduction labels, generated-guide review and per-collection authoring cutover approval.

A clean build, checksum, workflow log or successful upload is not by itself approval to deploy. Keep fixture evidence, factual verification, actual reproduction, editorial approval, artifact verification and activation distinct.

## Order of the next implementation stages

1. Review and commit the prepared local source only after explicit authorization.
2. Re-run the immutable realm denial and legacy-upgrade tests for the candidate, then independently verify the actual staging project's identity before operator registration.
3. Choose the independent preview repository, Supabase project and persistent Studio host; configure credentials **on the host/CI platform**, never in chat or source.
4. Implement and exercise the real hosting adapter/protected workflow against staging only.
5. Complete cloud security/restore/withdrawal acceptance with a real reviewed corpus.
6. Separately authorize any production connection, push, deployment or collection authoring cutover.

The existing local commands and anonymous preview remain available; this preparation introduces no active cloud publisher and does not change the default site provider.
