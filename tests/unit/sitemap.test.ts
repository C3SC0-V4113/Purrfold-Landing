import { describe, expect, it } from 'vitest';

import sitemap from '@/app/sitemap';

describe('localized sitemap', () => {
  it('includes both localized homes and all Phase 1 deep routes', async () => {
    const entries = await sitemap();
    const locations = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(10);
    expect(locations).toContain('http://localhost:3000/en');
    expect(locations).toContain('http://localhost:3000/es');
    expect(locations).toContain('http://localhost:3000/en/install');
    expect(locations).toContain('http://localhost:3000/es/install');
    expect(locations).toContain('http://localhost:3000/en/skills');
    expect(locations).toContain('http://localhost:3000/es/skills');
    expect(locations).toContain('http://localhost:3000/en/quality');
    expect(locations).toContain('http://localhost:3000/es/quality');
    expect(locations).toContain('http://localhost:3000/en/ecosystem');
    expect(locations).toContain('http://localhost:3000/es/ecosystem');
  });

  it('keeps alternates aligned with the same route source of truth', async () => {
    const entries = await sitemap();
    const englishSkills = entries.find((entry) => entry.url === 'http://localhost:3000/en/skills');

    expect(englishSkills?.alternates?.languages).toEqual({
      en: 'http://localhost:3000/en/skills',
      es: 'http://localhost:3000/es/skills',
    });
  });
});
