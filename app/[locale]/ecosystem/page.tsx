import { PageShell } from '@/components/common/page-shell';
import { EcosystemView } from '@/components/ecosystem/ecosystem-view';
import { getMessages } from '@/i18n/messages';
import { resolveLocale } from '@/lib/locale';
import { type LocalizedPageProps } from '@/lib/localized-page-props';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: LocalizedPageProps): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/ecosystem');
}

export default async function EcosystemPage(props: LocalizedPageProps) {
  const locale = await resolveLocale(props.params);
  const t = getMessages(locale).Pages.ecosystem;

  return (
    <PageShell description={t.description} routeLabel={t.routeLabel} title={t.title}>
      <EcosystemView locale={locale} />
    </PageShell>
  );
}
