import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import {
  DocsPage,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/layouts/docs/page";
import {
  DocumentationLayout,
  DocumentationLanguage,
  documentGroups,
  documentationViews,
} from "../lib/docs";
import { contentFor } from "../../content/registry.server";
import { docLocale, docMessages } from "../../content/doc-language";
import { localeFromPath } from "../../content/locale";
import { url } from "../../content/site";
import { Link, useSiteI18n } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  return {
    manifest: contentFor(request)
      .all("document")
      .map((entry) => entry.data),
    locale: localeFromPath(
      new URL(request.url).pathname,
      import.meta.env.BASE_URL,
    ),
  };
}
export default function DocsIndex() {
  const { manifest, locale } = useLoaderData<typeof loader>(),
    text = docMessages(locale),
    { t } = useSiteI18n(),
    groups = documentGroups(documentationViews(manifest, locale));
  return (
    <DocumentationLayout manifest={manifest} locale={locale}>
      <DocsPage full tabIndex={-1} tableOfContent={{ enabled: false }}>
        <title>{`${text.title} — GameMap`}</title>
        <meta name="description" content={text.intro} />
        <DocumentationLanguage locale={locale} manifest={manifest} />
        <DocsTitle>{text.title}</DocsTitle>
        <DocsDescription className="document-description">
          {text.intro}
        </DocsDescription>
        <Link
          className="docs-start"
          to={url.document(
            locale === "zh" ? "zh/practical-guide" : "practical-guide",
          )}
        >
          <span className="docs-start-icon">
            <Compass size={25} />
          </span>
          <span>
            <strong>{text.start}</strong>
            <small>{text.startDetail}</small>
          </span>
          <ArrowRight size={20} />
        </Link>
        {locale === "zh" && (
          <p className="reading-note">{text.originalsNote}</p>
        )}
        <div className="docs-groups">
          {groups.map((group) => (
            <section key={group.title}>
              <h2>
                <BookOpen size={17} />
                {t(group.title)}
              </h2>
              <p>{t(group.description)}</p>
              <div>
                {group.pages.map(([slug, title]) => (
                  <Link
                    key={slug}
                    to={url.document(slug)}
                    data-content-ref={`document:${slug}`}
                  >
                    {t(title)}
                    {locale === "zh" && docLocale(slug) === "en" && (
                      <span className="source-language">EN</span>
                    )}
                    <ArrowRight size={15} />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </DocsPage>
    </DocumentationLayout>
  );
}
