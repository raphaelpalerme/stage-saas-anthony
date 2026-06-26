'use client';

import Link from 'next/link';

import { useState, useTransition } from 'react';

import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Users,
  X,
  Zap,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@kit/ui/drawer';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { NativeSelect, NativeSelectOption } from '@kit/ui/native-select';
import { PageBody } from '@kit/ui/page';

import { avatarUrl } from '../../_lib/avatars';
import { BoutonRetour } from '../../_components/bouton-retour';
import { PageBackground } from '../../_components/page-background';
import {
  quitterDispoAction,
  rejoindreDispoAction,
} from '../_lib/server/chat-actions';
import { ChatPartie } from './chat-partie';

// Le "type" d'une dispo affichée dans "Trouver" : une vraie annonce de joueur.
// L'id est maintenant un uuid (texte), car il vient de la base.
export type DispoJoueur = {
  id: string;
  organisateurId: string; // qui a posté la dispo (account_id de l'organisateur)
  pseudo: string;
  niveau: string;
  poste: string;
  quartier: string;
  avatar: string; // l'emoji choisi par le joueur (vide = emoji de secours)
  lieu: string;
  creneau: string;
  places: number; // joueurs encore recherchés
  interesses: number; // joueurs qui ont déjà cliqué "Je suis chaud"
};

// L'annuaire account_id -> pseudo/avatar (passé au chat pour afficher l'auteur).
type Pseudos = Record<string, { pseudo: string; avatar: string }>;

// Les niveaux pour le filtre ("Tous" = on ne filtre pas).
const FILTRES_NIVEAU = ['Tous', 'Débutant', 'Moyen', 'Confirmé'];

// La liste reçoit les vraies dispos en prop (récupérées côté serveur dans page.tsx).
export function TrouverListe(props: {
  dispos: DispoJoueur[];
  moiId: string; // mon account_id (pour savoir quels chats sont à moi)
  dejaRejoints: string[]; // les dispos que j'ai DÉJÀ rejointes (lues en base)
  pseudos: Pseudos; // pseudo/avatar de chaque joueur, pour le chat
}) {
  // La liste vit dans un state : "Rejoindre" modifie les places localement.
  const [dispos, setDispos] = useState<DispoJoueur[]>(props.dispos);

  // "Tes critères" : pilotent le TRI par pertinence.
  const [monQuartier, setMonQuartier] = useState('Belleville');
  const [monNiveau, setMonNiveau] = useState('Confirmé');

  // Les filtres.
  const [recherche, setRecherche] = useState(''); // terrain, quartier, créneau, pseudo
  const [filtreNiveau, setFiltreNiveau] = useState('Tous');

  // Les id des dispos que j'ai rejointes — pré-rempli depuis la BASE.
  const [rejoints, setRejoints] = useState<string[]>(props.dejaRejoints);
  const [enCours, startTransition] = useTransition();

  // Met à jour l'affichage d'une dispo : +1/-1 place et intéressés.
  // `rejoindre = true` quand on rejoint, `false` quand on quitte.
  function majAffichage(id: string, rejoindre: boolean) {
    setDispos((liste) =>
      liste.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          places: rejoindre ? d.places - 1 : d.places + 1,
          interesses: rejoindre ? d.interesses + 1 : d.interesses - 1,
        };
      }),
    );
    setRejoints((ids) =>
      rejoindre ? [...ids, id] : ids.filter((x) => x !== id),
    );
  }

  // Cliquer "Je suis chaud" : on rejoint/quitte EN BASE (server action),
  // et on met à jour l'affichage dans la foulée.
  function toggleRejoindre(id: string) {
    const dejaRejoint = rejoints.includes(id);
    const rejoindre = !dejaRejoint;

    // 1) retour visuel immédiat (optimiste)
    majAffichage(id, rejoindre);

    // 2) on enregistre vraiment en base
    startTransition(async () => {
      const resultat = rejoindre
        ? await rejoindreDispoAction({ dispoId: id })
        : await quitterDispoAction({ dispoId: id });

      // 3) si la base a refusé : on ANNULE l'affichage (on revient en arrière),
      //    sinon l'écran mentirait ("Dans le run" sans ligne en base → chat cassé).
      if (resultat?.serverError ?? resultat?.validationErrors) {
        majAffichage(id, !rejoindre);
      }
    });
  }

  // Un score de pertinence : +2 si même quartier que moi, +1 si même niveau.
  function pertinence(d: DispoJoueur) {
    let score = 0;
    if (monQuartier && d.quartier.toLowerCase() === monQuartier.toLowerCase()) {
      score += 2;
    }
    if (d.niveau === monNiveau) score += 1;
    return score;
  }

  // 1) On filtre : la recherche texte + le filtre de niveau.
  const texte = recherche.toLowerCase();
  const filtrees = dispos.filter((d) => {
    const matchTexte =
      d.lieu.toLowerCase().includes(texte) ||
      d.quartier.toLowerCase().includes(texte) ||
      d.creneau.toLowerCase().includes(texte) ||
      d.pseudo.toLowerCase().includes(texte);

    const matchNiveau = filtreNiveau === 'Tous' || d.niveau === filtreNiveau;

    return matchTexte && matchNiveau;
  });

  // 2) On trie : les plus pertinents en premier ([...] = on ne touche pas l'original).
  const resultats = [...filtrees].sort((a, b) => pertinence(b) - pertinence(a));

  return (
    <PageBody className={'relative -mx-4 overflow-x-clip px-4 lg:mx-0'}>
      <PageBackground />
      <div
        className={
          'relative z-10 mx-auto my-auto flex w-full max-w-xl flex-col gap-7 pt-10 pb-28'
        }
      >
        <BoutonRetour />

        {/* ===== En-tête ===== */}
        <div className={'flex flex-col gap-3'}>
          <div className={'flex items-center gap-3'}>
            <span className={'h-0.5 w-10 bg-[#EA580C]'} />
            <span
              className={
                'text-base font-bold tracking-[0.2em] text-[#a3a3a8] uppercase sm:text-lg'
              }
            >
              Trouver des joueurs
            </span>
          </div>
          <h1
            className={
              'font-heading bg-gradient-to-br from-white via-[#fdba74] to-[#EA580C] bg-clip-text text-4xl leading-none font-normal tracking-wide text-transparent sm:text-5xl'
            }
          >
            Qui joue près de toi ?
          </h1>
          <p className={'text-muted-foreground text-sm'}>
            Les joueurs de ton quartier et de ton niveau remontent en premier.
          </p>
        </div>

        {/* ===== Tes critères (pilotent le tri par pertinence) ===== */}
        <div className={'flex flex-col gap-3'}>
          <div className={'flex items-center gap-3'}>
            <span className={'h-0.5 w-7 bg-[#EA580C]'} />
            <span
              className={
                'text-xs font-bold tracking-[0.2em] text-[#7c7c82] uppercase'
              }
            >
              Tes critères
            </span>
          </div>
          <p className={'text-muted-foreground text-sm'}>
            Dis-nous qui tu es : on fait remonter en premier les joueurs de ton
            quartier et de ton niveau.
          </p>
          <Card
            className={
              'rounded-2xl border-[#EA580C]/30 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            }
          >
            <CardContent
              className={'flex flex-col gap-7 p-8 sm:flex-row sm:gap-6'}
            >
              <div className={'flex flex-1 flex-col gap-2.5'}>
                <Label htmlFor={'monQuartier'}>Ton quartier</Label>
                <Input
                  id={'monQuartier'}
                  placeholder={'Ex. Belleville'}
                  value={monQuartier}
                  onChange={(e) => setMonQuartier(e.target.value)}
                />
              </div>
              <div className={'flex flex-1 flex-col gap-2.5'}>
                <Label htmlFor={'monNiveau'}>Ton niveau</Label>
                <NativeSelect
                  id={'monNiveau'}
                  value={monNiveau}
                  onChange={(e) => setMonNiveau(e.target.value)}
                >
                  {FILTRES_NIVEAU.filter((n) => n !== 'Tous').map((n) => (
                    <NativeSelectOption key={n} value={n}>
                      {n}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ===== Filtres ===== */}
        <div className={'flex flex-col gap-7 sm:flex-row sm:gap-6'}>
          <div className={'flex flex-[2] flex-col gap-2.5'}>
            <Label htmlFor={'recherche'}>Rechercher</Label>
            <Input
              id={'recherche'}
              placeholder={'Terrain, quartier, créneau, pseudo…'}
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>
          <div className={'flex flex-1 flex-col gap-2'}>
            <Label htmlFor={'filtreNiveau'}>Niveau</Label>
            <NativeSelect
              id={'filtreNiveau'}
              value={filtreNiveau}
              onChange={(e) => setFiltreNiveau(e.target.value)}
            >
              {FILTRES_NIVEAU.map((n) => (
                <NativeSelectOption key={n} value={n}>
                  {n}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>

        {/* Compteur de résultats */}
        <span
          className={
            'text-xs font-bold tracking-[0.2em] text-[#7c7c82] uppercase'
          }
        >
          {resultats.length} joueur{resultats.length > 1 ? 's' : ''} trouvé
          {resultats.length > 1 ? 's' : ''}
        </span>

        {/* ===== Liste des joueurs dispos ===== */}
        <div className={'flex flex-col gap-3'}>
          {resultats.length > 0 ? (
            resultats.map((d) => {
              const rejoint = rejoints.includes(d.id);
              const complet = d.places <= 0;
              // Est-ce MA partie (je l'ai postée) ?
              const estOrganisateur = d.organisateurId === props.moiId;
              // Suis-je "dans la partie" ? → j'y ai accès au chat.
              const dansLaPartie = rejoint || estOrganisateur;
              // "Match" : même quartier ET même niveau que moi.
              const match =
                !!monQuartier &&
                d.quartier.toLowerCase() === monQuartier.toLowerCase() &&
                d.niveau === monNiveau;

              return (
                <Card
                  key={d.id}
                  className={`rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 ${
                    rejoint
                      ? 'border-[#22C55E]/60 bg-[#22C55E]/5'
                      : match
                        ? 'border-[#EA580C]/50'
                        : ''
                  }`}
                >
                  <CardContent className={'flex flex-col gap-4 pt-6'}>
                    <div className={'flex items-center gap-4'}>
                      {/* Avatar du joueur → clic = sa page profil (pour voir
                          qui c'est et s'abonner). */}
                      <Link
                        href={`/home/joueur/${d.organisateurId}`}
                        aria-label={`Voir le profil de ${d.pseudo}`}
                      >
                        <Avatar className={'size-12 transition hover:opacity-80'}>
                          <AvatarImage
                            src={avatarUrl(d.pseudo, d.avatar)}
                            alt={d.pseudo}
                          />
                          <AvatarFallback className={'bg-white/5 uppercase'}>
                            {d.pseudo.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Link>

                      {/* Pseudo + badges */}
                      <div className={'flex flex-1 flex-col gap-1'}>
                        <div className={'flex flex-wrap items-center gap-2'}>
                          <Link
                            href={`/home/joueur/${d.organisateurId}`}
                            className={
                              'font-heading text-xl tracking-wide transition hover:text-[#fdba74]'
                            }
                          >
                            {d.pseudo}
                          </Link>
                          {match ? (
                            <Badge
                              className={
                                'border-[#EA580C]/50 bg-[#EA580C]/15 text-[10px] font-bold tracking-widest text-[#fdba74] uppercase'
                              }
                            >
                              <Zap strokeWidth={3} />
                              Pour toi
                            </Badge>
                          ) : null}
                        </div>
                        <div className={'flex flex-wrap items-center gap-2'}>
                          <Badge
                            className={
                              'border-[#0284C7]/40 bg-[#0284C7]/15 text-[10px] font-bold tracking-widest text-[#7dd3fc] uppercase'
                            }
                          >
                            {d.niveau}
                          </Badge>
                          <span className={'text-muted-foreground text-xs'}>
                            {d.poste}
                          </span>
                          <span
                            className={
                              'text-muted-foreground flex items-center gap-1 text-xs'
                            }
                          >
                            <MapPin className={'size-3'} />
                            {d.quartier}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lieu + créneau */}
                    <span className={'text-muted-foreground text-sm'}>
                      {d.lieu} · {d.creneau}
                    </span>

                    {/* Signaux d'activité : places restantes + intéressés */}
                    <div
                      className={'flex flex-wrap items-center gap-2 text-xs'}
                    >
                      <Badge
                        className={
                          complet
                            ? 'border-white/20 bg-white/10 font-bold tracking-widest text-[#a3a3a8] uppercase'
                            : 'border-[#22C55E]/40 bg-[#22C55E]/15 font-bold tracking-widest text-[#22C55E] uppercase'
                        }
                      >
                        {complet
                          ? 'Complet'
                          : `Il reste ${d.places} place${d.places > 1 ? 's' : ''}`}
                      </Badge>
                      {d.interesses > 0 ? (
                        <span
                          className={
                            'text-muted-foreground flex items-center gap-1'
                          }
                        >
                          <Users className={'size-3'} />
                          {d.interesses} intéressé{d.interesses > 1 ? 's' : ''}
                        </span>
                      ) : null}
                    </div>

                    {/* Si c'est MA partie : pas de bouton "rejoindre", juste un repère.
                        Sinon : soit "Je suis chaud", soit (si déjà rejoint)
                        l'état "Dans le run" + un bouton "Quitter la partie". */}
                    {estOrganisateur ? (
                      <Badge
                        className={
                          'w-full justify-center border-[#0284C7]/40 bg-[#0284C7]/15 py-2 font-bold tracking-widest text-[#7dd3fc] uppercase'
                        }
                      >
                        Ta partie
                      </Badge>
                    ) : rejoint ? (
                      <div className={'flex flex-col gap-2'}>
                        {/* État : je suis dans la partie */}
                        <div
                          className={
                            'font-heading flex w-full items-center justify-center gap-2 rounded-md bg-[#22C55E]/15 py-2 text-base tracking-[0.15em] text-[#22C55E] uppercase'
                          }
                        >
                          <Check className={'size-4'} strokeWidth={3} />
                          Dans le run
                        </div>
                        {/* Bouton explicite pour quitter */}
                        <Button
                          variant={'outline'}
                          onClick={() => toggleRejoindre(d.id)}
                          disabled={enCours}
                          data-test={'quitter-partie'}
                          className={
                            'w-full gap-2 border-white/15 text-sm font-medium hover:border-red-400/40 hover:text-red-400'
                          }
                        >
                          <X className={'size-4'} />
                          Quitter la partie
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => toggleRejoindre(d.id)}
                        disabled={complet || enCours}
                        data-test={'rejoindre-partie'}
                        className={
                          'font-heading w-full gap-2 bg-[#EA580C] text-base tracking-[0.15em] text-black uppercase hover:bg-[#EA580C] hover:brightness-110'
                        }
                      >
                        {complet ? (
                          'Complet'
                        ) : (
                          <>
                            Je suis chaud
                            <ArrowRight className={'size-4'} strokeWidth={3} />
                          </>
                        )}
                      </Button>
                    )}

                    {/* Le chat de la partie : un bouton ouvre un panneau qui
                        glisse depuis le bas. Visible seulement si j'y suis
                        (organisateur ou joueur qui a rejoint). */}
                    {dansLaPartie ? (
                      <Drawer>
                        <DrawerTrigger
                          data-test={'ouvrir-chat'}
                          className={
                            'inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#EA580C]/40 bg-[#EA580C]/10 px-4 py-2 text-sm font-bold tracking-wide text-[#fdba74] uppercase transition hover:bg-[#EA580C]/20'
                          }
                        >
                          <MessageCircle className={'size-4'} />
                          Ouvrir le chat
                        </DrawerTrigger>

                        <DrawerContent
                          className={
                            'data-[vaul-drawer-direction=bottom]:mt-0 data-[vaul-drawer-direction=bottom]:h-[100dvh] data-[vaul-drawer-direction=bottom]:max-h-[100dvh] data-[vaul-drawer-direction=bottom]:rounded-none'
                          }
                        >
                          <DrawerHeader
                            className={
                              'flex flex-row items-center justify-between gap-2'
                            }
                          >
                            <DrawerTitle>
                              Chat — {d.lieu} · {d.creneau}
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

                          {/* La zone du chat remplit la place restante du panneau */}
                          <div
                            className={
                              'mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col px-4 pb-6'
                            }
                          >
                            <ChatPartie
                              dispoId={d.id}
                              moiId={props.moiId}
                              pseudos={props.pseudos}
                            />
                          </div>
                        </DrawerContent>
                      </Drawer>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className={'text-muted-foreground py-8 text-center text-sm'}>
              Aucun joueur pour ces critères. Essaie un autre quartier ou
              élargis le niveau à « Tous ». 🏀
            </p>
          )}
        </div>
      </div>
    </PageBody>
  );
}
