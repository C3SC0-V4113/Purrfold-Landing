import { ArrowUpRightIcon } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMessages } from '@/i18n/messages';
import { externalLinks } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type FoundationsSectionProps = {
  locale: Locale;
};

const externalLinkAttributes = {
  target: '_blank',
  rel: 'noreferrer noopener',
} as const;

const foundations = [
  { key: 'shadcn', href: externalLinks.shadcn },
  { key: 'nextjs', href: externalLinks.nextjs },
] as const;

export function FoundationsSection({ locale }: FoundationsSectionProps) {
  const t = getMessages(locale).HomePage.hub.foundations;

  return (
    <section
      className="flex animate-shell-enter-up flex-col gap-4"
      style={{ animationDelay: '320ms' }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
        <p className="text-muted-foreground">{t.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {foundations.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            aria-label={t[key]}
            {...externalLinkAttributes}
            className="group rounded-3xl focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
          >
            <Card className="animate-card-lift h-full hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {t[key]}
                  <ArrowUpRightIcon />
                </CardTitle>
                <CardDescription>{href}</CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
