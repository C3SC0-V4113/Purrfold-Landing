export type QualitySectionId =
  | 'quality-gates'
  | 'commit-hygiene'
  | 'ci-confidence'
  | 'runtime-insight';

export type QualityStatus = 'default' | 'optional';
export type QualityRole = 'quality-gate' | 'commit-signal' | 'ci-signal' | 'runtime-signal';
export type QualityFlag = '--unit' | '--commitlint' | '--e2e';

export type QualityToolId =
  | 'eslint'
  | 'prettier'
  | 'husky'
  | 'commitlint'
  | 'react-doctor'
  | 'react-scan'
  | 'vitest'
  | 'playwright'
  | 'typescript';

export type QualitySection = {
  id: QualitySectionId;
  titleKey: 'qualityGates' | 'commitHygiene' | 'ciConfidence' | 'runtimeInsight';
};

export type QualityTool = {
  id: QualityToolId;
  section: QualitySectionId;
  role: QualityRole;
  status: QualityStatus;
  flag?: QualityFlag;
  href: string;
};

export const qualitySections: QualitySection[] = [
  { id: 'quality-gates', titleKey: 'qualityGates' },
  { id: 'commit-hygiene', titleKey: 'commitHygiene' },
  { id: 'ci-confidence', titleKey: 'ciConfidence' },
  { id: 'runtime-insight', titleKey: 'runtimeInsight' },
];

export const qualityTools: QualityTool[] = [
  {
    id: 'react-doctor',
    section: 'quality-gates',
    role: 'quality-gate',
    status: 'default',
    href: 'https://www.react.doctor/',
  },
  {
    id: 'react-scan',
    section: 'quality-gates',
    role: 'quality-gate',
    status: 'default',
    href: 'https://react-scan.com/',
  },
  {
    id: 'eslint',
    section: 'commit-hygiene',
    role: 'commit-signal',
    status: 'default',
    href: 'https://eslint.org',
  },
  {
    id: 'prettier',
    section: 'commit-hygiene',
    role: 'commit-signal',
    status: 'default',
    href: 'https://prettier.io',
  },
  {
    id: 'husky',
    section: 'commit-hygiene',
    role: 'commit-signal',
    status: 'default',
    href: 'https://typicode.github.io/husky',
  },
  {
    id: 'commitlint',
    section: 'commit-hygiene',
    role: 'commit-signal',
    status: 'optional',
    flag: '--commitlint',
    href: 'https://commitlint.js.org',
  },
  {
    id: 'vitest',
    section: 'ci-confidence',
    role: 'ci-signal',
    status: 'optional',
    flag: '--unit',
    href: 'https://vitest.dev',
  },
  {
    id: 'playwright',
    section: 'ci-confidence',
    role: 'ci-signal',
    status: 'optional',
    flag: '--e2e',
    href: 'https://playwright.dev',
  },
  {
    id: 'typescript',
    section: 'runtime-insight',
    role: 'runtime-signal',
    status: 'default',
    href: 'https://www.typescriptlang.org',
  },
];
