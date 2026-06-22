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
### Déployer en prod (en autonomie, avec Claude Code comme binôme)
> C'est l'étape la plus technique. Fais-la **pas à pas, en vérifiant à chaque palier** avant de passer au suivant. Colle chaque message d'erreur à Claude Code — c'est son moment. **Appelle le tuteur seulement si tu es vraiment bloqué après 2 essais.** Le prompt « Déployer sur Vercel + Supabase prod » de la Boîte à outils te guide.

- [ ] **Supabase cloud** : crée 1 projet (région **Europe**), note l'URL + les clés (publishable + secret) + le mot de passe DB
- [ ] **Applique le schéma Makerkit en prod** (depuis ton terminal local) : `supabase link --project-ref <ref>` puis `supabase db push`
- [ ] **Supabase → Authentication → URL Configuration** : tu y reviendras avec ton URL Vercel ; et **désactive « Confirm email »** (pour la démo)
- [ ] **Vercel** : importe ton repo, ajoute les variables d'env — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLIC_KEY`, `NEXT_PUBLIC_SITE_URL` (publiques), `SUPABASE_SECRET_KEY`, `SUPABASE_DB_WEBHOOK_SECRET` (secrètes) — puis déploie
- [ ] **Piège du `SITE_URL`** : tu connais ton URL `.vercel.app` seulement **après** le 1er déploiement → déploie une fois, récupère l'URL, renseigne `NEXT_PUBLIC_SITE_URL` **et** ajoute-la dans Supabase (Site URL + Redirect URLs), puis **redéploie**
- [ ] **Vérifie** : la landing s'affiche sur ton URL `.vercel.app`, tu crées un compte test, le **login fonctionne**

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
