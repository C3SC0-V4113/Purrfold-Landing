import { SkillCard } from '@/components/skills/skill-card';
import { getMessages } from '@/i18n/messages';

import skillsLock from '../../skills-lock.json';

import type { Locale } from '@/i18n/routing';

type SkillSource = 'local' | 'skills-sh' | 'react-doctor';
type SkillCategory = 'architecture' | 'framework' | 'quality' | 'typescript';

type SkillEntry = {
  id: string;
  category: SkillCategory;
  source: SkillSource;
  href?: string;
};

type SkillsLock = {
  skills: Record<string, { source: string; skillPath: string }>;
};

const skillsLockData = skillsLock as SkillsLock;
const skillsLockIds = new Set(Object.keys(skillsLockData.skills));

const buildSkillsShHref = (skillId: string) => {
  const entry = skillsLockData.skills[skillId];

  if (!entry) return undefined;

  const slug = entry.skillPath.includes('/') ? entry.skillPath.split('/').at(-2) : undefined;

  return `https://www.skills.sh/${entry.source}/${slug ?? ''}`.replace(/\/$/, '');
};

const baseCatalog = [
  { id: 'architecture-decision-records', category: 'architecture' },
  { id: 'decision-doc-sync', category: 'architecture' },
  { id: 'project-architecture', category: 'architecture' },
  { id: 'vercel-composition-patterns', category: 'architecture' },
  { id: 'next-best-practices', category: 'framework' },
  { id: 'shadcn', category: 'framework' },
  { id: 'vercel-react-best-practices', category: 'framework' },
  { id: 'playwright-best-practices', category: 'quality' },
  { id: 'playwright-cli', category: 'quality' },
  { id: 'project-min-evaluation', category: 'quality' },
  { id: 'react-doctor', category: 'quality' },
  { id: 'systematic-debugging', category: 'quality' },
  { id: 'verification-before-completion', category: 'quality' },
  { id: 'vitest', category: 'quality' },
  { id: 'typescript-advanced-types', category: 'typescript' },
] as const;

const skillCatalog: SkillEntry[] = baseCatalog.map((skill) => {
  const source: SkillSource =
    skill.id === 'react-doctor'
      ? 'react-doctor'
      : skillsLockIds.has(skill.id)
        ? 'skills-sh'
        : 'local';

  return {
    id: skill.id,
    category: skill.category,
    source,
    href: source === 'skills-sh' ? buildSkillsShHref(skill.id) : undefined,
  };
});

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
