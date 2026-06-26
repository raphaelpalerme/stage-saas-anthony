/*
 * Filtre d'insultes (modération du chat).
 * --------------------------------------
 * `censurer(texte)` remplace les gros mots de la liste par des étoiles.
 * Ex. "t'es qu'un abruti" -> "t'es qu'un ******".
 *
 * À utiliser CÔTÉ SERVEUR (dans l'action d'envoi) pour qu'on ne puisse pas
 * le contourner. Tu peux compléter la liste `GROS_MOTS` à tout moment.
 */

// La liste des mots interdits (en minuscules, sans accent obligatoire).
// Ajoute/retire des mots ici selon ce que tu veux modérer.
const GROS_MOTS = [
  'con',
  'conne',
  'connard',
  'connasse',
  'abruti',
  'abrutie',
  'crétin',
  'cretin',
  'débile',
  'debile',
  'imbécile',
  'imbecile',
  'idiot',
  'salaud',
  'salope',
  'pute',
  'putain',
  'merde',
  'merdeux',
  'enculé',
  'encule',
  'enfoiré',
  'enfoire',
  'bâtard',
  'batard',
  'pétasse',
  'petasse',
  'bouffon',
  'bolos',
  'bolosse',
  'couillon',
  'ducon',
  'nique',
  'niquer',
  'ta gueule',
];

// On construit UNE expression régulière à partir de la liste.
// (?<![\p{L}]) et (?![\p{L}]) = le mot ne doit pas être collé à d'autres
// lettres → "con" est censuré, mais pas "concombre".
const motsEchappes = GROS_MOTS.map((mot) =>
  mot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
);
const REGEX_GROS_MOTS = new RegExp(
  `(?<![\\p{L}])(${motsEchappes.join('|')})(?![\\p{L}])`,
  'giu',
);

/**
 * Remplace chaque gros mot trouvé par autant d'étoiles que de caractères.
 * Insensible à la casse (majuscules/minuscules).
 */
export function censurer(texte: string): string {
  return texte.replace(REGEX_GROS_MOTS, (mot) => '*'.repeat(mot.length));
}
