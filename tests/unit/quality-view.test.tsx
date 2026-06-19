import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import QualityPage from '@/app/[locale]/quality/page';
import { ThemeProvider } from '@/components/common/theme-provider';
import { getMessages } from '@/i18n/messages';

import type { LocalizedPageProps } from '@/lib/localized-page-props';

let mockPathname = '/en/quality';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => mockPathname,
}));

function createProps(locale: 'en' | 'es'): LocalizedPageProps {
  return { params: Promise.resolve({ locale }) };
}

function assertQualityPage(locale: 'en' | 'es') {
  const messages = getMessages(locale).Pages.quality;

  expect(screen.getByRole('heading', { level: 1, name: messages.title })).toBeDefined();
  expect(screen.getByText(messages.overview.title)).toBeDefined();
  expect(screen.getByText(messages.overview.description)).toBeDefined();
  expect(screen.getByText(messages.overview.defaultNote)).toBeDefined();

  expect(
    screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)
  ).toEqual([
    messages.overview.title,
    messages.sections.qualityGates.title,
    messages.sections.commitHygiene.title,
    messages.sections.ciConfidence.title,
    messages.sections.runtimeInsight.title,
  ]);

  expect(screen.getAllByText(messages.badges.default)).toHaveLength(6);
  expect(screen.getAllByText(messages.badges.optional)).toHaveLength(3);
  expect(screen.getByText('--unit')).toBeDefined();
  expect(screen.getByText('--commitlint')).toBeDefined();
  expect(screen.getByText('--e2e')).toBeDefined();

  const officialDocs = screen.getAllByRole('link', { name: messages.linkLabel });
  expect(officialDocs).toHaveLength(9);
  expect(officialDocs.map((link) => link.getAttribute('href'))).toEqual([
    'https://github.com/millionco/react-doctor',
    'https://github.com/aidenybai/react-scan',
    'https://eslint.org',
    'https://prettier.io',
    'https://typicode.github.io/husky',
    'https://commitlint.js.org',
    'https://vitest.dev',
    'https://playwright.dev',
    'https://www.typescriptlang.org',
  ]);

  officialDocs.forEach((link) => {
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noreferrer noopener');
  });
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

  mockPathname = '/en/quality';
});

describe('QualityPage', () => {
  it('renders the English quality view', async () => {
    expect.hasAssertions();
    render(<ThemeProvider>{await QualityPage(createProps('en'))}</ThemeProvider>);

    assertQualityPage('en');
  });

  it('renders the Spanish quality view', async () => {
    expect.hasAssertions();
    render(<ThemeProvider>{await QualityPage(createProps('es'))}</ThemeProvider>);

    assertQualityPage('es');
  });
});
