import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('opens and closes the mobile sheet without leaving the page', async ({ page }) => {
  await page.goto('/en/install');

  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Navigation', includeHidden: true })).toHaveCount(
    1
  );

  await page.getByRole('button', { name: 'Close menu' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page).toHaveURL(/\/en\/install$/);
});

test('keeps GitHub in the navbar and moves framework links to the home foundations section', async ({
  page,
}) => {
  await page.goto('/en');

  await page.getByRole('button', { name: 'Open menu' }).click();
  const dialog = page.getByRole('dialog');

  await expect(dialog.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com'
  );
  await expect(dialog.getByRole('link', { name: 'shadcn' })).toHaveCount(0);
  await expect(dialog.getByRole('link', { name: 'Next.js' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Close menu' }).click();

  const main = page.getByRole('main');
  await expect(main.getByRole('link', { name: 'shadcn' })).toHaveAttribute(
    'href',
    'https://ui.shadcn.com'
  );
  await expect(main.getByRole('link', { name: 'Next.js' })).toHaveAttribute(
    'href',
    'https://nextjs.org'
  );
});
