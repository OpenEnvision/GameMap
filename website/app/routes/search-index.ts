import { content } from '../../content/registry.server';
import { blockText } from '../../content/search';
import { source } from '../lib/source';
import type { SearchIndex } from '../../content/matching';

export async function loader() {
  const documents = await Promise.all(content.entries.map(async entry => {
    let body = '';
    if (entry.kind === 'document') {
      const page = source.getPage(entry.id.split('/'));
      if (!page) throw new Error(`Search cannot omit document body: ${entry.id}`);
      const data = 'load' in page.data ? await page.data.load() : page.data;
      body = [...data.structuredData.headings.map(item => item.content), ...data.structuredData.contents.map(item => item.content)].join('\n');
    }
    const text = [...new Set([entry.title, entry.description, ...entry.blocks.map(blockText), body].filter(Boolean))].join('\n');
    return { key: entry.key, kind: entry.kind, title: entry.title, url: entry.url, text };
  }));
  return Response.json({ version: 2, documents } satisfies SearchIndex);
}
