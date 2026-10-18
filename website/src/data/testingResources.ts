import { testingProjects } from './testingProjects';
import { testingEnvironments } from './testingEnvironments';
import { testingAssets } from './testingAssets';
import { testingMotion } from './testingMotion';
export { testingKinds, testingUses, testingTerms } from './testingTypes';
export type { TestingResource } from './testingTypes';

export const testingReviewDate = '2026-10-18';
export const testingResources = [...testingProjects, ...testingEnvironments, ...testingAssets, ...testingMotion];

export const testingStarterPacks = [
  {
    use: 'coding' as const,
    title: 'Change a working game.',
    resources: 'Godot demos · SuperTux · Wesnoth',
    task: 'Build the baseline, change one mechanic, then replay the same input sequence.',
    measure: 'Build success, requested behavior, regressions, and repair attempts.',
  },
  {
    use: 'playing' as const,
    title: 'Give an agent a goal.',
    resources: 'MiniGrid · Crafter · ViZDoom',
    task: 'Fix the task, seed, action rate, observation source, and episode budget.',
    measure: 'Success rate, collisions, path length, resources, and task completion.',
  },
  {
    use: 'pipeline' as const,
    title: 'Move an asset through the pipeline.',
    resources: 'Kenney · Quaternius Standard · 100STYLE',
    task: 'Import a character, map its skeleton, and play a licensed motion clip.',
    measure: 'Missing textures, scale, skinning, foot sliding, root motion, and loop seams.',
  },
];
