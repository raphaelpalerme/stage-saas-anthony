'use client';

import { useState, useTransition } from 'react';

import { UserCheck, UserPlus } from 'lucide-react';

import { Button } from '@kit/ui/button';
import { toast } from '@kit/ui/sonner';

import {
  sedesabonnerAction,
  suivreAction,
} from '../../../_lib/server/follow-actions';

// Le bouton "S'abonner / Abonné ✓" affiché sur le profil d'un autre joueur.
// - `dejaSuivi` : est-ce que je le suis DÉJÀ ? (calculé côté serveur)
// On met l'état à jour TOUT DE SUITE (optimiste) pour que ce soit fluide,
// et on annule si le serveur renvoie une erreur.
export function BoutonSuivre(props: { joueurId: string; dejaSuivi: boolean }) {
  const [suivi, setSuivi] = useState(props.dejaSuivi);
  const [enCours, startTransition] = useTransition();

  function basculer() {
    const cible = !suivi;
    setSuivi(cible); // affichage immédiat

    startTransition(async () => {
      const action = cible ? suivreAction : sedesabonnerAction;
      const resultat = await action({ suiviId: props.joueurId });

      // En cas d'échec, on revient à l'état précédent + message visible.
      if (resultat?.serverError ?? resultat?.validationErrors) {
        setSuivi(!cible);
        toast.error("L'action n'a pas pu être enregistrée. Réessaie.");
      }
    });
  }

  return (
    <Button
      onClick={basculer}
      disabled={enCours}
      data-test={'bouton-suivre'}
      className={
        suivi
          ? 'w-full border border-white/20 bg-transparent text-white hover:bg-white/10'
          : 'w-full bg-[#EA580C] text-black hover:bg-[#EA580C] hover:brightness-110'
      }
    >
      {suivi ? (
        <>
          <UserCheck className={'size-4'} />
          Abonné
        </>
      ) : (
        <>
          <UserPlus className={'size-4'} />
          S'abonner
        </>
      )}
    </Button>
  );
}
