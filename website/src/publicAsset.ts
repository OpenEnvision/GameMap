import { canonicalAssetPath } from '../content/assets';
export const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${canonicalAssetPath(path)}`;
