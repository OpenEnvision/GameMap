# Games in Lua, Python, Haxe and Rust

Four game repositories that broaden the catalog beyond its existing browser-engine and native C++ examples. Reviewed **2026-10-22** through official project documentation, selected gameplay source and license files. Source review only; no game was installed, built or playtested.

## SNKRX

- **Repository:** [a327ex/SNKRX](https://github.com/a327ex/SNKRX), reviewed on `master`.
- **Game / stack:** An arcade shooter roguelite in which a snake of heroes automatically attacks nearby enemies. Party composition unlocks class bonuses. Lua with LÖVE; [conf.lua](https://github.com/a327ex/SNKRX/blob/master/conf.lua) declares LÖVE 11.3.
- **Start here:** The [README](https://github.com/a327ex/SNKRX/blob/master/README.md) links the released game on Steam and documents launching the source with the bundled Windows runtime: `engine/love/love.exe --console .`. Steam must be running for that documented setup.
- **Learn from:** [player.lua](https://github.com/a327ex/SNKRX/blob/master/player.lua) defines each hero's attack sensors, cooldowns and effects; [buy_screen.lua](https://github.com/a327ex/SNKRX/blob/master/buy_screen.lua) implements the party/shop stage. Useful for studying how automatic attacks and between-round choices combine into a build-focused action game.
- **License:** [MIT code](https://github.com/a327ex/SNKRX/blob/master/LICENSE); the README directs readers to the in-game credits for each asset's separate license.

## Tuxemon

- **Repository:** [Tuxemon/Tuxemon](https://github.com/Tuxemon/Tuxemon), reviewed on `development`.
- **Game / stack:** Monster-fighting RPG with exploration, NPC dialogue, techniques and evolving creatures. Python 3.10+, pygame-ce, JSON game data and Tiled maps. The project is under active development and its package metadata identifies it as alpha.
- **Start here:** [README](https://github.com/Tuxemon/Tuxemon/blob/development/README.md); the [installation guide](https://github.com/Tuxemon/Tuxemon/blob/development/docs/installation.md) documents installing `requirements.txt` and launching `run_tuxemon.py`, with platform-specific instructions. It recommends source installation on Windows because the current Windows binaries are nonfunctional.
- **Learn from:** [evolution.py](https://github.com/Tuxemon/Tuxemon/blob/development/tuxemon/monster/evolution.py) checks creature, item, location and party conditions, tracks pending evolutions, replaces party members and teaches evolution moves. It offers a focused entry point into data-driven RPG progression.
- **License:** [GPLv3 code](https://github.com/Tuxemon/Tuxemon/blob/development/LICENSE), with later versions permitted by the README and exceptions for bundled code; [ATTRIBUTIONS.md](https://github.com/Tuxemon/Tuxemon/blob/development/ATTRIBUTIONS.md) records individual artwork and audio terms.

## Friday Night Funkin'

- **Repository:** [FunkinCrew/Funkin](https://github.com/FunkinCrew/Funkin), reviewed on `main`.
- **Game / stack:** A rhythm game built in Haxe using HaxeFlixel/OpenFL, with charted notes, timed inputs and song performance scoring. The [README](https://github.com/FunkinCrew/Funkin/blob/main/README.md) links the playable web demo and official desktop/mobile builds.
- **Start here:** The [compiling guide](https://github.com/FunkinCrew/Funkin/blob/main/docs/COMPILING.md) covers Haxe, recursive asset submodules, `hmm install`, Lime setup and `lime test <PLATFORM>`. The repository is the game source; its media lives in separate submodules.
- **Learn from:** [Scoring.hx](https://github.com/FunkinCrew/Funkin/blob/main/source/funkin/play/scoring/Scoring.hx) turns millisecond input offsets into note judgments and scores, including legacy and current scoring systems. Useful for studying timing windows, scoring curves and the relationship between precision and feedback.
- **License:** [Apache 2.0 source code](https://github.com/FunkinCrew/Funkin/blob/main/LICENSE.md); [game assets are proprietary](https://github.com/FunkinCrew/funkin.assets/blob/main/LICENSE.md) and are not covered by the code license.

## Veloren

- **Repository:** [veloren/veloren on GitLab](https://gitlab.com/veloren/veloren), reviewed on `master`.
- **Game / stack:** Multiplayer voxel action-adventure RPG set in a large fantasy world. Rust with separate client, server, world and shared simulation crates. The game is actively developed.
- **Start here:** The [README](https://gitlab.com/veloren/veloren/-/blob/master/README.md) links Windows, macOS and Linux downloads and recommends the Airshipper launcher for keeping client versions current. The [compiling guide](https://book.veloren.net/contributors/compiling.html) lists platform dependencies and `cargo run`; it also documents launching the standalone server.
- **Learn from:** [roll.rs](https://gitlab.com/veloren/veloren/-/blob/master/common/src/states/roll.rs) implements a character action through buildup, movement and recovery stages, with orientation, forced motion, status effects and jump interruption. This is a compact example of a gameplay state machine inside a larger networked RPG.
- **License:** [GPLv3](https://gitlab.com/veloren/veloren/-/blob/master/LICENSE); the [workspace manifest](https://gitlab.com/veloren/veloren/-/blob/master/Cargo.toml) specifies GPLv3-or-later for workspace packages. Individual artwork and documentation retain their own notices.

This repository supplement is linked from the README; it is not part of the exported website catalog.
