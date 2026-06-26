# Jour 10 — Dernier jour : roue libre, vrais utilisateurs & célébration 🎉

## C'est ton produit
Tu as un SaaS complet qui tourne en prod, avec facturation. Ce dernier jour : améliore-le une dernière fois, **confronte-le à de vrais utilisateurs**, fais le bilan, et **réalise ce que tu as accompli**. (Si tu as 2 journées d'avance, étale ces 3 temps dessus.)

## 1. Roue libre — une dernière amélioration
- [ ] **Teste le SaaS de ton binôme** et donne ton avis honnête (voir ton coaching).
- [ ] Livre **UNE** amélioration de ton menu, **finie proprement** (pas trois à moitié) — ton coaching a des pistes perso.
- Cadre : branche `roue-libre-...`, PR que **tu merges toi-même**, ne casse pas la prod (le harness te protège), reste dans **ta zone**.

## 2. Le test utilisateur (le plus important)
Montre ton produit à **1-2 personnes de ta cible réelle** — **pas** le binôme, **pas** le tuteur (ton coaching te dit qui viser).
- [ ] **Ne vends pas, observe.** Laisse la personne utiliser sans l'aider. Note où elle bloque.
- [ ] **Questions ouvertes** : « qu'est-ce que tu ferais là ? », « ça te servirait quand ? », « qu'est-ce qui te manque ? »
- [ ] **Note les réactions BRUTES** dans `livrables/retours-users.md` — même celles qui piquent. Une critique vaut dix compliments.
- [ ] **La question qui tue** : « tu l'utiliserais *vraiment* ? » (et si oui, « *quand*, concrètement ? »)

## 3. Rétrospective + célébration
- [ ] Qu'ai-je **appris** (technique ET produit) ? Qu'est-ce que je **referais autrement** ? Mon produit a-t-il un **avenir** ?
- [ ] Mets à jour ton « et après ? » du pitch à la lumière des retours réels.
- [ ] README impeccable (pitch, capture, lien prod) — ta vitrine portfolio.
- [ ] **Prends le temps de réaliser ce que tu as fait** : un SaaS complet, en ligne, en 2 semaines, depuis zéro. Montre-le autour de toi. 🎉

## Livrable
`livrables/retours-users.md` (retours bruts + ce que tu en tires) + ton produit prêt à montrer.

## Récap (rempli le soir)
- **Ce que j'ai fait :**
  - (réseau social) j'ai transformé Pickify en réseau social : chat de partie en temps réel, highlights vidéos/photos avec likes, messages privés avec « Vu » et badge de non-lus, abonnés/abonnements, notifications, profil enrichi avec photo, et les avantages du plan Pro.
  - (dernier jour) après l'avoir testé sur mobile, j'ai corrigé les bugs trouvés : la barre du bas affiche bien les 7 boutons (Profil compris), le scroll n'est plus bloqué, et le chat de partie s'ouvre en plein écran. J'ai ajouté une **page profil joueur** pour voir un autre joueur et s'abonner en retour (avant, la notif « s'est abonné à toi » renvoyait au mauvais endroit).
  - j'ai **déployé Pickify en production** : https://stage-saas-anthony.vercel.app
  - et surtout, j'ai fait **le test utilisateur** avec 2 personnes (1 basketteur, 1 non-basketteur).
- **Ce qui m'a bloqué :** le paiement Stripe plantait (« Error requesting checkout ») : il manquait la variable `STRIPE_WEBHOOK_SECRET` — réglé en local (reste à le faire en prod avec Matis). Le déploiement automatique Vercel ne partait pas tout seul, je l'ai lancé à la main avec la CLI.
- **Ce que j'ai appris :** le temps réel ; déployer en prod ; et surtout (test utilisateur) **qu'un compliment (« je kiffe ») n'est pas un vrai besoin** — la personne de ma cible n'en avait pas besoin, et celle qui l'utiliserait n'est pas dans ma cible. Ma vraie piste : les joueurs isolés.
- **Temps Toggl :** non suivi aujourd'hui.
