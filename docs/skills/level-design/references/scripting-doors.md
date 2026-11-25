# Scripting, Navigation, and Doors

Sources: [Scripting](https://book.leveldesignbook.com/process/scripting), [(stub) Navigation](https://book.leveldesignbook.com/process/scripting/nav), [Doors](https://book.leveldesignbook.com/process/scripting/doors). Adapted and reorganized under CC BY-NC-SA 4.0. The navigation source is a stub; the implementation checks below are explicitly practical extensions, not a completed navigation chapter from the book.

## 1. Describe behavior before choosing syntax

**Level scripting** coordinates local events, interactions, objectives, enemies, and world changes. It may use code, visual graphs, entity connections, timelines, or editor properties.

Begin with a readable behavior:

- **Condition:** what makes something eligible?
- **Event:** what causes an attempt?
- **Action:** what changes?
- **Feedback:** what can the player perceive?
- **Persistence:** what remains true afterward?
- **Recovery:** what happens after interruption, failure, or re-entry?

Example: “After the player enters the courtyard, close the gate once, announce the ambush, and unlock the exit after all required enemies are defeated.” This still leaves crucial questions: what if enemies cannot reach the player, the player leaves before closure, or a save is loaded halfway through?

Do not hide missing design decisions inside a large visual graph.

## 2. Prototype with the project's existing tools

Inspect available trigger types, interaction events, entity targeting, state storage, debugging, and reset methods before adding a new abstraction.

- Keep a small test map or scene for uncertain behaviors.
- Use clear names and inspectable connections.
- Make timing and dependencies visible enough to debug.
- Prefer a simple local mechanism over a project-wide system for a one-off problem.
- Conversely, repeated behavior may justify a shared component once its requirements are known.

“Visual scripting” does not mean no programming concepts are involved. State, sequencing, conditions, dependencies, and ownership still matter.

## 3. Practical state specification

This table is an adaptation for robust implementation:

| State              | Entry condition               | Behavior                  | Exit condition        | Re-entry/save behavior           |
| ------------------ | ----------------------------- | ------------------------- | --------------------- | -------------------------------- |
| Available          | Preconditions satisfied       | Advertise interaction     | Player activates      | Restore availability             |
| Active             | Activation accepted           | Run encounter/event       | Completion or failure | Restore or intentionally restart |
| Completed          | Required condition true       | Open route / grant result | Usually persistent    | Do not duplicate rewards/events  |
| Failed/interrupted | Defined exceptional condition | Recover, reset, or report | Recovery rule         | Avoid progress loss or softlock  |

Use only the states the behavior needs. A decorative light switch does not require an encounter framework.

Distinguish:

- A trigger firing from an action completing.
- An event occurring once from a state remaining true.
- A delay from a condition that might never become true.
- Local entity state from global mission state.
- An animation reaching its end from the player having a usable route.

## 4. Triggers and encounter sequencing

Test:

- Entering, leaving, and re-entering.
- Crossing at high speed or from an unexpected direction.
- Activating twice, including during transitions.
- Enemies dying, despawning, or falling out of the level.
- Player death, reload, restart, and abandonment.
- Optional routes bypassing the trigger.
- More than one relevant actor entering, where supported.

If progress depends on enemy completion, define which enemies count and what happens when one is unreachable. Do not let an invisible counter silently become a permanent lock.

Use feedback to explain a meaningful state change. Sound, movement, light, objective updates, and visible geometry can communicate different aspects; avoid requiring the player to infer an invisible flag.

## 5. Navigation: distinguish the layers

- **Wayfinding:** the player's understanding of where to go.
- **Traversability:** what geometry and movement rules permit.
- **AI navigation:** how agents represent and follow routes.
- **Scripting:** when paths, targets, or behaviors become available.

A visible route can be mechanically blocked. A valid navigation mesh can still lead to poor encounter behavior.

Because the book's navigation page is incomplete, use the target engine's documentation for actual APIs, agent settings, dynamic updates, links, and debugging.

Practical checks:

- Correct agent dimensions and clearance.
- Stairs, slopes, narrow gaps, drops, and special traversal.
- Door transitions and dynamically blocked routes.
- Pursuit, retreat, crowding, and unreachable targets.
- Whether runtime changes update navigation as intended.

Do not claim that a navmesh rebuild occurred or an AI route succeeded unless it was actually observed.

## 6. Doors are a systems problem

A door intersects geometry, collision, animation, audio, input, AI, navigation, story, persistence, and possibly networking. A static mesh is only one part.

### Door brief

**Purpose**

- Gate progression, partition visibility, support stealth, punctuate pacing, or provide ordinary circulation?
- Is a working door necessary, or would an opening serve better?

**Interaction**

- Automatic, proximity, button, use action, key, or scripted?
- From either side?
- What tells the player it is usable, locked, or permanently decorative?
- What happens if interaction repeats during motion?

**Movement and collision**

- Swing, slide, rotate, break, or disappear?
- Which way does it open?
- Can it push, trap, obstruct, or injure actors?
- Can the player shoot, see, or hear through it at each state?
- Does the camera or carried object collide?

**Other actors**

- Can enemies open, close, block, break, or follow through?
- What happens to their navigation during motion?
- Can a companion become stranded?

**State**

- Separate locked/unlocked from open/closed and moving/stopped.
- Define destroyed, jammed, or disabled states only if supported.
- Specify respawn, save/load, and global quest changes.
- Preserve intentional per-door states when applying global events.

### Concrete failure trace

A quest locks all doors, then unlocks them all at completion. Previously locked doors are now unintentionally unlocked because the script applied a blanket condition rather than preserving each door's underlying lock state. Unlocking permits an opening action; it does not necessarily move the door or make the route traversable.

The source uses a Witcher 3 incident to illustrate this dependency. The general lesson is to distinguish a temporary override from the underlying state, and test restoration rather than assuming it.

### Keep a temporary quest lock separate

This adapted state example uses one temporary quest override. It is pseudocode for a behavior specification, not an engine API.

```text
is_locked():
  return base_locked or quest_lock

begin_quest():
  quest_lock = true

finish_quest():
  quest_lock = false

on_valid_key():
  base_locked = false

use():
  if is_locked(): show_locked_feedback(); return
  request_open()
```

Do not copy the effective lock back into the base state. A legitimate key interaction can change the base state while the quest override remains active; removing that override should reveal the current base state, not restore an outdated snapshot. If several systems can override a door, track their ownership separately before allowing one completion event to remove another system's lock.

| Door fixture            | Base lock before quest | Aperture before quest | After removing only the quest lock                    |
| ----------------------- | ---------------------- | --------------------- | ----------------------------------------------------- |
| A: ordinary passage     | Unlocked               | Closed                | Unlocked, still closed until an opening action        |
| B: key-required room    | Locked                 | Closed                | Still locked; quest completion did not supply its key |
| C: already-open passage | Unlocked               | Open                  | Still open; locking alone did not close it            |

Door C exposes a separate design requirement: if the quest must seal the route, request closure and define obstruction handling as well as locking. Confirm collision and, where used, AI navigation after the transition; a lock flag or completed animation is insufficient.

Save while the override is active, reload, and finish the quest. Check A, B, and C against the table. Repeat B with a valid key applied during the quest: it should remain locked by the override until quest completion, then be unlocked. Reload again after completion and verify that interaction does not repeat a reward or replay the quest. Record lock, aperture/motion, collision, and route availability separately so the failure identifies the layer that broke.

## 7. Validation matrix

For any consequential scripted object, cover relevant combinations:

- Initial state and after completion.
- Normal interaction and repeated interaction.
- Approaches from every legal side.
- Player death, reload, and restart.
- Route bypass and return.
- AI or companion involvement.
- Interrupted motion or event.
- Multiplayer authority and reconnection, if the game supports them.

This is a practical extension for implementation tasks. Do not require irrelevant systems or silently add multiplayer to a single-player project.

## Deliverable

A short behavior specification, ownership of state, feedback, a small set of meaningful transitions, and reproducible test cases. Supply implementation code only after inspecting the project's actual APIs and conventions.
