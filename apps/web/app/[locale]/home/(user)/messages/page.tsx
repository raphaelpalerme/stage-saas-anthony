import { getSupabaseServerClient } from '@kit/supabase/server-client';

import {
  type Conversation,
  type Joueur,
  MessagesClient,
} from './_components/messages-client';

export const metadata = {
  title: 'Messages · Pickify',
};

// Page SERVEUR : charge tous les joueurs (pour la recherche) + mes conversations
// existantes (les joueurs avec qui j'ai déjà échangé des DM).
async function MessagesPage() {
  const client = getSupabaseServerClient();

  const {
    data: { user },
  } = await client.auth.getUser();
  const moiId = user?.id ?? '';

  const [{ data: profils }, { data: dms }, { data: mesSuivis }, { data: lus }] =
    await Promise.all([
      client.from('profils').select('account_id, pseudo, avatar'),
      client
        .from('messages_directs')
        .select('expediteur_id, destinataire_id, contenu, created_at')
        .order('created_at', { ascending: false }),
      client.from('abonnements').select('suivi_id').eq('follower_id', moiId),
      // Jusqu'où j'ai lu chaque conversation.
      client.from('lectures').select('autre_id, lu_le').eq('lecteur_id', moiId),
    ]);

  // Les joueurs que je suis déjà (pour l'état du bouton "Abonné").
  const mesAbonnements = (mesSuivis ?? []).map((a) => a.suivi_id);

  // Tous les joueurs sauf moi (pour la recherche).
  const joueurs: Joueur[] = (profils ?? [])
    .filter((p) => p.account_id !== moiId)
    .map((p) => ({ id: p.account_id, pseudo: p.pseudo, avatar: p.avatar }));

  const parId = new Map(joueurs.map((j) => [j.id, j]));
  // autre_id -> jusqu'à quand je l'ai lu
  const luMap = new Map((lus ?? []).map((l) => [l.autre_id, l.lu_le]));

  // Mes conversations : l'AUTRE personne de chaque DM, du + récent au + ancien.
  const apercuMap = new Map<string, { contenu: string; deMoi: boolean }>();
  const dernierDEux = new Map<string, string>(); // dernier message reçu DE lui
  const ordre: string[] = [];

  for (const d of dms ?? []) {
    const autreId =
      d.expediteur_id === moiId ? d.destinataire_id : d.expediteur_id;
    if (autreId === moiId) continue;

    // Le 1er croisé (liste triée desc) = le message le plus récent → l'aperçu.
    if (!apercuMap.has(autreId)) {
      apercuMap.set(autreId, {
        contenu: d.contenu,
        deMoi: d.expediteur_id === moiId,
      });
      ordre.push(autreId);
    }
    // Le dernier message reçu DE lui (pour savoir si non lu).
    if (d.expediteur_id === autreId && !dernierDEux.has(autreId)) {
      dernierDEux.set(autreId, d.created_at ?? '');
    }
  }

  const conversations: Conversation[] = [];
  for (const id of ordre) {
    const joueur = parId.get(id);
    if (!joueur) continue;
    const apercu = apercuMap.get(id);
    const recuDeLui = dernierDEux.get(id);
    const luLe = luMap.get(id) ?? '1970-01-01';
    // Non lu si son dernier message est arrivé APRÈS ma dernière lecture.
    const nonLu = !!recuDeLui && recuDeLui > luLe;

    conversations.push({
      ...joueur,
      apercu: apercu ? `${apercu.deMoi ? 'Toi : ' : ''}${apercu.contenu}` : '',
      nonLu,
    });
  }

  return (
    <MessagesClient
      moiId={moiId}
      joueurs={joueurs}
      conversations={conversations}
      mesAbonnements={mesAbonnements}
    />
  );
}

export default MessagesPage;
