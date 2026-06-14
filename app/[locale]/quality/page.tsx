import { PageShell } from '@/components/page-shell';
import { getMessages } from '@/i18n/messages';
import { resolveLocale } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: PageProps<'/[locale]/quality'>): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/quality');
}

export default async function QualityPage(props: PageProps<'/[locale]/quality'>) {
  const locale = await resolveLocale(props.params);
  const t = getMessages(locale).Pages.quality;

  return (
    <PageShell
      description={t.description}
      locale={locale}
      routeLabel={t.routeLabel}
      title={t.title}
    >
      {t.cta}
    </PageShell>
  );
}
