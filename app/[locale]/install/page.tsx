import { PageShell } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMessages } from '@/i18n/messages';
import { resolveLocale } from '@/lib/locale';
import { type LocalizedPageProps } from '@/lib/localized-page-props';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: LocalizedPageProps): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/install');
}

export default async function InstallPage(props: LocalizedPageProps) {
  const locale = await resolveLocale(props.params);
  const t = getMessages(locale).Pages.install;

  return (
    <PageShell
      description={t.description}
      locale={locale}
      routeLabel={t.routeLabel}
      title={t.title}
    >
      <Card size="sm">
        <CardHeader>
          <Badge variant="secondary">{t.cardBadge}</Badge>
          <CardTitle className="text-sm font-medium" role="heading" aria-level={2}>
            {t.cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t.cta}</p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
