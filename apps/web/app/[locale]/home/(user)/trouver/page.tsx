import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { TrouverListe, type DispoJoueur } from './_components/trouver-liste';

// Page SERVEUR : elle tourne côté serveur, lit la base (RLS appliquée),
// recolle profils + dispos, puis passe la liste au composant client.
async function TrouverPage() {
  const client = getSupabaseServerClient();

  // Qui suis-je ? (sert à savoir quelles parties j'ai déjà rejointes)
  const {
    data: { user },
  } = await client.auth.getUser();

  // On récupère les tables en parallèle. Grâce à la RLS "lire tout",
  // on voit TOUS les joueurs connectés, pas seulement soi.
  const [{ data: dispos }, { data: profils }] = await Promise.all([
    client.from('disponibilites').select('id, lieu, creneau, places, account_id'),
    client
      .from('profils')
      .select('account_id, pseudo, niveau, poste, quartier, avatar'),
  ]);

  // `participants` : seulement les miennes → pour savoir sur quelles dispos
  // afficher "Dans le run" + le chat. On ne lance la requête QUE si on a un
  // utilisateur (sinon `account_id=eq.` vide renvoie une erreur 400).
  const { data: mesParticipations } = user
    ? await client
        .from('participants')
        .select('dispo_id')
        .eq('account_id', user.id)
    : { data: [] };

  // On range les profils par account_id pour les retrouver vite (le "JOIN").
  const profilsParCompte = new Map(
    (profils ?? []).map((p) => [p.account_id, p]),
  );

  // La liste (en texte) des dispos que j'ai déjà rejointes.
  const dejaRejoints = (mesParticipations ?? []).map((p) => p.dispo_id);

  // Un annuaire account_id -> {pseudo, avatar} : sert au chat à afficher
  // le pseudo + l'avatar de l'auteur de chaque message.
  const pseudos: Record<string, { pseudo: string; avatar: string }> = {};
  for (const p of profils ?? []) {
    pseudos[p.account_id] = { pseudo: p.pseudo, avatar: p.avatar };
  }

  // Pour chaque dispo, on attache le profil de celui qui l'a postée.
  const liste: DispoJoueur[] = (dispos ?? []).map((d) => {
    const profil = profilsParCompte.get(d.account_id);

    return {
      id: d.id,
      organisateurId: d.account_id, // qui a posté la dispo (= l'organisateur)
      pseudo: profil?.pseudo ?? 'Joueur',
      niveau: profil?.niveau ?? '',
      poste: profil?.poste ?? '',
      quartier: profil?.quartier ?? '',
      avatar: profil?.avatar ?? '',
      lieu: d.lieu,
      creneau: d.creneau,
      places: d.places,
      interesses: 0, // pas (encore) de colonne pour ça — on le laisse à 0
    };
  });

  return (
    <TrouverListe
      dispos={liste}
      moiId={user?.id ?? ''}
      dejaRejoints={dejaRejoints}
      pseudos={pseudos}
    />
  );
}

export default TrouverPage;
