import { use } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { docs, source } from "../lib/source";
import { DocumentationLayout } from "../lib/docs";
import { content } from "../../content/registry";
import { mdxComponents } from "../components/mdx";

export async function loader({ params }: LoaderFunctionArgs) {
  const slugs = (params["*"] || "").split("/").filter(Boolean);
  const page = source.getPage(slugs);
  if (!page) throw new Response("Document not found", { status: 404 });
  await docs.getPage(page.path)?.preload();
  return { path: page.path, slug: slugs.join("/") };
}

function Document({ path, slug }: { path: string; slug: string }) {
  const page = docs.getPage(path);
  if (!page) throw new Error("Document is unavailable");
  const { toc } = use(page.load());
  const Content = page.body;
  const record = content.require("document", slug);
  const info = record.data;
  return (
    <DocsPage
      toc={toc}
      tabIndex={-1}
      data-content-key={record.key}
      data-content-kind="document"
    >
      <title>{page.title} — GameMap</title>
      <meta name="description" content={page.description} />
      <DocsTitle data-content-field="title">{page.title}</DocsTitle>
      <DocsDescription
        className="document-description"
        data-content-field="description"
      >
        {page.description}
      </DocsDescription>
      {info && (
        <div className="document-source">
          <span>GAMEMAP FIELD NOTES</span>
          <a
            data-content-field="source"
            href={`https://github.com/OpenEnvision/GameMap/blob/main/${info.source}`}
            target="_blank"
            rel="noreferrer"
          >
            View Markdown source ↗
          </a>
        </div>
      )}
      <DocsBody>
        <Content components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export default function Docs() {
  const { path, slug } = useLoaderData<typeof loader>();
  return (
    <DocumentationLayout>
      <Document path={path} slug={slug} />
    </DocumentationLayout>
  );
}
