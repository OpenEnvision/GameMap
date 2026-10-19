# Production research dossiers

Baseline sources checked on **2026-10-18**; subsequent review dates are recorded in the individual sections and coverage ledger. Full reproduction was not performed.

These notes extend the concise [resource directory](./awesome-list.md) using the repository's existing categories and contribution rules. They cover native interfaces, asynchronous job semantics, artifact provenance, production tools, visual evidence and generative-service terms. Tools mentioned in notes are not additional directory entries. Neither a directory card nor a source check establishes a working integration.

## Find the relevant evidence

For a concrete task, start with the [production-stage routes](production-coverage-gaps.md#production-stage-coverage), then follow the linked interface/artifact contracts and [proposed work orders](production-work-orders.md#common-execution-contract). The route separates upstream API evidence, expected outputs, failure signals and acceptance gates; executable support still requires a verified target environment.

| Need | Dossier | Main distinctions |
| --- | --- | --- |
| Drive an engine, DCC application or native UI | [Engine operation contracts](engine-operation-contracts.md) | Editor/runtime scope, completion, cancellation, recovery, persistence, authoritative state and locale/render/accessibility boundaries |
| Author assets, localize, inspect audio or prepare multiplayer/build workflows | [Production research](production-research-notes.md) | Authoring versus runtime formats, rendering versus shaping, measurements versus acceptance criteria |
| Generate or transform assets through models and hosted APIs | [Generative tools](generative-tools-research.md) | Async receipts versus completed outputs, required postprocessing and export limits |
| Review provider terms before an experiment | [Generative API boundaries](generative-api-boundaries.md) | Input/output rights, provider training, customer model-evaluation restrictions and expiring downloads |
| Follow a complete project from authored assets to playtest | [Complete-sample integration](production-work-orders.md#complete-sample-integration-examples) | Pinned project/dependency scope, real scene and interaction wiring, build reports, existing smoke tests and proposed broader acceptance |
| Evaluate designer goals and playstyle tradeoffs | [Designer-facing playtest evidence](game-ai-notes.md#designer-facing-playtest-evidence) | Authored predicates, persona feedback, [route comparisons](game-ai-notes.md#sonic-trajectory-visualization-comparing-training-populations), [interactive surrogate predictions](game-ai-notes.md#susketch-interactive-surrogate-feedback-with-a-separate-evidence-boundary) and enjoyment-inference limits; [production bot integration](studio-production-case-studies.md#ea-autoplayers-learned-locomotion-inside-controlled-test-scenarios) |
| Evaluate generated levels or game rules | [Game-AI evidence](game-ai-notes.md#mariogpt-requested-constraints-and-executable-verdicts) and [rule-design search](game-ai-notes.md#gavel-rule-design-search-and-verdict-boundaries) | Requested constraints versus measured output, controller verdicts versus predicted paths, and published results versus released code |
| Turn recorded dialogue into mouth animation | [Mouth-cue contracts](native-operation-details.md#recorded-dialogue-and-mouth-cue-validation) | Recognition versus timing categories, artifact completion, project-shape mapping and playback-clock validation |
| Capture reproducible multi-view asset evidence | [BlenderProc capture contract](visual-evidence-research.md#blenderproc-multiview-capture-contracts) | Sampled views versus required coverage, camera/depth conventions, instance mapping and persisted stream completeness |
| Retrieve stored frames and failed regions | [FiftyOne retrieval contract](visual-feedback-mechanisms.md#7-fiftyone-persistent-retrieval-over-capture-evidence) | Parent/label identity, mutable views, sampled-image reuse, stale indexes and query manifests |
| Preserve temporal mask evidence after edits | [SAM 2 state lifecycle](visual-evidence-research.md#sam-2-temporal-mask-state-contract) | Immutable clip identity, prompt replacement, reset versus reload, propagation coverage and logits versus accepted masks |
| Ground screenshot regions and editor controls | [OmniParser coordinate contract](visual-feedback-mechanisms.md#6-omniparser-frame-scoped-gui-regions-and-coordinate-contracts) | Parse-local IDs, xyxy versus xywh, crop/resize transforms, inferred semantics and independently scoped model terms |
| Select visual evidence or improve a tool-using agent | [Visual evidence and harness research](visual-evidence-research.md) | Diagnostic metrics versus gameplay correctness, inferred versus authoritative state, optimization versus final evaluation |

## Deeper operational evidence

- [Cadle-like repository import](cadle-repositories.md): the complete requested 212-candidate corpus plus its reference, with current repository identity, source scope, reuse limits and existing coverage

- [Agent interface evidence](agent-interface-evidence.md): source-pinned execution permissions, write/undo boundaries and test-verdict limitations for selected existing bridges

- [Asset selection and visual-feedback creation](asset-selection-feedback.md): candidate ranking, first-acceptable validation, multi-view preference models and refinement counterexamples

- [Visual-feedback mechanisms](visual-feedback-mechanisms.md): evidence selection, crop/temporal memory, generated-asset selection and controlled harness comparisons; [active crop inspection](visual-feedback-mechanisms.md#active-visual-inspection-frozen-model-search-versus-learned-tool-use) separates ZoomEye and DeepEyes, while [history and memory controls](visual-feedback-mechanisms.md#visual-history-reuse-external-memory-and-controlled-exposure) cover HistPrune-GUI, MementoGUI and EMemBench

- [Production debugging](production-debugging-contracts.md): GPU capture and timing completion, shader/device-removal evidence, physics restoration, shipped-asset inspection, streaming budgets and [retained-memory diagnosis](production-debugging-contracts.md#memory-lifetime-across-repeated-production-cycles)

- [Benchmark reproducibility](benchmark-reproducibility.md): public release and isolation matrix, source-inspected OpenGameEval lifecycle/verdicts, and proposed fair piRSI comparisons, including whole-tournament replication, paired uncertainty, protected final evaluation and source-pinned GEPA budget/cache/resume boundaries; [online adaptation and change-level audit](benchmark-reproducibility.md#online-harness-adaptation-and-change-level-audit) adds Harness² release/accounting boundaries and an explicitly proposed promotion/inheritance audit; [game-edit loops and specification recovery](benchmark-reproducibility.md#game-edit-loops-reusable-players-and-specification-recovery) compares RSIGame checkpoint selection, Recursive Game Creator policy/evaluator contracts and GameReplica’s black-box rule recovery; its [upstream GameCraft contract](benchmark-reproducibility.md#gamecraft-bench-the-upstream-replay-to-score-contract) separates replay failures, judge failures, aggregation and provider-specific evidence

- [Gameplay state and durable effects](gameplay-state-contracts.md): narrative checkpoints, asynchronous commands, database transactions, source-pinned Yarn cancellation and variable restoration, native replay reconstruction, physics-state restoration and reward reconciliation
- [Game-development evaluation](game-development-evaluation.md): seven additional creation/repair/QA studies, including GameASG-Bench’s declared testing interface and GBQA’s release/protocol distinctions, with scoring, artifact availability and reproducibility limits

- [Native operation details](native-operation-details.md): 36 operation rows covering engine authoring, DCC batch work and audio middleware lifecycle, plus input delivery, [lighting persistence](native-operation-details.md#lighting-bake-completion-and-persisted-scene-association), FMOD callback/state/virtualization and [audio-capture integrity](native-operation-details.md#runtime-audio-observation-and-capture-integrity); [browser cinematic captions](native-operation-details.md#browser-cinematic-subtitle-and-caption-delivery) add loading, cue-time and visible-text gates
- [Generation delivery contracts](generation-delivery-contracts.md): task reconciliation, artifact expiry, transformations and asset acquisition
- [Asset validation contracts](asset-validation-contracts.md): interchange, composition, material/geometry processing, [cinematic timeline handoff](asset-validation-contracts.md#cinematic-editorial-handoff-preserve-time-coordinates-and-declared-features), fonts, input/network and animation contracts, plus [splat delivery](asset-validation-contracts.md#gaussian-splat-editing-and-delivery), [sprite metadata/playback](asset-validation-contracts.md#sprite-atlas-metadata-and-playback-delivery) and [tile-map transfer](asset-validation-contracts.md#tile-map-identity-geometry-and-runtime-delivery)

- [Production work orders](production-work-orders.md): nine proposed chains with completion, failure, recovery and persistence gates, [versioned asset publication](production-work-orders.md#versioned-asset-publication-and-consuming-scene-ownership), and [complete-sample integration](production-work-orders.md#complete-sample-integration-examples)
- [Studio production cases](studio-production-case-studies.md): fourteen historical engineering accounts, separated from editorial acceptance designs
- [Source revisions](source-revision-notes.md): selected inspected upstream files with exact revisions and claim boundaries; other dossiers retain their own source-pin lists
- [Coverage and remaining work](production-coverage-gaps.md): production-stage gaps, interface semantics and a local catalog lookup example

## Maintenance review

[Catalog review coverage](catalog-review-coverage.md) records this pass over all 109 existing cards, material corrections, source-read limits, and the remaining dossier audit scope.

## From a source to an acceptance test

The following is **GameMap editorial guidance**:

1. State the work order and target project. Select a documented operation and record its source version, prerequisites and editor/runtime context.
2. Separate request acceptance, job completion, output availability, saved state and cold-reopen persistence. Leave an undocumented transition unknown.
3. Define failure and recovery explicitly: retry idempotence, lost callbacks, partial imports, process exit, cancel acknowledgement, stale handles and orphaned remote work.
4. Preserve evidence: source project revision, commands and parameters, tool/service version, timestamps, original artifacts, hashes and authoritative state checks. A repository source pin is not an installed-tool or model-weight pin.
5. Run a bounded fixture before claiming execution support. Then test the actual work order and a regression scenario. Keep documentation, proposed tests and reproduced results separate.

## Important remaining gaps

No engine, DCC application, paid generative API or full game-production work order was executed for this collection. Project-specific quest side effects, input-to-frame alignment, durable cancellation, asset dependency repair, platform certification and commercial-use clearance remain unresolved unless a dossier cites a narrower documented result. Mutable documentation and service terms require a fresh check at implementation time.

The first directory additions reuse verified existing publisher marks or identify independent maintainers as text. Other researched tools remain accessible in the linked dossiers while official branding evidence is curated. The repository's logo and provenance checks have not been relaxed.
