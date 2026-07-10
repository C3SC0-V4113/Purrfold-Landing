import { SectionReveal } from '@/components/motion/section-reveal';
import { SkillCard } from '@/components/skills/skill-card';
import { type SkillSourceLabels } from '@/components/skills/skill-source-badge';
import { nextjsWorkflowSkillCatalog, skillCatalog } from '@/components/skills/skills-catalog';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type SkillsListProps = { locale: Locale };

export function SkillsList({ locale }: SkillsListProps) {
  const t = getMessages(locale).Pages.skills;
  const badgeLabels: SkillSourceLabels = {
    local: t.badges.local,
    skillsSh: t.badges.skillsSh,
    reactDoctor: t.badges.reactDoctor,
    nextjs: t.badges.nextjs,
    astro: t.badges.astro,
  };
  const categories = [
    { key: 'architecture' as const, title: t.categories.architecture.title },
    { key: 'framework' as const, title: t.categories.framework.title },
    { key: 'quality' as const, title: t.categories.quality.title },
    { key: 'typescript' as const, title: t.categories.typescript.title },
  ];

  return (
    <div className="flex flex-col gap-6">
      {categories.map((category, index) => {
        const skills = skillCatalog.filter((skill) => skill.category === category.key);

        if (skills.length === 0) return null;

        return (
          <SectionReveal key={category.key} delay={index * 0.03}>
            <section className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-foreground">{category.title}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {skills.map((skill) => {
                  const msg = t.skills[skill.id as keyof typeof t.skills];

                  if (!msg) return null;

                  return (
                    <SkillCard
                      key={skill.id}
                      name={msg.name}
                      purpose={msg.purpose}
                      whenHelp={msg.whenHelp}
                      example={msg.example}
                      source={skill.source}
                      href={skill.href}
                      linkLabel={t.linkLabel}
                      badges={badgeLabels}
                    />
                  );
                })}
              </div>
            </section>
          </SectionReveal>
        );
      })}
      <SectionReveal delay={categories.length * 0.03}>
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-foreground">{t.workflow.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t.workflow.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {nextjsWorkflowSkillCatalog.map((skill) => {
              const msg = t.workflow.skills[skill.id as keyof typeof t.workflow.skills];

              return (
                <SkillCard
                  key={skill.id}
                  name={msg.name}
                  purpose={msg.purpose}
                  whenHelp={msg.whenHelp}
                  example={msg.example}
                  source={skill.source}
                  href={skill.href}
                  linkLabel={t.linkLabel}
                  badges={badgeLabels}
                />
              );
            })}
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
