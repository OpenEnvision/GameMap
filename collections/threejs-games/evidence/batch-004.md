# Batch 004 source review — 2026-10-21

Adds **10 source-reviewed games**, bringing the series to **42**. New coverage includes tennis, table tennis, motion-controlled rolling, perspective puzzles, marble mazes, pinball, WebXR climbing and survival. Reviews inspect primary source and licenses at fixed commits; **no upstream install, build, test suite, browser game execution or playtest occurred**.

This batch is appended to the current open [PR #48](https://github.com/OpenEnvision/GameMap/pull/48), after head `a2eb247e718fb8a4e516ab371c16756298b36134`. The foundation is [PR #46](https://github.com/OpenEnvision/GameMap/pull/46). Main/PR state is checked before the branch update; no merge or deployment is performed.

<a id="couchcourt"></a>

## CouchCourt

- Source: [kuehn-lars/CouchCourt](https://github.com/kuehn-lars/CouchCourt/tree/5c086724ba213117d37f032e9209c0eaa88e380b), commit `5c086724ba213117d37f032e9209c0eaa88e380b`.
- Rendering: Imports Three.js directly and constructs WebGLRenderer for the host's 3D tennis court. [Renderer source](https://github.com/kuehn-lars/CouchCourt/blob/5c086724ba213117d37f032e9209c0eaa88e380b/src/host/render/scene.ts#L118).
- Game loop: Awards tennis points and advances games/deuce/tiebreak/set-winner state; host main runs the shared game simulation and renderer. [Gameplay source](https://github.com/kuehn-lars/CouchCourt/blob/5c086724ba213117d37f032e9209c0eaa88e380b/src/shared/sim/scoring.ts#L49).
- Dependencies: ws WebSocket LAN relay, qrcode-generator, Phosphor icons, TypeScript and Vite; no R3F. A phone supplies motion-control events to the host; README describes bot and local multiplayer options. [package.json](https://github.com/kuehn-lars/CouchCourt/blob/5c086724ba213117d37f032e9209c0eaa88e380b/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/kuehn-lars/CouchCourt/blob/5c086724ba213117d37f032e9209c0eaa88e380b/LICENSE).
- Maturity: prototype. Version 0.0.0; source implements tennis scoring and a local device/relay flow. Upstream device/performance test claims were not repeated. [Maturity basis](https://github.com/kuehn-lars/CouchCourt/blob/5c086724ba213117d37f032e9209c0eaa88e380b/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. README documents a local host/phone setup and LAN URLs, not an author-published public-play site.
- Review limits: Requires compatible phone sensors, permission and a secure context/LAN relay; none were exercised. README explicitly says its trusted LAN TLS certificate's private key is public by design, so it provides no privacy against others on the same Wi-Fi. Icons, media and all third-party asset/license scopes were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="spin-table-tennis"></a>

## Spin Table Tennis

- Source: [huangluke89757/spin-table-tennis](https://github.com/huangluke89757/spin-table-tennis/tree/588cfdd328c2c27b32879552c4917080633f3a1d), commit `588cfdd328c2c27b32879552c4917080633f3a1d`.
- Rendering: Directly constructs a Three.js WebGLRenderer and runs its own requestAnimationFrame loop. [Renderer source](https://github.com/huangluke89757/spin-table-tennis/blob/588cfdd328c2c27b32879552c4917080633f3a1d/game.js#L195).
- Game loop: Successful returns increment the rally and update best records/difficulty; gameOver records a failed or ended session. [Gameplay source](https://github.com/huangluke89757/spin-table-tennis/blob/588cfdd328c2c27b32879552c4917080633f3a1d/game.js#L937).
- Dependencies: Vendored Three.js, custom ball/spin physics, Web Audio synthesis, browser DOM and localStorage; no package manifest found.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/huangluke89757/spin-table-tennis/blob/588cfdd328c2c27b32879552c4917080633f3a1d/LICENSE).
- Maturity: game. Source contains practice/challenge modes, rally records, score/difficulty progression and game-over flow. [Maturity basis](https://github.com/huangluke89757/spin-table-tennis/blob/588cfdd328c2c27b32879552c4917080633f3a1d/README.md).
- Demo: [Author-linked URL](https://spin-pingpong.app.workbuddy.host/); `reader-error` on 2026-10-21. Author-linked site could not be retrieved through the text reader; no shots or controls were tested.
- Review limits: Spin realism, offline loading and mobile gesture behavior are author claims or source features, not results of this review. All bundled art/font and third-party media rights were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="nyan-cororin"></a>

## Nyan-Cororin

- Source: [imshota1009/Nyan-Cororin](https://github.com/imshota1009/Nyan-Cororin/tree/fb9054368526d30929870aae7338b3b956235e7a), commit `fb9054368526d30929870aae7338b3b956235e7a`.
- Rendering: Creates Three.js WebGLRenderer directly inside the single-file game; imports Three.js and Cannon.js through CDN script tags. [Renderer source](https://github.com/imshota1009/Nyan-Cororin/blob/fb9054368526d30929870aae7338b3b956235e7a/public/index.html#L536).
- Game loop: Checks x/y/z proximity to the stage goal and calls stageClear; falling below the stage threshold calls miss. [Gameplay source](https://github.com/imshota1009/Nyan-Cororin/blob/fb9054368526d30929870aae7338b3b956235e7a/public/index.html#L1314).
- Dependencies: Cannon.js 0.6.2 physics, keyboard/touch and DeviceOrientation/DeviceMotion input; static HTML/Firebase Hosting configuration, no package manifest.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/imshota1009/Nyan-Cororin/blob/fb9054368526d30929870aae7338b3b956235e7a/LICENSE).
- Maturity: game. README describes ten stages and multiple cats; reviewed source has goals, checkpoints, falls and stage progression. [Maturity basis](https://github.com/imshota1009/Nyan-Cororin/blob/fb9054368526d30929870aae7338b3b956235e7a/README.md).
- Demo: [Author-linked URL](https://nyan-cororin-game-app.web.app/); `reader-error` on 2026-10-21. The author-hosted URL could not be retrieved through the reader; sensor, keyboard and jumping controls were not tested.
- Review limits: Motion sensors need HTTPS or localhost and user permission on supported devices; iOS requires an explicit permission gesture according to README. Sensor handling, moving platforms, stage completeness and all media licensing were not exhaustively tested/audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="vantage"></a>

## VANTAGE

- Source: [suncal/vantage](https://github.com/suncal/vantage/tree/020f4e37e11c2f9fa350168dbd103bca95e70c58), commit `020f4e37e11c2f9fa350168dbd103bca95e70c58`.
- Rendering: Imports Three.js directly from a pinned CDN version and constructs WebGLRenderer and a perspective camera. [Renderer source](https://github.com/suncal/vantage/blob/020f4e37e11c2f9fa350168dbd103bca95e70c58/main.js#L161).
- Game loop: Alignment changes the puzzle from playing to locking, then solved; projected blocks use perspective rays with differing depths. [Gameplay source](https://github.com/suncal/vantage/blob/020f4e37e11c2f9fa350168dbd103bca95e70c58/main.js#L293).
- Dependencies: Plain ES modules, browser DOM/localStorage and Three.js from CDN; no package manifest. Google Fonts and platform emoji rendering are separate from the MIT source license.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/suncal/vantage/blob/020f4e37e11c2f9fa350168dbd103bca95e70c58/LICENSE).
- Maturity: game. Source implements puzzle state transitions and README describes date-seeded daily play. [Maturity basis](https://github.com/suncal/vantage/blob/020f4e37e11c2f9fa350168dbd103bca95e70c58/README.md).
- Demo: [Author-linked URL](https://suncal.github.io/vantage/); `reader-error` on 2026-10-21. Author-linked Pages site could not be retrieved through the reader; puzzle rendering and alignment were not tested.
- Review limits: Daily solvability, finish tolerance and browser consistency were not verified by execution. Font and platform emoji rights are not established by the code's MIT file.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="marble-maze"></a>

## Marble Maze

- Source: [danielmroczek/marble-maze](https://github.com/danielmroczek/marble-maze/tree/9c60a20fa012059bcce894ebb979faa9b7e3df9a), commit `9c60a20fa012059bcce894ebb979faa9b7e3df9a`.
- Rendering: Creates Three.js WebGLRenderer directly; index.html maps Three.js to version 0.160.0. [Renderer source](https://github.com/danielmroczek/marble-maze/blob/9c60a20fa012059bcce894ebb979faa9b7e3df9a/main.js#L34).
- Game loop: Checks the marble reaching the goal, freezes a won state/timer and displays the win message. [Gameplay source](https://github.com/danielmroczek/marble-maze/blob/9c60a20fa012059bcce894ebb979faa9b7e3df9a/main.js#L492).
- Dependencies: Custom marble/tilt/collision logic and static HTML modules; no backend or build manifest is present.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/danielmroczek/marble-maze/blob/9c60a20fa012059bcce894ebb979faa9b7e3df9a/LICENSE).
- Maturity: game. Source implements generated maze play, timing, a win popup and reset flow; author describes a static adaptation of an earlier C++ project. [Maturity basis](https://github.com/danielmroczek/marble-maze/blob/9c60a20fa012059bcce894ebb979faa9b7e3df9a/README.md).
- Demo: [Author-linked URL](https://danielmroczek.github.io/marble-maze/); `reader-error` on 2026-10-21. Author-linked Pages URL could not be retrieved through the reader; mouse/phone tilt was not exercised.
- Review limits: Main motion/collision is on the board's XZ plane, shown as a tilted 3D maze; this is labeled as a 3D board game. The three BMP files assets/chess.bmp, start.bmp and stop.bmp have no per-asset provenance established in this review.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="galactic-recruit-pinball"></a>

## Galactic Recruit Pinball

- Source: [DaedalusApps/GalacticRecruitPinball](https://github.com/DaedalusApps/GalacticRecruitPinball/tree/c3560181d8c2a21a62358d369c4f162894b55740), commit `c3560181d8c2a21a62358d369c4f162894b55740`.
- Rendering: Directly creates Three.js WebGLRenderer and drives the game through its own requestAnimationFrame loop. [Renderer source](https://github.com/DaedalusApps/GalacticRecruitPinball/blob/c3560181d8c2a21a62358d369c4f162894b55740/src/main.ts#L121).
- Game loop: Tracks saved/extra/remaining balls and declares game-over when no balls remain; main integrates the pinball simulation. [Gameplay source](https://github.com/DaedalusApps/GalacticRecruitPinball/blob/c3560181d8c2a21a62358d369c4f162894b55740/src/game/state.ts#L242).
- Dependencies: Cannon-es ^0.20.0 physics, TypeScript, Vite, vite-plugin-singlefile and Vitest. README describes generated models/audio and a mission/rank/score layer; upstream tests were not run. [package.json](https://github.com/DaedalusApps/GalacticRecruitPinball/blob/c3560181d8c2a21a62358d369c4f162894b55740/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/DaedalusApps/GalacticRecruitPinball/blob/c3560181d8c2a21a62358d369c4f162894b55740/LICENSE).
- Maturity: prototype. Version 0.1.0; source implements ball lifecycle and a complete game-over transition with pinball missions documented by the author. [Maturity basis](https://github.com/DaedalusApps/GalacticRecruitPinball/blob/c3560181d8c2a21a62358d369c4f162894b55740/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. Reviewed README links development resources but no confirmed author-hosted live-play URL.
- Review limits: Pinball physics accuracy, single-file bundle behavior and mission/rank completeness were not executed. Space Cadet/Space Invaders inspiration does not establish third-party branding rights; asset provenance was not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="floppy-defense"></a>

## Floppy Defense

- Source: [N-THEM-Studio/floppy-defense](https://github.com/N-THEM-Studio/floppy-defense/tree/aee3b103f77d04816d252c30a57ff3afd079a876), commit `aee3b103f77d04816d252c30a57ff3afd079a876`.
- Rendering: Imports Three.js directly and constructs WebGLRenderer; a project-authored fixed-step loop drives simulation/rendering. [Renderer source](https://github.com/N-THEM-Studio/floppy-defense/blob/aee3b103f77d04816d252c30a57ff3afd079a876/src/render/renderer.js#L123).
- Game loop: Completing the campaign produces victory/unlocks endless mode; CPU health reaching zero produces game-over. [Gameplay source](https://github.com/N-THEM-Studio/floppy-defense/blob/aee3b103f77d04816d252c30a57ff3afd079a876/src/main.js#L207).
- Dependencies: Three.js is the only declared runtime npm dependency; Vite and Playwright tooling are dev dependencies. README describes all geometry, textures and Web Audio generated in code. [package.json](https://github.com/N-THEM-Studio/floppy-defense/blob/aee3b103f77d04816d252c30a57ff3afd079a876/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/N-THEM-Studio/floppy-defense/blob/aee3b103f77d04816d252c30a57ff3afd079a876/LICENSE).
- Maturity: prototype. The jam/itch publication sheet explicitly says draft and awaits final screenshots/links; no formal jam release is inferred from README wording. [Maturity basis](https://github.com/N-THEM-Studio/floppy-defense/blob/aee3b103f77d04816d252c30a57ff3afd079a876/docs/scheda-ldjam.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. No final game-hosting URL was found. The author's studio homepage is not treated as a playable demo.
- Review limits: showtimez/floppy-defense is a mirror: README, LICENSE and reviewed main/renderer/loop source hashes match; it is not counted separately. Published-jam status, generated-asset claims and gameplay balance were not independently verified.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="trolltower"></a>

## TrollTower

- Source: [danielesteban/trolltower](https://github.com/danielesteban/trolltower/tree/6c07dc2ecc306086ad7c84ffc1e8d77fd723e453), commit `6c07dc2ecc306086ad7c84ffc1e8d77fd723e453`.
- Rendering: Imports Three.js renderer classes from a local CDN re-export module, creates WebGLRenderer and sets its animation loop directly. [Renderer source](https://github.com/danielesteban/trolltower/blob/6c07dc2ecc306086ad7c84ffc1e8d77fd723e453/core/renderer.js#L28).
- Game loop: Handles controller-grip climbing against physics colliders; gameplay.js manages rockets, peer interaction and respawn. [Gameplay source](https://github.com/danielesteban/trolltower/blob/6c07dc2ecc306086ad7c84ffc1e8d77fd723e453/core/player.js#L268).
- Dependencies: Ammo/Bullet helper via core/ammo.js, SimplePeer/WebRTC, WebXR and Node/Express/WebSocket/server database dependencies. Three.js is CDN-loaded despite not appearing in package.json; complete declared server packages are preserved in the manifest snapshot. [package.json](https://github.com/danielesteban/trolltower/blob/6c07dc2ecc306086ad7c84ffc1e8d77fd723e453/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/danielesteban/trolltower/blob/6c07dc2ecc306086ad7c84ffc1e8d77fd723e453/LICENSE).
- Maturity: legacy-release. Published WebXR climbing-game link and complete player/renderer/network paths are present in this legacy source. [Maturity basis](https://github.com/danielesteban/trolltower/blob/6c07dc2ecc306086ad7c84ffc1e8d77fd723e453/README.md).
- Demo: [Author-linked URL](https://trolltower.app/); `reader-error` on 2026-10-21. Author-linked site could not be retrieved by the reader; no headset, room or peer connection was attempted.
- Review limits: Legacy Three.js, WebXR hardware permissions, server services and peer networking were not tested. GLB/OGG asset rights and all vendored dependency notices were not exhaustively audited. A local AmmoPhysics helper is an auxiliary physics layer; no A-Frame renderer is used in the reviewed path.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="bombanauts"></a>

## Bombanauts

- Source: [Bombanauts/Bombanauts](https://github.com/Bombanauts/Bombanauts/tree/47b1c4c699fdd0278bfc6a1c8c089734b120b3dc), commit `47b1c4c699fdd0278bfc6a1c8c089734b120b3dc`.
- Rendering: Imports Three.js directly and creates WebGLRenderer; the arena is rendered from a project-owned animation loop. [Renderer source](https://github.com/Bombanauts/Bombanauts/blob/47b1c4c699fdd0278bfc6a1c8c089734b120b3dc/browser/game/main.js#L154).
- Game loop: Handles player kills and score changes, then emits winner state to the room; author describes last-player/timer-based rounds. [Gameplay source](https://github.com/Bombanauts/Bombanauts/blob/47b1c4c699fdd0278bfc6a1c8c089734b120b3dc/server/index.js#L89).
- Dependencies: Cannon ^0.6.2, Socket.IO 1.7, Express, React 15/Redux/Material UI as app/HUD layers, and webpack tooling. package.json targets Node 7.x; React is not used as a Three.js component renderer in the reviewed game path. [package.json](https://github.com/Bombanauts/Bombanauts/blob/47b1c4c699fdd0278bfc6a1c8c089734b120b3dc/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/Bombanauts/Bombanauts/blob/47b1c4c699fdd0278bfc6a1c8c089734b120b3dc/LICENSE).
- Maturity: legacy-prototype. Source implements networked kill/score/winner flow; README documents a complete multiplayer bombing round. [Maturity basis](https://github.com/Bombanauts/Bombanauts/blob/47b1c4c699fdd0278bfc6a1c8c089734b120b3dc/README.md).
- Demo: [Author-linked URL](http://bombanauts.herokuapp.com/); `reader-error` on 2026-10-21. Historical author-linked Heroku URL could not be retrieved through the text reader; no online match was run.
- Review limits: Node 7-era dependencies and multiplayer backend/browser compatibility were not installed or tested. VolumetricFire effects, creeper-like textures and other external media provenance were not established as MIT.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="temple-rumble"></a>

## Temple Rumble

- Source: [dammafra/temple-rumble](https://github.com/dammafra/temple-rumble/tree/1f39c09b447ed44e5bf504e4c440ae80a9771413), commit `1f39c09b447ed44e5bf504e4c440ae80a9771413`.
- Rendering: Imports Three.js WebGLRenderer directly and constructs it; declared three.ez instancing/camera controls are auxiliary rendering utilities. [Renderer source](https://github.com/dammafra/temple-rumble/blob/1f39c09b447ed44e5bf504e4c440ae80a9771413/src/experience/renderer.js#L26).
- Game loop: Death stops the run, resets pillars, shows retry and submits survival time to the leaderboard; the loop chooses safe/unsafe pillar combinations. [Gameplay source](https://github.com/dammafra/temple-rumble/blob/1f39c09b447ed44e5bf504e4c440ae80a9771413/src/game/game.js#L116).
- Dependencies: @three.ez/instanced-mesh, camera-controls, GSAP, Tweakpane, Firebase, nipplejs/keydrown, Tailwind and Vite. Direct Three.js remains the renderer; optional leaderboard service is external to core survival play. [package.json](https://github.com/dammafra/temple-rumble/blob/1f39c09b447ed44e5bf504e4c440ae80a9771413/package.json)
- License: AGPL-3.0 (only/or-later variant unconfirmed). Code is AGPL v3 per README/LICENSE. README separately credits CC BY model creators plus Quaternius, Kenney, texture sources and Pixabay audio; those assets are not all asserted to be AGPL or independently license-audited. [License file](https://github.com/dammafra/temple-rumble/blob/1f39c09b447ed44e5bf504e4c440ae80a9771413/LICENSE). [Additional notice](https://github.com/dammafra/temple-rumble/blob/1f39c09b447ed44e5bf504e4c440ae80a9771413/README.md).
- Maturity: game. Source implements survival timing, death/retry and pillar hazards; README links a published game-jam project. [Maturity basis](https://github.com/dammafra/temple-rumble/blob/1f39c09b447ed44e5bf504e4c440ae80a9771413/README.md).
- Demo: [Author-linked URL](https://templerumble.dammafra.dev); `reader-error` on 2026-10-21. The author-linked site could not be retrieved through the text reader; no run or leaderboard request was made.
- Review limits: AGPL v3 only/or-later election and every individual asset's terms remain unconfirmed beyond the recorded primary notices. Firebase availability, reflex timing, touch controls and upstream award claims were not tested/independently verified.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Deduplication and publication boundaries

- [showtimez/floppy-defense](https://github.com/showtimez/floppy-defense) was inspected as a mirror: README/LICENSE contents and the three reviewed core source hashes match the canonical N-THEM-Studio project. The mirror is excluded from the game count and retained in the queue.
- Floppy Defense's [publication sheet](https://github.com/N-THEM-Studio/floppy-defense/blob/aee3b103f77d04816d252c30a57ff3afd079a876/docs/scheda-ldjam.md) is a draft awaiting final screenshots/links, so no final jam release or hosted build is inferred.
- CouchCourt's [README security limitation](https://github.com/kuehn-lars/CouchCourt/blob/5c086724ba213117d37f032e9209c0eaa88e380b/README.md#L80) is material to deployment: the LAN TLS private key is public by design and gives no same-Wi-Fi privacy. No certificates were fetched or installed by this review.
- Sensors, WebXR, live relays, Firebase and other external services were not activated or tested. Reader errors do not prove that the published sites are down.
