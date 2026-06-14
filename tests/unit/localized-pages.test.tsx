import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import EcosystemPage from '@/app/[locale]/ecosystem/page';
import LocalizedHomePage from '@/app/[locale]/page';
import QualityPage from '@/app/[locale]/quality/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));

beforeEach(() => {
  document.body.innerHTML = '';
});

function createLocalizedHomePageProps(locale: 'en' | 'es') {
  return {
    params: Promise.resolve({ locale }),
    searchParams: Promise.resolve({}),
  } as PageProps<'/[locale]'>;
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
    render(await LocalizedHomePage(createLocalizedHomePageProps('en')));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Purrfold landing for serious agent workflows',
      }).textContent
    ).toBe('Purrfold landing for serious agent workflows');
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
    expect(screen.getByRole('link', { name: 'shadcn' }).textContent).toBe('shadcn');
    expect(screen.getByRole('link', { name: 'Next.js' }).textContent).toBe('Next.js');
  });

  it('renders the Spanish home navigation and hub content', async () => {
    render(await LocalizedHomePage(createLocalizedHomePageProps('es')));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Purrfold para flujos serios con agentes' })
        .textContent
    ).toBe('Purrfold para flujos serios con agentes');
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
    render(await QualityPage(createLocalizedQualityPageProps('en')));

    expect(screen.getByRole('heading', { level: 1, name: 'Quality signals' }).textContent).toBe(
      'Quality signals'
    );
    expect(
      screen.getByText(
        'Verify the guardrails, checks, and evidence that keep installs trustworthy.'
      ).textContent
    ).toBe('Verify the guardrails, checks, and evidence that keep installs trustworthy.');
    expect(screen.getByRole('link', { name: 'Back to home' }).getAttribute('href')).toBe('/en');
  });

  it('renders a Spanish placeholder page with equivalent localized content', async () => {
    render(await EcosystemPage(createLocalizedEcosystemPageProps('es')));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Ecosistema conectado' }).textContent
    ).toBe('Ecosistema conectado');
    expect(
      screen.getByText(
        'Descubre cómo esta landing se conecta con el CLI, shadcn y Next.js sin agregar ruido.'
      ).textContent
    ).toBe('Descubre cómo esta landing se conecta con el CLI, shadcn y Next.js sin agregar ruido.');
    expect(screen.getByRole('link', { name: 'Volver al inicio' }).getAttribute('href')).toBe('/es');
  });
});
