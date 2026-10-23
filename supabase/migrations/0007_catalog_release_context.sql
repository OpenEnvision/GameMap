-- A frozen revision selection is not deployable without its exact trusted build context.
begin;
create table catalog.release_contexts (
  release_id uuid primary key references catalog.releases(id),
  context_text text not null,
  context jsonb generated always as (context_text::jsonb) stored,
  digest text generated always as (catalog.hash_text(context_text)) stored,
  created_at timestamptz not null default now(),
  check (context ->> 'format' = 'gamemap.build-context' and context ->> 'version' = '1'),
  check (jsonb_typeof(context -> 'selected_revisions') = 'array')
);
create trigger immutable_release_context before update or delete on catalog.release_contexts
  for each row execute function catalog.deny_mutation();
create function catalog.attach_release_context(p_release uuid, p_context text, p_digest text) returns void
language plpgsql security definer set search_path = '' as $$
declare context jsonb;
begin
  if catalog.hash_text(p_context) is distinct from p_digest then raise exception 'Build context digest mismatch'; end if;
  context := p_context::jsonb;
  if (context ->> 'format') is distinct from 'gamemap.build-context' or (context ->> 'version') is distinct from '1'
    or jsonb_typeof(context -> 'selected_revisions') is distinct from 'array' then raise exception 'Unsupported build context'; end if;
  if (select count(*) from catalog.release_items where release_id = p_release) = 0 then raise exception 'Unknown or empty release'; end if;
  if (select count(*) from catalog.release_items where release_id = p_release) <> jsonb_array_length(context -> 'selected_revisions') or
     exists(select 1 from catalog.release_items i join catalog.revisions r on r.id = i.revision_id where i.release_id = p_release
       and not exists(select 1 from jsonb_array_elements(context -> 'selected_revisions') x
         where x ->> 'id' = r.id::text and x ->> 'digest' = r.content_digest and x ->> 'schema_version' = r.schema_version::text)) then
    raise exception 'Build context does not match the frozen revisions';
  end if;
  insert into catalog.release_contexts(release_id, context_text) values(p_release, p_context);
  insert into catalog.audit_events(action, entity) values('attach-build-context', p_release::text);
end $$;
create or replace function catalog.activate_release(p_release uuid, p_expected_current uuid, p_pipeline_run text) returns void
language plpgsql security definer set search_path = '' as $$
declare current_release uuid;
begin
  if p_pipeline_run is null or length(trim(p_pipeline_run)) = 0 then raise exception 'Deployment evidence is required'; end if;
  if not exists(select 1 from catalog.release_contexts where release_id = p_release) then
    raise exception 'A verified build context is required before activation';
  end if;
  select release_id into current_release from catalog.deployment_state where singleton for update;
  if current_release is distinct from p_expected_current then raise exception 'Deployment conflict' using errcode = '40001'; end if;
  update catalog.deployment_state set release_id = p_release where singleton;
  insert into catalog.audit_events(action, entity, detail) values('activate-release', p_release::text,
    jsonb_build_object('previous', current_release, 'pipeline_run', p_pipeline_run));
end $$;
create or replace function public.catalog_published_release() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('id', r.id, 'digest', r.digest, 'manifest_text', r.manifest_text, 'manifest', r.manifest,
    'context_text', c.context_text, 'context_digest', c.digest)
  from catalog.deployment_state d join catalog.releases r on r.id = d.release_id
  join catalog.release_contexts c on c.release_id = r.id where d.singleton
$$;
select catalog.secure_tables();
grant execute on function catalog.attach_release_context(uuid, text, text) to service_role;
commit;
