# Additive remote candidates → local drafts

`npm run remote:import -- --package /absolute/remote-package` is **offline dry-run by default**. It neither discovers Supabase credentials nor connects to a database. It accepts only the `gamemap.remote-candidates` v1 packet, checks every manifested source file's bytes/hash, rejects traversal/symlinks/duplicate identities, and compiles **all** candidates with the installed typed contracts and normalized catalog projection. Unsupported payload/attachment/translation envelopes fail closed, even for existing keys. Preserve the actual `0013_catalog_release_realm.sql`, then install the types lane's real `0014_catalog_extended_types.sql` before `0015_catalog_remote_import.sql`; do not invent a placeholder migration.

No remote services, HTTP fetches, remote SQL URLs, source execution, autoapproval, publication, Git writes, asset installation, or database-mode switch are provided. Source commit metadata and hashes establish consistency, **not authenticity**; independently verify the pinned repository/revision through the extractor.

## Deterministic whole-packet fidelity

Both the source verifier and importer call `verifyRemoteSourceFidelity`: after manifest hash checks, it reruns the existing `recoverRemoteSource` over **only those manifested original bytes**. It compares the complete deterministic packet: every entry identity, title, summary, native/loader payload, attachment and `source_review`, plus candidate/exclusion membership and reasons, source inventory, artifact destinations and original documents. Schema validity alone is insufficient. A forged Codex detail, paper provenance, arbitrary loader candidate, omitted candidate or fabricated exclusion fails even when every original source hash stays unchanged. Missing required source inputs fail closed. The importer performs this check before compilation or any DB work; there is no bypass for fixtures or existing keys.

Rebuild packets with the **final installed schemas** before import: schema acceptance determines exclusions. Old packets are not silently upgraded. The verifier intentionally requires deterministic array ordering as emitted by recovery. Pinned clean-checkout generation (`node scripts/remote-source.mjs --source PINNED_CHECKOUT --out EMPTY_DIRECTORY`) or an independently trusted digest is still necessary: re-extraction cannot authenticate jointly replaced source bytes and hashes.

### Two exact image path normalizations

The pinned source has two mislabeled files. Recovery keeps each original `source/<source_path>` byte-for-byte, with its original name, size and SHA-256. Only the proposed Git destination and corresponding candidate image references change:

| Preserved source                           | Proposed destination                                       | Required original byte format |
| ------------------------------------------ | ---------------------------------------------------------- | ----------------------------- |
| `logos/crazygames-c284e89a355c.png`        | `website/public/logos/crazygames-c284e89a355c.jpg`         | JPEG                          |
| `logos/stable-audio-open-e030c46f6897.png` | `website/public/logos/stable-audio-open-e030c46f6897.webp` | WebP                          |

This is an exact-name mapping, not general extension sniffing, transcoding or a MIME exemption. Recovery checks the mapped bytes' format, emits the mapping in the entry's `source_review.image_path_normalizations` and artifact `source_path`/`path`, and re-extraction must reproduce it exactly. Existing `/GameMap/` media-prefix normalization is retained. A normalized destination already present among source paths is rejected, even for identical bytes. No code here writes proposed destinations; the importer reports existing Git destinations as identical/conflict and requires referenced installed bytes to match before apply. Integrate missing destinations only; never overwrite existing files. All other raster destination extensions still must match actual format, decode successfully, and satisfy the existing 40-megapixel bound. Original source URLs, credits, hash identity and license/review/playtesting caveats are not rewritten or treated as permission.

### Pinned media namespace and MP4 validation

All remote `media/**` references (including `/media/**` and `/GameMap/media/**`) map deterministically to `media/imports/a2fe9a8e1d7b05008e11db1586d308c0086f7d91/**`. Proposed Git destinations add `website/public/`. The suffix is unchanged; all corresponding payload/attachment references use the mapped path. This isolates every draft screenshot, video and poster from Git-managed media inventories, including `website/public/media/learning/` and `website/public/media/showcase/`: do not edit Git manifests or source records to install draft assets. Logo paths keep their existing collision checks and the two exact extension corrections above.

Original source paths, bytes, sizes and hashes remain intact in `source/` and the file manifest. Each affected candidate records `source_review.media_path_normalizations` with source path, destination path and reason; artifacts also retain both paths. Full-envelope re-extraction validates these mappings and every other candidate field. Source-path/destination collisions are rejected, and existing destination conflicts are reported and block asset verification before apply. Only missing reviewed destinations may be installed, without overwriting unrelated content.

MP4 proposals use the same `scripts/lib/mp4.mjs` inspector as the managed-showcase check, not extension-only acceptance. It validates bounded box headers/sizes, the `ftyp` signature, nonempty media data, progressive `moov` ordering, exactly one H.264 (`avc1`) video track/sample entry with AVC configuration, header bounds/versions, positive safe duration/timing, and positive dimensions within 40 megapixels. The existing 20 MB proposal limit remains. This structural validation is not a decoder, transcoder, license clearance or approval to publish; source bytes are never modified.

## Research results are database-owned evidence

Search/review archives are not guides. Migration `0017_catalog_research_archives.sql` stores full original UTF-8 text, source revision/path/SHA-256/byte length, reconstructed Markdown where applicable, parsed sections/table rows, original candidate payloads and all historical exclusions in immutable `catalog.research_*` tables. Findings link to existing catalog entries without rewriting those entries or certifying their claims. Source-only, pending, excluded, restrictive-license and not-built/not-playtested/test-not-run states remain unchanged. HTML is retained as inert text, never executed.

The initial migration covers **47 research/archive documents, the import index and the original candidate JSON: 49 sources, 2,290 findings, 46 unresolved/excluded games and 115 original exclusions**. A separate follow-up stores **49 old guide snapshots plus the complete conversion metadata: 50 additional sources and 1,774 findings**. There are now **99 source archives and 4,064 findings**; neither batch rewrites the other or publishes content. Current tutorials, design documents, operation guides and skills remain Git-authored. The old publishing-platform guides, which have no current Markdown counterpart, remain inspectable in the database.

`docs/remote/` is removed entirely after full read-back. Its former `provenance.json` is preserved verbatim as the `remote/document-provenance` database source. `config/research-archive-receipt.json` and `config/research-archive-remainder-receipt.json` retain only verified hashes/counts and gate cleanup. Cleanup refuses unarchived or modified files and does not regenerate archive pages; current guide links must not point into the retired namespace.

```sh
# Offline compilation; no database or file deletion.
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY
# Existing owned-local stack only; back up before migration and again afterward.
npm run local:backup
npm run local:migrate
npm run local:backup
# Use the fresh backup and an existing verified admin UUID.
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --actor ADMIN_UUID --backup PRIVATE_BACKUP --apply
# Independently re-read all stored originals, findings and exclusions.
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --verify
# Store the remaining historical guides and conversion metadata in a separate batch.
# Use a fresh backup before apply.
npm run local:backup
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --remaining --actor ADMIN_UUID --backup PRIVATE_BACKUP --apply
npm run research:import -- --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY --remaining --verify
# Both matching verified receipts are required before removing the remote tree.
node scripts/recover-remote-documents.mjs --packet PRIVATE_PACKET --checkout PINNED_GIT_REPOSITORY
```

Studio's **Research evidence** workspace provides authenticated search by project, license or review limitation, links to catalog records, complete source inspection and lossless original-text download. Anonymous access and direct table writes are denied. This evidence lane never submits, approves, freezes or publishes catalog content. Replaying the same batch changes no row; conflicting sources, changed backup inventories or byte/hash mismatches stop the transaction. Keep private backups and verify restoration with `npm run local:restore-probe -- --input PRIVATE_BACKUP`.

## Safe parent/operator workflow

Only the parent/operator may run the DB steps. Keep the existing local stack; **do not reset, reinitialize, seed, or use initial full-snapshot import against the populated catalog**.

1. Integrate/review the owned lanes, including the final typed adapters/contracts and contiguous realm `0013`, types `0014`, and ingestion `0015` migrations. Run `npm run test:remote:source`, `npm run test:remote:import` and the merged platform suite. Review source inventory, excluded reasons, evidence/license caveats, and the packet. Preserve existing dirty files.
2. Run the offline dry-run above. A failure blocks import. The full validated report includes candidate/exclusion counts and proposed Git document/media paths with `missing`, `identical`, or `conflict` status. Do not silently fix source content or overwrite conflicting files. Rebuild a reviewed deterministic packet if corrections are approved.
3. Integrate only reviewed, missing Git assets through the existing source workflow, preserving exact bytes. Import research documents through the evidence workflow above, not as duplicate guide pages. Allowed proposed asset destinations are `website/public/media/` and `website/public/logos/`; research originals are retained in the database evidence archive. Raster bytes must match their declared image extension and decode within the existing 40-megapixel bound. MP4 bytes must pass the shared structural/codec checks above; showcase assets must use the pinned import namespace, not the managed showreel root. SVG is inert provenance here, **not sanitized or approved for inline rendering**: independently review it; never inject source SVG/HTML into the DOM. Referenced assets must exist with matching bytes/hashes before apply. The original candidate importer reports documents only; the separate research-evidence importer above stores their complete content.
4. Stop Studio, publication jobs, Auth/account writers and other local DB writers. Make a **pre-migration** backup with `npm run local:backup`; retain its private output path. Review/apply migrations with `npm run local:migrate` (local only, existing stack). Create a **fresh post-migration** backup with `npm run local:backup`. This second backup must contain every current `auth`, `catalog`, and `public` table and unchanged row inventories. Preserve both backups. Never paste `runtime.env`, DB URLs, credentials, or dump contents into reports.
5. Recommended restore proof: `npm run local:restore-probe -- /absolute/post-migration-backup`. This uses the existing separate temporary local restore database, not the active catalog. The importer itself verifies backup format, local marker, schemas, dump/runtime/source/media hashes, and exact current DB row inventories; it does not independently prove dump restorability.
6. Identify an **existing Auth user with catalog admin membership** who is responsible for the drafts. The command never provisions accounts or accepts an arbitrary authorship claim. Read-only comparison:

   ```sh
   npm run remote:import -- --package /absolute/remote-package --inspect --actor EXISTING_ADMIN_UUID
   ```

   Inspect reports every existing key as a conflict, distinguishing equal canonical bodies. It does not skip validation or mutate audit/workflow/release data. It may be stale by apply time.

7. Explicit apply, using the private post-migration backup directory:

   ```sh
   npm run remote:import -- --package /absolute/remote-package --apply \
     --actor EXISTING_ADMIN_UUID --backup /absolute/post-migration-backup
   ```

   The connection comes only from the existing local-runtime status, requires loopback port `54322`, database `postgres`, no URL overrides, and the actual catalog schema owner. SQL independently requires that owner and admin actor. Owner credentials are never printed. Driver errors are deliberately reduced to a safe stage-only failure message.

8. Independently compare before/after existing identities, immutable revisions, normalized rows, workflow states, releases/items/contexts, deployment/publication state and events against the backup. Only new draft entries and their normalized dependent rows, validation receipts, import provenance/audit may be added. Run the exact apply command again: it returns the original durable result and makes no changes. A retry still requires valid backup files and verified source/type/assets; its old inventory is accepted only when the exact batch already committed. Require independent review before any later release; the importing admin cannot approve their own revisions.

## Transaction and provenance

`0015_catalog_remote_import.sql` adds one immutable batch ledger and an owner-only invoker function. It reuses `catalog.import_snapshot` **only after filtering missing identities and their normalized dependents under lock**. Existing keys are never passed to that initial-import function. No existing body/head/revision/state is changed, including equal-body conflicts. Shared vocabulary/assets must match exactly or the whole batch rolls back. Missing relation targets, canonical-path collisions, and constraint failures also roll back every insert, receipt and audit entry.

The CLI transaction takes the existing catalog import advisory lock and ordered write-excluding locks on every `catalog` table before comparing inventories and selecting missing keys. Supabase-owned `auth` and `public` system tables are read for the full backup-freshness comparison, but are never locked or written by this tool: the catalog owner may have read access without system-table write/lock privileges. Do not grant broader privileges to run an import. A pre-existing change in any backup-covered table stops a new batch; stop writers and take a fresh backup rather than overriding the check. Catalog writes remain excluded throughout the transaction; unrelated system activity is not frozen, so quiesce other writers as instructed above. Locks are maintenance-oriented, with bounded CLI timeouts. No partial batch is committed.

Batch identity is SHA-256 of canonical packet JSON. Source hashes, exclusions, original bodies, source references and remote review caveats remain immutable in the ledger; the compiled snapshot digest is recorded separately. New revision source review additionally names its batch, and a trigger attributes `created_by` to the verified admin. Existing review/release functions enforce independent authorship review. The SQL function is unavailable to `anon`, `authenticated`, `service_role`, `catalog_backend`, and `catalog_deployer`; this is an explicit owner-operated migration tool, not a public ingestion API. A database owner can always bypass application controls; only run reviewed code/packets.

## Validation and limits

`npm run test:remote:import` uses only isolated PGlite and temporary fixture directories. It applies real baseline migrations 0001–0013 (including the immutable release realm), the real types 0014 if integrated, and then 0015 explicitly; the ingestion lane does not own/create 0014. Publication fixtures register an explicit realm and artifact-bound receipt through the current APIs; no backend code is replaced with pre-realm behavior. Tests cover populated approved/released state preservation, conflicts and identical bodies, normalized links/terms/assets, attributable drafts, immutable retries, forbidden self-review/roles, packet tampering and path/type rejection, schema-valid whole-entry/provenance forgeries with unchanged source hashes, deterministic exact image normalization and collision/format rejection, rollback after mid-batch FK failure, stale/concurrent scheduling, backup hashes, and the offline CLI. PGlite serializes a single connection: the stale-winner test does not replace a parent multi-connection PostgreSQL lock test.

The compiler uses checked-out typed source as reference-validation context, not untrusted DB bodies; references unsupported by that context or missing at DB insertion fail closed. The v1 packet has no independent translation envelope: existing typed attachments are preserved and normalized; unexpected translation fields are rejected, never hidden in a parallel JSON/blob store. Source-package artifacts are not a new runtime blob store. No network authenticity, factual claim, licensing clearance, playtesting, SVG sanitization, or restore success is inferred from structural validation.
