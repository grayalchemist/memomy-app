-- Repair older deployments where pregnancy_profiles.user_id referenced
-- public.users instead of Supabase Auth's canonical auth.users table.
alter table public.pregnancy_profiles
  drop constraint if exists pregnancy_profiles_user_id_fkey;

alter table public.pregnancy_profiles
  add constraint pregnancy_profiles_user_id_fkey
  foreign key (user_id)
  references auth.users(id)
  on delete cascade
  not valid;

-- ponytail: validates only new rows immediately; validate after reviewing any
-- legacy orphaned profiles from the previous public.users relationship.
