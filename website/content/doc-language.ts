import messages from './doc-messages.json';
export type DocLocale = 'en' | 'zh';
export function docLocale(slug: string): DocLocale { return slug === 'zh' || slug.startsWith('zh/') ? 'zh' : 'en'; }
export function localeFromPath(path: string): DocLocale { return /\/docs\/zh(?:\/|$)/.test(path) ? 'zh' : 'en'; }
export const docHome = (locale: DocLocale) => locale === 'zh' ? '/docs/zh/' : '/docs/';
export const docMessages = (locale: DocLocale) => messages[locale];
export const translationSlug = (slug: string, locale: DocLocale) => locale === 'zh' ? `zh/${slug.replace(/^zh\//,'')}` : slug.replace(/^zh\//,'');
