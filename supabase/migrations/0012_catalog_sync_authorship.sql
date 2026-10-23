-- Human-triggered Git/generated revisions must retain their initiating actor.
-- Do not rewrite immutable historical authors/reviews: consult their immutable sync audit instead.
begin;
create index audit_sync_actor on catalog.audit_events(entity,actor_id) where action='sync-git-document';
create function catalog.attribute_synced_revision() returns trigger
language plpgsql security definer set search_path='' as $$
declare actor uuid;
begin
  if current_setting('role',true) = 'catalog_backend' and exists(select 1 from catalog.content_kinds where kind=new.kind and owner='git') then
    actor := catalog.require_role(array['admin']);
    if new.created_by is not null and new.created_by is distinct from actor then
      raise exception 'Synchronized revision author does not match its initiating actor' using errcode='42501';
    end if;
    new.created_by := actor;
  end if;
  return new;
end $$;
create trigger synced_revision_author before insert on catalog.revisions
  for each row execute function catalog.attribute_synced_revision();

create function catalog.require_independent_sync_review(p_revision uuid,p_reviewer uuid) returns void
language plpgsql security definer set search_path='' as $$
begin
  if p_reviewer is not null and exists(select 1 from catalog.audit_events where action='sync-git-document' and entity=p_revision::text and actor_id=p_reviewer) then
    raise exception 'Sync initiators cannot review their own synchronized revision' using errcode='42501';
  end if;
end $$;
create function catalog.guard_synced_review() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  if new.state in ('approved','rejected') then
    perform catalog.require_independent_sync_review(new.id,new.reviewed_by);
  end if;
  return new;
end $$;
create trigger independent_synced_review before update on catalog.revisions
  for each row execute function catalog.guard_synced_review();
create function catalog.guard_synced_release_item() returns trigger
language plpgsql security definer set search_path='' as $$
declare reviewer uuid;
begin
  select reviewed_by into reviewer from catalog.revisions where id=new.revision_id;
  perform catalog.require_independent_sync_review(new.revision_id,reviewer);
  return new;
end $$;
create trigger independent_synced_release_item before insert on catalog.release_items
  for each row execute function catalog.guard_synced_release_item();
revoke all on function catalog.attribute_synced_revision(),catalog.require_independent_sync_review(uuid,uuid),
  catalog.guard_synced_review(),catalog.guard_synced_release_item() from public,anon,authenticated,service_role,catalog_backend,catalog_deployer;
commit;
