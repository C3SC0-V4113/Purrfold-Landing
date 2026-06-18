'use client';

import { LanguagesIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getLocaleSwitchPath, locales } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type LanguageSwitcherProps = {
  activeLocale: Locale;
  label: string;
  localeNames: Record<Locale, string>;
};

export function LanguageSwitcher({ activeLocale, label, localeNames }: LanguageSwitcherProps) {
  const router = useRouter();

  const switchLocale = (value: string) => {
    const targetPath = getLocaleSwitchPath(window.location.pathname, value as Locale);
    router.replace(`${targetPath}${window.location.search}${window.location.hash}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={label} />}>
        <LanguagesIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={activeLocale} onValueChange={switchLocale}>
            {locales.map((locale) => (
              <DropdownMenuRadioItem key={locale} value={locale}>
                {localeNames[locale]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
