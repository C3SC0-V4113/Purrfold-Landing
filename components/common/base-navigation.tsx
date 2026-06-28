'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GitHubIcon, PurrfoldCatIcon } from '@/components/common/brand-icons';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath, externalLinks, phaseOneRoutes } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import type { Locale, PhaseOneRoute } from '@/i18n/routing';

type BaseNavigationProps = {
  locale: Locale;
};

const externalLinkAttributes = {
  rel: 'noreferrer noopener',
  target: '_blank',
} as const;

export function BaseNavigation({ locale }: BaseNavigationProps) {
  const t = getMessages(locale).Navigation;
  const pathname = usePathname();

  const isActive = (route: PhaseOneRoute) => {
    const localized = buildLocalizedPath(locale, route);
    return pathname === localized || pathname === `${localized}/`;
  };

  const navLinks = phaseOneRoutes.map((route) => {
    const label = route === '/' ? t.home : (t[route.slice(1) as keyof typeof t] as string);
    return { route, label };
  });

  return (
    <header className="sticky top-0 z-40 w-full animate-shell-fade-in border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-2 px-6 sm:px-10">
        <Link
          href={buildLocalizedPath(locale, '/')}
          className="mr-4 inline-flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <PurrfoldCatIcon aria-hidden="true" className="size-4 text-primary" />
          <span>Purrfold</span>
        </Link>

        <nav aria-label={t.label} className="ml-auto hidden items-center gap-2 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navLinks.map(({ route, label }) => {
                const active = isActive(route);

                return (
                  <NavigationMenuItem key={route}>
                    <NavigationMenuLink
                      render={<Link href={buildLocalizedPath(locale, route)} />}
                      active={active}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        active
                          ? 'bg-secondary text-secondary-foreground hover:bg-secondary focus:bg-secondary'
                          : 'hover:bg-muted focus:bg-muted'
                      )}
                    >
                      {label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Separator orientation="vertical" className="mx-1 h-5" />

          <a
            href={externalLinks.github}
            {...externalLinkAttributes}
            aria-label={t.github}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), 'rounded-full')}
          >
            <GitHubIcon aria-hidden="true" />
          </a>
        </nav>

        <div className="hidden items-center gap-0.5 md:flex">
          <LanguageSwitcher
            activeLocale={locale}
            label={t.languageSwitch}
            localeNames={{
              en: t.localeNameEn,
              es: t.localeNameEs,
            }}
          />
          <ThemeSwitcher locale={locale} />
        </div>

        <div className="ml-auto flex items-center md:hidden">
          <LanguageSwitcher
            activeLocale={locale}
            label={t.languageSwitch}
            localeNames={{
              en: t.localeNameEn,
              es: t.localeNameEs,
            }}
          />
          <ThemeSwitcher locale={locale} />
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label={t.openMenu} />}>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false} className="w-80 max-w-[85vw]">
              <SheetHeader className="flex-row items-start justify-between gap-4 border-b border-border p-6">
                <div className="flex flex-col gap-1">
                  <SheetTitle>{t.mobileMenuTitle}</SheetTitle>
                  <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <PurrfoldCatIcon aria-hidden="true" className="size-4 text-primary" />
                    <span>Purrfold</span>
                  </p>
                </div>
                <SheetClose render={<Button variant="ghost" size="icon-sm" />}>
                  <XIcon />
                  <span className="sr-only">{t.closeMenu}</span>
                </SheetClose>
              </SheetHeader>

              <nav aria-label={t.label} className="flex flex-col gap-2 p-6">
                {navLinks.map(({ route, label }) => (
                  <Link
                    key={route}
                    href={buildLocalizedPath(locale, route)}
                    className={cn(
                      buttonVariants({
                        variant: isActive(route) ? 'secondary' : 'ghost',
                        size: 'sm',
                      }),
                      'justify-start'
                    )}
                    aria-current={isActive(route) ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <SheetFooter className="mt-auto border-t border-border p-6">
                <a
                  href={externalLinks.github}
                  {...externalLinkAttributes}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'justify-start'
                  )}
                >
                  <GitHubIcon data-icon="inline-start" />
                  {t.github}
                </a>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
