# GameMap

**Tencent IEG · AI Game Development**

A practical map of tools, playable projects, and production knowledge for building games with AI.

[Website](https://openenvision.github.io/GameMap/) · [Resource catalog](docs/AWESOME.md) · [Documentation](docs/practical-guide.md) · [中文指南](docs/zh/reading-guide.md) · [Contributing](CONTRIBUTING.md)

## Explore

- **[Tools & engines](docs/AWESOME.md)** — coding agents, engine integrations, asset pipelines, and world models.
- **[Games & workflows](docs/tutorials-and-demos.md)** — playable examples, creator build stories, and project source.
- **[Production & testing](docs/research-index.md)** — practical interfaces, evaluation methods, and evidence boundaries.
- **[Level design](docs/level-design-skill.md)** — a complete skill package with references and reusable templates.

## Development

```sh
npm ci
npm run dev
```

Documentation and catalog changes refresh automatically. The website is static, built with Fumadocs, React Router, TypeScript, and Vite; no application backend or API key is required.

See [development & deployment](docs/deployment.md) for production builds and GitHub Pages configuration.

## Private content Studio

The [content platform](docs/content-platform.md) includes typed editing forms, a trusted validator, revision/translation review, protected media uploads and immutable release export.

```sh
# Start Docker Desktop first. These wrappers never connect to a cloud project.
npm run local:start
npm run local:setup
npm run studio:dev
```

Local account passwords stay in ignored `.build/catalog-local/access.json`; setup imports content as drafts and writes a private `.env` with a restricted database login. `npm run test:local` exercises actual Supabase Auth/PostgREST/PostgreSQL and a separate restore probe using explicitly local test approvals, not production editorial decisions. `npm run local:stop` stops services while retaining their data.

Studio runs separately from the public website. Without configuration it shows setup instructions, not a demo login. Server credentials and Auth tokens never enter the browser bundle. See the guide for production TLS, restricted database credentials, persistent media and portable exports.

The public website is **not switched to database releases yet**. Git remains its default source until the cutover gates pass; Studio never deploys or activates a release. Reviewed packages can already be built through the isolated `site:build` / `site:verify` path, including database-only records and uploaded media, without changing the checkout's `dist/`. Only `dist/`, not the private Studio or private snapshot artifacts, is published by the existing Pages workflow.

## Incremental game collection

Examples accept ordinary games as well as evidenced AI-assisted projects. A game-jam entry needs real game source, an author-linked playable or downloadable release, and primary-source evidence; a source-available repository is not necessarily licensed for reuse. Godot 4 / 2D projects are preferred, not mandatory.

```sh
# Import bounded research reports; re-running preserves existing reviewed games.
npm run examples:import -- --reports /path/to/reviewed-json-reports
npm run test:examples:import
```

`data/segments/jam-games.json` retains accepted records, deferred candidates, source passages, version/license uncertainty and deduplication decisions. The same ledger is published as `website/public/jam-discovery.json`; `website/src/data/jamGames.ts` is generated from it. Importing requires explicit `accepted` evidence: candidates are never automatically promoted, and no background scheduler is installed. Source review does **not** certify the paper's line-count thresholds, compilation, a 30-second run or independent playtesting. Missing screenshots are labeled, not fabricated. The existing AI-workflow guide remains an AI-specific subset of the broader Examples catalog.

Browser play is optional: use `download` for author-published desktop builds or an explicitly available Steam demo, and distinguish free demos from paid full games. The `/releases` restriction applies only to GitHub-hosted download URLs; it does not exclude itch.io or official download pages. Repository roots, source archives and videos are not game builds.

## Sources & reuse

Original projects and media retain their respective rights. Inclusion is not an endorsement or a claim of independent reproduction.

The bundled level-design adaptation is **CC BY-NC-SA 4.0**, with noncommercial and share-alike conditions. Read its [attribution and license](docs/skills/level-design/LICENSE.md) before reuse.
