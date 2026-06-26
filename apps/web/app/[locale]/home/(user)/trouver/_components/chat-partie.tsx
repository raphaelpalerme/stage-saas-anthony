'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

import { Send, Smile } from 'lucide-react';

import { type Tables } from '@kit/supabase/database';
import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { toast } from '@kit/ui/sonner';

import { avatarUrl } from '../../_lib/avatars';
import { envoyerMessageAction } from '../_lib/server/chat-actions';

// Un message tel qu'il vit dans la base (type généré par Supabase).
type Message = Tables<'messages'>;

// L'annuaire account_id -> pseudo/avatar (pour afficher QUI a écrit).
type Pseudos = Record<string, { pseudo: string; avatar: string }>;

// Quelques emojis pratiques (basket + réactions) pour la palette du chat.
const EMOJIS = [
  '🏀',
  '🔥',
  '💪',
  '😎',
  '😀',
  '😂',
  '👍',
  '👎',
  '🙌',
  '🤝',
  '🎉',
  '🏆',
  '⏰',
  '📍',
  '😅',
  '😡',
];

export function ChatPartie(props: {
  dispoId: string;
  moiId: string;
  pseudos: Pseudos;
}) {
  const supabase = useSupabase();

  // La liste des messages affichés.
  const [messages, setMessages] = useState<Message[]>([]);
  // Le message qu'on est en train d'écrire.
  const [texte, setTexte] = useState('');
  const [enCours, startTransition] = useTransition();
  // La palette d'emojis est-elle ouverte ?
  const [paletteOuverte, setPaletteOuverte] = useState(false);

  // Pour faire défiler automatiquement vers le dernier message.
  const finRef = useRef<HTMLDivElement>(null);

  // Fusionne des messages dans la liste, SANS doublon (par id), triés par date.
  // Renvoie la MÊME liste si rien de nouveau → évite un re-render inutile.
  function fusionner(prev: Message[], entrants: Message[]) {
    const connus = new Set(prev.map((m) => m.id));
    const nouveaux = entrants.filter((m) => !connus.has(m.id));
    if (nouveaux.length === 0) return prev;
    return [...prev, ...nouveaux].sort((a, b) =>
      (a.created_at ?? '').localeCompare(b.created_at ?? ''),
    );
  }

  // 1) Charger l'historique + recevoir les nouveaux messages tout seuls :
  //    - le TEMPS RÉEL pousse les messages instantanément (effet réseau social) ;
  //    - un petit RAFRAÎCHISSEMENT toutes les 3 s sert de filet de sécurité
  //      (si le temps réel n'arrive pas, ça se met quand même à jour, sans refresh).
  useEffect(() => {
    let actif = true;

    // Récupère tous les messages de la partie et les fusionne dans la liste.
    async function rafraichir() {
      const { data } = await supabase
        .from('messages')
        .select('id, dispo_id, account_id, contenu, created_at')
        .eq('dispo_id', props.dispoId)
        .order('created_at', { ascending: true });

      if (actif && data) setMessages((prev) => fusionner(prev, data));
    }

    // a) tout de suite au chargement
    void rafraichir();

    // b) temps réel : nouveaux INSERT sur cette dispo
    const channel = supabase
      .channel(`chat-dispo-${props.dispoId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `dispo_id=eq.${props.dispoId}`,
        },
        (payload) => {
          if (actif) {
            setMessages((prev) => fusionner(prev, [payload.new as Message]));
          }
        },
      )
      .subscribe();

    // c) filet de sécurité : on revérifie toutes les 3 secondes
    const minuteur = setInterval(() => void rafraichir(), 3000);

    // d) au démontage : on arrête tout proprement
    return () => {
      actif = false;
      clearInterval(minuteur);
      void supabase.removeChannel(channel);
    };
  }, [supabase, props.dispoId]);

  // À chaque nouveau message, on descend en bas de la conversation.
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envoyer un message : on passe par la server action (la RLS vérifie
  // côté base que j'ai le droit d'écrire dans cette partie).
  function envoyer() {
    const contenu = texte.trim();
    if (!contenu) return;

    setTexte(''); // on vide tout de suite le champ

    startTransition(async () => {
      const resultat = await envoyerMessageAction({
        dispoId: props.dispoId,
        contenu,
      });

      // En cas d'échec, on remet le texte pour ne pas le perdre ET on prévient
      // l'utilisateur (sinon le bouton a l'air de "ne rien faire").
      if (resultat?.serverError ?? resultat?.validationErrors) {
        setTexte(contenu);
        toast.error("Le message n'a pas pu être envoyé. Réessaie.");
        return;
      }

      // Succès : on affiche TOUT DE SUITE mon message (sans attendre le temps réel).
      // Si le temps réel / le rafraîchissement le renvoient, la fusion l'ignore.
      const monMessage = resultat?.data?.message;
      if (monMessage) {
        setMessages((prev) => fusionner(prev, [monMessage]));
      }
    });
  }

  return (
    <div className={'flex h-full min-h-0 flex-col gap-3'}>
      {/* La liste des messages (zone qui défile et remplit l'espace dispo) */}
      <div className={'flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1'}>
        {messages.length > 0 ? (
          messages.map((m) => {
            const moi = m.account_id === props.moiId;
            const auteur = props.pseudos[m.account_id];
            const pseudo = auteur?.pseudo ?? 'Joueur';

            return (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${moi ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className={'size-7 shrink-0'}>
                  <AvatarImage
                    src={avatarUrl(pseudo, auteur?.avatar ?? '')}
                    alt={pseudo}
                  />
                  <AvatarFallback className={'bg-muted text-xs uppercase'}>
                    {pseudo.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`flex max-w-[75%] flex-col gap-0.5 ${moi ? 'items-end' : 'items-start'}`}
                >
                  <span className={'text-muted-foreground text-[10px]'}>
                    {moi ? 'Moi' : pseudo}
                  </span>
                  <span
                    className={`rounded-2xl px-3 py-1.5 text-sm ${
                      moi
                        ? 'bg-[#EA580C] text-black'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {m.contenu}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className={'text-muted-foreground py-2 text-center text-xs'}>
            Pas encore de message. Lance la conversation pour vous organiser ! 🏀
          </p>
        )}
        <div ref={finRef} />
      </div>

      {/* Le champ d'envoi (+ la palette d'emojis quand elle est ouverte) */}
      <div className={'flex flex-col gap-2'}>
        {paletteOuverte ? (
          <div
            className={'bg-muted/50 flex flex-wrap gap-1 rounded-xl p-2'}
            data-test={'chat-emoji-palette'}
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type={'button'}
                onClick={() => setTexte((t) => t + emoji)}
                aria-label={`Emoji ${emoji}`}
                className={'rounded-md p-1 text-xl transition hover:bg-white/10'}
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : null}

        <div className={'flex items-center gap-2'}>
          {/* Bouton pour ouvrir/fermer la palette d'emojis */}
          <Button
            type={'button'}
            onClick={() => setPaletteOuverte((o) => !o)}
            size={'icon'}
            variant={'ghost'}
            className={'text-muted-foreground shrink-0'}
            aria-label={'Emojis'}
            data-test={'chat-emoji'}
          >
            <Smile className={'size-5'} />
          </Button>

          <Input
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                envoyer();
              }
            }}
            placeholder={'Écris un message…'}
            maxLength={500}
            data-test={'chat-input'}
          />
          <Button
            onClick={envoyer}
            disabled={enCours || !texte.trim()}
            size={'icon'}
            className={
              'shrink-0 bg-[#EA580C] text-black hover:bg-[#EA580C] hover:brightness-110'
            }
            aria-label={'Envoyer'}
            data-test={'chat-send'}
          >
            <Send className={'size-4'} />
          </Button>
        </div>
      </div>
    </div>
  );
}
