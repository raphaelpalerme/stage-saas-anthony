import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { TrouverListe, type DispoJoueur } from './_components/trouver-liste';

// Page SERVEUR : elle tourne côté serveur, lit la base (RLS appliquée),
// recolle profils + dispos, puis passe la liste au composant client.
async function TrouverPage() {
  const client = getSupabaseServerClient();

  // On récupère les 2 tables en parallèle. Grâce à la RLS "lire tout",
  // on voit TOUS les joueurs connectés, pas seulement soi.
  const [{ data: dispos }, { data: profils }] = await Promise.all([
    client
      .from('disponibilites')
      .select('id, lieu, creneau, places, account_id'),
    client
      .from('profils')
      .select('account_id, pseudo, niveau, poste, quartier'),
  ]);

  // On range les profils par account_id pour les retrouver vite (le "JOIN").
  const profilsParCompte = new Map(
    (profils ?? []).map((p) => [p.account_id, p]),
  );

  // Pour chaque dispo, on attache le profil de celui qui l'a postée.
  const liste: DispoJoueur[] = (dispos ?? []).map((d) => {
    const profil = profilsParCompte.get(d.account_id);

    return {
      id: d.id,
      pseudo: profil?.pseudo ?? 'Joueur',
      niveau: profil?.niveau ?? '',
      poste: profil?.poste ?? '',
      quartier: profil?.quartier ?? '',
      lieu: d.lieu,
      creneau: d.creneau,
      places: d.places,
      interesses: 0, // pas (encore) de colonne pour ça — on le laisse à 0
    };
  });

  return <TrouverListe dispos={liste} />;
}

export default TrouverPage;
