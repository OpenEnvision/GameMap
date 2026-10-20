# Website development and deployment

GameMap uses **Fumadocs, React Router, React, TypeScript, and Vite**. The publishing target is [GitHub Pages](https://openenvision.github.io/GameMap/). The complete website consists of static HTML, CSS, JavaScript, media, and browser-side search indexes. No application server or API key is required.

## The complete website at the repository root

| File | What it contains | How to use it |
| --- | --- | --- |
| Repository-root `index.html` | The complete, pre-rendered GameMap homepage, identical to `dist/index.html` | Publish the repository root with its generated assets, route directories, and data. `npm run preview` serves this root static site. |
| `dist/index.html` | The same complete homepage in the disposable build directory | Keep the complete `dist/` tree when packaging it or using the optional Actions deployment. Preview this copy with `npm run preview -- --root dist`. |

The root HTML contains the actual homepage, including its content and layout. It does not redirect to localhost or to a separate published address. A build exports all required static files alongside it; copying only `index.html` would leave its styles, scripts, media, and other routes behind. Direct file access can inspect the pre-rendered page, while an HTTP preview verifies routing and browser features under the same origin rules as Pages.

The default publishing setup is **Deploy from a branch → main → /(root)** in GitHub Pages. Commit the complete root static export together with the source files. `.nojekyll` makes Pages serve the generated tree directly. The optional Actions workflow can instead rebuild and publish `dist/`.

## Local development

Use Node.js 22.22 or newer:

```sh
npm ci
npm run dev
```

The development URL is `http://127.0.0.1:5177/`. Port 5177 is strict: if it is occupied, stop the conflicting server or choose an explicit custom port with `npm run dev -- --port 5178`. Use the URL printed in the terminal to inspect source changes. The root static site continues to show the last production build until rebuilt. The main routes are:

- `/` — overview and featured game examples.
- `/resources/` — searchable resources and browser-local collections.
- `/examples/` — games with engine labels, creator evidence, and project source.
- `/papers/` — research with code, license, project, and demo filters.
- `/research/` — repository research and release qualifications.
- `/showcase/` — credited project demonstrations and recordings.
- `/testing/` — test projects, environments, assets, and motion-data references.
- `/docs/` — rendered guides, research notes, and source attribution.

The application lives in `website/app/`. Resource source records live in `data/segments/`, paper records in `data/papers.json`, and case data in `website/src/data/`. Public source assets live in `website/public/`.

## Documents and generated files

Markdown under `docs/`, plus `README.md`, `AWESOME.md`, and `CONTRIBUTING.md`, is rendered at build time. Articles include navigation, a table of contents, highlighted code, heading links, and full-text search. The original Markdown remains the source of truth and is available through each article's source link. Generated article HTML coexists with source Markdown in `docs/`. Generated root Markdown downloads are tracked by `.gamemap-static.json` and excluded from source-document discovery; `CONTRIBUTING.md` is explicitly preserved as a source file.

`scripts/prepare-docs.mjs` creates disposable copies in `website/.content/`. It derives titles, rewrites internal Markdown links to document routes, and stages documentation images in the ignored `website/public/docs-assets/` directory. `website/docs.config.json` controls navigation groups and short labels; `website/docs.descriptions.json` provides article summaries. While `npm run dev` is running, source-document, content-definition, and catalog changes refresh these generated copies. Edit source files rather than prepared copies or generated catalogs. A production preview reads the last build; rebuild after source changes.

Fumadocs MDX provides the article bodies. They are lazy-loaded during client navigation, while direct article links also contain complete HTML. Search uses static browser indexes; production has no `/api/search` server.

## Build, validate, and package

Run from the repository root:

```sh
npm run sync:papers
node scripts/generate.mjs
PAGES_BASE_PATH=/GameMap/ npm run build
npm run check
npm run check:build
npm run check:release
npm run preview
```

- `sync:papers` updates public paper JSON, availability counts, and provenance from `data/papers.json`.
- `generate.mjs` updates the complete awesome list, case guides, source attribution, and public downloads. It does not overwrite the README.
- `build` checks TypeScript, pre-renders routes, assembles the complete static tree in `dist/`, and automatically exports its pages, assets, and data to the repository root. Temporary framework output stays in `.build/`.
- `generate:entry` synchronizes an existing `dist/` build to the root. Use it after building if a repeat export is needed; it does not compile source changes.
- `check` validates source content, public media, generated editorial files, and root static integrity without requiring `dist/`.
- `check:build` checks rendered content, downloads, internal links, media, search indexes, the real 404 page, and root export integrity.
- `check:release` checks the complete root and `dist/` deployment structures.

The preview command serves the root static export by default, reads its built base path, and prints the correct URL, including `/GameMap/` when present. It serves static files without an application server or SPA fallback. Use `npm run preview -- --root dist` to inspect the staging copy. Opening HTML with `file://` does not reproduce Pages routing or browser module-origin rules.

To create a portable publishing archive from the validated build:

```sh
npm run package:pages
```

This writes `release/GameMap-pages.zip`. Its outermost level contains the complete website's `index.html`, `404.html`, assets, and route directories; there is no enclosing `dist/` directory. The archive keeps the base path of the build, so rebuild for the destination path before packaging. The ZIP and `release/` directory are disposable outputs. Branch publishing uses the committed root site, and the optional Actions workflow publishes `dist/`; neither requires this archive.

### Browser tests

```sh
npx playwright install chromium
npm run test:web
```

Tests exercise desktop and mobile layouts, availability filters, saved collections, resource details, click-to-play previews, documentation with and without JavaScript, static search, themes, and 404 behavior against the built artifact. Pull requests run these checks in CI. `test-results/` and browser reports are ignored.

## Publish with GitHub Pages

For the intended address, use a repository named **GameMap** under **OpenEnvision**. The repository owner and name determine the default Pages address. If starting from a downloaded source folder, create the repository on GitHub, build for `/GameMap/`, then upload or commit the project files to `main`. Include the complete root static export: `index.html`, `.nojekyll`, `.gamemap-static.json`, assets, media, route directories, route data, search indexes, and downloads. Keep these alongside the source files, hidden `.github/workflows/`, `package-lock.json`, `README.md`, and `AWESOME.md`. Keep `node_modules/`, `dist/`, `release/`, caches, and local secrets out of the source repository; see [the versioning policy](./CONTRIBUTING.md#what-belongs-in-git).

A repository administrator or another role with Pages management permission then:

1. Opens **Settings → Pages** and selects **Deploy from a branch** under **Build and deployment → Source**.
2. Selects branch **main** and folder **/(root)**, then saves.
3. Pushes or merges the complete, validated root static export to `main` after each build.
4. Waits for the Pages deployment to succeed, then opens the URL shown in Pages settings. For the intended repository, it is `https://openenvision.github.io/GameMap/`.

To use the optional rebuild-and-deploy workflow instead, switch the Pages source to **GitHub Actions**. A push to `main` starts that workflow only when the repository Actions variable `PAGES_USE_ACTIONS` is set to `true`; it can also be run explicitly through **Actions → Deploy GameMap to GitHub Pages → Run workflow** on `main`. Permit the `github-pages` environment to deploy from `main` if environment rules require it. The workflow builds for the Pages metadata path and publishes the complete `dist/` tree.

GitHub's web upload interface may omit hidden directories or reject large uploads. A Git client or GitHub Desktop preserves the source tree and uses `.gitignore` when committing. A downloaded folder is not already a Git repository or a successful deployment.

The website becomes available after Pages is enabled and deployment succeeds. Account plans and repository permissions can affect Pages availability. Never include credentials or private data in assets intended for publication.

## Forks, repository names, and custom domains

`PAGES_BASE_PATH` controls the path prefix. For a project repository it is normally `/RepositoryName/`; for a user or organization site, or a custom domain serving the site at its root, it is normally `/`. Build with the destination prefix before committing the root static export. The optional deployment workflow reads this value from GitHub Pages metadata and supplies the same prefix to Vite and React Router. Build finalization flattens pre-rendered routes so the published directory does not contain a second nested repository directory.

The canonical origin is declared in **`website/content/site.ts`** as `siteOrigin`. Set it to the actual HTTPS origin when moving to another GitHub owner or a custom domain, then rebuild. Also update the project addresses displayed in the README, the published-website link in `scripts/catalog.mjs`, and repository source links in `website/app/routes/docs.tsx`, `website/content/fields.ts`, and `scripts/repository-research.mjs` if repository ownership changes. These source links intentionally identify OpenEnvision/GameMap and do not follow `PAGES_BASE_PATH` automatically.

For a custom domain, configure it in GitHub Pages settings and add the domain's required DNS records. If keeping a `CNAME` file in the artifact, place it in `website/public/CNAME` so the build copies it. Follow [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for the selected domain type.

## Deployment workflow and notices

- `.github/workflows/catalog.yml` validates committed source outputs and the root static site, builds with `/GameMap/`, validates the deployment tree, and runs desktop/mobile browser tests on pull requests. It does not publish.
- `.github/workflows/deploy-pages.yml` is optional. It runs on an explicit manual dispatch, or a push to `main` when `PAGES_USE_ACTIONS=true`. It builds using Pages metadata, validates the complete site and release structure, then uploads `dist/` with SHA-pinned Pages actions. Pages/OIDC write permissions are scoped to the deploy job.
- All application and document routes are pre-rendered. Client navigation uses embedded initial route discovery. Unknown paths receive a real 404 page.

Local Inter fonts and upstream dependency license texts are included in `THIRD-PARTY-NOTICES.txt` in the built site. Original games, media, code, model weights, and datasets retain their respective terms; inclusion does not grant a common license to them. External demos, project pages, and repositories require internet access.

For repository settings and troubleshooting, see [GitHub's Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
