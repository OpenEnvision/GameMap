-- Separate deployment authority, immutable artifact receipts and one bound publication target.
begin;
create role catalog_deployer nologin noinherit;
do $$ begin execute format('grant catalog_deployer to %I', current_user); end $$;
grant usage on schema catalog to catalog_deployer;
create table catalog.publication_state (
  singleton boolean primary key default true check(singleton),
  instance_id uuid not null default gen_random_uuid(),
  target_key text,
  root_digest text check(root_digest ~ '^[a-f0-9]{64}$'),
  artifact_digest text,
  check((target_key is null) = (root_digest is null))
);
insert into catalog.publication_state(singleton) values(true);
create table catalog.publication_artifacts (
  digest text primary key check(digest ~ '^[a-f0-9]{64}$'),
  release_id uuid not null references catalog.releases(id),
  evidence_text text not null,
  evidence jsonb generated always as (evidence_text::jsonb) stored,
  evidence_digest text generated always as (catalog.hash_text(evidence_text)) stored,
  created_at timestamptz not null default now()
);
alter table catalog.publication_state add foreign key(artifact_digest) references catalog.publication_artifacts(digest);
create table catalog.publication_events (
  id uuid primary key default gen_random_uuid(),
  artifact_digest text not null references catalog.publication_artifacts(digest),
  previous_artifact text references catalog.publication_artifacts(digest),
  previous_release uuid references catalog.releases(id),
  pipeline_run text not null check(length(trim(pipeline_run)) > 0),
  deployer_login text not null default session_user,
  created_at timestamptz not null default now()
);
create trigger immutable_publication_artifact before update or delete on catalog.publication_artifacts for each row execute function catalog.deny_mutation();
create trigger immutable_publication_event before update or delete on catalog.publication_events for each row execute function catalog.deny_mutation();

-- Retain migration compatibility only until an exact-artifact publication target is claimed.
alter function catalog.activate_release(uuid,uuid,text) rename to activate_release_unchecked;
revoke all on function catalog.activate_release_unchecked(uuid,uuid,text) from public,anon,authenticated,service_role,catalog_backend;
create function catalog.activate_release(p_release uuid,p_expected_current uuid,p_pipeline_run text) returns void
language plpgsql security definer set search_path='' as $$
begin
  if exists(select 1 from catalog.publication_state where target_key is not null) then
    raise exception 'An artifact-bound publisher is required for this target';
  end if;
  perform catalog.activate_release_unchecked(p_release,p_expected_current,p_pipeline_run);
end $$;
create function catalog.publication_status() returns jsonb
language sql stable security definer set search_path='' as $$
  select to_jsonb(s) || jsonb_build_object('release_id',d.release_id)
    from catalog.publication_state s cross join catalog.deployment_state d
$$;
create function catalog.claim_publication_target(p_target text,p_root text) returns void
language plpgsql security definer set search_path='' as $$
declare current catalog.publication_state;
begin
  if p_target !~ '^[a-z][a-z0-9-]{0,63}$' or p_root !~ '^[a-f0-9]{64}$' or p_target is null or p_root is null then raise exception 'Invalid publication target'; end if;
  select * into current from catalog.publication_state where singleton for update;
  if current.target_key is not null and (current.target_key <> p_target or current.root_digest <> p_root) then raise exception 'Publication target is already bound elsewhere'; end if;
  update catalog.publication_state set target_key=p_target,root_digest=p_root where singleton;
end $$;
create function catalog.register_publication_artifact(p_evidence text) returns void
language plpgsql security definer set search_path='' as $$
declare e jsonb := p_evidence::jsonb; r catalog.releases; c catalog.release_contexts; old catalog.publication_artifacts;
begin
  if e ->> 'format' is distinct from 'gamemap.site-artifact' or e ->> 'version' is distinct from '1'
    or e ->> 'artifactDigest' !~ '^[a-f0-9]{64}$' or e ->> 'artifactDigest' is null
    or e -> 'browserChecked' is distinct from 'true'::jsonb or e -> 'development' is distinct from 'true'::jsonb
    or e ->> 'mode' is distinct from 'release' or jsonb_typeof(e -> 'files') is distinct from 'array' then raise exception 'Local publication requires a browser-checked development artifact'; end if;
  select * into r from catalog.releases where id=(e ->> 'release')::uuid;
  select * into c from catalog.release_contexts where release_id=r.id;
  if r.id is null or c.release_id is null or e ->> 'manifestDigest' is distinct from r.digest
    or e ->> 'contextDigest' is distinct from c.digest or e ->> 'gitCommit' is distinct from c.context ->> 'git_commit'
    or c.context ->> 'environment' is distinct from 'local' then raise exception 'Artifact does not match an immutable local release'; end if;
  select * into old from catalog.publication_artifacts where digest=e ->> 'artifactDigest';
  if found then
    if old.evidence_text is distinct from p_evidence then raise exception 'Conflicting artifact receipt'; end if;
    return;
  end if;
  insert into catalog.publication_artifacts(digest,release_id,evidence_text) values(e ->> 'artifactDigest',r.id,p_evidence);
end $$;
create function catalog.publication_artifact(p_digest text) returns jsonb
language sql stable security definer set search_path='' as $$
  select to_jsonb(a) || jsonb_build_object('published',exists(select 1 from catalog.publication_events e where e.artifact_digest=a.digest)) from catalog.publication_artifacts a where a.digest=p_digest
$$;
create function catalog.activate_publication(p_artifact text,p_expected_artifact text,p_expected_release uuid,p_run text) returns uuid
language plpgsql security definer set search_path='' as $$
declare s catalog.publication_state; a catalog.publication_artifacts; event uuid;
begin
  select * into s from catalog.publication_state where singleton for update;
  if s.target_key is null then raise exception 'Claim a publication target first'; end if;
  if s.artifact_digest is distinct from p_expected_artifact then raise exception 'Artifact deployment conflict' using errcode='40001'; end if;
  select * into a from catalog.publication_artifacts where digest=p_artifact;
  if not found then raise exception 'Unknown verified artifact'; end if;
  perform catalog.activate_release_unchecked(a.release_id,p_expected_release,p_run);
  update catalog.publication_state set artifact_digest=p_artifact where singleton;
  insert into catalog.publication_events(artifact_digest,previous_artifact,previous_release,pipeline_run)
    values(p_artifact,p_expected_artifact,p_expected_release,p_run) returning id into event;
  return event;
end $$;
select catalog.secure_tables();
revoke all on function catalog.activate_release(uuid,uuid,text),catalog.publication_status(),catalog.claim_publication_target(text,text),
  catalog.register_publication_artifact(text),catalog.publication_artifact(text),catalog.activate_publication(text,text,uuid,text) from public,anon,authenticated,catalog_backend;
grant execute on function catalog.activate_release(uuid,uuid,text) to service_role;
grant execute on function catalog.publication_status(),catalog.claim_publication_target(text,text),catalog.register_publication_artifact(text),
  catalog.publication_artifact(text),catalog.activate_publication(text,text,uuid,text) to catalog_deployer;
commit;
