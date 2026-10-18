import { showcaseCases } from './showcase';
import { publicAsset } from '../publicAsset';
/** Author-published videos: only optimized local excerpts preview on hover. */
export interface ProjectVideoData {
  previewSrc: string;
  heroSrc?: string;
  src: string;
  title: string;
  description: string;
  source: string;
  credit: string;
  track: '2d' | '3d' | 'world';
}
const streamCar = 'https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Sol-Engine/StreamRender-H3/blog-assets/engine-vs-render-single-car.mp4';
const livingRoom = 'https://yueyang.ai/holodeck/static/videos/a_bohemian_style_living_room_w%7C1%7C0%7Csunny_vondelpark_4k%7C1.0%7C50.0%7C360%7C16%7C30%7C10%7CCYCLES_video_compressed.mp4';
export const projectVideos: Record<string, ProjectVideoData> = {
  solarrenderer: {
    previewSrc: 'https://enderfga.cn/SolarRenderer/media/hero/oasis-street__cyberpunk.mp4',
    heroSrc: 'https://enderfga.cn/SolarRenderer/media/gallery/oasis-street__cyberpunk/render.mp4',
    src: 'https://enderfga.cn/SolarRenderer/media/film/solarrenderer-film.mp4',
    title: 'SolarRenderer · Official film',
    description: 'Preview the official cyberpunk street scene, then watch the full film for more examples of structural control and generative rendering.',
    source: 'https://enderfga.cn/SolarRenderer/',
    credit: 'SolarRenderer authors · official model output', track: 'world',
  },
  'streamrender-h3': {
    previewSrc: streamCar, src: streamCar,
    title: 'StreamRender-H3 · Engine → neural render',
    description: 'An official synchronized comparison of engine output on the left and streaming neural rendering on the right. Both views are shown in full.',
    source: 'https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/',
    credit: 'NVIDIA · StreamRender-H3', track: 'world',
  },
  opengame: {
    previewSrc: 'https://yelonhu.github.io/OpenGame-landing-page/demos/hajimi.mp4',
    src: 'https://yelonhu.github.io/OpenGame-landing-page/demos/hajimi.mp4',
    title: 'OpenGame · Hajimi Defense: The Tuna Crisis',
    description: 'An official OpenGame demo showing a generated pixel game in action.',
    source: 'https://yelonhu.github.io/OpenGame-landing-page/#demo',
    credit: 'OpenGame · CUHK MMLab', track: '2d',
  },
  trellis: {
    previewSrc: 'https://microsoft.github.io/TRELLIS/assets/teaser.mp4',
    src: 'https://microsoft.github.io/TRELLIS/assets/teaser.mp4',
    title: 'TRELLIS · 3D asset generation',
    description: 'An official Microsoft Research showcase of generated 3D assets. Project materials are presented for academic and research use.',
    source: 'https://microsoft.github.io/TRELLIS/',
    credit: 'TRELLIS · Microsoft Research', track: '3d',
  },
  infinigen: {
    previewSrc: 'https://infinigen.org/img/random_sample_articulated.mp4',
    src: 'https://infinigen.org/img/random_sample_articulated.mp4',
    title: 'Infinigen · Articulated assets',
    description: 'An official showcase of articulated assets created through procedural generation.',
    source: 'https://infinigen.org/',
    credit: 'Infinigen · Princeton Vision & Learning Lab', track: '3d',
  },
  holodeck: {
    previewSrc: publicAsset('media/showcase/holodeck-living.mp4'), src: livingRoom,
    title: 'Holodeck · A room from a prompt',
    description: 'An author-published tour of a generated bohemian living room.',
    source: 'https://yueyang.ai/holodeck/',
    credit: 'Holodeck authors · generated bohemian living room', track: '3d',
  },
};
for (const [resourceId,caseId] of [['opengame','opengame-portal'],['gamefactory-3a','gamefactory-ue5-combat'],['streamrender-h3','streamrender-car'],['solarrenderer','solar-voxel']]) {
  projectVideos[resourceId]=showcaseCases[caseId].video;
}
export const demoIds = Object.keys(projectVideos);
