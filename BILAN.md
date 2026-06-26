# 🏀 Bilan de stage — Anthony · Pickify

*Stage « construis ton SaaS en 2 semaines ». Note de fin, pour toi.*

## Ce que tu as accompli
En 2 semaines, parti de plus loin que personne, tu as un vrai SaaS en ligne : **Pickify**, pour trouver une partie de basket — profils, dispos, matchmaking, et tout un volet social (chat, messages, feed). Avec des trucs techniquement durs que tu as réglés (la sécurité des données, un jeu de test avec de faux comptes, le responsive, Stripe), et déployé en prod. La plupart des gens qui « veulent se lancer » n'arrivent jamais là.

## Ce que tu as appris
C'est toi qui as le plus **progressé** — de « moins à l'aise » à « je code des features sociales et je débugge tout seul » (ton fix du lint sans aide l'a prouvé). Et tu as eu **la plus belle leçon produit du stage** : quand tu as fait tester, tu as encaissé une vérité qui pique — *« celui qui est dans ma cible n'en a pas besoin, celui qui kiffe n'est pas dans ma cible »* — et tu en as tiré la bonne conclusion. Des fondateurs adultes ne le font jamais.

## Ta force
Ton autonomie sur la fin, et ton **courage** : tu n'as pas fui le retour qui fait mal, tu l'as regardé en face.

## Le truc honnête
Ton réflexe, c'est de builder — c'est confortable. Mais tu as failli finir sans tester, et tu as construit un réseau social entier au lieu de te concentrer. La prochaine fois : **teste AVANT de construire**, fais **UNE chose bien** plutôt que dix à moitié, et écris tes conclusions avec **TES mots**, pas ceux de l'IA.

## Si tu continues
1. Ton vrai filon, ton test l'a trouvé : le **joueur isolé** (pas de potes, nouveau dans un quartier) — lui en a besoin, et paierait. Va le tester pour de vrai.
2. Ton ennemi, c'est le vide. Ne vise pas large : **un quartier, un lycée**, 10 vrais joueurs au même endroit, et ça prend vie.
3. Le **partage de dispo sur WhatsApp** = ton levier pour grandir.

**Tu as démarré le plus loin et fait le plus de chemin. Sois fier. Vraiment.** 🙌

## La suite — ma proposition (ton tuteur)
**1h de mentorat par semaine** (visio ou en vrai) pour avancer sur ta vraie prochaine étape : **tester le joueur isolé** (ton seul vrai filon) et résoudre le démarrage à froid (de la densité sur **un** quartier / un lycée).

Pas de soutien financier pour l'instant — mais ça **se débloque avec la traction** : le jour où tu as **5 vrais utilisateurs actifs au même endroit** (ou un premier qui paie), on rediscute du reste.

*Je crois assez en toi pour investir mon temps dès maintenant. L'argent suit la preuve.*

## 🎓 Défi de fin de stage — reprends le contrôle
Pendant 2 semaines, des **garde-fous** t'ont protégé : impossible de committer sur `develop`/`main`, de toucher certaines zones, de lancer un formatage, et chaque commit passait un typecheck + lint. C'étaient les roulettes du vélo.

Maintenant, **c'est TON projet.** Ton dernier exercice : **retire-les toi-même.**

Indices (pas la solution — à toi de creuser) :
- Un te bloque **au moment du commit** → cherche du côté des **git hooks** (`.githooks/`, et `git config core.hooksPath`).
- Un autre **bride Claude** quand il édite des fichiers ou lance des commandes → cherche dans **`.claude/`** (le `settings.json` + le dossier `hooks/`).
- ⚠️ Un réglage **ressemble** à un garde-fou mais n'en est pas un : sans lui, `pnpm dev` **casse** (c'est lié à la licence Makerkit). Trouve lequel, et **garde-le**.
- 😉 Et si tu demandes à Claude de retirer le hook qui **le bride lui-même**, il refusera sûrement — il ne désactive pas ses propres limites. Là, c'est à **toi, l'humain**, de le faire à la main. C'est la dernière leçon : **tu es aux commandes, l'IA assiste.**

Quand tu as tout retiré (en gardant ce qu'il fallait garder) et que tu peux committer librement où tu veux : **bravo, tu as fini le stage pour de vrai.** 🚀
