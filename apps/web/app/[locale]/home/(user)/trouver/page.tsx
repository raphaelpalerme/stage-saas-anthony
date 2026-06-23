'use client';

import { useState } from 'react';

import { ArrowRight, Check } from 'lucide-react';

import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { PageBody } from '@kit/ui/page';

import { PageBackground } from '../_components/page-background';

// Le "type" d'une dispo d'un autre joueur.
type DispoJoueur = {
  id: number;
  pseudo: string;
  niveau: string;
  lieu: string;
  creneau: string;
};

// Joueurs d'exemple (en attendant la vraie base de données au jour 8).
const EXEMPLES: DispoJoueur[] = [
  { id: 1, pseudo: 'AnthoBall', niveau: 'Confirmé', lieu: 'City-stade Jaurès', creneau: 'Samedi 15h' },
  { id: 2, pseudo: 'KevDunk', niveau: 'Moyen', lieu: 'Playground Belleville', creneau: 'Dimanche 11h' },
  { id: 3, pseudo: 'LeoStreet', niveau: 'Débutant', lieu: 'City-stade Jaurès', creneau: 'Mercredi 17h' },
  { id: 4, pseudo: 'SaraHoops', niveau: 'Confirmé', lieu: 'Gymnase Pyrénées', creneau: 'Vendredi 18h30' },
];

function TrouverPage() {
  // Ce que l'utilisateur tape dans la barre de recherche.
  const [recherche, setRecherche] = useState('');

  // Les id des joueurs que j'ai rejoints (mémoire temporaire).
  const [rejoints, setRejoints] = useState<number[]>([]);

  // Cliquer "Je viens" : on ajoute (ou on retire) l'id de la liste.
  function toggleRejoindre(id: number) {
    if (rejoints.includes(id)) {
      // déjà rejoint → on annule
      setRejoints(rejoints.filter((x) => x !== id));
    } else {
      // pas encore → on l'ajoute
      setRejoints([...rejoints, id]);
    }
  }

  // On garde uniquement les dispos dont le lieu contient le texte cherché.
  const resultats = EXEMPLES.filter((d) =>
    d.lieu.toLowerCase().includes(recherche.toLowerCase()),
  );

  return (
    <PageBody className={'relative overflow-hidden'}>
      <PageBackground />
      <div className={'relative z-10 mx-auto flex w-full max-w-xl flex-col gap-7'}>
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
              'font-heading text-4xl leading-none font-normal tracking-wide sm:text-5xl'
            }
          >
            Qui joue près de toi ?
          </h1>
          <p className={'text-muted-foreground text-sm'}>
            Filtre par terrain et rejoins une partie qui te correspond.
          </p>
        </div>

        {/* ===== Barre de recherche ===== */}
        <div className={'flex flex-col gap-2'}>
          <Label htmlFor={'recherche'}>Chercher un terrain</Label>
          <Input
            id={'recherche'}
            placeholder={'Ex. Jaurès'}
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        {/* ===== Liste des joueurs dispos ===== */}
        <div className={'flex flex-col gap-3'}>
          {resultats.length > 0 ? (
            resultats.map((d) => {
              const rejoint = rejoints.includes(d.id);

              return (
                <Card
                  key={d.id}
                  className={`rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 ${
                    rejoint ? 'border-[#22C55E]/60 bg-[#22C55E]/5' : ''
                  }`}
                >
                  <CardContent className={'flex flex-col gap-4 pt-6'}>
                    <div className={'flex items-center gap-4'}>
                      {/* Avatar avec l'initiale */}
                      <div
                        className={
                          'flex size-12 shrink-0 items-center justify-center rounded-full bg-[#EA580C] text-xl font-extrabold text-black uppercase'
                        }
                      >
                        {d.pseudo.charAt(0)}
                      </div>

                      {/* Pseudo + niveau */}
                      <div className={'flex flex-1 flex-col gap-1'}>
                        <div className={'flex items-center gap-2'}>
                          <span className={'font-heading text-xl tracking-wide'}>
                            {d.pseudo}
                          </span>
                          <span
                            className={
                              'rounded-full border border-[#0284C7]/40 bg-[#0284C7]/15 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#7dd3fc] uppercase'
                            }
                          >
                            {d.niveau}
                          </span>
                        </div>
                        <span className={'text-muted-foreground text-sm'}>
                          {d.lieu} · {d.creneau}
                        </span>
                      </div>
                    </div>

                    {/* Bouton pour rejoindre le run */}
                    <Button
                      onClick={() => toggleRejoindre(d.id)}
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
              Aucun joueur trouvé pour « {recherche} ».
            </p>
          )}
        </div>
      </div>
    </PageBody>
  );
}

export default TrouverPage;
