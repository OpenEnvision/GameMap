# Native Godot 2D game repositories

Reviewed 2026-10-22. Four short game projects with specific movement, input and puzzle systems to study. Native Godot project settings and 2D gameplay scripts were read, along with author-published play pages. No Godot import, export or playtest was performed.

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

This repository supplement is linked from the README; it is not part of the exported website catalog.
