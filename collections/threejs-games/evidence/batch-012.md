# Batch 012 source review — 2026-10-23

Adds **6 source-reviewed games**, for **87** in the index. Reviews inspect the actual entry, direct renderer, game objective/state loop, manifests, root and relevant file-level licenses, asset notices and author demo sources. No upstream install, build, automated suite, browser game execution or playtest occurred.

Prepared after PR #62 head `093a6cb670d962ad43fdf3c8c8e1a2cd43357f50` and main `1bd421c48344a8bafa79936a1c9c7aaeea8673bd`. Remote main/open PR state is checked again before publication; a merged branch is not reused. No merge, deployment, force push, history rewrite, settings change or paid service is used. No third-party source/assets are copied into GameMap.

<a id="3d-blocks-jerilseb"></a>

## 3D Blocks

- Source: [jerilseb/3d-blocks](https://github.com/jerilseb/3d-blocks/tree/429f08eea94d2b9d47d9857c4ec198c39d810520), commit `429f08eea94d2b9d47d9857c4ec198c39d810520`.
- Rendering: Direct Three.js WebGLRenderer; board/pieces use BoxGeometry meshes, rendered by the author's frame loop. The vendored header identifies r71. [Renderer source](https://github.com/jerilseb/3d-blocks/blob/429f08eea94d2b9d47d9857c4ec198c39d810520/js/game.js#L66).
- Game loop: Placement checks neighboring equal figures, merges groups and adds score; game_over detects a filled/no-move board and game.js displays GAME OVER. [Gameplay source](https://github.com/jerilseb/3d-blocks/blob/429f08eea94d2b9d47d9857c4ec198c39d810520/js/game_logic.js#L153).
- Dependencies: Vanilla JavaScript; vendored Three r71, Projector/OrbitControls/DeviceOrientationControls/THREEx.WindowResize and Tween. Scripts listed in index.html; no root npm manifest. 
- License: MIT (code). Root MIT text verified (2016 copyright line names no holder). Bundled texture/sound/dependency rights were not exhaustively audited. [License file](https://github.com/jerilseb/3d-blocks/blob/429f08eea94d2b9d47d9857c4ec198c39d810520/LICENSE). 
- Maturity: legacy-prototype. Source implements placement/merging, reserve, scoring and game-over with old Three APIs. [Maturity basis](https://github.com/jerilseb/3d-blocks/blob/429f08eea94d2b9d47d9857c4ec198c39d810520/README.md).
- Demo: [Author URL](https://jerilseb.github.io/3d-blocks/); `reader-error` on 2026-10-23. Pinned README links the author demo. Reader failure does not establish site downtime or playability. [Discovery source](https://github.com/jerilseb/3d-blocks/blob/429f08eea94d2b9d47d9857c4ec198c39d810520/README.md).
- Review limits: Rules use a 5×5 XY array displayed as a volumetric Three.js board: this is a 3D-rendered board game, not XYZ movement or 3D-volume packing. Legacy controls, merges, full-board handling and modern-browser compatibility were not run.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="bubble-reactor"></a>

## Bubble Reactor

- Source: [ninetailschris/bubble-reactor](https://github.com/ninetailschris/bubble-reactor/tree/09ee24cc95010c9944d2d354870b8164e2ee61eb), commit `09ee24cc95010c9944d2d354870b8164e2ee61eb`.
- Rendering: drawScene directly creates WebGLRenderer. game.js arranges bubble sprites on alternating circular XZ rings at different heights, forming a cylindrical game space. [Renderer source](https://github.com/ninetailschris/bubble-reactor/blob/09ee24cc95010c9944d2d354870b8164e2ee61eb/build/js/scene.js#L11).
- Game loop: Puzzle shots consume a color stack; exhausting it or occupying the final ring calls gameOver, pauses and opens an end interface. logic.js finds/removes matching adjacent color clusters. [Gameplay source](https://github.com/ninetailschris/bubble-reactor/blob/09ee24cc95010c9944d2d354870b8164e2ee61eb/build/js/game.js#L303).
- Dependencies: Vanilla JS and vendored Three r106; jQuery/Bootstrap UI, Keydrown input, Tween, Howler, stats/rendererstats and Three FBX loader. Actual scripts are listed in build/index.html; no npm manifest. 
- License: MIT (code). Root MIT code license verified. Sounds, sphere/skybox images, Fredoka font and other dependency/media provenance were not fully audited. [License file](https://github.com/ninetailschris/bubble-reactor/blob/09ee24cc95010c9944d2d354870b8164e2ee61eb/LICENSE). 
- Maturity: legacy-prototype. README explicitly labels the game very early; source supplies timed/puzzle modes, cylindrical aiming, cluster removal and game-over. [Maturity basis](https://github.com/ninetailschris/bubble-reactor/blob/09ee24cc95010c9944d2d354870b8164e2ee61eb/README.md).
- Demo:  `not-located` on 2026-10-23. No confirmed author-hosted demo was located; build/index.html is the source entry. No Pages URL was guessed. [Discovery source](https://github.com/ninetailschris/bubble-reactor/blob/09ee24cc95010c9944d2d354870b8164e2ee61eb/README.md).
- Review limits: Bubbles use textured Points/sprites within a real cylindrical 3D arrangement. Adjacency is a wrapped ring grid, not free spatial locomotion. Stack boundaries, cluster outcomes, game-over timing, sound loading and browser support were not exercised.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="neon-snake-3d-samuel-cabral"></a>

## Neon Snake 3D

- Source: [samuel-cabral/snake-3d](https://github.com/samuel-cabral/snake-3d/tree/3e9c14527dc49165120eb90172119278f4096f20), commit `3e9c14527dc49165120eb90172119278f4096f20`.
- Rendering: SceneRig directly creates WebGLRenderer. App constructs GameRenderer/SceneRig; SnakeView uses cubic BoxGeometry meshes on the rendered board. [Renderer source](https://github.com/samuel-cabral/snake-3d/blob/3e9c14527dc49165120eb90172119278f4096f20/src/rendering/scene.ts#L51).
- Game loop: Ticks advance cells, end on wall/body collision, grow/add score for food and shrink the arena. No free cells records a win; App shows the result overlay. [Gameplay source](https://github.com/samuel-cabral/snake-3d/blob/3e9c14527dc49165120eb90172119278f4096f20/src/core/game.ts#L79).
- Dependencies: TypeScript/Vite, direct Three.js and Web Audio/input helpers. @upstash/redis supports optional serverless leaderboard endpoints; full declared runtime/dev map recorded. [package.json](https://github.com/samuel-cabral/snake-3d/blob/3e9c14527dc49165120eb90172119278f4096f20/package.json)
- License: MIT (code). Root MIT code license verified. README's synthesized-audio and test-coverage claims are author statements; dependency/font/media rights were not exhaustively audited. [License file](https://github.com/samuel-cabral/snake-3d/blob/3e9c14527dc49165120eb90172119278f4096f20/LICENSE). 
- Maturity: game. Source implements ready/running/game-over states, food/score, wall/body loss, arena shrinking and a full-board win. [Maturity basis](https://github.com/samuel-cabral/snake-3d/blob/3e9c14527dc49165120eb90172119278f4096f20/README.md).
- Demo: [Author URL](https://snake-3d-lyart.vercel.app); `reader-error` on 2026-10-23. Pinned README supplies the author demo; reader could not retrieve it. Runtime availability remains unknown. [Discovery source](https://github.com/samuel-cabral/snake-3d/blob/3e9c14527dc49165120eb90172119278f4096f20/README.md).
- Review limits: Classic planar Snake: core Cell contains x/z only, presented as a 3D board with cubic models. It is not an XYZ spatial snake. App attempts remote score submission on game over; no score, identifier, Redis service, key or paid resource was submitted/used in this source review. Author Vitest/Playwright claims, daily challenges, persistence and touch controls were not run.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="sketchy-snake-vr"></a>

## Sketchy Snake VR

- Source: [aunysillyme/sketchy-snake-vr](https://github.com/aunysillyme/sketchy-snake-vr/tree/8a84203f3e64098d4c2180736a779eb3ecd72c9c), commit `8a84203f3e64098d4c2180736a779eb3ecd72c9c`.
- Rendering: Direct WebGLRenderer with XR/setAnimationLoop; index.html loads Three r128 and matching OrbitControls/VRButton. [Renderer source](https://github.com/aunysillyme/sketchy-snake-vr/blob/8a84203f3e64098d4c2180736a779eb3ecd72c9c/main.js#L146).
- Game loop: XYZ Vector3 motion crosses spatial bounds to reset the run; eating 3D food adds ten points, grows the body and saves a local best. Keyboard includes vertical and X/Z steering. [Gameplay source](https://github.com/aunysillyme/sketchy-snake-vr/blob/8a84203f3e64098d4c2180736a779eb3ecd72c9c/main.js#L330).
- Dependencies: Vanilla JS, Three r128/OrbitControls/VRButton CDNs, custom spatial rules/Web Audio bite sound, external Google Fonts CSS. No npm manifest. 
- License: MIT (code). Root MIT code license verified. Fonts and other dependency/media terms were not exhaustively audited. [License file](https://github.com/aunysillyme/sketchy-snake-vr/blob/8a84203f3e64098d4c2180736a779eb3ecd72c9c/LICENSE). 
- Maturity: prototype. Source supplies spatial steering, food/growth, boundary reset and best-score persistence; the linked 2D edition is separate and not counted. [Maturity basis](https://github.com/aunysillyme/sketchy-snake-vr/blob/8a84203f3e64098d4c2180736a779eb3ecd72c9c/README.md).
- Demo: [Author URL](https://aunysillyme.github.io/sketchy-snake-vr/); `reader-error` on 2026-10-23. Pinned README links the author VR/browser demo. Reader failure does not establish availability; no headset/browser session occurred. [Discovery source](https://github.com/aunysillyme/sketchy-snake-vr/blob/8a84203f3e64098d4c2180736a779eb3ecd72c9c/README.md).
- Review limits: Only boundary reset and food/growth are claimed: self-body collision loss was not identified in the reviewed loop. Quest/Vision Pro/controller compatibility, food reachability, XR input and local storage were not exercised.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="hanoi-webxr-mr"></a>

## Towers of Hanoi — WebXR MR

- Source: [Mahmoud-AboShukr/webxr-towers-of-hanoi-mr](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr/tree/9c8f6d963e561f8cdde7774127e686bce667345a), commit `9c8f6d963e561f8cdde7774127e686bce667345a`.
- Rendering: Direct alpha WebGLRenderer with Three 0.159.0/ARButton; custom setAnimationLoop handles controller rays and scene rendering. [Renderer source](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr/blob/9c8f6d963e561f8cdde7774127e686bce667345a/script.js#L9).
- Game loop: Top-disk and no-larger-on-smaller checks gate peg transfers. All disks on peg 3 sets hasWon and triggers win text/stars/audio; reset is separate. [Gameplay source](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr/blob/9c8f6d963e561f8cdde7774127e686bce667345a/script.js#L303).
- Dependencies: Vanilla modules, Three/ARButton 0.159.0 from unpkg, WebXR controllers/raycasting, procedural puzzle geometry and external Wikimedia images/audio. No npm manifest. 
- License: MIT (code). Root MIT code verified. Consulted Wikimedia pages label the linked anthem CC BY-SA 4.0 and restored portrait public domain. These are file-page declarations, not an ownership audit; the flag and all other media/dependency terms were not fully audited or relicensed as MIT. [License file](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr/blob/9c8f6d963e561f8cdde7774127e686bce667345a/LICENSE). [Additional notice](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr/blob/9c8f6d963e561f8cdde7774127e686bce667345a/script.js).
- Maturity: prototype. An educational MR puzzle with legal moves, ghost previews, final-peg win and reset, verified from actual source rather than report citation placeholders. [Maturity basis](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr/blob/9c8f6d963e561f8cdde7774127e686bce667345a/README.md).
- Demo:  `not-located` on 2026-10-23. README gives local serving/headset requirements; no confirmed author-hosted game was located. [Discovery source](https://github.com/Mahmoud-AboShukr/webxr-towers-of-hanoi-mr/blob/9c8f6d963e561f8cdde7774127e686bce667345a/README.md).
- Review limits: Intended for immersive-ar-capable hardware/controller in a secure context; passthrough and interaction were not tested. Themed imagery/music retain separate source/attribution terms; no image/audio was copied or played, and asset compliance was not comprehensively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="hormuz"></a>

## HORMUZ

- Source: [watercastlegames/hormuz](https://github.com/watercastlegames/hormuz/tree/293b04b4543d62e3ebf582e2af151576ff561666), commit `293b04b4543d62e3ebf582e2af151576ff561666`.
- Rendering: The authored RTS imports vendored Three and creates WebGLRenderer; its own frame loop renders the scene. rts-combat.html loads the bundle; README documents its source/build command. [Renderer source](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/assets/js/rts-combat.js#L2849).
- Game loop: checkOutcome evaluates forces, civilians, objectives, rescue state and timeout, then calls endBattle(success). That freezes battle state and builds victory/defeat results for campaign flow. [Gameplay source](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/assets/js/rts-combat.js#L8891).
- Dependencies: Vanilla JS, vendored Three/GLTFLoader/MeshoptDecoder/geometry helpers and custom simulation; esbuild bundling instructions. Optional Google basemap integration is disabled with an empty key and local-three fallback. 
- License: MIT (code). Root MIT code/docs verified. ASSET-LICENSES declares HORMUZ models CC BY 4.0, KayKit CC0 and Natural Earth public domain. Production ElevenLabs free-plan sound is explicitly omitted: public audio events are empty. AI-generated media/third-party terms were not exhaustively audited. [License file](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/LICENSE). [Additional notice](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/ASSET-LICENSES.md). [Additional notice](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/assets/models/animation-v1/KAYKIT-CHARACTER-ANIMATIONS-LICENSE.txt). [Additional notice](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/assets/models/animation-v1/SOURCE.md). [Additional notice](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/docs/MAP_SOURCES.md). [Additional notice](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/assets/data/rts-audio.json).
- Maturity: game. Source implements mission-based force selection/combat, success/failure and campaign results; balance, narrative accuracy and author verification claims remain untested. [Maturity basis](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/README.md).
- Demo: [Author URL](https://watercastlegames.github.io/hormuz/); `reader-error` on 2026-10-23. Pinned README supplies the author demo; reader could not retrieve it. No RTS session, map API request, key setup, deployment or paid service was used. [Discovery source](https://github.com/watercastlegames/hormuz/blob/293b04b4543d62e3ebf582e2af151576ff561666/README.md).
- Review limits: Public source audio events are empty; do not imply parity with production demo sound. Optional Google code is present but source config is disabled without an API key; no map service was enabled/used. CC BY model attribution, KayKit/Natural Earth notices and generated-media provenance need separate review; code MIT does not cover all assets uniformly. Most simulation is on XZ terrain rendered as a 3D world, not unrestricted XYZ unit movement.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Queue decisions

- **block-party — pending**: MIT code/direct Three/spatial objectives verified. index.html credits bundled Space Forest to Kassich; the creator page currently asks for contact before project use. Applicable redistribution permission and other track terms were not established. Next: Locate documented music permission/open-license terms or an asset-cleared edition; infer neither permission nor infringement from the MIT code file. [Pinned evidence](https://github.com/pennyshen/block_party/blob/7c1f63c2cd0e7132a355f6ce8553d9017a7c65d3/LICENSE). [Pinned evidence](https://github.com/pennyshen/block_party/blob/7c1f63c2cd0e7132a355f6ce8553d9017a7c65d3/index.html). [Pinned evidence](https://github.com/pennyshen/block_party/blob/7c1f63c2cd0e7132a355f6ce8553d9017a7c65d3/js/LevelMode.js). [Pinned evidence](https://github.com/pennyshen/block_party/blob/7c1f63c2cd0e7132a355f6ce8553d9017a7c65d3/js/Block.js).
- **epmik-puzzles — pending**: The sampled pyramid-flip entry starts p5 createCanvas/setup/draw despite loading Three scripts. Its actual renderer is p5; another direct-Three 3D game entry remains unproven. Next: Inspect another complete entry if present; unused Three library includes do not establish the rendering stack. [Pinned evidence](https://github.com/epmik/puzzles/blob/83ca13b2d822b08bd97214f57aa8e8e84a11aca4/LICENSE). [Pinned evidence](https://github.com/epmik/puzzles/blob/83ca13b2d822b08bd97214f57aa8e8e84a11aca4/README.md). [Pinned evidence](https://github.com/epmik/puzzles/blob/83ca13b2d822b08bd97214f57aa8e8e84a11aca4/pyramid-flip-puzzle/index.html). [Pinned evidence](https://github.com/epmik/puzzles/blob/83ca13b2d822b08bd97214f57aa8e8e84a11aca4/pyramid-flip-puzzle/js/main.js). [Pinned evidence](https://github.com/epmik/puzzles/blob/83ca13b2d822b08bd97214f57aa8e8e84a11aca4/pyramid-flip-puzzle/js/app.game.js).
- **pool-bunlongheng — excluded**: Actual manifest depends on @react-three/fiber and @react-three/drei; README also separates Canvas2D table from R3F balls. Outside the direct-Three boundary. Next: Reconsider only a separate direct-Three edition. [Pinned evidence](https://github.com/bunlongheng/pool/blob/32e1e03d6d3c2336b351f08fb30cd7343004f784/LICENSE). [Pinned evidence](https://github.com/bunlongheng/pool/blob/32e1e03d6d3c2336b351f08fb30cd7343004f784/README.md). [Pinned evidence](https://github.com/bunlongheng/pool/blob/32e1e03d6d3c2336b351f08fb30cd7343004f784/package.json).
- **3d-rts-sylvain — excluded**: Pinned recursive tree contains only LICENSE, README, .gitattributes and an image; no implementation source verifies the advertised RTS/Three game. Next: Revisit when actual game implementation source is published. [Pinned evidence](https://github.com/SylvainSenechal/3D-RTS/blob/ef8b70670c62098931e94b34cb5674cb504a49f0/LICENSE). [Pinned evidence](https://github.com/SylvainSenechal/3D-RTS/blob/ef8b70670c62098931e94b34cb5674cb504a49f0/README.md).
- **dominion — pending**: Current README says the active Windows product is Godot; older browser code is historical and outside active releases. Description/three devDependency would misrepresent current stack. Next: Review the historical browser edition as a separately scoped legacy game with renderer, objectives and asset notices. [Pinned evidence](https://github.com/amithey/dominion/blob/ab17b062e7fd159d292fa7dfdf31db1194b27a5f/LICENSE). [Pinned evidence](https://github.com/amithey/dominion/blob/ab17b062e7fd159d292fa7dfdf31db1194b27a5f/README.md). [Pinned evidence](https://github.com/amithey/dominion/blob/ab17b062e7fd159d292fa7dfdf31db1194b27a5f/package.json).
- **trash-jam-v2-1 — excluded**: Reviewed root entry consists of Three GLTF/OrbitControls viewers and keyboard scene edits; no concrete trash/target/score/win/loss objective was established. README's play link alone is insufficient. Next: Revisit if an actual game entry is identified; no runtime failure is inferred from source review. [Pinned evidence](https://github.com/mrbllyy/Trash-Jam-v2.1/blob/ab911f05b9c08a720f7d4a9d93f6437ad6051ccf/LICENSE). [Pinned evidence](https://github.com/mrbllyy/Trash-Jam-v2.1/blob/ab911f05b9c08a720f7d4a9d93f6437ad6051ccf/README.md). [Pinned evidence](https://github.com/mrbllyy/Trash-Jam-v2.1/blob/ab911f05b9c08a720f7d4a9d93f6437ad6051ccf/index.html).

Demo outcomes for this batch: 4 reader-error, 2 not-located. These are text-reader/source-discovery results, not gameplay tests or site-down findings. The queue now retains 26 pending and 14 excluded repositories; earlier HexGL/file-license corrections remain intact.

## External asset follow-up

These description pages were read on 2026-10-23; they are license-source observations, not a chain-of-title audit, and no media was downloaded, copied or played.

- [472958](https://www.newgrounds.com/audio/listen/472958): Space Forest creator page currently requests contact for project use; permission for bundled redistribution not established. No audio downloaded/played.
- [File:Anthem_of_USSR_-_1943.ogg](https://commons.wikimedia.org/wiki/File:Anthem_of_USSR_-_1943.ogg): Description page labels the recording CC BY-SA 4.0; not an ownership/performer-rights audit.
- [File:Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png](https://commons.wikimedia.org/wiki/File:Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png): Description page labels the portrait public domain; no image copied into GameMap.
