import { useEffect } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { useSiteI18n } from "../lib/i18n";
import { contentFor } from "../../content/registry.server";
import { localeFromPath } from "../../content/locale";
import { url } from "../../content/site";

const starters = ["guides/practical-guide", "guides/reading-guide"];

/** Open the first available starting guide in the selected language. */
export function loader({ request }: LoaderFunctionArgs) {
  const locale = localeFromPath(
    new URL(request.url).pathname,
    import.meta.env.BASE_URL,
  );
  const content = contentFor(request);
  const slug = starters
    .map((id) => (locale === "zh" ? `zh/${id}` : id))
    .find((id) => content.get("document", id));
  if (!slug) throw new Response("Document not found", { status: 404 });
  return {
    target: import.meta.env.BASE_URL.replace(/\/$/, "") + url.document(slug),
  };
}

export default function DocsIndex() {
  const { target } = useLoaderData<typeof loader>();
  const { t } = useSiteI18n();
  useEffect(() => {
    window.location.replace(target);
  }, [target]);
  return (
    <main id="nd-page" className="site-main document-moved">
      <title>{`${t("Guides & notes")} — GameMap`}</title>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1>{t("Guides & notes")}</h1>
      <p>{t("This page now has a new address.")}</p>
      <a className="document-moved-link" href={target}>
        {t("Go to the new page")}
      </a>
    </main>
  );
}
