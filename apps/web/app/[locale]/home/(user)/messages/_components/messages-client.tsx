'use client';

import { useState, useTransition } from 'react';

import { Check, MessageCircle, Search, UserPlus, X } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Button } from '@kit/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@kit/ui/drawer';
import { Input } from '@kit/ui/input';
import { PageBody } from '@kit/ui/page';

import { avatarUrl } from '../../_lib/avatars';
import {
  sedesabonnerAction,
  suivreAction,
} from '../../_lib/server/follow-actions';
import { BoutonRetour } from '../../_components/bouton-retour';
import { PageBackground } from '../../_components/page-background';
import { DmThread } from './dm-thread';

// Un joueur affiché dans la liste / la recherche.
export type Joueur = { id: string; pseudo: string; avatar: string };

// Une conversation = un joueur + un aperçu du dernier message + l'état non-lu.
export type Conversation = Joueur & { apercu: string; nonLu: boolean };

export function MessagesClient(props: {
  moiId: string;
  joueurs: Joueur[];
  conversations: Conversation[];
  mesAbonnements: string[];
}) {
  const [recherche, setRecherche] = useState('');
  // Le joueur avec qui on discute (ouvre le panneau de conversation).
  const [selection, setSelection] = useState<Joueur | null>(null);
  // Les joueurs que je suis (pour l'état du bouton Suivre/Abonné).
  const [suivis, setSuivis] = useState<string[]>(props.mesAbonnements);
  const [, startTransition] = useTransition();

  // S'abonner / se désabonner d'un joueur (optimiste).
  function toggleSuivre(joueurId: string) {
    const deja = suivis.includes(joueurId);
    setSuivis((ids) =>
      deja ? ids.filter((x) => x !== joueurId) : [...ids, joueurId],
    );

    startTransition(async () => {
      const resultat = deja
        ? await sedesabonnerAction({ suiviId: joueurId })
        : await suivreAction({ suiviId: joueurId });

      // En cas d'échec, on annule l'affichage.
      if (resultat?.serverError ?? resultat?.validationErrors) {
        setSuivis((ids) =>
          deja ? [...ids, joueurId] : ids.filter((x) => x !== joueurId),
        );
      }
    });
  }

  // En recherche : on filtre TOUS les joueurs par pseudo.
  // Sinon : on montre mes conversations existantes.
  const texte = recherche.trim().toLowerCase();
  const liste = texte
    ? props.joueurs.filter((j) => j.pseudo.toLowerCase().includes(texte))
    : props.conversations;

  return (
    <PageBody className={'relative -mx-4 overflow-hidden px-4 lg:mx-0'}>
      <PageBackground />
      <div
        className={
          'relative z-10 mx-auto my-auto flex w-full max-w-xl flex-col gap-7 pt-10 pb-28'
        }
      >
        <BoutonRetour />

        {/* En-tête */}
        <div className={'flex flex-col gap-3'}>
          <div className={'flex items-center gap-3'}>
            <span className={'h-0.5 w-10 bg-[#EA580C]'} />
            <span
              className={
                'text-base font-bold tracking-[0.2em] text-[#a3a3a8] uppercase sm:text-lg'
              }
            >
              Messages
            </span>
          </div>
          <h1
            className={
              'font-heading bg-gradient-to-br from-white via-[#fdba74] to-[#EA580C] bg-clip-text text-4xl leading-none font-normal tracking-wide text-transparent sm:text-5xl'
            }
          >
            Parle aux joueurs
          </h1>
          <p className={'text-muted-foreground text-sm'}>
            Cherche n&apos;importe quel joueur et envoie-lui un message privé.
          </p>
        </div>

        {/* Recherche */}
        <div className={'relative'}>
          <Search
            className={
              'text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2'
            }
          />
          <Input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder={'Rechercher un joueur par pseudo…'}
            className={'pl-9'}
            data-test={'recherche-joueur'}
          />
        </div>

        {/* Titre de section */}
        <span
          className={
            'text-xs font-bold tracking-[0.2em] text-[#7c7c82] uppercase'
          }
        >
          {texte ? 'Résultats' : 'Mes conversations'}
        </span>

        {/* Liste */}
        <div className={'flex flex-col gap-2'}>
          {liste.length > 0 ? (
            liste.map((j) => {
              const abonne = suivis.includes(j.id);
              // L'aperçu + l'état non-lu n'existent que pour les conversations.
              const apercu = 'apercu' in j ? (j.apercu as string) : '';
              const nonLu = 'nonLu' in j ? Boolean(j.nonLu) : false;
              return (
                <div
                  key={j.id}
                  className={
                    'flex items-center gap-2 rounded-2xl border border-white/10 p-3'
                  }
                >
                  {/* Avatar + pseudo + aperçu : ouvre la conversation */}
                  <button
                    type={'button'}
                    onClick={() => setSelection(j)}
                    data-test={'ouvrir-dm'}
                    className={'flex min-w-0 flex-1 items-center gap-3 text-left'}
                  >
                    <Avatar className={'size-11 shrink-0'}>
                      <AvatarImage
                        src={avatarUrl(j.pseudo, j.avatar)}
                        alt={j.pseudo}
                      />
                      <AvatarFallback className={'bg-muted uppercase'}>
                        {j.pseudo.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={'flex min-w-0 flex-1 flex-col'}>
                      <span className={'font-heading text-lg tracking-wide'}>
                        {j.pseudo}
                      </span>
                      {apercu ? (
                        <span
                          className={`truncate text-xs ${
                            nonLu ? 'font-bold text-white' : 'text-muted-foreground'
                          }`}
                        >
                          {apercu}
                        </span>
                      ) : null}
                    </div>
                    {/* Point rouge si messages non lus */}
                    {nonLu ? (
                      <span
                        className={'size-2.5 shrink-0 rounded-full bg-red-500'}
                      />
                    ) : null}
                  </button>

                  {/* Bouton Suivre / Abonné */}
                  <Button
                    onClick={() => toggleSuivre(j.id)}
                    size={'sm'}
                    data-test={'suivre'}
                    className={
                      abonne
                        ? 'gap-1.5 border border-white/15 bg-transparent text-[#a3a3a8] hover:bg-white/5'
                        : 'gap-1.5 bg-[#EA580C] font-bold text-black hover:bg-[#EA580C] hover:brightness-110'
                    }
                  >
                    {abonne ? (
                      <>
                        <Check className={'size-4'} /> Abonné
                      </>
                    ) : (
                      <>
                        <UserPlus className={'size-4'} /> Suivre
                      </>
                    )}
                  </Button>

                  {/* Raccourci message */}
                  <button
                    type={'button'}
                    onClick={() => setSelection(j)}
                    aria-label={'Message'}
                    className={
                      'text-muted-foreground rounded-full p-2 hover:bg-white/5'
                    }
                  >
                    <MessageCircle className={'size-5'} />
                  </button>
                </div>
              );
            })
          ) : (
            <p className={'text-muted-foreground py-8 text-center text-sm'}>
              {texte
                ? 'Aucun joueur trouvé pour cette recherche.'
                : 'Pas encore de conversation. Cherche un joueur ci-dessus pour lui parler ! 🏀'}
            </p>
          )}
        </div>
      </div>

      {/* Panneau de conversation (s'ouvre quand on choisit un joueur) */}
      <Drawer
        open={selection !== null}
        onOpenChange={(ouvert) => {
          if (!ouvert) setSelection(null);
        }}
      >
        <DrawerContent
          className={'data-[vaul-drawer-direction=bottom]:max-h-[85vh]'}
        >
          <DrawerHeader
            className={'flex flex-row items-center justify-between gap-2'}
          >
            <DrawerTitle className={'flex items-center gap-2'}>
              {selection ? (
                <Avatar className={'size-7'}>
                  <AvatarImage
                    src={avatarUrl(selection.pseudo, selection.avatar)}
                    alt={selection.pseudo}
                  />
                  <AvatarFallback className={'bg-muted text-xs uppercase'}>
                    {selection.pseudo.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : null}
              {selection?.pseudo}
            </DrawerTitle>
            <DrawerClose
              aria-label={'Fermer'}
              className={
                'text-muted-foreground rounded-full p-1 hover:bg-white/10'
              }
            >
              <X className={'size-5'} />
            </DrawerClose>
          </DrawerHeader>

          <div
            className={
              'mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col px-4 pb-6'
            }
          >
            {selection ? (
              <DmThread
                moiId={props.moiId}
                autreId={selection.id}
                autrePseudo={selection.pseudo}
              />
            ) : null}
          </div>
        </DrawerContent>
      </Drawer>
    </PageBody>
  );
}
