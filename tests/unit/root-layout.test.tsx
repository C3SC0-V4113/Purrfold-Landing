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
  });

  it('sets the html lang attribute from the resolved locale', async () => {
    getLocaleMock.mockResolvedValue('es');

    render(await RootLayout({ children: <div>content</div> }));

    expect(document.documentElement.lang).toBe('es');
    expect(screen.getByText('content')).toBeDefined();
  });
});
