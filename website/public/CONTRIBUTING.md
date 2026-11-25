# Contributing to GameMap

Website content must follow the [content model and coverage contract](./docs/project/content-model.md).

For a broken browser game link, check the author's release page and repository. If the release has moved, supply the new URL and say what you saw when you opened it. If only the project remains, supply the exact source revision, the expected launch steps, and any missing assets or dependencies. A screenshot can stay as a credited record of its original build. Check the [community case review](./docs/evaluation/community-cases.md) for examples of both release types.

## Git source and generation workflow

The root `README.md` is a hand-maintained project overview. Keep the full resource catalog in `docs/reference/catalog.md` and publishing details in [the deployment guide](./docs/project/deployment.md).

Edit resource entries only in `data/segments/*.json`. Do not edit these generated files directly:

- `docs/reference/catalog.md`
- `data/resources.json`
- `website/src/data/resources.json`
- `website/public/awesome-list.md`

After changing data, run these commands from the repository root in order:

```sh
node scripts/build/generate.mjs
npm run check
npm run build
npm run check:build
```

The generator synchronizes the Awesome List, website data, and downloadable directory. `npm run check` validates source data, public source media, and generated editorial files without requiring a built website. `npm run build` generates the data and the deployable `dist/` directory, including pre-rendered Fumadocs articles. `npm run check:build` additionally validates built downloads, deployed media, rendered documents, static search, and internal links; always run it after building. These checks do not install, train, or play the listed projects. No automated scraping or scheduled updates are configured; entries are maintained by reading sources manually.

### What belongs in Git

Keep application source in `website/app/`, catalog/case data in `website/src/`, `package-lock.json`, `data/`, `docs/`, and source assets/downloads under `website/public/` versioned. Generated editorial files stay committed so reviewers can inspect catalog and documentation changes; CI checks their consistency.

Do not commit dependencies, `dist/` or `website/dist/`, legacy root previews, `.build/`, `.react-router/`, prepared documents in `website/.content/`, copied `website/public/docs-assets/`, TypeScript/Vite/lint caches, coverage and browser-test reports, agent traces, logs, temporary files, local environment secrets, or machine-specific editor/OS files. Build outputs are regenerated in CI and only `dist/` is published to GitHub Pages. Keep shareable environment configuration in `.env.example`, `.env.sample`, or `.env.template`, without secrets. The `.gitignore` deliberately does not hide source media, lockfiles, shared VS Code configuration, or environment templates.

The Cadle-like research inventory is maintained in `data/segments/repository-research.json`. Its complete source-candidate membership and review statuses are validated; the generated `docs/cadle-repositories.md` points readers to the repository research directory, and the public JSON download retains the full ledger. These research rows do not automatically become resource cards or featured playable cases.

### Repository layout and formatting

- `scripts/build/`: development server, generators, document preparation, build finalization and preview.
- `scripts/check/`: source, content, locale, translation and built-site checks used by `npm run check` and `npm run check:build`.
- `scripts/lib/`: shared modules; `scripts/lib/guides/` loads catalog data and renders the generated guides.
- `supabase/direct-mode/`: optional zero-server Supabase Direct community SQL.
- `website/app/`: routes, components and styles. `website/content/` holds typed contracts and site configuration; `website/src/data/` holds catalog modules.

Run `npm run format` before committing. Prettier formats code, styles and configuration. `.prettierignore` leaves Markdown, generated outputs, data ledgers and public downloads byte for byte, and `npm run check` fails on unformatted files.

## Entry format

Resource segments are JSON arrays. Keep each resource `id` stable and unique across resource segments.

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

| Field | Values and guidance |
| --- | --- |
| `collection` | Required: `tools`, `learning`, `research`, or `reference`; identify how the entry can be used before choosing its topic |
| `category` | `agents`, `engines`, `2d`, `3d`, `audio`, `production`, `runtime`, `testing`, `publishing`, or `world`; choose the main development purpose, independently of game dimension |
| `type` | `agent`, `framework`, `skill`, `benchmark`, `paper`, `docs`, `tool`, `community`, `dataset`, `tutorial`, or `platform`; describe the entry itself, rather than its publisher |
| `stages` | Select from `plan`, `code`, `assets`, `scene`, `test`, `ship`, `runtime`, and `world` |
| `dimensions` | Select from `2d`, `3d`, and `world` |
| `links`, `year` | Optional; link to specific pages that support their labels. For papers, prefer the first preprint year |
| `verified` | `YYYY-MM-DD`; the date the source was actually checked |
| `access` | Optional `tutorial`, `demo`, and `source` objects, each with `label`, `kind`, `note`, and an HTTPS `url`; omit the URL only for `unavailable` |

Use collections consistently:

| Collection | Inclusion rule |
| --- | --- |
| `tools` | Usable tools, engines, services, reusable skills, agent bridges, and publishing platforms. A product may use its official documentation as the primary usage link. |
| `learning` | Complete guides, tutorials, official documentation, example projects, and practical engineering write-ups. |
| `research` | Papers, benchmarks, evaluation protocols, and research prototypes. Public pipeline code alone does not make a research prototype a production tool. |
| `reference` | Specialized APIs, formats, low-level libraries, and integration references. Keep generic desktop automation here unless a concrete game-editor or game-testing integration establishes broader relevance. |

Categories describe purpose: `agents` covers agents and engine bridges; `engines` covers engines and rendering; `2d` covers 2D art and sprites; `3d` covers 3D assets and animation; `audio` covers sound and voice; `production` covers game creation and design; `runtime` covers runtime AI and NPCs; `testing` covers testing and QA; `publishing` covers distribution; and `world` covers world models. The older category IDs remain stable for links, while their displayed labels follow these meanings. Use `dimensions` for 2D/3D applicability: a Unity MCP bridge belongs in `agents` even when it controls 3D scenes, and audio, testing, and publishing resources should use their own purpose categories.

Use `tutorial` for a step-by-step learning resource and `platform` for a game publishing or distribution platform. Reserve `community` for an actual community or learning hub; a community-authored tutorial still has type `tutorial` or `docs`. Use the `runtime` stage for AI or NPC behavior, not ordinary asset loading, and the `world` stage and dimension for world-model work, not every procedural terrain or noise library.

Write concise, natural English in `summary` and `detail`, preserving official project names. Do not describe unreleased code as an open-source framework, image generation as animation generation, or an agent that plays games as a development agent without supporting evidence. Express relevance across categories through tags and stages rather than duplicating a resource to increase the count.

For access links, distinguish `playable`, `interactive`, `video`, `download`, `local-tool`, and `service` demos. Source kinds distinguish `full-source` (a complete project), `pipeline-source` (a generator implementation), `sdk`, `examples`, `model`, and `unavailable`. A model preview or recorded film must not be labeled as a playable game. Featured AI game cases live in `website/src/data/ai3dCases.ts`, `aiCommunityCases.ts`, and `openGameCases.ts`, and are selected in `learningPaths.ts`. Each featured case needs a creator-provided AI evidence link, an actual playable game, and its complete game project. Keep ordinary engine references in `foundationPaths`. `npm run build` generates `docs/tutorials-and-demos.md` and its public copy from this data; do not edit the generated guide directly.

## Evidence and inclusion standards

Prefer author papers, official documentation, project repositories, model cards, and data cards. Do not infer features unsupported by official sources. Attribute community experience to its author and retain engine versions, hardware, and problem scenarios; choose the resource type from the content, rather than treating community authorship as a type. Read linked content before adding it; search snippets are insufficient evidence for precise metrics.

`verified` means a source check. Claim reproduction only after an actual run, with commands, versions, hardware, inputs, results, and the limits of what was tested. Distinguish paper demonstrations, complete open-source implementations, partial inference code, hosted products, and release plans. Code, model weights, and data can have different terms; link to their official guidance rather than generalizing from one repository license label.

Performance numbers require measurement conditions and a primary source. Do not directly rank results from different tasks, resolutions, GPUs, or measurement scopes. Method comparisons should distinguish build success, functional correctness, visual quality, playability, and runtime performance. Describe proposed workflows as templates or next steps, rather than reporting them as measured findings.

World model entries should also explain where authoritative state lives: an executable program, an engine, video latents, or explicit 3D assets. Use separate tags for action-conditioned video, neural rendering, and code-based worlds. See the [world model notes](./docs/ecosystem/world-models.md).

## Writing for readers

- Start with the task, workflow, or decision the reader needs to make. Use plain, direct language.
- Omit editorial self-description, collection-size reports, generic no-guarantee disclaimers, review-date preambles, and statements about unscheduled future updates.
- Put concrete version requirements, unavailable artifacts, licensing conditions, and untested assumptions beside the operation they affect. Keep sources and attribution.
- Name a proposed check or work-order template as such; do not describe it as a completed integration or measured result.
- Keep audit timestamps and internal identifiers in source records or maintenance ledgers, not reader-facing introductions.
- Put a new guide in the `docs/` topic folder that matches its navigation group. `docs/README.md` lists the folders, the generated pages, and the naming and title conventions.
- Chinese guides live under `docs/zh/`. Mark links to untranslated material as English. When adding a worked example to the separately licensed level-design adaptation, keep its license, original attribution, source links, and distinction between source material and the adaptation's own exercises.

## Translations

- Keep canonical source data in English. Put Chinese interface messages in `website/content/i18n/zh.json` or `docs.zh.json`, and reader-text overlays in `website/content/i18n/content/` using stable `kind:id` keys.
- Translate the complete field, including material conditions. Preserve project names, source URLs, creator attribution, licensing, list items, and the difference between proposed work and measured results.
- Run `node scripts/check/locales.mjs --approve-new` to record fingerprints for newly translated fields. It does not approve changed source text. Review an existing translation before updating its source fingerprint; never automatically refresh all hashes.
- Add full Chinese articles under `docs/zh/`. Mark deliberate links to English originals as `(English)` or with the existing Chinese language marker. Other internal links keep the selected interface language.
- Keep untranslated passages explicitly English. Do not replace third-party source files, or present a translated title as a translated article.
- Run `npm run check`, rebuild, and run `npm run check:build`. Preview the affected pages in both locales.

## Pull requests

Briefly describe additions or corrections, primary sources, the actual review date, and repository checks run. If only web pages were checked, state: “Sources checked; full reproduction not performed.” After fixing data, regenerate and include the affected outputs. Documentation-only changes can use the relevant formatting or link checks. Do not automatically download large models or datasets, or execute external project scripts just to validate links.
