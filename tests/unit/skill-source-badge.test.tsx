import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  SkillSourceBadge,
  type SkillSource,
  type SkillSourceLabels,
} from '@/components/skills/skill-source-badge';

const labels: SkillSourceLabels = {
  local: 'Local',
  skillsSh: 'skills.sh',
  reactDoctor: 'React Doctor',
  nextjs: 'Next.js',
  astro: 'Astro',
  reactRouter: 'React Router',
  motion: 'Requires --motion',
  query: 'Requires --query',
};

describe('SkillSourceBadge', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it.each([
    ['local', 'Local'],
    ['skills-sh', 'skills.sh'],
    ['react-doctor', 'React Doctor'],
    ['nextjs', 'Next.js'],
    ['astro', 'Astro'],
    ['react-router', 'React Router'],
    ['motion', 'Requires --motion'],
    ['query', 'Requires --query'],
  ] satisfies [SkillSource, string][])('renders the %s source label', (source, expected) => {
    render(<SkillSourceBadge source={source} labels={labels} />);

    expect(screen.getByText(expected)).toBeDefined();
  });
});
