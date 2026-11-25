import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { content, contentFor } from "../../content/registry.server";
import { paperBrowserOptions } from "../../content/paper-browser";
import { paperSearchText } from "../../content/paper-browser.server";
import { TypedCollection } from "../components/catalog-browser";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

export function loader({ request }: LoaderFunctionArgs) {
  return {
    entries: contentFor(request).all("paper"),
    paperOptions: paperBrowserOptions(content.all("paper")),
    paperSearch: paperSearchText(),
  };
}
export default function Papers() {
  const { entries, paperOptions, paperSearch } = useLoaderData<typeof loader>();
  return (
    <TypedCollection
      kind="paper"
      entries={entries}
      title="Papers"
      description="Research papers, surveys and supporting sources on game design, development, agents and world models."
      paperOptions={paperOptions}
      paperSearch={paperSearch}
    />
  );
}
