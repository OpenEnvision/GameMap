# Batch 006 source review — 2026-10-21

Adds **8 source-reviewed games**, for **56** in the series after moving HexGL to pending. This increment expands space mining/combat, aerial combat, sliding-board puzzles, garden bombing, hex tactics, legacy VR survival and time-rewind puzzles. No upstream game was installed, built, run, test-run or playtested, and no user data was submitted.

Appended to open [PR #48](https://github.com/OpenEnvision/GameMap/pull/48), after head `7bcb528990995b78899d8a29af7aadb5951f9f50`. Remote main and PRs are checked before publication. The [foundation PR #46](https://github.com/OpenEnvision/GameMap/pull/46) also receives the HexGL correction without rewriting history. No third-party code or assets are copied.

<a id="cinderbelt"></a>

## Cinderbelt

- Source: [amoreo140/cinderbelt](https://github.com/amoreo140/cinderbelt/tree/b86b07ff9bf4071033a16f6cb986357787e1b247), commit `b86b07ff9bf4071033a16f6cb986357787e1b247`.
- Rendering: Imports WebGLRenderer directly from Three.js and constructs the shared renderer. App uses Preact to render DOM UI; the game creates its own GameRenderer and frame loop. [Renderer source](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/src/render/RenderContext.ts#L5).
- Game loop: Steps projectiles, damages individual ship parts and records hits/destruction; source and README describe mining, trade, contracts and modular shipbuilding. [Gameplay source](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/src/sim/combat/combat.ts#L472).
- Dependencies: Preact ^11.0.1 DOM UI; Fontsource Archivo and Atkinson Hyperlegible Next; TypeScript/Vite toolchain. Full runtime/dev manifest snapshot is recorded. Custom planar rigid-body/ship simulation with 3D rendering; browser Web Audio and IndexedDB saves. [package.json](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/package.json)
- License: MIT. MIT code; LICENSE-ASSETS.md separately licenses art, music and their sources under CC BY 4.0. Bundled fonts retain SIL OFL 1.1; runtime libraries retain their own MIT notices. The author documents AI-assisted code/art/music; these statements are not an independent provenance audit. [License file](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/LICENSE). [Additional notice](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/LICENSE-ASSETS.md). [Additional notice](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/THIRD-PARTY.md).
- Maturity: work-in-progress. README labels the game early but playable and under active development; package version 0.3.2. Playability is the author's claim, not a playtest result. [Maturity basis](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/README.md).
- Demo: [Author URL](https://amoreo140.github.io/cinderbelt/); `reader-error` on 2026-10-21. README-linked Pages URL could not be retrieved by the text reader. No game, save export or IndexedDB operation was executed. [Discovery source](https://github.com/amoreo140/cinderbelt/blob/b86b07ff9bf4071033a16f6cb986357787e1b247/README.md).
- Review limits: Flight/physics is planar despite 3D ships and environments; it is not a six-degree-of-freedom flight simulator. Mining, trade, balance, persistence and the author's test/bot claims were not run or independently reproduced. CC BY assets require attribution; the code's MIT grant does not replace the asset/font terms.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="sky-combat"></a>

## Sky Combat

- Source: [Gallind/Sky-Combat](https://github.com/Gallind/Sky-Combat/tree/6575ed310a6be912f29735ce4addfba0d3c39182), commit `6575ed310a6be912f29735ce4addfba0d3c39182`.
- Rendering: Creates Three.js Scene, PerspectiveCamera and WebGLRenderer; index.html loads Three r128 and GLTFLoader directly from CDNs. [Renderer source](https://github.com/Gallind/Sky-Combat/blob/6575ed310a6be912f29735ce4addfba0d3c39182/js/main.js#L158).
- Game loop: Spawns timed drone/jet waves, checks enemy elimination, heals between waves and completes/unlocks levels; main.js drives playing/won/lost states. [Gameplay source](https://github.com/Gallind/Sky-Combat/blob/6575ed310a6be912f29735ce4addfba0d3c39182/js/combat.js#L48).
- Dependencies: Vanilla script tags; Three.js GLTFLoader; Tailwind browser v4 for DOM UI; Web Audio and HTML Audio. No package manifest/build step in the reviewed tree. 
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/Gallind/Sky-Combat/blob/6575ed310a6be912f29735ce4addfba0d3c39182/LICENSE). 
- Maturity: prototype. README identifies a university free-style assignment and describes five levels; source includes wave/level transitions and health-driven game states. [Maturity basis](https://github.com/Gallind/Sky-Combat/blob/6575ed310a6be912f29735ce4addfba0d3c39182/README.md).
- Demo: [Author URL](https://eloquent-tulumba-7667c4.netlify.app/); `reader-error` on 2026-10-21. README-linked Netlify demo could not be retrieved by the text reader; no flight, wave or asset load was tested. [Discovery source](https://github.com/Gallind/Sky-Combat/blob/6575ed310a6be912f29735ce4addfba0d3c39182/README.md).
- Review limits: HTML credits list Freesound contributors and Sketchfab model authors, but individual asset licenses/provenance were not established for every file. CDN availability, pointer-lock input, five-level completion and browser compatibility were not tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="cube-parking"></a>

## Vibe Parking / Cube Parking

- Source: [arturitu/cube-parking](https://github.com/arturitu/cube-parking/tree/f7bd45312602c47dd89962246f1fc1e924b08219), commit `f7bd45312602c47dd89962246f1fc1e924b08219`.
- Rendering: Directly imports Three.js and constructs WebGLRenderer/Scene/PerspectiveCamera. React GameCanvas mounts an imperative GameEngine into a DOM div. [Renderer source](https://github.com/arturitu/cube-parking/blob/f7bd45312602c47dd89962246f1fc1e924b08219/src/engine/GameEngine.js#L1).
- Game loop: Constrains dragged blocks along grid axes with collisions; checkWin detects the target block leaving the board and records level completion. [Gameplay source](https://github.com/arturitu/cube-parking/blob/f7bd45312602c47dd89962246f1fc1e924b08219/src/engine/GameEngine.js#L283).
- Dependencies: React 19/React DOM DOM shell, Zustand state; Tailwind CSS, Vite and the React Vite plugin. Manifest contains no React Three Fiber. [package.json](https://github.com/arturitu/cube-parking/blob/f7bd45312602c47dd89962246f1fc1e924b08219/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/arturitu/cube-parking/blob/f7bd45312602c47dd89962246f1fc1e924b08219/LICENSE). 
- Maturity: prototype. Source implements block dragging, moves, level completion and a render loop; README concentrates on local setup rather than a release. [Maturity basis](https://github.com/arturitu/cube-parking/blob/f7bd45312602c47dd89962246f1fc1e924b08219/src/engine/GameEngine.js).
- Demo: `not-located` on 2026-10-21. No public play URL was located in the reviewed README or repository homepage metadata. The README documents a local Vite HTTPS server; no URL was guessed. [Discovery source](https://github.com/arturitu/cube-parking/blob/f7bd45312602c47dd89962246f1fc1e924b08219/README.md).
- Review limits: Sliding-block rules stay on a flat grid: classified as a 3D board game, not a freely navigable 3D world. README requires locally generated HTTPS certificates; none were generated or reused in this review. Google Fonts and all other asset/dependency terms were not individually audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="nyan-bomber"></a>

## Nyan Bomber

- Source: [imshota1009/Nyan-Bomber](https://github.com/imshota1009/Nyan-Bomber/tree/75d4b63af4d58ac2d5d37387c899d1081c050910), commit `75d4b63af4d58ac2d5d37387c899d1081c050910`.
- Rendering: Constructs Three.js WebGLRenderer, scene and perspective camera. The modular HTML loads vendored Three with an r128 CDN fallback; the root HTML also contains an inlined game. [Renderer source](https://github.com/imshota1009/Nyan-Bomber/blob/75d4b63af4d58ac2d5d37387c899d1081c050910/nyan-bomber/main.js#L5).
- Game loop: Updates bombs, player, enemies, boss and gate; time expiry loses and clearing all enemies advances the stage. stageClear calculates score/rank and persists records. [Gameplay source](https://github.com/imshota1009/Nyan-Bomber/blob/75d4b63af4d58ac2d5d37387c899d1081c050910/nyan-bomber/main.js#L175).
- Dependencies: Vanilla JavaScript, procedural Three.js geometry, Web Audio and browser storage; Firebase app/Firestore compat 10.12.0 scripts and Google Fonts in HTML. No npm manifest in the reviewed tree. 
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/imshota1009/Nyan-Bomber/blob/75d4b63af4d58ac2d5d37387c899d1081c050910/LICENSE). 
- Maturity: game. README and source describe multiple stages, cat selection, seed bombs, garden regeneration, tutorial and a boss battle; these were source-reviewed only. [Maturity basis](https://github.com/imshota1009/Nyan-Bomber/blob/75d4b63af4d58ac2d5d37387c899d1081c050910/README.md).
- Demo: [Author URL](https://nyan-bomber-game-app.web.app); `reader-error` on 2026-10-21. Author README links the Firebase-hosted site; text reader could not retrieve it. No play session, leaderboard write or Firebase call was executed. [Discovery source](https://github.com/imshota1009/Nyan-Bomber/blob/75d4b63af4d58ac2d5d37387c899d1081c050910/README.md).
- Review limits: Planar garden movement/bomb rules are rendered with real 3D geometry, so this entry is labeled 3d-board. Saving differs between entries: the modular core stageClear calls Firestore, but later main.js redeclares stageClear without that call. The root inlined stageClear does include a savePlaySession call; actual network success or deployed-version behavior is unknown. Firebase code can record stage/rank/score/time, cat and a locally generated user ID; no such submission was initiated in this review. External fonts, emoji rendering and all media rights were not independently audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="grid-wars"></a>

## Grid Wars

- Source: [loosecannons/grid-wars](https://github.com/loosecannons/grid-wars/tree/faf2c7a62ff586f12b77b4bd850e35b588e1cc72), commit `faf2c7a62ff586f12b77b4bd850e35b588e1cc72`.
- Rendering: Imports Three.js and its own addons directly, creates WebGLRenderer/Scene/Camera, and uses a manual frame loop with post-processing. [Renderer source](https://github.com/loosecannons/grid-wars/blob/faf2c7a62ff586f12b77b4bd850e35b588e1cc72/src/main.js#L1).
- Game loop: Eliminates defeated factions and ends the game when at most one team remains; source implements turns, cores and units on the hex board. [Gameplay source](https://github.com/loosecannons/grid-wars/blob/faf2c7a62ff586f12b77b4bd850e35b588e1cc72/src/game.js#L3454).
- Dependencies: Three.js import-map CDN plus native modules, Web Audio and Orbitron Google Font. ws ^8.18.0 supplies the Node multiplayer relay; Electron is optional desktop packaging rather than the renderer. [package.json](https://github.com/loosecannons/grid-wars/blob/faf2c7a62ff586f12b77b4bd850e35b588e1cc72/package.json)
- License: MIT. MIT code. NOTICE explicitly describes AI-generated, unreviewed and untested experimental software with no guarantee it works. Procedural models/audio are an author claim; TRON-related names/branding are not cleared by the MIT license. [License file](https://github.com/loosecannons/grid-wars/blob/faf2c7a62ff586f12b77b4bd850e35b588e1cc72/LICENSE). [Additional notice](https://github.com/loosecannons/grid-wars/blob/faf2c7a62ff586f12b77b4bd850e35b588e1cc72/NOTICE).
- Maturity: prototype. The author explicitly calls this an untested AI-generated experimental novelty. Source contains gameplay/victory paths, but this review does not establish a working release. [Maturity basis](https://github.com/loosecannons/grid-wars/blob/faf2c7a62ff586f12b77b4bd850e35b588e1cc72/README.md).
- Demo: `not-located` on 2026-10-21. Reviewed sources link a Docker image and release packages, not a public browser demo. No image/container/desktop binary was downloaded or run. [Discovery source](https://github.com/loosecannons/grid-wars/blob/faf2c7a62ff586f12b77b4bd850e35b588e1cc72/README.md).
- Review limits: Author NOTICE says it has not been reviewed/tested/verified for correctness or security and offers no usability guarantee; retain that warning when assessing this record. Hex tactics uses a planar board with 3D meshes; it is labeled 3d-board. Online play needs a relay, and the browser also needs external Three.js/font downloads. Multiplayer and optional Electron packaging were not tested. TRON film branding and other third-party rights are not granted by the code license.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="space-rocks"></a>

## Space Rocks

- Source: [moar-tech/spacerocks](https://github.com/moar-tech/spacerocks/tree/a03f7ff43a3456580cf16e81df1c611fb8e00ead), commit `a03f7ff43a3456580cf16e81df1c611fb8e00ead`.
- Rendering: Directly constructs Three.js WebGLRenderer and uses renderer.vr/VRDisplay APIs; this pinned version uses legacy WebVR, regardless of the live page title. [Renderer source](https://github.com/moar-tech/spacerocks/blob/a03f7ff43a3456580cf16e81df1c611fb8e00ead/scripts/moar/three.js#L22).
- Game loop: Enters gameplay, resets the player, generates successive asteroid waves and changes to game-over when lives reach zero; score is recorded on teardown. [Gameplay source](https://github.com/moar-tech/spacerocks/blob/a03f7ff43a3456580cf16e81df1c611fb8e00ead/scripts/main.js#L551).
- Dependencies: Vendored Three r88, THREE.VRController, TaskLists and Mode helpers; native Web Audio/browser APIs. No package manifest found in the reviewed tree. 
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/moar-tech/spacerocks/blob/a03f7ff43a3456580cf16e81df1c611fb8e00ead/LICENSE). 
- Maturity: legacy-release. README describes a 2017–2018 WebVR game requiring a position-tracked headset and two controllers. Its historical compatibility matrix is not a current browser support guarantee. [Maturity basis](https://github.com/moar-tech/spacerocks/blob/a03f7ff43a3456580cf16e81df1c611fb8e00ead/README.md).
- Demo: [Author URL](https://spacerocks.moar.io); `page-read` on 2026-10-21. Text reader returned the author site's HTML with VR instructions/requirements. This is only a page read; no VR session, controller use or asteroid gameplay was run. [Discovery source](https://github.com/moar-tech/spacerocks/blob/a03f7ff43a3456580cf16e81df1c611fb8e00ead/README.md).
- Review limits: Pinned source requires legacy WebVR APIs (renderer.vr and VRDisplay), not modern WebXR; present-day headset/browser support is unverified. The author lists Big Noodle Titling and Roboto fonts; font/media redistribution terms were not individually audited, so MIT is asserted for code only. index.html loads Google Analytics and source includes gameplay-stat events; no runtime analytics or user-data submission was triggered.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="causality-paradox"></a>

## Causality Paradox

- Source: [jzwood/FPP](https://github.com/jzwood/FPP/tree/eecf52584ef74dffe6dc9850262fcaa8c85c0606), commit `eecf52584ef74dffe6dc9850262fcaa8c85c0606`.
- Rendering: Directly constructs Three.js scene, perspective camera and WebGLRenderer; animate.js steps physics/player replay and renders the scene. [Renderer source](https://github.com/jzwood/FPP/blob/eecf52584ef74dffe6dc9850262fcaa8c85c0606/src/game/js/gameComponents/lightsCameraScene.js#L4).
- Game loop: Records movement, rewinds position history and replays a past self to cooperate with the player; falling resets the player within the locked-room puzzle game. [Gameplay source](https://github.com/jzwood/FPP/blob/eecf52584ef74dffe6dc9850262fcaa8c85c0606/src/game/js/gameComponents/player.js#L78).
- Dependencies: Vendored Three r78, Cannon.js and PointerLockControls; Gulp ^3.9.1 with legacy build plugins, captured in the development manifest. No replacement rendering framework was identified. [package.json](https://github.com/jzwood/FPP/blob/eecf52584ef74dffe6dc9850262fcaa8c85c0606/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/jzwood/FPP/blob/eecf52584ef74dffe6dc9850262fcaa8c85c0606/LICENSE). 
- Maturity: legacy-prototype. A 2017 first-person locked-room puzzle project; source includes runtime initialization, recording/playback and game scene assets. README browser caveats are historical claims. [Maturity basis](https://github.com/jzwood/FPP/blob/eecf52584ef74dffe6dc9850262fcaa8c85c0606/README.md).
- Demo: [Author URL](http://jzwood.github.io/FPP/build/home); `reader-error` on 2026-10-21. README-linked historical Pages URL could not be retrieved by the text reader (HTTPS normalization shown by the tool). No room, pointer lock or time replay was tested. [Discovery source](https://github.com/jzwood/FPP/blob/eecf52584ef74dffe6dc9850262fcaa8c85c0606/README.md).
- Review limits: Old Three/Cannon/Gulp versions and historical pointer-lock/browser caveats need a new runtime check before recommending compatibility. Texture/image/audio provenance and all vendored-library notices were not individually audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="spacer-js"></a>

## SpaceR.js

- Source: [firmanmm/SpaceR.js](https://github.com/firmanmm/SpaceR.js/tree/49c0b7cde6d95d4dbc2bbddd9fcad69410219f91), commit `49c0b7cde6d95d4dbc2bbddd9fcad69410219f91`.
- Rendering: Directly creates Three.js WebGLRenderer on the canvas; Update renders the current scene using a manual requestAnimationFrame loop. [Renderer source](https://github.com/firmanmm/SpaceR.js/blob/49c0b7cde6d95d4dbc2bbddd9fcad69410219f91/js/spacer.driver.js#L148).
- Game loop: Moves the ship in response to pointer input, spawns advancing obstacles, increases speed/distance score, saves a high score and returns to the menu on collision. [Gameplay source](https://github.com/firmanmm/SpaceR.js/blob/49c0b7cde6d95d4dbc2bbddd9fcad69410219f91/js/spacer.driver.js#L528).
- Dependencies: Vendored Three 100dev, jQuery, FBXLoader and inflate.js loaded by index.html; a small project-local scene/object lifecycle organizes the game. No npm manifest in the reviewed tree. 
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/firmanmm/SpaceR.js/blob/49c0b7cde6d95d4dbc2bbddd9fcad69410219f91/LICENSE). 
- Maturity: legacy-prototype. Author describes a 2018 computer-graphics class toy/tutorial project; the actual source implements obstacle-dodging, scoring and a collision/restart loop rather than only an empty scene. [Maturity basis](https://github.com/firmanmm/SpaceR.js/blob/49c0b7cde6d95d4dbc2bbddd9fcad69410219f91/README.md).
- Demo: `not-located` on 2026-10-21. README supplies code/use instructions and screenshots; no game-specific live URL was located. The generic author homepage was not treated as a game demo. [Discovery source](https://github.com/firmanmm/SpaceR.js/blob/49c0b7cde6d95d4dbc2bbddd9fcad69410219f91/README.md).
- Review limits: An educational toy implementation with a project-local lifecycle inspired by Unity; it does not import or use the Unity engine. Legacy Three APIs and FBX assets need runtime compatibility checks; FBX/font/texture rights were not individually audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Corrections and scope decisions

- [HexGL license correction](license-review-001.md) records the root MIT file, README file-exception clause, restrictive core headers and the limited scope of the upstream relicense diff. It remains pending, outside verified games. Existing unrelated legacy root content is preserved.
- Squirm is excluded because its [pinned README](https://github.com/farzinmirzaie/squirm/blob/e4f27ccc35eafe9c088989be20fd5c24cfc78918/README.md#L5) explicitly describes a 2.5D game. Direct Three.js alone does not override the dimensional boundary.
- The dimension documentation now says labels describe the rendered scene/board, not freedom of motion. Astray, Orbit Golf, Snake Charmer and Neon River retain their explicit planar-motion limitations.
- Temple Rumble's death handler displays retry and the survival-time leaderboard; [leaderboard.js](https://github.com/dammafra/temple-rumble/blob/1f39c09b447ed44e5bf504e4c440ae80a9771413/src/firebase/leaderboard.js#L26) offers submission only for eligible scores and saves through a button handler. It is not described as automatic submission.
- Schema v2 separates the human `license.label` from nullable `license.spdx`. GPL/AGPL variant uncertainty is recorded in notes and leaves SPDX null; Terrinha's conflicting root/file notices are also explicit instead of a false single MIT identifier.
- Nyan Bomber's modular core save hook is overridden by its later main.js stageClear, while the reviewed root inlined version includes a save call. No version was executed and no Firestore request success is asserted.
