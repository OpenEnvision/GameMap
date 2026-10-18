# Contributing to GameMap

Contributions of credible resources, corrected descriptions, repaired links, and evidence-backed engineering experience are welcome. GameMap maps coding agents, engine ecosystems, 2D and 3D development, and world models. Inclusion is not a performance endorsement or a claim of full reproduction.

## Source of truth and generation workflow

Edit resource entries only in `data/segments/*.json`. Do not edit these generated files directly:

- `AWESOME.md`
- `data/resources.json`
- `website/src/data/resources.json`
- `website/public/awesome-list.md`

After changing data, run these commands from the repository root in order:

```sh
node scripts/generate.mjs
npm run check
npm run build
```

The generator synchronizes the Awesome List, website data, and downloadable directory. `npm run check` validates the schema and checks generated output consistency; `npm run build` generates the data and builds the website. These checks do not install, train, or play the listed projects. No automated scraping or scheduled updates are configured; entries are maintained by reading sources manually.

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

Performance numbers require measurement conditions and a primary source. Do not directly rank results from different tasks, resolutions, GPUs, or measurement scopes. Method comparisons should distinguish build success, functional correctness, visual quality, playability, and runtime performance. Label planning guidance or workflow preferences as **GameMap editorial guidance**, rather than presenting them as research findings.

World model entries should also explain where authoritative state lives: an executable program, an engine, video latents, or explicit 3D assets. Use separate tags for action-conditioned video, neural rendering, and code-based worlds. See the [world model notes](./world-model-notes.md).

## Pull requests

Briefly describe additions or corrections, primary sources, the actual review date, and repository checks run. If only web pages were checked, state: “Sources checked; full reproduction not performed.” After fixing data, regenerate and include the affected outputs. Documentation-only changes can use the relevant formatting or link checks. Do not automatically download large models or datasets, or execute external project scripts just to validate links.
