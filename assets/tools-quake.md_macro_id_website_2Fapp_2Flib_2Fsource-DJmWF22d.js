import{j as e}from"./jsx-runtime-BE0eTAub.js?v=20261021-pages-ready";let s={title:"Tools, Resources, TrenchBroom, Quake, and File Formats",description:"Review TrenchBroom, Quake workflows and level file formats with the tool and engine boundaries each requires."},o={contents:[{heading:void 0,content:"Sources: Tools, TrenchBroom, Assets & Resources, Recommended talks, Recommended books, Quake resources, Quake packaging, File formats, FGD, MAP, MDL, Communities. Adapted and reorganized under CC BY-NC-SA 4.0, except third-party material retains its own rights; see LICENSE."},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"Ask:"},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"Does the game already provide the mechanics the exercise needs?"},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"Can the tools represent the required space and entities?"},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"How quickly can the designer build, run, observe, and revise?"},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"Is there a usable import/build/package pipeline?"},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"What platforms, licenses, and community support are available?"},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"The book recommends Doom/Quake modding for learning because rules, assets, enemies, and tuning already exist. General engines offer broader possibilities but may require substantial systems work first."},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"For 2D, built-in tools may suffice; standalone editors such as Tiled and LDtk support many custom pipelines. For 3D, distinguish level-construction tools from asset-modeling tools. Blender is useful for assets and some construction workflows, but a modeling workflow does not automatically provide playable iteration, entities, collision, or scripting."},{heading:"1-select-a-workflow-not-a-fashionable-logo",content:"Treat pricing, maintenance, plugin compatibility, and “best tool” claims as snapshot-specific. Verify current documentation before installing or promising support."},{heading:"2-trenchbroom-suitability",content:"TrenchBroom is a cross-platform brush-based editor with a 3D-centered workflow, convex brush validation, clipping, resizing, and texture tools."},{heading:"2-trenchbroom-suitability",content:"For a non-Quake project, validate three separate integrations:"},{heading:"2-trenchbroom-suitability",content:"**Geometry:** can the target import MAP, compile BSP, or consume an export?"},{heading:"2-trenchbroom-suitability",content:"**Assets:** can textures, materials, and model references resolve correctly?"},{heading:"2-trenchbroom-suitability",content:"**Entities:** can placed objects and key/value properties become actual game objects?"},{heading:"2-trenchbroom-suitability",content:"An OBJ export may preserve geometry while losing entity data. A successful mesh import is not evidence that the gameplay pipeline works."},{heading:"2-trenchbroom-suitability",content:"The snapshot lists integrations such as FuncGodot for Godot, several Unity importers, and HammUEr for Unreal. These are pointers, not a compatibility guarantee. Check target versions, maintenance, licenses, collision, materials, entities, and reimport behavior."},{heading:"2-trenchbroom-suitability",content:"Use TrenchBroom for construction and markup if that is its strength; complex choreography may be better authored natively in the target engine."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Before building a large map:"},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Configure the target game, paths, map format, and entity definitions."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Make a sealed test room with a start and simple light."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Add one texture and one representative entity/interaction."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Build or import it."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Run with the real controller."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Change something and verify reimport/rebuild."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Package and run from a separate location."},{heading:"3-prove-the-smallest-end-to-end-pipeline",content:"Do not auto-install executables or plugins merely because the book links them. Follow project approval and dependency-security rules."},{heading:"4-quake-mapping-pipeline",content:"A typical classic pipeline uses:"},{heading:"4-quake-mapping-pipeline",content:"Editable MAP source."},{heading:"4-quake-mapping-pipeline",content:"Appropriate game/mod FGD definitions and texture sources."},{heading:"4-quake-mapping-pipeline",content:"A compiler toolchain."},{heading:"4-quake-mapping-pipeline",content:"A compatible engine/source port."},{heading:"4-quake-mapping-pipeline",content:"The required legally obtained base-game data."},{heading:"4-quake-mapping-pipeline",content:"The source recommends EricW tools for Quake:"},{heading:"4-quake-mapping-pipeline",content:"**qbsp:** constructs compiled geometry and reports relevant errors such as leaks."},{heading:"4-quake-mapping-pipeline",content:"**vis:** computes potentially visible sets used for visibility management."},{heading:"4-quake-mapping-pipeline",content:"**light:** builds lighting information."},{heading:"4-quake-mapping-pipeline",content:"Use the actual tool versions' documentation for flags and limits. Fast iteration settings and final-quality settings may differ; record the profile used."},{heading:"diagnose-by-stage",content:`| Symptom            | First checks                               |
| ------------------ | ------------------------------------------ |
| Map cannot compile | Format, invalid geometry, paths, error log |`,table:"table-0"},{heading:"diagnose-by-stage",content:`| Symptom     | First checks                                      |
| ----------- | ------------------------------------------------- |
| Leak report | Sealing, entity placement, pointfile/debug output |`,table:"table-0"},{heading:"diagnose-by-stage",content:`| Symptom          | First checks                                                    |
| ---------------- | --------------------------------------------------------------- |
| Missing textures | Source WAD/material references and compile/import configuration |`,table:"table-0"},{heading:"diagnose-by-stage",content:`| Symptom                 | First checks                                        |
| ----------------------- | --------------------------------------------------- |
| Entity missing or inert | FGD/runtime mismatch, classname, keys, target links |`,table:"table-0"},{heading:"diagnose-by-stage",content:`| Symptom             | First checks                                                    |
| ------------------- | --------------------------------------------------------------- |
| Unexpected darkness | Lights, compile stage, supported settings, engine compatibility |`,table:"table-0"},{heading:"diagnose-by-stage",content:`| Symptom                      | First checks                                      |
| ---------------------------- | ------------------------------------------------- |
| Works only on author's setup | Missing dependencies, asset paths, package layout |`,table:"table-0"},{heading:"diagnose-by-stage",content:"A Quake texture WAD is not a Doom WAD. In the classic Quake workflow, used textures are normally embedded into the compiled BSP; verify custom pipelines and external-asset requirements rather than inferring packaging from a file extension."},{heading:"5-quake-mods-and-assets",content:"The source describes:"},{heading:"5-quake-mods-and-assets",content:"**Arcane Dimensions:** an expanded single-player toolkit."},{heading:"5-quake-mods-and-assets",content:"**Alkaline:** science-fiction/base-oriented content and systems."},{heading:"5-quake-mods-and-assets",content:"**Copper:** a comparatively restrained refinement of vanilla Quake."},{heading:"5-quake-mods-and-assets",content:"**progs_dump:** mapper-facing functionality while broadly retaining familiar weapons and enemies."},{heading:"5-quake-mods-and-assets",content:"**2021 re-release Horde:** mode-specific entity setup and manager."},{heading:"5-quake-mods-and-assets",content:"For any mod:"},{heading:"5-quake-mods-and-assets",content:"Identify exact version and supported engine."},{heading:"5-quake-mods-and-assets",content:"Use matching FGD and mapping documentation."},{heading:"5-quake-mods-and-assets",content:"Study included example/test maps."},{heading:"5-quake-mods-and-assets",content:"Decide whether the release is standalone-with-dependencies or an add-on."},{heading:"5-quake-mods-and-assets",content:"Preserve required licenses and avoid overwriting a parent mod unexpectedly."},{heading:"5-quake-mods-and-assets",content:"Do not assume a January 2022 version named in the book is still latest."},{heading:"5-quake-mods-and-assets",content:"The source describes permissive asset-sharing customs in some communities. **Community etiquette is not a legal license.** Credit is necessary where required but does not replace permission. Prefer official asset releases with clear rights."},{heading:"6-quake-packaging-choose-one-coherent-structure",content:"Use lowercase names without spaces. Prefer a broadly supported ZIP."},{heading:"simple-map-package",content:"For map-related files only, the source accepts the files at the ZIP root:"},{heading:"simple-map-package",content:"mymap.bsp"},{heading:"simple-map-package",content:"mymap.lit, if required"},{heading:"simple-map-package",content:"mymap_readme.txt"},{heading:"simple-map-package",content:"Optional permitted source files"},{heading:"simple-map-package",content:"Explain which maps directory to extract into and how to launch."},{heading:"full-mod-package",content:"Put a mod directory inside the ZIP:"},{heading:"full-mod-package",content:"mymod/maps/mymap.bsp"},{heading:"full-mod-package",content:"mymod/maps/mymap.lit"},{heading:"full-mod-package",content:"mymod/gfx/env/skybox-face.tga"},{heading:"full-mod-package",content:"mymod/sound/mymod/soundname.wav"},{heading:"full-mod-package",content:"mymod/progs/modelname.mdl"},{heading:"full-mod-package",content:"mymod/progs.dat, if custom game code is required"},{heading:"full-mod-package",content:"mymod/readme.txt"},{heading:"full-mod-package",content:"The folder is **sound**, not “sounds.” Keep map files directly within maps rather than an extra nested map directory. Names here are illustrative; actual skybox suffixes must match the engine."},{heading:"full-mod-package",content:"PAK files can preserve the expected internal structure, but require their own packaging workflow."},{heading:"partial-add-on-package",content:"A partial package may contain maps, gfx, sound, and related subdirectories at its root for extraction into an existing mod. State the dependency and destination clearly."},{heading:"partial-add-on-package",content:"Do not overwrite a parent mod's code or assets without an intentional, documented, authorized reason. Do not mix a full mod structure for some files with loose map files for others."},{heading:"test",content:"Install from the ZIP into a clean/separate setup using only the readme. Launch, complete, retry, and check missing files. Never package commercial base-game data merely because it is present locally."},{heading:"fgd-editor-facing-entity-definitions",content:"FGD describes entities, fields, choices, flags, defaults, and editor presentation. It helps an editor expose the runtime game's vocabulary."},{heading:"fgd-editor-facing-entity-definitions",content:"It does **not** implement the entity's runtime behavior. Adding a classname or checkbox to an FGD does not create supporting code in the game."},{heading:"fgd-editor-facing-entity-definitions",content:"Keep definitions synchronized with the actual mod. Use small test entities before exposing large property sets."},{heading:"map-editable-text-geometry-and-entities",content:"Quake-family MAP files generally combine:"},{heading:"map-editable-text-geometry-and-entities",content:"Entities expressed through key/value properties."},{heading:"map-editable-text-geometry-and-entities",content:"World geometry in worldspawn."},{heading:"map-editable-text-geometry-and-entities",content:"Convex brushes defined by planes."},{heading:"map-editable-text-geometry-and-entities",content:"Face texture information."},{heading:"map-editable-text-geometry-and-entities",content:"Format variants differ, including texture projection conventions. Confirm the actual variant before parsing or exporting. Compiled BSP is a different artifact; do not treat editable source and playable output as interchangeable."},{heading:"map-editable-text-geometry-and-entities",content:"When implementing a parser, validate syntax, brush orientation, texture axes, properties, and representative round trips. Consult the specification rather than guessing from one sample cube."},{heading:"mdl-quake-1-model-data",content:"The linked MDL article is a David Henry archival technical specification, marked **GNU Free Documentation License**, with separately licensed sample code."},{heading:"mdl-quake-1-model-data",content:"An independently phrased orientation:"},{heading:"mdl-quake-1-model-data",content:"Binary header and counts describe skins, texture coordinates, triangles, and animation frames."},{heading:"mdl-quake-1-model-data",content:"Vertex data is quantized and reconstructed using scale/translation."},{heading:"mdl-quake-1-model-data",content:"Texture data uses a palette."},{heading:"mdl-quake-1-model-data",content:"Texture seams and front/back triangle relationships require special handling."},{heading:"mdl-quake-1-model-data",content:"Animation blends frame data and uses stored normal references."},{heading:"mdl-quake-1-model-data",content:"This skill does not reproduce its code or tables. If implementing a loader, read the original, retain applicable notices, and validate identifiers, versions, endianness, counts, offsets, truncation, and arithmetic bounds before allocation or indexing. The archived sample is not a security-reviewed parser."},{heading:"mdl-quake-1-model-data",content:"The extension MDL is not a universal interchangeable model format across games."},{heading:"8-use-resource-lists-by-need",content:"**Assets:** the source points to repositories such as Kenney, OpenGameArt, Quaternius, Poly Haven, and ambientCG. Check each actual asset's rights and technical suitability."},{heading:"8-use-resource-lists-by-need",content:"**Talks:** grouped into general design, combat, and nonlinear/sandbox design. Read the description, then inspect the original talk before using it as evidence."},{heading:"8-use-resource-lists-by-need",content:"**Books:** distinguishes generalist theory, industry genre-specific advice, art/reference books, and architecture. A broad theoretical book and a narrow encounter guide solve different problems."},{heading:"8-use-resource-lists-by-need",content:"**Communities:** game-specific groups are often best for tool troubleshooting and actual playtests; art communities are useful for visual critique; criticism venues support other kinds of analysis."},{heading:"8-use-resource-lists-by-need",content:"Do not claim to have consumed everything linked in these directories. The bibliography is a discovery tool, not inherited evidence."},{heading:"deliverable",content:"Recommend a minimal toolchain with its assumptions, a verified test-map pipeline, known compatibility gaps, asset provenance, and a reproducible package. Separate current verification from recommendations copied from the snapshot."}],headings:[{id:"1-select-a-workflow-not-a-fashionable-logo",content:"1. Select a workflow, not a fashionable logo"},{id:"2-trenchbroom-suitability",content:"2. TrenchBroom suitability"},{id:"3-prove-the-smallest-end-to-end-pipeline",content:"3. Prove the smallest end-to-end pipeline"},{id:"4-quake-mapping-pipeline",content:"4. Quake mapping pipeline"},{id:"diagnose-by-stage",content:"Diagnose by stage"},{id:"5-quake-mods-and-assets",content:"5. Quake mods and assets"},{id:"6-quake-packaging-choose-one-coherent-structure",content:"6. Quake packaging: choose one coherent structure"},{id:"simple-map-package",content:"Simple map package"},{id:"full-mod-package",content:"Full mod package"},{id:"partial-add-on-package",content:"Partial add-on package"},{id:"test",content:"Test"},{id:"7-understand-file-format-responsibilities",content:"7. Understand file-format responsibilities"},{id:"fgd-editor-facing-entity-definitions",content:"FGD: editor-facing entity definitions"},{id:"map-editable-text-geometry-and-entities",content:"MAP: editable text geometry and entities"},{id:"mdl-quake-1-model-data",content:"MDL: Quake 1 model data"},{id:"8-use-resource-lists-by-need",content:"8. Use resource lists by need"},{id:"deliverable",content:"Deliverable"}]},r=[{depth:2,url:"#1-select-a-workflow-not-a-fashionable-logo",title:e.jsx(e.Fragment,{children:"1. Select a workflow, not a fashionable logo"})},{depth:2,url:"#2-trenchbroom-suitability",title:e.jsx(e.Fragment,{children:"2. TrenchBroom suitability"})},{depth:2,url:"#3-prove-the-smallest-end-to-end-pipeline",title:e.jsx(e.Fragment,{children:"3. Prove the smallest end-to-end pipeline"})},{depth:2,url:"#4-quake-mapping-pipeline",title:e.jsx(e.Fragment,{children:"4. Quake mapping pipeline"})},{depth:3,url:"#diagnose-by-stage",title:e.jsx(e.Fragment,{children:"Diagnose by stage"})},{depth:2,url:"#5-quake-mods-and-assets",title:e.jsx(e.Fragment,{children:"5. Quake mods and assets"})},{depth:2,url:"#6-quake-packaging-choose-one-coherent-structure",title:e.jsx(e.Fragment,{children:"6. Quake packaging: choose one coherent structure"})},{depth:3,url:"#simple-map-package",title:e.jsx(e.Fragment,{children:"Simple map package"})},{depth:3,url:"#full-mod-package",title:e.jsx(e.Fragment,{children:"Full mod package"})},{depth:3,url:"#partial-add-on-package",title:e.jsx(e.Fragment,{children:"Partial add-on package"})},{depth:3,url:"#test",title:e.jsx(e.Fragment,{children:"Test"})},{depth:2,url:"#7-understand-file-format-responsibilities",title:e.jsx(e.Fragment,{children:"7. Understand file-format responsibilities"})},{depth:3,url:"#fgd-editor-facing-entity-definitions",title:e.jsx(e.Fragment,{children:"FGD: editor-facing entity definitions"})},{depth:3,url:"#map-editable-text-geometry-and-entities",title:e.jsx(e.Fragment,{children:"MAP: editable text geometry and entities"})},{depth:3,url:"#mdl-quake-1-model-data",title:e.jsx(e.Fragment,{children:"MDL: Quake 1 model data"})},{depth:2,url:"#8-use-resource-lists-by-need",title:e.jsx(e.Fragment,{children:"8. Use resource lists by need"})},{depth:2,url:"#deliverable",title:e.jsx(e.Fragment,{children:"Deliverable"})}];function i(t){const n={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Sources: ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/tools",children:"Tools"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/tools/trenchbroom",children:"TrenchBroom"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources",children:"Assets & Resources"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/talks",children:"Recommended talks"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/books",children:"Recommended books"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/quake",children:"Quake resources"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/quake/how-to-package",children:"Quake packaging"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/formats",children:"File formats"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/formats/fgd",children:"FGD"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/formats/map",children:"MAP"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/resources/formats/mdl",children:"MDL"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/appendix/communities",children:"Communities"}),". Adapted and reorganized under CC BY-NC-SA 4.0, except third-party material retains its own rights; see ",e.jsx(n.a,{href:"/docs/skills/level-design/LICENSE/",children:"LICENSE"}),"."]}),`
`,e.jsx(n.h2,{id:"1-select-a-workflow-not-a-fashionable-logo",children:"1. Select a workflow, not a fashionable logo"}),`
`,e.jsx(n.p,{children:"Ask:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Does the game already provide the mechanics the exercise needs?"}),`
`,e.jsx(n.li,{children:"Can the tools represent the required space and entities?"}),`
`,e.jsx(n.li,{children:"How quickly can the designer build, run, observe, and revise?"}),`
`,e.jsx(n.li,{children:"Is there a usable import/build/package pipeline?"}),`
`,e.jsx(n.li,{children:"What platforms, licenses, and community support are available?"}),`
`]}),`
`,e.jsx(n.p,{children:"The book recommends Doom/Quake modding for learning because rules, assets, enemies, and tuning already exist. General engines offer broader possibilities but may require substantial systems work first."}),`
`,e.jsx(n.p,{children:"For 2D, built-in tools may suffice; standalone editors such as Tiled and LDtk support many custom pipelines. For 3D, distinguish level-construction tools from asset-modeling tools. Blender is useful for assets and some construction workflows, but a modeling workflow does not automatically provide playable iteration, entities, collision, or scripting."}),`
`,e.jsx(n.p,{children:"Treat pricing, maintenance, plugin compatibility, and “best tool” claims as snapshot-specific. Verify current documentation before installing or promising support."}),`
`,e.jsx(n.h2,{id:"2-trenchbroom-suitability",children:"2. TrenchBroom suitability"}),`
`,e.jsx(n.p,{children:"TrenchBroom is a cross-platform brush-based editor with a 3D-centered workflow, convex brush validation, clipping, resizing, and texture tools."}),`
`,e.jsx(n.p,{children:"For a non-Quake project, validate three separate integrations:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Geometry:"})," can the target import MAP, compile BSP, or consume an export?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Assets:"})," can textures, materials, and model references resolve correctly?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Entities:"})," can placed objects and key/value properties become actual game objects?"]}),`
`]}),`
`,e.jsx(n.p,{children:"An OBJ export may preserve geometry while losing entity data. A successful mesh import is not evidence that the gameplay pipeline works."}),`
`,e.jsx(n.p,{children:"The snapshot lists integrations such as FuncGodot for Godot, several Unity importers, and HammUEr for Unreal. These are pointers, not a compatibility guarantee. Check target versions, maintenance, licenses, collision, materials, entities, and reimport behavior."}),`
`,e.jsx(n.p,{children:"Use TrenchBroom for construction and markup if that is its strength; complex choreography may be better authored natively in the target engine."}),`
`,e.jsx(n.h2,{id:"3-prove-the-smallest-end-to-end-pipeline",children:"3. Prove the smallest end-to-end pipeline"}),`
`,e.jsx(n.p,{children:"Before building a large map:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Configure the target game, paths, map format, and entity definitions."}),`
`,e.jsx(n.li,{children:"Make a sealed test room with a start and simple light."}),`
`,e.jsx(n.li,{children:"Add one texture and one representative entity/interaction."}),`
`,e.jsx(n.li,{children:"Build or import it."}),`
`,e.jsx(n.li,{children:"Run with the real controller."}),`
`,e.jsx(n.li,{children:"Change something and verify reimport/rebuild."}),`
`,e.jsx(n.li,{children:"Package and run from a separate location."}),`
`]}),`
`,e.jsx(n.p,{children:"Do not auto-install executables or plugins merely because the book links them. Follow project approval and dependency-security rules."}),`
`,e.jsx(n.h2,{id:"4-quake-mapping-pipeline",children:"4. Quake mapping pipeline"}),`
`,e.jsx(n.p,{children:"A typical classic pipeline uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Editable MAP source."}),`
`,e.jsx(n.li,{children:"Appropriate game/mod FGD definitions and texture sources."}),`
`,e.jsx(n.li,{children:"A compiler toolchain."}),`
`,e.jsx(n.li,{children:"A compatible engine/source port."}),`
`,e.jsx(n.li,{children:"The required legally obtained base-game data."}),`
`]}),`
`,e.jsx(n.p,{children:"The source recommends EricW tools for Quake:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"qbsp:"})," constructs compiled geometry and reports relevant errors such as leaks."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"vis:"})," computes potentially visible sets used for visibility management."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"light:"})," builds lighting information."]}),`
`]}),`
`,e.jsx(n.p,{children:"Use the actual tool versions' documentation for flags and limits. Fast iteration settings and final-quality settings may differ; record the profile used."}),`
`,e.jsx(n.h3,{id:"diagnose-by-stage",children:"Diagnose by stage"}),`

































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Symptom"}),e.jsx(n.th,{children:"First checks"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Map cannot compile"}),e.jsx(n.td,{children:"Format, invalid geometry, paths, error log"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Leak report"}),e.jsx(n.td,{children:"Sealing, entity placement, pointfile/debug output"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Missing textures"}),e.jsx(n.td,{children:"Source WAD/material references and compile/import configuration"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Entity missing or inert"}),e.jsx(n.td,{children:"FGD/runtime mismatch, classname, keys, target links"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Unexpected darkness"}),e.jsx(n.td,{children:"Lights, compile stage, supported settings, engine compatibility"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Works only on author's setup"}),e.jsx(n.td,{children:"Missing dependencies, asset paths, package layout"})]})]})]}),`
`,e.jsx(n.p,{children:"A Quake texture WAD is not a Doom WAD. In the classic Quake workflow, used textures are normally embedded into the compiled BSP; verify custom pipelines and external-asset requirements rather than inferring packaging from a file extension."}),`
`,e.jsx(n.h2,{id:"5-quake-mods-and-assets",children:"5. Quake mods and assets"}),`
`,e.jsx(n.p,{children:"The source describes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arcane Dimensions:"})," an expanded single-player toolkit."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Alkaline:"})," science-fiction/base-oriented content and systems."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Copper:"})," a comparatively restrained refinement of vanilla Quake."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"progs_dump:"})," mapper-facing functionality while broadly retaining familiar weapons and enemies."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"2021 re-release Horde:"})," mode-specific entity setup and manager."]}),`
`]}),`
`,e.jsx(n.p,{children:"For any mod:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Identify exact version and supported engine."}),`
`,e.jsx(n.li,{children:"Use matching FGD and mapping documentation."}),`
`,e.jsx(n.li,{children:"Study included example/test maps."}),`
`,e.jsx(n.li,{children:"Decide whether the release is standalone-with-dependencies or an add-on."}),`
`,e.jsx(n.li,{children:"Preserve required licenses and avoid overwriting a parent mod unexpectedly."}),`
`]}),`
`,e.jsx(n.p,{children:"Do not assume a January 2022 version named in the book is still latest."}),`
`,e.jsxs(n.p,{children:["The source describes permissive asset-sharing customs in some communities. ",e.jsx(n.strong,{children:"Community etiquette is not a legal license."})," Credit is necessary where required but does not replace permission. Prefer official asset releases with clear rights."]}),`
`,e.jsx(n.h2,{id:"6-quake-packaging-choose-one-coherent-structure",children:"6. Quake packaging: choose one coherent structure"}),`
`,e.jsx(n.p,{children:"Use lowercase names without spaces. Prefer a broadly supported ZIP."}),`
`,e.jsx(n.h3,{id:"simple-map-package",children:"Simple map package"}),`
`,e.jsx(n.p,{children:"For map-related files only, the source accepts the files at the ZIP root:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"mymap.bsp"}),`
`,e.jsx(n.li,{children:"mymap.lit, if required"}),`
`,e.jsx(n.li,{children:"mymap_readme.txt"}),`
`,e.jsx(n.li,{children:"Optional permitted source files"}),`
`]}),`
`,e.jsx(n.p,{children:"Explain which maps directory to extract into and how to launch."}),`
`,e.jsx(n.h3,{id:"full-mod-package",children:"Full mod package"}),`
`,e.jsx(n.p,{children:"Put a mod directory inside the ZIP:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"mymod/maps/mymap.bsp"}),`
`,e.jsx(n.li,{children:"mymod/maps/mymap.lit"}),`
`,e.jsx(n.li,{children:"mymod/gfx/env/skybox-face.tga"}),`
`,e.jsx(n.li,{children:"mymod/sound/mymod/soundname.wav"}),`
`,e.jsx(n.li,{children:"mymod/progs/modelname.mdl"}),`
`,e.jsx(n.li,{children:"mymod/progs.dat, if custom game code is required"}),`
`,e.jsx(n.li,{children:"mymod/readme.txt"}),`
`]}),`
`,e.jsxs(n.p,{children:["The folder is ",e.jsx(n.strong,{children:"sound"}),", not “sounds.” Keep map files directly within maps rather than an extra nested map directory. Names here are illustrative; actual skybox suffixes must match the engine."]}),`
`,e.jsx(n.p,{children:"PAK files can preserve the expected internal structure, but require their own packaging workflow."}),`
`,e.jsx(n.h3,{id:"partial-add-on-package",children:"Partial add-on package"}),`
`,e.jsx(n.p,{children:"A partial package may contain maps, gfx, sound, and related subdirectories at its root for extraction into an existing mod. State the dependency and destination clearly."}),`
`,e.jsx(n.p,{children:"Do not overwrite a parent mod's code or assets without an intentional, documented, authorized reason. Do not mix a full mod structure for some files with loose map files for others."}),`
`,e.jsx(n.h3,{id:"test",children:"Test"}),`
`,e.jsx(n.p,{children:"Install from the ZIP into a clean/separate setup using only the readme. Launch, complete, retry, and check missing files. Never package commercial base-game data merely because it is present locally."}),`
`,e.jsx(n.h2,{id:"7-understand-file-format-responsibilities",children:"7. Understand file-format responsibilities"}),`
`,e.jsx(n.h3,{id:"fgd-editor-facing-entity-definitions",children:"FGD: editor-facing entity definitions"}),`
`,e.jsx(n.p,{children:"FGD describes entities, fields, choices, flags, defaults, and editor presentation. It helps an editor expose the runtime game's vocabulary."}),`
`,e.jsxs(n.p,{children:["It does ",e.jsx(n.strong,{children:"not"})," implement the entity's runtime behavior. Adding a classname or checkbox to an FGD does not create supporting code in the game."]}),`
`,e.jsx(n.p,{children:"Keep definitions synchronized with the actual mod. Use small test entities before exposing large property sets."}),`
`,e.jsx(n.h3,{id:"map-editable-text-geometry-and-entities",children:"MAP: editable text geometry and entities"}),`
`,e.jsx(n.p,{children:"Quake-family MAP files generally combine:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Entities expressed through key/value properties."}),`
`,e.jsx(n.li,{children:"World geometry in worldspawn."}),`
`,e.jsx(n.li,{children:"Convex brushes defined by planes."}),`
`,e.jsx(n.li,{children:"Face texture information."}),`
`]}),`
`,e.jsx(n.p,{children:"Format variants differ, including texture projection conventions. Confirm the actual variant before parsing or exporting. Compiled BSP is a different artifact; do not treat editable source and playable output as interchangeable."}),`
`,e.jsx(n.p,{children:"When implementing a parser, validate syntax, brush orientation, texture axes, properties, and representative round trips. Consult the specification rather than guessing from one sample cube."}),`
`,e.jsx(n.h3,{id:"mdl-quake-1-model-data",children:"MDL: Quake 1 model data"}),`
`,e.jsxs(n.p,{children:["The linked MDL article is a David Henry archival technical specification, marked ",e.jsx(n.strong,{children:"GNU Free Documentation License"}),", with separately licensed sample code."]}),`
`,e.jsx(n.p,{children:"An independently phrased orientation:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Binary header and counts describe skins, texture coordinates, triangles, and animation frames."}),`
`,e.jsx(n.li,{children:"Vertex data is quantized and reconstructed using scale/translation."}),`
`,e.jsx(n.li,{children:"Texture data uses a palette."}),`
`,e.jsx(n.li,{children:"Texture seams and front/back triangle relationships require special handling."}),`
`,e.jsx(n.li,{children:"Animation blends frame data and uses stored normal references."}),`
`]}),`
`,e.jsx(n.p,{children:"This skill does not reproduce its code or tables. If implementing a loader, read the original, retain applicable notices, and validate identifiers, versions, endianness, counts, offsets, truncation, and arithmetic bounds before allocation or indexing. The archived sample is not a security-reviewed parser."}),`
`,e.jsx(n.p,{children:"The extension MDL is not a universal interchangeable model format across games."}),`
`,e.jsx(n.h2,{id:"8-use-resource-lists-by-need",children:"8. Use resource lists by need"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Assets:"})," the source points to repositories such as Kenney, OpenGameArt, Quaternius, Poly Haven, and ambientCG. Check each actual asset's rights and technical suitability."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Talks:"})," grouped into general design, combat, and nonlinear/sandbox design. Read the description, then inspect the original talk before using it as evidence."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Books:"})," distinguishes generalist theory, industry genre-specific advice, art/reference books, and architecture. A broad theoretical book and a narrow encounter guide solve different problems."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Communities:"})," game-specific groups are often best for tool troubleshooting and actual playtests; art communities are useful for visual critique; criticism venues support other kinds of analysis."]}),`
`]}),`
`,e.jsx(n.p,{children:"Do not claim to have consumed everything linked in these directories. The bibliography is a discovery tool, not inherited evidence."}),`
`,e.jsx(n.h2,{id:"deliverable",children:"Deliverable"}),`
`,e.jsx(n.p,{children:"Recommend a minimal toolchain with its assumptions, a verified test-map pipeline, known compatibility gaps, asset provenance, and a reproducible package. Separate current verification from recommendations copied from the snapshot."})]})}function l(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{l as default,s as frontmatter,o as structuredData,r as toc};
