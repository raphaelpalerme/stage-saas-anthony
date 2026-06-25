/*
 * Pickify — Chat de partie : participants + messages
 * --------------------------------------------------
 * But : une fois qu'on a REJOINT une partie (une dispo), on peut discuter
 * avec les autres joueurs de cette partie ("on se retrouve où ? à quelle heure ?").
 *
 * Deux tables :
 *   - participants : qui a rejoint quelle dispo (rend le "Je suis chaud" RÉEL,
 *                    avant il ne vivait qu'en mémoire et disparaissait au refresh).
 *   - messages     : les messages du chat, chacun lié à une dispo.
 *
 * RLS (sécurité) — cas "cercle privé de la partie" :
 *   - Le chat d'une dispo n'est lisible/écrivable QUE par :
 *       • l'organisateur de la dispo (celui qui l'a postée), ET
 *       • les joueurs qui l'ont rejointe (présents dans `participants`).
 *   - Tu ne peux écrire que TES propres messages (account_id = auth.uid()).
 *   C'est l'inverse du "lire tout" des profils/dispos : ici c'est PRIVÉ à la partie.
 */

-- =========================================================
-- TABLE participants  (qui a rejoint quelle dispo)
-- =========================================================
create table if not exists public.participants (
  id uuid unique not null default extensions.uuid_generate_v4 (),
  -- la partie rejointe
  dispo_id uuid references public.disponibilites (id) on delete cascade not null,
  -- le joueur qui rejoint
  account_id uuid references public.accounts (id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  primary key (id),
  -- on ne peut rejoindre une même partie qu'UNE fois
  unique (dispo_id, account_id)
);

alter table public.participants enable row level security;

revoke all on public.participants from authenticated, service_role;
grant select, insert, delete on table public.participants to authenticated;

-- LECTURE : tout connecté voit qui participe (utile pour "3 joueurs dans le run").
create policy "participants_read_all" on public.participants for select
  to authenticated using (true);

-- INSERT : je ne peux m'inscrire QUE moi-même à une partie.
create policy "participants_insert_own" on public.participants for insert
  to authenticated with check (account_id = (select auth.uid()));

-- DELETE : je ne peux retirer QUE ma propre participation (= quitter la partie).
create policy "participants_delete_own" on public.participants for delete
  to authenticated using (account_id = (select auth.uid()));

-- Index sur les clés étrangères (accélère les recherches "qui est dans cette partie ?").
create index if not exists participants_dispo_id_idx on public.participants (dispo_id);
create index if not exists participants_account_id_idx on public.participants (account_id);


-- =========================================================
-- Fonction d'aide : suis-je "dans la partie" d'une dispo ?
-- (organisateur OU participant). Sert aux policies de `messages`.
-- =========================================================
create or replace function public.est_dans_la_partie (dispo uuid)
  returns boolean
  language sql
  stable
  security invoker
  set search_path = ''
as $$
  select
    -- je suis l'organisateur de la dispo
    exists (
      select 1 from public.disponibilites d
      where d.id = dispo and d.account_id = (select auth.uid())
    )
    -- ... ou j'ai rejoint cette dispo
    or exists (
      select 1 from public.participants p
      where p.dispo_id = dispo and p.account_id = (select auth.uid())
    );
$$;

grant execute on function public.est_dans_la_partie (uuid) to authenticated;


-- =========================================================
-- TABLE messages  (le chat, lié à une dispo)
-- =========================================================
create table if not exists public.messages (
  id uuid unique not null default extensions.uuid_generate_v4 (),
  -- la partie concernée par ce message
  dispo_id uuid references public.disponibilites (id) on delete cascade not null,
  -- l'auteur du message
  account_id uuid references public.accounts (id) on delete cascade not null,
  contenu text not null,
  created_at timestamp with time zone default now(),
  primary key (id)
);

alter table public.messages enable row level security;

revoke all on public.messages from authenticated, service_role;
grant select, insert, delete on table public.messages to authenticated;

-- LECTURE : seulement si je suis dans la partie (organisateur ou participant).
create policy "messages_read_partie" on public.messages for select
  to authenticated using (public.est_dans_la_partie(dispo_id));

-- INSERT : j'écris en MON nom, et seulement si je suis dans la partie.
create policy "messages_insert_partie" on public.messages for insert
  to authenticated with check (
    account_id = (select auth.uid())
    and public.est_dans_la_partie(dispo_id)
  );

-- DELETE : je ne peux supprimer QUE mes propres messages.
create policy "messages_delete_own" on public.messages for delete
  to authenticated using (account_id = (select auth.uid()));

-- Index sur les clés étrangères (accélère le chargement du chat d'une partie).
create index if not exists messages_dispo_id_idx on public.messages (dispo_id);
create index if not exists messages_account_id_idx on public.messages (account_id);


-- =========================================================
-- Temps réel : on autorise Supabase à "pousser" les nouveaux
-- messages aux clients abonnés (le chat se met à jour tout seul).
-- =========================================================
alter publication supabase_realtime add table public.messages;
