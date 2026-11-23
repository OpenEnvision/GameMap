import { pages, type PageId } from "../../content/site";

/** One destination inside a pillar, with its canonical collection identity. */
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
        "Skills, bridges, frameworks, workflows, benchmarks and game code.",
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
    description: "Guides from a first idea to a released game.",
    links: [collection("docs", "Practical guides and field notes.")],
  },
];
