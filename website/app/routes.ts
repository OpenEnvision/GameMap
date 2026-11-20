import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { pages, detailRoutes, systemRoutes } from "../content/site";
// With ssr:false every server-loaded route requires generated prerender targets.
// The database working preview prepares its routes in its own content directory.
const routesFile = join(
  process.env.CATALOG_CONTENT_DIRECTORY || "website/.content",
  "routes.json",
);
const generatedRoutes: string[] = existsSync(routesFile)
  ? JSON.parse(readFileSync(routesFile, "utf8"))
  : [];
const availableDetails = detailRoutes.filter(
  (page) =>
    !["paper-detail", "threejs-game-detail"].includes(page.id) ||
    generatedRoutes.some(
      (path) =>
        path.startsWith(page.path.split(":")[0]) &&
        path !== page.path.split(":")[0],
    ),
);
// Include language-specific documentation entrances in the canonical route table.
const path = (value: string) => value.replace(/^\/|\/$/g, "");
export default [
  ...Object.entries(pages).map(([id, page]) =>
    page.path === "/"
      ? index(page.module, { id })
      : route(path(page.path), page.module, { id }),
  ),
  ...availableDetails.map((page) =>
    route(path(page.path), page.module, { id: page.id }),
  ),
  ...Object.entries(pages)
    .filter(([id]) => id !== "docsZh")
    .map(([id, page]) =>
      route("zh/" + path(page.path), page.module, { id: `zh-${id}` }),
    ),
  ...availableDetails.map((page) =>
    route("zh/" + path(page.path), page.module, { id: `zh-${page.id}` }),
  ),
  // Fully translated guides use /docs/zh/*. Only register the /zh/docs/*
  // source-language fallback loader when a snapshot actually renders it.
  ...systemRoutes
    .filter(
      (page) =>
        page.id !== "document" ||
        generatedRoutes.some(
          (path) => path.startsWith("/zh/docs/") && path !== "/zh/docs/",
        ),
    )
    .map((page) =>
      route("zh/" + path(page.path), page.module, { id: `zh-${page.id}` }),
    ),
  ...systemRoutes.map((page) =>
    route(path(page.path), page.module, { id: page.id }),
  ),
] satisfies RouteConfig;
