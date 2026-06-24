import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

import { ProfilForm } from './_components/profil-form';

// Page SERVEUR : elle lit le profil de l'utilisateur connecté dans la base,
// puis le passe au formulaire (composant client). Au chargement, ton profil
// déjà enregistré réapparaît tout seul — fini le "ça disparaît au refresh".
async function ProfilPage() {
  const user = await requireUserInServerComponent();
  const client = getSupabaseServerClient();

  const { data: profil } = await client
    .from('profils')
    .select('pseudo, niveau, poste, quartier, bio, avatar')
    .eq('account_id', user.id)
    .maybeSingle();

  return <ProfilForm profil={profil} />;
}

export default ProfilPage;
