import { normalizeUnsupportedLocalePath } from '@/i18n/routing';

const bypassPatterns = [
  /^\/_next\//,
  /^\/api\//,
  /^\/trpc\//,
  /^\/_vercel\//,
  /^\/robots\.txt$/,
  /^\/sitemap\.xml$/,
];

export function shouldBypassProxy(pathname: string): boolean {
  return (
    bypassPatterns.some((pattern) => pattern.test(pathname)) || /\/[^/]+\.[^/]+$/.test(pathname)
  );
}

export function detectPreferredLocale(header: string | null) {
  if (!header) {
    return 'en' as const;
  }

  const rankedLanguages = header
    .split(',')
    .map((part) => {
      const [tag, qualityValue] = part.trim().split(';q=');
      const language = tag.toLowerCase().split('-')[0];
      const quality = qualityValue ? Number.parseFloat(qualityValue) : 1;

      return { language, quality: Number.isNaN(quality) ? 0 : quality };
    })
    .sort((left, right) => right.quality - left.quality);

  for (const { language } of rankedLanguages) {
    if (language === 'es') {
      return 'es' as const;
    }

    if (language === 'en') {
      return 'en' as const;
    }
  }

  return 'en' as const;
}

export function getRootRedirectPath(header: string | null) {
  return `/${detectPreferredLocale(header)}`;
}

export function getUnsupportedLocaleRedirectPath(pathname: string) {
  const normalizedPath = normalizeUnsupportedLocalePath(pathname);
  return normalizedPath === pathname ? null : normalizedPath;
}
