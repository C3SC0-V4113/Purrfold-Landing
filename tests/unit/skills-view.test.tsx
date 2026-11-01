import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SkillsPage from '@/app/[locale]/skills/page';
import { ThemeProvider } from '@/components/common/theme-provider';
import { getMessages } from '@/i18n/messages';

import type { LocalizedPageProps } from '@/lib/localized-page-props';

let mockPathname = '/en/skills';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => mockPathname,
}));

function createProps(locale: 'en' | 'es'): LocalizedPageProps {
  return {
    params: Promise.resolve({ locale }),
  };
}

function assertSkillsPage(locale: 'en' | 'es') {
  const messages = getMessages(locale).Pages.skills;

  expect(screen.getByRole('heading', { level: 1, name: messages.title })).toBeDefined();
  expect(screen.getByText(messages.overview.title)).toBeDefined();
  expect(screen.getByText(messages.overview.description)).toBeDefined();

  expect(screen.getByText(messages.categories.architecture.title)).toBeDefined();
  expect(screen.getByText(messages.categories.framework.title)).toBeDefined();
  expect(screen.getByText(messages.categories.quality.title)).toBeDefined();
  expect(screen.getByText(messages.categories.typescript.title)).toBeDefined();

  for (const skill of Object.values(messages.skills)) {
    expect(screen.getAllByText(skill.name).length).toBeGreaterThan(0);
    expect(screen.getByText(skill.example)).toBeDefined();
  }

  expect(screen.getByText(messages.workflow.title)).toBeDefined();
  expect(screen.getByText(messages.workflow.description)).toBeDefined();

  for (const skill of Object.values(messages.workflow.skills)) {
    expect(screen.getAllByText(skill.name).length).toBeGreaterThan(0);
    expect(screen.getByText(skill.example)).toBeDefined();
  }

  expect(screen.getByText(messages.astro.title)).toBeDefined();
  expect(screen.getByText(messages.astro.description)).toBeDefined();

  for (const skill of Object.values(messages.astro.skills)) {
    expect(screen.getAllByText(skill.name).length).toBeGreaterThan(0);
    expect(screen.getByText(skill.example)).toBeDefined();
  }

  expect(screen.getByText(messages.reactRouter.title)).toBeDefined();
  expect(screen.getByText(messages.reactRouter.description)).toBeDefined();
  expect(screen.getByText(messages.skills['tanstack-query'].example)).toBeDefined();

  expect(screen.getAllByRole('link', { name: messages.linkLabel })).toHaveLength(17);
  expect(screen.getAllByText(messages.badges.local)).toHaveLength(4);
  expect(screen.getAllByText(messages.badges.skillsSh)).toHaveLength(10);
  expect(screen.getAllByText(messages.badges.reactDoctor)).toHaveLength(2);
  expect(screen.getAllByText(messages.badges.nextjs)).toHaveLength(3);
  expect(screen.getAllByText(messages.badges.astro)).toHaveLength(1);
  expect(screen.getAllByText(messages.badges.motion)).toHaveLength(1);
  expect(screen.getAllByText(messages.badges.query)).toHaveLength(1);
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

  mockPathname = '/en/skills';
});

describe('SkillsPage', () => {
  it('renders the English skills view', async () => {
    const messages = getMessages('en').Pages.skills;

    render(<ThemeProvider>{await SkillsPage(createProps('en'))}</ThemeProvider>);

    expect(screen.getByRole('heading', { level: 1, name: messages.title })).toBeDefined();

    assertSkillsPage('en');
  });

  it('renders the Spanish skills view', async () => {
    const messages = getMessages('es').Pages.skills;

    render(<ThemeProvider>{await SkillsPage(createProps('es'))}</ThemeProvider>);

    expect(screen.getByRole('heading', { level: 1, name: messages.title })).toBeDefined();

    assertSkillsPage('es');
  });
});
