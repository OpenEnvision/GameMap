# Tools, Resources, TrenchBroom, Quake, and File Formats

Sources: [Tools](https://book.leveldesignbook.com/appendix/tools), [TrenchBroom](https://book.leveldesignbook.com/appendix/tools/trenchbroom), [Assets & Resources](https://book.leveldesignbook.com/appendix/resources), [Recommended talks](https://book.leveldesignbook.com/appendix/resources/talks), [Recommended books](https://book.leveldesignbook.com/appendix/resources/books), [Quake resources](https://book.leveldesignbook.com/appendix/resources/quake), [Quake packaging](https://book.leveldesignbook.com/appendix/resources/quake/how-to-package), [File formats](https://book.leveldesignbook.com/appendix/resources/formats), [FGD](https://book.leveldesignbook.com/appendix/resources/formats/fgd), [MAP](https://book.leveldesignbook.com/appendix/resources/formats/map), [MDL](https://book.leveldesignbook.com/appendix/resources/formats/mdl), [Communities](https://book.leveldesignbook.com/appendix/communities). Adapted and reorganized under CC BY-NC-SA 4.0, except third-party material retains its own rights; see [LICENSE](../LICENSE.md).

## 1. Select a workflow, not a fashionable logo

Ask:
- Does the game already provide the mechanics the exercise needs?
- Can the tools represent the required space and entities?
- How quickly can the designer build, run, observe, and revise?
- Is there a usable import/build/package pipeline?
- What platforms, licenses, and community support are available?

The book recommends Doom/Quake modding for learning because rules, assets, enemies, and tuning already exist. General engines offer broader possibilities but may require substantial systems work first.

For 2D, built-in tools may suffice; standalone editors such as Tiled and LDtk support many custom pipelines. For 3D, distinguish level-construction tools from asset-modeling tools. Blender is useful for assets and some construction workflows, but a modeling workflow does not automatically provide playable iteration, entities, collision, or scripting.

Treat pricing, maintenance, plugin compatibility, and “best tool” claims as snapshot-specific. Verify current documentation before installing or promising support.

## 2. TrenchBroom suitability

TrenchBroom is a cross-platform brush-based editor with a 3D-centered workflow, convex brush validation, clipping, resizing, and texture tools.

For a non-Quake project, validate three separate integrations:
1. **Geometry:** can the target import MAP, compile BSP, or consume an export?
2. **Assets:** can textures, materials, and model references resolve correctly?
3. **Entities:** can placed objects and key/value properties become actual game objects?

An OBJ export may preserve geometry while losing entity data. A successful mesh import is not evidence that the gameplay pipeline works.

The snapshot lists integrations such as FuncGodot for Godot, several Unity importers, and HammUEr for Unreal. These are pointers, not a compatibility guarantee. Check target versions, maintenance, licenses, collision, materials, entities, and reimport behavior.

Use TrenchBroom for construction and markup if that is its strength; complex choreography may be better authored natively in the target engine.

## 3. Prove the smallest end-to-end pipeline

Before building a large map:
1. Configure the target game, paths, map format, and entity definitions.
2. Make a sealed test room with a start and simple light.
3. Add one texture and one representative entity/interaction.
4. Build or import it.
5. Run with the real controller.
6. Change something and verify reimport/rebuild.
7. Package and run from a separate location.

Do not auto-install executables or plugins merely because the book links them. Follow project approval and dependency-security rules.

## 4. Quake mapping pipeline

A typical classic pipeline uses:
- Editable MAP source.
- Appropriate game/mod FGD definitions and texture sources.
- A compiler toolchain.
- A compatible engine/source port.
- The required legally obtained base-game data.

The source recommends EricW tools for Quake:
- **qbsp:** constructs compiled geometry and reports relevant errors such as leaks.
- **vis:** computes potentially visible sets used for visibility management.
- **light:** builds lighting information.

Use the actual tool versions' documentation for flags and limits. Fast iteration settings and final-quality settings may differ; record the profile used.

### Diagnose by stage

| Symptom | First checks |
| --- | --- |
| Map cannot compile | Format, invalid geometry, paths, error log |
| Leak report | Sealing, entity placement, pointfile/debug output |
| Missing textures | Source WAD/material references and compile/import configuration |
| Entity missing or inert | FGD/runtime mismatch, classname, keys, target links |
| Unexpected darkness | Lights, compile stage, supported settings, engine compatibility |
| Works only on author's setup | Missing dependencies, asset paths, package layout |

A Quake texture WAD is not a Doom WAD. In the classic Quake workflow, used textures are normally embedded into the compiled BSP; verify custom pipelines and external-asset requirements rather than inferring packaging from a file extension.

## 5. Quake mods and assets

The source describes:
- **Arcane Dimensions:** an expanded single-player toolkit.
- **Alkaline:** science-fiction/base-oriented content and systems.
- **Copper:** a comparatively restrained refinement of vanilla Quake.
- **progs_dump:** mapper-facing functionality while broadly retaining familiar weapons and enemies.
- **2021 re-release Horde:** mode-specific entity setup and manager.

For any mod:
1. Identify exact version and supported engine.
2. Use matching FGD and mapping documentation.
3. Study included example/test maps.
4. Decide whether the release is standalone-with-dependencies or an add-on.
5. Preserve required licenses and avoid overwriting a parent mod unexpectedly.

Do not assume a January 2022 version named in the book is still latest.

The source describes permissive asset-sharing customs in some communities. **Community etiquette is not a legal license.** Credit is necessary where required but does not replace permission. Prefer official asset releases with clear rights.

## 6. Quake packaging: choose one coherent structure

Use lowercase names without spaces. Prefer a broadly supported ZIP.

### Simple map package

For map-related files only, the source accepts the files at the ZIP root:
- mymap.bsp
- mymap.lit, if required
- mymap_readme.txt
- Optional permitted source files

Explain which maps directory to extract into and how to launch.

### Full mod package

Put a mod directory inside the ZIP:
- mymod/maps/mymap.bsp
- mymod/maps/mymap.lit
- mymod/gfx/env/skybox-face.tga
- mymod/sound/mymod/soundname.wav
- mymod/progs/modelname.mdl
- mymod/progs.dat, if custom game code is required
- mymod/readme.txt

The folder is **sound**, not “sounds.” Keep map files directly within maps rather than an extra nested map directory. Names here are illustrative; actual skybox suffixes must match the engine.

PAK files can preserve the expected internal structure, but require their own packaging workflow.

### Partial add-on package

A partial package may contain maps, gfx, sound, and related subdirectories at its root for extraction into an existing mod. State the dependency and destination clearly.

Do not overwrite a parent mod's code or assets without an intentional, documented, authorized reason. Do not mix a full mod structure for some files with loose map files for others.

### Test

Install from the ZIP into a clean/separate setup using only the readme. Launch, complete, retry, and check missing files. Never package commercial base-game data merely because it is present locally.

## 7. Understand file-format responsibilities

### FGD: editor-facing entity definitions

FGD describes entities, fields, choices, flags, defaults, and editor presentation. It helps an editor expose the runtime game's vocabulary.

It does **not** implement the entity's runtime behavior. Adding a classname or checkbox to an FGD does not create supporting code in the game.

Keep definitions synchronized with the actual mod. Use small test entities before exposing large property sets.

### MAP: editable text geometry and entities

Quake-family MAP files generally combine:
- Entities expressed through key/value properties.
- World geometry in worldspawn.
- Convex brushes defined by planes.
- Face texture information.

Format variants differ, including texture projection conventions. Confirm the actual variant before parsing or exporting. Compiled BSP is a different artifact; do not treat editable source and playable output as interchangeable.

When implementing a parser, validate syntax, brush orientation, texture axes, properties, and representative round trips. Consult the specification rather than guessing from one sample cube.

### MDL: Quake 1 model data

The linked MDL article is a David Henry archival technical specification, marked **GNU Free Documentation License**, with separately licensed sample code.

An independently phrased orientation:
- Binary header and counts describe skins, texture coordinates, triangles, and animation frames.
- Vertex data is quantized and reconstructed using scale/translation.
- Texture data uses a palette.
- Texture seams and front/back triangle relationships require special handling.
- Animation blends frame data and uses stored normal references.

This skill does not reproduce its code or tables. If implementing a loader, read the original, retain applicable notices, and validate identifiers, versions, endianness, counts, offsets, truncation, and arithmetic bounds before allocation or indexing. The archived sample is not a security-reviewed parser.

The extension MDL is not a universal interchangeable model format across games.

## 8. Use resource lists by need

- **Assets:** the source points to repositories such as Kenney, OpenGameArt, Quaternius, Poly Haven, and ambientCG. Check each actual asset's rights and technical suitability.
- **Talks:** grouped into general design, combat, and nonlinear/sandbox design. Read the description, then inspect the original talk before using it as evidence.
- **Books:** distinguishes generalist theory, industry genre-specific advice, art/reference books, and architecture. A broad theoretical book and a narrow encounter guide solve different problems.
- **Communities:** game-specific groups are often best for tool troubleshooting and actual playtests; art communities are useful for visual critique; criticism venues support other kinds of analysis.

Do not claim to have consumed everything linked in these directories. The bibliography is a discovery tool, not inherited evidence.

## Deliverable

Recommend a minimal toolchain with its assumptions, a verified test-map pipeline, known compatibility gaps, asset provenance, and a reproducible package. Separate current verification from recommendations copied from the snapshot.
