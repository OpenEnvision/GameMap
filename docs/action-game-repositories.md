# Action, arcade and RPG game repositories

Twelve game projects for movement, combat, procedural levels and multiplayer rules. These are source-study references without an AI-development attribution.

Reviewed 2026-10-22 through live upstream README, build, license and selected gameplay files. Source review only; no game was built or played.

## Shattered Pixel Dungeon

- **Repository:** [00-Evan/shattered-pixel-dungeon](https://github.com/00-Evan/shattered-pixel-dungeon)
- **Game / stack:** Traditional roguelike dungeon crawler with randomized floors, enemies and collectible equipment; Java, libGDX and Gradle, with desktop, Android and iOS targets.
- **Start here:** [README and official release links](https://github.com/00-Evan/shattered-pixel-dungeon/blob/master/README.md); [desktop setup](https://github.com/00-Evan/shattered-pixel-dungeon/blob/master/docs/getting-started-desktop.md) documents `./gradlew desktop:debug` and `./gradlew desktop:release`.
- **Learn from:** [RegularLevel.java](https://github.com/00-Evan/shattered-pixel-dungeon/blob/master/core/src/main/java/com/shatteredpixel/shatteredpixeldungeon/levels/RegularLevel.java) assembles entrance, exit, standard and special rooms through separate builder and painter stages. A useful starting point for a bounded level-generation experiment.
- **License / contribution:** [GPLv3](https://github.com/00-Evan/shattered-pixel-dungeon/blob/master/LICENSE.txt); the reviewed gameplay file explicitly permits later versions. Upstream welcomes issues but does not accept pull requests. Its [fork guide](https://github.com/00-Evan/shattered-pixel-dungeon/blob/master/docs/recommended-changes.md) explains application naming and packaging changes.

## OpenClonk

- **Repository:** [openclonk/openclonk](https://github.com/openclonk/openclonk)
- **Game / stack:** Multiplayer action game combining mining, settlement building and combat; C++ engine with C4Script gameplay and CMake builds. [Project metadata](https://github.com/openclonk/openclonk/blob/master/openclonk.appdata.xml) describes the game modes.
- **Start here:** [README dependencies](https://github.com/openclonk/openclonk/blob/master/README), [build configuration](https://github.com/openclonk/openclonk/blob/master/CMakeLists.txt), and the [official site](https://www.openclonk.org/) for packaged releases.
- **Learn from:** [Clonk gameplay script](https://github.com/openclonk/openclonk/blob/master/planet/Objects.ocd/Clonk.ocd/Script.c) composes movement, aiming, carrying and interaction libraries, then handles mining pickups and bridge construction. The [scenario folders](https://github.com/openclonk/openclonk/tree/master/planet) include tutorials, arenas, missions and parkour.
- **License:** [ISC for engine code](https://github.com/openclonk/openclonk/blob/master/COPYING); [game content license](https://github.com/openclonk/openclonk/blob/master/planet/COPYING) is identified as CC BY 3.0 in the project metadata. Bundled third-party code has its own notices.

## Teeworlds

- **Repository:** [teeworlds/teeworlds](https://github.com/teeworlds/teeworlds)
- **Game / stack:** 2D online multiplayer shooter with team deathmatch, capture the flag and player-authored maps; C++ with SDL2 and CMake or bam builds.
- **Start here:** [README setup](https://github.com/teeworlds/teeworlds/blob/master/README.md) includes dependencies and recursive-submodule checkout, then client `teeworlds` and server `teeworlds_srv` build/run instructions.
- **Learn from:** [Capture-the-flag controller](https://github.com/teeworlds/teeworlds/blob/master/src/game/server/gamemodes/ctf.cpp) connects death events, flag drops, score/time limits, sudden death and client snapshots. It offers a compact entry point into a complete multiplayer rule implementation.
- **License:** [zlib-style code license; CC BY-SA 3.0 game data](https://github.com/teeworlds/teeworlds/blob/master/license.txt), with font and external-library exceptions documented there. This is the upstream arena game, distinct from GameMap's existing DDNet entry.

## OpenTyrian

- **Repository:** [opentyrian/opentyrian](https://github.com/opentyrian/opentyrian)
- **Game / stack:** Cross-platform port of the vertical scrolling shooter Tyrian, including story, one-/two-player arcade and network modes; C99 and SDL2, with optional SDL2_net.
- **Start here:** [README](https://github.com/opentyrian/opentyrian/blob/master/README.md) links platform downloads and documents `make`. Release builds include the freeware Tyrian 2.1 data; source builds use the separate data download described in that README.
- **Learn from:** [shots.c](https://github.com/opentyrian/opentyrian/blob/master/src/shots.c) updates projectile lifetime, acceleration, curved paths, animation and drawing. A focused source-reading exercise for arcade weapon patterns and older game ports.
- **License:** [GPLv2](https://github.com/opentyrian/opentyrian/blob/master/COPYING), with later versions permitted in the reviewed source header. The original game's data is separately distributed as freeware; it is not described as GPL asset material.

## Dungeon Crawl Stone Soup

- **Repository:** [crawl/crawl](https://github.com/crawl/crawl)
- **Game / stack:** Turn-based dungeon exploration with combat, magic, character skills and deities; C++ and Lua, supporting terminal, graphical tiles and browser play.
- **Start here:** [README](https://github.com/crawl/crawl/blob/master/README.md) links online play, offline downloads, quickstart and the manual. [Installation guide](https://github.com/crawl/crawl/blob/master/crawl-ref/INSTALL.md) documents dependencies and building with `make -j4 TILES=y` in `crawl-ref/source`.
- **Learn from:** [Arrival vault examples](https://github.com/crawl/crawl/blob/master/crawl-ref/source/dat/des/arrival/simple.des) demonstrate tagged, authored map fragments with substitutions. The README explains how these vaults participate in level generation and can be tested without recompiling the engine.
- **License:** [GPLv2 or later](https://github.com/crawl/crawl/blob/master/LICENSE), with the same file listing compatible component and tile exceptions.

## Neverball

- **Repository:** [Neverball/neverball](https://github.com/Neverball/neverball)
- **Game / stack:** 3D rolling-ball obstacle courses: tilt the floor, collect enough coins to unlock the exit and finish before time runs out; C and SDL2 with Make-based builds.
- **Start here:** [README](https://github.com/Neverball/neverball/blob/master/README.md), [build instructions](https://github.com/Neverball/neverball/blob/master/doc/install.txt), and the [official site](https://neverball.org/). The build guide lists multimedia dependencies and running an uninstalled build in place.
- **Learn from:** [game_server.c](https://github.com/Neverball/neverball/blob/master/ball/game_server.c) groups tilt input, timing, camera state, collected coins and goal activation. It is a useful reference for connecting physical controls to level objectives and failure states.
- **License:** [GPLv2 or later with listed exceptions](https://github.com/Neverball/neverball/blob/master/LICENSE.md), including a GPLv3 easing implementation and separate font/library terms.

## Cataclysm: Dark Days Ahead

- **Repository:** [CleverRaven/Cataclysm-DDA](https://github.com/CleverRaven/Cataclysm-DDA)
- **Game / stack:** Turn-based survival in a persistent, procedurally generated post-apocalyptic world; scavenging, equipment, vehicles and hostile creatures. C++ with terminal and SDL tile interfaces.
- **Start here:** [README](https://github.com/CleverRaven/Cataclysm-DDA/blob/master/README.md) links stable and experimental downloads; [compilation guide](https://github.com/CleverRaven/Cataclysm-DDA/blob/master/doc/c++/COMPILING.md) separates terminal and tile dependencies across platforms.
- **Learn from:** [crafting.cpp](https://github.com/CleverRaven/Cataclysm-DDA/blob/master/src/crafting.cpp) connects recipes, available materials, skilled NPC assistants, production time and containers for liquid outputs. A useful study of interacting survival systems, with a concrete entry point for a small crafting change.
- **License:** The README declares CC BY-SA 3.0 for project code and content; separately licensed bundled code retains its own notices.

## KeeperRL

- **Repository:** [miki151/keeperrl](https://github.com/miki151/keeperrl)
- **Game / stack:** Dungeon construction and minion management combined with direct, turn-based roguelike combat. C++ with SDL2; the [official overview](https://keeperrl.com/) describes management, exploration and dungeon sharing.
- **Start here:** [README](https://github.com/miki151/keeperrl/blob/master/README.md) links the game and documents dependencies, `make -j 8 OPT=true RELEASE=true`, and `./keeper`. The official site distinguishes the commercial release from the free version without graphics and sound.
- **Learn from:** [collective.cpp](https://github.com/miki151/keeperrl/blob/master/collective.cpp) coordinates minions, construction costs, workshops, stored resources and equipment rules. Useful for examining how a colony's shared inventory supports production and jobs.
- **License:** [GPLv2 code](https://github.com/miki151/keeperrl/blob/master/COPYING.txt). [Media terms](https://github.com/miki151/keeperrl/blob/master/COPYING-MEDIA.txt) distinguish restricted official-distribution assets from CC BY-SA 2.0 `data_free` material and font exceptions.

## Flare: Empyrean Campaign

- **Repository:** [flareteam/flare-game](https://github.com/flareteam/flare-game)
- **Game / stack:** Single-player dark-fantasy action RPG. This repository contains the campaign, game data, Tiled maps and art sources; the C++ FLARE engine is a separate repository.
- **Start here:** [README](https://github.com/flareteam/flare-game/blob/master/README) links complete engine-plus-game downloads and explains installing the `default`, `fantasycore` and `empyrean_campaign` mods when building from source.
- **Learn from:** [Return to Empyrean quest](https://github.com/flareteam/flare-game/blob/master/mods/empyrean_campaign/quests/0000_empyrean.txt) uses status conditions and completion flags to reveal journal text. A compact example of authoring an RPG quest as editable data instead of hard-coding every stage.
- **License:** [CC BY-SA 3.0 campaign data](https://github.com/flareteam/flare-game/blob/master/LICENSE.txt), with later versions permitted by the README; the separate engine is GPLv3 or later, and bundled fonts have OFL notices.

## The Legend of Edgar

- **Repository:** [riksweeney/edgar](https://github.com/riksweeney/edgar)
- **Game / stack:** 2D action platformer with a persistent world, puzzles, weapons and boss fights; C and SDL2. The [official game page](https://www.parallelrealities.co.uk/games/edgar/) provides controls, save-game details and releases.
- **Start here:** [Source readme](https://github.com/riksweeney/edgar/blob/master/doc/readme) documents the Make-based build and launch; [makefile](https://github.com/riksweeney/edgar/blob/master/makefile) identifies the SDL2 image, mixer and font dependencies.
- **Learn from:** [player.c](https://github.com/riksweeney/edgar/blob/master/src/player.c) initializes the player and attached weapon/shield entities and assigns drawing and damage callbacks. Useful for following how a traditional C entity system connects animation, combat and character state.
- **License:** [GPLv2](https://github.com/riksweeney/edgar/blob/master/doc/license), with later versions permitted in the reviewed source header; [music and sound credits](https://github.com/riksweeney/edgar/blob/master/doc/music_and_sound_licences) record separate asset licenses.

## Hedgewars

- **Repository:** [hedgewars/hw](https://github.com/hedgewars/hw), the project's official GitHub mirror; the README identifies its primary Mercurial repository.
- **Game / stack:** Turn-based team artillery with terrain destruction, varied weapons, movement tools and local/computer/network opponents. Free Pascal gameplay engine, C++/Qt frontend and Lua scripting; CMake build.
- **Start here:** [README](https://github.com/hedgewars/hw/blob/master/README.md) explains controls and training missions; [INSTALL.md](https://github.com/hedgewars/hw/blob/master/INSTALL.md) lists dependencies. Packaged downloads are linked from the README.
- **Learn from:** [uGearsUtils.pas](https://github.com/hedgewars/hw/blob/master/hedgewars/uGearsUtils.pas) resolves explosion distance, damage, impulse and status effects across game objects. A useful starting point for studying a weapon's effects on a shared physics world.
- **License:** The README declares GPLv2 for code and GFDL 1.2 for images and sound, linking the bundled license text.

## Naev

- **Repository:** [naev/naev on Codeberg](https://codeberg.org/naev/naev); [official GitHub mirror](https://github.com/naev/naev).
- **Game / stack:** Space trading, combat and exploration with ships, equipment and storyline missions. C and Rust engine code with Lua missions; SDL3 and Meson in the reviewed source. Upstream describes it as playable but still under development, with unfinished content.
- **Start here:** [README](https://github.com/naev/naev/blob/main/Readme.md) links packaged downloads and documents artwork submodules, Git LFS and Meson builds.
- **Learn from:** [cargo.lua](https://github.com/naev/naev/blob/main/dat/missions/neutral/cargo.lua) combines route selection, piracy risk, freight capacity, payment and landing callbacks in a complete mission. Useful for studying script-driven quest logic in a larger simulation.
- **License / contribution:** [License](https://github.com/naev/naev/blob/main/LICENSE) distinguishes GPLv3 code, later-version permissions, CC BY-SA data and asset-specific notices. The README directs development to Codeberg and prohibits generated submissions to the upstream project.

This repository supplement is linked from the README; it is not part of the exported website catalog.
