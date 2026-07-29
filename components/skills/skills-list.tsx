import { SectionReveal } from '@/components/motion/section-reveal';
import { SkillCard } from '@/components/skills/skill-card';
import { type SkillSource, type SkillSourceLabels } from '@/components/skills/skill-source-badge';
import {
  astroSkillCatalog,
  nextjsWorkflowSkillCatalog,
  skillCatalog,
} from '@/components/skills/skills-catalog';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type SkillsListProps = { locale: Locale };

type PackSkill = {
  id: string;
  name: string;
  purpose: string;
  whenHelp: string;
  example: string;
  source: SkillSource;
  href?: string;
};

type SkillPackSectionProps = {
  title: string;
  description: string;
  skills: PackSkill[];
  linkLabel: string;
  badges: SkillSourceLabels;
  delay: number;
};

// A titled section for a framework-exclusive skill pack (Next.js workflow, Astro).
function SkillPackSection({
  title,
  description,
  skills,
  linkLabel,
  badges,
  delay,
}: SkillPackSectionProps) {
  return (
    <SectionReveal delay={delay}>
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              name={skill.name}
              purpose={skill.purpose}
              whenHelp={skill.whenHelp}
              example={skill.example}
              source={skill.source}
              href={skill.href}
              linkLabel={linkLabel}
              badges={badges}
            />
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}

export function SkillsList({ locale }: SkillsListProps) {
  const t = getMessages(locale).Pages.skills;
  const badgeLabels: SkillSourceLabels = {
    local: t.badges.local,
    skillsSh: t.badges.skillsSh,
    reactDoctor: t.badges.reactDoctor,
    nextjs: t.badges.nextjs,
    astro: t.badges.astro,
    motion: t.badges.motion,
  };
  const categories = [
    { key: 'architecture' as const, title: t.categories.architecture.title },
    { key: 'framework' as const, title: t.categories.framework.title },
    { key: 'quality' as const, title: t.categories.quality.title },
    { key: 'typescript' as const, title: t.categories.typescript.title },
  ];

  const nextjsPack: PackSkill[] = nextjsWorkflowSkillCatalog.map((skill) => ({
    ...skill,
    ...t.workflow.skills[skill.id as keyof typeof t.workflow.skills],
  }));
  const astroPack: PackSkill[] = astroSkillCatalog.map((skill) => ({
    ...skill,
    ...t.astro.skills[skill.id as keyof typeof t.astro.skills],
  }));

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

      <SkillPackSection
        title={t.workflow.title}
        description={t.workflow.description}
        skills={nextjsPack}
        linkLabel={t.linkLabel}
        badges={badgeLabels}
        delay={categories.length * 0.03}
      />

      <SkillPackSection
        title={t.astro.title}
        description={t.astro.description}
        skills={astroPack}
        linkLabel={t.linkLabel}
        badges={badgeLabels}
        delay={(categories.length + 1) * 0.03}
      />
    </div>
  );
}
