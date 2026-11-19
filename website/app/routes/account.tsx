import { useState } from "react";
import {
  GitBranch,
  KeyRound,
  Mail,
  MessageCircle,
  Star,
  Upload,
  UserRound,
} from "lucide-react";
import { Link, useSiteI18n } from "../lib/i18n";
import { useClientQuery } from "../lib/client-query";
import { useCommunity } from "../lib/community";
import { CommunityUnavailable } from "../components/community-unavailable";

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
              <Star size={18} aria-hidden="true" />
              <span>
                <strong>{t("Rate games")}</strong>
                {t("Score playable records from one to five stars.")}
              </span>
            </li>
            <li>
              <MessageCircle size={18} aria-hidden="true" />
              <span>
                <strong>{t("Join the discussion")}</strong>
                {t("Comment on games and flag problems for moderators.")}
              </span>
            </li>
            <li>
              <Upload size={18} aria-hidden="true" />
              <span>
                <strong>{t("Submit your game")}</strong>
                {t(
                  "Send your own work for review; it stays private until approved.",
                )}
              </span>
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
                <a
                  className="button button-secondary community-github"
                  href={`/api/community/auth/github?returnTo=${encodeURIComponent(returnTo)}`}
                >
                  <GitBranch size={17} />
                  {t("Continue with GitHub")}
                </a>
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
