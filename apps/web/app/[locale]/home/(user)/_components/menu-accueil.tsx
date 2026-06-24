'use client';

import { useRouter } from 'next/navigation';

import { LogOut, Menu } from 'lucide-react';

import { useSignOut } from '@kit/supabase/hooks/use-sign-out';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { SubMenuModeToggle } from '@kit/ui/mode-toggle';

// Le menu "hamburger" (☰) de la page d'accueil : il regroupe la bascule
// sombre/clair et la déconnexion au même endroit, bien visible.
export function MenuAccueil() {
  const router = useRouter();
  const signOut = useSignOut();

  async function deconnecter() {
    await signOut.mutateAsync();
    router.push('/');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={'Ouvrir le menu'}
        className={
          'text-muted-foreground hover:text-foreground inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition hover:border-white/30'
        }
      >
        <Menu className={'size-5'} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align={'end'} sideOffset={8}>
        {/* Bascule sombre / clair (composant Makerkit) */}
        <SubMenuModeToggle />

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={deconnecter}>
          <LogOut className={'mr-2 size-4'} />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
