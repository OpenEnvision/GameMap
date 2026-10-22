# Batch 001 source review — 2026-10-21

Reviewed against repository commit URLs shown below. Method: read upstream README, tree, available package manifests, renderer and gameplay paths, license and author demo links. No install, build, upstream test suite, browser rendering or gameplay was executed. A web-reader fetch failure is an access limitation, not a dead-link verdict.

GameMap base: `5d4de4f2984a8c1df1c6818b044a70c7080d085d`; no open PRs were present at the initial check. Existing root README and static site are preserved. The remaining legacy mention (YAZH) is identified in JSON; HexGL is now pending. The queue retains unresolved and excluded repositories without counting them as verified games.

## License correction — HexGL retained as a candidate

The first draft included HexGL as MIT. The 2026-10-21 file-header audit found CC BY-NC 3.0 notices in its active renderer and gameplay source. It is now **pending, outside the verified open-source index**: 11 games remain in this batch. [Pinned notices and relicense history](license-review-001.md) preserve the source evidence and explain the unresolved scope. Historical rendering/gameplay observations are not a finding of an open license.

<a id="super-kart-3djs"></a>

## Super Kart 3D.js

- Source: [fecolinhares/super-kart-3djs](https://github.com/fecolinhares/super-kart-3djs/tree/d94f63da26b6a01ecbfc1e301e5d754ea64649c2), commit `d94f63da26b6a01ecbfc1e301e5d754ea64649c2`.
- Rendering: Imports Three.js directly and creates WebGLRenderer, Scene and PerspectiveCamera. [Renderer source](https://github.com/fecolinhares/super-kart-3djs/blob/d94f63da26b6a01ecbfc1e301e5d754ea64649c2/src/render/SceneManager.js#L10).
- Game loop: Wires player race completion to final standings and a finish screen; README describes three laps against five AI rivals. [Gameplay source](https://github.com/fecolinhares/super-kart-3djs/blob/d94f63da26b6a01ecbfc1e301e5d754ea64649c2/src/main.js#L909).
- Dependencies: Vite ^5.4.0 build tooling; Three.js is the only declared runtime npm dependency. README describes procedural models/textures and Web Audio synthesis. [package.json](https://github.com/fecolinhares/super-kart-3djs/blob/d94f63da26b6a01ecbfc1e301e5d754ea64649c2/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/fecolinhares/super-kart-3djs/blob/d94f63da26b6a01ecbfc1e301e5d754ea64649c2/LICENSE).
- Maturity: game. Source includes racing states, results and restart flow; package version is 0.1.0. [Author README](https://github.com/fecolinhares/super-kart-3djs/blob/d94f63da26b6a01ecbfc1e301e5d754ea64649c2/README.md).
- Demo: [Author-linked URL](https://fecolinhares.github.io/super-kart-3djs/); `page-read` on 2026-10-21. HTML document and title were returned by the web reader with no extractable body text. Rendering and controls were not tested.
- Review limits: Source quality and visual-quality claims in the upstream README were not independently benchmarked. No browser, build, or automated upstream tests were executed.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="threejs-tower-defense"></a>

## Tower Defense (djpav)

- Source: [djpav/threejs-tower-defense](https://github.com/djpav/threejs-tower-defense/tree/dcb33e163c96e03d464d868b5b91ca5af93fe4f2), commit `dcb33e163c96e03d464d868b5b91ca5af93fe4f2`.
- Rendering: Game directly imports and constructs Three.js WebGLRenderer; SceneSetup creates the scene and lights. [Renderer source](https://github.com/djpav/threejs-tower-defense/blob/dcb33e163c96e03d464d868b5b91ca5af93fe4f2/src/core/Game.ts#L49).
- Game loop: Handles wave completion as a win, enemy damage reducing lives and a loss when lives reach zero. [Gameplay source](https://github.com/djpav/threejs-tower-defense/blob/dcb33e163c96e03d464d868b5b91ca5af93fe4f2/src/systems/GameStateManager.ts#L43).
- Dependencies: TypeScript, Vite, Tailwind CSS, lil-gui and Vitest; Web Audio synthesis described in README. [package.json](https://github.com/djpav/threejs-tower-defense/blob/dcb33e163c96e03d464d868b5b91ca5af93fe4f2/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/djpav/threejs-tower-defense/blob/dcb33e163c96e03d464d868b5b91ca5af93fe4f2/LICENSE).
- Maturity: game. Campaign, endless mode, tower upgrades and win/loss states are documented and present in reviewed source. [Author README](https://github.com/djpav/threejs-tower-defense/blob/dcb33e163c96e03d464d868b5b91ca5af93fe4f2/README.md).
- Demo: [Author-linked URL](https://djpav.github.io/threejs-tower-defense/); `reader-error` on 2026-10-21. The web reader could not retrieve the author-linked URL. This does not establish that the demo is offline.
- Review limits: Isometric presentation uses real Three.js scene objects; movement and pathfinding are on a grid. Live rendering, campaign balance and touch controls were not tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="mastermind-3d"></a>

## Mastermind 3D

- Source: [joeseesun/mastermind-3d](https://github.com/joeseesun/mastermind-3d/tree/c10c5525376e3b94538b7f6f1e75a78f33590ca8), commit `c10c5525376e3b94538b7f6f1e75a78f33590ca8`.
- Rendering: Imports Three.js directly and constructs WebGLRenderer, Scene, PerspectiveCamera and 3D marble meshes. [Renderer source](https://github.com/joeseesun/mastermind-3d/blob/c10c5525376e3b94538b7f6f1e75a78f33590ca8/scene-setup.js#L116).
- Game loop: Evaluates guesses, records rounds, ends on a solved code or after eight attempts. [Gameplay source](https://github.com/joeseesun/mastermind-3d/blob/c10c5525376e3b94538b7f6f1e75a78f33590ca8/game-logic.js#L147).
- Dependencies: Vendored Three.js RoomEnvironment and Lucide icons; native ES modules and import maps. Optional dependency-free Node leaderboard API; the README says core play works without it.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/joeseesun/mastermind-3d/blob/c10c5525376e3b94538b7f6f1e75a78f33590ca8/LICENSE).
- Maturity: game. Source includes guess evaluation, win/loss state, restart and presentation; README describes desktop and touch play. [Author README](https://github.com/joeseesun/mastermind-3d/blob/c10c5525376e3b94538b7f6f1e75a78f33590ca8/README.md).
- Demo: [Author-linked URL](https://mastermind.qiaomu.ai); `reader-error` on 2026-10-21. The author-linked demo could not be retrieved through the web reader; availability remains unconfirmed.
- Review limits: This is a 3D-rendered board game with discrete board rules, not a freely navigable 3D world. Optional leaderboard service and upstream test claims were not exercised.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="puzzle-cylinder"></a>

## PuzzleCylinder

- Source: [JakeSiegers/PuzzleCylinder](https://github.com/JakeSiegers/PuzzleCylinder/tree/2a559160acb005bcae212840727028912937aadd), commit `2a559160acb005bcae212840727028912937aadd`.
- Rendering: Creates a Three.js WebGLRenderer, Scene and PerspectiveCamera; index_template.html loads the vendored Three.js script. [Renderer source](https://github.com/JakeSiegers/PuzzleCylinder/blob/2a559160acb005bcae212840727028912937aadd/game/PuzzleGame.js#L66).
- Game loop: Detects the tower reaching the ceiling and runs a loss animation; matches and score drive the rising cylindrical puzzle. [Gameplay source](https://github.com/JakeSiegers/PuzzleCylinder/blob/2a559160acb005bcae212840727028912937aadd/game/PuzzleTower.js#L363).
- Dependencies: Vendored tween.js, Stats.js, dat.GUI and html2canvas; Babel 6 tooling in package.json. [package.json](https://github.com/JakeSiegers/PuzzleCylinder/blob/2a559160acb005bcae212840727028912937aadd/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/JakeSiegers/PuzzleCylinder/blob/2a559160acb005bcae212840727028912937aadd/LICENSE.txt).
- Maturity: legacy-release. README links a published build and documents keyboard/touch controls; source has scoring and game-over logic. [Author README](https://github.com/JakeSiegers/PuzzleCylinder/blob/2a559160acb005bcae212840727028912937aadd/README.md).
- Demo: [Author-linked URL](https://jakesiegers.github.io/PuzzleCylinder/); `page-read` on 2026-10-21. The web reader returned an HTML document titled Jake's Puzzle Cylinder, with no extractable body. No game interaction was tested.
- Review limits: The project also has a flat mode; this entry covers its cylindrical 3D mode. Legacy build/versioning and referenced imagery/assets were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="racez-io"></a>

## Racez.io

- Source: [MankyDanky/web-racing](https://github.com/MankyDanky/web-racing/tree/49d3db2b11585ab3ab4dc0e424f58d50256a8a27), commit `49d3db2b11585ab3ab4dc0e424f58d50256a8a27`.
- Rendering: Directly imports Three.js and creates a WebGLRenderer; runtime imports a local Ammo.js module. [Renderer source](https://github.com/MankyDanky/web-racing/blob/49d3db2b11585ab3ab4dc0e424f58d50256a8a27/frontend/src/main.js#L1040).
- Game loop: Collects finish times, ranks finished players and maintains race-started/race-finished state and checkpoint progression. [Gameplay source](https://github.com/MankyDanky/web-racing/blob/49d3db2b11585ab3ab4dc0e424f58d50256a8a27/frontend/src/main.js#L775).
- Dependencies: Runtime source uses vendored Ammo.js/Bullet physics. The manifest also declares cannon-es and cannon-es-debugger; declaration does not prove active use. PeerJS networking, Vite tooling and @vercel/analytics are declared; backend requirements include Django 4.2.20 and Django REST Framework 3.16.0. [frontend/package.json](https://github.com/MankyDanky/web-racing/blob/49d3db2b11585ab3ab4dc0e424f58d50256a8a27/frontend/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/MankyDanky/web-racing/blob/49d3db2b11585ab3ab4dc0e424f58d50256a8a27/LICENSE).
- Maturity: game. Source contains race timing, checkpoints, result rankings and a party flow documented by the author. [Author README](https://github.com/MankyDanky/web-racing/blob/49d3db2b11585ab3ab4dc0e424f58d50256a8a27/README.md).
- Demo: [Author-linked URL](https://racez.io); `reader-error` on 2026-10-21. The README-linked site could not be retrieved through the web reader; no conclusion about server uptime or matchmaking.
- Review limits: Multiplayer needs backend matchmaking/party services and PeerJS connectivity; these were not tested. Manifest physics declarations differ from the active Ammo import; both are recorded.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="trio-td"></a>

## TD (Project Trio)

- Source: [project-trio/td](https://github.com/project-trio/td/tree/ca9ad1fb254d2d1b180454c0ef8388186c3b4185), commit `ca9ad1fb254d2d1b180454c0ef8388186c3b4185`.
- Rendering: Imports Three.js render classes directly and constructs WebGLRenderer; Vue is used for application UI. [Renderer source](https://github.com/project-trio/td/blob/ca9ad1fb254d2d1b180454c0ef8388186c3b4185/src/play/render/Renderer.js#L119).
- Game loop: Consumes game updates and wave winners, advances the wave state and starts play. [Gameplay source](https://github.com/project-trio/td/blob/ca9ad1fb254d2d1b180454c0ef8388186c3b4185/src/play/Game/index.js#L145).
- Dependencies: Vue 2, Vue Router, Vue CLI, @ky-is/trio-client, seedrandom and three-voxel-loader are declared in devDependencies. README requires the separate Trio game server and describes Socket.IO/WebSocket networking and MagicaVoxel assets. [package.json](https://github.com/project-trio/td/blob/ca9ad1fb254d2d1b180454c0ef8388186c3b4185/package.json)
- License: ISC. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/project-trio/td/blob/ca9ad1fb254d2d1b180454c0ef8388186c3b4185/LICENSE).
- Maturity: prototype. README describes early development; the client implements playable tower-defense waves and multiplayer updates. [Author README](https://github.com/project-trio/td/blob/ca9ad1fb254d2d1b180454c0ef8388186c3b4185/README.md).
- Demo: [Author-linked URL](https://ttd.netlify.com); `reader-error` on 2026-10-21. Author-linked Netlify URL could not be retrieved through the web reader. No backend or multiplayer session was attempted.
- Review limits: Requires the separate project-trio/trio server; this entry verifies the client rendering path, not server deployment. Vue is auxiliary DOM UI; no Three.js component renderer was identified in the reviewed manifest/render path.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="yet-another-zombie-horror"></a>

## Yet Another Zombie Horror

- Source: [UstymUkhman/YetAnotherZombieHorror](https://github.com/UstymUkhman/YetAnotherZombieHorror/tree/cdbde45a9911200376a449957408c3bebbaccd12), commit `cdbde45a9911200376a449957408c3bebbaccd12`.
- Rendering: Imports WebGLRenderer and other Three.js classes directly and constructs the renderer for the level. [Renderer source](https://github.com/UstymUkhman/YetAnotherZombieHorror/blob/cdbde45a9911200376a449957408c3bebbaccd12/src/scenes/LevelScene.ts#L55).
- Game loop: Implements damage and player death events; Enemy.ts implements hits, attack/death transitions and enemy removal. [Gameplay source](https://github.com/UstymUkhman/YetAnotherZombieHorror/blob/cdbde45a9911200376a449957408c3bebbaccd12/src/characters/Player.ts#L514).
- Dependencies: Ammo.js or three-mesh-bvh collision/physics, animejs and raindrop-fx; Svelte DOM UI, TypeScript, Vite and optional Electron packaging. Nested build/package.json configures the physics/shader setup step. [package.json](https://github.com/UstymUkhman/YetAnotherZombieHorror/blob/cdbde45a9911200376a449957408c3bebbaccd12/package.json), [build/package.json](https://github.com/UstymUkhman/YetAnotherZombieHorror/blob/cdbde45a9911200376a449957408c3bebbaccd12/build/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/UstymUkhman/YetAnotherZombieHorror/blob/cdbde45a9911200376a449957408c3bebbaccd12/LICENSE).
- Maturity: archived-prototype. Repository is archived; the author showcase describes an unfinished survival-shooter prototype and missing HUD/mobile work. [Author README](https://github.com/UstymUkhman/YetAnotherZombieHorror/blob/cdbde45a9911200376a449957408c3bebbaccd12/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. Reviewed README and the author's linked showcase provide source and a video, but no verified live play URL was located.
- Review limits: Archived and unfinished; author notes animation issues and missing health/ammo UI. Svelte is auxiliary UI; physics setup, build, video claims and combat were not run. No live demo is claimed from the existence of a video.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="perspectives"></a>

## Perspectives

- Source: [juanuys/perspectives](https://github.com/juanuys/perspectives/tree/9d34062cfb87b7668b4e266ba4e7bab54573739c), commit `9d34062cfb87b7668b4e266ba4e7bab54573739c`.
- Rendering: Local helper imports Three.js and constructs WebGLRenderer with Three.js controls and post-processing. [Renderer source](https://github.com/juanuys/perspectives/blob/9d34062cfb87b7668b4e266ba4e7bab54573739c/lib/WebGLApp.ts#L55).
- Game loop: Compares camera alignment with the hidden target, advances to the next puzzle and reveals a final image after completion. [Gameplay source](https://github.com/juanuys/perspectives/blob/9d34062cfb87b7668b4e266ba4e7bab54573739c/index.ts#L151).
- Dependencies: Parcel 1, TypeScript, tween.js, Tone.js, controls helpers and three-pmrem; see the complete manifest snapshot. index.ts imports lodash, which is not a direct dependency in package.json; clean-install resolution was not tested. [package.json](https://github.com/juanuys/perspectives/blob/9d34062cfb87b7668b4e266ba4e7bab54573739c/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/juanuys/perspectives/blob/9d34062cfb87b7668b4e266ba4e7bab54573739c/LICENSE).
- Maturity: prototype. Short standalone puzzle with implemented level progression; package version is 0.0.1. [Author README](https://github.com/juanuys/perspectives/blob/9d34062cfb87b7668b4e266ba4e7bab54573739c/README.md).
- Demo: [Author-linked URL](https://juanuys.com/perspectives); `page-read` on 2026-10-21. The author homepage redirected to a trailing-slash HTML document titled Perspectives. Rendering was not run.
- Review limits: Legacy Parcel/Three.js toolchain; reproducible install and asset loading were not tested. Projected-image and audio rights were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="glory-box"></a>

## Glory Box

- Source: [vanrez-nez/glory-box-game](https://github.com/vanrez-nez/glory-box-game/tree/5cc0ba8a242e2c079aee08a5e1bda02f404238f1), commit `5cc0ba8a242e2c079aee08a5e1bda02f404238f1`.
- Rendering: Imports three/webgpu directly and creates a Three.js WebGPURenderer; also uses Three.js TSL post-processing. [Renderer source](https://github.com/vanrez-nez/glory-box-game/blob/5cc0ba8a242e2c079aee08a5e1bda02f404238f1/src/game/engine.ts#L90).
- Game loop: Wires player death to an explosion/audio sequence and a timed restart; the loop updates player physics, enemies and map. [Gameplay source](https://github.com/vanrez-nez/glory-box-game/blob/5cc0ba8a242e2c079aee08a5e1bda02f404238f1/src/game/main.ts#L207).
- Dependencies: Vue 3/Vue Router/Vuex for app UI; Vite, TypeScript, GSAP, mainloop.js, threads, skybox-studio-runtime and other declared utilities. Current source uses Three.js WebGPU even though the brief README retains older webpack-era setup text. [package.json](https://github.com/vanrez-nez/glory-box-game/blob/5cc0ba8a242e2c079aee08a5e1bda02f404238f1/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/vanrez-nez/glory-box-game/blob/5cc0ba8a242e2c079aee08a5e1bda02f404238f1/LICENSE).
- Maturity: work-in-progress. Current renderer and platformer runtime are present, but the README's build instructions lag behind the current Vite manifest. [Author README](https://github.com/vanrez-nez/glory-box-game/blob/5cc0ba8a242e2c079aee08a5e1bda02f404238f1/README.md).
- Demo: [Author-linked URL](https://glory-box-game-rhig-ivan-juarezs-projects.vercel.app); `reader-error` on 2026-10-21. Repository homepage could not be retrieved through the web reader. This is not a demonstrated deployment failure.
- Review limits: WebGPU/Three.js backend compatibility and GPU fallback were not tested. Current gameplay wraps around a cylindrical world; UI framework dependencies are disclosed. Assets and external skybox utility licensing were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="astray"></a>

## Astray

- Source: [wwwtyro/Astray](https://github.com/wwwtyro/Astray/tree/d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0), commit `d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0`.
- Rendering: Loads Three.js directly and constructs a Three.js WebGLRenderer, scene, camera and maze meshes. [Renderer source](https://github.com/wwwtyro/Astray/blob/d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0/index.html#L289).
- Game loop: Tests the ball reaching the maze exit, increases maze dimensions and generates the next level. [Gameplay source](https://github.com/wwwtyro/Astray/blob/d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0/index.html#L215).
- Dependencies: Vendored Box2dWeb physics, jQuery and keyboard.js; plain HTML/JavaScript without a package manifest.
- License: Unlicense. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/wwwtyro/Astray/blob/d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0/License.md).
- Maturity: legacy-release. Published author-hosted maze game with procedural progression and documented controls. [Author README](https://github.com/wwwtyro/Astray/blob/d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0/README.md).
- Demo: [Author-linked URL](https://wwwtyro.github.io/Astray/); `page-read` on 2026-10-21. The published HTML exposes arrow-key instructions, exit objective and Level 1. WebGL and movement were not run.
- Review limits: Ball physics are planar Box2D; the actual playfield is rendered as a 3D maze. Vendored dependency revisions and texture provenance were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="harvest"></a>

## Harvest

- Source: [JamesLMilner/Harvest](https://github.com/JamesLMilner/Harvest/tree/e234f4e2fd090b7128afa6c0342bc9a7455e9499), commit `e234f4e2fd090b7128afa6c0342bc9a7455e9499`.
- Rendering: Creates a Three.js WebGLRenderer and PerspectiveCamera; index.html loads Three.js r71 and PointerLockControls. [Renderer source](https://github.com/JamesLMilner/Harvest/blob/e234f4e2fd090b7128afa6c0342bc9a7455e9499/js/harvest.js#L147).
- Game loop: Checks player height above 1350 and triggers the game-won routine for reaching the top of the crates. [Gameplay source](https://github.com/JamesLMilner/Harvest/blob/e234f4e2fd090b7128afa6c0342bc9a7455e9499/js/harvest.js#L251).
- Dependencies: Three.js PointerLockControls and sky shader, Zepto and async.js; CDN and vendored scripts, no package manifest.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/JamesLMilner/Harvest/blob/e234f4e2fd090b7128afa6c0342bc9a7455e9499/LICENSE.md).
- Maturity: legacy-prototype. Small first-person crate-climbing game with an explicit win condition and a historical demo link. [Author README](https://github.com/JamesLMilner/Harvest/blob/e234f4e2fd090b7128afa6c0342bc9a7455e9499/README.md).
- Demo: [Author-linked URL](http://www.loxodrome.io/Harvest/index.html); `reader-error` on 2026-10-21. The historical author-linked HTTP demo was redirected to HTTPS by the reader and could not be retrieved. Current availability is unconfirmed.
- Review limits: Very old Three.js release and pointer-lock code; browser/CDN compatibility was not tested. Moon/crate assets and textures were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Additional primary source observations

- [HexGL landing page](https://hexgl.bkcore.com/) links its play page and says the ladder is closed.
- [YAZH author's showcase](https://discourse.threejs.org/t/yet-another-zombie-horror-a-simple-first-third-person-zombie-survival-shooter/80760) describes archiving the prototype and missing health/ammo indicators. It is not treated as a live demo.
- Candidate/exclusion evidence is in [candidates.json](../candidates.json), including the restrictive Marble Mouse source release and simulation/viewer scope questions.
