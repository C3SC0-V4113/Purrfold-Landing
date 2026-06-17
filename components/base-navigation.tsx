'use client';

import { ExternalLinkIcon, GitBranchIcon, MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath, externalLinks, phaseOneRoutes } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import type { Locale, PhaseOneRoute } from '@/i18n/routing';

type BaseNavigationProps = {
  locale: Locale;
};

const externalLinkItems = [{ href: externalLinks.github, labelKey: 'github' }] as const;

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
          className="mr-4 shrink-0 text-sm font-semibold tracking-tight text-foreground"
        >
          Purrfold
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

          {externalLinkItems.map((item) => {
            const externalLabel = t[item.labelKey] as string;
            return (
              <a
                key={item.href}
                href={item.href}
                {...externalLinkAttributes}
                aria-label={externalLabel}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'rounded-full border-border/70 bg-background/80 pr-2'
                )}
              >
                <GitBranchIcon data-icon="inline-start" />
                {externalLabel}
                <ExternalLinkIcon data-icon="inline-end" />
              </a>
            );
          })}
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
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={locale === 'es' ? 'Abrir menú' : 'Open menu'}
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false}>
              <SheetClose
                render={
                  <Button variant="secondary" className="absolute top-4 right-4" size="icon-sm" />
                }
              >
                <XIcon />
                <span className="sr-only">{t.closeMenu}</span>
              </SheetClose>
              <SheetTitle className="sr-only">
                {locale === 'es' ? 'Navegación' : 'Navigation'}
              </SheetTitle>
              <nav className="mt-6 flex flex-col gap-2">
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
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                {externalLinkItems.map((item) => {
                  const externalLabel = t[item.labelKey] as string;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      {...externalLinkAttributes}
                      aria-label={externalLabel}
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'justify-start'
                      )}
                    >
                      <GitBranchIcon data-icon="inline-start" />
                      {externalLabel}
                      <ExternalLinkIcon data-icon="inline-end" />
                    </a>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
