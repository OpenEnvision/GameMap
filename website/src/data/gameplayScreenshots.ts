import type { z } from "zod";
import type { gameplayMediaSchema } from "../../content/contracts";
import type { PageCover } from "./pageCovers";

export type GameplayMedia = z.infer<typeof gameplayMediaSchema>;
export type GameplayScreenshot = {
  media: GameplayMedia;
  archivedPageCover?: PageCover;
};

/** Database-owned media uses full kind:id keys; Git never exports selected business records. */
export const gameplayScreenshots: Record<string, GameplayScreenshot> = {};
