import { open3dRound5Media } from "./open3dRound5Media";
import { communityMedia } from "./communityMedia";
import { jamGameMedia } from "./jamGameMedia";
import { approvedImportedMedia } from "./approvedImportedMedia";

import type { z } from "zod";
import type { learningMediaSchema } from "../../content/contracts";
type CanonicalLearningMedia = z.infer<typeof learningMediaSchema>;
/** Git input boundary only: the initial import makes documented browser captures explicit. */
export type LearningMedia = Omit<CanonicalLearningMedia, "origin"> & {
  origin?: CanonicalLearningMedia["origin"];
};

// Browser/local captures and attributed creator screenshots. See docs/reference/media-sources.md.
export const learningMedia: Record<string, LearningMedia> = {
  ...communityMedia,
  ...jamGameMedia,
  ...open3dRound5Media,
  ...approvedImportedMedia,
  "moonlight-mayhem-codex": {
    src: "media/learning/moonlight-mayhem-codex.webp",
    alt: "A playable raccoon character in a 3D museum, with crew rescue objectives and security patrols.",
    caption:
      "Inside the museum: crew rescue, security, and the Golden Sardine.",
    sourceUrl: "https://simonw.github.io/raccoon-heist-codex/",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "tron-exonix-claude": {
    src: "media/learning/tron-exonix-claude.webp",
    alt: "The neon TRON: EXONIX game board with a player vehicle, moving enemies, and territory boundaries.",
    caption: "The live Godot build: neon territory capture and moving enemies.",
    sourceUrl: "https://www.top3d.ai/demo/exonix-build/index.html",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "claude-agent-team-tetris": {
    src: "media/learning/claude-agent-team-tetris.webp",
    alt: "Tetris in play, showing colored blocks, the next piece, score, and keyboard controls.",
    caption: "The agent team’s finished game, with real-time board and score.",
    sourceUrl: "https://caiguanhao.github.io/tetris/",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "tower-of-time-ai-build": {
    src: "media/learning/tower-of-time-ai-build.webp",
    alt: "Tower of Time gameplay, showing a pixel-art space station, the player ship, an enemy, and base health.",
    caption:
      "The playable battlefield behind the author’s rewind-mechanic prompts.",
    sourceUrl: "https://m4v3k.itch.io/tower-of-time",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "raccoon-heist-claude": {
    src: "media/learning/raccoon-heist-claude.webp",
    alt: "Raccoon Heist gameplay with a 3D backyard, the player raccoon, collectible loot, and a countdown HUD.",
    caption:
      "A night in the backyard: loot, patrols, and a race back to the dumpster.",
    sourceUrl: "https://simonw.github.io/raccoon-heist/",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "opengame-tower-defense": {
    src: "media/learning/opengame-tower-defense.webp",
    alt: "Hajimi Defense gameplay with a cat base, tower placement spaces, and incoming enemy waves.",
    caption:
      "The generated tower-defense game, with its build grid and live waves.",
    sourceUrl:
      "https://yelonhu.github.io/OpenGame-landing-page/games/hajimi/index.html",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "opengame-marvel-platformer": {
    src: "media/learning/opengame-marvel-platformer.webp",
    alt: "Infinity Strike gameplay with a selectable hero in a pixel-art city combat stage.",
    caption: "From the hero-selection prompt to a playable city action stage.",
    sourceUrl:
      "https://yelonhu.github.io/OpenGame-landing-page/games/marvel/index.html",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "opengame-arithmancy-card-battle": {
    src: "media/learning/opengame-arithmancy-card-battle.webp",
    alt: "Arithmancy Academy’s playable spell-card duel with card choices, health bars, and the turn counter.",
    caption:
      "A real card duel: spell choices, turns, and connected battle state.",
    sourceUrl:
      "https://yelonhu.github.io/OpenGame-landing-page/games/harryPotter/index.html",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
  "opengame-mandalorian-shooter": {
    src: "media/learning/opengame-mandalorian-shooter.webp",
    alt: "Mandalorian Protocol’s top-down Imperial Base level, with the player character and combat HUD.",
    caption:
      "The generated top-down shooter, captured inside the Imperial Base.",
    sourceUrl:
      "https://yelonhu.github.io/OpenGame-landing-page/games/starWars/index.html",
    capturedAt: "2026-10-18",
    width: 1280,
    height: 720,
  },
};
