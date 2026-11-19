import type { Config } from "@react-router/dev/config";
import { readFile } from "node:fs/promises";
import { readPublishedPapers } from "./website/content/published-papers.server";

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
    const paths = JSON.parse(
      await readFile("website/.content/routes.json", "utf8"),
    ) as string[];
    if (process.env.NODE_ENV === "development") {
      const papers = await readPublishedPapers();
      for (const paper of papers || [])
        paths.push(`/papers/${paper.id}/`, `/zh/papers/${paper.id}/`);
    }
    // Generated from the typed registry; React Router adds basename itself.
    return [
      ...paths.map((path) => (path === "/" ? "/" : path.replace(/\/$/, ""))),
      "/404",
      "/search-index.json",
      "/zh/search-index.json",
    ];
  },
} satisfies Config;
