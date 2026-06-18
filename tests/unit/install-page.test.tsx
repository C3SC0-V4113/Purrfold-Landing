import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import InstallPage from '@/app/[locale]/install/page';
import { ThemeProvider } from '@/components/common/theme-provider';

import type { LocalizedPageProps } from '@/lib/localized-page-props';

let mockPathname = '/en/install';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => mockPathname,
}));

function createProps(locale: 'en' | 'es'): LocalizedPageProps {
  return {
    params: Promise.resolve({ locale }),
  };
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
  mockPathname = '/en/install';
});

describe('InstallPage', () => {
  it('renders the English install view with configurator, flags reference, and preset example', async () => {
    render(<ThemeProvider>{await InstallPage(createProps('en'))}</ThemeProvider>);

    expect(screen.getByRole('heading', { level: 1, name: 'Install Purrfold' })).toBeDefined();
    expect(screen.getByText('Configure your install')).toBeDefined();
    expect(screen.getByText('All available flags')).toBeDefined();
    expect(screen.getByText('Using a shadcn preset')).toBeDefined();
    expect(
      screen.getByText(
        'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
      )
    ).toBeDefined();
  });

  it('renders the Spanish install view with localized sections', async () => {
    render(<ThemeProvider>{await InstallPage(createProps('es'))}</ThemeProvider>);

    expect(screen.getByRole('heading', { level: 1, name: 'Instalar Purrfold' })).toBeDefined();
    expect(screen.getByText('Configura tu instalación')).toBeDefined();
    expect(screen.getByText('Todos los flags disponibles')).toBeDefined();
    expect(screen.getByText('Usar un preset de shadcn')).toBeDefined();
  });
});
