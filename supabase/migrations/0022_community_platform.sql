-- Public community data never grants catalog/Studio membership.
begin;
create schema community;
create role community_backend nologin noinherit;
create role community_user nologin noinherit;
create role community_anon nologin noinherit;
grant usage on schema community to community_backend;

create table community.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check(length(trim(display_name)) between 1 and 40),
  created_at timestamptz not null default now()
);
create table community.games (
  key text primary key check(length(key) between 1 and 240),
  origin text not null check(origin in ('catalog','submission')),
  public boolean not null default true,
  payload jsonb not null check(jsonb_typeof(payload)='object'),
  updated_at timestamptz not null default now()
);
create table community.ratings (
  game_key text not null references community.games(key),
  user_id uuid not null references community.profiles(user_id),
  score smallint not null check(score between 1 and 5),
  updated_at timestamptz not null default now(),
  primary key(game_key,user_id)
);
create table community.comments (
  id uuid primary key default gen_random_uuid(),
  game_key text not null references community.games(key),
  user_id uuid not null references community.profiles(user_id),
  body text not null check(length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  hidden_at timestamptz
);
create index community_comments_game_time on community.comments(game_key,created_at desc,id desc);
create table community.reports (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references community.comments(id),
  user_id uuid not null references community.profiles(user_id),
  reason text not null check(length(trim(reason)) between 5 and 1000),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  unique(comment_id,user_id)
);
create table community.uploads (
  id text primary key check(id ~ '^[a-f0-9]{64}$'),
  user_id uuid not null references community.profiles(user_id),
  path text not null,
  bytes bigint not null check(bytes between 1 and 20000000),
  width integer not null check(width between 1 and 12000),
  height integer not null check(height between 1 and 12000),
  created_at timestamptz not null default now(),
  unique(id,user_id)
);
create table community.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references community.profiles(user_id),
  created_at timestamptz not null default now(),
  head_revision integer not null default 1
);
create table community.submission_revisions (
  submission_id uuid not null references community.submissions(id),
  revision integer not null check(revision>0),
  payload jsonb not null check(jsonb_typeof(payload)='object'),
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  review_note text,
  primary key(submission_id,revision)
);
create table community.audit (
  id bigint generated always as identity primary key,
  actor uuid references auth.users(id), action text not null, entity text not null,
  detail jsonb not null default '{}', created_at timestamptz not null default now()
);
create table community.sessions (
  id_hash text primary key check(id_hash ~ '^[a-f0-9]{64}$'),
  user_id uuid not null references auth.users(id) on delete cascade,
  encrypted_payload text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create table community.auth_flows (
  id_hash text primary key check(id_hash ~ '^[a-f0-9]{64}$'),
  encrypted_payload text not null,
  expires_at timestamptz not null
);
-- Direct browser table access is denied, including to authenticated nonmembers.
-- The scoped server only has session storage; all content operations use bounded RPCs.
do $$ declare t text; begin
  foreach t in array array['profiles','games','ratings','comments','reports','uploads','submissions','submission_revisions','audit','sessions','auth_flows'] loop
    execute format('alter table community.%I enable row level security',t);
    execute format('revoke all on community.%I from public,anon,authenticated',t);
  end loop;
end $$;
grant select,insert,update,delete on community.sessions,community.auth_flows to community_backend;
create policy backend_sessions on community.sessions to community_backend using(true) with check(true);
create policy backend_auth_flows on community.auth_flows to community_backend using(true) with check(true);

create function community.require_user() returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid := auth.uid();
begin
  if actor is null or not exists(select 1 from auth.users u where u.id=actor and
    coalesce(to_jsonb(u)->>'email_confirmed_at',to_jsonb(u)->>'confirmed_at') is not null) then
    raise exception 'A verified email account is required' using errcode='42501';
  end if;
  return actor;
end $$;
create function community.require_moderator() returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid := auth.uid();
begin
  if actor is null or not exists(select 1 from catalog.memberships where user_id=actor and role in ('reviewer','admin')) then
    raise exception 'Moderator permission required' using errcode='42501';
  end if;
  return actor;
end $$;
create function community.live_game(p_key text) returns void
language plpgsql security definer set search_path='' as $$
begin
  if not exists(select 1 from community.games where key=p_key and public) then
    raise exception 'Game is not publicly available' using errcode='P0002';
  end if;
end $$;

create function public.community_profile(p_name text default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user(); profile community.profiles;
begin
  if p_name is not null and (length(trim(p_name)) not between 1 and 40 or p_name ~ '[[:cntrl:]]') then
    raise exception 'Invalid display name';
  end if;
  insert into community.profiles(user_id,display_name) values(actor,coalesce(nullif(trim(p_name),''),'Player'))
    on conflict(user_id) do nothing;
  if p_name is not null then update community.profiles set display_name=trim(p_name) where user_id=actor; end if;
  select * into profile from community.profiles where user_id=actor;
  return jsonb_build_object('id',actor,'displayName',profile.display_name);
end $$;

create function public.community_identity() returns jsonb
language sql stable security definer set search_path='' as $$ select catalog.current_release_realm() $$;

-- Trusted server syncs only game identities from its verified published snapshot.
create function public.community_sync_games(p_games jsonb) returns void
language plpgsql security definer set search_path='' as $$
begin
  if jsonb_typeof(p_games)<>'array' or jsonb_array_length(p_games)>5000 then raise exception 'Invalid game index'; end if;
  if exists(select 1 from jsonb_array_elements(p_games) g where
    coalesce(g->>'key','') !~ '^(example|foundation|repository-research|threejs-game):[^[:space:]]+$' or jsonb_typeof(g->'payload')<>'object') then
    raise exception 'Invalid catalog game identity';
  end if;
  update community.games set public=false where origin='catalog' and not exists(select 1 from jsonb_array_elements(p_games) g where g->>'key'=key);
  insert into community.games(key,origin,public,payload)
    select g->>'key','catalog',true,g->'payload' from jsonb_array_elements(p_games) g
    on conflict(key) do update set public=true,payload=excluded.payload,updated_at=now() where community.games.origin='catalog';
end $$;

create function public.community_game_stats(p_keys text[]) returns jsonb
language plpgsql stable security definer set search_path='' as $$
begin
  if coalesce(cardinality(p_keys),0)>1000 then raise exception 'Too many games'; end if;
  return coalesce((select jsonb_object_agg(g.key,jsonb_build_object(
    'average',coalesce((select round(avg(r.score),2) from community.ratings r where r.game_key=g.key),0),
    'count',(select count(*) from community.ratings r where r.game_key=g.key),
    'comments',(select count(*) from community.comments c where c.game_key=g.key and c.deleted_at is null and c.hidden_at is null),
    'mine',(select r.score from community.ratings r where r.game_key=g.key and r.user_id=auth.uid())))
    from community.games g where g.public and g.key=any(p_keys)),'{}');
end $$;
create function public.community_game(p_key text,p_before timestamptz default null) returns jsonb
language plpgsql stable security definer set search_path='' as $$
begin
  perform community.live_game(p_key);
  return jsonb_build_object('game',(select payload || jsonb_build_object('key',key,'origin',origin) from community.games where key=p_key),
    'stats',(public.community_game_stats(array[p_key]))->p_key,
    'comments',coalesce((select jsonb_agg(x.item order by x.created_at desc,x.id desc) from(
      select c.id,c.created_at,jsonb_build_object('id',c.id,'body',c.body,'createdAt',c.created_at,
        'author',p.display_name,'mine',c.user_id=auth.uid()) item
      from community.comments c join community.profiles p on p.user_id=c.user_id
      where c.game_key=p_key and c.deleted_at is null and c.hidden_at is null and (p_before is null or c.created_at<p_before)
      order by c.created_at desc,c.id desc limit 30) x),'[]'));
end $$;
create function public.community_rate(p_key text,p_score integer) returns jsonb
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user();
begin
  perform community.live_game(p_key);
  if p_score not between 1 and 5 then raise exception 'Score must be 1 through 5'; end if;
  perform pg_advisory_xact_lock(hashtextextended(actor::text,1));
  if (select count(*) from community.ratings where user_id=actor and updated_at>now()-interval '1 minute')>=30 then
    raise exception 'Please slow down' using errcode='54000';
  end if;
  insert into community.ratings(game_key,user_id,score) values(p_key,actor,p_score)
    on conflict(game_key,user_id) do update set score=excluded.score,updated_at=now();
  return (public.community_game_stats(array[p_key]))->p_key;
end $$;
create function public.community_comment(p_key text,p_body text) returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user(); result uuid;
begin
  perform community.live_game(p_key);
  if p_body is null or length(trim(p_body)) not between 1 and 2000 then raise exception 'Invalid comment'; end if;
  perform pg_advisory_xact_lock(hashtextextended(actor::text,2));
  if exists(select 1 from community.comments where user_id=actor and created_at>now()-interval '10 seconds') or
    (select count(*) from community.comments where user_id=actor and created_at>now()-interval '1 day')>=100 then
    raise exception 'Please slow down' using errcode='54000';
  end if;
  insert into community.comments(game_key,user_id,body) values(p_key,actor,trim(p_body)) returning id into result;
  return result;
end $$;
create function public.community_delete_comment(p_id uuid) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user();
begin
  update community.comments set deleted_at=coalesce(deleted_at,now()) where id=p_id and user_id=actor;
  if not found then raise exception 'Comment does not belong to this account' using errcode='42501'; end if;
end $$;
create function public.community_report(p_id uuid,p_reason text) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user();
begin
  if p_reason is null or length(trim(p_reason)) not between 5 and 1000 then raise exception 'Provide a report reason'; end if;
  if not exists(select 1 from community.comments c join community.games g on g.key=c.game_key where c.id=p_id and g.public and c.user_id<>actor and c.deleted_at is null and c.hidden_at is null) then
    raise exception 'Comment cannot be reported' using errcode='P0002';
  end if;
  if (select count(*) from community.reports where user_id=actor and created_at>now()-interval '1 day')>=30 then raise exception 'Please slow down' using errcode='54000'; end if;
  insert into community.reports(comment_id,user_id,reason) values(p_id,actor,trim(p_reason))
    on conflict(comment_id,user_id) do update set reason=excluded.reason;
end $$;
create function public.community_register_upload(p_id text,p_path text,p_bytes bigint,p_width integer,p_height integer) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user();
begin
  if p_id !~ '^[a-f0-9]{64}$' or p_path<>('website/public/media/catalog/'||p_id||'.webp') then raise exception 'Invalid normalized media'; end if;
  if (select count(*) from community.uploads where user_id=actor and created_at>now()-interval '1 day')>=30 then raise exception 'Upload quota reached' using errcode='54000'; end if;
  insert into community.uploads(id,user_id,path,bytes,width,height) values(p_id,actor,p_path,p_bytes,p_width,p_height)
    on conflict(id) do nothing;
  if not exists(select 1 from community.uploads where id=p_id and user_id=actor) then raise exception 'Image already belongs to another account' using errcode='42501'; end if;
end $$;
create function public.community_media(p_id text) returns jsonb
language plpgsql stable security definer set search_path='' as $$
begin
  return(select jsonb_build_object('path',u.path,'bytes',u.bytes) from community.uploads u where u.id=p_id and (
    u.user_id=auth.uid() or exists(select 1 from community.games g where g.origin='submission' and g.public and g.payload->'screenshots' ? u.id)));
end $$;
create function public.community_submit(p_payload jsonb,p_id uuid default null) returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user(); result uuid; version integer;
begin
  if jsonb_typeof(p_payload)<>'object' or coalesce(length(trim(p_payload->>'title')),0) not between 1 and 120 or
    coalesce(length(trim(p_payload->>'description')),0) not between 10 and 4000 or
    coalesce(p_payload->>'track','') not in ('2d','3d') or coalesce(length(p_payload->>'engine'),0) not between 1 and 80 or
    coalesce(p_payload->>'accessKind','') not in ('playable','download') or coalesce(p_payload->>'url','') !~ '^https://' or
    coalesce(p_payload->>'rightsConfirmed','false')<>'true' or jsonb_typeof(p_payload->'screenshots') is distinct from 'array' or
    jsonb_array_length(p_payload->'screenshots') not between 1 and 5 then raise exception 'Invalid submission'; end if;
  if exists(select 1 from jsonb_array_elements_text(p_payload->'screenshots') image where not exists(select 1 from community.uploads where id=image and user_id=actor)) then
    raise exception 'Screenshots must belong to the submitting account' using errcode='42501';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(actor::text,3));
  if (select count(*) from community.submission_revisions r join community.submissions s on s.id=r.submission_id where s.user_id=actor and r.created_at>now()-interval '1 day')>=10 then raise exception 'Submission quota reached' using errcode='54000'; end if;
  if p_id is null then
    insert into community.submissions(user_id) values(actor) returning id,head_revision into result,version;
  else
    select id,head_revision+1 into result,version from community.submissions where id=p_id and user_id=actor for update;
    if not found then raise exception 'Submission does not belong to this account' using errcode='42501'; end if;
    update community.submissions set head_revision=version where id=result;
  end if;
  insert into community.submission_revisions(submission_id,revision,payload) values(result,version,p_payload);
  insert into community.audit(actor,action,entity) values(actor,'submit',result::text);
  return result;
end $$;
create function public.community_my_submissions() returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare actor uuid := community.require_user();
begin
  return coalesce((select jsonb_agg(jsonb_build_object('id',s.id,'revision',r.revision,'payload',r.payload,'status',r.status,'note',r.review_note,'createdAt',r.created_at) order by r.created_at desc)
    from community.submissions s join community.submission_revisions r on r.submission_id=s.id and r.revision=s.head_revision where s.user_id=actor),'[]');
end $$;
create function public.community_works(p_offset integer default 0) returns jsonb
language plpgsql stable security definer set search_path='' as $$
begin
  if p_offset not between 0 and 100000 then raise exception 'Invalid page'; end if;
  return jsonb_build_object('count',(select count(*) from community.games where origin='submission' and public),
    'items',coalesce((select jsonb_agg(x.payload order by x.updated_at desc) from(select payload || jsonb_build_object('key',key) payload,updated_at from community.games where origin='submission' and public order by updated_at desc,key limit 100 offset p_offset)x),'[]'));
end $$;
create function public.community_moderation() returns jsonb
language plpgsql stable security definer set search_path='' as $$
begin
  perform community.require_moderator();
  return jsonb_build_object('submissions',coalesce((select jsonb_agg(x.item order by x.created_at) from(
    select r.created_at,jsonb_build_object('id',s.id,'revision',r.revision,'payload',r.payload,'author',p.display_name,'createdAt',r.created_at) item
    from community.submissions s join community.submission_revisions r on r.submission_id=s.id and r.revision=s.head_revision join community.profiles p on p.user_id=s.user_id
    where r.status='pending' order by r.created_at limit 100)x),'[]'),
    'reports',coalesce((select jsonb_agg(x.item order by x.created_at) from(
      select r.created_at,jsonb_build_object('id',r.id,'commentId',c.id,'body',c.body,'reason',r.reason,'gameKey',c.game_key,'createdAt',r.created_at) item
      from community.reports r join community.comments c on c.id=r.comment_id where r.resolved_at is null order by r.created_at limit 100)x),'[]'));
end $$;
create function public.community_review(p_id uuid,p_revision integer,p_approve boolean,p_note text) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_moderator(); item community.submission_revisions; author uuid; name text;
begin
  if p_note is null or length(trim(p_note)) not between 1 and 2000 or p_approve is null then raise exception 'A review note and decision are required'; end if;
  select user_id into author from community.submissions where id=p_id and head_revision=p_revision for update;
  if not found then raise exception 'Submission changed; refresh the queue' using errcode='40001'; end if;
  if author=actor then raise exception 'Authors cannot approve their own submissions' using errcode='42501'; end if;
  select * into item from community.submission_revisions where submission_id=p_id and revision=p_revision for update;
  if item.status<>'pending' then raise exception 'Submission is not awaiting review' using errcode='40001'; end if;
  update community.submission_revisions set status=case when p_approve then 'approved' else 'rejected' end,reviewed_at=now(),reviewed_by=actor,review_note=trim(p_note) where submission_id=p_id and revision=p_revision;
  if p_approve then
    select display_name into name from community.profiles where user_id=author;
    insert into community.games(key,origin,public,payload) values('submission:'||p_id,'submission',true,item.payload || jsonb_build_object('id',p_id,'author',name,'revision',p_revision,'preview',(select jsonb_build_object('width',width,'height',height) from community.uploads where id=item.payload->'screenshots'->>0 and user_id=author)))
      on conflict(key) do update set payload=excluded.payload,public=true,updated_at=now();
  end if;
  insert into community.audit(actor,action,entity,detail) values(actor,case when p_approve then 'approve-submission' else 'reject-submission' end,p_id::text,jsonb_build_object('revision',p_revision,'note',trim(p_note)));
end $$;
create function public.community_moderator_media(p_id text) returns jsonb
language plpgsql stable security definer set search_path='' as $$
begin
  perform community.require_moderator();
  return(select jsonb_build_object('path',path) from community.uploads where id=p_id);
end $$;
create function public.community_resolve_report(p_id uuid,p_hide boolean,p_note text) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_moderator(); target uuid;
begin
  if p_note is null or length(trim(p_note)) not between 1 and 2000 then raise exception 'A moderation note is required'; end if;
  select comment_id into target from community.reports where id=p_id and resolved_at is null for update;
  if not found then raise exception 'Report was already handled' using errcode='40001'; end if;
  if p_hide then update community.comments set hidden_at=now() where id=target; end if;
  update community.reports set resolved_at=now() where comment_id=target;
  insert into community.audit(actor,action,entity,detail) values(actor,'resolve-report',target::text,jsonb_build_object('hidden',p_hide,'note',trim(p_note)));
end $$;

revoke all on all functions in schema community from public,anon,authenticated;
do $$ declare f record; begin
  for f in select oid::regprocedure signature from pg_proc where pronamespace='public'::regnamespace and proname like 'community\_%' escape '\' loop
    execute format('revoke all on function %s from public,anon,authenticated',f.signature);
  end loop;
end $$;
grant execute on function public.community_sync_games(jsonb),public.community_identity() to community_backend;
grant execute on function public.community_game_stats(text[]),public.community_game(text,timestamptz),public.community_media(text),public.community_works(integer) to anon,authenticated,community_user,community_anon;
grant execute on function public.community_profile(text),public.community_rate(text,integer),public.community_comment(text,text),public.community_delete_comment(uuid),public.community_report(uuid,text),public.community_register_upload(text,text,bigint,integer,integer),public.community_submit(jsonb,uuid),public.community_my_submissions() to authenticated,community_user;
grant execute on function public.community_moderation(),public.community_moderator_media(text),public.community_review(uuid,integer,boolean,text),public.community_resolve_report(uuid,boolean,text) to authenticated;
commit;
