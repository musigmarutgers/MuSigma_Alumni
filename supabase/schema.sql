create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  amount_cents integer not null default 0,
  donor_display_name text,
  is_monthly boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_processed_events (
  event_id text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_refunds (
  refund_id text primary key,
  amount_cents integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.donation_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create or replace view public.donation_summary as
select
  coalesce(sum(amount_cents), 0)::integer as total_raised_cents,
  coalesce(count(*) filter (where is_monthly), 0)::integer as monthly_donor_count,
  max(created_at) as last_updated
from public.donations;

alter table public.donations enable row level security;
alter table public.stripe_processed_events enable row level security;
alter table public.stripe_refunds enable row level security;
alter table public.donation_settings enable row level security;

grant usage on schema public to service_role;
grant select, insert on public.donations to service_role;
grant select, insert on public.stripe_processed_events to service_role;
grant select, insert on public.stripe_refunds to service_role;
grant select on public.donation_settings to service_role;
grant select on public.donation_summary to service_role;
