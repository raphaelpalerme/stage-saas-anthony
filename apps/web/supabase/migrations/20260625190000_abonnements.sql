/*
 * Pickify — Abonnements (style Insta) : qui suit qui.
 * 1 ligne = "follower_id s'est abonné à suivi_id".
 *   - Abonnés d'un joueur = lignes où suivi_id = lui.
 *   - Abonnements d'un joueur = lignes où follower_id = lui.
 *
 * RLS (cas PARTAGÉ) :
 *   - LECTURE : tout connecté voit les abonnements (pour compter).
 *   - ÉCRITURE : je ne crée/supprime QUE mes propres abonnements.
 */

create table if not exists public.abonnements (
  follower_id uuid references public.accounts (id) on delete cascade not null,
  suivi_id uuid references public.accounts (id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  primary key (follower_id, suivi_id),
  -- on ne peut pas s'abonner à soi-même
  constraint pas_soi_meme check (follower_id <> suivi_id)
);

alter table public.abonnements enable row level security;

revoke all on public.abonnements from authenticated, service_role;
grant select, insert, delete on table public.abonnements to authenticated;

-- LECTURE : tout connecté voit les abonnements (pour compter)
create policy "abonnements_read_all" on public.abonnements for select
  to authenticated using (true);

-- INSERT : je ne crée qu'un abonnement où JE suis le follower
create policy "abonnements_insert_own" on public.abonnements for insert
  to authenticated with check (follower_id = (select auth.uid()));

-- DELETE : je ne retire que MES abonnements
create policy "abonnements_delete_own" on public.abonnements for delete
  to authenticated using (follower_id = (select auth.uid()));

create index if not exists abonnements_follower_idx on public.abonnements (follower_id);
create index if not exists abonnements_suivi_idx on public.abonnements (suivi_id);
