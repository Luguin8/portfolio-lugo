-- Monthly recurring payments tracker, admin-only via RLS (same pattern as
-- private_notes/board_scratch/page_visits — no public policies, service
-- role only).

create table if not exists monthly_payments (
    id bigint generated always as identity primary key,
    name text not null,
    payee text not null default '',
    amount_ars numeric(12, 2) not null default 0,
    due_day int, -- day of month (1-31), nullable if irregular
    notes text not null default '',
    created_at timestamptz not null default now()
);

alter table monthly_payments enable row level security;

create index if not exists monthly_payments_due_day_idx on monthly_payments (due_day);

-- Seed the known recurring payments. Amounts/dates for variable utility
-- bills (luz, agua, internet) are left at 0 / no due day — only the owner
-- knows those, edit via the gear icon in /admin. Fortnite Crew seeded with
-- a researched estimate (Xbox Store base price + Argentina's import tax on
-- foreign-currency purchases) — verify and adjust via the edit UI too.
insert into monthly_payments (name, payee, amount_ars, due_day, notes)
select * from (values
    ('Luz', 'Compañía eléctrica', 0::numeric, null::int, ''),
    ('Agua', 'Compañía de agua', 0::numeric, null::int, ''),
    ('Internet', 'Proveedor de internet', 0::numeric, null::int, ''),
    ('YouTube Premium', 'Google', 0::numeric, null::int, ''),
    ('Spotify', 'Spotify', 0::numeric, null::int, ''),
    ('Claude Code', 'Anthropic', 0::numeric, null::int, ''),
    ('PS Plus', 'Sony', 0::numeric, null::int, ''),
    ('Fortnite Crew', 'Xbox Cloud', 1160::numeric, null::int, 'Estimado: precio base + impuestos. Verificar monto real.')
) as seed(name, payee, amount_ars, due_day, notes)
where not exists (select 1 from monthly_payments);
