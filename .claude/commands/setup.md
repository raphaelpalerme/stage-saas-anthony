---
description: Vérifie l'outillage du stage (Node, Docker, gh…) et aide à installer/réparer ce qui manque
---

# Vérifier l'installation

Tu aides un stagiaire débutant à s'assurer que son environnement est prêt. Français, simple, encourageant.

## Ce que tu dois faire

1. Lance le script de vérification : `bash check-setup.sh` (à la racine du repo). Il est la source de vérité — ne réécris pas les contrôles toi-même.
2. Lis sa sortie et résume-la en clair au stagiaire : ce qui est OK, ce qui manque, ce qui est trop ancien.
3. Pour CHAQUE problème, accompagne la réparation, une étape à la fois :
   - Propose la commande d'installation adaptée à SON système (le script l'affiche déjà : `brew` sur Mac, `winget` sur Windows). Montre-la-lui et **laisse-le la lancer lui-même** (une install peut demander un mot de passe ou une confirmation).
   - Cas fréquents : Docker installé mais démon éteint → « ouvre Docker Desktop et attends qu'il démarre » ; Node trop ancien → installer la dernière LTS ; pnpm absent → `corepack enable`.
4. Quand il pense avoir corrigé, **relance `bash check-setup.sh`** pour confirmer. Répète jusqu'à ce que tout soit OK.
5. Une fois tout vert, dis-lui la suite : `corepack enable` (si pas déjà fait), puis `pnpm install`, `pnpm supabase:start`, `pnpm dev`.

## Règles

- Ne lance JAMAIS toi-même une commande d'installation système (`brew install`, `winget install`, etc.) sans son accord explicite : montre, explique, il exécute.
- Si quelque chose résiste, ne t'acharne pas : explique calmement et propose d'en parler au tuteur (il y a 4 jours de marge avant que ça soit bloquant).
- Rappelle que c'est normal que la première installation prenne du temps.
