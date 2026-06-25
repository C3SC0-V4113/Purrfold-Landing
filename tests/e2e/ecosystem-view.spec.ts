import { expect, test } from '@playwright/test';

const resources = [
  { name: 'shadcn/ui', href: 'https://ui.shadcn.com/' },
  { name: 'Chánh Đại', href: 'https://chanhdai.com/' },
  { name: 'Magic UI', href: 'https://magicui.design/' },
  { name: 'coss ui', href: 'https://coss.com/ui' },
  { name: 'remocn', href: 'https://www.remocn.dev/' },
] as const;

test('navigates to and renders the English ecosystem with safe resource links', async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.goto('/en');
  await page
    .getByRole('navigation', { name: 'Primary navigation' })
    .getByRole('link', { name: 'Ecosystem', exact: true })
    .click();

  await expect(page).toHaveURL(/\/en\/ecosystem$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Component ecosystem' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText([
    'Explore compatible resources',
    'Foundation',
    'Community projects',
  ]);
  await expect(page.getByText('Foundation', { exact: true })).toHaveCount(2);
  await expect(page.getByText('Community', { exact: true })).toHaveCount(4);

  for (const resource of resources) {
    await expect(page.getByRole('heading', { level: 3, name: resource.name })).toBeVisible();
    const link = page.getByRole('main').getByRole('link', {
      name: `Explore resource: ${resource.name}`,
    });
    await expect(link).toHaveAttribute('href', resource.href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  }

  expect(consoleErrors.filter((message) => message.includes('nativeButton'))).toEqual([]);
});

test('renders the equivalent Spanish ecosystem categories and resources', async ({ page }) => {
  await page.goto('/es/ecosystem');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Ecosistema de componentes' })
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText([
    'Explora recursos compatibles',
    'Fundamento',
    'Proyectos de la comunidad',
  ]);
  await expect(page.getByText('Fundamento', { exact: true })).toHaveCount(2);
  await expect(page.getByText('Comunidad', { exact: true })).toHaveCount(4);

  for (const resource of resources) {
    await expect(page.getByRole('heading', { level: 3, name: resource.name })).toBeVisible();
    const link = page.getByRole('main').getByRole('link', {
      name: `Explorar recurso: ${resource.name}`,
    });
    await expect(link).toHaveAttribute('href', resource.href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  }
});
