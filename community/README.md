# GameMap community: local setup and permission boundaries

This version is for real local verification at `http://127.0.0.1:4191`. It needs no Railway account and performs no cloud deployment.

## Features

- Email-and-password sign-up and sign-in, email confirmation, and passwordless sign-in links.
- GitHub sign-in with PKCE. Without an OAuth app the entry point is explicitly disabled; sign-in is never simulated.
- One 1–5 star rating per user per game, which the user can change. Cards show the average and the number of ratings; detail pages host the discussion.
- Plain-text comments, deletion by the author, reports, and moderator handling.
- Users with a verified email can submit game details, an HTTPS play or download link, an optional source repository, and 1–5 real screenshots.
- Submissions are reviewed first. Once approved they appear immediately in the existing example card list, without modifying or activating the catalog snapshot.

## Builds

The community UI and its `/api/community` requests are switched on only in builds made with `VITE_GAMEMAP_COMMUNITY=1`; other builds still contain the code but never mount the community provider. Release builds (`npm run site:build`), which the publication server below serves, set it automatically. `npm run build` and `npm run dev` leave it unset, so GitHub Pages and other static copies make no community requests: ratings and discussions are hidden, community navigation links are not shown, and `/account/`, `/submit/` and `/works/` explain that the community server is required. Do not put the flag in `.env`: Vite reads that file during `npm run build` and would turn an ordinary static build into a community build.

## Enable locally

Start Docker Desktop first. The existing database and published files must be preserved: **do not use reset**.

```sh
npm run local:backup
node scripts/platform/community.mjs setup
# If this change edited supabase/config.toml, reload through the owning local-stack wrapper:
npm run local:stop
npm run local:start
node scripts/platform/community.mjs setup
# Port 4191 must serve this entry point, not the ordinary preview that reads the Git-only dist:
node scripts/platform/local-publication.mjs serve --port 4191
```

If a port is already in use, check which process is listening first; do not start a second server or stop unrelated processes. Public pages must be rebuilt separately from the latest complete catalog snapshot; setup does not build, review, or activate the catalog.

- Mail is captured locally in Mailpit at `http://127.0.0.1:54324`. Open confirmation links in the **same browser** that started the sign-up or passwordless sign-in.
- Public community entry points in community builds: `/account/` and `/submit/` (Chinese site: `/zh/account/` and `/zh/submit/`).
- Private Studio: `http://127.0.0.1:5174` (the existing local workbench). Back-office accounts with the reviewer or admin role can open the community moderation view, labelled “社区审核” in the Chinese-only Studio interface.
- The generated `.build/catalog-local/community.json` contains a random session secret and a dedicated database login. **Never commit it, paste it into a chat, or place it in a public directory.**
- Ordinary registered users do not receive `catalog.memberships` and cannot sign in to Studio. Self-service sign-up is not a back-office invitation.

## GitHub OAuth: you must create a real app

1. Create an app under GitHub Settings → Developer settings → OAuth Apps.
2. Local Homepage URL: `http://127.0.0.1:4191`.
3. Authorization callback URL: `http://127.0.0.1:54321/auth/v1/callback`. This is the **Supabase Auth** callback, not the site's final callback. Do not enable Device Flow.
4. Write the Client ID and Client Secret yourself into the private, git-ignored `.env` at the repository root:

   ```dotenv
   GAMEMAP_GITHUB_CLIENT_ID=your-client-id
   GAMEMAP_GITHUB_CLIENT_SECRET=your-client-secret
   ```

5. Edit the existing GitHub section in `supabase/config.toml` (do not add a second section):

   ```toml
   [auth.external.github]
   enabled = true
   client_id = "env(GAMEMAP_GITHUB_CLIENT_ID)"
   secret = "env(GAMEMAP_GITHUB_CLIENT_SECRET)"
   ```

6. Reload the owning local stack so that the CLI child processes read the private environment:

   ```sh
   node --env-file=.env scripts/platform/local-catalog.mjs stop
   node --env-file=.env scripts/platform/local-catalog.mjs start
   ```

7. Check that `github` is `true` in `/api/community/config`, then verify the complete authorization and callback flow with a real GitHub account.

The site's final callback is `http://127.0.0.1:4191/auth/callback`, which is already in the local Auth redirect allowlist. It uses a one-time PKCE verifier and a browser-bound state cookie. Do not replace real authorization with token fragments, fake users, or disabled verification.

**Until OAuth credentials exist, only the integration code, the unavailable state, and the security boundaries can be verified. Do not claim that real GitHub sign-in has passed acceptance.**

## Security and data

- New data lives in a separate `community` schema. Ordinary browser roles have no privileges on the raw tables, and an ordinary Auth JWT cannot call the write or upload-registration RPCs directly. Writes go only through a dedicated BFF role, so image normalization, same-origin checks, and HTTP rate limits cannot be bypassed.
- The dedicated community backend cannot read the private catalog tables. Studio moderation still requires its existing verified session, CSRF protection, and reviewer or admin eligibility.
- Access and refresh tokens are stored only in encrypted server-side sessions; the browser receives only an HttpOnly cookie and a CSRF nonce.
- Writes check the exact Origin, the session, and the CSRF nonce. Ratings, comments, reports, uploads, and submissions all have quantity limits.
- Screenshots are fully decoded, stripped of EXIF data, and converted to content-addressed WebP. SVG, HTML, and game binaries are not accepted.
- Screenshots awaiting review are readable only by the author and moderators, and can be shown publicly once approved. Revising a submission creates a new revision instead of overwriting the approved version. Authors can withdraw a published work, and moderators can take one down after recording a reason.
- User declarations and ratings are not independent playtests by the platform, proof of AI provenance, or copyright certification.
- After every catalog publication change, update the index of ratable works from the complete snapshot that is actually in effect; do not fill in business rows from Git default data.

## Verification

```sh
npm run test:community
```

These tests cover rating updates, ownership of comments and reports, submission revision approval, private image boundaries, permission isolation between ordinary users and Studio, server-side tokens, and PKCE. Static builds are covered by `tests/e2e/community-static.spec.ts` (`npm run build`, then `npm run test:web`). Read-only page regressions for community builds live in `tests/release/community.spec.ts`; they use clearly labelled display data and do not pass themselves off as real sign-in acceptance. Evidence from local real-Auth and browser write and moderation acceptance is kept in the ignored `.build/community-platform/` directory. The test account files there contain credentials and must not be published.

## Production boundaries

Local verification is not a production launch. Real use still requires a separate production instance and realm, an HTTPS same-origin API proxy, a mail service that actually delivers, a production GitHub callback, persistent media storage with backups, and anti-abuse measures with operational moderation. Uploading only the static `dist/`, or deploying only the `supabase/` directory, cannot run the full community.
