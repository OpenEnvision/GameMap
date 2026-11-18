# Content platform: contracts, migration, and release boundaries

GameMap is moving toward database-authored structured content, a reviewed editing workflow, and immutable website releases. Long-form guides remain Git-authored Markdown. The current website still reads the existing Git sources; installing the database does not change or publish it.

## Implementation boundary

Implemented:

- A private PostgreSQL catalog, explicit membership checks, append-only revisions, version-bound validation receipts, review decisions, immutable release manifests, and conflict-safe activation.
- Registries for content kinds, per-kind schemas, authoring ownership, languages, link roles, and relationship types.
- An offline exporter/verifier covering every existing kind, original data modules, Markdown, translations, provenance, attachments, and source assets.
- A separate private React Studio: contract-driven forms, source/attachment editing, explicit translation fingerprint review, revision diffs, batch review, read-only Git documents, validated previews and frozen-release export.
- A real trusted compiler that validates every current payload/attachment schema, canonical identity, cross-record references, media checksums, screenshot dimensions, and translations before issuing an exact revision receipt.
- Supabase Auth integration through a same-origin backend, opaque HttpOnly sessions, server-side AES-GCM token storage, CSRF/origin checks, serialized refresh, immediate membership revocation and a scoped database worker role.
- Fully decoded, EXIF-stripped, content-addressed WebP uploads to a private filesystem; portable release packages include only referenced media.
- A verified release-to-registry reader and isolated static-site builder: selected database revisions, reviewed document bytes, translations, downloads, new record identities and uploaded media reach the existing React Router/Fumadocs renderer without Git business-row fallback.
- Registered catalog-document generators, independently reviewed immutable source indexes, and a freeze gate that rejects stale generated guides. Object maps render canonically; arrays alone carry editorial order.
- Credential-free build subprocesses, source/route/media/translation checks, desktop/mobile release browser gates, checksummed artifact inventories and explicit development-only output markers.
- An independent local exact-artifact publisher: a separate deployment login, immutable artifact receipts, bound private target, serialized promotion, durable crash journal, compare-and-swap activation and rollback to retained bytes. Its anonymous preview does not expose operator files or require visitor login.
- Fast SQL/desktop/mobile suites plus an opt-in real local Supabase acceptance runner: PostgreSQL 17 migrations, actual Auth and PostgREST, browser login, refresh rotation, least-privilege grants, media, explicit translation review, independent editorial decisions, frozen exports and isolated database restore probes.

Not implemented yet: a cloud/staging deployment, the default public-site/authoring cutover, a production upload/activation worker, emergency takedowns, or a cloud object-storage provider. The current public site remains Git-driven. Source synchronization records its verified initiating administrator as the draft author; that person cannot approve or reject the synchronized revision. Historical NULL-author sync records keep their immutable metadata, but their sync audit still prevents self-review and reuse of a known self-reviewed revision in a new freeze. The fast SQL suite uses PGlite with an isolated `auth.uid()` shim and test-only Auth. `npm run test:local` instead exercises the actual local services, not those substitutes. Neither suite certifies remote TLS, a cloud deployment or production operational recovery.

## Naming and migration policy

Use stable domain names: `catalog.entries`, `catalog.revisions`, `catalog.content_schemas`, and similar names describe responsibility, not a creation date, imported batch, or temporary implementation. Entry identity is `kind:identifier`, not a position or mutable title. No permanent table or field uses an old-source-specific prefix.

Migration filenames use sequential schema versions, **not timestamps**. Supabase accepts numeric version prefixes. Current modules are:

| Module | Responsibility |
| --- | --- |
| `0001_catalog_core.sql` | Identity, contracts, normalized projections, immutable revision constraints, and default-deny RLS |
| `0002_catalog_workflow.sql` | Memberships, audited provisioning, editing, validation attestations, and review |
| `0003_catalog_releases.sql` | Immutable manifests, public release reading, activation and rollback |
| `0004_catalog_imports.sql` | Private, idempotent, atomic source imports |
| `0005_catalog_registry.sql` | Initial kind, schema, language and relationship registrations |
| `0006_catalog_authoring.sql` | Authorized history reads and explicit draft translations |
| `0007_catalog_release_context.sql` | Immutable trusted build context; activation rejects unprepared releases |
| `0008_catalog_sessions.sql` | Private encrypted session storage |
| `0009_catalog_revision_order.sql` | Monotonic revision order, independent of equal timestamps or UUID order |
| `0010_catalog_backend_role.sql` | Least-privilege web/validator role, distinct from the deployment role |
| `0011_catalog_publication.sql` | Separate local deployment authority, immutable artifact receipts/events, target binding and artifact-level activation |
| `0012_catalog_sync_authorship.sql` | Attribute human-triggered source synchronization and prevent self-review, including historical NULL-author sync records |
| `0013_catalog_release_realm.sql` | Immutable environment/project/instance/target binding, versioned frozen identities, and restricted historical local rollback |

These files live under `supabase/migrations/`. The test runner discovers them in numeric order and pins every module in migration packages; there is no hardcoded one-file migration path. Append a new version for future changes. Never rename, reorder, or edit migrations that have been applied to a shared environment. This migration chain is exercised only against isolated local services and test databases; there is no shared or production deployment. Earlier undeployed drafts were consolidated, but further schema changes must append a new numbered migration.

Keep three version axes separate:

1. **Database migration version:** ordered DDL changes.
2. **Package format version:** serialization of an import or public release.
3. **Content schema version:** the payload contract for a particular kind.

A new dataset schema does not increment every resource schema or create a new date-suffixed database table. Current import packages use format 2; older draft packages must be regenerated, not silently interpreted as the new format.

## Ownership and data model

| Content | Before cutover | After cutover |
| --- | --- | --- |
| Structured resources, cases, research, paths, collections | Existing JSON/TypeScript files | Database revisions |
| Long-form guides and licensed skill packages | Git Markdown and source assets | Git Markdown and source assets |
| Generated catalog guides and attribution ledgers | Code generators over Git records | The same registered generators over approved release records; source indexes reviewed before freezing |
| Payload contracts | Typed definitions and field adapters | Versioned definitions, trusted validators, typed forms and adapters |
| Website JSON, Awesome List, search, downloads | Generated from Git | Generated from one release and its pinned Git source |
| Original media | Checked-in files and provenance | Versioned objects and provenance; Git retained until uploads are verified |

Document payloads distinguish `sourceMode: git` from `sourceMode: generated`, with a registered `generatorKey` for derived views. The `git` authoring owner means code-governed content, including trusted generator implementations, not browser-editable prose. No database row supplies executable generator code. Catalog guides preserve their existing addresses and are not a second manually maintained content source.

Do not enable Git and database authoring for the same collection at the same time. This is a one-way initial import, not a synchronization protocol. Remove old authoring paths only after the new renderer proves equivalent records, URLs, media and both languages.

| Tables | Responsibility |
| --- | --- |
| `content_kinds` | Stable kind, label and authoring owner; no special-case document name |
| `content_schemas` | Registered `(kind, version, validator_key)` contracts; old versions remain addressable |
| `locales`, `link_roles`, `relation_types` | Registered discovery/provenance vocabularies, not fixed language or relationship enums |
| `entries` | Stable identity, canonical address, owner and editing head |
| `projects`, `project_entries` | Reviewed cross-kind project identity with a rationale; never automatic URL merges |
| `revisions` | Immutable typed payload and attachments, explicitly bound to a kind/schema version |
| `terms`, `revision_terms` | Shared facets; existing free-form tags are retained as uncontrolled terms |
| `revision_links`, `revision_relations` | Exact source fields, URL roles, and explicit references |
| `assets`, `revision_assets` | File identity, checksum, size and owning field |
| `translations` | Language, owning revision and exact reviewed source-field fingerprint |
| `memberships`, `validation_receipts` | Protected roles and trusted exact-content/schema attestations |
| `import_batches` | Idempotent import and preserved source archive |
| `releases`, `release_items`, `release_contexts` | Immutable approved selections and their exact trusted build context |
| `studio_sessions` | Opaque session IDs, encrypted Auth tokens and fixed session expiry |
| `deployment_state`, `audit_events` | Current successful release pointer and append-only operational history |

A revision's JSON body contains `title`, `summary`, a typed `payload`, and `attachments`. The schema version is an explicit relational column with a foreign key, not a duplicated editable body field. Shared/queryable concerns have separate relational owners. This is not permission to put arbitrary unvalidated JSON into production.

`website/content/contracts.ts` is the runtime payload/attachment contract. TypeScript models are inferred from it, and Studio form JSON Schemas are generated from the same definitions rather than maintained separately. Explicit installed `V1` handlers retain their own validator keys and do not follow the active authoring pointers; adding V2 must preserve V1 and include the corresponding assembly/presentation support. `models.ts` declares ownership, the active schema version and the validator key. `scripts/lib/catalog/adapters.mjs` isolates kind-specific strategies; `projection.mjs` normalizes them; `validation.mjs` performs trusted checks; `worker.mjs` commits frozen projections and receipts. `assembly.ts` rehydrates selected revisions into the existing typed registry without falling back to old business rows. Unknown kinds/versions fail closed.

The initial import makes the documented original corpus's browser-capture origin explicit where its old media metadata omitted that value. Newly authored game previews must state their origin; creator screenshots must retain their original image URL. The original corpus's documented editorial-art credit is likewise made explicit during import. New artwork and project images require their own credit, so the renderer does not relabel uploaded third-party art as GameMap's work. A complete body-to-renderer round trip rejects contradictory recording provenance or silently dropped attachment fields. None of this infers who created a project, grants reuse rights, or proves it was played.

The source archive preserves fragment membership, research envelope metadata, original recordings, creator/client attribution, media rights, review scope and interface translations. An imported source review is not reproduction, independent authorship verification, licensing clearance, or publication approval.

## Extending content safely

### Add a content kind

For example, a dataset, event or course should not require another copied catalog or changes to the core identity/workflow tables:

1. Define its versioned runtime payload/attachment contracts and derive their TypeScript model. Declare its `ContentKindDefinition`, including owner, schema version and trusted validator key.
2. Define its field presentation, references, source ownership and source inventory.
3. Add a per-kind import strategy. Common hashing, file handling, import transactions and release logic remain unchanged.
4. Register the kind and schema in a new numbered migration. A protected registration looks like:

```sql
insert into catalog.content_kinds(kind, label, owner)
values ('dataset', 'Dataset', 'database');
insert into catalog.content_schemas(kind, version, validator_key)
values ('dataset', 1, 'gamemap.dataset');
```

5. Register the trusted handler in `versionedContracts`, implement its assembly/presentation adapters, and test source, rendered and search coverage. Studio generates supported field forms from the runtime schema; specialized field types still require an explicit UI adapter. Unknown UI versions are read-only rather than edited with the wrong contract. Database registration alone does not create a renderer.

Use additional domain tables only when a new queryable relationship or constraint needs them. Secure new tables in the same migration with `catalog.secure_tables()`. Do not proliferate tables per source, imported batch or calendar date, and do not duplicate an existing project to expose it on another page.

### Evolve a payload

Register `(kind, version + 1)` and deploy a validator/adapter that understands it. An upgrade creates a successor revision with the new explicit schema version; it does not rewrite old payloads. Both versions can be reviewed and frozen independently. A receipt cannot be reused across kinds, versions or content digests.

Set `enabled_for_writes = false` to stop new editor drafts using an old version. Its old revisions and frozen releases remain readable. The identity of an existing schema contract cannot be changed in place. Retiring a write contract is not a substitute for an emergency security withdrawal.

### Add a language or relationship

Register a locale, relationship type or URL role instead of rewriting a CHECK constraint. Translation projection iterates locale-keyed catalogs from `translationCatalogs`, validating every source fingerprint. The source UI currently supports English and Chinese; another registered database language still needs its actual UI messages, routes, translation catalogs and browser tests.

The editorial state machine remains deliberately strict and shared. Extensible content does not mean user-defined states can bypass approval, validation or permissions.

## Editing and authorization

```text
save successor → draft → submit → in_review → approved or rejected
                                      ↓
                      exact trusted validation receipt
```

- Each save requires the expected editing head; stale editors receive a conflict. Callers explicitly provide the payload schema version.
- Canonical identity and authoring ownership are protected. Any Git-owned kind is read-only through the database editor.
- Editors submit their own revisions; administrators can submit imported drafts. Reviewers cannot decide their own revisions.
- Approval requires a trusted receipt bound to content digest, kind, schema version and the registered validator key.
- Validated projections, historical content, receipts, releases and audit history are immutable. Save a successor to make changes.
- Imports create drafts even if the original website displayed the record or its sources were checked.

Tables stay in private `catalog` with RLS and no browser grants. Do not add it to PostgREST's exposed schemas. Anonymous visitors can call only `catalog_published_release`; editor RPCs have explicit grants. Membership comes from `catalog.memberships`, not browser-controlled profile metadata. A database administrator provisions an existing Supabase Auth user, for example:

```sql
insert into catalog.memberships(user_id, role)
values ('REPLACE_WITH_EXISTING_AUTH_USER_UUID', 'editor');
```

Membership changes are audited. Private functions start owner-only; PostgreSQL's global default PUBLIC EXECUTE grant is revoked, not merely a schema-local default that leaves the global grant intact. Explicit grants remain the allowlist.

The web backend always uses `catalog_backend` for its private transactions and `authenticated` with a verified Auth user ID for request RPCs. The worker can read catalogs, stage verified projections, append Git-owned source revisions and attach build contexts. It cannot provision members, change contracts, approve rows directly, update the deployment pointer, or execute `catalog.activate_release`. It does not receive the initial-import privilege either. The deployment service remains a separate privileged caller.

Provision a dedicated database login outside source control, with no inherited owner privileges, and grant it `catalog_backend`. The local setup does this too; neither database-owner credentials nor a service key belongs in the Studio server configuration:

```sql
create role gamemap_studio_login login noinherit password 'SET_A_PRIVATE_PASSWORD_OUTSIDE_GIT';
grant catalog_backend to gamemap_studio_login;
```

Use a protected connection URL for that login. Remote database TLS certificates are verified; configure a trusted CA with `NODE_EXTRA_CA_CERTS` if needed instead of disabling verification. Never expose database credentials, session secrets or service keys to the browser.

## Running the private Studio

With Docker Desktop running, the reproducible isolated local path is:

```sh
npm ci
npm run local:start
npm run local:setup
npm run studio:dev
```

The pinned development CLI uses project `gamemap`, never links to a cloud project, and applies numbered migrations. A process-local Docker wrapper explicitly binds every published port to `127.0.0.1`; network defaults alone were insufficient with the pinned CLI. The runner checks actual container bindings and stops the stack if any port is exposed to the LAN. It refuses remote Docker sockets and non-loopback service URLs. A private instance marker pins this checkout and its data volume; an existing unclaimed project is never silently adopted or stopped. Use these wrappers instead of a bare `supabase start`.

`local:setup` provisions real local Auth admin/editor/reviewer accounts and a nonmember denial-test account, grants a dedicated `NOINHERIT`/non-superuser database login only `catalog_backend`, imports the original corpus as drafts, and creates a private ignored `.env` without overwriting an unrelated one. Random passwords and service credentials remain under ignored `.build/catalog-local/`, with private directory/file permissions. Read `.build/catalog-local/access.json` locally for the test account passwords; do not paste or publish it. Re-running setup does not overwrite content. For a manually provisioned staging service, use `.env.example` instead.

```sh
npm run local:status
npm run test:local
npm run local:stop
```

The opt-in acceptance runner uses actual Auth/PostgREST/PostgreSQL, including a real browser login and serialized real refresh-token rotation. Its synthetic records and explicit fixture approvals are **local test decisions, not factual review or production approval**. Frozen contexts always record `environment: local`, even on a clean Git checkout; these releases cannot produce a production artifact. The runner tests local database activation/CAS only, not public website deployment or artifact-matched rollback. `local:stop` retains local data; it does not reset or delete volumes.

The UI defaults to `http://127.0.0.1:5174` and proxies its same-origin API on port 4180. Without credentials it displays setup instructions; there is no demo account or authentication bypass. The only fake Auth implementation is under `tests/helpers/`, backed by an isolated in-memory database. Neither the real entry point nor the browser build imports it.

The server needs `CATALOG_DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, a randomly generated `CATALOG_SESSION_SECRET` of at least 32 characters, and `CATALOG_RELEASE_REALM_FILE` pointing to an independently provisioned operator identity file. Startup compares that file with the database's immutable realm before serving configured requests. No variable uses a `VITE_` prefix. Auth access/refresh tokens are encrypted in private session rows; the browser receives an opaque HttpOnly, SameSite=Strict cookie and a CSRF nonce, not JWTs or refresh tokens. Mutations require the configured exact Origin and CSRF header. Revoking a membership denies the next protected request. Rotating the session secret invalidates sessions without changing content.

```sh
npm run studio:build
npm run studio:start
```

`studio:start` is the production entry point. Deploy the matching source checkout and Node/Git runtime, not just the static `dist/` directory. The trusted TypeScript compiler and Markdown parser are runtime dependencies; after building Studio, `npm ci --omit=dev` is supported and checked separately in CI. It requires an HTTPS origin behind a trusted TLS reverse proxy and an absolute persistent `CATALOG_MEDIA_ROOT` outside the repository. Local dev may use ignored `.build/catalog-media`; do not use that ephemeral directory for production. The media root cannot be a public source directory or a symlink into one. Back up this private volume together with the database and matching source revision. Uploads accept PNG/JPEG/WebP up to 10 MB, fully decode within 40 megapixels, preserve orientation, remove EXIF and become lossless WebP named by content hash. SVG uploads are rejected; source logos remain read-only verified assets. Only referenced local assets enter an exported release. Images must be versioned local assets; original externally hosted video references are preserved with attribution rather than copied without permission. Their bytes and continued availability are not covered by package checksums. Video fields never offer the image uploader, and URLs containing embedded credentials are rejected.

Studio provides no account signup or activation button. Editors save immutable successors, explicitly review stale translations, validate and submit. Reviewers inspect changes and record a decision; they cannot review their own revisions. Administrators may submit imported drafts and synchronize Git document indexes. Source synchronization reads discovered public Git prose and regenerates registered catalog views from the approved database selection. It appends and validates changed indexes and leaves them as drafts; it neither rewrites the Git checkout nor approves them. Reviewers can inspect the exact full Markdown in the private preview, as well as the corresponding Git/generator changes. After approving structured changes, synchronize and review changed catalog indexes before freezing; stale generated Markdown blocks the release.

Restart Studio after changing runtime contracts or Git source documents. A frozen context pins compiler/source hashes; a changed checkout is rejected instead of silently using different code. Staging and production require production security mode, clean committed source and their own registered realms. `NODE_ENV` never selects or changes the realm: even with production security settings, a local database still freezes local releases. A clean checkout cannot turn a local acceptance fixture into an authorized production release.

### Immutable release realms and upgrades

An operator registers exactly one environment (`local`, `staging` or `production`), project key, database instance UUID and logical publication target. Registration is immutable and idempotent only for the exact same values. `catalog.initialize_release_realm` is owner-only: Studio, browser roles, the service role and the deployer cannot initialize, change or adopt an identity. An unbound database cannot freeze. Non-local registration must precede any existing review/release history; local approvals must never be imported into a new real environment.

Migration `0013` does not guess an environment. New `local:setup` explicitly initializes the owned local project. To upgrade an existing local project:

```sh
npm run local:migrate
npm run local:realm-setup
# Add the printed CATALOG_RELEASE_REALM_FILE path to the private .env, then restart Studio.
```

The non-secret `.build/catalog-local/realm.json` is an operator expectation, not a credential or provider signature. Studio checks it against the database; `site:build --realm FILE` checks it against the frozen manifest/context; the local publisher checks it against the database and artifact. Do not accept a target file supplied by an untrusted package sender. A copied database retains its identity; it is not a new staging project. Real provider/project separation must still be independently verified.

New frozen manifests, build contexts and site-artifact evidence use version **2** and carry the same realm. The release-package envelope remains version **1**; per-kind schemas and import-package serialization are separate axes. Frozen revisions bind the logical target before build, while the local publisher still accepts only local development artifacts. Different local basenames can produce distinct artifacts for that same target; a future hosting adapter must additionally enforce its actual repository/origin/base configuration.

Historical version-1 bytes are never relabeled or rewritten. Existing public delivery remains available. Only artifacts already activated before `0013`, recorded in its immutable local-history allowlist and still matching the original instance/target/root and receipt, may be recovered or rolled back locally. Unactivated old artifacts and old packages cannot gain new publication eligibility or be rebuilt through the new builder. Freeze a new realm-bound release instead. The raw `catalog.activate_release` compatibility path is disabled even before a filesystem target is claimed.

The browser JSON export is metadata plus frozen document text, not a media backup. To create and verify a portable private package using protected operator credentials:

```sh
npm run studio:export -- --id RELEASE_UUID --out .build/releases/reviewed
npm run studio:verify -- --input .build/releases/reviewed
```

This writes `release.json`, a report and checksummed referenced local files. Original external video URLs remain references, not bundled media. It refuses existing output and public/source directories. Verification is offline and requires the matching source checkout. These commands do not approve, build, upload or activate anything; a digest is integrity evidence, not a signature or permission to deploy an untrusted package.

### Local backup and restore drill

```sh
npm run local:backup
npm run local:restore-probe -- --input PRIVATE_BACKUP_DIRECTORY
```

A local backup captures `auth`, `catalog` and catalog public RPCs using one exported repeatable-read PostgreSQL snapshot, checksummed private media, an allowlisted matching source tree, and the private runtime configuration. It contains credentials and Auth data: keep the entire ignored backup directory private and never put it in release packages or static artifacts. The manifest pins SHA-256 file hashes and per-table row inventories.

The probe verifies those bytes, restores with the local container's operator account into a separately named temporary database, compares every selected table and tests RPC/private-function grants. It removes that temporary database afterward; it never restores over or resets the active authoring database. The media acceptance check also restores a deliberately damaged private image from a portable release package. These drills do **not** certify a cloud restore, Auth signing-key recovery, remote TLS, object-storage recovery, offsite encrypted retention, monitoring or a production recovery-time target.

## Building a site from a reviewed release

The ordinary `npm run build` and Pages workflow remain Git-driven. Release builds are an explicit, isolated path, not an environment switch applied to the working tree:

```sh
npm run site:build -- --input .build/releases/reviewed --out .build/site-artifacts/reviewed --realm OPERATOR_REALM_FILE --base /GameMap/ --browser
npm run site:verify -- --input .build/site-artifacts/reviewed
```

Staging/production artifacts require the exact frozen Git commit, a clean checkout, a matching independently supplied realm and non-dirty frozen context, and browser gates. For private local fixtures only, pass `--realm .build/catalog-local/realm.json --development`; the public site manifest and artifact evidence then remain explicitly marked as development output. Integrity verification is not a signature or deployment authorization.

The builder verifies the package before creating a private temporary checkout, materializes one snapshot provider, and never fills absent rows or translations from Git defaults. It uses the reviewed document bodies, derives all structured downloads, passes original and uploaded media through the deployment basename exactly once, and preserves every existing identity/address by default. Withdrawals or address moves need a separate explicit policy rather than a silent missing page. Workspaces are removed after use; existing artifact directories are never overwritten, and `dist/` in the developer checkout is untouched.

Build subprocesses receive no Supabase, database, session, or Vite-prefixed credentials. All documents compile as Markdown rather than executable MDX expressions. Active HTML, unsafe Markdown link schemes and image embeds smuggled into generated catalog prose are rejected; binary media belongs in typed attachments. Original external video references remain attributed links, not mirrored files.

Successful output contains `site/`, `build.log` and a completion `evidence.json` with exact release identity, Git/source identity, executed gates and a complete checksummed file inventory. Failed logs/partial output are not completed artifacts. Verify the exact inventory before promotion; preserve this artifact for rollback instead of rebuilding an old release with newer code. These commands do not upload, activate or change memberships.

The CI-only `tests/helpers/release-fixture.mjs` creates an isolated database/Auth fixture containing a database-only record, Chinese text, uploaded pixels and literal expression-shaped prose. It is never imported by production code; its development artifact must not be deployed.

## Local exact-artifact publication and rollback

This is a **local rehearsal**, not a GitHub Pages deployment or an authoring cutover. It accepts only browser-checked development artifacts whose release/context digests match immutable local database rows. A production-frozen artifact is refused. The Studio backend and browser never receive deployment credentials or an activation endpoint.

```sh
# Existing local stacks: append pending migrations without resetting data.
npm run local:migrate
npm run local:publisher-setup
npm run local:publication-status

# Use the predecessor artifact/release reported by status; use none only for an empty pointer.
npm run local:publish -- --input PRIVATE_SITE_ARTIFACT --expected EXPECTED_ARTIFACT_OR_none --expected-release EXPECTED_RELEASE_OR_none --run operator-reviewed-local-run
npm run local:publication-serve -- --port 4191

npm run local:rollback -- --artifact PREVIOUSLY_PUBLISHED_ARTIFACT --expected CURRENT_ARTIFACT --expected-release CURRENT_RELEASE --run operator-reviewed-local-rollback
npm run local:publication-recover
```

The private target is `.build/catalog-local/publication/`; visit the anonymous preview at `http://127.0.0.1:4191/GameMap/` when that is the artifact's basename. Only the committed delivery pointer's site files are served, never receipts, journals, credentials or older HTML. Neither `dist/` nor the Pages workflow is replaced. The independent `NOINHERIT` login is stored in private `.build/catalog-local/deployer.json`, not `.env`, Studio or a browser bundle. It cannot author/approve content, provision members or read private Auth/session tables.

On first use, the database target and filesystem marker bind a canonical private directory to that database instance. A PostgreSQL session advisory lock spans copying, SQL commit and journal cleanup; another operator cannot interleave a switch. The publisher verifies and copies exactly the artifact inventory into a retained directory, syncs its bytes/directories, writes a durable intent, atomically renames the `current` symlink, verifies the switched artifact, and only then activates its release/artifact with both expected predecessor identities. A separately atomic `published.json` pointer is updated after SQL commit, so anonymous readers remain on the old complete site while promotion is pending. Two builds of the same release still have distinct artifact identities. The earlier service-role-only release-pointer path is disabled even before target binding; it cannot bypass artifact-bound publication.

Files and PostgreSQL are **not one distributed transaction**. If a process dies before SQL commits, recovery restores the previous file pointer. If it dies after commit but before acknowledging/cleaning up, recovery preserves the committed artifact instead. Ambiguous failures retain the journal; recovery reads committed database state rather than guessing from files. Unexpected third-party pointers or damaged retained bytes stop recovery for investigation instead of silently overwriting them. Rollback uses only previously activated, re-verified retained artifacts; it never rebuilds old content with newer source. During a switch, individual requests use one complete snapshot; cached pages/assets and CDN-wide atomicity remain production-adapter concerns.

```sh
# First produce a real local reviewed fixture package, then exercise publication.
npm run test:local
npm run test:local:publication
```

The publication acceptance builds two browser-checked variants of the same real release and exercises independent operators, stale artifact CAS, anonymous reads, exact rollback, and actual process termination after switching, before commit and after commit. These are explicitly local test operations, not production editorial/deployment authorization.

Keep the retained publication artifacts, target marker and any pending journal when backing up an active publisher. The database/media/source restore probe alone does not restore this filesystem state or certify paired production recovery. Do not manually delete `current`, rewrite receipts or remove a pending journal to force a deployment.

## Export, verify and import

```sh
npm ci
node scripts/build/generate.mjs
npm run check
npm run platform:export -- --out .build/catalog-import
npm run platform:verify -- --input .build/catalog-import
```

Export is offline: no Supabase connection, external downloads, approvals or publication. Output must be private and new; existing packages are not overwritten.

| File | Contents |
| --- | --- |
| `bundle.json` | Format version, registered contracts, preserved sources, normalized projections and digest |
| `report.json` | Per-kind inventory, schema versions, locales, warnings and possible project matches |
| `import.sql` | Transactional import for an already migrated, backed-up database |
| `files/` | Checksummed source files and non-Markdown documentation artifacts |

IDs and canonical paths survive unchanged, including slash-containing research identifiers and anchors. Shared project URLs are review suggestions, not automatic merges. Source links retain their field and are not automatically labeled official evidence.

Verification uses independently loaded local inventories, raw source/module/migration hashes, archived Markdown, translation fingerprints and copied file bytes. Archived JavaScript is never evaluated. To verify an old package, use the matching checkout and source edits; a Git commit does not describe uncommitted files. An integrity digest is not a signature or proof of a trusted sender.

Packages contain drafts, source archives and executable SQL. Do not publicly serve them or blindly execute contributor-supplied packages. Review the report, verify the package, back up the database, apply migrations in an isolated local/staging environment, then apply `import.sql` through a protected connection. Reconcile records, IDs, paths, schemas, provenance, translations and asset checksums before proceeding.

Import is atomic. Identical re-import is a no-op; overlapping identities from a different package are refused rather than overwriting edits. Unknown contracts or mismatched registry declarations fail. Refreshing a populated catalog needs an explicit revision-based migration, not another initial import. Files are copied, not uploaded to Storage; retain original media until uploaded checksums and credits are verified.

Use `local:start` and `local:setup` for the isolated Docker-backed project. The pinned CLI is a development dependency, and configuration disables public signup and automatic seeding. Do not reset an existing authoring database to refresh an import, and never run reset/push/link commands against production.

## Release and cutover gates

A reviewer freezes approved, validated revisions and a pinned Git commit. Missing references and duplicate entry versions fail. The frozen manifest captures selected schema contracts and vocabularies, not mutable pointers to them. It excludes private source archives, membership and review notes. Freezing is not publication.

A release stores exact `manifest_text` bytes and their SHA-256 digest, plus an independently hashed immutable build context containing the exact selected revision IDs/digests, configuration, compiler hashes, public Markdown and asset references. Activation rejects a release without its matching context. Hash those bytes before parsing; reserialized JSON may have different bytes. The isolated build worker renders that exact release with pinned Markdown and verifies assets plus source/rendered/browser checks. The local protected publisher now promotes that exact artifact before activation, with durable recovery and expected release/artifact predecessors. A future production adapter must provide equivalent protected upload and independently verified deployment evidence. An older slow build cannot overwrite a newer activation. Rollback also needs the matching deployed website artifact; changing the database pointer alone does not restore files.

Static snapshots cannot guarantee instant withdrawal from cached or offline pages. An emergency denylist or online gate remains a separate requirement.

The [offline staging-readiness review](./staging-readiness.md) records the remaining environment/hosting/recovery blockers and a disabled planning configuration. Preparing that configuration is not cloud integration or permission to change the current Pages workflow.

Before switching structured authoring to the database:

1. Repeat the now-exercised real local Auth/database acceptance in protected staging, including remote TLS, account provisioning and operational configuration. Local success is not cloud integration certification.
2. Exercise the isolated release builder against a real reviewed staging catalog, reconcile migration results and approve the authoring-source cutover before removing Git authoring paths. Local fixture parity does not authorize a production switch.
3. Extend the locally exercised protected publisher to the production hosting adapter, with deployment evidence, paired backup/restore drills, failure recovery and exact-artifact rollback under real hosting/CDN constraints. The web role must remain unable to activate releases.
4. Add an emergency withdrawal mechanism and, if needed, a cloud object-store adapter with equivalent checksum and access guarantees.
5. Switch each collection's authoring exactly once, retaining a read-only migration/source archive.

Until those gates pass, keep using the existing Git workflow. The foundation is not a completed production CMS.
