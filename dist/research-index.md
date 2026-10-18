# Production research dossiers

Sources checked on **2026-10-18**. Sources checked; full reproduction not performed.

These notes extend the concise [resource directory](./awesome-list.md) using the repository's existing categories and contribution rules. They cover native interfaces, asynchronous job semantics, artifact provenance, production tools, visual evidence and generative-service terms. Tools mentioned in notes are not additional directory entries. Neither a directory card nor a source check establishes a working integration.

## Find the relevant evidence

| Need | Dossier | Main distinctions |
| --- | --- | --- |
| Drive an engine, DCC application or native UI | [Engine operation contracts](engine-operation-contracts.md) | Editor/runtime scope, completion, cancellation, recovery, persistence and authoritative state |
| Author assets, localize, inspect audio or prepare multiplayer/build workflows | [Production research](production-research-notes.md) | Authoring versus runtime formats, rendering versus shaping, measurements versus acceptance criteria |
| Generate or transform assets through models and hosted APIs | [Generative tools](generative-tools-research.md) | Async receipts versus completed outputs, required postprocessing and export limits |
| Review provider terms before an experiment | [Generative API boundaries](generative-api-boundaries.md) | Input/output rights, provider training, customer model-evaluation restrictions and expiring downloads |
| Select visual evidence or improve a tool-using agent | [Visual evidence and harness research](visual-evidence-research.md) | Diagnostic metrics versus gameplay correctness, inferred versus authoritative state, optimization versus final evaluation |

## Deeper operational evidence

- [Benchmark reproducibility](benchmark-reproducibility.md): public release and isolation matrix, source-inspected OpenGameEval lifecycle/verdicts, and proposed fair piRSI comparisons

- [Gameplay state and durable effects](gameplay-state-contracts.md): narrative checkpoints, asynchronous commands, database transaction scope and reward reconciliation
- [Game-development evaluation](game-development-evaluation.md): five additional creation/repair studies with scoring, artifact availability and reproducibility limits

- [Native operation details](native-operation-details.md): 36 operation rows covering engine authoring, DCC batch work and audio middleware lifecycle
- [Generation delivery contracts](generation-delivery-contracts.md): task reconciliation, artifact expiry, transformations and asset acquisition
- [Asset validation contracts](asset-validation-contracts.md): seven groups covering interchange, composition, material/texture processing, topology, timelines, fonts and input/network fixtures

- [Production work orders](production-work-orders.md): nine proposed chains with completion, failure, recovery and persistence gates
- [Studio production cases](studio-production-case-studies.md): eleven historical engineering accounts, separated from editorial acceptance designs
- [Source revisions](source-revision-notes.md): 34 inspected upstream files with exact revisions and claim boundaries
- [Coverage and remaining work](production-coverage-gaps.md): production-stage gaps, interface semantics and a local catalog lookup example

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
