-- Extends private_notes to support two kinds of board items sharing one
-- table: 'note' (calendar-linked, uses note_date) and 'postit' (freeform
-- sticky on the corkboard, uses color). Both remain admin-only via RLS.

alter table private_notes add column if not exists kind text not null default 'note';
alter table private_notes add column if not exists color text;

create index if not exists private_notes_kind_idx on private_notes (kind);

-- Single freeform whiteboard scratchpad — one persistent row, no lines/
-- structure, just raw text. Future mobile app sync target too.
create table if not exists board_scratch (
    id int primary key default 1,
    content text not null default '',
    updated_at timestamptz not null default now(),
    constraint board_scratch_singleton check (id = 1)
);

alter table board_scratch enable row level security;

insert into board_scratch (id, content)
values (1, '')
on conflict (id) do nothing;
