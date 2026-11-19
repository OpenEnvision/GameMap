import { useEffect } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { contentFor } from "../../content/registry.server";
import { localeFromPath, localizedPath } from "../../content/locale";
import { pages } from "../../content/site";
import { useSiteI18n } from "../lib/i18n";

/** Preserve old listing and detail links, including on static hosts. */
export function loader({ params, request }: LoaderFunctionArgs) {
  const id = params.gameId?.replace(/\/$/, "");
  const entry = id ? contentFor(request).get("threejs-game", id) : null;
  if (id && !entry) throw new Response("Content not found", { status: 404 });
  const address = new URL(request.url);
  const base = import.meta.env.BASE_URL;
  const target =
    base.replace(/\/$/, "") +
    localizedPath(
      entry?.url || pages.examples.path,
      localeFromPath(address.pathname, base),
    ) +
    address.search;
  return { target };
}

export default function ThreejsGamesRedirect() {
  const { target } = useLoaderData<typeof loader>();
  const { t } = useSiteI18n();
  useEffect(() => {
    window.location.replace(target);
  }, [target]);
  return (
    <main id="main-content" className="site-main document-moved">
      <title>{t("Game examples — GameMap")}</title>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1>{t("Game examples")}</h1>
      <p>{t("This page now has a new address.")}</p>
      <a className="document-moved-link" href={target}>
        {t("Go to the new page")}
      </a>
    </main>
  );
}
