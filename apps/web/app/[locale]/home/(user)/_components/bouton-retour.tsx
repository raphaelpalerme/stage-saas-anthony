import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

// Petit bouton "Retour" affiché en haut des pages de features.
// Pratique sur mobile pour revenir à l'accueil sans devoir quitter.
export function BoutonRetour() {
  return (
    <Link
      href="/home"
      className="text-muted-foreground inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition hover:border-white/30 hover:text-white"
    >
      <ArrowLeft className="size-4" />
      Retour
    </Link>
  );
}
