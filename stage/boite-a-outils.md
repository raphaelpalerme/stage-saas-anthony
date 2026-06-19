# Boîte à outils du stagiaire

*Tout ce dont tu as besoin pour construire ton SaaS : concepts, méthodes, idées, stack, prompts.*

## Sommaire

- 1. Qu'est-ce qu'un SaaS ?
- 2. Comment trouver une bonne idée
- 3. 20 idées de SaaS clés en main
- 4. Comment faire une analyse de marché
- 5. Comment se positionner (value proposition)
- 6. Le design system expliqué simplement
- 7. La stack technique : Docker, Next.js, Supabase, Stripe, Vercel
- 8. Le boilerplate Makerkit : ce qui est déjà fait pour toi
- 9. Les comptes et installations à faire (tous gratuits)
- 10. Prompts Claude prêts à l'emploi
- 11. Cheat sheet Git et GitHub
- 12. Glossaire
- 13. Ressources pour aller plus loin

## 1. Qu'est-ce qu'un SaaS ?

SaaS veut dire « Software as a Service », ce qui se traduit par « logiciel en tant que service ». C'est tout simplement un logiciel auquel tu accèdes par internet, depuis ton navigateur, sans avoir à l'installer.

### Avant le SaaS, après le SaaS

Avant, pour utiliser Word, il fallait acheter un CD, l'installer sur son ordinateur, et payer la nouvelle version chaque année. Aujourd'hui, tu te connectes à Google Docs depuis n'importe quel navigateur, tu paies (ou pas) un abonnement mensuel, et tu accèdes à tes documents depuis n'importe quel appareil.

### Les 4 caractéristiques d'un SaaS

- **Hébergé en ligne.** Le code tourne sur un serveur, pas sur ta machine. Toi tu n'as qu'un navigateur.
- **Multi-utilisateurs.** Plein de personnes peuvent l'utiliser en même temps, chacune avec son compte et ses données.
- **Mis à jour en continu.** Quand l'éditeur ajoute une feature, tout le monde y a accès immédiatement.
- **Modèle économique récurrent.** On paie un abonnement (mensuel ou annuel), pas une licence à vie. Souvent un plan gratuit + des plans payants.

### Exemples de SaaS que tu utilises peut-être

| Produit | Ce qu'il fait | Pour qui |
|---|---|---|
| Spotify | Stream de musique sans téléchargement | Tout le monde, ado en tête |
| Notion | Notes, bases de données, wiki d'équipe | Étudiants, startups |
| Canva | Design graphique sans Photoshop | Non-designers, écoles, marketers |
| Discord | Chat vocal et textuel par communautés | Gamers, communautés |
| ChatGPT | Assistant conversationnel par IA | Tout le monde |
| Calendly | Prise de rendez-vous automatisée | Pros, freelances |

### Pourquoi le SaaS est devenu le modèle dominant

- Pour les utilisateurs : pas d'installation, accessible partout, mises à jour automatiques.
- Pour les éditeurs : revenus prévisibles (abonnement), une seule version à maintenir, déploiement instantané des correctifs.
- Pour les développeurs débutants : on peut lancer un SaaS depuis sa chambre avec quelques outils gratuits, et avoir des utilisateurs partout dans le monde en moins d'une semaine.

## 2. Comment trouver une bonne idée

Une bonne idée de SaaS ne tombe pas du ciel. Elle vient presque toujours d'un problème que tu rencontres toi-même, ou que rencontre quelqu'un que tu observes.

### La règle d'or : problème d'abord, solution ensuite

Le piège classique du débutant est de partir d'une techno cool (« je veux faire un truc avec l'IA ») et de chercher un problème qui colle. Inversez. Pars d'un problème agaçant et cherche la solution la plus simple.

### 4 manières de trouver des idées

Méthode 1 — Tes propres frictions

Tiens un carnet pendant 3 jours. Note tout ce qui t'agace : un site lent, un prof qui rend les notes en retard, un planning illisible, une démarche fastidieuse. Chaque friction est une idée potentielle.

Méthode 2 — Observer ton entourage

Demande à 5 personnes différentes (un parent, un ami, un prof, un grand-parent, un petit frère) : « C'est quoi le truc le plus pénible dans ta semaine ? ». Tu seras surpris.

Méthode 3 — Reddit / Forums

Va sur r/Entrepreneur, r/Frugal, r/Productivity, r/college et lis les posts qui commencent par « Does anyone else struggle with… ». Chaque plainte récurrente est une idée.

Méthode 4 — Améliorer un SaaS existant

Prends un SaaS connu et identifie un sous-besoin qu'il traite mal. Notion gère mal les habitudes ? Construis un tracker d'habitudes minimal. Discord gère mal les sondages ? Construis un mini-Doodle pour serveurs Discord.

### Les critères d'une idée tenable en 1 semaine

| Critère | Bon signe | Mauvais signe |
|---|---|---|
| Périmètre | Une fonctionnalité bien définie | « Une plateforme tout-en-un » |
| Compréhension | Tu peux l'expliquer en 1 phrase | Tu mets 5 min à le décrire |
| Coût d'infra | Texte uniquement, pas d'image/vidéo IA | Génère 100 images par utilisateur |
| Marché | Tu connais 3 personnes qui l'utiliseraient | « Tout le monde en a besoin » |
| Tech | CRUD + auth + un peu de logique | Calculs lourds, IA spécialisée, scraping |

### Le test du « one-liner »

Si tu n'arrives pas à compléter cette phrase, ton idée n'est pas mûre :

« [Nom] aide [public cible] à [bénéfice] sans [problème actuel]. »

Exemple : « PrepMyOral aide les lycéens à préparer leur grand oral sans se sentir seul devant la page blanche. »

## 3. 20 idées de SaaS — du « gadget » à « investissable »

Toutes ces idées respectent les contraintes techniques : zéro coût d'infra (Vercel + Supabase), pas de génération d'image ni vidéo, faisables en 1 semaine de code par un débutant accompagné par l'IA.

Mais toutes ne se valent PAS du point de vue d'un investisseur. Une idée « gadget » plait au lycéen mais personne ne paye. Une idée « investissable » résout un problème pour quelqu'un qui a déjà l'habitude de payer (TPE, association, prof particulier, club sportif amateur, freelance).

**Les idées 1 à 5** sont des idées B2C lycéens — elles peuvent marcher mais elles sont dures à monétiser. **Les idées 6 à 20** sont B2B ou ciblent des niches qui ont l'habitude de payer — c'est ce que ton tuteur préférera voir.

| Idée | En quoi ça consiste | Pour qui | Concurrent |
|---|---|---|---|
| 1. Tracker d'habitudes lycéen | Une app pour suivre ses habitudes (sport, lecture, méditation, devoirs) avec une streak quotidienne et des stats. | Lycéens qui veulent se discipliner | Notion (trop générique) |
| 2. Carnet de révisions partagé | Flashcards collaboratives entre amis d'une même classe : chacun crée des cartes, tout le groupe révise. | Élèves d'une même classe | Anki (interface austère) |
| 3. Planificateur de devoirs | Liste les devoirs avec date limite, matière, et te dit chaque matin ce que tu dois faire en priorité. | Collégiens et lycéens | Pronote (pas de planification) |
| 4. Annuaire de stages de seconde | Plateforme où les élèves laissent un avis sur leur stage : intérêt, difficulté, accueil. Recherche par ville et secteur. | Élèves de seconde, profs | Aucun équivalent vraiment |
| 5. Mini-CRM pour cours particuliers | Pour les lycéens qui donnent des cours : suivi des élèves, paiements reçus, prochaines séances. | Lycéens qui donnent des cours | Excel |
| 6. Tracker de séries vue/à voir | Liste tes séries en cours, à voir, terminées, avec ta note. Recommandations entre amis. | Sériphiles, ados | BetaSeries (trop chargé) |
| 7. Budget étudiant | Suivi des dépenses (manuel) avec catégories, objectif d'épargne, et alerte quand on dépasse. | Étudiants, lycéens | Bankin (trop pro) |
| 8. Planificateur de soirées entre amis | Crée un évent, invite, vote la date, gère qui apporte quoi (style Doodle + Trello). | Lycéens qui organisent | Doodle (vieillot) + Telegram (chaos) |
| 9. Quiz collaboratifs en ligne | Crée un quiz, partage un lien, vois les réponses de tes amis en live (style Kahoot mais asynchrone). | Élèves, profs, animateurs | Kahoot (synchrone uniquement) |
| 10. Pomodoro avec stats | Timer Pomodoro qui enregistre tes sessions de travail et te montre tes stats par matière, semaine, mois. | Étudiants en révisions | Forest (pas de stats détaillées) |
| 11. Sondage entre amis « qui a fait quoi » | Pour les soirées : pose des questions anonymes, vois les résultats. (Type Polls.lol mais clean). | Groupes d'amis ados | Polls divers (souvent moches) |
| 12. Carnet de citations et livres | Note les livres lus, tes citations préférées, partage avec les amis qui suivent. | Lecteurs, lycéens littéraires | Goodreads (trop social media) |
| 13. Réservation de créneaux pour groupes | Salle de répét, terrain de basket, cuisine partagée : voir qui a réservé quand, réserver son créneau. | Asso, internats, colocs | Outlook (pour pros) |
| 14. Mini petites annonces interne lycée | Vendre/acheter livres, calculatrices, vêtements de sport entre élèves d'un même établissement. | Lycéens d'un même bahut | Vinted (trop large) + Le Bon Coin |
| 15. Suivi sportif simple | Log tes séances de sport (musculation, course, vélo), graphes de progression, sans complexité. | Sportifs amateurs | Strava (trop social) + Hevy |
| 16. Liste de souhaits cadeaux d'anniversaire | Crée ta wishlist, partage le lien avec ta famille, ils peuvent réserver un cadeau pour éviter les doublons. | Tout le monde aux fêtes | Mywishlist (vieillot) |
| 17. Rappels d'anniversaires + idées cadeaux | Liste des dates importantes de ton entourage, te rappelle 1 semaine avant, te suggère un format de message. | Adultes peu organisés | Calendrier basique |
| 18. Mini-CRM pour mini-entreprise lycée | Pour les projets « mini-entreprise » : leads, clients, factures, gestion stock simple. | Élèves Mini-Entreprise EPA | Excel |
| 19. To-do partagée pour colocs/famille | Liste de courses + tâches ménagères partagée, avec notification quand quelqu'un coche. | Familles, colocs | Notes Apple (pas de notif) |
| 20. Rétrospective hebdomadaire personnelle | Chaque dimanche, réponds à 5 questions (ce qui a marché, raté, à améliorer). Vois ta progression sur 3 mois. | Étudiants, jeunes pros | Notion (à construire soi-même) |

**Conseil :** Ces idées ne sont pas des ordres. Servent à donner le ton du « bon scope » et du « bon niveau d'investissabilité ». L'idéal reste de partir d'un problème personnel — mais en gardant en tête : qui paye ?

### Le business case minimal — 5 lignes obligatoires

Avant de valider ton idée au jour 2, tu dois pouvoir répondre à ces 5 questions. Si tu n'as aucune idée pour une seule, ton idée n'est pas mûre.

| Question | Exemple — mini-CRM pour profs particuliers |
|---|---|
| 1. Qui paye ? | Le prof particulier indépendant en auto-entreprise. Pas l'élève, pas le parent. |
| 2. Combien il paye ? | 9 € / mois (équivalent à 1 cours par mois — indolore pour lui). |
| 3. Combien de clients pour 1 000 € / mois ? | 1 000 / 9 = 112 profs particuliers payants. |
| 4. Quelle taille de marché ? | Environ 200 000 profs particuliers déclarés en France. 112 / 200 000 = 0,06 %. Très atteignable. |
| 5. Comment toucher les 5 premiers ? | DM Instagram avec #coursparticuliers, post Reddit r/Profs, demander à ses propres profs particuliers. |

### Estimer un marché en 5 minutes

Tu n'as pas besoin d'une étude McKinsey. Tu as besoin de chiffres « plausibles ordre de grandeur » :

- **Méthode 1 — Google.** « Combien de [ton public] en France » → souvent un chiffre INSEE ou sectoriel.
- **Méthode 2 — Claude.** « Estime le nombre de [public cible] en France. Donne ta source ou ton raisonnement. »
- **Méthode 3 — calcul de coin de table.** Clubs sportifs amateurs = 36 000 communes × 5 clubs/commune = 180 000 clubs. L'ordre de grandeur suffit.

### Le piège : confondre « avoir besoin » et « payer »

Beaucoup d'idées sont fascinantes mais personne ne paye :

- Les lycéens « ont besoin » d'un meilleur planificateur de devoirs → zéro lycéen paye 5 €/mois.
- Les sportifs amateurs « ont besoin » de suivi → ils utilisent l'app gratuite de leur montre.
- Les amis « ont besoin » d'un meilleur sondeur → un Google Form fait l'affaire.

À l'inverse, certains publics payent quasiment par réflexe :

- **Les pros qui en vivent.** Un kiné, un coach, un prof particulier en auto-entreprise paye 10-30 €/mois pour un outil qui lui économise 1h/semaine.
- **Les associations.** Toute asso a un budget annuel à dépenser. 50-200 € pour un outil utile, c'est trivial.
- **Les TPE / artisans.** Un plombier paye 30 €/mois pour Sellsy ou Henrri. Il paiera ton outil plus simple s'il existe.

## 4. Comment faire une analyse de marché

Faire une analyse de marché à ton niveau ne veut pas dire produire un rapport McKinsey. Ça veut dire : comprendre qui résout déjà ce problème, comment, et où il y a une place pour toi.

### Étape 1 : trouver les concurrents

- Tape ton problème dans Google. Note les 5 premiers résultats commerciaux.
- Va sur Product Hunt et cherche ton mot-clé : note les 3 produits les mieux upvotés.
- Cherche sur Reddit : « best app for [ton problème] » → tu verras les apps recommandées par de vrais utilisateurs.
- Cherche sur X (Twitter) : « anyone know a tool for [ton problème] ».
- Demande à Claude : « Donne-moi 8 concurrents pour une app qui [ton idée], avec leur prix, public cible, et faiblesse ». Vérifie ses réponses.

### Étape 2 : remplir la matrice de concurrents

Pour chaque concurrent, remplis ce tableau (mets-le dans ton fichier livrables/marche.md) :

| Nom | URL | Prix | Point fort | Point faible |
|---|---|---|---|---|
| Concurrent A | conc-a.com | Gratuit / 9€/mois | Très simple à prendre en main | Pas de mode collaboratif |
| Concurrent B | … | … | … | … |

### Étape 3 : identifier ton angle

À partir des points faibles récurrents, choisis ton angle. Il y a 4 grandes manières de se différencier :

- **Plus simple.** Les concurrents sont surchargés en options ? Fais un produit qui ne fait qu'une seule chose, mais bien.
- **Plus ciblé.** Les concurrents s'adressent à tout le monde ? Vise une niche ultra précise (ex : lycéens en seconde, pas « étudiants »).
- **Plus collaboratif.** Les concurrents sont solo ? Fais une version multi-joueurs / amis / famille.
- **Plus moderne.** Les concurrents ont une UI datée ? Refais le même produit avec un design 2025.

## 5. Comment se positionner (value proposition)

Le positionnement, c'est la place que ton produit occupe dans la tête de l'utilisateur. La value proposition, c'est la phrase qui résume cette place.

### Le canevas en 3 phrases

Réponds à ces 3 questions, et tu as ta value proposition.

- **Quel problème ?** Décris en 1 phrase la frustration de ton utilisateur cible.
- **Quelle solution ?** Décris en 1 phrase ce que ton produit fait, en évitant le jargon.
- **Quel bénéfice ?** Décris en 1 phrase l'impact concret pour l'utilisateur (gagner du temps, économiser, se sentir plus libre…).

### Exemple complet

**Produit :** Streakly, un tracker d'habitudes pour lycéens.

**Problème :** Les lycéens qui veulent prendre de bonnes habitudes (sport, méditation, lecture) abandonnent parce que les apps existantes sont conçues pour des adultes et leur paraissent ennuyeuses.

**Solution :** Streakly transforme tes habitudes en streaks à défier avec tes potes, comme Snapchat mais pour la discipline.

**Bénéfice :** Tu tiens enfin tes engagements parce que c'est devenu un jeu social.

### Le test du grand-parent

Lis ta value proposition à un grand-parent. S'il ne comprend pas après 1 lecture, simplifie. Pas de mots comme « plateforme », « écosystème », « solution ». Privilégie « app », « outil », « site ».

## 6. Le design system expliqué simplement

Un design system, c'est la « bible visuelle » de ton produit. Au lieu de redécider la couleur d'un bouton chaque fois, tu décides UNE FOIS, tu écris ça dans un fichier, et tu réutilises partout.

### Les 5 briques d'un design system minimal

1. La palette de couleurs

Choisis 4 à 6 couleurs maximum. Utilise un outil comme coolors.co ou demande à Claude une palette « moderne, calme, avec une couleur primaire bleu ».

- 1 couleur primaire (les boutons principaux, les liens)
- 1 couleur secondaire (accents, badges)
- 3 nuances de gris (texte, bordures, fonds)
- 1 couleur d'erreur (rouge), 1 couleur de succès (vert)

2. La typographie

Une seule police, deux maximum. Recommandation : Inter (gratuite via Google Fonts, marche partout).

- Tailles : Display (36px), H1 (28px), H2 (22px), corps (16px), petit (14px).
- Graisses : Régulier (400), Medium (500), Bold (700). Pas plus.

3. Les espacements

Choisis une échelle régulière : 4, 8, 12, 16, 24, 32, 48, 64 pixels. Tous tes paddings et marges utilisent ces valeurs uniquement.

4. Les composants

Définis le style de chaque composant qu'on retrouvera partout : bouton primaire, bouton secondaire, input, carte, modale. Plutôt que de tout réinventer, utilise shadcn/ui qui a déjà tous ces composants stylés et propres.

5. Les états

Pour chaque composant interactif, définis son état hover (au survol), focus (clavier), disabled (inactif), et loading (chargement). Sinon ton produit fera bricolé.

### Modèle de fichier livrables/design-system.md

```
# Design System — [Nom du produit]
## Couleurs

- Primaire : #2563eb
- Secondaire : #f59e0b
- Texte principal : #111827
- Texte secondaire : #6b7280
- Bordure : #e5e7eb
- Erreur : #dc2626  / Succès : #16a34a

## Typo : Inter — sizes : 36/28/22/16/14
## Spacings : 4 8 12 16 24 32 48 64
## Boutons primaires : bg primaire, text white, py-2 px-4, rounded-md
```

## 7. La stack technique : Docker, Next.js, Supabase, Stripe, Vercel

Cette stack est conçue pour que tu puisses construire un SaaS complet, en production, en zéro euro de coût (en mode test pour Stripe). Elle est utilisée par des milliers d'indie hackers qui en vivent.

### Les 5 briques essentielles

Ces 5 briques travaillent ensemble. Garde cette image en tête : Docker fait tourner Supabase chez toi pendant le développement, Next.js dessine les pages, Supabase stocke et authentifie, Stripe encaisse, Vercel met tout en ligne.

Docker (développement local)

Docker, c'est un outil qui permet d'exécuter une application dans une « boîte » isolée appelée conteneur. Pour notre stage, Docker te sert à faire tourner une copie complète de Supabase (base de données + auth + stockage) directement sur ta machine, sans connexion internet.

- Avantage : tu peux casser ta DB en local sans angoisse, tu repars d'une migration propre en 30 secondes.
- Avantage : tu n'utilises pas ton quota Supabase cloud pendant le dev.
- Limite : Docker consomme de la RAM (compter 4 Go libres au minimum).

Next.js (front + back en un)

Next.js est un framework basé sur React qui fait à la fois le front (les pages que voit l'utilisateur) et le back (les routes API qui parlent à la DB). Une seule techno, tout en TypeScript.

Supabase (DB + auth + storage)

Supabase est un service tout-en-un qui te donne : une base PostgreSQL, un système d'authentification complet (email, OAuth, Magic Link), du stockage de fichiers, et même du temps réel. C'est l'alternative open source à Firebase.

- Local : tourne dans Docker (offline).
- Cloud : projet gratuit créable en 2 minutes pour la prod.

Stripe (paiement et abonnements)

Stripe gère les paiements et les abonnements. Pour le stage, tu l'utilises en mode test : tu crées tes plans tarifaires (Free, Pro), tu connectes Stripe à ton SaaS, et tu valides que le parcours d'upgrade fonctionne avec une carte de test. Aucune somme réelle n'est prélevée.

- Mode test : carte 4242 4242 4242 4242 (n'importe quelle date future, n'importe quel CVC).
- Webhooks : Stripe envoie un message à ton serveur quand un user paye. Une CLI (« stripe listen ») permet de tester ça en local.

Vercel (mise en ligne)

Vercel est l'hébergeur qui met ton site en ligne. Il est créé par les mêmes personnes que Next.js, donc l'intégration est parfaite. Tu connectes ton repo GitHub à Vercel, et à chaque « git push », ta prod est mise à jour automatiquement en moins d'une minute.

### Vue d'ensemble

| Couche | Outil | À quoi ça sert |
|---|---|---|
| Dev local | Docker Desktop | Fait tourner Supabase et ses dépendances dans des conteneurs sur ta machine |
| Frontend + Backend | Next.js 16 (App Router) | Le framework qui sert ton site, ses pages, et ses routes API |
| Style | Tailwind CSS + shadcn/ui | Pour designer rapidement avec un look pro |
| Base de données | Supabase Postgres | Stocke les données de tes utilisateurs, gère les Row Level Security |
| Authentification | Supabase Auth | Magic Link, OAuth, MFA — déjà câblé dans le boilerplate |
| Paiement | Stripe (mode test) | Plans gratuit/Pro, parcours d'upgrade, webhooks de confirmation |
| Hébergement prod | Vercel (free tier) | Met ton site en ligne, déploiement auto à chaque push GitHub |
| Code source | GitHub (gratuit) | Versionne ton code, sauvegarde, collabore |
| Éditeur | VS Code + Claude Code | Là où tu écris ton code avec l'aide de l'IA |
| Langage | TypeScript | JavaScript avec des types, pour éviter des bugs bêtes |

### Pourquoi cette stack et pas une autre

- **Vercel + Next.js :** Vercel a créé Next.js. Tu pousses ton code sur GitHub, Vercel le déploie automatiquement. Plan gratuit largement suffisant.
- **Supabase :** Une base de données Postgres + une auth + un stockage de fichiers, gratuits, en quelques clics. Alternative open source à Firebase.
- **shadcn/ui :** Une bibliothèque de composants ultra propres, copiés dans ton code (pas une dépendance). Modifiables à volonté.
- **TypeScript :** Quand tu utilises une IA pour coder, le typage l'aide énormément à comprendre ton projet. Tes prompts deviennent plus efficaces.

### Limites du plan gratuit (à connaître)

- Vercel : 100 GB de bande passante/mois. Pour un projet de stage, on ne s'en approche jamais.
- Supabase : 500 MB de DB, 50 000 utilisateurs actifs/mois. Plus que largement assez.
- Si tu cartonnes : il sera temps de passer en payant. Mais ce n'est pas le sujet de ce stage.

## 8. Le boilerplate Makerkit : ce qui est déjà fait pour toi

Un boilerplate (ou « kit de démarrage »), c'est un projet pré-construit que tu télécharges pour ne pas tout réinventer. Pour le stage, on part de Makerkit, un boilerplate Next.js + Supabase qui contient déjà toutes les briques d'un SaaS pro.

**À retenir :** tu n'as pas besoin de tout comprendre du boilerplate. Ce qui compte, c'est de savoir CE QU'IL Y A DEDANS et OÙ ajouter ton code.

### Ce que le boilerplate fait pour toi (et que tu n'as donc pas à faire)

| Brique | Ce que ça t'évite de coder |
|---|---|
| Authentification | Pages login/signup, Magic Link, OAuth Google, mot de passe oublié, sessions, middleware de protection des routes — tout est en place. |
| Comptes utilisateurs | Profil, avatar, paramètres, suppression de compte, gestion email — déjà câblés. |
| Paiement Stripe | Page de pricing, parcours de checkout, gestion des webhooks, table d'abonnements en DB — il te reste à configurer tes prix dans Stripe. |
| Layout d'app | Sidebar, header, container responsive, mode clair/sombre, dashboard vide — prêt à recevoir tes pages. |
| Composants UI | 60+ composants shadcn/ui (boutons, modales, tableaux, formulaires, toasts) déjà stylés et utilisables. |
| Migrations SQL | Système de migrations Supabase versionnées : tu écris du SQL, tu le rejoues sur n'importe quelle DB. |
| RLS de base | Patterns de Row Level Security à copier pour tes propres tables — tu n'as qu'à adapter. |
| Scripts dev | « pnpm dev », « pnpm supabase:start », « pnpm supabase:reset » — toute la machinerie Docker est cachée derrière ces commandes simples. |

### Où vit TON code dans le projet

Pendant la semaine 2, tu n'iras quasiment que dans 3 endroits :

```
apps/web/app/[locale]/home/(user)/[ta-feature]/page.tsx  — c'est là que tu crées les pages de TES features (l'espace « compte personnel », protégé par login).
apps/web/supabase/migrations/[timestamp]_[ta-feature].sql  — c'est là que tu écris le SQL pour créer TES tables et leurs RLS.
packages/ui/src/[composants]  — si tu crées des composants réutilisables (rare en 1 semaine, surtout des composants à mettre dans la page directement).
```

Ne touche pas au dossier `[locale]` lui-même (c'est le système de langues, garde-le tel quel) : tu crées tes dossiers À L'INTÉRIEUR de `home/(user)/`.

### Ce que tu n'as PAS à toucher

- Le code d'authentification (sauf cas particulier) — il marche, ne le casse pas.
- Le code de billing Stripe — tu configures juste tes price IDs dans les variables d'env.
- Les configs Tailwind, Next.js, ESLint — laisse-les telles quelles.
- Le middleware d'auth — il protège déjà les pages de l'app automatiquement.
- **Les comptes d'équipe** (`home/[account]`, `create-team`) — ils sont désactivés pour le stage, ton SaaS est mono-utilisateur. Si Claude te propose du code avec « team », « organization » ou « member », demande-lui de rester sur le compte personnel.
- Le dossier `admin` — c'est le back-office super-admin, hors sujet pour le stage.
- Le dossier `[locale]` et les fichiers de traduction — ne renomme rien, ne traduis rien, écris simplement tes textes en français dans tes pages.
- Tout `packages/` — tu peux lire pour comprendre, mais tu ne modifies pas (exception : `packages/ui` si tu crées un composant réutilisable).

### Le diagramme mental à garder en tête

Utilisateur → Navigateur → Vercel → Next.js → Supabase (auth + DB)

Pour le paiement :

Utilisateur clique « Upgrade » → Next.js → Stripe Checkout → webhook → Supabase (table subscriptions)

## 9. Les comptes et installations à faire (tous gratuits)

À créer dès le jour 1 du stage. Utilise toujours la même adresse email pour t'y retrouver.

| Service | URL | À quoi faire attention |
|---|---|---|
| GitHub | github.com | Choisis un username clean (il sera dans l'URL de ton repo). Active le 2FA. |
| Vercel | vercel.com | Connecte-toi avec GitHub. Choisis le plan Hobby (gratuit). |
| Supabase | supabase.com | Connecte-toi avec GitHub. Crée 1 projet par SaaS (pour la prod, le local sera dans Docker). |
| Stripe | stripe.com | Active le mode TEST en haut à droite. Tu utiliseras des clés sk_test_ / pk_test_. Aucune carte réelle requise. |
| Docker Desktop | docker.com/products/docker-desktop | Pas de compte requis pour l'installation. Sur Windows : nécessite WSL2 + virtualisation activée dans le BIOS. Sur Mac : recommande OrbStack si M1/M2 (plus léger). |
| Stripe CLI | stripe.com/docs/stripe-cli | Outil en ligne de commande pour tester les webhooks Stripe en local. À installer après le compte Stripe. |
| Claude.ai | claude.ai | Crée un compte. Le plan gratuit suffit pour des questions ponctuelles. |
| Claude Code | claude.com/product/claude-code | L'outil en CLI pour coder dans le terminal avec Claude. À installer sur la machine. |
| Cursor (alternative) | cursor.com | VS Code avec IA intégrée. Plan gratuit limité mais utilisable. Optionnel. |
| Coolors | coolors.co | Pas besoin de compte. Pour générer une palette de couleurs. |

## 10. Prompts Claude prêts à l'emploi

Copie-colle ces prompts dans Claude.ai ou Claude Code, en remplaçant les [parties entre crochets] par tes propres infos. Ce sont des points de départ — adapte-les.

### Phase idéation

**Brainstormer des idées**

> Je suis lycéen en stage de 2 semaines et je dois construire un SaaS. Contraintes : zéro coût d'infra (Vercel + Supabase), pas de génération d'image ni de vidéo IA, faisable par un débutant accompagné par l'IA en 1 semaine de code. Voici 3 problèmes que je rencontre dans ma vie : [problème 1, problème 2, problème 3]. Donne-moi 5 idées de SaaS pour chacun, en expliquant à chaque fois quel est le marché et un concurrent existant.

**Critiquer une idée**

> Voici mon idée de SaaS : [ton idée en 2-3 phrases]. Joue le rôle d'un mentor honnête : 1) liste 5 risques majeurs, 2) liste 3 raisons pour lesquelles l'idée pourrait échouer, 3) propose 2 manières de la rendre plus tenable en 1 semaine de stage.

### Phase analyse de marché

**Trouver des concurrents**

> Mon idée : [phrase de pitch]. Cible : [public]. Donne-moi 8 concurrents directs ou indirects, avec pour chacun : 1) URL, 2) prix (gratuit, freemium, payant + montant), 3) leur point fort, 4) leur point faible. Sois concret, pas de vague. Si tu n'es pas sûr, dis-le.

**Trouver son angle**

> Voici mon idée : [...]. Voici 5 concurrents avec leurs forces/faiblesses : [tableau]. Aide-moi à identifier 3 angles différenciants possibles. Pour chaque angle, explique : 1) le promesse, 2) à qui ça plairait le plus, 3) ce qu'il faut sacrifier.

### Phase landing page

**Rédiger les textes**

> Mon SaaS : [nom] qui [value proposition]. Rédige le contenu d'une landing page avec : 1) Hero (titre 6-10 mots + sous-titre 1 phrase + CTA), 2) Section problème (3 pain points), 3) Section solution (3 features clés avec icône en mots), 4) Social proof (3 témoignages factices mais réalistes), 5) Pricing (gratuit + 1 plan payant), 6) FAQ (5 questions), 7) CTA final. Ton : direct, sans jargon, lycéen.

**Fixer ton design system (avant de générer)**

Joue avec ces outils pour choisir tes couleurs et polices, puis reporte-les dans `livrables/design-system.md` :
- **Realtime Colors** (realtimecolors.com) — voir tes couleurs + polices sur une maquette de landing **en direct**
- **tweakcn** (tweakcn.com) / **shadcn themes** (ui.shadcn.com/themes) — éditer le thème des composants de ton app et **exporter les variables CSS** (ça thème toute l'app, pas juste la landing)
- **UI Colors** (uicolors.app) — une couleur → toute l'échelle Tailwind
- **WebAIM Contrast Checker** — vérifier que ton texte est lisible · **Google Fonts** — choisir tes polices

**Générer ta landing avec Claude Design**

Tu ne codes pas de HTML à la main : Claude Design assemble la page à partir de tes entrées. Ton message le plus net vient du jour 3 : ta **value proposition** et ton **positionnement** (`marche.md`) — c'est ça, le cœur de ta landing (le hero = ta value proposition).

> Voici mon SaaS : [colle ton concept de `idee.md` + ta **value proposition et ton positionnement** de `marche.md`]. Voici mon design system : [colle ton `design-system.md`]. Voici le contenu de ma landing : [colle tes textes]. Génère une landing page moderne 2025, responsive, qui respecte **exactement** mes tokens (couleurs, polices, espacements, radius). Une seule page : hero (= ma value proposition), problème, features, social proof, pricing, FAQ, CTA. Aucune image générée.

Puis itère en langage naturel (« rends le hero plus aéré », « inverse l'ordre des sections »…). Quand c'est bon, **exporte** — et au jour 6, utilise l'option **« handoff vers Claude Code »** pour l'intégrer dans ton projet Makerkit.

### Phase setup local (jour 6)

**Installer Docker et lancer le projet**

> Je suis sous [Mac M1/M2 / Mac Intel / Windows / Linux]. Guide-moi pas à pas pour : 1) installer Docker Desktop (ou OrbStack sur Mac Apple Silicon), 2) installer pnpm, 3) cloner ce repo : [URL], 4) lancer « pnpm install », 5) démarrer Supabase en local avec « pnpm supabase:start », 6) lancer « pnpm dev ». Explique chaque étape et ce qu'il se passe sous le capot.

**Comprendre la structure du boilerplate**

> Voici la structure de mon projet (sortie de « ls -la apps/web/app » et « ls -la apps/web/supabase ») : [colle]. Explique-moi : 1) à quoi sert chaque dossier, 2) où je dois ajouter mes pages de features protégées par login, 3) où je dois écrire mes migrations SQL, 4) ce que je peux ignorer pour le stage.

**Convertir ta maquette en vraie landing (jour 6)**

> Je veux intégrer ma landing (dans `livrables/[nom]-landing-page/`) dans mon projet Makerkit, proprement, étape par étape :
> 1) **Mappe mon design system sur les variables de thème shadcn** de `apps/web` (à partir de mon `design-system.md`) pour thémer toute l'app.
> 2) Je garde le **`SiteHeader` et le `SiteFooter` de Makerkit** : personnalise-les (logo, liens de nav, bouton CTA) à partir de mon design, et **n'ajoute PAS** le header/footer de ma landing.
> 3) Convertis le **corps** de ma landing (hero, problème, features, pricing, FAQ, CTA) en JSX dans `apps/web/app/[locale]/(marketing)/page.tsx`, en utilisant les **couleurs du thème** (pas de hex en dur) et les composants `@kit/ui` quand c'est pertinent.
> 4) Ajoute mes polices Google Fonts à la config de l'app et mes images (en **WebP**) dans `apps/web/public/`.
>
> Vérifie que ça compile et s'affiche sur localhost:3000.

**Déployer sur Vercel + Supabase prod (jour 6)**

> Je déploie mon projet Makerkit sur Vercel avec un projet Supabase cloud (plan gratuit). Guide-moi pas à pas, simplement : 1) créer le projet Supabase de prod et récupérer son URL et ses clés ; 2) la liste EXACTE des variables d'environnement à mettre dans Vercel, en séparant publiques et secrètes — pour ce projet ce sont : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLIC_KEY` et `NEXT_PUBLIC_SITE_URL` (publiques, `NEXT_PUBLIC_SITE_URL` = mon URL .vercel.app), `SUPABASE_SECRET_KEY` et `SUPABASE_DB_WEBHOOK_SECRET` (secrètes, jamais commitées) ; 3) appliquer mes migrations à la prod avec `supabase link --project-ref <ref>` puis `supabase db push` ; 4) vérifier que le déploiement réussit et que je peux créer un compte. Préviens-moi des erreurs classiques.

### Phase code et features

**Coder une feature par-dessus le boilerplate**

> Mon SaaS [nom] est basé sur un boilerplate Next.js + Supabase. L'auth est déjà gérée. Je veux ajouter cette feature : [description précise en termes utilisateur]. Donne-moi : 1) la migration SQL avec table(s) + RLS, 2) la page Next.js dans apps/web/app/[locale]/home/(user)/[feature]/page.tsx (l'espace compte personnel — les team accounts sont désactivés, ne crée rien dans home/[account]), 3) la server action ou route API qui parle à Supabase. Respecte le style des composants déjà utilisés dans les pages existantes.

**Debugger**

> Mon code ne marche pas comme attendu. Voici le code : [colle le fichier]. Voici l'erreur dans la console / le comportement observé : [description]. Diagnostique étape par étape, et propose un fix avec explication.

### Phase Stripe (jour 10)

**Configurer Stripe en mode test**

> Je dois configurer Stripe pour mon SaaS. Je suis en mode test. Guide-moi pour : 1) créer 2 produits dans le dashboard Stripe (Free 0€/mois et Pro 9€/mois), 2) récupérer leurs price IDs, 3) lister les variables d'env Stripe à mettre dans Vercel (clé publique, clé secrète, webhook secret), 4) tester le parcours d'upgrade avec la carte 4242. Le code billing est déjà câblé dans le boilerplate.

**Tester les webhooks Stripe en local**

> Je veux tester les webhooks Stripe sur ma machine pendant le dev. J'ai installé la Stripe CLI. Donne-moi les commandes pour : 1) me logger avec « stripe login », 2) forwarder les webhooks vers mon Next.js local avec « stripe listen --forward-to », 3) déclencher un événement de test (paiement réussi). Explique ce que chaque commande fait.

### Phase production et présentation

**Rédiger le README**

> Mon SaaS s'appelle [nom]. URL de prod : [url]. Stack : Next.js + TypeScript + Tailwind + Supabase + Stripe, déployé sur Vercel. Voici la value proposition : [...]. Rédige un README.md GitHub pro avec : titre, description courte, badges stack, lien démo, features clés (3 max), instructions pour lancer en local (Docker, pnpm, Supabase, etc.), architecture rapide, todo, licence MIT. Format Markdown propre.

**Préparer la présentation**

> Je dois présenter mon SaaS [nom] en 5 minutes au tuteur de stage. Le produit : [description]. Aide-moi à structurer : 1) plan minute par minute, 2) phrase d'accroche pour démarrer, 3) ordre de la démo (3 features à montrer dans quel ordre, finir sur le parcours upgrade Stripe), 4) phrase de clôture qui marque, 5) anticipation des 3 questions probables avec leur réponse.

## 11. Cheat sheet Git et GitHub

Les commandes Git essentielles pour ne pas paniquer pendant le stage. À sortir dès qu'un truc part en vrille.

### Workflow quotidien

```
git status                                   # voir ce que tu as modifié
git add .
git commit -m "feat: ajout du tracker"      # enregistrer tes modifs
git push                                     # envoyer sur GitHub
git pull                                     # récupérer les modifs distantes
```

### Quand quelque chose tourne mal

```
git diff                                     # voir tes modifs en détail
git log --oneline -10                        # voir les 10 derniers commits
git checkout -- fichier.tsx                  # annuler tes modifs sur un fichier
git reset --soft HEAD~1                      # défaire le dernier commit (garde tes modifs)
git stash                                    # mettre tes modifs de côté temporairement
git stash pop                                # les remettre
```

### Bonnes pratiques de commit

- Un commit = un changement cohérent. Pas « je commit ma journée ».
- Préfixe le message : feat: (nouvelle feature), fix: (bug), style: (CSS), docs: (doc), refactor: (réorganisation).
- Push au moins toutes les heures. Sinon en cas de souci tu perds tout.
- **JAMAIS commit ton .env.local.** Vérifie qu'il est bien dans le .gitignore avant le premier push (déjà le cas dans le boilerplate).

### La routine de chaque jour : branche et PR sur develop

Chaque jour de stage suit le même rituel : tu pars de develop, tu crées la branche du jour, tu bosses dessus, et le soir tu ouvres une Pull Request vers develop que ton tuteur relit et merge.

```
git checkout develop && git pull              # repartir d'un develop à jour
git checkout -b jour3-marche                  # ta branche du jour (jourX-étape)
git add . && git commit -m "jour3: analyse de marche"
git push -u origin jour3-marche               # envoyer la branche sur GitHub
```

Puis sur GitHub : ouvre une Pull Request (bouton « Compare & pull request »), choisis develop comme base, colle ton jourX.md dans la description, et préviens ton tuteur.

Nom de branche : jour[x]-nom-de-l-etape, en minuscules, avec des tirets et sans accents (ex. jour2-idee, jour5-design-system, jour8-db).

## 12. Glossaire

| Terme | Définition |
|---|---|
| API | Une « porte d'entrée » qu'un programme expose pour qu'un autre programme lui parle. L'API de Supabase, c'est ce qui te permet d'écrire dans la base depuis ton code. |
| Auth (Authentification) | Le système qui permet à un utilisateur de prouver qui il est : login par email + mot de passe, magic link, Google, etc. |
| Boilerplate | Un projet pré-construit que tu télécharges pour partir d'une base solide au lieu de tout coder de zéro. Le tien : Makerkit. |
| Conteneur | Une « boîte » isolée gérée par Docker qui exécute une application avec toutes ses dépendances. Supabase tourne dans des conteneurs en local. |
| CRUD | Create, Read, Update, Delete : les 4 opérations de base sur des données. La majorité des SaaS, c'est principalement du CRUD. |
| CTA (Call-To-Action) | Le bouton sur une landing qui pousse à agir : « S'inscrire », « Essayer gratuitement ». |
| Déploiement | Le fait de mettre son code en ligne pour que d'autres puissent l'utiliser. Avec Vercel, ça se fait à chaque push. |
| Docker | Outil qui permet de faire tourner des applications dans des conteneurs isolés. Sert à exécuter Supabase en local sans installation système. |
| Frontend / Backend | Frontend = ce que voit l'utilisateur (le navigateur). Backend = ce qui tourne sur le serveur. |
| Git | L'outil qui versionne ton code (garde l'historique). Local sur ta machine. |
| GitHub | Le service en ligne où tu sauvegardes et partages ton code Git. |
| Magic Link | Connexion par email sans mot de passe : tu reçois un lien, tu cliques, tu es connecté. |
| Makerkit | Le boilerplate Next.js + Supabase utilisé comme base de ton projet. Inclut auth, billing Stripe, dashboard, composants UI. |
| Migration SQL | Un fichier .sql versionné qui décrit un changement à appliquer à la DB (création de table, ajout de colonne, etc.). Permet de rejouer les changements de manière reproductible. |
| Monorepo | Un seul repo Git qui contient plusieurs projets (le boilerplate utilise un monorepo géré par Turborepo : apps/web, packages/ui, etc.). |
| MVP (Minimum Viable Product) | La version la plus simple possible de ton produit qui prouve qu'il marche. |
| Next.js | Le framework basé sur React qui gère pages, routes, rendu côté serveur. Utilisé partout. |
| pnpm | Un gestionnaire de paquets (alternative à npm) plus rapide et plus économe en espace disque. Utilisé par le boilerplate. |
| Postgres | La base de données de Supabase. Une des plus solides du marché, gratuite et open source. |
| Price ID | L'identifiant Stripe d'un plan tarifaire (ex : price_1OxYz...). À copier depuis le dashboard Stripe vers tes variables d'env. |
| Prompt | L'instruction que tu donnes à l'IA. Un bon prompt = de meilleurs résultats. |
| React | La bibliothèque JavaScript pour construire des interfaces. Next.js est construit dessus. |
| RLS (Row Level Security) | Dans Supabase : une règle qui dit « cet utilisateur ne peut voir que SES propres données ». À activer impérativement. |
| SaaS | Software as a Service : logiciel accessible par navigateur, modèle d'abonnement. |
| Server Action | Fonction Next.js exécutée côté serveur (et appelée depuis le client). Idéale pour parler à Supabase sans exposer les clés. |
| Stack | L'ensemble des technologies utilisées pour construire un produit (front, back, DB, hébergement, paiement). |
| Stripe | Service qui gère les paiements et les abonnements. Mode test = aucune somme réelle prélevée. Carte de test : 4242 4242 4242 4242. |
| Supabase | Plateforme tout-en-un : base de données + auth + stockage. Open source, plan gratuit généreux. Tourne en local via Docker, en prod via leur cloud. |
| Tailwind CSS | Bibliothèque CSS où tu écris le style directement dans ton HTML avec des classes. Très rapide à utiliser. |
| TypeScript | JavaScript avec des types. Permet d'éviter des bugs et facilite la collaboration avec l'IA. |
| Vercel | Hébergeur qui déploie automatiquement les apps Next.js depuis GitHub. Plan gratuit suffit. |
| Webhook | Une URL exposée par ton serveur pour recevoir des notifications. Stripe envoie un webhook quand un user paye, ton serveur réagit (mise à jour de la table abonnements). |

## 13. Ressources pour aller plus loin

### Apprendre Next.js, React, Tailwind

- Documentation officielle Next.js — nextjs.org/learn : tutoriel pas à pas.
- Tailwind CSS — tailwindcss.com/docs
- shadcn/ui — ui.shadcn.com : tous les composants prêts à copier.

### Apprendre Supabase

- Documentation Supabase — supabase.com/docs
- Local development — supabase.com/docs/guides/local-development : tout sur Supabase via Docker.
- Tutoriels YouTube — chaîne officielle Supabase

### Apprendre Docker (juste l'essentiel)

- Docker Desktop — docker.com/products/docker-desktop
- Mac M1/M2 : OrbStack (alternative plus légère) — orbstack.dev
- Tuto express : « Docker en 100 secondes » sur YouTube (chaîne Fireship)

### Apprendre Stripe (mode test)

- Documentation Stripe — stripe.com/docs
- Cartes de test — stripe.com/docs/testing : succès, refus, 3D Secure.
- Stripe CLI — stripe.com/docs/stripe-cli : pour tester les webhooks en local.

### Comprendre le boilerplate Makerkit

- Documentation officielle — makerkit.dev/docs
- Vidéo de présentation — chaîne YouTube de Makerkit

### S'inspirer d'autres SaaS

- Product Hunt — producthunt.com : nouveaux produits chaque jour.
- Indie Hackers — indiehackers.com : témoignages de fondateurs solo.

### S'inspirer pour le design

- Mobbin — mobbin.com : screenshots d'apps populaires.
- Land-book — land-book.com : galerie de landings bien faites.
- Coolors — coolors.co : générateur de palettes.

### Comprendre le mindset entrepreneur

- Pieter Levels — levels.io : indie hacker qui partage tout.
- Marc Lou — marclou.com : ship vite, en français parfois.

### Si tu prends goût et que tu veux continuer après le stage

- Lance ton produit sur Product Hunt et observe les retours.
- Partage-le sur tes réseaux et dans ta classe — tes premiers utilisateurs sont à côté de toi.
- Itère pendant les vacances : ajoute une feature par semaine.

**Bonne aventure !** Construire un SaaS de A à Z en 2 semaines, c'est ambitieux. Mais avec un boilerplate solide, l'IA pour t'épauler et 10 jours bien structurés, c'est largement à ta portée.
