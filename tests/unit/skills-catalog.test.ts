import { describe, expect, it } from 'vitest';

import {
  allSkillsCount,
  astroSkillCatalog,
  buildSkillInstallCommand,
  nextjsWorkflowSkillCatalog,
  reactRouterSkillCatalog,
  skillCatalog,
} from '@/components/skills/skills-catalog';

const allSkills = [
  ...skillCatalog,
  ...nextjsWorkflowSkillCatalog,
  ...astroSkillCatalog,
  ...reactRouterSkillCatalog,
];

// Scaffold origin/main: src/skills/manifest.ts
const manifestIds = [
  'react-router',
  'architecture-decision-records',
  'project-architecture',
  'shadcn-component-boundaries',
  'project-min-evaluation',
  'decision-doc-sync',
  'react-doctor',
  'next-cache-components-adoption',
  'next-cache-components-optimizer',
  'next-dev-loop',
  'motion-framer',
  'playwright-best-practices',
  'playwright-cli',
  'shadcn',
  'systematic-debugging',
  'typescript-advanced-types',
  'astro',
  'vercel-composition-patterns',
  'vercel-react-best-practices',
  'verification-before-completion',
  'vitest',
  'tanstack-query',
];

describe('skills catalog', () => {
  it('contains exactly the skills in the Scaffold manifest', () => {
    expect(allSkills.map((entry) => entry.id).sort()).toEqual([...manifestIds].sort());
    expect(allSkillsCount).toBe(22);
  });

  it('links to and installs each skill from its source', () => {
    for (const entry of allSkills) {
      expect(entry.href).toBe(`https://skills.sh/${entry.installSource}/${entry.id}`);
      expect(entry.installSource).toMatch(/^[^/]+\/[^/]+$/);
      expect(buildSkillInstallCommand(entry)).toBe(
        `npx skills add ${entry.installSource} --skill ${entry.id}`
      );
    }
  });
});
