# Studio production case studies and acceptance lessons

Baseline research checked 2026-10-18; added AAA production cases were source-reviewed on 2026-10-19. These are primary engineering accounts and creator presentations, not runtime tests. Historical claims retain their original game/version context. Studio-internal tooling is represented as knowledge, not an available external agent interface. Proposed recipes below are **GameMap editorial guidance** and have no adapter implementation or execution evidence.

## Main conclusions

1. Catalog asset readiness as multiple states: authored, converted, dependency-complete, loaded, initialized, activated, saved and reopened.
2. Separate preview shortcuts from release acceptance. A useful cached or stale preview is not a fully current build.
3. Keep hardware, driver, cache state, internal resolution and exact engine fork in performance evidence.
4. Treat behavior coverage, regression coverage and artistic quality as different acceptance dimensions.
5. Capture negative results and unsupported rollback paths, not just successful API invocations.

## Find a production lesson

Start with a production question, then follow its historical cases in reading order. These routes cover the cases in this dossier. Reading order is editorial navigation, not an experiment sequence; the shared lessons are GameMap guidance, not reproduced comparisons or runnable integrations.

| Production question | Suggested reading order | What to inspect |
| --- | --- | --- |
| How do world revisions preserve authored play? | [Dead Cells room assembly](#dead-cells-generation-must-preserve-the-authored-experience) → [Far Cry 5 procedural feedback](#far-cry-5-stale-previews-and-excessive-automation-can-invalidate-feedback) → [Spider-Man encounter preservation](#marvels-spider-man-preserve-and-revalidate-authored-encounters-after-world-edits) → [Ghost of Tsushima biome effects](#ghost-of-tsushima-biome-changes-must-propagate-into-environmental-effects) → [Phantom Liberty blockouts](#cyberpunk-2077-phantom-liberty-blockouts-preserve-constraints-not-frozen-layouts) | Preserve progression, placement constraints and authored controls; recheck downstream navigation/effects, untouched regions and intended routes after edits |
| Can the team iterate on a current, trustworthy playable build? | [Uncharted early playable iteration](#uncharted-drakes-fortune-early-playable-iteration) → [Editor revision integrity](#editor-revision-integrity-and-team-iteration) → [Destiny 2 asset pipeline](#destiny-2-asset-pipeline-scalability) → [Remedy Northlight composition](#remedy-northlight-an-edit-can-succeed-without-changing-the-composed-world) → [Rainbow Six Siege handoffs](#rainbow-six-siege-map-handoffs-before-optimizing-production) | Establish a playable baseline; distinguish build identity, preview freshness and effective composition; count waiting and rework across the delivery chain |
| When is streamed content actually usable? | [Horizon activation and streaming](#horizon-asset-activation-and-streaming) → [Cyberpunk acoustic graph](#cyberpunk-2077-streamed-data-must-become-a-usable-graph-not-merely-resident-bytes) | Separate residency, initialization, activation and usable queries; inspect shared dependencies, sector links, multi-frame readiness and absent physics inputs |
| What does a performance saving cost in visible quality and authoring work? | [Fortnite Nanite conditioning](#fortnite-nanite-asset-conditioning) → [Fortnite shadow budgets](#fortnite-shadow-budgeting-and-failure-cases) → [Fortnite lighting and readability](#fortnite-lighting-budget-and-gameplay-readability) → [Ghost of Tsushima lighting](#ghost-of-tsushima-lighting-approximation-costs) → [PSO precaching limits](#pso-precaching-production-limits) | Compare visibility, readability and temporal artifacts with GPU and first-use costs; retain hardware, engine revision and cache state, plus manual authoring effort |
| Do character and traversal changes preserve motion, contacts and feedback? | [Learned Motion Matching](#learned-motion-matching-integration-limits) → [Spider-Man character exports](#marvels-spider-man-engine-validation-and-crowd-budgets) → [Uncharted 4 climbing](#uncharted-4-preserve-feedback-and-authoring-control-across-climbing-contacts) → [Horizon traversal](#horizon-zero-dawn-contact-timing-spatial-correction-and-traversal-authoring-are-separate-problems) | Check behavior coverage and exported deformation at crowd scale; separate probe/event/contact timing from responsiveness and editable route choices |
| Do narrative and dialogue revisions preserve the intended branch and performance? | [Horizon quest graphs](#horizon-quest-graph-successes-and-rollback-limit) → [Mass Effect 2 localization](#mass-effect-2-carry-revision-and-branch-context-through-localization) → [Horizon Remastered conversations](#horizon-zero-dawn-remastered-new-dialogue-motion-invalidates-old-camera-assumptions) | Keep rollback limits, branch/revision context and shot dependencies explicit; review runtime wording, timing and framing separately from import or state-machine validity |
| Can players learn and use alternative feedback, and are its dependencies ready? | [Forza Motorsport accessibility](#forza-motorsport-co-develop-alternative-feedback-without-removing-player-decisions) → [Far Cry New Dawn accessibility](#far-cry-new-dawn-accessibility-scope-must-include-dependency-maturity-and-testing-time) | Preserve player decisions and recurring disabled-player feedback; inspect cue learning, combined controls, communication quality, unfinished dependencies and time for validation |
| What does a test verdict establish, and which coverage is still absent? | [League automated-test reliability](#league-automated-testing-reliability) → [League replay determinism](#league-replay-determinism-engineering) → [EA AutoPlayers](#ea-autoplayers-learned-locomotion-inside-controlled-test-scenarios) → [EA SUPERNOVA selection](#ea-supernova-test-selection-has-its-own-cost-and-error-model) → [VALORANT platform load](#valorant-specify-the-workload-behind-a-concurrency-claim) | Separate reliability, deterministic state, controller behavior, test selection and platform-load scope; retain omitted tests, mocked components, invalid simulations and operating costs before promoting a verdict |
| Does the mix preserve useful cues under changing gameplay load? | [Prototype 2 contextual mix](#prototype-2-consistent-source-assets-still-need-contextual-mix-acceptance) → [Overwatch listener-dependent priority](#overwatch-sound-priority-depends-on-the-listeners-gameplay-situation) | Inspect overlapping mix states, transition continuity, listening modes, deliberate suppression and cue recognition |
| Can a failure be reconstructed from the received evidence? | [Bungie distributed crash evidence](#destiny-a-local-symptom-can-require-a-distributed-evidence-set) → [Valve dump provenance](#valve-retain-the-build-artifacts-that-make-a-dump-interpretable) | Separate correlated reports from complete capture; require matching build artifacts before source attribution and keep diagnosis distinct from reproduction |
| Do authored behavior and encounter timing produce the intended experience? | [F.E.A.R. planning and execution](#fear-inspect-the-information-and-constraints-behind-a-characters-plan) → [Left 4 Dead pacing](#left-4-dead-expose-pacing-state-without-treating-it-as-measured-player-emotion) → [Valve playtesting methods](#valve-playtesting-select-evidence-for-the-experience-question-being-asked) | Separate symbolic plan validity, sensory freshness, realized encounters, proxy/state control and human experience; retain authoring and interpretation limits |

These are historical developer accounts and research explanations. Their source articles, slides and curated images are reading materials; they do not provide licensed game assets, private studio tools or executable GameMap integrations. The proposed acceptance recipes remain unimplemented and unexecuted. To turn a lesson into a project-specific test, start with the [common execution contract](production-work-orders.md#common-execution-contract) and retain the [recommended evidence envelope](#recommended-evidence-envelope-for-proposed-recipes). The [complete-sample integration examples](production-work-orders.md#complete-sample-integration-examples) separately describe inspected upstream projects and existing test scope, not GameMap execution results.

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

## Remedy Northlight: an edit can succeed without changing the composed world

**Primary evidence and historical scope.** Vesa Paakkanen's [Building Game Worlds with OpenUSD](https://presentations.remedy.fi/building-game-worlds-with-openusd.ppsx) and Sebastian Eriksson's [Real-Time World Editing Technology in Northlight](https://presentations.remedy.fi/real-time-world-editing-technology-in-northlight.ppsx) are first-hand GDC presentations dated **2024-03-20**. Remedy explicitly [released the presentations publicly on 2024-08-27](https://www.remedygames.com/article/explore-remedys-gdc2024-talks-on-creating-alan-wake-2). Despite that release page's Alan Wake 2 framing, Paakkanen's slide 19 identifies this USD scene pipeline's production users as **Control 2 and Max Payne 1 & 2 Remake**. It does not establish that Alan Wake 2 shipped with the new world editor.

**Published production account.** The old editor's manual-export workflow and inconsistent reuse concepts motivated a replacement. Remedy wrapped references, variants and sublayers into reusable “bundles,” building their layer stacks dynamically to avoid shared Perforce-file conflicts and permit personal layers. Composition introduced another failure surface: a property could be written successfully but remain hidden by a stronger opinion. Renaming nodes could break overrides and relationships. The proposed response included context visualization, stronger-opinion indicators and substantial supporting tooling; reuse did not remove maintenance complexity. See Paakkanen slides 8, 52, 63–64 and 73–82.

Eriksson separates authoring, disk and runtime representations, explicitly focusing on **entities/components rather than asset conversion**. Export-time scene access records dependencies. Opening a scene or exporting on builders performs a complete in-memory export instead of persisting a cache and dependency graph; the team reported roughly seconds for its production-level export and accepted that work to avoid stale disk data. Subsequent edits re-export affected entities and rebuild their ECS components in the running game. See slides 11, 25–38, 44–53. This is a deliberate freshness/complexity tradeoff, not a universal argument against caches.

**GameMap editorial adaptation, unimplemented.** An editing acceptance record should preserve the requested target layer, authored opinion, strongest composed value, affected dependencies and observed runtime result. A proposed fixture would edit a weaker variant, rename a referenced node and change a dependency outside the visible selection, then compare live-edit results with a clean reopen/export. Treat “write accepted,” “visible change” and “reference integrity preserved” as separate outcomes. Record source-schema and exporter versions independently of runtime layout. Previewing another contributor's layer should include provenance and the intended composition order, with review before destructive cleanup. These checks require a project-specific adapter and do not establish artistic acceptance.

**Availability boundary.** The complete studio-published slide decks are accessible reading material. They do not provide the proprietary editor, live-edit service, schemas, project content or a supported external automation API. Eriksson's future-work slide 78 lists asset-source USD, further DCC interoperability and console workflows. Paakkanen already describes usdFBX and sharing/co-development benefits (slides 42 and 83), so this is unfinished scope rather than evidence that all DCC interoperability was absent.

## Cyberpunk 2077: streamed data must become a usable graph, not merely resident bytes

**Primary evidence and historical scope.** CD PROJEKT RED audio programmer Marek Bielawski's [GDC 2023 session](https://gdcvault.com/play/1029282/Populating-the-World-With-an) and [75-page primary slide deck](https://media.gdcvault.com/gdc2023/Slides/pop_bielawski_marek.pdf) describe the historical acoustic-graph pipeline. The exact game build is unspecified; this is not evidence about later patches or Phantom Liberty.

**Published production account.** Floor-bound navigation data was an insufficient candidate for Night City's vertical sound paths. The chosen approach voxelized geometry offline and packed a separate acoustic graph. Parallel processing of neighboring sectors produced a race that did not crash, yet changed results and broke incremental builds; the stated scheduling constraint excludes simultaneous neighbors. Runtime loading retained packed regional data while constructing nearby graph sectors. Octree insertion and connecting nodes each received a 0.5 ms frame budget, so readiness could span frames. Compact sector identities also had a documented teleport edge case. NPC hearing reused the graph, but its raycast/graph combination required an exception when distant physics was not streamed. See PDF pages 8, 11–16, 30, 35–43 and 64–67. These examples expose correctness and residency assumptions behind a streaming budget.

**GameMap editorial adaptation, unimplemented.** Proposed acceptance should distinguish bytes loaded, nodes constructed, cross-sector links restored and sound/hearing queries usable. Compare clean and incremental graph builds under varied scheduling; retain structural hashes and mismatched edge locations, even when no crash occurs. Exercise fast travel, stacked floors, sector boundaries and queries outside physics residency. Capture an audio sample and NPC-perception trace alongside the spatial overlay: a visually complete scene can still have wrong acoustic behavior. Report budget exhaustion or unavailable query inputs separately from a genuine blocked sound path. Measure multi-frame activation latency as well as per-frame cost, without silently converting a bounded search failure into world truth.

**Availability boundary.** Public slides support the production account; the inspected sources do not expose the studio's graph builder, streaming controller, game project or reproducible benchmark. No internal-tool access or present-day REDengine compatibility was verified.

## Uncharted 4: preserve feedback and authoring control across climbing contacts

**Primary source and scope.** Naughty Dog's [2022-10-18 climbing retrospective](https://www.naughtydog.com/blog/uncharted_4_climbing_legacy_of_thieves_collection_pc), written by Jonathon Dornbush, directly interviews animation director Jeremy Yates, lead game designer Emilia Schatz and principal programmer Ryan Broner. It discusses Uncharted 4's original PS4-era system and its continuation in The Lost Legacy; the publication date accompanies the later PC collection launch.

**Published production account.** After experimenting with stamina and free climbing, the team reduced complexity to fit climbing within the larger game. Analog reach used rings of possible hand positions, supported by an adjustable mocap wall and many captured combinations. Full-body IK coordinated hands, feet and root, while feet sought supporting edges. Tools allowed handholds to move in real time with automated integration into rock surfaces, enabling less rigid routes. Crucially, directional input produced visible body movement even when no handhold was reachable, helping players adjust their intent. See the article's “Climb Time,” “Reaching Out” and closing developer observations.

**GameMap editorial adaptation, unimplemented.** Review interaction feedback separately from successful attachment or traversal. A proposed fixture would vary stick direction/magnitude and handhold spacing, including an unreachable target, then retain input timestamps, handhold revision, body response, contact changes and actual route progress. After an environment edit, inspect both hand and foot support from matched gameplay views. Preserve authored route choices and evaluate feature complexity against the surrounding game, rather than treating additional simulation rules as inherently better. These checks require project-specific instrumentation and human judgment of responsiveness.

**Boundary.** The retrospective provides no public implementation, measured latency or controlled production comparison. Its tools and motion-capture coverage are not downloadable GameMap capabilities or permission to reuse game assets.

## Horizon Zero Dawn: contact timing, spatial correction and traversal authoring are separate problems

**Primary source and scope.** Paul van Grinsven, Guerrilla game programmer, [Player Traversal Mechanics in the Vast World of Horizon Zero Dawn](https://www.guerrilla-games.com/read/player-traversal-mechanics-in-the-vast-world-of-horizon-zero-dawn), studio page dated 2017-03-02; [87-page GDC 2017 presentation](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf). This describes the historical original-game system.

**Published production account.** Animation events controlled when feet were placed; code supplied positions from game state and collision probes. Terrain probing used the previous frame's results. Floating feet required extra probing and corrections beyond vertical offsets. Vault selection scored obstacle/animation contact differences, while triggers and assets could disable vaulting. Warping supported allowed time windows and authored arrival events; stretching displacement could produce unnatural speeds, addressed through playback-speed adjustment. The postmortem reports that unfinished editor/visualization tools hindered traversal-path authoring and that animation networks became very complex. See PDF pages [28–32](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf#page=28), 36–39, [48–54](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf#page=48) and 82–83.

**GameMap editorial adaptation, unimplemented.** Preserve probe sampling frame, animation-event time, selected contact, warp window, arrival target and playback rate as separate evidence. A proposed fixture would change obstacle height/depth and uneven foot support, including intentionally disabled interactions, then compare contact quality, speed and response. Give authors an inspectable explanation of rejected transitions and probe sample age. Evaluate how easily designers can construct and revise a playable route alongside runtime results; a working movement algorithm alone does not establish a usable authoring workflow.

**Historical boundary.** Page [84](https://www.guerrilla-games.com/media/News/Files/GDC2017_VanGrinsven_PlayerTraversalMechanics.pdf#page=84) lists motion-matching research, player navigation-mesh investigation and full-body IK as future plans. Do not report them as shipped features of this implementation. The presentation supplies no public Decima adapter or controlled benefit estimate.

## Mass Effect 2: carry revision and branch context through localization

**Primary evidence and scope.** BioWare's Ryan Warden and Chris Christou presented [Localizing Large RPGs at GDC 2010](https://gdcvault.com/play/1012508/Localizing-Large). The public [32-slide deck](https://media.gdcvault.com/gdc10/slides/Christou_Christopher_LocalizingLargeRPGs.pptx), especially slides 8–25, documents the historical Mass Effect pipeline. Their fuller [2011 article with Jenny McKearney](https://revistas.uma.es/index.php/trans/article/download/3194/2944), printed pages 43–51, supplies implementation context. These are developer accounts, not current BioWare interface documentation.

**Published account.** A detailed level-based localization schedule failed under development churn; work instead followed English voice recording. Meaning-changing edits triggered retranslation, while approved minor edits could avoid it. String histories compared major edits against the last export. Conversation deliveries retained branch relationships, speaker/listener context and timing restrictions. The article says ambiguous speaker assignments withheld a conversation from translation. Pre-import checks distinguished missing translations, which could warn, from duplicate translations for one string, which blocked import. Recording scripts retained surrounding dialogue and expected filenames. These gates addressed different failure classes; a structurally acceptable import could still contain untranslated lines.

**GameMap editorial adaptation, unimplemented.** A proposed regression packet would pair stable line IDs with source/translation/audio revisions, locale, branch, speaker/listener and timing constraints. Change a line after export, then deliver an older translation alongside a duplicated ID and a missing recording. Require explicit stale, duplicate and incomplete outcomes before testing the selected branch in the target build. Compare actual spoken wording, displayed subtitles and cue timing. Keep import validity, locale completeness and performance quality as separate verdicts. Maintain human review of whether an edit changes meaning, rather than treating punctuation or character-count similarity as a universal semantic oracle.

**Limits.** The historical paper deliberately treats each export as covering all applicable languages; per-locale delivery tracking above is a proposed stronger fixture. No public release of the internal database, previewer or game-side adapter was established. Reported workflow benefits are retrospective, without a controlled productivity or translation-quality comparison.

## Horizon Zero Dawn Remastered: new dialogue motion invalidates old camera assumptions

**Primary evidence and scope.** Nixxes' [2024-10-17 developer article](https://blog.playstation.com/2024/10/17/horizon-zero-dawn-remastered-a-deep-dive-into-its-enhancements/), section **Lively conversations**, contains first-hand accounts from Senior Technical Artist Mark Bazelmans and Animator Alexander Georgiev. It concerns the remaster's historical Nixxes/Guerrilla production.

**Published account.** Their pipeline replaced old conversation animation/events, then let animators load a dialogue option with character references and audio in Maya, edit it and re-export. Maya did not reproduce Decima's automated eye behavior, so aim helpers supported adjustments. Facial replacement also needed an editable conversion pipeline rather than simple overwriting. Batch camera updates proved insufficient: broader new movement often carried speakers outside the frame, requiring a manual camera-layout pass. Shared character lighting supported edits across similar shots while retaining individual exceptions.

**GameMap editorial adaptation, unimplemented.** Treat replacement dialogue motion as a dependency change affecting shots and presentation. A proposed fixture would replace a restrained gesture with broader movement, then compare every affected dialogue option using matched camera/time captures in the consuming build. Check framing, gaze, clothing intersections and audio synchronization separately. Retain original and replacement clip IDs, event changes, camera revisions and manual exceptions. Mark DCC helpers as approximations and verify final runtime observations. A successful animation import should leave cinematic acceptance pending until those observations are reviewed.

**Limits.** The account supplies concrete failure/recovery examples, not measurements of error rates or iteration savings. Proprietary formats and internal tools are described; their current external availability and any executable GameMap integration remain unverified.

## Forza Motorsport: co-develop alternative feedback without removing player decisions

**Primary source and scope.** Turn 10 gameplay/accessibility producer Neha Chintala describes the production process in a [2024-04-16 first-hand interview](https://www.digipen.edu/showcase/news/neha-chintala-helps-steer-forza-motorsports-award-winning-blind-driving-assists). Her [2023-04-27 Xbox article](https://news.xbox.com/en-us/2023/04/27/forza-motorsport-accessibility-features-blind-driving/) provides the earlier, pre-release design account. These concern the 2023 Forza Motorsport, not measured current-version behavior.

**Published observations.** Chintala recounts an inclusive-design sprint where interviews with players informed feature pitches and accessibility roadmap work. The audio team subsequently worked with blind consultant Brandon Cole as a recurring collaborator. The 2023 account describes real-time feedback from blind and low-vision players over two years of feature development. Supplemental cues convey track position, orientation, turns and driving actions while retaining the player's decisions. Cue descriptions and previews support learning; the team explicitly warns of a learning curve. Separately, One Touch Driving was developed with Xbox User Research and participants with mobility and stamina disabilities at multiple stages, addressing simultaneous inputs and sustained pressure. These are developer reports, without a controlled efficacy result or participant-level outcome dataset.

**Related method, not evidence of Forza's exact procedure.** Xbox Research's [2024 workshop toolkit](https://developer.microsoft.com/content/dam/microsoftgamedev/product-inclusion/workshop/Game%20Accessibility%20Workshop%20Toolkit%20-%20Activities%20and%20Instructions.pdf) recommends early, multidisciplinary workshops with paid disabled advisors, individual reflection before group synthesis, and explicit discussion of exclusion risks. PDF pages 43–45 ask teams to describe affected sensory/motor/cognitive groups and discuss disagreements about a proposal's feasibility. This later, general guidance must not be retroactively attributed to Turn 10 or treated as a causal explanation of its results.

**GameMap editorial adaptation, unimplemented.** Author an intended-decision map before choosing alternative outputs: what must the player notice, understand and decide, and which actions must remain under their control? A proposed fixture couples one driving/navigation decision with individually adjustable cues and input assists. Record cue meaning, timing, competing audio, input concurrency, sustained-input duration, familiarization and configuration. Check onboarding, isolated cues and combined cues separately. Preserve disabled-player feedback alongside technical traces; an emitted sound or reduced button count does not establish understandable, comfortable play. Re-test combinations after camera, audio-mix or control changes.

**Boundary.** The materials establish historical production methods and public reading resources. They do not expose Turn 10's internal authoring/test interfaces, grant rights to game assets or recordings, or validate an external agent adapter. The proposed fixture has not been run.

## Far Cry New Dawn: accessibility scope must include dependency maturity and testing time

**Primary source and scope.** Ubisoft's [2019-08-22 interview with lead gameplay designer Ivan Kulbych](https://news.ubisoft.com/en-us/article/OHSJ5XMqKzlG7Y0Tv8577/making-videogames-accessible-is-easier-and-more-impactful-than-you-think) is a first-hand account of Far Cry New Dawn development. It complements the existing Far Cry 5 procedural-world case with a different production problem.

**Published observations.** The team selected work using Far Cry 5 accessibility feedback and discussions with designers on other titles. Its additions included directional sound visualization, configurable subtitles, control remapping and co-op speech-to-text. Kulbych identifies tight deadlines and missing technology as constraints: the speech-to-text library was still in development. He describes reserving more accessibility-testing time as a planned scheduling improvement, while acknowledging that subtitle wrapping and transcription quality still needed improvement. His 20/80 advice is a personal heuristic, not a measured productivity result.

**GameMap editorial adaptation, unimplemented.** Keep a barrier, its proposed alternative, the supporting dependency and its validation state together. For a proposed co-op communication fixture, pair a directional sound with its visual caption and a spoken message with its transcript; record event/message identity, direction, delivery timing, text wrapping, language and dependency revision. Exercise remapped controls while these cues are present. Distinguish missing events, wrong direction, late delivery, transcription errors and unreadable presentation. Schedule representative-player review and fixes before acceptance; a feature checkbox or successful library call cannot establish useful communication. Label dependency gaps and untested settings explicitly.

**Boundary.** The interview does not name the speech-to-text library, quantify defect rates, publish its test protocol or establish current availability. No library identity, current Ubisoft integration, reuse license or validated agent interface should be inferred. The proposed fixture has not been run.

## Prototype 2: consistent source assets still need contextual mix acceptance

**Primary source and scope.** Radical Entertainment audio director Rob Bridgett's [Notes from the Mix: Prototype 2](https://www.gamedeveloper.com/audio/notes-from-the-mix-i-prototype-2-i-), **2012-06-20**, is a first-hand production postmortem, not current tool documentation.

**Published account.** The team combined source-level consistency with in-game contextual balancing. Live sound replacement and tuning supported iteration; three dialogue-ducking strengths addressed different competing sound densities. Overlapping duck snapshots caused bugs, and transitions between snapshot classes produced audible discontinuities. Snapshot proliferation also became a navigation problem. The author describes side-chaining improvements as future work. Earlier single-mix television adjustments had compromised the theater version; this title used separate listening modes. Activision's AV lab supplied additional listening feedback. Meter readings complemented contextual listening rather than replacing it.

**GameMap editorial adaptation, unimplemented.** A proposed fixture would carry one mission line through quiet traversal, dense combat, menu entry, and cinematic transitions, with overlapping snapshot activation and release. Retain the content and mix revisions, active snapshot identities, bus routing, event timeline, listening mode and capture provenance. Compare transitions and speech intelligibility separately from measured loudness. Repeat across the project's supported playback modes and retain reviewer observations. A successful asset import or consistent source level should leave contextual acceptance pending. Preserve a failing capture before editing the mix; check the entire transition sequence again after a local fix.

**Boundary.** This retrospective establishes production decisions and reported defects, not defect rates, a standardized listening protocol, universal loudness targets, or accessible proprietary tooling. No proposed fixture has been run.

## Overwatch: sound priority depends on the listener's gameplay situation

**Primary source and scope.** Blizzard's Scott Lawlor and Tomas Neumann presented [The Elusive Goal: Play by Sound at GDC 2016](https://www.gdcvault.com/play/1023010). The [82-page primary deck](https://media.gdcvault.com/gdc2016/Presentations/Lawlor_Neumann_Overwatch_Play_by_Sound.pdf) concerns the original game's **pre-release, six-versus-six beta**, not Overwatch 2.

**Published account.** The threat model considers attention, proximity, attacks and dangerous abilities. Ranked objects enter importance buckets; their indices map into middleware parameters, with weapon examples showing gain, priority and filtering curves. Separate voice examples show different heard/suppressed lines for three listener characters, organized by stimulus, audience and category. The team deliberately limited variation in important cues to support recognition, acknowledging the creative tradeoff. These are documented design choices; the slides do not establish measured reaction-time improvements. [PDF pp. 13, 19–23, 61, 64/66/68 and 71](https://media.gdcvault.com/gdc2016/Presentations/Lawlor_Neumann_Overwatch_Play_by_Sound.pdf#page=13)

**GameMap editorial adaptation, unimplemented.** Define the intended audible decision before increasing event density. A proposed fixture would replay one encounter from several listeners, changing threat, team relationship and competing events. Record candidates, scores, bucket assignments, selected/suppressed dialogue, state transitions and captured output on a common observation timeline. Check that required cues remain recognizable and correctly attributed while lower-priority material is suppressed as intended. Treat intentional suppression, missing event delivery, native voice refusal, capture loss and perceptual masking as different outcomes. Review rapid priority changes and cue restoration; generating every event successfully is insufficient evidence that the player receives the needed information.

**Boundary.** The deck does not supply a complete scoring formula, tie-breaking policy, current implementation or executable test interface. Its bucket illustration is not a universal audio-voice budget. The video demonstrations were not auditioned, and no audible A/B result or player-performance improvement was independently verified.

## Destiny: a local symptom can require a distributed evidence set

**Published account.** Adam Pino’s [Bungie Crash Propagator article](https://www.bungie.net/7/en/News/article/50410), published **2021-06-10**, describes internal-build collection across clients and hosts. A separate low-level communication path avoids relying on potentially broken gameplay connections. Propagation packets carry a shared incident identifier and bounded hop count; secondary reports are labeled as induced context rather than independent faults. The collected evidence includes memory dumps and logs. World servers are deliberately excluded because their diagnostic value did not justify disruption. Later, logs-only collection allowed testing to continue, with less evidence. The feature was stripped from retail builds. Bungie reports useful debugging time savings but gives no controlled measurement. [Primary account](https://www.bungie.net/7/en/News/article/50410)

**GameMap editorial adaptation, unimplemented.** A proposed multiplayer failure packet should list expected participants and actually received artifacts, with process roles and incident linkage. Missing hosts must remain visible. A shared identifier should not imply an atomic snapshot or synchronized clocks. Define approved capture scope and disruption level before a test; never infer permission to terminate connected processes. A repeatable test should deliberately omit one participant and verify that the collector reports incomplete evidence rather than a complete incident.

**Boundary.** The article does not establish symbol retention, build/content identity fields, clock alignment, packet-delivery guarantees or a public collector API. These need project-owned contracts.

## Valve: retain the build artifacts that make a dump interpretable

**Published account.** Elan Ruskin’s [Valve GDC 2011 presentation](https://gdcvault.com/play/1014351/Forensic-Debugging-How-to-Autopsy) describes archiving PS3 executables by binary GUID and joining dumps to that archive. Debugger inputs must match source, executable, symbols and data. Customer reports entered a queue before symbol processing and crash-database insertion. A shader example proposed matching the graphics card/driver for reproduction; it does not demonstrate a completed fix. Caveats include absent physical-allocation pages even in Xbox 360 full dumps. Valve also abandoned a Hadoop-dependent backend because setup and administration were too complex, returning to an older NFS-based version. [Slides and speaker notes](https://media.gdcvault.com/gdc2011/slides/elan_ruskin_programming_forensic_debugging.pdf)

**GameMap editorial adaptation, unimplemented.** Treat artifact receipt, provenance matching, symbolization, diagnosis and reproduction as separate gates. Preserve the original dump and report missing or mismatched modules explicitly. A proposed fixture should supply correct symbols, incorrect-build symbols and no symbols as separate cases; matching symbols should be a necessary gate before attempting source-level attribution, not proof that the diagnosis is correct. Keep a suspected cause distinct from a reproduced failure and a verified repair. Compare the same scenario and target configuration before and after a change, with a declared acceptance condition.

**Boundary.** Historical platform tools, server architecture and screenshots are not current compatibility or entitlement claims. An accessible lecture is not an available Valve service, console SDK or runnable adapter.

## VALORANT: specify the workload behind a concurrency claim

**Published evidence.** Keith Gunning’s [2020-12-15 engineering account](https://www.riotgames.com/en/news/scalability-and-load-testing-valorant) reports a successful **two-million simulated-player, three-hour** test against a VALORANT test shard. Go-based simulated clients reproduced background polling and multi-step player operations. A configurable player pool controlled logins and scenario assignment; prelaunch activity rates were estimated using League of Legends data. Mock game servers exercised provisioning and result recording, omitting gameplay logic. Tests started at 1,000 players, with fixes and repeated increases toward the target. Acceptance required every monitored metric to remain within bounds for the entire run, including operation outcomes, execution times, CPU and memory. Passing those bounds does not mean zero errors; the account does not establish that two million players were held constantly for all three hours. [Primary account](https://www.riotgames.com/en/news/scalability-and-load-testing-valorant)

**GameMap editorial adaptation, unimplemented.** A proposed load-test record should preserve workload mix and its evidence, arrival and scenario rates, concurrency over time, duration, environment/build identity, real versus mocked components, generator capacity, acceptance thresholds and failure intervals. Treat a target count, achieved count and completed acceptable run as separate states. Preserve ramp-up and recovery behavior rather than reporting only peak concurrency. Compare changes under the same declared scenario mix and infrastructure configuration. Before reusing a historical workload model, check whether current player behavior invalidates its assumptions.

**Boundary.** This establishes a historical platform-load result, not a full-client or real-game-server soak result. It does not settle overnight stability, gameplay memory leaks or present-day capacity. Public harness availability was not established. GameMap has not reproduced the result.

## F.E.A.R.: inspect the information and constraints behind a character's plan

**Primary source and scope.** Jeff Orkin, Monolith Productions, [Agent Architecture Considerations for Real-Time Planning in Games](https://ojs.aaai.org/index.php/AIIDE/article/view/18724), published **2005-06-01**, AIIDE pp.105–110. This is a pre-release production account. The [publisher-hosted six-page paper](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365) is directly accessible.

**Published account.** Attack and AttackFromCover satisfy TargetIsDead; both require WeaponLoaded, while the latter also requires AtNodeType=kNode_Cover. Costs favor cover over immediate firing ([pp.108–109](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=4)). Blackboard commands connect decisions to navigation, animation and weapons; destination changes initiate pathfinding on the next subsystem update ([pp.105–106](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=1)). Sensors distribute expensive tests and cache results, but limiting each agent update to one sensor delayed reactions ([p.106](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=2)). Fixed, agent-relative symbols restrict symbolic preconditions to conjunctions with each symbol used once; richer expressions missed performance requirements. Separate procedural context-precondition checks can run arbitrary code ([pp.107–108](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=3)). Blocked-door failures inform replanning. Missing scheduling and compound actions forced designer-required sequences into restrictive preconditions, reducing reuse ([pp.109–110](https://ojs.aaai.org/index.php/AIIDE/article/download/18724/18501/22365#page=5)).

**GameMap editorial adaptation, unimplemented.** A proposed debugging fixture should preserve the selected goal, action-set revision, predicates, procedural-check results, observation timestamps, intended costs, rejected candidates, subsystem commands and actual completion events. Deliberately change a route while an action is running; compare failure detection, replanning latency and eventual movement against the intended behavior. Add a designer-required action order and test interruptions at each boundary. Review runtime behavior and the effort needed to author or explain it separately. A valid symbolic plan should leave navigation feasibility, animation completion, stale-input handling and designer intent pending until observed. These are proposed evidence requirements, not a claim about an existing F.E.A.R. debugging tool.

**Boundary.** No controlled authoring-time study, present-day implementation benchmark, executable integration, or LLM compatibility was established. Historical representation restrictions must not be generalized to every GOAP system. The paper's author reports are not independently reproduced results; no proposed fixture has been run.

## Left 4 Dead: expose pacing state without treating it as measured player emotion

**Primary source and scope.** Michael Booth, Valve, [The AI Systems of Left 4 Dead](https://cdn.akamai.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf), **AIIDE 2009**, as identified by [Valve's publication index](https://www.valvesoftware.com/en/publications). This is the historical first game's design account.

**Published account.** Booth estimates each survivor's intensity from damage, incapacitation, ledge displacement and nearby infected deaths; decay pauses during active engagement. The team maximum drives Build Up, Sustain Peak, Peak Fade and Relax. Peak sustain lasts 3–5 seconds; relaxation lasts 30–45 seconds or ends with sufficient progress. Peak Fade protects recovery time from unfinished combat. Existing special infected may attack during relaxation; bosses are exempt. Booth characterizes this as changing encounter frequency rather than difficulty amplitude and acknowledges the intensity estimate is crude. [PDF pp. 79–82 and 92](https://cdn.akamai.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf#page=79)

**GameMap editorial adaptation, unimplemented.** Make the intended experience an explicit design input: when should pressure accumulate, when should relief become possible, and which authored events may override it? A proposed fixture would record individual proxy inputs, their aggregation, director state, transitions and reasons, requested threat population, actual active threats, encounter timestamps and player progress on one timeline. Preserve the build, content, controller, difficulty configuration and randomness needed to explain the trace. Include a late-ending encounter, a lingering special threat, a boss interruption, split player condition and rapid forward progress. Assert transition policy and exception handling separately from actual recovery opportunities. Do not silently tune damage, health or aim while reporting a pacing-only comparison. Review the resulting sessions with people rather than assigning enjoyment from the proxy or a completion flag.

**Boundary.** This reading establishes a reported design, not a calibrated emotion sensor, portable tuning constants, controlled enjoyment improvement or current executable director interface. The pacing/difficulty distinction applies to this described subsystem; it is not a claim that every Left 4 Dead system leaves difficulty unchanged. No fixture or player study was run here.

## Valve playtesting: select evidence for the experience question being asked

**Primary source and scope.** Valve experimental psychologist Mike Ambinder's [Valve's Approach to Playtesting: The Application of Empiricism](https://cdn.akamai.steamstatic.com/apps/valve/2009/GDC2009_ValvesApproachToPlaytesting.pdf), **GDC, March 2009**, is a historical methods account with game examples, not a current study protocol.

**Published account.** Ambinder separates enjoyment-focused playtesting from bug testing and balancing. Observation requires interpretation and can be observer-biased; think-aloud can disrupt play; group questioning can introduce anchoring. Aggregates hide extremes and context. The example numbers on p.31 and questions on p.42 are labeled simulated. Skin conductance is presented as an arousal correlate with confounds and no direct input/output relationship; arousal and valence are distinguished. Designs are treated as hypotheses tested through iteration. [PDF pp. 5–6, 16, 20, 24, 31, 35, 42, 46 and 51](https://cdn.akamai.steamstatic.com/apps/valve/2009/GDC2009_ValvesApproachToPlaytesting.pdf#page=5)

**GameMap editorial adaptation, unimplemented.** Before changing an encounter, write a specific experience hypothesis and its evidence needs. For example: players should recognize a recovery opportunity after a peak, understand why a later threat appeared and retain a meaningful choice about advancing. Keep four records separate: technical validity; actual player behavior; player-reported understanding/experience; and designer judgment against the brief. Tie observations to the same revision and encounter timeline. Use individual responses before group discussion where a study design calls for both; record prompts, assistance and testing conditions. Retain outlier sessions, failures and early exits. Predeclare comparisons, participant inclusion, experience level, stopping rules and exclusions rather than selecting only successful runs afterward. A controlled policy trace can establish that a director followed its rules; it cannot establish that those rules produced enjoyable, legible or appropriately tense play.

**Boundary.** The deck's methodological cautions do not supply a validated universal fun score, representative participant dataset or causal benefit estimate. This review makes no physiological-measurement recommendation and collected no personal or biometric data. Human acceptance remains a separate, unperformed activity.

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
- Historical localization, accessibility, audio-mix and crash-triage cases document production methods, while current executable pipelines and representative-player outcomes remain unverified. The VALORANT case supplies a historical mocked-component platform-load envelope; real-gameplay multiplayer soak reliability and public console-certification production evidence remain incomplete.
