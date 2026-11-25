import type { DocumentMetadata } from "./models";
import type { Locale } from "./locale";
import { url } from "./site";

export const learningPaths = [
  {
    id: "guides/reading-guide",
    title: "Find the right reference",
    action:
      "Three examples of choosing what to read: a Phaser touch port, a broken Godot import, and a world model with the wrong output.",
  },
  {
    id: "guides/practical-guide",
    title: "Prototype in Godot",
    action:
      "Make one room with three pickups and a locked exit. Get win, loss, and retry working before you add art.",
  },
  {
    id: "guides/level-design",
    title: "Graybox and playtest",
    action:
      "Build a short out-and-back route. Watch where a first-time player turns, then change one thing in the layout.",
  },
] as const;

export const learningBlockers = [
  {
    question: "Retry starts with the wrong state",
    action:
      "Compare the first round with the first frame after retry. Check the timer, counters, and spawned objects before touching the input code.",
    ids: ["production/debugging"],
  },
  {
    question: "The animation breaks on import",
    action:
      "Put the old and new files in the same test scene. Check the rest pose and root motion before asking for a new export.",
    ids: ["assets/validation", "assets/generation-delivery"],
  },
  {
    question: "The edit disappears when you reopen the scene",
    action:
      "Find what was actually saved. Reopen the scene from disk before changing another node or rerunning the agent.",
    ids: ["production/engine-operations", "production/native-operations"],
  },
  {
    question: "The game runs in the editor. What do we ship?",
    action:
      "Install the exported build on the target machine. Check launch, a full round, and restart from the same package players will get.",
    ids: ["production/release-readiness", "production/overview"],
  },
] as const;

export const appliedLearningPaths = [
  {
    title: "What can I learn from a playable demo?",
    action:
      "Play one mechanic, then trace it to a published prompt, build log, or piece of source code.",
    ids: ["guides/browser-game-case-study"],
  },
  {
    title: "Did the agent fix the game?",
    action:
      "Run the original repro and one neighboring mechanic. Keep a launch failure separate from a build that starts but plays wrong.",
    ids: ["evaluation/development-evaluation", "evaluation/benchmarks"],
  },
  {
    title: "What should the NPC decide?",
    action:
      "Script the quest state first. Give the model room to vary the hint, and check what happens when it answers late or gives an impossible action.",
    ids: ["ecosystem/runtime-npcs"],
  },
  {
    title: "Does the world remember what happened?",
    action:
      "Take the key, open the door, leave, and come back. Check what stayed true and which state the system actually exposes.",
    ids: ["ecosystem/world-models", "evaluation/gameplay-state"],
  },
] as const;

/** Use the translated document when present, including in partial exports. */
export function learningDocument(
  manifest: readonly DocumentMetadata[],
  locale: Locale,
  id: string,
) {
  const page =
    (locale === "zh" && manifest.find((doc) => doc.slug === `zh/${id}`)) ||
    manifest.find((doc) => doc.slug === id);
  return page
    ? { slug: page.slug, label: page.label, url: url.document(page.slug) }
    : null;
}
