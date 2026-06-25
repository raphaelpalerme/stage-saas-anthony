import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

// Crée une notification "in_app" pour un joueur (la cloche 🔔 l'affichera).
//
// On passe par le client ADMIN car la table `notifications` interdit aux
// utilisateurs d'écrire pour quelqu'un d'autre (sécurité). Ici c'est légitime :
// la notif est déclenchée par une vraie action (DM, rejoindre, like).
//
// - `pour`   : le destinataire de la notif (account_id)
// - `acteur` : celui qui déclenche (pour ne PAS se notifier soi-même)
// Cette fonction n'échoue jamais bruyamment : une notif ratée ne doit pas
// faire échouer l'action principale.
export async function creerNotification(params: {
  pour: string;
  acteur: string;
  body: string;
  link?: string;
}) {
  if (params.pour === params.acteur) return;

  try {
    const admin = getSupabaseServerAdminClient();

    await admin.from('notifications').insert({
      account_id: params.pour,
      body: params.body,
      type: 'info',
      channel: 'in_app',
      link: params.link ?? null,
    });
  } catch {
    // on ignore : une notif ratée ne casse pas l'action
  }
}
