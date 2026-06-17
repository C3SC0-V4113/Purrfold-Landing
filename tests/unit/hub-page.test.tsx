import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LocalizedHomePage from '@/app/[locale]/page';
import { ThemeProvider } from '@/components/theme-provider';

import type { LocalizedPageProps } from '@/lib/localized-page-props';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => '/en',
}));

function createLocalizedHomePageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
  } satisfies LocalizedPageProps;
}

describe('Hub page composition', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders BaseNavigation and all five hub sections without PageShell', async () => {
    render(
      <ThemeProvider>{await LocalizedHomePage(createLocalizedHomePageProps('en'))}</ThemeProvider>
    );

    expect(screen.getByRole('banner')).toBeDefined();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeDefined();

    const main = screen.getByRole('main');
    expect(
      within(main).getByRole('heading', {
        level: 1,
        name: 'The solid foundation for agent-driven projects',
      })
    ).toBeDefined();
    expect(within(main).getByText('npx purrfold@latest <project-directory>')).toBeDefined();
    expect(within(main).getAllByRole('link')).toHaveLength(7);
    expect(within(main).getByRole('heading', { name: 'Roadmap' })).toBeDefined();
    expect(within(main).getByRole('heading', { name: 'Foundations' })).toBeDefined();

    expect(screen.queryByRole('link', { name: 'Back to home' })).toBeNull();
  });

  it('renders the Spanish hub composition', async () => {
    render(
      <ThemeProvider>{await LocalizedHomePage(createLocalizedHomePageProps('es'))}</ThemeProvider>
    );

    const main = screen.getByRole('main');
    expect(
      within(main).getByRole('heading', {
        level: 1,
        name: 'La base sólida para proyectos con agentes',
      })
    ).toBeDefined();
    expect(within(main).getByRole('heading', { name: 'Hoja de ruta' })).toBeDefined();
    expect(within(main).getByRole('heading', { name: 'Bases' })).toBeDefined();
  });
});
