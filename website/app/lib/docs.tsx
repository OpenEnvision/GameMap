import type { ReactNode } from "react";
import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Brand } from "../components/site-shell";
import configuredGroups from "../../docs.config.json";
import manifest from "../../.content/manifest.json";

const additional = manifest.filter(
  (page) =>
    !configuredGroups.some((group) =>
      group.pages.some(([slug]) => slug === page.slug),
    ),
);
export const groups = additional.length
  ? [
      ...configuredGroups,
      {
        title: "More notes",
        description: "Additional source-reviewed notes from the atlas.",
        pages: additional.map((page) => [page.slug, page.label]),
      },
    ]
  : configuredGroups;
export { manifest };
export const docTree: Root = {
  name: "Guides & notes",
  children: [
    { type: "page", name: "Documentation home", url: "/docs" },
    ...groups.map((group) => ({
      type: "folder" as const,
      name: group.title,
      children: group.pages
        .filter(([slug]) => manifest.some((page) => page.slug === slug))
        .map(([slug, label]) => ({
          type: "page" as const,
          name: label,
          url: "/docs/" + slug,
        })),
    })),
  ],
};

export function DocumentationLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={docTree}
      nav={{ title: <Brand />, url: "/" }}
      githubUrl="https://github.com/OpenEnvision/GameMap"
      links={[
        { text: "Resources", url: "/resources/" },
        { text: "Game examples", url: "/examples/" },
        { text: "Testing library", url: "/testing/" },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
