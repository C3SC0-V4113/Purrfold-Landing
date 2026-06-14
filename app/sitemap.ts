import { locales, phaseOneRoutes } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';

import type { MetadataRoute } from 'next';

function buildAbsoluteUrl(locale: string, route: string) {
  const pathname = route === '/' ? `/${locale}` : `/${locale}${route}`;
  return new URL(pathname, siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    phaseOneRoutes.map((route) => ({
      alternates: {
        languages: {
          en: buildAbsoluteUrl('en', route),
          es: buildAbsoluteUrl('es', route),
        },
      },
      url: buildAbsoluteUrl(locale, route),
    }))
  );
}
