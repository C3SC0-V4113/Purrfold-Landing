import { getMessages } from '@/i18n/messages';
import { getAlternates } from '@/i18n/routing';

import type { Locale, PhaseOneRoute } from '@/i18n/routing';
import type { Metadata } from 'next';

export async function buildPageMetadata(locale: Locale, route: PhaseOneRoute): Promise<Metadata> {
  const localeMessages = getMessages(locale).Metadata;
  const content =
    route === '/'
      ? localeMessages.home
      : route === '/install'
        ? localeMessages.install
        : route === '/skills'
          ? localeMessages.skills
          : route === '/quality'
            ? localeMessages.quality
            : localeMessages.ecosystem;
  const alternates = getAlternates(locale, route);

  return {
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    description: content.description,
    title: content.title,
  };
}
