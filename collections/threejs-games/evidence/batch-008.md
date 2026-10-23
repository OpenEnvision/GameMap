# Batch 008 source review — 2026-10-22

Adds **5 source-reviewed games**, bringing the index to **69**. This batch covers chess, xiangqi, gomoku/renju, web carom billiards and pirate sailing/combat. It keeps 3D board scope distinct from spatial movement and scopes the billiards entry to its direct Three.js web target. No upstream install, build, automated suite, game execution or playtest occurred.

Prepared after PR #62 head `4c6059574bacf23afb32377b1de7c1c6e027664d` and main `1bd421c48344a8bafa79936a1c9c7aaeea8673bd`. Remote main and open PR states are checked again before publication. A merged branch is not reused. No merge, deployment, force push, setting change or paid service is used; no third-party source/assets are copied into GameMap.

<a id="chess-3d-terminats"></a>

## Chess-3D (Terminats)

- Source: [Terminats/chess-3d](https://github.com/Terminats/chess-3d/tree/7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8), commit `7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8`.
- Rendering: Imports Three.js WebGLRenderer directly; project-local ChessScene/BasicScene classes render the board and src/index.ts drives requestAnimationFrame. [Renderer source](https://github.com/Terminats/chess-3d/blob/7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8/src/game/Game.ts#L38).
- Game loop: Applies player and worker-AI moves through chess.js, checks game_over after each side and dispatches checkmate/draw results and restart. [Gameplay source](https://github.com/Terminats/chess-3d/blob/7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8/src/logic/ChessGameEngine/ChessGameEngine.ts#L107).
- Dependencies: Cannon-es 0.19.0 physics, chess.js 0.13.4 rules, GLTFLoader, minimax/alpha-beta web-worker AI; TypeScript/Webpack and Express hosting. Full npm manifest is recorded. [package.json](https://github.com/Terminats/chess-3d/blob/7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8/package.json)
- License: MIT. Root MIT code license verified. Third-party dependencies/media may have separate terms; not every model, font, texture or transitive dependency was independently audited. [License file](https://github.com/Terminats/chess-3d/blob/7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8/LICENSE.MD). 
- Maturity: game. Version 1.0.0; README links a deployed game and source implements terminal chess results and restart. [Maturity basis](https://github.com/Terminats/chess-3d/blob/7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8/README.md).
- Demo: [Author URL](https://chess-3d-mja9.vercel.app/); `reader-error` on 2026-10-22. Pinned README links this game URL. The text reader could not retrieve it; no match, save, room, chat or score action was executed. [Discovery source](https://github.com/Terminats/chess-3d/blob/7099a73a5ed5e4eef49ef5c39e5004451b0ab1d8/README.md).
- Review limits: Board rules are planar despite 3D pieces/camera/physics; this is a 3d-board entry. Manifest pins Node 16.4.2 and older libraries; compatibility, AI strength and rule conformance were not tested. README says the author created the Blender models; this is not an independent asset-provenance audit.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="chinese-chess"></a>

## Chinese Chess — Three.js 3D

- Source: [doggy8088/chinese-chess](https://github.com/doggy8088/chinese-chess/tree/3c32dbae23e5b7c7b256b446837bcf4ae8e03bfe), commit `3c32dbae23e5b7c7b256b446837bcf4ae8e03bfe`.
- Rendering: Imports Three.js and creates Scene/WebGLRenderer/OrbitControls directly; index.html pins the Three.js import map. [Renderer source](https://github.com/doggy8088/chinese-chess/blob/3c32dbae23e5b7c7b256b446837bcf4ae8e03bfe/main.js#L25).
- Game loop: After each move, checks legal replies, checkmate/stalemate and repetition verdicts, assigns a winner or draw and displays game-over. [Gameplay source](https://github.com/doggy8088/chinese-chess/blob/3c32dbae23e5b7c7b256b446837bcf4ae8e03bfe/main.js#L699).
- Dependencies: Native ES modules, Three.js/OrbitControls CDN, CanvasTexture-generated labels, Web Audio, localStorage settings and local worker AI; no npm manifest in the reviewed tree. 
- License: MIT. Root MIT code license verified. Third-party dependencies/media may have separate terms; not every model, font, texture or transitive dependency was independently audited. [License file](https://github.com/doggy8088/chinese-chess/blob/3c32dbae23e5b7c7b256b446837bcf4ae8e03bfe/LICENSE). 
- Maturity: game. Source implements local AI/hotseat play, rules, terminal positions, repetition, undo/new-game and results. [Maturity basis](https://github.com/doggy8088/chinese-chess/blob/3c32dbae23e5b7c7b256b446837bcf4ae8e03bfe/README.md).
- Demo: [Author URL](https://chinese-chess.gh.miniasp.com); `reader-error` on 2026-10-22. Pinned README links this game URL. The text reader could not retrieve it; no match, save, room, chat or score action was executed. [Discovery source](https://github.com/doggy8088/chinese-chess/blob/3c32dbae23e5b7c7b256b446837bcf4ae8e03bfe/README.md).
- Review limits: This is a 3D-rendered board with planar xiangqi rules, not spatial movement. AI difficulty, rule/repetition conformance and author test reports were not independently tested. README documents AI-assisted development; dependency/media provenance was not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="gomoku-five-chess-game"></a>

## Gomoku / Renju (Will)

- Source: [doggy8088/five-chess-game](https://github.com/doggy8088/five-chess-game/tree/2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5), commit `2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5`.
- Rendering: Constructs Three.js WebGLRenderer/Scene/Camera directly. Initialization prefers the 3D board when Three loads and falls back to 2D Canvas if it does not. [Renderer source](https://github.com/doggy8088/five-chess-game/blob/2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5/app.js#L174).
- Game loop: Places legal stones, detects winning lines, variant-specific forbidden moves and board draws; app.js drives AI/local play and result statistics. [Gameplay source](https://github.com/doggy8088/five-chess-game/blob/2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5/game.js#L876).
- Dependencies: Three.js is the rendering CDN; local JavaScript supplies rules/AI and browser storage/audio. npm Firestore, Express, QRCode and ws dependencies support optional online/server features. [package.json](https://github.com/doggy8088/five-chess-game/blob/2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5/package.json)
- License: MIT. Root MIT code license verified. Third-party dependencies/media may have separate terms; not every model, font, texture or transitive dependency was independently audited. [License file](https://github.com/doggy8088/five-chess-game/blob/2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5/LICENSE). 
- Maturity: game. Version 0.3.9; source implements results, statistics, local/AI matches and optional online adapters. The interactive 3D entry is indexed. [Maturity basis](https://github.com/doggy8088/five-chess-game/blob/2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5/README.md).
- Demo: [Author URL](https://gomoku.game.miniasp.com/); `reader-error` on 2026-10-22. Pinned README links this game URL. The text reader could not retrieve it; no match, save, room, chat or score action was executed. [Discovery source](https://github.com/doggy8088/five-chess-game/blob/2431fad3a5c0029d0cb4390bb6d5099cdeac7ce5/README.md).
- Review limits: A 3D board with a 2D failure fallback; this entry covers the direct Three.js rendering path. Renju variants/first-foul behavior, AI strength, reconnect state and upstream tests were not independently verified. Optional online rooms need a Node relay and optional Firestore deployment; no cloud project or paid resource was used.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="four-ball-billiards-web"></a>

## Four-ball Billiards — Web Client

- Source: [skoo1/Four-Ball_Billiards_ThreeJS](https://github.com/skoo1/Four-Ball_Billiards_ThreeJS/tree/036052d6edc05122f7806ac0f38e3c9ed7213801), commit `036052d6edc05122f7806ac0f38e3c9ed7213801`.
- Rendering: Directly imports Three.js/OrbitControls and constructs Scene/WebGLRenderer; the HTML import map pins Three 0.162.0 and ball state arrives over WebSocket. [Renderer source](https://github.com/skoo1/Four-Ball_Billiards_ThreeJS/blob/036052d6edc05122f7806ac0f38e3c9ed7213801/static/app.js#L44).
- Game loop: Scores a carom for touching both red balls without a foul, switches player/AI turns on misses and ends the game at ten points. [Gameplay source](https://github.com/skoo1/Four-Ball_Billiards_ThreeJS/blob/036052d6edc05122f7806ac0f38e3c9ed7213801/controller.py#L545).
- Dependencies: Web target: FastAPI >=0.104, uvicorn[standard] >=0.24 and unpinned NumPy in requirements_web.txt. controller.py/physics.py use Python/NumPy for rules and physics. server.py replaces the repository's separate desktop Ursina display layer; the reviewed web imports do not depend on Ursina. Three.js is the browser renderer. 
- License: MIT. Root MIT code license verified. Third-party dependencies/media may have separate terms; not every model, font, texture or transitive dependency was independently audited. [License file](https://github.com/skoo1/Four-Ball_Billiards_ThreeJS/blob/036052d6edc05122f7806ac0f38e3c9ed7213801/LICENSE). 
- Maturity: prototype. README and controller implement player-versus-AI first-to-ten play alongside practice and a headless API. [Maturity basis](https://github.com/skoo1/Four-Ball_Billiards_ThreeJS/blob/036052d6edc05122f7806ac0f38e3c9ed7213801/README.md).
- Demo:  `not-located` on 2026-10-22. README documents localhost:8000 setup but no confirmed public demo. No hosted URL was guessed or server started. [Discovery source](https://github.com/skoo1/Four-Ball_Billiards_ThreeJS/blob/036052d6edc05122f7806ac0f38e3c9ed7213801/README.md).
- Review limits: Requires the Python/WebSocket server; static HTML alone is not the complete game. Repository also has a separate Ursina desktop client. This entry is specifically the direct Three.js/FastAPI web target. Physics realism, AI shots, shot-script runner and backend APIs were not tested; dependency versions are partly unconstrained.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="los-polos-pirates"></a>

## Los Polos Pirates / Kalózok

- Source: [lospolosadwords-dev/kalozok](https://github.com/lospolosadwords-dev/kalozok/tree/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17), commit `52a5d7f6a77700b26a2af8b9ebd507bfe247ae17`.
- Rendering: Directly constructs Three.js Scene/WebGLRenderer and renders in its own requestAnimationFrame loop, with Three example water/sky/post-processing utilities. [Renderer source](https://github.com/lospolosadwords-dev/kalozok/blob/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17/index.html#L823).
- Game loop: Kraken damage/defeat drives boss rewards and progression; other runtime paths implement ship damage, sinking/respawn, port trading, crew and combat. [Gameplay source](https://github.com/lospolosadwords-dev/kalozok/blob/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17/index.html#L1643).
- Dependencies: Single HTML entry, Three.js r128 CDN, Three example GLTF/Water/Sky/post-processing helpers, native Web Audio and optional WebSocket multiplayer relay. 
- License: MIT. MIT code. Author NOTICE.md/ASSETS.md attribute repository models/textures to CC0 sources, keep Three example code/water normals MIT, and state generated portraits are CC0. These scoped notices are not an independent audit of every original source or deployed asset. [License file](https://github.com/lospolosadwords-dev/kalozok/blob/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17/LICENSE). [Additional notice](https://github.com/lospolosadwords-dev/kalozok/blob/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17/NOTICE.md). [Additional notice](https://github.com/lospolosadwords-dev/kalozok/blob/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17/ASSETS.md).
- Maturity: game. Source includes open-world sailing/combat/economy and a boss-defeat/reward path; README links a published play URL. [Maturity basis](https://github.com/lospolosadwords-dev/kalozok/blob/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17/README.md).
- Demo: [Author URL](https://skynet.lospolo.hu/kalozok/?lang=en); `reader-error` on 2026-10-22. Pinned README links this game URL. The text reader could not retrieve it; no match, save, room, chat or score action was executed. [Discovery source](https://github.com/lospolosadwords-dev/kalozok/blob/52a5d7f6a77700b26a2af8b9ebd507bfe247ae17/README.md).
- Review limits: Ship navigation is mainly on the sea plane in a 3D-rendered world; the dimension label does not imply free 3D motion. Author says internal builds contained colleague photographs and documents repository cleanup; deployed media were not compared against this pinned source. Relay availability, multiplayer synchronization, balance and original asset-source terms were not independently tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Queue decisions

- **chess-drobenyuka — excluded**: The MIT repository declares @react-three/fiber and @react-three/drei runtime dependencies, outside the direct Three.js boundary. Next: Reconsider only for an explicitly broader R3F collection; do not count as direct rendering. [Pinned evidence](https://github.com/DrobenyukA/chess/blob/9767671ec3e75962a4b8a88dc42573d0bd101bde/package.json). [Pinned evidence](https://github.com/DrobenyukA/chess/blob/9767671ec3e75962a4b8a88dc42573d0bd101bde/LICENSE).
- **raonautica — pending**: The primary README describes a Godot 4 model-agent experiment with no human player and a model API key requirement. A Three.js web subtree exists but is not verified as a standalone qualifying game. Next: Review the separate web target's objective and rendering path without invoking paid model services. [Pinned evidence](https://github.com/albusdemens/Raonautica/blob/4ea544d899ffb7447a83e83feaf859026415c1da/README.md). [Pinned evidence](https://github.com/albusdemens/Raonautica/blob/4ea544d899ffb7447a83e83feaf859026415c1da/package.json). [Pinned evidence](https://github.com/albusdemens/Raonautica/blob/4ea544d899ffb7447a83e83feaf859026415c1da/LICENSE).
- **windsurf-simulator — pending**: MIT/direct Three.js source exists, but reviewed code is a free-sailing learning simulation with capsize/recovery; a race, finite objective or progression game loop was not established. Next: Find an authored challenge/goal mode or explicit scope authorization for training/free-simulation toys before promotion. [Pinned evidence](https://github.com/viachm/windsurf-simulator/blob/770eb3be81b39519801c16b6e5c4de63d923f860/README.md). [Pinned evidence](https://github.com/viachm/windsurf-simulator/blob/770eb3be81b39519801c16b6e5c4de63d923f860/LICENSE). [Pinned evidence](https://github.com/viachm/windsurf-simulator/blob/770eb3be81b39519801c16b6e5c4de63d923f860/site/src/world.js). [Pinned evidence](https://github.com/viachm/windsurf-simulator/blob/770eb3be81b39519801c16b6e5c4de63d923f860/site/src/sim.js). [Pinned evidence](https://github.com/viachm/windsurf-simulator/blob/770eb3be81b39519801c16b6e5c4de63d923f860/site/src/main.js).

The four author demo URLs could not be retrieved by the text reader; availability remains unknown. Billiards has documented local setup but no verified public play URL. The existing HexGL restriction and all earlier license corrections remain intact.
