-- Owner-only, additive remote drafts. The offline compiler verifies source bytes and typed contracts.
begin;
create table catalog.remote_import_batches (
  digest text primary key check (digest ~ '^[a-f0-9]{64}$'),
  provenance jsonb not null,
  snapshot_digest text not null check (snapshot_digest ~ '^[a-f0-9]{64}$'),
  actor_id uuid not null references auth.users(id),
  result jsonb not null,
  imported_at timestamptz not null default now()
);
create trigger immutable_remote_import before update or delete on catalog.remote_import_batches
  for each row execute function catalog.deny_mutation();

-- import_snapshot deliberately has no actor parameter. Attribute only this explicit owner lane.
create function catalog.attribute_remote_revision() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  if new.source_review ? 'remote_import_batch' then
    new.created_by := catalog.require_role(array['admin']);
    if new.state <> 'draft' then raise exception 'Remote imports must be drafts'; end if;
  end if;
  return new;
end $$;
create trigger remote_revision_author before insert on catalog.revisions
  for each row execute function catalog.attribute_remote_revision();

create function catalog.import_remote_snapshot(p_provenance text,p_digest text,p_snapshot text,p_snapshot_digest text) returns jsonb
language plpgsql set search_path='' as $$
declare provenance jsonb; snapshot jsonb; previous catalog.remote_import_batches;
  actor uuid; missing jsonb; conflicts jsonb; item jsonb; result jsonb; section text;
begin
  if current_user <> (select pg_get_userbyid(nspowner) from pg_namespace where nspname='catalog') then
    raise exception 'Remote import requires catalog owner' using errcode='42501';
  end if;
  actor := catalog.require_role(array['admin']);
  if catalog.hash_text(p_provenance) is distinct from p_digest or catalog.hash_text(p_snapshot) is distinct from p_snapshot_digest then
    raise exception 'Remote import digest mismatch';
  end if;
  provenance := p_provenance::jsonb; snapshot := p_snapshot::jsonb;
  if provenance->>'format' is distinct from 'gamemap.remote-candidates' or provenance->>'version' is distinct from '1' then
    raise exception 'Invalid remote provenance';
  end if;
  perform pg_advisory_xact_lock(731552310);
  lock table catalog.entries in share row exclusive mode;
  select * into previous from catalog.remote_import_batches where digest=p_digest;
  if found then
    if previous.provenance <> provenance then raise exception 'Remote batch collision'; end if;
    return previous.result;
  end if;
  if jsonb_typeof(snapshot->'entries') is distinct from 'array' or jsonb_typeof(provenance->'entries') is distinct from 'array' then
    raise exception 'Missing candidate arrays';
  end if;
  if (select count(*) <> count(distinct x->>'key') from jsonb_array_elements(snapshot->'entries') x) or
     jsonb_array_length(snapshot->'entries') <> jsonb_array_length(provenance->'entries') or
     exists(select 1 from jsonb_array_elements(snapshot->'entries') x where not exists(
       select 1 from jsonb_array_elements(provenance->'entries') p where p->>'key'=x->>'key' and p->'body'=x->'body'
         and p->>'source_ref'=x->>'source_ref' and p->'source_review'=x->'source_review')) then
    raise exception 'Candidate provenance mismatch';
  end if;
  if exists(select 1 from jsonb_array_elements(snapshot->'entries') x where x->>'owner' is distinct from 'database') then
    raise exception 'Remote documents require Git integration';
  end if;
  select coalesce(jsonb_agg(jsonb_build_object('key',x->>'key','sameBody',coalesce(r.body_text=x->>'canonical_body',false)) order by x->>'key'),'[]') into conflicts
    from jsonb_array_elements(snapshot->'entries') x join catalog.entries e on e.key=x->>'key'
    left join catalog.revisions r on r.id=e.head_revision_id;
  select coalesce(jsonb_agg(x order by x->>'key'),'[]') into missing
    from jsonb_array_elements(snapshot->'entries') x where not exists(select 1 from catalog.entries e where e.key=x->>'key');
  snapshot := jsonb_set(snapshot,'{entries}',missing);
  foreach section in array array['entry_terms','links','relations','asset_usages','translations'] loop
    snapshot := jsonb_set(snapshot,array[section],coalesce((select jsonb_agg(x) from jsonb_array_elements(snapshot->section) x
      where exists(select 1 from jsonb_array_elements(missing) e where e->>'revision_id'=x->>'revision_id')),'[]'));
  end loop;
  snapshot := jsonb_set(snapshot,'{terms}',coalesce((select jsonb_agg(x) from jsonb_array_elements(snapshot->'terms') x
    where exists(select 1 from jsonb_array_elements(snapshot->'entry_terms') t where t->>'term_key'=x->>'key')),'[]'));
  snapshot := jsonb_set(snapshot,'{assets}',coalesce((select jsonb_agg(x) from jsonb_array_elements(snapshot->'assets') x
    where exists(select 1 from jsonb_array_elements(snapshot->'asset_usages') a where a->>'asset_id'=x->>'id')),'[]'));
  if jsonb_array_length(missing)>0 then
    snapshot := jsonb_set(snapshot,'{entries}',(select jsonb_agg(jsonb_set(x,'{source_review}',(x->'source_review') || jsonb_build_object('remote_import_batch',p_digest))) from jsonb_array_elements(missing) x));
    -- Reuse normalized import constraints, vocabulary/asset equality checks and validation receipts.
    perform catalog.import_snapshot(snapshot::text,catalog.hash_text(snapshot::text));
  end if;
  result := jsonb_build_object('batchDigest',p_digest,'inserted',coalesce((select jsonb_agg(x->>'key' order by x->>'key') from jsonb_array_elements(missing) x),'[]'),
    'conflicts',conflicts,'excluded',jsonb_array_length(provenance->'excluded'));
  insert into catalog.remote_import_batches(digest,provenance,snapshot_digest,actor_id,result)
    values(p_digest,provenance,p_snapshot_digest,actor,result);
  insert into catalog.audit_events(actor_id,action,entity,detail) values(actor,'remote-import-drafts',p_digest,result);
  return result;
end $$;
select catalog.secure_tables();
revoke all on catalog.remote_import_batches from public,anon,authenticated,service_role,catalog_backend,catalog_deployer;
revoke all on function catalog.attribute_remote_revision(),catalog.import_remote_snapshot(text,text,text,text)
  from public,anon,authenticated,service_role,catalog_backend,catalog_deployer;
commit;
