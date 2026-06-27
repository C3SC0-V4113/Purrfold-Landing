import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import EcosystemPage from '@/app/[locale]/ecosystem/page';
import InstallPage from '@/app/[locale]/install/page';
import LocaleLayout from '@/app/[locale]/layout';
import LocalizedHomePage from '@/app/[locale]/page';
import QualityPage from '@/app/[locale]/quality/page';
import SkillsPage from '@/app/[locale]/skills/page';
import { ThemeProvider } from '@/components/common/theme-provider';
import { externalLinks } from '@/i18n/routing';

import type { LocalizedPageProps } from '@/lib/localized-page-props';
import type { ReactNode } from 'react';

let mockPathname = '/en';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => mockPathname,
}));

beforeEach(() => {
  document.body.innerHTML = '';
  document.documentElement.classList.remove('dark');
  if (typeof window !== 'undefined' && !window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  }

  mockPathname = '/en';
});

function createLocalizedHomePageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
  } satisfies LocalizedPageProps;
}

function createLocalizedInstallPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
  } satisfies LocalizedPageProps;
}

function createLocalizedSkillsPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
  } satisfies LocalizedPageProps;
}

function createLocalizedQualityPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
  } satisfies LocalizedPageProps;
}

function createLocalizedEcosystemPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
  } satisfies LocalizedPageProps;
}

async function renderWithLocaleLayout(locale: 'en' | 'es', children: ReactNode) {
  render(
    <ThemeProvider>
      {await LocaleLayout({
        children,
        params: Promise.resolve({ locale }),
      } as LayoutProps<'/[locale]'>)}
    </ThemeProvider>
  );
}

describe('localized page rendering', () => {
  it('renders the English home navigation and hub content', async () => {
    await renderWithLocaleLayout('en', await LocalizedHomePage(createLocalizedHomePageProps('en')));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'The solid foundation for agent-driven projects',
      })
    ).toBeDefined();
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/en');
    expect(screen.getByRole('link', { name: 'Install' }).getAttribute('href')).toBe('/en/install');
    expect(screen.getByRole('link', { name: 'Skills' }).getAttribute('href')).toBe('/en/skills');
    expect(screen.getByRole('link', { name: 'Quality' }).getAttribute('href')).toBe('/en/quality');
    expect(screen.getByRole('link', { name: 'Ecosystem' }).getAttribute('href')).toBe(
      '/en/ecosystem'
    );
    const topHeader = screen.getByRole('banner');
    expect(topHeader.className).toContain('animate-shell-fade-in');
    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    const githubNavbarLink = within(navigation).getByRole('link', { name: 'GitHub' });
    expect(githubNavbarLink.getAttribute('href')).toBe(externalLinks.github);
    expect(githubNavbarLink.textContent).toBe('');
    expect(githubNavbarLink.getAttribute('target')).toBe('_blank');
    expect(githubNavbarLink.getAttribute('rel')).toBe('noreferrer noopener');
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: 'shadcn/ui' }).getAttribute('href')).toBe(
      'https://ui.shadcn.com'
    );
    expect(within(main).getByRole('link', { name: 'Next.js' }).getAttribute('href')).toBe(
      'https://nextjs.org'
    );
    expect(within(navigation).queryByRole('link', { name: 'shadcn/ui' })).toBeNull();
    expect(within(navigation).queryByRole('link', { name: 'Next.js' })).toBeNull();
    expect(screen.getByText('npx purrfold@latest <project-directory>')).toBeDefined();
  });

  it('renders the Spanish home navigation and hub content', async () => {
    await renderWithLocaleLayout('es', await LocalizedHomePage(createLocalizedHomePageProps('es')));

    expect(
      screen.getByRole('heading', { level: 1, name: 'La base sólida para proyectos con agentes' })
    ).toBeDefined();
    expect(screen.getByRole('link', { name: 'Inicio' }).getAttribute('href')).toBe('/es');
    expect(screen.getByRole('link', { name: 'Instalación' }).getAttribute('href')).toBe(
      '/es/install'
    );
    expect(screen.getByRole('link', { name: 'Skills' }).getAttribute('href')).toBe('/es/skills');
    expect(screen.getByRole('link', { name: 'Calidad' }).getAttribute('href')).toBe('/es/quality');
    expect(screen.getByRole('link', { name: 'Ecosistema' }).getAttribute('href')).toBe(
      '/es/ecosystem'
    );
    expect(screen.getByText('npx purrfold@latest <directorio-del-proyecto>')).toBeDefined();
  });

  it('renders the English quality view with ordered sections', async () => {
    render(
      <ThemeProvider>{await QualityPage(createLocalizedQualityPageProps('en'))}</ThemeProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Quality signals' })).toBeDefined();
    expect(screen.getByText('Default quality stack')).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Quality gates' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Commit hygiene' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'CI confidence' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Runtime insight' })).toBeDefined();
  });

  it('renders the Spanish quality view with equivalent localized content', async () => {
    render(
      <ThemeProvider>{await QualityPage(createLocalizedQualityPageProps('es'))}</ThemeProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Señales de calidad' })).toBeDefined();
    expect(screen.getByText('Base de calidad por defecto')).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Controles de calidad' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Higiene de commits' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Confianza en CI' })).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Visibilidad del runtime' })
    ).toBeDefined();
  });

  it('renders localized sub-card labels on Spanish pages', async () => {
    render(
      <ThemeProvider>{await InstallPage(createLocalizedInstallPageProps('es'))}</ThemeProvider>
    );
    expect(screen.getByText('CLI').textContent).toBe('CLI');
    expect(screen.getByRole('heading', { level: 1, name: 'Instalar Purrfold' })).toBeDefined();
    expect(screen.getByText('Configura tu instalación')).toBeDefined();

    document.body.innerHTML = '';
    render(<ThemeProvider>{await SkillsPage(createLocalizedSkillsPageProps('es'))}</ThemeProvider>);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Skills con el mismo peso' })
    ).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Arquitectura y diseño' })).toBeDefined();

    document.body.innerHTML = '';
    render(
      <ThemeProvider>{await QualityPage(createLocalizedQualityPageProps('es'))}</ThemeProvider>
    );
    expect(screen.getByText('Base de calidad por defecto')).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Controles de calidad' })).toBeDefined();

    document.body.innerHTML = '';
    render(
      <ThemeProvider>{await EcosystemPage(createLocalizedEcosystemPageProps('es'))}</ThemeProvider>
    );
    expect(screen.getByText('Explora recursos compatibles')).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Fundamento' })).toBeDefined();
  });

  it('keeps the active desktop route visible on localized deep pages', async () => {
    mockPathname = '/en/install';

    await renderWithLocaleLayout('en', await InstallPage(createLocalizedInstallPageProps('en')));

    expect(screen.getByRole('link', { name: 'Install' }).getAttribute('aria-current')).toBe('page');
    expect(screen.queryByRole('link', { name: 'Home', current: 'page' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Back to home' })).toBeNull();
  });

  it('does not render the old Spanish back-to-home link on deep pages', async () => {
    render(
      <ThemeProvider>{await InstallPage(createLocalizedInstallPageProps('es'))}</ThemeProvider>
    );

    expect(screen.queryByRole('link', { name: 'Volver al inicio' })).toBeNull();
  });
});
