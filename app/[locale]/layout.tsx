import { locales } from '@/i18n/routing';
import { resolveLocale } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/');
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  await resolveLocale(params);

  return children;
}
