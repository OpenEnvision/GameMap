-- The development server indexes the working catalog under its own keys, so its
-- ratings and comments never mix with the published snapshot's.
begin;

-- A published index must not hide development games that are not in that snapshot.
create or replace function public.community_sync_games(p_games jsonb) returns void
language plpgsql security definer set search_path='' as $$
begin
  if jsonb_typeof(p_games)<>'array' or jsonb_array_length(p_games)>5000 then raise exception 'Invalid game index'; end if;
  if exists(select 1 from jsonb_array_elements(p_games) g where
    coalesce(g->>'key','') !~ '^(example|foundation|repository-research|threejs-game):[^[:space:]]+$' or jsonb_typeof(g->'payload')<>'object') then
    raise exception 'Invalid catalog game identity';
  end if;
  update community.games set public=false where origin='catalog' and key not like 'dev:%' and not exists(select 1 from jsonb_array_elements(p_games) g where g->>'key'=key);
  insert into community.games(key,origin,public,payload)
    select g->>'key','catalog',true,g->'payload' from jsonb_array_elements(p_games) g
    on conflict(key) do update set public=true,payload=excluded.payload,updated_at=now() where community.games.origin='catalog';
end $$;

create function public.community_sync_development_games(p_games jsonb) returns void
language plpgsql security definer set search_path='' as $$
begin
  if jsonb_typeof(p_games)<>'array' or jsonb_array_length(p_games)>5000 then raise exception 'Invalid game index'; end if;
  if exists(select 1 from jsonb_array_elements(p_games) g where
    coalesce(g->>'key','') !~ '^dev:(example|foundation|repository-research|threejs-game):[^[:space:]]+$' or jsonb_typeof(g->'payload')<>'object') then
    raise exception 'Invalid development game identity';
  end if;
  insert into community.games(key,origin,public,payload)
    select g->>'key','catalog',true,g->'payload' from jsonb_array_elements(p_games) g
    on conflict(key) do update set public=true,payload=excluded.payload,updated_at=now();
  update community.games g0 set public=false where g0.key like 'dev:%' and not exists(
    select 1 from jsonb_array_elements(p_games) g where g->>'key'=g0.key);
end $$;

revoke all on function public.community_sync_development_games(jsonb) from public,anon,authenticated;
grant execute on function public.community_sync_development_games(jsonb) to community_backend;
grant execute on function public.community_sync_games(jsonb) to community_backend;
commit;
