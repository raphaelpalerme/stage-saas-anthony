'use client';

import { useState } from 'react';

import { ArrowRight, Check, MapPin, Users, Zap } from 'lucide-react';

import { Avatar, AvatarFallback } from '@kit/ui/avatar';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { NativeSelect, NativeSelectOption } from '@kit/ui/native-select';
import { PageBody } from '@kit/ui/page';

import { BoutonRetour } from '../../_components/bouton-retour';
import { PageBackground } from '../../_components/page-background';

// Le "type" d'une dispo affichée dans "Trouver" : une vraie annonce de joueur.
// L'id est maintenant un uuid (texte), car il vient de la base.
export type DispoJoueur = {
  id: string;
  pseudo: string;
  niveau: string;
  poste: string;
  quartier: string;
  lieu: string;
  creneau: string;
  places: number; // joueurs encore recherchés
  interesses: number; // joueurs qui ont déjà cliqué "Je suis chaud"
};

// Les niveaux pour le filtre ("Tous" = on ne filtre pas).
const FILTRES_NIVEAU = ['Tous', 'Débutant', 'Moyen', 'Confirmé'];

// Une palette de couleurs pour les avatars (comme Discord/Slack).
const COULEURS_AVATAR = [
  '#EA580C',
  '#0284C7',
  '#22C55E',
  '#A855F7',
  '#F59E0B',
  '#EC4899',
];

// On choisit une couleur STABLE à partir du pseudo : le même joueur garde
// toujours la même couleur (on additionne les codes des lettres).
function couleurAvatar(pseudo: string) {
  let somme = 0;
  for (const lettre of pseudo) somme += lettre.charCodeAt(0);
  return COULEURS_AVATAR[somme % COULEURS_AVATAR.length];
}

// La liste reçoit les vraies dispos en prop (récupérées côté serveur dans page.tsx).
export function TrouverListe(props: { dispos: DispoJoueur[] }) {
  // La liste vit dans un state : "Rejoindre" modifie les places localement.
  const [dispos, setDispos] = useState<DispoJoueur[]>(props.dispos);

  // "Tes critères" : pilotent le TRI par pertinence.
  const [monQuartier, setMonQuartier] = useState('Belleville');
  const [monNiveau, setMonNiveau] = useState('Confirmé');

  // Les filtres.
  const [recherche, setRecherche] = useState(''); // terrain, quartier, créneau, pseudo
  const [filtreNiveau, setFiltreNiveau] = useState('Tous');

  // Les id des dispos que j'ai rejointes (mémoire temporaire).
  const [rejoints, setRejoints] = useState<string[]>([]);

  // Cliquer "Je suis chaud" : on rejoint (-1 place, +1 intéressé) ou on annule.
  function toggleRejoindre(id: string) {
    const dejaRejoint = rejoints.includes(id);

    setDispos((liste) =>
      liste.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          places: dejaRejoint ? d.places + 1 : d.places - 1,
          interesses: dejaRejoint ? d.interesses - 1 : d.interesses + 1,
        };
      }),
    );

    setRejoints((ids) =>
      dejaRejoint ? ids.filter((x) => x !== id) : [...ids, id],
    );
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
    <PageBody className={'relative -mx-4 overflow-hidden px-4 lg:mx-0'}>
      <PageBackground />
      <div
        className={
          'relative z-10 mx-auto my-auto flex w-full max-w-xl flex-col gap-7 py-10'
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
                      {/* Avatar avec l'initiale, couleur propre au joueur */}
                      <Avatar className={'size-12'}>
                        <AvatarFallback
                          className={
                            'text-xl font-extrabold text-black uppercase'
                          }
                          style={{ backgroundColor: couleurAvatar(d.pseudo) }}
                        >
                          {d.pseudo.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Pseudo + badges */}
                      <div className={'flex flex-1 flex-col gap-1'}>
                        <div className={'flex flex-wrap items-center gap-2'}>
                          <span
                            className={'font-heading text-xl tracking-wide'}
                          >
                            {d.pseudo}
                          </span>
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

                    {/* Bouton pour rejoindre le run */}
                    <Button
                      onClick={() => toggleRejoindre(d.id)}
                      disabled={complet && !rejoint}
                      className={
                        rejoint
                          ? 'font-heading w-full gap-2 bg-[#22C55E] text-base tracking-[0.15em] text-black uppercase hover:bg-[#22C55E] hover:brightness-110'
                          : 'font-heading w-full gap-2 bg-[#EA580C] text-base tracking-[0.15em] text-black uppercase hover:bg-[#EA580C] hover:brightness-110'
                      }
                    >
                      {rejoint ? (
                        <>
                          <Check className={'size-4'} strokeWidth={3} />
                          Dans le run
                        </>
                      ) : complet ? (
                        'Complet'
                      ) : (
                        <>
                          Je suis chaud
                          <ArrowRight className={'size-4'} strokeWidth={3} />
                        </>
                      )}
                    </Button>
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
