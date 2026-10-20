import type { LearningPath } from './learningTypes';

// Source-reviewed additions; creator evidence and runtime requirements are retained per game.
export const researchedGameCases: LearningPath[] = [
  {
    "id": "eight-second-crew-codex",
    "title": "8-Second Crew · 8초 도둑단",
    "description": "Record an eight-second route, replay it as a clone and cooperate with earlier selves to steal a key and escape. Nine stages introduce pressure plates, patrols and projectiles.",
    "engine": "Canvas 2D · Vanilla JavaScript · HTML/CSS UI",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "DongJae Shin set the rules, difficulty and presentation, while Codex helped plan and implement stages, collision, replay, interface, tests and deployment. Agent Sprite Forge processed generated character sprites; the creator repeatedly playtested the result.",
    "steps": [
      "Start the first stage and learn movement, keys and exits.",
      "Read the creator’s Codex development account and asset credits.",
      "Press X to record a route, then inspect how the clone replays it.",
      "Change a stage or replay rule and test a complete escape and restart."
    ],
    "tutorial": {
      "label": "Read the creator’s Codex build account",
      "url": "https://github.com/sdj3261/openai_game_2026#codex와-함께-만든-과정",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play 8-Second Crew",
      "url": "https://sdj3261.github.io/openai_game_2026/",
      "kind": "playable",
      "note": "Korean, English and Japanese; keyboard, click-to-move and touch. WASD/arrows move, X records a clone, Z lures guards, and R restarts. Wait through the brief Ready countdown before moving."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/sdj3261/openai_game_2026",
      "scope": "complete-project",
      "note": "Complete static project with modules, nine stages, sprites, fonts, tests and demo recording. Node.js 18+; npm start, with no dependency installation. Code has no explicit license; the bundled Galmuri font uses OFL."
    },
    "evidence": {
      "label": "Read the author’s human and Codex division of work",
      "url": "https://github.com/sdj3261/openai_game_2026#codex와-함께-만든-과정",
      "note": "README and the creator’s linked article describe concrete planning, implementation, sprite, QA and deployment work; neither is a complete session transcript."
    },
    "resourceIds": [
      "codex"
    ],
    "assetTools": [
      "Agent Sprite Forge"
    ]
  },
  {
    "id": "core-business-claude",
    "title": "Core Business",
    "description": "Drill for minerals, manage fuel and hull condition, and spend earnings at surface shops in a non-commercial mining tech demo inspired by Motherload. Three.js renders the 2.5D world while Blender scripts produce its 3D assets.",
    "engine": "Three.js · JavaScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The creator attributes the game code, tests, textures, translations, models and Blender generation scripts to Claude Opus 5.5. ElevenLabs supplied the sound and music. The project reimplements Motherload-style rules with new assets and explicitly describes itself as a non-commercial experiment; the coding client is not named.",
    "steps": [
      "Start a new game and learn movement, downward drilling, fuel and return-to-surface shops.",
      "Read the fixed-step simulation separately from the Three.js renderer and committed GLB models.",
      "Serve the repository root with a static HTTP server; opening ES modules via file:// does not work.",
      "Change one mineral or upgrade rule, then check drilling, selling, fuel use and save/reload."
    ],
    "tutorial": {
      "label": "Read the mining game’s implementation and asset pipeline",
      "url": "https://github.com/Leichtbier/core-business#readme",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Core Business",
      "url": "https://leichtbier.github.io/core-business/",
      "kind": "playable",
      "note": "WebGL browser, keyboard/pointer and touch controls. Initial graphics preparation stalled with the default headless renderer; Chrome with Metal reached normal play. After the opening transmission, brief movement/drilling input produced score 25 and fuel/depth feedback. Full mining progression and audio were not tested."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/Leichtbier/core-business",
      "scope": "complete-project",
      "note": "Complete JavaScript game, vendored Three.js, committed GLBs, Blender source scripts, UI, audio and tests. Serve the root, e.g. python3 -m http.server 5173; Blender regeneration is unnecessary for normal play. Code is MIT with explicit exceptions: ElevenLabs audio is supplied for this project, not separate extraction or redistribution; see LICENSE."
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/Leichtbier/core-business#readme",
      "note": "The author explicitly separates Claude-generated work from ElevenLabs audio and credits Motherload/XGen Studios. This does not imply that Claude created the original game’s rules."
    },
    "resourceIds": [
      "threejs",
      "blender"
    ],
    "assetTools": [
      "Blender",
      "ElevenLabs"
    ]
  },
  {
    "id": "vibe-golf-bevy",
    "title": "Vibe Golf",
    "description": "Charge and release shots across a hilly, prop-filled 3D landscape while chasing moving duck targets in a small arcade golf sandbox.",
    "engine": "Bevy 0.14 + Rapier 0.27 · Rust / WebAssembly",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The creator describes almost all development and generated assets as a GPT-5 experiment, with the preferred heightmap supplied separately and repeated human design changes. The exact coding client is not identified; the project includes its gameplay and rendering source rather than only a model prompt.",
    "steps": [
      "Wait for the browser build to render, then click Play in the middle of the canvas.",
      "Hold and release the left mouse button to launch the ball; use right-drag to orbit and the wheel to zoom.",
      "Read the creator’s account and compare source plugins for terrain, shooting, physics and game state.",
      "Use a local Rust toolchain to run cargo run, change one shot parameter and test launch, movement and target progression."
    ],
    "tutorial": {
      "label": "Read the creator’s GPT-5 development account",
      "url": "https://www.reddit.com/r/ChatGPT/comments/1mnllsq/vibe_coded_a_3d_game_with_gpt_5_and_rust/",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Vibe Golf",
      "url": "https://ahammer.github.io/vibe_golf/",
      "kind": "playable",
      "note": "Small experimental browser golf sandbox. Initial WASM and asset loading can be slow; use a GPU-capable desktop Chrome browser. Click Play, hold/release left mouse to shoot, right-drag to orbit and scroll to zoom. The game currently logs missing optional .meta requests even though the corresponding assets load."
    },
    "source": {
      "label": "Open the complete Bevy game",
      "url": "https://github.com/ahammer/vibe_golf",
      "scope": "complete-project",
      "note": "Rust game, Cargo setup, terrain/shaders, audio, GLB props and a prebuilt web/ WASM version are public. Cargo.toml uses Bevy0.14 and Rapier0.27; cargo run launches native play. Asset-heavy repository; code license is marked TBD and asset terms are not consolidated."
    },
    "evidence": {
      "label": "Read the human and GPT-5 contribution statement",
      "url": "https://www.reddit.com/r/ChatGPT/comments/1mnllsq/vibe_coded_a_3d_game_with_gpt_5_and_rust/",
      "note": "First-person creator post links both this source and live build, distinguishes the heightmap from generated assets and describes iterative direction. It does not establish use of Codex or another named coding client."
    },
    "resourceIds": []
  },
  {
    "id": "fang-fox-gbc-claude",
    "title": "Fang the Fox · Game Boy Color",
    "description": "Explore floating islands, fight bosses, solve puzzles and follow a fox’s adventure as a real Game Boy Color game, playable through a browser emulator or a handheld ROM.",
    "engine": "GBDK-2020 4.5 · C / hUGEDriver",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "Austin Ginder says Claude Code running Opus 5.5 ported his browser game to C. The creator provided direction and listened to the adapted music; the public build tools share maps, sprites and rules between the original and the cartridge version.",
    "steps": [
      "Start the browser emulator, choose New Game and advance the opening dialogue with X.",
      "Move, interact and inspect the pause map before comparing the cartridge edition with the original browser game.",
      "Read the creator’s porting account and the C implementation under gbc/src/.",
      "Clone the whole repository, then use Node and GBDK-2020 4.5.0 to rebuild through gbc/Makefile; the generator also reads the root JavaScript game data."
    ],
    "tutorial": {
      "label": "Read the creator’s Game Boy porting account",
      "url": "https://tinybitadventures.com/fang-the-fox-on-the-game-boy-color/",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Fang the Fox for Game Boy Color",
      "url": "https://tinybitadventures.com/games/fang-the-fox-gbc/",
      "kind": "playable",
      "note": "Click Start game, focus the emulator, then press Enter/X to start. Arrow keys move, attack and talk; X is A, Z is B, Enter pauses, and Shift shows the area. Hold keys briefly across emulator frames. The page also offers a 256 KB .gbc ROM for compatible emulators or hardware."
    },
    "source": {
      "label": "Open the complete cartridge and browser project",
      "url": "https://github.com/TinyBitAdventures/fang-the-fox",
      "scope": "complete-project",
      "note": "The gbc/ C project, generators, music arrangements and web emulator are public. Download the whole repository: gbc/tools/build.js reads ../js data and sprites. Rebuilding requires Node and GBDK-2020 4.5.0; the ready-made ROM needs neither. Code/pixel art are MIT; music is excluded from that license."
    },
    "evidence": {
      "label": "Read the explicit Claude Code and Opus credit",
      "url": "https://tinybitadventures.com/fang-the-fox-on-the-game-boy-color/",
      "note": "First-person creator account names Claude Code with Opus 5.5 and distinguishes generated implementation from the creator’s direction and music listening. Reported automated test totals were not independently reproduced."
    },
    "resourceIds": []
  ,
    distribution: [
      {
        "platform": "GitHub Releases · GBC",
        "url": "https://github.com/TinyBitAdventures/fang-the-fox/releases/tag/gbc-v1.0.0",
        "kind": "download",
        "note": "Game Boy Color ROM and GBC release ZIP. Requires a compatible emulator or cartridge device; the ROM was not executed in this review."
      }
    ],
  },
  {
    "id": "three-kingdoms-codex",
    "title": "Three Kingdoms: Hundred Heroes",
    "description": "Manage gold and grain, develop cities and command officers across fifteen strongholds. Choose Wei, Shu or Wu and compete with two computer factions to unify the map.",
    "engine": "DOM/CSS + SVG · React",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "MartinDelophy supplied the strategy-game direction and requested more officers, portraits and balance changes. GPT-6 Astra in Codex iterated on rules, interface, data, opponents, saves and tests; a separate image tool generated terrain and portrait atlases.",
    "steps": [
      "Choose a faction and inspect a city and its officers.",
      "Read the creation record and portrait provenance.",
      "Execute an economic order and follow its resource and officer effects.",
      "Change one economy or combat rule and test turns, opponents and saves."
    ],
    "tutorial": {
      "label": "Read the creator’s contribution record",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/three-kingdoms/CREATION.md",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Three Kingdoms",
      "url": "https://sanguo-jiangshan.vercel.app/",
      "kind": "playable",
      "note": "Simplified Chinese interface, mouse/touch controls, no login or API key. Choose a faction and start. Saves and JSON import/export are local to the current browser."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/three-kingdoms",
      "scope": "complete-project",
      "note": "Includes rules, interface, 108 officers, generated terrain and portrait atlases, tests and deployment configuration. Node.js 22.13+; npm ci then npm run dev from works/three-kingdoms. Static export uses dist/client. Repository CC0; dependencies retain their own terms."
    },
    "evidence": {
      "label": "Read the explicit Astra-in-Codex attribution",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/three-kingdoms/CREATION.md",
      "note": "The project initiator’s statement distinguishes human direction, Codex implementation and separately generated bitmap assets. It describes multiple iterations rather than one prompt."
    },
    "resourceIds": [
      "codex"
    ]
  },
  {
    "id": "pelican-bike-claude",
    "title": "Pelican on a Bike",
    "description": "Ride a helmeted pelican along a procedural coast, change lanes to catch fish, jump and unlock small achievements. The complete Three.js project includes its own character, bicycle, ocean, audio and day/night systems.",
    "engine": "Three.js · JavaScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The creator reports generating the game with Claude Opus 5.5 in Claude Code from one Chinese sentence. The README publishes that prompt and describes model-led browser testing and later fixes; the no-manual-code claim is the creator’s, not a measured authorship audit.",
    "steps": [
      "Start a muted ride, accelerate with W/S, change lanes with A/D and jump with Space.",
      "Compare the published one-sentence prompt with the pelican, bicycle, cloth, ocean and camera modules.",
      "In pelican-bike, install dependencies and run node build.mjs; open the resulting dist/index.html in a browser.",
      "Change one collection or cycling rule, then check movement, jump, score feedback and restart."
    ],
    "tutorial": {
      "label": "Read the original prompt and development account",
      "url": "https://github.com/riba2534/claude-opus-5-5-demo#readme",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Pelican on a Bike",
      "url": "https://claude-opus-5-5.riba2534.cn/",
      "kind": "playable",
      "note": "Keyboard and touch controls; W/S accelerate/brake, A/D change lanes, Space jumps and C changes camera. A muted entry is available. Desktop launch, acceleration, jump achievement and camera change were checked."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/riba2534/claude-opus-5-5-demo/tree/main/pelican-bike",
      "scope": "complete-project",
      "note": "Complete pelican-bike source, build script and procedural assets. Run npm install and node build.mjs in that subdirectory, then open dist/index.html. The repository contains three distinct games; this case selects only the pelican game. Package metadata names ISC, but no repository-wide licence text is supplied."
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/riba2534/claude-opus-5-5-demo#readme",
      "note": "Creator-published prompt and session summary, with exact Claude Code attribution. The model-led long-run tests described there were not repeated by GameMap."
    },
    "resourceIds": [
      "claude-code",
      "threejs"
    ]
  },
  {
    "id": "fishslop-claude",
    "title": "Fishslop",
    "description": "Pilot a bathyscaphe through a sunken reef, feed fish, collect the coins they drop and buy new residents or submarine parts. Sonar briefly reveals an otherwise invisible Veilfin.",
    "engine": "Three.js · TypeScript · Web Audio",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The creator’s initial implementation and subsequent fixes explicitly credit Claude Opus 5.5 as a commit co-author. This is evidence of an AI-assisted development contribution; it does not identify the coding client or establish that all code was generated by the model. The reef, fish, textures and sounds are generated by game code.",
    "steps": [
      "Dive in, steer with WASD, hold Space to feed fish and use F for sonar.",
      "Compare the renderer-free simulation, feeding economy and save parser with the Three.js scene.",
      "Use a Vite-compatible Node runtime, npm ci and npm run dev; Node 22.12+ meets the current Vite 8 requirement.",
      "Change one fish or upgrade value, then check food, dropped coins, dock purchases and saved progress."
    ],
    "tutorial": {
      "label": "Read the game rules and project structure",
      "url": "https://github.com/vasu-devs/FishSlop_Opus5.5#readme",
      "kind": "quickstart"
    },
    "demo": {
      "label": "Play Fishslop",
      "url": "https://vasu-devs.github.io/FishSlop_Opus5.5/",
      "kind": "playable",
      "note": "WebGL2 with keyboard, mouse or touch. WASD steers, E/Q changes depth, Space feeds, F pings sonar and B opens the dock. The low-quality preset ?quality=low&scale=0.5 was used to check steering, feeding, coin feedback and sonar."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/vasu-devs/FishSlop_Opus5.5",
      "scope": "complete-project",
      "note": "Complete simulation, Three.js renderer, procedural assets, UI, audio, lockfile and tests. npm ci then npm run dev; the README’s Node 20.19+ does not cover every Node 22 version supported by its current Vite 8 dependency, so use Node 22.12+ or another compatible current runtime. No licence file was found; source availability is not a general reuse grant."
    },
    "evidence": {
      "label": "Read the initial AI-credited implementation",
      "url": "https://github.com/vasu-devs/FishSlop_Opus5.5/commit/e7a7a2dd61b6da92f9512ccabafad13e1e9a3df4",
      "note": "Initial game implementation explicitly credits Claude Opus 5.5 as co-author; later fix commits repeat that credit. A model credit alone is not attributed to Claude Code."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "clockout-unseen-codex",
    "title": "Clock Out Unseen",
    "description": "Sneak out of three offices before time expires, using furniture, coffee distractions and a temporary folder disguise to avoid patrol sightlines and reach an elevator.",
    "engine": "Canvas 2D · React UI",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "Ryan-fm supplied the office-stealth concept and approved the visual direction. GPT-6 Astra in Codex iterated on collisions, sightlines, patrols, interactions, progression, mobile controls and tests. A separate image-generation tool created office and character art.",
    "steps": [
      "Start Normal mode and move behind office furniture.",
      "Read the selected prompts and model contribution record.",
      "Trace movement, line-of-sight and disguise rules in the engine.",
      "Change one patrol rule and check immediate detection, retry and level progression."
    ],
    "tutorial": {
      "label": "Read the creator’s development record",
      "url": "https://github.com/Ryan-fm/clockout-unseen/blob/main/docs/DEVELOPMENT.md",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Clock Out Unseen",
      "url": "https://www.bilibili.com/toy/clockout-unseen/index.html",
      "kind": "playable",
      "note": "Chinese interface on Bilibili Toy. Wait for scene assets, then start a level. WASD/arrows move, E interacts and Space uses a folder disguise; mobile joystick/buttons are supplied. The game opened and started without sign-in."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/Ryan-fm/clockout-unseen",
      "scope": "complete-project",
      "note": "Complete React/Canvas source, maps, original office/character PNGs, tests and Vite configuration. Run npm ci then npm run dev. No runtime AI key. README labels current source V2; verify hosted-version differences before comparing features."
    },
    "evidence": {
      "label": "Read the explicit Codex and human contribution account",
      "url": "https://github.com/Ryan-fm/clockout-unseen/blob/main/docs/DEVELOPMENT.md",
      "note": "Creator record names GPT-6 Astra in Codex, gives selected requests and distinguishes independently generated artwork from coding-model work."
    },
    "resourceIds": [
      "codex"
    ]
  },
  {
    "id": "nagi-home-cowork",
    "title": "Nagi Home",
    "description": "Care for Nagi, a small crab living in a procedural home: place food, throw a ball, request furniture activities and follow a diary as daily needs change. It is a quiet life simulation with saved progress.",
    "engine": "Three.js r169 · JavaScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The creator explicitly says Claude Opus 5.5 generated the code in Claude Cowork. Human planning and publishing are credited separately. Cowork is retained as the actual client rather than being relabelled Claude Code; the conversation itself is not published.",
    "steps": [
      "Place food or throw the ball, then watch Nagi’s activity and diary change.",
      "Read the single index.html to follow daily needs, activity selection, Three.js models and localStorage persistence.",
      "Serve the repository with a static HTTP server or open its HTML in a browser; Three.js and fonts are fetched from external CDNs.",
      "Change one need or activity rule, then check its effect at normal and accelerated time speeds."
    ],
    "tutorial": {
      "label": "Read the creator’s Cowork and simulation notes",
      "url": "https://github.com/tanuu5/nagi-home#readme",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Nagi Home",
      "url": "https://tanuu5.github.io/nagi-home/",
      "kind": "playable",
      "note": "Japanese interface. Drag to orbit, wheel/pinch to zoom; the food and ball buttons trigger interactions. Normal food placement and ball throwing were checked in Chrome, including diary feedback. This is a life simulation without a combat or level-completion goal."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/tanuu5/nagi-home",
      "scope": "complete-project",
      "note": "Complete single-file HTML with procedural Three.js scene, need/activity systems, dialogue and localStorage saves; MIT code. Three.js r169 is loaded from jsDelivr and fonts from Google Fonts, so a clean run requires those network resources. No coding-agent subscription is needed to play."
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/tanuu5/nagi-home#readme",
      "note": "README credits explicitly name Claude Cowork and Claude Opus 5.5, with human planning/publishing attribution."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "thunderfall-astra",
    "title": "THUNDERFALL · Skyward Expedition",
    "description": "Choose one of three fighters and weave through five sectors of drifting bullets, lasers and bosses. Collect four weapon colors and pick upgrades between stages.",
    "engine": "Canvas 2D · Vanilla JavaScript · Web Audio",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "The creator publishes the request and reports GPT-6 Astra ultra participation across design, implementation, procedural visuals, synthesized audio and review. It was iterated with collaborating agents; the exact coding client is not explicitly named.",
    "steps": [
      "Choose a fighter and start the opening sector.",
      "Read the original request separately from the reconstructed reuse specification.",
      "Inspect the game engine, procedural airframes and rendering modules.",
      "Change one bullet pattern and test bombs, pause and a stage transition."
    ],
    "tutorial": {
      "label": "Read the original request and development record",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/thunderfall/PROMPT.md",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play THUNDERFALL",
      "url": "https://thunderfall.vercel.app/",
      "kind": "playable",
      "note": "Chinese interface; keyboard, mouse drag and touch. Attacks fire automatically. WASD/arrows move, Space uses a bomb, E triggers a charged burst, and P/Esc pauses. Full campaign or single-stage practice."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/thunderfall",
      "scope": "complete-project",
      "note": "Complete ES-module game, procedural assets, design notes and tests. Serve works/thunderfall over HTTP; file:// may block imports. Build/tests use Node built-ins without external packages. Original code, procedural graphics and audio are CC0."
    },
    "evidence": {
      "label": "Read the author-published model participation record",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/thunderfall/README.md",
      "note": "The creator is credited as jackroc; README and PROMPT.md preserve the request, user-reported Astra setting and iterative process. Model attribution is a creator statement, not telemetry."
    },
    "resourceIds": []
  },
  {
    "id": "fruit-ninja-dojo-astra",
    "title": "Fruit Ninja Dojo · One More Slice",
    "description": "Swipe through airborne fruit, chain slices and dodge bombs in an unofficial Fruit Ninja recreation with Classic, sixty-second Arcade and ninety-second Zen modes.",
    "engine": "Canvas 2D · Vanilla JavaScript · HTML/CSS UI",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "Laplace9 says an initial high-reasoning Astra prompt produced the game and later shared the full source. The current repository includes subsequent refinements and tests; the original one-shot claim does not prove every current line came from that prompt.",
    "steps": [
      "Choose Zen mode and slice a group of fruit.",
      "Read the author’s original post and source-sharing follow-up.",
      "Inspect gesture sampling, fixed-step physics and procedural fruit drawing.",
      "Change one scoring or spawn rule and test pause, retry and saved records."
    ],
    "tutorial": {
      "label": "Read the creator’s original Astra post",
      "url": "https://linux.do/t/topic/2857340",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Fruit Ninja Dojo",
      "url": "https://fruit-ninja-dojo-20260905.yongqixue666.chatgpt.site/",
      "kind": "playable",
      "note": "Chinese interface; hold and drag the mouse or swipe to slice. Space pauses/resumes, Esc closes dialogs, and M toggles audio. No login or installation."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/yongqixue99-hue/fruit-ninja-dojo",
      "scope": "complete-project",
      "note": "Complete standalone index.html plus modular source, deterministic tests and build script. Canvas drawing and synthesized audio need no external runtime assets. Open index.html offline; development/test commands require Node.js 18+. No explicit code license was observed."
    },
    "evidence": {
      "label": "Read the author’s model and source disclosure",
      "url": "https://linux.do/t/topic/2857340",
      "note": "The same forum author links the hosted game and subsequently the GitHub repository. The post names Astra and publishes the initial request; the client is not explicitly identified."
    },
    "resourceIds": []
  },
  {
    "id": "pixel-orchard-astra",
    "title": "Pixel Orchard · Memory Harvest",
    "description": "Turn over twelve seed packets to find six matching symbol pairs. Track moves, remember mismatches and reshuffle the garden for another short round.",
    "engine": "DOM/CSS · Vanilla JavaScript",
    "track": "2d",
    "category": "ai-generated",
    "aiUse": "MiaAI-Lab identifies the collection as GPT-6 Astra-generated and preserves this game’s exact prompt. The prompt specifies complete matching, reset and rapid-input behavior; the particular chat or coding client and manual refinement are not disclosed.",
    "steps": [
      "Flip two cards and watch how matches and mismatches behave.",
      "Compare the exact prompt with the complete inline implementation.",
      "Inspect shuffle, turn locking and reset during a delayed mismatch.",
      "Change the deck and complete a round, then verify reset and keyboard access."
    ],
    "tutorial": {
      "label": "Read the exact game prompt",
      "url": "https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.txt",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Pixel Orchard",
      "url": "https://miaai-lab.github.io/GPT-6-Astra-100-HTML-Files/013-pixel-orchard.html",
      "kind": "playable",
      "note": "English interface; click, tap or focus card buttons with the keyboard. PLANT AGAIN reshuffles and resets the round. No login, installation or network dependencies after loading."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.html",
      "scope": "complete-project",
      "note": "The single HTML file contains the entire game, inline CSS, shuffled deck, matching, move counter and reset logic. It opens offline without assets, packages or a build step. No explicit code license was observed."
    },
    "evidence": {
      "label": "Read the creator’s generation disclosure",
      "url": "https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/README.md",
      "note": "The author describes these as Astra-generated standalone HTML studies; this particular entry includes a complete playable memory-game loop and its exact prompt."
    },
    "resourceIds": []
  },
  {
    "id": "butch-graves-j2me",
    "title": "Butch Graves 3D",
    "description": "Fight through five Halloween shooter episodes with bosses, keys, secrets and scripted cutscenes, rendered by a compact raycasting engine for Java feature phones.",
    "engine": "Custom fixed-point raycaster · Java MIDP 2.0 / CLDC 1.0",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "WollyMonjac credits Claude Opus 5.5 with code, levels, art and audio tools. The human supplied the brief and direction, played builds and reported problems; the creator also explains simulator, emulator and real-device testing separately.",
    "steps": [
      "Download the full or lite JAR and open it in a compatible J2ME emulator or MIDP 2.0 phone.",
      "Try moving, turning, firing, using doors and switching weapons during the opening episode.",
      "Read the creator’s implementation account and compare src/E.java with the generated resource packs.",
      "Change one level or resource, follow DEVELOPER.md to rebuild, and verify the phone API, memory and audio constraints on the target runtime."
    ],
    "tutorial": {
      "label": "Read the creator’s build and testing account",
      "url": "https://github.com/WollyMonjac/ButchGraves3D",
      "kind": "build-log"
    },
    "demo": {
      "label": "Download Butch Graves 3D",
      "url": "https://github.com/WollyMonjac/ButchGraves3D/tree/main/dist",
      "kind": "download",
      "note": "Ready-built v2.3.0 JAR/JAD files: full game1.7MB or lite build994KB without voices. Requires a compatible MIDP2.0 phone or J2ME Loader, KEmulator or FreeJ2ME; it does not launch with ordinary java -jar. Keypad2/8 moves,4/6 turns,1/3 strafes,5 fires,0 uses,7/9 switches weapons,# jumps and* opens the map. Binary downloaded and inspected, but not executed."
    },
    "source": {
      "label": "Open the complete J2ME game and assets",
      "url": "https://github.com/WollyMonjac/ButchGraves3D",
      "scope": "complete-project",
      "note": "Full Java game, level/resource packs, procedural art/audio tools, tests and packaged full/lite builds. Rebuilding needs JDK8, a MIDP2.0/CLDC1.0 API JAR, ProGuard and the toolchain paths documented in DEVELOPER.md. No repository code license is declared; fonts retain SIL OFL terms."
    },
    "evidence": {
      "label": "Read the human and Claude contribution disclosure",
      "url": "https://github.com/WollyMonjac/ButchGraves3D#butch-graves-3d",
      "note": "The creator explicitly distinguishes human briefs, direction and real-device playtests from the model’s implementation and asset tools. Exact Claude client is not identified; the cloud sandbox alone does not establish Claude Code."
    },
    "resourceIds": []
  },
  {
    "id": "isocity-cursor",
    "title": "IsoCity",
    "description": "Build an isometric city with zoning, roads, rail, utilities and a simulated population. IsoCity is a complete Canvas-based browser game that its creator attributes to Cursor.",
    "engine": "Custom Canvas 2D · TypeScript",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "The creator identifies Cursor as the development tool. The public README does not name a model, quantify generated code, or publish a prompt transcript; study it as an AI-assisted city-building project.",
    "steps": [
      "Play the city builder and follow how roads, zoning and utilities affect growth.",
      "Run the repository locally and locate the CanvasIsometricGrid renderer and city state.",
      "Trace one system, such as train routing, pedestrian paths or the economy, from input to visible behavior.",
      "Change one simulation rule with an agent, then compare its behavior and save/load flow with the original."
    ],
    "tutorial": {
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/amilich/isometric-city#readme",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play IsoCity",
      "url": "https://iso-city.com",
      "kind": "playable",
      "note": "Author-hosted browser city builder with pointer and touch support."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/amilich/isometric-city",
      "note": "Complete Next.js/TypeScript game with renderer, simulation, UI and public assets; npm install then npm run dev opens the city at localhost:3000. Current package uses Next 16; use a compatible current Node runtime. MIT code.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/amilich/isometric-city#readme",
      "note": "Author README presents both IsoCity and IsoCoaster together and directly names Cursor. Source-checked; full reproduction not performed."
    },
    "resourceIds": []
  },
  {
    "id": "project-plateau",
    "title": "Project Plateau: Proof Before Dark",
    "description": "A first-person field-photography expedition inspired by The Lost World: frame prehistoric animals, manage four photographic plates, avoid threats and return to camp before daylight fades.",
    "engine": "Three.js · WebGL2",
    assetTools: ["Blender"],
    "track": "3d",
    "aiUse": "The creator presents Project Plateau as a NovelToGame adaptation built through analysis, concept, world design, art direction, implementation and QA stages. The public workspace includes game code, committed models and textures, asset-generation scripts and the input trace for one tested path; its coding client is not explicitly identified.",
    "steps": [
      "Start the desktop expedition and learn movement, camera, crouching and return-to-camp controls.",
      "Compare how subject framing, cover and photographic plates create choices from the novel’s expedition premise.",
      "Read the build brief and verification record to separate a tested route from untested device, sound and optional encounter behavior.",
      "For local play, enter examples/project-plateau/build/app, use Node 22.12+ to install dependencies, then run npm start; the committed runtime assets do not require Blender regeneration."
    ],
    "tutorial": {
      "label": "Read the expedition build and design workspace",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/project-plateau",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Project Plateau",
      "url": "https://plateau.vibecoco.ai/",
      "kind": "playable",
      "note": "Desktop landscape browser with WebGL2, keyboard and mouse. Mobile devices may show the creator’s short recorded preview instead of the full game."
    },
    "source": {
      "label": "Open the full expedition project",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/project-plateau",
      "note": "Three.js/Vite game with local runtime models, textures, sound, source adaptation documents and QA inputs. Requires Node 22.12+ for local tooling. Blender scripts are asset-production sources, not required for normal play.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s adaptation and QA account",
      "url": "https://github.com/zenstory-ai/novel-to-game#what-the-qa-record-admits-it-did-not-test",
      "note": "The author explains the recorded camera-to-result-and-restart route and its limits; GameMap is not claiming to have reproduced that complete route."
    },
    "resourceIds": [
      "threejs"
    ],
    "category": "ai-assisted"
  },
  {
    "id": "surge-for-oinja-codex",
    "title": "SURGE for Oinja",
    "description": "Shape an electrical build while surviving mechanical swarms across two interactive maps. Automatic attacks leave movement, dodging, upgrades and facility restoration to the player.",
    "engine": "Three.js · Rapier 3D · TypeScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "Olivia used GPT-6 Astra in Codex for combat, ability synergies, procedural environments, interface and debugging. The original Oinja universe, creative direction and playtest feedback came from the creator; development involved repeated sessions and revisions.",
    "steps": [
      "Start a run and try movement, dodging and automatic attacks.",
      "Read the creator’s contribution disclosure.",
      "Inspect combat, progression and map code under src/surge/.",
      "Change one ability combination and check its effect during a new run."
    ],
    "tutorial": {
      "label": "Read the creator’s development account",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/106",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play SURGE for Oinja",
      "url": "https://oinja-game.vercel.app/",
      "kind": "playable",
      "note": "Desktop WebGL and keyboard. WASD/arrows move, Space dodges, Q releases Sync Burst, and E interacts. Attacks are automatic. English and Chinese; no mobile touch controls."
    },
    "source": {
      "label": "Open the complete survival-game project",
      "url": "https://github.com/Olivia295/SURGE-for-Oinja",
      "scope": "complete-project",
      "note": "Includes gameplay, physics, models, assets, translations and tests. Requires Node.js 22; run npm ci and npm run dev. No application server or API key is required."
    },
    "evidence": {
      "label": "Read the creator’s Codex contribution statement",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/106",
      "note": "Submitted by Olivia295, the source repository owner, with explicit human and model responsibilities; not a complete session transcript."
    },
    "resourceIds": [
      "codex",
      "threejs"
    ]
  },
  {
    "id": "deep-yellow-claude",
    "title": "DEEP YELLOW",
    "description": "Explore procedural Backrooms in a first-person, turn-based roguelike. Moving or waiting triggers combat, while equipment combinations and sanity shape each run.",
    "engine": "Godot 4.6 · GDScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "Drew Brereton identifies the game as code-assisted by Claude. The project credits specifically name Claude Code and distinguish original work from external shaders, textures, and fonts.",
    "steps": [
      "Play the interactive tutorial and compare moving, waiting, equipment, and sanity.",
      "Read the creator’s AI disclosure and the project’s separate attribution file.",
      "Import project.godot in Godot 4.6 and inspect the start menu, procedural levels, and turn systems.",
      "Change one equipment or turn rule, then test a complete run and restart."
    ],
    "tutorial": {
      "label": "Read the creator’s game and development notes",
      "url": "https://aebrer.itch.io/deep-yellow",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play DEEP YELLOW",
      "url": "https://aebrer.itch.io/deep-yellow",
      "kind": "playable",
      "note": "In-development browser build plus Windows/Linux downloads. The creator recommends Chrome or a controller; Firefox mouse input has known problems. Includes horror themes and an interactive tutorial."
    },
    "source": {
      "label": "Open the complete Godot game",
      "url": "https://github.com/aebrer/deep-yellow",
      "scope": "complete-project",
      "note": "Full Godot 4.6 project, scenes, scripts, assets, shaders, and export presets. The itch page lists code MIT and assets CC0, while CREDITS.md still leaves the original-code license undecided and some third-party licenses unspecified; inspect both before reuse."
    },
    "evidence": {
      "label": "Read the explicit Claude Code credit",
      "url": "https://github.com/aebrer/deep-yellow/blob/master/CREDITS.md#code-and-design",
      "note": "Creator attribution specifically names Claude via Claude Code. The itch page separately discloses AI assistance for code; no complete session transcript is supplied."
    },
    "resourceIds": [
      "godot-engine",
      "claude-code"
    ]
  ,
    distribution: [
      {
        "platform": "GitHub Releases",
        "url": "https://github.com/aebrer/deep-yellow/releases/tag/v0.13.0",
        "kind": "download",
        "note": "Prepared Windows and Linux builds, plus a self-hostable Web export. These are uploaded game builds, separate from automatic source archives. Release files were verified; native builds were not executed."
      }
    ],
  },
  {
    "id": "morbreaker-unity-claude",
    "title": "morBreaker",
    "description": "Clear ten brick-breaker levels with a paddle-controlled ball that accelerates on bounces, rising brick durability, and locally saved high scores.",
    "engine": "Unity 6 · URP · C#",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "KingMordas says Claude Code built almost the entire game through the Unity MCP plugin: gameplay scripts, scene and prefab wiring, tests, and documentation. The AI editor tooling is separate from the released game runtime.",
    "steps": [
      "Download the Windows release or serve the published WebGL build over HTTP.",
      "Try paddle steering, acceleration, loss, restart, and the local score list.",
      "Read the creator’s Claude Code disclosure and inspect the gameplay C# scripts.",
      "Open SampleScene.unity with Unity 6000.4.11f1, change one level rule, and test progression."
    ],
    "tutorial": {
      "label": "Read the creator’s Unity and Claude Code account",
      "url": "https://github.com/KingMordas/mor-breaker#built-with-claude-code-",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Download morBreaker for Windows or WebGL",
      "url": "https://github.com/KingMordas/mor-breaker/releases/tag/v1.2.0",
      "kind": "download",
      "note": "Version 1.2.0 includes Windows standalone and WebGL ZIPs. Extract the Windows build and launch it, or serve the WebGL build over HTTP. A/D or arrows move, Space launches, H shows scores, and Space/Enter restarts. Pointer/touch controls are included; no public hosted play link is supplied."
    },
    "source": {
      "label": "Open the complete Unity game",
      "url": "https://github.com/KingMordas/mor-breaker",
      "scope": "complete-project",
      "note": "MIT-licensed Assets, Packages, ProjectSettings, scenes, and C# gameplay source. Requires Unity 6000.4.11f1; open Assets/Scenes/SampleScene.unity and press Play. Windows/WebGL build modules are needed only for packaging; Claude/MCP tooling is not required for play."
    },
    "evidence": {
      "label": "Read the explicit Claude Code contribution breakdown",
      "url": "https://github.com/KingMordas/mor-breaker#built-with-claude-code-",
      "note": "Creator disclosure names the Unity MCP package and lists the editor work Claude performed. It is a process summary, not a published prompt transcript."
    },
    "resourceIds": [
      "unity-engine",
      "claude-code"
    ]
  },
  {
    "id": "silent-meridian-codex",
    "title": "Silent Meridian",
    "description": "Investigate an observatory trapped at 00:17, compare Present and Echo states, and solve thirteen connected puzzles across four chapters with a journal and optional hints.",
    "engine": "Custom JavaScript · DOM/CSS · WebGL · Web Audio",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "stackloomdev directed iterative GPT-6 Astra work in Codex on story, puzzles, bilingual text, interface, code, saves, procedural WebGL effects and tests. Background illustrations were generated separately; the 3D layer adds depth to point-and-click scenes.",
    "steps": [
      "Start the opening chapter and compare the two time states.",
      "Read the creation record and art provenance.",
      "Inspect puzzle rules separately from presentation code.",
      "Modify one clue and verify uniqueness, hints and saved progress."
    ],
    "tutorial": {
      "label": "Read the creation record",
      "url": "https://github.com/stackloomdev/silent-meridian/blob/main/docs/CREATION.md",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Silent Meridian",
      "url": "https://silent-meridian.pjstack.dev/",
      "kind": "playable",
      "note": "English and Chinese; mouse, touch and keyboard. Click objects to investigate; Space changes time, J opens the journal, and Esc closes dialogs. Optional WebGL depth has an illustrated fallback."
    },
    "source": {
      "label": "Open the complete puzzle-game project",
      "url": "https://github.com/stackloomdev/silent-meridian",
      "scope": "complete-project",
      "note": "Includes all puzzle logic, chapters, illustrations, local saves, audio, tests and design notes. Node.js 22; npm run dev. No backend, API key, CDN or runtime dependencies."
    },
    "evidence": {
      "label": "Read the human and AI contribution record",
      "url": "https://github.com/stackloomdev/silent-meridian/blob/main/docs/CREATION.md",
      "note": "Creator-published model roles, iterative workflow and validation limits. It explicitly describes point-and-click scenes rather than a freely walkable 3D world."
    },
    "resourceIds": [
      "codex"
    ]
  },
  {
    "id": "castle-clash-duel-claude",
    "title": "Castle Clash Duel",
    "description": "Recruit warriors and archers and fight a two-player tactical battle on a tilemap. This complete Phaser prototype pairs Claude Code implementation with Pixel Frog’s Tiny Swords artwork.",
    "engine": "Phaser 3 · JavaScript",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "The creator combined a PRD, technical design and curated asset metadata with three Claude Code skills for Phaser gameplay, tilemaps and frontend testing. Human-made Tiny Swords assets are credited separately; this is a prototype.",
    "steps": [
      "Play a two-player battle and identify recruitment, movement, attacks and castle victory conditions.",
      "Read the published PRD and technical design before tracing the game’s single-file scene logic.",
      "Inspect the Tiny Swords asset metadata and the custom panels used to handle sprite padding.",
      "Change one unit or UI rule with an agent, then replay the battle and inspect the included test harness."
    ],
    "tutorial": {
      "label": "Read the PRD-to-game workflow",
      "url": "https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Castle Clash Duel",
      "url": "https://vibe-tiny-swords.vercel.app/",
      "kind": "playable",
      "note": "Author-linked browser prototype with mouse or touch controls. The local public/index.html loads Phaser 3.70.0 from a CDN."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/chongdashu/phaserjs-tinyswords",
      "note": "Full public/index.html game, Tiny Swords assets, PRD, technical design and UI test harness are included. Open public/index.html in a modern browser. No root LICENSE was found; artwork retains Pixel Frog terms. Do not assume unrestricted reuse.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills",
      "note": "README explains PRD-to-code workflow, asset metadata and UI/test implementation; docs/prd.md and docs/tdd.md are published. Source-checked; full reproduction not performed."
    },
    "resourceIds": [
      "claude-code",
      "phaser"
    ]
  },
  {
    "id": "golden-hour-skatepark-cursor",
    "title": "Golden Hour Skatepark",
    "description": "Skate an original beachside park: carve transitions, ollie, flip, grind, manual, bail and recover. This complete third-person sandbox has transient trick combos and a changeable time of day, with no levels or persistent score.",
    "engine": "Three.js · TypeScript",
    assetTools: ["Blender"],
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The author says Cursor AI agents implemented the game through builder and visual-critic passes, with human playtests refining controls. Code-built environments and procedural riding are combined with Cursor-generated artwork, credited CC0 audio/textures and Mixamo recovery animations.",
    "steps": [
      "Play the park and test pushing, carving, one trick, a bail and recovery.",
      "Read the making-of account and separate human feedback, agent implementation and third-party assets.",
      "Use Node 22 with pnpm 10.18.0, then pnpm install and pnpm dev; inspect the collision mesh and character pipeline.",
      "Ask an agent to adjust one movement or camera parameter, then compare transition riding, tricks and recovery across the park."
    ],
    "tutorial": {
      "label": "Read the builder-and-critic development account",
      "url": "https://github.com/StarKnightt/skate-park/blob/main/docs/MAKING-OF.md",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Golden Hour Skatepark",
      "url": "https://starknightt.github.io/skate-park/",
      "kind": "playable",
      "note": "Browser skating sandbox with keyboard, optional mouse/gamepad and touch controls. Press any key, click or tap to take over from the title-screen rider. Phone testing reported by the creator used desktop emulation; Firefox and desktop Safari remain untested."
    },
    "source": {
      "label": "Open the complete skating project",
      "url": "https://github.com/StarKnightt/skate-park",
      "scope": "complete-project",
      "note": "Complete TypeScript game, procedural park code, runtime skater/crowd GLBs, textures, audio and source tools. CI uses Node 22 and pnpm 10.18.0; pnpm install then pnpm dev at 127.0.0.1:5188. Ports are fixed. No root LICENSE was found; CC0 media, Mixamo animations and dependencies keep separate terms."
    },
    "evidence": {
      "label": "Read the creator’s Cursor contribution account",
      "url": "https://github.com/StarKnightt/skate-park#how-it-was-built",
      "note": "The README explicitly names Cursor AI agents and separates builder passes, critic feedback and human playtests; docs/MAKING-OF.md provides a detailed account. Source-checked; performance and playability claims were not reproduced."
    },
    "resourceIds": [
      "threejs",
      "blender"
    ]
  },
  {
    "id": "vibe-racer-opencode",
    "title": "Vibe Racer",
    "description": "A top-down time-trial racer with saved best laps, player and creator ghosts, mud surfaces, and a built-in track editor.",
    "engine": "Pygame 2.6 · Python",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "Kecksdose names OpenCode as the coding tool and GPT 5.2 Codex as the model. The README publishes a short development disclosure, rather than the original prompts or full conversation.",
    "steps": [
      "Download the source and launch the Pygame window with Python 3.12 or newer.",
      "Race a supplied track and compare the player ghost with the unlockable creator ghost.",
      "Read the development disclosure, then inspect movement, lap timing, and replay storage.",
      "Change a track or handling parameter and complete a validation run before saving."
    ],
    "tutorial": {
      "label": "Read the tool and model disclosure",
      "url": "https://github.com/Kecksdose/vibe_racer#development",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Download and run Vibe Racer",
      "url": "https://github.com/Kecksdose/vibe_racer/archive/refs/heads/main.zip",
      "kind": "download",
      "note": "No hosted browser build. Requires Python 3.12+ and Pygame 2.6.1+. Run uv run -m src.main; alternatively pip install -e . then python -m src.main. Arrow keys drive, R restarts, G toggles the ghost, and B returns to track selection. Source-checked launch steps; not executed."
    },
    "source": {
      "label": "Open the complete racing project",
      "url": "https://github.com/Kecksdose/vibe_racer",
      "scope": "complete-project",
      "note": "MIT-licensed game source with supplied maps, replays, screenshots, and pyproject.toml/uv.lock. Python 3.12+; the graphical game needs a local desktop display."
    },
    "evidence": {
      "label": "See OpenCode and model attribution",
      "url": "https://github.com/Kecksdose/vibe_racer#development",
      "note": "Creator disclosure explicitly names OpenCode and GPT 5.2 Codex. The model name does not imply the Codex coding-agent client was used."
    },
    "resourceIds": [
      "opencode"
    ]
  },
  {
    "id": "novel-journey-to-west",
    "title": "Journey to the West: Three Borrowings of the Banana Fan",
    "description": "A Chinese turn-based RPG with painted walking maps, quests, equipment, pets and command battles, adapted from the Banana Fan chapters of Journey to the West.",
    "engine": "Custom Canvas 2D · JavaScript · DOM UI",
    "track": "2d",
    "aiUse": "Zenstory publishes this as a NovelToGame agent-workflow result, with source analysis, rejected concepts, game and art direction, generated artwork, game implementation and QA records. The example does not identify one specific coding client; support for several clients is not proof that all were used.",
    "steps": [
      "Play the village and use the quest tracker to reach an NPC or a battle.",
      "Compare the novel chapter references with the selected fan, transformation and five-element mechanics.",
      "Read the design, art and QA files to distinguish implemented systems from deliberately omitted multiplayer features.",
      "To run locally, serve examples/journey-to-the-west/build/app with python3 -m http.server 5173; inspect the JavaScript battle implementation before changing a rule."
    ],
    "tutorial": {
      "label": "Read the adaptation workspace",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/journey-to-the-west",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Three Borrowings of the Banana Fan",
      "url": "https://xiyouji.vibecoco.ai/",
      "kind": "playable",
      "note": "Chinese-language browser prototype. Click to walk, interact with marked NPCs and choose battle commands. The author records a desktop completion path; narrow-screen play has separate limitations."
    },
    "source": {
      "label": "Open the complete adaptation and game",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/journey-to-the-west",
      "note": "Includes the static game, painted scene and character assets, design workspace and browser QA. No generation API is required to play the committed build. Repository MIT terms and the source/asset ledgers should be read together.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s workflow and example record",
      "url": "https://github.com/zenstory-ai/novel-to-game#play-online",
      "note": "The creator links the game to the NovelToGame workflow and its adaptation workspace. Published QA is author evidence, not a GameMap reproduction."
    },
    "category": "ai-assisted",
    "resourceIds": []
  },
  {
    "id": "clowder-and-crest-agents",
    "title": "Clowder & Crest",
    "description": "Recruit cats into a medieval guild, take jobs across fifteen minigame types, develop bonds and follow a seven-chapter campaign shaped by the guild’s reputation.",
    "engine": "Phaser 3 · TypeScript",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "JacobStephens2 identifies Claude Code as the primary coding and design partner, Codex CLI as a second coding lane, and Gemini CLI as a third. PixelLab, Midjourney, ElevenLabs and Suno supplied different asset types; the repository contains per-agent task files.",
    "steps": [
      "Start a guild and complete an opening job.",
      "Read the tool credits and separate coding lanes.",
      "Inspect one minigame and its dedicated playtest.",
      "Change one job mechanic and check campaign progression and saves."
    ],
    "tutorial": {
      "label": "Read the creator’s tool and code credits",
      "url": "https://github.com/JacobStephens2/clowder-and-crest#built-with",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Clowder & Crest",
      "url": "https://clowderandcrest.com/",
      "kind": "playable",
      "note": "Browser campaign with mouse/touch minigames. The title screen also offers a spoiler-marked unlocked minigame archive. Android/iOS packaging is included, but native installation has separate platform requirements. Initial asset loading can be slow."
    },
    "source": {
      "label": "Open the complete guild-game project",
      "url": "https://github.com/JacobStephens2/clowder-and-crest",
      "scope": "complete-project",
      "note": "Full Phaser campaign, fifteen minigame types, assets, native shells and tests. Install package dependencies, then npm run dev; the documented dev port is 3200. CC BY-NC-SA 4.0."
    },
    "evidence": {
      "label": "Read the creator’s multi-tool attribution",
      "url": "https://github.com/JacobStephens2/clowder-and-crest#built-with",
      "note": "README names model/tool roles; todo/codex-todo.md and todo/gemini-todo.md are separate development lanes. These are project records rather than a complete prompt transcript."
    },
    "resourceIds": [
      "phaser",
      "codex",
      "gemini-cli"
    ]
  ,
    distribution: [
      {
        "platform": "GitHub Releases · Android",
        "url": "https://github.com/JacobStephens2/clowder-and-crest/releases/tag/v2.8.0",
        "kind": "download",
        "note": "Signed v2.8.0 Android APK for sideloading. This is not a Google Play listing. Installer assets were verified; installation was not tested."
      },
      {
        "platform": "GitHub Releases · iOS",
        "url": "https://github.com/JacobStephens2/clowder-and-crest/releases/tag/v2.7.3",
        "kind": "download",
        "note": "Older v2.7.3 IPA; iOS is not included in v2.8.0. Requires suitable signing and sideloading as described by the author, not direct App Store installation. Not installed in this review."
      }
    ],
  },
  {
    "id": "pokemon-tactics-claude",
    "title": "Pokemon Tactics",
    "description": "Move Pokemon across an isometric battlefield, use elevation and aim area attacks without hitting allies. This playable tactical fan game combines a TypeScript simulation with 2D-HD sprites on Babylon.js terrain.",
    "engine": "Babylon.js · TypeScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The creator directs design and architecture while Claude Code writes most code, tests and documentation with specialist agents. Pokemon data, sprites and some PixelLab artwork have separate credits and rights.",
    "steps": [
      "Play a battle against the built-in opponents and test movement, height, type matchups and friendly fire.",
      "Read the AI disclosure and CREDITS.md before exploring the engine and rendering packages.",
      "Use Node 24 or later and pnpm 10.32.1 to run the complete workspace locally.",
      "Change one tactical rule with an agent, then compare battle resolution, team setup and replay behavior."
    ],
    "tutorial": {
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/kekel87/pokemon-tactics#built-with-ai",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Pokemon Tactics",
      "url": "https://kekel87.itch.io/pokemon-tactics",
      "kind": "playable",
      "note": "Author-hosted browser demo on itch.io; choose Run game. Includes AI opponents and hot-seat play. An in-development fan project."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/kekel87/pokemon-tactics",
      "note": "Complete pnpm workspace with game core, Pokemon data, Babylon renderer, UI and app assets. package.json requires Node >=24 and pnpm 10.32.1; pnpm install then pnpm dev. Code MIT; many sprites/tiles use CC BY-NC 4.0 and some effect particles have no separate license. Noncommercial fan project; read CREDITS.md.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/kekel87/pokemon-tactics#built-with-ai",
      "note": "Author explains human direction versus generated implementation; independent itch page repeats AI and art disclosure. Source-checked; full reproduction not performed."
    },
    "resourceIds": [
      "claude-code"
    ]
  },
  {
    "id": "rhythm-master-windsurf",
    "title": "Rhythm Master 3D",
    "description": "A four-lane music game with generated synth tracks, difficulty settings, combos and a special mode, implemented as a single browser HTML file.",
    "engine": "Three.js · Tone.js · JavaScript",
    "track": "3d",
    "aiUse": "Frank Niu links this game from a creator post describing a Claude Sonnet 3.7 web-chat-to-Windsurf workflow: generate an initial game, diagnose issues in chat, then apply changes in Windsurf. It is a human-steered coding example, not evidence that Claude Code or a single autonomous run built it.",
    "steps": [
      "Download the repository and serve its directory with a local HTTP server, then open rhythm.html.",
      "Choose a track and difficulty, start the game, and use D/F/J/K as notes reach the target zone.",
      "Test combo scoring, Escape pause and the Space special mode before changing timing or difficulty.",
      "Compare the single-file implementation with the creator’s original brief and debugging workflow."
    ],
    "tutorial": {
      "label": "Read the creator’s build workflow",
      "url": "https://www.linkedin.com/posts/frankniu_if-youre-not-vibe-coding-with-claude-sonnet-activity-7304977951761039362-2xQe",
      "kind": "build-log"
    },
    "demo": {
      "label": "Download and run Rhythm Master 3D",
      "url": "https://github.com/frankjniu/rhythm-game/archive/refs/heads/main.zip",
      "kind": "download",
      "note": "No public hosted build was verified. Serve the downloaded directory and open rhythm.html. External CDNs supply Three.js and Tone.js, so internet access is needed; a click starts audio."
    },
    "source": {
      "label": "Open the complete rhythm-game source",
      "url": "https://github.com/frankjniu/rhythm-game",
      "note": "The full game is rhythm.html, with procedural music and geometry rather than a separate asset download. Third-party libraries load from CDNs. No repository code license is declared.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the author’s AI tools and prompt disclosure",
      "url": "https://www.linkedin.com/posts/frankniu_if-youre-not-vibe-coding-with-claude-sonnet-activity-7304977951761039362-2xQe",
      "note": "The creator identifies Claude Sonnet 3.7, describes passing output into Windsurf, and links the exact rhythm-game repository in the same post."
    },
    "resourceIds": [
      "threejs"
    ],
    "category": "ai-assisted"
  },
  {
    "id": "spirit-of-kiro",
    "title": "Spirit of Kiro",
    "description": "Find unusual items, combine or transform them on a workshop bench, and sell the results to an AI appraiser in an open-ended crafting game.",
    "engine": "Custom Vue 3 · DOM/CSS sprites · TypeScript",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "The official Kiro project says more than 95% of its code was written by prompting Kiro. Its guide uses the actual game to teach steering, bug fixes, refactoring, specifications, hooks, and MCP; AI also generates items and crafting outcomes at runtime.",
    "steps": [
      "Read the official setup guide and confirm the AWS model access required for the runtime.",
      "Deploy the Cognito resources, start the client/server stack, and bootstrap the local DynamoDB tables.",
      "Play the discover, craft, and sell loop before attempting the challenge branch.",
      "Follow one guided bug fix or feature change and verify the resulting interaction in the game."
    ],
    "tutorial": {
      "label": "Follow the official learn-by-playing guide",
      "url": "https://kiro.dev/docs/guides/learn-by-playing/",
      "kind": "tutorial"
    },
    "demo": {
      "label": "Download and run Spirit of Kiro",
      "url": "https://github.com/kirodotdev/spirit-of-kiro/archive/refs/heads/main.zip",
      "kind": "download",
      "note": "No anonymous hosted game is linked by the official project. Local play requires Docker/Podman, an AWS account/credentials and CLI, Bedrock access to supported text models, and deployed Cognito resources. Follow docs/local-setup.md to launch the stack and bootstrap DynamoDB. AWS runtime usage can incur charges; source-checked steps, not executed."
    },
    "source": {
      "label": "Open the complete crafting-game project",
      "url": "https://github.com/kirodotdev/spirit-of-kiro",
      "scope": "complete-project",
      "note": "MIT-0 game repository with Vue client, Bun server, item-image service, infrastructure, and deployment documentation. Runtime item text and interactions depend on AWS Bedrock; item-image generation has additional optional model requirements."
    },
    "evidence": {
      "label": "Read the official Kiro development disclosure",
      "url": "https://github.com/kirodotdev/spirit-of-kiro#spirit-of-kiro",
      "note": "Official creator statement reports more than 95% prompted code. The core crafting loop is complete; roadmap features and intentionally unfinished challenge-branch tasks remain separate."
    },
    "resourceIds": []
  },
  {
    "id": "isocoaster-cursor",
    "title": "IsoCoaster",
    "description": "Lay out a theme park with roller coasters, rides and guests. IsoCoaster is a separate playable game and route in the creator’s Cursor-assisted IsoCity repository.",
    "engine": "Custom Canvas 2D · TypeScript",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "The shared creator README attributes both games to Cursor. Study how a common isometric renderer supports a different simulation; the source does not disclose a specific model or a full AI conversation.",
    "steps": [
      "Play the theme park builder and inspect how coaster tracks, rides and guests interact.",
      "Run the repository locally and open /coaster rather than the city-building route.",
      "Compare the coaster-specific state and interface with the shared isometric rendering components.",
      "Ask an agent to adjust one ride or guest behavior, then test construction, simulation and save/load."
    ],
    "tutorial": {
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/amilich/isometric-city#readme",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play IsoCoaster",
      "url": "https://iso-coaster.com",
      "kind": "playable",
      "note": "Author-hosted browser theme-park builder; the shared source repository contains its separate coaster route."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/amilich/isometric-city",
      "note": "Complete IsoCity repository includes the dedicated src/app/coaster route, shared components and assets. npm install then npm run dev; open localhost:3000/coaster. MIT code; use a Node runtime compatible with its current Next 16 package.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/amilich/isometric-city#readme",
      "note": "README distinguishes the two games, their hosts and separate local routes. Source-checked; full reproduction not performed."
    },
    "resourceIds": []
  },
  {
    "id": "astra-floor-ai",
    "title": "Astra Floor",
    "description": "Fight six zombie waves and a final boss in a first-person industrial arena, managing ammunition, recoil, stamina and purchases between rounds.",
    "engine": "Three.js · TypeScript (React UI)",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "BEROCHLU credits GPT-6 Astra with much of the architecture, procedural 3D generation and Web Audio synthesis. Antigravity 2.0 supplied other implementation and iterative refinement. The disclosure does not claim a single-prompt build.",
    "steps": [
      "Choose Normal difficulty and enter the first wave.",
      "Read the creator’s architecture and model disclosure.",
      "Inspect procedural weapons, enemies and audio implementation.",
      "Tune one weapon or enemy and verify a wave and shop transition."
    ],
    "tutorial": {
      "label": "Read the creator’s AI development disclosure",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/96",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Astra Floor",
      "url": "https://astrafloor.berochlu.workers.dev/",
      "kind": "playable",
      "note": "Desktop WebGL, keyboard and mouse. Wait for INITIALIZING to finish, choose a difficulty, then DEPLOY. WASD moves, mouse aims/fires, R reloads, Q heals, G throws a grenade, and V uses melee. Runs are not saved. The in-app browser could not capture the mouse during review; a normal desktop browser is recommended."
    },
    "source": {
      "label": "Open the complete FPS project",
      "url": "https://github.com/BEROCHLU/astrafloor",
      "scope": "complete-project",
      "note": "Game implementation, procedural models, bundled textures/music and tests. Node.js 22.13+; npm install then npm run dev. Third-party texture credits are documented separately."
    },
    "evidence": {
      "label": "Read the author’s division of AI work",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/96",
      "note": "The repository owner’s submission distinguishes Astra from Antigravity work. The README also credits both tools; no full conversation archive is supplied."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "mosswing-astra",
    "title": "Mosswing",
    "description": "Keep a small creature airborne with one-tap flaps, pass scrolling stone gaps and chase a higher score in a compact 3D browser game.",
    "engine": "Three.js · JavaScript · WebGL",
    "track": "3d",
    "category": "ai-generated",
    "aiUse": "Ayi1337 publishes the original Astra prompt and resulting standalone HTML, reporting a one-shot Xhigh test. The human specified tap-to-flap rules and requested an original character, world and visual style; this is a creator claim, not an audited generation trace.",
    "steps": [
      "Play and identify gravity, flap impulse and scoring.",
      "Read the original prompt alongside the single HTML result.",
      "Inspect the separate source folder before editing.",
      "Change one flight parameter and compare collision and restart behavior."
    ],
    "tutorial": {
      "label": "Read the original one-shot prompt",
      "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games#02--mosswing",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Mosswing",
      "url": "https://mosswing-quiet-flight.jack-514.chatgpt.site/",
      "kind": "playable",
      "note": "Designed for a mobile browser with one-tap control. The repository also supplies a standalone mosswing.html that can be opened in a modern browser without installation."
    },
    "source": {
      "label": "Open the complete Mosswing source",
      "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing",
      "scope": "complete-project",
      "note": "Contains the complete standalone HTML and separate source files. No package installation or build step is required. A public source license was not observed."
    },
    "evidence": {
      "label": "Read the creator’s test and prompt",
      "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games#02--mosswing",
      "note": "The author labels this an Astra one-shot test and preserves the initial instructions and generated artifact. The coding-agent client is not identified."
    },
    "resourceIds": []
  },
  {
    "id": "sprout-quest-claude",
    "title": "Sprout Quest",
    "description": "Explore a small world, fight real-time arena battles, gather materials, craft gear and rebuild a village. Sprout Quest is a mobile-first adventure with a 2D world and live-rendered 3D characters and items.",
    "engine": "Custom Canvas 2D + Three.js · TypeScript",
    assetTools: ["Blender"],
    "track": "2d",
    "category": "ai-generated",
    "aiUse": "The creator says Claude Code generated the game, tests and Blender art pipeline from plain-language requests while the human played on a phone and gave feedback. The repository contains the runtime art as well as its source builders.",
    "steps": [
      "Play the portrait-browser prologue and follow its first fight, gathering and forge tasks.",
      "Read the build account to see how human phone playtests guided later Claude Code changes.",
      "Run bun install and bun run dev; inspect the game modules, committed runtime assets and Blender builders.",
      "Change one combat, crafting or story rule with an agent, then replay the affected progression and save flow."
    ],
    "tutorial": {
      "label": "Read the creator’s build account",
      "url": "https://github.com/aibengineering/sprout-quest#how-it-was-built",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Sprout Quest",
      "url": "https://aibengineering.github.io/sprout-quest/",
      "kind": "playable",
      "note": "Author-hosted browser adventure designed for portrait phones, with desktop keyboard controls and localStorage saves."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/aibengineering/sprout-quest",
      "note": "Complete game code, runtime GLBs/sprite atlases, Blender scripts and tests. bun install then bun run dev opens localhost:3000; normal builds use committed art and do not require Blender. No root LICENSE was found, so public source visibility does not establish broad reuse permission.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/aibengineering/sprout-quest#how-it-was-built",
      "note": "README separates the original build from later human playtest/AI iteration; publishes source modules, generated models and runtime assets, plus a prompt summary. Source-checked; full reproduction not performed."
    },
    "resourceIds": [
      "claude-code",
      "threejs",
      "blender"
    ]
  },
  {
    "id": "claude-dreaming-godot",
    "title": "Claude Dreaming",
    "description": "Walk from a pixel-art attic into playable 3D paintings: a dream garden, space flight, small planets, and community-built rooms.",
    "engine": "Godot 4.7 · GDScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "Rusty credits the game to Rusty and Claude and discloses AI assistance for code, graphics, sounds, and text. The repository provides contribution instructions and a level API for building further dreams with Claude.",
    "steps": [
      "Start the browser build; hold Enter to skip the film if desired.",
      "Enter a painting and compare its movement with the attic and community rooms.",
      "Import the full project in Godot 4.7.2 standard, then read the level template and contribution guide.",
      "Create one small level through the published API and test entry, movement, respawn, and returning to the attic."
    ],
    "tutorial": {
      "label": "Read how to add a dream with Claude",
      "url": "https://github.com/moritzfh/claude-dreaming/blob/main/CONTRIBUTING.md",
      "kind": "tutorial"
    },
    "demo": {
      "label": "Play Claude Dreaming",
      "url": "https://rusty-production.itch.io/claude-dreaming",
      "kind": "playable",
      "note": "In-development HTML5 game. WASD moves; mouse looks, Space jumps/glides, E enters paintings, R respawns, and Esc pauses. Menus are German; Claude speaks English. The film intro can be skipped."
    },
    "source": {
      "label": "Open the complete Godot project",
      "url": "https://github.com/moritzfh/claude-dreaming",
      "scope": "complete-project",
      "note": "Full scenes, GDScript, levels, rooms, assets, film intro, and export presets. Run with Godot 4.7.2 standard: import project.godot and press F5. Code is MIT; original assets are CC BY 4.0, while film material and film-derived art have project-only restrictions in NOTICE.md."
    },
    "evidence": {
      "label": "Read the creator’s AI contribution disclosure",
      "url": "https://rusty-production.itch.io/claude-dreaming",
      "note": "The creator explicitly credits Claude and discloses assisted code, graphics, sounds, and text. This is an author disclosure and contribution workflow, not a complete development transcript."
    },
    "resourceIds": [
      "godot-engine"
    ]
  },
  {
    "id": "sakura-crossing-qwen",
    "title": "3D Sakura Crossing: an exploration prototype",
    "description": "Explore a cel-shaded Japanese neighbourhood with a working railway crossing, residents, a lifting bridge, a drivable car, and a swimmable river.",
    "engine": "Three.js · JavaScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The repository credits code generation to locally running Qwen 3.8 27B, followed by human review, debugging, and extensions. In the linked build account the author identifies Claude Code CLI as the harness with Qwen as its model.",
    "steps": [
      "Explore the browser world on foot, then try the car, river, and moving bridge.",
      "Read the credits and the author’s account of using a local Qwen model through Claude Code CLI.",
      "Inspect CARTOON.md and the complete index.html plus vendored Three.js dependency.",
      "Serve a local copy over HTTP, change one interaction, and verify movement and collisions."
    ],
    "tutorial": {
      "label": "Read the rendering and implementation recipe",
      "url": "https://github.com/danymaniglie-cmyk/3d-sakura-crossing/blob/main/CARTOON.md",
      "kind": "build-log"
    },
    "demo": {
      "label": "Explore Sakura Crossing",
      "url": "https://danymaniglie-cmyk.github.io/3d-sakura-crossing/",
      "kind": "playable",
      "note": "Exploration prototype. WASD walks, Shift runs, mouse drag looks, E talks, F enters/exits the car, and Space/C swims up/down. Touch controls included; mobile performance remains limited."
    },
    "source": {
      "label": "Open the complete exploration project",
      "url": "https://github.com/danymaniglie-cmyk/3d-sakura-crossing",
      "scope": "complete-project",
      "note": "GPL-3.0 source with complete index.html, vendored Three.js, procedural textures, and implementation notes. Run python3 -m http.server 5191 and open localhost:5191/index.html; file:// loading is unsupported. The original author has ended active development. The creator describes an exploration prototype, not a finished campaign; no complete win/loss loop is claimed."
    },
    "evidence": {
      "label": "Read the Qwen and human contribution credit",
      "url": "https://github.com/danymaniglie-cmyk/3d-sakura-crossing#credits",
      "note": "README explicitly distinguishes locally generated Qwen code from human review, debugging, and extensions. The creator’s linked Reddit build account identifies Claude Code CLI as the harness, not the Claude model."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "magic-carpet-wizard-astra",
    "title": "Magic Carpet Wizard · A Thousand Skies",
    "description": "Fly a carpet over a tiny spherical world, thread scoring rings, cast three spells and face roaming enemies and bosses. Local ghost races let two players take turns.",
    "engine": "Three.js · JavaScript",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The creator’s repository About section attributes the game to GPT-6 Astra. The README documents original procedural geometry and textures plus supplied audio; it does not publish prompts, a transcript or an exact division of human and model work.",
    "steps": [
      "Play an adventure run and test flight and spells.",
      "Read the creator’s attribution and audio notes.",
      "Inspect flight rules, collision and rendering modules.",
      "Adjust one obstacle or spell and test a retry and ghost race."
    ],
    "tutorial": {
      "label": "Read the creator’s implementation guide",
      "url": "https://github.com/threapchills/MagicCarpetWizard",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Magic Carpet Wizard",
      "url": "https://threapchills.github.io/MagicCarpetWizard/",
      "kind": "playable",
      "note": "Desktop WebGL2, mouse and keyboard. Enter starts; WASD steers/climbs, mouse plus left click aims/casts, 1–3 changes spells, Space rolls, Shift boosts, and R retries."
    },
    "source": {
      "label": "Open the complete carpet-flight project",
      "url": "https://github.com/threapchills/MagicCarpetWizard",
      "scope": "complete-project",
      "note": "Flight, enemies, spells, procedural world, audio, races and tests. Node.js 22; npm ci then npm run dev. No API keys; optional Google Fonts fall back to system fonts."
    },
    "evidence": {
      "label": "See the creator’s Astra attribution",
      "url": "https://github.com/threapchills/MagicCarpetWizard",
      "note": "The author-controlled repository description names GPT-6 Astra. It does not establish which coding-agent client was used or publish the initial session."
    },
    "resourceIds": [
      "threejs"
    ]
  },
  {
    "id": "supermarket-simulator-cursor",
    "title": "Supermarket Simulator",
    "description": "Manage a supermarket in first person: order goods, unpack deliveries, stock shelves and serve customers. The creator built this Unity experiment with Cursor and generated the 3D models with Hunyuan.",
    "engine": "Unity 2023.2.6f1 · URP · C#",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "The author names Cursor with Gemini 2.5 Pro, Claude Opus 4 and Claude Sonnet 4, and links a creation video. The fully AI-generated description is a creator claim; the public source separates the Unity project and Hunyuan model work.",
    "steps": [
      "Download the Windows release and try the order, delivery, stocking and checkout loop.",
      "Read the creator’s build account and linked video to separate coding assistance from generated models.",
      "Clone with Git LFS, fetch the LFS objects and open InitScene in the matching Unity editor.",
      "Adjust one stock, customer or checkout behavior with an agent, then compare a complete customer-service loop."
    ],
    "tutorial": {
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/breineng/supermarket-simulator#description",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Download the Windows game",
      "url": "https://github.com/breineng/supermarket-simulator/releases/download/0.0.1/SupermarketSimulator.zip",
      "kind": "download",
      "note": "Windows download, about 397 MB, from release 0.0.1. Extract and run Supermaket Simulator.exe. Other platforms require a source build; the binary was not downloaded or executed in this review."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/breineng/supermarket-simulator",
      "note": "Complete Unity 2023.2.6f1 project with Assets, Packages and ProjectSettings. Scenes, prefabs and models use Git LFS: clone with LFS and run git lfs pull before opening Assets/Scenes/InitScene.unity. MIT code; Unity, generated models and dependencies retain their terms. LFS objects were not fetched in this review.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "url": "https://github.com/breineng/supermarket-simulator#description",
      "note": "Author README names coding models, Hunyuan assets, source setup and a linked creation video. Source-checked; full reproduction not performed."
    },
    "resourceIds": [
      "unity-engine"
    ]
  },
  {
    "id": "arkanoid-neon-claude",
    "title": "Arkanoid Neon",
    "description": "Bounce the ball through eight neon brick layouts, collect power-ups and keep the rally alive as the stages accelerate. This complete browser game uses Canvas 2D and synthesized Web Audio.",
    "engine": "Custom Canvas 2D · JavaScript · Web Audio",
    "track": "2d",
    "category": "ai-generated",
    "aiUse": "The creator’s Swedish README attributes the code, graphics, sound, music and levels to Claude Code using Claude Opus 5.5, and publishes the original one-sentence request. Treat this as a creator build disclosure, not an independently audited generation transcript.",
    "steps": [
      "Play a stage and compare paddle control, collision behavior, power-ups and losing a life.",
      "Read the creator’s original Swedish request and AI attribution.",
      "Open index.html locally and trace the game loop, level data and procedural graphics in game.js.",
      "Ask an agent to change one brick pattern or power-up, then test launching, losing a life and restarting."
    ],
    "tutorial": {
      "label": "Read the creator’s original request",
      "url": "https://github.com/Jack-c3l2w/arkanoid-neon#readme",
      "kind": "prompt"
    },
    "demo": {
      "label": "Play Arkanoid Neon",
      "url": "https://jack-c3l2w.github.io/arkanoid-neon/",
      "kind": "playable",
      "note": "Mouse, arrows or A/D move; click/Space launches and fires; P/Esc pauses. Touch drag and tap are supported."
    },
    "source": {
      "label": "Open the complete browser game",
      "url": "https://github.com/Jack-c3l2w/arkanoid-neon",
      "scope": "complete-project",
      "note": "Complete index.html, style.css and game.js with procedural graphics and audio; open index.html locally, no build step. Google Fonts is optional and falls back to system fonts offline. No root LICENSE was found. Fan project inspired by Arkanoid, not affiliated with Taito."
    },
    "evidence": {
      "label": "Read the creator’s Claude Code attribution",
      "url": "https://github.com/Jack-c3l2w/arkanoid-neon#readme",
      "note": "The creator directly names Claude Code and its model, separates the original request from the finished project, and describes code-generated art/audio. Source-checked; full reproduction not performed."
    },
    "resourceIds": [
      "claude-code"
    ]
  },
  {
    "id": "crown-defender-codex",
    "title": "Crown Defender TD 3D · Codex build",
    "description": "Control a hero under an isometric camera, defend a castle through thirty waves and choose upgrades to unlock a cosmetic crown.",
    "engine": "Three.js · JavaScript",
    "track": "3d",
    "category": "ai-generated",
    "aiUse": "Aleksandr-Litvinenko attributes this build to Codex and publishes a comparison with a Claude Code version made from the same brief. The author states that the comparison concerns the agents’ original implementation choices, with assets and runtime code included here.",
    "steps": [
      "Serve the project locally and enter TD Defense.",
      "Read the original requirements and same-brief comparison.",
      "Inspect hero movement, wave progression and upgrade logic.",
      "Change one upgrade and test losing, retrying and saved progress."
    ],
    "tutorial": {
      "label": "Read the same-brief agent comparison",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/COMPARISON.md",
      "kind": "build-log"
    },
    "demo": {
      "label": "Download and run Crown Defender",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/archive/refs/heads/main.zip",
      "kind": "download",
      "note": "Static browser game. Run python3 -m http.server 8010 and open localhost:8010/index.html; choose Играть (Play). Russian interface. WASD/arrows move; semicolon attacks. Mobile joystick/buttons included. Optional two-player mode requires node server/multiplayer-server.mjs."
    },
    "source": {
      "label": "Open the complete Codex game project",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game",
      "scope": "complete-project",
      "note": "Includes game.js, interface, bundled Three.js, runtime textures, requirements and optional WebSocket relay. No build or dependency installation for solo play. MIT code; see ASSET_CREDITS.md."
    },
    "evidence": {
      "label": "Read the author’s agent attribution",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/COMPARISON.md",
      "note": "Author-published Russian comparison explicitly states that Codex built this version from the same requirements as the Claude Code project; no raw session is published."
    },
    "resourceIds": [
      "codex",
      "threejs"
    ]
  },
  {
    "id": "three-quake-claude-port",
    "title": "Three Quake: an AI-assisted Quake port",
    "description": "Play Quake’s shareware episode in a Three.js browser port, and study how an existing shooter’s rendering and runtime were adapted with AI assistance.",
    "engine": "Three.js · JavaScript",
    "track": "3d",
    "aiUse": "Mr.doob credits Claude for assistance with the Three.js port. Quake’s game design and original implementation belong to id Software; this is an AI-assisted port, not a claim that AI created Quake. The README links a creator dev log without identifying a particular Claude client.",
    "steps": [
      "Open the browser build, start a new single-player game and test the movement and firing controls.",
      "Read the creator’s port credits and dev log alongside the original id Software source reference.",
      "Inspect the browser renderer, game runtime, maps and tests to trace how the existing game was adapted.",
      "Use the included shareware data for Episode 1; a registered full-game data set is separate and must be supplied by its owner."
    ],
    "tutorial": {
      "label": "Read the port credits and creator dev log",
      "url": "https://github.com/mrdoob/three-quake#dev-log",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Three Quake",
      "url": "https://mrdoob.github.io/three-quake/",
      "kind": "playable",
      "note": "Keyboard, mouse and a WebGL-capable browser. The included shareware data covers Episode 1; full-game content is separate."
    },
    "source": {
      "label": "Open the complete browser port",
      "url": "https://github.com/mrdoob/three-quake",
      "note": "Complete browser port, maps, runtime source and tests, with the shareware pak0.pak. Code is GPL-2.0; original Quake game data has separate terms and is not relicensed by the code license.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the author’s AI and original-game credits",
      "url": "https://github.com/mrdoob/three-quake#credits",
      "note": "The maintainer distinguishes id Software’s original game from the Three.js port made with Claude assistance."
    },
    "resourceIds": [
      "threejs"
    ],
    "category": "ai-assisted"
  },
  {
    "id": "roo-code-action",
    "title": "Action with AI: a Roo Code experiment",
    "description": "A small SVG top-down action prototype with mouse-aimed shooting, enemies and telegraphed attacks, paired with a detailed account of prompt-driven implementation.",
    "engine": "React · SVG · TypeScript",
    "track": "2d",
    "aiUse": "Mizchi explicitly used Roo Code, formerly Roo Cline, with Claude 3.5 Sonnet while forbidding direct human code edits. The human supplied an experienced developer’s design, incremental instructions and architecture constraints. The published article includes the workflow and limitations; this is an early prototype.",
    "steps": [
      "Move with WASD, aim with the mouse and hold the mouse button to shoot.",
      "Read the original sequence from rendering and movement through enemy health and attack warnings.",
      "Inspect docs/overview.md, the shared types and combat modules alongside the creator’s discussion of documentation drift.",
      "For local study, install the project dependencies with the documented pnpm setup and run pnpm dev, then change one attack or movement rule."
    ],
    "tutorial": {
      "label": "Read the creator’s Roo Code experiment",
      "url": "https://zenn.dev/mizchi/articles/game-with-cline",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Action with AI",
      "url": "https://action-with-ai.mizchi.workers.dev/",
      "kind": "playable",
      "note": "Early desktop keyboard-and-mouse prototype. WASD moves and holding the mouse button fires; visual polish and a full commercial campaign are outside its scope."
    },
    "source": {
      "label": "Open the complete action prototype",
      "url": "https://github.com/mizchi/action-with-ai",
      "note": "Complete React/TypeScript project with SVG rendering, movement, collision, combat, shared types, tests and development notes. No repository license file was found in the reviewed tree.",
      "scope": "complete-project"
    },
    "evidence": {
      "label": "Read the original AI development account",
      "url": "https://zenn.dev/mizchi/articles/game-with-cline",
      "note": "The author names Roo Code and Claude 3.5 Sonnet, explains the no-direct-coding constraint and documents the human design and steering role."
    },
    "category": "ai-assisted",
    "resourceIds": []
  }
];
