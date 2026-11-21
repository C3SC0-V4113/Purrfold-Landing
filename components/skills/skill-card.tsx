import { ArrowUpRightIcon } from 'lucide-react';

import { CopyButton } from '@/components/common/copy-button';
import { PremiumCard } from '@/components/motion/premium-card';
import {
  SkillSourceBadge,
  type SkillSource,
  type SkillSourceLabels,
} from '@/components/skills/skill-source-badge';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type SkillCardProps = {
  name: string;
  purpose: string;
  whenHelp: string;
  example: string;
  source: SkillSource;
  href: string;
  command: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
  linkLabel: string;
  badges: SkillSourceLabels;
};

export function SkillCard({
  name,
  purpose,
  whenHelp,
  example,
  source,
  href,
  command,
  copyLabel,
  copiedLabel,
  copyFailedLabel,
  linkLabel,
  badges,
}: SkillCardProps) {
  return (
    <PremiumCard className="animate-card-lift hover:bg-muted/50">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{name}</CardTitle>
          <SkillSourceBadge source={source} labels={badges} />
        </div>
        <CardDescription>{purpose}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">{whenHelp}</p>
        <p className="text-xs leading-5 text-foreground/80">{example}</p>
        <a
          href={href}
          aria-label={`${linkLabel}: ${name}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-xs font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
        >
          <span>{linkLabel}</span>
          <ArrowUpRightIcon className="size-3.5" />
        </a>
        <div className="flex min-w-0 items-start gap-1 rounded-md bg-muted/55 p-2">
          <code className="min-w-0 flex-1 pt-2 text-xs break-all">{command}</code>
          <CopyButton
            text={command}
            label={copyLabel}
            copiedLabel={copiedLabel}
            failedLabel={copyFailedLabel}
          />
        </div>
      </CardContent>
    </PremiumCard>
  );
}
