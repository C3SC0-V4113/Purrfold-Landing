import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import EcosystemPage from '@/app/[locale]/ecosystem/page';
import { ThemeProvider } from '@/components/common/theme-provider';
import { ecosystemCategories, ecosystemResources } from '@/components/ecosystem/ecosystem-catalog';
import { getMessages } from '@/i18n/messages';

import type { LocalizedPageProps } from '@/lib/localized-page-props';

let mockPathname = '/en/ecosystem';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => mockPathname,
}));

function createProps(locale: 'en' | 'es'): LocalizedPageProps {
  return { params: Promise.resolve({ locale }) };
}

function assertEcosystemPage(locale: 'en' | 'es') {
  const messages = getMessages(locale).Pages.ecosystem;

  expect(screen.getByRole('heading', { level: 1, name: messages.title })).toBeDefined();
  expect(screen.getByText(messages.overview.description)).toBeDefined();
  expect(ecosystemCategories.map((category) => category.id)).toEqual(['foundation', 'community']);
  expect(ecosystemResources.filter((resource) => resource.category === 'foundation')).toHaveLength(
    1
  );
  expect(ecosystemResources.filter((resource) => resource.category === 'community')).toHaveLength(
    4
  );

  for (const category of ecosystemCategories) {
    const categoryCopy = messages.categories[category.id];
    expect(screen.getByRole('heading', { level: 2, name: categoryCopy.title })).toBeDefined();
    expect(screen.getByText(categoryCopy.description)).toBeDefined();

    const expectedCount = ecosystemResources.filter(
      (resource) => resource.category === category.id
    ).length;
    expect(screen.getAllByText(categoryCopy.badge, { selector: 'span' })).toHaveLength(
      expectedCount
    );
  }

  for (const resource of ecosystemResources) {
    const resourceCopy = messages.resources[resource.id];
    expect(screen.getByRole('heading', { level: 3, name: resourceCopy.name })).toBeDefined();
    expect(screen.getByText(resourceCopy.summary)).toBeDefined();
    expect(screen.getByText(resourceCopy.usage)).toBeDefined();
  }

  for (const resource of ecosystemResources) {
    const resourceCopy = messages.resources[resource.id];
    const link = screen.getByRole('link', {
      name: `${messages.linkLabel}: ${resourceCopy.name}`,
    });
    expect(link.getAttribute('href')).toBe(resource.href);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noreferrer noopener');
  }
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

  mockPathname = '/en/ecosystem';
});

describe('EcosystemPage', () => {
  it('renders the English foundation and community resources', async () => {
    expect.hasAssertions();
    render(<ThemeProvider>{await EcosystemPage(createProps('en'))}</ThemeProvider>);

    assertEcosystemPage('en');
  });

  it('renders the Spanish foundation and community resources', async () => {
    expect.hasAssertions();
    mockPathname = '/es/ecosystem';
    render(<ThemeProvider>{await EcosystemPage(createProps('es'))}</ThemeProvider>);

    assertEcosystemPage('es');
  });
});
