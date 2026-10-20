import{j as e}from"./jsx-runtime-BE0eTAub.js";let a={title:"Level Design: From Intended Experience to Tested Space",description:"Route a level-design task from player intent and research through layout, grayboxing, playtesting and revision."},r={contents:[{heading:void 0,content:"An unofficial English adaptation and reorganization of The Level Design Book, founded and primarily written/edited by Robert Yang, with contributors including Andrew Yoder. This is an operational skill, not a reproduction of the book. Adapted material is **CC BY-NC-SA 4.0**; attribution, third-party exceptions, and changes are documented in LICENSE.md."},{heading:"scope-and-limits",content:"Primarily for 3D games. State changed assumptions when adapting to 2D, open worlds, zero-input levels, or physical spaces."},{heading:"scope-and-limits",content:"Level design organizes space, activities, rules, and information. It is not synonymous with placing assets, drawing attractive floor plans, writing lore, or adding enemies."},{heading:"scope-and-limits",content:"Work iteratively. Layout, blockout, scripting, testing, and art can change one another; this is not a mandatory waterfall pipeline."},{heading:"scope-and-limits",content:"The source is unfinished. All 94 indexed pages are mapped in the source map, including stubs. Linked videos, external articles, and games are not treated as watched, read, or played."},{heading:"scope-and-limits",content:"The checklists, templates, proposed acceptance criteria, and task routing below are adaptations, not quotations, universal laws, or measured results."},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                          | Read                           |
| ------------------------------------------------------------------------ | ------------------------------ |
| Start a level; control scope; develop pacing, research, or worldbuilding | Foundations and pre-production |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                                      | Read           |
| ------------------------------------------------------------------------------------ | -------------- |
| Draw a layout; connect routes; handle verticality, backtracking, gates, or shortcuts | Spatial layout |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                            | Read                 |
| -------------------------------------------------------------------------- | -------------------- |
| Build a blockout; diagnose scale; design terrain, massing, or modular kits | Blockout and metrics |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                       | Read               |
| --------------------------------------------------------------------- | ------------------ |
| Design encounters, enemies, cover, objectives, or competitive balance | Combat and balance |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                             | Read                       |
| ----------------------------------------------------------- | -------------------------- |
| Diagnose navigation confusion; plan and interpret playtests | Wayfinding and playtesting |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                     | Read                |
| ------------------------------------------------------------------- | ------------------- |
| Implement triggers, objectives, spawning, doors, or recovery states | Scripting and doors |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                                       | Read                         |
| ------------------------------------------------------------------------------------- | ---------------------------- |
| Improve lighting, darkness, visual readability, materials, or environmental narrative | Lighting and environment art |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                           | Read                     |
| --------------------------------------------------------- | ------------------------ |
| Profile performance; package, publish, or present a level | Optimization and release |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                                            | Read                |
| ------------------------------------------------------------------------------------------ | ------------------- |
| Understand professional history, architecture, cultural assumptions, or zero-player levels | Culture and history |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                                        | Read         |
| ---------------------------------------------------------------------- | ------------ |
| Analyze existing levels and transfer patterns without copying surfaces | Case studies |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                         | Read                  |
| ------------------------------------------------------- | --------------------- |
| Build a learning plan, exercise, critique, or portfolio | Learning and teaching |`,table:"table-0"},{heading:"load-only-the-references-the-task-needs",content:`| Task or symptom                                              | Read            |
| ------------------------------------------------------------ | --------------- |
| Choose tools; work with TrenchBroom, Quake, FGD, MAP, or MDL | Tools and Quake |`,table:"table-0"},{heading:"1-frame-the-actual-task",content:"Restate: **For which player, under which rules and constraints, should which experience occur, and what evidence would support it?**"},{heading:"1-frame-the-actual-task",content:"Ask only for missing information that changes the next decision:"},{heading:"1-frame-the-actual-task",content:"Genre, camera, movement, combat, interaction, and the existing project's state."},{heading:"1-frame-the-actual-task",content:"Audience, single-player or multiplayer rules, intended duration or match length."},{heading:"1-frame-the-actual-task",content:"Engine, platform, assets, team, deadline, and requested deliverable."},{heading:"1-frame-the-actual-task",content:"When progress is possible, state provisional assumptions and propose a small next step instead of stopping at a long questionnaire. For implementation, inspect the project first; do not invent engine APIs, units, player abilities, or assets."},{heading:"2-write-a-minimal-brief",content:"Use the level brief template. Establish:"},{heading:"2-write-a-minimal-brief",content:"One-sentence experience goal and a few actionable design pillars."},{heading:"2-write-a-minimal-brief",content:"Core activities; what is introduced, tested, combined, or changed."},{heading:"2-write-a-minimal-brief",content:"Start, completion, failure, retry, and persistence conditions."},{heading:"2-write-a-minimal-brief",content:"Must-have scope, exclusions, dependencies, and highest-risk unknown."},{heading:"2-write-a-minimal-brief",content:"The first falsifiable playtest question."},{heading:"2-write-a-minimal-brief",content:"“Dark and monumental” is not sufficient. Make it actionable: “Players can survey danger from safety, but must leave that safety to advance.”"},{heading:"3-explore-structure-in-the-cheapest-useful-representation",content:"Choose a beat sheet, node graph, floor plan, section, or rough blockout. Do not require all of them."},{heading:"3-explore-structure-in-the-cheapest-useful-representation",content:"Mark starts, goals, required progression, branches, gates, shortcuts, and landmarks."},{heading:"3-explore-structure-in-the-cheapest-useful-representation",content:"Distinguish visibility from reachability; annotate heights and important sightlines."},{heading:"3-explore-structure-in-the-cheapest-useful-representation",content:"Estimate, then measure traversal, combat, waiting, and backtracking time. Area alone does not predict duration."},{heading:"3-explore-structure-in-the-cheapest-useful-representation",content:"Ask what each branch, gate, encounter, and unique asset contributes before adding it."},{heading:"4-make-the-risky-part-playable-early",content:"Build a small, end-to-end playable slice of the riskiest relationship:"},{heading:"4-make-the-risky-part-playable-early",content:"Use representative camera, movement, collision, interaction, and enemy capabilities."},{heading:"4-make-the-risky-part-playable-early",content:"Test clearance, jumps, stairs, cover, camera behavior, and retries in a metrics playground."},{heading:"4-make-the-risky-part-playable-early",content:"Add only the scripting, lighting, sound, and temporary signs necessary for the question."},{heading:"4-make-the-risky-part-playable-early",content:"Do not explain an untested spatial problem with “it will work once the art is finished.”"},{heading:"4-make-the-risky-part-playable-early",content:"If execution is unavailable, deliver specifications and test steps explicitly labeled **not run**."},{heading:"5-observe-without-completing-the-experience-for-the-player",content:"Use playtesting guidance and the playtest report."},{heading:"5-observe-without-completing-the-experience-for-the-player",content:"Define the question and expected observable behavior before recruiting testers."},{heading:"5-observe-without-completing-the-experience-for-the-player",content:"Unless the agreed test method requires it, do not coach, explain, or defend during play."},{heading:"5-observe-without-completing-the-experience-for-the-player",content:"Separate observed behavior, player statements, and designer interpretation."},{heading:"5-observe-without-completing-the-experience-for-the-player",content:"Locate “hard,” “lost,” or “boring” in space, time, state, and actions."},{heading:"5-observe-without-completing-the-experience-for-the-player",content:"Retest changes and inspect alternate routes, retries, persistence, multiplayer, and performance."},{heading:"5-observe-without-completing-the-experience-for-the-player",content:"Small convenience samples do not establish population-level success rates."},{heading:"6-select-the-next-intervention-from-evidence",content:`| Symptom         | Investigate before adding content                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Confusing route | Ground continuity, decision points, landmarks, goal exposure, and actual connections—not arrows first |`,table:"table-1"},{heading:"6-select-the-next-intervention-from-evidence",content:`| Symptom     | Investigate before adding content                                                           |
| ----------- | ------------------------------------------------------------------------------------------- |
| Flat combat | Enemy roles, readable information, space, resources, and alternatives—not more health first |`,table:"table-1"},{heading:"6-select-the-next-intervention-from-evidence",content:`| Symptom       | Investigate before adding content                                  |
| ------------- | ------------------------------------------------------------------ |
| Awkward scale | Camera and controller measurements—not real-world dimensions alone |`,table:"table-1"},{heading:"6-select-the-next-intervention-from-evidence",content:`| Symptom  | Investigate before adding content                                                    |
| -------- | ------------------------------------------------------------------------------------ |
| Monotony | Activity changes, intensity, downtime, repetition, and retry cost—not greater length |`,table:"table-1"},{heading:"6-select-the-next-intervention-from-evidence",content:`| Symptom          | Investigate before adding content                                              |
| ---------------- | ------------------------------------------------------------------------------ |
| Art damages play | Sightlines, collision, interaction readability, and navigation—not more detail |`,table:"table-1"},{heading:"6-select-the-next-intervention-from-evidence",content:`| Symptom          | Investigate before adding content                                                    |
| ---------------- | ------------------------------------------------------------------------------------ |
| Poor performance | Measured bottlenecks on representative hardware—not screenshots or average FPS alone |`,table:"table-1"},{heading:"7-deliver-a-reviewable-version",content:"Provide what the task needs, not every possible document:"},{heading:"7-deliver-a-reviewable-version",content:"Intent, constraints, and labeled assumptions."},{heading:"7-deliver-a-reviewable-version",content:"Beats/routes/layout with a legend and meaningful annotations."},{heading:"7-deliver-a-reviewable-version",content:"Playable blockout or implementable specification."},{heading:"7-deliver-a-reviewable-version",content:"Relevant metrics and script states."},{heading:"7-deliver-a-reviewable-version",content:"Test questions, evidence, limitations, and conclusions."},{heading:"7-deliver-a-reviewable-version",content:"Prioritized changes for the next iteration."},{heading:"7-deliver-a-reviewable-version",content:"If releasing: dependencies, installation, controls, credits, performance, and known issues."},{heading:"7-deliver-a-reviewable-version",content:"Use **problem → concrete location/reproduction → smallest useful change → validation** for critiques. See the review template."},{heading:"judgment-rules",content:"Symmetry is not balance; single-player difficulty is not competitive fairness."},{heading:"judgment-rules",content:"Do not force a dramatic curve, teach–test–twist, or a single critical path onto every game."},{heading:"judgment-rules",content:"Not all disorientation is failure. Distinguish intentional exploration from an unreadable system."},{heading:"judgment-rules",content:"A composed screenshot does not validate a navigable space. Players turn around, look down, jump, and approach from elsewhere."},{heading:"judgment-rules",content:"Do not present color, shape, or architectural associations as universal psychology."},{heading:"judgment-rules",content:"Do not invent playtest observations, completion times, player behavior, or profiling results."},{heading:"judgment-rules",content:"Avoid premature asset polish, but do not use “it's only a blockout” to excuse missing information essential to the test."},{heading:"judgment-rules",content:"Do not expand a source STUB/TODO into a method attributed to its author."},{heading:"judgment-rules",content:"Follow project and tool safety rules before editing code, installing tools, running games, or publishing."},{heading:"example-task-handling",content:"**“Design a ten-minute first-person stealth level.”** Start with a brief, meaningful routes, readable threats, and one testable segment—not a long fictional history."},{heading:"example-task-handling",content:"**“One team always wins this map.”** Inspect rules, starts, travel times, sightlines, resources, and match evidence before proposing mirroring."},{heading:"example-task-handling",content:"**“The scene looks good but players get lost.”** Walk decision points from the player camera; test the smallest spatial or informational correction."},{heading:"example-task-handling",content:"**“Teach me this book.”** Use short complete iteration cycles and critiques, not terminology memorization alone."}],headings:[{id:"scope-and-limits",content:"Scope and limits"},{id:"load-only-the-references-the-task-needs",content:"Load only the references the task needs"},{id:"operating-procedure",content:"Operating procedure"},{id:"1-frame-the-actual-task",content:"1. Frame the actual task"},{id:"2-write-a-minimal-brief",content:"2. Write a minimal brief"},{id:"3-explore-structure-in-the-cheapest-useful-representation",content:"3. Explore structure in the cheapest useful representation"},{id:"4-make-the-risky-part-playable-early",content:"4. Make the risky part playable early"},{id:"5-observe-without-completing-the-experience-for-the-player",content:"5. Observe without completing the experience for the player"},{id:"6-select-the-next-intervention-from-evidence",content:"6. Select the next intervention from evidence"},{id:"7-deliver-a-reviewable-version",content:"7. Deliver a reviewable version"},{id:"judgment-rules",content:"Judgment rules"},{id:"example-task-handling",content:"Example task handling"}]},l=[{depth:2,url:"#scope-and-limits",title:e.jsx(e.Fragment,{children:"Scope and limits"})},{depth:2,url:"#load-only-the-references-the-task-needs",title:e.jsx(e.Fragment,{children:"Load only the references the task needs"})},{depth:2,url:"#operating-procedure",title:e.jsx(e.Fragment,{children:"Operating procedure"})},{depth:3,url:"#1-frame-the-actual-task",title:e.jsx(e.Fragment,{children:"1. Frame the actual task"})},{depth:3,url:"#2-write-a-minimal-brief",title:e.jsx(e.Fragment,{children:"2. Write a minimal brief"})},{depth:3,url:"#3-explore-structure-in-the-cheapest-useful-representation",title:e.jsx(e.Fragment,{children:"3. Explore structure in the cheapest useful representation"})},{depth:3,url:"#4-make-the-risky-part-playable-early",title:e.jsx(e.Fragment,{children:"4. Make the risky part playable early"})},{depth:3,url:"#5-observe-without-completing-the-experience-for-the-player",title:e.jsx(e.Fragment,{children:"5. Observe without completing the experience for the player"})},{depth:3,url:"#6-select-the-next-intervention-from-evidence",title:e.jsx(e.Fragment,{children:"6. Select the next intervention from evidence"})},{depth:3,url:"#7-deliver-a-reviewable-version",title:e.jsx(e.Fragment,{children:"7. Deliver a reviewable version"})},{depth:2,url:"#judgment-rules",title:e.jsx(e.Fragment,{children:"Judgment rules"})},{depth:2,url:"#example-task-handling",title:e.jsx(e.Fragment,{children:"Example task handling"})}];function i(t){const n={a:"a",code:"code",details:"details",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",summary:"summary",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["An unofficial English adaptation and reorganization of ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/",children:"The Level Design Book"}),", founded and primarily written/edited by Robert Yang, with contributors including Andrew Yoder. This is an operational skill, not a reproduction of the book. Adapted material is ",e.jsx(n.strong,{children:"CC BY-NC-SA 4.0"}),"; attribution, third-party exceptions, and changes are documented in ",e.jsx(n.a,{href:"/docs/skills/level-design/LICENSE/",children:"LICENSE.md"}),"."]}),`
`,e.jsx(n.h2,{id:"scope-and-limits",children:"Scope and limits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Primarily for 3D games. State changed assumptions when adapting to 2D, open worlds, zero-input levels, or physical spaces."}),`
`,e.jsx(n.li,{children:"Level design organizes space, activities, rules, and information. It is not synonymous with placing assets, drawing attractive floor plans, writing lore, or adding enemies."}),`
`,e.jsx(n.li,{children:"Work iteratively. Layout, blockout, scripting, testing, and art can change one another; this is not a mandatory waterfall pipeline."}),`
`,e.jsxs(n.li,{children:["The source is unfinished. All 94 indexed pages are mapped in the ",e.jsx(n.a,{href:"/docs/skills/level-design/references/source-map/",children:"source map"}),", including stubs. Linked videos, external articles, and games are not treated as watched, read, or played."]}),`
`,e.jsx(n.li,{children:"The checklists, templates, proposed acceptance criteria, and task routing below are adaptations, not quotations, universal laws, or measured results."}),`
`]}),`
`,e.jsx(n.h2,{id:"load-only-the-references-the-task-needs",children:"Load only the references the task needs"}),`

























































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Task or symptom"}),e.jsx(n.th,{children:"Read"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Start a level; control scope; develop pacing, research, or worldbuilding"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/foundations/",children:"Foundations and pre-production"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Draw a layout; connect routes; handle verticality, backtracking, gates, or shortcuts"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/spatial-layout/",children:"Spatial layout"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Build a blockout; diagnose scale; design terrain, massing, or modular kits"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/blockout-metrics/",children:"Blockout and metrics"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Design encounters, enemies, cover, objectives, or competitive balance"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/combat-balance/",children:"Combat and balance"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Diagnose navigation confusion; plan and interpret playtests"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/wayfinding-playtesting/",children:"Wayfinding and playtesting"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Implement triggers, objectives, spawning, doors, or recovery states"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/scripting-doors/",children:"Scripting and doors"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Improve lighting, darkness, visual readability, materials, or environmental narrative"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/lighting-art/",children:"Lighting and environment art"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Profile performance; package, publish, or present a level"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/optimization-release/",children:"Optimization and release"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Understand professional history, architecture, cultural assumptions, or zero-player levels"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/culture-history/",children:"Culture and history"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Analyze existing levels and transfer patterns without copying surfaces"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/case-studies/",children:"Case studies"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Build a learning plan, exercise, critique, or portfolio"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/learning/",children:"Learning and teaching"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Choose tools; work with TrenchBroom, Quake, FGD, MAP, or MDL"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"/docs/skills/level-design/references/tools-quake/",children:"Tools and Quake"})})]})]})]}),`
`,e.jsx(n.h2,{id:"operating-procedure",children:"Operating procedure"}),`
`,e.jsx(n.h3,{id:"1-frame-the-actual-task",children:"1. Frame the actual task"}),`
`,e.jsxs(n.p,{children:["Restate: ",e.jsx(n.strong,{children:"For which player, under which rules and constraints, should which experience occur, and what evidence would support it?"})]}),`
`,e.jsx(n.p,{children:"Ask only for missing information that changes the next decision:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Genre, camera, movement, combat, interaction, and the existing project's state."}),`
`,e.jsx(n.li,{children:"Audience, single-player or multiplayer rules, intended duration or match length."}),`
`,e.jsx(n.li,{children:"Engine, platform, assets, team, deadline, and requested deliverable."}),`
`]}),`
`,e.jsx(n.p,{children:"When progress is possible, state provisional assumptions and propose a small next step instead of stopping at a long questionnaire. For implementation, inspect the project first; do not invent engine APIs, units, player abilities, or assets."}),`
`,e.jsx(n.h3,{id:"2-write-a-minimal-brief",children:"2. Write a minimal brief"}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.a,{href:"/docs/skills/level-design/templates/level-brief/",children:"level brief template"}),". Establish:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"One-sentence experience goal and a few actionable design pillars."}),`
`,e.jsx(n.li,{children:"Core activities; what is introduced, tested, combined, or changed."}),`
`,e.jsx(n.li,{children:"Start, completion, failure, retry, and persistence conditions."}),`
`,e.jsx(n.li,{children:"Must-have scope, exclusions, dependencies, and highest-risk unknown."}),`
`,e.jsx(n.li,{children:"The first falsifiable playtest question."}),`
`]}),`
`,e.jsx(n.p,{children:"“Dark and monumental” is not sufficient. Make it actionable: “Players can survey danger from safety, but must leave that safety to advance.”"}),`
`,e.jsx(n.h3,{id:"3-explore-structure-in-the-cheapest-useful-representation",children:"3. Explore structure in the cheapest useful representation"}),`
`,e.jsx(n.p,{children:"Choose a beat sheet, node graph, floor plan, section, or rough blockout. Do not require all of them."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Mark starts, goals, required progression, branches, gates, shortcuts, and landmarks."}),`
`,e.jsx(n.li,{children:"Distinguish visibility from reachability; annotate heights and important sightlines."}),`
`,e.jsx(n.li,{children:"Estimate, then measure traversal, combat, waiting, and backtracking time. Area alone does not predict duration."}),`
`,e.jsx(n.li,{children:"Ask what each branch, gate, encounter, and unique asset contributes before adding it."}),`
`]}),`
`,e.jsx(n.h3,{id:"4-make-the-risky-part-playable-early",children:"4. Make the risky part playable early"}),`
`,e.jsx(n.p,{children:"Build a small, end-to-end playable slice of the riskiest relationship:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use representative camera, movement, collision, interaction, and enemy capabilities."}),`
`,e.jsx(n.li,{children:"Test clearance, jumps, stairs, cover, camera behavior, and retries in a metrics playground."}),`
`,e.jsx(n.li,{children:"Add only the scripting, lighting, sound, and temporary signs necessary for the question."}),`
`,e.jsx(n.li,{children:"Do not explain an untested spatial problem with “it will work once the art is finished.”"}),`
`]}),`
`,e.jsxs(n.p,{children:["If execution is unavailable, deliver specifications and test steps explicitly labeled ",e.jsx(n.strong,{children:"not run"}),"."]}),`
`,e.jsx(n.h3,{id:"5-observe-without-completing-the-experience-for-the-player",children:"5. Observe without completing the experience for the player"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.a,{href:"/docs/skills/level-design/references/wayfinding-playtesting/",children:"playtesting guidance"})," and the ",e.jsx(n.a,{href:"/docs/skills/level-design/templates/playtest-report/",children:"playtest report"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Define the question and expected observable behavior before recruiting testers."}),`
`,e.jsx(n.li,{children:"Unless the agreed test method requires it, do not coach, explain, or defend during play."}),`
`,e.jsx(n.li,{children:"Separate observed behavior, player statements, and designer interpretation."}),`
`,e.jsx(n.li,{children:"Locate “hard,” “lost,” or “boring” in space, time, state, and actions."}),`
`,e.jsx(n.li,{children:"Retest changes and inspect alternate routes, retries, persistence, multiplayer, and performance."}),`
`,e.jsx(n.li,{children:"Small convenience samples do not establish population-level success rates."}),`
`]}),`
`,e.jsx(n.h3,{id:"6-select-the-next-intervention-from-evidence",children:"6. Select the next intervention from evidence"}),`

































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Symptom"}),e.jsx(n.th,{children:"Investigate before adding content"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Confusing route"}),e.jsx(n.td,{children:"Ground continuity, decision points, landmarks, goal exposure, and actual connections—not arrows first"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Flat combat"}),e.jsx(n.td,{children:"Enemy roles, readable information, space, resources, and alternatives—not more health first"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Awkward scale"}),e.jsx(n.td,{children:"Camera and controller measurements—not real-world dimensions alone"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Monotony"}),e.jsx(n.td,{children:"Activity changes, intensity, downtime, repetition, and retry cost—not greater length"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Art damages play"}),e.jsx(n.td,{children:"Sightlines, collision, interaction readability, and navigation—not more detail"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Poor performance"}),e.jsx(n.td,{children:"Measured bottlenecks on representative hardware—not screenshots or average FPS alone"})]})]})]}),`
`,e.jsx(n.h3,{id:"7-deliver-a-reviewable-version",children:"7. Deliver a reviewable version"}),`
`,e.jsx(n.p,{children:"Provide what the task needs, not every possible document:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Intent, constraints, and labeled assumptions."}),`
`,e.jsx(n.li,{children:"Beats/routes/layout with a legend and meaningful annotations."}),`
`,e.jsx(n.li,{children:"Playable blockout or implementable specification."}),`
`,e.jsx(n.li,{children:"Relevant metrics and script states."}),`
`,e.jsx(n.li,{children:"Test questions, evidence, limitations, and conclusions."}),`
`,e.jsx(n.li,{children:"Prioritized changes for the next iteration."}),`
`,e.jsx(n.li,{children:"If releasing: dependencies, installation, controls, credits, performance, and known issues."}),`
`]}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.strong,{children:"problem → concrete location/reproduction → smallest useful change → validation"})," for critiques. See the ",e.jsx(n.a,{href:"/docs/skills/level-design/templates/review/",children:"review template"}),"."]}),`
`,e.jsx(n.h2,{id:"judgment-rules",children:"Judgment rules"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Symmetry is not balance; single-player difficulty is not competitive fairness."}),`
`,e.jsx(n.li,{children:"Do not force a dramatic curve, teach–test–twist, or a single critical path onto every game."}),`
`,e.jsx(n.li,{children:"Not all disorientation is failure. Distinguish intentional exploration from an unreadable system."}),`
`,e.jsx(n.li,{children:"A composed screenshot does not validate a navigable space. Players turn around, look down, jump, and approach from elsewhere."}),`
`,e.jsx(n.li,{children:"Do not present color, shape, or architectural associations as universal psychology."}),`
`,e.jsx(n.li,{children:"Do not invent playtest observations, completion times, player behavior, or profiling results."}),`
`,e.jsx(n.li,{children:"Avoid premature asset polish, but do not use “it's only a blockout” to excuse missing information essential to the test."}),`
`,e.jsx(n.li,{children:"Do not expand a source STUB/TODO into a method attributed to its author."}),`
`,e.jsx(n.li,{children:"Follow project and tool safety rules before editing code, installing tools, running games, or publishing."}),`
`]}),`
`,e.jsx(n.h2,{id:"example-task-handling",children:"Example task handling"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"“Design a ten-minute first-person stealth level.”"})," Start with a brief, meaningful routes, readable threats, and one testable segment—not a long fictional history."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"“One team always wins this map.”"})," Inspect rules, starts, travel times, sightlines, resources, and match evidence before proposing mirroring."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"“The scene looks good but players get lost.”"})," Walk decision points from the player camera; test the smallest spatial or informational correction."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"“Teach me this book.”"})," Use short complete iteration cycles and critiques, not terminology memorization alone."]}),`
`]}),`
`,e.jsxs(n.details,{children:[`
`,e.jsx(n.summary,{children:"Package metadata"}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8","--shiki-light-bg":"#fff","--shiki-dark-bg":"#24292e"},tabIndex:"0",icon:'<svg viewBox="0 0 24 24"><path d="M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z" fill="currentColor" /></svg>',children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"},children:"name"}),e.jsx(n.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(n.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:"level-design"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"},children:"description"}),e.jsx(n.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(n.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:'"Design, review, prototype, and iterate playable game levels using The Level Design Book. Use for level design, layouts, blockouts, grayboxing, pacing, combat encounters, enemy placement, cover, multiplayer map balance, wayfinding, environmental storytelling, lighting, playtesting, Quake or TrenchBroom mapping, level-design exercises, and diagnosing confusing, flat, unfair, or tedious levels."'})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"},children:"license"}),e.jsx(n.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(n.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:"CC-BY-NC-SA-4.0"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"},children:"metadata"}),e.jsx(n.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"},children:"  source"}),e.jsx(n.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(n.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://book.leveldesignbook.com/"'})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"},children:"  source-snapshot"}),e.jsx(n.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(n.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:'"2026-10-16"'})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"},children:"  language"}),e.jsx(n.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(n.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:'"en"'})]})]})})}),`
`]})]})}function o(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,a as frontmatter,r as structuredData,l as toc};
