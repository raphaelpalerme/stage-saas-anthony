'use client';

import Link from 'next/link';

import { useState, useTransition } from 'react';

import { ChevronRight, ImagePlus, MapPin, Pencil, Ruler, X } from 'lucide-react';

import { useSupabase } from '@kit/supabase/hooks/use-supabase';
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
} from '@kit/ui/drawer';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { NativeSelect, NativeSelectOption } from '@kit/ui/native-select';
import { PageBody } from '@kit/ui/page';

import { STYLE_DEFAUT, STYLES_AVATAR, avatarUrl } from '../../_lib/avatars';
import { BoutonRetour } from '../../_components/bouton-retour';
import { PageBackground } from '../../_components/page-background';
import { enregistrerProfilAction } from '../_lib/server/profil-actions';

// Les niveaux possibles pour un joueur.
const NIVEAUX = ['Débutant', 'Moyen', 'Confirmé'];

// Les postes au basket (sert à la crédibilité + au matching).
const POSTES = ['Meneur', 'Arrière', 'Ailier', 'Intérieur'];

// Les styles de jeu (façon de jouer).
const STYLES_JEU = ['Scoreur', 'Passeur', 'Défenseur', 'Polyvalent'];

// Le "type" d'un profil : tous ses champs en un seul endroit.
type Profil = {
  pseudo: string;
  niveau: string;
  poste: string;
  quartier: string;
  bio: string;
  avatar: string;
  taille: string;
  styleJeu: string;
};

// Un joueur affiché dans une liste (abonnés / abonnements / likers).
type Joueur = { id: string; pseudo: string; avatar: string };

// Le formulaire reçoit le profil déjà enregistré (ou null) + les stats sociales.
export function ProfilForm({
  profil: profilInitial,
  stats,
  moiId,
  abonnesList,
  abonnementsList,
  likersList,
}: {
  profil: Profil | null;
  stats: {
    highlights: number;
    likesRecus: number;
    abonnes: number;
    abonnements: number;
  };
  moiId: string;
  abonnesList: Joueur[];
  abonnementsList: Joueur[];
  likersList: Joueur[];
}) {
  const supabase = useSupabase();

  // Quelle liste de joueurs est ouverte dans le panneau ? (null = fermé)
  const [listeOuverte, setListeOuverte] = useState<{
    titre: string;
    joueurs: Joueur[];
  } | null>(null);
  // Les champs, pré-remplis avec ce qui est en base.
  const [pseudo, setPseudo] = useState(profilInitial?.pseudo ?? '');
  const [niveau, setNiveau] = useState(profilInitial?.niveau ?? 'Débutant');
  const [poste, setPoste] = useState(profilInitial?.poste ?? 'Meneur');
  const [quartier, setQuartier] = useState(profilInitial?.quartier ?? '');
  const [bio, setBio] = useState(profilInitial?.bio ?? '');
  const [taille, setTaille] = useState(profilInitial?.taille ?? '');
  const [styleJeu, setStyleJeu] = useState(
    profilInitial?.styleJeu ?? 'Polyvalent',
  );
  // L'avatar choisi : soit un style généré (id), soit une URL de photo importée.
  // - si c'est déjà une URL (photo), on la garde ;
  // - sinon si c'est un style connu, on le garde ;
  // - sinon on repart du style par défaut.
  const avatarInitial =
    profilInitial?.avatar && /^https?:\/\//.test(profilInitial.avatar)
      ? profilInitial.avatar
      : STYLES_AVATAR.some((s) => s.id === profilInitial?.avatar)
        ? (profilInitial?.avatar ?? STYLE_DEFAUT)
        : STYLE_DEFAUT;
  const [avatar, setAvatar] = useState(avatarInitial);
  // Une photo a-t-elle été importée ? (l'avatar est alors une URL)
  const photoImportee = /^https?:\/\//.test(avatar);
  const [uploadPhoto, setUploadPhoto] = useState(false);

  // Importer une photo : on l'envoie dans le bucket 'avatars', puis on met
  // son URL publique dans `avatar` → elle s'affichera partout dans l'app.
  function importerPhoto(file: File) {
    setErreur(null);
    setUploadPhoto(true);

    void (async () => {
      try {
        const extension = file.name.split('.').pop() ?? 'jpg';
        const chemin = `${moiId}/${crypto.randomUUID()}.${extension}`;

        const { error: erreurUpload } = await supabase.storage
          .from('avatars')
          .upload(chemin, file);

        if (erreurUpload) {
          setErreur('L’import de la photo a échoué (trop lourde ?).');
          return;
        }

        const url = supabase.storage.from('avatars').getPublicUrl(chemin).data
          .publicUrl;
        setAvatar(url);
      } finally {
        setUploadPhoto(false);
      }
    })();
  }

  // A-t-on un profil enregistré ? (sert à savoir si on montre la VUE ou le FORM)
  const [aProfil, setAProfil] = useState(Boolean(profilInitial?.pseudo));

  // Mode édition : on commence en édition seulement si AUCUN profil n'existe.
  const [edition, setEdition] = useState(!profilInitial?.pseudo);

  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, startTransition] = useTransition();

  // Enregistrer : on envoie à la base, puis on repasse en mode VUE.
  function enregistrer() {
    if (!pseudo.trim()) {
      setErreur('Choisis un pseudo pour créer ton profil.');
      return;
    }
    setErreur(null);

    startTransition(async () => {
      const resultat = await enregistrerProfilAction({
        pseudo,
        niveau,
        poste,
        quartier,
        bio,
        avatar,
        taille,
        styleJeu,
      });

      if (resultat?.serverError ?? resultat?.validationErrors) {
        setErreur("Oups, l'enregistrement a échoué. Réessaie.");
        return;
      }

      // Succès : on a un profil, on repasse en VUE.
      setAProfil(true);
      setEdition(false);
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
              Mon profil
            </span>
          </div>
          <h1
            className={
              'font-heading bg-gradient-to-br from-white via-[#fdba74] to-[#EA580C] bg-clip-text text-4xl leading-none font-normal tracking-wide text-transparent sm:text-5xl'
            }
          >
            {aProfil && !edition ? pseudo : 'Profil joueur'}
          </h1>
          {!aProfil || edition ? (
            <p className={'text-muted-foreground text-sm'}>
              Ton pseudo et ton niveau s&apos;affichent à côté de tes dispos.
            </p>
          ) : null}
        </div>

        {/* ============ MODE VUE : la carte de joueur ============ */}
        {aProfil && !edition ? (
          <>
            <Card
              className={
                'overflow-hidden rounded-2xl border-[#EA580C]/30 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
              }
            >
              <CardContent className={'flex flex-col gap-5 p-6'}>
                {/* Avatar + pseudo */}
                <div className={'flex items-center gap-4'}>
                  <Avatar
                    className={'size-20 ring-2 ring-[#EA580C]/40 ring-offset-2 ring-offset-background'}
                  >
                    <AvatarImage src={avatarUrl(pseudo, avatar)} alt={pseudo} />
                    <AvatarFallback className={'bg-muted text-2xl uppercase'}>
                      {pseudo.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={'flex flex-col gap-1'}>
                    <span
                      className={'font-heading text-3xl leading-none tracking-wide'}
                    >
                      {pseudo}
                    </span>
                    {quartier ? (
                      <span
                        className={
                          'text-muted-foreground flex items-center gap-1 text-sm'
                        }
                      >
                        <MapPin className={'size-3.5'} />
                        {quartier}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Badges : niveau, poste, style, taille */}
                <div className={'flex flex-wrap items-center gap-2'}>
                  <Badge
                    className={
                      'border-[#0284C7]/40 bg-[#0284C7]/15 font-bold tracking-widest text-[#7dd3fc] uppercase'
                    }
                  >
                    {niveau}
                  </Badge>
                  <Badge
                    className={
                      'border-[#EA580C]/40 bg-[#EA580C]/15 font-bold tracking-widest text-[#fdba74] uppercase'
                    }
                  >
                    {poste}
                  </Badge>
                  <Badge
                    className={
                      'border-[#a855f7]/40 bg-[#a855f7]/15 font-bold tracking-widest text-[#d8b4fe] uppercase'
                    }
                  >
                    {styleJeu}
                  </Badge>
                  {taille ? (
                    <span
                      className={
                        'text-muted-foreground flex items-center gap-1 text-xs'
                      }
                    >
                      <Ruler className={'size-3.5'} />
                      {taille}
                    </span>
                  ) : null}
                </div>

                {/* Bio */}
                {bio ? (
                  <p className={'text-muted-foreground text-sm italic'}>
                    « {bio} »
                  </p>
                ) : null}

                {/* Stats sociales (façon Insta) — cliquables pour voir QUI */}
                <div
                  className={
                    'grid grid-cols-4 gap-2 border-t border-white/10 pt-4 text-center'
                  }
                >
                  <button
                    type={'button'}
                    onClick={() =>
                      setListeOuverte({
                        titre: 'Abonnés',
                        joueurs: abonnesList,
                      })
                    }
                    className={'flex flex-col rounded-lg py-1 hover:bg-white/5'}
                  >
                    <span className={'font-heading text-xl'}>
                      {stats.abonnes}
                    </span>
                    <span className={'text-muted-foreground text-[11px]'}>
                      Abonnés
                    </span>
                  </button>
                  <button
                    type={'button'}
                    onClick={() =>
                      setListeOuverte({
                        titre: 'Abonnements',
                        joueurs: abonnementsList,
                      })
                    }
                    className={'flex flex-col rounded-lg py-1 hover:bg-white/5'}
                  >
                    <span className={'font-heading text-xl'}>
                      {stats.abonnements}
                    </span>
                    <span className={'text-muted-foreground text-[11px]'}>
                      Abonnements
                    </span>
                  </button>
                  <div className={'flex flex-col py-1'}>
                    <span className={'font-heading text-xl'}>
                      {stats.highlights}
                    </span>
                    <span className={'text-muted-foreground text-[11px]'}>
                      Highlights
                    </span>
                  </div>
                  <button
                    type={'button'}
                    onClick={() =>
                      setListeOuverte({
                        titre: 'Likes reçus',
                        joueurs: likersList,
                      })
                    }
                    className={'flex flex-col rounded-lg py-1 hover:bg-white/5'}
                  >
                    <span className={'font-heading text-xl'}>
                      {stats.likesRecus}
                    </span>
                    <span className={'text-muted-foreground text-[11px]'}>
                      Likes reçus
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Bouton pour repasser en édition */}
            <Button
              onClick={() => setEdition(true)}
              variant={'outline'}
              data-test={'modifier-profil'}
              className={'w-fit gap-2 border-white/15 hover:border-[#EA580C]/40'}
            >
              <Pencil className={'size-4'} />
              Modifier mon profil
            </Button>
          </>
        ) : (
          /* ============ MODE ÉDITION : le formulaire ============ */
          <Card className={'rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]'}>
            <CardContent className={'flex flex-col gap-7 p-8'}>
              <div className={'flex flex-col gap-2.5'}>
                <Label htmlFor={'pseudo'}>Pseudo</Label>
                <Input
                  id={'pseudo'}
                  placeholder={'Ex. AnthoBall'}
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  data-test={'profil-pseudo'}
                />
              </div>

              {/* Sélecteur d'avatar : 6 styles générés + l'import de SA photo */}
              <div className={'flex flex-col gap-2.5'}>
                <Label>Avatar</Label>
                <div className={'flex flex-wrap gap-3'}>
                  {STYLES_AVATAR.map((style) => (
                    <button
                      key={style.id}
                      type={'button'}
                      onClick={() => setAvatar(style.id)}
                      aria-label={`Choisir le style ${style.label}`}
                      aria-pressed={!photoImportee && avatar === style.id}
                      className={`flex flex-col items-center gap-1 rounded-xl border p-1.5 transition ${
                        !photoImportee && avatar === style.id
                          ? 'border-[#EA580C] bg-[#EA580C]/15'
                          : 'border-white/15 hover:border-white/30'
                      }`}
                    >
                      <Avatar className={'size-12'}>
                        <AvatarImage
                          src={avatarUrl(pseudo, style.id)}
                          alt={style.label}
                        />
                        <AvatarFallback className={'bg-white/5'}>
                          {pseudo.charAt(0) || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <span className={'text-muted-foreground text-[10px]'}>
                        {style.label}
                      </span>
                    </button>
                  ))}

                  {/* Tuile "Ma photo" : importe ta vraie photo de profil */}
                  <label
                    aria-label={'Importer ma photo'}
                    className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border p-1.5 transition ${
                      photoImportee
                        ? 'border-[#EA580C] bg-[#EA580C]/15'
                        : 'border-white/15 hover:border-white/30'
                    }`}
                  >
                    <span
                      className={
                        'flex size-12 items-center justify-center overflow-hidden rounded-full bg-white/5'
                      }
                    >
                      {photoImportee ? (
                        <img
                          src={avatar}
                          alt={'Ma photo'}
                          className={'size-12 object-cover'}
                        />
                      ) : (
                        <ImagePlus className={'text-muted-foreground size-5'} />
                      )}
                    </span>
                    <span className={'text-muted-foreground text-[10px]'}>
                      {uploadPhoto ? '…' : 'Ma photo'}
                    </span>
                    <input
                      type={'file'}
                      accept={'image/*'}
                      className={'hidden'}
                      data-test={'profil-photo'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) importerPhoto(file);
                      }}
                    />
                  </label>
                </div>
                <p className={'text-muted-foreground text-xs'}>
                  Choisis un style généré, ou <strong>importe ta photo</strong>{' '}
                  (5 Mo max).
                </p>
              </div>

              {/* Niveau + Poste côte à côte */}
              <div className={'flex flex-col gap-7 sm:flex-row sm:gap-6'}>
                <div className={'flex flex-1 flex-col gap-2.5'}>
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
                <div className={'flex flex-1 flex-col gap-2.5'}>
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
                </div>
              </div>

              {/* Style de jeu + Taille côte à côte */}
              <div className={'flex flex-col gap-7 sm:flex-row sm:gap-6'}>
                <div className={'flex flex-1 flex-col gap-2.5'}>
                  <Label htmlFor={'styleJeu'}>Style de jeu</Label>
                  <NativeSelect
                    id={'styleJeu'}
                    value={styleJeu}
                    onChange={(e) => setStyleJeu(e.target.value)}
                  >
                    {STYLES_JEU.map((s) => (
                      <NativeSelectOption key={s} value={s}>
                        {s}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
                <div className={'flex flex-1 flex-col gap-2.5'}>
                  <Label htmlFor={'taille'}>Taille</Label>
                  <Input
                    id={'taille'}
                    placeholder={'Ex. 1m85'}
                    value={taille}
                    onChange={(e) => setTaille(e.target.value)}
                    data-test={'profil-taille'}
                  />
                </div>
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

              {erreur ? (
                <p className={'text-sm font-medium text-red-400'}>{erreur}</p>
              ) : null}

              <div className={'flex items-center gap-3'}>
                <Button
                  onClick={enregistrer}
                  disabled={enCours}
                  data-test={'enregistrer-profil'}
                  className={
                    'bg-[#EA580C] font-extrabold text-black shadow-[0_10px_30px_-8px_#EA580C] transition hover:-translate-y-0.5 hover:bg-[#EA580C] hover:brightness-110'
                  }
                >
                  {enCours ? 'Enregistrement…' : 'Enregistrer mon profil'}
                </Button>

                {/* Annuler : visible seulement si on a déjà un profil */}
                {aProfil ? (
                  <Button
                    onClick={() => setEdition(false)}
                    variant={'ghost'}
                    disabled={enCours}
                    className={'text-muted-foreground'}
                  >
                    Annuler
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Panneau : la liste des joueurs (abonnés / abonnements / likers) */}
      <Drawer
        open={listeOuverte !== null}
        onOpenChange={(ouvert) => {
          if (!ouvert) setListeOuverte(null);
        }}
      >
        <DrawerContent
          className={'data-[vaul-drawer-direction=bottom]:max-h-[80vh]'}
        >
          <DrawerHeader
            className={'flex flex-row items-center justify-between gap-2'}
          >
            <DrawerTitle>
              {listeOuverte?.titre} ({listeOuverte?.joueurs.length ?? 0})
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
              'mx-auto flex w-full max-w-xl flex-col gap-2 overflow-y-auto px-4 pb-6'
            }
          >
            {listeOuverte && listeOuverte.joueurs.length > 0 ? (
              listeOuverte.joueurs.map((j) => (
                <Link
                  key={j.id}
                  href={`/home/joueur/${j.id}`}
                  onClick={() => setListeOuverte(null)}
                  className={
                    'flex items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:border-white/30 hover:bg-white/5'
                  }
                >
                  <Avatar className={'size-10'}>
                    <AvatarImage
                      src={avatarUrl(j.pseudo, j.avatar)}
                      alt={j.pseudo}
                    />
                    <AvatarFallback className={'bg-muted uppercase'}>
                      {j.pseudo.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className={'font-heading flex-1 text-lg tracking-wide'}>
                    {j.pseudo}
                  </span>
                  <ChevronRight className={'text-muted-foreground size-5'} />
                </Link>
              ))
            ) : (
              <p className={'text-muted-foreground py-6 text-center text-sm'}>
                Personne pour l’instant. 🏀
              </p>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </PageBody>
  );
}
