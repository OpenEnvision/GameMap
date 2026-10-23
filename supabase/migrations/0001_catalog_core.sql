-- Stable domain names and extensible registries. Prefixes are ordered schema versions, not dates.
-- Supabase supplies auth.users, auth.uid(), anon, authenticated, and service_role.
begin;
create schema catalog;
revoke all on schema catalog from public, anon, authenticated;
-- EXECUTE is granted globally by PostgreSQL's default ACL. A schema-local REVOKE does not
-- remove that global default; private functions must start owner-only.
alter default privileges revoke execute on functions from public;
alter default privileges in schema catalog revoke all on tables from public;

create function catalog.hash_text(value text) returns text
language sql immutable strict set search_path = ''
as $$ select encode(sha256(convert_to(value, 'UTF8')), 'hex') $$;

create table catalog.content_kinds (
  kind text primary key check (kind ~ '^[a-z][a-z0-9]*(-[a-z0-9]+)*$'),
  label text not null check (length(trim(label)) > 0),
  owner text not null check (owner in ('database', 'git')),
  unique (kind, owner)
);
-- Contracts are registered independently per kind. Historical versions are never rewritten.
create table catalog.content_schemas (
  kind text not null references catalog.content_kinds(kind),
  version integer not null check (version > 0),
  validator_key text not null check (length(trim(validator_key)) > 0),
  enabled_for_writes boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (kind, version),
  unique (kind, version, validator_key)
);
create table catalog.locales (
  code text primary key check (code ~ '^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$')
);
create table catalog.link_roles (
  key text primary key check (key ~ '^[a-z][a-z0-9]*(-[a-z0-9]+)*$'),
  label text not null check (length(trim(label)) > 0)
);
create table catalog.relation_types (
  key text primary key check (key ~ '^[a-z][a-z0-9]*(-[a-z0-9]+)*$'),
  label text not null check (length(trim(label)) > 0)
);
-- Project identity is explicitly curated; URL matches never merge content automatically.
create table catalog.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  canonical_url text not null unique check (canonical_url ~ '^https?://[^[:space:]]+$')
);
create table catalog.entries (
  key text primary key,
  kind text not null,
  identifier text not null check (length(trim(identifier)) > 0),
  canonical_path text not null unique check (canonical_path ~ '^/[^/[:space:]][^[:space:]]*$'),
  collection_path text not null check (collection_path like '/%'),
  owner text not null,
  head_revision_id uuid,
  created_at timestamptz not null default now(),
  unique (kind, identifier),
  unique (key, kind),
  foreign key (kind, owner) references catalog.content_kinds(kind, owner),
  check (key = kind || ':' || identifier)
);
create table catalog.project_entries (
  project_id uuid not null references catalog.projects(id),
  entry_key text primary key references catalog.entries(key),
  rationale text not null check (length(trim(rationale)) > 0)
);

-- Typed immutable bodies are versioned by kind; shared/queryable concerns stay relational.
create table catalog.revisions (
  id uuid primary key default gen_random_uuid(),
  entry_key text not null,
  kind text not null,
  schema_version integer not null,
  parent_id uuid,
  body_text text not null,
  body jsonb generated always as (body_text::jsonb) stored,
  content_digest text generated always as (catalog.hash_text(body_text)) stored,
  state text not null default 'draft' check (state in ('draft', 'in_review', 'approved', 'rejected')),
  source_ref text,
  source_review jsonb not null default '{}' check (jsonb_typeof(source_review) = 'object'),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  review_note text,
  unique (entry_key, id),
  unique (id, content_digest, kind, schema_version),
  foreign key (entry_key, kind) references catalog.entries(key, kind),
  foreign key (kind, schema_version) references catalog.content_schemas(kind, version),
  foreign key (entry_key, parent_id) references catalog.revisions(entry_key, id),
  check (jsonb_typeof(body) = 'object' and body - array['title','summary','payload','attachments'] = '{}'),
  check (body ?& array['title','summary','payload','attachments']),
  check (jsonb_typeof(body -> 'title') = 'string' and length(trim(body ->> 'title')) > 0),
  check (jsonb_typeof(body -> 'summary') = 'string' and length(trim(body ->> 'summary')) > 0),
  check (jsonb_typeof(body -> 'payload') = 'object' and jsonb_typeof(body -> 'attachments') = 'object'),
  check (state <> 'approved' or (reviewed_by is not null and reviewed_at is not null)),
  check (reviewed_by is null or created_by is distinct from reviewed_by)
);
alter table catalog.entries add constraint entry_head_owner
  foreign key (key, head_revision_id) references catalog.revisions(entry_key, id) deferrable initially deferred;
create index revision_entry_history on catalog.revisions(entry_key, created_at desc);

create table catalog.terms (
  key text primary key,
  scheme text not null,
  value text not null,
  label text not null,
  controlled boolean not null,
  unique (scheme, value),
  check (key = scheme || ':' || value)
);
create table catalog.revision_terms (
  revision_id uuid not null references catalog.revisions(id),
  term_key text not null references catalog.terms(key),
  position integer not null check (position >= 0),
  primary key (revision_id, term_key),
  unique (revision_id, position)
);
create table catalog.revision_links (
  revision_id uuid not null references catalog.revisions(id),
  field text not null,
  url text not null check (url ~ '^https?://[^[:space:]]+$'),
  role text not null references catalog.link_roles(key),
  primary key (revision_id, field)
);
create table catalog.revision_relations (
  revision_id uuid not null references catalog.revisions(id),
  target_key text not null references catalog.entries(key),
  relation text not null references catalog.relation_types(key),
  field text not null,
  primary key (revision_id, field)
);
create index revision_relation_target on catalog.revision_relations(target_key);
create table catalog.assets (
  id text primary key check (id ~ '^[a-f0-9]{64}$'),
  path text not null check (path !~ '(^/|(^|/)\.\.(/|$)|\\)'),
  sha256 text not null check (sha256 ~ '^[a-f0-9]{64}$'),
  bytes bigint not null check (bytes >= 0),
  unique (path, sha256)
);
create table catalog.revision_assets (
  revision_id uuid not null references catalog.revisions(id),
  asset_id text not null references catalog.assets(id),
  field text not null,
  primary key (revision_id, field)
);
create table catalog.translations (
  revision_id uuid not null references catalog.revisions(id),
  locale text not null references catalog.locales(code),
  field text not null,
  value jsonb not null check (jsonb_typeof(value) in ('string', 'array')),
  source_hash text not null check (source_hash ~ '^[a-f0-9]{64}$'),
  primary key (revision_id, locale, field)
);
-- Receipts bind exact bytes, content kind, schema version, and registered validator together.
create table catalog.validation_receipts (
  revision_id uuid primary key,
  content_digest text not null,
  kind text not null,
  schema_version integer not null,
  validator_key text not null,
  validator_version text not null check (length(trim(validator_version)) > 0),
  pipeline_run text not null check (length(trim(pipeline_run)) > 0),
  validated_at timestamptz not null default now(),
  foreign key (revision_id, content_digest, kind, schema_version)
    references catalog.revisions(id, content_digest, kind, schema_version),
  foreign key (kind, schema_version, validator_key)
    references catalog.content_schemas(kind, version, validator_key)
);
create table catalog.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  action text not null,
  entity text not null,
  detail jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create function catalog.deny_mutation() returns trigger
language plpgsql set search_path = '' as $$
begin raise exception 'Immutable catalog history: %', tg_table_name; end $$;
create function catalog.guard_revision() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'DELETE' then raise exception 'Immutable revision'; end if;
  -- Generated columns are recomputed after BEFORE triggers; compare their source instead.
  if (to_jsonb(new) - array['body','content_digest','state','submitted_at','reviewed_by','reviewed_at','review_note'])
     is distinct from (to_jsonb(old) - array['body','content_digest','state','submitted_at','reviewed_by','reviewed_at','review_note']) then
    raise exception 'Immutable revision content; save a successor instead';
  end if;
  if not ((old.state = 'draft' and new.state = 'in_review') or
          (old.state = 'in_review' and new.state in ('approved','rejected'))) then
    raise exception 'Invalid revision transition: % -> %', old.state, new.state;
  end if;
  return new;
end $$;
create trigger immutable_revision before update or delete on catalog.revisions
  for each row execute function catalog.guard_revision();
create function catalog.guard_entry_identity() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (to_jsonb(new) - 'head_revision_id') is distinct from (to_jsonb(old) - 'head_revision_id') then
    raise exception 'Stable identity cannot be changed';
  end if;
  return new;
end $$;
create trigger stable_entry before update on catalog.entries
  for each row execute function catalog.guard_entry_identity();
create function catalog.guard_schema_identity() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (to_jsonb(new) - 'enabled_for_writes') is distinct from (to_jsonb(old) - 'enabled_for_writes') then
    raise exception 'Immutable schema contract; register a new version';
  end if;
  return new;
end $$;
create trigger stable_schema before update on catalog.content_schemas
  for each row execute function catalog.guard_schema_identity();
create function catalog.guard_projection() returns trigger
language plpgsql set search_path = '' as $$
declare revision uuid;
begin
  revision := case when tg_op = 'DELETE' then old.revision_id else new.revision_id end;
  if exists (select 1 from catalog.validation_receipts where revision_id = revision) or
     (tg_op = 'UPDATE' and exists (select 1 from catalog.validation_receipts where revision_id = old.revision_id)) then
    raise exception 'Validated revision projections are immutable';
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end $$;
do $$ declare table_name text; begin
  foreach table_name in array array['validation_receipts','audit_events','assets'] loop
    execute format('create trigger immutable_history before update or delete on catalog.%I for each row execute function catalog.deny_mutation()', table_name);
  end loop;
  foreach table_name in array array['revision_terms','revision_links','revision_relations','revision_assets','translations'] loop
    execute format('create trigger freeze_validated_projection before insert or update or delete on catalog.%I for each row execute function catalog.guard_projection()', table_name);
  end loop;
end $$;

-- Every migration that adds tables invokes this before committing. No direct browser access.
create function catalog.secure_tables() returns void
language plpgsql security definer set search_path = '' as $$
declare table_name text;
begin
  for table_name in select tablename from pg_catalog.pg_tables where schemaname = 'catalog' loop
    execute format('alter table catalog.%I enable row level security', table_name);
    execute format('revoke all on catalog.%I from public, anon, authenticated', table_name);
  end loop;
end $$;
select catalog.secure_tables();
commit;
