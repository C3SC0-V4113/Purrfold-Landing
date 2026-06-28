import { brandColors, siteName } from '@/lib/site';

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: brandColors.background,
    description:
      'Agent-first project scaffolding with quality gates, reusable skills, and a shadcn UI foundation.',
    display: 'standalone',
    icons: [
      {
        sizes: '32x32',
        src: '/icon',
        type: 'image/png',
      },
      {
        sizes: '180x180',
        src: '/apple-icon',
        type: 'image/png',
      },
    ],
    name: siteName,
    short_name: siteName,
    start_url: '/en',
    theme_color: brandColors.primary,
  };
}
