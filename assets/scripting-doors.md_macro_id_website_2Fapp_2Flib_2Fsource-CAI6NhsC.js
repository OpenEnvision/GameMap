import{j as e}from"./jsx-runtime-BE0eTAub.js";let r={title:"Scripting, Navigation, and Doors",description:"Specify scripted interactions, navigation dependencies and door states with readable feedback and recoverable behavior."},o={contents:[{heading:void 0,content:"Sources: Scripting, (stub) Navigation, Doors. Adapted and reorganized under CC BY-NC-SA 4.0. The navigation source is a stub; the implementation checks below are explicitly practical extensions, not a completed navigation chapter from the book."},{heading:"1-describe-behavior-before-choosing-syntax",content:"**Level scripting** coordinates local events, interactions, objectives, enemies, and world changes. It may use code, visual graphs, entity connections, timelines, or editor properties."},{heading:"1-describe-behavior-before-choosing-syntax",content:"Begin with a readable behavior:"},{heading:"1-describe-behavior-before-choosing-syntax",content:"**Condition:** what makes something eligible?"},{heading:"1-describe-behavior-before-choosing-syntax",content:"**Event:** what causes an attempt?"},{heading:"1-describe-behavior-before-choosing-syntax",content:"**Action:** what changes?"},{heading:"1-describe-behavior-before-choosing-syntax",content:"**Feedback:** what can the player perceive?"},{heading:"1-describe-behavior-before-choosing-syntax",content:"**Persistence:** what remains true afterward?"},{heading:"1-describe-behavior-before-choosing-syntax",content:"**Recovery:** what happens after interruption, failure, or re-entry?"},{heading:"1-describe-behavior-before-choosing-syntax",content:"Example: “After the player enters the courtyard, close the gate once, announce the ambush, and unlock the exit after all required enemies are defeated.” This still leaves crucial questions: what if enemies cannot reach the player, the player leaves before closure, or a save is loaded halfway through?"},{heading:"1-describe-behavior-before-choosing-syntax",content:"Do not hide missing design decisions inside a large visual graph."},{heading:"2-prototype-with-the-projects-existing-tools",content:"Inspect available trigger types, interaction events, entity targeting, state storage, debugging, and reset methods before adding a new abstraction."},{heading:"2-prototype-with-the-projects-existing-tools",content:"Keep a small test map or scene for uncertain behaviors."},{heading:"2-prototype-with-the-projects-existing-tools",content:"Use clear names and inspectable connections."},{heading:"2-prototype-with-the-projects-existing-tools",content:"Make timing and dependencies visible enough to debug."},{heading:"2-prototype-with-the-projects-existing-tools",content:"Prefer a simple local mechanism over a project-wide system for a one-off problem."},{heading:"2-prototype-with-the-projects-existing-tools",content:"Conversely, repeated behavior may justify a shared component once its requirements are known."},{heading:"2-prototype-with-the-projects-existing-tools",content:"“Visual scripting” does not mean no programming concepts are involved. State, sequencing, conditions, dependencies, and ownership still matter."},{heading:"3-practical-state-specification",content:"This table is an adaptation for robust implementation:"},{heading:"3-practical-state-specification",content:`| State     | Entry condition         | Behavior              | Exit condition   | Re-entry/save behavior |
| --------- | ----------------------- | --------------------- | ---------------- | ---------------------- |
| Available | Preconditions satisfied | Advertise interaction | Player activates | Restore availability   |`,table:"table-0"},{heading:"3-practical-state-specification",content:`| State  | Entry condition     | Behavior            | Exit condition        | Re-entry/save behavior           |
| ------ | ------------------- | ------------------- | --------------------- | -------------------------------- |
| Active | Activation accepted | Run encounter/event | Completion or failure | Restore or intentionally restart |`,table:"table-0"},{heading:"3-practical-state-specification",content:`| State     | Entry condition         | Behavior                  | Exit condition     | Re-entry/save behavior          |
| --------- | ----------------------- | ------------------------- | ------------------ | ------------------------------- |
| Completed | Required condition true | Open route / grant result | Usually persistent | Do not duplicate rewards/events |`,table:"table-0"},{heading:"3-practical-state-specification",content:`| State              | Entry condition               | Behavior                  | Exit condition | Re-entry/save behavior          |
| ------------------ | ----------------------------- | ------------------------- | -------------- | ------------------------------- |
| Failed/interrupted | Defined exceptional condition | Recover, reset, or report | Recovery rule  | Avoid progress loss or softlock |`,table:"table-0"},{heading:"3-practical-state-specification",content:"Use only the states the behavior needs. A decorative light switch does not require an encounter framework."},{heading:"3-practical-state-specification",content:"Distinguish:"},{heading:"3-practical-state-specification",content:"A trigger firing from an action completing."},{heading:"3-practical-state-specification",content:"An event occurring once from a state remaining true."},{heading:"3-practical-state-specification",content:"A delay from a condition that might never become true."},{heading:"3-practical-state-specification",content:"Local entity state from global mission state."},{heading:"3-practical-state-specification",content:"An animation reaching its end from the player having a usable route."},{heading:"4-triggers-and-encounter-sequencing",content:"Test:"},{heading:"4-triggers-and-encounter-sequencing",content:"Entering, leaving, and re-entering."},{heading:"4-triggers-and-encounter-sequencing",content:"Crossing at high speed or from an unexpected direction."},{heading:"4-triggers-and-encounter-sequencing",content:"Activating twice, including during transitions."},{heading:"4-triggers-and-encounter-sequencing",content:"Enemies dying, despawning, or falling out of the level."},{heading:"4-triggers-and-encounter-sequencing",content:"Player death, reload, restart, and abandonment."},{heading:"4-triggers-and-encounter-sequencing",content:"Optional routes bypassing the trigger."},{heading:"4-triggers-and-encounter-sequencing",content:"More than one relevant actor entering, where supported."},{heading:"4-triggers-and-encounter-sequencing",content:"If progress depends on enemy completion, define which enemies count and what happens when one is unreachable. Do not let an invisible counter silently become a permanent lock."},{heading:"4-triggers-and-encounter-sequencing",content:"Use feedback to explain a meaningful state change. Sound, movement, light, objective updates, and visible geometry can communicate different aspects; avoid requiring the player to infer an invisible flag."},{heading:"5-navigation-distinguish-the-layers",content:"**Wayfinding:** the player's understanding of where to go."},{heading:"5-navigation-distinguish-the-layers",content:"**Traversability:** what geometry and movement rules permit."},{heading:"5-navigation-distinguish-the-layers",content:"**AI navigation:** how agents represent and follow routes."},{heading:"5-navigation-distinguish-the-layers",content:"**Scripting:** when paths, targets, or behaviors become available."},{heading:"5-navigation-distinguish-the-layers",content:"A visible route can be mechanically blocked. A valid navigation mesh can still lead to poor encounter behavior."},{heading:"5-navigation-distinguish-the-layers",content:"Because the book's navigation page is incomplete, use the target engine's documentation for actual APIs, agent settings, dynamic updates, links, and debugging."},{heading:"5-navigation-distinguish-the-layers",content:"Practical checks:"},{heading:"5-navigation-distinguish-the-layers",content:"Correct agent dimensions and clearance."},{heading:"5-navigation-distinguish-the-layers",content:"Stairs, slopes, narrow gaps, drops, and special traversal."},{heading:"5-navigation-distinguish-the-layers",content:"Door transitions and dynamically blocked routes."},{heading:"5-navigation-distinguish-the-layers",content:"Pursuit, retreat, crowding, and unreachable targets."},{heading:"5-navigation-distinguish-the-layers",content:"Whether runtime changes update navigation as intended."},{heading:"5-navigation-distinguish-the-layers",content:"Do not claim that a navmesh rebuild occurred or an AI route succeeded unless it was actually observed."},{heading:"6-doors-are-a-systems-problem",content:"A door intersects geometry, collision, animation, audio, input, AI, navigation, story, persistence, and possibly networking. A static mesh is only one part."},{heading:"door-brief",content:"**Purpose**"},{heading:"door-brief",content:"Gate progression, partition visibility, support stealth, punctuate pacing, or provide ordinary circulation?"},{heading:"door-brief",content:"Is a working door necessary, or would an opening serve better?"},{heading:"door-brief",content:"**Interaction**"},{heading:"door-brief",content:"Automatic, proximity, button, use action, key, or scripted?"},{heading:"door-brief",content:"From either side?"},{heading:"door-brief",content:"What tells the player it is usable, locked, or permanently decorative?"},{heading:"door-brief",content:"What happens if interaction repeats during motion?"},{heading:"door-brief",content:"**Movement and collision**"},{heading:"door-brief",content:"Swing, slide, rotate, break, or disappear?"},{heading:"door-brief",content:"Which way does it open?"},{heading:"door-brief",content:"Can it push, trap, obstruct, or injure actors?"},{heading:"door-brief",content:"Can the player shoot, see, or hear through it at each state?"},{heading:"door-brief",content:"Does the camera or carried object collide?"},{heading:"door-brief",content:"**Other actors**"},{heading:"door-brief",content:"Can enemies open, close, block, break, or follow through?"},{heading:"door-brief",content:"What happens to their navigation during motion?"},{heading:"door-brief",content:"Can a companion become stranded?"},{heading:"door-brief",content:"**State**"},{heading:"door-brief",content:"Separate locked/unlocked from open/closed and moving/stopped."},{heading:"door-brief",content:"Define destroyed, jammed, or disabled states only if supported."},{heading:"door-brief",content:"Specify respawn, save/load, and global quest changes."},{heading:"door-brief",content:"Preserve intentional per-door states when applying global events."},{heading:"concrete-failure-trace",content:"A quest locks all doors, then unlocks them all at completion. Previously locked doors are now unintentionally open because the script restored a blanket condition rather than each door's prior state."},{heading:"concrete-failure-trace",content:"The source uses a Witcher 3 incident to illustrate this dependency. The general lesson is to distinguish a temporary override from the underlying state, and test restoration rather than assuming it."},{heading:"7-validation-matrix",content:"For any consequential scripted object, cover relevant combinations:"},{heading:"7-validation-matrix",content:"Initial state and after completion."},{heading:"7-validation-matrix",content:"Normal interaction and repeated interaction."},{heading:"7-validation-matrix",content:"Approaches from every legal side."},{heading:"7-validation-matrix",content:"Player death, reload, and restart."},{heading:"7-validation-matrix",content:"Route bypass and return."},{heading:"7-validation-matrix",content:"AI or companion involvement."},{heading:"7-validation-matrix",content:"Interrupted motion or event."},{heading:"7-validation-matrix",content:"Multiplayer authority and reconnection, if the game supports them."},{heading:"7-validation-matrix",content:"This is a practical extension for implementation tasks. Do not require irrelevant systems or silently add multiplayer to a single-player project."},{heading:"deliverable",content:"A short behavior specification, ownership of state, feedback, a small set of meaningful transitions, and reproducible test cases. Supply implementation code only after inspecting the project's actual APIs and conventions."}],headings:[{id:"1-describe-behavior-before-choosing-syntax",content:"1. Describe behavior before choosing syntax"},{id:"2-prototype-with-the-projects-existing-tools",content:"2. Prototype with the project's existing tools"},{id:"3-practical-state-specification",content:"3. Practical state specification"},{id:"4-triggers-and-encounter-sequencing",content:"4. Triggers and encounter sequencing"},{id:"5-navigation-distinguish-the-layers",content:"5. Navigation: distinguish the layers"},{id:"6-doors-are-a-systems-problem",content:"6. Doors are a systems problem"},{id:"door-brief",content:"Door brief"},{id:"concrete-failure-trace",content:"Concrete failure trace"},{id:"7-validation-matrix",content:"7. Validation matrix"},{id:"deliverable",content:"Deliverable"}]},s=[{depth:2,url:"#1-describe-behavior-before-choosing-syntax",title:e.jsx(e.Fragment,{children:"1. Describe behavior before choosing syntax"})},{depth:2,url:"#2-prototype-with-the-projects-existing-tools",title:e.jsx(e.Fragment,{children:"2. Prototype with the project's existing tools"})},{depth:2,url:"#3-practical-state-specification",title:e.jsx(e.Fragment,{children:"3. Practical state specification"})},{depth:2,url:"#4-triggers-and-encounter-sequencing",title:e.jsx(e.Fragment,{children:"4. Triggers and encounter sequencing"})},{depth:2,url:"#5-navigation-distinguish-the-layers",title:e.jsx(e.Fragment,{children:"5. Navigation: distinguish the layers"})},{depth:2,url:"#6-doors-are-a-systems-problem",title:e.jsx(e.Fragment,{children:"6. Doors are a systems problem"})},{depth:3,url:"#door-brief",title:e.jsx(e.Fragment,{children:"Door brief"})},{depth:3,url:"#concrete-failure-trace",title:e.jsx(e.Fragment,{children:"Concrete failure trace"})},{depth:2,url:"#7-validation-matrix",title:e.jsx(e.Fragment,{children:"7. Validation matrix"})},{depth:2,url:"#deliverable",title:e.jsx(e.Fragment,{children:"Deliverable"})}];function i(t){const n={a:"a",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Sources: ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/scripting",children:"Scripting"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/scripting/nav",children:"(stub) Navigation"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/scripting/doors",children:"Doors"}),". Adapted and reorganized under CC BY-NC-SA 4.0. The navigation source is a stub; the implementation checks below are explicitly practical extensions, not a completed navigation chapter from the book."]}),`
`,e.jsx(n.h2,{id:"1-describe-behavior-before-choosing-syntax",children:"1. Describe behavior before choosing syntax"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Level scripting"})," coordinates local events, interactions, objectives, enemies, and world changes. It may use code, visual graphs, entity connections, timelines, or editor properties."]}),`
`,e.jsx(n.p,{children:"Begin with a readable behavior:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Condition:"})," what makes something eligible?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Event:"})," what causes an attempt?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action:"})," what changes?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Feedback:"})," what can the player perceive?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Persistence:"})," what remains true afterward?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Recovery:"})," what happens after interruption, failure, or re-entry?"]}),`
`]}),`
`,e.jsx(n.p,{children:"Example: “After the player enters the courtyard, close the gate once, announce the ambush, and unlock the exit after all required enemies are defeated.” This still leaves crucial questions: what if enemies cannot reach the player, the player leaves before closure, or a save is loaded halfway through?"}),`
`,e.jsx(n.p,{children:"Do not hide missing design decisions inside a large visual graph."}),`
`,e.jsx(n.h2,{id:"2-prototype-with-the-projects-existing-tools",children:"2. Prototype with the project's existing tools"}),`
`,e.jsx(n.p,{children:"Inspect available trigger types, interaction events, entity targeting, state storage, debugging, and reset methods before adding a new abstraction."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep a small test map or scene for uncertain behaviors."}),`
`,e.jsx(n.li,{children:"Use clear names and inspectable connections."}),`
`,e.jsx(n.li,{children:"Make timing and dependencies visible enough to debug."}),`
`,e.jsx(n.li,{children:"Prefer a simple local mechanism over a project-wide system for a one-off problem."}),`
`,e.jsx(n.li,{children:"Conversely, repeated behavior may justify a shared component once its requirements are known."}),`
`]}),`
`,e.jsx(n.p,{children:"“Visual scripting” does not mean no programming concepts are involved. State, sequencing, conditions, dependencies, and ownership still matter."}),`
`,e.jsx(n.h2,{id:"3-practical-state-specification",children:"3. Practical state specification"}),`
`,e.jsx(n.p,{children:"This table is an adaptation for robust implementation:"}),`








































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"State"}),e.jsx(n.th,{children:"Entry condition"}),e.jsx(n.th,{children:"Behavior"}),e.jsx(n.th,{children:"Exit condition"}),e.jsx(n.th,{children:"Re-entry/save behavior"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Available"}),e.jsx(n.td,{children:"Preconditions satisfied"}),e.jsx(n.td,{children:"Advertise interaction"}),e.jsx(n.td,{children:"Player activates"}),e.jsx(n.td,{children:"Restore availability"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Active"}),e.jsx(n.td,{children:"Activation accepted"}),e.jsx(n.td,{children:"Run encounter/event"}),e.jsx(n.td,{children:"Completion or failure"}),e.jsx(n.td,{children:"Restore or intentionally restart"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Completed"}),e.jsx(n.td,{children:"Required condition true"}),e.jsx(n.td,{children:"Open route / grant result"}),e.jsx(n.td,{children:"Usually persistent"}),e.jsx(n.td,{children:"Do not duplicate rewards/events"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Failed/interrupted"}),e.jsx(n.td,{children:"Defined exceptional condition"}),e.jsx(n.td,{children:"Recover, reset, or report"}),e.jsx(n.td,{children:"Recovery rule"}),e.jsx(n.td,{children:"Avoid progress loss or softlock"})]})]})]}),`
`,e.jsx(n.p,{children:"Use only the states the behavior needs. A decorative light switch does not require an encounter framework."}),`
`,e.jsx(n.p,{children:"Distinguish:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A trigger firing from an action completing."}),`
`,e.jsx(n.li,{children:"An event occurring once from a state remaining true."}),`
`,e.jsx(n.li,{children:"A delay from a condition that might never become true."}),`
`,e.jsx(n.li,{children:"Local entity state from global mission state."}),`
`,e.jsx(n.li,{children:"An animation reaching its end from the player having a usable route."}),`
`]}),`
`,e.jsx(n.h2,{id:"4-triggers-and-encounter-sequencing",children:"4. Triggers and encounter sequencing"}),`
`,e.jsx(n.p,{children:"Test:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Entering, leaving, and re-entering."}),`
`,e.jsx(n.li,{children:"Crossing at high speed or from an unexpected direction."}),`
`,e.jsx(n.li,{children:"Activating twice, including during transitions."}),`
`,e.jsx(n.li,{children:"Enemies dying, despawning, or falling out of the level."}),`
`,e.jsx(n.li,{children:"Player death, reload, restart, and abandonment."}),`
`,e.jsx(n.li,{children:"Optional routes bypassing the trigger."}),`
`,e.jsx(n.li,{children:"More than one relevant actor entering, where supported."}),`
`]}),`
`,e.jsx(n.p,{children:"If progress depends on enemy completion, define which enemies count and what happens when one is unreachable. Do not let an invisible counter silently become a permanent lock."}),`
`,e.jsx(n.p,{children:"Use feedback to explain a meaningful state change. Sound, movement, light, objective updates, and visible geometry can communicate different aspects; avoid requiring the player to infer an invisible flag."}),`
`,e.jsx(n.h2,{id:"5-navigation-distinguish-the-layers",children:"5. Navigation: distinguish the layers"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Wayfinding:"})," the player's understanding of where to go."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Traversability:"})," what geometry and movement rules permit."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"AI navigation:"})," how agents represent and follow routes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Scripting:"})," when paths, targets, or behaviors become available."]}),`
`]}),`
`,e.jsx(n.p,{children:"A visible route can be mechanically blocked. A valid navigation mesh can still lead to poor encounter behavior."}),`
`,e.jsx(n.p,{children:"Because the book's navigation page is incomplete, use the target engine's documentation for actual APIs, agent settings, dynamic updates, links, and debugging."}),`
`,e.jsx(n.p,{children:"Practical checks:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Correct agent dimensions and clearance."}),`
`,e.jsx(n.li,{children:"Stairs, slopes, narrow gaps, drops, and special traversal."}),`
`,e.jsx(n.li,{children:"Door transitions and dynamically blocked routes."}),`
`,e.jsx(n.li,{children:"Pursuit, retreat, crowding, and unreachable targets."}),`
`,e.jsx(n.li,{children:"Whether runtime changes update navigation as intended."}),`
`]}),`
`,e.jsx(n.p,{children:"Do not claim that a navmesh rebuild occurred or an AI route succeeded unless it was actually observed."}),`
`,e.jsx(n.h2,{id:"6-doors-are-a-systems-problem",children:"6. Doors are a systems problem"}),`
`,e.jsx(n.p,{children:"A door intersects geometry, collision, animation, audio, input, AI, navigation, story, persistence, and possibly networking. A static mesh is only one part."}),`
`,e.jsx(n.h3,{id:"door-brief",children:"Door brief"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Purpose"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Gate progression, partition visibility, support stealth, punctuate pacing, or provide ordinary circulation?"}),`
`,e.jsx(n.li,{children:"Is a working door necessary, or would an opening serve better?"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Interaction"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Automatic, proximity, button, use action, key, or scripted?"}),`
`,e.jsx(n.li,{children:"From either side?"}),`
`,e.jsx(n.li,{children:"What tells the player it is usable, locked, or permanently decorative?"}),`
`,e.jsx(n.li,{children:"What happens if interaction repeats during motion?"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Movement and collision"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Swing, slide, rotate, break, or disappear?"}),`
`,e.jsx(n.li,{children:"Which way does it open?"}),`
`,e.jsx(n.li,{children:"Can it push, trap, obstruct, or injure actors?"}),`
`,e.jsx(n.li,{children:"Can the player shoot, see, or hear through it at each state?"}),`
`,e.jsx(n.li,{children:"Does the camera or carried object collide?"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Other actors"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Can enemies open, close, block, break, or follow through?"}),`
`,e.jsx(n.li,{children:"What happens to their navigation during motion?"}),`
`,e.jsx(n.li,{children:"Can a companion become stranded?"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"State"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Separate locked/unlocked from open/closed and moving/stopped."}),`
`,e.jsx(n.li,{children:"Define destroyed, jammed, or disabled states only if supported."}),`
`,e.jsx(n.li,{children:"Specify respawn, save/load, and global quest changes."}),`
`,e.jsx(n.li,{children:"Preserve intentional per-door states when applying global events."}),`
`]}),`
`,e.jsx(n.h3,{id:"concrete-failure-trace",children:"Concrete failure trace"}),`
`,e.jsx(n.p,{children:"A quest locks all doors, then unlocks them all at completion. Previously locked doors are now unintentionally open because the script restored a blanket condition rather than each door's prior state."}),`
`,e.jsx(n.p,{children:"The source uses a Witcher 3 incident to illustrate this dependency. The general lesson is to distinguish a temporary override from the underlying state, and test restoration rather than assuming it."}),`
`,e.jsx(n.h2,{id:"7-validation-matrix",children:"7. Validation matrix"}),`
`,e.jsx(n.p,{children:"For any consequential scripted object, cover relevant combinations:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Initial state and after completion."}),`
`,e.jsx(n.li,{children:"Normal interaction and repeated interaction."}),`
`,e.jsx(n.li,{children:"Approaches from every legal side."}),`
`,e.jsx(n.li,{children:"Player death, reload, and restart."}),`
`,e.jsx(n.li,{children:"Route bypass and return."}),`
`,e.jsx(n.li,{children:"AI or companion involvement."}),`
`,e.jsx(n.li,{children:"Interrupted motion or event."}),`
`,e.jsx(n.li,{children:"Multiplayer authority and reconnection, if the game supports them."}),`
`]}),`
`,e.jsx(n.p,{children:"This is a practical extension for implementation tasks. Do not require irrelevant systems or silently add multiplayer to a single-player project."}),`
`,e.jsx(n.h2,{id:"deliverable",children:"Deliverable"}),`
`,e.jsx(n.p,{children:"A short behavior specification, ownership of state, feedback, a small set of meaningful transitions, and reproducible test cases. Supply implementation code only after inspecting the project's actual APIs and conventions."})]})}function c(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{c as default,r as frontmatter,o as structuredData,s as toc};
