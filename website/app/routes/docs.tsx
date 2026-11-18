import { use, useEffect } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { docs, source } from "../lib/source";
import { DocumentationLayout, DocumentationLanguage } from "../lib/docs";
import { documentBodyLocale, docMessages } from "../../content/doc-language";
import { localeFromPath } from "../../content/locale";
import { contentFor } from "../../content/registry.server";
import { retiredDocumentTarget } from "../../content/site";
import type { ContentEntry, DocumentMetadata } from "../../content/models";
import { mdxComponents } from "../components/mdx";
import { useSiteI18n } from "../lib/i18n";
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
  const { toc } = use(page.load()),
    Content = page.body,
    info = record.data,
    bodyLocale = documentBodyLocale(info.slug);
  const sourceLink = record.blocks.flatMap((block) =>
    block.field === "source" && block.type === "links" ? block.items : [],
  )[0];
  return (
    <DocsPage
      toc={toc}
      tabIndex={-1}
      data-content-key={record.key}
      data-content-kind="document"
    >
      <title>{`${record.title} — GameMap`}</title>
      <meta name="description" content={record.description} />
      <DocumentationLanguage
        locale={locale}
        slug={info.slug}
        manifest={manifest}
      />
      <DocsTitle className="reader-title" data-content-field="title">
        {record.title}
      </DocsTitle>
      {locale === "zh" && bodyLocale === "en" && (
        <span className="document-source-language">{t("English source")}</span>
      )}
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
