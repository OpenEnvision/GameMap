import documents from "../.content/manifest.json";
import { sources } from "./source-data";
import { createRegistry } from "./registry-core";

export const content = createRegistry(sources, documents);
export { contentKinds } from "./models";
export { pages, navigation, url } from "./site";
export { sources };
