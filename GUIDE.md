# Guide du stage — construis ton SaaS en 2 semaines

Tu vas vivre l'aventure complète d'un fondateur de SaaS : trouver une idée, comprendre ton marché, dessiner ton produit, le coder, le déployer, et le présenter. **Semaine 1 : penser le produit. Semaine 2 : le construire.** Tu travailles en binôme avec l'IA (Claude).

## Comment utiliser ce repo
Chaque matin, ouvre la fiche du jour dans `stage/` (ex. `stage/jour3.md`). Suis la checklist, produis ton livrable, et **remplis le récap le soir**. Le détail complet de chaque étape est dans le **[Programme](stage/programme.md)** et la **[Boîte à outils](stage/boite-a-outils.md)**. Tes livrables texte (de l'exploration du jour 1 au pitch du jour 9) sont des **fichiers déjà prêts à remplir dans `livrables/`** — tu les complètes, tu n'as pas à les créer.

## Tes commandes Claude Code
Dans le terminal, ouvre `claude` à la racine du repo. Six commandes sont prêtes pour toi :
| Commande | Quand l'utiliser |
|---|---|
| `/setup` | Au tout début — vérifie que Node, Docker, etc. sont bien installés et t'aide à réparer ce qui manque |
| `/identite` | Jour 1, avant ton premier commit — règle ton identité git pour que tes commits soient signés à TON nom |
| `/jour 3` | Le matin — affiche la fiche du jour, fait le point sur la checklist, t'aide à démarrer |
| `/explique apps/web/app` | Quand tu ne comprends pas un fichier, un dossier ou un mot technique |
| `/garde-fous` | Avant de committer — vérifie que tu n'as pas touché aux zones sensibles du boilerplate |
| `/cloture` | Le soir — récap, commit, Pull Request vers `develop`, dans le bon ordre |

> Ça bloque sur un truc **technique** (Docker, terminal, installation, push) ? Regarde **[stage/depannage.md](stage/depannage.md)**. Un bug dans **TON** code ? Demande à Claude (`/explique`).

## Le rituel de chaque jour (clôture)
À la fin de chaque journée, tu clôtures ton étape :
1. Une branche pour la journée : `git checkout -b jour3-marche` (nom = `jourX-etape`)
2. Tu commits tout ton travail du jour
3. Tu ouvres une **Pull Request vers `develop`** (colle ton récap `jourX.md` dans la description)
4. Le tuteur relit et merge le soir

**Convention de branche** : `jourX-nom-de-l-etape`, en minuscules, avec des tirets, sans accents (ex. `jour2-idee`, `jour5-design-system`, `jour8-db`).

## La règle d'or
Tu n'as jamais fini seul. Si tu es en avance, tu aides ton binôme — tu le débloques, tu lui expliques, tu relis son code, mais tu ne codes jamais à sa place.

## Les 10 jours
| Jour | Thème | Livrable | Branche |
|---|---|---|---|
| 1 | [Lancement, ambitions & setup](stage/jour1.md) | jour1.md + setup prêt | `jour1-lancement-setup` |
| 2 | [Trouver SON idée + business case](stage/jour2.md) | livrables/idee.md | `jour2-idee` |
| 3 | [Analyse de marché et positionnement](stage/jour3.md) | livrables/marche.md | `jour3-marche` |
| 4 | [Landing : design system, copy & Claude Design](stage/jour4.md) | design-system (brouillon) + copy + landing Claude Design | `jour4-landing` |
| 5 | [Finaliser design system + landing](stage/jour5.md) | livrables/design-system.md (spec) + landing exportée | `jour5-design-system` |
| 6 | [Setup technique : local + Vercel](stage/jour6.md) | Local OK + prod Vercel | `jour6-setup-technique` |
| 7 | [MVP — coder TES features](stage/jour7.md) | livrables/mvp.md + 3 features | `jour7-mvp` |
| 8 | [Base de données : tables + RLS](stage/jour8.md) | Tables + RLS actives | `jour8-db` |
| 9 | [Finitions, Stripe, prod finale & pitch](stage/jour9.md) | v1.0 en prod + bugs.md + README + pitch.md | `jour9-final` |
| 10 | [Roue libre](stage/jour10.md) | Améliorations libres | `roue-libre-...` |

