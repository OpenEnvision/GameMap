import { publicAsset } from "../publicAsset";
import type { Dimension } from "../types";
import type { z } from "zod";
import type { attachmentSchemas } from "../../content/contracts";
type CanonicalArtwork = z.infer<typeof attachmentSchemas.path>["editorial"];
/** Original Git artwork predates explicit per-image credit; the import preserves its documented credit. */
type EditorialInput = Omit<CanonicalArtwork, "credit"> & { credit?: string };
export const editorial: Record<Dimension, EditorialInput> = {
  "2d": {
    src: publicAsset("media/editorial/2d-world.jpg"),
    title: "2D games",
    description: "Turn pixels and ideas into play.",
    alt: "Original pixel art of a red-cloaked traveler exploring overgrown ruins and lanterns",
    index: "01",
  },
  "3d": {
    src: publicAsset("media/editorial/3d-world.jpg"),
    title: "3D games",
    description: "Build worlds with depth and interaction.",
    alt: "Original 3D concept art of an explorer and floating ruins at sunset",
    index: "02",
  },
  world: {
    src: publicAsset("media/editorial/code-world.jpg"),
    title: "Code worlds",
    description: "Let code hold state and models shape the view.",
    alt: "Original world model concept art of a futuristic city transitioning from wireframe to rendered imagery",
    index: "03",
  },
};
