# Website development and deployment

GameMap is a static React, TypeScript, and Vite website. Its publishing target is [GitHub Pages](https://openenvision.github.io/GameMap/); no backend, API key, or separate hosted-site service is required.

## Local development

```sh
npm ci
npm run dev
```

Open the development URL printed by Vite. The HTML entry is `website/index.html`, application source lives in `website/src/`, and public assets and downloads live in `website/public/`.

## Build and validate

```sh
node scripts/generate.mjs
npm run check
npm run build
npm run check:build
```

- `generate.mjs` synchronizes the resource catalog and downloadable research documents. It does not overwrite the hand-maintained README.
- `npm run check` validates source data, public source media, and generated editorial files without requiring build output.
- `npm run build` regenerates the catalog, checks TypeScript, and creates the deployable `dist/` directory and a standalone root `index.html` preview.
- `npm run check:build` additionally validates deployed downloads, media integrity, and the standalone preview. Run it after building.

`dist/`, the obsolete `website/dist/`, and the generated root preview are ignored by Git. Source code, lockfiles, editorial files, and public source assets remain versioned. See [Contributing](./CONTRIBUTING.md#what-belongs-in-git) for the versioning policy.

### Standalone preview

After building, open the root `index.html` directly in a browser. Its scripts and styles are embedded, but `website/public/` must remain alongside it for images, icons, and documents.

Homepage video previews and posters are bundled locally. Full films, external project pages, and web fonts require an internet connection. Saved resources stay in the current browser and can be exported as Markdown.

## GitHub Pages setup

A repository administrator, maintainer, or custom role with Pages management permission must complete this setup:

1. Open **Settings → Pages** and select **GitHub Actions** under **Build and deployment → Source**.
2. Ensure GitHub Actions is enabled and the `github-pages` environment allows deployments from `main`.
3. Push or merge a change to `main`, or choose **Actions → Deploy GameMap to GitHub Pages → Run workflow** on `main`.

The target URL will serve this site only after Pages is enabled and a deployment succeeds. Private repositories require a GitHub plan that supports Pages. Enabling Pages does not change repository visibility, but the published website may be publicly accessible; do not include credentials or private data in public assets.

## Deployment workflow

- `.github/workflows/catalog.yml` checks generated content, validates sources, builds the site, and validates build output on pull requests. It does not publish.
- `.github/workflows/deploy-pages.yml` builds, validates, and publishes on pushes to `main`, or when run manually on `main`.
- Only `dist/` is uploaded, not repository source or local configuration.
- Official GitHub Pages actions are pinned to commit SHAs. Pages/OIDC write permissions are scoped to the deployment job.

### Repository subpaths

The publishing workflow sets `PAGES_BASE_PATH` from GitHub Pages metadata. This keeps scripts, styles, media, and downloads under `/GameMap/`. Local builds use relative URLs; the standalone preview keeps its own local asset paths.

To reproduce the publishing base locally:

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
PAGES_BASE_PATH=/GameMap/ npm run preview
```

Use the preview URL printed by Vite and include the `/GameMap/` path. The application uses query parameters and URL hashes rather than server routes, so refreshing a shared link does not require an SPA fallback.

Research dossiers are served as downloadable Markdown, not as an inline article reader. Source attribution and media provenance remain bundled with public downloads.

For repository settings and deployment troubleshooting, see the [official GitHub Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
