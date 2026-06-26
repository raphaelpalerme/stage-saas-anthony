import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { estPro } from '../_lib/server/est-pro';
import {
  HighlightsFeed,
  type HighlightItem,
} from './_components/highlights-feed';

export const metadata = {
  title: 'Highlights · Pickify',
};

// Page SERVEUR : lit le fil des highlights (RLS "lire tout"), recolle l'auteur
// (profil) et calcule l'URL publique de chaque fichier, puis passe au client.
async function HighlightsPage() {
  const client = getSupabaseServerClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  const [{ data: highlights }, { data: profils }, { data: likes }] =
    await Promise.all([
      client
        .from('highlights')
        .select('id, account_id, fichier_path, media_type, legende, created_at')
        .order('created_at', { ascending: false }),
      client.from('profils').select('account_id, pseudo, avatar'),
      client.from('likes').select('highlight_id, account_id'),
    ]);

  const profilsParCompte = new Map(
    (profils ?? []).map((p) => [p.account_id, p]),
  );

  // Pour chaque highlight : combien de likes, et est-ce que MOI je l'ai liké.
  const nbLikes = new Map<string, number>();
  const likesMoi = new Set<string>();
  for (const l of likes ?? []) {
    nbLikes.set(l.highlight_id, (nbLikes.get(l.highlight_id) ?? 0) + 1);
    if (l.account_id === user?.id) likesMoi.add(l.highlight_id);
  }

  const liste: HighlightItem[] = (highlights ?? []).map((h) => {
    const profil = profilsParCompte.get(h.account_id);
    const url = client.storage.from('highlights').getPublicUrl(h.fichier_path)
      .data.publicUrl;

    return {
      id: h.id,
      auteurId: h.account_id,
      pseudo: profil?.pseudo ?? 'Joueur',
      avatar: profil?.avatar ?? '',
      fichierPath: h.fichier_path,
      url,
      mediaType: h.media_type,
      legende: h.legende,
      createdAt: h.created_at,
      likes: nbLikes.get(h.id) ?? 0,
      jaime: likesMoi.has(h.id),
    };
  });

  // Le compte est-il Pro ? (débloque les vidéos lourdes > 50 Mo)
  const pro = user ? await estPro(user.id) : false;

  return (
    <HighlightsFeed highlights={liste} moiId={user?.id ?? ''} pro={pro} />
  );
}

export default HighlightsPage;
