import {
  createSearchAPI,
  type AdvancedIndex,
} from "fumadocs-core/search/server";
import { content, contentKinds } from "../../content/registry";
import { blockText } from "../../content/search";
import { source } from "../lib/source";
import { searchId } from "../../content/site";

const search = createSearchAPI("advanced", {
  language: "english",
  indexes: async (): Promise<AdvancedIndex[]> =>
    Promise.all(
      content.entries.map(async (entry) => {
        const page =
          entry.kind === "document"
            ? source.getPage(entry.id.split("/"))
            : undefined;
        const loaded =
          page && ("load" in page.data ? await page.data.load() : page.data);
        return {
          id: searchId(entry.key),
          title: entry.title,
          description: entry.description,
          url: entry.url,
          breadcrumbs: [contentKinds[entry.kind].plural],
          structuredData: loaded?.structuredData || {
            headings: [],
            contents: entry.blocks
              .filter(
                (block) => block.type !== "title" && block.type !== "lead",
              )
              .map((block) => ({
                heading: undefined,
                content: blockText(block),
              })),
          },
        };
      }),
    ),
});
export async function loader() {
  return search.staticGET();
}
