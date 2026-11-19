import type { ReactNode } from "react";
import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "../components/site-shell";
import type { DocumentMetadata } from "../../content/models";
import { pages, url } from "../../content/site";
import {
  docLocale,
  docHome,
  docMessages,
  type DocLocale,
} from "../../content/doc-language";
import { communityEnabled } from "./community";
import { pillars, type Pillar } from "./pillars";
import { LanguageSwitcher, Link, useSiteI18n } from "./i18n";
export function documentGroups(manifest: readonly DocumentMetadata[]) {
  return [...new Set(manifest.map((page) => page.group))].map((title) => {
    const documents = manifest.filter((page) => page.group === title);
    return {
      title,
      description: documents[0].description,
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

/** A pillar's destinations as the docs link them. Community pages need the
 *  community API, so builds without it leave that link out. */
function destinations(pillar: Pillar) {
  return pillar.links.filter(
    (link) => communityEnabled || link.path !== pages.works.path,
  );
}
/** The docs are the "Learn" pillar's guides: marked, not aria-current, so the
 *  sidebar's current document stays the page's only current link. */
const isDocs = (path: string) => path === pages.docs.path;

/** The site's four pillars at the top of the docs sidebar (and the mobile
 *  drawer). root.tsx leaves the site header out of the reading room so that
 *  Fumadocs owns the layout; this keeps every GameMap destination one click
 *  away and works without JavaScript. */
function PillarRail() {
  const { t } = useSiteI18n();
  return (
    <nav className="docs-pillar-rail" aria-label={t("Main navigation")}>
      {pillars.map((pillar) => (
        <div
          key={pillar.id}
          className="docs-pillar"
          data-pillar={pillar.id}
          data-current={pillar.id === "learn" || undefined}
        >
          <span className="docs-pillar-label">{t(pillar.label)}</span>
          <ul>
            {destinations(pillar).map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  data-current={isDocs(link.path) || undefined}
                >
                  {t(link.title)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
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
                {destinations(pillar).map((link) => (
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
      nav={{ title: <Brand />, url: href("/") }}
      githubUrl="https://github.com/OpenEnvision/GameMap"
      links={[{ type: "custom", on: "menu", children: <PillarRail /> }]}
    >
      {children}
    </DocsLayout>
  );
}
