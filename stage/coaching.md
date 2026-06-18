# Coaching personnalisé — Anthony

*Notes de ton tuteur, jour par jour. La commande `/jour` les rappelle et vérifie si tu les as traitées.*

## Jour 2 — idée
- Va **plus loin et plus en profondeur** qu'au jour 1 (qui était un peu vite fait).
- Vise une idée **« niche + qui paie »** plutôt qu'un problème vague. Ta piste **terrains de basket dispos** est concrète : creuse QUI paierait et COMBIEN.
- Pour chaque idée gardée, force-toi à répondre : qui paie, combien, est-ce un vrai marché ?

## Jour 2 (suite) — valider ton business
- Ton choix de 3 features (partenaire + matchmaking créneau + remplaçant) est **bon** : c'est la boucle cœur, garde-la.
- Mais refais ta notation **honnêtement** : tout en 5/5 = tu ne tries rien (un « remplaçant auto » n'est pas 5/5 en « buildable en 1 semaine »).
- Test investisseur, réponds à : (1) un lycéen paiera-t-il **vraiment** 10€/mois, vs un groupe WhatsApp gratuit ? (freemium ? qui paie ?) (2) ton appli est vide sans monde au même endroit — comment tu démarres (un lycée, un city-stade) ? (3) qu'est-ce qui empêche quelqu'un de copier l'idée ?

## Jour 3 — marché
- Ton chantier n°1 : le **modèle économique**. Tu as répondu « pourquoi Pickify est mieux que WhatsApp », mais pas « un ado paiera-t-il VRAIMENT 10€/mois ? ». Tranche : freemium (gratuit + payant pour quoi ?), un autre payeur (clubs, mairies, salles de sport ?), ou pub ? Sans réponse claire, l'idée reste fragile.
- Positionnement : regarde les apps sport/communauté existantes (Spond, TeamReach, groupes Strava/Discord). Qu'est-ce qu'elles font payer, et à qui ? Ça t'aidera à trancher ton modèle.
- Si pas encore fait : refais ton scoring du jour 2 honnêtement — pas tout en 5/5.

- **Carte de positionnement (cet aprem)** : essaie les axes « club organisé ↔ jeu informel » × « multi-sport ↔ basket ». Place Spond / Playtomic / JoFoot + les groupes WhatsApp/Insta — ton coin « informel + basket » devrait être vide.

## Jour 4 — landing
- Ton **hero = ta value proposition** : « trouve des joueurs et des terrains de basket près de chez toi ». Montre le côté **communautaire et local**.
- Design : cible **ados/jeunes** → énergique, **mobile-first**, fun mais lisible (pense Strava / Instagram, pas un tableur).
- Sur le prix affiché : tu peux montrer un plan, mais reste ouvert — le 10€ n'est pas validé, tu trancheras le modèle plus tard.

## Jour 7 — MVP : ta boucle cœur
- Périmètre : **profil joueur + poster sa dispo (lieu + créneau) + trouver des joueurs dispos au même endroit**. C'est du CRUD + une requête filtrée — tu es dans tes cordes.
- **Localisation = une liste de terrains/quartiers ou un champ texte**, PAS de GPS ni de carte (trop complexe, et les API de cartes coûtent).

## Jour 8 — données + le piège de la démo
- **Pré-remplis ta base avec des joueurs et des dispos d'exemple (seed data)** : une appli de mise en relation est VIDE avec un seul utilisateur. Sans seed, ta démo du jour 10 n'affiche aucun match — c'est indispensable.

## Jour 5 — finaliser la landing
- Avec **Claude Code**, corrige en priorité : (1) les **ombres** → sombres/transparentes pour un thème sombre (pas des couleurs claires) ; (2) le **fond** #334155 un peu boueux → teste plus sombre ou plus clair ; (3) **ajoute un pricing + une FAQ** (même sans prix tranché : « gratuit + offre à venir »).
- Range tes fichiers d'explo (`preview-*.html`, `landing-exemple.html`) dans `livrables/` ou supprime-les.
