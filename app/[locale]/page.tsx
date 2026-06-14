import Link from 'next/link';

import { PageShell } from '@/components/page-shell';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath } from '@/i18n/routing';
import { resolveLocale } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/');
}

export default async function LocalizedHomePage(props: PageProps<'/[locale]'>) {
  const locale = await resolveLocale(props.params);
  const t = getMessages(locale).HomePage;

  return (
    <PageShell
      actions={
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
            href={buildLocalizedPath(locale, '/install')}
          >
            {t.primaryCta}
          </Link>
          <Link
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground"
            href={buildLocalizedPath(locale, '/skills')}
          >
            {t.secondaryCta}
          </Link>
        </div>
      }
      description={t.description}
      locale={locale}
      routeLabel={t.eyebrow}
      title={t.title}
    />
  );
}
