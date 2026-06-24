# Pickify 🏀

> Pickify aide les **joueurs de basket** à **trouver des joueurs et des terrains dispos près de chez eux**, sans galérer avec des groupes WhatsApp où personne ne répond.

SaaS construit pendant un stage de 2 semaines (de l'idée à la production).

Repo **privé** (Makerkit est sous licence) — partage-le en lecture avec ton tuteur.

## Le problème
Quand tu veux jouer au basket **en dehors d'un club**, c'est la galère : tu écris dans le groupe WhatsApp et personne ne répond, ou tu te pointes au city-stade… et il n'y a personne (ou c'est plein). Les groupes WhatsApp/Insta ne te montrent que **tes contacts**, jamais les joueurs inconnus dispos au même endroit, au même moment.

## Ce que fait Pickify
1. **Profil joueur** — pseudo, niveau, poste, quartier, avatar : ta carte de joueur, visible des autres.
2. **Poster une dispo** — un lieu + un créneau + le nombre de joueurs qui manquent : une vraie annonce.
3. **Trouver des joueurs** — la liste des joueurs dispos près de toi, **triée par pertinence** (même quartier / même niveau d'abord) ; tu rejoins en un clic.

Plan **Pro à 5 €/mois** (paiements Stripe, mode test).

## Stack
Next.js · Supabase (auth + base de données + RLS) · Stripe (paiements, mode test) · Tailwind · déployé sur **Vercel**. Base de départ : boilerplate Makerkit.

## Lancer en local
```bash
pnpm install
pnpm supabase:web:start   # démarre Supabase en local via Docker
pnpm dev                  # http://localhost:3000
```

Pour la doc complète du kit (installation, configuration), voir `README-makerkit.md`.

## Lien de production
🔧 _Déploiement en cours de finalisation (réglage de la branche de prod Vercel à voir avec le tuteur)._
<!-- Quand la prod est à jour, colle ici le lien : https://... -->

## Capture d'écran
<!-- Ajoute une capture de ta page d'accueil ou de "Trouver" : ![Pickify](docs/capture.png) -->

## Workflow du stage
Une branche par jour (`jourX-etape`) → Pull Request vers `develop` (relue par le tuteur) → temps suivi sur Toggl.
Le pas-à-pas des 10 jours est dans **[GUIDE.md](GUIDE.md)** et les fiches **[stage/](stage/)**.
