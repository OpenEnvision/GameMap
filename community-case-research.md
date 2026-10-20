# Community AI game case review

Trace game cases back to creator build notes, playable releases, and source projects. Use the candidate records below for discovery, or open the [case guide](tutorials-and-demos.md) to study a complete project.

The dated audit notes below preserve findings from individual research and runtime checks. Source-tree snapshots, intermediate captures, console/action logs, and contact sheets were temporary working files; they are not distributed as repository downloads. For the previews included in this project, use the [published media manifest](./assets/media/learning/manifest.json) and [media source guide](media-sources.md), which record delivered assets and their provenance. The manifest is not a replacement for the complete temporary runtime logs.

## Playable-source and engine review — 2026-10-20

This pass prioritizes complete game source and an accessible hosted build or packaged release. Thirteen distinct games are added: twelve received a brief browser interaction check; the Java ME release was downloaded and its archive/manifest checked without executing an emulator. The previous seventy cases remain. Models and coding clients retain the creator’s stated attribution; a model name alone does not establish its client.

| Game | Runtime engine / renderer | Asset tools | Creator AI evidence | Complete source | Play / package |
| --- | --- | --- | --- | --- | --- |
| 8-Second Crew · 8초 도둑단 | Canvas 2D · Vanilla JavaScript · HTML/CSS UI | Agent Sprite Forge | [Creator record](https://github.com/sdj3261/openai_game_2026#codex와-함께-만든-과정) | [Project](https://github.com/sdj3261/openai_game_2026) | [Play](https://sdj3261.github.io/openai_game_2026/) |
| Core Business | Three.js · JavaScript | Blender · ElevenLabs | [Creator record](https://github.com/Leichtbier/core-business#readme) | [Project](https://github.com/Leichtbier/core-business) | [Play](https://leichtbier.github.io/core-business/) |
| Vibe Golf | Bevy 0.14 + Rapier 0.27 · Rust / WebAssembly | — | [Creator record](https://www.reddit.com/r/ChatGPT/comments/1mnllsq/vibe_coded_a_3d_game_with_gpt_5_and_rust/) | [Project](https://github.com/ahammer/vibe_golf) | [Play](https://ahammer.github.io/vibe_golf/) |
| Fang the Fox · Game Boy Color | GBDK-2020 4.5 · C / hUGEDriver | — | [Creator record](https://tinybitadventures.com/fang-the-fox-on-the-game-boy-color/) | [Project](https://github.com/TinyBitAdventures/fang-the-fox) | [Play](https://tinybitadventures.com/games/fang-the-fox-gbc/) |
| Three Kingdoms: Hundred Heroes | DOM/CSS + SVG · React | — | [Creator record](https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/three-kingdoms/CREATION.md) | [Project](https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/three-kingdoms) | [Play](https://sanguo-jiangshan.vercel.app/) |
| Pelican on a Bike | Three.js · JavaScript | — | [Creator record](https://github.com/riba2534/claude-opus-5-5-demo#readme) | [Project](https://github.com/riba2534/claude-opus-5-5-demo/tree/main/pelican-bike) | [Play](https://claude-opus-5-5.riba2534.cn/) |
| Fishslop | Three.js · TypeScript · Web Audio | — | [Creator record](https://github.com/vasu-devs/FishSlop_Opus5.5/commit/e7a7a2dd61b6da92f9512ccabafad13e1e9a3df4) | [Project](https://github.com/vasu-devs/FishSlop_Opus5.5) | [Play](https://vasu-devs.github.io/FishSlop_Opus5.5/) |
| Clock Out Unseen | Canvas 2D · React UI | — | [Creator record](https://github.com/Ryan-fm/clockout-unseen/blob/main/docs/DEVELOPMENT.md) | [Project](https://github.com/Ryan-fm/clockout-unseen) | [Play](https://www.bilibili.com/toy/clockout-unseen/index.html) |
| Nagi Home | Three.js r169 · JavaScript | — | [Creator record](https://github.com/tanuu5/nagi-home#readme) | [Project](https://github.com/tanuu5/nagi-home) | [Play](https://tanuu5.github.io/nagi-home/) |
| THUNDERFALL · Skyward Expedition | Canvas 2D · Vanilla JavaScript · Web Audio | — | [Creator record](https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/main/works/thunderfall/README.md) | [Project](https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/main/works/thunderfall) | [Play](https://thunderfall.vercel.app/) |
| Fruit Ninja Dojo · One More Slice | Canvas 2D · Vanilla JavaScript · HTML/CSS UI | — | [Creator record](https://linux.do/t/topic/2857340) | [Project](https://github.com/yongqixue99-hue/fruit-ninja-dojo) | [Play](https://fruit-ninja-dojo-20260905.yongqixue666.chatgpt.site/) |
| Pixel Orchard · Memory Harvest | DOM/CSS · Vanilla JavaScript | — | [Creator record](https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/README.md) | [Project](https://github.com/MiaAI-Lab/GPT-6-Astra-100-HTML-Files/blob/main/013-pixel-orchard.html) | [Play](https://miaai-lab.github.io/GPT-6-Astra-100-HTML-Files/013-pixel-orchard.html) |
| Butch Graves 3D | Custom fixed-point raycaster · Java MIDP 2.0 / CLDC 1.0 | — | [Creator record](https://github.com/WollyMonjac/ButchGraves3D#butch-graves-3d) | [Project](https://github.com/WollyMonjac/ButchGraves3D) | [Package](https://github.com/WollyMonjac/ButchGraves3D/tree/main/dist) |

The two games selected from awesome-gpt-6-astra have independent source directories and unrelated mechanics: THUNDERFALL is a Canvas shooter and Three Kingdoms is a DOM/SVG strategy game. Pixel Orchard is one complete matching game selected from a larger HTML study collection, not a card per visual experiment. The selected Pelican game is not multiplied into the other games in its repository. New source/demo URLs and titles were compared against the existing gallery, including normalized source-directory identities. Fang GBC is a cartridge implementation, not another copy of an existing GameMap entry.

### Runtime checks and boundaries

- 8-Second Crew: normal start, movement and X recording advanced the HUD to turn 2 / one clone.
- THUNDERFALL: start, movement and a bomb yielded score 200 and visible combat.
- Three Kingdoms: farming changed money and agriculture level; End turn began opponent actions.
- Fruit Ninja Dojo: ordinary mouse slicing showed score 8 and a four-fruit combo.
- Pixel Orchard: revealing two cards increased the move counter.
- Clock Out Unseen: normal-level start and movement advanced the timer 150→149. The README’s V1 hosting note differs from observed V2-style features; the exact deployed revision is not claimed.
- Pelican on a Bike: muted start, acceleration, jump achievement and camera change.
- Fishslop: steering, food, coin feedback and a recharging sonar HUD.
- Nagi Home: food placed on the room floor and ball thrown; diary feedback and ball activity appeared.
- Core Business: normal start/transmission and movement/drilling input reached score 25 with fuel/depth feedback using Metal. Initial default-headless shader preparation stalled; the game code was not edited.
- Fang GBC: normal new game, opening dialogue and movement; player position and island-edge feedback changed.
- Vibe Golf: Play and mouse charge/release produced ball movement and speed 24.30 m/s; target/scoring completion was not established. Optional asset .meta requests return 404.
- Butch Graves: the 1,679,547-byte JAR contained 444 archive entries and the expected MIDP 2.0 / CLDC 1.0 manifest. An emulator remains required and was not executed.

### Existing engine and duplicate audit

All seventy existing runtime labels were checked against direct source imports, renderer calls or native project configuration. Build tools, coding-agent tools and asset-production tools are not treated as game engines. The visible labels now distinguish custom Canvas 2D, DOM/SVG, native WebGL, Phaser and the named 3D engines. Blender and other confirmed asset tools have their own field on cards and detail pages. Sprout Quest uses both Canvas 2D and Three.js; Mini KSP’s separate Three.js construction workbench does not classify its playable Canvas game as Three.js.

| Existing game | Runtime engine / renderer | Confirmed asset tools | Runtime source |
| --- | --- | --- | --- |
| IsoCity | Custom Canvas 2D · TypeScript | — | [Source file](https://github.com/amilich/isometric-city/blob/main/src/components/game/CanvasIsometricGrid.tsx#L973) |
| Project Plateau: Proof Before Dark | Three.js · WebGL2 | Blender | [Source file](https://github.com/zenstory-ai/novel-to-game/blob/main/examples/project-plateau/build/app/src/main.js#L110) |
| SURGE for Oinja | Three.js · Rapier 3D · TypeScript | — | [Source file](https://github.com/Olivia295/SURGE-for-Oinja/blob/main/src/surge/renderer.ts#L87) |
| DEEP YELLOW | Godot 4.6 · GDScript | — | [Source file](https://github.com/aebrer/deep-yellow/blob/master/project.godot#L20) |
| morBreaker | Unity 6 · URP · C# | — | [Source file](https://github.com/KingMordas/mor-breaker/blob/main/ProjectSettings/ProjectVersion.txt#L1) |
| Silent Meridian | Custom JavaScript · DOM/CSS · WebGL · Web Audio | — | [Source file](https://github.com/stackloomdev/silent-meridian/blob/main/src/scene-depth.js#L188) |
| Castle Clash Duel | Phaser 3 · JavaScript | — | [Source file](https://github.com/chongdashu/phaserjs-tinyswords/blob/main/public/index.html#L4340) |
| Golden Hour Skatepark | Three.js · TypeScript | Blender | [Source file](https://github.com/StarKnightt/skate-park/blob/main/src/game.ts#L121) |
| Vibe Racer | Pygame 2.6 · Python | — | [Source file](https://github.com/Kecksdose/vibe_racer/blob/main/src/render.py#L3) |
| Journey to the West: Three Borrowings of the Banana Fan | Custom Canvas 2D · JavaScript · DOM UI | — | [Source file](https://github.com/zenstory-ai/novel-to-game/blob/main/examples/journey-to-the-west/build/app/js/overworld.js#L24) |
| Clowder & Crest | Phaser 3 · TypeScript | — | [Source file](https://github.com/JacobStephens2/clowder-and-crest/blob/main/src/main.ts#L170) |
| Pokemon Tactics | Babylon.js · TypeScript | — | [Source file](https://github.com/kekel87/pokemon-tactics/blob/main/packages/app/src/renderer-backend.ts#L1) |
| Rhythm Master 3D | Three.js · Tone.js · JavaScript | — | [Source file](https://github.com/frankjniu/rhythm-game/blob/main/rhythm.html#L820) |
| Spirit of Kiro | Custom Vue 3 · DOM/CSS sprites · TypeScript | — | [Source file](https://github.com/kirodotdev/spirit-of-kiro/blob/main/client/src/components/PlayerCharacter.vue#L376) |
| IsoCoaster | Custom Canvas 2D · TypeScript | — | [Source file](https://github.com/amilich/isometric-city/blob/main/src/components/coaster/CoasterGrid.tsx#L2625) |
| Astra Floor | Three.js · TypeScript (React UI) | — | [Source file](https://github.com/BEROCHLU/astrafloor/blob/main/lib/game.ts#L379) |
| Mosswing | Three.js · JavaScript · WebGL | — | [Source file](https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/main/mosswing/src/game.js#L40) |
| Sprout Quest | Custom Canvas 2D + Three.js · TypeScript | Blender | [Source file](https://github.com/aibengineering/sprout-quest/blob/main/src/main.ts#L32) |
| Claude Dreaming | Godot 4.7 · GDScript | — | [Source file](https://github.com/moritzfh/claude-dreaming/blob/main/project.godot#L15) |
| 3D Sakura Crossing: an exploration prototype | Three.js · JavaScript | — | [Source file](https://github.com/danymaniglie-cmyk/3d-sakura-crossing/blob/main/index.html#L114) |
| Magic Carpet Wizard · A Thousand Skies | Three.js · JavaScript | — | [Source file](https://github.com/threapchills/MagicCarpetWizard/blob/main/src/main.js#L33) |
| Supermarket Simulator | Unity 2023.2.6f1 · URP · C# | — | [Source file](https://github.com/breineng/supermarket-simulator/blob/main/ProjectSettings/ProjectVersion.txt#L1) |
| Arkanoid Neon | Custom Canvas 2D · JavaScript · Web Audio | — | [Source file](https://github.com/Jack-c3l2w/arkanoid-neon/blob/main/game.js#L153) |
| Crown Defender TD 3D · Codex build | Three.js · JavaScript | — | [Source file](https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/game.js#L244) |
| Three Quake: an AI-assisted Quake port | Three.js · JavaScript | — | [Source file](https://github.com/mrdoob/three-quake/blob/main/src/vid.js#L185) |
| Action with AI: a Roo Code experiment | React · SVG · TypeScript | — | [Source file](https://github.com/mizchi/action-with-ai/blob/HEAD/src/renderer/App.tsx#L1) |
| Cloud Crush: Gemini CLI builds a match-3 game | Ebitengine 2 · Go / WebAssembly | — | [Source file](https://github.com/GoogleCloudPlatform/devrel-demos/blob/HEAD/codelabs/gemini-cli/gemini-cli-match3-golang/main.go#L14) |
| Dinosaur Game Offline: Gemini CLI-assisted runner | DOM / CSS · JavaScript | — | [Source file](https://github.com/tonidevvn/dinosaur-game-offline/blob/HEAD/script.js#L75) |
| Moonlight & Mayhem | Three.js · JavaScript | gpt-image-2 | [Source file](https://github.com/simonw/raccoon-heist-codex/blob/HEAD/src/game.js#L1) |
| TRON: EXONIX | Godot 4.7 · GDScript | Blender · Nano Banana · PATINA · Tripo · Stable Audio · ElevenLabs | [Source file](https://github.com/witnesstodark/tron-exonix/blob/HEAD/game/project.godot#L15) |
| Tetris built by an AI agent team | Canvas 2D · JavaScript | — | [Source file](https://github.com/caiguanhao/tetris/blob/HEAD/js/renderer.js#L10) |
| Tower of Time: prompting a rewind mechanic | Phaser 3 · TypeScript | — | [Source file](https://github.com/maciej-trebacz/tower-of-time-game/blob/HEAD/src/main.ts#L1) |
| Raccoon Heist | Three.js · JavaScript | gpt-image-2 | [Source file](https://github.com/simonw/raccoon-heist/blob/HEAD/js/main.js#L4) |
| Hajimi Defense: The Tuna Crisis | Phaser 3 · TypeScript | — | [Source file](https://yelonhu.github.io/OpenGame-landing-page/games/hajimi/assets/index-Be3e4nNy.js) |
| Marvel Avengers: Infinity Strike | Phaser 3 · TypeScript | — | [Source file](https://yelonhu.github.io/OpenGame-landing-page/games/marvel/assets/index-ClG0C0ss.js) |
| Harry Potter: Arithmancy Academy | Phaser 3 · TypeScript | — | [Source file](https://yelonhu.github.io/OpenGame-landing-page/games/harryPotter/assets/index-BQiJ9jNZ.js) |
| Star Wars: Mandalorian Protocol | Phaser 3 · TypeScript | — | [Source file](https://yelonhu.github.io/OpenGame-landing-page/games/starWars/assets/index-DDnJ5zpE.js) |
| Turbo Kart Rally | Three.js · JavaScript | — | [Source file](https://github.com/bridge-mind/turbo-kart-rally/blob/HEAD/src/main.js#L2) |
| Long Wind | Three.js · JavaScript | Tripo · Adobe Mixamo | [Source file](https://github.com/jbang2004/long-wind/blob/HEAD/src/core/app.js#L16) |
| NOVA LANCER | Three.js · JavaScript | — | [Source file](https://github.com/tanuu5/nova-lancer/blob/HEAD/src/gfx.js#L2) |
| Orb Shooter | Three.js · JavaScript | — | [Source file](https://github.com/theredstapler/orb-shooter/blob/HEAD/src/main.js#L2) |
| Operation Naptime · Operación Siesta | Three.js + Rapier · JavaScript | — | [Source file](https://github.com/alandaitch/operacion-siesta/blob/HEAD/src/core/engine.js#L26) |
| Ombres | React Three Fiber · TypeScript | — | [Source file](https://github.com/briossant/ombres/blob/HEAD/src/host/render/WorldCanvas.tsx#L8) |
| Dragon’s Reach | Three.js · JavaScript | — | [Source file](https://github.com/jaydemks/ImADragon_onepromptcode_game/blob/HEAD/src/core/Engine.js#L10) |
| Vibe Jet | Three.js · JavaScript | — | [Source file](https://github.com/cedrickchee/vibe-jet/blob/HEAD/game.html#L40) |
| Slide Rush | Three.js · JavaScript | — | [Source file](https://github.com/KJLKurt/waterslide-game-opus-5.5/blob/HEAD/src/App.js#L1) |
| The Tithe | Three.js · JavaScript | — | [Source file](https://github.com/miguelsolorio/the-tithe/blob/HEAD/src/main.js#L1) |
| Michi-Neko · The Cat Philosopher’s Path | Three.js · JavaScript | — | [Source file](https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path/blob/HEAD/src/main.js#L1) |
| FragArena | Three.js · JavaScript | — | [Source file](https://github.com/jonnyleigh/fragarena/blob/HEAD/js/renderer.js#L11) |
| GothicVania: Codex builds a platformer | Phaser 3 · JavaScript | — | [Source file](https://github.com/acatovic/gothicvania-codex-demo/blob/main/index.html#L36) |
| Pixel Princess: a complete arcade campaign | KAPLAY · JavaScript | — | [Source file](https://github.com/VTvito/pixel-princess-platformer/blob/main/src/kaplayCtx.js#L7) |
| Claude Code Tower Defense | PixiJS · TypeScript / Next.js | — | [Source file](https://github.com/mdkess/claude-game/blob/main/src/game/Game.ts#L1) |
| Cursor’s procedural platformer experiment | Canvas 2D · TypeScript | — | [Source file](https://github.com/commjoen/generated-game-experiment/blob/main/src/main.ts#L11) |
| Mini Snake: a Claude conversation game | Canvas 2D · JavaScript | — | [Source file](https://github.com/BizShibe/claude-ai-mini-snake-game/blob/main/index.html#L459) |
| Flux: Codex gravity-flip runner | Canvas 2D · JavaScript | — | [Source file](https://github.com/scriptedbyshivam/codex-hackathon-2026/blob/main/index.html#L117) |
| Bash Fighter: an agent-developed multiplayer brawler | PixiJS · TypeScript | — | [Source file](https://github.com/Bash-Entertainment/bash-fighter/blob/main/packages/render/src/stage.ts#L7) |
| Running Man: Claude Code meets PixelLab | Canvas 2D · JavaScript | — | [Source file](https://github.com/balbonits/ai-browser-game-demos/blob/main/public/games/running-man/main.js#L33) |
| Garden Match: agents build and review a puzzle game | Phaser 3 · TypeScript | — | [Source file](https://github.com/kevinchenkai/GameAI/blob/main/garden/web/src/main.ts#L7) |
| Dunkirk: an honestly documented AI-assisted shooter | Godot 4.6 · GDScript | — | [Source file](https://github.com/Ponloe/dunkirk-godot/blob/main/project.godot#L19) |
| Gravity Birds: Grok Bot directs Cursor | Godot 4.3 · GDScript | — | [Source file](https://github.com/az9713/grokbot-game-dev-demo/blob/main/project.godot#L16) |
| Quasar Saz: an unusual Claude Code experiment | Godot 4.6 .NET · C# | — | [Source file](https://github.com/cleak/quasar-saz/blob/master/project.godot#L16) |
| Agent Arcade: Copilot builds desktop arcade games | Phaser · TypeScript / Tauri | — | [Source file](https://github.com/DanWahlin/agent-arcade/blob/main/src/game/game.ts#L60) |
| Space Shooter: a family Cursor experiment | Canvas 2D · JavaScript | — | [Source file](https://github.com/littleearth/vibe-coded-games/blob/main/shooter/game.js#L175) |
| Destruction Derby Arena | Canvas 2D · JavaScript | — | [Source file](https://github.com/littleearth/vibe-coded-games/blob/main/demoderby/game.js#L4) |
| Beach Kitty | Phaser 3 · React · TypeScript | — | [Source file](https://github.com/matthewod11-stack/CatRunner/blob/main/components/PhaserGame.tsx#L2) |
| Pirate Fleet Commander | Canvas 2D · JavaScript | — | [Source file](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pirate%20Fleet%20Commander%20v7.4.html#L425) |
| Kymograph | HTML / SVG · JavaScript · Web Audio | — | [Source file](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Kymograph%20v4.html#L228) |
| Midnight Pumpkin Hunt | Three.js · JavaScript | — | [Source file](https://github.com/JoeySalmons/vibe-coded-games/blob/main/Pumpkin%20Hunt%20Horror%20Game%20v3.html#L61) |
| Snake: Neon Arcade Edition | Canvas 2D · JavaScript | — | [Source file](https://github.com/TwitchCaptain/snake/blob/main/game.js#L7) |
| Mini KSP: a Chinese rocket sandbox | Canvas 2D · JavaScript | — | [Source file](https://github.com/BairlyEmei/mini-ksp/blob/main/js/game.js#L1283) |

Existing source repositories were normalized to their current owner/repository identities and the seventy final demo/download addresses compared after redirects. No hidden alias, renamed-repository duplicate or shared final game URL was found. Known shared repositories retain separate game implementations: IsoCity/IsoCoaster, the two NovelToGame adaptations, the four OpenGame archives, the two Little Earth games and three distinct Joey Salmons HTML games. Simon Willison’s two raccoon games have separate source, objectives and worlds.

### Candidates retained outside this addition

| Candidate | Why it is not one of the new playable cases |
| --- | --- |
| [Pocket Bomber](https://github.com/chongdashu/love2d-pocket-bomber-game) | Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed. |
| [Bomb Jack Go](https://github.com/teedjay/go-bombjack) | Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed. |
| [Opus FPS](https://github.com/frankhale/opus-fps) | Complete source and creator gameplay media, but no hosted game or packaged release was verified; required local LÖVE, Go/WASM or Godot execution was not performed. |
| [CoEngineers Games](https://github.com/highlandhodl/coengineers-os-games) | Complete Phaser collection with an explicit Claude Code workflow, but no hosted play link or local execution was completed in this pass. Its modes are not multiplied into separate cases. |
| [Not Mortal Kombat](https://github.com/jc-able/not-mortal-kombat) | Public code deliberately omits roughly 770 MB of character/cinematic binaries; do not equate the code-only checkout with a complete playable asset package. |
| [Starball Run / Codex GameDev Harness](https://github.com/ddalkakgames/codex-gamedev-harness) | Unreal workflow and vertical-slice planning evidence, without a verified complete delivered game package or public playable build in this pass. It is not used to create an Unreal case just to fill a category. |

## Expanded source review — 2026-10-20

Search covered creator repositories, developer accounts, engine communities and public game directories. Directory rows were leads; the table below links the creator evidence and actual project for each addition. The original cases remain in the gallery. IsoCity/IsoCoaster share one implementation repository but expose distinct games; the two NovelToGame entries adapt different works into different game systems. Isometric Canvas games remain 2D, while 3D terrain or first-person projects are marked 3D.

| Game | Creator AI evidence | Complete project | Play / run | Preview origin |
| --- | --- | --- | --- | --- |
| IsoCity | [Creator record](https://github.com/amilich/isometric-city#readme) | [Source](https://github.com/amilich/isometric-city) | [Browser](https://iso-city.com) | creator-screenshot |
| Project Plateau: Proof Before Dark | [Creator record](https://github.com/zenstory-ai/novel-to-game#what-the-qa-record-admits-it-did-not-test) | [Source](https://github.com/zenstory-ai/novel-to-game/tree/main/examples/project-plateau) | [Browser](https://plateau.vibecoco.ai/) | creator-screenshot |
| SURGE for Oinja | [Creator record](https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/106) | [Source](https://github.com/Olivia295/SURGE-for-Oinja) | [Browser](https://oinja-game.vercel.app/) | creator-screenshot |
| DEEP YELLOW | [Creator record](https://github.com/aebrer/deep-yellow/blob/master/CREDITS.md#code-and-design) | [Source](https://github.com/aebrer/deep-yellow) | [Browser](https://aebrer.itch.io/deep-yellow) | creator-screenshot |
| morBreaker | [Creator record](https://github.com/KingMordas/mor-breaker#built-with-claude-code-) | [Source](https://github.com/KingMordas/mor-breaker) | [Download / local](https://github.com/KingMordas/mor-breaker/releases/tag/v1.2.0) | local-capture |
| Silent Meridian | [Creator record](https://github.com/stackloomdev/silent-meridian/blob/main/docs/CREATION.md) | [Source](https://github.com/stackloomdev/silent-meridian) | [Browser](https://silent-meridian.pjstack.dev/) | creator-screenshot |
| Castle Clash Duel | [Creator record](https://github.com/chongdashu/phaserjs-tinyswords#implementation-with-agent-skills) | [Source](https://github.com/chongdashu/phaserjs-tinyswords) | [Browser](https://vibe-tiny-swords.vercel.app/) | creator-screenshot |
| Golden Hour Skatepark | [Creator record](https://github.com/StarKnightt/skate-park#how-it-was-built) | [Source](https://github.com/StarKnightt/skate-park) | [Browser](https://starknightt.github.io/skate-park/) | creator-screenshot |
| Vibe Racer | [Creator record](https://github.com/Kecksdose/vibe_racer#development) | [Source](https://github.com/Kecksdose/vibe_racer) | [Download / local](https://github.com/Kecksdose/vibe_racer/archive/refs/heads/main.zip) | creator-screenshot |
| Journey to the West: Three Borrowings of the Banana Fan | [Creator record](https://github.com/zenstory-ai/novel-to-game#play-online) | [Source](https://github.com/zenstory-ai/novel-to-game/tree/main/examples/journey-to-the-west) | [Browser](https://xiyouji.vibecoco.ai/) | creator-screenshot |
| Clowder & Crest | [Creator record](https://github.com/JacobStephens2/clowder-and-crest#built-with) | [Source](https://github.com/JacobStephens2/clowder-and-crest) | [Browser](https://clowderandcrest.com/) | browser-capture |
| Pokemon Tactics | [Creator record](https://github.com/kekel87/pokemon-tactics#built-with-ai) | [Source](https://github.com/kekel87/pokemon-tactics) | [Browser](https://kekel87.itch.io/pokemon-tactics) | creator-screenshot |
| Rhythm Master 3D | [Creator record](https://www.linkedin.com/posts/frankniu_if-youre-not-vibe-coding-with-claude-sonnet-activity-7304977951761039362-2xQe) | [Source](https://github.com/frankjniu/rhythm-game) | [Download / local](https://github.com/frankjniu/rhythm-game/archive/refs/heads/main.zip) | local-capture |
| Spirit of Kiro | [Creator record](https://github.com/kirodotdev/spirit-of-kiro#spirit-of-kiro) | [Source](https://github.com/kirodotdev/spirit-of-kiro) | [Download / local](https://github.com/kirodotdev/spirit-of-kiro/archive/refs/heads/main.zip) | creator-screenshot |
| IsoCoaster | [Creator record](https://github.com/amilich/isometric-city#readme) | [Source](https://github.com/amilich/isometric-city) | [Browser](https://iso-coaster.com) | creator-screenshot |
| Astra Floor | [Creator record](https://github.com/MartinDelophy/awesome-gpt-6-astra/issues/96) | [Source](https://github.com/BEROCHLU/astrafloor) | [Browser](https://astrafloor.berochlu.workers.dev/) | creator-screenshot |
| Mosswing | [Creator record](https://github.com/Ayi1337/gpt6-astra-one-shot-games#02--mosswing) | [Source](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing) | [Browser](https://mosswing-quiet-flight.jack-514.chatgpt.site/) | browser-capture |
| Sprout Quest | [Creator record](https://github.com/aibengineering/sprout-quest#how-it-was-built) | [Source](https://github.com/aibengineering/sprout-quest) | [Browser](https://aibengineering.github.io/sprout-quest/) | creator-screenshot |
| Claude Dreaming | [Creator record](https://rusty-production.itch.io/claude-dreaming) | [Source](https://github.com/moritzfh/claude-dreaming) | [Browser](https://rusty-production.itch.io/claude-dreaming) | creator-screenshot |
| 3D Sakura Crossing: an exploration prototype | [Creator record](https://github.com/danymaniglie-cmyk/3d-sakura-crossing#credits) | [Source](https://github.com/danymaniglie-cmyk/3d-sakura-crossing) | [Browser](https://danymaniglie-cmyk.github.io/3d-sakura-crossing/) | creator-screenshot |
| Magic Carpet Wizard · A Thousand Skies | [Creator record](https://github.com/threapchills/MagicCarpetWizard) | [Source](https://github.com/threapchills/MagicCarpetWizard) | [Browser](https://threapchills.github.io/MagicCarpetWizard/) | browser-capture |
| Supermarket Simulator | [Creator record](https://github.com/breineng/supermarket-simulator#description) | [Source](https://github.com/breineng/supermarket-simulator) | [Download / local](https://github.com/breineng/supermarket-simulator/releases/download/0.0.1/SupermarketSimulator.zip) | creator-screenshot |
| Arkanoid Neon | [Creator record](https://github.com/Jack-c3l2w/arkanoid-neon#readme) | [Source](https://github.com/Jack-c3l2w/arkanoid-neon) | [Browser](https://jack-c3l2w.github.io/arkanoid-neon/) | creator-screenshot |
| Crown Defender TD 3D · Codex build | [Creator record](https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/blob/main/COMPARISON.md) | [Source](https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game) | [Download / local](https://github.com/Aleksandr-Litvinenko/Codex.-Crown-Defender-TD-3D-browser-tower-defense-game/archive/refs/heads/main.zip) | local-capture |
| Three Quake: an AI-assisted Quake port | [Creator record](https://github.com/mrdoob/three-quake#credits) | [Source](https://github.com/mrdoob/three-quake) | [Browser](https://mrdoob.github.io/three-quake/) | browser-capture |
| Action with AI: a Roo Code experiment | [Creator record](https://zenn.dev/mizchi/articles/game-with-cline) | [Source](https://github.com/mizchi/action-with-ai) | [Browser](https://action-with-ai.mizchi.workers.dev/) | browser-capture |

Source checks establish what the creator publishes, not an audited AI authorship percentage. A Claude or Astra model mention alone is not attributed to Claude Code or Codex. Roo Code, OpenCode, Kiro and Windsurf remain distinct clients; the novel adaptations do not identify their exact client. Quake is credited as an assisted port of id Software’s existing game. Native engines, Git LFS, cloud runtime requirements and separate asset terms are written beside the relevant run/source operation. The per-game study steps are proposed learning exercises.

### Candidates kept outside the added cases

| Candidate | Evidence boundary / next check |
| --- | --- |
| [GODOT4 Cycle Tour](https://github.com/Bills-Institute-of-Technology/GODOT4_CycleTour) | README says scenes, scripts and assets will be added later; setup prose alone is not a delivered game. |
| [Tripo playbook examples](https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook) | Already covered as a workflow; public projects intentionally omit final generated GLBs and render as greyboxes. Do not duplicate them as complete game-and-asset examples. |
| [SANDLINE](https://github.com/xilinnihao-afk/sandline-threejs-fps) | The discovered project requires third-party character assets absent from a clean clone; retain it as a lead rather than a complete packaged case. |
| [Detective Agentic Mysteries](https://github.com/suuus/detective-agentic-mysteries) | Development evidence is explicit, but its Copilot runtime needs authentication/subscription and no genuine gameplay preview was captured. Current SDK/CLI requirements supersede the README’s older Node/extension setup; no account setup was performed. |
| [Multiverse Mate](https://github.com/vijaydotin/multiverse-mate) | The documented root pnpm dev command does not exist in the reviewed package. PostgreSQL, DATABASE_URL and separate service ports require a corrected reproducible setup before promotion. |

The discovery section also adds Vibe Jam, AI Browser Game Jam and the Astra source collection. Those links do not increase the reviewed game count.

## Gemini CLI case addition

Two previously reviewed code resources now also have individual game cases. Both are 2D games and are explicitly attributed to the Gemini CLI client, distinct from the six existing cases using Gemini models or AI Studio.

| Game | Primary AI evidence and source | Play or run | Real screenshot |
| --- | --- | --- | --- |
| Cloud Crush | [Google's complete game project and README](https://github.com/GoogleCloudPlatform/devrel-demos/tree/main/codelabs/gemini-cli/gemini-cli-match3-golang); [official prompt-by-prompt codelab](https://codelabs.developers.google.com/next26/gemini-cli-match3-golang) | Local Go / WASM project; no public hosted endpoint was verified | Publisher screenshot at [fixed revision](https://github.com/GoogleCloudPlatform/devrel-demos/blob/cdded29daeb83a24d37dc5c7ead5c85d8a08ff89/codelabs/gemini-cli/gemini-cli-match3-golang/screenshots/09_gameplay.png); not a GameMap local run |
| Dinosaur Game Offline | [Creator README](https://github.com/tonidevvn/dinosaur-game-offline#how-gemini-cli-helped), source, and in-game footer explicitly name gemini-cli | [Author-hosted browser build](https://tonidevvn.github.io/dinosaur-game-offline/); complete static project also opens locally via index.html | GameMap browser capture after start and jump; score, collision/game over, and restart checked |

Dinosaur source revision `e0f3f584751bb80425bd49513fa7b54503f13d62` includes index.html, style.css, script.js, and the referenced image/audio assets. Its live build returned HTTP 200 and passed the normal keyboard flow in Chromium at 1280 × 720, with no final-run JavaScript errors or failed requests. The board has a fixed desktop width. No repository code license is declared, so this collection calls it public source without assigning an open-source license.

Cloud Crush source subdirectory revision `cdded29daeb83a24d37dc5c7ead5c85d8a08ff89` contains complete Go game logic, native and WASM setup, source assets, a static server, and a Dockerfile; the repository's code license is Apache-2.0. No Go toolchain was installed for this review and the game was not compiled locally. The current go.mod requires Go 1.26.2; the README's 1.24+ prerequisite is outdated. The server serves public/, but the committed public/assets lacks required source assets. The case therefore includes copying assets/* into public/assets before serving, matching the Dockerfile's approach, and copying wasm_exec.js from the same Go toolchain used to compile. [Official Go guidance](https://go.dev/wiki/WebAssembly#javascript-goosjs-port) requires matching the helper and compiler versions. Local play does not require Gemini CLI or a cloud account; the codelab's optional cloud deployment does.

The expanded 44-case gallery passed the production build, generated-content checks, and a targeted Chromium UI pass at 1440 × 1300 and 390 × 844 using Playwright (Browser plugin unavailable). Gemini CLI selects exactly these two cases; 2D retains them and 3D shows an empty state. Browser/local mode separates the two correctly. Both images decode at their recorded dimensions, image dialogs show the correct capture/publisher provenance, and source links and local setup details are present. Keyword search, clear/reset, mobile width, and the standalone file:// build passed. App console errors and warnings were empty. These UI checks do not imply a local Cloud Crush compilation.

## Original 42-case runtime and integration review

All 42 case IDs are distinct and related resource IDs resolve. A separate content review checked duplicate implementations, dimensions, engine labels, AI roles, and evidence types. Garden Match credits human product/QA, Codex planning/art, and Claude engineering; OpenGame is explicitly labeled a generation framework. The case-study steps are editorial suggestions.

The gallery was checked at 1440 × 1000 and 390 × 844 in Chromium with Playwright because the Browser plugin was unavailable. Counts, 2D/3D filters, combined keyword and play-mode filters, empty-state reset, screenshot expansion/Escape close, and mobile width passed with no app console errors. The production build and generated-content checks passed after the media merge, including all 42 image/source records. Public demos received targeted smoke checks, not complete playthroughs. Downloaded source and creator screenshots do not imply every desktop game was locally reproduced.

Mini KSP was served from its unmodified public source and launched through the normal UI. Garden Match source revision 8bb87ee5c2698922f79f9b277d97b1392f38d0e2 was transpiled without gameplay edits and captured with its documented development Canvas renderer option. A real tile drag was attempted but was an invalid swap; no completed match is claimed. Orb Shooter and Pumpkin Hunt scenes render, but automated pointer-lock interaction was limited. Screenshot origins and original image URLs are recorded in the [media guide](media-sources.md).

## Discovery notes

### GameMap 2D community case audit — 2026-10-18

This is a dated research snapshot, not an exhaustive inventory of every community game. The search covered 26 broad query variations across Claude, Claude Code, Codex, Cursor, Gemini, Grok, Aider, ChatGPT, Pygame, Godot and browser games. A curated directory was used for discovery only; inclusion rests on creator-controlled repositories, articles, source trees, or deployed games. The existing Tetris, Tower of Time, and OpenGame entries were excluded from this expansion.

## Inclusion checks

1. A creator explicitly describes generative AI's development contribution; ordinary NPC/pathfinding "AI" is insufficient.
2. A public repository contains the actual game implementation (checked using recursive public GitHub API trees for all 13 included repositories).
3. A creator links a browser game or gives runnable source/release instructions.
4. A README disclosure is labelled `disclosure`, not represented as a prompt log. Development articles or creator-written summaries use `build-log`. None of these entries claims an independently audited percentage of AI authorship.
5. One representative game was selected from the John Dilig collection and one from the GameAI collection, to avoid multiplying a suite into many near-identical cards.

## Included cases (13)

| ID | Creator source and AI evidence | Play/run entry | Evidence interpretation |
| --- | --- | --- | --- |
| gothicvania-codex | https://github.com/acatovic/gothicvania-codex-demo#the-story | https://acatovic.github.io/gothicvania-codex-demo/ | Creator describes progressive Codex prompts, skills and Playwright; human assets and manual Tiled level are explicitly credited. |
| pixel-princess-claude | https://github.com/VTvito/pixel-princess-platformer#built-with-ai--how-this-was-made | https://gameforprincess.vercel.app/ | Claude Code collaboration disclosure; human product direction, review and device QA. |
| claude-tower-defense | https://github.com/mdkess/claude-game#built-with-ai | https://claude-game-lilac.vercel.app/ | Creator says entirely Claude Code; public complete implementation and headless simulator; no prompt history claimed. |
| cursor-procedural-platformer | https://github.com/commjoen/generated-game-experiment ; https://github.com/commjoen/generated-game-experiment/blob/main/.cursor/rules/conversation.md | https://commjoen.github.io/generated-game-experiment/ | Repository calls itself a Cursor game experiment. The conversation file was fetched: it is a bullet summary of user/assistant stages, not a verbatim transcript. |
| claude-mini-snake | https://github.com/BizShibe/claude-ai-mini-snake-game#readme | https://minisnake.vercel.app/ | Creator says generated in a Claude conversation. This is Claude chat, not evidence of Claude Code; resourceIds is empty. |
| flux-codex-runner | https://github.com/scriptedbyshivam/codex-hackathon-2026#readme | https://codex-hackathon-drab.vercel.app/ | Creator development account names Codex across seven milestones. Only the runner behavior is described here; wellness claims are not repeated. |
| bash-fighter-agent | https://github.com/Bash-Entertainment/bash-fighter#readme | https://bashfighter.com/ | Owner explicitly says most code and day-to-day development are done by an AI agent. No specific model/client is attributed without evidence. |
| running-man-claude-pixellab | https://github.com/balbonits/ai-browser-game-demos#tools-used ; https://github.com/balbonits/ai-browser-game-demos/blob/main/docs/games/running-man.md | https://games.jdilig.me/games/running-man/ | Creator names Claude Code for code and PixelLab for art. Per-game notes include asset inventory, controls, architecture and dated changes. Actual source is now under public/games/. |
| garden-match-agents | https://github.com/kevinchenkai/GameAI#readme ; https://github.com/kevinchenkai/GameAI/blob/main/garden/README.md | https://g.ismayday.mobi/garden/ | Creator names a Codex-centered, implementation-plus-independent-review workflow; per-game docs distinguish code layers, Codex art orders and human device validation. |
| dunkirk-ai-assisted | https://github.com/Ponloe/dunkirk-godot#ai-usage | https://cheery-sable-f2dce2.netlify.app/dunkirk.html | Narrow, explicit contribution table: Gemini backdrop/ideation; ChatGPT planning/debugging; Claude small suggestions; manual integration/testing and externally licensed music. Representative prompts are examples, not a complete log. |
| gravity-birds-grok-cursor | https://github.com/az9713/grokbot-game-dev-demo ; https://az9713.github.io/grokbot-game-dev-demo/gravity-birds-dev-journey.html | https://github.com/az9713/grokbot-game-dev-demo#opening-in-godot-4 | Godot source download. The journey HTML was fetched and read: Grok Bot coordinated Cursor Cloud Agents, local testing found movement/solvability bugs, subsequent fixes are described. It explicitly says the web export is incomplete; not classified as a playable browser build. |
| quasar-saz-claude | https://github.com/cleak/quasar-saz#how-it-was-made | https://github.com/cleak/quasar-saz/releases/tag/v1.1 | Creator describes Claude Code interpreting dog keyboard input and building code/procedural art/audio with tests. Recommended v1.1 adds human fixes; not called an untouched AI result. Godot Mono/C# source. |
| agent-arcade-copilot | https://github.com/DanWahlin/agent-arcade#how-this-was-made ; https://blog.codewithdan.com/building-agent-arcade-with-github-copilot-cli/ | https://github.com/DanWahlin/agent-arcade/releases | Creator article describes Copilot CLI planning, game mechanics, screenshot feedback, Tauri migration and releases. Credited human-made sprites/reference code remain part of the project. |

## Source-tree checks

Public GitHub tree JSON snapshots were held in temporary working files during this audit. They contained source paths and pinned HEAD SHA values, not downloaded repository code, and are not bundled with this repository. Verified file counts: GothicVania 40; Pixel Princess 176; tower defense 89; Cursor platformer 81; Gravity Birds 89; Agent Arcade 368; Mini Snake 3; Flux 22; Bash Fighter 385; Quasar Saz 1076; John Dilig collection 171; GameAI collection 1122; Dunkirk 212. Counts include supporting docs, assets and tests, not just game code. The primary repositories and evidence URLs remain in the candidate table above.

Additional primary material fetched into temporary audit files included the Cursor conversation summary, Gravity Birds README and full journey HTML, and Mini Snake's complete HTML. Those working copies are not published artifacts; the candidate table links their creator-controlled sources. GitHub HTML/raw pages and the Copilot creator article were also opened with web research tools. Cache-miss errors were not treated as a verified dead site; direct public fetches/browser navigation were used to resolve important cases.

## Creator gameplay images for downloadable projects

- Gravity Birds: https://raw.githubusercontent.com/az9713/grokbot-game-dev-demo/main/game_ui_2.png — visually checked; actual Stairway puzzle with bird, fruit, exit and undo/restart UI. README captions it "After polish". [Published preview](./assets/media/learning/gravity-birds-grok-cursor.webp).
- Quasar Saz: https://raw.githubusercontent.com/cleak/quasar-saz/master/docs/screenshot_20260219_154704.png — visually checked; actual Dissonance King phase-3 combat, player, attacks, energy/score HUD. [Published preview](./assets/media/learning/quasar-saz-claude.webp).
- Agent Arcade: https://raw.githubusercontent.com/DanWahlin/agent-arcade/main/docs/images/agent-arcade-ninja.gif — creator gameplay GIF. Same recording is explicitly captioned "Ninja Runner Gameplay" in the creator's linked article. [Published preview](./assets/media/learning/agent-arcade-copilot.webp).

These are creator-provided gameplay media, not captures made during our own playtests. Root integration is preserving that provenance.

## Browser verification

Browser plugin unavailable; used bundled Playwright and Chromium 1208. All 10 browser-entry URLs returned HTTP 200 and correct page titles in the initial navigation run. Initial title/loading screenshots are intentionally excluded from accepted gallery media. Captures and per-case console/request/action metadata were temporary audit files and are not distributed. The [published manifest](./assets/media/learning/manifest.json) and [media guide](media-sources.md) identify the retained previews and their sources. Metal rendering and one foreground page were used for follow-up captures where asset loading or animation was slow.

Verified active interactions: tower-defense Damage upgrade changes Lv0→Lv1 and gold25→5; Cursor platformer moves/jumps and score increases; Mini Snake is played with arrows to collect two food items (score0→2; length1→3), then paused for capture; Flux enters its running state and flips gravity; Bash Fighter creates a private lobby, starts with bots, enters Timed Brawl and responds to movement/jump/attack; Running Man starts, jumps and reaches 19m; GothicVania moves from its exported `title` state to `level`, with a moving/jumping player, health4 and live enemies. GothicVania's Enter input must be held across a rendered frame because its title checks Phaser `JustDown`.

The temporary verified-preview selection recorded seven actual browser gameplay captures plus one creator gameplay screenshot for Pixel Princess. That audit selection file is not a repository download; retained media and origins are recorded in the [published manifest](./assets/media/learning/manifest.json). Pixel Princess's public build reached a working menu, but variable first-load asset timing made the creator's existing gameplay screenshot the more reliable preview: https://raw.githubusercontent.com/VTvito/pixel-princess-platformer/main/assets/screenshot.png ([published preview](./assets/media/learning/pixel-princess-claude.webp)). It was visually checked as actual forest-level gameplay with heroine, enemy, pickups and lives/score HUD. Garden Match diagnosis/capture was handed to the 3D research agent and Dunkirk capture to the root agent, so their final results are recorded by those agents rather than claimed here.

## Rejected or deferred prospects

| Prospect | Decision and reason |
| --- | --- |
| https://github.com/0x0funky/agent-game-forge | Game IDE/tool, not an additional completed game case. |
| https://github.com/BeyondPlay-AI/game-prompt-engine | Generator CLI; no particular finished output was independently verified. |
| https://github.com/Mr-Neutr0n/pixelforge | Generator/editor product, not a distinct completed game. |
| https://github.com/Tann2019/godot-mcp-server | Engine integration/tool with a teaching demo; not used to inflate game counts. |
| https://github.com/hanifwdyt/claude-code-game-toolkit | Toolkit and starter examples; deferred in favor of individual projects with stronger creator context. |
| https://github.com/MRCalderon3D/everything-game-dev-code | Broad scaffold with many samples; individual outputs not fully checked in this pass. |
| https://github.com/NguyenLe15325/Python-raylib | AI-assisted concept-demo collection; many entries are foundations rather than complete game loops. |
| https://github.com/Ajairajv/2D-Shooter-Game | Readme documents conventional enemy AI; no verified generative-AI build disclosure. |
| https://github.com/AkankshaD2/FlowForge | AI means A* navigation/pathfinding in the README; no verified generative-AI development attribution. |
| https://github.com/matthewod11-stack/CatRunner | Runtime Gemini cat generation is clear; explicit attribution of the game's development was not established. |
| https://github.com/Id-Aplus/SnakeMazeEscape | Credible Amazon Q/Pygame creator disclosure; base mode is reported complete, but normal/advanced modes have acknowledged bugs/incompletion. Kept as a further prospect rather than padding the main set. |
| https://github.com/BareTread/vampire-survivors-enhanced | Complete game and agent-related files exist, but the README does not itself establish the AI build contribution. A session artifact would need further review before inclusion. |
| https://github.com/highlandhodl/coengineers-os-games | Credible Claude Code suite; deferred because this pass already includes arcade collections and no separate gameplay-preview verification was completed. |
| GameAI StackPop | Same creator/repository and same workflow as Garden Match. Not split into another card just to increase totals. |
| https://github.com/ladegeraet/claudespace | Discovery-list lead; direct repository fetch did not establish the source/evidence chain in this pass. |
| https://github.com/lappemic/awesome-ai-built-games | Useful discovery index; a third-party list is not primary evidence of a particular game's authorship. |

3D leads were handed to the 3D researcher: CodeCraft, mineclaude, ImADragon, snake-3d-game, desert-velocity and vibe-jet. They are not counted in this 2D expansion.


---

### Community 3D expansion audit — 2026-10-18

Prepared `website/src/data/community3dExpansion.ts`: 12 new games, all with creator-published browser URLs and actual game repositories. The root agent owns live browser capture and final inclusion. This research verified creator evidence and source trees; a URL listed here is not a claim that a complete playthrough was performed.

## Search coverage

Searched GitHub/web for Three.js, Godot, Unity, AI-generated, vibe-coded, Claude, Codex, Gemini, Copilot, AI game development, and specific public projects. Also used the community list https://github.com/coolbat/awesome-opus-5.5-usecase as a discovery index, then verified primary creator repositories instead of treating that list as evidence. Sources include English, Chinese, Japanese and French development records.

## Included candidates and primary audits

| ID | Primary repository | AI evidence | Source inspection | Demo |
| --- | --- | --- | --- | --- |
| turbo-kart-rally-claude | https://github.com/bridge-mind/turbo-kart-rally | README original prompt, five Claude Opus 5.5 assignments, architecture and integration account | Recursive main tree: 41 entries, 27 JS/HTML files; screenshots are documentation only; runtime visuals/audio procedural | https://bridge-mind.github.io/turbo-kart-rally/ |
| long-wind-claude | https://github.com/jbang2004/long-wind | Chinese author timeline, AI/human roles, original request | main tree: 334 entries; committed Tripo character GLBs, Mixamo animation GLB, Poly Haven glTF/textures, actual game code. No tiny GLB pointer files found. Read CREDITS.md: asset terms differ from code. | https://jbang2004.github.io/long-wind/ |
| nova-lancer-claude | https://github.com/tanuu5/nova-lancer | Japanese original brief, agent division, test explanation, reported model/session record | main tree: 35 entries, 18 JS/HTML files. Full procedural game; bundled index.html plus modular source and build tools. | https://tanuu5.github.io/nova-lancer/ |
| orb-shooter-ai | https://github.com/theredstapler/orb-shooter | README directly names Antigravity, Gemini 3.1 Pro, Opus 4.6 and human polishing | main tree and main.js references checked. All referenced warehouse/weapon/enemy GLBs, HDR and OGG files are committed, not just links to Sketchfab. | https://theredstapler.github.io/orb-shooter/ |
| operation-naptime-claude | https://github.com/alandaitch/operacion-siesta | README build account and linked public session with tool calls | master tree: 166 entries, 116 JS/TS/HTML files, procedural rendering/audio. `public/transcript.html` and `docs/transcript.html` exist. README's `docs/TRANSCRIPT.md` link does not match tree, so data uses working published HTML route instead. | https://operacion-siesta.vercel.app/ |
| ombres-claude | https://github.com/briossant/ombres | README detailed process, human interventions, original docs/BRIEF.md | master tree: 1,789 entries, 358 JS/TS/TSX/HTML files; full host/controller/relay, procedural birds/world, committed audio/fonts/narration. PolyForm Noncommercial: described as source available, not OSI open source. | https://ombres.deploy.breizhware.com/ |
| dragons-reach-claude | https://github.com/jaydemks/ImADragon_onepromptcode_game | PROMPT.md, contracts, README postmortem and honest 1 initial prompt + 3 follow-ups disclosure | main tree: 95 entries, 48 JS/HTML files; procedural rig/world/combat. Source complete as prototype; README audio module is a stub. | https://jaydemks.github.io/ImADragon_onepromptcode_game/ |
| vibe-jet-gemini | https://github.com/cedrickchee/vibe-jet | Creator initial Gemini prompt, response and approach; original 2025 build | main tree: 22 entries, game.html/server.js, real aircraft GLBs and textures. Code inspected: local shenyang_j-11.glb; Three.js CDN + online grass texture. | https://vibejet.cedricchee.com/ |
| slide-rush-opus | https://github.com/KJLKurt/waterslide-game-opus-5.5 | README completion record names opus-5.5/extra-high and session statistics; repo describes LLM comparison | main tree: 65 entries, 29 JS/HTML files; procedural characters/slide/audio plus PWA. Label disclosure, not tutorial or prompt archive. | https://kjlkurt.github.io/waterslide-game-opus-5.5/ |
| the-tithe-claude | https://github.com/miguelsolorio/the-tithe | Author repository About directly says built with Opus 5.5 | main tree: 227 entries, 165 JS/HTML files; actual levels/weapons/enemies/checkpoints. Procedural runtime assets; no full prompt/session evidence. Label disclosure. | https://miguelsolorio.github.io/the-tithe/ |
| michi-neko-ai | https://github.com/c1t1zen1/Michi-Neko-The-Cat-Philosophers-Path | Creator README identifies human direction and several AI models without naming exact models | main tree: 201 entries, 63 JS/HTML files; procedural game, quests and save logic. README explicitly labels many illustrations as aspirational inspiration, so never use them as actual gameplay screenshots. Early alpha stated plainly. | https://c1t1zen1.github.io/Michi-Neko-The-Cat-Philosophers-Path/ |
| fragarena-copilot | https://github.com/jonnyleigh/fragarena | Author Copilot disclosure, Prompt.md, SoundEffectsPrompt.md, php2node_prompt.md | main tree: 55 entries, 25 JS/HTML files; client/server, music MP3s and UI image committed. Read actual Prompt.md; no raw transcript claim. | https://fragarena1.azurewebsites.net/ |

All final tutorial/evidence pointers are primary creator material. Entries that only have a declaration use `tutorial.kind: 'disclosure'`. Steps are editorial study suggestions. Source scope `complete-project` means source and game dependencies can run the stated prototype, not a claim of production quality.

## Strong alternates intentionally not added to browser set

- **Desert Velocity** — https://github.com/sim7575/desert-velocity ; Godot 4.3+, Codex + GPT-5.6 Build Week project with detailed supervised AI disclosure. Windows download https://sim75.itch.io/desert-velocity . Tree inspected: 784 entries, 428 image/model/audio assets with original Blender files and real GLBs. No tiny asset pointers. Excellent engine diversity, but download-only. Root can add if a local-game screenshot/download case is desired.
- **Opus FPS** — https://github.com/frankhale/opus-fps ; Godot 4, procedural models and sounds generated with tools; game code in godot/. Direct author Opus attribution. No public browser build. Kept outside browser-first additions.
- **MineClaude** — https://github.com/snek-git/mineclaude ; Rust + Bevy 0.18, author says built entirely by Opus 4.6 agent teams, clear workflow and human playtest disclosure. Runnable via cargo with GPU; no browser demo.
- **CodeCraft** — https://github.com/zihaomu/CodeCraft ; author attributes to Codex; real procedural voxel survival/build project and source. README only gives local run URL, no published playable URL. Source-only alternate.
- **Tripo Playbook games** — https://github.com/TripoGrowthLab/vibe-gaming-interactive-playbook ; Snowdrift Dash, LANTERN ALLEY, PIT NINE have specific game code and browser demos. Author explicitly says Tripo models are absent and fresh clones run in greybox. Would require `game-code-greybox`, never complete-project. More valuable as asset-swap workflow than padding the current set.

## Rejected / not counted

- https://github.com/chongdashu/threejs-capacitor-ios-game : repository expressly says no runnable app code or GLB models; only prompts, skills and metadata. Not a complete game source.
- https://github.com/mdelaguera/learn-threejs-tactics-game and upstream chongdashu/threejs-tactics-game : public repo says full source and asset pipeline coming later / through paid access; public references are insufficient.
- https://github.com/vibe-stack/game.js : engine/editor project, not a finished game case.
- https://github.com/hyeons-lab/prism : engine only.
- https://github.com/marciocamello/game-engine-ai : engine project with examples, insufficient distinct game evidence for this selection.
- https://github.com/markjeromecruz/threejs-claude-starter : scene/starter intentionally invites the user to add game mechanics; not a complete game loop.
- https://github.com/xenitV1/mehmet-3d-portfolio : explorable portfolio, no game objective.
- https://github.com/shogunyan12/The-GREAT-SAGE : desktop assistant, not a game.
- https://github.com/vasu-devs/FishSlop_Opus5.5 : real game/source and demo discovered, but README does not explicitly attribute AI authorship; model name in repo URL alone is weaker than included cases. Excluded pending direct creator build evidence.
- https://github.com/leobrqz/VibedGames-benchmark : real small games and requested prompt_history.md convention; selected more individually documented examples instead of counting each benchmark entry.
- https://github.com/chojondocho/single-html-game-bench : real generated outputs but huge single-prompt comparison set; excluded from curated count to avoid duplicate low-quality outputs padding totals.
- `Tidewater`, `Clearwater`, `web-ocean`, riverboat scenes, photoreal architecture viewers and universe simulations from discovery list: interaction/rendering demos without a sufficiently clear game loop, excluded.
- `GalaxyQuest` from discovery list requires proprietary original game data; no standalone complete project/assets claim.

## Verification performed

- Primary web search/open/read for each included repository.
- GitHub connector recursive tree inspection for all 12 included sources.
- Actual Orb Shooter main.js asset references matched against tree; Vibe Jet model/texture dependencies read.
- Long Wind CREDITS.md, Ombres README/licence statement, Nova Lancer Japanese README, FragArena Prompt.md inspected.
- `npx tsc -b --pretty false` passed after new data file creation.
- Many browser-game URLs return a generic "not accessible via this tool" from web reader despite being linked in primary repos; root is independently capturing real browser previews, so web-reader failures have not been mislabeled as dead links.

## Follow-up from root browser checks

- Vibe Jet and FragArena public hosts failed DNS resolution. Their final `demo` fields now link the actual main-branch source ZIP with local Node launch instructions and state that the public host did not resolve at review.
- Ombres browser navigation timed out; final demo note flags possible temporary unavailability. This is not treated as definitive proof of a dead host.
- Historical screenshot-candidate metadata was held in a temporary audit file, keyed by case ID with immutable commit refs, raw image URLs, source permalinks, byte sizes, and README provenance. That working file is not distributed; use the [published manifest](./assets/media/learning/manifest.json) and [media guide](media-sources.md) for retained preview provenance. Nine candidates were explicitly embedded as gameplay in creator README content. The Michi development capture required pixel inspection; all aspirational README artwork was excluded. Orb Shooter and Slide Rush had no creator gameplay screenshots in their source trees, so browser capture was required for their previews.


---

### Diverse community case research — 2026-10-18

Scope: actual AI-assisted game development, public complete project, playable browser build or honestly labeled source download. Search terms covered Gemini CLI, Google AI Studio, DeepSeek, Aider, Cursor, Replit, Windsurf, Antigravity; searched English and Chinese through web search and GitHub repository search. Author attribution is distinguished from a build log or actual prompt transcript. Runtime follow-up is recorded in the final review above.

## Added candidates in website/src/data/diverseCommunityCases.ts

| ID | Primary disclosure | Source inspected | Play/run |
| --- | --- | --- | --- |
| cursor-space-shooter | https://github.com/littleearth/vibe-coded-games#development explicitly credits Cursor; family creation details in Game Details | Recursive Git tree has shooter/index.html, styles.css, 43KB game.js; shooter/README.md fetched in full | https://games.littleearth.dev/shooter/ |
| cursor-destruction-derby | Same primary README, individually names Destruction Derby and Cursor assistance | Recursive tree has demoderby/index.html, styles.css, 36KB game.js | https://games.littleearth.dev/demoderby/ |
| beach-kitty-ai-campaign | https://github.com/matthewod11-stack/CatRunner#built-with names Claude Code + Gemini | Root tree, assets and scenes visible; README and full PROGRESS.md fetched (354 lines). Core gameplay does not require Gemini key | https://www.beachkittygame.games/ |
| gemini-pirate-fleet | https://github.com/JoeySalmons/vibe-coded-games#vibe-coding-process author describes Gemini 2.5 Pro + Claude Sonnet 4.5 initial workflow and some manual balance adjustments | Full 79KB Pirate Fleet Commander v7.4.html fetched via GitHub connector, 2002 lines. Game loop, economy, Canvas visuals and input implemented | README direct Pages link to /Pirate%20Fleet%20Commander%20v7.4.html |
| gemini-kymograph | Same collection-wide author disclosure; exact model for current version unspecified | Full Kymograph v4.html fetched, 28KB/628 lines; actual signal puzzle, rule inference, feedback, persistent progress, Web Audio | README direct Pages link to /Kymograph%20v4.html |
| gemini-pumpkin-hunt | Same collection-wide author disclosure; no per-game prompt log | Full Pumpkin Hunt Horror Game v3.html fetched, 25KB/236 lines; procedural Three.js scenery/characters/textures, flashlight, stamina, interactions, win/lose, stalker behavior | README direct Pages link to /Pumpkin%20Hunt%20Horror%20Game%20v3.html |
| deepseek-neon-snake | https://github.com/TwitchCaptain/snake author-controlled description: Classic Snake game - created by DeepSeek | README, recursive tree, complete 21KB game.js fetched; index.html/styles.css present. Actual Snake rules/levels/input | README explicitly links https://twitchcaptain.github.io/snake/ |
| deepseek-mini-ksp | https://github.com/BairlyEmei/mini-ksp author-controlled description: mini-ksp game developed by deepseek harness | README fetched; recursive tree confirms index.html, 172KB js/game.js, tutorial/missions/manual, CSS, 94KB 3D workbench, vendored Three.js and 4 PNG textures | No hosted game advertised. Source ZIP honestly labeled download. README: open index.html or python3 start.py |

During initial source discovery no generation API was called. The later local game smoke tests are recorded above. GitHub connector was used after web fetch returned cache misses for individual game files. Root agent has live URLs for runtime checks. Data does not claim gameplay was already verified.

## Excluded / deferred

- JoakimCarlsson/bastion: web search described an interesting agent-pipeline tower-defense game, but opening the actual repository returned 404; not added.
- theatharvagai/GeminiCLI-Driven-Game-Dev: genuine CLI attribution but README retains placeholder clone URL and preview notes; no hosted demo advertised; deprioritized for quality.
- tonidevvn/dinosaur-game-offline: README explicitly documents Gemini CLI assistance; recursive tree includes complete code and Wikimedia dinosaur images/sounds. Runnable local candidate, deferred because no live URL advertised and an existing Snake runner-style case already expands the tool variety. Could add later with a local capture.
- aerugo/orb: author-controlled repo description says Orb game built with Aider. README and full fractal.js fetched. Complete three-file Three.js procedural shooting sandbox, with Tone.js and Three.js CDN imports. No scoring, loss, or clear win loop found; weaker fit than finished game cases; no advertised live URL. Deferred instead of presenting an interactive graphics prototype as a finished game.
- aideink/game.snake, game.flappy, game.tetris: primary README says created in aide.ink; that is not proof of Aider usage. Not mislabeled as Aider examples.
- zhaojch1/deepseek_game_rts: full README fetched; primarily describes runtime LLM strategic opponents and architecture, not clear AI-assisted development disclosure. Excluded to avoid confusing AI gameplay with AI-built games.
- liuhuize0711git/astrovoid-game: complete project, live deployment guide, source downloadable; only repo description gemini_game and AI Studio scaffold hint. Insufficient specific primary development attribution; deferred.
- showblue/mario_game: author description says created by Gemini AI but README only one line and no live demo advertised. Deferred for weaker documentation.
- KilledByAPixel/LittleJS-AI / LittleJSArcade: 50+ source-complete single-file games, primary toolkit README says games made with those tools, but individual AI provenance unclear. Good future research pool; did not count all games indiscriminately.
- Replit/Devpost/Reddit results (ColorChase, Epic Dev Battles, Mercenary Company, Tiny Skies): creator AI disclosures may exist but no verified complete public source discovered in this pass. Not added on video/screenshots alone.
- JaniDhruv/the-imitation-game: primary Antigravity development disclosure found; runnable complete project requires API keys and is a text interrogation game rather than a clear 2D/3D visual game. Deferred.

## Broader discovery sources

- https://github.com/lappemic/awesome-ai-built-games — fetched full README; roughly 70+ current hand-curated games with tool/engine clues; links most often point to deployed game, not full source. Root agent can expose this as a discovery directory separately.
- https://itch.io/jam/ai-browser-game-jam — recurring AI browser game jam; source requirements need individual verification.
- https://vibejam.com/ — broad submission pool; AI game claims must be checked individually.
- https://vibecode.game/ — tool/engine directory.
- GitHub repository searches: game "gemini cli", game deepseek in:description language:JavaScript, game "gemini" in:description language:HTML, game "aider" in:description language:JavaScript, game "cursor" in:description language:JavaScript.

Eight entries were authored; six distinct game implementations from three source collections plus two independent DeepSeek cases. All eight retained scope complete-project. Collection-wide disclosures explicitly state that final game versions are not tied to a verified exact model. Category ai-assisted avoids overstating fully autonomous generation.

## Screenshot QA completed (same date)

Eight 1280×720 real browser-rendered PNGs, per-case metadata, and a contact sheet were created as temporary working files during this audit. They are not distributed as QA downloads. The retained previews and source provenance are available in the [published manifest](./assets/media/learning/manifest.json) and [media guide](media-sources.md). No title-only or loading-only images were retained. Used installed Playwright because Browser plugin/skill was absent. Every retained screenshot was visually inspected.

- Shooter: Start Game → hold Space → move left; enemy and shots visible; no page errors.
- Derby: already in a running arena → drive Player 1 with WASD; collisions/particles visible; no page errors.
- Beach Kitty: campaign Play → Sunny Shore → Space jumps; cat/beach gameplay scene visible; no page errors.
- Pirate Fleet: WASD movement changed world coordinate from (0,0) to (4,-4); active fleet/economy view; no page errors.
- Kymograph: Initialize System → first signal puzzle and controls appear; no page errors.
- Snake: Press to Start → ArrowDown/ArrowLeft changes direction; active snake/food board; no page errors. GitHub Pages redirects to creator domain; direct https://twitchcaptain.com/snake/ works. Metadata sourceUrl remains author-linked Pages demo URL and finalUrl records destination.
- Mini KSP: downloaded public repository commit de38be79fe88a72e87c4f170bdae76147923c9f0, served on localhost:8867; New Game → skip tutorial → reduce first-stage fuel to one tank and second-stage to zero → Launch → raise throttle. Actual flight screen and first-launch achievement captured; no page errors. Origin local-capture, sourceUrl repository. No code modifications or APIs. Server may be stopped after integration.
- Pumpkin Hunt: clicking Start reveals actual Three.js forest and HUD. Headless macOS Chromium rejects pointer lock with WrongDocumentError: The root document of this element is not valid for pointer lock. Thus scene rendering confirmed; movement/flashlight remain unverified. Windowed attempt closed during navigation. Captured honest title-free forest scene; no gameplay state injected. This is an automation limitation documented in primary Playwright issue https://github.com/microsoft/playwright/issues/20956, whose maintainer identifies unfocused macOS render view as cause. Root may retain as scene preview with limitation, or replace after manual desktop play.
