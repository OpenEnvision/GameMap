# Studio production case studies and acceptance lessons

Research checked 2026-10-18. These are primary engineering accounts and creator presentations, not runtime tests. Historical claims retain their original game/version context. Studio-internal tooling is represented as knowledge, not an available external agent interface. Proposed recipes below are **GameMap editorial guidance** and have no adapter implementation or execution evidence.

## Main conclusions

1. Catalog asset readiness as multiple states: authored, converted, dependency-complete, loaded, initialized, activated, saved and reopened.
2. Separate preview shortcuts from release acceptance. A useful cached or stale preview is not a fully current build.
3. Keep hardware, driver, cache state, internal resolution and exact engine fork in performance evidence.
4. Treat behavior coverage, regression coverage and artistic quality as different acceptance dimensions.
5. Capture negative results and unsupported rollback paths, not just successful API invocations.

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
