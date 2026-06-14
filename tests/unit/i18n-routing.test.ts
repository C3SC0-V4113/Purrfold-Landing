import { describe, expect, it } from 'vitest';

import {
  buildLocalizedPath,
  getAlternates,
  getLocaleSwitchPath,
  locales,
  normalizeUnsupportedLocalePath,
  phaseOneRoutes,
} from '@/i18n/routing';

describe('i18n routing contract', () => {
  it('defines the supported locales and Phase 1 routes', () => {
    expect(locales).toEqual(['en', 'es']);
    expect(phaseOneRoutes).toEqual(['/', '/install', '/skills', '/quality', '/ecosystem']);
  });

  it('builds localized paths for home and deep routes', () => {
    expect(buildLocalizedPath('en', '/')).toBe('/en');
    expect(buildLocalizedPath('es', '/install')).toBe('/es/install');
  });

  it('preserves the current route when switching locales', () => {
    expect(getLocaleSwitchPath('/es/install', 'en')).toBe('/en/install');
    expect(getLocaleSwitchPath('/en', 'es')).toBe('/es');
  });

  it('builds canonical and hreflang alternates from the shared route source', () => {
    expect(getAlternates('en', '/skills')).toEqual({
      canonical: '/en/skills',
      languages: {
        en: '/en/skills',
        es: '/es/skills',
      },
    });

    expect(getAlternates('es', '/')).toEqual({
      canonical: '/es',
      languages: {
        en: '/en',
        es: '/es',
      },
    });
  });

  it('falls back unsupported locale segments to English while preserving the remaining path', () => {
    expect(normalizeUnsupportedLocalePath('/fr/install')).toBe('/en/install');
    expect(normalizeUnsupportedLocalePath('/de')).toBe('/en');
  });
});
