import { use } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { docs, source } from "../lib/source";
import { DocumentationLayout, DocumentationLanguage } from "../lib/docs";
import { docLocale, docMessages } from "../../content/doc-language";
import { localeFromPath } from "../../content/locale";
import { contentFor } from "../../content/registry.server";
import type { ContentEntry, DocumentMetadata } from "../../content/models";
import { mdxComponents } from "../components/mdx";
import { useSiteI18n } from "../lib/i18n";
export async function loader({ params, request }: LoaderFunctionArgs) {
  const content = contentFor(request),
    locale = localeFromPath(
      new URL(request.url).pathname,
      import.meta.env.BASE_URL,
    );
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
  };
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
    bodyLocale = docLocale(info.slug);
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
      <DocsTitle data-content-field="title">{record.title}</DocsTitle>
      {locale === "zh" && bodyLocale === "en" && (
        <span className="document-source-language">{t("English source")}</span>
      )}
      <DocsBody lang={bodyLocale === "zh" ? "zh-CN" : "en"}>
        <Content components={mdxComponents} />
      </DocsBody>
      <details className="document-information">
        <summary>{text.pageInfo}</summary>
        <p data-content-field="description">{record.description}</p>
        <a
          data-content-field="source"
          href={`https://github.com/OpenEnvision/GameMap/blob/main/${info.source}`}
          target="_blank"
          rel="noreferrer"
        >
          {text.source}
        </a>
      </details>
    </DocsPage>
  );
}
export default function Docs() {
  const { path, record, manifest, locale } = useLoaderData<typeof loader>();
  return (
    <DocumentationLayout manifest={manifest} locale={locale}>
      <Document path={path} record={record} manifest={manifest} />
    </DocumentationLayout>
  );
}
