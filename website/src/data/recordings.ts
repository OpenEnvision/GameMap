import { publicAsset } from '../publicAsset';
import type { Recording } from '../../content/media';

/** One original asset, one or more explicitly identified presentations. */
export const recordings: Recording[] = [
  {
    "id": "recording-moonlight-mayhem",
    "resourceId": "codex",
    "originalUrl": "https://static.simonwillison.net/static/2026/raccoon-heist-codex-720p.mp4",
    "views": [
      {
        "id": "recording-moonlight-mayhem",
        "title": "Moonlight & Mayhem · Museum heist",
        "description": "Rescue a raccoon crewmate while avoiding a moving security patrol in a Three.js museum.",
        "track": "3d",
        "engine": "Three.js · JavaScript",
        "exampleId": "moonlight-mayhem-codex",
        "limitations": "Eight seconds from the creator’s 57.9-second gameplay recording (5–13s), showing museum movement, security detection, and a crew rescue. This preview does not verify the full heist or later progression.",
        "credit": "Simon Willison · Moonlight & Mayhem",
        "sourceUrl": "https://simonwillison.net/2026/Aug/7/moonlight-mayhem/",
        "role": "excerpt",
        "demoType": "gameplay",
        "alt": "Rescue a raccoon crewmate while avoiding a moving security patrol in a Three.js museum. — a real frame from the author recording",
        "previewSrc": publicAsset("assets/media/showcase/recording-moonlight-mayhem.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-moonlight-mayhem.webp"),
        "aspectRatio": 1.7777777777777777
      }
    ]
  },
  {
    "id": "recording-agent-arcade-galaxy",
    "resourceId": "phaser",
    "originalUrl": "https://raw.githubusercontent.com/DanWahlin/agent-arcade/59a4848187d3219770216acc9253a9e13143eac3/docs/images/agent-arcade-galaxy.mp4",
    "views": [
      {
        "id": "recording-agent-arcade-galaxy",
        "title": "Agent Arcade · Galaxy Blaster",
        "description": "A Phaser space shooter plays in a transparent desktop overlay above an editor.",
        "track": "2d",
        "engine": "Phaser · TypeScript / Tauri",
        "exampleId": "agent-arcade-copilot",
        "limitations": "Approximately eight seconds from the creator’s 11.07-second Galaxy recording (1–9s). The complete desktop frame is preserved, including the editor behind the transparent game; only this minigame is shown. The visible terminal is context, not proof of which agent authored each revision.",
        "credit": "Dan Wahlin · Agent Arcade",
        "sourceUrl": "https://github.com/DanWahlin/agent-arcade/tree/59a4848187d3219770216acc9253a9e13143eac3/docs/images",
        "role": "excerpt",
        "demoType": "gameplay",
        "alt": "A Phaser space shooter plays in a transparent desktop overlay above an editor. — a real frame from the author recording",
        "previewSrc": publicAsset("assets/media/showcase/recording-agent-arcade-galaxy.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-agent-arcade-galaxy.webp"),
        "aspectRatio": 1.7777777777777777
      }
    ]
  },
  {
    "id": "recording-cwm-brain-cloud-harbor",
    "resourceId": "code-world-model-brain",
    "originalUrl": "https://huggingface.co/datasets/NTU-yiwen/code-world-model-project-page-videos/resolve/main/gallery_final/rgb/002.mp4",
    "views": [
      {
        "title": "Code World Model · Cloud-sea harbor",
        "description": "An official recording of a wind-skiff navigating a cloud-sea harbor, with movement controls visible.",
        "track": "world",
        "demoType": "world-model",
        "limitations": "Recorded research output: program state drives a proxy-conditioned video renderer. This preview is a video, not an interactive browser game. The public release omits the closed-source game foundation and proxy-generation tools.",
        "alt": "Official Code World Model recording of a wind-skiff moving through a painted cloud-sea harbor, with WASD and action controls visible",
        "credit": "Code World Model · Yiwen Chen, Guosheng Lin, Chi Zhang",
        "id": "recording-cwm-brain-cloud-harbor",
        "role": "source-recording",
        "previewSrc": "https://huggingface.co/datasets/NTU-yiwen/code-world-model-project-page-videos/resolve/main/gallery_final/rgb/002.mp4",
        "poster": publicAsset("assets/media/demos/recording-cwm-brain-cloud-harbor.webp"),
        "sourceUrl": "https://buaacyw.github.io/cwm/",
        "aspectRatio": 1.75
      }
    ]
  },
  {
    "id": "recording-castle-clash",
    "resourceId": "phaser",
    "originalUrl": "https://raw.githubusercontent.com/chongdashu/phaserjs-tinyswords/f59f1dca8bf461227c9b5d856764e1e90d8b8e90/docs/preview.gif",
    "views": [
      {
        "id": "recording-castle-clash",
        "title": "Castle Clash · Prototype battle",
        "description": "Recruit a squad and send animated Tiny Swords units toward the opposing castle.",
        "track": "2d",
        "engine": "Phaser 3 · JavaScript",
        "exampleId": "castle-clash-duel-claude",
        "limitations": "Eight seconds (4–12s) from the repository’s 23-second preview GIF, retaining its original frame timing. It shows the published Castle Clash prototype’s recruitment and marching units, rather than proving every rule or the current Duel version. The source GIF is an animated recording, not a full video release.",
        "credit": "chongdashu · Castle Clash; Tiny Swords artwork by Pixel Frog",
        "sourceUrl": "https://github.com/chongdashu/phaserjs-tinyswords/blob/f59f1dca8bf461227c9b5d856764e1e90d8b8e90/README.md",
        "role": "excerpt",
        "demoType": "gameplay",
        "alt": "Recruit a squad and send animated Tiny Swords units toward the opposing castle. — a real frame from the author recording",
        "previewSrc": publicAsset("assets/media/showcase/recording-castle-clash.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-castle-clash.webp"),
        "aspectRatio": 1.7777777777777777
      }
    ]
  },
  {
    "id": "recording-raccoon-heist",
    "resourceId": "claude-code",
    "originalUrl": "https://static.simonwillison.net/static/2026/raccoon-heist-720p.mp4",
    "views": [
      {
        "id": "recording-raccoon-heist",
        "title": "Raccoon Heist · Loot after dark",
        "description": "Collect loot under sweeping flashlight patrols in a Claude-built Three.js backyard caper.",
        "track": "3d",
        "engine": "Three.js · JavaScript",
        "exampleId": "raccoon-heist-claude",
        "limitations": "Eight seconds from the creator’s 58.134-second gameplay recording (3–11s), showing movement and loot pickup during night 6. It is an implementation demonstration; the author also reports shallow gameplay and does not claim a polished release.",
        "credit": "Simon Willison · Raccoon Heist",
        "sourceUrl": "https://simonwillison.net/2026/Aug/5/raccoon-heist/",
        "role": "excerpt",
        "demoType": "gameplay",
        "alt": "Collect loot under sweeping flashlight patrols in a Claude-built Three.js backyard caper. — a real frame from the author recording",
        "previewSrc": publicAsset("assets/media/showcase/recording-raccoon-heist.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-raccoon-heist.webp"),
        "aspectRatio": 1.7777777777777777
      }
    ]
  },
  {
    "id": "recording-marble-blue-diner",
    "resourceId": "marble",
    "originalUrl": "https://wlt-ai-cdn.art/videos/2025-11-12-clean-720p-24crf/t2w-blue-diner.mp4",
    "views": [
      {
        "title": "Marble · A blue diner in 3D",
        "description": "World Labs tours a generated blue diner, showing a persistent 3D interior created from a text prompt.",
        "track": "3d",
        "demoType": "scenes",
        "limitations": "An official scene flythrough, not a complete game or evidence of authored gameplay systems. Product generation and export have account and plan requirements; collider mesh and high-quality textured GLB export are separate features.",
        "alt": "Official World Labs Marble flythrough of a blue-lit diner with booths, a counter, ceiling fixtures and a checkerboard floor",
        "credit": "World Labs · Marble",
        "id": "recording-marble-blue-diner",
        "role": "source-recording",
        "previewSrc": "https://wlt-ai-cdn.art/videos/2025-11-12-clean-720p-24crf/t2w-blue-diner.mp4",
        "poster": publicAsset("assets/media/demos/recording-marble-blue-diner.webp"),
        "sourceUrl": "https://www.worldlabs.ai/blog/marble-world-model",
        "aspectRatio": 1.7777777777777777
      }
    ]
  },
  {
    "id": "recording-pokemon-tactics",
    "resourceId": "claude-code",
    "originalUrl": "https://raw.githubusercontent.com/kekel87/pokemon-tactics/c9bced18f18b1a5c37e8828b68f1cedf902dbd54/docs/images/demo.gif",
    "views": [
      {
        "id": "recording-pokemon-tactics",
        "title": "Pokemon Tactics · Isometric battle",
        "description": "Position a team and target attacks across a 2D-HD tactical battlefield rendered with Babylon.js.",
        "track": "3d",
        "engine": "Babylon.js 8 · TypeScript",
        "exampleId": "pokemon-tactics-claude",
        "limitations": "Eight seconds (24–32s) of the author’s 32.13-second tactical-battle GIF, preserving the complete low-resolution 360×203 source frame and original GIF timing. This shows battle targeting and resolution only, not a finished campaign. Noncommercial fan project.",
        "credit": "Michael Parry (kekel87) · Pokemon Tactics; PMDCollab / original artists",
        "sourceUrl": "https://github.com/kekel87/pokemon-tactics/blob/c9bced18f18b1a5c37e8828b68f1cedf902dbd54/README.md",
        "role": "excerpt",
        "demoType": "gameplay",
        "alt": "Position a team and target attacks across a 2D-HD tactical battlefield rendered with Babylon.js. — a real frame from the author recording",
        "previewSrc": publicAsset("assets/media/showcase/recording-pokemon-tactics.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-pokemon-tactics.webp"),
        "aspectRatio": 1.7821782178217822
      }
    ]
  },
  {
    "id": "recording-sakura-crossing",
    "resourceId": "threejs",
    "originalUrl": "https://raw.githubusercontent.com/danymaniglie-cmyk/3d-sakura-crossing/2e7b62361f2a22999185be8f899693ebdfb8bbf6/docs/anteprima.gif",
    "views": [
      {
        "id": "recording-sakura-crossing",
        "title": "Sakura Crossing · A walkable neighbourhood",
        "description": "Walk beside an animated railway crossing in a cel-shaded Japanese neighbourhood generated with a local Qwen model.",
        "track": "3d",
        "engine": "Three.js r128 · JavaScript",
        "exampleId": "sakura-crossing-qwen",
        "limitations": "The complete eight-second author GIF, converted with original frame timing. It demonstrates walking, a nearby resident, and a passing train. This is an interactive exploration prototype, not evidence of a complete campaign or win/loss loop. Source is 560×373; H264 output is 560×372 to use even dimensions with no scene cropping.",
        "credit": "danymaniglie-cmyk · Sakura Crossing",
        "sourceUrl": "https://github.com/danymaniglie-cmyk/3d-sakura-crossing/blob/2e7b62361f2a22999185be8f899693ebdfb8bbf6/README.md",
        "role": "source-recording",
        "demoType": "gameplay",
        "alt": "Walk beside an animated railway crossing in a cel-shaded Japanese neighbourhood generated with a local Qwen model. — a real frame from the author recording",
        "previewSrc": publicAsset("assets/media/showcase/recording-sakura-crossing.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-sakura-crossing.webp"),
        "aspectRatio": 1.5053763440860215
      }
    ]
  },
  {
    "id": "recording-video2game-garden",
    "resourceId": "video2game",
    "originalUrl": "https://video2game.github.io/src/video2game/demo/garden_shoot1.mp4",
    "views": [
      {
        "title": "Video2Game · Interacting in a reconstructed garden",
        "description": "An official browser recording shows movement and a ball-shooting interaction in a garden reconstructed from video.",
        "track": "3d",
        "demoType": "scenes",
        "limitations": "A recorded research demo of a reconstructed scene with added rigid-body interactions. It does not demonstrate that arbitrary input videos become complete games without additional reconstruction, collider setup and gameplay integration.",
        "alt": "Official Video2Game browser recording showing a block character in a reconstructed garden, a vase on a table, control instructions and score",
        "credit": "Video2Game · Hongchi Xia, Zhi-Hao Lin, Wei-Chiu Ma, Shenlong Wang",
        "engine": "Three.js · WebGL",
        "id": "recording-video2game-garden",
        "role": "source-recording",
        "previewSrc": "https://video2game.github.io/src/video2game/demo/garden_shoot1.mp4",
        "poster": publicAsset("assets/media/demos/recording-video2game-garden.webp"),
        "sourceUrl": "https://video2game.github.io/",
        "aspectRatio": 1.507462686567164
      }
    ]
  },
  {
    "id": "recording-wonderworld-cathedral",
    "resourceId": "wonderworld",
    "originalUrl": "https://kovenyu.com/wonderworld/interactive_converted_60fps_trimmed_cropped/cathedral_2_interactive_compressed_60fps_trimmed_cropped.mp4",
    "views": [
      {
        "title": "WonderWorld · Extending a cathedral scene",
        "description": "The official split view shows a cathedral scene expanding as the user chooses new content and a camera direction.",
        "track": "world",
        "demoType": "scenes",
        "limitations": "An accelerated recording of interactive scene generation, not a complete playable game or a browser model inference session. The separate project-page viewer renders pregenerated worlds; it was not loaded in this check.",
        "alt": "Official WonderWorld split-screen recording showing a cathedral first-person view and an expanding 3D scene overview",
        "credit": "WonderWorld · Hong-Xing Yu, Haoyi Duan, Charles Herrmann, William T. Freeman, Jiajun Wu",
        "id": "recording-wonderworld-cathedral",
        "role": "source-recording",
        "previewSrc": "https://kovenyu.com/wonderworld/interactive_converted_60fps_trimmed_cropped/cathedral_2_interactive_compressed_60fps_trimmed_cropped.mp4",
        "poster": publicAsset("assets/media/demos/recording-wonderworld-cathedral.webp"),
        "sourceUrl": "https://kovenyu.com/wonderworld/",
        "aspectRatio": 2.5945945945945947
      }
    ]
  },
  {
    "id": "recording-genie3-jetski",
    "resourceId": "genie-3",
    "originalUrl": "https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/genie_modelling_physical_properties_2_Qvyu3BP.mp4",
    "views": [
      {
        "title": "Genie 3 · Festival-of-lights jetski",
        "description": "Google DeepMind records a controllable jetski world at night, with directional inputs shown over the generated water and lanterns.",
        "track": "world",
        "demoType": "world-model",
        "limitations": "An official recording of model interaction, not a live model running in this page or an exported game project. The separate Project Genie prototype currently requires an eligible personal Google AI Ultra account, age 18+, and limits exploration to 60 seconds.",
        "alt": "Official Genie 3 recording showing a first-person jetski, festival lanterns over water, and directional control inputs",
        "credit": "Google DeepMind · Genie 3",
        "id": "recording-genie3-jetski",
        "role": "source-recording",
        "previewSrc": "https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/genie_modelling_physical_properties_2_Qvyu3BP.mp4",
        "poster": publicAsset("assets/media/demos/recording-genie3-jetski.webp"),
        "sourceUrl": "https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/",
        "aspectRatio": 1.8181818181818181
      }
    ]
  },
  {
    "id": "recording-diamond-csgo",
    "resourceId": "diamond",
    "originalUrl": "https://diamond-wm.github.io/static/videos/8.mp4",
    "views": [
      {
        "title": "DIAMOND · A diffusion model of CS:GO",
        "description": "An author-recorded keyboard-and-mouse session inside a diffusion world model trained on CS:GO footage.",
        "track": "world",
        "demoType": "world-model",
        "limitations": "This is neural prediction of game frames, not the CS:GO engine or a complete source game. The original recording is 280×150 pixels and visibly soft. Public local world-model play requires the released code, checkpoints, and suitable hardware.",
        "alt": "Official low-resolution DIAMOND CS:GO world-model recording showing a first-person weapon and a stone courtyard",
        "credit": "DIAMOND · Eloi Alonso and collaborators",
        "id": "recording-diamond-csgo",
        "role": "source-recording",
        "previewSrc": "https://diamond-wm.github.io/static/videos/8.mp4",
        "poster": publicAsset("assets/media/demos/recording-diamond-csgo.webp"),
        "sourceUrl": "https://diamond-wm.github.io/",
        "aspectRatio": 1.8666666666666667
      }
    ]
  },
  {
    "id": "recording-autoue-workflow",
    "resourceId": "autoue",
    "originalUrl": "https://raw.githubusercontent.com/Pluto156/AutoUE/main/assets/show.mp4",
    "views": [
      {
        "title": "AutoUE · Unreal Engine generation workflow",
        "description": "The official demonstration follows an automated generation workflow inside the Unreal Engine editor.",
        "track": "3d",
        "demoType": "workflow",
        "limitations": "An author-published workflow recording, not a playable browser build. Reproducing generation requires Unreal Engine integration, assets and external LLM services; this playback check does not run the generator or verify each generated game.",
        "alt": "Official AutoUE video showing the Unreal Engine editor, level viewport, outliner and generated scene objects",
        "credit": "AutoUE · Pluto156 / AutoUE authors",
        "engine": "Unreal Engine",
        "id": "recording-autoue-workflow",
        "role": "source-recording",
        "previewSrc": "https://raw.githubusercontent.com/Pluto156/AutoUE/main/assets/show.mp4",
        "poster": publicAsset("assets/media/demos/recording-autoue-workflow.webp"),
        "sourceUrl": "https://github.com/Pluto156/AutoUE",
        "aspectRatio": 1.6777777777777778
      }
    ]
  },
  {
    "id": "recording-sprite-forge",
    "resourceId": "agent-sprite-forge",
    "originalUrl": "https://raw.githubusercontent.com/0x0funky/agent-sprite-forge/HEAD/src/video2dsprite-ryo/intro.mp4",
    "views": [
      {
        "title": "Agent Sprite Forge · Earlier 0.3 sprite workflow",
        "description": "An earlier 0.3 introduction shows the Ryo workflow from a still image through video animation to a keyed sprite strip.",
        "track": "2d",
        "demoType": "workflow",
        "limitations": "This short video documents the earlier 0.3 Ryo workflow, not the current 0.4 pipeline or a playable game. Asset generation, keying and packaging still require the relevant model routes, tools and human review.",
        "alt": "A real frame from the earlier Sprite Forge intro showing its generated Ryo character on a magenta keying background",
        "credit": "Agent Sprite Forge · 0x0funky",
        "id": "recording-sprite-forge",
        "role": "source-recording",
        "previewSrc": "https://raw.githubusercontent.com/0x0funky/agent-sprite-forge/HEAD/src/video2dsprite-ryo/intro.mp4",
        "poster": publicAsset("assets/media/demos/recording-sprite-forge.webp"),
        "sourceUrl": "https://github.com/0x0funky/agent-sprite-forge",
        "aspectRatio": 1.7777777777777777
      }
    ]
  },
  {
    "id": "recording-hunyuan3d-assets",
    "resourceId": "hunyuan3d-2",
    "originalUrl": "https://raw.githubusercontent.com/Tencent-Hunyuan/Hunyuan3D-2/main/assets/images/e2e-1.gif",
    "views": [
      {
        "id": "recording-hunyuan3d-assets",
        "title": "Hunyuan3D 2.0 · Generated textured assets",
        "description": "Author-published rotating examples of textured 3D characters produced with Hunyuan3D 2.0’s shape-and-texture pipeline.",
        "role": "source-recording",
        "demoType": "assets",
        "track": "3d",
        "previewSrc": publicAsset("assets/media/showcase/recording-hunyuan3d-assets.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-hunyuan3d-assets.webp"),
        "alt": "Two generated textured 3D characters on a pink ground, preserved from the official Hunyuan3D 2.0 animation.",
        "sourceUrl": "https://github.com/Tencent-Hunyuan/Hunyuan3D-2#performance",
        "credit": "Tencent Hunyuan3D authors · official generation results",
        "aspectRatio": 2.2641509433962264,
        "limitations": "An official asset-generation results animation, not gameplay or a running game scene. The original animated GIF is converted with its own frame timing; generation was not reproduced and game-ready topology, rigging, collision and runtime performance were not tested."
      }
    ]
  },
  {
    "id": "recording-triposr-assets",
    "resourceId": "triposr",
    "originalUrl": "https://raw.githubusercontent.com/VAST-AI-Research/TripoSR/main/figures/teaser800.gif",
    "views": [
      {
        "id": "recording-triposr-assets",
        "title": "TripoSR · Single-image 3D reconstruction",
        "description": "Compare five input images with the rotating reconstructed 3D objects in the official TripoSR teaser. The complete input and output rows remain visible.",
        "role": "source-recording",
        "demoType": "assets",
        "track": "3d",
        "previewSrc": publicAsset("assets/media/showcase/recording-triposr-assets.mp4"),
        "poster": publicAsset("assets/media/showcase/recording-triposr-assets.webp"),
        "alt": "The complete official TripoSR comparison, with five input images above their rotating reconstructed 3D objects.",
        "sourceUrl": "https://github.com/VAST-AI-Research/TripoSR",
        "credit": "Tripo AI × Stability AI · official reconstruction teaser",
        "aspectRatio": 1.509433962264151,
        "limitations": "An author-produced single-image reconstruction teaser, not a playable scene. Its animation timing does not measure inference latency. Reconstruction was not run locally, and game-ready topology, rigging and runtime performance were not tested."
      }
    ]
  },
  {
    "id": "recording-solarwm-overview",
    "resourceId": "solarwm",
    "originalUrl": "https://media.githubusercontent.com/media/Junchao-cs/SolarWM-Web/main/assets/demo.mp4?v=f434755",
    "views": [
      {
        "title": "SolarWM · Camera-controlled worlds",
        "description": "The official overview shows camera-controlled movement across generated snowy villages, landscapes, ruins, and other worlds.",
        "track": "world",
        "demoType": "world-model",
        "limitations": "A recorded world-model overview, not an interactive browser game. Some sequences are sped up, as stated in the video. The preview does not establish editable geometry, persistent entity rules, or gameplay logic.",
        "alt": "Official SolarWM overview title over a grid of generated environments with movement controls",
        "credit": "SolarWM · Junchao Huang, Guian Fang and collaborators",
        "id": "recording-solarwm-overview",
        "role": "source-recording",
        "previewSrc": "https://media.githubusercontent.com/media/Junchao-cs/SolarWM-Web/main/assets/demo.mp4?v=f434755",
        "poster": publicAsset("assets/media/demos/recording-solarwm-overview.webp"),
        "sourceUrl": "https://junchao-cs.github.io/SolarWM-Web/",
        "aspectRatio": 1.7777777777777777
      }
    ]
  },
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
        "previewSrc": publicAsset("assets/media/showcase/opengame-portal.mp4"),
        "poster": publicAsset("assets/media/showcase/opengame-portal.webp"),
        "sourceUrl": "https://yelonhu.github.io/OpenGame-landing-page/",
        "credit": "OpenGame · CUHK MMLab",
        "demoType": "gameplay",
        "limitations": "A recorded platformer excerpt; use the linked game case for playable builds and source.",
        "engine": "Phaser 3",
        "exampleId": "opengame-marvel-platformer"
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
        "previewSrc": publicAsset("assets/media/showcase/opengame-skirmish.mp4"),
        "poster": publicAsset("assets/media/showcase/opengame-skirmish.webp"),
        "sourceUrl": "https://yelonhu.github.io/OpenGame-landing-page/",
        "credit": "OpenGame · CUHK MMLab",
        "demoType": "gameplay",
        "limitations": "A recorded action-game excerpt; use the linked game case for playable builds and source.",
        "engine": "Phaser 3",
        "exampleId": "opengame-mandalorian-shooter"
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
        "previewSrc": publicAsset("assets/media/showcase/gamefactory-ue5-combat.mp4"),
        "poster": publicAsset("assets/media/showcase/gamefactory-ue5-combat.webp"),
        "sourceUrl": "https://github.com/OpenDCAI/GameFactory-3A#ue5",
        "credit": "OpenDCAI · Unreal Engine 5 gameplay",
        "demoType": "gameplay",
        "limitations": "An official UE5 combat excerpt, rather than a game running in the browser.",
        "engine": "Unreal Engine 5"
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
        "previewSrc": publicAsset("assets/media/showcase/gamefactory-ue5-rpg.mp4"),
        "poster": publicAsset("assets/media/showcase/gamefactory-ue5-rpg.webp"),
        "sourceUrl": "https://github.com/OpenDCAI/GameFactory-3A#ue5",
        "credit": "OpenDCAI · Unreal Engine 5 gameplay",
        "demoType": "gameplay",
        "limitations": "An official UE5 quest excerpt, rather than a game running in the browser.",
        "engine": "Unreal Engine 5"
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
        "previewSrc": publicAsset("assets/media/showcase/streamrender-car.mp4"),
        "poster": publicAsset("assets/media/showcase/streamrender-car.webp"),
        "sourceUrl": "https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/",
        "credit": "NVIDIA Research · official input / output comparison",
        "aspectRatio": 3.5,
        "mobilePreview": {
          "src": publicAsset("assets/media/showcase/streamrender-car-mobile.mp4"),
          "poster": publicAsset("assets/media/showcase/streamrender-car-mobile.webp"),
          "aspectRatio": 0.8759124087591241
        },
        "demoType": "world-model",
        "limitations": "An engine-input and neural-render comparison. Both panels are preserved; this is recorded output."
      },
      {
        "id": "recording-streamrender-h3",
        "title": "StreamRender-H3 · Engine → neural render",
        "description": "An official synchronized comparison of engine output on the left and streaming neural rendering on the right. Both views are shown in full.",
        "role": "source-recording",
        "track": "world",
        "previewSrc": "https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Sol-Engine/StreamRender-H3/blog-assets/engine-vs-render-single-car.mp4",
        "poster": publicAsset("assets/media/demos/streamrender-h3.webp"),
        "alt": "Official StreamRender-H3 car comparison: engine output on the left and diffusion rendering on the right",
        "sourceUrl": "https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/",
        "credit": "NVIDIA · StreamRender-H3",
        "demoType": "world-model",
        "limitations": "The original engine-input and neural-render comparison; it shares one source recording with the curated preview."
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
        "previewSrc": publicAsset("assets/media/showcase/solar-voxel.mp4"),
        "poster": publicAsset("assets/media/showcase/solar-voxel.webp"),
        "sourceUrl": "https://enderfga.cn/SolarRenderer/",
        "credit": "SolarRenderer authors · official model output",
        "demoType": "world-model",
        "limitations": "A recorded structure-conditioned neural-rendering example, not an exported editable game."
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
        "poster": publicAsset("assets/media/demos/solarrenderer.webp"),
        "alt": "Official SolarRenderer cyberpunk render showing pedestrians on a rainy neon-lit street",
        "sourceUrl": "https://enderfga.cn/SolarRenderer/",
        "credit": "SolarRenderer authors · official model output",
        "alternatePreviewUrl": "https://enderfga.cn/SolarRenderer/media/gallery/oasis-street__cyberpunk/render.mp4",
        "demoType": "world-model",
        "limitations": "A recorded research overview. The preview and full film cover generated rendering, not a complete playable game."
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
        "poster": publicAsset("assets/media/demos/opengame.webp"),
        "alt": "Official OpenGame poster for the pixel game Hajimi Defense: The Tuna Crisis",
        "sourceUrl": "https://yelonhu.github.io/OpenGame-landing-page/#demo",
        "credit": "OpenGame · CUHK MMLab",
        "demoType": "gameplay",
        "limitations": "An author-recorded tower-defense session; this page plays the recording, not the game.",
        "engine": "Phaser 3",
        "exampleId": "opengame-tower-defense"
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
        "poster": publicAsset("assets/media/demos/trellis.webp"),
        "alt": "Official Microsoft TRELLIS teaser showing a collection of generated 3D assets",
        "sourceUrl": "https://microsoft.github.io/TRELLIS/",
        "credit": "TRELLIS · Microsoft Research",
        "demoType": "assets",
        "limitations": "Official generated-asset examples; gameplay, rigging and runtime integration are not demonstrated."
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
        "poster": publicAsset("assets/media/demos/infinigen.webp"),
        "alt": "Official Infinigen recording of procedurally generated articulated objects and mechanisms",
        "sourceUrl": "https://infinigen.org/",
        "credit": "Infinigen · Princeton Vision & Learning Lab",
        "demoType": "assets",
        "limitations": "Procedurally generated articulated assets; this recording does not establish AI-authored gameplay."
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
        "role": "excerpt",
        "track": "3d",
        "previewSrc": publicAsset("assets/media/showcase/holodeck-living.mp4"),
        "poster": publicAsset("assets/media/showcase/holodeck-living.webp"),
        "alt": "A frame from the official Holodeck recording of a generated bohemian living room",
        "sourceUrl": "https://yueyang.ai/holodeck/",
        "credit": "Holodeck authors · generated bohemian living room",
        "demoType": "scenes",
        "limitations": "A ten-second excerpt (1–11s) of the author’s 12.04-second generated-room tour, rather than a complete game with gameplay systems."
      }
    ]
  }
];
