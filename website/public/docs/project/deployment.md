# Website development and deployment

GameMap uses **Fumadocs, React Router, React, TypeScript, and Vite**. The publishing target is [GitHub Pages](https://openenvision.org/GameMap/). Production consists of static HTML, CSS, JavaScript, media, and a browser-side search index, with optional zero-server Supabase Direct community features.

## Local development

Use Node.js 22.22 or newer:

```sh
npm ci
npm run dev
```

`npm run dev` generates derived catalog files, prepares Markdown documents, watches source changes, and starts the local React Router development server.

Open the URL printed by React Router. The main routes are:

- `/` — overview and featured game examples.
- `/resources/` — searchable, filterable resources and browser-local collections.
- `/examples/` — playable games with creator evidence and project source.
- `/testing/` — projects, environments, assets, and motion-data references.
- `/docs/` — rendered guides, research notes, and source attribution.

The application lives in `website/app/`. Structured catalog data lives in `data/segments/` and `website/src/data/`; public source assets remain in `website/public/`.

## Documents and internal links

Markdown under `docs/` (including `docs/reference/catalog.md`), plus `README.md` and `CONTRIBUTING.md`, is rendered at build time; the folder indexes `docs/README.md` and `docs/zh/README.md` are for repository readers only. Articles include navigation, a table of contents, highlighted code, heading links, and full-text search.

`scripts/build/prepare-docs.mjs` creates disposable copies in `website/.content/`. It derives titles, rewrites internal Markdown links to document routes, and stages local documentation images in the ignored `website/public/docs-assets/` directory. Original research text is not rewritten. `website/docs.config.json` controls navigation groups and short labels; ungrouped articles remain available under More notes.

The document source uses Fumadocs MDX's Vite integration in Markdown-only mode; catalog prose cannot execute MDX expressions or imports. Article bodies are lazy-loaded on client navigation, but every document also ships as complete HTML, so direct links and reading without JavaScript work. Full-text search loads a static index into the browser; there is no `/api/search` server in production.

## Build and validate

```sh
node scripts/build/generate.mjs
npm run check
npm run build
npm run check:build
```

- `generate.mjs` synchronizes the resource catalog and downloadable editorial files. It does not overwrite the README.
- `npm run check` validates source data, public source media, bilingual translations, and formatting without requiring build output.
- `npm run build` prepares documents, checks TypeScript, pre-renders routes, and assembles the static `dist/` directory.
- `npm run check:build` validates deployed documents and media, every rendered article, internal links and assets, the static search index, and the real 404 page.

To reproduce the GitHub Pages subpath locally:

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

The preview command reads the base path from the built site and prints the correct URL. It serves static files only, with no SPA fallback, matching GitHub Pages more closely than a development server.

## Supabase Direct community mode

GameMap supports optional zero-server community interactions (email/GitHub sign-in, ratings, comments, reports, screenshot submissions, and browser moderation) using Supabase Cloud directly from the static site.

- Generate ready-to-run SQL with `npm run community:direct-sql -- --with-games --out .build/setup.sql`, backed by `supabase/direct-mode/enable-supabase-direct.sql`.
- Set `VITE_GAMEMAP_COMMUNITY=1`, `VITE_GAMEMAP_COMMUNITY_MODE=supabase-direct`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_PUBLISHABLE_KEY` at build time, or configure `GAMEMAP_SUPABASE_URL` and `GAMEMAP_SUPABASE_PUBLISHABLE_KEY` as GitHub Actions repository variables.

## GitHub Pages setup

A repository administrator, maintainer, or custom role with Pages management permission must:

1. Open **Settings → Pages** and select **GitHub Actions** under **Build and deployment → Source**.
2. Enable Actions and allow deployments from `main` in the `github-pages` environment.
3. Push or merge to `main`, or choose **Actions → Deploy GameMap to GitHub Pages → Run workflow** on `main`.

The URL serves this site only after Pages is enabled and deployment succeeds. Never include credentials or private data in public assets.

## Deployment workflow

- `.github/workflows/catalog.yml` validates generated content, runs `npm run check`, builds with the `/GameMap/` base, and runs `npm run check:build` on pull requests. It does not publish.
- `.github/workflows/deploy-pages.yml` builds and validates on `main` with Supabase Direct community enabled, uploads only `dist/`, and publishes with official SHA-pinned Pages actions. Pages/OIDC write permissions are scoped to the deploy job.
- The publishing build sets `PAGES_BASE_PATH` from Pages metadata. React Router uses the same basename; build finalization flattens pre-rendered routes so the published directory is not nested under a second `GameMap/`.
- All application and document routes are pre-rendered. Initial route discovery is embedded, so client navigation never depends on a server-side route-manifest API. Unknown paths receive a real 404 page.

Source code, lockfiles, editorial files, and original media stay versioned. Build output, staged document copies and images, caches, and local secrets are ignored; see [the versioning policy](../../CONTRIBUTING.md#what-belongs-in-git).

The site includes local Inter fonts. Upstream dependency and font license texts are collected in the built `THIRD-PARTY-NOTICES.txt` file. External creator demos, project pages, and source repositories still require internet access.

For repository settings and troubleshooting, see the [official GitHub Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
