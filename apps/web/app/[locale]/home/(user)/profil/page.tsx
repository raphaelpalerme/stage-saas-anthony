'use client';

import { useState } from 'react';

import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { NativeSelect, NativeSelectOption } from '@kit/ui/native-select';
import { PageBody } from '@kit/ui/page';

import { PageBackground } from '../_components/page-background';

// Les niveaux possibles pour un joueur.
const NIVEAUX = ['Débutant', 'Moyen', 'Confirmé'];

function ProfilPage() {
  // useState = la mémoire temporaire de la page.
  // Ce qu'on tape dans le formulaire (pas encore enregistré).
  const [pseudo, setPseudo] = useState('');
  const [niveau, setNiveau] = useState(NIVEAUX[0]);

  // Le profil une fois "enregistré" (ce qu'on affiche en bas).
  const [profil, setProfil] = useState<{ pseudo: string; niveau: string } | null>(
    null,
  );

  // Quand on clique sur "Enregistrer".
  function enregistrer() {
    if (!pseudo) return; // on n'enregistre pas un pseudo vide

    setProfil({ pseudo, niveau });
  }

  return (
    <PageBody className={'relative overflow-hidden'}>
      <PageBackground />
      <div className={'relative z-10 mx-auto flex w-full max-w-xl flex-col gap-7'}>
        {/* ===== En-tête façon landing Pickify ===== */}
        <div className={'flex flex-col gap-3'}>
          <div className={'flex items-center gap-3'}>
            <span className={'h-0.5 w-10 bg-[#EA580C]'} />
            <span
              className={
                'text-base font-bold tracking-[0.2em] text-[#a3a3a8] uppercase sm:text-lg'
              }
            >
              Mon profil
            </span>
          </div>
          <h1
            className={
              'font-heading text-4xl leading-none font-normal tracking-wide sm:text-5xl'
            }
          >
            Profil joueur
          </h1>
          <p className={'text-muted-foreground text-sm'}>
            Ton pseudo et ton niveau s&apos;affichent à côté de tes dispos.
          </p>
        </div>

        {/* ===== Formulaire ===== */}
        <Card
          className={'rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]'}
        >
          <CardContent className={'flex flex-col gap-5 pt-6'}>
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={'pseudo'}>Pseudo</Label>
              <Input
                id={'pseudo'}
                placeholder={'Ex. AnthoBall'}
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>

            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={'niveau'}>Niveau</Label>
              <NativeSelect
                id={'niveau'}
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
              >
                {NIVEAUX.map((n) => (
                  <NativeSelectOption key={n} value={n}>
                    {n}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <Button
              onClick={enregistrer}
              className={
                'w-fit bg-[#EA580C] font-extrabold text-black shadow-[0_10px_30px_-8px_#EA580C] transition hover:-translate-y-0.5 hover:brightness-110 hover:bg-[#EA580C]'
              }
            >
              Enregistrer
            </Button>
          </CardContent>
        </Card>

        {/* ===== Aperçu (visible seulement après enregistrement) ===== */}
        {profil ? (
          <div className={'flex flex-col gap-3'}>
            <div className={'flex items-center gap-3'}>
              <span className={'h-0.5 w-7 bg-[#0284C7]'} />
              <span
                className={
                  'text-xs font-bold tracking-[0.2em] text-[#7c7c82] uppercase'
                }
              >
                Aperçu
              </span>
            </div>

            <Card
              className={
                'rounded-2xl border-[#0284C7]/30 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
              }
            >
              <CardContent className={'flex items-center gap-4 pt-6'}>
                <div
                  className={
                    'flex size-14 items-center justify-center rounded-full bg-[#EA580C] text-2xl font-extrabold text-black uppercase'
                  }
                >
                  {profil.pseudo.charAt(0)}
                </div>
                <div className={'flex flex-col gap-1'}>
                  <span
                    className={'font-heading text-2xl leading-none tracking-wide'}
                  >
                    {profil.pseudo}
                  </span>
                  <span
                    className={
                      'w-fit rounded-full border border-[#0284C7]/40 bg-[#0284C7]/15 px-3 py-0.5 text-xs font-bold tracking-widest text-[#7dd3fc] uppercase'
                    }
                  >
                    {profil.niveau}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </PageBody>
  );
}

export default ProfilPage;
