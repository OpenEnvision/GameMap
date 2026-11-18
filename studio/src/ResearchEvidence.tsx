import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react";
import { api, type Dictionary } from "./api";

interface Finding {
  source_key: string;
  source_title: string;
  ordinal: number;
  kind: string;
  title: string;
  excerpt: string;
  fields: Dictionary;
  catalog_keys: string[];
}
interface Results {
  total: number;
  sources: number;
  offset: number;
  limit: number;
  items: Finding[];
}
interface Source {
  key: string;
  title: string;
  format: string;
  original_text: string;
  markdown: string;
  source: {
    repository: string;
    revision: string;
    path: string;
    sha256: string;
    bytes: number;
  };
  provenance: Dictionary;
  findings: {
    ordinal: number;
    title: string;
    text: string;
    fields: Dictionary;
    links: string[];
    catalog_keys: string[];
  }[];
}
const kinds: Record<string, string> = {
  section: "审核记录",
  "table-row": "清单条目",
  candidate: "候选记录",
};
const formats: Record<string, string> = {
  "archived-markdown": "原始 Markdown",
  "rendered-page-reconstruction": "静态页面重建（原始 Markdown 缺失）",
  "import-index": "历史导入索引",
  "native-json": "原始 JSON",
};

export function ResearchEvidence({
  onOpenEntry,
}: {
  onOpenEntry: (key: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState({ text: "", offset: 0 });
  const [results, setResults] = useState<Results | null>(null);
  const [source, setSource] = useState<Source | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  useEffect(() => {
    let current = true;
    setLoading(true);
    setError("");
    api<Results>(
      `/research-sources?q=${encodeURIComponent(query.text)}&offset=${query.offset}`,
    )
      .then((value) => {
        if (current) setResults(value);
      })
      .catch(() => {
        if (current) setError("研究证据加载失败，请重新搜索。");
      })
      .finally(() => {
        if (current) setLoading(false);
      });
    return () => {
      current = false;
    };
  }, [query]);
  useEffect(
    () => () => {
      request.current++;
    },
    [],
  );
  async function openSource(key: string) {
    const id = ++request.current;
    setLoading(true);
    setError("");
    try {
      const value = await api<{ source: Source }>(`/research-sources/${key}`);
      if (id === request.current) setSource(value.source);
    } catch {
      if (id === request.current) setError("来源读取失败，请重试。");
    } finally {
      if (id === request.current) setLoading(false);
    }
  }
  function downloadOriginal(value: Source) {
    const blob = new Blob([value.original_text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob),
      link = document.createElement("a");
    link.href = url;
    link.download = value.source.path.split("/").at(-1) + ".txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <main id="editor" className="release-page research-evidence" tabIndex={-1}>
      <div className="page-title">
        <div>
          <span className="eyebrow">RESEARCH EVIDENCE</span>
          <h1>研究证据</h1>
          <p>
            搜索结果、审核记录和原始来源已入库；候选与排除项不计入已验证游戏。
          </p>
        </div>
      </div>
      <p className="research-boundary">
        历史来源不是新的审核结论。原有许可修正、未构建、未试玩及未运行测试等限制保持不变；此处不执行原始
        HTML 或候选代码，也不改变发布状态。
      </p>
      {error && <p role="alert">{error}</p>}
      {source ? (
        <section className="research-source" aria-busy={loading}>
          <button
            className="button"
            onClick={() => {
              request.current++;
              setLoading(false);
              setSource(null);
            }}
          >
            <ArrowLeft size={15} />
            返回搜索结果
          </button>
          <h2>{source.title}</h2>
          <dl className="research-source-meta">
            <dt>来源类型</dt>
            <dd>{formats[source.format] || source.format}</dd>
            <dt>固定版本</dt>
            <dd>{source.source.revision}</dd>
            <dt>来源路径</dt>
            <dd>{source.source.path}</dd>
            <dt>SHA-256</dt>
            <dd>{source.source.sha256}</dd>
            <dt>原始字节</dt>
            <dd>{source.source.bytes.toLocaleString()}</dd>
          </dl>
          <button className="button" onClick={() => downloadOriginal(source)}>
            <Download size={15} />
            下载原始文本
          </button>
          {source.findings.map((finding) => (
            <article key={finding.ordinal} className="research-finding">
              <h3>{finding.title}</h3>
              <p className="research-plain-text">{finding.text}</p>
              <div className="research-entry-links">
                {finding.catalog_keys.map((key) => (
                  <button
                    key={key}
                    className="button"
                    onClick={() => onOpenEntry(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </article>
          ))}
          <details>
            <summary>完整原始文本（只读，不执行）</summary>
            <pre>{source.original_text}</pre>
          </details>
          <details>
            <summary>来源与转换记录</summary>
            <pre>{JSON.stringify(source.provenance, null, 2)}</pre>
          </details>
        </section>
      ) : (
        <>
          <form
            className="research-search"
            onSubmit={(event) => {
              event.preventDefault();
              setQuery({ text: draft.trim(), offset: 0 });
            }}
          >
            <label className="catalog-search">
              <Search size={16} />
              <input
                aria-label="搜索研究证据"
                maxLength={256}
                placeholder="项目、许可、来源或审核限制…"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </label>
            <button className="button" type="submit" disabled={loading}>
              搜索
            </button>
          </form>
          <p role="status">
            {loading
              ? "正在读取研究证据…"
              : results
                ? `${results.sources} 份来源 · ${results.total} 条匹配记录`
                : ""}
          </p>
          <div className="research-results" aria-busy={loading}>
            {!error &&
              results?.items.map((finding) => (
                <article
                  key={`${finding.source_key}:${finding.ordinal}`}
                  className="research-finding"
                >
                  <span className="eyebrow">
                    {kinds[finding.kind] || finding.kind}
                  </span>
                  <h2>
                    <button
                      className="research-result-title"
                      onClick={() => openSource(finding.source_key)}
                    >
                      {finding.title}
                    </button>
                  </h2>
                  <p className="research-source-title">
                    {finding.source_title}
                  </p>
                  <p className="research-plain-text">{finding.excerpt}</p>
                  {finding.kind === "candidate" && (
                    <p>
                      原始状态：{String(finding.fields.status)} ·
                      不作为已验证游戏收录
                    </p>
                  )}
                  <div className="research-entry-links">
                    {finding.catalog_keys.map((key) => (
                      <button
                        className="button"
                        key={key}
                        onClick={() => onOpenEntry(key)}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
          </div>
          {!loading && !error && results?.total === 0 && (
            <p className="empty-state">
              没有匹配的证据记录。试试项目名称或更短的关键词。
            </p>
          )}
          {results && results.total > results.limit && (
            <nav className="research-pagination" aria-label="研究证据分页">
              <button
                className="button"
                disabled={loading || query.offset === 0}
                onClick={() =>
                  setQuery({
                    ...query,
                    offset: Math.max(0, query.offset - results.limit),
                  })
                }
              >
                <ChevronLeft size={15} />
                上一页
              </button>
              <span>
                {query.offset + 1}–
                {Math.min(query.offset + results.limit, results.total)} /{" "}
                {results.total}
              </span>
              <button
                className="button"
                disabled={
                  loading || query.offset + results.limit >= results.total
                }
                onClick={() =>
                  setQuery({ ...query, offset: query.offset + results.limit })
                }
              >
                下一页
                <ChevronRight size={15} />
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}
