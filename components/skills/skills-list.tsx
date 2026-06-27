import { SkillCard } from '@/components/skills/skill-card';
import { skillCatalog } from '@/components/skills/skills-catalog';
import { getMessages } from '@/i18n/messages';

import type { Locale } from '@/i18n/routing';

type SkillsListProps = { locale: Locale };

export function SkillsList({ locale }: SkillsListProps) {
  const t = getMessages(locale).Pages.skills;
  const categories = [
    { key: 'architecture' as const, title: t.categories.architecture.title },
    { key: 'framework' as const, title: t.categories.framework.title },
    { key: 'quality' as const, title: t.categories.quality.title },
    { key: 'typescript' as const, title: t.categories.typescript.title },
  ];

  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => {
        const skills = skillCatalog.filter((skill) => skill.category === category.key);

        if (skills.length === 0) return null;

        return (
          <section key={category.key} className="flex flex-col gap-3">
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
                    badges={{
                      local: t.badges.local,
                      skillsSh: t.badges.skillsSh,
                      reactDoctor: t.badges.reactDoctor,
                    }}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
