'use client';

import Link from 'next/link';

import { useState, useTransition } from 'react';

import { Sparkles, Trash2 } from 'lucide-react';

import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { NativeSelect, NativeSelectOption } from '@kit/ui/native-select';
import { PageBody } from '@kit/ui/page';

import { BoutonRetour } from '../../_components/bouton-retour';
import { PageBackground } from '../../_components/page-background';
import {
  publierDispoAction,
  supprimerDispoAction,
} from '../_lib/server/dispo-actions';

// Le "type" d'une dispo : une vraie annonce, pas juste un lieu + un créneau.
// L'id est un uuid (texte), car il vient de la base.
export type Dispo = {
  id: string;
  lieu: string;
  creneau: string;
  niveauRecherche: string; // "Même niveau" ou "Ouvert à tous"
  places: number; // combien de joueurs il manque encore
  note: string; // texte libre, ex. "5v5, ramène ton ballon"
};

// Les choix possibles pour "qui peut venir".
const NIVEAUX_RECHERCHE = ['Ouvert à tous', 'Même niveau'];

// Le formulaire reçoit les dispos déjà publiées (lues en base).
export function DispoForm({ dispos: disposInitiales }: { dispos: Dispo[] }) {
  // Ce qu'on tape dans le formulaire.
  const [lieu, setLieu] = useState('');
  const [creneau, setCreneau] = useState('');
  const [niveauRecherche, setNiveauRecherche] = useState('Ouvert à tous');
  const [places, setPlaces] = useState('1');
  const [note, setNote] = useState('');

  // La LISTE des dispos publiées, pré-remplie avec celles de la base.
  const [dispos, setDispos] = useState<Dispo[]>(disposInitiales);

  // Petits états d'interface : confirmation, chargement, erreur.
  const [confirme, setConfirme] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  // Limite du plan gratuit atteinte → on propose de passer Pro.
  const [limitePro, setLimitePro] = useState(false);
  const [enCours, startTransition] = useTransition();

  // Quand on clique sur "Publier" : on envoie à la base via la server action.
  function publier() {
    // Champs obligatoires : lieu + créneau (la note, elle, reste optionnelle).
    // .trim() = on enlève les espaces : un champ rempli que d'espaces compte comme vide.
    const manquants: string[] = [];
    if (!lieu.trim()) manquants.push('le lieu');
    if (!creneau.trim()) manquants.push('le créneau');

    if (manquants.length > 0) {
      setErreur(`Il manque ${manquants.join(' et ')} pour publier ta dispo.`);
      return;
    }

    setErreur(null);
    setLimitePro(false);

    startTransition(async () => {
      const resultat = await publierDispoAction({
        lieu,
        creneau,
        niveauRecherche,
        places: Number(places),
        note,
      });

      // Limite du plan gratuit atteinte : on affiche l'invitation à passer Pro.
      if (resultat?.data?.limiteAtteinte) {
        setLimitePro(true);
        return;
      }

      if (resultat?.serverError ?? resultat?.validationErrors) {
        setErreur('Oups, la publication a échoué. Réessaie.');
        return;
      }

      // On ajoute la nouvelle dispo EN HAUT de la liste (retour visuel immédiat).
      // On utilise le VRAI id renvoyé par la base (pour pouvoir la supprimer).
      const nouvelle: Dispo = {
        id: resultat?.data?.id ?? String(Date.now()),
        lieu,
        creneau,
        niveauRecherche,
        places: Number(places),
        note,
      };
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
    });
  }

  // Supprimer une de mes dispos : on l'enlève tout de suite de l'affichage,
  // puis on la supprime en base (la RLS vérifie que c'est bien la mienne).
  function supprimer(id: string) {
    setDispos((liste) => liste.filter((d) => d.id !== id));

    startTransition(async () => {
      await supprimerDispoAction({ id });
    });
  }

  // Retrait auto : une dispo complète (0 place restante) disparaît de la liste.
  const disposVisibles = dispos.filter((d) => d.places > 0);

  return (
    <PageBody className={'relative -mx-4 overflow-hidden px-4 lg:mx-0'}>
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

            {erreur ? (
              <p className={'text-sm font-medium text-red-400'}>{erreur}</p>
            ) : null}

            {/* Limite gratuite atteinte → invitation à passer Pro */}
            {limitePro ? (
              <div
                className={
                  'flex flex-col gap-2 rounded-xl border border-[#EA580C]/40 bg-[#EA580C]/10 p-4'
                }
              >
                <span
                  className={
                    'flex items-center gap-2 text-sm font-bold text-[#fdba74]'
                  }
                >
                  <Sparkles className={'size-4'} /> Limite du plan gratuit
                  atteinte
                </span>
                <p className={'text-muted-foreground text-sm'}>
                  Le plan gratuit permet 2 dispos actives à la fois. Passe en{' '}
                  <strong>Pro</strong> pour en poster autant que tu veux.
                </p>
                <Link
                  href={'/home/billing'}
                  className={
                    'inline-flex w-fit items-center gap-2 rounded-full bg-[#EA580C] px-4 py-2 text-sm font-extrabold text-black transition hover:brightness-110'
                  }
                >
                  <Sparkles className={'size-4'} /> Passer en Pro
                </Link>
              </div>
            ) : null}

            <Button
              onClick={publier}
              disabled={enCours}
              className={
                'w-fit bg-[#EA580C] font-extrabold text-black shadow-[0_10px_30px_-8px_#EA580C] transition hover:-translate-y-0.5 hover:bg-[#EA580C] hover:brightness-110'
              }
            >
              {enCours ? 'Publication…' : 'Publier ma dispo'}
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

        {/* ===== Liste des dispos publiées (les complètes disparaissent) ===== */}
        {disposVisibles.length > 0 ? (
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

            {disposVisibles.map((d) => (
              <Card
                key={d.id}
                className={
                  'rounded-2xl border-[#0284C7]/30 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
                }
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
                    {/* Badge de statut : places encore recherchées */}
                    <Badge
                      className={
                        'shrink-0 border-[#22C55E]/40 bg-[#22C55E]/15 font-bold tracking-widest text-[#22C55E] uppercase'
                      }
                    >
                      {`Il manque ${d.places} joueur${d.places > 1 ? 's' : ''}`}
                    </Badge>
                  </div>

                  {/* La note, seulement si elle a été remplie */}
                  {d.note ? (
                    <p className={'text-muted-foreground text-sm italic'}>
                      « {d.note} »
                    </p>
                  ) : null}

                  <div className={'flex items-center justify-between gap-3'}>
                    {/* Qui peut venir */}
                    <Badge
                      className={
                        'w-fit border-[#0284C7]/40 bg-[#0284C7]/15 text-[10px] font-bold tracking-widest text-[#7dd3fc] uppercase'
                      }
                    >
                      {d.niveauRecherche}
                    </Badge>

                    {/* Bouton supprimer cette dispo */}
                    <button
                      type={'button'}
                      onClick={() => supprimer(d.id)}
                      aria-label={'Supprimer cette dispo'}
                      className={
                        'text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium transition hover:border-red-400/40 hover:text-red-400'
                      }
                    >
                      <Trash2 className={'size-3.5'} />
                      Supprimer
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
