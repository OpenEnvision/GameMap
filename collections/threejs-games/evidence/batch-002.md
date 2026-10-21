# Batch 002 source review — 2026-10-21

Adds 10 games to the 12-entry first batch, for **22 source-verified records**. All are source/link reviews: no upstream game install, build, test suite, browser execution or play session occurred. React DOM shells are disclosed where present, and direct Three.js rendering is supported by a pinned constructor path. A reader failure is not a site-down finding.

Series dependency: [PR #46](https://github.com/OpenEnvision/GameMap/pull/46), first-batch head `140f04e667a864f9414a9a6199198a8b91c1720e`. The latest remote main and PR state must be rechecked before publishing this increment. Four queued projects are promoted only after their renderer/gameplay/license reviews are complete; the queue still contains unresolved scope/asset questions.

<a id="apex-formula-2026"></a>

## APEX FORMULA 2026

- Source: [ahacker-1/apex-formula-2026](https://github.com/ahacker-1/apex-formula-2026/tree/410198faf310fe3376b07f2415083df8b146fff1), commit `410198faf310fe3376b07f2415083df8b146fff1`.
- Rendering: Directly imports Three.js and constructs WebGLRenderer; index.html maps Three.js to the local lib directory. [Renderer source](https://github.com/ahacker-1/apex-formula-2026/blob/410198faf310fe3376b07f2415083df8b146fff1/js/main.js#L172).
- Game loop: Marks finishers, selects the winner and constructs ordered race results; the README describes quick race, championship and time-trial modes. [Gameplay source](https://github.com/ahacker-1/apex-formula-2026/blob/410198faf310fe3376b07f2415083df8b146fff1/js/race.js#L1197).
- Dependencies: Plain browser ES modules, vendored Three.js post-processing and custom vehicle/race systems. Playwright and matching npm Three.js are development-only; optional paid audio-generation tools are not required or used in this review. [package.json](https://github.com/ahacker-1/apex-formula-2026/blob/410198faf310fe3376b07f2415083df8b146fff1/package.json)
- License: Apache-2.0. Original project code/assets are Apache-2.0 according to LICENSE and the author's provenance inventory. Vendored Three.js remains MIT. Optional generated audio is excluded from the open-source release; its service terms are not represented as Apache-2.0. [License file](https://github.com/ahacker-1/apex-formula-2026/blob/410198faf310fe3376b07f2415083df8b146fff1/LICENSE). [Additional notice](https://github.com/ahacker-1/apex-formula-2026/blob/410198faf310fe3376b07f2415083df8b146fff1/THIRD_PARTY_NOTICES.md). [Additional notice](https://github.com/ahacker-1/apex-formula-2026/blob/410198faf310fe3376b07f2415083df8b146fff1/ASSET_PROVENANCE.md).
- Maturity: game. Source contains race direction, finishing order and results; README describes a fictional 24-round championship and 21 AI rivals. [Author README](https://github.com/ahacker-1/apex-formula-2026/blob/410198faf310fe3376b07f2415083df8b146fff1/README.md).
- Demo: [Author-linked URL](https://apex-formula-2026.vercel.app); `page-read` on 2026-10-21. Author URL redirected to https://apexformularacing.com/ and returned a loading screen. Asset completion and driving were not tested.
- Review limits: Simulation accuracy, performance and upstream browser-test claims were not independently measured. A loading page does not establish a working race or loaded assets.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="tower-of-hanoi-3d"></a>

## Tower of Hanoi 3D

- Source: [anisches/towerofHanoi](https://github.com/anisches/towerofHanoi/tree/bbcb622aeb8598f5eab83a47e4c8b42fb00b3e80), commit `bbcb622aeb8598f5eab83a47e4c8b42fb00b3e80`.
- Rendering: Imports three/webgpu directly and constructs Three.js WebGPURenderer, scene and camera. [Renderer source](https://github.com/anisches/towerofHanoi/blob/bbcb622aeb8598f5eab83a47e4c8b42fb00b3e80/src/main.js#L105).
- Game loop: Checks that every disk reaches the third stack, counts moves, triggers celebration and shows the win overlay; initGame resets play. [Gameplay source](https://github.com/anisches/towerofHanoi/blob/bbcb622aeb8598f5eab83a47e4c8b42fb00b3e80/src/main.js#L1517).
- Dependencies: Three.js is the only declared runtime npm dependency; Vite ^5.4.0 is a dev dependency. Web Audio synthesis and custom disk motion/drag logic. [package.json](https://github.com/anisches/towerofHanoi/blob/bbcb622aeb8598f5eab83a47e4c8b42fb00b3e80/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/anisches/towerofHanoi/blob/bbcb622aeb8598f5eab83a47e4c8b42fb00b3e80/LICENSE).
- Maturity: work-in-progress. README explicitly labels early development and lists mobile support/optimization as future work. [Author README](https://github.com/anisches/towerofHanoi/blob/bbcb622aeb8598f5eab83a47e4c8b42fb00b3e80/README.md).
- Demo: [Author-linked URL](https://anisches.github.io/towerofHanoi/); `reader-error` on 2026-10-21. The author-linked Pages URL could not be retrieved through the text reader; current availability is unconfirmed.
- Review limits: Discrete Hanoi board rules rendered with actual 3D disks; this is not a free-roaming world. WebGPU/backend compatibility and drag interaction were not tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="neon-doom-pit"></a>

## Neon Doom Pit

- Source: [PaulAtkins88/neon-doom-pit](https://github.com/PaulAtkins88/neon-doom-pit/tree/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830), commit `83ce2aa21bfe329f26eb8ddc68742fcd78b8f830`.
- Rendering: Directly imports Three.js and constructs WebGLRenderer; its own requestAnimationFrame loop coordinates the game. [Renderer source](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/apps/web/src/core/Game.ts#L72).
- Game loop: Advances cleared waves and returns a victory transition after the configured final wave; core Game handles damage, game-over and restart. [Gameplay source](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/apps/web/src/systems/WaveSystem.ts#L83).
- Dependencies: Vite, TypeScript, PointerLockControls, pnpm workspaces and shared protocol types. Optional authoritative multiplayer server uses ws/tsx. GitHub Pages only hosts the static client; no server is implied by that link. [package.json](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/package.json), [apps/web/package.json](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/apps/web/package.json), [apps/server/package.json](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/apps/server/package.json), [packages/shared/package.json](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/packages/shared/package.json)
- License: MIT. Code is MIT. README identifies included Kenney-derived sprite assets as CC0/public domain. This is the author's asset attribution, not an independent per-file asset audit. [License file](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/LICENSE). [Additional notice](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/README.md).
- Maturity: prototype. README describes a compact one-arena FPS with a three-wave single-player loop and a separate multiplayer server. [Author README](https://github.com/PaulAtkins88/neon-doom-pit/blob/83ce2aa21bfe329f26eb8ddc68742fcd78b8f830/README.md).
- Demo: [Author-linked URL](https://paulatkins88.github.io/neon-doom-pit/); `reader-error` on 2026-10-21. Author-linked static demo could not be retrieved by the reader; single-player and networking were not run.
- Review limits: Uses camera-facing sprites in a 3D arena; sprite art is disclosed rather than treated as a pure model-only renderer. Multiplayer needs a separate live server; the Pages URL does not supply it.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="island-survival"></a>

## Island Survival

- Source: [alexandrosang21/island-survival](https://github.com/alexandrosang21/island-survival/tree/9140b5b94f60b5f67da58cf546850b24e65bff69), commit `9140b5b94f60b5f67da58cf546850b24e65bff69`.
- Rendering: Directly constructs Three.js WebGPURenderer and initializes it; source detects the selected WebGPU/WebGL backend. [Renderer source](https://github.com/alexandrosang21/island-survival/blob/9140b5b94f60b5f67da58cf546850b24e65bff69/src/core/renderer.ts#L15).
- Game loop: Runs simulation and rendering for player stats, combat, wildlife, gathering, crafting, building and night raids. [Gameplay source](https://github.com/alexandrosang21/island-survival/blob/9140b5b94f60b5f67da58cf546850b24e65bff69/src/main.ts#L334).
- Dependencies: @dimforge/rapier3d-compat ^0.14.0 is the only other declared runtime package; TypeScript and Vite are dev tools. README describes procedural placeholder audio, localStorage saves and optional future recorded audio. [package.json](https://github.com/alexandrosang21/island-survival/blob/9140b5b94f60b5f67da58cf546850b24e65bff69/package.json)
- License: MIT. Repository code is MIT. The asset credits file contains a policy heading but no per-asset inventory; external asset provenance is not established by that file. [License file](https://github.com/alexandrosang21/island-survival/blob/9140b5b94f60b5f67da58cf546850b24e65bff69/LICENSE). [Additional notice](https://github.com/alexandrosang21/island-survival/blob/9140b5b94f60b5f67da58cf546850b24e65bff69/public/assets/CREDITS.md).
- Maturity: work-in-progress. Version 0.1.0; source includes the survival loop, while README notes planned cloud saves and incomplete translations. [Author README](https://github.com/alexandrosang21/island-survival/blob/9140b5b94f60b5f67da58cf546850b24e65bff69/README.md).
- Demo: [Author-linked URL](https://forest.angelov.gr); `reader-error` on 2026-10-21. The author-linked site could not be retrieved through this text reader. No claim about gameplay or uptime.
- Review limits: GPU fallback behavior, save durability, building rules and raid balance were not tested. Asset credits are incomplete; MIT code is not evidence for all asset rights.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="minecraft-adventure"></a>

## Minecraft Adventure

- Source: [JasonTM17/Minecraft_Adventure](https://github.com/JasonTM17/Minecraft_Adventure/tree/137e6c52600e5dad5f055bb25316a53c58535b17), commit `137e6c52600e5dad5f055bb25316a53c58535b17`.
- Rendering: Directly imports Three.js, creates WebGLRenderer and drives frames with renderer.setAnimationLoop. [Renderer source](https://github.com/JasonTM17/Minecraft_Adventure/blob/137e6c52600e5dad5f055bb25316a53c58535b17/src/core/game.ts#L27).
- Game loop: Advances hunting, travel, crystal and dragon objectives; dragonSlain completes the adventure and fires the completion callback. [Gameplay source](https://github.com/JasonTM17/Minecraft_Adventure/blob/137e6c52600e5dad5f055bb25316a53c58535b17/src/adventure/quest-manager.ts#L75).
- Dependencies: Three.js is the only declared runtime dependency; Vite, TypeScript, Vitest and oxlint are dev tools. Custom voxel/AABB physics and terrain; README describes procedural canvas textures and Web Audio synthesis. [package.json](https://github.com/JasonTM17/Minecraft_Adventure/blob/137e6c52600e5dad5f055bb25316a53c58535b17/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/JasonTM17/Minecraft_Adventure/blob/137e6c52600e5dad5f055bb25316a53c58535b17/LICENSE).
- Maturity: game. Version 0.3.0, with survival systems and an implemented quest-chain victory; README provides build/test instructions. [Author README](https://github.com/JasonTM17/Minecraft_Adventure/blob/137e6c52600e5dad5f055bb25316a53c58535b17/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. Reviewed README provides local/Docker run instructions but no author-published live-play URL; no Pages URL was guessed.
- Review limits: README's zero-external-assets statement is recorded as an author claim, not an exhaustive asset audit. Procedural generation, mining persistence, boss difficulty and upstream test counts were not tested. This fan project is not represented as an official Minecraft release.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="stick-steel"></a>

## Stick & Steel

- Source: [Rabneba/stick-steel](https://github.com/Rabneba/stick-steel/tree/4c8e1d05a1ec47db93b687a81a82878727308b20), commit `4c8e1d05a1ec47db93b687a81a82878727308b20`.
- Rendering: Imports Three.js directly, creates WebGLRenderer and runs its own animation loop and scene rendering; React/Vinext hosts the client scene. [Renderer source](https://github.com/Rabneba/stick-steel/blob/4c8e1d05a1ec47db93b687a81a82878727308b20/lib/duel/scene.ts#L39).
- Game loop: Applies defeat by setting health to zero, enters the finished phase, selects the winner and supports a reset/rematch path. [Gameplay source](https://github.com/Rabneba/stick-steel/blob/4c8e1d05a1ec47db93b687a81a82878727308b20/lib/duel/physics.ts#L713).
- Dependencies: Rapier ^0.19.0 weapon/ragdoll physics; React 19, React DOM, Vinext, Genex embed/multiplayer and the full UI utility dependency snapshot are disclosed. Solo practice and the rig lab can run locally according to README; online duels use Genex relay services. Models, sounds and textures use Git LFS. [package.json](https://github.com/Rabneba/stick-steel/blob/4c8e1d05a1ec47db93b687a81a82878727308b20/package.json)
- License: MIT. Project code is MIT. Bundled Patrick Hand font has its own SIL Open Font License 1.1 notice. README states third-party dependencies retain their own licenses; Git LFS assets were not exhaustively audited. [License file](https://github.com/Rabneba/stick-steel/blob/4c8e1d05a1ec47db93b687a81a82878727308b20/LICENSE). [Additional notice](https://github.com/Rabneba/stick-steel/blob/4c8e1d05a1ec47db93b687a81a82878727308b20/public/fonts/OFL.txt).
- Maturity: prototype. Author labels it a dueling prototype with training, bots, practice and online bouts. [Author README](https://github.com/Rabneba/stick-steel/blob/4c8e1d05a1ec47db93b687a81a82878727308b20/README.md).
- Demo: [Author-linked URL](https://genex.games/stick-steel); `page-read` on 2026-10-21. The Genex host page was readable and described bot/online duels. The embedded game was not launched or interacted with.
- Review limits: React is an auxiliary app/UI shell; no React Three Fiber is declared or used in the reviewed renderer path. Online relay, Git LFS asset download and physical combat were not tested. No account, paid service, asset download or generated-art service was used in this review.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="skyward"></a>

## Skyward

- Source: [arjunemirchandani/skyward-flight-simulator](https://github.com/arjunemirchandani/skyward-flight-simulator/tree/5fde882dc8fe33bd3067504c8181c85747b6fb60), commit `5fde882dc8fe33bd3067504c8181c85747b6fb60`.
- Rendering: Imports Three.js through an explicit CDN import map and directly constructs WebGLRenderer; the same HTML file runs requestAnimationFrame. [Renderer source](https://github.com/arjunemirchandani/skyward-flight-simulator/blob/5fde882dc8fe33bd3067504c8181c85747b6fb60/index.html#L411).
- Game loop: Completes runway-to-runway missions with gate, touchdown and time scoring; ring courses also record best times. [Gameplay source](https://github.com/arjunemirchandani/skyward-flight-simulator/blob/5fde882dc8fe33bd3067504c8181c85747b6fb60/index.html#L3535).
- Dependencies: Single-file HTML/JavaScript game; Three.js/add-ons via unpkg; no package manifest found. Author describes procedural terrain/weather/traffic and synthesized audio; flight model is explicitly arcade-style.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/arjunemirchandani/skyward-flight-simulator/blob/5fde882dc8fe33bd3067504c8181c85747b6fb60/LICENSE).
- Maturity: game. Source implements scored missions and persistent logbook/records, differentiating it from a flight-scene showcase. [Author README](https://github.com/arjunemirchandani/skyward-flight-simulator/blob/5fde882dc8fe33bd3067504c8181c85747b6fb60/README.md).
- Demo: [Author-linked URL](https://arjunemirchandani.github.io/skyward-flight-simulator/); `reader-error` on 2026-10-21. The author-linked Pages URL could not be retrieved through the reader; flight and scoring were not tested.
- Review limits: A network connection is required for the Three.js CDN on first load. Flight realism, collisions, weather and route score balance were not tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="voxel-musou"></a>

## Voxel Musou

- Source: [mike007jd/voxel-musou](https://github.com/mike007jd/voxel-musou/tree/aba5fb8f43b713e88e8ac3a3105e48f01941dc7f), commit `aba5fb8f43b713e88e8ac3a3105e48f01941dc7f`.
- Rendering: Directly imports Three.js and constructs WebGLRenderer with Three.js post-processing; no component renderer is involved. [Renderer source](https://github.com/mike007jd/voxel-musou/blob/aba5fb8f43b713e88e8ac3a3105e48f01941dc7f/src/post/post.js#L206).
- Game loop: Ends stories with win/loss result events, freezes final statistics and supports chapter/trial progression; main.js drives fixed-step battles. [Gameplay source](https://github.com/mike007jd/voxel-musou/blob/aba5fb8f43b713e88e8ac3a3105e48f01941dc7f/src/story/index.js#L64).
- Dependencies: Plain ES modules, vendored Three.js/add-ons, custom fixed 60 Hz simulation and procedural Web Audio. No package manifest found; Node-based simulation checks exist upstream but were not run.
- License: MIT. Code and Three.js are MIT per the author's notices. README identifies the bundled Yuji Boku font subset as SIL OFL 1.1 and states original commercial-game assets are not included; this claim was not independently audited. [License file](https://github.com/mike007jd/voxel-musou/blob/aba5fb8f43b713e88e8ac3a3105e48f01941dc7f/LICENSE). [Additional notice](https://github.com/mike007jd/voxel-musou/blob/aba5fb8f43b713e88e8ac3a3105e48f01941dc7f/README.md).
- Maturity: game. Source implements campaign win/loss, results and chapter/trial state; README documents progression and records. [Author README](https://github.com/mike007jd/voxel-musou/blob/aba5fb8f43b713e88e8ac3a3105e48f01941dc7f/README.md).
- Demo: [Author-linked URL](https://voxel-musou.vercel.app); `reader-error` on 2026-10-21. The author-linked Vercel URL could not be retrieved through the reader. No battlefield rendering or combat was tested.
- Review limits: Hundreds-of-enemies performance and source/asset originality claims are not independent test results. Font licensing differs from MIT code; campaign progress uses origin-specific localStorage. Fan-project branding does not grant rights in third-party trademarks.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="simdrone"></a>

## Drone World / SimDrone

- Source: [realEdwinJ/SimDrone](https://github.com/realEdwinJ/SimDrone/tree/ecfa202b879d85b4bafff3528afd86eb7676cf9c), commit `ecfa202b879d85b4bafff3528afd86eb7676cf9c`.
- Rendering: Imports Three.js directly, aliases it as T and constructs WebGLRenderer; its own animation function renders the scene. [Renderer source](https://github.com/realEdwinJ/SimDrone/blob/ecfa202b879d85b4bafff3528afd86eb7676cf9c/lib/simulator.js#L16).
- Game loop: Moves delivery missions from pickup to drop-off, awards points on delivery, and separately completes checkpoint races with recorded finish time. [Gameplay source](https://github.com/realEdwinJ/SimDrone/blob/ecfa202b879d85b4bafff3528afd86eb7676cf9c/lib/simulator.js#L809).
- Dependencies: Vanilla JavaScript with Three.js; esbuild ^0.28.1 is the bundler although listed under dependencies. Custom drone dynamics, procedural city and browser DOM/touch HUD. [package.json](https://github.com/realEdwinJ/SimDrone/blob/ecfa202b879d85b4bafff3528afd86eb7676cf9c/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/realEdwinJ/SimDrone/blob/ecfa202b879d85b4bafff3528afd86eb7676cf9c/LICENSE).
- Maturity: game. Source includes delivery rewards, timed racing, battery/health and crash/reset states; README provides local build instructions. [Author README](https://github.com/realEdwinJ/SimDrone/blob/ecfa202b879d85b4bafff3528afd86eb7676cf9c/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. README mentions Pages deployment workflows but provides no live URL; none was inferred from the repository name.
- Review limits: Flight dynamics and collision/health simulation were not tested. Declared fonts and all procedural/third-party asset provenance were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="orbit-golf"></a>

## Orbit Golf

- Source: [ronpicard/orbit-golf](https://github.com/ronpicard/orbit-golf/tree/c854d9829da8828d2a35f7c15c4dfbd51a6ebd73), commit `c854d9829da8828d2a35f7c15c4dfbd51a6ebd73`.
- Rendering: Imports Three.js/add-ons directly and constructs WebGLRenderer; React renders separate menus/HUD rather than the 3D scene. [Renderer source](https://github.com/ronpicard/orbit-golf/blob/c854d9829da8828d2a35f7c15c4dfbd51a6ebd73/src/render/Engine.ts#L796).
- Game loop: Returns goal, hazard and rest outcomes for shots; the renderer reacts to goal/rest, and the README documents stroke limits and hole progression. [Gameplay source](https://github.com/ronpicard/orbit-golf/blob/c854d9829da8828d2a35f7c15c4dfbd51a6ebd73/src/game/physics.ts#L371).
- Dependencies: React/React DOM 19.3.0 UI, TypeScript, Vite, custom GLSL/post-processing and Web Audio synthesis. Custom planar Newtonian gravity, velocity-Verlet stepping, friction, collision and saved progress; no backend according to README. [package.json](https://github.com/ronpicard/orbit-golf/blob/c854d9829da8828d2a35f7c15c4dfbd51a6ebd73/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/ronpicard/orbit-golf/blob/c854d9829da8828d2a35f7c15c4dfbd51a6ebd73/LICENSE).
- Maturity: game. Version 2.4.0; source implements goal/hazard/rest outcomes and README documents an 18-hole scorecard and progression. [Author README](https://github.com/ronpicard/orbit-golf/blob/c854d9829da8828d2a35f7c15c4dfbd51a6ebd73/README.md).
- Demo: [Author-linked URL](https://ronpicard.github.io/orbit-golf/); `reader-error` on 2026-10-21. The author-linked Pages URL was attempted in this review session and could not be retrieved; availability remains unknown.
- Review limits: Underlying ball simulation is planar while the fairway, golfer, hazards and cameras are rendered in 3D. React DOM is disclosed; no React Three Fiber appears in the reviewed manifest or renderer path. Stored solver solutions, hole finishability, physics accuracy and mobile controls were not executed or tested.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Queue decisions

- Promoted APEX FORMULA 2026, Tower of Hanoi 3D, Neon Doom Pit and Orbit Golf from the first-batch pending queue after direct review.
- Added pending Arena, WizardWarz and Earth Defender for multiplayer/client-server review.
- Kept Trigger Rally and LBA Remake as explicit restricted-asset research; their code licenses do not license all game content.
- Excluded gorescript classic from this full-3D index because its README describes a 2.5D FPS.

All queue sources are pinned in [candidates.json](../candidates.json).
