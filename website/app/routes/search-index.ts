import type { LoaderFunctionArgs } from "react-router";
import { content, contentFor, contentIn } from "../../content/registry.server";
import { researchRecordVisible } from "../../content/research-visibility";
import { searchFields } from "../../content/search";
import { source } from "../lib/source";
import type { SearchIndex } from "../../content/matching";

export async function loader({ request }: LoaderFunctionArgs) {
  const current = contentFor(request);
  const alternate = current === content ? contentIn("zh") : content;
  const docsOnly = new URL(request.url).pathname.endsWith(
    "/docs-search-index.json",
  );
  const entries = docsOnly ? current.all("document") : current.entries;
  const documents = (
    await Promise.all(
      entries.map(async (entry) => {
        if (
          entry.kind === "path" ||
          entry.kind === "step" ||
          !researchRecordVisible(entry.kind, entry.data)
        )
          return null;
        let body = "";
        let counterpart = alternate.byKey(entry.key)!;
        if (entry.kind === "document") {
          const slug = entry.id.replace(/^zh\//, "");
          // The two reader versions have distinct keys. Historical archives
          // keep their source identities and have no translation counterpart.
          if (slug !== "remote-source-index" && !slug.startsWith("remote/"))
            counterpart =
              alternate.byKey(
                `document:${entry.id === slug ? `zh/${slug}` : slug}`,
              ) ?? counterpart;
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
        const otherFields = searchFields(counterpart);
        return {
          key: entry.key,
          kind: entry.kind,
          title: entry.title,
          url: entry.url,
          text: body ? fields + "\n" + body : fields,
          // Separate alternate-language reader fields from the visible page's text.
          ...(otherFields !== fields ? { alternateText: otherFields } : {}),
          ...(counterpart.title !== entry.title
            ? { alternateTitle: counterpart.title }
            : {}),
        };
      }),
    )
  ).filter((item) => item !== null);
  return Response.json({ version: 2, documents } satisfies SearchIndex);
}
