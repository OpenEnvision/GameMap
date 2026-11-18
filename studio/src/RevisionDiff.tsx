import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import type { Revision, Translation } from "./api";
import { labelFor } from "./field-labels";

interface Change {
  field: string;
  before: unknown;
  after: unknown;
}
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export function differences(
  before: unknown,
  after: unknown,
  prefix = "",
): Change[] {
  if (JSON.stringify(before) === JSON.stringify(after)) return [];
  if (
    (isObject(before) || before === undefined) &&
    (isObject(after) || after === undefined) &&
    (isObject(before) || isObject(after))
  ) {
    const left = before || {},
      right = after || {};
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])];
    if (!keys.length) return [{ field: prefix, before, after }];
    return keys.flatMap((key) =>
      differences(
        Object.hasOwn(left, key) ? left[key] : undefined,
        Object.hasOwn(right, key) ? right[key] : undefined,
        prefix ? `${prefix}.${key}` : key,
      ),
    );
  }
  return [{ field: prefix, before, after }];
}
function translationChanges(
  before: Translation[],
  after: Translation[],
): Change[] {
  const keyFor = (row: Translation) => `${row.locale}.${row.field}`;
  const left = new Map(before.map((row) => [keyFor(row), row]));
  const right = new Map(after.map((row) => [keyFor(row), row]));
  return [...new Set([...left.keys(), ...right.keys()])].flatMap((key) => {
    const previous = left.get(key),
      next = right.get(key);
    if (
      JSON.stringify(previous?.value) === JSON.stringify(next?.value) &&
      previous?.source_hash === next?.source_hash
    )
      return [];
    return [{ field: `translations.${key}`, before: previous, after: next }];
  });
}
function brief(value: unknown): string {
  if (value === undefined) return "未设置";
  if (value === null) return "未记录";
  if (typeof value === "boolean") return value ? "是" : "否";
  if (Array.isArray(value)) {
    if (!value.length || value.some((item) => typeof item === "object"))
      return `${value.length} 项`;
    const sample = value.slice(0, 3).map(String).join("、");
    return `${value.length} 项 · ${sample.slice(0, 100)}${value.length > 3 || sample.length > 100 ? "…" : ""}`;
  }
  if (isObject(value)) return `${Object.keys(value).length} 个字段`;
  const text = String(value);
  return text === ""
    ? "空文本"
    : text.length > 100
      ? `${text.slice(0, 100)}…`
      : text;
}
const raw = (value: unknown, missing: string) =>
  value === undefined
    ? missing
    : typeof value === "string"
      ? value
      : JSON.stringify(value, null, 2);

export function RevisionDiff({
  revision,
  parent,
  dirty,
}: {
  revision?: Revision;
  parent?: Revision;
  dirty: boolean;
}) {
  const missingParent = Boolean(revision?.parent_id && !parent);
  const bodyChanges = useMemo(
    () =>
      revision && !missingParent
        ? differences(parent?.body, revision.body)
        : [],
    [parent, revision, missingParent],
  );
  const translations = useMemo(
    () =>
      revision && !missingParent
        ? translationChanges(parent?.translations || [], revision.translations)
        : [],
    [parent, revision, missingParent],
  );
  const hasProjections = bodyChanges.some(
    (change) => change.field === "title" || change.field === "summary",
  );
  const all = [...bodyChanges, ...translations];
  // title/summary at the body root are derived projections, not extra authored fields.
  const groups = [
    {
      key: "payload",
      label: "内容字段",
      changes: bodyChanges.filter((change) =>
        change.field.startsWith("payload."),
      ),
    },
    {
      key: "attachments",
      label: "媒体与出处",
      changes: bodyChanges.filter((change) =>
        change.field.startsWith("attachments."),
      ),
    },
    { key: "translations", label: "译文", changes: translations },
  ];
  const count = groups.reduce(
    (total, group) => total + group.changes.length,
    0,
  );
  return (
    <section className="diff-section" aria-labelledby="revision-diff-heading">
      <h2 id="revision-diff-heading">
        本次修订改动 <span>{count} 个字段</span>
      </h2>
      {!revision ? (
        <p className="diff-scope">保存草稿后，可在这里查看修订对比。</p>
      ) : missingParent ? (
        <p className="diff-scope">
          父修订暂不可用，无法准确比较。请重新载入修订历史。
        </p>
      ) : (
        <>
          <p className={`diff-scope ${dirty ? "has-local-changes" : ""}`}>
            {parent ? (
              <>
                父修订 <code>{parent.id.slice(0, 8)}</code>{" "}
                <ArrowRight size={12} aria-label="对比" /> 当前修订{" "}
                <code>{revision.id.slice(0, 8)}</code>
              </>
            ) : (
              <>
                首次修订 <code>{revision.id.slice(0, 8)}</code> · 以下为新增内容
              </>
            )}
            <span>
              {dirty
                ? "仅比较已保存修订，不包含当前本地修改。"
                : "正文、附件与译文分别比较；审核状态不计入字段改动。"}
            </span>
          </p>
          {count ? (
            <div className="change-summary">
              {groups
                .filter((group) => group.changes.length)
                .map((group) => (
                  <section
                    className="change-group"
                    key={group.key}
                    aria-label={`${group.label}改动`}
                  >
                    <h3>
                      {group.label}
                      <span>{group.changes.length} 项</span>
                    </h3>
                    <ul>
                      {group.changes.map((change) => {
                        const translated = group.key === "translations";
                        const parts = change.field.split(".").slice(1);
                        const title = translated
                          ? `${labelFor(parts.slice(1).join("."))} · ${parts[0]}`
                          : parts.map(labelFor).join(" / ");
                        const previous = translated
                          ? (change.before as Translation | undefined)?.value
                          : change.before;
                        const next = translated
                          ? (change.after as Translation | undefined)?.value
                          : change.after;
                        const receiptOnly =
                          translated &&
                          JSON.stringify(previous) === JSON.stringify(next);
                        const type =
                          change.before === undefined
                            ? "added"
                            : change.after === undefined
                              ? "removed"
                              : "modified";
                        return (
                          <li key={change.field}>
                            <div className="change-heading">
                              <strong>{title}</strong>
                              <span className={`change-type ${type}`}>
                                {type === "added"
                                  ? "新增"
                                  : type === "removed"
                                    ? "移除"
                                    : "修改"}
                              </span>
                            </div>
                            {receiptOnly ? (
                              <p className="change-receipt">
                                译文未变，仅更新原文核对指纹。
                              </p>
                            ) : (
                              <p className="change-values">
                                <span>{brief(previous)}</span>
                                <ArrowRight size={13} aria-label="改为" />
                                <span>{brief(next)}</span>
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
            </div>
          ) : (
            <p className="diff-empty">正文、附件与译文均无字段差异。</p>
          )}
          {all.length > 0 && (
            <details className="technical-diff" key={revision.id}>
              <summary>
                查看完整技术差异{" "}
                <span>
                  {all.length} 项{hasProjections ? "，含派生字段" : ""}
                </span>
              </summary>
              <p>下方保留完整路径和值；长内容可在差异区域内滚动查看。</p>
              {all.map((change) => (
                <div className="diff-row" key={change.field}>
                  <code>{change.field}</code>
                  <div>
                    <section
                      className="diff-before"
                      aria-label={`${change.field} 修改前`}
                    >
                      <h4>修改前</h4>
                      <pre tabIndex={0}>{raw(change.before, "（不存在）")}</pre>
                    </section>
                    <section
                      className="diff-after"
                      aria-label={`${change.field} 修改后`}
                    >
                      <h4>修改后</h4>
                      <pre tabIndex={0}>{raw(change.after, "（已移除）")}</pre>
                    </section>
                  </div>
                </div>
              ))}
            </details>
          )}
        </>
      )}
    </section>
  );
}
