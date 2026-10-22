# Batch 007 source review — 2026-10-22

Adds **8 source-reviewed games**, for **64** in the index. Coverage expands WebXR strategy, spherical exploration, voxel escort, bird/aircraft shooting, an endless runner, geometric minesweeper and a legacy single-player shooter. No upstream game was installed, built, test-run, browser-executed or playtested; no user score, name, image, location or VR session was submitted.

Starts from latest main `1bd421c48344a8bafa79936a1c9c7aaeea8673bd`. Prior PRs #46 and #48 were already merged by other operations; this batch uses a fresh branch and preserves their integrated fixes, the legacy root README and unrelated research. No merge, force push, deployment or settings change is performed by this batch. No third-party source code or assets are copied.

<a id="vr-sentinel"></a>

## The Sentinel — VR

- Source: [SteveSmith16384/vr-sentinel](https://github.com/SteveSmith16384/vr-sentinel/tree/5399c5e2685c28a3a3c7e281a984a274ae242d06), commit `5399c5e2685c28a3a3c7e281a984a274ae242d06`.
- Rendering: Directly creates Three.js WebGLRenderer, enables renderer.xr and uses setAnimationLoop to update and render the actual Sentinel game; imports the vendored Three module. [Renderer source](https://github.com/SteveSmith16384/vr-sentinel/blob/5399c5e2685c28a3a3c7e281a984a274ae242d06/index.html#L48).
- Game loop: Absorbing the Sentinel completes a level; teleporting costs energy and being seen can deplete it and restart play. Terrain height and stacked cubes determine visibility. [Gameplay source](https://github.com/SteveSmith16384/vr-sentinel/blob/5399c5e2685c28a3a3c7e281a984a274ae242d06/TheSentinelGame.js#L286).
- Dependencies: Vendored Three.js, VRButton, XRControllerModelFactory and OBJLoader; project-local map/ECS helpers. No package manifest in the reviewed entry path. 
- License: GPL-3.0 (only/or-later variant unconfirmed). LICENSE.txt and README identify GPL v3, but a project-specific only/or-later election was not established; spdx is null rather than guessing. README credits models to kochsoft/free_sentinel_gl; model/audio and third-party notices were not comprehensively audited. [License file](https://github.com/SteveSmith16384/vr-sentinel/blob/5399c5e2685c28a3a3c7e281a984a274ae242d06/LICENSE.txt). 
- Maturity: legacy-release. Source implements level completion and energy-based failure; the author itch listing labels it Released. Legacy Three.js/XR runtime compatibility was not tested. [Maturity basis](https://github.com/SteveSmith16384/vr-sentinel/blob/5399c5e2685c28a3a3c7e281a984a274ae242d06/README.md).
- Demo: [Author URL](https://stephensmith.itch.io/the-sentinal-vr); `page-read` on 2026-10-22. Demo URL is from repository homepage metadata observed on 2026-10-22. Text reader returned the author's itch page and its WebXR embedding caveat/alternative Bitbucket link; no iframe, headset or controller gameplay was started. [Discovery source](https://api.github.com/repos/SteveSmith16384/vr-sentinel).
- Review limits: VR controller/headset and a suitable secure WebXR context are needed; author landing-page embedding concerns are not resolved by this text-only check. README describes a simplified remake of Geoff Crammond's game; the code license is not a grant of all original branding/asset rights. Repository certificate/key files were not fetched, installed or reused.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="periplus"></a>

## PERIPLUS

- Source: [TonyDowney/periplus](https://github.com/TonyDowney/periplus/tree/29608f0c4d23eaf653cada1372076e7dfc3bb105), commit `29608f0c4d23eaf653cada1372076e7dfc3bb105`.
- Rendering: Directly imports Three.js and constructs WebGLRenderer/Scene; the imperative main loop drives a spherical world and post-processing. [Renderer source](https://github.com/TonyDowney/periplus/blob/29608f0c4d23eaf653cada1372076e7dfc3bb105/src/main.js#L60).
- Game loop: Approaching cairns records discoveries and opens logs; finding all eight starts an ending that reports survey percentage, distance and elapsed time. [Gameplay source](https://github.com/TonyDowney/periplus/blob/29608f0c4d23eaf653cada1372076e7dfc3bb105/src/main.js#L378).
- Dependencies: Three.js is the only declared runtime npm dependency; esbuild ^0.28.1 bundles a single-file release, while native ES modules/import-map serve development. Author documents procedural terrain, props and audio; no independent asset-provenance audit or upstream browser test was performed. [package.json](https://github.com/TonyDowney/periplus/blob/29608f0c4d23eaf653cada1372076e7dfc3bb105/package.json)
- License: MIT. LICENSE and package.json declare MIT. The package-lock root still says ISC; this metadata discrepancy is preserved, not silently resolved or treated as proof of a different file-level license. [License file](https://github.com/TonyDowney/periplus/blob/29608f0c4d23eaf653cada1372076e7dfc3bb105/LICENSE). 
- Maturity: game. Author describes a compact exploration game-jam entry; source implements eight discovery destinations, survey milestones, a journal and a definite ending. [Maturity basis](https://github.com/TonyDowney/periplus/blob/29608f0c4d23eaf653cada1372076e7dfc3bb105/README.md).
- Demo: [Author URL](https://tonydowney.github.io/periplus/); `reader-error` on 2026-10-22. Pinned README links this Pages URL. The text reader could not retrieve it; no walking, survey, pointer lock or ending was executed. [Discovery source](https://github.com/TonyDowney/periplus/blob/29608f0c4d23eaf653cada1372076e7dfc3bb105/README.md).
- Review limits: Requires WebGL2, keyboard and mouse per README; pointer lock and whole-world reachability were not tested. README contains an AI development transcript and self-reported tests; those reports are attributed to the author and were not reproduced. package-lock root license/name differ from the current package.json; retain both notices when evaluating redistribution.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="vox-lords"></a>

## VoxLords

- Source: [Lallassu/VoxLords](https://github.com/Lallassu/VoxLords/tree/02eb32c30522fae572cd00e1325b18143183702a), commit `02eb32c30522fae572cd00e1325b18143183702a`.
- Rendering: Creates a Three.js WebGLRenderer and renders the scene in its own requestAnimationFrame loop; the custom voxel/map system uses Three.js directly. [Renderer source](https://github.com/Lallassu/VoxLords/blob/02eb32c30522fae572cd00e1325b18143183702a/js/main.js#L178).
- Game loop: The rescued character follows the player, reaching the castle advances through map IDs and completes the final map; escort death fails the rescue. [Gameplay source](https://github.com/Lallassu/VoxLords/blob/02eb32c30522fae572cd00e1325b18143183702a/js/princess.js#L70).
- Dependencies: Vendored Three r70, THREEx keyboard/resize helpers, jQuery and project-local voxel/block physics, PNG map and VOX loading. server/package.json declares socket.io 1.0.6; README documents a Node web server. This helper stack is distinct from a replacement rendering engine. [server/package.json](https://github.com/Lallassu/VoxLords/blob/02eb32c30522fae572cd00e1325b18143183702a/server/package.json)
- License: MIT. Root code license verified. This does not establish identical terms for every third-party model, texture, sound, font or vendored dependency; assets were not comprehensively rights-audited. [License file](https://github.com/Lallassu/VoxLords/blob/02eb32c30522fae572cd00e1325b18143183702a/LICENSE.txt). 
- Maturity: legacy-prototype. Author explicitly describes unpolished source. The reviewed entry contains a four-map rescue/escort objective, rather than only the separate engine-test link. [Maturity basis](https://github.com/Lallassu/VoxLords/blob/02eb32c30522fae572cd00e1325b18143183702a/README.md).
- Demo: [Author URL](http://voxlords.webgl.nu); `reader-error` on 2026-10-22. README-linked historical play URL could not be retrieved through the text reader; the HTTPS normalization by the tool is not proof of site failure. [Discovery source](https://github.com/Lallassu/VoxLords/blob/02eb32c30522fae572cd00e1325b18143183702a/README.md).
- Review limits: index.html line 195 references js/particleEngine.js, which is absent from the reviewed recursive tree; the effect on runtime startup was not tested. Legacy browser APIs, server dependencies and bundled music/models/fonts need fresh compatibility and rights checks. Horizontal escort movement takes place on a rendered voxel terrain; this record does not promise free 3D movement.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="parrot-hunt"></a>

## ParrotHunt

- Source: [Lallassu/ParrotHunt](https://github.com/Lallassu/ParrotHunt/tree/5bd7d0560e69361069633888d69280061eb4d372), commit `5bd7d0560e69361069633888d69280061eb4d372`.
- Rendering: Directly creates Three.js WebGLRenderer, a perspective scene and a manual animation/render loop; birds and scenery are 3D objects. [Renderer source](https://github.com/Lallassu/ParrotHunt/blob/5bd7d0560e69361069633888d69280061eb4d372/js/main.js#L189).
- Game loop: Starts a timed shooting round, ends it with hit/ammo/time scoring and sends the resulting score through the project network adapter. [Gameplay source](https://github.com/Lallassu/ParrotHunt/blob/5bd7d0560e69361069633888d69280061eb4d372/js/main.js#L42).
- Dependencies: Vendored Three r67, jQuery 1.9.1, THREEx helpers, ShaderParticles and OBJ/MTL loaders; Node HTTP/Socket.IO plus dblite/SQLite-backed score handling in server/server.js. 
- License: MIT. MIT code. The palm model's bundled notice explicitly says CC0; this is not a finding that every other model, sound, font or vendored dependency is MIT/CC0. [License file](https://github.com/Lallassu/ParrotHunt/blob/5bd7d0560e69361069633888d69280061eb4d372/LICENSE). [Additional notice](https://github.com/Lallassu/ParrotHunt/blob/5bd7d0560e69361069633888d69280061eb4d372/models/palm/BLENDSWAP_LICENSE.txt).
- Maturity: legacy-prototype. README calls the code unpolished; source contains countdown/start, timed end-state and a result screen. [Maturity basis](https://github.com/Lallassu/ParrotHunt/blob/5bd7d0560e69361069633888d69280061eb4d372/README.md).
- Demo: [Author URL](http://parrothunt.nergal.se); `reader-error` on 2026-10-22. README-linked historical demo could not be retrieved by the text reader; no round, Socket.IO session or score submission was initiated. [Discovery source](https://github.com/Lallassu/ParrotHunt/blob/5bd7d0560e69361069633888d69280061eb4d372/README.md).
- Review limits: Uses a fixed shooting viewpoint in a rendered 3D environment; it is not a free-roaming shooter. Source initializes a localhost:8080 score connection and EndGame sends a player name/score/hits via send_Score; backend reachability and persistence were not tested. Old vendored server dependencies and every asset's license have not been exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="drakonas"></a>

## Drakonas

- Source: [Casmo/Drakonas](https://github.com/Casmo/Drakonas/tree/a85a35bc027f8f62df8245864507df1e49ad77ff), commit `a85a35bc027f8f62df8245864507df1e49ad77ff`.
- Rendering: Directly constructs Three.js Scene, WebGLRenderer and PerspectiveCamera; its own requestAnimationFrame render function advances the game. [Renderer source](https://github.com/Casmo/Drakonas/blob/a85a35bc027f8f62df8245864507df1e49ad77ff/js/game.js#L7).
- Game loop: Removing defeated enemies awards mission score; destroying a boss calls mission completion, while game.js health depletion triggers game-over. [Gameplay source](https://github.com/Casmo/Drakonas/blob/a85a35bc027f8f62df8245864507df1e49ad77ff/js/player.js#L297).
- Dependencies: Vendored Three r67, Tween.js, OBJLoader and project-local DOM/JSON helpers; browser audio and localStorage-backed game settings. No root npm manifest found. 
- License: MIT. Root code license verified. This does not establish identical terms for every third-party model, texture, sound, font or vendored dependency; assets were not comprehensively rights-audited. [License file](https://github.com/Casmo/Drakonas/blob/a85a35bc027f8f62df8245864507df1e49ad77ff/LICENSE). 
- Maturity: legacy-prototype. README explicitly calls the hosted version a very early prototype. Source contains playable mission combat and boss/health result paths; planned shops/upgrades are not asserted complete. [Maturity basis](https://github.com/Casmo/Drakonas/blob/a85a35bc027f8f62df8245864507df1e49ad77ff/README.md).
- Demo: [Author URL](https://couchfriends.com/src/games/drakonas/); `page-read` on 2026-10-22. The reader returned only a Loading document at the README-linked URL. This does not establish a rendered scene, working mission or completed asset load. [Discovery source](https://github.com/Casmo/Drakonas/blob/a85a35bc027f8f62df8245864507df1e49ad77ff/README.md).
- Review limits: Top-down aircraft combat has constrained movement while scenery and enemies are rendered in 3D. Shop/hangar/upgrading paragraphs mix future plans with implementation; the catalog does not claim the full design is shipped. Bundled OBJ/texture/audio provenance and legacy browser behavior were not independently audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="dino3d"></a>

## T-Rex Run 3D

- Source: [Priler/dino3d](https://github.com/Priler/dino3d/tree/5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b), commit `5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b`.
- Rendering: Creates Three.js WebGLRenderer directly; the source managers are assembled into the entry bundle by the reviewed Gulp build task. [Renderer source](https://github.com/Priler/dino3d/blob/5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b/js/src/init.js#L26).
- Game loop: Tests 3D collision boxes against obstacles and stops the run on contact; game_manager.js stops audio/particles, displays restart and resets player/enemies/score. [Gameplay source](https://github.com/Priler/dino3d/blob/5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b/js/src/enemy_manager.js#L332).
- Dependencies: Vendored Three r112, vox.js, Three Nebula particles, Howler and Visibly; legacy Gulp/Sass/rigger/minifier tooling. The root file named package.json is lock-shaped data with requires/lockfileVersion/dependency objects, not a normal application manifest. It is reviewed as a tooling limitation and not misrepresented as dependency version strings. 
- License: GPL-3.0 (only/or-later variant unconfirmed). GPL v3 text is present, but a project-specific only/or-later election was not established; spdx remains null. README says the voxel graphics were hand-created in MagicaVoxel; that is an author statement, not an independent asset rights audit. [License file](https://github.com/Priler/dino3d/blob/5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b/LICENSE). 
- Maturity: legacy-prototype. Author calls it an unpolished experiment; source implements jump/crouch obstacle play, scoring, death and restart. [Maturity basis](https://github.com/Priler/dino3d/blob/5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b/README.md).
- Demo: [Author URL](https://priler.github.io/dino3d/); `page-read` on 2026-10-22. Text reader returned an asset-loading/error screen marked ERR_LOADING_ASSETS 0%. It did not run the game, so this is not a browser-runtime failure diagnosis. README also links a lower-quality entry. [Discovery source](https://github.com/Priler/dino3d/blob/5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b/README.md).
- Review limits: Runner motion is constrained rather than freely navigable; 3D voxel scenery and collision volumes do not imply full movement freedom. The misnamed lock-shaped package.json and legacy toolchain need manual setup review; no install or rebuild was attempted. Assets, service-worker/offline behavior, browser input and upstream bug-fix claims were not tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="three-minesweeper"></a>

## ThreeMineSweeper

- Source: [ppizarror/ThreeMineSweeper](https://github.com/ppizarror/ThreeMineSweeper/tree/0a05195ef0e951f67fd09f298a858b29574b3337), commit `0a05195ef0e951f67fd09f298a858b29574b3337`.
- Rendering: Creates Three.js WebGLRenderer directly for a 3D geometric board viewer; its own animation thread renders the scene. [Renderer source](https://github.com/ppizarror/ThreeMineSweeper/blob/0a05195ef0e951f67fd09f298a858b29574b3337/src/engine/tms/viewer.js#L652).
- Game loop: Handles reveals/flags, mine hits and game-over, and checks all eligible faces to declare a win on geometric surface maps. [Gameplay source](https://github.com/ppizarror/ThreeMineSweeper/blob/0a05195ef0e951f67fd09f298a858b29574b3337/src/engine/tms/minesweeper.js#L230).
- Dependencies: Vendored Three r124, jQuery 3.4.1, Bootstrap CSS and assorted browser UI/audio helpers loaded from local lib/ paths. package.json contains developer lint/compiler/Karma tooling and @types/three ^0.125.0; those type declarations are not the runtime Three revision. [package.json](https://github.com/ppizarror/ThreeMineSweeper/blob/0a05195ef0e951f67fd09f298a858b29574b3337/package.json)
- License: MIT. Root code license verified. This does not establish identical terms for every third-party model, texture, sound, font or vendored dependency; assets were not comprehensively rights-audited. [License file](https://github.com/ppizarror/ThreeMineSweeper/blob/0a05195ef0e951f67fd09f298a858b29574b3337/LICENSE). 
- Maturity: prototype. README explicitly calls it experimental geometric 3D minesweeper; source implements board interaction and both game-over and win state. [Maturity basis](https://github.com/ppizarror/ThreeMineSweeper/blob/0a05195ef0e951f67fd09f298a858b29574b3337/README.md).
- Demo: [Author URL](https://ppizarror.github.io/ThreeMineSweeper/); `reader-error` on 2026-10-22. Pinned README links the Pages game; the text reader could not retrieve it. No map, username prompt, DB-IP lookup or leaderboard submission was executed. [Discovery source](https://github.com/ppizarror/ThreeMineSweeper/blob/0a05195ef0e951f67fd09f298a858b29574b3337/README.md).
- Review limits: This is a 3D surface/board puzzle, not a freely navigable world; flat or geometric mine rules remain board rules. The score path imports DB-IP visitor lookup, records country code and submits name/time/generator data to a remote score endpoint. No such submission was initiated. All optional board generators, external services and vendored asset/library terms were not exhaustively checked.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="mind-your-head"></a>

## Mind Your Head

- Source: [zhangjikai/mind-your-head](https://github.com/zhangjikai/mind-your-head/tree/aa61a2e9174f3722337231beee6853f4a9c349a1), commit `aa61a2e9174f3722337231beee6853f4a9c349a1`.
- Rendering: Creates a Three.js scene/camera and WebGLRenderer, with a legacy CanvasRenderer fallback; the manual animation loop updates and renders the shooter. [Renderer source](https://github.com/zhangjikai/mind-your-head/blob/aa61a2e9174f3722337231beee6853f4a9c349a1/js/main/GameStart.js#L41).
- Game loop: The run checks remaining life for defeat and remaining enemies for level victory, updates stored scores/stage and offers retry or continuation. [Gameplay source](https://github.com/zhangjikai/mind-your-head/blob/aa61a2e9174f3722337231beee6853f4a9c349a1/js/main/GameStart.js#L209).
- Dependencies: Vendored Three r60 and helpers; game.html loads jQuery 1.9.1, while package.json declares jQuery ^3.1.1 plus loaders.css/remodal/sweetalert. Both entry and manifest versions are disclosed. Gulp 3 development scripts; project-local input, gravity, audio and image-cropping helpers. [package.json](https://github.com/zhangjikai/mind-your-head/blob/aa61a2e9174f3722337231beee6853f4a9c349a1/package.json)
- License: MIT. MIT code. The crop icon notice separately identifies Font Awesome SIL OFL and Eco Ico CC0; that does not license every face image, background, font or sound under MIT. [License file](https://github.com/zhangjikai/mind-your-head/blob/aa61a2e9174f3722337231beee6853f4a9c349a1/LICENSE). [Additional notice](https://github.com/zhangjikai/mind-your-head/blob/aa61a2e9174f3722337231beee6853f4a9c349a1/crop/fonts/codropsicons/license.txt).
- Maturity: legacy-prototype. Source and README document level and score modes, four weapons, victory/loss and local progress. The author says the network battle mode was removed because its Java server was unavailable. [Maturity basis](https://github.com/zhangjikai/mind-your-head/blob/aa61a2e9174f3722337231beee6853f4a9c349a1/README.md).
- Demo: [Author URL](https://head.zhangjikai.com); `reader-error` on 2026-10-22. The host is specified by the pinned CNAME file. Text reader could not retrieve it; no face image was selected, game run or user score action performed. [Discovery source](https://github.com/zhangjikai/mind-your-head/blob/aa61a2e9174f3722337231beee6853f4a9c349a1/CNAME).
- Review limits: Single-player entry only: commented server code is not evidence of a currently available multiplayer mode. README lists mobile gravity-sensor failures, blocked autoplay, landscape-lock and screen-awake issues; present-day behavior was not retested. User-supplied face images and other bundled media need their own rights review; no image or permission prompt was used here.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Additional checked boundaries

- VoxLords' [script reference](https://github.com/Lallassu/VoxLords/blob/02eb32c30522fae572cd00e1325b18143183702a/index.html#L195) points to `js/particleEngine.js`, absent in the reviewed recursive tree. This static inconsistency is recorded without claiming an observed runtime crash.
- Dino3D's [source assembly file](https://github.com/Priler/dino3d/blob/5b0a0903d0f5c1cd7c4a7dd325d06b175a0b3d3b/js/src/build.js) includes the reviewed renderer and gameplay managers; its Gulp task produces the entry bundle. The lock-shaped root package file is not a conventional dependency manifest and was not installed.
- ParrotHunt's [EndGame path](https://github.com/Lallassu/ParrotHunt/blob/5bd7d0560e69361069633888d69280061eb4d372/js/main.js#L80) calls `send_Score`; ThreeMineSweeper's [score path](https://github.com/ppizarror/ThreeMineSweeper/blob/0a05195ef0e951f67fd09f298a858b29574b3337/src/engine/tms/minesweeper.js#L706) performs a DB-IP country lookup before a remote score request. Those are source observations, not executed submissions.
- Demo page reads include an itch listing, Drakonas' Loading text and Dino3D's asset-error text. They establish only retrieved documents, not successful WebXR/WebGL rendering or a diagnosed failure in a real browser.
- The existing 11 pending/5 excluded queue is preserved, including HexGL's core-file license conflict. No unresolved candidate was promoted merely to fill this batch.
