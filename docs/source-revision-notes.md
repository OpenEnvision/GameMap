# Source revision and implementation boundaries

Checked **2026-10-18**. Sources checked; full reproduction not performed.

This appendix records 32 exact upstream source or model-card files inspected during the research. Full revisions identify the document/code that supported a claim. They do not identify an installed package, engine environment, downloaded model weights or a successful adapter run. No source pin grants rights beyond the applicable code, weight, data and service terms.

## Revision index

| Inspected source | Exact revision | Evidence scope |
| --- | --- | --- |
| [Blender as bpy module](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/doc/python_api/rst/info_advanced_blender_as_bpy.rst) | `3f4216e1bad1e76e9c2d4a00b4a9d09954593f47` | Source file inspected; runtime untested |
| [Bevy remote implementation documentation](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/crates/bevy_remote/src/lib.rs) | `85503941e488152711a4695bbe248e9ed9f453fc` | Source file inspected; runtime untested |
| [Bevy headless renderer example](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/examples/app/headless_renderer.rs) | `85503941e488152711a4695bbe248e9ed9f453fc` | Source file inspected; runtime untested |
| [Coding-Solo/godot-mcp README](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/README.md) | `1209744fad78f3998f98c7394fd0f6ef50da5281` | Source file inspected; runtime untested |
| [ComfyUI history-to-image download example](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/script_examples/websockets_api_example.py) | `c06bf5f569d268b80076e5f44126f87cdf835869` | Source file inspected; runtime untested |
| [ComfyUI server operation implementation](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/server.py) | `c06bf5f569d268b80076e5f44126f87cdf835869` | Source file inspected; runtime untested |
| [axe-core API](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md) | `f49c1c49b5eafe1f8065e07c314f75968dd91333` | Source file inspected; runtime untested |
| [Playwright license](https://github.com/microsoft/playwright/blob/54c711571a37de525377e6f3d3608c3e029b1829/LICENSE) | `54c711571a37de525377e6f3d3608c3e029b1829` | Source file inspected; runtime untested |
| [axe-core license](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/LICENSE) | `f49c1c49b5eafe1f8065e07c314f75968dd91333` | Source file inspected; runtime untested |
| [Running your ink](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/Documentation/RunningYourInk.md) | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | Source file inspected; runtime untested |
| [pi extensions](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md) | `482c1381a00d8d00bc81697e4a980c593db6803e` | Source file inspected; runtime untested |
| [GEPA adapter protocol](https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py) | `f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819` | Source file inspected; runtime untested |
| [Meta-Harness onboarding](https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/ONBOARDING.md) | `8123ccabe2b19fa1123090b2e5f1bacc20963ce8` | Source file inspected; runtime untested |
| [ink official repository](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/README.md) | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | Source file inspected; runtime untested |
| [bevyengine/bevy license scope](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/README.md) | `85503941e488152711a4695bbe248e9ed9f453fc` | Source file inspected; runtime untested |
| [bevyengine/bevy license scope](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/LICENSE-MIT) | `85503941e488152711a4695bbe248e9ed9f453fc` | Source file inspected; runtime untested |
| [blender/blender license scope](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/COPYING) | `3f4216e1bad1e76e9c2d4a00b4a9d09954593f47` | Source file inspected; runtime untested |
| [Coding-Solo/godot-mcp license scope](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/LICENSE) | `1209744fad78f3998f98c7394fd0f6ef50da5281` | Source file inspected; runtime untested |
| [Coding-Solo/godot-mcp index.ts](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts) | `1209744fad78f3998f98c7394fd0f6ef50da5281` | Source file inspected; runtime untested |
| [Coding-Solo/godot-mcp godot_operations.gd](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/scripts/godot_operations.gd) | `1209744fad78f3998f98c7394fd0f6ef50da5281` | Source file inspected; runtime untested |
| [inkle/ink license scope](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/LICENSE.txt) | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | Source file inspected; runtime untested |
| [Playwright main source snapshot: actionability.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/actionability.md) | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | Source file inspected; runtime untested |
| [Playwright main source snapshot: class-pageassertions.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/class-pageassertions.md) | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | Source file inspected; runtime untested |
| [Playwright main source snapshot: params.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/params.md) | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | Source file inspected; runtime untested |
| [Playwright main source snapshot: accessibility-testing-js.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/accessibility-testing-js.md) | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | Source file inspected; runtime untested |
| [Playwright main source snapshot: test-snapshots-js.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/test-snapshots-js.md) | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | Source file inspected; runtime untested |
| [Pinned facebook/musicgen-small model card](https://huggingface.co/facebook/musicgen-small/blob/4c8334b02c6ec4e8664a91979669a501ec497792/README.md) | `4c8334b02c6ec4e8664a91979669a501ec497792` | Source file inspected; runtime untested |
| [Pinned stabilityai/TripoSR model card](https://huggingface.co/stabilityai/TripoSR/blob/5b521936b01fbe1890f6f9baed0254ab6351c04a/README.md) | `5b521936b01fbe1890f6f9baed0254ab6351c04a` | Source file inspected; runtime untested |
| [Ink story state and background save](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/ink-engine-runtime/Story.cs) | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | Source file inspected; runtime untested; [claim scope](gameplay-state-contracts.md) |
| [Nakama transaction membership](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/core_multi.go) | `cab8af584947ff0d7ebee91d6c33e67d87fd3e47` | Source file inspected; runtime untested; [claim scope](gameplay-state-contracts.md) |
| [Nakama database transaction retries](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/db.go) | `cab8af584947ff0d7ebee91d6c33e67d87fd3e47` | Source file inspected; runtime untested; [claim scope](gameplay-state-contracts.md) |
| [Nakama JavaScript multiUpdate argument positions](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/runtime_javascript_nakama.go) | `cab8af584947ff0d7ebee91d6c33e67d87fd3e47` | Source file inspected; runtime untested; [claim scope](gameplay-state-contracts.md) |

## Checked claims and boundaries

### Blender as bpy module

[Exact inspected file](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/doc/python_api/rst/info_advanced_blender_as_bpy.rst)

- Standalone bpy resembles background Blender, but does not expose every CLI option. Module reload is unsupported and one blend state is edited per process.
- The default startup scene is loaded; user preferences/startup are ignored unless explicitly loaded.
- Normal Blender signal handlers are absent, including special Ctrl-C render cancellation and crash-log behavior.

**Limits:** Source evidence pin only; not adapter implementation revision, environment lock or runtime verification. The exact file was re-read; installed software and dependency versions remain unknown.

### Bevy remote implementation documentation

[Exact inspected file](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/crates/bevy_remote/src/lib.rs)

- RemotePlugin installs protocol support without transport; RemoteHttpPlugin supplies HTTP.
- world.query and world.get_components expose ECS data. Non-strict reads can contain per-component errors rather than all-or-nothing success.

**Limits:** Source evidence pin only; not adapter implementation revision, environment lock or runtime verification. The exact file was re-read; installed software and dependency versions remain unknown.

### Bevy headless renderer example

[Exact inspected file](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/examples/app/headless_renderer.rs)

- The windowless example disables Winit, uses ScheduleRunner and still requires GPU rendering.
- Camera output travels through a GPU image, readback buffer/channel and CPU image; main/render-world transfer adds a documented frame of latency.
- Capture includes scene pre-roll, explicit GPU map/poll and aligned-row handling. A wrapper timeout is an additional proposed acceptance measure, not established by the example.

**Limits:** Source evidence pin only; not adapter implementation revision, environment lock or runtime verification. The exact file was re-read; installed software and dependency versions remain unknown.

### Coding-Solo/godot-mcp README

[Exact inspected file](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/README.md)

- The README documents editor/project launch, start/stop, debug output, scene management and UID tools.
- Godot and Node >=18 are prerequisites; UID management is labeled Godot 4.4+. This is a community CLI/GDScript integration.
- README autoApprove examples do not establish user authorization or sandbox guarantees.

**Limits:** Source evidence pin only; not adapter implementation revision, environment lock or runtime verification. The exact file was re-read; installed software and dependency versions remain unknown.

### ComfyUI history-to-image download example

[Exact inspected file](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/script_examples/websockets_api_example.py)

- Upstream example resolves output descriptors through history then /view.
- Upstream example treats binary websocket data as previews.

**Limits:** Exact source file re-read at the recorded commit on 2026-10-18. Source revision does not pin an installed package, model, dependency environment or GameMap adapter. No software executed.

### ComfyUI server operation implementation

[Exact inspected file](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/server.py)

- Reviewed POST handler accepts a UUID but has no duplicate-ID check before enqueue.
- Targeted cancel handles queued/running jobs; atomic running-ID check avoids cancelling a replacement job.
- Finished or unknown IDs return HTTP 200 with cancelled:false.

**Limits:** Exact source file re-read at the recorded commit on 2026-10-18. Source revision does not pin an installed package, model, dependency environment or GameMap adapter. No software executed.

### axe-core API

[Exact inspected file](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md)

- axe.run reports error/results through a callback, or returns a Promise when no callback is supplied. Results distinguish passes, violations, incomplete and inapplicable outcomes.
- Results include URL, timestamp, test-engine version and environment. Incomplete outcomes require further investigation or manual review.
- resultTypes can limit omitted categories to one node per rule. Frame and preload timeout controls do not establish complete native-game accessibility coverage.

**Limits:** Tag v4.10.3 resolved via release commit; exact API.md reread. Immutable upstream content inspection does not establish installed package, browser, engine, or release availability.

### Playwright license

[Exact inspected file](https://github.com/microsoft/playwright/blob/54c711571a37de525377e6f3d3608c3e029b1829/LICENSE)

- The v1.56.1 repository license is Apache-2.0. Browser binaries and third-party notices require separate review; this file does not pin rolling API documentation.

**Limits:** Tag v1.56.1 resolved via official release commit link; LICENSE file only. Immutable upstream content inspection does not establish installed package, browser, engine, or release availability.

### axe-core license

[Exact inspected file](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/LICENSE)

- The v4.10.3 repository license is MPL-2.0. This does not establish every wrapper or dependency license.

**Limits:** Tag v4.10.3 resolved via official release commit link; LICENSE file only. Immutable upstream content inspection does not establish installed package, browser, engine, or release availability.

### Running your ink

[Exact inspected file](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/Documentation/RunningYourInk.md)

- A Story is constructed from compiled JSON. Continue/canContinue advance available content; currentChoices and ChooseChoiceIndex drive choice selection.
- state.ToJson and LoadJson serialize and restore interpreter state. External engine side effects need a separate persistence/rollback design.
- External bindings default lookaheadSafe=false; functions marked safe must tolerate repeated evaluation.

**Limits:** Source evidence pin only; not adapter implementation revision, environment lock or runtime verification. The exact file was re-read; installed software and dependency versions remain unknown.

### pi extensions

[Exact inspected file](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md)

- Custom tools define schemas and execute; results separate model content from details/structured content.
- Nested executeTool calls emit events but do not automatically create transcript entries; the calling tool can report them. Stored nested-call metadata omits results.
- Sibling tool calls can run in parallel.

**Limits:** Exact source file re-read at the recorded commit on 2026-10-18. Source revision does not pin an installed package, model, dependency environment or GameMap adapter. No software executed.

### GEPA adapter protocol

[Exact inspected file](https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py)

- Evaluation returns aligned outputs/scores and optional trajectories.
- make_reflective_dataset produces per-component JSON-serializable feedback; trajectories are opaque to optimizer.
- Scores are higher-is-better; individual failures receive failure scores, systemic errors may raise.

**Limits:** Exact source file re-read at the recorded commit on 2026-10-18. Source revision does not pin an installed package, model, dependency environment or GameMap adapter. No software executed.

### Meta-Harness onboarding

[Exact inspected file](https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/ONBOARDING.md)

- Requires explicit mutation boundary/interface, consistent evaluation, budget and stopping rule.
- Final tests must be separate from candidate generation/selection; persistent state can leak test information.
- Preserve candidate source, scores, configuration and traces.

**Limits:** Exact source file re-read at the recorded commit on 2026-10-18. Source revision does not pin an installed package, model, dependency environment or GameMap adapter. No software executed.

### ink official repository

[Exact inspected file](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/README.md)

- The core C# runtime and inklecate CLI are distinct from the community inkjs JavaScript port.
- The README states MIT licensing and warns that inkjs is usually one major version behind, rather than promising parity.

**Limits:** Observed repository snapshot; README plus separately reread LICENSE.txt. Immutable upstream content inspection does not establish installed package, browser, engine, or release availability.

### Bevy README: repository and asset license scope

[Exact inspected file](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/README.md)

- Repository README states MIT OR Apache-2.0 except noted files/crates; bundled example assets can have different licenses. MIT file and README checked at same commit; no blanket asset-license inference.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied.

### Bevy MIT license file

[Exact inspected file](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/LICENSE-MIT)

- The inspected LICENSE-MIT contains the MIT grant. Repository-wide dual-license and asset exceptions are documented separately in the [same-commit README](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/README.md).

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied.

### blender/blender license scope

[Exact inspected file](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/COPYING)

- COPYING identifies GNU GPL and points to doc/license/GPL-license.txt. Do not label Blender software MIT merely because some wrappers are permissive; exact package/file licensing still needs separate review.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied.

### Coding-Solo/godot-mcp license scope

[Exact inspected file](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/LICENSE)

- The inspected LICENSE provides an MIT grant. This does not establish sandbox guarantees, permissions or licenses for user projects. Configuration examples are in the [separately inspected README](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/README.md).

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied.

### Coding-Solo/godot-mcp index.ts

[Exact inspected file](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts)

- run_project sends kill to the previously tracked process before spawning another; it tracks one handle without waiting for prior exit, so one-live-process exclusivity is not guaranteed.
- stop_project sends kill and clears activeProcess before returning; no exit acknowledgement is awaited in this handler.
- Natural exit clears activeProcess; get_debug_output then returns no-active-process error, so this endpoint is not a durable post-crash log archive.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied.

### Coding-Solo/godot-mcp godot_operations.gd

[Exact inspected file](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/scripts/godot_operations.gd)

- Class instantiation restricts script lookup to registered global class names, rejecting raw paths at this helper. Registered project scripts can still be instantiated; this is not proof of sandboxing or complete security.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied.

### inkle/ink license scope

[Exact inspected file](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/LICENSE.txt)

- MIT LICENSE.txt checked at same commit; runtime guide pin does not license third-party story/media assets.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied.

### Playwright main source snapshot: actionability.md

[Exact inspected file](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/actionability.md)

- The inspected main snapshot include Not Inert in click checks in addition to unique/visible/stable/events/enabled.
- Opacity zero visible, stable two animation frames, forced event-reception bypass, dispatchEvent no actionability checks.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied. Main source snapshot committed 2026-10-17T07:40:24Z, distinct from published playwright.dev page. Do not infer this commit builds the published page or is a released/installed version.

### Playwright main source snapshot: class-pageassertions.md

[Exact inspected file](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/class-pageassertions.md)

- Runner required; two consecutive identical screenshots before comparison.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied. Main source snapshot committed 2026-10-17T07:40:24Z, distinct from published playwright.dev page. Do not infer this commit builds the published page or is a released/installed version.

### Playwright main source snapshot: params.md

[Exact inspected file](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/params.md)

- Signal documented since v1.62; assertion failure/stopped retries is not application rollback.
- Shared params document finite fast-forward/transitionend, infinite reset/restart, hidden caret, invisible-element masks, shadow/iframe stylesheet, CSS scale.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied. Main source snapshot committed 2026-10-17T07:40:24Z, distinct from published playwright.dev page. Do not infer this commit builds the published page or is a released/installed version.

### Playwright main source snapshot: accessibility-testing-js.md

[Exact inspected file](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/accessibility-testing-js.md)

- Automated scan cannot prove all WCAG; manual/inclusive-user assessment needed.
- exclude removes element and all descendants from all rules.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied. Main source snapshot committed 2026-10-17T07:40:24Z, distinct from published playwright.dev page. Do not infer this commit builds the published page or is a released/installed version.

### Playwright main source snapshot: test-snapshots-js.md

[Exact inspected file](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/test-snapshots-js.md)

- Two consecutive matching screenshots; fonts/browser/platform affect output.
- toMatchSnapshot accepts text and binary.

**Limits:** Exact source file inspected at this commit; no runtime or implementation pin is implied. Main source snapshot committed 2026-10-17T07:40:24Z, distinct from published playwright.dev page. Do not infer this commit builds the published page or is a released/installed version.

### Pinned facebook/musicgen-small model card

[Exact inspected file](https://huggingface.co/facebook/musicgen-small/blob/4c8334b02c6ec4e8664a91979669a501ec497792/README.md)

- The MusicGen-small card distinguishes CC BY-NC 4.0 weights from MIT code and describes research as intended use.
- The card does not establish input-specific rights, output clearance, a separate benchmark-publication entitlement, or hosted-provider training/retention promises.

**Limits:** Only this checkpoint card was inspected. No weights downloaded, terms accepted, account configuration changed or model executed.

### Pinned stabilityai/TripoSR model card

[Exact inspected file](https://huggingface.co/stabilityai/TripoSR/blob/5b521936b01fbe1890f6f9baed0254ab6351c04a/README.md)

- The TripoSR card declares MIT and describes a curated Objaverse training subset as CC-BY. This does not clear arbitrary inputs or extend licensing to the linked SF3D successor.
- The card does not establish output clearance, a separate benchmark-publication entitlement, or hosted-provider training/retention promises.

**Limits:** Only this checkpoint card was inspected. No weights downloaded, terms accepted, account configuration changed or model executed.

## Freshness and promotion policy

The following is **GameMap editorial guidance**:

- Re-check service terms, model availability and expiring-output contracts immediately before a hosted experiment. A checked date is not a promise of monitoring.
- Keep published release documentation separate from a moving default branch. A later source file can show an implementation detail without proving that an installed release contains it.
- Record actual engine/package/model versions alongside the source reference. Pin dependencies and configuration for an execution fixture separately.
- Re-run targeted acceptance tests when source revisions, model identifiers, content, renderer, operating system or project settings change. A diff-free documentation page does not prove unchanged hosted behavior.
- Capture missing, inaccessible and contradictory evidence explicitly. Do not manufacture a revision when a repository API or gated file cannot be read.

For practical chains and unresolved end-to-end behavior, see the [production work orders](production-work-orders.md). Historical studio accounts are collected in [production case studies](studio-production-case-studies.md). These are complements to the [production research index](research-index.md), not new resource-count claims.
