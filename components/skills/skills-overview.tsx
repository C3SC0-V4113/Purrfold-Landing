import { ArrowUpRightIcon } from 'lucide-react';

import { CopyButton } from '@/components/common/copy-button';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

const purrfoldCommand = 'npx skills@latest add C3SC0-V4113/Scaffold --skill purrfold';

type SkillsOverviewProps = { locale: Locale };

export function SkillsOverview({ locale }: SkillsOverviewProps) {
  const messages = getMessages(locale).Pages.skills;
  const t = messages.overview;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{t.description}</p>
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/40 p-4">
        <h3 className="text-sm font-semibold text-foreground">{t.purrfoldTitle}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{t.purrfoldDescription}</p>
        <a
          href="https://skills.sh/C3SC0-V4113/Scaffold/purrfold"
          aria-label={`${messages.linkLabel}: ${t.purrfoldTitle}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 self-start text-xs font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
        >
          {messages.linkLabel}
          <ArrowUpRightIcon className="size-3.5" />
        </a>
        <div className="flex min-w-0 items-start gap-1 rounded-md bg-background p-2">
          <code className="min-w-0 flex-1 pt-2 text-xs break-all">{purrfoldCommand}</code>
          <CopyButton
            text={purrfoldCommand}
            label={`${messages.copyLabel}: purrfold`}
            copiedLabel={messages.copiedLabel}
            failedLabel={messages.copyFailedLabel}
          />
        </div>
      </div>
    </section>
  );
}
