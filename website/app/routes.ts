import { readFileSync, existsSync } from "node:fs";
import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { pages, detailRoutes, systemRoutes } from "../content/site";
// An empty collection has no static detail pages. With ssr:false React Router rejects
// server loaders that have no prerender targets; release generation enables these
// routes as soon as selected records exist, without inventing placeholder entries.
const generatedRoutes: string[] = existsSync("website/.content/routes.json")
  ? JSON.parse(readFileSync("website/.content/routes.json", "utf8"))
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
