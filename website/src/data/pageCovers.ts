import type { z } from "zod";
import type { anyPageCoverSchema } from "../../content/contracts";
import approvedThreejsPageCovers from "../../../data/segments/approved-threejs-page-covers.json";

/** Page captures are fallback covers, never gameplay or playability evidence. */
export type PageCover = z.infer<typeof anyPageCoverSchema>;

/** Explicitly exported approved fallback page-cover attachments for static builds. */
export const pageCovers = approvedThreejsPageCovers as unknown as Record<
  string,
  PageCover
>;
