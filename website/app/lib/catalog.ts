import data from "../../src/data/resources.json";
import { type Resource } from "../../src/types";
export const resources = data as Resource[];
export { categories, stageLabels, typeLabels } from "../../src/types";
export { learningPaths, foundationPaths } from "../../src/data/learningPaths";
export { learningMedia } from "../../src/data/learningMedia";
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path}`;
