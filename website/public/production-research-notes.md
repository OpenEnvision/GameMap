# Production tools and acceptance boundaries

Sources checked on 2026-10-18; full reproduction not performed. This research supplements the catalog without asserting engine compatibility, installation or runtime results. Tools below are documented references, not endorsements. Catalog promotion is deferred while official identity assets are reviewed.

## Authoring, localization and narrative

### Tiled

A tile-map editor with JavaScript extensions and command-line export. Extensions can manipulate maps and tilesets; the scripting guide includes TypeScript definitions and CLI evaluation since 1.9. UI-dependent APIs may do nothing or return null in CLI mode, so editor scripts need a headless-path check.

Primary sources: [Official documentation or repository](https://doc.mapeditor.org/en/stable/manual/scripting/); [Tiled COPYING](https://github.com/mapeditor/tiled/blob/master/COPYING)

### LDtk

A 2D level editor with structured JSON exports for engine integration. The official format provides full and minimal JSON schemas for levels, layers and entities. Importers must track format changes and deprecations; a JSON export does not supply runtime behavior or establish a command-line editor interface.

Primary sources: [Official documentation or repository](https://ldtk.io/json/); [LDtk repository](https://github.com/deepnight/ldtk)

### Aseprite

A pixel-art and animation editor with batch sprite-sheet export. The CLI can export sprite sheets and companion metadata without opening the UI. Option order and layer visibility affect results. Source availability does not mean permissive redistribution: consult the project EULA for binaries and source use.

Primary sources: [Official documentation or repository](https://www.aseprite.org/docs/cli/); [Aseprite licensing](https://github.com/aseprite/aseprite). The [sprite delivery contract](asset-validation-contracts.md#sprite-atlas-metadata-and-playback-delivery) adds pinned trimming, atlas, tag, pivot and timing evidence for a proposed restricted importer.

### Inkscape

An SVG editor with command-line export and object-geometry queries. Useful for vector UI assets and repeatable raster exports. Actions replace the older verbs interface, which was removed in 1.2; examples on the official wiki span versions, so check the target build’s available actions.

Primary sources: [Official documentation or repository](https://wiki.inkscape.org/wiki/Using_the_Command_Line)

### Krita

A raster-art editor with Python access to documents, actions and filters. LibKis supports automation inside Krita for painting and asset preparation. The scripting guide does not establish a general headless Python service. Krita’s GPL software license does not restrict ownership of artwork created with it.

Primary sources: [Official documentation or repository](https://docs.krita.org/en/user_manual/python_scripting/introduction_to_python_scripting.html); [Krita license](https://krita.org/en/about/license/)

### Spine

A 2D skeletal-animation editor with runtime export and batch processing. Most CLI exports can run headless, but image and video export needs a windowing system and OpenGL. Editor exports must match the runtime version. CLI automation remains subject to Spine’s user licensing, rather than becoming unrestricted server use.

Primary sources: [Official documentation or repository](https://en.esotericsoftware.com/spine-command-line-interface); [Vendor clarification of Spine CLI licensing](https://eu.esotericsoftware.com/forum/d/30243-tos-question-about-using-spine-cli-as-an-export-tool); [Spine export](https://us.esotericsoftware.com/spine-export/)

### Rive

An interactive vector-animation authoring tool with embeddable runtimes. Useful for animated menus and UI state machines. Official runtimes are MIT-licensed, while production runtime export requires an eligible paid editor plan. New editor features can require a runtime update or re-export; runtime licensing does not grant editor access.

Primary sources: [Official documentation or repository](https://github.com/rive-app/help-center/blob/master/runtimes/overview.md); [Rive paid export plan](https://rive.app/blog/rive-s-new-9-mo-plan)

### Effekseer

A particle-effect editor with game runtimes and command-line export. The 18.x documentation describes editable/runtime .efkefc files and material-cache export. Older .efkproj and .efk workflows differ. Runtime integration and dependent texture/material packaging remain necessary; an exported effect is not a complete engine integration.

Primary sources: [Official documentation or repository](https://effekseer.github.io/Helps/18x/Tool/en/ToolReference/index.html); [Effekseer repository](https://github.com/effekseer/Effekseer)

### Fluent

A localization system for language-aware messages and runtime formatting. Fluent resources let translators express language-specific grammar rather than forcing every locale into the same string structure. JavaScript, Python and Rust implementations are available. It still needs translated resources and host integration; it is not an automatic translation service.

Primary sources: [Official documentation or repository](https://projectfluent.org/)

### ICU

Unicode and internationalization libraries for locale-sensitive text processing. ICU4C and ICU4J supply internationalization APIs for C/C++ and Java. They support text infrastructure rather than translation authoring. Match library and data versions, and check the locale-data footprint shipped with the game.

Primary sources: [Official documentation or repository](https://unicode-org.github.io/icu/userguide/icu/)

### HarfBuzz

A text-shaping library that converts Unicode text into positioned glyphs. Useful for scripts whose glyph selection and placement cannot be handled by one-character-to-one-glyph mapping. Shaping is only part of a text stack: layout, font rasterization, fallback and UI integration still need separate systems.

Primary sources: [Official documentation or repository](https://harfbuzz.github.io/what-is-harfbuzz.html); [What HarfBuzz does not do](https://harfbuzz.github.io/what-harfbuzz-doesnt-do.html); [Ren'Py bundled HarfBuzz license](https://www.renpy.org/doc/html/license.html)

### FreeType

A font library for accessing font files and generating glyph images. FreeType provides a common font API and rasterization, not high-level text layout. Its FTL/GPL licensing choices apply to the library; font files need their own rights review. Pair it with shaping and layout when building multilingual UI.

Primary sources: [Official documentation or repository](https://freetype.org/freetype2/docs/index.html)

### ink

A branching-narrative language with a C# runtime and command-line compiler. Compiled JSON feeds Story; Continue and choices drive progression, while state.ToJson and LoadJson save interpreter state. Host-game UI and external side effects remain separate. The MIT core and community inkjs port should not be assumed version-compatible.

Primary sources: [Official documentation or repository](https://github.com/inkle/ink); [Runtime guide at inspected commit](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/Documentation/RunningYourInk.md)

### Ren'Py

A visual-novel framework with command-line compilation, linting, testing and builds. The CLI also supports translation workflows. Preserve compiled .rpyc files across CI builds where the documentation requires them for save compatibility. Mobile and web targets have separate setup requirements; a successful build is not a story or localization test.

Primary sources: [Official documentation or repository](https://www.renpy.org/doc/html/cli.html); [Ren'Py License](https://www.renpy.org/doc/html/license.html)

## Build, delivery and networking

### Nakama

A game backend for identity, social features, storage and multiplayer. Client SDKs and server runtimes support backend logic and authoritative multiplayer. Running the server still requires database operations and authorization design. Managed hosting and enterprise features are separate from the open-source server and SDKs.

Primary sources: [Official documentation or repository](https://heroiclabs.com/docs/nakama/); [Nakama licenses and features](https://heroiclabs.com/nakama/); [Nakama JS SDK](https://github.com/heroiclabs/nakama-js)

### Colyseus

A room-based multiplayer framework with matchmaking and synchronized state. The MIT framework uses delta-encoded state synchronization and configurable transports, including WebSockets. Gameplay validation remains application code. Horizontal scaling introduces infrastructure such as Redis and load balancing; state sync alone is not cheat prevention.

Primary sources: [Official documentation or repository](https://github.com/colyseus/colyseus); [Colyseus transport](https://docs.colyseus.io/server/transport)

### Agones

Kubernetes orchestration for fleets of dedicated game servers. Agones manages server allocation, fleets and autoscaling around containerized game servers. It requires Kubernetes operations and a compatible server lifecycle. It does not implement gameplay networking, matchmaking policy or a complete player backend.

Primary sources: [Official documentation or repository](https://agones.dev/site/docs/overview/); [Agones repository](https://github.com/agones-dev/agones)

### GameNetworkingSockets

A native networking library for reliable and unreliable encrypted messages. The C/C++ library provides transport primitives, not entity serialization, delta encoding or compression. Applications still need signaling and game protocol design. Steam authentication and Steam Datagram Relay access should not be assumed for every standalone deployment.

Primary sources: [Official documentation or repository](https://github.com/ValveSoftware/GameNetworkingSockets)

### butler

itch.io’s command-line build uploader and binary-patch toolkit. Offline patch tooling can reconstruct builds using staging checkpoints. In-place patching skips verification of untouched files unless separately checked. Preserve the exact baseline when resuming, and distinguish local patch generation from authenticated uploads or publishing.

Primary sources: [Official documentation or repository](https://itch.io/docs/butler/); [Offline patching](https://itch.io/docs/butler/offline.html)

### SteamPipe / Steamworks build delivery

Steam’s depot-build, beta-branch and content-update distribution system. The uploading guide covers build scripts, rollback and chunk-based updates. Pack-file layout can increase patch size and client disk work even for small content changes. Uploading and releasing require Steamworks partner permissions; documentation access is not publishing authorization.

Primary sources: [Official documentation or repository](https://partner.steamgames.com/doc/sdk/uploading)

### GNU gettext

Translation-catalog tooling for extraction, validation and compiled message resources. msgfmt can check and compile PO catalogs into MO files. Format checks are not proof of translation coverage or linguistic quality. Preserve locale, plural rules, message identifiers and catalog provenance; untranslated or fuzzy entries need separate acceptance rules.

Primary sources: [Official documentation or repository](https://www.gnu.org/software/gettext/manual/gettext.html)

## World assets

### Infinigen staged generation and export acceptance

Sources checked 2026-10-18; full reproduction not performed. This scoped procedural workflow supplements the [asset transfer work order](production-work-orders.md#1-export-an-authored-asset-import-it-and-audit-dependencies). All proposed acceptance gates are **GameMap editorial guidance, unimplemented and unexecuted**.

#### Pin and version boundary

All repository links below pin inspected main commit [224598d4a2ff95b4fc928e72c222598b7122c698](https://github.com/princeton-vl/infinigen/commit/224598d4a2ff95b4fc928e72c222598b7122c698), committed 2026-10-14. This tree contains both legacy `infinigen` [1.19.1](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/__init__.py) and `infinigen2` [2.0.0a3](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen2/__init__.py). The contracts below concern the legacy scene manager and `infinigen.tools.export` retained in this commit, not an assertion that the new V2 pipeline shares them.

The [V2 guide](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/Infinigen2.md) calls 2.0 a preview, with limited indoor objects/arrangements rather than full old-system asset coverage. Its CLI chains generators and exporters, and its authors recommend fixing an alpha version because interfaces can change. Do not replace legacy commands with the V2 CLI while claiming the same reproduction or export contract.

#### Inputs and reproducibility

Legacy scene generation takes scene seed, ordered scene Gin configs/overrides, and task/input/output paths. Dataset management separately takes pipeline configs/overrides and either explicit scene seeds or a meta-seed for choosing scene seeds. Scene config and scheduler config are distinct inputs. The [configuration guide](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/ConfiguringInfinigen.md) explains override order, camera-dependent mesh detail and population, and the coarse → populate → render/ground-truth task split; fine-terrain and render tasks can recur across views/time blocks. Preserve camera/frame/detail settings as generation inputs, not merely presentation settings.

Crucially, the pinned [Hello World guide](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/HelloWorld.md) still warns that identical commands may yield differently arranged scenes, runtimes, and memory use on many platforms. This is a documentation warning, not a reproduction experiment performed here. A fixed seed is therefore an identity/provenance field, not proof of bitwise or geometric determinism.

The legacy task entry point explicitly asserts Blender `4.2.0`; the package also pins `bpy==4.2.0`. Record code SHA plus installed version, Blender/Python/dependency versions, platform, hardware, complete command, config contents/ordering, overrides, seed(s), and camera trajectory. These are proposed acceptance records, not a claimed built-in manifest. [Task source](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/core/execute_tasks.py#L347-L378), [package declaration](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/pyproject.toml).

#### Outputs, reuse, and resume

- The [task implementation](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/core/execute_tasks.py#L179-L307) writes `scene.blend`, `MaskTag.json`, `version.txt`, and `polycounts.txt` for generation stages. Later tasks load the prior blend/tag files. It can symlink the `assets` directory and `.glb`/`.b_displacement.npy` intermediates across task directories. Copying only a `.blend` is not evidence of a self-contained handoff: resolve and retain linked dependencies.
- For named tasks the entry point writes `START_<task>`, then `FINISH_<task>` after the task function returns, then `operative_gin_<task>.txt`. A finish marker is task-return evidence; it does not validate material fidelity, file completeness, or engine usability. In particular the operative config write occurs after the finish marker. [Source](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/core/execute_tasks.py#L347-L378).
- `--use_existing` is documented in the CLI as best-effort resume. The manager requires `scenes_db.csv`, recovers per-seed scene configs when the configs column is present, skips directories without logs, and treats existing `logs/FINISH_*` markers as successful jobs. This inspected reconstruction does not check artifact hashes or whether those markers correspond to changed source/configs. Preserve the original run and verify artifacts before reusing markers; do not market it as content-addressed caching. [Resume implementation](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/datagen/manage_jobs.py#L223-L263), [CLI](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/datagen/manage_jobs.py#L832-L876).
- Preserve the scene database, logs, configs, intermediate dependency inventory and final artifacts before cleanup. Cleanup modes include `big_files`, `except_logs`, and `all`; upload pipelines can remove files even with cleanup set to `none`. [Manager checks](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/src/infinigen/datagen/manage_jobs.py#L938-L974).

#### Export acceptance

The [official legacy exporter guide](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/docs/source/ExportingToExternalFileFormats.md) describes baking procedural materials/geometry before standard Blender export. It supports OBJ/FBX/STL/PLY/USDC options, texture resolution and individual-object export; vertex colors are restricted to FBX/PLY. Full-scene export is documented as supported only for USDC in this workflow. Other formats realize dense instances and can exhaust memory; trees also contain instances. This is an Infinigen workflow support limit, not a universal claim that no other format can represent instances.

The guide limits material baking to albedo, roughness, normal and metallicity. It warns about transparency, loss of other material parameters, FBX UV failures, and untested/unsupported animation export. Finite texture resolution is lossy. Export existence is not visual equivalence.

Proposed acceptance gate: reopen in the destination engine; verify dependency/texture resolution, transforms and scale, geometry/instance counts, UVs/normals, triangle and texture budgets, and representative appearance against Blender references. Explicitly flag lost transparency/emission/other channels and unsupported animation. Separately qualify collision, LODs, navigation and gameplay. Keep source blend/dependencies alongside a manifest of exported files and hashes. These engine tests remain unperformed here.

#### Rights boundary

The pinned [LICENSE](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/LICENSE) establishes BSD-3-Clause conditions for code/source and binary redistribution. The [README acknowledgements](https://github.com/princeton-vl/infinigen/blob/224598d4a2ff95b4fc928e72c222598b7122c698/README.md#L231-L264) also discuss dependencies and some procedural code obtained under CC0. Neither inspected passage is an explicit, separate generated-output ownership/license grant. Do not label all exported assets CC0 or inherit BSD automatically from the code label. Record code licensing separately from generated-output rights, added asset provenance, and any pre-generated dataset terms. No separate generated-output terms were located in the inspected official sources; this is a source-coverage limitation, not a finding that use is prohibited or a legal determination.

### Gaea

A procedural terrain editor with headless build automation. Build Swarm can consume exposed-variable files and mutation seeds for repeatable terrain variants. Validate the graph in the editor before automation; this does not establish arbitrary document rewriting. Build entitlement and activation depend on the selected edition and deployment.

Primary sources: [Official documentation or repository](https://docs.gaea.app/developers/automation/index.html); [Gaea License Types](https://docs.gaea.app/install/license-management/license-types.html)

### World Machine

A node-based terrain tool with XML-driven production build commands. The Professional Edition addendum describes loading a project, changing scalar variables, building and exporting through automation. It is older documentation, so confirm syntax and edition support in the target release rather than assuming a current universal CLI.

Primary sources: [Official documentation or repository](https://help.world-machine.com/topic/world-machine-professional-edition-addendum/)

### SpeedTree

Vegetation-modeling tools combining procedural generators and manual editing. Useful for trees and vegetation assets in game scenes. Older compiler documentation describes mesh export and an exporter SDK, but does not establish a current Modeler authoring CLI. SDK reference-application commands should not be confused with editor automation.

Primary sources: [Official documentation or repository](https://unity.com/products/speedtree); [SpeedTree Compiler Mesh Exporting (legacy)](https://docs.speedtree.com/doku.php?id=compiler_mesh_exporting)

### Procedural layout constraints and solver verdicts

Checked 2026-10-18 against official pinned source. This supplements staged generation/export and downstream [navigation acceptance](engine-operation-contracts.md#navigation-after-procedural-world-edits). The following WFC/DeBroglie interfaces are separate research surfaces; neither is attributed to Dead Cells. No generator, engine or fixture was executed. Proposed task/acceptance controls are **GameMap editorial guidance**.

#### Exact upstream scope

- **mxgmn/WaveFunctionCollapse:** commit `de7d22e705e816b62b4d613199d0463820fcaef3`, 2026-03-22. Inspected [project file](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/WaveFunctionCollapse.csproj) targets net10.0 and ImageSharp 3.1.12; it does not declare a package version.
- **BorisTheBrave/DeBroglie:** commit `27b37fa7a54f7c532b52634622f36eddd2a3c7da`, 2025-12-21. Inspected [project file](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/DeBroglie.csproj) declares version 2.1.0, assembly/file 2.1.0.0 and netstandard2.0. This identifies the tree, not a verified installed release.

#### Upstream contracts and static observations

**WFC completion is not its Boolean alone.** The [README](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/README.md#L6-L21) defines local pattern similarity; simple-tiled propagation enforces adjacency. In [Model.Run](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/Model.cs#L73-L97), propagation failure returns false, but exhausting a nonnegative iteration limit also returns true, without completing the observed assignment. [Program](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/Program.cs#L49-L66) consequently can print DONE and save an unfinished result. [OverlappingModel.Save](https://github.com/mxgmn/WaveFunctionCollapse/blob/de7d22e705e816b62b4d613199d0463820fcaef3/OverlappingModel.cs#L105-L148) supports averaged unresolved possibilities. A PNG is therefore not a solved-tile witness. The caller tries at most ten times per screenshot; with an explicit seed, each retry uses the same seedStart+i rather than a new seed. A failed attempt does not prove the constraint system unsatisfiable.

**DeBroglie retains three states.** [Resolution](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Resolution.cs) separates Decided, Undecided and Contradiction. [Output conversion](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagator.cs#L671-L704) can substitute identical default values for unresolved and contradictory cells; retain status and possibility sets, not just the converted map. [Step/Run](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagator.cs#L407-L430) distinguish one selection, potentially several backtracks, from looping to a terminal state. Neither signature supplies a wall-clock deadline.

**Pin the actual search configuration.** The [prose guide](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/docs/articles/features.md#L117-L124) describes opting into backtracking. However, this tree's [Boolean constructor and policy factory](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagator.cs#L37-L100) map false to Backjump and create a PatienceBackjumpPolicy. The [core constructor](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Wfc/WavePropagator.cs#L72-L90) enables backtracking for a non-null policy. [History trimming and recovery](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Wfc/WavePropagator.cs#L395-L468) apply a depth cap only when MaxBacktrackDepth>0; default zero disables that cap, not the policy. A fresh [TilePropagatorOptions](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/TilePropagatorOptions.cs) has enum-default BacktrackType.None, which supplies no policy. The false→Backjump observation is specific to the Boolean overload, not a universal library default. Bounded history can discard earlier choices, so terminal Contradiction must not automatically become a global-unsatisfiability claim. These are static observations, not reproduced defects.

**Connectivity requires authored semantics.** [Path constraints](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/docs/articles/path_constraints.md#L1-L40) use adjacency routes. PathSpec treats adjacent path tiles as traversable; EdgedPathSpec additionally requires matching exits. RelevantTiles/RelevantCells determine what must connect: selecting only start and goal leaves other components unconstrained. [ConnectedConstraint](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/DeBroglie/Constraints/Path/ConnectedConstraint.cs#L42-L77) reports contradictory required components. [Fixed-tile/count constraints](https://github.com/BorisTheBrave/DeBroglie/blob/27b37fa7a54f7c532b52634622f36eddd2a3c7da/docs/articles/constraints.md) supply further authoring surfaces. None establishes key-before-lock progression, encounter pacing or controller traversal by itself.

#### Proposed GameMap task fixture, unimplemented and unexecuted

1. Preserve source/runtime versions, sample/tileset hashes and rights, topology/mask/dimensions, periodicity, rotations, adjacency/exit tables, weights, fixed/banned cells, required-room counts and relevant endpoints. Separate hard constraints from aesthetic preferences. Record RNG implementation/seed per attempt, constructor overload, search policy, depth/step/time/memory limits and termination reason.
2. Require a complete assignment plus independent constraint validation before accepting a solved witness. Distinguish attempt contradiction, undecided/partial state, budget exhaustion, cancellation and execution error. The latter operational outcomes are proposed wrapper states, not upstream enum values. Retain failed attempts and partial evidence; never report all seeds solved from selected successful images. Reserve an unsatisfiable claim for justified exhaustive search under the declared model and constraints.
3. Specify a small satisfiable control; mutually incompatible fixed-room/adjacency requirements; a locally legal but disconnected start/goal; matching path tiles with mismatched exits; and finite-limit unresolved output. Repeat an explicit failed seed separately from changing seeds. Assert that no incomplete output passes acceptance.
4. Add an authored key/lock progression graph and required/optional room purposes, then verify the resulting gameplay state sequence independently of geometric connectivity. Link accepted layout identity to existing collider, fresh-navigation and real-controller traversal gates. Preserve deliberate narrow-door and wrong-floor variants. A connected or visually plausible map remains insufficient evidence of the intended experience.

No engine binding, runtime recovery, cross-version determinism or measured creator benefit is established.


## Audio and accessibility evidence

### FFmpeg and ffprobe

Command-line media conversion and audio/video inspection tools. Use ebur128, astats and silencedetect for scoped audio measurements, and ffprobe for stream and frame timing. True-peak scanning needs explicit enablement and libswresample; extrema counts are not clipped-sample counts. Equal duration does not prove A/V sync, and detected silence does not validate a loop seam.

Primary sources: [Official documentation or repository](https://ffmpeg.org/ffmpeg-filters.html); [ffprobe manual](https://ffmpeg.org/ffprobe.html)

### axe-core

An accessibility testing engine for websites and HTML-based game interfaces. Results distinguish violations, passes, incomplete checks and inapplicable rules. Incomplete results need further review; excluded elements and disabled rules reduce coverage. A scan cannot certify accessibility or inspect arbitrary gameplay pixels, audio and native editor interfaces.

Primary sources: [Official documentation or repository](https://github.com/dequelabs/axe-core); [API at inspected commit](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md)

## GameMap editorial guidance: acceptance checks still needed

- Audio: preserve the original media hash, decoder/build configuration, channel layout, sample rate and full analyzed span. Measure true peak explicitly; do not relabel extrema counts as clipping. Thresholds depend on delivery requirements. A loop needs wrap-boundary analysis and listening in its actual codec/import path.
- Timing: retain rational timebases, original timestamps and event identities. A/V synchronization needs common-clock audio and visual markers at multiple points to separate offset from drift. ffprobe metadata and equal durations cannot establish audible synchronization.
- UI and localization: automated DOM accessibility checks leave manual, assistive-technology, native-widget and canvas assessments unresolved. Font shaping, glyph rasterization, message formatting and translation coverage are distinct layers.
- Builds: retain exact input revisions, dependency manifests, compiler diagnostics and output hashes. A completed export does not establish runtime compatibility, save compatibility or successful delivery. Publishing permissions and destructive updates require separate authorization.

These are proposed workflow checks, not validated GameMap adapters or upstream guarantees. Source dates describe review dates; rolling documents and account-specific licensing must be checked again before use.
