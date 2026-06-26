/*
 * Pickify — Highlights : un fil public de vidéos (et photos) de basket.
 * --------------------------------------------------------------------
 * Idée "réseau social" : tout joueur connecté peut POSTER une vidéo/photo
 * avec une légende, et VOIR celles de tout le monde (fil public).
 *
 * Deux morceaux :
 *   - une table `highlights` (qui a posté, le fichier, la légende) ;
 *   - un "bucket" de stockage `highlights` pour les fichiers (Supabase Storage).
 *
 * RLS (sécurité) — cas PARTAGÉ (comme profils/dispos) :
 *   - LECTURE : tout connecté voit tous les highlights (c'est un fil public).
 *   - ÉCRITURE : je ne peux poster/supprimer QUE les miens (account_id = moi).
 */

-- =========================================================
-- TABLE highlights
-- =========================================================
create table if not exists public.highlights (
  id uuid unique not null default extensions.uuid_generate_v4 (),
  -- qui a posté
  account_id uuid references public.accounts (id) on delete cascade not null,
  -- le chemin du fichier dans le bucket 'highlights' (ex. "<account_id>/xxx.mp4")
  fichier_path text not null,
  -- 'video' ou 'image' (pour choisir la bonne balise à l'affichage)
  media_type text not null default 'video',
  legende text not null default '',
  created_at timestamp with time zone default now(),
  primary key (id)
);

alter table public.highlights enable row level security;

revoke all on public.highlights from authenticated, service_role;
grant select, insert, delete on table public.highlights to authenticated;

-- LECTURE : tout connecté voit tout le fil
create policy "highlights_read_all" on public.highlights for select
  to authenticated using (true);

-- INSERT : je ne poste que sous mon compte
create policy "highlights_insert_own" on public.highlights for insert
  to authenticated with check (account_id = (select auth.uid()));

-- DELETE : je ne supprime que les miens
create policy "highlights_delete_own" on public.highlights for delete
  to authenticated using (account_id = (select auth.uid()));

-- Index sur la clé étrangère
create index if not exists highlights_account_id_idx on public.highlights (account_id);


-- =========================================================
-- STOCKAGE : bucket 'highlights' (Supabase Storage)
-- =========================================================
-- public = true : les fichiers sont lisibles via une URL publique (fil public),
-- ce qui simplifie l'affichage. On limite la taille et les types de fichiers.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'highlights',
  'highlights',
  true,
  52428800, -- 50 Mo max par fichier
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/quicktime'
  ]
)
on conflict (id) do nothing;

-- ÉCRITURE dans le bucket : seul un utilisateur connecté peut déposer un
-- fichier, et `owner` (rempli automatiquement par Storage) doit être lui.
create policy "highlights_storage_insert" on storage.objects for insert
  to authenticated
  with check (bucket_id = 'highlights' and owner = (select auth.uid()));

-- SUPPRESSION dans le bucket : je ne peux supprimer que mes fichiers.
create policy "highlights_storage_delete" on storage.objects for delete
  to authenticated
  using (bucket_id = 'highlights' and owner = (select auth.uid()));
