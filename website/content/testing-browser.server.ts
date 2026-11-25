import { content, contentIn } from "./registry.server";
import { buildTestingSearchText } from "./testing-browser";

let cached: Record<string, string> | undefined;
export function testingSearchText(): Record<string, string> {
  return (cached ??= buildTestingSearchText(
    content.all("testing"),
    contentIn("zh").all("testing"),
  ));
}
