import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import EcosystemPage from '@/app/[locale]/ecosystem/page';
import InstallPage from '@/app/[locale]/install/page';
import LocalizedHomePage from '@/app/[locale]/page';
import QualityPage from '@/app/[locale]/quality/page';
import SkillsPage from '@/app/[locale]/skills/page';
import { ThemeProvider } from '@/components/theme-provider';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => '/en',
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
});

function createLocalizedHomePageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
    searchParams: Promise.resolve({}),
  } as PageProps<'/[locale]'>;
}

function createLocalizedInstallPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
    searchParams: Promise.resolve({}),
  } as PageProps<'/[locale]/install'>;
}

function createLocalizedSkillsPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
    searchParams: Promise.resolve({}),
  } as PageProps<'/[locale]/skills'>;
}

function createLocalizedQualityPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
    searchParams: Promise.resolve({}),
  } as PageProps<'/[locale]/quality'>;
}

function createLocalizedEcosystemPageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
    searchParams: Promise.resolve({}),
  } as PageProps<'/[locale]/ecosystem'>;
}

describe('localized page rendering', () => {
  it('renders the English home navigation and hub content', async () => {
    render(
      <ThemeProvider>{await LocalizedHomePage(createLocalizedHomePageProps('en'))}</ThemeProvider>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Purrfold landing for serious agent workflows',
      })
    ).toBeDefined();
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/en');
    expect(screen.getByRole('link', { name: 'Install' }).getAttribute('href')).toBe('/en/install');
    expect(screen.getByRole('link', { name: 'Skills' }).getAttribute('href')).toBe('/en/skills');
    expect(screen.getByRole('link', { name: 'Quality' }).getAttribute('href')).toBe('/en/quality');
    expect(screen.getByRole('link', { name: 'Ecosystem' }).getAttribute('href')).toBe(
      '/en/ecosystem'
    );
    expect(screen.getByRole('link', { name: 'GitHub' }).getAttribute('href')).toContain(
      'github.com'
    );
    expect(screen.getByRole('link', { name: 'Next.js' }).getAttribute('href')).toContain('nextjs');
  });

  it('renders the Spanish home navigation and hub content', async () => {
    render(
      <ThemeProvider>{await LocalizedHomePage(createLocalizedHomePageProps('es'))}</ThemeProvider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Purrfold para flujos serios con agentes' })
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
  });

  it('renders an English placeholder page with context and a CTA', async () => {
    render(
      <ThemeProvider>{await QualityPage(createLocalizedQualityPageProps('en'))}</ThemeProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Quality signals' })).toBeDefined();
    expect(screen.getByText('Guardrails').textContent).toBe('Guardrails');
    expect(screen.getByRole('heading', { level: 2, name: 'Quality Checks' })).toBeDefined();
    expect(
      screen.getByText(
        'Verify the guardrails, checks, and evidence that keep installs trustworthy.'
      ).textContent
    ).toBe('Verify the guardrails, checks, and evidence that keep installs trustworthy.');
    expect(screen.getByRole('link', { name: 'Back to home' }).getAttribute('href')).toBe('/en');
  });

  it('renders a Spanish placeholder page with equivalent localized content', async () => {
    render(
      <ThemeProvider>{await EcosystemPage(createLocalizedEcosystemPageProps('es'))}</ThemeProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Ecosistema conectado' })).toBeDefined();
    expect(screen.getByText('Resumen').textContent).toBe('Resumen');
    expect(screen.getByRole('heading', { level: 2, name: 'Herramientas' })).toBeDefined();
    expect(
      screen.getByText(
        'Descubre cómo esta landing se conecta con el CLI, shadcn y Next.js sin agregar ruido.'
      ).textContent
    ).toBe('Descubre cómo esta landing se conecta con el CLI, shadcn y Next.js sin agregar ruido.');
    expect(screen.getByRole('link', { name: 'Volver al inicio' }).getAttribute('href')).toBe('/es');
  });

  it('renders localized sub-card labels on Spanish placeholder pages', async () => {
    render(
      <ThemeProvider>{await InstallPage(createLocalizedInstallPageProps('es'))}</ThemeProvider>
    );
    expect(screen.getByText('CLI').textContent).toBe('CLI');
    expect(screen.getByRole('heading', { level: 2, name: 'Primeros pasos' })).toBeDefined();

    document.body.innerHTML = '';
    render(<ThemeProvider>{await SkillsPage(createLocalizedSkillsPageProps('es'))}</ThemeProvider>);
    expect(screen.getByText('Flujo de trabajo').textContent).toBe('Flujo de trabajo');
    expect(screen.getByRole('heading', { level: 2, name: 'Capas de skills' })).toBeDefined();

    document.body.innerHTML = '';
    render(
      <ThemeProvider>{await QualityPage(createLocalizedQualityPageProps('es'))}</ThemeProvider>
    );
    expect(screen.getByText('Controles').textContent).toBe('Controles');
    expect(
      screen.getByRole('heading', { level: 2, name: 'Comprobaciones de calidad' })
    ).toBeDefined();

    document.body.innerHTML = '';
    render(
      <ThemeProvider>{await EcosystemPage(createLocalizedEcosystemPageProps('es'))}</ThemeProvider>
    );
    expect(screen.getByText('Resumen').textContent).toBe('Resumen');
    expect(screen.getByRole('heading', { level: 2, name: 'Herramientas' })).toBeDefined();
  });
});
