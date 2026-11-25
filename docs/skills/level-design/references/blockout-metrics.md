# Blockout, Massing, Landscape, Composition, and Metrics

Sources: [Blockout](https://book.leveldesignbook.com/process/blockout), [Massing](https://book.leveldesignbook.com/process/blockout/massing), [Landscape](https://book.leveldesignbook.com/process/blockout/massing/landscape), [Composition](https://book.leveldesignbook.com/process/blockout/massing/composition), [Prospect-refuge](https://book.leveldesignbook.com/process/blockout/massing/prospect-refuge), [Metrics](https://book.leveldesignbook.com/process/blockout/metrics), [Modular kit design](https://book.leveldesignbook.com/process/blockout/metrics/modular), [Doom metrics](https://book.leveldesignbook.com/process/blockout/metrics/doom), [Quake metrics](https://book.leveldesignbook.com/process/blockout/metrics/quake). Adapted and reorganized under CC BY-NC-SA 4.0.

## 1. Make a spatial hypothesis cheap to change

A **blockout**, **blockmesh**, or **graybox** is a playable rough draft made from inexpensive shapes. Its purpose is to test foundational relationships before detail makes revision costly.

It must contain what the question depends on:

- Representative player movement, camera, collision, and interaction.
- Important height changes, views, route connections, and boundaries.
- Necessary enemy behavior, objectives, and provisional script events.
- Enough lighting and distinction to understand the intended information.

It need not be uniformly gray. Temporary colors, labels, props, or sounds are appropriate if they convey information essential to testing. Conversely, polished assets do not establish that a blockout works.

### A useful iteration loop

1. Choose one uncertainty: “Can players identify the lower flank before committing?”
2. Build the smallest connected situation that contains it.
3. Play in the actual controller, not only the editor camera.
4. Observe behavior and distinguish spatial failure from missing rules or information.
5. Revise and repeat; preserve cheap editability until the relationship is credible.

Do not build an entire campaign before validating its repeated spatial grammar.

## 2. Massing: organize solid and empty volumes

**Massing** concerns the arrangement, scale, and relationships of large forms. Design the spaces between masses as deliberately as the masses themselves.

Work from:

- Major ground levels and broad volumes.
- Important openings, thresholds, and connections.
- Sightline blockers, overlooks, and distinct silhouettes.
- Smaller supporting shapes only after the larger relationships work.

Ask whether the player can distinguish foreground, accessible middle distance, distant destination, and nonplayable background. A large decorative form can accidentally suggest an inaccessible route.

**Example:** a courtyard is visually impressive but feels flat. Before adding props, test a raised entrance, an occluded side route, and an overlook that changes what the player knows and can do.

## 3. Landscape is playable organization, not terrain noise

Think in landforms and relationships: ridges, valleys, slopes, plateaus, basins, water, vegetation, paths, and constructed edges.

Use terrain to:

- Reveal and conceal destinations.
- Guide movement without enclosing everything in walls.
- Offer distinct approaches and changes of exposure.
- Separate regions and establish memorable transitions.

Check:

- Actual slope and step handling of the controller.
- Traversable versus decorative ground.
- Fall recovery and unintentional climbing routes.
- AI navigation, collision seams, and foliage readability.
- Whether water and drainage make spatial sense where realism matters.
- Long-distance visibility, streaming, and performance.

Choose heightfields, meshes, brushes, or hybrid methods according to topology and tools. A heightfield is convenient for broad terrain but cannot express every overhang or stacked space by itself.

Landscape architecture is useful for studying sequence, enclosure, paths, planting, use, and maintenance—not merely for collecting scenic images.

## 4. Composition in a space the camera can leave

Composition organizes visual relationships. A staged view and a traversable 3D composition are related but not equivalent.

- Evaluate entrances, approaches, moving views, reverse views, and combat views.
- Use landmarks and distinct large forms to anchor orientation.
- Establish hierarchy with scale, silhouette, depth, value, framing, motion, and contrast.
- Give a vista a gameplay or interpretive purpose rather than making it a mandatory postcard.

The source challenges simplistic claims about **leading lines**. A line in a screenshot does not guarantee that a freely moving player will look along it. Use such hypotheses as testable possibilities, not eye-tracking facts.

Avoid optimizing a single promotional camera while normal play produces obstruction, flatness, or misleading routes.

## 5. Prospect and refuge

**Prospect** concerns the ability to survey; **refuge** concerns protection or concealment. Their relationship can help design staging areas, thresholds, overlooks, and transitions into danger.

Separate:

- Perceived safety.
- Actual mechanical protection.
- Information available from the position.
- Cost of remaining there or advancing.

A protected overlook may let players plan before entering an exposed space. Whether it feels safe depends on camera, threats, culture, and prior experience. Do not present the theory as a universal explanation of human preference or a guarantee of good design.

## 6. Metrics are a tested contract with mechanics

**Metrics** are useful dimensions and gameplay quantities: clearances, heights, movement distances, ranges, timings, and related values.

Do not import realistic dimensions or another game's numbers as authoritative defaults. Camera field of view, collision volume, animation, movement acceleration, jump rules, and input tolerance change the result.

### Build a metrics playground

| Test                 | Record                                                                   |
| -------------------- | ------------------------------------------------------------------------ |
| Doorway and corridor | Minimum passage, comfortable passage, turning and camera clearance       |
| Stairs and slope     | Step limit, slope limit, collision behavior, movement smoothness         |
| Jump and drop        | Repeatable reach, marginal reach, landing tolerance, fall consequence    |
| Cover                | Standing/crouched sightline, fire origin, edge exposure, camera mismatch |
| Interaction          | Reach, facing requirements, usable space, obstruction behavior           |
| Enemy movement       | Agent dimensions, turning, links, pursuit and crowding                   |
| Travel               | Time under normal, sprinting, cautious, and combat movement              |

Distinguish a theoretical maximum, an expert-reproducible limit, and a reliable ordinary action. Build the level around the intended audience's conditions, not the author's perfect attempt.

Record units, controller/configuration version, test conditions, and evidence. Changing movement or camera settings can invalidate earlier measurements.

### Measure one doorway before standardizing the kit

Use this adapted test plan to turn “the doorway feels narrow” into a construction decision. The dimensions and trial count are exercise settings, not recommended dimensions for every game.

Build three otherwise identical openings on flat ground. Keep their height at 2.4 m and vary only clear width: 0.9 m, 1.1 m, and 1.3 m. Measure the collision opening, not the decorative frame. Use the actual player controller; record its collision dimensions, movement settings, camera field of view, input device, and project revision before starting.

| Fixture        | Planned action                                             | Result to record                                                     |
| -------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Door A / 0.9 m | Walk through from both sides; repeat five times per side   | Completed passages / attempts, catches, and camera obstruction       |
| Door B / 1.1 m | Repeat the same approaches and inputs                      | Same fields; retain the failed attempts                              |
| Door C / 1.3 m | Repeat the same approaches and inputs                      | Same fields; note whether extra width changes the intended enclosure |
| Selected width | Add the intended corner and turn immediately after passage | Passage, turning clearance, and visibility after the turn            |

Mark a start line and a finish line beyond the wall. Before testing, define a completed passage as the whole player collision shape reaching the finish line without teleporting or changing stance. Record an unintended stop separately from choosing to stop. Save a side view of the collision geometry and a player-view clip for each catch; a camera clipping through the frame is a different failure from the player collision shape being blocked.

Choose a provisional width that supports the intended action, then check it with the intended audience and nearby geometry. Record the reason for any comfort margin above the smallest traversable width. If straight passage works but the corner fails, revise the corner before widening every door in the project. Leave measured results blank until this test is actually run.

## 7. Grid and modular kits

A grid supports alignment, repeatable construction, and collaboration. It is a tool, not a reason to force every relationship into the same module.

Before producing a large kit:

1. Establish scale, pivot conventions, snapping increments, and connection rules.
2. Make a small kit covering a real test room and its transitions.
3. Test corners, doorways, stairs, floor changes, ends, and unusual junctions.
4. Check collision, seams, material scale, lighting, and navigation.
5. Expand only after the pilot reveals the missing pieces.

Modularity trades unique control for reuse and consistency. Use bespoke pieces when a meaningful relationship cannot be expressed economically by the kit.

Do not finalize an art kit around dimensions that have not survived controller tests.

## 8. Doom and Quake data: use as game-specific references

The source pages include dimensions, weapons, damage, monsters, movement, and related mapping data. They are reference tables, not universal tuning standards.

- Identify the game, engine/source port, mod, skill setting, and changed mechanics.
- Keep map units distinct from physical units.
- Validate apparent numerical advantages in combat: aiming, dodging, infighting, cover, vertical separation, and enemy composition affect actual outcomes.
- Doom-derived and Quake-derived engines have different geometric and movement assumptions. Source-port extensions can change those assumptions again.
- Consult the linked tables for the relevant version; do not silently transplant values into another engine.

## Blockout exit questions

These are proposed decision checks, not an original universal milestone:

- Can the intended activity be played from entry to completion?
- Are the important spatial relationships understandable under ordinary play?
- Are metrics and core mechanic assumptions documented?
- Have the riskiest paths, retries, and alternate approaches been exercised?
- Is there enough evidence to justify more expensive art and scripting?

If not, name the uncertainty rather than declaring the level “finished except for polish.”
