-- Private notes/agenda for the site owner only.
-- Not exposed to the public app, only to /admin behind the real admin session
-- (never the demo cookie). RLS is enabled with no policies, so only requests
-- made with the Supabase service-role key (SUPABASE_SERVICE_ROLE_KEY, used
-- server-side in lib/actions.ts) can read or write this table — the anon key
-- gets nothing back.
--
-- Future: this table is the intended sync target for a private, personal
-- mobile app (not part of this repo) that will read/write these rows
-- directly via the Supabase client using the same project credentials.

create table if not exists private_notes (
    id bigint generated always as identity primary key,
    title text not null,
    content text not null default '',
    note_date date,
    created_at timestamptz not null default now()
);

alter table private_notes enable row level security;

create index if not exists private_notes_note_date_idx on private_notes (note_date);
create index if not exists private_notes_created_at_idx on private_notes (created_at desc);
