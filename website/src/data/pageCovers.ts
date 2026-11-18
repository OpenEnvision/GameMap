import type { z } from "zod";
import type { anyPageCoverSchema } from "../../content/contracts";

/** Page captures are fallback covers, never gameplay or playability evidence. */
export type PageCover = z.infer<typeof anyPageCoverSchema>;

/** Database-owned media is imported explicitly; Git defaults do not copy remote records. */
export const pageCovers: Record<string, PageCover> = {};
