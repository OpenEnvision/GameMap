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
    const paths = JSON.parse(
      await readFile("website/.content/routes.json", "utf8"),
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
