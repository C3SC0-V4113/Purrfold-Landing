import { DottedBackground } from '@/components/common/dotted-background';
import { FoundationsSection } from '@/components/home/foundations-section';
import { QuickInstall } from '@/components/home/quick-install';
import { RoadmapSection } from '@/components/home/roadmap-section';
import { SummaryCards } from '@/components/home/summary-cards';
import { HeroCatBurst } from '@/components/motion/hero-cat-burst';
import { SectionReveal } from '@/components/motion/section-reveal';
import { ShimmerCtaLink } from '@/components/motion/shimmer-cta-link';
import { Badge } from '@/components/ui/badge';
import { ShineBorder } from '@/components/ui/shine-border';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath } from '@/i18n/routing';
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
  const hero = getMessages(locale).HomePage.hub.hero;

  return (
    <main>
      <section className="relative isolate flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center sm:px-10 md:min-h-[calc(100vh-3.5rem)]">
        <DottedBackground className="h-[34rem]" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-8 -z-10 mx-auto h-56 max-w-3xl rounded-full bg-primary/10 blur-3xl"
        />
        <div
          className="flex animate-hero-enter flex-col items-center gap-4"
          style={{ animationDelay: '0ms' }}
        >
          <Badge variant="outline">{hero.eyebrow}</Badge>
          <div className="relative inline-flex justify-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {hero.title}
            </h1>
            <HeroCatBurst />
          </div>
        </div>

        <div
          className="relative w-full max-w-xl animate-hero-enter rounded-2xl"
          style={{ animationDelay: '150ms' }}
        >
          <ShineBorder
            borderWidth={1}
            duration={22}
            shineColor={['var(--color-shine-border-from)', 'var(--color-shine-border-to)']}
          />
          <div className="rounded-2xl border border-border/70 bg-card/70 p-4 text-left shadow-sm backdrop-blur">
            <QuickInstall locale={locale} />
          </div>
        </div>

        <p
          className="max-w-2xl animate-hero-enter text-base leading-7 text-muted-foreground sm:text-lg"
          style={{ animationDelay: '300ms' }}
        >
          {hero.description}
        </p>

        <ShimmerCtaLink
          className="animate-hero-enter"
          href={buildLocalizedPath(locale, '/install')}
          style={{ animationDelay: '400ms' }}
        >
          {hero.cta}
        </ShimmerCtaLink>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-12">
          <SectionReveal>
            <SummaryCards locale={locale} />
          </SectionReveal>
          <SectionReveal delay={0.04}>
            <RoadmapSection locale={locale} />
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <FoundationsSection locale={locale} />
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
