/*
 * Pickify — Bucket 'avatars' : permet d'importer SA propre photo de profil.
 * public = true : lisible via une URL publique (l'avatar s'affiche partout).
 * Écriture/suppression : seulement ses propres fichiers.
 */
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  5242880, -- 5 Mo max
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy "avatars_storage_insert" on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars' and owner = (select auth.uid()));

create policy "avatars_storage_delete" on storage.objects for delete
  to authenticated
  using (bucket_id = 'avatars' and owner = (select auth.uid()));
