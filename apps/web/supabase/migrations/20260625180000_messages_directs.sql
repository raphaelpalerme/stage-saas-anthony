/*
 * Pickify — Messages privés (DM) entre deux joueurs.
 * --------------------------------------------------
 * Tu peux chercher N'IMPORTE quel joueur et lui parler en privé (façon Insta).
 * 1 ligne = 1 message envoyé d'un joueur à un autre.
 *
 * RLS (cas PRIVÉ à 2) :
 *   - LECTURE : seulement si je suis l'expéditeur OU le destinataire.
 *   - ÉCRITURE : j'écris en MON nom (expediteur_id = moi).
 */

create table if not exists public.messages_directs (
  id uuid unique not null default extensions.uuid_generate_v4 (),
  expediteur_id uuid references public.accounts (id) on delete cascade not null,
  destinataire_id uuid references public.accounts (id) on delete cascade not null,
  contenu text not null,
  created_at timestamp with time zone default now(),
  primary key (id)
);

alter table public.messages_directs enable row level security;

revoke all on public.messages_directs from authenticated, service_role;
grant select, insert, delete on table public.messages_directs to authenticated;

-- LECTURE : seulement les messages où je suis impliqué (expéditeur ou destinataire)
create policy "md_read_mine" on public.messages_directs for select
  to authenticated using (
    expediteur_id = (select auth.uid())
    or destinataire_id = (select auth.uid())
  );

-- INSERT : j'écris en mon nom
create policy "md_insert_own" on public.messages_directs for insert
  to authenticated with check (expediteur_id = (select auth.uid()));

-- DELETE : je ne supprime que mes propres messages
create policy "md_delete_own" on public.messages_directs for delete
  to authenticated using (expediteur_id = (select auth.uid()));

-- Index sur les clés étrangères (pour charger vite une conversation)
create index if not exists md_expediteur_idx on public.messages_directs (expediteur_id);
create index if not exists md_destinataire_idx on public.messages_directs (destinataire_id);

-- Temps réel : pousser les nouveaux DM aux clients abonnés
alter publication supabase_realtime add table public.messages_directs;
