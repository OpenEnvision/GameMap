import type { Config } from "@react-router/dev/config";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const basename =
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/");

export default {
  appDirectory: "website/app",
  buildDirectory: ".build/website",
  basename: basename === "/" ? "/" : basename + "/",
  ssr: false,
  routeDiscovery: { mode: "initial" },
  async prerender() {
    // The same generated routes as website/app/routes.ts, including the database preview's.
    const paths = JSON.parse(
      await readFile(
        join(
          process.env.CATALOG_CONTENT_DIRECTORY || "website/.content",
          "routes.json",
        ),
        "utf8",
      ),
    ) as string[];
    // Generated from the typed registry; React Router adds basename itself.
    return [
      ...paths.map((path) => (path === "/" ? "/" : path.replace(/\/$/, ""))),
      "/404",
      "/search-index.json",
      "/zh/search-index.json",
    ];
  },
} satisfies Config;
