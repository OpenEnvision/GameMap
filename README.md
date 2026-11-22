# GameMap

**Tencent IEG · AI Game Development**

A practical map of tools, playable projects, and production knowledge for building games with AI.

[Website](https://openenvision.github.io/GameMap/) · [Resource catalog](docs/reference/catalog.md) · [Documentation](docs/guides/practical-guide.md) · [中文指南](docs/zh/guides/reading-guide.md) · [Contributing](CONTRIBUTING.md)

## Explore

- **[Tools & engines](docs/reference/catalog.md)** — coding agents, engine integrations, asset pipelines, and world models.
- **[Games & workflows](docs/tutorials-and-demos.md)** — playable examples, creator build stories, and project source.
- **[Production & testing](docs/production/overview.md)** — practical interfaces, evaluation methods, and evidence boundaries.
- **[Level design](docs/guides/level-design.md)** — a complete skill package with references and reusable templates.

## Development

Local content development uses PostgreSQL/Supabase. Start Docker Desktop, then:

```sh
npm ci
npm run local:start
npm run local:migrate
npm run local:setup
npm run dev
```

Edit structured content in the private Studio (`npm run studio:dev`). The website previews every database entry's current editing revision, including drafts, and refreshes after saves. Pages, search, translations, downloads and uploaded media share that working selection. Long-form Markdown and interface code remain in Git.

For an existing catalog, `npm run local:import` reports Git records to add, merge or review. `npm run local:import -- --apply` imports missing records and merges Git changes into existing ones as drafts: database edits are kept, and fields changed differently on both sides are listed for review. Reports stay under `.build/catalog-local/imports/`.

Use `npm run dev:git` for the Git-only production-source preview without a database. The public website remains static, built with Fumadocs, React Router, TypeScript, and Vite. Production builds and GitHub Pages remain Git-driven; local drafts are not published.

See [development & deployment](docs/project/deployment.md) for production builds and GitHub Pages configuration.

## Private content Studio

The [content platform](docs/project/content-platform.md) includes typed editing forms, a trusted validator, revision/translation review, protected media uploads and immutable release export.

```sh
# Start Docker Desktop first. These wrappers never connect to a cloud project.
npm run local:start
npm run local:setup
npm run studio:dev
```

Local account passwords stay in ignored `.build/catalog-local/access.json`; setup imports content as drafts and writes a private `.env` with a restricted database login. `npm run test:local` exercises actual Supabase Auth/PostgREST/PostgreSQL and a separate restore probe using explicitly local test approvals, not production editorial decisions. `npm run local:stop` stops services while retaining their data.

Studio runs separately from the public website. Without configuration it shows setup instructions, not a demo login. Server credentials and Auth tokens never enter the browser bundle. See the guide for production TLS, restricted database credentials, persistent media and portable exports.

The public website is **not switched to database releases yet**. Git remains its default source until the cutover gates pass; Studio never deploys or activates a release. Reviewed packages can already be built through the isolated `site:build` / `site:verify` path, including database-only records and uploaded media, without changing the checkout's `dist/`. Only `dist/`, not the private Studio or private snapshot artifacts, is published by the existing Pages workflow.

## Git catalog imports

The checked-in catalog remains the current production input and an initial import source, not the local Studio's editing store. Use Studio or the database importers for ongoing local authoring; source completion never overwrites a database revision.

Examples accept ordinary games as well as evidenced AI-assisted projects. A game-jam entry needs real game source, an author-linked playable or downloadable release, and primary-source evidence. Check the project’s license before reusing its code or assets. Godot 4 / 2D projects are preferred, not mandatory.

```sh
# Import bounded research reports; re-running preserves existing reviewed games.
npm run examples:import -- --reports /path/to/reviewed-json-reports
npm run test:examples:import
```

`data/segments/jam-games.json` retains accepted records, deferred candidates, source passages, version/license uncertainty and deduplication decisions. The same ledger is published as `website/public/jam-discovery.json`; `website/src/data/jamGames.ts` is generated from it. Importing uses records marked `accepted`. The Examples catalog lists each game’s source and available builds. The existing AI-workflow guide remains an AI-specific subset of the broader Examples catalog.

Browser play is optional: use `download` for author-published desktop builds or an explicitly available Steam demo, and distinguish free demos from paid full games. The `/releases` restriction applies only to GitHub-hosted download URLs; it does not exclude itch.io or official download pages. Repository roots, source archives and videos are not game builds.

## Sources & reuse

Repository code and GameMap-authored documentation are licensed under the **MIT License** (`LICENSE`). Original projects, brand marks, and third-party media remain with their respective rights holders.

The bundled level-design adaptation is **CC BY-NC-SA 4.0**, with noncommercial and share-alike conditions. Read its [attribution and license](docs/skills/level-design/LICENSE.md) before reuse.
