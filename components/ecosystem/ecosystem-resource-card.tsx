import { ArrowUpRightIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type { EcosystemCategoryId } from '@/components/ecosystem/ecosystem-catalog';

type EcosystemResourceCardProps = {
  name: string;
  summary: string;
  usage: string;
  category: EcosystemCategoryId;
  categoryLabel: string;
  href: string;
  linkLabel: string;
  linkAriaLabel: string;
};

const categoryBadgeVariants = {
  foundation: 'default',
  community: 'secondary',
} as const;

export function EcosystemResourceCard({
  name,
  summary,
  usage,
  category,
  categoryLabel,
  href,
  linkLabel,
  linkAriaLabel,
}: EcosystemResourceCardProps) {
  return (
    <Card className="animate-card-lift h-full hover:bg-muted/50">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle role="heading" aria-level={3}>
            {name}
          </CardTitle>
          <Badge variant={categoryBadgeVariants[category]}>{categoryLabel}</Badge>
        </div>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{usage}</p>
      </CardContent>
      <CardFooter>
        <a
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={linkAriaLabel}
        >
          {linkLabel}
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
      </CardFooter>
    </Card>
  );
}
