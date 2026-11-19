import { join } from "node:path";
import { localDirectory } from "../lib/catalog/local-runtime.mjs";
import { createDevelopmentCommunityRuntime } from "../lib/community/development.mjs";

const configFile = join(localDirectory, "community-dev.json");

/** Serves the community API from the development server, so /examples/ can
 *  sign in, rate and comment against the working catalog. Mounts only when the
 *  operator provisioned `community-dev.json`; otherwise every request is left
 *  to Vite and the site stays a plain static preview. */
export function communityDevelopment() {
  return {
    name: "gamemap-community-development",
    apply: "serve",
    configureServer(server) {
      const httpServer = server.httpServer;
      if (!httpServer) return;
      const owns = (url) =>
        url.startsWith("/api/community/") ||
        url.startsWith("/community-media/") ||
        url.split("?")[0] === "/auth/callback";
      let runtime;
      const ready = new Promise((resolve) => {
        const start = () => {
          const port = httpServer.address()?.port;
          runtime = port
            ? createDevelopmentCommunityRuntime({
                configFile,
                origin: `http://127.0.0.1:${port}`,
                loadGames: () => loadCatalogGames(server),
                log: (message) => server.config.logger.warn(message),
              }).catch((error) => {
                server.config.logger.error(
                  `Community backend failed to start: ${error.message}`,
                );
                return null;
              })
            : Promise.resolve(null);
          resolve(runtime);
        };
        if (httpServer.listening) start();
        else httpServer.once("listening", start);
      });
      server.middlewares.use((request, response, next) => {
        if (!owns(request.url || "")) return next();
        ready
          .then((current) => {
            if (!current) return next();
            return current
              .handle(request, response)
              .then((handled) => !handled && next());
          })
          .catch((error) => {
            server.config.logger.error(
              `Community request failed: ${error.message}`,
            );
            next();
          });
      });
      httpServer.once("close", () => ready.then((current) => current?.close()));
    },
  };
}

/** The card keys the examples page renders: every game that offers a record,
 *  including research repositories with their own build. */
async function loadCatalogGames(server) {
  const [{ contentIn }, { exampleGames }] = await Promise.all([
    server.ssrLoadModule("/website/content/registry.server.ts"),
    server.ssrLoadModule("/website/app/lib/collection-stats.ts"),
  ]);
  const { native, linked, imported } = exampleGames(contentIn("en"));
  const games = new Map();
  const add = (key, title, description, url) => {
    if (!games.has(key)) games.set(key, { title, description, url });
  };
  for (const entry of native)
    add(entry.key, entry.data.title, entry.description, entry.url);
  for (const entry of linked)
    add(entry.key, entry.data.game_access.title, entry.description, entry.url);
  for (const entry of imported)
    add(entry.key, entry.data.name, entry.description, entry.url);
  return [...games].map(([key, payload]) => ({ key: "dev:" + key, payload }));
}
