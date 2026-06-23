'use client';

import { useState } from 'react';

import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { NativeSelect, NativeSelectOption } from '@kit/ui/native-select';
import { PageBody } from '@kit/ui/page';

import { PageBackground } from '../_components/page-background';

// Le "type" d'une dispo : une vraie annonce, pas juste un lieu + un créneau.
type Dispo = {
  id: number;
  lieu: string;
  creneau: string;
  niveauRecherche: string; // "Même niveau" ou "Ouvert à tous"
  places: number; // combien de joueurs il manque encore
  note: string; // texte libre, ex. "5v5, ramène ton ballon"
};

// Les choix possibles pour "qui peut venir".
const NIVEAUX_RECHERCHE = ['Ouvert à tous', 'Même niveau'];

function DispoPage() {
  // Ce qu'on tape dans le formulaire.
  const [lieu, setLieu] = useState('');
  const [creneau, setCreneau] = useState('');
  const [niveauRecherche, setNiveauRecherche] = useState('Ouvert à tous');
  const [places, setPlaces] = useState('1');
  const [note, setNote] = useState('');

  // La LISTE des dispos publiées (un tableau, vide au départ).
  const [dispos, setDispos] = useState<Dispo[]>([]);

  // Petit message de confirmation qui apparaît puis disparaît tout seul.
  const [confirme, setConfirme] = useState(false);

  // Quand on clique sur "Publier".
  function publier() {
    if (!lieu || !creneau) return; // lieu + créneau obligatoires

    const nouvelle: Dispo = {
      id: Date.now(), // un identifiant unique simple
      lieu,
      creneau,
      niveauRecherche,
      places: Number(places), // le menu donne du texte → on le passe en nombre
      note,
    };

    // On ajoute la nouvelle dispo EN HAUT de la liste existante.
    setDispos([nouvelle, ...dispos]);

    // On vide le formulaire pour la prochaine.
    setLieu('');
    setCreneau('');
    setNiveauRecherche('Ouvert à tous');
    setPlaces('1');
    setNote('');

    // On affiche "✅ postée" et on le cache après 2,5 secondes.
    setConfirme(true);
    setTimeout(() => setConfirme(false), 2500);
  }

  return (
    <PageBody className={'relative -mx-4 overflow-hidden px-4 lg:mx-0'}>
      <PageBackground />
      <div className={'relative z-10 mx-auto my-auto flex w-full max-w-xl flex-col gap-7 py-10'}>
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
              'font-heading bg-gradient-to-br from-white via-[#fdba74] to-[#EA580C] bg-clip-text text-4xl leading-none font-normal tracking-wide text-transparent sm:text-5xl'
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
          <CardContent className={'flex flex-col gap-7 p-8'}>
            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'lieu'}>Lieu</Label>
              <Input
                id={'lieu'}
                placeholder={'Ex. City-stade Jaurès'}
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
              />
            </div>

            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'creneau'}>Créneau</Label>
              <Input
                id={'creneau'}
                placeholder={'Ex. Samedi 15h'}
                value={creneau}
                onChange={(e) => setCreneau(e.target.value)}
              />
            </div>

            {/* Deux menus côte à côte : niveau recherché + places manquantes */}
            <div className={'flex flex-col gap-7 sm:flex-row sm:gap-6'}>
              <div className={'flex flex-1 flex-col gap-2.5'}>
                <Label htmlFor={'niveauRecherche'}>Qui peut venir ?</Label>
                <NativeSelect
                  id={'niveauRecherche'}
                  value={niveauRecherche}
                  onChange={(e) => setNiveauRecherche(e.target.value)}
                >
                  {NIVEAUX_RECHERCHE.map((n) => (
                    <NativeSelectOption key={n} value={n}>
                      {n}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <p className={'text-muted-foreground text-xs'}>
                  Ton niveau seulement, ou tout le monde est bienvenu.
                </p>
              </div>

              <div className={'flex flex-1 flex-col gap-2.5'}>
                <Label htmlFor={'places'}>Joueurs manquants</Label>
                <NativeSelect
                  id={'places'}
                  value={places}
                  onChange={(e) => setPlaces(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <NativeSelectOption key={n} value={String(n)}>
                      {n}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <p className={'text-muted-foreground text-xs'}>
                  Combien de joueurs il te manque pour lancer la partie.
                </p>
              </div>
            </div>

            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'note'}>Note (optionnel)</Label>
              <Input
                id={'note'}
                placeholder={'Ex. 5v5, ramène ton ballon'}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <p className={'text-muted-foreground text-xs'}>
                Un détail utile : format, ambiance, matériel à prévoir…
              </p>
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

        {/* ===== Message de confirmation (disparaît après 2,5 s) ===== */}
        {confirme ? (
          <div
            className={
              'rounded-xl border border-[#22C55E]/40 bg-[#22C55E]/15 px-4 py-3 text-sm font-bold text-[#22C55E]'
            }
          >
            ✅ Dispo postée !
          </div>
        ) : null}

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

            {dispos.map((d) => {
              // Le statut se DÉDUIT des places : 0 place restante = complète.
              const complete = d.places <= 0;

              return (
                <Card
                  key={d.id}
                  className={`rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)] ${
                    complete
                      ? 'border-white/10 opacity-70'
                      : 'border-[#0284C7]/30'
                  }`}
                >
                  <CardContent className={'flex flex-col gap-3 pt-6'}>
                    <div className={'flex items-start justify-between gap-3'}>
                      <div className={'flex flex-col'}>
                        <span className={'font-heading text-xl tracking-wide'}>
                          {d.lieu}
                        </span>
                        <span className={'text-muted-foreground text-sm'}>
                          {d.creneau}
                        </span>
                      </div>
                      {/* Badge de statut, calculé à partir des places */}
                      <Badge
                        className={
                          complete
                            ? 'shrink-0 border-white/20 bg-white/10 font-bold tracking-widest text-[#a3a3a8] uppercase'
                            : 'shrink-0 border-[#22C55E]/40 bg-[#22C55E]/15 font-bold tracking-widest text-[#22C55E] uppercase'
                        }
                      >
                        {complete
                          ? 'Complète'
                          : `Il manque ${d.places} joueur${d.places > 1 ? 's' : ''}`}
                      </Badge>
                    </div>

                    {/* La note, seulement si elle a été remplie */}
                    {d.note ? (
                      <p className={'text-muted-foreground text-sm italic'}>
                        « {d.note} »
                      </p>
                    ) : null}

                    {/* Petit pied de carte : qui peut venir */}
                    <Badge
                      className={
                        'w-fit border-[#0284C7]/40 bg-[#0284C7]/15 text-[10px] font-bold tracking-widest text-[#7dd3fc] uppercase'
                      }
                    >
                      {d.niveauRecherche}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className={'text-muted-foreground py-8 text-center text-sm'}>
            Tu n&apos;as pas encore posté de dispo. Remplis le formulaire
            ci-dessus pour publier ta première annonce. 🏀
          </p>
        )}
      </div>
    </PageBody>
  );
}

export default DispoPage;
