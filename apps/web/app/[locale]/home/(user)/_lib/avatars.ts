// Tout ce qui concerne les avatars, au même endroit (réutilisé par le profil,
// l'accueil et la page "trouver").
//
// On utilise des avatars GÉNÉRÉS (service "DiceBear") : modernes, uniques pour
// chaque joueur (calculés à partir du pseudo), gratuits, sans upload ni IA.

// Les styles d'avatar que le joueur peut choisir sur sa page profil.
export const STYLES_AVATAR = [
  { id: 'adventurer', label: 'Aventurier' },
  { id: 'avataaars', label: 'Cartoon' },
  { id: 'bottts', label: 'Robot' },
  { id: 'fun-emoji', label: 'Emoji' },
  { id: 'pixel-art', label: 'Pixel' },
  { id: 'thumbs', label: 'Abstrait' },
];

// Le style par défaut (si on n'a encore rien choisi).
export const STYLE_DEFAUT = 'adventurer';

// Renvoie l'URL de l'avatar d'un joueur.
//  - le style vient de son choix (colonne `avatar`), sinon le style par défaut ;
//  - le dessin est toujours basé sur le pseudo → chaque joueur a SON avatar,
//    et il garde le même tant qu'il ne change pas de pseudo.
// (Si `style` contient une vieille valeur invalide — ex. un ancien emoji — on
//  retombe proprement sur le style par défaut.)
export function avatarUrl(pseudo: string, style?: string | null) {
  // Si `style` est une URL (= une photo importée par le joueur), on la renvoie
  // telle quelle → la vraie photo s'affiche partout dans l'app.
  if (style && /^https?:\/\//.test(style)) {
    return style;
  }

  const styleValide = STYLES_AVATAR.some((s) => s.id === style);
  const s = styleValide ? style : STYLE_DEFAUT;
  const seed = encodeURIComponent(pseudo || 'pickify');

  return `https://api.dicebear.com/9.x/${s}/svg?seed=${seed}`;
}
