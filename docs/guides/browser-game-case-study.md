# Read a browser game as a case study

Open a game, choose one short interaction, and write down what happens. Then compare your observation with the creator's materials. The three exercises below focus on route feedback, exploration state and enemy movement.

## Pick a case with something to compare

AI Arcade pairs games with prompts or skills when creators share them. Playground Arcade helps you find games by how you want to play. Game Off asks entrants for a public source repository, so you can compare a submission with its project files and check any AI-use claims in the creator's own notes. [AI Arcade](https://aiarcade.games/make) · [Playground Arcade](https://playgroundarcade.com/) · [Game Off](https://itch.io/jam/game-off-2026)

Start with [browser-playable GameMap cases](/examples/?access=playable). Choose a case with a working play link and at least one creator-owned source, such as a repository, development log or build account.

## How MOTHLIGHT became a driving game

Open the [MOTHLIGHT case](/examples/fable52-mothlight/) on desktop and drive through one light gate. Before accelerating, identify the next target. Miss a turn, then press `R` to return to the previous gate. Note which camera, route or gate cues help you resume the course.

Compare that experience with the [arcade's process account](https://aiarcade.games/play/mothlight?tab=prompt) and the [creator's repository](https://github.com/hahaliu1029/fable5.2demo). The published account describes a third instruction changing an existing walking experience into a driving game, reusing its city, rain and reflections. In the repository's `mothlight/` directory, look for the vehicle controls and gate logic that serve the new design.

## What Papertrails remembers

Use the [Papertrails case](/examples/fable52-papertrails/) to reach a biome transition, collect something and revisit a familiar location. Watch when paper scenery appears or folds away, whether you can recognize the return route, and what persists after reloading.

The arcade entry links an author-hosted game and describes how it was made. Compare your notes with the screenshots and implementation in the creator's repository. Look for what gets stored for the seed you played. The arcade credits two models, so look to project files and author notes for any feature-level attribution. [Arcade entry](https://aiarcade.games/play/papertrails) · [Creator's repository](https://github.com/xikhar/papertrails)

## How GothicVania fixed a floating enemy

Open the [GothicVania case](/examples/gothicvania-codex/), approach a ghoul and watch its movement near a platform edge. If it leaves the ground, track its position against the platform as the animation plays.

The author describes how feedback from the browser revealed a floating enemy. The progress log records adding gravity and restricting airborne steering, followed by a switch from chasing to edge patrol. Compare that sequence with the current behavior. The credits also identify contributions beyond the agent-written code, including human-made art and music and a level the author built in Tiled. [Build account](https://github.com/acatovic/gothicvania-codex-demo#the-story) · [Progress log](https://github.com/acatovic/gothicvania-codex-demo/blob/main/PROGRESS.md) · [Credits](https://github.com/acatovic/gothicvania-codex-demo#attribution)

## Leave with one useful comparison

Record four things.

- The play URL, visit date, device and exact input sequence.
- One observed result, with a screenshot or short recording if useful.
- The creator's explanation and its source link. Record the commit if you read the code.
- One idea to adapt, plus the unanswered question you would test first.

Choose something bounded, such as gate feedback or enemy grounding. Before copying code or assets, check their respective notices. A useful case study explains one design or implementation decision well enough to inform your next task.
