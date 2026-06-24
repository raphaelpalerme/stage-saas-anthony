import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

// Petit bouton "Retour" affiché en haut des pages de features.
// Pratique sur mobile pour revenir à l'accueil sans devoir quitter.
export function BoutonRetour() {
  return (
    <Link
      href="/home"
      aria-label="Retour"
      className="text-muted-foreground inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition hover:border-white/30 hover:text-white"
    >
      <ArrowLeft className="size-5" />
    </Link>
  );
}
