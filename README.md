# GameMap

**Tencent IEG · AI Game Development**

A practical map of tools, playable projects, and production knowledge for building games with AI.

[Website](https://openenvision.github.io/GameMap/) · [Resource catalog](AWESOME.md) · [Documentation](docs/practical-guide.md) · [中文指南](docs/zh/reading-guide.md) · [Contributing](CONTRIBUTING.md)

## Explore

- **[Tools & engines](AWESOME.md)** — coding agents, engine integrations, asset pipelines, and world models.
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

## Sources & reuse

Original projects and media retain their respective rights. Inclusion is not an endorsement or a claim of independent reproduction.

The bundled level-design adaptation is **CC BY-NC-SA 4.0**, with noncommercial and share-alike conditions. Read its [attribution and license](docs/skills/level-design/LICENSE.md) before reuse.
