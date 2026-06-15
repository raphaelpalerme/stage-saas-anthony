# Dépannage — quand ça bloque sur la technique

Cette fiche couvre les soucis **purement techniques** (l'environnement, pas ton code). Si ton problème est là, applique la solution et repars. Sinon : demande à ton binôme Claude (`/explique`), et si ça résiste vraiment, ton tuteur.

> Les vrais bugs de TES features ne sont pas ici — ça, tu les résous avec Claude. Cette fiche, c'est juste la plomberie.

## « License check failed » au `pnpm dev`
Makerkit vérifie la licence via une clé git `user.username`. Normalement c'est réglé tout seul au `pnpm install` (le projet la configure). Si l'erreur apparaît quand même : tu as sûrement lancé `pnpm dev` **avant** que `pnpm install` finisse. Lance `pnpm install` jusqu'au bout, puis réessaie. Si ça persiste, dans le repo : `git config user.username raphaelpalerme`. ⚠️ N'utilise **pas** `user.name` pour ça (`user.name` sert à signer tes commits à TON nom) — au besoin, lance `/identite`.

## « Cannot connect to the Docker daemon »
Docker Desktop n'est pas lancé. Ouvre-le, attends que son icône soit verte (« running »), puis relance ta commande.

## `pnpm` ou `node` : « command not found » juste après l'installation
Le terminal ne connaît pas encore le nouveau programme. **Ferme le terminal et rouvre-en un neuf** — ça suffit presque toujours.

## `pnpm supabase:start` prend des plombes
La première fois, c'est normal : il télécharge plusieurs gigaoctets d'images Docker (5 à 10 min selon ta connexion). Les fois suivantes, c'est quasi instantané. Laisse tourner.

## « Port already in use » (3000, 54321, 54323…)
Un autre programme occupe le port — souvent un ancien `pnpm dev` ou Supabase resté ouvert dans un autre terminal. Ferme l'autre terminal, ou lance `pnpm supabase:stop` puis réessaie.

## Tout est lent (Windows)
Ton repo est probablement sur le Bureau ou dans Documents, synchronisés par OneDrive — ça ralentit tout et casse `node_modules`. Déplace le dossier dans `C:\dev\` et reprends de là.

## Mon premier `git push` (ou `gh pr create`) demande une connexion
Tu n'es pas authentifié à GitHub. Lance **une seule fois** : `gh auth login` (choisis GitHub.com → HTTPS → se connecter via le navigateur). Ensuite push et PR marcheront tout seuls.

## `pnpm supabase:reset` : « j'ai perdu mes données ! »
C'est normal et voulu : la commande remet la base à zéro **et** rejoue toutes tes migrations. Tu n'as rien cassé. Tes données de test, tu les recrées en quelques clics — tes tables, elles, sont reconstruites par tes fichiers de migration.

## Mon mot de passe est refusé à l'inscription
Lis le message d'erreur : il dit ce qui manque (longueur minimale, etc.). Choisis un mot de passe qui respecte la règle affichée.
