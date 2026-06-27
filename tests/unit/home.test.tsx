import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LocalizedHomePage from '@/app/[locale]/page';
import Home from '@/app/page';
import { ThemeProvider } from '@/components/common/theme-provider';
import { ecosystemResources } from '@/components/ecosystem/ecosystem-catalog';
import { qualityTools } from '@/components/quality/quality-catalog';
import { skillCatalog } from '@/components/skills/skills-catalog';
import { getMessages } from '@/i18n/messages';

import type { LocalizedPageProps } from '@/lib/localized-page-props';

let mockPathname = '/en';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => mockPathname,
}));

function createProps(locale: 'en' | 'es'): LocalizedPageProps {
  return {
    params: Promise.resolve({ locale }),
  };
}

function assertLocalizedHomePage(locale: 'en' | 'es') {
  const messages = getMessages(locale);
  const cards = messages.HomePage.hub.cards;

  expect(
    screen.getByRole('heading', { level: 1, name: messages.HomePage.hub.hero.title })
  ).toBeDefined();
  expect(screen.getByRole('heading', { level: 2, name: cards.title })).toBeDefined();
  expect(screen.getByText(cards.description)).toBeDefined();

  expect(
    screen.getByText(`${messages.Pages.install.flagsReference.items.length} ${cards.metrics.flags}`)
  ).toBeDefined();
  expect(screen.getByText(`${skillCatalog.length} ${cards.metrics.skills}`)).toBeDefined();
  expect(
    screen.getByText(
      `${qualityTools.filter((tool) => tool.status === 'default').length} ${
        cards.metrics.defaultTools
      }`
    )
  ).toBeDefined();
  expect(
    screen.getByText(
      `${qualityTools.filter((tool) => tool.status === 'optional').length} ${
        cards.metrics.optionalTools
      }`
    )
  ).toBeDefined();
  expect(
    screen.getByText(
      `${ecosystemResources.filter((resource) => resource.category === 'foundation').length} ${
        cards.metrics.foundationResources
      }`
    )
  ).toBeDefined();
  expect(
    screen.getByText(
      `${ecosystemResources.filter((resource) => resource.category === 'community').length} ${
        cards.metrics.communityResources
      }`
    )
  ).toBeDefined();

  for (const route of ['install', 'skills', 'quality', 'ecosystem'] as const) {
    expect(screen.getByRole('heading', { level: 3, name: cards[route].title })).toBeDefined();
    expect(screen.getByText(cards[route].description)).toBeDefined();

    const link = screen.getByRole('link', { name: cards.cta[route] });
    expect(link.getAttribute('href')).toBe(`/${locale}/${route}`);
  }

  expect(
    screen.getAllByText(messages.Pages.skills.skills['next-best-practices'].name).length
  ).toBeGreaterThan(0);
  expect(
    screen.getAllByText(messages.Pages.quality.tools['react-doctor'].name).length
  ).toBeGreaterThan(0);
  expect(
    screen.getAllByText(messages.Pages.ecosystem.resources['shadcn-ui'].name).length
  ).toBeGreaterThan(0);
}

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

describe('Home page smoke test', () => {
  it('renders no root content because proxy owns locale redirects', () => {
    expect(Home()).toBeNull();
  });

  it('renders the English adjacent-route summaries', async () => {
    expect.hasAssertions();
    render(<ThemeProvider>{await LocalizedHomePage(createProps('en'))}</ThemeProvider>);

    assertLocalizedHomePage('en');
  });

  it('renders the Spanish adjacent-route summaries', async () => {
    expect.hasAssertions();
    mockPathname = '/es';
    render(<ThemeProvider>{await LocalizedHomePage(createProps('es'))}</ThemeProvider>);

    assertLocalizedHomePage('es');
  });
});
