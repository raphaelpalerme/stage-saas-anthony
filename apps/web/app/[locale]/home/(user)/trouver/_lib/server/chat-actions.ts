'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { authActionClient } from '@kit/next/safe-action';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { creerNotification } from '../../../_lib/server/notifier';

import { censurer } from '../filtre-insultes';

// Pour rejoindre/quitter, on a juste besoin de l'id de la dispo.
const DispoIdSchema = z.object({
  dispoId: z.string().uuid(),
});

/**
 * Rejoindre une partie : on s'inscrit dans `participants`.
 * La RLS "insert own" garantit qu'on ne peut s'inscrire que soi-même.
 * Le `unique (dispo_id, account_id)` empêche de rejoindre deux fois.
 */
export const rejoindreDispoAction = authActionClient
  .inputSchema(DispoIdSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    // `upsert` + `ignoreDuplicates` : si je suis DÉJÀ inscrit (double-clic),
    // on ne refait rien plutôt que de renvoyer une erreur de doublon.
    const { error } = await client.from('participants').upsert(
      {
        dispo_id: parsedInput.dispoId,
        account_id: ctx.user.id,
      },
      { onConflict: 'dispo_id,account_id', ignoreDuplicates: true },
    );

    if (error) {
      throw new Error(error.message);
    }

    // Notifier l'organisateur de la dispo ("X a rejoint ta partie").
    const [{ data: dispo }, { data: moi }] = await Promise.all([
      client
        .from('disponibilites')
        .select('account_id')
        .eq('id', parsedInput.dispoId)
        .maybeSingle(),
      client
        .from('profils')
        .select('pseudo')
        .eq('account_id', ctx.user.id)
        .maybeSingle(),
    ]);

    if (dispo) {
      await creerNotification({
        pour: dispo.account_id,
        acteur: ctx.user.id,
        body: `${moi?.pseudo ?? 'Un joueur'} a rejoint ta partie`,
        link: '/home/trouver',
      });
    }

    revalidatePath('/home/trouver');

    return { success: true };
  });

/**
 * Quitter une partie : on retire SA participation.
 * La RLS "delete own" n'autorise à supprimer que sa propre ligne.
 */
export const quitterDispoAction = authActionClient
  .inputSchema(DispoIdSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    const { error } = await client
      .from('participants')
      .delete()
      .eq('dispo_id', parsedInput.dispoId)
      .eq('account_id', ctx.user.id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/home/trouver');

    return { success: true };
  });

// Pour envoyer un message : l'id de la dispo + le texte (non vide).
const MessageSchema = z.object({
  dispoId: z.string().uuid(),
  contenu: z.string().min(1, 'Le message est vide').max(500, 'Message trop long'),
});

/**
 * Envoyer un message dans le chat d'une partie.
 * La RLS "insert partie" vérifie côté base que je suis bien dans la partie
 * (organisateur ou participant) ET que j'écris en mon nom.
 */
export const envoyerMessageAction = authActionClient
  .inputSchema(MessageSchema)
  .action(async ({ parsedInput, ctx }) => {
    const client = getSupabaseServerClient();

    // On récupère la ligne créée (.select().single()) pour la renvoyer au client :
    // ça permet d'afficher SON message tout de suite, sans attendre le temps réel.
    const { data, error } = await client
      .from('messages')
      .insert({
        dispo_id: parsedInput.dispoId,
        account_id: ctx.user.id,
        // On masque les gros mots AVANT d'enregistrer → tout le monde voit
        // la version censurée (impossible à contourner côté navigateur).
        contenu: censurer(parsedInput.contenu),
      })
      .select('id, dispo_id, account_id, contenu, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // Notifier les AUTRES membres de la partie (organisateur + participants)
    // qu'un message a été posté.
    const [{ data: dispo }, { data: participants }, { data: moi }] =
      await Promise.all([
        client
          .from('disponibilites')
          .select('account_id, lieu')
          .eq('id', parsedInput.dispoId)
          .maybeSingle(),
        client
          .from('participants')
          .select('account_id')
          .eq('dispo_id', parsedInput.dispoId),
        client
          .from('profils')
          .select('pseudo')
          .eq('account_id', ctx.user.id)
          .maybeSingle(),
      ]);

    // La liste des destinataires : l'organisateur + tous les participants,
    // sans doublon (un Set), et sans moi (creerNotification ignore l'acteur).
    const destinataires = new Set<string>();
    if (dispo) destinataires.add(dispo.account_id);
    for (const p of participants ?? []) destinataires.add(p.account_id);

    const pseudo = moi?.pseudo ?? 'Un joueur';
    const lieu = dispo?.lieu ?? 'la partie';

    await Promise.all(
      [...destinataires].map((pour) =>
        creerNotification({
          pour,
          acteur: ctx.user.id,
          body: `${pseudo} a écrit dans la partie (${lieu})`,
          link: '/home/trouver',
        }),
      ),
    );

    return { success: true, message: data };
  });
