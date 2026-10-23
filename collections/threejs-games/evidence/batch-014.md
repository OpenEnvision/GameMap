# Batch 014 source review — 2026-10-23

Adds **2 source-reviewed games**, for **92** in the index. Reviews inspect the actual entry, direct renderer, game objective/state loop, manifests, root and relevant file-level licenses, asset notices and author demo sources. No upstream install, build, automated suite, browser game execution or playtest occurred.

Prepared after PR #62 head `fd980d6b6f0609cf172dc74a9c524621cef0db30` and main `1bd421c48344a8bafa79936a1c9c7aaeea8673bd`. Remote main/open PR state is checked again before publication; a merged branch is not reused. No merge, deployment, force push, history rewrite, settings change or paid service is used. No third-party source/assets are copied into GameMap.

<a id="asteroid-patrol-3d"></a>

## AsteroidPatrol3D

- Source: [erichlof/AsteroidPatrol3D](https://github.com/erichlof/AsteroidPatrol3D/tree/8e7b283e70bc4e094cc4d66b9d1d878f13e2dab1), commit `8e7b283e70bc4e094cc4d66b9d1d878f13e2dab1`.
- Rendering: Directly creates Three.js WebGLRenderer. AsteroidPatrol3D.html loads that variable module and runs its authored frame loop, rendering both the game scene and radar; the vendored library header identifies r70. [Renderer source](https://github.com/erichlof/AsteroidPatrol3D/blob/8e7b283e70bc4e094cc4d66b9d1d878f13e2dab1/js/AsteroidPatrolVariables.js#L56).
- Game loop: Player death hides the ship, decrements lives and sets gameOver below the remaining-life threshold; the game-over sequence displays a banner then resets level, score and lives. Separate asteroid/UFO hits award points and level setup increments progression. [Gameplay source](https://github.com/erichlof/AsteroidPatrol3D/blob/8e7b283e70bc4e094cc4d66b9d1d878f13e2dab1/AsteroidPatrol3D.html#L2890).
- Dependencies: Vanilla JavaScript; vendored Three.js r70, THREEx.FirstPersonControls/keyboard/GameTimer, virtual-button joystick and Howler 2.0-era sound helpers. Active scripts are listed in AsteroidPatrol3D.html; no npm manifest was located. 
- License: CC0-1.0 (code). Root contains CC0 1.0 text. Third-party Three.js, helper libraries, models/textures/sounds retain their own terms; all asset/dependency rights were not exhaustively audited and are not asserted to be uniformly CC0. [License file](https://github.com/erichlof/AsteroidPatrol3D/blob/8e7b283e70bc4e094cc4d66b9d1d878f13e2dab1/LICENSE). 
- Maturity: legacy-release. README's January 2015 note says the author completed all TODOs; source implements scoring, life loss, level setup and game-over/reset. That historical completion statement does not establish modern runtime compatibility. [Maturity basis](https://github.com/erichlof/AsteroidPatrol3D/blob/8e7b283e70bc4e094cc4d66b9d1d878f13e2dab1/README.md).
- Demo: [Author URL](http://erichlof.github.io/AsteroidPatrol3D/AsteroidPatrol3D.html); `page-read` on 2026-10-23. Pinned README supplies the author demo. Reader retrieved Loading/title/controls/score/sound labels only; this is not an executed or playable-session check. [Discovery source](https://github.com/erichlof/AsteroidPatrol3D/blob/8e7b283e70bc4e094cc4d66b9d1d878f13e2dab1/README.md).
- Review limits: Authored ship/UFO/asteroid procedural-model claims are supported by source descriptions but are not an exhaustive rights audit of sounds, textures or dependencies. Desktop/mobile input, stereo Howler audio, radar, collision/life accounting and modern-browser compatibility were not exercised. The source's life threshold and automatic restart are reported directly; a particular number of successful playable levels or deaths was not tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="3d-light-cycles"></a>

## 3dLightCycles

- Source: [erichlof/3dLightCycles](https://github.com/erichlof/3dLightCycles/tree/dc9062090f3073883c2e54a4b79eb210dfe2aad2), commit `dc9062090f3073883c2e54a4b79eb210dfe2aad2`.
- Rendering: Directly creates Three.js WebGLRenderer; 3dLightCycles.html loads this module, the enemy AI and its own animation/render loop. The active vendored Three.js header identifies r71. [Renderer source](https://github.com/erichlof/3dLightCycles/blob/dc9062090f3073883c2e54a4b79eb210dfe2aad2/js/3dLightCyclesVariables.js#L63).
- Game loop: Wall/trail collisions dispatch player or enemy crash. Crash handlers mark that cycle not alive, stop turns and show an explosion; trail-disappear completion restores alive/visible state for continued play against the AI. [Gameplay source](https://github.com/erichlof/3dLightCycles/blob/dc9062090f3073883c2e54a4b79eb210dfe2aad2/3dLightCycles.html#L2683).
- Dependencies: Vanilla JavaScript; Three.js r71, project ShadowMesh, THREEx.FirstPersonControls/keyboard/GameTimer, virtual-button joystick, Howler and authored enemyAI. No npm manifest was located. 
- License: CC0-1.0 (code). Root contains CC0 1.0 text. Third-party Three.js, helper libraries, models/textures/sounds retain their own terms; all asset/dependency rights were not exhaustively audited and are not asserted to be uniformly CC0. [License file](https://github.com/erichlof/3dLightCycles/blob/dc9062090f3073883c2e54a4b79eb210dfe2aad2/LICENSE). 
- Maturity: legacy-prototype. The historical prototype has steering, growing trails, enemy AI, collision/crash and recovery. README explicitly lists scoring and a winner animation as future TODOs; those are not presented as implemented. [Maturity basis](https://github.com/erichlof/3dLightCycles/blob/dc9062090f3073883c2e54a4b79eb210dfe2aad2/README.md).
- Demo: [Author URL](http://erichlof.github.io/3dLightCycles/3dLightCycles.html); `reader-error` on 2026-10-23. Pinned README links the author demo. Reader could not retrieve it; no browser/game execution or permanent-downtime finding is claimed. [Discovery source](https://github.com/erichlof/3dLightCycles/blob/dc9062090f3073883c2e54a4b79eb210dfe2aad2/README.md).
- Review limits: Scoring, a formal match-winner display and acceleration are listed as future work in the author notes; no such finished competitive loop is claimed. Cycle simulation is on an XZ arena with volumetric cycle/trail meshes and a movable 3D camera, not free XYZ vehicle motion. TRON-inspired branding/model resemblance is not a rights clearance. Model, sound and texture provenance and all helper licenses were not comprehensively audited. Collision fairness, AI, turning input and repeated recovery were not exercised.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Queue decisions

This batch adds no queue decisions; the existing pending/excluded records remain unchanged.


Demo outcomes for this batch: 1 page-read, 1 reader-error. These are text-reader/source-discovery results, not gameplay tests or site-down findings. The queue now retains 30 pending and 16 excluded repositories; earlier HexGL/file-license corrections remain intact.
