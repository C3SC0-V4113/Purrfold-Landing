import { FoundationsSection } from '@/components/home/foundations-section';
import { QuickInstall } from '@/components/home/quick-install';
import { RoadmapSection } from '@/components/home/roadmap-section';
import { SummaryCards } from '@/components/home/summary-cards';
import { SectionReveal } from '@/components/motion/section-reveal';
import { ShimmerCtaLink } from '@/components/motion/shimmer-cta-link';
import { Badge } from '@/components/ui/badge';
import { DotPattern } from '@/components/ui/dot-pattern';
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
      <section className="relative isolate flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center sm:px-10">
        <DotPattern
          width={22}
          height={22}
          cr={0.6}
          className="[mask-image:radial-gradient(ellipse_at_top,white_10%,transparent_74%)] text-primary/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-b from-transparent via-background/70 to-background"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-8 -z-10 mx-auto h-56 max-w-3xl rounded-full bg-primary/10 blur-3xl"
        />
        <div
          className="flex animate-hero-enter flex-col items-center gap-4"
          style={{ animationDelay: '0ms' }}
        >
          <Badge variant="outline">{hero.eyebrow}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {hero.title}
          </h1>
        </div>

        <div
          className="relative w-full max-w-xl animate-hero-enter rounded-2xl"
          style={{ animationDelay: '150ms' }}
        >
          <ShineBorder
            borderWidth={1}
            duration={22}
            shineColor={['oklch(0.748 0.078 229.6 / 0.28)', 'oklch(0.702 0.077 39.8 / 0.2)']}
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
