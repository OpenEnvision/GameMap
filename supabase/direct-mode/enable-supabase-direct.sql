-- BlogrXiv-style Zero-Server Hybrid Mode for GameMap Community (GitHub Pages + Supabase Cloud Free Tier).
-- Run this script in the Supabase SQL Editor AFTER applying standard migrations 0001..0031.
-- It is intentionally kept outside supabase/migrations/ so BFF deployments retain 0024's strict BFF-only write lock by default.

begin;

-- 1. Allow moderator authorization via either catalog.memberships OR BlogrXiv-style auth.users app_metadata.role ('admin' / 'reviewer').
create or replace function public.community_direct_is_moderator() returns boolean
language plpgsql stable security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  jwt_role text := coalesce(
    current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'role',
    ''
  );
begin
  if actor is null then
    return false;
  end if;
  if exists (
    select 1 from catalog.memberships
    where user_id = actor and role in ('reviewer', 'admin')
  ) then
    return true;
  end if;
  if jwt_role in ('reviewer', 'admin') then
    return true;
  end if;
  if exists (
    select 1 from auth.users u
    where u.id = actor
      and coalesce(to_jsonb(u) -> 'raw_app_meta_data' ->> 'role', '') in ('reviewer', 'admin')
  ) then
    return true;
  end if;
  return false;
end $$;

create or replace function community.require_moderator() returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
begin
  if actor is null or not public.community_direct_is_moderator() then
    raise exception 'Moderator permission required' using errcode = '42501';
  end if;
  return actor;
end $$;

-- 2. Direct-mode Storage upload registration: verifies the object exists in storage.objects (when Storage is installed)
--    so a browser JWT cannot claim ownership of an unuploaded SHA-256 hash.
create or replace function public.community_direct_register_upload(
  p_id text,
  p_bytes bigint,
  p_width integer,
  p_height integer
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := community.require_user();
  object_name text;
  storage_path text;
begin
  if p_id is null or p_id !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid normalized media hash';
  end if;
  if p_bytes is null or p_bytes not between 1 and 10485760 then
    raise exception 'Each image must be between 1 byte and 10 MB';
  end if;
  if p_width is null or p_height is null
     or p_width not between 1 and 10000
     or p_height not between 1 and 10000
     or (p_width::bigint * p_height::bigint) > 40000000 then
    raise exception 'Image dimensions exceed limits';
  end if;
  if (
    select count(*) from community.uploads
    where user_id = actor and created_at > now() - interval '1 day'
  ) >= 30 then
    raise exception 'Upload quota reached' using errcode = '54000';
  end if;

  object_name := actor::text || '/' || p_id || '.webp';
  storage_path := 'storage:community-media-private/' || object_name;

  if to_regclass('storage.objects') is not null then
    if not exists (
      select 1 from storage.objects o
      where o.bucket_id = 'community-media-private'
        and o.name = object_name
    ) then
      raise exception 'Uploaded object not found in private storage bucket' using errcode = 'P0002';
    end if;
  end if;

  insert into community.uploads (id, user_id, path, bytes, width, height)
  values (p_id, actor, storage_path, p_bytes, p_width, p_height)
  on conflict (id) do nothing;

  if not exists (
    select 1 from community.uploads
    where id = p_id and user_id = actor
  ) then
    raise exception 'Image already belongs to another account' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'id', p_id,
    'objectName', object_name,
    'bytes', p_bytes,
    'width', p_width,
    'height', p_height
  );
end $$;

-- 3. Moderator helpers for browser-driven moderation & 1-click catalog game index sync on GitHub Pages.
create or replace function public.community_direct_upload_owner(p_id text) returns text
language plpgsql stable security definer set search_path = '' as $$
begin
  perform community.require_moderator();
  return (select user_id::text from community.uploads where id = p_id);
end $$;

create or replace function public.community_direct_sync_games(p_games jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  perform community.require_moderator();
  perform public.community_sync_games(p_games);
  return jsonb_build_object('synced', jsonb_array_length(p_games));
end $$;

-- 4. Grant browser-callable RPC execution to authenticated users (protected by require_user() + advisory-lock quotas).
revoke all on function
  public.community_direct_is_moderator(),
  public.community_direct_register_upload(text, bigint, integer, integer),
  public.community_direct_upload_owner(text),
  public.community_direct_sync_games(jsonb)
from public, anon, authenticated;

grant execute on function public.community_direct_is_moderator() to anon, authenticated;

grant execute on function
  public.community_profile(text),
  public.community_rate(text, integer),
  public.community_comment(text, text),
  public.community_delete_comment(uuid),
  public.community_report(uuid, text),
  public.community_direct_register_upload(text, bigint, integer, integer),
  public.community_submit(jsonb, uuid),
  public.community_my_submissions(),
  public.community_withdraw(uuid),
  public.community_direct_upload_owner(text),
  public.community_direct_sync_games(jsonb)
to authenticated;

-- 5. Configure Supabase Storage buckets and RLS policies when running inside Supabase.
do $$
begin
  if to_regclass('storage.buckets') is not null then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values
      (
        'community-media-private',
        'community-media-private',
        false,
        10485760,
        array['image/webp', 'image/png', 'image/jpeg']
      ),
      (
        'community-media-public',
        'community-media-public',
        true,
        10485760,
        array['image/webp']
      )
    on conflict (id) do update set
      public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

    drop policy if exists "Community users upload own private screenshots" on storage.objects;
    create policy "Community users upload own private screenshots"
    on storage.objects for insert to authenticated
    with check (
      bucket_id = 'community-media-private'
      and split_part(name, '/', 1) = auth.uid()::text
      and name ~ '^[0-9a-f-]{36}/[a-f0-9]{64}\.webp$'
    );

    drop policy if exists "Owners and moderators read private screenshots" on storage.objects;
    create policy "Owners and moderators read private screenshots"
    on storage.objects for select to authenticated
    using (
      bucket_id = 'community-media-private'
      and (
        split_part(name, '/', 1) = auth.uid()::text
        or public.community_direct_is_moderator()
      )
    );

    drop policy if exists "Public reads approved community screenshots" on storage.objects;
    create policy "Public reads approved community screenshots"
    on storage.objects for select to anon, authenticated
    using (bucket_id = 'community-media-public');

    drop policy if exists "Moderators publish approved community screenshots" on storage.objects;
    create policy "Moderators publish approved community screenshots"
    on storage.objects for insert to authenticated
    with check (
      bucket_id = 'community-media-public'
      and public.community_direct_is_moderator()
      and name ~ '^[a-f0-9]{64}\.webp$'
    );

    drop policy if exists "Moderators update approved community screenshots" on storage.objects;
    create policy "Moderators update approved community screenshots"
    on storage.objects for update to authenticated
    using (
      bucket_id = 'community-media-public'
      and public.community_direct_is_moderator()
    )
    with check (
      bucket_id = 'community-media-public'
      and public.community_direct_is_moderator()
    );

    drop policy if exists "Moderators delete unpublished community screenshots" on storage.objects;
    create policy "Moderators delete unpublished community screenshots"
    on storage.objects for delete to authenticated
    using (
      bucket_id = 'community-media-public'
      and public.community_direct_is_moderator()
    );
  end if;
end $$;

commit;
