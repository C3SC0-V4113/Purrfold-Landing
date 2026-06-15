import Link from 'next/link';

import { PageShell } from '@/components/page-shell';
import { buttonVariants } from '@/components/ui/button';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath, externalLinks } from '@/i18n/routing';
import { resolveLocale } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

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
    >
      <section aria-labelledby="home-foundations-title" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="home-foundations-title" className="text-sm font-semibold text-foreground">
            {t.foundations.title}
          </h2>
          <p>{t.foundations.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={externalLinks.shadcn}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: 'outline' }), 'w-fit')}
          >
            {t.foundations.shadcn}
          </a>
          <a
            href={externalLinks.nextjs}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: 'outline' }), 'w-fit')}
          >
            {t.foundations.nextjs}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
