# Content model and coverage contract

If a game is in a source fragment but missing from search, follow its stable ID. Check that the fragment reaches the owning collection, that its detail route was built, and that the search index lists that route. A row can pass source validation and still disappear at one of these steps. For a missing Chinese field, start from the same ID and compare the translation fingerprint before changing the page component.

## Authoritative definitions

| Definition | Responsibility |
| --- | --- |
| `website/content/contracts.ts` | Versioned runtime payload and attachment validation and inferred TypeScript models |
| `website/content/models.ts` | Content kinds, per-kind schema version, authoring owner, validator key, presentation blocks, and registry API |
| `website/content/assembly.ts` | Rehydrate selected database revisions without filling missing business rows from Git |
| `website/content/source-data.ts` | Exports the repository data and translation overlays used by local development and production builds |
| `website/content/generators.config.json` | Registered derived document addresses and trusted source renderers; no executable database recipes |
| `website/content/sources.config.json` | Every data module, runtime export, fragment, attachment, and metadata owner |
| `website/content/site.ts` | Route definitions, canonical URL helpers, and navigation |
| `website/content/fields.ts` | Exhaustive field presentation or a documented structural use |
| `website/content/registry-core.ts` | Normalize source records without overwrites, validate identities and references, derive inventories |
| `scripts/lib/documents.mjs` | Recursively discover Markdown; labels cannot exclude a document |
| `website/content/registry.server.ts` | Server/build registry; routes serialize only the data their view requires |
| `website/content/taxonomy.json` | Shared category, stage, resource-type, and access-kind definitions |

Reader-facing blocks contain explanations, instructions, links, credits, and relevant limitations. Technical metadata such as audit dates, internal flags, revision hashes, and numeric IDs stays in source records and the published content manifest; it is not rendered as an extra details panel or added to full-text search. Creation attribution, licensing categories, review status, and execution status remain reader-facing provenance.

The resource directory, game examples, agent toolkit, testing library, development paths, project recordings, discovery collections, and repository research remain distinct kinds. Research candidates are not silently promoted into curated resources or verified playable cases. Engine foundations are not labeled AI-authored games.

## Identity and ownership

Each material record has a stable key of `kind:id`. Public records also have a canonical URL or anchor and an owning collection. IDs are authored, not generated from array positions or mutable titles. Duplicate keys and canonical addresses are errors rather than last-write-wins assignments.

Development paths (`path`) and their steps (`step`) are authoring-only records. Their source data, stable identities and content-manifest entries remain validated. Retained `/paths/` addresses identify these records but are not published routes. Neither kind appears in public navigation, pre-rendered pages or global search.

Development steps belong to a track and retain separate description, deliverable, and checkpoint fields. Testing starters retain their task and measurement fields. Case attribution records creator evidence; a related resource link or model name does not establish the coding-agent client.

Data fragments are checked independently of their aggregate exports. Adding a case to a fragment but forgetting to include it in the gallery must fail. New data files and runtime exports require an explicit source disposition. Schema labels, identity assets, screenshots, and artwork have declared owners rather than becoming uncounted parallel catalogs.

## Recordings are one-to-many

A resource may have multiple curated excerpts and original project recordings. The registry does not index recordings by resource ID alone and does not mutate original video or poster collections to select a preferred clip.

`website/src/data/recordings.ts` authors each original film once and nests its explicitly identified presentations. A resource can reference multiple originals, and each original can have multiple excerpts or responsive renditions. Resource pages group shared originals rather than duplicating the same movie card. Every previous presentation URL and credit remains addressable. Original links, creator credit, prompts, alternate previews, and responsive variants are retained. Previews require user playback; they never autoplay.

## Documents and search

Every Markdown file under `docs/` and at the repository root—including the hand-maintained README, full catalog, and contribution guide—is discovered automatically. Configured groups provide labels and order; unconfigured documents appear under More notes. Missing configured sources and duplicate slugs are errors.

The registry feeds navigation, canonical links, static routes and global search for public records. Homepage navigation leads to each owning collection rather than a separate full-content directory. Global search includes article bodies and structured fields across public kinds. The homepage and search dialog share full-text matching over a compact static document export, without shipping a large inverted database. Collection filters use the same token-matching rules within their explicitly scoped structured fields. The full source registry is server-only; client bundles do not import the research ledger. Client-only form controls remain disabled until hydration restores browser query state; native links, disclosures, and article reading remain available without JavaScript. This prevents an early selection from being consumed by a static placeholder state.

Source Markdown remains authoritative and is never rewritten by documentation preparation. Reviewed native HTML such as disclosures, summary text, inline code, and explicit anchors is preserved. New raw HTML tags or attributes require an explicit policy rather than being silently discarded or executed.

## Validation layers

1. **Source inventory:** compare registered keys with raw collections and independently loaded fragment exports. Reject unclassified modules, unhandled fields, duplicates, orphan attachments, missing attribution, and invalid references.
2. **Static route inventory:** derive pre-rendered paths, sitemap entries, and build manifests from public canonical registry addresses rather than maintaining another page list.
3. **Rendered coverage:** require every public record on its canonical HTML page or anchor, a real discovery entry, and the visible text, links, images, and recording sources of its reader-facing blocks. Source-only metadata remains in the manifest. Article text and links are checked against the original Markdown.
4. **Freshness:** compare source and content digests so an old build cannot pass after source changes.
5. **Regression tests:** deliberately omit records, fragment rows, fields, routes, and media references to verify that validation fails.
6. **Browser checks:** exercise filtering, client/model attribution, multi-recording selection, mobile layout, direct URLs, global search, and reading without JavaScript.

Run `npm run check` before building. Run `PAGES_BASE_PATH=/GameMap/ npm run build`, then `npm run check:build`. Open the site with `npm run preview` and exercise filters, navigation, and the mobile layout in both locales. Source checks do not require an existing build directory.

The build publishes a machine-readable `content-manifest.json` containing all registered records, including authoring-only paths and steps. Public records are discoverable through their owning collections and global search. Counts are derived from current source records; they are not manually maintained here. These checks establish content exposure and internal consistency, not execution, licensing clearance, production readiness, or factual verification of external projects.

## Development and packages

`npm run dev` generates derived files from the repository content and translation overlays, prepares documents and starts the local React Router preview.

The development server watches content sources, Markdown and navigation configuration. A refresh error is reported in the terminal. Correct the source data and save again to prepare the updated input.

`npm run build` produces the static release from the same sources. `npm run preview` serves the existing build, so rebuild first after changing the source.

Catalog arrays and the repository research ledger share `data/segments/`, with explicit kind declarations in the source inventory. The research ledger is not promoted into resource cards. Skill packages live under `docs/skills/`, preserve their separate licenses, and generate deterministic archives checked byte-for-byte against their sources.

## Documentation languages

English URLs remain unchanged. Chinese application views use `/zh/`; the existing `/docs/zh/` guides retain their addresses. Language links preserve collection filters and detail anchors. Matching document slugs select the actual Chinese guide; untranslated articles are readable under `/zh/docs/` with Chinese navigation, an English-source label, and an English-language article body. Documentation entrances open the learning hub in the selected language, with task paths and a topic directory. The sidebar prefers translated counterparts without duplicating the same article.

Interface messages live under `website/content/i18n/`. Content translations are server-only overlays keyed by the original `kind:id` and source text field. They do not create resource records or change IDs, enum values, source URLs, creator credits, or licenses. Each translated field has a reviewed English-source fingerprint; a changed source falls back to English and fails locale validation until reviewed. The level-design toolkit view inherits its translated title and summary from the catalog entity.

Public records in both locales are pre-rendered and checked for visible fields, owning collections, navigation discovery, Markdown bodies, language-aware internal links, source-language markers, and static search. A localization digest prevents a stale build from passing after translation changes. Native language links and reading work without JavaScript.

## Adding content

- Edit the owning file under `data/segments/` or `website/src/data/`, retaining source evidence and limitations.
- Give new records in an existing typed collection a stable ID. Its adapter brings the record into the registry.
- For a new data module or export, declare its owner and shape in the source inventory. A fragment must also be included in its aggregate collection; independent inventory checks detect omissions.
- For a new field or content kind, define its type and explicit presentation before publishing. Structural omissions require an explanation; unknown runtime fields fail validation. Declare its runtime schema in `contracts.ts`, derive the TypeScript type, and declare its version, owner and validator key in `contentKinds`.
- Add Markdown anywhere under `docs/`. Navigation, static rendering, search, and coverage discovery follow automatically. Add an optional label to `website/docs.config.json` for deliberate placement.
- Do not remove unavailable sources, historical identities, alternate recordings, attribution boundaries, or license qualifications merely to simplify a view.
