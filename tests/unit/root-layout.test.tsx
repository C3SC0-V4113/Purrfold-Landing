import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getLocaleMock } = vi.hoisted(() => ({
  getLocaleMock: vi.fn(),
}));

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'font-geist-sans' }),
  Geist_Mono: () => ({ variable: 'font-geist-mono' }),
}));

vi.mock('next-intl/server', () => ({
  getLocale: getLocaleMock,
}));

import RootLayout from '@/app/layout';

describe('RootLayout', () => {
  beforeEach(() => {
    getLocaleMock.mockReset();
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

  it('sets the html lang attribute from the resolved locale', async () => {
    getLocaleMock.mockResolvedValue('es');

    // Note: this test emits a spurious jsdom stderr warning:
    //   "In HTML, <html> cannot be a child of <div>."
    // because the layout component renders <html> as its root element.
    // This is a known jsdom/testing-library limitation when testing layout
    // components directly and does not affect production behavior.
    render(await RootLayout({ children: <div>content</div> }));

    expect(document.documentElement.lang).toBe('es');
    expect(screen.getByText('content')).toBeDefined();
  });
});
