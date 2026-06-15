import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LanguageSwitcher } from '@/components/language-switcher';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace,
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    replace.mockReset();
  });

  it('shows both locale options', () => {
    render(
      <LanguageSwitcher
        activeLocale="es"
        label="Idioma"
        localeNames={{ en: 'English', es: 'Español' }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Idioma' }));

    expect(screen.getByRole('menuitemradio', { name: 'English' }).textContent).toContain('English');
    expect(screen.getByRole('menuitemradio', { name: 'Español' }).textContent).toContain('Español');
  });

  it('preserves path, query, and hash when switching locales', () => {
    window.history.replaceState({}, '', '/es/quality?tab=checks#proof');

    render(
      <LanguageSwitcher
        activeLocale="es"
        label="Idioma"
        localeNames={{ en: 'English', es: 'Español' }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Idioma' }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'English' }));

    expect(replace).toHaveBeenCalledWith('/en/quality?tab=checks#proof');
  });
});
