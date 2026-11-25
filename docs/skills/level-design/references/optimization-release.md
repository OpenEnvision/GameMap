# Optimization, Documentation, Packaging, and Release

Sources: [Optimization](https://book.leveldesignbook.com/process/env-art/optimization), [Release](https://book.leveldesignbook.com/process/release). Adapted and reorganized under CC BY-NC-SA 4.0. Engine commands, platform examples, and numerical budgets in the source are version-dependent; verify them for the actual project.

## 1. Plan feasibility early; optimize from evidence

Optimization diagnoses performance problems and improves resource use. It involves design, programming, art, technical art, audio, and production.

**Problem:** an expensive level may exceed the project's capabilities, while premature optimization can polish content later removed.

**Example:** a battle requires many navigating enemies in a large visible city. The issue may be encounter scope, AI implementation, rendering, memory, or several together.

**Response:** establish target platform and feasible scope early, prototype expensive relationships, and profile before selecting an intervention.

Record:

- Target hardware, resolution, quality settings, and frame-time goal.
- Level size, density, openness, camera, and streaming assumptions.
- Representative worst-case views and activities.
- The build and test conditions used for measurement.

## 2. Distinguish budgets

- **Memory:** assets, runtime data, duplication, residency, and loading.
- **CPU:** simulation, scripting, AI, physics, audio, submission, and related work.
- **GPU:** geometry, shading, lighting, shadows, transparency, and image processing.
- **Loading/streaming:** whether required data is available without disruptive stalls.

A low frame rate does not identify which budget is exceeded. Average FPS can conceal disruptive spikes; inspect frame time and representative events.

## 3. Profiling workflow

1. Reproduce a specific slowdown in a known build.
2. Capture representative data on relevant hardware.
3. Identify the dominant cost and plausible cause.
4. Make a targeted change.
5. Compare under the same conditions.
6. Check visual, gameplay, memory, and loading regressions.
7. Record remaining uncertainty.

Use the engine's current profiling tools. The book gives Unity and Unreal examples, but do not copy old commands or UI paths without checking the installed version.

Do not fabricate profiler captures or claim an improvement from an unmeasured edit.

### A capture card for one suspected slowdown

For a GameMap practice comparison, choose a short route such as start → enter the encounter → turn toward the exit → retry. Mark the troublesome event on that route. Decide the warm-up and capture duration before comparing builds; for a small exercise, 10 seconds of warm-up and a 60-second capture are starting points to adjust, not a performance standard. Test cold loading separately from a warmed-up traversal.

| Record                                                       | Baseline              | Candidate change      |
| ------------------------------------------------------------ | --------------------- | --------------------- |
| Build, engine version, capture file                          | ___                   | ___                   |
| Hardware, power mode, resolution, quality, frame cap / VSync | ___                   | Same, or explain: ___ |
| Start state, route, input sequence, seed if supported        | ___                   | Same, or explain: ___ |
| Warm-up, capture duration, repeat count                      | ___                   | ___                   |
| Frame time: median, 95th percentile, largest spike and event | ___ ms / ___ ms / ___ | ___ ms / ___ ms / ___ |
| Dominant CPU / GPU work and peak memory, when available      | ___                   | ___                   |
| Gameplay, image, and loading regressions checked             | ___                   | ___                   |

The 95th percentile is the frame time at or below which 95% of the sampled frames fall. It still needs the event trace: a single long stall can matter even when most frames are quick. Keep individual captures rather than reporting only the best run. A missing measurement stays blank, not zero.

If suspending NPC updates removes the encounter spike, use the capture to locate the expensive work. A candidate might reduce unnecessary path recalculations while retaining the enemies. Recheck pursuit, attack timing, and route completion after the change; an empty arena is not an equivalent faster encounter. If a coding agent proposes the edit, preserve its change and the measured outcome separately from its prediction.

## 4. Match the intervention to the bottleneck

### CPU candidates

- Too many active entities or unnecessarily frequent updates.
- Expensive or repeated script work.
- AI/pathfinding density and complexity.
- Physics and collision workload.
- Entity creation/destruction or loading behavior.

Potential responses include activating only relevant content, simplifying work, redesigning encounter scope, and fixing code. Disabling enemies may prove a hypothesis but is not automatically an acceptable final design.

### GPU candidates

- Expensive visible geometry or too many submissions.
- Material/shader complexity.
- Dynamic lighting and shadows.
- Transparency and overlapping effects.
- Insufficient visibility management.

Potential responses:

- Batching compatible geometry.
- Instancing repeated mesh/material combinations.
- Appropriate distance/detail reduction.
- Frustum or occlusion culling.
- Simpler shaders, lighting, shadowing, or effects.
- Better asset/material organization.

**Batching** combines compatible submissions; **instancing** efficiently repeats compatible geometry. Their details and tradeoffs are engine-specific.

A texture atlas or merged mesh can reduce some costs while worsening flexibility, memory residency, or culling. More optimization machinery is not automatically faster.

### Memory and streaming candidates

- Oversized or numerous unique assets.
- Unnecessary simultaneous residency.
- Duplicate data or poorly grouped content.
- Large transitions that demand data too late.

Design routes, visibility, and loading boundaries together when streaming is fundamental. Do not add arbitrary corridors solely because “corridors optimize games.”

## 5. Avoid inherited performance myths

- The source's approximate draw-call table is not a current universal hardware contract.
- Fewer polygons do not guarantee a faster frame.
- More lights do not have the same cost in every renderer.
- Forward/deferred labels do not fully describe a modern engine's hybrid pipeline.
- Transparent and alpha-tested materials behave differently across hardware.
- A hidden object may still consume resources, depending on the system.

Use the actual profiler and engine documentation. Treat numbers in old examples as historical context unless validated.

## 6. Package a usable artifact

A level can be released as an alpha, beta, demo, mod, or finished project. Label its condition honestly instead of waiting for an undefined perfect state.

Before packaging:

- Identify the supported game/engine version and dependencies.
- Include required files and folder structure.
- Include installation, launch, controls, credits, licenses, and known issues.
- Exclude unneeded caches, private data, and unlicensed assets.
- Use the destination community's accepted format and conventions.
- Prefer accessible distribution, such as a ZIP where suitable, over unnecessary installers.

Quake-specific structure is covered in [Tools and Quake](tools-quake.md).

### Clean-install test

Test from a clean or separately staged location:

1. Follow only the supplied instructions.
2. Confirm dependencies are genuinely available.
3. Launch and complete the relevant path.
4. Exercise retry, save/load, and changed states where supported.
5. Check missing resources, case-sensitive paths, and defaults.
6. Record the tested configuration.

Do not use success on the author's asset-rich development setup as proof of a complete package.

Keep a short installation receipt with the package: archive name and checksum; required game/mod and version; destination directory; exact launch instruction; tested system; and launch, completion, and retry outcomes. Ask someone to follow it without the editor or your development folders. If a texture is missing, record the path that failed and add the permitted dependency or correct the path before repackaging. Do not quietly fix the test machine and mark the original archive as passed.

## 7. Present the level, not just its prettiest wall

A useful release page includes:

- A concise name and description of genre, mechanics, scope, and intended experience.
- In-game screenshots of major spaces and relationships.
- A short representative gameplay video.
- A working download or platform link.
- Clear credits, dependencies, installation, and known issues.

The source suggests several screenshots and a short gameplay recording. Treat its exact resolutions, durations, platform assumptions, and social-media advice as examples to adapt, not permanent requirements.

For gameplay documentation, show ordinary play and the level's actual behavior. Avoid intro screens, unrelated music, and editing that conceals the activity being evaluated.

## 8. Portfolio evidence

Add only material that makes authorship and reasoning clear:

- Labeled overview showing routes, objectives, spawns, encounters, or puzzle dependencies.
- A few legible process images.
- A short retrospective: intended goal, main change, test evidence, strength, and weakness.
- Precise individual responsibilities and team/asset credits.

Do not imply ownership of a whole team project or present a final screenshot as evidence of level-design decisions.

The book includes specific opinions about what employers regard as professional tools. Treat those as contextual industry commentary, not a timeless ban on Minecraft, Fortnite, Roblox, or other user-generated-content work. Match evidence to the actual role and audience.

## 9. Release is also a feedback loop

Prepare for bug reports, patches, compatibility questions, and player interpretation. Distinguish defects from preference and keep version information visible.

Audience size is not a direct quality metric. The source explicitly values small communities, unfinished experiments, noncommercial work, and making levels for their own sake.

## Deliverable

A measured performance report where applicable, a reproducible package, a clean-install result, and a release page that accurately represents the project. If publishing is not authorized, prepare the package and instructions without posting anything publicly.
