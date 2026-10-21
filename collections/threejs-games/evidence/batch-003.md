# Batch 003 source review — 2026-10-21

Adds **10 source-reviewed games**, for a series total of **32**. This batch expands horror/puzzle, roguelite, bowling, platformer and multiplayer/space categories. Source review and text-reader links are separate from runtime testing: no upstream game installation, build, automated suite, browser execution or play session occurred.

Appended to the latest open increment [PR #48](https://github.com/OpenEnvision/GameMap/pull/48), based on head `7c26065e83a2eb7030070a09975f78668bb4d54d`, to avoid creating another dependent PR. The base series remains [PR #46](https://github.com/OpenEnvision/GameMap/pull/46). Remote main and both PR states are checked again before publication.

<a id="vesper-street"></a>

## Vesper Street

- Source: [winchxyz/vesper-street](https://github.com/winchxyz/vesper-street/tree/fcc2f6eda84311194c0834de6cd7081c2965086f), commit `fcc2f6eda84311194c0834de6cd7081c2965086f`.
- Rendering: Imports Three.js directly, constructs WebGLRenderer and drives the frame function with renderer.setAnimationLoop. [Renderer source](https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/js/main.js#L17).
- Game loop: Reaching a chapter exit advances the campaign; runtime also manages items, sanity, flashlight battery, death and an ending state. [Gameplay source](https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/js/game.js#L272).
- Dependencies: Vanilla ES modules and a Three.js CDN import map; no package manifest found. Author describes procedural voxel scenery and synthesized Web Audio, with no external art assets.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/LICENSE).
- Maturity: game. Source has campaign progression, objective/inventory state, death/retry and ending flow; README describes three chapters. [Author README](https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/README.md).
- Demo: [Author-linked URL](https://winchxyz.github.io/vesper-street/); `reader-error` on 2026-10-21. Author-linked Pages URL could not be retrieved through the text reader; no rendering or gameplay was tested.
- Review limits: Isometric presentation and planar navigation are disclosed; this is a rendered 3D town, not an optional 3D viewer for a flat game. The author's procedural/no-external-assets claim and browser performance were not independently audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="liminality"></a>

## Liminality

- Source: [IronExcavater/threejs-liminality](https://github.com/IronExcavater/threejs-liminality/tree/d57abb61d6546de0379df15f60b0ba33210b1ee6), commit `d57abb61d6546de0379df15f60b0ba33210b1ee6`.
- Rendering: Directly imports Three.js, creates WebGLRenderer and uses renderer.setAnimationLoop for updates. [Renderer source](https://github.com/IronExcavater/threejs-liminality/blob/d57abb61d6546de0379df15f60b0ba33210b1ee6/src/app.js#L44).
- Game loop: An escape interaction depends on restored power and displays an escaped ending; PowerSwitch.js increments the breaker/power objective. [Gameplay source](https://github.com/IronExcavater/threejs-liminality/blob/d57abb61d6546de0379df15f60b0ba33210b1ee6/src/ExitDoor.js#L48).
- Dependencies: Cannon-es ^0.20.0 physics, heap-js ^2.6.0, Three.js add-ons/post-processing and Vite ^6.2.0. [package.json](https://github.com/IronExcavater/threejs-liminality/blob/d57abb61d6546de0379df15f60b0ba33210b1ee6/package.json)
- License: MIT. Code is MIT. Flashlight and school furniture model notices separately require CC BY 4.0 attribution to their named Sketchfab creators. Other model/audio rights were not exhaustively audited. [License file](https://github.com/IronExcavater/threejs-liminality/blob/d57abb61d6546de0379df15f60b0ba33210b1ee6/LICENSE). [Additional notice](https://github.com/IronExcavater/threejs-liminality/blob/d57abb61d6546de0379df15f60b0ba33210b1ee6/public/assets/models/flashlight/license.txt). [Additional notice](https://github.com/IronExcavater/threejs-liminality/blob/d57abb61d6546de0379df15f60b0ba33210b1ee6/public/assets/models/furniture/license.txt).
- Maturity: prototype. Source implements a first-person maze, interactive power switches, an escape condition and restart UI. [Author README](https://github.com/IronExcavater/threejs-liminality/blob/d57abb61d6546de0379df15f60b0ba33210b1ee6/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. The reviewed README provides project/run information but no confirmed author-hosted live-play URL; none was guessed.
- Review limits: Procedural maze generation, entity AI and the escape sequence were not run. Code MIT must not replace the explicit CC BY 4.0 model attribution requirements.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="deep-in-the-graveyard"></a>

## Deep in the Graveyard

- Source: [andykswong/ld48](https://github.com/andykswong/ld48/tree/72901e2d21d85219cbb54af13055ec42632fba25), commit `72901e2d21d85219cbb54af13055ec42632fba25`.
- Rendering: Imports Three.js directly and creates WebGLRenderer; the game updates mobs and renders a Three.js scene and camera. [Renderer source](https://github.com/andykswong/ld48/blob/72901e2d21d85219cbb54af13055ec42632fba25/src/game.ts#L12).
- Game loop: Detects hero death, reports depth survived and offers retry; the runtime moves the hero and enemies turn by turn. [Gameplay source](https://github.com/andykswong/ld48/blob/72901e2d21d85219cbb54af13055ec42632fba25/src/index.ts#L86).
- Dependencies: GSAP ^3.6.1, TypeScript and webpack tooling; procedural Three.js models according to README. [package.json](https://github.com/andykswong/ld48/blob/72901e2d21d85219cbb54af13055ec42632fba25/package.json)
- License: MIT. Code is MIT. README separately credits jsfxr-generated effects, Wolfram Tones music, the Zughy 32 palette and Lobster Two font. Those media/source-service terms were not established as MIT or independently audited. [License file](https://github.com/andykswong/ld48/blob/72901e2d21d85219cbb54af13055ec42632fba25/LICENSE). [Additional notice](https://github.com/andykswong/ld48/blob/72901e2d21d85219cbb54af13055ec42632fba25/README.md).
- Maturity: prototype. Author describes a Ludum Dare 48 compo game built in under a day; published page labels it in development. [Author README](https://github.com/andykswong/ld48/blob/72901e2d21d85219cbb54af13055ec42632fba25/README.md).
- Demo: [Author-linked URL](https://andykswong.itch.io/ld48); `page-read` on 2026-10-21. Author itch.io page and its HTML5 iframe link were readable; the embedded game was not launched or interacted with.
- Review limits: Grid-based turn rules use a 3D-rendered graveyard; there is no claim of continuous 3D player physics. Jam code quality, procedural models, font/audio rights and browser behavior were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="snake-charmer"></a>

## Snake Charmer

- Source: [andrenanninga/ludum-dare-40](https://github.com/andrenanninga/ludum-dare-40/tree/d8307e3f6152c168a72bd743e49592f3d661e72a), commit `d8307e3f6152c168a72bd743e49592f3d661e72a`.
- Rendering: Game class imports Three.js and constructs WebGLRenderer; React App mounts that class into a DOM container and renders HUD components. [Renderer source](https://github.com/andrenanninga/ludum-dare-40/blob/d8307e3f6152c168a72bd743e49592f3d661e72a/src/Game/index.js#L44).
- Game loop: Checks the next tile for body/wall collisions, updates lives and dying state, consumes food, and exits to the next dungeon. [Gameplay source](https://github.com/andrenanninga/ludum-dare-40/blob/d8307e3f6152c168a72bd743e49592f3d661e72a/src/Game/Snake.js#L139).
- Dependencies: React 16/React DOM HUD shell, Matter.js planar physics, Hammer.js, Howler, lodash, Stats.js and Create React App tooling. Manifest declares three-react-mtl-loader/obj-loader packages; the reviewed Loader/index.js actually imports local OBJLoader/MTLLoader helper modules. These declarations are not R3F. [package.json](https://github.com/andrenanninga/ludum-dare-40/blob/d8307e3f6152c168a72bd743e49592f3d661e72a/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/andrenanninga/ludum-dare-40/blob/d8307e3f6152c168a72bd743e49592f3d661e72a/LICENSE).
- Maturity: legacy-prototype. Ludum Dare 40 game source includes lives, eating, collision/death, dungeon transitions, scoring and restart. [Author README](https://github.com/andrenanninga/ludum-dare-40/blob/d8307e3f6152c168a72bd743e49592f3d661e72a/README.md).
- Demo: [Author-linked URL](https://fakeyou.github.io/ludum-dare-40/); `reader-error` on 2026-10-21. Repository homepage's historical author URL could not be retrieved through the text reader; availability remains unconfirmed.
- Review limits: Snake movement and Matter physics are planar inside a 3D-rendered dungeon; React is an explicit auxiliary HUD shell. Legacy Three.js/CRA compatibility and bundled model/audio/font licensing were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="bowling"></a>

## Bowling

- Source: [iliagrigorevdev/bowling](https://github.com/iliagrigorevdev/bowling/tree/60fa6fe5283869c45515f614f6a99b181c63d499), commit `60fa6fe5283869c45515f614f6a99b181c63d499`.
- Rendering: Creates a Three.js WebGLRenderer, scene, perspective camera and loaded bowling objects; index.html loads the scripts directly. [Renderer source](https://github.com/iliagrigorevdev/bowling/blob/60fa6fe5283869c45515f614f6a99b181c63d499/js/bowlchallenge.js#L81).
- Game loop: Implements ten frames, strike/spare handling, throw results, total scoring and game-over state. [Gameplay source](https://github.com/iliagrigorevdev/bowling/blob/60fa6fe5283869c45515f614f6a99b181c63d499/js/scores.js#L2).
- Dependencies: Vendored Ammo.js/Bullet physics, Three.js GLTFLoader and plain browser scripts; no package manifest found. bowlphysics.js creates and steps an Ammo dynamics world.
- License: GPL-3.0 (only/or-later variant unconfirmed). Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/iliagrigorevdev/bowling/blob/60fa6fe5283869c45515f614f6a99b181c63d499/LICENSE).
- Maturity: game. Source implements ball positioning/throwing and a complete ten-frame scoring session; README links a published build. [Author README](https://github.com/iliagrigorevdev/bowling/blob/60fa6fe5283869c45515f614f6a99b181c63d499/README.md).
- Demo: [Author-linked URL](https://iliagrigorevdev.github.io/bowling/); `page-read` on 2026-10-21. Text reader returned an HTML document titled Bowling but no extractable body; bowling physics and input were not tested.
- Review limits: GPL v3 text is present; a project-specific only/or-later election was not established in this review. The author's accurate-physics claim and bundled asset licenses were not independently verified.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="journey-to-the-center-of-the-hole"></a>

## Journey to the Center of the Hole

- Source: [dvcolgan/ludumdare29](https://github.com/dvcolgan/ludumdare29/tree/80753b2bc3ac1bc4348edcf2307ca1269d820afb), commit `80753b2bc3ac1bc4348edcf2307ca1269d820afb`.
- Rendering: The project renderer factory directly constructs Three.js WebGLRenderer; main.js renders its own scene/camera from requestAnimationFrame. [Renderer source](https://github.com/dvcolgan/ludumdare29/blob/80753b2bc3ac1bc4348edcf2307ca1269d820afb/factories.js#L8).
- Game loop: Checks loss after wall/root/fireball hazards, enters game-over with distance fallen as score and exposes a restart button. [Gameplay source](https://github.com/dvcolgan/ludumdare29/blob/80753b2bc3ac1bc4348edcf2307ca1269d820afb/main.js#L76).
- Dependencies: Vendored jQuery, lodash, tween.js, SoundManager2, signals, class helpers and Cannon.js script tags; declaration/loading does not establish active physics use. Project-authored renderer/entity/pool helpers and plain JavaScript; no package manifest found.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/dvcolgan/ludumdare29/blob/80753b2bc3ac1bc4348edcf2307ca1269d820afb/LICENSE).
- Maturity: legacy-prototype. Despite a short starting-codebase README, the actual entry HTML names the game and main.js implements title/play/game-over/restart states. [Author README](https://github.com/dvcolgan/ludumdare29/blob/80753b2bc3ac1bc4348edcf2307ca1269d820afb/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. No author-published live-play URL was located in the reviewed short README and entry HTML.
- Review limits: Jam-era browser/audio compatibility and all shipped image/audio rights were not exhaustively audited. A fetched source entry is not proof that the old build currently runs.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="3d-platformer-dan"></a>

## 3D Platformer Game (Dan Art Projects)

- Source: [Dan-Art-Projects/3d-platformer-three](https://github.com/Dan-Art-Projects/3d-platformer-three/tree/cdac6f7792e89ceacebc7dba55d301fd40ab85be), commit `cdac6f7792e89ceacebc7dba55d301fd40ab85be`.
- Rendering: Actual index.html entry loads scripts/game.js, which directly creates Three.js WebGLRenderer, Scene and PerspectiveCamera; root game.js is not the reviewed entry. [Renderer source](https://github.com/Dan-Art-Projects/3d-platformer-three/blob/cdac6f7792e89ceacebc7dba55d301fd40ab85be/scripts/game.js#L97).
- Game loop: Completing a level advances currentLevel; passing maxLevel invokes gameWin, while gameOver and score/restart screens are separate paths. [Gameplay source](https://github.com/Dan-Art-Projects/3d-platformer-three/blob/cdac6f7792e89ceacebc7dba55d301fd40ab85be/scripts/gameFlow.js#L4).
- Dependencies: Three.js/GLTFLoader via CDN; Express, SQLite3, body-parser, cors and nodemon for the server/leaderboard. @lookingglass/webxr is declared and index.html contains optional WebXR/Looking Glass helpers; this is not a replacement 3D renderer. [package.json](https://github.com/Dan-Art-Projects/3d-platformer-three/blob/cdac6f7792e89ceacebc7dba55d301fd40ab85be/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/Dan-Art-Projects/3d-platformer-three/blob/cdac6f7792e89ceacebc7dba55d301fd40ab85be/LICENSE).
- Maturity: prototype. README describes five progressive levels, enemies, powers, health and leaderboards; source includes win/loss progression. [Author README](https://github.com/Dan-Art-Projects/3d-platformer-three/blob/cdac6f7792e89ceacebc7dba55d301fd40ab85be/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. No confirmed author-hosted play URL was located; local Node server instructions are not converted into a guessed hosted demo.
- Review limits: GLB models, sky imagery and other asset provenance were not exhaustively audited. Backend database, WebXR hardware and browser controls were not tested. Repository includes generated/vendor files; none are copied into GameMap.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="arena"></a>

## Arena

- Source: [Hazzad123/fully-ai-arena-fps](https://github.com/Hazzad123/fully-ai-arena-fps/tree/920b123d67015d5e8151a4ebd6742d8015d538be), commit `920b123d67015d5e8151a4ebd6742d8015d538be`.
- Rendering: Directly imports Three.js and constructs WebGLRenderer; client main runs its own frame/simulation/render loop. [Renderer source](https://github.com/Hazzad123/fully-ai-arena-fps/blob/920b123d67015d5e8151a4ebd6742d8015d538be/client/src/mapRenderer.js#L760).
- Game loop: Receives match transitions, presents round results and supports practice/match screens; client frame steps simulation and renders the 3D arena. [Gameplay source](https://github.com/Hazzad123/fully-ai-arena-fps/blob/920b123d67015d5e8151a4ebd6742d8015d538be/client/src/main.js#L1660).
- Dependencies: Express ^5.1.0 and ws ^8.18.3 backend, Vite ^7.1.5, concurrently and plain Three.js client. Root LICENSE describes synthesized audio; desktop mouse/trackpad/controller controls and multiplayer/practice are documented. [package.json](https://github.com/Hazzad123/fully-ai-arena-fps/blob/920b123d67015d5e8151a4ebd6742d8015d538be/package.json)
- License: MIT. Root LICENSE explicitly covers source with MIT and separately identifies Quaternius Toon Shooter art and Screaming Brain textures as CC0. GitHub metadata says NOASSERTION, so the actual file is used rather than guessing from that metadata. [License file](https://github.com/Hazzad123/fully-ai-arena-fps/blob/920b123d67015d5e8151a4ebd6742d8015d538be/LICENSE).
- Maturity: prototype. Version 0.1.0; source implements multiplayer round results and a practice range, while README describes multiple match modes. [Author README](https://github.com/Hazzad123/fully-ai-arena-fps/blob/920b123d67015d5e8151a4ebd6742d8015d538be/README.md).
- Demo: [Author-linked URL](https://arena-8g34.onrender.com); `reader-error` on 2026-10-21. Author homepage could not be retrieved by the reader; no backend health, room creation or gameplay was tested.
- Review limits: Requires a running server for multiplayer; server uptime and network interpolation were not tested. Asset CC0 claims are grounded in the repository notice, not an exhaustive independent file-by-file upstream audit.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="wizardwarz"></a>

## WizardWarz

- Source: [Lallassu/wizardwarz](https://github.com/Lallassu/wizardwarz/tree/fc5451c980c61698f59c11319e581cf8e43ee028), commit `fc5451c980c61698f59c11319e581cf8e43ee028`.
- Rendering: Creates Three.js WebGLRenderer; animate requests frames, updates game objects and renders the Three.js scene/camera. [Renderer source](https://github.com/Lallassu/wizardwarz/blob/fc5451c980c61698f59c11319e581cf8e43ee028/js/game.js#L179).
- Game loop: Implements player death, health restoration/respawn, levels and combat-related player state for the networked wizard game. [Gameplay source](https://github.com/Lallassu/wizardwarz/blob/fc5451c980c61698f59c11319e581cf8e43ee028/js/player.js#L103).
- Dependencies: Node HTTP server, SQLite via dblite, vendored Socket.IO 0.9.16 and old Three.js loaders/THREEx helpers. jQuery 1.9.1 and font/typeface scripts are loaded by the client. The Socket.IO manifest snapshot is a vendored dependency manifest, not a complete app dependency lock. [server/socket.io/package.json](https://github.com/Lallassu/wizardwarz/blob/fc5451c980c61698f59c11319e581cf8e43ee028/server/socket.io/package.json)
- License: MIT. Root code is MIT. Entry HTML credits external sound/model/font sources, including SoundBible, BlendSwap and ROME; corresponding per-asset license grants were not established, so these are not called MIT assets. [License file](https://github.com/Lallassu/wizardwarz/blob/fc5451c980c61698f59c11319e581cf8e43ee028/LICENSE). [Additional notice](https://github.com/Lallassu/wizardwarz/blob/fc5451c980c61698f59c11319e581cf8e43ee028/index.html).
- Maturity: legacy-prototype. Author explicitly says the project is abandoned; source implements a multiplayer game rather than only a scene snippet. [Author README](https://github.com/Lallassu/wizardwarz/blob/fc5451c980c61698f59c11319e581cf8e43ee028/README.md).
- Demo: [Author-linked URL](http://wizardwarz.nergal.se); `reader-error` on 2026-10-21. Historical README URL could not be retrieved by the reader after HTTPS normalization. README also mentions a historical server port; no alternative host/port was guessed.
- Review limits: Abandoned 2015-era networking, browser APIs and server dependencies were not installed or run. External media and font credits do not establish a blanket redistribution license. No account creation or live multiplayer connection was attempted.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="earth-defender"></a>

## Earth Defender

- Source: [alexprut/earth-defender](https://github.com/alexprut/earth-defender/tree/5d4d8f0832fc74882a701d6a0dedee23fd494648), commit `5d4d8f0832fc74882a701d6a0dedee23fd494648`.
- Rendering: Creates Three.js WebGLRenderer and a perspective camera directly, with an explicit requestAnimationFrame render/update path. [Renderer source](https://github.com/alexprut/earth-defender/blob/5d4d8f0832fc74882a701d6a0dedee23fd494648/client/js/game.js#L144).
- Game loop: Updates meteorites, bullets, collisions and Earth damage/life; input changes spaceship position independently on x, y and z axes. [Gameplay source](https://github.com/alexprut/earth-defender/blob/5d4d8f0832fc74882a701d6a0dedee23fd494648/client/js/game.js#L445).
- Dependencies: Bower dependencies are threejs * and stats.js *; client is plain browser JavaScript. README specifies Erlang/OTP multiplayer server and WebSocket connectivity; single-player configuration is also documented.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/alexprut/earth-defender/blob/5d4d8f0832fc74882a701d6a0dedee23fd494648/LICENSE).
- Maturity: legacy-prototype. 2015-era distributed real-time 3D game source has life/damage and gameplay updates plus client/server setup documentation. [Author README](https://github.com/alexprut/earth-defender/blob/5d4d8f0832fc74882a701d6a0dedee23fd494648/README.md).
- Demo: [Author-linked URL](https://alexprut.github.io/earth-defender/); `reader-error` on 2026-10-21. Author-linked Pages preview could not be retrieved through the reader; multiplayer backend availability and actual gameplay remain untested.
- Review limits: Legacy Bower/Erlang/backend compatibility and wildcard dependency resolution were not tested. Textures/models and other asset rights were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Candidate decisions

- Promoted Arena, WizardWarz and Earth Defender after completing direct source/manifest/license review.
- Moonshard Warden stays pending: CREDITS.md is the effective media record and limits project-created media, including runtime-generated geometry/art/audio, to use with the project. This is more specific than a root Apache code label.
- Platforms stays pending because its README explicitly identifies a game micro-framework.
- aiBA Percent Battle stays restricted-assets research because NOTICE reserves the bundled media rights despite MIT source.

Sources and decisions are pinned in [candidates.json](../candidates.json). An author's asset credit or a code license is not treated as proof that every asset has the same license.
