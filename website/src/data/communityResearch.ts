import type { PayloadModels } from "../../content/contracts";
import { browserPortCollections } from "./browserPortCollections";
import { approvedImportedCollections } from "./approvedImportedCollections";
// Discovery collections are entry points, not individually verified game cases.
export type CommunityCollection = PayloadModels["collection"];
export const communityCollections = [
  {
    id: "awesome-ai-built-games",
    title: "Awesome AI-Built Games",
    url: "https://github.com/lappemic/awesome-ai-built-games",
    description:
      "A broader community list across action, racing, adventure, strategy, puzzles, and arcade games. Source availability varies by project.",
  },
  {
    id: "open-source-ai-game-jam",
    title: "Open Source AI Game Jam",
    url: "https://itch.io/jam/open-source-ai-game-jam/entries",
    description:
      "Browse jam submissions using AI in code, assets, or gameplay. The jam name refers to AI tools; it does not guarantee every game publishes its source.",
  },
  {
    id: "claude-community-use-cases",
    title: "Claude community use cases",
    url: "https://github.com/coolbat/awesome-opus-5.5-usecase",
    description:
      "Discover creator demos and build accounts. This collection also includes films, tools, and experiments beyond games.",
  },
  ...browserPortCollections,
  ...approvedImportedCollections,
] as const satisfies readonly CommunityCollection[];
