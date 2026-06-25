import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

import { ProfilForm } from './_components/profil-form';

// Page SERVEUR : elle lit le profil de l'utilisateur connecté + ses stats
// sociales (highlights postés, likes reçus), puis passe le tout au formulaire.
// Au chargement, ton profil déjà enregistré réapparaît tout seul.
async function ProfilPage() {
  const user = await requireUserInServerComponent();
  const client = getSupabaseServerClient();

  const { data: profilBrut } = await client
    .from('profils')
    .select('pseudo, niveau, poste, quartier, bio, avatar, taille, style_jeu')
    .eq('account_id', user.id)
    .maybeSingle();

  // On normalise style_jeu (colonne snake_case) -> styleJeu (côté code).
  const profil = profilBrut
    ? {
        pseudo: profilBrut.pseudo,
        niveau: profilBrut.niveau,
        poste: profilBrut.poste,
        quartier: profilBrut.quartier,
        bio: profilBrut.bio,
        avatar: profilBrut.avatar,
        taille: profilBrut.taille,
        styleJeu: profilBrut.style_jeu,
      }
    : null;

  // Annuaire de TOUS les joueurs (pour retrouver pseudo + avatar par id).
  const { data: tousProfils } = await client
    .from('profils')
    .select('account_id, pseudo, avatar');

  const parId = new Map(
    (tousProfils ?? []).map((p) => [
      p.account_id,
      { id: p.account_id, pseudo: p.pseudo, avatar: p.avatar },
    ]),
  );

  // Mes highlights (pour les likes reçus).
  const { data: mesHighlights } = await client
    .from('highlights')
    .select('id')
    .eq('account_id', user.id);
  const idsHighlights = (mesHighlights ?? []).map((h) => h.id);

  // Les 3 relations en parallèle.
  const [{ data: abonnesRows }, { data: abonnementsRows }, { data: likeRows }] =
    await Promise.all([
      // Abonnés : ceux qui ME suivent (follower_id), où suivi_id = moi.
      client.from('abonnements').select('follower_id').eq('suivi_id', user.id),
      // Abonnements : ceux que JE suis (suivi_id), où follower_id = moi.
      client.from('abonnements').select('suivi_id').eq('follower_id', user.id),
      // Likes reçus : qui a liké MES highlights.
      idsHighlights.length > 0
        ? client.from('likes').select('account_id').in('highlight_id', idsHighlights)
        : Promise.resolve({ data: [] as { account_id: string }[] }),
    ]);

  // On transforme les ids en joueurs (pseudo + avatar), sans les inconnus.
  const versJoueurs = (ids: string[]) =>
    ids.map((id) => parId.get(id)).filter((j) => j !== undefined);

  const abonnesList = versJoueurs(
    (abonnesRows ?? []).map((r) => r.follower_id),
  );
  const abonnementsList = versJoueurs(
    (abonnementsRows ?? []).map((r) => r.suivi_id),
  );
  // Likers : une personne ne compte qu'une fois (même si elle a liké plusieurs).
  const likersList = versJoueurs([
    ...new Set((likeRows ?? []).map((l) => l.account_id)),
  ]);

  const stats = {
    highlights: idsHighlights.length,
    likesRecus: (likeRows ?? []).length,
    abonnes: abonnesList.length,
    abonnements: abonnementsList.length,
  };

  return (
    <ProfilForm
      profil={profil}
      stats={stats}
      moiId={user.id}
      abonnesList={abonnesList}
      abonnementsList={abonnementsList}
      likersList={likersList}
    />
  );
}

export default ProfilPage;
