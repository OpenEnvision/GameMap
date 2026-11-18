import { useState } from "react";
import { GitBranch, KeyRound, Mail, UserRound } from "lucide-react";
import { Link, useSiteI18n } from "../lib/i18n";
import { useClientQuery } from "../lib/client-query";
import { useCommunity, useCommunityText } from "../lib/community";

export default function Account() {
  const community = useCommunity(),
    text = useCommunityText(),
    { locale } = useSiteI18n(),
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
    <main id="main-content" className="site-main community-account-page">
      <title>{text("Your account — GameMap", "我的账号 — GameMap")}</title>
      <header className="page-heading">
        <h1>{text("Your account", "我的账号")}</h1>
      </header>
      <div className="community-account-card">
        {!community?.ready ? (
          <p role="status">
            {text("Checking your session…", "正在检查登录状态…")}
          </p>
        ) : !community.settings.configured ? (
          <p className="community-error" role="status">
            {text(
              "Community service has not been configured. You can still browse all games.",
              "社区服务尚未配置，现有游戏仍可正常浏览。",
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
                  setNotice(text("Profile updated", "昵称已更新"));
                });
              }}
            >
              <label>
                {text("Public display name", "公开昵称")}
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
                {text("Save name", "保存昵称")}
              </button>
            </form>
            <div className="community-account-actions">
              <Link className="button button-primary" to="/submit/">
                {text("Submit your game", "提交自己的作品")}
              </Link>
              <button
                className="button button-secondary"
                disabled={busy}
                onClick={() =>
                  void action(async () => {
                    await community.request("/auth/logout", { method: "POST" });
                    await community.refreshSession();
                    setNotice(text("Signed out", "已退出登录"));
                  })
                }
              >
                {text("Sign out", "退出登录")}
              </button>
            </div>
            <p className="community-muted">
              {text(
                "Your email is private. Other players see only your display name.",
                "邮箱不会公开，其他玩家只会看到你的昵称。",
              )}
            </p>
          </>
        ) : (
          <>
            <div
              className="community-auth-tabs"
              role="tablist"
              aria-label={text("Sign-in method", "登录方式")}
            >
              {(
                [
                  ["login", "Sign in", "登录"],
                  ["signup", "Create account", "注册"],
                  ["magic", "Email link", "邮箱链接"],
                ] as const
              ).map(([value, english, chinese]) => (
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
                  {text(english, chinese)}
                </button>
              ))}
            </div>
            {params.get("error") === "invalid_link" && (
              <p role="alert" className="community-error">
                {text(
                  "This sign-in link expired or belongs to another browser. Request a fresh link here.",
                  "登录链接已失效，或不是在发起登录的浏览器中打开。请重新获取链接。",
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
                        text(
                          "Check your inbox and open the confirmation link in this browser. Then you can rate, comment and submit.",
                          "请查收确认邮件，并在当前浏览器打开链接。验证后即可评分、评论和投稿。",
                        ),
                      );
                  } else {
                    await community.request("/auth/magic-link", {
                      method: "POST",
                      body: { email, returnTo },
                    });
                    setNotice(
                      text(
                        "Check your inbox. Open the sign-in link in this browser.",
                        "请查收邮件，并在当前浏览器中打开登录链接。",
                      ),
                    );
                  }
                });
              }}
            >
              {mode === "signup" && (
                <label>
                  {text("Display name", "昵称")}
                  <input
                    name="displayName"
                    autoComplete="nickname"
                    maxLength={40}
                    required
                  />
                </label>
              )}
              <label>
                {text("Email", "邮箱")}
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
                  {text("Password", "密码")}
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
                      {text(
                        "Use at least 12 characters. Verify your email before participating.",
                        "至少 12 位字符；参与评分、评论和投稿前需要验证邮箱。",
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
                {mode === "magic" ? <Mail size={17} /> : <KeyRound size={17} />}
                {busy
                  ? text("Please wait…", "请稍候…")
                  : mode === "login"
                    ? text("Sign in", "登录")
                    : mode === "signup"
                      ? text("Create account", "注册账号")
                      : text("Send sign-in link", "发送登录链接")}
              </button>
              {mode === "signup" && community.settings.signup === false && (
                <p className="community-error">
                  {text(
                    "Public signup is not enabled yet.",
                    "当前尚未开放用户注册。",
                  )}
                </p>
              )}
            </form>
            <div className="community-auth-divider">
              <span>{text("or", "或")}</span>
            </div>
            {community.settings.github ? (
              <a
                className="button button-secondary community-github"
                href={`/api/community/auth/github?returnTo=${encodeURIComponent(returnTo)}`}
              >
                <GitBranch size={17} />
                {text("Continue with GitHub", "使用 GitHub 登录")}
              </a>
            ) : (
              <>
                <button
                  className="button button-secondary community-github"
                  disabled
                >
                  <GitBranch size={17} />
                  {text("GitHub login not configured", "GitHub 登录待配置")}
                </button>
                <p className="community-muted">
                  {text(
                    "The operator must configure a GitHub OAuth app before this option can be used.",
                    "站点管理员完成 GitHub OAuth 应用配置后才会启用，不会使用模拟授权。",
                  )}
                </p>
              </>
            )}
          </>
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
      </div>
    </main>
  );
}
