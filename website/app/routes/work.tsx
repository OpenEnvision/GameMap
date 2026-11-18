import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useClientQuery } from "../lib/client-query";
import {
  useCommunity,
  useCommunityText,
  type CommunityWork,
} from "../lib/community";
import { Link } from "../lib/i18n";
import { CommunityPanel } from "../components/community";

export default function Work() {
  const [params] = useClientQuery(),
    id = params.get("id") || "",
    community = useCommunity(),
    request = community?.request,
    text = useCommunityText();
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
          setError(
            text(
              "This work is not public, or is still under review.",
              "作品尚未公开、仍在审核中，或暂时无法读取。",
            ),
          );
      });
    return () => {
      active = false;
    };
  }, [id, request]);
  return (
    <main id="main-content" className="site-main community-work-page">
      <title>
        {work
          ? `${work.title} — GameMap`
          : text("Community work — GameMap", "用户作品 — GameMap")}
      </title>
      <nav className="content-breadcrumb">
        <Link to="/examples/">{text("Game examples", "游戏案例")}</Link>
      </nav>
      {!id ? (
        <div className="page-heading">
          <h1>
            {text(
              "Discover what people are building.",
              "发现大家正在创作的游戏。",
            )}
          </h1>
          <Link to="/examples/">
            {text("Browse all games", "浏览全部游戏")}
          </Link>
        </div>
      ) : error ? (
        <div className="page-heading">
          <h1>{text("Work unavailable", "暂时无法查看作品")}</h1>
          <p role="status">{error}</p>
        </div>
      ) : !work ? (
        <div className="page-heading">
          <h1>{text("Loading work…", "正在加载作品…")}</h1>
        </div>
      ) : (
        <>
          <header className="page-heading">
            <span className="eyebrow">
              {text("CREATED BY THE COMMUNITY", "用户创作")}
            </span>
            <h1>{work.title}</h1>
            <p>
              {text("By ", "作者：")}
              {work.author} · {work.track.toUpperCase()} / {work.engine}
            </p>
            <div className="heading-links">
              <a
                className="button button-primary"
                href={work.url}
                target="_blank"
                rel="noreferrer"
              >
                {work.accessKind === "playable"
                  ? text("Play the game", "试玩游戏")
                  : text("Get the game", "下载游戏")}
                <ArrowUpRight size={16} />
              </a>
              {work.sourceUrl && (
                <a href={work.sourceUrl} target="_blank" rel="noreferrer">
                  {text("Project source", "项目源码")}
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
                  alt={text(
                    `${work.title} screenshot ${index + 1}`,
                    `${work.title} 游戏截图 ${index + 1}`,
                  )}
                />
              </a>
            ))}
          </div>
          <section className="community-work-description">
            <h2>{text("About the game", "作品介绍")}</h2>
            <p>{work.description}</p>
            <dl>
              <div>
                <dt>{text("License", "许可与复用")}</dt>
                <dd>
                  {work.license ||
                    text(
                      "Not specified. Inclusion does not grant reuse rights.",
                      "作者未说明，收录不代表可以自由复用。",
                    )}
                </dd>
              </div>
              <div>
                <dt>{text("AI use declaration", "AI 使用声明")}</dt>
                <dd>
                  {work.aiUse === "none"
                    ? text(
                        "The author states no AI was used.",
                        "作者声明未使用 AI。",
                      )
                    : work.aiUse === "assisted"
                      ? text(
                          "The author states AI assisted development.",
                          "作者声明使用 AI 辅助开发。",
                        )
                      : work.aiUse === "generated"
                        ? text(
                            "The author states this was primarily AI-generated.",
                            "作者声明作品主要由 AI 生成。",
                          )
                        : text(
                            "The author has not made an AI-use claim.",
                            "作者未作 AI 使用声明。",
                          )}
                </dd>
              </div>
            </dl>
            <p className="community-disclaimer">
              {text(
                "Approval permits community display; it is not an independent playtest or a copyright certification.",
                "审核通过仅表示允许在社区展示，不代表平台已独立试玩或认证版权。",
              )}
            </p>
          </section>
          <CommunityPanel gameKey={"submission:" + id} />
        </>
      )}
    </main>
  );
}
