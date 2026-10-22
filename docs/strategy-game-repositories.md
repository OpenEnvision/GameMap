# Strategy and simulation game repositories

Ten projects spanning turn-based 4X, real-time strategy and settlement economies. These are source-study references without an AI-development attribution.

Reviewed 2026-10-22 through upstream READMEs, build instructions, selected gameplay files and license notices. No games were installed or playtested.

## Unciv

- Repository: [yairm210/Unciv](https://github.com/yairm210/Unciv) — default branch `master`.
- A turn-based 4X game inspired by Civilization V, with civilization growth, research, diplomacy and combat. Kotlin with LibGDX; desktop and Android targets.
- Useful for studying turn and victory state, save serialization, rulesets and a moddable strategy game. [GameInfo.kt](https://github.com/yairm210/Unciv/blob/master/core/src/com/unciv/logic/GameInfo.kt) connects civilizations, the tile map, game parameters and victory data.
- Start: the [README](https://github.com/yairm210/Unciv/blob/master/README.md) links platform packages. The [local build guide](https://github.com/yairm210/Unciv/blob/master/docs/Developers/Building-Locally.md) documents `./gradlew desktop:run` and `./gradlew desktop:dist` after setting up the JDK and Android SDK.
- License: [MPL 2.0](https://github.com/yairm210/Unciv/blob/master/LICENSE) for source except noted components; media have separate Creative Commons/public-domain credits described in the README.

## OpenRA

- Repository: [OpenRA/OpenRA](https://github.com/OpenRA/OpenRA) — default branch `bleed`.
- C#/.NET RTS engine with bundled game mods reimagining Red Alert, Tiberian Dawn and Dune 2000. The repository contains the engine and its game implementations.
- Useful for studying reusable RTS traits, data-driven unit balancing and scripted missions. [Red Alert infantry rules](https://github.com/OpenRA/OpenRA/blob/bleed/mods/ra/rules/infantry.yaml) define costs, prerequisites, health, weapons and targeting; [Game.cs](https://github.com/OpenRA/OpenRA/blob/bleed/OpenRA.Game/Game.cs) connects the game loop, mods, rendering and networking.
- Start: [README](https://github.com/OpenRA/OpenRA/blob/bleed/README.md); [INSTALL.md](https://github.com/OpenRA/OpenRA/blob/bleed/INSTALL.md) documents the current .NET setup, `make`, and `./launch-game.sh`. Original-game files or the downloadable minimal asset pack are required.
- License: [GPL 3.0 or later](https://github.com/OpenRA/OpenRA/blob/bleed/COPYING) for OpenRA code; acquisition of original game assets is separate from the code license.

## Widelands

- Repository: [widelands/widelands](https://github.com/widelands/widelands) — default branch `master`.
- Settlers-inspired real-time strategy with single-player campaigns and multiplayer. C++ simulation with Lua game data/scenarios, SDL and CMake.
- Useful for studying transport networks and resource allocation. [economy.cc](https://github.com/widelands/widelands/blob/master/src/economy/economy.cc) manages ware/worker economies and merges or splits them when transport connections change.
- Start: the [README](https://github.com/widelands/widelands/blob/master/README.md) links downloads and documents dependency installation, `./compile.sh -r -w`, then `./widelands`.
- License: [GPL 2.0 or later](https://github.com/widelands/widelands/blob/master/COPYING); some assets use separate Creative Commons licenses. The README asks contributors not to submit AI-generated content, relevant when using this as a reference for agent-assisted work.

## Unknown Horizons

- Repository: [unknown-horizons/unknown-horizons](https://github.com/unknown-horizons/unknown-horizons) — default branch `master`.
- 2D settlement/economy simulation: build a colony, supply residents, collect taxes and trade. Python 3 gameplay on the FIFE C++ engine, with SQLite maps and YAML object definitions.
- Useful for studying production economies and persistent settlement state. [settlement.py](https://github.com/unknown-horizons/unknown-horizons/blob/master/horizons/world/settlement.py) connects storage, trade posts, inhabitants, taxes, costs and save/load data.
- Start: the [README](https://github.com/unknown-horizons/unknown-horizons/blob/master/README.md) links platform setup instructions and lists FIFE/fifechan dependencies; [run_uh.py](https://github.com/unknown-horizons/unknown-horizons/blob/master/run_uh.py) is the Python launcher. Engine dependencies need to be installed before launching.
- License: [GPL 2](https://github.com/unknown-horizons/unknown-horizons/blob/master/doc/licenses/GPL); reviewed gameplay files allow version 2 or later. Music, artwork and sound notices are recorded separately in `doc/`.

## Warzone 2100

- Repository: [Warzone2100/warzone2100](https://github.com/Warzone2100/warzone2100) — default branch `master`.
- 3D real-time strategy with a campaign, skirmish bots, multiplayer, a large technology tree and customizable units. C++ core with JavaScript AI/campaign scripts and CMake builds.
- Useful for studying modular unit construction and programmable RTS opponents. [design.cpp](https://github.com/Warzone2100/warzone2100/blob/master/src/design.cpp) implements the design screen; the [scripting guide](https://github.com/Warzone2100/warzone2100/blob/master/doc/Scripting.md) explains event-driven AI, campaigns and win/loss rules.
- Start: the [README](https://github.com/Warzone2100/warzone2100/blob/master/README.md) links stable packages and platform build guides. Source builds require initialized submodules; the README advises a release source archive or a recursive Git checkout rather than GitHub's ZIP download.
- License: [GPL 2.0 or later](https://github.com/Warzone2100/warzone2100/blob/master/COPYING.README), with additional component notices linked from the README.

## Freeciv

- Repository: [freeciv/freeciv](https://github.com/freeciv/freeciv), reviewed on `master`.
- Civilization-inspired empire-building strategy with computer opponents and network multiplayer. C gameplay code and separate server/client programs; clients use GTK, Qt or SDL.
- Useful for studying shared strategy rules and team technology progression. [research.c](https://github.com/freeciv/freeciv/blob/master/common/research.c) maintains player/team research, technology goals and known advances.
- Start: [game documentation](https://github.com/freeciv/freeciv/blob/master/doc/README) explains client/server startup; [INSTALL](https://github.com/freeciv/freeciv/blob/master/INSTALL) lists build dependencies and client choices. Freeciv is independently implemented and does not require the original Civilization game.
- License: GPL 2.0 or later, stated in the [project documentation](https://github.com/freeciv/freeciv/blob/master/doc/README) and reviewed source header.

## FreeCol

- Repository: [FreeCol/freecol](https://github.com/FreeCol/freecol), reviewed on `master`.
- Turn-based colony-management strategy inspired by Colonization, with the goal of building an independent nation. Java implementation with Ant builds and desktop packages.
- Useful for studying the relationship between work tiles, buildings, production, trade and political progress. [Colony.java](https://github.com/FreeCol/freecol/blob/master/src/net/sf/freecol/common/model/Colony.java) models colony tiles, export data, production bonuses, liberty and build queues.
- Start: [README](https://github.com/FreeCol/freecol/blob/master/README.md) links Windows, macOS and Linux releases and documents `ant` with a Java SDK and Ant installed.
- License: the [README license section](https://github.com/FreeCol/freecol/blob/master/README.md#license) identifies GPL 2 source/content and some CC BY 4.0 content; reviewed Java files permit GPL 2 or later. Asset-directory notices provide the individual terms.

## FreeOrion

- Repository: [freeorion/freeorion](https://github.com/freeorion/freeorion), reviewed on `master`.
- Turn-based space 4X game with exploration, expansion and galactic conquest. C++ core, Python empire AI and scripted game content; CMake or Visual Studio builds.
- Useful for studying a programmable opponent across research, production, colonization, diplomacy and fleet planning. [FreeOrionAI.py](https://github.com/freeorion/freeorion/blob/master/default/python/AI/FreeOrionAI.py) connects those decision modules with the game interface.
- Start: [README](https://github.com/freeorion/freeorion/blob/master/README.md) links stable downloads; [BUILD.md](https://github.com/freeorion/freeorion/blob/master/BUILD.md) covers the source setup and platform dependencies.
- License: [default/COPYING](https://github.com/freeorion/freeorion/blob/master/default/COPYING) distinguishes GPL 2 code, CC BY-SA 3.0 creative assets and game-content scripts licensed under both. Bundled libraries/fonts have their own notices.

## shapez

- Repository: [tobspr-games/shapez.io](https://github.com/tobspr-games/shapez.io), reviewed on `master`.
- Factory-building game about cutting, rotating, combining and coloring shapes. JavaScript custom engine with a browser demo and desktop release.
- Useful for studying factory logistics and persistent conveyor networks. [belt.js](https://github.com/tobspr-games/shapez.io/blob/master/src/js/game/systems/belt.js) manages belt paths, nearby placement updates and serialization.
- Start: [README](https://github.com/tobspr-games/shapez.io/blob/master/README.md) links the online demo and documents its Node.js 16, Yarn, Java and ffmpeg setup, followed by `yarn gulp` in `gulp/`.
- License: [GPL 3](https://github.com/tobspr-games/shapez.io/blob/master/LICENSE). The original repository is no longer actively maintained; its README directs ongoing development to the [Community Edition](https://github.com/tobspr-games/shapez-community-edition). This record covers the original shapez source, not shapez 2.

## The Powder Toy

- Repository: [The-Powder-Toy/The-Powder-Toy](https://github.com/The-Powder-Toy/The-Powder-Toy), reviewed on `master`.
- A falling-sand physics sandbox for drawing materials and observing heat, pressure, gravity, electricity and material interactions. C++ with SDL and a Lua scripting API; its focus is open-ended experimentation.
- Useful for studying small, inspectable simulation rules. [WATR.cpp](https://github.com/The-Powder-Toy/The-Powder-Toy/blob/master/src/simulation/elements/WATR.cpp) defines water properties, freezing/evaporation thresholds and reactions with nearby particles.
- Start: [README](https://github.com/The-Powder-Toy/The-Powder-Toy/blob/master/README.md) links desktop downloads and the official development wiki, and explains drawing, pausing and single-frame stepping. Online sharing features require an account.
- License: [GPL 3](https://github.com/The-Powder-Toy/The-Powder-Toy/blob/master/LICENSE); the README lists bundled libraries and other assets.

This repository supplement is linked from the README; it is not part of the exported website catalog.
