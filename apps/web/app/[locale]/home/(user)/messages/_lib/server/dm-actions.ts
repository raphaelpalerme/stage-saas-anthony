'use server';

import { z } from 'zod';

import { authActionClient } from '@kit/next/safe-action';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { censurer } from '../../../trouver/_lib/filtre-insultes';

const MessageDirectSchema = z.object({
  destinataireId: z.string().uuid(),
  contenu: z.string().min(1, 'Message vide').max(500, 'Message trop long'),
});

/**
 * Envoyer un message privé (DM) à un autre joueur.
 * La RLS "insert own" vérifie que j'écris bien en mon nom.
 * On renvoie la ligne créée pour l'afficher tout de suite côté navigateur.
 */
export const envoyerMessageDirectAction = authActionClient
  .inputSchema(MessageDirectSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { data, error } = await client
      .from('messages_directs')
      .insert({
        expediteur_id: ctx.user.id,
        destinataire_id: parsedInput.destinataireId,
        // Même filtre d'insultes que le chat de partie.
        contenu: censurer(parsedInput.contenu),
      })
      .select('id, expediteur_id, destinataire_id, contenu, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // Pas de notification "cloche" pour les DM : le nombre de messages reçus
    // s'affiche directement en badge sur l'onglet Messages (voir BottomNav).

    return { success: true, message: data };
  });

// Pour marquer une conversation comme lue : l'id de l'autre joueur.
const MarquerLuSchema = z.object({
  autreId: z.string().uuid(),
});

/**
 * Marquer comme LUE ma conversation avec un joueur (jusqu'à maintenant).
 * Appelée quand j'ouvre le fil : ça fait disparaître le badge "non lu"
 * de cette conversation, et l'autre verra "Vu" sur ses messages.
 */
export const marquerLuAction = authActionClient
  .inputSchema(MarquerLuSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { error } = await client.from('lectures').upsert(
      {
        lecteur_id: ctx.user.id,
        autre_id: parsedInput.autreId,
        lu_le: new Date().toISOString(),
      },
      { onConflict: 'lecteur_id,autre_id' },
    );

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });
