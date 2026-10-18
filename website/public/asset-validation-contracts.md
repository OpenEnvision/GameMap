# Asset interchange and validation contracts

Sources checked **2026-10-18**; full reproduction not performed. These notes recover substantive source-backed constraints omitted from the initial directory and nine production work orders. They complement those work orders rather than adding runnable adapters or more product cards. All acceptance fixtures below are **GameMap editorial guidance, unimplemented and unexecuted**.

Unless explicitly versioned below, sources are rolling documentation or repository pages, not immutable source pins. No installed version, compiler configuration, GPU capability, deployment permission or measured result is established. License notes describe the reviewed project scope; dependencies, source assets, fonts and customer content need separate review. Costs and runtime resource requirements have not been measured.

## 1. Validate a portable asset without confusing format validity with fidelity

**Documented operations and fields.** The [glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.pdf) specifies meters, radians, right-handed coordinates and positive Y up. The [Khronos Validator](https://github.com/KhronosGroup/glTF-Validator) validates glTF 2.0 and produces JSON issues and asset statistics. [glTF Transform](https://gltf-transform.dev/) supplies read/edit/write APIs, extension packages and a batch CLI. [Assimp](https://github.com/assimp/assimp) converts supported imports to a common in-memory representation but exports only a subset of formats. Import support is therefore a different capability from export support.

**Proposed acceptance contract.** Before transformation, record units/basis, extension inventory, external resource identities, scene hierarchy, material slots and animation/skin expectations. Retain the complete validator report and tool version for both original and candidate. Treat unsupported required extensions and missing external resources as explicit blockers. Then compare the candidate's geometry, scene identities and sampled deformation in the actual consuming importer. A structurally valid asset can still lose intended material behavior, animation or collision semantics.

**Failure/recovery/persistence.** Preserve originals and transform settings. An importer returning an object is not proof that every authored feature survived. Retry corrected candidates in new output locations; never overwrite the only source or infer atomic export/rollback from a successful function return. Fresh-process reopen plus an external-resource inventory is an additional proposed gate.

**Unimplemented fixture:** one asymmetric skinned object, one required extension, one missing texture and a declared animation sample. Compare before/after reports and target-engine state rather than a single preview image.

**Version/license scope:** glTF 2.0 is the format scope; exact specification revision and implementation versions are unpinned. Validator declares Apache-2.0; Assimp documents modified three-clause BSD. glTF Transform licensing was not established by this review. Earlier Validator commit resolution was rate-limited; no immutable revision is invented.

## 2. Preserve USD composition and resolve managed assets deliberately

**Documented operations and fields.** [UsdStage](https://openusd.org/release/api/class_usd_stage.html) exposes composition, variants, payload loading, save and flatten operations. `Save()` excludes session layers; dirty anonymous layers require explicit export. Flattening resolves composition rather than retaining the original editable structure. `GetUsedLayers()` is a snapshot affected by load set and variant selections, not an inventory of every possible configuration. `GetTimeCodesPerSecond()` returns the stage time-code rate, with documented metadata fallback rules. The broader [OpenUSD documentation](https://openusd.org/release/index.html) describes the scene-composition toolset. [Blender 4.4 USD interchange](https://docs.blender.org/manual/en/4.4/files/import_export/usd.html) supports a subset of USD data and documents USDZ limitations including UDIM textures; this is not a claim about later Blender versions.

[OpenAssetIO examples](https://docs.openassetio.org/OpenAssetIO/examples.html) require a concrete manager plugin; some examples explicitly cannot work without one. An asset-management API does not supply a configured asset database or guarantee a resolvable entity.

**Proposed acceptance contract.** Capture root/session/edit-target identity, selected variants, payload load policy, time metadata, resolver/manager identity and resolved resource manifest. Choose either an editable composition deliverable or a flattened evaluated deliverable before writing. Make session edits intended for delivery explicit. Open the candidate in a fresh process with the intended resolver and compare required variants and time samples.

**Failure/recovery/persistence.** Missing manager, unresolved references, unsaved anonymous layers or missing session edits block promotion. Preserve unresolved identifiers and diagnostics rather than replacing them with guessed local paths. Save failure is not permission to flatten and discard composition. Re-resolve only under the same recorded manager/configuration, or label a changed resolution as a new candidate. Transactional multi-layer saves and cross-manager equivalence remain unknown.

**Unimplemented fixture:** a session-only variant choice, anonymous edited layer, unloaded payload and manager-resolved reference. Require both serialized-artifact inventory and cold-reopen observations.

**Version/license scope:** OpenUSD `release` and OpenAssetIO examples are rolling; exact library/license and plugin terms were not established in these inspected pages. Blender evidence is specifically 4.4. No studio asset server was accessed.

## 3. Keep material graphs, color processing and texture compression separate

**Documented operations and fields.** [MaterialX](https://materialx.org/) represents material networks, values and assignments with standard processing/shading nodes; its [official implementation repository](https://github.com/AcademySoftwareFoundation/MaterialX) supplies code and Python interfaces. [OpenColorIO documentation](https://opencolorio.readthedocs.io/en/latest/) describes configurable color management and ACES workflows. [KTX-Software](https://github.com/KhronosGroup/KTX-Software) provides KTX2/Basis Universal tooling, creation/conversion/comparison/extraction operations and JavaScript/WebAssembly interfaces. A complete source checkout requires Git LFS content.

**Proposed acceptance contract.** Extend the texture-export work order with three manifests: material graph and supported node implementations; selected color configuration/transforms; container/codec and actual target transcode format. Keep color textures separate from normal/mask/data textures. Record decoded dimensions, mip levels, channel meaning and alpha policy, then inspect the intended material under target rendering conditions. File/container support alone does not establish acceptable GPU texture fidelity or renderer parity.

**Failure/recovery/persistence.** Missing node implementation, missing LFS bytes, unsupported transcode target or unknown source color interpretation leaves acceptance incomplete. Preserve the uncompressed master, graph, configuration and compressed derivative hashes. Retry a changed encoder/quality/transcode target as a new candidate. Do not silently substitute a shader, apply a display transform twice or label an incomplete source checkout buildable. Cross-renderer visual equivalence and interrupted-export durability remain unverified.

**Unimplemented fixture:** a color ramp, alpha edge, packed data map and normal map across two supported target formats, with declared error tolerances and an engine-rendered observation. This adds compression/graph coverage to the prior texture work order rather than repeating its image-inventory gate.

**Version/license scope:** all three sources are rolling; installed MaterialX node library, OCIO configuration and KTX encoder/transcoder versions are unknown. MaterialX declares Apache-2.0 for its library, not third-party textures. Exact OCIO/KTX dependency/license inventories were not established by these pages. MaterialX commit resolution was previously rate-limited; no source pin is claimed.

## 4. Optimize, retopologize, unwrap and regenerate tangents without losing correspondence

**Documented operations and fields.** [meshoptimizer](https://github.com/zeux/meshoptimizer) provides GPU-oriented optimization, simplification and compression, with gltfpack and a JavaScript subset. [Draco](https://github.com/google/draco) compresses meshes/point clouds and provides JavaScript/WebAssembly decoders; its documentation recommends version-specific decoder URLs. These operations do not themselves establish a target importer's extension/decoder compatibility.

[xatlas](https://github.com/jpcy/xatlas) separates charting and packing. UV seams can increase output vertex count; a progress callback returning false requests cancellation. [MikkTSpace's header](https://raw.githubusercontent.com/mmikk/MikkTSpace/master/mikktspace.h) returns tangents per face-vertex and warns against averaging or overwriting through the old index list. Baker/renderer triangulation must match. [UVAtlas](https://github.com/microsoft/UVAtlas) exposes create/partition/pack and remapping APIs, but was archived April 24, 2026; upstream discourages use for new projects.

[Instant Meshes](https://github.com/wjakob/instant-meshes) documents orientation-field then position-field solving with interactive guidance. That workflow is not evidence of a headless automation API. [QuadriFlow](https://github.com/hjwdzh/QuadriFlow) processes OBJ geometry; its documented solver selection changes dependency licensing. Neither remesher establishes preserved skinning or animation-ready edge flow.

**Proposed acceptance contract.** Freeze source topology and attribute ownership → create an optimization/retopology candidate → establish explicit old/new correspondence where available → unwrap and apply vertex remaps to all affected attributes → regenerate compatible tangents → bake/decode/import → compare geometry, UV seams, normal response and sampled deformation. Record decoder, triangulation and target extension support. Same index count is not proof of unchanged vertex identity.

**Failure/recovery/persistence.** Lost weight/morph correspondence, UV overlap, changed tangent signs, unsupported decoder or excessive geometric error blocks promotion. Restart from the preserved preceding stage after correcting parameters; do not repair by guessing old indices. A cancellation callback does not establish a valid partial atlas or rollback guarantee. Archive only validated stage outputs as reusable inputs; generic interruption/retry guarantees remain unknown.

**Unimplemented fixture:** mirrored UVs, a seam requiring duplicated vertices, an asymmetric quad with fixed triangulation, a skin-weight boundary and a known silhouette. Evaluate under motion and lighting; compression ratio and quad count are not quality scores.

**Version/license scope:** all repository references are rolling. meshoptimizer, xatlas and UVAtlas declare MIT; Draco Apache-2.0. MikkTSpace's permissive notice has origin, altered-source and notice-preservation conditions. Instant Meshes has a [license with supplemental terms](https://raw.githubusercontent.com/wjakob/instant-meshes/master/LICENSE.txt), requiring full review. QuadriFlow is MIT, but its README identifies LGPL sparse-Cholesky dependencies, an MPL2 sparse-LU alternative selected with `BUILD_FREE_LICENSE`, and separate optional Gurobi terms. Selected build dependencies, not the project badge alone, determine the review scope.

## 5. Deliver a timeline bundle that still resolves media

**Documented operations and fields.** [OpenTimelineIO 0.14 file bundles](https://opentimelineio.readthedocs.io/en/v0.14/tutorials/otio-filebundles.html) package timeline data with referenced media. Bundle references can use local relative paths or represent missing media. OTIO does not encode or decode media.

**Proposed acceptance contract.** Record timeline/adapter version, clip identity, source ranges, rates, missing-reference state and media hashes → bundle to a new destination → reopen from a different root directory → independently decode the referenced media using the intended playback path → compare expected clip boundaries and timing. This is media-resolution acceptance, separate from the earlier audible A/V synchronization fixture.

**Failure/recovery/persistence.** A parseable timeline or existing bundle is not sufficient when clips resolve to missing media. Retain missing references explicitly. Rebuild from verified source media; do not silently download replacements, change ranges or substitute proxies as masters. Decoder availability, adapter-specific preservation, atomic bundle writes and general codec rights are unknown.

**Unimplemented fixture:** moved bundle root, one missing source, mixed-rate clips and a declared proxy/master distinction. No media decoding or playback was performed for this review.

**Version/license scope:** the cited bundle tutorial is specifically 0.14, not latest-adapter compatibility. OTIO, adapters and media license inventories were not established by this tutorial.

## 6. Validate the font artifact before testing localized screens

**Documented operations and fields.** [fontTools subsetting](https://fonttools.readthedocs.io/en/latest/subset/index.html) accepts Unicode/text/glyph selection and layout-feature options. Missing requested Unicode is ignored by default, whereas missing glyph identifiers fail by default; `--no-ignore-missing-unicodes` makes Unicode omissions failures. The [fontTools repository](https://github.com/fonttools/fonttools) also documents TTX XML interchange. [Font Bakery](https://github.com/fonttools/fontbakery) checks font binaries/project metadata and supports custom Python checks. [OpenType Sanitizer](https://github.com/khaledhosny/ots) validates and sanitizes by parsing and serializing OpenType/WOFF/WOFF2; its build intentionally does not produce a shared library.

**Proposed acceptance contract.** Add an artifact gate before the localization work order: freeze licensed font and representative corpus → subset with explicit missing-character/layout policy → retain subset diagnostics → run an appropriate Font Bakery profile → sanitize a separate candidate if intended → compare original/derivative hashes → test shaped strings and fallback behavior in the target renderer. Preserve layout-feature choices and exact check profile/version.

**Failure/recovery/persistence.** Successful subsetting with defaults is not coverage evidence. Sanitization can change bytes; retain both artifacts and rerun shaping/coverage against the actual shipped candidate. A passing structural or metadata check does not establish language coverage, acceptable appearance, accessibility or font redistribution rights. Fix source/settings and rebuild; do not suppress failed checks or replace a missing glyph with an unexplained fallback. Atomic output, cancellation and checkpoint-resume semantics remain unverified.

**Unimplemented fixture:** a requested absent Unicode character, combining sequence, required shaping feature and deliberately malformed font table. Pair structural results with actual rendered-language acceptance; neither replaces the other.

**Version/license scope:** rolling sources; fontTools README documents Python 3.11+ at review, not an environment probe. Project licenses: fontTools MIT, Font Bakery Apache-2.0, OTS BSD-3-Clause. Font files and optional dependencies have independent terms; Font Bakery is not an official Google-supported product.

## 7. Select the right impairment and input surface for a regression

**Documented operations and fields.** [Toxiproxy](https://github.com/Shopify/toxiproxy) is an HTTP/CLI-controlled TCP proxy. Latency toxics default downstream; symmetric delay requires configuring both directions. Its unauthenticated control API must not be exposed to untrusted networks. [Linux netem's manual](https://man7.org/linux/man-pages/man8/tc-netem.8.html) documents delay/loss/duplication/corruption and seeded randomness, but timer granularity affects delay/rate fidelity; realistic TCP tests have placement constraints, including receiver ingress guidance.

[GGPO](https://github.com/pond3r/ggpo) uses predicted inputs and speculative execution for rollback; its checked README documents Windows builds and the Vector War sample. [SDL3 virtual joystick attachment](https://wiki.libsdl.org/SDL3/SDL_AttachVirtualJoystick) is available since 3.2.0, can be called from any thread and returns zero on failure. Virtual devices accept program-provided inputs without physical hardware.

**Proposed acceptance contract.** Extend the multiplayer work order by specifying protocol, direction, placement and measured impairment rather than a single “lag” parameter. Toxiproxy TCP behavior cannot demonstrate impaired UDP. A seed alone does not establish reproducibility across kernel/timer/load differences. For rollback, separately test state save/restore and repeated external side effects. For virtual input, bind device identity and injected schedule to observed game ticks/events; attachment success is not input consumption or physical-device equivalence.

**Failure/recovery/persistence.** Reject unsupported protocol coverage, unobserved impairment, stale device handles and rollback duplication of rewards/audio/network effects. Keep process-owned fixtures isolated; preserve pre-test state and confirm cleanup. Host network changes require explicit authority and a restoration plan; none are performed or authorized by this note. Timeout does not prove the fault was removed. Archive traffic/event/state evidence, not merely configured fault values.

**Unimplemented fixture:** TCP downstream-only delay contrasted with both directions; rollback after a one-shot effect; virtual-device attach failure and reconnect. No universal cross-platform determinism, literal zero latency, haptics fidelity or durable transaction guarantee is claimed.

**Version/license scope:** Toxiproxy and GGPO declare MIT; netem package and SDL licensing were not established by the cited function/manual pages. Installed versions and platform support remain unknown. SDL's “since 3.2.0” marker is an API minimum, not a tested package pin.

## What this migration adds

The substantive additions are format/extension validation, USD session and load-set persistence, asset-manager prerequisites, material/color/codec separation, geometry attribute remapping, media-bundle resolution, font artifact checks and protocol/direction-scoped impairment. They make missing acceptance obligations visible. They do not convert documentation into executed support or establish saturation of production coverage.
