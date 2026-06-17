import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type SummarySectionProps = {
  locale: Locale;
};

const routes = ['install', 'skills', 'quality', 'ecosystem'] as const;

function ctaLabel(route: string, locale: Locale) {
  if (locale === 'es') {
    const labels: Record<string, string> = {
      install: 'Guía de instalación',
      skills: 'Ver skills',
      quality: 'Pipeline de calidad',
      ecosystem: 'Explorar ecosistema',
    };
    return labels[route] ?? 'Ver más';
  }

  const labels: Record<string, string> = {
    install: 'Install guide',
    skills: 'View skills',
    quality: 'Quality pipeline',
    ecosystem: 'Explore ecosystem',
  };
  return labels[route] ?? 'Learn more';
}

export function SummaryCards({ locale }: SummarySectionProps) {
  const t = getMessages(locale).HomePage.hub.cards;

  return (
    <section
      className="flex animate-shell-enter-up flex-col gap-8"
      style={{ animationDelay: '160ms' }}
    >
      <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
      <div className="flex flex-col gap-8">
        {routes.map((route, index) => {
          const card = t[route];
          return (
            <article key={route}>
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-medium text-foreground">{card.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{card.description}</p>
                <div>
                  <Link
                    href={buildLocalizedPath(locale, `/${route}`)}
                    className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
                  >
                    {ctaLabel(route, locale)} &rarr;
                  </Link>
                </div>
              </div>
              {index < routes.length - 1 ? <Separator className="mt-8" /> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
