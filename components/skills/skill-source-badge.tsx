import { Badge } from '@/components/ui/badge';

export type SkillSource =
  'local' | 'skills-sh' | 'react-doctor' | 'nextjs' | 'astro' | 'react-router' | 'motion' | 'query';

export type SkillSourceLabels = {
  local: string;
  skillsSh: string;
  reactDoctor: string;
  nextjs: string;
  astro: string;
  reactRouter: string;
  motion: string;
  query: string;
};

const variantBySource: Record<SkillSource, 'default' | 'secondary' | 'outline'> = {
  local: 'default',
  'skills-sh': 'secondary',
  nextjs: 'secondary',
  astro: 'secondary',
  'react-router': 'secondary',
  motion: 'outline',
  query: 'outline',
  'react-doctor': 'outline',
};

const labelKeyBySource: Record<SkillSource, keyof SkillSourceLabels> = {
  local: 'local',
  'skills-sh': 'skillsSh',
  'react-doctor': 'reactDoctor',
  nextjs: 'nextjs',
  astro: 'astro',
  'react-router': 'reactRouter',
  motion: 'motion',
  query: 'query',
};

type SkillSourceBadgeProps = {
  source: SkillSource;
  labels: SkillSourceLabels;
};

/**
 * Molecule: maps a skill's install source to its localized badge label and
 * visual variant. The atom is the shared `Badge`; the source→style rules and
 * label lookup live here so `SkillCard` stays presentational.
 */
export function SkillSourceBadge({ source, labels }: SkillSourceBadgeProps) {
  return <Badge variant={variantBySource[source]}>{labels[labelKeyBySource[source]]}</Badge>;
}
