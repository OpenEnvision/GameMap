import { content, sources } from "../../content/registry";
export { categories, stageLabels, typeLabels } from "../../src/types";
export { publicAsset } from "../../src/publicAsset";
// Compatibility selectors, never separate data sources. All collections are registered first.
export const resources = content.all("resource").map((entry) => entry.data);
export const learningPaths = content.all("example").map((entry) => entry.data);
export const foundationPaths = content
  .all("foundation")
  .map((entry) => entry.data);
export const learningMedia = sources.learningMedia;
