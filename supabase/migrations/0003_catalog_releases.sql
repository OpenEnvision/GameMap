-- Immutable releases and compare-and-swap deployment activation, independent of content kinds.
begin;
create table catalog.releases (
  id uuid primary key default gen_random_uuid(),
  manifest_text text not null,
  manifest jsonb generated always as (manifest_text::jsonb) stored,
  digest text generated always as (catalog.hash_text(manifest_text)) stored,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create table catalog.release_items (
  release_id uuid not null references catalog.releases(id),
  entry_key text not null references catalog.entries(key),
  revision_id uuid not null,
  primary key (release_id, entry_key),
  foreign key (entry_key, revision_id) references catalog.revisions(entry_key, id)
);
create table catalog.deployment_state (
  singleton boolean primary key default true check (singleton),
  release_id uuid references catalog.releases(id)
);
insert into catalog.deployment_state values (true, null);
create trigger immutable_release before update or delete on catalog.releases
  for each row execute function catalog.deny_mutation();
create trigger immutable_release_item before update or delete on catalog.release_items
  for each row execute function catalog.deny_mutation();

-- An explicit approved selection forms a complete candidate snapshot; cross-record references
-- must resolve within it. Full source/rendered coverage remains a trusted build-worker gate.
create function public.catalog_freeze_release(p_revisions uuid[], p_git_commit text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare actor uuid; release uuid; manifest jsonb;
begin
  actor := catalog.require_role(array['reviewer','admin']);
  if p_revisions is null or cardinality(p_revisions) = 0 or p_git_commit is null or p_git_commit !~ '^[a-f0-9]{40}$' then
    raise exception 'A nonempty revision set and pinned Git commit are required';
  end if;
  if (select count(*) from catalog.revisions where id = any(p_revisions)) <> cardinality(p_revisions) or
     (select count(distinct entry_key) from catalog.revisions where id = any(p_revisions)) <> cardinality(p_revisions) then
    raise exception 'Missing, duplicate, or conflicting release revisions';
  end if;
  if exists(select 1 from catalog.revisions r left join catalog.validation_receipts v on v.revision_id = r.id
      where r.id = any(p_revisions) and (r.state <> 'approved' or v.revision_id is null or v.content_digest <> r.content_digest)) then
    raise exception 'Every release revision must be approved and validated';
  end if;
  if exists(select 1 from catalog.revision_relations rel where rel.revision_id = any(p_revisions)
      and not exists(select 1 from catalog.revisions r where r.id = any(p_revisions) and r.entry_key = rel.target_key)) then
    raise exception 'Release has dangling content relations';
  end if;
  manifest := jsonb_build_object('format', 'gamemap.content-release', 'format_version', 1, 'git_commit', p_git_commit,
    'content_kinds', (select jsonb_agg(to_jsonb(k) order by k.kind) from catalog.content_kinds k
      where exists(select 1 from catalog.revisions r where r.kind = k.kind and r.id = any(p_revisions))),
    'schemas', (select jsonb_agg(jsonb_build_object('kind', s.kind, 'version', s.version, 'validator_key', s.validator_key) order by s.kind, s.version)
      from catalog.content_schemas s where exists(select 1 from catalog.revisions r
        where r.kind = s.kind and r.schema_version = s.version and r.id = any(p_revisions))),
    'locales', (select jsonb_agg(to_jsonb(l) order by l.code) from catalog.locales l),
    'link_roles', (select jsonb_agg(to_jsonb(l) order by l.key) from catalog.link_roles l),
    'relation_types', (select jsonb_agg(to_jsonb(t) order by t.key) from catalog.relation_types t),
    'entries', (select jsonb_agg(jsonb_build_object('key', e.key, 'kind', e.kind, 'identifier', e.identifier,
      'canonical_path', e.canonical_path, 'collection_path', e.collection_path, 'owner', e.owner,
      'revision_id', r.id, 'schema_version', r.schema_version, 'fingerprint', r.content_digest, 'body', r.body) order by e.key)
      from catalog.revisions r join catalog.entries e on e.key = r.entry_key where r.id = any(p_revisions)),
    'terms', coalesce((select jsonb_agg(to_jsonb(t) order by t.key) from catalog.terms t
      where exists(select 1 from catalog.revision_terms rt where rt.term_key = t.key and rt.revision_id = any(p_revisions))), '[]'),
    'entry_terms', coalesce((select jsonb_agg(to_jsonb(t) order by t.revision_id, t.position) from catalog.revision_terms t where t.revision_id = any(p_revisions)), '[]'),
    'links', coalesce((select jsonb_agg(to_jsonb(l) order by l.revision_id, l.field) from catalog.revision_links l where l.revision_id = any(p_revisions)), '[]'),
    'relations', coalesce((select jsonb_agg(to_jsonb(r) order by r.revision_id, r.field) from catalog.revision_relations r where r.revision_id = any(p_revisions)), '[]'),
    'assets', coalesce((select jsonb_agg(to_jsonb(a) order by a.id) from catalog.assets a
      where exists(select 1 from catalog.revision_assets ra where ra.asset_id = a.id and ra.revision_id = any(p_revisions))), '[]'),
    'asset_usages', coalesce((select jsonb_agg(to_jsonb(a) order by a.revision_id, a.field) from catalog.revision_assets a where a.revision_id = any(p_revisions)), '[]'),
    'translations', coalesce((select jsonb_agg(to_jsonb(t) order by t.revision_id, t.locale, t.field) from catalog.translations t where t.revision_id = any(p_revisions)), '[]'));
  insert into catalog.releases(manifest_text, created_by) values(manifest::text, actor) returning id into release;
  insert into catalog.release_items select release, entry_key, id from catalog.revisions where id = any(p_revisions);
  insert into catalog.audit_events(actor_id, action, entity) values(actor, 'freeze-release', release::text);
  return release;
end $$;

-- Call only after deployment succeeds. The expected predecessor protects against late old builds
-- and makes an explicit rollback safe. It does not deploy website files by itself.
create function catalog.activate_release(p_release uuid, p_expected_current uuid, p_pipeline_run text) returns void
language plpgsql security definer set search_path = '' as $$
declare current_release uuid;
begin
  if p_pipeline_run is null or length(trim(p_pipeline_run)) = 0 then raise exception 'Deployment evidence is required'; end if;
  perform 1 from catalog.releases where id = p_release;
  if not found then raise exception 'Unknown release'; end if;
  select release_id into current_release from catalog.deployment_state where singleton for update;
  if current_release is distinct from p_expected_current then raise exception 'Deployment conflict' using errcode = '40001'; end if;
  update catalog.deployment_state set release_id = p_release where singleton;
  insert into catalog.audit_events(action, entity, detail) values('activate-release', p_release::text,
    jsonb_build_object('previous', current_release, 'pipeline_run', p_pipeline_run));
end $$;
create function public.catalog_published_release() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('id', r.id, 'digest', r.digest, 'manifest_text', r.manifest_text, 'manifest', r.manifest)
    from catalog.deployment_state d join catalog.releases r on r.id = d.release_id where d.singleton
$$;

select catalog.secure_tables();
revoke all on function public.catalog_freeze_release(uuid[], text), public.catalog_published_release()
  from public, anon, authenticated;
grant execute on function public.catalog_freeze_release(uuid[], text) to authenticated;
grant execute on function public.catalog_published_release() to anon, authenticated;
grant execute on function catalog.activate_release(uuid, uuid, text) to service_role;
commit;
