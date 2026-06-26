/*
 * Pickify — Profil enrichi : on ajoute 2 champs à la carte de joueur.
 *   - taille      : ex. "1m85" (texte libre)
 *   - style_jeu   : Scoreur / Passeur / Défenseur / Polyvalent
 * `default ''` / `'Polyvalent'` : les profils existants restent valides.
 */

alter table public.profils
  add column if not exists taille text not null default '';

alter table public.profils
  add column if not exists style_jeu text not null default 'Polyvalent';
