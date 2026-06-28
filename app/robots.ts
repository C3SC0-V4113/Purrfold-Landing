import { buildAbsoluteSiteUrl, siteUrl } from '@/lib/site';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl.origin,
    rules: {
      allow: '/',
      userAgent: '*',
    },
    sitemap: buildAbsoluteSiteUrl('/sitemap.xml'),
  };
}
