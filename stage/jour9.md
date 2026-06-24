# Jour 9 — Finitions, Stripe, déploiement final & pitch (jours 9 + 10 fusionnés)

## Objectif du jour
Rendre ton produit **solide** (bugs + polish), brancher la **facturation Stripe**, le déployer **pour de bon** en prod, et préparer ton **pitch + démo**. C'est ta v1.0.

## Checklist

### 1. Finitions (bugs + design + UX)
- [ ] Fais le tour complet du produit, note tout dans `livrables/bugs.md`
- [ ] Corrige les bugs **par ordre de gravité**, push à chaque fix
- [ ] Applique ton design system partout (marges, typo, couleurs, états hover) ; soigne les **états vides** et les **messages d'erreur**
- [ ] Fais tester par **2-3 personnes** et intègre leurs retours

### 2. Facturation Stripe (mode test) — obligatoire
- [ ] Crée un compte **Stripe en mode test**
- [ ] Crée tes produits **Free + Pro** (les tiers de ta landing) et récupère les **price IDs**
- [ ] Renseigne les **clés Stripe** + price IDs dans la config billing **et** les variables d'env **Vercel**
- [ ] Configure le **webhook Stripe** (Makerkit en a besoin pour activer l'abonnement)
- [ ] Teste un upgrade avec la carte de test `4242 4242 4242 4242` → le compte passe bien en **Pro**

### 3. Déploiement final (prod pour de vrai)
- [ ] Pousse tes migrations en prod (Supabase cloud) et **vérifie tes RLS en ligne** (un autre compte voit / ne voit pas ce qu'il faut)
- [ ] Vérifie toutes tes **variables d'env Vercel** (clés API, Stripe, `NEXT_PUBLIC_SITE_URL`)
- [ ] Teste le **parcours complet bout en bout EN PROD** : inscription → login → tes 3 features → upgrade Stripe → données qui persistent

### 4. Pitch & présentation
- [ ] Rédige le `README.md` produit (pitch, capture d'écran, stack, lien prod, comment lancer en local)
- [ ] Remplis `livrables/pitch.md` : **pitch 5 min** + ton « **et après ?** » (un *ask* concret)
- [ ] Présentation finale au tuteur (grille d'investisseur)

## Livrable
Ton produit en **v1.0 déployé en prod** avec **Stripe test fonctionnel**, `livrables/bugs.md`, `README.md` produit et `livrables/pitch.md`.

## Clôture
- [ ] Branche `jour9-final` créée
- [ ] Commit + Pull Request vers `develop` — **tu relis avec le tuteur, et TU merges toi-même**

## Récap (à remplir le soir)
- **Fait :** Grosses finitions de Pickify (nouvelle page d'accueil, avatars générés, menu thème + déconnexion, traduction en français, validation + suppression des dispos). Branché la facturation Stripe (passage en Pro + résiliation) en local. Poussé ma base de données en prod. Rempli mon README produit et mon pitch.
- **Bloqué (et comment débloqué) :** Le matin je ne pouvais plus me connecter → mon compte avait été effacé par un reset de la base, j'en ai recréé un. Stripe refusait le paiement tant que les 3 clés (dont le webhook) n'étaient pas remplies → débloqué avec `stripe listen`. Le déploiement du code en prod coince (branche de prod Vercel pas sur `develop`) → reporté, à voir avec le tuteur.
- **Appris :** Penser mobile d'abord, garder une langue cohérente (tout en français), et trancher un vrai prix (5 €/mois).
