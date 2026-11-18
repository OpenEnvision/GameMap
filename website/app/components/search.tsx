import { useRef } from "react";
import { useAtlasSearchState } from "../lib/search-state";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { docMessages } from "../../content/doc-language";
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
  const { locale } = useI18n();
  const search = useAtlasSearchState();
  const returnFocus = useRef<HTMLElement | null>(null);
  const openedAt = useRef("");
  return (
    <SearchDialog {...search} {...props}>
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
          if (window.location.href === openedAt.current && element?.isConnected) {
            event.preventDefault();
            element.focus({ preventScroll: true });
          }
          returnFocus.current = null;
        }}
      >
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput
            placeholder={
              docMessages(locale === "zh" ? "zh" : "en").searchPlaceholder
            }
          />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </SearchDialog>
  );
}
