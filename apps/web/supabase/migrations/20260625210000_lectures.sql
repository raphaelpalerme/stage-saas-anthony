/*
 * Pickify — Accusés de lecture des messages privés.
 * 1 ligne = "lecteur_id a lu la conversation avec autre_id jusqu'à lu_le".
 * Sert à 2 choses :
 *   - savoir QUELLES conversations ont des messages non lus (point rouge) ;
 *   - afficher "Vu" quand l'autre a lu mes messages.
 *
 * RLS (cas PARTAGÉ — il FAUT pouvoir lire la ligne de l'autre pour le "Vu") :
 *   - LECTURE : tout connecté (pour voir si l'autre a lu).
 *   - ÉCRITURE : je ne marque QUE mes propres lectures (lecteur_id = moi).
 */

create table if not exists public.lectures (
  lecteur_id uuid references public.accounts (id) on delete cascade not null,
  autre_id uuid references public.accounts (id) on delete cascade not null,
  lu_le timestamp with time zone not null default now(),
  primary key (lecteur_id, autre_id)
);

alter table public.lectures enable row level security;

revoke all on public.lectures from authenticated, service_role;
grant select, insert, update, delete on table public.lectures to authenticated;

create policy "lectures_read_all" on public.lectures for select
  to authenticated using (true);

create policy "lectures_insert_own" on public.lectures for insert
  to authenticated with check (lecteur_id = (select auth.uid()));

create policy "lectures_update_own" on public.lectures for update
  to authenticated using (lecteur_id = (select auth.uid()))
  with check (lecteur_id = (select auth.uid()));

create policy "lectures_delete_own" on public.lectures for delete
  to authenticated using (lecteur_id = (select auth.uid()));

create index if not exists lectures_lecteur_idx on public.lectures (lecteur_id);
