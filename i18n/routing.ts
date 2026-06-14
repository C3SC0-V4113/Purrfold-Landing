import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const phaseOneRoutes = ['/', '/install', '/skills', '/quality', '/ecosystem'] as const;
export type PhaseOneRoute = (typeof phaseOneRoutes)[number];

export const externalLinks = {
  github: 'https://github.com',
  nextjs: 'https://nextjs.org',
  shadcn: 'https://ui.shadcn.com',
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
});

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function buildLocalizedPath(locale: Locale, route: PhaseOneRoute): string {
  return route === '/' ? `/${locale}` : `/${locale}${route}`;
}

export function getLocaleSwitchPath(pathname: string, targetLocale: Locale): string {
  const normalizedPathname = normalizePathname(pathname);
  const segments = normalizedPathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (isLocale(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest.length > 0 ? `/${targetLocale}/${rest}` : `/${targetLocale}`;
  }

  return normalizedPathname === '/' ? `/${targetLocale}` : `/${targetLocale}${normalizedPathname}`;
}

export function getAlternates(locale: Locale, route: PhaseOneRoute) {
  return {
    canonical: buildLocalizedPath(locale, route),
    languages: {
      en: buildLocalizedPath('en', route),
      es: buildLocalizedPath('es', route),
    },
  };
}

export function normalizeUnsupportedLocalePath(pathname: string): string {
  const normalizedPathname = normalizePathname(pathname);
  const segments = normalizedPathname.split('/').filter(Boolean);
  const [firstSegment, ...rest] = segments;

  if (firstSegment && isLocaleLike(firstSegment) && !isLocale(firstSegment)) {
    const restPath = rest.join('/');
    return restPath.length > 0 ? `/${defaultLocale}/${restPath}` : `/${defaultLocale}`;
  }

  return normalizedPathname;
}

export function getPhaseOneRouteFromPathname(pathname: string): PhaseOneRoute {
  const normalizedPathname = normalizePathname(pathname);
  const withoutLocale = normalizedPathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/';

  if (phaseOneRoutes.includes(withoutLocale as PhaseOneRoute)) {
    return withoutLocale as PhaseOneRoute;
  }

  return '/';
}

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.startsWith('/') ? pathname.replace(/\/+$/, '') || '/' : `/${pathname}`;
}

function isLocaleLike(segment: string): boolean {
  return /^[a-z]{2}$/i.test(segment);
}
