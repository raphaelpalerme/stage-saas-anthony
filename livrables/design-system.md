# Design system — [Nom du SaaS]

*Livrable du jour 5.*

> Ce fichier est la **spec** que tu passeras à **Claude Design** pour générer ta landing — plus il est précis, moins le rendu est générique. Et comme ton app (Makerkit) utilise **shadcn/ui**, ces tokens se traduisent en variables CSS qui thèment **toute l'app**, pas juste la landing. Fixe tes tokens avec un outil interactif (Realtime Colors, tweakcn, UI Colors) puis reporte-les ici.

## Couleurs (codes hex exacts)
| Rôle | Hex | Sert à |
|---|---|---|
| Primaire | `#0284C7` | boutons, liens, accent principal |
| Primaire (hover) | `#0369A1` | survol du primaire |
| Accent / secondaire | `#EA580C` | éléments secondaires, badges |
| Fond | `#0F172A` | fond de page (bleu nuit profond) |
| Surface / carte | `#1E293B` | cartes, panneaux |
| Texte | `#F1F5F9` | texte principal |
| Texte atténué | `#94A3B8` | sous-titres, légendes |
| Bordure | `#475569` | contours, séparateurs |
| Succès | `#22C55E` | validations |
| Erreur | `#EF4444` | erreurs, alertes |

[Vérifie le contraste texte/fond sur webaim.org/resources/contrastchecker — il doit passer « AA ».]

## Typographie
- **Police des titres :** Bebas Neue
- **Police du texte :** Inter 
- **Échelle (px) :** H1 48 · H2 32 · H3 24 · corps 16 · petit 14
- **Graisses :** titres 700 · corps 400

## Espacements
Échelle (px) : 4 / 8 / 16 / 24 / 48

## Formes & profondeur
- **Border-radius :** 8px (boutons, champs, badges) · 16px (cartes)
- **Ombres :** légère (cartes) : `0 2px 12px rgba(0,0,0,0.45)` · marquée (modales) : `0 8px 32px rgba(0,0,0,0.65)`

## Composants (avec états)
- **Bouton primaire :** fond `#0284C7`, texte `#F1F5F9`, radius `8px` ; **hover** `#0369A1` ; **disabled** `#475569`
- **Bouton secondaire :** fond `#EA580C`, texte `#F1F5F9`, radius `8px` ; **hover** `#C2410C`
- **Carte :** fond `#1E293B`, bordure `#475569`, radius `16px`, ombre `0 2px 12px rgba(0,0,0,0.45)`
- **Champ de formulaire :** fond `#1E293B`, bordure `#475569`, **focus** `#0284C7`, **erreur** `#EF4444`

## Mapping shadcn (pour thémer toute l'app — jour 6)
[Reporte tes couleurs dans les variables du thème de `apps/web`. Demande à Claude Code : « mappe mon design system sur les variables shadcn ».]
- `--primary` ← Primaire · `--background` ← Fond · `--card` ← Surface · `--muted-foreground` ← Texte atténué · `--border` ← Bordure · `--destructive` ← Erreur · `--radius` ← Border-radius