import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { Root } from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { Brand } from '../components/site-shell';
import type { DocumentMetadata } from '../../content/models';
import { url } from '../../content/site';
import { docLocale, docHome, docMessages, translationSlug, type DocLocale } from '../../content/doc-language';
export function documentGroups(manifest: readonly DocumentMetadata[]) {
  return [...new Set(manifest.map(page=>page.group))].map(title=>{const documents=manifest.filter(page=>page.group===title);return {title,description:documents[0].description,pages:documents.map(page=>[page.slug,page.label] as [string,string])};});
}
export function DocumentationLanguage({locale,slug,manifest}:{locale:DocLocale;slug?:string;manifest:DocumentMetadata[]}) {
  const translated=slug&&translationSlug(slug,locale==='zh'?'en':'zh');
  const available=translated&&manifest.some(page=>page.slug===translated);
  const text=docMessages(locale);
  return <nav className="documentation-language" aria-label={text.language}>
    <Link to={locale==='zh'? '#':available?url.document(translated!):docHome('zh')} aria-current={locale==='zh'?'true':undefined}>{text.chinese}</Link>
    <span aria-hidden="true">/</span>
    <Link to={locale==='en'?'#':available?url.document(translated!):docHome('en')} aria-current={locale==='en'?'true':undefined}>English</Link>
  </nav>;
}
export function DocumentationLayout({ children, manifest, locale='en' }: { children: ReactNode; manifest: DocumentMetadata[]; locale?:DocLocale }) {
  const text=docMessages(locale), selected=manifest.filter(page=>docLocale(page.slug)===locale);
  const tree: Root = {name:text.title,children:[{type:'page',name:text.home,url:docHome(locale).replace(/\/$/,'')},...documentGroups(selected).map(group=>({type:'folder' as const,name:group.title,children:group.pages.map(([slug,name])=>({type:'page' as const,name,url:url.document(slug).replace(/\/$/,'')}))}))]};
  return <DocsLayout tree={tree} nav={{title:<Brand/>,url:'/'}} githubUrl="https://github.com/OpenEnvision/GameMap" links={(['resources','examples','paths'] as const).map(id=>({text:text.nav[id],url:url.page(id)}))}>{children}</DocsLayout>;
}
