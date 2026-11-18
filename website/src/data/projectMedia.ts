import { publicAsset } from "../publicAsset";
import type { z } from "zod";
import type { projectImageSchema } from "../../content/contracts";
/**
 * Author-published project media, kept separate from GameMap editorial artwork.
 * `source` opens the original project page, not a generic image search.
 * Original file URLs and reuse notes: docs/reference/media-sources.md.
 */
export const projectMedia: Record<
  string,
  z.infer<typeof projectImageSchema>
> = {
  opengame: {
    src: publicAsset("media/demos/opengame.webp"),
    alt: "Official OpenGame poster for the pixel game Hajimi Defense: The Tuna Crisis",
    source: "https://github.com/leigest519/OpenGame#playable-demos",
    credit: "OpenGame · CUHK MMLab",
    kind: "official-demo",
  },
  mariogpt: {
    src: publicAsset("media/demos/mariogpt.webp"),
    alt: "First frame of the official MarioGPT interactive demo, showing a Mario-style platform level",
    source: "https://github.com/shyamsn97/mario-gpt",
    credit: "MarioGPT authors · official demo still",
    kind: "official-demo",
  },
  "hunyuan3d-2": {
    src: publicAsset("media/demos/hunyuan3d-2.webp"),
    alt: "Official Tencent Hunyuan3D 2.0 generation results showing cartoon character assets on a pink background",
    source:
      "https://github.com/Tencent-Hunyuan/Hunyuan3D-2#%EF%B8%8F-hunyuan3d-20",
    credit: "Tencent Hunyuan · Hunyuan3D 2.0",
    kind: "official-demo",
  },
  trellis: {
    src: publicAsset("media/demos/trellis.webp"),
    alt: "Official Microsoft TRELLIS teaser showing a collection of generated 3D assets",
    source: "https://microsoft.github.io/TRELLIS/",
    credit: "TRELLIS · Microsoft Research",
    kind: "official-demo",
  },
  infinigen: {
    src: publicAsset("media/demos/infinigen.webp"),
    alt: "Official Infinigen samples of procedurally generated forests, underwater scenes, deserts, and mountains",
    source: "https://infinigen.org/",
    credit: "Infinigen · Princeton Vision & Learning Lab",
    kind: "official-demo",
  },
  holodeck: {
    src: publicAsset("media/showcase/holodeck-living.webp"),
    alt: "A frame from the official Holodeck recording of a generated bohemian living room",
    source: "https://yueyang.ai/holodeck/",
    credit: "Holodeck authors · generated bohemian living room",
    kind: "official-demo",
  },
  solarrenderer: {
    src: publicAsset("media/demos/solarrenderer.webp"),
    alt: "Official SolarRenderer cyberpunk render showing pedestrians on a rainy neon-lit street",
    source: "https://enderfga.cn/SolarRenderer/",
    credit: "SolarRenderer authors · model output",
    kind: "official-demo",
  },
  "streamrender-h3": {
    src: publicAsset("media/demos/streamrender-h3.webp"),
    alt: "Official StreamRender-H3 car comparison: engine output on the left and diffusion rendering on the right",
    source: "https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/",
    credit: "NVIDIA · StreamRender-H3",
    kind: "official-demo",
  },
  gamengen: {
    src: publicAsset("media/demos/gamengen.webp"),
    alt: "Official GameNGen method figure showing model training to predict the next frame from prior game frames and actions",
    source: "https://gamengen.github.io/",
    credit: "GameNGen authors · method figure",
    kind: "official-demo",
  },
};
