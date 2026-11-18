import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useClientQuery } from "../lib/client-query";
import { useCommunity, type CommunityWork } from "../lib/community";
import { Link, useSiteI18n } from "../lib/i18n";
import { CommunityPanel } from "../components/community";

export default function Work() {
  const [params] = useClientQuery(),
    id = params.get("id") || "",
    community = useCommunity(),
    request = community?.request,
    { t } = useSiteI18n();
  const [work, setWork] = useState<CommunityWork | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    setWork(null);
    setError("");
    if (!id || !request) return;
    void request<{ game: CommunityWork }>(
      "/games/" + encodeURIComponent("submission:" + id),
    )
      .then((value) => {
        if (active) setWork(value.game);
      })
      .catch(() => {
        if (active)
          setError(t("This work is not public, or is still under review."));
      });
    return () => {
      active = false;
    };
  }, [id, request]);
  return (
    <main id="main-content" className="site-main community-work-page">
      <title>
        {work ? `${work.title} — GameMap` : t("Community work — GameMap")}
      </title>
      <nav className="content-breadcrumb">
        <Link to="/examples/">{t("Game examples")}</Link>
      </nav>
      {!id ? (
        <div className="page-heading">
          <h1>{t("Discover what people are building.")}</h1>
          <Link to="/examples/">{t("Browse all games")}</Link>
        </div>
      ) : error ? (
        <div className="page-heading">
          <h1>{t("Work unavailable")}</h1>
          <p role="status">{error}</p>
        </div>
      ) : !work ? (
        <div className="page-heading">
          <h1>{t("Loading work…")}</h1>
        </div>
      ) : (
        <>
          <header className="page-heading">
            <span className="eyebrow">{t("CREATED BY THE COMMUNITY")}</span>
            <h1>{work.title}</h1>
            <p>
              {t("By {author}", { author: work.author })} ·{" "}
              {work.track.toUpperCase()} / {work.engine}
            </p>
            <div className="heading-links">
              <a
                className="button button-primary"
                href={work.url}
                target="_blank"
                rel="noreferrer"
              >
                {work.accessKind === "playable"
                  ? t("Play the game")
                  : t("Get the game")}
                <ArrowUpRight size={16} />
              </a>
              {work.sourceUrl && (
                <a href={work.sourceUrl} target="_blank" rel="noreferrer">
                  {t("Project source")}
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </header>
          <div className="community-work-gallery">
            {work.screenshots.map((image, index) => (
              <a
                href={`/community-media/${image}.webp`}
                target="_blank"
                rel="noreferrer"
                key={image}
              >
                <img
                  src={`/community-media/${image}.webp`}
                  alt={t("{title} screenshot {number}", {
                    title: work.title,
                    number: index + 1,
                  })}
                />
              </a>
            ))}
          </div>
          <section className="community-work-description">
            <h2>{t("About the game")}</h2>
            <p>{work.description}</p>
            <dl>
              <div>
                <dt>{t("License")}</dt>
                <dd>
                  {work.license ||
                    t("Not specified. Inclusion does not grant reuse rights.")}
                </dd>
              </div>
              <div>
                <dt>{t("AI use declaration")}</dt>
                <dd>
                  {work.aiUse === "none"
                    ? t("The author states no AI was used.")
                    : work.aiUse === "assisted"
                      ? t("The author states AI assisted development.")
                      : work.aiUse === "generated"
                        ? t(
                            "The author states this was primarily AI-generated.",
                          )
                        : t("The author has not made an AI-use claim.")}
                </dd>
              </div>
            </dl>
            <p className="community-disclaimer">
              {t(
                "Approval permits community display; it is not an independent playtest or a copyright certification.",
              )}
            </p>
          </section>
          <CommunityPanel gameKey={"submission:" + id} />
        </>
      )}
    </main>
  );
}
