import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Star, UserRound, Plus } from "lucide-react";
import { useLocation } from "react-router";
import { useHydrated } from "../lib/client-query";
import { Link, useSiteI18n } from "../lib/i18n";
import {
  useCommunity,
  useCommunityText,
  type GameStats,
} from "../lib/community";

export function CommunityAccountLink() {
  const community = useCommunity(),
    text = useCommunityText();
  if (!community) return null;
  return (
    <>
      <Link className="community-submit-link" to="/submit/">
        <Plus size={15} />
        <span>{text("Submit a game", "提交作品")}</span>
      </Link>
      <Link className="community-account-link" to="/account/">
        <UserRound size={16} />
        <span>{community.user?.displayName || text("Sign in", "登录")}</span>
      </Link>
    </>
  );
}
export function RatingSummary({
  gameKey,
  recordUrl,
}: {
  gameKey: string;
  recordUrl: string;
}) {
  const community = useCommunity(),
    text = useCommunityText(),
    userId = community?.user?.id,
    load = community?.loadStats;
  useEffect(() => {
    load?.([gameKey]);
  }, [load, gameKey, userId, community?.version]);
  if (!community) return null;
  const score = community.stats[gameKey];
  return (
    <Link
      className="game-rating-summary"
      to={recordUrl + (recordUrl.includes("#") ? "" : "#community")}
      aria-label={text("Ratings and comments", "评分与评论")}
      data-community-game={gameKey}
    >
      <Star
        size={14}
        fill={score?.count ? "currentColor" : "none"}
        aria-hidden="true"
      />
      <span>
        {score
          ? score.count
            ? `${Number(score.average).toFixed(1)} / 5`
            : text("Not rated yet", "暂无评分")
          : community.unavailable
            ? text("Ratings unavailable", "评分暂不可用")
            : text("Ratings & comments", "评分与评论")}
      </span>
      {score && (
        <small>{text(`${score.count} ratings`, `${score.count} 人评分`)}</small>
      )}
      {score && score.comments > 0 && (
        <small>
          <MessageCircle size={12} />
          {score.comments}
        </small>
      )}
    </Link>
  );
}

type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: string;
  mine: boolean;
};
type Discussion = {
  game: { title: string };
  stats: GameStats;
  comments: Comment[];
};
export function CommunityPanel({ gameKey }: { gameKey: string }) {
  const community = useCommunity(),
    text = useCommunityText(),
    { locale } = useSiteI18n();
  const request = community?.request,
    updateStats = community?.updateStats,
    userId = community?.user?.id;
  const [discussion, setDiscussion] = useState<Discussion | null>(null),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [body, setBody] = useState(""),
    [reportId, setReportId] = useState(""),
    [reason, setReason] = useState("");
  const reload = useCallback(async () => {
    if (!request) {
      setLoading(false);
      return;
    }
    try {
      const value = await request<Discussion>(
        "/games/" + encodeURIComponent(gameKey),
      );
      setDiscussion(value);
      setHasMore(value.comments.length === 30);
      updateStats?.(gameKey, value.stats);
      setError("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Community unavailable",
      );
    } finally {
      setLoading(false);
    }
  }, [request, gameKey, updateStats]);
  useEffect(() => {
    setLoading(true);
    setDiscussion(null);
    void reload();
  }, [reload, userId]);
  const action = async (work: () => Promise<void>) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await work();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };
  const score = discussion?.stats;
  const location = useLocation(), hydrated = useHydrated();
  const loginURL =
    "/account/?returnTo=" +
    encodeURIComponent(
      location.pathname + (hydrated ? location.search : "") + "#community",
    );
  return (
    <section
      id="community"
      className="community-panel"
      aria-labelledby="community-heading"
    >
      <div className="community-section-heading">
        <div>
          <span className="eyebrow">
            {text("PLAYER COMMUNITY", "玩家社区")}
          </span>
          <h2 id="community-heading">
            {text("Ratings & discussion", "评分与讨论")}
          </h2>
        </div>
        <button
          className="button button-secondary"
          onClick={() => void reload()}
          disabled={busy || loading}
        >
          {text("Refresh", "刷新")}
        </button>
      </div>
      <p className="community-disclaimer">
        {text(
          "Community opinions are not editorial verification or an AI-authorship claim.",
          "用户评价不代表平台核验结论，也不代表 AI 创作归属。",
        )}
      </p>
      <noscript>
        <p>
          {text(
            "Enable JavaScript to sign in, rate and comment. Game information remains readable without it.",
            "评分和评论需要启用 JavaScript，游戏资料仍可正常阅读。",
          )}
        </p>
      </noscript>
      {loading && (
        <p role="status">{text("Loading discussion…", "正在加载评价…")}</p>
      )}
      {error && (
        <p className="community-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="community-notice" role="status">
          {notice}
        </p>
      )}
      {discussion && (
        <>
          <div className="community-score">
            <strong>
              {score?.count ? Number(score.average).toFixed(1) : "—"}
              <small>/ 5</small>
            </strong>
            <span>
              {text(
                `${score?.count || 0} player ratings`,
                `${score?.count || 0} 位玩家评分`,
              )}
            </span>
          </div>
          {community?.user ? (
            <fieldset className="community-stars" disabled={busy}>
              <legend>
                {text("Your rating · you can change it", "你的评分 · 可以修改")}
              </legend>
              {[1, 2, 3, 4, 5].map((value) => (
                <label
                  key={value}
                  title={text(`${value} stars`, `${value} 星`)}
                >
                  <input
                    type="radio"
                    name={`rating-${gameKey}`}
                    aria-label={text(`${value} stars`, `${value} 星`)}
                    checked={score?.mine === value}
                    onChange={() =>
                      void action(async () => {
                        const next = await request!<GameStats>(
                          "/games/" + encodeURIComponent(gameKey) + "/rating",
                          { method: "POST", body: { score: value } },
                        );
                        setDiscussion((old) =>
                          old ? { ...old, stats: next } : old,
                        );
                        updateStats?.(gameKey, next);
                        setNotice(text("Rating saved", "评分已保存"));
                      })
                    }
                  />
                  <Star
                    size={29}
                    fill={(score?.mine || 0) >= value ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                </label>
              ))}
            </fieldset>
          ) : (
            <p>
              <Link to={loginURL} className="community-login-prompt">
                {text("Sign in to rate or comment", "登录后即可评分和评论")}
              </Link>
            </p>
          )}
          <div className="community-comments-heading">
            <h3>
              {text("Comments", "评论")} <span>{score?.comments || 0}</span>
            </h3>
            <span>
              {text(
                "Be constructive and respectful.",
                "分享真实体验，友善交流。",
              )}
            </span>
          </div>
          {community?.user && (
            <form
              method="post"
              className="community-comment-form"
              onSubmit={(event) => {
                event.preventDefault();
                void action(async () => {
                  await request!(
                    "/games/" + encodeURIComponent(gameKey) + "/comments",
                    { method: "POST", body: { body } },
                  );
                  setBody("");
                  await reload();
                  setNotice(text("Comment published", "评论已发布"));
                });
              }}
            >
              <label htmlFor="new-game-comment">
                {text("Your comment", "你的评论")}
              </label>
              <textarea
                id="new-game-comment"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                minLength={1}
                maxLength={2000}
                rows={4}
                required
                placeholder={text(
                  "What did you enjoy? What could be improved?",
                  "说说游戏体验、喜欢的细节或改进建议…",
                )}
              />
              <div>
                <small>{body.length} / 2000</small>
                <button
                  className="button button-primary"
                  disabled={busy || !body.trim()}
                >
                  {busy
                    ? text("Sending…", "正在提交…")
                    : text("Post comment", "发表评论")}
                </button>
              </div>
            </form>
          )}
          {!discussion.comments.length && (
            <p className="community-empty">
              {text(
                "No comments yet. Start the conversation.",
                "还没有评论，来分享第一条体验吧。",
              )}
            </p>
          )}
          <div className="community-comment-list">
            {discussion.comments.map((comment) => (
              <article
                key={comment.id}
                className="community-comment"
                data-comment-id={comment.id}
              >
                <div>
                  <span className="community-avatar" aria-hidden="true">
                    {comment.author.slice(0, 1).toUpperCase()}
                  </span>
                  <strong>{comment.author}</strong>
                  <time dateTime={comment.createdAt}>
                    {new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(comment.createdAt))}
                  </time>
                </div>
                <p>{comment.body}</p>
                {community?.user && (
                  <div className="community-comment-actions">
                    {comment.mine ? (
                      <button
                        disabled={busy}
                        onClick={() => {
                          if (
                            window.confirm(
                              text(
                                "Delete your comment?",
                                "确定删除这条评论？",
                              ),
                            )
                          )
                            void action(async () => {
                              await request!("/comments/" + comment.id, {
                                method: "DELETE",
                              });
                              await reload();
                            });
                        }}
                      >
                        {text("Delete", "删除")}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setReportId(
                            reportId === comment.id ? "" : comment.id,
                          );
                          setReason("");
                        }}
                      >
                        {text("Report", "举报")}
                      </button>
                    )}
                  </div>
                )}
                {reportId === comment.id && (
                  <form
                    method="post"
                    className="community-report"
                    onSubmit={(event) => {
                      event.preventDefault();
                      void action(async () => {
                        await request!("/comments/" + comment.id + "/report", {
                          method: "POST",
                          body: { reason },
                        });
                        setReportId("");
                        setNotice(
                          text(
                            "Report sent to moderators",
                            "举报已提交审核员处理",
                          ),
                        );
                      });
                    }}
                  >
                    <label>
                      {text("Reason for reporting", "举报原因")}
                      <textarea
                        minLength={5}
                        maxLength={1000}
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                      />
                    </label>
                    <button className="button button-secondary" disabled={busy}>
                      {text("Submit report", "提交举报")}
                    </button>
                  </form>
                )}
              </article>
            ))}
          </div>
          {hasMore && (
            <button
              className="button button-secondary"
              disabled={busy}
              onClick={() =>
                void action(async () => {
                  const before = discussion.comments.at(-1)!.createdAt;
                  const next = await request!<Discussion>(
                    "/games/" +
                      encodeURIComponent(gameKey) +
                      "?before=" +
                      encodeURIComponent(before),
                  );
                  setDiscussion((old) =>
                    old
                      ? {
                          ...old,
                          comments: [...old.comments, ...next.comments],
                        }
                      : old,
                  );
                  setHasMore(next.comments.length === 30);
                })
              }
            >
              {text("Load earlier comments", "加载更早评论")}
            </button>
          )}
        </>
      )}
    </section>
  );
}
