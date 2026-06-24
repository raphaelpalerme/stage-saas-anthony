/*
 * Pickify — tables du MVP : profils + disponibilites
 * --------------------------------------------------
 * Deux tables reliées :
 *   - profils         : 1 ligne par joueur (son pseudo, niveau, poste, quartier…)
 *   - disponibilites  : N annonces par joueur (lieu, créneau, places…)
 * Les deux pointent vers public.accounts via account_id.
 * Sur un compte perso, accounts.id = auth.uid() (l'utilisateur connecté).
 *
 * RLS (sécurité) — cas PARTAGÉ :
 *   - LECTURE (select) : tous les utilisateurs connectés voient TOUTES les
 *     lignes  → sinon la page "trouver" serait vide (on ne verrait que soi).
 *   - ÉCRITURE (insert/update/delete) : seulement SES propres lignes
 *     (account_id = auth.uid()).
 */

-- =========================================================
-- TABLE profils
-- =========================================================
create table if not exists public.profils (
  -- une seule fiche par compte → account_id sert aussi de clé primaire
  account_id uuid primary key references public.accounts (id) on delete cascade,
  pseudo text not null,
  niveau text not null default 'Débutant',
  poste text not null default 'Meneur',
  quartier text not null default '',
  bio text not null default '',
  created_at timestamp with time zone default now()
);

-- on active la sécurité par ligne (RLS) — obligatoire chez Makerkit
alter table public.profils enable row level security;

-- on repart de zéro sur les droits, puis on n'ouvre QUE ce qu'il faut
revoke all on public.profils from authenticated, service_role;
grant select, insert, update, delete on table public.profils to authenticated;

-- LECTURE : tout connecté lit tous les profils (cas partagé)
create policy "profils_read_all" on public.profils for select
  to authenticated using (true);

-- INSERT : je ne peux créer QUE mon profil
create policy "profils_insert_own" on public.profils for insert
  to authenticated with check (account_id = (select auth.uid()));

-- UPDATE : je ne peux modifier QUE mon profil
create policy "profils_update_own" on public.profils for update
  to authenticated using (account_id = (select auth.uid()))
  with check (account_id = (select auth.uid()));

-- DELETE : je ne peux supprimer QUE mon profil
create policy "profils_delete_own" on public.profils for delete
  to authenticated using (account_id = (select auth.uid()));


-- =========================================================
-- TABLE disponibilites
-- =========================================================
create table if not exists public.disponibilites (
  id uuid unique not null default extensions.uuid_generate_v4 (),
  -- qui a posté cette annonce (clé étrangère vers le compte)
  account_id uuid references public.accounts (id) on delete cascade not null,
  lieu text not null,
  creneau text not null,
  niveau_recherche text not null default 'Ouvert à tous',
  places int not null default 1,
  note text not null default '',
  statut text not null default 'ouverte',
  created_at timestamp with time zone default now(),
  primary key (id)
);

alter table public.disponibilites enable row level security;

revoke all on public.disponibilites from authenticated, service_role;
grant select, insert, update, delete on table public.disponibilites to authenticated;

-- LECTURE : tout connecté voit toutes les dispos (cas partagé → "trouver")
create policy "disponibilites_read_all" on public.disponibilites for select
  to authenticated using (true);

-- INSERT : je ne peux poster QUE sous mon compte
create policy "disponibilites_insert_own" on public.disponibilites for insert
  to authenticated with check (account_id = (select auth.uid()));

-- UPDATE : je ne peux modifier QUE mes dispos
create policy "disponibilites_update_own" on public.disponibilites for update
  to authenticated using (account_id = (select auth.uid()))
  with check (account_id = (select auth.uid()));

-- DELETE : je ne peux supprimer QUE mes dispos
create policy "disponibilites_delete_own" on public.disponibilites for delete
  to authenticated using (account_id = (select auth.uid()));
