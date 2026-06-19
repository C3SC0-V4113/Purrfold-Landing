import { expect, test } from '@playwright/test';

const qualityPages = {
  en: {
    path: '/en/quality',
    title: 'Quality signals',
    overview: 'Default quality stack',
    sections: ['Quality gates', 'Commit hygiene', 'CI confidence', 'Runtime insight'],
    linkLabel: 'Official docs',
  },
  es: {
    path: '/es/quality',
    title: 'Señales de calidad',
    overview: 'Base de calidad por defecto',
    sections: [
      'Controles de calidad',
      'Higiene de commits',
      'Confianza en CI',
      'Visibilidad del runtime',
    ],
    linkLabel: 'Documentación oficial',
  },
} as const;

test('renders the English quality page with official links', async ({ page }) => {
  await page.goto(qualityPages.en.path);

  await expect(page.getByRole('heading', { level: 1, name: qualityPages.en.title })).toBeVisible();
  await expect(page.getByText(qualityPages.en.overview)).toBeVisible();

  await expect(page.getByRole('heading', { level: 2 })).toHaveText([
    qualityPages.en.overview,
    ...qualityPages.en.sections,
  ]);

  await expect(page.getByText('--unit')).toBeVisible();
  await expect(page.getByText('--commitlint')).toBeVisible();
  await expect(page.getByText('--e2e')).toBeVisible();

  const links = page.getByRole('main').getByRole('link', { name: qualityPages.en.linkLabel });
  await expect(links).toHaveCount(9);

  const hrefs = await links.evaluateAll((nodes) =>
    nodes.map((node) => (node as HTMLAnchorElement).href)
  );
  expect(hrefs.map((href) => href.replace(/\/$/, ''))).toEqual([
    'https://github.com/millionco/react-doctor',
    'https://github.com/aidenybai/react-scan',
    'https://eslint.org',
    'https://prettier.io',
    'https://typicode.github.io/husky',
    'https://commitlint.js.org',
    'https://vitest.dev',
    'https://playwright.dev',
    'https://www.typescriptlang.org',
  ]);

  for (let index = 0; index < (await links.count()); index += 1) {
    await expect(links.nth(index)).toHaveAttribute('target', '_blank');
    await expect(links.nth(index)).toHaveAttribute('rel', 'noreferrer noopener');
  }
});

test('renders the Spanish quality page with official links', async ({ page }) => {
  await page.goto(qualityPages.es.path);

  await expect(page.getByRole('heading', { level: 1, name: qualityPages.es.title })).toBeVisible();
  await expect(page.getByText(qualityPages.es.overview)).toBeVisible();

  await expect(page.getByRole('heading', { level: 2 })).toHaveText([
    qualityPages.es.overview,
    ...qualityPages.es.sections,
  ]);

  const links = page.getByRole('main').getByRole('link', { name: qualityPages.es.linkLabel });
  await expect(links).toHaveCount(9);

  const hrefs = await links.evaluateAll((nodes) =>
    nodes.map((node) => (node as HTMLAnchorElement).href)
  );
  expect(hrefs.map((href) => href.replace(/\/$/, ''))).toEqual([
    'https://github.com/millionco/react-doctor',
    'https://github.com/aidenybai/react-scan',
    'https://eslint.org',
    'https://prettier.io',
    'https://typicode.github.io/husky',
    'https://commitlint.js.org',
    'https://vitest.dev',
    'https://playwright.dev',
    'https://www.typescriptlang.org',
  ]);

  for (let index = 0; index < (await links.count()); index += 1) {
    await expect(links.nth(index)).toHaveAttribute('target', '_blank');
    await expect(links.nth(index)).toHaveAttribute('rel', 'noreferrer noopener');
  }
});
