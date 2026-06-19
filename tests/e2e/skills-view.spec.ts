import { expect, test } from '@playwright/test';

const skillsPages = {
  en: {
    path: '/en/skills',
    title: 'Skill surface',
    overview: 'Skills with equal weight',
    category: 'Architecture & Design',
  },
  es: {
    path: '/es/skills',
    title: 'Superficie de skills',
    overview: 'Skills con el mismo peso',
    category: 'Arquitectura y diseño',
  },
} as const;

test('renders the English skills page with safe outbound links', async ({ page }) => {
  await page.goto(skillsPages.en.path);

  await expect(page.getByRole('heading', { level: 1, name: skillsPages.en.title })).toBeVisible();
  await expect(page.getByText(skillsPages.en.overview)).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 2, name: skillsPages.en.category })
  ).toBeVisible();

  const skillLinks = page.locator('a[href^="https://www.skills.sh/"]');
  await expect(skillLinks).toHaveCount(11);

  const hrefs = await skillLinks.evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).href)
  );
  expect(hrefs).toContain('https://www.skills.sh/pproenca/dot-skills/vitest');

  for (let index = 0; index < (await skillLinks.count()); index += 1) {
    const link = skillLinks.nth(index);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  }
});

test('renders the Spanish skills page with safe outbound links', async ({ page }) => {
  await page.goto(skillsPages.es.path);

  await expect(page.getByRole('heading', { level: 1, name: skillsPages.es.title })).toBeVisible();
  await expect(page.getByText(skillsPages.es.overview)).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 2, name: skillsPages.es.category })
  ).toBeVisible();

  const skillLinks = page.locator('a[href^="https://www.skills.sh/"]');
  await expect(skillLinks).toHaveCount(11);

  const hrefs = await skillLinks.evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).href)
  );
  expect(hrefs).toContain('https://www.skills.sh/pproenca/dot-skills/vitest');

  for (let index = 0; index < (await skillLinks.count()); index += 1) {
    const link = skillLinks.nth(index);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  }
});
