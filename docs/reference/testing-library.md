# Game testing library

Pick a project you can reset at the point that matters. For a retry bug, a small Godot demo that reaches game over quickly gives you a short control run. For an animation import issue, choose a rig and a clip with a visible foot plant so you can compare the source and the imported motion in one scene.

For a study of visual navigation, decide how much of the room the agent can see before choosing the task. MiniGrid offers both a full-grid RGB view and a partial RGB view. On DoorKey, a full grid gives the agent more information about where to look for the key. Keep the view, layout seed, and step limit fixed when comparing two agents. [MiniGrid's observation wrappers](https://minigrid.farama.org/api/wrappers/)

## Starter packs

### Coding & automated playtests

**Change a working game.**

**Start with:** [Godot official demos](/testing/godot-demos/) · [SuperTux](/testing/supertux/) · [The Battle for Wesnoth](/testing/wesnoth/).

Build the baseline, change one mechanic, then replay the same input sequence.

**Measure:** Build success, requested behavior, regressions, and repair attempts.

**Checkpoint:** In one selected project, define the expected outcomes and save an unchanged baseline run. After the edit, build again, exercise the requested mechanic, and replay the original input sequence to check existing behavior. Record commands and pass/fail evidence for all three checks.

### Vision, control & planning

**Give an agent a goal.**

**Start with:** [MiniGrid / BabyAI](/testing/minigrid/) · [Crafter](/testing/crafter/) · [ViZDoom](/testing/vizdoom/).

Fix the task, seed, action rate, observation source, and episode budget.

**Measure:** Success rate, collisions, path length, resources, and task completion.

**Checkpoint:** Before running, fix the environment and task, seed settings, observation mode, action rate and action/time budget. Record every scheduled episode through success, failure, timeout or error, saving its return, length, termination reason and action/observation trace. Include failed and unfinished runs in the reported results.

### Asset & animation pipelines

**Move an asset through the pipeline.**

**Start with:** [Kenney](/testing/kenney/) · [Quaternius Universal Animation Library](/testing/quaternius-ual/) · [100STYLE](/testing/100style/).

Import a character, map its skeleton, and play a licensed motion clip.

**Measure:** Missing textures, scale, skinning, foot sliding, root motion, and loop seams.

**Checkpoint:** Choose one rigged character and one compatible clip covered by the recorded licenses. Import them into a pinned engine, verify textures, units and skeleton mapping, then play one named clip and inspect skinning, foot contact, root travel and loop seams. Save import settings and results; record missing files or unmapped joints as failures.

## Resource index

| Resource | Type | Dimension | Test goals | Get / run | Source |
| --- | --- | --- | --- | --- | --- |
| Godot official demos | Games & engine projects | 2D / 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Play browser demos](https://godotengine.github.io/godot-demo-projects/) | [Primary source](https://github.com/godotengine/godot-demo-projects) |
| SuperTux | Games & engine projects | 2D | Coding & automated playtests; Vision, control & planning | [Play official browser build](https://play.supertux.org/) | [Primary source](https://github.com/SuperTux/supertux) |
| Endless Sky | Games & engine projects | 2D | Coding & automated playtests; Vision, control & planning | [Free Steam game](https://store.steampowered.com/app/404410/Endless_Sky/) | [Primary source](https://github.com/endless-sky/endless-sky) |
| DDraceNetwork (DDNet) | Games & engine projects | 2D | Coding & automated playtests; Vision, control & planning | [Free Steam game](https://store.steampowered.com/app/412220/DDraceNetwork/) | [Primary source](https://github.com/ddnet/ddnet) |
| The Battle for Wesnoth | Games & engine projects | 2D | Coding & automated playtests; Vision, control & planning | [Free Steam game](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/) | [Primary source](https://github.com/wesnoth/wesnoth) |
| Mindustry | Games & engine projects | 2D | Coding & automated playtests; Vision, control & planning | [Free author download](https://anuke.itch.io/mindustry) | [Primary source](https://github.com/Anuken/Mindustry) |
| OpenTTD | Games & engine projects | 2D | Coding & automated playtests; Vision, control & planning | [Free official download](https://www.openttd.org/downloads/openttd-releases/latest) | [Primary source](https://github.com/OpenTTD/OpenTTD) |
| SuperTuxKart | Games & engine projects | 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Free desktop downloads](https://supertuxkart.net/Download) | [Primary source](https://github.com/supertuxkart/stk-code) |
| Luanti + Minetest Game | Games & engine projects | 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Get Minetest Game](https://content.luanti.org/packages/Minetest/minetest_game/) | [Primary source](https://github.com/luanti-org/luanti) |
| Red Eclipse | Games & engine projects | 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Free Steam game](https://store.steampowered.com/app/967460/Red_Eclipse/) | [Primary source](https://github.com/redeclipse/base) |
| Zero-K | Games & engine projects | 3D | Coding & automated playtests; Vision, control & planning | [Free Steam game](https://store.steampowered.com/app/334920/ZeroK/) | [Primary source](https://github.com/ZeroK-RTS/Zero-K) |
| Unity BoatAttack | Games & engine projects | 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Get Unity sample source](https://github.com/Unity-Technologies/BoatAttack) | [Primary source](https://github.com/Unity-Technologies/BoatAttack) |
| Unreal Engine Lyra Starter Game | Games & engine projects | 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Get free Lyra sample](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en) | [Primary source](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) |
| Bevy official examples | Games & engine projects | 2D / 3D | Coding & automated playtests; Asset & animation pipelines | [Browse runnable examples](https://bevyengine.org/examples/) | [Primary source](https://github.com/bevyengine/bevy) |
| MiniGrid / BabyAI | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Free Python package](https://minigrid.farama.org/) | [Primary source](https://github.com/Farama-Foundation/Minigrid) |
| Crafter | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Free package and playable GUI](https://github.com/danijar/crafter#play-yourself) | [Primary source](https://github.com/danijar/crafter) |
| Craftax | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Free Python package](https://github.com/MichaelTMatthews/Craftax#readme) | [Primary source](https://github.com/MichaelTMatthews/Craftax) |
| ViZDoom | AI evaluation environments | 3D | Coding & automated playtests; Vision, control & planning | [Free package with Freedoom assets](https://vizdoom.farama.org/) | [Primary source](https://github.com/Farama-Foundation/ViZDoom) |
| NetHack Learning Environment | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Free package and source](https://github.com/NetHack-LE/nle#installation) | [Primary source](https://github.com/NetHack-LE/nle) |
| Godot RL Agents | AI evaluation environments | 2D / 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Free toolkit and example projects](https://github.com/edbeeching/godot_rl_agents#quickstart-guide) | [Primary source](https://github.com/edbeeching/godot_rl_agents) |
| Unity ML-Agents | AI evaluation environments | 2D / 3D | Coding & automated playtests; Vision, control & planning; Asset & animation pipelines | [Free toolkit; Unity editor required](https://github.com/Unity-Technologies/ml-agents/releases) | [Primary source](https://github.com/Unity-Technologies/ml-agents) |
| Arcade Learning Environment (ALE) | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Official documentation and install guide](https://ale.farama.org/) | [Primary source](https://github.com/Farama-Foundation/Arcade-Learning-Environment) |
| Procgen Benchmark | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Install the Python package](https://github.com/openai/procgen#readme) | [Primary source](https://github.com/openai/procgen) |
| Google Research Football | AI evaluation environments | 3D | Coding & automated playtests; Vision, control & planning | [Installation and scenario guide](https://github.com/google-research/football#readme) | [Primary source](https://github.com/google-research/football) |
| Overcooked-AI | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Installation and layout guide](https://github.com/HumanCompatibleAI/overcooked_ai#readme) | [Primary source](https://github.com/HumanCompatibleAI/overcooked_ai) |
| MuJoCo | AI evaluation environments | 3D | Coding & automated playtests; Asset & animation pipelines | [Official documentation](https://mujoco.readthedocs.io/en/stable/overview.html) | [Primary source](https://github.com/google-deepmind/mujoco) |
| Gymnasium classic control | AI evaluation environments | 2D | Coding & automated playtests; Vision, control & planning | [Classic control environment docs](https://gymnasium.farama.org/environments/classic_control/) | [Primary source](https://github.com/Farama-Foundation/Gymnasium) |
| Kenney | Asset libraries | 2D / 3D | Coding & automated playtests; Asset & animation pipelines | [Browse free asset packs](https://kenney.nl/assets) | [Primary source](https://kenney.nl/assets) |
| Quaternius | Asset libraries | 3D | Coding & automated playtests; Asset & animation pipelines | [Browse creator packs](https://quaternius.com/) | [Primary source](https://quaternius.com/) |
| Poly Haven | Asset libraries | 3D | Asset & animation pipelines | [Browse CC0 assets](https://polyhaven.com/all) | [Primary source](https://polyhaven.com/) |
| ambientCG | Asset libraries | 3D | Asset & animation pipelines | [Browse downloadable assets](https://ambientcg.com/list) | [Primary source](https://ambientcg.com/) |
| OpenGameArt | Asset libraries | 2D / 3D | Coding & automated playtests; Asset & animation pipelines | [Browse community assets](https://opengameart.org/) | [Primary source](https://opengameart.org/) |
| Fab | Asset libraries | 2D / 3D | Asset & animation pipelines | [Browse marketplace listings](https://www.fab.com/) | [Primary source](https://www.fab.com/) |
| Unity Asset Store | Asset libraries | 2D / 3D | Asset & animation pipelines | [Browse Asset Store packages](https://assetstore.unity.com/) | [Primary source](https://assetstore.unity.com/) |
| Khronos glTF Sample Assets | Asset libraries | 3D | Coding & automated playtests; Asset & animation pipelines | [Browse the official asset lists](https://github.khronos.org/glTF-Assets/) | [Primary source](https://github.com/KhronosGroup/glTF-Sample-Assets) |
| Khronos glTF Asset Generator | Asset libraries | 3D | Coding & automated playtests; Asset & animation pipelines | [Browse generated test assets](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Positive) | [Primary source](https://github.com/KhronosGroup/glTF-Asset-Generator) |
| Kenney Animated Characters | Rigs & motion data | 3D | Asset & animation pipelines | [Download character pack](https://kenney.nl/assets/animated-characters-protagonists) | [Primary source](https://kenney.nl/assets/animated-characters-protagonists) |
| Quaternius Universal Animation Library | Rigs & motion data | 3D | Asset & animation pipelines | [Get the free Standard edition](https://quaternius.itch.io/universal-animation-library) | [Primary source](https://quaternius.itch.io/universal-animation-library) |
| 100STYLE | Rigs & motion data | 3D | Asset & animation pipelines | [Get the original motion data](https://www.ianxmason.com/100style/) | [Primary source](https://www.ianxmason.com/100style/) |
| CMU Motion Capture Database | Rigs & motion data | 3D | Asset & animation pipelines | [Browse subjects and motions](https://mocap.cs.cmu.edu/) | [Primary source](https://mocap.cs.cmu.edu/) |
| LaFAN1 | Rigs & motion data | 3D | Asset & animation pipelines | [Open dataset repository](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) | [Primary source](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) |
| AMASS | Rigs & motion data | 3D | Asset & animation pipelines | [Review access and dataset terms](https://amass.is.tue.mpg.de/) | [Primary source](https://amass.is.tue.mpg.de/) |
| SMPL-Body | Rigs & motion data | 3D | Asset & animation pipelines | [Read the body subset license](https://smpl.is.tue.mpg.de/bodylicense.html) | [Primary source](https://smpl.is.tue.mpg.de/) |
| SMPL-Model | Rigs & motion data | 3D | Asset & animation pipelines | [Review model access terms](https://smpl.is.tue.mpg.de/modellicense.html) | [Primary source](https://smpl.is.tue.mpg.de/) |
| Mixamo | Rigs & motion data | 3D | Asset & animation pipelines | [Read service FAQ first](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) | [Primary source](https://www.mixamo.com/) |
| SDL GameControllerDB | Input & data fixtures | 2D / 3D | Coding & automated playtests; Vision, control & planning | [Download gamecontrollerdb.txt](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt) | [Primary source](https://github.com/mdqinc/SDL_GameControllerDB) |

## Reviewed resources

### Godot official demos

Small, separate engine projects for character control, physics, navigation, networking, animation and import/export regression tests.

**Stack / format:** Godot / GDScript / C#

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 2D / 3D

[Play browser demos](https://godotengine.github.io/godot-demo-projects/) — Free browser builds and downloadable source projects. Browser exports cover a subset of the repository.

[Project / source record](https://github.com/godotengine/godot-demo-projects) · [License / terms](https://github.com/godotengine/godot-demo-projects/blob/master/LICENSE.md)

- **License group:** Open-license sources
- **Code:** MIT; retain the repository license and notices.
- **Assets / data:** Repository MIT license applies unless an individual demo or bundled resource states otherwise; keep local attribution notices.
- **AI use:** A useful open-license baseline for code editing and automated playtests. Record licenses of any additional assets or plugins rather than treating the demo license as a grant for unrelated data.
- **Practical limits:** Not installed or run in this research pass. Hosted web demos redeploy from master on every commit, so their URLs are not immutable baselines. Pin a compatible source commit for repeatable tests; the development branch and web renderer can differ from stable desktop behavior.

**Suggested test tasks**

- Change one movement or collision rule and verify the original scene still starts and completes its objective.
- Import a known model or animation, then compare material loading, scale, skeleton mapping and exported behavior.
- Replay the same input sequence and record screenshots, errors and task completion.

**Get started**

1. Choose a stable demo branch or release compatible with the installed Godot version; pin its commit.
2. Download one demo directory, import its project.godot and run its main scene.
3. Save the engine version, scene, input sequence and expected result alongside the baseline.

**Primary evidence**

- [Official source and branch guidance](https://github.com/godotengine/godot-demo-projects)
- [Official browser builds](https://godotengine.github.io/godot-demo-projects/)
- [Repository license](https://github.com/godotengine/godot-demo-projects/blob/master/LICENSE.md)

### SuperTux

A complete platform game for jump timing, collision, level editing and visual/input regression tasks in a substantial native codebase.

**Stack / format:** C++ / CMake / 2D platformer

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Play official browser build](https://play.supertux.org/) — Official browser play, a free Steam release and independent desktop downloads are available. Building modified core code requires the native toolchain.

[Project / source record](https://github.com/SuperTux/supertux) · [License / terms](https://github.com/SuperTux/supertux)

- **License group:** Mixed code / asset licenses
- **Code:** GNU GPL; inspect the pinned version and component notices before distributing a modified build.
- **Assets / data:** Most game data uses CC BY-SA; individual files and third-party components have additional notices.
- **AI use:** Code access supports instrumented experiments, but GPL code and CC BY-SA game data carry different obligations. Keep any redistributed screenshots, maps or data exports traceable to their source licenses.
- **Practical limits:** Not installed or run in this research pass. It has no ready-made Gymnasium evaluation contract; observation, action timing and reset/success detection need a harness.

**Suggested test tasks**

- Modify jump acceleration or a collision edge case, then replay a fixed level.
- Measure completion rate, deaths, missed jumps and time for a screen-based controller.
- Change a level and verify checkpoints, enemies and completion conditions.

**Get started**

1. Start with the free binary and a fixed level to establish a control baseline.
2. For code edits, follow the repository build instructions with CMake and the required C++ dependencies.
3. Pin the game version, level, settings and input timing before comparing agents.

**Primary evidence**

- [Official game source and licensing](https://github.com/SuperTux/supertux)
- [Steam release](https://store.steampowered.com/app/1572920/SuperTux/)
- [Independent downloads](https://www.supertux.org/download.html)

### Endless Sky

A complete space game for navigation, combat, trading and long-horizon mission planning, with editable data and a plugin system.

**Stack / format:** C++ / space exploration / data-driven content

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free Steam game](https://store.steampowered.com/app/404410/Endless_Sky/) — Free Steam and desktop releases; plugins offer a lighter starting point than rebuilding the engine.

[Project / source record](https://github.com/endless-sky/endless-sky) · [License / terms](https://github.com/endless-sky/endless-sky/blob/master/copyright)

- **License group:** Mixed code / asset licenses
- **Code:** GPLv3; third-party code and files may have their own notices.
- **Assets / data:** Multiple artwork and audio licenses; the repository copyright file identifies authors and terms.
- **AI use:** Use the copyright inventory when selecting artwork or audio for an exported test dataset. A free game download does not combine all of its materials into one license.
- **Practical limits:** Not installed or run in this research pass. General campaign progress is a broad, variable target; a saved state and bounded scenario are needed for comparable scores.

**Suggested test tasks**

- Create a small plugin with a mission, dialogue and explicit success condition.
- Evaluate route choice, fuel management and trading from a fixed saved state.
- Modify a combat or mission rule and verify save compatibility and task completion.

**Get started**

1. Install the free release and preserve a baseline save and settings.
2. Use a separate plugin directory for content changes; follow the repository instructions for C++ changes.
3. Define a bounded mission with fixed starting resources and record the game version.

**Primary evidence**

- [Official source and build instructions](https://github.com/endless-sky/endless-sky)
- [Steam release](https://store.steampowered.com/app/404410/Endless_Sky/)
- [Code and asset copyright inventory](https://github.com/endless-sky/endless-sky/blob/master/copyright)

### DDraceNetwork (DDNet)

A cooperative platform game with grappling, precise movement, maps and replay support for input timing and multiplayer regression tasks.

**Stack / format:** C++ / CMake / networked precision platformer

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free Steam game](https://store.steampowered.com/app/412220/DDraceNetwork/) — Free game and local server binaries. Use a private local server for controlled evaluation.

[Project / source record](https://github.com/ddnet/ddnet) · [License / terms](https://github.com/ddnet/ddnet/blob/master/license.txt)

- **License group:** Mixed code / asset licenses
- **Code:** zlib for project code, with bundled third-party licenses.
- **Assets / data:** Game data defaults to CC BY-SA 3.0; fonts and other files have exceptions recorded in license.txt.
- **AI use:** The client/server source enables instrumentation. Preserve map authorship and data licenses when sharing fixtures or replays; conduct repeatable tests on a local server.
- **Practical limits:** Not installed or run in this research pass. Fine control is sensitive to timing and server settings; public-server results are not a stable benchmark.

**Suggested test tasks**

- Complete a fixed map section using movement, jump and hook inputs.
- Modify a physics or collision rule and compare recorded runs.
- Test two cooperating clients and measure synchronization, completion and failed interactions.

**Get started**

1. Install matching client and server versions and start a local server with one fixed map.
2. Record server settings and disable uncontrolled changes between trials.
3. Use demos or a custom harness to preserve inputs and detect finish or reset events.

**Primary evidence**

- [Official source and local server instructions](https://github.com/ddnet/ddnet)
- [Steam release](https://store.steampowered.com/app/412220/DDraceNetwork/)
- [Code, data and third-party licenses](https://github.com/ddnet/ddnet/blob/master/license.txt)

### The Battle for Wesnoth

A turn-based tactics game with editable scenarios and scripting, suitable for pathfinding, tactical decisions, dialogue and rules changes.

**Stack / format:** C++ / Lua / Wesnoth Markup Language

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free Steam game](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/) — Free Steam and independent releases. Start with a small WML/Lua scenario before changing the C++ engine.

[Project / source record](https://github.com/wesnoth/wesnoth) · [License / terms](https://github.com/wesnoth/wesnoth/blob/master/copyright)

- **License group:** Mixed code / asset licenses
- **Code:** GPLv2 or later, with component-specific notices.
- **Assets / data:** Core artwork/audio uses GPLv2-or-later or CC BY-SA 4.0; copyrights.csv records file-level notices. Add-on artwork/audio may also use Creative Commons NC or ND terms, so audit each add-on separately.
- **AI use:** Scenarios and scripts provide inspectable tasks, but add-ons and artwork require their own attribution records. Do not assume the engine license covers every downloaded add-on.
- **Practical limits:** Not installed or run in this research pass. Combat randomness and campaign variation require controlled seeds or repeated trials; the normal UI is not a ready-made agent API.

**Suggested test tasks**

- Create or repair a small scenario with explicit victory and defeat conditions.
- Measure tactical success, movement efficiency and resource use from a fixed scenario state.
- Modify a unit ability or dialogue trigger and verify replays and scenario progression.

**Get started**

1. Install a stable release and select one small scenario with fixed map, units and difficulty.
2. Use the documented WML/Lua add-on structure for isolated changes.
3. Record seeds where available and preserve the starting save to control combat variation.

**Primary evidence**

- [Core code license](https://github.com/wesnoth/wesnoth/blob/ca544b10b5d0a88f1336465d82500cefee67bfc9/copyright)
- [File-level artwork and audio inventory](https://github.com/wesnoth/wesnoth/blob/ca544b10b5d0a88f1336465d82500cefee67bfc9/copyrights.csv)
- [Core versus add-on licensing policy](https://wiki.wesnoth.org/index.php?title=Wesnoth:Copyrights&oldid=75641)
- [Steam release](https://store.steampowered.com/app/599390/Battle_for_Wesnoth/)
- [Official development and scenario documentation](https://wiki.wesnoth.org/Create)

### Mindustry

A logistics and defense game for production chains, construction, resource planning and client/server changes in a real game project.

**Stack / format:** Java / Gradle / factory and tower defense

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free author download](https://anuke.itch.io/mindustry) — The author itch.io page permits a zero-price download. The Steam edition is paid; free source access does not mean every storefront release is free.

[Project / source record](https://github.com/Anuken/Mindustry) · [License / terms](https://github.com/Anuken/Mindustry/blob/master/LICENSE)

- **License group:** Mixed code / asset licenses
- **Code:** GPLv3; retain notices for dependencies and distributed modifications.
- **Assets / data:** Check repository and bundled third-party notices for the selected release; no blanket CC0 asset grant is asserted here.
- **AI use:** A useful source-accessible test bed for planning and code changes. Retain license records for extracted assets, maps and plugins rather than inferring unrestricted dataset use from the free download.
- **Practical limits:** Not installed or run in this research pass. Campaign maps and live servers introduce uncontrolled state; use a dedicated map or local server for comparison.

**Suggested test tasks**

- Build a production chain that sustains a specified resource rate before a fixed wave.
- Change a block or unit rule and verify loading, construction and client/server behavior.
- Measure resource waste, survival and goal completion on a fixed custom map.

**Get started**

1. Download the free desktop release or server from an official source and pin the version.
2. Use a small custom map with fixed starting resources and wave settings.
3. For source changes, follow the repository JDK/Gradle requirements rather than assuming a preinstalled Java version.

**Primary evidence**

- [Author download and pricing](https://anuke.itch.io/mindustry)
- [Official source, server and build guidance](https://github.com/Anuken/Mindustry)
- [Repository license](https://github.com/Anuken/Mindustry/blob/master/LICENSE)

### OpenTTD

A transport simulation for route and rail construction, economic planning, pathfinding, saves and multiplayer synchronization.

**Stack / format:** C++ / isometric transport simulation

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free official download](https://www.openttd.org/downloads/openttd-releases/latest) — The official-site build remains free. Since March 2026, new Steam/GOG users acquire it through a paid bundle with original TTD; existing users retain updates.

[Project / source record](https://github.com/OpenTTD/OpenTTD) · [License / terms](https://github.com/OpenTTD/OpenTTD/blob/master/COPYING.md)

- **License group:** Mixed code / asset licenses
- **Code:** GPLv2; component notices remain applicable.
- **Assets / data:** Use the separate OpenGFX, OpenSFX and OpenMSX base sets and retain their licenses. Original Transport Tycoon Deluxe data is not an open asset pack.
- **AI use:** Open source and open base sets can support reproducible scenarios. Keep the base-set and NewGRF licenses separate, especially when exporting visual fixtures or distributing a benchmark bundle.
- **Practical limits:** Not installed or run in this research pass. Steam is no longer a zero-price acquisition route for new users. Long simulation horizons need a fixed time budget and consistent simulation settings.

**Suggested test tasks**

- Connect fixed industries and reach a target delivery or profit level within a fixed game period.
- Repair a rail deadlock or pathfinding rule and replay the same saved game.
- Verify save/load and synchronization after a source or script change.

**Get started**

1. Download the free official-site release and install the open graphics, sound and music base sets.
2. Fix the map seed, game options, date and starting save; omit uncontrolled NewGRF additions.
3. Use a small scenario or local dedicated server and define a measurable transport objective.

**Primary evidence**

- [Official source and build guidance](https://github.com/OpenTTD/OpenTTD)
- [March 2026 Steam distribution change](https://www.openttd.org/news/2026/03/14/steam-changes)
- [Code license](https://github.com/OpenTTD/OpenTTD/blob/master/COPYING.md)

### SuperTuxKart

A full racing game for visual steering, continuous control, physics regressions, tracks, karts and model/material pipeline tests.

**Stack / format:** C++ / 3D kart racing / Blender asset workflow

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 3D

[Free desktop downloads](https://supertuxkart.net/Download) — Free desktop packages. Source builds also require the game data described in the build documentation.

[Project / source record](https://github.com/supertuxkart/stk-code) · [License / terms](https://supertuxkart.net/Licensing)

- **License group:** Mixed code / asset licenses
- **Code:** GPLv3 or later for SuperTuxKart code; bundled components retain their own notices.
- **Assets / data:** Multiple licenses, including Creative Commons terms; inspect the asset authorship and licensing records.
- **AI use:** Useful for instrumented driving and asset integration, with a separate license audit for each redistributed track, character or recorded asset collection.
- **Practical limits:** Not installed or run in this research pass. The source repository alone is not the complete asset download, and screen-based evaluation still needs an input/reset harness.

**Suggested test tasks**

- Complete fixed laps and measure finish rate, lap time, collisions and recovery.
- Change steering or collision behavior and compare the same kart and track.
- Import a test kart or track and verify scale, materials, collision and runtime loading.

**Get started**

1. Install a stable binary and fix the track, kart, difficulty and race settings.
2. For code edits, obtain the matching game data and follow the C++ build instructions.
3. Keep a baseline driving sequence and establish explicit lap/finish detection.

**Primary evidence**

- [Official source and build guidance](https://github.com/supertuxkart/stk-code)
- [Official downloads](https://supertuxkart.net/Download)
- [Code and asset licensing](https://supertuxkart.net/Licensing)
- [Pinned GPLv3-or-later and per-asset license scope](https://github.com/supertuxkart/stk-code/blob/2997f192e6876047909d909498dbb4810e5dbb8d/COPYING)

### Luanti + Minetest Game

An editable voxel sandbox for first-person navigation, digging, placement, crafting and Lua entity, texture and world changes.

**Stack / format:** C++ Luanti engine / Lua games and mods / voxel worlds

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 3D

[Get Minetest Game](https://content.luanti.org/packages/Minetest/minetest_game/) — Install the free Luanti engine, then add this game through ContentDB. The engine and the game are separate projects.

[Project / source record](https://github.com/luanti-org/luanti) · [License / terms](https://github.com/luanti-org/minetest_game/blob/master/LICENSE.txt)

- **License group:** Mixed code / asset licenses
- **Code:** Luanti engine LGPL2.1 or later; Minetest Game code uses LGPL2.1, with mod-level notices.
- **Assets / data:** Minetest Game media defaults to CC BY-SA 3.0; inspect each mod README for authors and exceptions. Other ContentDB packages have independent terms.
- **AI use:** Lua mods are practical instrumentation points. Record the license of every game/mod and asset added to the world; ContentDB availability alone is not a blanket data-use permission.
- **Practical limits:** Not installed or run in this research pass. Minetest Game is a basic sandbox without a single built-in benchmark goal; custom task design and a controller bridge are required.

**Suggested test tasks**

- Create a Lua mod with a fixed navigation, placement or crafting objective and a success signal.
- Evaluate a first-person agent from the same seed, spawn, inventory and world snapshot.
- Add an entity or texture and verify coordinate scale, materials, collision and save persistence.

**Get started**

1. Pin the Luanti release and exact Minetest Game commit or package revision; the game uses rolling releases and is in maintenance-only mode. Create a dedicated local test world.
2. Save the seed and a pristine world snapshot, then install only the required mods.
3. Use a small custom Lua mod to expose resets, task state and measurable success.

**Primary evidence**

- [Engine source and installation](https://github.com/luanti-org/luanti)
- [Official game package](https://content.luanti.org/packages/Minetest/minetest_game/)
- [Game code and media licenses](https://github.com/luanti-org/minetest_game/blob/master/LICENSE.txt)
- [Pinned rolling-release and maintenance policy](https://github.com/luanti-org/minetest_game/blob/c42e4d0c0ff9d27ff7b9b308c3cfc14098dd3a0f/README.md)

### Red Eclipse

A first-person arena game for aim, navigation, parkour, bot scenarios, real-time map editing and native client/server changes.

**Stack / format:** C++ / first-person arena shooter / map editor

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 3D

[Free Steam game](https://store.steampowered.com/app/967460/Red_Eclipse/) — Free Steam release for Windows and Linux. Use a local match and fixed bot/map settings for evaluation.

[Project / source record](https://github.com/redeclipse/base) · [License / terms](https://github.com/redeclipse/base/blob/master/doc/license.txt)

- **License group:** Mixed code / asset licenses
- **Code:** zlib for project code; bundled components retain their notices.
- **Assets / data:** Game content includes CC BY-SA and other licenses; consult the project license inventory.
- **AI use:** The open client/server allows controlled instrumentation. Preserve content attribution when sharing maps or visual datasets and evaluate against local bots or a dedicated test server.
- **Practical limits:** Not installed or run in this research pass. The Steam listing does not offer a macOS build, and normal gameplay needs an external or source-integrated agent harness.

**Suggested test tasks**

- Measure target acquisition, navigation, survival and objective completion on a fixed map.
- Modify a movement or weapon rule and verify the client/server match still runs.
- Edit a test map and check spawn points, geometry, lighting and collision.

**Get started**

1. Use a supported Windows/Linux release or follow the repository build instructions.
2. Start a local match with a fixed map, mode, bot count and difficulty.
3. Define a resettable objective and record screenshots, input timing and match results.

**Primary evidence**

- [Official source](https://github.com/redeclipse/base)
- [Steam release and supported systems](https://store.steampowered.com/app/967460/Red_Eclipse/)
- [Code and content licensing](https://github.com/redeclipse/base/blob/master/doc/license.txt)

### Zero-K

An RTS for resource planning, construction, unit control, terrain interaction and multi-unit tactical decisions, with editable Lua game logic.

**Stack / format:** Lua game logic / Spring-derived RTS engine / large-scale strategy

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 3D

[Free Steam game](https://store.steampowered.com/app/334920/ZeroK/) — Free Steam game. Engine, launcher, game modules, maps and other data are separate parts of the playable installation.

[Project / source record](https://github.com/ZeroK-RTS/Zero-K) · [License / terms](https://github.com/ZeroK-RTS/Zero-K)

- **License group:** Mixed code / asset licenses
- **Code:** The game-module repository declares GPLv2; individual files and separately acquired engine, launcher and tools need their own license checks.
- **Assets / data:** Mixed licenses across models, textures, sound and maps; the game-logic repository is not a blanket asset license.
- **AI use:** Useful for code instrumentation and RTS planning, but preserve module and asset provenance. A public game-module repository does not establish a single license for the complete installed game.
- **Practical limits:** Not installed or run in this research pass. This is a larger multi-component setup; cloning the Lua game repository alone does not produce the complete playable game.

**Suggested test tasks**

- Reach a construction or economy target from a fixed map and starting position.
- Evaluate unit selection, pathing and tactical resource use against a fixed local opponent.
- Modify a small Lua unit or game rule and verify the scenario and saved/replayed behavior.

**Get started**

1. Install a complete free release before isolating a module-level development task.
2. Pin the engine, game version, map and local AI configuration.
3. Use a small custom scenario and a fixed time budget rather than an uncontrolled online match.

**Primary evidence**

- [Game modules and source notices](https://github.com/ZeroK-RTS/Zero-K)
- [Pinned game-module GPLv2 license](https://github.com/ZeroK-RTS/Zero-K/blob/e358dac2ca2f9163c5290f700d74466016305b04/LICENSE)
- [Steam release](https://store.steampowered.com/app/334920/ZeroK/)
- [Official project and development entry](https://zero-k.info/)

### Unity BoatAttack

A complete boat-racing sample for buoyancy, waypoint AI, camera control, water rendering, shaders and asset-loading regression tests.

**Stack / format:** Unity / C# / Universal Render Pipeline

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 3D

[Get Unity sample source](https://github.com/Unity-Technologies/BoatAttack) — Free sample source with Git LFS content. Its documented project version is Unity 2020.3.23f1; engine licensing and installation are separate.

[Project / source record](https://github.com/Unity-Technologies/BoatAttack) · [License / terms](https://github.com/Unity-Technologies/BoatAttack/blob/master/LICENSE.md)

- **License group:** Engine-specific terms
- **Code:** Unity Companion License; this is an engine-specific sample, not a blanket MIT/GPL project.
- **Assets / data:** Unity Companion License and applicable bundled notices; do not treat sample assets as a general cross-engine asset library.
- **AI use:** Check the Unity Companion License and applicable Unity terms for the intended tool connection, asset handling and data use. Source availability does not establish unrestricted AI training or dataset redistribution rights.
- **Practical limits:** Not installed or run in this research pass. This older Unity baseline may need package/platform maintenance; upgrading the editor can change behavior and should be treated as a separate task.

**Suggested test tasks**

- Change buoyancy, steering or waypoint logic and complete a repeatable boat route.
- Migrate the pinned project to a newer editor and identify rendering or package regressions.
- Validate water, materials, camera output and asset loading before and after an edit.

**Get started**

1. Install Git LFS before cloning and retrieve the full large-file content.
2. Open a clean copy in Unity 2020.3.23f1, matching ProjectVersion.txt; resolve packages and build Addressables content before building a player.
3. Preserve the baseline and editor/package versions before making code changes or a separate migration copy.

**Primary evidence**

- [Official sample, version and license](https://github.com/Unity-Technologies/BoatAttack)
- [Pinned editor version](https://github.com/Unity-Technologies/BoatAttack/blob/6acf5f773a440030489cb5e2b3c009fb5fe1e8ce/ProjectSettings/ProjectVersion.txt)
- [Unity Companion License](https://unity.com/legal/licenses/unity-companion-license)
- [Git LFS setup](https://git-lfs.com/)

### Unreal Engine Lyra Starter Game

An official multiplayer starter game for ability systems, input, game-feature plugins, character animation and larger engine integration tasks.

**Stack / format:** Unreal Engine / C++ / Blueprint / Gameplay Ability System

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 3D

[Get free Lyra sample](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en) — Free source-included sample through Epic/Fab, subject to account, Unreal Engine and content terms. The listing identifies it as UE-Only.

[Project / source record](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine) · [License / terms](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)

- **License group:** Engine-specific terms
- **Code:** Unreal Engine sample and engine terms; source-included does not mean an OSI open-source license.
- **Assets / data:** UE-Only content under applicable Epic terms. The reviewed Fab listing displays Allows usage with AI: No.
- **AI use:** The Fab AI field requires a separate check for the intended asset/data workflow. It should not be expanded into a claim that every coding assistant edit is prohibited, or ignored as blanket permission for AI evaluation or training.
- **Practical limits:** Not installed or run in this research pass. A comparatively heavy setup with engine-specific content and AI-use conditions; it is not part of the unrestricted open-license starter set.

**Suggested test tasks**

- Modify a small ability or input behavior and validate it in a bounded match.
- Change a game-feature plugin and verify activation, character setup and multiplayer behavior.
- Test a permitted character animation/import task and inspect skeleton mapping and runtime playback.

**Get started**

1. Review the intended use against the listing and applicable Epic terms before selecting Lyra as an AI data fixture.
2. Acquire the sample through Epic/Fab and create a project compatible with the selected Unreal Engine version.
3. Pin the engine, plugins, map and match configuration; use a small local task before multiplayer tests.

**Primary evidence**

- [Official Lyra documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/lyra-sample-game-in-unreal-engine)
- [Fab access and content fields](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0?lang=en)
- [Unreal Engine EULA](https://www.unrealengine.com/en-US/eula/unreal)

### Bevy official examples

The official runnable example set shipped with the engine, useful as a small versioned baseline for ECS, rendering, asset import and animation regressions.

**Stack / format:** Rust · Bevy ECS · official examples for 2D, 3D, UI, animation, audio and glTF

**Type:** Games & engine projects · **Goals:** Coding & automated playtests; Asset & animation pipelines · **Dimensions:** 2D / 3D

[Browse runnable examples](https://bevyengine.org/examples/) — Supported examples run directly in the browser through WASM and WebGL2, with a separate WebGPU example browser. Running or modifying the source locally requires a matching repository checkout and Rust toolchain.

[Project / source record](https://github.com/bevyengine/bevy) · [License / terms](https://github.com/bevyengine/bevy/blob/main/LICENSE-APACHE)

- **License group:** Mixed code / asset licenses
- **Code:** MIT or Apache-2.0 at your option for the engine source.
- **Assets / data:** Assets bundled under examples/ carry separate licenses listed in CREDITS.md; they are not distributed in the published crates.
- **AI use:** Pin a release tag before using an example as a baseline. The engine ships breaking releases on a regular cadence, and example assets are governed by their own licenses rather than the engine dual license.
- **Practical limits:** The hosted examples are a subset of the repository and depend on browser graphics support; they are not a pinned local baseline. Bevy has breaking API releases, so record a release tag and matching Rust toolchain for local regression work. Example assets have separate licenses in CREDITS.md. Source and browser-entry documentation reviewed, not built or run locally.

**Suggested test tasks**

- Run one 2D and one 3D example on a pinned tag and compare frame output, asset loading and console warnings.
- Change a single ECS system or imported glTF asset and check that the example still starts and records the same scene state.

**Get started**

1. Check out a release tag rather than main, and install the Rust toolchain required by that release.
2. Run one example with cargo run --example breakout, then record the tag, toolchain, adapter and asset licenses from CREDITS.md.

**Primary evidence**

- [Official example browser](https://bevyengine.org/examples/)
- [Official live WebGPU examples](https://bevy.org/examples-webgpu/)
- [Examples directory and coverage](https://github.com/bevyengine/bevy/tree/main/examples)
- [CREDITS.md with per-asset license notes](https://github.com/bevyengine/bevy/blob/main/CREDITS.md)

### MiniGrid / BabyAI

Small navigation and language-grounding tasks with keys, doors, objects and partial observations. A practical first baseline for repeatable planning tests.

**Stack / format:** Python · Gymnasium · discrete grid worlds

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free Python package](https://minigrid.farama.org/) — Install minigrid locally; no commercial game or model API is required.

[Project / source record](https://github.com/Farama-Foundation/Minigrid) · [License / terms](https://github.com/Farama-Foundation/Minigrid/blob/main/LICENSE)

- **License group:** Open-license sources
- **Code:** Apache-2.0 in the current repository.
- **Assets / data:** Use bundled procedural grid rendering; added images and datasets need their own provenance.
- **AI use:** Built for agent research. Preserve license notices; explicitly separate rendered pixels, symbolic observations and mission text in each evaluation.
- **Practical limits:** Source reviewed, not installed here. Windows is not officially supported; default compact observations are not ordinary RGB screenshots.

**Suggested test tasks**

- Compare seeded door-and-key success rates with a fixed action budget.
- Modify an environment rule, then check reset, observations and goal completion.
- Test BabyAI instructions while withholding hidden map state.

**Get started**

1. Create a Python 3.11+ environment on Linux or macOS and run pip install minigrid.
2. Import minigrid and gymnasium; create MiniGrid-Empty-8x8-v0 and call reset(seed=0).
3. Use RGBImgPartialObsWrapper for agent-view RGB; RGBImgObsWrapper reveals the full grid. Record the wrapper, mission-text access, actions, terminated and truncated separately.

**Primary evidence**

- [Installation and BabyAI tasks](https://github.com/Farama-Foundation/Minigrid#readme)
- [Observation wrappers](https://minigrid.farama.org/api/wrappers/)
- [Pinned RGB visibility and wrapper implementation](https://github.com/Farama-Foundation/Minigrid/blob/7f5853792ea7f04f75614661006d87fcf949f26d/minigrid/wrappers.py)

### Crafter

A compact survival world combining exploration, health, gathering, construction and crafting. Achievement progress exposes different strengths of a playing agent.

**Stack / format:** Python · Gym interface · pixel survival

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free package and playable GUI](https://github.com/danijar/crafter#play-yourself) — pip install crafter pygame; the GUI and evaluation environment run locally.

[Project / source record](https://github.com/danijar/crafter) · [License / terms](https://github.com/danijar/crafter/blob/main/LICENSE)

- **License group:** Open-license sources
- **Code:** MIT.
- **Assets / data:** Repository material under its MIT notice; track any replacement art separately.
- **AI use:** Designed for agent evaluation. For pixel-only tests, withhold info.semantic, inventory and player_pos from the policy; those expose structured state beyond the RGB observation. Keep published benchmark budgets separate from custom VLM protocols.
- **Practical limits:** Source reviewed, not run here. Classic Gym reset returns only an observation and step returns four values. reset has no seed argument; matching constructor seeds alone is insufficient unless episode/reset order also matches.

**Suggested test tasks**

- Measure survival and achievement success over held-out world seeds.
- Plan a resource-to-tool sequence with a fixed interaction budget.
- Change a recipe and verify that collection, crafting and achievement recording remain consistent.

**Get started**

1. Install crafter and pygame in an isolated Python environment.
2. Run python -m crafter.run_gui for manual controls, then use CrafterReward-v1 for automation.
3. Set the seed when constructing the environment and record the episode index; use crafter.Recorder with a nonempty output directory, save_stats=True and save_episode=True to retain completed-episode statistics and action trajectories.

**Primary evidence**

- [Observation, actions and recorder](https://github.com/danijar/crafter#interface)
- [Achievement-based evaluation](https://github.com/danijar/crafter#evaluation)
- [Pinned reset, seed and privileged info contract](https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/env.py)
- [Pinned completed-episode recorder contract](https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/recorder.py)

### Craftax

A survival and crafting environment with vectorized simulation. Useful for longer action dependencies and comparing pixel-based versus symbolic policies.

**Stack / format:** Python · JAX · gymnax-style API

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free Python package](https://github.com/MichaelTMatthews/Craftax#readme) — CPU JAX is installed by default; accelerator support needs the correct JAX build.

[Project / source record](https://github.com/MichaelTMatthews/Craftax) · [License / terms](https://github.com/MichaelTMatthews/Craftax/blob/main/LICENSE)

- **License group:** Open-license sources
- **Code:** MIT.
- **Assets / data:** Repository material under its MIT notice; added assets need separate records.
- **AI use:** Fix observation mode, PRNG keys, episode handling and package version. Version changes affect comparability: 1.5.0 fixes first-planted-plant growth, and 1.6.0 fixes Craftax-Classic death rewards.
- **Practical limits:** Source reviewed, not run here. JIT startup is slow. With auto_reset=True, a done step returns the next episode observation/state alongside the previous episode reward/done/info. With auto_reset=False, handle termination before stepping again.

**Suggested test tasks**

- Compare survival and crafting progress using identical seeded worlds.
- Separate image-only policies from symbolic-state policies.
- Modify a block or recipe, invalidate texture caches when necessary, and check reset behavior.

**Get started**

1. Run pip install craftax in an isolated Python environment.
2. Run play_craftax or play_craftax_classic for manual play.
3. Select Craftax-Pixels-v1 or Craftax-Symbolic-v1 explicitly; keep full Craftax and Craftax-Classic separate. Supply distinct JAX keys to reset and step, and record the auto_reset setting.

**Primary evidence**

- [Installation, API and reset caveats](https://github.com/MichaelTMatthews/Craftax#readme)
- [Game tutorial](https://github.com/MichaelTMatthews/Craftax/blob/main/tutorial.md)
- [Pinned auto-reset transition implementation](https://github.com/MichaelTMatthews/Craftax/blob/c3c2e0d038c4e641f9481320c158f457f30c28f3/craftax/environment_base/environment_bases.py)

### ViZDoom

First-person environments for aiming, navigation, combat and memory, with programmable actions and scenario controls. The perspective is 3D; the renderer uses Doom-style technology.

**Stack / format:** Python / C++ · Doom / ZDoom · Gymnasium

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 3D

[Free package with Freedoom assets](https://vizdoom.farama.org/) — pip install vizdoom; begin with a bundled scenario rather than a commercial Doom WAD.

[Project / source record](https://github.com/Farama-Foundation/ViZDoom) · [License / terms](https://github.com/Farama-Foundation/ViZDoom#license)

- **License group:** Mixed code / asset licenses
- **Code:** Original ViZDoom contributions are MIT; underlying ZDoom components have separate licenses.
- **Assets / data:** Freedoom is the default asset set. Original Doom / Doom II WADs are not supplied and require their own rights.
- **AI use:** Built for AI experiments; this does not grant rights to arbitrary WADs. Record which scenario, base assets and licenses an evaluation uses.
- **Practical limits:** Source reviewed, not run here. ViZDoom 1.3+ macOS wheels require Apple Silicon and macOS 14+; the documented Intel wheel route is 1.2.4. Wrapper timeout handling changed in 1.3.0, so pin the version and timeout option. WAD rights remain scenario-specific.

**Suggested test tasks**

- Evaluate aiming accuracy, navigation completion and survival at a fixed action frequency.
- Compare pixel-only control with privileged buffers explicitly marked as separate tracks.
- Edit a scenario and check spawn, objectives, rewards and termination.

**Get started**

1. Install vizdoom in a supported Python environment; check wheel support for your OS and architecture.
2. Start from the repository Python examples and a bundled basic scenario.
3. For the Gymnasium wrapper, fix config, buffers, button space and frame_skip; use reset(seed=...) and log terminated and truncated separately, including treat_episode_timeout_as_truncation.

**Primary evidence**

- [Package installation and examples](https://github.com/Farama-Foundation/ViZDoom#python-quick-start)
- [Freedoom, WADs and custom scenarios](https://vizdoom.farama.org/faq/)
- [Pinned Gymnasium timing, seed and timeout contract](https://github.com/Farama-Foundation/ViZDoom/blob/909e834264e42f136f59f80e72e95d8146f40e21/gymnasium_wrapper/base_gymnasium_env.py)

### NetHack Learning Environment

A demanding roguelike interface for exploration, inventory, tactical choices and long-term planning. Use the maintained NetHack-LE organization rather than the archived Facebook repository.

**Stack / format:** Python · C / C++ · Gymnasium · NetHack

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Free package and source](https://github.com/NetHack-LE/nle#installation) — Native compilation prerequisites may be needed; the repository includes interactive and random-agent scripts.

[Project / source record](https://github.com/NetHack-LE/nle) · [License / terms](https://github.com/NetHack-LE/nle/blob/main/LICENSE)

- **License group:** Open-license sources
- **Code:** NetHack General Public License; preserve notices and follow source/distribution obligations.
- **Assets / data:** Bundled NetHack data follows repository notices; external tilesets are separate.
- **AI use:** An AI research interface; distinguish terminal rendering, symbols, text messages and internal state so planning results remain comparable.
- **Practical limits:** Source reviewed, not run here. Native tools may be required. In the inspected code, reset(seed=...) seeds Gymnasium but does not set NetHack RNGs; use the explicit seed interface. NetHackChallenge deliberately disallows seed changes. Terminal/glyph observations are not RGB game frames.

**Suggested test tasks**

- Measure staircase or score-task progress with a fixed turn budget.
- Test inventory decisions and recovery after invalid actions.
- Modify a task reward or termination rule and replay baseline rollouts.

**Get started**

1. Prepare Python 3.10+, CMake 3.28+ and the platform build prerequisites documented upstream.
2. Install nle, then run python -m nle.scripts.play --mode random.
3. Create NetHackScore-v0 with fixed observation_keys, actions and fix_moon_phase=True; before reset, call env.unwrapped.seed with recorded core, disp, reseed=False and optional lgen values.

**Primary evidence**

- [Maintained source, installation and play scripts](https://github.com/NetHack-LE/nle#readme)
- [Archived upstream repository](https://github.com/facebookresearch/nle)
- [Pinned observation, seed and reset implementation](https://github.com/NetHack-LE/nle/blob/2319f2989f0035685017e9ea13c83b2546fe477c/nle/env/base.py)

### Godot RL Agents

Connects editable Godot games to Python agents. Useful for changing gameplay, exposing observations and evaluating NPC control in a scene you own.

**Stack / format:** Godot 4 · Python · game sensors and action bridge

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 2D / 3D

[Free toolkit and example projects](https://github.com/edbeeching/godot_rl_agents#quickstart-guide) — Install godot-rl and import an example; editor operation avoids needing a prebuilt game binary.

[Project / source record](https://github.com/edbeeching/godot_rl_agents) · [License / terms](https://github.com/edbeeching/godot_rl_agents/blob/main/LICENSE)

- **License group:** Mixed code / asset licenses
- **Code:** MIT for Godot RL Agents; Godot is also MIT.
- **Assets / data:** Example assets can have separate notices: the Cartoon Plane model is CC BY 4.0.
- **AI use:** Designed for learning and automated gameplay testing. Keep imported-model rights and example attributions alongside the MIT toolkit license.
- **Practical limits:** Source reviewed, not run here. The inspected bridge sends env_seed when launching a binary, but reset(seed=...) sends only a reset message. Editor runs need scene/plugin seed control; validate reset repeatability rather than assuming the Python argument reseeds Godot.

**Suggested test tasks**

- Change movement or reward logic, establish reset/replay repeatability for that scene, then compare fixed input rollouts.
- Test sensors, action scaling and Python-to-game synchronization.
- Replace a character or collider and verify that observations and control still work.

**Get started**

1. Install godot-rl in a Python environment and download a documented example such as JumperHard.
2. Use the matching Godot 4 .NET editor for the documented editor example; import the project.
3. Run the repository Stable Baselines 3 example, or adapt its environment interface to a fixed policy.

**Primary evidence**

- [Editor and exported-game workflow](https://github.com/edbeeching/godot_rl_agents#quickstart-guide)
- [Example asset attribution](https://github.com/edbeeching/godot_rl_agents#license)
- [Pinned binary-launch and reset seed behavior](https://github.com/edbeeching/godot_rl_agents/blob/207b6f476f5846f33d08b92c7a350147e7b78bf5/godot_rl/core/godot_env.py)

### Unity ML-Agents

An official toolkit and example scenes for physics, visual control, cooperation and competition. It can expose custom Unity scenes to Python policies and automated tests.

**Stack / format:** Unity · C# · Python · sensors and agent actions

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning; Asset & animation pipelines · **Dimensions:** 2D / 3D

[Free toolkit; Unity editor required](https://github.com/Unity-Technologies/ml-agents/releases) — Choose one release and match its Unity package, Python packages and supported editor version.

[Project / source record](https://github.com/Unity-Technologies/ml-agents) · [License / terms](https://github.com/Unity-Technologies/ml-agents/blob/develop/LICENSE.md)

- **License group:** Engine-specific terms
- **Code:** Apache-2.0 for the toolkit, with third-party notices.
- **Assets / data:** Check bundled notices and any added scene assets. The Unity editor and external store assets have separate terms.
- **AI use:** The toolkit supports agent research and automated testing; its Apache license does not replace editor or third-party asset terms.
- **Practical limits:** Source reviewed, not run here. Editor eligibility, platform builds and version compatibility need local checks. The develop branch is not a stable evaluation baseline.

**Suggested test tasks**

- Compare physics-task success with fixed observations, decisions and reset rules.
- Change a C# agent or scene and verify sensors, rewards and episode termination.
- Import a replacement rig or collider and check control stability and visual observations.

**Get started**

1. Select a release tag, install its supported Unity editor and open the included Project.
2. Install the matching com.unity.ml-agents package and Python environment package versions.
3. Open an example scene and connect a policy; route actions by behavior and agent_id, and read both DecisionSteps and TerminalSteps. Python step advances to the next decision, not necessarily one physics frame.

**Primary evidence**

- [Official toolkit and release compatibility](https://github.com/Unity-Technologies/ml-agents#readme)
- [Release 23 low-level decision and terminal contract](https://github.com/Unity-Technologies/ml-agents/blob/a2777719560e4676be99e2ea128c5eb1fbeb3dbb/com.unity.ml-agents/Documentation~/Python-LLAPI.md)
- [Third-party notices](https://github.com/Unity-Technologies/ml-agents/blob/develop/Third%20Party%20Notices.md)
- [Unity editor terms](https://unity.com/legal/editor-terms-of-service/software)

### Arcade Learning Environment (ALE)

The standard Atari 2600 evaluation interface for more than 100 games, with native Gymnasium support, score and terminal signals, and seeded evaluation protocols.

**Stack / format:** C++ / Python · Stella Atari 2600 emulator · Gymnasium API

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Official documentation and install guide](https://ale.farama.org/) — Install ale-py from PyPI; the pip package bundles Atari ROMs and the project also offers a WebAssembly build.

[Project / source record](https://github.com/Farama-Foundation/Arcade-Learning-Environment) · [License / terms](https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md)

- **License group:** Mixed code / asset licenses
- **Code:** GPL-2.0 for the ALE framework.
- **Assets / data:** Atari ROMs are bundled in the pip package; their rights are separate from the framework license and need independent review before redistribution.
- **AI use:** Fix the game, mode, difficulty, frame skip, repeat-action probability and seed before comparing agents; report the observation source (pixels or RAM) separately. Bundled ROM availability is not a license grant for redistributing a dataset.
- **Practical limits:** GPL-2.0 applies to the framework, while Atari ROMs are third-party game assets bundled in the pip package and require separate rights review for redistribution. Source reviewed, not installed here; no Atari evaluation was run locally.

**Suggested test tasks**

- Compare seeded scores for one game with sticky actions enabled and disabled under the same action budget.
- Record whether an agent uses RGB pixels or RAM state and check reset, truncation and life-loss signals.
- Replay a fixed action sequence and assert identical scores across runs and dependency versions.

**Get started**

1. Create a Python environment, install ale-py and Gymnasium, and list the available ROM ids.
2. Create an Atari environment with a fixed mode, difficulty, frame skip, repeat_action_probability and seed.
3. Log score, terminated and truncated per episode; retain the ale-py version and ROM inventory.

**Primary evidence**

- [Features, Gymnasium support and bundled ROMs](https://github.com/Farama-Foundation/Arcade-Learning-Environment#readme)
- [Environment list and evaluation protocols](https://ale.farama.org/environments/)
- [GPL-2.0 license text](https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md)

### Procgen Benchmark

Sixteen fast procedurally generated environments designed to measure how quickly an agent learns skills that generalize to unseen levels.

**Stack / format:** Python · Gym API · 16 procedurally generated game-like environments

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Install the Python package](https://github.com/openai/procgen#readme) — Install procgen from the repository; the environments run at thousands of steps per second on a single CPU core.

[Project / source record](https://github.com/openai/procgen) · [License / terms](https://github.com/openai/procgen/blob/master/LICENSE)

- **License group:** Open-license sources
- **Code:** MIT.
- **Assets / data:** Procedurally generated rendering; no bundled third-party game art is required for the standard environments.
- **AI use:** Separate train and test level distributions and fix the package version, wrapper, level selection, seed settings and distribution mode before comparing agents. Record the action sequence and episode boundaries; fast step rates do not remove the need to report wall-clock and sample budgets.
- **Practical limits:** The native interface exposes a discrete action space without an action_masks field. Any added mask or Gymnasium adaptation belongs to a separately documented wrapper. Identical seeds do not guarantee identical trajectories across dependency upgrades. The repository is in maintenance mode; CoinRun differs from its original standalone release, and the standard wrapper needs a compatible Gym version. Source reviewed, not installed or run locally.

**Suggested test tasks**

- Compare an agent trained on a small level set against one trained on the full distribution, evaluated on held-out seeds.
- Within one pinned version and wrapper, replay recorded actions from the same initial state and seed settings; compare observations, rewards and episode boundaries.
- Measure steps per second for one environment and record the hardware and thread count.

**Get started**

1. Create a Python environment and pin procgen, its native Gym or Gym3 interface, and any additional wrapper dependencies.
2. Fix num_envs, num_levels, start_level, rand_seed, distribution_mode and thread count; retain the initial state or reset/episode order and a recorded action sequence.
3. Log observations, rewards and episode boundaries using the chosen interface; document any wrapper that converts these into terminated and truncated signals.

**Primary evidence**

- [README with environment list and speed claims](https://github.com/openai/procgen#readme)
- [Native action space, seed options and state interface](https://github.com/openai/procgen/blob/master/procgen/env.py)
- [Benchmark paper](https://arxiv.org/abs/1912.01588)
- [MIT license text](https://github.com/openai/procgen/blob/master/LICENSE)

### Google Research Football

A research football environment with configurable scenarios, multi-agent play, multiple observation formats and a built-in game engine.

**Stack / format:** C++ game engine · Python Gym API · multi-agent football scenarios

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 3D

[Installation and scenario guide](https://github.com/google-research/football#readme) — Installable from PyPI or built from source; the repository also links a Colab notebook using prebuilt binaries.

[Project / source record](https://github.com/google-research/football) · [License / terms](https://github.com/google-research/football/blob/master/LICENSE)

- **License group:** Open-license sources
- **Code:** Apache-2.0.
- **Assets / data:** Based on the open-source Gameplay Football project; check bundled assets and any separately downloaded engine components.
- **AI use:** Fix the scenario, number of controlled players, observation representation, action set, seed and episode length before comparing policies. A prebuilt binary is a convenience, not a reproducibility guarantee.
- **Practical limits:** The GitHub repository is archived, with its last push in June 2025, so no further maintenance should be assumed. Installation depends on platform-specific binaries or a source build, and the underlying Gameplay Football assets have their own provenance. Source reviewed, not installed or run locally.

**Suggested test tasks**

- Compare the same policy using pixels, the compact vector representation and the full state representation.
- Run a fixed scenario with a fixed seed on two package versions and check score and episode length.
- Check multi-agent scenarios for role assignment and desynchronization after a reset.

**Get started**

1. Install a release from PyPI or build from source, then verify the engine binary and Python version.
2. Create one scenario with a fixed seed, record the observation shape and action set, and run a short baseline episode.

**Primary evidence**

- [README with installation, scenarios and representations](https://github.com/google-research/football#readme)
- [Benchmark paper](https://arxiv.org/abs/1907.11180)
- [Apache-2.0 license text](https://github.com/google-research/football/blob/master/LICENSE)

### Overcooked-AI

A cooperative two-agent cooking benchmark with handcrafted and procedurally generated layouts, used for coordination and human-AI collaboration studies.

**Stack / format:** Python · Gym-style API · cooperative two-agent layouts

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Installation and layout guide](https://github.com/HumanCompatibleAI/overcooked_ai#readme) — Install the overcooked-ai Python package; layouts and planning baselines ship with the package.

[Project / source record](https://github.com/HumanCompatibleAI/overcooked_ai) · [License / terms](https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE)

- **License group:** Open-license sources
- **Code:** MIT.
- **Assets / data:** Repository code and layout definitions under MIT; human study data linked from the README is separate.
- **AI use:** Fix a layout, horizon, partner policy and seed. Score alone hides coordination failures, so record joint actions, collisions and idle steps separately.
- **Practical limits:** The last repository push was in March 2025 and the README points to separate human-study datasets with their own terms. Layout names and the legacy Gym API need pinning. Source reviewed, not installed or run locally.

**Suggested test tasks**

- Compare a self-play pair with a fixed heuristic partner on one layout and report score plus collision counts.
- Replay a fixed joint-action sequence and assert identical state transitions after a reset.
- Check that a generated layout is reproducible from its recorded seed.

**Get started**

1. Install overcooked-ai in a Python environment and list the available layouts.
2. Create a two-agent environment with a named layout, fixed horizon and seed, then log joint observations and rewards.

**Primary evidence**

- [README with layouts and installation](https://github.com/HumanCompatibleAI/overcooked_ai#readme)
- [Benchmark paper](https://arxiv.org/abs/1910.05789)
- [MIT license text](https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE)

### MuJoCo

A deterministic contact dynamics engine with a Python interface, useful as a physics and determinism baseline for simulated characters and objects.

**Stack / format:** C/C++ physics engine · MJCF / URDF models · Python bindings

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Asset & animation pipelines · **Dimensions:** 3D

[Official documentation](https://mujoco.readthedocs.io/en/stable/overview.html) — Installable as the mujoco Python package; no separate licence key is required since the project was open sourced.

[Project / source record](https://github.com/google-deepmind/mujoco) · [License / terms](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)

- **License group:** Open-license sources
- **Code:** Apache-2.0.
- **Assets / data:** MJCF models and meshes included with the project need their own provenance check; user-supplied models remain separate.
- **AI use:** Use a controlled MJCF model, fixed timestep and solver settings for a physics regression; record the engine version because contact behaviour can change between releases. MuJoCo is a physics simulator, not a game or a playing benchmark.
- **Practical limits:** MuJoCo targets robotics and biomechanics rather than gameplay; game-specific relevance must be established per test. Bundled models and meshes have separate provenance. Source reviewed, not built or run locally.

**Suggested test tasks**

- Replay a fixed control sequence on one model and compare final body positions across engine versions.
- Import the same rig as MJCF and URDF and compare joint limits, mass properties and contact behaviour.

**Get started**

1. Pin the mujoco release, load one MJCF model and record timestep, integrator and solver settings.
2. Step the simulation with a fixed control sequence and log positions, velocities and contacts.

**Primary evidence**

- [README with installation and bindings](https://github.com/google-deepmind/mujoco#readme)
- [Official documentation overview](https://mujoco.readthedocs.io/en/stable/overview.html)
- [Apache-2.0 license text](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)

### Gymnasium classic control

Small deterministic control environments with fully documented state equations, a lightweight baseline for reset, seeding and episode-termination regressions.

**Stack / format:** Python · Gymnasium API · CartPole, Pendulum, MountainCar and Acrobot

**Type:** AI evaluation environments · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D

[Classic control environment docs](https://gymnasium.farama.org/environments/classic_control/) — These environments need no external game binary, ROM or model download.

[Project / source record](https://github.com/Farama-Foundation/Gymnasium) · [License / terms](https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE)

- **License group:** Open-license sources
- **Code:** MIT.
- **Assets / data:** Procedural rendering only; no bundled third-party game assets are needed for these environments.
- **AI use:** Fix the environment id, seed, render mode and Gymnasium version. These toy tasks can validate an agent pipeline but must not be reported as game-playing evidence.
- **Practical limits:** Classic control tasks are toy control problems, not games. They are included only as a deterministic pipeline check; no environment was installed or run locally in this review.

**Suggested test tasks**

- Reset two environments with the same seed and assert identical initial observations and termination limits.
- Change a wrapper or action-mapping layer and verify the step, terminated and truncated contract still holds.

**Get started**

1. Install a pinned gymnasium release and create one classic control environment with a fixed seed.
2. Record observation bounds, action space, termination condition and the exact version string.

**Primary evidence**

- [Classic control environment reference](https://gymnasium.farama.org/environments/classic_control/)
- [Gymnasium README and API scope](https://github.com/Farama-Foundation/Gymnasium#readme)
- [MIT license text](https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE)

### Kenney

A practical CC0 starting point for small test scenes, asset replacement, collision and UI regressions.

**Stack / format:** Sprites, tiles, UI, audio and 3D model packs

**Type:** Asset libraries · **Goals:** Coding & automated playtests; Asset & animation pipelines · **Dimensions:** 2D / 3D

[Browse free asset packs](https://kenney.nl/assets) — Individual asset packs are free; optional bundles and tools are separate products.

[Project / source record](https://kenney.nl/assets) · [License / terms](https://kenney.nl/support)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC0 for the asset packs
- **AI use:** Use the CC0 pack files as the basis for a redistributable test fixture. This does not make the website, branding or separately sold software CC0.
- **Practical limits:** Not every pack contains animation or a humanoid rig. No pack was imported locally in this review.

**Suggested test tasks**

- Replace a sprite or model and check scale, collision and material references.
- Run a fixed UI or tilemap scene and compare screenshots.

**Get started**

1. Choose one small pack and retain its included license file.
2. Import the pack into a versioned test project and record the import settings.

**Primary evidence**

- [Creator licensing FAQ](https://kenney.nl/support)

### Quaternius

CC0 models and characters for repeatable import, material, collision and animation tests.

**Stack / format:** Low-poly environments, characters and animated model packs

**Type:** Asset libraries · **Goals:** Coding & automated playtests; Asset & animation pipelines · **Dimensions:** 3D

[Browse creator packs](https://quaternius.com/) — Check the exact pack: free Standard downloads and paid Pro or Source editions can contain different files.

[Project / source record](https://quaternius.com/) · [License / terms](https://quaternius.com/)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC0 for creator-designated asset packs; check each download
- **AI use:** Base reuse on the CC0 designation of the downloaded files. A free edition does not establish entitlement to paid source files or unrelated marketplace content.
- **Practical limits:** Pack formats and included rigs vary; Standard is not necessarily the complete collection. The cited Universal Animation Library changelog records Unreal FBX-to-GLB export and rig-name changes in v2.0, a 24-to-30 fps correction in v2.1, and root-motion plus step-phase changes in v3.0; pin the release and root-motion variant for comparable tests. No local import was performed.

**Suggested test tasks**

- Import the same model into two engines and compare scale, shading and collision.
- Replace a character while preserving animation and scene references.

**Get started**

1. Select an explicitly CC0 pack and save its edition and release details.
2. Keep the original archive beside the engine import settings.

**Primary evidence**

- [Creator asset catalog and licensing](https://quaternius.com/)
- [Example pack and edition details](https://quaternius.itch.io/universal-animation-library)

### Poly Haven

CC0 realistic assets for material, lighting, dependency and visual-domain regression tests.

**Stack / format:** PBR textures, HDRIs, 3D models and a public download API

**Type:** Asset libraries · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Browse CC0 assets](https://polyhaven.com/all) — Free downloads; the API has been free for personal, academic and commercial use since July 18, 2026.

[Project / source record](https://polyhaven.com/) · [License / terms](https://polyhaven.com/license)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC0 for downloadable assets; live API service has separate conditions
- **AI use:** The official API page explicitly includes AI/ML datasets among supported uses. Live API products must identify Poly Haven as the asset source and requests need a unique User-Agent; those conditions are separate from CC0.
- **Practical limits:** Website copy and example renders are outside the CC0 asset grant. API availability is best effort; no local import was performed.

**Suggested test tasks**

- Check texture dependencies, normal orientation and physical scale after import.
- Compare a fixed scene under different HDRIs or material resolutions.

**Get started**

1. Choose a small model, texture set or HDRI at a controlled resolution.
2. For API integration, retain file hashes and follow the source-credit and User-Agent conditions.

**Primary evidence**

- [Asset license](https://polyhaven.com/license)
- [Current API terms and endpoints](https://polyhaven.com/our-api)

### ambientCG

A CC0 source for texture-channel, terrain, lighting and material-resolution test fixtures.

**Stack / format:** PBR materials, decals, atlases, HDRIs, terrain and models

**Type:** Asset libraries · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Browse downloadable assets](https://ambientcg.com/list) — Public asset downloads are free; optional support services are separate.

[Project / source record](https://ambientcg.com/) · [License / terms](https://docs.ambientcg.com/license/)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC0 for downloadable assets
- **AI use:** Use the asset CC0 grant rather than the zero price as the basis for reuse. Keep service access conditions and any unrelated third-party content separate.
- **Practical limits:** Asset formats and available maps vary. This review did not download or import a test material.

**Suggested test tasks**

- Verify roughness, metallic, displacement and normal maps use the correct channels.
- Measure memory and visual changes across texture resolutions.

**Get started**

1. Download one asset at a fixed resolution and retain its identifier.
2. Document color-space, normal-map and material import settings.

**Primary evidence**

- [Official asset license](https://docs.ambientcg.com/license/)
- [Asset catalog](https://ambientcg.com/list)

### OpenGameArt

Broad community coverage for 2D content tests, with licensing recorded separately for every item.

**Stack / format:** Community sprites, tiles, models, music and sound effects

**Type:** Asset libraries · **Goals:** Coding & automated playtests; Asset & animation pipelines · **Dimensions:** 2D / 3D

[Browse community assets](https://opengameart.org/) — Download from the individual entry and preserve the author, license and attribution instructions.

[Project / source record](https://opengameart.org/) · [License / terms](https://opengameart.org/content/faq)

- **License group:** Mixed code / asset licenses
- **Code:** Not a software project
- **Assets / data:** Per-entry licenses, including CC0, CC-BY, CC-BY-SA and GPL variants
- **AI use:** There is no catalog-wide AI authorization. Select files under a suitable license and assess their attribution, share-alike and any additional rights before publishing a dataset.
- **Practical limits:** Free downloads have different licenses and asset quality. The FAQ says preview images and audio can have different rights from downloadable assets; do not treat those previews as licensed test-fixture files unless explicitly covered. No individual asset was locally imported or cleared as part of this catalog review.

**Suggested test tasks**

- Import a tilemap and validate tile sizes, transparency and collision alignment.
- Generate an attribution manifest from the exact selected entries.

**Get started**

1. Filter by the license required for the intended test and distribution.
2. Archive the selected entry URL, author, license text and original files.

**Primary evidence**

- [License and attribution FAQ](https://opengameart.org/content/faq)

### Fab

Useful import test content when the exact listing, license and AI-use fields fit the intended task.

**Stack / format:** Marketplace models, materials, animation and engine-specific content

**Type:** Asset libraries · **Goals:** Asset & animation pipelines · **Dimensions:** 2D / 3D

[Browse marketplace listings](https://www.fab.com/) — Free and paid listings coexist; account access and engine compatibility depend on the item.

[Project / source record](https://www.fab.com/) · [License / terms](https://www.fab.com/eula)

- **License group:** Permission needs confirmation
- **Code:** Not a software project
- **Assets / data:** Listing-specific: Fab Standard, CC-BY or other stated terms; some content is UE-Only
- **AI use:** Check the listing license and AI-use designation before testing with AI or sharing a dataset. A listing field is not a catalog-wide rule; free pricing is not an open license.
- **Practical limits:** The Standard license does not generally permit standalone asset redistribution. The official summary says Reference-Only access does not include source-format files, so confirm the acquired tier before planning export or import fixtures. Engine-specific content and individual terms require separate review; no local import was performed.

**Suggested test tasks**

- Validate dependencies, LODs and material import for one approved listing.
- Compare listed engine versions with the actual project import results.

**Get started**

1. Record the exact listing, acquired version, license and AI-use fields.
2. Import only after the intended automated use and distribution are covered.

**Primary evidence**

- [Fab Standard license summary and EULA](https://www.fab.com/eula)
- [Example UE-Only listing with AI-use field](https://www.fab.com/listings/93faede1-4434-47c0-85f1-bf27c0820ad0)

### Unity Asset Store

Package and import regression fixtures when provider rights and the permitted automation route are established.

**Stack / format:** Unity packages, characters, animation, environments and editor tools

**Type:** Asset libraries · **Goals:** Asset & animation pipelines · **Dimensions:** 2D / 3D

[Browse Asset Store packages](https://assetstore.unity.com/) — Free packages can require an account, compatible Unity version and package dependencies.

[Project / source record](https://assetstore.unity.com/) · [License / terms](https://unity.com/legal/as-terms)

- **License group:** Permission needs confirmation
- **Code:** Not a software project
- **Assets / data:** Asset Store EULA or stated restricted/third-party licenses
- **AI use:** Unity platform agent access and third-party asset authorization are separate checks. The Asset Store terms restrict AI/model-related use without express consent; permitted editor access does not grant asset training or dataset rights.
- **Practical limits:** Free is not open source. Restricted assets and third-party components may have different terms; no package was downloaded or imported.

**Suggested test tasks**

- Check package import, missing scripts and dependency changes in an approved project.
- Compare rig mappings and animation import settings across supported editor versions.

**Get started**

1. Record the package version, provider license and intended AI use.
2. Use a permitted Unity automation connection and obtain any required provider authorization.

**Primary evidence**

- [Asset Store terms and EULA](https://unity.com/legal/as-terms)
- [2026 terms update and agent access explanation](https://unity.com/legal)

### Khronos glTF Sample Assets

The official Khronos collection of glTF 2.0 models, including a dedicated Testing list built for exercising viewers, converters and importers.

**Stack / format:** glTF 2.0 / GLB reference and testing models with per-model license metadata

**Type:** Asset libraries · **Goals:** Coding & automated playtests; Asset & animation pipelines · **Dimensions:** 3D

[Browse the official asset lists](https://github.khronos.org/glTF-Assets/) — The browsable catalog exposes tagged model lists, previews and per-model license and credit information; the repository holds the downloadable files.

[Project / source record](https://github.com/KhronosGroup/glTF-Sample-Assets) · [License / terms](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md)

- **License group:** Mixed code / asset licenses
- **Code:** Repository text is licensed CC-BY-4.0; individual models carry their own license and attribution in each model README.
- **Assets / data:** Per-model licenses, commonly CC-BY 4.0 or CC0; check the README in the exact model directory before reuse.
- **AI use:** Use the tagged Testing models as a deterministic import and render fixture. The CC-BY grant on the repository text does not extend to every model, website branding or third-party showcase art; retain each model credit line.
- **Practical limits:** Licenses are per model, not per repository; several showcase assets require attribution and some assets were removed for unsuitable licensing. No model was downloaded or imported locally in this review.

**Suggested test tasks**

- Import the same Testing model into two engines and compare geometry, materials, texture orientation and scale.
- Run a fixed set of extension and core-only models through a converter and record which features are dropped.

**Get started**

1. Pin a repository commit and select a small set of models from the Testing and Core Only lists.
2. Copy the per-model README credit and license beside each downloaded .gltf/.glb and record import settings.

**Primary evidence**

- [Testing models for viewers and converters](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models-testing.md)
- [Complete model list with license summaries](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models.md)
- [Repository license and per-model credit rules](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/README.md)

### Khronos glTF Asset Generator

An official generator for glTF 2.0 importer test cases, with Positive and Negative output sets covering accessor, animation, material, mesh and texture requirements.

**Stack / format:** C# / .NET generator producing positive and negative glTF 2.0 conformance assets

**Type:** Asset libraries · **Goals:** Coding & automated playtests; Asset & animation pipelines · **Dimensions:** 3D

[Browse generated test assets](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Positive) — Pre-generated Positive and Negative models are committed under Output; the C# solution regenerates them.

[Project / source record](https://github.com/KhronosGroup/glTF-Asset-Generator) · [License / terms](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE)

- **License group:** Open-license sources
- **Code:** MIT for the generator source.
- **Assets / data:** Generated output assets are covered by the repository MIT license; still record the exact Output revision used.
- **AI use:** Define an expected result for each case from its documented properties, validator report and the glTF specification. The Negative directory is not a blanket instruction to reject an entire asset: without POSITION data, a client should skip rendering the affected primitive unless another mechanism supplies positions. Keep validator findings separate from importer diagnostics and rendering behavior; a passing case does not prove full glTF conformance.
- **Practical limits:** Coverage is a work in progress and the README states more requirements are coming. The C# project targets a Visual Studio / .NET workflow; no generator was built or run locally in this review.

**Suggested test tasks**

- Load selected Positive cases and compare supported geometry, materials and animation with their documented expectations; record unsupported features and diagnostics separately.
- For each Negative case, compare the observed result with its documented expected handling, including a skipped primitive where appropriate, and check that malformed input does not crash the importer.

**Get started**

1. Pin a repository commit and copy the Output/Positive and Output/Negative directories into a versioned fixture.
2. Record the importer and validator versions, supported extensions and a per-case expectation; capture the validation report, importer diagnostics and rendered result rather than requiring every Negative asset to fail.

**Primary evidence**

- [Project scope and supported requirements](https://github.com/KhronosGroup/glTF-Asset-Generator#readme)
- [Negative test output](https://github.com/KhronosGroup/glTF-Asset-Generator/tree/main/Output/Negative)
- [Mesh_NoPosition cases and attribute table](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/Output/Negative/Mesh_NoPosition/README.md)
- [glTF specification: using primitive data](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#using-primitive-data)
- [MIT license text](https://github.com/KhronosGroup/glTF-Asset-Generator/blob/main/LICENSE)

### Kenney Animated Characters

Small CC0 characters for first-pass skinning, animation playback and import regression checks.

**Stack / format:** Stylized rigged character and animation asset packs

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Download character pack](https://kenney.nl/assets/animated-characters-protagonists) — Free creator download; inspect the archive for the available models and formats.

[Project / source record](https://kenney.nl/assets/animated-characters-protagonists) · [License / terms](https://kenney.nl/support)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC0
- **AI use:** The pack asset files use CC0. Preserve provenance in the test fixture and do not extend the grant to site media or separately licensed tools.
- **Practical limits:** Simplified characters should not be assumed to have a complete standard humanoid skeleton. No local import or retarget test was performed.

**Suggested test tasks**

- Check skinning, animation playback and bounds after import.
- Compare character scale and collision against a fixed scene.

**Get started**

1. Keep the original archive and included license.
2. Inspect the actual bone hierarchy before setting a humanoid mapping.

**Primary evidence**

- [Character pack](https://kenney.nl/assets/animated-characters-protagonists)
- [CC0 licensing FAQ](https://kenney.nl/support)

### Quaternius Universal Animation Library

A practical CC0 baseline for humanoid retargeting, locomotion blending and root-motion tests.

**Stack / format:** Humanoid rig, engine exports, root-motion and in-place clips

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Get the free Standard edition](https://quaternius.itch.io/universal-animation-library) — Standard is a free subset. Pro contains more clips; Source adds the Blender source and is paid.

[Project / source record](https://quaternius.itch.io/universal-animation-library) · [License / terms](https://quaternius.itch.io/universal-animation-library)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC0; available files depend on the acquired edition
- **AI use:** Use the CC0 grant for the files in the downloaded edition. Free Standard access does not include every advertised clip or the paid Blender source.
- **Practical limits:** The current creator page notes Unreal GLB imports require a version above 5. No local playback or retargeting was performed.

**Suggested test tasks**

- Retarget locomotion onto a second CC0 character and measure foot sliding.
- Compare root-motion and in-place travel, blending and loop seams.

**Get started**

1. Record the edition and release; rig names and frame rates changed between versions.
2. Choose the engine export and check its import requirements before retargeting.

**Primary evidence**

- [Rig, license, formats and changelog](https://quaternius.itch.io/universal-animation-library)
- [Standard / Pro / Source download tiers](https://quaternius.itch.io/universal-animation-library/purchase)

### 100STYLE

Styled locomotion data for motion matching, gait diversity and cross-skeleton retargeting.

**Stack / format:** BVH motion capture, 28-bone skeleton, 60 fps

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Get the original motion data](https://www.ianxmason.com/100style/) — Download the original BVH data; a skinned character is a separate asset.

[Project / source record](https://www.ianxmason.com/100style/) · [License / terms](https://www.ianxmason.com/100style/)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC BY 4.0 for original motion data; Geno.fbx in a separate retarget repository is non-commercial research only
- **AI use:** Original motion is CC BY 4.0 and requires attribution. Use an independently licensed character; the Geno mesh restriction is not removed by the motion license.
- **Practical limits:** All 100 styles were captured from the same actor, so held-out styles do not test generalization to unseen performers. BVH motion is not a ready-skinned game character. The Geno mesh is not included in the open recommendation; no local retargeting was performed.

**Suggested test tasks**

- Retarget contrasting walking styles and compare foot contacts and joint limits.
- Build a motion-matching fixture with held-out styles.

**Get started**

1. Save the original dataset citation and license with the BVH files.
2. Record frame rate, source skeleton and coordinate conversion before processing.

**Primary evidence**

- [Original dataset and license](https://www.ianxmason.com/100style/)
- [Retargeted motion versus Geno mesh terms](https://github.com/orangeduck/100style-retarget)

### CMU Motion Capture Database

A broad motion source for skeleton parsing, coordinate conversion and control or retargeting research.

**Stack / format:** ASF skeletons and AMC motion files with subject-specific calibration

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Browse subjects and motions](https://mocap.cs.cmu.edu/) — Follow the site request to download only what is needed rather than mirror the whole database.

[Project / source record](https://mocap.cs.cmu.edu/) · [License / terms](https://mocap.cs.cmu.edu/)

- **License group:** Research / custom data terms
- **Code:** Not a software project
- **Assets / data:** Custom CMU use terms: research and commercial products allowed; raw or converted data may not be directly resold
- **AI use:** The site permits research and commercial products under its custom conditions. That is not CC0 or permission to directly resell the source/converted dataset; keep downstream dataset distribution separate.
- **Practical limits:** Different subjects have different calibrated skeletons; ASF/AMC needs conversion for many engines. No local parsing or import was performed.

**Suggested test tasks**

- Parse several subject skeletons and compare normalized units and joint transforms.
- Retarget locomotion and interaction clips onto a consistent test rig.

**Get started**

1. Download a subject skeleton with its matching motion files.
2. Retain subject and motion IDs, source terms and conversion settings.

**Primary evidence**

- [Official database use conditions](https://mocap.cs.cmu.edu/)

### LaFAN1

Research data and baselines for motion in-betweening, trajectory continuity and obstacle transitions.

**Stack / format:** Motion-capture BVH data and transition-evaluation code

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Open dataset repository](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) — Large dataset files use Git LFS; retain the repository evaluation split and documentation.

[Project / source record](https://github.com/ubisoft/ubisoft-laforge-animation-dataset) · [License / terms](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/master/license.txt)

- **License group:** Research / custom data terms
- **Code:** Not a software project (motion dataset); bundled baseline code needs a separate reuse check
- **Assets / data:** CC BY-NC-ND 4.0 for the motion dataset
- **AI use:** The license permits non-commercial adaptations but not sharing Adapted Material; necessary technical format changes are treated separately. Retain attribution and review any retargeted-data release; commercial AI test-service use is not covered.
- **Practical limits:** Not a generally redistributable commercial animation pack. No dataset download, baseline run or local import was performed.

**Suggested test tasks**

- Compare global quaternion loss (L2Q), normalized global position loss (L2P) and NPSS with the supplied baselines.
- Check contacts and root trajectories across in-betweened segments.

**Get started**

1. Review the data license against the intended research and distribution.
2. Fetch the required LFS files; preserve 30 fps and the subjects 1-4 training / subject 5 test split.

**Primary evidence**

- [Dataset terms and evaluation instructions](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/README.md)
- [Dataset license text](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/license.txt)
- [Performer split and evaluation setup](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/evaluate.py)
- [Transition metrics implementation](https://github.com/ubisoft/ubisoft-laforge-animation-dataset/blob/94084601bacdf9cc3764b5c73daaeccae6035fac/lafan1/benchmarks.py)

### AMASS

Research-scale human motion for pose pipelines and motion models in a common parameter space.

**Stack / format:** Multiple mocap collections unified as parametric human motion

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Review access and dataset terms](https://amass.is.tue.mpg.de/) — Registration and agreement to the dataset terms are required; model/tool access is separate.

[Project / source record](https://amass.is.tue.mpg.de/) · [License / terms](https://amass.is.tue.mpg.de/license.html)

- **License group:** Research / custom data terms
- **Code:** Not a software project
- **Assets / data:** Custom AMASS terms for specified non-commercial research uses; no redistribution
- **AI use:** The license restricts use to its stated purposes, prohibits redistribution and restricts commercial uses, including training for commercial purposes. Separate SMPL/model terms still apply.
- **Practical limits:** Not a direct engine-ready clip pack or a public test-dataset redistribution source. No registration, download or local conversion was performed.

**Suggested test tasks**

- Convert permitted motion parameters into a consistent joint representation.
- Compare root trajectories and skeleton mapping across source collections.

**Get started**

1. Register and confirm the intended research purpose is within the agreement.
2. Acquire any required body model separately and record both licenses.

**Primary evidence**

- [Dataset and representation](https://amass.is.tue.mpg.de/)
- [AMASS license](https://amass.is.tue.mpg.de/license.html)

### SMPL-Body

The CC BY body subset for testing human mesh, rig, skinning and pose interchange.

**Stack / format:** Fixed-shape human mesh, skeleton rig and pose/dynamic blendshapes

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Read the body subset license](https://smpl.is.tue.mpg.de/bodylicense.html) — Obtain a file actually covered by SMPL-Body; model downloads and generation tools have separate terms.

[Project / source record](https://smpl.is.tue.mpg.de/) · [License / terms](https://smpl.is.tue.mpg.de/bodylicense.html)

- **License group:** Open-license sources
- **Code:** Not a software project
- **Assets / data:** CC BY 4.0 for SMPL-Body, excluding shape blendshapes and the tools to create bodies from them
- **AI use:** Apply CC BY attribution to the covered body subset. It does not grant rights to the parametric model, generation tools or separately licensed AMASS motion.
- **Practical limits:** The body license excludes the shape-generating components. No body file was obtained or imported locally.

**Suggested test tasks**

- Validate mesh weights, joint transforms and coordinate conversion.
- Compare pose playback after export into a chosen engine format.

**Get started**

1. Confirm that the acquired artifact falls within the body-only definition.
2. Save attribution and keep any model or motion licenses alongside it.

**Primary evidence**

- [SMPL-Body scope and attribution](https://smpl.is.tue.mpg.de/bodylicense.html)
- [Separate SMPL-Model terms](https://smpl.is.tue.mpg.de/modellicense.html)

### SMPL-Model

A research representation for shape/pose conversion and human-to-game-skeleton pipelines.

**Stack / format:** Parametric human body model and shape-generation tools

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Review model access terms](https://smpl.is.tue.mpg.de/modellicense.html) — Model/tool access and commercial permissions are separate from the CC BY SMPL-Body subset.

[Project / source record](https://smpl.is.tue.mpg.de/) · [License / terms](https://smpl.is.tue.mpg.de/modellicense.html)

- **License group:** Research / custom data terms
- **Code:** Not a software project (model data); supplied tools use the separate SMPL-Model agreement
- **Assets / data:** Custom SMPL-Model terms for specified non-commercial uses; no redistribution; commercial licensing is separate
- **AI use:** The model agreement limits use to non-commercial scientific research, education or artistic projects, bars redistribution and training for commercial use, and is separate from the CC BY body subset and AMASS data terms.
- **Practical limits:** Not an unrestricted open-source game rig. No model download, tool execution or local import was performed.

**Suggested test tasks**

- Compare permitted pose and shape parameter conversion to game joints.
- Check topology and skinning consistency under permitted shape changes.

**Get started**

1. Register for download access, review the model/tool agreement and confirm the intended use.
2. Version the authorized model files and transformation code without publishing restricted inputs.

**Primary evidence**

- [Model license](https://smpl.is.tue.mpg.de/modellicense.html)
- [Body-only license comparison](https://smpl.is.tue.mpg.de/bodylicense.html)

### Mixamo

A common ordinary game-animation workflow whose AI testing permission needs separate confirmation.

**Stack / format:** Adobe online humanoid auto-rigging and animation service

**Type:** Rigs & motion data · **Goals:** Asset & animation pipelines · **Dimensions:** 3D

[Read service FAQ first](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) — Adobe ID is required. Ordinary game use does not establish AI evaluation or dataset rights.

[Project / source record](https://www.mixamo.com/) · [License / terms](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf)

- **License group:** Permission needs confirmation
- **Code:** Not a software project
- **Assets / data:** Adobe service/content terms; not an open asset license
- **AI use:** Adobe's published 2021 additional terms expressly cover AI/ML creation, training, testing and improvement restrictions. The current login acceptance flow was not verified, so this is not marked as confirmed permission or a confirmed current blanket prohibition.
- **Practical limits:** Not included in the default AI evaluation dataset recommendation. No account login, download, auto-rigging or local import was performed.

**Suggested test tasks**

- After permission review, check humanoid bone mapping and clip import.
- Compare ordinary character retargeting, scale and loop settings.

**Get started**

1. Confirm the current accepted agreement and the exact intended AI-related use.
2. Use only authorized files and retain source/service records.

**Primary evidence**

- [Current service FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)
- [Official 2021 additional terms](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf)

### SDL GameControllerDB

The community-maintained SDL controller mapping database, a plain-text fixture for repeatable gamepad input and button-layout regression tests.

**Stack / format:** SDL2 / SDL3 · gamecontrollerdb.txt · community-maintained GUID mappings

**Type:** Input & data fixtures · **Goals:** Coding & automated playtests; Vision, control & planning · **Dimensions:** 2D / 3D

[Download gamecontrollerdb.txt](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt) — A single text file; SDL2 loads it with SDL_GameControllerAddMappingsFromFile and SDL3 with SDL_AddGamepadMappingsFromFile. Compatible with SDL 2.0.10 and newer.

[Project / source record](https://github.com/mdqinc/SDL_GameControllerDB) · [License / terms](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE)

- **License group:** Open-license sources
- **Code:** Zlib license for the database file.
- **Assets / data:** Not a media asset collection; mappings are contributed data under the Zlib grant.
- **AI use:** Use a pinned copy of gamecontrollerdb.txt as a deterministic input fixture. A mapping entry is community-contributed data, not a guarantee that one device behaves identically across platforms or SDL versions.
- **Practical limits:** Community-sourced mappings can be corrected or removed between commits, and the README asks contributors not to submit AI-generated content. The database covers SDL 2.0.10 and newer; no controller or SDL build was run locally in this review.

**Suggested test tasks**

- Load one pinned gamecontrollerdb.txt in two SDL versions and compare button and axis indices for the same GUID.
- Replay a fixed input sequence with and without the database and record which devices fall back to a generic mapping.

**Get started**

1. Pin a commit or release and store the exact gamecontrollerdb.txt beside the test project.
2. Load the file through SDL_GameControllerAddMappingsFromFile (SDL2) or SDL_AddGamepadMappingsFromFile (SDL3) and log the detected controller GUID and platform.

**Primary evidence**

- [README with SDL2 and SDL3 loading calls](https://github.com/mdqinc/SDL_GameControllerDB#readme)
- [Database file with GUID mappings](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt)
- [Zlib license text](https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE)

## Record a reproducible test

For each actual run, preserve the project commit or release, engine/runtime and dependency versions, asset versions and licenses, launch commands, observation/action interface, reset mechanism, seeds, task success condition, and results. Separate visual observations from privileged state when comparing agents. For motion pipelines, also record skeleton hierarchy, rest pose, units, coordinate axes, frame rate, and root-motion conventions. These fields are a suggested run protocol; no runtime results are implied by this source catalog.
