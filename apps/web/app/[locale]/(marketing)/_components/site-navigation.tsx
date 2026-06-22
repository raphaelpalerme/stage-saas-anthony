import { NavigationMenu, NavigationMenuList } from '@kit/ui/navigation-menu';
import { Trans } from '@kit/ui/trans';

import { MobileSiteNavigation } from './mobile-site-navigation';
import { SiteNavigationItem } from './site-navigation-item';

const links = {
  Features: {
    label: 'marketing.navFeatures',
    path: '/#features',
  },
  Pricing: {
    label: 'marketing.navPricing',
    path: '/#pricing',
  },
  FAQ: {
    label: 'marketing.navFaq',
    path: '/#faq',
  },
  SignIn: {
    label: 'auth.signIn',
    path: '/auth/sign-in',
    showOn: 'mobile',
  },
  SignUp: {
    label: 'auth.signUp',
    path: '/auth/sign-up',
    showOn: 'mobile',
    variant: 'default' as const,
  },
};

export function SiteNavigation() {
  const NavItems = Object.values(links)
    .map((item) => {
      if ('showOn' in item && item.showOn === 'mobile') return null;

      return (
        <SiteNavigationItem key={item.path} path={item.path}>
          <Trans i18nKey={item.label} />
        </SiteNavigationItem>
      );
    })
    .filter(Boolean);

  return (
    <>
      <div className={'hidden items-center justify-center md:flex'}>
        <NavigationMenu>
          <NavigationMenuList className={'gap-x-2.5'}>
            {NavItems}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className={'flex justify-start sm:items-center md:hidden'}>
        <MobileSiteNavigation links={Object.values(links)} />
      </div>
    </>
  );
}
