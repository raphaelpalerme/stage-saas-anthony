import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

import { DispoForm, type Dispo } from './_components/dispo-form';

// Page SERVEUR : lit les dispos de l'utilisateur connecté, les plus récentes
// en premier, puis les passe au formulaire (composant client).
async function DispoPage() {
  const user = await requireUserInServerComponent();
  const client = getSupabaseServerClient();

  const { data } = await client
    .from('disponibilites')
    .select('id, lieu, creneau, niveau_recherche, places, note')
    .eq('account_id', user.id)
    .order('created_at', { ascending: false });

  // On traduit les colonnes snake_case de la base vers le camelCase du code.
  const dispos: Dispo[] = (data ?? []).map((d) => ({
    id: d.id,
    lieu: d.lieu,
    creneau: d.creneau,
    niveauRecherche: d.niveau_recherche,
    places: d.places,
    note: d.note,
  }));

  return <DispoForm dispos={dispos} />;
}

export default DispoPage;
