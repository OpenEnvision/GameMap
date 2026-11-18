import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  Download,
  FileText,
  GitBranch,
  Image,
  Layers3,
  LockKeyhole,
  LogOut,
  PanelLeft,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { api, ApiError, fieldId, labelFor, sourceHash } from "./api";
import type {
  Contracts,
  Dictionary,
  Entry,
  Issue,
  Json,
  Revision,
  Session,
  Translation,
} from "./api";
import { emptyValue, SchemaForm } from "./SchemaForm";
import { kindLabelFor } from "./field-labels";
import { RevisionDiff } from "./RevisionDiff";
import { ResearchEvidence } from "./ResearchEvidence";
import { CommunityModeration } from "./CommunityModeration";
import { ActionRequirements, requirementId } from "./ActionRequirements";
import {
  operationMessages,
  reviewBlocker,
  type Operation,
  type ReviewAction,
} from "./workflow";

const states: Record<string, string> = {
  draft: "草稿",
  in_review: "待审核",
  approved: "已批准",
  rejected: "已退回",
};
const roles: Record<string, string> = {
  editor: "编辑",
  reviewer: "审核员",
  admin: "管理员",
};
const clone = <T,>(value: T): T => structuredClone(value);
const formatDate = (value: string) =>
  new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
interface Release {
  id: string;
  records: number;
  prepared: boolean;
  active: boolean;
  created_at: string;
  digest: string;
}
const nested = (value: Dictionary, path: string[], next: Json): Dictionary => {
  const [key, ...tail] = path;
  return {
    ...value,
    [key]: tail.length
      ? nested((value[key] as Dictionary) || {}, tail, next)
      : next,
  };
};
function StudioBrand() {
  return (
    <div className="brand" aria-label="GameMap Studio">
      <span className="brand-symbol">
        <Layers3 size={19} />
      </span>
      <strong>GameMap</strong>
      <span className="brand-product">Studio</span>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null),
    [contracts, setContracts] = useState<Contracts | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]),
    [releases, setReleases] = useState<Release[]>([]),
    [history, setHistory] = useState<Revision[]>([]);
  const [key, setKey] = useState(""),
    [kind, setKind] = useState("resource"),
    [identifier, setIdentifier] = useState(""),
    [baseId, setBaseId] = useState<string | null>(null);
  const [payload, setPayload] = useState<Dictionary>({}),
    [attachments, setAttachments] = useState<Dictionary>({}),
    [translations, setTranslations] = useState<Translation[]>([]);
  const [sourceHashes, setSourceHashes] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false),
    [pendingAction, setPendingAction] = useState<Operation | null>(null),
    [notice, setNotice] = useState(""),
    [error, setError] = useState(""),
    [issues, setIssues] = useState<Issue[]>([]);
  const operationRef = useRef<Operation | null>(null);
  const busy = pendingAction !== null;
  const [query, setQuery] = useState(""),
    [kindFilter, setKindFilter] = useState("all"),
    [stateFilter, setStateFilter] = useState("all"),
    [page, setPage] = useState(0);
  const activeFilters = useRef(false);
  activeFilters.current = Boolean(
    query || kindFilter !== "all" || stateFilter !== "all",
  );
  const [tab, setTab] = useState("content"),
    [section, setSection] = useState("catalog"),
    [catalogOpen, setCatalogOpen] = useState(false),
    [note, setNote] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set()),
    [preview, setPreview] = useState<{
      blocks: Record<string, unknown>[];
      title: string;
      description: string;
      markdown?: string;
    } | null>(null);
  const [newLocale, setNewLocale] = useState("zh"),
    [newField, setNewField] = useState("");
  const clearPrivateWorkspace = () => {
    setEntries([]);
    setReleases([]);
    setContracts(null);
    setHistory([]);
    setPreview(null);
    setPayload({});
    setAttachments({});
    setTranslations([]);
    setSourceHashes({});
    setKey("");
    setIdentifier("");
    setBaseId(null);
    setSelected(new Set());
    setCatalogOpen(false);
    setQuery("");
    setKindFilter("all");
    setStateFilter("all");
    setPage(0);
    setNote("");
    setNotice("");
    setIssues([]);
    setDirty(false);
  };
  const entry = entries.find((entry) => entry.key === key),
    revision = history.find((revision) => revision.id === baseId);
  const gitOwned = entry?.owner === "git";
  const unsupportedVersion = Boolean(
    revision &&
    contracts &&
    revision.schema_version !== contracts.kinds[kind]?.schemaVersion,
  );
  const readonly = gitOwned || unsupportedVersion,
    reviewer = ["reviewer", "admin"].includes(session?.role || "");
  const form = contracts?.forms[kind],
    definition = contracts?.kinds[kind];
  const validationState = dirty
    ? "local-pending"
    : revision?.validated
      ? "saved-valid"
      : baseId
        ? "saved-pending"
        : "unsaved";
  const validationLabel = {
    "local-pending": "本地修改待校验",
    "saved-valid": "已保存修订已校验",
    "saved-pending": "已保存修订待校验",
    unsaved: "保存后可校验",
  }[validationState];
  const filtered = useMemo(
    () =>
      entries.filter(
        (entry) =>
          (kindFilter === "all" || entry.kind === kindFilter) &&
          (stateFilter === "all" || entry.state === stateFilter) &&
          `${entry.key} ${entry.body.title} ${entry.body.summary}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [entries, kindFilter, stateFilter, query],
  );
  const visible = filtered.slice(page * 30, (page + 1) * 30),
    selectedEntries = entries.filter((entry) =>
      selected.has(entry.head_revision_id),
    );
  const parent = history.find(
    (candidate) => candidate.id === revision?.parent_id,
  );
  const reviewReason = (action: ReviewAction, batch = false) => {
    if (batch && selectedEntries.length !== selected.size)
      return "所选修订已变化，请重新选择。";
    return reviewBlocker({
      action,
      revisions: batch ? selectedEntries : revision ? [revision] : [],
      role: session?.role,
      userId: session?.user?.id,
      dirty,
      note,
    });
  };
  const reviewRequirements = [
    { id: "submit-help", label: "提交审核", reason: reviewReason("submit") },
    { id: "approve-help", label: "批准修订", reason: reviewReason("approve") },
    { id: "reject-help", label: "退回修改", reason: reviewReason("reject") },
  ];
  const bulkRequirements = [
    {
      id: "bulk-submit-help",
      label: "提交审核",
      reason: reviewReason("submit", true),
    },
    {
      id: "bulk-approve-help",
      label: "批准",
      reason: reviewReason("approve", true),
    },
  ];
  const actionDescription = (id: string, batch = false) =>
    busy
      ? "operation-status"
      : requirementId(batch ? bulkRequirements : reviewRequirements, id);
  const validationReason = dirty
    ? "请先保存本地修改，再校验已保存修订。"
    : !baseId
      ? "先保存草稿，再进行校验。"
      : "";
  const outgoing = {
    kind,
    identifier,
    schemaVersion: revision?.schema_version || definition?.schemaVersion || 1,
    expectedHead: baseId,
    payload,
    attachments,
    translations,
  };
  const handleError = (problem: unknown) => {
    const failure = problem instanceof Error ? problem : new Error("操作失败");
    setError(failure.message);
    setIssues(problem instanceof ApiError ? problem.issues : []);
    if (problem instanceof ApiError && problem.code === "authentication") {
      clearPrivateWorkspace();
      setSession({ configured: true, signedIn: false });
    }
  };
  const perform = async (action: Operation, run: () => Promise<void>) => {
    if (operationRef.current) return;
    operationRef.current = action;
    setPendingAction(action);
    setNotice("");
    setError("");
    setIssues([]);
    try {
      await run();
    } catch (problem) {
      handleError(problem);
    } finally {
      operationRef.current = null;
      setPendingAction(null);
    }
  };
  const refresh = async () => {
    const [catalog, versions] = await Promise.all([
      api<{ entries: Entry[] }>("/catalog"),
      api<{ releases: Release[] }>("/releases"),
    ]);
    setEntries(catalog.entries);
    setReleases(versions.releases);
    return catalog.entries;
  };
  const openEntry = async (
    target: Entry,
    id = target.head_revision_id,
    navigate = true,
  ) => {
    const result = await api<{ history: Revision[] }>(
      `/history?key=${encodeURIComponent(target.key)}`,
    );
    const record = result.history.find((revision) => revision.id === id);
    if (!record) throw new Error("修订不存在，请刷新列表。");
    if (catalogOpen) {
      setCatalogOpen(false);
      document.getElementById("catalog-toggle")?.focus({ preventScroll: true });
    }
    setKey(target.key);
    setKind(target.kind);
    setIdentifier(target.identifier);
    setBaseId(record.id);
    setHistory(result.history);
    setPayload(clone(record.body.payload));
    setAttachments(clone(record.body.attachments));
    setTranslations(clone(record.translations));
    setDirty(false);
    setPreview(null);
    setNote("");
    setTab("content");
    if (navigate) setSection("catalog");
    setIssues([]);
    setError("");
    window.history.replaceState(
      null,
      "",
      `?entry=${encodeURIComponent(target.key)}`,
    );
  };
  const refreshRevision = async () => {
    await refresh();
    if (key)
      setHistory(
        (
          await api<{ history: Revision[] }>(
            `/history?key=${encodeURIComponent(key)}`,
          )
        ).history,
      );
  };
  useEffect(() => {
    api<Session>("/session").then(setSession).catch(handleError);
  }, []);
  useEffect(() => {
    if (!session?.signedIn) return;
    void perform("load", async () => {
      const metadata = await api<Contracts>("/contracts");
      setContracts(metadata);
      const loaded = await refresh();
      const requested = new URLSearchParams(location.search).get("entry");
      const target =
        loaded.find((entry) => entry.key === requested) || loaded[0];
      if (target) {
        if (!activeFilters.current)
          setPage(Math.floor(loaded.indexOf(target) / 30));
        // Loading the default record must not pull a user out of another workspace.
        await openEntry(target, target.head_revision_id, false);
      }
    });
  }, [session?.signedIn]);
  useEffect(() => {
    setPage(0);
  }, [query, kindFilter, stateFilter]);
  useEffect(() => {
    document
      .querySelector(".entry-row.is-selected")
      ?.scrollIntoView({ block: "nearest" });
  }, [key, page, catalogOpen]);
  useEffect(() => {
    document.querySelector(".editor-content")?.scrollTo(0, 0);
  }, [tab, key]);
  useEffect(() => {
    if (!dirty) return;
    const prevent = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", prevent);
    return () => window.removeEventListener("beforeunload", prevent);
  }, [dirty]);
  useEffect(() => {
    let cancelled = false;
    void Promise.all(
      translations.map(
        async (row) =>
          [row.field, await sourceHash(payload[row.field])] as const,
      ),
    ).then((pairs) => {
      if (!cancelled) setSourceHashes(Object.fromEntries(pairs));
    });
    return () => {
      cancelled = true;
    };
  }, [payload, translations]);
  const discard = () =>
    !dirty || window.confirm("有未保存的改动。放弃这些改动并继续？");
  const create = () => {
    if (!contracts || !discard()) return;
    setCatalogOpen(false);
    document.getElementById("catalog-toggle")?.focus({ preventScroll: true });
    setKey("");
    setBaseId(null);
    setHistory([]);
    setIdentifier("");
    setKind("resource");
    setPayload(emptyValue(contracts.forms.resource.payload) as Dictionary);
    setAttachments(
      emptyValue(contracts.forms.resource.attachments) as Dictionary,
    );
    setTranslations([]);
    setDirty(false);
    setPreview(null);
    setTab("content");
    setSection("catalog");
    setNote("");
    setIssues([]);
    setError("");
    window.history.replaceState(null, "", location.pathname);
  };
  const save = () =>
    perform("save", async () => {
      if (!identifier.trim())
        throw new Error("填写稳定标识；发布后不会随标题变化。");
      if (translations.some((row) => !/^[a-f0-9]{64}$/.test(row.source_hash)))
        throw new Error("请在译文页核对新增译文的原文指纹，再保存。");
      const result = await api<{ id: string }>("/drafts", {
        method: "POST",
        body: outgoing,
        csrf: session?.csrf,
      });
      const loaded = await refresh(),
        target = loaded.find((entry) => entry.head_revision_id === result.id);
      if (!target) throw new Error("草稿已保存，请刷新列表查看。");
      await openEntry(target, result.id);
      setNotice(
        `草稿已保存（修订 ${result.id.slice(0, 8)}）。下一步校验；它尚未发布，也不会覆盖线上内容。`,
      );
    });
  const validate = () =>
    perform("validate", async () => {
      if (!baseId || dirty)
        throw new Error("先保存当前改动，再校验这份不可变修订。");
      const result = await api<{ preview: typeof preview; note: string }>(
        `/revisions/${baseId}/validate`,
        { method: "POST", csrf: session?.csrf },
      );
      setPreview(result.preview);
      await refreshRevision();
      setNotice(
        `已保存修订 ${baseId.slice(0, 8)} 的契约、引用、文件与译文指纹校验通过。来源真实性和复现情况仍需人工审核。`,
      );
      setTab("preview");
    });
  const review = (action: ReviewAction, ids: string[], batch = false) =>
    perform(
      batch && action !== "reject" ? `bulk-${action}` : action,
      async () => {
        if (dirty)
          throw new Error("先保存或放弃本地改动，再操作已保存的修订。");
        await api("/review", {
          method: "POST",
          body: { action, ids, ...(action === "submit" ? {} : { note }) },
          csrf: session?.csrf,
        });
        setSelected(new Set());
        await refreshRevision();
        setNotice(
          action === "submit"
            ? "已提交审核。仍未发布。"
            : action === "approve"
              ? "审核已批准。批准不等于部署；可到发布页冻结快照。"
              : "已退回，修改时请保存新的修订。",
        );
      },
    );
  const upload = async (path: string, file: File) => {
    await perform("upload", async () => {
      const result = await api<{
        path: string;
        sha256: string;
        width: number;
        height: number;
      }>("/media", { method: "POST", file, csrf: session?.csrf });
      const [part, ...parts] = path.split(".");
      let value = nested(
        part === "payload" ? payload : attachments,
        parts,
        result.path,
      );
      if (path === "attachments.identity.asset")
        value = nested(value, ["identity", "sha256"], result.sha256);
      if (path === "attachments.learningMedia.src") {
        value = nested(value, ["learningMedia", "width"], result.width);
        value = nested(value, ["learningMedia", "height"], result.height);
      }
      if (part === "payload") setPayload(value);
      else setAttachments(value);
      setDirty(true);
      setNotice(
        "图片已规范化为 WebP、移除 EXIF，并进入私有暂存区。请保留作者、原始出处和许可说明。",
      );
    });
  };

  if (!session)
    return (
      <main className="welcome welcome-loading">
        <StudioBrand />
        {error ? (
          <p role="alert">{error}</p>
        ) : (
          <p role="status">正在检查会话…</p>
        )}
      </main>
    );
  if (!session.configured)
    return (
      <main className="welcome welcome-setup">
        <StudioBrand />
        <span className="eyebrow">PRIVATE CONTENT WORKSPACE</span>
        <h1>先配置服务，再开始编辑。</h1>
        <p>没有连接数据库，也没有启用演示账号或绕过登录。</p>
        <div className="setup-panel">
          <h2>服务端缺少配置</h2>
          <ul>
            {session.missing?.map((name) => (
              <li key={name}>
                <code>{name}</code>
              </li>
            ))}
          </ul>
          <p>
            参见 <code>.env.example</code> 与{" "}
            <code>docs/project/content-platform.md</code>
            。密钥只放在服务端，不要加 <code>VITE_</code> 前缀。
          </p>
        </div>
        <small>应用不会自动运行数据库迁移、导入数据或切换线上数据源。</small>
      </main>
    );
  if (!session.signedIn)
    return (
      <main className="welcome welcome-login">
        <StudioBrand />
        <section className="welcome-copy">
          <span className="eyebrow">A WORKSPACE FOR GOOD CONTENT</span>
          <h1>
            让每次收录
            <br />
            都有依据。
          </h1>
          <p>
            整理资源，核对来源，让值得分享的内容
            <br className="desktop-break" />
            经过认真审核，再走向读者。
          </p>
          <ol className="welcome-workflow" aria-label="内容工作流">
            <li>
              <span>01</span>
              <div>
                <strong>整理与编辑</strong>
                <small>在一个工作区，保留内容与出处。</small>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>校验与审核</strong>
                <small>让每次修改有记录，每条依据可追溯。</small>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>冻结与交付</strong>
                <small>导出已批准的内容，再进入部署流程。</small>
              </div>
            </li>
          </ol>
          <span className="welcome-private">
            <LockKeyhole size={13} />
            仅限受邀的内容团队
          </span>
        </section>
        <form
          className="login-card"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            void perform("login", async () => {
              const result = await api<Session>("/login", {
                method: "POST",
                body: {
                  email: data.get("email"),
                  password: data.get("password"),
                },
              });
              setSession({ configured: true, ...result });
              setNotice("");
            });
          }}
        >
          <div className="login-heading">
            <span className="login-icon">
              <LockKeyhole size={20} />
            </span>
            <h2>欢迎回来</h2>
            <p>登录 GameMap 内容工作台</p>
          </div>
          <label htmlFor="email">邮箱</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="name@company.com"
            required
            autoFocus
          />
          <label htmlFor="password">密码</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
          <button className="button primary" disabled={busy}>
            {busy ? "正在登录…" : "登录工作台"}
            <ArrowRight size={16} />
          </button>
          <small className="login-security">
            使用团队已配置的 Supabase Auth
            账号。此处不提供公开注册，令牌不会进入浏览器存储。
          </small>
        </form>
      </main>
    );

  return (
    <div
      className={`studio-shell ${section === "catalog" && form && !readonly && !catalogOpen ? "with-editor-actions" : ""}`}
    >
      <a className="skip-link" href="#editor">
        跳到编辑区
      </a>
      <header className="topbar">
        <StudioBrand />
        <nav className="workspace-nav" aria-label="工作区导航">
          <button
            className={section === "catalog" ? "is-current" : ""}
            aria-current={section === "catalog" ? "page" : undefined}
            onClick={() => setSection("catalog")}
          >
            <FileText size={15} />
            内容
          </button>
          <button
            className={section === "research" ? "is-current" : ""}
            aria-current={section === "research" ? "page" : undefined}
            onClick={() => setSection("research")}
          >
            <Search size={15} />
            研究证据
          </button>
          {reviewer && (
            <button
              className={section === "community" ? "is-current" : ""}
              aria-current={section === "community" ? "page" : undefined}
              onClick={() => setSection("community")}
            >
              <ShieldCheck size={15} />
              社区审核
            </button>
          )}
          <button
            className={section === "releases" ? "is-current" : ""}
            aria-current={section === "releases" ? "page" : undefined}
            onClick={() => setSection("releases")}
          >
            <Layers3 size={15} />
            发布快照
          </button>
        </nav>
        <span className="environment-pill">
          <span className="status-dot" />
          私有工作区
        </span>
        <div className="account">
          <span className="account-avatar" aria-hidden="true">
            {session.user?.email?.slice(0, 1).toUpperCase()}
          </span>
          <span className="account-details">
            <strong>{roles[session.role || ""]}</strong>
            <small>{session.user?.email}</small>
          </span>
          <button
            className="icon-button"
            aria-label="退出登录"
            disabled={busy}
            onClick={() => {
              if (discard())
                void perform("logout", async () => {
                  await api("/logout", { method: "POST", csrf: session.csrf });
                  setSession({ configured: true, signedIn: false });
                  clearPrivateWorkspace();
                });
            }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>
      <div className="workspace-status">
        <span className="workspace-label">
          <ShieldCheck size={13} />
          内容工作流
        </span>
        <span className="workflow-path">
          草稿
          <ChevronRight />
          校验
          <ChevronRight />
          审核
          <ChevronRight />
          冻结
          <ChevronRight />
          构建与部署
        </span>
        <strong>
          <LockKeyhole size={12} />
          此工作台不会自动上线
        </strong>
      </div>
      {(notice || error || pendingAction) && (
        <div
          id="operation-status"
          tabIndex={-1}
          className={`notice ${error ? "is-error" : pendingAction ? "is-progress" : ""}`}
          role={error ? "alert" : "status"}
          aria-atomic="true"
        >
          {error ? (
            <AlertCircle size={17} />
          ) : pendingAction ? (
            <CircleDashed size={17} />
          ) : (
            <CheckCircle2 size={17} />
          )}
          <span className="notice-message">
            {error ||
              (pendingAction ? operationMessages[pendingAction] : notice)}
          </span>
          {error && issues.length > 0 && (
            <ul>
              {issues.slice(0, 30).map((issue, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setTab(
                        issue.field.startsWith("attachments")
                          ? "media"
                          : issue.field.startsWith("translations")
                            ? "translations"
                            : "content",
                      );
                      setTimeout(() => {
                        const parts = issue.field.split(".");
                        let target: HTMLElement | null = null;
                        while (parts.length && !target) {
                          const id = fieldId(parts.join("."));
                          target =
                            document.getElementById(id) ||
                            document.getElementById(`optional-${id}`);
                          parts.pop();
                        }
                        for (
                          let parent = target?.parentElement;
                          parent;
                          parent = parent.parentElement
                        ) {
                          if (parent instanceof HTMLDetailsElement)
                            parent.open = true;
                        }
                        target?.focus();
                        target?.scrollIntoView({ block: "center" });
                      }, 0);
                    }}
                  >
                    {issue.key && issue.key !== key ? `${issue.key} · ` : ""}
                    {issue.field}: {issue.message}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            className="quiet"
            aria-label="关闭提示"
            disabled={busy}
            onClick={() => {
              setError("");
              setNotice("");
              setIssues([]);
            }}
          >
            关闭
          </button>
        </div>
      )}
      {section === "community" ? (
        <CommunityModeration csrf={session.csrf} />
      ) : section === "research" ? (
        <ResearchEvidence
          onOpenEntry={(key) => {
            const target = entries.find((entry) => entry.key === key);
            if (target) {
              if (discard()) void perform("open", () => openEntry(target));
            } else
              setError("该来源关联的条目尚未导入当前目录，历史证据仍保留。");
          }}
        />
      ) : section === "releases" ? (
        <main id="editor" className="release-page" tabIndex={-1}>
          <div className="page-title">
            <div>
              <span className="eyebrow">RELEASE MANAGEMENT</span>
              <h1>发布快照</h1>
              <p>
                把已批准的内容，整理成可交付的版本。每个快照独立保存，未批准的草稿不会混入。
              </p>
            </div>
            <button
              className="button primary"
              disabled={busy || !reviewer}
              aria-busy={pendingAction === "freeze"}
              aria-describedby={
                busy
                  ? "operation-status"
                  : !reviewer
                    ? "freeze-help"
                    : undefined
              }
              onClick={() =>
                void perform("freeze", async () => {
                  if (
                    dirty &&
                    !window.confirm(
                      "未保存的表单不会包含在发布快照中。继续冻结已批准的内容？",
                    )
                  )
                    return;
                  const result = await api<{ id: string; records: number }>(
                    "/releases",
                    { method: "POST", body: {}, csrf: session.csrf },
                  );
                  await refresh();
                  setNotice(
                    `已冻结 ${result.records} 条内容。尚未部署或激活；请导出后走构建与部署流程。`,
                  );
                })
              }
            >
              <GitBranch size={17} />
              {pendingAction === "freeze" ? "正在冻结…" : "冻结已批准内容"}
            </button>
          </div>
          {!reviewer && (
            <p className="action-help release-action-help" id="freeze-help">
              冻结快照需要审核员或管理员权限；编辑仍可查看快照记录。
            </p>
          )}
          <div className="release-summary">
            <div>
              <small>当前已批准内容</small>
              <strong>
                {entries.filter((record) => record.state === "approved").length}
                <span>条</span>
              </strong>
              <p>快照会重新校验整个集合</p>
            </div>
            <div>
              <small>已冻结快照</small>
              <strong>
                {releases.length}
                <span>个</span>
              </strong>
              <p>独立记录内容与构建上下文</p>
            </div>
            <div>
              <small>上线方式</small>
              <strong className="release-boundary-value">
                独立部署
                <ArrowRight size={18} />
              </strong>
              <p>冻结和导出都不会自动上线</p>
            </div>
          </div>
          <div className="release-boundary">
            <ShieldCheck size={19} />
            <div>
              <strong>冻结内容，不等于上线。</strong>
              <p>
                导出包含不可变数据与来源校验信息。实际发布仍需校验
                Markdown、媒体、静态页面和浏览器行为，再由受保护的部署任务激活。
              </p>
            </div>
          </div>
          <div className="release-list-heading">
            <h2>快照记录</h2>
            <span>{releases.length} 个版本</span>
          </div>
          <div className="release-list">
            {releases.length ? (
              releases.map((release) => (
                <article className="release-card" key={release.id}>
                  <span className="release-icon">
                    <Layers3 size={22} />
                  </span>
                  <div className="release-card-details">
                    <span
                      className={`badge ${release.active ? "approved" : "draft"}`}
                    >
                      {release.active
                        ? "当前已激活"
                        : release.prepared
                          ? "已冻结 · 未激活"
                          : "缺少构建上下文"}
                    </span>
                    <h2>{release.id.slice(0, 8)}</h2>
                    <p>
                      {release.records} 条内容 ·{" "}
                      {formatDate(release.created_at)}
                    </p>
                    <code>{release.digest.slice(0, 24)}…</code>
                  </div>
                  {reviewer && release.prepared && (
                    <a
                      className="button secondary"
                      href={`/api/releases/${release.id}/export`}
                    >
                      <Download size={15} />
                      导出快照 JSON
                    </a>
                  )}
                </article>
              ))
            ) : (
              <div className="empty-state">
                <GitBranch />
                <h2>尚无发布快照</h2>
                <p>完成审核后再冻结。JSON 导出不包含媒体二进制文件。</p>
              </div>
            )}
          </div>
        </main>
      ) : (
        <div className="workspace-grid">
          <div className="mobile-workspace-bar">
            <button
              id="catalog-toggle"
              className="catalog-toggle"
              aria-label="切换内容目录"
              aria-expanded={catalogOpen}
              aria-controls="catalog-sidebar"
              onClick={() => setCatalogOpen(!catalogOpen)}
            >
              <PanelLeft size={17} />
              <span>
                内容目录<small>{entries.length}</small>
              </span>
              <ChevronDown size={15} />
            </button>
            <button
              className="icon-button"
              aria-label="新建草稿"
              onClick={create}
              disabled={busy || !contracts}
            >
              <Plus size={19} />
            </button>
          </div>
          <aside
            id="catalog-sidebar"
            className={`catalog-sidebar ${catalogOpen ? "is-open" : ""}`}
            aria-label="内容目录"
          >
            <div className="sidebar-heading">
              <h2>
                内容目录 <span>{entries.length}</span>
              </h2>
              <button
                className="icon-button"
                aria-label="新建内容"
                onClick={create}
                disabled={busy || !contracts}
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="catalog-search">
              <Search size={16} aria-hidden="true" />
              <input
                id="catalog-search"
                aria-label="搜索内容"
                placeholder="搜索标题或稳定 ID…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && !event.nativeEvent.isComposing)
                    setQuery("");
                }}
              />
              {query && (
                <button
                  className="search-clear"
                  type="button"
                  aria-label="清除搜索"
                  onClick={() => {
                    setQuery("");
                    document.getElementById("catalog-search")?.focus();
                  }}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="sidebar-filters">
              <select
                aria-label="筛选内容类型"
                value={kindFilter}
                onChange={(event) => setKindFilter(event.target.value)}
              >
                <option value="all">所有类型</option>
                {contracts &&
                  Object.entries(contracts.kinds).map(([kind, definition]) => (
                    <option key={kind} value={kind}>
                      {kindLabelFor(kind, definition.label)}
                    </option>
                  ))}
              </select>
              <select
                aria-label="筛选状态"
                value={stateFilter}
                onChange={(event) => setStateFilter(event.target.value)}
              >
                <option value="all">所有状态</option>
                {Object.entries(states).map(([state, label]) => (
                  <option key={state} value={state}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="selection-row">
              <label>
                <input
                  type="checkbox"
                  aria-label="选择当前页"
                  checked={
                    visible.length > 0 &&
                    visible.every((entry) =>
                      selected.has(entry.head_revision_id),
                    )
                  }
                  onChange={(event) =>
                    setSelected((previous) => {
                      const next = new Set(previous);
                      visible.forEach((entry) =>
                        event.target.checked
                          ? next.add(entry.head_revision_id)
                          : next.delete(entry.head_revision_id),
                      );
                      return next;
                    })
                  }
                />
                当前页
              </label>
              <span>{filtered.length} 条结果</span>
              <button
                className="quiet"
                onClick={() =>
                  void perform("refresh", async () => {
                    await refresh();
                    setNotice("目录已刷新。未保存的表单没有被覆盖。");
                  })
                }
                aria-label="刷新目录"
                disabled={busy}
                aria-busy={pendingAction === "refresh"}
                aria-describedby={busy ? "operation-status" : undefined}
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="entry-list">
              {visible.map((record) => (
                <div
                  className={`entry-row ${record.key === key ? "is-selected" : ""}`}
                  key={record.key}
                >
                  <label className="entry-selection">
                    <input
                      type="checkbox"
                      aria-label={`选择 ${record.body.title}`}
                      checked={selected.has(record.head_revision_id)}
                      onChange={(event) =>
                        setSelected((previous) => {
                          const next = new Set(previous);
                          if (event.target.checked)
                            next.add(record.head_revision_id);
                          else next.delete(record.head_revision_id);
                          return next;
                        })
                      }
                    />
                    <FileText
                      className="entry-file-icon"
                      size={16}
                      aria-hidden="true"
                    />
                  </label>
                  <button
                    className="entry-button"
                    data-entry-key={record.key}
                    aria-current={record.key === key ? "true" : undefined}
                    title={record.body.title}
                    disabled={busy}
                    onClick={() => {
                      if (discard())
                        void perform("open", () => openEntry(record));
                    }}
                  >
                    <span className="entry-kind">
                      {kindLabelFor(
                        record.kind,
                        contracts?.kinds[record.kind]?.label,
                      )}
                    </span>
                    <strong>{record.body.title}</strong>
                    <span className="entry-meta">
                      <span className={`badge ${record.state}`}>
                        {states[record.state]}
                      </span>
                      {record.owner === "git" && <span>Git</span>}
                      {record.validated && (
                        <Check size={12} aria-label="已校验" />
                      )}
                    </span>
                  </button>
                </div>
              ))}
              {!visible.length && !busy && (
                <div className="sidebar-empty">
                  <Search size={22} />
                  <strong>没有找到相关内容</strong>
                  <p>试试其他关键词，或调整筛选条件。</p>
                  <button
                    className="quiet"
                    onClick={() => {
                      setQuery("");
                      setKindFilter("all");
                      setStateFilter("all");
                    }}
                  >
                    清除筛选
                  </button>
                </div>
              )}
            </div>
            {session.role === "admin" && (
              <button
                className="button secondary sync-git-button"
                disabled={busy}
                aria-busy={pendingAction === "sync"}
                aria-describedby={busy ? "operation-status" : undefined}
                onClick={() =>
                  void perform("sync", async () => {
                    const result = await api<{ changed: number }>(
                      "/documents/sync",
                      { method: "POST", body: {}, csrf: session.csrf },
                    );
                    await refreshRevision();
                    setNotice(
                      `已同步 ${result.changed} 份文档来源索引（Git 正文与已批准内容的生成视图）。新修订经过校验，但仍是草稿，需要人工审核。`,
                    );
                  })
                }
              >
                <GitBranch size={14} />
                {pendingAction === "sync"
                  ? "正在同步索引…"
                  : "同步文档来源索引"}
              </button>
            )}
            <div className="pagination">
              <button
                aria-label="上一页"
                className="icon-button"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <span>
                {page + 1} / {Math.max(1, Math.ceil(filtered.length / 30))}
              </span>
              <button
                aria-label="下一页"
                className="icon-button"
                disabled={(page + 1) * 30 >= filtered.length}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            {selected.size > 0 && (
              <div className="bulk-panel">
                <strong>已选 {selected.size} 条修订</strong>
                <textarea
                  aria-label="批量审核说明"
                  disabled={busy}
                  placeholder="批准或退回前，记录审核依据与边界"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                />
                <div>
                  <button
                    className="button secondary small"
                    disabled={busy || Boolean(reviewReason("submit", true))}
                    aria-busy={pendingAction === "bulk-submit"}
                    aria-describedby={actionDescription(
                      "bulk-submit-help",
                      true,
                    )}
                    onClick={() => void review("submit", [...selected], true)}
                  >
                    {pendingAction === "bulk-submit" ? "正在提交…" : "提交审核"}
                  </button>
                  <button
                    className="button secondary small"
                    disabled={busy || Boolean(reviewReason("approve", true))}
                    aria-busy={pendingAction === "bulk-approve"}
                    aria-describedby={actionDescription(
                      "bulk-approve-help",
                      true,
                    )}
                    onClick={() => void review("approve", [...selected], true)}
                  >
                    {pendingAction === "bulk-approve" ? "正在批准…" : "批准"}
                  </button>
                  <button
                    className="quiet"
                    disabled={busy}
                    onClick={() => setSelected(new Set())}
                  >
                    清除选择
                  </button>
                </div>
                {!busy && <ActionRequirements items={bulkRequirements} />}
              </div>
            )}
          </aside>
          <main id="editor" className="editor-pane" tabIndex={-1}>
            {!contracts || (!entry && !form) ? (
              <div className="empty-state">
                <FileText />
                <h1>选择一条内容，或创建草稿。</h1>
              </div>
            ) : (
              <>
                <header className="editor-heading">
                  <div>
                    <span className="editor-breadcrumb">
                      <FileText size={13} />
                      <span>
                        {kindLabelFor(kind, definition?.label || "内容")}
                      </span>
                      <ChevronRight size={12} />
                      <code>{entry ? identifier : "新建草稿"}</code>
                    </span>
                    <h1
                      title={String(
                        payload[form?.titleField || "name"] || "新建内容",
                      )}
                    >
                      {String(
                        payload[form?.titleField || "name"] || "新建内容",
                      )}
                    </h1>
                    <div className="editor-meta">
                      <span
                        className={`badge ${revision?.state || "draft"}`}
                        title={baseId ? "已保存修订的审核状态" : "新草稿"}
                      >
                        {baseId && dirty ? "已保存 · " : ""}
                        {states[revision?.state || "draft"]}
                      </span>
                      {dirty ? (
                        <span className="unsaved-dot">有未保存改动</span>
                      ) : baseId ? (
                        <span className="revision-reference">
                          修订 {baseId.slice(0, 8)} · v
                          {revision?.schema_version}
                        </span>
                      ) : (
                        <span>尚未保存</span>
                      )}
                      <span
                        id="revision-validation-status"
                        className="validation-label"
                        data-state={validationState}
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {validationState === "saved-valid" ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <CircleDashed size={13} />
                        )}
                        {validationLabel}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`editor-actions ${readonly || catalogOpen ? "" : "is-editable"}`}
                    role="group"
                    aria-label="编辑操作"
                  >
                    <button
                      className="button secondary"
                      disabled={busy || !baseId || dirty}
                      aria-busy={pendingAction === "validate"}
                      aria-describedby={
                        busy
                          ? "operation-status"
                          : readonly
                            ? "revision-validation-status"
                            : "revision-validation-status editor-action-help"
                      }
                      title={validationReason || "校验已保存修订并生成私有预览"}
                      onClick={() => void validate()}
                    >
                      <ShieldCheck size={16} />
                      {pendingAction === "validate"
                        ? "正在校验…"
                        : "校验与预览"}
                    </button>
                    <button
                      className="button primary"
                      disabled={busy || readonly}
                      aria-busy={pendingAction === "save"}
                      aria-describedby={
                        busy
                          ? "operation-status"
                          : gitOwned
                            ? "git-owned-help"
                            : unsupportedVersion
                              ? "schema-version-help"
                              : "editor-action-help"
                      }
                      onClick={() => void save()}
                    >
                      <Save size={16} />
                      {pendingAction === "save" ? "正在保存…" : "保存草稿"}
                    </button>
                    {!readonly && (
                      <span
                        className={`editor-save-state ${dirty ? "is-dirty" : ""}`}
                      >
                        <span
                          className="editor-save-copy"
                          id="editor-action-help"
                        >
                          {error ? (
                            <AlertCircle size={12} />
                          ) : dirty ? (
                            <span className="status-dot" />
                          ) : (
                            <Check size={12} />
                          )}
                          {error ? (
                            <button
                              type="button"
                              className="save-feedback-link"
                              onClick={() => {
                                const message =
                                  document.getElementById("operation-status");
                                message?.focus({ preventScroll: true });
                                message?.scrollIntoView({ block: "center" });
                              }}
                            >
                              操作未完成，查看原因
                            </button>
                          ) : busy ? (
                            "操作进行中，请稍候"
                          ) : dirty ? (
                            "先保存，再校验"
                          ) : baseId ? (
                            "当前修订已保存"
                          ) : (
                            "保存后可校验"
                          )}
                        </span>
                        <span className="mobile-action-note">
                          仅保存草稿，不会自动上线
                        </span>
                      </span>
                    )}
                  </div>
                </header>
                {entry && entry.head_revision_id !== baseId && (
                  <div className="inline-warning">
                    当前查看的不是最新修订。未保存内容已保留；保存会被冲突保护拦截。
                    <button
                      className="quiet"
                      disabled={busy}
                      onClick={() => {
                        if (discard())
                          void perform("open", () => openEntry(entry));
                      }}
                    >
                      查看最新版本
                    </button>
                  </div>
                )}
                {gitOwned && (
                  <div className="inline-info" id="git-owned-help">
                    <GitBranch size={16} />
                    此类型由 Git
                    管理，不能通过表单修改。可以校验、查看差异和审核。
                  </div>
                )}
                {unsupportedVersion && (
                  <div className="inline-warning" id="schema-version-help">
                    此修订版本没有已安装的表单适配器，仅可查看历史差异。请部署对应版本的契约后再编辑。
                  </div>
                )}
                {!entry && (
                  <div className="new-record-fields">
                    <label>
                      内容类型
                      <select
                        aria-label="新建内容类型"
                        disabled={busy}
                        value={kind}
                        onChange={(event) => {
                          if (!discard()) return;
                          const kind = event.target.value;
                          setKind(kind);
                          setPayload(
                            emptyValue(
                              contracts.forms[kind].payload,
                            ) as Dictionary,
                          );
                          setAttachments(
                            emptyValue(
                              contracts.forms[kind].attachments,
                            ) as Dictionary,
                          );
                          setIdentifier("");
                          setTranslations([]);
                          setDirty(false);
                        }}
                      >
                        {Object.entries(contracts.kinds)
                          .filter(([, value]) => value.owner === "database")
                          .map(([kind, value]) => (
                            <option key={kind} value={kind}>
                              {kindLabelFor(kind, value.label)}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label>
                      设置稳定标识
                      <input
                        aria-label="设置稳定标识"
                        disabled={busy}
                        placeholder={
                          kind === "repository-research"
                            ? "owner/repository"
                            : kind === "step"
                              ? "2d/new-step"
                              : "short-stable-id"
                        }
                        value={identifier}
                        onChange={(event) => {
                          const value = event.target.value;
                          setIdentifier(value);
                          const fields = form?.identityFields || ["id"];
                          const next = { ...payload };
                          fields.forEach((field, index) => {
                            next[field] =
                              fields.length === 1
                                ? value
                                : value.split("/")[index] || "";
                          });
                          setPayload(next);
                          setDirty(true);
                        }}
                      />
                    </label>
                    <small>
                      URL 由统一地址适配器生成。稳定标识不随标题变化。
                    </small>
                  </div>
                )}
                <nav
                  className="editor-tabs"
                  role="tablist"
                  aria-label="编辑视图"
                >
                  {[
                    ["content", "内容", FileText],
                    ["media", "媒体与出处", Image],
                    ["translations", "译文", Layers3],
                    ["review", "修订与审核", GitBranch],
                    ["preview", "预览", ShieldCheck],
                  ].map(([value, label, Icon]) => {
                    const Glyph = Icon as typeof FileText;
                    return (
                      <button
                        id={`tab-${value}`}
                        role="tab"
                        aria-selected={tab === value}
                        aria-controls={`panel-${value}`}
                        tabIndex={tab === value ? 0 : -1}
                        key={String(value)}
                        onClick={() => setTab(String(value))}
                        onKeyDown={(event) => {
                          const tabs = [
                            "content",
                            "media",
                            "translations",
                            "review",
                            "preview",
                          ];
                          if (
                            ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                              event.key,
                            )
                          ) {
                            event.preventDefault();
                            const next =
                              event.key === "Home"
                                ? 0
                                : event.key === "End"
                                  ? 4
                                  : (tabs.indexOf(tab) +
                                      (event.key === "ArrowRight" ? 1 : 4)) %
                                    5;
                            setTab(tabs[next]);
                            document
                              .getElementById(`tab-${tabs[next]}`)
                              ?.focus();
                          }
                        }}
                      >
                        <Glyph size={15} />
                        {String(label)}
                      </button>
                    );
                  })}
                </nav>
                <div
                  className="editor-content"
                  role="tabpanel"
                  id={`panel-${tab}`}
                  aria-labelledby={`tab-${tab}`}
                >
                  {tab === "content" && form && (
                    <>
                      <div className="panel-heading">
                        <div>
                          <h2>内容详情</h2>
                          <p>保留英文原始内容，译文在独立标签页维护。</p>
                        </div>
                        <span>
                          <span className="required-mark">*</span> 为必填字段
                        </span>
                      </div>
                      <p className="editor-guidance">
                        <ShieldCheck size={14} />
                        草稿可以未完成。校验检查内容契约，不代表实际复现或独立事实核查。
                      </p>
                      <fieldset
                        disabled={busy || readonly}
                        className="form-surface"
                      >
                        <SchemaForm
                          key={`${key}:${baseId}:${kind}:payload`}
                          schema={form.payload}
                          value={payload}
                          path="payload"
                          label="内容字段"
                          issues={issues.filter(
                            (issue) => !issue.key || issue.key === key,
                          )}
                          lockedPaths={form.identityFields.map(
                            (field) => `payload.${field}`,
                          )}
                          onChange={(value) => {
                            setPayload(value as Dictionary);
                            setDirty(true);
                          }}
                          upload={upload}
                        />
                      </fieldset>
                    </>
                  )}
                  {tab === "media" && form && (
                    <>
                      <div className="panel-heading">
                        <div>
                          <h2>媒体与出处</h2>
                          <p>图标、项目媒体与学习媒体在这里独立维护。</p>
                        </div>
                        <Image size={19} />
                      </div>
                      <p className="editor-guidance">
                        <ShieldCheck size={14} />
                        保留原作者、出处和许可说明。图片仅私有暂存，移除 EXIF
                        并转为无损 WebP，不会自动发布。
                      </p>
                      {Object.keys(form.attachments.properties || {}).length ===
                        0 && (
                        <div className="empty-state">
                          <Image />
                          <h2>此类型不使用媒体附件。</h2>
                          <p>原始出处与正文保留在内容页，没有被隐藏的附件。</p>
                        </div>
                      )}
                      {Object.keys(form.attachments.properties || {}).length >
                        0 && (
                        <fieldset
                          disabled={busy || readonly}
                          className="form-surface"
                        >
                          <SchemaForm
                            key={`${key}:${baseId}:${kind}:attachments`}
                            schema={form.attachments}
                            value={attachments}
                            path="attachments"
                            label="媒体与归属"
                            issues={issues.filter(
                              (issue) => !issue.key || issue.key === key,
                            )}
                            onChange={(value) => {
                              setAttachments(value as Dictionary);
                              setDirty(true);
                            }}
                            upload={upload}
                          />
                        </fieldset>
                      )}
                    </>
                  )}
                  {tab === "translations" && (
                    <>
                      <p className="panel-intro">
                        原文改变后，旧指纹会失效。请明确核对每个字段，不会自动批准旧译文。
                      </p>
                      <fieldset
                        className="translation-surface"
                        disabled={busy || readonly}
                      >
                        {translations.map((row, index) => (
                          <section
                            className="translation-card"
                            key={`${row.locale}:${row.field}`}
                          >
                            <div className="translation-heading">
                              <strong>
                                {row.locale} · {labelFor(row.field)}
                              </strong>
                              <button
                                className="quiet"
                                onClick={() => {
                                  setTranslations(
                                    translations.filter(
                                      (_, at) => at !== index,
                                    ),
                                  );
                                  setDirty(true);
                                }}
                              >
                                移除译文
                              </button>
                            </div>
                            <div className="source-text">
                              <small>当前原文</small>
                              <p>
                                {Array.isArray(payload[row.field])
                                  ? (payload[row.field] as Json[]).join("\n")
                                  : String(payload[row.field] ?? "字段已移除")}
                              </p>
                            </div>
                            <label htmlFor={`translation-${index}`}>译文</label>
                            {typeof row.value === "string" ? (
                              <textarea
                                id={`translation-${index}`}
                                rows={4}
                                value={row.value}
                                onChange={(event) => {
                                  setTranslations(
                                    translations.map((value, at) =>
                                      at === index
                                        ? {
                                            ...value,
                                            value: event.target.value,
                                          }
                                        : value,
                                    ),
                                  );
                                  setDirty(true);
                                }}
                              />
                            ) : (
                              row.value.map((value, item) => (
                                <textarea
                                  id={
                                    item === 0
                                      ? `translation-${index}`
                                      : undefined
                                  }
                                  aria-label={`译文 ${item + 1}`}
                                  key={item}
                                  rows={2}
                                  value={value}
                                  onChange={(event) => {
                                    setTranslations(
                                      translations.map((value, at) =>
                                        at === index
                                          ? {
                                              ...value,
                                              value: (
                                                value.value as string[]
                                              ).map((old, position) =>
                                                position === item
                                                  ? event.target.value
                                                  : old,
                                              ),
                                            }
                                          : value,
                                      ),
                                    );
                                    setDirty(true);
                                  }}
                                />
                              ))
                            )}
                            <div
                              className={`translation-review ${sourceHashes[row.field] === row.source_hash ? "is-current" : "is-stale"}`}
                            >
                              <span>
                                {sourceHashes[row.field] === row.source_hash
                                  ? "原文指纹一致"
                                  : "原文已变化 / 尚未核对"}
                              </span>
                              <button
                                className="button secondary small"
                                onClick={async () => {
                                  const hash = await sourceHash(
                                    payload[row.field],
                                  );
                                  setTranslations(
                                    translations.map((value, at) =>
                                      at === index
                                        ? { ...value, source_hash: hash }
                                        : value,
                                    ),
                                  );
                                  setDirty(true);
                                }}
                              >
                                已核对当前原文
                              </button>
                            </div>
                          </section>
                        ))}
                        <div className="add-translation">
                          <label>
                            语言
                            <select
                              aria-label="译文语言"
                              value={newLocale}
                              onChange={(event) =>
                                setNewLocale(event.target.value)
                              }
                            >
                              {contracts.locales
                                .filter((locale) => locale !== "en")
                                .map((locale) => (
                                  <option key={locale} value={locale}>
                                    {locale}
                                  </option>
                                ))}
                            </select>
                          </label>
                          <label>
                            字段
                            <select
                              aria-label="译文字段"
                              value={newField}
                              onChange={(event) =>
                                setNewField(event.target.value)
                              }
                            >
                              <option value="">选择字段…</option>
                              {contracts.translatable[kind]
                                ?.filter(
                                  (field) =>
                                    !translations.some(
                                      (row) =>
                                        row.locale === newLocale &&
                                        row.field === field,
                                    ),
                                )
                                .map((field) => (
                                  <option key={field} value={field}>
                                    {labelFor(field)}
                                  </option>
                                ))}
                            </select>
                          </label>
                          <button
                            className="button secondary"
                            disabled={!newField}
                            onClick={() => {
                              setTranslations([
                                ...translations,
                                {
                                  locale: newLocale,
                                  field: newField,
                                  value: Array.isArray(payload[newField])
                                    ? (payload[newField] as Json[]).map(
                                        () => "",
                                      )
                                    : "",
                                  source_hash: "",
                                },
                              ]);
                              setNewField("");
                              setDirty(true);
                            }}
                          >
                            添加译文
                          </button>
                        </div>
                      </fieldset>
                    </>
                  )}
                  {tab === "review" && (
                    <>
                      <div className="review-card">
                        <h2>修订与审核</h2>
                        <p>
                          审核必须说明依据；作者不能审核自己的修订。批准后还需冻结、构建与部署。
                        </p>
                        <label htmlFor="review-note">审核说明</label>
                        <textarea
                          id="review-note"
                          disabled={busy}
                          rows={4}
                          placeholder="检查了哪些来源、修改是否有依据、哪些内容未实际运行…"
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                        />
                        <div className="review-actions">
                          <button
                            className="button secondary"
                            disabled={busy || Boolean(reviewReason("submit"))}
                            aria-busy={pendingAction === "submit"}
                            aria-describedby={actionDescription("submit-help")}
                            onClick={() =>
                              baseId && void review("submit", [baseId])
                            }
                          >
                            {pendingAction === "submit"
                              ? "正在提交…"
                              : "提交审核"}
                          </button>
                          <button
                            className="button primary"
                            disabled={busy || Boolean(reviewReason("approve"))}
                            aria-busy={pendingAction === "approve"}
                            aria-describedby={actionDescription("approve-help")}
                            onClick={() =>
                              baseId && void review("approve", [baseId])
                            }
                          >
                            {pendingAction === "approve"
                              ? "正在批准…"
                              : "批准修订"}
                          </button>
                          <button
                            className="button secondary danger"
                            disabled={busy || Boolean(reviewReason("reject"))}
                            aria-busy={pendingAction === "reject"}
                            aria-describedby={actionDescription("reject-help")}
                            onClick={() =>
                              baseId && void review("reject", [baseId])
                            }
                          >
                            {pendingAction === "reject"
                              ? "正在退回…"
                              : "退回修改"}
                          </button>
                        </div>
                        {!busy && (
                          <ActionRequirements items={reviewRequirements} />
                        )}
                        {revision?.review_note && (
                          <p className="recorded-note">
                            上次审核：{revision.review_note}
                          </p>
                        )}
                      </div>
                      <section className="history-section">
                        <h2>修订历史</h2>
                        {history.map((revision) => (
                          <button
                            className={`history-row ${revision.id === baseId ? "is-selected" : ""}`}
                            key={revision.id}
                            disabled={busy}
                            aria-current={
                              revision.id === baseId ? "true" : undefined
                            }
                            onClick={() => {
                              if (entry && discard())
                                void perform("open", async () => {
                                  await openEntry(entry, revision.id);
                                  setTab("review");
                                });
                            }}
                          >
                            <span>
                              <code>{revision.id.slice(0, 8)}</code>
                              <small>{formatDate(revision.created_at)}</small>
                            </span>
                            <span className={`badge ${revision.state}`}>
                              {states[revision.state]}
                            </span>
                            <span>
                              v{revision.schema_version}
                              {revision.validated ? " · 已校验" : ""}
                            </span>
                          </button>
                        ))}
                      </section>
                      <RevisionDiff
                        revision={revision}
                        parent={parent}
                        dirty={dirty}
                      />
                    </>
                  )}
                  {tab === "preview" &&
                    (preview ? (
                      <div className="content-preview">
                        <p
                          className={`preview-scope ${dirty ? "has-local-changes" : ""}`}
                        >
                          <ShieldCheck size={14} />
                          {dirty
                            ? "以下预览来自已保存修订，不包含当前本地修改。"
                            : "预览仅对应已保存修订；校验通过不等于发布。"}
                        </p>
                        <span className="eyebrow">
                          PRIVATE VALIDATED PREVIEW
                        </span>
                        <h2>{preview.title}</h2>
                        <p className="preview-lead">{preview.description}</p>
                        {preview.blocks
                          .filter(
                            (block) =>
                              !["title", "lead"].includes(String(block.type)) &&
                              block.section !== "metadata",
                          )
                          .map((block, index) => (
                            <PreviewBlock block={block} key={index} />
                          ))}
                        {preview.markdown !== undefined && (
                          <section aria-label="冻结文档原文">
                            <h3>本修订的完整 Markdown（只读、不执行）</h3>
                            <pre className="source-markdown">
                              {preview.markdown}
                            </pre>
                          </section>
                        )}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <ShieldCheck />
                        <h2>预览来自已保存、已校验的修订。</h2>
                        <p>未保存的表单不会伪装成线上内容。</p>
                        <button
                          className="button secondary"
                          disabled={busy || !baseId || dirty}
                          aria-busy={pendingAction === "validate"}
                          aria-describedby={
                            busy
                              ? "operation-status"
                              : validationReason
                                ? "preview-validation-help"
                                : undefined
                          }
                          onClick={() => void validate()}
                        >
                          {pendingAction === "validate"
                            ? "正在生成预览…"
                            : "校验并生成私有预览"}
                        </button>
                        {validationReason && (
                          <p
                            className="action-help"
                            id="preview-validation-help"
                          >
                            {validationReason}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
          </main>
        </div>
      )}
      <footer className="studio-footer">
        <span>
          <ShieldCheck size={13} /> 权限由数据库执行 · 令牌仅存服务端
        </span>
        <span>内容版本与数据库迁移版本独立</span>
      </footer>
    </div>
  );
}
function PreviewBlock({ block }: { block: Record<string, unknown> }) {
  const label = typeof block.label === "string" ? block.label : "";
  if (block.type === "text")
    return (
      <section>
        <h3>{label}</h3>
        <p>{String(block.value)}</p>
      </section>
    );
  if (block.type === "list")
    return (
      <section>
        <h3>{label}</h3>
        <ul>
          {(block.items as string[]).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    );
  if (block.type === "links")
    return (
      <section>
        <h3>{label}</h3>
        <ul>
          {(block.items as { label: string; url: string; note?: string }[]).map(
            (item, index) => (
              <li key={index}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
                {item.note && <p>{item.note}</p>}
              </li>
            ),
          )}
        </ul>
      </section>
    );
  if (block.type === "image" || block.type === "video") {
    const src = String(block.src);
    if (/^https?:/.test(src))
      return (
        <section>
          <h3>{label}</h3>
          <a href={src} target="_blank" rel="noreferrer">
            打开外部媒体来源
          </a>
        </section>
      );
    const path = `/api/source-media?path=${encodeURIComponent(src)}`;
    return (
      <section>
        <h3>{label}</h3>
        {block.type === "image" ? (
          <img src={path} alt={String(block.alt || label)} />
        ) : (
          <video src={path} controls preload="none" />
        )}
      </section>
    );
  }
  if (block.type === "facts")
    return (
      <section>
        <h3>{label}</h3>
        <FactList items={block.items as Fact[]} />
      </section>
    );
  return null;
}
interface Fact {
  type: string;
  label: string;
  value?: string;
  url?: string;
  items?: Fact[];
}
function FactList({ items }: { items: Fact[] }) {
  return (
    <dl>
      {items.map((item, index) => (
        <div key={index}>
          <dt>{item.label}</dt>
          <dd>
            {item.type === "group" ? (
              <FactList items={item.items || []} />
            ) : item.type === "link" ? (
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.url}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
