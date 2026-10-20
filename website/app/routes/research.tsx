import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowRight } from "lucide-react";
import { contentFor, sources } from "../../content/registry.server";
import { url } from "../../content/site";
import { ResearchBrowser } from "../components/research-browser";
import { Link, useSiteI18n } from "../lib/i18n";

export function loader({ request }: LoaderFunctionArgs) {
  return {
    records: contentFor(request).all("repository-research"),
    groups: sources.repositoryResearch.group_titles,
  };
}

export default function RepositoryResearch() {
  const { t } = useSiteI18n();
  const { records, groups } = useLoaderData<typeof loader>();
  return (
    <main id="main-content" className="site-main listing-page research-page">
      <title>{t("Repository research ledger — GameMap")}</title>
      <meta name="description" content={t("Find projects, inspect their source, and check the setup and usage terms.")} />
      <header className="page-heading research-heading">
        <h1>{t("Repository research")}</h1>
        <p>{t("Find projects, inspect their source, and check the setup and usage terms.")}</p>
        <div className="heading-links">
          <Link to={url.document("cadle-repositories")}>
            {t("Methodology & sources")}<ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/papers/">{t("Paper List")}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </header>
      <ResearchBrowser records={records} groups={groups} />
    </main>
  );
}
