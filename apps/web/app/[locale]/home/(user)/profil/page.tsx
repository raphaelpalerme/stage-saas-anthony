'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback } from '@kit/ui/avatar';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { NativeSelect, NativeSelectOption } from '@kit/ui/native-select';
import { PageBody } from '@kit/ui/page';

import { PageBackground } from '../_components/page-background';

// Les niveaux possibles pour un joueur.
const NIVEAUX = ['Débutant', 'Moyen', 'Confirmé'];

// Les postes au basket (sert à la crédibilité + au matching de demain).
const POSTES = ['Meneur', 'Arrière', 'Ailier', 'Intérieur'];

// Le "type" d'un profil enregistré : tous ses champs en un seul endroit.
type Profil = {
  pseudo: string;
  niveau: string;
  poste: string;
  quartier: string;
  bio: string;
};

function ProfilPage() {
  // useState = la mémoire temporaire de la page.
  // Ce qu'on tape dans le formulaire (pas encore enregistré).
  const [pseudo, setPseudo] = useState('');
  const [niveau, setNiveau] = useState('Débutant');
  const [poste, setPoste] = useState('Meneur');
  const [quartier, setQuartier] = useState('');
  const [bio, setBio] = useState('');

  // Le profil une fois "enregistré" (ce qu'on affiche en bas).
  const [profil, setProfil] = useState<Profil | null>(null);

  // Quand on clique sur "Enregistrer".
  function enregistrer() {
    if (!pseudo) return; // on n'enregistre pas un pseudo vide

    setProfil({ pseudo, niveau, poste, quartier, bio });
  }

  return (
    <PageBody className={'relative overflow-hidden'}>
      <PageBackground />
      <div className={'relative z-10 mx-auto my-auto flex w-full max-w-xl flex-col gap-7 py-10'}>
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
              'font-heading bg-gradient-to-br from-white via-[#fdba74] to-[#EA580C] bg-clip-text text-4xl leading-none font-normal tracking-wide text-transparent sm:text-5xl'
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
          <CardContent className={'flex flex-col gap-7 p-8'}>
            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'pseudo'}>Pseudo</Label>
              <Input
                id={'pseudo'}
                placeholder={'Ex. AnthoBall'}
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>

            <div className={'flex flex-col gap-2.5'}>
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
              <p className={'text-muted-foreground text-xs'}>
                Sois honnête : ça évite les mauvaises surprises sur le terrain.
              </p>
            </div>

            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'poste'}>Poste préféré</Label>
              <NativeSelect
                id={'poste'}
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
              >
                {POSTES.map((p) => (
                  <NativeSelectOption key={p} value={p}>
                    {p}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <p className={'text-muted-foreground text-xs'}>
                Là où tu te sens le mieux : à la mène, au tir ou dans la raquette.
              </p>
            </div>

            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'quartier'}>Quartier</Label>
              <Input
                id={'quartier'}
                placeholder={'Ex. Belleville'}
                value={quartier}
                onChange={(e) => setQuartier(e.target.value)}
              />
              <p className={'text-muted-foreground text-xs'}>
                On s&apos;en sert pour te proposer des joueurs près de chez toi.
              </p>
            </div>

            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'bio'}>Bio (optionnel)</Label>
              <Input
                id={'bio'}
                placeholder={'Ex. Je joue le week-end, plutôt streetball'}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <Button
              onClick={enregistrer}
              className={
                'w-fit bg-[#EA580C] font-extrabold text-black shadow-[0_10px_30px_-8px_#EA580C] transition hover:-translate-y-0.5 hover:brightness-110 hover:bg-[#EA580C]'
              }
            >
              Enregistrer mon profil
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
              <CardContent className={'flex flex-col gap-4 pt-6'}>
                <div className={'flex items-center gap-4'}>
                  <Avatar className={'size-14'}>
                    <AvatarFallback
                      className={
                        'bg-[#EA580C] text-2xl font-extrabold text-black uppercase'
                      }
                    >
                      {profil.pseudo.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={'flex flex-col gap-1'}>
                    <span
                      className={
                        'font-heading text-2xl leading-none tracking-wide'
                      }
                    >
                      {profil.pseudo}
                    </span>
                    {/* Les badges : niveau, poste, et quartier si renseigné */}
                    <div className={'flex flex-wrap items-center gap-2'}>
                      <Badge
                        className={
                          'border-[#0284C7]/40 bg-[#0284C7]/15 font-bold tracking-widest text-[#7dd3fc] uppercase'
                        }
                      >
                        {profil.niveau}
                      </Badge>
                      <Badge
                        className={
                          'border-[#EA580C]/40 bg-[#EA580C]/15 font-bold tracking-widest text-[#fdba74] uppercase'
                        }
                      >
                        {profil.poste}
                      </Badge>
                      {profil.quartier ? (
                        <Badge
                          className={
                            'border-[#22C55E]/40 bg-[#22C55E]/15 font-bold tracking-widest text-[#22C55E] uppercase'
                          }
                        >
                          {profil.quartier}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* La bio s'affiche seulement si on en a écrit une */}
                {profil.bio ? (
                  <p className={'text-muted-foreground text-sm italic'}>
                    « {profil.bio} »
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </PageBody>
  );
}

export default ProfilPage;
