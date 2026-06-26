/*
 * Pickify — Highlights : on relève la limite du bucket à 200 Mo.
 * Le stockage accepte désormais jusqu'à 200 Mo, MAIS l'app n'autorise les
 * gros fichiers (> 50 Mo) qu'aux comptes Pro. Le gratuit reste plafonné à 50 Mo.
 */
update storage.buckets
set file_size_limit = 209715200 -- 200 Mo
where id = 'highlights';
