# Design system — [Nom du SaaS]

*Livrable du jour 5.*

> Ce fichier est la **spec** que tu passeras à **Claude Design** pour générer ta landing — plus il est précis, moins le rendu est générique. Et comme ton app (Makerkit) utilise **shadcn/ui**, ces tokens se traduisent en variables CSS qui thèment **toute l'app**, pas juste la landing. Fixe tes tokens avec un outil interactif (Realtime Colors, tweakcn, UI Colors) puis reporte-les ici.

## Couleurs (codes hex exacts)
| Rôle | Hex | Sert à |
|---|---|---|
| Primaire | `#______` | boutons, liens, accent principal |
| Primaire (hover) | `#______` | survol du primaire |
| Accent / secondaire | `#______` | éléments secondaires, badges |
| Fond | `#______` | fond de page |
| Surface / carte | `#______` | cartes, panneaux (souvent ~blanc) |
| Texte | `#______` | texte principal |
| Texte atténué | `#______` | sous-titres, légendes |
| Bordure | `#______` | contours, séparateurs |
| Succès | `#______` | validations |
| Erreur | `#______` | erreurs, alertes |

[Vérifie le contraste texte/fond sur webaim.org/resources/contrastchecker — il doit passer « AA ».]

## Typographie
- **Police des titres :** ______ (ex. depuis fonts.google.com)
- **Police du texte :** ______
- **Échelle (px) :** H1 ___ · H2 ___ · H3 ___ · corps ___ · petit ___
- **Graisses :** titres ___ (ex. 700) · corps ___ (ex. 400)

## Espacements
Échelle (px) : ___ / ___ / ___ / ___ / ___  (ex. 4 / 8 / 16 / 24 / 48)

## Formes & profondeur
- **Border-radius :** ___ px (petits éléments) · ___ px (cartes)
- **Ombres :** légère (cartes) : ______ · marquée (modales) : ______

## Composants (avec états)
- **Bouton primaire :** fond ___, texte ___, radius ___ ; **hover** ___ ; **disabled** ___
- **Bouton secondaire :** ______
- **Carte :** fond ___, bordure ___, radius ___, ombre ___
- **Champ de formulaire :** fond ___, bordure ___, **focus** ___, **erreur** ___

## Mapping shadcn (pour thémer toute l'app — jour 6)
[Reporte tes couleurs dans les variables du thème de `apps/web`. Demande à Claude Code : « mappe mon design system sur les variables shadcn ».]
- `--primary` ← Primaire · `--background` ← Fond · `--card` ← Surface · `--muted-foreground` ← Texte atténué · `--border` ← Bordure · `--destructive` ← Erreur · `--radius` ← Border-radius