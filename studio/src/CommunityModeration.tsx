import { useEffect, useState } from "react";
import { api } from "./api";

type Work = {
  id: string;
  revision: number;
  author: string;
  createdAt: string;
  payload: {
    title: string;
    description: string;
    url: string;
    sourceUrl?: string;
    engine: string;
    track: string;
    screenshots: string[];
    license?: string;
    aiUse: string;
  };
};
type Report = {
  id: string;
  commentId: string;
  body: string;
  reason: string;
  gameKey: string;
  createdAt: string;
};
type Queue = {
  submissions: Work[];
  reports: Report[];
  published: { id: string; title: string; author: string }[];
};
export function CommunityModeration({ csrf }: { csrf?: string }) {
  const [queue, setQueue] = useState<Queue>({
    submissions: [],
    reports: [],
    published: [],
  });
  const [notes, setNotes] = useState<Record<string, string>>({}),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  const load = async () => {
    try {
      setQueue(await api<Queue>("/community/moderation"));
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "读取审核队列失败");
    }
  };
  useEffect(() => {
    void load();
  }, []);
  const review = async (item: Work | Report, approve: boolean) => {
    const note = notes[item.id]?.trim();
    if (!note) {
      setError("请先填写审核说明。");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if ("payload" in item)
        await api("/community/review", {
          method: "POST",
          csrf,
          body: { id: item.id, revision: item.revision, approve, note },
        });
      else
        await api("/community/report", {
          method: "POST",
          csrf,
          body: { id: item.id, hide: approve, note },
        });
      setNotice("审核结果已记录。");
      await load();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "审核失败，请刷新后重试。",
      );
    } finally {
      setBusy(false);
    }
  };
  const unpublish = async (id: string) => {
    const note = notes[id]?.trim();
    if (!note) {
      setError("请填写下架原因。");
      return;
    }
    setBusy(true);
    try {
      await api("/community/unpublish", {
        method: "POST",
        csrf,
        body: { id, note },
      });
      setNotice("作品已下架，历史审核与评分仍保留。");
      await load();
    } catch (error) {
      setError(error instanceof Error ? error.message : "下架失败");
    } finally {
      setBusy(false);
    }
  };
  return (
    <main
      id="editor"
      className="community-moderation"
      style={{ padding: 32, maxWidth: 1200, margin: "0 auto", width: "100%" }}
    >
      <div className="panel-heading">
        <div>
          <h1>社区审核</h1>
          <p>
            批准投稿后作品会实时公开；本页不会激活或修改目录发布快照。普通用户无法访问。
          </p>
        </div>
        <button disabled={busy} onClick={() => void load()}>
          刷新队列
        </button>
      </div>
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      <h2>待审核作品（{queue.submissions.length}）</h2>
      {!queue.submissions.length && <p>暂无待审核作品。</p>}
      {queue.submissions.map((item) => (
        <article
          key={item.id}
          className="community-review-item"
          style={{
            padding: 24,
            margin: "20px 0",
            border: "1px solid var(--border, #ddd)",
            borderRadius: 12,
          }}
        >
          <h3>{item.payload.title}</h3>
          <p>
            作者：{item.author} · 第 {item.revision} 次提交 ·{" "}
            {item.payload.track.toUpperCase()} / {item.payload.engine}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>{item.payload.description}</p>
          <p>
            <a href={item.payload.url} target="_blank" rel="noreferrer">
              打开作品链接
            </a>
            {item.payload.sourceUrl && (
              <>
                {" "}
                ·{" "}
                <a
                  href={item.payload.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  查看源码
                </a>
              </>
            )}
          </p>
          <p>
            许可：{item.payload.license || "作者未说明，不代表可自由复用"} · AI
            使用声明：{item.payload.aiUse}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {item.payload.screenshots.map((id) => (
              <a
                key={id}
                href={`/api/community/media/${id}.webp`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`/api/community/media/${id}.webp`}
                  alt={`${item.payload.title} 投稿截图`}
                  style={{ width: 220, height: 124, objectFit: "contain" }}
                />
              </a>
            ))}
          </div>
          <label>
            审核说明
            <textarea
              maxLength={2000}
              value={notes[item.id] || ""}
              onChange={(event) =>
                setNotes((old) => ({ ...old, [item.id]: event.target.value }))
              }
            />
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="button primary"
              disabled={busy}
              onClick={() => void review(item, true)}
            >
              批准并公开
            </button>
            <button
              className="button"
              disabled={busy}
              onClick={() => void review(item, false)}
            >
              退回修改
            </button>
          </div>
        </article>
      ))}
      <h2>评论举报（{queue.reports.length}）</h2>
      {!queue.reports.length && <p>暂无待处理举报。</p>}
      {queue.reports.map((item) => (
        <article
          key={item.id}
          style={{
            padding: 24,
            margin: "20px 0",
            border: "1px solid var(--border, #ddd)",
            borderRadius: 12,
          }}
        >
          <p>游戏：{item.gameKey}</p>
          <blockquote style={{ whiteSpace: "pre-wrap" }}>
            {item.body}
          </blockquote>
          <p>举报原因：{item.reason}</p>
          <label>
            处理说明
            <textarea
              maxLength={2000}
              value={notes[item.id] || ""}
              onChange={(event) =>
                setNotes((old) => ({ ...old, [item.id]: event.target.value }))
              }
            />
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            <button disabled={busy} onClick={() => void review(item, true)}>
              隐藏评论
            </button>
            <button disabled={busy} onClick={() => void review(item, false)}>
              保留评论，结案
            </button>
          </div>
        </article>
      ))}
      <h2>已公开作品（{queue.published?.length || 0}）</h2>
      {(queue.published || []).map((item) => (
        <article
          key={item.id}
          style={{
            padding: 20,
            border: "1px solid var(--border, #ddd)",
            margin: "14px 0",
            borderRadius: 10,
          }}
        >
          <h3>{item.title}</h3>
          <p>作者：{item.author}</p>
          <label>
            下架原因
            <textarea
              maxLength={2000}
              value={notes[item.id] || ""}
              onChange={(event) =>
                setNotes((old) => ({ ...old, [item.id]: event.target.value }))
              }
            />
          </label>
          <button disabled={busy} onClick={() => void unpublish(item.id)}>
            下架作品
          </button>
        </article>
      ))}
    </main>
  );
}
