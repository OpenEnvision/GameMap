-- Public writes are accepted only through the verified same-origin BFF.
-- A user obtaining an Auth JWT directly must not bypass upload normalization,
-- HTTP quotas, CSRF/origin checks or claim ownership of an unuploaded asset hash.
begin;
revoke execute on function public.community_profile(text),public.community_rate(text,integer),public.community_comment(text,text),public.community_delete_comment(uuid),public.community_report(uuid,text),public.community_register_upload(text,text,bigint,integer,integer),public.community_submit(jsonb,uuid),public.community_my_submissions(),public.community_withdraw(uuid) from authenticated;
-- Studio retains only the moderator RPCs, guarded by its existing memberships.
commit;
