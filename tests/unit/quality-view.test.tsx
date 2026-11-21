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

  expect(screen.getAllByText(messages.badges.default)).toHaveLength(9);
  expect(screen.getAllByText(messages.badges.optional)).toHaveLength(4);
  expect(screen.getByText('--unit')).toBeDefined();
  expect(screen.getByText('--commitlint')).toBeDefined();
  expect(screen.getByText('--e2e')).toBeDefined();
  expect(screen.getByText('--ci')).toBeDefined();

  const officialDocs = screen.getAllByRole('link');
  expect(officialDocs).toHaveLength(13);
  const toolIds = Object.keys(messages.tools) as Array<keyof typeof messages.tools>;
  for (const toolId of toolIds) {
    const tool = messages.tools[toolId];
    const toolLink = screen.getByRole('link', { name: `${messages.linkLabel}: ${tool.name}` });
    expect(toolLink.getAttribute('href')).toBe(
      (
        {
          'react-doctor': 'https://www.react.doctor/',
          'react-scan': 'https://react-scan.com/',
          'shadcn-lint': 'https://ui.shadcn.com',
          'claude-hooks': 'https://docs.anthropic.com/en/docs/claude-code/hooks',
          eslint: 'https://eslint.org',
          prettier: 'https://prettier.io',
          husky: 'https://typicode.github.io/husky',
          'lint-staged': 'https://github.com/lint-staged/lint-staged',
          commitlint: 'https://commitlint.js.org',
          vitest: 'https://vitest.dev',
          playwright: 'https://playwright.dev',
          'github-actions': 'https://docs.github.com/actions',
          typescript: 'https://www.typescriptlang.org',
        } as const
      )[toolId]
    );
  }

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
