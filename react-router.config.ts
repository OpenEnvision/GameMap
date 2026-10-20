import type { Config } from "@react-router/dev/config";
import contentPaths from "./website/.content/routes.json";

const basename =
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/");

export default {
  appDirectory: "website/app",
  buildDirectory: ".build",
  basename: basename === "/" ? "/" : basename + "/",
  ssr: false,
  routeDiscovery: { mode: "initial" },
  prerender() {
    // A config dependency lets the dev server refresh its prerender allow-list
    // when content adds a URL. An untracked readFile left new detail loaders out
    // of SingleFetch until the server was manually restarted.
    const paths = contentPaths as string[];
    // Generated from the typed registry; React Router adds basename itself.
    return [
      ...paths.map((path) => (path === "/" ? "/" : path.replace(/\/$/, ""))),
      "/404",
      "/search-index.json",
      "/zh/search-index.json",
    ];
  },
} satisfies Config;
