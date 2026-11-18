import type { Dimension } from "../src/types";
import retiredDocumentRoutes from "./document-redirects.json";

export const documentRedirects: Record<string, string> = retiredDocumentRoutes;
export function retiredDocumentTarget(pathname: string, base = "/") {
  const prefix = base.replace(/\/$/, "");
  const relative = pathname.startsWith(prefix + "/")
    ? pathname.slice(prefix.length)
    : pathname;
  const target =
    documentRedirects[relative.endsWith("/") ? relative : relative + "/"];
  return target ? prefix + target : null;
}

export const siteOrigin = "https://openenvision.github.io";
// Recording details remain addressable from resources after the gallery is retired.
const demoDetailBase = "/showcase/";
/** The only declaration of routes and navigation. URL helpers use these paths. */
export const pages = {
  account: {
    path: "/account/",
    module: "routes/account.tsx",
    title: "My account",
    nav: "hidden",
  },
  submit: {
    path: "/submit/",
    module: "routes/submit.tsx",
    title: "Submit a game",
    nav: "hidden",
  },
  works: {
    path: "/works/",
    module: "routes/work.tsx",
    title: "Community work",
    nav: "hidden",
  },
  threejsGames: {
    path: "/threejs-games/",
    module: "routes/threejs-games.tsx",
    title: "Three.js games",
    nav: "secondary",
  },
  home: { path: "/", module: "routes/home.tsx", title: "Home", nav: "hidden" },
  resources: {
    path: "/resources/",
    module: "routes/resources.tsx",
    title: "Resources",
    nav: "primary",
  },
  examples: {
    path: "/examples/",
    module: "routes/examples.tsx",
    title: "Game examples",
    nav: "primary",
  },
  papers: {
    path: "/papers/",
    module: "routes/papers.tsx",
    title: "Papers",
    nav: "primary",
  },
  agents: {
    path: "/agents/",
    module: "routes/agents.tsx",
    title: "Agent toolkit",
    nav: "secondary",
  },
  research: {
    path: "/research/",
    module: "routes/research.tsx",
    title: "Repository research",
    nav: "secondary",
  },
  paths: {
    path: "/paths/",
    module: "routes/paths.tsx",
    title: "Development paths",
    nav: "secondary",
  },
  testing: {
    path: "/testing/",
    module: "routes/testing.tsx",
    title: "Testing library",
    nav: "secondary",
  },
  docsZh: {
    path: "/docs/zh/",
    module: "routes/docs-index.tsx",
    title: "Chinese documentation",
    nav: "hidden",
  },
  docs: {
    path: "/docs/",
    module: "routes/docs-index.tsx",
    title: "Guides & notes",
    nav: "primary",
  },
} as const;
export type PageId = keyof typeof pages;
export const detailRoutes = [
  {
    id: "paper-detail",
    path: "/papers/:paperId",
    param: "paperId",
    kinds: ["paper"],
    module: "routes/content.tsx",
  },
  {
    id: "threejs-game-detail",
    path: "/threejs-games/:gameId",
    param: "gameId",
    kinds: ["threejs-game"],
    module: "routes/content.tsx",
  },
  {
    id: "resource-detail",
    path: "/resources/:resourceId",
    param: "resourceId",
    kinds: ["resource"],
    module: "routes/content.tsx",
  },
  {
    id: "example-detail",
    path: "/examples/:exampleId",
    param: "exampleId",
    kinds: ["example", "foundation"],
    module: "routes/content.tsx",
  },
  {
    id: "agent-detail",
    path: "/agents/:agentId",
    param: "agentId",
    kinds: ["agent"],
    module: "routes/content.tsx",
  },
  {
    id: "test-detail",
    path: "/testing/:testingId",
    param: "testingId",
    kinds: ["testing"],
    module: "routes/content.tsx",
  },
  {
    id: "demo-detail",
    path: `${demoDetailBase}:demoId`,
    param: "demoId",
    kinds: ["demo"],
    module: "routes/content.tsx",
  },
  {
    id: "research-detail",
    path: "/research/*",
    param: "*",
    kinds: ["repository-research"],
    module: "routes/content.tsx",
  },
  {
    id: "path-detail",
    path: "/paths/:track",
    param: "track",
    kinds: ["path"],
    module: "routes/content.tsx",
  },
] as const;
export const systemRoutes = [
  { id: "document", path: "/docs/*", module: "routes/docs.tsx" },
  {
    id: "search-index",
    path: "/search-index.json",
    module: "routes/search-index.ts",
  },
  { id: "not-found", path: "*", module: "routes/not-found.tsx" },
] as const;
export const navigation = Object.entries(pages)
  .map(([id, definition]) => ({ id: id as PageId, ...definition }))
  .filter((page) => page.nav !== "hidden");
export const url = {
  paper: (id: string) => `${pages.papers.path}${encodeURIComponent(id)}/`,
  threejsGame: (id: string) =>
    `${pages.threejsGames.path}${encodeURIComponent(id)}/`,
  page: (id: PageId) => pages[id].path,
  resource: (id: string) => `${pages.resources.path}${encodeURIComponent(id)}/`,
  example: (id: string) => `${pages.examples.path}${encodeURIComponent(id)}/`,
  agent: (id: string) => `${pages.agents.path}${encodeURIComponent(id)}/`,
  testing: (id: string) => `${pages.testing.path}${encodeURIComponent(id)}/`,
  testingPack: (id: string) =>
    `${pages.testing.path}#pack-${encodeURIComponent(id)}`,
  demo: (id: string) => `${demoDetailBase}${encodeURIComponent(id)}/`,
  path: (id: string) => `${pages.paths.path}${encodeURIComponent(id)}/`,
  step: (track: string, id: string) =>
    `${pages.paths.path}${encodeURIComponent(track)}/#${encodeURIComponent(id)}`,
  collection: (id: string) =>
    `${pages.examples.path}#collection-${encodeURIComponent(id)}`,
  research: (repository: string) =>
    `${pages.research.path}${repository.split("/").map(encodeURIComponent).join("/")}/`,
  document: (slug: string) =>
    `${pages.docs.path}${slug.split("/").map(encodeURIComponent).join("/")}/`,
};
export const tracks = {
  "2d": {
    title: "Build a 2D game",
    description:
      "A small, repeatable path from a game brief to a distributable build.",
  },
  "3d": {
    title: "Build a 3D game",
    description:
      "Start with one space, establish a working loop, and prepare game-ready assets.",
  },
  world: {
    title: "Explore code world models",
    description:
      "Define state and actions, connect rendering, and test what persists.",
  },
} as const satisfies Record<Dimension, { title: string; description: string }>;
