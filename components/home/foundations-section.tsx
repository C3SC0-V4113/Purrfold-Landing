import { ArrowUpRightIcon } from 'lucide-react';

import { generatedLibraries } from '@/components/home/generated-libraries-catalog';
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
  { key: 'astro', href: externalLinks.astro },
  { key: 'vite', href: externalLinks.vite },
  { key: 'reactRouter', href: externalLinks.reactRouter },
  { key: 'tailwind', href: externalLinks.tailwind },
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
      <ul aria-label={t.title} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {foundations.map(({ key, href }) => (
          <li key={key}>
            <a
              href={href}
              aria-label={t[key]}
              {...externalLinkAttributes}
              className="group block rounded-3xl focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
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
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 pt-2">
        <h3 className="text-sm font-semibold text-foreground">{t.libraries.title}</h3>
        <ul
          aria-label={t.libraries.title}
          className="divide-y divide-border rounded-2xl border border-border bg-card px-4"
        >
          {generatedLibraries.map((library) => {
            const { id } = library;
            const href = 'href' in library ? library.href : undefined;
            const item = t.libraries.items[id];

            return (
              <li key={id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:gap-4">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-foreground underline underline-offset-4 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{item.name}</span>
                )}
                <p className="text-sm leading-5 text-muted-foreground">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
