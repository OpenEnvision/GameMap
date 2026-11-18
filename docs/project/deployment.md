# Website development and deployment

GameMap uses **Fumadocs, React Router, React, TypeScript, and Vite**. The publishing target is [GitHub Pages](https://openenvision.github.io/GameMap/). Production consists only of static HTML, CSS, JavaScript, media, and a browser-side search index. No application server or API key is required.

## Local development

Use Node.js 22.22 or newer:

```sh
npm ci
npm run dev
```

Open the URL printed by React Router. The main routes are:

- `/` — overview and featured game examples.
- `/resources/` — searchable, filterable resources and browser-local collections.
- `/examples/` — playable games with creator evidence and project source.
- `/testing/` — projects, environments, assets, and motion-data references.
- `/docs/` — rendered guides, research notes, and source attribution.

The application lives in `website/app/`. Existing catalog and case data remain in `website/src/data/`; public source assets remain in `website/public/`.

## Documents and internal links

Markdown under `docs/` (including `docs/reference/catalog.md`), plus `CONTRIBUTING.md`, is rendered at build time; the folder indexes `docs/README.md` and `docs/zh/README.md` are for repository readers only. Articles include navigation, a table of contents, highlighted code, heading links, and full-text search. Git-authored long-form Markdown remains the source of truth and is available through its source link. Registered catalog guides are generated views of structured data; their source link identifies the trusted generator rather than implying that an old Git export is a competing authoring source.

`scripts/build/prepare-docs.mjs` creates disposable copies in `website/.content/`. It derives titles, rewrites internal Markdown links to document routes, and stages local documentation images in the ignored `website/public/docs-assets/` directory. Original research text is not rewritten. `website/docs.config.json` controls navigation groups and short labels; ungrouped articles remain available under More notes. After editing source Markdown during development, rerun this preparation script or restart `npm run dev` to refresh the prepared copies.

The document source uses Fumadocs MDX's Vite integration in Markdown-only mode; catalog prose cannot execute MDX expressions or imports. Article bodies are lazy-loaded on client navigation, but every document also ships as complete HTML, so direct links and reading without JavaScript work. Full-text search loads a static index into the browser; there is no `/api/search` server in production.

## Build and validate

```sh
node scripts/build/generate.mjs
npm run check
npm run build
npm run check:build
```

- `generate.mjs` synchronizes the resource catalog and downloadable editorial files. It does not overwrite the README.
- `npm run check` validates source data, public source media, and generated editorial files without requiring build output.
- `npm run build` prepares documents, checks TypeScript, pre-renders routes, and assembles the static `dist/` directory. Temporary framework output stays in `.build/website/`, separate from private Studio output, import packages and staged media. Building the public website must never clear the whole `.build/` directory.
- `npm run check:build` also checks deployed documents/media, every rendered article, internal links/assets, the static search index, and the real 404 page.

To reproduce the GitHub Pages subpath:

```sh
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check:build
npm run preview
```

The preview command reads the base path from the built site and prints the correct URL. It serves static files only, with no SPA fallback, matching GitHub Pages more closely than a development server. **The old root `file://` preview is no longer generated or supported.** Use `npm run preview` for production previews.

### Browser tests

```sh
npx playwright install chromium
npm run test:web
```

Tests exercise desktop and mobile layouts, filtering, saved collections, resource dialogs, click-to-play previews, document navigation with and without JavaScript, static search, themes, and 404 behavior against the built static artifact. Pull requests run these checks in CI. `test-results/` and browser reports are ignored.

### Private release-package builds

`npm run site:build -- --input PACKAGE --out PRIVATE_OUTPUT --realm OPERATOR_REALM_FILE --base /GameMap/ --browser` verifies a reviewed release and builds it in a separate temporary workspace. It does not change the ordinary build source, the working tree's `dist/`, or the Pages workflow. Use `npm run site:verify -- --input PRIVATE_OUTPUT` to verify the exact completed artifact. The realm file is an independently provisioned operator expectation, not a file trusted from the release sender. Local fixtures require `--development` and remain explicitly local; staging/production require matching immutable realm identity, clean exact source and browser gates. See [content-platform operations](content-platform.md) for generated-guide review, source ownership, artifact evidence and remaining deployment gates. Nothing is uploaded or activated by these commands.

## Optional low-memory Studio

Studio keeps its existing upload policy unless an operator explicitly sets `CATALOG_MEDIA_PROFILE=low-memory`. Unknown profile values fail startup rather than silently falling back. The low-memory policy:

- Accepts at most **2.5 million pixels** per new upload (including 1920×1080), versus the default 40 million. Both profiles retain the 10 MB encoded/output limit and 10,000-pixel dimension limit.
- Admits **one upload at a time per process/store**, before reading its request body. Extra authenticated uploads receive `429 media_busy`, `Retry-After: 1` and a closed connection; images are not queued in memory. Authentication, membership, Origin and CSRF checks still precede admission.
- Disables Sharp's process-wide operation cache and uses one native image-processing thread at Studio startup. The default profile does not change these native settings. Run one Studio instance/store; this is not distributed coordination.
- Rejects oversized images explicitly, without resizing, cropping or changing their provenance. Accepted uploads keep the same lossless, auto-oriented, EXIF-stripped WebP normalization. Existing larger media remains readable and exportable without rewriting its bytes.

Authenticated `/api/contracts` responses include `mediaUpload`, the actual upload policy. Limits are enforced server-side even if a browser does not display them. Aborted reads and failed decoding/storage release admission slots.

For a small **Linux/glibc** runtime, the local resource probe also uses the following **pre-launch** allocator, worker-pool and V8 settings. Supply the normal private Studio configuration and prebuilt UI separately:

```sh
MALLOC_ARENA_MAX=2 UV_THREADPOOL_SIZE=1 CATALOG_MEDIA_PROFILE=low-memory \
  node --max-old-space-size=128 scripts/platform/studio.mjs --production
```

Apply these settings to the runtime only, not dependency installation, builds or migrations. In particular, putting `MALLOC_ARENA_MAX` in a file loaded by Node's `--env-file` does not establish the tested pre-launch allocator environment. The V8 heap setting does **not** limit native image memory or total process memory. Other platforms/allocators require separate measurement.

This policy is **not a guarantee that every workflow fits a 512 MiB host**. Resource probes are local, not provider acceptance. Large API responses, validation, freezing/export and concurrent non-upload requests still require full-workload measurement. Verify actual host architecture, restarts, persistent-volume capacity, cold starts, quotas, database/Auth connectivity, backup/recovery and mainland-China access before using a free tier. Do not automatically upgrade to a paid plan when a test or quota fails. HTTPS, private persistent storage, immutable release identity and independent publication approval remain mandatory.

## Staging preparation (disabled, offline only)

See the [staging-readiness review](staging-readiness.md) before connecting a cloud project. `config/staging.example.json` proposes an isolated preview repository, Supabase project and single-instance persistent Studio host, but is not consumed by a publisher. `npm run staging:check -- --config config/staging.example.json --out NEW_PRIVATE_DIRECTORY` writes a private redacted report and blank-secret Studio environment template without reading credential stores or making network requests. Exit code 2 means blocked/not ready. Immutable realm enforcement is implemented and tested locally, but actual cloud identity, hosting-adapter and operational acceptance remain unverified or blocked; filling placeholders cannot authorize a deployment.

This preparation does not change the default Git provider or `.github/workflows/deploy-pages.yml`, create resources, commit, push or deploy.

## GitHub Pages setup

A repository administrator, maintainer, or custom role with Pages management permission must:

1. Open **Settings → Pages** and select **GitHub Actions** under **Build and deployment → Source**.
2. Enable Actions and allow deployments from `main` in the `github-pages` environment.
3. Push or merge to `main`, or choose **Actions → Deploy GameMap to GitHub Pages → Run workflow** on `main`.

The URL serves this site only after Pages is enabled and deployment succeeds. Private repositories require a plan that supports Pages. Enabling Pages does not change repository visibility, but the published website may be publicly accessible. Never include credentials or private data in public assets.

## Deployment workflow

- `.github/workflows/catalog.yml` validates generated content, builds with the `/GameMap/` base, checks static output, and tests desktop/mobile interactions on pull requests. It does not publish.
- `.github/workflows/deploy-pages.yml` builds and validates on `main`, uploads only `dist/`, and publishes with official SHA-pinned Pages actions. Pages/OIDC write permissions are scoped to the deploy job.
- The publishing build sets `PAGES_BASE_PATH` from Pages metadata. React Router uses the same basename; build finalization flattens pre-rendered routes so the published directory is not nested under a second `GameMap/`.
- All application and document routes are pre-rendered. Initial route discovery is embedded, so client navigation never depends on a server-side route-manifest API. Unknown paths receive a real 404 page.

Source code, lockfiles, editorial files, and original media stay versioned. Build output, staged document copies/images, caches, and local secrets are ignored; see [the versioning policy](../../CONTRIBUTING.md#what-belongs-in-git).

The site includes local Inter fonts. Upstream dependency and font license texts are collected in the built `THIRD-PARTY-NOTICES.txt` file. External creator demos, project pages, and source repositories still require internet access.

For repository settings and troubleshooting, see the [official GitHub Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
