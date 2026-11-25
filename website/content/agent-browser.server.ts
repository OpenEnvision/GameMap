import { content, contentIn } from "./registry.server";
import { buildAgentSearchText } from "./agent-browser";

let cached: Record<string, string> | undefined;
export function agentSearchText(): Record<string, string> {
  return (cached ??= buildAgentSearchText(
    content.all("agent"),
    contentIn("zh").all("agent"),
  ));
}
