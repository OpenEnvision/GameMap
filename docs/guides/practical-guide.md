# Make a one-room Godot prototype

Build **Fuse Courier**. Pick up three fuses and get through the exit before the patrol or the timer gets you. For the first pass, use blocks and a counter. If the loop is still unclear with those, you can change it in minutes.

The HoloVista team describes going from a well-received five-minute prototype to a more expensive build where players missed the choices they were making. Their [postmortem](https://www.gamedeveloper.com/design/postmortem-aconites-holovista) makes the case for a cheap intermediate build. For this exercise, spend that pass on the room, the exit, and retry. Pick up sprites and animations after someone can play a complete round.

## 1. Establish a working starting point

Use the [Godot official demos entry](/testing/godot-demos/) to select a branch compatible with your installed editor. Copy the GDScript [Dodge the Creeps project](https://github.com/godotengine/godot-demo-projects/tree/master/2d/dodge_the_creeps), retaining its notices. On GitHub, switch the demo repository to the branch matching your stable Godot editor before downloading `2d/dodge_the_creeps`. The `master` branch tracks the development editor. The demo gives you a moving player, enemies, and a start/retry flow. The [official first-game tutorial](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html) explains the original project if those pieces are unfamiliar.

Import its `project.godot`, run the main scene, start a round, move, collide with an enemy and start again. Record the editor version, source commit, actual launch procedure and first error-free baseline in `evidence/README.md`. Resolve import or launch failures before changing gameplay. Target a keyboard-controlled desktop build for this exercise; choose an additional export platform after this build works.

An existing coding client can edit the files while you operate Godot. If you need editor automation, the [Godot Forge bridge entry](/agents/godot-forge-editor-bridge/) documents its editor/runtime separation and requirements. Establish the connection against the unchanged project first.

## 2. Copy the exercise brief

Save these decisions in `BRIEF.md`. The dimensions, positions and time limit below are design choices for this exercise.

| Item | Specification |
| --- | --- |
| View | Fixed 960 × 640 room; keep the player's collision bounds inside it |
| Layout | Player at (96, 540); fuses at (160, 160), (480, 320), (800, 160); exit at (864, 540) |
| Hazard | One patrol moving between (240, 320) and (720, 320); fixed speed and starting direction |
| Objective | Each fuse counts once; collecting the third unlocks the exit; entering the unlocked exit wins |
| Failure | Hazard contact or the 45-second countdown reaching zero loses the round |
| Pause | Freeze player, patrol and countdown; keep pause/resume controls available |
| Retry | Restore player/patrol positions and collisions, patrol direction, all fuses, count, exit lock, timer and pause state |
| Delivery | Editable project, desktop build, controls, asset-source list and recorded acceptance results |

In Project Settings → Input Map, create these Actions and use their names in scripts. Let the HUD handle pause/resume so the input remains available while gameplay is paused.

| Action | Binding |
| --- | --- |
| `move_left` | A / Left arrow |
| `move_right` | D / Right arrow |
| `move_up` | W / Up arrow |
| `move_down` | S / Down arrow |
| `start_retry` | Enter; accepted only before a round or after a result |
| `pause` | Escape; toggles a running round between playing and paused |

## 3. Build the scene and wire the interactions

Adapt the existing player and HUD rather than adding a second controller. Keep `main.tscn`, `main.gd`, `player.tscn` and `player.gd`; add `pickup.tscn` / `pickup.gd`, `exit.tscn` / `exit.gd`, and `hazard.tscn` / `hazard.gd`. Use this target tree; instantiate the pickup scene three times, with distinct IDs.

```text
Main (Node; main.gd)
├── Player (Area2D; player.tscn)
│   ├── AnimatedSprite2D
│   └── CollisionShape2D
├── Fuses (Node2D)
│   ├── Fuse01 (Area2D; pickup.tscn)
│   ├── Fuse02 (Area2D; pickup.tscn)
│   └── Fuse03 (Area2D; pickup.tscn)
├── Exit (Area2D; exit.tscn)
├── Hazard (Area2D; hazard.tscn)
├── RoundTimer (Timer)
└── HUD (CanvasLayer; hud.tscn)
    ├── FuseCount (Label)
    ├── TimeLeft (Label)
    ├── Result (Label)
    ├── StartRetry (Button)
    └── PauseResume (Button)
```

Give each pickup, the exit and hazard a visual child and a collision shape. Put the player on collision layer 1; let those interaction areas monitor layer 1 and accept only the player. Because this player is an area, connect their `area_entered` signals, not a body-only signal. [Godot's Area2D reference](https://docs.godotengine.org/en/stable/classes/class_area2d.html) documents the signal and monitoring requirement. Connect signals once during setup.

Keep round state and collected IDs in the main script. Initialize the state to `READY` with the timer stopped. A pickup reports its ID; the main script validates it, updates the count and hides the pickup. The exit requests completion; it does not maintain another fuse counter. Disable the demo's random mob spawning when replacing it with the single patrol.

Set `RoundTimer` to one-shot, 45 seconds, autostart off. Start it on playing; connect expiry to losing. Display its remaining time. Remove the demo's old score/spawn timer connections. See the [Timer reference](https://docs.godotengine.org/en/stable/classes/class_timer.html).

Implement the following **pseudocode contract**, adapting it to the actual scripts and signal signatures:

```text
start_or_retry:
  if state not in [READY, WON, LOST]: return
  unpause_world()
  collected_ids.clear()
  restore_player_hazard_and_fuses()
  exit_unlocked = false
  reset_round_timer(45)
  state = PLAYING
  start_round_timer()

pickup(id):
  if state != PLAYING or id in collected_ids: return
  collected_ids.add(id)
  hide_fuse(id)
  exit_unlocked = (size(collected_ids) == 3)

exit_entered:
  if state == PLAYING and exit_unlocked: finish(WON)

pause_or_resume:
  if state == PLAYING: state = PAUSED; freeze_world()
  else if state == PAUSED: state = PLAYING; resume_world()

finish(result):
  if state != PLAYING: return
  state = result
  stop_round_timer_and_hazard()
```

Route hazard contact and countdown expiry to the loss transition. Move the player only while playing, and use one shared speed for all directions with normalized movement. Set `SceneTree.paused` to pause/resume, with gameplay nodes pausable and the HUD Always; handle pause input there. Godot's [pause documentation](https://docs.godotengine.org/en/stable/tutorials/scripting/pausing_games.html) explains process modes and why signals may still run while processing is stopped. Keep state guards in signal handlers.

## 4. Give the agent one pass at a time

Use the table as a task queue. Save a working checkpoint after each passing row.

| Pass | Deliverable | Run before continuing |
| --- | --- | --- |
| Room | Fixed layout, input bindings and player movement | Visit every corner; diagonal speed matches straight movement |
| Objective | Three uniquely identified pickups, count and locked exit | Re-enter one pickup area; count stays unchanged; two fuses cannot win |
| Round | Patrol, countdown, result and retry | Lose by both causes; retry restores every item in the brief |
| Pause | Pause indicator and working resume | Wait while paused; position and remaining time stay unchanged |
| Presentation | One replacement sprite set, readable HUD and feedback | Re-run objective and retry checks with the same layout |
| Package | Desktop export and launch instructions | Run from a new directory and complete win, loss and retry routes |

Copy this bounded first task into your agent session after creating the target scenes:

> Read `BRIEF.md`, `main.tscn`, `main.gd`, `pickup.tscn` and `pickup.gd`. Implement only pickup collection and exit unlocking. Keep player movement and the layout unchanged. Report the actual node paths and signal connections before editing. Use one collected-ID set in the main script, reject duplicate IDs, and unlock the exit only at three. Return changed files, launch steps and results for duplicate pickup, early exit and all-three collection. If you cannot run Godot, mark those checks pending and give the exact steps for me to run.

For later parallel work, assign separate files and agree on signals first. The [agent-team Tetris case](/examples/claude-agent-team-tetris/) provides a real build account of dividing rules, rendering and controls.

## 5. Add assets while preserving the loop

Choose one small pack through the [Kenney testing entry](/testing/kenney/). Record the downloaded pack and its included license in `ASSET_SOURCES.md`. Replace visuals first while keeping collision sizes, pickup positions and movement speed fixed.

For an animated replacement, specify frame dimensions, frame order, durations and one stable anchor. Preview the loop standing still, moving and turning; inspect edges and alignment at the game's actual scale. Retain the editable source and import settings. Use the [sprite delivery contract](../assets/validation.md#sprite-atlas-metadata-and-playback-delivery) when trimming or packing frames, and the [tile-map contract](../assets/validation.md#tile-map-identity-geometry-and-runtime-delivery) if you later replace the room with a tilemap.

## 6. Check failures and deliver a reproducible build

Keep one route that reaches all three fuses and the exit. Also test early exit, duplicate collection, hazard contact, timeout, pause/resume and three consecutive retries. Log starting state, actions, expected result and observed result; a screenshot alone cannot demonstrate a timer freezing or a complete retry. The [testing library](../reference/testing-library.md) supplies suitable projects and asset fixtures for extending these checks.

| Symptom | Inspect first | Smallest useful reproduction |
| --- | --- | --- |
| Pickup does nothing | Player layer, area mask, monitoring and signal target | Player plus one pickup, with entry logging |
| Count jumps or retry gets faster | Duplicate signal connections, timers or patrol instances | One pickup and two retries; log IDs and node counts |
| Exit wins too early | Separate counters or missing round-state guard | Two pickups and one exit |
| Resume never responds | HUD process mode and where pause input is handled | Player, timer and pause button only |
| Export differs from editor | First error, missing resources, import settings and paths | Fresh export in a new directory with the same test route |

When a pass fails, revert to its preceding checkpoint and change one variable. Disable the patrol while debugging pickups; restore it after that check passes. For another room in 2D, borrow the route sketch and observation method from the [level-design guide](level-design.md). Its relay-station exercise is a separate 3D project with a walking controller. Package the project, build, controls, source list and evidence together, and have another person follow the launch instructions. Before handing out a public build, use the [release candidate checks](../production/release-readiness.md) to test installation on a clean target profile.

If your intended deliverable is an action-conditioned video experience or a learned simulator, use the separate [world-model route](../ecosystem/world-models.md). Continue this route for an editable game whose rules execute in an engine.
