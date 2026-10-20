import type { TestingStarterPack } from "./testingTypes";
import { testingProjects } from "./testingProjects";
import { testingEnvironments } from "./testingEnvironments";
import { testingAssets } from "./testingAssets";
import { testingMotion } from "./testingMotion";
export { testingKinds, testingUses, testingTerms } from "./testingTypes";
export type { TestingResource } from "./testingTypes";

export const testingReviewDate = "2026-10-18";
export const testingResources = [
  ...testingProjects,
  ...testingEnvironments,
  ...testingAssets,
  ...testingMotion,
];

export const testingStarterPacks: TestingStarterPack[] = [
  {
    id: "change-a-game",
    testingIds: ["godot-demos", "supertux", "wesnoth"],
    use: "coding",
    title: "Change a working game.",
    resources: "Godot demos · SuperTux · Wesnoth",
    task: "Build the baseline, change one mechanic, then replay the same input sequence.",
    measure:
      "Build success, requested behavior, regressions, and repair attempts.",
    check:
      "The baseline and changed builds both launch. A fixed input replay shows the requested mechanic change and a working restart.",
  },
  {
    id: "give-an-agent-a-goal",
    testingIds: ["minigrid", "crafter", "vizdoom"],
    use: "playing",
    title: "Give an agent a goal.",
    resources: "MiniGrid · Crafter · ViZDoom",
    task: "Fix the task, seed, action rate, observation source, and episode budget.",
    measure:
      "Success rate, collisions, path length, resources, and task completion.",
    check:
      "A completed baseline episode records the seed, observation source, action budget, terminal reason, and success result.",
  },
  {
    id: "asset-through-pipeline",
    testingIds: ["kenney-animated-characters", "quaternius-ual", "100style"],
    use: "pipeline",
    title: "Move an asset through the pipeline.",
    resources: "Kenney Animated Characters · Quaternius UAL · 100STYLE",
    task: "Import a character, map its skeleton, and play a licensed motion clip.",
    measure:
      "Missing textures, scale, skinning, foot sliding, root motion, and loop seams.",
    check:
      "One character plays one imported clip with correct scale, textures, and loop behavior. Character and motion licenses are recorded separately.",
  },
];
