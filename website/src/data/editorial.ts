import { publicAsset } from '../publicAsset';
import type { Dimension } from '../types';
/** Real gameplay and author-recorded model output, reused from reviewed media. */
export const editorial: Record<Dimension, {
  src: string; title: string; description: string; alt: string; index: string;
  source: string; credit: string;
}> = {
  '2d': {
    src: publicAsset('assets/media/showcase/opengame-portal.webp'),
    title: 'Marvel Avengers: Infinity Strike',
    description: 'Phaser 3 gameplay, from the official OpenGame recording.',
    alt: 'Real OpenGame pixel-platformer gameplay: Thor jumps between city platforms beneath a blue portal, with the game HUD visible.',
    index: '01',
    source: 'https://yelonhu.github.io/OpenGame-landing-page/',
    credit: 'OpenGame · Marvel Avengers: Infinity Strike',
  },
  '3d': {
    src: publicAsset('assets/media/learning/golden-hour-skatepark-cursor.webp'),
    title: 'Golden Hour Skatepark',
    description: 'Creator-published Three.js gameplay in a beachside skatepark.',
    alt: 'Real Golden Hour Skatepark gameplay: an airborne skater above a half-pipe, with palm trees and a warm sunset over the sea.',
    index: '02',
    source: 'https://github.com/StarKnightt/skate-park#readme',
    credit: 'StarKnightt · Golden Hour Skatepark',
  },
  world: {
    src: publicAsset('assets/media/demos/recording-cwm-brain-cloud-harbor.webp'),
    title: 'Code World Model · Cloud-sea harbor',
    description: 'A frame from the official research recording, with movement controls visible.',
    alt: 'Official Code World Model output: a wind skiff sails through a cloud-sea harbor; movement and action controls remain visible.',
    index: '03',
    source: 'https://buaacyw.github.io/cwm/',
    credit: 'Code World Model · Chen, Lin & Zhang',
  },
};
