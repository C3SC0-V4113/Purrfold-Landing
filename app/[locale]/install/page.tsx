import { PageShell } from '@/components/page-shell';
import { getMessages } from '@/i18n/messages';
import { resolveLocale } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: PageProps<'/[locale]/install'>): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/install');
}

export default async function InstallPage(props: PageProps<'/[locale]/install'>) {
  const locale = await resolveLocale(props.params);
  const t = getMessages(locale).Pages.install;

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
