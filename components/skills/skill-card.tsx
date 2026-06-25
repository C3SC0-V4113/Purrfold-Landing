import { ArrowUpRightIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type SkillSource = 'local' | 'skills-sh' | 'react-doctor';
type SkillCardProps = {
  name: string;
  purpose: string;
  whenHelp: string;
  example: string;
  source: SkillSource;
  href?: string;
  linkLabel: string;
  badges: { local: string; skillsSh: string; reactDoctor: string };
};

export function SkillCard({
  name,
  purpose,
  whenHelp,
  example,
  source,
  href,
  linkLabel,
  badges,
}: SkillCardProps) {
  const isExternal = Boolean(href);

  return (
    <Card className="animate-card-lift h-full hover:bg-muted/50">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{name}</CardTitle>
          <Badge
            variant={
              source === 'local' ? 'default' : source === 'skills-sh' ? 'secondary' : 'outline'
            }
          >
            {source === 'local'
              ? badges.local
              : source === 'skills-sh'
                ? badges.skillsSh
                : badges.reactDoctor}
          </Badge>
        </div>
        <CardDescription>{purpose}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">{whenHelp}</p>
        <p className="text-xs leading-5 text-foreground/80">{example}</p>
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            <span>{linkLabel}</span>
            <ArrowUpRightIcon className="size-3.5" />
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}
