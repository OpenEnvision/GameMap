import { use } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import {
  DocsBody,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { docs, source } from "../lib/source";
import { DocumentationLayout, DocumentationLanguage } from '../lib/docs';
import { docLocale, docMessages } from '../../content/doc-language';
import { content } from '../../content/registry.server';
import type { ContentEntry } from '../../content/models';
import { mdxComponents } from "../components/mdx";

export async function loader({ params }: LoaderFunctionArgs) {
  const slugs = (params["*"] || "").split("/").filter(Boolean);
  const page = source.getPage(slugs);
  if (!page) throw new Response("Document not found", { status: 404 });
  await docs.getPage(page.path)?.preload();
  return { path: page.path, record: content.require('document', slugs.join('/')), manifest: content.all('document').map(entry => entry.data) };
}

function Document({ path, record, manifest }: { path: string; record: ContentEntry<'document'>; manifest:ContentEntry<'document'>['data'][] }) {
  const page = docs.getPage(path);
  if (!page) throw new Error("Document is unavailable");
  const { toc } = use(page.load());
  const Content = page.body;
  const info = record.data;
  const locale=docLocale(info.slug), text=docMessages(locale);
  return (
    <DocsPage
      toc={toc}
      tabIndex={-1}
      data-content-key={record.key}
      data-content-kind="document"
    >
      <title>{page.title} — GameMap</title>
      <meta name="description" content={page.description} />
      <DocumentationLanguage locale={locale} slug={info.slug} manifest={manifest}/>
      <DocsTitle data-content-field="title">{page.title}</DocsTitle>
      <DocsBody>
        <Content components={mdxComponents} />
      </DocsBody>
      <details className="document-information"><summary>{text.pageInfo}</summary><p data-content-field="description">{page.description}</p><a data-content-field="source" href={`https://github.com/OpenEnvision/GameMap/blob/main/${info.source}`} target="_blank" rel="noreferrer">{text.source}</a></details>
    </DocsPage>
  );
}

export default function Docs() {
  const { path, record, manifest } = useLoaderData<typeof loader>();
  return (
    <DocumentationLayout manifest={manifest} locale={docLocale(record.id)}>
      <Document path={path} record={record} manifest={manifest} />
    </DocumentationLayout>
  );
}
