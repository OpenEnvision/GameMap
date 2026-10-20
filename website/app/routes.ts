import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { pages, detailRoutes, systemRoutes } from "../content/site";
// Include language-specific documentation entrances in the canonical route table.
const path = (value: string) => value.replace(/^\/|\/$/g, "");
export default [
  ...Object.entries(pages).map(([id, page]) =>
    page.path === "/"
      ? index(page.module, { id })
      : route(path(page.path), page.module, { id }),
  ),
  ...detailRoutes.map((page) =>
    route(path(page.path), page.module, { id: page.id }),
  ),
  ...Object.entries(pages)
    .filter(([id]) => id !== "docsZh")
    .map(([id, page]) =>
      route("zh/" + path(page.path), page.module, { id: `zh-${id}` }),
    ),
  ...detailRoutes.map((page) =>
    route("zh/" + path(page.path), page.module, { id: `zh-${page.id}` }),
  ),
  ...systemRoutes.map((page) =>
    route("zh/" + path(page.path), page.module, { id: `zh-${page.id}` }),
  ),
  ...systemRoutes.map((page) =>
    route(path(page.path), page.module, { id: page.id }),
  ),
] satisfies RouteConfig;
