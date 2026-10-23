-- A dedicated non-login worker role. It cannot provision accounts, change contracts or activate releases.
-- Production should use a separate NOINHERIT login granted this role, not a database-owner login.
begin;
create role catalog_backend nologin noinherit;
grant authenticated to catalog_backend;
do $$ begin execute format('grant catalog_backend to %I', current_user); end $$;
grant usage on schema catalog to catalog_backend;
-- Defense in depth for functions created by any prior migration owner/default ACL.
revoke all on all functions in schema catalog from public, anon, authenticated;

grant select on catalog.content_kinds, catalog.content_schemas, catalog.locales, catalog.link_roles,
  catalog.relation_types, catalog.validation_receipts, catalog.releases, catalog.release_items,
  catalog.release_contexts, catalog.deployment_state to catalog_backend;
grant select, insert on catalog.entries to catalog_backend;
grant update(head_revision_id) on catalog.entries to catalog_backend;
grant select on catalog.revisions to catalog_backend;
grant insert(entry_key, kind, schema_version, parent_id, body_text, source_ref, source_review) on catalog.revisions to catalog_backend;
-- SELECT FOR UPDATE needs UPDATE privilege on a column; immutable triggers still reject rewriting it.
grant update(source_ref) on catalog.revisions to catalog_backend;
grant select, insert on catalog.terms, catalog.assets to catalog_backend;
grant select, insert, delete on catalog.revision_terms, catalog.revision_links, catalog.revision_relations,
  catalog.revision_assets, catalog.translations to catalog_backend;
grant insert(actor_id, action, entity, detail) on catalog.audit_events to catalog_backend;
grant select, insert, update, delete on catalog.studio_sessions to catalog_backend;
grant usage on all sequences in schema catalog to catalog_backend;
grant execute on function catalog.hash_text(text), catalog.record_validation(uuid, text, text, text, text),
  catalog.attach_release_context(uuid, text, text) to catalog_backend;

-- Browser roles receive no new grants and are not members of catalog_backend.
do $$ declare table_name text; begin
  foreach table_name in array array['content_kinds','content_schemas','locales','link_roles','relation_types',
    'validation_receipts','releases','release_items','release_contexts','deployment_state',
    'entries','revisions','terms','assets','revision_terms','revision_links','revision_relations',
    'revision_assets','translations','studio_sessions'] loop
    execute format('create policy backend_read on catalog.%I for select to catalog_backend using (true)', table_name);
  end loop;
  foreach table_name in array array['entries','terms','assets','revision_terms','revision_links',
    'revision_relations','revision_assets','translations','audit_events','studio_sessions'] loop
    execute format('create policy backend_insert on catalog.%I for insert to catalog_backend with check (true)', table_name);
  end loop;
  foreach table_name in array array['revision_terms','revision_links','revision_relations','revision_assets','translations','studio_sessions'] loop
    execute format('create policy backend_delete on catalog.%I for delete to catalog_backend using (true)', table_name);
  end loop;
end $$;
create policy backend_entry_update on catalog.entries for update to catalog_backend using (true) with check (true);
create policy backend_revision_lock on catalog.revisions for update to catalog_backend using (true) with check (false);
create policy backend_git_revision on catalog.revisions for insert to catalog_backend
  with check (exists(select 1 from catalog.content_kinds k where k.kind = revisions.kind and k.owner = 'git'));
create policy backend_session_update on catalog.studio_sessions for update to catalog_backend using (true) with check (true);
commit;
