-- ============================================================
-- delete_user RPC
-- Called from the client to self-delete the authenticated user.
-- Supabase's auth.uid() check ensures only the user themselves can call it.
-- Run this in Supabase SQL Editor after 0001_initial_schema.sql
-- ============================================================

create or replace function public.delete_user()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Only allow the authenticated user to delete themselves
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  delete from auth.users where id = auth.uid();
end;
$$;

-- Grant execute to authenticated users only
revoke execute on function public.delete_user() from public;
grant execute on function public.delete_user() to authenticated;
