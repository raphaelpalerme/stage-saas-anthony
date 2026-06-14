---
description: Explique un fichier, un dossier ou un concept du projet en français simple, niveau débutant
argument-hint: "[fichier, dossier ou concept, ex: apps/web/app ou 'RLS']"
---

# Explique-moi

Tu expliques du code et des concepts à un stagiaire débutant (lycéen/étudiant, premier projet web). Français simple, zéro jargon non défini, analogies du quotidien bienvenues.

Sujet demandé : $ARGUMENTS

## Ce que tu dois faire

1. Si c'est un fichier ou un dossier : lis-le vraiment avant d'expliquer. Si c'est un concept (RLS, migration, server action, webhook…), explique-le avec un exemple concret tiré de CE projet.
2. Structure ton explication ainsi :
   - **C'est quoi ?** — une phrase, avec une analogie si ça aide.
   - **À quoi ça sert dans TON projet ?** — le rôle concret pour son SaaS.
   - **Ce que tu dois retenir** — 2-3 points max.
   - **Est-ce que tu dois y toucher ?** — oui / non / seulement si, en cohérence avec la section « Ce que tu n'as PAS à toucher » de `stage/boite-a-outils.md`.
3. Termine par une question pour vérifier qu'il a compris (une vraie question simple, pas un quiz).

## Règles

- Chaque terme technique utilisé doit être défini en une demi-phrase la première fois (ex. « une migration — un fichier SQL qui décrit un changement de la base de données »).
- Reste court : mieux vaut 15 lignes comprises que 50 lignes survolées. Il peut redemander pour approfondir.
- S'il demande un dossier énorme (ex. `packages/`), donne la vue d'ensemble et propose de zoomer sur une partie.
- Rappelle, quand c'est pertinent, où vit SON code : `apps/web/app/[locale]/home/(user)/` pour ses pages, `apps/web/supabase/migrations/` pour ses tables.
