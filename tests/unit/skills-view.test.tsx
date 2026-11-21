import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
  expect(screen.getByText(messages.overview.purrfoldDescription)).toBeDefined();
  expect(screen.getByRole('button', { name: `${messages.copyLabel}: purrfold` })).toBeDefined();

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

  const links = screen.getAllByRole('link', { name: new RegExp(`^${messages.linkLabel}: `) });
  expect(links).toHaveLength(23);
  expect(new Set(links.map((link) => link.getAttribute('aria-label'))).size).toBe(23);
  expect(screen.getAllByText(messages.badges.purrfold)).toHaveLength(4);
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

afterEach(() => {
  vi.unstubAllGlobals();
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

  it.each(['en', 'es'] as const)('copies the displayed commands (%s)', async (locale) => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const messages = getMessages(locale).Pages.skills;
    render(<ThemeProvider>{await SkillsPage(createProps(locale))}</ThemeProvider>);

    const regular = 'npx skills add wshobson/agents --skill architecture-decision-records';
    const highlighted = 'npx skills@latest add C3SC0-V4113/Scaffold --skill purrfold';
    expect(screen.getByText(regular)).toBeDefined();
    expect(screen.getByText(highlighted)).toBeDefined();
    fireEvent.click(
      screen.getByRole('button', {
        name: `${messages.copyLabel}: ${messages.skills['architecture-decision-records'].name}`,
      })
    );
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(regular));
    fireEvent.click(screen.getByRole('button', { name: `${messages.copyLabel}: purrfold` }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(highlighted));
  });
});
