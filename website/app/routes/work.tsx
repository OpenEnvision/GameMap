import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useClientQuery } from "../lib/client-query";
import { useCommunity, type CommunityWork } from "../lib/community";
import { Link, useSiteI18n } from "../lib/i18n";
import { CommunityPanel } from "../components/community";
import { CommunityUnavailable } from "../components/community-unavailable";

/** A community submission, staged like a game premiere: the first screenshot
 *  becomes the backdrop, the rest scroll in a horizontal reel. */
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
  const cover = work?.screenshots[0];
  const crumb = (
    <nav className="content-breadcrumb gallery-work-crumb">
      <Link to="/examples/">
        <ArrowLeft size={14} aria-hidden="true" />
        {t("Game examples")}
      </Link>
    </nav>
  );
  return (
    <main
      id="main-content"
      className="site-main community-work-page gallery-work-page"
    >
      <title>
        {work ? `${work.title} — GameMap` : t("Community work — GameMap")}
      </title>
      {!id || error || !work ? (
        <header className="gallery-work-hero gallery-work-hero-plain">
          <div className="gallery-work-backdrop" aria-hidden="true" />
          {crumb}
          <span className="kicker">{t("Community work")}</span>
          {!community ? (
            <>
              <h1>{t("Discover what people are building.")}</h1>
              <CommunityUnavailable />
            </>
          ) : !id ? (
            <>
              <h1>{t("Discover what people are building.")}</h1>
              <div className="gallery-work-actions">
                <Link className="button button-primary" to="/examples/">
                  {t("Browse all games")}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </>
          ) : error ? (
            <>
              <h1>{t("Work unavailable")}</h1>
              <p className="lede" role="status">
                {error}
              </p>
              <div className="gallery-work-actions">
                <Link className="button button-secondary" to="/examples/">
                  {t("Browse all games")}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </>
          ) : (
            <h1 aria-busy="true">{t("Loading work…")}</h1>
          )}
        </header>
      ) : (
        <>
          <header className="gallery-work-hero">
            <div className="gallery-work-backdrop" aria-hidden="true">
              {cover && (
                <img
                  src={`/community-media/${cover}.webp`}
                  alt=""
                  width={work.preview?.width || 1280}
                  height={work.preview?.height || 720}
                />
              )}
            </div>
            {crumb}
            <span className="kicker">{t("CREATED BY THE COMMUNITY")}</span>
            <h1>{work.title}</h1>
            <p className="gallery-work-byline">
              <span>{t("By {author}", { author: work.author })}</span>
              <span className="gallery-work-spec">
                {work.track.toUpperCase()} / {work.engine}
              </span>
            </p>
            <div className="gallery-work-actions">
              <a
                className="button button-primary"
                href={work.url}
                target="_blank"
                rel="noreferrer"
              >
                {work.accessKind === "playable"
                  ? t("Play the game")
                  : t("Get the game")}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {work.sourceUrl && (
                <a
                  className="button button-secondary"
                  href={work.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Project source")}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </header>
          {work.screenshots.length > 0 && (
            <div
              className="community-work-gallery"
              data-count={work.screenshots.length}
            >
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
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-work-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}
            </div>
          )}
          <section className="community-work-description">
            <div className="gallery-work-about">
              <h2>{t("About the game")}</h2>
              <p>{work.description}</p>
            </div>
            <aside className="gallery-work-facts">
              <dl>
                <div>
                  <dt>{t("License")}</dt>
                  <dd>
                    {work.license ||
                      t(
                        "Not specified. Inclusion does not grant reuse rights.",
                      )}
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
            </aside>
          </section>
          <CommunityPanel gameKey={"submission:" + id} />
        </>
      )}
    </main>
  );
}
