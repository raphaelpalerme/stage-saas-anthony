'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { authActionClient } from '@kit/next/safe-action';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

// On décrit la forme attendue des données (validation côté serveur).
// Si quelqu'un envoie n'importe quoi, c'est refusé avant de toucher la base.
const ProfilSchema = z.object({
  pseudo: z.string().min(1, 'Le pseudo est obligatoire'),
  niveau: z.string(),
  poste: z.string(),
  quartier: z.string(),
  bio: z.string(),
});

/**
 * Enregistre (ou met à jour) le profil de l'utilisateur connecté.
 * `upsert` = "update or insert" : crée la ligne si elle n'existe pas,
 * la met à jour sinon. On force account_id = l'utilisateur connecté,
 * donc la RLS "écrire le sien" est respectée.
 */
export const enregistrerProfilAction = authActionClient
  .inputSchema(ProfilSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { error } = await client.from('profils').upsert({
      account_id: ctx.user.id,
      pseudo: parsedInput.pseudo,
      niveau: parsedInput.niveau,
      poste: parsedInput.poste,
      quartier: parsedInput.quartier,
      bio: parsedInput.bio,
    });

    if (error) {
      throw new Error(error.message);
    }

    // On rafraîchit les pages qui affichent le profil.
    revalidatePath('/home/profil');
    revalidatePath('/home/trouver');

    return { success: true };
  });
