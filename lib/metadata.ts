import { getMessages } from '@/i18n/messages';
import { getAlternates } from '@/i18n/routing';
import { siteName } from '@/lib/site';

import type { Locale, PhaseOneRoute } from '@/i18n/routing';
import type { Metadata } from 'next';

export async function buildPageMetadata(locale: Locale, route: PhaseOneRoute): Promise<Metadata> {
  const localeMessages = getMessages(locale).Metadata;
  const site = localeMessages.site;
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
  const pageTitle = `${content.title} | ${siteName}`;
  const keywords = Array.from(new Set([...site.keywords, ...content.keywords]));

  return {
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    description: content.description,
    keywords,
    openGraph: {
      alternateLocale: locale === 'en' ? ['es_ES'] : ['en_US'],
      description: content.description,
      images: [
        {
          alt: site.ogAlt,
          height: 630,
          url: '/opengraph-image',
          width: 1200,
        },
      ],
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      siteName,
      title: pageTitle,
      type: 'website',
      url: alternates.canonical,
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
        noimageindex: false,
      },
      index: true,
    },
    title: content.title,
    twitter: {
      card: 'summary_large_image',
      description: content.description,
      images: ['/opengraph-image'],
      title: pageTitle,
    },
  };
}
