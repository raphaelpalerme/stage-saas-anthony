# Jour 1 — Lancement : ambitions, découverte du SaaS et setup

## Objectif du jour
Poser tes ambitions, comprendre ce qu'est un SaaS, et préparer tout ton environnement de travail.

## Checklist
- [ ] Point ambitions avec le tuteur (métier visé, revenu/mois souhaité, projets en cours)
- [ ] Lis « Qu'est-ce qu'un SaaS ? » dans la Boîte à outils, puis liste 10 SaaS que tu utilises
- [ ] Explore Product Hunt et note 5 SaaS récents qui t'intriguent
- [ ] Crée tes comptes : GitHub, Vercel, Supabase, Stripe (mode test), Claude.ai, Toggl
- [ ] Installe VS Code, Claude Code et Docker Desktop
- [ ] Clone ton repo de stage déjà prêt (Makerkit + guides + branche `develop`). Emplacement : **Mac** → ton dossier perso (`~/`). **Windows** → un dossier court à la racine du disque (ex. `C:\dev\`), surtout PAS sur le Bureau ni dans Documents (souvent synchronisés OneDrive : ça casse `node_modules` et ralentit tout)
- [ ] Vérifie ton outillage : dans un terminal (**Mac** → Terminal, **Windows** → Git Bash), va à la racine du repo et lance `bash check-setup.sh`. Tout doit être « OK » ; sinon le script te dit exactement quoi installer
- [ ] Active pnpm à la bonne version : `corepack enable` (une seule fois)
- [ ] Connecte-toi à GitHub en ligne de commande : `gh auth login` (une seule fois ; choisis GitHub.com → HTTPS → se connecter via le navigateur). Sans ça, ton premier push et ta première PR ce soir échoueront
- [ ] Vérifie que tout tourne : `pnpm install`, puis `pnpm supabase:start`, puis `pnpm dev` → tu dois voir la page d'accueil sur http://localhost:3000. Tu ne dois rien comprendre au code aujourd'hui, juste vérifier que ça démarre (c'est long la première fois, c'est normal — et si ça bloque, appelle le tuteur : on a 4 jours de marge)
- [ ] (Si le setup est terminé) regarde 2-3 vidéos d'indie hackers

## Livrable
Ce fichier `jour1.md` rempli (ambitions, 10 SaaS, 5 Product Hunt, 3 problèmes du quotidien) + setup prêt (comptes, installs, repo avec branche `develop`, stack qui démarre en local).

## Clôture du jour (ton premier commit et ta première PR sur ce repo)
- [ ] Branche `jour1-lancement-setup` créée
- [ ] Commit de tous tes changements du jour
- [ ] Pull Request vers `develop` (préviens le tuteur, il relit et merge le soir)
- [ ] Temps de la journée loggé sur Toggl

## Récap (à remplir le soir)
- **Fait :**
- **Bloqué (et comment débloqué) :**
- **Appris :**
- **Temps (Toggl) :**
