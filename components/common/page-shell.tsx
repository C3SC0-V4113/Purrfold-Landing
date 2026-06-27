import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import type { ReactNode } from 'react';

type PageShellProps = {
  actions?: ReactNode;
  children?: ReactNode;
  description: string;
  routeLabel?: string;
  title: string;
};

export function PageShell({ actions, children, description, routeLabel, title }: PageShellProps) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
      <div className="flex flex-col gap-10">
        <Card size="sm">
          <CardHeader className="gap-4">
            {routeLabel ? <Badge variant="outline">{routeLabel}</Badge> : null}
            <div className="flex flex-col gap-2">
              <CardTitle>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 sm:text-lg">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          {actions || children ? (
            <>
              <Separator />
              <CardContent className="flex flex-col gap-4 pt-5">
                {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
                {children ? (
                  <div className="text-sm leading-6 text-muted-foreground">{children}</div>
                ) : null}
              </CardContent>
            </>
          ) : null}
        </Card>
      </div>
    </main>
  );
}
