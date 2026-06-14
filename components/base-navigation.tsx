import Link from 'next/link';

import { LanguageSwitcher } from '@/components/language-switcher';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath, externalLinks } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type BaseNavigationProps = {
  locale: Locale;
};

export function BaseNavigation({ locale }: BaseNavigationProps) {
  const t = getMessages(locale).Navigation;

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6">
      <nav
        aria-label={t.label}
        className="flex flex-wrap items-center gap-3 text-sm font-medium text-foreground"
      >
        <Link href={buildLocalizedPath(locale, '/')}>{t.home}</Link>
        <Link href={buildLocalizedPath(locale, '/install')}>{t.install}</Link>
        <Link href={buildLocalizedPath(locale, '/skills')}>{t.skills}</Link>
        <Link href={buildLocalizedPath(locale, '/quality')}>{t.quality}</Link>
        <Link href={buildLocalizedPath(locale, '/ecosystem')}>{t.ecosystem}</Link>
        <a href={externalLinks.github} rel="noreferrer" target="_blank">
          {t.github}
        </a>
        <a href={externalLinks.shadcn} rel="noreferrer" target="_blank">
          {t.shadcn}
        </a>
        <a href={externalLinks.nextjs} rel="noreferrer" target="_blank">
          {t.nextjs}
        </a>
      </nav>
      <LanguageSwitcher
        activeLocale={locale}
        label={t.languageSwitch}
        localeNames={{
          en: t.localeNameEn,
          es: t.localeNameEs,
        }}
      />
    </div>
  );
}
