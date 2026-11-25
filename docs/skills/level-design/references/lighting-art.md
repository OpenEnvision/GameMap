# Lighting, Darkness, Environment Art, Texturing, and Storytelling

Sources: [Lighting](https://book.leveldesignbook.com/process/lighting), [Three point lighting](https://book.leveldesignbook.com/process/lighting/three-point), [D6 lighting](https://book.leveldesignbook.com/process/lighting/d6-lighting), [Lighting for darkness](https://book.leveldesignbook.com/process/lighting/darkness), [Environment Art](https://book.leveldesignbook.com/process/env-art), [Shape and color psychology](https://book.leveldesignbook.com/process/env-art/psychology), [Texturing](https://book.leveldesignbook.com/process/env-art/texturing), [Storytelling](https://book.leveldesignbook.com/process/env-art/storytelling). Adapted and reorganized under CC BY-NC-SA 4.0.

## 1. Preserve the playable relationships

Environment art refines form and detail while preserving functionality and clarity. It can also change the experience enough to require new testing.

Before an art pass, record:

- Required routes, openings, clearances, and usable cover.
- Important sightlines, landmarks, and interaction silhouettes.
- Intended activity, narrative function, and mood.
- Performance and asset constraints.

After each substantial pass, replay the same relationships. A prop can imply a false route, block a camera, hide an enemy, alter collision, or obscure the entrance that worked in graybox.

Do not treat “art” and “design” as permanently isolated departments. Coordinate early where an asset or lighting condition changes mechanics.

## 2. Light for space, information, and mood

Lighting can establish depth, atmosphere, material response, direction, hierarchy, and functional information.

Start with:

1. What must be readable?
2. Where should attention be invited, and from which approaches?
3. What sources plausibly motivate the light?
4. Which relationships need contrast or separation?
5. What may remain uncertain or hidden?

Useful concepts:

- **Key:** principal illumination.
- **Fill:** control of shadow readability and contrast.
- **Rim/back light:** separation of silhouettes from background.
- **Ambient/bounce:** indirect illumination and broader spatial continuity.
- **Practical source:** a visible fixture or object that motivates illumination.

Engine implementations differ. Static, baked, dynamic, emissive, probe-based, and screen-space effects have different limitations; do not assume a visible emissive surface lights the world automatically.

### Three-point lighting

Key, fill, and back/rim light are useful for studying form and staged subjects. They do not by themselves solve a freely navigable level. Test multiple views rather than lighting only a hero screenshot.

### D6 lighting: preserve the source's incompleteness

The source uses faces of a six-sided die as a mnemonic for spatial lighting strategies:

1. **Focal point:** one source emphasizes a location.
2. **Focal frame:** two similar sources frame the space between them.
3. **Path / boundary:** lighting, such as a wall wash, marks an extended relationship.
4. **Space.**
5. **Space with focal point.**
6. **Space with framed path.**

Only the first strategies receive explanation in the snapshot; the later ones are headings. Do not invent a finished six-stage method and attribute it to the book.

Use the underlying question: how does light organize approach and movement through space, not just form from one camera?

## 3. Darkness is not merely low exposure

Conventional cinematic darkness often feels dark while preserving critical information through selective contrast, silhouettes, reflected light, and controlled highlights.

Practical sequence:

- Establish important silhouette/background relationships.
- Use restrained directional fill rather than flattening all shadows.
- Let some shadows remain genuinely dark when useful.
- Separate important surfaces and actors from their backgrounds.
- Evaluate the actual game camera, display conditions, and movement.

Do not bake all darkness into albedo textures; it limits relighting and can force compensating light values. Do not assume “night” means a uniform blue wash or that a blue/orange palette is mandatory.

The book explicitly preserves an alternative: darkness can be disorienting, experimental, or a mechanic. A flashlight game may intentionally allow pitch blackness. State that intention and test whether the resulting uncertainty works rather than prescribing commercial readability everywhere.

## 4. Art passing from large relationships to detail

Work in layers:

- Reference and a coherent visual direction.
- Major shapes, materials, palette, and landmarks.
- Structural detail that explains function and scale.
- Props and evidence of use.
- Decals, wear, effects, sound, and final lighting refinements.

At every layer ask what changed for play. Avoid uniform detail density: important information needs hierarchy and quiet surroundings.

Reuse and modularity can make production feasible, but repetition becomes a readability problem when every location looks interchangeable. Distinguish important districts and decision points through meaningful variation.

## 5. Texturing supports scale and interpretation

Consider:

- Consistent material and texel scale where appropriate.
- UV alignment, seams, repetition, and stretching.
- Transition between materials and architectural elements.
- Value and visual noise at play distance.
- Surface response under the project's lighting model.
- Asset license, provenance, and engine compatibility.

Differentiate texture information from geometry and collision. A painted step, doorway, or opening can promise an action the mechanics do not support.

For physically based materials, inspect the actual engine's workflow and expected maps rather than guessing channel packing, color space, or import settings.

**Example:** a noisy floor makes a small interactable disappear. Before adding a glowing marker, test reduced local texture contrast, a clearer silhouette, and more deliberate lighting.

## 6. Reject universal shape/color psychology

The source argues strongly against claims such as:

- Red universally means danger.
- Circles inherently feel safe.
- Triangles automatically communicate aggression.

Meanings depend on context, culture, genre convention, learned mechanics, and individual perception. A sharp crystal can be a reward; a round enemy can be dangerous.

Use shape and color deliberately, but explain the actual relationship:

- “This palette consistently identifies usable doors in this game.”
- “This silhouette contrasts with the surrounding debris.”
- “This cue also has a non-color distinction.”

Color theory, readable contrast, and learned sign systems are not the same as universal color psychology. Account for color-vision differences and do not rely on hue alone for essential information.

## 7. Distinguish kinds of narrative work

- **Pacing:** the order and rhythm of events.
- **Worldbuilding:** the broader setting and its relationships.
- **Environmental storytelling:** evidence implying what happened in a particular place.
- **Choreography:** actors and events changing in the present through scripted sequences.

A room can suggest a past event through arrangement, damage, possessions, access, and traces of activity. A present-tense rescue or crash requires behavior and timing, not only static props.

For choreographed events, test alternate camera directions, player arrival times, interruption, replay, and recovery. An event that occurs outside the player's view is not automatically understood.

### Plot-shaped progression

The book cites Emily Short's advice to identify the small set of facts necessary to understand the story, establish their dependencies, and make the player encounter—and preferably use—them.

Practical adaptation:

1. List essential facts, separate from optional lore.
2. Draw dependencies between those facts.
3. Tie essential understanding to meaningful action where possible.
4. Keep optional interpretations and details optional.
5. Test what players actually inferred; do not assume placement guarantees comprehension.

Do not force a story onto a project whose goals do not require one.

## A three-view art-pass comparison

This GameMap practice supplement turns the review questions into a small regression check. Use a corridor with a required exit, a return approach, and a switch beside a prop. Keep the graybox as a separate build; make the art pass in a copy.

Choose three repeatable camera positions and complete the record below. Keep the controller, field of view, resolution, display brightness, exposure mode, starting state, and objective the same between builds. If exposure adapts during normal play, examine both the arrival from a bright area and the settled view.

| View                          | Required reading in this exercise                    | Graybox evidence                 | Art-pass evidence                |
| ----------------------------- | ---------------------------------------------------- | -------------------------------- | -------------------------------- |
| A: first arrival              | Identify the exit and a traversable approach         | Screenshot / route trace: ___    | Screenshot / route trace: ___    |
| B: returning from the far end | Recognize the same exit from the reverse direction   | Wrong turn or hesitation: ___    | Wrong turn or hesitation: ___    |
| C: approaching the switch     | Distinguish the usable switch from nearby decoration | First attempted interaction: ___ | First attempted interaction: ___ |

First traverse the route yourself to check collision and camera clearance. Then give an unfamiliar player the objective without pointing out the exit or switch. Record where they look, turn, and try to interact; ask what they understood after the attempt. A second pass by the same person includes learning, so use fresh players when comparing first-time discovery. Keep their experience with the controls visible in the notes.

**A revision decision:** if the player reaches the switch but repeatedly tries the adjacent decorative panel, inspect the shared silhouette, material, and lighting before assuming the objective is unclear. Change one cue, such as quieting the panel's texture or separating the switch from its background, then repeat the approach and return checks. Raising global exposure may reveal the switch while destroying the intended darkness elsewhere.

Record mood judgments separately from navigation and interaction outcomes. For a vision-based AI player, retain its actual rendered views and action trace; success using object names or hidden coordinates does not establish that the visual cue works.

## Review questions

- Can players still navigate, judge threats, and identify interactions?
- Does the atmosphere depend on a specific screenshot?
- Are important cues consistent without becoming monotonous?
- Does environmental evidence support an interpretation without requiring author explanation?
- Are lighting and materials affordable on target hardware?
- Which claims remain hypotheses pending playtests?
