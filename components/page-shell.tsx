import Link from 'next/link';

import { BaseNavigation } from '@/components/base-navigation';
import { buildLocalizedPath } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';
import type { ReactNode } from 'react';

type PageShellProps = {
  actions?: ReactNode;
  children?: ReactNode;
  description: string;
  locale: Locale;
  routeLabel?: string;
  title: string;
};

export function PageShell({
  actions,
  children,
  description,
  locale,
  routeLabel,
  title,
}: PageShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-10 sm:px-10">
        <BaseNavigation locale={locale} />
        <section className="flex flex-1 flex-col justify-center gap-6">
          {routeLabel ? (
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {routeLabel}
            </p>
          ) : null}
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          </div>
          {actions}
          {children}
          <div>
            <Link
              className="text-sm font-medium text-foreground underline underline-offset-4"
              href={buildLocalizedPath(locale, '/')}
            >
              {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
