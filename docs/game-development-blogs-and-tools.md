# Engineering blogs and production tools

Primary sources reviewed on 2026-10-22. Twenty-two resources cover algorithms, architecture, animation, graphics, asset workflows, level editing, audio, accessibility, game AI, narrative, save inspection and localization. Each provides a concrete starting point.

## Red Blob Games

- **Type / workflow:** Amit Patel's interactive algorithm tutorials; engine-independent game programming.
- **Official source:** [Red Blob Games](https://www.redblobgames.com/).
- **Useful for:** Choosing a map representation, implementing movement costs and A* pathfinding, and building hex-grid coordinates, distances and selection tools.
- **Start here:** [Introduction to A*](https://www.redblobgames.com/pathfinding/a-star/introduction.html) lets readers compare search frontiers and terrain costs. [Hexagonal Grids](https://www.redblobgames.com/grids/hexagons/) covers coordinate conversions, neighbors, ranges and pixel-to-hex picking.
- **Access:** Articles are publicly readable without signup.

## Game Programming Patterns

- **Type / workflow:** Robert Nystrom's programming book; reusable game architecture illustrated with C++ examples.
- **Official source:** [Game Programming Patterns](https://gameprogrammingpatterns.com/) and the [author's source repository](https://github.com/munificent/game-programming-patterns).
- **Useful for:** Organizing character behavior and separating input, simulation and rendering. The chapters explain design tradeoffs through small game examples.
- **Start here:** [State](https://gameprogrammingpatterns.com/state.html) develops a platformer character from Boolean flags into state machines; [Game Loop](https://gameprogrammingpatterns.com/game-loop.html) discusses timing and update/render responsibilities. Their [State source](https://github.com/munificent/game-programming-patterns/blob/master/book/state.markdown) and [Game Loop source](https://github.com/munificent/game-programming-patterns/blob/master/book/game-loop.markdown) are also available.
- **Access / license:** Free online reading. The [repository license](https://github.com/munificent/game-programming-patterns/blob/master/LICENSE) distinguishes MIT code from CC BY-NC-ND 4.0 prose and site styles.

## Gaffer on Games

- **Type / workflow:** Glenn Fiedler's engineering articles; physics simulation and multiplayer networking across engines.
- **Official source:** [Gaffer on Games](https://gafferongames.com/).
- **Useful for:** Understanding why simulation timing changes gameplay, and how clients render smooth remote movement when network packets arrive unevenly.
- **Start here:** [Fix Your Timestep!](https://gafferongames.com/post/fix_your_timestep/) develops fixed-step simulation and rendering interpolation. [Snapshot Interpolation](https://gafferongames.com/post/snapshot_interpolation/) explains buffering received state and the latency/smoothness tradeoff.
- **Access:** Publicly readable articles.

## Alan Zucconi's tutorials

- **Type / workflow:** Author tutorials on Unity/C#, graphics and procedural animation.
- **Official source:** [Alan Zucconi](https://www.alanzucconi.com/).
- **Useful for:** Connecting game mathematics to implementation, especially shader effects and inverse kinematics for articulated characters.
- **Start here:** [Inverse Kinematics in 3D](https://www.alanzucconi.com/2020/09/14/inverse-kinematics-in-3d/) derives a two-joint solution using trigonometry and coordinate planes, with links to its 2D foundations.
- **Access:** The tutorial text is public; its downloadable Unity packages are offered through Patreon tiers.

## Remotery

- **Type / workflow:** Embedded CPU/GPU profiler for native C/C++ games and engines, with a browser viewer.
- **Official source:** [Celtoys/Remotery](https://github.com/Celtoys/Remotery).
- **Useful for:** Instrumenting gameplay updates, worker threads and rendering work, then inspecting timing samples and saved traces. Supported GPU integrations include Direct3D, OpenGL, Metal, Vulkan and CUDA.
- **Start here:** The [README's Basic Use and Running the Viewer sections](https://github.com/Celtoys/Remotery#basic-use) show explicit C sample scopes, C++ scoped samples and opening `vis/index.html`. Add the platform-specific source files and libraries listed under Compiling.
- **License:** Apache-2.0.

## Pixelorama

- **Type / workflow:** Pixel-art and frame-animation editor; exports assets for 2D game engines.
- **Official source:** [Pixelorama](https://pixelorama.org/) and [Orama Interactive's download page](https://orama-interactive.itch.io/pixelorama).
- **Useful for:** Drawing sprites with layers and onion skinning, tagging animation frames, and exporting selected animations as image sequences or sprite sheets.
- **Start here:** [Save and Export](https://pixelorama.org/user_manual/save_and_export/) explains editable `.pxo` projects versus exported art. The desktop [command-line interface](https://pixelorama.org/user_manual/cli/) supports automated sprite-sheet export, frame ranges, JSON metadata and separate layers.
- **License:** MIT; downloadable through the official itch.io page and project releases.

## TexturePacker

- **Type / workflow:** Sprite-atlas packing tool for engines including Phaser, PixiJS, Godot, Unity and custom runtimes.
- **Official source:** [TexturePacker](https://www.codeandweb.com/texturepacker).
- **Useful for:** Packing sprites into atlases, trimming transparent borders while preserving placement metadata, and aligning animation pivots. Engine-specific export formats carry frame positions and related metadata.
- **Start here:** The [quickstart](https://www.codeandweb.com/texturepacker/documentation) walks through exporter selection and publishing; the [command-line guide](https://www.codeandweb.com/texturepacker/documentation/commandline) shows packing folders and rebuilding saved `.tps` projects.
- **Access:** Commercial software with a trial. [Essential mode](https://www.codeandweb.com/texturepacker/documentation/installation-and-licensing) is limited to basic features and non-commercial use; commercial use requires a license.

## Ogmo Editor 3

- **Type / workflow:** Standalone 2D level editor for engines that import JSON level data.
- **Official source:** [Ogmo Editor](https://ogmo-editor-3.github.io/).
- **Useful for:** Defining project-wide entities and tilesets, placing gameplay objects, marking grid metadata, and decorating levels with independently transformed decals.
- **Start here:** The [Getting Started manual](https://ogmo-editor-3.github.io/docs/#/manual/getting_started.md) covers creating a project, adding layers/entities/tilesets and saving levels. The homepage documents JSON output containing tiles, decals and entities for runtime integration.
- **License:** MIT; free for personal and commercial projects.

## libtcod / python-tcod

- **Type / workflow:** Roguelike development library for C/C++, with Python bindings and NumPy-based APIs.
- **Official source:** [libtcod documentation](https://libtcod.readthedocs.io/en/latest/) and [python-tcod documentation](https://python-tcod.readthedocs.io/en/latest/).
- **Useful for:** Console-style tile rendering, visibility, procedural noise and enemy navigation without implementing every roguelike utility from scratch.
- **Start here:** The Python [pathfinding guide](https://python-tcod.readthedocs.io/en/latest/tcod/path.html) constructs a movement-cost array, `SimpleGraph` and `Pathfinder`; advanced examples cover custom movement rules and connected floors. The C/C++ documentation links a CMake starter project and interactive samples.
- **License:** [libtcod is BSD-3-Clause](https://github.com/libtcod/libtcod/blob/main/LICENSE.txt); [python-tcod is BSD-2-Clause](https://github.com/libtcod/python-tcod/blob/main/LICENSE.txt).

## Game Accessibility Guidelines

- **Type / workflow:** Cross-engine design reference for controls, readable UI, subtitles, feedback and difficulty options.
- **Start:** [Official guide](https://gameaccessibilityguidelines.com/) and its [basic recommendations](https://gameaccessibilityguidelines.com/basic/).
- **Useful for:** Reviewing remappable input, text size/contrast, cues that use more than color or sound, independent volume controls and saved player preferences. The [full list](https://gameaccessibilityguidelines.com/full-list/) groups examples by motor, cognitive, vision, hearing and other access needs.
- **Scope:** Practical design guidance that can be selected for the game's mechanics; it is not a game engine or an automated certification tool.

## jsfxr

- **Type / workflow:** Browser sound-effect generator and JavaScript library for short retro game sounds.
- **Start:** [Web editor](https://sfxr.me/) and [source/API guide](https://github.com/chr15m/jsfxr).
- **Useful for:** Make pickup, jump, hit and explosion sounds with presets, adjust envelopes and filters, then export WAV or save the sound parameters. JavaScript games can generate/play the same definitions through `sfxr.generate`, `sfxr.play` and buffer/WAV conversion APIs.
- **Access:** The library is [Unlicense](https://github.com/chr15m/jsfxr/blob/master/UNLICENSE). The basic web editor supports sound generation and WAV export; an optional Pro service adds pack-management and other features.

## LDtk

- **Type / workflow:** Open-source 2D level editor for platformers and top-down games; engine-independent JSON output with ecosystem importers.
- **Start:** [Official site and downloads](https://ldtk.io/), [documentation](https://ldtk.io/docs/), and [source](https://github.com/deepnight/ldtk).
- **Useful for:** Author tile layers and typed entity properties, use rules to fill visual tiles, organize levels into worlds, and live-reload Aseprite tilesets. Simple export produces level PNGs plus entity JSON, useful for starting an import pipeline before implementing the full format.
- **Access:** Free editor with [MIT source](https://github.com/deepnight/ldtk/blob/master/LICENSE). Its main editing focus is platformer/top-down layouts.

## Tiled

- **Type / workflow:** Open-source map and level editor for orthogonal, isometric and hexagonal games, with support across many engines and frameworks.
- **Start:** [Official site](https://www.mapeditor.org/), [Automapping guide](https://doc.mapeditor.org/en/stable/manual/automapping/), and [source](https://github.com/mapeditor/tiled).
- **Useful for:** Combine tile layers with object shapes and reusable templates, grow infinite maps, and apply rule-based tile/object placement. JavaScript extensions can add project-specific tools and export formats; JSON, Lua and engine-specific exports help connect authored levels to runtime data.
- **Access:** Free editor; [license overview](https://github.com/mapeditor/tiled/blob/master/COPYING) distinguishes application, library and component terms. A map editor/export pipeline, rather than a game engine.

## The Orange Duck — animation engineering

- **Type / workflow:** Technical articles and interactive examples for engine-independent animation programming, with C++ implementations.
- **Official source:** [The Orange Duck](https://theorangeduck.com/).
- **Useful for:** Smoothing moving targets, designing responsive controllers and blending animation transitions with predictable damping.
- **Start here:** [Spring-It-On: The Game Developer's Spring-Roll-Call](https://theorangeduck.com/page/spring-roll-call) explains why per-frame interpolation changes with frame rate, then develops exact dampers, spring variants and applications including inertialization and quaternion smoothing. The article links its raylib/raygui demo source.
- **Access:** Publicly readable article and linked example source.

## The Book of Shaders

- **Type / workflow:** Patricio Gonzalez Vivo and Jen Lowe's interactive introduction to GLSL fragment shaders; useful for custom materials and procedural visual effects.
- **Official source:** [The Book of Shaders](https://thebookofshaders.com/).
- **Useful for:** Learning coordinate-based drawing and constructing organic textures by combining noise, shapes and transformations.
- **Start here:** [Noise](https://thebookofshaders.com/11/) builds value noise from interpolation and compares it with gradient noise. [Fractal Brownian Motion](https://thebookofshaders.com/13/) explores octaves, frequency, amplitude and domain warping through editable examples and exercises.
- **Access:** Free web chapters, including a Chinese translation. The published chapters form a useful learning sequence; some later topics in the contents are still placeholders.

## Bosca Ceoil: The Blue Album

- **Type / workflow:** Music-composition tool for desktop and browser; exports audio that can be imported into game engines.
- **Official source:** [Yuri Sizov's project page](https://yurisizov.itch.io/boscaceoil-blue) and [official documentation](https://humnom.net/apps/boscaceoil/docs/).
- **Useful for:** Composing short game tracks with a piano-roll step sequencer, synthesized instruments and reusable patterns arranged across eight channels.
- **Start here:** [Notes and Patterns](https://humnom.net/apps/boscaceoil/docs/notes_and_patterns.html) explains the musical building blocks; [Export and Import](https://humnom.net/apps/boscaceoil/docs/export_import.html) covers exporting a chosen range of bars as WAV, MIDI, XM or SiON MML. WAV preserves the rendered sound for normal game-audio import.
- **Access / license:** Free, with optional donations; MIT source. This is the modern port of Terry Cavanagh's original Bosca Ceoil.

## Laigter

- **Type / workflow:** Texture-map authoring tool for 2D sprites and backgrounds in engines with normal-map or custom-shader lighting.
- **Official source:** [Laigter](https://azagaya.itch.io/laigter) and [its manual](https://laigter.readthedocs.io/en/latest/).
- **Useful for:** Generating normal, specular, parallax and ambient-occlusion maps from 2D art, then previewing the result under movable lights.
- **Start here:** [Normal Map Generation](https://laigter.readthedocs.io/en/latest/HowTo/normal-map-generation.html) distinguishes interior-detail controls from sprite-edge volume. [Real-time lighting preview](https://laigter.readthedocs.io/en/latest/HowTo/preview.html) explains the preview controls; matching those effects in-game depends on the engine's shaders.
- **Access / license:** GPL-3.0 source; current itch.io binaries are paid. The developer's [distribution update](https://azagaya.itch.io/laigter/devlog/1639859/changes-about-laigter-distribution) explains the change.

## Martin O'Leary's fantasy-map generator

- **Type / workflow:** JavaScript reference implementation for procedural world maps, using D3-based geometry and SVG rendering.
- **Official source:** [mewo2/terrain](https://github.com/mewo2/terrain).
- **Useful for:** Studying how terrain elevation, drainage, coastlines, settlement placement and political regions can build on shared map data.
- **Start here:** In [terrain.js](https://github.com/mewo2/terrain/blob/master/terrain.js), `generateCoast` assembles and erodes the height field, `getRivers` follows downhill flow, `cityScore` combines river flux with settlement spacing, and `getTerritories` expands regions using terrain-dependent travel costs.
- **Access / license:** MIT. The README identifies this as a finished reference project and lists its D3, priority-queue and language-generation dependencies.

## Game AI Pro

- **Type / workflow:** Practitioner-written chapters about game AI, edited by Steve Rabin; engine-independent explanations of decision making, movement, tactics and debugging.
- **Official source:** [Game AI Pro](https://www.gameaipro.com/).
- **Useful for:** Choosing meaningful inputs for NPC utility scoring and recording enough AI state to understand an incorrect decision after it happens.
- **Start here:** Mike Lewis's [Choosing Effective Utility-Based Considerations](https://www.gameaipro.com/GameAIPro3/GameAIPro3_Chapter13_Choosing_Effective_Utility-Based_Considerations.pdf) uses tactical movement and skill selection to explain utility considerations. David Young's [Debugging AI with Instant In-Game Scrubbing](https://www.gameaipro.com/GameAIPro3/GameAIPro3_Chapter06_Debugging_AI_with_Instant_In-Game_Scrubbing.pdf) describes recording relevant data and stepping through previous frames with visual debugging tools.
- **Access:** The official site provides free chapter downloads. The texts remain copyrighted rather than being openly licensed for republication.

## Kaitai Struct

- **Type / workflow:** Declarative binary-format descriptions and parser generation for languages including C++, C#, JavaScript, Lua and Python.
- **Official source:** [Kaitai Struct](https://kaitai.io/).
- **Useful for:** Inspecting a game's custom binary save, replay or asset format by describing fields, byte order, nested structures and repeated records, then generating a parser for development tools.
- **Start here:** Follow the [user guide's workflow and format examples](https://doc.kaitai.io/user_guide.html), then load a binary file and its `.ksy` description into the [Web IDE](https://ide.kaitai.io/) to inspect how bytes map to fields. This is a format-description and parsing workflow; the schema supplies the meaning of the data.
- **Access / license:** Free and open source. The compiler and visualizer use GPL-3.0-or-later; runtime libraries have separate permissive licenses, including MIT for C# and Python and Apache-2.0 for JavaScript. The [official licensing section](https://kaitai.io/#licensing) lists them.

## articy:draft X

- **Type / workflow:** Visual narrative-authoring application with branching flow diagrams, dialogue fragments, entities, templates and variables. Structured exports support custom engines as well as dedicated Unity and Unreal integrations.
- **Official source:** [articy:draft X features](https://www.articy.com/en/articydraft/feature-list/).
- **Useful for:** Keeping branching dialogue, character data and conditional story logic together, then exporting the authored content to the game's runtime.
- **Start here:** Build a small dialogue flow with speaker-linked fragments and conditions, then use [Technical Exports](https://www.articy.com/en/articydraft/integration/techexports/) to choose JSON or XML for a custom-engine import. [Exporting data](https://articy.com/help/adx/Exports_General.html) explains how to export selected objects or filtered content.
- **Access:** Commercial software with a free single-user tier limited to 700 objects per project. The [official FAQ](https://www.articy.com/en/support/frequently-asked-questions/) states that the free tier includes all exports and permits commercial use.

## Weblate

- **Type / workflow:** Repository-integrated localization platform for translation files such as PO and JSON; independent of the game engine.
- **Official source:** [Weblate](https://weblate.org/en/).
- **Useful for:** Translating menus and dialogue with screenshots, neighboring strings and glossaries for context, while checks help identify placeholder, markup and plural-form problems.
- **Start here:** [Translating using Weblate](https://docs.weblate.org/en/latest/user/translating.html) covers translation context, screenshots, suggestions and checks. Match the game's string files against the [supported localization formats](https://docs.weblate.org/en/latest/formats.html) before connecting its repository.
- **Access / license:** GPL-3.0-or-later, with free self-hosting and paid managed hosting. Eligible libre projects can request free hosting; the [official site](https://weblate.org/en/) describes the hosting options and the [license documentation](https://docs.weblate.org/en/latest/contributing/license.html) identifies the software license.

This repository supplement is linked from the README; it is not part of the exported website catalog.
