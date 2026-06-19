import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type SkillsOverviewProps = { locale: Locale };

export function SkillsOverview({ locale }: SkillsOverviewProps) {
  const t = getMessages(locale).Pages.skills.overview;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground">{t.title}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{t.description}</p>
    </section>
  );
}
