-- Immutable historical research evidence, separate from verified games and publication.
begin;
create table catalog.research_import_batches (
  digest text primary key check (digest ~ '^[a-f0-9]{64}$'),
  source jsonb not null,
  package_sha256 text not null check (package_sha256 ~ '^[a-f0-9]{64}$'),
  exclusions jsonb not null check (jsonb_typeof(exclusions)='array'),
  actor_id uuid not null references auth.users(id),
  result jsonb not null,
  imported_at timestamptz not null default now()
);
create table catalog.research_sources (
  key text primary key check (key ~ '^[a-f0-9]{64}$'),
  slug text unique not null,
  title text not null,
  batch_digest text not null references catalog.research_import_batches(digest),
  body jsonb not null,
  check (body->>'key'=key and body->>'slug'=slug and body->>'title'=title),
  check (body->>'format' in ('archived-markdown','rendered-page-reconstruction','import-index','native-json')),
  check (jsonb_typeof(body->'findings')='array'),
  check (catalog.hash_text(body->>'original_text')=body->'source'->>'sha256'),
  check (octet_length(body->>'original_text')=(body->'source'->>'bytes')::integer)
);
create table catalog.research_findings (
  source_key text not null references catalog.research_sources(key),
  ordinal integer not null check (ordinal>0),
  kind text not null check (kind in ('section','table-row','candidate')),
  title text not null,
  search_text text not null,
  body jsonb not null,
  primary key (source_key,ordinal),
  check ((body->>'ordinal')::integer=ordinal and body->>'kind'=kind and body->>'title'=title)
);
create table catalog.research_finding_entries (
  source_key text not null,
  ordinal integer not null,
  entry_key text not null references catalog.entries(key),
  primary key (source_key,ordinal,entry_key),
  foreign key (source_key,ordinal) references catalog.research_findings(source_key,ordinal)
);
create index research_evidence_entry on catalog.research_finding_entries(entry_key);
create index research_evidence_search on catalog.research_findings using gin(to_tsvector('simple',search_text));
create trigger immutable_research_batches before update or delete on catalog.research_import_batches for each row execute function catalog.deny_mutation();
create trigger immutable_research_sources before update or delete on catalog.research_sources for each row execute function catalog.deny_mutation();
create trigger immutable_research_findings before update or delete on catalog.research_findings for each row execute function catalog.deny_mutation();
create trigger immutable_research_links before update or delete on catalog.research_finding_entries for each row execute function catalog.deny_mutation();

create function catalog.import_research_archives(p_payload text,p_digest text) returns jsonb
language plpgsql set search_path='' as $$
declare payload jsonb; actor uuid; previous catalog.research_import_batches;
  source jsonb; finding jsonb; position integer; result jsonb;
begin
  if current_user <> (select pg_get_userbyid(nspowner) from pg_namespace where nspname='catalog') then
    raise exception 'Research import requires catalog owner' using errcode='42501';
  end if;
  actor := catalog.require_role(array['admin']);
  if catalog.hash_text(p_payload) is distinct from p_digest then raise exception 'Research import digest mismatch'; end if;
  payload := p_payload::jsonb;
  if payload->>'format' is distinct from 'gamemap.research-archives' or payload->>'version' is distinct from '1'
    or jsonb_typeof(payload->'sources') is distinct from 'array'
    or jsonb_typeof(payload->'exclusions') is distinct from 'array'
    or jsonb_array_length(payload->'sources')=0 then raise exception 'Invalid research archive'; end if;
  perform pg_advisory_xact_lock(731552310);
  select * into previous from catalog.research_import_batches where digest=p_digest;
  if found then return previous.result; end if;
  if exists(select 1 from jsonb_array_elements(payload->'sources') x
    where x->'source'->>'repository' is distinct from payload->'source'->>'repository'
       or x->'source'->>'revision' is distinct from payload->'source'->>'revision'
       or x->>'key' is distinct from catalog.hash_text(concat(payload->'source'->>'repository',E'\n',payload->'source'->>'revision',E'\n',x->'source'->>'path')))
    then raise exception 'Source identity mismatch'; end if;
  result := jsonb_build_object('sources',jsonb_array_length(payload->'sources'),
    'findings',(select coalesce(sum(jsonb_array_length(x->'findings')),0) from jsonb_array_elements(payload->'sources') x),
    'exclusions',jsonb_array_length(payload->'exclusions'),'publicationChanged',false);
  insert into catalog.research_import_batches(digest,source,package_sha256,exclusions,actor_id,result)
    values(p_digest,payload->'source',payload->>'package_sha256',payload->'exclusions',actor,result);
  for source in select x from jsonb_array_elements(payload->'sources') x loop
    -- A different batch may not overwrite an already archived source or silently discard a conflict.
    insert into catalog.research_sources(key,slug,title,batch_digest,body)
      values(source->>'key',source->>'slug',source->>'title',p_digest,source);
    position := 0;
    for finding in select x from jsonb_array_elements(source->'findings') x loop
      position := position + 1;
      if (finding->>'ordinal')::integer is distinct from position then raise exception 'Non-contiguous findings'; end if;
      insert into catalog.research_findings(source_key,ordinal,kind,title,search_text,body)
        values(source->>'key',position,finding->>'kind',finding->>'title',
          concat(source->>'title',E'\n',finding->>'title',E'\n',finding->>'text',E'\n',finding->'fields'::text),finding);
      insert into catalog.research_finding_entries(source_key,ordinal,entry_key)
        select source->>'key',position,e.key from jsonb_array_elements_text(finding->'catalog_keys') k
          join catalog.entries e on e.key=k;
    end loop;
  end loop;
  insert into catalog.audit_events(actor_id,action,entity,detail)
    values(actor,'research-archive-import',p_digest,result);
  return result;
end $$;

create function public.catalog_research_search(p_query text default '',p_offset integer default 0,p_limit integer default 40) returns jsonb
language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
  perform catalog.require_role(array['editor','reviewer','admin']);
  if length(p_query)>256 or p_offset<0 or p_limit<1 or p_limit>100 then raise exception 'Invalid research search'; end if;
  with matches as (
    select f.*,s.slug,s.title as source_title from catalog.research_findings f join catalog.research_sources s on s.key=f.source_key
    where trim(p_query)='' or to_tsvector('simple',f.search_text) @@ plainto_tsquery('simple',p_query)
      or strpos(lower(f.search_text),lower(trim(p_query)))>0
  ), page as (select * from matches order by source_title,source_key,ordinal offset p_offset limit p_limit)
  select jsonb_build_object('total',(select count(*) from matches),'offset',p_offset,'limit',p_limit,
    'sources',(select count(*) from catalog.research_sources),
    'items',coalesce((select jsonb_agg(jsonb_build_object('source_key',source_key,'source_title',source_title,'slug',slug,
      'ordinal',ordinal,'kind',kind,'title',title,'excerpt',left(body->>'text',600),'fields',body->'fields',
      'catalog_keys',body->'catalog_keys') order by source_title,source_key,ordinal) from page),'[]')) into result;
  return result;
end $$;
create function public.catalog_research_source(p_key text) returns jsonb
language plpgsql security definer set search_path='' as $$
begin
  perform catalog.require_role(array['editor','reviewer','admin']);
  return (select body from catalog.research_sources where key=p_key);
end $$;
select catalog.secure_tables();
revoke all on catalog.research_import_batches,catalog.research_sources,catalog.research_findings,catalog.research_finding_entries
  from public,anon,authenticated,service_role,catalog_backend,catalog_deployer;
revoke all on function catalog.import_research_archives(text,text) from public,anon,authenticated,service_role,catalog_backend,catalog_deployer;
revoke all on function public.catalog_research_search(text,integer,integer),public.catalog_research_source(text)
  from public,anon,service_role,catalog_backend,catalog_deployer;
grant execute on function public.catalog_research_search(text,integer,integer),public.catalog_research_source(text) to authenticated;
commit;
