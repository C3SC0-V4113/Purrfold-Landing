import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type SummaryCardsProps = {
  locale: Locale;
};

const routes = ['install', 'skills', 'quality', 'ecosystem'] as const;

export function SummaryCards({ locale }: SummaryCardsProps) {
  const t = getMessages(locale).HomePage.hub.cards;

  return (
    <section
      className="flex animate-shell-enter-up flex-col gap-4"
      style={{ animationDelay: '160ms' }}
    >
      <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {routes.map((route) => {
          const card = t[route];
          return (
            <Link
              key={route}
              href={buildLocalizedPath(locale, `/${route}` as const)}
              className="group focus-visible:outline-none"
            >
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
