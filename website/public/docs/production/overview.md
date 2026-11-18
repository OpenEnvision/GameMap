# Production research dossiers

Find the interface contracts, asset checks, debugging methods, and service terms needed for a production task. Start with a stage below, then follow the relevant source notes and work-order templates.

## Find the relevant evidence

For a concrete task, start with the [production-stage routes](./coverage-gaps.md#production-stage-coverage), then follow the linked interface/artifact contracts and [proposed work orders](./work-orders.md#common-execution-contract). The route separates upstream API evidence, expected outputs, failure signals and acceptance gates; executable support still requires a verified target environment.

| Need | Dossier | Main distinctions |
| --- | --- | --- |
| Drive an engine, DCC application or native UI | [Engine operation contracts](./engine-operations.md) | Editor/runtime scope, completion, cancellation, recovery, persistence, authoritative state and locale/render/accessibility boundaries |
| Author assets, localize, inspect audio or prepare multiplayer/build workflows | [Production research](./tools.md) | Authoring versus runtime formats, rendering versus shaping, measurements versus acceptance criteria |
| Generate or transform assets through models and hosted APIs | [Generative tools](../assets/generative-tools.md) | Async receipts versus completed outputs, required postprocessing and export limits |
| Review provider terms before an experiment | [Generative API boundaries](../assets/api-terms.md) | Input/output rights, provider training, customer model-evaluation restrictions and expiring downloads |
| Follow a complete project from authored assets to playtest | [Complete-sample integration](./work-orders.md#complete-sample-integration-examples) | Pinned project/dependency scope, real scene and interaction wiring, build reports, existing smoke tests and proposed broader acceptance |
| Evaluate designer goals and playstyle tradeoffs | [Designer-facing playtest evidence](../ecosystem/2d-3d-development.md#designer-facing-playtest-evidence) | Authored predicates, persona feedback, [route comparisons](../ecosystem/2d-3d-development.md#sonic-trajectory-visualization-comparing-training-populations), [interactive surrogate predictions](../ecosystem/2d-3d-development.md#susketch-interactive-surrogate-feedback-with-a-separate-evidence-boundary) and enjoyment-inference limits; [production bot integration](./studio-case-studies.md#ea-autoplayers-learned-locomotion-inside-controlled-test-scenarios) |
| Evaluate generated levels or game rules | [Game-AI evidence](../ecosystem/2d-3d-development.md#mariogpt-requested-constraints-and-executable-verdicts) and [rule-design search](../ecosystem/2d-3d-development.md#gavel-rule-design-search-and-verdict-boundaries) | Requested constraints versus measured output, controller verdicts versus predicted paths, and published results versus released code |
| Review generated dialogue drafts | [Writer feedback and character references](./tools.md#dialogue-drafting-preserve-preference-edited-acceptance-and-character-references) | Relative preference versus edited acceptance, evolving references, automatic style scores and unverified production adoption |
| Turn recorded dialogue into mouth animation | [Mouth-cue contracts](./native-operations.md#recorded-dialogue-and-mouth-cue-validation) | Recognition versus timing categories, artifact completion, project-shape mapping and playback-clock validation |
| Verify a 3D edit and its observation coverage | [Code4Scene preservation](../assets/selection.md#7-code4scene-target-recovery-and-collateral-changes-require-different-comparisons) and [InfiniBench camera verdicts](../assets/visual-evidence.md#infinibench-constraint-verdicts-and-camera-coverage) | Target repair versus collateral change, schema/tolerance limits, solver verdicts versus compilation and planned visits versus visible evidence |
| Capture reproducible multi-view asset evidence | [BlenderProc capture contract](../assets/visual-evidence.md#blenderproc-multiview-capture-contracts) | Sampled views versus required coverage, camera/depth conventions, instance mapping and persisted stream completeness |
| Retrieve stored frames and failed regions | [FiftyOne retrieval contract](../assets/visual-feedback.md#7-fiftyone-persistent-retrieval-over-capture-evidence) | Parent/label identity, mutable views, sampled-image reuse, stale indexes and query manifests |
| Preserve temporal mask evidence after edits | [SAM 2 state lifecycle](../assets/visual-evidence.md#sam-2-temporal-mask-state-contract) | Immutable clip identity, prompt replacement, reset versus reload, propagation coverage and logits versus accepted masks |
| Ground screenshot regions and editor controls | [OmniParser coordinate contract](../assets/visual-feedback.md#6-omniparser-frame-scoped-gui-regions-and-coordinate-contracts) | Parse-local IDs, xyxy versus xywh, crop/resize transforms, inferred semantics and independently scoped model terms |
| Select visual evidence or improve a tool-using agent | [Visual evidence and harness research](../assets/visual-evidence.md) | Diagnostic metrics versus gameplay correctness, inferred versus authoritative state, optimization versus final evaluation |

## Deeper operational evidence

For first-hand studio production accounts and related research explanations, use the [studio-case reading routes](./studio-case-studies.md#find-a-production-lesson): authored-world revisions, requested environmental direction cues, readable player construction and authored destruction, playable iteration and handoffs, streaming readiness, rendering budgets, creature development and character/traversal behavior, place histories, optional mission guidance and narrative/dialogue revisions, accessibility, test verdicts, contextual audio, failure reconstruction, authored behavior, combat readability and player experience. Each case retains its historical source context and failure/acceptance boundaries; proposed recipes are not runnable integrations.

- [Cadle-like repository import](../../cadle-repositories.md): the complete requested 212-candidate corpus plus its reference, with current repository identity, source scope, reuse limits and existing coverage

- [Agent interface evidence](../evaluation/agent-interfaces.md): source-pinned execution permissions, write/undo boundaries and test-verdict limitations for selected existing bridges

- [Asset selection and visual-feedback creation](../assets/selection.md): candidate ranking, first-acceptable validation, multi-view preference models and refinement counterexamples

- [Visual-feedback mechanisms](../assets/visual-feedback.md): evidence selection, crop/temporal memory, generated-asset selection and controlled harness comparisons; [active crop inspection](../assets/visual-feedback.md#active-visual-inspection-frozen-model-search-versus-learned-tool-use) separates ZoomEye and DeepEyes, while [history and memory controls](../assets/visual-feedback.md#visual-history-reuse-external-memory-and-controlled-exposure) cover HistPrune-GUI, MementoGUI and EMemBench

- [Production debugging](./debugging.md): GPU capture and timing completion, shader/device-removal evidence, physics restoration, shipped-asset inspection, streaming budgets and [retained-memory diagnosis](./debugging.md#memory-lifetime-across-repeated-production-cycles)

- [Benchmark reproducibility](../evaluation/benchmarks.md): public release and isolation matrix, source-inspected OpenGameEval lifecycle/verdicts, and proposed fair piRSI comparisons, including whole-tournament replication, paired uncertainty, protected final evaluation and source-pinned GEPA budget/cache/resume boundaries; [online adaptation and change-level audit](../evaluation/benchmarks.md#online-harness-adaptation-and-change-level-audit) adds Harness² release/accounting boundaries and an explicitly proposed promotion/inheritance audit; [game-edit loops and specification recovery](../evaluation/benchmarks.md#game-edit-loops-reusable-players-and-specification-recovery) compares RSIGame checkpoint selection, Recursive Game Creator policy/evaluator contracts and GameReplica’s black-box rule recovery; its [upstream GameCraft contract](../evaluation/benchmarks.md#gamecraft-bench-the-upstream-replay-to-score-contract) separates replay failures, judge failures, aggregation and provider-specific evidence

- [Gameplay state and durable effects](../evaluation/gameplay-state.md): narrative checkpoints, asynchronous commands, database transactions, source-pinned Yarn cancellation and variable restoration, native replay reconstruction, physics-state restoration and reward reconciliation
- [Game-development evaluation](../evaluation/development-evaluation.md): seven additional creation/repair/QA studies, including GameASG-Bench’s declared testing interface and GBQA’s release/protocol distinctions, with scoring, artifact availability and reproducibility limits

- [Native operation details](./native-operations.md): 36 operation rows covering engine authoring, DCC batch work and audio middleware lifecycle, plus input delivery, [lighting persistence](./native-operations.md#lighting-bake-completion-and-persisted-scene-association), FMOD callback/state/virtualization and [audio-capture integrity](./native-operations.md#runtime-audio-observation-and-capture-integrity); [browser cinematic captions](./native-operations.md#browser-cinematic-subtitle-and-caption-delivery) add loading, cue-time and visible-text gates
- [Generation delivery contracts](../assets/generation-delivery.md): task reconciliation, artifact expiry, transformations and asset acquisition
- [Asset validation contracts](../assets/validation.md): interchange, composition, material/geometry processing, [cinematic timeline handoff](../assets/validation.md#cinematic-editorial-handoff-preserve-time-coordinates-and-declared-features), fonts, input/network and animation contracts, plus [splat delivery](../assets/validation.md#gaussian-splat-editing-and-delivery), [sprite metadata/playback](../assets/validation.md#sprite-atlas-metadata-and-playback-delivery) and [tile-map transfer](../assets/validation.md#tile-map-identity-geometry-and-runtime-delivery)

- [Production work orders](./work-orders.md): nine proposed chains with completion, failure, recovery and persistence gates, [versioned asset publication](./work-orders.md#versioned-asset-publication-and-consuming-scene-ownership), and [complete-sample integration](./work-orders.md#complete-sample-integration-examples)
- [Studio production cases](./studio-case-studies.md): first-hand historical engineering accounts, separated from editorial acceptance designs
- [Source revisions](../evaluation/source-revisions.md): selected inspected upstream files with exact revisions and claim boundaries; other dossiers retain their own source-pin lists
- [Coverage and remaining work](./coverage-gaps.md): production-stage gaps, interface semantics and a local catalog lookup example

- [Hypothesis-to-work-order fidelity](../assets/visual-evidence.md#discoveryrsi-preserve-the-hypothesis-through-task-compilation): DiscoveryRSI’s paper protocol versus released scaffold, task examples and checkpoint availability; [Minecraft teamwork](../assets/visual-evidence.md#minecraft-teamwork-adjacent-execution-harness-evidence) supplies a single-run gameplay example of persistent state, cancellation ownership and authoritative events

- [Networked observation and feedback](./studio-case-studies.md#valorant-separate-predicted-views-from-authoritative-results-and-visible-feedback) and [iteration versus merge readiness](./studio-case-studies.md#legends-of-runeterra-separate-iteration-success-from-merge-readiness): historical Riot production accounts connecting timing, evidence scope, logical environments and structured failure records

## Maintenance review

[Catalog review coverage](../evaluation/review-coverage.md) records this pass over all 109 existing cards, material corrections, source-read limits, and the remaining dossier audit scope.

## From a source to an acceptance test

For each integration:

1. State the work order and target project. Select a documented operation and record its source version, prerequisites and editor/runtime context.
2. Separate request acceptance, job completion, output availability, saved state and cold-reopen persistence. Leave an undocumented transition unknown.
3. Define failure and recovery explicitly: retry idempotence, lost callbacks, partial imports, process exit, cancel acknowledgement, stale handles and orphaned remote work.
4. Preserve evidence: source project revision, commands and parameters, tool/service version, timestamps, original artifacts, hashes and authoritative state checks. A repository source pin is not an installed-tool or model-weight pin.
5. Run a bounded fixture before claiming execution support. Then test the actual work order and a regression scenario. Keep documentation, proposed tests and reproduced results separate.

## Important remaining gaps

No engine, DCC application, paid generative API or full game-production work order was executed for this collection. Project-specific quest side effects, input-to-frame alignment, durable cancellation, asset dependency repair, platform certification and commercial-use clearance remain unresolved unless a dossier cites a narrower documented result. Mutable documentation and service terms require a fresh check at implementation time.

The first directory additions reuse verified existing publisher marks or identify independent maintainers as text. Other researched tools remain accessible in the linked dossiers while official branding evidence is curated. The repository's logo and provenance checks have not been relaxed.

- [Destructible surface authoring](./studio-case-studies.md#rainbow-six-siege-author-destruction-as-a-gameplay-surface-with-material-rules): historical Siege material/cutter controls and separate visual, collision, gameplay and damage observations
