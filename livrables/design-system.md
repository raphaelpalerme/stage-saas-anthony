# Design system — [Nom du SaaS]

*Livrable du jour 5.*

> Ce fichier est la **spec** que tu passeras à **Claude Design** pour générer ta landing — plus il est précis, moins le rendu est générique. Et comme ton app (Makerkit) utilise **shadcn/ui**, ces tokens se traduisent en variables CSS qui thèment **toute l'app**, pas juste la landing. Fixe tes tokens avec un outil interactif (Realtime Colors, tweakcn, UI Colors) puis reporte-les ici.

## Couleurs (codes hex exacts)
| Rôle | Hex | Sert à |
|---|---|---|
| Primaire | `#0284C7` | boutons, liens, accent principal |
| Primaire (hover) | `#0369A1` | survol du primaire |
| Accent / secondaire | `#EA580C` | éléments secondaires, badges, navbar CTA |
| Fond | `#000000` | fond de page (noir pur) |
| Surface / carte | `#0C0C0D` | cartes, panneaux |
| Texte | `#FFFFFF` | texte principal |
| Texte atténué | `#A3A3A8` | sous-titres, descriptions de features |
| Bordure | `rgba(255,255,255,0.08)` | contours de cartes |
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
- **Border-radius :** 8px (boutons, badges) · 16px (cartes, FAQ)
- **Ombres :** cartes : `0 4px 24px rgba(0,0,0,0.55)` · hover carte : `0 8px 32px rgba(0,0,0,0.4)`

## Effets visuels (ajoutés lors du polish)
- **Gradient titres :** `linear-gradient(180deg, #ffffff 0%, #ffffff 30%, #5a9ec4 100%)` appliqué en `background-clip:text`
- **Gradient titres orange :** `linear-gradient(180deg, #fdba74 0%, #EA580C 100%)` (section finale)
- **Scroll reveal :** éléments `opacity:0 → 1` + `translateY(28px → 0)` via IntersectionObserver
- **Court de basket SVG** en arrière-plan fixe, animation `neon-pulse` orange→bleu
- **Curseur :** point blanc qui suit la souris + burst de points au clic

## Composants (avec états)
- **Bouton primaire :** fond `#0284C7`, texte `#fff`, radius `8px` ; **hover** scale `1.04` + luminosité +10%
- **Bouton accent (navbar CTA) :** fond `#EA580C`, texte `#000`, radius `8px`, poids `800`
- **Carte :** fond `#0C0C0D`, bordure `rgba(255,255,255,0.08)`, radius `16px`, ombre `0 4px 24px rgba(0,0,0,0.55)` ; **hover** border `rgba(2,132,199,0.45)`
- **FAQ item :** `<details>` avec accordion `grid-template-rows:0fr→1fr` ; ouvert : border `rgba(2,132,199,0.6)`
- **Champ de formulaire :** fond `#0C0C0D`, bordure `rgba(255,255,255,0.08)`, **focus** `#0284C7`, **erreur** `#EF4444`

## Mapping shadcn (pour thémer toute l'app — jour 6)
[Reporte tes couleurs dans les variables du thème de `apps/web`. Demande à Claude Code : « mappe mon design system sur les variables shadcn ».]
- `--primary` ← Primaire · `--background` ← Fond · `--card` ← Surface · `--muted-foreground` ← Texte atténué · `--border` ← Bordure · `--destructive` ← Erreur · `--radius` ← Border-radius