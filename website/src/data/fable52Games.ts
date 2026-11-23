import type { LearningPath } from "./learningTypes";

// Source-reviewed Fable 5.2 Games Arcade entries synced from reference distribution.
export const fable52Games: LearningPath[] = [
  {
    "id": "fable52-papertrails",
    "title": "Papertrails",
    "description": "An endless pop-up book you walk through: paper villages rise and fold away across five biomes while you collect pressed leaves, shells and night stars. A relaxing procedural exploration game that ships as a browser build.",
    "engine": "Three.js · procedural WebGL · browser",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade lists this build under \"Claude Fable 5.2 + Claude Opus 5.5\" and names Shikhar as its creator (arcade record checked 2026-11-22). This is aggregator metadata, not an independent authorship audit, and GameMap did not execute the build.",
    "steps": [
      "Open the arcade play page and walk between biomes; note how the paper villages fold and how the collectibles respawn.",
      "Use the arcade source inspector and the single-file download to find the procedural geometry and compare it with the Three.js and Procedural tags.",
      "Read the MIT license on the creator repository before reusing code; generated texture and audio rights are not separately documented."
    ],
    "tutorial": {
      "label": "Read the published build record",
      "url": "https://aiarcade.games/play/papertrails",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Papertrails",
      "url": "https://aiarcade.games/play/papertrails",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22. No original prompt was published for this build."
    },
    "source": {
      "label": "Open the creator repository",
      "url": "https://github.com/xikhar/papertrails",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: MIT, repository active. Asset rights for generated art, models and audio are not separately documented. GameMap reviewed the repository metadata and play page; it did not build or run the game."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/papertrails",
      "note": "Arcade record: createdAt 2026-11-19, modelVersion \"Claude Fable 5.2 + Claude Opus 5.5\", author Shikhar, tags Exploration / Collectathon / Procedural / Three.js / Relaxing. Play page and repository returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-fault-line-echoes",
    "title": "Fault Line Echoes",
    "description": "A first-person adventure across a white-stone capital and four wild regions: sign a flood report, take commissions and pick one of four fighting styles. The arcade lists it as a single-file build of about 7.4 MB using Three.js and Rapier physics.",
    "engine": "Three.js · Rapier · single-file HTML",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names Galok as its creator (arcade record checked 2026-11-22). This is aggregator metadata, not an independent authorship audit, and GameMap did not execute the build.",
    "steps": [
      "Open the play page, sign the flood report and take one commission to see how the quest state changes.",
      "Try two of the four fighting styles and compare the Rapier collision and movement behaviour.",
      "Read the MIT license before reusing code; check the single-file download for third-party CDN dependencies and asset terms."
    ],
    "tutorial": {
      "label": "Read the published build record",
      "url": "https://aiarcade.games/play/fault-line-echoes-hkbbj1",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Fault Line Echoes",
      "url": "https://aiarcade.games/play/fault-line-echoes-hkbbj1",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22. Arcade metadata reports a 7,621 KB single-file build; no original prompt was published."
    },
    "source": {
      "label": "Open the creator repository",
      "url": "https://github.com/GalokPeng/Fault-Line-Echoes",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: MIT, repository active. Asset rights for generated art, models and audio are not separately documented. GameMap reviewed the repository metadata and play page; it did not build or run the game."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/fault-line-echoes-hkbbj1",
      "note": "Arcade record: createdAt 2026-11-19, modelVersion \"Claude Fable 5.2\", author Galok, tags First-Person / Adventure / RPG / Three.js / Rapier / Single File. Play page and repository returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-boo-mas",
    "title": "Boo-mas",
    "description": "A ghost in a Santa hat trails fairy lights around a snow-globe planet: close a loop and everything inside it lights up before midnight. A small Three.js arcade puzzle whose original one-shot prompt is published beside the game.",
    "engine": "Three.js · WebGL · browser",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names robinduckett as its creator (arcade record checked 2026-11-22). The arcade publishes the original prompt. This is aggregator metadata, not an independent authorship audit, and GameMap did not execute the build.",
    "steps": [
      "Play one round and note how closing a loop lights the enclosed area before the midnight timer ends.",
      "Open the published prompt and compare its brief with the mechanics you just played; this is the shortest reproducible one-shot example in this batch.",
      "Check the repository before reusing code: GitHub found no license file on 2026-11-22, so default copyright applies unless the author grants reuse."
    ],
    "tutorial": {
      "label": "Read the published one-shot prompt",
      "url": "https://aiarcade.games/play/boo-mas?tab=prompt",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Boo-mas",
      "url": "https://aiarcade.games/play/boo-mas",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22. The arcade publishes the original prompt on a separate tab."
    },
    "source": {
      "label": "Open the creator repository",
      "url": "https://github.com/robinduckett/boo-mas",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: no license file detected, so default copyright applies unless the author grants reuse. Asset rights for generated art and audio are not separately documented. GameMap reviewed the repository metadata and play page; it did not build or run the game."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/boo-mas?tab=prompt",
      "note": "Arcade record: createdAt 2026-11-20, modelVersion \"Claude Fable 5.2\", author robinduckett, hasPrompt true, tags Arcade / Three.js / WebGL / 3D / Casual. Play page, prompt tab and repository returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-lantern-drift",
    "title": "Lantern Drift (Claude Fable 5.2 build)",
    "description": "The Claude Fable 5.2 side of a same-brief model duel: steer a paper-cut sky lantern up through eaves, wires, birds and rain clouds, and keep its flame alive. The same creator also published GPT-6.2 Astra and other model versions under one comparison repository.",
    "engine": "React · browser arcade build",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names jambocoder159 as its creator (arcade record checked 2026-11-22). Its value here is as one arm of a same-brief multi-model comparison, not as a standalone authorship claim.",
    "steps": [
      "Play the Fable 5.2 build and note how the lantern flame, wind and obstacles are tuned.",
      "Open the sibling builds from the same author and compare how the same brief was interpreted by different models.",
      "Check the comparison repository before reuse: GitHub found no license file on 2026-11-22, so default copyright applies unless the author grants reuse."
    ],
    "tutorial": {
      "label": "Read the published build record",
      "url": "https://aiarcade.games/play/lantern-drift-fable",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Lantern Drift (Fable 5.2)",
      "url": "https://aiarcade.games/play/lantern-drift-fable",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22, marked isNew in the arcade index. No original prompt was published for this build."
    },
    "source": {
      "label": "Open the model-comparison repository",
      "url": "https://github.com/jambocoder159/ai-game-duel",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: no license file detected, so default copyright applies unless the author grants reuse. The repository holds multiple model versions of the same brief. GameMap reviewed the repository metadata and play page; it did not build or run the game."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/lantern-drift-fable",
      "note": "Arcade record: createdAt 2026-11-20, modelVersion \"Claude Fable 5.2\", author jambocoder159, isNew true, tags Arcade / Endless / React. Play page and repository returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": []
  },
  {
    "id": "fable52-crash-quota",
    "title": "Crash Quota",
    "description": "A 60-second demolition derby at a proving ground: bonk 40 dummies, wreck five feral prototype cars or run three laps before the shift clock runs out. An arcade driving build with WebGL2 and gamepad support whose original prompt is published.",
    "engine": "WebGL2 · browser · gamepad support",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names Mythfinity as its creator (arcade record checked 2026-11-22). The arcade publishes the original prompt. This is aggregator metadata, not an independent authorship audit, and GameMap did not execute the build.",
    "steps": [
      "Play one 60-second shift and compare the three alternative win conditions.",
      "Read the published prompt, then trace how the timer, dummy spawns and prototype cars are implemented in the source inspector.",
      "Check the repository before reusing code: GitHub found no license file on 2026-11-22, so default copyright applies unless the author grants reuse."
    ],
    "tutorial": {
      "label": "Read the published one-shot prompt",
      "url": "https://aiarcade.games/play/crash-quota?tab=prompt",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Crash Quota",
      "url": "https://aiarcade.games/play/crash-quota",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22, marked isNew in the arcade index. The arcade publishes the original prompt on a separate tab."
    },
    "source": {
      "label": "Open the creator repository",
      "url": "https://github.com/Mythfinity/crash-quota-fable",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: no license file detected, so default copyright applies unless the author grants reuse. Asset rights for generated art and audio are not separately documented. GameMap reviewed the repository metadata and play page; it did not build or run the game."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/crash-quota?tab=prompt",
      "note": "Arcade record: createdAt 2026-11-21, modelVersion \"Claude Fable 5.2\", author Mythfinity, hasPrompt true, isNew true, tags Arcade / Driving / Demolition / WebGL2 / Gamepad. Play page, prompt tab and repository returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": []
  },
  {
    "id": "fable52-chongqing",
    "title": "Chongqing — playable preview",
    "description": "A trip through Chongqing in a browser tab: the monorail passing through a 19-storey block at Liziba, Hongyadong lit up on the Jialing river, and a time trial between them. A Chinese-language 3D driving and exploration build, published as a playable preview.",
    "engine": "Three.js · browser 3D",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names Gary Cao Gan as its creator (arcade record checked 2026-11-22). This is aggregator metadata, not an independent authorship audit, and GameMap did not execute the build.",
    "steps": [
      "Play the preview and note the three landmarks and the transition into the time trial.",
      "Open the arcade source inspector to see how the city geometry is generated without external model assets.",
      "Treat this as a playable preview: the arcade record links no public source repository, so check the author page for rights before reusing any code."
    ],
    "tutorial": {
      "label": "Read the published build record",
      "url": "https://aiarcade.games/play/chongqing",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play the Chongqing preview",
      "url": "https://aiarcade.games/play/chongqing",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22, marked isNew in the arcade index. The title explicitly says playable preview; no original prompt was published."
    },
    "source": {
      "label": "Open the arcade source inspector",
      "url": "https://aiarcade.games/play/chongqing?tab=source",
      "scope": "complete-project",
      "note": "The complete runnable project is the single-file HTML build exposed by the arcade source inspector and Download .html control; the arcade record links no separate public repository. No license was detected for this build on 2026-11-22, so do not assume reuse rights. GameMap reviewed the play page and build metadata; it did not build or run the game."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/chongqing",
      "note": "Arcade record: createdAt 2026-11-21, modelVersion \"Claude Fable 5.2\", author \"Gary Cao Gan\" (romanised from the Chinese creator name shown by the arcade), isNew true, tags 3D / Open World / Driving / Time Trial / Three.js. Play page and source tab returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-mothlight",
    "title": "MOTHLIGHT // Vesper-9",
    "description": "Street racing through a rain-slick cyberpunk city: thread twelve light gates across five districts. One of four browser games in the creator repository, and the most played build in that collection.",
    "engine": "Three.js · WebGL · single-file browser build",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names hahaliu1029 as its creator (arcade record checked 2026-11-22). The same repository holds three sibling games. This is aggregator and README metadata, not an independent authorship audit.",
    "steps": [
      "Play a run and note how the twelve light gates are distributed across the five districts.",
      "Open the published prompt and compare its brief with the racing, HUD and district-map behaviour you observed.",
      "Read the Apache-2.0 notice in the shared repository before reusing code; generated texture and audio rights are not separately documented."
    ],
    "tutorial": {
      "label": "Read the published one-shot prompt",
      "url": "https://aiarcade.games/play/mothlight?tab=prompt",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play MOTHLIGHT",
      "url": "https://aiarcade.games/play/mothlight",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22. Arcade metadata reports a 1,144 KB build and publishes the original prompt."
    },
    "source": {
      "label": "Open the four-game creator repository",
      "url": "https://github.com/hahaliu1029/fable5.2demo",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: Apache-2.0. The repository holds several games plus a short rendered film; this card covers the mothlight directory. Asset licenses for generated textures and photos are not separately documented."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/mothlight?tab=prompt",
      "note": "Arcade record: createdAt 2026-11-11, modelVersion \"Claude Fable 5.2\", author hahaliu1029, hasPrompt true, tags Racing / Three.js / WebGL / Cyberpunk. Play page and prompt tab returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-tidebell",
    "title": "Tidebell",
    "description": "Pilot a tiny submersible from sunlit reefs down to the abyss and wake seven sleeping tide bells. A procedural underwater exploration game whose every model was generated in code and bundled into one self-contained HTML file.",
    "engine": "Three.js · WebGL · procedural geometry",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names hahaliu1029 as its creator (arcade record checked 2026-11-22). The arcade publishes the original prompt. This is aggregator and README metadata, not an independent authorship audit.",
    "steps": [
      "Play a descent and count the seven bells, noting how lighting changes from the reef to the abyss.",
      "Open the published prompt and compare its brief with the procedural models and the single-file, no-network-request build.",
      "Read the Apache-2.0 notice in the shared repository before reusing code; generated model rights are not separately documented."
    ],
    "tutorial": {
      "label": "Read the published one-shot prompt",
      "url": "https://aiarcade.games/play/tidebell?tab=prompt",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Tidebell",
      "url": "https://aiarcade.games/play/tidebell",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22. Arcade metadata reports a 3,110 KB build and publishes the original prompt."
    },
    "source": {
      "label": "Open the four-game creator repository",
      "url": "https://github.com/hahaliu1029/fable5.2demo",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: Apache-2.0. The repository holds several games plus a short rendered film; this card covers the tidebell directory. Asset licenses for generated models are not separately documented."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/tidebell?tab=prompt",
      "note": "Arcade record: createdAt 2026-11-11, modelVersion \"Claude Fable 5.2\", author hahaliu1029, hasPrompt true, tags Exploration / Three.js / WebGL / Underwater / Procedural. Play page and prompt tab returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-qingyun-sword-flight",
    "title": "Qingyun Sect: sword flight",
    "description": "Third-person sword flight over a sea of clouds: gather twenty motes of qi, light the sect gate and fly through. A xianxia exploration game and one of the four builds in the same creator repository.",
    "engine": "Three.js · WebGL · single-file browser build",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names hahaliu1029 as its creator (arcade record checked 2026-11-22). The arcade publishes the original prompt. This is aggregator and README metadata, not an independent authorship audit.",
    "steps": [
      "Play a flight and note how the qi motes, the sect gate and the flight controls are gated.",
      "Open the published prompt and compare its brief with the cloud rendering and gate sequence.",
      "Read the Apache-2.0 notice in the shared repository before reusing code; generated art rights are not separately documented."
    ],
    "tutorial": {
      "label": "Read the published one-shot prompt",
      "url": "https://aiarcade.games/play/qingyun-sword-flight?tab=prompt",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Qingyun Sect",
      "url": "https://aiarcade.games/play/qingyun-sword-flight",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22. Arcade metadata reports a 2,248 KB build and publishes the original prompt."
    },
    "source": {
      "label": "Open the four-game creator repository",
      "url": "https://github.com/hahaliu1029/fable5.2demo",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: Apache-2.0. The repository holds several games plus a short rendered film; this card covers the sword-flight directory. Asset licenses for generated art are not separately documented."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/qingyun-sword-flight?tab=prompt",
      "note": "Arcade record: createdAt 2026-11-11, modelVersion \"Claude Fable 5.2\", author hahaliu1029, hasPrompt true, tags Exploration / Three.js / WebGL / Flight. Play page and prompt tab returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-misremember",
    "title": "MISREMEMBER",
    "description": "Something rebuilt your childhood home from your memory of it, and nothing changes while you are looking. A first-person memory-house horror exploration game; the creator notes that the published build contains only two of the planned five nights.",
    "engine": "Three.js · WebGL · browser",
    "track": "3d",
    "category": "community",
    "aiUse": "The Fable 5.2 Games Arcade attributes this build to Claude Fable 5.2 and names hahaliu1029 as its creator (arcade record checked 2026-11-22). The repository README also mentions Codex for generated textures and photos. This is aggregator and README metadata, not an independent authorship audit.",
    "steps": [
      "Play the two published nights and note which objects change only when you look away.",
      "Compare the generated textures and photos with the repository README, which names a separate image tool for those assets.",
      "Read the Apache-2.0 notice before reusing code; the README explicitly limits the published build to two of five nights."
    ],
    "tutorial": {
      "label": "Read the published build record",
      "url": "https://aiarcade.games/play/misremember",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play MISREMEMBER",
      "url": "https://aiarcade.games/play/misremember",
      "kind": "playable",
      "note": "Community-arcade browser build, opened 2026-11-22. Arcade metadata reports a 10,820 KB build; no original prompt was published."
    },
    "source": {
      "label": "Open the four-game creator repository",
      "url": "https://github.com/hahaliu1029/fable5.2demo",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: Apache-2.0. The repository holds several games plus a short rendered film; this card covers the memory-house directory. Its textures and photos were generated with a separate tool, and only two of five nights are present."
    },
    "evidence": {
      "label": "Inspect the primary build record",
      "url": "https://aiarcade.games/play/misremember",
      "note": "Arcade record: createdAt 2026-11-11, modelVersion \"Claude Fable 5.2\", author hahaliu1029, hasPrompt false, tags Horror / Exploration / Three.js / WebGL. Play page returned HTTP 200 on 2026-11-22."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "fable52-model-duel",
    "title": "Same brief, three models: Lantern Drift and Mall Action",
    "description": "On 2026-11-20 two creators published near-identical briefs built with three different frontier models. Lantern Drift has a Claude Fable 5.2 version and a GPT-6.2 Astra version from one author; Mall Action has a GPT-6.2 Astra version and a Claude Opus 5.5 version from another. The four playable builds sit side by side in the arcade with their source inspectors, which makes this a reproducible way to compare how one brief is interpreted across models.",
    "engine": "React · Canvas 2D · PixiJS · browser",
    "track": "3d",
    "category": "community",
    "aiUse": "This is a method entry about a multi-model comparison, not an attribution to one agent. The arcade names the model for each build: Claude Fable 5.2, GPT-6.2 Astra and Claude Opus 5.5 (arcade records checked 2026-11-22). GameMap aggregates the published records; it did not re-run the builds or audit authorship.",
    "steps": [
      "Open the two Lantern Drift builds in separate tabs and compare how the same sky-lantern brief handles flame, wind, obstacles and visual style.",
      "Do the same for the two Mall Action builds, noting the pixel-art rendering, elevator traversal and package-search loop.",
      "Use the arcade source inspector on each build to compare file size, dependency choices and how much of the scene is generated at runtime.",
      "Treat the comparison as qualitative: no shared score, identical prompt or controlled run is published, so it does not establish which model is better."
    ],
    "tutorial": {
      "label": "Read the arcade build index",
      "url": "https://aiarcade.games/",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Open the Claude Opus 5.5 Mall Action build",
      "url": "https://aiarcade.games/play/mall-action-opus",
      "kind": "playable",
      "note": "One of the four comparison builds. The other three are linked from the steps and evidence below. All four play pages returned HTTP 200 on 2026-11-22."
    },
    "source": {
      "label": "Open the two-model comparison repository",
      "url": "https://github.com/jambocoder159/ai-game-duel",
      "scope": "complete-project",
      "note": "GitHub license check on 2026-11-22: no license file detected, so default copyright applies unless the author grants reuse. The repository holds the Fable 5.2 and GPT-6.2 Astra Lantern Drift builds. The Mall Action builds are hosted by the arcade."
    },
    "evidence": {
      "label": "Inspect the four build records",
      "url": "https://aiarcade.games/",
      "note": "Lantern Drift: /play/lantern-drift-fable (Claude Fable 5.2) and /play/lantern-drift-astra (GPT-6.2 Astra), both by jambocoder159, created 2026-11-20. Mall Action: /play/mall-action-astra (GPT-6.2 Astra) and /play/mall-action-opus (Claude Opus 5.5), both by rlorca, created 2026-11-20. Each arcade page names its model; no controlled benchmark is claimed."
    },
    "resourceIds": []
  }
];
