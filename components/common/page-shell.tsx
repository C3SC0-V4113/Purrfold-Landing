import { Children, isValidElement } from 'react';

import { DottedBackground } from '@/components/common/dotted-background';
import { SectionReveal } from '@/components/motion/section-reveal';
import { Badge } from '@/components/ui/badge';

import type { ReactNode } from 'react';

type PageShellProps = {
  actions?: ReactNode;
  children?: ReactNode;
  description: string;
  routeLabel?: string;
  title: string;
};

function getSectionKey(section: ReactNode, fallbackIndex: number) {
  if (isValidElement(section) && section.key !== null) return section.key;

  return `page-section-${fallbackIndex}`;
}

export function PageShell({ actions, children, description, routeLabel, title }: PageShellProps) {
  const sections = Children.toArray(children);

  return (
    <main className="relative isolate overflow-hidden">
      <DottedBackground />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12 sm:px-10 sm:py-16">
        <SectionReveal>
          <header className="flex flex-col gap-4">
            {routeLabel ? (
              <Badge variant="outline" className="w-fit">
                {routeLabel}
              </Badge>
            ) : null}
            <div className="flex max-w-3xl flex-col gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </header>
        </SectionReveal>

        {sections.length > 0 ? (
          <div className="flex flex-col gap-8 text-sm leading-6 text-muted-foreground">
            {sections.map((section, index) => (
              <SectionReveal key={getSectionKey(section, index)} delay={0.04 + index * 0.03}>
                {section}
              </SectionReveal>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
