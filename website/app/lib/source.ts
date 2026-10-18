import { defineDocs } from "fumadocs-mdx/macro";
import { loader } from "fumadocs-core/source";

export const docs = defineDocs({
  dir: "website/.content/docs",
  docs: { async: true },
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
