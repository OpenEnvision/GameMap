import { useCallback, useEffect, useState } from "react";
import { ImagePlus, Send, X } from "lucide-react";
import { Link } from "../lib/i18n";
import { useCommunity, useCommunityText } from "../lib/community";

type Payload = {
  title: string;
  description: string;
  engine: string;
  track: "2d" | "3d";
  accessKind: "playable" | "download";
  url: string;
  sourceUrl: string;
  license: string;
  aiUse: "not-stated" | "none" | "assisted" | "generated";
  screenshots: string[];
  rightsConfirmed: boolean;
};
type Submission = {
  id: string;
  revision: number;
  payload: Payload;
  status: "pending" | "approved" | "rejected";
  note: string | null;
  createdAt: string;
  published: boolean;
};
const empty: Payload = {
  title: "",
  description: "",
  engine: "",
  track: "2d",
  accessKind: "playable",
  url: "",
  sourceUrl: "",
  license: "",
  aiUse: "not-stated",
  screenshots: [],
  rightsConfirmed: false,
};
export default function Submit() {
  const community = useCommunity(),
    text = useCommunityText(),
    request = community?.request,
    userId = community?.user?.id;
  const [payload, setPayload] = useState<Payload>({ ...empty }),
    [editing, setEditing] = useState<string | null>(null),
    [items, setItems] = useState<Submission[]>([]),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    if (!request || !userId) return;
    try {
      setItems(await request<Submission[]>("/submissions"));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Request failed");
    }
  }, [request, userId]);
  useEffect(() => {
    void load();
  }, [load]);
  const update = <K extends keyof Payload>(field: K, value: Payload[K]) =>
    setPayload((old) => ({ ...old, [field]: value }));
  return (
    <main id="main-content" className="site-main community-submit-page">
      <title>{text("Submit your game — GameMap", "提交作品 — GameMap")}</title>
      <header className="page-heading">
        <h1>{text("Submit your game", "提交作品")}</h1>
      </header>
      {!community?.ready ? (
        <p role="status">
          {text("Checking your session…", "正在检查登录状态…")}
        </p>
      ) : !community.user ? (
        <div className="community-account-card">
          <h2>{text("Sign in before submitting", "登录后提交作品")}</h2>
          <p>
            {text(
              "Use a verified email account. Your submission remains private until a moderator approves it.",
              "请使用已验证邮箱的账号。作品经审核通过后才会公开。",
            )}
          </p>
          <Link
            className="button button-primary"
            to="/account/?returnTo=/submit/"
          >
            {text("Sign in or create an account", "登录或注册")}
          </Link>
        </div>
      ) : (
        <>
          <form
            method="post"
            className="community-form community-submission-form"
            onSubmit={(event) => {
              event.preventDefault();
              setBusy(true);
              setError("");
              setNotice("");
              void (async () => {
                try {
                  await request!("/submissions", {
                    method: "POST",
                    body: { payload, ...(editing ? { id: editing } : {}) },
                  });
                  setPayload({ ...empty });
                  setEditing(null);
                  setNotice(
                    text(
                      "Submitted for review. It will appear in the game list only after approval.",
                      "投稿已提交审核，批准后才会出现在游戏列表。",
                    ),
                  );
                  await load();
                } catch (error) {
                  setError(
                    error instanceof Error ? error.message : "Request failed",
                  );
                } finally {
                  setBusy(false);
                }
              })();
            }}
          >
            <div className="community-form-heading">
              <h2>
                {editing
                  ? text("Revise your submission", "修改并重新投稿")
                  : text("Game details", "作品资料")}
              </h2>
              <span>
                {text(
                  "No game binaries are uploaded.",
                  "平台不接收游戏安装包。",
                )}
              </span>
            </div>
            <label>
              {text("Game title", "作品名称")}
              <input
                name="title"
                value={payload.title}
                onChange={(event) => update("title", event.target.value)}
                maxLength={120}
                required
              />
            </label>
            <label>
              {text("Introduction", "作品介绍")}
              <textarea
                name="description"
                value={payload.description}
                onChange={(event) => update("description", event.target.value)}
                rows={5}
                minLength={10}
                maxLength={4000}
                required
                placeholder={text(
                  "Explain the game, its controls and what makes it interesting.",
                  "介绍游戏玩法、操作方式和你希望玩家关注的亮点。至少 10 个字。 ",
                )}
              />
            </label>
            <div className="community-form-grid">
              <label>
                {text("Engine or framework", "引擎或框架")}
                <input
                  name="engine"
                  value={payload.engine}
                  onChange={(event) => update("engine", event.target.value)}
                  maxLength={80}
                  required
                  placeholder="Godot / Unity / Phaser…"
                />
              </label>
              <label>
                {text("Game dimension", "游戏维度")}
                <select
                  value={payload.track}
                  onChange={(event) =>
                    update("track", event.target.value as Payload["track"])
                  }
                >
                  <option value="2d">2D</option>
                  <option value="3d">3D</option>
                </select>
              </label>
            </div>
            <div className="community-form-grid">
              <label>
                {text("Access type", "作品入口类型")}
                <select
                  value={payload.accessKind}
                  onChange={(event) =>
                    update(
                      "accessKind",
                      event.target.value as Payload["accessKind"],
                    )
                  }
                >
                  <option value="playable">
                    {text("Play in browser", "浏览器试玩")}
                  </option>
                  <option value="download">
                    {text("Official download page", "官方下载页面")}
                  </option>
                </select>
              </label>
              <label>
                {text("Play or download URL", "试玩或下载地址")}
                <input
                  name="url"
                  type="url"
                  value={payload.url}
                  onChange={(event) => update("url", event.target.value)}
                  required
                  placeholder="https://…"
                />
              </label>
            </div>
            <label>
              {text("Source repository (optional)", "源码地址（可选）")}
              <input
                name="sourceUrl"
                type="url"
                value={payload.sourceUrl}
                onChange={(event) => update("sourceUrl", event.target.value)}
                placeholder="https://github.com/…"
              />
            </label>
            <div className="community-form-grid">
              <label>
                {text("License and reuse notes", "许可与复用说明")}
                <input
                  value={payload.license}
                  onChange={(event) => update("license", event.target.value)}
                  maxLength={300}
                  placeholder={text(
                    "For example: MIT; or proprietary, do not redistribute.",
                    "例如：MIT；或保留所有权利，不允许转载分发。 ",
                  )}
                />
              </label>
              <label>
                {text("AI use declaration", "AI 使用声明")}
                <select
                  value={payload.aiUse}
                  onChange={(event) =>
                    update("aiUse", event.target.value as Payload["aiUse"])
                  }
                >
                  <option value="not-stated">
                    {text("Not stated", "不作声明")}
                  </option>
                  <option value="none">
                    {text("No AI used", "未使用 AI")}
                  </option>
                  <option value="assisted">
                    {text("AI-assisted", "使用 AI 辅助")}
                  </option>
                  <option value="generated">
                    {text("Primarily AI-generated", "主要由 AI 生成")}
                  </option>
                </select>
              </label>
            </div>
            <section
              className="community-upload-section"
              aria-label={text("Screenshots", "游戏截图")}
            >
              <h3>
                {text("Real screenshots · 1–5 images", "真实游戏截图 · 1–5 张")}
              </h3>
              <p>
                {text(
                  "PNG, JPEG or WebP, up to 10 MB each. Metadata is removed; files stay private while review is pending.",
                  "支持 PNG、JPEG、WebP，每张不超过 10 MB。平台会移除图片元数据；审核前仅你和审核员可见。",
                )}
              </p>
              <div className="community-upload-previews">
                {payload.screenshots.map((id) => (
                  <figure key={id}>
                    <img
                      src={`/community-media/${id}.webp`}
                      alt={text(
                        "Your submitted screenshot",
                        "你上传的作品截图",
                      )}
                    />
                    <button
                      type="button"
                      aria-label={text("Remove screenshot", "移除截图")}
                      onClick={() =>
                        update(
                          "screenshots",
                          payload.screenshots.filter((value) => value !== id),
                        )
                      }
                    >
                      <X size={15} />
                    </button>
                  </figure>
                ))}
              </div>
              <label className="community-upload-button">
                <ImagePlus size={19} />
                {busy
                  ? text("Uploading…", "正在上传…")
                  : text("Choose screenshots", "选择截图")}
                <input
                  aria-label={text("Upload screenshots", "上传截图")}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  disabled={busy || payload.screenshots.length >= 5}
                  onChange={(event) => {
                    const files = [...(event.target.files || [])];
                    event.target.value = "";
                    if (!files.length) return;
                    if (files.length + payload.screenshots.length > 5) {
                      setError(
                        text(
                          "Choose no more than five screenshots.",
                          "最多上传五张截图。",
                        ),
                      );
                      return;
                    }
                    setBusy(true);
                    setError("");
                    void (async () => {
                      try {
                        const added: string[] = [];
                        for (const file of files) {
                          if (file.size > 10 * 1024 * 1024)
                            throw new Error(
                              text(
                                "Each image must be at most 10 MB",
                                "每张图片最多 10 MB",
                              ),
                            );
                          const result = await request!<{ id: string }>(
                            "/uploads",
                            { method: "POST", file },
                          );
                          added.push(result.id);
                        }
                        setPayload((old) => ({
                          ...old,
                          screenshots: [
                            ...new Set([...old.screenshots, ...added]),
                          ],
                        }));
                      } catch (error) {
                        setError(
                          error instanceof Error
                            ? error.message
                            : "Upload failed",
                        );
                      } finally {
                        setBusy(false);
                      }
                    })();
                  }}
                />
              </label>
            </section>
            <label className="community-consent">
              <input
                type="checkbox"
                checked={payload.rightsConfirmed}
                onChange={(event) =>
                  update("rightsConfirmed", event.target.checked)
                }
                required
              />
              <span>
                {text(
                  "I have the right to submit this work and screenshots, and authorize their display on this platform.",
                  "我确认有权提交本作品资料及截图，并授权平台用于作品展示。",
                )}
              </span>
            </label>
            <div className="community-form-actions">
              <button
                className="button button-primary"
                disabled={
                  busy ||
                  !payload.screenshots.length ||
                  !payload.rightsConfirmed
                }
              >
                <Send size={16} />
                {busy
                  ? text("Please wait…", "请稍候…")
                  : text("Submit for review", "提交审核")}
              </button>
              {editing && (
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    setEditing(null);
                    setPayload({ ...empty });
                  }}
                >
                  {text("Cancel editing", "取消修改")}
                </button>
              )}
            </div>
          </form>
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
          <section className="community-my-submissions">
            <div className="community-section-heading">
              <h2>{text("Your submissions", "我的投稿")}</h2>
              <button
                className="button button-secondary"
                onClick={() => void load()}
              >
                {text("Refresh", "刷新")}
              </button>
            </div>
            {!items.length && (
              <p className="community-empty">
                {text("No submissions yet.", "还没有投稿。")}
              </p>
            )}
            {items.map((item) => (
              <article key={item.id}>
                <div>
                  <h3>{item.payload.title}</h3>
                  <span
                    className={`community-submission-state is-${item.status}`}
                  >
                    {item.status === "approved"
                      ? item.published
                        ? text("Published", "已公开")
                        : text("Withdrawn", "已撤下")
                      : item.status === "pending"
                        ? text("Under review", "审核中")
                        : text("Changes requested", "需修改")}
                  </span>
                </div>
                <p>
                  {text(
                    `Revision ${item.revision}`,
                    `第 ${item.revision} 次提交`,
                  )}
                </p>
                {item.note && (
                  <p>
                    {text("Review note: ", "审核说明：")}
                    {item.note}
                  </p>
                )}
                <div className="community-submission-actions">
                  {item.published && (
                    <Link to={`/works/?id=${item.id}`}>
                      {text("View work", "查看作品")}
                    </Link>
                  )}
                  {item.published && (
                    <button
                      disabled={busy}
                      onClick={() => {
                        if (
                          !window.confirm(
                            text(
                              "Withdraw the published version?",
                              "确定撤下已公开版本？",
                            ),
                          )
                        )
                          return;
                        setBusy(true);
                        void request!("/submissions/" + item.id + "/withdraw", {
                          method: "POST",
                          body: {},
                        })
                          .then(() => load())
                          .catch((error: Error) => setError(error.message))
                          .finally(() => setBusy(false));
                      }}
                    >
                      {text("Withdraw", "撤下作品")}
                    </button>
                  )}
                  <button
                    disabled={busy}
                    onClick={() => {
                      setEditing(item.id);
                      setPayload({ ...item.payload, rightsConfirmed: false });
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                  >
                    {text("Revise and resubmit", "修改并重新提交")}
                  </button>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
