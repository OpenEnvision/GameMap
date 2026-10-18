import type { ReactNode } from "react";
import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Brand } from "../components/site-shell";
import { content } from "../../content/registry";
import { navigation, url } from "../../content/site";

export const manifest = content.all("document").map((entry) => entry.data);
export const groups = [...new Set(manifest.map((page) => page.group))].map(
  (title) => {
    const documents = manifest.filter((page) => page.group === title);
    return {
      title,
      description: documents[0].description,
      pages: documents.map(
        (page) => [page.slug, page.label] as [string, string],
      ),
    };
  },
);
// Fumadocs matches normalized route identifiers; the Link adapter restores canonical slashes.
const navigationPath = (path: string) => path.replace(/\/$/, "");
export const docTree: Root = {
  name: "Guides & notes",
  children: [
    {
      type: "page",
      name: "Documentation home",
      url: navigationPath(url.page("docs")),
    },
    ...groups.map((group) => ({
      type: "folder" as const,
      name: group.title,
      children: group.pages.map(([slug, label]) => ({
        type: "page" as const,
        name: label,
        url: navigationPath(url.document(slug)),
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
      links={navigation
        .filter((page) => page.id !== "docs")
        .map((page) => ({ text: page.title, url: page.path }))}
    >
      {children}
    </DocsLayout>
  );
}
