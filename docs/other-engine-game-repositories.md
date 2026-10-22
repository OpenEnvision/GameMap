# Games and playable samples across additional engines

Reviewed 2026-10-22. Five projects broaden the source-study collection across Foster, macroquad, Bevy, libGDX and Defold. Primary READMEs, selected gameplay source, manifests, licenses and play/download pages were inspected; no project was built or playtested.

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

This repository supplement is linked from the README; it is not part of the exported website catalog.
