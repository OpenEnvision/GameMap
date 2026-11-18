# GameMap documentation

Guides, research dossiers, and reference pages for building games with AI. The website renders each page at `/docs/<path>/`, where the path is the file path below without `.md`. This index is for reading the folder on GitHub; the website has its own documentation home. Chinese translations of every page are in [`zh/`](zh/README.md).

## Folders

| Folder | What it covers | Start with |
| --- | --- | --- |
| [`guides/`](guides/) | Finding a starting point and turning resources into a working game | [Reading guide](guides/reading-guide.md) |
| [`ecosystem/`](ecosystem/) | Coding agents, engines, AI for 2D and 3D, and world models | [Coding agents](ecosystem/agents.md) |
| [`production/`](production/) | Engine operations, work orders, debugging, and studio case studies | [Overview](production/overview.md) |
| [`assets/`](assets/) | Generative tools, provider terms, delivery, validation, and visual feedback | [Generative tools](assets/generative-tools.md) |
| [`evaluation/`](evaluation/) | Evaluation research, benchmarks, and review ledgers | [Evaluating agents](evaluation/development-evaluation.md) |
| [`reference/`](reference/) | The full resource catalog, the testing library, and media and logo credits | [Resource catalog](reference/catalog.md) |
| [`skills/`](skills/) | Installable agent skill packages | [Level design skill](skills/level-design/SKILL.md) |
| [`project/`](project/) | Running and maintaining this site: deployment, content model, import, staging, design, and art | [Development and deployment](project/deployment.md) |
| [`zh/`](zh/) | The same tree in Chinese | [中文文档](zh/README.md) |

## Pages

**Guides**

- [Reading guide](guides/reading-guide.md): choose an entry point for your question.
- [Practical guide](guides/practical-guide.md): go from a resource map to a runnable game.
- [Level design](guides/level-design.md): plan, block out, and playtest levels with the bundled skill.

**Ecosystem**

- [Coding agents](ecosystem/agents.md): models, harnesses, skills, MCP, and engine bridges.
- [Engines](ecosystem/engines.md): game engines, rendering libraries, and content tools.
- [AI for 2D and 3D](ecosystem/2d-3d-development.md): rule generation, project construction, scene editing, and evaluation.
- [World models](ecosystem/world-models.md): executable, video, and engine-driven world models.

**Production**

- [Overview](production/overview.md): find the right dossier for a production task.
- [Tools](production/tools.md): animation, procedural content, audio, rendering, and validation tools.
- [Engine operations](production/engine-operations.md): completion signals, artifacts, and recovery.
- [Work orders](production/work-orders.md): templates from asset creation to delivery.
- [Studio case studies](production/studio-case-studies.md): lessons from published engineering accounts.
- [Native operations](production/native-operations.md): native commands, files, and lifecycle events.
- [Debugging](production/debugging.md): profilers and diagnostics tied to a game state.
- [Coverage gaps](production/coverage-gaps.md): what each production stage covers and what remains.

**Assets**

- [Generative tools](assets/generative-tools.md): job lifecycles, outputs, integration, and terms.
- [API terms](assets/api-terms.md): output rights, research use, and provider training terms.
- [Generation and delivery](assets/generation-delivery.md): from a job request to a validated asset.
- [Validation](assets/validation.md): format, geometry, material, animation, and import checks.
- [Selection](assets/selection.md): retrieve, compare, and revise asset candidates.
- [Visual evidence](assets/visual-evidence.md): screenshots, video, and traces as evidence of change.
- [Visual feedback](assets/visual-feedback.md): what an agent should inspect and when to check again.

**Evaluation**

- [Development evaluation](evaluation/development-evaluation.md): choose an evaluation for what the agent produces.
- [Benchmarks](evaluation/benchmarks.md): code, data, and harnesses needed to reproduce studies.
- [Gameplay state](evaluation/gameplay-state.md): saves, checkpoints, replays, and durable effects.
- [Agent interfaces](evaluation/agent-interfaces.md): permissions, resets, and verification for agent-game interfaces.
- [Review coverage](evaluation/review-coverage.md): corrections to catalog descriptions and terms.
- [Source revisions](evaluation/source-revisions.md): pinned source files behind documented behavior.
- [Community cases](evaluation/community-cases.md): community games traced to build notes and source.

**Reference**

- [Resource catalog](reference/catalog.md): every curated resource, by category.
- [Testing library](reference/testing-library.md): runnable projects, environments, and assets for tests.
- [Media sources](reference/media-sources.md): credits for preview clips and screenshots.
- [Logo sources](reference/logo-sources.md): the identity and source behind each resource mark.

**Project**

- [Development and deployment](project/deployment.md): local development, builds, and GitHub Pages.
- [Content model](project/content-model.md): source content, presentation, and coverage checks.
- [Content platform](project/content-platform.md): database-authored content, review, and releases.
- [Remote import](project/remote-import.md): import reviewed candidate packages as local drafts.
- [Staging readiness](project/staging-readiness.md): what blocks a move to cloud staging.
- [Design system, second edition](project/design/v2/design-system.md) and [first edition](project/design/v1/design-system.md): design records with their concept images.
- [Editorial art prompts](project/art/prompts.md): prompts and originals for the editorial illustrations.

The project overview and contribution guide are the repository's [README](../README.md) and [CONTRIBUTING](../CONTRIBUTING.md).

## Generated pages

Do not edit these files by hand. They are rendered from structured data by the generators in `website/content/generators.config.json`; run `node scripts/build/generate.mjs` after changing the data.

- `reference/catalog.md`, from `data/segments/*.json`
- `reference/testing-library.md` and `reference/logo-sources.md`, from the catalog modules in `website/src/data/`
- `tutorials-and-demos.md`, `coding-agent-game-code.md`, and `cadle-repositories.md`, short notices for catalogs that moved to the website's Game examples page

## Writing conventions

These rules extend the "Writing for readers" and "Translations" sections of [CONTRIBUTING](../CONTRIBUTING.md).

- **Placement.** Put a page in the folder that matches its navigation group, and add it to `website/docs.config.json`. A page outside the navigation is listed under "More notes".
- **File names.** Use short, lowercase, hyphenated nouns for the topic, without type suffixes such as `-notes` or `-contracts`. The file path is the public URL. When you move or rename a page, add redirects for `/docs/<old>/`, `/docs/zh/<old>/`, `/zh/docs/<old>/`, and `/zh/docs/zh/<old>/` to `website/content/document-redirects.json`.
- **Title.** Write one H1 in sentence case: capitalize the first word and proper names only. Name the topic; do not add words such as "notes", "research", or "GameMap".
- **Opening paragraph.** Say what the page helps the reader decide or do. Keep review dates, counts, and internal identifiers out of it. Pages under `project/` are maintenance records and may open with a status or verdict after that sentence.
- **Headings.** Use sentence case, and number headings only when the order matters. Keep existing headings stable: other pages and the catalog data link to their anchors.
- **Links.** Link to other pages with relative `.md` paths so the links work both on GitHub and on the website. Link claims to primary sources.
- **Translations.** Every page needs a counterpart at the same path under `zh/` with the same sections, lists, tables, code, and links. Run `npm run check:docs`. After reviewing both versions, update the pair's hashes in `website/content/i18n/docs.zh.sources.json`.
