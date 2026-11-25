# GameMap

<div align="center">

![GameMap](website/public/brand/gamemap.svg)

**OpenEnvision X Tencent · AI Game Development**

Game examples you can study, production guides you can use on a project, and source notes for evaluating AI in games.

[Website](https://openenvision.org/GameMap/) · [Resource catalog](docs/reference/catalog.md) · [Documentation](docs/guides/practical-guide.md) · [中文指南](docs/zh/guides/reading-guide.md) · [Contributing](CONTRIBUTING.md)

</div>

## Abstract

Start with the job at hand. An engineer choosing a Godot reference can check the engine version and launch path before copying code. A technical artist importing a new rig can look up the checks for scale, textures, and foot contact. A researcher comparing development agents can check who controls the game, what each agent sees, and how failed runs enter the reported result.

Public entries have English and Chinese pages, and the site searches a static index in the browser. A case entry tells you how to find the project or build and what supports its creator attribution. Production notes point to the version behind an engine or tool behavior. For claims about an outside project, check the cited source and the recorded scope of any run.

Production URL:

```text
https://openenvision.org/GameMap/
```

Repository:

```text
https://github.com/OpenEnvision/GameMap
```

## Contents

- [Motivation](#motivation)
- [What GameMap Is](#what-gamemap-is)
- [Scope](#scope)
- [Editorial Standard](#editorial-standard)
- [Information Architecture](#information-architecture)
- [Metadata Model](#metadata-model)
- [Local Development](#local-development)
- [Deployment and Community](#deployment-and-community)
- [Quality Assurance](#quality-assurance)
- [Attribution and Reuse](#attribution-and-reuse)
- [Citation](#citation)

## Motivation

AI-assisted game development spans materials that rarely live in one place: coding agents and MCP bridges for game engines, procedural and generative asset pipelines, playable browser and desktop games with public source code, world-model papers, and production postmortems covering validation, runtime performance, and API terms.

That landscape changes rapidly and mixes shipped tools, partial research code, recorded demos, and marketing previews. GameMap organizes this space into a structured, source-reviewed atlas so readers can verify what is playable, what ships full source, what runs locally versus through a hosted API, and what limits remain before adopting a workflow in production.

## What GameMap Is

GameMap is:

- A curated, source-linked atlas covering AI game development tools, playable game examples, papers, testing resources, and engineering guides.
- A bilingual (English and Chinese) static documentation and discovery site built with Fumadocs, React Router, TypeScript, and Vite, with browser-side full-text search.
- A Git-driven static release pipeline paired with optional zero-server Supabase Direct community features (ratings, comments, reports, and submissions).
- An evidence-conscious reference that separates primary-source inspection from local reproduction, and playable builds from recorded videos.

GameMap is not:

- An automated scraper, news feed, or undifferentiated awesome-list dump.
- A leaderboard ranking models, engines, or studios across incomparable tasks or hardware.
- A claim of independent playtesting, security certification, or commercial licensing clearance for third-party projects.
- A substitute for inspecting primary repositories, papers, model cards, and upstream licenses.

## Scope

### Resource taxonomy

Structured catalog entries have a purpose category and a separate collection describing how readers can use them:

| Category | Scope | Guide |
| --- | --- | --- |
| `agents` | Agents & engine bridges: coding agents, skills, MCP servers, and editor-control loops. | [Agents, skills and MCP](docs/ecosystem/agents.md) |
| `engines` | Engines & rendering: game engines, rendering libraries, and engine integration. | [Game engines](docs/ecosystem/engines.md) |
| `2d` | 2D art & sprites: images, sprites, tilesets, and related asset workflows. | [2D and 3D development](docs/ecosystem/2d-3d-development.md) |
| `3d` | 3D assets & animation: models, scenes, rigging, and character motion. | [2D and 3D development](docs/ecosystem/2d-3d-development.md) |
| `audio` | Audio & voice: music, sound effects, dialogue, and speech assets. | [Production overview](docs/production/overview.md) |
| `production` | Game creation & design: generated game projects, rules, gameplay, and level design. | [Production overview](docs/production/overview.md) |
| `runtime` | Runtime AI & NPCs: conversational characters and in-game AI behavior. | [Production overview](docs/production/overview.md) |
| `testing` | Testing & QA: game tests, accessibility reviews, and evaluation workflows. | [Testing library](docs/reference/testing-library.md) |
| `publishing` | Publishing: stores, game distribution, and release workflows. | [Production overview](docs/production/overview.md) |
| `world` | World models: learned simulation, code-based state, neural rendering, and interactive worlds. | [World models](docs/ecosystem/world-models.md) |

The collections are `tools` (Tools & platforms), `learning` (Guides & examples), `research` (Research & benchmarks), and `reference` (Technical references). Papers and research prototypes remain distinguishable from usable tools; low-level operating-system or engine APIs remain technical references. The stable `2d` and `3d` category IDs describe asset work, while `dimensions` independently records whether a resource applies to 2D or 3D games.

### Collections and guides

Beyond the resource catalog, GameMap maintains dedicated collections and long-form guides:

| Pillar | What it covers | Starting point |
| --- | --- | --- |
| Resource catalog | Searchable tools, frameworks, benchmarks, papers, and documentation entries. | [Full resource catalog](docs/reference/catalog.md) |
| Games and workflows | Playable browser and desktop projects, creator build evidence, and complete game source. | [Game examples](/examples/) |
| Production and testing | Practical engine interfaces, evaluation methods, testing starters, and evidence boundaries. | [Testing library](docs/reference/testing-library.md) |
| Repository research | Repository evidence for games, engines, agents, tools, and research, with review scope and license status. | [Repository research](/research/) |
| Level design skill | A complete skill package with spatial layout references and reusable review templates. | [Level design guide](docs/guides/level-design.md) |

## Editorial Standard

Candidate resources, games, and research notes are reviewed against five dimensions before inclusion:

| Dimension | Guiding question |
| --- | --- |
| Primary-source evidence | Are claims backed by author repositories, papers, official docs, model cards, or creator write-ups rather than secondhand summaries? |
| Verification boundary | Does the entry clearly separate a source inspection (`verified`) from an executed reproduction with recorded commands, versions, and hardware? |
| Playability and build proof | Are playable demos, downloadable builds, recorded videos, and source-only repositories labeled distinctly without blurring previews into playable games? |
| License and provenance clarity | Are code, model weights, datasets, and third-party media tracked as separate reuse boundaries with links to upstream terms? |
| Taxonomic fit | Does the entry map cleanly to canonical categories, stages, dimensions, and stable `kind:id` identities without inflating counts through duplication? |

Research candidates are never silently promoted into curated resources or verified playable cases, and ordinary engine foundations are not labeled as AI-authored games. See [Contributing](CONTRIBUTING.md) for the complete entry schema and evidence rules.

## Information Architecture

### Public website routes

All public routes are statically pre-rendered in English (`/`) and Chinese (`/zh/`):

| Route | Purpose |
| --- | --- |
| `/` | Atlas overview, featured playable examples, and entry points into each collection. |
| `/resources/` | Searchable, filterable resource catalog with browser-local saved collections. |
| `/examples/` | Playable 2D, 3D, Three.js, and game-jam projects with creator evidence and build links. |
| `/papers/` | Curated research paper directory linked to arXiv, project pages, and source code. |
| `/agents/` | Coding agents, MCP integrations, and game-development skill toolkits. |
| `/testing/` | Testing starters, environments, asset packs, and evaluation references. |
| `/research/` | Repository research ledger preserving candidate membership and review status. |
| `/docs/` | Pre-rendered Fumadocs guides, engineering notes, catalog references, and source attribution. |

### Repository layout

| Path | Ownership and role |
| --- | --- |
| `data/segments/` | Checked-in JSON segments for resources, papers, Three.js games, game-jam ledgers, media, and repository research. |
| `docs/` | Long-form English guides (`docs/`), full Chinese translations (`docs/zh/`), and the level-design skill package (`docs/skills/`). |
| `website/app/` | React Router routes, UI components, community client modules, and styles. |
| `website/content/` | Zod runtime contracts (`contracts.ts`), models, registry, site routes, taxonomy, and i18n overlays. |
| `website/src/data/` | Typed catalog data modules and curated recordings consumed by static builds. |
| `website/public/` | Brand marks, source logos, gameplay screenshots, page covers, skill archives, and public downloads. |
| `scripts/` | Build generators (`build/`), validators (`check/`), shared catalog libraries (`lib/`), and Supabase direct SQL helper (`community-direct.mjs`). |
| `supabase/direct-mode/` | Optional zero-server Supabase Direct community SQL schema and RPC setup. |

## Metadata Model

Structured resources follow versioned contracts declared in `website/content/contracts.ts`. Each segment in `data/segments/*.json` stores records with stable, authored `id` keys:

```json
{
  "id": "example-resource",
  "name": "Official Project Name",
  "category": "production",
  "type": "framework",
  "collection": "tools",
  "summary": "One sentence explaining the problem it solves.",
  "detail": "Describe inputs, outputs, relevant stages, and key limitations. Distinguish released artifacts from planned work.",
  "url": "https://example.org/official-project",
  "links": [{ "label": "Code", "url": "https://example.org/official-code" }],
  "tags": ["program-synthesis"],
  "stages": ["plan", "code", "test"],
  "dimensions": ["2d"],
  "year": 2026,
  "verified": "2026-10-18"
}
```

Authoritative schemas, coverage guarantees, one-to-many recordings, and bilingual fingerprint rules are documented in the [content model and coverage contract](docs/project/content-model.md).

## Local Development

GameMap requires **Node.js 22.22 or newer**. Start the local development server with:

```sh
npm ci
npm run dev
```

To reproduce the static GitHub Pages subpath locally:

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

The public website is statically pre-rendered with Fumadocs, React Router, TypeScript, and Vite. See [development and deployment](docs/project/deployment.md) for full build and preview instructions.

## Deployment and Community

GameMap deploys directly to **GitHub Pages** via `.github/workflows/deploy-pages.yml` with zero backend servers required:

| Mode | Configuration | Capabilities |
| --- | --- | --- |
| Static GitHub Pages | Default `npm run build` | Pre-rendered EN/ZH site, offline search, downloadable JSON/Markdown catalogs, zero backend. |
| Zero-server hybrid community | `npm run build:community-direct` + `supabase/direct-mode/enable-supabase-direct.sql` | Adds email/GitHub sign-in, 5-star ratings, comments, reports, screenshot submissions, and browser moderation via Supabase Cloud. |

GitHub repository settings for Pages publishing:

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

See [development and deployment](docs/project/deployment.md) for Supabase direct-mode SQL generation (`npm run community:direct-sql`) and optional GitHub Actions repository variables (`GAMEMAP_SUPABASE_URL`, `GAMEMAP_SUPABASE_PUBLISHABLE_KEY`).

## Quality Assurance

Run repository checks before opening a pull request or publishing a release:

| Command | Purpose |
| --- | --- |
| `node scripts/build/generate.mjs` | Synchronizes `docs/reference/catalog.md`, `data/resources.json`, `website/src/data/resources.json`, and public downloads. |
| `npm run check` | Validates source schemas, media references, bilingual translation parity, and Prettier formatting. |
| `npm run check:docs` | Verifies formal English/Chinese document AST parity and reviewed translation fingerprints in `website/content/i18n/docs.zh.sources.json`. |
| `npm run build` | Prepares Markdown articles, checks TypeScript, pre-renders all EN/ZH routes, and assembles `dist/`. |
| `npm run check:build` | Verifies built HTML coverage, internal links and assets, localized routes, offline search index, `404.html`, and license notices. |

These automated checks verify internal consistency, translation completeness, and rendered coverage; they do not install, train, or execute third-party game repositories.

## Attribution and Reuse

Repository code and GameMap-authored documentation are licensed under the **MIT License** (`LICENSE`). Original projects, brand marks, and third-party media remain with their respective rights holders.

The bundled level-design adaptation is **CC BY-NC-SA 4.0**, with noncommercial and share-alike conditions. Read its [attribution and license](docs/skills/level-design/LICENSE.md) before reuse.

## Citation

If GameMap is useful in academic research, technical writing, or engineering workflows, please cite it as:

```bibtex
@misc{openenvision_gamemap_2026,
  title        = {GameMap: An Evidence-Backed Atlas for AI Game Development},
  author       = {{Tencent} and {OpenEnvision}},
  year         = {2026},
  howpublished = {\url{https://github.com/OpenEnvision/GameMap}},
  note         = {Curated catalog, playable examples, and production engineering guides for AI game development}
}
```
