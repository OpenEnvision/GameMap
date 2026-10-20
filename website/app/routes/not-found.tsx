import { Link, useSiteI18n } from "../lib/i18n";
export default function NotFound() {
  const { t } = useSiteI18n();
  return (
    <main id="main-content" className="error-page">
      <title>{t("Page not found — GameMap")}</title>
      <meta name="robots" content="noindex" />
      <span className="eyebrow">{t("404 / OFF THE MAP")}</span>
      <h1>{t("This path is still uncharted.")}</h1>
      <p>
        {t(
          "Find a working starting point in the resource library, or explore the guides.",
        )}
      </p>
      <Link className="button button-primary" to="/resources/">
        {t("Explore resources")}
      </Link>
    </main>
  );
}
