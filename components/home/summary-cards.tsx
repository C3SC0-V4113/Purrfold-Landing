import Link from 'next/link';

import { ecosystemResources } from '@/components/ecosystem/ecosystem-catalog';
import { PremiumCard } from '@/components/motion/premium-card';
import { qualityTools } from '@/components/quality/quality-catalog';
import { skillCatalog } from '@/components/skills/skills-catalog';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath } from '@/i18n/routing';

import type { Locale, PhaseOneRoute } from '@/i18n/routing';

type SummarySectionProps = {
  locale: Locale;
};

type SummaryRoute = 'install' | 'skills' | 'quality' | 'ecosystem';

type SummaryCard = {
  badges: string[];
  highlights: string[];
};

const routeOrder: SummaryRoute[] = ['install', 'skills', 'quality', 'ecosystem'];
const routePaths: Record<SummaryRoute, PhaseOneRoute> = {
  install: '/install',
  skills: '/skills',
  quality: '/quality',
  ecosystem: '/ecosystem',
};

const featuredSkillIds = ['next-best-practices', 'shadcn', 'project-min-evaluation'] as const;
const featuredQualityToolIds = ['react-doctor', 'eslint', 'vitest'] as const;
const featuredEcosystemResourceIds = ['shadcn-ui', 'magic-ui', 'remocn'] as const;

export function SummaryCards({ locale }: SummarySectionProps) {
  const messages = getMessages(locale);
  const t = messages.HomePage.hub.cards;
  const pages = messages.Pages;

  const defaultQualityTools = qualityTools.filter((tool) => tool.status === 'default');
  const optionalQualityTools = qualityTools.filter((tool) => tool.status === 'optional');
  const foundationResources = ecosystemResources.filter(
    (resource) => resource.category === 'foundation'
  );
  const communityResources = ecosystemResources.filter(
    (resource) => resource.category === 'community'
  );

  const cards: Record<SummaryRoute, SummaryCard> = {
    install: {
      badges: [`${pages.install.flagsReference.items.length} ${t.metrics.flags}`],
      highlights: pages.install.flagsReference.items.slice(0, 3).map((item) => item.flag),
    },
    skills: {
      badges: [`${skillCatalog.length} ${t.metrics.skills}`],
      highlights: featuredSkillIds.map((id) => pages.skills.skills[id].name),
    },
    quality: {
      badges: [
        `${defaultQualityTools.length} ${t.metrics.defaultTools}`,
        `${optionalQualityTools.length} ${t.metrics.optionalTools}`,
      ],
      highlights: featuredQualityToolIds.map((id) => pages.quality.tools[id].name),
    },
    ecosystem: {
      badges: [
        `${foundationResources.length} ${t.metrics.foundationResources}`,
        `${communityResources.length} ${t.metrics.communityResources}`,
      ],
      highlights: featuredEcosystemResourceIds.map((id) => pages.ecosystem.resources[id].name),
    },
  };

  return (
    <section
      className="flex animate-shell-enter-up flex-col gap-6"
      style={{ animationDelay: '160ms' }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {routeOrder.map((route) => {
          const summary = cards[route];
          const copy = t[route];

          return (
            <PremiumCard key={route} role="article" className="animate-card-lift hover:bg-muted/50">
              <CardHeader className="gap-3">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {summary.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <CardTitle role="heading" aria-level={3}>
                      {copy.title}
                    </CardTitle>
                    <CardDescription>{copy.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="text-xs font-medium text-foreground">{t.highlights}</p>
                <ul className="flex flex-col gap-2">
                  {summary.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm leading-5 text-muted-foreground">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  href={buildLocalizedPath(locale, routePaths[route])}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  {t.cta[route]}
                </Link>
              </CardFooter>
            </PremiumCard>
          );
        })}
      </div>
    </section>
  );
}
