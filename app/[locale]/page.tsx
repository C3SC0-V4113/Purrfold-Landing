import Link from 'next/link';

import { PageShell } from '@/components/page-shell';
import { buttonVariants } from '@/components/ui/button';
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
        <>
          <Link className={buttonVariants()} href={buildLocalizedPath(locale, '/install')}>
            {t.primaryCta}
          </Link>
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href={buildLocalizedPath(locale, '/skills')}
          >
            {t.secondaryCta}
          </Link>
        </>
      }
      description={t.description}
      locale={locale}
      routeLabel={t.eyebrow}
      title={t.title}
    />
  );
}
