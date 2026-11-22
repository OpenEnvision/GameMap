import { useCallback, useEffect, useState } from "react";
import { ImagePlus, Send, X } from "lucide-react";
import { Link, useSiteI18n } from "../lib/i18n";
import { CommunityScreenshot, useCommunity } from "../lib/community";
import { CommunityUnavailable } from "../components/community-unavailable";

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
    { t } = useSiteI18n(),
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
    <main
      id="main-content"
      className="site-main community-submit-page community-page"
    >
      <title>{t("Submit your game — GameMap")}</title>
      <span className="community-page-art" aria-hidden="true" />
      <div className="community-stage is-submit">
        <div className="community-intro">
          <header className="page-heading">
            <h1>{t("Submit your game")}</h1>
          </header>
          <ol className="community-steps">
            <li>
              <strong>{t("Describe the game")}</strong>
              {t("Title, introduction, engine and where people can play it.")}
            </li>
            <li>
              <strong>{t("Add real screenshots")}</strong>
              {t("One to five images captured from the actual game.")}
            </li>
            <li>
              <strong>{t("Moderator review")}</strong>
              {t(
                "Your submission stays private until a moderator approves it.",
              )}
            </li>
            <li>
              <strong>{t("Published")}</strong>
              {t("Approved games join the game list with community ratings.")}
            </li>
          </ol>
        </div>
        <div className="community-submit-main">
          {!community ? (
            <CommunityUnavailable />
          ) : !community.ready ? (
            <p role="status">{t("Checking your session…")}</p>
          ) : !community.user ? (
            <div className="community-account-card">
              <h2>{t("Sign in before submitting")}</h2>
              <p>
                {t(
                  "Use a verified email account. Your submission remains private until a moderator approves it.",
                )}
              </p>
              <Link
                className="button button-primary"
                to="/account/?returnTo=/submit/"
              >
                {t("Sign in or create an account")}
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
                        t(
                          "Submitted for review. It will appear in the game list only after approval.",
                        ),
                      );
                      await load();
                    } catch (error) {
                      setError(
                        error instanceof Error
                          ? error.message
                          : "Request failed",
                      );
                    } finally {
                      setBusy(false);
                    }
                  })();
                }}
              >
                <div className="community-form-heading">
                  <h2>
                    {editing ? t("Revise your submission") : t("Game details")}
                  </h2>
                  <span>{t("No game binaries are uploaded.")}</span>
                </div>
                <h3 className="community-form-group">{t("The game")}</h3>
                <label>
                  {t("Game title")}
                  <input
                    name="title"
                    value={payload.title}
                    onChange={(event) => update("title", event.target.value)}
                    maxLength={120}
                    required
                  />
                </label>
                <label>
                  {t("Introduction")}
                  <textarea
                    name="description"
                    value={payload.description}
                    onChange={(event) =>
                      update("description", event.target.value)
                    }
                    rows={5}
                    minLength={10}
                    maxLength={4000}
                    required
                    placeholder={t(
                      "Explain the game, its controls and what makes it interesting.",
                    )}
                  />
                </label>
                <div className="community-form-grid">
                  <label>
                    {t("Engine or framework")}
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
                    {t("Game dimension")}
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
                <h3 className="community-form-group">{t("Play & source")}</h3>
                <div className="community-form-grid">
                  <label>
                    {t("Access type")}
                    <select
                      value={payload.accessKind}
                      onChange={(event) =>
                        update(
                          "accessKind",
                          event.target.value as Payload["accessKind"],
                        )
                      }
                    >
                      <option value="playable">{t("Play in browser")}</option>
                      <option value="download">
                        {t("Official download page")}
                      </option>
                    </select>
                  </label>
                  <label>
                    {t("Play or download URL")}
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
                  {t("Source repository (optional)")}
                  <input
                    name="sourceUrl"
                    type="url"
                    value={payload.sourceUrl}
                    onChange={(event) =>
                      update("sourceUrl", event.target.value)
                    }
                    placeholder="https://github.com/…"
                  />
                </label>
                <h3 className="community-form-group">{t("Rights & media")}</h3>
                <div className="community-form-grid">
                  <label>
                    {t("License and reuse notes")}
                    <input
                      value={payload.license}
                      onChange={(event) =>
                        update("license", event.target.value)
                      }
                      maxLength={300}
                      placeholder={t(
                        "For example: MIT; or proprietary, do not redistribute.",
                      )}
                    />
                  </label>
                  <label>
                    {t("AI use declaration")}
                    <select
                      value={payload.aiUse}
                      onChange={(event) =>
                        update("aiUse", event.target.value as Payload["aiUse"])
                      }
                    >
                      <option value="not-stated">{t("Not stated")}</option>
                      <option value="none">{t("No AI used")}</option>
                      <option value="assisted">{t("AI-assisted")}</option>
                      <option value="generated">
                        {t("Primarily AI-generated")}
                      </option>
                    </select>
                  </label>
                </div>
                <section
                  className="community-upload-section"
                  aria-label={t("Screenshots")}
                >
                  <h3>{t("Real screenshots · 1–5 images")}</h3>
                  <p>
                    {t(
                      "PNG, JPEG or WebP, up to 10 MB each. Metadata is removed; files stay private while review is pending.",
                    )}
                  </p>
                  <div className="community-upload-previews">
                    {payload.screenshots.map((id) => (
                      <figure key={id}>
                        <CommunityScreenshot
                          id={id}
                          alt={t("Your submitted screenshot")}
                        />
                        <button
                          type="button"
                          aria-label={t("Remove screenshot")}
                          onClick={() =>
                            update(
                              "screenshots",
                              payload.screenshots.filter(
                                (value) => value !== id,
                              ),
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
                    {busy ? t("Uploading…") : t("Choose screenshots")}
                    <input
                      aria-label={t("Upload screenshots")}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      disabled={busy || payload.screenshots.length >= 5}
                      onChange={(event) => {
                        const files = [...(event.target.files || [])];
                        event.target.value = "";
                        if (!files.length) return;
                        if (files.length + payload.screenshots.length > 5) {
                          setError(t("Choose no more than five screenshots."));
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
                                  t("Each image must be at most 10 MB"),
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
                    {t(
                      "I have the right to submit this work and screenshots, and authorize their display on this platform.",
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
                    {busy ? t("Please wait…") : t("Submit for review")}
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
                      {t("Cancel editing")}
                    </button>
                  )}
                </div>
              </form>
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
              <section className="community-my-submissions">
                <div className="community-section-heading">
                  <h2>{t("Your submissions")}</h2>
                  <button
                    className="button button-secondary"
                    onClick={() => void load()}
                  >
                    {t("Refresh")}
                  </button>
                </div>
                {!items.length && (
                  <p className="community-empty">{t("No submissions yet.")}</p>
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
                            ? t("Published")
                            : t("Withdrawn")
                          : item.status === "pending"
                            ? t("Under review")
                            : t("Changes requested")}
                      </span>
                    </div>
                    <p>
                      {t("Revision {revision}", { revision: item.revision })}
                    </p>
                    {item.note && (
                      <p>{t("Review note: {note}", { note: item.note })}</p>
                    )}
                    <div className="community-submission-actions">
                      {item.published && (
                        <a
                          href={item.payload.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.payload.accessKind === "playable"
                            ? t("Play the game")
                            : t("Get the game")}
                        </a>
                      )}
                      {item.published && (
                        <button
                          disabled={busy}
                          onClick={() => {
                            if (
                              !window.confirm(
                                t("Withdraw the published version?"),
                              )
                            )
                              return;
                            setBusy(true);
                            void request!(
                              "/submissions/" + item.id + "/withdraw",
                              {
                                method: "POST",
                                body: {},
                              },
                            )
                              .then(() => load())
                              .catch((error: Error) => setError(error.message))
                              .finally(() => setBusy(false));
                          }}
                        >
                          {t("Withdraw")}
                        </button>
                      )}
                      <button
                        disabled={busy}
                        onClick={() => {
                          setEditing(item.id);
                          setPayload({
                            ...item.payload,
                            rightsConfirmed: false,
                          });
                          window.scrollTo({ top: 0, behavior: "instant" });
                        }}
                      >
                        {t("Revise and resubmit")}
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
