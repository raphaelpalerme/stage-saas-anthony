import { redirect } from 'next/navigation';

import { MapPin, Ruler } from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Badge } from '@kit/ui/badge';
import { Card, CardContent } from '@kit/ui/card';
import { PageBody } from '@kit/ui/page';

import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

import { BoutonRetour } from '../../_components/bouton-retour';
import { PageBackground } from '../../_components/page-background';
import { avatarUrl } from '../../_lib/avatars';
import { BoutonSuivre } from './_components/bouton-suivre';

// Page SERVEUR : le profil PUBLIC d'un autre joueur (lecture seule).
// On y arrive en cliquant sur un pseudo (notif "X s'est abonné à toi",
// listes d'abonnés, cartes "Trouver"). On peut s'abonner en retour ici.
// `params` est une Promise en Next.js 16 → on l'attend (`await`).
async function JoueurPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUserInServerComponent();

  // Si c'est MON profil, on m'envoie vers ma vraie page (modifiable).
  if (id === user.id) {
    redirect('/home/profil');
  }

  const client = getSupabaseServerClient();

  // Le profil du joueur (la RLS "lire tout" autorise à voir les autres).
  const { data: profil } = await client
    .from('profils')
    .select('pseudo, niveau, poste, quartier, bio, avatar, taille')
    .eq('account_id', id)
    .maybeSingle();

  // Stats + est-ce que je le suis déjà ? (3 requêtes en parallèle)
  const [{ count: abonnes }, { count: abonnements }, { data: dejaSuivi }] =
    await Promise.all([
      // Combien de personnes le suivent (lui = suivi_id).
      client
        .from('abonnements')
        .select('*', { count: 'exact', head: true })
        .eq('suivi_id', id),
      // Combien de personnes il suit (lui = follower_id).
      client
        .from('abonnements')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', id),
      // Est-ce que MOI je le suis déjà ?
      client
        .from('abonnements')
        .select('follower_id')
        .eq('follower_id', user.id)
        .eq('suivi_id', id)
        .maybeSingle(),
    ]);

  return (
    <PageBody className={'relative -mx-4 overflow-x-clip px-4 lg:mx-0'}>
      <PageBackground />
      <div
        className={
          'relative z-10 mx-auto my-auto flex w-full max-w-xl flex-col gap-7 pt-10 pb-28'
        }
      >
        <BoutonRetour />

        {!profil ? (
          <Card className={'rounded-2xl'}>
            <CardContent className={'flex flex-col items-center gap-2 py-10'}>
              <span className={'text-4xl'}>🤷</span>
              <p className={'text-muted-foreground text-center text-sm'}>
                Ce joueur n'a pas encore de profil, ou il est introuvable.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card
            className={
              'rounded-2xl border-[#EA580C]/30 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            }
          >
            <CardContent className={'flex flex-col items-center gap-5 p-8'}>
              {/* Avatar + pseudo */}
              <Avatar className={'size-24'}>
                <AvatarImage
                  src={avatarUrl(profil.pseudo, profil.avatar)}
                  alt={profil.pseudo}
                />
                <AvatarFallback className={'bg-white/5 text-2xl uppercase'}>
                  {profil.pseudo.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <h1 className={'font-heading text-2xl tracking-wide text-white'}>
                {profil.pseudo}
              </h1>

              {/* Badges : niveau, poste, quartier, taille */}
              <div className={'flex flex-wrap justify-center gap-2'}>
                {profil.niveau ? <Badge>{profil.niveau}</Badge> : null}
                {profil.poste ? (
                  <Badge variant={'outline'}>{profil.poste}</Badge>
                ) : null}
                {profil.quartier ? (
                  <Badge variant={'outline'}>
                    <MapPin className={'size-3'} />
                    {profil.quartier}
                  </Badge>
                ) : null}
                {profil.taille ? (
                  <Badge variant={'outline'}>
                    <Ruler className={'size-3'} />
                    {profil.taille}
                  </Badge>
                ) : null}
              </div>

              {/* Bio */}
              {profil.bio ? (
                <p
                  className={
                    'text-muted-foreground text-center text-sm italic'
                  }
                >
                  « {profil.bio} »
                </p>
              ) : null}

              {/* Stats sociales */}
              <div
                className={
                  'grid w-full grid-cols-2 gap-2 border-t border-white/10 pt-5 text-center'
                }
              >
                <div className={'flex flex-col'}>
                  <span className={'font-heading text-xl'}>{abonnes ?? 0}</span>
                  <span className={'text-muted-foreground text-[11px]'}>
                    Abonnés
                  </span>
                </div>
                <div className={'flex flex-col'}>
                  <span className={'font-heading text-xl'}>
                    {abonnements ?? 0}
                  </span>
                  <span className={'text-muted-foreground text-[11px]'}>
                    Abonnements
                  </span>
                </div>
              </div>

              {/* Le bouton s'abonner en retour */}
              <BoutonSuivre joueurId={id} dejaSuivi={dejaSuivi !== null} />
            </CardContent>
          </Card>
        )}
      </div>
    </PageBody>
  );
}

export default JoueurPage;
