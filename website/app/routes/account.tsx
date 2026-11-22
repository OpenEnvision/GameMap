import { useCallback, useEffect, useState } from "react";
import {
  GitBranch,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link, useSiteI18n } from "../lib/i18n";
import { useClientQuery } from "../lib/client-query";
import {
  CommunityScreenshot,
  useCommunity,
  type CommunityWork,
} from "../lib/community";
import { CommunityUnavailable } from "../components/community-unavailable";

type ModerationQueue = {
  submissions: Array<{
    id: string;
    revision: number;
    payload: CommunityWork & { screenshots: string[] };
    author: string;
    createdAt: string;
  }>;
  reports: Array<{
    id: string;
    commentId: string;
    body: string;
    reason: string;
    gameKey: string;
    createdAt: string;
  }>;
  published: Array<{
    id: string;
    title: string;
    author: string;
  }>;
};

function DirectModerationPanel() {
  const community = useCommunity(),
    { t } = useSiteI18n();
  const [queue, setQueue] = useState<ModerationQueue | null>(null),
    [notes, setNotes] = useState<Record<string, string>>({}),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    if (!community?.user?.moderator) return;
    try {
      setQueue(await community.request<ModerationQueue>("/moderation"));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    }
  }, [community]);
  useEffect(() => {
    void load();
  }, [load]);
  if (!community?.user?.moderator) return null;
  const run = async (work: () => Promise<void>) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await work();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <section
      className="community-moderation-panel"
      aria-label={t("Moderator review")}
    >
      <div className="community-section-heading">
        <h2>
          <ShieldCheck size={18} /> {t("Moderator review")}
        </h2>
        <div className="community-account-actions">
          <button
            type="button"
            className="button button-secondary"
            disabled={busy}
            onClick={() =>
              void run(async () => {
                const res = await community.request<{ synced: number }>(
                  "/moderation/sync-games",
                  { method: "POST", body: {} },
                );
                setNotice(
                  t("Catalog game index synced ({count} games)", {
                    count: res.synced,
                  }),
                );
              })
            }
          >
            {t("Sync catalog games")}
          </button>
          <button
            type="button"
            className="button button-secondary"
            disabled={busy}
            onClick={() => void load()}
          >
            {t("Refresh")}
          </button>
        </div>
      </div>
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
      {queue && (
        <>
          <h3>
            {t("Pending game submissions")} ({queue.submissions.length})
          </h3>
          {!queue.submissions.length && (
            <p className="community-empty">
              {t("No pending game submissions.")}
            </p>
          )}
          {queue.submissions.map((item) => {
            const noteKey = `sub:${item.id}:${item.revision}`;
            const noteValue = notes[noteKey] || "";
            return (
              <article key={noteKey} className="community-moderation-item">
                <h4>
                  {item.payload.title} · {item.author}
                </h4>
                <p>{item.payload.description}</p>
                <p>
                  <a href={item.payload.url} target="_blank" rel="noreferrer">
                    {item.payload.url}
                  </a>
                </p>
                <div className="community-upload-previews">
                  {(item.payload.screenshots || []).map((sid) => (
                    <figure key={sid}>
                      <CommunityScreenshot
                        id={sid}
                        alt={t("Your submitted screenshot")}
                      />
                    </figure>
                  ))}
                </div>
                <label>
                  {t("Moderation note")}
                  <input
                    value={noteValue}
                    onChange={(event) =>
                      setNotes((old) => ({
                        ...old,
                        [noteKey]: event.target.value,
                      }))
                    }
                    placeholder={t("Provide a review note")}
                  />
                </label>
                <div className="community-account-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    disabled={busy || !noteValue.trim()}
                    onClick={() =>
                      void run(async () => {
                        await community.request("/moderation/review", {
                          method: "POST",
                          body: {
                            id: item.id,
                            revision: item.revision,
                            approve: true,
                            note: noteValue.trim(),
                            screenshots: item.payload.screenshots || [],
                          },
                        });
                        setNotice(t("Submission approved"));
                      })
                    }
                  >
                    {t("Approve")}
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    disabled={busy || !noteValue.trim()}
                    onClick={() =>
                      void run(async () => {
                        await community.request("/moderation/review", {
                          method: "POST",
                          body: {
                            id: item.id,
                            revision: item.revision,
                            approve: false,
                            note: noteValue.trim(),
                          },
                        });
                        setNotice(t("Changes requested"));
                      })
                    }
                  >
                    {t("Request changes")}
                  </button>
                </div>
              </article>
            );
          })}
          <h3>
            {t("Open comment reports")} ({queue.reports.length})
          </h3>
          {!queue.reports.length && (
            <p className="community-empty">{t("No open comment reports.")}</p>
          )}
          {queue.reports.map((rep) => {
            const noteKey = `rep:${rep.id}`;
            const noteValue = notes[noteKey] || "";
            return (
              <article key={noteKey} className="community-moderation-item">
                <p>
                  <strong>{rep.gameKey}</strong>: {rep.body}
                </p>
                <p>
                  {t("Reason for reporting")}: {rep.reason}
                </p>
                <label>
                  {t("Moderation note")}
                  <input
                    value={noteValue}
                    onChange={(event) =>
                      setNotes((old) => ({
                        ...old,
                        [noteKey]: event.target.value,
                      }))
                    }
                    placeholder={t("Provide a review note")}
                  />
                </label>
                <div className="community-account-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    disabled={busy || !noteValue.trim()}
                    onClick={() =>
                      void run(async () => {
                        await community.request("/moderation/report", {
                          method: "POST",
                          body: {
                            id: rep.id,
                            hide: true,
                            note: noteValue.trim(),
                          },
                        });
                        setNotice(t("Comment hidden"));
                      })
                    }
                  >
                    {t("Hide comment")}
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    disabled={busy || !noteValue.trim()}
                    onClick={() =>
                      void run(async () => {
                        await community.request("/moderation/report", {
                          method: "POST",
                          body: {
                            id: rep.id,
                            hide: false,
                            note: noteValue.trim(),
                          },
                        });
                        setNotice(t("Report dismissed"));
                      })
                    }
                  >
                    {t("Keep comment")}
                  </button>
                </div>
              </article>
            );
          })}
          {queue.published.length > 0 && (
            <>
              <h3>
                {t("Published")} ({queue.published.length})
              </h3>
              {queue.published.map((work) => {
                const noteKey = `pub:${work.id}`;
                const noteValue = notes[noteKey] || "";
                return (
                  <article key={noteKey} className="community-moderation-item">
                    <h4>
                      {work.title} · {work.author}
                    </h4>
                    <label>
                      {t("Moderation note")}
                      <input
                        value={noteValue}
                        onChange={(event) =>
                          setNotes((old) => ({
                            ...old,
                            [noteKey]: event.target.value,
                          }))
                        }
                        placeholder={t("Provide a review note")}
                      />
                    </label>
                    <div className="community-account-actions">
                      <button
                        type="button"
                        className="button button-secondary"
                        disabled={busy || !noteValue.trim()}
                        onClick={() =>
                          void run(async () => {
                            await community.request("/moderation/unpublish", {
                              method: "POST",
                              body: {
                                id: work.id,
                                note: noteValue.trim(),
                              },
                            });
                            setNotice(t("Withdrawn"));
                          })
                        }
                      >
                        {t("Withdraw")}
                      </button>
                    </div>
                  </article>
                );
              })}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default function Account() {
  const community = useCommunity(),
    { locale, t } = useSiteI18n(),
    [params] = useClientQuery();
  const [mode, setMode] = useState<"login" | "signup" | "magic">("login"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [displayName, setDisplayName] = useState<string | null>(null);
  const fallback = locale === "zh" ? "/zh/examples/" : "/examples/";
  const returnTo = (() => {
    try {
      const base =
          typeof window === "undefined"
            ? "http://localhost"
            : window.location.origin,
        url = new URL(params.get("returnTo") || fallback, base);
      return url.origin === base &&
        /^\/(?:zh\/)?(?:examples|cases|research|submit|account|works)(?:\/|$)/.test(
          url.pathname,
        )
        ? url.pathname + url.search + url.hash
        : fallback;
    } catch {
      return fallback;
    }
  })();
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
  return (
    <main
      id="main-content"
      className="site-main community-account-page community-page"
    >
      <title>{t("Your account — GameMap")}</title>
      <span className="community-page-art" aria-hidden="true" />
      <div className="community-stage">
        <div className="community-intro">
          <header className="page-heading">
            <h1>{t("Your account")}</h1>
          </header>
          <ul className="community-perks">
            <li>
              <strong>{t("Rate games")}</strong>
              {t("Score playable records from one to five stars.")}
            </li>
            <li>
              <strong>{t("Join the discussion")}</strong>
              {t("Comment on games and flag problems for moderators.")}
            </li>
            <li>
              <strong>{t("Submit your game")}</strong>
              {t(
                "Send your own work for review; it stays private until approved.",
              )}
            </li>
          </ul>
        </div>
        <div className="community-account-card">
          {!community ? (
            <CommunityUnavailable />
          ) : !community.ready ? (
            <p role="status">{t("Checking your session…")}</p>
          ) : !community.settings.configured ? (
            <p className="community-error" role="status">
              {t(
                "Community service has not been configured. You can still browse all games.",
              )}
            </p>
          ) : community.user ? (
            <>
              <div className="community-profile-heading">
                <span className="community-avatar">
                  <UserRound size={23} />
                </span>
                <div>
                  <h2>{community.user.displayName}</h2>
                  <p>{community.user.email}</p>
                </div>
              </div>
              <form
                method="post"
                className="community-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  void action(async () => {
                    await community.request("/profile", {
                      method: "POST",
                      body: { displayName: displayName?.trim() },
                    });
                    await community.refreshSession();
                    setNotice(t("Profile updated"));
                  });
                }}
              >
                <label>
                  {t("Public display name")}
                  <input
                    autoComplete="nickname"
                    minLength={1}
                    maxLength={40}
                    value={displayName ?? community.user.displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    required
                  />
                </label>
                <button
                  className="button button-secondary"
                  disabled={busy || !displayName?.trim()}
                >
                  {t("Save name")}
                </button>
              </form>
              <div className="community-account-actions">
                <Link className="button button-primary" to="/submit/">
                  {t("Submit your game")}
                </Link>
                <button
                  className="button button-secondary"
                  disabled={busy}
                  onClick={() =>
                    void action(async () => {
                      await community.request("/auth/logout", {
                        method: "POST",
                      });
                      await community.refreshSession();
                      setNotice(t("Signed out"));
                    })
                  }
                >
                  {t("Sign out")}
                </button>
              </div>
              <p className="community-muted">
                {t(
                  "Your email is private. Other players see only your display name.",
                )}
              </p>
              <DirectModerationPanel />
            </>
          ) : (
            <>
              <div
                className="community-auth-tabs"
                role="tablist"
                aria-label={t("Sign-in method")}
              >
                {(
                  [
                    ["login", t("Sign in")],
                    ["signup", t("Create account")],
                    ["magic", t("Email link")],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    role="tab"
                    aria-selected={mode === value}
                    onClick={() => {
                      setMode(value);
                      setError("");
                      setNotice("");
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {params.get("error") === "invalid_link" && (
                <p role="alert" className="community-error">
                  {t(
                    "This sign-in link expired or belongs to another browser. Request a fresh link here.",
                  )}
                </p>
              )}
              <form
                method="post"
                className="community-form"
                key={mode}
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget),
                    email = String(data.get("email") || ""),
                    password = String(data.get("password") || "");
                  void action(async () => {
                    if (mode === "login") {
                      await community.request("/auth/login", {
                        method: "POST",
                        body: { email, password },
                      });
                      await community.refreshSession();
                      window.location.assign(returnTo);
                    } else if (mode === "signup") {
                      const result = await community.request<{
                        verificationRequired: boolean;
                      }>("/auth/signup", {
                        method: "POST",
                        body: {
                          email,
                          password,
                          displayName: String(data.get("displayName") || ""),
                          returnTo,
                        },
                      });
                      if (!result.verificationRequired) {
                        await community.refreshSession();
                        window.location.assign(returnTo);
                      } else
                        setNotice(
                          t(
                            "Check your inbox and open the confirmation link in this browser. Then you can rate, comment and submit.",
                          ),
                        );
                    } else {
                      await community.request("/auth/magic-link", {
                        method: "POST",
                        body: { email, returnTo },
                      });
                      setNotice(
                        t(
                          "Check your inbox. Open the sign-in link in this browser.",
                        ),
                      );
                    }
                  });
                }}
              >
                {mode === "signup" && (
                  <label>
                    {t("Display name")}
                    <input
                      name="displayName"
                      autoComplete="nickname"
                      maxLength={40}
                      required
                    />
                  </label>
                )}
                <label>
                  {t("Email")}
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </label>
                {mode !== "magic" && (
                  <label>
                    {t("Password")}
                    <input
                      name="password"
                      type="password"
                      autoComplete={
                        mode === "signup" ? "new-password" : "current-password"
                      }
                      minLength={mode === "signup" ? 12 : 1}
                      maxLength={128}
                      required
                    />
                    {mode === "signup" && (
                      <small>
                        {t(
                          "Use at least 12 characters. Verify your email before participating.",
                        )}
                      </small>
                    )}
                  </label>
                )}
                <button
                  className="button button-primary"
                  disabled={
                    busy ||
                    (mode === "signup" && community.settings.signup === false)
                  }
                >
                  {mode === "magic" ? (
                    <Mail size={17} />
                  ) : (
                    <KeyRound size={17} />
                  )}
                  {busy
                    ? t("Please wait…")
                    : mode === "login"
                      ? t("Sign in")
                      : mode === "signup"
                        ? t("Create account")
                        : t("Send sign-in link")}
                </button>
                {mode === "signup" && community.settings.signup === false && (
                  <p className="community-error">
                    {t("Public signup is not enabled yet.")}
                  </p>
                )}
              </form>
              <div className="community-auth-divider">
                <span>{t("or")}</span>
              </div>
              {community.settings.github ? (
                community.startGitHubLogin ? (
                  <button
                    type="button"
                    className="button button-secondary community-github"
                    disabled={busy}
                    onClick={() =>
                      void action(async () => {
                        await community.startGitHubLogin!(returnTo);
                      })
                    }
                  >
                    <GitBranch size={17} />
                    {t("Continue with GitHub")}
                  </button>
                ) : (
                  <a
                    className="button button-secondary community-github"
                    href={`/api/community/auth/github?returnTo=${encodeURIComponent(returnTo)}`}
                  >
                    <GitBranch size={17} />
                    {t("Continue with GitHub")}
                  </a>
                )
              ) : (
                <>
                  <button
                    className="button button-secondary community-github"
                    disabled
                  >
                    <GitBranch size={17} />
                    {t("GitHub login not configured")}
                  </button>
                  <p className="community-muted">
                    {t(
                      "The operator must configure a GitHub OAuth app before this option can be used.",
                    )}
                  </p>
                </>
              )}
            </>
          )}
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
        </div>
      </div>
    </main>
  );
}
