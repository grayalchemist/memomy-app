-- ============================================================
-- MeMomy Initial Schema
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- --------------------------------------------------------
-- 1. pregnancy_profiles
--    One row per user. Stores their journey stage + key date.
-- --------------------------------------------------------
create table if not exists public.pregnancy_profiles (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  stage         text not null check (stage in ('ttc', 'pregnant', 'postpartum')),
  due_date      timestamptz,          -- due date (pregnant) or birth date (postpartum)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint pregnancy_profiles_user_id_key unique (user_id)
);

alter table public.pregnancy_profiles enable row level security;

create policy "Users can manage their own profile"
  on public.pregnancy_profiles
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at current on every write
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger pregnancy_profiles_updated_at
  before update on public.pregnancy_profiles
  for each row execute function public.touch_updated_at();

-- --------------------------------------------------------
-- 2. mood_checkins
--    One row per check-in submission. GDPR Art. 9 data.
-- --------------------------------------------------------
create table if not exists public.mood_checkins (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  score               smallint not null check (score between 1 and 10),
  response_q1         text,
  response_q2         text,
  escalation_triggered boolean not null default false,
  escalation_action   text check (escalation_action in ('booked', 'crisis_viewed', 'dismissed')),
  checked_at          timestamptz not null default now()
);

alter table public.mood_checkins enable row level security;

create policy "Users can manage their own check-ins"
  on public.mood_checkins
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- --------------------------------------------------------
-- 3. warning_sign_interactions
--    Audit log: which symptom was tapped, what action taken.
-- --------------------------------------------------------
create table if not exists public.warning_sign_interactions (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  sign_key          text not null,
  escalation_chosen text not null check (escalation_chosen in ('emergency', 'booking', 'monitor')),
  interacted_at     timestamptz not null default now()
);

alter table public.warning_sign_interactions enable row level security;

create policy "Users can manage their own interactions"
  on public.warning_sign_interactions
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
