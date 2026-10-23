-- Initial source imports are private, deterministic, atomic, and never implicit publication.
begin;
create table catalog.import_batches (
  digest text primary key check (digest ~ '^[a-f0-9]{64}$'),
  snapshot jsonb not null,
  imported_at timestamptz not null default now()
);
create trigger immutable_import before update or delete on catalog.import_batches
  for each row execute function catalog.deny_mutation();

-- Offline packages must pass the source-pinned Node verifier before this service-only import.
-- PostgreSQL independently checks package bytes, registered contracts and relational constraints.
create function catalog.import_snapshot(p_snapshot text, p_digest text) returns boolean
language plpgsql security definer set search_path = '' as $$
declare snapshot jsonb; item jsonb; previous jsonb; section text;
begin
  if p_digest is null or catalog.hash_text(p_snapshot) is distinct from p_digest then raise exception 'Migration digest mismatch'; end if;
  snapshot := p_snapshot::jsonb;
  if (snapshot ->> 'format_version') is distinct from '2' then raise exception 'Unsupported migration format'; end if;
  perform pg_advisory_xact_lock(731552310);
  select b.snapshot into previous from catalog.import_batches b where digest = p_digest;
  if found then
    if previous <> snapshot then raise exception 'Import digest collision'; end if;
    return false;
  end if;
  foreach section in array array['content_kinds','schemas','locales','link_roles','relation_types','entries',
    'terms','entry_terms','links','relations','assets','asset_usages','translations'] loop
    if jsonb_typeof(snapshot -> section) is distinct from 'array' then raise exception 'Missing migration array: %', section; end if;
  end loop;
  if jsonb_array_length(snapshot -> 'entries') = 0 then raise exception 'Empty migration'; end if;
  if jsonb_typeof(snapshot -> 'archive') is distinct from 'object' then raise exception 'Missing source archive'; end if;
  if exists(select 1 from jsonb_array_elements(snapshot -> 'content_kinds') x
      where not exists(select 1 from catalog.content_kinds k where to_jsonb(k) = x)) then
    raise exception 'Unregistered or conflicting content kind';
  end if;
  if exists(select 1 from jsonb_array_elements(snapshot -> 'schemas') x
      where not exists(select 1 from catalog.content_schemas s where s.kind = x ->> 'kind'
        and s.version = (x ->> 'version')::integer and s.validator_key = x ->> 'validator_key')) then
    raise exception 'Unregistered or conflicting schema contract';
  end if;
  if exists(select 1 from jsonb_array_elements(snapshot -> 'locales') x
      where not exists(select 1 from catalog.locales l where to_jsonb(l) = x)) then
    raise exception 'Unregistered locale';
  end if;
  if exists(select 1 from jsonb_array_elements(snapshot -> 'link_roles') x
      where not exists(select 1 from catalog.link_roles l where to_jsonb(l) = x)) or
     exists(select 1 from jsonb_array_elements(snapshot -> 'relation_types') x
      where not exists(select 1 from catalog.relation_types t where to_jsonb(t) = x)) then
    raise exception 'Unregistered or conflicting relationship vocabulary';
  end if;
  if exists(select 1 from jsonb_array_elements(snapshot -> 'entries') x
      where not exists(select 1 from jsonb_array_elements(snapshot -> 'schemas') s
        where s ->> 'kind' = x ->> 'kind' and s ->> 'version' = x ->> 'schema_version')) then
    raise exception 'Entry has no declared schema contract';
  end if;
  if exists(select 1 from jsonb_array_elements(snapshot -> 'entries') x join catalog.entries e on e.key = x ->> 'key') then
    raise exception 'Migration would overwrite existing identities';
  end if;
  for item in select value from jsonb_array_elements(snapshot -> 'entries') loop
    insert into catalog.entries(key, kind, identifier, canonical_path, collection_path, owner)
      values(item ->> 'key', item ->> 'kind', item ->> 'identifier', item ->> 'canonical_path', item ->> 'collection_path', item ->> 'owner');
    if catalog.hash_text(item ->> 'canonical_body') is distinct from item ->> 'fingerprint' then raise exception 'Revision fingerprint mismatch'; end if;
    if (item ->> 'canonical_body')::jsonb is distinct from item -> 'body' then raise exception 'Revision body mismatch'; end if;
    insert into catalog.revisions(id, entry_key, kind, schema_version, body_text, source_ref, source_review)
      values((item ->> 'revision_id')::uuid, item ->> 'key', item ->> 'kind', (item ->> 'schema_version')::integer,
        item ->> 'canonical_body', item ->> 'source_ref', item -> 'source_review');
    update catalog.entries set head_revision_id = (item ->> 'revision_id')::uuid where key = item ->> 'key';
  end loop;
  for item in select value from jsonb_array_elements(snapshot -> 'terms') loop
    insert into catalog.terms(key, scheme, value, label, controlled)
      values(item ->> 'key', item ->> 'scheme', item ->> 'value', item ->> 'label', (item ->> 'controlled')::boolean) on conflict do nothing;
    if not exists(select 1 from catalog.terms t where to_jsonb(t) = item) then raise exception 'Conflicting vocabulary term'; end if;
  end loop;
  insert into catalog.revision_terms select * from jsonb_to_recordset(snapshot -> 'entry_terms') as x(revision_id uuid, term_key text, position integer);
  insert into catalog.revision_links select * from jsonb_to_recordset(snapshot -> 'links') as x(revision_id uuid, field text, url text, role text);
  insert into catalog.revision_relations select * from jsonb_to_recordset(snapshot -> 'relations') as x(revision_id uuid, target_key text, relation text, field text);
  insert into catalog.assets select * from jsonb_to_recordset(snapshot -> 'assets') as x(id text, path text, sha256 text, bytes bigint) on conflict do nothing;
  if exists(select 1 from jsonb_array_elements(snapshot -> 'assets') x left join catalog.assets a on a.id = x ->> 'id'
      where a.id is null or to_jsonb(a) <> x) then raise exception 'Conflicting asset identity'; end if;
  insert into catalog.revision_assets select * from jsonb_to_recordset(snapshot -> 'asset_usages') as x(revision_id uuid, asset_id text, field text);
  insert into catalog.translations select * from jsonb_to_recordset(snapshot -> 'translations') as x(revision_id uuid, locale text, field text, value jsonb, source_hash text);
  insert into catalog.validation_receipts(revision_id, content_digest, kind, schema_version, validator_key, validator_version, pipeline_run)
    select r.id, r.content_digest, r.kind, r.schema_version, s.validator_key, 'gamemap-source-import/2', 'import:' || p_digest
      from catalog.revisions r join catalog.content_schemas s on s.kind = r.kind and s.version = r.schema_version
      where r.id in (select (x ->> 'revision_id')::uuid from jsonb_array_elements(snapshot -> 'entries') x);
  insert into catalog.import_batches(digest, snapshot) values(p_digest, snapshot);
  insert into catalog.audit_events(action, entity) values('import-drafts', p_digest);
  return true;
end $$;

select catalog.secure_tables();
grant execute on function catalog.import_snapshot(text, text) to service_role;
commit;
