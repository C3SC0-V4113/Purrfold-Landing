import type { SkillSource } from '@/components/skills/skill-source-badge';

export type { SkillSource };
export type SkillCategory = 'architecture' | 'framework' | 'quality' | 'typescript';
type InstallSource = `${string}/${string}`;

export type SkillEntry = {
  id: string;
  category: SkillCategory;
  source: SkillSource;
  installSource: InstallSource;
  href: string;
};

function skill(
  id: string,
  category: SkillCategory,
  source: SkillSource,
  installSource: InstallSource
): SkillEntry {
  return { id, category, source, installSource, href: `https://skills.sh/${installSource}/${id}` };
}

export function buildSkillInstallCommand({
  installSource,
  id,
}: Pick<SkillEntry, 'installSource' | 'id'>): string {
  return `npx skills add ${installSource} --skill ${id}`;
}

export const skillCatalog: SkillEntry[] = [
  skill('architecture-decision-records', 'architecture', 'skills-sh', 'wshobson/agents'),
  skill('decision-doc-sync', 'architecture', 'purrfold', 'C3SC0-V4113/Scaffold'),
  skill('project-architecture', 'architecture', 'purrfold', 'C3SC0-V4113/Scaffold'),
  skill('shadcn-component-boundaries', 'architecture', 'purrfold', 'C3SC0-V4113/Scaffold'),
  skill('vercel-composition-patterns', 'architecture', 'skills-sh', 'vercel-labs/agent-skills'),
  skill('shadcn', 'framework', 'skills-sh', 'shadcn/ui'),
  skill('vercel-react-best-practices', 'framework', 'skills-sh', 'vercel-labs/agent-skills'),
  skill(
    'playwright-best-practices',
    'quality',
    'skills-sh',
    'currents-dev/playwright-best-practices-skill'
  ),
  skill('playwright-cli', 'quality', 'skills-sh', 'microsoft/playwright-cli'),
  skill('project-min-evaluation', 'quality', 'purrfold', 'C3SC0-V4113/Scaffold'),
  skill('react-doctor', 'quality', 'react-doctor', 'millionco/react-doctor'),
  skill('systematic-debugging', 'quality', 'skills-sh', 'obra/superpowers'),
  skill('verification-before-completion', 'quality', 'skills-sh', 'obra/superpowers'),
  skill('vitest', 'quality', 'skills-sh', 'pproenca/dot-skills'),
  skill('typescript-advanced-types', 'typescript', 'skills-sh', 'wshobson/agents'),
  skill('motion-framer', 'framework', 'motion', 'freshtechbro/claudedesignskills'),
  skill('tanstack-query', 'framework', 'query', 'pproenca/dot-skills'),
];

export const nextjsWorkflowSkillCatalog: SkillEntry[] = [
  skill('next-cache-components-adoption', 'framework', 'nextjs', 'vercel/next.js'),
  skill('next-cache-components-optimizer', 'framework', 'nextjs', 'vercel/next.js'),
  skill('next-dev-loop', 'framework', 'nextjs', 'vercel/next.js'),
];

export const astroSkillCatalog: SkillEntry[] = [
  skill('astro', 'framework', 'astro', 'astrolicious/agent-skills'),
];

export const reactRouterSkillCatalog: SkillEntry[] = [
  skill('react-router', 'framework', 'react-router', 'remix-run/react-router'),
];

/** Every skill purrfold can install, across frameworks and opt-in features. */
export const allSkillsCount =
  skillCatalog.length +
  nextjsWorkflowSkillCatalog.length +
  astroSkillCatalog.length +
  reactRouterSkillCatalog.length;
