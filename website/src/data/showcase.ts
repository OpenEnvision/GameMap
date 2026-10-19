import type { Dimension } from '../types';
/** Curated selections reference presentation IDs in recordings.ts, never copy media metadata. */
export const showcaseByTrack: Record<Dimension, { label: string; promise: string; cases: string[] }> = {
  '2d': { label: '2D', promise: 'Playable game loops', cases: ['opengame-portal', 'opengame-skirmish'] },
  '3d': { label: '3D', promise: 'Characters in action', cases: ['gamefactory-ue5-combat', 'gamefactory-ue5-rpg'] },
  world: { label: 'Code WM', promise: 'Code into living worlds', cases: ['streamrender-car', 'solar-voxel'] },
};
