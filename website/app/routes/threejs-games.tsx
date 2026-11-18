import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { contentFor } from "../../content/registry.server";
import { TypedCollection } from "../components/catalog-browser";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

export function loader({ request }: LoaderFunctionArgs) {
  return { entries: contentFor(request).all("threejs-game") };
}
export default function ThreejsGames() {
  const { entries } = useLoaderData<typeof loader>();
  return (
    <TypedCollection
      kind="threejs-game"
      entries={entries}
      title="Three.js games"
      description="Curated direct Three.js games with source, dependency and license evidence. Source review does not imply playtesting; pending and excluded candidates are not included."
    />
  );
}
