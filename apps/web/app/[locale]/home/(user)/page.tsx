import Link from 'next/link';

import {
  ArrowRight,
  CalendarPlus,
  Clapperboard,
  MapPin,
  MessageCircle,
  Ruler,
  User,
  Users,
} from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Badge } from '@kit/ui/badge';
import { Card, CardContent } from '@kit/ui/card';
import { PageBody } from '@kit/ui/page';

import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

import { avatarUrl } from './_lib/avatars';
import { MenuAccueil } from './_components/menu-accueil';
import { PageBackground } from './_components/page-background';
import { UserNotifications } from './_components/user-notifications';

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
    .select('pseudo, niveau, poste, quartier, bio, avatar, taille, style_jeu')
    .eq('account_id', user.id)
    .maybeSingle();

  // A-t-on déjà un profil rempli ? (on se base sur le pseudo)
  const aUnProfil = Boolean(profil?.pseudo);

  // Stats sociales (highlights postés + likes reçus) pour la carte de joueur.
  const { data: mesHighlights } = await client
    .from('highlights')
    .select('id')
    .eq('account_id', user.id);

  const idsHighlights = (mesHighlights ?? []).map((h) => h.id);

  let likesRecus = 0;
  if (idsHighlights.length > 0) {
    const { count } = await client
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .in('highlight_id', idsHighlights);
    likesRecus = count ?? 0;
  }

  // Abonnés (qui me suit) + Abonnements (qui je suis).
  const [{ count: abonnes }, { count: abonnements }] = await Promise.all([
    client
      .from('abonnements')
      .select('*', { count: 'exact', head: true })
      .eq('suivi_id', user.id),
    client
      .from('abonnements')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', user.id),
  ]);

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
    {
      href: '/home/highlights',
      titre: 'Highlights',
      desc: 'Poste tes vidéos de basket et regarde celles des autres.',
      Icon: Clapperboard,
    },
    {
      href: '/home/messages',
      titre: 'Messages',
      desc: 'Cherche un joueur et discute avec lui en privé.',
      Icon: MessageCircle,
    },
  ];

  return (
    <PageBody className={'relative -mx-4 overflow-hidden px-4 lg:mx-0'}>
      <PageBackground />
      <div
        className={
          'relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-8 pt-10 pb-28'
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

            {/* Cloche de notifications + menu ☰ (en haut à droite) */}
            <div className={'flex items-center gap-1'}>
              <UserNotifications userId={user.id} />
              <MenuAccueil />
            </div>
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
              <div className={'flex items-center gap-4'}>
                <Avatar
                  className={
                    'size-16 ring-2 ring-[#EA580C]/40 ring-offset-2 ring-offset-background'
                  }
                >
                  <AvatarImage
                    src={avatarUrl(profil?.pseudo ?? '', profil?.avatar)}
                    alt={profil?.pseudo ?? ''}
                  />
                  <AvatarFallback className={'bg-white/5 text-xl uppercase'}>
                    {profil?.pseudo?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className={'flex flex-col gap-1'}>
                  <span className={'font-heading text-2xl tracking-wide'}>
                    {profil?.pseudo}
                  </span>
                  {profil?.quartier ? (
                    <span
                      className={
                        'text-muted-foreground flex items-center gap-1 text-sm'
                      }
                    >
                      <MapPin className={'size-3.5'} />
                      {profil.quartier}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={'flex flex-wrap items-center gap-2'}>
                {profil?.niveau ? (
                  <Badge
                    className={'border-[#0284C7]/40 bg-[#0284C7]/15 text-[#7dd3fc]'}
                  >
                    {profil.niveau}
                  </Badge>
                ) : null}
                {profil?.poste ? (
                  <Badge
                    className={'border-[#EA580C]/40 bg-[#EA580C]/15 text-[#fdba74]'}
                  >
                    {profil.poste}
                  </Badge>
                ) : null}
                {profil?.style_jeu ? (
                  <Badge
                    className={'border-[#a855f7]/40 bg-[#a855f7]/15 text-[#d8b4fe]'}
                  >
                    {profil.style_jeu}
                  </Badge>
                ) : null}
                {profil?.taille ? (
                  <span
                    className={
                      'text-muted-foreground flex items-center gap-1 text-xs'
                    }
                  >
                    <Ruler className={'size-3.5'} />
                    {profil.taille}
                  </span>
                ) : null}
              </div>
              {profil?.bio ? (
                <p className={'text-muted-foreground text-sm italic'}>
                  « {profil.bio} »
                </p>
              ) : null}
              {/* Stats sociales (façon Insta) */}
              <div
                className={
                  'grid grid-cols-4 gap-2 border-t border-white/10 pt-4 text-center'
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
                <div className={'flex flex-col'}>
                  <span className={'font-heading text-xl'}>
                    {idsHighlights.length}
                  </span>
                  <span className={'text-muted-foreground text-[11px]'}>
                    Highlights
                  </span>
                </div>
                <div className={'flex flex-col'}>
                  <span className={'font-heading text-xl'}>{likesRecus}</span>
                  <span className={'text-muted-foreground text-[11px]'}>
                    Likes reçus
                  </span>
                </div>
              </div>
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

        {/* ===== Les features ===== */}
        <div className={'grid gap-4 sm:grid-cols-2'}>
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
