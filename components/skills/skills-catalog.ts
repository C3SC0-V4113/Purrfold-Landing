import skillsLock from '../../skills-lock.json';

export type SkillSource = 'local' | 'skills-sh' | 'react-doctor';
export type SkillCategory = 'architecture' | 'framework' | 'quality' | 'typescript';

export type SkillEntry = {
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

export const skillCatalog: SkillEntry[] = baseCatalog.map((skill) => {
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
