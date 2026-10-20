import{j as e}from"./jsx-runtime-BE0eTAub.js";let s={title:"Combat, Enemy Roles, Encounters, Cover, and Map Balance",description:"Design encounters around enemy roles, sightlines, cover, movement and multiplayer balance, then test the resulting decisions."},o={contents:[{heading:void 0,content:"Sources: Combat, Enemy design, Encounter, Cover, Map balance. Adapted and reorganized under CC BY-NC-SA 4.0."},{heading:"1-separate-system-design-from-encounter-design",content:"Combat systems define movement, aiming, attacks, damage, resources, defenses, enemy behavior, and feedback. An encounter arranges those capabilities in a particular situation."},{heading:"1-separate-system-design-from-encounter-design",content:"If the core attack is unreadable or movement is unreliable, adding a better room may not solve the problem. Identify whether the failure belongs to the mechanic, the arrangement, or their interaction."},{heading:"1-separate-system-design-from-encounter-design",content:"Before designing a fight, establish:"},{heading:"1-separate-system-design-from-encounter-design",content:"Player movement and attack capabilities."},{heading:"1-separate-system-design-from-encounter-design",content:"Expected information and reaction opportunities."},{heading:"1-separate-system-design-from-encounter-design",content:"Enemy perception, reach, mobility, and failure states."},{heading:"1-separate-system-design-from-encounter-design",content:"Available health, ammunition, abilities, and replenishment."},{heading:"1-separate-system-design-from-encounter-design",content:"Intended difficulty, failure cost, and audience."},{heading:"1-separate-system-design-from-encounter-design",content:"Numerical damage is only part of effective pressure. Exposure, accuracy, telegraphing, range, travel time, cover, and combined threats change the outcome."},{heading:"2-design-enemies-as-legible-relationships",content:"A useful enemy role creates a reason to act differently. Roles might pressure distance, displace the player, deny a position, demand priority, punish exposure, or support another enemy."},{heading:"2-design-enemies-as-legible-relationships",content:"For each role, specify:"},{heading:"2-design-enemies-as-legible-relationships",content:"What the player can perceive before being punished."},{heading:"2-design-enemies-as-legible-relationships",content:"What action or situation the enemy encourages."},{heading:"2-design-enemies-as-legible-relationships",content:"Which weakness or counterplay can be learned."},{heading:"2-design-enemies-as-legible-relationships",content:"What changes when combined with other roles."},{heading:"2-design-enemies-as-legible-relationships",content:"How the level gives the behavior enough room to function."},{heading:"2-design-enemies-as-legible-relationships",content:"Do not equate better AI with greater intelligence, omniscience, or maximum lethality. Behavior should support the intended experience and communicate state."},{heading:"2-design-enemies-as-legible-relationships",content:"For stealth especially, distinguish sensing from interpretation. Suspicion, investigation, search, alert, and recovery need readable evidence and a workable information model. The exact implementation is project-specific."},{heading:"3-build-encounters-around-a-question",content:"Use a compact encounter brief:"},{heading:"3-build-encounters-around-a-question",content:"Intended decision, feeling, or skill."},{heading:"3-build-encounters-around-a-question",content:"Starting view, player state, and resources."},{heading:"3-build-encounters-around-a-question",content:"Enemy roles, positions, patrols, and arrival conditions."},{heading:"3-build-encounters-around-a-question",content:"Relevant geometry, height, cover, routes, and exits."},{heading:"3-build-encounters-around-a-question",content:"Escalation, reinforcement, completion, failure, and reset conditions."},{heading:"3-build-encounters-around-a-question",content:"Expected alternate approaches and possible exploits."},{heading:"3-build-encounters-around-a-question",content:"Evidence that would show the encounter is working."},{heading:"working-sequence",content:"Establish an entry view that communicates enough to act."},{heading:"working-sequence",content:"Give the first commitment a cost and an intelligible alternative."},{heading:"working-sequence",content:"Arrange enemy roles so their interaction matters."},{heading:"working-sequence",content:"Provide room for movement, recovery, or deliberate confinement."},{heading:"working-sequence",content:"Vary conditions where appropriate rather than only increasing counts."},{heading:"working-sequence",content:"Define what happens if the player retreats, bypasses, rushes, or returns."},{heading:"working-sequence",content:"Test with plausible incoming resources, not only a fully equipped author."},{heading:"working-sequence",content:"An “arena” is not automatically a circular room with a locked door. Confinement, spawning, and wave structures are choices that must serve the goal."},{heading:"difficulty-changes",content:"Consider changing composition, placement, resources, information, timing, and behavior—not only health or damage. Verify that a change preserves the intended lesson and does not remove counterplay."},{heading:"difficulty-changes",content:"A difficult fight can be appropriate. Unclear causality, unavoidable damage, broken camera views, or excessive repetition may be a different problem."},{heading:"4-cover-is-a-sightline-and-protection-system",content:"Cover includes any structure that blocks relevant sightlines or attacks; it is not limited to chest-high boxes or explicit cover mechanics."},{heading:"4-cover-is-a-sightline-and-protection-system",content:"Describe cover by what the actual game supports:"},{heading:"4-cover-is-a-sightline-and-protection-system",content:"Partial versus full occlusion."},{heading:"4-cover-is-a-sightline-and-protection-system",content:"Standing versus crouched use."},{heading:"4-cover-is-a-sightline-and-protection-system",content:"Hard protection versus concealment only."},{heading:"4-cover-is-a-sightline-and-protection-system",content:"Penetrable, destructible, temporary, or movable behavior."},{heading:"4-cover-is-a-sightline-and-protection-system",content:"Directionality, width, depth, edge exposure, and nearby movement options."},{heading:"evaluate-relationships-not-object-counts",content:"What can be seen and hit from each position?"},{heading:"evaluate-relationships-not-object-counts",content:"What becomes exposed while moving between positions?"},{heading:"evaluate-relationships-not-object-counts",content:"Does a protected spot create a decision or permit indefinite inactivity?"},{heading:"evaluate-relationships-not-object-counts",content:"Can enemies approach, flank, displace, or deny it in a readable way?"},{heading:"evaluate-relationships-not-object-counts",content:"Can both sides read the same silhouette and collision boundary?"},{heading:"evaluate-relationships-not-object-counts",content:"Does the camera imply safety while the hitbox or weapon origin remains exposed?"},{heading:"evaluate-relationships-not-object-counts",content:"Adding cover everywhere can fragment sightlines, clutter movement, flatten long-range roles, or reduce urgency. Too little cover can remove tactical options. Neither density is universally correct."},{heading:"diagnose-a-stalled-cover-fight",content:"**Problem:** players never leave the first safe position."},{heading:"diagnose-a-stalled-cover-fight",content:"**Trace:** that position sees all required targets, offers replenishment, and has no meaningful vulnerability; advancing only increases risk."},{heading:"diagnose-a-stalled-cover-fight",content:"**Small intervention:** alter its view, resource access, objective relationship, or an enemy's readable pressure. Do not add arbitrary punishment merely to force movement."},{heading:"diagnose-a-stalled-cover-fight",content:"**Test:** observe whether movement now creates a comprehensible advantage without eliminating useful defensive play."},{heading:"5-single-player-challenge-and-multiplayer-fairness-differ",content:"Single-player encounters can deliberately create asymmetry and authored pressure. Their success depends on the intended challenge, readability, resources, and recovery."},{heading:"5-single-player-challenge-and-multiplayer-fairness-differ",content:"Competitive maps must consider rules, skill, team coordination, spawn behavior, resource economy, and changing control. A visually symmetric map can still be unfair; an asymmetric one can support balanced opportunities."},{heading:"map-balance-audit",content:`| Relationship      | Questions                                                                |
| ----------------- | ------------------------------------------------------------------------ |
| Starts and spawns | Can a player orient before danger? Can opponents predict or trap spawns? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship   | Questions                                                                       |
| -------------- | ------------------------------------------------------------------------------- |
| Arrival timing | Who reaches a contested item, angle, or objective first, under actual movement? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                                   |
| ------------ | ----------------------------------------------------------- |
| Sightlines   | Which ranges and weapons dominate? What does exposure cost? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                                     |
| ------------ | ------------------------------------------------------------- |
| Routes       | Are flanks usable, recognizable, and worth their travel cost? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                        |
| ------------ | ------------------------------------------------ |
| Height       | What pays for information and attack advantages? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                                                 |
| ------------ | ------------------------------------------------------------------------- |
| Resources    | Do rewards generate movement and contest, or reinforce permanent control? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                          |
| ------------ | -------------------------------------------------- |
| Chokes       | Do they create decisions or simply remove options? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                                                    |
| ------------ | ---------------------------------------------------------------------------- |
| Rotation     | Can players respond to changing objectives without one route always winning? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                       |
| ------------ | ----------------------------------------------- |
| Recovery     | Can the losing side meaningfully re-enter play? |`,table:"table-0"},{heading:"map-balance-audit",content:`| Relationship | Questions                                                      |
| ------------ | -------------------------------------------------------------- |
| Population   | Does the map still work at its intended player count and mode? |`,table:"table-0"},{heading:"map-balance-audit",content:"Do not impose a three-lane diagram, equal path lengths, or exact mirroring without a rule-specific reason."},{heading:"timing-worksheet",content:"For a relevant route, measure:"},{heading:"timing-worksheet",content:"Spawn-to-contact."},{heading:"timing-worksheet",content:"Spawn-to-objective/item."},{heading:"timing-worksheet",content:"Rotation between objectives."},{heading:"timing-worksheet",content:"Time exposed to a contested sightline."},{heading:"timing-worksheet",content:"Respawn-to-reengagement."},{heading:"timing-worksheet",content:"Resource and objective cycles."},{heading:"timing-worksheet",content:"Measure using representative players and movement options. Distance divided by top speed is only an approximation, not match evidence."},{heading:"6-test-balance-with-context",content:"Record map version, mode, player count, teams, experience, rules, and major events. Examine where advantage develops, not just the final winner."},{heading:"6-test-balance-with-context",content:"Useful evidence includes:"},{heading:"6-test-balance-with-context",content:"Side-swapped rounds."},{heading:"6-test-balance-with-context",content:"Repeated contested timings."},{heading:"6-test-balance-with-context",content:"Routes chosen and routes consistently ignored."},{heading:"6-test-balance-with-context",content:"Control, resource possession, deaths, and recovery patterns."},{heading:"6-test-balance-with-context",content:"Reports from both inexperienced and practiced players."},{heading:"6-test-balance-with-context",content:"Win rates from a small uneven group do not prove a side advantage. Heatmaps can locate activity but cannot alone explain its cause."},{heading:"6-test-balance-with-context",content:"Competitive skill also evolves. A once-uncontested relationship can change when a community discovers movement, tactics, or resource timing. Treat balance as a continuing inquiry."},{heading:"deliverable",content:"Provide an encounter or map hypothesis, annotated relationships, tested timings/states where available, and one prioritized change with a follow-up test. Do not claim “balanced” from a plan or a single match."}],headings:[{id:"1-separate-system-design-from-encounter-design",content:"1. Separate system design from encounter design"},{id:"2-design-enemies-as-legible-relationships",content:"2. Design enemies as legible relationships"},{id:"3-build-encounters-around-a-question",content:"3. Build encounters around a question"},{id:"working-sequence",content:"Working sequence"},{id:"difficulty-changes",content:"Difficulty changes"},{id:"4-cover-is-a-sightline-and-protection-system",content:"4. Cover is a sightline and protection system"},{id:"evaluate-relationships-not-object-counts",content:"Evaluate relationships, not object counts"},{id:"diagnose-a-stalled-cover-fight",content:"Diagnose a stalled cover fight"},{id:"5-single-player-challenge-and-multiplayer-fairness-differ",content:"5. Single-player challenge and multiplayer fairness differ"},{id:"map-balance-audit",content:"Map-balance audit"},{id:"timing-worksheet",content:"Timing worksheet"},{id:"6-test-balance-with-context",content:"6. Test balance with context"},{id:"deliverable",content:"Deliverable"}]},r=[{depth:2,url:"#1-separate-system-design-from-encounter-design",title:e.jsx(e.Fragment,{children:"1. Separate system design from encounter design"})},{depth:2,url:"#2-design-enemies-as-legible-relationships",title:e.jsx(e.Fragment,{children:"2. Design enemies as legible relationships"})},{depth:2,url:"#3-build-encounters-around-a-question",title:e.jsx(e.Fragment,{children:"3. Build encounters around a question"})},{depth:3,url:"#working-sequence",title:e.jsx(e.Fragment,{children:"Working sequence"})},{depth:3,url:"#difficulty-changes",title:e.jsx(e.Fragment,{children:"Difficulty changes"})},{depth:2,url:"#4-cover-is-a-sightline-and-protection-system",title:e.jsx(e.Fragment,{children:"4. Cover is a sightline and protection system"})},{depth:3,url:"#evaluate-relationships-not-object-counts",title:e.jsx(e.Fragment,{children:"Evaluate relationships, not object counts"})},{depth:3,url:"#diagnose-a-stalled-cover-fight",title:e.jsx(e.Fragment,{children:"Diagnose a stalled cover fight"})},{depth:2,url:"#5-single-player-challenge-and-multiplayer-fairness-differ",title:e.jsx(e.Fragment,{children:"5. Single-player challenge and multiplayer fairness differ"})},{depth:3,url:"#map-balance-audit",title:e.jsx(e.Fragment,{children:"Map-balance audit"})},{depth:3,url:"#timing-worksheet",title:e.jsx(e.Fragment,{children:"Timing worksheet"})},{depth:2,url:"#6-test-balance-with-context",title:e.jsx(e.Fragment,{children:"6. Test balance with context"})},{depth:2,url:"#deliverable",title:e.jsx(e.Fragment,{children:"Deliverable"})}];function i(t){const n={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Sources: ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/combat",children:"Combat"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/combat/enemy",children:"Enemy design"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/combat/encounter",children:"Encounter"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/combat/cover",children:"Cover"}),", ",e.jsx(n.a,{href:"https://book.leveldesignbook.com/process/combat/balance",children:"Map balance"}),". Adapted and reorganized under CC BY-NC-SA 4.0."]}),`
`,e.jsx(n.h2,{id:"1-separate-system-design-from-encounter-design",children:"1. Separate system design from encounter design"}),`
`,e.jsx(n.p,{children:"Combat systems define movement, aiming, attacks, damage, resources, defenses, enemy behavior, and feedback. An encounter arranges those capabilities in a particular situation."}),`
`,e.jsx(n.p,{children:"If the core attack is unreadable or movement is unreliable, adding a better room may not solve the problem. Identify whether the failure belongs to the mechanic, the arrangement, or their interaction."}),`
`,e.jsx(n.p,{children:"Before designing a fight, establish:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Player movement and attack capabilities."}),`
`,e.jsx(n.li,{children:"Expected information and reaction opportunities."}),`
`,e.jsx(n.li,{children:"Enemy perception, reach, mobility, and failure states."}),`
`,e.jsx(n.li,{children:"Available health, ammunition, abilities, and replenishment."}),`
`,e.jsx(n.li,{children:"Intended difficulty, failure cost, and audience."}),`
`]}),`
`,e.jsx(n.p,{children:"Numerical damage is only part of effective pressure. Exposure, accuracy, telegraphing, range, travel time, cover, and combined threats change the outcome."}),`
`,e.jsx(n.h2,{id:"2-design-enemies-as-legible-relationships",children:"2. Design enemies as legible relationships"}),`
`,e.jsx(n.p,{children:"A useful enemy role creates a reason to act differently. Roles might pressure distance, displace the player, deny a position, demand priority, punish exposure, or support another enemy."}),`
`,e.jsx(n.p,{children:"For each role, specify:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"What the player can perceive before being punished."}),`
`,e.jsx(n.li,{children:"What action or situation the enemy encourages."}),`
`,e.jsx(n.li,{children:"Which weakness or counterplay can be learned."}),`
`,e.jsx(n.li,{children:"What changes when combined with other roles."}),`
`,e.jsx(n.li,{children:"How the level gives the behavior enough room to function."}),`
`]}),`
`,e.jsx(n.p,{children:"Do not equate better AI with greater intelligence, omniscience, or maximum lethality. Behavior should support the intended experience and communicate state."}),`
`,e.jsx(n.p,{children:"For stealth especially, distinguish sensing from interpretation. Suspicion, investigation, search, alert, and recovery need readable evidence and a workable information model. The exact implementation is project-specific."}),`
`,e.jsx(n.h2,{id:"3-build-encounters-around-a-question",children:"3. Build encounters around a question"}),`
`,e.jsx(n.p,{children:"Use a compact encounter brief:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Intended decision, feeling, or skill."}),`
`,e.jsx(n.li,{children:"Starting view, player state, and resources."}),`
`,e.jsx(n.li,{children:"Enemy roles, positions, patrols, and arrival conditions."}),`
`,e.jsx(n.li,{children:"Relevant geometry, height, cover, routes, and exits."}),`
`,e.jsx(n.li,{children:"Escalation, reinforcement, completion, failure, and reset conditions."}),`
`,e.jsx(n.li,{children:"Expected alternate approaches and possible exploits."}),`
`,e.jsx(n.li,{children:"Evidence that would show the encounter is working."}),`
`]}),`
`,e.jsx(n.h3,{id:"working-sequence",children:"Working sequence"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Establish an entry view that communicates enough to act."}),`
`,e.jsx(n.li,{children:"Give the first commitment a cost and an intelligible alternative."}),`
`,e.jsx(n.li,{children:"Arrange enemy roles so their interaction matters."}),`
`,e.jsx(n.li,{children:"Provide room for movement, recovery, or deliberate confinement."}),`
`,e.jsx(n.li,{children:"Vary conditions where appropriate rather than only increasing counts."}),`
`,e.jsx(n.li,{children:"Define what happens if the player retreats, bypasses, rushes, or returns."}),`
`,e.jsx(n.li,{children:"Test with plausible incoming resources, not only a fully equipped author."}),`
`]}),`
`,e.jsx(n.p,{children:"An “arena” is not automatically a circular room with a locked door. Confinement, spawning, and wave structures are choices that must serve the goal."}),`
`,e.jsx(n.h3,{id:"difficulty-changes",children:"Difficulty changes"}),`
`,e.jsx(n.p,{children:"Consider changing composition, placement, resources, information, timing, and behavior—not only health or damage. Verify that a change preserves the intended lesson and does not remove counterplay."}),`
`,e.jsx(n.p,{children:"A difficult fight can be appropriate. Unclear causality, unavoidable damage, broken camera views, or excessive repetition may be a different problem."}),`
`,e.jsx(n.h2,{id:"4-cover-is-a-sightline-and-protection-system",children:"4. Cover is a sightline and protection system"}),`
`,e.jsx(n.p,{children:"Cover includes any structure that blocks relevant sightlines or attacks; it is not limited to chest-high boxes or explicit cover mechanics."}),`
`,e.jsx(n.p,{children:"Describe cover by what the actual game supports:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Partial versus full occlusion."}),`
`,e.jsx(n.li,{children:"Standing versus crouched use."}),`
`,e.jsx(n.li,{children:"Hard protection versus concealment only."}),`
`,e.jsx(n.li,{children:"Penetrable, destructible, temporary, or movable behavior."}),`
`,e.jsx(n.li,{children:"Directionality, width, depth, edge exposure, and nearby movement options."}),`
`]}),`
`,e.jsx(n.h3,{id:"evaluate-relationships-not-object-counts",children:"Evaluate relationships, not object counts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"What can be seen and hit from each position?"}),`
`,e.jsx(n.li,{children:"What becomes exposed while moving between positions?"}),`
`,e.jsx(n.li,{children:"Does a protected spot create a decision or permit indefinite inactivity?"}),`
`,e.jsx(n.li,{children:"Can enemies approach, flank, displace, or deny it in a readable way?"}),`
`,e.jsx(n.li,{children:"Can both sides read the same silhouette and collision boundary?"}),`
`,e.jsx(n.li,{children:"Does the camera imply safety while the hitbox or weapon origin remains exposed?"}),`
`]}),`
`,e.jsx(n.p,{children:"Adding cover everywhere can fragment sightlines, clutter movement, flatten long-range roles, or reduce urgency. Too little cover can remove tactical options. Neither density is universally correct."}),`
`,e.jsx(n.h3,{id:"diagnose-a-stalled-cover-fight",children:"Diagnose a stalled cover fight"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Problem:"})," players never leave the first safe position."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Trace:"})," that position sees all required targets, offers replenishment, and has no meaningful vulnerability; advancing only increases risk."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Small intervention:"})," alter its view, resource access, objective relationship, or an enemy's readable pressure. Do not add arbitrary punishment merely to force movement."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Test:"})," observe whether movement now creates a comprehensible advantage without eliminating useful defensive play."]}),`
`,e.jsx(n.h2,{id:"5-single-player-challenge-and-multiplayer-fairness-differ",children:"5. Single-player challenge and multiplayer fairness differ"}),`
`,e.jsx(n.p,{children:"Single-player encounters can deliberately create asymmetry and authored pressure. Their success depends on the intended challenge, readability, resources, and recovery."}),`
`,e.jsx(n.p,{children:"Competitive maps must consider rules, skill, team coordination, spawn behavior, resource economy, and changing control. A visually symmetric map can still be unfair; an asymmetric one can support balanced opportunities."}),`
`,e.jsx(n.h3,{id:"map-balance-audit",children:"Map-balance audit"}),`

















































`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Relationship"}),e.jsx(n.th,{children:"Questions"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Starts and spawns"}),e.jsx(n.td,{children:"Can a player orient before danger? Can opponents predict or trap spawns?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Arrival timing"}),e.jsx(n.td,{children:"Who reaches a contested item, angle, or objective first, under actual movement?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Sightlines"}),e.jsx(n.td,{children:"Which ranges and weapons dominate? What does exposure cost?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Routes"}),e.jsx(n.td,{children:"Are flanks usable, recognizable, and worth their travel cost?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Height"}),e.jsx(n.td,{children:"What pays for information and attack advantages?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Resources"}),e.jsx(n.td,{children:"Do rewards generate movement and contest, or reinforce permanent control?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Chokes"}),e.jsx(n.td,{children:"Do they create decisions or simply remove options?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Rotation"}),e.jsx(n.td,{children:"Can players respond to changing objectives without one route always winning?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Recovery"}),e.jsx(n.td,{children:"Can the losing side meaningfully re-enter play?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Population"}),e.jsx(n.td,{children:"Does the map still work at its intended player count and mode?"})]})]})]}),`
`,e.jsx(n.p,{children:"Do not impose a three-lane diagram, equal path lengths, or exact mirroring without a rule-specific reason."}),`
`,e.jsx(n.h3,{id:"timing-worksheet",children:"Timing worksheet"}),`
`,e.jsx(n.p,{children:"For a relevant route, measure:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Spawn-to-contact."}),`
`,e.jsx(n.li,{children:"Spawn-to-objective/item."}),`
`,e.jsx(n.li,{children:"Rotation between objectives."}),`
`,e.jsx(n.li,{children:"Time exposed to a contested sightline."}),`
`,e.jsx(n.li,{children:"Respawn-to-reengagement."}),`
`,e.jsx(n.li,{children:"Resource and objective cycles."}),`
`]}),`
`,e.jsx(n.p,{children:"Measure using representative players and movement options. Distance divided by top speed is only an approximation, not match evidence."}),`
`,e.jsx(n.h2,{id:"6-test-balance-with-context",children:"6. Test balance with context"}),`
`,e.jsx(n.p,{children:"Record map version, mode, player count, teams, experience, rules, and major events. Examine where advantage develops, not just the final winner."}),`
`,e.jsx(n.p,{children:"Useful evidence includes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Side-swapped rounds."}),`
`,e.jsx(n.li,{children:"Repeated contested timings."}),`
`,e.jsx(n.li,{children:"Routes chosen and routes consistently ignored."}),`
`,e.jsx(n.li,{children:"Control, resource possession, deaths, and recovery patterns."}),`
`,e.jsx(n.li,{children:"Reports from both inexperienced and practiced players."}),`
`]}),`
`,e.jsx(n.p,{children:"Win rates from a small uneven group do not prove a side advantage. Heatmaps can locate activity but cannot alone explain its cause."}),`
`,e.jsx(n.p,{children:"Competitive skill also evolves. A once-uncontested relationship can change when a community discovers movement, tactics, or resource timing. Treat balance as a continuing inquiry."}),`
`,e.jsx(n.h2,{id:"deliverable",children:"Deliverable"}),`
`,e.jsx(n.p,{children:"Provide an encounter or map hypothesis, annotated relationships, tested timings/states where available, and one prioritized change with a follow-up test. Do not claim “balanced” from a plan or a single match."})]})}function l(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{l as default,s as frontmatter,o as structuredData,r as toc};
