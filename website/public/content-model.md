# Content model and coverage contract

GameMap treats source content, presentation, and discovery as separate responsibilities. A checked-in array is not proof that its contents appear on the website. Coverage checks must reach the generated HTML.

## Authoritative definitions

| Definition | Responsibility |
| --- | --- |
| `website/content/models.ts` | Content kinds, typed source models, presentation blocks, and registry API |
| `website/content/sources.config.json` | Every data module, runtime export, fragment, attachment, and metadata owner |
| `website/content/site.ts` | Route definitions, canonical URL helpers, and navigation |
| `website/content/fields.ts` | Exhaustive field presentation or a documented structural use |
| `website/content/registry-core.ts` | Normalize source records without overwrites, validate identities and references, derive inventories |
| `scripts/lib/documents.mjs` | Recursively discover Markdown; labels cannot exclude a document |
| `website/content/registry.ts` | The prepared registry consumed by the application |

The resource directory, game examples, agent toolkit, testing library, development paths, project recordings, discovery collections, and repository research remain distinct kinds. Research candidates are not silently promoted into curated resources or verified playable cases. Engine foundations are not labeled AI-authored games.

## Identity and ownership

Each material record has a stable key of `kind:id`, a canonical URL or anchor, and an owning collection. IDs are authored, not generated from array positions or mutable titles. Duplicate keys and canonical addresses are errors rather than last-write-wins assignments.

Development steps belong to a track and retain separate description, deliverable, and checkpoint fields. Testing starters retain their task and measurement fields. Case attribution records creator evidence; a related resource link or model name does not establish the coding-agent client.

Data fragments are checked independently of their aggregate exports. Adding a case to a fragment but forgetting to include it in the gallery must fail. New data files and runtime exports require an explicit source disposition. Schema labels, identity assets, screenshots, and artwork have declared owners rather than becoming uncounted parallel catalogs.

## Recordings are one-to-many

A resource may have multiple curated excerpts and original project recordings. The registry does not index recordings by resource ID alone and does not mutate original video or poster collections to select a preferred clip.

Curated excerpts and source-recording records stay distinct even when they reference the same original film. Consequently, recording-record counts are not claims about unique video files. Original links, creator credit, prompts, alternate previews, and responsive variants are retained. Previews require user playback; they never autoplay.

## Documents and search

Every Markdown file under `docs/` and at the repository root—including the hand-maintained README, full catalog, and contribution guide—is discovered automatically. Configured groups provide labels and order; unconfigured documents appear under More notes. Missing configured sources and duplicate slugs are errors.

The same registry feeds navigation, canonical links, static routes, the complete content index, and global search. Global search includes article bodies and structured fields across all kinds. Collection filters intentionally narrow their own library; the complete index filters titles, summaries, and structured metadata. Source Markdown remains authoritative and is never rewritten by documentation preparation. Reviewed native HTML such as disclosures, summary text, inline code, and explicit anchors is preserved. New raw HTML tags or attributes require an explicit policy rather than being silently discarded or executed.

## Validation layers

1. **Source inventory:** compare registered keys with raw collections and independently loaded fragment exports. Reject unclassified modules, unhandled fields, duplicates, orphan attachments, missing attribution, and invalid references.
2. **Static route inventory:** derive pre-rendered paths, sitemap entries, and build manifests from canonical registry addresses rather than maintaining another page list.
3. **Rendered coverage:** require every record on its canonical HTML page or anchor, a real discovery entry, and the visible text, links, images, and recording sources of its presentation blocks. Article text and links are checked against the original Markdown.
4. **Freshness:** compare source and content digests so an old build cannot pass after source changes.
5. **Regression tests:** deliberately omit records, fragment rows, fields, routes, and media references to verify that validation fails.
6. **Browser checks:** exercise filtering, client/model attribution, multi-recording selection, mobile layout, direct URLs, global search, and reading without JavaScript.

Run `npm run check` before building. Run `PAGES_BASE_PATH=/GameMap/ npm run build`, then `npm run check:build` and `npm run test:web`. Source checks do not require an existing build directory.

The build publishes a machine-readable `content-manifest.json` alongside the complete content index. Counts are derived from current source records; they are not manually maintained here. These checks establish content exposure and internal consistency, not execution, licensing clearance, production readiness, or factual verification of external projects.

## Adding content

- Add a row to an existing typed collection and keep its source evidence and limitations. Its existing adapter registers and renders it automatically.
- For a new data module or export, declare its owner and shape in the source inventory. A fragment must also be included in its aggregate collection; independent inventory checks detect omissions.
- For a new field or content kind, define its type and explicit presentation before publishing. Structural omissions require an explanation; unknown runtime fields fail validation.
- Add Markdown anywhere under `docs/`. Navigation, static rendering, search, and coverage discovery follow automatically. Add an optional label to `website/docs.config.json` for deliberate placement.
- Do not remove unavailable sources, historical identities, alternate recordings, attribution boundaries, or license qualifications merely to simplify a view.
