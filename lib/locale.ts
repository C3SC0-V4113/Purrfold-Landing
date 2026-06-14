import { notFound } from 'next/navigation';

import { isLocale } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}
