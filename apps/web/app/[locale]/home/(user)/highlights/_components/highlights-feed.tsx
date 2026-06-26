'use client';

import Link from 'next/link';

import { useRef, useState, useTransition } from 'react';

import { Clapperboard, Heart, Sparkles, Trash2, Upload } from 'lucide-react';

import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { PageBody } from '@kit/ui/page';

import { avatarUrl } from '../../_lib/avatars';
import { BoutonRetour } from '../../_components/bouton-retour';
import { PageBackground } from '../../_components/page-background';
import {
  likerAction,
  publierHighlightAction,
  supprimerHighlightAction,
  unlikerAction,
} from '../_lib/server/highlights-actions';

// Un highlight tel qu'affiché dans le fil (déjà recollé avec son auteur + URL).
export type HighlightItem = {
  id: string;
  auteurId: string;
  pseudo: string;
  avatar: string;
  fichierPath: string;
  url: string; // l'URL publique du fichier (vidéo ou image)
  mediaType: string; // 'video' ou 'image'
  legende: string;
  createdAt: string | null;
  likes: number; // nombre de likes
  jaime: boolean; // est-ce que MOI je l'ai liké ?
};

// Limite du plan GRATUIT pour un fichier : 50 Mo. Le Pro va jusqu'à 200 Mo.
const LIMITE_GRATUIT = 52_428_800; // 50 Mo en octets

export function HighlightsFeed(props: {
  highlights: HighlightItem[];
  moiId: string;
  pro: boolean;
}) {
  const supabase = useSupabase();

  // Le fil vit dans un state : publier/supprimer le met à jour tout de suite.
  const [highlights, setHighlights] = useState<HighlightItem[]>(
    props.highlights,
  );

  // Le formulaire : le fichier choisi + la légende.
  const [fichier, setFichier] = useState<File | null>(null);
  const [legende, setLegende] = useState('');
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [, startTransition] = useTransition();
  const inputFichierRef = useRef<HTMLInputElement>(null);

  // Publier : on uploade le fichier dans le stockage, PUIS on enregistre la ligne.
  async function publier() {
    if (!fichier) {
      setErreur('Choisis d’abord une vidéo ou une photo.');
      return;
    }

    // Plan gratuit : fichier limité à 50 Mo. Le Pro va jusqu'à 200 Mo.
    if (!props.pro && fichier.size > LIMITE_GRATUIT) {
      setErreur('LIMITE_PRO');
      return;
    }

    setErreur(null);
    setEnvoi(true);

    try {
      // 1) on uploade le fichier dans le bucket 'highlights', sous mon dossier.
      const extension = fichier.name.split('.').pop() ?? 'mp4';
      const chemin = `${props.moiId}/${crypto.randomUUID()}.${extension}`;

      const { error: erreurUpload } = await supabase.storage
        .from('highlights')
        .upload(chemin, fichier);

      if (erreurUpload) {
        setErreur(
          'L’envoi du fichier a échoué (trop lourd ? format non accepté ?).',
        );
        return;
      }

      // 2) image ou vidéo ? (sert à choisir la balise d'affichage)
      const mediaType = fichier.type.startsWith('video') ? 'video' : 'image';

      // 3) on enregistre la ligne en base (avec la légende modérée côté serveur).
      const resultat = await publierHighlightAction({
        fichierPath: chemin,
        mediaType,
        legende,
        tailleFichier: fichier.size,
      });

      // Garde-fou Pro côté serveur (fichier > 50 Mo, compte gratuit).
      if (resultat?.data?.limitePro) {
        setErreur('LIMITE_PRO');
        return;
      }

      if (resultat?.serverError ?? resultat?.validationErrors) {
        setErreur('La publication a échoué. Réessaie.');
        return;
      }

      // 4) on ajoute le highlight EN HAUT du fil (retour visuel immédiat).
      const url = supabase.storage.from('highlights').getPublicUrl(chemin).data
        .publicUrl;
      const nouveau: HighlightItem = {
        id: resultat?.data?.highlight?.id ?? chemin,
        auteurId: props.moiId,
        pseudo:
          props.highlights.find((h) => h.auteurId === props.moiId)?.pseudo ??
          'Moi',
        avatar:
          props.highlights.find((h) => h.auteurId === props.moiId)?.avatar ??
          '',
        fichierPath: chemin,
        url,
        mediaType,
        legende: resultat?.data?.highlight?.legende ?? legende,
        createdAt: resultat?.data?.highlight?.created_at ?? null,
        likes: 0,
        jaime: false,
      };
      setHighlights((liste) => [nouveau, ...liste]);

      // on vide le formulaire
      setFichier(null);
      setLegende('');
      if (inputFichierRef.current) inputFichierRef.current.value = '';
    } finally {
      setEnvoi(false);
    }
  }

  // Liker / retirer mon like : on met à jour l'affichage tout de suite (optimiste),
  // puis on enregistre en base ; si ça rate, on annule l'affichage.
  function toggleLike(h: HighlightItem) {
    const jaimeAvant = h.jaime;

    setHighlights((liste) =>
      liste.map((x) =>
        x.id === h.id
          ? {
              ...x,
              jaime: !jaimeAvant,
              likes: jaimeAvant ? x.likes - 1 : x.likes + 1,
            }
          : x,
      ),
    );

    startTransition(async () => {
      const resultat = jaimeAvant
        ? await unlikerAction({ highlightId: h.id })
        : await likerAction({ highlightId: h.id });

      if (resultat?.serverError ?? resultat?.validationErrors) {
        // échec : on remet comme avant
        setHighlights((liste) =>
          liste.map((x) =>
            x.id === h.id
              ? {
                  ...x,
                  jaime: jaimeAvant,
                  likes: jaimeAvant ? x.likes + 1 : x.likes - 1,
                }
              : x,
          ),
        );
      }
    });
  }

  // Supprimer un de mes highlights : on l'enlève de l'affichage + en base + stockage.
  function supprimer(h: HighlightItem) {
    setHighlights((liste) => liste.filter((x) => x.id !== h.id));
    startTransition(async () => {
      await supprimerHighlightAction({ id: h.id, fichierPath: h.fichierPath });
    });
  }

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
              Highlights
            </span>
          </div>
          <h1
            className={
              'font-heading bg-gradient-to-br from-white via-[#fdba74] to-[#EA580C] bg-clip-text text-4xl leading-none font-normal tracking-wide text-transparent sm:text-5xl'
            }
          >
            Tes plus beaux paniers 🎬
          </h1>
          <p className={'text-muted-foreground text-sm'}>
            Poste une vidéo (ou une photo) de basket — tout le monde la voit.
          </p>
        </div>

        {/* ===== Formulaire de publication ===== */}
        <Card className={'rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]'}>
          <CardContent className={'flex flex-col gap-5 p-6'}>
            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'fichier'}>Ta vidéo ou ta photo</Label>
              <Input
                id={'fichier'}
                ref={inputFichierRef}
                type={'file'}
                accept={'video/*,image/*'}
                onChange={(e) => setFichier(e.target.files?.[0] ?? null)}
                data-test={'highlight-fichier'}
              />
              <p className={'text-muted-foreground text-xs'}>
                Vidéo (.mp4, .mov, .webm) ou image — 50 Mo max.
              </p>
            </div>

            <div className={'flex flex-col gap-2.5'}>
              <Label htmlFor={'legende'}>Légende (optionnel)</Label>
              <Input
                id={'legende'}
                placeholder={'Ex. Gros dunk au city-stade 🔥'}
                value={legende}
                onChange={(e) => setLegende(e.target.value)}
                maxLength={200}
                data-test={'highlight-legende'}
              />
            </div>

            {/* Limite gratuite (fichier > 50 Mo) → invitation à passer Pro */}
            {erreur === 'LIMITE_PRO' ? (
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
                  <Sparkles className={'size-4'} /> Vidéo trop lourde pour le
                  plan gratuit
                </span>
                <p className={'text-muted-foreground text-sm'}>
                  Le gratuit est limité à 50 Mo. Passe en <strong>Pro</strong>{' '}
                  pour publier tes vidéos longues (jusqu’à 200 Mo).
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
            ) : erreur ? (
              <p className={'text-sm font-medium text-red-400'}>{erreur}</p>
            ) : null}

            <Button
              onClick={publier}
              disabled={envoi || !fichier}
              data-test={'highlight-publier'}
              className={
                'w-fit gap-2 bg-[#EA580C] font-extrabold text-black shadow-[0_10px_30px_-8px_#EA580C] transition hover:-translate-y-0.5 hover:bg-[#EA580C] hover:brightness-110'
              }
            >
              <Upload className={'size-4'} />
              {envoi ? 'Envoi en cours…' : 'Publier mon highlight'}
            </Button>
          </CardContent>
        </Card>

        {/* ===== Le fil ===== */}
        {highlights.length > 0 ? (
          <div className={'flex flex-col gap-4'}>
            {highlights.map((h) => {
              const moi = h.auteurId === props.moiId;

              return (
                <Card
                  key={h.id}
                  className={
                    'overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
                  }
                >
                  <CardContent className={'flex flex-col gap-3 p-4'}>
                    {/* Auteur + date */}
                    <div className={'flex items-center gap-3'}>
                      <Avatar className={'size-9'}>
                        <AvatarImage
                          src={avatarUrl(h.pseudo, h.avatar)}
                          alt={h.pseudo}
                        />
                        <AvatarFallback className={'bg-muted uppercase'}>
                          {h.pseudo.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={'flex flex-1 flex-col'}>
                        <span className={'font-heading tracking-wide'}>
                          {h.pseudo}
                        </span>
                        {h.createdAt ? (
                          <span className={'text-muted-foreground text-xs'}>
                            {new Date(h.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        ) : null}
                      </div>
                      {moi ? (
                        <button
                          type={'button'}
                          onClick={() => supprimer(h)}
                          aria-label={'Supprimer'}
                          className={
                            'text-muted-foreground rounded-full p-1.5 transition hover:text-red-400'
                          }
                        >
                          <Trash2 className={'size-4'} />
                        </button>
                      ) : null}
                    </div>

                    {/* Le média : vidéo ou image */}
                    {h.mediaType === 'video' ? (
                      <video
                        src={h.url}
                        controls
                        playsInline
                        className={'max-h-96 w-full rounded-xl bg-black'}
                      />
                    ) : (
                      <img
                        src={h.url}
                        alt={h.legende || 'Highlight'}
                        className={'max-h-96 w-full rounded-xl object-contain'}
                      />
                    )}

                    {/* Bouton like ❤️ + compteur */}
                    <div className={'flex items-center gap-2'}>
                      <button
                        type={'button'}
                        onClick={() => toggleLike(h)}
                        aria-label={h.jaime ? 'Retirer le like' : 'Liker'}
                        data-test={'highlight-like'}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition ${
                          h.jaime
                            ? 'bg-[#EA580C]/15 text-[#EA580C]'
                            : 'text-muted-foreground hover:bg-white/5'
                        }`}
                      >
                        <Heart
                          className={'size-4'}
                          fill={h.jaime ? 'currentColor' : 'none'}
                        />
                        {h.likes}
                      </button>
                    </div>

                    {/* La légende */}
                    {h.legende ? (
                      <p className={'text-sm'}>{h.legende}</p>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div
            className={
              'text-muted-foreground flex flex-col items-center gap-2 py-10 text-center text-sm'
            }
          >
            <Clapperboard className={'size-8 text-[#EA580C]'} />
            Aucun highlight pour l’instant. Sois le premier à poster ! 🏀
          </div>
        )}
      </div>
    </PageBody>
  );
}
