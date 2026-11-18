import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { Json } from "./api";

// Filtering is a view only: never sort, translate, normalize or discard schema values.
export function EnumChoices({
  options,
  values,
  label,
  id,
  onChange,
}: {
  options: Json[];
  values: Json[];
  label: string;
  id: string;
  onChange: (values: Json[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedOnly, setSelectedOnly] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const searchable = options.length > 8;
  const term = query.trim().toLocaleLowerCase();
  const visible = options.filter(
    (option) =>
      !searchable ||
      ((!selectedOnly || values.includes(option)) &&
        String(option).toLocaleLowerCase().includes(term)),
  );
  const clearQuery = () => {
    setQuery("");
    search.current?.focus();
  };
  return (
    <div className="enum-choices">
      {searchable && (
        <>
          <div className="choice-toolbar">
            <div className="choice-search">
              <Search size={15} aria-hidden="true" />
              <input
                ref={search}
                id={`${id}-search`}
                type="text"
                aria-label={`搜索${label}候选项`}
                aria-controls={`${id}-options`}
                autoComplete="off"
                placeholder="搜索候选项…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Escape" &&
                    !event.nativeEvent.isComposing &&
                    query
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                    clearQuery();
                  }
                }}
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label={`清除${label}搜索`}
                  onClick={clearQuery}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="button"
              className="button secondary choice-selected-toggle"
              aria-pressed={selectedOnly}
              aria-controls={`${id}-options`}
              onClick={() => setSelectedOnly(!selectedOnly)}
            >
              仅看已选
            </button>
          </div>
          <div className="choice-selection" aria-label={`${label}已选摘要`}>
            <span>已选</span>
            {values.length ? (
              <ul>
                {values.map((value) => (
                  <li key={String(value)}>{String(value)}</li>
                ))}
              </ul>
            ) : (
              <span>暂无</span>
            )}
          </div>
          <p className="choice-results" aria-live="polite" aria-atomic="true">
            显示 {visible.length} / {options.length} 项 · 已选 {values.length}{" "}
            项
          </p>
        </>
      )}
      <div className="checkbox-grid" id={`${id}-options`}>
        {visible.map((option) => (
          <label key={String(option)}>
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={(event) => {
                if (selectedOnly && !event.target.checked)
                  search.current?.focus();
                onChange(
                  event.target.checked
                    ? [...values, option]
                    : values.filter((item) => item !== option),
                );
              }}
            />
            {String(option)}
          </label>
        ))}
      </div>
      {searchable && !visible.length && (
        <div className="choice-empty">
          <p>
            {selectedOnly && !values.length
              ? "还没有已选项。"
              : "没有匹配的候选项，已选内容不会改变。"}
          </p>
          <button
            type="button"
            className="quiet"
            onClick={() => {
              setSelectedOnly(false);
              clearQuery();
            }}
          >
            显示全部候选项
          </button>
        </div>
      )}
    </div>
  );
}
