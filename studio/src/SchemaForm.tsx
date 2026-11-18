import { useId } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Link2,
  LockKeyhole,
  Plus,
  Trash2,
} from "lucide-react";
import type { Json, Dictionary, Issue, Schema } from "./api";
import { fieldId, labelFor } from "./api";
import { FormOutline } from "./FormOutline";
import { EnumChoices } from "./EnumChoices";

function publicUrl(value: string | number) {
  try {
    const url = new URL(String(value));
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

const typeOf = (value: Json | undefined) =>
  value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
function branches(schema: Schema) {
  return schema.anyOf || [schema];
}
export function emptyValue(schema: Schema): Json {
  if (schema.const !== undefined) return schema.const;
  if (schema.anyOf)
    return emptyValue(
      schema.anyOf.find((item) => item.type === "null") || schema.anyOf[0],
    );
  if (schema.type === "null") return null;
  if (schema.type === "object" || schema.properties)
    return Object.fromEntries(
      (schema.required || []).map((key) => [
        key,
        emptyValue(schema.properties?.[key] || {}),
      ]),
    );
  if (schema.type === "array") return [];
  if (schema.type === "boolean") return false;
  return "";
}
const objectValue = (value: Json | undefined): Dictionary =>
  value && !Array.isArray(value) && typeof value === "object" ? value : {};
const formSections = [
  {
    id: "basics",
    title: "基本信息",
    description: "先把内容的名称与核心价值说清楚。",
    keys: [
      "title",
      "name",
      "subtitle",
      "summary",
      "description",
      "id",
      "recordingId",
      "label",
    ],
  },
  {
    id: "classification",
    title: "分类与技术",
    description: "选择适用的工具、技术栈与内容分类。",
    keys: [
      "kind",
      "category",
      "type",
      "agents",
      "engine",
      "track",
      "tags",
      "stages",
      "dimensions",
      "uses",
      "use",
      "stack",
      "group",
      "role",
      "resourceIds",
      "resourceId",
      "catalogResourceId",
    ],
  },
  {
    id: "sources",
    title: "来源与链接",
    description: "保留原始出处，让每条内容可以追溯。",
    keys: [
      "url",
      "links",
      "sourceUrl",
      "codeUrl",
      "evidenceUrl",
      "tutorial",
      "demo",
      "source",
      "evidence",
      "originalUrl",
      "source_urls",
      "sourceMode",
      "generatorKey",
      "sourceHash",
    ],
  },
  {
    id: "details",
    title: "内容与边界",
    description: "记录详细内容、使用边界与审核依据。",
    keys: [] as string[],
  },
];

interface Props {
  schema: Schema;
  value: Json | undefined;
  path: string;
  label: string;
  required?: boolean;
  onChange: (value: Json | undefined) => void;
  upload?: (path: string, file: File) => Promise<void>;
  lockedPaths?: string[];
  issues?: Issue[];
}
export function SchemaForm(props: Props) {
  const {
    schema,
    value,
    path,
    label,
    onChange,
    upload,
    required,
    lockedPaths = [],
    issues = [],
  } = props;
  const locked = lockedPaths.includes(path);
  const fileId = useId();
  const options = branches(schema),
    nullable = options.some((item) => item.type === "null");
  const choices = options.filter((item) => item.type !== "null");
  let selected = choices.findIndex((item) => item.type === typeOf(value));
  if (typeof value === "string" && value.includes("T")) {
    const timestamp = choices.findIndex((item) => item.format === "date-time");
    if (timestamp >= 0) selected = timestamp;
  }
  const current = choices[Math.max(0, selected)] || schema;
  const id = fieldId(path),
    data = objectValue(value);
  const problem = issues.find((issue) => issue.field === path)?.message;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy =
    [problem ? errorId : "", locked || current.description ? helpId : ""]
      .filter(Boolean)
      .join(" ") || undefined;
  const validationMessage = problem && (
    <p className="field-error" id={errorId}>
      <AlertCircle size={13} aria-hidden="true" />
      {problem}
    </p>
  );
  const fieldKey = path.includes(".") ? path.split(".").at(-1) : undefined;
  const technicalKey =
    fieldKey && !/^\d+$/.test(fieldKey) ? fieldKey : undefined;
  const heading = (
    <span className="field-heading">
      <span className="field-label">
        {locked && <LockKeyhole size={12} aria-hidden="true" />}
        {label}
        {required && (
          <span className="required-mark" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {technicalKey && (
        <code className="field-key" aria-hidden="true">
          {technicalKey}
        </code>
      )}
    </span>
  );
  if (nullable && value === null)
    return (
      <div
        id={id}
        tabIndex={-1}
        className={`nullable-field ${problem ? "is-invalid" : ""}`}
        role="group"
        aria-label={label}
        aria-invalid={problem ? true : undefined}
        aria-describedby={problem ? errorId : undefined}
      >
        <span>{heading}</span>
        <button
          type="button"
          className="quiet"
          onClick={() => onChange(emptyValue(choices[0]))}
        >
          添加记录
        </button>
        <small>未记录 / 不适用</small>
        {validationMessage}
      </div>
    );
  const variant = (
    <>
      {nullable && (
        <button
          type="button"
          className="quiet null-button"
          onClick={() => onChange(null)}
        >
          设为未记录
        </button>
      )}
      {choices.length > 1 && (
        <select
          className="variant-select"
          aria-label={`${label}的值类型`}
          value={Math.max(0, selected)}
          onChange={(event) =>
            onChange(emptyValue(choices[Number(event.target.value)]))
          }
        >
          {choices.map((choice, index) => (
            <option value={index} key={index}>
              {choice.type === "object"
                ? "结构化记录"
                : choice.type === "number"
                  ? "数字"
                  : "文本"}
              {choice.format ? ` · ${choice.format}` : ""}
            </option>
          ))}
        </select>
      )}
    </>
  );
  if (current.type === "object" || current.properties) {
    const fields = Object.entries(current.properties || {}),
      mandatory = new Set(current.required || []);
    const grouped = path === "payload";
    const optionalFields = fields.filter(([key]) => !mandatory.has(key));
    const includedOptional = optionalFields.filter(
      ([key]) => data[key] !== undefined,
    ).length;
    const sections = formSections
      .map((section, index) => ({
        ...section,
        fields: fields
          .filter(
            ([key]) =>
              mandatory.has(key) &&
              (index === formSections.length - 1
                ? !formSections.some((candidate) =>
                    candidate.keys.includes(key),
                  )
                : section.keys.includes(key)),
          )
          .sort(([left], [right]) =>
            index === 0
              ? section.keys.indexOf(left) - section.keys.indexOf(right)
              : 0,
          ),
      }))
      .filter((section) => section.fields.length > 0);
    const renderField = ([key, child]: [string, Schema]) => {
      const optional = !mandatory.has(key),
        included = data[key] !== undefined;
      const optionalError =
        optional && !included
          ? issues.find((issue) => issue.field === `${path}.${key}`)?.message
          : undefined;
      const optionalErrorId = `${fieldId(`${path}.${key}`)}-error`;
      const update = (next: Json | undefined) => {
        const copy = { ...data };
        if (next === undefined) delete copy[key];
        else copy[key] = next;
        onChange(copy);
      };
      return (
        <div
          key={key}
          className={optional ? "optional-field" : "object-field"}
          id={optional ? `optional-${fieldId(`${path}.${key}`)}` : undefined}
          tabIndex={optional ? -1 : undefined}
          data-field={key}
        >
          {optional && (
            <label className="optional-toggle">
              <input
                type="checkbox"
                checked={included}
                aria-invalid={optionalError ? true : undefined}
                aria-describedby={optionalError ? optionalErrorId : undefined}
                onChange={(event) =>
                  update(event.target.checked ? emptyValue(child) : undefined)
                }
              />
              <span className="field-heading">
                <span className="field-label">{labelFor(key)}</span>
                <code className="field-key" aria-hidden="true">
                  {key}
                </code>
              </span>
              <small>{included ? "已启用" : "可选"}</small>
            </label>
          )}
          {optionalError && (
            <p className="field-error" id={optionalErrorId}>
              <AlertCircle size={13} aria-hidden="true" />
              {optionalError}
            </p>
          )}
          {(!optional || included) && (
            <SchemaForm
              schema={child}
              value={data[key]}
              path={`${path}.${key}`}
              label={labelFor(key)}
              required={!optional}
              issues={issues}
              onChange={update}
              upload={upload}
              lockedPaths={lockedPaths}
            />
          )}
        </div>
      );
    };
    return (
      <fieldset
        id={id}
        tabIndex={-1}
        className={`schema-object ${path.includes(".") ? "is-nested" : ""} ${grouped ? "is-grouped" : ""} ${problem ? "is-invalid" : ""}`}
        aria-invalid={problem ? true : undefined}
        aria-describedby={problem ? errorId : undefined}
      >
        <legend>{heading}</legend>
        {variant}
        {validationMessage}
        {grouped ? (
          <>
            {sections.length > 1 && (
              <FormOutline
                sections={sections.map((section) => ({
                  id: `section-${path}-${section.id}`,
                  title: section.title,
                }))}
              />
            )}
            {sections.map((section, index) => (
              <section
                className="form-section"
                tabIndex={-1}
                id={`section-${path}-${section.id}`}
                key={section.id}
                aria-labelledby={`heading-${path}-${section.id}`}
              >
                <header className="form-section-heading">
                  <span className="section-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 id={`heading-${path}-${section.id}`}>
                      {section.title}
                    </h3>
                    <p>{section.description}</p>
                  </div>
                  <small>{section.fields.length} 个字段</small>
                </header>
                <div className="schema-fields">
                  {section.fields.map(renderField)}
                </div>
              </section>
            ))}
          </>
        ) : (
          <div className="schema-fields">
            {fields.filter(([key]) => mandatory.has(key)).map(renderField)}
          </div>
        )}
        {optionalFields.length > 0 && (
          <details className="optional-section">
            <summary>
              可选字段{" "}
              <span>
                {includedOptional
                  ? `已启用 ${includedOptional} / ${optionalFields.length}`
                  : `${optionalFields.length} 项可选`}
              </span>
            </summary>
            {optionalFields.map(renderField)}
          </details>
        )}
      </fieldset>
    );
  }
  if (current.type === "array") {
    const values = Array.isArray(value) ? value : [],
      item = current.items || {};
    if (item.enum)
      return (
        <fieldset
          id={id}
          tabIndex={-1}
          className={`schema-array enum-array ${problem ? "is-invalid" : ""}`}
          aria-invalid={problem ? true : undefined}
          aria-describedby={problem ? errorId : undefined}
        >
          <legend>
            {heading}
            <span
              className={`choice-count ${values.length ? "has-selection" : ""}`}
              aria-hidden="true"
            >
              {values.length} 项已选
            </span>
          </legend>
          {variant}
          {validationMessage}
          <EnumChoices
            options={item.enum}
            values={values}
            label={label}
            id={id}
            onChange={onChange}
          />
        </fieldset>
      );
    return (
      <fieldset
        id={id}
        tabIndex={-1}
        className={`schema-array ${problem ? "is-invalid" : ""}`}
        aria-invalid={problem ? true : undefined}
        aria-describedby={problem ? errorId : undefined}
      >
        <legend>{heading}</legend>
        {variant}
        {validationMessage}
        {!values.length && (
          <p className="array-empty">暂未添加记录，可按实际情况补充。</p>
        )}
        {values.map((value, index) => (
          <div className="array-item" key={index}>
            <SchemaForm
              schema={item}
              value={value}
              path={`${path}.${index}`}
              label={`${label} ${index + 1}`}
              issues={issues}
              onChange={(next) =>
                onChange(
                  values.map((previous, at) =>
                    at === index ? (next ?? "") : previous,
                  ),
                )
              }
              upload={upload}
              lockedPaths={lockedPaths}
            />
            <button
              type="button"
              className="quiet remove-item"
              aria-label={`移除 ${label} ${index + 1}`}
              onClick={() => onChange(values.filter((_, at) => at !== index))}
            >
              <Trash2 size={13} aria-hidden="true" />
              <span>移除</span>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="button secondary small"
          onClick={() => onChange([...values, emptyValue(item)])}
        >
          <Plus size={14} aria-hidden="true" />
          添加一项
        </button>
      </fieldset>
    );
  }
  if (current.type === "boolean")
    return (
      <div className={problem ? "is-invalid" : undefined}>
        <label className="boolean-field">
          <input
            id={id}
            type="checkbox"
            checked={value === true}
            aria-invalid={problem ? true : undefined}
            aria-describedby={problem ? errorId : undefined}
            onChange={(event) => onChange(event.target.checked)}
          />
          {heading}
          {variant}
        </label>
        {validationMessage}
      </div>
    );
  if (current.const !== undefined)
    return (
      <div className="scalar-field">
        <label htmlFor={id}>{heading}</label>
        <input
          id={id}
          value={String(current.const)}
          readOnly
          aria-invalid={problem ? true : undefined}
          aria-describedby={problem ? errorId : undefined}
        />
        <small>契约固定值，不能通过表单修改。</small>
        {validationMessage}
      </div>
    );
  const displayed =
    typeof value === "string" || typeof value === "number" ? value : "";
  const multiline =
    /summary|detail|description|note|limitation|deliverable|check|aiUse|finding|measure|task|credit/i.test(
      path.split(".").at(-1) || "",
    ) || String(displayed).length > 150;
  const mediaField = current["x-media-type"] === "image";
  const videoField = current["x-media-type"] === "video";
  const urlField = current.format === "uri";
  const href = urlField ? publicUrl(displayed) : undefined;
  return (
    <div
      className={`scalar-field ${locked ? "is-locked" : ""} ${problem ? "is-invalid" : ""}`}
    >
      <label htmlFor={id}>{heading}</label>
      {variant}
      {current.enum ? (
        <select
          id={id}
          value={String(displayed)}
          disabled={locked}
          aria-required={required}
          aria-invalid={problem ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">请选择…</option>
          {current.enum.map((option) => (
            <option key={String(option)} value={String(option)}>
              {String(option)}
            </option>
          ))}
        </select>
      ) : multiline && !urlField ? (
        <textarea
          id={id}
          rows={Math.min(
            8,
            Math.max(3, Math.ceil(String(displayed).length / 90)),
          )}
          value={displayed}
          readOnly={locked}
          aria-required={required}
          aria-invalid={problem ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <div className={urlField ? "linked-input" : "input-control"}>
          {urlField && (
            <Link2 className="field-url-icon" size={15} aria-hidden="true" />
          )}
          <input
            id={id}
            type={
              current.type === "number" || current.type === "integer"
                ? "number"
                : current.format === "date"
                  ? "date"
                  : urlField
                    ? "url"
                    : "text"
            }
            value={displayed}
            min={current.minimum}
            max={current.maximum}
            readOnly={locked}
            aria-required={required}
            aria-invalid={problem ? true : undefined}
            aria-describedby={describedBy}
            onChange={(event) =>
              onChange(
                (current.type === "number" || current.type === "integer") &&
                  event.target.value !== ""
                  ? Number(event.target.value)
                  : event.target.value,
              )
            }
          />
          {href && (
            <a
              className="field-open-link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`在新标签页查看 ${label}`}
              title="在新标签页查看"
            >
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
      {validationMessage}
      {mediaField &&
        typeof displayed === "string" &&
        /\.(png|jpe?g|webp|svg)$/i.test(displayed) &&
        !/^https?:\/\//.test(displayed) && (
          <img
            className="field-media-preview"
            src={`/api/source-media?path=${encodeURIComponent(displayed)}`}
            alt={`${label} 私有预览`}
          />
        )}
      {locked && <small id={helpId}>稳定引用标识，不会随标题变化。</small>}
      {videoField && (
        <small>
          视频引用受控本地文件或原作者外链；外链不包含在媒体包中，图片上传不会替代视频。
        </small>
      )}
      {current.description && (
        <small id={locked ? undefined : helpId}>{current.description}</small>
      )}
      {mediaField && upload && (
        <label className="file-upload" htmlFor={fileId}>
          上传图片到私有暂存区
          <input
            id={fileId}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (file) await upload(path, file);
              event.target.value = "";
            }}
          />
          <small>PNG / JPEG / WebP · 最多 10 MB · 移除 EXIF，不自动发布</small>
        </label>
      )}
    </div>
  );
}
