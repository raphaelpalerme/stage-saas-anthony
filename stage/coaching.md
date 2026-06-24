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

- **Modèle de données** : `profils` (pseudo, niveau, reputation, user_id) + `disponibilites` (lieu, creneau, user_id). Écris ton spec `mvp.md` AVANT de coder.

- **Cet aprèm — densifie tes 3 features sur le MOCK** (pas de Supabase aujourd'hui, la base c'est jour 8). On ajoute de la **profondeur**, pas une 4e feature. Tu fais tout avec Claude Code — donne-lui les champs ci-dessous.

  **Feature 1 — Profil (le plus important).** Ajoute ces champs (en `useState` + dans tes objets `EXEMPLES`) :
  - `poste_prefere` : meneur / arrière / ailier / intérieur — *crédibilité basket*
  - `niveau` : débutant / intermédiaire / confirmé — *sert au matching*
  - `quartier` : ex. « Belleville » — *sert au matching par proximité*
  - *(bonus)* `bio` : une phrase, ex. « Je joue le week-end, plutôt streetball »
  - *(bonus)* `avatar` : un emoji 🏀 ou les initiales sur fond coloré (**PAS d'image IA**)

  **Feature 2 — Poster une dispo.** Aujourd'hui tu as lieu + créneau. Ajoute :
  - `niveau_recherche` : « même niveau » ou « ouvert à tous »
  - `places_restantes` : ex. « il manque 2 joueurs »
  - `note` : texte libre, ex. « 5v5, ramène ton ballon »
  - `statut` : ouverte / complète
  → une dispo devient une **vraie annonce** à laquelle on répond.

  **Feature 3 — Trouver (matching, pas une liste plate).**
  - **Filtres** : par quartier, par niveau, par créneau
  - **Tri par pertinence** : même quartier + même niveau **en premier**
  - **Signaux d'activité** : « il reste 2 places », « 3 joueurs intéressés »
  - **Bouton « Rejoindre »** qui incrémente les places prises

  **Étoffe `EXEMPLES`** → 15-20 joueurs réalistes (quartiers / niveaux / postes variés, des dispos « 1 place restante »). ⭐ Ce mock = ton **seed Supabase de demain** : écris-le une fois, il sert deux fois.

  **Si tu manques de temps — l'essentiel** : `niveau` + `quartier` sur le profil, le **matching par niveau/quartier** dans « trouver », et le **mock réaliste**. Bio, avatar, signaux et bouton « Rejoindre » = bonus.

  **Prompt prêt pour Claude Code** (fais le même pour dispo et trouver ensuite) :
  > Dans mon app Pickify, enrichis mon profil joueur. Ajoute ces champs partout (le type TypeScript, le formulaire de profil, et mes données d'exemple `EXEMPLES`) : poste_prefere (meneur/arrière/ailier/intérieur), niveau (débutant/intermédiaire/confirmé), quartier. Garde tout en `useState` pour aujourd'hui — PAS de base de données. Mets à jour l'affichage du profil pour montrer ces infos, et explique-moi chaque changement.

- **Tes 2 dernières heures — polis, n'élargis pas** (toujours mock, pas de base, pas de 4e feature) :
  - **📱 Priorité 1 — responsive mobile** : vérifie tes 3 pages sur l'émulateur mobile (Chrome DevTools → vue mobile) et corrige ce qui déborde, surtout la liste « trouver » et les formulaires. Tes utilisateurs sont à ~100 % sur téléphone — c'est LE point clé.
  - **Priorité 2 — parcours + états vides** : teste le flow complet (profil → poste une dispo → trouver → filtre → Rejoindre) comme un vrai user et corrige les frictions. Ajoute les **états vides** (« Aucun joueur dans ce quartier — élargis ta recherche » au lieu d'une page blanche) et un **retour visuel** quand on poste/rejoint (« Dispo postée ✅ », « Tu as rejoint »).
  - *(Si temps)* **Priorité 3 — polish visuel** : transitions douces, cohérence du thème, espacements.
## Jour 8 — données + le piège de la démo

- **⚠️ AVANT TOUTE CHOSE (à faire en reprenant)** — remets ta base et tes types au propre, dans l'ordre :
  1. `git pull origin jour8-db` — récupère les hooks corrigés.
  2. `pnpm supabase:web:typegen` — régénère **les DEUX** fichiers de types (`apps/web/lib/database.types.ts` **ET** `packages/supabase/src/database.types.ts`). ⚠️ L'ancien hook avait bloqué le fichier `packages/` → il est **périmé** (sans tes tables) ; or ton code importe `Database` depuis `@kit/supabase/database` (= ce fichier), donc **rien ne compile** tant que tu ne l'as pas régénéré.
  3. `pnpm typecheck` puis `pnpm lint` — tout doit être au vert.
  4. Commit les deux fichiers de types régénérés.
  > Le **pre-commit lance maintenant typecheck + lint** → il refusera ton commit tant que ce n'est pas propre. C'est voulu : ça t'empêche de committer du code cassé.
- **Pré-remplis ta base (seed)** : une appli de mise en relation est VIDE avec un seul utilisateur — sans seed, ta démo du jour 10 n'affiche aucun match. Ton mock de 18 joueurs = ton seed.
- **🔴 RLS « lire tout, écrire le sien »** (LE point qui peut casser « trouver ») : `profils` et `disponibilites` doivent autoriser la **lecture de TOUTES les lignes** (utilisateur connecté), pas seulement les tiennes — sinon « trouver » est **VIDE** (tu ne verrais que toi). Mais l'écriture reste à toi. Donc : `select` pour tous les connectés (`using (true)`), `insert`/`update` seulement si `account_id = auth.uid()`. ⚠️ C'est l'**INVERSE** du cas « privé » de la fiche : tes profils/dispos sont **partagés**.
- **🔴 Seed = créer aussi de faux comptes** : `profils.account_id` pointe vers un vrai compte. On **ne peut pas insérer 18 profils sans 18 comptes** → erreur de clé étrangère. Ton `seed.sql` doit donc créer **de faux `auth.users` (+ leurs comptes) PUIS leurs profils/dispos**. C'est LE point technique du jour : demande à Claude Code un `seed.sql` qui fait les deux, et fais-toi accompagner par le tuteur.
- **🟡 camelCase ↔ snake_case** : ton code utilise `niveauRecherche` ; les colonnes Postgres seront `niveau_recherche`. Après `pnpm supabase:web:typegen`, les types sont en snake_case → adapte ton code (Claude Code peut mapper).
- **L'ordre** : tables + RLS (lire tout / écrire le sien) → `seed.sql` (faux comptes + profils + dispos) → `pnpm supabase:reset` → vérifie dans Studio que « trouver » voit les AUTRES joueurs → branche tes pages sur Supabase à la place des `EXEMPLES`.
## Jour 5 — finaliser la landing
- Avec **Claude Code**, corrige en priorité : (1) les **ombres** → sombres/transparentes pour un thème sombre (pas des couleurs claires) ; (2) le **fond** #334155 un peu boueux → teste plus sombre ou plus clair ; (3) **ajoute un pricing + une FAQ** (même sans prix tranché : « gratuit + offre à venir »).
- Range tes fichiers d'explo (`preview-*.html`, `landing-exemple.html`) dans `livrables/` ou supprime-les.
- **Aligne ta landing sur ton MVP** (important) : ta feature 3 « jamais de partie annulée / remplaçant » n'est **pas** dans ton MVP — tu as choisi « profil joueur » au jour 2. Remplace-la par une feature qui colle (ex. « **vois le niveau et la réputation des joueurs** »). Et adoucis « près de toi » (tu n'as pas de GPS) → « sur ton terrain / dans ton quartier ».
- **Amélioration libre** (une fois aligné et propre) : peaufine à ton goût, mais garde l'énergie pour le build de la semaine 2.
- **Range comme Matis** : mets ta landing dans un dossier dédié `livrables/pickify-landing-page/` (index.html + assets) — plus de fichier ni de dossier `img/` à la racine du repo.
- **Images en WebP** : convertis tes 4 PNG (1 à 2,5 Mo !) en **WebP optimisé** (~100-300 Ko) — demande à Claude Code de les compresser/convertir. Une landing à 7,5 Mo d'images, ça rame.
- **Cohérence** : si tu as changé des couleurs/textes en mode libre, mets à jour `design-system.md` et `copy-landing.md`.

## Jour 6 — intégration
- **Ta landing n'est pas responsive** (tailles en pixels fixes, aucune media query) — or ta cible est à 100 % sur mobile. Au moment où Claude Code convertit ta landing en JSX/Tailwind, fais-lui tout passer en **mobile-first responsive** (classes `sm:`/`md:`/`lg:`, plus de largeurs fixes). **Teste sur l'émulateur mobile** (Chrome DevTools) avant de valider — c'est l'écran de tes utilisateurs.
- **Déploiement en autonomie** : suis la sous-checklist « Déployer en prod » de la fiche jour 6, **vérifie à chaque palier** avant de passer au suivant, et colle tes erreurs à Claude Code (Supabase CLI, build Vercel, login qui boucle). N'appelle le tuteur que si vraiment bloqué après 2 essais.

## Jour 10 — Roue libre
- **📅 Demain — test croisé (vous êtes vos premiers vrais utilisateurs)** : crée un compte sur **HuntFlow** (le SaaS de Matis) et donne-lui ton avis honnête. Et sur **Pickify**, faites le **test multi-utilisateur** : vous créez chacun un compte et vérifiez que vous pouvez **rejoindre la même partie** tous les deux — c'est LE test qui valide ton matchmaking + ta RLS read-all **en prod, avec 2 vrais users**.
- **🔧 Débugge ton Stripe en prod avec Matis** (il l'a fait marcher) : vérifiez ensemble les clés Stripe dans Vercel, le **webhook** (URL + secret) et les price IDs ; testez la carte `4242` → le compte doit passer en **Pro**.
- **💬 Piste d'évolution : un chat une fois qu'on a rejoint une partie** — la coordination (« on se retrouve où ? à quelle heure ? ») qui donne envie de revenir. Faisable avec **Supabase Realtime** + une table `messages` liée à la dispo.
- 🥇 **Montre Pickify à de vrais ados basketteurs** : est-ce qu'ils l'utiliseraient vraiment ? Ça teste ta vraie limite (le réseau) — plus précieux que n'importe quelle feature.
- **Le système de réputation** que tu avais mis en hors-scope (noter un joueur après une partie) — la couche de confiance qui manque à ton appli.
- **Notifications** quand quelqu'un rejoint ta dispo.
- **Dispos récurrentes** (« tous les mercredis 18h »).
- Rappel : c'est un **menu, pas une to-do**. Choisis UNE chose et finis-la bien.
- **🗓️ Tes 2 derniers jours** : **demain** → d'abord débug Stripe avec Matis, puis livre **1 amélioration finie** (le chat) + test croisé. **Le dernier jour** → montre Pickify à de **vrais ados sur un terrain** (pas le binôme, pas le tuteur) : « tu l'utiliserais pour trouver une partie ? » → note les retours dans `livrables/retours-users.md`. Pour toi c'est **LE** test : il répond à la vraie question de Pickify — le concept réseau tient-il ?
