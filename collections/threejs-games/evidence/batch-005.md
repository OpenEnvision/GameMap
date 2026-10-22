# Batch 005 source review — 2026-10-21

Adds **7 source-reviewed games**, for **48** in the corrected series, expanding fishing, real-time strategy, action-RPG and tennis coverage. No upstream installation, build, automated suite, browser game execution, camera/model activation or playtest occurred. Reader failures only establish a retrieval limitation.

Appended to open [PR #48](https://github.com/OpenEnvision/GameMap/pull/48), after head `f7f18420e310f96aca594ecaeb192ad5aa156377`, without adding another dependent PR. Main/PR state is rechecked before publication. No third-party code or assets are copied.

Totals reflect the later [HexGL license correction](license-review-001.md), which retains its evidence in the pending queue.

<a id="tideline"></a>

## TIDELINE

- Source: [bridge-mind/tideline](https://github.com/bridge-mind/tideline/tree/c8e772fa8b51bae6221630b9693178f1bebee047), commit `c8e772fa8b51bae6221630b9693178f1bebee047`.
- Rendering: Imports Three.js directly and creates WebGLRenderer, Scene and the camera/light environment. [Renderer source](https://github.com/bridge-mind/tideline/blob/c8e772fa8b51bae6221630b9693178f1bebee047/src/core/scene.js#L8).
- Game loop: Landed-fish events register catches in the economy; the reel fight can snap the line or land fish, driving progression and saves. [Gameplay source](https://github.com/bridge-mind/tideline/blob/c8e772fa8b51bae6221630b9693178f1bebee047/src/main.js#L318).
- Dependencies: Vanilla ES modules, Three.js from CDN, browser Web Audio and local saves; no package manifest/build step. Author describes procedural water, scenery, fish and audio with a collection/equipment/unlock loop.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/bridge-mind/tideline/blob/c8e772fa8b51bae6221630b9693178f1bebee047/LICENSE).
- Maturity: game. Source implements casting, bites, tension fights, catches/economy and a progression UI; author describes 21 collectible species. [Author README](https://github.com/bridge-mind/tideline/blob/c8e772fa8b51bae6221630b9693178f1bebee047/README.md).
- Demo: [Author URL](https://bridge-mind.github.io/tideline/); `reader-error` on 2026-10-21. Author-linked Pages URL could not be retrieved through the text reader; casting, reeling and collection were not run. [Discovery source](https://github.com/bridge-mind/tideline/blob/c8e772fa8b51bae6221630b9693178f1bebee047/README.md).
- Review limits: Fishing balance, all-species availability, procedural asset claims and saved progress were not tested. The CDN request is an external runtime dependency despite no npm installation.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="neon-river"></a>

## Neon River

- Source: [khesse-757/neon-river-remastered](https://github.com/khesse-757/neon-river-remastered/tree/da903346488e880565099700772cb9d593a43fe9), commit `da903346488e880565099700772cb9d593a43fe9`.
- Rendering: Directly creates Three.js WebGLRenderer with Three.js post-processing; actual src/main.ts boots the full game rather than the hidden skill template. [Renderer source](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/src/render/SceneRenderer.ts#L163).
- Game loop: Catches change weight/score, reaching the configured quota wins, catching eels or exceeding escape limits loses. [Gameplay source](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/src/sim/sim.ts#L593).
- Dependencies: TypeScript, Vite, Three.js post-processing, lil-gui diagnostics and browser Web Audio; full root manifest is recorded. 3D actors and water are combined with layered source painting; generated audio is stored offline as files. [package.json](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/package.json)
- License: MIT. Code is MIT; fonts are separately SIL OFL. CREDITS documents AI-generated art/audio and an original catch sound whose exact Freesound match is explicitly unconfirmed. Those media are not all asserted to be MIT/CC0 or independently rights-audited. [License file](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/LICENSE). [Additional notice](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/CREDITS.md). [Additional notice](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/public/fonts/Silkscreen-OFL.txt). [Additional notice](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/public/fonts/DotGothic16-OFL.txt).
- Maturity: game. Version 2.0.1; source implements distinct win/loss simulation status, catches/quota and the complete remaster entry. [Author README](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/README.md).
- Demo: [Author URL](https://neonriver2.kahdev.me); `reader-error` on 2026-10-21. Author-linked site could not be retrieved through the reader; the 3D remaster, modes and records were not executed. [Discovery source](https://github.com/khesse-757/neon-river-remastered/blob/da903346488e880565099700772cb9d593a43fe9/README.md).
- Review limits: Catching mechanics are planar in a fixed 3D river scene; this is not described as free 3D navigation. One sound's provenance is uncertain in the author's own credit file; generated-media service terms were not established. No paid image/audio service was called and no media were copied by this review.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="tidebreak"></a>

## Tidebreak

- Source: [ryanio/tidebreak](https://github.com/ryanio/tidebreak/tree/572d537c82de053296b9cd9de5bff164bb152480), commit `572d537c82de053296b9cd9de5bff164bb152480`.
- Rendering: Creates Three.js WebGLRenderer directly; index.html supplies Three.js through an explicit CDN import map. [Renderer source](https://github.com/ryanio/tidebreak/blob/572d537c82de053296b9cd9de5bff164bb152480/js/game.js#L227).
- Game loop: Counts active formations on both sides, ends the battle when a side has none and displays victory/defeat with survivor totals. [Gameplay source](https://github.com/ryanio/tidebreak/blob/572d537c82de053296b9cd9de5bff164bb152480/js/game.js#L592).
- Dependencies: No npm dependencies or build step; custom formation/combat/morale/control systems and Three.js CDN rendering.
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/ryanio/tidebreak/blob/572d537c82de053296b9cd9de5bff164bb152480/LICENSE).
- Maturity: game. Source implements battle, routing and win/loss results; README describes presets, army selection and replaying battles. [Author README](https://github.com/ryanio/tidebreak/blob/572d537c82de053296b9cd9de5bff164bb152480/README.md).
- Demo: [Author URL](https://ryanio.github.io/tidebreak/); `reader-error` on 2026-10-21. Author-linked Pages URL could not be retrieved by the reader; formations, flanking and morale were not tested. [Discovery source](https://github.com/ryanio/tidebreak/blob/572d537c82de053296b9cd9de5bff164bb152480/README.md).
- Review limits: Formation movement and tactics are planar inside a 3D-rendered reef. Upstream simulation/UI test claims and balance were not repeated; Total War inspiration does not grant branding rights.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="terrinha"></a>

## Terrinha

- Source: [martinsmiguel/terrinha](https://github.com/martinsmiguel/terrinha/tree/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2), commit `ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2`.
- Rendering: GameEngine imports Three.js directly, constructs WebGLRenderer and renders the scene in its own animation loop; React App hosts the viewport/UI. [Renderer source](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/src/game/engine.ts#L73).
- Game loop: Evaluates surviving contenders, returns a finished match with its winner and maps that state to local victory/defeat. [Gameplay source](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/src/game/victory.ts#L47).
- Dependencies: React/React DOM/Lucide/Tailwind UI, Express and Socket.IO LAN server/client, TypeScript, Vite and UUID utilities. Author describes procedural Three.js models and synthesized audio; app/server dependency snapshots are explicit. [package.json](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/package.json)
- License: MIT (root); Apache-2.0 (reviewed source headers). Root LICENSE/package declare MIT, but the reviewed engine.ts, victory.ts and App.tsx explicitly carry SPDX-License-Identifier: Apache-2.0 headers. Both notices are preserved as mixed/conflicting repository evidence; no single uniform code license is inferred. This review does not establish asset or transitive dependency rights. [Root license](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/LICENSE). [Per-file notice](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/src/game/engine.ts#L1). [Per-file notice](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/src/game/victory.ts#L1). [Per-file notice](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/src/App.tsx#L1).
- Maturity: game. Version 0.7.1; source has economy/building/combat systems and match outcome logic; README documents hosted LAN matches. [Author README](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/README.md).
- Demo: No live play URL located; `not-located` on 2026-10-21. Repository homepage points to its README; reviewed instructions provide local Node/Docker LAN play, not a confirmed public demo. [Discovery source](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/README.md).
- Review limits: Requires a running LAN/server setup for multiplayer; no room, Docker service or network session was created. React is auxiliary UI; procedural-asset claims and all UI dependency/asset rights were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="tiny-planet-action-rpg"></a>

## Tiny Planet — Shrines of the Blight

- Source: [Jeevan2410/Tiny-Planet-Action-RPG](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/tree/787542b40fef77e1f0e06da207a85b8aaa0212d4), commit `787542b40fef77e1f0e06da207a85b8aaa0212d4`.
- Rendering: Imports Three.js renderer classes and creates WebGLRenderer directly for the planet scene. [Renderer source](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/blob/787542b40fef77e1f0e06da207a85b8aaa0212d4/src/render/Renderer.ts#L52).
- Game loop: Curing shrines updates state; curing every shrine sets victory and emits the victory event, which core Game displays and saves. [Gameplay source](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/blob/787542b40fef77e1f0e06da207a85b8aaa0212d4/src/state/gameState.ts#L426).
- Dependencies: Dexie ^4.4.6/IndexedDB saves, Zustand ^5.0.15 state, TypeScript, Vite and native Web Audio. Custom spherical movement/combat/quest systems; no component renderer or separate game engine is declared. [package.json](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/blob/787542b40fef77e1f0e06da207a85b8aaa0212d4/package.json)
- License: MIT. Code is MIT. ASSETS.md says runtime art/audio are generated from project code and no third-party media are pulled into the bundle; this is an author statement, not an exhaustive independent asset audit. [License file](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/blob/787542b40fef77e1f0e06da207a85b8aaa0212d4/LICENSE). [Additional notice](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/blob/787542b40fef77e1f0e06da207a85b8aaa0212d4/ASSETS.md).
- Maturity: game. Version 1.0.0; source implements combat/quests, shrine completion/victory and saves; README links published builds. [Author README](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/blob/787542b40fef77e1f0e06da207a85b8aaa0212d4/README.md).
- Demo: [Author URL](https://tiny-planet-action-rpg.vercel.app/); `reader-error` on 2026-10-21. Primary author-linked Vercel URL could not be retrieved through the reader; no planet traversal or shrine quest was executed. [Discovery source](https://github.com/Jeevan2410/Tiny-Planet-Action-RPG/blob/787542b40fef77e1f0e06da207a85b8aaa0212d4/README.md).
- Review limits: Planet navigation, combat difficulty, procedural content and save durability were not tested. Alternative art-replacement instructions in ASSETS.md are not evidence that those external assets ship in this game.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="last-stand"></a>

## Last Stand

- Source: [VictorZakharov/last-stand](https://github.com/VictorZakharov/last-stand/tree/0789c92d51fdaa89d8f7c2b631b6332feb415e41), commit `0789c92d51fdaa89d8f7c2b631b6332feb415e41`.
- Rendering: Imports Three.js and its add-ons directly and constructs WebGLRenderer for its render/post-processing pipeline. [Renderer source](https://github.com/VictorZakharov/last-stand/blob/0789c92d51fdaa89d8f7c2b631b6332feb415e41/src/core/renderer.ts#L400).
- Game loop: Banking exits a run with loot; fighting/cleared/countdown/death states manage wave completion and loss of unbanked spoils. [Gameplay source](https://github.com/VictorZakharov/last-stand/blob/0789c92d51fdaa89d8f7c2b631b6332feb415e41/src/game/run.ts#L422).
- Dependencies: @dgreenheck/ez-tree ^1.1.0 procedural-tree utility, Three.js, TypeScript, Vite, Sass and browser audio. README explicitly excepts painted skill icons and music files from the otherwise procedural runtime content. [package.json](https://github.com/VictorZakharov/last-stand/blob/0789c92d51fdaa89d8f7c2b631b6332feb415e41/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/VictorZakharov/last-stand/blob/0789c92d51fdaa89d8f7c2b631b6332feb415e41/LICENSE).
- Maturity: game. Source implements waves, clear/bank/death results and persistent loot interfaces; version is 0.1.0. [Author README](https://github.com/VictorZakharov/last-stand/blob/0789c92d51fdaa89d8f7c2b631b6332feb415e41/README.md).
- Demo: [Author URL](https://victorzakharov.github.io/last-stand/); `reader-error` on 2026-10-21. Author-linked Pages site could not be retrieved through the reader; no wave, bank/continue decision or save was tested. [Discovery source](https://github.com/VictorZakharov/last-stand/blob/0789c92d51fdaa89d8f7c2b631b6332feb415e41/README.md).
- Review limits: It is not accurate to call every shipped media file runtime-generated: skill art and music are explicit exceptions. All art/music provenance, external tree utility notices and gameplay/save behavior were not exhaustively audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

<a id="tennis-lumixed"></a>

## Tennis (lumixed)

- Source: [lumixed/tennis](https://github.com/lumixed/tennis/tree/9e510e8ef439618f146618a3a60cf9251ccb83f8), commit `9e510e8ef439618f146618a3a60cf9251ccb83f8`.
- Rendering: Directly imports Three.js and creates WebGLRenderer for the tennis scene; React handles application UI rather than scene rendering. [Renderer source](https://github.com/lumixed/tennis/blob/9e510e8ef439618f146618a3a60cf9251ccb83f8/src/scene/gameScene.ts#L60).
- Game loop: Awards points, progresses games/sets/tiebreaks and assigns the match winner; game/session.ts drives the deterministic tennis match. [Gameplay source](https://github.com/lumixed/tennis/blob/9e510e8ef439618f146618a3a60cf9251ccb83f8/src/engine/scoring.ts#L63).
- Dependencies: React 19/React DOM UI, MediaPipe Tasks Vision ^0.10.20 pose input, TypeScript and Vite. Native browser keyboard/touch input is available; camera mode is optional and WebRTC-related support is documented. [package.json](https://github.com/lumixed/tennis/blob/9e510e8ef439618f146618a3a60cf9251ccb83f8/package.json)
- License: MIT. Repository code license verified from this file. This does not establish that every vendored dependency or third-party asset has the same license. [License file](https://github.com/lumixed/tennis/blob/9e510e8ef439618f146618a3a60cf9251ccb83f8/LICENSE).
- Maturity: prototype. Version 0.1.0; source implements full tennis scoring/session/scene, with optional pose-input adapters. [Author README](https://github.com/lumixed/tennis/blob/9e510e8ef439618f146618a3a60cf9251ccb83f8/README.md).
- Demo: [Author URL](https://tennis-blond.vercel.app/); `reader-error` on 2026-10-21. Demo URL is from repository homepage metadata observed on 2026-10-21. The text reader could not retrieve it; no camera, model download or tennis session was started. [Discovery source](https://api.github.com/repos/lumixed/tennis).
- Review limits: Camera play needs webcam permission and HTTPS outside localhost; README says the pose worker runs only in a built bundle. Keyboard/touch fallback and upstream camera latency/test-count claims were not tested or repeated. MediaPipe model/software licensing and all runtime download terms were not independently audited.
- Runtime status: source reviewed; **not built, not playtested; upstream tests not run**.

## Source attribution corrections and queue decisions

Seven earlier records had demo URLs whose discovery source was more specific than the README reference. Renderer, gameplay and license evidence remain unchanged and commit-pinned.

| Record | Correct demo discovery source |
| --- | --- |
| HexGL | [Author landing page linking Play](https://hexgl.bkcore.com/) |
| Perspectives | [Repository homepage metadata](https://api.github.com/repos/juanuys/perspectives) |
| Glory Box | [Repository homepage metadata](https://api.github.com/repos/vanrez-nez/glory-box-game) |
| Deep in the Graveyard | [Repository homepage metadata](https://api.github.com/repos/andykswong/ld48) |
| Snake Charmer | [Pinned package.json homepage](https://github.com/andrenanninga/ludum-dare-40/blob/d8307e3f6152c168a72bd743e49592f3d661e72a/package.json) |
| Arena | [Repository homepage metadata](https://api.github.com/repos/Hazzad123/fully-ai-arena-fps) |
| Marble Maze | [Repository homepage metadata](https://api.github.com/repos/danielmroczek/marble-maze) |

Metadata and landing-page observations are dated 2026-10-21. These are author-published discovery sources, not immutable code snapshots or evidence of working gameplay. The validator now distinguishes these dated discovery sources while still enforcing source-commit pins for renderer/gameplay/license/manifest evidence.

Voidstrike is excluded from this strict list because README/package.json explicitly disclose a Phaser overlay alongside Three.js. Kantor RPG remains pending until an actual qualifying 3D minigame path is reviewed; a virtual office alone is insufficient. Neither is counted among the 49 games.
