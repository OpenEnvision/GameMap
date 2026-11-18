import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Star, UserRound, Plus } from "lucide-react";
import { useLocation } from "react-router";
import { useHydrated } from "../lib/client-query";
import { Link, useSiteI18n } from "../lib/i18n";
import { useCommunity, type GameStats } from "../lib/community";

export function CommunityAccountLink() {
  const community = useCommunity(),
    { t } = useSiteI18n();
  if (!community) return null;
  return (
    <>
      <Link className="community-submit-link" to="/submit/">
        <Plus size={15} />
        <span>{t("Submit a game")}</span>
      </Link>
      <Link className="community-account-link" to="/account/">
        <UserRound size={16} />
        <span>{community.user?.displayName || t("Sign in")}</span>
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
    { t } = useSiteI18n(),
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
      aria-label={t("Ratings and comments")}
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
            : t("Not rated yet")
          : community.unavailable
            ? t("Ratings unavailable")
            : t("Ratings & comments")}
      </span>
      {score && <small>{t("{count} ratings", { count: score.count })}</small>}
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
    { locale, t } = useSiteI18n();
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
  const location = useLocation(),
    hydrated = useHydrated();
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
          <span className="eyebrow">{t("PLAYER COMMUNITY")}</span>
          <h2 id="community-heading">{t("Ratings & discussion")}</h2>
        </div>
        <button
          className="button button-secondary"
          onClick={() => void reload()}
          disabled={busy || loading}
        >
          {t("Refresh")}
        </button>
      </div>
      <p className="community-disclaimer">
        {t(
          "Community opinions are not editorial verification or an AI-authorship claim.",
        )}
      </p>
      <noscript>
        <p>
          {t(
            "Enable JavaScript to sign in, rate and comment. Game information remains readable without it.",
          )}
        </p>
      </noscript>
      {loading && <p role="status">{t("Loading discussion…")}</p>}
      {error && (
        <p className="community-error" role="alert">
          {t(error)}
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
              {t("{count} player ratings", { count: score?.count || 0 })}
            </span>
          </div>
          {community?.user ? (
            <fieldset className="community-stars" disabled={busy}>
              <legend>{t("Your rating · you can change it")}</legend>
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} title={t("{count} stars", { count: value })}>
                  <input
                    type="radio"
                    name={`rating-${gameKey}`}
                    aria-label={t("{count} stars", { count: value })}
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
                        setNotice(t("Rating saved"));
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
                {t("Sign in to rate or comment")}
              </Link>
            </p>
          )}
          <div className="community-comments-heading">
            <h3>
              {t("Comments")} <span>{score?.comments || 0}</span>
            </h3>
            <span>{t("Be constructive and respectful.")}</span>
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
                  setNotice(t("Comment published"));
                });
              }}
            >
              <label htmlFor="new-game-comment">{t("Your comment")}</label>
              <textarea
                id="new-game-comment"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                minLength={1}
                maxLength={2000}
                rows={4}
                required
                placeholder={t("What did you enjoy? What could be improved?")}
              />
              <div>
                <small>{body.length} / 2000</small>
                <button
                  className="button button-primary"
                  disabled={busy || !body.trim()}
                >
                  {busy ? t("Sending…") : t("Post comment")}
                </button>
              </div>
            </form>
          )}
          {!discussion.comments.length && (
            <p className="community-empty">
              {t("No comments yet. Start the conversation.")}
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
                          if (window.confirm(t("Delete your comment?")))
                            void action(async () => {
                              await request!("/comments/" + comment.id, {
                                method: "DELETE",
                              });
                              await reload();
                            });
                        }}
                      >
                        {t("Delete")}
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
                        {t("Report")}
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
                        setNotice(t("Report sent to moderators"));
                      });
                    }}
                  >
                    <label>
                      {t("Reason for reporting")}
                      <textarea
                        minLength={5}
                        maxLength={1000}
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                      />
                    </label>
                    <button className="button button-secondary" disabled={busy}>
                      {t("Submit report")}
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
              {t("Load earlier comments")}
            </button>
          )}
        </>
      )}
    </section>
  );
}
