-- Generic editorial lifecycle: no resource kind or payload version is hardcoded here.
begin;
create table catalog.memberships (
  user_id uuid primary key references auth.users(id),
  role text not null check (role in ('editor', 'reviewer', 'admin')),
  created_at timestamptz not null default now()
);
create function catalog.require_role(allowed text[]) returns uuid
language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid(); member_role text;
begin
  select role into member_role from catalog.memberships where user_id = actor;
  if actor is null or member_role is null or not (member_role = any(allowed)) then
    raise exception 'Catalog permission denied' using errcode = '42501';
  end if;
  return actor;
end $$;
create function catalog.audit_membership() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into catalog.audit_events(actor_id, action, entity, detail)
    values(auth.uid(), 'membership-' || lower(tg_op),
      coalesce(new.user_id, old.user_id)::text,
      jsonb_build_object('previous_role', old.role, 'role', new.role));
  return case when tg_op = 'DELETE' then old else new end;
end $$;
create trigger membership_history after insert or update or delete on catalog.memberships
  for each row execute function catalog.audit_membership();

create function public.catalog_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from catalog.memberships where user_id = auth.uid()
$$;
create function public.catalog_editor_entries() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform catalog.require_role(array['editor','reviewer','admin']);
  return coalesce((select jsonb_agg(jsonb_build_object('key', e.key, 'kind', e.kind,
    'canonical_path', e.canonical_path, 'owner', e.owner, 'head_revision_id', e.head_revision_id,
    'schema_version', r.schema_version, 'state', r.state, 'body', r.body, 'content_digest', r.content_digest) order by e.key)
    from catalog.entries e left join catalog.revisions r on r.id = e.head_revision_id), '[]');
end $$;

-- Compare-and-swap protects concurrent edits. Contract upgrades append a successor revision.
create function public.catalog_save_draft(p_kind text, p_identifier text, p_schema_version integer,
  p_path text, p_collection_path text, p_body text, p_expected_head uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare actor uuid; entry catalog.entries; revision uuid; entry_key text := p_kind || ':' || p_identifier;
begin
  actor := catalog.require_role(array['editor','reviewer','admin']);
  if (select owner from catalog.content_kinds where kind = p_kind) is distinct from 'database' then
    raise exception 'This content kind is Git-owned or unknown';
  end if;
  perform 1 from catalog.content_schemas where kind = p_kind and version = p_schema_version and enabled_for_writes for share;
  if not found then raise exception 'Unregistered or retired schema version'; end if;
  perform pg_advisory_xact_lock(hashtextextended(entry_key, 0));
  select * into entry from catalog.entries where key = entry_key for update;
  if not found then
    if p_expected_head is not null then raise exception 'Revision conflict' using errcode = '40001'; end if;
    insert into catalog.entries(key, kind, identifier, canonical_path, collection_path, owner)
      values(entry_key, p_kind, p_identifier, p_path, p_collection_path, 'database') returning * into entry;
  end if;
  if entry.head_revision_id is distinct from p_expected_head then
    raise exception 'Revision conflict' using errcode = '40001';
  end if;
  if entry.canonical_path <> p_path or entry.collection_path <> p_collection_path then
    raise exception 'Stable identity cannot be changed';
  end if;
  insert into catalog.revisions(entry_key, kind, schema_version, parent_id, body_text, created_by)
    values(entry_key, p_kind, p_schema_version, p_expected_head, p_body, actor) returning id into revision;
  update catalog.entries set head_revision_id = revision where key = entry_key;
  insert into catalog.audit_events(actor_id, action, entity) values(actor, 'save-draft', revision::text);
  return revision;
end $$;

create function public.catalog_submit_revision(p_revision uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid; revision catalog.revisions; member_role text;
begin
  actor := catalog.require_role(array['editor','reviewer','admin']);
  select role into member_role from catalog.memberships where user_id = actor;
  select * into strict revision from catalog.revisions where id = p_revision for update;
  if revision.created_by is distinct from actor and member_role <> 'admin' then
    raise exception 'Only its author or an administrator may submit this revision' using errcode = '42501';
  end if;
  if revision.state <> 'draft' then raise exception 'Only a draft may be submitted'; end if;
  update catalog.revisions set state = 'in_review', submitted_at = now() where id = p_revision;
  insert into catalog.audit_events(actor_id, action, entity) values(actor, 'submit', p_revision::text);
end $$;

-- Service-only attestation. Wrong-kind/wrong-version validator receipts cannot be reused.
create function catalog.record_validation(p_revision uuid, p_digest text, p_validator_key text,
  p_validator_version text, p_pipeline_run text) returns void
language plpgsql security definer set search_path = '' as $$
declare expected_key text;
begin
  select s.validator_key into strict expected_key from catalog.revisions r
    join catalog.content_schemas s on s.kind = r.kind and s.version = r.schema_version where r.id = p_revision;
  if p_validator_key is distinct from expected_key then raise exception 'Validator does not match content schema'; end if;
  insert into catalog.validation_receipts(revision_id, content_digest, kind, schema_version,
    validator_key, validator_version, pipeline_run)
    select id, p_digest, kind, schema_version, p_validator_key, p_validator_version, p_pipeline_run
      from catalog.revisions where id = p_revision;
end $$;

create function public.catalog_review_revision(p_revision uuid, p_approve boolean, p_note text) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid; revision catalog.revisions;
begin
  actor := catalog.require_role(array['reviewer','admin']);
  if p_approve is null or p_note is null or length(trim(p_note)) = 0 then raise exception 'A review decision and note are required'; end if;
  select * into strict revision from catalog.revisions where id = p_revision for update;
  if revision.state <> 'in_review' then raise exception 'Revision is not awaiting review'; end if;
  if revision.created_by = actor then raise exception 'Authors cannot approve or reject their own revision' using errcode = '42501'; end if;
  if p_approve and not exists (select 1 from catalog.validation_receipts where revision_id = p_revision and content_digest = revision.content_digest) then
    raise exception 'A matching trusted validation receipt is required';
  end if;
  update catalog.revisions set state = case when p_approve then 'approved' else 'rejected' end,
    reviewed_by = actor, reviewed_at = now(), review_note = p_note where id = p_revision;
  insert into catalog.audit_events(actor_id, action, entity, detail)
    values(actor, case when p_approve then 'approve' else 'reject' end, p_revision::text, jsonb_build_object('note', p_note));
end $$;

select catalog.secure_tables();
revoke all on function public.catalog_role(), public.catalog_editor_entries(),
  public.catalog_save_draft(text, text, integer, text, text, text, uuid), public.catalog_submit_revision(uuid),
  public.catalog_review_revision(uuid, boolean, text) from public, anon, authenticated;
grant execute on function public.catalog_role(), public.catalog_editor_entries(),
  public.catalog_save_draft(text, text, integer, text, text, text, uuid), public.catalog_submit_revision(uuid),
  public.catalog_review_revision(uuid, boolean, text) to authenticated;
grant usage on schema catalog to service_role;
grant execute on function catalog.record_validation(uuid, text, text, text, text) to service_role;
commit;
