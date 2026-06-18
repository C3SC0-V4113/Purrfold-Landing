import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '@/components/common/theme-provider';
import { ThemeSwitcher } from '@/components/common/theme-switcher';

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    window.history.replaceState({}, '', '/en/install?tab=setup#quickstart');
    mockMatchMedia(false);
  });

  it('shows localized theme options for English', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher locale="en" />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Switch theme' }));

    expect(screen.getByRole('menuitemradio', { name: 'Light' }).textContent).toContain('Light');
    expect(screen.getByRole('menuitemradio', { name: 'Dark' }).textContent).toContain('Dark');
    expect(screen.getByRole('menuitemradio', { name: 'System' }).textContent).toContain('System');
  });

  it('updates the theme without changing the current route', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher locale="en" />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Switch theme' }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Dark' }));

    expect(localStorage.getItem('purrfold-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.location.pathname).toBe('/en/install');
    expect(window.location.search).toBe('?tab=setup');
    expect(window.location.hash).toBe('#quickstart');
  });
});
