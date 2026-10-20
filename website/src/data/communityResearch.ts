// Discovery collections are entry points, not individually verified game cases.
export interface CommunityCollection {
  id: string;
  title: string;
  url: string;
  description: string;
}
export const communityCollections = [
  {
    "id": "vibe-jam-games",
    "title": "Vibe Jam games",
    "url": "https://vibejam.com/",
    "description": "Browse browser games from a jam requiring predominantly AI-written code. Participant attribution and public source availability still need checking per game."
  },
  {
    "id": "ai-browser-game-jams",
    "title": "AI Browser Game Jam",
    "url": "https://itch.io/jam/ai-jam-5",
    "description": "Find short browser games and creator tool or asset disclosures across the recurring AI Browser Game Jam. Submission pages do not guarantee complete public game source."
  },
  {
    "id": "astra-game-source-collection",
    "title": "Astra game-source collection",
    "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
    "description": "Discover genre-grouped games with playable builds, source links and creator evidence. Check individual creator records for the coding client, generation scope and runtime requirements."
  },
  {
    id: "awesome-ai-built-games",
    title: "Awesome AI-Built Games",
    url: "https://github.com/lappemic/awesome-ai-built-games",
    description:
      "A broader community list across action, racing, adventure, strategy, puzzles, and arcade games. Source availability varies by project.",
  },
  {
    id: "open-source-ai-game-jam",
    title: "Open Source AI Game Jam",
    url: "https://itch.io/jam/open-source-ai-game-jam/entries",
    description:
      "Browse jam submissions using AI in code, assets, or gameplay. The jam name refers to AI tools; it does not guarantee every game publishes its source.",
  },
  {
    id: "claude-community-use-cases",
    title: "Claude community use cases",
    url: "https://github.com/coolbat/awesome-opus-5.5-usecase",
    description:
      "Discover creator demos and build accounts. This collection also includes films, tools, and experiments beyond games.",
  },
] as const satisfies readonly CommunityCollection[];
