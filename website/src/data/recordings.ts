import { publicAsset } from '../publicAsset';
import type { Recording } from '../../content/media';

/** One original asset, one or more explicitly identified presentations. */
export const recordings: Recording[] = [
  {
    "id": "opengame-portal",
    "resourceId": "opengame",
    "originalUrl": "https://yelonhu.github.io/OpenGame-landing-page/hero/marvel_1.mp4",
    "views": [
      {
        "id": "opengame-portal",
        "title": "OpenGame · Portal runner",
        "description": "Jump, fight, and move through a generated pixel platformer.",
        "role": "excerpt",
        "alt": "OpenGame · Portal runner — a frame from the official project recording",
        "track": "2d",
        "previewSrc": publicAsset("media/showcase/opengame-portal.mp4"),
        "poster": publicAsset("media/showcase/opengame-portal.webp"),
        "sourceUrl": "https://yelonhu.github.io/OpenGame-landing-page/",
        "credit": "OpenGame · CUHK MMLab"
      }
    ]
  },
  {
    "id": "opengame-skirmish",
    "resourceId": "opengame",
    "originalUrl": "https://raw.githubusercontent.com/yelonhu/OpenGame-landing-page/main/public/hero/starWars.mp4",
    "views": [
      {
        "id": "opengame-skirmish",
        "title": "OpenGame · Space-station skirmish",
        "description": "Move, aim, and dodge in a generated top-down action game.",
        "role": "excerpt",
        "alt": "OpenGame · Space-station skirmish — a frame from the official project recording",
        "track": "2d",
        "previewSrc": publicAsset("media/showcase/opengame-skirmish.mp4"),
        "poster": publicAsset("media/showcase/opengame-skirmish.webp"),
        "sourceUrl": "https://yelonhu.github.io/OpenGame-landing-page/",
        "credit": "OpenGame · CUHK MMLab"
      }
    ]
  },
  {
    "id": "gamefactory-ue5-combat",
    "resourceId": "gamefactory-3a",
    "originalUrl": "https://github.com/user-attachments/assets/810ced06-7c0e-4e74-a0f5-588c9cad8d1e",
    "views": [
      {
        "id": "gamefactory-ue5-combat",
        "title": "3AGameFactory · Courtyard combat",
        "description": "Close the distance, trade attacks, and watch health react in an Unreal Engine 5 game.",
        "role": "excerpt",
        "alt": "3AGameFactory · Courtyard combat — a frame from the official project recording",
        "track": "3d",
        "previewSrc": publicAsset("media/showcase/gamefactory-ue5-combat.mp4"),
        "poster": publicAsset("media/showcase/gamefactory-ue5-combat.webp"),
        "sourceUrl": "https://github.com/OpenDCAI/GameFactory-3A#ue5",
        "credit": "OpenDCAI · Unreal Engine 5 gameplay"
      }
    ]
  },
  {
    "id": "gamefactory-ue5-rpg",
    "resourceId": "gamefactory-3a",
    "originalUrl": "https://github.com/user-attachments/assets/8f90cc59-548a-4cd9-a3a8-7d8c4e2e412b",
    "views": [
      {
        "id": "gamefactory-ue5-rpg",
        "title": "3AGameFactory · Village quest",
        "description": "Run through a stylized village, collect treasure, and watch the quest progress.",
        "role": "excerpt",
        "alt": "3AGameFactory · Village quest — a frame from the official project recording",
        "track": "3d",
        "previewSrc": publicAsset("media/showcase/gamefactory-ue5-rpg.mp4"),
        "poster": publicAsset("media/showcase/gamefactory-ue5-rpg.webp"),
        "sourceUrl": "https://github.com/OpenDCAI/GameFactory-3A#ue5",
        "credit": "OpenDCAI · Unreal Engine 5 gameplay"
      }
    ]
  },
  {
    "id": "streamrender-car",
    "resourceId": "streamrender-h3",
    "originalUrl": "https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Sol-Engine/StreamRender-H3/blog-assets/engine-vs-render-single-car.mp4",
    "views": [
      {
        "id": "streamrender-car",
        "title": "StreamRender-H3 · Engine to neural render",
        "description": "Compare the engine input with its matching neural render, in sync.",
        "role": "excerpt",
        "alt": "StreamRender-H3 · Engine to neural render — a frame from the official project recording",
        "track": "world",
        "previewSrc": publicAsset("media/showcase/streamrender-car.mp4"),
        "poster": publicAsset("media/showcase/streamrender-car.webp"),
        "sourceUrl": "https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/",
        "credit": "NVIDIA Research · official input / output comparison",
        "aspectRatio": 3.5,
        "mobilePreview": {
          "src": publicAsset("media/showcase/streamrender-car-mobile.mp4"),
          "poster": publicAsset("media/showcase/streamrender-car-mobile.webp"),
          "aspectRatio": 0.8759124087591241
        }
      },
      {
        "id": "recording-streamrender-h3",
        "title": "StreamRender-H3 · Engine → neural render",
        "description": "An official synchronized comparison of engine output on the left and streaming neural rendering on the right. Both views are shown in full.",
        "role": "source-recording",
        "track": "world",
        "previewSrc": "https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Sol-Engine/StreamRender-H3/blog-assets/engine-vs-render-single-car.mp4",
        "poster": publicAsset("media/demos/streamrender-h3.webp"),
        "alt": "Official StreamRender-H3 car comparison: engine output on the left and diffusion rendering on the right",
        "sourceUrl": "https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/",
        "credit": "NVIDIA · StreamRender-H3"
      }
    ]
  },
  {
    "id": "solar-voxel",
    "resourceId": "solarrenderer",
    "originalUrl": "https://enderfga.cn/SolarRenderer/media/gallery/mat_voxel__westeros/render.mp4",
    "views": [
      {
        "id": "solar-voxel",
        "title": "SolarRenderer · Voxel world, reimagined",
        "description": "A simple voxel scene becomes a richly styled, moving world.",
        "role": "excerpt",
        "alt": "SolarRenderer · Voxel world, reimagined — a frame from the official project recording",
        "track": "world",
        "previewSrc": publicAsset("media/showcase/solar-voxel.mp4"),
        "poster": publicAsset("media/showcase/solar-voxel.webp"),
        "sourceUrl": "https://enderfga.cn/SolarRenderer/",
        "credit": "SolarRenderer authors · official model output"
      }
    ]
  },
  {
    "id": "recording-solarrenderer",
    "resourceId": "solarrenderer",
    "originalUrl": "https://enderfga.cn/SolarRenderer/media/film/solarrenderer-film.mp4",
    "views": [
      {
        "id": "recording-solarrenderer",
        "title": "SolarRenderer · Official film",
        "description": "Preview the official cyberpunk street scene, then watch the full film for more examples of structural control and generative rendering.",
        "role": "source-recording",
        "track": "world",
        "previewSrc": "https://enderfga.cn/SolarRenderer/media/hero/oasis-street__cyberpunk.mp4",
        "poster": publicAsset("media/demos/solarrenderer.webp"),
        "alt": "Official SolarRenderer cyberpunk render showing pedestrians on a rainy neon-lit street",
        "sourceUrl": "https://enderfga.cn/SolarRenderer/",
        "credit": "SolarRenderer authors · official model output",
        "alternatePreviewUrl": "https://enderfga.cn/SolarRenderer/media/gallery/oasis-street__cyberpunk/render.mp4"
      }
    ]
  },
  {
    "id": "recording-opengame",
    "resourceId": "opengame",
    "originalUrl": "https://yelonhu.github.io/OpenGame-landing-page/demos/hajimi.mp4",
    "views": [
      {
        "id": "recording-opengame",
        "title": "OpenGame · Hajimi Defense: The Tuna Crisis",
        "description": "An official OpenGame demo showing a generated pixel game in action.",
        "role": "source-recording",
        "track": "2d",
        "previewSrc": "https://yelonhu.github.io/OpenGame-landing-page/demos/hajimi.mp4",
        "poster": publicAsset("media/demos/opengame.webp"),
        "alt": "Official OpenGame poster for the pixel game Hajimi Defense: The Tuna Crisis",
        "sourceUrl": "https://yelonhu.github.io/OpenGame-landing-page/#demo",
        "credit": "OpenGame · CUHK MMLab"
      }
    ]
  },
  {
    "id": "recording-trellis",
    "resourceId": "trellis",
    "originalUrl": "https://microsoft.github.io/TRELLIS/assets/teaser.mp4",
    "views": [
      {
        "id": "recording-trellis",
        "title": "TRELLIS · 3D asset generation",
        "description": "An official Microsoft Research showcase of generated 3D assets. Project materials are presented for academic and research use.",
        "role": "source-recording",
        "track": "3d",
        "previewSrc": "https://microsoft.github.io/TRELLIS/assets/teaser.mp4",
        "poster": publicAsset("media/demos/trellis.webp"),
        "alt": "Official Microsoft TRELLIS teaser showing a collection of generated 3D assets",
        "sourceUrl": "https://microsoft.github.io/TRELLIS/",
        "credit": "TRELLIS · Microsoft Research"
      }
    ]
  },
  {
    "id": "recording-infinigen",
    "resourceId": "infinigen",
    "originalUrl": "https://infinigen.org/img/random_sample_articulated.mp4",
    "views": [
      {
        "id": "recording-infinigen",
        "title": "Infinigen · Articulated assets",
        "description": "An official showcase of articulated assets created through procedural generation.",
        "role": "source-recording",
        "track": "3d",
        "previewSrc": "https://infinigen.org/img/random_sample_articulated.mp4",
        "poster": publicAsset("media/demos/infinigen.webp"),
        "alt": "Official Infinigen samples of procedurally generated forests, underwater scenes, deserts, and mountains",
        "sourceUrl": "https://infinigen.org/",
        "credit": "Infinigen · Princeton Vision & Learning Lab"
      }
    ]
  },
  {
    "id": "recording-holodeck",
    "resourceId": "holodeck",
    "originalUrl": "https://yueyang.ai/holodeck/static/videos/a_bohemian_style_living_room_w%7C1%7C0%7Csunny_vondelpark_4k%7C1.0%7C50.0%7C360%7C16%7C30%7C10%7CCYCLES_video_compressed.mp4",
    "views": [
      {
        "id": "recording-holodeck",
        "title": "Holodeck · A room from a prompt",
        "description": "An author-published tour of a generated bohemian living room.",
        "role": "source-recording",
        "track": "3d",
        "previewSrc": publicAsset("media/showcase/holodeck-living.mp4"),
        "poster": publicAsset("media/showcase/holodeck-living.webp"),
        "alt": "A frame from the official Holodeck recording of a generated bohemian living room",
        "sourceUrl": "https://yueyang.ai/holodeck/",
        "credit": "Holodeck authors · generated bohemian living room"
      }
    ]
  }
];
