import{j as e}from"./jsx-runtime-BE0eTAub.js?v=20261021-pages-ready";let s={title:"Blockout, Massing, Landscape, Composition, and Metrics",description:"Plan graybox massing, terrain, composition and player-scale metrics before committing to finished environment art."},o={contents:[{heading:void 0,content:"Sources: Blockout, Massing, Landscape, Composition, Prospect-refuge, Metrics, Modular kit design, Doom metrics, Quake metrics. Adapted and reorganized under CC BY-NC-SA 4.0."},{heading:"1-make-a-spatial-hypothesis-cheap-to-change",content:"A **blockout**, **blockmesh**, or **graybox** is a playable rough draft made from inexpensive shapes. Its purpose is to test foundational relationships before detail makes revision costly."},{heading:"1-make-a-spatial-hypothesis-cheap-to-change",content:"It must contain what the question depends on:"},{heading:"1-make-a-spatial-hypothesis-cheap-to-change",content:"Representative player movement, camera, collision, and interaction."},{heading:"1-make-a-spatial-hypothesis-cheap-to-change",content:"Important height changes, views, route connections, and boundaries."},{heading:"1-make-a-spatial-hypothesis-cheap-to-change",content:"Necessary enemy behavior, objectives, and provisional script events."},{heading:"1-make-a-spatial-hypothesis-cheap-to-change",content:"Enough lighting and distinction to understand the intended information."},{heading:"1-make-a-spatial-hypothesis-cheap-to-change",content:"It need not be uniformly gray. Temporary colors, labels, props, or sounds are appropriate if they convey information essential to testing. Conversely, polished assets do not establish that a blockout works."},{heading:"a-useful-iteration-loop",content:"Choose one uncertainty: “Can players identify the lower flank before committing?”"},{heading:"a-useful-iteration-loop",content:"Build the smallest connected situation that contains it."},{heading:"a-useful-iteration-loop",content:"Play in the actual controller, not only the editor camera."},{heading:"a-useful-iteration-loop",content:"Observe behavior and distinguish spatial failure from missing rules or information."},{heading:"a-useful-iteration-loop",content:"Revise and repeat; preserve cheap editability until the relationship is credible."},{heading:"a-useful-iteration-loop",content:"Do not build an entire campaign before validating its repeated spatial grammar."},{heading:"2-massing-organize-solid-and-empty-volumes",content:"**Massing** concerns the arrangement, scale, and relationships of large forms. Design the spaces between masses as deliberately as the masses themselves."},{heading:"2-massing-organize-solid-and-empty-volumes",content:"Work from:"},{heading:"2-massing-organize-solid-and-empty-volumes",content:"Major ground levels and broad volumes."},{heading:"2-massing-organize-solid-and-empty-volumes",content:"Important openings, thresholds, and connections."},{heading:"2-massing-organize-solid-and-empty-volumes",content:"Sightline blockers, overlooks, and distinct silhouettes."},{heading:"2-massing-organize-solid-and-empty-volumes",content:"Smaller supporting shapes only after the larger relationships work."},{heading:"2-massing-organize-solid-and-empty-volumes",content:"Ask whether the player can distinguish foreground, accessible middle distance, distant destination, and nonplayable background. A large decorative form can accidentally suggest an inaccessible route."},{heading:"2-massing-organize-solid-and-empty-volumes",content:"**Example:** a courtyard is visually impressive but feels flat. Before adding props, test a raised entrance, an occluded side route, and an overlook that changes what the player knows and can do."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Think in landforms and relationships: ridges, valleys, slopes, plateaus, basins, water, vegetation, paths, and constructed edges."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Use terrain to:"},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Reveal and conceal destinations."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Guide movement without enclosing everything in walls."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Offer distinct approaches and changes of exposure."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Separate regions and establish memorable transitions."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Check:"},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Actual slope and step handling of the controller."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Traversable versus decorative ground."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Fall recovery and unintentional climbing routes."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"AI navigation, collision seams, and foliage readability."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Whether water and drainage make spatial sense where realism matters."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Long-distance visibility, streaming, and performance."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Choose heightfields, meshes, brushes, or hybrid methods according to topology and tools. A heightfield is convenient for broad terrain but cannot express every overhang or stacked space by itself."},{heading:"3-landscape-is-playable-organization-not-terrain-noise",content:"Landscape architecture is useful for studying sequence, enclosure, paths, planting, use, and maintenance—not merely for collecting scenic images."},{heading:"4-composition-in-a-space-the-camera-can-leave",content:"Composition organizes visual relationships. A staged view and a traversable 3D composition are related but not equivalent."},{heading:"4-composition-in-a-space-the-camera-can-leave",content:"Evaluate entrances, approaches, moving views, reverse views, and combat views."},{heading:"4-composition-in-a-space-the-camera-can-leave",content:"Use landmarks and distinct large forms to anchor orientation."},{heading:"4-composition-in-a-space-the-camera-can-leave",content:"Establish hierarchy with scale, silhouette, depth, value, framing, motion, and contrast."},{heading:"4-composition-in-a-space-the-camera-can-leave",content:"Give a vista a gameplay or interpretive purpose rather than making it a mandatory postcard."},{heading:"4-composition-in-a-space-the-camera-can-leave",content:"The source challenges simplistic claims about **leading lines**. A line in a screenshot does not guarantee that a freely moving player will look along it. Use such hypotheses as testable possibilities, not eye-tracking facts."},{heading:"4-composition-in-a-space-the-camera-can-leave",content:"Avoid optimizing a single promotional camera while normal play produces obstruction, flatness, or misleading routes."},{heading:"5-prospect-and-refuge",content:"**Prospect** concerns the ability to survey; **refuge** concerns protection or concealment. Their relationship can help design staging areas, thresholds, overlooks, and transitions into danger."},{heading:"5-prospect-and-refuge",content:"Separate:"},{heading:"5-prospect-and-refuge",content:"Perceived safety."},{heading:"5-prospect-and-refuge",content:"Actual mechanical protection."},{heading:"5-prospect-and-refuge",content:"Information available from the position."},{heading:"5-prospect-and-refuge",content:"Cost of remaining there or advancing."},{heading:"5-prospect-and-refuge",content:"A protected overlook may let players plan before entering an exposed space. Whether it feels safe depends on camera, threats, culture, and prior experience. Do not present the theory as a universal explanation of human preference or a guarantee of good design."},{heading:"6-metrics-are-a-tested-contract-with-mechanics",content:"**Metrics** are useful dimensions and gameplay quantities: clearances, heights, movement distances, ranges, timings, and related values."},{heading:"6-metrics-are-a-tested-contract-with-mechanics",content:"Do not import realistic dimensions or another game's numbers as authoritative defaults. Camera field of view, collision volume, animation, movement acceleration, jump rules, and input tolerance change the result."},{heading:"build-a-metrics-playground",content:`| Test                 | Record                                                             |
| -------------------- | ------------------------------------------------------------------ |
| Doorway and corridor | Minimum passage, comfortable passage, turning and camera clearance |`,table:"table-0"},{heading:"build-a-metrics-playground",content:`| Test             | Record                                                           |
| ---------------- | ---------------------------------------------------------------- |
| Stairs and slope | Step limit, slope limit, collision behavior, movement smoothness |`,table:"table-0"},{heading:"build-a-metrics-playground",content:`| Test          | Record                                                                |
| ------------- | --------------------------------------------------------------------- |
| Jump and drop | Repeatable reach, marginal reach, landing tolerance, fall consequence |`,table:"table-0"},{heading:"build-a-metrics-playground",content:`| Test  | Record                                                                   |
| ----- | ------------------------------------------------------------------------ |
| Cover | Standing/crouched sightline, fire origin, edge exposure, camera mismatch |`,table:"table-0"},{heading:"build-a-metrics-playground",content:`| Test        | Record                                                         |
| ----------- | -------------------------------------------------------------- |
| Interaction | Reach, facing requirements, usable space, obstruction behavior |`,table:"table-0"},{heading:"build-a-metrics-playground",content:`| Test           | Record                                                 |
| -------------- | ------------------------------------------------------ |
| Enemy movement | Agent dimensions, turning, links, pursuit and crowding |`,table:"table-0"},{heading:"build-a-metrics-playground",content:`| Test   | Record                                                      |
| ------ | ----------------------------------------------------------- |
| Travel | Time under normal, sprinting, cautious, and combat movement |`,table:"table-0"},{heading:"build-a-metrics-playground",content:"Distinguish a theoretical maximum, an expert-reproducible limit, and a reliable ordinary action. Build the level around the intended audience's conditions, not the author's perfect attempt."},{heading:"build-a-metrics-playground",content:"Record units, controller/configuration version, test conditions, and evidence. Changing movement or camera settings can invalidate earlier measurements."},{heading:"7-grid-and-modular-kits",content:"A grid supports alignment, repeatable construction, and collaboration. It is a tool, not a reason to force every relationship into the same module."},{heading:"7-grid-and-modular-kits",content:"Before producing a large kit:"},{heading:"7-grid-and-modular-kits",content:"Establish scale, pivot conventions, snapping increments, and connection rules."},{heading:"7-grid-and-modular-kits",content:"Make a small kit covering a real test room and its transitions."},{heading:"7-grid-and-modular-kits",content:"Test corners, doorways, stairs, floor changes, ends, and unusual junctions."},{heading:"7-grid-and-modular-kits",content:"Check collision, seams, material scale, lighting, and navigation."},{heading:"7-grid-and-modular-kits",content:"Expand only after the pilot reveals the missing pieces."},{heading:"7-grid-and-modular-kits",content:"Modularity trades unique control for reuse and consistency. Use bespoke pieces when a meaningful relationship cannot be expressed economically by the kit."},{heading:"7-grid-and-modular-kits",content:"Do not finalize an art kit around dimensions that have not survived controller tests."},{heading:"8-doom-and-quake-data-use-as-game-specific-references",content:"The source pages include dimensions, weapons, damage, monsters, movement, and related mapping data. They are reference tables, not universal tuning standards."},{heading:"8-doom-and-quake-data-use-as-game-specific-references",content:"Identify the game, engine/source port, mod, skill setting, and changed mechanics."},{heading:"8-doom-and-quake-data-use-as-game-specific-references",content:"Keep map units distinct from physical units."},{heading:"8-doom-and-quake-data-use-as-game-specific-references",content:"Validate apparent numerical advantages in combat: aiming, dodging, infighting, cover, vertical separation, and enemy composition affect actual outcomes."},{heading:"8-doom-and-quake-data-use-as-game-specific-references",content:"Doom-derived and Quake-derived engines have different geometric and movement assumptions. Source-port extensions can change those assumptions again."},{heading:"8-doom-and-quake-data-use-as-game-specific-references",content:"Consult the linked tables for the relevant version; do not silently transplant values into another engine."},{heading:"blockout-exit-questions",content:"These are proposed decision checks, not an original universal milestone:"},{heading:"blockout-exit-questions",content:"Can the intended activity be played from entry to completion?"},{heading:"blockout-exit-questions",content:"Are the important spatial relationships understandable under ordinary play?"},{heading:"blockout-exit-questions",content:"Are metrics and core mechanic assumptions documented?"},{heading:"blockout-exit-questions",content:"Have the riskiest paths, retries, and alternate approaches been exercised?"},{heading:"blockout-exit-questions",content:"Is there enough evidence to justify more expensive art and scripting?"},{heading:"blockout-exit-questions",content:"If not, name the uncertainty rather than declaring the level “finished except for polish.”"}],headings:[{id:"1-make-a-spatial-hypothesis-cheap-to-change",content:"1. Make a spatial hypothesis cheap to change"},{id:"a-useful-iteration-loop",content:"A useful iteration loop"},{id:"2-massing-organize-solid-and-empty-volumes",content:"2. Massing: organize solid and empty volumes"},{id:"3-landscape-is-playable-organization-not-terrain-noise",content:"3. Landscape is playable organization, not terrain noise"},{id:"4-composition-in-a-space-the-camera-can-leave",content:"4. Composition in a space the camera can leave"},{id:"5-prospect-and-refuge",content:"5. Prospect and refuge"},{id:"6-metrics-are-a-tested-contract-with-mechanics",content:"6. Metrics are a tested contract with mechanics"},{id:"build-a-metrics-playground",content:"Build a metrics playground"},{id:"7-grid-and-modular-kits",content:"7. Grid and modular kits"},{id:"8-doom-and-quake-data-use-as-game-specific-references",content:"8. Doom and Quake data: use as game-specific references"},{id:"blockout-exit-questions",content:"Blockout exit questions"}]},r=[{depth:2,url:"#1-make-a-spatial-hypothesis-cheap-to-change",title:e.jsx(e.Fragment,{children:"1. Make a spatial hypothesis cheap to change"})},{depth:3,url:"#a-useful-iteration-loop",title:e.jsx(e.Fragment,{children:"A useful iteration loop"})},{depth:2,url:"#2-massing-organize-solid-and-empty-volumes",title:e.jsx(e.Fragment,{children:"2. Massing: organize solid and empty volumes"})},{depth:2,url:"#3-landscape-is-playable-organization-not-terrain-noise",title:e.jsx(e.Fragment,{children:"3. Landscape is playable organization, not terrain noise"})},{depth:2,url:"#4-composition-in-a-space-the-camera-can-leave",title:e.jsx(e.Fragment,{children:"4. Composition in a space the camera can leave"})},{depth:2,url:"#5-prospect-and-refuge",title:e.jsx(e.Fragment,{children:"5. Prospect and refuge"})},{depth:2,url:"#6-metrics-are-a-tested-contract-with-mechanics",title:e.jsx(e.Fragment,{children:"6. Metrics are a tested contract with mechanics"})},{depth:3,url:"#build-a-metrics-playground",title:e.jsx(e.Fragment,{children:"Build a metrics playground"})},{depth:2,url:"#7-grid-and-modular-kits",title:e.jsx(e.Fragment,{children:"7. Grid and modular kits"})},{depth:2,url:"#8-doom-and-quake-data-use-as-game-specific-references",title:e.jsx(e.Fragment,{children:"8. Doom and Quake data: use as game-specific references"})},{depth:2,url:"#blockout-exit-questions",title:e.jsx(e.Fragment,{children:"Blockout exit questions"})}];function t(a){const n={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...a.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Sources: ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout",children:"Blockout"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/massing",children:"Massing"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/massing/landscape",children:"Landscape"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/massing/composition",children:"Composition"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/massing/prospect-refuge",children:"Prospect-refuge"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/metrics",children:"Metrics"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/metrics/modular",children:"Modular kit design"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/metrics/doom",children:"Doom metrics"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/blockout/metrics/quake",children:"Quake metrics"}),". Adapted and reorganized under CC BY-NC-SA 4.0."]}),`
`,e.jsx(n.h2,{id:"1-make-a-spatial-hypothesis-cheap-to-change",children:"1. Make a spatial hypothesis cheap to change"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.strong,{children:"blockout"}),", ",e.jsx(n.strong,{children:"blockmesh"}),", or ",e.jsx(n.strong,{children:"graybox"})," is a playable rough draft made from inexpensive shapes. Its purpose is to test foundational relationships before detail makes revision costly."]}),`
`,e.jsx(n.p,{children:"It must contain what the question depends on:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Representative player movement, camera, collision, and interaction."}),`
`,e.jsx(n.li,{children:"Important height changes, views, route connections, and boundaries."}),`
`,e.jsx(n.li,{children:"Necessary enemy behavior, objectives, and provisional script events."}),`
`,e.jsx(n.li,{children:"Enough lighting and distinction to understand the intended information."}),`
`]}),`
`,e.jsx(n.p,{children:"It need not be uniformly gray. Temporary colors, labels, props, or sounds are appropriate if they convey information essential to testing. Conversely, polished assets do not establish that a blockout works."}),`
`,e.jsx(n.h3,{id:"a-useful-iteration-loop",children:"A useful iteration loop"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Choose one uncertainty: “Can players identify the lower flank before committing?”"}),`
`,e.jsx(n.li,{children:"Build the smallest connected situation that contains it."}),`
`,e.jsx(n.li,{children:"Play in the actual controller, not only the editor camera."}),`
`,e.jsx(n.li,{children:"Observe behavior and distinguish spatial failure from missing rules or information."}),`
`,e.jsx(n.li,{children:"Revise and repeat; preserve cheap editability until the relationship is credible."}),`
`]}),`
`,e.jsx(n.p,{children:"Do not build an entire campaign before validating its repeated spatial grammar."}),`
`,e.jsx(n.h2,{id:"2-massing-organize-solid-and-empty-volumes",children:"2. Massing: organize solid and empty volumes"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Massing"})," concerns the arrangement, scale, and relationships of large forms. Design the spaces between masses as deliberately as the masses themselves."]}),`
`,e.jsx(n.p,{children:"Work from:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Major ground levels and broad volumes."}),`
`,e.jsx(n.li,{children:"Important openings, thresholds, and connections."}),`
`,e.jsx(n.li,{children:"Sightline blockers, overlooks, and distinct silhouettes."}),`
`,e.jsx(n.li,{children:"Smaller supporting shapes only after the larger relationships work."}),`
`]}),`
`,e.jsx(n.p,{children:"Ask whether the player can distinguish foreground, accessible middle distance, distant destination, and nonplayable background. A large decorative form can accidentally suggest an inaccessible route."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," a courtyard is visually impressive but feels flat. Before adding props, test a raised entrance, an occluded side route, and an overlook that changes what the player knows and can do."]}),`
`,e.jsx(n.h2,{id:"3-landscape-is-playable-organization-not-terrain-noise",children:"3. Landscape is playable organization, not terrain noise"}),`
`,e.jsx(n.p,{children:"Think in landforms and relationships: ridges, valleys, slopes, plateaus, basins, water, vegetation, paths, and constructed edges."}),`
`,e.jsx(n.p,{children:"Use terrain to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Reveal and conceal destinations."}),`
`,e.jsx(n.li,{children:"Guide movement without enclosing everything in walls."}),`
`,e.jsx(n.li,{children:"Offer distinct approaches and changes of exposure."}),`
`,e.jsx(n.li,{children:"Separate regions and establish memorable transitions."}),`
`]}),`
`,e.jsx(n.p,{children:"Check:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Actual slope and step handling of the controller."}),`
`,e.jsx(n.li,{children:"Traversable versus decorative ground."}),`
`,e.jsx(n.li,{children:"Fall recovery and unintentional climbing routes."}),`
`,e.jsx(n.li,{children:"AI navigation, collision seams, and foliage readability."}),`
`,e.jsx(n.li,{children:"Whether water and drainage make spatial sense where realism matters."}),`
`,e.jsx(n.li,{children:"Long-distance visibility, streaming, and performance."}),`
`]}),`
`,e.jsx(n.p,{children:"Choose heightfields, meshes, brushes, or hybrid methods according to topology and tools. A heightfield is convenient for broad terrain but cannot express every overhang or stacked space by itself."}),`
`,e.jsx(n.p,{children:"Landscape architecture is useful for studying sequence, enclosure, paths, planting, use, and maintenance—not merely for collecting scenic images."}),`
`,e.jsx(n.h2,{id:"4-composition-in-a-space-the-camera-can-leave",children:"4. Composition in a space the camera can leave"}),`
`,e.jsx(n.p,{children:"Composition organizes visual relationships. A staged view and a traversable 3D composition are related but not equivalent."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Evaluate entrances, approaches, moving views, reverse views, and combat views."}),`
`,e.jsx(n.li,{children:"Use landmarks and distinct large forms to anchor orientation."}),`
`,e.jsx(n.li,{children:"Establish hierarchy with scale, silhouette, depth, value, framing, motion, and contrast."}),`
`,e.jsx(n.li,{children:"Give a vista a gameplay or interpretive purpose rather than making it a mandatory postcard."}),`
`]}),`
`,e.jsxs(n.p,{children:["The source challenges simplistic claims about ",e.jsx(n.strong,{children:"leading lines"}),". A line in a screenshot does not guarantee that a freely moving player will look along it. Use such hypotheses as testable possibilities, not eye-tracking facts."]}),`
`,e.jsx(n.p,{children:"Avoid optimizing a single promotional camera while normal play produces obstruction, flatness, or misleading routes."}),`
`,e.jsx(n.h2,{id:"5-prospect-and-refuge",children:"5. Prospect and refuge"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Prospect"})," concerns the ability to survey; ",e.jsx(n.strong,{children:"refuge"})," concerns protection or concealment. Their relationship can help design staging areas, thresholds, overlooks, and transitions into danger."]}),`
`,e.jsx(n.p,{children:"Separate:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Perceived safety."}),`
`,e.jsx(n.li,{children:"Actual mechanical protection."}),`
`,e.jsx(n.li,{children:"Information available from the position."}),`
`,e.jsx(n.li,{children:"Cost of remaining there or advancing."}),`
`]}),`
`,e.jsx(n.p,{children:"A protected overlook may let players plan before entering an exposed space. Whether it feels safe depends on camera, threats, culture, and prior experience. Do not present the theory as a universal explanation of human preference or a guarantee of good design."}),`
`,e.jsx(n.h2,{id:"6-metrics-are-a-tested-contract-with-mechanics",children:"6. Metrics are a tested contract with mechanics"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Metrics"})," are useful dimensions and gameplay quantities: clearances, heights, movement distances, ranges, timings, and related values."]}),`
`,e.jsx(n.p,{children:"Do not import realistic dimensions or another game's numbers as authoritative defaults. Camera field of view, collision volume, animation, movement acceleration, jump rules, and input tolerance change the result."}),`
`,e.jsx(n.h3,{id:"build-a-metrics-playground",children:"Build a metrics playground"}),`





































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Test"}),e.jsx(n.th,{children:"Record"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Doorway and corridor"}),e.jsx(n.td,{children:"Minimum passage, comfortable passage, turning and camera clearance"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Stairs and slope"}),e.jsx(n.td,{children:"Step limit, slope limit, collision behavior, movement smoothness"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Jump and drop"}),e.jsx(n.td,{children:"Repeatable reach, marginal reach, landing tolerance, fall consequence"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Cover"}),e.jsx(n.td,{children:"Standing/crouched sightline, fire origin, edge exposure, camera mismatch"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Interaction"}),e.jsx(n.td,{children:"Reach, facing requirements, usable space, obstruction behavior"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Enemy movement"}),e.jsx(n.td,{children:"Agent dimensions, turning, links, pursuit and crowding"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Travel"}),e.jsx(n.td,{children:"Time under normal, sprinting, cautious, and combat movement"})]})]})]}),`
`,e.jsx(n.p,{children:"Distinguish a theoretical maximum, an expert-reproducible limit, and a reliable ordinary action. Build the level around the intended audience's conditions, not the author's perfect attempt."}),`
`,e.jsx(n.p,{children:"Record units, controller/configuration version, test conditions, and evidence. Changing movement or camera settings can invalidate earlier measurements."}),`
`,e.jsx(n.h2,{id:"7-grid-and-modular-kits",children:"7. Grid and modular kits"}),`
`,e.jsx(n.p,{children:"A grid supports alignment, repeatable construction, and collaboration. It is a tool, not a reason to force every relationship into the same module."}),`
`,e.jsx(n.p,{children:"Before producing a large kit:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Establish scale, pivot conventions, snapping increments, and connection rules."}),`
`,e.jsx(n.li,{children:"Make a small kit covering a real test room and its transitions."}),`
`,e.jsx(n.li,{children:"Test corners, doorways, stairs, floor changes, ends, and unusual junctions."}),`
`,e.jsx(n.li,{children:"Check collision, seams, material scale, lighting, and navigation."}),`
`,e.jsx(n.li,{children:"Expand only after the pilot reveals the missing pieces."}),`
`]}),`
`,e.jsx(n.p,{children:"Modularity trades unique control for reuse and consistency. Use bespoke pieces when a meaningful relationship cannot be expressed economically by the kit."}),`
`,e.jsx(n.p,{children:"Do not finalize an art kit around dimensions that have not survived controller tests."}),`
`,e.jsx(n.h2,{id:"8-doom-and-quake-data-use-as-game-specific-references",children:"8. Doom and Quake data: use as game-specific references"}),`
`,e.jsx(n.p,{children:"The source pages include dimensions, weapons, damage, monsters, movement, and related mapping data. They are reference tables, not universal tuning standards."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Identify the game, engine/source port, mod, skill setting, and changed mechanics."}),`
`,e.jsx(n.li,{children:"Keep map units distinct from physical units."}),`
`,e.jsx(n.li,{children:"Validate apparent numerical advantages in combat: aiming, dodging, infighting, cover, vertical separation, and enemy composition affect actual outcomes."}),`
`,e.jsx(n.li,{children:"Doom-derived and Quake-derived engines have different geometric and movement assumptions. Source-port extensions can change those assumptions again."}),`
`,e.jsx(n.li,{children:"Consult the linked tables for the relevant version; do not silently transplant values into another engine."}),`
`]}),`
`,e.jsx(n.h2,{id:"blockout-exit-questions",children:"Blockout exit questions"}),`
`,e.jsx(n.p,{children:"These are proposed decision checks, not an original universal milestone:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Can the intended activity be played from entry to completion?"}),`
`,e.jsx(n.li,{children:"Are the important spatial relationships understandable under ordinary play?"}),`
`,e.jsx(n.li,{children:"Are metrics and core mechanic assumptions documented?"}),`
`,e.jsx(n.li,{children:"Have the riskiest paths, retries, and alternate approaches been exercised?"}),`
`,e.jsx(n.li,{children:"Is there enough evidence to justify more expensive art and scripting?"}),`
`]}),`
`,e.jsx(n.p,{children:"If not, name the uncertainty rather than declaring the level “finished except for polish.”"})]})}function l(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(t,{...a})}):t(a)}export{l as default,s as frontmatter,o as structuredData,r as toc};
