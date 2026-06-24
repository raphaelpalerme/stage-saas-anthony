# Jour 8 — Base de données : tes tables + RLS

## Objectif du jour
Créer tes tables avec une migration SQL versionnée et activer les RLS.

## Checklist
- [ ] Dessine ton schéma (entités, colonnes, relations)
- [ ] Crée une migration SQL (CREATE TABLE + RLS) dans `supabase/migrations`
- [ ] Lance `pnpm supabase:reset` et vérifie tes tables dans Studio
- [ ] Migre tes features de `useState` vers Supabase
- [ ] Teste le RLS selon TES données : **privées** (ex. des audits) → un autre compte ne les voit pas ; **partagées** (ex. des profils / annonces) → les autres comptes **DOIVENT** les voir, mais seul le propriétaire peut les modifier

## Livrable
Tes tables avec RLS actives ; les 3 features persistent les données par utilisateur.

## Clôture du jour
- [ ] Branche `jour8-db` créée
- [ ] Commit de tous tes changements du jour
- [ ] Pull Request vers `develop` (préviens le tuteur, il relit et merge le soir)

## Récap (à remplir le soir)
- **Fait :** Créé ma migration SQL (tables `profils` + `disponibilites` avec leurs RLS) et branché mes 3 pages (profil / dispo / trouver) sur Supabase à la place des données d'exemple.
- **Bloqué (et comment débloqué) :** La page d'accueil paraissait vide / ne montrait pas de joueurs. Je me suis débloqué en créant un deuxième compte — j'ai compris que « trouver » ne montre les autres que s'il y a d'autres comptes (RLS « lecture partagée »).
- **Appris :** Comment brancher mes pages sur Supabase à la place des données `EXEMPLES` (passer du mock en mémoire à une vraie base de données).
