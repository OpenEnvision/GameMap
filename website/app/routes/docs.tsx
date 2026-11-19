import { use, useEffect } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ChevronRight } from "lucide-react";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { docs, source } from "../lib/source";
import { DocumentationLayout, DocumentationLanguage } from "../lib/docs";
import {
  docHome,
  documentBodyLocale,
  docMessages,
} from "../../content/doc-language";
import { localeFromPath } from "../../content/locale";
import { contentFor } from "../../content/registry.server";
import { retiredDocumentTarget } from "../../content/site";
import type { ContentEntry, DocumentMetadata } from "../../content/models";
import { mdxComponents } from "../components/mdx";
import { Link, useSiteI18n } from "../lib/i18n";
/** Reading time from the compiled document's own text: Latin words at
 *  ~230 per minute and CJK characters at ~400 per minute. */
function readingMinutes(texts: readonly string[]) {
  const text = texts.join(" ");
  const cjk = text.match(/[\u3400-\u9fff\uf900-\ufaff]/g)?.length ?? 0;
  const words =
    text.replace(/[\u3400-\u9fff\uf900-\ufaff]/g, " ").match(/[\p{L}\p{N}]+/gu)
      ?.length ?? 0;
  return Math.max(1, Math.round(words / 230 + cjk / 400));
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname;
  const redirectTarget = retiredDocumentTarget(
    pathname,
    import.meta.env.BASE_URL,
  );
  const locale = localeFromPath(pathname, import.meta.env.BASE_URL);
  if (redirectTarget)
    return { redirectTarget, path: null, record: null, manifest: [], locale };
  const content = contentFor(request);
  const requested = (params["*"] || "").split("/").filter(Boolean).join("/");
  const id =
    locale === "zh" &&
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
  };
}
function RetiredGameDocument({ target }: { target: string }) {
  const { t } = useSiteI18n();
  useEffect(() => {
    window.location.replace(target);
  }, [target]);
  return (
    <main id="main-content" className="site-main">
      <title>{t("Game examples — GameMap")}</title>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <link rel="canonical" href={target} />
      <h1>{t("Game examples")}</h1>
      <a href={target}>{t("Game examples")}</a>
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
  const { toc, structuredData } = use(page.load()),
    Content = page.body,
    info = record.data,
    bodyLocale = documentBodyLocale(info.slug);
  const sourceLink = record.blocks.flatMap((block) =>
    block.field === "source" && block.type === "links" ? block.items : [],
  )[0];
  const sections = toc.filter((item) => item.depth <= 2).length,
    minutes = readingMinutes([
      ...(structuredData?.headings ?? []).map((heading) => heading.content),
      ...(structuredData?.contents ?? []).map((content) => content.content),
    ]);
  return (
    <DocsPage
      toc={toc}
      tabIndex={-1}
      breadcrumb={{ enabled: false }}
      footer={{ className: "reader-pager" }}
      className="reader-page"
      data-content-key={record.key}
      data-content-kind="document"
    >
      <title>{`${record.title} — GameMap`}</title>
      <meta name="description" content={record.description} />
      <header className="reader-masthead">
        <div className="reader-masthead-bar">
          <nav className="reader-trail" aria-label={t("Breadcrumb")}>
            <Link to={docHome(locale)}>{text.title}</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span>{t(info.group)}</span>
          </nav>
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
          <li>{t("{count} min read", { count: minutes })}</li>
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
  const { path, record, manifest, locale, redirectTarget } =
    useLoaderData<typeof loader>();
  if (redirectTarget) return <RetiredGameDocument target={redirectTarget} />;
  if (!path || !record) throw new Error("Document is unavailable");
  return (
    <DocumentationLayout manifest={manifest} locale={locale}>
      <Document path={path} record={record} manifest={manifest} />
    </DocumentationLayout>
  );
}
