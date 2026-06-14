import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, isLocale } from '@/i18n/routing';

const messageLoaders = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  es: () => import('@/messages/es.json').then((module) => module.default),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = requestedLocale && isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return {
    locale,
    messages: await messageLoaders[locale](),
  };
});
