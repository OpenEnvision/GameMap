# From Resource Map to Runnable Game

This page contains **GameMap editorial recommendations** for turning research, tools, and engine references into an executable workflow. It does not promise any agent's success rate. Sources were reviewed through **2026-10-18**; that date records source review, not installation, training, or complete reproduction of every project. No automatic collection or recurring updates are scheduled.

## Define the deliverable before choosing tools

Specify the target platform, player actions, core loop, win/loss conditions, art direction, target hardware, and delivery format. A shippable game project, an action-controlled video experience, an importable scene asset, and a simulator for planning or training need different world representations and acceptance methods.

The selection guidance below reflects GameMap's editorial judgment, not a performance or cost ranking. Existing team experience, working templates, and the target platform often matter more to an initial release than demo visuals.

| Tool | Official scope and boundaries | A suitable starting task |
| --- | --- | --- |
| Phaser | A JS/TS framework for browser-based 2D games, without built-in 3D rendering or 3D physics. [Introduction](https://docs.phaser.io/phaser/getting-started/what-is-phaser) | Browser 2D prototypes, sprite games, and tilemaps |
| Godot | Scene/node composition, a dedicated 2D pipeline, and 3D import workflows. [Features](https://godotengine.org/features/) | 2D/3D projects needing an editor, scene composition, and an inspectable project |
| Unity | An ecosystem for 2D/3D editing and runtime development. [Introduction](https://unity.com/products/unity-engine) | Teams with existing C#, component, and asset workflows |
| Unreal Engine | Editor, Blueprint, level design, and packaging tools. [Core documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/understanding-the-basics-of-unreal-engine) | 3D projects with existing UE templates and content pipelines that need substantial level editing |
| Three.js | A 3D library; collision, physics, input, and pathfinding require additional integration. [Game tutorial](https://threejs.org/manual/pages/game.html) | 3D prototypes centered on browser interaction, custom rendering, and code composition |
| Blender | Modeling, rigging, animation, rendering, and game asset creation. [Features](https://www.blender.org/features/) | Asset production and cleanup for the runtimes above |

## 2D: Establish the core loop before completing the art

1. **Plan:** write a one-page specification for input, state, feedback, and end conditions. Define one minimal level and a reproducible action sequence.
2. **Code:** use placeholders to complete the loop from start to play, success or failure, and retry. Separate game state, input, and visual updates. Have the agent implement one verifiable mechanic before expanding the levels.
3. **Assets:** fix the canvas, frame dimensions, action names, frame rates, directions, and foot anchors. Preserve source images, processing scripts, and import configuration. A sprite sheet that looks correct is only part of the deliverable.
4. **Scene:** configure collision layers, tile sizes, camera bounds, UI safe areas, volume, and input hints. Check scaling, pausing, switching away from the window, and restarting.
5. **Test and ship:** gather evidence by the layers below. Finally, run the full loop in an actual target-platform build, with launch instructions, controls, and known issues included.

## 3D: Complete a graybox, then establish the asset pipeline

1. **Plan:** fix the camera, character controls, scale, reachable level area, and target-device budget.
2. **Code and graybox:** use blocks and capsules to complete movement, collision, interaction, objectives, and retry. Check ramps, steps, edges, and fast movement.
3. **Assets:** take generated or sourced assets through cleanup, UV/material work, rigging, animation, collision, and LOD. Record source files, exports, and import presets for each asset.
4. **Scene:** check spawn points, camera obstruction, navigation, lighting, occlusion culling, and asset loading. Replace the graybox after these checks so visual changes do not also alter gameplay decisions.
5. **Test and ship:** collect frame-time and loading measurements on target hardware. Check asset reimport and clean-environment builds to confirm the editor demo can become a distributable result.

These steps are GameMap engineering recommendations. They do not require one agent to fill every role. Coding agents, asset tools, and playtesting agents should share files and task contracts.

## Write a task contract for the agent

Every task should define **inputs, outputs, and runnable acceptance criteria**. For example: "Inputs are the version-locked project, player collider, test level, and control table. Outputs are a double-jump mechanic, parameter documentation, and runtime logs. Acceptance: landing restores two jumps; a third button press in midair does not jump; retrying after death resets state." Also identify allowed files, dependency versions, run commands, and interfaces that must be preserved.

Asset tasks need the same clarity: "Deliver an eight-frame run animation as transparent PNGs, with identical frame dimensions, one foot anchor, and atlas metadata. Acceptance: the loop has no visible positional jitter in the engine, and edges have no black or white halos." Screenshots demonstrate results; project files and action records support reproduction. When acceptance fails, preserve inputs, logs, and the smallest failing scene so the agent can fix a specific problem.

## Information often lost during import

- **Sprites:** check slice boundaries, pivots, pixel-to-unit scale, alpha, filtering, and compression together. Preview at smaller and larger scales and confirm consistent anchors across adjacent frames. Unity import settings control pivot, Pixels Per Unit, and alpha separately; a transparent PNG does not establish correct import. [Sprite settings](https://docs.unity.com/en-us/engine/6000.0/manual/materials-and-shaders/textures/textures-reference/texture-type-sprite)
- **Mesh scale and axes:** use a reference object of known dimensions and record forward direction, up axis, coordinate handedness, and transforms. Godot uses right-handed Y-up coordinates; UE uses left-handed Z-up coordinates. Copying values does not preserve direction automatically. [Godot export conventions](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/model_export_considerations.html), [UE coordinates](https://dev.epicgames.com/documentation/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)
- **Topology and collision:** check normals, triangulation, UVs, and material slots. Validate render meshes and collision meshes separately. Godot recommends primitive shapes for dynamic objects and concave triangle meshes for static objects. Complex visible geometry does not require equally complex colliders. [Collision documentation](https://docs.godotengine.org/en/stable/tutorials/physics/collision_shapes_3d.html)
- **Rigs and animation:** check rest pose, bone names, weights, clip boundaries, loop seams, and root motion. Specify whether the controller or animation drives movement to avoid applying displacement twice. Unity applies root transforms to the GameObject at runtime. [Root Motion](https://docs.unity.com/en-us/engine/6000.3/manual/animation-section/animation-mecanim/avatar-creationand-setup/root-motion)
- **LOD and reimport:** check transition distances, silhouettes, material references, and preserved animation, and retain import configuration. Godot's advanced import settings separately control mesh LOD, physics, and animation resources. Reimport may also affect material associations. [Advanced import](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/advanced_import_settings.html)

## Testing needs several kinds of evidence

| Layer | Evidence needed | What it still does not establish |
| --- | --- | --- |
| Build | Successful compilation, dependencies, resource paths, and packaging | Correct gameplay or reachable content |
| Function | Reproducible checks for state, collision, win/loss, saves, and retry | Visual clarity or satisfying controls |
| Visual | Screenshots at fixed viewports/cameras, checked for occlusion, typography, anchors, and materials | Completion or enjoyment |
| Playability | A human or agent reaches the objective, recording blockers, failures, and completion routes | Performance on untested devices |
| Runtime performance | Frame times, loading, and memory on specified devices, resolutions, and scenes | Passing performance on every device |

These are GameMap editorial recommendations. Set budgets per project, report averages and stutter distributions, and avoid showing only the best frame. Browser 3D also needs a distinction between CSS size and drawing-buffer resolution: increasing pixel ratio without a budget increases rendering load. [Three.js responsive rendering](https://threejs.org/manual/pages/responsive.html)

## Where world models fit

**Code worlds** use executable programs to maintain state and transitions, supporting rule validation and planning. WorldCoder and GIF-MCTS/CWMB are foundational references. [WorldCoder](https://arxiv.org/abs/2402.12275), [GIF-MCTS](https://arxiv.org/abs/2405.15383)

**Hybrid rendering** lets an engine execute rules and passes structure to a video model. SolarRenderer accepts structural video, an optional first frame, and prompts. StreamRender-H3 uses a three.js engine to maintain racing state. Evaluate control adherence, identity consistency, and input-to-display latency. Few-step sampling alone does not establish real-time performance on arbitrary GPUs. [SolarRenderer](https://enderfga.cn/SolarRenderer/), [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)

**Neural simulation**, including GameNGen and Oasis, predicts frames from actions and visual history. **Explicit 3D scene systems**, including WonderWorld and Marble, generate spatial representations or exportable assets. The former need long-term state checks; the latter still need gameplay systems. Image quality alone does not establish completed game development. [GameNGen](https://arxiv.org/abs/2408.14837), [Oasis limitations](https://oasis-model.github.io/), [Marble exports](https://www.worldlabs.ai/blog/marble-world-model)

For reproduction, record the code commit, base model, weights, dataset version, inputs, seed, precision, GPU count/model/memory, and measurement scope. Official StreamRender-H3 deployment figures use eight GB200 GPUs. Public CWM / World Brain materials cover only inference, LoRAs, and proxy examples; the complete underlying proxy-generation code cannot be redistributed. Keep these conditions when comparing throughput, time to first frame, and interaction latency. [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/), [CWM reproduction scope](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

See the [world model research notes](world-model-notes.md) for detailed reading routes, release status, and terminology.
