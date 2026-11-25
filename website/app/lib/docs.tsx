import type { ReactNode } from "react";
import { useLocation } from "react-router";
import type { Folder, Item, Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "../components/site-shell";
import type { DocumentMetadata } from "../../content/models";
import { pages, url } from "../../content/site";
import {
  docLocale,
  docMessages,
  type DocLocale,
} from "../../content/doc-language";
import { pillars } from "./pillars";
import { LanguageSwitcher, Link, useSiteI18n } from "./i18n";
export function documentGroups(manifest: readonly DocumentMetadata[]) {
  const sectionFor = (slug: string) => {
    const path = slug.replace(/^zh\//, "");
    if (path.startsWith("skills/level-design/references/"))
      return "Level design references";
    if (path.startsWith("skills/level-design/templates/"))
      return "Practice templates";
    return "";
  };
  const groupFor = (page: DocumentMetadata) =>
    sectionFor(page.slug) ? "Skills & practice" : page.group;
  return [...new Set(manifest.map(groupFor))].map((title) => {
    const documents = manifest.filter((page) => groupFor(page) === title);
    const pages = documents.map(
      (page) => [page.slug, page.label] as [string, string],
    );
    return {
      title,
      description: documents[0].description,
      pages,
      sections: [...new Set(pages.map(([slug]) => sectionFor(slug)))].map(
        (name) => ({
          title: name,
          pages: pages.filter(([slug]) => sectionFor(slug) === name),
        }),
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

/** Keep the reading room focused on Learn; site destinations live in its footer. */
function LearningNavigation() {
  const { t } = useSiteI18n();
  const { pathname } = useLocation();
  const home = /^\/docs(?:\/zh)?\/?$/.test(pathname);
  return (
    <nav className="docs-learn-nav" aria-label={t("Learn")}>
      <span className="docs-learn-label">{t("Learn")}</span>
      <Link to={pages.docs.path} aria-current={home ? "page" : undefined}>
        {t("Guides & notes")}
      </Link>
    </nav>
  );
}

/** A compact site footer under the docs pager: the brand, the four pillars
 *  and the wordmark, so the reading room ends like every other GameMap page.
 *  Pass it to DocsPage as `footer.children`. */
export function DocumentationSiteBand() {
  const { t } = useSiteI18n();
  return (
    <div className="reader-site-band">
      <div className="reader-site-band-top">
        <div className="reader-site-band-intro">
          <Link to="/" aria-label={t("GameMap home")}>
            <Brand />
          </Link>
          <p>{t("A little direction for your next playable world.")}</p>
        </div>
        <nav className="reader-site-band-map" aria-label={t("Site map")}>
          {pillars.map((pillar) => (
            <div key={pillar.id} data-pillar={pillar.id}>
              <h2>{t(pillar.label)}</h2>
              <ul>
                {pillar.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{t(link.title)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="reader-site-band-bottom">
        <a
          href="https://github.com/OpenEnvision/GameMap"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
      <div className="reader-site-band-wordmark" aria-hidden="true">
        GameMap
      </div>
    </div>
  );
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
  const { pathname } = useLocation();
  const home = /^\/docs(?:\/zh)?\/?$/.test(pathname);
  const leaf = ([slug, name]: [string, string]): Item => ({
    type: "page",
    name:
      t(name) + (locale === "zh" && docLocale(slug) === "en" ? " · EN" : ""),
    url: href(url.document(slug)).replace(/\/$/, ""),
  });
  const folderName = (title: string, count: number) => (
    <span className="docs-folder-label">
      <span className="docs-folder-title">{t(title)}</span>
      <span className="docs-group-count" aria-hidden="true">
        {count}
      </span>
    </span>
  );
  const groups = documentGroups(selected);
  const supplementalStart = groups.findIndex(
    (group) =>
      !group.pages.some(([slug]) =>
        /^(guides|ecosystem|production|assets|evaluation)\//.test(
          slug.replace(/^zh\//, ""),
        ),
      ),
  );
  const tree: Root = {
    name: text.title,
    children: groups.flatMap((group, index) => {
      const folder: Folder = {
        type: "folder",
        name: folderName(group.title, group.pages.length),
        defaultOpen:
          home &&
          group.pages.some(([slug]) =>
            /^guides\//.test(slug.replace(/^zh\//, "")),
          ),
        children: group.sections.flatMap((section): (Folder | Item)[] =>
          section.title
            ? [
                {
                  type: "folder",
                  name: folderName(section.title, section.pages.length),
                  children: section.pages.map(leaf),
                },
              ]
            : section.pages.map(leaf),
        ),
      };
      return index === supplementalStart
        ? [
            {
              type: "separator" as const,
              name: (
                <span className="docs-tree-label">
                  {t("Templates & project notes")}
                </span>
              ),
            },
            folder,
          ]
        : [folder];
    }),
  };
  return (
    <DocsLayout
      tree={tree}
      tabs={false}
      nav={{ title: <Brand />, url: href("/") }}
      githubUrl="https://github.com/OpenEnvision/GameMap"
      sidebar={{ defaultOpenLevel: 0 }}
      links={[{ type: "custom", on: "menu", children: <LearningNavigation /> }]}
    >
      {children}
    </DocsLayout>
  );
}
