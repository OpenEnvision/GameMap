import { defineDocs } from "fumadocs-mdx/macro";
import { loader } from "fumadocs-core/source";

/** Documents prepared for the database working preview. The development catalog plugin
 * selects this module instead of ./source; builds never import it. The directory matches
 * developmentContentDirectory in scripts/lib/catalog/site-input.mjs. */
export const docs = defineDocs({
  dir: ".build/catalog-local/development/content/docs",
  docs: { async: true },
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
