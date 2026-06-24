// Tout ce qui concerne les avatars emoji, au même endroit (réutilisé par le
// profil, l'accueil et la page "trouver").

// L'emoji par défaut (quand on n'a encore rien choisi / en dernier secours).
export const AVATAR_DEFAUT = '🏀';

// La liste d'emojis que le joueur peut choisir sur sa page profil.
export const AVATARS = [
  '🏀',
  '⛹️',
  '🔥',
  '💪',
  '🏆',
  '😎',
  '👟',
  '⚡',
  '🎯',
  '🦅',
  '🐐',
  '🚀',
];

// Renvoie l'emoji à afficher pour un joueur :
//  - celui qu'il a choisi s'il en a un ;
//  - sinon un emoji STABLE déduit de son pseudo (le même joueur garde toujours
//    le même), pour que les joueurs du seed aient quand même un avatar varié.
export function emojiAvatar(pseudo: string, avatarChoisi?: string | null) {
  if (avatarChoisi) return avatarChoisi;

  let somme = 0;
  for (const lettre of pseudo) somme += lettre.charCodeAt(0);

  return AVATARS[somme % AVATARS.length] ?? AVATAR_DEFAUT;
}
