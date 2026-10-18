# Production work orders: artifacts, recovery and acceptance

Sources checked on **2026-10-18**. Full reproduction not performed. All chains below are **proposed, not implemented or executed**. They connect documented operations into acceptance designs; neither a source check nor a successful repository build demonstrates these pipelines. This document is a follow-on to the concise engine, production and visual-evidence notes, not a new resource directory.

## Common execution contract

**GameMap editorial guidance.** Each work order needs an isolated workspace, intended target platform, immutable input manifest, source and consuming-tool versions, selected operation/options, native diagnostics, output hashes and an explicit acceptance policy. Record documentation versions separately from installed versions. A rolling URL, versioned documentation URL or source commit does not establish the installed executable or its dependencies.

Keep these states distinct: request accepted; native operation terminal; expected artifacts present; artifacts validated; project saved; fresh process reopened; target-runtime acceptance complete. Record **accepted, quality failure, unsupported, infrastructure failure, timeout, cancelled or inconclusive** separately. A timeout is not cancellation, a retry is not necessarily idempotent, and an existing file may belong to an earlier run. Cancellation and power-loss durability remain unknown unless a specific source establishes them.

The acceptance and recovery policies below are editorial proposals. Do not repair source assets, replace baselines, normalize audio, alter system network settings, upload packages or publish a build merely to make a check pass. Keep source inputs and failed artifacts. Tool licensing, fonts, media rights, SDK access and deployment authority need their own checks; this document grants none.

## 1. Export an authored asset, import it and audit dependencies

**Related contracts:** [Portable-asset validation](asset-validation-contracts.md#1-validate-a-portable-asset-without-confusing-format-validity-with-fidelity) and [composition validation](asset-validation-contracts.md#2-preserve-usd-composition-and-resolve-managed-assets-deliberately); [native import/save boundaries](native-operation-details.md#unreal-authoring-import-and-persistence); [Infinigen procedural export and resume](production-research-notes.md#infinigen-staged-generation-and-export-acceptance).

**Outcome:** a named asset survives transfer and fresh reopen with the intended scale, orientation, references and target identity.

**Documented surfaces.** [Maya 2026 file operations](https://help.autodesk.com/cloudhelp/2026/ENU/Maya-Tech-Docs/CommandsPython/file.html) expose scene open/save, references and import/export. [Standalone initialization](https://help.autodesk.com/cloudhelp/2022/CHS/Maya-SDK/Maya-Python-API/PythonOutsideMayaSession.html) is session-sensitive; the 2022 guide is not an installed-version assertion. [Unity GetDependencies](https://docs.unity3d.com/ScriptReference/AssetDatabase.GetDependencies.html), checked as Unity 6000.6, returns asset references; recursive results include the roots, and referenced assets are not necessarily required in a build. [Unreal AssetRegistry 5.6](https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/AssetRegistry?application_version=5.6) dependency queries cover on-disk references. Waiting before full engine initialization can leave unloaded-plugin assets ungathered; `is_loading_assets` describes initial searching, not every gathering operation.

**Proposed chain.** Freeze the authoring scene, references, plugins and export options → write a candidate export to a new destination → import into a disposable target project → wait for the selected importer and dependency scan → inspect the asset and reference graph → save → reopen in a fresh consuming process. Use [Unreal's coordinate system](https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinate-system-and-spaces-in-unreal-engine) and [unit defaults](https://dev.epicgames.com/documentation/en-us/unreal-engine/units-of-measurement-in-unreal-engine) only for that target: left-handed, Z-up, X-forward and default centimeters do not define the source asset's units.

**Completion and evidence.** Require an asymmetric, known-size object and expected reference sentinels. Preserve source/export/import hashes, object mapping, direct versus transitive edges, disk versus dirty-editor scope and reopen observations. Dependency enumeration does not authorize deleting allegedly unused assets or prove packaged reachability.

**Failure and recovery.** Missing plugin, unknown root, incomplete scan, changed unit basis or stale output blocks promotion. After an authorized save, Unreal can rescan specified modified filenames; rerun against the new disk snapshot. Reimport is not assumed idempotent: reconcile newly created objects before retrying. Exporter atomicity and arbitrary import rollback are unverified.

**Unimplemented fixture:** move one referenced texture, leave one scene edit unsaved, interrupt import, and compare the original and fresh-process manifests. The project-specific importer completion observer and save/reopen driver still need implementation.

## 2. Transfer a rig and test animation behavior

**Related contracts:** [Animation sampling and compression](asset-validation-contracts.md#animation-sampling-and-compression), including joint identity, partial output and final decoded motion. For engine-side culling, evaluation phase, events and movement ownership, see [runtime animation observation gates](engine-operation-contracts.md#runtime-animation-observation-gates).

**Outcome:** a skinned character preserves its rest pose and intended motion, including root transforms and contacts.

**Documented surfaces.** [Unity 6000.0 bind poses](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Mesh-bindposes.html) correspond by index to bones and use inverse base-pose transforms in the illustrated mesh/root setup. [Unreal Motion Matching](https://dev.epicgames.com/documentation/en-us/unreal-engine/motion-matching-in-unreal-engine) searches a Pose Search database using configured features. [Ubisoft's Learned Motion Matching explanation, July 30, 2020](https://www.ubisoft.com/en-us/studio/laforge/news/6xXL85Q3bF2vEj76xmnmIu/introducing-learned-motion-matching) explains that supplied motion limits behavior coverage: separate walking and drinking examples do not automatically supply walking while drinking. Foot locking, IK and blending remain integration concerns. This historical account is not a public SDK contract.

**Proposed chain.** Record hierarchy, bind matrices, bone indices, weights, coordinate basis and clip sample rate → transfer a candidate mesh and clips → inspect rest pose under both identity and nonidentity root transforms → sample designated clips and transitions → record contacts, root trajectory and behavior coverage → save and reopen → repeat the same samples.

**Completion and evidence.** File import and a populated animation database are intermediate results. Acceptance requires project-declared tolerances for joint positions, root displacement, contact sliding and transition discontinuity. Preserve source clip timing, engine sampling time, retarget settings and camera-independent geometry observations alongside video. A visually similar frame does not establish matching weights or temporal behavior.

**Failure and recovery.** Bone permutation, missing clip, transform mismatch or unsupported behavior blocks promotion. Correct the mapping or source export, then create a new candidate and rerun; do not automatically relabel unmatched bones or treat a failed retarget as a partial success. Preserve the accepted source rig. Native rollback, deterministic cross-platform sampling and cancellation behavior are unverified.

**Unimplemented fixture:** a small asymmetric skeleton with one weighted joint, a translated root, a planted-foot interval and a deliberately absent behavior combination. Requires a rig-inspection adapter and authoritative contact/trajectory evaluator; no automatic artistic-quality judgment is supplied.

## 3. Export textures without losing channels or color meaning

**Related contracts:** [Material, color and texture contracts](asset-validation-contracts.md#3-keep-material-graphs-color-processing-and-texture-compression-separate); [KTX policy, packing and target checks](asset-validation-contracts.md#ktx-validation-policy-normal-map-packing-and-transcode-targets); [lighting bake persistence and scene association](native-operation-details.md#lighting-bake-completion-and-persisted-scene-association).

**Outcome:** downstream textures preserve required channels/subimages and explicitly declared color interpretation.

**Documented surfaces.** [Substance Painter remote control](https://experienceleague.adobe.com/en/docs/substance-3d-dev/painter-python/tutorials/remote-control) drives a running authoring application; it does not establish a headless bake/export acceptance contract. The [OpenImageIO oiiotool manual](https://openimageio.readthedocs.io/en/latest/oiiotool.html), displayed as 3.3.0 when checked, documents `--info`, `--colorconvert`, `--diff` and `--absdiff`. Most commands normally operate on the first subimage and discard others; `-a` and subimage selection modifiers control broader processing. Named color transforms depend on the selected configuration. This is a rolling manual, not a pinned binary.

**Proposed chain.** Freeze Painter project, export preset and destination manifest → export candidate maps → inventory dimensions, channels, subimages, data types and alpha convention → classify color versus data maps → apply only declared transforms → compare candidate values and rendered material response → import, save and reopen. Preserve an untouched original and a separately identified derivative.

**Completion and evidence.** Require every expected map and subimage, plus the exact color configuration/hash and source/destination space names. A numerical diff is diagnostic, not proof of equivalent material appearance. Color conversion cannot be inferred from a filename. Normals, roughness, masks and other data channels require an explicit policy rather than blanket RGB conversion.

**Failure and recovery.** Missing secondary subimages, unknown color space, clipped data or wrong channel packing fails acceptance. Regenerate into a fresh directory with corrected selection/preset; do not overwrite the source or silently adopt a new baseline. A successful remote script return does not establish completed export, durable save or target-renderer compatibility. Export cancellation and interrupted-file atomicity remain unverified.

**Unimplemented fixture:** a multipart image containing color and normal data, a known ramp, an alpha edge and a deliberately omitted subimage. Require independent file inventory and target-material observation, not just the authoring preview.

## 4. Measure loudness, peaks, silence and loop boundaries

**Related contracts:** [Audio middleware readiness and ownership](native-operation-details.md#audio-middleware-authoring-readiness-and-ownership); [runtime audio observation and capture integrity](native-operation-details.md#runtime-audio-observation-and-capture-integrity) establishes tap/coverage provenance before artifact measurement. Event completion remains separate.

**Outcome:** a complete audio artifact has reproducible measurements and a separately reviewed loop seam.

**Documented surfaces.** The rolling [FFmpeg filter manual](https://ffmpeg.org/ffmpeg-filters.html) documents `ebur128` M/S/I/LRA measurements; true-peak mode oversamples and requires libswresample. `astats` supplies channel/overall statistics; `Peak_count` counts extrema occasions, not clipped samples. `silencedetect` announces silence after a duration threshold; end/duration metadata appears after silence. `mono=1` separates channels. For mono input intended for stereo playback, the manual calls for `dualmono` compensation; its `panlaw` setting also affects the measurement. No installed FFmpeg configuration was checked.

**Proposed chain.** Hash the original → identify selected stream, decoded sample format/rate and channels → run separate measurement passes using `ebur128=peak=true`, `astats=metadata=1:reset=0` and explicitly configured `silencedetect` → reconcile complete decoded coverage → compare to project thresholds → render at least two intended loop repetitions through the target import/codec path → inspect and audition the wrap.

**Completion and evidence.** Retain full command, binary/build configuration, stderr/metadata, sample count and actual analyzed range. Success requires the expected metrics and complete span, not merely exit code zero. Define clipping criteria for the sample representation and intended signal; never substitute `Peak_count` for a clipped-sample count. Trailing silence without a later frame needs explicit EOF reconciliation. Keep the noise threshold and minimum silence duration visible. Record the intended mono/stereo playback interpretation and `dualmono`/`panlaw` choices with the loudness result.

**Failure and recovery.** Decoder errors, truncated scans and unsupported true-peak processing are incomplete outcomes. Retry unchanged input/settings into isolated report files. Normalization, limiting, silence removal and crossfading are separate edits; if authorized, preserve derivative lineage and remeasure. Equal boundary samples alone do not establish musical continuity or codec-safe looping.

**Unimplemented fixture:** known silence on one channel, an intentional transient, terminal silence and a loop with a known discontinuity. Listening and project-specific loudness/peak limits remain necessary; no platform certification or universal game-mix target is claimed.

## 5. Verify audio/video timing and spatial playback

**Related contracts:** [Native audio scheduling and ownership](native-operation-details.md#audio-middleware-authoring-readiness-and-ownership).

**Outcome:** observed sound onset and visual events align within declared tolerances, with the intended listener and routing.

**Documented surfaces.** [ffprobe](https://ffmpeg.org/ffprobe.html) exposes stream, packet and frame sections. Interval seeking is inexact; relative duration is measured from the actual seek point. FFmpeg [ashowinfo](https://ffmpeg.org/ffmpeg-filters.html) reports audio PTS in input-timebase units, seconds, sample rate and sample count, while `asetrate` changes speed/pitch without changing PCM. [Unity 6000.0 PlayScheduled](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSource.PlayScheduled.html) uses the absolute DSP timeline; past times start as soon as possible, with different late-time behavior for AudioRandomContainer. [dspTime](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSettings-dspTime.html) is sample-based; its example discusses pause/suspension. [AudioListener](https://docs.unity3d.com/6000.0/Documentation/Manual/class-AudioListener.html) specifies one listener per scene; [spatialBlend](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSource-spatialBlend.html) ranges from 2D to 3D and applies 3D processing after stereo panning.

**Proposed chain.** Record clip/source/listener identities and device/mixer setup → schedule a marked sound with preparation lead time → capture audio plus a visible marker → associate decoded samples and visual-frame timestamps with a common observation clock → repeat markers near start, middle and end → exercise pause/resume and a scene/listener change → inspect spatial fixtures left/right/front/back and at selected distances.

**Completion and evidence.** Preserve rational time bases, origins, edit offsets, sample counts and capture uncertainty. Scheduling receipt is not audible onset. Equal durations do not prove synchronization; distinguish offset from drift. Persist the capture and runtime event log, not just a requested timestamp. Listener transforms alone do not establish HRTF quality, occlusion, routing or accessibility. Preserve [event refusal, API results, pause and Core-versus-Studio virtualization](native-operation-details.md#distinguish-fmod-event-lifecycle-from-audible-completion) separately; native PLAYING/STOPPED observations are not audible-success verdicts.

**Failure and recovery.** Missing PTS stays unknown rather than zero. Missing/duplicate listener, unexpected routing or dropped markers leaves acceptance incomplete. Reconcile episode/source state before retrying a timed-out schedule to avoid duplicate sounds. A fresh session needs a fresh DSP schedule; saved numeric timestamps are not a replay contract. Device latency, cancellation and rollback are unverified.

**Unimplemented fixture:** late schedule, pause/resume, long-run drift, channel swap and additive-scene listener replacement. Requires a clock-alignment collector and manual perceptual review. Do not silently retime audio to hide a failing observation.

## 6. Compile localization, shape text and inspect accessible UI

**Related contracts:** [Font artifact validation](asset-validation-contracts.md#6-validate-the-font-artifact-before-testing-localized-screens) and [native GUI evidence limits](engine-operation-contracts.md#native-gui-automation-is-a-separate-evidence-surface).

**Outcome:** reviewed translations compile and display with the intended glyphs, layout and accessible interaction. For native Godot UI, first check [semantic activation, deferred actions and platform boundaries](engine-operation-contracts.md#godot-native-semantic-observation-and-action-completion); an inspector-only Auto-mode run can lack active semantic updates.

**Documented surfaces.** [GNU gettext](https://www.gnu.org/software/gettext/manual/gettext.html) documents `msgfmt --check`, including format/header/domain checks. Marked format mismatches block MO generation; `--use-fuzzy` can include unreviewed entries. [HarfBuzz](https://harfbuzz.github.io/what-is-harfbuzz.html) selects and positions glyphs; it is [not a complete layout system](https://harfbuzz.github.io/what-harfbuzz-doesnt-do.html). [FreeType](https://freetype.org/freetype2/docs/index.html) provides font access and glyph images rather than higher-level layout. [MSDF Atlas Generator](https://github.com/Chlumsky/msdf-atlas-gen) defaults to ASCII unless overridden and requires linear sampling of atlas channels. These upstream pages do not license the chosen fonts.

**Proposed chain.** Freeze message extraction and format flags → review translations/fuzzy status → compile a fresh candidate MO → build an explicit locale/glyph set → shape representative text using the intended font/fallback stack → render real screens → test keyboard/assistive paths and localized overflow → package and reopen under each target locale.

**Completion and evidence.** Compilation is separate from translation coverage, shaping, line breaking and accessibility. Retain locale/domain, catalog hash, font versions/licenses, glyph-set definition and rendering configuration. For browser UI, [Playwright screenshots](https://playwright.dev/docs/api/class-pageassertions) wait for stable captures but masks/styles/animation controls can change evidence. [axe-core 4.10.3 API at checked commit](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md) distinguishes violations, passes, incomplete and inapplicable; restricted result types may omit node detail. DOM scans do not certify game canvases. For live locale switching, distinguish [string delivery, rendered layout and native accessibility](engine-operation-contracts.md#runtime-locale-changes-separate-string-delivery-rendering-and-accessibility); a successful refresh request is not completion of all three.

**Failure and recovery.** Fix extraction format classification at source; do not remove PO flags or auto-clear fuzzy status to pass. Preserve incomplete/manual findings. Retry changed locale/UI state as a new observation, retaining exclusions and options. Never update screenshot baselines automatically. Catalog write atomicity and complete fallback coverage remain unverified.

**Unimplemented fixture:** plural forms, mixed-direction text, combining marks, missing glyphs, long labels, captions and a hidden focus target. [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines) inform manual review; they are not legal certification. Requires project-specific locale switching and disabled-player testing.

## 7. Exercise multiplayer transport under impairment

**Related contracts:** [Protocol-scoped input/impairment](asset-validation-contracts.md#7-select-the-right-impairment-and-input-surface-for-a-regression) and [server state/transaction boundaries](gameplay-state-contracts.md#server-owned-gameplay-state-and-transaction-boundaries).

**Outcome:** a bounded multiplayer scenario retains authoritative gameplay invariants under declared latency, loss and reconnect conditions.

**Documented surfaces.** [GameNetworkingSockets](https://github.com/ValveSoftware/GameNetworkingSockets) supplies reliable/unreliable messages, latency/loss simulation and statistics; it does not supply entity serialization or delta encoding. Own signaling and service-specific access may be required. The rolling [native interface header](https://github.com/ValveSoftware/GameNetworkingSockets/blob/master/include/steam/isteamnetworkingsockets.h) documents send failures including invalid state, closed connection and queue limits. `RunCallbacks` dispatches queued callbacks when not using Steam's dispatch mechanism. Callback user data reflects when the callback was queued. Closing with linger attempts to flush remaining data; without linger, reliable data is not flushed. Closing a listen socket closes accepted connections ungracefully. These are source contracts, not a tested library revision or durable-delivery guarantee.

**Proposed chain.** Launch isolated server/client roles → record build/protocol/session identities → establish a clean baseline scenario → apply declared transport-local impairment → record send outcomes, callbacks and authoritative state transitions → remove impairment → reconnect/reconcile under a new connection identity → verify final application state → archive logs and terminate owned processes.

**Completion and evidence.** A connection or successful enqueue is not game-state commitment. Require application-level operation IDs and acknowledgements where the game needs them, server-authoritative invariants and bounded queue/timeout policy. Persist causal event logs and observed timing, including rejected actions. Durable gameplay persistence requires a separate project storage contract; transport close alone establishes none.

**Failure and recovery.** Queue saturation, stale callback identity, timeout and protocol mismatch are distinct. Reconcile unknown actions before application retries; transport reliability does not make purchases, rewards or repeated commands idempotent. Do not change host firewall/network policy or assume Steam relay entitlement. Roll back only fixture-owned impairment settings and verify cleanup. Network-seed reproducibility is not established here.

**Unimplemented fixture:** duplicate application request, delayed callback after reconnect, lost final acknowledgement and forced close during queued traffic. Requires a game-specific state driver, impairment configuration adapter and observability collector. Transport measurements alone cannot certify cheating resistance or production scalability.

## 8. Build a release-bound content update and reconstruct its patch

**Related contracts:** [Shipped-build inspection and comparison](production-debugging-contracts.md#build-artifacts-streaming-budgets-and-delayed-timing); [allocation lifetime and retained-resource evidence](production-debugging-contracts.md#memory-lifetime-across-repeated-production-cycles) separates runtime ownership from built size and reference-count summaries.

**Outcome:** a candidate update corresponds to the intended released baseline and reconstructs independently verified artifacts.

**Documented surfaces.** [Addressables 1.21 BuildContentUpdate](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/api/UnityEditor.AddressableAssets.Build.ContentUpdateScript.BuildContentUpdate.html) uses the specified content-state cache version and returns a build result. Its [update settings](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/manual/content-update-build-settings.html) can fall back from unavailable remote state to an existing local cached file; change group Update Restriction during full builds. [Modified-entry gathering](https://docs.unity3d.com/Packages/com.unity.addressables@1.21/api/UnityEditor.AddressableAssets.Build.ContentUpdateScript.html) targets static Addressable dependencies. [butler offline patching](https://itch.io/docs/butler/offline.html) requires staging, resumes an interrupted identical apply command, and otherwise applies in place unless another output directory is selected. Signature checking is optional; in-place unchanged files are not all checked. Independent `verify` detects hash mismatches; healing requires a pristine source.

**Proposed chain.** Match release/platform to a hashed content-state file → snapshot group/profile settings → gather changes → build to candidate output → inspect native error/result and artifact manifest → produce a patch from an immutable baseline → apply into separate scratch output using a dedicated checkpoint → verify the reconstructed build against the expected signature → install into an isolated target and exercise content loading → archive release lineage.

**Completion and evidence.** Result-object existence, patch completion and content activation are different gates. Preserve baseline, state-cache identity, patch/signature hashes, changed dependencies and complete reconstruction verification. A cache path is not evidence that the cache belongs to this release. No upload or release promotion is included.

**Failure and recovery.** Wrong fallback state or changed update policy stops incremental retry; select a full-build workflow explicitly. Resume butler only for identical inputs/command/checkpoint identity. Preserve failed reconstruction. Healing is a separate authorized mutation; do not repair a production installation automatically. Atomic promotion, concurrent patch writers and power-loss durability remain unverified.

**Unimplemented fixture:** unavailable remote state with stale local cache; interrupted patch; corrupted unchanged baseline file; wrong-platform content. Requires isolated installer and runtime content-load checks. A complete build still needs platform certification and distribution approval.

### Godot 4.4 content patches: mounting is not dependency activation

Checked **2026-10-18** against the official **4.4 documentation branch**, not an installed runtime or immutable documentation commit. The cache boundary is additionally supported by official **4.4-stable** source at commit `4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41`; it is not a compatibility claim for Godot 4.5, 4.6 or another release. This fills a gap beyond release-bound patch reconstruction: the correct pack bytes can be present while a consuming process still observes cached resources. No engine, installer, signing operation or credentials were used. All acceptance fixtures below are **GameMap editorial guidance, unimplemented and unexecuted**.

**Documented boundaries.** [ProjectSettings.load_resource_pack](https://docs.godotengine.org/en/4.4/classes/class_projectsettings.html#class-projectsettings-method-load-resource-pack) mounts PCK/ZIP content into `res://` and returns a boolean. Same-path entries replace existing entries by default; `replace_files=false` disables that replacement. The 4.4 reference cautions that `DirAccess` does not show changes to `res://` made by this operation. A directory listing is therefore not the acceptance oracle for newly mounted content.

[ResourceLoader cache modes](https://docs.godotengine.org/en/4.4/classes/class_resourceloader.html#enum-resourceloader-cachemode) establish a separate boundary: default `CACHE_MODE_REUSE` reuses cached resources and external dependencies. `CACHE_MODE_IGNORE` bypasses the main resource/subresource cache but still loads external dependencies with reuse; `CACHE_MODE_IGNORE_DEEP` propagates the bypass through dependencies. Replacement modes may refresh existing instances when types match, or recreate them otherwise. `exists()` can also report true for an unsaved resource whose path was taken over in cache. **Inference:** mount success, resource existence and reloading only the top-level object cannot alone prove that an entire patch dependency graph is active.

**Fixed-source corroboration.** At that commit, [the text-resource loader](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/scene/resources/resource_format_text.cpp#L1393-L1405) selects external-dependency reuse for ordinary IGNORE/REUSE/REPLACE and propagates the deep modes; [the resource loader](https://github.com/godotengine/godot/blob/4c311cbee68c0b66ff8ebb8b0defdd9979dd2a41/core/io/resource_loader.cpp#L608-L618) returns an existing cached resource for REUSE. This corroborates the cache distinction, not every resource-format plugin or the directory-listing warning.

The [4.4 pack guide](https://docs.godotengine.org/en/4.4/tutorials/export/exporting_pcks.html) also includes scripts among pack contents and documents an additional C# assembly-loading step before mounting a C# mod. Treat a pack as potentially executable content, not merely an inert texture archive; an approved data-pack mount does not establish that its separate assembly was delivered or loaded. This is not a claim that the engine authenticates or sandboxes a mod.

**Proposed acceptance.** Preserve engine/template identity, baseline and ordered pack hashes, expected path collisions, replacement policy and resource-loading/cache policy. Use a project-owned manifest of expected resource paths, types, dependency identities and observable version markers. Record mount results separately from the resources actually returned and the gameplay/rendered result. Validate a fresh process that mounts the intended pack set before loading fixture resources; if hot updates are promised, validate the warm process independently. Do not silently switch to deep replacement in a live game: existing object identity and side effects require their own contract.

**Unimplemented fixtures:** (1) cache a scene and its external material, mount a patch changing both, then compare default, top-level-ignore and deep-ignore loads against a fresh-process reference; (2) mount two packs with a deliberate path collision in both orders and with replacement disabled; (3) add a new known resource and compare manifest-directed loading with directory-list observations; (4) omit a required dependency or C# assembly and require a distinct activation failure rather than a mount-only pass. Preserve native errors and returned object/dependency markers, not merely screenshots or booleans.

**Failure/recovery limits.** Quarantine a mismatching candidate and restart the isolated fixture from its immutable baseline. The inspected contracts do not establish safe unmount/rollback, concurrent hot replacement, crash durability, signature trust, cross-version pack compatibility or bit-identical exports. None is claimed by this proposal.

## 9. Compile shader permutations and qualify first-use behavior

**Related contracts:** [Capture and shader diagnostic completion](production-debugging-contracts.md#capture-shader-and-gpu-diagnosis).

**Outcome:** required shader artifacts compile for declared targets and first-use behavior is measured independently of compiler success.

**Documented surfaces.** The [DXC API guide](https://github.com/microsoft/DirectXShaderCompiler/wiki/Using-dxc.exe-and-dxcompiler.dll), checked as a wiki revision dated May 5, 2023, distinguishes API-call success from `IDxcResult::GetStatus`. Diagnostics can include warnings as well as errors; expected object output must be retrieved separately. Debug PDBs are external by default and `-Vd` disables validation. Exact installed flag compatibility is unknown. Epic's [February 4, 2025 PSO precaching account](https://www.unrealengine.com/tech-blog/game-engines-and-shader-stuttering-unreal-engines-solution-to-the-problem) explains content/permutation coverage and driver-cache effects; its UE5.5 gaps must not be presented as current universal engine behavior.

**Proposed chain.** Freeze source/include graph, defines, entry points, HLSL version and target profiles → compile each required permutation with validation enabled → inspect API and compile status separately → retain object/debug/hash outputs → integrate into the intended engine build → exercise first-use scenarios in isolated cold-cache and warm-cache conditions → compare timing and rendered results → save the artifact/measurement manifest.

**Completion and evidence.** Every required permutation needs its own terminal outcome and fresh output. Preserve include resolution, compiler identity, target device/driver/RHI, quality preset and cache condition. Compiler success is not PSO creation, rendering correctness or hitch-free traversal. Driver-cache state is an experimental condition, not a property of the source hash.

**Failure and recovery.** Missing include, compile error, absent output and target incompatibility block promotion. Correct inputs and write new candidate outputs; never reuse an earlier success blob. Collect native errors before resetting. Do not erase a user's shared caches to create a cold run; provision an isolated fixture. No cross-driver cache portability or transactional compiler-output guarantee is established.

**Unimplemented fixture:** malformed include, valid but wrong target profile, material/skin swap and newly streamed object during traversal. Requires shader/PSO telemetry correlated with frame artifacts and a declared timing budget; a warm rerun cannot replace a failed cold-run result.

## Remaining implementation work

The chains need project drivers, native terminal observers, bounded process ownership, artifact collectors and independent acceptance evaluators. Authoring-format equivalence, console SDK/certification, codec/device latency, translation quality, accessible gameplay and application-level multiplayer durability remain project-specific. Historical industrial lessons help select failure cases; they do not expose private studio tooling or reproduce studio performance.

Retain source review dates, document versions and exact links in future implementations. Recheck rolling manuals and provider licenses before deployment. The proposed fixtures above have **no run IDs, measured tolerances, passed checks or runtime compatibility claims** because none has been executed.
