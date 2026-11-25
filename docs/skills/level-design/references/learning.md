# Learning, Teaching, Exercises, Critique, and Portfolios

Sources: [Notes for educators](https://book.leveldesignbook.com/learning/notes), [Project plans](https://book.leveldesignbook.com/learning/projects), [Classic Combat](https://book.leveldesignbook.com/learning/projects/classic-combat), [Unfinished WIP projects](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages), and its linked exercises listed below. Adapted and reorganized under CC BY-NC-SA 4.0.

## 1. Teach complete small iterations

A useful learning loop is:

**Study → propose → communicate → build → observe → change → reflect.**

A small playable level with several evidence-driven revisions is usually more informative for learning level design than a large static environment.

Separate:

- Theory and analytical vocabulary.
- Technical construction and tool operation.
- Playable design decisions.
- Communication and critique.
- Reflection on process.

The book supplies theory and exercises, not a complete technical course for every engine. An instructor must provide the missing tool instruction.

## 2. Choose tools according to the learning goal

- For focused encounter and spatial design, Doom or Quake provide existing movement, combat, enemies, and mature mapping communities.
- For generalist development or different kinds of experiences, Unity, Unreal, Godot, or another appropriate tool may fit better.
- Account for the time required to build missing mechanics. Otherwise “level design class” becomes “controller programming class.”
- A shared initial toolset helps a class develop common examples and terminology. Allow specialization when the fundamentals and support structure are established.

Do not interpret these choices as a universal hierarchy of legitimate tools.

## 3. A short learning progression

This is an adapted sequence, not the source's official fixed curriculum.

| Stage       | Main task                                | Evidence                                          |
| ----------- | ---------------------------------------- | ------------------------------------------------- |
| Observe     | Play and annotate a small existing level | A few specific action-space relationships         |
| Communicate | Sketch and pitch one encounter or route  | Another person can explain its intent and options |
| Build       | Make it playable with existing mechanics | Start-to-finish blockout                          |
| Test        | Watch unfamiliar players                 | Located observations, not only opinions           |
| Revise      | Change a supported relationship          | Before/after evidence                             |
| Finish      | Package and document                     | Someone else can install and understand it        |
| Reflect     | Compare intent, process, and outcome     | A clear next learning goal                        |

Reduce scope when tool learning consumes the schedule. Do not remove testing to preserve decorative ambition.

## 4. Classic Combat: the most developed project plan

[Classic Combat](https://book.leveldesignbook.com/learning/projects/classic-combat) asks learners to research, pitch, and prototype a small Doom/Quake-style arena.

### Source-specific brief

- One room.
- Two or three monster types.
- One or two weapons.
- Approximately one or two minutes of play.

These constraints belong to this exercise, not to combat design generally.

### Working process

1. Play enough of the chosen game to recognize weapons, monsters, movement, and interactions.
2. Read relevant criticism and discuss what its claims depend on.
3. Produce several quick organizing diagrams and alternative layouts.
4. Choose one, make a substantial revision, and annotate starts, enemies, items, hazards, and progression.
5. Pitch the intended experience and several plausible player strategies.
6. Check game-specific metrics and build a small playable arena.
7. Self-test, then test with other people.
8. Change both a spatial relationship and an enemy/item relationship.
9. Consider a secret whose discovery fits the level.
10. Reflect on research, communication, construction, testing, and revision.

The source suggests at least three external testers and short production timeboxes. These are practical exercise targets, not a statistically sufficient sample or universal schedule.

### Evaluate

- Is the experience goal coherent and distinctive?
- Are multiple strategies actually supported?
- Can another person understand the plan?
- Do metrics and enemy behavior support the intended encounter?
- Did observation produce a meaningful revision?
- What did the learner discover about their own process?

Do not turn the exercise's suggested death counts or completion times into universal measures of quality.

### Prepare a session that can reach revision

This GameMap teaching supplement assumes research and tool setup are already complete. Before the session, use the [test-room procedure](tools-quake.md) to confirm that each learner can build, run, change, and package a room. The instructor records the chosen game/mod, engine, editor, and compiler versions and supplies a working starting project with permitted assets.

For a concrete brief, use one Quake arena, two previously studied monster types, and one weapon. Ask learners to support two plausible ways to approach the encounter, then reach an exit. They decide which sightline, obstacle, or resource makes those approaches different. They must explain a tradeoff rather than simply draw two corridors.

Two 60-minute studio sessions are an example planning budget after preparation, not a promise about beginner production speed:

| Session | Work allocation                                                                                 | Keep at the end                                               |
| ------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| First   | 15 minutes for alternative diagrams, 30 for a playable blockout, 15 for self-test and packaging | Labeled plan, runnable baseline, one question for testers     |
| Second  | 20 minutes for external tests, 25 for a targeted revision, 10 for retest, 5 for reflection      | Located observations, revised build, before/after explanation |

If construction overruns, simplify the arena or postpone decoration; keep a test of the central choice. Tell testers the goal and controls, then observe without coaching the route. The learner watches, a peer plays, and another peer can keep notes. Rotate those roles so that the author is not also the only source of feedback.

| Review checkpoint | Evidence the learner supplies                                                                        | Question for the reviewer                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Choice            | Two marked approaches and their intended costs                                                       | What can the player gain or risk by choosing each?                           |
| Test              | A specific position, action, and consequence, plus any hint given                                    | Did the player encounter the intended choice, or merely follow instructions? |
| Revision          | Two separately saved and tested revisions: a spatial change, then an enemy/item change, with reasons | Which observation supports each change, and what else must be retested?      |
| Reflection        | A prediction compared with the retest, including unresolved problems                                 | What would you test next, and why?                                           |

If an AI assistant helps, keep the request, the resulting map/script changes, and the learner's explanation of their effect. Ask the learner to identify a change they accepted or rejected and demonstrate why in play. More generated code, a longer prompt history, or an assistant's confident self-review is not evidence that the learner understands the encounter.

## 5. Other projects: retain their draft status

### Modern Combat — incomplete

[Source](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/modern-combat).

Research modern cover/action combat, study authored versus systemic AI, sketch a small encounter with beats, cover, sightlines, and zones, then pitch it.

The source does **not** resolve the tooling/prototyping setup. Before assigning implementation, provide a game or project with appropriate combat and AI. Do not promise that a generic engine template already supports it.

### Modern Stealth — incomplete

[Source](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/modern-stealth).

The draft focuses on observing stealth encounters and studying perception/awareness in Splinter Cell: Blacklist. It does not contain a complete build-and-evaluate assignment.

Adaptation: if extending it, explicitly provide mechanics and test readable suspicion, search, recovery, and combat fallback. Label those additions as your assignment design.

### Direct Lighting — short exercise

[Source](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/exercise-direct-lighting).

Light a simple blockout using manually placed direct and fill/bounce lights. Disable automatic/precomputed help relevant to the exercise. Start with grayscale surfaces and desaturated light if color obscures the lesson.

Limiting the lighting tools in this exercise isolates the effect of light.

### Whiteboard 2D — outline

[Source](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/exercise-whiteboard-2d).

Draw a platformer layout with collectibles and mark the player's screen for important situations. Present what is visible and how collectibles influence movement. The linked reading is additional work, not content already contained in the page.

### Adaptation — short brief

[Source](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/adaptation).

Adapt a real place into a single-player level, examining typology, massing, gameplay fit, and scope. Explain what is simplified, preserved, and changed.

### Layout — outline

[Source](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/exercise-floorplan).

The draft proposes a short level about unlocking a door and leaving, comparing better/worse organizations through goals, beats, research, parti, bubble diagram, and layout.

Adaptation: require the learner to explain a specific difference in playable consequences, not merely label one drawing “bad.”

### Verticality — short exercise

[Source](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/verticality).

Represent major elevations abstractly, omit minor height noise, reserve room for transitions and landings, and draw overlapping floors separately where useful. Draw what communicates the core relationships rather than producing unnecessary architectural detail.

## 6. Longer course structure

The source offers an illustrative semester:

- Brief pre-production.
- Repeated layout communication and revision.
- Substantial blockout and scripting time.
- Production weighted toward the cohort's goals.
- Presentation and reflection.

Adapt the calendar to tool familiarity, class length, accessibility, and project scope. Do not assign extensive abstract planning before beginners have enough construction and play experience to interpret it.

Pair discussion with shared play or observation. Use the culture and case-study sections for debate, not only as authoritative answers.

## 7. Run useful critiques

A critique begins with a brief statement of intent and method. Then:

- Describe a specific strength worth preserving.
- Describe a concrete problem that weakens it.
- Use first-person, located observations.
- Ask questions that expose assumptions.
- Offer alternatives without treating taste as fact.
- End with a tractable next experiment.

“I could not recognize the exit after returning to the courtyard” is more useful than “Nobody will know where to go.”

A quick **pin-up** can use a short prompt, rapid sketches, small-group presentation, and focused discussion. The goal is clearer thinking and renewed direction, not humiliation.

See the [review template](../templates/review.md).

## 8. Portfolio: a draft source, useful principles

[Level Design Portfolio](https://book.leveldesignbook.com/learning/projects/unfinished-wip-pages/level-design-portfolio) is an informal outline, not a definitive hiring standard.

Practical adaptation:

- State the desired role and show relevant work immediately.
- Keep navigation and text concise.
- Show representative play, labeled layouts, iteration, and individual contribution.
- Provide working links and test on mobile.
- Credit collaborators and external assets.
- Avoid publishing unnecessary personal information.
- Keep the portfolio and downloadable CV current.

Specific host and social-platform opinions in the draft are time-sensitive. Use current tools that make the work accessible rather than copying old platform prescriptions.

## Deliverable

For a learning plan, specify the goal, prerequisites, tools, timebox, small artifact, feedback method, revision requirement, and reflection question. Mark where a source exercise ends and your additions begin.
