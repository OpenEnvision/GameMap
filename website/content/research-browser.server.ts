import { content, contentIn } from "./registry.server";
import { buildResearchSearchText } from "./research-browser";

let cached: ReturnType<typeof buildResearchSearchText> | undefined;
export function researchSearchText() {
  return (cached ??= buildResearchSearchText(
    content.all("repository-research"),
    contentIn("zh").all("repository-research"),
  ));
}
