// Explicit CLI/DB intake only. Never merged into the Git authoring defaults.
export function normalizePr63Game(game, intake) {
  if (!intake.newThreejsIds.includes(game.id)) return game;
  return {
    ...game,
    name: intake.englishNameOverrides[game.id] || game.name,
    ...(game.id === "token-spire-first-person"
      ? {
          demo: {
            ...game.demo,
            notes:
              "The README lists a general project demo (exact URL retained in the pinned raw PR index) and identifies fps/index.html as the 3D edition. The general link returned a reader error; no FPS-specific hosted URL was established, so no guessed subpath is presented as a confirmed demo.",
          },
        }
      : {}),
    limitations: [
      ...game.limitations,
      intake.qualification +
        " Pinned source: " +
        intake.pullRequest +
        " at " +
        intake.head,
    ],
  };
}
