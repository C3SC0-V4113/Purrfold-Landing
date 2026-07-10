import skillsLock from '../../skills-lock.json';

export type SkillSource = 'local' | 'skills-sh' | 'react-doctor' | 'nextjs' | 'astro';
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
  { id: 'shadcn-component-boundaries', category: 'architecture' },
  { id: 'vercel-composition-patterns', category: 'architecture' },
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

const nextjsSkillsHref = 'https://github.com/vercel/next.js/tree/canary/skills';

const nextjsWorkflowSkills = [
  { id: 'next-cache-components-adoption', category: 'framework' },
  { id: 'next-cache-components-optimizer', category: 'framework' },
  { id: 'next-dev-loop', category: 'framework' },
] as const;

export const nextjsWorkflowSkillCatalog: SkillEntry[] = nextjsWorkflowSkills.map((skill) => ({
  id: skill.id,
  category: skill.category,
  source: 'nextjs',
  href: `${nextjsSkillsHref}/${skill.id}`,
}));

// Astro is a framework-exclusive skill installed only for the Astro scaffold;
// its 'astro' source drives the "Astro" badge in the skills list.
const astroFrameworkSkill: SkillEntry = {
  id: 'astro',
  category: 'framework',
  source: 'astro',
  href: 'https://github.com/astrolicious/agent-skills',
};

export const skillCatalog: SkillEntry[] = [
  ...baseCatalog.map((skill): SkillEntry => {
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
  }),
  astroFrameworkSkill,
];
