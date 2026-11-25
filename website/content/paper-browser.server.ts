import { content, contentIn } from "./registry.server";
import { buildPaperSearchText } from "./paper-browser";

let cached: Record<string, string> | undefined;
export function paperSearchText(): Record<string, string> {
  return (cached ??= buildPaperSearchText(
    content.all("paper"),
    contentIn("zh").all("paper"),
  ));
}
