# Pitch — Pickify 🏀

*Livrable du jour 10. Présentation de 5 minutes, évaluée à la grille d'investisseur.*

> Pitch **chronométré** : respecte les durées. Total ~5 min.

## 1. Le problème — 45 s
Quand tu veux jouer au basket **en dehors d'un club**, c'est galère : tu écris dans le groupe WhatsApp… personne ne répond. Ou tu te pointes au city-stade et il n'y a personne, ou c'est plein. Résultat : tu rentres sans avoir joué.
Le vrai souci : WhatsApp et Insta ne te montrent que **tes contacts** — jamais les joueurs **inconnus** dispos au même endroit, au même moment.
**Pour qui :** les joueurs de basket **informels**, 15-30 ans.

## 2. La solution + démo live — 2 min
**Pickify, c'est l'appli qui connecte les joueurs de basket informels entre eux : tu vois qui est dispo près de chez toi et tu rejoins une partie — sans être dans un club.**
- **Étape 1 :** je crée mon **profil joueur** (pseudo, niveau, poste, quartier, avatar).
- **Étape 2 :** je **poste une dispo** (lieu + créneau + places qui manquent).
- **Étape 3 :** dans **« Trouver »**, je vois les autres joueurs dispos, **triés par pertinence** (même quartier / même niveau d'abord), et je **rejoins**.
- **Étape 4 (upgrade Stripe) :** je passe en **Pro (5 €/mois)** avec la carte de test `4242 4242 4242 4242` → mon compte devient **Pro**.

## 3. Le business case — 45 s
- **Qui paie :** les joueurs (ados / jeunes), souvent **via leurs parents** — qui paient déjà des applis et des jeux vidéo de cette façon.
- **Prix :** **5 €/mois** (plan Pro).
- **Combien pour 1 000 €/mois :** ~**200 abonnés Pro**. Réaliste si je démarre fort sur **1-2 city-stades / quartiers très actifs** plutôt que partout à la fois.
- **Marché & concurrents :** WhatsApp / Insta (gratuits mais limités à tes contacts), Spond / Playtomic (clubs ou autres sports). La case **« basket + informel »** est **vide** → c'est mon angle, personne ne l'occupe.

## 4. Ce que j'ai appris — 30 s
- **Penser mobile d'abord.** Mes utilisateurs sont à ~100 % sur téléphone, donc je vérifie chaque écran en vue mobile **avant** de valider — pas après coup.
- **La cohérence de la langue compte.** Avoir une moitié d'appli en anglais (le boilerplate) cassait l'expérience ; tout passer en **français** rend le produit crédible pour ma cible d'ados francophones.
- **Trancher un prix.** J'ai dû choisir un vrai prix — je suis passé de 10 € à **5 €/mois** pour coller à des ados — au lieu de mettre un chiffre au hasard.

## 5. Et après ? — 1 min (mon « ask »)
Ce dont j'ai besoin pour continuer, c'est de **finir le déploiement en production**. Mon code à jour (profil, dispo, trouver, avatars, Stripe) tourne en local, et j'ai déjà poussé ma base en prod — mais la prod en ligne affiche encore une vieille version. Le blocage : sur Vercel, la **« branche de production »** n'est pas réglée sur `develop`, donc mes mises à jour ne partent qu'en « preview ».

**Mon ask :** un coup de main pour **régler ce réglage Vercel** (branche de prod + alias) et faire un premier déploiement propre — pour enfin avoir un **vrai lien public** à montrer et faire **tester Pickify par de vrais joueurs**.
