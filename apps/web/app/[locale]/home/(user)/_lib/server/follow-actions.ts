'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { authActionClient } from '@kit/next/safe-action';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { creerNotification } from './notifier';

const SuiviSchema = z.object({
  suiviId: z.string().uuid(),
});

/**
 * S'abonner à un joueur (le suivre). `upsert` + `ignoreDuplicates` rend le
 * double-clic sans effet. On notifie le joueur suivi.
 */
export const suivreAction = authActionClient
  .inputSchema(SuiviSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { error } = await client.from('abonnements').upsert(
      {
        follower_id: ctx.user.id,
        suivi_id: parsedInput.suiviId,
      },
      { onConflict: 'follower_id,suivi_id', ignoreDuplicates: true },
    );

    if (error) {
      throw new Error(error.message);
    }

    // Notifier le joueur suivi ("X s'est abonné à toi").
    const { data: moi } = await client
      .from('profils')
      .select('pseudo')
      .eq('account_id', ctx.user.id)
      .maybeSingle();

    await creerNotification({
      pour: parsedInput.suiviId,
      acteur: ctx.user.id,
      body: `${moi?.pseudo ?? 'Un joueur'} s'est abonné à toi`,
      link: '/home/messages',
    });

    revalidatePath('/home/messages');
    revalidatePath('/home/profil');

    return { success: true };
  });

/**
 * Se désabonner d'un joueur (la RLS "delete own" ne touche que mes lignes).
 */
export const sedesabonnerAction = authActionClient
  .inputSchema(SuiviSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { error } = await client
      .from('abonnements')
      .delete()
      .eq('follower_id', ctx.user.id)
      .eq('suivi_id', parsedInput.suiviId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/home/messages');
    revalidatePath('/home/profil');

    return { success: true };
  });
