-- Opaque browser sessions; Auth tokens are encrypted server-side, never localStorage.
begin;
create table catalog.studio_sessions (
  id_hash text primary key check (id_hash ~ '^[a-f0-9]{64}$'),
  user_id uuid not null references auth.users(id),
  encrypted_payload text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index studio_session_expiry on catalog.studio_sessions(expires_at);
create index studio_session_owner on catalog.studio_sessions(user_id);
select catalog.secure_tables();
commit;
