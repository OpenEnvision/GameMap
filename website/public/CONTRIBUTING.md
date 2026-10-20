# Contributing to GameMap

Website content must follow the [content model and coverage contract](./content-model.md).

Contributions of credible resources, corrected descriptions, repaired links, and evidence-backed engineering experience are welcome. GameMap maps coding agents, engine ecosystems, 2D and 3D development, and world models.

## Source of truth and generation workflow

The root `README.md` is a hand-maintained project overview with selected awesome resources. Keep the complete resource catalog in `AWESOME.md` and publishing details in [the deployment guide](./deployment.md). The root `index.html` contains the complete, pre-rendered GameMap homepage and matches `dist/index.html`. It does not redirect to a development server or another website. Keep the homepage implementation in `website/app/`; a production build exports the complete static site, including its assets and other pages, to the repository root.

Edit resource entries only in `data/segments/*.json`. Do not edit these generated files directly:

- `AWESOME.md`
- `data/resources.json`
- `website/src/data/resources.json`
- `website/public/awesome-list.md`
- `index.html` and the other root static exports — edit the application or content sources, then run `npm run build`; do not edit generated pages, assets, or route data by hand
- `.gamemap-static.json` — records ownership and hashes of root static exports; `CONTRIBUTING.md` remains a source file with mode `source-preserved`

Paper bibliography and artifact-access metadata are maintained in `data/papers.json`. Run `npm run sync:papers` after editing it; do not edit `website/public/papers.json`, the generated availability counts in `website/content/paper-catalog.json`, or the synchronized artifact-review sections of `website/public/papers-provenance.json` by hand. Preserve the source-backed bibliography mapping and distinguish unavailable source from code known not to have been released.

After changing data, run these commands from the repository root in order:

```sh
npm run sync:papers
node scripts/generate.mjs
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check
npm run check:build
npm run check:release
```

The generators synchronize the Awesome List, website data, and downloadable directory. `npm run build` generates the deployable `dist/` directory, including pre-rendered Fumadocs articles, then exports its complete static tree to the repository root. `npm run check` validates source data, public source media, generated editorial files, and the committed root site's integrity without requiring `dist/`. `npm run check:build` validates built downloads, deployed media, rendered documents, static search, internal links, and root export integrity; always run it after building. `npm run check:release` validates both the root site and `dist/` deployment structures. If an existing validated build needs to be exported again, run `npm run generate:entry` after building; this command synchronizes `dist/` to the root and does not compile source changes. These checks do not install, train, or play the listed projects. No automated scraping or scheduled updates are configured; entries are maintained by reading sources manually.

### What belongs in Git

Keep application source in `website/app/`, catalog/case data in `website/src/`, `package-lock.json`, `data/`, `docs/`, static source assets under `website/public/assets/`, and downloadable Markdown/JSON under `website/public/` versioned. Commit the complete root static export, including `index.html`, `.nojekyll`, `.gamemap-static.json`, assets, route directories, route data, search indexes, and public downloads. Include `.github/workflows/` when uploading the project. Generated editorial files and root static files stay committed so GitHub Pages can publish directly from `main` and `/(root)`.

Do not commit dependencies, `dist/` or `website/dist/`, `release/` and publishing ZIPs, `.build/`, `.react-router/`, prepared documents in `website/.content/`, copied `website/public/assets/docs/`, TypeScript/Vite/lint caches, coverage and browser-test reports, agent traces, logs, temporary files, local environment secrets, or machine-specific editor/OS files. The root static export is the versioned publishing tree; `dist/` is its disposable build staging copy. Source Markdown in `docs/` coexists with generated article HTML, while generated root Markdown downloads are excluded from source-document discovery. The exporter uses `.gamemap-static.json` to update and remove its own files without deleting source documents. `npm run package:pages` packages a validated build as `release/GameMap-pages.zip` with the application's `index.html` at the archive root. Keep shareable environment configuration in `.env.example`, `.env.sample`, or `.env.template`, without secrets. The `.gitignore` deliberately does not hide source media, root static exports, lockfiles, shared VS Code configuration, or environment templates.

### Static assets

Keep website images, logos, icons, audio, video, and source fonts in `website/public/assets/`, grouped as follows:

```text
website/public/assets/
├── brand/     # GameMap mark and generated favicon
├── logos/     # Verified resource identities
├── icons/     # Preserved legacy artwork and its licenses
├── fonts/     # Optional source fonts, with their licenses
├── media/     # demos/, editorial/, learning/, showcase/
└── docs/      # Generated document-image copies; not committed
```

Use site-relative `assets/...` paths in source records and `publicAsset()` when rendering them; do not add locale prefixes or hard-code `/GameMap/`. Keep media provenance, original URLs, checksums, and license notices alongside their existing records. `website/assets.config.json` defines the groups, generated paths, and old URL aliases. Only `scripts/finalize-build.mjs` creates compatibility copies outside `assets/` in `dist/`; do not recreate the old directories in `website/public/`. The asset checks verify canonical files and byte-identical compatibility URLs.

Keep research data in `data/`, readable source articles and their original attachments in `docs/`, and reproducible skill downloads in the existing distribution workflow. They are not a second website asset directory.

The Cadle-like research inventory is maintained in `data/segments/repository-research.json`. Its complete source-candidate membership and review statuses are validated; `docs/cadle-repositories.md` and public Markdown/JSON downloads are generated. These research rows do not automatically become resource cards or featured playable cases.

## Entry format

Each segment is a JSON array. Every `id` must remain stable and be unique across all segments. Example:

```json
{
  "id": "example-resource",
  "name": "Official Project Name",
  "category": "2d",
  "type": "framework",
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
| `category` | `agents`, `engines`, `2d`, `3d`, `production`, or `world`; choose the category that best reflects the main contribution |
| `type` | `agent`, `framework`, `skill`, `benchmark`, `paper`, `docs`, `tool`, `community`, or `dataset` |
| `stages` | Select from `plan`, `code`, `assets`, `scene`, `test`, `ship`, `runtime`, and `world` |
| `dimensions` | Select from `2d`, `3d`, and `world` |
| `links`, `year` | Optional; link to specific pages that support their labels. For papers, prefer the first preprint year |
| `verified` | `YYYY-MM-DD`; the date the source was actually checked |
| `access` | Optional `tutorial`, `demo`, and `source` objects, each with `label`, `kind`, `note`, and an HTTPS `url`; omit the URL only for `unavailable` |

Write concise, natural English in `summary` and `detail`, preserving official project names. Do not describe unreleased code as an open-source framework, image generation as animation generation, or an agent that plays games as a development agent without supporting evidence. Express relevance across categories through tags and stages rather than duplicating a resource to increase the count.

For access links, distinguish `playable`, `interactive`, `video`, `download`, `local-tool`, and `service` demos. Source kinds distinguish `full-source` (a complete project), `pipeline-source` (a generator implementation), `sdk`, `examples`, `model`, and `unavailable`. A model preview or recorded film must not be labeled as a playable game. Featured AI game cases live in `website/src/data/ai3dCases.ts`, `aiCommunityCases.ts`, and `openGameCases.ts`, and are selected in `learningPaths.ts`. Each featured case needs a creator-provided AI evidence link, an actual playable game, and its complete game project. Keep ordinary engine references in `foundationPaths`. `npm run build` generates `docs/tutorials-and-demos.md` and its public copy from this data; do not edit the generated guide directly.

## Evidence and inclusion standards

Prefer author papers, official documentation, project repositories, model cards, and data cards. Do not infer features unsupported by official sources. Mark community experience as `community`, retaining engine versions, hardware, and problem scenarios. Read linked content before adding it; search snippets are insufficient evidence for precise metrics.

`verified` means a source check. Claim reproduction only after an actual run, with commands, versions, hardware, inputs, results, and the limits of what was tested. Distinguish paper demonstrations, complete open-source implementations, partial inference code, hosted products, and release plans. Code, model weights, and data can have different terms; link to their official guidance rather than generalizing from one repository license label.

Performance numbers require measurement conditions and a primary source. Do not directly rank results from different tasks, resolutions, GPUs, or measurement scopes. Method comparisons should distinguish build success, functional correctness, visual quality, playability, and runtime performance. Describe proposed workflows as templates or next steps, rather than reporting them as measured findings.

World model entries should also explain where authoritative state lives: an executable program, an engine, video latents, or explicit 3D assets. Use separate tags for action-conditioned video, neural rendering, and code-based worlds. See the [world model notes](./world-model-notes.md).

## Writing for readers

- Start with the task, workflow, or decision the reader needs to make. Use plain, direct language.
- Omit editorial self-description, collection-size reports, generic no-guarantee disclaimers, review-date preambles, and statements about unscheduled future updates.
- Put concrete version requirements, unavailable artifacts, licensing conditions, and untested assumptions beside the operation they affect. Keep sources and attribution.
- Name a proposed check or work-order template as such; do not describe it as a completed integration or measured result.
- Keep audit timestamps and internal identifiers in source records or maintenance ledgers, not reader-facing introductions.
- Chinese guides live under `docs/zh/`. Mark links to untranslated material as English. Do not rewrite the separately licensed, preserved skill package to change its tone.

## Translations

- Keep canonical source data in English. Put Chinese interface messages in `website/content/i18n/zh.json` or `docs.zh.json`, and reader-text overlays in `website/content/i18n/content/` using stable `kind:id` keys.
- Translate the complete field, including material conditions. Preserve project names, source URLs, creator attribution, licensing, list items, and the difference between proposed work and measured results.
- Run `node scripts/check-locales.mjs --approve-new` to record fingerprints for newly translated fields. It does not approve changed source text. Review an existing translation before updating its source fingerprint; never automatically refresh all hashes.
- Add full Chinese articles under `docs/zh/`. Mark deliberate links to English originals as `(English)` or with the existing Chinese language marker. Other internal links keep the selected interface language.
- Keep untranslated passages explicitly English. Do not replace third-party source files, or present a translated title as a translated article.
- Rebuild, then run `npm run check`, `npm run check:build`, and `npm run test:web` for both locales.

## Pull requests

Briefly describe additions or corrections, primary sources, the actual review date, and repository checks run. If only web pages were checked, state: “Sources checked; full reproduction not performed.” After fixing data, regenerate and include the affected outputs. Documentation-only changes can use the relevant formatting or link checks. Do not automatically download large models or datasets, or execute external project scripts just to validate links.
