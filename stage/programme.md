# Programme du stage — construis ton SaaS en 2 semaines

*Planning jour par jour, de l'idée à la production, avec l'aide de l'IA.*

## 1. Bienvenue dans le stage

Pendant les deux prochaines semaines, tu vas vivre l'aventure complète d'un fondateur de SaaS : trouver une idée, comprendre ton marché, dessiner ton produit, le coder, le déployer en production, et le présenter. À la fin, tu auras un vrai produit en ligne, accessible avec une URL, que tu pourras montrer à tes amis et ajouter à ton CV.

Pas besoin d'être un expert en informatique : tu vas travailler en binôme avec une intelligence artificielle (Claude) qui va t'aider à réfléchir, à écrire ton code, et à debugger. L'objectif n'est pas de devenir un développeur en 10 jours — c'est de comprendre comment on construit un produit numérique de bout en bout, et d'apprendre à collaborer efficacement avec l'IA.

### Le contexte du stage

Tu es en stage chez un entrepreneur qui, dans son quotidien, scoute des idées de SaaS. Pendant ces deux semaines, tu n'es pas un élève à qui on fait passer le temps : tu es chargé d'identifier une opportunité business, de la prototyper jusqu'à un produit en ligne, et de défendre devant ton tuteur que ça vaut la peine d'aller plus loin.

Concrètement, à la fin du stage, ton tuteur évalue ton projet avec une grille d'investisseur. Si le projet le convainc, il peut décider de te soutenir au-delà du stage : te mentorer une heure par semaine, te présenter à des personnes utiles dans son réseau. Si le projet est moyen, tu repars quand même avec un produit en ligne, un vrai apprentissage technique, et un rapport de stage solide.

**Conséquence :** ton idée doit être prise au sérieux dès le jour 2. Ce n'est pas un exercice scolaire, c'est une mini-mission de scouting. La barre est plus haute, mais l'enjeu aussi.

### Les règles du jeu

- Chacun construit SON propre SaaS, sur SON idée. Vous pouvez vous entraider, mais les projets sont indépendants.
- Le SaaS doit coûter zéro euro en infrastructure (Vercel + Supabase, plans gratuits).
- Pas de génération d'image ni de vidéo par IA dans le produit (ça coûte de l'argent).
- Tout doit être déployé en production à la fin du stage, avec un vrai nom de domaine .vercel.app.
- Le code est sur GitHub dans un repo privé (Makerkit est sous licence), partagé avec ton tuteur, avec un README propre.
- À la fin de chaque journée, tu clôtures ton étape : une branche jour[x]-étape (ex. jour3-marche), un commit de tous tes changements, et une Pull Request vers la branche develop que ton tuteur relit le soir.

> **La règle d'or : tu n'as jamais fini seul.** Si tu es en avance, tu aides ton binôme — tu le débloques, tu lui expliques, tu relis son code, mais tu ne codes jamais à sa place. L'entraide est vue d'un bon œil par le tuteur, jamais comme un désavantage : on retient mieux ce qu'on sait expliquer.

### Ce que tu vas apprendre

- Ce qu'est un SaaS et pourquoi ce modèle a transformé l'économie du logiciel.
- Comment trouver une idée de produit qui résout un vrai problème.
- Comment analyser un marché et te positionner face aux concurrents.
- Les bases du design d'interface et la création d'une landing page convaincante.
- Comment utiliser Git et GitHub au quotidien (branches, commits, Pull Requests vers develop) et travailler avec un assistant de code (Claude Code).
- Comment Docker permet de faire tourner une base de données complète sur ta machine.
- Comment déployer un site web en production avec Vercel.
- Comment gérer une base de données et l'authentification utilisateur avec Supabase.
- Comment Stripe gère les paiements et les abonnements d'un SaaS (en mode test).

## 2. Vue d'ensemble du stage

Le stage est découpé en deux semaines bien distinctes : une semaine pour penser le produit, une semaine pour le construire.

### La stack que tu vas utiliser

Pour la semaine 2, tu pars d'un boilerplate (= un projet de démarrage tout prêt) appelé Makerkit. L'objectif n'est pas d'apprendre Makerkit en lui-même, mais de comprendre ce qu'il y a à l'intérieur :

- **Docker** — un outil qui fait tourner Supabase complètement sur ta machine, comme un mini-serveur. Tu peux développer sans connexion internet.
- **Next.js** — le framework qui construit les pages de ton site et l'interface utilisateur.
- **Supabase** — la base de données qui stocke les utilisateurs et leurs données, avec une auth complète prête à l'emploi.
- **Stripe** — le service qui gère les paiements et les abonnements. Tu l'utiliseras en mode test (aucune somme réelle ne sera prélevée).
- **Vercel** — le service qui met ton SaaS en ligne, avec une URL publique, déploiement automatique à chaque push GitHub.

Tu retrouveras le détail de chacun dans la Boîte à outils. L'avantage de partir d'un boilerplate : l'auth, la structure de pages, les composants UI, la facturation Stripe, sont déjà câblés. Tu te concentres sur ce qui rend TON SaaS unique : tes features, tes données, ton design.

### Semaine 1 — Penser : du concept à la maquette

| Jour | Thème | Sortie attendue |
|---|---|---|
| Lundi | Lancement, ambitions & SaaS | Ambitions posées, modèle SaaS compris, setup et repo de travail prêts |
| Mardi | Idée et problème | Une idée de SaaS écrite en une phrase, avec le problème qu'elle résout |
| Mercredi | Marché et positionnement | Analyse des concurrents et fiche de positionnement |
| Jeudi | Landing page | Maquette de la landing page (design) |
| Vendredi | Design system | Landing page finalisée + design system documenté |

### Semaine 2 — Construire : du code à la production

| Jour | Thème | Sortie attendue |
|---|---|---|
| Lundi | Setup local + Vercel | Produit personnalisé (nom, couleurs, TA landing) déployé sur Vercel — la stack locale tourne depuis le jour 1 |
| Mardi | Tes features par-dessus | Les 3 features clés codées dans la structure existante |
| Mercredi | Tables et RLS | Tes propres tables Supabase, RLS actives, données qui persistent par user |
| Jeudi | Polish et tests | Design appliqué, bugs corrigés, expérience utilisateur soignée |
| Vendredi | Prod, Stripe test, présentation | Migrations en prod, parcours d'upgrade Stripe en test, README, présentation 5 min |

## 3. Semaine 1 — Penser le produit

### Jour 1 — Lancement : ambitions, découverte du SaaS et setup

**Durée** — Journée complète (6h)

**Objectifs**

- Faire le point sur tes ambitions : le métier que tu vises, le revenu mensuel que tu veux atteindre, et tes projets déjà en cours.
- Comprendre ce qu'est un SaaS et en quoi c'est différent d'un logiciel classique.
- Identifier les SaaS que tu utilises déjà sans le savoir.
- Découvrir l'écosystème (founders, indie hackers, Y Combinator, Product Hunt).
- Installer ton environnement et cloner ton repo de travail déjà prêt (comptes, Claude Code, Docker).

**Déroulé**

- 9h-10h : Lancement et point ambitions (avec le tuteur). Tour de table : le métier que tu vises, le revenu mensuel que tu veux atteindre, les projets que tu as déjà en cours. On en tire le fil rouge du stage : ton SaaS doit servir TON ambition.
- 10h-11h : Lis la section « Qu'est-ce qu'un SaaS ? » de la Boîte à outils, puis liste 10 SaaS que tu utilises (Spotify, Discord, Canva, Notion, ChatGPT…) en une phrase chacun.
- 11h-12h : Explore Product Hunt (producthunt.com) et note 5 SaaS lancés récemment qui t'intriguent. Le tuteur reste joignable jusqu'à midi.
- 13h-16h : Setup (en autonomie). Crée tes comptes : GitHub, Vercel, Supabase, Stripe (mode test), Claude.ai. Installe VS Code, Claude Code et Docker Desktop. Clone ton repo de stage déjà prêt (le tuteur l'a monté avec Makerkit, les guides et la branche develop) : c'est ton espace de travail, et c'est sur develop qu'arriveront tes PR de chaque jour.
- 16h-17h : Une fois ton setup terminé, regarde 2-3 vidéos d'indie hackers sur YouTube (chaînes : Indie Hackers, Pieter Levels, Marc Lou).

**Livrable du jour** — Un fichier jour1.md dans ton dossier de stage, contenant : tes ambitions (métier visé, revenu mensuel cible, projets en cours), ta liste de 10 SaaS, les 5 SaaS Product Hunt qui t'intriguent, et 3 idées de problèmes que toi ou tes amis rencontrez au quotidien. + Setup prêt : comptes créés (GitHub, Vercel, Supabase, Stripe test, Claude.ai), VS Code, Claude Code et Docker Desktop installés, repo de stage (monté par le tuteur) cloné en local. + Clôture du jour : branche jour1-lancement-setup, commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Explique-moi en termes simples ce qu'est un SaaS, avec 3 exemples adaptés à un lycéen, et la différence avec un logiciel qu'on installe.
- Aide-moi à identifier les SaaS cachés dans mon usage quotidien d'internet.
- Je suis sous [Mac/Windows]. Guide-moi pas à pas pour installer VS Code, Claude Code et Docker Desktop, créer mes comptes (GitHub, Vercel, Supabase, Stripe test) et cloner mon repo de stage déjà prêt.

### Jour 2 — Trouver SON idée + premier business case

**Durée** — Journée complète (6h)

**Objectifs**

- Apprendre la méthode « problème d'abord, solution ensuite ».
- Générer un maximum d'idées (vise 20) et en sélectionner 1.
- Construire un mini business case : qui paye, combien, quel chiffre d'affaires possible.
- Formuler son idée en une phrase claire (pitch en 10 secondes).

**Déroulé**

- 9h-10h : Lis la section « Comment trouver une idée » de la Boîte à outils. Note la liste des idées les plus 'investissables' (B2B, niches qui payent).
- 10h-12h : Brainstorming. Pars de tes 3 problèmes du jour 1, croise-les avec la liste d'idées de la Boîte à outils, et écris un maximum d'idées personnelles SANS les juger ni les analyser — la quantité d'abord. Vise 20, mais 12 idées honnêtes valent mieux que 20 bâclées.
- 13h-14h : Élague et qualifie. Raye les doublons et les gadgets pour garder ~10 idées. Pour ces 10 seulement, réponds : qui paie ? combien ? un seul utilisateur ou un acheteur qui paie pour plusieurs (B2B) ? Puis note chaque survivante sur 5 critères : 1) résout un vrai problème, 2) constructible en 1 semaine, 3) respecte zéro coût d'infra, 4) il existe des gens qui PAYERAIENT, 5) tu pourrais trouver 3 utilisateurs payants en 1 mois.
- 14h-15h : Garde les 3 meilleures. Pour chacune, fais le calcul : « Pour atteindre 1 000 € de revenus mensuels, j'ai besoin de combien de clients ? À quel prix ? Est-ce réaliste ? ».
- 15h-16h : Présente tes 3 idées à ton binôme. Choisis-en une.
- 16h-17h : Rédige ta one-liner « [Nom] aide [public cible] à [bénéfice] sans [problème actuel] » + ton business case en 5 lignes (cible, prix, seuil de viabilité, premiers clients possibles).

**Livrable du jour** — Un fichier livrables/idee.md avec : ta one-liner, le problème résolu, le public cible, le business case (qui paie / combien / objectif 1 000 €/mois en X clients), et 3 raisons pour lesquelles tu crois en cette idée. + Clôture du jour : branche jour2-idee, un jour2.md (récap : fait / bloqué / appris), commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Voici 3 problèmes que je rencontre : [...]. Aide-moi à explorer 5 idées de SaaS pour chacun, EN PRIORITÉ des idées B2B ou des niches qui ont l'habitude de payer (TPE, professions libérales, asso, profs, clubs amateurs). Pour chaque idée, propose : 1) qui paie, 2) un prix mensuel raisonnable, 3) le nombre de clients pour faire 1 000 €/mois.
- Voici mon idée : [...]. Joue le rôle d'un investisseur sceptique. Donne-moi 5 raisons pour lesquelles tu n'investirais pas. Puis 5 manières de la rendre plus investissable sans trahir l'idée d'origine.
- Aide-moi à construire un business case en 5 lignes : prix mensuel, nombre de clients pour 1 000 €/mois, taille du marché adressable, premiers clients accessibles, hypothèse de croissance prudente.

### Jour 3 — Analyse de marché et positionnement

**Durée** — Journée complète (6h)

**Objectifs**

- Identifier les concurrents directs et indirects.
- Comprendre comment se différencier.
- Construire une fiche de positionnement claire.

**Déroulé**

- 9h-10h : Lis la section « Analyse de marché » de la Boîte à outils.
- 10h-12h : Cherche 5 à 10 concurrents (Google, Product Hunt, Reddit, X). Pour chacun : nom, prix, public cible, point fort, point faible.
- 13h-14h : Construis un tableau comparatif (en utilisant la matrice fournie dans la Boîte à outils).
- 14h-15h : Identifie ton angle différenciant. Réponds à : « Pourquoi un utilisateur me choisirait-il plutôt qu'un concurrent ? »
- 15h-16h : Définis ta « value proposition » en suivant le canevas fourni.
- 16h-17h : Rédige ton positionnement et fais-le relire par ton binôme.

**Livrable du jour** — livrables/marche.md (concurrents + angle + value proposition). + Clôture du jour : branche jour3-marche, un jour3.md (récap : fait / bloqué / appris), commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Voici mon idée : [...]. Aide-moi à identifier 8 concurrents directs et indirects, avec pour chacun leur prix, public cible, et faiblesse.
- Voici ma value proposition : [...]. Joue le rôle d'un utilisateur sceptique et trouve les 5 raisons pour lesquelles je ne te convaincrais pas.

### Jour 4 — Landing : design system, copy & Claude Design

**Durée** — Journée complète (6h)

**Objectifs**

- Comprendre l'anatomie d'une landing page qui convertit.
- Rédiger le copy à partir de son positionnement, et fixer un premier design system.
- Générer une première landing avec Claude Design (pas de HTML codé à la main).

**Déroulé**

- 9h-10h : Étudie 3 landing pages de référence (Linear, Notion, Vercel). Note la structure : hero, social proof, features, témoignages, pricing, CTA.
- 10h-11h : Fixe tes tokens (couleurs, 1-2 polices) avec Realtime Colors / tweakcn / UI Colors, et reporte-les dans livrables/design-system.md (brouillon).
- 11h-12h30 : Rédige le copy de ta landing section par section, à partir de ta value proposition et ton positionnement (marche.md). Choisis aussi ton nom et ton logo (texte stylisé, pas d'image IA).
- 13h30-15h30 : Génère ta landing avec Claude Design en lui passant concept (idee.md) + value prop/positionnement (marche.md) + tes tokens + ton copy.
- 15h30-17h : Itère en langage naturel dans Claude Design (3-4 allers-retours) jusqu'à un premier rendu qui te plaît.

**Livrable du jour** — livrables/design-system.md (brouillon) + le copy de ta landing + ta première landing générée dans Claude Design (export ou lien). + Clôture du jour : branche jour4-landing, un jour4.md (récap : fait / bloqué / appris), commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Voici ma value proposition : [...]. Rédige-moi le texte d'une landing page avec : un hero (titre + sous-titre + CTA), 3 features clés, une section social proof factice mais réaliste, un pricing simple, et un CTA final.
- (Claude Design) Voici mon concept (idee.md) + ma value prop/positionnement (marche.md) + mon design system + mon copy : génère une landing moderne 2025, responsive, qui respecte exactement mes tokens. Hero = ma value proposition. Pas d'image générée.

### Jour 5 — Finaliser le design system + la landing

**Durée** — Journée complète (6h)

**Objectifs**

- Comprendre ce qu'est un design system et pourquoi c'est essentiel.
- Documenter ses choix (couleurs, typographies, composants).
- Polir la landing page jusqu'à un rendu pro.

**Déroulé**

- 9h-10h30 : Lis la section « Design system » de la Boîte à outils. Inspire-toi de shadcn/ui (ui.shadcn.com).
- 10h30-12h : Finalise livrables/design-system.md : tous les tokens (couleurs, graisses, échelle de tailles, radius, ombres, composants avec états). C'est la spec.
- 13h30-15h : Itère ta landing dans Claude Design en lui repassant ton design system finalisé (sections, espacements, hiérarchie).
- 15h-16h : Teste ton site sur mobile (chrome devtools) et corrige les problèmes responsive.
- 16h-17h : Récap de la semaine 1. Présente à ton binôme et au tuteur ce que tu as fait. Prépare la transition vers la semaine 2.

**Livrable du jour** — livrables/design-system.md complet (spec-tokens), landing finalisée, responsive, et exportée (option « handoff vers Claude Code » repérée pour le jour 6). + Clôture du jour : branche jour5-design-system, un jour5.md (récap : fait / bloqué / appris), commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Aide-moi à compléter mon livrables/design-system.md en spec complète (couleurs avec rôles, graisses, échelle de tailles, radius, ombres, composants avec états hover/focus/disabled), et à mapper ces tokens sur les variables shadcn de mon projet.
- Améliore le responsive de cette page : sur mobile (320-480px), le hero doit rester lisible et le CTA cliquable sans scroll horizontal.

## 4. Semaine 2 — Construire le produit

### Jour 6 — Setup technique : faire tourner le projet en local

**Durée** — Journée complète (6h)

**Objectifs**

- Comprendre la stack et ce que chaque outil fait.
- Faire tourner le projet en local : Docker → Supabase local → Next.js.
- Maîtriser les commandes Git essentielles.
- Déployer une première version en prod sur Vercel.

**Déroulé**

- 9h-9h45 : Briefing stack. Le tuteur explique l'archi : Docker fait tourner Supabase (DB + auth) sur ta machine, Next.js sert l'app dans le navigateur, Stripe gère le paiement, Vercel mettra tout en ligne.
- 9h45-10h30 : Ouvre ton repo (déjà cloné au Jour 1). Il contient déjà Makerkit : Next.js 16, Tailwind, Supabase configuré, auth, billing Stripe câblé, dashboard. Lance « pnpm install ».
- 10h30-11h30 : Démarre Docker Desktop. Lance Supabase en local avec « pnpm supabase:start ». Tu obtiens une URL locale, une clé anon, et un dashboard Supabase Studio sur localhost:54323.
- 11h30-12h30 : Lance « pnpm dev ». Ouvre localhost:3000 : tu vois déjà une app fonctionnelle avec login, dashboard, page de pricing. Crée-toi un compte test, explore l'app.
- 13h30-15h : Personnalise ton produit : le nom, le logo texte, les couleurs principales (variables CSS). Commit et push tes changements sur ta branche du jour.
- 15h-16h : Branche le projet à Vercel. Récupère les variables d'env du fichier .env.local ; crée un projet Supabase « cloud » gratuit ; recopie ses clés dans Vercel pour que la prod ait sa propre DB.
- 16h-17h : Vérifie que le déploiement marche, que tu peux te connecter en prod. Push une petite modif, regarde la prod se mettre à jour automatiquement.

**Livrable du jour** — Le boilerplate tourne en local (Docker + Supabase + Next.js), il est sur ton GitHub, et il est déployé en prod sur Vercel avec une URL publique. Tu peux te connecter en local ET en prod. + Clôture du jour : branche jour6-setup-technique, un jour6.md (récap : fait / bloqué / appris), commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Je suis sous [Mac/Windows]. Guide-moi pour : 1) installer Docker Desktop, 2) installer pnpm, 3) cloner ce repo, 4) lancer « pnpm install ». Explique chaque étape comme à un débutant.
- Mon projet utilise Supabase en local via Docker. Quand je lance « pnpm supabase:start », j'obtiens [colle la sortie]. Explique-moi ce que chaque URL fait, et comment je m'y connecte avec mon code.
- Je veux mettre ce projet sur Vercel. Voici mon .env.local : [LISTE LES NOMS DES VARIABLES, PAS LES VALEURS]. Guide-moi : créer un projet Supabase cloud, récupérer les clés, les ajouter dans Vercel, et déployer.

### Jour 7 — MVP — coder TES features par-dessus le boilerplate

**Durée** — Journée complète (6h)

**Objectifs**

- Lister les 3 features minimales qui définissent ton produit.
- Comprendre où ajouter ton code dans la structure du projet.
- Coder une première version fonctionnelle de tes features.

**Déroulé**

- 9h-10h : Liste les features de ton MVP. Garde-en exactement 3 (pas plus). Écris-les dans livrables/mvp.md (= ton wedge du jour 2).
- 10h-11h : Explore la structure du projet. Identifie où vivent les pages, les composants, les routes API. Demande à Claude Code de t'expliquer ce que fait chaque dossier.
- 11h-12h30 : Première feature. Crée la page dans apps/web/app/[locale]/home/(user)/[ta-feature]/page.tsx (l'espace compte personnel). Pour aujourd'hui, stocke les données en mémoire React — on branchera Supabase demain.
- 13h30-15h : Deuxième feature. Push sur GitHub à chaque étape qui marche.
- 15h-17h : Troisième feature. À la fin de la journée, ton produit est utilisable bout en bout (même si les données ne persistent pas encore).

**Livrable du jour** — Tes 3 features ajoutées au projet, fonctionnelles localement (les données disparaissent au refresh, c'est normal pour aujourd'hui). Push à jour sur GitHub. + Clôture du jour : branche jour7-mvp, un jour7.md (récap : fait / bloqué / appris), commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Voici la structure de mon projet : [colle la sortie de « ls » ou demande à Claude Code de l'explorer]. Explique-moi où je dois créer une nouvelle page protégée par login pour ma feature [description].
- Je veux ajouter cette feature : [description précise en termes utilisateur]. Stocke les données dans un useState pour l'instant. Respecte le style des composants déjà présents dans /components. Code la page complète.
- Cette feature ne marche pas comme prévu : [bug observé]. Voici la console : [...]. Diagnostique étape par étape.

### Jour 8 — Base de données : tes propres tables et leurs règles de sécurité

**Durée** — Journée complète (6h)

**Objectifs**

- Concevoir le schéma de données de tes features.
- Créer tes tables avec une migration SQL versionnée.
- Activer les Row Level Security (RLS) pour que chaque user ne voie que SES données.
- Brancher tes features à la DB et vérifier la persistance.

**Déroulé**

- 9h-10h : Auth déjà gérée par le boilerplate (super). Ce qu'il te reste à faire : tes propres tables. Dessine ton schéma sur papier : quelles entités, quelles colonnes, quelles relations ?
- 10h-11h30 : Crée un fichier de migration SQL dans apps/web/supabase/migrations. Tu y mets : tes CREATE TABLE + tes RLS policies. Lance « pnpm supabase:reset » pour appliquer.
- 11h30-12h30 : Ouvre Supabase Studio (localhost:54323) et vérifie que tes tables apparaissent avec les bonnes colonnes.
- 13h30-15h30 : Migre ta première feature : remplace le useState par des appels Supabase (createServerClient, .from('table').insert/.select). Teste : se connecter, créer une donnée, recharger la page, elle est toujours là.
- 15h30-17h : Migre les 2 autres features. Pour chacune, vérifie qu'avec un autre compte tu ne vois PAS les données du premier (test RLS).

**Livrable du jour** — Tes tables existent en local avec RLS actives. Les 3 features persistent les données par utilisateur. Tu peux te déconnecter, te reconnecter, et retrouver tes données. + Clôture du jour : branche jour8-db, un jour8.md (récap : fait / bloqué / appris), commit et PR sur develop (que le tuteur relit le soir).

**Prompts à utiliser**

- Mes 3 features sont : [description]. L'auth est déjà gérée (table auth.users, l'id utilisateur est dispo via auth.uid()). Donne-moi le SQL complet pour : 1) les tables nécessaires avec foreign keys vers auth.users, 2) les RLS policies (SELECT/INSERT/UPDATE/DELETE) pour que chaque user ne voie que SES données.
- Voici ma feature qui utilise useState : [colle code]. Migre-la pour qu'elle lise/écrive dans la table [nom] de Supabase, en respectant la convention du projet (createServerClient côté serveur, requêtes via une server action). Garde le même UX.
- J'ai un message d'erreur RLS quand je tente d'insérer : [colle erreur]. Diagnostique ma policy et corrige.

### Jour 9 — Finitions, Stripe, déploiement final & pitch (jours 9 + 10 fusionnés)

**Durée** — Journée complète (les deux dernières étapes structurées, condensées car les stagiaires sont en avance).

**Objectifs**

- Corriger les bugs et soigner l'UX (design system partout, états vides et messages d'erreur).
- Brancher la **facturation Stripe** en mode test (obligatoire).
- Déployer la **version finale** en prod et vérifier le parcours bout en bout.
- Rédiger le README produit et préparer le **pitch** avec un « ask » concret.

**Déroulé**

- **Finitions** : tour critique du produit → `livrables/bugs.md` ; corrige par ordre de gravité (push à chaque fix) ; applique le design system ; soigne les états vides et les messages d'erreur ; fais tester par 2-3 personnes et intègre les retours.
- **Stripe (mode test, obligatoire)** : crée un compte test, 2 produits (Free + Pro), récupère les **price IDs**, renseigne clés + price IDs dans la config billing **et** dans Vercel, configure le **webhook**, teste l'upgrade avec la carte `4242 4242 4242 4242` → le compte passe en Pro.
- **Déploiement final** : pousse tes migrations en prod (Supabase cloud) + vérifie tes RLS en ligne ; vérifie toutes les variables d'env Vercel ; teste le parcours complet **EN PROD** (inscription → login → tes 3 features → upgrade Stripe → données qui persistent).
- **Pitch** : `README.md` produit (pitch, capture, stack, lien prod, lancer en local) ; `livrables/pitch.md` (pitch 5 min + ton « et après ? ») ; présentation finale au tuteur (grille d'investisseur).

**Livrable du jour** — Produit **v1.0 déployé en prod** avec Stripe test fonctionnel, `livrables/bugs.md`, `README.md` produit et `livrables/pitch.md`. Clôture : branche `jour9-final`, récap, commit et **PR sur develop que TU merges toi-même**.

**Prompts à utiliser**

- Voici ma page principale : [colle le code]. Audite-la avec l'œil d'un designer pro et liste 10 améliorations concrètes (espacements, tailles, hiérarchie visuelle).
- Voici un bug : [description + capture console]. Diagnostique et corrige.
- (Stripe) Utilise le prompt « Brancher Stripe en test » de la Boîte à outils.
- Voici mon SaaS : [nom, pitch, business case, stack, URL prod]. Rédige le `README.md` GitHub, puis aide-moi à préparer un pitch 5 min avec un « ask » réaliste pour la suite.

### Jour 10 — Roue libre

**Durée** — Le temps restant, libre.

C'est ton produit : **plus de fiche imposée**. Améliore-le comme tu veux — une 4e feature de ton hors-scope, du polish (animations, responsive, accessibilité), de la performance, du marketing (montrer le produit à de vrais utilisateurs), un petit dashboard de stats… Cadre léger : branches `roue-libre-...`, PR que **tu merges toi-même**, **ne casse pas la prod** (le pre-commit + Vercel te protègent), reste dans **ta zone**. Le but : t'approprier ton produit et **prendre du plaisir**.

## 5. Critères d'évaluation

Le stage est réussi si, à la fin, le stagiaire peut cocher ces 10 cases :

| # | Critère | Validation |
|---|---|---|
| 1 | Une idée claire | Le stagiaire peut pitcher son SaaS en 30 secondes sans hésiter. |
| 2 | Un business case | Il sait dire qui paye, à quel prix, et combien de clients pour 1 000 €/mois. |
| 3 | Un marché compris | Il connaît au moins 5 concurrents et son angle de différenciation. |
| 4 | Une landing page | En ligne, responsive, qui donne envie de cliquer sur le CTA. |
| 5 | Un design system | Documenté dans le repo, appliqué sur le produit. |
| 6 | Un produit fonctionnel | Au moins 3 features qui marchent, sans bug bloquant. |
| 7 | Une base de données | Tables propres avec RLS testées : un user ne voit que ses données. |
| 8 | Un parcours billing | Stripe en mode test : la carte 4242 4242 4242 4242 fait passer un user en plan Pro. |
| 9 | En production | Déployé sur Vercel, URL publique, login et données qui persistent en prod. |
| 10 | Sur GitHub + ask | Repo privé partagé avec le tuteur, README pro, une PR par jour mergée sur develop, et un « ask » concret pour la suite formulé au pitch final. |
