-- Retire only the Showcase listing. Record identities, revisions, reviews, media and
-- already-frozen manifests stay unchanged; each recording is owned by its resource page.
begin;
lock table catalog.entries in share row exclusive mode;
do $$
declare changes jsonb;
begin
  if current_user <> (select pg_get_userbyid(nspowner) from pg_namespace where nspname='catalog') then
    raise exception 'Showcase retirement requires the catalog owner' using errcode='42501';
  end if;
  if not exists(select 1 from pg_trigger where tgrelid='catalog.entries'::regclass
      and tgname='stable_entry' and tgenabled='O' and not tgisinternal) then
    raise exception 'Stable entry protection must be enabled before Showcase retirement';
  end if;
  -- Do not choose an arbitrary latest draft when historical revisions disagree.
  -- Every revision must identify the same existing resource as the current head.
  if exists(
    select 1 from catalog.entries e
    left join catalog.revisions head on head.id=e.head_revision_id and head.entry_key=e.key
    left join catalog.entries resource on resource.kind='resource'
      and resource.identifier=head.body->'payload'->>'resourceId'
    where e.kind='demo' and (
      resource.key is null or e.canonical_path <> '/showcase/' || e.identifier || '/'
      or e.collection_path not in ('/showcase/',resource.canonical_path)
      or exists(select 1 from catalog.revisions r where r.entry_key=e.key
        and (r.body->'payload'->>'resourceId') is distinct from resource.identifier)
    )
  ) then
    raise exception 'Resolve missing resources, conflicting recording ownership or unexpected addresses before Showcase retirement';
  end if;
  select coalesce(jsonb_agg(jsonb_build_object('key',e.key,'previous',e.collection_path,
      'collection',resource.canonical_path) order by e.key),'[]') into changes
    from catalog.entries e
    join catalog.revisions head on head.id=e.head_revision_id and head.entry_key=e.key
    join catalog.entries resource on resource.kind='resource'
      and resource.identifier=head.body->'payload'->>'resourceId'
    where e.kind='demo' and e.collection_path='/showcase/';
  if jsonb_array_length(changes)>0 then
    -- One owner-only, locked data migration. Restore the unchanged identity trigger
    -- inside the same transaction; no persistent bypass or browser RPC is introduced.
    alter table catalog.entries disable trigger stable_entry;
    update catalog.entries e set collection_path=change->>'collection'
      from jsonb_array_elements(changes) change where e.key=change->>'key' and e.collection_path='/showcase/';
    alter table catalog.entries enable trigger stable_entry;
    insert into catalog.audit_events(action,entity,detail)
      values('retire-showcase-listing','/showcase/',jsonb_build_object(
        'retired_routes',jsonb_build_array('/showcase/','/zh/showcase/'),
        'changes',changes,'recording_details_preserved',true));
  end if;
end $$;
commit;
