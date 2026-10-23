-- Authenticated editorial reads and explicit draft translation review.
begin;
create or replace function public.catalog_editor_entries() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform catalog.require_role(array['editor','reviewer','admin']);
  return coalesce((select jsonb_agg(jsonb_build_object('key', e.key, 'kind', e.kind, 'identifier', e.identifier,
    'canonical_path', e.canonical_path, 'collection_path', e.collection_path, 'owner', e.owner,
    'head_revision_id', e.head_revision_id, 'schema_version', r.schema_version, 'state', r.state,
    'body', r.body, 'content_digest', r.content_digest, 'created_by', r.created_by, 'created_at', r.created_at,
    'parent_id', r.parent_id, 'review_note', r.review_note,
    'validated', exists(select 1 from catalog.validation_receipts v where v.revision_id = r.id)) order by e.key)
    from catalog.entries e left join catalog.revisions r on r.id = e.head_revision_id), '[]');
end $$;
create function public.catalog_revision_history(p_key text) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform catalog.require_role(array['editor','reviewer','admin']);
  return coalesce((select jsonb_agg(jsonb_build_object('id', r.id, 'entry_key', r.entry_key,
    'kind', r.kind, 'schema_version', r.schema_version, 'parent_id', r.parent_id, 'body', r.body,
    'content_digest', r.content_digest, 'state', r.state, 'created_by', r.created_by, 'created_at', r.created_at,
    'reviewed_by', r.reviewed_by, 'reviewed_at', r.reviewed_at, 'review_note', r.review_note,
    'source_ref', r.source_ref, 'validated', exists(select 1 from catalog.validation_receipts v where v.revision_id = r.id),
    'translations', coalesce((select jsonb_agg(to_jsonb(t) - 'revision_id' order by t.locale, t.field)
      from catalog.translations t where t.revision_id = r.id), '[]')) order by r.sequence desc)
    from catalog.revisions r where r.entry_key = p_key), '[]');
end $$;

create function public.catalog_set_draft_translations(p_revision uuid, p_translations jsonb) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid; revision catalog.revisions; member_role text;
begin
  actor := catalog.require_role(array['editor','reviewer','admin']);
  select role into member_role from catalog.memberships where user_id = actor;
  select * into strict revision from catalog.revisions where id = p_revision for update;
  if revision.created_by is distinct from actor and member_role <> 'admin' then
    raise exception 'Only its author or an administrator may edit draft translations' using errcode = '42501';
  end if;
  if revision.state <> 'draft' or exists(select 1 from catalog.validation_receipts where revision_id = p_revision) then
    raise exception 'Translations are frozen; save a successor revision';
  end if;
  if jsonb_typeof(p_translations) is distinct from 'array' then raise exception 'A translation array is required'; end if;
  delete from catalog.translations where revision_id = p_revision;
  insert into catalog.translations(revision_id, locale, field, value, source_hash)
    select p_revision, x.locale, x.field, x.value, x.source_hash
    from jsonb_to_recordset(p_translations) as x(locale text, field text, value jsonb, source_hash text);
  insert into catalog.audit_events(actor_id, action, entity, detail)
    values(actor, 'draft-translations', p_revision::text, jsonb_build_object('fields', p_translations));
end $$;

revoke all on function public.catalog_revision_history(text), public.catalog_set_draft_translations(uuid, jsonb)
  from public, anon, authenticated;
grant execute on function public.catalog_revision_history(text), public.catalog_set_draft_translations(uuid, jsonb) to authenticated;
commit;
