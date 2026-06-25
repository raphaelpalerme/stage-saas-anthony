'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { authActionClient } from '@kit/next/safe-action';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { estPro } from '../../../_lib/server/est-pro';
import { creerNotification } from '../../../_lib/server/notifier';
import { censurer } from '../../../trouver/_lib/filtre-insultes';

// Limite du plan GRATUIT pour un fichier : 50 Mo. Le Pro va jusqu'à 200 Mo.
const LIMITE_GRATUIT = 52_428_800;

// Ce que le formulaire envoie pour publier un highlight.
// Le fichier, lui, est déjà uploadé côté navigateur dans le bucket 'highlights' :
// on ne reçoit ici que son CHEMIN + le type + la légende.
const HighlightSchema = z.object({
  fichierPath: z.string().min(1),
  mediaType: z.enum(['video', 'image']),
  legende: z.string().max(200, 'Légende trop longue'),
  tailleFichier: z.number(),
});

/**
 * Enregistre un highlight (la ligne en base) après l'upload du fichier.
 * La RLS "insert own" garantit qu'on poste sous son propre compte.
 */
export const publierHighlightAction = authActionClient
  .inputSchema(HighlightSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    // Garde-fou Pro : un fichier > 50 Mo n'est autorisé qu'aux comptes Pro.
    // (Le client bloque déjà, mais on revérifie ici pour que ce soit fiable.)
    if (parsedInput.tailleFichier > LIMITE_GRATUIT) {
      const pro = await estPro(ctx.user.id);
      if (!pro) {
        // On retire le fichier déjà uploadé puis on refuse proprement.
        await client.storage
          .from('highlights')
          .remove([parsedInput.fichierPath]);
        return { success: false, limitePro: true };
      }
    }

    const { data, error } = await client
      .from('highlights')
      .insert({
        account_id: ctx.user.id,
        fichier_path: parsedInput.fichierPath,
        media_type: parsedInput.mediaType,
        // On masque les gros mots de la légende (même filtre que le chat).
        legende: censurer(parsedInput.legende),
      })
      .select('id, account_id, fichier_path, media_type, legende, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/home/highlights');

    return { success: true, highlight: data };
  });

// Pour supprimer : l'id de la ligne + le chemin du fichier (à effacer du stockage).
const SuppressionSchema = z.object({
  id: z.string().uuid(),
  fichierPath: z.string().min(1),
});

/**
 * Supprime un highlight : la ligne en base ET le fichier dans le stockage.
 * Les deux RLS "delete own" n'autorisent que mes propres éléments.
 */
export const supprimerHighlightAction = authActionClient
  .inputSchema(SuppressionSchema)
  .action(async ({ parsedInput }) => {
    const client = getSupabaseServerClient();

    // 1) la ligne en base
    const { error } = await client
      .from('highlights')
      .delete()
      .eq('id', parsedInput.id);

    if (error) {
      throw new Error(error.message);
    }

    // 2) le fichier dans le bucket (best effort : on ignore une erreur ici)
    await client.storage.from('highlights').remove([parsedInput.fichierPath]);

    revalidatePath('/home/highlights');

    return { success: true };
  });

// Pour liker / retirer un like : juste l'id du highlight.
const LikeSchema = z.object({
  highlightId: z.string().uuid(),
});

/**
 * Liker un highlight. `upsert` + `ignoreDuplicates` : si je l'ai déjà liké
 * (double-clic), on ne refait rien plutôt que de renvoyer une erreur.
 */
export const likerAction = authActionClient
  .inputSchema(LikeSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { error } = await client.from('likes').upsert(
      {
        highlight_id: parsedInput.highlightId,
        account_id: ctx.user.id,
      },
      { onConflict: 'highlight_id,account_id', ignoreDuplicates: true },
    );

    if (error) {
      throw new Error(error.message);
    }

    // Notifier l'auteur du highlight ("X a liké ton highlight").
    const [{ data: hl }, { data: moi }] = await Promise.all([
      client
        .from('highlights')
        .select('account_id')
        .eq('id', parsedInput.highlightId)
        .maybeSingle(),
      client
        .from('profils')
        .select('pseudo')
        .eq('account_id', ctx.user.id)
        .maybeSingle(),
    ]);

    if (hl) {
      await creerNotification({
        pour: hl.account_id,
        acteur: ctx.user.id,
        body: `${moi?.pseudo ?? 'Un joueur'} a liké ton highlight`,
        link: '/home/highlights',
      });
    }

    return { success: true };
  });

/**
 * Retirer mon like d'un highlight (la RLS "delete own" ne touche que le mien).
 */
export const unlikerAction = authActionClient
  .inputSchema(LikeSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { error } = await client
      .from('likes')
      .delete()
      .eq('highlight_id', parsedInput.highlightId)
      .eq('account_id', ctx.user.id);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });
