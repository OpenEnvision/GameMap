import { useRef, type KeyboardEvent } from "react";
import { useAtlasSearchState } from "../lib/search-state";
import { searchScopes, type SearchScope } from "../lib/search-scopes";
import { useSiteI18n } from "../lib/i18n";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";

export default function AtlasSearch(props: SharedProps) {
  const search = useAtlasSearchState();
  const { t } = useSiteI18n();
  // The first query downloads the search index; until results arrive the list
  // has nothing to show, so say what is happening instead of an empty panel.
  const pending =
    search.isLoading && !search.data && search.search.trim() !== "";
  const returnFocus = useRef<HTMLElement | null>(null);
  const openedAt = useRef("");
  const input = useRef<HTMLInputElement>(null);
  const changeScope = (scope: SearchScope) => {
    search.onScopeChange(scope);
    input.current?.focus();
  };
  // The result list registers keyboard navigation on window. Keep it from
  // intercepting the native activation of a focused scope or retry button.
  const keepButtonKeys = (event: KeyboardEvent<HTMLElement>) => {
    if (["Enter", "ArrowUp", "ArrowDown"].includes(event.key))
      event.stopPropagation();
  };
  return (
    <SearchDialog
      {...props}
      search={search.search}
      onSearchChange={search.onSearchChange}
      isLoading={pending}
      data={search.data}
    >
      <SearchDialogOverlay className="atlas-search-overlay" />
      <SearchDialogContent
        className="atlas-search-content"
        onOpenAutoFocus={() => {
          const element = document.activeElement;
          returnFocus.current = element instanceof HTMLElement ? element : null;
          openedAt.current = window.location.href;
        }}
        onCloseAutoFocus={(event) => {
          const element = returnFocus.current;
          // A dismissed programmatic dialog has no Radix Trigger to restore. Do
          // not focus the old page after a result has navigated somewhere else.
          if (
            window.location.href === openedAt.current &&
            element?.isConnected
          ) {
            event.preventDefault();
            element.focus({ preventScroll: true });
          }
          returnFocus.current = null;
        }}
      >
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput
            ref={input}
            type="search"
            aria-label={t("Search GameMap")}
            placeholder={t(
              search.scope === "docs"
                ? "Search guides and notes…"
                : "Search GameMap…",
            )}
          />
          <SearchDialogClose />
        </SearchDialogHeader>
        <div
          className="atlas-search-scopes"
          role="group"
          aria-label={t("Search scope")}
          onKeyDown={keepButtonKeys}
        >
          {searchScopes.map(([scope, label]) => (
            <button
              key={scope}
              type="button"
              aria-pressed={search.scope === scope}
              onClick={() => changeScope(scope)}
            >
              {t(label)}
            </button>
          ))}
        </div>
        <SearchDialogList
          className="atlas-search-results"
          Empty={() => (
            <div className="atlas-search-feedback">
              <p role="status">{t("No matches in this scope.")}</p>
              {search.scope !== "all" && (
                <button
                  type="button"
                  onKeyDown={keepButtonKeys}
                  onClick={() => changeScope("all")}
                >
                  {t("Search the entire site")}
                </button>
              )}
            </div>
          )}
        />
        {pending && (
          <p className="atlas-search-pending" role="status">
            <span className="atlas-search-spinner" aria-hidden="true" />
            {t("Searching the atlas…")}
          </p>
        )}
        {search.error && (
          <div className="atlas-search-feedback">
            <p role="status">{t("Search is temporarily unavailable.")}</p>
            <button
              type="button"
              onKeyDown={keepButtonKeys}
              onClick={() => {
                search.retry();
                input.current?.focus();
              }}
            >
              {t("Retry search")}
            </button>
          </div>
        )}
      </SearchDialogContent>
    </SearchDialog>
  );
}
