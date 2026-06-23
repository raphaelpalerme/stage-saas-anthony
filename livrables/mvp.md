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
- **Ce que l'utilisateur fait :** crée et édite son profil : pseudo + niveau (débutant / moyen / confirmé) + **poste préféré** (meneur / arrière / ailier / intérieur) + **quartier** + une **bio** (une phrase).
- **Écran(s) / flow :** page « Profil » → formulaire (pseudo, niveau, poste, quartier, bio) → bouton « Enregistrer » → aperçu avec avatar (initiale) et badges.
- **Pourquoi c'est essentiel :** ton niveau et ton quartier s'affichent à côté de tes dispos → les autres savent avec qui ils jouent, et c'est ce qui alimente le **matching** dans « Trouver ».

### Feature 2 — Poster une dispo
- **Ce que l'utilisateur fait :** déclare qu'il est dispo à un endroit, à un moment — une vraie **annonce**.
- **Écran(s) / flow :** page « Poster une dispo » → formulaire : **lieu = champ texte libre** + créneau (texte) + **niveau recherché** (ouvert à tous / même niveau) + **places manquantes** + **note** libre → bouton « Publier ».
- **Statut automatique :** « Il manque X joueurs » tant qu'il reste des places, sinon « Complète » (déduit des places, pas saisi à la main).
- **Pourquoi c'est essentiel :** c'est le signal qui rend la mise en relation possible. Sans dispos postées, l'appli est vide.

### Feature 3 — Trouver des joueurs dispos
- **Ce que l'utilisateur fait :** consulte les dispos des autres, **filtre** et **trie par pertinence**, et clique « Je suis chaud » pour rejoindre un run.
- **Écran(s) / flow :** page « Trouver » → bloc « Tes critères » (ton quartier + ton niveau) → **filtres** (recherche terrain/quartier/créneau/pseudo + filtre niveau) → liste triée : chaque carte montre **pseudo, niveau, poste, quartier, lieu, créneau**, les **signaux** (« il reste 2 places », « 3 intéressés »), un badge **⚡ Pour toi** si ça matche, + un **bouton « Je suis chaud / Dans le run »**.
- **Tri par pertinence :** même quartier que moi (+2) et même niveau (+1) → les meilleurs scores remontent en haut.
- **Pourquoi c'est essentiel :** c'est le cœur du produit — voir qui joue, où et quand, et **refermer la boucle** en disant « je viens ».
- **Note (jour 7) :** le bouton « rejoindre » ne marche que de mon côté (mémoire locale). Prévenir l'autre joueur pour de vrai = jour 8 (base de données partagée).

## Mon modèle de données (prépare le jour 8)
[Toutes tes tables en un seul endroit. ⭐ Le mock de 18 joueurs dans `trouver/page.tsx` est mon **seed** de demain.]

| Table | Champs | Lié à |
|---|---|---|
| `profils` | pseudo, niveau, poste, quartier, bio, réputation | user_id |
| `disponibilites` | lieu (texte), créneau (texte), niveau_recherche, places, note | user_id |

*Dans « Trouver », chaque ligne = une `disponibilite` **jointe** au `profil` de son auteur (pour afficher pseudo + niveau + poste + quartier). Le nombre d'« intéressés » viendra d'une table de liaison au jour 8 (qui a cliqué « Je suis chaud »).*

## Ce que je NE fais PAS cette semaine (hors-scope)
[Les features tentantes que tu gardes pour plus tard. L'écrire = ton garde-fou anti-dérive.]
- Pas de **carte / GPS** : le lieu est un simple champ texte (pas de Google Maps).
- Pas de **messagerie / chat** entre joueurs.
- Pas de **système de réputation actif** (notes, votes) : le champ `réputation` existe mais on ne le remplit pas encore.
- Pas de **comptes d'équipe / clubs** : uniquement le compte personnel.
- Pas de **paiement / abonnement**.
