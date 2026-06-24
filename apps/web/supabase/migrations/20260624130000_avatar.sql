/*
 * Pickify — ajoute un avatar emoji au profil joueur
 * -------------------------------------------------
 * Chaque joueur peut choisir un emoji (ex. 🏀) comme avatar.
 * Colonne optionnelle : vide par défaut. Les joueurs qui n'en choisissent
 * pas auront un emoji de secours calculé côté code à partir de leur pseudo.
 */
alter table public.profils
  add column if not exists avatar text not null default '';
