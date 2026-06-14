# [Nom de ton SaaS]

> [Ta one-liner : aide _[public cible]_ à _[bénéfice]_ sans _[problème actuel]_]

Mon SaaS, construit pendant un stage de 2 semaines (de l'idée à la production).

Repo **privé** (Makerkit est sous licence) — partage-le en lecture avec ton tuteur.

## Stack
Next.js · Supabase (auth + base de données) · Stripe (paiements, mode test) · Tailwind · déployé sur **Vercel**. Base de départ : boilerplate Makerkit.

## Lancer en local
```bash
pnpm install
pnpm supabase:start   # démarre Supabase en local via Docker
pnpm dev              # http://localhost:3000
```

Pour la doc complète du kit (installation, configuration), voir `README-makerkit.md`.

## Workflow du stage
Une branche par jour (`jourX-etape`) → Pull Request vers `develop` (relue par le tuteur) → temps suivi sur Toggl.
Le pas-à-pas des 10 jours est dans **[GUIDE.md](GUIDE.md)** et les fiches **[stage/](stage/)**.

---
_Ce README deviendra la vraie présentation de ton produit au Jour 10 (pitch, capture d'écran, lien vers la prod)._
