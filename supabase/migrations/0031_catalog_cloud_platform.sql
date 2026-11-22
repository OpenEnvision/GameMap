-- Cloud publication targets/receipts, emergency entry withdrawals and startup login privilege audit.
-- Preserves all local-only publication guards from 0011/0013 without modifying historical migrations.
begin;

create table catalog.cloud_publication_targets (
  singleton boolean primary key default true check (singleton),
  environment text not null check (environment in ('staging', 'production')),
  project_key text not null check (project_key ~ '^[a-z][a-z0-9:._-]{0,99}$'),
  instance_id uuid not null,
  target_key text not null check (target_key ~ '^[a-z][a-z0-9-]{0,63}$'),
  provider text not null check (provider in ('github-pages', 'persistent-node')),
  repository text not null check (repository ~ '^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$'),
  origin text not null check (origin ~ '^https://[^[:space:]/]+$'),
  base_path text not null check (base_path ~ '^/([A-Za-z0-9._-]+/)*$'),
  approval_environment text not null check (approval_environment ~ '^[a-z][a-z0-9-]{0,63}$'),
  target_digest text not null check (target_digest ~ '^[a-f0-9]{64}$'),
  claimed_at timestamptz not null default now()
);
create trigger immutable_cloud_publication_target before update or delete on catalog.cloud_publication_targets
  for each row execute function catalog.deny_mutation();

create table catalog.cloud_publication_deployments (
  id uuid primary key default gen_random_uuid(),
  artifact_digest text not null references catalog.publication_artifacts(digest),
  release_id uuid not null references catalog.releases(id),
  previous_artifact text references catalog.publication_artifacts(digest),
  previous_release uuid references catalog.releases(id),
  provider text not null check (provider in ('github-pages', 'persistent-node')),
  deployment_url text not null check (deployment_url ~ '^https://[^[:space:]]+$'),
  deployment_id text not null check (length(trim(deployment_id)) between 1 and 200),
  deployed_commit text check (deployed_commit is null or deployed_commit ~ '^[a-f0-9]{40}$'),
  verified_files_digest text not null check (verified_files_digest ~ '^[a-f0-9]{64}$'),
  pipeline_run text not null check (length(trim(pipeline_run)) between 1 and 200),
  deployer_login text not null default session_user,
  created_at timestamptz not null default now()
);
create trigger immutable_cloud_publication_deployment before update or delete on catalog.cloud_publication_deployments
  for each row execute function catalog.deny_mutation();

create table catalog.entry_withdrawals (
  id uuid primary key default gen_random_uuid(),
  entry_key text not null references catalog.entries(key),
  canonical_path text not null check (canonical_path ~ '^/'),
  reason text not null check (length(trim(reason)) between 5 and 2000),
  public_notice text not null check (length(trim(public_notice)) between 5 and 1000),
  status text not null default 'active' check (status in ('active', 'lifted')),
  withdrawn_by uuid not null references auth.users(id),
  withdrawn_at timestamptz not null default now(),
  lifted_by uuid references auth.users(id),
  lifted_at timestamptz,
  lift_note text,
  check ((status = 'active' and lifted_by is null and lifted_at is null and lift_note is null)
    or (status = 'lifted' and lifted_by is not null and lifted_at is not null and length(trim(coalesce(lift_note, ''))) between 1 and 2000))
);
create unique index entry_withdrawals_active_key on catalog.entry_withdrawals(entry_key) where status = 'active';
create trigger deny_withdrawal_delete before delete on catalog.entry_withdrawals
  for each row execute function catalog.deny_mutation();

create function catalog.cloud_publication_status() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'instance_id', s.instance_id,
    'artifact_digest', s.artifact_digest,
    'release_id', d.release_id,
    'realm', catalog.current_release_realm(),
    'target', (select to_jsonb(t) from catalog.cloud_publication_targets t where t.singleton),
    'latest_deployment', (
      select to_jsonb(dep) from catalog.cloud_publication_deployments dep
      order by dep.created_at desc, dep.id desc limit 1
    )
  )
  from catalog.publication_state s
  cross join catalog.deployment_state d
$$;

create function catalog.claim_cloud_publication_target(
  p_provider text,
  p_repository text,
  p_origin text,
  p_base text,
  p_approval_environment text,
  p_target_digest text
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  realm jsonb := catalog.current_release_realm();
  s catalog.publication_state;
  existing catalog.cloud_publication_targets;
begin
  if realm is null or realm ->> 'environment' not in ('staging', 'production') then
    raise exception 'Cloud publication target requires a registered staging or production realm';
  end if;
  if p_provider not in ('github-pages', 'persistent-node')
    or p_repository is null or p_repository !~ '^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$'
    or p_origin is null or p_origin !~ '^https://[^[:space:]/]+$'
    or p_base is null or p_base !~ '^/([A-Za-z0-9._-]+/)*$'
    or p_approval_environment is null or p_approval_environment !~ '^[a-z][a-z0-9-]{0,63}$'
    or p_target_digest is null or p_target_digest !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid cloud publication target configuration';
  end if;
  select * into s from catalog.publication_state where singleton for update;
  if realm ->> 'instance' is distinct from s.instance_id::text then
    raise exception 'Publication instance differs from release realm';
  end if;
  if s.target_key is not null and not exists(select 1 from catalog.cloud_publication_targets where singleton) then
    raise exception 'Publication state is already bound to a local target';
  end if;
  select * into existing from catalog.cloud_publication_targets where singleton;
  if found then
    if existing.provider is distinct from p_provider
      or existing.repository is distinct from p_repository
      or existing.origin is distinct from p_origin
      or existing.base_path is distinct from p_base
      or existing.approval_environment is distinct from p_approval_environment
      or existing.target_digest is distinct from p_target_digest
      or existing.environment is distinct from realm ->> 'environment'
      or existing.project_key is distinct from realm ->> 'project'
      or existing.instance_id is distinct from s.instance_id
      or existing.target_key is distinct from realm ->> 'target' then
      raise exception 'Cloud publication target is already bound elsewhere';
    end if;
    return to_jsonb(existing);
  end if;
  insert into catalog.cloud_publication_targets(
    environment, project_key, instance_id, target_key, provider, repository,
    origin, base_path, approval_environment, target_digest
  ) values (
    realm ->> 'environment', realm ->> 'project', s.instance_id, realm ->> 'target',
    p_provider, p_repository, p_origin, p_base, p_approval_environment, p_target_digest
  ) returning * into existing;
  insert into catalog.audit_events(action, entity, detail)
    values ('claim-cloud-publication-target', s.instance_id::text, to_jsonb(existing));
  return to_jsonb(existing);
end $$;

create function catalog.register_cloud_publication_artifact(p_evidence text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  e jsonb := p_evidence::jsonb;
  r catalog.releases;
  c catalog.release_contexts;
  old catalog.publication_artifacts;
  realm jsonb := catalog.current_release_realm();
begin
  if realm is null or realm ->> 'environment' not in ('staging', 'production') or e -> 'realm' is distinct from realm then
    raise exception 'Artifact release realm mismatch; cloud publisher requires its registered staging or production realm';
  end if;
  if e ->> 'format' is distinct from 'gamemap.site-artifact'
    or e ->> 'version' is distinct from '2'
    or e ->> 'artifactDigest' is null or e ->> 'artifactDigest' !~ '^[a-f0-9]{64}$'
    or e -> 'browserChecked' is distinct from 'true'::jsonb
    or e -> 'development' is distinct from 'false'::jsonb
    or e ->> 'mode' is distinct from 'release'
    or jsonb_typeof(e -> 'files') is distinct from 'array' then
    raise exception 'Cloud publication requires a realm-bound, browser-checked, non-development artifact';
  end if;
  select * into r from catalog.releases where id = (e ->> 'release')::uuid;
  select * into c from catalog.release_contexts where release_id = r.id;
  if r.id is null or c.release_id is null
    or e ->> 'manifestDigest' is distinct from r.digest
    or e ->> 'contextDigest' is distinct from c.digest
    or e ->> 'gitCommit' is distinct from c.context ->> 'git_commit'
    or r.manifest -> 'realm' is distinct from realm
    or c.context -> 'realm' is distinct from realm
    or c.context ->> 'environment' is distinct from realm ->> 'environment'
    or c.context ->> 'version' is distinct from '2'
    or c.context -> 'source_dirty' is distinct from 'false'::jsonb then
    raise exception 'Artifact does not match an immutable clean realm-bound cloud release';
  end if;
  select * into old from catalog.publication_artifacts where digest = e ->> 'artifactDigest';
  if found then
    if old.evidence_text is distinct from p_evidence then
      raise exception 'Conflicting artifact receipt';
    end if;
    return;
  end if;
  insert into catalog.publication_artifacts(digest, release_id, evidence_text)
    values (e ->> 'artifactDigest', r.id, p_evidence);
end $$;

create function catalog.activate_cloud_publication(
  p_artifact text,
  p_expected_artifact text,
  p_expected_release uuid,
  p_run text,
  p_deployment jsonb
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  s catalog.publication_state;
  t catalog.cloud_publication_targets;
  a catalog.publication_artifacts;
  realm jsonb := catalog.current_release_realm();
  event uuid;
  expected_prefix text;
  dep_url text;
  dep_id text;
  dep_commit text;
  dep_digest text;
begin
  select * into s from catalog.publication_state where singleton for update;
  select * into t from catalog.cloud_publication_targets where singleton;
  if realm is null or realm ->> 'environment' not in ('staging', 'production')
    or t.singleton is null
    or t.environment is distinct from realm ->> 'environment'
    or t.project_key is distinct from realm ->> 'project'
    or t.instance_id is distinct from s.instance_id
    or t.target_key is distinct from realm ->> 'target' then
    raise exception 'Claim a matching cloud publication target before activating';
  end if;
  if s.artifact_digest is distinct from p_expected_artifact then
    raise exception 'Artifact deployment conflict' using errcode = '40001';
  end if;
  select * into a from catalog.publication_artifacts where digest = p_artifact;
  if not found then
    raise exception 'Unknown verified cloud artifact';
  end if;
  if a.evidence ->> 'version' is distinct from '2'
    or a.evidence -> 'development' is distinct from 'false'::jsonb
    or a.evidence -> 'browserChecked' is distinct from 'true'::jsonb
    or a.evidence -> 'realm' is distinct from realm then
    raise exception 'Artifact is not eligible for cloud publication in this realm';
  end if;
  if p_deployment is null or jsonb_typeof(p_deployment) <> 'object' then
    raise exception 'Verified deployment evidence is required';
  end if;
  expected_prefix := t.origin || t.base_path;
  dep_url := p_deployment ->> 'deploymentUrl';
  dep_id := p_deployment ->> 'deploymentId';
  dep_commit := nullif(p_deployment ->> 'deployedCommit', '');
  dep_digest := p_deployment ->> 'verifiedFilesDigest';
  if p_deployment ->> 'provider' is distinct from t.provider
    or dep_url is null or left(dep_url, length(expected_prefix)) <> expected_prefix
    or dep_id is null or length(trim(dep_id)) not between 1 and 200
    or dep_digest is distinct from p_artifact then
    raise exception 'Deployment evidence does not match the bound cloud target and artifact';
  end if;
  perform catalog.activate_release_unchecked(a.release_id, p_expected_release, p_run);
  update catalog.publication_state set artifact_digest = p_artifact where singleton;
  insert into catalog.publication_events(artifact_digest, previous_artifact, previous_release, pipeline_run)
    values (p_artifact, p_expected_artifact, p_expected_release, p_run);
  insert into catalog.cloud_publication_deployments(
    artifact_digest, release_id, previous_artifact, previous_release,
    provider, deployment_url, deployment_id, deployed_commit, verified_files_digest, pipeline_run
  ) values (
    p_artifact, a.release_id, p_expected_artifact, p_expected_release,
    t.provider, dep_url, trim(dep_id), dep_commit, dep_digest, p_run
  ) returning id into event;
  return event;
end $$;

create function public.catalog_withdraw_entry(
  p_key text,
  p_reason text,
  p_public_notice text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  entry catalog.entries;
  wid uuid;
begin
  if actor is null or not exists(
    select 1 from catalog.memberships where user_id = actor and role in ('reviewer', 'admin')
  ) then
    raise exception 'Reviewer or administrator permission required' using errcode = '42501';
  end if;
  if p_reason is null or length(trim(p_reason)) not between 5 and 2000
    or p_public_notice is null or length(trim(p_public_notice)) not between 5 and 1000 then
    raise exception 'Provide an internal withdrawal reason and a public notice';
  end if;
  select * into entry from catalog.entries where key = p_key;
  if not found then
    raise exception 'Entry not found' using errcode = 'P0002';
  end if;
  if exists(select 1 from catalog.entry_withdrawals where entry_key = p_key and status = 'active') then
    raise exception 'Entry is already withdrawn' using errcode = '40001';
  end if;
  insert into catalog.entry_withdrawals(entry_key, canonical_path, reason, public_notice, withdrawn_by)
    values (entry.key, entry.canonical_path, trim(p_reason), trim(p_public_notice), actor)
    returning id into wid;
  insert into catalog.audit_events(actor_id, action, entity, detail)
    values (actor, 'withdraw-entry', entry.key, jsonb_build_object(
      'withdrawal_id', wid, 'canonical_path', entry.canonical_path,
      'reason', trim(p_reason), 'public_notice', trim(p_public_notice)
    ));
  return wid;
end $$;

create function public.catalog_lift_withdrawal(p_key text, p_note text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  wid uuid;
begin
  if actor is null or not exists(
    select 1 from catalog.memberships where user_id = actor and role in ('reviewer', 'admin')
  ) then
    raise exception 'Reviewer or administrator permission required' using errcode = '42501';
  end if;
  if p_note is null or length(trim(p_note)) not between 1 and 2000 then
    raise exception 'Provide a note explaining why the withdrawal is lifted';
  end if;
  update catalog.entry_withdrawals
    set status = 'lifted', lifted_by = actor, lifted_at = now(), lift_note = trim(p_note)
    where entry_key = p_key and status = 'active'
    returning id into wid;
  if wid is null then
    raise exception 'No active withdrawal exists for this entry' using errcode = 'P0002';
  end if;
  insert into catalog.audit_events(actor_id, action, entity, detail)
    values (actor, 'lift-withdrawal', p_key, jsonb_build_object('withdrawal_id', wid, 'note', trim(p_note)));
end $$;

create function catalog.active_withdrawals() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', id,
    'key', entry_key,
    'canonicalPath', canonical_path,
    'reason', reason,
    'publicNotice', public_notice,
    'withdrawnAt', withdrawn_at
  ) order by entry_key), '[]'::jsonb)
  from catalog.entry_withdrawals
  where status = 'active'
$$;

-- Startup privilege audit for Studio, Community Server and Cloud Publisher logins.
create function public.inspect_login_privileges() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'login', r.rolname,
    'currentUser', current_user,
    'rolsuper', r.rolsuper,
    'rolcreaterole', r.rolcreaterole,
    'rolcreatedb', r.rolcreatedb,
    'rolbypassrls', r.rolbypassrls,
    'rolinherit', r.rolinherit,
    'directRoles', coalesce((
      select jsonb_agg(g.rolname order by g.rolname)
      from pg_catalog.pg_auth_members m
      join pg_catalog.pg_roles g on g.oid = m.roleid
      where m.member = r.oid
    ), '[]'::jsonb),
    'ownsCatalogObjects', exists(
      select 1 from pg_catalog.pg_class c
      join pg_catalog.pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'catalog' and c.relowner = r.oid
    ),
    'ownsCommunityObjects', exists(
      select 1 from pg_catalog.pg_class c
      join pg_catalog.pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'community' and c.relowner = r.oid
    )
  )
  from pg_catalog.pg_roles r
  where r.rolname = session_user
$$;

select catalog.secure_tables();

revoke all on function
  catalog.cloud_publication_status(),
  catalog.claim_cloud_publication_target(text, text, text, text, text, text),
  catalog.register_cloud_publication_artifact(text),
  catalog.activate_cloud_publication(text, text, uuid, text, jsonb),
  catalog.active_withdrawals(),
  public.catalog_withdraw_entry(text, text, text),
  public.catalog_lift_withdrawal(text, text),
  public.inspect_login_privileges()
  from public, anon, authenticated, service_role, catalog_backend, catalog_deployer, community_backend, community_user, community_anon;

grant execute on function
  catalog.cloud_publication_status(),
  catalog.claim_cloud_publication_target(text, text, text, text, text, text),
  catalog.register_cloud_publication_artifact(text),
  catalog.activate_cloud_publication(text, text, uuid, text, jsonb)
  to catalog_deployer;

grant execute on function catalog.active_withdrawals()
  to catalog_backend, catalog_deployer;

grant execute on function
  public.catalog_withdraw_entry(text, text, text),
  public.catalog_lift_withdrawal(text, text)
  to authenticated;

grant execute on function public.inspect_login_privileges()
  to catalog_backend, catalog_deployer, community_backend;

commit;
