import type { SearchIndex } from '../../content/matching';
import { rankDocuments } from '../../content/matching';
let pending: Promise<SearchIndex> | undefined;
export function loadSearchIndex() {
  if (!pending) pending = fetch(`${import.meta.env.BASE_URL}search-index.json`).then(async response => {
    if (!response.ok) throw new Error(`Search index unavailable (${response.status})`);
    const index = await response.json() as SearchIndex;
    if (index.version !== 2 || !Array.isArray(index.documents)) throw new Error('Unsupported search index');
    return index;
  }).catch(error => { pending = undefined; throw error; });
  return pending;
}
export async function searchContent(query: string) { return rankDocuments((await loadSearchIndex()).documents, query); }
export async function dialogSearch(query: string) {
  return (await searchContent(query)).slice(0, 30).map(document => ({ id: document.key, type: 'page' as const, url: document.url, content: document.title, breadcrumbs: [document.kind.replaceAll('-', ' ')] }));
}
