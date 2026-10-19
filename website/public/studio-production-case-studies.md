# Studio production case studies and acceptance lessons

Baseline research checked 2026-10-18; added AAA production cases were source-reviewed on 2026-10-19. These are primary engineering accounts and creator presentations, not runtime tests. Historical claims retain their original game/version context. Studio-internal tooling is represented as knowledge, not an available external agent interface. Proposed recipes below are **GameMap editorial guidance** and have no adapter implementation or execution evidence.

## Main conclusions

1. Catalog asset readiness as multiple states: authored, converted, dependency-complete, loaded, initialized, activated, saved and reopened.
2. Separate preview shortcuts from release acceptance. A useful cached or stale preview is not a fully current build.
3. Keep hardware, driver, cache state, internal resolution and exact engine fork in performance evidence.
4. Treat behavior coverage, regression coverage and artistic quality as different acceptance dimensions.
5. Capture negative results and unsupported rollback paths, not just successful API invocations.

## Find a production lesson

| Production question | First-hand case | What to inspect |
| --- | --- | --- |
| Preserve authored work after procedural changes | [Spider-Man encounters](#marvels-spider-man-preserve-and-revalidate-authored-encounters-after-world-edits) | Conditional preserve/repair/remove outcomes and spatial diagnostics |
| Keep biome edits consistent across systems | [Ghost of Tsushima environmental effects](#ghost-of-tsushima-biome-changes-must-propagate-into-environmental-effects) | Failed placement approaches, nonlocal regressions and explicit exceptions |
| Revise scope and layouts without losing intended play | [Phantom Liberty blockouts](#cyberpunk-2077-phantom-liberty-blockouts-preserve-constraints-not-frozen-layouts) | Landmarks, playstyle routes, cinematic dependencies and provisional spaces |
| Validate character exports at production scale | [Spider-Man characters](#marvels-spider-man-engine-validation-and-crowd-budgets) | Supplier overrides, DCC/runtime deformation differences and crowd budgets |
| Balance approximation quality with authoring cost | [Ghost of Tsushima lighting](#ghost-of-tsushima-lighting-approximation-costs) | Thin-wall leaks, probe masks and unsupported lighting contributions |
| Establish playable iteration before expanding tools | [Uncharted postmortem](#uncharted-drakes-fortune-early-playable-iteration) | Overgeneralized systems, implementation delays and gameplay readability |
| Measure the whole delivery chain | [Rainbow Six Siege workflow](#rainbow-six-siege-map-handoffs-before-optimizing-production) | Handoffs, waiting, rework and quality/time tradeoffs |
| Prioritize tests without hiding omitted coverage | [EA SUPERNOVA](#ea-supernova-test-selection-has-its-own-cost-and-error-model) | Selected/omitted populations, class-specific errors and operating cost |

These are historical developer accounts. Source articles, slides and curated before/after images are reading materials, not licensed game assets or executable integrations. The existing Fortnite, Destiny, Horizon, Riot, Far Cry and EA cases remain below.

## Fortnite Nanite asset conditioning

Source: [Fortnite Nanite asset conditioning](https://www.unrealengine.com/tech-blog/bringing-nanite-to-fortnite-battle-royale-in-chapter-4)
Context: 2023-01-26; UE5.1 Fortnite Chapter 4

**Published evidence.** Epic found opaque geometric foliage faster than masked cards for this content. Wind was baked from Houdini Vellum into textures indexed by branch UV data. Preserve Area addressed disappearing distant canopy; it was intended only for affected foliage. World Position Offset bounds could cause disappearing geometry or excessive culling conservatism.

**Proposed agent-ready recipe.** Build a foliage conditioning comparison with fixed camera paths, near/far canopy coverage, animated bounds, base-pass and shadow timings. Compare cards and geometry on target hardware. Record source mesh, UV encoding and wind bake revision. Treat the historical optimization as a hypothesis, not a universal rule.

## Fortnite shadow budgeting and failure cases

Source: [Fortnite shadow budgeting and failure cases](https://www.unrealengine.com/tech-blog/virtual-shadow-maps-in-fortnite-battle-royale-chapter-4?lang=en-US)
Context: 2023-01-26; UE5.1 Fortnite Chapter 4

**Published evidence.** Moving sun and animated foliage undermined shadow caching. Throttled invalidation introduced page artifacts; near-camera trees were expensive. Epic budgeted uncached sun shadows and used a diagnostic console variable to identify non-Nanite page-area offenders. Shadow proxy benefits were mainly close-range, not a blanket distant-LOD saving.

**Proposed agent-ready recipe.** Use traversal scenarios that look upward inside dense trees, change time of day and cross indoor/outdoor lighting. Capture page invalidation, GPU timings and flicker artifacts. Compare cold and stable views. Keep any resolution or cache-policy change reversible and evaluate art direction with the performance delta.

## Fortnite lighting budget and gameplay readability

Source: [Fortnite lighting budget and gameplay readability](https://www.unrealengine.com/tech-blog/lumen-brings-real-time-global-illumination-to-fortnite-battle-royale-chapter-4?lang=en-US)
Context: 2023-01-26; UE5.1 with explicitly identified later fix

**Published evidence.** For its console 60-fps target, Fortnite allocated about four milliseconds to GI and reflections and selected software tracing. Foliage occlusion, water streaking, exposure swings and dark interiors required fixes or art controls. One last-minute water fix was explicitly absent from the public UE5.1 release.

**Proposed agent-ready recipe.** Record internal resolution separately from display resolution. Evaluate a lighting change across moving-camera water, dense foliage and interior transitions; measure readability and temporal stability alongside GPU cost. Tag engine fork/revision so a shipped-game result does not imply the same feature exists in a nominal public release.

## PSO precaching production limits

Source: [PSO precaching production limits](https://www.unrealengine.com/tech-blog/game-engines-and-shader-stuttering-unreal-engines-solution-to-the-problem)
Context: 2025-02-04; historical UE5.2 introduction and UE5.5 limitations

**Published evidence.** Bundled caches depend on discovered content permutations and can miss dynamic material changes. Load-time precaching narrows the combinations, but driver caches make later runs materially different. The article identifies global graphics shaders as a UE5.5 gap and mobile precache timeouts as another first-use hitch risk.

**Proposed agent-ready recipe.** Create separately labeled cold-driver-cache and warm-cache performance runs. Exercise skins, material swaps, quality presets and newly streamed objects. Record GPU, driver, RHI, shader content revision, cache state and loading completion. Do not erase user caches as part of an unapproved diagnostic; use an isolated test profile.

## Editor revision integrity and team iteration

Source: [Editor revision integrity and team iteration](https://cdn2.unrealengine.com/workflow-on-fortnite-whitepaper-final-181633758.pdf)
Context: historical Epic whitepaper; exact publication date not established

**Published evidence.** Epic describes mismatched binary modules producing crashes and memory corruption, and old editors discarding unknown serialized properties. Its solution stamps editor build changelists into assets and rejects newer-created assets in older editors. UGS exposes build results and human feedback, replacing a slow promotion bottleneck.

**Proposed agent-ready recipe.** Before an agent opens or resaves a project, compare editor build identity, modules, plugin revisions and asset provenance. Keep a disposable workspace and write a manifest. Run reopen checks with the intended consuming build. A green compile badge must remain separate from an asset integrity or gameplay acceptance result.

## Destiny 2 asset pipeline scalability

Source: [Destiny 2 asset pipeline scalability](https://media.gdcvault.com/gdc2018/presentations/Moro_Brandon_Bungies_Asset_Pipeline.pdf)
Context: Brandon Moro, Bungie; GDC2018 slides

**Published evidence.** Bungie replaced a highly connected task graph with smaller per-asset graphs, explicit dependencies, asset-level caching and load-time references. Reports explain cache reuse and invalidation causes. Local iteration could deliberately accept stale ambient occlusion or missing audio, demonstrating that preview freshness differs from complete production output.

**Proposed agent-ready recipe.** Model preview and release-ready builds as different contracts. Store dependency closure, input hashes, cache hit/miss reasons and stale exceptions per asset. Profile graph traversal and packaging separately from transform execution. Reject preview-only relaxed dependencies in release validation; never label cache reuse as a newly executed transform.

## Horizon asset activation and streaming

Source: [Horizon asset activation and streaming](https://d3d3g8mu99pzk9.cloudfront.net/AstridHuntjens/Streaming%20the%20world%20of%20Horizon%20Zero%20Dawn.pdf)
Context: studio-linked talk; listing dated 2023-03-21; Horizon Zero Dawn system

**Published evidence.** Decima separates deserialization, link resolution, initialization and world activation. Content graphs use streaming links to partition dependencies; initialization respects dependency order. Files are reference-counted and shared objects are loaded once. The system moved beyond corridor loading and avoided packing during iteration.

**Proposed agent-ready recipe.** Expose loaded, initialized and activated as distinct readiness states. Stress streaming with fast travel, reversals and overlapping dependencies; monitor resident bytes and delayed activation. Check that unloading one consumer does not invalidate shared content still used elsewhere. This is a proposed cross-engine test, not a public Decima API binding.

## Horizon quest graph successes and rollback limit

Source: [Horizon quest graph successes and rollback limit](https://www.guerrilla-games.com/media/News/Files/GDC2017_Szczepanski_BuildingNonLinearNarrativesInHorizonZeroDawn.pdf)
Context: Leszek Szczepanski, Guerrilla; GDC2017 slides

**Published evidence.** Quest steps form a cause-and-effect graph with a finite verb vocabulary. Completion opens or closes graph regions, enabling nonlinear paths and repeated-pattern generation. The talk identifies a failure: the story metaphor did not support reversing previously completed events; its verb vocabulary also needed expansion.

**Proposed agent-ready recipe.** Generate quest tests from typed verbs and reachability, then cover save/reload, abandonment, failure, repeated events and rollback. Keep narrative quality assessment separate from state-machine validity. Report unsupported verbs and irreversible transitions before authoring. This recipe needs a project-specific quest-state adapter.

## Learned Motion Matching integration limits

Source: [Learned Motion Matching integration limits](https://www.ubisoft.com/en-us/studio/laforge/news/6xXL85Q3bF2vEj76xmnmIu/introducing-learned-motion-matching)
Context: Ubisoft La Forge; 2020-07-30 research explanation

**Published evidence.** Motion matching selects from supplied motion, so separate walking and drinking examples do not create walking-while-drinking. Feature and motion databases consume increasing memory. Learned Motion Matching targets replacement of lookup machinery; transition blending, foot locking and IK remain relevant integration steps.

**Proposed agent-ready recipe.** Build a behavior-coverage matrix before choosing or generating motion. Measure trajectory error, foot sliding, hand contacts, transition discontinuity, memory and runtime cost. Include held-out behavior combinations and mark absent training coverage explicitly. A research demonstration does not prove an accessible production SDK or successful engine integration.

## League automated testing reliability

Source: [League automated testing reliability](https://www.riotgames.com/en/news/automated-testing-league-legends)
Context: Jim Merrill, Riot; 2016-02-26 historical BVS system

**Published evidence.** Riot separated executor, game driver and test scripts, using RPC commands and state queries. Conditional waits replaced sleeps. Tests passed a staging period before blocking builds; deployment-blocking smoke checks were distinct from functional coverage. The reported system complemented manual testing rather than eliminating it.

**Proposed agent-ready recipe.** Expose explicit observations and predicates instead of arbitrary delays. Separate infrastructure failure, assertion failure, timeout and flaky-test quarantine. Preserve the same scenario locally and in CI, with driver-specific setup. Avoid promoting newly generated tests to build blockers until repeated reliability evidence supports that policy.

## League replay determinism engineering

Source: [League replay determinism engineering](https://www.riotgames.com/en/news/determinism-league-legends-implementation)
Context: Riot engineering; 2017-06-20 historical server system

**Published evidence.** Riot targeted gameplay-essential state rather than all memory. It recorded frame inputs and variable delta times, unified clocks and gameplay PRNG use, and isolated network state. Pointer-based ordering and uninitialized values caused divergences. A seed alone was insufficient. The reported server kept gameplay updates effectively single-threaded: delayed workers blocked the main thread deterministically, and game data were preloaded to avoid I/O races.

**Proposed agent-ready recipe.** Define the state projection and tolerance before calling a run reproducible. Record input order, initial configuration, clock deltas, RNG state, content/build identity and asynchronous completion policy. Compare per-frame hashes and locate the first divergence. Scope claims to tested platforms and builds; visual similarity is not deterministic replay.

## Dead Cells: generation must preserve the authored experience

**Primary source and scope.** Sébastien Benard’s firsthand [The Level Design of Dead Cells](https://deepnight.net/tutorial/the-level-design-of-dead-cells-a-hybrid-approach/) displays **2020-02-15** and republishes an earlier post whose link now redirects. Treat this as a republication date, not a game-build date. His [biography](https://deepnight.net/about/) confirms his Motion Twin lead developer/game-designer role.

**Published account.** Benard reports insufficient capacity for full handcrafting, while a procedural prototype refreshed combat but produced incoherent levels. The hybrid retained fixed world progression, biome-specific handmade rooms and authored graphs specifying paths and special rooms. Candidate rooms had to satisfy graph interfaces and purpose; monster placement added quantity and compatibility constraints. A **2022-09-06 author reply** says the brute-force approach changed because of Switch-port difficulties. It does not specify the revised implementation or release version; do not label it verified Wave Function Collapse.

**GameMap editorial adaptation, unimplemented.** Separate visual variety from preservation of design intent. Before assembling rooms, record required progression, room purpose, traversal affordances and encounter constraints. A useful proposed acceptance packet would contain the graph, chosen room IDs, collision/traversal checks and a playable trace with representative views. Evaluate the intended rhythm and biome identity independently of graph validity: a connected map can still be badly paced. Add a contradiction/unsatisfied-room outcome rather than concealing repeated random attempts behind a successful final image.

**Limits.** This is retrospective developer evidence, not a controlled comparison or verified current implementation. An available integration and any AI-creator benefit would need independent evidence.

## Far Cry 5: stale previews and excessive automation can invalidate feedback

**Primary source and scope.** Étienne Carrier, Ubisoft, [Procedural World Generation of Far Cry 5, GDC 2018](https://www.gdcvault.com/play/1025557/Procedural-World-Generation-of-Far), with [145-page primary slide PDF](https://media.gdcvault.com/gdc2018/presentations/ProceduralWorldGeneration.pdf). The event listing establishes **GDC 2018**, not an exact talk day. Findings concern the historical Far Cry 5 pipeline, not a public Houdini/Dunia release. The [SideFX-hosted presentation page](https://www.sidefx.com/community/far-cry-5/) is dated **2018-06-05**.

**Published account, PDF pages 139–143, with nightly rebuilding described on [pages 10–11](https://media.gdcvault.com/gdc2018/presentations/ProceduralWorldGeneration.pdf#page=10).** Gradient biome painting was supported technically but overlapping colors were difficult to debug, and acceptable results did not require gradients. Separately cached terrain data saved some processing but required artists to rebake after terraforming. Missed refreshes made local results differ from the correctly rebuilt nightly world; the team moved terrain-data generation inside consuming tools. Carrier also reports that the art direction’s dense forests obstructed AI and large-animal navigation. The production compromise bounded density by gameplay needs. Artists preferred manually shaping riverbeds despite an available automatic carving feature.

**Supporting design boundary.** Ubisoft’s [2018-03-26 interview with associate level-design directors Alain Greco and Andrejs Verlis](https://news.ubisoft.com/en-us/article/16TjVZmAtD85EWcvHtxHXL/far-cry-5-creating-curiosity-in-a-familiar-world) distinguishes procedural placement of natural assets from the largely handcrafted map. Navigation, player progression and landscape-led wayfinding remained deliberate design concerns.

**GameMap editorial adaptation, unimplemented.** Feedback should identify the dependency generation that produced the viewed scene. A proposed regression fixture changes terrain after caching, compares a local preview with a clean rebuild, and verifies that downstream masks, placement and navigation use the intended revision. Preserve before/after views alongside input hashes and rebuild status; do not interpret a visually appealing stale preview as evidence about the final build. Pair density/style judgments with agent-size-specific navigation and route-readability checks. Review artist overrides as desired controls, not automatically as defects to eliminate. Any automation tradeoff should include user-visible complexity and reproducibility, not only transform runtime.

**Limits.** These are explicit production anecdotes without controlled effect sizes. The reviewed materials do not supply the internal tools, a reproducible benchmark or current engine compatibility. Their lessons motivate proposed checks; they do not demonstrate visual-agent or harness improvements.


Reviewed slide-file SHA-256: `6ef919fd07383a56038502a39fb9f73c2c8c7c606da4685958dadac113804c93`. This identifies the inspected document, not an engine build or reproduced workflow.


## EA AutoPlayers: learned locomotion inside controlled test scenarios

**Primary source and scope.** EA/SEED's [CoG 2023 publication page](https://www.ea.com/seed/news/cog23-challenges-deploying-rl-agents-game-testing) identifies a production-integration experiment in Battlefield 2042 and Dead Space (2023). The [paper, arXiv v1 dated 2023-07-19](https://arxiv.org/html/2307.11105v1), describes historical internal systems, not a downloadable GameMap adapter. Checked 2026-10-19.

**Published engineering observations, §§II–V, VII.** Existing scripted AutoPlayers retained test objectives while learned controllers handled helicopter and zero-gravity locomotion. Exported ONNX models were packaged with game data; deployed inference reused training's observation-collection code. Structured state avoided per-agent rendering cost and sensitivity to graphical changes. The authors distinguish prototype, stripped test-range and production environments, explicitly warning that removing visual content changes image-based observations. Accelerating simulation caused parked helicopters to fall through the ground in their experiment. They recommend a stable game revision, continued testing of the training setup as production changes, and retaining scripted control where it already works. These are integration lessons, not a controlled estimate of improved bug yield, coverage or player enjoyment.

**Release and transfer boundary.** The inspected paper and EA publication page do not establish a public release of the in-house trainer, AutoPlayers integration, game projects or trained models. An ONNX output format is not sufficient to reproduce their observation schema, game-side controls or proprietary runtime. No current installation or asset/model entitlement was verified.

**GameMap editorial adaptation, unimplemented.** Compare a scripted baseline with replacement of one explicitly identified controller, keeping scenario objectives and failure oracles fixed. Record game revision, observation/action schema, model identity, timestep and test-range/production differences. Retain structured transitions alongside visual evidence when inspecting generated scenes. Before using stripped assets or faster simulation to reduce evaluation cost, verify the intended visual and collision observations separately; count invalid simulations and retraining costs rather than silently dropping them. Keep route completion, explored behavior, triaged defects and designer/player judgments as separate outcomes. This proposed test design has not been implemented or evaluated.

## Marvel’s Spider-Man: preserve and revalidate authored encounters after world edits

**Primary evidence and scope.** David Santiago’s [SIGGRAPH 2019 paper](https://history.siggraph.org/wp-content/uploads/2022/09/2019-Talks-Santiago_Procedural-System-Assisted-Authoring.pdf) describes Insomniac’s historical PS4 production pipeline. Read §§1–3, especially the second page’s repair and diagnostic workflow.

**Published account.** Street/alley curves and building primitives supplied an initial procedural city; artists subsequently refined it. Encounter placement consumed ground/building geometry, road data, exclusion volumes and occupied locations, applying density, clearance and orientation constraints. An arrest example required at least 150 metres between placements and more than nine metres from crosswalks. City changes could invalidate already-polished encounters. A tagging mechanism distinguished adjusted content: reprocessing could preserve it when critical requirements still held, remove an unusable placement, or flag a repairable one. Inspection outputs included debug-camera coordinates, colored volumes and spatial annotations. Validation could adjust, flag or remove invalid assets and gameplay markup.

**GameMap editorial adaptation, unimplemented.** Make regeneration a reviewable change set. A proposed fixture would edit a street or rooftop beside a manually adjusted encounter, then retain the previous artifact, new input revision, preservation decision and reasons. Test clearance and route validity after the edit, and capture a camera view at every flagged location. Require project-specific approval before destructive cleanup; record unresolved placements rather than reporting the remaining valid ones as complete success.

**Limits.** This is an author report, not a downloadable pipeline or measured agent benchmark. The paper does not establish lossless preservation, universally valid placement distances, or autonomous artistic judgment. Its use of “AI” for placement improvements is not evidence of LLM or generative-agent involvement.

## Ghost of Tsushima: biome changes must propagate into environmental effects

**Primary evidence and scope.** Environment Art Lead Joanna Wang’s [July 2020 account](https://blog.playstation.com/2020/07/09/crafting-the-world-of-tsushima/) and Lead VFX Artist Matt Vainio’s [January 2021 breakdown](https://blog.playstation.com/2021/01/12/how-stunning-visual-effects-bring-ghost-of-tsushima-to-life/) describe the original game’s production. They address artistic control and the maintenance cost of a changing world.

**Published account.** Wang describes intentionally restricting foliage variety within biomes and using procedural tools to accommodate later type/density changes. Vainio reports that attaching falling-leaf effects to dense tree instances was too expensive; short activation distances could leave falling leaves unseen while players rode past. Growing separate emitters from masks introduced gaps, while local rule fixes could damage other forests. The replacement sampled a runtime biome map, combined with terrain/material/wind inputs, through a camera-following ambience system. Some effects retained the growth workflow. In both approaches, environmental edits could carry their effects with them rather than requiring wholesale manual replacement.

**GameMap editorial adaptation, unimplemented.** Treat a biome edit as a cross-system dependency change. A proposed review would move a forest boundary, regenerate or refresh affected outputs, and inspect both the edited area and untouched reference regions. Include mounted traversal and distant views, recording gaps, biome mismatch and particle cost alongside still images. Keep artistic distribution controls and explicit exceptions; a successful local repair should not silently pass as a world-wide regression check.

**Limits.** The articles provide first-hand failure/recovery narratives, not an open tool implementation or controlled productivity result. The VFX page now displays an additional May 2026 date; no revision history establishes which passages changed. Preserve the original-game context rather than treating it as a current-engine specification.

## Cyberpunk 2077: Phantom Liberty: blockouts preserve constraints, not frozen layouts

**Primary evidence and scope.** CD PROJEKT RED’s October 2024 designer accounts for [No Easy Way Out](https://www.cyberpunk.net/en/news/50902/blocktober-3-andrzej-gielzak) and [The Killing Moon](https://www.cyberpunk.net/en/news/50935/blocktober-5-sebastian-mcbride-and-mariusz-kubow) include development/final imagery and specific authoring decisions. These are retrospective examples, not current editable project files.

**Published account.** Andrzej Giełzak describes reducing a main-quest location to a smaller minor-quest scope while reusing its district footprint. A central statue was intended to prevent disorientation during spiral ascent. Combat retreat, sequential camera views and jump routes supported that progression; the ripperdoc room remained relatively low-detail pending cinematic requirements, with its gallery connection retained. Separately, Sebastian McBride recalls roughly five substantially different Maglev layouts, prioritizing circulation around a quest-critical booth. Mariusz Kubów describes changing the Viewing Gallery’s fundamental layout late in production and adding a prototyped hanging rocket.

**GameMap editorial adaptation, unimplemented.** Store the intended experience beside the blockout: scope, recognizable landmarks, playstyle routes, cinematic dependencies and the questions the draft is meant to answer. After a layout revision, compare matched views and traversal traces for each supported playstyle. Keep provisional spaces visibly provisional. Distinguish approval of narrative/spatial intent from approval of lighting, decoration, collision or final runtime behavior.

**Limits.** The published screenshots are curated artifacts. They do not expose all intermediate variants, source scenes, playtest data or exact game-build revisions. The reports show iteration and scope adaptation, without proving that a particular layout, tool or review method caused the shipped result’s quality.

## Marvel’s Spider-Man: engine validation and crowd budgets

**Primary source and scope.** Noah Alzayer, Insomniac character TD, [GDC March 2019 presentation](https://media.gdcvault.com/gdc2019/presentations/Alzayer_Noah_SuperHumansOf.pdf), about the historical game pipeline.

**Published production account.** External facial-rig deliveries were clean files, while Insomniac preserved its additions separately. A tool converted pose/scan feedback into in-engine comparison videos. Relative skin loading preserved face weights while replacing body weights. Triangulation produced deformation artifacts absent in Maya; custom triangulation improved the silhouette. For open-world civilians and police, even simplified separate facial rigs proved too expensive. Combining heads with body rigs removed per-head joint positioning; most facial joints therefore translated rather than rotated. Generic clavicle weighting also caused clipping. See PDF pages 21–26, 34–49 and 52–64.

**GameMap editorial adaptation, unimplemented.** Evaluate exported characters at intended population density. Preserve aligned DCC/runtime views, rig/topology revisions, override provenance and frame/memory measurements. Test whether a second supplier delivery preserves local corrections. Judge silhouette, expression, clipping and crowd cost separately. This requires a project-specific export/capture path.

## Ghost of Tsushima: lighting approximation costs

**Primary source and scope.** Jasmin Patry, Sucker Punch, [Real-Time Samurai Cinema](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html), SIGGRAPH 2021; [author-hosted PDF with speaker notes](https://www.glowybits.com/talks/real-time_samurai_cinema/real-time_samurai_cinema.pdf). Historical PS4-era production.

**Published production account.** Dynamic sky lighting reused baked visibility data. A full transfer matrix was rejected for memory and capture cost. Thin-walled interiors exposed light leaks; cone occlusion, planes and low-resolution shadow maps remained unsatisfactory and expensive. The workable compromise classified probes as interior/exterior and used authored surface masks to weight interpolation. The notes explicitly balance runtime overhead against authoring burden. Remaining limits include static bake data, usually excluding movable/destructible objects, inaccurate bounce estimates, and no indirect illumination from local lights. See PDF pages 24–25, 51–60.

**GameMap editorial adaptation, unimplemented.** Test thin walls, moving objects, local lights and changing skies. Retain mask/probe revisions, before/after views and hardware timings. Separate unsupported contributions from regressions; count manual tagging alongside GPU cost. Keep art-directed acceptance explicit rather than automatically selecting the cheapest approximation.

## Uncharted: Drake’s Fortune: early playable iteration

**Primary source and scope.** Neil Druckmann’s first-hand [Uncharted postmortem](https://www.gamedeveloper.com/design/postmortem-naughty-dog-s-i-uncharted-drake-s-fortune-i-), published 2008-10-08, concerns Naughty Dog’s original 2007 PS3 game. It is a retrospective, not independent evaluation.

**Published production account.** Ambitious general animation/AI systems became too complex; the team switched to focused solutions using layered full-body, partial and additive animation, with inverse kinematics for environmental registration. Separately, an overcomplicated tools effort delayed a pipeline for actually playing levels. Planned interchangeable enemy parts also held up enemy implementation before being abandoned. Subtle enemy designs were difficult to distinguish at gameplay distance, despite their plausibility close up. See the animation/AI discussion and numbered production-failure sections 2–4.

**GameMap editorial adaptation, unimplemented.** Require an early playable baseline before expanding authoring scope. Compare character variants from gameplay cameras and close-ups. Record movement/contact behavior and responsiveness alongside presentation. Track implementation delay, rework and iteration time separately from feature count. This does not establish that fewer features universally improve games.

## Rainbow Six Siege: map handoffs before optimizing production

**Primary source and scope.** Ubisoft Montréal's [studio account](https://montreal.ubisoft.com/en/value-stream-mapping-applied-to-video-game-production-the-rainbow-six-siege-case/) credits a Ubisoft Developers Conference 2020 presentation by Gaëlle Robert, Laura Metzlaff and Salomé Jugan. The article's exact publication date is unverified.

**Published observations.** The team mapped operator and elite-skin workflows, including task transfers and ideal versus actual time. Initial mapping took six months. Unprepared managers overestimated task duration; separate managers lacked end-to-end visibility and duplicated work. Elite-skin improvements were reinvested in quality within the existing three-month schedule. For operators, the team selected two similar characters for comparison across a nine-month cycle and reported one delivered with 50% fewer bugs without shortening production. The article does not provide absolute defect counts, severity distribution or a controlled comparison.

**GameMap editorial adaptation, unimplemented.** Evaluate an automation proposal against the whole delivery chain. Record active work, queueing, handoff, rework and acceptance time separately, together with the people and artifacts needed at each transition. Prepare participants before collecting estimates and compare sufficiently similar deliverables. Define whether the goal is shorter lead time, more creative iteration or fewer escaped defects before choosing a metric. Preserve the quality/time tradeoff rather than automatically translating saved task time into faster shipping. A proposed agent acceptance packet should identify the blocked dependency and responsible handoff, not merely report that its own transformation completed.

**Boundary.** This account supports a workflow-analysis lesson. It does not establish an accessible Ubisoft production interface or a generalizable defect-reduction effect.

## EA SUPERNOVA: test selection has its own cost and error model

**Primary source and scope.** EA-authored [SUPERNOVA, ICST 2022](https://arxiv.org/html/2203.05566v2); inspected revision **2023-06-28**. The paper describes historical internal SaaS; no public integration was verified.

**Published observations.** Risk-based selection ranked manual and automated tests using probability, impact and time factors with project-tuned weights. Separate commit prediction used gradient boosting and SZZ-derived labels, whose noise the authors discuss. One historical cohort reported 55% fewer testing hours. A different year-over-year planning comparison included 96 onboarding hours and 12 maintenance hours; the authors estimated approximately 75% first-year test-planning savings. Commit-risk results reported 71% precision/77% recall as macro averages, but only 49%/66% for the risky class, with 214 positive versus 1,215 negative test commits. Test generation and learned test selection remained future work.

**GameMap editorial adaptation, unimplemented.** Keep selection, execution and acceptance separate. Store the candidate-test population, selected and omitted IDs, risk criteria/weights, history window and human overrides. Evaluate time saved alongside missed regressions, defect severity, false alarms and onboarding/maintenance costs. Retain a protected audit sample outside the prioritizer's choices so that reduced observation is not mistaken for reduced risk. Report class-specific performance and label provenance before using a risk score to block changes; inspect a sample of both flagged and unflagged changes manually. No source result here validates replacing visual or gameplay judgment with that score.

**Boundary.** Observational production comparisons do not isolate causality or guarantee unchanged coverage. Their estimates are not a benchmark for an agent harness or evidence of current external availability.

## Concrete documented surfaces added

- VSM page-area diagnostic console variable: documented in the historical Epic article; availability still requires a version probe.
- Lumen quality-group configuration: documented values, with no claim that setting them guarantees a frame budget.

## Recommended evidence envelope for proposed recipes

A future run should retain project/build and plugin revisions, source asset identities, dependency manifest, intended mode, exact target hardware/driver, input and camera schedule, timebase, random state where relevant, cold/warm cache labels, output hashes, native terminal outcomes and validator results. Record elapsed wall time separately from simulated time and GPU timings. Preserve visual artifacts beside structured measurements so a budget improvement cannot hide missing geometry, broken animation or unreadable lighting.

Use distinct outcomes: accepted, rejected by quality rule, unsupported, infrastructure failure, timeout, cancelled and inconclusive. A recipe is not runnable until its project-specific state driver and artifact collector exist.

## Coverage gaps and boundaries

- No access to private Decima, Snowdrop, Tiger or Riot production automation; these cases establish lessons, not installable connectors.
- Current console SDK certification, platform-holder tooling and proprietary build-farm operations are not publicly verified.
- Studio metrics are historical and content-specific; they are not benchmark results for a proposed GameMap environment.
- The Horizon procedural-placement talk listing was found, but the page failed to open; no detailed algorithm claim from it is added here.
- Sunset Overdrive creator talk was located, but the slide PDF failed to open; no detailed streaming implementation claim is added.
- Interchange and color-management references complement these case studies; file-format compatibility alone does not prove that an imported asset preserves production intent.
- Follow-on useful evidence would include current production localization, accessibility, audio-mix acceptance, console certification, multiplayer soak testing and crash triage workflows.
