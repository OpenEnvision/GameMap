import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';
import { DocsPage, DocsTitle, DocsDescription } from 'fumadocs-ui/layouts/docs/page';
import { DocumentationLayout, DocumentationLanguage, documentGroups } from '../lib/docs';
import { content } from '../../content/registry.server';
import { docLocale, docMessages, localeFromPath } from '../../content/doc-language';
import { url } from '../../content/site';
export function loader({request}:LoaderFunctionArgs) { return {manifest:content.all('document').map(entry=>entry.data),locale:localeFromPath(new URL(request.url).pathname)}; }
export default function DocsIndex() {
  const {manifest,locale}=useLoaderData<typeof loader>(), text=docMessages(locale);
  const selected=manifest.filter(page=>docLocale(page.slug)===locale), groups=documentGroups(selected);
  return <DocumentationLayout manifest={manifest} locale={locale}><DocsPage full tabIndex={-1} tableOfContent={{enabled:false}}>
    <title>{`${text.title} — GameMap`}</title><meta name="description" content={text.intro}/>
    <DocumentationLanguage locale={locale} manifest={manifest}/><DocsTitle>{text.title}</DocsTitle><DocsDescription className="document-description">{text.intro}</DocsDescription>
    <Link className="docs-start" to={url.document(locale==='zh'?'zh/practical-guide':'practical-guide')}><span className="docs-start-icon"><Compass size={25}/></span><span><strong>{text.start}</strong><small>{text.startDetail}</small></span><ArrowRight size={20}/></Link>
    <div className="docs-groups">{groups.map(group=><section key={group.title}><h2><BookOpen size={17}/>{group.title}</h2><p>{group.description}</p><div>{group.pages.map(([slug,title])=><Link key={slug} to={url.document(slug)} data-content-ref={`document:${slug}`}>{title}<ArrowRight size={15}/></Link>)}</div></section>)}</div>
    {locale==='zh'&&<section className="docs-originals"><h2>{text.originals}</h2><p>{text.originalsNote}</p><Link to="/docs/">English documentation<ArrowRight size={15}/></Link></section>}
  </DocsPage></DocumentationLayout>;
}
