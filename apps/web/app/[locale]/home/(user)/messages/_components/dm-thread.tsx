'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

import { Send } from 'lucide-react';

import { type Tables } from '@kit/supabase/database';
import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';

import {
  envoyerMessageDirectAction,
  marquerLuAction,
} from '../_lib/server/dm-actions';

type MessageDirect = Tables<'messages_directs'>;

// Le fil de discussion privé entre MOI et un autre joueur.
export function DmThread(props: {
  moiId: string;
  autreId: string;
  autrePseudo: string;
}) {
  const supabase = useSupabase();

  const [messages, setMessages] = useState<MessageDirect[]>([]);
  const [texte, setTexte] = useState('');
  const [enCours, startTransition] = useTransition();
  // Jusqu'à quand l'AUTRE a lu notre conversation (pour afficher "Vu").
  const [luParEux, setLuParEux] = useState<string | null>(null);
  const finRef = useRef<HTMLDivElement>(null);

  // Ajoute des messages sans doublon (par id), triés par date.
  function fusionner(prev: MessageDirect[], entrants: MessageDirect[]) {
    const connus = new Set(prev.map((m) => m.id));
    const nouveaux = entrants.filter((m) => !connus.has(m.id));
    if (nouveaux.length === 0) return prev;
    return [...prev, ...nouveaux].sort((a, b) =>
      (a.created_at ?? '').localeCompare(b.created_at ?? ''),
    );
  }

  // Charger la conversation + recevoir les nouveaux messages en direct.
  useEffect(() => {
    let actif = true;

    // Les 2 sens de la conversation : moi->autre ET autre->moi.
    const filtreConversation =
      `and(expediteur_id.eq.${props.moiId},destinataire_id.eq.${props.autreId}),` +
      `and(expediteur_id.eq.${props.autreId},destinataire_id.eq.${props.moiId})`;

    async function rafraichir() {
      // Les messages de la conversation...
      const { data } = await supabase
        .from('messages_directs')
        .select('id, expediteur_id, destinataire_id, contenu, created_at')
        .or(filtreConversation)
        .order('created_at', { ascending: true });

      if (actif && data) setMessages((prev) => fusionner(prev, data));

      // ...et jusqu'où l'AUTRE a lu (pour le "Vu").
      const { data: lecture } = await supabase
        .from('lectures')
        .select('lu_le')
        .eq('lecteur_id', props.autreId)
        .eq('autre_id', props.moiId)
        .maybeSingle();

      if (actif) setLuParEux(lecture?.lu_le ?? null);
    }

    void rafraichir();

    // Temps réel : les messages qui m'arrivent de CET autre joueur.
    const channel = supabase
      .channel(`dm-${props.autreId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages_directs',
          filter: `destinataire_id=eq.${props.moiId}`,
        },
        (payload) => {
          const m = payload.new as MessageDirect;
          if (actif && m.expediteur_id === props.autreId) {
            setMessages((prev) => fusionner(prev, [m]));
          }
        },
      )
      .subscribe();

    // Filet de sécurité : on revérifie toutes les 3 secondes.
    const minuteur = setInterval(() => void rafraichir(), 3000);

    return () => {
      actif = false;
      clearInterval(minuteur);
      void supabase.removeChannel(channel);
    };
  }, [supabase, props.moiId, props.autreId]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Marquer la conversation comme LUE pour moi : à l'ouverture, et dès qu'un
  // nouveau message arrive (le badge de l'onglet Messages se met à jour).
  useEffect(() => {
    void marquerLuAction({ autreId: props.autreId });
  }, [props.autreId, messages.length]);

  // Mon dernier message est-il "Vu" ? (l'autre a lu jusqu'après son envoi)
  const monDernier = [...messages]
    .reverse()
    .find((m) => m.expediteur_id === props.moiId);
  const vu =
    !!monDernier &&
    !!luParEux &&
    (monDernier.created_at ?? '') <= luParEux;

  function envoyer() {
    const contenu = texte.trim();
    if (!contenu) return;
    setTexte('');

    startTransition(async () => {
      const resultat = await envoyerMessageDirectAction({
        destinataireId: props.autreId,
        contenu,
      });

      if (resultat?.serverError ?? resultat?.validationErrors) {
        setTexte(contenu);
        return;
      }

      const monMessage = resultat?.data?.message;
      if (monMessage) {
        setMessages((prev) => fusionner(prev, [monMessage]));
      }
    });
  }

  return (
    <div className={'flex h-full min-h-0 flex-col gap-3'}>
      <div className={'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1'}>
        {messages.length > 0 ? (
          messages.map((m) => {
            const moi = m.expediteur_id === props.moiId;
            return (
              <div
                key={m.id}
                className={`flex ${moi ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[75%] rounded-2xl px-3 py-1.5 text-sm ${
                    moi ? 'bg-[#EA580C] text-black' : 'bg-muted text-foreground'
                  }`}
                >
                  {m.contenu}
                </span>
              </div>
            );
          })
        ) : (
          <p className={'text-muted-foreground py-2 text-center text-xs'}>
            Démarre la conversation avec {props.autrePseudo} ! 🏀
          </p>
        )}
        {vu ? (
          <span className={'text-muted-foreground self-end text-[10px]'}>
            Vu ✓✓
          </span>
        ) : null}
        <div ref={finRef} />
      </div>

      <div className={'flex items-center gap-2'}>
        <Input
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              envoyer();
            }
          }}
          placeholder={`Écris à ${props.autrePseudo}…`}
          maxLength={500}
          data-test={'dm-input'}
        />
        <Button
          onClick={envoyer}
          disabled={enCours || !texte.trim()}
          size={'icon'}
          aria-label={'Envoyer'}
          className={
            'shrink-0 bg-[#EA580C] text-black hover:bg-[#EA580C] hover:brightness-110'
          }
        >
          <Send className={'size-4'} />
        </Button>
      </div>
    </div>
  );
}
