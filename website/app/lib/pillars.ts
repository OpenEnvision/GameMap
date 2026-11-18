import { pages, type PageId } from "../../content/site";

/** One destination inside a pillar. Collection pages keep their stable
 *  `data-collection-id`; other links (such as community work) do not. */
export type PillarLink = {
  path: string;
  title: string;
  blurb: string;
  collection?: PageId;
};
export type Pillar = {
  id: "games" | "tools" | "research" | "learn";
  label: string;
  kicker: string;
  description: string;
  links: PillarLink[];
};

const collection = (id: PageId, blurb: string): PillarLink => ({
  path: pages[id].path,
  title: pages[id].title,
  blurb,
  collection: id,
});

/**
 * The information architecture: four pillars that group every public
 * collection. Copy is English source text; translate it with `t()`.
 */
export const pillars: readonly Pillar[] = [
  {
    id: "games",
    label: "Games",
    kicker: "Play",
    description:
      "Real games you can play, with the build story and the source.",
    links: [
      collection(
        "examples",
        "Playable starting points with source and build stories.",
      ),
      collection("threejsGames", "Browser games built with Three.js."),
      {
        path: pages.works.path,
        title: pages.works.title,
        blurb: "Games shared and rated by the community.",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    kicker: "Build",
    description: "Coding agents, engines and pipelines that ship games.",
    links: [
      collection(
        "resources",
        "Curated tools, engines, models and asset pipelines.",
      ),
      collection(
        "agents",
        "Agent skills, MCP bridges and runners for engines.",
      ),
      collection("testing", "Playtesting, QA automation and benchmarks."),
    ],
  },
  {
    id: "research",
    label: "Research",
    kicker: "Study",
    description: "The papers and repositories behind the craft.",
    links: [
      collection("papers", "Papers on game generation and world models."),
      collection("research", "Open-source game repositories, read closely."),
    ],
  },
  {
    id: "learn",
    label: "Learn",
    kicker: "Learn",
    description: "Guides and paths from a first idea to a released game.",
    links: [
      collection("docs", "Practical guides and field notes."),
      collection("paths", "Step-by-step paths from idea to release."),
    ],
  },
];
