-- Explicit, immutable environment/project/instance/target identity. No implicit environment adoption.
begin;
create table catalog.release_realms (
  singleton boolean primary key default true check(singleton),
  environment text not null check(environment in ('local','staging','production')),
  project_key text not null check(project_key ~ '^[a-z][a-z0-9:._-]{0,99}$'),
  instance_id uuid not null,
  target_key text not null check(target_key ~ '^[a-z][a-z0-9-]{0,63}$')
);
create trigger immutable_release_realm before update or delete on catalog.release_realms
  for each row execute function catalog.deny_mutation();

-- Only history that was actually activated before this migration may use the legacy rollback path.
-- Never reserialize its evidence or add an identity to its immutable historical context.
create table catalog.legacy_local_publications (
  artifact_digest text primary key references catalog.publication_artifacts(digest),
  instance_id uuid not null,
  target_key text not null,
  root_digest text not null
);
insert into catalog.legacy_local_publications
  select a.digest,s.instance_id,s.target_key,s.root_digest
  from catalog.publication_artifacts a join catalog.release_contexts c on c.release_id=a.release_id
  cross join catalog.publication_state s
  where s.target_key is not null and c.context ->> 'environment' = 'local'
    and a.evidence ->> 'version' = '1' and a.evidence -> 'development' = 'true'::jsonb
    and exists(select 1 from catalog.publication_events e where e.artifact_digest=a.digest);
create trigger immutable_legacy_local_publication before update or delete on catalog.legacy_local_publications
  for each row execute function catalog.deny_mutation();

create function catalog.current_release_realm() returns jsonb
language sql stable security definer set search_path='' as $$
  select jsonb_build_object('format','gamemap.release-realm','version',1,'environment',environment,
    'project',project_key,'instance',instance_id,'target',target_key) from catalog.release_realms where singleton
$$;
-- Operator-only. Neither service_role, the backend, nor the deployer can register/adopt a realm.
create function catalog.initialize_release_realm(p_environment text,p_project text,p_target text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare s catalog.publication_state; old catalog.release_realms;
begin
  if p_environment is null or p_environment not in ('local','staging','production') or p_project is null
    or p_project !~ '^[a-z][a-z0-9:._-]{0,99}$' or p_target is null or p_target !~ '^[a-z][a-z0-9-]{0,63}$' then
    raise exception 'Invalid release realm';
  end if;
  select * into s from catalog.publication_state where singleton for update;
  select * into old from catalog.release_realms where singleton;
  if found then
    if old.environment is distinct from p_environment or old.project_key is distinct from p_project
      or old.instance_id is distinct from s.instance_id or old.target_key is distinct from p_target then
      raise exception 'Release realm is immutable; use a separately initialized project';
    end if;
    return catalog.current_release_realm();
  end if;
  if p_environment <> 'local' and (exists(select 1 from catalog.releases) or
    exists(select 1 from catalog.revisions where state <> 'draft')) then
    raise exception 'Initialize a non-local realm before importing review or release history';
  end if;
  if s.target_key is not null and (p_environment <> 'local' or s.target_key <> p_target) then
    raise exception 'Existing local publication target cannot be relabeled';
  end if;
  if exists(select 1 from catalog.legacy_local_publications h
      where p_environment <> 'local' or h.instance_id <> s.instance_id or h.target_key <> p_target or h.root_digest <> s.root_digest) then
    raise exception 'Existing local publication history cannot be relabeled';
  end if;
  insert into catalog.release_realms(environment,project_key,instance_id,target_key)
    values(p_environment,p_project,s.instance_id,p_target);
  insert into catalog.audit_events(action,entity,detail) values('initialize-release-realm',s.instance_id::text,catalog.current_release_realm());
  return catalog.current_release_realm();
end $$;
create function catalog.bind_frozen_release_realm() returns trigger
language plpgsql security definer set search_path='' as $$
declare realm jsonb := catalog.current_release_realm();
begin
  if realm is null then raise exception 'Register an explicit release realm before freezing'; end if;
  new.manifest_text := (new.manifest_text::jsonb || jsonb_build_object('format_version',2,'realm',realm))::text;
  return new;
end $$;
create trigger frozen_release_realm before insert on catalog.releases
  for each row execute function catalog.bind_frozen_release_realm();

alter table catalog.release_contexts drop constraint release_contexts_context_check;
alter table catalog.release_contexts add constraint release_context_format
  check(context ->> 'format' = 'gamemap.build-context' and context ->> 'version' in ('1','2'));
create or replace function catalog.attach_release_context(p_release uuid,p_context text,p_digest text) returns void
language plpgsql security definer set search_path='' as $$
declare context jsonb; realm jsonb := catalog.current_release_realm(); manifest jsonb;
begin
  if catalog.hash_text(p_context) is distinct from p_digest then raise exception 'Build context digest mismatch'; end if;
  context := p_context::jsonb;
  if context ->> 'format' is distinct from 'gamemap.build-context' or context ->> 'version' is distinct from '2'
    or jsonb_typeof(context -> 'selected_revisions') is distinct from 'array' then raise exception 'Unsupported realm-bound build context'; end if;
  select r.manifest into manifest from catalog.releases r where r.id=p_release;
  if realm is null or context -> 'realm' is distinct from realm or manifest -> 'realm' is distinct from realm
    or manifest ->> 'format_version' is distinct from '2' or context ->> 'environment' is distinct from realm ->> 'environment' then
    raise exception 'Build context release realm mismatch';
  end if;
  if (select count(*) from catalog.release_items where release_id=p_release)=0 then raise exception 'Unknown or empty release'; end if;
  if (select count(*) from catalog.release_items where release_id=p_release) <> jsonb_array_length(context -> 'selected_revisions') or
    exists(select 1 from catalog.release_items i join catalog.revisions r on r.id=i.revision_id where i.release_id=p_release
      and not exists(select 1 from jsonb_array_elements(context -> 'selected_revisions') x
        where x ->> 'id'=r.id::text and x ->> 'digest'=r.content_digest and x ->> 'schema_version'=r.schema_version::text)) then
    raise exception 'Build context does not match the frozen revisions';
  end if;
  insert into catalog.release_contexts(release_id,context_text) values(p_release,p_context);
  insert into catalog.audit_events(action,entity) values('attach-build-context',p_release::text);
end $$;
create function catalog.is_legacy_local_publication(p_artifact text) returns boolean
language sql stable security definer set search_path='' as $$
  select exists(select 1 from catalog.legacy_local_publications h cross join catalog.publication_state s
    cross join catalog.release_realms r where h.artifact_digest=p_artifact and r.environment='local'
      and h.instance_id=s.instance_id and h.instance_id=r.instance_id and h.target_key=s.target_key
      and h.target_key=r.target_key and h.root_digest=s.root_digest)
$$;
create or replace function catalog.publication_status() returns jsonb
language sql stable security definer set search_path='' as $$
  select to_jsonb(s) || jsonb_build_object('release_id',d.release_id,'realm',catalog.current_release_realm())
    from catalog.publication_state s cross join catalog.deployment_state d
$$;
create or replace function catalog.claim_publication_target(p_target text,p_root text) returns void
language plpgsql security definer set search_path='' as $$
declare current catalog.publication_state; realm jsonb := catalog.current_release_realm();
begin
  if realm is null or realm ->> 'environment' <> 'local' or realm ->> 'target' is distinct from p_target then
    raise exception 'Local publication target differs from the registered release realm';
  end if;
  if p_root is null or p_root !~ '^[a-f0-9]{64}$' then raise exception 'Invalid publication target'; end if;
  select * into current from catalog.publication_state where singleton for update;
  if realm ->> 'instance' is distinct from current.instance_id::text then raise exception 'Publication instance differs from release realm'; end if;
  if current.target_key is not null and (current.target_key <> p_target or current.root_digest <> p_root) then raise exception 'Publication target is already bound elsewhere'; end if;
  update catalog.publication_state set target_key=p_target,root_digest=p_root where singleton;
end $$;
create or replace function catalog.register_publication_artifact(p_evidence text) returns void
language plpgsql security definer set search_path='' as $$
declare e jsonb := p_evidence::jsonb; r catalog.releases; c catalog.release_contexts; old catalog.publication_artifacts;
  realm jsonb := catalog.current_release_realm();
begin
  if realm is null or realm ->> 'environment' <> 'local' or e -> 'realm' is distinct from realm then
    raise exception 'Artifact release realm mismatch; this publisher accepts only its registered local realm';
  end if;
  if e ->> 'format' is distinct from 'gamemap.site-artifact' or e ->> 'version' is distinct from '2'
    or e ->> 'artifactDigest' !~ '^[a-f0-9]{64}$' or e ->> 'artifactDigest' is null
    or e -> 'browserChecked' is distinct from 'true'::jsonb or e -> 'development' is distinct from 'true'::jsonb
    or e ->> 'mode' is distinct from 'release' or jsonb_typeof(e -> 'files') is distinct from 'array' then
    raise exception 'Local publication requires a realm-bound browser-checked development artifact';
  end if;
  select * into r from catalog.releases where id=(e ->> 'release')::uuid;
  select * into c from catalog.release_contexts where release_id=r.id;
  if r.id is null or c.release_id is null or e ->> 'manifestDigest' is distinct from r.digest
    or e ->> 'contextDigest' is distinct from c.digest or e ->> 'gitCommit' is distinct from c.context ->> 'git_commit'
    or r.manifest -> 'realm' is distinct from realm or c.context -> 'realm' is distinct from realm
    or c.context ->> 'environment' is distinct from 'local' or c.context ->> 'version' is distinct from '2' then
    raise exception 'Artifact does not match an immutable realm-bound local release';
  end if;
  select * into old from catalog.publication_artifacts where digest=e ->> 'artifactDigest';
  if found then
    if old.evidence_text is distinct from p_evidence then raise exception 'Conflicting artifact receipt'; end if;
    return;
  end if;
  insert into catalog.publication_artifacts(digest,release_id,evidence_text) values(e ->> 'artifactDigest',r.id,p_evidence);
end $$;
create or replace function catalog.publication_artifact(p_digest text) returns jsonb
language sql stable security definer set search_path='' as $$
  select to_jsonb(a) || jsonb_build_object('published',exists(select 1 from catalog.publication_events e where e.artifact_digest=a.digest),
    'legacy_local_rollback',catalog.is_legacy_local_publication(a.digest)) from catalog.publication_artifacts a where a.digest=p_digest
$$;
create or replace function catalog.activate_publication(p_artifact text,p_expected_artifact text,p_expected_release uuid,p_run text) returns uuid
language plpgsql security definer set search_path='' as $$
declare s catalog.publication_state; a catalog.publication_artifacts; event uuid; realm jsonb := catalog.current_release_realm();
begin
  select * into s from catalog.publication_state where singleton for update;
  if realm is null or realm ->> 'environment' <> 'local' or realm ->> 'instance' is distinct from s.instance_id::text
    or realm ->> 'target' is distinct from s.target_key then raise exception 'A matching local release realm and publication target are required'; end if;
  if s.artifact_digest is distinct from p_expected_artifact then raise exception 'Artifact deployment conflict' using errcode='40001'; end if;
  select * into a from catalog.publication_artifacts where digest=p_artifact;
  if not found then raise exception 'Unknown verified artifact'; end if;
  if not catalog.is_legacy_local_publication(p_artifact) and
    (a.evidence ->> 'version' is distinct from '2' or a.evidence -> 'realm' is distinct from realm) then
    raise exception 'Unbound legacy artifacts are not eligible for new publication';
  end if;
  perform catalog.activate_release_unchecked(a.release_id,p_expected_release,p_run);
  update catalog.publication_state set artifact_digest=p_artifact where singleton;
  insert into catalog.publication_events(artifact_digest,previous_artifact,previous_release,pipeline_run)
    values(p_artifact,p_expected_artifact,p_expected_release,p_run) returning id into event;
  return event;
end $$;
-- Close the initialization-time bypass too: realm registration is not artifact activation.
create or replace function catalog.activate_release(p_release uuid,p_expected_current uuid,p_pipeline_run text) returns void
language plpgsql security definer set search_path='' as $$
begin
  raise exception 'An artifact-bound publisher is required for this target';
end $$;
select catalog.secure_tables();
revoke all on function catalog.current_release_realm(),catalog.initialize_release_realm(text,text,text),
  catalog.bind_frozen_release_realm(),catalog.is_legacy_local_publication(text)
  from public,anon,authenticated,service_role,catalog_backend,catalog_deployer;
grant execute on function catalog.current_release_realm() to catalog_backend,catalog_deployer;
commit;
