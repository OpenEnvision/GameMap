-- A published user work can be withdrawn without deleting its review/rating history.
begin;
create function public.community_withdraw(p_id uuid) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_user();
begin
  if not exists(select 1 from community.submissions where id=p_id and user_id=actor) then
    raise exception 'Submission does not belong to this account' using errcode='42501';
  end if;
  update community.games set public=false,updated_at=now() where key='submission:'||p_id and origin='submission';
  insert into community.audit(actor,action,entity) values(actor,'withdraw-submission',p_id::text);
end $$;
create function public.community_unpublish(p_id uuid,p_note text) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid := community.require_moderator();
begin
  if p_note is null or length(trim(p_note)) not between 1 and 2000 then raise exception 'A moderation note is required'; end if;
  update community.games set public=false,updated_at=now() where key='submission:'||p_id and origin='submission' and public;
  if not found then raise exception 'Work is not currently public' using errcode='40001'; end if;
  insert into community.audit(actor,action,entity,detail) values(actor,'unpublish-submission',p_id::text,jsonb_build_object('note',trim(p_note)));
end $$;
create function public.community_published_works() returns jsonb
language plpgsql stable security definer set search_path='' as $$
begin
  perform community.require_moderator();
  return coalesce((select jsonb_agg(x.item order by x.updated_at desc) from(
    select g.updated_at,jsonb_build_object('id',s.id,'title',g.payload->>'title','author',p.display_name) item
    from community.games g join community.submissions s on g.key='submission:'||s.id join community.profiles p on p.user_id=s.user_id
    where g.origin='submission' and g.public order by g.updated_at desc limit 100)x),'[]');
end $$;
create or replace function public.community_my_submissions() returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare actor uuid := community.require_user();
begin
  return coalesce((select jsonb_agg(jsonb_build_object('id',s.id,'revision',r.revision,'payload',r.payload,'status',r.status,'note',r.review_note,'createdAt',r.created_at,'published',exists(select 1 from community.games g where g.key='submission:'||s.id and g.public)) order by r.created_at desc)
    from community.submissions s join community.submission_revisions r on r.submission_id=s.id and r.revision=s.head_revision where s.user_id=actor),'[]');
end $$;
revoke all on function public.community_withdraw(uuid),public.community_unpublish(uuid,text),public.community_published_works() from public,anon,authenticated;
grant execute on function public.community_withdraw(uuid) to authenticated,community_user;
grant execute on function public.community_unpublish(uuid,text),public.community_published_works() to authenticated;
commit;
