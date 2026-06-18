import Link from 'next/link';

import { BaseNavigation } from '@/components/common/base-navigation';
import { FoundationsSection } from '@/components/home/foundations-section';
import { QuickInstall } from '@/components/home/quick-install';
import { RoadmapSection } from '@/components/home/roadmap-section';
import { SummaryCards } from '@/components/home/summary-cards';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath } from '@/i18n/routing';
import { resolveLocale } from '@/lib/locale';
import { type LocalizedPageProps } from '@/lib/localized-page-props';
import { buildPageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

import type { Metadata } from 'next';

export async function generateMetadata(props: LocalizedPageProps): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/');
}

export default async function LocalizedHomePage(props: LocalizedPageProps) {
  const locale = await resolveLocale(props.params);
  const hero = getMessages(locale).HomePage.hub.hero;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BaseNavigation locale={locale} />
      <main>
        {/* Hero: viewport-height, centered, staggered entrance */}
        <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-8 px-6 text-center sm:px-10">
          {/* 1. Title zone — enters first */}
          <div
            className="flex animate-hero-enter flex-col items-center gap-4"
            style={{ animationDelay: '0ms' }}
          >
            <Badge variant="outline">{hero.eyebrow}</Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {hero.title}
            </h1>
          </div>

          {/* 2. Quick Install — enters second */}
          <div className="w-full max-w-lg animate-hero-enter" style={{ animationDelay: '150ms' }}>
            <QuickInstall locale={locale} />
          </div>

          {/* 3. Description — enters third */}
          <p
            className="max-w-2xl animate-hero-enter text-base leading-7 text-muted-foreground sm:text-lg"
            style={{ animationDelay: '300ms' }}
          >
            {hero.description}
          </p>

          {/* 4. CTA — enters last, prominent */}
          <Link
            className={cn(buttonVariants({ size: 'lg' }), 'animate-hero-enter')}
            href={buildLocalizedPath(locale, '/install')}
            style={{ animationDelay: '400ms' }}
          >
            {hero.cta}
          </Link>
        </section>

        {/* Rest of page content */}
        <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="flex flex-col gap-12">
            <SummaryCards locale={locale} />
            <RoadmapSection locale={locale} />
            <FoundationsSection locale={locale} />
          </div>
        </div>
      </main>
    </div>
  );
}
