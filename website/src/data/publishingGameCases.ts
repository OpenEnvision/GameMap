import type { LearningPath } from './learningTypes';

// Creator-evidenced games with public complete projects and playable storefront builds.
export const publishingGameCases: LearningPath[] = [
  {
    "id": "katana-kitsune-godot",
    "title": "Katana Kitsune: Prototype",
    "description": "Choose a kitsune fighter and face yokai in an isometric action roguelike with katana combat, stamina, pickups and successive dungeon floors. The silent prototype supports local multiplayer, with additional party systems documented in the current source.",
    "engine": "Godot 4.7 · GDScript · 2D / GL Compatibility",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "The creator identifies Claude Code, GitHub Copilot, GPT Image 2, PixelLab and Meshy among the production tools. The repository documents Meshy rigs and animation, Blender retargeting and PixelOver sprite exports. The exact coding models and division of code between assistants are not specified; generated NPC teammates are not the evidence for AI-assisted development.",
    "assetTools": [
      "GPT Image 2",
      "PixelLab",
      "Meshy",
      "Blender",
      "PixelOver"
    ],
    "steps": [
      "Open the itch prototype and choose one human player, then claim a keyboard and select a costume.",
      "Read the creator’s AI disclosure and the repository’s character, combat and sprite-pipeline notes.",
      "Open project.godot in Godot 4.7 using GL Compatibility; the finished sprites and game scenes are included.",
      "Change one combat or spawn setting, then check the title-to-character-to-dungeon flow, damage and restart."
    ],
    "tutorial": {
      "label": "Read the game and asset-pipeline documentation",
      "url": "https://github.com/9-K9/KatanaKitsune#readme",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play Katana Kitsune on itch.io",
      "url": "https://9-k9.itch.io/katanakitsune",
      "kind": "playable",
      "note": "Silent HTML5 prototype with keyboard and gamepad support. Space confirms player/device choices; allow a clear press and release between setup steps. The browser build loaded and reached player/device selection in review; combat and a complete dungeon run were not exercised. The download is large: about 184 MB of game data plus 40 MB of WebAssembly."
    },
    "source": {
      "label": "Open the complete Godot game project",
      "url": "https://github.com/9-K9/KatanaKitsune",
      "scope": "complete-project",
      "note": "Godot 4.7 project with scenes, GDScript, Dialogic addon and finished sprite assets. The inspected tree contains about 383 MB of files; no top-level game license was found. The upstream Meshy/Blender/PixelOver authoring pipeline is separate, while its finished runtime sprites are committed. The current source contains newer party/asset changes than the reviewed hosted prototype."
    },
    "evidence": {
      "label": "Read the creator’s AI production disclosure",
      "url": "https://9-k9.itch.io/katanakitsune",
      "note": "The author explicitly names Claude Code and GitHub Copilot alongside image, sprite and 3D asset tools, and links the primary complete source repository. The README verifies the Godot version and explains which finished assets are included."
    },
    "resourceIds": [
      "claude-code",
      "godot-engine",
      "pixellab",
      "meshy",
      "blender"
    ]
  },
  {
    "id": "overexposed-ai",
    "title": "Overexposed",
    "description": "Guide a rising performer through a year of career choices in a card-based fame simulation. Play cards to build craft, money and attention while three newspapers react and excessive heat turns into scandals.",
    "engine": "DOM/CSS + SVG · React UI",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "EG30 provides design, direction and writing, using Claude Code and OpenAI Codex for implementation. AI-assisted drafts of player text are edited by the creator. Art and sound effects are drawn or synthesized in code with AI assistance; the Holizna background recordings are separately credited CC0 music.",
    "steps": [
      "Open the itch.io browser build, choose Begin and Continue, then sign with a manager.",
      "Select an opening card offer and inspect how the desk, resources and newspapers respond.",
      "Read the creator’s AI disclosure, README and CREDITS.md to separate code-generated art and effects from third-party music.",
      "Use Node.js 22.18+ with npm install and npm run dev; trace content/cards.json through core/reducer.ts and the React desk before testing a complete year."
    ],
    "tutorial": {
      "label": "Read the game’s source and local run commands",
      "url": "https://github.com/zsh56609/overexposed#readme",
      "kind": "quickstart"
    },
    "demo": {
      "label": "Play Overexposed on itch.io",
      "url": "https://eg30.itch.io/overexposed",
      "kind": "playable",
      "note": "Browser playtest build, best on a landscape desktop screen. Uses mouse or touch; cards show effects on hover or long press. Begin, opening text and manager choice reached the live card desk in Chrome. The complete year, all endings and touch play were not tested; the hosted build is not claimed to match the latest repository revision."
    },
    "source": {
      "label": "Open the complete career-simulation project",
      "url": "https://github.com/zsh56609/overexposed",
      "scope": "complete-project",
      "note": "Complete TypeScript/React project with the rule engine, content, UI drawings, procedural sound, six music files, fonts, balance simulator and browser checks. Node.js >=22.18; npm install, npm run dev or npm run build. No explicit software license is provided, so public source availability does not establish reuse rights. Bundled fonts are OFL 1.1 and Holizna music is CC0; see CREDITS.md."
    },
    "evidence": {
      "label": "Read the creator’s AI contribution and asset disclosure",
      "url": "https://eg30.itch.io/overexposed",
      "note": "The author names Claude Code and OpenAI Codex and explains human editing of text. README confirms AI-assisted commits with Co-Authored-By trailers; CREDITS.md explains procedural pictures/effects and the separate music/font sources."
    },
    "resourceIds": [
      "claude-code",
      "codex"
    ],
    "assetTools": [
      "Canvas 2D (procedural halftone art)"
    ]
  },
  {
    "id": "polar-icecapade-claude",
    "title": "Polar Icecapade",
    "description": "Slide across icy 3D arenas, use a three-hit melee combo to propel yourself forward, and fire projectiles that push you backward. Open gates and collect coins while confronting a rat regime in a short game-jam adventure.",
    "engine": "Godot 4.6 · GDScript · 3D",
    "track": "3d",
    "category": "ai-assisted",
    "aiUse": "Aidan “Botodo” Connolly and Evan Kurtz describe Claude Code helping diagnose problems and implement difficult core logic; they then touched and tweaked all code. They modeled, rigged, animated and designed the game themselves, using credited external audio. They explicitly state that generative AI was not used to create assets. No coding model version is supplied.",
    "assetTools": [
      "Blender",
      "Procreate",
      "Affinity"
    ],
    "steps": [
      "Start the first browser level with a mouse and test the slippery movement and melee combo.",
      "Use right-click shooting and compare its backward recoil with forward melee propulsion.",
      "Read the team’s Claude Code disclosure and human art, animation and audio credits.",
      "Open the slick project folder in Godot 4.6, change one movement or gate rule, and test the first room, ammo and pause/restart controls."
    ],
    "tutorial": {
      "label": "Read the team’s development and asset breakdown",
      "url": "https://evankurtzart.itch.io/polar-icecapade",
      "kind": "build-log"
    },
    "demo": {
      "label": "Play or download Polar Icecapade on itch.io",
      "url": "https://evankurtzart.itch.io/polar-icecapade",
      "kind": "playable",
      "note": "Mouse recommended: left-click performs melee propulsion, right-click shoots with recoil, and Escape pauses. Browser review reached the first level, moved, fired a projectile with ammo changing from 12 to 11, and opened pause. The roughly 170 MB web build has author-documented performance limits; Windows/Linux downloads are provided and mobile is not recommended. Later levels and a complete run were not tested."
    },
    "source": {
      "label": "Open the complete Godot game project",
      "url": "https://github.com/afenkurtz/Big-Mode-Game-Jam-2026/tree/main/slick",
      "scope": "complete-project",
      "note": "Complete Godot 4.6 project with levels, GDScript, GLB/FBX models, Blender authoring files, textures, UI and audio. The inspected tree has 292 files, about 239 MB. Open the slick folder; importing Blender authoring files may require a compatible Blender installation. No top-level game license was found; external sounds, music and fonts retain their separately credited terms."
    },
    "evidence": {
      "label": "Read the team’s explicit Claude Code assistance statement",
      "url": "https://evankurtzart.itch.io/polar-icecapade",
      "note": "The creators distinguish AI help with diagnosing and implementing core code from their own code review, modeling, animation and art. The page links the full game source and identifies Godot 4.6 and GDScript; its “No generative AI” content badge does not erase the separate coding-assistance disclosure."
    },
    "resourceIds": [
      "claude-code",
      "godot-engine",
      "blender"
    ]
  },
  {
    "id": "minimal-rogue-claude",
    "title": "Minimal Rogue",
    "description": "Explore a monochrome dungeon, break blocks, manage stamina and equipment, and descend through an ASCII-style roguelike with English and Japanese interfaces.",
    "engine": "Canvas 2D · Vanilla JavaScript · HTML/CSS UI",
    "track": "2d",
    "category": "ai-generated",
    "aiUse": "Hirotaka Adachi names Claude Code as the development tool and SUNO AI for music, and describes the work as entirely AI-created. The exact coding model is not identified. The public project contains the game renderer, rules, interface and four music files; the creator’s claim does not establish autonomous development without human direction.",
    "steps": [
      "Run the browser game, choose a new game and language, and confirm the opening and tutorial with Enter.",
      "Use the arrow keys to explore the first room, Space to defend and X to open the command menu.",
      "Read the creator’s AI disclosure and inspect the complete HTML, CSS, JavaScript and music files.",
      "Serve the source folder over HTTP, change one room or stamina rule, and check movement, interactions and a new run."
    ],
    "tutorial": {
      "label": "Read the creator’s AI and source-code notes",
      "url": "https://hirotaka-adachi.itch.io/minimal-rogue",
      "kind": "disclosure"
    },
    "demo": {
      "label": "Play Minimal Rogue on itch.io",
      "url": "https://hirotaka-adachi.itch.io/minimal-rogue",
      "kind": "playable",
      "note": "Browser keyboard game. Enter confirms the opening and tutorial; arrows move, Space defends, and X opens the menu. A short first-floor run verified movement, block-cracking feedback and the command menu. Later floors, saves and a complete run were not tested."
    },
    "source": {
      "label": "Open the complete game project",
      "url": "https://github.com/HirotakaAdachi/Rogue/tree/anonymous-release",
      "scope": "complete-project",
      "note": "Complete static HTML/CSS/JavaScript project and four MP3 tracks; serve the root over HTTP without a package install or build step. MIT code license is included; SUNO music is credited without a separate music license. The reviewed public source index references script version 549, while the itch build references 581, so the two releases are not claimed to be byte-identical."
    },
    "evidence": {
      "label": "Read the author’s Claude Code and SUNO attribution",
      "url": "https://hirotaka-adachi.itch.io/minimal-rogue",
      "note": "The creator identifies Claude Code for development, SUNO AI for music, links the complete repository and explicitly describes the work as created entirely using AI. No model version or full development transcript is supplied."
    },
    "resourceIds": [
      "claude-code"
    ]
  },
  {
    "id": "word-rain-chatgpt",
    "title": "Word Rain",
    "description": "Move a basket to catch letters in the right order, complete shuffled words and survive red hazards. Shields, wildcards, perfect-word streaks and changing falling speed add decisions to the arcade spelling loop.",
    "engine": "Canvas 2D · JavaScript · DOM/CSS UI",
    "track": "2d",
    "category": "ai-assisted",
    "aiUse": "octopuskid designed and refined the game, while ChatGPT/Codex assisted with code and interface text. The original tune and sound effects are synthesized in code with ChatGPT assistance. Two optional Kevin MacLeod recordings have separate credits; they are not AI-generated music.",
    "steps": [
      "Start the browser game and move the basket with the arrow keys, A/D or pointer dragging.",
      "Read the creator’s AI disclosure and compare the browser and Android editions.",
      "Open index.html with the bundled assets/music directory, or use the self-contained Lite download for offline browser play.",
      "Trace letter spawning, catches, shields and score updates in the Canvas game; check pause and resume before changing a rule."
    ],
    "tutorial": {
      "label": "Read the creator’s source and run guide",
      "url": "https://github.com/octopuskid/word-rain#run-the-game",
      "kind": "quickstart"
    },
    "demo": {
      "label": "Play Word Rain on itch.io",
      "url": "https://octopuskid.itch.io/word-rain",
      "kind": "playable",
      "note": "Free browser game with keyboard, drag and touch controls; an alternative browser build is linked on GitHub Pages. The store and GitHub Releases also offer Full/Lite Android APKs and an offline Lite HTML ZIP. Android requires 8.0+. Browser start, moving letters and basket controls were checked; APK installation and a complete scoring run were not tested."
    },
    "source": {
      "label": "Open the complete browser and Android project",
      "url": "https://github.com/octopuskid/word-rain",
      "scope": "complete-project",
      "note": "Complete index.html, game handwriting font, bundled recordings and audio credits, plus Android Java/WebView source and packaging scripts. Open the HTML with assets/music intact; the original generated tune works without those two recordings. Code, original font, tune and synthesized effects are MIT; Kevin MacLeod recordings are CC BY 4.0. See android/README.md for Android builds."
    },
    "evidence": {
      "label": "Read the author’s ChatGPT/Codex disclosure",
      "url": "https://octopuskid.itch.io/word-rain",
      "note": "The author explicitly credits ChatGPT/Codex for code and interface text, retaining design and refinement. The repository also links a behind-the-scenes development video. No exact model version is specified."
    },
    "resourceIds": [
      "codex"
    ],
    "distribution": [
      {
        "platform": "GitHub Pages",
        "url": "https://octopuskid.github.io/word-rain/",
        "kind": "playable",
        "note": "Alternative author-hosted browser edition; normal start, moving letters and direction-key basket controls were checked."
      },
      {
        "platform": "GitHub Releases",
        "url": "https://github.com/octopuskid/word-rain/releases/tag/v1.5.3",
        "kind": "download",
        "note": "Version 1.5.3, published 19 October 2026: Full/Lite Android APKs, self-contained Lite HTML/ZIP and the complete offline browser ZIP. Android requires 8.0+. Release page and Lite APK/ZIP HTTP endpoints returned 200; installation was not tested."
      }
    ]
  }
];
