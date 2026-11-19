import { Link, useSiteI18n } from "../lib/i18n";

/** Shown on community pages in static builds, which have no community API. */
export function CommunityUnavailable() {
  const { t } = useSiteI18n();
  return (
    <p className="community-unavailable">
      {t(
        "Accounts, ratings, comments and game submissions need the GameMap community server, which this static site does not include.",
      )}{" "}
      <Link to="/examples/">{t("Browse all games")}</Link>
    </p>
  );
}
