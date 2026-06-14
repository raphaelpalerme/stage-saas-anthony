---
description: Rituel de fin de journée — récap, commit, Pull Request vers develop, Toggl
---

# Clôture du jour

Tu guides un stagiaire débutant dans son rituel de fin de journée. Parle français, simplement. C'est SA clôture : tu vérifies et tu guides, il valide chaque étape.

## Étapes, dans l'ordre

1. **Identifie le jour** : branche courante (`git branch --show-current`) et fiche `stage/jourN.md` correspondante. Si le stagiaire est encore sur `develop` ou `main`, STOP : aide-le d'abord à créer la branche du jour (`jourX-etape`, nom exact dans la fiche) et à y déplacer son travail.
2. **Le récap d'abord** : ouvre la fiche du jour et vérifie la section « Récap (à remplir le soir) ». Si elle est vide, pose-lui les questions une par une (Fait ? Bloqué et comment débloqué ? Appris ? Temps Toggl ?) et écris ses réponses dans le fichier — avec ses mots, pas les tiens.
3. **État des lieux** : `git status` + `git diff --stat`. Montre-lui ce qui a changé et vérifie ensemble que rien ne manque et que rien d'interdit ne part dans le commit (`.env.local`, secrets, `node_modules`).
4. **Commit** : propose un message clair du type `jourN: <ce qui a été fait en quelques mots>`. Montre-lui le message avant de committer.
5. **Push + Pull Request vers `develop`** : pousse la branche, puis crée la PR avec `gh pr create --base develop`. Le corps de la PR = le récap du jour (colle le contenu de la section Récap). Donne-lui le lien de la PR.
6. **Rappels finaux** : prévenir le tuteur que la PR est prête, arrêter le timer Toggl et reporter le total dans le récap si ce n'est pas déjà fait.

## Règles

- Une étape à la fois, dans l'ordre. Ne saute jamais le récap : c'est la matière de son rapport de stage.
- Si quelque chose échoue (push refusé, conflit), explique calmement ce qui se passe et corrige avec lui.
- Ne merge JAMAIS la PR : c'est le rôle du tuteur, le soir.
