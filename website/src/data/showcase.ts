import { publicAsset } from '../publicAsset';
import type { Dimension } from '../types';
import type { ProjectVideoData } from './projectVideos';

export interface ShowcaseCase {
  id: string;
  resourceId: string;
  name: string;
  description: string;
  poster: string;
  alt: string;
  video: ProjectVideoData;
  prompt?: string;
  aspectRatio?: number;
  mobilePreview?: { src: string; poster: string; aspectRatio: number };
}

const local = (name: string) => publicAsset(`media/showcase/${name}`);
function demo(id: string, resourceId: string, name: string, description: string, source: string, original: string, credit: string, track: Dimension, options: Pick<ShowcaseCase, 'prompt' | 'aspectRatio' | 'mobilePreview'> = {}): ShowcaseCase {
  return { ...options, id, resourceId, name, description, poster: local(`${id}.webp`), alt: `${name} — a frame from the official project recording`, video: { previewSrc: local(`${id}.mp4`), src: original, title: name, description, source, credit, track } };
}

export const showcaseCases: Record<string, ShowcaseCase> = {
  'opengame-portal': demo('opengame-portal', 'opengame', 'OpenGame · Portal runner', 'Jump, fight, and move through a generated pixel platformer.', 'https://yelonhu.github.io/OpenGame-landing-page/', 'https://yelonhu.github.io/OpenGame-landing-page/hero/marvel_1.mp4', 'OpenGame · CUHK MMLab', '2d'),
  'opengame-skirmish': demo('opengame-skirmish', 'opengame', 'OpenGame · Space-station skirmish', 'Move, aim, and dodge in a generated top-down action game.', 'https://yelonhu.github.io/OpenGame-landing-page/', 'https://raw.githubusercontent.com/yelonhu/OpenGame-landing-page/main/public/hero/starWars.mp4', 'OpenGame · CUHK MMLab', '2d'),
  'gamefactory-ue5-combat': demo('gamefactory-ue5-combat', 'gamefactory-3a', '3AGameFactory · Courtyard combat', 'Close the distance, trade attacks, and watch health react in an Unreal Engine 5 game.', 'https://github.com/OpenDCAI/GameFactory-3A#ue5', 'https://github.com/user-attachments/assets/810ced06-7c0e-4e74-a0f5-588c9cad8d1e', 'OpenDCAI · Unreal Engine 5 gameplay', '3d'),
  'gamefactory-ue5-rpg': demo('gamefactory-ue5-rpg', 'gamefactory-3a', '3AGameFactory · Village quest', 'Run through a stylized village, collect treasure, and watch the quest progress.', 'https://github.com/OpenDCAI/GameFactory-3A#ue5', 'https://github.com/user-attachments/assets/8f90cc59-548a-4cd9-a3a8-7d8c4e2e412b', 'OpenDCAI · Unreal Engine 5 gameplay', '3d'),
  'streamrender-car': demo('streamrender-car', 'streamrender-h3', 'StreamRender-H3 · Engine to neural render', 'Compare the engine input with its matching neural render, in sync.', 'https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/', 'https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Sol-Engine/StreamRender-H3/blog-assets/engine-vs-render-single-car.mp4', 'NVIDIA Research · official input / output comparison', 'world', { aspectRatio: 3.5, mobilePreview: { src: local('streamrender-car-mobile.mp4'), poster: local('streamrender-car-mobile.webp'), aspectRatio: 480 / 548 } }),
  'solar-voxel': demo('solar-voxel', 'solarrenderer', 'SolarRenderer · Voxel world, reimagined', 'A simple voxel scene becomes a richly styled, moving world.', 'https://enderfga.cn/SolarRenderer/', 'https://enderfga.cn/SolarRenderer/media/gallery/mat_voxel__westeros/render.mp4', 'SolarRenderer authors · official model output', 'world'),
};

export const showcaseByTrack: Record<Dimension, { label: string; promise: string; cases: string[] }> = {
  '2d': { label: '2D', promise: 'Playable game loops', cases: ['opengame-portal', 'opengame-skirmish'] },
  '3d': { label: '3D', promise: 'Characters in action', cases: ['gamefactory-ue5-combat', 'gamefactory-ue5-rpg'] },
  world: { label: 'Code WM', promise: 'Code into living worlds', cases: ['streamrender-car', 'solar-voxel'] },
};
