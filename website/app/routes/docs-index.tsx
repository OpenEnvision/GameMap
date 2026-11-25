import { DocsPage } from "fumadocs-ui/layouts/docs/page";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Link, useSiteI18n } from "../lib/i18n";
import {
  DocumentationLayout,
  DocumentationLanguage,
  DocumentationSiteBand,
  documentGroups,
  documentationViews,
} from "../lib/docs";
import { contentFor } from "../../content/registry.server";
import { localeFromPath } from "../../content/locale";
import {
  appliedLearningPaths,
  learningBlockers,
  learningDocument,
  learningPaths,
} from "../../content/learning-hub";
import { url } from "../../content/site";

export function loader({ request }: LoaderFunctionArgs) {
  return {
    locale: localeFromPath(
      new URL(request.url).pathname,
      import.meta.env.BASE_URL,
    ),
    manifest: contentFor(request)
      .all("document")
      .map((entry) => entry.data),
  };
}

export default function DocsIndex() {
  const { manifest, locale } = useLoaderData<typeof loader>();
  const { t } = useSiteI18n();
  const resolve = (id: string) => learningDocument(manifest, locale, id);
  const library = documentGroups(documentationViews(manifest, locale));
  return (
    <DocumentationLayout manifest={manifest} locale={locale}>
      <DocsPage
        full
        toc={[]}
        tableOfContent={{ enabled: false }}
        tableOfContentPopover={{ enabled: false }}
        breadcrumb={{ enabled: false }}
        footer={{ enabled: false }}
        className="learn-hub"
      >
        <title>{`${t("Game development handbook")} — GameMap`}</title>
        <meta
          name="description"
          content={t(
            "Field notes for Godot prototyping, playtesting, engine work, and evaluating AI in games.",
          )}
        />
        <header className="learn-hub-header">
          <div className="learn-hub-topline">
            <h1>{t("Game development handbook")}</h1>
            <DocumentationLanguage manifest={manifest} locale={locale} />
          </div>
          <p>
            {t(
              "Make a prototype, work through an engine problem, or get a second opinion on an AI demo. The guides are organized around the work on your desk.",
            )}
          </p>
        </header>
        <section aria-labelledby="learning-paths-title">
          <h2 id="learning-paths-title">{t("Start here")}</h2>
          <div className="learn-paths">
            {learningPaths.map((path) => {
              const doc = resolve(path.id);
              if (!doc) return null;
              return (
                <article
                  className="learn-path"
                  key={path.id}
                  data-learning-path={path.id}
                >
                  <h3>
                    <Link to={doc.url}>{t(path.title)}</Link>
                  </h3>
                  <p>{t(path.action)}</p>
                </article>
              );
            })}
          </div>
        </section>
        <div className="learn-workbench">
          <section aria-labelledby="learning-blockers-title">
            <h2 id="learning-blockers-title">{t("On a project")}</h2>
            {learningBlockers.map((blocker) => {
              const docs = blocker.ids
                .map(resolve)
                .filter((doc) => doc !== null);
              if (!docs.length) return null;
              return (
                <article className="learn-blocker" key={blocker.question}>
                  <h3>{t(blocker.question)}</h3>
                  <p>{t(blocker.action)}</p>
                  <ul>
                    {docs.map((doc) => (
                      <li key={doc.slug}>
                        <Link to={doc.url}>{t(doc.label)}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </section>
          <section aria-labelledby="applied-learning-title">
            <h2 id="applied-learning-title">{t("AI in games")}</h2>
            {appliedLearningPaths.map((path) => {
              const docs = path.ids.map(resolve).filter((doc) => doc !== null);
              if (!docs.length) return null;
              return (
                <article className="learn-applied-path" key={path.title}>
                  <h3>{t(path.title)}</h3>
                  <p>{t(path.action)}</p>
                  <ul>
                    {docs.map((doc) => (
                      <li key={doc.slug}>
                        <Link to={doc.url}>{t(doc.label)}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </section>
        </div>
        <section
          className="learn-library"
          aria-labelledby="learning-library-title"
        >
          <h2 id="learning-library-title">{t("All guides and notes")}</h2>
          <div className="learn-library-groups">
            {library.map((group) => (
              <details key={group.title}>
                <summary>
                  {t(group.title)}
                  <span aria-hidden="true">{group.pages.length}</span>
                </summary>
                {group.sections.map((section) => (
                  <div key={section.title} className="learn-library-section">
                    {section.title && <h3>{t(section.title)}</h3>}
                    <ul>
                      {section.pages.map(([slug, label]) => (
                        <li key={slug}>
                          <Link to={url.document(slug)}>
                            {t(label)}
                            {locale === "zh" && !slug.startsWith("zh/")
                              ? " · EN"
                              : ""}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </details>
            ))}
          </div>
        </section>
        <DocumentationSiteBand />
      </DocsPage>
    </DocumentationLayout>
  );
}
