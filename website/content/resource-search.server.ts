import { content, contentIn } from "./registry.server";
import { buildResourceSearchText } from "./resource-search";

export { buildResourceSearchText } from "./resource-search";

let cached: Record<string, string> | undefined;
export function resourceSearchText(): Record<string, string> {
  return (cached ??= buildResourceSearchText(
    content.all("resource"),
    contentIn("zh").all("resource"),
  ));
}
