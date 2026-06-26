'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import {
  Clapperboard,
  CreditCard,
  Home,
  MessageCircle,
  Plus,
  User,
  Users,
} from 'lucide-react';

import { useSupabase } from '@kit/supabase/hooks/use-supabase';

// La barre de navigation du bas, façon Instagram / TikTok : toujours visible,
// elle permet de passer d'un écran à l'autre d'un seul pouce (mobile-first).
const ONGLETS = [
  { href: '/home/billing', label: 'Facturation', Icon: CreditCard },
  { href: '/home', label: 'Accueil', Icon: Home },
  { href: '/home/trouver', label: 'Trouver', Icon: Users },
  { href: '/home/dispo', label: 'Poster', Icon: Plus, central: true },
  { href: '/home/highlights', label: 'Highlights', Icon: Clapperboard },
  { href: '/home/messages', label: 'Messages', Icon: MessageCircle },
  { href: '/home/profil', label: 'Profil', Icon: User },
];

export function BottomNav() {
  const pathname = usePathname() ?? '';
  const supabase = useSupabase();

  // Mon id + le nombre de messages non lus (badge sur l'onglet Messages).
  const [moiId, setMoiId] = useState('');
  const [messagesNonLus, setMessagesNonLus] = useState(0);

  // Qui suis-je ?
  useEffect(() => {
    void supabase.auth
      .getUser()
      .then(({ data }) => setMoiId(data.user?.id ?? ''));
  }, [supabase]);

  // Compter les messages NON LUS : un DM reçu d'un joueur est "non lu" tant que
  // je n'ai pas ouvert sa conversation après son envoi (table `lectures`).
  // Du coup le badge baisse à mesure que j'ouvre les conversations, et disparaît
  // quand tout est lu. On revérifie toutes les 5 s (et au changement de page).
  useEffect(() => {
    if (!moiId) return;
    let actif = true;

    async function compter() {
      const [{ data: lus }, { data: recus }] = await Promise.all([
        supabase.from('lectures').select('autre_id, lu_le').eq('lecteur_id', moiId),
        supabase
          .from('messages_directs')
          .select('expediteur_id, created_at')
          .eq('destinataire_id', moiId),
      ]);

      const luMap = new Map((lus ?? []).map((l) => [l.autre_id, l.lu_le]));
      const nonLus = (recus ?? []).filter(
        (m) => (m.created_at ?? '') > (luMap.get(m.expediteur_id) ?? '1970-01-01'),
      ).length;

      if (actif) setMessagesNonLus(nonLus);
    }

    void compter();
    const minuteur = setInterval(() => void compter(), 5000);

    return () => {
      actif = false;
      clearInterval(minuteur);
    };
  }, [supabase, moiId, pathname]);

  return (
    <nav
      className={
        'fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/70 backdrop-blur-md'
      }
    >
      <div
        className={
          'mx-auto flex w-full max-w-xl items-center gap-0.5 px-1 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]'
        }
      >
        {ONGLETS.map(({ href, label, Icon, central }) => {
          const actif =
            href === '/home'
              ? pathname.endsWith('/home')
              : pathname.endsWith(href);

          // Badge de messages non lus sur l'onglet Messages.
          const badge =
            href === '/home/messages' && messagesNonLus > 0
              ? messagesNonLus
              : 0;

          if (central) {
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={
                  'flex shrink-0 flex-col items-center gap-1 text-[10px] font-medium text-white'
                }
              >
                <span
                  className={
                    'flex size-11 items-center justify-center rounded-full bg-[#EA580C] text-black shadow-[0_8px_20px_-6px_#EA580C] transition hover:brightness-110'
                  }
                >
                  <Icon className={'size-6'} strokeWidth={2.5} />
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-0.5 py-1 text-[9px] font-medium transition ${
                actif ? 'text-[#EA580C]' : 'text-[#a3a3a8] hover:text-white'
              }`}
            >
              <span className={'relative'}>
                <Icon className={'size-6'} strokeWidth={actif ? 2.5 : 2} />
                {badge > 0 ? (
                  <span
                    className={
                      'absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white'
                    }
                  >
                    {badge > 9 ? '9+' : badge}
                  </span>
                ) : null}
              </span>
              <span className={'w-full truncate text-center'}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
