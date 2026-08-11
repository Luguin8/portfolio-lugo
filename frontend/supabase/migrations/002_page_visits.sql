-- Lightweight visit counter: total count + country breakdown only.
-- No IP addresses, no precise geolocation, no device GPS — country comes
-- from Vercel's edge routing header (x-vercel-ip-country), the same kind
-- of coarse geolocation any standard web analytics tool uses.
-- RLS enabled with no public policies: only server code using the
-- service-role key (lib/actions.ts) can read or write this table.

create table if not exists page_visits (
    id bigint generated always as identity primary key,
    country text,
    created_at timestamptz not null default now()
);

alter table page_visits enable row level security;

create index if not exists page_visits_created_at_idx on page_visits (created_at desc);
create index if not exists page_visits_country_idx on page_visits (country);
