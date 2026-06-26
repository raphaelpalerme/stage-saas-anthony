'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { authActionClient } from '@kit/next/safe-action';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { estPro } from '../../../_lib/server/est-pro';

// Limite du plan GRATUIT : nombre de dispos actives (qui cherchent encore des
// joueurs) qu'on peut avoir en même temps. Le Pro est illimité.
const LIMITE_DISPOS_GRATUIT = 2;

// La forme attendue d'une dispo envoyée par le formulaire (validation serveur).
const DispoSchema = z.object({
  lieu: z.string().min(1, 'Le lieu est obligatoire'),
  creneau: z.string().min(1, 'Le créneau est obligatoire'),
  niveauRecherche: z.string(),
  places: z.number(),
  note: z.string(),
});

/**
 * Publie une nouvelle dispo pour l'utilisateur connecté.
 * Note le 🟡 mapping camelCase -> snake_case :
 *   niveauRecherche (code)  ->  niveau_recherche (colonne Postgres)
 */
export const publierDispoAction = authActionClient
  .inputSchema(DispoSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    // Plan gratuit limité : on compte les dispos ACTIVES (places > 0).
    // Le Pro n'a aucune limite.
    const pro = await estPro(ctx.user.id);

    if (!pro) {
      const { count } = await client
        .from('disponibilites')
        .select('*', { count: 'exact', head: true })
        .eq('account_id', ctx.user.id)
        .gt('places', 0);

      if ((count ?? 0) >= LIMITE_DISPOS_GRATUIT) {
        // On ne bloque pas brutalement : on renvoie un signal "limite atteinte"
        // que le formulaire affichera avec une invitation à passer Pro.
        return { success: false, limiteAtteinte: true };
      }
    }

    const { data, error } = await client
      .from('disponibilites')
      .insert({
        account_id: ctx.user.id,
        lieu: parsedInput.lieu,
        creneau: parsedInput.creneau,
        niveau_recherche: parsedInput.niveauRecherche,
        places: parsedInput.places,
        note: parsedInput.note,
        statut: 'ouverte',
      })
      // On récupère l'id de la ligne créée pour pouvoir la supprimer ensuite.
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // On rafraîchit les pages concernées (mes dispos + la recherche).
    revalidatePath('/home/dispo');
    revalidatePath('/home/trouver');

    return { success: true, id: data.id };
  });

// La forme attendue pour supprimer une dispo : juste son id.
const SuppressionSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Supprime une dispo. Grâce à la RLS "delete own", la base n'autorise la
 * suppression que si la dispo appartient à l'utilisateur connecté.
 */
export const supprimerDispoAction = authActionClient
  .inputSchema(SuppressionSchema)
  .action(async ({ parsedInput }) => {
    const client = getSupabaseServerClient();

    const { error } = await client
      .from('disponibilites')
      .delete()
      .eq('id', parsedInput.id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/home/dispo');
    revalidatePath('/home/trouver');

    return { success: true };
  });
