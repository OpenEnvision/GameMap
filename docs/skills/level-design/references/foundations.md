# Foundations, Pre-production, Research, Worldbuilding, and Scope

Sources: [What is level design](https://book.leveldesignbook.com/introduction), [How to make a level](https://book.leveldesignbook.com/process/overview), [Pre-production](https://book.leveldesignbook.com/process/preproduction), [Pacing](https://book.leveldesignbook.com/process/preproduction/pacing), [Research](https://book.leveldesignbook.com/process/preproduction/research), [Worldbuilding](https://book.leveldesignbook.com/process/preproduction/worldbuilding), [Scope](https://book.leveldesignbook.com/process/preproduction/scope). Adapted and reorganized under CC BY-NC-SA 4.0.

## 1. Decide what is being designed

Level design arranges activities and space in relation to mechanics, art, code, narrative, sound, and players' cultural knowledge. Systems establish possible actions; levels put those actions into situations. These responsibilities overlap, especially in small teams.

Do not restrict the discipline to shooter rooms and corridors. Genre, tools, production history, and division of labor change what a “level” is and what a designer can control.

A useful process can begin with an interesting situation, jump into a prototype, reveal a missing mechanic, and return to research. Pre-production reduces expensive uncertainty; it does not prohibit making things.

## 2. Minimal pre-production

Answer:
- What does the player currently know, possess, and know how to do?
- What should they do, understand, or feel here?
- Which playable spatial relationship expresses that intent?
- How does play begin, end, fail, and restart?
- Which constraints are fixed, and which are assumptions to test?

Pillars must support decisions. “Large, exciting, immersive” cannot decide whether a branch is necessary. “Keep the distant destination recognizable while repeatedly changing elevation” can inform routes, landmarks, and camera views.

Write enough to coordinate the next step. Add ownership, dependencies, and acceptance criteria when needed; a short solo exercise does not require a large design document.

## 3. Research relationships, not attractive surfaces

### Real-world reference

Collect plans, structure, dimensions, materials, circulation, purpose, and evidence of use. A photograph often hides how places connect; add plans or multiple viewpoints.

For a station, ask:
- Who arrives, transfers, works, resupplies, and evacuates?
- How are public, staff, service, and hazardous areas separated?
- What becomes a landmark, overlook, bottleneck, loop, or alternate approach?
- Which realistic restrictions need adaptation for the game?

### Game reference

Where possible, play, map, record, and inspect the level. A video suggests relationships but cannot establish control feel, exploration burden, or combat pressure.

Separate:
1. **Observation:** an enemy occupies a bridge; a side route returns to the entrance.
2. **Interpretation:** the enemy may attract attention; the return may reinforce spatial memory.
3. **Enabling rules:** camera, speed, damage, respawn, perception, and resources.
4. **Transfer test:** rebuild the relationship with the target game's actual mechanics.

Use moodboards to align atmosphere and visual intent. Use breakdowns to explain components and function. One does not replace the other.

## 4. Pacing: activity, order, and variation

A **beat** is a useful unit of activity or event, not necessarily a room. Combat, observation, movement, puzzles, resupply, anticipation, and quiet can all be beats.

Define activities before assigning dimensions and durations. A large space need not be intense; a small corridor can be extremely tense.

### Cheap representations

- **Beat sheet:** sequence, activity, player knowledge, resources, intensity, transition, and test question.
- **Flowchart:** branches, conditions, loops, and skippable events.
- **Intensity graph:** intended rhythm, not measured player emotion.

A **set piece** coordinates several disciplines around a distinctive event. Identify scripting, art, animation, audio, camera, and performance dependencies before committing to expensive spectacle.

### Useful patterns, not requirements

- Collect worthwhile beats first; their order can emerge through arrangement and testing.
- **Teach–test–twist:** introduce a relationship legibly, test understanding, then change conditions. A twist is not merely more enemies or health.
- Alternate demands to allow recovery, interpretation, and anticipation. Continuous maximum intensity can become fatigue rather than escalation.
- A climax can resolve an emotional, thematic, or conceptual question; it need not be the numerically hardest fight.

### Nonlinear and multiplayer pacing

Players may encounter beats in different orders. Work with local sequences, repeatable patterns, resource cycles, changing objectives, and player-generated events rather than one guaranteed curve.

Include travel, discovery, interruption, and optional detours in open-world pacing. Do not remove autonomy just to preserve a diagram.

### When not to “fix the pacing”

Pacing is an analytical lens, not a universal dramatic formula. Wandering, awkwardness, interruption, stillness, or refusal of a climax can be intentional. Establish the work's purpose before prescribing conventional escalation.

## 5. Worldbuilding that supports space

**Problem:** extensive lore does not necessarily produce playable relationships.

**Example:** a castle has a detailed royal genealogy, but no plausible guard circulation, supply route, service entrance, or reason for a climbable wall.

**Response:** start with who uses the place, what they do, what changed, and how those facts become routes, objects, affordances, and evidence.

- **Minimal worldbuilding:** location, inhabitants, routine activities, conflict, and recent events.
- **Comprehensive worldbuilding:** geography/climate maps, political maps, timelines, and organized notes when the project needs them.
- Prefer relationships the player can observe, infer, or act on over encyclopedia entries.
- Leave room to revise fiction as mechanics, blockout, playtests, and art develop.
- A world can express ideas through recurring spatial and visual relationships; exposition is not the only channel.

## 6. Scope production cost, not only square footage

Account for:
- Spaces and traversal.
- Unique mechanics, enemies, scripts, and interactions.
- Assets, performances, audio, lighting, and optimization.
- Testing, rework, packaging, and presentation.

A **vertical slice** carries a representative portion through the necessary production disciplines. It exposes dependencies and costs; it is neither the first graybox by definition nor a promise of linear cost extrapolation.

Distinguish:
- **Must preserve:** the smallest version expressing the core relationship.
- **Substitutable:** content that can use an existing system or asset.
- **Optional/cuttable:** expensive novelty that does not support the goal.

Cut a costly weakly justified feature before uniformly degrading the entire level.

## Suggested deliverable

One-page brief, the cheapest useful structural representation, one high-risk hypothesis, and the next playtest question. Add documentation when it improves a concrete decision or coordination problem.
