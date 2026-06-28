import { describe, expect, it } from 'vitest';

import { detectPreferredLocale, getRootRedirectPath, shouldBypassProxy } from '@/i18n/proxy';

describe('proxy locale negotiation', () => {
  it('chooses Spanish when it is the highest supported language', () => {
    expect(detectPreferredLocale('es-ES,es;q=0.9,en;q=0.8')).toBe('es');
    expect(getRootRedirectPath('es-MX,es;q=0.7')).toBe('/es');
  });

  it('defaults to English for English or unsupported preferences', () => {
    expect(detectPreferredLocale('en-US,en;q=0.9,es;q=0.5')).toBe('en');
    expect(detectPreferredLocale('fr-FR,fr;q=0.9')).toBe('en');
    expect(getRootRedirectPath(null)).toBe('/en');
  });

  it('bypasses Next.js internals and metadata assets but not localized pages', () => {
    expect(shouldBypassProxy('/_next/static/chunks/main.js')).toBe(true);
    expect(shouldBypassProxy('/apple-icon')).toBe(true);
    expect(shouldBypassProxy('/icon')).toBe(true);
    expect(shouldBypassProxy('/manifest.webmanifest')).toBe(true);
    expect(shouldBypassProxy('/opengraph-image')).toBe(true);
    expect(shouldBypassProxy('/sitemap.xml')).toBe(true);
    expect(shouldBypassProxy('/robots.txt')).toBe(true);
    expect(shouldBypassProxy('/es/install')).toBe(false);
  });
});
