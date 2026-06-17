import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { getMessages } from '@/i18n/messages';
import { buildLocalizedPath } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

type HeroSectionProps = {
  locale: Locale;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const t = getMessages(locale).HomePage.hub.hero;

  return (
    <section className="flex animate-shell-enter-up flex-col items-start gap-4">
      <Badge variant="outline">{t.eyebrow}</Badge>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t.title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {t.description}
        </p>
      </div>
      <Link className={buttonVariants()} href={buildLocalizedPath(locale, '/install')}>
        {t.cta}
      </Link>
    </section>
  );
}
