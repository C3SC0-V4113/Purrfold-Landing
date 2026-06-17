import { BaseNavigation } from '@/components/base-navigation';
import { FoundationsSection } from '@/components/foundations-section';
import { HeroSection } from '@/components/hero-section';
import { QuickInstall } from '@/components/quick-install';
import { RoadmapSection } from '@/components/roadmap-section';
import { SummaryCards } from '@/components/summary-cards';
import { resolveLocale } from '@/lib/locale';
import { type LocalizedPageProps } from '@/lib/localized-page-props';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: LocalizedPageProps): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/');
}

export default async function LocalizedHomePage(props: LocalizedPageProps) {
  const locale = await resolveLocale(props.params);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BaseNavigation locale={locale} />
      <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-12">
          <HeroSection locale={locale} />
          <QuickInstall locale={locale} />
          <SummaryCards locale={locale} />
          <RoadmapSection locale={locale} />
          <FoundationsSection locale={locale} />
        </div>
      </main>
    </div>
  );
}
