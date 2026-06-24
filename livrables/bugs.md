# Bugs et retours — [Nom du SaaS]

*Livrable du jour 9.*

## Bugs (du plus grave au plus léger)
Liste tout ce qui cloche. Coche quand c'est corrigé.

| État | Gravité | Ce qui cloche | Où | Corrigé comment |
|---|---|---|---|---|
| [ ] | haute |  |  |  |
| [x] | moyenne | Le formulaire postait une dispo même avec lieu/créneau vides, sans aucun message | Page « poster une dispo » (`dispo-form`) | Validation : on bloque si lieu ou créneau manque et on affiche un message rouge clair |
| [x] | basse | Pas de bouton retour évident sur mobile (seul le logo ramenait à la landing) | Page de connexion (`auth/sign-in`) | Ajout d'un lien « ← Retour » vers la landing en haut de la page |

## Checklist qualité v1.0
- [ ] Design system appliqué partout (couleurs, typo, espacements cohérents)
- [ ] États **hover** sur les éléments cliquables
- [ ] **États vides** soignés (« tu n'as encore rien créé… »)
- [ ] **Messages d'erreur** clairs (pas de message technique brut)
- [ ] **Responsive mobile** vérifié (Chrome DevTools)
- [ ] Parcours complet testable sans bug bloquant

## Retours des testeurs
[Fais tester par 2-3 personnes. Note surtout **ce qui les a bloqués** — c'est le plus précieux.]
- Testeur 1 :
- Testeur 2 :
- Testeur 3 :