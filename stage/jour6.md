# Jour 6 — Setup technique : projet en local + Vercel

## Objectif du jour
Faire tourner le projet en local (Docker + Supabase + Next.js) et déployer sur Vercel.

## Checklist
- [ ] Relance la stack vérifiée au Jour 1 : Docker Desktop, `pnpm supabase:start` (Studio sur localhost:54323), `pnpm dev` (localhost:3000)
- [ ] Crée un compte test et explore l'app connecté (pages, réglages du compte)
- [ ] **Identité + mapping du design system** : règle le nom de l'app (config), et reporte tes couleurs/radius dans les **variables du thème shadcn** de `apps/web` → ça thème **toute l'app** (landing + dashboard) d'un coup
- [ ] **Header/footer = ceux de Makerkit** : le layout marketing fournit déjà `SiteHeader` + `SiteFooter` (avec les boutons connexion/inscription). **Personnalise-les** (logo, liens de nav, CTA) et **n'utilise PAS** le header/footer de ta landing (sinon doublon)
- [ ] **Intègre le CORPS de ta landing** (hero → features → pricing → FAQ → CTA) dans `apps/web/app/[locale]/(marketing)/page.tsx` : Claude Code convertit ton HTML en JSX avec les **couleurs du thème** (pas de hex en dur) — prompt prêt dans la Boîte à outils
- [ ] **Polices + images** : ajoute tes Google Fonts à la config de l'app, et tes images (en **WebP**) dans `apps/web/public/`
- [ ] Branche le projet à Vercel + un Supabase cloud (variables d'env) — utilise le prompt « Déployer sur Vercel + Supabase prod » de la Boîte à outils, et fais-toi accompagner par le tuteur : c'est l'étape la plus technique de la semaine
- [ ] Vérifie que le déploiement prod marche et que le login fonctionne

## Livrable
TON produit (nom, couleurs, TA landing) qui tourne en local + déployé en prod sur Vercel (URL publique).

## Clôture du jour
- [ ] Branche `jour6-setup-technique` créée
- [ ] Commit de tous tes changements du jour
- [ ] Pull Request vers `develop` (préviens le tuteur, il relit et merge le soir)

## Récap (à remplir le soir)
- **Fait :**
- **Bloqué (et comment débloqué) :**
- **Appris :**
