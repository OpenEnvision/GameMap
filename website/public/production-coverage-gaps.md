# Production coverage and remaining work

Reviewed **2026-10-18**. This is a qualitative gap map, not a completeness percentage. A cited tool is not an implemented capability, and multiple tags on one resource do not create multiple independently verified integrations.

## Production-stage coverage

| Stage | Available research | Substantive unresolved acceptance problem |
| --- | --- | --- |
| Design and preproduction | Creation-agent studies, studio workflow cases, planning references | Convert design and art-direction constraints into project-specific assertions without substituting a generic score |
| Geometry and scenes | DCC scripting, interchange, topology and asset-generation references | Round-trip units, axes, scale, collision, LODs, external dependencies and instance identity |
| Materials and appearance | Texture processing, color management, procedural materials and shader tooling | Preserve channel packing, transfer functions, alpha and target-platform shader behavior |
| Characters and animation | Rigging, retargeting, motion matching, deformation, motion generation and [sampling/compression contracts](asset-validation-contracts.md#animation-sampling-and-compression) | Preserve skeleton identity, bind pose, root motion, contact and transition quality across tools |
| Gameplay and interactions | Engine input/state interfaces, physics, navigation, AI and narrative systems | Join native state with project-specific verbs and reversible side effects. [Replay and checkpoint contracts](gameplay-state-contracts.md#unreal-replay-reconstruction-checkpoint-fidelity-and-reset-boundaries) distinguish replicated reconstruction and physics state vectors from whole-game reset; actual round-trip fidelity remains untested |
| Levels and world streaming | World partition, procedural placement, streaming and studio cases | Distinguish requested, loaded, initialized, activated and usable state; handle known readiness bugs. [Navigation query/rebuild contracts](engine-operation-contracts.md#navigation-after-procedural-world-edits) add partial-path and synchronization evidence, while actual character traversal remains unverified |
| UI, localization and accessibility | Fonts, shaping, [pseudo-locales](https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/Pseudo-Localization.html), web checks and native UI surfaces | [Runtime locale-change boundaries](engine-operation-contracts.md#runtime-locale-changes-separate-string-delivery-rendering-and-accessibility) distinguish string delivery, redraw and native semantics; rendered-language correctness and accessible gameplay beyond DOM automation remain unverified |
| Audio and effects | DSP scheduling, loudness, [banks](https://www.fmod.com/docs/2.04/api/studio-api-bank.html)/[events](https://www.fmod.com/docs/2.04/api/studio-api-eventinstance.html), VFX and simulation caches | [FMOD observation boundaries](native-operation-details.md#distinguish-fmod-event-lifecycle-from-audible-completion) separate event state from audibility; measured synchronization, loops, spatial behavior, GPU/CPU simulation and persistence remain unverified |
| Visual observation | Capture, calibration, segmentation, tracking, depth and profilers | Align engine state, original frames, transformed evidence and the actual model input |
| Generative content | Image/video/3D/audio systems and job lifecycles | Verify current schemas, terminal states, output availability, failed-job costs and purpose-specific rights |
| Testing and performance | Test runners, visual baselines, impairments, metrics and agent evaluation | Control leakage, nondeterminism, invalid measurements and cross-project generalization |
| Build and collaboration | Incremental build, packaging, delivery and revision-integrity cases | Verify platform SDKs, signing, certification, dependency closure and team permissions |

See [native operation details](native-operation-details.md), [generation delivery](generation-delivery-contracts.md) and [asset validation](asset-validation-contracts.md) for concrete completion, failure and artifact constraints. See [work orders](production-work-orders.md) for operational chains, [studio cases](studio-production-case-studies.md) for historical evidence and [source revisions](source-revision-notes.md) for exact inspected files.

## Interface and observation boundaries

- Native API, editor scripting, runtime plugins, CLI, HTTP/WebSocket, MCP, GUI and file exchange have different state and permission boundaries. A community MCP bridge does not inherit every guarantee of the underlying engine.
- Editor-only scripting cannot be assumed to exist in a shipped runtime. Headless can mean windowless while still requiring a GPU, graphics API and initialized rendering pipeline.
- An accessibility tree, pixel capture and authoritative engine state are distinct observations. Screen coordinates need monitor/window/DPI/crop context; a click receipt is not an action-completion signal.
- Text, code, images, video, audio, meshes, materials, rigs, animation, scenes, runtime state and traces need distinct artifact contracts. A rendered image does not prove that native assets were saved or that dependencies will resolve on another machine.
- Missing tags are a catalog limitation, not evidence that an upstream tool lacks the feature. Inspect the linked source and version before excluding a candidate.

## From collected sources to an executable research system

The following are **GameMap editorial guidance** and remain implementation work:

1. Keep resource discovery, normalized operation contracts, local adapters and runtime verification as separate states.
2. Resolve a work order against a real environment: software/plugin versions, mode, hardware, graphics, authentication, license, budget and filesystem permissions.
3. Identify logical resources, actual implementations and individual sessions/jobs separately. A registry identifier is not a live object handle.
4. Preserve original artifacts, transformations, structured evidence and model-facing packets with provenance. Record what the model actually received.
5. Constrain mutation to declared policy/program components. Record tool and file authority; unrestricted script execution is not equivalent to a constrained semantic API.
6. Separate data checks from executable semantic regression: units, coordinate frames, stale world state, object identity, asynchronous completion, cancellation, recovery and cold reopen.
7. Evaluate retrieval and compatibility explanation before claiming that source search can resolve or execute a capability chain.
8. Compare bounded harness candidates using held-out tasks, repeated trials, reset policy and an untouched final evaluation set. GEPA or Meta-Harness interfaces do not supply game-specific evaluators automatically.

No published dossier here establishes an engine adapter, environment resolver, execution lockfile, trusted evidence runner, continuous source monitor or working self-improvement loop. Building these would require an explicit target environment and acceptance fixtures.

## Practical catalog lookup

The existing website filters and downloadable `data/resources.json` are the starting point. For a local source-only search, this command uses the current repository data without installing listed tools:

```sh
node --input-type=module -e '
import fs from "node:fs";
const rows = JSON.parse(fs.readFileSync("data/resources.json", "utf8"));
const terms = /cancel|recovery|asynchronous|accessibility|localization/i;
console.log(rows.filter(r => terms.test([r.name,r.summary,r.detail,...r.tags].join(" ")))
  .map(r => ({id:r.id, name:r.name, stages:r.stages, checked:r.verified, url:r.url})));
'
```

This lexical search returns source descriptions, not executable eligibility. Use the dossiers for missing operation-level constraints and retain unknowns until a concrete environment has been tested.
