import type { Config } from "@react-router/dev/config";
import { readFile } from "node:fs/promises";

const basename =
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/");

export default {
  appDirectory: "website/app",
  buildDirectory: ".build",
  basename: basename === "/" ? "/" : basename + "/",
  ssr: false,
  routeDiscovery: { mode: "initial" },
  async prerender() {
    const documents = JSON.parse(
      await readFile("website/.content/manifest.json", "utf8"),
    ) as { slug: string }[];
    const routes = [
      "/",
      "/resources",
      "/examples",
      "/testing",
      "/docs",
      "/404",
      "/search-index.json",
      ...documents.map((page) => "/docs/" + page.slug),
    ];
    // React Router prefixes these paths with basename during prerendering.
    return routes;
  },
} satisfies Config;
