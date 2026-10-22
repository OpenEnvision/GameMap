# Games and playable samples across additional engines

Reviewed 2026-10-22. Nine projects broaden the source-study collection across Foster, macroquad, Bevy, libGDX, Defold, MonoGame and Babylon.js. Primary READMEs, selected gameplay source, manifests, licenses and play/download pages were inspected; no project was built or playtested.

## Celeste 64: Fragments of the Mountain — Foster / C#

- Repository: [EXOK/Celeste64](https://github.com/EXOK/Celeste64), `main`; [official downloads](https://maddymakesgamesinc.itch.io/celeste64).
- A released short 3D platformer by Celeste's original developers. Explore the mountain, dash, climb and collect strawberries. The authors describe it as a rapidly built anniversary game, which makes it useful to read as a small shipped project rather than a general engine architecture.
- Stack: C# with Foster/SDL3, TrenchBroom level data, glTF models and FMOD audio. The current [project file](https://github.com/EXOK/Celeste64/blob/main/Celeste64.csproj) targets .NET 10.
- Read [Player.cs](https://github.com/EXOK/Celeste64/blob/main/Source/Actors/Player.cs): movement constants, coyote time, dashing, climbing, feather flight, death and collection states are in one class. Useful for tracing how responsive movement, state transitions, camera and animation interact.
- Run: the [README](https://github.com/EXOK/Celeste64/blob/main/ReadMe.md) specifies .NET 10, `dotnet restore`, then `dotnet run` or `dotnet build` from the checkout.
- License: [MIT source](https://github.com/EXOK/Celeste64/blob/main/Source/License.txt), with noted exceptions. The README separately describes the proprietary Content folder, noncommercial fan-project permission and FMOD components.

## Zemeroth — macroquad / Rust

- Repository: [ozkriff/zemeroth](https://github.com/ozkriff/zemeroth), `master`; [browser game and desktop downloads](https://ozkriff.itch.io/zemeroth).
- A substantial playable tactical prototype: command a small squad on hex maps, use attacks and abilities, survive reaction attacks, then recruit or upgrade fighters between battles. The project is labeled in development and has a campaign with win/failure states.
- Stack: Rust, macroquad/miniquad and small local crates for component storage, GUI and scene animation; confirmed in [Cargo.toml](https://github.com/ozkriff/zemeroth/blob/master/Cargo.toml).
- Read [battle/execute.rs](https://github.com/ozkriff/zemeroth/blob/master/src/core/battle/execute.rs) for commands, reactions, effects and battle completion; [campaign.rs](https://github.com/ozkriff/zemeroth/blob/master/src/core/campaign.rs) connects casualties, renown, recruitment and upgrades. Useful for separating tactical simulation from presentation.
- Run: the [README](https://github.com/ozkriff/zemeroth/blob/master/README.md#building-from-source) documents miniquad platform dependencies, `cargo install resvg`, `./utils/assets_export.sh`, then `cargo run`; a separate section covers its WebAssembly build.
- License: dual [MIT](https://github.com/ozkriff/zemeroth/blob/master/LICENSE-MIT) / [Apache 2.0](https://github.com/ozkriff/zemeroth/blob/master/LICENSE-APACHE), with the logo font credited separately.

## Thetawave — Bevy / Rust

- Repository: [thetawavegame/thetawave](https://github.com/thetawavegame/thetawave), `main`; [browser demo](https://thetawave.metalmancy.tech/) and [desktop releases](https://github.com/thetawavegame/thetawave/releases).
- An ongoing physics-based space shooter: destroy enemy formations, collect power-ups and use character abilities while protecting both the players and the planet's defense meter. Enemies crossing the bottom damage the objective; friendly cargo haulers can restore it.
- Stack: Rust, Bevy and Rapier 2D; [Cargo.toml](https://github.com/thetawavegame/thetawave/blob/main/Cargo.toml) declares the engine, physics and audio dependencies.
- Read [run/level.rs](https://github.com/thetawavegame/thetawave/blob/main/src/run/level.rs) for queued phases, enemy formations, boss completion and tutorial progression, then [health/mod.rs](https://github.com/thetawavegame/thetawave/blob/main/src/health/mod.rs) for event-driven damage and shield regeneration. Useful for studying how Bevy systems coordinate a playable wave-shooter loop.
- Run: the [README](https://github.com/thetawavegame/thetawave/blob/main/README.md#building-and-playing-locally) requires copying assets from a matching release into `assets/`, then `cargo run --release`. It recommends the release tag if development-branch assets have not yet shipped.
- License: [MIT code](https://github.com/thetawavegame/thetawave/blob/main/LICENSE); music, sound, art and fonts have separate credits in the README.

## Destination Sol — libGDX / Java

- Repository: [MovingBlocks/DestinationSol](https://github.com/MovingBlocks/DestinationSol), `develop`; [official Steam distribution](https://store.steampowered.com/app/342980/Destination_Sol/).
- A released arcade space shooter with free exploration, planet landings, ship combat, equipment trading, asteroid mining and mercenaries. The repository is the official continuation maintained by MovingBlocks.
- Stack: Java with libGDX and Box2D; dependencies are declared in [engine/build.gradle](https://github.com/MovingBlocks/DestinationSol/blob/develop/engine/build.gradle).
- Read [SolShip.java](https://github.com/MovingBlocks/DestinationSol/blob/develop/engine/src/main/java/org/destinationsol/game/ship/SolShip.java): it connects pilot input, physics contact, loot collection, weapons, shields, repairs and ship abilities. Useful for following a central gameplay object through combat and the surrounding equipment economy.
- Run: the [README](https://github.com/MovingBlocks/DestinationSol/blob/develop/README.md#building-and-running-from-source) specifies Java 17 and `./gradlew run` from the project root (`gradlew run` on Windows). `gradlew distZipBundleJREs` builds desktop distributions; Android setup is documented separately.
- License: [Apache 2.0](https://github.com/MovingBlocks/DestinationSol/blob/develop/LICENSE), with [CC BY-NC 4.0 soundtrack](https://github.com/MovingBlocks/DestinationSol/blob/develop/LICENSE_SOUNDTRACK) and separately credited CC BY 4.0 sprites.

## Defold Third-Person 3D Playground — Defold / Lua

- Repository: [defold/sample-third-person-playground](https://github.com/defold/sample-third-person-playground), `master`; [official browser sample](https://defold.com/sample-third-person-playground/).
- A substantial playable teaching sample rather than a finished campaign. Move an animated character, collect gold bars and carry them to a delivery zone. It combines keyboard/gamepad/touch input, 3D physics, animated item carrying, sounds, camera following and shadow rendering.
- Read [player_controller.script](https://github.com/defold/sample-third-person-playground/blob/master/game/player_controller.script) for camera-relative versus character-relative movement; [player_collisions.script](https://github.com/defold/sample-third-person-playground/blob/master/game/player_collisions.script) parents collected items to a hand bone and deposits them using trigger events and timers.
- Learning value: a concrete bridge from Defold collections, messages and collision objects to an interactive 3D scene. The detailed [README](https://github.com/defold/sample-third-person-playground/blob/master/README.md) maps the project and explains its input, pickup and rendering systems.
- Run: open [game.project](https://github.com/defold/sample-third-person-playground/blob/master/game.project) in Defold and build/run through the editor; see the official [editor guide](https://defold.com/manuals/editor/). The README also provides the ready-to-play HTML5 build.
- License: [MIT](https://github.com/defold/sample-third-person-playground/blob/master/LICENSE), with model, texture and sound creators credited in the README.

## Arid Arnold — MonoGame / C#

- Repository: [AugsEU/arid-arnold](https://github.com/AugsEU/arid-arnold), `master`; [author's downloads](https://icefish-software.itch.io/arid-arnold).
- A released platform-puzzle adventure across nine worlds. Search for water while rotating the world, moving between past and future, and controlling Arnold alongside a clone. The author provides complete Windows and Linux builds.
- Stack: C# / MonoGame DesktopGL 3.8.2 and .NET 8, from [AridArnold.csproj](https://github.com/AugsEU/arid-arnold/blob/master/AridArnold/AridArnold.csproj).
- Read [Arnold.cs](https://github.com/AugsEU/arid-arnold/blob/master/AridArnold/Entity/Player/Arnold.cs) for gravity-relative input, time reversal and collisions; [CampaignManager.cs](https://github.com/AugsEU/arid-arnold/blob/master/AridArnold/Progress/CampaignManager.cs) connects hubs, level sequences, lives and saves. The author's [architecture document](https://github.com/AugsEU/arid-arnold/blob/master/Docs/Bible/Arid%20Arnold%20Bible-1.pdf) provides a broader view of the shipped game's systems.
- Run: the [README](https://github.com/AugsEU/arid-arnold/blob/master/README.md) asks developers to install the Pixica, PixicaMicro and Doomed fonts in `Docs/Fonts`, then build `AridArnold.sln` with a MonoGame development environment. [BuildFlags.cs](https://github.com/AugsEU/arid-arnold/blob/master/AridArnold/BuildFlags.cs) currently enables `DEBUG_LOADER`; the README explains disabling it to start the normal game.
- License: repository [MIT](https://github.com/AugsEU/arid-arnold/blob/master/LICENSE.txt).

## Timelooper — Defold / Lua

- Repository: [benjames-171/defold-games](https://github.com/benjames-171/defold-games), `master`; the selected [Timelooper project](https://github.com/benjames-171/defold-games/tree/master/Timelooper) is one game within this collection, counted once here. [Browser game and Windows download](https://benjames171.itch.io/timelooper).
- A released six-level puzzle game: every ten seconds, a past self begins repeating the player's recorded actions. Use these copies to hold buttons and open doors, gather all gems and reach the exit, while avoiding contact with the copies. [Level data](https://github.com/benjames-171/defold-games/blob/master/Timelooper/main/data.lua) defines the six-stage progression.
- Read [player.script](https://github.com/benjames-171/defold-games/blob/master/Timelooper/game/player/player.script) for recording movement/animation, spawning copies and handling death/completion; [past.script](https://github.com/benjames-171/defold-games/blob/master/Timelooper/game/player/past.script) replays the saved frames. A compact example of turning recorded player behavior into both a puzzle tool and a hazard.
- Run: open [Timelooper/game.project](https://github.com/benjames-171/defold-games/blob/master/Timelooper/game.project) in Defold. The [collection README](https://github.com/benjames-171/defold-games/blob/master/README.md) specifies compatibility with Defold 1.9.1–1.12.4 and notes compatibility changes in 1.13.0; use its documented range for this source snapshot.
- License: repository [MIT](https://github.com/benjames-171/defold-games/blob/master/LICENSE).

## ALIENS! 2 — MonoGame / C#

- Repository: [Vega-Boo/ALIENS2](https://github.com/Vega-Boo/ALIENS2), `main`; [author's game and source downloads](https://vegaboo.itch.io/aliens-2).
- A released arcade planet-defense shooter. Fly around a planet, stop alien ships abducting colonists and build a high score. Successful abductions increase the invasion meter; reaching its limit ends the game.
- Stack: C# / MonoGame DesktopGL 3.8.1 and .NET 6, from the [project file](https://github.com/Vega-Boo/ALIENS2/blob/main/ALIENS!%202/ALIENS!%202.csproj).
- Read [Game1.cs](https://github.com/Vega-Boo/ALIENS2/blob/main/ALIENS!%202/Game1.cs) for scene changes, shooting, invasion state, game over and high scores; [NPCs.cs](https://github.com/Vega-Boo/ALIENS2/blob/main/ALIENS!%202/NPCs.cs) implements enemy approach, abduction and escape around the circular playfield. Useful for studying a compact objective-defense loop.
- Run: the [README](https://github.com/Vega-Boo/ALIENS2/blob/main/README.md) requires installing the included `Fonts`. Open the root `ALIENS! 2.sln` in a MonoGame development environment; the author's download notes describe the source setup.
- License: repository [CC0-1.0](https://github.com/Vega-Boo/ALIENS2/blob/main/LICENSE); the author page separately labels code as Unlicense and permits commercial code use. External assets are credited in the README with their original sources.

## Space Pirates — Babylon.js / TypeScript

- Repository: [BabylonJS/SpacePirates](https://github.com/BabylonJS/SpacePirates), `master`; [official browser game](https://spacepirates.babylonjs.com/).
- An archived playable sample created for the Babylon.js 5.0 launch. Pilot a ship against AI opponents using lasers and missiles. [Game.ts](https://github.com/BabylonJS/SpacePirates/blob/master/app_package/src/Playground/Game.ts) implements defeat when no human-controlled ships remain and victory when the opposing fleet is cleared.
- Stack: TypeScript and Babylon.js 5.3, as recorded in [app_package/package.json](https://github.com/BabylonJS/SpacePirates/blob/master/app_package/package.json).
- Read [Ship.ts](https://github.com/BabylonJS/SpacePirates/blob/master/app_package/src/Playground/Ship.ts) for player/AI ships, targeting, missile launch and collisions, then `Game.ts` for manager updates and result transitions. Useful for tracing an interactive combat loop through a Babylon rendering project.
- Run: the [README](https://github.com/BabylonJS/SpacePirates/blob/master/README.md) documents `npm install`, `npm run dev` and `npm run build` at the repository root, plus copying `test_package/public/assets` into the build output for deployment.
- License: repository [Apache 2.0](https://github.com/BabylonJS/SpacePirates/blob/master/licence.md).

This repository supplement is linked from the README; it is not part of the exported website catalog.
