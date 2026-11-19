import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { contentFor } from "../../content/registry.server";
import { TypedCollection } from "../components/catalog-browser";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

export function loader({ request }: LoaderFunctionArgs) {
  return { entries: contentFor(request).all("paper") };
}
export default function Papers() {
  const { entries } = useLoaderData<typeof loader>();
  return (
    <TypedCollection
      kind="paper"
      entries={entries}
      title="Papers"
      description="Browse papers on game design, development, game agents, and world models."
    />
  );
}
