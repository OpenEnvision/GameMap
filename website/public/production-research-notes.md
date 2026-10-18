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

Primary sources: [Official documentation or repository](https://www.aseprite.org/docs/cli/); [Aseprite licensing](https://github.com/aseprite/aseprite)

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

### Gaea

A procedural terrain editor with headless build automation. Build Swarm can consume exposed-variable files and mutation seeds for repeatable terrain variants. Validate the graph in the editor before automation; this does not establish arbitrary document rewriting. Build entitlement and activation depend on the selected edition and deployment.

Primary sources: [Official documentation or repository](https://docs.gaea.app/developers/automation/index.html); [Gaea License Types](https://docs.gaea.app/install/license-management/license-types.html)

### World Machine

A node-based terrain tool with XML-driven production build commands. The Professional Edition addendum describes loading a project, changing scalar variables, building and exporting through automation. It is older documentation, so confirm syntax and edition support in the target release rather than assuming a current universal CLI.

Primary sources: [Official documentation or repository](https://help.world-machine.com/topic/world-machine-professional-edition-addendum/)

### SpeedTree

Vegetation-modeling tools combining procedural generators and manual editing. Useful for trees and vegetation assets in game scenes. Older compiler documentation describes mesh export and an exporter SDK, but does not establish a current Modeler authoring CLI. SDK reference-application commands should not be confused with editor automation.

Primary sources: [Official documentation or repository](https://unity.com/products/speedtree); [SpeedTree Compiler Mesh Exporting (legacy)](https://docs.speedtree.com/doku.php?id=compiler_mesh_exporting)

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
