import { ArrowUpRightIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { QualityStatus } from '@/components/quality/quality-catalog';

type QualityToolCardProps = {
  name: string;
  purpose: string;
  whenHelp: string;
  status: QualityStatus;
  flag?: string;
  href: string;
  linkLabel: string;
  statusLabels: { default: string; optional: string };
};

export function QualityToolCard({
  name,
  purpose,
  whenHelp,
  status,
  flag,
  href,
  linkLabel,
  statusLabels,
}: QualityToolCardProps) {
  return (
    <Card className="h-full transition-colors hover:bg-muted/50">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{name}</CardTitle>
          <div className="flex flex-wrap justify-end gap-2">
            <Badge variant={status === 'default' ? 'default' : 'secondary'}>
              {status === 'default' ? statusLabels.default : statusLabels.optional}
            </Badge>
            {flag ? <Badge variant="outline">{flag}</Badge> : null}
          </div>
        </div>
        <CardDescription>{purpose}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">{whenHelp}</p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-xs font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
        >
          <span>{linkLabel}</span>
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </CardContent>
    </Card>
  );
}
