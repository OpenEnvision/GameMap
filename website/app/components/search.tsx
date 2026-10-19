import { experimental_useSearch as useSearch } from 'fumadocs-core/search/client';
import { dialogSearch } from '../lib/content-search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { docMessages } from '../../content/doc-language';
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
  const search = useSearch(dialogSearch);
  const {locale}=useI18n();
  return (
    <SearchDialog {...search} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput placeholder={docMessages(locale==='zh'?'zh':'en').searchPlaceholder} />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </SearchDialog>
  );
}
