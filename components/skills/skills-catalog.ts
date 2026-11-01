import skillsLock from '../../skills-lock.json';

import type { SkillSource } from '@/components/skills/skill-source-badge';

export type { SkillSource };
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

// Astro ships a single framework-exclusive skill (from astrolicious/agent-skills).
// It gets its own section like the Next.js workflow skills, so it lives outside
// the general category catalog.
export const astroSkillCatalog: SkillEntry[] = [
  {
    id: 'astro',
    category: 'framework',
    source: 'astro',
    href: 'https://github.com/astrolicious/agent-skills',
  },
];

// React Router's official skill ships with React Router framework mode and with
// Vite apps that use a React Router mode (--router react-router-data|declarative).
export const reactRouterSkillCatalog: SkillEntry[] = [
  {
    id: 'react-router',
    category: 'framework',
    source: 'react-router',
    href: 'https://github.com/remix-run/react-router',
  },
];

// tanstack-query is installed only with --query, next to the Query provider.
const tanstackQuerySkill: SkillEntry = {
  id: 'tanstack-query',
  category: 'framework',
  source: 'query',
  href: 'https://github.com/pproenca/dot-skills',
};

// motion-framer is installed only with --motion; it renders in the Framework & UI
// category with a "Requires --motion" badge (source 'motion').
const motionFramerSkill: SkillEntry = {
  id: 'motion-framer',
  category: 'framework',
  source: 'motion',
  href: 'https://github.com/freshtechbro/claudedesignskills',
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
  motionFramerSkill,
  tanstackQuerySkill,
];

/** Every skill purrfold can install, across frameworks and opt-in features. */
export const allSkillsCount =
  skillCatalog.length +
  nextjsWorkflowSkillCatalog.length +
  astroSkillCatalog.length +
  reactRouterSkillCatalog.length;
