import Link from 'next/link';

import { ArrowRight, CalendarPlus, User, Users } from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Badge } from '@kit/ui/badge';
import { Card, CardContent } from '@kit/ui/card';
import { PageBody } from '@kit/ui/page';

import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

import { emojiAvatar } from './_lib/avatars';
import { MenuAccueil } from './_components/menu-accueil';
import { PageBackground } from './_components/page-background';

export const metadata = {
  title: 'Pickify',
};

// Page d'accueil de l'app (zone connectée). C'est ICI qu'on atterrit en entrant
// dans Pickify et quand on clique sur "Retour". Page SERVEUR : elle lit ton
// profil en base (même mécanisme que la page profil) pour afficher ta carte de
// joueur, puis propose des raccourcis vers tes 3 features.
async function UserHomePage() {
  const user = await requireUserInServerComponent();
  const client = getSupabaseServerClient();

  const { data: profil } = await client
    .from('profils')
    .select('pseudo, niveau, poste, quartier, bio, avatar')
    .eq('account_id', user.id)
    .maybeSingle();

  // A-t-on déjà un profil rempli ? (on se base sur le pseudo)
  const aUnProfil = Boolean(profil?.pseudo);

  // Les 3 raccourcis vers les features, dans l'ordre du parcours :
  // d'abord se créer un profil, puis poster une dispo, puis trouver des joueurs.
  const features = [
    {
      href: '/home/profil',
      titre: 'Mon profil',
      desc: 'Niveau, poste, quartier — ta carte de joueur.',
      Icon: User,
    },
    {
      href: '/home/dispo',
      titre: 'Poster une dispo',
      desc: 'Dis où et quand tu joues, les autres te rejoignent.',
      Icon: CalendarPlus,
    },
    {
      href: '/home/trouver',
      titre: 'Trouver des joueurs',
      desc: 'Vois qui est dispo dans ton quartier et rejoins une partie.',
      Icon: Users,
    },
  ];

  return (
    <PageBody className={'relative -mx-4 overflow-hidden px-4 lg:mx-0'}>
      <PageBackground />
      <div
        className={
          'relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-8 py-10'
        }
      >
        {/* ===== En-tête ===== */}
        <div className={'flex flex-col gap-3'}>
          <div className={'flex items-center justify-between gap-3'}>
            <div className={'flex items-center gap-3'}>
              <span className={'h-0.5 w-10 bg-[#EA580C]'} />
              <span
                className={
                  'text-base font-bold tracking-[0.2em] text-[#a3a3a8] uppercase sm:text-lg'
                }
              >
                Pickify
              </span>
            </div>

            {/* Menu ☰ : thème + déconnexion */}
            <MenuAccueil />
          </div>
          <h1
            className={
              'font-heading bg-gradient-to-br from-white via-[#fdba74] to-[#EA580C] bg-clip-text text-4xl leading-none font-normal tracking-wide text-transparent sm:text-5xl'
            }
          >
            {aUnProfil ? `Salut ${profil?.pseudo} 👋` : 'Bienvenue sur Pickify 🏀'}
          </h1>
          <p className={'text-muted-foreground text-sm'}>
            {aUnProfil
              ? 'Prêt à jouer ? Choisis ce que tu veux faire.'
              : 'Commence par créer ton profil de joueur, puis trouve une partie.'}
          </p>
        </div>

        {/* ===== Ta carte de joueur (ou invitation à créer le profil) ===== */}
        {aUnProfil ? (
          <Card className={'rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]'}>
            <CardContent className={'flex flex-col gap-4 p-6'}>
              <span
                className={
                  'text-xs font-bold tracking-[0.2em] text-[#7c7c82] uppercase'
                }
              >
                Ta carte de joueur
              </span>
              <div className={'flex items-center gap-3'}>
                <span
                  className={
                    'flex size-12 items-center justify-center rounded-full bg-white/5 text-3xl'
                  }
                >
                  {emojiAvatar(profil?.pseudo ?? '', profil?.avatar)}
                </span>
                <span className={'font-heading text-2xl tracking-wide'}>
                  {profil?.pseudo}
                </span>
              </div>
              <div className={'flex flex-wrap gap-2'}>
                {profil?.poste ? (
                  <Badge
                    className={'border-[#EA580C]/40 bg-[#EA580C]/15 text-[#fdba74]'}
                  >
                    {profil.poste}
                  </Badge>
                ) : null}
                {profil?.niveau ? (
                  <Badge
                    className={'border-[#0284C7]/40 bg-[#0284C7]/15 text-[#7dd3fc]'}
                  >
                    {profil.niveau}
                  </Badge>
                ) : null}
                {profil?.quartier ? (
                  <Badge className={'border-white/20 bg-white/10 text-[#a3a3a8]'}>
                    {profil.quartier}
                  </Badge>
                ) : null}
              </div>
              {profil?.bio ? (
                <p className={'text-muted-foreground text-sm italic'}>
                  « {profil.bio} »
                </p>
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <Card
            className={
              'rounded-2xl border-[#EA580C]/30 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            }
          >
            <CardContent className={'flex flex-col items-start gap-4 p-6'}>
              <p className={'text-sm'}>
                Tu n&apos;as pas encore de profil. Crée-le pour que les autres
                joueurs puissent te trouver.
              </p>
              <Link
                href={'/home/profil'}
                className={
                  'inline-flex items-center gap-2 rounded-full bg-[#EA580C] px-5 py-2.5 text-sm font-extrabold text-black transition hover:brightness-110'
                }
              >
                Créer mon profil <ArrowRight className={'size-4'} />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* ===== Les 3 features ===== */}
        <div className={'grid gap-4 sm:grid-cols-3'}>
          {features.map(({ href, titre, desc, Icon }) => (
            <Link key={href} href={href} className={'block'}>
              <Card
                className={
                  'h-full rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-[#EA580C]/40'
                }
              >
                <CardContent className={'flex h-full flex-col gap-3 p-6'}>
                  <Icon className={'size-6 text-[#EA580C]'} />
                  <span className={'font-heading text-lg tracking-wide'}>
                    {titre}
                  </span>
                  <span className={'text-muted-foreground text-sm'}>{desc}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageBody>
  );
}

export default UserHomePage;
