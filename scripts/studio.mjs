import { resolve, relative, isAbsolute } from "node:path";
import { stat } from "node:fs/promises";
import { root } from "./lib/documents.mjs";
import { loadContent } from "./lib/content.mjs";
import { createImportBundle } from "./lib/platform.mjs";
import { connectDatabase } from "./lib/catalog/database.mjs";
import { createSupabaseAuth, createSessions } from "./lib/catalog/auth.mjs";
import { createCatalogWorker } from "./lib/catalog/worker.mjs";
import { createMediaStore } from "./lib/catalog/media.mjs";
import { createStudioServer } from "./lib/catalog/server.mjs";
import {
  readReleaseRealmFile,
  assertReleaseRealm,
} from "./lib/catalog/release-realm.mjs";

if (process.argv.includes("--production")) process.env.NODE_ENV = "production";
const required = [
  "CATALOG_DATABASE_URL",
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
  "CATALOG_SESSION_SECRET",
  "CATALOG_RELEASE_REALM_FILE",
];
const missing = required.filter((key) => !process.env[key]);
const origin = process.env.CATALOG_STUDIO_ORIGIN || "http://127.0.0.1:5174";
const parsedOrigin = new URL(origin);
if (parsedOrigin.origin !== origin || parsedOrigin.pathname !== "/")
  throw new Error(
    "Use an exact origin, without a path, for CATALOG_STUDIO_ORIGIN",
  );
if (process.env.NODE_ENV === "production" && parsedOrigin.protocol !== "https:")
  throw new Error(
    "Production Studio requires an HTTPS origin and a trusted TLS reverse proxy",
  );
const port = Number(process.env.CATALOG_STUDIO_PORT || 4180);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("Invalid Studio API port");
let options = { origin, missingConfiguration: missing };
let database;
if (!missing.length) {
  const realm = await readReleaseRealmFile(
    process.env.CATALOG_RELEASE_REALM_FILE,
  );
  if (realm.environment !== "local" && process.env.NODE_ENV !== "production")
    throw new Error("Non-local Studio realms require production security mode");
  database = connectDatabase(process.env.CATALOG_DATABASE_URL);
  assertReleaseRealm(
    await database.system(
      async (client) =>
        (await client.query("select catalog.current_release_realm() as realm"))
          .rows[0].realm,
    ),
    realm,
  );
  const ready = await database.system(
    async (client) =>
      (
        await client.query(
          "select to_regclass('catalog.studio_sessions') as sessions",
        )
      ).rows[0],
  );
  if (!ready.sessions)
    throw new Error(
      "Apply all catalog migrations to the isolated target database before starting Studio",
    );
  const authUrl = new URL(process.env.SUPABASE_URL);
  if (
    process.env.NODE_ENV === "production" &&
    authUrl.protocol !== "https:" &&
    !["127.0.0.1", "localhost", "[::1]"].includes(authUrl.hostname)
  )
    throw new Error(
      "Production Auth requires HTTPS, except for an explicitly local loopback service",
    );
  const context = await loadContent();
  const bundle = await createImportBundle(context);
  const auth = createSupabaseAuth(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
  );
  const sessions = createSessions(database, auth, {
    secret: process.env.CATALOG_SESSION_SECRET,
    origin,
  });
  if (process.env.NODE_ENV === "production") {
    const mediaRoot = process.env.CATALOG_MEDIA_ROOT;
    if (
      !mediaRoot ||
      !isAbsolute(mediaRoot) ||
      !relative(root, resolve(mediaRoot)).startsWith("..")
    )
      throw new Error(
        "Production requires an absolute, persistent CATALOG_MEDIA_ROOT outside the source repository",
      );
  }
  const media = createMediaStore(
    process.env.CATALOG_MEDIA_ROOT
      ? resolve(process.env.CATALOG_MEDIA_ROOT)
      : undefined,
  );
  await media.ready();
  const worker = createCatalogWorker(database, context, {
    realm,
    sourceFiles: bundle.snapshot.source_files,
    readAsset: (path) => media.readAsset(path),
  });
  options = { ...options, database, context, sessions, media, worker };
}
const staticDirectory = resolve(root, ".build/studio");
try {
  if ((await stat(staticDirectory)).isDirectory())
    options.staticDirectory = staticDirectory;
} catch {
  /* Vite serves the UI during development. */
}
const server = createStudioServer(options);
server.listen(port, process.env.CATALOG_STUDIO_HOST || "127.0.0.1", () => {
  console.log(`GameMap Studio API: http://127.0.0.1:${port}`);
  if (missing.length)
    console.log(
      `Setup required: ${missing.join(", ")}. No database connection or authentication bypass has been enabled.`,
    );
  else
    console.log(
      "Studio is connected. Drafts, review and frozen releases are separate; this server never activates a deployment.",
    );
});
async function close() {
  server.closeAllConnections();
  await new Promise((done) => server.close(done));
  await database?.close();
}
process.once("SIGINT", () => close().then(() => process.exit(0)));
process.once("SIGTERM", () => close().then(() => process.exit(0)));
