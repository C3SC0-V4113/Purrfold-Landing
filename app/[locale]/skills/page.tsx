import { PageShell } from '@/components/common/page-shell';
import { SkillsList } from '@/components/skills/skills-list';
import { SkillsOverview } from '@/components/skills/skills-overview';
import { getMessages } from '@/i18n/messages';
import { resolveLocale } from '@/lib/locale';
import { type LocalizedPageProps } from '@/lib/localized-page-props';
import { buildPageMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(props: LocalizedPageProps): Promise<Metadata> {
  const locale = await resolveLocale(props.params);
  return buildPageMetadata(locale, '/skills');
}

export default async function SkillsPage(props: LocalizedPageProps) {
  const locale = await resolveLocale(props.params);
  const t = getMessages(locale).Pages.skills;

  return (
    <PageShell description={t.description} routeLabel={t.routeLabel} title={t.title}>
      <SkillsOverview locale={locale} />
      <SkillsList locale={locale} />
    </PageShell>
  );
}
