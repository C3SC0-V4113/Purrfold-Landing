'use client';

import { MoonIcon, SunIcon, MonitorIcon } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
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

import type { Locale } from '@/i18n/routing';

type ThemeSwitcherProps = {
  locale: Locale;
};

const labels: Record<string, { en: string; es: string }> = {
  light: { en: 'Light', es: 'Claro' },
  dark: { en: 'Dark', es: 'Oscuro' },
  system: { en: 'System', es: 'Sistema' },
};

const triggerLabels: Record<Locale, string> = {
  en: 'Switch theme',
  es: 'Cambiar tema',
};

export function ThemeSwitcher({ locale }: ThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label={triggerLabels[locale]} />}
      >
        {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{triggerLabels[locale]}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          >
            <DropdownMenuRadioItem value="light">
              <SunIcon />
              {labels.light[locale]}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <MoonIcon />
              {labels.dark[locale]}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <MonitorIcon />
              {labels.system[locale]}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
