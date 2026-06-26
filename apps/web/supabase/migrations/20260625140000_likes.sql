/*
 * Pickify — Likes sur les Highlights (le ❤️ du réseau social).
 * -----------------------------------------------------------
 * Une table `likes` : 1 ligne = "tel joueur a liké tel highlight".
 * La clé primaire (highlight_id, account_id) empêche de liker 2 fois.
 *
 * RLS (cas PARTAGÉ) :
 *   - LECTURE : tout connecté voit tous les likes (pour compter "❤️ 12").
 *   - ÉCRITURE : je ne peux liker / retirer mon like QUE pour moi.
 */

create table if not exists public.likes (
  highlight_id uuid references public.highlights (id) on delete cascade not null,
  account_id uuid references public.accounts (id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  -- un même joueur ne like un highlight qu'une fois
  primary key (highlight_id, account_id)
);

alter table public.likes enable row level security;

revoke all on public.likes from authenticated, service_role;
grant select, insert, delete on table public.likes to authenticated;

-- LECTURE : tout connecté voit tous les likes (pour compter)
create policy "likes_read_all" on public.likes for select
  to authenticated using (true);

-- INSERT : je ne like qu'en mon nom
create policy "likes_insert_own" on public.likes for insert
  to authenticated with check (account_id = (select auth.uid()));

-- DELETE : je ne retire que mon propre like
create policy "likes_delete_own" on public.likes for delete
  to authenticated using (account_id = (select auth.uid()));

-- Index pour compter vite les likes d'un highlight
create index if not exists likes_highlight_id_idx on public.likes (highlight_id);
