import { externalLinks } from '@/i18n/routing';

export const generatedLibraries = [
  { id: 'shadcn', href: externalLinks.shadcn },
  { id: 'tailwind', href: externalLinks.tailwind },
  { id: 'icons' },
  { id: 'reactRouter', href: externalLinks.reactRouter },
  { id: 'tanstackQuery', href: externalLinks.tanstackQuery },
  { id: 'motion', href: externalLinks.motion },
] as const;

export type GeneratedLibraryId = (typeof generatedLibraries)[number]['id'];
