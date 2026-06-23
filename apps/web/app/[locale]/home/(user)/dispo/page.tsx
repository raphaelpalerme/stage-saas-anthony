'use client';

import { useState } from 'react';

import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { PageBody } from '@kit/ui/page';

import { PageBackground } from '../_components/page-background';

// Le "type" d'une dispo : un lieu et un créneau.
type Dispo = {
  id: number;
  lieu: string;
  creneau: string;
};

function DispoPage() {
  // Ce qu'on tape dans le formulaire.
  const [lieu, setLieu] = useState('');
  const [creneau, setCreneau] = useState('');

  // La LISTE des dispos publiées (un tableau, vide au départ).
  const [dispos, setDispos] = useState<Dispo[]>([]);

  // Quand on clique sur "Publier".
  function publier() {
    if (!lieu || !creneau) return; // les deux champs sont obligatoires

    const nouvelle: Dispo = {
      id: Date.now(), // un identifiant unique simple
      lieu,
      creneau,
    };

    // On ajoute la nouvelle dispo EN HAUT de la liste existante.
    setDispos([nouvelle, ...dispos]);

    // On vide le formulaire pour la prochaine.
    setLieu('');
    setCreneau('');
  }

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
              Poster une dispo
            </span>
          </div>
          <h1
            className={
              'font-heading text-4xl leading-none font-normal tracking-wide sm:text-5xl'
            }
          >
            Je suis dispo
          </h1>
          <p className={'text-muted-foreground text-sm'}>
            Dis où et quand tu veux jouer — les autres joueurs te verront.
          </p>
        </div>

        {/* ===== Formulaire ===== */}
        <Card className={'rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]'}>
          <CardContent className={'flex flex-col gap-5 pt-6'}>
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={'lieu'}>Lieu</Label>
              <Input
                id={'lieu'}
                placeholder={'Ex. City-stade Jaurès'}
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
              />
            </div>

            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={'creneau'}>Créneau</Label>
              <Input
                id={'creneau'}
                placeholder={'Ex. Samedi 15h'}
                value={creneau}
                onChange={(e) => setCreneau(e.target.value)}
              />
            </div>

            <Button
              onClick={publier}
              className={
                'w-fit bg-[#EA580C] font-extrabold text-black shadow-[0_10px_30px_-8px_#EA580C] transition hover:-translate-y-0.5 hover:bg-[#EA580C] hover:brightness-110'
              }
            >
              Publier ma dispo
            </Button>
          </CardContent>
        </Card>

        {/* ===== Liste des dispos publiées ===== */}
        {dispos.length > 0 ? (
          <div className={'flex flex-col gap-3'}>
            <div className={'flex items-center gap-3'}>
              <span className={'h-0.5 w-7 bg-[#0284C7]'} />
              <span
                className={
                  'text-xs font-bold tracking-[0.2em] text-[#7c7c82] uppercase'
                }
              >
                Mes dispos publiées
              </span>
            </div>

            {dispos.map((d) => (
              <Card
                key={d.id}
                className={
                  'rounded-2xl border-[#0284C7]/30 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
                }
              >
                <CardContent className={'flex items-center justify-between pt-6'}>
                  <div className={'flex flex-col'}>
                    <span className={'font-heading text-xl tracking-wide'}>
                      {d.lieu}
                    </span>
                    <span className={'text-muted-foreground text-sm'}>
                      {d.creneau}
                    </span>
                  </div>
                  <span
                    className={
                      'rounded-full border border-[#22C55E]/40 bg-[#22C55E]/15 px-3 py-0.5 text-xs font-bold tracking-widest text-[#22C55E] uppercase'
                    }
                  >
                    Dispo
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </PageBody>
  );
}

export default DispoPage;
