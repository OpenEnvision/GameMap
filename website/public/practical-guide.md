# From Resource Map to Runnable Game

Start with a small playable loop. Choose the target platform, set a concrete task for the agent, and check the result in the running game before expanding the project.

<a id="first-playable-loop"></a>

## First playable loop: a 15-minute browser exercise

Use a desktop browser and an existing plain-text editor. This tutorial needs no account, API key, package installation, game engine or external assets. The small starter below is tutorial code; it is separate from the creator-documented projects in Game examples.

### 1. Save and open the complete starter

Copy the whole code block into a plain-text file named **first-game.html**, then open that file in your browser. Keep the `.html` extension, not `.html.txt`. If your editor supports rich text, switch it to plain text before saving. You can open the saved file directly; a local server is not required.

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Three points — first game loop</title>
<style>
  body { margin: 24px auto; max-width: 680px; padding: 0 16px;
    font: 18px system-ui; background: #101827; color: #f5f7fb; }
  canvas { width: 100%; background: #19263b; border: 1px solid #64748b; }
  button { padding: 10px 18px; font: inherit; cursor: pointer; }
</style>
<h1>Three points</h1>
<p>Move with arrow keys or WASD. Collect all three orange points.</p>
<button id="start">Start</button>
<p id="readout">Press Start. You have 20 seconds.</p>
<canvas id="game" width="640" height="360" aria-label="Blue player and orange points"></canvas>
<script>
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const readout = document.querySelector('#readout');
const start = document.querySelector('#start');
const speed = 200, roundSeconds = 20;
const keys = new Set();
let player, points, remaining, state = 'ready', last = performance.now();
function reset() {
  player = { x: 50, y: 180 };
  points = [{ x: 200, y: 180 }, { x: 360, y: 110 }, { x: 520, y: 250 }];
  remaining = roundSeconds;
  keys.clear();
}
reset();
start.addEventListener('click', () => {
  reset(); state = 'playing'; start.textContent = 'Restart';
});
window.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
    event.preventDefault(); keys.add(key);
  }
});
window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05); last = now;
  if (state === 'playing') {
    let x = Number(keys.has('arrowright') || keys.has('d')) - Number(keys.has('arrowleft') || keys.has('a'));
    let y = Number(keys.has('arrowdown') || keys.has('s')) - Number(keys.has('arrowup') || keys.has('w'));
    const length = Math.hypot(x, y) || 1;
    player.x = Math.max(10, Math.min(630, player.x + x / length * speed * dt));
    player.y = Math.max(10, Math.min(350, player.y + y / length * speed * dt));
    for (const point of points)
      if (Math.hypot(player.x - point.x, player.y - point.y) < 21) point.taken = true;
    remaining = Math.max(0, remaining - dt);
    if (points.every(point => point.taken)) state = 'won';
    else if (remaining === 0) state = 'lost';
  }
  ctx.clearRect(0, 0, 640, 360);
  for (const point of points) if (!point.taken) {
    ctx.fillStyle = '#ff936a'; ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = '#8bcbff'; ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
  const score = points.filter(point => point.taken).length;
  if (state === 'playing') readout.textContent = `Score ${score}/3 · ${remaining.toFixed(1)}s`;
  if (state === 'won') readout.textContent = 'You win! Press Restart to play again.';
  if (state === 'lost') readout.textContent = 'Time is up. Press Restart to try again.';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
</script>
</html>
```

### 2. Check the original game before editing

Click **Start**. Move the blue square with the arrow keys or WASD; the orange points are collectible.

- **Win:** collect all three points before the 20-second timer expires. The result must say “You win!”.
- **Lose:** click Restart and leave the square still for 20 seconds. The result must say “Time is up.”.
- **Retry:** click Restart again. The square returns to the left, all three points reappear, and the next frame shows score 0/3 and a fresh timer.

If the page displays the HTML as text, check the file extension and plain-text format. If the square does not move, click the game page and check that the round has started. These checks establish a complete start → play → win/lose → retry loop, not a finished commercial game.

### 3. Make one change, with or without an agent

Ask your coding agent, or make this edit yourself:

> In first-game.html, change only the player speed from 200 to 140 pixels per second. Keep the controls, point locations, 20-second round and restart behavior unchanged. Explain the edited line and the manual checks to rerun. Do not add dependencies.

Save the file and reload the browser. The same route should take longer, while collecting all three points, timing out and restarting must still work. If a check fails, revert that single change and keep the failing action sequence for the next attempt. No coding-agent account is required to complete the exercise manually.

### 4. Choose the next project

Use [Game examples](/examples/) to choose a complete source project with controls and setup you understand. Use the [testing library](/testing/) to choose a test target. Record the browser, change, actions and observed result; then use the engine and production guidance below when your next task needs it.

## Define the deliverable before choosing tools

Specify the target platform, player actions, core loop, win/loss conditions, art direction, target hardware, and delivery format. A shippable game project, an action-controlled video experience, an importable scene asset, and a simulator for planning or training need different world representations and acceptance methods.

Choose around your team's experience, working templates, and target platform. Start with a project you can already run.

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
3. **Assets:** fix the canvas, frame dimensions, action names, frame rates, directions, and foot anchors. Preserve source images, processing scripts, and import configuration. A sprite sheet that looks correct is only part of the deliverable. The [sprite delivery contract](asset-validation-contracts.md#sprite-atlas-metadata-and-playback-delivery) explains trimmed offsets, duplicate/empty-frame dwell, pivots and explicit timebase conversion.
4. **Scene:** configure collision layers, tile sizes, camera bounds, UI safe areas, volume, and input hints. Check scaling, pausing, switching away from the window, and restarting. For authored tilemaps, preserve [tile identities, transforms and saved coordinates](asset-validation-contracts.md#tile-map-identity-geometry-and-runtime-delivery) before testing collision and traversal.
5. **Test and ship:** gather evidence by the layers below. Finally, run the full loop in an actual target-platform build, with launch instructions, controls, and known issues included.

## 3D: Complete a graybox, then establish the asset pipeline

1. **Plan:** fix the camera, character controls, scale, reachable level area, and target-device budget.
2. **Code and graybox:** use blocks and capsules to complete movement, collision, interaction, objectives, and retry. Check ramps, steps, edges, and fast movement.
3. **Assets:** take generated or sourced assets through cleanup, UV/material work, rigging, animation, collision, and LOD. Record source files, exports, and import presets for each asset.
4. **Scene:** check spawn points, camera obstruction, navigation, lighting, occlusion culling, and asset loading. Replace the graybox after these checks so visual changes do not also alter gameplay decisions.
5. **Test and ship:** collect frame-time and loading measurements on target hardware. Check asset reimport and clean-environment builds to confirm the editor demo can become a distributable result.

Give coding agents, asset tools, and playtesting agents shared files and task contracts so each can work on a specific part of the project.

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

Set budgets per project, report averages and stutter distributions, and avoid showing only the best frame. Browser 3D also needs a distinction between CSS size and drawing-buffer resolution: increasing pixel ratio without a budget increases rendering load. [Three.js responsive rendering](https://threejs.org/manual/pages/responsive.html)

## Where world models fit

**Code worlds** use executable programs to maintain state and transitions, supporting rule validation and planning. WorldCoder and GIF-MCTS/CWMB are foundational references. [WorldCoder](https://arxiv.org/abs/2402.12275), [GIF-MCTS](https://arxiv.org/abs/2405.15383)

**Hybrid rendering** lets an engine execute rules and passes structure to a video model. SolarRenderer accepts structural video, an optional first frame, and prompts. StreamRender-H3 uses a three.js engine to maintain racing state. Evaluate control adherence, identity consistency, and input-to-display latency. Few-step sampling alone does not establish real-time performance on arbitrary GPUs. [SolarRenderer](https://enderfga.cn/SolarRenderer/), [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/)

**Neural simulation**, including GameNGen and Oasis, predicts frames from actions and visual history. **Explicit 3D scene systems**, including WonderWorld and Marble, generate spatial representations or exportable assets. The former need long-term state checks; the latter still need gameplay systems. Image quality alone does not establish completed game development. [GameNGen](https://arxiv.org/abs/2408.14837), [Oasis limitations](https://oasis-model.github.io/), [Marble exports](https://www.worldlabs.ai/blog/marble-world-model)

For reproduction, record the code commit, base model, weights, dataset version, inputs, seed, precision, GPU count/model/memory, and measurement scope. Official StreamRender-H3 deployment figures use eight GB200 GPUs. Public CWM / World Brain materials cover only inference, LoRAs, and proxy examples; the complete underlying proxy-generation code cannot be redistributed. Keep these conditions when comparing throughput, time to first frame, and interaction latency. [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/), [CWM reproduction scope](https://github.com/buaacyw/code-world-model/blob/main/ENVIRONMENT.md)

See the [world model research notes](./world-model-notes.md) for detailed reading routes, release status, and terminology.

## Detailed production research

For source-scoped completion, failure, recovery, licensing and evaluation constraints, see the [production research dossiers](research-index.md). The notes distinguish documented interfaces, proposed acceptance fixtures and actual reproduction.
