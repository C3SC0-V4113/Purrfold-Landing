'use client';

import { useRouter } from 'next/navigation';

import { getLocaleSwitchPath, locales } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type LanguageSwitcherProps = {
  activeLocale: Locale;
  label: string;
  localeNames: Record<Locale, string>;
};

export function LanguageSwitcher({ activeLocale, label, localeNames }: LanguageSwitcherProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        {locales.map((locale) => {
          const isActive = locale === activeLocale;

          return (
            <button
              key={locale}
              type="button"
              aria-pressed={isActive}
              className="rounded-full border border-border px-3 py-1 font-medium text-foreground transition hover:border-foreground disabled:cursor-default disabled:opacity-100"
              disabled={isActive}
              onClick={() => router.replace(getLocaleSwitchPath(window.location.pathname, locale))}
            >
              {localeNames[locale]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
