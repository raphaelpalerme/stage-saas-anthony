---
description: Vérifie et corrige ton identité git, pour que tes commits soient signés à TON nom (et garde la licence Makerkit OK)
---

# Mon identité git

Tu aides un stagiaire débutant à s'assurer que ses commits sont bien signés à **son** nom — pas à celui du tuteur ni de quelqu'un d'autre — et que la clé de licence Makerkit est en place. Français, simple, rassurant. À lancer **dès le jour 1, avant le premier commit** (ou plus tard si un commit s'est retrouvé au mauvais nom).

## Le contexte (à comprendre, pas à réciter)
Deux réglages git différents jouent ici, et on les confond souvent :
- `user.name` + `user.email` → **signent les commits** (l'attribution du travail). Doivent être ceux du/de la stagiaire.
- `user.username` → une clé **à part**, lue par le check de licence Makerkit au `pnpm dev`. Doit valoir `raphaelpalerme` (le compte qui détient la licence). Elle n'affecte **pas** l'attribution.

Le piège classique : pour faire passer la licence, quelqu'un met son `user.name` sur `raphaelpalerme` → ses commits sont alors signés au nom du tuteur. C'est ça qu'on évite/corrige.

## Ce que tu dois faire
1. Lis l'état actuel et montre-le simplement :
   - `git config user.name`, `git config user.email`, `git config user.username`
   - l'auteur du dernier commit : `git log -1 --pretty='%an <%ae>'`
   - la branche courante : `git branch --show-current`
2. **Diagnostique** :
   - `user.name`/`user.email` vides, ou = `raphaelpalerme`, ou quelqu'un d'autre que le/la stagiaire → à corriger.
   - `user.username` ≠ `raphaelpalerme` → à régler (sinon `pnpm dev` casse au check de licence).
3. Si une correction est nécessaire, demande-lui **son** nom complet et **son** email GitHub, puis applique (config **locale** au repo, pas `--global` — comme ça ça marche même si plusieurs personnes partagent un ordi) :
   - `git config user.name "<son nom>"`
   - `git config user.email "<son email GitHub>"`
   - `git config user.username raphaelpalerme`
4. Regarde le dernier commit. **S'il est déjà signé au mauvais nom** et que la branche n'est pas encore mergée, propose de le ré-attribuer — explique avant, et seulement avec son accord :
   - `git commit --amend --reset-author --no-edit`
   - puis `git push --force-with-lease origin <branche courante>` (jamais sur `main` ni `develop`).
5. Re-vérifie et confirme : « Tes commits sont maintenant signés `<nom> <email>`, et la licence Makerkit est OK. »

## Règles
- Config en **local** (dans le repo) par défaut, pas `--global`.
- Ne touche **jamais** à `user.name`/`user.email` pour faire passer la licence : c'est `user.username` qui sert à ça. Confondre les deux est exactement la cause du problème.
- Ne ré-écris l'historique (`--amend` + force-push) que sur une branche `jourX-...` non mergée. Jamais sur `main`/`develop`.
- Si plusieurs commits sont mal signés, préviens-le : `--amend` ne corrige que le dernier ; dis-lui d'en parler au tuteur pour les précédents.
