import { use, useEffect } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowRight } from "lucide-react";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { docs, source } from "../lib/source";
import {
  DocumentationLayout,
  DocumentationLanguage,
  DocumentationSiteBand,
} from "../lib/docs";
import { Brand } from "../components/site-shell";
import { documentBodyLocale, docMessages } from "../../content/doc-language";
import { localeFromPath } from "../../content/locale";
import { contentFor } from "../../content/registry.server";
import { retiredDocumentTarget } from "../../content/site";
import type { ContentEntry, DocumentMetadata } from "../../content/models";
import { mdxComponents } from "../components/mdx";
import { Link, useSiteI18n } from "../lib/i18n";
export async function loader({ params, request }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname;
  const redirectTarget = retiredDocumentTarget(
    pathname,
    import.meta.env.BASE_URL,
  );
  const locale = localeFromPath(pathname, import.meta.env.BASE_URL);
  const content = contentFor(request);
  if (redirectTarget) {
    // Name the new home of a document that moved into a topic folder.
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const slug = redirectTarget
      .slice(base.length)
      .match(/^\/docs\/(.+?)\/?$/)?.[1];
    return {
      redirectTarget,
      movedTitle: (slug && content.get("document", slug)?.title) || null,
      path: null,
      record: null,
      manifest: [],
      locale,
    };
  }
  const requested = (params["*"] || "").split("/").filter(Boolean).join("/");
  const original = requested.startsWith("zh/") ? requested.slice(3) : null;
  const workingFallback =
    import.meta.env.DEV &&
    original &&
    !content.get("document", requested) &&
    content.get("document", original)?.data.sourceMode === "generated";
  const id =
    workingFallback && original
      ? original
      : locale === "zh" &&
          !requested.startsWith("zh/") &&
          content.get("document", `zh/${requested}`)
        ? `zh/${requested}`
        : requested;
  const page = source.getPage(id.split("/"));
  if (!page) throw new Response("Document not found", { status: 404 });
  await docs.getPage(page.path)?.preload();
  return {
    path: page.path,
    record: content.require("document", id),
    manifest: content.all("document").map((entry) => entry.data),
    locale,
    redirectTarget: null,
    movedTitle: null,
  };
}
/** A retired document address. Game catalogs moved to Game examples; other
 *  documents moved into topic folders. Static hosts follow the meta refresh,
 *  hydrated pages replace the location; either way this shows only briefly. */
function MovedDocument({
  target,
  title,
}: {
  target: string;
  title: string | null;
}) {
  const { t } = useSiteI18n();
  useEffect(() => {
    window.location.replace(target);
  }, [target]);
  const base = import.meta.env.BASE_URL.replace(/\/$/, ""),
    games = /^\/(?:zh\/)?examples\//.test(
      target.startsWith(base + "/") ? target.slice(base.length) : target,
    );
  return (
    <main id="main-content" className="site-main document-moved">
      <title>
        {games ? t("Game examples — GameMap") : t("Page moved — GameMap")}
      </title>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <link rel="canonical" href={target} />
      <Link
        to="/"
        className="document-moved-brand"
        aria-label={t("GameMap home")}
      >
        <Brand />
      </Link>
      <h1>{games ? t("Game examples") : t("Page moved")}</h1>
      <p>{t("This page now has a new address.")}</p>
      <a className="document-moved-link" href={target}>
        <span>
          {games ? t("Game examples") : title || t("Go to the new page")}
        </span>
        <ArrowRight size={17} aria-hidden="true" />
      </a>
    </main>
  );
}
function Document({
  path,
  record,
  manifest,
}: {
  path: string;
  record: ContentEntry<"document">;
  manifest: DocumentMetadata[];
}) {
  const { locale, t } = useSiteI18n(),
    text = docMessages(locale),
    page = docs.getPage(path);
  if (!page) throw new Error("Document is unavailable");
  const { toc } = use(page.load()),
    Content = page.body,
    info = record.data,
    bodyLocale = documentBodyLocale(info.slug);
  const sourceLink = record.blocks.flatMap((block) =>
    block.field === "source" && block.type === "links" ? block.items : [],
  )[0];
  const sections = toc.filter((item) => item.depth <= 2).length;
  return (
    <DocsPage
      toc={toc}
      tabIndex={-1}
      breadcrumb={{ enabled: false }}
      footer={{
        className: "reader-pager",
        children: <DocumentationSiteBand />,
      }}
      className="reader-page"
      data-content-key={record.key}
      data-content-kind="document"
    >
      <title>{`${record.title} — GameMap`}</title>
      <meta name="description" content={record.description} />
      <header className="reader-masthead">
        <div className="reader-masthead-bar">
          <DocumentationLanguage
            locale={locale}
            slug={info.slug}
            manifest={manifest}
          />
        </div>
        <DocsTitle className="reader-title" data-content-field="title">
          {record.title}
        </DocsTitle>
        <ul className="reader-meta">
          {sections > 0 && (
            <li>
              {sections === 1
                ? t("1 section")
                : t("{count} sections", { count: sections })}
            </li>
          )}
          {locale === "zh" && bodyLocale === "en" && (
            <li className="document-source-language">{t("English source")}</li>
          )}
        </ul>
      </header>
      <DocsBody
        className="reader-prose"
        lang={bodyLocale === "zh" ? "zh-CN" : "en"}
      >
        <Content components={mdxComponents} />
      </DocsBody>
      <details className="document-information">
        <summary>{text.pageInfo}</summary>
        <p data-content-field="description">{record.description}</p>
        <a
          data-content-field="source"
          href={sourceLink.url}
          target="_blank"
          rel="noreferrer"
        >
          {info.sourceMode === "generated" ? text.generatedSource : text.source}
        </a>
      </details>
    </DocsPage>
  );
}
export default function Docs() {
  const { path, record, manifest, locale, redirectTarget, movedTitle } =
    useLoaderData<typeof loader>();
  if (redirectTarget)
    return <MovedDocument target={redirectTarget} title={movedTitle} />;
  if (!path || !record) throw new Error("Document is unavailable");
  return (
    <DocumentationLayout manifest={manifest} locale={locale}>
      <Document path={path} record={record} manifest={manifest} />
    </DocumentationLayout>
  );
}
