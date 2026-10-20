import type { ReactNode } from "react";
import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Brand } from "../components/site-shell";
import { DocumentationDisplayMode } from "../components/display-mode";
import type { DocumentMetadata } from "../../content/models";
import { url } from "../../content/site";
import {
  docLocale,
  docHome,
  docMessages,
  type DocLocale,
} from "../../content/doc-language";
import { LanguageSwitcher, useSiteI18n } from "./i18n";
import documentationGroups from "../../docs.config.json";
export function documentGroups(manifest: readonly DocumentMetadata[]) {
  return [...new Set(manifest.map((page) => page.group))].map((title) => {
    const documents = manifest.filter((page) => page.group === title);
    return {
      title,
      description:
        documentationGroups.find((group) => group.title === title)?.description ||
        "Curated source notes and practical guidance from GameMap.",
      pages: documents.map(
        (page) => [page.slug, page.label] as [string, string],
      ),
    };
  });
}
export function documentationViews(
  manifest: DocumentMetadata[],
  locale: DocLocale,
) {
  if (locale === "en")
    return manifest.filter((page) => docLocale(page.slug) === "en");
  const translated = new Set(
    manifest
      .filter((page) => docLocale(page.slug) === "zh")
      .map((page) => page.slug.slice(3)),
  );
  return [
    ...manifest.filter((page) => docLocale(page.slug) === "zh"),
    ...manifest.filter(
      (page) => docLocale(page.slug) === "en" && !translated.has(page.slug),
    ),
  ];
}
export function DocumentationLanguage(_props: {
  locale: DocLocale;
  slug?: string;
  manifest: DocumentMetadata[];
}) {
  return <LanguageSwitcher className="documentation-language" />;
}
export function DocumentationLayout({
  children,
  manifest,
  locale = "en",
}: {
  children: ReactNode;
  manifest: DocumentMetadata[];
  locale?: DocLocale;
}) {
  const text = docMessages(locale),
    { t, href } = useSiteI18n(),
    selected = documentationViews(manifest, locale);
  const tree: Root = {
    name: text.title,
    children: [
      {
        type: "page",
        name: text.home,
        url: href(docHome(locale)).replace(/\/$/, ""),
      },
      ...documentGroups(selected).map((group) => ({
        type: "folder" as const,
        name: t(group.title),
        children: group.pages.map(([slug, name]) => ({
          type: "page" as const,
          name:
            t(name) +
            (locale === "zh" && docLocale(slug) === "en" ? " · EN" : ""),
          url: href(url.document(slug)).replace(/\/$/, ""),
        })),
      })),
    ],
  };
  return (
    <DocsLayout
      tree={tree}
      slots={{ themeSwitch: DocumentationDisplayMode }}
      nav={{ title: <Brand />, url: href("/") }}
      githubUrl="https://github.com/OpenEnvision/GameMap"
      links={(["resources", "examples", "paths"] as const).map((id) => ({
        text: t(
          {
            resources: "Resources",
            examples: "Game examples",
            paths: "Development paths",
          }[id],
        ),
        url: href(url.page(id)),
      }))}
    >
      {children}
    </DocsLayout>
  );
}
