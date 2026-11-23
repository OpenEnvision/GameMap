import type { LoaderFunctionArgs } from "react-router";
import { content, contentFor, contentIn } from "../../content/registry.server";
import { researchRecordVisible } from "../../content/research-visibility";
import { searchFields } from "../../content/search";
import { source } from "../lib/source";
import type { SearchIndex } from "../../content/matching";

export async function loader({ request }: LoaderFunctionArgs) {
  const current = contentFor(request);
  const alternate = current === content ? contentIn("zh") : content;
  const documents = (
    await Promise.all(
      current.entries.map(async (entry) => {
        if (
          entry.kind === "path" ||
          entry.kind === "step" ||
          !researchRecordVisible(entry.kind, entry.data)
        )
          return null;
        let body = "";
        if (entry.kind === "document") {
          const page = source.getPage(entry.id.split("/"));
          if (!page)
            throw new Error(`Search cannot omit document body: ${entry.id}`);
          const data = "load" in page.data ? await page.data.load() : page.data;
          body = [
            ...data.structuredData.headings.map((item) => item.content),
            ...data.structuredData.contents.map((item) => item.content),
          ].join("\n");
        }
        const fields = searchFields(entry);
        const otherFields = searchFields(alternate.byKey(entry.key)!);
        return {
          key: entry.key,
          kind: entry.kind,
          title: entry.title,
          url: entry.url,
          text: body ? fields + "\n" + body : fields,
          // Separate alternate-language reader fields from the visible page's text.
          ...(otherFields !== fields ? { alternateText: otherFields } : {}),
        };
      }),
    )
  ).filter((item) => item !== null);
  return Response.json({ version: 2, documents } satisfies SearchIndex);
}
