import type { ContentModels } from "./models";
import approvedPapers from "../../data/segments/approved-papers.json";
import approvedThreejsGames from "../../data/segments/approved-threejs-games.json";

// Approved database records exported deterministically for static GitHub Pages builds.
export const papers = approvedPapers as unknown as ContentModels["paper"][];
export const threejsGames =
  approvedThreejsGames as unknown as ContentModels["threejs-game"][];
