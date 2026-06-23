# MVP — Pickify

*Livrable du jour 7. C'est ton **spec de build** : écris-le AVANT de coder. C'est ton **contrat** — si Claude Code propose une feature qui n'est pas ici, tu refuses ou tu la notes pour plus tard.*

## Le parcours cœur (« c'est fini quand… »)
[Le chemin qu'un utilisateur fait du début à la fin, et qui DOIT marcher pour ta démo du jour 10.]
1. Je crée mon **profil joueur** (pseudo, niveau).
2. Je **poste une dispo** : un lieu (ex. « City-stade Jaurès ») + un créneau (ex. « samedi 15h »).
3. Je **vois les autres joueurs** dispos, avec leur **pseudo et leur niveau** à côté de chaque dispo.
4. → Je sais avec qui je peux aller jouer.

## Mes 3 features (exactement 3) — issues de ton wedge du jour 2

### Feature 1 — Mon profil joueur (visible par les autres)
- **Ce que l'utilisateur fait :** crée et édite son profil : pseudo + niveau (débutant / moyen / confirmé).
- **Écran(s) / flow :** page « Profil » → formulaire (pseudo, niveau) → bouton « Enregistrer ».
- **Pourquoi c'est essentiel :** ton niveau s'affiche à côté de tes dispos → les autres savent avec qui ils jouent avant de te rejoindre.

### Feature 2 — Poster une dispo
- **Ce que l'utilisateur fait :** déclare qu'il est dispo à un endroit, à un moment.
- **Écran(s) / flow :** page « Poster une dispo » → formulaire : **lieu = champ texte libre** + créneau (texte) → bouton « Publier ».
- **Pourquoi c'est essentiel :** c'est le signal qui rend la mise en relation possible. Sans dispos postées, l'appli est vide.

### Feature 3 — Trouver des joueurs dispos
- **Ce que l'utilisateur fait :** consulte la liste des dispos publiées par les autres, et clique « Je suis chaud » pour rejoindre un run.
- **Écran(s) / flow :** page « Trouver » → liste des dispos : chaque ligne montre **lieu + créneau + pseudo + niveau** du joueur, + un **bouton « Je suis chaud / Dans le run »** pour signaler qu'on vient.
- **Pourquoi c'est essentiel :** c'est le cœur du produit — voir qui joue, où et quand, et **refermer la boucle** en disant « je viens ».
- **Note (jour 7) :** le bouton « rejoindre » ne marche que de mon côté (mémoire locale). Prévenir l'autre joueur pour de vrai = jour 8 (base de données partagée).

## Mon modèle de données (prépare le jour 8)
[Toutes tes tables en un seul endroit.]

| Table | Champs | Lié à |
|---|---|---|
| `profils` | pseudo, niveau, réputation | user_id |
| `disponibilites` | lieu (texte), créneau (texte) | user_id |

## Ce que je NE fais PAS cette semaine (hors-scope)
[Les features tentantes que tu gardes pour plus tard. L'écrire = ton garde-fou anti-dérive.]
- Pas de **carte / GPS** : le lieu est un simple champ texte (pas de Google Maps).
- Pas de **messagerie / chat** entre joueurs.
- Pas de **système de réputation actif** (notes, votes) : le champ `réputation` existe mais on ne le remplit pas encore.
- Pas de **comptes d'équipe / clubs** : uniquement le compte personnel.
- Pas de **paiement / abonnement**.
