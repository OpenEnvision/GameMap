import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("resources", "routes/resources.tsx"),
  route("examples", "routes/examples.tsx"),
  route("testing", "routes/testing.tsx"),
  route("docs", "routes/docs-index.tsx"),
  route("docs/*", "routes/docs.tsx"),
  route("search-index.json", "routes/search-index.ts"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
