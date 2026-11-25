import type { TestingStarterPack } from "./testingTypes";
import { testingProjects } from "./testingProjects";
import { testingEnvironments } from "./testingEnvironments";
import { testingAssets } from "./testingAssets";
import { testingMotion } from "./testingMotion";
import { testingFixtures } from "./testingFixtures";
export { testingKinds, testingUses, testingTerms } from "./testingTypes";
export type { TestingResource } from "./testingTypes";

export const testingReviewDate = "2026-11-24";
export const testingResources = [
  ...testingProjects,
  ...testingEnvironments,
  ...testingAssets,
  ...testingMotion,
  ...testingFixtures,
];

export const testingStarterPacks: TestingStarterPack[] = [
  {
    id: "change-a-game",
    use: "coding",
    title: "Change a working game.",
    resources: "Godot official demos · SuperTux · The Battle for Wesnoth",
    testingIds: ["godot-demos", "supertux", "wesnoth"],
    task: "Build the baseline, change one mechanic, then replay the same input sequence.",
    measure:
      "Build success, requested behavior, regressions, and repair attempts.",
    check:
      "In one selected project, define the expected outcomes and save an unchanged baseline run. After the edit, build again, exercise the requested mechanic, and replay the original input sequence to check existing behavior. Record commands and pass/fail evidence for all three checks.",
  },
  {
    id: "give-an-agent-a-goal",
    use: "playing",
    title: "Give an agent a goal.",
    resources: "MiniGrid / BabyAI · Crafter · ViZDoom",
    testingIds: ["minigrid", "crafter", "vizdoom"],
    task: "Fix the task, seed, action rate, observation source, and episode budget.",
    measure:
      "Success rate, collisions, path length, resources, and task completion.",
    check:
      "Before running, fix the environment and task, seed settings, observation mode, action rate and action/time budget. Record every scheduled episode through success, failure, timeout or error, saving its return, length, termination reason and action/observation trace. Include failed and unfinished runs in the reported results.",
  },
  {
    id: "asset-through-pipeline",
    use: "pipeline",
    title: "Move an asset through the pipeline.",
    resources: "Kenney · Quaternius Universal Animation Library · 100STYLE",
    testingIds: ["kenney", "quaternius-ual", "100style"],
    task: "Import a character, map its skeleton, and play a licensed motion clip.",
    measure:
      "Missing textures, scale, skinning, foot sliding, root motion, and loop seams.",
    check:
      "Choose one rigged character and one compatible clip covered by the recorded licenses. Import them into a pinned engine, verify textures, units and skeleton mapping, then play one named clip and inspect skinning, foot contact, root travel and loop seams. Save import settings and results; record missing files or unmapped joints as failures.",
  },
];
