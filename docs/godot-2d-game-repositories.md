# Native Godot 2D game repositories

Reviewed 2026-10-22. Seven game projects spanning movement, puzzles, deckbuilding and local multiplayer. Native Godot project settings and 2D gameplay scripts were read, along with author-published play pages. No Godot import, export or playtest was performed.

## Stomper

- **Repository:** [diego-escalante/GO2022-Stomper](https://github.com/diego-escalante/GO2022-Stomper)
- **Game / stack:** A precision platformer built around stomping enemies and acquiring movement abilities. Godot 3.5 / GDScript, created for Game Off 2022; the source contains 18 numbered levels and an end screen.
- **Play / open:** [Author's browser release](https://diego-escalante.itch.io/stomper); [README setup](https://github.com/diego-escalante/GO2022-Stomper/blob/main/README.md) explains importing the root `project.godot` in Godot 3.5.
- **Learn from:** [Player.gd](https://github.com/diego-escalante/GO2022-Stomper/blob/main/Player/Player.gd) connects jump buffering, coyote time, stomping combos and dash/double-jump changes. [FinalGoal.gd](https://github.com/diego-escalante/GO2022-Stomper/blob/main/World/FinalGoal.gd) records the last level and triggers the end screen.
- **License:** [MIT](https://github.com/diego-escalante/GO2022-Stomper/blob/main/LICENSE).

## The roots of all our problems

- **Repository:** [Orama-Interactive/The-roots-of-all-our-problems](https://github.com/Orama-Interactive/The-roots-of-all-our-problems)
- **Game / stack:** A narrative side-scrolling game about guiding a helicopter seed through obstacles to find somewhere to grow. Originally made for Global Game Jam 2023; current [project.godot](https://github.com/Orama-Interactive/The-roots-of-all-our-problems/blob/main/project.godot) declares Godot 4.2 and compatibility rendering.
- **Play / open:** [Author's itch page](https://orama-interactive.itch.io/the-roots-of-all-our-problems) offers browser play plus Windows and Linux downloads. Import the root `project.godot` to inspect the source.
- **Learn from:** [Player.gd](https://github.com/Orama-Interactive/The-roots-of-all-our-problems/blob/main/src/Player.gd) implements one-button flight, optional microphone-threshold input, temporary invulnerability and hit feedback using `CharacterBody2D`. [ending.gd](https://github.com/Orama-Interactive/The-roots-of-all-our-problems/blob/main/src/ending.gd) transitions from the ending animation to credits.
- **License:** [README](https://github.com/Orama-Interactive/The-roots-of-all-our-problems/blob/main/README.md) declares MIT code and CC BY-NC-SA 3.0 assets; the itch page labels the assets CC BY-NC-SA 4.0. Both identify noncommercial share-alike assets, with different version labels.

## Hugh's Chromatic Adventure

- **Repository:** [tessapower/ggj-2026](https://github.com/tessapower/ggj-2026)
- **Game / stack:** A short puzzle platformer in which colored masks change obstacles and routes. Global Game Jam 2026 entry with three level scenes; Godot 4.6 / GDScript according to the nested [project.godot](https://github.com/tessapower/ggj-2026/blob/main/hughs-chromatic-adventure/project.godot).
- **Play / open:** [Author's itch page](https://sasspower.itch.io/hughs-chromatic-adventure) offers browser play and desktop downloads; it labels the project “in development.” Import `hughs-chromatic-adventure/project.godot`.
- **Learn from:** [mask_manager.gd](https://github.com/tessapower/ggj-2026/blob/main/hughs-chromatic-adventure/scripts/managers/mask_manager.gd) broadcasts mask changes to color groups and synchronizes music layers. [level.gd](https://github.com/tessapower/ggj-2026/blob/main/hughs-chromatic-adventure/scripts/levels/level.gd) handles keys, doors, goals and transitions. A compact example of sharing one mechanic across multiple levels.
- **License:** [MIT](https://github.com/tessapower/ggj-2026/blob/main/LICENSE); the [README](https://github.com/tessapower/ggj-2026/blob/main/README.md) separately credits the BoldPixels font.

## Mirror Conflict — playable jam demo

- **Repository:** [255-Ping/Mirror-Conflict](https://github.com/255-Ping/Mirror-Conflict)
- **Game / stack:** Puzzle-action levels with a second character driven by the player's reversed horizontal input. Godot 4.6 / GDScript, using `CharacterBody2D`; the source contains 12 numbered levels and an ending scene. The author calls the published build a demo.
- **Play / open:** [Author's browser demo](https://255-ping.github.io/Mirror-Conflict/), linked from the [README](https://github.com/255-Ping/Mirror-Conflict/blob/main/README.md). Import the root [project.godot](https://github.com/255-Ping/Mirror-Conflict/blob/main/project.godot); the scene-loader add-on is included.
- **Learn from:** [opposite_player.gd](https://github.com/255-Ping/Mirror-Conflict/blob/main/Scripts/Players/opposite_player.gd) reverses horizontal input, handles shared jumping and crate pushing, and advances after the mirrored character's death. [level_12.gd](https://github.com/255-Ping/Mirror-Conflict/blob/main/Scripts/Levels/level_12.gd) leads to the ending scene.
- **License:** [GPLv3 or later](https://github.com/255-Ping/Mirror-Conflict/blob/main/LICENSE); the README credits separately sourced art, sound and music.

## Worlds Upon The Wind

- **Repository:** [max99x/wutw-public](https://github.com/max99x/wutw-public), the author's complete game-source mirror.
- **Game / stack:** A peaceful roguelite deckbuilder about planning settlements on broken islands, changing terrain with cards and progressing through expeditions. Godot 4.7 / GDScript, with C++ GDExtensions for map generation and sprite management.
- **Play / open:** The [README](https://github.com/max99x/wutw-public/blob/main/README.md) explains opening `wutw/project.godot`, waiting for import and pressing F5; prebuilt extensions are included in `wutw/bin`. The [official Steam page](https://store.steampowered.com/app/3640430/Worlds_Upon_The_Wind/) offers the release and a demo for Windows, Linux and macOS.
- **Learn from:** [run.gd](https://github.com/max99x/wutw-public/blob/main/wutw/run/run.gd) connects phase selection, card play, rewards, seasons and win/loss state. [card_type.gd](https://github.com/max99x/wutw-public/blob/main/wutw/cards/card_type.gd) models rarity, abilities and display data as resources. Useful for following content and progression in a larger card game.
- **License:** [CC0](https://github.com/max99x/wutw-public/blob/main/LICENSE.md) for the author's code and art, with separate third-party notices. Commercial music and sound effects are omitted; the source version is largely silent apart from voiced cutscenes.

## Starship Olympics — playable alpha

- **Repository:** [notapixelstudio/starship-olympics](https://github.com/notapixelstudio/starship-olympics), previously SuperStarfighter.
- **Game / stack:** One-button spaceship competition for 1–4 local players, with racing, collection and combat modes plus AI opponents. GDScript / Godot 2D; the [current project configuration](https://github.com/notapixelstudio/starship-olympics/blob/main/godot/project.godot) declares 4.7, while the README still says 4.4.x.
- **Play / open:** The [author's itch page](https://notapixel.itch.io/starship-olympics) provides Windows, Linux and macOS alpha downloads. For source study, import `godot/project.godot` using the project-declared engine version. The [README](https://github.com/notapixelstudio/starship-olympics/blob/main/README.md) describes development plans as well as implemented features.
- **Learn from:** [RacingGame.gd](https://github.com/notapixelstudio/starship-olympics/blob/main/godot/godot4/arena/managers/games/RacingGame.gd) tracks ordered gates and player progress. [GameOverManager.gd](https://github.com/notapixelstudio/starship-olympics/blob/main/godot/godot4/arena/managers/GameOverManager.gd) shares time limits, score limits and rankings across modes.
- **License:** [MIT source](https://github.com/notapixelstudio/starship-olympics/blob/main/LICENSE_source_code.txt); game assets have separate terms, generally CC BY-NC-SA 2.0 with credited exceptions. Published binaries carry a separate EULA.

## ROTA: Bend Gravity

- **Repository:** [HarmonyHoney/ROTA](https://github.com/HarmonyHoney/ROTA), reviewed on `master4`.
- **Game / stack:** A released gravity puzzle game: round platform edges to change gravity, manipulate blocks and collect gems across eight worlds. The [README](https://github.com/HarmonyHoney/ROTA/blob/master4/readme.md) specifies Godot 3.6.1; the branch name does not indicate Godot 4.
- **Play / open:** The [author's itch page](https://harmonymonroe.itch.io/rota) offers browser play and desktop/Android downloads. Import the root [project.godot](https://github.com/HarmonyHoney/ROTA/blob/master4/project.godot) for source study.
- **Learn from:** [Player.gd](https://github.com/HarmonyHoney/ROTA/blob/master4/src/actor/Player.gd) rotates coordinates to share movement and ground checks across four gravity directions. [Box.gd](https://github.com/HarmonyHoney/ROTA/blob/master4/src/actor/Box.gd) connects blocked-cell checks, chained pushing and animation.
- **License:** The current [LICENSE](https://github.com/HarmonyHoney/ROTA/blob/master4/LICENSE) contains MIT terms; the README still names the Unlicense and excludes `addons/` from its blanket statement. Consult the current file and individual add-on notices when reusing material.

This repository supplement is linked from the README; it is not part of the exported website catalog.
