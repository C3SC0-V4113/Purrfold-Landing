import { PageShell } from '@/components/common/page-shell';
import { QualityView } from '@/components/quality/quality-view';
import { getMessages } from '@/i18n/messages';
import { resolveLocale } from '@/lib/locale';
import { type LocalizedPageProps } from '@/lib/localized-page-props';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: LocalizedPageProps): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/quality');
}

export default async function QualityPage(props: LocalizedPageProps) {
  const locale = await resolveLocale(props.params);
  const t = getMessages(locale).Pages.quality;

  return (
    <PageShell description={t.description} routeLabel={t.routeLabel} title={t.title}>
      <QualityView locale={locale} />
    </PageShell>
  );
}
