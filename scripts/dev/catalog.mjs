import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { root } from "../lib/documents.mjs";
import {
  developmentContentDirectory,
  developmentInputPath,
  developmentPublicDirectory,
  readDevelopmentInput,
} from "../lib/catalog/site-input.mjs";
import { safePath } from "../lib/catalog/codec.mjs";

const provider = "\0gamemap:working-catalog";
// Modules the preview replaces: the Git provider, and the build's prepared documents.
const redirects = new Map([
  [resolve(root, "website/content/source-data"), provider],
  [
    resolve(root, "website/.content/manifest.json"),
    resolve(developmentContentDirectory, "manifest.json"),
  ],
  [
    resolve(root, "website/app/lib/source"),
    resolve(root, "website/app/lib/working-source.ts"),
  ],
]);
const routesPath = resolve(developmentContentDirectory, "routes.json");
const types = {
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

/** One server-only provider for the whole working catalog, never a per-kind Git overlay. */
export function catalogDevelopment() {
  if (!process.env.CATALOG_DEVELOPMENT_INPUT) return null;
  return {
    name: "gamemap-working-catalog",
    apply: "serve",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer || !source.startsWith(".")) return;
      const path = resolve(dirname(importer.split("?")[0]), source);
      return redirects.get(path) ?? redirects.get(path.replace(/\.ts$/, ""));
    },
    load(id) {
      if (id === provider)
        return `import input from ${JSON.stringify(developmentInputPath)};
          export const sources = input.sources;
          export const catalogs = input.catalogs;`;
    },
    async configureServer(server) {
      assert.ok(
        ["127.0.0.1", "localhost", "::1"].includes(server.config.server.host),
        "Database working previews must bind to loopback",
      );
      let paths = new Set((await readDevelopmentInput()).publicPaths);
      const changed = async (path) => {
        if (path === developmentInputPath)
          paths = new Set((await readDevelopmentInput()).publicPaths);
        if (path === routesPath) await server.restart();
      };
      const onChange = (path) =>
        changed(path).catch((error) =>
          server.config.logger.error(error.message),
        );
      server.watcher.add([developmentInputPath, routesPath]);
      server.watcher.on("change", onChange);
      server.httpServer?.once("close", () =>
        server.watcher.off("change", onChange),
      );
      server.middlewares.use(async (request, response, next) => {
        if (!["GET", "HEAD"].includes(request.method)) return next();
        const pathname = decodeURI(
          new URL(request.url, "http://localhost").pathname,
        );
        const base = server.config.base;
        const path = pathname.startsWith(base)
          ? pathname.slice(base.length)
          : null;
        if (!paths.has(path)) return next();
        try {
          const bytes = await readFile(
            safePath(developmentPublicDirectory, path),
          );
          response.writeHead(200, {
            "Content-Type": types[extname(path)] || "application/octet-stream",
            "Content-Length": bytes.length,
            "Cache-Control": "no-store",
          });
          response.end(request.method === "HEAD" ? undefined : bytes);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}
