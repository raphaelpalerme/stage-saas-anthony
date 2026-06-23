import { CreditCard, Home, MapPin, Search, User } from 'lucide-react';
import * as z from 'zod';

import { NavigationConfigSchema } from '@kit/ui/navigation-schema';

import featureFlagsConfig from '~/config/feature-flags.config';
import pathsConfig from '~/config/paths.config';

const iconClasses = 'w-4';

// Icônes des features Pickify : un peu plus grandes pour qu'elles ressortent.
const brandIcon = 'size-5';

const routes = [
  {
    label: 'common.routes.application',
    children: [
      {
        label: 'common.routes.home',
        path: pathsConfig.app.home,
        Icon: <Home className={iconClasses} />,
        highlightMatch: `${pathsConfig.app.home}$`,
      },
    ],
  },
  {
    divider: true,
  },
  {
    label: 'Pickify',
    children: [
      {
        label: 'Mon profil',
        path: `${pathsConfig.app.home}/profil`,
        Icon: <User className={brandIcon} style={{ color: '#EA580C' }} />,
      },
      {
        label: 'Poster une dispo',
        path: `${pathsConfig.app.home}/dispo`,
        Icon: <MapPin className={brandIcon} style={{ color: '#0284C7' }} />,
      },
      {
        label: 'Trouver des joueurs',
        path: `${pathsConfig.app.home}/trouver`,
        Icon: <Search className={brandIcon} style={{ color: '#EA580C' }} />,
      },
    ],
  },
  {
    label: 'common.routes.settings',
    children: [
      {
        label: 'common.routes.profile',
        path: pathsConfig.app.personalAccountSettings,
        Icon: <User className={iconClasses} />,
      },
      featureFlagsConfig.enablePersonalAccountBilling
        ? {
            label: 'common.routes.billing',
            path: pathsConfig.app.personalAccountBilling,
            Icon: <CreditCard className={iconClasses} />,
          }
        : undefined,
    ].filter((route) => !!route),
  },
] satisfies z.output<typeof NavigationConfigSchema>['routes'];

export const personalAccountNavigationConfig = NavigationConfigSchema.parse({
  routes,
  style: process.env.NEXT_PUBLIC_USER_NAVIGATION_STYLE,
  sidebarCollapsed: process.env.NEXT_PUBLIC_HOME_SIDEBAR_COLLAPSED,
  sidebarCollapsedStyle: process.env.NEXT_PUBLIC_SIDEBAR_COLLAPSIBLE_STYLE,
});
