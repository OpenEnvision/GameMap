# Layout, Flow, Verticality, Critical Paths, and Gates

Sources: [Layout](https://book.leveldesignbook.com/process/layout), [Flow](https://book.leveldesignbook.com/process/layout/flow), [Circulation](https://book.leveldesignbook.com/process/layout/flow/circulation), [Verticality](https://book.leveldesignbook.com/process/layout/flow/verticality), [Critical path](https://book.leveldesignbook.com/process/layout/criticalpath), [Parti](https://book.leveldesignbook.com/process/layout/parti), [Typology](https://book.leveldesignbook.com/process/layout/typology), [Gates](https://book.leveldesignbook.com/process/layout/typology/gates). Adapted and reorganized under CC BY-NC-SA 4.0.

## 1. A layout describes relationships

“Layout” can mean the level's structure or a drawing of it. The drawing supports discussion of connections, activities, and constraints; it is not proof that a 3D experience will work.

Start with a node graph when relationships are uncertain:

- Nodes represent activities, important places, or spatial states.
- Edges indicate direction, prerequisites, and travel costs.
- Mark starts, goals, required progression, branches, returns, and exits.

Move to plans and sections when dimensions matter:

- Annotate elevation, slopes, stairs, drops, bridges, and tunnels.
- Distinguish sightlines from traversable connections.
- Distinguish one-way drops, two-way passages, and unlockable shortcuts.
- Record entrance orientation and important views; players do not always face the top of the drawing.

A **parti** is a concise diagram of the organizing spatial idea, not a full floor plan. The source page is brief; do not attribute an elaborate methodology to it.

## 2. Flow and circulation

**Flow** concerns movement, attention, combat, and activity over time. **Circulation** focuses on how routes and connections support movement. A smooth line on a plan cannot establish either.

At each transition, ask:

- Why come here, and what motivates the next action?
- Does the passage support movement, turning, camera behavior, and relevant combat?
- Are exits exposed at a useful moment?
- Is this a meaningful pause or an informationless stall?
- Does it work in reverse, during a retry, in a chase, or with several players?

### Working pattern vocabulary

| Pattern                   | Useful for                                     | Typical risk                                    |
| ------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| Linear sequence           | Clear introductions and coordinated events     | Monotony or unchanged return trips              |
| Branch and reconverge     | Local choice with bounded production cost      | Cosmetic choice or missed essential information |
| Loop                      | Reuse, recognition, pursuit, and flanking      | Directionless cycling                           |
| Hub and spokes            | Multiple goals and a recognizable return point | Repetitive commuting                            |
| Network                   | Multiplayer rotation and multiple solutions    | Cognitive overload or one dominant route        |
| Shortcut / one-way return | Lower retry cost and spatial revelation        | Unrecognized connection or softlock             |

This is a working synthesis, not a source-mandated six-category classification.

## 3. Make verticality change a relationship

More floors are not automatically better. Height can:

- Change sightlines, exposure, range, and combat priorities.
- Establish overlooks, concealment, landmarks, and future destinations.
- Create one-way transitions or return a branch to familiar ground.
- Overlap spaces and reveal connections a flat route could not.

Costs include floor recognition, camera control, aiming angles, fall recovery, AI navigation, and accessibility of transitions.

Check:

1. Is the upper/lower space noticeable from the entrance camera?
2. Is visible space reachable? If not, does it falsely advertise a route?
3. Where can players change elevation, and at what cost?
4. Can they recover from a drop? Does retry cost fit the intended experience?
5. What offsets a strong high position: access cost, exposure, resources, flank routes, or poor escape?

## 4. Critical path is not the only “correct” route

A **critical path** identifies core progression required for completion. It helps account for prerequisites, essential information, resources, timing, and retries. It does not require every mandatory destination to be constantly highlighted.

- Identify required actions and actual dependencies, not merely a favorite route.
- Separate first traversal, return traversal, and traversal after shortcuts open.
- Give branches a function: reward, information, practice, pacing change, or world understanding.
- Exploration may deliberately obscure the route. Test whether players understand what they are investigating rather than whether they immediately follow the intended line.
- For multiplayer, systemic, and open-world levels, use objective networks, major rotations, or local tasks when a single path is misleading.

The designer knowing the solution is not evidence that a first-time player can infer it.

## 5. Typology: borrow recognizable spatial organization

**Typology** considers recurring spatial types: homes, offices, courtyards, fortifications, shops, and so on.

Use it by:

1. Investigating purpose, users, public/private relationships, and circulation.
2. Identifying conventions the audience may recognize.
3. Adapting connections, clearances, entries, sightlines, and height to the mechanics.
4. Keeping enough recognizable structure without sacrificing control or readability.

Do not confuse architectural style with functional organization. A type is not a timeless template independent of location, history, or social relations.

## 6. Gates make access conditional

- **Hard gate:** passage requires a key, switch, ability, or state.
- **Soft gate:** passage is possible but discouraged by risk, skill, danger, or resource cost.
- **Shortcut:** commonly unlocked from the far side to reduce future traversal and retry costs.

Specify:

- What is blocked, and why?
- Where is the blocked state communicated?
- What unlocks it, and how can that condition be understood?
- What happens on failure, repeated interaction, leaving, and returning?
- How does unlocking affect routes, pacing, enemies, and saved state?

A lock requiring several keys should make the count legible, rather than making players repeatedly guess what remains.

A soft gate is not simply an overwhelmingly strong enemy. Test whether players can assess risk, retreat, and understand what might make a future attempt different.

### Trace a lock-and-return layout through its states

This adapted relay-station example separates a route drawing from the conditions that make its edges usable. Letters are designer labels, not signs the player must see.

```text
          B: battery ----- R: latch
          |                :
          C: gallery       :
          |                :
S: start--J: junction -----G: socket--E: exit
```

All solid connections are two-way, except G–E is blocked until power is restored. The dotted R–G shortcut begins closed and can only be opened by operating R from the B side. Once opened, it works both ways. The long return B–C–J–G stays available.

Build the R connection to reduce actual return travel, then time both routes with the same controller. The diagram shows connections, not distances. If the R route does not save travel, change its geometry or describe it as an alternative rather than claiming it is shorter.

| Action / state                          | Available progression                                     | Check before building more rooms                                    |
| --------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| Start: battery at B; shortcut closed    | S–J–G reveals the empty socket; J–C–B reaches the battery | The player can leave G without a battery                            |
| Pick up battery: carried                | Return through C, or approach R from B                    | Picking up the battery does not close the long return               |
| Use latch from B: shortcut open         | B–R–G becomes a shorter return                            | From G before opening, the player cannot operate the far-side latch |
| Install carried battery at G: installed | G–E becomes traversable                                   | Repeated interaction neither consumes another battery nor relocks E |
| Reset                                   | Battery returns to B; shortcut and exit close             | Player returns to S with no carried battery                         |

Walk the graph once without using R and once using it. Then try R before taking the battery, revisit G empty-handed, and reset after opening the shortcut. For each case, write the next legal action; “wait for the script” is not a recovery rule. The battery's location or carried/installed state and the shortcut state must survive any supported save/load.

A graph can expose a missing return edge, but it cannot establish that the controller fits, the latch is in reach, or the opening reads correctly. Test those in the blockout. If an AI tool checks the graph, give it the gate conditions as well as the edges; passing an unconstrained connectivity check would miss the locked-exit problem.

## Layout walkthrough

Traverse the main route, reverse it, explore branches, then repeat using respawns and shortcuts. Record:

- Location, goal, visible exits, and available abilities.
- What attracts or repels attention and movement.
- Travel, waiting, and combat costs.
- Exact confusion points and dominant-route incentives.

Take the drawing into a playable blockout. A tidy overhead plan is not acceptance evidence.
