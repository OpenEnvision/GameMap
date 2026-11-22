import type { LearningPath } from "./learningTypes";

export const approvedImportedCases: LearningPath[] = [
  {
    "aiUse": "The creator’s Swedish README attributes the code, graphics, sound, music and levels to Claude Code using Claude Opus 5.5, and publishes the original one-sentence request. Treat this as a creator build disclosure, not an independently audited generation transcript.",
    "category": "ai-generated",
    "demo": {
      "kind": "playable",
      "label": "Play Arkanoid Neon",
      "note": "Mouse, arrows or A/D move; click/Space launches and fires; P/Esc pauses. Touch drag and tap are supported.",
      "url": "https://jack-c3l2w.github.io/arkanoid-neon/"
    },
    "description": "Bounce the ball through eight neon brick layouts, collect power-ups and keep the rally alive as the stages accelerate. This complete browser game uses Canvas 2D and synthesized Web Audio.",
    "engine": "Custom Canvas 2D · JavaScript · Web Audio",
    "evidence": {
      "label": "Read the creator’s Claude Code attribution",
      "note": "The creator directly names Claude Code and its model, separates the original request from the finished project, and describes code-generated art/audio. Source-checked; full reproduction not performed.",
      "url": "https://github.com/Jack-c3l2w/arkanoid-neon#readme"
    },
    "id": "arkanoid-neon-claude",
    "resourceIds": [
      "claude-code"
    ],
    "source": {
      "label": "Open the complete browser game",
      "note": "Complete index.html, style.css and game.js with procedural graphics and audio; open index.html locally, no build step. Google Fonts is optional and falls back to system fonts offline. No root LICENSE was found. Fan project inspired by Arkanoid, not affiliated with Taito.",
      "scope": "complete-project",
      "url": "https://github.com/Jack-c3l2w/arkanoid-neon"
    },
    "steps": [
      "Play a stage and compare paddle control, collision behavior, power-ups and losing a life.",
      "Read the creator’s original Swedish request and AI attribution.",
      "Open index.html locally and trace the game loop, level data and procedural graphics in game.js.",
      "Ask an agent to change one brick pattern or power-up, then test launching, losing a life and restarting."
    ],
    "title": "Arkanoid Neon",
    "track": "2d",
    "tutorial": {
      "kind": "prompt",
      "label": "Read the creator’s original request",
      "url": "https://github.com/Jack-c3l2w/arkanoid-neon#readme"
    }
  },
  {
    "aiUse": "BEROCHLU credits GPT-6 Astra with much of the architecture, procedural 3D generation and Web Audio synthesis. Antigravity 2.0 supplied other implementation and iterative refinement. The disclosure does not claim a single-prompt build.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Astra Floor",
      "note": "Desktop WebGL, keyboard and mouse. Wait for INITIALIZING to finish, choose a difficulty, then DEPLOY. WASD moves, mouse aims/fires, R reloads, Q heals, G throws a grenade, and V uses melee. Runs are not saved. The in-app browser could not capture the mouse during review; a normal desktop browser is recommended.",
      "url": "https://astrafloor.berochlu.workers.dev/"
    },
    "description": "Fight six zombie waves and a final boss in a first-person industrial arena, managing ammunition, recoil, stamina and purchases between rounds.",
    "engine": "Three.js · TypeScript (React UI)",
    "evidence": {
      "label": "Read the author’s division of AI work",
      "note": "The repository owner’s submission distinguishes Astra from Antigravity work. The README also credits both tools; no full conversation archive is supplied.",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/96"
    },
    "id": "astra-floor-ai",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the complete FPS project",
      "note": "Game implementation, procedural models, bundled textures/music and tests. Node.js 22.13+; npm install then npm run dev. Third-party texture credits are documented separately.",
      "scope": "complete-project",
      "url": "https://github.com/BEROCHLU/astrafloor"
    },
    "steps": [
      "Choose Normal difficulty and enter the first wave.",
      "Read the creator’s architecture and model disclosure.",
      "Inspect procedural weapons, enemies and audio implementation.",
      "Tune one weapon or enemy and verify a wave and shop transition."
    ],
    "title": "Astra Floor",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s AI development disclosure",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/96"
    }
  },
  {
    "aiUse": "WollyMonjac credits Claude Opus 5.5 with code, levels, art and audio tools. The human supplied the brief and direction, played builds and reported problems; the creator also explains simulator, emulator and real-device testing separately.",
    "category": "ai-assisted",
    "demo": {
      "kind": "download",
      "label": "Download Butch Graves 3D",
      "note": "Ready-built v2.3.0 JAR/JAD files: full game1.7MB or lite build994KB without voices. Requires a compatible MIDP2.0 phone or J2ME Loader, KEmulator or FreeJ2ME; it does not launch with ordinary java -jar. Keypad2/8 moves,4/6 turns,1/3 strafes,5 fires,0 uses,7/9 switches weapons,# jumps and* opens the map. Binary downloaded and inspected, but not executed.",
      "url": "https://github.com/WollyMonjac/ButchGraves3D/tree/main/dist"
    },
    "description": "Fight through five Halloween shooter episodes with bosses, keys, secrets and scripted cutscenes, rendered by a compact raycasting engine for Java feature phones.",
    "engine": "Custom fixed-point raycaster · Java MIDP 2.0 / CLDC 1.0",
    "evidence": {
      "label": "Read the human and Claude contribution disclosure",
      "note": "The creator explicitly distinguishes human briefs, direction and real-device playtests from the model’s implementation and asset tools. Exact Claude client is not identified; the cloud sandbox alone does not establish Claude Code.",
      "url": "https://github.com/WollyMonjac/ButchGraves3D#butch-graves-3d"
    },
    "id": "butch-graves-j2me",
    "resourceIds": [],
    "source": {
      "label": "Open the complete J2ME game and assets",
      "note": "Full Java game, level/resource packs, procedural art/audio tools, tests and packaged full/lite builds. Rebuilding needs JDK8, a MIDP2.0/CLDC1.0 API JAR, ProGuard and the toolchain paths documented in DEVELOPER.md. No repository code license is declared; fonts retain SIL OFL terms.",
      "scope": "complete-project",
      "url": "https://github.com/WollyMonjac/ButchGraves3D"
    },
    "steps": [
      "Download the full or lite JAR and open it in a compatible J2ME emulator or MIDP 2.0 phone.",
      "Try moving, turning, firing, using doors and switching weapons during the opening episode.",
      "Read the creator’s implementation account and compare src/E.java with the generated resource packs.",
      "Change one level or resource, follow DEVELOPER.md to rebuild, and verify the phone API, memory and audio constraints on the target runtime."
    ],
    "title": "Butch Graves 3D",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s build and testing account",
      "url": "https://github.com/WollyMonjac/ButchGraves3D"
    }
  },
  {
    "aiUse": "The creator combined a PRD, technical design and curated asset metadata with three Claude Code skills for Phaser gameplay, tilemaps and frontend testing. Human-made Tiny Swords assets are credited separately; this is a prototype.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Castle Clash Duel",
      "note": "Author-linked browser prototype with mouse or touch controls. The local public/index.html loads Phaser 3.70.0 from a CDN.",
      "url": "https://vibe-tiny-swords.vercel.app/"
    },
    "description": "Recruit warriors and archers and fight a two-player tactical battle on a tilemap. This complete Phaser prototype pairs Claude Code implementation with Pixel Frog’s Tiny Swords artwork.",
    "engine": "Phaser 3 · JavaScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "README explains PRD-to-code workflow, asset metadata and UI/test implementation; docs/prd.md and docs/tdd.md are published. Source-checked; full reproduction not performed.",
      "url": "https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills"
    },
    "id": "castle-clash-duel-claude",
    "resourceIds": [
      "claude-code",
      "phaser"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Full public/index.html game, Tiny Swords assets, PRD, technical design and UI test harness are included. Open public/index.html in a modern browser. No root LICENSE was found; artwork retains Pixel Frog terms. Do not assume unrestricted reuse.",
      "scope": "complete-project",
      "url": "https://github.com/chongdashu/phaserjs-tinyswords"
    },
    "steps": [
      "Play a two-player battle and identify recruitment, movement, attacks and castle victory conditions.",
      "Read the published PRD and technical design before tracing the game’s single-file scene logic.",
      "Inspect the Tiny Swords asset metadata and the custom panels used to handle sprite padding.",
      "Change one unit or UI rule with an agent, then replay the battle and inspect the included test harness."
    ],
    "title": "Castle Clash Duel",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the PRD-to-game workflow",
      "url": "https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills"
    }
  },
  {
    "aiUse": "Rusty credits the game to Rusty and Claude and discloses AI assistance for code, graphics, sounds, and text. The repository provides contribution instructions and a level API for building further dreams with Claude.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Claude Dreaming",
      "note": "In-development HTML5 game. WASD moves; mouse looks, Space jumps/glides, E enters paintings, R respawns, and Esc pauses. Menus are German; Claude speaks English. The film intro can be skipped.",
      "url": "https://rusty-production.itch.io/claude-dreaming"
    },
    "description": "Walk from a pixel-art attic into playable 3D paintings: a dream garden, space flight, small planets, and community-built rooms.",
    "engine": "Godot 4.7 · GDScript",
    "evidence": {
      "label": "Read the creator’s AI contribution disclosure",
      "note": "The creator explicitly credits Claude and discloses assisted code, graphics, sounds, and text. This is an author disclosure and contribution workflow, not a complete development transcript.",
      "url": "https://rusty-production.itch.io/claude-dreaming"
    },
    "id": "claude-dreaming-godot",
    "resourceIds": [
      "godot-engine"
    ],
    "source": {
      "label": "Open the complete Godot project",
      "note": "Full scenes, GDScript, levels, rooms, assets, film intro, and export presets. Run with Godot 4.7.2 standard: import project.godot and press F5. Code is MIT; original assets are CC BY 4.0, while film material and film-derived art have project-only restrictions in NOTICE.md.",
      "scope": "complete-project",
      "url": "https://github.com/moritzfh/claude-dreaming"
    },
    "steps": [
      "Start the browser build; hold Enter to skip the film if desired.",
      "Enter a painting and compare its movement with the attic and community rooms.",
      "Import the full project in Godot 4.7.2 standard, then read the level template and contribution guide.",
      "Create one small level through the published API and test entry, movement, respawn, and returning to the attic."
    ],
    "title": "Claude Dreaming",
    "track": "3d",
    "tutorial": {
      "kind": "tutorial",
      "label": "Read how to add a dream with Claude",
      "url": "https://github.com/moritzfh/claude-dreaming/blob/main/CONTRIBUTING.md"
    }
  },
  {
    "aiUse": "Ryan-fm supplied the office-stealth concept and approved the visual direction. GPT-6 Astra in Codex iterated on collisions, sightlines, patrols, interactions, progression, mobile controls and tests. A separate image-generation tool created office and character art.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Clock Out Unseen",
      "note": "Chinese interface on Bilibili Toy. Wait for scene assets, then start a level. WASD/arrows move, E interacts and Space uses a folder disguise; mobile joystick/buttons are supplied. The game opened and started without sign-in.",
      "url": "https://www.bilibili.com/toy/clockout-unseen/index.html"
    },
    "description": "Sneak out of three offices before time expires, using furniture, coffee distractions and a temporary folder disguise to avoid patrol sightlines and reach an elevator.",
    "engine": "Canvas 2D · React UI",
    "evidence": {
      "label": "Read the explicit Codex and human contribution account",
      "note": "Creator record names GPT-6 Astra in Codex, gives selected requests and distinguishes independently generated artwork from coding-model work.",
      "url": "https://github.com/Ryan-fm/clockout-unseen/blob/main/docs/DEVELOPMENT.md"
    },
    "id": "clockout-unseen-codex",
    "resourceIds": [
      "codex"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete React/Canvas source, maps, original office/character PNGs, tests and Vite configuration. Run npm ci then npm run dev. No runtime AI key. README labels current source V2; verify hosted-version differences before comparing features.",
      "scope": "complete-project",
      "url": "https://github.com/Ryan-fm/clockout-unseen"
    },
    "steps": [
      "Start Normal mode and move behind office furniture.",
      "Read the selected prompts and model contribution record.",
      "Trace movement, line-of-sight and disguise rules in the engine.",
      "Change one patrol rule and check immediate detection, retry and level progression."
    ],
    "title": "Clock Out Unseen",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s development record",
      "url": "https://github.com/Ryan-fm/clockout-unseen/blob/main/docs/DEVELOPMENT.md"
    }
  },
  {
    "aiUse": "JacobStephens2 identifies Claude Code as the primary coding and design partner, Codex CLI as a second coding lane, and Gemini CLI as a third. PixelLab, Midjourney, ElevenLabs and Suno supplied different asset types; the repository contains per-agent task files.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Clowder & Crest",
      "note": "Browser campaign with mouse/touch minigames. The title screen also offers a spoiler-marked unlocked minigame archive. Android/iOS packaging is included, but native installation has separate platform requirements. Initial asset loading can be slow.",
      "url": "https://clowderandcrest.com/"
    },
    "description": "Recruit cats into a medieval guild, take jobs across fifteen minigame types, develop bonds and follow a seven-chapter campaign shaped by the guild’s reputation.",
    "distribution": [
      {
        "kind": "download",
        "note": "Signed v2.8.0 Android APK for sideloading. This is not a Google Play listing. Installer assets were verified; installation was not tested.",
        "platform": "GitHub Releases · Android",
        "url": "https://github.com/JacobStephens2/clowder-and-crest/releases/tag/v2.8.0"
      },
      {
        "kind": "download",
        "note": "Older v2.7.3 IPA; iOS is not included in v2.8.0. Requires suitable signing and sideloading as described by the author, not direct App Store installation. Not installed in this review.",
        "platform": "GitHub Releases · iOS",
        "url": "https://github.com/JacobStephens2/clowder-and-crest/releases/tag/v2.7.3"
      }
    ],
    "engine": "Phaser 3 · TypeScript",
    "evidence": {
      "label": "Read the creator’s multi-tool attribution",
      "note": "README names model/tool roles; todo/codex-todo.md and todo/gemini-todo.md are separate development lanes. These are project records rather than a complete prompt transcript.",
      "url": "https://github.com/JacobStephens2/clowder-and-crest#built-with"
    },
    "id": "clowder-and-crest-agents",
    "resourceIds": [
      "phaser",
      "codex",
      "gemini-cli"
    ],
    "source": {
      "label": "Open the complete guild-game project",
      "note": "Full Phaser campaign, fifteen minigame types, assets, native shells and tests. Install package dependencies, then npm run dev; the documented dev port is 3200. CC BY-NC-SA 4.0.",
      "scope": "complete-project",
      "url": "https://github.com/JacobStephens2/clowder-and-crest"
    },
    "steps": [
      "Start a guild and complete an opening job.",
      "Read the tool credits and separate coding lanes.",
      "Inspect one minigame and its dedicated playtest.",
      "Change one job mechanic and check campaign progression and saves."
    ],
    "title": "Clowder & Crest",
    "track": "2d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s tool and code credits",
      "url": "https://github.com/JacobStephens2/clowder-and-crest#built-with"
    }
  },
  {
    "aiUse": "The creator attributes the game code, tests, textures, translations, models and Blender generation scripts to Claude Opus 5.5. ElevenLabs supplied the sound and music. The project reimplements Motherload-style rules with new assets and explicitly describes itself as a non-commercial experiment; the coding client is not named.",
    "assetTools": [
      "Blender",
      "ElevenLabs"
    ],
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Core Business",
      "note": "WebGL browser, keyboard/pointer and touch controls. Initial graphics preparation stalled with the default headless renderer; Chrome with Metal reached normal play. After the opening transmission, brief movement/drilling input produced score 25 and fuel/depth feedback. Full mining progression and audio were not tested.",
      "url": "https://leichtbier.github.io/core-business/"
    },
    "description": "Drill for minerals, manage fuel and hull condition, and spend earnings at surface shops in a non-commercial mining tech demo inspired by Motherload. Three.js renders the 2.5D world while Blender scripts produce its 3D assets.",
    "engine": "Three.js · JavaScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "The author explicitly separates Claude-generated work from ElevenLabs audio and credits Motherload/XGen Studios. This does not imply that Claude created the original game’s rules.",
      "url": "https://github.com/Leichtbier/core-business#readme"
    },
    "id": "core-business-claude",
    "resourceIds": [
      "threejs",
      "blender"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete JavaScript game, vendored Three.js, committed GLBs, Blender source scripts, UI, audio and tests. Serve the root, e.g. python3 -m http.server 5173; Blender regeneration is unnecessary for normal play. Code is MIT with explicit exceptions: ElevenLabs audio is supplied for this project, not separate extraction or redistribution; see LICENSE.",
      "scope": "complete-project",
      "url": "https://github.com/Leichtbier/core-business"
    },
    "steps": [
      "Start a new game and learn movement, downward drilling, fuel and return-to-surface shops.",
      "Read the fixed-step simulation separately from the Three.js renderer and committed GLB models.",
      "Serve the repository root with a static HTTP server; opening ES modules via file:// does not work.",
      "Change one mineral or upgrade rule, then check drilling, selling, fuel use and save/reload."
    ],
    "title": "Core Business",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the mining game’s implementation and asset pipeline",
      "url": "https://github.com/Leichtbier/core-business#readme"
    }
  },
  {
    "aiUse": "Aleksandr-Litvinenko attributes this build to Codex and publishes a comparison with a Claude Code version made from the same brief. The author states that the comparison concerns the agents’ original implementation choices, with assets and runtime code included here.",
    "category": "ai-generated",
    "demo": {
      "kind": "download",
      "label": "Download and run Crown Defender",
      "note": "Static browser game. Run python3 -m http.server 8010 and open localhost:8010/index.html; choose Играть (Play). Russian interface. WASD/arrows move; semicolon attacks. Mobile joystick/buttons included. Optional two-player mode requires node server/multiplayer-server.mjs.",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/archive/refs/heads/main.zip"
    },
    "description": "Control a hero under an isometric camera, defend a castle through thirty waves and choose upgrades to unlock a cosmetic crown.",
    "engine": "Three.js · JavaScript",
    "evidence": {
      "label": "Read the author’s agent attribution",
      "note": "Author-published Russian comparison explicitly states that Codex built this version from the same requirements as the Claude Code project; no raw session is published.",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/COMPARISON.md"
    },
    "id": "crown-defender-codex",
    "resourceIds": [
      "codex",
      "threejs"
    ],
    "source": {
      "label": "Open the complete Codex game project",
      "note": "Includes game.js, interface, bundled Three.js, runtime textures, requirements and optional WebSocket relay. No build or dependency installation for solo play. MIT code; see ASSET_CREDITS.md.",
      "scope": "complete-project",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game"
    },
    "steps": [
      "Serve the project locally and enter TD Defense.",
      "Read the original requirements and same-brief comparison.",
      "Inspect hero movement, wave progression and upgrade logic.",
      "Change one upgrade and test losing, retrying and saved progress."
    ],
    "title": "Crown Defender TD 3D · Codex build",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the same-brief agent comparison",
      "url": "https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/COMPARISON.md"
    }
  },
  {
    "aiUse": "Drew Brereton identifies the game as code-assisted by Claude. The project credits specifically name Claude Code and distinguish original work from external shaders, textures, and fonts.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play DEEP YELLOW",
      "note": "In-development browser build plus Windows/Linux downloads. The creator recommends Chrome or a controller; Firefox mouse input has known problems. Includes horror themes and an interactive tutorial.",
      "url": "https://aebrer.itch.io/deep-yellow"
    },
    "description": "Explore procedural Backrooms in a first-person, turn-based roguelike. Moving or waiting triggers combat, while equipment combinations and sanity shape each run.",
    "distribution": [
      {
        "kind": "download",
        "note": "Prepared Windows and Linux builds, plus a self-hostable Web export. These are uploaded game builds, separate from automatic source archives. Release files were verified; native builds were not executed.",
        "platform": "GitHub Releases",
        "url": "https://github.com/aebrer/deep-yellow/releases/tag/v0.13.0"
      }
    ],
    "engine": "Godot 4.6 · GDScript",
    "evidence": {
      "label": "Read the explicit Claude Code credit",
      "note": "Creator attribution specifically names Claude via Claude Code. The itch page separately discloses AI assistance for code; no complete session transcript is supplied.",
      "url": "https://github.com/aebrer/deep-yellow/blob/master/CREDITS.md#code-and-design"
    },
    "id": "deep-yellow-claude",
    "resourceIds": [
      "godot-engine",
      "claude-code"
    ],
    "source": {
      "label": "Open the complete Godot game",
      "note": "Full Godot 4.6 project, scenes, scripts, assets, shaders, and export presets. The itch page lists code MIT and assets CC0, while CREDITS.md still leaves the original-code license undecided and some third-party licenses unspecified; inspect both before reuse.",
      "scope": "complete-project",
      "url": "https://github.com/aebrer/deep-yellow"
    },
    "steps": [
      "Play the interactive tutorial and compare moving, waiting, equipment, and sanity.",
      "Read the creator’s AI disclosure and the project’s separate attribution file.",
      "Import project.godot in Godot 4.6 and inspect the start menu, procedural levels, and turn systems.",
      "Change one equipment or turn rule, then test a complete run and restart."
    ],
    "title": "DEEP YELLOW",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s game and development notes",
      "url": "https://aebrer.itch.io/deep-yellow"
    }
  },
  {
    "aiUse": "DongJae Shin set the rules, difficulty and presentation, while Codex helped plan and implement stages, collision, replay, interface, tests and deployment. Agent Sprite Forge processed generated character sprites; the creator repeatedly playtested the result.",
    "assetTools": [
      "Agent Sprite Forge"
    ],
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play 8-Second Crew",
      "note": "Korean, English and Japanese; keyboard, click-to-move and touch. WASD/arrows move, X records a clone, Z lures guards, and R restarts. Wait through the brief Ready countdown before moving.",
      "url": "https://sdj3261.github.io/openai_game_2026/"
    },
    "description": "Record an eight-second route, replay it as a clone and cooperate with earlier selves to steal a key and escape. Nine stages introduce pressure plates, patrols and projectiles.",
    "engine": "Canvas 2D · Vanilla JavaScript · HTML/CSS UI",
    "evidence": {
      "label": "Read the author’s human and Codex division of work",
      "note": "README and the creator’s linked article describe concrete planning, implementation, sprite, QA and deployment work; neither is a complete session transcript.",
      "url": "https://github.com/sdj3261/openai_game_2026#codex와-함께-만든-과정"
    },
    "id": "eight-second-crew-codex",
    "resourceIds": [
      "codex"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete static project with modules, nine stages, sprites, fonts, tests and demo recording. Node.js 18+; npm start, with no dependency installation. Code has no explicit license; the bundled Galmuri font uses OFL.",
      "scope": "complete-project",
      "url": "https://github.com/sdj3261/openai_game_2026"
    },
    "steps": [
      "Start the first stage and learn movement, keys and exits.",
      "Read the creator’s Codex development account and asset credits.",
      "Press X to record a route, then inspect how the clone replays it.",
      "Change a stage or replay rule and test a complete escape and restart."
    ],
    "title": "8-Second Crew · 8초 도둑단",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s Codex build account",
      "url": "https://github.com/sdj3261/openai_game_2026#codex와-함께-만든-과정"
    }
  },
  {
    "aiUse": "Austin Ginder says Claude Code running Opus 5.5 ported his browser game to C. The creator provided direction and listened to the adapted music; the public build tools share maps, sprites and rules between the original and the cartridge version.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Fang the Fox for Game Boy Color",
      "note": "Click Start game, focus the emulator, then press Enter/X to start. Arrow keys move, attack and talk; X is A, Z is B, Enter pauses, and Shift shows the area. Hold keys briefly across emulator frames. The page also offers a 256 KB .gbc ROM for compatible emulators or hardware.",
      "url": "https://tinybitadventures.com/games/fang-the-fox-gbc/"
    },
    "description": "Explore floating islands, fight bosses, solve puzzles and follow a fox’s adventure as a real Game Boy Color game, playable through a browser emulator or a handheld ROM.",
    "distribution": [
      {
        "kind": "download",
        "note": "Game Boy Color ROM and GBC release ZIP. Requires a compatible emulator or cartridge device; the ROM was not executed in this review.",
        "platform": "GitHub Releases · GBC",
        "url": "https://github.com/TinyBitAdventures/fang-the-fox/releases/tag/gbc-v1.0.0"
      }
    ],
    "engine": "GBDK-2020 4.5 · C / hUGEDriver",
    "evidence": {
      "label": "Read the explicit Claude Code and Opus credit",
      "note": "First-person creator account names Claude Code with Opus 5.5 and distinguishes generated implementation from the creator’s direction and music listening. Reported automated test totals were not independently reproduced.",
      "url": "https://tinybitadventures.com/fang-the-fox-on-the-game-boy-color/"
    },
    "id": "fang-fox-gbc-claude",
    "resourceIds": [],
    "source": {
      "label": "Open the complete cartridge and browser project",
      "note": "The gbc/ C project, generators, music arrangements and web emulator are public. Download the whole repository: gbc/tools/build.js reads ../js data and sprites. Rebuilding requires Node and GBDK-2020 4.5.0; the ready-made ROM needs neither. Code/pixel art are MIT; music is excluded from that license.",
      "scope": "complete-project",
      "url": "https://github.com/TinyBitAdventures/fang-the-fox"
    },
    "steps": [
      "Start the browser emulator, choose New Game and advance the opening dialogue with X.",
      "Move, interact and inspect the pause map before comparing the cartridge edition with the original browser game.",
      "Read the creator’s porting account and the C implementation under gbc/src/.",
      "Clone the whole repository, then use Node and GBDK-2020 4.5.0 to rebuild through gbc/Makefile; the generator also reads the root JavaScript game data."
    ],
    "title": "Fang the Fox · Game Boy Color",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s Game Boy porting account",
      "url": "https://tinybitadventures.com/fang-the-fox-on-the-game-boy-color/"
    }
  },
  {
    "aiUse": "The creator’s initial implementation and subsequent fixes explicitly credit Claude Opus 5.5 as a commit co-author. This is evidence of an AI-assisted development contribution; it does not identify the coding client or establish that all code was generated by the model. The reef, fish, textures and sounds are generated by game code.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Fishslop",
      "note": "WebGL2 with keyboard, mouse or touch. WASD steers, E/Q changes depth, Space feeds, F pings sonar and B opens the dock. The low-quality preset ?quality=low&scale=0.5 was used to check steering, feeding, coin feedback and sonar.",
      "url": "https://vasu-devs.github.io/FishSlop_Opus5.5/"
    },
    "description": "Pilot a bathyscaphe through a sunken reef, feed fish, collect the coins they drop and buy new residents or submarine parts. Sonar briefly reveals an otherwise invisible Veilfin.",
    "engine": "Three.js · TypeScript · Web Audio",
    "evidence": {
      "label": "Read the initial AI-credited implementation",
      "note": "Initial game implementation explicitly credits Claude Opus 5.5 as co-author; later fix commits repeat that credit. A model credit alone is not attributed to Claude Code.",
      "url": "https://github.com/vasu-devs/FishSlop_Opus5.5/commit/e7a7a2dd61b6da92f9512ccabafad13e1e9a3df4"
    },
    "id": "fishslop-claude",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete simulation, Three.js renderer, procedural assets, UI, audio, lockfile and tests. npm ci then npm run dev; the README’s Node 20.19+ does not cover every Node 22 version supported by its current Vite 8 dependency, so use Node 22.12+ or another compatible current runtime. No licence file was found; source availability is not a general reuse grant.",
      "scope": "complete-project",
      "url": "https://github.com/vasu-devs/FishSlop_Opus5.5"
    },
    "steps": [
      "Dive in, steer with WASD, hold Space to feed fish and use F for sonar.",
      "Compare the renderer-free simulation, feeding economy and save parser with the Three.js scene.",
      "Use a Vite-compatible Node runtime, npm ci and npm run dev; Node 22.12+ meets the current Vite 8 requirement.",
      "Change one fish or upgrade value, then check food, dropped coins, dock purchases and saved progress."
    ],
    "title": "Fishslop",
    "track": "3d",
    "tutorial": {
      "kind": "quickstart",
      "label": "Read the game rules and project structure",
      "url": "https://github.com/vasu-devs/FishSlop_Opus5.5#readme"
    }
  },
  {
    "aiUse": "Laplace9 says an initial high-reasoning Astra prompt produced the game and later shared the full source. The current repository includes subsequent refinements and tests; the original one-shot claim does not prove every current line came from that prompt.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Fruit Ninja Dojo",
      "note": "Chinese interface; hold and drag the mouse or swipe to slice. Space pauses/resumes, Esc closes dialogs, and M toggles audio. No login or installation.",
      "url": "https://fruit-ninja-dojo-20260905.yongqixue666.chatgpt.site/"
    },
    "description": "Swipe through airborne fruit, chain slices and dodge bombs in an unofficial Fruit Ninja recreation with Classic, sixty-second Arcade and ninety-second Zen modes.",
    "engine": "Canvas 2D · Vanilla JavaScript · HTML/CSS UI",
    "evidence": {
      "label": "Read the author’s model and source disclosure",
      "note": "The same forum author links the hosted game and subsequently the GitHub repository. The post names Astra and publishes the initial request; the client is not explicitly identified.",
      "url": "https://linux.do/t/topic/2857340"
    },
    "id": "fruit-ninja-dojo-astra",
    "resourceIds": [],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete standalone index.html plus modular source, deterministic tests and build script. Canvas drawing and synthesized audio need no external runtime assets. Open index.html offline; development/test commands require Node.js 18+. No explicit code license was observed.",
      "scope": "complete-project",
      "url": "https://github.com/yongqixue99-hue/fruit-ninja-dojo"
    },
    "steps": [
      "Choose Zen mode and slice a group of fruit.",
      "Read the author’s original post and source-sharing follow-up.",
      "Inspect gesture sampling, fixed-step physics and procedural fruit drawing.",
      "Change one scoring or spawn rule and test pause, retry and saved records."
    ],
    "title": "Fruit Ninja Dojo · One More Slice",
    "track": "2d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s original Astra post",
      "url": "https://linux.do/t/topic/2857340"
    }
  },
  {
    "aiUse": "The author says Cursor AI agents implemented the game through builder and visual-critic passes, with human playtests refining controls. Code-built environments and procedural riding are combined with Cursor-generated artwork, credited CC0 audio/textures and Mixamo recovery animations.",
    "assetTools": [
      "Blender"
    ],
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Golden Hour Skatepark",
      "note": "Browser skating sandbox with keyboard, optional mouse/gamepad and touch controls. Press any key, click or tap to take over from the title-screen rider. Phone testing reported by the creator used desktop emulation; Firefox and desktop Safari remain untested.",
      "url": "https://starknightt.github.io/skate-park/"
    },
    "description": "Skate an original beachside park: carve transitions, ollie, flip, grind, manual, bail and recover. This complete third-person sandbox has transient trick combos and a changeable time of day, with no levels or persistent score.",
    "engine": "Three.js · TypeScript",
    "evidence": {
      "label": "Read the creator’s Cursor contribution account",
      "note": "The README explicitly names Cursor AI agents and separates builder passes, critic feedback and human playtests; docs/MAKING-OF.md provides a detailed account. Source-checked; performance and playability claims were not reproduced.",
      "url": "https://github.com/StarKnightt/skate-park#how-it-was-built"
    },
    "id": "golden-hour-skatepark-cursor",
    "resourceIds": [
      "threejs",
      "blender"
    ],
    "source": {
      "label": "Open the complete skating project",
      "note": "Complete TypeScript game, procedural park code, runtime skater/crowd GLBs, textures, audio and source tools. CI uses Node 22 and pnpm 10.18.0; pnpm install then pnpm dev at 127.0.0.1:5188. Ports are fixed. No root LICENSE was found; CC0 media, Mixamo animations and dependencies keep separate terms.",
      "scope": "complete-project",
      "url": "https://github.com/StarKnightt/skate-park"
    },
    "steps": [
      "Play the park and test pushing, carving, one trick, a bail and recovery.",
      "Read the making-of account and separate human feedback, agent implementation and third-party assets.",
      "Use Node 22 with pnpm 10.18.0, then pnpm install and pnpm dev; inspect the collision mesh and character pipeline.",
      "Ask an agent to adjust one movement or camera parameter, then compare transition riding, tricks and recovery across the park."
    ],
    "title": "Golden Hour Skatepark",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the builder-and-critic development account",
      "url": "https://github.com/StarKnightt/skate-park/blob/main/docs/MAKING-OF.md"
    }
  },
  {
    "aiUse": "The creator identifies Cursor as the development tool. The public README does not name a model, quantify generated code, or publish a prompt transcript; study it as an AI-assisted city-building project.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play IsoCity",
      "note": "Author-hosted browser city builder with pointer and touch support.",
      "url": "https://iso-city.com"
    },
    "description": "Build an isometric city with zoning, roads, rail, utilities and a simulated population. IsoCity is a complete Canvas-based browser game that its creator attributes to Cursor.",
    "engine": "Custom Canvas 2D · TypeScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "Author README presents both IsoCity and IsoCoaster together and directly names Cursor. Source-checked; full reproduction not performed.",
      "url": "https://github.com/amilich/isometric-city#readme"
    },
    "id": "isocity-cursor",
    "resourceIds": [],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete Next.js/TypeScript game with renderer, simulation, UI and public assets; npm install then npm run dev opens the city at localhost:3000. Current package uses Next 16; use a compatible current Node runtime. MIT code.",
      "scope": "complete-project",
      "url": "https://github.com/amilich/isometric-city"
    },
    "steps": [
      "Play the city builder and follow how roads, zoning and utilities affect growth.",
      "Run the repository locally and locate the CanvasIsometricGrid renderer and city state.",
      "Trace one system, such as train routing, pedestrian paths or the economy, from input to visible behavior.",
      "Change one simulation rule with an agent, then compare its behavior and save/load flow with the original."
    ],
    "title": "IsoCity",
    "track": "2d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/amilich/isometric-city#readme"
    }
  },
  {
    "aiUse": "The shared creator README attributes both games to Cursor. Study how a common isometric renderer supports a different simulation; the source does not disclose a specific model or a full AI conversation.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play IsoCoaster",
      "note": "Author-hosted browser theme-park builder; the shared source repository contains its separate coaster route.",
      "url": "https://iso-coaster.com"
    },
    "description": "Lay out a theme park with roller coasters, rides and guests. IsoCoaster is a separate playable game and route in the creator’s Cursor-assisted IsoCity repository.",
    "engine": "Custom Canvas 2D · TypeScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "README distinguishes the two games, their hosts and separate local routes. Source-checked; full reproduction not performed.",
      "url": "https://github.com/amilich/isometric-city#readme"
    },
    "id": "isocoaster-cursor",
    "resourceIds": [],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete IsoCity repository includes the dedicated src/app/coaster route, shared components and assets. npm install then npm run dev; open localhost:3000/coaster. MIT code; use a Node runtime compatible with its current Next 16 package.",
      "scope": "complete-project",
      "url": "https://github.com/amilich/isometric-city"
    },
    "steps": [
      "Play the theme park builder and inspect how coaster tracks, rides and guests interact.",
      "Run the repository locally and open /coaster rather than the city-building route.",
      "Compare the coaster-specific state and interface with the shared isometric rendering components.",
      "Ask an agent to adjust one ride or guest behavior, then test construction, simulation and save/load."
    ],
    "title": "IsoCoaster",
    "track": "2d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/amilich/isometric-city#readme"
    }
  },
  {
    "aiUse": "The creator identifies Claude Code, GitHub Copilot, GPT Image 2, PixelLab and Meshy among the production tools. The repository documents Meshy rigs and animation, Blender retargeting and PixelOver sprite exports. The exact coding models and division of code between assistants are not specified; generated NPC teammates are not the evidence for AI-assisted development.",
    "assetTools": [
      "GPT Image 2",
      "PixelLab",
      "Meshy",
      "Blender",
      "PixelOver"
    ],
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Katana Kitsune on itch.io",
      "note": "Silent HTML5 prototype with keyboard and gamepad support. Space confirms player/device choices; allow a clear press and release between setup steps. The browser build loaded and reached player/device selection in review; combat and a complete dungeon run were not exercised. The download is large: about 184 MB of game data plus 40 MB of WebAssembly.",
      "url": "https://9-k9.itch.io/katanakitsune"
    },
    "description": "Choose a kitsune fighter and face yokai in an isometric action roguelike with katana combat, stamina, pickups and successive dungeon floors. The silent prototype supports local multiplayer, with additional party systems documented in the current source.",
    "engine": "Godot 4.7 · GDScript · 2D / GL Compatibility",
    "evidence": {
      "label": "Read the creator’s AI production disclosure",
      "note": "The author explicitly names Claude Code and GitHub Copilot alongside image, sprite and 3D asset tools, and links the primary complete source repository. The README verifies the Godot version and explains which finished assets are included.",
      "url": "https://9-k9.itch.io/katanakitsune"
    },
    "id": "katana-kitsune-godot",
    "resourceIds": [
      "claude-code",
      "godot-engine",
      "pixellab",
      "meshy",
      "blender"
    ],
    "source": {
      "label": "Open the complete Godot game project",
      "note": "Godot 4.7 project with scenes, GDScript, Dialogic addon and finished sprite assets. The inspected tree contains about 383 MB of files; no top-level game license was found. The upstream Meshy/Blender/PixelOver authoring pipeline is separate, while its finished runtime sprites are committed. The current source contains newer party/asset changes than the reviewed hosted prototype.",
      "scope": "complete-project",
      "url": "https://github.com/9-K9/KatanaKitsune"
    },
    "steps": [
      "Open the itch prototype and choose one human player, then claim a keyboard and select a costume.",
      "Read the creator’s AI disclosure and the repository’s character, combat and sprite-pipeline notes.",
      "Open project.godot in Godot 4.7 using GL Compatibility; the finished sprites and game scenes are included.",
      "Change one combat or spawn setting, then check the title-to-character-to-dungeon flow, damage and restart."
    ],
    "title": "Katana Kitsune: Prototype",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the game and asset-pipeline documentation",
      "url": "https://github.com/9-K9/KatanaKitsune#readme"
    }
  },
  {
    "aiUse": "The creator’s repository About section attributes the game to GPT-6 Astra. The README documents original procedural geometry and textures plus supplied audio; it does not publish prompts, a transcript or an exact division of human and model work.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Magic Carpet Wizard",
      "note": "Desktop WebGL2, mouse and keyboard. Enter starts; WASD steers/climbs, mouse plus left click aims/casts, 1–3 changes spells, Space rolls, Shift boosts, and R retries.",
      "url": "https://threapchills.github.io/MagicCarpetWizard/"
    },
    "description": "Fly a carpet over a tiny spherical world, thread scoring rings, cast three spells and face roaming enemies and bosses. Local ghost races let two players take turns.",
    "engine": "Three.js · JavaScript",
    "evidence": {
      "label": "See the creator’s Astra attribution",
      "note": "The author-controlled repository description names GPT-6 Astra. It does not establish which coding-agent client was used or publish the initial session.",
      "url": "https://github.com/threapchills/MagicCarpetWizard"
    },
    "id": "magic-carpet-wizard-astra",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the complete carpet-flight project",
      "note": "Flight, enemies, spells, procedural world, audio, races and tests. Node.js 22; npm ci then npm run dev. No API keys; optional Google Fonts fall back to system fonts.",
      "scope": "complete-project",
      "url": "https://github.com/threapchills/MagicCarpetWizard"
    },
    "steps": [
      "Play an adventure run and test flight and spells.",
      "Read the creator’s attribution and audio notes.",
      "Inspect flight rules, collision and rendering modules.",
      "Adjust one obstacle or spell and test a retry and ghost race."
    ],
    "title": "Magic Carpet Wizard · A Thousand Skies",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s implementation guide",
      "url": "https://github.com/threapchills/MagicCarpetWizard"
    }
  },
  {
    "aiUse": "Hirotaka Adachi names Claude Code as the development tool and SUNO AI for music, and describes the work as entirely AI-created. The exact coding model is not identified. The public project contains the game renderer, rules, interface and four music files; the creator’s claim does not establish autonomous development without human direction.",
    "category": "ai-generated",
    "demo": {
      "kind": "playable",
      "label": "Play Minimal Rogue on itch.io",
      "note": "Browser keyboard game. Enter confirms the opening and tutorial; arrows move, Space defends, and X opens the menu. A short first-floor run verified movement, block-cracking feedback and the command menu. Later floors, saves and a complete run were not tested.",
      "url": "https://hirotaka-adachi.itch.io/minimal-rogue"
    },
    "description": "Explore a monochrome dungeon, break blocks, manage stamina and equipment, and descend through an ASCII-style roguelike with English and Japanese interfaces.",
    "engine": "Canvas 2D · Vanilla JavaScript · HTML/CSS UI",
    "evidence": {
      "label": "Read the author’s Claude Code and SUNO attribution",
      "note": "The creator identifies Claude Code for development, SUNO AI for music, links the complete repository and explicitly describes the work as created entirely using AI. No model version or full development transcript is supplied.",
      "url": "https://hirotaka-adachi.itch.io/minimal-rogue"
    },
    "id": "minimal-rogue-claude",
    "resourceIds": [
      "claude-code"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete static HTML/CSS/JavaScript project and four MP3 tracks; serve the root over HTTP without a package install or build step. MIT code license is included; SUNO music is credited without a separate music license. The reviewed public source index references script version 549, while the itch build references 581, so the two releases are not claimed to be byte-identical.",
      "scope": "complete-project",
      "url": "https://github.com/HirotakaAdachi/Rogue/tree/anonymous-release"
    },
    "steps": [
      "Run the browser game, choose a new game and language, and confirm the opening and tutorial with Enter.",
      "Use the arrow keys to explore the first room, Space to defend and X to open the command menu.",
      "Read the creator’s AI disclosure and inspect the complete HTML, CSS, JavaScript and music files.",
      "Serve the source folder over HTTP, change one room or stamina rule, and check movement, interactions and a new run."
    ],
    "title": "Minimal Rogue",
    "track": "2d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s AI and source-code notes",
      "url": "https://hirotaka-adachi.itch.io/minimal-rogue"
    }
  },
  {
    "aiUse": "KingMordas says Claude Code built almost the entire game through the Unity MCP plugin: gameplay scripts, scene and prefab wiring, tests, and documentation. The AI editor tooling is separate from the released game runtime.",
    "category": "ai-assisted",
    "demo": {
      "kind": "download",
      "label": "Download morBreaker for Windows or WebGL",
      "note": "Version 1.2.0 includes Windows standalone and WebGL ZIPs. Extract the Windows build and launch it, or serve the WebGL build over HTTP. A/D or arrows move, Space launches, H shows scores, and Space/Enter restarts. Pointer/touch controls are included; no public hosted play link is supplied.",
      "url": "https://github.com/KingMordas/mor-breaker/releases/tag/v1.2.0"
    },
    "description": "Clear ten brick-breaker levels with a paddle-controlled ball that accelerates on bounces, rising brick durability, and locally saved high scores.",
    "engine": "Unity 6 · URP · C#",
    "evidence": {
      "label": "Read the explicit Claude Code contribution breakdown",
      "note": "Creator disclosure names the Unity MCP package and lists the editor work Claude performed. It is a process summary, not a published prompt transcript.",
      "url": "https://github.com/KingMordas/mor-breaker#built-with-claude-code-"
    },
    "id": "morbreaker-unity-claude",
    "resourceIds": [
      "unity-engine",
      "claude-code"
    ],
    "source": {
      "label": "Open the complete Unity game",
      "note": "MIT-licensed Assets, Packages, ProjectSettings, scenes, and C# gameplay source. Requires Unity 6000.4.11f1; open Assets/Scenes/SampleScene.unity and press Play. Windows/WebGL build modules are needed only for packaging; Claude/MCP tooling is not required for play.",
      "scope": "complete-project",
      "url": "https://github.com/KingMordas/mor-breaker"
    },
    "steps": [
      "Download the Windows release or serve the published WebGL build over HTTP.",
      "Try paddle steering, acceleration, loss, restart, and the local score list.",
      "Read the creator’s Claude Code disclosure and inspect the gameplay C# scripts.",
      "Open SampleScene.unity with Unity 6000.4.11f1, change one level rule, and test progression."
    ],
    "title": "morBreaker",
    "track": "2d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s Unity and Claude Code account",
      "url": "https://github.com/KingMordas/mor-breaker#built-with-claude-code-"
    }
  },
  {
    "aiUse": "Ayi1337 publishes the original Astra prompt and resulting standalone HTML, reporting a one-shot Xhigh test. The human specified tap-to-flap rules and requested an original character, world and visual style; this is a creator claim, not an audited generation trace.",
    "category": "ai-generated",
    "demo": {
      "kind": "playable",
      "label": "Play Mosswing",
      "note": "Designed for a mobile browser with one-tap control. The repository also supplies a standalone mosswing.html that can be opened in a modern browser without installation.",
      "url": "https://mosswing-quiet-flight.jack-514.chatgpt.site/"
    },
    "description": "Keep a small creature airborne with one-tap flaps, pass scrolling stone gaps and chase a higher score in a compact 3D browser game.",
    "engine": "Three.js · JavaScript · WebGL",
    "evidence": {
      "label": "Read the creator’s test and prompt",
      "note": "The author labels this an Astra one-shot test and preserves the initial instructions and generated artifact. The coding-agent client is not identified.",
      "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games#02--mosswing"
    },
    "id": "mosswing-astra",
    "resourceIds": [],
    "source": {
      "label": "Open the complete Mosswing source",
      "note": "Contains the complete standalone HTML and separate source files. No package installation or build step is required. A public source license was not observed.",
      "scope": "complete-project",
      "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing"
    },
    "steps": [
      "Play and identify gravity, flap impulse and scoring.",
      "Read the original prompt alongside the single HTML result.",
      "Inspect the separate source folder before editing.",
      "Change one flight parameter and compare collision and restart behavior."
    ],
    "title": "Mosswing",
    "track": "3d",
    "tutorial": {
      "kind": "prompt",
      "label": "Read the original one-shot prompt",
      "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games#02--mosswing"
    }
  },
  {
    "aiUse": "The creator explicitly says Claude Opus 5.5 generated the code in Claude Cowork. Human planning and publishing are credited separately. Cowork is retained as the actual client rather than being relabelled Claude Code; the conversation itself is not published.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Nagi Home",
      "note": "Japanese interface. Drag to orbit, wheel/pinch to zoom; the food and ball buttons trigger interactions. Normal food placement and ball throwing were checked in Chrome, including diary feedback. This is a life simulation without a combat or level-completion goal.",
      "url": "https://tanuu5.github.io/nagi-home/"
    },
    "description": "Care for Nagi, a small crab living in a procedural home: place food, throw a ball, request furniture activities and follow a diary as daily needs change. It is a quiet life simulation with saved progress.",
    "engine": "Three.js r169 · JavaScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "README credits explicitly name Claude Cowork and Claude Opus 5.5, with human planning/publishing attribution.",
      "url": "https://github.com/tanuu5/nagi-home#readme"
    },
    "id": "nagi-home-cowork",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete single-file HTML with procedural Three.js scene, need/activity systems, dialogue and localStorage saves; MIT code. Three.js r169 is loaded from jsDelivr and fonts from Google Fonts, so a clean run requires those network resources. No coding-agent subscription is needed to play.",
      "scope": "complete-project",
      "url": "https://github.com/tanuu5/nagi-home"
    },
    "steps": [
      "Place food or throw the ball, then watch Nagi’s activity and diary change.",
      "Read the single index.html to follow daily needs, activity selection, Three.js models and localStorage persistence.",
      "Serve the repository with a static HTTP server or open its HTML in a browser; Three.js and fonts are fetched from external CDNs.",
      "Change one need or activity rule, then check its effect at normal and accelerated time speeds."
    ],
    "title": "Nagi Home",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s Cowork and simulation notes",
      "url": "https://github.com/tanuu5/nagi-home#readme"
    }
  },
  {
    "aiUse": "Zenstory publishes this as a NovelToGame agent-workflow result, with source analysis, rejected concepts, game and art direction, generated artwork, game implementation and QA records. The example does not identify one specific coding client; support for several clients is not proof that all were used.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Three Borrowings of the Banana Fan",
      "note": "Chinese-language browser prototype. Click to walk, interact with marked NPCs and choose battle commands. The author records a desktop completion path; narrow-screen play has separate limitations.",
      "url": "https://xiyouji.vibecoco.ai/"
    },
    "description": "A Chinese turn-based RPG with painted walking maps, quests, equipment, pets and command battles, adapted from the Banana Fan chapters of Journey to the West.",
    "engine": "Custom Canvas 2D · JavaScript · DOM UI",
    "evidence": {
      "label": "Read the creator’s workflow and example record",
      "note": "The creator links the game to the NovelToGame workflow and its adaptation workspace. Published QA is author evidence, not a GameMap reproduction.",
      "url": "https://github.com/zenstory-ai/novel-to-game#play-online"
    },
    "id": "novel-journey-to-west",
    "resourceIds": [],
    "source": {
      "label": "Open the complete adaptation and game",
      "note": "Includes the static game, painted scene and character assets, design workspace and browser QA. No generation API is required to play the committed build. Repository MIT terms and the source/asset ledgers should be read together.",
      "scope": "complete-project",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/journey-to-the-west"
    },
    "steps": [
      "Play the village and use the quest tracker to reach an NPC or a battle.",
      "Compare the novel chapter references with the selected fan, transformation and five-element mechanics.",
      "Read the design, art and QA files to distinguish implemented systems from deliberately omitted multiplayer features.",
      "To run locally, serve examples/journey-to-the-west/build/app with python3 -m http.server 5173; inspect the JavaScript battle implementation before changing a rule."
    ],
    "title": "Journey to the West: Three Borrowings of the Banana Fan",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the adaptation workspace",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/journey-to-the-west"
    }
  },
  {
    "aiUse": "EG30 provides design, direction and writing, using Claude Code and OpenAI Codex for implementation. AI-assisted drafts of player text are edited by the creator. Art and sound effects are drawn or synthesized in code with AI assistance; the Holizna background recordings are separately credited CC0 music.",
    "assetTools": [
      "Canvas 2D (procedural halftone art)"
    ],
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Overexposed on itch.io",
      "note": "Browser playtest build, best on a landscape desktop screen. Uses mouse or touch; cards show effects on hover or long press. Begin, opening text and manager choice reached the live card desk in Chrome. The complete year, all endings and touch play were not tested; the hosted build is not claimed to match the latest repository revision.",
      "url": "https://eg30.itch.io/overexposed"
    },
    "description": "Guide a rising performer through a year of career choices in a card-based fame simulation. Play cards to build craft, money and attention while three newspapers react and excessive heat turns into scandals.",
    "engine": "DOM/CSS + SVG · React UI",
    "evidence": {
      "label": "Read the creator’s AI contribution and asset disclosure",
      "note": "The author names Claude Code and OpenAI Codex and explains human editing of text. README confirms AI-assisted commits with Co-Authored-By trailers; CREDITS.md explains procedural pictures/effects and the separate music/font sources.",
      "url": "https://eg30.itch.io/overexposed"
    },
    "id": "overexposed-ai",
    "resourceIds": [
      "claude-code",
      "codex"
    ],
    "source": {
      "label": "Open the complete career-simulation project",
      "note": "Complete TypeScript/React project with the rule engine, content, UI drawings, procedural sound, six music files, fonts, balance simulator and browser checks. Node.js >=22.18; npm install, npm run dev or npm run build. No explicit software license is provided, so public source availability does not establish reuse rights. Bundled fonts are OFL 1.1 and Holizna music is CC0; see CREDITS.md.",
      "scope": "complete-project",
      "url": "https://github.com/zsh56609/overexposed"
    },
    "steps": [
      "Open the itch.io browser build, choose Begin and Continue, then sign with a manager.",
      "Select an opening card offer and inspect how the desk, resources and newspapers respond.",
      "Read the creator’s AI disclosure, README and CREDITS.md to separate code-generated art and effects from third-party music.",
      "Use Node.js 22.18+ with npm install and npm run dev; trace content/cards.json through core/reducer.ts and the React desk before testing a complete year."
    ],
    "title": "Overexposed",
    "track": "2d",
    "tutorial": {
      "kind": "quickstart",
      "label": "Read the game’s source and local run commands",
      "url": "https://github.com/zsh56609/overexposed#readme"
    }
  },
  {
    "aiUse": "The creator reports generating the game with Claude Opus 5.5 in Claude Code from one Chinese sentence. The README publishes that prompt and describes model-led browser testing and later fixes; the no-manual-code claim is the creator’s, not a measured authorship audit.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Pelican on a Bike",
      "note": "Keyboard and touch controls; W/S accelerate/brake, A/D change lanes, Space jumps and C changes camera. A muted entry is available. Desktop launch, acceleration, jump achievement and camera change were checked.",
      "url": "https://claude-opus-5-5.riba2534.cn/"
    },
    "description": "Ride a helmeted pelican along a procedural coast, change lanes to catch fish, jump and unlock small achievements. The complete Three.js project includes its own character, bicycle, ocean, audio and day/night systems.",
    "engine": "Three.js · JavaScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "Creator-published prompt and session summary, with exact Claude Code attribution. The model-led long-run tests described there were not repeated by GameMap.",
      "url": "https://github.com/riba2534/claude-opus-5-5-demo#readme"
    },
    "id": "pelican-bike-claude",
    "resourceIds": [
      "claude-code",
      "threejs"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete pelican-bike source, build script and procedural assets. Run npm install and node build.mjs in that subdirectory, then open dist/index.html. The repository contains three distinct games; this case selects only the pelican game. Package metadata names ISC, but no repository-wide licence text is supplied.",
      "scope": "complete-project",
      "url": "https://github.com/riba2534/claude-opus-5-5-demo/tree/main/pelican-bike"
    },
    "steps": [
      "Start a muted ride, accelerate with W/S, change lanes with A/D and jump with Space.",
      "Compare the published one-sentence prompt with the pelican, bicycle, cloth, ocean and camera modules.",
      "In pelican-bike, install dependencies and run node build.mjs; open the resulting dist/index.html in a browser.",
      "Change one collection or cycling rule, then check movement, jump, score feedback and restart."
    ],
    "title": "Pelican on a Bike",
    "track": "3d",
    "tutorial": {
      "kind": "prompt",
      "label": "Read the original prompt and development account",
      "url": "https://github.com/riba2534/claude-opus-5-5-demo#readme"
    }
  },
  {
    "aiUse": "MiaAI-Lab identifies the collection as GPT-6 Astra-generated and preserves this game’s exact prompt. The prompt specifies complete matching, reset and rapid-input behavior; the particular chat or coding client and manual refinement are not disclosed.",
    "category": "ai-generated",
    "demo": {
      "kind": "playable",
      "label": "Play Pixel Orchard",
      "note": "English interface; click, tap or focus card buttons with the keyboard. PLANT AGAIN reshuffles and resets the round. No login, installation or network dependencies after loading.",
      "url": "https://miaai-lab.github.io/GPT-6-Astra-100-HTML-Files/013-pixel-orchard.html"
    },
    "description": "Turn over twelve seed packets to find six matching symbol pairs. Track moves, remember mismatches and reshuffle the garden for another short round.",
    "engine": "DOM/CSS · Vanilla JavaScript",
    "evidence": {
      "label": "Read the creator’s generation disclosure",
      "note": "The author describes these as Astra-generated standalone HTML studies; this particular entry includes a complete playable memory-game loop and its exact prompt.",
      "url": "https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/README.md"
    },
    "id": "pixel-orchard-astra",
    "resourceIds": [],
    "source": {
      "label": "Open the complete game project",
      "note": "The single HTML file contains the entire game, inline CSS, shuffled deck, matching, move counter and reset logic. It opens offline without assets, packages or a build step. No explicit code license was observed.",
      "scope": "complete-project",
      "url": "https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.html"
    },
    "steps": [
      "Flip two cards and watch how matches and mismatches behave.",
      "Compare the exact prompt with the complete inline implementation.",
      "Inspect shuffle, turn locking and reset during a delayed mismatch.",
      "Change the deck and complete a round, then verify reset and keyboard access."
    ],
    "title": "Pixel Orchard · Memory Harvest",
    "track": "2d",
    "tutorial": {
      "kind": "prompt",
      "label": "Read the exact game prompt",
      "url": "https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.txt"
    }
  },
  {
    "aiUse": "The creator directs design and architecture while Claude Code writes most code, tests and documentation with specialist agents. Pokemon data, sprites and some PixelLab artwork have separate credits and rights.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Pokemon Tactics",
      "note": "Author-hosted browser demo on itch.io; choose Run game. Includes AI opponents and hot-seat play. An in-development fan project.",
      "url": "https://kekel87.itch.io/pokemon-tactics"
    },
    "description": "Move Pokemon across an isometric battlefield, use elevation and aim area attacks without hitting allies. This playable tactical fan game combines a TypeScript simulation with 2D-HD sprites on Babylon.js terrain.",
    "engine": "Babylon.js · TypeScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "Author explains human direction versus generated implementation; independent itch page repeats AI and art disclosure. Source-checked; full reproduction not performed.",
      "url": "https://github.com/kekel87/pokemon-tactics#built-with-ai"
    },
    "id": "pokemon-tactics-claude",
    "resourceIds": [
      "claude-code"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete pnpm workspace with game core, Pokemon data, Babylon renderer, UI and app assets. package.json requires Node >=24 and pnpm 10.32.1; pnpm install then pnpm dev. Code MIT; many sprites/tiles use CC BY-NC 4.0 and some effect particles have no separate license. Noncommercial fan project; read CREDITS.md.",
      "scope": "complete-project",
      "url": "https://github.com/kekel87/pokemon-tactics"
    },
    "steps": [
      "Play a battle against the built-in opponents and test movement, height, type matchups and friendly fire.",
      "Read the AI disclosure and CREDITS.md before exploring the engine and rendering packages.",
      "Use Node 24 or later and pnpm 10.32.1 to run the complete workspace locally.",
      "Change one tactical rule with an agent, then compare battle resolution, team setup and replay behavior."
    ],
    "title": "Pokemon Tactics",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/kekel87/pokemon-tactics#built-with-ai"
    }
  },
  {
    "aiUse": "Aidan “Botodo” Connolly and Evan Kurtz describe Claude Code helping diagnose problems and implement difficult core logic; they then touched and tweaked all code. They modeled, rigged, animated and designed the game themselves, using credited external audio. They explicitly state that generative AI was not used to create assets. No coding model version is supplied.",
    "assetTools": [
      "Blender",
      "Procreate",
      "Affinity"
    ],
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play or download Polar Icecapade on itch.io",
      "note": "Mouse recommended: left-click performs melee propulsion, right-click shoots with recoil, and Escape pauses. Browser review reached the first level, moved, fired a projectile with ammo changing from 12 to 11, and opened pause. The roughly 170 MB web build has author-documented performance limits; Windows/Linux downloads are provided and mobile is not recommended. Later levels and a complete run were not tested.",
      "url": "https://evankurtzart.itch.io/polar-icecapade"
    },
    "description": "Slide across icy 3D arenas, use a three-hit melee combo to propel yourself forward, and fire projectiles that push you backward. Open gates and collect coins while confronting a rat regime in a short game-jam adventure.",
    "engine": "Godot 4.6 · GDScript · 3D",
    "evidence": {
      "label": "Read the team’s explicit Claude Code assistance statement",
      "note": "The creators distinguish AI help with diagnosing and implementing core code from their own code review, modeling, animation and art. The page links the full game source and identifies Godot 4.6 and GDScript; its “No generative AI” content badge does not erase the separate coding-assistance disclosure.",
      "url": "https://evankurtzart.itch.io/polar-icecapade"
    },
    "id": "polar-icecapade-claude",
    "resourceIds": [
      "claude-code",
      "godot-engine",
      "blender"
    ],
    "source": {
      "label": "Open the complete Godot game project",
      "note": "Complete Godot 4.6 project with levels, GDScript, GLB/FBX models, Blender authoring files, textures, UI and audio. The inspected tree has 292 files, about 239 MB. Open the slick folder; importing Blender authoring files may require a compatible Blender installation. No top-level game license was found; external sounds, music and fonts retain their separately credited terms.",
      "scope": "complete-project",
      "url": "https://github.com/afenkurtz/Big-Mode-Game-Jam-2026/tree/main/slick"
    },
    "steps": [
      "Start the first browser level with a mouse and test the slippery movement and melee combo.",
      "Use right-click shooting and compare its backward recoil with forward melee propulsion.",
      "Read the team’s Claude Code disclosure and human art, animation and audio credits.",
      "Open the slick project folder in Godot 4.6, change one movement or gate rule, and test the first room, ammo and pause/restart controls."
    ],
    "title": "Polar Icecapade",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the team’s development and asset breakdown",
      "url": "https://evankurtzart.itch.io/polar-icecapade"
    }
  },
  {
    "aiUse": "The creator presents Project Plateau as a NovelToGame adaptation built through analysis, concept, world design, art direction, implementation and QA stages. The public workspace includes game code, committed models and textures, asset-generation scripts and the input trace for one tested path; its coding client is not explicitly identified.",
    "assetTools": [
      "Blender"
    ],
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Project Plateau",
      "note": "Desktop landscape browser with WebGL2, keyboard and mouse. Mobile devices may show the creator’s short recorded preview instead of the full game.",
      "url": "https://plateau.vibecoco.ai/"
    },
    "description": "A first-person field-photography expedition inspired by The Lost World: frame prehistoric animals, manage four photographic plates, avoid threats and return to camp before daylight fades.",
    "engine": "Three.js · WebGL2",
    "evidence": {
      "label": "Read the creator’s adaptation and QA account",
      "note": "The author explains the recorded camera-to-result-and-restart route and its limits; GameMap is not claiming to have reproduced that complete route.",
      "url": "https://github.com/zenstory-ai/novel-to-game#what-the-qa-record-admits-it-did-not-test"
    },
    "id": "project-plateau",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the full expedition project",
      "note": "Three.js/Vite game with local runtime models, textures, sound, source adaptation documents and QA inputs. Requires Node 22.12+ for local tooling. Blender scripts are asset-production sources, not required for normal play.",
      "scope": "complete-project",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/project-plateau"
    },
    "steps": [
      "Start the desktop expedition and learn movement, camera, crouching and return-to-camp controls.",
      "Compare how subject framing, cover and photographic plates create choices from the novel’s expedition premise.",
      "Read the build brief and verification record to separate a tested route from untested device, sound and optional encounter behavior.",
      "For local play, enter examples/project-plateau/build/app, use Node 22.12+ to install dependencies, then run npm start; the committed runtime assets do not require Blender regeneration."
    ],
    "title": "Project Plateau: Proof Before Dark",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the expedition build and design workspace",
      "url": "https://github.com/zenstory-ai/novel-to-game/tree/main/examples/project-plateau"
    }
  },
  {
    "aiUse": "Frank Niu links this game from a creator post describing a Claude Sonnet 3.7 web-chat-to-Windsurf workflow: generate an initial game, diagnose issues in chat, then apply changes in Windsurf. It is a human-steered coding example, not evidence that Claude Code or a single autonomous run built it.",
    "category": "ai-assisted",
    "demo": {
      "kind": "download",
      "label": "Download and run Rhythm Master 3D",
      "note": "No public hosted build was verified. Serve the downloaded directory and open rhythm.html. External CDNs supply Three.js and Tone.js, so internet access is needed; a click starts audio.",
      "url": "https://github.com/frankjniu/rhythm-game/archive/refs/heads/main.zip"
    },
    "description": "A four-lane music game with generated synth tracks, difficulty settings, combos and a special mode, implemented as a single browser HTML file.",
    "engine": "Three.js · Tone.js · JavaScript",
    "evidence": {
      "label": "Read the author’s AI tools and prompt disclosure",
      "note": "The creator identifies Claude Sonnet 3.7, describes passing output into Windsurf, and links the exact rhythm-game repository in the same post.",
      "url": "https://www.linkedin.com/posts/frankniu_if-youre-not-vibe-coding-with-claude-sonnet-activity-7304977951761039362-2xQe"
    },
    "id": "rhythm-master-windsurf",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the complete rhythm-game source",
      "note": "The full game is rhythm.html, with procedural music and geometry rather than a separate asset download. Third-party libraries load from CDNs. No repository code license is declared.",
      "scope": "complete-project",
      "url": "https://github.com/frankjniu/rhythm-game"
    },
    "steps": [
      "Download the repository and serve its directory with a local HTTP server, then open rhythm.html.",
      "Choose a track and difficulty, start the game, and use D/F/J/K as notes reach the target zone.",
      "Test combo scoring, Escape pause and the Space special mode before changing timing or difficulty.",
      "Compare the single-file implementation with the creator’s original brief and debugging workflow."
    ],
    "title": "Rhythm Master 3D",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s build workflow",
      "url": "https://www.linkedin.com/posts/frankniu_if-youre-not-vibe-coding-with-claude-sonnet-activity-7304977951761039362-2xQe"
    }
  },
  {
    "aiUse": "Mizchi explicitly used Roo Code, formerly Roo Cline, with Claude 3.5 Sonnet while forbidding direct human code edits. The human supplied an experienced developer’s design, incremental instructions and architecture constraints. The published article includes the workflow and limitations; this is an early prototype.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Action with AI",
      "note": "Early desktop keyboard-and-mouse prototype. WASD moves and holding the mouse button fires; visual polish and a full commercial campaign are outside its scope.",
      "url": "https://action-with-ai.mizchi.workers.dev/"
    },
    "description": "A small SVG top-down action prototype with mouse-aimed shooting, enemies and telegraphed attacks, paired with a detailed account of prompt-driven implementation.",
    "engine": "React · SVG · TypeScript",
    "evidence": {
      "label": "Read the original AI development account",
      "note": "The author names Roo Code and Claude 3.5 Sonnet, explains the no-direct-coding constraint and documents the human design and steering role.",
      "url": "https://zenn.dev/mizchi/articles/game-with-cline"
    },
    "id": "roo-code-action",
    "resourceIds": [],
    "source": {
      "label": "Open the complete action prototype",
      "note": "Complete React/TypeScript project with SVG rendering, movement, collision, combat, shared types, tests and development notes. No repository license file was found in the reviewed tree.",
      "scope": "complete-project",
      "url": "https://github.com/mizchi/action-with-ai"
    },
    "steps": [
      "Move with WASD, aim with the mouse and hold the mouse button to shoot.",
      "Read the original sequence from rendering and movement through enemy health and attack warnings.",
      "Inspect docs/overview.md, the shared types and combat modules alongside the creator’s discussion of documentation drift.",
      "For local study, install the project dependencies with the documented pnpm setup and run pnpm dev, then change one attack or movement rule."
    ],
    "title": "Action with AI: a Roo Code experiment",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s Roo Code experiment",
      "url": "https://zenn.dev/mizchi/articles/game-with-cline"
    }
  },
  {
    "aiUse": "The repository credits code generation to locally running Qwen 3.8 27B, followed by human review, debugging, and extensions. In the linked build account the author identifies Claude Code CLI as the harness with Qwen as its model.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Explore Sakura Crossing",
      "note": "Exploration prototype. WASD walks, Shift runs, mouse drag looks, E talks, F enters/exits the car, and Space/C swims up/down. Touch controls included; mobile performance remains limited.",
      "url": "https://danymaniglie-cmyk.github.io/3d-sakura-crossing/"
    },
    "description": "Explore a cel-shaded Japanese neighbourhood with a working railway crossing, residents, a lifting bridge, a drivable car, and a swimmable river.",
    "engine": "Three.js · JavaScript",
    "evidence": {
      "label": "Read the Qwen and human contribution credit",
      "note": "README explicitly distinguishes locally generated Qwen code from human review, debugging, and extensions. The creator’s linked Reddit build account identifies Claude Code CLI as the harness, not the Claude model.",
      "url": "https://github.com/danymaniglie-cmyk/3d-sakura-crossing#credits"
    },
    "id": "sakura-crossing-qwen",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the complete exploration project",
      "note": "GPL-3.0 source with complete index.html, vendored Three.js, procedural textures, and implementation notes. Run python3 -m http.server 5191 and open localhost:5191/index.html; file:// loading is unsupported. The original author has ended active development. The creator describes an exploration prototype, not a finished campaign; no complete win/loss loop is claimed.",
      "scope": "complete-project",
      "url": "https://github.com/danymaniglie-cmyk/3d-sakura-crossing"
    },
    "steps": [
      "Explore the browser world on foot, then try the car, river, and moving bridge.",
      "Read the credits and the author’s account of using a local Qwen model through Claude Code CLI.",
      "Inspect CARTOON.md and the complete index.html plus vendored Three.js dependency.",
      "Serve a local copy over HTTP, change one interaction, and verify movement and collisions."
    ],
    "title": "3D Sakura Crossing: an exploration prototype",
    "track": "3d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the rendering and implementation recipe",
      "url": "https://github.com/danymaniglie-cmyk/3d-sakura-crossing/blob/main/CARTOON.md"
    }
  },
  {
    "aiUse": "stackloomdev directed iterative GPT-6 Astra work in Codex on story, puzzles, bilingual text, interface, code, saves, procedural WebGL effects and tests. Background illustrations were generated separately; the 3D layer adds depth to point-and-click scenes.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Silent Meridian",
      "note": "English and Chinese; mouse, touch and keyboard. Click objects to investigate; Space changes time, J opens the journal, and Esc closes dialogs. Optional WebGL depth has an illustrated fallback.",
      "url": "https://silent-meridian.pjstack.dev/"
    },
    "description": "Investigate an observatory trapped at 00:17, compare Present and Echo states, and solve thirteen connected puzzles across four chapters with a journal and optional hints.",
    "engine": "Custom JavaScript · DOM/CSS · WebGL · Web Audio",
    "evidence": {
      "label": "Read the human and AI contribution record",
      "note": "Creator-published model roles, iterative workflow and validation limits. It explicitly describes point-and-click scenes rather than a freely walkable 3D world.",
      "url": "https://github.com/stackloomdev/silent-meridian/blob/main/docs/CREATION.md"
    },
    "id": "silent-meridian-codex",
    "resourceIds": [
      "codex"
    ],
    "source": {
      "label": "Open the complete puzzle-game project",
      "note": "Includes all puzzle logic, chapters, illustrations, local saves, audio, tests and design notes. Node.js 22; npm run dev. No backend, API key, CDN or runtime dependencies.",
      "scope": "complete-project",
      "url": "https://github.com/stackloomdev/silent-meridian"
    },
    "steps": [
      "Start the opening chapter and compare the two time states.",
      "Read the creation record and art provenance.",
      "Inspect puzzle rules separately from presentation code.",
      "Modify one clue and verify uniqueness, hints and saved progress."
    ],
    "title": "Silent Meridian",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creation record",
      "url": "https://github.com/stackloomdev/silent-meridian/blob/main/docs/CREATION.md"
    }
  },
  {
    "aiUse": "The official Kiro project says more than 95% of its code was written by prompting Kiro. Its guide uses the actual game to teach steering, bug fixes, refactoring, specifications, hooks, and MCP; AI also generates items and crafting outcomes at runtime.",
    "category": "ai-assisted",
    "demo": {
      "kind": "download",
      "label": "Download and run Spirit of Kiro",
      "note": "No anonymous hosted game is linked by the official project. Local play requires Docker/Podman, an AWS account/credentials and CLI, Bedrock access to supported text models, and deployed Cognito resources. Follow docs/local-setup.md to launch the stack and bootstrap DynamoDB. AWS runtime usage can incur charges; source-checked steps, not executed.",
      "url": "https://github.com/kirodotdev/spirit-of-kiro/archive/refs/heads/main.zip"
    },
    "description": "Find unusual items, combine or transform them on a workshop bench, and sell the results to an AI appraiser in an open-ended crafting game.",
    "engine": "Custom Vue 3 · DOM/CSS sprites · TypeScript",
    "evidence": {
      "label": "Read the official Kiro development disclosure",
      "note": "Official creator statement reports more than 95% prompted code. The core crafting loop is complete; roadmap features and intentionally unfinished challenge-branch tasks remain separate.",
      "url": "https://github.com/kirodotdev/spirit-of-kiro#spirit-of-kiro"
    },
    "id": "spirit-of-kiro",
    "resourceIds": [],
    "source": {
      "label": "Open the complete crafting-game project",
      "note": "MIT-0 game repository with Vue client, Bun server, item-image service, infrastructure, and deployment documentation. Runtime item text and interactions depend on AWS Bedrock; item-image generation has additional optional model requirements.",
      "scope": "complete-project",
      "url": "https://github.com/kirodotdev/spirit-of-kiro"
    },
    "steps": [
      "Read the official setup guide and confirm the AWS model access required for the runtime.",
      "Deploy the Cognito resources, start the client/server stack, and bootstrap the local DynamoDB tables.",
      "Play the discover, craft, and sell loop before attempting the challenge branch.",
      "Follow one guided bug fix or feature change and verify the resulting interaction in the game."
    ],
    "title": "Spirit of Kiro",
    "track": "2d",
    "tutorial": {
      "kind": "tutorial",
      "label": "Follow the official learn-by-playing guide",
      "url": "https://kiro.dev/docs/guides/learn-by-playing/"
    }
  },
  {
    "aiUse": "The creator says Claude Code generated the game, tests and Blender art pipeline from plain-language requests while the human played on a phone and gave feedback. The repository contains the runtime art as well as its source builders.",
    "assetTools": [
      "Blender"
    ],
    "category": "ai-generated",
    "demo": {
      "kind": "playable",
      "label": "Play Sprout Quest",
      "note": "Author-hosted browser adventure designed for portrait phones, with desktop keyboard controls and localStorage saves.",
      "url": "https://aibengineering.github.io/sprout-quest/"
    },
    "description": "Explore a small world, fight real-time arena battles, gather materials, craft gear and rebuild a village. Sprout Quest is a mobile-first adventure with a 2D world and live-rendered 3D characters and items.",
    "engine": "Custom Canvas 2D + Three.js · TypeScript",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "README separates the original build from later human playtest/AI iteration; publishes source modules, generated models and runtime assets, plus a prompt summary. Source-checked; full reproduction not performed.",
      "url": "https://github.com/aibengineering/sprout-quest#how-it-was-built"
    },
    "id": "sprout-quest-claude",
    "resourceIds": [
      "claude-code",
      "threejs",
      "blender"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete game code, runtime GLBs/sprite atlases, Blender scripts and tests. bun install then bun run dev opens localhost:3000; normal builds use committed art and do not require Blender. No root LICENSE was found, so public source visibility does not establish broad reuse permission.",
      "scope": "complete-project",
      "url": "https://github.com/aibengineering/sprout-quest"
    },
    "steps": [
      "Play the portrait-browser prologue and follow its first fight, gathering and forge tasks.",
      "Read the build account to see how human phone playtests guided later Claude Code changes.",
      "Run bun install and bun run dev; inspect the game modules, committed runtime assets and Blender builders.",
      "Change one combat, crafting or story rule with an agent, then replay the affected progression and save flow."
    ],
    "title": "Sprout Quest",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s build account",
      "url": "https://github.com/aibengineering/sprout-quest#how-it-was-built"
    }
  },
  {
    "aiUse": "The author names Cursor with Gemini 2.5 Pro, Claude Opus 4 and Claude Sonnet 4, and links a creation video. The fully AI-generated description is a creator claim; the public source separates the Unity project and Hunyuan model work.",
    "category": "ai-assisted",
    "demo": {
      "kind": "download",
      "label": "Download the Windows game",
      "note": "Windows download, about 397 MB, from release 0.0.1. Extract and run Supermaket Simulator.exe. Other platforms require a source build; the binary was not downloaded or executed in this review.",
      "url": "https://github.com/breineng/supermarket-simulator/releases/download/0.0.1/SupermarketSimulator.zip"
    },
    "description": "Manage a supermarket in first person: order goods, unpack deliveries, stock shelves and serve customers. The creator built this Unity experiment with Cursor and generated the 3D models with Hunyuan.",
    "engine": "Unity 2023.2.6f1 · URP · C#",
    "evidence": {
      "label": "Read the creator’s AI attribution",
      "note": "Author README names coding models, Hunyuan assets, source setup and a linked creation video. Source-checked; full reproduction not performed.",
      "url": "https://github.com/breineng/supermarket-simulator#description"
    },
    "id": "supermarket-simulator-cursor",
    "resourceIds": [
      "unity-engine"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete Unity 2023.2.6f1 project with Assets, Packages and ProjectSettings. Scenes, prefabs and models use Git LFS: clone with LFS and run git lfs pull before opening Assets/Scenes/InitScene.unity. MIT code; Unity, generated models and dependencies retain their terms. LFS objects were not fetched in this review.",
      "scope": "complete-project",
      "url": "https://github.com/breineng/supermarket-simulator"
    },
    "steps": [
      "Download the Windows release and try the order, delivery, stocking and checkout loop.",
      "Read the creator’s build account and linked video to separate coding assistance from generated models.",
      "Clone with Git LFS, fetch the LFS objects and open InitScene in the matching Unity editor.",
      "Adjust one stock, customer or checkout behavior with an agent, then compare a complete customer-service loop."
    ],
    "title": "Supermarket Simulator",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s development disclosure",
      "url": "https://github.com/breineng/supermarket-simulator#description"
    }
  },
  {
    "aiUse": "Olivia used GPT-6 Astra in Codex for combat, ability synergies, procedural environments, interface and debugging. The original Oinja universe, creative direction and playtest feedback came from the creator; development involved repeated sessions and revisions.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play SURGE for Oinja",
      "note": "Desktop WebGL and keyboard. WASD/arrows move, Space dodges, Q releases Sync Burst, and E interacts. Attacks are automatic. English and Chinese; no mobile touch controls.",
      "url": "https://oinja-game.vercel.app/"
    },
    "description": "Shape an electrical build while surviving mechanical swarms across two interactive maps. Automatic attacks leave movement, dodging, upgrades and facility restoration to the player.",
    "engine": "Three.js · Rapier 3D · TypeScript",
    "evidence": {
      "label": "Read the creator’s Codex contribution statement",
      "note": "Submitted by Olivia295, the source repository owner, with explicit human and model responsibilities; not a complete session transcript.",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/106"
    },
    "id": "surge-for-oinja-codex",
    "resourceIds": [
      "codex",
      "threejs"
    ],
    "source": {
      "label": "Open the complete survival-game project",
      "note": "Includes gameplay, physics, models, assets, translations and tests. Requires Node.js 22; run npm ci and npm run dev. No application server or API key is required.",
      "scope": "complete-project",
      "url": "https://github.com/Olivia295/SURGE-for-Oinja"
    },
    "steps": [
      "Start a run and try movement, dodging and automatic attacks.",
      "Read the creator’s contribution disclosure.",
      "Inspect combat, progression and map code under src/surge/.",
      "Change one ability combination and check its effect during a new run."
    ],
    "title": "SURGE for Oinja",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s development account",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/106"
    }
  },
  {
    "aiUse": "MartinDelophy supplied the strategy-game direction and requested more officers, portraits and balance changes. GPT-6 Astra in Codex iterated on rules, interface, data, opponents, saves and tests; a separate image tool generated terrain and portrait atlases.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Three Kingdoms",
      "note": "Simplified Chinese interface, mouse/touch controls, no login or API key. Choose a faction and start. Saves and JSON import/export are local to the current browser.",
      "url": "https://sanguo-jiangshan.vercel.app/"
    },
    "description": "Manage gold and grain, develop cities and command officers across fifteen strongholds. Choose Wei, Shu or Wu and compete with two computer factions to unify the map.",
    "engine": "DOM/CSS + SVG · React",
    "evidence": {
      "label": "Read the explicit Astra-in-Codex attribution",
      "note": "The project initiator’s statement distinguishes human direction, Codex implementation and separately generated bitmap assets. It describes multiple iterations rather than one prompt.",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/three-kingdoms/CREATION.md"
    },
    "id": "three-kingdoms-codex",
    "resourceIds": [
      "codex"
    ],
    "source": {
      "label": "Open the complete game project",
      "note": "Includes rules, interface, 108 officers, generated terrain and portrait atlases, tests and deployment configuration. Node.js 22.13+; npm ci then npm run dev from works/three-kingdoms. Static export uses dist/client. Repository CC0; dependencies retain their own terms.",
      "scope": "complete-project",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/three-kingdoms"
    },
    "steps": [
      "Choose a faction and inspect a city and its officers.",
      "Read the creation record and portrait provenance.",
      "Execute an economic order and follow its resource and officer effects.",
      "Change one economy or combat rule and test turns, opponents and saves."
    ],
    "title": "Three Kingdoms: Hundred Heroes",
    "track": "2d",
    "tutorial": {
      "kind": "build-log",
      "label": "Read the creator’s contribution record",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/three-kingdoms/CREATION.md"
    }
  },
  {
    "aiUse": "Mr.doob credits Claude for assistance with the Three.js port. Quake’s game design and original implementation belong to id Software; this is an AI-assisted port, not a claim that AI created Quake. The README links a creator dev log without identifying a particular Claude client.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Three Quake",
      "note": "Keyboard, mouse and a WebGL-capable browser. The included shareware data covers Episode 1; full-game content is separate.",
      "url": "https://mrdoob.github.io/three-quake/"
    },
    "description": "Play Quake’s shareware episode in a Three.js browser port, and study how an existing shooter’s rendering and runtime were adapted with AI assistance.",
    "engine": "Three.js · JavaScript",
    "evidence": {
      "label": "Read the author’s AI and original-game credits",
      "note": "The maintainer distinguishes id Software’s original game from the Three.js port made with Claude assistance.",
      "url": "https://github.com/mrdoob/three-quake#credits"
    },
    "id": "three-quake-claude-port",
    "resourceIds": [
      "threejs"
    ],
    "source": {
      "label": "Open the complete browser port",
      "note": "Complete browser port, maps, runtime source and tests, with the shareware pak0.pak. Code is GPL-2.0; original Quake game data has separate terms and is not relicensed by the code license.",
      "scope": "complete-project",
      "url": "https://github.com/mrdoob/three-quake"
    },
    "steps": [
      "Open the browser build, start a new single-player game and test the movement and firing controls.",
      "Read the creator’s port credits and dev log alongside the original id Software source reference.",
      "Inspect the browser renderer, game runtime, maps and tests to trace how the existing game was adapted.",
      "Use the included shareware data for Episode 1; a registered full-game data set is separate and must be supplied by its owner."
    ],
    "title": "Three Quake: an AI-assisted Quake port",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the port credits and creator dev log",
      "url": "https://github.com/mrdoob/three-quake#dev-log"
    }
  },
  {
    "aiUse": "The creator publishes the request and reports GPT-6 Astra ultra participation across design, implementation, procedural visuals, synthesized audio and review. It was iterated with collaborating agents; the exact coding client is not explicitly named.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play THUNDERFALL",
      "note": "Chinese interface; keyboard, mouse drag and touch. Attacks fire automatically. WASD/arrows move, Space uses a bomb, E triggers a charged burst, and P/Esc pauses. Full campaign or single-stage practice.",
      "url": "https://thunderfall.vercel.app/"
    },
    "description": "Choose one of three fighters and weave through five sectors of drifting bullets, lasers and bosses. Collect four weapon colors and pick upgrades between stages.",
    "engine": "Canvas 2D · Vanilla JavaScript · Web Audio",
    "evidence": {
      "label": "Read the author-published model participation record",
      "note": "The creator is credited as jackroc; README and PROMPT.md preserve the request, user-reported Astra setting and iterative process. Model attribution is a creator statement, not telemetry.",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/thunderfall/README.md"
    },
    "id": "thunderfall-astra",
    "resourceIds": [],
    "source": {
      "label": "Open the complete game project",
      "note": "Complete ES-module game, procedural assets, design notes and tests. Serve works/thunderfall over HTTP; file:// may block imports. Build/tests use Node built-ins without external packages. Original code, procedural graphics and audio are CC0.",
      "scope": "complete-project",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/thunderfall"
    },
    "steps": [
      "Choose a fighter and start the opening sector.",
      "Read the original request separately from the reconstructed reuse specification.",
      "Inspect the game engine, procedural airframes and rendering modules.",
      "Change one bullet pattern and test bombs, pause and a stage transition."
    ],
    "title": "THUNDERFALL · Skyward Expedition",
    "track": "2d",
    "tutorial": {
      "kind": "prompt",
      "label": "Read the original request and development record",
      "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/thunderfall/PROMPT.md"
    }
  },
  {
    "aiUse": "The creator describes almost all development and generated assets as a GPT-5 experiment, with the preferred heightmap supplied separately and repeated human design changes. The exact coding client is not identified; the project includes its gameplay and rendering source rather than only a model prompt.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Vibe Golf",
      "note": "Small experimental browser golf sandbox. Initial WASM and asset loading can be slow; use a GPU-capable desktop Chrome browser. Click Play, hold/release left mouse to shoot, right-drag to orbit and scroll to zoom. The game currently logs missing optional .meta requests even though the corresponding assets load.",
      "url": "https://ahammer.github.io/vibe_golf/"
    },
    "description": "Charge and release shots across a hilly, prop-filled 3D landscape while chasing moving duck targets in a small arcade golf sandbox.",
    "engine": "Bevy 0.14 + Rapier 0.27 · Rust / WebAssembly",
    "evidence": {
      "label": "Read the human and GPT-5 contribution statement",
      "note": "First-person creator post links both this source and live build, distinguishes the heightmap from generated assets and describes iterative direction. It does not establish use of Codex or another named coding client.",
      "url": "https://www.reddit.com/r/ChatGPT/comments/1mnllsq/vibe_coded_a_3d_game_with_gpt_5_and_rust/"
    },
    "id": "vibe-golf-bevy",
    "resourceIds": [],
    "source": {
      "label": "Open the complete Bevy game",
      "note": "Rust game, Cargo setup, terrain/shaders, audio, GLB props and a prebuilt web/ WASM version are public. Cargo.toml uses Bevy0.14 and Rapier0.27; cargo run launches native play. Asset-heavy repository; code license is marked TBD and asset terms are not consolidated.",
      "scope": "complete-project",
      "url": "https://github.com/ahammer/vibe_golf"
    },
    "steps": [
      "Wait for the browser build to render, then click Play in the middle of the canvas.",
      "Hold and release the left mouse button to launch the ball; use right-drag to orbit and the wheel to zoom.",
      "Read the creator’s account and compare source plugins for terrain, shooting, physics and game state.",
      "Use a local Rust toolchain to run cargo run, change one shot parameter and test launch, movement and target progression."
    ],
    "title": "Vibe Golf",
    "track": "3d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the creator’s GPT-5 development account",
      "url": "https://www.reddit.com/r/ChatGPT/comments/1mnllsq/vibe_coded_a_3d_game_with_gpt_5_and_rust/"
    }
  },
  {
    "aiUse": "Kecksdose names OpenCode as the coding tool and GPT 5.2 Codex as the model. The README publishes a short development disclosure, rather than the original prompts or full conversation.",
    "category": "ai-assisted",
    "demo": {
      "kind": "download",
      "label": "Download and run Vibe Racer",
      "note": "No hosted browser build. Requires Python 3.12+ and Pygame 2.6.1+. Run uv run -m src.main; alternatively pip install -e . then python -m src.main. Arrow keys drive, R restarts, G toggles the ghost, and B returns to track selection. Source-checked launch steps; not executed.",
      "url": "https://github.com/Kecksdose/vibe_racer/archive/refs/heads/main.zip"
    },
    "description": "A top-down time-trial racer with saved best laps, player and creator ghosts, mud surfaces, and a built-in track editor.",
    "engine": "Pygame 2.6 · Python",
    "evidence": {
      "label": "See OpenCode and model attribution",
      "note": "Creator disclosure explicitly names OpenCode and GPT 5.2 Codex. The model name does not imply the Codex coding-agent client was used.",
      "url": "https://github.com/Kecksdose/vibe_racer#development"
    },
    "id": "vibe-racer-opencode",
    "resourceIds": [
      "opencode"
    ],
    "source": {
      "label": "Open the complete racing project",
      "note": "MIT-licensed game source with supplied maps, replays, screenshots, and pyproject.toml/uv.lock. Python 3.12+; the graphical game needs a local desktop display.",
      "scope": "complete-project",
      "url": "https://github.com/Kecksdose/vibe_racer"
    },
    "steps": [
      "Download the source and launch the Pygame window with Python 3.12 or newer.",
      "Race a supplied track and compare the player ghost with the unlockable creator ghost.",
      "Read the development disclosure, then inspect movement, lap timing, and replay storage.",
      "Change a track or handling parameter and complete a validation run before saving."
    ],
    "title": "Vibe Racer",
    "track": "2d",
    "tutorial": {
      "kind": "disclosure",
      "label": "Read the tool and model disclosure",
      "url": "https://github.com/Kecksdose/vibe_racer#development"
    }
  },
  {
    "aiUse": "octopuskid designed and refined the game, while ChatGPT/Codex assisted with code and interface text. The original tune and sound effects are synthesized in code with ChatGPT assistance. Two optional Kevin MacLeod recordings have separate credits; they are not AI-generated music.",
    "category": "ai-assisted",
    "demo": {
      "kind": "playable",
      "label": "Play Word Rain on itch.io",
      "note": "Free browser game with keyboard, drag and touch controls; an alternative browser build is linked on GitHub Pages. The store and GitHub Releases also offer Full/Lite Android APKs and an offline Lite HTML ZIP. Android requires 8.0+. Browser start, moving letters and basket controls were checked; APK installation and a complete scoring run were not tested.",
      "url": "https://octopuskid.itch.io/word-rain"
    },
    "description": "Move a basket to catch letters in the right order, complete shuffled words and survive red hazards. Shields, wildcards, perfect-word streaks and changing falling speed add decisions to the arcade spelling loop.",
    "distribution": [
      {
        "kind": "playable",
        "note": "Alternative author-hosted browser edition; normal start, moving letters and direction-key basket controls were checked.",
        "platform": "GitHub Pages",
        "url": "https://octopuskid.github.io/word-rain/"
      },
      {
        "kind": "download",
        "note": "Version 1.5.3, published 19 October 2026: Full/Lite Android APKs, self-contained Lite HTML/ZIP and the complete offline browser ZIP. Android requires 8.0+. Release page and Lite APK/ZIP HTTP endpoints returned 200; installation was not tested.",
        "platform": "GitHub Releases",
        "url": "https://github.com/octopuskid/word-rain/releases/tag/v1.5.3"
      }
    ],
    "engine": "Canvas 2D · JavaScript · DOM/CSS UI",
    "evidence": {
      "label": "Read the author’s ChatGPT/Codex disclosure",
      "note": "The author explicitly credits ChatGPT/Codex for code and interface text, retaining design and refinement. The repository also links a behind-the-scenes development video. No exact model version is specified.",
      "url": "https://octopuskid.itch.io/word-rain"
    },
    "id": "word-rain-chatgpt",
    "resourceIds": [
      "codex"
    ],
    "source": {
      "label": "Open the complete browser and Android project",
      "note": "Complete index.html, game handwriting font, bundled recordings and audio credits, plus Android Java/WebView source and packaging scripts. Open the HTML with assets/music intact; the original generated tune works without those two recordings. Code, original font, tune and synthesized effects are MIT; Kevin MacLeod recordings are CC BY 4.0. See android/README.md for Android builds.",
      "scope": "complete-project",
      "url": "https://github.com/octopuskid/word-rain"
    },
    "steps": [
      "Start the browser game and move the basket with the arrow keys, A/D or pointer dragging.",
      "Read the creator’s AI disclosure and compare the browser and Android editions.",
      "Open index.html with the bundled assets/music directory, or use the self-contained Lite download for offline browser play.",
      "Trace letter spawning, catches, shields and score updates in the Canvas game; check pause and resume before changing a rule."
    ],
    "title": "Word Rain",
    "track": "2d",
    "tutorial": {
      "kind": "quickstart",
      "label": "Read the creator’s source and run guide",
      "url": "https://github.com/octopuskid/word-rain#run-the-game"
    }
  }
];
